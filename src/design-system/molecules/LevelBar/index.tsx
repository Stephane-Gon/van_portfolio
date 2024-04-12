import React from 'react';
import { Gradient } from '@/design-system/atoms';

interface LevelBarProps {
  level: number;
}

const LevelBar = ({ level = 0 }: LevelBarProps) => {
  const widthVariants = [
    'w-[0%]',
    'w-[10%]',
    'w-[20%]',
    'w-[30%]',
    'w-[40%]',
    'w-[50%]',
    'w-[60%]',
    'w-[70%]',
    'w-[80%]',
    'w-[90%]',
    'w-full',
  ];

  return (
    <div className='group w-full cursor-pointer rounded-full bg-neumorph p-[3px] shadow-levelbar'>
      <Gradient
        extraClasses={`h-3 rounded-full flex items-start justify-center transition-all duration-300 ${widthVariants[level]} group-hover:w-full`}>
        <p className='mt-[-1px] text-[.75rem] font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {level}/10
        </p>
      </Gradient>
    </div>
  );
};

export default LevelBar;
