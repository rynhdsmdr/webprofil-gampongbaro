import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Home as HomeIcon, MapPin, Building, ShieldCheck, Newspaper, Image as ImageIcon, Layers, FileText, ChevronRight } from 'lucide-react';
import { DataService } from '../../services/dataService';
import LeafletMap from '../../components/public/LeafletMap';

export default function HomePage() {
  const profil = DataService.getProfil();
  const lokasi = DataService.getLokasi();
  const statistik = DataService.getStatistik();
  const aparatur = DataService.getAparatur().slice(0, 4);
  const berita = DataService.getBerita().filter(b => b.status === 'Published').slice(0, 3);
  const galeri = DataService.getGaleri().slice(0, 4);
  const layanan = DataService.getLayanan().slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={profil.heroBanner}
            alt="Pemandangan Gampong Baro"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Portal Resmi Pemerintahan Gampong Baro
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Selamat Datang di <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              {profil.nama}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-200 text-base sm:text-lg font-light leading-relaxed">
            {profil.slogan} — Menuju gampong mandiri, sejahtera, dan berbudaya dengan transparansi pelayanan publik berbasis digital.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/profil"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/50 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2"
            >
              Jelajahi Profil Desa <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/layanan"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              Layanan Administrasi
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTIK BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-100/80">
          {statistik.map((stat, idx) => {
            const icons = [Users, HomeIcon, MapPin, Building];
            const IconComp = icons[idx % icons.length];
            return (
              <div key={stat.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                    {stat.nilai}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label} ({stat.satuan})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SAMBUTAN GEUCHIK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-emerald-500/40 shadow-2xl">
              <img
                src={profil.sambutanGeuchik.foto}
                alt={profil.sambutanGeuchik.nama}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif font-bold text-lg text-white mt-4">{profil.sambutanGeuchik.nama}</h3>
            <p className="text-xs font-medium text-emerald-400">{profil.sambutanGeuchik.jabatan}</p>
          </div>

          <div className="lg:col-span-8 space-y-4 text-slate-200">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-md border border-emerald-500/30">
              Kata Sambutan
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Sambutan Kepala Gampong Baro
            </h2>
            <p className="text-slate-300 leading-relaxed italic text-sm sm:text-base">
              "{profil.sambutanGeuchik.teks}"
            </p>
            <div className="pt-2">
              <Link to="/profil" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                Baca Profil Lengkap Desa <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* BERITA & PENGUMUMAN TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Kabar Desa</span>
            <h2 className="font-serif font-bold text-3xl text-slate-900">Berita & Pengumuman Terbaru</h2>
          </div>
          <Link to="/berita" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {berita.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                  item.kategori === 'Pengumuman' 
                    ? 'bg-amber-500 text-white' 
                    : item.kategori === 'Kegiatan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {item.kategori}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs text-slate-400">{item.tanggal}</span>
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
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
      </section>

      {/* APARATUR DESA PREVIEW */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Pemerintahan</span>
            <h2 className="font-serif font-bold text-3xl text-white">Aparatur Gampong Baro</h2>
            <p className="text-slate-400 text-sm">
              Jajaran pengurus yang siap mengabdi dan memberikan pelayanan terbaik untuk warga desa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aparatur.map((person) => (
              <div key={person.id} className="bg-slate-800/80 rounded-2xl p-4 text-center border border-slate-700/60 hover:border-emerald-500/50 transition space-y-3 group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-emerald-500/50 group-hover:scale-105 transition-transform">
                  <img src={person.foto} alt={person.nama} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base line-clamp-1">{person.nama}</h4>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">{person.jabatan}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link to="/aparatur" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">
              Lihat Seluruh Aparatur Desa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LAYANAN UTAMA PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Administrasi</span>
          <h2 className="font-serif font-bold text-3xl text-slate-900">Layanan Layanan Publik</h2>
          <p className="text-slate-600 text-sm">Kemudahan pengurusan persuratan bagi seluruh warga Gampong Baro.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layanan.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base">{item.nama}</h3>
              <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">{item.deskripsi}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/layanan" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-800">
            Lihat Syarat & Prosedur Layanan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PETA LOKASI SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Geografis</span>
            <h2 className="font-serif font-bold text-3xl text-slate-900">Lokasi & Wilayah Gampong Baro</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Gampong Baro terletak strategis di Kecamatan {lokasi.kecamatan}, Kabupaten {lokasi.kabupaten}, Provinsi {lokasi.provinsi}.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200/80 text-xs">
              <div><strong className="text-slate-800">Alamat:</strong> {lokasi.alamat}</div>
              <div><strong className="text-slate-800">Koordinat GPS:</strong> {lokasi.latitude}, {lokasi.longitude}</div>
              <div><strong className="text-slate-800">Jam Pelayanan:</strong> {lokasi.jamBuka}</div>
            </div>
            <div className="pt-2">
              <Link to="/lokasi" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
                Buka Peta Interaktif Lengkap <MapPin className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 h-[360px]">
            <LeafletMap latitude={lokasi.latitude} longitude={lokasi.longitude} height="100%" />
          </div>
        </div>
      </section>

    </div>
  );
}
