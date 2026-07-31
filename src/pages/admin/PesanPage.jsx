import React, { useState } from 'react';
import { DataService } from '../../services/dataService';
import { Inbox, CheckCircle, Trash2, Mail, MailOpen } from 'lucide-react';

export default function PesanPage() {
  const [list, setList] = useState(DataService.getPesan());

  const reloadData = () => setList(DataService.getPesan());

  const handleMarkAsRead = (id) => {
    DataService.markPesanAsRead(id);
    reloadData();
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus pesan ini dari inbox?')) {
      DataService.deletePesan(id);
      reloadData();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-slate-900">Inbox Pesan Masuk</h2>
        <p className="text-xs text-slate-500">Pesan dan pertanyaan yang dikirimkan warga melalui form kontak website.</p>
      </div>

      {list.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-slate-700 text-base">Inbox Masih Kosong</h3>
          <p className="text-slate-400 text-xs">Belum ada pesan baru dari pengunjung atau warga desa.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition space-y-3 ${
                item.isRead ? 'bg-white border-slate-200 shadow-sm' : 'bg-emerald-50/60 border-emerald-300 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  {item.isRead ? (
                    <MailOpen className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Mail className="w-4 h-4 text-emerald-600 animate-bounce" />
                  )}
                  <span className="font-bold text-slate-900 text-sm">{item.nama}</span>
                  <span className="text-xs text-slate-500">({item.email})</span>
                </div>
                <span className="text-[11px] text-slate-400">{item.tanggal}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-emerald-900 text-sm">{item.subjek || 'Tanpa Subjek'}</h4>
                <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">{item.pesan}</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 text-xs">
                {!item.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 transition"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Tandai Sudah Dibaca
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700 font-semibold flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
