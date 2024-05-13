'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { ProjectT } from '../types';
import { getListResponse } from '@/constants';

export const getProjectsList = async (): Promise<getListResponse<ProjectT>> => {
  const projectsData = await supabaseAdmin.from('projects').select();
  return {
    data: projectsData.data,
    error: projectsData.error,
  };
};
