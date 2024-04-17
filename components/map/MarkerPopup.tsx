"use client"

import Image from "next/image"
import LocationIcon from "@/public/Location.svg"
import VesselPreviewIcon from "@/public/vessel-preview.png"

import { VesselPositionDetails } from "@/types/vessel"

import Button from "../ui/button"

type Props = {
  data: VesselPositionDetails | undefined
}

export default function MarkerPopup({ data }: Props) {
  if (!data) {
    return <></>
  }

  const { id, label, description, lastSeen, timeInAMP, coordinates } = data
  const onSelectVessel = () => {
    // TODO: add selected vessel to selected vessels list (local/session storage)
  }

  return (
    <div className="w-wrap rounded bg-color-3 text-xxxs">
      <Image src={VesselPreviewIcon} alt="Vessel preview" height={80} />
      <div className="px-2 py-3">
        <div className="mb-1 text-sm font-semibold text-white">{label}</div>
        <div className="mb-3 text-xxxs text-color-4">{description}</div>
        <div className="mb-4 flex border-b-1 border-color-6 pb-1 text-xxs text-color-6">
          <div className="w-full">Time In AMP</div>
          <div className="block">{timeInAMP}H</div>
        </div>
        <div className="flex text-color-4">
          <div className="absolute right-0 top-0 m-2">
            <Button
              title="+"
              className="px-1 text-lg text-black"
              onClick={onSelectVessel}
            />
          </div>
          <Image
            src={LocationIcon}
            alt="Vessel location"
            height={15}
            width={15}
          />
          <div className="ml-2 inline">
            <div>Last seen: {lastSeen.toDateString()}</div>
            <div>{`${coordinates[0]}, ${coordinates[1]}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
