import Image from 'next/image';

import TrawlWatchLogo from '@/public/trawlwatch.svg';
import MapIcon from '@/public/map-icon.svg';


export default function DashboardHeader() {
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

      <div className="flex inline items-center">
        <Image
          src={MapIcon}
          alt="Map view"
          height={30}
          width={30}
          />
        <div className="inline text-color-1 font-bold ml-2 mr-5">Map&nbsp;view</div>  
      </div>
    </div>
  );
}