import { UseFormRegisterReturn } from 'react-hook-form';

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

const InputText = ({
  label,
  valid,
  helpText,
  type = 'text',
  required,
  disabled,
  placeholder,
  id,
  register,
}: TextInputProps) => {
  const _renderHelpText = () => {
    return !valid && helpText && <span className='text-sm text-dangerRed'>{helpText}</span>;
  };

  return (
    <div id={id} className='relative h-11 w-full min-w-[200px]'>
      <input
        {...register}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className='disabled:bg-blue-gray-50 peer h-full w-full border-b border-secondary bg-[#00000000] pb-1.5 pt-4 font-sans text-sm font-normal text-text outline outline-0 transition-all placeholder-shown:border-secondary focus:border-primary focus:outline-0 disabled:border-0'
      />
      <label className="after:content[' '] after:border-gray-500 peer-placeholder-shown:text-blue-gray-500 peer-disabled:text-transparent  peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-2.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-secondary transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:after:scale-x-100 peer-focus:after:border-primary">
        {label} {required && '*'}
      </label>
      {_renderHelpText()}
    </div>
  );
};

export default InputText;
