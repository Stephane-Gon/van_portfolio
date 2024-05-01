'use client';

import { ActionsBar } from '@/design-system/organism';
import { useToolsStore } from '@/features/tools/store/useTools';
import ToolForm from '../Form';

const AddToolContainer = () => {
  const formMainError = useToolsStore(state => state.formMainError);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <h1 className='text-xl text-text'>Add a new tool:</h1>
      <div className={`flex w-full flex-col gap-4 rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar error={formMainError} backLink='/tools' />
        <ToolForm isEdit={false} />
      </div>
    </div>
  );
};

export default AddToolContainer;
