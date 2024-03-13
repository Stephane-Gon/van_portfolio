
import { supabase } from "@/lib/supabase";

export default async function Page() {

  const { data: tools } = await supabase.from('tools').select()
  console.log("🚀 ~ Page ~ tools:", tools)

  return (
    <ul>
      {tools?.map((tool: any) => (
        <li key={`tool-${tool.id}`}>{tool}</li>
      ))}
    </ul>
  )
}
