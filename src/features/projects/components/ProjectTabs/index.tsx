'use client';
import React from 'react';
import { Tabs } from '@/design-system/organism';

import { useProjectsStore } from '../../store/useProjects';

const ProjectTabs = () => {
  const tab = useProjectsStore(state => state.tab);
  const setTab = useProjectsStore(state => state.setTab);
  const selectedProject = useProjectsStore(state => state.selectedProject);

  return (
    <Tabs
      activeTab={tab}
      setActiveTab={setTab}
      hasSelectedItem={Boolean(selectedProject.id)}
      localStorageItem='selectedProject'
      selectedItem={{
        name: selectedProject?.title,
        id: selectedProject?.id,
      }}
    />
  );
};

export default ProjectTabs;
