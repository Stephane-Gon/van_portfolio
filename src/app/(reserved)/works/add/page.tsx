import AddWorkContainer from '@/features/works/components/AddContainer';
import { getToolsList } from '@/features/tools/actions/getToolsList';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Work - Add',
  description: 'Add a new work experience to the list of works.',
};

const AddWork = async () => {
  const { data } = await getToolsList();

  const tools = data && data.length > 0 ? data.map(tool => ({ value: tool.id, label: tool.name })) : [];

  return (
    <div className='flex flex-col items-center'>
      <AddWorkContainer tools={tools} />
    </div>
  );
};

export default AddWork;
