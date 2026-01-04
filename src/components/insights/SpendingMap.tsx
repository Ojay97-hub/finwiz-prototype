'use client';

import { useEffect, useState, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ShoppingBag, Coffee, Beer, UtensilsCrossed } from 'lucide-react';

const iconMapping: { [key: string]: React.ElementType } = {
  'shopping-bag': ShoppingBag,
  'coffee': Coffee,
  'beer': Beer,
  'burger': UtensilsCrossed,
};

// Mock locations around Central London matching Figma design
const markersData = [
  { id: 1, pos: [51.515, -0.134] as [number, number], icon: 'burger', color: '#2F04B0' },
  { id: 2, pos: [51.512, -0.125] as [number, number], icon: 'coffee', color: '#2F04B0' },
  { id: 3, pos: [51.509, -0.120] as [number, number], icon: 'shopping-bag', color: '#2F04B0' },
  { id: 4, pos: [51.506, -0.115] as [number, number], icon: 'beer', color: '#2F04B0' },
];

export default function SpendingMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Clean up existing map instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create the map
      const map = L.default.map(mapContainerRef.current!, {
        center: [51.510, -0.120],
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add tile layer
      L.default.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      // Add markers
      markersData.forEach((markerData) => {
        const IconComponent = iconMapping[markerData.icon] || ShoppingBag;

        const iconHtml = renderToStaticMarkup(
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'white' }}>
            <IconComponent size={18} strokeWidth={2.5} />
          </div>
        );

        const customIcon = L.default.divIcon({
          html: `
            <div style="width: 36px; height: 36px; background-color: ${markerData.color}; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 2px solid white;">
              ${iconHtml}
            </div>
          `,
          className: '',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        L.default.marker(markerData.pos, { icon: customIcon }).addTo(map);
      });

      // Invalidate size after a short delay to ensure container is properly sized
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center min-h-[400px]">
        <span className="text-slate-400">Loading Map...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 relative">
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ minHeight: '400px', height: '100%' }}
      />
    </div>
  );
}
