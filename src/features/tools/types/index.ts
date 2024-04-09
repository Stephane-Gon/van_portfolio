import type { SkillTypes } from '@/constants';

export type ToolT = {
  id: number;
  name: string;
  created_at: string;
  description: string | null;
  icon_path: string;
  icon_url: string;
  types: SkillTypes[];
  level: ToolLevel;
};

type ToolLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
