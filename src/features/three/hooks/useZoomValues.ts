import { projectsZoomData, worksZoomData } from '@/features/three/data/zoom';
import useViewportSize from '@/hooks/useViewport';

export const useZoomValues = () => {
  const { width } = useViewportSize();

  let selectorProjects: keyof typeof projectsZoomData = 'default';
  if (width < 600) {
    selectorProjects = 600;
  } else if (width < 1000) {
    selectorProjects = 1000;
  } else if (width < 2500) {
    selectorProjects = 2500;
  }

  let selectorWork: keyof typeof worksZoomData = 'default';
  if (width < 440) {
    selectorWork = 440;
  } else if (width < 500) {
    selectorWork = 500;
  } else if (width < 650) {
    selectorWork = 650;
  } else if (width < 1000) {
    selectorWork = 1000;
  } else if (width < 2500) {
    selectorWork = 2500;
  }

  const positionProject = projectsZoomData[selectorProjects].position;
  const rotationProject = projectsZoomData[selectorProjects].rotation;

  const positionWork = worksZoomData[selectorWork].position;
  const rotationWork = worksZoomData[selectorWork].rotation;

  return {
    positionProject,
    rotationProject,
    positionWork,
    rotationWork,
  };
};
