'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { ToolT } from '../types';

interface GetToolResponse {
  data: ToolT | null;
  error: Record<string, any> | null;
}

export const getTool = async (id: number): Promise<GetToolResponse> => {
  const tool = await supabaseAdmin.from('tools').select().eq('id', id);

  return {
    data: tool.data ? tool.data[0] : null,
    error: tool.error,
  };
};
