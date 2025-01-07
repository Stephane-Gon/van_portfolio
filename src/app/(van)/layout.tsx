export const metadata = {
  title: 'Stéphane Ribeiro - Portfolio | Van Experience',
  description:
    'Portfolio of Stéphane Ribeiro, showcasing projects in web development. Expertise in react, next, three.js, css and more.',
  openGraph: {
    title: 'Stéphane Ribeiro - Portfolio | Van Experience',
    description:
      'Portfolio of Stéphane Ribeiro, showcasing projects in web development. Expertise in react, next, three.js, css and more.',
    images: [{ url: 'https://van-portfolio-pearl.vercel.app/.vercel.app/og_van.png' }],
    Url: 'https://van-portfolio-pearl.vercel.app/.vercel.app/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stéphane Ribeiro - Portfolio | Van Experience',
    description:
      'Portfolio of Stéphane Ribeiro, showcasing projects in web development. Expertise in react, next, three.js, css and more.',
    images: ['https://van-portfolio-pearl.vercel.app/.vercel.app/og_van.png'],
  },
  robots: 'index, follow',
  keywords: ['portfolio', 'three.js', 'web development'],
};

export default function VanLayout({ children }: { children: React.ReactNode }) {
  return <div className='h-screen'>{children}</div>;
}
