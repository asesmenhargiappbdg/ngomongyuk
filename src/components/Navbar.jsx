import React from 'react';
import { 
  MessageSquare, 
  Headphones, 
  Coffee, 
  Lightbulb, 
  Settings, 
  Sparkles,
  Globe,
  Smartphone
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onOpenTips, 
  onOpenSettings,
  onOpenInstallHp
}) {
  const tabs = [
    { id: 'chat', label: 'Ngobrol Santai', icon: MessageSquare },
    { id: 'scenarios', label: 'Skenario Nyata', icon: Coffee },
    { id: 'listening', label: 'Latihan Telinga', icon: Headphones },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div 
          onClick={() => onTabChange('chat')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-800 text-lg tracking-tight">NgomongYuk!</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200/60">
                Bridge AI
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
              Teman Bicara & Latihan Mendengar Bahasa Inggris
            </p>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-slate-500"}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Buka di HP Button */}
          <button
            onClick={onOpenInstallHp}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95"
            title="Cara buka & pasang di HP Android / iPhone"
          >
            <Smartphone className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Pasang di HP</span>
          </button>

          {/* Tips / Rekomendasi Button */}
          <button
            onClick={onOpenTips}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95"
            title="Buka tips cepat lancar & rahasia belajar"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">Tips Lancar</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
            title="Pengaturan Suara & AI"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
