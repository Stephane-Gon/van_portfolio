import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { WorksStore, defaultWork } from '@/features/works/types';

export const useWorksStore = create<WorksStore>()(
  subscribeWithSelector(set => ({
    tab: 'list',
    selectedWork: defaultWork,
    formMainError: '',
    setSelectedWork: work => set({ selectedWork: work }),
    setTab: tab => set({ tab, formMainError: '' }),
    setFormMainError: error => set({ formMainError: error }),
  })),
);
