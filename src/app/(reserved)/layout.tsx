import ProvidersWrapper from "../providers/ProvidersWrapper";
import Header from "@/design-system/organism/Header";


export const metadata = {
  metadataBase: "http://localhost:3000",
  title: "Dashboard",
  description: "My portfolio dashboard",
};

export default function ReservedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersWrapper>
      <main className="min-h-screen flex flex-col items-center">
        <Header />
        <div className="w-full">
          {children}
        </div>
      </main>
    </ProvidersWrapper>
  );
}
