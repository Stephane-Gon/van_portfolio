'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { SupabaseProject } from '../types';
import { getListResponse } from '@/constants';

export const getProjectsList = async (): Promise<getListResponse<SupabaseProject>> => {
  const projectsData = await supabaseAdmin.from('projects').select(`
    *,
    tools: project_tools(project_id, tool_id, id, tools(name, id))  
  `);
  return {
    data: projectsData.data,
    error: projectsData.error,
  };
};
