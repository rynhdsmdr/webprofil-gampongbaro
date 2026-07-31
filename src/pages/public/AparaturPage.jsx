import React from 'react';
import { DataService } from '../../services/dataService';
import { Shield, Phone, Mail, UserCheck } from 'lucide-react';

export default function AparaturPage() {
  const aparatur = DataService.getAparatur();
  const profil = DataService.getProfil();

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 relative z-10">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Pemerintahan Desa</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Struktur Aparatur {profil.nama}</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Mengenal jajaran pemerintahan desa yang siap melayani kebutuhan warga Gampong Baro secara transparan dan profesional.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Geuchik Highlight Card */}
        {aparatur.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            <div className="md:col-span-5 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-emerald-400/40 shadow-2xl">
                <img src={aparatur[0].foto} alt={aparatur[0].nama} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-md border border-emerald-500/30">
                Pimpinan Utama
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">{aparatur[0].nama}</h2>
              <p className="text-emerald-300 font-semibold text-base">{aparatur[0].jabatan}</p>
              {aparatur[0].telepon && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/60 rounded-xl text-xs text-slate-200 border border-slate-700">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> {aparatur[0].telepon}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other Aparatur Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {aparatur.slice(1).map((person) => (
            <div key={person.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition space-y-4 text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-emerald-500 shadow-inner">
                <img src={person.foto} alt={person.nama} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-slate-900 text-lg">{person.nama}</h3>
                <p className="text-emerald-700 text-xs font-semibold">{person.jabatan}</p>
              </div>
              {person.telepon && (
                <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" /> {person.telepon}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
