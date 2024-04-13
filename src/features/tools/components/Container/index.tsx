'use client';

import ToolTabs from '@/features/tools/components/ToolTabs';
import { ActionsBar } from '@/design-system/organism';
import { useToolsStore } from '@/features/tools/store/useTools';

interface ToolsContainerProps {
  list?: React.ReactNode;
  detail?: React.ReactNode;
}

const ToolsContainer = ({ list, detail }: ToolsContainerProps) => {
  const tab = useToolsStore(state => state.tab);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <ToolTabs />
      <div className={`w-full rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar btnLabel='Add Tool' btnPath='tools/add' />
        <div className='py-4'>{tab === 'list' ? list : detail}</div>
      </div>
    </div>
  );
};

export default ToolsContainer;
