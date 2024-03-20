'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import { Header, Sidebar } from "@/design-system/organism";


const ReservedArea = ({ children }: { children: React.ReactNode}) => {
  const { status } = useSession()

  const _renderSidebar = () => { 
    return (status === "authenticated") && <Sidebar />
  }

  // TODO - Em vez de remover a scrollbar, tentar adicionar um style
  return (
    <main className="min-h-screen flex flex-col items-center bg-smothDark bg-darkBackground bg-fixed bg-cover">
      <Header />
      <div className="w-full flex">
        { _renderSidebar() }
        <div className="w-full overflow-y-auto p-12 no-scrollbar">
          {children}
        </div>
      </div>
    </main>
  )
}

export default ReservedArea