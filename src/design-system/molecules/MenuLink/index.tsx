'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useThreeStore } from '@/features/three/store/useThree';
import type { ZoomedFeaturesT } from '@/features/three/types';

interface MenuLinkProps extends React.HTMLProps<HTMLDivElement> {
  text: string;
  delay?: number;
  indexOffeset?: number;
  hoveredLink: ZoomedFeaturesT;
}

const MenuLink = ({ text, hoveredLink, onClick, delay = 0.05, indexOffeset = 0 }: MenuLinkProps) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const setMenuHoverLink = useThreeStore(state => state.setMenuHoverLink);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (scope.current && completed) {
      if (isHovered) {
        animate('h1', { opacity: 1 });
        setMenuHoverLink(hoveredLink);
      } else {
        animate('h1', { opacity: 0.3 });
        setMenuHoverLink(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, isHovered, scope, animate]);

  return (
    <div
      ref={scope}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='flex cursor-pointer items-center justify-start gap-1'>
      {text.split('').map((letter, index) => (
        <motion.h1
          key={`${letter}-${index}`}
          className={`text-4xl font-bold text-[#f5f5f5]`}
          initial={{
            x: -100,
            opacity: 0,
            rotateX: 0,
          }}
          animate={{
            x: 0,
            opacity: 0.3,
            rotateX: 360,
          }}
          transition={{
            type: 'spring',
            damping: 10,
            bounce: 0.75,
            stiffness: 100,
            delay: (index + indexOffeset) * delay,
            duration: 0.1,
          }}
          onAnimationComplete={() => {
            if (index === text.length - 1) {
              setCompleted(true);
            }
          }}>
          {letter}
        </motion.h1>
      ))}
    </div>
  );
};

export default MenuLink;
