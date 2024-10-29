import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, {
    message: 'The Name is required.',
  }),
  email: z
    .string()
    .email({
      message: 'The email is required and must be a valid email.',
    })
    .min(1, {
      message: 'The email is required and must be a valid email.',
    }),
  message: z.string().min(20, {
    message: 'The message is required and must have more than 20 characters.',
  }),
});
