import dynamic from 'next/dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import ToolCardLoading from '../Card/loading';
import type { ToolT } from '@/features/tools/types';
import { getToolsList } from '@/features/tools/actions/getToolsList';
import { ListError } from '@/design-system/atoms';

const ToolCard = dynamic(() => import('../Card'), { loading: () => <ToolCardLoading /> });

const List = async () => {
  noStore();
  const { data, error } = await getToolsList();

  if (error) {
    return <ListError title='Error while fetching the tools!' text={error.message} />;
  }

  if (data && data.length === 0) {
    return <ListError title='No tools available!' text='Add a new tool by pressing the button.' />;
  }

  const _renderCards = () => {
    return data?.map((tool: ToolT) => <ToolCard key={`tool-card-id-${tool.id}`} tool={tool} />);
  };

  return <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>{_renderCards()}</div>;
};

export default List;
