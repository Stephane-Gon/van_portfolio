"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Van } from "@/design-system/icons"

type VanLogoProps = { 
  width?: string;
  height?: string;
}

const VanLogo = ({
  width= '90px',
  height = '90px'
}: VanLogoProps) => {
  const router = useRouter()

  return (
    <span onClick={() => router.push('/')} className="cursor-pointer font-bold text-text" >
      <Van width={width} height={height} className='fill-secondary' />
    </span>
  )

}

export default VanLogo
