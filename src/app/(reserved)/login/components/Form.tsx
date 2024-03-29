'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { InputText } from '@/design-system/molecules';
import { Button, Spinner } from '@/design-system/atoms';

interface FormValues {
  email: string;
  password: string;
}

const Form = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    // TODO - Este sign in pode ser um dynamic import
    await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
      .then(result => {
        if (result?.status === 401) {
          if (result.error === 'Wrong email!') {
            setError('email', { type: 'manual', message: result.error });
          } else if (result.error === 'Wrong password!') {
            setError('password', { type: 'manual', message: result.error });
          }
        } else {
          setLoading(true);
          router.push('/dashboard');
        }
      })
      .catch(err => {
        console.log(`Error Occured: ${err}`);
      });
  };

  if (loading) {
    return (
      <div className='flex w-4/5 flex-col items-center justify-center gap-10 lg:w-1/3'>
        <Spinner className='mt-36 h-32 w-32' />
      </div>
    );
  }

  return (
    <div className='flex w-4/5 flex-col items-center justify-center gap-10 lg:w-1/3'>
      <h2 className='text-texte font-josefin text-2xl'>Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex w-full flex-col gap-10'>
        <InputText
          label='Email'
          placeholder='Type your email'
          disabled={isSubmitting}
          id='email'
          register={{
            ...register('email', {
              required: { value: true, message: 'This field is required!' },
              pattern: {
                value:
                  //eslint-disable-next-line
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: 'This is not a valid field!',
              },
            }),
          }}
          valid={errors.email ? false : true}
          helpText={errors.email?.message ?? ''}
          required
        />
        <InputText
          label='Password'
          placeholder='Type your password'
          id='password'
          type='password'
          disabled={isSubmitting}
          register={{ ...register('password', { required: { value: true, message: 'This field is required!' } }) }}
          valid={errors.password ? false : true}
          helpText={errors.password?.message ?? ''}
          required
        />

        <Button loading={isSubmitting} label={'Login'} type='submit' />
      </form>
    </div>
  );
};

export default Form;
