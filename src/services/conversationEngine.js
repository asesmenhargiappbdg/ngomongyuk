import { getPhoneticGuide } from './phonetics';

/**
 * Intelligent Conversation Engine with Proactive Storytelling & Smart Corrections
 * Features:
 * 1. Corrects broken English / translates Indonesian into natural conversational English.
 * 2. Displays Indonesian meaning for the corrected English sentence.
 * 3. Provides phonetic guide & grammar/naturalness tips.
 * 4. Speaks the corrected sentence first before AI conversational response.
 */

const KNOWLEDGE_BASE = [
  {
    keywords: ['ya', 'iya', 'yes', 'yup', 'betul', 'benar', 'oke', 'ok', 'siap', 'setuju'],
    correctedEnglish: "Yes, absolutely! I agree with you.",
    correctedMeaning: "Ya, tentu saja! Saya sangat setuju denganmu.",
    correctionTip: "Daripada cuma 'yes', menambahkan 'absolutely' atau 'I agree' membuatnya terdengar jauh lebih percaya diri dan ramah.",
    phonetic: "Yes, eb-so-lut-li! Ay e-grii with yu.",
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
    correctedEnglish: "No, not really. I haven't done that yet.",
    correctedMeaning: "Nggak, belum terlalu. Saya belum pernah melakukan itu.",
    correctionTip: "Kata 'not really' atau 'haven't yet' sangat umum digunakan native speaker agar penolakan terdengar santai dan sopan.",
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
    keywords: ['kopi', 'coffee', 'teh', 'tea', 'latte', 'dingin', 'iced', 'panas', 'hot', 'minum', 'cangkir', 'want buy coffee'],
    correctedEnglish: "I'd like an iced coffee, please. Coffee always brightens my day!",
    correctedMeaning: "Saya ingin pesan es kopi ya. Kopi selalu bikin hariku lebih cerah!",
    correctionTip: "Gunakan 'I'd like' (singkatan dari I would like) daripada 'I want', karena 'I'd like' jauh lebih sopan dan sering dipakai di kafe luar negeri.",
    phonetic: "Ayd layk en ayst ko-fi, pliiz. Ko-fi ol-weyz brayt-ens may dey!",
    vocab: [
      { word: "I'd like", meaning: "Saya ingin (sopan & santai)" },
      { word: "Brightens", meaning: "Mencerahkan suasana hati" }
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
    correctedEnglish: "I feel quite exhausted today. It has been a very long day.",
    correctedMeaning: "Saya merasa cukup lelah hari ini. Hari ini sangat padat dan melelahkan.",
    correctionTip: "'Exhausted' artinya sangat lelah. Native speaker sering menambahkan 'It has been a long day' untuk menggambarkan seharian beraktivitas sibuk.",
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
    correctedEnglish: "I'm getting really hungry. Good food always makes me happy!",
    correctedMeaning: "Saya mulai lapar nih. Makanan enak selalu bikin saya bahagia!",
    correctionTip: "Kata 'I am getting hungry' artinya rasa lapar mulai terasa (sedang terjadi), terdengar sangat alami di telinga native speaker.",
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
    correctedEnglish: "Hello! It is so wonderful to chat with you today.",
    correctedMeaning: "Halo! Senang sekali bisa mengobrol denganmu hari ini.",
    correctionTip: "Menyapa sambil menambahkan 'Wonderful to chat with you' adalah pembuka obrolan yang hangat dan sangat disukai penutur asli.",
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
    correctedEnglish: "My name is... It is great to get to know you!",
    correctedMeaning: "Nama saya adalah... Senang sekali bisa berkenalan denganmu!",
    correctionTip: "'It's great to get to know you' sering dipakai saat ingin mengakrabkan diri dengan teman baru.",
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
  },
  {
    keywords: ['terima kasih', 'makasih', 'thanks', 'thank you', 'trims', 'thank'],
    correctedEnglish: "Thank you so much! I really appreciate your help.",
    correctedMeaning: "Terima kasih banyak! Saya sangat menghargai bantuanmu.",
    correctionTip: "Menambahkan 'I really appreciate your help' membuat ucapan terima kasihmu terdengar sangat tulus dan sopan.",
    phonetic: "Theng-kyu sow mec! Ay rii-li e-prii-syi-eyt yor help.",
    vocab: [
      { word: "Appreciate", meaning: "Menghargai" },
      { word: "Help", meaning: "Bantuan" }
    ],
    aiReplyEn: "You are most welcome! Helping each other out is what makes any conversation truly special. I'm always right here whenever you want to practice or learn something new. Tell me, do you have any fun plans or goals for learning English this month?",
    aiReplyId: "Sama-sama dengan senang hati! Saling membantu itulah yang bikin obrolan jadi menyenangkan. Saya selalu ada di sini kapan pun kamu mau latihan atau belajar hal baru. Ngomong-ngomong, ada target seru apa nih buat belajar bahasa Inggrismu bulan ini?",
    suggestedReplies: [
      "I want to speak more fluently! (Saya mau ngomong lebih lancar!)",
      "I want to understand English movies without subtitles. (Mau nonton film tanpa subtitle.)",
      "Just want to practice chatting casually every day. (Cuma mau rutin ngobrol santai tiap hari.)"
    ]
  },
  {
    keywords: ['maaf', 'sorry', 'sori', 'minta maaf', 'apologize'],
    correctedEnglish: "I'm terribly sorry about that. My apologies!",
    correctedMeaning: "Saya mohon maaf atas hal itu. Maafkan saya ya!",
    correctionTip: "Gunakan 'My apologies' atau 'terribly sorry' untuk menunjukkan rasa maaf yang tulus dan sopan.",
    phonetic: "Aym te-rib-li so-ri e-bawt det. May e-po-lo-jiiz!",
    vocab: [
      { word: "Apologies", meaning: "Permohonan maaf" },
      { word: "Terribly sorry", meaning: "Sangat menyesal / minta maaf" }
    ],
    aiReplyEn: "Oh please, don't worry about it at all! There is never any need to apologize here. Making mistakes is actually the fastest and most natural way to master a new language! What is something new you tried recently that felt challenging at first?",
    aiReplyId: "Aduh jangan khawatir sama sekali! Nggak perlu minta maaf di sini. Bikin kesalahan itu justru cara paling cepat dan alami buat mahir bahasa baru! Ada nggak hal baru yang baru-baru ini kamu coba dan awalnya terasa menantang?",
    suggestedReplies: [
      "Speaking English out loud! (Bicara bahasa Inggris dengan bersuara!)",
      "Learning to cook a new recipe. (Belajar memasak resep baru.)",
      "Waking up earlier in the morning. (Bangun lebih pagi.)"
    ]
  },
  {
    keywords: ['toilet', 'kamar mandi', 'restroom', 'wc', 'where toilet', 'where is toilet', 'pipis', 'buang air'],
    correctedEnglish: "Excuse me, could you tell me where the restroom is, please?",
    correctedMeaning: "Permisi, bisakah Anda memberi tahu di mana letak toiletnya?",
    correctionTip: "Di luar negeri gunakan kata 'restroom' atau 'washroom' agar terdengar jauh lebih sopan daripada sekadar 'toilet'.",
    phonetic: "Eks-kyus mi, kud yu tel mi wer de rest-rum iz, pliiz?",
    vocab: [
      { word: "Excuse me", meaning: "Permisi" },
      { word: "Restroom", meaning: "Toilet / Kamar kecil (sopan)" }
    ],
    aiReplyEn: "It is just down the hallway to your right! That is actually one of the most useful travel phrases ever. Traveling to a foreign country and asking for directions can be an exciting adventure. Have you ever traveled to a new place where you had to ask someone for directions?",
    aiReplyId: "Toiletnya ada di ujung lorong sebelah kanan! Kalimat itu salah satu kalimat wajib paling berguna kalau lagi bepergian. Jalan-jalan ke tempat baru dan nanya jalan itu seru banget. Kamu pernah punya pengalaman bepergian ke tempat baru dan harus nanya petunjuk arah ke orang?",
    suggestedReplies: [
      "Yes, I once got lost in a big mall! (Pernah, saya sempat nyasar di mall besar!)",
      "Not yet, but I'd love to travel abroad! (Belum, tapi saya pengen banget ke luar negeri!)",
      "I always rely on Google Maps! (Saya selalu mengandalkan Google Maps!)"
    ]
  },
  {
    keywords: ['berapa', 'harga', 'price', 'how much', 'how much price', 'cost', 'bayar', 'pay'],
    correctedEnglish: "Excuse me, how much does this item cost, please?",
    correctedMeaning: "Permisi, berapa harga barang ini ya?",
    correctionTip: "Bentuk kalimat tanya yang benar adalah 'How much does this cost?' daripada 'How much price?'.",
    phonetic: "Eks-kyus mi, haw mec daz dis ay-tem kost, pliiz?",
    vocab: [
      { word: "Cost", meaning: "Harganya / berharga" },
      { word: "Item", meaning: "Barang" }
    ],
    aiReplyEn: "That's a super handy phrase! Shopping and finding good bargains is one of life's little joys. In some street markets, bargaining is part of the local culture, while in supermarkets prices are fixed. Do you enjoy shopping in modern malls or traditional outdoor markets?",
    aiReplyId: "Itu kalimat yang sangat berguna! Belanja dan nyari barang bagus dengan harga pas itu seru banget. Di beberapa pasar tradisional, tawar-menawar itu bagian dari budaya lokal. Kamu sendiri lebih suka belanja di mall modern atau pasar tradisional?",
    suggestedReplies: [
      "I love traditional markets, they have fresh stuff! (Saya suka pasar tradisional, barangnya segar!)",
      "I prefer modern supermarkets for convenience! (Saya lebih suka supermarket modern karena praktis!)",
      "I mostly shop online nowadays! (Sekarang saya kebanyakan belanja online!)"
    ]
  },
  {
    keywords: ['kerja', 'kantor', 'work', 'working', 'office', 'sibuk', 'busy', 'tugas', 'project'],
    correctedEnglish: "I'm having a busy work day today, but I'm making progress!",
    correctedMeaning: "Hari ini saya sedang cukup sibuk kerja, tapi semuanya berjalan baik!",
    correctionTip: "'Making progress' artinya pekerjaan kita terus mengalami kemajuan positif.",
    phonetic: "Aym he-ving e bi-zi werk dey tu-dey, bat Aym mey-king prog-res!",
    vocab: [
      { word: "Busy", meaning: "Sibuk" },
      { word: "Progress", meaning: "Kemajuan / perkembangan" }
    ],
    aiReplyEn: "Keep up the great work! Being productive feels rewarding, but remember to take quick breather breaks to rest your eyes and stretch your legs. A 5-minute break can work wonders! How do you usually like to unwind after a productive day of work?",
    aiReplyId: "Semangat terus kerjanya! Menjadi produktif itu memuaskan, tapi jangan lupa luangkan waktu rehat sejenak buat istirahatin mata dan peregangan. Istirahat 5 menit itu ajaib efeknya! Kamu biasanya suka ngapain buat santai setelah seharian kerja?",
    suggestedReplies: [
      "Watching comedy videos on my phone! (Nonton video lucu di HP!)",
      "Taking a nice hot shower and resting. (Mandi air hangat lalu istirahat.)",
      "Chatting with my family or close friends. (Ngobrol santai bareng keluarga atau sahabat.)"
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
      const cleanUser = lower.replace(/[^a-z0-9]/g, '');
      const cleanCorrected = bestMatch.correctedEnglish.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isIndo = this.isIndonesian(text);
      const hasCorrection = isIndo || cleanUser !== cleanCorrected;

      return {
        userOriginalText: text,
        hasCorrection: hasCorrection,
        correctedEnglish: bestMatch.correctedEnglish,
        correctedMeaning: bestMatch.correctedMeaning,
        correctionTip: bestMatch.correctionTip || "Ini kalimat yang lebih alami dan biasa diucapkan native speaker.",
        phonetic: bestMatch.phonetic,
        vocabulary: bestMatch.vocab,
        aiReplyEn: bestMatch.aiReplyEn,
        aiReplyId: bestMatch.aiReplyId,
        suggestedReplies: bestMatch.suggestedReplies || [bestMatch.suggestedReply],
        source: 'local'
      };
    }

    // Dynamic fallback for any general input
    const isIndo = this.isIndonesian(text);
    const { corrected, meaning, tip } = this.smartLocalCorrection(text, isIndo);
    const phonetic = getPhoneticGuide(corrected);
    const cleanUser = lower.replace(/[^a-z0-9]/g, '');
    const cleanCorrected = corrected.toLowerCase().replace(/[^a-z0-9]/g, '');
    const hasCorrection = isIndo || cleanUser !== cleanCorrected;

    return {
      userOriginalText: text,
      hasCorrection: hasCorrection,
      correctedEnglish: corrected,
      correctedMeaning: meaning,
      correctionTip: tip,
      phonetic: phonetic,
      vocabulary: [
        { word: corrected.split(' ')[0] || "Hello", meaning: "Kata kunci" },
        { word: "Practice", meaning: "Latihan" }
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
    if (lower.includes('i no understand') || lower.includes('not understand')) {
      return {
        corrected: "I don't understand, could you please repeat that?",
        meaning: "Saya kurang paham, bisakah tolong ulangi sekali lagi?",
        tip: "Dalam bahasa Inggris gunakan 'I don't understand', bukan 'I no understand'."
      };
    }
    if (lower.includes('i go yesterday') || lower.includes('me go yesterday')) {
      return {
        corrected: "I went there yesterday.",
        meaning: "Saya pergi ke sana kemarin.",
        tip: "Karena terjadi kemarin (lampau), kata kerja 'go' berubah menjadi 'went'."
      };
    }

    // Common Indonesian phrases
    if (lower === 'ya' || lower === 'iya' || lower === 'yes') {
      return {
        corrected: "Yes, that's right!",
        meaning: "Ya, itu betul!",
        tip: "Menambahkan 'that's right' membuat jawabanmu lebih tegas dan natural."
      };
    }
    if (lower === 'tidak' || lower === 'nggak' || lower === 'gak' || lower === 'no') {
      return {
        corrected: "No, not really.",
        meaning: "Nggak, belum terlalu.",
        tip: "'Not really' terdengar lebih ramah daripada sekadar menjawab 'no'."
      };
    }
    if (lower === 'oke' || lower === 'ok') {
      return {
        corrected: "Alright, sounds good to me!",
        meaning: "Baiklah, saya setuju dengan itu!",
        tip: "Frasa 'Sounds good to me' adalah cara native speaker menyetujui sesuatu dengan santai."
      };
    }
    if (lower === 'belum') {
      return {
        corrected: "Not yet, but hopefully soon!",
        meaning: "Belum, tapi semoga segera!",
        tip: "'Not yet' adalah cara tepat mengatakan 'belum' dalam bahasa Inggris."
      };
    }
    if (lower === 'sudah') {
      return {
        corrected: "Yes, I have already done that!",
        meaning: "Ya, saya sudah melakukannya!",
        tip: "Gunakan 'I have already...' untuk menyatakan sesuatu yang sudah selesai dilakukan."
      };
    }

    // Default polite conversational framing
    if (isIndo) {
      return {
        corrected: `I would like to say: "${text}".`,
        meaning: `Saya ingin mengatakan: "${text}".`,
        tip: "Ungkapkan ide utamamu dengan percaya diri."
      };
    }

    return {
      corrected: text.charAt(0).toUpperCase() + text.slice(1),
      meaning: `Maksud ucapan Anda: "${text}".`,
      tip: "Hebat sudah berani bicara bahasa Inggris! Terus latih pengucapannya."
    };
  }

  async callGeminiAPI(userText, scenario) {
    const prompt = `
PERAN ANDA:
Anda adalah 'Echo', tutor dan teman ngobrol native speaker bahasa Inggris yang SANGAT RAMAH, TELITI MEMBIMBING, dan PROAKTIF MEMBUKA CERITA.
Lawan bicara Anda adalah orang Indonesia pemula yang sedang belajar bahasa Inggris dan SERINGKALI BERBICARA DALAM BAHASA INGGRIS SEMBARANG / TATA BAHASA RUSAK (Broken English), atau campuran Bahasa Indonesia pendek (misal: "I want buy coffee", "where toilet", "how much this", "ya", "dingin", "capek").

TUGAS PENTING ANDA:
1. DETEKSI & PERBAIKI: Perbaiki ucapan pengguna menjadi kalimat bahasa Inggris yang benar, santai, dan alami yang biasa diucapkan penutur asli (correctedEnglish).
2. TULISKAN ARTINYA: Tuliskan terjemahan Bahasa Indonesia yang lengkap dan jelas dari kalimat bahasa Inggris yang sudah diperbaiki tersebut (correctedMeaning). Pengguna WAJIB tahu persis apa arti kalimat perbaikannya!
3. BERIKAN TIPS SINGKAT: Jelaskan dalam 1 kalimat ramah bahasa Indonesia mengapa kalimat itu diperbaiki atau bagaimana tips penggunaannya (correctionTip).
4. Berikan 'phonetic' (cara baca ramah lidah Indonesia untuk kalimat perbaikan).
5. DI BAGIAN JAWABAN OBROLAN ANDA (aiReplyEn & aiReplyId):
   - Sambut ucapan pengguna dengan hangat.
   - BERCERITALAH 1-2 kalimat (anekdot seru, kebiasaan bule, atau cerita santai terkait topik itu).
   - LEPAR SATU PERTANYAAN RAMAH & MENARIK untuk memancing obrolan berlanjut.
6. Berikan 3 'suggestedReplies' (opsi balasan bahasa Inggris + artinya dalam kurung).

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
    const correctedEng = parsed.correctedEnglish || parsed.englishTranslation;
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
  }
}

export const conversationEngine = new ConversationEngine();
