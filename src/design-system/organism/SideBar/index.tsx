'use client'

import { useState } from 'react'
import Link from 'next/link'
// Hooks
import { useAppStore } from '@/store/useApp'
// Components
import RouteLink from '@/design-system/molecules/RouteLink'
// Icons
import { ChevronRight, Dashboard, Linkedin, Github } from '@/design-system/icons'
// Utils
import { Links, LinkT } from '@/utils/app'

const Sidebar = () => {
  const activeLink = useAppStore(state => state.activeLink)
  const [isNarrow, setIsNarrow] = useState<boolean>(true)
  const [isLockedNarrow, setIsLockedNarrow] = useState<boolean>(true)


  const _renderMainLinks = () => {
    return Links.map((link: LinkT) => <RouteLink link={link} activeLink={activeLink} />)
  }

  return (
    <aside
      className={` 
        @container/sidebar hidden h-[calc(100vh-70px)] relative ${(isLockedNarrow && isNarrow) ? 'w-20' : 'w-72'} 
        duration-300 bg-glassDark shadow-glass  border border-glassBorder xl:block
      `}
    >

      <span className='absolute -right-3.5 -top-3.5 bg-primaryGreen rounded-full cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear  '>
        <ChevronRight className={`${!isLockedNarrow && 'rotate-180'}`} onClick={() => setIsLockedNarrow(!isLockedNarrow)} /> 
      </span>
      <div
        className='w-full h-full p-4 flex flex-col justify-between'
        onMouseEnter={() => {
          if(isLockedNarrow) setIsNarrow(false)
        }}
        onMouseLeave={() => {
          if(isLockedNarrow) setIsNarrow(true)
        }}
      >
        <section>
          <Link className='flex items-end justify-start gap-1' href="/dashboard">
            <span className='bg-[#A3E7FC40] p-1 rounded-md'>
              <Dashboard  stroke="white" width="1.5rem" height="1.5rem" />
            </span>
            <p className='text-smothWhite font-bold font-josefin text-xl hidden @3xs/sidebar:inline'>DASHBOARD</p>
          </Link>

          <div className='flex flex-col items-start gap-8 py-10'>
            { _renderMainLinks() }
          </div>
        </section>

        <section className='flex flex-col items-start gap-4 @3xs/sidebar:flex-row'>
          <Linkedin 
            onClick={() => window.open('https://www.linkedin.com/in/stephane-ribeiro-3293b624b/', '_blank', 'noopener,noreferrer')} 
            width="1.7rem" 
            height="1.7rem" 
            fill='#A3E7FC'
            cursor="pointer" 
          />
          <Github 
            onClick={() => window.open('https://github.com/Stephane-Gon', '_blank', 'noopener,noreferrer')} 
            width="1.7rem" 
            height="1.7rem" 
            fill='#A3E7FC' 
            cursor="pointer"         
          />
        </section>
      </div>
    </aside>
  )
}

export default Sidebar