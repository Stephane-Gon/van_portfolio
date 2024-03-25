"use client"

import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Van, Menu } from "@/design-system/icons"

import { Button } from "@/design-system/atoms"

interface HeaderProps {
}

export default () => {
  const router = useRouter()
  const { status } = useSession()

  const _renderLogOutBtn = () => { 
    if (status === "authenticated") {
      return (
        <Button 
          id="logout-btn"
          onClick={() => signOut()}
          label="Log Out"
        />
      )
    }
  }

  return (
    <header className="w-full h-[70px] border-b-4 border-primaryPink">
      <div className="flex items-center justify-between px-5 py-3 h-full">
        <span className="block xl:hidden">
          <Menu width="1.5rem" height="1.5rem" fill="#EA9E8D" cursor="pointer" />
        </span>
        <span onClick={() => router.push('/')} className="cursor-pointer font-bold text-smothWhite hidden xl:block" >
          <Van width="90px" height="90px" fill='#EA9E8D' />
        </span>

        <span className="p-1">
          {_renderLogOutBtn()}
        </span>
      </div>
    </header>
  );
};
