import { supabaseAdmin } from '@/lib/supabase';
import { ActionReturnType, Modules } from '@/constants';

// TODO - Dár fix disto e passar para o folder lib
type StoredImageReturnType = ActionReturnType<null> & { icon_url?: string | File };

const storeSupabaseImage = async (
  image: File | string,
  name: string,
  folder: Modules,
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
            fields: ['icon_url'],
          },
        ],
        item: null,
      };
    }

    if (data) {
      return {
        status: 200,
        message: 'Image uploaded successfully',
        icon_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`,
        item: null,
      };
    }
  }

  return {
    status: 200,
    message: 'Image uploaded successfully',
    icon_url: image,
    item: null,
  };
};

export default storeSupabaseImage;
