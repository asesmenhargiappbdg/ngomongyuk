import { getPhoneticGuide } from '../services/phonetics.js';

/**
 * 38+ Real-Life Conversational Topics for Natural English Practice
 * Used for instant, rich, zero-lag responses when offline or without API key.
 */
export const EXPANDED_TOPICS = [
  // 1. AGREEMENT / YES
  {
    keywords: ['ya', 'iya', 'yes', 'yup', 'betul', 'benar', 'oke', 'ok', 'siap', 'setuju', 'agree'],
    correctedEnglish: "Yes, absolutely! I completely agree with you.",
    correctedMeaning: "Ya, tentu saja! Saya sangat setuju denganmu.",
    correctionTip: "Menambahkan 'absolutely' atau 'completely agree' membuat jawabanmu terdengar lebih percaya diri dan ramah dibanding sekadar 'yes'.",
    phonetic: "Yes, eb-so-lut-li! Ay kom-pliit-li e-grii with yu.",
    vocab: [
      { word: "Absolutely", meaning: "Tentu saja / Pasti" },
      { word: "Completely agree", meaning: "Sangat setuju" }
    ],
    aiReplyEn: "That's wonderful! Having a positive attitude makes every day brighter. You know, psychologists say saying 'yes' to small positive moments builds great happiness. What is one exciting thing you are planning to do this week?",
    aiReplyId: "Keren banget! Punya sikap positif bikin hari-hari jadi jauh lebih cerah. Tahu nggak, para psikolog bilang terbiasa bilang 'ya' untuk momen positif kecil bisa bikin kita makin bahagia. Hal seru apa yang rencananya mau kamu lakuin minggu ini?",
    suggestedReplies: [
      "I want to relax and watch movies. (Saya mau santai nonton film.)",
      "I'm planning to hang out with friends. (Saya ada rencana kumpul bareng teman.)",
      "Just spending quiet time at home. (Cuma mau istirahat tenang di rumah.)"
    ]
  },

  // 2. DISAGREEMENT / NO / NOT YET
  {
    keywords: ['tidak', 'nggak', 'gak', 'bukan', 'no', 'nope', 'belum', 'enggak', 'disagree'],
    correctedEnglish: "No, not really. I haven't done that yet.",
    correctedMeaning: "Nggak, belum terlalu. Saya belum pernah melakukan itu.",
    correctionTip: "Gunakan 'not really' atau 'haven't yet' agar penolakan atau jawaban 'belum' terdengar santai dan sopan di telinga bule.",
    phonetic: "Now, not rii-li. Ay he-vent dan det yet.",
    vocab: [
      { word: "Not really", meaning: "Nggak juga / Belum terlalu" },
      { word: "Haven't yet", meaning: "Belum pernah" }
    ],
    aiReplyEn: "Haha, no worries at all! There is absolutely nothing wrong with taking things slowly. What kind of activities do you usually enjoy the most when you just want to kick back and unwind?",
    aiReplyId: "Haha sama sekali nggak masalah! Santai saja, pelan-pelan itu wajar kok. Kegiatan apa yang paling kamu nikmati kalau lagi pengen istirahat dan rileks?",
    suggestedReplies: [
      "Listening to relaxing music. (Mendengarkan musik santai.)",
      "Taking a slow walk outside. (Jalan-jalan santai di luar.)",
      "Playing mobile games on my phone. (Main game santai di HP.)"
    ]
  },

  // 3. COFFEE & TEA
  {
    keywords: ['kopi', 'coffee', 'teh', 'tea', 'latte', 'espresso', 'cappuccino', 'iced coffee', 'minum', 'cangkir', 'kafe', 'cafe', 'boba', 'pesan minum'],
    correctedEnglish: "I'd like an iced coffee, please. Coffee always brightens my day!",
    correctedMeaning: "Saya ingin pesan es kopi ya. Kopi selalu bikin hariku lebih cerah!",
    correctionTip: "Gunakan 'I'd like' (singkatan dari I would like) daripada 'I want', karena 'I'd like' jauh lebih sopan dipakai saat memesan minuman.",
    phonetic: "Ayd layk en ayst ko-fi, pliiz. Ko-fi ol-weyz brayt-ens may dey!",
    vocab: [
      { word: "I'd like", meaning: "Saya ingin (sopan & santai)" },
      { word: "Brightens my day", meaning: "Mencerahkan suasana hati" }
    ],
    aiReplyEn: "Oh, iced coffee is an absolute lifesaver! Coffee culture around the world is so fascinating. Tell me, do you usually drink coffee first thing in the morning, or do you prefer an afternoon coffee break?",
    aiReplyId: "Wah, es kopi itu penyelamat suasana hati banget! Budaya ngopi di seluruh dunia itu seru banget dibahas. Ceritain dong, kamu biasanya ngopi pagi-pagi pas baru bangun, atau pas istirahat sore?",
    suggestedReplies: [
      "First thing in the morning to wake up! (Pagi-pagi biar melek!)",
      "In the afternoon to beat sleepiness. (Pas sore buat ngusir ngantuk.)",
      "I actually prefer sweet iced tea! (Sebenarnya saya lebih suka es teh manis!)"
    ]
  },

  // 4. FOOD & RESTAURANT
  {
    keywords: ['makan', 'lapar', 'food', 'hungry', 'restoran', 'enak', 'delicious', 'kenyang', 'sarapan', 'breakfast', 'lunch', 'dinner', 'rendang', 'nasi', 'ayam', 'mie', 'bakso'],
    correctedEnglish: "I'm getting really hungry. Good food always puts me in a good mood!",
    correctedMeaning: "Saya mulai lapar nih. Makanan enak selalu bikin mood saya jadi bagus!",
    correctionTip: "'I'm getting hungry' artinya rasa lapar mulai terasa. Frasa 'puts me in a good mood' sangat natural untuk menggambarkan makanan bikin bahagia.",
    phonetic: "Aym get-ting rii-li hang-gri. Gud fud ol-weyz puts mi in e gud mud!",
    vocab: [
      { word: "Getting hungry", meaning: "Mulai lapar" },
      { word: "Good mood", meaning: "Suasana hati senang" }
    ],
    aiReplyEn: "Food is hands down the best topic in the world! Indonesian food like Rendang and Fried Rice is legendary for its amazing flavors. If you could have any meal magically appear right in front of you now, what would you choose?",
    aiReplyId: "Makanan itu topik obrolan paling asyik sedunia! Masakan khas kayak Rendang dan Nasi Goreng rasanya juara banget. Kalau sekarang ada makanan yang bisa langsung muncul di depanmu tanpa perlu masak, kamu mau pilih apa?",
    suggestedReplies: [
      "A warm bowl of chicken noodles! (Semangkuk mie ayam hangat!)",
      "Crispy fried chicken with spicy sambal! (Ayam goreng renyah pakai sambal pedas!)",
      "Savory beef rendang with warm rice! (Rendang sapi gurih pakai nasi hangat!)"
    ]
  },

  // 5. TIRED / SLEEPY / REST
  {
    keywords: ['capek', 'lelah', 'tired', 'exhausted', 'ngantuk', 'sleepy', 'pusing', 'istirahat', 'pengen tidur', 'pegal', 'drain'],
    correctedEnglish: "I feel quite exhausted today. It has been a very long day.",
    correctedMeaning: "Saya merasa cukup lelah hari ini. Hari ini sangat padat dan melelahkan.",
    correctionTip: "'Exhausted' artinya lelah sekali. Frasa 'It has been a long day' sering dipakai native speaker untuk merangkum seharian bekerja sibuk.",
    phonetic: "Ay fiil kwayt eg-zos-ted tu-dey. It hez biin e ve-ri long dey.",
    vocab: [
      { word: "Exhausted", meaning: "Sangat lelah" },
      { word: "Long day", meaning: "Hari yang padat melelahkan" }
    ],
    aiReplyEn: "Aww, I hear you! Take a deep breath. You worked hard today and definitely deserve a good rest. What is your favorite routine when you need to recharge your energy?",
    aiReplyId: "Aduh, saya paham banget! Tarik napas panjang dulu ya. Kamu sudah berjuang keras hari ini dan layak dapat istirahat. Apa kebiasaan favoritmu kalau lagi butuh isi ulang energi?",
    suggestedReplies: [
      "Taking a warm bath and sleeping early! (Mandi air hangat lalu tidur lebih awal!)",
      "Eating hot soup and watching funny videos! (Makan sup hangat sambil nonton video lucu!)",
      "Lying in bed listening to calm acoustic songs. (Rebahan di kasur sambil dengar lagu akustik tenang.)"
    ]
  },

  // 6. GREETINGS & SMALL TALK
  {
    keywords: ['halo', 'hai', 'hello', 'hi', 'pagi', 'siang', 'sore', 'malam', 'good morning', 'good afternoon', 'good evening', 'hey'],
    correctedEnglish: "Hello! It is so wonderful to chat with you today.",
    correctedMeaning: "Halo! Senang sekali bisa mengobrol denganmu hari ini.",
    correctionTip: "Menyapa sambil menambahkan 'Wonderful to chat with you' adalah pembuka obrolan yang hangat dan sangat disukai penutur asli.",
    phonetic: "He-low! It iz sow wan-der-ful tu cet with yu tu-dey.",
    vocab: [
      { word: "Wonderful", meaning: "Sangat menyenangkan" },
      { word: "Chat with you", meaning: "Ngobrol denganmu" }
    ],
    aiReplyEn: "Hey there, friend! It always brightens my day to talk with you. Practicing English together is like going on a mini adventure every day! How is everything going in your world today?",
    aiReplyId: "Halo sahabatku! Selalu bikin senang bisa ngobrol bareng kamu. Latihan bahasa bareng itu kayak petualangan seru tiap hari! Gimana kabar dan suasana harimu sejauh ini?",
    suggestedReplies: [
      "Everything is going great, thank you! (Semuanya berjalan lancar, terima kasih!)",
      "I'm having a busy day, but I'm smiling! (Lagi agak sibuk, tapi tetap semangat!)",
      "Just relaxing and taking it easy today. (Hari ini lagi santai-santai aja.)"
    ]
  },

  // 7. HOW ARE YOU / APA KABAR
  {
    keywords: ['apa kabar', 'how are you', 'how are you doing', 'kabar baik', 'fine', 'good', 'sehat', 'gimana kabar'],
    correctedEnglish: "I'm doing great, thank you for asking! How about you?",
    correctedMeaning: "Saya sangat baik, terima kasih sudah menanyakan! Kalau kamu gimana?",
    correctionTip: "Menjawab kabar dengan menambahkan 'thank you for asking! How about you?' menunjukkan etiket percakapan bahasa Inggris yang sangat berkelas dan ramah.",
    phonetic: "Aym du-ing greyt, thengk yu for es-king! Haw e-bawt yu?",
    vocab: [
      { word: "Doing great", meaning: "Kabarnya sangat baik" },
      { word: "Thank you for asking", meaning: "Terima kasih sudah menanyakan" }
    ],
    aiReplyEn: "I am feeling fantastic and super excited to chat with you! Being able to connect like this across languages is truly awesome. What has been the highlight or best moment of your day so far?",
    aiReplyId: "Saya merasa luar biasa senang dan bersemangat buat ngobrol sama kamu! Bisa terhubung dan latihan bahasa kayak gini seru banget. Momen apa yang paling menyenangkan buatmu hari ini?",
    suggestedReplies: [
      "Enjoying a delicious cup of coffee! (Menikmati secangkir kopi yang nikmat!)",
      "Finishing all my work on time! (Menyelesaikan semua kerjaan tepat waktu!)",
      "Just chatting here with you! (Bisa ngobrol santai di sini bersamamu!)"
    ]
  },

  // 8. WHO ARE YOU / ABOUT ECHO / AI
  {
    keywords: ['kamu siapa', 'who are you', 'kamu ai', 'are you ai', 'kamu robot', 'are you robot', 'siapa kamu', 'tentang kamu', 'about you', 'kamu orang', 'echo itu siapa'],
    correctedEnglish: "Who are you, and how can you help me practice English?",
    correctedMeaning: "Siapakah dirimu, dan bagaimana kamu bisa membantuku latihan bahasa Inggris?",
    correctionTip: "Bentuk pertanyaan 'How can you help me...' adalah cara tepat menanyakan fungsi seseorang atau sebuah asisten.",
    phonetic: "Hu ar yu, end haw ken yu help mi prek-tis Ing-glisy?",
    vocab: [
      { word: "Practice", meaning: "Latihan" },
      { word: "Help me", meaning: "Membantuku" }
    ],
    aiReplyEn: "I'm Echo, your friendly English companion! I'm here 24/7 so you can practice speaking English without any fear of making mistakes. I'll correct your sentences gently, teach you cool native slang, and keep our stories fun! What is your biggest goal in learning English?",
    aiReplyId: "Saya Echo, teman belajar bahasa Inggrismu yang ramah! Saya ada 24 jam nonstop biar kamu bisa bebas latihan ngomong tanpa takut salah. Saya bantu rapikan kalimatmu, kasih tahu cara baca, dan bikin obrolan seru! Apa target terbesarmu belajar bahasa Inggris?",
    suggestedReplies: [
      "I want to speak fluently like a native! (Saya mau ngomong lancar kayak bule!)",
      "I want to travel abroad with confidence! (Saya mau jalan-jalan ke luar negeri dengan percaya diri!)",
      "I want to advance my career and job skills. (Saya mau ningkatin karier dan kerjaan.)"
    ]
  },

  // 9. WHAT ARE YOU DOING / LAGI NGAPAIN
  {
    keywords: ['lagi ngapain', 'what are you doing', 'sedang apa', 'doing what', 'lagi apa', 'kamu lagi ngapain'],
    correctedEnglish: "What are you up to right now? Anything exciting?",
    correctedMeaning: "Lagi sibuk ngapain nih sekarang? Ada hal seru?",
    correctionTip: "'What are you up to?' adalah ungkapan gaul native speaker yang jauh lebih alami dibanding buku pelajaran 'What are you doing?'.",
    phonetic: "Wat ar yu ap tu rayt naw? E-ni-thing ek-say-ting?",
    vocab: [
      { word: "What are you up to", meaning: "Lagi sibuk apa / lagi ngapain" },
      { word: "Right now", meaning: "Saat ini sekarang" }
    ],
    aiReplyEn: "I'm right here enjoying our chat and thinking about cool English expressions to share with you! I love meeting learners from Indonesia because everyone is so warm and kind. What about you, are you at home, at work, or on the move?",
    aiReplyId: "Saya lagi di sini menikmati obrolan kita sambil mikirin ungkapan bahasa Inggris keren buat kita latih! Saya suka banget ketemu teman-teman dari Indonesia karena orangnya ramah-ramah. Kalau kamu sendiri, lagi di rumah, kantor, atau di jalan?",
    suggestedReplies: [
      "I'm chilling at home right now. (Lagi santai di rumah sekarang.)",
      "I'm at work taking a quick break. (Lagi di kantor istirahat sebentar.)",
      "I'm outside commuting! (Lagi di jalan bepergian!)"
    ]
  },

  // 10. HOBBIES & FREE TIME
  {
    keywords: ['hobi', 'hobby', 'hobbies', 'waktu luang', 'free time', 'leisure', 'suka ngapain', 'kegemaran', 'aktivitas favorit'],
    correctedEnglish: "In my free time, I really enjoy pursuing my favorite hobbies.",
    correctedMeaning: "Di waktu luang, saya sangat menikmati melakukan hobi favorit saya.",
    correctionTip: "'In my free time' adalah frasa umum untuk menyatakan kegiatan di saat santai tanpa beban kerja.",
    phonetic: "In may frii taym, Ay rii-li en-joy per-syu-ing may fey-ve-rit ho-biiz.",
    vocab: [
      { word: "Free time", meaning: "Waktu luang" },
      { word: "Pursuing", meaning: "Menjalani / melakukan" }
    ],
    aiReplyEn: "Hobbies make life so colorful! Some people love active hobbies like hiking or swimming, while others prefer quiet creative hobbies like reading or painting. What kind of hobbies do you enjoy the most?",
    aiReplyId: "Hobi itu bikin hidup jadi penuh warna! Ada yang suka hobi aktif kayak naik gunung atau renang, ada juga yang suka hobi tenang kayak baca buku atau menggambar. Hobi apa yang paling kamu sukai?",
    suggestedReplies: [
      "Listening to music and watching movies! (Mendengarkan musik dan nonton film!)",
      "Cooking delicious meals at home! (Memasak makanan lezat di rumah!)",
      "Playing video games and mobile games! (Main game video dan game HP!)"
    ]
  },

  // 11. MUSIC & SINGING
  {
    keywords: ['musik', 'music', 'lagu', 'song', 'singing', 'nyanyi', 'gitar', 'guitar', 'piano', 'band', 'dengar lagu', 'listen to music', 'konser', 'spotify'],
    correctedEnglish: "I love listening to music. It always relaxes my mind.",
    correctedMeaning: "Saya suka mendengarkan musik. Musik selalu membuat pikiranku rileks.",
    correctionTip: "Ingat: dalam bahasa Inggris kita mengatakan 'listen TO music' (harus ada kata 'to'), bukan sekadar 'listen music'.",
    phonetic: "Ay lav lis-ning tu myu-zik. It ol-weyz ri-lek-ses may maynd.",
    vocab: [
      { word: "Listen to music", meaning: "Mendengarkan musik (wajib pakai to)" },
      { word: "Relaxes my mind", meaning: "Membuat pikiran rileks" }
    ],
    aiReplyEn: "Music is the universal language of the soul! Did you know that listening to music in English is actually one of the best ways to pick up natural pronunciation and vocabulary effortlessly? What genre of music or artists do you listen to the most?",
    aiReplyId: "Musik adalah bahasa universal jiwa! Tahu nggak, mendengarkan lagu bahasa Inggris itu salah satu cara paling ampuh buat belajar pengucapan alami dan kosakata baru tanpa terasa. Aliran musik atau penyanyi apa yang paling sering kamu dengar?",
    suggestedReplies: [
      "Pop and acoustic songs! (Lagu pop dan akustik santai!)",
      "Rock and energetic music! (Musik rock yang berenergi!)",
      "Calm lofi beats and instrumental music. (Musik lofi santai dan instrumental.)"
    ]
  },

  // 12. MOVIES & NETFLIX
  {
    keywords: ['film', 'movie', 'cinema', 'nonton', 'watch', 'series', 'netflix', 'drama', 'bioskop', 'anime', 'aktor', 'tonton'],
    correctedEnglish: "I really enjoy watching movies and TV series in the evening.",
    correctedMeaning: "Saya sangat menikmati nonton film dan serial TV di malam hari.",
    correctionTip: "Gunakan kata kerja 'watch' untuk layar (watch a movie, watch TV), bukan 'see' atau 'look'.",
    phonetic: "Ay rii-li en-joy wat-cing mu-viiz end ti-vi si-riiz in di iiv-ning.",
    vocab: [
      { word: "Watch movies", meaning: "Menonton film (pakai kata watch)" },
      { word: "TV series", meaning: "Serial film / drama" }
    ],
    aiReplyEn: "Nothing beats curling up with a bowl of popcorn and watching a gripping movie! What was the last movie or show you watched that you would recommend to a friend?",
    aiReplyId: "Nggak ada yang ngalahin nikmatnya rebahan sambil ngemil popcorn dan nonton film seru! Film atau serial terakhir apa yang baru-baru ini kamu tonton dan kamu rekomendasikan ke teman?",
    suggestedReplies: [
      "An exciting action movie with plot twists! (Film aksi seru dengan jalan cerita tak terduga!)",
      "A heartwarming romantic comedy! (Film komedi romantis yang bikin tersenyum!)",
      "An interesting mystery detective show! (Serial misteri detektif yang bikin penasaran!)"
    ]
  },

  // 13. WEATHER - HOT & SUNNY
  {
    keywords: ['panas', 'hot', 'gerah', 'terik', 'matahari', 'sunny', 'keringat', 'cuaca panas'],
    correctedEnglish: "The weather is scorching hot today! I need something cold to drink.",
    correctedMeaning: "Cuaca hari ini panas terik banget! Saya butuh minum yang dingin-dingin nih.",
    correctionTip: "'Scorching hot' adalah ungkapan native untuk cuaca yang sangat panas menyengat, terdengar jauh lebih hidup dibanding cuma 'very hot'.",
    phonetic: "De we-der iz skor-cing hot tu-dey! Ay niid sam-thing kold tu dringk.",
    vocab: [
      { word: "Scorching hot", meaning: "Panas terik menyengat" },
      { word: "Cold drink", meaning: "Minuman dingin" }
    ],
    aiReplyEn: "Whew, stay hydrated! On boiling hot days like this, sitting in an air-conditioned room with an ice-cold glass of water or lemonade feels like heaven. What is your go-to way to stay cool when it's super hot outside?",
    aiReplyId: "Wah jangan lupa banyak minum air ya! Di hari panas terik kayak gini, duduk di ruangan ber-AC sambil minum segelas air es atau es lemon rasanya nikmat banget. Cara paling ampuh apa yang biasa kamu lakuin buat ngademin diri kalau lagi panas banget?",
    suggestedReplies: [
      "Drinking sweet iced tea with lots of ice! (Minum es teh manis pakai es banyak!)",
      "Staying inside with the AC turned on! (Nyalain AC dan tetap di dalam ruangan!)",
      "Taking a refreshing cold shower! (Mandi air dingin biar segar!)"
    ]
  },

  // 14. WEATHER - RAIN & COLD
  {
    keywords: ['hujan', 'rain', 'rainy', 'dingin', 'cold', 'mendung', 'cloudy', 'badai', 'storm', 'becek', 'banjir', 'gerimis', 'cuaca dingin'],
    correctedEnglish: "It's raining heavily outside and the air feels chilly.",
    correctedMeaning: "Di luar sedang hujan deras dan udaranya terasa dingin sejuk.",
    correctionTip: "Gunakan 'raining heavily' untuk hujan deras (bukan 'big rain'). 'Chilly' artinya dingin sejuk menyegarkan.",
    phonetic: "Its rey-ning he-vi-li awt-sayd end di eyr fiilz ci-li.",
    vocab: [
      { word: "Raining heavily", meaning: "Hujan deras (bukan big rain)" },
      { word: "Chilly", meaning: "Dingin sejuk" }
    ],
    aiReplyEn: "Rainy days have such a cozy, calming vibe! In English, people call this 'pluviophile' weather—the joy of hearing raindrops while sipping hot tea or noodle soup. Do you enjoy rainy days, or do you prefer bright sunny sunshine?",
    aiReplyId: "Hari hujan punya suasana syahdu dan tenang banget ya! Dalam bahasa Inggris ada istilah 'pluviophile' buat orang yang suka suara hujan sambil nyeruput teh hangat atau mie kuah. Kamu sendiri lebih suka hari hujan atau hari cerah matahari?",
    suggestedReplies: [
      "I love rainy days, perfect for sleeping! (Saya suka hujan, pas banget buat tidur nyenyak!)",
      "Eating hot noodle soup when it rains is the best! (Makan mie kuah hangat pas hujan paling mantap!)",
      "I prefer sunny weather so I can go out easily! (Saya lebih suka cerah biar gampang keluar!)"
    ]
  },

  // 15. WORK & OFFICE
  {
    keywords: ['kerja', 'kantor', 'work', 'working', 'office', 'sibuk', 'busy', 'tugas', 'project', 'bos', 'meeting', 'rapat', 'deadline', 'lembur', 'overtime'],
    correctedEnglish: "I'm having a busy work day today, but I'm making solid progress!",
    correctedMeaning: "Hari ini saya sedang cukup sibuk kerja, tapi semuanya mengalami kemajuan bagus!",
    correctionTip: "'Making progress' artinya pekerjaan kita terus maju berkembang. 'Busy work day' sangat umum diucapkan rekan kerja bule.",
    phonetic: "Aym he-ving e bi-zi werk dey tu-dey, bat Aym mey-king so-lid prog-res!",
    vocab: [
      { word: "Busy work day", meaning: "Hari kerja yang padat" },
      { word: "Solid progress", meaning: "Kemajuan yang nyata dan baik" }
    ],
    aiReplyEn: "Keep up the fantastic momentum! Remember that taking quick 3-minute breathers to stretch your shoulders and look away from your screen works wonders for your productivity. How do you usually like to unwind after a productive day at work?",
    aiReplyId: "Semangat terus, kerjaanmu pasti beres! Ingat ya luangkan rehat sejenak 3 menit buat renggangkan pundak dan istirahat dari layar laptop. Kamu biasanya suka ngapain buat santai setelah beres kerja seharian?",
    suggestedReplies: [
      "Watching funny videos on YouTube or TikTok! (Nonton video lucu di YouTube atau TikTok!)",
      "Having a tasty dinner and taking a warm shower. (Makan malam enak terus mandi air hangat.)",
      "Taking a power nap to recharge my energy. (Tidur siang sebentar buat balikin tenaga.)"
    ]
  },

  // 16. STUDY / SCHOOL / COLLEGE
  {
    keywords: ['belajar', 'study', 'sekolah', 'school', 'kuliah', 'college', 'university', 'kampus', 'tugas kuliah', 'ujian', 'exam', 'test', 'skripsi', 'pr', 'homework'],
    correctedEnglish: "I'm studying hard for my classes and preparing for upcoming exams.",
    correctedMeaning: "Saya sedang rajin belajar untuk pelajaran saya dan bersiap untuk ujian mendatang.",
    correctionTip: "Gunakan 'study hard' (bukan 'study strong'). Kata 'upcoming exams' artinya ujian yang sebentar lagi akan datang.",
    phonetic: "Aym sta-di-ing hard for may kle-ses end pri-pe-ring for ap-ka-ming eg-zems.",
    vocab: [
      { word: "Study hard", meaning: "Belajar sungguh-sungguh" },
      { word: "Upcoming exams", meaning: "Ujian yang akan datang" }
    ],
    aiReplyEn: "Education opens up the entire world! Even when studying gets tough, every small concept you master today builds your confidence for tomorrow. What subject or skill do you enjoy learning the most?",
    aiReplyId: "Pendidikan itu pembuka pintu ke seluruh dunia! Meskipun kadang belajar terasa menantang, setiap hal kecil yang kamu kuasai hari ini bikin kamu makin percaya diri besok. Pelajaran atau keterampilan apa yang paling kamu sukai?",
    suggestedReplies: [
      "Practicing languages and communication! (Latihan bahasa dan komunikasi!)",
      "Learning technology, coding, and computers! (Belajar teknologi, coding, dan komputer!)",
      "Reading about business and practical skills. (Membaca tentang bisnis dan keahlian praktis.)"
    ]
  },

  // 17. TRAVEL & VACATION
  {
    keywords: ['liburan', 'holiday', 'vacation', 'jalan-jalan', 'travel', 'trip', 'pantai', 'beach', 'gunung', 'mountain', 'hotel', 'pesawat', 'plane', 'bandara', 'airport', 'bali', 'wisata'],
    correctedEnglish: "I really want to go on vacation and explore new beautiful places!",
    correctedMeaning: "Saya pengen banget pergi liburan dan menjelajahi tempat-tempat indah yang baru!",
    correctionTip: "Gunakan 'go on vacation' (bukan 'go to holiday'). Frasa 'explore new places' terdengar sangat elegan dan santai.",
    phonetic: "Ay rii-li wont tu gow on vey-key-syen end eks-plor nyu byu-ti-ful pley-ses!",
    vocab: [
      { word: "Go on vacation", meaning: "Pergi liburan" },
      { word: "Explore", meaning: "Menjelajahi / mengeksplor" }
    ],
    aiReplyEn: "Traveling gives us the best memories and stories to tell! Indonesia has some of the most breathtaking destinations on earth, from Bali's beaches to Raja Ampat. If you could pack your bags right now, would you head to the sunny beach or peaceful cool mountains?",
    aiReplyId: "Jalan-jalan itu ngasih kenangan dan cerita paling berkesan! Indonesia punya destinasi alam paling memukau di dunia, dari pantai Bali sampai Raja Ampat. Kalau sekarang bisa langsung berangkat, kamu lebih pilih ke pantai cerah atau pegunungan yang sejuk?",
    suggestedReplies: [
      "To the sunny beach to hear the ocean waves! (Ke pantai cerah buat dengar deburan ombak!)",
      "To the cool green mountains with peaceful fresh air! (Ke pegunungan sejuk dengan udara segar!)",
      "To explore a vibrant modern foreign city! (Menjelajahi kota modern luar negeri yang ramai!)"
    ]
  },

  // 18. SPORTS & FITNESS
  {
    keywords: ['olahraga', 'sport', 'lari', 'run', 'running', 'gym', 'sepeda', 'cycling', 'sepak bola', 'football', 'soccer', 'badminton', 'bulutangkis', 'renang', 'swimming', 'workout'],
    correctedEnglish: "I like staying active by exercising and playing sports regularly.",
    correctedMeaning: "Saya suka menjaga tubuh tetap aktif dengan berolahraga secara teratur.",
    correctionTip: "'Staying active' adalah ungkapan yang sangat sering digunakan native speaker untuk gaya hidup rajin bergerak dan bugar.",
    phonetic: "Ay layk stey-ing ek-tiv bay ek-ser-say-zing end pley-ing sports re-gyu-ler-li.",
    vocab: [
      { word: "Staying active", meaning: "Menjaga tubuh tetap aktif bergerak" },
      { word: "Regularly", meaning: "Secara teratur / rutin" }
    ],
    aiReplyEn: "Exercise is such an awesome booster for both body and mind! It releases endorphins that make you instantly happier and more energetic. What kind of sport or workout gets you most excited?",
    aiReplyId: "Olahraga itu peningkat semangat yang luar biasa buat tubuh dan pikiran! Olahraga memicu endorfin yang bikin kita langsung lebih bahagia dan bertenaga. Olahraga apa yang paling bikin kamu bersemangat?",
    suggestedReplies: [
      "Badminton with friends on weekends! (Main bulutangkis bareng teman pas weekend!)",
      "Jogging in the morning breeze! (Lari pagi santai menikmati angin sejuk!)",
      "Gym workouts and weight lifting! (Latihan di gym angkat beban!)"
    ]
  },

  // 19. GAMING
  {
    keywords: ['game', 'gaming', 'gamer', 'main game', 'play game', 'mobile legends', 'playstation', 'ps5', 'pubg', 'steam', 'pc game'],
    correctedEnglish: "I love playing video games with my friends to blow off some steam.",
    correctedMeaning: "Saya suka main game bareng teman-teman buat melepas penat dan stres.",
    correctionTip: "'Blow off some steam' adalah idiom native speaker yang artinya melepas stres atau kepenatan setelah seharian beraktivitas.",
    phonetic: "Ay lav pley-ing vi-di-ow geyms with may frends tu blow of sam stiim.",
    vocab: [
      { word: "Video games", meaning: "Permainan game" },
      { word: "Blow off steam", meaning: "Melepas penat / stres" }
    ],
    aiReplyEn: "Gaming is such a fun way to team up with friends and sharpen your quick thinking! Some modern games have storylines as deep as Oscar-winning movies. What games are you playing the most these days?",
    aiReplyId: "Main game itu cara seru banget buat seru-seruan bareng teman dan ngelatih respon cepat! Beberapa game modern bahkan punya jalan cerita sedalam film bioskop. Game apa yang lagi sering kamu mainkan akhir-akhir ini?",
    suggestedReplies: [
      "Mobile games on my smartphone! (Game seru di HP bareng teman!)",
      "Competitive multiplayer action games! (Game aksi seru yang kompetitif!)",
      "Relaxing adventure and story games. (Game petualangan santai dengan cerita bagus.)"
    ]
  },

  // 20. FAMILY & FRIENDS
  {
    keywords: ['keluarga', 'family', 'orang tua', 'parents', 'ayah', 'father', 'ibu', 'mother', 'anak', 'teman', 'friend', 'sahabat', 'bestie', 'saudara', 'brother', 'sister'],
    correctedEnglish: "Spending quality time with my family and friends is very important to me.",
    correctedMeaning: "Menghabiskan waktu berkualitas bersama keluarga dan teman sangat berarti bagi saya.",
    correctionTip: "'Quality time' artinya waktu kebersamaan yang bermakna dan penuh perhatian.",
    phonetic: "Spen-ding kwa-li-ti taym with may fe-mi-li end frends iz ve-ri im-por-tant tu mi.",
    vocab: [
      { word: "Quality time", meaning: "Waktu kebersamaan yang bermakna" },
      { word: "Important to me", meaning: "Penting / berarti bagi saya" }
    ],
    aiReplyEn: "Treasuring close relationships is the real secret to a happy life! Laughing together over dinner or catching up with an old buddy always warms the heart. What is your favorite way to hang out with the people closest to you?",
    aiReplyId: "Menjaga hubungan dekat itu rahasia utama hidup bahagia! Tertawa bareng pas makan malam atau ngobrol sama teman lama selalu bikin hati hangat. Cara favorit apa yang paling kamu sukai pas lagi kumpul bareng orang tersayang?",
    suggestedReplies: [
      "Eating good food and chatting together! (Makan makanan enak sambil ngobrol santai!)",
      "Watching movies or series together at home. (Nonton film bareng di rumah.)",
      "Going on weekend road trips or vacations! (Jalan-jalan santai di akhir pekan!)"
    ]
  },

  // 21. SLEEP & GOOD NIGHT
  {
    keywords: ['tidur', 'sleep', 'sleepy', 'kasur', 'bed', 'night', 'good night', 'selamat tidur', 'mimpi', 'mimpi indah', 'sweet dreams', 'istirahat malam'],
    correctedEnglish: "I'm getting ready for bed. Have a good night and sweet dreams!",
    correctedMeaning: "Saya sedang bersiap untuk tidur. Selamat malam dan mimpi indah ya!",
    correctionTip: "'Getting ready for bed' adalah cara alami native speaker mengatakan hendak beranjak tidur.",
    phonetic: "Aym get-ting re-di for bed. Hev e gud nayt end swiit driims!",
    vocab: [
      { word: "Getting ready for bed", meaning: "Bersiap untuk tidur" },
      { word: "Sweet dreams", meaning: "Mimpi indah" }
    ],
    aiReplyEn: "Rest well and have sweet dreams! Put all your worries aside and get some deep, restorative sleep. I'll be right here whenever you want to practice again tomorrow. Good night!",
    aiReplyId: "Istirahat yang nyenyak dan mimpi indah ya! Lepaskan semua beban pikiran dan nikmati tidur nyenyakmu. Saya akan selalu ada di sini kapan pun kamu mau latihan lagi besok. Selamat tidur!",
    suggestedReplies: [
      "Good night, see you tomorrow! (Selamat malam, sampai ketemu besok!)",
      "Thank you, sleep well too! (Terima kasih, kamu juga istirahat ya!)",
      "Sweet dreams, Echo! (Mimpi indah ya, Echo!)"
    ]
  },

  // 22. SHOPPING & PRICES
  {
    keywords: ['belanja', 'shopping', 'beli', 'buy', 'mall', 'toko', 'shop', 'store', 'diskon', 'discount', 'murah', 'cheap', 'mahal', 'expensive', 'berapa harga', 'how much'],
    correctedEnglish: "Excuse me, how much does this cost? Is there any discount available?",
    correctedMeaning: "Permisi, berapa harga barang ini? Apakah ada diskon yang berlaku?",
    correctionTip: "Gunakan 'How much does this cost?' (bukan 'How much price?'). Menanyakan diskon dengan 'Is there any discount available?' sangat sopan.",
    phonetic: "Eks-kyus mi, haw mec daz dis kost? Iz der e-ni dis-kawnt e-vey-le-bel?",
    vocab: [
      { word: "How much does this cost", meaning: "Berapa harganya (bentuk baku yang benar)" },
      { word: "Discount available", meaning: "Diskon yang tersedia" }
    ],
    aiReplyEn: "Shopping and hunting for good deals is always thrilling! In street markets people love to bargain, while in shopping malls the prices are usually set. Do you prefer online shopping apps, or going to physical stores in person?",
    aiReplyId: "Belanja dan berburu barang bagus dengan harga hemat itu seru banget! Di pasar orang suka tawar-menawar, kalau di mall harganya biasanya pas. Kamu lebih suka belanja lewat aplikasi online, atau datang langsung ke tokonya?",
    suggestedReplies: [
      "I love online shopping, it's so convenient! (Saya suka belanja online, sangat praktis!)",
      "I prefer physical stores so I can see the items! (Saya lebih suka ke toko langsung biar bisa lihat barangnya!)",
      "I only buy things when there are big promo discounts! (Saya cuma belanja pas ada diskon promo besar!)"
    ]
  },

  // 23. COMPLIMENTS & PRAISE TO ECHO
  {
    keywords: ['kamu pintar', 'you are smart', 'bagus', 'hebat', 'keren', 'awesome', 'great', 'good job', 'terbaik', 'best', 'makasih banyak', 'suka aplikasi ini'],
    correctedEnglish: "You are truly amazing! Thank you for helping me learn English so easily.",
    correctedMeaning: "Kamu benar-benar luar biasa! Terima kasih sudah membantuku belajar bahasa Inggris dengan begitu mudah.",
    correctionTip: "Kata 'truly amazing' mengungkapkan pujian yang tulus dan bersemangat.",
    phonetic: "Yu ar tru-li e-mey-zing! Thengk yu for hel-ping mi lern Ing-glisy sow ii-zi-li.",
    vocab: [
      { word: "Truly amazing", meaning: "Benar-benar luar biasa" },
      { word: "Learn easily", meaning: "Belajar dengan mudah" }
    ],
    aiReplyEn: "Aww, thank you so much! That means the absolute world to me. Seeing you speak and practice with courage is what inspires me every single minute. What is your favorite thing about our practice sessions so far?",
    aiReplyId: "Aduh, terima kasih banyak pujiannya! Senang banget dengarnya. Melihatmu berani bicara dan latihan itu yang bikin saya makin bersemangat tiap menit. Hal apa yang paling kamu sukai dari sesi latihan kita sejauh ini?",
    suggestedReplies: [
      "I love that there is phonetic reading guide! (Saya suka karena ada panduan cara bacanya!)",
      "I like getting natural corrections without feeling judged! (Saya suka karena dikoreksi santai tanpa takut salah!)",
      "The suggested replies make chatting so smooth! (Pilihan balasan cepatnya bikin ngobrol jadi lancar!)"
    ]
  },

  // 24. TIPS TO BE FLUENT IN ENGLISH
  {
    keywords: ['cara lancar', 'tips bahasa inggris', 'tips lancar', 'biar lancar', 'how to be fluent', 'belajar bahasa inggris', 'susah ngomong', 'takut salah', 'grammar susah'],
    correctedEnglish: "What are your best tips for speaking English fluently and confidently?",
    correctedMeaning: "Apa tips terbaikmu agar bisa berbicara bahasa Inggris dengan lancar dan percaya diri?",
    correctionTip: "'Fluently and confidently' adalah kombinasi kata yang pas untuk menggambarkan lancar dan percaya diri.",
    phonetic: "Wat ar yor best tips for spi-king Ing-glisy flu-ent-li end kon-fi-dent-li?",
    vocab: [
      { word: "Fluently", meaning: "Dengan lancar" },
      { word: "Confidently", meaning: "Dengan percaya diri" }
    ],
    aiReplyEn: "Here is the golden secret: Stop worrying about 100% perfect grammar! Native speakers make grammar mistakes every day too. The real key is speaking aloud for just 5 minutes daily—like we are doing right now! How long have you been wanting to become fluent in English?",
    aiReplyId: "Ini rahasia emasnya: Berhenti mencemaskan grammar yang 100% sempurna! Penutur asli bule pun tiap hari sering salah grammar kok. Kunci utamanya adalah berani bersuara 5 menit tiap hari—persis kayak yang lagi kita lakuin sekarang! Sudah berapa lama kamu pengen lancar bahasa Inggris?",
    suggestedReplies: [
      "For a few months now! (Sudah beberapa bulan ini!)",
      "For a very long time, but I used to be shy! (Sudah lama banget, tapi dulu saya suka pemalu!)",
      "Just started recently, and I'm really enjoying it! (Baru mulai belakangan ini, dan saya sangat menikmatinya!)"
    ]
  },

  // 25. WEEKEND PLANS
  {
    keywords: ['weekend', 'akhir pekan', 'sabtu', 'minggu', 'saturday', 'sunday', 'rencana', 'plan', 'besok libur'],
    correctedEnglish: "Do you have any fun plans for this upcoming weekend?",
    correctedMeaning: "Apakah kamu ada rencana seru untuk akhir pekan yang akan datang ini?",
    correctionTip: "'Upcoming weekend' adalah cara lazim menanyakan akhir pekan terdekat yang sebentar lagi tiba.",
    phonetic: "Du yu hev e-ni fan plens for dis ap-ka-ming wiik-end?",
    vocab: [
      { word: "Fun plans", meaning: "Rencana seru" },
      { word: "Upcoming weekend", meaning: "Akhir pekan yang akan datang" }
    ],
    aiReplyEn: "Weekends are the reward we all look forward to! Whether it is going on a mini adventure or having a lazy pajama day at home, it is all about enjoying yourself. What is your ideal weekend?",
    aiReplyId: "Akhir pekan itu hadiah yang selalu ditunggu-tunggu kita semua! Mau itu pergi jalan-jalan seru atau santai rebahan seharian pakai baju tidur, yang penting bikin bahagia. Akhir pekan idamanmu kayak gimana?",
    suggestedReplies: [
      "Going to nice cafes and trying new food! (Pergi ke kafe asyik dan nyobain makanan baru!)",
      "Staying home, sleeping in, and binge-watching series! (Di rumah aja, bangun siang, dan maraton nonton serial!)",
      "Hanging out outdoors in nature! (Jalan-jalan santai di alam terbuka!)"
    ]
  },

  // 26. WHERE DO YOU LIVE / HOMETOWN
  {
    keywords: ['tinggal dimana', 'where do you live', 'asal kamu', 'asalmu', 'dari mana', 'where are you from', 'kota', 'city', 'hometown'],
    correctedEnglish: "Where do you live, and what is your hometown famous for?",
    correctedMeaning: "Di mana kamu tinggal, dan kotamu terkenal dengan apa?",
    correctionTip: "'What is your hometown famous for?' adalah pertanyaan percakapan yang sangat bagus untuk membuka obrolan tentang budaya daerah.",
    phonetic: "Wer du yu liv, end wat iz yor howm-tawn fey-mes for?",
    vocab: [
      { word: "Where do you live", meaning: "Di mana kamu tinggal" },
      { word: "Famous for", meaning: "Terkenal karena apa" }
    ],
    aiReplyEn: "I live inside your device, but in my heart I'm a global traveler! I love exploring stories from all across Indonesia—from Jakarta, Surabaya, Bandung, Medan, to Makassar and Bali. What city are you currently in right now?",
    aiReplyId: "Saya tinggal di dalam aplikasimu, tapi di hati saya penjelajah dunia! Saya suka dengar cerita dari berbagai penjuru Indonesia—dari Jakarta, Surabaya, Bandung, Medan, sampai Makassar dan Bali. Kamu sendiri lagi di kota mana sekarang?",
    suggestedReplies: [
      "I live in Jakarta, the bustling capital city! (Saya tinggal di Jakarta, ibu kota yang ramai!)",
      "I live in West Java, the weather is nice and breezy! (Saya di Jawa Barat, udaranya adem dan sejuk!)",
      "I live in a peaceful town with friendly neighbors! (Saya di kota yang damai dengan warga yang ramah!)"
    ]
  },

  // 27. FEELINGS - HAPPY / BLESSED
  {
    keywords: ['senang', 'bahagia', 'happy', 'excited', 'gembira', 'bersyukur', 'grateful', 'proud', 'alhamdulillah', 'senang banget'],
    correctedEnglish: "I'm feeling so happy and grateful today. Life is good!",
    correctedMeaning: "Saya merasa sangat senang dan bersyukur hari ini. Hidup ini indah!",
    correctionTip: "'Grateful' artinya bersyukur. 'Life is good' adalah frasa santai native speaker saat merayakan hari yang menyenangkan.",
    phonetic: "Aym fii-ling sow he-pi end greyt-ful tu-dey. Layf iz gud!",
    vocab: [
      { word: "Feeling happy", meaning: "Merasa bahagia" },
      { word: "Grateful", meaning: "Bersyukur" }
    ],
    aiReplyEn: "Your positive energy is completely contagious! It makes me smile just hearing that. When we count our blessings, good things multiply. What made you feel so cheerful today?",
    aiReplyId: "Energi positifmu nular banget! Bikin saya ikut tersenyum dengarnya. Saat kita bersyukur, hal-hal baik bakal makin berlipat ganda. Hal apa yang bikin kamu sebahagia ini hari ini?",
    suggestedReplies: [
      "Everything went smoothly with my tasks today! (Semua urusan dan tugasku berjalan lancar hari ini!)",
      "I had a really heartwarming chat with someone special! (Sempat ngobrol hangat sama orang tersayang!)",
      "Just feeling healthy and enjoying this moment! (Merasa sehat dan menikmati hari ini!)"
    ]
  },

  // 28. FEELINGS - SAD / DOWN / STRESSED
  {
    keywords: ['sedih', 'sad', 'down', 'galau', 'kecewa', 'disappointed', 'menangis', 'cry', 'patah hati', 'stres', 'stress', 'tertekan'],
    correctedEnglish: "I'm feeling a bit down and stressed out today.",
    correctedMeaning: "Saya merasa agak sedih dan sedikit stres hari ini.",
    correctionTip: "'A bit down' adalah cara halus dan sopan dalam bahasa Inggris untuk mengatakan suasana hati sedang tidak enak.",
    phonetic: "Aym fii-ling e bit dawn end strest awt tu-dey.",
    vocab: [
      { word: "A bit down", meaning: "Agak sedih / lesu" },
      { word: "Stressed out", meaning: "Merasa stres" }
    ],
    aiReplyEn: "I'm sending you a big virtual warm hug. It is completely okay not to be okay sometimes. Tough days never last, but tough people do! Be gentle with yourself today. Would you like to talk about it, or would you rather distract yourself with a fun topic?",
    aiReplyId: "Saya kirim pelukan hangat buatmu ya. Nggak apa-apa kok kalau kadang kita ngerasa sedih atau lelah. Hari yang berat pasti bakal berlalu! Jangan terlalu keras sama dirimu sendiri ya. Mau cerita pelan-pelan, atau mau ngobrol topik santai biar lebih tenang?",
    suggestedReplies: [
      "Let's chat about something cheerful to lift my spirits! (Yuk ngobrol hal ceria biar semangatku naik!)",
      "I just need a quiet moment to rest my mind. (Saya cuma butuh waktu tenang buat istirahat.)",
      "Thank you for being so kind and understanding, Echo. (Terima kasih sudah begitu ramah dan mengerti, Echo.)"
    ]
  },

  // 29. FEELINGS - BORED / GABUT
  {
    keywords: ['bosan', 'bored', 'boring', 'gabut', 'nggak ada kerjaan', 'mati gaya', 'bingung mau ngapain'],
    correctedEnglish: "I'm feeling pretty bored. I need something fun and engaging to do!",
    correctedMeaning: "Saya merasa cukup bosan nih. Saya butuh sesuatu yang seru untuk dilakukan!",
    correctionTip: "Ingat: katakan 'I am bored' (artinya saya merasa bosan), BUKAN 'I am boring' (itu artinya saya orang yang membosankan).",
    phonetic: "Aym fii-ling pri-ti bord. Ay niid sam-thing fan end en-gey-jing tu du!",
    vocab: [
      { word: "I am bored", meaning: "Saya merasa bosan (jangan keliru boring)" },
      { word: "Engaging", meaning: "Menarik perhatian / seru" }
    ],
    aiReplyEn: "Haha, boredom is actually the brain's way of asking for a new adventure! Since we have a few minutes together, let's learn a fun English riddle or talk about dream travel destinations. If you had an unlimited ticket anywhere right now, where would you fly?",
    aiReplyId: "Haha, rasa bosan itu sebenarnya tanda otak kita lagi minta petualangan baru! Mumpung kita lagi ngobrol bareng, gimana kalau kita bahas destinasi impian. Kalau sekarang kamu megang tiket gratis ke mana aja di dunia, kamu mau terbang ke mana?",
    suggestedReplies: [
      "To Tokyo, Japan to explore futuristic streets! (Ke Tokyo, Jepang buat lihat kota futuristik!)",
      "To London or Paris to see historic castles! (Ke London atau Paris buat lihat kastil bersejarah!)",
      "To New York City to see Times Square! (Ke New York City buat lihat gemerlap Times Square!)"
    ]
  },

  // 30. TECHNOLOGY & GADGETS
  {
    keywords: ['hp', 'handphone', 'phone', 'smartphone', 'komputer', 'computer', 'laptop', 'internet', 'wifi', 'aplikasi', 'app', 'gadget'],
    correctedEnglish: "Technology and smartphones have made our daily lives so much easier.",
    correctedMeaning: "Teknologi dan ponsel pintar membuat hidup kita sehari-hari jadi jauh lebih mudah.",
    correctionTip: "Frasa 'made our lives easier' sangat sering digunakan saat membahas kemajuan teknologi.",
    phonetic: "Tek-no-lo-ji end smart-fowns hev meyd awr dey-li layvz sow mec ii-zi-yer.",
    vocab: [
      { word: "Daily lives", meaning: "Kehidupan sehari-hari" },
      { word: "Easier", meaning: "Lebih mudah" }
    ],
    aiReplyEn: "Technology is truly magical! Think about it—right now you are practicing English conversation with an intelligent system right inside your palm! What is one mobile app or gadget you couldn't live without?",
    aiReplyId: "Teknologi itu benar-benar kayak keajaiban ya! Coba bayangkan—saat ini kamu bisa latihan percakapan bahasa Inggris langsung dari genggaman tanganmu! Aplikasi HP apa yang paling nggak bisa lepas dari keseharianmu?",
    suggestedReplies: [
      "YouTube and video streaming apps! (YouTube dan aplikasi nonton video!)",
      "WhatsApp and messaging apps for chatting! (WhatsApp dan aplikasi chat buat komunikasi!)",
      "Language learning apps like NgomongYuk! (Aplikasi belajar bahasa seperti NgomongYuk!)"
    ]
  }
];

