import { Tools, Code, Jobs, Texts } from '@/design-system/icons'
import { SVGProps } from 'react';

export type LinkT = {
  id: number;
  href: string;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  styles: SVGProps<SVGSVGElement>;
}

export const Links: LinkT[] = [
  {
    id: 1,
    href: '/tools',
    label: 'Tools',
    Icon: Tools,
    styles: {
      fill: '#A3E7FC',
      width: '1.2rem',
      height: '1.2rem'
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
      height: '1.2rem'
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
      height: '1.2rem'
    },
  },
  {
    id: 4,
    href: '/about',
    label: 'About Me',
    Icon: Texts,
    styles: {
      fill: '#A3E7FC',
      width: '1.2rem',
      height: '1.2rem'
    }
  },
]