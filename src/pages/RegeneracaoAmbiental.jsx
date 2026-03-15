import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Leaf } from 'lucide-react';
import ESGMetricsCard from '../components/regeneration/ESGMetricsCard';
import ProgressChart from '../components/regeneration/ProgressChart';
import SensitivityTable from '../components/regeneration/SensitivityTable';

export default function RegeneracaoAmbiental() {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => base44.entities.Report.list('-created_date', 100),
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-4 h-4 text-[#34d399]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#34d399]">
            ESG & Sustentabilidade
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Regeneração Ambiental</h1>
        <p className="text-sm text-[#888] mt-1">
          Consolidação de indicadores ESG e progresso de regeneração ambiental
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#2a2a2a] border-t-[#34d399] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* ESG Metrics */}
          <ESGMetricsCard reports={reports} />

          {/* Progress Chart */}
          <ProgressChart reports={reports} />

          {/* Sensitivity Table */}
          <SensitivityTable reports={reports} />
        </>
      )}
    </div>
  );
}