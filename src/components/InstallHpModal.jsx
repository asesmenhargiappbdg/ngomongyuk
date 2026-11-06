import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Wifi, 
  Copy, 
  Check, 
  Sparkles, 
  Apple, 
  Globe, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function InstallHpModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  
  // Permanent public HTTPS URL on GitHub Pages (Official 24/7 Hosting)
  const publicUrl = "https://asesmenhargiappbdg.github.io/ngomongyuk/";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(publicUrl)}&margin=10`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm">
              <Globe className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-slate-800 text-lg sm:text-xl">
                  Aplikasi Sudah Online 24 Jam
                </h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Laptop boleh dimatikan, aplikasi di HP tetap aktif selamanya!
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Status Alert */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <strong>Server Web Publik Sudah Aktif!</strong>
              <p className="mt-0.5 text-emerald-900/80">
                Aplikasi Anda sudah terbit di internet dengan sertifikat keamanan resmi (HTTPS). Anda bisa membukanya dari HP mana pun menggunakan paket data (4G/5G) atau Wi-Fi apa saja.
              </p>
            </div>
          </div>

          {/* QR Code & Link Card */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 text-center">
            <p className="text-xs text-slate-500 font-semibold mb-3">
              Scan Kamera HP Anda Langsung ke Layar Komputer Ini:
            </p>
            
            <div className="inline-block p-2 bg-white rounded-2xl border border-slate-200 shadow-sm mb-3">
              <img 
                src={qrUrl} 
                alt="QR Code Aplikasi NgomongYuk!" 
                className="w-44 h-44 rounded-xl object-contain mx-auto"
              />
            </div>

            <p className="text-[11px] text-slate-400 mb-2">
              Atau ketik alamat web ini di browser HP:
            </p>

            <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-mono font-bold text-indigo-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:text-indigo-800 hover:border-indigo-300 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>{publicUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                onClick={handleCopy}
                className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-colors shadow-2xs shrink-0"
                title="Salin Alamat"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {copied && (
              <p className="text-xs text-emerald-600 font-bold mt-2 animate-in fade-in">
                ✓ Alamat berhasil disalin!
              </p>
            )}
          </div>

          {/* Cara Pasang Menjadi Aplikasi di Menu HP */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Cara Pasang Menjadi Aplikasi di Layar HP:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Android */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
                  <span>🤖</span> Di HP Android (Google Chrome):
                </div>
                <ol className="text-slate-600 space-y-1 list-decimal list-inside leading-relaxed text-[11px]">
                  <li>Buka link di Chrome HP.</li>
                  <li>Ketuk titik tiga (⋮) di pojok kanan atas.</li>
                  <li>Pilih <strong>"Instal Aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</li>
                  <li>Ikon aplikasi akan muncul di menu HP Anda!</li>
                </ol>
              </div>

              {/* iPhone */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
                  <Apple className="w-3.5 h-3.5 text-slate-700" /> Di iPhone (Safari):
                </div>
                <ol className="text-slate-600 space-y-1 list-decimal list-inside leading-relaxed text-[11px]">
                  <li>Buka link di Safari iPhone.</li>
                  <li>Ketuk tombol <strong>Bagikan (Share)</strong> di bagian bawah layar.</li>
                  <li>Pilih <strong>"Tambah ke Layar Utama"</strong>.</li>
                  <li>Ketuk <strong>Tambah</strong>.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-200 transition-all active:scale-95"
          >
            Siap, Saya Buka di HP!
          </button>
        </div>
      </div>
    </div>
  );
}
