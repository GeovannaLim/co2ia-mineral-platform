import React from 'react';
import { FileText, Gem, TrendingUp, Globe } from 'lucide-react';

export default function StatsRow({ reports }) {
  const completed = reports.filter(r => r.status === 'completed').length;
  const minerals = [...new Set(reports.map(r => r.mineral))].length;
  const avgScore = reports.filter(r => r.mineral_score).length > 0
    ? (reports.filter(r => r.mineral_score).reduce((s, r) => s + r.mineral_score, 0) / reports.filter(r => r.mineral_score).length).toFixed(1)
    : '—';

  const stats = [
    { label: 'Total Reports', value: reports.length, icon: FileText, color: '#d4a853' },
    { label: 'Completed', value: completed, icon: TrendingUp, color: '#34d399' },
    { label: 'Minerals Analyzed', value: minerals, icon: Gem, color: '#4a9eff' },
    { label: 'Avg. Score', value: avgScore, icon: Globe, color: '#a0714f' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-xl border border-[#2a2a2a] p-5 transition-all hover:border-[#3a3a3a]"
            style={{ backgroundColor: '#141414' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-[#888]">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}