import ProjectsContainer from '@/features/projects/components/Container';
import Detail from '@/features/projects/components/Detail';
import List from '@/features/projects/components/List';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Projects',
  description: 'Projects feature dashboard',
};

const Projects = async () => {
  return (
    <div className='flex flex-col items-center'>
      <ProjectsContainer list={<List />} detail={<Detail />} />
    </div>
  );
};

export default Projects;
