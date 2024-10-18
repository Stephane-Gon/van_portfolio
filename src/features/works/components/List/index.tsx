import dynamic from 'next/dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import { ListError } from '@/design-system/atoms';
import WorkCardLoading from '../Card/loading';
import type { SupabaseWork } from '@/features/works/types';
import { getWorksList } from '../../actions/getWorksList';

const WorkCard = dynamic(() => import('../Card'), { loading: () => <WorkCardLoading /> });

const List = async () => {
  noStore();
  const { data, error } = await getWorksList();

  if (error) {
    return <ListError title='Error while fetching the works!' text={error.message} />;
  }

  if (data && data.length === 0) {
    return <ListError title='No works available!' text='Add a new work by pressing the button.' />;
  }

  const _renderCards = () => {
    return data?.map((work: SupabaseWork) => <WorkCard key={`work-card-id-${work.id}`} work={work} />);
  };

  return <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>{_renderCards()}</div>;
};

export default List;
