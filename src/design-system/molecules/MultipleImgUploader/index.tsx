'use client';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/image';
import { Add, Upload, Close, ChevronLeft, ChevronRight } from '@/design-system/icons';
import { Button, Gradient } from '@/design-system/atoms';
import useMultipleImgUploader from './useMultipleImgUploader';

interface MultipleImgUploaderProps {
  label: string;
  valid?: boolean;
  helpText?: string | null;
  id: string;
  required?: boolean;
  fileSizeLimit?: number; // Bytes
  onChange: (e: File | string) => void;
  buttonLabel?: string | null;
  images: Array<string | File>;
  name: string;
}

const MultipleImgUploader = ({
  label = '',
  valid = true,
  required = true,
  helpText = '',
  buttonLabel = 'Upload',
  fileSizeLimit = 10000000,
  images,
  id,
  name,
  onChange,
}: MultipleImgUploaderProps) => {
  const { userHasPhoto, allImages, uploader, errorText, handleButtonClick, handleChange, handleRemove } =
    useMultipleImgUploader({ images, onChange, fileSizeLimit });

  const _renderUserPhoto = () => {
    return userHasPhoto && allImages.length ? (
      <Gradient extraClasses='rounded-md p-[4px] cursor-pointer relative'>
        <div className='relative flex aspect-video w-full items-center justify-center bg-tertiary p-2 shadow-strongInner'>
          <Image
            className='rounded-md'
            src={typeof allImages[0] === 'string' ? allImages[0] : URL.createObjectURL(allImages[0])}
            alt='Preview of the current image'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        </div>
        <Close
          onClick={() => handleRemove()}
          className='absolute right-3 top-3 z-10 transform rounded-full bg-accent p-1 shadow-md hover:scale-105'
          cursor='pointer'
          fill='#a3e7fc'
        />
      </Gradient>
    ) : null;
  };

  const _renderDefaultAvatar = () => {
    return (
      !userHasPhoto && (
        <Gradient extraClasses='rounded-md p-[4px] cursor-pointer'>
          <div
            onClick={() => handleButtonClick()}
            className='relative flex aspect-video w-full items-center justify-center bg-tertiary p-2 shadow-strongInner'>
            <Image
              className='rounded-md'
              src='/placeholder_img.webp'
              alt='Preview of the current image'
              layout='fill'
              objectFit='cover'
              objectPosition='center'
            />
            <Add width={60} height={60} className='z-10' />
          </div>
        </Gradient>
      )
    );
  };

  const _renderSlider = () => {
    const sliderImgs = allImages.slice(1);
    return (
      <Slide
        slidesToScroll={1}
        slidesToShow={sliderImgs.length > 2 ? 3 : 1}
        infinite={false}
        transitionDuration={300}
        prevArrow={
          <div className='rounded-full'>
            <ChevronLeft width={40} height={40} className='fill-primary hover:fill-secondary' />
          </div>
        }
        nextArrow={
          <div className='rounded-full'>
            <ChevronRight width={40} height={40} className='fill-primary hover:fill-secondary' />
          </div>
        }>
        {sliderImgs.map((slideImage, index) => (
          <div key={`project-${slideImage}-${index}`} className='relative cursor-pointer p-[4px]'>
            <div className='relative flex aspect-video w-full items-center justify-center bg-tertiary p-2 shadow-strongInner'>
              <Image
                src={typeof slideImage === 'string' ? slideImage : URL.createObjectURL(slideImage)}
                alt='Preview of the current image'
                layout='fill'
                objectFit='cover'
                objectPosition='center'
              />
            </div>
            <Close
              onClick={() => handleRemove()}
              className='absolute right-3 top-3 z-10 transform rounded-full bg-accent p-1 shadow-md hover:scale-105'
              cursor='pointer'
              fill='#a3e7fc'
            />
          </div>
        ))}
      </Slide>
    );
  };

  const _renderErrorText = () => {
    let text: string = '';
    if (errorText) {
      text = errorText;
    } else {
      text = !valid && helpText ? helpText : '';
    }

    return (errorText || helpText) && <p className='text-sm text-dangerRed'>{text}</p>;
  };

  return (
    <div className='flex w-full flex-col justify-center gap-4 md:justify-start'>
      {_renderDefaultAvatar()}
      {_renderUserPhoto()}
      {_renderSlider()}
      <div className='flex grow flex-col items-start justify-center gap-3 pl-0'>
        <div className='flex w-full flex-wrap items-center justify-between '>
          <h3 className='text-lg text-tertiary'>
            {label} {required && '*'}
          </h3>
          <input
            id={id}
            name={name}
            className='border-transparent hidden'
            type='file'
            onChange={e => handleChange(e)}
            ref={uploader}
          />
          <div className='w-full sm:w-1/4'>
            <Button label={buttonLabel} onClick={() => handleButtonClick()} iconLeft={true} icon={<Upload />} />
          </div>
        </div>
        {_renderErrorText()}
      </div>
    </div>
  );
};

export default MultipleImgUploader;
