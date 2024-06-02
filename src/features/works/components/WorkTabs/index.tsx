'use client';
import React from 'react';
import { Tabs } from '@/design-system/organism';

import { useWorksStore } from '../../store/useWorks';

const WorkTabs = () => {
  const tab = useWorksStore(state => state.tab);
  const setTab = useWorksStore(state => state.setTab);
  const selectedWork = useWorksStore(state => state.selectedWork);

  return (
    <Tabs
      activeTab={tab}
      setActiveTab={setTab}
      hasSelectedItem={Boolean(selectedWork.id)}
      localStorageItem='selectedWork'
      selectedItem={{
        name: selectedWork?.company,
        id: selectedWork?.id,
      }}
    />
  );
};

export default WorkTabs;
