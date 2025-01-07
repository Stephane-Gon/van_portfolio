import AddToolContainer from '@/features/tools/components/AddContainer';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Tool - Add',
  description: 'Add a new tool to the list of tools.',
};

const AddTool = async () => {
  return (
    <div className='flex flex-col items-center'>
      <AddToolContainer />
    </div>
  );
};

export default AddTool;
