import { useState, useEffect } from 'react';

function throttle(func: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    const now = new Date().getTime();

    if (timeout) clearTimeout(timeout);

    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    } else {
      timeout = setTimeout(
        () => {
          func(...args);
          lastCall = new Date().getTime();
        },
        delay - (now - lastCall),
      );
    }
  };
}

function useViewportSize(throttleDelay = 200) {
  // Initialize the state with the current viewport size
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Define a function to update the viewport size
    const updateSize = throttle(() => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, throttleDelay);

    // Add event listener to listen for window resize
    window.addEventListener('resize', updateSize);

    // Call the function initially to set the correct size
    updateSize();

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener('resize', updateSize);
  }, [throttleDelay]); // Empty dependency array to ensure the effect runs only once

  return viewportSize;
}

export default useViewportSize;
