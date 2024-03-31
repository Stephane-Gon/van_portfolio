'use client';
import React from 'react';
import type { TOGGLE_TABS } from '@/constants';

type TabsProps = {
  activeTab: TOGGLE_TABS;
  setActiveTab: (tab: TOGGLE_TABS) => void;
};

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  // TODO - Adicionar uma animação na barra
  return (
    <div className=' flex items-center gap-2'>
      <span
        onClick={() => setActiveTab('list')}
        className={`${activeTab === 'list' ? 'border-b-2 border-b-primary text-primary' : 'text-text'} flex min-w-[100px] cursor-pointer justify-center px-4 text-lg `}>
        LIST
      </span>
      <span
        onClick={() => setActiveTab('detail')}
        className={`${activeTab === 'detail' ? 'border-b-2 border-b-primary text-primary' : 'text-text'} flex min-w-[100px] cursor-pointer justify-center px-4 text-lg`}>
        DETAIL
      </span>
    </div>
  );
};

export default Tabs;
