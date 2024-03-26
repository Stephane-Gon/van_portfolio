
import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form'

type TextInputProps = {
  placeholder: string;
  label: string;
  valid?: boolean;
  helpText?: string | null;
  id: string;
  type?: 'text' | 'password' | 'number' | 'email';
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegisterReturn<string>;
};

export default ({
  label,
  valid,
  helpText,
  type = 'text',
  required,
  disabled,
  placeholder,
  id,
  register
}: TextInputProps) => {

  const _renderHelpText = () => {
    return (!valid && helpText) && (
      <span className='text-dangerRed text-sm'>
        {helpText}
      </span>
    )
  }
 
  return (
    <div id={id} className="relative h-11 w-full min-w-[200px]">
      <input 
        {...register}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className="peer h-full w-full border-b bg-[#00000000] border-secondary pt-4 pb-1.5 font-sans text-sm font-normal text-text outline outline-0 transition-all placeholder-shown:border-secondary focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
      <label
        className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-secondary transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:after:scale-x-100 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {label} {required && '*'}
      </label>
      {_renderHelpText()}
    </div>
  );
};
