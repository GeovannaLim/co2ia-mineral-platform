import React from 'react';
import { Gem, CircleDot, Mountain, Diamond, Layers } from 'lucide-react';

const mineralConfig = {
  gold: { icon: CircleDot, color: '#d4a853', label: 'Gold', bg: 'rgba(212,168,83,0.1)' },
  copper: { icon: Layers, color: '#a0714f', label: 'Copper', bg: 'rgba(160,113,79,0.1)' },
  iron: { icon: Mountain, color: '#4a9eff', label: 'Iron', bg: 'rgba(74,158,255,0.1)' },
  diamond: { icon: Diamond, color: '#ffffff', label: 'Diamond', bg: 'rgba(255,255,255,0.08)' },
  bauxite: { icon: Gem, color: '#34d399', label: 'Bauxite', bg: 'rgba(52,211,153,0.1)' },
};

export function getMineralConfig(mineral) {
  return mineralConfig[mineral] || mineralConfig.gold;
}

export default function MineralIcon({ mineral, size = 'md' }) {
  const config = getMineralConfig(mineral);
  const Icon = config.icon;
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-7 h-7' };

  return (
    <div
      className={`${sizes[size]} rounded-xl flex items-center justify-center`}
      style={{ backgroundColor: config.bg }}
    >
      <Icon className={iconSizes[size]} style={{ color: config.color }} />
    </div>
  );
}