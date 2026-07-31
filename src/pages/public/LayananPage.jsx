import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Layers, FileText, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function LayananPage() {
  const layananList = DataService.getLayanan();
  const profil = DataService.getProfil();
  const [openId, setOpenId] = useState(layananList[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Pelayanan Publik</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Panduan Layanan Administrasi</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Informasi lengkap mengenai persyaratan dan alur pengurusan persuratan di Kantor Geuchik {profil.nama}.
          </p>
        </div>
      </section>

      {/* Services List Accordion */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {layananList.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition">
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900">{item.nama}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.deskripsi}</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 text-sm text-slate-700 bg-slate-50/50">
                  {/* Deskripsi Lengkap */}
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">Deskripsi Layanan</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.deskripsi}</p>
                  </div>

                  {/* Persyaratan */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Persyaratan Berkas</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {item.persyaratan.map((syarat, idx) => (
                        <li key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{syarat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alur & Prosedur */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Alur & Prosedur</h4>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-medium leading-relaxed">
                      {item.prosedur}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
