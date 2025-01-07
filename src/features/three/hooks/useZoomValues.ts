import { projectsZoomData, worksZoomData, toolsZoomData } from '@/features/three/data/zoom';
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

  let selectorTools: keyof typeof toolsZoomData = 'default';
  if (width < 440) {
    selectorTools = 440;
  } else if (width < 500) {
    selectorTools = 500;
  } else if (width < 650) {
    selectorTools = 650;
  } else if (width < 1000) {
    selectorTools = 1000;
  }

  const positionProject = projectsZoomData[selectorProjects].position;
  const rotationProject = projectsZoomData[selectorProjects].rotation;

  const positionWork = worksZoomData[selectorWork].position;
  const rotationWork = worksZoomData[selectorWork].rotation;

  const positionTool = toolsZoomData[selectorTools].position;
  const rotationTool = toolsZoomData[selectorTools].rotation;

  return {
    positionProject,
    rotationProject,
    positionWork,
    rotationWork,
    positionTool,
    rotationTool,
  };
};
