import React from 'react';
import { DataService } from '../../services/dataService';
import LeafletMap from '../../components/public/LeafletMap';
import { MapPin, Navigation, Clock, ExternalLink, Compass } from 'lucide-react';

export default function LokasiPage() {
  const lokasi = DataService.getLokasi();
  const profil = DataService.getProfil();

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Geografis & Peta</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Lokasi & Peta Gampong</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Temukan lokasi persis Kantor Geuchik dan wilayah {profil.nama} secara interaktif.
          </p>
        </div>
      </section>

      {/* Main Map & Location Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Leaflet Interactive Map Container */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-slate-900">Peta Interaktif OpenStreetMap</h2>
              <p className="text-xs text-slate-500">Gunakan mouse/touch untuk perbesar/geser peta</p>
            </div>
            <a
              href={lokasi.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow"
            >
              Buka di Aplikasi Google Maps <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="h-[500px]">
            <LeafletMap latitude={lokasi.latitude} longitude={lokasi.longitude} height="100%" zoom={15} />
          </div>
        </div>

        {/* Detail Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Alamat Lengkap</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{lokasi.alamat}</p>
            <span className="text-[11px] text-slate-400 block pt-1">Kode Pos: {lokasi.kodePos}</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Koordinat GPS</h3>
            <p className="text-slate-800 text-xs font-mono font-bold bg-slate-50 p-2 rounded-lg border border-slate-200">
              Lat: {lokasi.latitude}<br />
              Lng: {lokasi.longitude}
            </p>
            <span className="text-[11px] text-slate-400 block">Kec. {lokasi.kecamatan}, Kab. {lokasi.kabupaten}</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Jam Operasional</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{lokasi.jamBuka}</p>
            <span className="text-[11px] text-emerald-600 font-semibold block pt-1">Sabtu - Minggu: Libur</span>
          </div>
        </div>

      </div>
    </div>
  );
}
