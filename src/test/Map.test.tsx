/**
 * @vitest-environment jsdom
 */

const mockMap = {
  on: vi.fn(),
  remove: vi.fn(),
  fire: vi.fn(),
};

const mockMarker = {
  setLngLat: vi.fn().mockReturnThis(),
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
};

vi.mock('maplibre-gl', async () => ({
  default: {
    Map: vi.fn(() => mockMap),
    Marker: vi.fn(() => mockMarker),
  },
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Map } from '../components/Map';
import { useGameStore } from '../store/gameStore';

describe('Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.setState({ map: null, pendingHQ: null });
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
    const mockCoords = { lng: 2.3522, lat: 48.8566 };
    render(<Map />);
    
    await act(async () => {
      // Simulate click handler
      const clickHandler = mockMap.on.mock.calls.find(call => call[0] === 'click')[1];
      await clickHandler({ lngLat: mockCoords });
    });
    
    // Verify state update
    const state = useGameStore.getState();
    expect(state.pendingHQ).toEqual(mockCoords);
    
    // Verify marker creation
    expect(mockMarker.setLngLat).toHaveBeenCalledWith([mockCoords.lng, mockCoords.lat]);
    expect(mockMarker.addTo).toHaveBeenCalledWith(mockMap);
  });
}); 