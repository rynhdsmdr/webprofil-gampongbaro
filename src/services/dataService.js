// Data Service with LocalStorage persistence for Gampong Baro
// Enables instant CRUD operations for Admin Panel and realistic public display
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  PROFIL: 'gampongbaro_profil',
  APARATUR: 'gampongbaro_aparatur',
  BERITA: 'gampongbaro_berita',
  GALERI: 'gampongbaro_galeri',
  LAYANAN: 'gampongbaro_layanan',
  LOKASI: 'gampongbaro_lokasi',
  KONTAK: 'gampongbaro_kontak',
  PESAN: 'gampongbaro_pesan',
  STATISTIK: 'gampongbaro_statistik',
  AUTH: 'gampongbaro_admin_auth',
};

// Initial Seed Data
const DEFAULT_PROFIL = {
  nama: 'Gampong Baro',
  kecamatan: 'Setia Bakti',
  kabupaten: 'Aceh Jaya',
  provinsi: 'Aceh',
  slogan: 'Asri, Sejahtera, & Berbudaya Digital',
  sejarah: `Gampong Baro merupakan salah satu gampong yang kaya akan nilai sejarah dan kearifan lokal. Berdiri sejak puluhan tahun lalu, gampong ini mengedepankan asas gotong royong, keagamaan, dan kelestarian lingkungan. Seiring perkembangan zaman, Gampong Baro berkomitmen menjadi gampong mandiri yang memanfaatkan teknologi informasi untuk meningkatkan kesejahteraan seluruh warga gampong.`,
  visi: 'Mewujudkan Gampong Baro yang Sejahtera, Mandiri, Berbudaya, dan Terdepan dalam Pelayanan Publik berbasis Digital.',
  misi: [
    'Meningkatkan mutu pelayanan administrasi gampong yang transparan dan efisien.',
    'Memberdayakan ekonomi warga melalui optimalisasi sektor pertanian, perikanan, dan UMKM.',
    'Memperkuat sarana infrastruktur gampong yang ramah lingkungan dan berkelanjutan.',
    'Menjaga kearifan lokal, nilai syariat, dan rasa persaudaraan antar warga.'
  ],
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80',
  heroBanner: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80',
  sambutanGeuchik: {
    nama: 'H. Teuku Ahmad Ridwan, S.Sos.',
    jabatan: 'Geuchik Gampong Baro',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    teks: `Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi Gampong Baro. Website ini hadir sebagai wujud transparansi publik dan kemudahan akses informasi bagi seluruh masyarakat. Kami siap melayani warga dengan sepenuh hati demi kemajuan Gampong Baro tercinta.`
  }
};

const DEFAULT_LOKASI = {
  latitude: 5.206685,
  longitude: 96.620415,
  alamat: 'Jl. Utama Gampong Baro No. 01, Kecamatan Setia Bakti',
  kecamatan: 'Setia Bakti',
  kabupaten: 'Aceh Jaya',
  provinsi: 'Aceh',
  kodePos: '23653',
  jamBuka: 'Senin - Jumat | 08.00 - 16.00 WIB',
  googleMapsUrl: 'https://maps.google.com/?q=5.206685,96.620415'
};

const DEFAULT_KONTAK = {
  email: 'samudra2626@gmail.com',
  telepon: '+62 812-3456-7890',
  whatsapp: '+62 812-3456-7890',
  alamat: 'Kantor Geuchik Gampong Baro, Aceh Jaya',
  instagram: 'https://instagram.com/gampongbaro.official',
  facebook: 'https://facebook.com/gampongbaro',
  youtube: 'https://youtube.com/@gampongbarotv'
};

const DEFAULT_STATISTIK = [
  { id: '1', label: 'Total Penduduk', nilai: '1,450', satuan: 'Jiwa', icon: 'Users' },
  { id: '2', label: 'Kepala Keluarga', nilai: '385', satuan: 'KK', icon: 'Home' },
  { id: '3', label: 'Luas Wilayah', nilai: '4.8', satuan: 'km²', icon: 'Map' },
  { id: '4', label: 'Dusun / RT', nilai: '4', satuan: 'Dusun', icon: 'Building' }
];

