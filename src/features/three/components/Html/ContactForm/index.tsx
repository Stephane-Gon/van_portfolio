'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputText, Textarea } from '@/design-system/molecules';
import { Button } from '@/design-system/atoms';
import { contactFormSchema } from '@/features/three/schemas/contactFormSchema';
import { sendEmail } from '@/features/three/actions/sendEmails';

function ContactForm() {
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  }, [submitted]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      sendEmail(values);
      reset();
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-full w-[320px] flex-col items-start gap-8 2sm:w-[350px] lg:ml-36 lg:w-[400px] 2xl:w-[500px]'>
      <h1 className='text-3xl font-bold text-[#f5f5f5]'>Contact Me:</h1>
      <InputText
        id='name'
        label='Name'
        disabled={isSubmitting}
        placeholder='Type your name here...'
        register={{ ...register('name', { required: { value: true, message: 'This field is required!' } }) }}
        valid={errors.name ? false : true}
        helpText={(errors.name?.message as string) ?? ''}
        required
      />
      <InputText
        id='email'
        label='Email'
        disabled={isSubmitting}
        placeholder='Type your email here...'
        register={{ ...register('email', { required: { value: true, message: 'This field is required!' } }) }}
        valid={errors.email ? false : true}
        helpText={(errors.email?.message as string) ?? ''}
        required
      />
      <Textarea
        label='Message'
        control={control}
        placeholder='Type the message here...'
        id='message'
        name='message'
        disabled={isSubmitting}
        valid={errors.message ? false : true}
        helpText={(errors.message?.message as string) ?? ''}
        required
      />
      <Button label='Send' variant='gradient' type='submit' disabled={isSubmitting} />
      {submitted && <p className='text-[#8aea92]'>Email sent successfully!</p>}
    </form>
  );
}

export default ContactForm;
