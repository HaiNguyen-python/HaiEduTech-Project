// YKI A2 Finnish Lessons Data — Grammar & speaking strategies
import type { FinnishModule } from "./types";

export const finnishLessonModules: FinnishModule[] = [
  {
    id: "yki-grammar-cases",
    title: "Paikalliset sijat",
    titleEn: "Local Cases (Missä, Mistä, Mihin)",
    icon: "📍",
    color: "from-blue-600 to-cyan-500",
    description: "Master Finnish local cases — the key to expressing location and direction.",
    descriptionEn: "Master Finnish local cases — the key to expressing location and direction.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-grammar-cases-1",
        title: "Sisäpaikallissijat",
        titleEn: "Inner Local Cases (inessive, elative, illative)",
        icon: "🏠",
        level: "A2",
        theory: `### Sisäpaikallissijat (Inner Local Cases)

Finnish uses cases instead of prepositions to express location. The inner local cases describe being **inside** something:

| Case | Suffix | Meaning | Example |
|------|--------|---------|---------|
| **Inessive** | -ssa/-ssä | in, inside | talo**ssa** (in the house) |
| **Elative** | -sta/-stä | from (inside) | talo**sta** (from the house) |
| **Illative** | -Vn/-seen/-hin | into | talo**on** (into the house) |

The vowel harmony rule applies: back vowels (a, o, u) → -ssa/-sta, front vowels (ä, ö, y) → -ssä/-stä.`,
        theoryEn: `### Inner Local Cases (Sisäpaikallissijat)

Finnish uses cases instead of prepositions to express location. The inner local cases describe being **inside** something:

| Case | Suffix | Meaning | Example |
|------|--------|---------|---------|
| **Inessive** | -ssa/-ssä | in, inside | talo**ssa** (in the house) |
| **Elative** | -sta/-stä | from (inside) | talo**sta** (from the house) |
| **Illative** | -Vn/-seen/-hin | into | talo**on** (into the house) |

Vowel harmony: back vowels (a, o, u) use -ssa/-sta; front vowels (ä, ö, y) use -ssä/-stä.`,
        grammar: [
          {
            title: "Inessive (-ssa/-ssä)",
            titleEn: "Inessive case (-ssa/-ssä)",
            explanation: "Expresses being inside a place. Add -ssa (back vowels) or -ssä (front vowels) to the stem.",
            explanationEn: "Expresses being inside a place. Add -ssa (back vowels) or -ssä (front vowels) to the stem.",
            examples: [
              { finnish: "Asun Helsingissä.", english: "I live in Helsinki." },
              { finnish: "Kirja on laukussa.", english: "The book is in the bag." },
              { finnish: "Olen koulussa.", english: "I am at school." },
            ],
          },
          {
            title: "Elative (-sta/-stä)",
            titleEn: "Elative case (-sta/-stä)",
            explanation: "Expresses movement out of or from inside a place.",
            explanationEn: "Expresses movement out of or from inside a place.",
            examples: [
              { finnish: "Tulen kaupasta.", english: "I come from the store." },
              { finnish: "Hän on kotoisin Turusta.", english: "He/she is from Turku." },
            ],
          },
          {
            title: "Illative (-Vn/-seen)",
            titleEn: "Illative case (-Vn/-seen)",
            explanation: "Expresses movement into a place. The suffix depends on the final vowel of the word.",
            explanationEn: "Expresses movement into a place. The suffix depends on the final vowel of the word.",
            examples: [
              { finnish: "Menen kauppaan.", english: "I go to the store." },
              { finnish: "Tuletko kouluun?", english: "Are you coming to school?" },
              { finnish: "Muutin Helsinkiin.", english: "I moved to Helsinki." },
            ],
          },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Complete the sentence with the correct case ending.",
            instructionEn: "Complete the sentence with the correct case ending.",
            items: [
              { question: "Asun Tamperee___.", answer: "lla", hint: "Outer local case for cities like Tampere" },
              { question: "Tulen koulu___.", answer: "sta", hint: "Coming from inside → elative" },
              { question: "Menen kauppa___.", answer: "an", hint: "Going into → illative" },
            ],
          },
        ],
        quiz: [
          { question: "Which case expresses 'from inside'?", options: ["Inessive", "Elative", "Illative", "Adessive"], answer: 1, explanation: "Elative (-sta/-stä) expresses movement from inside a place." },
          { question: "'Olen koulussa' — What case is 'koulussa'?", options: ["Illative", "Inessive", "Elative", "Partitive"], answer: 1, explanation: "'koulussa' uses the inessive case (-ssa), meaning 'in/at school'." },
        ],
      },
    ],
  },
  {
    id: "yki-grammar-kpt",
    title: "Astevaihtelu (KPT)",
    titleEn: "Consonant Gradation (KPT)",
    icon: "🔄",
    color: "from-violet-500 to-purple-600",
    description: "Understanding the critical consonant gradation pattern in Finnish verb and noun inflection.",
    descriptionEn: "Understanding the critical consonant gradation pattern in Finnish verb and noun inflection.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-grammar-kpt-1",
        title: "KPT-vaihtelun perussäännöt",
        titleEn: "Basic KPT Gradation Rules",
        icon: "📐",
        level: "A2",
        theory: `### Astevaihtelu (Consonant Gradation)

Consonant gradation is a sound change that occurs when adding suffixes. The consonants **K**, **P**, and **T** may weaken (strong → weak) or stay the same.

| Strong | Weak | Example |
|--------|------|---------|
| kk → k | takkki → ta**k**issa | (in the coat) |
| pp → p | kauppa → kau**p**assa | (in the store) |
| tt → t | matto → ma**t**olla | (on the mat) |
| k → ∅ | puku → pu**u**ssa | (in the suit) |
| p → v | tupa → tu**v**assa | (in the cottage) |
| t → d | katu → ka**d**ulla | (on the street) |

**Rule**: When a closed syllable is formed (by adding a suffix starting with a consonant or making the syllable closed), gradation happens.`,
        theoryEn: `### Consonant Gradation (Astevaihtelu)

Consonant gradation is a sound change that occurs when adding suffixes. The consonants **K**, **P**, and **T** may weaken (strong → weak) or stay the same.

| Strong | Weak | Example |
|--------|------|---------|
| kk → k | takki → ta**k**issa | (in the coat) |
| pp → p | kauppa → kau**p**assa | (in the store) |
| tt → t | matto → ma**t**olla | (on the mat) |
| k → ∅ | puku → pu**u**ssa | (in the suit) |
| p → v | tupa → tu**v**assa | (in the cottage) |
| t → d | katu → ka**d**ulla | (on the street) |`,
        quiz: [
          { question: "What happens to 'kk' in consonant gradation?", options: ["kk → g", "kk → k", "kk → ∅", "kk → kk"], answer: 1, explanation: "Double k (kk) weakens to single k (k) in consonant gradation." },
          { question: "'kauppa' → 'kaupassa' — what gradation occurred?", options: ["pp → p", "pp → v", "pp → bb", "No change"], answer: 0, explanation: "'kauppa' → 'kaupassa': pp weakens to p." },
        ],
      },
    ],
  },
  {
    id: "yki-grammar-past",
    title: "Imperfekti",
    titleEn: "Past Tenses",
    icon: "⏪",
    color: "from-amber-500 to-yellow-600",
    description: "Learn to talk about past events using the Finnish imperfect tense.",
    descriptionEn: "Learn to talk about past events using the Finnish imperfect tense.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-grammar-past-1",
        title: "Imperfektin muodostaminen",
        titleEn: "Forming the Imperfect",
        icon: "📖",
        level: "A2",
        theory: `### Imperfekti (Simple Past)

The imperfect is used to talk about completed actions in the past.

**Formation**: verb stem + **-i-** + personal ending

| Person | puhua (to speak) | syödä (to eat) |
|--------|-----------------|----------------|
| minä | puhu**in** | sö**in** |
| sinä | puhu**it** | sö**it** |
| hän | puhu**i** | sö**i** |
| me | puhu**imme** | sö**imme** |
| te | puhu**itte** | sö**itte** |
| he | puhu**ivat** | sö**ivät** |

**Note**: Vowel changes may occur: a/ä → ∅ before -i-, e → ∅, and consonant gradation applies.`,
        theoryEn: `### Imperfect Tense (Imperfekti)

The imperfect is used to talk about completed actions in the past.

**Formation**: verb stem + **-i-** + personal ending

| Person | puhua (to speak) | syödä (to eat) |
|--------|-----------------|----------------|
| minä | puhu**in** | sö**in** |
| sinä | puhu**it** | sö**it** |
| hän | puhu**i** | sö**i** |
| me | puhu**imme** | sö**imme** |
| te | puhu**itte** | sö**itte** |
| he | puhu**ivat** | sö**ivät** |`,
        quiz: [
          { question: "What is the past tense of 'minä puhun'?", options: ["minä puhuin", "minä puhusin", "minä puhuen", "minä puhuisin"], answer: 0, explanation: "'Puhun' (I speak) → 'Puhuin' (I spoke): stem + i + n." },
        ],
      },
    ],
  },
  {
    id: "yki-speaking-strategies",
    title: "Puhuminen — Strategiat",
    titleEn: "Speaking — Strategies",
    icon: "🗣️",
    color: "from-teal-500 to-emerald-600",
    description: "Practical speaking strategies for real YKI situations: post office, doctor, job interview.",
    descriptionEn: "Practical speaking strategies for real YKI situations: post office, doctor, job interview.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-speaking-1",
        title: "Postissa ja virastossa",
        titleEn: "At the Post Office & Office",
        icon: "📮",
        level: "A2",
        dialogues: [
          {
            situation: "Sending a package at the post office",
            situationEn: "Sending a package at the post office",
            lines: [
              { speaker: "Virkailija", finnish: "Hyvää päivää! Miten voin auttaa?", english: "Good day! How can I help?" },
              { speaker: "Sinä", finnish: "Haluaisin lähettää tämän paketin Saksaan.", english: "I would like to send this package to Germany." },
              { speaker: "Virkailija", finnish: "Laittakaa paketti tähän vaa'alle.", english: "Put the package on this scale." },
              { speaker: "Sinä", finnish: "Kuinka kauan se kestää?", english: "How long does it take?" },
              { speaker: "Virkailija", finnish: "Noin viikko. Se maksaa 15 euroa.", english: "About a week. It costs 15 euros." },
            ],
          },
        ],
        vocabulary: [
          { word: "lähettää", partOfSpeech: "verb", meaningEn: "to send", meaningVi: "gửi", example: "Haluaisin lähettää kirjeen.", exampleEn: "I would like to send a letter.", category: "Speaking" },
          { word: "paketti", partOfSpeech: "noun", meaningEn: "package", meaningVi: "bưu kiện", example: "Paketti on valmis.", exampleEn: "The package is ready.", category: "Speaking" },
          { word: "postimerkki", partOfSpeech: "noun", meaningEn: "stamp", meaningVi: "tem", example: "Tarvitsen postimerkin.", exampleEn: "I need a stamp.", category: "Speaking" },
        ],
        quiz: [
          { question: "How would you ask 'How long does it take?' in Finnish?", options: ["Kuinka paljon se maksaa?", "Kuinka kauan se kestää?", "Missä se on?", "Milloin se tulee?"], answer: 1, explanation: "'Kuinka kauan se kestää?' = How long does it take?" },
        ],
      },
      {
        id: "yki-speaking-2",
        title: "Lääkärin vastaanotolla",
        titleEn: "At the Doctor's Office",
        icon: "🏥",
        level: "A2",
        dialogues: [
          {
            situation: "Visiting the doctor for flu symptoms",
            situationEn: "Visiting the doctor for flu symptoms",
            lines: [
              { speaker: "Lääkäri", finnish: "Mitä vaivaa?", english: "What seems to be the problem?" },
              { speaker: "Sinä", finnish: "Minulla on kuumetta ja yskää.", english: "I have a fever and a cough." },
              { speaker: "Lääkäri", finnish: "Kuinka kauan oireet ovat jatkuneet?", english: "How long have the symptoms lasted?" },
              { speaker: "Sinä", finnish: "Kolme päivää.", english: "Three days." },
              { speaker: "Lääkäri", finnish: "Kirjoitan teille reseptin.", english: "I'll write you a prescription." },
            ],
          },
        ],
        quiz: [
          { question: "How does the doctor ask 'What's the problem?'", options: ["Mitä kuuluu?", "Mitä vaivaa?", "Mitä maksaa?", "Mitä etsit?"], answer: 1, explanation: "'Mitä vaivaa?' is the standard way a doctor asks about your complaint." },
        ],
      },
    ],
  },
];
