'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useThreeStore } from '@/features/three/store/useThree';

const Scene = dynamic(() => import('@/features/three/components/Scene'), { ssr: false });

const Home = () => {
  const searchParams = useSearchParams();
  const setDebugMode = useThreeStore(state => state.setDebugMode);

  useEffect(() => {
    if (searchParams.get('debug') === 'true') {
      setDebugMode(true);
    }
  }, [searchParams, setDebugMode]);

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return <Scene />;
};

export default Home;
