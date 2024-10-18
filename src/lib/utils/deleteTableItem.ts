'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { DeleteResponse } from '@/constants';

const deleteTableItem = async <T>(id: string, table: string): Promise<DeleteResponse<T>> => {
  const { error } = await supabaseAdmin.from(table).delete().eq('id', id);

  return {
    data: null,
    error: error,
  };
};

export default deleteTableItem;
