import ProjectForm from '../Form';
import { getToolsListInput } from '@/features/tools/actions/getToolsListInput';

const Detail = async () => {
  const { data } = await getToolsListInput();

  const tools = data && data.length > 0 ? data.map(tool => ({ value: tool.id, label: tool.name })) : [];

  return (
    <div>
      <ProjectForm tools={tools} isEdit={true} />
    </div>
  );
};

export default Detail;
