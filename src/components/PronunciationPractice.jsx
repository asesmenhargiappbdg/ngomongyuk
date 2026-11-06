import React, { useState } from 'react';
import { Mic, MicOff, CheckCircle2, RotateCcw, Volume2, Sparkles, X, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechService } from '../services/speechService';
import { calculateSimilarity } from '../services/phonetics';

export default function PronunciationPractice({ 
  targetSentence, 
  phonetic, 
  indonesianMeaning,
  onClose 
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = (rate = 0.8) => {
    setIsPlayingAudio(true);
    speechService.speakEnglish(targetSentence, {
      rate: rate,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
      return;
    }

    setSpokenText('');
    setScore(null);
    setFeedback('');
    setIsRecording(true);

    const started = speechService.startListening(
      'en-US',
      (result) => {
        setSpokenText(result.interim || result.final);
      },
      (error) => {
        setIsRecording(false);
        setFeedback('Izin mikrofon belum aktif di Chrome. Ketuk ikon gembok 🔒 di atas browser atau ketuk tombol "Minta Izin" di bawah.');
      },
      (finalText) => {
        setIsRecording(false);
        const textToEvaluate = finalText || spokenText;
        if (!textToEvaluate) {
          setFeedback('Belum ada suara yang terdengar. Tekan mic dan coba bicara lebih dekat ya!');
          return;
        }

        const simScore = calculateSimilarity(textToEvaluate, targetSentence);
        setScore(simScore);

        if (simScore >= 80) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
          setFeedback('🎉 Luar biasa! Pengucapanmu sangat jelas dan mirip native speaker!');
        } else if (simScore >= 50) {
          setFeedback('👍 Bagus sekali! Sudah terdengar mirip. Dengarkan sekali lagi lalu coba mantapkan!');
        } else {
          setFeedback('💪 Sudah berani mencoba! Dengarkan versi lambat (0.7x) lalu tirukan kembali.');
        }
      }
    );

    if (!started) {
      setIsRecording(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-bold text-slate-800 text-lg sm:text-xl">
              Latihan Menirukan (Shadowing)
            </h3>
            <p className="text-xs text-slate-500">
              Dengarkan bunyinya, lalu ucapkan bersuara untuk melatih lidahmu
            </p>
          </div>
        </div>

        {/* Target Sentence Card */}
        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-2xl p-5 border border-indigo-100/80 mb-5">
          <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
            Target Kalimat:
          </p>
          <p className="text-xl sm:text-2xl font-bold text-indigo-950 leading-relaxed mb-2">
            "{targetSentence}"
          </p>
          
          {phonetic && (
            <div className="bg-white/80 rounded-xl px-3 py-1.5 border border-indigo-100 mb-2 inline-block">
              <span className="text-xs text-indigo-500 font-medium mr-1.5">🗣️ Cara Baca:</span>
              <span className="text-sm font-semibold text-indigo-900 tracking-wide font-mono">
                {phonetic}
              </span>
            </div>
          )}

          {indonesianMeaning && (
            <p className="text-sm text-slate-600 italic">
              Artinya: <span className="font-medium text-slate-700">{indonesianMeaning}</span>
            </p>
          )}

          {/* Audio Reference Buttons */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-indigo-100/60">
            <span className="text-xs text-slate-500 font-medium">Contoh Suara:</span>
            <button
              onClick={() => handlePlayAudio(0.85)}
              className="px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" /> Normal
            </button>
            <button
              onClick={() => handlePlayAudio(0.7)}
              className="px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" /> Lambat (0.7x)
            </button>
          </div>
        </div>

        {/* Recording Action Area */}
        <div className="text-center py-3">
          <button
            onClick={handleToggleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300 shadow-xl ${
              isRecording
                ? "bg-rose-500 text-white ring-8 ring-rose-200 animate-pulse scale-105"
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200 hover:scale-105"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-9 h-9" />
            ) : (
              <Mic className="w-9 h-9" />
            )}
          </button>
          <p className="mt-3 text-sm font-medium text-slate-700">
            {isRecording 
              ? "Sedang mendengarkan ucapanmu... Ucapkan sekarang!" 
              : "Tekan tombol mic di atas lalu ucapkan kalimatnya"}
          </p>
        </div>

        {/* Spoken Text Result */}
        {spokenText && (
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-400 block mb-0.5">Yang terdengar dari suaramu:</span>
            <span className="text-slate-800 font-semibold italic">"{spokenText}"</span>
          </div>
        )}

        {/* Feedback when error or prompt */}
        {feedback && score === null && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-center text-xs text-amber-900">
            <p className="font-semibold mb-2">{feedback}</p>
            <button
              onClick={async () => {
                const res = await speechService.requestMicPermission();
                if (res.granted) {
                  setFeedback('Izin mikrofon aktif! Silakan tekan tombol mic.');
                }
              }}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs text-xs transition-all active:scale-95"
            >
              Minta Izin Mikrofon
            </button>
          </div>
        )}

        {/* Score & Feedback */}
        {score !== null && (
          <div className={`mt-4 p-4 rounded-2xl border text-center transition-all ${
            score >= 80 
              ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
              : score >= 50 
              ? "bg-amber-50 border-amber-200 text-amber-900" 
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-lg">Skor Kemiripan: {score}%</span>
            </div>
            <p className="text-sm font-medium">{feedback}</p>
          </div>
        )}

        {/* Action Bottom */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-sm transition-colors"
          >
            Selesai Latihan
          </button>
        </div>
      </div>
    </div>
  );
}
