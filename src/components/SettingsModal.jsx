import React, { useState, useEffect } from 'react';
import { X, Volume2, Key, Sliders, Check, Sparkles, AlertCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { conversationEngine } from '../services/conversationEngine';

export default function SettingsModal({ isOpen, onClose, currentSpeed, onSpeedChange }) {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingAi, setTestingAi] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(conversationEngine.getApiKey());
      setTestResult(null);
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

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setApiKey(text.trim());
        }
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
    }
  };

  const handleTestApiKey = async () => {
    const keyToTest = apiKey.trim();
    if (!keyToTest) {
      setTestResult({ success: false, message: 'Masukkan API key terlebih dahulu' });
      return;
    }
    setTestingAi(true);
    setTestResult(null);
    try {
      if (keyToTest.startsWith('gsk_')) {
        // Test Groq API
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${keyToTest}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: 'Say hello in 1 word' }]
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error?.message || `HTTP error ${res.status}`);
        }
        conversationEngine.setApiKey(keyToTest);
        setTestResult({ success: true, message: '🎉 Groq AI (Llama 3.3) Terhubung! Anda sekarang bisa ngobrol bebas apa saja.' });
      } else if (keyToTest.startsWith('sk-or-')) {
        // Test OpenRouter API
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${keyToTest}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [{ role: 'user', content: 'Say hello in 1 word' }]
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error?.message || `HTTP error ${res.status}`);
        }
        conversationEngine.setApiKey(keyToTest);
        setTestResult({ success: true, message: '🎉 OpenRouter AI Terhubung! Percakapan bebas aktif.' });
      } else if (keyToTest.startsWith('sk-')) {
        // Test OpenAI / DeepSeek
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${keyToTest}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'Say hello in 1 word' }]
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error?.message || `HTTP error ${res.status}`);
        }
        conversationEngine.setApiKey(keyToTest);
        setTestResult({ success: true, message: '🎉 OpenAI AI Terhubung! Percakapan bebas aktif.' });
      } else {
        // Test Google Gemini API (gemini-2.0-flash or gemini-1.5-flash)
        let success = false;
        let lastErr = null;
        for (const model of ['gemini-2.0-flash', 'gemini-1.5-flash']) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToTest}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: "Say 'Hello' in 1 word" }] }]
              })
            });
            if (res.ok) {
              success = true;
              break;
            } else {
              const data = await res.json().catch(() => ({}));
              lastErr = new Error(data?.error?.message || `HTTP error ${res.status}`);
            }
          } catch (e) {
            lastErr = e;
          }
        }
        if (!success) {
          throw lastErr || new Error('Gagal menghubungkan ke Google Gemini');
        }
        conversationEngine.setApiKey(keyToTest);
        setTestResult({ success: true, message: '🎉 Google Gemini AI Terhubung! Anda sekarang bisa ngobrol bebas apa saja tanpa template.' });
      }
    } catch (err) {
      setTestResult({ success: false, message: `Gagal: ${err.message}` });
    } finally {
      setTestingAi(false);
    }
  };

  const handleTestAudio = () => {
    speechService.speakEnglish("Hello! You are doing great. Keep practicing every day!", {
      rate: currentSpeed
    });
  };

  const isAiActive = Boolean(apiKey && apiKey.length > 5);

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

        {/* Gemini & Cloud AI Integration Section */}
        <div className="mb-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-500" />
              Integrasi AI Percakapan Bebas
            </label>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isAiActive 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {isAiActive ? '✨ AI Aktif' : '⚡ Mode Offline / Template'}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 mb-3 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 mb-1 text-xs">
                  Kenapa sebelumnya balasannya template?
                </p>
                <p className="mb-2 text-[11px] text-slate-600">
                  Tanpa API Key, aplikasi memakai <strong>mode offline standar (template terbatas)</strong>. Agar AI bisa berpikir cerdas dan <strong>diajak ngobrol bebas topik apa saja</strong> seperti ChatGPT / Native Speaker, aktifkan kunci AI gratis berikut:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 space-y-2 mb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[11px] text-slate-700">1. Google Gemini AI (Rekomendasi):</span>
                    <a 
                      href="https://aistudio.google.com/app/apikey" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[10px] transition-colors inline-flex items-center gap-1"
                    >
                      Buka Google AI Studio ↗
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    100% Gratis dari Google, tanpa kartu kredit, gratis ribuan chat per hari. Klik tombol di atas, klik 'Create API Key', lalu salin kuncinya.
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-[11px] text-slate-700">2. Groq AI (Llama 3.3):</span>
                    <a 
                      href="https://console.groq.com/keys" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg text-[10px] transition-colors inline-flex items-center gap-1"
                    >
                      Buka Groq Console ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="password"
                placeholder="Tempel Gemini API Key (AIzaSy...) atau Groq (gsk_...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full pl-3 pr-16 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="absolute right-1.5 top-1.5 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-[10px] font-semibold transition-colors"
                title="Tempel dari Clipboard"
              >
                Tempel
              </button>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleSaveApiKey}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Simpan
              </button>
              <button
                onClick={handleTestApiKey}
                disabled={testingAi}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shrink-0"
                title="Tes apakah API key valid dan bisa dipakai ngobrol"
              >
                {testingAi ? 'Mengecek...' : 'Tes AI'}
              </button>
            </div>
          </div>

          {savedSuccess && (
            <p className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> API key berhasil disimpan!
            </p>
          )}

          {testResult && (
            <div className={`mt-2 p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 ${
              testResult.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {testResult.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{testResult.message}</span>
            </div>
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
