
import { supabaseAdmin } from "@/lib/supabase";

export default async function Page() {

  const { data: tools, error } = await supabaseAdmin.from('tools').select()
  console.log("🚀 ~ Page ~ error:", error)
  console.log("🚀 ~ Page ~ tools:", tools)

  return (
    <ul>
      {tools?.map((tool: any) => (
        <li key={`tool-${tool.id}`}>{tool.name}</li>
      ))}
    </ul>
  )
}
