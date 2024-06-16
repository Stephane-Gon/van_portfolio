'use client';

import { Slide } from 'react-slideshow-image';
import { useMemo } from 'react';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/image';
import { Add, Upload, Close, ChevronLeft, ChevronRight } from '@/design-system/icons';
import { Button, Gradient } from '@/design-system/atoms';
import useMultipleImgUploader from './useMultipleImgUploader';

interface MultipleImgUploaderProps {
  label: string;
  valid?: boolean;
  helpTexts?: { message: string }[] | null;
  id: string;
  required?: boolean;
  fileSizeLimit?: number; // Bytes
  onChange: (e: Array<File | string>) => void;
  buttonLabel?: string | null;
  images: Array<string | File>;
  name: string;
}

const MultipleImgUploader = ({
  label = '',
  valid = true,
  required = true,
  helpTexts = [],
  buttonLabel = 'Upload',
  fileSizeLimit = 1000000,
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
            fill
            sizes='100vw'
          />
        </div>
        <Close
          onClick={() => handleRemove(0)}
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
              fill
              sizes='100vw'
            />
            <Add width={60} height={60} className='z-10' />
          </div>
        </Gradient>
      )
    );
  };

  const sliderImgs = useMemo(() => {
    return allImages.slice(1);
  }, [allImages]);

  const _renderSlider = () => {
    return (
      sliderImgs.length > 0 && (
        <Slide
          slidesToScroll={1}
          slidesToShow={sliderImgs.length > 2 ? 3 : 1}
          infinite={false}
          autoplay={false}
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
          {sliderImgs.map((slideImage, index) => {
            return (
              <div key={`project-${slideImage}-${index}`} className='relative cursor-pointer p-[4px]'>
                <div className='relative flex aspect-video w-full items-center justify-center bg-tertiary p-2 shadow-strongInner'>
                  <Image
                    src={typeof slideImage === 'string' ? slideImage : URL.createObjectURL(slideImage)}
                    alt='Preview of the current image'
                    fill
                    sizes='100vw'
                  />
                </div>
                <Close
                  onClick={() => handleRemove(index + 1)}
                  className='absolute right-3 top-3 z-10 transform rounded-full bg-accent p-1 shadow-md hover:scale-105'
                  cursor='pointer'
                  fill='#a3e7fc'
                />
              </div>
            );
          })}
        </Slide>
      )
    );
  };

  const _renderErrorText = () => {
    let text: string = '';

    if (errorText) {
      text = errorText;
    } else if (helpTexts && helpTexts.length > 0) {
      const filteredErrors = helpTexts.filter(Boolean);
      text = !valid && filteredErrors && filteredErrors.length > 0 ? filteredErrors[0].message : '';
    }

    return (errorText || (helpTexts && helpTexts.length > 0)) && <p className='text-sm text-dangerRed'>{text}</p>;
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
