import { z } from 'zod';
import { AVAIALABLE_ENTENSIONS, FILE_SIZE_LIMIT } from '@/constants';

export const editFormSchema = z.object({
  name: z.string().min(1, {
    message: 'The name is required.',
  }),
  description: z.string().min(20, {
    message: 'The description is required and must have more than 20 chars.',
  }),
  level: z.number().int().min(0, 'Value must be between 0 and 10').max(10, 'Value must be between 0 and 10'),
  types: z.array(z.enum(['frontend', 'backend', 'design', 'ci_cd', 'testing'])).min(1, {
    message: 'At least one skill type is required',
  }),
  icon_url: z
    .any()
    .refine(file => {
      if (!file) return false;
      return true;
    }, 'The icon is required.')
    .refine(file => {
      if (typeof file === 'string') return true;
      return file?.size <= FILE_SIZE_LIMIT;
    }, `Max image size is 1MB.`)
    .refine(file => {
      if (typeof file === 'string') return true;
      return AVAIALABLE_ENTENSIONS.includes(file?.type);
    }, 'Only .svg, and .webp formats are supported.'),
});
