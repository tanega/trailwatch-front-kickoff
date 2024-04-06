'use client';

import * as React from "react"
import ArrowIcon from "@/public/right-arrow.svg";
import Image from "next/image";

type Props = {
  title: string;
  withArrowIcon?: boolean;
  onClick?: () => void;
}


export default function Button({ title, withArrowIcon, onClick }: Props) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center h-3/4 bg-color-1 text-xxs pl-2 pr-4 rounded"
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
    );
  }
