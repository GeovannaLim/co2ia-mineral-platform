import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Gem, PlusCircle, 
  Leaf, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const navItems = [
  { path: '/Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/Minerals', label: 'Minerals', icon: Gem },
  { path: '/GenerateReport', label: 'Generate Report', icon: PlusCircle },
  { path: '/Reports', label: 'Reports', icon: FileText },
  { path: '/RegeneracaoAmbiental', label: 'Regeneração Ambiental', icon: Leaf },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 border-r border-[#2a2a2a] ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
      style={{ backgroundColor: '#0d0d0d' }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-[#2a2a2a]">
        <Link to="/Dashboard" className="flex items-center gap-2 overflow-hidden">
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
            {collapsed ? 'CØ' : 'CØ2.IA'}
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#d4a853]/10 text-[#d4a853]'
                  : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#2a2a2a] space-y-1">
        <button
          onClick={() => base44.auth.logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}