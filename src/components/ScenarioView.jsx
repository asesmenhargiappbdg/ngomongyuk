import React from 'react';
import { SCENARIOS } from '../data/scenarios';
import { MessageSquare, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ScenarioView({ onSelectScenario }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Simulasi Kehidupan Nyata
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          Pilih Skenario Percakapan
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto mt-1">
          Tidak perlu bingung mau bicara apa. Pilih situasi di bawah, dan AI akan mengajakmu ngobrol santai layaknya situasi sungguhan.
        </p>
      </div>

      {/* Grid of Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SCENARIOS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectScenario(item)}
            className="group bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header card with emoji & badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 bg-slate-50 rounded-2xl group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                  {item.emoji}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  {item.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-2">
                {item.englishTitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Starter example */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-4">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  Contoh yang bisa kamu tanyakan:
                </span>
                <p className="text-xs text-slate-700 italic">
                  "{item.starterPrompts[0]?.idText}"
                </p>
              </div>
            </div>

            {/* CTA bottom button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1.5">
                Mulai Ngobrol di Situasi Ini <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
