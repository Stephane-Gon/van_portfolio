'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { schema } from '../components/Form/schema';
import { invalidFormData, storeSupabaseImage } from '@/utils';
import { ActionReturnType } from '@/constants';

export const onSubmitForm = async (prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> => {
  const rawFormData = Object.fromEntries(formData);
  rawFormData.types = rawFormData.types.toString().split(',') as any;
  rawFormData.level = Number(rawFormData.level) as any;

  const { data, success, error: zodError } = schema.safeParse(rawFormData);
  if (!success) {
    return invalidFormData(zodError.issues, rawFormData);
  }

  //* Upload the image to the storage
  let icon_url: string | File = data.icon_url;

  const storedImage = await storeSupabaseImage(data.icon_url, data.name, 'tools');

  if (storedImage.status === 200 && storedImage.icon_url) {
    icon_url = storedImage.icon_url;
  } else {
    return storedImage;
  }

  const { error } = await supabaseAdmin
    .from('tools')
    .update({
      name: data.name,
      description: data.description,
      level: Number(data.level),
      types: data.types,
      icon_url: icon_url,
    })
    .eq('id', Number(rawFormData.id))
    .select();

  if (error) {
    return {
      status: 400,
      message: `Failed on supabase tools edit: ${error.message}`,
      issues: [],
    };
  }

  return {
    status: 200,
    message: 'The Form was submitted successfully!',
  };
};
