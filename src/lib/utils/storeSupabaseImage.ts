import { supabaseAdmin } from '@/lib/supabase';
import { ActionReturnType, Modules } from '@/constants';

type StoredImageReturnType = ActionReturnType<null> & { image?: string | File };

const storeSupabaseImage = async (
  image: File | string,
  name: string,
  folder: Modules,
  field: string,
): Promise<StoredImageReturnType> => {
  if (typeof image !== 'string') {
    const { data, error } = await supabaseAdmin.storage
      .from('images')
      .upload(`${folder}/${name.replace(' ', '_').toLowerCase()}.svg`, image, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      return {
        status: 400,
        message: `Failed on subpabase creating image: ${folder} Image`,
        issues: [
          {
            message: error.message,
            fields: [field],
          },
        ],
        item: null,
      };
    }

    if (data) {
      return {
        status: 200,
        message: 'Image uploaded successfully',
        image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`,
        item: null,
      };
    }
  }

  return {
    status: 200,
    message: 'Image uploaded successfully',
    image: image,
    item: null,
  };
};

export default storeSupabaseImage;
