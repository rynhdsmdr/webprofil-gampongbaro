import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Plus, Edit, Trash2, X, CheckCircle2, UserPlus } from 'lucide-react';

export default function AparaturPage() {
  const [list, setList] = useState(DataService.getAparatur());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    foto: '',
    telepon: ''
  });

  const reloadData = () => setList(DataService.getAparatur());

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      jabatan: '',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      telepon: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      nama: item.nama,
      jabatan: item.jabatan,
      foto: item.foto,
      telepon: item.telepon || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus aparatur ${nama}?`)) {
      DataService.deleteAparatur(id);
      reloadData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      DataService.updateAparatur(editingId, formData);
    } else {
      DataService.addAparatur(formData);
    }
    setIsModalOpen(false);
    reloadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Kelola Aparatur Desa</h2>
          <p className="text-xs text-slate-500">Tambah, ubah, atau hapus jajaran perangkat Gampong Baro.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Aparatur Baru
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <img src={item.foto} alt={item.nama} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-sm leading-snug">{item.nama}</h3>
                <p className="text-emerald-700 text-xs font-semibold">{item.jabatan}</p>
                <p className="text-[11px] text-slate-400 mt-1">{item.telepon || 'Tanpa no. telp'}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1 transition"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(item.id, item.nama)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700 text-xs font-semibold flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                {editingId ? 'Edit Aparatur' : 'Tambah Aparatur Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Jabatan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kaur Keuangan / Sekdes"
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Foto Profil *</label>
                <input
                  type="text"
                  required
                  value={formData.foto}
                  onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">No. Telepon / HP</label>
                <input
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
