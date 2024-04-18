"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GeoJsonLayer } from "@deck.gl/layers"
import DeckGL from "@deck.gl/react"
import { MapViewState } from "deck.gl"
import type { Feature, Geometry } from "geojson"
import { useTheme } from "next-themes"
import Map, { AttributionControl } from "react-map-gl/maplibre"

import { useMapStore } from "@/components/providers/map-store-provider"

type PropertiesType = {
  index: number
  mmsi: number
  ship_name: string
  timestamp_start: string
  speed_at_start: number
  heading?: number
  long: number
  lat: number
  timestamp_end: string
  speed_at_end: number
  in_amp_zone: boolean
  last_vessel_segment: boolean
  dist: number
  duration: number
  average_speed?: number
}

type ExamplePropertiesType = {
  name: string
  color: string
}

const vesselTrailsLayer = new GeoJsonLayer<PropertiesType>({
  id: "GeoJsonLayer2",
  data: `${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_DOMAIN}/geometries/vessels_segments.geo.json`,
  // data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json",
  getFillColor: [160, 160, 180, 200],
  getLineColor: [135, 24, 245, 200],
  pickable: true,
  stroked: false,
  filled: true,
  getText: (f: Feature<Geometry, PropertiesType>) => f.properties.ship_name,
  getLineWidth: 1,
  lineWidthMinPixels: 0.5,
  lineWidthMaxPixels: 3,
  lineWidthUnits: "pixels",
  lineWidthScale: 2,
  getPointRadius: 4,
  getTextSize: 12,
})

export default function CoreMap() {
  const { setTheme, theme } = useTheme()
  useEffect(() => {
    setTheme("light")
  }, [setTheme])

  const { viewState, setViewState } = useMapStore((state) => state)

  const layers = [vesselTrailsLayer]
  return (
    <DeckGL
      viewState={viewState}
      controller={true}
      layers={layers}
      onViewStateChange={(e) => setViewState(e.viewState as MapViewState)}
    >
      <Map
        mapStyle={`https://api.maptiler.com/maps/25f8f6d1-4c43-47ad-826a-14b40a83286f/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_TO}`}
        attributionControl={false}
      >
        {/* <AttributionControl
          style={{
            position: "fixed",
            bottom: "100%",
            width: "100%",
            zIndex: 20,
            color: "black",
          }}
          position="bottom-right"
        /> */}
      </Map>
    </DeckGL>
  )
}
