import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  Lock, 
  Settings2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { speechService } from '../services/speechService';

export default function MicPermissionModal({ isOpen, onClose, onPermissionGranted }) {
  const [testing, setTesting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    setTesting(true);
    setStatusMsg(null);
    const result = await speechService.requestMicPermission();
    setTesting(false);

    if (result.granted) {
      setStatusMsg({ success: true, text: 'Izin mikrofon berhasil diberikan! Silakan mulai bicara.' });
      setTimeout(() => {
        onPermissionGranted?.();
        onClose();
      }, 1200);
    } else {
      setStatusMsg({ 
        success: false, 
        text: 'Izin masih diblokir browser. Ikuti 3 langkah di bawah untuk membukanya ya!' 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Android Material 3 Bottom Sheet / Dialog */}
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl border-t sm:border border-slate-200 overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-200">
        
        {/* Android Drag Handle (Mobile Feel) */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Izin Mikrofon di Android
              </h3>
              <p className="text-[11px] text-slate-500">
                Dibutuhkan agar kamu bisa bicara langsung ke AI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Quick Action Button to prompt browser dialog */}
          <div className="bg-indigo-50/80 p-4 rounded-2xl border border-indigo-100 text-center">
            <p className="text-xs text-indigo-950 font-medium mb-3">
              Ketuk tombol di bawah untuk memunculkan kotak izin mikrofon:
            </p>

            <button
              onClick={handleRequestPermission}
              disabled={testing}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memeriksa izin...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Beri Izin Mikrofon Sekarang</span>
                </>
              )}
            </button>

            {statusMsg && (
              <div className={`mt-2.5 p-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 ${
                statusMsg.success 
                  ? "bg-emerald-100 text-emerald-800" 
                  : "bg-amber-100 text-amber-900"
              }`}>
                {statusMsg.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
                <span>{statusMsg.text}</span>
              </div>
            )}
          </div>

          {/* Step by step guide if blocked */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Jika Izin Pernah Terblokir di Chrome Android:</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-700">
              {/* Step 1 */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    Lihat bilah alamat URL atas di Chrome
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Ketuk ikon <strong>Setelan / Gembok (🔒)</strong> di sebelah kiri tulisan alamat web.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    Pilih menu "Izin" &rarr; "Mikrofon"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Ubah setelan mikrofon dari <em>Diblokir</em> menjadi <strong>"Izinkan" (Allow)</strong>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    Muat ulang (Refresh) halaman
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Setelah diizinkan, tarik layar ke bawah untuk refresh atau ketuk tombol refresh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PWA installed tip */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
            <strong>Tips untuk aplikasi di Layar Utama HP:</strong>
            <p className="mt-0.5">
              Jika sudah jadi ikon aplikasi di HP: Buka <strong>Pengaturan HP &rarr; Aplikasi &rarr; NgomongYuk &rarr; Izin &rarr; Mikrofon &rarr; Izinkan</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
