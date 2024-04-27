'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/design-system/atoms';
import { Add, ChevronLeft } from '@/design-system/icons';

type ActionsBarProps = {
  btnLabel?: string;
  btnPath?: string;
  error?: string;
  backLink?: string;
};

const ActionsBar = ({ btnPath, btnLabel, error, backLink }: ActionsBarProps) => {
  const router = useRouter();

  const _renderBackLink = () => {
    return (
      backLink && (
        <span className='group flex items-start' onClick={() => router.push(backLink)}>
          <ChevronLeft
            width='1.55rem'
            height='1.55rem'
            className='fill-text group-hover:fill-primary'
            cursor='pointer'
          />
          <p className='cursor-pointer text-lg text-text group-hover:text-primary'>Tools List</p>
        </span>
      )
    );
  };

  const _renderFormError = () => {
    return error && <p className='text-md text-dangerRed'>{error}*</p>;
  };

  const _renderButton = () => {
    return (
      btnLabel && (
        <Button
          onClick={async () => btnPath && router.push(btnPath)}
          label={btnLabel}
          iconLeft={true}
          icon={<Add width='1.2rem' height='1.2rem' />}
        />
      )
    );
  };

  return (
    <div className='flex w-full flex-wrap items-center justify-between'>
      <div>{_renderBackLink()}</div>
      <div>{_renderFormError()}</div>
      <span className='w-full sm:w-1/2 lg:w-1/5'>{_renderButton()}</span>
    </div>
  );
};

export default ActionsBar;
