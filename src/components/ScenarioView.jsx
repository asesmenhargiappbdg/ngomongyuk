import React from 'react';
import { SCENARIOS } from '../data/scenarios';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ScenarioView({ onSelectScenario }) {
  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 select-none">
      {/* Mobile Top Header */}
      <div className="mb-3 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold mb-1">
          <Sparkles className="w-3 h-3" /> Pilih Situasi Nyata
        </span>
        <h2 className="text-base font-extrabold text-slate-800">
          Skenario Percakapan
        </h2>
        <p className="text-[11px] text-slate-500">
          Pilih topik di bawah untuk mulai ngobrol santai bersama Echo
        </p>
      </div>

      {/* List of Scenarios for Mobile */}
      <div className="space-y-2.5 pb-4">
        {SCENARIOS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectScenario(item)}
            className="group bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all active:scale-98 cursor-pointer shadow-2xs"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors shrink-0">
                {item.emoji}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 shrink-0">
                    {item.badge}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 font-semibold mb-1 truncate">
                  {item.englishTitle}
                </p>

                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 mb-2">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Mulai Ngobrol <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
