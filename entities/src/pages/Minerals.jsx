import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MineralIcon, { getMineralConfig } from '../components/shared/MineralIcon';

const minerals = [
  {
    id: 'gold',
    description: 'Advanced spectral analysis using Sentinel-2 imagery for gold potential zone identification. Calculates mineral indices including ferric iron, clay minerals, and gossanite markers.',
    features: ['Mineral Score Mapping', 'Top Zone Detection', 'Spectral Index Analysis', 'Environmental Assessment'],
  },
  {
    id: 'copper',
    description: 'Copper mineralization detection through remote sensing analysis. Identifies alteration zones associated with porphyry copper deposits using multispectral data.',
    features: ['Alteration Zone Mapping', 'Copper Index Scoring', 'Geological Classification', 'Deposit Probability'],
  },
  {
    id: 'iron',
    description: 'Iron ore deposit identification via satellite-based remote sensing. Uses iron oxide and hydroxide indices for comprehensive deposit characterization.',
    features: ['Iron Oxide Detection', 'BIF Identification', 'Grade Estimation', 'Deposit Delineation'],
  },
  {
    id: 'diamond',
    description: 'Kimberlite pipe detection and diamond potential assessment. Analyzes geological and geophysical indicators for primary diamond deposit identification.',
    features: ['Kimberlite Detection', 'Pipe Structure Analysis', 'Indicator Mineral Mapping', 'Prospectivity Scoring'],
  },
  {
    id: 'bauxite',
    description: 'Bauxite laterite mapping and resource assessment. Identifies lateritic weathering profiles and bauxite-bearing formations through spectral analysis.',
    features: ['Laterite Mapping', 'Weathering Profile', 'Al-OH Detection', 'Resource Classification'],
  },
];

export default function Minerals() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#d4a853]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#d4a853]">Analysis Modules</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Minerals</h1>
        <p className="text-sm text-[#888] mt-1">Select a mineral module to generate intelligence reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {minerals.map((mineral) => {
          const config = getMineralConfig(mineral.id);
          return (
            <div
              key={mineral.id}
              className="rounded-xl border border-[#2a2a2a] p-6 hover:border-[#3a3a3a] transition-all group"
              style={{ backgroundColor: '#141414' }}
            >
              <div className="flex items-start justify-between mb-4">
                <MineralIcon mineral={mineral.id} size="lg" />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{ backgroundColor: config.bg, color: config.color }}
                >
                  Active
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{config.label}</h3>
              <p className="text-xs text-[#888] leading-relaxed mb-4">{mineral.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {mineral.features.map((f) => (
                  <span key={f} className="text-[10px] font-medium px-2 py-1 rounded-md bg-[#1a1a1a] text-[#888] border border-[#2a2a2a]">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Link to={`/GenerateReport?mineral=${mineral.id}`} className="flex-1">
                  <Button
                    className="w-full font-semibold text-sm"
                    style={{ backgroundColor: config.color, color: mineral.id === 'diamond' ? '#000' : '#fff' }}
                  >
                    Generate Report
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}