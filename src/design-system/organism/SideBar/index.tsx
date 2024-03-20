'use client'

import { useState } from 'react'
import Link from 'next/link'
// Icons
import { ChevronRight, Tools, Dashboard } from '@/design-system/icons'
// Utils
import { Links, LinkT } from './utils/Links'

const Sidebar = () => {
  const [isNarrow, setIsNarrow] = useState<boolean>(true)
  const [isLockedNarrow, setIsLockedNarrow] = useState<boolean>(true)

  const _renderMainLinks = () => {
    return Links.map((link: LinkT) => {
      return (
        <Link href={link.href} key={`sidebar-main-link-id-${link.id}`} className='pr-2 flex items-center justify-start gap-2'>
          <span className='bg-[#A3E7FC40] p-1 rounded-md'>
            {link.icon}
          </span>
          <p className='hidden @4xs/sidebar:inline text-primaryBlue text-xl transition-all'>{link.label}</p>
        </Link>
      )
    })
  }

  // TODO - Resolver o flicker dos logos ao dár toggle da sidebar
  return (
    <aside
      className={` 
        @container/sidebar h-[calc(100vh-70px)] relative border-r-4  border-primaryGreen 
        ${(isLockedNarrow && isNarrow) ? 'w-16' : 'w-72'} duration-300
        before:absolute before:-top-1 before:left-0 before:w-full before:h-1 before:bg-primaryGreen
      `}>
      <span className='absolute -right-3.5 -top-3.5 bg-primaryGreen rounded-full cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear  '>
        <ChevronRight className={`${!isLockedNarrow && 'rotate-180'}`} onClick={() => setIsLockedNarrow(!isLockedNarrow)} /> 
      </span>
      <div
        className='w-full h-full py-4 pl-4 pr-1 @4xs/sidebar:pr-4'
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
          <p className='text-smothWhite font-bold font-josefin text-xl hidden @4xs/sidebar:inline'>DASHBOARD</p>
        </Link>

        <section className='flex flex-col items-start gap-5 py-10'>
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