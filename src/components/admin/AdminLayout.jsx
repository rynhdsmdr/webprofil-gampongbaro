import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import {
  LayoutDashboard, Info, Users, Newspaper, Image, Layers, MapPin, Phone,
  Inbox, LogOut, Menu, X, Globe, RefreshCw
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check auth status
  if (!DataService.isLoggedIn()) {
    setTimeout(() => navigate('/admin/login'), 0);
    return null;
  }

  const unreadPesanCount = DataService.getPesan().filter(p => !p.isRead).length;

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Profil Desa', path: '/admin/profil', icon: Info },
    { name: 'Aparatur Desa', path: '/admin/aparatur', icon: Users },
    { name: 'Berita & Pengumuman', path: '/admin/berita', icon: Newspaper },
    { name: 'Galeri Foto', path: '/admin/galeri', icon: Image },
    { name: 'Layanan Publik', path: '/admin/layanan', icon: Layers },
    { name: 'Lokasi & Peta', path: '/admin/lokasi', icon: MapPin },
    { name: 'Informasi Kontak', path: '/admin/kontak', icon: Phone },
    { name: 'Inbox Pesan', path: '/admin/pesan', icon: Inbox, badge: unreadPesanCount },
  ];

  const handleLogout = () => {
    DataService.logout();
    navigate('/admin/login');
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data ke default awal Gampong Baro? Data perubahan akan di-reset.')) {
      DataService.resetToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow">
            GB
          </div>
          <div>
            <h2 className="font-serif font-bold text-white text-base">Admin Panel</h2>
            <p className="text-[11px] text-emerald-400">Gampong Baro</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleResetData}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-slate-800 hover:bg-amber-900/40 text-amber-300 border border-slate-700 text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Data Default
          </button>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <Globe className="w-3.5 h-3.5" /> Lihat Web Publik ↗
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">
              Pengelolaan Web Profil Gampong Baro
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-slate-800">Admin Gampong</span>
              <span className="block text-[10px] text-emerald-600">samudra2626@gmail.com</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300">
              AG
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden bg-slate-900 text-slate-300 p-4 border-b border-slate-800 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                    active ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Content Rendered via Outlet */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
