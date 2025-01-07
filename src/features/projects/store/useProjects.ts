import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ProjectsStore, defaultProject } from '@/features/projects/types';

export const useProjectsStore = create<ProjectsStore>()(
  subscribeWithSelector(set => ({
    tab: 'list',
    selectedProject: defaultProject,
    formMainError: '',
    setSelectedProject: project => set({ selectedProject: project }),
    setTab: tab => set({ tab, formMainError: '' }),
    setFormMainError: error => set({ formMainError: error }),
  })),
);
