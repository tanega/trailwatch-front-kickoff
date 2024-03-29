import React from "react"
import Link from "next/link"
import { LucideProps } from "lucide-react"

interface MenuIconProps {
  onClick: () => void
  children: React.ReactNode
}

export default function MenuIcon({ onClick, children }: MenuIconProps) {
  return <div onClick={onClick}>{children}</div>
}
