'use client';

import { ActionsBar } from '@/design-system/organism';
import { useWorksStore } from '@/features/works/store/useWorks';
import WorkForm from '../Form';

const AddWorkContainer = () => {
  const formMainError = useWorksStore(state => state.formMainError);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <h1 className='text-xl text-text'>Add a new tool:</h1>
      <div className={`flex w-full flex-col gap-4 rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar error={formMainError} backLink='/works' backTitle='Back to works list' />
        <WorkForm isEdit={false} />
      </div>
    </div>
  );
};

export default AddWorkContainer;
