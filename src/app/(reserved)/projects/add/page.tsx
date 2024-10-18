import AddProjectContainer from '@/features/projects/components/AddContainer';
import { getToolsListInput } from '@/features/tools/actions/getToolsListInput';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Project - Add',
  description: 'Add a new project to the list of projects.',
};

const AddProject = async () => {
  const { data } = await getToolsListInput();
  const tools = data && data.length > 0 ? data.map(tool => ({ value: tool.id, label: tool.name })) : [];

  return (
    <div className='flex flex-col items-center'>
      <AddProjectContainer tools={tools} />
    </div>
  );
};

export default AddProject;
