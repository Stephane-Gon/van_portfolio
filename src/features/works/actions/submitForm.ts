'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { formSchema } from '../schemas/formSchema';
import { invalidFormData } from '@/utils';
import { ActionReturnType } from '@/constants';

export const onSubmitForm = async <T>(
  prevState: ActionReturnType<T>,
  formData: FormData,
): Promise<ActionReturnType<T>> => {
  const rawFormData = Object.fromEntries(formData);
  rawFormData.skills = JSON.parse(rawFormData.skills as any);

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

  return {
    status: 200,
    message: 'The Form was submitted successfully!',
    item: successItem,
  };
};
