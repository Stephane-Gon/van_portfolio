import { supabaseAdmin } from '@/lib/supabase';

import type { ToolT } from '../../types';

const List = async () => {
  const toolsData = await supabaseAdmin.from('tools').select();
  const tools: ToolT[] | null = toolsData.data;

  console.log(tools);
  // TODO - Criar um skeleton loader, e uma mensagem de erro caso não tenha tools

  return <div>List</div>;
};

export default List;
