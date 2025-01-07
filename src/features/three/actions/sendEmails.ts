'use server';

import { EmailTemplate } from '@/design-system/templates/MessageEmail';
import { Resend } from 'resend';
import { z } from 'zod';
import { contactFormSchema } from '../schemas/contactFormSchema';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = async (emailFormData: z.infer<typeof contactFormSchema>) => {
  const { error } = await resend.emails.send({
    from: `Acme <onboarding@resend.dev>`,
    to: process.env.NEXT_PUBLIC_RESEND_EMAIL as string,
    subject: 'Contact Form',
    react: EmailTemplate({
      name: emailFormData.name,
      email: emailFormData.email,
      message: emailFormData.message,
    }),
  });

  if (error) {
    throw error;
  }
};
