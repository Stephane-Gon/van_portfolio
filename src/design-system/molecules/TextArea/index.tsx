'use client ';

import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  extraClasses?: string;
  valid?: boolean;
  helpText?: string | null;
  required?: boolean;
  label: string;
  register: UseFormRegisterReturn<string>;
  id: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ extraClasses, label = '', valid = true, required = true, helpText = '', id, register, ...props }, ref) => {
    const _renderHelpText = () => {
      return !valid && helpText && <span className='text-sm text-dangerRed'>{helpText}</span>;
    };

    return (
      <div id={id} className='relative min-h-[100px] w-full min-w-[200px]'>
        <label className="after:content[' '] after:border-gray-500 peer-placeholder-shown:text-blue-gray-500 peer-disabled:text-transparent  peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none mb-2 flex w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-secondary transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:after:scale-x-100 peer-focus:after:border-primary">
          {label} {required && '*'}
        </label>
        <textarea
          {...register}
          className={`border-input ring-offset-background placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border bg-accent px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${extraClasses}`}
          ref={ref}
          {...props}
        />
        {_renderHelpText()}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;
