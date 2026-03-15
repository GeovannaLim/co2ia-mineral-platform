import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Download, Sparkles, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import MineralIcon, { getMineralConfig } from '../components/shared/MineralIcon';
import StatusBadge from '../components/shared/StatusBadge';
import ScoreGauge from '../components/report/ScoreGauge';
import TopZones from '../components/report/TopZones';
import EnvironmentalCard from '../components/report/EnvironmentalCard';
import StatisticsPanel from '../components/report/StatisticsPanel';
import PDFGenerator from '../components/report/PDFGenerator';

function safeParse(str) {
  if (!str) return null;
  if (typeof str === 'object') return str;
  try { return JSON.parse(str); } catch { return null; }
}

export default function ReportView() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const reportId = urlParams.get('id');

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => base44.entities.Report.list('-created_date', 100),
  });

  const report = reports.find((r) => r.id === reportId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#2a2a2a] border-t-[#d4a853] rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-[#888]">Report not found</p>
        <Link to="/Reports" className="text-[#d4a853] text-sm mt-2 inline-block">Back to Reports</Link>
      </div>
    );
  }

  const config = getMineralConfig(report.mineral);
  const topZones = safeParse(report.top_zones);
  const statistics = safeParse(report.statistics);
  const envIndicators = safeParse(report.environmental_indicators);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <MineralIcon mineral={report.mineral} size="lg" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3 text-[#d4a853]" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#d4a853]">
                  {config.label} Analysis
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">{report.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-xs text-[#888]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {report.created_date ? format(new Date(report.created_date), 'MMM d, yyyy') : '—'}
                </span>
                {report.start_date && report.end_date && (
                  <span>{report.start_date} → {report.end_date}</span>
                )}
                <StatusBadge status={report.status} />
              </div>
            </div>
          </div>

          <PDFGenerator report={report} />
        </div>
      </div>

      {/* Score + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="rounded-xl border border-[#2a2a2a] p-6 flex flex-col items-center justify-center" style={{ backgroundColor: '#141414' }}>
          <ScoreGauge score={report.mineral_score} color={config.color} />
          <p className="text-xs text-[#888] mt-3 uppercase tracking-wider">Mineral Potential</p>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-3">Executive Summary</h4>
          <p className="text-sm text-[#ccc] leading-relaxed">{report.summary || 'No summary available.'}</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
        <StatisticsPanel statistics={statistics} color={config.color} />
      </div>

      {/* Top Zones + Environmental */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
          <TopZones zones={topZones} color={config.color} />
        </div>
        <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
          <EnvironmentalCard indicators={envIndicators} />
        </div>
      </div>
    </div>
  );
}