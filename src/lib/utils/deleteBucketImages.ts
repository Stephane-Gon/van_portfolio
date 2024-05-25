'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { DeleteResponse } from '@/constants';

const deleteBucketImages = async <T>(images: string[], folder: string): Promise<DeleteResponse<T>> => {
  const extractedParts = images.map(image => {
    const startIndex = image.indexOf(folder);
    return startIndex !== -1 ? image.substring(startIndex) : null;
  });

  const filteredParts = extractedParts.filter(part => part !== null) as string[];

  const { error } = await supabaseAdmin.storage.from('images').remove(filteredParts);

  if (error) {
    return {
      data: null,
      error: error,
    };
  }

  //* If there is no subpart in the image with that folder name, then no need to fail, just don't do anything
  return {
    data: null,
    error: null,
  };
};

export default deleteBucketImages;
