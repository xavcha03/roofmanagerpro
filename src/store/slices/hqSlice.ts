import type { StateCreator } from 'zustand';
import type { GameState, HQSlice, Coordinates } from '../types';

export const createHQSlice: StateCreator<GameState, [], [], HQSlice> = (set) => ({
  pendingHQ: null,
  setPendingHQ: (coords: Coordinates | null) => set({ pendingHQ: coords }),
  hq: null,
  setHQ: (coords: Coordinates | null) => set({ hq: coords }),
}); 