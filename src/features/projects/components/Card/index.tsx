'use client';
import Image from 'next/image';
import { Button } from '@/design-system/atoms';
import { useProjectsStore } from '../../store/useProjects';
import type { ProjectT } from '../../types';

interface ProjectCardProps {
  project: ProjectT;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const setSelectedProject = useProjectsStore(state => state.setSelectedProject);
  const setTab = useProjectsStore(state => state.setTab);

  const _renderSlogan = () => {
    return project.slogan && <p className='text-md text-text'>{project.slogan}</p>;
  };

  return (
    <article className='group relative min-h-60 cursor-pointer rounded-sm p-2'>
      <div className='absolute inset-0 transition-opacity duration-100 group-hover:opacity-40'>
        <Image
          src={project.main_image}
          alt={`${project.title} project main image`}
          fill
          sizes='100vw'
          className='rounded-md'
        />
      </div>
      <div className='relative flex h-full flex-col justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        <h4 className='ml-4 text-lg text-text'>{project.title}</h4>
        <div className='mx-auto flex h-[70%] w-2/3 flex-col justify-between border-t-2 border-tertiary px-8 py-2 text-center'>
          {_renderSlogan()}
          <Button
            label='Editar'
            onClick={() => {
              localStorage.setItem('selectedProject', JSON.stringify(project.id));
              setSelectedProject(project);
              setTab('detail');
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
