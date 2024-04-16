'use client';
import Select from 'react-select';
import type { SelectOption } from '@/constants';

interface SelectInputProps {
  valid?: boolean;
  helpText?: string | null;
  placeholder?: string;
  required?: boolean;
  label: string;
  id: string;
  isMulti?: boolean;
  options: SelectOption[];
  onChange: (value: any) => void;
  value: SelectOption | SelectOption[] | undefined;
}

const SelectInput = ({
  label = '',
  valid = true,
  required = true,
  helpText = '',
  isMulti = false,
  placeholder = 'Select an option',
  options,
  id,
  onChange,
  value,
}: SelectInputProps) => {
  const _renderHelpText = () => {
    return !valid && helpText && <span className='text-sm text-dangerRed'>{helpText}</span>;
  };

  return (
    <div className='relative min-h-[100px] w-full min-w-[200px]'>
      <label className="after:content[' '] after:border-gray-500 peer-placeholder-shown:text-blue-gray-500 peer-disabled:text-transparent  peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none mb-2 flex w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-secondary transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:after:scale-x-100 peer-focus:after:border-primary">
        {label} {required && '*'}
      </label>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        className='w-full'
        isMulti={isMulti}
      />
      {_renderHelpText()}
    </div>
  );
};

export default SelectInput;
