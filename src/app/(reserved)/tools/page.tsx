import List from '@/features/tools/components/List';
import ToolTabs from '@/features/tools/components/ToolTabs';

const Tools = async () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <ToolTabs />
      <List />
    </div>
  );
};

export default Tools;
