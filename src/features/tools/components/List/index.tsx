import dynamic from 'next/dynamic';
import ToolCardLoading from '../Card/loading';
import type { ToolT } from '@/features/tools/types';
import { getToolsList } from '@/features/tools/actions/getToolsList';

const ToolCard = dynamic(() => import('../Card'), { loading: () => <ToolCardLoading /> });

const List = async () => {
  const { data, error } = await getToolsList();

  const _handleErrorMessage = (title: string, text?: string) => {
    return (
      <div className='w-full text-center'>
        <h2 className='text-2xl text-text'>{title}</h2>
        {text && <p className='text-text'>{text}</p>}
      </div>
    );
  };

  if (error) {
    return _handleErrorMessage('Error while fetching the tools!', error.message);
  }

  if (data && data.length === 0) {
    return _handleErrorMessage('No tools available!', 'Add a new tool by pressing the button.');
  }

  const _renderCards = () => {
    return data?.map((tool: ToolT) => <ToolCard key={`tool-card-id-${tool.id}`} tool={tool} />);
  };

  return <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>{_renderCards()}</div>;
};

export default List;
