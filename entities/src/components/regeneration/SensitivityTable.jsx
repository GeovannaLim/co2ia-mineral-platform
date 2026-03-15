import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import MineralIcon, { getMineralConfig } from '../shared/MineralIcon';

export default function SensitivityTable({ reports }) {
  const completedReports = reports.filter((r) => r.status === 'completed');

  const getSensitivityIcon = (sensitivity) => {
    if (!sensitivity) return { icon: AlertCircle, color: '#888' };
    const lower = sensitivity.toLowerCase();
    if (lower === 'low') return { icon: CheckCircle2, color: '#34d399' };
    if (lower === 'moderate') return { icon: AlertTriangle, color: '#eab308' };
    return { icon: AlertCircle, color: '#ef4444' };
  };

  const getRiskIcon = (risk) => {
    if (!risk) return { icon: AlertCircle, color: '#888' };
    const lower = risk.toLowerCase();
    if (lower === 'low') return { icon: CheckCircle2, color: '#34d399' };
    if (lower === 'moderate') return { icon: AlertTriangle, color: '#eab308' };
    return { icon: AlertCircle, color: '#ef4444' };
  };

  return (
    <div className="rounded-xl border border-[#2a2a2a] overflow-hidden" style={{ backgroundColor: '#141414' }}>
      <div className="p-5 border-b border-[#2a2a2a]">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Análise de Sensibilidade Ambiental por Região
        </h3>
      </div>

      {completedReports.length === 0 ? (
        <div className="p-8 text-center text-[#888] text-sm">Nenhum relatório completo disponível</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]">
              <tr className="text-[10px] font-semibold uppercase tracking-wider text-[#888]">
                <th className="px-4 py-3 text-left">Região</th>
                <th className="px-4 py-3 text-left">Mineral</th>
                <th className="px-4 py-3 text-center">NDVI</th>
                <th className="px-4 py-3 text-center">Sensibilidade</th>
                <th className="px-4 py-3 text-center">Risco Desflorestamento</th>
                <th className="px-4 py-3 text-center">Proximidade Água</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {completedReports.map((report) => {
                const envIndicators = report.environmental_indicators
                  ? JSON.parse(report.environmental_indicators)
                  : {};
                const config = getMineralConfig(report.mineral);
                const sensConfig = getSensitivityIcon(envIndicators.environmental_sensitivity);
                const riskConfig = getRiskIcon(envIndicators.deforestation_risk);
                const SensIcon = sensConfig.icon;
                const RiskIcon = riskConfig.icon;

                return (
                  <tr key={report.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-white">{report.title}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MineralIcon mineral={report.mineral} size="sm" />
                        <span className="text-xs text-[#888]">{config.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-white">
                        {envIndicators.ndvi_mean?.toFixed(3) || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <SensIcon className="w-4 h-4" style={{ color: sensConfig.color }} />
                        <span className="text-xs text-[#888]">
                          {envIndicators.environmental_sensitivity || '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <RiskIcon className="w-4 h-4" style={{ color: riskConfig.color }} />
                        <span className="text-xs text-[#888]">
                          {envIndicators.deforestation_risk || '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-[#4a9eff]">
                        {envIndicators.water_proximity_km?.toFixed(1) || '—'} km
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}