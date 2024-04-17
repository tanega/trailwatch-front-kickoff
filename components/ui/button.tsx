"use client"

import * as React from "react"
import Image from "next/image"
import ArrowIcon from "@/public/right-arrow.svg"

type Props = {
  title: string
  withArrowIcon?: boolean
  onClick: () => void
  className?: string
}

export default function Button({
  title,
  withArrowIcon,
  onClick,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className + " flex items-center rounded bg-color-1 text-xxs"}
    >
      {title}

      {!!withArrowIcon && (
        <Image
          className="ml-2"
          src={ArrowIcon}
          alt="arrow icon"
          height={8}
          width={8}
        />
      )}
    </button>
  )
}
