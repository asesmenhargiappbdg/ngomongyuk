import { getPhoneticGuide } from './phonetics';

/**
 * Intelligent Conversation Engine with Proactive Storytelling
 * Designed specifically for beginners who give short or simple answers
 */

const KNOWLEDGE_BASE = [
  {
    keywords: ['ya', 'iya', 'yes', 'yup', 'betul', 'benar', 'oke', 'ok', 'siap', 'setuju'],
    englishTranslation: "Yes, absolutely! I completely agree with you.",
    phonetic: "Yes, eb-so-lut-li! Ay kom-pliit-li e-grii with yu.",
    vocab: [
      { word: "Absolutely", meaning: "Tentu saja / Pasti" },
      { word: "Agree", meaning: "Setuju" }
    ],
    aiReplyEn: "That's wonderful! Having a positive attitude makes everything so much easier. You know, I was just reading an interesting story about how saying 'yes' to small daily challenges can change your life. Speaking of which, what is one fun thing you are looking forward to doing this week?",
    aiReplyId: "Keren banget! Punya sikap positif bikin segalanya jadi jauh lebih mudah. Tahu nggak, tadi saya baru baca cerita seru tentang gimana kebiasaan bilang 'ya' untuk tantangan kecil bisa mengubah hidup kita. Ngomong-ngomong, ada satu hal seru apa yang paling kamu tunggu-tunggu minggu ini?",
    suggestedReplies: [
      "I want to relax and watch movies. (Saya mau santai nonton film.)",
      "I'm planning to hang out with friends. (Saya ada rencana kumpul bareng teman.)",
      "Just spending quiet time at home. (Cuma mau istirahat tenang di rumah.)"
    ]
  },
  {
    keywords: ['tidak', 'nggak', 'gak', 'bukan', 'no', 'nope', 'belum', 'enggak'],
    englishTranslation: "No, not really. I haven't done that yet.",
    phonetic: "Now, not rii-li. Ay he-vent dan det yet.",
    vocab: [
      { word: "Not really", meaning: "Nggak juga / Belum terlalu" },
      { word: "Haven't yet", meaning: "Belum pernah" }
    ],
    aiReplyEn: "Haha, no worries at all! That is totally fine. Sometimes taking things slowly and saying 'no' is the best choice! It actually reminds me of how people approach new hobbies—some jump right in, while others prefer to take their time. What kind of activities do you usually enjoy the most when you want to relax?",
    aiReplyId: "Haha sama sekali nggak masalah! Santai saja. Kadang melangkah pelan dan bilang 'belum' itu pilihan yang sangat wajar! Ini bikin saya teringat gimana orang memulai hobi baru—ada yang langsung buru-buru, ada yang santai menikmati prosesnya. Kalau kamu sendiri, kegiatan apa yang paling kamu nikmati pas lagi pengen rileks?",
    suggestedReplies: [
      "Listening to acoustic music. (Mendengarkan musik akustik santai.)",
      "Taking a slow walk outside. (Jalan-jalan santai di luar.)",
      "Playing casual mobile games. (Main game santai di HP.)"
    ]
  },
  {
    keywords: ['kopi', 'coffee', 'teh', 'tea', 'latte', 'dingin', 'iced', 'panas', 'hot', 'minum', 'cangkir'],
    englishTranslation: "I'd love an iced latte, please. Coffee always brightens my day!",
    phonetic: "Ayd lav en ayst la-tey, pliiz. Ko-fi ol-weyz brayt-ens may dey!",
    vocab: [
      { word: "I'd love", meaning: "Saya sangat ingin (sopan & ramah)" },
      { word: "Brightens", meaning: "Mencerahkan / Membuat semangat" }
    ],
    aiReplyEn: "Oh, iced coffee is an absolute lifesaver! Fun fact: Did you know that coffee culture in cities like Melbourne and Seattle is huge, and people judge a cafe by how smooth their milk foam is? I love the aroma of fresh beans. Tell me, do you usually drink coffee first thing in the morning, or do you prefer an afternoon coffee break?",
    aiReplyId: "Wah, es kopi itu penyelamat suasana hati banget! Fakta seru: tahu nggak kalau budaya ngopi di kota kayak Melbourne itu kental banget sampai orang menilai kafe dari kelembutan busa susunya? Saya suka banget aroma biji kopi segar. Ceritain dong, kamu biasanya ngopi pertama kali pas bangun pagi, atau lebih suka pas istirahat sore?",
    suggestedReplies: [
      "First thing in the morning! (Pagi-pagi wajib ngopi dulu!)",
      "In the afternoon to beat sleepiness. (Pas sore buat ngusir ngantuk.)",
      "I actually prefer sweet iced tea! (Sebenarnya saya lebih suka es teh manis!)"
    ]
  },
  {
    keywords: ['capek', 'lelah', 'tired', 'exhausted', 'ngantuk', 'sleepy', 'pusing', 'istirahat'],
    englishTranslation: "I feel quite exhausted today. It has been a very long day.",
    phonetic: "Ay fiil kwayt eg-zos-ted tu-dey. It hez biin e ve-ri long dey.",
    vocab: [
      { word: "Exhausted", meaning: "Sangat lelah / Capek sekali" },
      { word: "Long day", meaning: "Hari yang melelahkan / padat" }
    ],
    aiReplyEn: "Aww, I hear you! Take a deep breath. You've worked so hard today, and you should be proud of yourself. Whenever I feel drained, my favorite ritual is taking a warm shower, putting my phone away, and having some soothing chamomile tea. What is your go-to routine when you need to recharge your energy?",
    aiReplyId: "Aduh, saya paham banget! Tarik napas panjang dulu ya. Kamu sudah berjuang keras hari ini dan layak dapat istirahat. Kalau saya lagi capek banget, ritual favorit saya itu mandi air hangat, jauhin HP sebentar, terus minum teh hangat. Kalau kamu, apa cara paling ampuh buat balikin energimu?",
    suggestedReplies: [
      "Sleeping for eight hours straight! (Tidur nyenyak 8 jam tanpa diganggu!)",
      "Eating hot delicious soup! (Makan sup hangat yang lezat!)",
      "Lying down and listening to calm songs. (Rebahan sambil dengar lagu tenang.)"
    ]
  },
  {
    keywords: ['makan', 'lapar', 'food', 'hungry', 'restoran', 'enak', 'delicious', 'kenyang'],
    englishTranslation: "I'm getting really hungry. Good food always makes me happy!",
    phonetic: "Aym get-ting rii-li hang-gri. Gud fud ol-weyz meyks mi he-pi!",
    vocab: [
      { word: "Getting hungry", meaning: "Mulai lapar" },
      { word: "Makes me happy", meaning: "Membuatku senang" }
    ],
    aiReplyEn: "Food is hands down the best topic in the world! You know, Indonesian food like Rendang and Satay are famous globally for their rich spices. I love talking about comfort food. If you could have any meal right now in front of you without cooking, what would you pick?",
    aiReplyId: "Makanan itu topik obrolan paling menyenangkan sedunia! Tahu nggak, masakan Indonesia kayak Rendang dan Sate itu terkenal banget di luar negeri karena rempahnya yang kaya. Kalau sekarang ada makanan ajaib yang langsung tersaji di depanmu tanpa perlu masak, kamu mau pilih apa?",
    suggestedReplies: [
      "A warm bowl of chicken noodles! (Semangkuk mie ayam hangat!)",
      "Crispy fried chicken with chili! (Ayam goreng renyah pakai sambal!)",
      "Savory beef rendang with rice! (Rendang sapi gurih pakai nasi hangat!)"
    ]
  },
  {
    keywords: ['halo', 'hai', 'hello', 'hi', 'pagi', 'siang', 'sore', 'malam', 'apa kabar', 'kabar baik', 'fine', 'good'],
    englishTranslation: "Hello! It is so wonderful to chat with you today.",
    phonetic: "He-low! It iz sow wan-der-ful tu cet with yu tu-dey.",
    vocab: [
      { word: "Wonderful", meaning: "Luar biasa menyenangkan" },
      { word: "Chat with you", meaning: "Ngobrol bersamamu" }
    ],
    aiReplyEn: "Hey there! It makes me so happy to see you. I love our daily chat sessions because practicing a language together is like going on a mini adventure. The weather here is nice and breezy today. Tell me, how has your day been treating you so far?",
    aiReplyId: "Halo teman baikku! Senang banget bisa ketemu kamu lagi hari ini. Saya suka banget sesi ngobrol kita karena belajar bahasa bareng itu kayak petualangan kecil yang seru. Cuaca di sini lagi adem dan santai banget. Ceritakan dong, gimana harimu berjalan sejauh ini?",
    suggestedReplies: [
      "My day is going pretty well! (Hariku berjalan cukup menyenangkan!)",
      "It has been a busy work day! (Hari ini cukup padat dengan pekerjaan!)",
      "Just relaxing and taking it easy. (Lagi santai-santai aja nih.)"
    ]
  },
  {
    keywords: ['nama', 'kenalan', 'siapa nama', 'nama saya', 'panggil'],
    englishTranslation: "My name is... It is great to get to know you!",
    phonetic: "May neym iz... It iz greyt tu get tu now yu!",
    vocab: [
      { word: "Get to know you", meaning: "Mengenalmu lebih dekat" }
    ],
    aiReplyEn: "Nice to officially meet you! I'm Echo, your friendly English partner. I'm curious about the place you call home. What city do you live in, and what is your favorite thing about your hometown?",
    aiReplyId: "Senang berkenalan secara resmi denganmu! Nama saya Echo, teman belajar bahasa Inggrismu yang ramah. Saya penasaran nih sama tempat tinggalmu. Kamu tinggal di kota mana, dan hal apa yang paling kamu sukai dari kotamu?",
    suggestedReplies: [
      "I live in Bandung, the weather is cool! (Saya tinggal di Bandung, udaranya sejuk!)",
      "I live in Jakarta, a bustling big city! (Saya tinggal di Jakarta, kota besar yang ramai!)",
      "I live in a peaceful small town. (Saya tinggal di kota kecil yang tenang.)"
    ]
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

  isIndonesian(text) {
    const indonesianCommonWords = ['saya', 'aku', 'kamu', 'anda', 'mau', 'ingin', 'bisa', 'dan', 'ini', 'itu', 'yang', 'dengan', 'di', 'ke', 'dari', 'apa', 'kenapa', 'bagaimana', 'kapan', 'sudah', 'belum', 'tidak', 'nggak', 'gak', 'bukan', 'tolong', 'terima', 'kasih', 'lagi', 'suka', 'kopi', 'pesan', 'makan', 'iya', 'ya', 'capek', 'enak'];
    const words = text.toLowerCase().split(/\s+/);
    let idCount = 0;
    words.forEach(w => {
      if (indonesianCommonWords.includes(w)) idCount++;
    });
    return idCount > 0 || !/[a-z]/.test(text);
  }

  async processMessage(userText, contextScenario = 'daily') {
    const text = userText.trim();
    if (!text) return null;

    if (this.apiKey) {
      try {
        const geminiResult = await this.callGeminiAPI(text, contextScenario);
        if (geminiResult) return geminiResult;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to smart local engine:', err);
      }
    }

    return this.processLocally(text, contextScenario);
  }

  processLocally(text, scenario) {
    const lower = text.toLowerCase().trim();
    
    // Check keyword matches in Knowledge Base
    let bestMatch = null;
    let maxMatchedKeywords = 0;

    for (const item of KNOWLEDGE_BASE) {
      let count = 0;
      for (const kw of item.keywords) {
        // match whole word or contains
        if (lower === kw || lower.includes(kw)) {
          count += (lower === kw ? 3 : 1);
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
        suggestedReplies: bestMatch.suggestedReplies || [bestMatch.suggestedReply],
        source: 'local'
      };
    }

    // Dynamic fallback for any general input: Still be talkative and proactive!
    const isIndo = this.isIndonesian(text);
    let translated = isIndo ? this.smartLocalTranslate(text) : text;
    const phonetic = getPhoneticGuide(translated);

    return {
      userOriginalText: text,
      englishTranslation: translated,
      phonetic: phonetic,
      vocabulary: [
        { word: translated.split(' ')[0] || "Hello", meaning: "Kata kunci" },
        { word: "Together", meaning: "Bersama-sama" }
      ],
      aiReplyEn: "That's a very interesting thought! You know, the best part about chatting is discovering new perspectives. Every time I practice talking like this, I feel more confident. How about you? Do you feel more comfortable practicing with short casual chats like this?",
      aiReplyId: "Itu pemikiran yang sangat menarik! Tahu nggak, bagian paling asyik dari ngobrol santai adalah menemukan sudut pandang baru. Setiap kali saya latihan ngobrol kayak gini, saya ngerasa makin percaya diri. Kalau kamu gimana? Merasa lebih nyaman latihan lewat obrolan santai kayak gini kan?",
      suggestedReplies: [
        "Yes, I feel much more relaxed! (Ya, saya merasa jauh lebih santai!)",
        "It's really fun practicing this way! (Seru banget latihan dengan cara ini!)",
        "I'm learning new words every minute! (Saya dapat kata-kata baru tiap menit!)"
      ],
      source: 'local'
    };
  }

  smartLocalTranslate(indoText) {
    const lower = indoText.toLowerCase().trim();
    if (lower === 'ya' || lower === 'iya' || lower === 'yes') return "Yes, that's right!";
    if (lower === 'tidak' || lower === 'nggak' || lower === 'gak' || lower === 'no') return "No, not really.";
    if (lower === 'oke' || lower === 'ok') return "Alright, sounds good to me!";
    if (lower === 'belum') return "Not yet, but maybe soon!";
    if (lower === 'sudah') return "Yes, I have already done that!";
    if (lower.includes('mau') && lower.includes('pesan')) return "I would like to place an order, please.";
    if (lower.includes('berapa') && lower.includes('harga')) return "Excuse me, how much does this cost?";
    if (lower.includes('dimana') || lower.includes('di mana')) return "Excuse me, could you tell me where this is?";
    if (lower.includes('terima kasih') || lower.includes('makasih')) return "Thank you so much for your help and kindness!";
    if (lower.includes('selamat pagi')) return "Good morning! Wishing you a wonderful and bright day.";
    if (lower.includes('selamat malam')) return "Good evening! It is so nice to see you tonight.";
    return `I want to say: "${indoText}".`;
  }

  async callGeminiAPI(userText, scenario) {
    const prompt = `
PERAN ANDA:
Anda adalah 'Echo', teman ngobrol native speaker bahasa Inggris yang SANGAT RAMAH, EKSPRESIF, dan PROAKTIF MEMBUKA CERITA.
Lawan bicara Anda adalah orang Indonesia pemula yang sedang belajar bahasa Inggris dan SERINGKALI HANYA MENJAWAB PENDEK atau satu kata saja (misalnya: "ya", "dingin", "kopi", "tidak", "capek", "enak", "belum", "oke").

ATURAN UTAMA:
1. JANGAN PERNAH membalas pendek! Jika pengguna hanya menjawab 1-2 kata, tugas Anda adalah MENGEMBANGKAN ceritanya agar obrolan terus hidup dan seru.
2. Pertama, ubah jawaban pengguna (baik pendek maupun panjang) menjadi kalimat bahasa Inggris yang santai, alami, dan lengkap (englishTranslation).
3. Berikan 'phonetic' (cara baca ramah lidah Indonesia).
4. Buat balasan Anda (aiReplyEn & aiReplyId) yang terdiri dari 3 bagian:
   - Sambutan ramah atas apa yang dikatakan pengguna.
   - CERITA / ANEKDOT PENDEK (2 kalimat santai berisi cerita pengalaman seru, opini menarik, atau kebiasaan seru tentang topik itu).
   - SATU PERTANYAAN RAMAH & MENARIK di akhir untuk mengajak pengguna bercerita lebih lanjut tanpa merasa diuji.
5. Berikan 3 pilihan 'suggestedReplies' (array berisi opsi jawaban singkat dalam bahasa Inggris + artinya dalam kurung) agar pengguna tinggal memilih atau membaca jika bingung mau menjawab apa.

Balas HANYA dalam format JSON valid tanpa tanda backtick markdown atau teks lainnya:
{
  "englishTranslation": "...",
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
          temperature: 0.75,
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
      suggestedReplies: parsed.suggestedReplies || [parsed.suggestedReply || ''],
      source: 'gemini'
    };
  }
}

export const conversationEngine = new ConversationEngine();
