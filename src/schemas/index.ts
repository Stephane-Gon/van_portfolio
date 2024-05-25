import { z } from 'zod';
import { AVAIALABLE_ENTENSIONS, FILE_SIZE_LIMIT } from '@/constants';

export const imageSchema = z
  .any()
  .refine(
    file => {
      if (typeof file === 'string') return true;
      return AVAIALABLE_ENTENSIONS.includes(file.type);
    },
    {
      message: 'Only .svg, and .webp formats are supported.',
    },
  )
  .refine(
    file => {
      if (typeof file === 'string') return true;
      return file.size <= FILE_SIZE_LIMIT;
    },
    {
      message: 'File size should be less than 1MB.',
    },
  );
