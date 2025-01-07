import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ToolsStore, defaultTool } from '@/features/tools/types';

export const useToolsStore = create<ToolsStore>()(
  subscribeWithSelector(set => ({
    tab: 'list',
    selectedTool: defaultTool,
    formMainError: '',
    setSelectedTool: tool => set({ selectedTool: tool }),
    setTab: tab => set({ tab, formMainError: '' }),
    setFormMainError: error => set({ formMainError: error }),
  })),
);
