import { format } from 'date-fns';
import { Users, LogIn, LogOut, Activity, Search, Router as RouterIcon } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage({ events, activeSessions, stats }: { events: any[], activeSessions: any[], stats: any }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEvents = events.filter((e) => 
    e.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.routerId.toLowerCase().includes(searchTerm.toLowerCase())
  ).reverse();

  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in duration-700 max-w-screen-2xl mx-auto w-full z-10 relative">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative">
        <div className="absolute -top-10 -right-10 md:right-0 w-[400px] h-[200px] bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80')] bg-cover bg-center mix-blend-screen dark:opacity-40 opacity-0 blur-[1px] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 md:right-0 w-[500px] h-[300px] bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80')] bg-cover bg-center mix-blend-multiply opacity-10 dark:opacity-0 blur-[2px] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">Dashboard Langsung</h2>
          <p className="text-slate-500 dark:text-blue-200/60 mt-2 font-medium tracking-wide">Pemantauan autentikasi PPPoE waktu nyata</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="bg-white dark:bg-[#0F1626]/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-blue-500/20 shadow-sm p-6 flex flex-col justify-center space-y-4 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 dark:from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-blue-50 dark:bg-[#17223B] rounded-xl relative border border-blue-100 dark:border-blue-500/10 dark:shadow-[inset_0_0_12px_rgba(59,130,246,0.2)]">
               <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-500/20 blur-md rounded-xl"></div>
              <Users className="w-7 h-7 text-blue-500 dark:text-blue-400 relative z-10 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">Sesi Aktif</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm">{stats.activeCount}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#0F1626]/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/20 shadow-sm p-6 flex flex-col justify-center space-y-4 relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-colors">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/5 dark:from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-emerald-50 dark:bg-[#17223B] rounded-xl relative border border-emerald-100 dark:border-emerald-500/10 dark:shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]">
               <div className="absolute inset-0 bg-emerald-400/20 dark:bg-emerald-500/20 blur-md rounded-xl"></div>
              <LogIn className="w-7 h-7 text-emerald-500 dark:text-emerald-400 relative z-10 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">Total Login</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm">{events.filter(e => e.event === 'login').length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#0F1626]/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-rose-500/20 shadow-sm p-6 flex flex-col justify-center space-y-4 relative overflow-hidden group hover:border-rose-300 dark:hover:border-rose-500/40 transition-colors">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/5 dark:from-rose-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-rose-50 dark:bg-[#17223B] rounded-xl relative border border-rose-100 dark:border-rose-500/10 dark:shadow-[inset_0_0_12px_rgba(244,63,94,0.2)]">
               <div className="absolute inset-0 bg-rose-400/20 dark:bg-rose-500/20 blur-md rounded-xl"></div>
              <LogOut className="w-7 h-7 text-rose-500 dark:text-rose-400 relative z-10 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">Total Logout</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm">{events.filter(e => e.event === 'logout').length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#0F1626]/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-purple-500/20 shadow-sm p-6 flex flex-col justify-center space-y-4 relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-500/40 transition-colors">
           <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/5 dark:from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-purple-50 dark:bg-[#17223B] rounded-xl relative border border-purple-100 dark:border-purple-500/10 dark:shadow-[inset_0_0_12px_rgba(168,85,247,0.2)]">
               <div className="absolute inset-0 bg-purple-400/20 dark:bg-purple-500/20 blur-md rounded-xl"></div>
              <Activity className="w-7 h-7 text-purple-500 dark:text-purple-400 relative z-10 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">Total Peristiwa</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 drop-shadow-sm">{stats.totalEvents}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Event Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-[#090E17]/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-[#1e293b]/60 overflow-hidden flex flex-col shadow-sm dark:shadow-2xl relative">
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-transparent dark:bg-gradient-to-br dark:from-blue-500/5 dark:to-transparent pointer-events-none"></div>
          <div className="p-6 border-b border-slate-200 dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-[#0B111D] gap-4 relative z-10">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              Aliran Peristiwa
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari user atau router..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#131B2A] border border-slate-200 dark:border-[#1E293B] rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-slate-500 w-full sm:w-72 transition-all shadow-inner"
              />
            </div>
          </div>
          
          <div className="overflow-auto max-h-[600px] p-0 relative z-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50/90 dark:bg-[#0B111D]/90 backdrop-blur-sm sticky top-0 border-b border-slate-200 dark:border-[#1e293b] z-20 text-slate-500 dark:text-slate-400 font-medium tracking-wider text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Waktu</th>
                  <th className="px-6 py-4">Peristiwa</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Alamat IP</th>
                  <th className="px-6 py-4">ID Router</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1e293b]/50">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center relative">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-[#131B2A] border border-blue-100 dark:border-blue-500/20 shadow-sm dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex items-center justify-center relative">
                           <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-500/10 blur-xl rounded-full"></div>
                           <Activity className="w-10 h-10 text-blue-400 dark:text-blue-500/50 relative z-10" />
                           <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#0B111D] rounded-full p-1 border border-slate-200 dark:border-[#1e293b]">
                              <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">x</div>
                           </div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Belum ada peristiwa masuk.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-[#131B2A]/70 transition-colors group">
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono text-xs">
                        {format(new Date(e.receivedAt), 'HH:mm:ss')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase border shadow-sm ${
                          e.event === 'login' 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 dark:drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]' 
                            : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20 dark:drop-shadow-[0_0_5px_rgba(251,113,133,0.3)]'
                        }`}>
                          {e.event === 'login' ? 'LOGIN' : 'LOGOUT'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-gray-200 whitespace-nowrap capitalize tracking-wide">{e.user}</td>
                      <td className="px-6 py-4 font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{e.ip}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                          <RouterIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <span className="font-mono text-xs pt-0.5">{e.routerId}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Sessions Sidebar */}
        <div className="bg-white dark:bg-[#090E17]/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-[#1e293b]/60 overflow-hidden flex flex-col shadow-sm dark:shadow-2xl relative">
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-transparent dark:bg-gradient-to-bl dark:from-blue-500/5 dark:to-transparent pointer-events-none"></div>
          <div className="p-6 border-b border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#0B111D] flex justify-between items-center relative z-10">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-3 text-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              Sesi Aktif
            </h3>
            <span className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 py-1 px-3.5 rounded-full text-xs font-bold font-mono dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]">{activeSessions.length}</span>
          </div>
          <div className="p-3 overflow-auto max-h-[600px] relative z-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {activeSessions.length === 0 ? (
              <div className="p-10 text-center relative flex flex-col items-center justify-center">
                 <div className="w-40 h-40 relative flex items-center justify-center dark:opacity-30 opacity-60 mb-6">
                    <div className="absolute w-full h-[1px] bg-blue-200 dark:bg-blue-500/30 rotate-45 transform origin-center dark:shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute w-full h-[1px] bg-blue-200 dark:bg-blue-500/30 -rotate-45 transform origin-center dark:shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="w-24 h-24 rounded-full border border-blue-200 dark:border-blue-500/30 flex items-center justify-center absolute">
                       <div className="w-16 h-16 rounded-full border border-blue-200 dark:border-blue-500/30"></div>
                    </div>
                    <Users className="w-12 h-12 text-blue-300 dark:text-blue-400 absolute z-10 mix-blend-multiply dark:mix-blend-screen dark:drop-shadow-[0_0_15px_rgba(59,130,246,1)]" />
                 </div>
                 <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tidak ada sesi aktif saat ini.</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {activeSessions.map((session, i) => (
                  <li key={`${session.routerId}-${session.user}-${i}`} className="p-4 bg-slate-50 dark:bg-[#131B2A] hover:bg-slate-100 dark:hover:bg-[#1A2438] border border-slate-200 dark:border-[#1e293b]/50 rounded-xl transition-all flex items-center justify-between group">
                    <div>
                      <p className="font-semibold text-[13px] text-slate-900 dark:text-gray-200 capitalize tracking-wide group-hover:text-blue-700 dark:group-hover:text-white transition-colors">{session.user}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-1 whitespace-nowrap flex items-center gap-1.5">
                        <span className="text-blue-600 dark:text-blue-400/70">{session.routerId}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span> 
                        {session.ip}
                      </p>
                    </div>
                    <div className="relative flex items-center justify-center w-3 h-3 flex-shrink-0">
                       <div className="absolute inset-0 rounded-full bg-emerald-500/30 dark:bg-blue-500/30 animate-ping"></div>
                       <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-blue-400 dark:shadow-[0_0_8px_rgba(96,165,250,0.8)] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
