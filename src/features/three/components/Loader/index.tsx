import { useProgress } from '@react-three/drei';
import { useThreeStore } from '../../store/useThree';
import { useAppStore } from '@/features/app/store';
import { useEffect, useState } from 'react';
import { VanLoader } from '@/design-system/icons';
import { ThemeToggler } from '@/design-system/molecules';

const Loader = () => {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | string>(1.5);
  const [canClick, setCanClick] = useState<boolean>(false);
  const setStartScene = useThreeStore(state => state.setStartScene);
  const toggleTheme = useAppStore(state => state.toggleTheme);

  useEffect(() => {
    if (progress === 100) {
      let countdownValue = 1.5; // Starting countdown value
      const interval = setInterval(() => {
        countdownValue -= 0.01; // Decrement the countdown value by 0.01 every 10ms
        if (countdownValue <= 0) {
          clearInterval(interval); // Clear the interval when countdown reaches zero
          setInterval(() => {
            setCountdown('Start the experience!');
          }, 300);
          setCanClick(true); // Enable click after countdown reaches zero
        } else {
          setCountdown(countdownValue.toFixed(1)); // Update the countdown state with formatted value
        }
      }, 10); // Update every 10 milliseconds (0.01 seconds)

      return () => clearInterval(interval); // Cleanup the interval on component unmount or re-render
    }
  }, [progress]);

  const handleStartScene = () => {
    if (progress === 100 && canClick) {
      setIsVisible(true);
      setTimeout(() => setStartScene(true), 1000);
    }
  };

  return (
    <div
      className={`bg-inherit fixed inset-0 z-10 flex flex-col items-center justify-between bg-accent p-2 transition-opacity duration-[1500ms] md:p-16 ${isVisible ? 'pointer-events-none opacity-0' : ''}`}>
      <div className='loader_title'>The van is being assembled, just wait a moment...</div>

      <div className='flex flex-1 flex-col items-center justify-center'>
        <button
          className={`
            flex h-14 items-center justify-center rounded-full border-2 border-primary p-4 text-primary shadow-md duration-300 ease-out
            ${canClick ? 'w-60 cursor-pointer hover:border-secondary hover:text-lg hover:text-secondary hover:shadow-xl' : 'pointer-events-none w-14'}
          `}
          onClick={handleStartScene}>
          {countdown}
        </button>

        <ThemeToggler
          className={`duration-300 ease-out ${canClick ? 'opacity-100' : 'opacity-0'}`}
          toggleTheme={toggleTheme}
        />
      </div>

      <div className='relative flex h-[125px] w-full flex-col justify-end overflow-hidden md:w-[95%]'>
        <span
          className={`absolute left-0 w-[120px] duration-[1500ms] ease-in-out ${progress === 100 && 'left-[calc(100%-120px)]'}`}>
          <VanLoader
            className={`origin-right fill-primary duration-300 ease-out ${canClick ? 'cursor-pointer hover:scale-125 hover:fill-secondary' : 'pointer-events-none'}`}
            width={120}
            height={120}
            onClick={handleStartScene}
          />
        </span>
        <div
          className={`absolute -left-full h-2 w-full rounded-sm bg-primary duration-[1500ms] ease-in-out ${progress === 100 && 'left-0'}`}
        />
      </div>
    </div>
  );
};

export default Loader;
