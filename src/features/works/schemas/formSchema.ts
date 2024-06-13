import { z } from 'zod';

export const formSchema = z.object({
  company: z.string().min(1, {
    message: 'The company name is required.',
  }),
  description: z.string().min(20, {
    message: 'The description is required and must have more than 20 chars.',
  }),
  achievements: z.string().min(20, {
    message: 'The description is required and must have more than 20 chars.',
  }),
  role: z.string().min(1, {
    message: 'The role is required.',
  }),
  skills: z.array(z.enum(['frontend', 'backend', 'design', 'ci_cd', 'testing'])).min(1, {
    message: 'At least one skill type is required',
  }),
  started_at: z.string().min(1, {
    message: 'The start date is required.',
  }),
  ended_at: z.string().nullable(),
  tools: z.array(z.any()).nullable(),
  projects: z.array(z.any()).nullable(),
});
