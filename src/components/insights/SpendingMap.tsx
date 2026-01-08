'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  ShoppingBag,
  Coffee,
  Beer,
  UtensilsCrossed,
  Train,
  Film,
  Receipt,
  ShoppingCart
} from 'lucide-react';
import type * as LType from 'leaflet';

// Extended icon mapping
const iconMapping: { [key: string]: React.ElementType } = {
  'shopping-bag': ShoppingBag,
  'coffee': Coffee,
  'beer': Beer,
  'burger': UtensilsCrossed,
  'train': Train,
  'film': Film,
  'receipt': Receipt,
  'shopping-cart': ShoppingCart,
};

export interface MapMarker {
  id: string;
  pos: [number, number];
  icon: string;
  color: string;
  totalAmount?: number;
  merchantName?: string;
  category?: string;
}

interface SpendingMapProps {
  markers?: MapMarker[];
}

// Default markers for when no data is passed
const defaultMarkers: MapMarker[] = [
  { id: '1', pos: [51.515, -0.134], icon: 'burger', color: '#2F04B0' },
  { id: '2', pos: [51.512, -0.125], icon: 'coffee', color: '#2F04B0' },
  { id: '3', pos: [51.509, -0.120], icon: 'shopping-bag', color: '#2F04B0' },
  { id: '4', pos: [51.506, -0.115], icon: 'beer', color: '#2F04B0' },
];

export default function SpendingMap({ markers }: SpendingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LType.Map | null>(null);
  const markersLayerRef = useRef<LType.LayerGroup | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState<typeof LType | null>(null);

  // Use provided markers or default ones
  const markersData = useMemo(() => markers || defaultMarkers, [markers]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map once
  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;

    const initMap = async () => {
      const leaflet = await import('leaflet');
      // @ts-expect-error - CSS import for side effects
      await import('leaflet/dist/leaflet.css');
      setL(leaflet);

      // Clean up existing map instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create the map
      const map = leaflet.map(mapContainerRef.current!, {
        center: [51.510, -0.120],
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Create a layer group for markers
      markersLayerRef.current = leaflet.layerGroup().addTo(map);

      // Add tile layer
      leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      // Invalidate size after a short delay to ensure container is properly sized
      setTimeout(() => {
        map.invalidateSize();
        setMapReady(true);
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

  // Update markers when data changes or map becomes ready
  useEffect(() => {
    if (!L || !mapInstanceRef.current || !markersLayerRef.current || !mapReady) return;

    // Clear existing markers
    markersLayerRef.current.clearLayers();

    // Add new markers
    markersData.forEach((markerData) => {
      const IconComponent = iconMapping[markerData.icon] || ShoppingBag;

      const iconHtml = renderToStaticMarkup(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'white' }}>
          <IconComponent size={18} strokeWidth={2.5} />
        </div>
      );

      const customIcon = L.divIcon({
        html: `
                    <div style="width: 36px; height: 36px; background-color: ${markerData.color}; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 2px solid white; transition: transform 0.2s, box-shadow 0.2s;" 
                         onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)';"
                         onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.2)';">
                        ${iconHtml}
                    </div>
                `,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker(markerData.pos, { icon: customIcon });

      // Add tooltip with spending info if available
      if (markerData.merchantName && markerData.totalAmount !== undefined) {
        marker.bindTooltip(
          `<div style="font-family: system-ui; padding: 4px 8px;">
                        <strong style="color: #120048;">${markerData.merchantName}</strong><br>
                        <span style="color: ${markerData.color}; font-weight: bold;">£${Math.round(markerData.totalAmount)}</span>
                    </div>`,
          {
            direction: 'top',
            offset: [0, -20],
            className: 'spending-tooltip'
          }
        );
      }

      marker.addTo(markersLayerRef.current!);
    });

    // Fit bounds to show all markers if there are any
    if (markersData.length > 0) {
      const bounds = L.latLngBounds(markersData.map(m => m.pos));
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 14
      });
    }
  }, [markersData, L, mapReady]);

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
      {markersData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center p-6">
            <p className="text-lg font-semibold text-text-muted mb-2">No locations to display</p>
            <p className="text-sm text-text-muted opacity-70">Adjust your filters to see spending locations</p>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-slate-100">
        <p className="text-xs font-semibold text-[#120048] mb-1">
          {markersData.length} location{markersData.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-text-muted">Hover for details</p>
      </div>
    </div>
  );
}
