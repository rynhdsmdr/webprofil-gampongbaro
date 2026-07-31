import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { Search, Calendar, Tag, ChevronRight, Newspaper } from 'lucide-react';

export default function BeritaPage() {
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const beritaList = DataService.getBerita().filter(b => b.status === 'Published');
  const profil = DataService.getProfil();

  const kategoris = ['Semua', 'Berita', 'Pengumuman', 'Kegiatan'];

  const filteredBerita = beritaList.filter(item => {
    const matchKategori = filterKategori === 'Semua' || item.kategori === filterKategori;
    const matchSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKategori && matchSearch;
  });

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Informasi Gampong</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Berita & Pengumuman</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Kumpulan informasi terkini, agenda kegiatan, serta pengumuman resmi dari Pemerintahan {profil.nama}.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {kategoris.map(kat => (
              <button
                key={kat}
                onClick={() => setFilterKategori(kat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterKategori === kat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* Grid List */}
        {filteredBerita.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 space-y-3">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif font-bold text-slate-700 text-lg">Tidak ada berita ditemukan</h3>
            <p className="text-slate-400 text-xs">Coba ubah kata kunci pencarian atau kategori filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredBerita.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                    item.kategori === 'Pengumuman' ? 'bg-amber-500 text-white' : item.kategori === 'Kegiatan' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {item.kategori}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" /> {item.tanggal}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                  <Link
                    to={`/berita/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800 pt-2"
                  >
                    Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
