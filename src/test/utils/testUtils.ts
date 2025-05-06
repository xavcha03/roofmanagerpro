import { vi } from 'vitest';
import { useGameStore } from '../../store/gameStore';

// Mocks MapLibre
export const mockMap = {
  on: vi.fn(),
  remove: vi.fn(),
  fire: vi.fn(),
};

export const mockMarker = {
  setLngLat: vi.fn().mockReturnThis(),
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
};

// Helper pour réinitialiser le store
export const resetGameStore = () => {
  useGameStore.setState({
    map: null,
    pendingHQ: null,
    hq: null,
  });
};

// Coordonnées de test communes
export const mockCoordinates = {
  lng: 2.3522,
  lat: 48.8566,
};

// Helper pour vérifier les styles Tailwind communs
export const hasCommonButtonStyles = (element: HTMLElement) => {
  return element.classList.contains('text-white') && 
         element.classList.contains('rounded');
}; 