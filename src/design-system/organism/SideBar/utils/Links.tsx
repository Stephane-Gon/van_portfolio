import { Tools, Code, Jobs, Texts, List, Add } from '@/design-system/icons'
import { SVGProps } from 'react';

export type LinkT = {
  id: number;
  href: string;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  styles: SVGProps<SVGSVGElement>;
  subLinks?: LinkT[];
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
    subLinks: [
      {
        id: 5,
        href: '/tools/list',
        label: 'Tools List',
        Icon: List,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
      {
        id: 6,
        href: '/tools/add',
        label: 'Tools Add',
        Icon: Add,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
    ]
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
    subLinks: [
      {
        id: 7,
        href: '/projects/list',
        label: 'Projects List',
        Icon: List,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
      {
        id: 8,
        href: '/projects/add',
        label: 'Projects Add',
        Icon: Add,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
    ]
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
    subLinks: [
      {
        id: 9,
        href: '/works/list',
        label: 'Works List',
        Icon: List,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
      {
        id: 10,
        href: '/works/add',
        label: 'Works Add',
        Icon: Add,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
    ]
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
    },
    subLinks: [
      {
        id: 11,
        href: '/about/list',
        label: 'About List',
        Icon: List,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
      {
        id: 12,
        href: '/about/add',
        label: 'About Add',
        Icon: Add,
        styles: {
          fill: '#A3E7FC',
          width: '1.2rem',
          height: '1.2rem'
        },
      },
    ]
  },
]