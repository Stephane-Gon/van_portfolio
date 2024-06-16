import WorkForm from '../Form';
import { getToolsListInput } from '@/features/tools/actions/getToolsListInput';
import { getProjectsListInput } from '@/features/projects/actions/getProjectsListInput';

const Detail = async () => {
  const { data } = await getToolsListInput();
  const tools = data && data.length > 0 ? data.map(tool => ({ value: tool.id, label: tool.name })) : [];

  const { data: pData } = await getProjectsListInput();
  const projects = pData && pData.length > 0 ? pData.map(project => ({ value: project.id, label: project.title })) : [];

  return (
    <div>
      <WorkForm tools={tools} projects={projects} isEdit={true} />
    </div>
  );
};

export default Detail;
