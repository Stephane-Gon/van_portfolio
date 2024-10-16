import AddWorkContainer from '@/features/works/components/AddContainer';
import { getToolsListInput } from '@/features/tools/actions/getToolsListInput';
import { getProjectsListInput } from '@/features/projects/actions/getProjectsListInput';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Work - Add',
  description: 'Add a new work experience to the list of works.',
};

const AddWork = async () => {
  const { data } = await getToolsListInput();
  const tools = data && data.length > 0 ? data.map(tool => ({ value: tool.id, label: tool.name })) : [];

  const { data: pData } = await getProjectsListInput();
  const projects = pData && pData.length > 0 ? pData.map(project => ({ value: project.id, label: project.title })) : [];

  return (
    <div className='flex flex-col items-center'>
      <AddWorkContainer tools={tools} projects={projects} />
    </div>
  );
};

export default AddWork;
