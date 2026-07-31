import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function KontakPage() {
  const kontak = DataService.getKontak();
  const lokasi = DataService.getLokasi();
  const profil = DataService.getProfil();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });

  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.email || !formData.pesan) return;

    DataService.addPesan(formData);
    setSuccessMsg(true);
    setFormData({ nama: '', email: '', subjek: '', pesan: '' });

    setTimeout(() => {
      setSuccessMsg(false);
    }, 6000);
  };

  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Layanan Informasi</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">Hubungi Kami</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Kirimkan aspirasi, pertanyaan, atau permohonan informasi kepada Pemerintahan {profil.nama}.
          </p>
        </div>
      </section>

      {/* Main Grid Form & Contact Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-8 rounded-3xl shadow-lg space-y-6">
            <h3 className="font-serif font-bold text-2xl text-white">Informasi Kontak</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Anda juga dapat datang langsung ke kantor desa atau menghubungi kami melalui nomor layanan di bawah ini.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-slate-400 block">Alamat Kantor</span>
                  <span className="text-slate-200 text-xs">{lokasi.alamat}</span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Telepon / WhatsApp</span>
                  <a href={`tel:${kontak.telepon}`} className="text-slate-200 text-xs font-semibold hover:text-emerald-300">
                    {kontak.telepon}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Email Resmi</span>
                  <a href={`mailto:${kontak.email}`} className="text-slate-200 text-xs font-semibold hover:text-emerald-300">
                    {kontak.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <p>⏱ Jam Pelayanan: {lokasi.jamBuka}</p>
            </div>
          </div>
        </div>

        {/* Form Send Message */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-2xl text-slate-900">Kirim Pesan / Aspirasi</h3>
            <p className="text-slate-500 text-xs">Pesan Anda akan langsung masuk ke inbox dashboard admin gampong.</p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Pesan Anda berhasil dikirim! Tim admin akan segera meninjau pesan Anda. Terima kasih.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Aktif *</label>
                <input
                  type="email"
                  required
                  placeholder="contoh@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subjek / Topik</label>
              <input
                type="text"
                placeholder="Contoh: Pertanyaan Pengurusan Surat"
                value={formData.subjek}
                onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Isi Pesan *</label>
              <textarea
                required
                rows={5}
                placeholder="Tuliskan pesan, saran, atau pertanyaan Anda secara rinci..."
                value={formData.pesan}
                onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Kirim Pesan Sekarang
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
