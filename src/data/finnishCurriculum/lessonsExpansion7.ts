// YKI A1/A2 Lessons - Expansion 7: Numbers/Time, Locative Cases, Imperative
import type { FinnishModule } from "./types";

export const finnishLessonExpansion7Modules: FinnishModule[] = [
  {
    id: "yki-a2-essentials",
    title: "A2 Perustaidot",
    titleEn: "A2 Core Skills",
    icon: "🧭",
    color: "from-sky-500 to-cyan-500",
    description: "Numerot, ajan ilmaisut, paikallissijat ja imperatiivi.",
    descriptionEn: "Numbers, time expressions, locative cases and the imperative.",
    pillar: "lessons",
    lessons: [
      // ───────── 1. Numbers & time ─────────
      {
        id: "a2-numbers-time",
        title: "Numerot ja aika",
        titleEn: "Numbers & Time",
        icon: "🕓",
        level: "A2",
        theory: `### Numerot ja kellonajat (Số đếm và giờ)

Ở trình độ A2 bạn cần đọc số một cách thành thạo, nói được giá tiền, ngày tháng và giờ.

**1. Số đếm cơ bản**
- 0 *nolla* · 1 *yksi* · 2 *kaksi* · 3 *kolme* · 4 *neljä* · 5 *viisi*
- 6 *kuusi* · 7 *seitsemän* · 8 *kahdeksan* · 9 *yhdeksän* · 10 *kymmenen*
- 11 *yksitoista* · 12 *kaksitoista* … 19 *yhdeksäntoista*
- 20 *kaksikymmentä* · 21 *kaksikymmentäyksi* · 100 *sata* · 1000 *tuhat*

**2. Hỏi giờ - Kysy kellonaikaa**
- *Paljonko kello on?* - Mấy giờ rồi?
- *Kello on kymmenen.* - 10 giờ đúng.
- *Kello on puoli yksitoista.* - 10 rưỡi (nửa đường đến 11!).
- *Kello on viittä vaille kahdeksan.* - 7h55.

**3. Viikonpäivät & kuukaudet**
maanantai · tiistai · keskiviikko · torstai · perjantai · lauantai · sunnuntai
tammikuu · helmikuu · maaliskuu … joulukuu`,
        theoryEn: `### Numbers & Time

At A2 level you read numbers fluently, say prices, dates and the time. Watch out for **puoli** (half) - it means *half to the next hour*, not half past!`,
        grammar: [
          {
            title: "Kellonajan ilmaiseminen",
            titleEn: "Telling the time",
            explanation: "Käytä yksinkertaista 'Kello on…' -mallia. Puoli + seuraava tunti = half to.",
            explanationEn: "Use 'Kello on …'. 'Puoli' + next hour = half to.",
            examples: [
              { finnish: "Kello on kaksi.", english: "It's 2 o'clock." },
              { finnish: "Kello on puoli kolme.", english: "It's 2:30 (half to 3)." },
              { finnish: "Kello on varttia vaille viisi.", english: "It's a quarter to 5." },
            ],
          },
          {
            title: "Ajan partitiivi",
            titleEn: "Time + partitive",
            explanation: "Kestoa ilmaistaan partitiivilla: tunnin, kaksi tuntia, viisi minuuttia.",
            explanationEn: "Duration is expressed with the partitive: an hour, two hours, five minutes.",
            examples: [
              { finnish: "Odotin tunnin.", english: "I waited an hour." },
              { finnish: "Hän nukkuu kahdeksan tuntia.", english: "She sleeps eight hours." },
            ],
          },
        ],
        vocabulary: [
          { word: "kello", partOfSpeech: "noun", meaningEn: "clock / o'clock", meaningVi: "đồng hồ / giờ", example: "Kello on viisi.", exampleEn: "It's five o'clock.", category: "aika" },
          { word: "tunti", partOfSpeech: "noun", meaningEn: "hour", meaningVi: "giờ", example: "Olin täällä tunnin.", exampleEn: "I was here for an hour.", category: "aika" },
          { word: "minuutti", partOfSpeech: "noun", meaningEn: "minute", meaningVi: "phút", example: "Odota viisi minuuttia.", exampleEn: "Wait five minutes.", category: "aika" },
          { word: "puoli", partOfSpeech: "noun", meaningEn: "half", meaningVi: "nửa", example: "Kello on puoli kahdeksan.", exampleEn: "It's 7:30.", category: "aika" },
          { word: "vartti", partOfSpeech: "noun", meaningEn: "quarter (15 min)", meaningVi: "mười lăm phút", example: "Vartti yli kuusi.", exampleEn: "Quarter past six.", category: "aika" },
          { word: "aamu", partOfSpeech: "noun", meaningEn: "morning", meaningVi: "buổi sáng", example: "Aamulla juon kahvia.", exampleEn: "I drink coffee in the morning.", category: "aika" },
          { word: "ilta", partOfSpeech: "noun", meaningEn: "evening", meaningVi: "buổi tối", example: "Illalla katson elokuvan.", exampleEn: "In the evening I watch a film.", category: "aika" },
          { word: "yö", partOfSpeech: "noun", meaningEn: "night", meaningVi: "đêm", example: "Yöllä nukun hyvin.", exampleEn: "At night I sleep well.", category: "aika" },
          { word: "viikko", partOfSpeech: "noun", meaningEn: "week", meaningVi: "tuần", example: "Viikko on pitkä.", exampleEn: "The week is long.", category: "aika" },
          { word: "kuukausi", partOfSpeech: "noun", meaningEn: "month", meaningVi: "tháng", example: "Tämä kuukausi on lyhyt.", exampleEn: "This month is short.", category: "aika" },
        ],
        exercises: [],
        quiz: [
          { question: "Mikä kellonaika on 'puoli kahdeksan'?", options: ["7:30", "8:30", "7:15", "8:15"], answer: 0, explanation: "Puoli + seuraava tunti → puoli kahdeksan = 7:30." },
          { question: "Käännös: 'a quarter to 5'", options: ["vartti yli viisi", "varttia vaille viisi", "puoli viisi", "viisi vaille viittä"], answer: 1, explanation: "varttia vaille = quarter to." },
          { question: "'minuutti' = ?", options: ["phút", "giờ", "ngày", "tuần"], answer: 0, explanation: "minuutti = minute." },
          { question: "Mikä on 'evening' suomeksi?", options: ["aamu", "ilta", "yö", "päivä"], answer: 1, explanation: "ilta = evening." },
          { question: "Käännös: 'I waited an hour.'", options: ["Odotin tunnin.", "Odotan tuntia.", "Odotin tunteja.", "Odotin hetken."], answer: 0, explanation: "Duration → partitive/genitive 'tunnin'." },
        ],
      },

      // ───────── 2. Locative cases ─────────
      {
        id: "a2-locative",
        title: "Paikallissijat",
        titleEn: "Locative Cases",
        icon: "📍",
        level: "A2",
        theory: `### Sisä- ja ulkopaikallissijat (Các cách chỉ vị trí)

Tiếng Phần Lan dùng **đuôi từ** thay vì giới từ. Có 6 cách chỉ vị trí, chia thành 2 nhóm:

**Sisäpaikallissijat (bên trong)**
| Cách | Đuôi | Nghĩa | Ví dụ |
|------|------|-------|-------|
| Inessive | -ssa/-ssä | trong | *talossa* (trong nhà) |
| Elative | -sta/-stä | từ trong ra | *talosta* (từ trong nhà) |
| Illative | -Vn/-hVn | vào trong | *taloon* (vào nhà) |

**Ulkopaikallissijat (bên ngoài / bề mặt)**
| Cách | Đuôi | Nghĩa | Ví dụ |
|------|------|-------|-------|
| Adessive | -lla/-llä | trên / cạnh | *pöydällä* (trên bàn) |
| Ablative | -lta/-ltä | từ trên xuống | *pöydältä* (từ trên bàn) |
| Allative | -lle | lên trên | *pöydälle* (lên bàn) |

**Mẹo của thầy Hải:**
Quy tắc 3 cặp: ở (where) → từ (from) → đến (to).`,
        theoryEn: `### Internal & External Local Cases

Finnish uses **case endings** instead of prepositions. Six local cases split into "inside" (-ssa/-sta/-Vn) and "on the surface" (-lla/-lta/-lle).`,
        grammar: [
          {
            title: "Sisäpaikallissijat",
            titleEn: "Internal cases (in / from / into)",
            explanation: "Käytä, kun puhut paikan sisältä.",
            explanationEn: "Use for being inside, coming out of, or going into a place.",
            examples: [
              { finnish: "Olen kaupassa.", english: "I'm at the shop (inside)." },
              { finnish: "Tulen kaupasta.", english: "I'm coming from the shop." },
              { finnish: "Menen kauppaan.", english: "I'm going to the shop." },
            ],
          },
          {
            title: "Ulkopaikallissijat",
            titleEn: "External cases (on / from / onto)",
            explanation: "Käytä pinnoille ja joillekin paikoille (asema, ranta).",
            explanationEn: "Use for surfaces and certain places (station, beach).",
            examples: [
              { finnish: "Kirja on pöydällä.", english: "The book is on the table." },
              { finnish: "Otan kirjan pöydältä.", english: "I take the book off the table." },
              { finnish: "Laita kirja pöydälle.", english: "Put the book on the table." },
            ],
          },
        ],
        vocabulary: [
          { word: "talo", partOfSpeech: "noun", meaningEn: "house", meaningVi: "ngôi nhà", example: "Talossa on viisi huonetta.", exampleEn: "There are five rooms in the house.", category: "paikat" },
          { word: "koulu", partOfSpeech: "noun", meaningEn: "school", meaningVi: "trường", example: "Lapset ovat koulussa.", exampleEn: "The kids are at school.", category: "paikat" },
          { word: "asema", partOfSpeech: "noun", meaningEn: "station", meaningVi: "nhà ga / trạm", example: "Bussi pysähtyy asemalla.", exampleEn: "The bus stops at the station.", category: "paikat" },
          { word: "ranta", partOfSpeech: "noun", meaningEn: "beach / shore", meaningVi: "bãi biển / bờ", example: "Käymme rannalla kesällä.", exampleEn: "We go to the beach in summer.", category: "paikat" },
          { word: "kahvila", partOfSpeech: "noun", meaningEn: "café", meaningVi: "quán cà phê", example: "Tapaamme kahvilassa.", exampleEn: "We meet at the café.", category: "paikat" },
          { word: "puisto", partOfSpeech: "noun", meaningEn: "park", meaningVi: "công viên", example: "Lapset leikkivät puistossa.", exampleEn: "The kids play in the park.", category: "paikat" },
          { word: "kirjasto", partOfSpeech: "noun", meaningEn: "library", meaningVi: "thư viện", example: "Opiskelen kirjastossa.", exampleEn: "I study at the library.", category: "paikat" },
          { word: "tori", partOfSpeech: "noun", meaningEn: "market square", meaningVi: "quảng trường chợ", example: "Torilla on paljon ihmisiä.", exampleEn: "There are many people at the market.", category: "paikat" },
        ],
        exercises: [],
        quiz: [
          { question: "'Olen kaupassa' tarkoittaa…", options: ["Tôi đến cửa hàng", "Tôi đang ở cửa hàng", "Tôi từ cửa hàng về", "Tôi rời cửa hàng"], answer: 1, explanation: "-ssa = inessive (ở bên trong)." },
          { question: "Käännös: 'I'm going to the school.'", options: ["Olen koulussa.", "Tulen koulusta.", "Menen kouluun.", "Olen koululla."], answer: 2, explanation: "Movement into → illative -Vn." },
          { question: "Mikä sija on '-lta'?", options: ["adessive", "ablative", "allative", "elative"], answer: 1, explanation: "-lta/-ltä = ablative (từ trên xuống)." },
          { question: "Käännös: 'The book is on the table.'", options: ["Kirja on pöydässä.", "Kirja on pöydällä.", "Kirja on pöydälle.", "Kirja on pöydältä."], answer: 1, explanation: "Pinta → adessive -lla." },
          { question: "Miten sanot 'I come from the café'?", options: ["Tulen kahvilaan.", "Olen kahvilassa.", "Tulen kahvilasta.", "Menen kahvilalle."], answer: 2, explanation: "From inside → elative -sta." },
        ],
      },

      // ───────── 3. Imperative ─────────
      {
        id: "a2-imperative",
        title: "Imperatiivi (käskymuoto)",
        titleEn: "Imperative",
        icon: "👉",
        level: "A2",
        theory: `### Imperatiivi - käskymuoto (Mệnh lệnh thức)

Dùng để **ra lệnh, hướng dẫn, mời, khuyên bảo**.

**1. Số ít (sinä)**: lấy gốc động từ ngôi *minä* hiện tại, bỏ *-n*.
- *minä luen → Lue!* (Đọc đi!)
- *minä syön → Syö!* (Ăn đi!)
- *minä menen → Mene!* (Đi đi!)

**2. Số nhiều / lịch sự (te)**: gốc động từ + **-kaa / -kää**.
- *Lukekaa!* (Các bạn đọc đi!)
- *Tulkaa sisään!* (Mời vào!)

**3. Phủ định**: *älä* (số ít) / *älkää* (số nhiều) + động từ.
- *Älä juokse!* (Đừng chạy!)
- *Älkää melutko!* (Đừng ồn ào!)

**Mẹo của thầy Hải:** Trong giao tiếp lịch sự, người Phần thường dùng **konditionaali** (*Voisitko…?*) thay imperatiivi - nghe mềm hơn.`,
        theoryEn: `### Imperative

Used for orders, instructions, invitations and advice. Singular = present *minä*-stem minus *-n*; plural/polite = stem + *-kaa/-kää*. Negation: *älä / älkää*.`,
        grammar: [
          {
            title: "Yksikön imperatiivi",
            titleEn: "Singular imperative",
            explanation: "Ota minä-muoto preesensissä, poista -n.",
            explanationEn: "Take the present minä-form and drop -n.",
            examples: [
              { finnish: "Tule tänne!", english: "Come here!" },
              { finnish: "Avaa ovi!", english: "Open the door!" },
              { finnish: "Istu alas.", english: "Sit down." },
            ],
          },
          {
            title: "Monikon ja kielto",
            titleEn: "Plural & negative imperative",
            explanation: "Pl. = vartalo + -kaa/-kää. Kielto = älä/älkää + verbi.",
            explanationEn: "Plural = stem + -kaa/-kää. Negative = älä/älkää + verb.",
            examples: [
              { finnish: "Kuunnelkaa tarkasti!", english: "Listen carefully (you all)!" },
              { finnish: "Älä unohda lippua.", english: "Don't forget the ticket." },
              { finnish: "Älkää koskeko maalaukseen.", english: "Don't touch the painting." },
            ],
          },
        ],
        vocabulary: [
          { word: "tulla", partOfSpeech: "verb", meaningEn: "to come", meaningVi: "đến", example: "Tule tänne!", exampleEn: "Come here!", category: "verbit" },
          { word: "mennä", partOfSpeech: "verb", meaningEn: "to go", meaningVi: "đi", example: "Mene kotiin.", exampleEn: "Go home.", category: "verbit" },
          { word: "kuunnella", partOfSpeech: "verb", meaningEn: "to listen", meaningVi: "nghe", example: "Kuuntele opettajaa!", exampleEn: "Listen to the teacher!", category: "verbit" },
          { word: "katsoa", partOfSpeech: "verb", meaningEn: "to look / watch", meaningVi: "xem", example: "Katso tänne!", exampleEn: "Look over here!", category: "verbit" },
          { word: "odottaa", partOfSpeech: "verb", meaningEn: "to wait", meaningVi: "đợi", example: "Odota hetki.", exampleEn: "Wait a moment.", category: "verbit" },
          { word: "kirjoittaa", partOfSpeech: "verb", meaningEn: "to write", meaningVi: "viết", example: "Kirjoita nimesi tähän.", exampleEn: "Write your name here.", category: "verbit" },
          { word: "muistaa", partOfSpeech: "verb", meaningEn: "to remember", meaningVi: "nhớ", example: "Muista passi!", exampleEn: "Remember your passport!", category: "verbit" },
          { word: "unohtaa", partOfSpeech: "verb", meaningEn: "to forget", meaningVi: "quên", example: "Älä unohda avaimia.", exampleEn: "Don't forget the keys.", category: "verbit" },
        ],
        exercises: [],
        quiz: [
          { question: "Imperatiivi sanasta 'lukea' (sinä)?", options: ["Luen!", "Lue!", "Lukekaa!", "Luet!"], answer: 1, explanation: "minä luen → Lue! (drop -n)." },
          { question: "Käännös: 'Don't run!' (sinä)", options: ["Älä juokse!", "Älkää juosko!", "En juokse.", "Et juokse!"], answer: 0, explanation: "Negative singular = älä + verb." },
          { question: "Monikon imperatiivin pääte on…", options: ["-n", "-t", "-kaa/-kää", "-isi"], answer: 2, explanation: "Plural imperative ending = -kaa/-kää." },
          { question: "Mikä lause on käsky?", options: ["Tulen kotiin.", "Tule kotiin!", "Tulisin kotiin.", "Olen kotona."], answer: 1, explanation: "Imperative = command form 'Tule!'" },
          { question: "Käännös: 'Listen carefully (you all)!'", options: ["Kuuntele tarkasti!", "Kuunnelkaa tarkasti!", "Älkää kuunnelko!", "Kuuntelen tarkasti."], answer: 1, explanation: "Plural imperative = kuunnelkaa." },
        ],
      },
    ],
  },
];
