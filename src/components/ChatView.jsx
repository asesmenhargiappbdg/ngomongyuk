import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Headphones,
  CheckCircle2,
  Bot,
  User,
  Lightbulb,
  MessageCircle,
  Flame
} from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';
import PronunciationPractice from './PronunciationPractice';
import MicPermissionModal from './MicPermissionModal';
import { conversationEngine } from '../services/conversationEngine';
import { speechService } from '../services/speechService';

export default function ChatView({ activeScenario, currentSpeed, onOpenTips, onOpenSettings }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [practicingSentence, setPracticingSentence] = useState(null);
  const [activeSpeedRate, setActiveSpeedRate] = useState(currentSpeed);
  const [isMicPermissionOpen, setIsMicPermissionOpen] = useState(false);
  const [isAiActive, setIsAiActive] = useState(conversationEngine.isAiActive());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setActiveSpeedRate(currentSpeed);
  }, [currentSpeed]);

  useEffect(() => {
    setIsAiActive(conversationEngine.isAiActive());
  }, []);

  // Initial welcome message tailored for storytelling
  useEffect(() => {
    if (activeScenario) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          english: activeScenario.initialMessageEn,
          indonesian: activeScenario.initialMessageId,
          phonetic: activeScenario.initialMessagePhonetic || '',
          vocabulary: [],
          suggestedReplies: activeScenario.starterPrompts?.map(p => `${p.enText} (${p.idText})`) || []
        }
      ]);
    } else {
      setMessages([
        {
          id: 'welcome-free',
          sender: 'ai',
          english: "Hey there! I'm Echo, your friendly conversation buddy. Don't worry about grammar or speaking long sentences—even if you answer with just one word like 'yes', 'coffee', or 'tired', I will always keep our story exciting and help you speak naturally! How is your day going so far?",
          indonesian: "Halo sahabatku! Nama saya Echo, teman ngobrolmu yang super ramah. Jangan takut salah grammar atau kalimat panjang—meskipun kamu cuma jawab satu kata kayak 'ya', 'kopi', atau 'capek', saya bakal selalu membuka cerita seru dan membantumu ngomong dengan lancar! Gimana harimu sejauh ini?",
          phonetic: "Hey der! Aym E-ko, yor frend-li kon-ver-sey-syen ba-di...",
          vocabulary: [
            { word: "Friendly", meaning: "Ramah" },
            { word: "Exciting", meaning: "Seru / Mengasyikkan" }
          ],
          suggestedReplies: [
            "My day is going great! (Hariku berjalan menyenangkan!)",
            "I feel a bit tired from work. (Saya agak capek habis kerja.)",
            "Just relaxing and having some coffee. (Lagi santai sambil minum kopi.)"
          ]
        }
      ]);
    }
  }, [activeScenario]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend = inputText) => {
    // If text contains translation in parenthesis e.g. "I love coffee! (Saya suka kopi)", extract the English part or full
    let cleanText = textToSend.trim();
    if (!cleanText || isLoading) return;

    // If it's a suggestion clicked, take the part before parenthesis for sending
    let processedText = cleanText;
    const match = cleanText.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      processedText = match[1].trim(); // send English part directly
    }

    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.sender === 'user' ? (m.correctedEnglish || m.userOriginalText || m.english) : m.english
      }));
      const scenarioContext = activeScenario ? activeScenario.title : 'santai dan bercerita seru';
      const result = await conversationEngine.processMessage(processedText, scenarioContext, history);

      const userMsg = {
        id: 'user-' + Date.now(),
        sender: 'user',
        userOriginalText: processedText,
        hasCorrection: result.hasCorrection,
        correctedEnglish: result.correctedEnglish,
        correctedMeaning: result.correctedMeaning,
        correctionTip: result.correctionTip,
        phonetic: result.phonetic,
        vocabulary: result.vocabulary || [],
        source: result.source
      };

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        english: result.aiReplyEn,
        indonesian: result.aiReplyId,
        vocabulary: [],
        suggestedReplies: result.suggestedReplies || [result.suggestedReply || ''],
        source: result.source
      };

      setIsAiActive(conversationEngine.isAiActive());

      setMessages((prev) => [...prev, userMsg, aiMsg]);

      // USER REQUIREMENT: "sebelum mereka menjawan jika ada koreksi dia bacakan juga"
      // If there is a correction, speak the corrected sentence first, wait 550ms, then speak the AI reply!
      if (userMsg.hasCorrection && userMsg.correctedEnglish) {
        speechService.speakEnglish(userMsg.correctedEnglish, {
          rate: activeSpeedRate,
          onEnd: () => {
            setTimeout(() => {
              speechService.speakEnglish(aiMsg.english, { rate: activeSpeedRate });
            }, 550);
          }
        });
      } else {
        // No correction, speak AI response directly
        setTimeout(() => {
          speechService.speakEnglish(aiMsg.english, { rate: activeSpeedRate });
        }, 350);
      }

    } catch (err) {
      console.error('Failed to process message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    speechService.startListening(
      'id-ID',
      (result) => {
        setInputText(result.interim || result.final);
      },
      (error) => {
        setIsListening(false);
        // If error is permission related, open the helpful Android permission guide immediately!
        if (error === 'not-allowed' || error === 'service-not-allowed' || error?.includes('permission')) {
          setIsMicPermissionOpen(true);
        } else {
          setIsMicPermissionOpen(true);
        }
      },
      (finalText) => {
        setIsListening(false);
        if (finalText && finalText.trim()) {
          handleSendMessage(finalText.trim());
        }
      }
    );
  };

  const handleReset = () => {
    speechService.stopSpeaking();
    if (activeScenario) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'ai',
          english: activeScenario.initialMessageEn,
          indonesian: activeScenario.initialMessageId,
          vocabulary: [],
          suggestedReplies: activeScenario.starterPrompts?.map(p => `${p.enText} (${p.idText})`) || []
        }
      ]);
    } else {
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative select-none">
      {/* Mini Scenario Banner */}
      <div className="px-3.5 py-2 bg-white/95 border-b border-slate-200/70 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-lg shrink-0">
            {activeScenario ? activeScenario.emoji : '💬'}
          </span>
          <div className="truncate">
            <h4 className="font-bold text-xs text-slate-800 truncate">
              {activeScenario ? activeScenario.title : 'Ngobrol Santai Bebas'}
            </h4>
            <p className="text-[10px] text-slate-400 truncate">
              {activeScenario ? activeScenario.englishTitle : 'AI aktif bercerita & memancing obrolan'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenSettings}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
              isAiActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
            title={isAiActive ? 'Cloud AI Aktif (Percakapan Bebas)' : 'Mode Percakapan Offline (Klik untuk aktifkan Cloud AI)'}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{isAiActive ? conversationEngine.getAiProviderName() : 'Mode Standar'}</span>
          </button>

          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
            {activeSpeedRate}x
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Mulai obrolan dari awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll View (Optimized for Mobile Phone Screen) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
        {/* Banner Panduan Aktifkan AI jika belum aktif */}
        {!isAiActive && (
          <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 border-2 border-indigo-200 rounded-2xl p-3 flex items-center justify-between gap-2.5 shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="text-[11px] text-slate-800 leading-tight">
                <span className="font-bold text-indigo-900 block text-xs">Ingin ngobrol bebas topik apa saja dengan AI asli?</span>
                <p className="text-[11px] text-slate-600 mt-0.5">Saat ini masih di mode template bawaan. Masukkan <strong>Google Gemini / Groq API Key (100% Gratis)</strong> agar AI bisa diajak ngobrol hidup tanpa batas!</p>
              </div>
            </div>
            <button
              onClick={onOpenSettings}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Masukkan AI
            </button>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* USER BUBBLE */}
            {msg.sender === 'user' ? (
              <div className="max-w-[92%] sm:max-w-[88%] bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white rounded-2xl rounded-tr-xs p-3.5 shadow-md">
                {/* Original text */}
                <div className="pb-1.5 mb-2 border-b border-indigo-400/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 block mb-0.5">
                    🗣️ Ucapan Anda:
                  </span>
                  <p className="text-xs font-medium text-indigo-100 italic">
                    "{msg.userOriginalText}"
                  </p>
                </div>

                {/* English Bridge */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    {msg.hasCorrection ? "Perbaikan Bahasa Inggris Alami:" : "Bahasa Inggris Tepat:"}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug mb-2">
                    "{msg.correctedEnglish || msg.english}"
                  </p>

                  {/* Arti Kalimat Perbaikan dalam Bahasa Indonesia */}
                  {(msg.correctedMeaning || msg.indonesian) && (
                    <div className="bg-indigo-950/60 rounded-xl p-2.5 mb-2 border border-emerald-400/30 shadow-inner">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block mb-0.5 flex items-center gap-1">
                        <span>🇮🇩</span> Artinya:
                      </span>
                      <p className="text-xs font-semibold text-emerald-100 leading-snug">
                        {msg.correctedMeaning || msg.indonesian}
                      </p>
                    </div>
                  )}

                  {/* Tips Koreksi Native */}
                  {msg.correctionTip && (
                    <div className="bg-amber-400/10 rounded-xl p-2 mb-2 border border-amber-300/30 text-amber-100 text-[11px] leading-snug flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-200 block text-[10px] uppercase font-bold">Tips Native:</strong>
                        <span>{msg.correctionTip}</span>
                      </div>
                    </div>
                  )}

                  {/* Phonetic Cara Baca */}
                  {msg.phonetic && (
                    <div className="bg-indigo-900/80 rounded-lg px-2.5 py-1 text-[11px] text-indigo-100 font-mono inline-block mb-2 border border-indigo-500/40">
                      <span className="text-amber-300 mr-1 font-sans font-semibold">🗣️ Cara Baca:</span>
                      {msg.phonetic}
                    </div>
                  )}

                  {/* Audio & Practice Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-indigo-400/30">
                    <AudioPlayerButton
                      text={msg.correctedEnglish || msg.english}
                      rate={activeSpeedRate}
                      label="Dengar Perbaikan"
                      size="sm"
                      className="bg-white/15 text-white hover:bg-white/25 border-white/25 text-[11px] py-1 px-2.5"
                    />

                    <button
                      onClick={() => setPracticingSentence({
                        sentence: msg.correctedEnglish || msg.english,
                        phonetic: msg.phonetic,
                        meaning: msg.correctedMeaning || msg.indonesian || msg.userOriginalText
                      })}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-full text-[11px] shadow-2xs active:scale-95 transition-transform"
                    >
                      <Mic className="w-3 h-3" /> Tirukan Perbaikan!
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* AI BUBBLE */
              <div className="max-w-[90%] bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-2xs border border-slate-200/80">
                {/* Header AI Avatar */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                    E
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Echo</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
                    msg.source === 'gemini' 
                      ? 'text-emerald-700 bg-emerald-100/90 border border-emerald-200' 
                      : msg.source === 'groq'
                      ? 'text-purple-700 bg-purple-100/90 border border-purple-200'
                      : 'text-indigo-600 bg-indigo-50'
                  }`}>
                    {msg.source === 'gemini' ? '✨ Gemini AI' : msg.source === 'groq' ? '⚡ Groq AI' : 'Smart Buddy'}
                  </span>
                </div>

                {/* AI Spoken English (Story & Question) */}
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed mb-1.5">
                  "{msg.english}"
                </p>

                {/* Indonesian Translation */}
                <p className="text-[11px] sm:text-xs text-slate-500 italic mb-2.5 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <strong className="text-slate-600 not-italic block mb-0.5">Artinya:</strong>
                  {msg.indonesian}
                </p>

                {/* Audio Button */}
                <div className="flex items-center gap-1.5 mb-2">
                  <AudioPlayerButton
                    text={msg.english}
                    rate={activeSpeedRate}
                    label="Putar Suara"
                    size="sm"
                    className="text-[11px] py-1 px-2.5"
                  />
                  <button
                    onClick={() => setPracticingSentence({
                      sentence: msg.english,
                      phonetic: '',
                      meaning: msg.indonesian
                    })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full text-[11px] transition-colors"
                  >
                    <Mic className="w-3 h-3 text-indigo-600" /> Tirukan
                  </button>
                </div>

                {/* PROACTIVE SUGGESTED REPLIES (Multiple options for easy continuation) */}
                {msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 mt-2 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 block">
                      💡 Pilih balasan cepat untuk menjawab:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.suggestedReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => handleSendMessage(reply)}
                          className="text-left text-[11px] bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-900 px-2.5 py-1.5 rounded-xl border border-indigo-100 font-medium transition-all active:scale-98 flex items-center justify-between group"
                        >
                          <span className="leading-snug">{reply}</span>
                          <ArrowRight className="w-3 h-3 text-indigo-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-2 p-2.5 bg-white rounded-2xl border border-slate-100 max-w-xs shadow-2xs text-xs text-slate-500 font-medium">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-200"></div>
            <span>Echo sedang merespons...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel for current scenario */}
      {activeScenario?.starterPrompts && (
        <div className="px-3 py-1 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0 bg-slate-100/60 border-t border-slate-200/50">
          {activeScenario.starterPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.idText)}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200/80 rounded-lg text-[11px] text-slate-700 whitespace-nowrap shadow-2xs shrink-0 font-medium active:scale-95 flex items-center gap-1"
            >
              <span>💬 {p.idText}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Bar Fixed for Thumb Accessibility */}
      <div className="p-2 sm:p-2.5 bg-white border-t border-slate-200/80 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          {/* Microphone */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2.5 rounded-xl transition-all duration-200 shrink-0 ${
              isListening
                ? "bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse scale-105"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
            title="Bicara dengan Mikrofon"
          >
            {isListening ? (
              <MicOff className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? "Mendengarkan... silakan bicara!"
                : "Ketik / jawab apa saja (bhs Indo/Inggris)..."
            }
            className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-400 font-medium"
          />

          {/* Send */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
            title="Kirim"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {isListening && (
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-rose-600 font-semibold px-2 animate-pulse">
            <span>🎙️ Katakan apa saja...</span>
            <button
              type="button"
              onClick={handleToggleVoice}
              className="underline"
            >
              Berhenti
            </button>
          </div>
        )}
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

      {/* Android Microphone Permission Modal Guide */}
      <MicPermissionModal
        isOpen={isMicPermissionOpen}
        onClose={() => setIsMicPermissionOpen(false)}
        onPermissionGranted={() => {
          handleToggleVoice();
        }}
      />
    </div>
  );
}
