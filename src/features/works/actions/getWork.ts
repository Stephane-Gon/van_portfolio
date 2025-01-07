'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { SupabaseWork } from '../types';
import { getSingleResponse } from '@/constants';

export const getWork = async (id: number): Promise<getSingleResponse<SupabaseWork>> => {
  const work = await supabaseAdmin
    .from('works')
    .select(
      `
    *,
    tools: work_tools(work_id, tool_id, id, tools(name, id)),
    projects: work_projects(work_id, project_id, id, projects(title, id))  
  `,
    )
    .eq('id', id);

  return {
    data: work.data ? work.data[0] : null,
    error: work.error,
  };
};
