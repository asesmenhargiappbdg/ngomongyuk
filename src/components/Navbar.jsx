import React from 'react';
import { 
  Settings, 
  Globe,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  currentSpeed,
  onOpenSettings,
  onSpeedToggle
}) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between shrink-0 z-30 select-none">
      {/* Brand & AI Status */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
          NY
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-slate-800 text-sm tracking-tight">NgomongYuk!</h1>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] font-semibold text-slate-500">
              Echo AI (Teman Aktif)
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls (Speed Badge & Settings) */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onSpeedToggle}
          className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/70 rounded-lg text-[11px] font-bold transition-all shadow-2xs active:scale-95 flex items-center gap-1"
          title="Ubah kecepatan suara AI"
        >
          <span>Kecepatan:</span>
          <span className="font-mono bg-white px-1 rounded text-indigo-900">{currentSpeed}x</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Pengaturan Suara & AI"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
