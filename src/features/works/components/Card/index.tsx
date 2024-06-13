'use client';
import { Button } from '@/design-system/atoms';
import { useWorksStore } from '../../store/useWorks';
import type { SupabaseWork } from '../../types';

interface WorkCardProps {
  work: SupabaseWork;
}

const WorkCard = ({ work }: WorkCardProps) => {
  const setSelectedWork = useWorksStore(state => state.setSelectedWork);
  const setTab = useWorksStore(state => state.setTab);

  return (
    <article className='relative min-h-40 cursor-pointer rounded-sm bg-cardsBg/20 p-2 shadow-glass backdrop-blur-sm'>
      <div className='relative flex h-full flex-col justify-between'>
        <span className='text-center'>
          <h2 className='ml-4 text-xl text-text'>{work.company}</h2>
          <h4 className='text-md ml-4 text-text'>I worked as a {work.role}</h4>
        </span>
        <div className='mx-auto flex flex-col justify-between px-8 py-2 text-center'>
          <Button
            label='Editar'
            onClick={() => {
              localStorage.setItem('selectedWork', JSON.stringify(work.id));
              setSelectedWork({
                ...work,
                tools: work.tools.map(work => ({ value: work.tool_id, label: work.tools.name })),
              });
              setTab('detail');
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default WorkCard;
