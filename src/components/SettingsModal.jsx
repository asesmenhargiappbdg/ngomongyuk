import React, { useState, useEffect } from 'react';
import { X, Volume2, Key, Sliders, Check, Sparkles, AlertCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { conversationEngine } from '../services/conversationEngine';

export default function SettingsModal({ isOpen, onClose, currentSpeed, onSpeedChange }) {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(conversationEngine.getApiKey());
      const availableVoices = speechService.voices.filter(v => v.lang.startsWith('en'));
      setVoices(availableVoices);
      const current = speechService.getEnglishVoice();
      if (current) {
        setSelectedVoiceName(current.name);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    conversationEngine.setApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestAudio = () => {
    speechService.speakEnglish("Hello! You are doing great. Keep practicing every day!", {
      rate: currentSpeed
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Sliders className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-slate-800 text-lg sm:text-xl">
              Pengaturan Suara & AI
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Speed Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">
              Kecepatan Suara Bicara AI
            </label>
            <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
              {currentSpeed}x {currentSpeed <= 0.7 ? "(Sangat Santai)" : currentSpeed <= 0.85 ? "(Rekomendasi Pemula)" : "(Normal Native)"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Bagi pemula, kecepatan 0.75x - 0.85x sangat direkomendasikan agar setiap kata terdengar jelas.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[0.6, 0.75, 0.85, 1.0].map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  currentSpeed === speed
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <button
            onClick={handleTestAudio}
            className="mt-3 w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-indigo-200/50"
          >
            <Volume2 className="w-4 h-4" /> Tes Bunyi Suara AI
          </button>
        </div>

        {/* Gemini API Key (Optional) */}
        <div className="mb-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-500" />
              Google Gemini API Key
              <span className="text-[10px] font-normal bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                Opsional
              </span>
            </label>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Aplikasi ini sudah 100% berfungsi langsung</strong> tanpa perlu API key. Jika Anda ingin obrolan AI yang super kreatif dan tanpa batas topik dari Google, Anda bisa masukkan API key gratis dari <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-medium">Google AI Studio</a>.
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Masukkan Gemini API Key (opsional)..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Simpan
            </button>
          </div>

          {savedSuccess && (
            <p className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Pengaturan API key berhasil disimpan!
            </p>
          )}
        </div>

        {/* App Version & Auto-Update Info */}
        <div className="mb-4 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Versi Aplikasi</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                v1.1.0 Terbaru
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pembaruan otomatis aktif setiap kali aplikasi dibuka
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-indigo-700 border border-slate-200 text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-95"
            title="Muat ulang untuk cek pembaruan"
          >
            Cek Update
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
