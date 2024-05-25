import AddProjectContainer from '@/features/projects/components/AddContainer';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Project - Add',
  description: 'Add a new project to the list of projects.',
};

const AddProject = async () => {
  return (
    <div className='flex flex-col items-center'>
      <AddProjectContainer />
    </div>
  );
};

export default AddProject;
