import { supabaseAdmin } from '@/lib/supabase';

import List from '@/features/tools/components/List';
import ToolTabs from '@/features/tools/components/ToolTabs';

const Tools = async () => {
  const { data: tools } = await supabaseAdmin.from('tools').select();

  return (
    <div className='flex flex-col items-center gap-4'>
      <ToolTabs />
      <List tools={tools} />
    </div>
  );
};

export default Tools;
