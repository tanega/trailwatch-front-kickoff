'use client';

import Image from 'next/image';
import TrawlWatchLogo from '@/public/trawlwatch.svg';
import MapIcon from '@/public/map-icon.svg';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();

  const onClickMapView = () => {
    router.push("/map");
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

      <button className="flex inline items-center hover:cursor-pointer" onClick={onClickMapView}>
        <Image
          src={MapIcon}
          alt="Map view"
          height={30}
          width={30}
          />
        <div className="inline text-color-1 font-bold ml-2 mr-5">Map&nbsp;view</div>  
      </button>
    </div>
  );
}