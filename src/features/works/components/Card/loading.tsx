import { Skeleton } from '@/design-system/atoms';

const WorkCardLoading = () => {
  return (
    <article className='min-h-40 rounded-sm p-2 shadow-glass backdrop-blur-sm'>
      <div className='flex h-full flex-col justify-between gap-10'>
        <span className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-[70%] rounded-sm bg-cardsBg/80' />
          <Skeleton className='h-4 w-[90%] rounded-sm bg-cardsBg/80' />
        </span>
        <Skeleton className='mt-2 h-3 w-full rounded-lg bg-cardsBg/80' />
      </div>
    </article>
  );
};

export default WorkCardLoading;
