'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { ProjectT } from '../types';
import { getSingleResponse } from '@/constants';

export const getProject = async (id: number): Promise<getSingleResponse<ProjectT>> => {
  const project = await supabaseAdmin.from('projects').select().eq('id', id);

  return {
    data: project.data ? project.data[0] : null,
    error: project.error,
  };
};
