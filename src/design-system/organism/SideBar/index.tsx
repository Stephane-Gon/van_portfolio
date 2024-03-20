'use client'

import { useState } from 'react'
import { ChevronRight } from '@/design-system/icons'

const Sidebar = () => {
  const [isNarrow, setIsNarrow] = useState<boolean>(true)
  const [isLockedNarrow, setIsLockedNarrow] = useState<boolean>(true)

  return (
    <aside
      className={`
        h-[calc(100vh-70px)] relative border-r-4  border-primaryGreen ${(isLockedNarrow && isNarrow) ? 'w-16' : 'w-64'} duration-300
        before:absolute before:-top-1 before:left-0 before:w-full before:h-1 before:bg-primaryGreen
      `}>
      <span className='absolute p-0.5 -right-4 -top-4 bg-primaryGreen rounded-full cursor-pointer'>
        <ChevronRight className={`${!isLockedNarrow && 'rotate-180'}`} onClick={() => setIsLockedNarrow(!isLockedNarrow)} /> 
      </span>
      <div
        className='w-full h-full py-4 px-8'
        onMouseEnter={() => {
          if(isLockedNarrow) setIsNarrow(false)
        }}
        onMouseLeave={() => {
          if(isLockedNarrow) setIsNarrow(true)
        }}
      >
        <section>Closing logo</section>
      </div>
    </aside>
  )
}

export default Sidebar