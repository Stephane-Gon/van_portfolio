'use server';
import { supabaseAdmin } from '@/lib/supabase';
import { getListResponse } from '@/constants';

export const getToolsListInput = async (): Promise<getListResponse<{ id: string; name: string }>> => {
  const toolsData = await supabaseAdmin.from('tools').select('id, name').eq('is_active', true);
  return {
    data: toolsData.data,
    error: toolsData.error,
  };
};
