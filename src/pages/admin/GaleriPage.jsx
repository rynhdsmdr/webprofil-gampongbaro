import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function GaleriPage() {
  const [list, setList] = useState(DataService.getGaleri());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    kategori: 'Alam & Potensi',
    tipe: 'Foto',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80',
    deskripsi: ''
  });

  const reloadData = () => setList(DataService.getGaleri());

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      judul: '',
      kategori: 'Kegiatan Gampong',
      tipe: 'Foto',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80',
      deskripsi: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id, judul) => {
    if (window.confirm(`Hapus foto galeri "${judul}"?`)) {
      DataService.deleteGaleri(id);
      reloadData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      DataService.updateGaleri(editingId, formData);
    } else {
      DataService.addGaleri(formData);
    }
    setIsModalOpen(false);
    reloadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Kelola Galeri Foto</h2>
          <p className="text-xs text-slate-500">Upload dan kelola foto kegiatan serta potensi gampong.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Foto Galeri
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="h-44 overflow-hidden relative">
              <img src={item.url} alt={item.judul} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                {item.kategori}
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">{item.judul}</h4>
                <p className="text-slate-500 text-xs line-clamp-2">{item.deskripsi}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id, item.judul)} className="p-1.5 rounded bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingId ? 'Edit Galeri Foto' : 'Tambah Foto Galeri'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Foto *</label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Kategori Album *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Alam & Potensi / Kegiatan Gampong / UMKM"
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Gambar / Foto *</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow">
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
