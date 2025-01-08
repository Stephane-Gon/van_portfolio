'use client';
import Image from 'next/image';

import { useAppStore } from '@/features/app/store';
import { SupabaseProject } from '../../types';
import { ArrowRight } from '@/design-system/icons';
import { WordSlider } from '@/design-system/molecules';

type Props = {
  project: SupabaseProject;
  setSelectedProject: (project: SupabaseProject) => void;
};

// TODO - Bug no word slider, quando abro um detail e depois volto para lista

const MainCard = ({ project, setSelectedProject }: Props) => {
  const theme = useAppStore(state => state.theme);

  return (
    <div className='z-10 h-96 cursor-pointer rounded-sm bg-text/20 duration-200 hover:scale-105 2xl:h-64'>
      <div className='flex h-full w-full flex-wrap items-center gap-2 p-2 2xl:flex-nowrap'>
        <div className='relative h-2/3 w-full 2xl:h-full  2xl:w-2/3'>
          <Image
            src={project.main_image || '/placeholder_img.webp'}
            alt={`Project - ${project.title} - main image`}
            fill
            objectFit='cover'
            className='rounded-sm'
          />
        </div>
        <div className='flex w-full flex-col justify-start gap-2 rounded-sm bg-accent px-2 py-1 2xl:h-full 2xl:w-1/3'>
          <h5 className='text-text'>{project.title}</h5>
          <div className='flex flex-1 flex-col items-center justify-center p-2'>
            <WordSlider words={project.tools.map(tool => tool.tools.name)} />
          </div>
          <button
            onClick={() => setSelectedProject(project)}
            className='flex w-full items-center justify-end gap-1 text-primary decoration-primary outline-text hover:underline'>
            More
            <ArrowRight fill={theme === 'dark' ? '#a3e7fc' : '#ea9e8d'} width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
