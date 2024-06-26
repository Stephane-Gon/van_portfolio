import { Tools, Code, Jobs } from '@/design-system/icons';
import type { LinkT } from '@/features/app/types';

export const Links: LinkT[] = [
  {
    id: 1,
    href: '/tools',
    label: 'Tools',
    Icon: Tools,
    styles: {
      fill: '#A3E7FC',
      width: '1.2rem',
      height: '1.2rem',
    },
  },
  {
    id: 2,
    href: '/projects',
    label: 'Projects',
    Icon: Code,
    styles: {
      fill: '#A3E7FC',
      width: '1.2rem',
      height: '1.2rem',
    },
  },
  {
    id: 3,
    href: '/works',
    label: 'Works',
    Icon: Jobs,
    styles: {
      stroke: '#A3E7FC',
      width: '1.2rem',
      height: '1.2rem',
    },
  },
];
