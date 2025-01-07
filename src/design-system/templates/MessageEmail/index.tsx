import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, message }) => (
  <div className='flex flex-col items-start gap-4'>
    <h1 className='text-3xl font-bold'>Van Portfolio</h1>
    <h4 className='text-lg'>
      Contacto feito pelo {name} com o email: {email}
    </h4>

    <p>{message}</p>
  </div>
);
