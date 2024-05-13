'use client';

import { useEffect } from 'react';
import ProjectTabs from '@/features/projects/components/ProjectTabs';
import { ActionsBar } from '@/design-system/organism';
import { useProjectsStore } from '@/features/projects/store/useProjects';
import { getProject } from '../../actions/getProject';

interface ProjectsContainerProps {
  list?: React.ReactNode;
  detail?: React.ReactNode;
}

const ProjectsContainer = ({ list, detail }: ProjectsContainerProps) => {
  const tab = useProjectsStore(state => state.tab);
  const setTab = useProjectsStore(state => state.setTab);
  const formMainError = useProjectsStore(state => state.formMainError);
  const setFormMainError = useProjectsStore(state => state.setFormMainError);
  const setSelectedProject = useProjectsStore(state => state.setSelectedProject);

  //* Here I check if there is a selected project in the local storage
  //* If there is, I get the project, save it in the store and set the tab to detail
  useEffect(() => {
    const storageSelectedProject = localStorage.getItem('selectedProject');

    const getSelectedProject = async () => {
      const project = await getProject(Number(storageSelectedProject));
      if (project.data) {
        setTab('detail');
        setSelectedProject(project.data);
      } else if (project.error) {
        setTab('list');
        setFormMainError(project.error.message);
        localStorage.removeItem('selectedProject');
      }
    };

    if (storageSelectedProject) getSelectedProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <ProjectTabs />
      <div className={`w-full rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar btnLabel='Add Project' btnPath='projects/add' error={formMainError} />
        <div className='py-4'>{tab === 'list' ? list : detail}</div>
      </div>
    </div>
  );
};

export default ProjectsContainer;
