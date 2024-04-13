import ToolsContainer from '@/features/tools/components/Container';
import Detail from '@/features/tools/components/Detail';
import List from '@/features/tools/components/List';

const Tools = async () => {
  return (
    <div className='flex flex-col items-center'>
      <ToolsContainer list={<List />} detail={<Detail />} />
    </div>
  );
};

export default Tools;
