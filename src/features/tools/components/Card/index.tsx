import type { ToolT } from '../../types';
import { LevelBar } from '@/design-system/molecules';
import ToolLogo from './components/logo';

interface ToolCardProps {
  tool: ToolT;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <article className='rounded-sm bg-cardsBg/80 p-2 shadow-glass backdrop-blur-sm'>
      <div className='flex items-center justify-start gap-2'>
        <ToolLogo tool={tool} />
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
