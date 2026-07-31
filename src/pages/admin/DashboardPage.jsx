import React from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { Users, Newspaper, Image, Layers, Inbox, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const aparaturCount = DataService.getAparatur().length;
  const beritaCount = DataService.getBerita().length;
  const galeriCount = DataService.getGaleri().length;
  const layananCount = DataService.getLayanan().length;
  const pesanList = DataService.getPesan();
  const unreadPesan = pesanList.filter(p => !p.isRead).length;

  const stats = [
    { label: 'Total Berita / Post', count: beritaCount, icon: Newspaper, color: 'bg-blue-500', path: '/admin/berita' },
    { label: 'Aparatur Desa', count: aparaturCount, icon: Users, color: 'bg-emerald-500', path: '/admin/aparatur' },
    { label: 'Foto Galeri', count: galeriCount, icon: Image, color: 'bg-amber-500', path: '/admin/galeri' },
    { label: 'Layanan Publik', count: layananCount, icon: Layers, color: 'bg-purple-500', path: '/admin/layanan' },
    { label: 'Pesan Masuk', count: unreadPesan > 0 ? `${unreadPesan} Belum dibaca` : '0 Baru', icon: Inbox, color: 'bg-rose-500', path: '/admin/pesan' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-md border border-emerald-500/30">
            Panel Administrator
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl">Selamat Datang, Admin Gampong Baro</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Kelola data profil, berita, galeri, aparatur, layanan, dan informasi peta lokasi desa dengan mudah dari panel ini.
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2 shrink-0"
        >
          Pratinjau Web Publik <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              to={s.path}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition space-y-3 block"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${s.color} text-white flex items-center justify-center shadow`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-serif">{s.count}</div>
                <div className="text-xs font-medium text-slate-500">{s.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Messages */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-slate-900">Pesan Masuk Terbaru</h3>
            <Link to="/admin/pesan" className="text-xs font-bold text-emerald-600 hover:underline">
              Lihat Semua
            </Link>
          </div>

          {pesanList.length === 0 ? (
            <p className="text-slate-400 text-xs py-6 text-center">Belum ada pesan dari warga.</p>
          ) : (
            <div className="space-y-3">
              {pesanList.slice(0, 4).map((p) => (
                <div key={p.id} className={`p-4 rounded-xl border ${p.isRead ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50/70 border-emerald-200'} space-y-1`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{p.nama} ({p.email})</span>
                    <span className="text-slate-400 text-[11px]">{p.tanggal}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-800">{p.subjek}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{p.pesan}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Access Menu */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-slate-900">Modul Pengelolaan CRUD</h3>
          <div className="space-y-2">
            <Link to="/admin/profil" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-900 border border-slate-200/80 transition">
              <span>Edit Profil & Visi Misi Desa</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
            <Link to="/admin/aparatur" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-900 border border-slate-200/80 transition">
              <span>Kelola Aparatur Desa</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
            <Link to="/admin/berita" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-900 border border-slate-200/80 transition">
              <span>Kelola Berita & Pengumuman</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
            <Link to="/admin/galeri" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-900 border border-slate-200/80 transition">
              <span>Kelola Galeri Foto Desa</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
            <Link to="/admin/lokasi" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-900 border border-slate-200/80 transition">
              <span>Update Koordinat Peta & Alamat</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
