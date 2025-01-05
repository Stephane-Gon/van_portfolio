'use client';

import Image from 'next/image';
import { SupabaseProject } from '../../types';
import { SERVICES } from '@/constants';

type Props = {
  project: SupabaseProject | null;
};

const MainDetail = ({ project }: Props) => {
  const _renderText = (title: string, text?: string | null) => {
    return text ? (
      <div className='flex gap-6'>
        <h4 className='text-md font-bold text-text opacity-50'>{title}</h4>
        <p className='text-text'>{text}</p>
      </div>
    ) : null;
  };

  const _renderSideLink = (title: string, link?: string | null) => {
    return link ? (
      <div className='flex flex-col gap-1'>
        <p className='text-md text-text opacity-50'>{title}</p>
        <a className='text-text' href={link} target='_blank' rel='noreferrer'>
          {link}
        </a>
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

  const _renderServicesUsed = () => {
    return project?.skills ? (
      <div className='flex flex-col gap-1'>
        <p className='text-md text-text opacity-50'>SERVICES DONE</p>
        <div className='flex flex-col'>
          {project?.skills.map(skill => (
            <p className='text-text' key={`project-skill-${skill}`}>
              {SERVICES[skill] || skill}
            </p>
          ))}
        </div>
      </div>
    ) : null;
  };

  const _renderToolsUsed = () => {
    return project?.tools ? (
      <div className='flex flex-col gap-1'>
        <p className='text-md text-text opacity-50'>TOOLS USED</p>
        <div className='flex flex-wrap items-center gap-2'>
          {project?.tools.map(tool => (
            <span
              key={`project-skill-${tool.id}`}
              className={`rounded-md border border-l-[5px] border-primary bg-accent/90 p-2 text-sm font-semibold text-text shadow-md`}>
              {tool.tools.name}
            </span>
          ))}
        </div>
      </div>
    ) : null;
  };

  const _renderImages = (images: string[]) => {
    return images.length > 0
      ? images.map(img => (
          <div key={`project-image-${img}`} className='relative h-[400px] w-full'>
            <Image
              src={img || '/placeholder_img.webp'}
              alt={`Project - ${project?.title} - image ${img}`}
              fill
              objectFit='cover'
            />
          </div>
        ))
      : null;
  };

  const _renderMainImage = () => {
    return project?.main_image ? (
      <div className='relative h-[700px] w-full flex-shrink-0'>
        <Image src={project.main_image} alt={`Project - ${project?.title} - main image`} fill objectFit='cover' />
      </div>
    ) : null;
  };

  const chunkSize = project?.images ? Math.ceil(project.images.length / 3) : 0;
  const images1 = project?.images ? project.images.slice(0, chunkSize) : [];
  const images2 = project?.images ? project.images.slice(chunkSize, 2 * chunkSize) : [];
  const images3 = project?.images ? project.images.slice(2 * chunkSize) : [];

  return (
    <div className='no-scrollbar mb-5 flex h-full w-full flex-col overflow-y-auto p-2 lg:p-5'>
      {_renderMainImage()}
      <div className='relative flex w-full flex-col items-start gap-5 pt-6 lg:flex-row'>
        <div className='no-scrollbar flex w-full flex-col gap-8 overflow-y-auto lg:w-2/3'>
          {_renderText('DESCRIPTION', project?.description)}
          {_renderImages(images1)}
          {_renderText('CHALLENGES', project?.challenges)}
          {_renderImages(images2)}
          {_renderText('LEARNED', project?.learned)}
          {_renderImages(images3)}
        </div>
        <div className='sticky top-6 flex w-full flex-col gap-6 lg:w-1/3'>
          {_renderSideLink('URL', project?.live_link)}
          {_renderSideLink('REPOSITORY', project?.repository)}
          {_renderSideDetail('FINISHED DATE', project?.finished_at)}
          {_renderSideDetail('PERSONAL PROJECT', project?.is_personal ? 'Yes' : 'No')}
          {_renderServicesUsed()}
          {_renderToolsUsed()}
        </div>
      </div>
    </div>
  );
};

export default MainDetail;
