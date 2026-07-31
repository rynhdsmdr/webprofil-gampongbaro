import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Image as ImageIcon, X, Maximize2 } from 'lucide-react';

export default function GaleriPage() {
  const galeriList = DataService.getGaleri();
  const profil = DataService.getProfil();

  const [selectedKat, setSelectedKat] = useState('Semua');
  const [activeImage, setActiveImage] = useState(null);

  const kategoris = ['Semua', ...new Set(galeriList.map(g => g.kategori))];

  const filtered = selectedKat === 'Semua' 
    ? galeriList 
    : galeriList.filter(g => g.kategori === selectedKat);

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Dokumentasi</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Galeri Foto & Potensi Desa</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Potret kegiatan, keindahan alam, serta potensi masyarakat {profil.nama}.
          </p>
        </div>
      </section>

      {/* Main Grid & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {kategoris.map(kat => (
            <button
              key={kat}
              onClick={() => setSelectedKat(kat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedKat === kat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer transition duration-300 transform hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <img src={item.url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <span className="text-xs font-semibold text-emerald-300">{item.kategori}</span>
                <h4 className="font-serif font-bold text-sm leading-snug">{item.judul}</h4>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-300 pt-1">
                  <Maximize2 className="w-3 h-3" /> Klik untuk memperbesar
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Image Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 space-y-4 p-4 text-white">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 text-white hover:bg-red-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[70vh] overflow-hidden rounded-2xl">
              <img src={activeImage.url} alt={activeImage.judul} className="w-full h-full object-contain mx-auto" />
            </div>
            <div className="p-2 space-y-1">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                {activeImage.kategori}
              </span>
              <h3 className="font-serif font-bold text-xl">{activeImage.judul}</h3>
              <p className="text-slate-300 text-sm">{activeImage.deskripsi}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
