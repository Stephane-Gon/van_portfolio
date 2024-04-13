import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { ToolsStore } from '@/features/tools/types';

export const useToolsStore = create<ToolsStore>()(
  subscribeWithSelector(set => ({
    tab: 'list',
    selectedTool: null,
    setSelectedTool: tool => set({ selectedTool: tool }),
    setTab: tab => set({ tab }),
  })),
);
