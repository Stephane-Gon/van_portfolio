import React from 'react';

const MainBurgerIcon = () => {
  return (
    <div className='flex h-5 items-center justify-center gap-1 overflow-hidden'>
      <div className='flex translate-y-[8px] flex-col gap-[2px] duration-300 group-hover:translate-y-[-8px]'>
        <div className='h-5 w-[2px] rounded-md bg-[#f5f5f5] opacity-45 1sm:bg-[#131313]'></div>
        <div className='h-1 w-[2px] rounded-md bg-[#f5f5f5] opacity-45 1sm:bg-[#131313]'></div>
        <div className='h-5 w-[2px] rounded-md bg-[#f5f5f5] opacity-85 1sm:bg-[#131313]'></div>
      </div>
      <div className='h-4 w-[2px] rounded-md bg-[#f5f5f5] opacity-45 1sm:bg-[#131313]'></div>
      <div className='flex translate-y-[8px] flex-col gap-[2px] duration-300 group-hover:translate-y-[-8px]'>
        <div className='h-5 w-[2px] rounded-md bg-[#f5f5f5] opacity-45 1sm:bg-[#131313]'></div>
        <div className='h-1 w-[2px] rounded-md bg-[#f5f5f5] opacity-45 1sm:bg-[#131313]'></div>
        <div className='h-5 w-[2px] rounded-md bg-[#f5f5f5] opacity-85 1sm:bg-[#131313]'></div>
      </div>
    </div>
  );
};

export default MainBurgerIcon;
