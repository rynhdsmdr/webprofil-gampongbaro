import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Plus, Edit, Trash2, X, Layers } from 'lucide-react';

export default function LayananPage() {
  const [list, setList] = useState(DataService.getLayanan());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    persyaratan: [],
    prosedur: '',
    status: 'Aktif'
  });
  const [syaratInput, setSyaratInput] = useState('');

  const reloadData = () => setList(DataService.getLayanan());

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      deskripsi: '',
      persyaratan: ['Fotokopi KTP', 'Fotokopi KK'],
      prosedur: '1. Pengajuan ke kantor desa -> 2. Pemrosesan dokumen.',
      status: 'Aktif'
    });
    setSyaratInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setSyaratInput('');
    setIsModalOpen(true);
  };

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus layanan "${nama}"?`)) {
      DataService.deleteLayanan(id);
      reloadData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      DataService.updateLayanan(editingId, formData);
    } else {
      DataService.addLayanan(formData);
    }
    setIsModalOpen(false);
    reloadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-slate-900">Kelola Layanan Administrasi</h2>
          <p className="text-xs text-slate-500">Tambah dan perbarui jenis layanan persuratan gampong.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Layanan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">{item.nama}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{item.deskripsi}</p>
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-700 block">Syarat:</span>
                <ul className="list-disc list-inside text-slate-500 pl-1">
                  {item.persyaratan.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id, item.nama)} className="p-1.5 rounded bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
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
                {editingId ? 'Edit Layanan' : 'Tambah Layanan Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Layanan / Surat *</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Layanan *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Persyaratan Berkas (Pisahkan dengan Koma)</label>
                <input
                  type="text"
                  placeholder="Contoh: KTP, KK, Surat Pengantar RT"
                  value={formData.persyaratan.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    persyaratan: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Alur / Prosedur</label>
                <textarea
                  rows={2}
                  value={formData.prosedur}
                  onChange={(e) => setFormData({ ...formData, prosedur: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow">
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
