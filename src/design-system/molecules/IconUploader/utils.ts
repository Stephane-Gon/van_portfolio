import { AVAIALABLE_ENTENSIONS } from '@/constants';

const fileHasValidExtension = (file: string) => {
  const hasExtension = AVAIALABLE_ENTENSIONS.find(ext => file.toLowerCase().includes(ext));

  if (hasExtension) return true;
  return false;
};

const isBelowFileSizeLimit = (fileSize: number, fileSizeLimit: number) => {
  if (fileSizeLimit && fileSize <= fileSizeLimit) return true;
  return false;
};

export { fileHasValidExtension, isBelowFileSizeLimit };
