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
  Lightbulb
} from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';
import PronunciationPractice from './PronunciationPractice';
import { conversationEngine } from '../services/conversationEngine';
import { speechService } from '../services/speechService';

export default function ChatView({ activeScenario, currentSpeed, onOpenTips }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [practicingSentence, setPracticingSentence] = useState(null);
  const [activeSpeedRate, setActiveSpeedRate] = useState(currentSpeed);
  const messagesEndRef = useRef(null);

  // Sync speed changes from settings
  useEffect(() => {
    setActiveSpeedRate(currentSpeed);
  }, [currentSpeed]);

  // Load initial welcome message when scenario changes
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
          suggestedReply: activeScenario.starterPrompts?.[0]?.enText || ''
        }
      ]);
    } else {
      setMessages([
        {
          id: 'welcome-free',
          sender: 'ai',
          english: "Hello! Welcome to SpeakBridge. You can speak or type to me in Indonesian, and I will help you say it in natural English!",
          indonesian: "Halo! Selamat datang di SpeakBridge. Kamu bisa bicara atau ketik dalam Bahasa Indonesia, dan saya akan membantumu mengatakannya dalam Bahasa Inggris alami!",
          phonetic: "He-low! Wel-kam tu Spik-Brij...",
          vocabulary: [
            { word: "Welcome", meaning: "Selamat datang" },
            { word: "Speak", meaning: "Bicara" }
          ],
          suggestedReply: "I want to practice speaking English. (Saya mau latihan ngomong bahasa Inggris.)"
        }
      ]);
    }
  }, [activeScenario]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Send
  const handleSendMessage = async (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    setInputText('');
    setIsLoading(true);

    try {
      const scenarioContext = activeScenario ? activeScenario.title : 'general conversation';
      const result = await conversationEngine.processMessage(text, scenarioContext);

      // Create message pair
      const userMsg = {
        id: 'user-' + Date.now(),
        sender: 'user',
        userOriginalText: result.userOriginalText,
        english: result.englishTranslation,
        phonetic: result.phonetic,
        indonesian: result.userOriginalText,
        vocabulary: result.vocabulary,
        source: result.source
      };

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        english: result.aiReplyEn,
        indonesian: result.aiReplyId,
        vocabulary: [],
        suggestedReply: result.suggestedReply
      };

      setMessages((prev) => [...prev, userMsg, aiMsg]);

      // Automatically play AI voice response for natural ear training
      setTimeout(() => {
        speechService.speakEnglish(aiMsg.english, { rate: activeSpeedRate });
      }, 400);

    } catch (err) {
      console.error('Failed to process message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Voice Input
  const handleToggleVoice = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    speechService.startListening(
      'id-ID', // default to Indonesian voice input, but browser also catches common English phrases
      (result) => {
        setInputText(result.interim || result.final);
      },
      (error) => {
        setIsListening(false);
        alert('Izin microphone dibutuhkan di browser untuk fitur bicara.');
      },
      (finalText) => {
        setIsListening(false);
        if (finalText && finalText.trim()) {
          handleSendMessage(finalText.trim());
        }
      }
    );
  };

  const handleResetConversation = () => {
    speechService.stopSpeaking();
    if (activeScenario) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'ai',
          english: activeScenario.initialMessageEn,
          indonesian: activeScenario.initialMessageId,
          vocabulary: [],
          suggestedReply: activeScenario.starterPrompts?.[0]?.enText || ''
        }
      ]);
    } else {
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto px-2 sm:px-4">
      {/* Scenario Header Bar */}
      <div className="py-2.5 px-4 bg-white/90 backdrop-blur rounded-2xl border border-slate-200/80 shadow-2xs mb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">
            {activeScenario ? activeScenario.emoji : '💬'}
          </span>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
              {activeScenario ? activeScenario.title : 'Obrolan Bebas (Free Chat)'}
            </h3>
            <p className="text-[11px] text-slate-400">
              {activeScenario ? activeScenario.englishTitle : 'Ketik atau bicara santai dalam Bahasa Indonesia'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Speed Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold text-slate-600">
            <span className="px-2 text-[10px] text-slate-400">Kecepatan:</span>
            {[0.7, 0.85, 1.0].map((rate) => (
              <button
                key={rate}
                onClick={() => setActiveSpeedRate(rate)}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  activeSpeedRate === rate 
                    ? "bg-white text-indigo-700 shadow-2xs font-bold" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <button
            onClick={handleResetConversation}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Ulangi percakapan dari awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* User Message Bubble */}
            {msg.sender === 'user' ? (
              <div className="max-w-[92%] sm:max-w-[80%] bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-3xl rounded-tr-xs p-4 sm:p-5 shadow-md shadow-indigo-100">
                {/* Indonesian User Input */}
                <div className="pb-2.5 mb-2.5 border-b border-indigo-400/40">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-200 block mb-0.5">
                    Yang Anda Ucapkan (Bahasa Indonesia):
                  </span>
                  <p className="text-sm font-medium text-indigo-50">
                    "{msg.userOriginalText}"
                  </p>
                </div>

                {/* English Bridge Translation */}
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300 block mb-0.5">
                    ✨ Cara Bicara Alaminya (Bahasa Inggris):
                  </span>
                  <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed mb-2">
                    "{msg.english}"
                  </p>

                  {/* Phonetic Guide */}
                  {msg.phonetic && (
                    <div className="bg-indigo-800/80 rounded-xl px-3 py-1 text-xs text-indigo-100 font-mono inline-block mb-3 border border-indigo-500/50">
                      <span className="text-amber-300 mr-1.5 font-sans font-semibold">🗣️ Cara baca:</span>
                      {msg.phonetic}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <AudioPlayerButton
                      text={msg.english}
                      rate={activeSpeedRate}
                      label="Dengarkan Suara"
                      size="sm"
                      className="bg-white/15 text-white hover:bg-white/25 border-white/20"
                    />

                    <button
                      onClick={() => setPracticingSentence({
                        sentence: msg.english,
                        phonetic: msg.phonetic,
                        meaning: msg.userOriginalText
                      })}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-full text-xs shadow-sm transition-all active:scale-95"
                    >
                      <Mic className="w-3.5 h-3.5" /> Latih Ucapkan Ini!
                    </button>
                  </div>

                  {/* Vocabulary breakdown */}
                  {msg.vocabulary && msg.vocabulary.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-indigo-500/40 flex flex-wrap gap-1.5">
                      {msg.vocabulary.map((v, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-indigo-800/60 px-2 py-0.5 rounded-md text-indigo-100 border border-indigo-500/40"
                        >
                          <strong className="text-amber-300">{v.word}:</strong> {v.meaning}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* AI Response Bubble */
              <div className="max-w-[92%] sm:max-w-[80%] bg-white rounded-3xl rounded-tl-xs p-4 sm:p-5 shadow-sm border border-slate-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Teman Ngobrol AI</span>
                  <span className="text-[10px] text-slate-400">Native Partner</span>
                </div>

                {/* AI English Text */}
                <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed mb-1.5">
                  "{msg.english}"
                </p>

                {/* AI Indonesian Translation */}
                <p className="text-xs sm:text-sm text-slate-500 italic mb-3">
                  Artinya: <span className="text-slate-700 font-medium not-italic">{msg.indonesian}</span>
                </p>

                {/* Audio Button */}
                <div className="flex items-center gap-2">
                  <AudioPlayerButton
                    text={msg.english}
                    rate={activeSpeedRate}
                    label="Dengar Balasan"
                    size="sm"
                  />
                  <button
                    onClick={() => setPracticingSentence({
                      sentence: msg.english,
                      phonetic: '',
                      meaning: msg.indonesian
                    })}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full text-xs transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5 text-indigo-600" /> Tirukan Suara Ini
                  </button>
                </div>

                {/* Suggested Follow-up Reply */}
                {msg.suggestedReply && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      💡 Saran balasan yang bisa kamu katakan selanjutnya:
                    </span>
                    <button
                      onClick={() => handleSendMessage(msg.suggestedReply)}
                      className="text-left text-xs bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-900 px-3 py-1.5 rounded-xl border border-indigo-100 font-medium transition-colors flex items-center justify-between w-full group"
                    >
                      <span>"{msg.suggestedReply}"</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 max-w-xs shadow-2xs">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-200"></div>
            <span className="text-xs text-slate-500 font-medium">Sedang menerjemahkan & merespons...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Carousel (if user doesn't know what to say) */}
      {activeScenario?.starterPrompts && (
        <div className="py-1.5 overflow-x-auto flex gap-2 no-scrollbar shrink-0 mb-2">
          {activeScenario.starterPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.idText)}
              className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 rounded-xl text-xs text-slate-700 whitespace-nowrap shadow-2xs transition-all shrink-0 font-medium active:scale-95 flex items-center gap-1.5"
            >
              <span>💬 {p.idText}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-slate-200/80 shadow-lg shrink-0 mb-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Microphone button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-3 rounded-2xl transition-all duration-200 shadow-sm shrink-0 ${
              isListening
                ? "bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse scale-105"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
            title={isListening ? "Klik untuk menghentikan bicara" : "Bicara dengan Mikrofon (Bahasa Indonesia atau Inggris)"}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? "Mendengarkan suaramu... silakan bicara!"
                : "Ketik apa yang ingin kamu katakan (Bhs Indonesia / Inggris)..."
            }
            className="flex-1 bg-transparent px-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-2xl transition-all shadow-md shadow-indigo-100 shrink-0 active:scale-95"
            title="Kirim pesan"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {isListening && (
          <div className="mt-2 pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-rose-600 font-semibold px-2 animate-pulse">
            <span>🎙️ Mikrofon aktif: Katakan apa saja dalam Bahasa Indonesia...</span>
            <button
              type="button"
              onClick={handleToggleVoice}
              className="text-[11px] underline"
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
    </div>
  );
}
