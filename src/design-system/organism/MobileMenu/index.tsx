"use client"

import Link from 'next/link'
// Components
import { VanLogo, RouteLink } from "@/design-system/molecules"
import { Dashboard, Linkedin, Github } from '@/design-system/icons'
// Utils
import { Links, LinkT } from '@/utils/app'
// Hooks
import { useAppStore } from '@/store/useApp'

const MobileMenu = () => {
  const activeLink = useAppStore(state => state.activeLink)

  const _renderMainLinks = () => {
    return Links.map((link: LinkT) => <RouteLink link={link} activeLink={activeLink} isMobile />)
  }

  return (
    <div className='absolute top-[70px] left-0 right-0 bottom-0 flex flex-col bg-accent p-4 xl:hidden'>
      <span className="w-full flex items-center justify-center"> 
        <VanLogo width="150px" height="150px" />
      </span>
      <div className='flex flex-col items-start px-5 pt-10'>
        <Link className='flex items-end justify-start gap-1' href="/dashboard">
          <span className='bg-text/50 p-1 rounded-md'>
            <Dashboard stroke="white" width="2rem" height="2rem" />
          </span>
          <p className='text-text font-bold font-josefin text-2xl'>DASHBOARD</p>
        </Link>

        <div className='flex flex-col items-start gap-8 py-10 pl-5'>
          { _renderMainLinks() }
        </div>

      </div>

      <section className='flex items-start justify-center gap-4 mt-auto mb-5'>
        <Linkedin 
          onClick={() => window.open('https://www.linkedin.com/in/stephane-ribeiro-3293b624b/', '_blank', 'noopener,noreferrer')} 
          width="2rem" 
          height="2rem" 
          cursor="pointer" 
          className='fill-primary'
        />
        <Github 
          onClick={() => window.open('https://github.com/Stephane-Gon', '_blank', 'noopener,noreferrer')} 
          width="2rem" 
          height="2rem" 
          cursor="pointer"   
          className='fill-primary'
        />
      </section>
    </div>
  )
}

export default MobileMenu