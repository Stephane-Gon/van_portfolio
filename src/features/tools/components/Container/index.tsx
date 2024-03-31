import ToolTabs from '@/features/tools/components/ToolTabs';
import List from '@/features/tools/components/List';

const ToolsContainer = () => {
  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <ToolTabs />
      <div className={`h-[200px] w-full rounded-2xl bg-glassSidebar/30 p-4 shadow-glass backdrop-blur-sm`}>
        {/* TODO - Aqui adiciono uma row com o ADD BTN */}
        <div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ToolsContainer;
