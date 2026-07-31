import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { Lock, Mail, KeyRound, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = DataService.login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10 text-white">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg font-bold text-xl mb-3">
            GB
          </div>
          <h1 className="font-serif font-bold text-2xl text-white">Login Panel Admin</h1>
          <p className="text-xs text-slate-400">Masuk untuk mengelola konten Web Profil Gampong Baro</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Credentials Info Box */}
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
          <p className="font-bold text-emerald-400">🔑 Kredensial Login Default:</p>
          <p>• Email: <code className="text-white bg-slate-900 px-1 py-0.5 rounded">admin@gampongbaro.id</code> atau <code className="text-white bg-slate-900 px-1 py-0.5 rounded">samudra2626@gmail.com</code></p>
          <p>• Password: <code className="text-white bg-slate-900 px-1 py-0.5 rounded">admin123</code></p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Admin</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> Masuk ke Panel Admin
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Publik
          </Link>
        </div>

      </div>
    </div>
  );
}
