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
  trackedVesselIDs: number[]
}

export type MapActions = {
  decrementCount: () => void
  incrementCount: () => void
  setViewState: (viewState: MapViewState) => void
  setZoom: (zoom: number) => void
  setLatestPositions: (latestPositions: VesselPosition[]) => void
  setActivePosition: (activePosition: VesselPosition | null) => void
  addTrackedVesselID: (vesselID: number) => void
  removeTrackedVesselID: (vesselID: number) => void
  clearLatestPositions: () => void
  cleartrackedVesselIDs: () => void
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
  trackedVesselIDs: [],
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
    addTrackedVesselID: (vesselID: number) => {
      set((state) => ({
        ...state,
        trackedVesselIDs: [...state.trackedVesselIDs, vesselID],
      }))
    },
    removeTrackedVesselID: (vesselID: number) => {
      set((state) => ({
        ...state,
        trackedVesselIDs: state.trackedVesselIDs.filter(
          (id) => id !== vesselID
        ),
      }))
    },
    clearLatestPositions: () => {
      set((state) => ({
        ...state,
        latestPositions: [],
      }))
    },
    cleartrackedVesselIDs: () => {
      set((state) => ({
        ...state,
        trackedVesselIDs: [],
      }))
    },
  }))
}
