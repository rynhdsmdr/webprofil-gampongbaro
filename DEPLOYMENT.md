# 🚀 Panduan Deployment Publik Gratis & Custom Domain
## Web Profil Gampong Baro

Dokumen ini menjelaskan langkah demi langkah untuk men-deploy Web Profil Gampong Baro ke publik secara **100% GRATIS** menggunakan Vercel dan menghubungkannya dengan domain desa `.desa.id`.

---

## Opsi Deployment Gratis Terbaik: Vercel

Vercel adalah platform hosting gratis dengan performa tinggi, gratis SSL (HTTPS otomatis), CDN global ultra-cepat, dan integrasi otomatis dengan GitHub.

---

## Langkah 1: Push Kode Proyek ke GitHub

1. Buat repository baru di [GitHub.com](https://github.com) dengan nama `web-profil-gampong-baro`.
2. Di PowerShell / Terminal komputer Anda, jalankan perintah berikut:

```powershell
git init
git add .
git commit -m "Initial commit - Web Profil Gampong Baro"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/web-profil-gampong-baro.git
git push -u origin main
```

---

## Langkah 2: Deploy Gratis ke Vercel

1. Buka [Vercel.com](https://vercel.com) dan buat akun (Login menggunakan akun GitHub Anda).
2. Klik tombol **"Add New..."** → **"Project"**.
3. Pilih repository `web-profil-gampong-baro` dari daftar GitHub Anda.
4. Pada **Framework Preset**, Vercel akan otomatis mendeteksi **Vite**.
5. Klik **"Deploy"**.
6. Dalam waktu kurang dari 1 menit, website Anda sudah **LIVE** dan dapat diakses oleh publik di seluruh dunia via link otomatis (contoh: `https://web-profil-gampong-baro.vercel.app`).

---

## Langkah 3: Menghubungkan Domain Desa (`gampongbaro.desa.id`)

### A. Cara Memperoleh Domain `.desa.id` Gratis dari Pemerintah / PANDI
1. Domain `.desa.id` dikelola resmi oleh PANDI (Pengelola Nama Domain Internet Indonesia) dan Kominfo.
2. Persyaratan pengajuan domain desa:
   - Surat Permohonan Domain dari Geuchik / Sekretaris Desa.
   - SK Pengangkatan Geuchik / Aparatur Desa.
3. Pendaftaran dilakukan di portal resmi PANDI atau registrar mitra (seperti Rumahweb, Niagahoster, dll).

### B. Cara Menghubungkan Domain ke Vercel
1. Masuk ke Dashboard Vercel → Pilih Project `web-profil-gampong-baro`.
2. Pergi ke **Settings** → **Domains**.
3. Ketikkan domain desa Anda: `gampongbaro.desa.id` → Klik **Add**.
4. Vercel akan memberikan DNS Records yang perlu diisi di panel domain (DNS Manager):
   - **Type A**: `@` → `76.76.21.21`
   - **Type CNAME**: `www` → `cname.vercel-dns.com`
5. Setelah DNS tersimpan, Vercel akan otomatis menerbitkan **Sertifikat SSL (HTTPS)** gratis untuk domain `gampongbaro.desa.id`.

---

## Verifikasi Deployment
- ✅ SSL / HTTPS otomatis aktif (Ikon gembok hijau di browser).
- ✅ Leaflet.js Peta Interaktif berjalan mulus di URL publik.
- ✅ Panel Admin `/admin/login` berfungsi penuh.
- ✅ Form Kontak pesan terhubung langsung.

---
*Dikembangkan untuk Program Kerja KKN — Gampong Baro*
