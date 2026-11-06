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
  Download
} from 'lucide-react';

export default function InstallHpModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  
  // Local IP address detected
  const [localIp, setLocalIp] = useState('10.201.133.121');
  const port = '5173';
  const fullUrl = `http://${localIp}:${port}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/60">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
              <Smartphone className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg sm:text-xl">
                Cara Pasang & Buka di HP
              </h3>
              <p className="text-xs text-slate-500">
                Gunakan langsung di smartphone Android atau iPhone Anda
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Connect via Wi-Fi */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                Hubungkan HP & Laptop ke Wi-Fi yang Sama
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Pastikan smartphone Anda dan komputer/laptop ini terhubung ke jaringan Wi-Fi / hotspot yang sama.
            </p>

            {/* QR Code & Link */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                <img 
                  src={qrUrl} 
                  alt="Scan QR Code untuk buka di HP" 
                  className="w-36 h-36 rounded-lg object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Scan kamera HP atau ketik alamat ini di browser HP:
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <code className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                    {fullUrl}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    title="Salin Alamat"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-emerald-600 font-semibold">
                    ✓ Alamat berhasil disalin!
                  </p>
                )}
                <p className="text-[11px] text-slate-400">
                  (Buka di Google Chrome untuk Android, atau Safari untuk iPhone)
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Install as Native App (PWA) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                Jadikan Aplikasi Resmi di Layar Utama HP
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Setelah website terbuka di HP, Anda bisa memasangnya sebagai aplikasi mandiri (PWA) yang memiliki icon di menu HP tanpa perlu mendownload dari Play Store:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Android Instructions */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs mb-2">
                  <span className="text-base">🤖</span> Untuk Android (Chrome):
                </div>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Buka link di browser <strong>Chrome</strong>.</li>
                  <li>Ketuk ikon titik tiga (<strong>⋮</strong>) di pojok kanan atas.</li>
                  <li>Pilih <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Instal Aplikasi"</strong>.</li>
                  <li>Ikon aplikasi akan otomatis muncul di menu HP Anda!</li>
                </ol>
              </div>

              {/* iPhone Instructions */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs mb-2">
                  <Apple className="w-4 h-4 text-slate-700" /> Untuk iPhone (Safari):
                </div>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Buka link di browser <strong>Safari</strong>.</li>
                  <li>Ketuk tombol <strong>Bagikan (Share)</strong> di bagian bawah (ikon kotak dengan panah atas).</li>
                  <li>Gulir ke bawah, pilih <strong>"Tambah ke Layar Utama" (Add to Home Screen)</strong>.</li>
                  <li>Selesai! Aplikasi siap dibuka kapan saja.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Bonus Option: APK Android */}
          <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <Download className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 leading-relaxed">
              <strong>Mau dijadikan file file installer .APK murni untuk dikirim lewat WA?</strong>
              <p className="mt-1 text-indigo-900/80">
                Karena aplikasi ini dibuat menggunakan teknologi web modern (React/HTML5), Anda juga bisa mem-package-nya menjadi file <code>.apk</code> menggunakan <strong>Capacitor</strong> atau <strong>PWABuilder</strong> hanya dalam hitungan menit.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
