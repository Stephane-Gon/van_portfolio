import type { SkillTypes, TOGGLE_TABS } from '@/constants';

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
};
