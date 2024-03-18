import ProvidersWrapper from "../providers/ProvidersWrapper";
import Header from "@/design-system/organism/Header";
import "../globals.css"


export const metadata = {
  metadataBase: "http://localhost:3000",
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className="bg-smothDark text-foreground">
        <ProvidersWrapper>
          <main className="min-h-screen flex flex-col items-center">
            <Header />
            <div>
              {children}
            </div>
          </main>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
