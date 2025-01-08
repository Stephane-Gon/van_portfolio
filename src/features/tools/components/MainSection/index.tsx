'use client';

import { useState, useEffect } from 'react';
import Drawer from '@/design-system/organism/Drawer';
import MainHeader from '@/design-system/organism/MainHeader';
import { ListError } from '@/design-system/atoms';
import { useThreeStore } from '@/features/three/store/useThree';
import { getToolsList } from '@/features/tools/actions/getToolsList';
import { ToolT } from '../../types';
import MainTitle from '@/design-system/molecules/MainTitle';
import ToolCard from '../MainCard';
import { useAppStore } from '@/features/app/store';

export const revalidate = 0;

const MainSection = () => {
  const [tools, setTools] = useState<ToolT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const theme = useAppStore(state => state.theme);

  useEffect(() => {
    const FetchTools = async () => {
      const result = await getToolsList();
      if (result.error) {
        setError(result.error.message);
      } else {
        const filteredTools = result.data?.filter(tool => tool.is_active === true);
        const sortedTools = filteredTools?.sort((a, b) => (a.level < b.level ? 1 : -1));
        setTools(sortedTools || []);
      }
    };

    if (zoomedFeature === 'tools') {
      FetchTools();
    }
  }, [zoomedFeature]);

  if (error) {
    return (
      <Drawer isOpen={zoomedFeature === 'tools'}>
        <div className='flex h-full w-full flex-col rounded-md bg-threeBg'>
          <ListError title='Error while fetching the tools!' text={error} />
        </div>
      </Drawer>
    );
  }

  if (tools.length === 0) {
    return (
      <Drawer isOpen={zoomedFeature === 'tools'}>
        <div className='flex h-full w-full flex-col rounded-md bg-threeBg'>
          <ListError title='No tools available!' text='Add a new tool by pressing the button.' />
        </div>
      </Drawer>
    );
  }

  const _renderTools = () => {
    const colorsDark = ['blue', 'pink', 'green'];
    const colorsLight = ['pink', 'blue', 'green'];
    const colors = theme === 'dark' ? colorsDark : colorsLight;

    return tools.map((tool: ToolT, index) => {
      const colorIndex = index % 3;
      const color = colors[colorIndex];

      return <ToolCard key={`tool-card-id-${tool.id}`} tool={tool} color={color} />;
    });
  };

  return (
    <Drawer isOpen={zoomedFeature === 'tools'}>
      <div className='flex h-full w-full flex-col rounded-md bg-threeBgGradient'>
        <MainHeader />
        <MainTitle<ToolT> defaultTile='TOOLS:' setSelectedItem={() => {}} />
        <div className='no-scrollbar grid h-full w-full grid-cols-1 items-center gap-4 overflow-auto p-5 1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {_renderTools()}
        </div>
      </div>
    </Drawer>
  );
};

export default MainSection;
