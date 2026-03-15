import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { getMineralConfig } from '../shared/MineralIcon';
import StatusBadge from '../shared/StatusBadge';
import { Eye, MapPin, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

function safeParse(str) {
  if (!str) return null;
  if (typeof str === 'object') return str;
  try { return JSON.parse(str); } catch { return null; }
}

function extractCoordinates(report) {
  const roiData = safeParse(report.roi_data);
  if (!roiData) return null;

  if (roiData.lat && roiData.lon) {
    return { lat: parseFloat(roiData.lat), lon: parseFloat(roiData.lon) };
  }
  
  if (roiData.north && roiData.south && roiData.east && roiData.west) {
    const lat = (parseFloat(roiData.north) + parseFloat(roiData.south)) / 2;
    const lon = (parseFloat(roiData.east) + parseFloat(roiData.west)) / 2;
    return { lat, lon };
  }

  return null;
}

function MapController({ bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
    }
  }, [bounds, map]);

  return null;
}

function createMineralIcon(mineral, isZone = false) {
  const config = getMineralConfig(mineral);
  const size = isZone ? 10 : 16;
  
  return divIcon({
    className: 'custom-mineral-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${config.color};
        border: 2px solid ${isZone ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)'};
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        ${isZone ? `opacity: 0.7;` : ''}
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function InteractiveMap({ reports }) {
  const [mapData, setMapData] = useState({ centers: [], zones: [], bounds: [] });

  useEffect(() => {
    const centers = [];
    const zones = [];
    const bounds = [];

    reports.forEach((report) => {
      const coords = extractCoordinates(report);
      if (coords && !isNaN(coords.lat) && !isNaN(coords.lon)) {
        centers.push({ ...coords, report });
        bounds.push([coords.lat, coords.lon]);

        // Extract top zones if available
        if (report.status === 'completed' && report.top_zones) {
          const topZones = safeParse(report.top_zones);
          if (topZones && Array.isArray(topZones)) {
            topZones.forEach((zone) => {
              if (zone.lat && zone.lon && !isNaN(zone.lat) && !isNaN(zone.lon)) {
                zones.push({ ...zone, report });
                bounds.push([zone.lat, zone.lon]);
              }
            });
          }
        }
      }
    });

    setMapData({ centers, zones, bounds });
  }, [reports]);

  const defaultCenter = mapData.bounds.length > 0 
    ? [mapData.bounds[0][0], mapData.bounds[0][1]]
    : [-6.0, -50.0]; // Default to Carajás region

  if (reports.length === 0) {
    return (
      <div className="rounded-xl border border-[#2a2a2a] p-12 text-center" style={{ backgroundColor: '#141414' }}>
        <MapPin className="w-12 h-12 text-[#888] mx-auto mb-3" />
        <p className="text-sm text-[#888]">No geographic data available</p>
        <p className="text-xs text-[#666] mt-1">Generate reports with ROI data to visualize on map</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#2a2a2a] overflow-hidden" style={{ backgroundColor: '#141414' }}>
      <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#d4a853]" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Intelligence Map</h3>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#d4a853]" />
            <span className="text-[#888]">Reports ({mapData.centers.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white opacity-70" />
            <span className="text-[#888]">Top Zones ({mapData.zones.length})</span>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] bg-[#0a0a0a]">
        <MapContainer
          center={defaultCenter}
          zoom={6}
          style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <MapController bounds={mapData.bounds} />

          {/* Report Centers */}
          {mapData.centers.map((item, idx) => {
            const config = getMineralConfig(item.report.mineral);
            return (
              <React.Fragment key={`center-${idx}`}>
                <Marker
                  position={[item.lat, item.lon]}
                  icon={createMineralIcon(item.report.mineral)}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px]" style={{ fontFamily: 'Montserrat' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="text-xs font-semibold text-black uppercase tracking-wider">
                          {config.label}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm mb-2 text-black">{item.report.title}</h4>
                      <div className="mb-2">
                        <StatusBadge status={item.report.status} />
                      </div>
                      {item.report.mineral_score && (
                        <p className="text-xs text-gray-600 mb-2">
                          Score: <span className="font-semibold" style={{ color: config.color }}>
                            {item.report.mineral_score.toFixed(1)}
                          </span>
                        </p>
                      )}
                      <Link 
                        to={`/ReportView?id=${item.report.id}`}
                        className="text-xs font-medium hover:underline flex items-center gap-1 mt-2"
                        style={{ color: config.color }}
                      >
                        <Eye className="w-3 h-3" /> View Report
                      </Link>
                    </div>
                  </Popup>
                </Marker>

                {/* ROI Circle for visualization */}
                <Circle
                  center={[item.lat, item.lon]}
                  radius={20000} // 20km radius
                  pathOptions={{
                    color: config.color,
                    fillColor: config.color,
                    fillOpacity: 0.08,
                    weight: 1,
                  }}
                />
              </React.Fragment>
            );
          })}

          {/* Top Zones */}
          {mapData.zones.map((zone, idx) => {
            const config = getMineralConfig(zone.report.mineral);
            return (
              <React.Fragment key={`zone-${idx}`}>
                <Marker
                  position={[zone.lat, zone.lon]}
                  icon={createMineralIcon(zone.report.mineral, true)}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[180px]" style={{ fontFamily: 'Montserrat' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-3 h-3" style={{ color: config.color }} />
                        <span className="text-xs font-semibold text-black uppercase tracking-wider">
                          Top Zone
                        </span>
                      </div>
                      <h4 className="font-bold text-sm mb-1 text-black">{zone.name}</h4>
                      <p className="text-xs text-gray-600 mb-1">
                        Score: <span className="font-bold" style={{ color: config.color }}>
                          {zone.score?.toFixed(1)}
                        </span>
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        Area: {zone.area_km2?.toFixed(0)} km²
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {zone.lat.toFixed(4)}, {zone.lon.toFixed(4)}
                      </p>
                      <Link 
                        to={`/ReportView?id=${zone.report.id}`}
                        className="text-xs font-medium hover:underline flex items-center gap-1 mt-2"
                        style={{ color: config.color }}
                      >
                        <Eye className="w-3 h-3" /> View Report
                      </Link>
                    </div>
                  </Popup>
                </Marker>

                {/* Zone Circle */}
                <Circle
                  center={[zone.lat, zone.lon]}
                  radius={Math.sqrt(zone.area_km2 || 50) * 1000} // Radius based on area
                  pathOptions={{
                    color: config.color,
                    fillColor: config.color,
                    fillOpacity: 0.15,
                    weight: 1.5,
                    dashArray: '4, 4',
                  }}
                />
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="p-4 border-t border-[#2a2a2a] flex flex-wrap gap-3 text-xs">
        {['gold', 'copper', 'iron', 'diamond', 'bauxite'].map((mineral) => {
          const config = getMineralConfig(mineral);
          const count = mapData.centers.filter(c => c.report.mineral === mineral).length;
          if (count === 0) return null;
          
          return (
            <div key={mineral} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full border border-white/40"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-[#888]">{config.label} ({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}