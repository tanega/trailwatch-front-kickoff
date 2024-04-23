import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import IconButton from "@/components/ui/icon-button"
import { VesselPosition } from "@/components/core/map/main-map"
import { useMapStore } from "@/components/providers/map-store-provider"

export interface PreviewCardTypes {
  vesselInfo: VesselPosition
}

const PreviewCard: React.FC<PreviewCardTypes> = ({ vesselInfo }) => {
  const {
    setActivePosition,
    addTrackedVesselMMSI,
    trackedVesselMMSIs,
    removeTrackedVesselMMSI,
  } = useMapStore((state) => state)
  const {
    vessel_name: name,
    vessel_imo: imo,
    vessel_mmsi: mmsi,
    vessel_length: size,
    position_timestamp,
  } = vesselInfo

  const isVesselTracked = (mmsi: number) => {
    return trackedVesselMMSIs.includes(mmsi)
  }

  // useEffect(() => {
  //   console.log("trackedVesselMMSIs", trackedVesselMMSIs)
  // }, [trackedVesselMMSIs])

  const handleDisplayTrail = (vessel_mmsi: number) => {
    isVesselTracked(vessel_mmsi)
      ? removeTrackedVesselMMSI(vessel_mmsi)
      : addTrackedVesselMMSI(vessel_mmsi)
  }
  return (
    <div className="flex min-w-[650px] flex-col items-center rounded-t-lg bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row">
      <img
        className="h-[350px] w-[225px] overflow-hidden rounded-tl-lg object-cover"
        src="/img/scrombus.jpg"
        alt="default fishing vessel image"
      />

      <div className="flex grow flex-col justify-between p-4 leading-normal">
        <div className="flex flex-row justify-end">
          <IconButton
            description="Close preview"
            onClick={() => setActivePosition(null)}
          >
            <XIcon className="size-5 text-black dark:text-white" />
          </IconButton>
        </div>
        <div className="flex w-full flex-row items-center justify-start gap-3">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <Image
            src="/flags/fr.svg"
            alt="country flag"
            width={24}
            height={18}
          />
        </div>
        <section id="vessel-details" className="mb-4">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            IMO {imo} / MMSI {mmsi}
          </p>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Vessel type</span> Fishing Vessel
          </p>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Vessel size:</span> {size} meters
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Last position timestamp:</span>
          </p>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {position_timestamp}
          </p>
        </section>
        <section id="vessel-actions">
          <Button onClick={() => handleDisplayTrail(mmsi)}>
            {isVesselTracked(mmsi) ? "Hide" : "Display"} trail
          </Button>
          {isVesselTracked(mmsi) && <Link href="#">Show trail details</Link>}
        </section>
      </div>
    </div>
  )
}

export default PreviewCard
