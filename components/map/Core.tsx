"use client"
import { LineLayer } from "@deck.gl/layers"
import DeckGL from "@deck.gl/react"
import Map from 'react-map-gl/maplibre';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 3.788086,
  latitude: 47.840291,
  zoom: 5,
  pitch: 0,
  bearing: 0,
}

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [12.788086, 37.7853],
    targetPosition: [12.788086, 37.781],
  },
]

export default function CoreMap() {
  const layers = [new LineLayer({ id: "line-layer", data })]

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map mapStyle="https://api.maptiler.com/maps/25f8f6d1-4c43-47ad-826a-14b40a83286f/style.json?key=DUka2d6KQoT6g8rx4RnS" />
    </DeckGL>
  )
}
