export const SCENARIOS = [
  {
    id: 'cafe',
    title: 'Pesan Kopi di Kafe',
    englishTitle: 'Ordering at a Cafe',
    emoji: '☕',
    badge: 'Paling Populer',
    description: 'Latihan pesan minuman favorit, atur takaran gula/es, dan cara membayar dengan percaya diri.',
    initialMessageEn: "Hi there! Welcome to Starbucks. What can I get started for you today?",
    initialMessageId: "Halo! Selamat datang di Starbucks. Mau pesan apa hari ini?",
    starterPrompts: [
      {
        idText: "Saya mau pesan es kopi latte satu, tolong gulanya sedikit saja.",
        enText: "I would like an iced latte, please, with less sugar."
      },
      {
        idText: "Ada rekomendasi minuman yang segar untuk hari ini?",
        enText: "Do you have any recommendations for a refreshing drink today?"
      },
      {
        idText: "Berapa total harganya? Bisa bayar pakai kartu debit?",
        enText: "How much is the total? Can I pay with a debit card?"
      },
      {
        idText: "Bisa tolong buatkan untuk dibawa pulang (take away)?",
        enText: "Could you make that to go, please?"
      }
    ]
  },
  {
    id: 'intro',
    title: 'Perkenalan Diri & Teman Baru',
    englishTitle: 'Introducing Yourself & Small Talk',
    emoji: '🤝',
    badge: 'Wajib Pemula',
    description: 'Cara menyapa orang asing, menyebutkan nama, asal daerah, dan hobi tanpa kaku.',
    initialMessageEn: "Hello! My name is Alex. Nice to meet you! Where are you from?",
    initialMessageId: "Halo! Nama saya Alex. Senang berkenalan denganmu! Kamu berasal dari mana?",
    starterPrompts: [
      {
        idText: "Halo Alex! Nama saya Budi, saya berasal dari Indonesia.",
        enText: "Hi Alex! My name is Budi, I am from Indonesia."
      },
      {
        idText: "Senang berkenalan denganmu juga! Apa kegiatanmu di sini?",
        enText: "Nice to meet you too! What brings you here?"
      },
      {
        idText: "Saya sedang belajar bahasa Inggris, tolong koreksi kalau saya salah ya.",
        enText: "I'm practicing my English, please feel free to correct me!"
      },
      {
        idText: "Apa hobi yang sering kamu lakukan di akhir pekan?",
        enText: "What hobbies do you enjoy doing on weekends?"
      }
    ]
  },
  {
    id: 'restaurant',
    title: 'Makan di Restoran',
    englishTitle: 'Dining at a Restaurant',
    emoji: '🍽️',
    badge: 'Santai',
    description: 'Pesan meja, minta rekomendasi menu lezat, minta tambahan sendok, dan minta bon tagihan.',
    initialMessageEn: "Good evening! Welcome. Table for how many people tonight?",
    initialMessageId: "Selamat malam! Selamat datang. Meja untuk berapa orang malam ini?",
    starterPrompts: [
      {
        idText: "Meja untuk dua orang, tolong carikan yang dekat jendela.",
        enText: "A table for two, please, near the window if possible."
      },
      {
        idText: "Bolehkah kami melihat daftar menu dan daftar minumannya?",
        enText: "Could we see the food and drink menu, please?"
      },
      {
        idText: "Makanan apa yang paling enak dan jadi favorit di sini?",
        enText: "What is your most popular dish here?"
      },
      {
        idText: "Permisi, kami minta bon tagihannya ya.",
        enText: "Excuse me, could we have the bill, please?"
      }
    ]
  },
  {
    id: 'airport',
    title: 'Bandara & Penerbangan',
    englishTitle: 'Airport & Flight Check-in',
    emoji: '✈️',
    badge: 'Penting Liburan',
    description: 'Check-in bagasi, tanya pintu keberangkatan (gate), dan minta bantuan di pesawat.',
    initialMessageEn: "Good morning! May I see your passport and flight booking ticket, please?",
    initialMessageId: "Selamat pagi! Boleh saya lihat paspor dan tiket penerbangan Anda?",
    starterPrompts: [
      {
        idText: "Ini paspor dan tiket saya. Tolong kursi dekat jendela ya.",
        enText: "Here is my passport and ticket. A window seat, please."
      },
      {
        idText: "Di mana gerbang keberangkatan untuk penerbangan saya?",
        enText: "Where is the departure gate for my flight?"
      },
      {
        idText: "Apakah bagasi saya langsung dikirim ke tujuan akhir?",
        enText: "Will my luggage go straight through to my final destination?"
      },
      {
        idText: "Permisi, bolehkah saya minta segelas air putih hangat?",
        enText: "Excuse me, could I get a cup of warm water, please?"
      }
    ]
  },
  {
    id: 'hotel',
    title: 'Check-in di Hotel',
    englishTitle: 'Hotel Check-in & Services',
    emoji: '🏨',
    badge: 'Praktis',
    description: 'Proses check-in kamar, tanya fasilitas sarapan, dan minta password Wi-Fi.',
    initialMessageEn: "Welcome to Grand Hotel! Do you have a reservation with us?",
    initialMessageId: "Selamat datang di Grand Hotel! Apakah Anda sudah memiliki reservasi sebelumnya?",
    starterPrompts: [
      {
        idText: "Ya, saya sudah pesan kamar atas nama saya.",
        enText: "Yes, I have a reservation under my name."
      },
      {
        idText: "Jam berapa sarapan pagi disajikan dan di lantai berapa?",
        enText: "What time is breakfast served and on which floor?"
      },
      {
        idText: "Boleh minta kata sandi (password) Wi-Fi hotel?",
        enText: "Could I have the Wi-Fi password, please?"
      },
      {
        idText: "Jam berapa batas waktu check-out besok siang?",
        enText: "What is the check-out time tomorrow?"
      }
    ]
  },
  {
    id: 'directions',
    title: 'Tanya Arah di Jalan',
    englishTitle: 'Asking for Directions',
    emoji: '🗺️',
    badge: 'Survival',
    description: 'Saat tersesat, mencari stasiun kereta terdekat, minimarket, atau toilet umum.',
    initialMessageEn: "Excuse me, you look like you might need some help. Are you looking for something?",
    initialMessageId: "Permisi, sepertinya kamu butuh bantuan. Apakah sedang mencari sesuatu?",
    starterPrompts: [
      {
        idText: "Permisi, di mana arah menuju stasiun kereta terdekat?",
        enText: "Excuse me, where is the nearest train station?"
      },
      {
        idText: "Apakah cukup dekat jika berjalan kaki dari sini?",
        enText: "Is it within walking distance from here?"
      },
      {
        idText: "Bisa tolong tunjukkan di peta ponsel saya?",
        enText: "Could you please point it out on my phone's map?"
      },
      {
        idText: "Terima kasih banyak atas bantuan dan keramahanmu!",
        enText: "Thank you so much for your help and kindness!"
      }
    ]
  }
];
