import type { StateCreator } from 'zustand';
import type { GameState } from '../types';

export interface CallSlice {
  incoming: boolean;
  scheduleNextCall: (testDelay?: number) => void;
  acceptCall: () => void;
}

export const createCallSlice: StateCreator<GameState, [], [], CallSlice> = (set, get) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const scheduleNextCall = (testDelay?: number) => {
    // Nettoyer le timeout existant si présent
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // En mode test, utiliser le délai fourni, sinon un délai aléatoire entre 30 et 90 secondes
    const delay = typeof testDelay === 'number' 
      ? testDelay 
      : Math.floor(Math.random() * (90000 - 30000 + 1) + 30000);
    
    timeoutId = setTimeout(() => {
      set({ incoming: true });
    }, delay);
  };

  return {
    incoming: false,
    scheduleNextCall,
    acceptCall: () => {
      set({ incoming: false });
      scheduleNextCall();
    },
  };
}; 