const DEFAULT_APARATUR = [
  {
    id: '1',
    nama: 'H. Teuku Ahmad Ridwan, S.Sos.',
    jabatan: 'Geuchik (Kepala Desa)',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    telepon: '0812-1111-2222',
    urutan: 1
  },
  {
    id: '2',
    nama: 'Cut Marzuki, S.E.',
    jabatan: 'Sekretaris Gampong (Sekdes)',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    telepon: '0812-3333-4444',
    urutan: 2
  },
  {
    id: '3',
    nama: 'Siti Rahmah, A.Md.',
    jabatan: 'Kaur Keuangan',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    telepon: '0812-5555-6666',
    urutan: 3
  },
  {
    id: '4',
    nama: 'Bambang Hermanto',
    jabatan: 'Kaur Perencanaan & Umum',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    telepon: '0812-7777-8888',
    urutan: 4
  },
  {
    id: '5',
    nama: 'Zulkifli Syah',
    jabatan: 'Kasi Pemerintahan',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    telepon: '0812-9999-0000',
    urutan: 5
  },
  {
    id: '6',
    nama: 'Nurul Hidayah, S.Pd.',
    jabatan: 'Kasi Kesejahteraan & Pelayanan',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    telepon: '0813-1234-5678',
    urutan: 6
  }
];

const DEFAULT_BERITA = [
  {
    id: '1',
    judul: 'Pelaksanaan Program KKN Mahasiswa: Digitalisasi Web Profil Gampong Baro',
    slug: 'pelaksanaan-kkn-digitalisasi-web-profil',
    kategori: 'Kegiatan',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    ringkasan: 'Tim Mahasiswa KKN resmi meluncurkan website profil Gampong Baro untuk meningkatkan transparansi publik dan kemudahan pelayanan warga.',
    konten: `<p>Gampong Baro kini memiliki portal resmi digital yang dapat diakses oleh seluruh warga dan masyarakat umum. Program kerja ini digagas oleh Tim KKN sebagai langkah nyata menuju gampong digital.</p><p>Website ini menyajikan fitur lengkap mulai dari profil gampong, informasi aparatur, layanan publik, berita kegiatan, hingga lokasi peta interaktif.</p>`,
    penulis: 'Tim KKN Gampong Baro',
    tanggal: '2026-07-30',
    status: 'Published'
  },
  {
    id: '2',
    judul: 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap III Tahun 2026',
    slug: 'penyaluran-blt-dana-desa-tahap-iii-2026',
    kategori: 'Pengumuman',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    ringkasan: 'Diberitahukan kepada KPM terdaftar bahwa penyaluran BLT Tahap III akan dilaksanakan pada hari Jumat di Kantor Geuchik.',
    konten: `<p>Pemerintah Gampong Baro mengumumkan penyaluran BLT Dana Desa Tahap III untuk bulan Juli - September 2026. Penyaluran dilaksanakan pada hari Jumat jam 09.00 WIB bertempat di Kantor Geuchik.</p><p>Penerima wajib membawa KTP asli dan KK asli.</p>`,
    penulis: 'Sekretariat Gampong',
    tanggal: '2026-07-28',
    status: 'Published'
  },
  {
    id: '3',
    judul: 'Gotong Royong Bersama Membersihkan Saluran Irigasi Pertanian Desa',
    slug: 'gotong-royong-saluran-irigasi-pertanian',
    kategori: 'Berita',
    thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?w=800&auto=format&fit=crop&q=80',
    ringkasan: 'Warga Gampong Baro antusias mengikuti kegiatan gotong royong pembersihan irigasi menjelang musim tanam padi.',
    konten: `<p>Menyambut musim tanam padi, ratusan warga Gampong Baro bahu membahu membersihkan saluran irigasi utama gampong. Kegiatan ini bertujuan memperlancar aliran air ke sawah-sawah warga.</p>`,
    penulis: 'Kasi Kesejahteraan',
    tanggal: '2026-07-20',
    status: 'Published'
  }
];

