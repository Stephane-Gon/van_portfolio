import ToolTabs from '@/features/tools/components/ToolTabs';
import List from '@/features/tools/components/List';
import { ActionsBar } from '@/design-system/organism';

const ToolsContainer = () => {
  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <ToolTabs />
      <div className={`h-[200px] w-full rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar btnLabel='Add Tool' btnPath='tools/add' />
        <div className='py-2'>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ToolsContainer;
