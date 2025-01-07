export const AVAIALABLE_ENTENSIONS = ['.webp', 'image/svg+xml', '.svg', 'image/webp'];
export const FILE_DISPLAY_NAME_MAX_LENGTH = 20;
export const FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 1 MB in bytes

export const SERVICES = {
  frontend: 'Frontend',
  backend: 'Backend',
  design: 'UI / UX Design',
  ci_cd: 'CI / CD',
  testing: 'Testing',
};

export type TOGGLE_TABS = 'list' | 'detail';

export type SkillTypes = 'frontend' | 'backend' | 'design' | 'ci_cd' | 'testing';

export type Modules = 'tools' | 'projects' | 'works';

export type SelectOption = {
  label: string;
  value: string | number;
};

export type Issue = {
  message?: string;
  fields?: (string | number)[];
};

export interface ActionReturnType<T> {
  status: number;
  message: string;
  issues?: Issue[];
  item: T | null;
}

export interface DeleteResponse<T> {
  data: T | null;
  error: Record<string, any> | null;
}

export interface getListResponse<T> {
  data: T[] | null;
  error: Record<string, any> | null;
}

export interface getSingleResponse<T> {
  data: T | null;
  error: Record<string, any> | null;
}
