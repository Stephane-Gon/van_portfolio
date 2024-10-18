'use client';
import { useEffect, useRef } from 'react';
import type { TOGGLE_TABS } from '@/constants';

type TabsProps = {
  activeTab: TOGGLE_TABS;
  setActiveTab: (tab: TOGGLE_TABS) => void;
  hasSelectedItem: boolean;
  selectedItem: {
    name?: string;
    id?: number;
  };
  localStorageItem: string;
};

const Tabs = ({ activeTab, setActiveTab, hasSelectedItem, localStorageItem, selectedItem }: TabsProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateTabBorder = async (tabId: string, fromTranslate: string, toTranslate: string) => {
      const { gsap } = await import('gsap');
      gsap.fromTo(
        tabId,
        {
          duration: 0.3,
          translateX: fromTranslate,
        },
        {
          duration: 0.3,
          translateX: toTranslate,
        },
      );
    };

    if (activeTab === 'list') {
      animateTabBorder('#border-list', '100%', '0%');
      animateTabBorder('#border-detail', '0%', '100%');
    } else {
      animateTabBorder('#border-list', '0%', '-100%');
      animateTabBorder('#border-detail', '-100%', '0%');
    }
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current && bgRef.current) {
        if (window.scrollY >= 70) {
          tabsRef.current.classList.add('fixed');
          tabsRef.current.classList.add('top-0');
          bgRef.current.classList.add('bg-accent');
        } else {
          tabsRef.current.classList.remove('fixed');
          tabsRef.current.classList.remove('top-0');
          bgRef.current.classList.remove('bg-accent');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const _renderDetailTab = () => {
    return (
      hasSelectedItem && (
        <span
          onClick={() => {
            setActiveTab('detail');
            if (selectedItem.id) localStorage.setItem(localStorageItem, JSON.stringify(selectedItem.id));
          }}
          className={`flex min-w-[100px] cursor-pointer flex-col items-center pb-1 2sm:min-w-[150px]`}>
          <p className={`${activeTab === 'detail' ? 'text-primary' : 'text-text'} text-base uppercase`}>
            DETAIL {selectedItem.name && `- ${selectedItem.name}`}
          </p>
          <span
            id='border-detail'
            className={`${activeTab === 'detail' ? 'w-full' : 'w-0'} h-[2px] rounded-full bg-gradient-to-r from-secondary via-tertiary to-primary`}></span>
        </span>
      )
    );
  };

  return (
    <div ref={tabsRef} className='z-10 flex h-[70px] w-full items-center justify-center'>
      <div ref={bgRef} className='flex w-1/2 items-center justify-center rounded-md py-2'>
        <span
          onClick={() => {
            setActiveTab('list');
            localStorage.removeItem(localStorageItem);
          }}
          className={`flex min-w-[100px] cursor-pointer flex-col items-center pb-1 2sm:min-w-[150px]`}>
          <p className={`${activeTab === 'list' ? 'text-primary' : 'text-text'} text-base`}>LIST</p>
          <span
            id='border-list'
            className={`${activeTab === 'list' ? 'w-full' : 'w-0'} h-[2px] rounded-full bg-gradient-to-r from-secondary via-tertiary to-primary`}></span>
        </span>
        {_renderDetailTab()}
      </div>
    </div>
  );
};

export default Tabs;
