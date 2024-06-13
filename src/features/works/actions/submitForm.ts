'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { deleteMultipleTableItems } from '@/lib/utils';
import { formSchema } from '../schemas/formSchema';
import { invalidFormData } from '@/utils';
import { ActionReturnType, SelectOption } from '@/constants';
import type { WorkToolT, WorkProjectT } from '../types';

export const onSubmitForm = async <T>(
  prevState: ActionReturnType<T>,
  formData: FormData,
): Promise<ActionReturnType<T>> => {
  const rawFormData = Object.fromEntries(formData);
  rawFormData.skills = JSON.parse(rawFormData.skills as any);
  rawFormData.tools = JSON.parse(rawFormData.tools as any);
  rawFormData.projects = JSON.parse(rawFormData.projects as any);

  const { data, success, error: zodError } = formSchema.safeParse(rawFormData);
  if (!success) {
    return invalidFormData(zodError.issues, rawFormData);
  }

  let successItem: any;

  const bodyData = {
    company: data.company,
    description: data.description,
    achievements: data.achievements,
    role: data.role,
    skills: data.skills,
    started_at: data.started_at,
    ...(data.ended_at ? { ended_at: data.ended_at } : null),
  };

  if (Number(rawFormData.id) > 0) {
    const { data: item, error } = await supabaseAdmin
      .from('works')
      .update(bodyData)
      .eq('id', Number(rawFormData.id))
      .select();
    successItem = item ? item[0] : null;

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase works edit: ${error.message}`,
        issues: [],
        item: null,
      };
    }
  } else {
    const { data: item, error } = await supabaseAdmin.from('works').insert(bodyData).select();
    successItem = item ? item[0] : null;

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase works create: ${error.message}`,
        issues: [],
        item: null,
      };
    }
  }

  if (successItem) {
    const { error } = await deleteMultipleTableItems<WorkToolT>('work_tools', 'work_id', [successItem.id]);

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase works create while deleting items from work_tools: ${error.message}`,
        issues: [],
        item: null,
      };
    }

    if (data.tools && data.tools.length > 0) {
      const { error: createError } = await supabaseAdmin.from('work_tools').insert(
        data.tools.map((tool: SelectOption) => ({
          work_id: successItem.id,
          tool_id: tool.value,
        })),
      );

      if (createError) {
        return {
          status: 400,
          message: `Failed on supabase works create while creating items for work_tools: ${createError.message}`,
          issues: [],
          item: null,
        };
      }
    }

    const { error: pError } = await deleteMultipleTableItems<WorkProjectT>('work_projects', 'work_id', [
      successItem.id,
    ]);

    if (pError) {
      return {
        status: 400,
        message: `Failed on supabase works create while deleting items from work_projects: ${pError.message}`,
        issues: [],
        item: null,
      };
    }

    if (data.projects && data.projects.length > 0) {
      const { error: createError } = await supabaseAdmin.from('work_projects').insert(
        data.projects.map((project: SelectOption) => ({
          work_id: successItem.id,
          project_id: project.value,
        })),
      );

      if (createError) {
        return {
          status: 400,
          message: `Failed on supabase works create while creating items for work_projects: ${createError.message}`,
          issues: [],
          item: null,
        };
      }
    }
  }

  const { data: workData, error } = await supabaseAdmin
    .from('works')
    .select(
      `
      *,
      tools: work_tools(work_id, tool_id, id, tools(name, id)),
      projects: work_projects(work_id, project_id, id, projects(title, id))  
    `,
    )
    .eq('id', successItem.id);

  if (error) {
    return {
      status: 400,
      message: `Failed on getting the updated/created work: ${error.message}`,
      issues: [],
      item: null,
    };
  }

  return {
    status: 200,
    message: 'The Form was submitted successfully!',
    item: workData
      ? {
          ...workData[0],
          tools: workData[0].tools.map((tool: WorkToolT) => ({ value: tool.tool_id, label: tool.tools.name })),
          projects: workData[0].projects.map((project: WorkProjectT) => ({
            value: project.project_id,
            label: project.projects.title,
          })),
        }
      : null,
  };
};
