import type { SkillTypes, TOGGLE_TABS } from '@/constants';

export type ToolT = {
  id: number;
  name: string;
  created_at?: string;
  description: string | null;
  icon_url: string;
  types: SkillTypes[];
  level: ToolLevel;
};

export type ToolLevel = '' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

type ToolsState = {
  tab: TOGGLE_TABS;
  selectedTool: ToolT;
  formMainError: string;
};

type ToolsActions = {
  setTab: (tab: TOGGLE_TABS) => void;
  setSelectedTool: (tool: ToolT) => void;
  setFormMainError: (error: string) => void;
};

export type ToolsForm = {
  name: string;
  description: string;
  types: SkillTypes[];
  level: ToolLevel;
  icon_url: string | File;
};

export type ToolsStore = ToolsState & ToolsActions;
