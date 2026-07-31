import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, ExternalLink } from 'lucide-react';
import { DataService } from '../../services/dataService';

// Custom Social SVG Icons
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);


export default function Footer() {
  const profil = DataService.getProfil();
  const kontak = DataService.getKontak();
  const lokasi = DataService.getLokasi();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                GB
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg">{profil.nama}</h3>
                <p className="text-xs text-emerald-400 font-medium">Aceh Jaya, Indonesia</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Website Resmi Pemerintahan Gampong Baro. Media transparansi publik, sarana informasi warga, dan pelayanan publik digital terpadu.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {kontak.instagram && (
                <a href={kontak.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 transition">
                  <InstagramIcon />
                </a>
              )}
              {kontak.facebook && (
                <a href={kontak.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 transition">
                  <FacebookIcon />
                </a>
              )}
              {kontak.youtube && (
                <a href={kontak.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 transition">
                  <YoutubeIcon />
                </a>
              )}
            </div>

          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/profil" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › Profil & Sejarah Desa
                </Link>
              </li>
              <li>
                <Link to="/aparatur" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › Struktur Aparatur Desa
                </Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › Berita & Pengumuman
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › Galeri Kegiatan & Potensi
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › Layanan Administrasi Publik
                </Link>
              </li>
              <li>
                <Link to="/lokasi" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › Peta & Lokasi Desa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Popular */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Kontak Layanan
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">{lokasi.alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href={`tel:${kontak.telepon}`} className="text-slate-300 hover:text-emerald-400 transition">
                  {kontak.telepon}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href={`mailto:${kontak.email}`} className="text-slate-300 hover:text-emerald-400 transition break-all">
                  {kontak.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: KKN Program Tag */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="inline-block px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-md border border-emerald-500/30">
              Program Kerja KKN
            </span>
            <h5 className="font-serif font-bold text-white text-base">Digitalisasi Gampong Baro</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Didevelop dan dipersembahkan oleh Tim KKN Mahasiswa sebagai sarana pengembangan potensi daerah menuju Desa Mandiri Digital.
            </p>
            <Link to="/admin/login" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline pt-1">
              Akses Portal Admin <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Pemerintahan Gampong Baro. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> untuk Program Kerja KKN
          </p>
        </div>
      </div>
    </footer>
  );
}
