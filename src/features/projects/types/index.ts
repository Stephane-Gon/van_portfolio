import type { SkillTypes, TOGGLE_TABS } from '@/constants';

export type ProjectT = {
  id: number;
  created_at?: string;
  title: string;
  skills: SkillTypes[];
  description: string | null;
  slogan: string | null;
  images: string[] | null;
  repository: string | null;
  live_link: string | null;
  challenges: string | null;
  learned: string | null;
  main_image: string;
};

type ProjectsState = {
  tab: TOGGLE_TABS;
  selectedProject: ProjectT;
  formMainError: string;
};

type ProjectsActions = {
  setTab: (tab: TOGGLE_TABS) => void;
  setSelectedProject: (project: ProjectT) => void;
  setFormMainError: (error: string) => void;
};

export type ProjectsForm = {
  title: string;
  description: string;
  skills: SkillTypes[];
  images: string[] | File[];
  slogan?: string;
  repository?: string;
  live_link?: string;
  challenges?: string;
  learned?: string;
  main_image: string | File;
};

export type ProjectsStore = ProjectsState & ProjectsActions;

export const defaultProject: ProjectT = {
  id: 0,
  created_at: '',
  description: '',
  title: '',
  skills: [],
  slogan: '',
  images: [],
  repository: '',
  live_link: '',
  challenges: '',
  learned: '',
  main_image: '',
};
