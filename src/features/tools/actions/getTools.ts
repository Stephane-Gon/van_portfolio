'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { ToolT } from '../types';
import { getSingleResponse } from '@/constants';

export const getTool = async (id: number): Promise<getSingleResponse<ToolT>> => {
  const tool = await supabaseAdmin.from('tools').select().eq('id', id);

  return {
    data: tool.data ? tool.data[0] : null,
    error: tool.error,
  };
};
