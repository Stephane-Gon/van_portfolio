import { useEffect, useRef, useState } from 'react';
import { fileHasValidExtension, isBelowFileSizeLimit } from './utils';

interface UseMultipleImgUploaderProps {
  images: Array<string | File>;
  onChange: (e: File | string) => void;
  fileSizeLimit: number; // Bytes
}

const useMultipleImgUploader = ({ images, onChange, fileSizeLimit }: UseMultipleImgUploaderProps) => {
  const [allImages, setAllImages] = useState<Array<string | File>>(images ?? []);
  const [errorText, setErrorText] = useState<string>('');

  const uploader = useRef<HTMLInputElement>(null);
  const userHasPhoto = Boolean(images);

  useEffect(() => {
    if (images.length) {
      setAllImages(images);
    }
  }, [images]);

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
    setAllImages(prevState => [...prevState, e.target.files[0]]);
    setErrorText('');
  };

  const handleRemove = () => {
    onChange('');
    setAllImages([]);
    setErrorText('');
  };

  return {
    handleChange,
    handleButtonClick,
    handleRemove,
    userHasPhoto,
    uploader,
    errorText,
    allImages,
  };
};

export default useMultipleImgUploader;
