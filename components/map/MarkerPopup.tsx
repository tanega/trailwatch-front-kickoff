
'use client';

import { VesselDetails } from "@/types/vessel";
import Image from "next/image";
import VesselPreviewIcon from "@/public/vessel-preview.png";
import Button from "@/components/ui/button";

type Props = {
  data: VesselDetails | undefined;
}

export default function MarkerPopup({ data }: Props) {
  if (!data) {
    return <></>;
  }
  
  const { mmsi, name, size, type, positionUpdatedAt } = data;
  const onSelectVessel = () => {
    // TODO: add selected vessel to selected vessels list (local/session storage) 
  }

  return (
    <div className="w-wrap text-xxxs rounded bg-color-3">
      <div className="absolute top-0 right-0 m-2">
        <Button title="+" className="px-1.5 text-black text-xl" onClick={onSelectVessel}  />
      </div>
      <Image
        src={VesselPreviewIcon}
        alt="Vessel preview"
        height={80}
      />
      <div className="px-2 py-3">
        <div className="text-white font-semibold text-sm mb-1">{name}</div>
        <div className="text-color-4 text-xxxs mb-1">MMSI: {mmsi}</div>
        <div className="text-color-4 text-xxxs mb-1">Vessel Type: {type}</div>
        <div className="text-color-4 text-xxxs mb-3">Vessel Size: {size}m</div>
        <div className="inline text-color-4">
          <div>Last position date:</div>
          <div>{positionUpdatedAt.toUTCString()}</div>
        </div>
      </div>
    </div>
  );
}
