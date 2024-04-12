'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, Draggable, ScrollTrigger } from 'gsap/all';

type TagsSliderProps = {
  tags: string[];
  id: number;
};

const TagsSlider = ({ tags, id }: TagsSliderProps) => {
  const scrollContainerRef = useRef(null);
  const proxyRef = useRef(null);

  // TODO - Utilizar esta lógica no slider das imagens

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLElement;
    const tags = container.querySelectorAll('.my-tag');

    let clamp: any;
    let dragRatio: any;

    // Create the GSAP scrollTween
    const scrollTween = gsap.to(tags, {
      xPercent: -100 * (tags.length - 1),
      ease: 'none',
    });

    // Create ScrollTrigger for horizontal scroll animation
    const horizontalScroll = ScrollTrigger.create({
      animation: scrollTween,
      trigger: scrollContainerRef.current,
      pin: true,
      scrub: 1,
      end: () => '+=' + container.offsetWidth,
    });

    // Create Draggable for horizontal dragging
    const drag = Draggable.create(proxyRef.current, {
      trigger: scrollContainerRef.current,
      type: 'x',
      onPress() {
        clamp || ScrollTrigger.refresh();
        this.startScroll = horizontalScroll.scroll();
      },
      onDrag() {
        horizontalScroll.scroll(clamp(this.startScroll - (this.x - this.startX) * dragRatio));
      },
    })[0];

    // Event listener for ScrollTrigger refresh
    const onRefresh = () => {
      clamp = gsap.utils.clamp(horizontalScroll.start + 1, horizontalScroll.end - 1);
      dragRatio = container.offsetWidth / (window.innerWidth * (tags.length - 1));
    };

    // Add event listener for ScrollTrigger refresh
    ScrollTrigger.addEventListener('refresh', onRefresh);

    // Clean up function
    return () => {
      // Remove event listener for ScrollTrigger refresh
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      // Kill GSAP animations and Draggable
      scrollTween.kill();
      horizontalScroll.kill();
      drag.kill();
    };
  }, []);

  //* Render the skill tags function
  const _renderSkillTags = () => {
    return (
      tags &&
      tags.map(type => (
        <span key={`card-${id}-type-${type}`} className='rounded-lg bg-accent/40 px-2 py-1'>
          <p className='my-tag text-xs font-bold uppercase italic text-text'>{type}</p>
        </span>
      ))
    );
  };

  return (
    <>
      <div
        ref={scrollContainerRef}
        className='no-scrollbar mt-4 flex cursor-pointer touch-pan-x items-center justify-start gap-1 overflow-auto'>
        {_renderSkillTags()}
      </div>
      <div className='proxy' ref={proxyRef}></div>
    </>
  );
};

export default TagsSlider;
