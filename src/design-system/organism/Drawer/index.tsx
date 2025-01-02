'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Drawer = ({ isOpen, children }: Props) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current) {
      if (isOpen) {
        // Animate to full-screen size with a delay of 1 second
        gsap.to(drawerRef.current, {
          width: '100vw',
          height: '100vh',
          duration: 1,
          delay: 1,
          ease: 'power2.inOut',
          display: 'block',
        });
      } else {
        // Reverse animation back to the small square
        gsap.to(drawerRef.current, {
          width: '3.5rem',
          height: '3.5rem',
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            // Hide element after animation completes
            if (drawerRef.current) {
              drawerRef.current.style.display = 'none';
            }
          },
        });
      }
    }
  }, [isOpen]);

  return (
    <div ref={drawerRef} className={`fixed inset-0 m-auto hidden h-14 w-14 bg-accent p-4`}>
      {children}
    </div>
  );
};

export default Drawer;
