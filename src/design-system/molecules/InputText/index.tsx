
import { ChangeEvent } from 'react';

type TextInputProps = {
  placeholder?: string | null;
  label?: string | null;
  value?: string | number;
  valid?: boolean;
  helpText?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name?: string;
  type?: 'text' | 'password' | 'number';
  required?: boolean;
  disabled?: boolean;
};

export default ({
  label,
  value,
  onChange,
  valid,
  helpText,
  type,
  required,
  disabled,
  placeholder,
  id,
  name,
}: TextInputProps) => {
 
  return (
    <input />
  );
};
