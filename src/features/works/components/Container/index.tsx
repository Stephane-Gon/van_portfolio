'use client';
import { useEffect } from 'react';
import { useWorksStore } from '../../store/useWorks';
import { getWork } from '../../actions/getWork';
import { ActionsBar } from '@/design-system/organism';
import WorkTabs from '../WorkTabs';

interface WorksContainerProps {
  list?: React.ReactNode;
  detail?: React.ReactNode;
}

const WorksContainer = ({ list, detail }: WorksContainerProps) => {
  const tab = useWorksStore(state => state.tab);
  const setTab = useWorksStore(state => state.setTab);
  const formMainError = useWorksStore(state => state.formMainError);
  const setFormMainError = useWorksStore(state => state.setFormMainError);
  const setSelectedWork = useWorksStore(state => state.setSelectedWork);

  //* Here I check if there is a selected work in the local storage
  //* If there is, I get the work, save it in the store and set the tab to detail
  useEffect(() => {
    const storageSelectedWork = localStorage.getItem('selectedWork');

    const getSelectedWork = async () => {
      const work = await getWork(Number(storageSelectedWork));
      if (work.data) {
        setTab('detail');
        setSelectedWork({
          ...work.data,
          tools: work.data.tools.map(work => ({ value: work.tool_id, label: work.tools.name })),
          projects: work.data.projects.map(work => ({ value: work.project_id, label: work.projects.title })),
        });
      } else if (work.error) {
        setTab('list');
        setFormMainError(work.error.message);
        localStorage.removeItem('selectedWork');
      }
    };

    if (storageSelectedWork) getSelectedWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <WorkTabs />
      <div className={`w-full rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar btnLabel='Add Work' btnPath='works/add' error={formMainError} />
        <div className='py-4'>{tab === 'list' ? list : detail}</div>
      </div>
    </div>
  );
};

export default WorksContainer;
