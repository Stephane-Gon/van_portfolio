'use client';

import Link from 'next/link';
// Utils
import { LinkT } from '@/features/app/types';

type RouteLinkProps = {
  link: LinkT;
  activeLink: number;
  isMobile?: boolean;
};

const RouteLink = ({ link, activeLink, isMobile = false }: RouteLinkProps) => {
  return (
    <Link
      href={link.href}
      key={`sidebar-main-link-id-${link.id}`}
      className='group flex items-center justify-start gap-2 pr-2'>
      <span
        className={`bg-text/50 p-1.5 ${activeLink === link.id ? 'rounded-md' : 'rounded-full'} transition-all group-hover:rounded-md`}>
        {link.styles.fill ? (
          <link.Icon {...link.styles} fill={activeLink === link.id ? '#8AEA92' : '#A3E7FC'} />
        ) : (
          <link.Icon {...link.styles} stroke={activeLink === link.id ? '#8AEA92' : '#A3E7FC'} />
        )}
      </span>
      <p
        className={`${isMobile ? 'inline' : 'hidden @3xs/sidebar:inline'} text-xl leading-none transition-all ${activeLink === link.id ? 'text-tertiary' : 'text-primary'}`}>
        {link.label}
      </p>
    </Link>
  );
};

export default RouteLink;
