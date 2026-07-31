import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import LeafletMap from '../../components/public/LeafletMap';
import { Save, CheckCircle2, MapPin } from 'lucide-react';

export default function LokasiEditPage() {
  const [lokasi, setLokasi] = useState(DataService.getLokasi());
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    DataService.updateLokasi(lokasi);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Edit Lokasi & Peta Gampong</h2>
          <p className="text-xs text-slate-500">Perbarui koordinat GPS (Latitude/Longitude), alamat kantor, dan jam buka.</p>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Lokasi & peta desa berhasil diperbarui!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Latitude GPS *</label>
              <input
                type="number"
                step="any"
                required
                value={lokasi.latitude}
                onChange={(e) => setLokasi({ ...lokasi, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Longitude GPS *</label>
              <input
                type="number"
                step="any"
                required
                value={lokasi.longitude}
                onChange={(e) => setLokasi({ ...lokasi, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Alamat Kantor Desa *</label>
            <input
              type="text"
              required
              value={lokasi.alamat}
              onChange={(e) => setLokasi({ ...lokasi, alamat: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Kecamatan</label>
              <input
                type="text"
                value={lokasi.kecamatan}
                onChange={(e) => setLokasi({ ...lokasi, kecamatan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Kabupaten</label>
              <input
                type="text"
                value={lokasi.kabupaten}
                onChange={(e) => setLokasi({ ...lokasi, kabupaten: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Jam Pelayanan Office</label>
            <input
              type="text"
              value={lokasi.jamBuka}
              onChange={(e) => setLokasi({ ...lokasi, jamBuka: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Simpan Lokasi Peta
            </button>
          </div>

        </form>

        {/* Live Preview Map */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-base text-slate-900">Pratinjau Peta Leaflet Live</h3>
          <p className="text-xs text-slate-500">Peta interaktif di bawah ini merespons langsung koordinat di atas.</p>
          <div className="h-[320px]">
            <LeafletMap latitude={lokasi.latitude} longitude={lokasi.longitude} height="100%" />
          </div>
        </div>

      </div>
    </div>
  );
}
