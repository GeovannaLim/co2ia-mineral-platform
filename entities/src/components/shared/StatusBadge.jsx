import React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const statusConfig = {
  pending: { icon: Clock, color: '#888', bg: 'rgba(136,136,136,0.1)', label: 'Pending' },
  processing: { icon: Loader2, color: '#4a9eff', bg: 'rgba(74,158,255,0.1)', label: 'Processing', spin: true },
  completed: { icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.1)', label: 'Completed' },
  failed: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Failed' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon className={`w-3 h-3 ${config.spin ? 'animate-spin' : ''}`} />
      {config.label}
    </div>
  );
}