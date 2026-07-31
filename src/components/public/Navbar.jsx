import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, MapPin, Phone, Newspaper, Image, Layers, Home, Info, Lock } from 'lucide-react';
import { DataService } from '../../services/dataService';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const profil = DataService.getProfil();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Profil Desa', path: '/profil', icon: Info },
    { name: 'Aparatur', path: '/aparatur', icon: Shield },
    { name: 'Berita', path: '/berita', icon: Newspaper },
    { name: 'Galeri', path: '/galeri', icon: Image },
    { name: 'Layanan', path: '/layanan', icon: Layers },
    { name: 'Lokasi', path: '/lokasi', icon: MapPin },
    { name: 'Kontak', path: '/kontak', icon: Phone },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-emerald-100' 
        : 'bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-transparent py-4 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg group-hover:scale-105 transition-transform shrink-0">
              GB
            </div>
            <div>
              <span className={`block font-serif font-bold text-base sm:text-lg leading-tight transition-colors ${
                scrolled ? 'text-emerald-950' : 'text-white'
              }`}>
                {profil.nama || 'Gampong Baro'}
              </span>
              <span className={`block text-[10px] sm:text-xs font-medium tracking-wide ${
                scrolled ? 'text-emerald-600' : 'text-emerald-300'
              }`}>
                {profil.kecamatan}, {profil.kabupaten}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? scrolled
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'bg-white/20 text-white backdrop-blur-md font-semibold'
                      : scrolled
                        ? 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Admin Login CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                scrolled
                  ? 'bg-slate-900 text-white hover:bg-emerald-700'
                  : 'bg-emerald-500/90 hover:bg-emerald-500 text-white backdrop-blur-sm'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Panel Admin
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? 'text-slate-800 bg-slate-100/80 hover:bg-slate-200' : 'text-white bg-white/10 hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 top-[65px] bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 lg:hidden bg-white border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 space-y-1.5 mt-2 mx-3 rounded-2xl max-h-[80vh] overflow-y-auto animate-fadeIn">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <Link
                to="/admin/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-700 transition"
              >
                <Lock className="w-4 h-4" />
                Login Admin Panel
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
