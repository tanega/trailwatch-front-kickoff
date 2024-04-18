import LeftPanel from "@/components/core/left-panel"
import MapControls from "@/components/core/map-controls"
import DemoMap from "@/components/core/map/Core"
import { MapStoreProvider } from "@/components/providers/map-store-provider"

export default function MapPage() {
  return (
    <>
      <LeftPanel />
      <DemoMap />
      <MapControls />
    </>
  )
}
