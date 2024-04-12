import Image from 'next/image';
import type { ToolT } from '../../types';
import { Gradient } from '@/design-system/atoms';
import { LevelBar } from '@/design-system/molecules';

interface ToolCardProps {
  tool: ToolT;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <article className='rounded-sm bg-cardsBg/80 p-2 shadow-glass backdrop-blur-sm'>
      <div className='flex items-center justify-start gap-2'>
        <Gradient extraClasses='group rounded-full p-[2px] cursor-pointer hover:p-[4px]'>
          <div className='flex size-[90px] items-center justify-center rounded-full bg-tertiary p-2 shadow-strongInner group-hover:size-[86px] group-hover:shadow-strongerInner'>
            <Image src={tool.icon_url} alt={tool.name} width={55} height={55} />
          </div>
        </Gradient>
        <h3 className='text-[1.35rem] font-semibold text-accent'>{tool.name}</h3>
      </div>
      <div className='mt-3 px-4'>
        <h3 className='text-accent'>Tool Level:</h3>
        <LevelBar level={tool.level} />
      </div>
    </article>
  );
};

export default ToolCard;
