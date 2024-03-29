import { supabaseAdmin } from '@/lib/supabase';

import List from '@/features/tools/components/List';

const Tools = async () => {
  const { data: tools } = await supabaseAdmin.from('tools').select();

  return (
    <div>
      <List tools={tools} />
    </div>
  );
};

export default Tools;
