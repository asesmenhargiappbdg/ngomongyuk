import { getPhoneticGuide } from './phonetics';

/**
 * Intelligent Conversation Engine with both Local Smart Matching and Gemini API integration
 */

// Common dialogue knowledge base for local offline learning
const KNOWLEDGE_BASE = [
  {
    keywords: ['halo', 'hai', 'pagi', 'siang', 'sore', 'malam', 'apa kabar', 'kabar baik', 'hello', 'hi'],
    englishTranslation: "Hello! How are you doing today?",
    phonetic: "He-low! Hau ar yu du-ing tu-dey?",
    vocab: [
      { word: "Hello", meaning: "Halo" },
      { word: "How are you", meaning: "Bagaimana kabarmu" },
      { word: "Today", meaning: "Hari ini" }
    ],
    aiReplyEn: "Hi there! I'm doing great, thank you for asking! How is your day going so far?",
    aiReplyId: "Halo! Kabar saya sangat baik, terima kasih sudah bertanya! Bagaimana harimu sejauh ini?",
    suggestedReply: "I am doing well, thank you! (Kabar saya baik, terima kasih!)"
  },
  {
    keywords: ['nama', 'kenalan', 'siapa nama', 'nama saya', 'panggil'],
    englishTranslation: "My name is... Nice to meet you!",
    phonetic: "May neym iz... Nays tu mit yu!",
    vocab: [
      { word: "Name", meaning: "Nama" },
      { word: "Nice to meet you", meaning: "Senang berkenalan denganmu" }
    ],
    aiReplyEn: "It's wonderful to meet you! Where are you from?",
    aiReplyId: "Senang sekali bisa berkenalan denganmu! Dari mana asalmu?",
    suggestedReply: "I am from Indonesia. (Saya berasal dari Indonesia.)"
  },
  {
    keywords: ['kopi', 'pesan', 'teh', 'kafe', 'minum', 'gula', 'dingin', 'panas', 'latte', 'espresso'],
    englishTranslation: "I would like to order a cup of coffee, please.",
    phonetic: "Ay wud layk tu or-der e kap ov ko-fi, pliiz.",
    vocab: [
      { word: "I would like", meaning: "Saya ingin (sopan)" },
      { word: "Order", meaning: "Memesan" },
      { word: "Cup of coffee", meaning: "Secangkir kopi" },
      { word: "Please", meaning: "Tolong / Silakan (kata sopan)" }
    ],
    aiReplyEn: "Sure thing! Would you like that hot or iced? And do you want any sugar or milk?",
    aiReplyId: "Tentu! Mau yang panas atau dingin? Mau ditambah gula atau susu?",
    suggestedReply: "Iced, with less sugar, please. (Dingin, dengan sedikit gula ya.)"
  },
  {
    keywords: ['makan', 'lapar', 'restoran', 'menu', 'makanan', 'enak', 'kenyang'],
    englishTranslation: "Could I see the food menu, please? I'm getting hungry.",
    phonetic: "Kud ay sii de fud me-nyu, pliiz? Aym get-ting hang-gri.",
    vocab: [
      { word: "Could I see", meaning: "Bolehkah saya melihat" },
      { word: "Menu", meaning: "Daftar menu" },
      { word: "Hungry", meaning: "Lapar" }
    ],
    aiReplyEn: "Here is the menu! Our best-seller today is the grilled chicken with garlic butter. Would you like to try it?",
    aiReplyId: "Ini menunya! Menu terlaris hari ini ayam panggang saus mentega bawang. Mau mencobanya?",
    suggestedReply: "Yes, that sounds delicious! (Ya, kedengarannya lezat!)"
  },
  {
    keywords: ['bayar', 'bon', 'struk', 'tagihan', 'berapa', 'harganya', 'bill', 'check'],
    englishTranslation: "Could we have the bill, please? How much is it?",
    phonetic: "Kud wi hev de bil, pliiz? Hau mac iz it?",
    vocab: [
      { word: "Bill / Check", meaning: "Tagihan / Bon" },
      { word: "How much", meaning: "Berapa harganya" }
    ],
    aiReplyEn: "Here is your bill. It comes to twenty dollars in total. Would you prefer paying with cash or card?",
    aiReplyId: "Ini tagihannya. Totalnya 20 dollar. Lebih suka bayar tunai atau kartu?",
    suggestedReply: "I will pay with card, please. (Saya bayar pakai kartu ya.)"
  },
  {
    keywords: ['toilet', 'kamar mandi', 'arah', 'dimana', 'jalan', 'stasiun', 'bandara', 'hotel'],
    englishTranslation: "Excuse me, could you tell me where the nearest restroom is?",
    phonetic: "Eks-kyus mi, kud yu tel mi hwer de nir-est rest-rum iz?",
    vocab: [
      { word: "Excuse me", meaning: "Permisi" },
      { word: "Nearest", meaning: "Terdekat" },
      { word: "Restroom / Bathroom", meaning: "Kamar mandi / Toilet" }
    ],
    aiReplyEn: "Of course! Walk straight down this hall and take a right. It's right next to the elevator.",
    aiReplyId: "Tentu saja! Jalan lurus menyusuri lorong ini lalu belok kanan. Tepat di sebelah lift.",
    suggestedReply: "Thank you very much for your help! (Terima kasih banyak atas bantuannya!)"
  },
  {
    keywords: ['pelan', 'kurang paham', 'tidak paham', 'ulangi', 'maksud', 'arti', 'slowly', 'repeat', 'understand'],
    englishTranslation: "Could you please speak a little slower? I am still practicing my English.",
    phonetic: "Kud yu pliiz spik e lit-tel slow-er? Ay em stil prek-tis-ing may ing-glisy.",
    vocab: [
      { word: "Speak slower", meaning: "Bicara lebih pelan" },
      { word: "Still practicing", meaning: "Masih berlatih" }
    ],
    aiReplyEn: "No problem at all! I will speak more slowly and clearly. Take your time, you are doing great!",
    aiReplyId: "Sama sekali tidak masalah! Saya akan bicara lebih pelan dan jelas. Santai saja, kamu sudah berusaha dengan sangat baik!",
    suggestedReply: "Thank you for being so patient. (Terima kasih sudah begitu sabar.)"
  },
  {
    keywords: ['capek', 'lelah', 'istirahat', 'ngantuk', 'tidur', 'tired', 'sleep'],
    englishTranslation: "I feel quite tired today. I think I need some rest.",
    phonetic: "Ay fiil kwayt tay-erd tu-dey. Ay tingk ay niid sam rest.",
    vocab: [
      { word: "Quite tired", meaning: "Cukup lelah" },
      { word: "Need rest", meaning: "Butuh istirahat" }
    ],
    aiReplyEn: "I hear you! Working hard can be exhausting. Make sure to get some good sleep tonight!",
    aiReplyId: "Saya paham! Kerja keras memang melelahkan. Pastikan tidur nyenyak malam ini ya!",
    suggestedReply: "Yes, I will go to bed early. (Ya, saya akan tidur lebih awal.)"
  },
  {
    keywords: ['belajar', 'inggris', 'susah', 'lancar', 'bisa', 'latihan', 'praktek'],
    englishTranslation: "I want to improve my English speaking and listening skills.",
    phonetic: "Ay wont tu im-pruv may ing-glisy spiik-ing end lis-ning skilz.",
    vocab: [
      { word: "Improve", meaning: "Meningkatkan" },
      { word: "Speaking", meaning: "Berbicara" },
      { word: "Listening", meaning: "Mendengar" }
    ],
    aiReplyEn: "You are in the right place! The key is to practice speaking aloud every day without fearing mistakes. I'm right here with you!",
    aiReplyId: "Kamu berada di tempat yang tepat! Kuncinya adalah sering bersuara setiap hari tanpa takut salah. Saya siap menemani latihanmu!",
    suggestedReply: "Let's practice together! (Ayo kita latihan bersama!)"
  }
];

