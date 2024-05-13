'use server';
// Import { supabaseAdmin } from '@/lib/supabase';
// Import { formSchema } from '../schemas/formSchema';
// Import { invalidFormData } from '@/utils';
// Import { storeSupabaseImage } from '@/lib/utils';
import { ActionReturnType } from '@/constants';

export const onSubmitForm = async <T>(
  prevState: ActionReturnType<T>,
  formData: FormData,
): Promise<ActionReturnType<T>> => {
  const rawFormData = Object.fromEntries(formData);
  console.log('🚀 ~ rawFormData:', rawFormData);

  return {
    status: 200,
    message: 'The Form was submitted successfully!',
    item: null,
  };
};
