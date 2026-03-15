import React from 'react';
import { Leaf, Droplets, TreePine, Shield } from 'lucide-react';

export default function EnvironmentalCard({ indicators }) {
  if (!indicators) return null;

  const items = [
    { label: 'NDVI Mean', value: indicators.ndvi_mean?.toFixed(3), icon: Leaf, color: '#34d399' },
    { label: 'Water Proximity', value: `${indicators.water_proximity_km?.toFixed(1)} km`, icon: Droplets, color: '#4a9eff' },
    { label: 'Deforestation Risk', value: indicators.deforestation_risk, icon: TreePine, color: '#eab308' },
    { label: 'Carbon Score', value: indicators.carbon_sequestration_score?.toFixed(1), icon: Shield, color: '#34d399' },
    { label: 'Env. Sensitivity', value: indicators.environmental_sensitivity, icon: Shield, color: '#a0714f' },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#888]">Environmental Indicators</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
              <div className="flex items-center gap-1.5 mb-2">
                <Icon className="w-3 h-3" style={{ color: item.color }} />
                <span className="text-[10px] text-[#888] uppercase tracking-wider">{item.label}</span>
              </div>
              <p className="text-sm font-semibold text-white">{item.value || '—'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}