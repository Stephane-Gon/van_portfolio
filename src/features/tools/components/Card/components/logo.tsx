'use client';
import Image from 'next/image';
import { Gradient } from '@/design-system/atoms';
import type { ToolT } from '@/features/tools/types';
import { useToolsStore } from '@/features/tools/store/useTools';

interface ToolLogoProps {
  tool: ToolT;
}

const ToolLogo = ({ tool }: ToolLogoProps) => {
  const setSelectedTool = useToolsStore(state => state.setSelectedTool);
  const setTab = useToolsStore(state => state.setTab);

  const handleClick = () => {
    localStorage.setItem('selectedTool', JSON.stringify(tool.id));
    setSelectedTool(tool);
    setTab('detail');
  };

  // TODO - Tentar reduzir o LCP em mobile gerado destes icons
  return (
    <div onClick={handleClick}>
      <Gradient extraClasses='group rounded-full p-[2px] cursor-pointer hover:p-[4px]'>
        <div className='flex size-[90px] items-center justify-center rounded-full bg-tertiary p-2 shadow-strongInner group-hover:size-[86px] group-hover:shadow-strongerInner'>
          <Image src={tool.icon_url} alt={tool.name} width={55} height={55} priority />
        </div>
      </Gradient>
    </div>
  );
};

export default ToolLogo;
