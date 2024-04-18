import React from "react"
import {
  Compass,
  Filter,
  Layers,
  MapPin,
  Minus,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react"

import IconButton from "@/components/ui/icon-button"

const MapControls = () => {
  return (
    <div className="absolute right-0 top-0 m-8 flex flex-col items-center space-y-5">
      <IconButton description="Compass">
        <Plus className="size-5 text-black dark:text-white" />
      </IconButton>
      <IconButton description="Pin">
        <Minus className="size-5 text-black dark:text-white" />
      </IconButton>
      <IconButton description="Search">
        <SlidersHorizontal className="size-5 text-black dark:text-white" />
      </IconButton>
      <IconButton description="Settings">
        <Layers className="size-5 text-black dark:text-white" />
      </IconButton>
    </div>
  )
}

export default MapControls
