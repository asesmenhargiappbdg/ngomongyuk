import React from 'react';
import { X, Sparkles, Heart, Lightbulb, CheckCircle2, Volume2, ShieldCheck, Flame } from 'lucide-react';
import { LEARNING_RECOMMENDATIONS } from '../data/learningTips';
import { speechService } from '../services/speechService';

export default function TipsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const playSurvivalAudio = (text) => {
    speechService.speakEnglish(text, { rate: 0.8 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-white">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
              <Lightbulb className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-lg sm:text-xl">
                Panduan Rahasia Cepat Lancar Bicara
              </h3>
              <p className="text-xs text-slate-500">
                Untuk pemula yang merasa bahasa Inggris itu rumit dan orang lain terasa mudah
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
          {/* Myth Buster Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-5 rounded-2xl border border-amber-200/70">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-amber-950 text-sm sm:text-base mb-1">
                  {LEARNING_RECOMMENDATIONS.mythBuster.question}
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  {LEARNING_RECOMMENDATIONS.mythBuster.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Principles */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              5 Langkah Sederhana yang Terbukti Berhasil:
            </h4>

            {LEARNING_RECOMMENDATIONS.principles.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 transition-all hover:shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {p.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-slate-800 text-sm sm:text-base">
                        {p.title}
                      </h5>
                      {p.tag && (
                        <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-2 py-0.5 rounded-full">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2.5">
                      {p.description}
                    </p>

                    {p.cheatSheet && (
                      <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2 mt-2">
                        {p.cheatSheet.map((item, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-indigo-950">
                                "{item.en}"
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Artinya: {item.id}
                              </p>
                            </div>
                            <button
                              onClick={() => playSurvivalAudio(item.en)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-lg shrink-0 transition-colors"
                              title="Dengarkan pengucapan"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {p.actionText && (
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {p.actionText}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Motivational Bottom Quote */}
          <div className="bg-indigo-900 text-white p-5 rounded-2xl flex items-center gap-3">
            <Flame className="w-8 h-8 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              <strong className="text-white">Ingat:</strong> Orang yang lancar bahasa Inggris bukan orang yang tidak pernah salah, tapi orang yang <em>paling banyak membuat kesalahan dan terus mencoba!</em> Selamat berlatih, kamu pasti bisa!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            Saya Siap Latihan!
          </button>
        </div>
      </div>
    </div>
  );
}
