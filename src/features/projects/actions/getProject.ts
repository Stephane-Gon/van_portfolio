'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { SupabaseProject } from '../types';
import { getSingleResponse } from '@/constants';

export const getProject = async (id: number): Promise<getSingleResponse<SupabaseProject>> => {
  const project = await supabaseAdmin
    .from('projects')
    .select(
      `
    *,
    tools: project_tools(project_id, tool_id, id, tools(name, id))  
  `,
    )
    .eq('id', id);

  return {
    data: project.data ? project.data[0] : null,
    error: project.error,
  };
};
