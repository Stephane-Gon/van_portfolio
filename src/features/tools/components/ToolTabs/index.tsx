'use client';
import React from 'react';
import { Tabs } from '@/design-system/organism';

import { useToolsStore } from '../../store/useTools';

const ToolTabs = () => {
  const tab = useToolsStore(state => state.tab);
  const setTab = useToolsStore(state => state.setTab);

  return <Tabs activeTab={tab} setActiveTab={setTab} />;
};

export default ToolTabs;
