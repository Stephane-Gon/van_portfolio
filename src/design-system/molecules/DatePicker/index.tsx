'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { Button } from '@/design-system/atoms/RadixButton';
import { Calendar, Popover, PopoverContent, PopoverTrigger } from '@/design-system/molecules';
import { Callendar } from '@/design-system/icons';

type DatePickerProps = {
  label: string;
  valid?: boolean;
  helpText?: string | null;
  id: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: any) => void;
  value: Date;
};

const DatePicker = ({ label, valid, helpText, required, disabled, id, onChange, value }: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const _renderHelpText = () => {
    return !valid && helpText && <span className='text-sm text-dangerRed'>{helpText}</span>;
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    const formatedDate = date ? format(date, 'yyyy-MM-dd') : null;
    onChange(formatedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={`flex w-[280px] justify-start gap-4 text-left font-normal text-text ${!date && 'text-muted-foreground'}`}>
          <Callendar width={15} height={15} fill='white' />
          {date ? (
            format(date, 'PPP')
          ) : (
            <span>
              {label} {required && '*'}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      {_renderHelpText()}
      <PopoverContent className='w-auto bg-text/90 p-0'>
        <Calendar id={id} mode='single' selected={date} onSelect={handleDateChange} initialFocus disabled={disabled} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
