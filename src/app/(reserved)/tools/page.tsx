import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

const Tools = async () => {
  const { data: tools, error } = await supabaseAdmin.from('tools').select();
  const session = await getServerSession();
  console.log('🚀 ~ Dashboard ~ session:', session);
  console.log('🚀 ~ Page ~ error:', error);
  console.log('🚀 ~ Page ~ tools:', tools);

  // TODO - Começar a adicionar uma componente de listagem das tools
  return <ul>{tools?.map((tool: any) => <li key={`tool-${tool.id}`}>{tool.name}</li>)}</ul>;
};

export default Tools;
