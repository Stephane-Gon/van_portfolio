'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { formSchema } from '../schemas/formSchema';
import { invalidFormData } from '@/utils';
import { storeSupabaseImage, StoreMultipleImages, deleteMultipleTableItems } from '@/lib/utils';
import { ActionReturnType } from '@/constants';
import type { ProjectToolT } from '@/features/projects/types';

export const onSubmitForm = async <T>(
  prevState: ActionReturnType<T>,
  formData: FormData,
): Promise<ActionReturnType<T>> => {
  const rawFormData = Object.fromEntries(formData);
  rawFormData.skills = JSON.parse(rawFormData.skills as any);
  rawFormData.tools = JSON.parse(rawFormData.tools as any);

  const stringImages = JSON.parse(rawFormData.stringImages as any);
  const fileImages: FormDataEntryValue[] = [];

  Object.keys(rawFormData).forEach(key => {
    if (key.includes('fileImage_')) {
      fileImages.push(rawFormData[key]);
    }
  });

  rawFormData.images = [...stringImages, ...fileImages] as any;

  const { data, success, error: zodError } = formSchema.safeParse(rawFormData);
  if (!success) {
    return invalidFormData(zodError.issues, rawFormData);
  }

  //* Upload the main Image to the storage
  let mainImage: string | File = data.main_image;
  let imageCouter = Number(rawFormData.image_counter);
  const storedImage = await storeSupabaseImage(
    data.main_image,
    `${data.title}_main_${imageCouter}`,
    'projects',
    'main_image',
  );

  if (storedImage.status === 200 && storedImage.image) {
    imageCouter++;
    mainImage = storedImage.image;
  } else {
    return storedImage;
  }

  //* Upload the secondary images
  let secondaryImages: Array<string | File> = [];
  const titles: string[] = [];

  data.images.forEach(image => {
    if (typeof image !== 'string') {
      titles.push(`${data.title}_${imageCouter}`);
      imageCouter++;
    }
  });
  const storedSecondaryImages = await StoreMultipleImages(data.images, titles, 'projects', 'images');
  if (storedSecondaryImages.status === 200 && storedSecondaryImages.images) {
    secondaryImages = storedSecondaryImages.images;
  } else {
    return storedSecondaryImages;
  }

  //* Upload the project to the database
  let successItem: any;

  const bodyData = {
    title: data.title,
    description: data.description,
    main_image: mainImage,
    images: secondaryImages,
    slogan: data.slogan,
    skills: data.skills,
    learned: data.learned,
    challenges: data.challenges,
    repository: data.repository,
    live_link: data.live_link,
    image_counter: imageCouter,
  };

  if (Number(rawFormData.id) > 0) {
    const { data: item, error } = await supabaseAdmin
      .from('projects')
      .update(bodyData)
      .eq('id', Number(rawFormData.id))
      .select();
    successItem = item ? item[0] : null;

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase projects edit: ${error.message}`,
        issues: [],
        item: null,
      };
    }
  } else {
    const { data: item, error } = await supabaseAdmin.from('projects').insert(bodyData).select();

    successItem = item ? item[0] : null;

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase projects create: ${error.message}`,
        issues: [],
        item: null,
      };
    }
  }

  if (successItem) {
    const { error } = await deleteMultipleTableItems<ProjectToolT>('project_tools', 'project_id', [successItem.id]);

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase projects create while deleting items from project_tools: ${error.message}`,
        issues: [],
        item: null,
      };
    }

    if (data.tools && data.tools.length > 0) {
      const { error: createError } = await supabaseAdmin.from('project_tools').insert(
        data.tools.map((tool: { value: number; label: string }) => ({
          project_id: successItem.id,
          tool_id: tool.value,
        })),
      );

      if (createError) {
        return {
          status: 400,
          message: `Failed on supabase projects create while creating items for project_tools: ${createError.message}`,
          issues: [],
          item: null,
        };
      }
    }
  }

  const { data: projectData, error } = await supabaseAdmin
    .from('projects')
    .select(
      `
    *,
    tools: project_tools(project_id, tool_id, id, tools(name, id))  
  `,
    )
    .eq('id', successItem.id);

  if (error) {
    return {
      status: 400,
      message: `Failed on getting the updated/created project: ${error.message}`,
      issues: [],
      item: null,
    };
  }

  return {
    status: 200,
    message: 'The Form was submitted successfully!',
    item: projectData
      ? {
          ...projectData[0],
          tools: projectData[0].tools.map((tool: ProjectToolT) => ({ value: tool.tool_id, label: tool.tools.name })),
        }
      : null,
  };
};
