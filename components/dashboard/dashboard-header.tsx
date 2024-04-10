"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import MapIcon from "@/public/map-icon.svg"
import TrawlWatchLogo from "@/public/trawlwatch.svg"

export default function DashboardHeader() {
  const router = useRouter()

  const onClickMapView = () => {
    router.push("/map")
  }

  return (
    <div className="flex pt-5 w-full">
      <div className="w-full">
        <Image
          src={TrawlWatchLogo}
          alt="Trawlwatch logo"
          height={80}
          width={80}
        />
      </div>

      <button
        className="flex items-center hover:cursor-pointer"
        onClick={onClickMapView}
      >
        <Image src={MapIcon} alt="Map view" height={30} width={30} />
        <div className="inline mr-5 ml-2 font-bold text-color-1">
          Map&nbsp;view
        </div>
      </button>
    </div>
  )
}
