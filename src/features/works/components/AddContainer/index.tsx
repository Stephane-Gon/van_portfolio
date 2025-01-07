'use client';

import { ActionsBar } from '@/design-system/organism';
import { useWorksStore } from '@/features/works/store/useWorks';
import WorkForm from '../Form';
import type { SelectOption } from '@/constants';

interface AddProjectContainerProps {
  tools: SelectOption[];
  projects: SelectOption[];
}

const AddWorkContainer = ({ tools, projects }: AddProjectContainerProps) => {
  const formMainError = useWorksStore(state => state.formMainError);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <h1 className='text-xl text-text'>Add a new work:</h1>
      <div className={`flex w-full flex-col gap-4 rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar error={formMainError} backLink='/works' backTitle='Back to works list' />
        <WorkForm projects={projects} tools={tools} isEdit={false} />
      </div>
    </div>
  );
};

export default AddWorkContainer;
