import { getPhoneticGuide } from './phonetics.js';
import { EXPANDED_TOPICS, getDynamicContextualReply } from '../data/conversationalTopics.js';

/**
 * Intelligent Conversation Engine with Multi-Tier AI & Proactive Storytelling
 * Tiers:
 * 1. Cloud AI (Google Gemini 2.0 / Groq Llama 3.3) for unlimited dynamic chat.
 * 2. 38+ Real-Life Conversational Modules with zero latency.
 * 3. Smart Grammar Correction for Broken English.
 * 4. Dynamic Context-Aware Responses (Question vs Statement vs Expression).
 */
export class ConversationEngine {
  constructor() {
    const envGemini = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ? import.meta.env.VITE_GEMINI_API_KEY.trim() : '';
    const envGroq = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ? import.meta.env.VITE_GROQ_API_KEY.trim() : '';
    const localKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('gemini_api_key') || '') : '';
    this.apiKey = localKey || envGemini || envGroq || '';
    this.lastError = null;
  }

  setApiKey(key) {
    this.apiKey = (key || '').trim();
    if (this.apiKey) {
      if (typeof localStorage !== 'undefined') localStorage.setItem('gemini_api_key', this.apiKey);
    } else {
      if (typeof localStorage !== 'undefined') localStorage.removeItem('gemini_api_key');
      const envGemini = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ? import.meta.env.VITE_GEMINI_API_KEY.trim() : '';
      const envGroq = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ? import.meta.env.VITE_GROQ_API_KEY.trim() : '';
      if (envGemini || envGroq) this.apiKey = envGemini || envGroq;
    }
  }

  getApiKey() {
    return this.apiKey;
  }

  isAiActive() {
    if (this.apiKey && this.apiKey.length > 5) return true;
    if (typeof window !== 'undefined' && window.puter && window.puter.ai) return true;
    return true;
  }

  getAiProviderName() {
    if (this.apiKey && this.apiKey.length > 5) {
      if (this.apiKey.startsWith('gsk_')) return 'Groq Llama 3.3';
      if (this.apiKey.startsWith('sk-or-')) return 'OpenRouter AI';
      if (this.apiKey.startsWith('sk-')) return 'DeepSeek / OpenAI';
      return 'Google Gemini AI';
    }
    if (typeof window !== 'undefined' && window.puter && window.puter.ai) {
      return 'AI Pintar (Bawaan)';
    }
    return 'Cloud AI Aktif';
  }

  getLastError() {
    return this.lastError;
  }

  isIndonesian(text) {
    const indonesianCommonWords = [
      'saya', 'aku', 'kamu', 'anda', 'mau', 'ingin', 'bisa', 'dan', 'ini', 'itu', 
      'yang', 'dengan', 'di', 'ke', 'dari', 'apa', 'kenapa', 'mengapa', 'bagaimana', 
      'kapan', 'sudah', 'belum', 'tidak', 'nggak', 'gak', 'bukan', 'tolong', 'terima', 
      'kasih', 'lagi', 'suka', 'kopi', 'pesan', 'makan', 'iya', 'ya', 'capek', 'enak',
      'siapa', 'dimana', 'bagus', 'banget', 'dong', 'sih', 'kan', 'nih', 'deh'
    ];
    const words = text.toLowerCase().split(/\s+/);
    let idCount = 0;
    words.forEach(w => {
      if (indonesianCommonWords.includes(w)) idCount++;
    });
    return idCount > 0 || !/[a-z]/.test(text);
  }

  async processMessage(userText, contextScenario = 'daily', history = []) {
    const text = userText.trim();
    if (!text) return null;

    // Tier 1: User's configured API Key (Google Gemini, Groq, OpenRouter, OpenAI)
    if (this.apiKey) {
      try {
        let aiResult = null;
        if (this.apiKey.startsWith('gsk_')) {
          aiResult = await this.callGroqAPI(text, contextScenario, history);
        } else if (this.apiKey.startsWith('sk-or-') || this.apiKey.startsWith('sk-')) {
          aiResult = await this.callOpenAiCompatibleAPI(text, contextScenario, history);
        } else {
          aiResult = await this.callGeminiAPI(text, contextScenario, history);
        }

        if (aiResult) {
          this.lastError = null;
          return aiResult;
        }
      } catch (err) {
        this.lastError = err.message || 'Gagal memanggil Cloud AI API';
        console.warn('API Key call failed, falling back to built-in AI:', err);
      }
    }

    // Tier 2: Built-in Browser AI (Puter.js GPT-4o-mini - 100% Free & Automatic, No Key Needed!)
    if (typeof window !== 'undefined' && window.puter && window.puter.ai) {
      try {
        const puterResult = await this.callPuterAI(text, contextScenario, history);
        if (puterResult) {
          this.lastError = null;
          return puterResult;
        }
      } catch (err) {
        console.warn('Puter AI fallback:', err);
      }
    }

    // Tier 3: Free Public AI (Pollinations with 6s timeout)
    try {
      const freeResult = await this.callFreePollinationsAI(text, contextScenario, history);
      if (freeResult) {
        this.lastError = null;
        return freeResult;
      }
    } catch (err) {
      console.warn('Free AI fallback:', err);
    }

    // Tier 4: Smart Local Dynamic Engine (Full offline backup)
    return this.processLocally(text, contextScenario);
  }

  processLocally(text, scenario) {
    const lower = text.toLowerCase().trim();
    
    // Check keyword matches in Expanded Knowledge Base
    let bestMatch = null;
    let maxMatchedKeywords = 0;

    for (const item of EXPANDED_TOPICS) {
      let count = 0;
      for (const kw of item.keywords) {
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const wordRegex = new RegExp(`(^|\\s|[.,!?])${escaped}(\\s|[.,!?]|$)`, 'i');
        if (lower === kw) {
          count += 20 + kw.length;
        } else if (wordRegex.test(lower)) {
          count += 5 + (kw.length > 3 ? kw.length : 1);
        } else if (kw.length >= 4 && lower.includes(kw)) {
          count += kw.length;
        }
      }
      if (count > maxMatchedKeywords) {
        maxMatchedKeywords = count;
        bestMatch = item;
      }
    }

    if (bestMatch && maxMatchedKeywords > 0) {
      const cleanUser = lower.replace(/[^a-z0-9]/g, '');
      const cleanCorrected = bestMatch.correctedEnglish.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isIndo = this.isIndonesian(text);
      const hasCorrection = isIndo || cleanUser !== cleanCorrected;

      return {
        userOriginalText: text,
        hasCorrection: hasCorrection,
        correctedEnglish: bestMatch.correctedEnglish,
        correctedMeaning: bestMatch.correctedMeaning,
        correctionTip: bestMatch.correctionTip || "Ini cara yang lebih alami dan biasa diucapkan penutur asli.",
        phonetic: bestMatch.phonetic,
        vocabulary: bestMatch.vocab,
        aiReplyEn: bestMatch.aiReplyEn,
        aiReplyId: bestMatch.aiReplyId,
        suggestedReplies: bestMatch.suggestedReplies || [bestMatch.suggestedReply],
        source: 'local'
      };
    }

    // Dynamic Context-Aware Fallback for any general input
    const isIndo = this.isIndonesian(text);
    const brokenCorrection = this.smartLocalCorrection(text, isIndo);
    const dynamicReply = getDynamicContextualReply(text, isIndo, scenario);

    const finalCorrected = brokenCorrection ? brokenCorrection.corrected : dynamicReply.corrected;
    const finalMeaning = brokenCorrection ? brokenCorrection.meaning : dynamicReply.meaning;
    const finalTip = brokenCorrection ? brokenCorrection.tip : dynamicReply.tip;

    const phonetic = getPhoneticGuide(finalCorrected);
    const cleanUser = lower.replace(/[^a-z0-9]/g, '');
    const cleanCorrected = finalCorrected.toLowerCase().replace(/[^a-z0-9]/g, '');
    const hasCorrection = isIndo || cleanUser !== cleanCorrected;

    return {
      userOriginalText: text,
      hasCorrection: hasCorrection,
      correctedEnglish: finalCorrected,
      correctedMeaning: finalMeaning,
      correctionTip: finalTip,
      phonetic: phonetic,
      vocabulary: [
        { word: finalCorrected.split(' ')[0] || "Hello", meaning: "Kata kunci" },
        { word: "Practice", meaning: "Latihan" }
      ],
      aiReplyEn: dynamicReply.aiReplyEn,
      aiReplyId: dynamicReply.aiReplyId,
      suggestedReplies: dynamicReply.suggestedReplies,
      source: 'local'
    };
  }

  smartLocalCorrection(text, isIndo) {
    const lower = text.toLowerCase().trim();

    // Handling common broken English phrases
    if (lower.includes('i want buy') || lower.includes('want buy')) {
      return {
        corrected: "I would like to buy this, please.",
        meaning: "Saya ingin membeli barang ini ya.",
        tip: "Gunakan 'I would like to buy' agar terdengar lebih sopan daripada 'I want buy'."
      };
    }
    if (lower.includes('where toilet') || lower.includes('where is toilet')) {
      return {
        corrected: "Excuse me, where is the restroom?",
        meaning: "Permisi, di mana letak toiletnya?",
        tip: "Di luar negeri kata 'restroom' atau 'washroom' lebih umum dan sopan digunakan daripada sekadar 'toilet'."
      };
    }
    if (lower.includes('how much this') || lower.includes('how much price')) {
      return {
        corrected: "How much does this cost?",
        meaning: "Berapa harga barang ini?",
        tip: "Bentuk kalimat tanya yang benar adalah 'How much does this cost?' atau 'How much is this?'."
      };
    }
    if (lower.includes('i no understand') || lower.includes('not understand') || lower.includes('i not understand')) {
      return {
        corrected: "I don't understand, could you please repeat that?",
        meaning: "Saya kurang paham, bisakah tolong ulangi sekali lagi?",
        tip: "Dalam bahasa Inggris gunakan 'I don't understand', bukan 'I no understand'."
      };
    }
    if (lower.includes('i very like') || lower.includes('me like very')) {
      return {
        corrected: "I really like this so much!",
        meaning: "Saya sangat menyukai ini!",
        tip: "Katakan 'I really like' (bukan 'I very like'). Kata 'very' tidak diletakkan sebelum kata kerja like."
      };
    }
    if (lower.includes('i go yesterday') || lower.includes('me go yesterday')) {
      return {
        corrected: "I went there yesterday.",
        meaning: "Saya pergi ke sana kemarin.",
        tip: "Karena terjadi kemarin (lampau), kata kerja 'go' berubah menjadi 'went'."
      };
    }
    if (lower.includes('can help me') || lower.includes('can you help')) {
      return {
        corrected: "Could you please help me with this?",
        meaning: "Bisakah Anda tolong membantu saya dengan ini?",
        tip: "Gunakan 'Could you please help me' agar terdengar lebih santun dibanding 'can help me'."
      };
    }
    if (lower.includes('who you') || lower.includes('who are you')) {
      return {
        corrected: "Who are you, and what can you do?",
        meaning: "Siapakah Anda, dan apa saja yang bisa Anda lakukan?",
        tip: "Bentuk tanya lengkap adalah 'Who are you?'."
      };
    }
    if (lower.includes('what you do') || lower.includes('what doing')) {
      return {
        corrected: "What are you doing right now?",
        meaning: "Apa yang sedang kamu lakukan sekarang?",
        tip: "Gunakan 'What are you doing' dengan to-be 'are' dan akhiran '-ing'."
      };
    }
    if (lower.includes('i agree you')) {
      return {
        corrected: "I agree with you completely!",
        meaning: "Saya sangat setuju denganmu!",
        tip: "Harus ada kata 'with' setelah agree: 'I agree with you'."
      };
    }
    if (lower.includes('my english bad') || lower.includes('english is bad')) {
      return {
        corrected: "My English is still developing, but I'm practicing daily!",
        meaning: "Bahasa Inggris saya masih terus berkembang, dan saya latihan setiap hari!",
        tip: "Daripada bilang 'my English bad', katakan 'I'm practicing daily' agar terdengar positif!"
      };
    }
    if (lower.includes('thank for you') || lower.includes('thanks for you')) {
      return {
        corrected: "Thank you very much!",
        meaning: "Terima kasih banyak!",
        tip: "Cukup katakan 'Thank you' atau 'Thanks', tanpa kata 'for you'."
      };
    }

    return null;
  }

  async callGeminiAPI(userText, scenario, history = []) {
    let conversationHistoryText = '';
    if (history && history.length > 0) {
      conversationHistoryText = 'RIWAYAT PERCAKAPAN SEBELUMNYA (Perhatikan konteks ini agar obrolan terus nyambung secara natural):\n' +
        history.slice(-6).map(m => `${m.sender === 'user' ? 'User' : 'Echo (Tutor AI)'}: ${m.text}`).join('\n') + '\n\n';
    }

    const prompt = `
PERAN ANDA:
Anda adalah 'Echo', tutor dan teman ngobrol native speaker bahasa Inggris yang SANGAT RAMAH, TELITI MEMBIMBING, HANGAT, dan PROAKTIF MEMBUKA CERITA.
Lawan bicara Anda adalah orang Indonesia pemula yang sedang belajar bahasa Inggris dan SERINGKALI BERBICARA DALAM BAHASA INGGRIS SEMBARANG / TATA BAHASA RUSAK (Broken English), atau campuran Bahasa Indonesia pendek (misal: "I want buy coffee", "where toilet", "how much this", "ya", "dingin", "capek", "besok libur").

${conversationHistoryText}Topik / Skenario obrolan saat ini: "${scenario}".
Ucapan Pengguna Terbaru: "${userText}".

TUGAS PENTING ANDA:
1. DETEKSI & PERBAIKI: 
   - Jika ucapan pengguna berbahasa Indonesia atau bahasa Inggrisnya kurang tepat / kaku (broken English), ubah menjadi kalimat bahasa Inggris yang santai, tepat, dan alami yang biasa diucapkan penutur asli (correctedEnglish). Set "hasCorrection": true.
   - Jika ucapan pengguna sudah dalam bahasa Inggris yang baik dan benar, tetap masukkan ke "correctedEnglish" dan set "hasCorrection": false.
2. TULISKAN ARTINYA: Tuliskan terjemahan Bahasa Indonesia yang lengkap dan jelas dari kalimat bahasa Inggris yang sudah diperbaiki tersebut (correctedMeaning). Pengguna WAJIB tahu persis apa arti kalimat perbaikannya!
3. BERIKAN TIPS SINGKAT: Jelaskan dalam 1 kalimat ramah bahasa Indonesia mengapa kalimat itu diperbaiki atau bagaimana tips penggunaannya (correctionTip).
4. CARA BACA (PHONETIC): Berikan 'phonetic' (cara baca ramah lidah Indonesia untuk kalimat perbaikan).
5. KOSAKATA PENTING: Pilih 1-2 kata penting beserta artinya (vocabulary).
6. DI BAGIAN JAWABAN OBROLAN ANDA (aiReplyEn & aiReplyId):
   - Sambut ucapan pengguna dengan hangat dan antusias sesuai konteks obrolan.
   - BERCERITALAH 1-2 kalimat (anekdot seru, kebiasaan bule, atau cerita santai terkait topik itu).
   - LEMPAR SATU PERTANYAAN RAMAH & MENARIK untuk memancing obrolan berlanjut tanpa membuat pengguna tertekan.
   - Tuliskan terjemahan bahasa Indonesianya di (aiReplyId).
7. PILIHAN BALASAN (suggestedReplies):
   - Berikan 3 opsi balasan bahasa Inggris singkat yang bisa dipilih pengguna, masing-masing dengan artinya dalam kurung, misal: "I love iced coffee! (Saya suka es kopi!)".

Balas HANYA dalam format JSON valid tanpa tanda backtick markdown atau teks lainnya:
{
  "hasCorrection": true,
  "correctedEnglish": "...",
  "correctedMeaning": "...",
  "correctionTip": "...",
  "phonetic": "...",
  "vocabulary": [
    { "word": "...", "meaning": "..." }
  ],
  "aiReplyEn": "...",
  "aiReplyId": "...",
  "suggestedReplies": [
    "Option 1 in English (Arti bahasa Indonesia)",
    "Option 2 in English (Arti bahasa Indonesia)",
    "Option 3 in English (Arti bahasa Indonesia)"
  ]
}
`;

    const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.75,
              responseMimeType: "application/json"
            }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `Gemini API error (${model}): ${response.statusText}`);
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) throw new Error(`No content from Gemini (${model})`);

        const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleanJson);

        const correctedEng = parsed.correctedEnglish || parsed.englishTranslation || userText;
        const cleanUser = userText.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanCorrected = (correctedEng || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const isIndo = this.isIndonesian(userText);
        const hasCorrection = parsed.hasCorrection !== undefined 
          ? Boolean(parsed.hasCorrection) 
          : (cleanUser !== cleanCorrected || isIndo);

        return {
          userOriginalText: userText,
          hasCorrection: hasCorrection,
          correctedEnglish: correctedEng,
          correctedMeaning: parsed.correctedMeaning || "Terjemahan kalimat dalam bahasa Indonesia",
          correctionTip: parsed.correctionTip || "Ini cara yang lebih alami dan tepat untuk mengatakannya.",
          phonetic: parsed.phonetic || getPhoneticGuide(correctedEng),
          vocabulary: parsed.vocabulary || [],
          aiReplyEn: parsed.aiReplyEn,
          aiReplyId: parsed.aiReplyId,
          suggestedReplies: parsed.suggestedReplies || [parsed.suggestedReply || ''],
          source: 'gemini'
        };
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Gagal menghubungkan ke Google Gemini AI');
  }

  async callGroqAPI(userText, scenario, history = []) {
    const systemPrompt = `You are 'Echo', a super friendly, enthusiastic native English conversation partner and tutor for Indonesian learners.
Topik/Skenario obrolan saat ini: "${scenario}".
Tugas penting Anda:
1. correctedEnglish: Perbaiki ucapan pengguna menjadi kalimat bahasa Inggris yang santai, benar, dan natural (atau pertahankan jika sudah benar).
2. correctedMeaning: Terjemahan bahasa Indonesia lengkap dari correctedEnglish.
3. correctionTip: 1 kalimat tips bahasa Indonesia ramah.
4. phonetic: Cara baca ramah lidah Indonesia.
5. vocabulary: 2 kata penting beserta artinya.
6. aiReplyEn: Respons hangat bahasa Inggris yang membalas obrolan, bercerita 1-2 kalimat, dan melemparkan pertanyaan balik yang ramah agar obrolan terus berlanjut.
7. aiReplyId: Terjemahan bahasa Indonesia dari aiReplyEn.
8. suggestedReplies: 3 balasan pilihan bahasa Inggris santai + artinya dalam kurung.

Balas HANYA dalam JSON valid:
{
  "hasCorrection": true,
  "correctedEnglish": "...",
  "correctedMeaning": "...",
  "correctionTip": "...",
  "phonetic": "...",
  "vocabulary": [{ "word": "...", "meaning": "..." }],
  "aiReplyEn": "...",
  "aiReplyId": "...",
  "suggestedReplies": ["Opt 1 (Arti)", "Opt 2 (Arti)", "Opt 3 (Arti)"]
}`;

    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    if (history && history.length > 0) {
      for (const h of history.slice(-6)) {
        messages.push({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text
        });
      }
    }

    messages.push({
      role: 'user',
      content: `Konteks/Skenario: "${scenario}". Ucapan pengguna terbaru: "${userText}"`
    });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        response_format: { type: 'json_object' },
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;
    if (!rawText) throw new Error('No content returned from Groq');

    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleanJson);

    const correctedEng = parsed.correctedEnglish || parsed.englishTranslation || userText;
    const cleanUser = userText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanCorrected = (correctedEng || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const isIndo = this.isIndonesian(userText);
    const hasCorrection = parsed.hasCorrection !== undefined 
      ? Boolean(parsed.hasCorrection) 
      : (cleanUser !== cleanCorrected || isIndo);

    return {
      userOriginalText: userText,
      hasCorrection: hasCorrection,
      correctedEnglish: correctedEng,
      correctedMeaning: parsed.correctedMeaning || "Terjemahan kalimat dalam bahasa Indonesia",
      correctionTip: parsed.correctionTip || "Ini cara yang lebih alami dan tepat untuk mengatakannya.",
      phonetic: parsed.phonetic || getPhoneticGuide(correctedEng),
      vocabulary: parsed.vocabulary || [],
      aiReplyEn: parsed.aiReplyEn,
      aiReplyId: parsed.aiReplyId,
      suggestedReplies: parsed.suggestedReplies || [parsed.suggestedReply || ''],
      source: 'groq'
    };
  }

  async callOpenAiCompatibleAPI(userText, scenario, history = []) {
    const isOpenRouter = this.apiKey.startsWith('sk-or-');
    const endpoint = isOpenRouter 
      ? 'https://openrouter.ai/api/v1/chat/completions' 
      : 'https://api.openai.com/v1/chat/completions';
    const model = isOpenRouter 
      ? 'meta-llama/llama-3.3-70b-instruct:free' 
      : 'gpt-4o-mini';

    const systemPrompt = `You are 'Echo', a friendly English tutor for Indonesian learners. Respond strictly in valid JSON:
{
  "hasCorrection": true,
  "correctedEnglish": "...",
  "correctedMeaning": "...",
  "correctionTip": "...",
  "phonetic": "...",
  "vocabulary": [{ "word": "...", "meaning": "..." }],
  "aiReplyEn": "...",
  "aiReplyId": "...",
  "suggestedReplies": ["Option 1 (Arti 1)", "Option 2 (Arti 2)", "Option 3 (Arti 3)"]
}`;

    const messages = [{ role: 'system', content: systemPrompt }];
    if (history && history.length > 0) {
      for (const h of history.slice(-6)) {
        messages.push({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text
        });
      }
    }
    messages.push({
      role: 'user',
      content: `Konteks: "${scenario}". Ucapan pengguna: "${userText}"`
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;
    if (!rawText) throw new Error('No content returned from AI API');

    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleanJson);

    const correctedEng = parsed.correctedEnglish || parsed.englishTranslation || userText;
    const cleanUser = userText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanCorrected = (correctedEng || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const isIndo = this.isIndonesian(userText);
    const hasCorrection = parsed.hasCorrection !== undefined 
      ? Boolean(parsed.hasCorrection) 
      : (cleanUser !== cleanCorrected || isIndo);

    return {
      userOriginalText: userText,
      hasCorrection: hasCorrection,
      correctedEnglish: correctedEng,
      correctedMeaning: parsed.correctedMeaning || "Terjemahan kalimat dalam bahasa Indonesia",
      correctionTip: parsed.correctionTip || "Ini cara yang lebih alami dan tepat untuk mengatakannya.",
      phonetic: parsed.phonetic || getPhoneticGuide(correctedEng),
      vocabulary: parsed.vocabulary || [],
      aiReplyEn: parsed.aiReplyEn,
      aiReplyId: parsed.aiReplyId,
      suggestedReplies: parsed.suggestedReplies || [parsed.suggestedReply || ''],
      source: isOpenRouter ? 'openrouter' : 'openai'
    };
  }

  async callPuterAI(userText, scenario, history = []) {
    if (typeof window === 'undefined' || !window.puter || !window.puter.ai || !window.puter.ai.chat) {
      throw new Error('Puter AI belum tersedia di browser');
    }

    let conversationHistoryText = '';
    if (history && history.length > 0) {
      conversationHistoryText = 'RIWAYAT OBROLAN SEBELUMNYA (Perhatikan konteks ini agar obrolan nyambung alami):\n' +
        history.slice(-6).map(m => `${m.sender === 'user' ? 'User' : 'Echo (AI)'}: ${m.text}`).join('\n') + '\n\n';
    }

    const prompt = `
PERAN ANDA:
Anda adalah 'Echo', tutor dan teman ngobrol native speaker bahasa Inggris yang SANGAT RAMAH, HANGAT, ANTUSIAS, dan PROAKTIF MEMBUKA CERITA untuk orang Indonesia pemula.
${conversationHistoryText}Topik / Skenario: "${scenario}".
Ucapan Pengguna Terbaru: "${userText}".

TUGAS PENTING:
1. DETEKSI & PERBAIKI: Jika ucapan pengguna berbahasa Indonesia atau broken English, ubah jadi kalimat bahasa Inggris santai yang alami (correctedEnglish). Jika sudah benar, pertahankan dan set "hasCorrection": false.
2. ARTI: Tuliskan arti bahasa Indonesia lengkap dari kalimat perbaikan (correctedMeaning).
3. TIPS: 1 kalimat tips bahasa Indonesia yang ramah (correctionTip).
4. CARA BACA: Panduan cara baca ramah lidah Indonesia (phonetic).
5. KOSAKATA: 2 kata penting beserta arti (vocabulary).
6. BALASAN:
   - Jawab obrolan pengguna dengan antusias (aiReplyEn).
   - Ceritakan 1-2 kalimat pengalaman/cerita seru terkait topik.
   - Lempar 1 PERTANYAAN RAMAH di akhir agar obrolan terus hidup!
   - Tuliskan terjemahan Indonesianya di (aiReplyId).
7. PILIHAN: 3 balasan singkat bahasa Inggris + artinya dalam kurung (suggestedReplies).

Balas HANYA string JSON valid murni tanpa markdown:
{
  "hasCorrection": true,
  "correctedEnglish": "...",
  "correctedMeaning": "...",
  "correctionTip": "...",
  "phonetic": "...",
  "vocabulary": [{"word": "...", "meaning": "..."}],
  "aiReplyEn": "...",
  "aiReplyId": "...",
  "suggestedReplies": ["Option 1 (Arti 1)", "Option 2 (Arti 2)", "Option 3 (Arti 3)"]
}
`;

    const response = await window.puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
    const rawText = typeof response === 'string'
      ? response
      : (response?.message?.content || response?.text || JSON.stringify(response));

    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Format respon bukan JSON');
    const parsed = JSON.parse(jsonMatch[0]);

    const correctedEng = parsed.correctedEnglish || parsed.englishTranslation || userText;
    const cleanUser = userText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanCorrected = (correctedEng || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const isIndo = this.isIndonesian(userText);
    const hasCorrection = parsed.hasCorrection !== undefined 
      ? Boolean(parsed.hasCorrection) 
      : (cleanUser !== cleanCorrected || isIndo);

    return {
      userOriginalText: userText,
      hasCorrection: hasCorrection,
      correctedEnglish: correctedEng,
      correctedMeaning: parsed.correctedMeaning || "Terjemahan kalimat dalam bahasa Indonesia",
      correctionTip: parsed.correctionTip || "Ini cara yang lebih alami dan tepat untuk mengatakannya.",
      phonetic: parsed.phonetic || getPhoneticGuide(correctedEng),
      vocabulary: parsed.vocabulary || [],
      aiReplyEn: parsed.aiReplyEn,
      aiReplyId: parsed.aiReplyId,
      suggestedReplies: parsed.suggestedReplies || [parsed.suggestedReply || ''],
      source: 'puter'
    };
  }

  async callFreePollinationsAI(userText, scenario, history = []) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    let conversationHistoryText = '';
    if (history && history.length > 0) {
      conversationHistoryText = 'Riwayat obrolan:\n' +
        history.slice(-4).map(m => `${m.sender === 'user' ? 'User' : 'Echo'}: ${m.text}`).join('\n') + '\n\n';
    }

    const prompt = `Anda adalah Echo, tutor bahasa Inggris ramah. ${conversationHistoryText}Topik: "${scenario}". Ucapan pengguna: "${userText}".
Balas HANYA string JSON valid murni:
{
  "hasCorrection": true,
  "correctedEnglish": "...",
  "correctedMeaning": "...",
  "correctionTip": "...",
  "phonetic": "...",
  "vocabulary": [{"word": "...", "meaning": "..."}],
  "aiReplyEn": "...",
  "aiReplyId": "...",
  "suggestedReplies": ["Opt 1 (Arti 1)", "Opt 2 (Arti 2)", "Opt 3 (Arti 3)"]
}`;

    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are Echo, a friendly English tutor. Respond strictly in valid JSON.' },
          { role: 'user', content: prompt }
        ],
        jsonMode: true,
        model: 'openai'
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawText = await res.text();
    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON');
    const parsed = JSON.parse(jsonMatch[0]);

    const correctedEng = parsed.correctedEnglish || userText;
    const cleanUser = userText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanCorrected = (correctedEng || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const isIndo = this.isIndonesian(userText);
    const hasCorrection = parsed.hasCorrection !== undefined 
      ? Boolean(parsed.hasCorrection) 
      : (cleanUser !== cleanCorrected || isIndo);

    return {
      userOriginalText: userText,
      hasCorrection: hasCorrection,
      correctedEnglish: correctedEng,
      correctedMeaning: parsed.correctedMeaning || "Terjemahan kalimat dalam bahasa Indonesia",
      correctionTip: parsed.correctionTip || "Ini cara yang lebih alami dan tepat untuk mengatakannya.",
      phonetic: parsed.phonetic || getPhoneticGuide(correctedEng),
      vocabulary: parsed.vocabulary || [],
      aiReplyEn: parsed.aiReplyEn,
      aiReplyId: parsed.aiReplyId,
      suggestedReplies: parsed.suggestedReplies || [parsed.suggestedReply || ''],
      source: 'free_ai'
    };
  }
}

export const conversationEngine = new ConversationEngine();
