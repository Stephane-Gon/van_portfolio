import { supabaseAdmin } from '@/lib/supabase';
import { ActionReturnType, Modules } from '@/constants';

type StoredImageReturnType = ActionReturnType & { icon_url?: string | File };

const storeSupabaseImage = async (
  image: File | string,
  name: string,
  category: Modules,
): Promise<StoredImageReturnType> => {
  if (typeof image !== 'string') {
    const { data, error } = await supabaseAdmin.storage
      .from('images')
      .upload(`${category}/${name.toLowerCase()}.svg`, image, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      return {
        status: 400,
        message: `Failed on subpabase creating image: ${category} Image`,
        issues: [
          {
            message: error.message,
            fields: ['icon_url'],
          },
        ],
      };
    }

    if (data) {
      return {
        status: 200,
        message: 'Image uploaded successfully',
        icon_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`,
      };
    }
  }

  return {
    status: 200,
    message: 'Image uploaded successfully',
    icon_url: image,
  };
};

export default storeSupabaseImage;
