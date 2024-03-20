'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from '@/design-system/icons'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const _renderToggleLogo = () => { 
    return isOpen ? 
      <ChevronLeft className='hover:rotate-180 transition-transform' onClick={() => setIsOpen(false)} /> 
        : 
      <ChevronRight className='hover:rotate-180 transition-transform' onClick={() => setIsOpen(true)} />
  }

  return (
    <aside className={`py-4 px-8 h-[calc(100vh-55px)] relative border-r border-primaryGreen ${isOpen ? 'w-64' : 'w-12'} duration-300`}>
      <span className='absolute -right-3 bg-primaryGreen rounded-full cursor-pointer'>
        <ChevronLeft className={`${!isOpen && 'rotate-180'}`} onClick={() => setIsOpen(!isOpen)} /> 
      </span>
      <section>Closing logo</section>
    </aside>
  )
}

export default Sidebar