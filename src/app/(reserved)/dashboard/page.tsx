import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const { data: tools, error } = await supabaseAdmin.from('tools').select()
  const session = await getServerSession()
  console.log("🚀 ~ Dashboard ~ session:", session)
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

export default Dashboard