import { create } from 'zustand';
import type { Map } from 'maplibre-gl';

interface GameState {
  map: Map | null;
  setMap: (map: Map) => void;
  pendingHQ: { lng: number; lat: number } | null;
  setPendingHQ: (coords: { lng: number; lat: number } | null) => void;
  hq: { lng: number; lat: number } | null;
  setHQ: (coords: { lng: number; lat: number } | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  pendingHQ: null,
  setPendingHQ: (coords) => set({ pendingHQ: coords }),
  hq: null,
  setHQ: (coords) => set({ hq: coords }),
})); 