import { create } from 'zustand';
import type { GameState } from './types';
import { createMapSlice } from './slices/mapSlice';
import { createHQSlice } from './slices/hqSlice';
import { createCallSlice } from './slices/callSlice';

export const useGameStore = create<GameState>()((...args) => ({
  ...createMapSlice(...args),
  ...createHQSlice(...args),
  ...createCallSlice(...args),
})); 