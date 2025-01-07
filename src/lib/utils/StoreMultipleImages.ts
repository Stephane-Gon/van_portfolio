import { supabaseAdmin } from '@/lib/supabase';
import { ActionReturnType, Modules } from '@/constants';

type StoredImageReturnType = ActionReturnType<null> & { images?: Array<string | File> };

const storeSupabaseImage = async (
  images: Array<string | File>,
  names: Array<string>,
  folder: Modules,
  field: string,
): Promise<StoredImageReturnType> => {
  const returnState: StoredImageReturnType = {
    status: 200,
    message: 'Image uploaded successfully',
    item: null,
  };

  const stringImages = images.filter(image => typeof image === 'string') as string[];
  const fileImages = images.filter(image => typeof image !== 'string');

  const storedImages = await Promise.all(
    fileImages.map(async (image, idx) => {
      const { data, error } = await supabaseAdmin.storage
        .from('images')
        .upload(`${folder}/${names[idx].replace(' ', '_').toLowerCase()}.webp`, image, {
          cacheControl: '3600',
          upsert: true,
        });
      if (error) {
        returnState.status = 400;
        returnState.message = `Failed on subpabase creating image: ${folder} Image`;
        returnState.issues = [
          {
            message: error.message,
            fields: [field],
          },
        ];
      }

      if (data) {
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
      }
    }),
  );

  if (returnState.status === 400) return returnState;

  if (storedImages.some(image => image === undefined)) {
    returnState.status = 400;
    returnState.message = `Failed on subpabase creating image: ${folder} Image`;
    returnState.issues = [
      {
        message: 'Failed to upload images because of an unknown error. Please try again.',
        fields: [field],
      },
    ];
    return returnState;
  }

  returnState.images = [...stringImages, ...(storedImages as string[])];

  return returnState;
};

export default storeSupabaseImage;
