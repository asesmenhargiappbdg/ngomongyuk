/**
 * Speech Service: Web Speech API wrapper for Text-to-Speech (TTS) and Speech-to-Text (STT)
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.recognition = null;
    this.isListening = false;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const updateVoices = () => {
      this.voices = this.synth.getVoices();
    };
    updateVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  getEnglishVoice() {
    if (!this.synth || this.voices.length === 0) {
      this.voices = this.synth ? this.synth.getVoices() : [];
    }
    const preferredVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const naturalVoice = preferredVoices.find(v => 
      v.name.includes('Natural') || 
      v.name.includes('Google') || 
      v.name.includes('Jenny') || 
      v.name.includes('Guy') || 
      v.name.includes('Samantha')
    );
    return naturalVoice || preferredVoices[0] || null;
  }

  getIndonesianVoice() {
    if (!this.synth || this.voices.length === 0) {
      this.voices = this.synth ? this.synth.getVoices() : [];
    }
    return this.voices.find(v => v.lang.startsWith('id')) || null;
  }

  /**
   * Speak English text
   */
  speakEnglish(text, options = {}) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      options.onEnd?.();
      return;
    }

    this.synth.cancel();

    const cleanText = text.replace(/[*_#`]/g, '').trim();
    if (!cleanText) {
      options.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = options.rate || 0.85;
    utterance.pitch = options.pitch || 1.0;

    const voice = this.getEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    let finished = false;
    let fallbackTimer = null;

    const finish = () => {
      if (!finished) {
        finished = true;
        if (fallbackTimer) clearTimeout(fallbackTimer);
        options.onEnd?.();
      }
    };

    utterance.onstart = () => options.onStart?.();
    utterance.onend = () => finish();
    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      options.onError?.(e);
      finish();
    };

    // Safety fallback: estimate duration based on word count + rate
    const words = cleanText.split(/\s+/).length;
    const estimatedDurationMs = Math.max(2500, Math.ceil((words / (utterance.rate || 0.85)) * 900) + 2500);
    fallbackTimer = setTimeout(finish, estimatedDurationMs);

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Explicitly request microphone access via getUserMedia (triggers native Android Chrome permission popup)
   */
  async requestMicPermission() {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return { granted: true };
      } catch (err) {
        return { 
          granted: false, 
          error: err.name || 'NotAllowedError',
          message: err.message 
        };
      }
    }
    return { granted: false, error: 'NotSupported' };
  }

  /**
   * Initialize speech recognition
   */
  initRecognition(lang = 'id-ID', onResult, onError, onEnd) {
    const SpeechRecognition = typeof window !== 'undefined' 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
      : null;

    if (!SpeechRecognition) {
      return {
        supported: false,
        error: 'Browser Anda belum mendukung Speech Recognition. Gunakan Google Chrome.'
      };
    }

    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {}
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = lang; // 'id-ID' or 'en-US'
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    let finalTranscript = '';

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      onResult({
        final: finalTranscript.trim(),
        interim: interimTranscript.trim()
      });
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      console.warn('SpeechRecognition error:', event.error);
      onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd?.(finalTranscript.trim());
    };

    return { supported: true, recognition: this.recognition };
  }

  startListening(lang = 'id-ID', onResult, onError, onEnd) {
    const { supported, error } = this.initRecognition(lang, onResult, onError, onEnd);
    if (!supported) {
      onError?.(error);
      return false;
    }
    try {
      this.recognition.start();
      return true;
    } catch (err) {
      console.error('Failed to start recognition:', err);
      onError?.(err.message);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
