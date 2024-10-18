import type { SkillTypes, TOGGLE_TABS } from '@/constants';
import type { ToolT } from '@/features/tools/types';

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
  image_counter: number;
  tools: { value: number; label: string }[];
  is_personal: boolean;
  finished_at: string | null;
  is_active: boolean;
};

export type SupabaseProject = {
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
  image_counter: number;
  tools: ProjectToolT[];
  is_personal: boolean;
  finished_at: string | null;
  is_active: boolean;
};

export type ProjectToolT = {
  id: number;
  project_id: number;
  tool_id: number;
  tools: ToolT;
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
  is_personal: boolean;
  finished_at: string;
  is_active: boolean;
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
  image_counter: 0,
  tools: [],
  is_personal: false,
  is_active: true,
  finished_at: '',
};
