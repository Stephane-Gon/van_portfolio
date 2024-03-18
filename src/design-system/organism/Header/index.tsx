"use client"

import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/design-system/atoms"

interface HeaderProps {
}

export default () => {
  const router = useRouter()
  const { data, status } = useSession()

  const _renderLogOutBtn = () => { 
    if (status !== "authenticated") {
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
    <header className="w-full p-3 bg-smothWhite">
      <div className="flex items-center justify-between">
        <span onClick={() => router.push('/')} className="cursor-pointer p-1 font-bold" >
          {/* TODO - Alterar por um logo decente */}
          VAN LOGO
        </span>

        <span className="p-1">
          {_renderLogOutBtn()}
        </span>
      </div>
    </header>
  );
};
