'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/design-system/atoms';
import { Add } from '@/design-system/icons';

type ActionsBarProps = {
  btnLabel: string;
  btnPath: string;
};

const ActionsBar = ({ btnPath, btnLabel }: ActionsBarProps) => {
  const router = useRouter();

  return (
    <div className='flex w-full flex-wrap items-center justify-between'>
      <div></div>
      <span className='w-full sm:w-1/2 lg:w-1/5'>
        <Button
          onClick={async () => router.push(btnPath)}
          label={btnLabel}
          iconLeft={true}
          icon={<Add width='1.2rem' height='1.2rem' />}
        />
      </span>
    </div>
  );
};

export default ActionsBar;
