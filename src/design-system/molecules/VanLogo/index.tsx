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
    <span onClick={() => router.push('/')} className="cursor-pointer font-bold text-smothWhite" >
      <Van width={width} height={height} fill='#EA9E8D' />
    </span>
  )

}

export default VanLogo
