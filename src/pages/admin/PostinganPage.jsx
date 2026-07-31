import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Plus, Edit, Trash2, X, Newspaper, Calendar } from 'lucide-react';

export default function PostinganPage() {
  const [list, setList] = useState(DataService.getBerita());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    kategori: 'Berita',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    ringkasan: '',
    konten: '',
    penulis: 'Admin Gampong',
    status: 'Published'
  });

  const reloadData = () => setList(DataService.getBerita());

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      judul: '',
      kategori: 'Berita',
      thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      ringkasan: '',
      konten: '<p>Tuliskan isi berita atau pengumuman secara rinci di sini...</p>',
      penulis: 'Admin Gampong',
      status: 'Published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id, judul) => {
    if (window.confirm(`Hapus artikel "${judul}"?`)) {
      DataService.deleteBerita(id);
      reloadData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      DataService.updateBerita(editingId, formData);
    } else {
      DataService.addBerita(formData);
    }
    setIsModalOpen(false);
    reloadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Kelola Berita & Pengumuman</h2>
          <p className="text-xs text-slate-500">Publikasikan informasi kegiatan dan pengumuman desa.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tulis Postingan Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">Thumbnail & Judul</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4 text-right">Aksi CRUD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.judul} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm line-clamp-1">{item.judul}</h4>
                      <p className="text-slate-500 text-[11px] line-clamp-1">{item.ringkasan}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    item.kategori === 'Pengumuman' ? 'bg-amber-100 text-amber-800' : item.kategori === 'Kegiatan' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.kategori}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{item.tanggal}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.judul)} className="p-1.5 rounded bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingId ? 'Edit Postingan' : 'Buat Postingan Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Artikel / Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori *</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Penulis</label>
                  <input
                    type="text"
                    value={formData.penulis}
                    onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Gambar Thumbnail</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ringkasan Singkat *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Isi Konten Lengkap (HTML Supported)</label>
                <textarea
                  rows={6}
                  required
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow">
                  Simpan Postingan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
