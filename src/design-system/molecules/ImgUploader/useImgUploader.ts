import { useEffect, useRef, useState } from 'react';
import { fileHasValidExtension, isBelowFileSizeLimit } from './utils';

interface UseImgUploaderProps {
  image?: string | File;
  onChange: (e: File | string) => void;
  fileSizeLimit: number; // Bytes
}

const useImgUploader = ({ image, onChange, fileSizeLimit }: UseImgUploaderProps) => {
  const [filePath, setFilePath] = useState<string | File | undefined>(image ?? undefined);
  const [errorText, setErrorText] = useState<string>('');
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | undefined>(undefined);

  const uploader = useRef<HTMLInputElement>(null);
  const userHasPhoto = Boolean(image);

  useEffect(() => {
    if (typeof image !== 'object') setFilePath(image);
  }, [image]);

  const handleButtonClick = () => {
    if (uploader.current !== null) {
      uploader.current.click();
    }
  };

  const handleChange = (e: any) => {
    const notHasValidExtension = !fileHasValidExtension(e.target.value);
    const notHasValidSize = !isBelowFileSizeLimit(e.target.files[0]?.size, fileSizeLimit);

    if (notHasValidExtension) {
      setErrorText('This is an invalid file type.');
      return;
    }

    if (notHasValidSize) {
      setErrorText('This file is too large.');
      return;
    }

    onChange(e.target.files[0]);
    setFilePreviewUrl(URL.createObjectURL(e.target.files[0]));
    setFilePath(e.target.value.split('\\').pop());
    setErrorText('');
  };

  const handleRemove = () => {
    onChange('');
    setFilePath(undefined);
    setFilePreviewUrl(undefined);
    setErrorText('');
  };

  return {
    handleChange,
    handleButtonClick,
    handleRemove,
    filePath,
    filePreviewUrl,
    userHasPhoto,
    uploader,
    errorText,
  };
};

export default useImgUploader;
