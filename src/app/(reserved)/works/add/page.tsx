import AddWorkContainer from '@/features/works/components/AddContainer';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Work - Add',
  description: 'Add a new work experience to the list of works.',
};

const AddWork = async () => {
  return (
    <div className='flex flex-col items-center'>
      <AddWorkContainer />
    </div>
  );
};

export default AddWork;
