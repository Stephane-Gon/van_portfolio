'use client';

import React from 'react';

interface ListErrorProps {
  title: string;
  text?: string;
}

const ListError = ({ title, text }: ListErrorProps) => {
  return (
    <div className='w-full text-center'>
      <h2 className='text-2xl text-text'>{title}</h2>
      {text && <p className='text-text'>{text}</p>}
    </div>
  );
};

export default ListError;
