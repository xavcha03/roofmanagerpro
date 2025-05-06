import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useGameStore } from '../store/gameStore';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;
console.log('MapTiler API Key:', MAPTILER_API_KEY); // Pour le débogage

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const { setMap } = useGameStore();

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`,
      center: [2.3522, 48.8566], // Paris
      zoom: 13,
      antialias: true,
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      // Supprimer l'ancien marqueur s'il existe
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      // Créer un nouveau marqueur
      markerRef.current = new maplibregl.Marker({
        color: '#FF0000',
        draggable: false
      })
        .setLngLat([lng, lat])
        .addTo(map);

      useGameStore.getState().setPendingHQ({ lng, lat });
    });

    // Nettoyer le marqueur quand le HQ est confirmé ou annulé
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
      console.log('Map loaded successfully');
    });

    map.on('error', (e) => {
      console.error('Map error:', e);
    });

    setMap(map);

    return () => {
      unsubscribe();
      if (markerRef.current) markerRef.current.remove();
      map.remove();
    };
  }, [setMap]);

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