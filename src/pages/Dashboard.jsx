import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsRow from '../components/dashboard/StatsRow';
import RecentReports from '../components/dashboard/RecentReports';
import MineralQuickAccess from '../components/dashboard/MineralQuickAccess';
import InteractiveMap from '../components/dashboard/InteractiveMap';

export default function Dashboard() {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => base44.entities.Report.list('-created_date', 50),
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#d4a853]" />
            <span className="text-xs font-medium uppercase tracking-widest text-[#d4a853]">Mineral Intelligence</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#888] mt-1">Geospatial analysis & environmental regeneration platform</p>
        </div>
        <Link to="/GenerateReport">
          <Button className="bg-[#d4a853] hover:bg-[#c49843] text-black font-semibold px-6">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#2a2a2a] border-t-[#d4a853] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <StatsRow reports={reports} />
          <InteractiveMap reports={reports} />
          <MineralQuickAccess />
          <RecentReports reports={reports} />
        </>
      )}
    </div>
  );
}