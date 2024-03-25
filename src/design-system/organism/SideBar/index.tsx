'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
// Components
import SidebarLink from './components/Link'
// Icons
import { ChevronRight, Dashboard } from '@/design-system/icons'
// Utils
import { Links, LinkT } from './utils/Links'

// TODO - Criar um mobileMenu com está lógica
const Sidebar = () => {
  const pathname = usePathname()
  const [isNarrow, setIsNarrow] = useState<boolean>(true)
  const [isLockedNarrow, setIsLockedNarrow] = useState<boolean>(true)
  const [activeLink, setActiveLink] = useState<number>(0)

  useEffect(() => {
    const hasActive = Links.find((link: LinkT) => pathname.includes(link.href));
    if(hasActive) {
      setActiveLink(hasActive.id)
    } else setActiveLink(0);
  }, [pathname]);

  const _renderMainLinks = () => {
    return Links.map((link: LinkT) => <SidebarLink link={link} activeLink={activeLink} />)
  }

  return (
    <aside
      className={` 
        @container/sidebar h-[calc(100vh-70px)] relative ${(isLockedNarrow && isNarrow) ? 'w-20' : 'w-72'} 
        duration-300 bg-glassDark shadow-glass  border border-glassBorder 
      `}
    >

      <span className='absolute -right-3.5 -top-3.5 bg-primaryGreen rounded-full cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear  '>
        <ChevronRight className={`${!isLockedNarrow && 'rotate-180'}`} onClick={() => setIsLockedNarrow(!isLockedNarrow)} /> 
      </span>
      <div
        className='w-full h-full p-4'
        onMouseEnter={() => {
          if(isLockedNarrow) setIsNarrow(false)
        }}
        onMouseLeave={() => {
          if(isLockedNarrow) setIsNarrow(true)
        }}
      >
        <Link className='flex items-end justify-start gap-1' href="/dashboard">
          <span className='bg-[#A3E7FC40] p-1 rounded-md'>
            <Dashboard  stroke="white" width="1.5rem" height="1.5rem" />
          </span>
          <p className='text-smothWhite font-bold font-josefin text-xl hidden @3xs/sidebar:inline'>DASHBOARD</p>
        </Link>

        <section className='flex flex-col items-start gap-8 py-10'>
          { _renderMainLinks() }
        </section>

        <section>
          {/* Redes sociais */}
        </section>
      </div>
    </aside>
  )
}

export default Sidebar