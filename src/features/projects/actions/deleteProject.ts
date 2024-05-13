'use server';
import { deleteBucketImage, deleteTableItem } from '@/lib/utils';
import type { ProjectT } from '../types';
import type { DeleteResponse } from '@/constants';

export const deleteProject = async (project: ProjectT): Promise<DeleteResponse<ProjectT>> => {
  //TODO - Apagar o resto das imagens
  const deleteImgRes = await deleteBucketImage<ProjectT>(project.main_image, 'projects');
  if (deleteImgRes.error) return deleteImgRes;

  const { error } = await deleteTableItem<ProjectT>(project.id.toString(), 'projects');

  return {
    data: null,
    error: error,
  };
};
