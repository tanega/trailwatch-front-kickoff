"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GeoJsonLayer } from "@deck.gl/layers"
import DeckGL from "@deck.gl/react"
import type { Feature, Geometry } from "geojson"
import { useTheme } from "next-themes"
import Map, { AttributionControl } from "react-map-gl/maplibre"

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 3.788086,
  latitude: 47.840291,
  zoom: 5,
  // longitude: -122.4,
  // latitude: 37.74,
  // zoom: 11,
  pitch: 0,
  bearing: 0,
}

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
  data: "http://localhost:3000/geometries/vessels_segments.geo.json",
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
  const router = useRouter()
  console.log(router)
  // const { lat, lng, zoom } = router.query
  // console.log(lat, lng, zoom)
  // Default viewport settings
  // const [viewport, setViewport] = useState({
  //   latitude: parseFloat(lat as string) || 37.7751,
  //   longitude: parseFloat(lng as string) || -122.4193,
  //   zoom: parseFloat(zoom as string) || 10,
  //   bearing: 0,
  //   pitch: 0,
  // })

  // Update viewport when URL parameters change
  // useEffect(() => {
  //   setViewport((v) => ({
  //     ...v,
  //     latitude: parseFloat(lat) || v.latitude,
  //     longitude: parseFloat(lng) || v.longitude,
  //     zoom: parseFloat(zoom) || v.zoom,
  //   }))
  // }, [lat, lng, zoom])

  const layers = [vesselTrailsLayer]
  console.log(layers)
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        mapStyle="https://api.maptiler.com/maps/25f8f6d1-4c43-47ad-826a-14b40a83286f/style.json?key=DUka2d6KQoT6g8rx4RnS"
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
