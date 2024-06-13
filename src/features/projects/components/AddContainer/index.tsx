'use client';

import { ActionsBar } from '@/design-system/organism';
import { useProjectsStore } from '@/features/projects/store/useProjects';
import ProgectForm from '../Form';

interface AddProjectContainerProps {
  tools: { value: number; label: string }[];
}

const AddProjectContainer = ({ tools }: AddProjectContainerProps) => {
  const formMainError = useProjectsStore(state => state.formMainError);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <h1 className='text-xl text-text'>Add a new project:</h1>
      <div className={`flex w-full flex-col gap-4 rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar error={formMainError} backLink='/projects' backTitle='Back to projects list' />
        <ProgectForm tools={tools} isEdit={false} />
      </div>
    </div>
  );
};

export default AddProjectContainer;
