'use server';
import { deleteBucketImages, deleteTableItem } from '@/lib/utils';
import type { ProjectT } from '../types';
import type { DeleteResponse } from '@/constants';

export const deleteProject = async (project: ProjectT): Promise<DeleteResponse<ProjectT>> => {
  const toDeleteImages: string[] = [];

  if (project.main_image && typeof project.main_image === 'string') {
    toDeleteImages.push(project.main_image);
  }
  if (project.images && project.images.length > 0) {
    project.images.forEach(image => {
      if (typeof image === 'string') {
        toDeleteImages.push(image);
      }
    });
  }

  if (toDeleteImages.length > 0) {
    const deleteImgRes = await deleteBucketImages<ProjectT>(toDeleteImages, 'projects');
    if (deleteImgRes.error) return deleteImgRes;
  }

  //* Ao apagar o projeto ele também apaga as rows relacionadas em outras tabelas
  const { error } = await deleteTableItem<ProjectT>(project.id.toString(), 'projects');

  return {
    data: null,
    error: error,
  };
};
