'use client';
import { useEffect } from 'react';
import type { TOGGLE_TABS } from '@/constants';

type TabsProps = {
  activeTab: TOGGLE_TABS;
  setActiveTab: (tab: TOGGLE_TABS) => void;
  hasSelectedItem: boolean;
  localStorageItem: string;
};

const Tabs = ({ activeTab, setActiveTab, hasSelectedItem, localStorageItem }: TabsProps) => {
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

  const _renderDetailTab = () => {
    return (
      hasSelectedItem && (
        <span
          onClick={() => setActiveTab('detail')}
          className={`flex min-w-[100px] cursor-pointer flex-col items-center pb-1 2sm:min-w-[150px]`}>
          <p className={`${activeTab === 'detail' ? 'text-primary' : 'text-text'} text-base`}>DETAIL</p>
          <span
            id='border-detail'
            className={`${activeTab === 'detail' ? 'w-full' : 'w-0'} h-[2px] rounded-full bg-gradient-to-r from-secondary via-tertiary to-primary`}></span>
        </span>
      )
    );
  };

  return (
    <div className='flex items-center'>
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
  );
};

export default Tabs;
