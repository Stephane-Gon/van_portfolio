'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/features/three/components/Scene'), { ssr: false });

const Home = () => {
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return <Scene />;
};

export default Home;
