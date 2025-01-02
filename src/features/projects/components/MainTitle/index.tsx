'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ChevronLeft } from '@/design-system/icons';
import { SupabaseProject } from '../../types';

type Props = {
  title?: string;
  setSelectedProject: (project: SupabaseProject | null) => void;
};

const MainTitle = ({ title, setSelectedProject }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        {
          y: title ? 0 : -50,
        },
        {
          y: title ? -50 : 0,
          duration: 0.5,
        },
      );
    }
  }, [title]);

  return (
    <div className='flex h-[72px] overflow-hidden'>
      <div ref={ref} className='w-full p-5'>
        <h1 className='text-2xl text-text'>PROJECTS:</h1>
        <div className='mt-[15px] flex items-center justify-start'>
          <ChevronLeft
            cursor='pointer'
            width={34}
            height={34}
            className='ml-[-8px] fill-text pb-[4px]'
            onClick={() => setSelectedProject(null)}
          />
          <h1 className='text-2xl text-text'>{title ?? 'DETAIL'}</h1>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;
