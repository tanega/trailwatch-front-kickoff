"use client"

import React, { useState } from "react"
import Link from "next/link"

import MenuIcon from "@/components/core/menu-icon"
import { Icons } from "@/components/icons"

export interface SidebarProps {}

export default function Sidebar(props: SidebarProps): React.ReactElement {
  const [isActive, setIsActive] = useState(false)
  const [activeElement, setActiveElement] = useState<string | undefined>(
    undefined
  )

  const handleElementSelection = (element: string) => {
    setActiveElement(element)
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-20 h-screen w-16 bg-[#3E4A68]">
        <div className="flex flex-col justify-start items-center h-full p-y-6e">
          <Link target="_blank" rel="noreferrer" href="/">
            <Icons.burger className="my-3 w-6 h-6 text-red-500" />
          </Link>
          <MenuIcon onClick={() => handleElementSelection("eye")}>
            <Icons.eye className="my-3 w-6 h-6" />
          </MenuIcon>
          <MenuIcon onClick={() => handleElementSelection("vessel")}>
            <Icons.vessel className="my-3 w-6 h-6" />
          </MenuIcon>
          <MenuIcon onClick={() => handleElementSelection("map")}>
            <Icons.vessel className="my-3 w-6 h-6" />
          </MenuIcon>
        </div>
      </div>
      {!!activeElement && (
        <div className="fixed left-16 top-0 z-20 h-screen w-[200px] bg-[#1c212c]">
          <span className="text-white">{activeElement}</span>
          <button onClick={() => setActiveElement(undefined)}>close</button>
        </div>
      )}
    </>
  )
}