const DEFAULT_GALERI = [
  {
    id: '1',
    judul: 'Pemandangan Persawahan Gampong Baro',
    kategori: 'Alam & Potensi',
    tipe: 'Foto',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80',
    deskripsi: 'Hamparan hijau sawah Gampong Baro yang membentang di kaki perbukitan.'
  },
  {
    id: '2',
    judul: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbang)',
    kategori: 'Kegiatan Gampong',
    tipe: 'Foto',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80',
    deskripsi: 'Rapat terbuka pembahasan rencana kerja pembangunan Gampong Baro.'
  },
  {
    id: '3',
    judul: 'Pelatihan Usaha Mikro Warga Gampong',
    kategori: 'UMKM',
    tipe: 'Foto',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    deskripsi: 'Pelatihan kemasan produk dan pemasaran online bagi pengrajin lokal.'
  },
  {
    id: '4',
    judul: 'Kantor Geuchik Gampong Baro',
    kategori: 'Fasilitas Publik',
    tipe: 'Foto',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    deskripsi: 'Pusat pelayanan administrasi dan koordinasi pemerintahan desa.'
  }
];

const DEFAULT_LAYANAN = [
  {
    id: '1',
    nama: 'Surat Keterangan Usaha (SKU)',
    deskripsi: 'Surat Keterangan dari Geuchik untuk keperluan legalitas atau pengajuan modal usaha warga ke bank/lembaga keuangan.',
    persyaratan: ['Fotokopi KTP Pemohon', 'Fotokopi Kartu Keluarga (KK)', 'Foto Tempat Usaha', 'Surat Pengantar RT/Dusun'],
    prosedur: '1. Ambil pengantar dari RT/Dusun -> 2. Bawa berkas ke Kantor Geuchik -> 3. Pemrosesan dan penandatanganan (15 menit).',
    icon: 'Briefcase',
    status: 'Aktif'
  },
  {
    id: '2',
    nama: 'Surat Keterangan Domisili',
    deskripsi: 'Surat yang menerangkan bahwa warga benar-benar bertempat tinggal di wilayah Gampong Baro.',
    persyaratan: ['Fotokopi KTP', 'Fotokopi KK', 'Surat Pengantar RT'],
    prosedur: '1. Serahkan berkas di loket pelayanan -> 2. Verifikasi data oleh Sekdes -> 3. Penerbitan surat.',
    icon: 'Home',
    status: 'Aktif'
  },
  {
    id: '3',
    nama: 'Surat Keterangan Tidak Mampu (SKTM)',
    deskripsi: 'Surat keterangan untuk keperluan keringanan biaya pendidikan, pengobatan/BPJS, atau bantuan sosial.',
    persyaratan: ['Fotokopi KTP Parents/Wali', 'Fotokopi KK', 'Pernyataan Kurang Mampu bertanda tangan RT'],
    prosedur: '1. Pengajuan ke Kasi Pelayanan -> 2. Survei singkat jika diperlukan -> 3. Cetak & Pengesahan Geuchik.',
    icon: 'HeartHandshake',
    status: 'Aktif'
  },
  {
    id: '4',
    nama: 'Pengurusan Pengantar Nikah (N1-N4)',
    deskripsi: 'Surat rekomendasi/pengantar dari gampong bagi warga yang hendak mendaftarkan pernikahan ke KUA.',
    persyaratan: ['KTP & KK Calon Pengantin', 'Pasfoto 3x4 (4 lembar)', 'Fotokopi Akta Kelahiran', 'Surat Imunisasi dari Puskesmas'],
    prosedur: '1. Pendaftaran awal di kantor desa -> 2. Pemeriksaan kelengkapan dokumen oleh Kaur -> 3. Penerbitan N1-N4.',
    icon: 'Users',
    status: 'Aktif'
  }
];

const DEFAULT_PESAN = [
  {
    id: '1',
    nama: 'Rahmat Hidayat',
    email: 'rahmathid@gmail.com',
    subjek: 'Tanya Persyaratan SKU Usaha Kuliner',
    pesan: 'Assalamu alaikum admin, apakah pengurusan SKU usaha warung kopi bisa ditunggu atau harus diproses besok harinya?',
    tanggal: '2026-07-30 14:20',
    isRead: false
  }
];

