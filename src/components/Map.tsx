import { useEffect, useRef, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useGameStore } from '../store/gameStore';
import debounce from 'lodash/debounce';
import { createLngLat } from '../store/types';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
console.log('MapTiler API Key:', MAPTILER_API_KEY); // Pour le débogage

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { setMap } = useGameStore();

  const handleMapClick = useCallback(
    (e: maplibregl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      if (mapRef.current) {
        markerRef.current = new maplibregl.Marker({
          color: '#FF0000',
          draggable: false
        })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);

        useGameStore.getState().setPendingHQ(createLngLat(lng, lat));
      }
    },
    []
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`,
      center: [2.3522, 48.8566], // Paris
      zoom: 13,
      antialias: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('click', handleMapClick);

    const unsubscribe = useGameStore.subscribe(
      (state) => state.pendingHQ,
      (pendingHQ) => {
        if (!pendingHQ && markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
      }
    );

    map.on('load', () => {
      mapContainer.current?.classList.add('map-loaded');
      console.log('Map loaded successfully');
    });

    map.on('error', (e) => {
      console.error('Map error:', e);
    });

    setMap(map);

    return () => {
      unsubscribe();
      if (markerRef.current) markerRef.current.remove();
      if (mapRef.current) mapRef.current.remove();
      mapRef.current = null;
    };
  }, [setMap, handleMapClick]);

  return (
    <div 
      id="map" 
      data-testid="map" 
      className="fixed inset-0 w-full h-full" 
      style={{ position: 'absolute' }}
      ref={mapContainer} 
    />
  );
}; 