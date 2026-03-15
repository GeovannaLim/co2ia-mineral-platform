import React from 'react';
import { MapPin } from 'lucide-react';

export default function TopZones({ zones, color }) {
  if (!zones || zones.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#888]">Top Zones</h4>
      <div className="space-y-2">
        {zones.map((zone, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: `${color}20`, color }}
            >
              #{i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{zone.name}</p>
              <p className="text-[10px] text-[#888] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {zone.lat?.toFixed(4)}, {zone.lon?.toFixed(4)} · {zone.area_km2?.toFixed(0)} km²
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold" style={{ color }}>{zone.score?.toFixed(1)}</span>
              <p className="text-[10px] text-[#888]">score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}