// Helper functions for LocalStorage
const getStorage = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Data Service API Export
export const DataService = {
  // Sync all tables with Supabase on startup
  syncWithSupabase: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured yet. Using LocalStorage fallback.');
      return false;
    }

    try {
      // 1. Profil
      const { data: dbProfil, error: errProfil } = await supabase.from('profil').select('*');
      if (!errProfil && dbProfil && dbProfil.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PROFIL, JSON.stringify(dbProfil[0]));
      } else if (dbProfil && dbProfil.length === 0) {
        await supabase.from('profil').insert([{ id: '1', ...DEFAULT_PROFIL }]);
      }

      // 2. Lokasi
      const { data: dbLokasi, error: errLokasi } = await supabase.from('lokasi').select('*');
      if (!errLokasi && dbLokasi && dbLokasi.length > 0) {
        localStorage.setItem(STORAGE_KEYS.LOKASI, JSON.stringify(dbLokasi[0]));
      } else if (dbLokasi && dbLokasi.length === 0) {
        await supabase.from('lokasi').insert([{ id: '1', ...DEFAULT_LOKASI }]);
      }

      // 3. Kontak
      const { data: dbKontak, error: errKontak } = await supabase.from('kontak').select('*');
      if (!errKontak && dbKontak && dbKontak.length > 0) {
        localStorage.setItem(STORAGE_KEYS.KONTAK, JSON.stringify(dbKontak[0]));
      } else if (dbKontak && dbKontak.length === 0) {
        await supabase.from('kontak').insert([{ id: '1', ...DEFAULT_KONTAK }]);
      }

      // 4. Statistik
      const { data: dbStatistik, error: errStatistik } = await supabase.from('statistik').select('*');
      if (!errStatistik && dbStatistik && dbStatistik.length > 0) {
        const sortedStats = [...dbStatistik].sort((a, b) => a.id.localeCompare(b.id));
        localStorage.setItem(STORAGE_KEYS.STATISTIK, JSON.stringify(sortedStats));
      } else if (dbStatistik && dbStatistik.length === 0) {
        await supabase.from('statistik').insert(DEFAULT_STATISTIK);
      }

      // 5. Aparatur
      const { data: dbAparatur, error: errAparatur } = await supabase.from('aparatur').select('*');
      if (!errAparatur && dbAparatur) {
        if (dbAparatur.length > 0) {
          const sortedAparatur = [...dbAparatur].sort((a, b) => a.urutan - b.urutan);
          localStorage.setItem(STORAGE_KEYS.APARATUR, JSON.stringify(sortedAparatur));
        } else {
          await supabase.from('aparatur').insert(DEFAULT_APARATUR);
        }
      }

      // 6. Berita
      const { data: dbBerita, error: errBerita } = await supabase.from('berita').select('*');
      if (!errBerita && dbBerita) {
        if (dbBerita.length > 0) {
          const sortedBerita = [...dbBerita].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
          localStorage.setItem(STORAGE_KEYS.BERITA, JSON.stringify(sortedBerita));
        } else {
          await supabase.from('berita').insert(DEFAULT_BERITA);
        }
      }

      // 7. Galeri
      const { data: dbGaleri, error: errGaleri } = await supabase.from('galeri').select('*');
      if (!errGaleri && dbGaleri) {
        if (dbGaleri.length > 0) {
          localStorage.setItem(STORAGE_KEYS.GALERI, JSON.stringify(dbGaleri));
        } else {
          await supabase.from('galeri').insert(DEFAULT_GALERI);
        }
      }

      // 8. Layanan
      const { data: dbLayanan, error: errLayanan } = await supabase.from('layanan').select('*');
      if (!errLayanan && dbLayanan) {
        if (dbLayanan.length > 0) {
          localStorage.setItem(STORAGE_KEYS.LAYANAN, JSON.stringify(dbLayanan));
        } else {
          await supabase.from('layanan').insert(DEFAULT_LAYANAN);
        }
      }

      // 9. Pesan
      const { data: dbPesan, error: errPesan } = await supabase.from('pesan').select('*');
      if (!errPesan && dbPesan) {
        if (dbPesan.length > 0) {
          localStorage.setItem(STORAGE_KEYS.PESAN, JSON.stringify(dbPesan));
        } else {
          await supabase.from('pesan').insert(DEFAULT_PESAN);
        }
      }

      console.log('Successfully synced data with Supabase.');
      return true;
    } catch (e) {
      console.error('Error syncing with Supabase:', e);
      return false;
    }
  },

  // Reset all data to seed defaults
  resetToDefaults: async () => {
    localStorage.setItem(STORAGE_KEYS.PROFIL, JSON.stringify(DEFAULT_PROFIL));
    localStorage.setItem(STORAGE_KEYS.APARATUR, JSON.stringify(DEFAULT_APARATUR));
    localStorage.setItem(STORAGE_KEYS.BERITA, JSON.stringify(DEFAULT_BERITA));
    localStorage.setItem(STORAGE_KEYS.GALERI, JSON.stringify(DEFAULT_GALERI));
    localStorage.setItem(STORAGE_KEYS.LAYANAN, JSON.stringify(DEFAULT_LAYANAN));
    localStorage.setItem(STORAGE_KEYS.LOKASI, JSON.stringify(DEFAULT_LOKASI));
    localStorage.setItem(STORAGE_KEYS.KONTAK, JSON.stringify(DEFAULT_KONTAK));
    localStorage.setItem(STORAGE_KEYS.PESAN, JSON.stringify(DEFAULT_PESAN));
    localStorage.setItem(STORAGE_KEYS.STATISTIK, JSON.stringify(DEFAULT_STATISTIK));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('profil').upsert([{ id: '1', ...DEFAULT_PROFIL }]);
        await supabase.from('lokasi').upsert([{ id: '1', ...DEFAULT_LOKASI }]);
        await supabase.from('kontak').upsert([{ id: '1', ...DEFAULT_KONTAK }]);
        
        await supabase.from('statistik').delete().neq('id', '0');
        await supabase.from('statistik').insert(DEFAULT_STATISTIK);
        
        await supabase.from('aparatur').delete().neq('id', '0');
        await supabase.from('aparatur').insert(DEFAULT_APARATUR);
        
        await supabase.from('berita').delete().neq('id', '0');
        await supabase.from('berita').insert(DEFAULT_BERITA);
        
        await supabase.from('galeri').delete().neq('id', '0');
        await supabase.from('galeri').insert(DEFAULT_GALERI);
        
        await supabase.from('layanan').delete().neq('id', '0');
        await supabase.from('layanan').insert(DEFAULT_LAYANAN);
        
        await supabase.from('pesan').delete().neq('id', '0');
        await supabase.from('pesan').insert(DEFAULT_PESAN);
      } catch (e) {
        console.error('Error resetting Supabase defaults:', e);
      }
    }
  },

  // Profil
  getProfil: () => getStorage(STORAGE_KEYS.PROFIL, DEFAULT_PROFIL),
  updateProfil: (data) => {
    setStorage(STORAGE_KEYS.PROFIL, data);
    if (isSupabaseConfigured()) {
      supabase.from('profil').upsert([{ id: '1', ...data }]).then(({ error }) => {
        if (error) console.error('Supabase Profil update error:', error);
      });
    }
  },

  // Lokasi
  getLokasi: () => getStorage(STORAGE_KEYS.LOKASI, DEFAULT_LOKASI),
  updateLokasi: (data) => {
    setStorage(STORAGE_KEYS.LOKASI, data);
    if (isSupabaseConfigured()) {
      supabase.from('lokasi').upsert([{ id: '1', ...data }]).then(({ error }) => {
        if (error) console.error('Supabase Lokasi update error:', error);
      });
    }
  },

  // Kontak
  getKontak: () => getStorage(STORAGE_KEYS.KONTAK, DEFAULT_KONTAK),
  updateKontak: (data) => {
    setStorage(STORAGE_KEYS.KONTAK, data);
    if (isSupabaseConfigured()) {
      supabase.from('kontak').upsert([{ id: '1', ...data }]).then(({ error }) => {
        if (error) console.error('Supabase Kontak update error:', error);
      });
    }
  },

  // Statistik
  getStatistik: () => getStorage(STORAGE_KEYS.STATISTIK, DEFAULT_STATISTIK),
  updateStatistik: (data) => {
    setStorage(STORAGE_KEYS.STATISTIK, data);
    if (isSupabaseConfigured()) {
      supabase.from('statistik').upsert(data).then(({ error }) => {
        if (error) console.error('Supabase Statistik update error:', error);
      });
    }
  },

  // Aparatur (CRUD)
  getAparatur: () => getStorage(STORAGE_KEYS.APARATUR, DEFAULT_APARATUR),
  addAparatur: (item) => {
    const list = getStorage(STORAGE_KEYS.APARATUR, DEFAULT_APARATUR);
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [...list, newItem];
    setStorage(STORAGE_KEYS.APARATUR, updated);
    if (isSupabaseConfigured()) {
      supabase.from('aparatur').insert([newItem]).then(({ error }) => {
        if (error) console.error('Supabase addAparatur error:', error);
      });
    }
    return newItem;
  },
  updateAparatur: (id, item) => {
    const list = getStorage(STORAGE_KEYS.APARATUR, DEFAULT_APARATUR);
    const updatedItem = { id, ...item };
    const updated = list.map(x => x.id === id ? updatedItem : x);
    setStorage(STORAGE_KEYS.APARATUR, updated);
    if (isSupabaseConfigured()) {
      supabase.from('aparatur').upsert([updatedItem]).then(({ error }) => {
        if (error) console.error('Supabase updateAparatur error:', error);
      });
    }
  },
  deleteAparatur: (id) => {
    const list = getStorage(STORAGE_KEYS.APARATUR, DEFAULT_APARATUR);
    const updated = list.filter(x => x.id !== id);
    setStorage(STORAGE_KEYS.APARATUR, updated);
    if (isSupabaseConfigured()) {
      supabase.from('aparatur').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteAparatur error:', error);
      });
    }
  },

  // Berita (CRUD)
  getBerita: () => getStorage(STORAGE_KEYS.BERITA, DEFAULT_BERITA),
  getBeritaBySlug: (slug) => {
    const list = getStorage(STORAGE_KEYS.BERITA, DEFAULT_BERITA);
    return list.find(x => x.slug === slug);
  },
  addBerita: (item) => {
    const list = getStorage(STORAGE_KEYS.BERITA, DEFAULT_BERITA);
    const slug = item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newItem = { ...item, id: Date.now().toString(), slug, tanggal: item.tanggal || new Date().toISOString().split('T')[0] };
    const updated = [newItem, ...list];
    setStorage(STORAGE_KEYS.BERITA, updated);
    if (isSupabaseConfigured()) {
      supabase.from('berita').insert([newItem]).then(({ error }) => {
        if (error) console.error('Supabase addBerita error:', error);
      });
    }
    return newItem;
  },
  updateBerita: (id, item) => {
    const list = getStorage(STORAGE_KEYS.BERITA, DEFAULT_BERITA);
    const slug = item.judul ? item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined;
    const existing = list.find(x => x.id === id) || {};
    const updatedItem = { ...existing, ...item, ...(slug ? { slug } : {}) };
    const updated = list.map(x => x.id === id ? updatedItem : x);
    setStorage(STORAGE_KEYS.BERITA, updated);
    if (isSupabaseConfigured()) {
      supabase.from('berita').upsert([updatedItem]).then(({ error }) => {
        if (error) console.error('Supabase updateBerita error:', error);
      });
    }
  },
  deleteBerita: (id) => {
    const list = getStorage(STORAGE_KEYS.BERITA, DEFAULT_BERITA);
    const updated = list.filter(x => x.id !== id);
    setStorage(STORAGE_KEYS.BERITA, updated);
    if (isSupabaseConfigured()) {
      supabase.from('berita').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteBerita error:', error);
      });
    }
  },

  // Galeri (CRUD)
  getGaleri: () => getStorage(STORAGE_KEYS.GALERI, DEFAULT_GALERI),
  addGaleri: (item) => {
    const list = getStorage(STORAGE_KEYS.GALERI, DEFAULT_GALERI);
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...list];
    setStorage(STORAGE_KEYS.GALERI, updated);
    if (isSupabaseConfigured()) {
      supabase.from('galeri').insert([newItem]).then(({ error }) => {
        if (error) console.error('Supabase addGaleri error:', error);
      });
    }
    return newItem;
  },
  updateGaleri: (id, item) => {
    const list = getStorage(STORAGE_KEYS.GALERI, DEFAULT_GALERI);
    const existing = list.find(x => x.id === id) || {};
    const updatedItem = { ...existing, ...item };
    const updated = list.map(x => x.id === id ? updatedItem : x);
    setStorage(STORAGE_KEYS.GALERI, updated);
    if (isSupabaseConfigured()) {
      supabase.from('galeri').upsert([updatedItem]).then(({ error }) => {
        if (error) console.error('Supabase updateGaleri error:', error);
      });
    }
  },
  deleteGaleri: (id) => {
    const list = getStorage(STORAGE_KEYS.GALERI, DEFAULT_GALERI);
    const updated = list.filter(x => x.id !== id);
    setStorage(STORAGE_KEYS.GALERI, updated);
    if (isSupabaseConfigured()) {
      supabase.from('galeri').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteGaleri error:', error);
      });
    }
  },

  // Layanan (CRUD)
  getLayanan: () => getStorage(STORAGE_KEYS.LAYANAN, DEFAULT_LAYANAN),
  addLayanan: (item) => {
    const list = getStorage(STORAGE_KEYS.LAYANAN, DEFAULT_LAYANAN);
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [...list, newItem];
    setStorage(STORAGE_KEYS.LAYANAN, updated);
    if (isSupabaseConfigured()) {
      supabase.from('layanan').insert([newItem]).then(({ error }) => {
        if (error) console.error('Supabase addLayanan error:', error);
      });
    }
    return newItem;
  },
  updateLayanan: (id, item) => {
    const list = getStorage(STORAGE_KEYS.LAYANAN, DEFAULT_LAYANAN);
    const existing = list.find(x => x.id === id) || {};
    const updatedItem = { ...existing, ...item };
    const updated = list.map(x => x.id === id ? updatedItem : x);
    setStorage(STORAGE_KEYS.LAYANAN, updated);
    if (isSupabaseConfigured()) {
      supabase.from('layanan').upsert([updatedItem]).then(({ error }) => {
        if (error) console.error('Supabase updateLayanan error:', error);
      });
    }
  },
  deleteLayanan: (id) => {
    const list = getStorage(STORAGE_KEYS.LAYANAN, DEFAULT_LAYANAN);
    const updated = list.filter(x => x.id !== id);
    setStorage(STORAGE_KEYS.LAYANAN, updated);
    if (isSupabaseConfigured()) {
      supabase.from('layanan').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteLayanan error:', error);
      });
    }
  },

  // Pesan / Inbox
  getPesan: () => getStorage(STORAGE_KEYS.PESAN, DEFAULT_PESAN),
  addPesan: (pesanObj) => {
    const list = getStorage(STORAGE_KEYS.PESAN, DEFAULT_PESAN);
    const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    const newItem = { ...pesanObj, id: Date.now().toString(), tanggal: dateStr, isRead: false };
    const updated = [newItem, ...list];
    setStorage(STORAGE_KEYS.PESAN, updated);
    if (isSupabaseConfigured()) {
      supabase.from('pesan').insert([newItem]).then(({ error }) => {
        if (error) console.error('Supabase addPesan error:', error);
      });
    }
    return newItem;
  },
  markPesanAsRead: (id) => {
    const list = getStorage(STORAGE_KEYS.PESAN, DEFAULT_PESAN);
    const existing = list.find(x => x.id === id) || {};
    const updatedItem = { ...existing, isRead: true };
    const updated = list.map(x => x.id === id ? updatedItem : x);
    setStorage(STORAGE_KEYS.PESAN, updated);
    if (isSupabaseConfigured()) {
      supabase.from('pesan').upsert([updatedItem]).then(({ error }) => {
        if (error) console.error('Supabase markPesanAsRead error:', error);
      });
    }
  },
  deletePesan: (id) => {
    const list = getStorage(STORAGE_KEYS.PESAN, DEFAULT_PESAN);
    const updated = list.filter(x => x.id !== id);
    setStorage(STORAGE_KEYS.PESAN, updated);
    if (isSupabaseConfigured()) {
      supabase.from('pesan').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deletePesan error:', error);
      });
    }
  },

  // Admin Auth simulation
  isLoggedIn: () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },
  login: (email, password) => {
    if (email === 'admin@gampongbaro.id' && password === 'admin123') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return { success: true };
    }
    if (email === 'samudra2626@gmail.com' && password === 'admin123') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah' };
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
};
