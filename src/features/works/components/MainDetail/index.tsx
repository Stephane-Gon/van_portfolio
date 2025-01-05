'use client';

import { SupabaseWork } from '../../types';
import { SERVICES } from '@/constants';

type Props = {
  work: SupabaseWork | null;
};

const MainDetail = ({ work }: Props) => {
  const _renderText = (title: string, text?: string | null) => {
    return text ? (
      <div className='flex flex-col gap-6 lg:flex-row'>
        <h4 className='w-full text-md font-bold text-text opacity-50 lg:w-1/5'>{title}</h4>
        <p className='w-full text-text lg:w-4/5'>{text}</p>
      </div>
    ) : null;
  };

  const _renderServicesUsed = () => {
    return work?.skills ? (
      <div className='flex flex-col gap-1'>
        <p className='text-md text-text opacity-50'>SERVICES DONE</p>
        <div className='flex items-center gap-2'>
          {work?.skills.map(skill => (
            <span
              key={`work-skill-${skill}`}
              className={`rounded-md border border-l-[5px] border-tertiary bg-accent/90 p-2 text-sm font-semibold text-text shadow-md`}>
              {SERVICES[skill]}
            </span>
          ))}
        </div>
      </div>
    ) : null;
  };

  const _renderToolsUsed = () => {
    return work?.tools ? (
      <div className='flex flex-col gap-1'>
        <p className='text-md text-text opacity-50'>TOOLS USED</p>
        <div className='flex flex-wrap gap-2'>
          {work?.tools.map(tool => (
            <span
              key={`work-skill-${tool.id}`}
              className={`rounded-md border border-l-[5px] border-primary bg-accent/90 p-2 text-sm font-semibold text-text shadow-md`}>
              {tool.tools.name}
            </span>
          ))}
        </div>
      </div>
    ) : null;
  };

  const _renderSideDetail = (title: string, detail?: string | null) => {
    return detail ? (
      <div className='flex flex-col gap-1'>
        <p className='text-md text-text opacity-50'>{title}</p>
        <p className='text-text'>{detail}</p>
      </div>
    ) : null;
  };

  return (
    <div className='no-scrollbar mb-5 flex h-full w-full flex-col overflow-y-auto p-2 lg:p-5'>
      <div className='relative flex w-full flex-col items-start gap-12 pt-6 lg:flex-row lg:gap-5'>
        <div className='no-scrollbar flex w-full flex-col gap-8 overflow-y-auto lg:w-2/3 '>
          {_renderText('ROLE', work?.role)}
          {_renderText('DESCRIPTION', work?.description)}
          {_renderText('ACHIEVEMENTS', work?.achievements)}
        </div>
        <div className='sticky top-6 flex w-full flex-col gap-6 lg:w-1/3'>
          {_renderServicesUsed()}
          {_renderToolsUsed()}
          {_renderSideDetail('START DATE', work?.started_at)}
          {_renderSideDetail('END DATE', work?.ended_at)}
        </div>
      </div>
    </div>
  );
};

export default MainDetail;
