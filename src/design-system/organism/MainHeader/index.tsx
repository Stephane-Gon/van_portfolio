'use client';

// Icons & Components
import { ThemeToggler } from '@/design-system/molecules';
// Hooks
import { useAppStore } from '@/features/app/store';
import { useThreeStore } from '@/features/three/store/useThree';
// Icons
import { ArrowRight } from '@/design-system/icons';

const MainHeader = () => {
  const toggleTheme = useAppStore(state => state.toggleTheme);
  const theme = useAppStore(state => state.theme);
  const zoomFunction = useThreeStore(state => state.zoomFunction);

  return (
    <header className='sticky top-0 z-10 h-[50px] w-full border-b-2 border-secondary'>
      <div className='flex h-full items-center justify-between px-5 py-3'>
        <button
          onClick={() => zoomFunction && zoomFunction()}
          className='flex items-center justify-center gap-2 border-none'>
          <ArrowRight className='rotate-180 fill-text' fill={theme === 'dark' ? '#f5f5f5' : '#131313'} />
          <p className='text-lg leading-[inherit] text-text'>Back to van</p>
        </button>

        <span className='flex items-center gap-2 p-1'>
          <ThemeToggler toggleTheme={toggleTheme} />
        </span>
      </div>
    </header>
  );
};

export default MainHeader;
