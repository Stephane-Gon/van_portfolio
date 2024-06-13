'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { SupabaseWork } from '../types';
import { getListResponse } from '@/constants';

export const getWorksList = async (): Promise<getListResponse<SupabaseWork>> => {
  const worksData = await supabaseAdmin.from('works').select(`
    *,
    tools: work_tools(work_id, tool_id, id, tools(name, id)),
    projects: work_projects(work_id, project_id, id, projects(title, id))  
  `);
  return {
    data: worksData.data,
    error: worksData.error,
  };
};
