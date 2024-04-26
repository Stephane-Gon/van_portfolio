'use client';
import React from 'react';
import { Tabs } from '@/design-system/organism';

import { useToolsStore } from '../../store/useTools';

const ToolTabs = () => {
  const tab = useToolsStore(state => state.tab);
  const setTab = useToolsStore(state => state.setTab);
  const selectedTool = useToolsStore(state => state.selectedTool);

  return (
    <Tabs
      activeTab={tab}
      setActiveTab={setTab}
      hasSelectedItem={Boolean(selectedTool)}
      localStorageItem='selectedTool'
      selectedItemName={selectedTool?.name}
    />
  );
};

export default ToolTabs;
