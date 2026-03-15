import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function StatisticsPanel({ statistics, color }) {
  if (!statistics) return null;

  const chartData = [
    { name: 'Min', value: statistics.min },
    { name: 'Mean', value: statistics.mean },
    { name: 'Median', value: statistics.median },
    { name: 'Max', value: statistics.max },
  ];

  const items = [
    { label: 'Mean', value: statistics.mean?.toFixed(2) },
    { label: 'Median', value: statistics.median?.toFixed(2) },
    { label: 'Std Dev', value: statistics.std_dev?.toFixed(2) },
    { label: 'Min', value: statistics.min?.toFixed(2) },
    { label: 'Max', value: statistics.max?.toFixed(2) },
    { label: 'Total Area', value: `${statistics.total_area_km2?.toFixed(0)} km²` },
    { label: 'High Potential', value: `${statistics.high_potential_pct?.toFixed(1)}%` },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#888]">Statistics</h4>
      
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: 12 }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={color} fillOpacity={0.3 + (i * 0.2)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item.label} className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <span className="text-[10px] text-[#888] uppercase tracking-wider">{item.label}</span>
            <p className="text-sm font-semibold text-white mt-0.5">{item.value || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}