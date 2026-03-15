import React from 'react';
import { Leaf, TreePine, Droplets, Wind } from 'lucide-react';

export default function ESGMetricsCard({ reports }) {
  const calculateMetrics = () => {
    let totalArea = 0;
    let carbonScore = 0;
    let ndviSum = 0;
    let waterProximitySum = 0;
    let validReports = 0;

    reports.forEach((report) => {
      if (report.status !== 'completed') return;

      const stats = report.statistics ? JSON.parse(report.statistics) : null;
      const envIndicators = report.environmental_indicators ? JSON.parse(report.environmental_indicators) : null;

      if (stats?.total_area_km2) {
        totalArea += stats.total_area_km2;
      }

      if (envIndicators) {
        if (envIndicators.carbon_sequestration_score) {
          carbonScore += envIndicators.carbon_sequestration_score;
          validReports++;
        }
        if (envIndicators.ndvi_mean) {
          ndviSum += envIndicators.ndvi_mean;
        }
        if (envIndicators.water_proximity_km) {
          waterProximitySum += envIndicators.water_proximity_km;
        }
      }
    });

    const avgCarbonScore = validReports > 0 ? carbonScore / validReports : 0;
    const carbonMitigated = (avgCarbonScore * totalArea * 0.85).toFixed(0); // Estimativa: tCO2/km²
    const preservedArea = (totalArea * 0.65).toFixed(0); // 65% de área preservada
    const avgNDVI = validReports > 0 ? (ndviSum / validReports).toFixed(3) : 0;

    return {
      preservedArea,
      carbonMitigated,
      avgCarbonScore: avgCarbonScore.toFixed(1),
      avgNDVI,
      totalArea: totalArea.toFixed(0),
    };
  };

  const metrics = calculateMetrics();

  const cards = [
    {
      label: 'Área Preservada',
      value: `${metrics.preservedArea} km²`,
      icon: TreePine,
      color: '#34d399',
      bg: 'rgba(52,211,153,0.1)',
      description: 'Total de área com cobertura vegetal preservada',
    },
    {
      label: 'Carbono Mitigado',
      value: `${metrics.carbonMitigated} tCO₂`,
      icon: Wind,
      color: '#4a9eff',
      bg: 'rgba(74,158,255,0.1)',
      description: 'Emissões de carbono mitigadas através de regeneração',
    },
    {
      label: 'Score Ambiental',
      value: metrics.avgCarbonScore,
      icon: Leaf,
      color: '#d4a853',
      bg: 'rgba(212,168,83,0.1)',
      description: 'Média de sequestro de carbono por região',
    },
    {
      label: 'NDVI Médio',
      value: metrics.avgNDVI,
      icon: Droplets,
      color: '#34d399',
      bg: 'rgba(52,211,153,0.1)',
      description: 'Índice de vegetação por diferença normalizada',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-[#2a2a2a] p-5 transition-all hover:border-[#3a3a3a]"
            style={{ backgroundColor: '#141414' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-1">
              {card.label}
            </h3>
            <p className="text-2xl font-bold text-white mb-2">{card.value}</p>
            <p className="text-[10px] text-[#666] leading-relaxed">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}