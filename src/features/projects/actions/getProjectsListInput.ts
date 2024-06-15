'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { getListResponse } from '@/constants';

export const getProjectsListInput = async (): Promise<getListResponse<{ id: string; title: string }>> => {
  const projectsData = await supabaseAdmin.from('projects').select(`id, title`).eq('is_active', true);
  return {
    data: projectsData.data,
    error: projectsData.error,
  };
};
