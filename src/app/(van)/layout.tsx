export const metadata = {
  title: 'Stéphane Ribeiro - Portfolio | Van Experience',
  description:
    'Portfolio of Stéphane Ribeiro, showcasing projects in web development. Expertise in react, next, three.js, css and more.',
  openGraph: {
    title: 'Stéphane Ribeiro - Portfolio | Van Experience',
    description:
      'Portfolio of Stéphane Ribeiro, showcasing projects in web development. Expertise in react, next, three.js, css and more.',
    // Images: [{ url: 'https://yourportfolio.com/og_van.png' }],
    // Url: 'https://yourportfolio.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stéphane Ribeiro - Portfolio | Van Experience',
    description:
      'Portfolio of Stéphane Ribeiro, showcasing projects in web development. Expertise in react, next, three.js, css and more.',
    // Images: ['https://yourportfolio.com/og_van.png'],
  },
  robots: 'index, follow',
  keywords: ['portfolio', 'three.js', 'web development'],
};

// TODO - Update para o url do website

export default function VanLayout({ children }: { children: React.ReactNode }) {
  return <div className='h-screen'>{children}</div>;
}
