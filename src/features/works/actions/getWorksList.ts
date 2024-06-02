'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { WorkT } from '../types';
import { getListResponse } from '@/constants';

export const getWorksList = async (): Promise<getListResponse<WorkT>> => {
  const worksData = await supabaseAdmin.from('works').select();
  return {
    data: worksData.data,
    error: worksData.error,
  };
};
