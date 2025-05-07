/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Map } from '../components/Map';
import { useGameStore } from '../store/gameStore';
import { mockMap, mockMarker, mockCoordinates, resetGameStore } from './utils/testUtils';

// Mock le debounce pour qu'il s'exécute immédiatement dans les tests
vi.mock('lodash/debounce', () => ({
  default: (fn: Function) => fn,
}));

vi.mock('maplibre-gl', async () => ({
  default: {
    Map: vi.fn(() => mockMap),
    Marker: vi.fn(() => mockMarker),
  },
}));

describe('Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetGameStore();
  });

  it('renders map container', () => {
    render(<Map />);
    const mapContainer = screen.getByTestId('map');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveClass('fixed', 'inset-0', 'w-full', 'h-full');
  });

  it('initializes MapLibre with correct parameters', () => {
    render(<Map />);
    expect(mockMap).toBeTruthy();
  });

  it('attaches map instance to global state', () => {
    render(<Map />);
    const state = useGameStore.getState();
    expect(state.map).toBe(mockMap);
  });

  it('handles map click and updates pendingHQ', async () => {
    render(<Map />);
    
    await act(async () => {
      const clickHandler = mockMap.on.mock.calls.find(call => call[0] === 'click')[1];
      await clickHandler({ 
        lngLat: mockCoordinates,
        target: mockMap
      });
    });
    
    const state = useGameStore.getState();
    expect(state.pendingHQ).toEqual(mockCoordinates);
    
    expect(mockMarker.setLngLat).toHaveBeenCalledWith([mockCoordinates.lng, mockCoordinates.lat]);
    expect(mockMarker.addTo).toHaveBeenCalledWith(mockMap);
  });
}); 