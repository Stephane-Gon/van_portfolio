'use client';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';
import { Add, Upload, Close } from '@/design-system/icons';
import { Button } from '@/design-system/atoms';
import useImgUploader from './useImgUploader';
import { FILE_DISPLAY_NAME_MAX_LENGTH } from '@/constants';

interface ImgUploaderProps {
  label: string;
  valid?: boolean;
  helpText?: string | null;
  id: string;
  required?: boolean;
  fileSizeLimit?: number; // Bytes
  register: UseFormRegisterReturn<string>;
  onChange: (e: File | string) => void;
  buttonLabel?: string | null;
  image?: string | File;
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
  register,
  onChange,
}: ImgUploaderProps) => {
  const { userHasPhoto, filePath, filePreviewUrl, uploader, errorText, handleButtonClick, handleChange, handleRemove } =
    useImgUploader({ image, onChange, fileSizeLimit });

  const _renderPreview = () => {
    return (
      userHasPhoto &&
      filePreviewUrl && <Image src={filePreviewUrl} alt='Preview of the uploaded image' width={100} height={100} />
    );
  };

  const _renderUserPhoto = () => {
    return (
      userHasPhoto &&
      !filePreviewUrl &&
      typeof image === 'string' && <Image src={image} alt='Preview of the current image' width={100} height={100} />
    );
  };

  const _renderDefaultAvatar = () => {
    return (
      !userHasPhoto && (
        <div className='flex size-28 flex-col items-center justify-center gap-2 rounded-full bg-primary shadow-md'>
          <Add />
        </div>
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
    <div className='flex w-full flex-wrap gap-x-4'>
      {_renderDefaultAvatar()}
      {_renderUserPhoto()}
      {_renderPreview()}
      <div className='flex flex-[1_0_1] flex-col items-start justify-center gap-3 pl-0'>
        <h3 className='text-lg text-text'>
          {label} {required && '*'}
        </h3>
        <div className='flex flex-wrap items-center gap-x-3'>
          <input
            id={id}
            className='border-transparent hidden'
            {...register}
            type='file'
            onChange={e => handleChange(e)}
            ref={uploader}
          />
          <Button label={buttonLabel} onClick={() => handleButtonClick()} iconLeft={true} icon={<Upload />} />
          {filePath && (
            <p className='flex-[3] text-text'>
              {typeof filePath === 'string' && filePath.length > FILE_DISPLAY_NAME_MAX_LENGTH
                ? `${filePath.slice(0, FILE_DISPLAY_NAME_MAX_LENGTH)}...${filePath.slice(-4)}   `
                : `${filePath}   `}
              <button
                onClick={() => handleRemove()}
                className='text-inherit font-ine outline-inherit cursor-pointer border-none bg-none p-0'>
                {' '}
                <Close cursor='pointer' />{' '}
              </button>
            </p>
          )}
        </div>
        {_renderErrorText()}
      </div>
    </div>
  );
};

export default ImgUploader;
