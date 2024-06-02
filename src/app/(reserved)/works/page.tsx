import WorksContainer from '@/features/works/components/Container';
import List from '@/features/works/components/List';
import Detail from '@/features/works/components/Detail';

export const metadata = {
  metadataBase: 'http://localhost:3000',
  title: 'Works',
  description: 'Works feature dashboard',
};

const Works = async () => {
  return (
    <div className='flex flex-col items-center'>
      <WorksContainer list={<List />} detail={<Detail />} />
    </div>
  );
};

export default Works;
