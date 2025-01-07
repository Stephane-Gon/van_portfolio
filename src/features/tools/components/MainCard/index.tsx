'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ToolT } from '../../types';
import { useAppStore } from '@/features/app/store';

type Props = {
  tool: ToolT;
  color: string;
};

const MainCard = ({ tool, color }: Props) => {
  const cirleRef = useRef<HTMLDivElement>(null);
  const theme = useAppStore(state => state.theme);

  useEffect(() => {
    const animateLevel = () => {
      if (cirleRef.current) {
        let degree = 0;
        const targetDegree = Number(tool.level) * 10;

        const interval = setInterval(() => {
          degree += 1;
          if (degree > targetDegree) {
            clearInterval(interval);
            return;
          }

          if (cirleRef.current) {
            let rgbColor;
            if (color === 'blue') {
              rgbColor = 'rgb(163, 231, 252)';
            } else if (color === 'green') {
              rgbColor = 'rgb(138, 234, 146)';
            } else {
              rgbColor = 'rgb(234, 158, 141)';
            }

            cirleRef.current.style.background = `conic-gradient(${rgbColor} ${targetDegree}%, #222 0%)`;
          }
        }, 50);
      }
    };

    animateLevel();
  }, [tool, color]);

  const _renderUseText = () => {
    const personalUse = tool.personal_use || null;
    const workUse = tool.work_use || null;
    const useText = personalUse && workUse ? 'Personal and Work' : personalUse ? 'Personal' : workUse ? 'Work' : null;

    return (
      <div className='flex flex-col'>
        <h4 className='w-full text-sm font-bold text-text opacity-50'>USE</h4>
        <p className='w-full text-sm text-text'>{useText}</p>
      </div>
    );
  };

  return (
    <div
      className={`tool_card flex h-[300px] w-full flex-col items-center gap-4 rounded-md p-4 ${color} ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div
        ref={cirleRef}
        className={`tool_circle relative flex h-[150px] w-[150px] items-center justify-center rounded-full ${theme === 'dark' ? 'dark' : 'light'}`}>
        <Image
          src={tool.icon_url || '/placeholder_img.webp'}
          alt={`Tool - ${tool.name} - main image`}
          width={70}
          height={70}
          className='z-10 rounded-md'
        />
      </div>
      <h3 className='text-md text-text'>{tool.name}</h3>
      <div className='flex w-full flex-col'>{_renderUseText()}</div>
    </div>
  );
};

export default MainCard;
