import { VesselPosition } from "@/types/vessel"
import { MapViewState } from "@deck.gl/core"
import { createStore } from "zustand/vanilla"

export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
  pitch?: number
  bearing?: number
  transitionDuration?: number
  transitionInterpolator?: any
}

export type MapState = {
  count: number
  viewState: MapViewState
  latestPositions: VesselPosition[]
  activePosition: VesselPosition | null
  trackedVesselMMSIs: number[]
}

export type MapActions = {
  decrementCount: () => void
  incrementCount: () => void
  setViewState: (viewState: MapViewState) => void
  setZoom: (zoom: number) => void
  setLatestPositions: (latestPositions: VesselPosition[]) => void
  setActivePosition: (activePosition: VesselPosition | null) => void
  addTrackedVesselMMSI: (vesselMMSI: number) => void
  removeTrackedVesselMMSI: (vesselMMSI: number) => void
  clearLatestPositions: () => void
  clearTrackedVesselMMSIs: () => void
}

export type MapStore = MapState & MapActions

export const defaultInitState: MapState = {
  count: 0,
  viewState: {
    longitude: 3.788086,
    latitude: 47.840291,
    zoom: 5,
    // longitude: -122.4,
    // latitude: 37.74,
    // zoom: 11,
    pitch: 20,
    bearing: 0,
  },
  latestPositions: [],
  activePosition: null,
  trackedVesselMMSIs: [],
}

export const createMapStore = (initState: MapState = defaultInitState) => {
  return createStore<MapStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    setViewState: (viewState?: MapViewState) => {
      set((state) => ({
        ...state,
        viewState,
      }))
    },
    setZoom: (zoom: number) => {
      set((state) => ({
        ...state,
        viewState: { ...state.viewState, zoom },
      }))
    },
    setLatestPositions: (latestPositions: VesselPosition[]) => {
      set((state) => ({
        ...state,
        latestPositions,
      }))
    },
    setActivePosition: (activePosition: VesselPosition | null) => {
      set((state) => ({
        ...state,
        activePosition,
      }))
    },
    addTrackedVesselMMSI: (vesselMMSI: number) => {
      set((state) => ({
        ...state,
        trackedVesselMMSIs: [...state.trackedVesselMMSIs, vesselMMSI],
      }))
    },
    removeTrackedVesselMMSI: (vesselMMSI: number) => {
      set((state) => ({
        ...state,
        trackedVesselMMSIs: state.trackedVesselMMSIs.filter(
          (mmsi) => mmsi !== vesselMMSI
        ),
      }))
    },
    clearLatestPositions: () => {
      set((state) => ({
        ...state,
        latestPositions: [],
      }))
    },
    clearTrackedVesselMMSIs: () => {
      set((state) => ({
        ...state,
        trackedVesselMMSIs: [],
      }))
    },
  }))
}
