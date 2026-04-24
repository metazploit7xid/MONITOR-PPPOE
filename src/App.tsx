import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { LayoutDashboard, BellRing, Settings, Activity, Sun, Moon } from 'lucide-react';
import DashboardPage from './components/DashboardPage';
import NotificationsPage from './components/NotificationsPage';
import RoutersPage from './components/RoutersPage';

const socket = io();

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState<any[]>([]);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [stats, setStats] = useState({ activeCount: 0, totalEvents: 0 });
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Clock
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).replace(/\./g, ':'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      setConnectionStatus('Online');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('Offline');
    });

    socket.on('initial_state', (data) => {
      setEvents(data.events);
      setActiveSessions(data.activeSessions);
      setStats(data.stats);
    });

    socket.on('new_event', (eventData) => {
      setEvents(prev => [...prev, eventData].slice(-200));
      if (eventData.event === 'login') {
        setActiveSessions(prev => {
          const filtered = prev.filter(s => s.routerId !== eventData.routerId || s.user !== eventData.user);
          return [...filtered, eventData];
        });
      } else if (eventData.event === 'logout') {
        setActiveSessions(prev => prev.filter(s => s.routerId !== eventData.routerId || s.user !== eventData.user));
      }
    });

    socket.on('stats_update', (newStats) => {
      setStats(newStats);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('initial_state');
      socket.off('new_event');
      socket.off('stats_update');
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#070B14] font-sans text-slate-800 dark:text-gray-100 selection:bg-blue-500/30 overflow-hidden transition-colors duration-300">
      {/* Sidebar - Clean/Sci-Fi style */}
      <aside className="w-72 flex flex-col hidden md:flex border-r border-slate-200 dark:border-[#1e293b]/50 relative shrink-0 bg-white dark:bg-transparent z-20">
        <div className="absolute inset-x-0 bottom-0 h-96 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600')] bg-cover bg-center opacity-[0.03] dark:opacity-0 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white dark:from-[#070B14]/80 dark:via-[#070B14]/90 dark:to-[#070B14]"></div>
        
        <div className="relative z-10 flex flex-col h-full p-5">
          <div className="mb-8 mt-2 flex items-center space-x-3 px-2">
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
            <div>
              <h1 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">Monitor PPPoE</h1>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-mono tracking-wider">Gateway MikroTik</p>
            </div>
          </div>
          
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-50 dark:bg-transparent dark:bg-gradient-to-r dark:from-blue-900/40 dark:to-blue-900/5 border border-blue-100 dark:border-blue-500/30 shadow-[inset_0px_0px_20px_rgba(59,130,246,0.05)] dark:shadow-[inset_0px_0px_20px_rgba(59,130,246,0.15)] text-blue-700 dark:text-white relative outline outline-1 outline-blue-200/50 dark:outline-blue-500/20' 
                  : 'hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className={`h-5 w-5 ${activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className="font-medium text-sm">Dashboard Langsung</span>
              {activeTab === 'dashboard' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.4)] dark:shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                activeTab === 'notifications' 
                  ? 'bg-blue-50 dark:bg-transparent dark:bg-gradient-to-r dark:from-blue-900/40 dark:to-blue-900/5 border border-blue-100 dark:border-blue-500/30 shadow-[inset_0px_0px_20px_rgba(59,130,246,0.05)] dark:shadow-[inset_0px_0px_20px_rgba(59,130,246,0.15)] text-blue-700 dark:text-white relative outline outline-1 outline-blue-200/50 dark:outline-blue-500/20' 
                  : 'hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BellRing className={`h-5 w-5 ${activeTab === 'notifications' ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className="font-medium text-sm">Pengaturan Notifikasi</span>
              {activeTab === 'notifications' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.4)] dark:shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
            </button>
            <button
              onClick={() => setActiveTab('routers')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                activeTab === 'routers' 
                  ? 'bg-blue-50 dark:bg-transparent dark:bg-gradient-to-r dark:from-blue-900/40 dark:to-blue-900/5 border border-blue-100 dark:border-blue-500/30 shadow-[inset_0px_0px_20px_rgba(59,130,246,0.05)] dark:shadow-[inset_0px_0px_20px_rgba(59,130,246,0.15)] text-blue-700 dark:text-white relative outline outline-1 outline-blue-200/50 dark:outline-blue-500/20' 
                  : 'hover:bg-slate-50 dark:hover:bg-[#1E293B]/40 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Settings className={`h-5 w-5 ${activeTab === 'routers' ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className="font-medium text-sm">Konfigurasi Router</span>
              {activeTab === 'routers' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.4)] dark:shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
            </button>
          </nav>

          <div className="mt-auto block bg-slate-50/80 dark:bg-[#0F1626]/80 backdrop-blur-md border border-slate-200 dark:border-[#1e293b]/80 rounded-2xl p-4 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center w-3 h-3">
                  <div className={`absolute inset-0 rounded-full ${connectionStatus === 'Online' ? 'bg-emerald-500/40 animate-ping' : 'bg-rose-500/40'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${connectionStatus === 'Online' ? 'bg-emerald-500' : 'bg-rose-500'} shadow-[0_0_8px_rgba(16,185,129,0.8)]`}></div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wider uppercase">Sistem: <span className={connectionStatus === 'Online' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>{connectionStatus === 'Online' ? 'Aktif' : 'Memuat...'}</span></div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 border-t border-slate-200 dark:border-slate-800/80 pt-2 font-mono">
                {activeSessions.length > 0 ? `${activeSessions.length} Router Terhubung` : 'Siap menerima data'}
              </div>
            </div>
          </div>
          
          <div className="mt-4 px-2 flex justify-between items-end">
            <div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mb-1">Waktu Sistem</div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400 tracking-wider">
                {currentTime}
              </div>
            </div>
            <button
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
               className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
               title="Toggle Theme"
            >
               {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#F8FAFC] dark:bg-[#04070D] flex flex-col relative w-full lg:rounded-tl-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.05)] dark:shadow-[-20px_0_30px_rgba(0,0,0,0.5)] border-l border-slate-200 dark:border-[#1e293b]/40">
        <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        {activeTab === 'dashboard' && (
          <DashboardPage events={events} activeSessions={activeSessions} stats={stats} />
        )}
        {activeTab === 'notifications' && (
          <NotificationsPage />
        )}
        {activeTab === 'routers' && (
          <RoutersPage />
        )}
      </main>
    </div>
  );
}
