'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
// Components
import { Header, Sidebar, MobileMenu } from "@/design-system/organism";
// Hooks
import { useAppStore } from "@/store/useApp";
// Utils
import { Links, LinkT } from '@/utils/app'

const ReservedArea = ({ children }: { children: React.ReactNode}) => {
  const pathname = usePathname()
  const { status } = useSession()
  const showMobileMenu = useAppStore(state => state.showMobileMenu)
  const setActiveLink = useAppStore(state => state.setActiveLink)

  useEffect(() => {
    const hasActive = Links.find((link: LinkT) => pathname.includes(link.href));
    if(hasActive) {
      setActiveLink(hasActive.id)
    } else setActiveLink(0);
  }, [pathname]);

  const _renderSidebar = () => { 
    return (status === "authenticated") && <Sidebar />
  }

  const _renderMobileMenu = () => { 
    return (status === "authenticated" && showMobileMenu) && <MobileMenu />
  }

  // TODO - Em vez de remover a scrollbar, tentar adicionar um style
  return (
    <main className="min-h-screen flex flex-col items-center bg-primary bg-background  bg-fixed bg-cover">
      <Header />
      <div className="w-full flex">
        { _renderSidebar() }
        <div className="w-full overflow-y-auto p-12 no-scrollbar">
          {children}
        </div>
      </div>
      { _renderMobileMenu() }
    </main>
  )
}

export default ReservedArea