export class ConversationEngine {
  constructor() {
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    if (this.apiKey) {
      localStorage.setItem('gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  }

  getApiKey() {
    return this.apiKey;
  }

  /**
   * Detect if input is Indonesian or English
   */
  isIndonesian(text) {
    const indonesianCommonWords = ['saya', 'aku', 'kamu', 'anda', 'mau', 'ingin', 'bisa', 'dan', 'ini', 'itu', 'yang', 'dengan', 'di', 'ke', 'dari', 'apa', 'kenapa', 'bagaimana', 'kapan', 'sudah', 'belum', 'tidak', 'nggak', 'gak', 'bukan', 'tolong', 'terima', 'kasih', 'lagi', 'suka', 'kopi', 'pesan', 'makan'];
    const words = text.toLowerCase().split(/\s+/);
    let idCount = 0;
    words.forEach(w => {
      if (indonesianCommonWords.includes(w)) idCount++;
    });
    // If has Indonesian words or general Indonesian character patterns
    return idCount > 0 || !/[a-z]/.test(text) ? true : false;
  }

  /**
   * Process message from user
   * Returns structured dialogue card
   */
  async processMessage(userText, contextScenario = 'daily') {
    const text = userText.trim();
    if (!text) return null;

    // Check if Gemini API key is configured
    if (this.apiKey) {
      try {
        const geminiResult = await this.callGeminiAPI(text, contextScenario);
        if (geminiResult) return geminiResult;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to smart local engine:', err);
      }
    }

    // Fallback: Local Intelligent Engine
    return this.processLocally(text, contextScenario);
  }

  /**
   * Local Smart Engine
   */
  processLocally(text, scenario) {
    const lower = text.toLowerCase();
    
    // Check keyword matches in Knowledge Base
    let bestMatch = null;
    let maxMatchedKeywords = 0;

    for (const item of KNOWLEDGE_BASE) {
      let count = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) {
          count++;
        }
      }
      if (count > maxMatchedKeywords) {
        maxMatchedKeywords = count;
        bestMatch = item;
      }
    }

    if (bestMatch && maxMatchedKeywords > 0) {
      return {
        userOriginalText: text,
        englishTranslation: bestMatch.englishTranslation,
        phonetic: bestMatch.phonetic,
        vocabulary: bestMatch.vocab,
        aiReplyEn: bestMatch.aiReplyEn,
        aiReplyId: bestMatch.aiReplyId,
        suggestedReply: bestMatch.suggestedReply,
        source: 'local'
      };
    }

    // Dynamic fallback for any general input
    const isIndo = this.isIndonesian(text);
    
    // Simple translation approximation for common words if not in knowledge base
    let translated = isIndo 
      ? this.smartLocalTranslate(text)
      : text;

    const phonetic = getPhoneticGuide(translated);

    return {
      userOriginalText: text,
      englishTranslation: translated,
      phonetic: phonetic,
      vocabulary: [
        { word: translated.split(' ')[0] || "Hello", meaning: "Kata kunci percakapan" },
        { word: "Practice", meaning: "Latihan" }
      ],
      aiReplyEn: "That's a great thought! I understand you clearly. Would you like to practice saying that out loud with me?",
      aiReplyId: "Ide yang bagus! Saya memahamimu dengan jelas. Mau mencoba mengucapkannya bersuara bersama saya?",
      suggestedReply: "Yes, let's practice together! (Ya, ayo kita latihan bareng!)",
      source: 'local'
    };
  }

  smartLocalTranslate(indoText) {
    // Intelligent phrase transformer
    const lower = indoText.toLowerCase();
    if (lower.includes('mau') && lower.includes('pesan')) {
      return "I would like to place an order, please.";
    }
    if (lower.includes('berapa') && lower.includes('harga')) {
      return "Excuse me, how much does this cost?";
    }
    if (lower.includes('dimana') || lower.includes('di mana')) {
      return "Excuse me, could you tell me where this is?";
    }
    if (lower.includes('terima kasih') || lower.includes('makasih')) {
      return "Thank you very much for your kindness!";
    }
    if (lower.includes('selamat pagi')) {
      return "Good morning! Have a wonderful day.";
    }
    if (lower.includes('selamat malam')) {
      return "Good evening! It is nice to see you.";
    }
    if (lower.includes('tolong') || lower.includes('bantu')) {
      return "Could you please help me with this?";
    }
    if (lower.includes('senang')) {
      return "I am really happy to hear that!";
    }
    return `I want to say: "${indoText}".`;
  }

  /**
   * Gemini API call with structured prompt
   */
  async callGeminiAPI(userText, scenario) {
    const prompt = `
Anda adalah seorang tutor bahasa Inggris pribadi yang sangat ramah, suportif, dan berpengalaman membimbing pemula dari Indonesia yang belum lancar berbahasa Inggris.
Konteks situasi saat ini: "${scenario}".
Pengguna berkata: "${userText}"

Tugas Anda:
1. Jika pengguna menulis dalam Bahasa Indonesia, ubah apa yang ingin dia sampaikan ke dalam Bahasa Inggris percakapan sehari-hari yang natural dan sering dipakai oleh Native Speaker (bukan bahasa kaku buku cetak).
2. Berikan "phonetic" (cara baca ramah orang Indonesia, misalnya: "Good morning" -> "Gud mor-ning").
3. Berikan 2-3 kosakata kunci beserta artinya dalam bahasa Indonesia.
4. Jawab obrolan pengguna tersebut layaknya teman ngobrol / penutur asli dalam Bahasa Inggris (aiReplyEn) yang santai dan memancing obrolan berlanjut, sertakan pula terjemahan Bahasa Indonesia dari jawaban Anda (aiReplyId).
5. Berikan satu contoh balasan mudah yang bisa dikatakan pengguna selanjutnya (suggestedReply).

Balas HANYA dalam format JSON valid tanpa tanda backtick markdown atau penjelasan lainnya:
{
  "englishTranslation": "...",
  "phonetic": "...",
  "vocabulary": [
    { "word": "...", "meaning": "..." }
  ],
  "aiReplyEn": "...",
  "aiReplyId": "...",
  "suggestedReply": "..."
}
`;

    // Try Gemini 2.0 Flash or 1.5 Flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;
    
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
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('No content from Gemini');

    const parsed = JSON.parse(rawText);
    return {
      userOriginalText: userText,
      englishTranslation: parsed.englishTranslation,
      phonetic: parsed.phonetic || getPhoneticGuide(parsed.englishTranslation),
      vocabulary: parsed.vocabulary || [],
      aiReplyEn: parsed.aiReplyEn,
      aiReplyId: parsed.aiReplyId,
      suggestedReply: parsed.suggestedReply || '',
      source: 'gemini'
    };
  }
}

export const conversationEngine = new ConversationEngine();
