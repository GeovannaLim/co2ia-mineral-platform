import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import { format } from 'date-fns';
import MineralIcon from '../shared/MineralIcon';
import StatusBadge from '../shared/StatusBadge';
import { getMineralConfig } from '../shared/MineralIcon';

export default function RecentReports({ reports }) {
  const recent = reports.slice(0, 5);

  return (
    <div className="rounded-xl border border-[#2a2a2a]" style={{ backgroundColor: '#141414' }}>
      <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Recent Reports</h3>
        <Link to="/Reports" className="text-xs text-[#d4a853] hover:text-[#e4b863] flex items-center gap-1 transition-colors">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="p-8 text-center text-[#888] text-sm">
          No reports yet. Generate your first report to get started.
        </div>
      ) : (
        <div className="divide-y divide-[#2a2a2a]">
          {recent.map((report) => (
            <div key={report.id} className="flex items-center gap-4 p-4 hover:bg-[#1a1a1a] transition-colors">
              <MineralIcon mineral={report.mineral} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{report.title}</p>
                <p className="text-xs text-[#888] mt-0.5">
                  {getMineralConfig(report.mineral).label} · {report.created_date ? format(new Date(report.created_date), 'MMM d, yyyy') : '—'}
                </p>
              </div>
              <StatusBadge status={report.status} />
              {report.status === 'completed' && (
                <Link to={`/ReportView?id=${report.id}`} className="text-[#888] hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}