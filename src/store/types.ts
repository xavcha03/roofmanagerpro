import type { Map } from 'maplibre-gl';

// Utilisation d'un symbol pour le brand
const brand = Symbol('LngLat');

export interface LngLat {
  readonly lng: number;
  readonly lat: number;
  readonly _brand: typeof brand;
}

export const createLngLat = (lng: number, lat: number): LngLat => ({
  lng,
  lat,
  _brand: brand,
});

export interface MapSlice {
  map: Map | null;
  setMap: (map: Map) => void;
}

export interface HQSlice {
  pendingHQ: LngLat | null;
  setPendingHQ: (coords: LngLat | null) => void;
  hq: LngLat | null;
  setHQ: (coords: LngLat | null) => void;
}

export interface CallSlice {
  incoming: boolean;
  scheduleNextCall: () => void;
  acceptCall: () => void;
}

export type GameState = MapSlice & HQSlice & CallSlice; 