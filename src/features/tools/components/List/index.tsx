import { supabaseAdmin } from '@/lib/supabase';

import type { ToolT } from '../../types';

const List = async () => {
  const toolsData = await supabaseAdmin.from('tools').select();
  const tools: ToolT[] | null = toolsData.data;
  // TODO - Criar um skeleton loader

  const _handleErrorMessage = (title: string, text?: string) => {
    return (
      <div className='w-full text-center'>
        <h2 className='text-2xl text-text'>{title}</h2>
        {text && <p className='text-text'>{text}</p>}
      </div>
    );
  };

  if (toolsData.error) {
    return _handleErrorMessage('Error while fetching the tools!', toolsData.error.message);
  }

  if (tools && tools.length === 0) {
    return _handleErrorMessage('No tools available!', 'Add a new tool by pressing the button.');
  }

  return <div className='grid'></div>;
};

export default List;
