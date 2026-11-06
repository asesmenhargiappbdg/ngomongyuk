import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  QrCode, 
  Wifi, 
  Copy, 
  Check, 
  Sparkles, 
  Apple, 
  Share2, 
  PlusSquare, 
  MoreVertical,
  Download,
  Globe,
  UploadCloud,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function InstallHpModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('online'); // default to 'online' since user asked for 24/7 without laptop!
  
  // Local IP address detected
  const [localIp, setLocalIp] = useState('10.201.133.121');
  const port = '5173';
  const localUrl = `http://${localIp}:${port}`;

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(localUrl)}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
              <Smartphone className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg sm:text-xl">
                Pasang di HP (Aktif 24 Jam)
              </h3>
              <p className="text-xs text-slate-500">
                Pilih cara paling nyaman agar aplikasi tetap aktif meski laptop mati
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'online'
                ? "bg-white text-indigo-700 shadow-sm border border-slate-200/60"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Online 24 Jam (Komputer Mati OK)</span>
          </button>

          <button
            onClick={() => setActiveTab('wifi')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'wifi'
                ? "bg-white text-indigo-700 shadow-sm border border-slate-200/60"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Via Wi-Fi Lokal (Saat Laptop Nyala)</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {activeTab === 'online' ? (
            /* TAB 1: ONLINE 24 JAM PERMANEN */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/70 text-xs text-emerald-950 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Solusi Terbaik Tanpa Bergantung Laptop:</strong>
                    <p className="mt-0.5 text-emerald-900/80">
                      Dengan meng-upload ke hosting gratis, aplikasi Anda akan memiliki alamat web permanen di internet. Komputer dimatikan total pun, aplikasi di HP Anda tetap bisa dibuka dan diinstal selamanya!
                    </p>
                  </div>
                </div>
              </div>

              {/* Cara A: Netlify Drop */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                      A
                    </span>
                    Cara Paling Mudah: Netlify Drop (5 Detik)
                  </h4>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    Rekomendasi
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Tidak perlu instal apa pun. Cukup klik dua kali file <strong>buka-netlify-drop.bat</strong> di folder laptop Anda, lalu tarik folder <strong>dist</strong> ke halaman web tersebut.
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <p>1. Di laptop, klik 2x file: <code className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">buka-netlify-drop.bat</code></p>
                  <p>2. Tarik folder <strong>dist</strong> ke dalam kotak di halaman web yang muncul.</p>
                  <p>3. Dalam 5 detik, Anda langsung mendapatkan link permanen aktif 24 jam!</p>
                </div>
              </div>

              {/* Cara B: upload-ke-web.bat */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                    B
                  </span>
                  Cara Otomatis via Terminal (Surge.sh)
                </h4>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Klik dua kali file <strong>upload-ke-web.bat</strong> di folder laptop Anda. Anda hanya perlu mengetik email & password sembarang sekali saja, dan aplikasi langsung online di internet!
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                  File shortcut: <code className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">upload-ke-web.bat</code>
                </div>
              </div>

              {/* Langkah setelah dapat link */}
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                <strong>Setelah dapat link web online:</strong> Buka link tersebut di HP Anda, lalu ketuk <em>"Tambahkan ke Layar Utama" (Instal Aplikasi)</em> di menu Chrome/Safari. Selesai!
              </div>
            </div>
          ) : (
            /* TAB 2: WI-FI LOKAL */
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Alamat IP Lokal Komputer Saat Ini:
                </span>
                <div className="flex items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <code className="text-sm font-mono font-bold text-indigo-700">
                    {localUrl}
                  </code>
                  <button
                    onClick={() => handleCopy(localUrl)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <p className="text-xs text-slate-500 mb-3">
                  Scan kamera HP ke QR Code di bawah (pastikan Wi-Fi sama):
                </p>
                <img 
                  src={qrUrl} 
                  alt="QR Code" 
                  className="w-36 h-36 rounded-xl mx-auto border border-slate-200 bg-white p-2"
                />
              </div>

              {/* How to add to home screen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-800 block mb-1">🤖 Android (Chrome):</strong>
                  <span>Titik tiga (⋮) &rarr; Tambahkan ke Layar Utama</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-800 block mb-1">🍏 iPhone (Safari):</strong>
                  <span>Tombol Bagikan &rarr; Tambah ke Layar Utama</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
