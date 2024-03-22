import { Tools, Code, Jobs, Texts } from '@/design-system/icons'

export type LinkT = {
  id: number;
  href: string;
  label: string;
  icon: JSX.Element;
}

// Passar só o elemento, sem estanciar
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
  {
    id: 3,
    href: '/works',
    label: 'Works',
    icon: <Jobs stroke='#A3E7FC' width="1.2rem" height="1.2rem" />
  },
  { // TODO - ver se a cor deste icon está certa
    id: 4,
    href: '/about',
    label: 'About Me',
    icon: <Texts fill='#A3E7FC' width="1.2rem" height="1.2rem" />
  },
]