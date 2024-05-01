'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { DeleteResponse } from '@/constants';

const deleteBucketImage = async <T>(image: string, folder: string): Promise<DeleteResponse<T>> => {
  const startIndex = image.indexOf(folder);

  if (startIndex !== -1) {
    const extractedPart = image.substring(startIndex);
    const { error } = await supabaseAdmin.storage.from('images').remove([extractedPart]);

    if (error) {
      return {
        data: null,
        error: error,
      };
    }
  }

  //* If there is no subpart in the image with that folder name, then no need to fail, just don't do anything
  return {
    data: null,
    error: null,
  };
};

export default deleteBucketImage;
