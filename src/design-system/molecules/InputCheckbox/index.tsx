'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from '@/design-system/icons';

type InputCheckboxProps = {
  label: string;
  valid?: boolean;
  helpText?: string | null;
  required?: boolean;
  disabled?: boolean;
};

const InputCheckbox: React.FC<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & InputCheckboxProps> = ({
  className,
  label,
  valid,
  helpText,
  required,
  ...props
}) => {
  const _renderHelpText = () => {
    return !valid && helpText && <span className='text-sm text-dangerRed'>{helpText}</span>;
  };

  return (
    <div className='items-top flex space-x-2'>
      <CheckboxPrimitive.Root
        className={`ring-offset-background focus-visible:ring-ring data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary 
          ${className}
        `}
        {...props}>
        <CheckboxPrimitive.Indicator className={`text-current flex items-center justify-center`}>
          <Check className='h-4 w-4' fill='#131313' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div className='grid gap-1.5 leading-none'>
        <label
          htmlFor={props.id}
          className='text-sm font-medium leading-none text-secondary peer-disabled:cursor-not-allowed '>
          {label} {required && '*'}
        </label>
        {_renderHelpText()}
      </div>
    </div>
  );
};

InputCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export default InputCheckbox;
