import type { SkillTypes, TOGGLE_TABS } from '@/constants';
import type { ToolT } from '@/features/tools/types';

export type WorkT = {
  id: number;
  created_at?: string;
  role: string;
  skills: SkillTypes[];
  company: string;
  started_at: string | null;
  ended_at: string | null;
  description: string | null;
  achievements: string | null;
  tools: { value: number; label: string }[];
};

export type SupabaseWork = {
  id: number;
  created_at?: string;
  role: string;
  skills: SkillTypes[];
  company: string;
  started_at: string | null;
  ended_at: string | null;
  description: string | null;
  achievements: string | null;
  tools: WorkToolT[];
};

export type WorkToolT = {
  id: number;
  work_id: number;
  tool_id: number;
  tools: ToolT;
};

type WorksState = {
  tab: TOGGLE_TABS;
  selectedWork: WorkT;
  formMainError: string;
};

type WorksActions = {
  setTab: (tab: TOGGLE_TABS) => void;
  setSelectedWork: (work: WorkT) => void;
  setFormMainError: (error: string) => void;
};

export type WorksForm = {
  role: string;
  skills: SkillTypes[];
  description: string;
  company: string;
  started_at?: string;
  ended_at?: string;
  achievements?: string;
};

export type WorksStore = WorksState & WorksActions;

export const defaultWork: WorkT = {
  id: 0,
  created_at: '',
  description: '',
  role: '',
  skills: [],
  company: '',
  started_at: '',
  ended_at: '',
  achievements: '',
  tools: [],
};
