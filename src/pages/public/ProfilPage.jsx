import React from 'react';
import { DataService } from '../../services/dataService';
import { ShieldCheck, Target, Compass, BookOpen, MapPin, Users, Building } from 'lucide-react';

export default function ProfilPage() {
  const profil = DataService.getProfil();
  const statistik = DataService.getStatistik();

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={profil.heroBanner} alt="Profil Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Tentang Kami</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Profil & Sejarah {profil.nama}</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">{profil.slogan}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Sejarah Section */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Sejarah Singkat Gampong
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Asal Usul & Perjalanan Gampong Baro
            </h2>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3">
              {profil.sejarah.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80" alt="Sejarah Gampong Baro" className="w-full h-72 object-cover" />
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-8 rounded-3xl shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-white">Visi Gampong Baro</h3>
              <p className="text-slate-200 text-base leading-relaxed italic border-l-4 border-emerald-500 pl-4">
                "{profil.visi}"
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-slate-900">Misi Gampong Baro</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {profil.misi.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Geografis & Demografi */}
        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif font-bold text-2xl text-slate-900">Data Wilayah & Kependudukan</h3>
            <p className="text-slate-500 text-sm">Gambaran umum gambaran demografi Gampong Baro</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistik.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-2xl text-center shadow-sm border border-slate-100 space-y-1">
                <div className="text-3xl font-extrabold font-serif text-emerald-700">{stat.nilai}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase">{stat.label} ({stat.satuan})</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
