import React, { useState, useEffect } from 'react';
import { Plus, Router, Trash2, Save, X } from 'lucide-react';

export default function RoutersPage() {
  const [routers, setRouters] = useState<any[]>(() => {
    const saved = localStorage.getItem('mikrotik_routers');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newRouter, setNewRouter] = useState({ id: '', name: '', ip: '' });

  useEffect(() => {
    localStorage.setItem('mikrotik_routers', JSON.stringify(routers));
  }, [routers]);

  const handleAddRouter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouter.id || !newRouter.name) return;
    
    setRouters([...routers, { ...newRouter, createdAt: new Date().toISOString() }]);
    setNewRouter({ id: '', name: '', ip: '' });
    setIsAdding(false);
  };

  const deleteRouter = (id: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus router ${id}?`)) {
      setRouters(routers.filter(r => r.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Daftar MikroTik</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola daftar MikroTik yang terhubung dengan sistem ini.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah MikroTik</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-sm rounded-xl p-6 mb-8 mt-4 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Tambah MikroTik Baru</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleAddRouter} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID Router / Identity</label>
              <input
                type="text"
                required
                value={newRouter.id}
                onChange={e => setNewRouter({...newRouter, id: e.target.value})}
                placeholder="mis. RTR-JKT-01"
                className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Harus sama dengan Identity di MikroTik</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama / Lokasi</label>
              <input
                type="text"
                required
                value={newRouter.name}
                onChange={e => setNewRouter({...newRouter, name: e.target.value})}
                placeholder="mis. Cabang Pusat"
                className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat IP (Opsional)</label>
              <input
                type="text"
                value={newRouter.ip}
                onChange={e => setNewRouter({...newRouter, ip: e.target.value})}
                placeholder="mis. IP L2TP VPN, IP Public, dsb."
                className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kosongkan jika tidak ada. Sistem menggunakan Webhook sehingga IP statis tidak diwajibkan.</p>
            </div>
            <div className="md:col-span-3 flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-2 font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Router</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-sm rounded-xl overflow-hidden">
        {routers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-white/5 rounded-full flex items-center justify-center mb-4">
              <Router className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Belum ada MikroTik</h3>
            <p className="text-sm">Silakan tambah router MikroTik untuk mulai mengelola perangkat terhubung.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800/80 border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              <tr>
                <th className="px-6 py-4">ID Router</th>
                <th className="px-6 py-4">Nama / Lokasi</th>
                <th className="px-6 py-4">Remote Alamat IP</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {routers.map((router) => (
                <tr key={router.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <Router className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span>{router.id}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{router.name}</td>
                  <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400 text-xs">{router.ip || '-'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => deleteRouter(router.id)}
                      className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
