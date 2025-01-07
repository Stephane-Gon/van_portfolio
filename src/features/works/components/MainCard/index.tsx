'use client';

import { ArrowRight } from '@/design-system/icons';
import { SupabaseWork } from '../../types';
import { useAppStore } from '@/features/app/store';
import { WordSlider } from '@/design-system/molecules';
import { SERVICES } from '@/constants';

type Props = {
  work: SupabaseWork;
  setSelectedWork: (work: SupabaseWork | null) => void;
};

const MainCard = ({ work, setSelectedWork }: Props) => {
  const theme = useAppStore(state => state.theme);

  return (
    <div className='flex flex-col gap-4 px-4 lg:flex-row lg:px-12'>
      <div className='flex w-full flex-col gap-2 lg:w-2/3'>
        <h4 className='text-xs text-text opacity-50'>THE WORK:</h4>
        <h2 className='text-xl text-text'>{work.company}</h2>
        <p className='text-md text-text opacity-85'>{work.description}</p>
        <button
          onClick={() => setSelectedWork(work)}
          className='flex items-center gap-1 text-primary decoration-primary outline-text hover:underline'>
          More
          <ArrowRight fill={theme === 'dark' ? '#a3e7fc' : '#ea9e8d'} width={18} height={18} />
        </button>
      </div>
      <div className='flex w-full flex-col items-start gap-4 lg:w-1/3'>
        <div className='flex flex-col items-start justify-start gap-4'>
          <h4 className='text-xs text-text opacity-50'>TOOLS USED:</h4>
          <WordSlider words={work.tools.map(tool => tool.tools.name)} />
        </div>
        <div className='flex flex-col items-start justify-start gap-4'>
          <h4 className='text-xs text-text opacity-50'>SERVICES USED:</h4>
          <div className='flex items-center justify-start gap-2'>
            {work.skills.map(skill => (
              <span
                key={`skill_${skill}`}
                className={`rounded-md border border-l-[5px] border-tertiary bg-accent/90 p-2 text-sm font-semibold text-text shadow-md`}>
                {SERVICES[skill]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
