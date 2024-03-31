import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { TOGGLE_TABS } from '@/constants';

type ToolsState = {
  tab: TOGGLE_TABS;
};

type ToolsActions = {
  setTab: (tab: TOGGLE_TABS) => void;
};

type ToolsStore = ToolsState & ToolsActions;

export const useToolsStore = create<ToolsStore>()(
  subscribeWithSelector(set => ({
    tab: 'list',
    setTab: tab => set({ tab }),
  })),
);
