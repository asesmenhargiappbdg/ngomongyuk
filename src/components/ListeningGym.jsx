import React, { useState } from 'react';
import { 
  Headphones, 
  Volume2, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft, 
  Mic 
} from 'lucide-react';
import { LISTENING_DRILLS } from '../data/listeningExercises';
import { speechService } from '../services/speechService';
import PronunciationPractice from './PronunciationPractice';

export default function ListeningGym({ defaultSpeed = 0.85 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState(defaultSpeed);
  const [practicingSentence, setPracticingSentence] = useState(null);

  const currentDrill = LISTENING_DRILLS[currentIndex];

  const handlePlayAudio = (speed = activeSpeed) => {
    setIsPlaying(true);
    speechService.speakEnglish(currentDrill.english, {
      rate: speed,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const handleNext = () => {
    speechService.stopSpeaking();
    setIsPlaying(false);
    setRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % LISTENING_DRILLS.length);
  };

  const handlePrev = () => {
    speechService.stopSpeaking();
    setIsPlaying(false);
    setRevealed(false);
    setCurrentIndex((prev) => (prev - 1 + LISTENING_DRILLS.length) % LISTENING_DRILLS.length);
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5 select-none">
      {/* Mobile Top Header */}
      <div className="text-center mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold mb-1">
          <Headphones className="w-3 h-3" /> Latihan Telinga
        </span>
        <h2 className="text-base font-extrabold text-slate-800">
          Tebak & Asah Pendengaran
        </h2>
        <p className="text-[11px] text-slate-500">
          Dengarkan bunyinya dulu, lalu buka teks untuk mencocokkan artinya
        </p>
      </div>

      {/* Main Drill Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 relative">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            {currentDrill.level}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            {currentIndex + 1} / {LISTENING_DRILLS.length}
          </span>
        </div>

        {/* Audio Circle Button */}
        <div className="text-center py-5 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
          <button
            onClick={() => handlePlayAudio(activeSpeed)}
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto transition-all shadow-md ${
              isPlaying 
                ? "bg-amber-500 text-white ring-4 ring-amber-200 scale-105 animate-pulse" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95"
            }`}
          >
            <Volume2 className="w-8 h-8 mb-0.5" />
            <span className="text-[10px] font-bold">
              {isPlaying ? "Memutar..." : "Putar Suara"}
            </span>
          </button>
          
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            💡 <em>Tutup matamu dan dengarkan bunyinya dulu</em>
          </p>

          {/* Speed Selector */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[
              { rate: 0.65, label: "0.65x Pelan" },
              { rate: 0.8, label: "0.8x Santai" },
              { rate: 1.0, label: "1.0x Normal" },
            ].map(({ rate, label }) => (
              <button
                key={rate}
                onClick={() => {
                  setActiveSpeed(rate);
                  handlePlayAudio(rate);
                }}
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-lg border transition-all ${
                  activeSpeed === rate
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reveal / Hidden Box */}
        <div>
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            >
              <Eye className="w-4 h-4" />
              <span>Buka Teks & Arti Kalimat</span>
            </button>
          ) : (
            <div className="bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-100 animate-in fade-in duration-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">
                  Teks yang Diucapkan:
                </span>
                <button
                  onClick={() => setRevealed(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <EyeOff className="w-3 h-3" /> Sembunyikan
                </button>
              </div>

              <p className="text-base sm:text-lg font-extrabold text-indigo-950">
                "{currentDrill.english}"
              </p>

              <div className="inline-block px-2 py-0.5 bg-white rounded-md border border-indigo-100 text-[11px] font-mono font-semibold text-indigo-800">
                🗣️ Cara baca: {currentDrill.phonetic}
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-indigo-100/70 text-xs">
                <span className="text-[9px] font-bold text-slate-400 block">Artinya:</span>
                <span className="font-semibold text-slate-800">{currentDrill.indonesian}</span>
              </div>

              {currentDrill.tip && (
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200/70 text-[11px] text-amber-900 leading-snug">
                  <strong>💡 Rahasia Telinga: </strong>{currentDrill.tip}
                </div>
              )}

              <button
                onClick={() => setPracticingSentence({
                  sentence: currentDrill.english,
                  phonetic: currentDrill.phonetic,
                  meaning: currentDrill.indonesian
                })}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-98"
              >
                <Mic className="w-3.5 h-3.5" /> Latih Ucapkan Kalimat Ini
              </button>
            </div>
          )}
        </div>

        {/* Prev / Next Controls */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
          </button>
          
          <button
            onClick={handleNext}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            Berikutnya <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {practicingSentence && (
        <PronunciationPractice
          targetSentence={practicingSentence.sentence}
          phonetic={practicingSentence.phonetic}
          indonesianMeaning={practicingSentence.meaning}
          onClose={() => setPracticingSentence(null)}
        />
      )}
    </div>
  );
}
