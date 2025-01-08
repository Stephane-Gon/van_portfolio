'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

type WordSliderProps = {
  words: string[];
};

const WordSlider = ({ words }: WordSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Reset to initial position
    gsap.set(sliderRef.current, { y: 0 });

    const wordHeight = 30; // Height of each word in pixels
    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((_, index) => {
      if (index < words.length - 1) {
        tl.to(sliderRef.current, {
          y: `-=${wordHeight}`,
          duration: 0.5,
          ease: 'power1.inOut',
        }).to({}, { duration: 1.5 });
      }
    });

    // Reset to the beginning
    tl.set(sliderRef.current, { y: 0 });

    return () => {
      tl.kill(); // Cleanup on unmount
    };
  }, [words]);

  return (
    <div className='flex h-[30px] overflow-hidden text-[20px]'>
      <div ref={sliderRef} className='flex flex-col items-start justify-start'>
        {words.map(word => {
          return (
            <div key={`slider_word_${word}`} className='text-text'>
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordSlider;
