import type { Map } from 'maplibre-gl';
import type { StateCreator } from 'zustand';
import type { GameState } from '../types';

export interface MapSlice {
  map: Map | null;
  setMap: (map: Map) => void;
}

export const createMapSlice: StateCreator<GameState, [], [], MapSlice> = (set) => ({
  map: null,
  setMap: (map) => set({ map }),
}); 