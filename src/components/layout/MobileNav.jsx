import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Gem, PlusCircle, Leaf, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/Minerals', label: 'Minerals', icon: Gem },
  { path: '/GenerateReport', label: 'Generate', icon: PlusCircle },
  { path: '/Reports', label: 'Reports', icon: FileText },
  { path: '/RegeneracaoAmbiental', label: 'Regeneração', icon: Leaf },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-5 border-b border-[#2a2a2a]" style={{ backgroundColor: '#0d0d0d' }}>
        <Link to="/Dashboard" className="text-xl font-bold text-white tracking-tight">CØ2.IA</Link>
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 pt-16" style={{ backgroundColor: '#0d0d0dF0' }}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive ? 'bg-[#d4a853]/10 text-[#d4a853]' : 'text-[#888] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}