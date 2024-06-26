import type { SkillTypes, TOGGLE_TABS } from '@/constants';

export type ToolT = {
  id: number;
  name: string;
  created_at?: string;
  description: string | null;
  icon_url: string;
  types: SkillTypes[];
  level: ToolLevel;
  work_use: boolean;
  personal_use: boolean;
  is_active: boolean;
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
  work_use: boolean;
  personal_use: boolean;
  is_active: boolean;
};

export type ToolsStore = ToolsState & ToolsActions;

export const defaultTool: ToolT = {
  id: 0,
  name: '',
  created_at: '',
  description: '',
  icon_url: '',
  types: [],
  level: '',
  work_use: false,
  personal_use: false,
  is_active: true,
};
