'use client';

import { useEffect } from 'react';
import ToolTabs from '@/features/tools/components/ToolTabs';
import { ActionsBar } from '@/design-system/organism';
import { useToolsStore } from '@/features/tools/store/useTools';
import { getTool } from '../../actions/getTools';

interface ToolsContainerProps {
  list?: React.ReactNode;
  detail?: React.ReactNode;
}

const ToolsContainer = ({ list, detail }: ToolsContainerProps) => {
  const tab = useToolsStore(state => state.tab);
  const setTab = useToolsStore(state => state.setTab);
  const formMainError = useToolsStore(state => state.formMainError);
  const setFormMainError = useToolsStore(state => state.setFormMainError);
  const setSelectedTool = useToolsStore(state => state.setSelectedTool);
  const storageSelectedTool = window.localStorage.getItem('selectedTool');

  //* Here I check if there is a selected tool in the local storage
  //* If there is, I get the tool, save it in the store and set the tab to detail
  useEffect(() => {
    const getSelectedTool = async () => {
      const tool = await getTool(Number(storageSelectedTool));
      if (tool.data) {
        setTab('detail');
        setSelectedTool(tool.data);
      } else if (tool.error) {
        setTab('list');
        setFormMainError(tool.error.message);
        window.localStorage.removeItem('selectedTool');
      }
    };
    if (storageSelectedTool) getSelectedTool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <ToolTabs />
      <div className={`w-full rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar btnLabel='Add Tool' btnPath='tools/add' error={formMainError} />
        <div className='py-4'>{tab === 'list' ? list : detail}</div>
      </div>
    </div>
  );
};

export default ToolsContainer;
