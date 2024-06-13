import WorkForm from '../Form';
import { getToolsList } from '@/features/tools/actions/getToolsList';

const Detail = async () => {
  const { data } = await getToolsList();

  const tools = data && data.length > 0 ? data.map(tool => ({ value: tool.id, label: tool.name })) : [];

  return (
    <div>
      <WorkForm tools={tools} isEdit={true} />
    </div>
  );
};

export default Detail;
