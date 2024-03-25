'use client'

import Link from 'next/link'
// Utils
import { LinkT } from '@/utils/app'

type RouteLinkProps = { 
  link: LinkT;
  activeLink: number;
  isMobile?: boolean;
}

const RouteLink = ({ link, activeLink, isMobile = false }: RouteLinkProps) => {

  return (
    <Link href={link.href} key={`sidebar-main-link-id-${link.id}`} className='pr-2 flex items-center justify-start gap-2 group'>
      <span className={`bg-[#A3E7FC40] p-1.5 ${activeLink === link.id ? 'rounded-md' : 'rounded-full'} group-hover:rounded-md transition-all`}>
        {
          link.styles.fill ?
            <link.Icon {...link.styles} fill={activeLink === link.id ? '#8AEA92' : '#A3E7FC'} /> :
            <link.Icon {...link.styles} stroke={activeLink === link.id ? '#8AEA92' : '#A3E7FC'}/>
        }
      </span>
      <p className={`${ isMobile ? 'inline' : 'hidden @3xs/sidebar:inline'} text-xl transition-all leading-none ${activeLink === link.id ? 'text-primaryGreen' : 'text-primaryBlue'}`}>{link.label}</p>
    </Link>
  )
}

export default RouteLink