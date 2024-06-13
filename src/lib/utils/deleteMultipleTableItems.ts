'use server';
import { supabaseAdmin } from '@/lib/supabase';
import type { DeleteResponse } from '@/constants';

//* This action deletes multiple rows from a table buy a column value
const deleteMultipleTableItems = async <T>(
  table: string,
  column: string,
  values: Array<string | number>,
): Promise<DeleteResponse<T>> => {
  const { error } = await supabaseAdmin.from(table).delete().in(column, values);

  return {
    data: null,
    error: error,
  };
};

export default deleteMultipleTableItems;
