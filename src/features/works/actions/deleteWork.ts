'use server';
import { deleteTableItem } from '@/lib/utils';
import type { WorkT } from '../types';
import type { DeleteResponse } from '@/constants';

export const deleteWork = async (work: WorkT): Promise<DeleteResponse<WorkT>> => {
  const { error } = await deleteTableItem<WorkT>(work.id.toString(), 'works');

  return {
    data: null,
    error: error,
  };
};
