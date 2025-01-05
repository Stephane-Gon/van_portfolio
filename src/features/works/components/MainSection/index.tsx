'use client';

import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import Drawer from '@/design-system/organism/Drawer';
import MainHeader from '@/design-system/organism/MainHeader';
import { ListError } from '@/design-system/atoms';
import { useThreeStore } from '@/features/three/store/useThree';
import { getWorksList } from '@/features/works/actions/getWorksList';
import { SupabaseWork } from '../../types';
import WorkCard from '../MainCard';
import MainTitle from '@/design-system/molecules/MainTitle';
import MainDetail from '../MainDetail';

export const revalidate = 0;

const MainSection = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const [works, setWorks] = useState<SupabaseWork[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<SupabaseWork | null>(null);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);

  console.log('🚀 ~ MainSection ~ works:', works);

  useEffect(() => {
    const fetchWorks = async () => {
      const result = await getWorksList();
      if (result.error) {
        setError(result.error.message);
      } else {
        setWorks(result.data || []);
      }
    };

    if (zoomedFeature === 'works') {
      fetchWorks();
    }
  }, [zoomedFeature]);

  if (error) {
    return (
      <Drawer isOpen={zoomedFeature === 'works'}>
        <div className='flex h-full w-full flex-col rounded-md bg-threeBg'>
          <ListError title='Error while fetching the works!' text={error} />
        </div>
      </Drawer>
    );
  }

  if (works.length === 0) {
    return (
      <Drawer isOpen={zoomedFeature === 'works'}>
        <div className='flex h-full w-full flex-col rounded-md bg-threeBg'>
          <ListError title='No works available!' text='Add a new work by pressing the button.' />
        </div>
      </Drawer>
    );
  }

  const animateWorkChange = (work: SupabaseWork | null) => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (!work) setSelectedWork(work);
      },
      onStart: () => {
        if (work) setSelectedWork(work);
      },
    });

    tl.to(listRef.current, {
      x: work ? '-100%' : '0%',
      duration: 0.5,
      ease: 'power2.inOut',
    }).to(
      detailRef.current,
      {
        left: work ? '0%' : '100%',
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '-=0.5',
    );
  };

  const _renderWorks = () => {
    return works.map((work: SupabaseWork) => {
      return <WorkCard key={`work-card-id-${work.id}`} work={work} setSelectedWork={animateWorkChange} />;
    });
  };

  return (
    <Drawer isOpen={zoomedFeature === 'works'}>
      <div className='flex h-full w-full flex-col gap-4 rounded-md bg-threeBgGradient'>
        <MainHeader />
        <MainTitle<SupabaseWork>
          title={selectedWork?.company}
          defaultTile='WORKS:'
          setSelectedItem={animateWorkChange}
        />
        <div className='no-scrollbar relative mb-5 h-full w-full overflow-auto'>
          <div ref={listRef} className='flex h-full w-full flex-col gap-16'>
            {_renderWorks()}
          </div>
          <div ref={detailRef} className='absolute left-full top-0 h-full w-full'>
            <MainDetail work={selectedWork} />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MainSection;
