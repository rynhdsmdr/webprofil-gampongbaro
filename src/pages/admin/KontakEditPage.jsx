import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Save, CheckCircle2 } from 'lucide-react';

export default function KontakEditPage() {
  const [kontak, setKontak] = useState(DataService.getKontak());
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    DataService.updateKontak(kontak);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">Edit Informasi Kontak Desa</h2>
        <p className="text-xs text-slate-500">Perbarui email resmi, nomor telepon, WhatsApp, dan link media sosial.</p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Informasi kontak berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Utama (Untuk Pesan Kontak) *</label>
            <input
              type="email"
              required
              value={kontak.email}
              onChange={(e) => setKontak({ ...kontak, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">No. Telepon / Kantor *</label>
            <input
              type="text"
              required
              value={kontak.telepon}
              onChange={(e) => setKontak({ ...kontak, telepon: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Nomor WhatsApp Layanan</label>
          <input
            type="text"
            value={kontak.whatsapp || ''}
            onChange={(e) => setKontak({ ...kontak, whatsapp: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900">Tautan Media Sosial</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Instagram URL</label>
            <input
              type="text"
              value={kontak.instagram || ''}
              onChange={(e) => setKontak({ ...kontak, instagram: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Facebook URL</label>
            <input
              type="text"
              value={kontak.facebook || ''}
              onChange={(e) => setKontak({ ...kontak, facebook: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">YouTube Channel URL</label>
            <input
              type="text"
              value={kontak.youtube || ''}
              onChange={(e) => setKontak({ ...kontak, youtube: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Simpan Kontak
          </button>
        </div>

      </form>
    </div>
  );
}
