import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProfilPage from './pages/public/ProfilPage';
import AparaturPage from './pages/public/AparaturPage';
import BeritaPage from './pages/public/BeritaPage';
import BeritaDetailPage from './pages/public/BeritaDetailPage';
import GaleriPage from './pages/public/GaleriPage';
import LayananPage from './pages/public/LayananPage';
import LokasiPage from './pages/public/LokasiPage';
import KontakPage from './pages/public/KontakPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ProfilEditPage from './pages/admin/ProfilEditPage';
import AdminAparaturPage from './pages/admin/AparaturPage';
import PostinganPage from './pages/admin/PostinganPage';
import AdminGaleriPage from './pages/admin/GaleriPage';
import AdminLayananPage from './pages/admin/LayananPage';
import LokasiEditPage from './pages/admin/LokasiEditPage';
import KontakEditPage from './pages/admin/KontakEditPage';
import PesanPage from './pages/admin/PesanPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout Wrapper
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/profil" element={<PublicLayout><ProfilPage /></PublicLayout>} />
        <Route path="/aparatur" element={<PublicLayout><AparaturPage /></PublicLayout>} />
        <Route path="/berita" element={<PublicLayout><BeritaPage /></PublicLayout>} />
        <Route path="/berita/:slug" element={<PublicLayout><BeritaDetailPage /></PublicLayout>} />
        <Route path="/galeri" element={<PublicLayout><GaleriPage /></PublicLayout>} />
        <Route path="/layanan" element={<PublicLayout><LayananPage /></PublicLayout>} />
        <Route path="/lokasi" element={<PublicLayout><LokasiPage /></PublicLayout>} />
        <Route path="/kontak" element={<PublicLayout><KontakPage /></PublicLayout>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profil" element={<ProfilEditPage />} />
          <Route path="aparatur" element={<AdminAparaturPage />} />
          <Route path="berita" element={<PostinganPage />} />
          <Route path="galeri" element={<AdminGaleriPage />} />
          <Route path="layanan" element={<AdminLayananPage />} />
          <Route path="lokasi" element={<LokasiEditPage />} />
          <Route path="kontak" element={<KontakEditPage />} />
          <Route path="pesan" element={<PesanPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
