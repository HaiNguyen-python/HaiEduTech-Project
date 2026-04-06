import type { FinnishModule } from "./types";

export const finnishLessonExpansion3Modules: FinnishModule[] = [
  {
    id: "finnish-partitive",
    title: "Partitiivi (Partitive Case)",
    titleEn: "Partitive Case",
    icon: "🔤",
    color: "from-blue-500 to-indigo-500",
    description: "Partitiivisijan peruskäyttö ja erikoistapaukset",
    descriptionEn: "Basic partitive use and special cases",
    pillar: "lessons",
    lessons: [
      {
        id: "partitive-basics",
        title: "Partitiivi — Perusteet",
        titleEn: "Partitive — Basics",
        icon: "📝",
        level: "A2",
        theory: `Partitiivi on yksi suomen kielen tärkeimmistä sijoista. Sitä käytetään erittäin usein.\n\n**Milloin käytetään partitiovia?**\n1. Kieltolauseissa: En osta **autoa**.\n2. Jaottoman aineen kanssa: Juon **kahvia**.\n3. Lukusanan jälkeen: Kolme **kissaa**.\n4. Tunnetilan kanssa: Rakastan **sinua**.`,
        theoryEn: `The partitive is one of the most important cases in Finnish. It is used very frequently.\n\n**When to use partitive?**\n1. In negative sentences: En osta **autoa** (I don't buy a car).\n2. With uncountable things: Juon **kahvia** (I drink coffee).\n3. After numbers: Kolme **kissaa** (three cats).\n4. With feelings: Rakastan **sinua** (I love you).`,
        grammar: [
          {
            title: "Partitiivi yksikkö",
            titleEn: "Partitive singular",
            explanation: "Yksikön partitiivi muodostetaan lisäämällä -a/-ä, -ta/-tä tai -tta/-ttä sanan vartaloon.",
            explanationEn: "Singular partitive is formed by adding -a/-ä, -ta/-tä or -tta/-ttä to the word stem.",
            examples: [
              { finnish: "auto → autoa", english: "car → car (partitive)" },
              { finnish: "kahvi → kahvia", english: "coffee → coffee (partitive)" },
              { finnish: "vesi → vettä", english: "water → water (partitive)" },
              { finnish: "perhe → perhettä", english: "family → family (partitive)" }
            ]
          }
        ],
        vocabulary: [
          { word: "partitiivi", partOfSpeech: "substantiivi", meaningEn: "partitive case", meaningVi: "cách phân từ", example: "Partitiivi on tärkeä.", exampleEn: "The partitive is important.", category: "kielioppi" },
          { word: "kieltolause", partOfSpeech: "substantiivi", meaningEn: "negative sentence", meaningVi: "câu phủ định", example: "Kieltolauseessa käytetään partitiivia.", exampleEn: "The partitive is used in negative sentences.", category: "kielioppi" }
        ],
        quiz: [
          { question: "Mikä on 'auto' partitiivissa?", options: ["autoa", "auton", "autossa", "autolle"], answer: 0, explanation: "auto → autoa (partitiivi yksikkö)" },
          { question: "Milloin käytetään partitiivia?", options: ["Myöntölauseessa aina", "Kieltolauseessa", "Vain monikossa", "Vain verbin kanssa"], answer: 1, explanation: "Kieltolauseessa objekti on aina partitiivissa." },
          { question: "'Juon kahvia' — miksi partitiivi?", options: ["Kieltolause", "Jaoton aine", "Lukusana", "Tunnetila"], answer: 1, explanation: "Kahvi on jaotonta ainetta, siksi partitiivi." }
        ]
      },
      {
        id: "partitive-special",
        title: "Partitiivi — Erikoistapaukset",
        titleEn: "Partitive — Special Cases",
        icon: "⚡",
        level: "A2",
        theory: `Jotkut verbit vaativat aina partitiivia:\n\n**Tunneverbit:** rakastaa, vihata, pelätä, ihmetellä\n- Rakastan **Suomea**.\n- Pelkään **hämähäkkejä**.\n\n**Jatkuvuusverbit:** odottaa, etsiä, auttaa\n- Odotan **bussia**.\n\n**Erikoistapaukset:**\n- Väriä ilmaisevat: punaista, sinistä\n- Kielen nimet: suomea, englantia`,
        theoryEn: `Some verbs always require the partitive:\n\n**Emotion verbs:** rakastaa (love), vihata (hate), pelätä (fear), ihmetellä (wonder)\n- Rakastan **Suomea** (I love Finland).\n- Pelkään **hämähäkkejä** (I fear spiders).\n\n**Continuation verbs:** odottaa (wait), etsiä (search), auttaa (help)\n- Odotan **bussia** (I'm waiting for the bus).\n\n**Special cases:**\n- Colors: punaista, sinistä\n- Language names: suomea, englantia`,
        grammar: [
          {
            title: "Partitiiviverbit",
            titleEn: "Partitive verbs",
            explanation: "Nämä verbit vaativat aina partitiivia objektina.",
            explanationEn: "These verbs always require the partitive as their object.",
            examples: [
              { finnish: "Rakastan sinua.", english: "I love you." },
              { finnish: "Odotan joulua.", english: "I'm waiting for Christmas." },
              { finnish: "Opiskelen suomea.", english: "I study Finnish." }
            ]
          }
        ],
        quiz: [
          { question: "'Opiskelen ___' (suomi)", options: ["suomea", "suomi", "suomessa", "suomelle"], answer: 0, explanation: "Opiskella vaatii partitiivia: suomea." },
          { question: "Mikä verbi vaatii aina partitiivia?", options: ["olla", "mennä", "rakastaa", "tulla"], answer: 2, explanation: "Rakastaa on tunneverbejä, joka vaatii partitiivia." },
          { question: "'Odotan ___' (bussi)", options: ["bussin", "bussia", "bussissa", "bussille"], answer: 1, explanation: "Odottaa + partitiivi: bussia." }
        ]
      }
    ]
  },
  {
    id: "finnish-plural",
    title: "Monikko (Plural Forms)",
    titleEn: "Plural Forms",
    icon: "👥",
    color: "from-green-500 to-teal-500",
    description: "Monikon nominatiivi ja partitiivi",
    descriptionEn: "Nominative and partitive plural",
    pillar: "lessons",
    lessons: [
      {
        id: "plural-nominative",
        title: "Monikon nominatiivi",
        titleEn: "Nominative Plural",
        icon: "📊",
        level: "A2",
        theory: `Monikon nominatiivi muodostetaan lisäämällä **-t** sanan yksikön vartaloon.\n\n**Säännöt:**\n- auto → auto**t** (cars)\n- talo → talo**t** (houses)\n- koira → koira**t** (dogs)\n\n**Huomaa konsonanttivaihtelu:**\n- pankki → panki**t** (kk → k)\n- kauppa → kaupa**t** (pp → p)\n- katu → kadu**t** (t → d)`,
        theoryEn: `Nominative plural is formed by adding **-t** to the singular stem.\n\n**Rules:**\n- auto → auto**t** (cars)\n- talo → talo**t** (houses)\n- koira → koira**t** (dogs)\n\n**Note consonant gradation:**\n- pankki → panki**t** (kk → k)\n- kauppa → kaupa**t** (pp → p)\n- katu → kadu**t** (t → d)`,
        grammar: [
          {
            title: "Monikko + astevaihtelu",
            titleEn: "Plural + consonant gradation",
            explanation: "Monikon tunnuksen edellä tapahtuu astevaihtelu (vahva → heikko).",
            explanationEn: "Consonant gradation (strong → weak) occurs before the plural marker.",
            examples: [
              { finnish: "kukka → kukat", english: "flower → flowers (kk→k)" },
              { finnish: "leipä → leivät", english: "bread → breads (p→v)" },
              { finnish: "pöytä → pöydät", english: "table → tables (t→d)" }
            ]
          }
        ],
        quiz: [
          { question: "Mikä on 'talo' monikossa?", options: ["talot", "taloja", "taloissa", "taloille"], answer: 0, explanation: "talo → talot (monikon nominatiivi: + t)" },
          { question: "'Kauppa' monikossa:", options: ["kauppat", "kaupat", "kauppoja", "kauppoissa"], answer: 1, explanation: "kauppa → kaupat (pp → p + t)" },
          { question: "Monikon nominatiivi muodostetaan:", options: ["Lisäämällä -a", "Lisäämällä -t", "Lisäämällä -ssa", "Lisäämällä -lle"], answer: 1, explanation: "Monikon nominatiivi = vartalo + t." }
        ]
      },
      {
        id: "plural-partitive",
        title: "Monikon partitiivi",
        titleEn: "Partitive Plural",
        icon: "🔢",
        level: "A2",
        theory: `Monikon partitiivi on yksi vaikeimmista suomen sijamuodoista.\n\n**Pääsäännöt:**\n1. Vokaaliloppuiset: -ja/-jä tai -a/-ä\n   - auto → auto**ja** (cars)\n   - koira → koiri**a** (dogs)\n2. Konsonanttiloppuiset: -ia/-iä\n   - opettaja → opettaji**a** (teachers)\n\n**Erikoistapaukset:**\n- lapsi → laps**ia** (children)\n- mies → mieh**iä** (men)`,
        theoryEn: `Partitive plural is one of the most difficult case forms in Finnish.\n\n**Main rules:**\n1. Vowel-ending words: -ja/-jä or -a/-ä\n   - auto → auto**ja** (cars)\n   - koira → koiri**a** (dogs)\n2. Consonant-ending words: -ia/-iä\n   - opettaja → opettaji**a** (teachers)\n\n**Special cases:**\n- lapsi → laps**ia** (children)\n- mies → mieh**iä** (men)`,
        grammar: [
          {
            title: "Monikon partitiivi -ja/-jä",
            titleEn: "Partitive plural -ja/-jä",
            explanation: "Kun sanan vartalo loppuu pitkään vokaaliin tai diftongiin, käytetään -ja/-jä.",
            explanationEn: "When the stem ends in a long vowel or diphthong, use -ja/-jä.",
            examples: [
              { finnish: "auto → autoja", english: "cars (partitive)" },
              { finnish: "työ → töitä", english: "works/jobs (partitive)" },
              { finnish: "maa → maita", english: "countries (partitive)" }
            ]
          }
        ],
        quiz: [
          { question: "'Auto' monikon partitiivissa:", options: ["autot", "autoja", "autoissa", "autoille"], answer: 1, explanation: "auto → autoja (monikon partitiivi)" },
          { question: "'Koira' monikon partitiivissa:", options: ["koirat", "koiria", "koirissa", "koiralle"], answer: 1, explanation: "koira → koiria (monikon partitiivi)" },
          { question: "Monikon partitiivi on vaikea koska:", options: ["Se on aina sama", "Sillä on monta muodostussääntöä", "Sitä ei käytetä", "Se on sama kuin nominatiivi"], answer: 1, explanation: "Monikon partitiivilla on useita eri muodostussääntöjä." }
        ]
      }
    ]
  },
  {
    id: "finnish-questions",
    title: "Kysymyssanat (Question Words)",
    titleEn: "Question Words",
    icon: "❓",
    color: "from-yellow-500 to-orange-500",
    description: "Kysymyssanat ja epäsuorat kysymykset",
    descriptionEn: "Question words and indirect questions",
    pillar: "lessons",
    lessons: [
      {
        id: "question-words",
        title: "Kysymyssanat",
        titleEn: "Question Words",
        icon: "🤔",
        level: "A1",
        theory: `Suomen kielen kysymyssanat:\n\n| Sana | Merkitys |\n|------|----------|\n| **Kuka?** | Who? |\n| **Mikä?** | What? |\n| **Missä?** | Where? (location) |\n| **Minne?** | Where to? |\n| **Mistä?** | Where from? |\n| **Milloin?** | When? |\n| **Miksi?** | Why? |\n| **Miten/Kuinka?** | How? |\n| **Paljonko?** | How much? |\n| **Montako?** | How many? |`,
        theoryEn: `Finnish question words:\n\n| Word | Meaning |\n|------|----------|\n| **Kuka?** | Who? |\n| **Mikä?** | What? |\n| **Missä?** | Where? (location) |\n| **Minne?** | Where to? |\n| **Mistä?** | Where from? |\n| **Milloin?** | When? |\n| **Miksi?** | Why? |\n| **Miten/Kuinka?** | How? |\n| **Paljonko?** | How much? |\n| **Montako?** | How many? |`,
        grammar: [
          {
            title: "Paikallissija-kysymykset",
            titleEn: "Locative question words",
            explanation: "Missä, mistä ja minne vastaavat kolmea eri suuntaa: sijainti, lähtöpaikka ja kohde.",
            explanationEn: "Missä, mistä and minne correspond to three directions: location, origin, and destination.",
            examples: [
              { finnish: "Missä sinä asut? — Helsingissä.", english: "Where do you live? — In Helsinki." },
              { finnish: "Mistä sinä tulet? — Suomesta.", english: "Where do you come from? — From Finland." },
              { finnish: "Minne sinä menet? — Kauppaan.", english: "Where are you going? — To the store." }
            ]
          }
        ],
        dialogues: [
          {
            situation: "Kahvilassa — kysymyksiä",
            situationEn: "At a café — asking questions",
            lines: [
              { speaker: "A", finnish: "Kuka sinä olet?", english: "Who are you?" },
              { speaker: "B", finnish: "Olen Maria. Mistä sinä tulet?", english: "I'm Maria. Where do you come from?" },
              { speaker: "A", finnish: "Tulen Vietnamista. Miksi olet Suomessa?", english: "I come from Vietnam. Why are you in Finland?" },
              { speaker: "B", finnish: "Opiskelen suomea. Milloin tulit tänne?", english: "I study Finnish. When did you come here?" }
            ]
          }
        ],
        quiz: [
          { question: "'Where?' (location) suomeksi:", options: ["Minne?", "Missä?", "Mistä?", "Miksi?"], answer: 1, explanation: "Missä? = Where? (sijainti)" },
          { question: "'___ sinä menet?' (Where to?)", options: ["Missä", "Mistä", "Minne", "Milloin"], answer: 2, explanation: "Minne? = Where to? (kohde)" },
          { question: "'Paljonko tämä maksaa?' means:", options: ["When does this cost?", "How much does this cost?", "Why does this cost?", "Who pays?"], answer: 1, explanation: "Paljonko = How much?" }
        ]
      },
      {
        id: "indirect-questions",
        title: "Epäsuorat kysymykset",
        titleEn: "Indirect Questions",
        icon: "💭",
        level: "A2",
        theory: `Epäsuorassa kysymyksessä käytetään **-kO**-liitettä tai kysymyssanaa + normaali sanajärjestys.\n\n**Suora:** Onko hän suomalainen?\n**Epäsuora:** Tiedätkö, **onko** hän suomalainen?\n\n**Suora:** Missä hän asuu?\n**Epäsuora:** En tiedä, **missä** hän asuu.\n\n**Rakenne:**\n- Tiedätkö / Kerro / En tiedä + kysymyssana + normaali lause\n- Verbi EI mene lauseen alkuun epäsuorassa kysymyksessä`,
        theoryEn: `Indirect questions use **-kO** suffix or question word + normal word order.\n\n**Direct:** Onko hän suomalainen? (Is he Finnish?)\n**Indirect:** Tiedätkö, **onko** hän suomalainen? (Do you know if he is Finnish?)\n\n**Direct:** Missä hän asuu? (Where does he live?)\n**Indirect:** En tiedä, **missä** hän asuu. (I don't know where he lives.)\n\n**Structure:**\n- Tiedätkö / Kerro / En tiedä + question word + normal sentence\n- Verb does NOT go to the beginning in indirect questions`,
        grammar: [
          {
            title: "Epäsuora kysymys + -kO",
            titleEn: "Indirect question + -kO",
            explanation: "Kun suora kysymys alkaa verbillä (kyllä/ei-kysymys), käytetään -kO-liitettä.",
            explanationEn: "When the direct question starts with a verb (yes/no question), use the -kO suffix.",
            examples: [
              { finnish: "Tiedätkö, onko kauppa auki?", english: "Do you know if the store is open?" },
              { finnish: "Kerro, tuletko huomenna.", english: "Tell me if you're coming tomorrow." },
              { finnish: "En muista, oliko se kallis.", english: "I don't remember if it was expensive." }
            ]
          }
        ],
        quiz: [
          { question: "Epäsuora muoto: 'Missä hän asuu?'", options: ["Tiedätkö missä hän asuu?", "Missä tiedätkö hän asuu?", "Tiedätkö hän missä asuu?", "Hän tiedätkö missä asuu?"], answer: 0, explanation: "Tiedätkö + kysymyssana + normaali sanajärjestys." },
          { question: "'-kO' liitettä käytetään:", options: ["Aina", "Kyllä/ei-kysymyksissä", "Vain myöntölauseissa", "Vain monikossa"], answer: 1, explanation: "-kO liite tekee kyllä/ei-kysymyksen epäsuoraksi." },
          { question: "'En tiedä, onko hän kotona' means:", options: ["I know he's home", "I don't know if he's home", "He doesn't know", "I'm not home"], answer: 1, explanation: "En tiedä = I don't know, onko = if (is)." }
        ]
      }
    ]
  },
  {
    id: "finnish-writing",
    title: "Kirjoittaminen (Writing)",
    titleEn: "Writing Practice",
    icon: "✉️",
    color: "from-pink-500 to-rose-500",
    description: "Sähköpostin ja viestin kirjoittaminen",
    descriptionEn: "Writing emails and messages",
    pillar: "lessons",
    lessons: [
      {
        id: "finnish-email",
        title: "Sähköposti",
        titleEn: "Email Writing",
        icon: "📧",
        level: "A2",
        theory: `YKI-testissä kirjoitetaan usein sähköposti.\n\n**Rakenne:**\n1. **Tervehdys:** Hei / Hei [nimi] / Hyvä [nimi]\n2. **Asia:** Kirjoitan, koska... / Haluaisin kysyä...\n3. **Lopetus:** Ystävällisin terveisin / Terveisin / Kiitos!\n\n**Yleisiä fraaseja:**\n- Kiitos viestistäsi. (Thank you for your message.)\n- Voisitko kertoa lisää? (Could you tell more?)\n- Odotan vastaustasi. (I look forward to your reply.)`,
        theoryEn: `In the YKI test, you often write an email.\n\n**Structure:**\n1. **Greeting:** Hei / Hei [name] / Hyvä [name]\n2. **Purpose:** Kirjoitan, koska... / Haluaisin kysyä...\n3. **Closing:** Ystävällisin terveisin / Terveisin / Kiitos!\n\n**Common phrases:**\n- Kiitos viestistäsi. (Thank you for your message.)\n- Voisitko kertoa lisää? (Could you tell more?)\n- Odotan vastaustasi. (I look forward to your reply.)`,
        grammar: [
          {
            title: "Kohtelias pyyntö",
            titleEn: "Polite request",
            explanation: "Konditionaali tekee pyynnöstä kohteliaan: Voisitko... / Haluaisin...",
            explanationEn: "The conditional makes requests polite: Voisitko... / Haluaisin...",
            examples: [
              { finnish: "Voisitko lähettää tiedot?", english: "Could you send the information?" },
              { finnish: "Haluaisin varata ajan.", english: "I would like to book an appointment." }
            ]
          }
        ],
        dialogues: [
          {
            situation: "Esimerkki sähköposti",
            situationEn: "Example email",
            lines: [
              { speaker: "Lähettäjä", finnish: "Hei!", english: "Hello!" },
              { speaker: "Lähettäjä", finnish: "Kirjoitan, koska haluaisin tietää kurssien aikataulusta.", english: "I'm writing because I'd like to know about the course schedule." },
              { speaker: "Lähettäjä", finnish: "Voisitteko lähettää lisätietoja?", english: "Could you send more information?" },
              { speaker: "Lähettäjä", finnish: "Ystävällisin terveisin, Linh", english: "Kind regards, Linh" }
            ]
          }
        ],
        quiz: [
          { question: "Sähköpostin kohtelias lopetus:", options: ["Hei hei!", "Ystävällisin terveisin", "Moikka!", "Nähdään!"], answer: 1, explanation: "Ystävällisin terveisin = Kind regards (virallinen)." },
          { question: "'Voisitko' on:", options: ["Imperatiivi", "Konditionaali", "Preesens", "Imperfekti"], answer: 1, explanation: "Voisitko = could you (konditionaali + -kO)." },
          { question: "'Odotan vastaustasi' means:", options: ["I'm waiting for the bus", "I look forward to your reply", "I'm late", "Thank you"], answer: 1, explanation: "Odotan vastaustasi = I'm waiting for / look forward to your reply." }
        ]
      },
      {
        id: "finnish-messages",
        title: "Viestit ja ilmoitukset",
        titleEn: "Messages & Notices",
        icon: "💬",
        level: "A2",
        theory: `Arkipäivän viestit: tekstiviestit, muistilaput, ilmoitukset.\n\n**Tekstiviesti — lyhyt ja epävirallinen:**\n- Tuun myöhässä! (I'll be late!) — puhekieli\n- Soita mulle! (Call me!)\n\n**Ilmoitus — selkeä ja virallinen:**\n- Huomio! Hissi on epäkunnossa. (Notice! The elevator is broken.)\n- Kokous on siirretty tiistaille. (The meeting has been moved to Tuesday.)\n\n**Muistilappu:**\n- Muista ostaa maitoa! (Remember to buy milk!)\n- Avain on pöydällä. (The key is on the table.)`,
        theoryEn: `Everyday messages: text messages, notes, announcements.\n\n**Text message — short and informal:**\n- Tuun myöhässä! (I'll be late!) — spoken Finnish\n- Soita mulle! (Call me!)\n\n**Announcement — clear and formal:**\n- Huomio! Hissi on epäkunnossa. (Notice! The elevator is broken.)\n- Kokous on siirretty tiistaille. (The meeting has been moved to Tuesday.)\n\n**Note:**\n- Muista ostaa maitoa! (Remember to buy milk!)\n- Avain on pöydällä. (The key is on the table.)`,
        vocabulary: [
          { word: "ilmoitus", partOfSpeech: "substantiivi", meaningEn: "announcement, notice", meaningVi: "thông báo", example: "Lue ilmoitus seinältä.", exampleEn: "Read the notice on the wall.", category: "viestintä" },
          { word: "muistilappu", partOfSpeech: "substantiivi", meaningEn: "note, memo", meaningVi: "giấy nhắn", example: "Jätin muistilapun pöydälle.", exampleEn: "I left a note on the table.", category: "viestintä" },
          { word: "epäkunnossa", partOfSpeech: "adverbi", meaningEn: "out of order, broken", meaningVi: "hỏng, không hoạt động", example: "Hissi on epäkunnossa.", exampleEn: "The elevator is out of order.", category: "arki" }
        ],
        quiz: [
          { question: "'Hissi on epäkunnossa' means:", options: ["The elevator is new", "The elevator is broken", "The elevator is fast", "The elevator is full"], answer: 1, explanation: "Epäkunnossa = out of order, broken." },
          { question: "Tekstiviestissä käytetään usein:", options: ["Virallista kieltä", "Puhekieltä", "Ruotsia", "Pitkiä lauseita"], answer: 1, explanation: "Tekstiviestit ovat usein puhekielisiä ja lyhyitä." },
          { question: "'Muista ostaa maitoa' on:", options: ["Sähköposti", "Ilmoitus", "Muistilappu", "Raportti"], answer: 2, explanation: "Tämä on tyypillinen muistilappu." }
        ]
      }
    ]
  },
  {
    id: "finnish-listening-skills",
    title: "Kuunteleminen (Listening)",
    titleEn: "Listening Practice",
    icon: "👂",
    color: "from-cyan-500 to-blue-500",
    description: "Kuulutukset ja puhelut",
    descriptionEn: "Announcements and phone calls",
    pillar: "lessons",
    lessons: [
      {
        id: "finnish-announcements",
        title: "Kuulutukset",
        titleEn: "Announcements",
        icon: "📢",
        level: "A2",
        theory: `YKI-kuuntelussa tulee usein kuulutuksia:\n\n**Juna-asemalla:**\n- Juna Helsinkiin lähtee raiteelta 3. (The train to Helsinki departs from track 3.)\n- Juna on myöhässä 10 minuuttia. (The train is 10 minutes late.)\n\n**Kaupassa:**\n- Kauppa sulkeutuu 15 minuutin kuluttua. (The store closes in 15 minutes.)\n- Tänään erikoistarjous: kahvi 2 euroa! (Today's special: coffee 2 euros!)\n\n**Avainilmaukset:**\n- lähtee (departs), saapuu (arrives), myöhässä (late), peruttu (cancelled)`,
        theoryEn: `YKI listening often includes announcements:\n\n**At the train station:**\n- Juna Helsinkiin lähtee raiteelta 3. (Train to Helsinki departs from track 3.)\n- Juna on myöhässä 10 minuuttia. (The train is 10 minutes late.)\n\n**At the store:**\n- Kauppa sulkeutuu 15 minuutin kuluttua. (The store closes in 15 minutes.)\n- Tänään erikoistarjous: kahvi 2 euroa! (Today's special: coffee 2 euros!)\n\n**Key expressions:**\n- lähtee (departs), saapuu (arrives), myöhässä (late), peruttu (cancelled)`,
        vocabulary: [
          { word: "kuulutus", partOfSpeech: "substantiivi", meaningEn: "announcement", meaningVi: "thông báo phát thanh", example: "Kuuntele kuulutus.", exampleEn: "Listen to the announcement.", category: "viestintä" },
          { word: "raide", partOfSpeech: "substantiivi", meaningEn: "track, platform", meaningVi: "đường ray, sân ga", example: "Juna lähtee raiteelta 5.", exampleEn: "The train departs from track 5.", category: "liikenne" },
          { word: "peruttu", partOfSpeech: "adjektiivi", meaningEn: "cancelled", meaningVi: "bị hủy", example: "Lento on peruttu.", exampleEn: "The flight is cancelled.", category: "liikenne" }
        ],
        quiz: [
          { question: "'Juna on myöhässä' means:", options: ["The train is early", "The train is late", "The train is cancelled", "The train is full"], answer: 1, explanation: "Myöhässä = late." },
          { question: "'Raide' means:", options: ["Bus stop", "Airport", "Track/platform", "Ticket"], answer: 2, explanation: "Raide = track, platform (juna-asemalla)." },
          { question: "'Peruttu' means:", options: ["Delayed", "Cancelled", "On time", "Fast"], answer: 1, explanation: "Peruttu = cancelled." }
        ]
      },
      {
        id: "finnish-phone",
        title: "Puhelut",
        titleEn: "Phone Calls",
        icon: "📞",
        level: "A2",
        theory: `Puhelinkeskustelun rakenne:\n\n**Vastaaminen:**\n- Hei, [nimi] täällä. (Hello, this is [name].)\n\n**Asian esittäminen:**\n- Soitan, koska... (I'm calling because...)\n- Haluaisin varata ajan. (I'd like to book an appointment.)\n\n**Tarkistaminen:**\n- Voisitteko toistaa? (Could you repeat that?)\n- Anteeksi, en kuullut. (Sorry, I didn't hear.)\n\n**Lopetus:**\n- Kiitos, näkemiin! (Thank you, goodbye!)\n- Hyvää päivää! (Have a good day!)`,
        theoryEn: `Phone conversation structure:\n\n**Answering:**\n- Hei, [name] täällä. (Hello, this is [name].)\n\n**Stating your purpose:**\n- Soitan, koska... (I'm calling because...)\n- Haluaisin varata ajan. (I'd like to book an appointment.)\n\n**Checking:**\n- Voisitteko toistaa? (Could you repeat that?)\n- Anteeksi, en kuullut. (Sorry, I didn't hear.)\n\n**Closing:**\n- Kiitos, näkemiin! (Thank you, goodbye!)\n- Hyvää päivää! (Have a good day!)`,
        dialogues: [
          {
            situation: "Ajanvaraus puhelimessa",
            situationEn: "Booking an appointment by phone",
            lines: [
              { speaker: "Vastaanottaja", finnish: "Terveyskeskus, päivää!", english: "Health center, hello!" },
              { speaker: "Soittaja", finnish: "Hei, haluaisin varata ajan lääkärille.", english: "Hello, I'd like to book a doctor's appointment." },
              { speaker: "Vastaanottaja", finnish: "Tietenkin. Sopiiko ensi tiistai kello 10?", english: "Of course. Does next Tuesday at 10 work?" },
              { speaker: "Soittaja", finnish: "Kyllä sopii. Kiitos!", english: "Yes, that works. Thank you!" }
            ]
          }
        ],
        quiz: [
          { question: "'Voisitteko toistaa?' means:", options: ["Could you leave?", "Could you repeat?", "Could you pay?", "Could you wait?"], answer: 1, explanation: "Toistaa = to repeat." },
          { question: "Puhelimeen vastataan:", options: ["Terve, kuka siellä?", "Hei, [nimi] täällä.", "En ole paikalla.", "Soita myöhemmin."], answer: 1, explanation: "Hei, [nimi] täällä = Hello, this is [name]." },
          { question: "'Haluaisin varata ajan' means:", options: ["I want to cancel", "I'd like to book an appointment", "I'm lost", "I need help"], answer: 1, explanation: "Varata ajan = to book an appointment." }
        ]
      }
    ]
  },
  {
    id: "finnish-everyday",
    title: "Arkisuomi (Everyday Finnish)",
    titleEn: "Everyday Finnish",
    icon: "🗣️",
    color: "from-amber-500 to-yellow-500",
    description: "Puhekieli, slangi ja lyhenteet",
    descriptionEn: "Spoken Finnish, slang and abbreviations",
    pillar: "lessons",
    lessons: [
      {
        id: "finnish-spoken",
        title: "Puhekieli",
        titleEn: "Spoken Finnish",
        icon: "💬",
        level: "A2",
        theory: `Suomen puhekieli eroaa paljon kirjakielestä!\n\n**Yleisiä eroja:**\n| Kirjakieli | Puhekieli |\n|------------|----------|\n| minä | mä / mää |\n| sinä | sä / sää |\n| hän | se |\n| me olemme | me ollaan |\n| he menevät | ne menee |\n| ei ole | ei oo |\n| olen | oon |\n\n**Lyhennyksiä:**\n- tämä → tää\n- tuolla → tol\n- sellainen → sellanen / semmonen\n- mutta → mut`,
        theoryEn: `Finnish spoken language differs a lot from written Finnish!\n\n**Common differences:**\n| Written | Spoken |\n|---------|--------|\n| minä (I) | mä / mää |\n| sinä (you) | sä / sää |\n| hän (he/she) | se |\n| me olemme (we are) | me ollaan |\n| he menevät (they go) | ne menee |\n| ei ole (is not) | ei oo |\n| olen (I am) | oon |\n\n**Shortened forms:**\n- tämä → tää (this)\n- tuolla → tol (over there)\n- sellainen → sellanen / semmonen (such)\n- mutta → mut (but)`,
        vocabulary: [
          { word: "mä", partOfSpeech: "pronomini", meaningEn: "I (spoken)", meaningVi: "tôi (khẩu ngữ)", example: "Mä tuun huomenna.", exampleEn: "I'm coming tomorrow.", puhekieli: "kirjakielellä: minä", category: "puhekieli" },
          { word: "sä", partOfSpeech: "pronomini", meaningEn: "you (spoken)", meaningVi: "bạn (khẩu ngữ)", example: "Ootko sä valmis?", exampleEn: "Are you ready?", puhekieli: "kirjakielellä: sinä", category: "puhekieli" },
          { word: "joo", partOfSpeech: "partikkeli", meaningEn: "yeah, yes (informal)", meaningVi: "ừ, vâng (thân mật)", example: "Joo, mä tiedän.", exampleEn: "Yeah, I know.", category: "puhekieli" }
        ],
        dialogues: [
          {
            situation: "Kaverin kanssa (puhekieli)",
            situationEn: "With a friend (spoken Finnish)",
            lines: [
              { speaker: "A", finnish: "Moi! Mitä sä teet?", english: "Hi! What are you doing?" },
              { speaker: "B", finnish: "Ei mitään erikoista. Sä?", english: "Nothing special. You?" },
              { speaker: "A", finnish: "Mä menin eilen leffaan. Se oli tosi hyvä!", english: "I went to the movies yesterday. It was really good!" },
              { speaker: "B", finnish: "Joo, mäkin haluun nähä sen!", english: "Yeah, I wanna see it too!" }
            ]
          }
        ],
        quiz: [
          { question: "'Mä' on puhekielen muoto sanasta:", options: ["me", "minä", "mutta", "mikä"], answer: 1, explanation: "Mä = minä (puhekielellä)." },
          { question: "'Ootko sä valmis?' kirjakielellä:", options: ["Oletko sinä valmis?", "Olenko minä valmis?", "Onko hän valmis?", "Ovatko he valmiita?"], answer: 0, explanation: "Ootko = oletko, sä = sinä." },
          { question: "Puhekielessä 'hän' korvataan usein:", options: ["se", "he", "ne", "me"], answer: 0, explanation: "Puhekielessä 'hän' → 'se'." }
        ]
      },
      {
        id: "finnish-slang",
        title: "Slangi ja lyhenteet",
        titleEn: "Slang & Abbreviations",
        icon: "🤙",
        level: "A2",
        theory: `Suomen slangi ja yleisiä lyhenteitä:\n\n**Slangi (erityisesti Helsinki):**\n- **tsemppiä!** = good luck! / keep going!\n- **leffa** = elokuva (movie)\n- **safka** = ruoka (food)\n- **skidi** = lapsi (kid)\n- **mesta** = paikka (place)\n- **duuni** = työ (work/job)\n- **kämppä** = asunto (apartment)\n\n**Lyhenteet:**\n- **jne.** = ja niin edelleen (etc.)\n- **esim.** = esimerkiksi (for example)\n- **klo** = kello (o'clock)\n- **n.** = noin (approximately)`,
        theoryEn: `Finnish slang and common abbreviations:\n\n**Slang (especially Helsinki):**\n- **tsemppiä!** = good luck! / keep going!\n- **leffa** = elokuva (movie)\n- **safka** = ruoka (food)\n- **skidi** = lapsi (kid)\n- **mesta** = paikka (place)\n- **duuni** = työ (work/job)\n- **kämppä** = asunto (apartment)\n\n**Abbreviations:**\n- **jne.** = ja niin edelleen (etc.)\n- **esim.** = esimerkiksi (for example)\n- **klo** = kello (o'clock)\n- **n.** = noin (approximately)`,
        vocabulary: [
          { word: "leffa", partOfSpeech: "substantiivi", meaningEn: "movie (slang)", meaningVi: "phim (tiếng lóng)", example: "Mennään leffaan!", exampleEn: "Let's go to the movies!", puhekieli: "kirjakielellä: elokuva", category: "slangi" },
          { word: "duuni", partOfSpeech: "substantiivi", meaningEn: "job, work (slang)", meaningVi: "công việc (tiếng lóng)", example: "Mulla on duuni huomenna.", exampleEn: "I have work tomorrow.", puhekieli: "kirjakielellä: työ", category: "slangi" },
          { word: "kämppä", partOfSpeech: "substantiivi", meaningEn: "apartment (slang)", meaningVi: "căn hộ (tiếng lóng)", example: "Mun kämppä on Kalliossa.", exampleEn: "My apartment is in Kallio.", puhekieli: "kirjakielellä: asunto", category: "slangi" }
        ],
        quiz: [
          { question: "'Leffa' tarkoittaa:", options: ["Kirja", "Elokuva", "Ravintola", "Auto"], answer: 1, explanation: "Leffa = elokuva (slangi)." },
          { question: "'Duuni' on slangia sanasta:", options: ["koulu", "työ", "kauppa", "pankki"], answer: 1, explanation: "Duuni = työ (slangi)." },
          { question: "'Jne.' on lyhenne:", options: ["Joku numero erikseen", "Ja niin edelleen", "Juuri nyt eri", "Jokainen numero"], answer: 1, explanation: "Jne. = ja niin edelleen (etc.)." }
        ]
      }
    ]
  }
];
