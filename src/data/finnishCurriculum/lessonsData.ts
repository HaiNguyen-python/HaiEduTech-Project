// YKI A2 Finnish Lessons Data — Grammar & speaking strategies with expanded quizzes
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
            explanation: "Ilmaisee olemista paikan sisällä. Lisää -ssa (takavokaalit) tai -ssä (etuvokaalit) vartaloon.",
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
            explanation: "Ilmaisee liikettä ulos paikasta tai paikan sisältä.",
            explanationEn: "Expresses movement out of or from inside a place.",
            examples: [
              { finnish: "Tulen kaupasta.", english: "I come from the store." },
              { finnish: "Hän on kotoisin Turusta.", english: "He/she is from Turku." },
              { finnish: "Otan kirjan laukusta.", english: "I take the book from the bag." },
            ],
          },
          {
            title: "Illative (-Vn/-seen)",
            titleEn: "Illative case (-Vn/-seen)",
            explanation: "Ilmaisee liikettä paikan sisään. Pääte riippuu sanan loppuvokaalista.",
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
            instruction: "Täytä lause oikealla sijamuodolla.",
            instructionEn: "Complete the sentence with the correct case ending.",
            items: [
              { question: "Asun Tamperee___.", answer: "lla", hint: "Ulkopaikallissija (Tampere)" },
              { question: "Tulen koulu___.", answer: "sta", hint: "Tulen sisältä → elatiivi" },
              { question: "Menen kauppa___.", answer: "an", hint: "Menen sisään → illatiivi" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä sija ilmaisee 'sisältä pois'?", options: ["Inessiivi", "Elatiivi", "Illatiivi", "Adessiivi"], answer: 1, explanation: "Elatiivi (-sta/-stä) ilmaisee liikettä paikasta pois." },
          { question: "'Olen koulussa' — mikä sija on 'koulussa'?", options: ["Illatiivi", "Inessiivi", "Elatiivi", "Partitiivi"], answer: 1, explanation: "'koulussa' on inessiivissä (-ssa), eli 'koulussa/school at'." },
          { question: "'Menen kauppaan' — mikä sija on 'kauppaan'?", options: ["Inessiivi", "Elatiivi", "Illatiivi", "Adessiivi"], answer: 2, explanation: "'kauppaan' on illatiivissa (-an), eli 'into the store'." },
          { question: "Mikä pääte on inessiivissä (takavokaali)?", options: ["-ssa", "-ssä", "-sta", "-seen"], answer: 0, explanation: "Inessiivi takavokaalilla = -ssa." },
          { question: "'Tulen Turusta' — mikä sija?", options: ["Illatiivi", "Inessiivi", "Elatiivi", "Ablatiivi"], answer: 2, explanation: "'Turusta' on elatiivissa — tulen Turusta (from Turku)." },
          { question: "Miten sanot 'in Helsinki'?", options: ["Helsinkiin", "Helsingissä", "Helsingistä", "Helsinkillä"], answer: 1, explanation: "'Helsingissä' = in Helsinki (inessiivi)." },
          { question: "'Muutin Helsinkiin' — mikä muoto?", options: ["Inessiivi", "Elatiivi", "Illatiivi", "Essiivi"], answer: 2, explanation: "'Helsinkiin' on illatiivi — muutin Helsinkiin (moved to Helsinki)." },
        ],
      },
      {
        id: "yki-grammar-cases-2",
        title: "Ulkopaikallissijat",
        titleEn: "Outer Local Cases (adessive, ablative, allative)",
        icon: "🌍",
        level: "A2",
        theory: `### Ulkopaikallissijat (Outer Local Cases)

Outer local cases express being **on** a surface or **at** a place:

| Case | Suffix | Meaning | Example |
|------|--------|---------|---------|
| **Adessive** | -lla/-llä | on, at | pöydä**llä** (on the table) |
| **Ablative** | -lta/-ltä | from (surface) | pöydä**ltä** (from the table) |
| **Allative** | -lle | onto, to | pöydä**lle** (onto the table) |

Some cities use outer cases: Tampere**lla**, Tampere**lta**, Tampere**lle**.`,
        theoryEn: `### Outer Local Cases (Ulkopaikallissijat)

Outer local cases express being **on** a surface or **at** a place:

| Case | Suffix | Meaning | Example |
|------|--------|---------|---------|
| **Adessive** | -lla/-llä | on, at | pöydä**llä** (on the table) |
| **Ablative** | -lta/-ltä | from (surface) | pöydä**ltä** (from the table) |
| **Allative** | -lle | onto, to | pöydä**lle** (onto the table) |`,
        grammar: [
          {
            title: "Adessiivi (-lla/-llä)",
            titleEn: "Adessive case (-lla/-llä)",
            explanation: "Ilmaisee olemista pinnalla tai luona.",
            explanationEn: "Expresses being on a surface or at a place.",
            examples: [
              { finnish: "Kirja on pöydällä.", english: "The book is on the table." },
              { finnish: "Asun Tampereella.", english: "I live in Tampere." },
              { finnish: "Minulla on auto.", english: "I have a car. (lit. on me is a car)" },
            ],
          },
          {
            title: "Ablatiivi (-lta/-ltä)",
            titleEn: "Ablative case (-lta/-ltä)",
            explanation: "Ilmaisee liikettä pinnalta pois.",
            explanationEn: "Expresses movement from a surface.",
            examples: [
              { finnish: "Otan kirjan pöydältä.", english: "I take the book from the table." },
              { finnish: "Tulen Tampereelta.", english: "I come from Tampere." },
            ],
          },
          {
            title: "Allatiivi (-lle)",
            titleEn: "Allative case (-lle)",
            explanation: "Ilmaisee liikettä pinnalle tai luokse.",
            explanationEn: "Expresses movement onto a surface or towards.",
            examples: [
              { finnish: "Laitan kirjan pöydälle.", english: "I put the book on the table." },
              { finnish: "Menen Tampereelle.", english: "I go to Tampere." },
            ],
          },
        ],
        quiz: [
          { question: "'Kirja on pöydällä' — mikä sija?", options: ["Adessiivi", "Inessiivi", "Allatiivi", "Ablatiivi"], answer: 0, explanation: "'pöydällä' on adessiivissa (-llä) = on the table." },
          { question: "Miten sanot 'from the table'?", options: ["pöydällä", "pöydälle", "pöydältä", "pöydässä"], answer: 2, explanation: "'pöydältä' = from the table (ablatiivi)." },
          { question: "'Minulla on auto' — mikä sija on 'minulla'?", options: ["Allatiivi", "Ablatiivi", "Adessiivi", "Inessiivi"], answer: 2, explanation: "'Minulla' on adessiivissa — omistusrakenne." },
          { question: "Mihin menet? 'Menen Tampere___'", options: ["-lla", "-lta", "-lle", "-ssa"], answer: 2, explanation: "'Tampereelle' = to Tampere (allatiivi)." },
          { question: "'Tulen Tampereelta' — mikä sija?", options: ["Allatiivi", "Adessiivi", "Ablatiivi", "Elatiivi"], answer: 2, explanation: "'Tampereelta' on ablatiivissa." },
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
| kk → k | takki → ta**k**issa | (in the coat) |
| pp → p | kauppa → kau**p**assa | (in the store) |
| tt → t | matto → ma**t**olla | (on the mat) |
| k → ∅ | puku → pu**u**ssa | (in the suit) |
| p → v | tupa → tu**v**assa | (in the cottage) |
| t → d | katu → ka**d**ulla | (on the street) |

**Rule**: When a closed syllable is formed, gradation happens.`,
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
          { question: "Mitä tapahtuu 'kk':lle astevaihtelussa?", options: ["kk → g", "kk → k", "kk → ∅", "kk → kk"], answer: 1, explanation: "Geminaatta kk heikentyy muotoon k." },
          { question: "'kauppa' → 'kaupassa' — mikä muutos?", options: ["pp → p", "pp → v", "pp → bb", "Ei muutosta"], answer: 0, explanation: "'kauppa' → 'kaupassa': pp heikentyy muotoon p." },
          { question: "'katu' → 'kadulla' — mikä muutos?", options: ["t → d", "t → tt", "k → ∅", "t → s"], answer: 0, explanation: "'katu' → 'kadulla': t heikentyy muotoon d." },
          { question: "'puku' → 'puussa' — mikä muutos?", options: ["k → kk", "k → g", "k → ∅", "p → v"], answer: 2, explanation: "'puku' → 'puussa': k katoaa kokonaan (k → ∅)." },
          { question: "'tupa' → 'tuvassa' — mikä muutos?", options: ["t → d", "p → v", "p → b", "pp → p"], answer: 1, explanation: "'tupa' → 'tuvassa': p heikentyy muotoon v." },
          { question: "Milloin astevaihtelu tapahtuu?", options: ["Aina", "Kun muodostuu suljettu tavu", "Vain verbeissä", "Vain substantiiveissa"], answer: 1, explanation: "Astevaihtelu tapahtuu kun muodostuu suljettu tavu." },
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
          { question: "Mikä on 'minä puhun' imperfektissä?", options: ["minä puhuin", "minä puhusin", "minä puhuen", "minä puhuisin"], answer: 0, explanation: "'Puhun' → 'Puhuin': vartalo + i + n." },
          { question: "Mikä on 'hän syö' imperfektissä?", options: ["hän söi", "hän syöi", "hän syödi", "hän syön"], answer: 0, explanation: "'Syö' → 'söi': y → ö vokaalinmuutos + i." },
          { question: "Miten muodostetaan imperfekti?", options: ["vartalo + -i- + pääte", "vartalo + -si- + pääte", "vartalo + -in", "vartalo + -nut"], answer: 0, explanation: "Imperfekti: vartalo + -i- + persoonapääte." },
          { question: "Mikä on 'me menemme' imperfektissä?", options: ["me menimme", "me meniimme", "me mennimme", "me menemme"], answer: 0, explanation: "'Menemme' → 'menimme'." },
          { question: "'Söin aamupalaa' — mikä aika?", options: ["Preesens", "Imperfekti", "Perfekti", "Konditionaali"], answer: 1, explanation: "'Söin' on imperfektimuoto (simple past)." },
          { question: "Mikä on 'he tulevat' imperfektissä?", options: ["he tulivat", "he tullivat", "he tulevat", "he tuleivat"], answer: 0, explanation: "'Tulevat' → 'tulivat'." },
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
            situation: "Paketin lähettäminen postissa",
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
          { question: "Miten kysyt 'How long does it take?' suomeksi?", options: ["Kuinka paljon se maksaa?", "Kuinka kauan se kestää?", "Missä se on?", "Milloin se tulee?"], answer: 1, explanation: "'Kuinka kauan se kestää?' = How long does it take?" },
          { question: "Mitä tarkoittaa 'lähettää'?", options: ["To receive", "To send", "To buy", "To open"], answer: 1, explanation: "'Lähettää' = to send." },
          { question: "Mitä tarvitset kirjeen lähettämiseen?", options: ["Avaimen", "Postimerkin", "Lipun", "Kartan"], answer: 1, explanation: "Tarvitset postimerkin (stamp)." },
          { question: "'Haluaisin lähettää paketin' — mikä muoto on 'haluaisin'?", options: ["Preesens", "Imperfekti", "Konditionaali", "Imperatiivi"], answer: 2, explanation: "'Haluaisin' on konditionaalimuoto (I would like)." },
          { question: "Kuinka paljon paketti maksaa esimerkissä?", options: ["10 euroa", "15 euroa", "20 euroa", "5 euroa"], answer: 1, explanation: "Paketti maksaa 15 euroa." },
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
            situation: "Käynti lääkärissä flunssaoireilla",
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
          { question: "Miten lääkäri kysyy 'What's the problem?'", options: ["Mitä kuuluu?", "Mitä vaivaa?", "Mitä maksaa?", "Mitä etsit?"], answer: 1, explanation: "'Mitä vaivaa?' on vakiotapa kysyä vaivasta." },
          { question: "Mitä tarkoittaa 'oireet'?", options: ["Medicine", "Symptoms", "Pain", "Fever"], answer: 1, explanation: "'Oireet' = symptoms." },
          { question: "Mitä lääkäri kirjoittaa?", options: ["Kirjeen", "Reseptin", "Lomakkeen", "Laskun"], answer: 1, explanation: "Lääkäri kirjoittaa reseptin (prescription)." },
          { question: "'Minulla on kuumetta' — mitä sinulla on?", options: ["Päänsärky", "Kuume", "Yskä", "Allergia"], answer: 1, explanation: "'Kuumetta' = fever." },
          { question: "Kuinka kauan oireet ovat kestäneet?", options: ["Yhden päivän", "Kaksi päivää", "Kolme päivää", "Viikon"], answer: 2, explanation: "Oireet ovat kestäneet kolme päivää." },
        ],
      },
      {
        id: "yki-speaking-3",
        title: "Työhaastattelussa",
        titleEn: "At a Job Interview",
        icon: "💼",
        level: "A2",
        dialogues: [
          {
            situation: "Työhaastattelu kahvilassa",
            situationEn: "Job interview at a café",
            lines: [
              { speaker: "Haastattelija", finnish: "Kerro itsestäsi.", english: "Tell about yourself." },
              { speaker: "Sinä", finnish: "Nimeni on Maria. Olen 28-vuotias ja opiskelen suomea.", english: "My name is Maria. I am 28 years old and study Finnish." },
              { speaker: "Haastattelija", finnish: "Miksi haet tätä työtä?", english: "Why are you applying for this job?" },
              { speaker: "Sinä", finnish: "Pidän asiakaspalvelusta ja haluan oppia lisää.", english: "I like customer service and want to learn more." },
              { speaker: "Haastattelija", finnish: "Milloin voit aloittaa?", english: "When can you start?" },
              { speaker: "Sinä", finnish: "Voin aloittaa ensi viikolla.", english: "I can start next week." },
            ],
          },
        ],
        quiz: [
          { question: "'Kerro itsestäsi' — mitä sinun pitää tehdä?", options: ["Kysy kysymys", "Kerro itsestäsi", "Kirjoita viesti", "Lue teksti"], answer: 1, explanation: "'Kerro itsestäsi' = Tell about yourself." },
          { question: "Miksi Maria hakee työtä?", options: ["Hän tarvitsee rahaa", "Hän pitää asiakaspalvelusta", "Hän on opiskelija", "Hän asuu lähellä"], answer: 1, explanation: "Maria pitää asiakaspalvelusta ja haluaa oppia lisää." },
          { question: "'Milloin voit aloittaa?' — mitä kysytään?", options: ["Palkkaa", "Aloitusaikaa", "Kokemusta", "Koulutusta"], answer: 1, explanation: "'Milloin voit aloittaa?' kysyy aloitusaikaa." },
          { question: "Mikä on 'asiakaspalvelu'?", options: ["Customer service", "Sales", "Marketing", "Management"], answer: 0, explanation: "'Asiakaspalvelu' = customer service." },
          { question: "Milloin Maria voi aloittaa?", options: ["Heti", "Ensi viikolla", "Ensi kuussa", "Kesällä"], answer: 1, explanation: "Maria voi aloittaa ensi viikolla." },
        ],
      },
    ],
  },
];
