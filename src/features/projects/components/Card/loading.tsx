import { Skeleton } from '@/design-system/atoms';

const ProjectCardLoading = () => {
  return (
    <article className='rounded-sm p-2 shadow-glass backdrop-blur-sm'>
      <div className='flex items-center justify-start gap-2'>
        <Skeleton className='size-[90px] rounded-[100%] bg-cardsBg/80' />
        <Skeleton className='h-6 flex-1 rounded-sm bg-cardsBg/80'></Skeleton>
      </div>
      <div className='mt-3 px-4'>
        <Skeleton className='h-4 w-[70%] rounded-sm bg-cardsBg/80' />
        <Skeleton className='mt-2 h-3 w-full rounded-lg bg-cardsBg/80' />
      </div>
    </article>
  );
};

export default ProjectCardLoading;
