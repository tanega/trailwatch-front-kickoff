"use client"

import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useState } from "react"
import type { PickingInfo } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
import { SimpleMeshLayer } from "@deck.gl/mesh-layers"
import DeckGL from "@deck.gl/react"
import { OBJLoader } from "@loaders.gl/obj"
import { FlyToInterpolator, MapViewState, ScatterplotLayer } from "deck.gl"
import { useTheme } from "next-themes"
import { renderToString } from "react-dom/server"
import Map, { AttributionControl, Popup } from "react-map-gl/maplibre"

import NavigationLink from "@/components/ui/navigation-link"
import MapTooltip from "@/components/ui/tooltip-map-template"
import { useMapStore } from "@/components/providers/map-store-provider"

const MESH_URL_LOCAL = `${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_DOMAIN}/data/mesh/boat.obj`
const MESH_URL_REMOTE =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj"

export type VesselVoyageTracksPropertiesType = {
  vessel_ais_class: string
  vessel_flag: string
  vessel_name: string
  vessel_callsign: string
  vessel_ship_type?: string
  vessel_sub_ship_type?: string
  vessel_mmsi: number
  vessel_imo: number
  vessel_width: number
  vessel_length: number
  voyage_destination?: string
  voyage_draught?: number
  voyage_eta: string
}

export type VesselPositions = VesselPosition[]

export interface VesselPosition {
  vessel_flag: string
  vessel_name: string
  vessel_callsign: string
  vessel_ship_type?: string
  vessel_mmsi: number
  vessel_imo: number
  vessel_width: number
  vessel_length: number
  position_accuracy: string
  position_collection_type: string
  position_course: number
  position_heading?: number
  position_latitude: number
  position_longitude: number
  position_navigational_status: string
  position_speed: number
  position_timestamp: string
  voyage_destination?: string
  voyage_draught?: number
}

type BartStation = {
  name: string
  entries: number
  exits: number
  coordinates: [longitude: number, latitude: number]
}

export default function CoreMap() {
  const { setTheme, theme } = useTheme()

  const { viewState, setViewState, activePosition, setActivePosition } =
    useMapStore((state) => state)

  // Use a piece of state that changes when `activePosition` changes to force re-render
  const [layerKey, setLayerKey] = useState(0)

  useEffect(() => {
    // This will change the key of the layer, forcing it to re-render when `activePosition` changes
    setLayerKey((prevKey) => prevKey + 1)
  }, [activePosition])

  const latestPositions = new ScatterplotLayer<VesselPosition>({
    id: `vessels-latest-positions-${layerKey}`,
    data: `${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_DOMAIN}/data/geometries/vessels_latest_positions.json`,
    getPosition: (d: VesselPosition) => [
      d.position_longitude,
      d.position_latitude,
    ],
    // data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",
    // getPosition: (d: BartStation) => d.coordinates,
    stroked: true,
    radiusUnits: "meters",
    getRadius: (d: VesselPosition) => d.vessel_length,
    radiusMinPixels: 3,
    radiusMaxPixels: 25,
    radiusScale: 200,
    getFillColor: (d: VesselPosition) => {
      return d.vessel_mmsi === activePosition?.vessel_mmsi
        ? [128, 16, 189, 210]
        : [16, 181, 16, 210]
    },
    getLineColor: [0, 0, 0],
    getLineWidth: 3,
    pickable: true,
    onClick: ({ object }) => {
      setActivePosition(object as VesselPosition)
      setViewState({
        ...viewState,
        longitude: object.position_longitude,
        latitude: object.position_latitude,
        zoom: 7,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: "auto",
      })
    },
  })

  const tracksByVesselAndVoyage =
    new GeoJsonLayer<VesselVoyageTracksPropertiesType>({
      id: "tracks_by_vessel_and_voyage",
      data: `${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_DOMAIN}/data/geometries/all_tracks_by_vessel_and_voyage.geo.json`,
      getFillColor: [160, 160, 180, 200],
      getLineColor: [135, 24, 245, 200],
      pickable: true,
      stroked: false,
      filled: true,
      getLineWidth: 1,
      lineWidthMinPixels: 0.5,
      lineWidthMaxPixels: 3,
      lineWidthUnits: "pixels",
      lineWidthScale: 2,
      getPointRadius: 4,
      getTextSize: 12,
    })

  const mesh_layer = new SimpleMeshLayer({
    id: "vessels-latest-positions-mesh",
    // data: `${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.NEXT_PUBLIC_DOMAIN}/geometries/latest_positions.json`,
    mesh: MESH_URL_LOCAL,
    // getPosition:  (d: Vessel) => [d.lng, d.lat, d.alt],
    // getPosition: (d) => [
    //   d.position_longitude ? d.position_longitude : 0,
    //   d.position_latitude ? d.position_latitude : 0,
    //   0,
    // ],
    // getColor: [255, 255, 255],
    // getOrientation: (d) => d.position_heading,
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",

    getColor: (d: BartStation) => [Math.sqrt(d.exits), 140, 0],
    getOrientation: (d: BartStation) => [0, Math.random() * 180, 0],
    getPosition: (d: BartStation) => d.coordinates,
    // mesh: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj",
    sizeScale: 30,
    pickable: true,
    loaders: [OBJLoader],
  })

  const layers = [tracksByVesselAndVoyage, mesh_layer, latestPositions]

  useEffect(() => {
    setTheme("light")
  }, [setTheme])

  return (
    <DeckGL
      viewState={viewState}
      controller={true}
      layers={layers}
      onViewStateChange={(e) => setViewState(e.viewState as MapViewState)}
      getTooltip={({ object }: PickingInfo<VesselPosition>) =>
        object
          ? {
              // html: `<h2 class="text-3xl">Message:</h2> <div>${object.vessel_name}</div>`,
              html: renderToString(<MapTooltip vesselInfo={object} />),
              style: {
                backgroundColor: "#fff",
                fontSize: "0.8em",
                borderRadius: "10px",
                overflow: "hidden",
                padding: "0px",
              },
            }
          : null
      }
    >
      <Map
        mapStyle={`https://api.maptiler.com/maps/bb513c96-848e-4775-b150-437395193f26/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_TO}`}
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
