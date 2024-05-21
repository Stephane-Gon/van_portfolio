'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { formSchema } from '../schemas/formSchema';
import { invalidFormData } from '@/utils';
import { storeSupabaseImage } from '@/lib/utils';
import { ActionReturnType } from '@/constants';

export const onSubmitForm = async <T>(
  prevState: ActionReturnType<T>,
  formData: FormData,
): Promise<ActionReturnType<T>> => {
  const rawFormData = Object.fromEntries(formData);
  rawFormData.types = JSON.parse(rawFormData.types as any);

  const { data, success, error: zodError } = formSchema.safeParse(rawFormData);
  if (!success) {
    return invalidFormData(zodError.issues, rawFormData);
  }

  //* Upload the image to the storage
  let icon_url: string | File = data.icon_url;
  const storedImage = await storeSupabaseImage(data.icon_url, data.name, 'tools', 'icon_url');

  if (storedImage.status === 200 && storedImage.image) {
    icon_url = storedImage.image;
  } else {
    return storedImage;
  }

  let successItem: any;

  const bodyData = {
    name: data.name,
    description: data.description,
    level: Number(data.level),
    types: data.types,
    icon_url,
  };

  if (Number(rawFormData.id) > 0) {
    const { data: item, error } = await supabaseAdmin
      .from('tools')
      .update(bodyData)
      .eq('id', Number(rawFormData.id))
      .select();
    successItem = item ? item[0] : null;

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase tools edit: ${error.message}`,
        issues: [],
        item: null,
      };
    }
  } else {
    const { data: item, error } = await supabaseAdmin.from('tools').insert(bodyData).select();
    successItem = item ? item[0] : null;

    if (error) {
      return {
        status: 400,
        message: `Failed on supabase tools edit: ${error.message}`,
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
