import dynamic from 'next/dynamic';
import ProjectCardLoading from '../Card/loading';
import type { SupabaseProject } from '@/features/projects/types';
import { getProjectsList } from '@/features/projects/actions/getProjectsList';
import { ListError } from '@/design-system/atoms';

const ProjectCard = dynamic(() => import('../Card'), { loading: () => <ProjectCardLoading /> });

const List = async () => {
  const { data, error } = await getProjectsList();
  console.log('🚀 ~ List ~ data:', data);

  if (error) {
    return <ListError title='Error while fetching the projects!' text={error.message} />;
  }

  if (data && data.length === 0) {
    return <ListError title='No projects available!' text='Add a new project by pressing the button.' />;
  }

  const _renderCards = () => {
    return data?.map((project: SupabaseProject) => (
      <ProjectCard key={`project-card-id-${project.id}`} project={project} />
    ));
  };

  return <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>{_renderCards()}</div>;
};

export default List;
