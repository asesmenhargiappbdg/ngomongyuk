/**
 * Helper to generate simple Indonesian-friendly phonetic pronunciation guides
 * e.g., "Good morning, how are you?" -> "Gud mor-ning, hau ar yu?"
 */

const PHONETIC_MAP = {
  "hello": "he-low",
  "hi": "hay",
  "good": "gud",
  "morning": "mor-ning",
  "afternoon": "af-ter-nun",
  "evening": "iv-ning",
  "night": "nayt",
  "how": "hau",
  "are": "ar",
  "you": "yu",
  "i": "ay",
  "am": "em",
  "fine": "fayn",
  "thank": "tengk",
  "thanks": "tengks",
  "what": "wot",
  "is": "iz",
  "your": "yor",
  "name": "neym",
  "my": "may",
  "nice": "nays",
  "to": "tu",
  "meet": "mit",
  "where": "hwer",
  "from": "from",
  "come": "kam",
  "live": "liv",
  "in": "in",
  "indonesia": "in-do-ni-sya",
  "english": "ing-glisy",
  "speak": "spik",
  "want": "wont",
  "would": "wud",
  "like": "layk",
  "coffee": "ko-fi",
  "tea": "ti",
  "water": "wo-ter",
  "please": "pliiz",
  "much": "mac",
  "many": "me-ni",
  "cost": "kost",
  "price": "prays",
  "help": "help",
  "me": "mi",
  "can": "ken",
  "could": "kud",
  "understand": "an-der-stend",
  "repeat": "ri-piit",
  "slowly": "slow-li",
  "again": "e-gen",
  "sorry": "so-ri",
  "excuse": "eks-kyus",
  "order": "or-der",
  "food": "fud",
  "drink": "dringk",
  "sugar": "syu-ger",
  "less": "les",
  "ice": "ays",
  "iced": "ayst",
  "hot": "hot",
  "bill": "bil",
  "check": "cek",
  "bathroom": "bat-rum",
  "restroom": "rest-rum",
  "toilet": "toy-let",
  "station": "stey-syen",
  "airport": "er-port",
  "hotel": "ho-tel",
  "room": "rum",
  "key": "ki",
  "bag": "beg",
  "time": "taym",
  "today": "tu-dey",
  "tomorrow": "tu-mo-ro",
  "yesterday": "yes-ter-dey",
  "work": "werk",
  "job": "job",
  "friend": "frend",
  "family": "fe-mi-li",
  "happy": "he-pi",
  "tired": "tay-erd",
  "hungry": "hang-gri",
  "thirsty": "ters-ti",
  "delicious": "di-li-syas",
  "great": "greyt",
  "awesome": "o-sem",
  "bye": "bay",
  "see": "sii",
  "later": "ley-ter"
};

export function getPhoneticGuide(sentence) {
  if (!sentence) return '';
  const words = sentence.toLowerCase().replace(/[^a-z0-9\s'-]/g, '').split(/\s+/);
  
  const guide = words.map(w => {
    if (PHONETIC_MAP[w]) return PHONETIC_MAP[w];
    // Simple heuristic for other common patterns
    let p = w;
    p = p.replace(/th/g, 't')
         .replace(/ea/g, 'i')
         .replace(/ee/g, 'i')
         .replace(/oo/g, 'u')
         .replace(/sh/g, 'sy')
         .replace(/ch/g, 'c')
         .replace(/ph/g, 'f')
         .replace(/tion/g, 'syen')
         .replace(/sion/g, 'syen')
         .replace(/ght/g, 't')
         .replace(/ow/g, 'au');
    return p;
  });

  return guide.join(' ');
}

/**
 * Calculate similarity between spoken text and target text
 */
export function calculateSimilarity(spoken, target) {
  if (!spoken || !target) return 0;
  
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);

  if (cleanTarget.length === 0) return 0;

  let matched = 0;
  cleanTarget.forEach(word => {
    if (cleanSpoken.includes(word)) {
      matched++;
    }
  });

  const percentage = Math.round((matched / cleanTarget.length) * 100);
  return Math.min(100, Math.max(0, percentage));
}
