import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Main content */}
      <main className="md:ml-[240px] min-h-screen">
        <div className="p-4 md:p-8 pt-20 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}