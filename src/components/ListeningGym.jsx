import React, { useState } from 'react';
import { 
  Headphones, 
  Volume2, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Mic, 
  RotateCcw,
  BookOpen,
  CheckCircle2
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
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
          <Headphones className="w-3.5 h-3.5" /> Latihan Telinga (Listening Ear-Gym)
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          Tebak & Latih Pendengaran
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
          Dengarkan suaranya terlebih dahulu, latih telingamu menangkap bunyinya, lalu buka teks untuk mencocokkan artinya.
        </p>
      </div>

      {/* Main Drill Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 relative">
        {/* Level Tag & Progress */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {currentDrill.level}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Latihan {currentIndex + 1} dari {LISTENING_DRILLS.length}
          </span>
        </div>

        {/* Audio Player Core Area */}
        <div className="text-center py-6 sm:py-8 bg-slate-50/80 rounded-2xl border border-slate-100 mb-6">
          <button
            onClick={() => handlePlayAudio(activeSpeed)}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto transition-all duration-300 shadow-xl ${
              isPlaying 
                ? "bg-amber-500 text-white ring-8 ring-amber-200 scale-105 animate-pulse" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 hover:shadow-indigo-200"
            }`}
          >
            <Volume2 className="w-10 h-10 mb-1" />
            <span className="text-[11px] font-bold">
              {isPlaying ? "Memutar..." : "Putar Suara"}
            </span>
          </button>
          
          <p className="text-xs text-slate-500 mt-4 font-medium">
            💡 <em>Tip: Tutup matamu dan dengarkan bunyinya sebelum membaca teks</em>
          </p>

          {/* Speed Selector Buttons */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-slate-400 mr-1 font-medium">Kecepatan:</span>
            {[
              { rate: 0.65, label: "0.65x Sangat Pelan" },
              { rate: 0.8, label: "0.8x Santai" },
              { rate: 1.0, label: "1.0x Normal" },
            ].map(({ rate, label }) => (
              <button
                key={rate}
                onClick={() => {
                  setActiveSpeed(rate);
                  handlePlayAudio(rate);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  activeSpeed === rate
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reveal / Hidden Box */}
        <div className="space-y-4">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 font-bold text-sm rounded-2xl border border-indigo-200/80 flex items-center justify-center gap-2 transition-all shadow-sm group"
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Buka Teks & Arti Kalimat</span>
            </button>
          ) : (
            <div className="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100/90 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Teks yang Diucapkan:
                </span>
                <button
                  onClick={() => setRevealed(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <EyeOff className="w-3.5 h-3.5" /> Sembunyikan
                </button>
              </div>

              {/* English Spoken */}
              <p className="text-xl sm:text-2xl font-extrabold text-indigo-950 mb-2">
                "{currentDrill.english}"
              </p>

              {/* Phonetic Cara Baca */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-indigo-100 text-xs font-semibold text-indigo-800 font-mono mb-3">
                <span>🗣️ Cara baca:</span>
                <span>{currentDrill.phonetic}</span>
              </div>

              {/* Indonesian Meaning */}
              <div className="p-3 bg-white rounded-xl border border-indigo-100/70 mb-4">
                <span className="text-xs font-semibold text-slate-400 block mb-0.5">Artinya:</span>
                <p className="text-base font-semibold text-slate-800">
                  {currentDrill.indonesian}
                </p>
              </div>

              {/* Connected speech tip */}
              {currentDrill.tip && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-900 leading-relaxed mb-4">
                  <strong>💡 Rahasia Telinga: </strong>
                  {currentDrill.tip}
                </div>
              )}

              {/* Key vocab */}
              {currentDrill.vocab && currentDrill.vocab.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-500 block mb-2">
                    Kosakata Penting:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentDrill.vocab.map((v, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 shadow-2xs"
                      >
                        <strong className="text-indigo-600">{v.word}</strong>: {v.meaning}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Shadowing Action Button */}
              <button
                onClick={() => setPracticingSentence({
                  sentence: currentDrill.english,
                  phonetic: currentDrill.phonetic,
                  meaning: currentDrill.indonesian
                })}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Mic className="w-4 h-4" /> Coba Tirukan Suara Ini (Shadowing)
              </button>
            </div>
          )}
        </div>

        {/* Navigation bottom */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Sebelumnya
          </button>
          
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Selanjutnya <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Shadowing Practice Modal */}
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
