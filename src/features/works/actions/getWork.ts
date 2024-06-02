'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { WorkT } from '../types';
import { getSingleResponse } from '@/constants';

export const getWork = async (id: number): Promise<getSingleResponse<WorkT>> => {
  const work = await supabaseAdmin.from('works').select().eq('id', id);

  return {
    data: work.data ? work.data[0] : null,
    error: work.error,
  };
};
