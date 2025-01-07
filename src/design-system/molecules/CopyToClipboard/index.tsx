'use client';

import React, { useState } from 'react';

interface CopyToClipboardProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  successMessage?: string;
  errorMessage?: string;
}

const CopyToClipboard = ({ children, text, successMessage, errorMessage }: CopyToClipboardProps) => {
  const [popoverMessage, setPopoverMessage] = useState<string | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setPopoverMessage(successMessage ?? 'Copied to clipboard!');
      setTimeout(() => setPopoverMessage(null), 1500);
    } catch (error) {
      console.error(error);
      setPopoverMessage(errorMessage ?? 'Failed to copy to clipboard.');
      setTimeout(() => setPopoverMessage(null), 1500);
    }
  };

  return (
    <div data-tooltip-target='tooltip-default' className='group relative'>
      <div className='relative flex cursor-pointer items-center justify-center' onClick={copyToClipboard}>
        {children}
      </div>
      <div
        id='tooltip-default'
        role='tooltip'
        className={`absolute left-[50%] top-[-50px] translate-x-[-50%] ${popoverMessage ? 'bg-primary' : 'bg-[#f5f5f5]'} rounded-md p-2 text-center opacity-0 duration-300 group-hover:opacity-95`}>
        <p className='text-nowrap font-bold text-[#131313]'>{popoverMessage ?? 'Click to copy my email!'}</p>
        <div
          className={`absolute bottom-[-5px] left-1/2 -z-10 h-3 w-3 border-b border-r duration-300 ${popoverMessage ? 'border-primary' : 'border-[#f5f5f5]'} -translate-x-1/2 rotate-45  ${popoverMessage ? 'bg-primary' : 'bg-[#f5f5f5]'}`}
          data-popper-arrow></div>
      </div>
    </div>
  );
};

export default CopyToClipboard;
