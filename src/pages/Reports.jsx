import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sparkles, Search, PlusCircle, Eye, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import MineralIcon, { getMineralConfig } from '../components/shared/MineralIcon';
import StatusBadge from '../components/shared/StatusBadge';

export default function Reports() {
  const [search, setSearch] = useState('');
  const [mineralFilter, setMineralFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => base44.entities.Report.list('-created_date', 100),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Report.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] }),
  });

  const filtered = reports.filter((r) => {
    const matchSearch = r.title?.toLowerCase().includes(search.toLowerCase());
    const matchMineral = mineralFilter === 'all' || r.mineral === mineralFilter;
    return matchSearch && matchMineral;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#d4a853]" />
            <span className="text-xs font-medium uppercase tracking-widest text-[#d4a853]">Intelligence Reports</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports</h1>
          <p className="text-sm text-[#888] mt-1">All generated mineral intelligence reports</p>
        </div>
        <Link to="/GenerateReport">
          <Button className="bg-[#d4a853] hover:bg-[#c49843] text-black font-semibold px-6">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="bg-[#141414] border-[#2a2a2a] text-white pl-9"
          />
        </div>
        <Select value={mineralFilter} onValueChange={setMineralFilter}>
          <SelectTrigger className="w-40 bg-[#141414] border-[#2a2a2a] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#141414] border-[#2a2a2a]">
            <SelectItem value="all">All Minerals</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="copper">Copper</SelectItem>
            <SelectItem value="iron">Iron</SelectItem>
            <SelectItem value="diamond">Diamond</SelectItem>
            <SelectItem value="bauxite">Bauxite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-[#2a2a2a] border-t-[#d4a853] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-[#2a2a2a] p-12 text-center" style={{ backgroundColor: '#141414' }}>
          <p className="text-[#888] text-sm">No reports found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#2a2a2a] overflow-hidden" style={{ backgroundColor: '#141414' }}>
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-[#2a2a2a] text-[10px] font-semibold uppercase tracking-wider text-[#888]">
            <div className="col-span-4">Report</div>
            <div className="col-span-2">Mineral</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Score</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-[#2a2a2a]">
            {filtered.map((report) => {
              const config = getMineralConfig(report.mineral);
              return (
                <div key={report.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 hover:bg-[#1a1a1a] transition-colors items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    <MineralIcon mineral={report.mineral} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-white truncate">{report.title}</p>
                      <p className="text-xs text-[#888] md:hidden">{config.label} · {report.created_date ? format(new Date(report.created_date), 'MMM d, yyyy') : '—'}</p>
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="text-sm text-[#888]">{config.label}</span>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="text-sm text-[#888]">
                      {report.created_date ? format(new Date(report.created_date), 'MMM d, yyyy') : '—'}
                    </span>
                  </div>
                  <div className="col-span-1 hidden md:block">
                    <span className="text-sm font-semibold" style={{ color: config.color }}>
                      {report.mineral_score ? report.mineral_score.toFixed(0) : '—'}
                    </span>
                  </div>
                  <div className="col-span-1 hidden md:flex">
                    <StatusBadge status={report.status} />
                  </div>
                  <div className="col-span-2 flex items-center gap-2 justify-end">
                    <StatusBadge status={report.status} />
                    {report.status === 'completed' && (
                      <Link to={`/ReportView?id=${report.id}`}>
                        <Button size="sm" variant="ghost" className="text-[#888] hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#888] hover:text-red-400"
                      onClick={() => deleteMutation.mutate(report.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}