'use client';
import Image from 'next/image';
import { Add, Upload, Close } from '@/design-system/icons';
import { Button, Gradient } from '@/design-system/atoms';
import useImgUploader from './useImgUploader';
import { FILE_DISPLAY_NAME_MAX_LENGTH } from '@/constants';

interface ImgUploaderProps {
  label: string;
  valid?: boolean;
  helpText?: string | null;
  id: string;
  required?: boolean;
  fileSizeLimit?: number; // Bytes
  onChange: (e: File | string) => void;
  buttonLabel?: string | null;
  image?: string | File;
  name: string;
}

const ImgUploader = ({
  label = '',
  valid = true,
  required = true,
  helpText = '',
  buttonLabel = 'Upload',
  fileSizeLimit = 10000000,
  image,
  id,
  name,
  onChange,
}: ImgUploaderProps) => {
  const { userHasPhoto, filePath, filePreviewUrl, uploader, errorText, handleButtonClick, handleChange, handleRemove } =
    useImgUploader({ image, onChange, fileSizeLimit });

  const _renderPreview = () => {
    return (
      userHasPhoto &&
      filePreviewUrl && (
        <Gradient extraClasses='rounded-full p-[2px] cursor-pointer'>
          <div className='flex size-[120px] items-center justify-center rounded-full bg-tertiary p-2 shadow-strongInner'>
            <Image src={filePreviewUrl} alt='Preview of the uploaded image' width={80} height={80} />
          </div>
        </Gradient>
      )
    );
  };

  const _renderUserPhoto = () => {
    return (
      userHasPhoto &&
      !filePreviewUrl &&
      typeof image === 'string' && (
        <Gradient extraClasses='rounded-full p-[2px] cursor-pointer'>
          <div className='flex size-[120px] items-center justify-center rounded-full bg-tertiary p-2 shadow-strongInner'>
            <Image src={image} alt='Preview of the current image' width={80} height={80} />
          </div>
        </Gradient>
      )
    );
  };

  const _renderDefaultAvatar = () => {
    return (
      !userHasPhoto && (
        <Gradient extraClasses='rounded-full p-[2px] cursor-pointer'>
          <div className='flex size-[120px] items-center justify-center rounded-full bg-tertiary p-2 shadow-strongInner'>
            <Add width={60} height={60} />
          </div>
        </Gradient>
      )
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
    <div className='flex w-full flex-wrap justify-center gap-4 md:justify-start'>
      {_renderDefaultAvatar()}
      {_renderUserPhoto()}
      {_renderPreview()}
      <div className='flex grow flex-col items-start justify-center gap-3 pl-0'>
        <h3 className='text-lg text-tertiary'>
          {label} {required && '*'}
        </h3>
        <div className='flex w-full flex-wrap items-center gap-x-4'>
          <input
            id={id}
            name={name}
            className='border-transparent hidden'
            type='file'
            onChange={e => handleChange(e)}
            ref={uploader}
          />
          <div className='flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center '>
            {filePath && (
              <span className='flex items-start justify-start gap-2'>
                <p className='truncate text-text'>
                  {typeof filePath === 'string' && filePath.length > FILE_DISPLAY_NAME_MAX_LENGTH
                    ? `${filePath.slice(0, FILE_DISPLAY_NAME_MAX_LENGTH)}...${filePath.slice(-4)}   `
                    : `${filePath}   `}
                </p>
                <button
                  onClick={() => handleRemove()}
                  className='text-inherit font-ine outline-inherit cursor-pointer border-none bg-none p-0'>
                  {' '}
                  <Close cursor='pointer' fill='#a3e7fc' />{' '}
                </button>
              </span>
            )}
            <Button label={buttonLabel} onClick={() => handleButtonClick()} iconLeft={true} icon={<Upload />} />
          </div>
        </div>
        {_renderErrorText()}
      </div>
    </div>
  );
};

export default ImgUploader;
