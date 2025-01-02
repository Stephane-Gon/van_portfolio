'use client';

import MainCard from '../MainCard';
import { SupabaseProject } from '../../types';

export const revalidate = 0;

type Props = {
  items: SupabaseProject[];
  setSelectedProject: (project: SupabaseProject) => void;
};

const MainList = ({ items, setSelectedProject }: Props) => {
  const chunkSize = Math.ceil(items.length / 3);
  const column1 = items.slice(0, chunkSize);
  const column2 = items.slice(chunkSize, 2 * chunkSize);
  const column3 = items.slice(2 * chunkSize);

  const _renderCards = (items: SupabaseProject[]) => {
    return items.map(project => (
      <MainCard key={`project-card-id-${project.id}`} project={project} setSelectedProject={setSelectedProject} />
    ));
  };

  return (
    <div className='grid h-full w-full grid-cols-1 gap-5 p-5 md:grid-cols-2 2xl:grid-cols-3'>
      <div className='flex flex-col gap-5 pt-12'>{_renderCards(column1)}</div>
      <div className='flex flex-col gap-5'>{_renderCards(column2)}</div>
      <div className='flex flex-col gap-5 pt-12'>{_renderCards(column3)}</div>
    </div>
  );
};

export default MainList;
