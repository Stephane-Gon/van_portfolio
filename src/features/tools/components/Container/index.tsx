import ToolTabs from '@/features/tools/components/ToolTabs';
import List from '@/features/tools/components/List';
import { ActionsBar } from '@/design-system/organism';

const ToolsContainer = () => {
  // TODO - Quando o fluxo de apagar e editar estiver pronto, apagar a coluna de icon_path da tabela se não a usar
  return (
    <div className={`container flex flex-col items-center gap-10`}>
      <ToolTabs />
      <div className={`w-full rounded-md bg-neumorph p-4 shadow-neumorph`}>
        <ActionsBar btnLabel='Add Tool' btnPath='tools/add' />
        <div className='py-4'>
          <List />
        </div>
      </div>
    </div>
  );
};

export default ToolsContainer;
