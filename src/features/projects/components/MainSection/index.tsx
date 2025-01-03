'use client';

import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import Drawer from '@/design-system/organism/Drawer';
import MainHeader from '@/design-system/organism/MainHeader';
import MainDetail from '../MainDetail';
import MainList from '../MainList';
import MainTitle from '../MainTitle';
import { ListError } from '@/design-system/atoms';
import { useThreeStore } from '@/features/three/store/useThree';
import { getProjectsList } from '@/features/projects/actions/getProjectsList';
import { SupabaseProject } from '../../types';

export const revalidate = 0;

const MainSection = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<SupabaseProject | null>(null);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjectsList();
      if (result.error) {
        setError(result.error.message);
      } else {
        const filteredProjects = result.data?.filter(project => project.is_active === true);
        setProjects(filteredProjects || []);
      }
    };

    if (zoomedFeature === 'projects') {
      fetchProjects();
    }
  }, [zoomedFeature]);

  if (error) {
    return (
      <div className='flex h-full w-full flex-col rounded-md bg-threeBg'>
        <ListError title='Error while fetching the projects!' text={error} />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className='flex h-full w-full flex-col rounded-md bg-threeBg'>
        <ListError title='No projects available!' text='Add a new project by pressing the button.' />
      </div>
    );
  }

  const animateProjectChange = (project: SupabaseProject | null) => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (!project) setSelectedProject(project);
      },
      onStart: () => {
        if (project) setSelectedProject(project);
      },
    });

    tl.to(listRef.current, {
      x: project ? '-100%' : '0%',
      duration: 0.5,
      ease: 'power2.inOut',
    }).to(
      detailRef.current,
      {
        left: project ? '0%' : '100%',
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '-=0.5',
    );
  };

  return (
    <Drawer isOpen={zoomedFeature === 'projects'}>
      <div className='flex h-full w-full flex-col rounded-md bg-threeBgGradient'>
        <MainHeader />
        <MainTitle title={selectedProject?.title} setSelectedProject={animateProjectChange} />
        <div className='no-scrollbar relative mb-5 h-full w-full overflow-auto'>
          <div ref={listRef} className='h-full w-full'>
            <MainList items={projects} setSelectedProject={animateProjectChange} />
          </div>
          <div ref={detailRef} className='absolute left-full top-0 h-full w-full'>
            <MainDetail project={selectedProject} />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MainSection;
