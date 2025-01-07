import { SVGProps } from 'react';

export enum Themes {
  light = 'light',
  dark = 'dark',
}

export type LinkT = {
  id: number;
  href: string;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  styles: SVGProps<SVGSVGElement>;
};
