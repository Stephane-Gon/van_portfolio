import ProvidersWrapper from "../providers/ProvidersWrapper";
import ReservedArea from "@/design-system/templates/ReservedArea";


export const metadata = {
  metadataBase: "http://localhost:3000",
  title: "Dashboard",
  description: "My portfolio dashboard",
};

export default async function ReservedLayout({ children }: { children: React.ReactNode}) {


  return (
    <ProvidersWrapper>
      <ReservedArea>
        {children}
      </ReservedArea>
    </ProvidersWrapper>
  );
}