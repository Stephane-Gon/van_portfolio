'use client';

import { SupabaseProject } from '../../types';

type Props = {
  project: SupabaseProject | null;
  setSelectedProject: (project: SupabaseProject | null) => void;
};

const MainDetail = ({ project }: Props) => {
  console.log('🚀 ~ MainDetail ~ project:', project);

  return <div className='mb-5 h-full w-full p-5'>hello</div>;
};

export default MainDetail;
