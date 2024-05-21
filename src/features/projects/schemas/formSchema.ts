import { z } from 'zod';
import { AVAIALABLE_ENTENSIONS, FILE_SIZE_LIMIT } from '@/constants';

export const formSchema = z.object({
  title: z.string().min(1, {
    message: 'The title is required.',
  }),
  description: z.string().min(20, {
    message: 'The description is required and must have more than 20 characters.',
  }),
  slogan: z.string().min(5, {
    message: 'The slogan must be at least 5 characters long.',
  }),
  repository: z.string().nullable(),
  live_link: z.string().nullable(),
  challenges: z.string().min(5, {
    message: 'The challenges must be at least 5 characters long.',
  }),
  learned: z.string().min(5, {
    message: 'The learned must be at least 5 characters long.',
  }),
  skills: z.array(z.enum(['frontend', 'backend', 'design', 'ci_cd', 'testing'])).min(1, {
    message: 'At least one skill is required',
  }),
  main_image: z
    .any()
    .refine(file => {
      if (!file) return false;
      return true;
    }, 'The main image is required.')
    .refine(file => {
      if (typeof file === 'string') return true;
      return file?.size <= FILE_SIZE_LIMIT;
    }, `Max image size is 1MB.`)
    .refine(file => {
      if (typeof file === 'string') return true;
      return AVAIALABLE_ENTENSIONS.includes(file?.type);
    }, 'Only .svg, and .webp formats are supported.'),
  images: z
    .array(z.any())
    .refine(images => {
      if (!images) return false;
      return true;
    }, 'The icon is required.')
    .refine(images => {
      return images.some(image => {
        if (typeof image === 'string') return true;
        return image?.size <= FILE_SIZE_LIMIT;
      });
    }, `Max image size is 1MB.`)
    .refine(images => {
      return images.some(image => {
        if (typeof image === 'string') return true;
        return AVAIALABLE_ENTENSIONS.includes(image?.type);
      });
    }, 'Only .svg, and .webp formats are supported.'),
});