/**
 * Generates dynamic, varied conversational replies based on sentence intent.
 * Ensures Echo NEVER repeats the exact same fallback paragraph!
 */
export function getDynamicContextualReply(text, isIndo, scenario) {
  const lower = text.toLowerCase().trim();
  const isQuestion = lower.endsWith('?') || 
    /^(what|why|how|where|when|who|is|are|can|could|would|do|does|did|apakah|kenapa|mengapa|bagaimana|kapan|dimana|siapa)/i.test(lower);

  if (isQuestion) {
    return {
      corrected: isIndo ? `Excuse me, could you tell me: "${text}"?` : text.charAt(0).toUpperCase() + text.slice(1),
      meaning: isIndo ? `Permisi, bisakah Anda memberi tahu saya: "${text}"?` : `Pertanyaan: "${text}"`,
      tip: "Saat mengajukan pertanyaan dalam bahasa Inggris, menambahkan 'Excuse me, could you tell me...' terdengar sangat sopan.",
      aiReplyEn: "That is such a thought-provoking question! In my experience, there are so many interesting ways to look at that topic. It actually reminds me of how people love sharing stories over a friendly conversation. What made you curious about that today?",
      aiReplyId: "Itu pertanyaan yang sangat menarik dan bikin mikir! Dari sudut pandang saya, ada banyak cara seru buat melihat topik itu. Ini bikin saya teringat gimana asyiknya orang saling bertukar cerita pas ngobrol santai. Apa yang bikin kamu penasaran tentang hal itu hari ini?",
      suggestedReplies: [
        "I was just reflecting on it earlier! (Saya tadi sempat kepikiran tentang hal itu!)",
        "I heard someone discussing it recently. (Saya baru-baru ini dengar orang membicarakannya.)",
        "Just a random curious thought! (Cuma rasa penasaran spontan aja!)"
      ]
    };
  }

  // Dynamic rotating replies for general statements
  const variations = [
    {
      aiReplyEn: "I love that perspective! Chatting casually like this is honestly the quickest way to build natural speaking confidence. Every time you express your thoughts, your English gets sharper! Tell me more about your thoughts on this.",
      aiReplyId: "Saya suka banget sudut pandangmu itu! Ngobrol santai kayak gini jujur adalah cara paling cepat buat bangun rasa percaya diri bicara. Setiap kali kamu berani bersuara, kemampuan bahasa Inggrismu makin terasah! Ceritakan lebih banyak dong tentang pikiranmu soal ini.",
      suggestedReplies: [
        "I totally agree with that idea! (Saya sangat setuju dengan ide itu!)",
        "It's really fun practicing this way with you. (Seru banget latihan dengan cara ini bersamamu.)",
        "I'm learning new vocabulary every day! (Saya dapat kosakata baru tiap hari!)"
      ]
    },
    {
      aiReplyEn: "That's so interesting to hear! You know, being able to express real everyday thoughts naturally is what true language fluency is all about. You are doing fantastic! What other topics do you enjoy chatting about most?",
      aiReplyId: "Menarik banget dengarnya! Tahu nggak, bisa mengungkapkan pikiran sehari-hari dengan santai itu inti dari kelancaran bahasa yang sesungguhnya. Kamu latihannya keren banget! Topik apa lagi yang paling kamu sukai buat diobrolin?",
      suggestedReplies: [
        "I love talking about food and daily life! (Saya suka ngobrol tentang makanan dan keseharian!)",
        "I enjoy sharing travel and holiday dreams! (Saya suka berbagi impian liburan dan jalan-jalan!)",
        "I like casual chat about movies and music! (Saya suka ngobrol santai soal film dan musik!)"
      ]
    },
    {
      aiReplyEn: "That sounds awesome! I really enjoy hearing your thoughts. Having open, friendly conversations like this makes learning feel like an adventure rather than a chore. How does your day feel right now?",
      aiReplyId: "Kedengarannya keren banget! Saya sangat menikmati dengar ceritamu. Obrolan terbuka dan ramah kayak gini bikin belajar berasa petualangan seru, bukan beban. Gimana perasaan harimu sekarang?",
      suggestedReplies: [
        "I feel relaxed and ready to learn more! (Saya merasa rileks dan siap belajar lebih banyak!)",
        "My mood is getting better every minute! (Suasana hatiku makin membaik tiap menit!)",
        "Everything is running smooth and peacefully. (Semuanya berjalan lancar dan damai.)"
      ]
    }
  ];

  // Pick variation based on text length to feel deterministic yet varied
  const selected = variations[text.length % variations.length];

  return {
    corrected: isIndo ? `I would like to say: "${text}".` : text.charAt(0).toUpperCase() + text.slice(1),
    meaning: isIndo ? `Maksud ucapan: "${text}".` : `Ucapan Anda: "${text}".`,
    tip: "Berani mengungkapkan pikiranmu secara terbuka adalah langkah terpenting dalam menguasai bahasa asing.",
    aiReplyEn: selected.aiReplyEn,
    aiReplyId: selected.aiReplyId,
    suggestedReplies: selected.suggestedReplies
  };
}
