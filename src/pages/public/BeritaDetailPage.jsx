import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react';

export default function BeritaDetailPage() {
  const { slug } = useParams();
  const item = DataService.getBeritaBySlug(slug);

  if (!item) {
    return (
      <div className="pt-32 pb-24 text-center space-y-4 max-w-md mx-auto px-4">
        <h2 className="font-serif font-bold text-2xl text-slate-800">Berita Tidak Ditemukan</h2>
        <p className="text-slate-500 text-sm">Artikel atau pengumuman yang Anda cari tidak tersedia.</p>
        <Link to="/berita" className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <div>
        <Link to="/berita" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-600 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Berita & Pengumuman
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            {item.kategori}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {item.tanggal}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-emerald-600" /> {item.penulis || 'Admin Gampong'}
          </span>
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-4xl text-slate-900 leading-tight">
          {item.judul}
        </h1>
      </div>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-80 sm:h-96">
        <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div 
          className="prose prose-emerald max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
          dangerouslySetInnerHTML={{ __html: item.konten }}
        />

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Dipublikasikan oleh Pemerintahan Gampong Baro</span>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: item.judul, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link artikel berhasil disalin!');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" /> Bagikan Artikel
          </button>
        </div>
      </div>

    </div>
  );
}
