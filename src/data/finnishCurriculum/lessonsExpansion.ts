/**
 * @file lessonsExpansion.ts
 * @description Grammar lesson expansion — Verb Types, Past Tense, Conditionals, Object Cases.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { FinnishModule } from "./types";

export const finnishLessonExpansionModules: FinnishModule[] = [
  // ===== VERB TYPES 1-6 =====
  {
    id: "yki-lesson-verbtypes",
    title: "Verbityypit 1–6",
    titleEn: "Verb Types 1–6",
    icon: "🔤",
    color: "from-teal-500 to-cyan-600",
    description: "Suomen kielen kuusi verbityyppiä ja niiden taivutus.",
    descriptionEn: "The six Finnish verb types and their conjugation patterns.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-lesson-vt-1-3",
        title: "Verbityypit 1–3",
        titleEn: "Verb Types 1–3",
        icon: "1️⃣",
        level: "A2",
        theory: `# Verbityypit 1–3

## Tyyppi 1: -a / -ä (e.g. puhua, lukea)
- Minä-muoto: poista -a/-ä, lisää -n → **puhun**, **luen**
- Hän: pitkä vokaali → **puhuu**, **lukee**

## Tyyppi 2: -da / -dä (e.g. syödä, juoda)
- Poista -da/-dä → **syön**, **juon**
- Hän: sama kuin vartalo + pitkä → **syö**, **juo**

## Tyyppi 3: -la/-lä, -na/-nä, -ra/-rä, -sta/-stä (e.g. tulla, mennä, purra, nousta)
- Poista viimeinen konsonantti + a/ä, lisää -en → **tulen**, **menen**
- Hän: -ee → **tulee**, **menee**`,
        theoryEn: `# Verb Types 1–3

## Type 1: -a / -ä (e.g. puhua, lukea)
- Minä form: remove -a/-ä, add -n → **puhun**, **luen**
- Hän: long vowel → **puhuu**, **lukee**

## Type 2: -da / -dä (e.g. syödä, juoda)
- Remove -da/-dä → **syön**, **juon**
- Hän: same stem + long → **syö**, **juo**

## Type 3: -la/-lä, -na/-nä, -ra/-rä, -sta/-stä (e.g. tulla, mennä)
- Remove last consonant + a/ä, add -en → **tulen**, **menen**
- Hän: -ee → **tulee**, **menee**`,
        grammar: [
          {
            title: "Tyyppi 1 esimerkki", titleEn: "Type 1 Example",
            explanation: "puhua → puhun, puhut, puhuu, puhumme, puhutte, puhuvat",
            explanationEn: "puhua → I speak, you speak, he/she speaks, we speak, you(pl) speak, they speak",
            examples: [
              { finnish: "Minä puhun suomea.", english: "I speak Finnish." },
              { finnish: "Hän puhuu englantia.", english: "He/she speaks English." },
            ],
          },
          {
            title: "Tyyppi 2 esimerkki", titleEn: "Type 2 Example",
            explanation: "syödä → syön, syöt, syö, syömme, syötte, syövät",
            explanationEn: "syödä → I eat, you eat, he/she eats, we eat, you(pl) eat, they eat",
            examples: [
              { finnish: "Minä syön lounaalla.", english: "I eat at lunch." },
              { finnish: "He syövät illallista.", english: "They eat dinner." },
            ],
          },
          {
            title: "Tyyppi 3 esimerkki", titleEn: "Type 3 Example",
            explanation: "tulla → tulen, tulet, tulee, tulemme, tulette, tulevat",
            explanationEn: "tulla → I come, you come, he/she comes, we come, you(pl) come, they come",
            examples: [
              { finnish: "Tulen huomenna.", english: "I'll come tomorrow." },
              { finnish: "Hän tulee kotiin.", english: "He/she comes home." },
            ],
          },
        ],
        quiz: [
          { question: "'Puhua' on verbityyppi?", options: ["1", "2", "3", "4"], answer: 0, explanation: "Puhua ends in -a → Type 1." },
          { question: "'Syödä' on verbityyppi?", options: ["1", "2", "3", "4"], answer: 1, explanation: "Syödä ends in -dä → Type 2." },
          { question: "'Tulla' on verbityyppi?", options: ["1", "2", "3", "4"], answer: 2, explanation: "Tulla ends in -lla → Type 3." },
          { question: "Minä-muoto: puhua →?", options: ["puhun", "puhuu", "puhuvat", "puhutte"], answer: 0, explanation: "Puhun = I speak." },
          { question: "Hän-muoto: syödä →?", options: ["syön", "syöt", "syö", "syövät"], answer: 2, explanation: "Hän syö." },
          { question: "Hän-muoto: tulla →?", options: ["tulen", "tulet", "tulee", "tulette"], answer: 2, explanation: "Hän tulee." },
          { question: "'Lukea' on verbityyppi?", options: ["1", "2", "3", "5"], answer: 0, explanation: "Lukea ends in -a → Type 1." },
          { question: "'Mennä' on verbityyppi?", options: ["1", "2", "3", "4"], answer: 2, explanation: "Mennä ends in -nä → Type 3." },
        ],
      },
      {
        id: "yki-lesson-vt-4-6",
        title: "Verbityypit 4–6",
        titleEn: "Verb Types 4–6",
        icon: "4️⃣",
        level: "A2",
        theory: `# Verbityypit 4–6

## Tyyppi 4: -ta / -tä (e.g. haluta, pelätä)
- Poista -ta/-tä, lisää -an/-än → **haluan**, **pelkään**
- Hän: -aa/-ää → **haluaa**, **pelkää**

## Tyyppi 5: -ita / -itä (e.g. tarvita, häiritä)
- Poista -ta/-tä, lisää -tsen → **tarvitsen**
- Hän: -tsee → **tarvitsee**

## Tyyppi 6: -eta / -etä (e.g. vanheta, pienetä)
- Poista -ta/-tä, lisää -nen → **vanhenen**
- Hän: -nee → **vanhenee**`,
        theoryEn: `# Verb Types 4–6

## Type 4: -ta / -tä (e.g. haluta, pelätä)
- Remove -ta/-tä, add -an/-än → **haluan**, **pelkään**
- Hän: -aa/-ää → **haluaa**, **pelkää**

## Type 5: -ita / -itä (e.g. tarvita, häiritä)
- Remove -ta/-tä, add -tsen → **tarvitsen**
- Hän: -tsee → **tarvitsee**

## Type 6: -eta / -etä (e.g. vanheta, pienetä)
- Remove -ta/-tä, add -nen → **vanhenen**
- Hän: -nee → **vanhenee**`,
        grammar: [
          {
            title: "Tyyppi 4", titleEn: "Type 4",
            explanation: "haluta → haluan, haluat, haluaa, haluamme, haluatte, haluavat",
            explanationEn: "haluta → I want, you want, he/she wants...",
            examples: [
              { finnish: "Haluan kahvia.", english: "I want coffee." },
              { finnish: "Hän haluaa lähteä.", english: "He/she wants to leave." },
            ],
          },
          {
            title: "Tyyppi 5", titleEn: "Type 5",
            explanation: "tarvita → tarvitsen, tarvitset, tarvitsee...",
            explanationEn: "tarvita → I need, you need, he/she needs...",
            examples: [
              { finnish: "Tarvitsen apua.", english: "I need help." },
              { finnish: "Hän tarvitsee rahaa.", english: "He/she needs money." },
            ],
          },
        ],
        quiz: [
          { question: "'Haluta' on verbityyppi?", options: ["3", "4", "5", "6"], answer: 1, explanation: "Haluta ends in -ta → Type 4." },
          { question: "'Tarvita' on verbityyppi?", options: ["3", "4", "5", "6"], answer: 2, explanation: "Tarvita ends in -ita → Type 5." },
          { question: "Minä-muoto: haluta →?", options: ["halun", "haluan", "haluaa", "haluavat"], answer: 1, explanation: "Haluan = I want." },
          { question: "Minä-muoto: tarvita →?", options: ["tarvin", "tarvian", "tarvitsen", "tarvitsee"], answer: 2, explanation: "Tarvitsen = I need." },
          { question: "Hän-muoto: haluta →?", options: ["haluan", "haluat", "haluaa", "haluavat"], answer: 2, explanation: "Hän haluaa." },
          { question: "Hän-muoto: tarvita →?", options: ["tarvitsen", "tarvitset", "tarvitsee", "tarvitsevat"], answer: 2, explanation: "Hän tarvitsee." },
          { question: "'Vanheta' on verbityyppi?", options: ["4", "5", "6", "1"], answer: 2, explanation: "Vanheta ends in -eta → Type 6." },
        ],
      },
    ],
  },
  // ===== PAST TENSE (Imperfekti) =====
  {
    id: "yki-lesson-past",
    title: "Imperfekti (Mennyt aika)",
    titleEn: "Past Tense (Imperfekti)",
    icon: "⏮️",
    color: "from-amber-600 to-orange-600",
    description: "Imperfektin muodostus ja käyttö.",
    descriptionEn: "Forming and using the Finnish past tense.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-lesson-past-basic",
        title: "Imperfektin perusteet",
        titleEn: "Past Tense Basics",
        icon: "📜",
        level: "A2",
        theory: `# Imperfekti (Past Tense)

## Pääsääntö: vartaloon + -i + persoonapääte
- puhua → puhu**i**n, puhu**i**t, puhu**i**
- syödä → sö**i**n, sö**i**t, sö**i** (vowel change: yö → ö)
- tulla → tul**i**n, tul**i**t, tul**i**

## Vokaalimuutokset:
- **a/ä + i** → i (puhua → puhuin)
- **e + i** → i (lukea → luin) 
- **o/ö + i** → oi/öi (olla → olin)
- **u/y + i** → ui/yi (asua → asuin)

## Negaatio: ei + partisiipin perusmuoto
- En puhunut (I didn't speak)
- Hän ei syönyt (He/she didn't eat)`,
        theoryEn: `# Imperfekti (Past Tense)

## Main rule: stem + -i + personal ending
- puhua → puhuin, puhuit, puhui
- syödä → söin, söit, söi (vowel change: yö → ö)
- tulla → tulin, tulit, tuli

## Vowel changes:
- **a/ä + i** → i (puhua → puhuin)
- **e + i** → i (lukea → luin)
- **o/ö + i** → oi/öi (olla → olin)
- **u/y + i** → ui/yi (asua → asuin)

## Negation: ei + past participle
- En puhunut (I didn't speak)
- Hän ei syönyt (He/she didn't eat)`,
        grammar: [
          {
            title: "Imperfekti: olla", titleEn: "Past: to be",
            explanation: "olin, olit, oli, olimme, olitte, olivat",
            explanationEn: "I was, you were, he/she was, we were, you(pl) were, they were",
            examples: [
              { finnish: "Olin kotona eilen.", english: "I was at home yesterday." },
              { finnish: "He olivat koulussa.", english: "They were at school." },
            ],
          },
          {
            title: "Negaatio", titleEn: "Negation",
            explanation: "ei + NUT-partisiippi: en puhunut, et puhunut, ei puhunut...",
            explanationEn: "Negation in past: ei + past participle form",
            examples: [
              { finnish: "En käynyt kaupassa.", english: "I didn't go to the shop." },
              { finnish: "Hän ei tullut kotiin.", english: "He/she didn't come home." },
            ],
          },
        ],
        quiz: [
          { question: "Imperfekti: puhua, minä →?", options: ["puhun", "puhuin", "puhunut", "puhui"], answer: 1, explanation: "Puhuin = I spoke." },
          { question: "Imperfekti: olla, hän →?", options: ["on", "oli", "olin", "olivat"], answer: 1, explanation: "Hän oli = He/she was." },
          { question: "Negaatio: 'I didn't eat' →?", options: ["En syönyt", "En syöin", "Ei syö", "En syödä"], answer: 0, explanation: "En syönyt." },
          { question: "Imperfekti: tulla, me →?", options: ["tulemme", "tulimme", "tulivat", "tulin"], answer: 1, explanation: "Tulimme = we came." },
          { question: "Imperfekti: mennä, hän →?", options: ["menee", "meni", "menin", "menivät"], answer: 1, explanation: "Hän meni." },
          { question: "'Olin kotona eilen' englanniksi?", options: ["I am at home", "I was at home yesterday", "I will be at home", "I go home"], answer: 1, explanation: "Olin = I was, eilen = yesterday." },
          { question: "Imperfekti: syödä, minä →?", options: ["söin", "syöin", "syön", "söi"], answer: 0, explanation: "Söin = I ate (yö → ö before i)." },
        ],
      },
    ],
  },
  // ===== CONDITIONAL (Konditionaali) =====
  {
    id: "yki-lesson-conditional",
    title: "Konditionaali",
    titleEn: "Conditional Mood",
    icon: "🤔",
    color: "from-pink-500 to-rose-600",
    description: "Konditionaalin muodostus — kohteliaat pyynnöt ja toiveet.",
    descriptionEn: "Forming the conditional — polite requests and wishes.",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-lesson-cond-basic",
        title: "Konditionaalin perusteet",
        titleEn: "Conditional Basics",
        icon: "💭",
        level: "A2",
        theory: `# Konditionaali

## Muodostus: vartalo + -isi- + persoonapääte
- puhua → puhu**isi**n (I would speak)
- syödä → sö**isi**n (I would eat)
- tulla → tul**isi**n (I would come)

## Käyttö:
1. **Kohteliaat pyynnöt**: Voisitko auttaa? (Could you help?)
2. **Toiveet**: Haluaisin kahvia. (I would like coffee.)
3. **Ehdotukset**: Menisimmekö elokuviin? (Shall we go to the movies?)

## Tärkeät konditionaalimuodot:
- **olla**: olisin, olisit, olisi, olisimme, olisitte, olisivat
- **voida**: voisin, voisit, voisi...
- **haluta**: haluaisin, haluaisit, haluaisi...`,
        theoryEn: `# Conditional Mood

## Formation: stem + -isi- + personal ending
- puhua → puhuisin (I would speak)
- syödä → söisin (I would eat)
- tulla → tulisin (I would come)

## Usage:
1. **Polite requests**: Voisitko auttaa? (Could you help?)
2. **Wishes**: Haluaisin kahvia. (I would like coffee.)
3. **Suggestions**: Menisimmekö elokuviin? (Shall we go to the movies?)

## Important conditional forms:
- **olla**: olisin, olisit, olisi...
- **voida**: voisin, voisit, voisi...
- **haluta**: haluaisin, haluaisit, haluaisi...`,
        grammar: [
          {
            title: "Kohteliaat pyynnöt", titleEn: "Polite Requests",
            explanation: "Voisitko + verbi = Could you + verb",
            explanationEn: "Use conditional for polite requests in everyday Finnish",
            examples: [
              { finnish: "Voisitko auttaa minua?", english: "Could you help me?" },
              { finnish: "Voisitteko puhua hitaammin?", english: "Could you speak more slowly?" },
            ],
          },
          {
            title: "Toiveet ja ehdotukset", titleEn: "Wishes and Suggestions",
            explanation: "Haluaisin / Menisimmekö = I would like / Shall we go",
            explanationEn: "Common patterns for expressing wishes and making suggestions",
            examples: [
              { finnish: "Haluaisin tilata lounaan.", english: "I would like to order lunch." },
              { finnish: "Menisimmekö kahville?", english: "Shall we go for coffee?" },
            ],
          },
        ],
        quiz: [
          { question: "Konditionaali: olla, minä →?", options: ["olen", "olin", "olisin", "olisi"], answer: 2, explanation: "Olisin = I would be." },
          { question: "'Haluaisin kahvia' englanniksi?", options: ["I want coffee", "I would like coffee", "I had coffee", "I need coffee"], answer: 1, explanation: "Haluaisin = I would like." },
          { question: "Konditionaali: voida, sinä →?", options: ["voit", "voisit", "voisin", "voisi"], answer: 1, explanation: "Voisit = you could/would." },
          { question: "'Voisitko auttaa?' tarkoittaa?", options: ["Can you help?", "Could you help?", "Will you help?", "Do you help?"], answer: 1, explanation: "Conditional = polite request." },
          { question: "Konditionaali: mennä, me →?", options: ["menemme", "menisimme", "menimme", "menisivät"], answer: 1, explanation: "Menisimme = we would go." },
          { question: "Konditionaalin tunnus on?", options: ["-i-", "-isi-", "-in-", "-si-"], answer: 1, explanation: "-isi- is the conditional marker." },
          { question: "'Menisimmekö elokuviin?' englanniksi?", options: ["We go to movies", "Shall we go to the movies?", "We went to movies", "Do we go to movies?"], answer: 1, explanation: "Conditional question = suggestion." },
        ],
      },
    ],
  },
  // ===== OBJECT CASES =====
  {
    id: "yki-lesson-objects",
    title: "Objektin sijat",
    titleEn: "Object Cases",
    icon: "🎯",
    color: "from-emerald-500 to-green-600",
    description: "Partitiivi vs akkusatiivi — milloin käytät mitäkin?",
    descriptionEn: "Partitive vs accusative — when to use which?",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-lesson-obj-basic",
        title: "Partitiivi ja akkusatiivi",
        titleEn: "Partitive & Accusative",
        icon: "📊",
        level: "A2",
        theory: `# Objektin sijat

## Partitiivi (-a/-ä, -ta/-tä):
Käytetään kun:
1. **Negaatio**: En osta autoa. (I don't buy a car.)
2. **Keskeneräinen**: Luen kirjaa. (I'm reading a book — still reading.)
3. **Jaollinen**: Juon kahvia. (I drink coffee — some, not all.)

## Akkusatiivi (-n tai perusmuoto):
Käytetään kun:
1. **Valmis/kokonainen**: Luin kirjan. (I read the book — finished.)
2. **Käsky**: Osta auto! (Buy a car!)

## Nyrkkisääntö:
- Partitiivi = ongoing, partial, negative
- Akkusatiivi = completed, whole, command`,
        theoryEn: `# Object Cases

## Partitive (-a/-ä, -ta/-tä):
Used when:
1. **Negation**: En osta autoa. (I don't buy a car.)
2. **Ongoing/Incomplete**: Luen kirjaa. (I'm reading a book — still going.)
3. **Divisible**: Juon kahvia. (I drink coffee — some, not all.)

## Accusative (-n or base form):
Used when:
1. **Complete/Whole**: Luin kirjan. (I read the book — finished it.)
2. **Command**: Osta auto! (Buy a car!)

## Rule of thumb:
- Partitive = ongoing, partial, negative
- Accusative = completed, whole, command`,
        grammar: [
          {
            title: "Partitiivi", titleEn: "Partitive",
            explanation: "Negation, ongoing action, or divisible substance → partitive",
            explanationEn: "Use partitive for negation, ongoing actions, or divisible things",
            examples: [
              { finnish: "Juon kahvia.", english: "I drink (some) coffee." },
              { finnish: "En osta autoa.", english: "I don't buy a car." },
              { finnish: "Luen kirjaa.", english: "I'm reading a book (in progress)." },
            ],
          },
          {
            title: "Akkusatiivi", titleEn: "Accusative",
            explanation: "Completed action or whole object → accusative (-n)",
            explanationEn: "Use accusative for completed actions with a whole object",
            examples: [
              { finnish: "Luin kirjan.", english: "I read the book (finished it)." },
              { finnish: "Ostin auton.", english: "I bought a car." },
            ],
          },
        ],
        quiz: [
          { question: "En osta ___. (auto)", options: ["auto", "auton", "autoa", "autossa"], answer: 2, explanation: "Negation → partitive: autoa." },
          { question: "Luin ___. (kirja, finished)", options: ["kirjaa", "kirjan", "kirja", "kirjassa"], answer: 1, explanation: "Completed → accusative: kirjan." },
          { question: "Juon ___. (kahvi)", options: ["kahvin", "kahvia", "kahvi", "kahvissa"], answer: 1, explanation: "Divisible → partitive: kahvia." },
          { question: "Ostin ___. (auto)", options: ["autoa", "auton", "auto", "autolle"], answer: 1, explanation: "Completed purchase → accusative: auton." },
          { question: "Syön ___. (leipä, eating now)", options: ["leivän", "leipää", "leipä", "leivässä"], answer: 1, explanation: "Ongoing → partitive: leipää." },
          { question: "Partitiivi käytetään kun?", options: ["action is done", "negation/ongoing", "always", "in past"], answer: 1, explanation: "Partitive for negation, ongoing, divisible." },
          { question: "Osta ___! (auto, command)", options: ["autoa", "auton", "auto", "autolla"], answer: 2, explanation: "Command → accusative (base form): auto." },
        ],
      },
    ],
  },
];
