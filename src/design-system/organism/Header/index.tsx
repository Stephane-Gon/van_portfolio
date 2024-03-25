"use client"

import { useSession, signOut } from "next-auth/react"
// Icons & Components
import { Menu } from "@/design-system/icons"
import { VanLogo } from "@/design-system/molecules"
import { Button } from "@/design-system/atoms"
// Hokks
import { useAppStore } from "@/store/useApp"

export default () => {
  const { status } = useSession()
  const toggleMobileMenu = useAppStore(state => state.toggleMobileMenu)

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
          <Menu width="1.5rem" height="1.5rem" fill="#EA9E8D" cursor="pointer" onClick={() => toggleMobileMenu()} />
        </span>
        <span className="hidden xl:block">
          <VanLogo />
        </span>

        <span className="p-1">
          {_renderLogOutBtn()}
        </span>
      </div>
    </header>
  );
};
