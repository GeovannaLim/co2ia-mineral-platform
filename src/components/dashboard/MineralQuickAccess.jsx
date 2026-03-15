import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MineralIcon, { getMineralConfig } from '../shared/MineralIcon';

const minerals = ['gold', 'copper', 'iron', 'diamond', 'bauxite'];

const descriptions = {
  gold: 'Spectral analysis for gold potential zones',
  copper: 'Copper mineralization detection and scoring',
  iron: 'Iron ore deposit identification via remote sensing',
  diamond: 'Kimberlite pipe detection and analysis',
  bauxite: 'Bauxite laterite mapping and assessment',
};

export default function MineralQuickAccess() {
  return (
    <div className="rounded-xl border border-[#2a2a2a]" style={{ backgroundColor: '#141414' }}>
      <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Mineral Modules</h3>
        <Link to="/Minerals" className="text-xs text-[#d4a853] hover:text-[#e4b863] flex items-center gap-1 transition-colors">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 divide-[#2a2a2a]">
        {minerals.map((mineral) => {
          const config = getMineralConfig(mineral);
          return (
            <Link
              key={mineral}
              to={`/GenerateReport?mineral=${mineral}`}
              className="p-5 hover:bg-[#1a1a1a] transition-all group text-center sm:text-left"
            >
              <div className="flex flex-col items-center sm:items-start gap-3">
                <MineralIcon mineral={mineral} size="md" />
                <div>
                  <p className="text-sm font-semibold text-white">{config.label}</p>
                  <p className="text-xs text-[#888] mt-1 line-clamp-2">{descriptions[mineral]}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}