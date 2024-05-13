'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { ToolT } from '../types';
import { getListResponse } from '@/constants';

export const getToolsList = async (): Promise<getListResponse<ToolT>> => {
  const toolsData = await supabaseAdmin.from('tools').select();
  return {
    data: toolsData.data,
    error: toolsData.error,
  };
};
