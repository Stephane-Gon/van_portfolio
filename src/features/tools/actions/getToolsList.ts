'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { ToolT } from '../types';

interface ToolsListResponse {
  data: ToolT[] | null;
  error: Record<string, any> | null;
}

export const getToolsList = async (): Promise<ToolsListResponse> => {
  const toolsData = await supabaseAdmin.from('tools').select();
  return {
    data: toolsData.data,
    error: toolsData.error,
  };
};
