import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Save, CheckCircle2 } from 'lucide-react';

export default function ProfilEditPage() {
  const [profil, setProfil] = useState(DataService.getProfil());
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    DataService.updateProfil(profil);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Edit Profil & Sejarah Desa</h2>
          <p className="text-xs text-slate-500">Perbarui identitas, visi-misi, dan sambutan kepala gampong.</p>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profil desa berhasil diperbarui dan telah diterapkan ke halaman publik!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Nama Desa / Gampong</label>
            <input
              type="text"
              value={profil.nama}
              onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Slogan Desa</label>
            <input
              type="text"
              value={profil.slogan}
              onChange={(e) => setProfil({ ...profil, slogan: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Kecamatan</label>
            <input
              type="text"
              value={profil.kecamatan}
              onChange={(e) => setProfil({ ...profil, kecamatan: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Kabupaten</label>
            <input
              type="text"
              value={profil.kabupaten}
              onChange={(e) => setProfil({ ...profil, kabupaten: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Provinsi</label>
            <input
              type="text"
              value={profil.provinsi}
              onChange={(e) => setProfil({ ...profil, provinsi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Sejarah Gampong</label>
          <textarea
            rows={4}
            value={profil.sejarah}
            onChange={(e) => setProfil({ ...profil, sejarah: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Visi Desa</label>
          <input
            type="text"
            value={profil.visi}
            onChange={(e) => setProfil({ ...profil, visi: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Misi Desa (Pisahkan dengan Enter/Baris baru)</label>
          <textarea
            rows={4}
            value={profil.misi.join('\n')}
            onChange={(e) => setProfil({ ...profil, misi: e.target.value.split('\n') })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900">Sambutan Geuchik</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Geuchik</label>
              <input
                type="text"
                value={profil.sambutanGeuchik.nama}
                onChange={(e) => setProfil({
                  ...profil,
                  sambutanGeuchik: { ...profil.sambutanGeuchik, nama: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Foto URL Geuchik</label>
              <input
                type="text"
                value={profil.sambutanGeuchik.foto}
                onChange={(e) => setProfil({
                  ...profil,
                  sambutanGeuchik: { ...profil.sambutanGeuchik, foto: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Teks Sambutan</label>
            <textarea
              rows={3}
              value={profil.sambutanGeuchik.teks}
              onChange={(e) => setProfil({
                ...profil,
                sambutanGeuchik: { ...profil.sambutanGeuchik, teks: e.target.value }
              })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Simpan Perubahan Profil
        </button>

      </form>
    </div>
  );
}
