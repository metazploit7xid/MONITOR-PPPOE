import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, MessageCircle, Send, CheckCircle2, ChevronRight, Laptop } from 'lucide-react';

export default function NotificationsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'telegram' | 'web'>('web');
  
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  // Dummy links for configuration
  const configLinks = {
    whatsapp: 'https://wa.me/123456789?text=START+MONITOR',
    telegram: 'https://t.me/MikroTikMonitorBot?start=monitor',
    web: `${baseUrl}/api/mikrotik/webhook`
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Pengaturan Notifikasi</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Pindai kode QR di bawah ini untuk menerima notifikasi login dan logout PPPoE secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Webhook Form */}
        <button 
          onClick={() => setSelectedPlatform('web')}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
            selectedPlatform === 'web' 
              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-md transform scale-[1.02]' 
              : 'border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-gray-50 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900'
          }`}
        >
          <div className={`p-4 rounded-full mb-3 ${selectedPlatform === 'web' ? 'bg-indigo-600 dark:bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}>
            <Laptop className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Router MikroTik</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">Konfigurasi Webhook</p>
        </button>

        {/* Telegram Form */}
        <button 
          onClick={() => setSelectedPlatform('telegram')}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
            selectedPlatform === 'telegram' 
              ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/10 shadow-md transform scale-[1.02]' 
              : 'border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-gray-50 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900'
          }`}
        >
          <div className={`p-4 rounded-full mb-3 ${selectedPlatform === 'telegram' ? 'bg-[#0088cc] text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}>
            <Send className="w-8 h-8 ml-1" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Bot Telegram</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">Pindai untuk Telegram</p>
        </button>

        {/* WhatsApp Form */}
        <button 
          onClick={() => setSelectedPlatform('whatsapp')}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
            selectedPlatform === 'whatsapp' 
              ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-500/10 shadow-md transform scale-[1.02]' 
              : 'border-gray-200 dark:border-white/10 hover:border-green-300 dark:hover:border-green-500/50 hover:bg-gray-50 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900'
          }`}
        >
          <div className={`p-4 rounded-full mb-3 ${selectedPlatform === 'whatsapp' ? 'bg-[#25D366] text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}>
            <MessageCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">WhatsApp</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">Pindai untuk WhatsApp</p>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-sm rounded-2xl overflow-hidden">
        {selectedPlatform === 'web' && (
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Pengaturan Webhook Router</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Hubungkan MikroTik Anda ke dashboard ini dengan menyalin URL di bawah ke dalam script On Up / On Down di profile PPPoE Anda.</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-950 p-4 pl-5 rounded-xl border border-slate-700 dark:border-slate-800 font-mono text-sm shadow-inner relative group">
                  <div className="text-slate-400 mb-2">// URL Webhook Server</div>
                  <div className="text-green-400 break-all">{configLinks.web}</div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-5 mb-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Script untuk "On Up" (Login)
                  </h4>
                  <pre className="text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap">
{`:local routerId "RTR-01";
:local url "${configLinks.web}";
:local payload "{\\"routerId\\":\\"\$routerId\\", \\"user\\":\\"\$user\\", \\"interface\\":\\"\$interface\\", \\"ip\\":\\"\$remote-address\\", \\"mac\\":\\"\$caller-id\\", \\"event\\":\\"login\\"}";

/tool fetch http-method=post http-header-field="Content-Type: application/json" url=\$url http-data=\$payload;`}
                  </pre>
                </div>

                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl p-5">
                  <h4 className="font-semibold text-rose-900 dark:text-rose-300 flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    Script untuk "On Down" (Logout)
                  </h4>
                  <pre className="text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap">
{`:local routerId "RTR-01";
:local url "${configLinks.web}";
:local payload "{\\"routerId\\":\\"\$routerId\\", \\"user\\":\\"\$user\\", \\"interface\\":\\"\$interface\\", \\"ip\\":\\"\$remote-address\\", \\"mac\\":\\"\$caller-id\\", \\"event\\":\\"logout\\"}";

/tool fetch http-method=post http-header-field="Content-Type: application/json" url=\$url http-data=\$payload;`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex w-64 items-center justify-center">
               <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 flex flex-col items-center text-indigo-800 dark:text-indigo-300 text-center">
                  <Laptop className="w-16 h-16 mb-4 opacity-80" />
                  <p className="font-medium text-sm">Tambahkan script ini ke profile PPP MikroTik Anda.</p>
               </div>
            </div>
          </div>
        )}

        {(selectedPlatform === 'whatsapp' || selectedPlatform === 'telegram') && (
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20">
            {/* Steps Column */}
            <div className="flex-1 space-y-8 max-w-md">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  Aktifkan Notifikasi {selectedPlatform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Ikuti langkah-langkat berikut untuk menerima notifikasi instan di HP Anda.
                </p>
              </div>

              <ul className="space-y-6 select-none cursor-default">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-semibold flex items-center justify-center border border-gray-200 dark:border-white/10">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-50">Buka Kamera</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Arahkan kamera HP Anda ke kode QR di sebelah kanan.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-semibold flex items-center justify-center border border-gray-200 dark:border-white/10">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-50">Kirim pesan MULAI / START</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tap link untuk membuka aplikasi, lalu kirim pesan otomatisnya.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-semibold flex items-center justify-center border border-green-200 dark:border-green-500/30 pb-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-50">Selesai!</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Anda akan menerima notifikasi otomatis untuk setiap peristiwa PPPoE.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* QR Code Column */}
            <div className="flex flex-col items-center">
              <div className="p-4 bg-white border-4 border-gray-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none mb-6 group relative">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 pointer-events-none rounded-3xl transition-opacity duration-500"></div>
                <QRCodeSVG 
                  value={configLinks[selectedPlatform]} 
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-xl"
                  fgColor={selectedPlatform === 'whatsapp' ? '#075e54' : '#0088cc'}
                />
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                <QrCode className="w-4 h-4" />
                Pindai untuk Setup {selectedPlatform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
