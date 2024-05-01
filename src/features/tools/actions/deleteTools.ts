'use server';
import { deleteBucketImage, deleteTableItem } from '@/lib/utils';
import type { ToolT } from '../types';
import type { DeleteResponse } from '@/constants';

export const deleteTool = async (tool: ToolT): Promise<DeleteResponse<ToolT>> => {
  const deleteImgRes = await deleteBucketImage<ToolT>(tool.icon_url, 'tools');
  if (deleteImgRes.error) return deleteImgRes;

  const { error } = await deleteTableItem<ToolT>(tool.id.toString(), 'tools');

  return {
    data: null,
    error: error,
  };
};
