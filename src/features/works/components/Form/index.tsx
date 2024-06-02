'use client';

// Components
import { Gradient } from '@/design-system/atoms';

interface WorkFormProps {
  isEdit: boolean;
}

const WorkForm = ({ isEdit }: WorkFormProps) => {
  console.log(isEdit);

  return (
    <Gradient extraClasses='p-1 rounded-sm'>
      <div className='flex flex-col bg-accent px-2 py-4 lg:px-8'></div>
    </Gradient>
  );
};

export default WorkForm;
