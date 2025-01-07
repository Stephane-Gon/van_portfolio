import { z } from 'zod';
import { AVAIALABLE_ENTENSIONS, FILE_SIZE_LIMIT } from '@/constants';
import { imageSchema } from '@/schemas';

export const formSchema = z.object({
  title: z.string().min(1, {
    message: 'The title is required.',
  }),
  description: z.string().min(20, {
    message: 'The description is required and must have more than 20 characters.',
  }),
  slogan: z
    .string()
    .refine(value => {
      if (!value) return true;
      return value.length > 5;
    }, 'The slogan must be a more than 5 characthers.')
    .nullable(),
  repository: z.string().nullable(),
  live_link: z.string().nullable(),
  challenges: z
    .string()
    .refine(value => {
      if (!value) return true;
      return value.length > 20;
    }, 'The challenges text must be a more than 20 characthers.')
    .nullable(),
  learned: z
    .string()
    .refine(value => {
      if (!value) return true;
      return value.length > 20;
    }, 'The learned text must be a more than 20 characthers.')
    .nullable(),
  skills: z.array(z.enum(['frontend', 'backend', 'design', 'ci_cd', 'testing'])).min(1, {
    message: 'At least one skill is required',
  }),
  main_image: z
    .any()
    .refine(file => {
      if (!file) return true;
      if (typeof file === 'string') return true;
      return file?.size <= FILE_SIZE_LIMIT;
    }, `Max image size is 1MB.`)
    .refine(file => {
      if (!file) return true;
      if (typeof file === 'string') return true;
      return AVAIALABLE_ENTENSIONS.includes(file?.type);
    }, 'Only .svg, and .webp formats are supported.'),
  images: z.array(imageSchema),
  tools: z.array(z.any()).nullable(),
  is_personal: z.boolean(),
  is_active: z.boolean(),
  finished_at: z.string().min(1, {
    message: 'The start date is required.',
  }),
});
