import React from 'react';
import { MessageSquare, Coffee, Headphones, Lightbulb } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onOpenTips }) {
  const tabs = [
    { id: 'chat', label: 'Ngobrol', icon: MessageSquare },
    { id: 'scenarios', label: 'Skenario', icon: Coffee },
    { id: 'listening', label: 'Dengar', icon: Headphones },
    { id: 'tips', label: 'Tips Lancar', icon: Lightbulb, isModal: true },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] flex items-center justify-around shrink-0 z-30 shadow-lg select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.isModal) {
                onOpenTips();
              } else {
                onTabChange(tab.id);
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
              isActive && !tab.isModal
                ? "text-indigo-600 font-extrabold"
                : "text-slate-400 hover:text-slate-600 font-medium"
            }`}
          >
            {/* Android Material 3 Pill Indicator */}
            <div className={`px-4 py-1 rounded-full transition-all duration-200 ${
              isActive && !tab.isModal 
                ? "bg-indigo-100 text-indigo-700 scale-105" 
                : "text-slate-500 hover:bg-slate-100"
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-semibold">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
