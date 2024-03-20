import { Tools, Code } from '@/design-system/icons'

export type LinkT = {
  id: number;
  href: string;
  label: string;
  icon: JSX.Element;
}

export const Links: LinkT[] = [
  {
    id: 1,
    href: '/tools',
    label: 'Tools',
    icon: <Tools fill='#A3E7FC' width="1.2rem" height="1.2rem" />
  },
  {
    id: 2,
    href: '/projects',
    label: 'Projects',
    icon: <Code fill='#A3E7FC' width="1.2rem" height="1.2rem" />
  },
]