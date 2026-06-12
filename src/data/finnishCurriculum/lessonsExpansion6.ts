// YKI B1 Finnish - Deepening grammar & expression (4 advanced lessons)
import type { FinnishModule } from "./types";

export const finnishLessonExpansion6Modules: FinnishModule[] = [
  {
    id: "yki-b1-deep",
    title: "B1 Syvätaso",
    titleEn: "B1 Deep Dive",
    icon: "🎓",
    color: "from-indigo-500 to-emerald-500",
    description: "Mielipide, passiivi, rektio ja sanaston rakentaminen B1-tasolle.",
    descriptionEn: "Opinion, passive voice, verb rections, and word-building for B1.",
    pillar: "lessons",
    lessons: [
      // ─────────────── 1. Mielipiteen ilmaiseminen ───────────────
      {
        id: "b1-opinion",
        title: "Mielipiteen ilmaiseminen",
        titleEn: "Expressing Opinions (Conditional -isi-)",
        icon: "🗣️",
        level: "A2",
        theory: `### Mielipiteen ilmaiseminen (Diễn đạt quan điểm)

Tiếng Phần Lan B1 đòi hỏi bạn nói được **ý kiến cá nhân** một cách lịch sự và có lập luận. Hai công cụ trung tâm:

**1. Mẫu mở đầu**
- *Minun mielestäni…* - Theo tôi…
- *Olen sitä mieltä, että…* - Tôi cho rằng…
- *Toisaalta… toisaalta…* - Một mặt… mặt khác…
- *Yhdyn täysin / olen eri mieltä* - Tôi đồng ý hoàn toàn / không đồng ý

**2. Konditionaali -isi- (Thể điều kiện)**
Dùng để nói lịch sự, đề xuất, giả định.
Cấu trúc: gốc động từ + **-isi-** + đuôi nhân xưng.

| Inf. | minä | sinä | hän |
|------|------|------|-----|
| sanoa | sanoisin | sanoisit | sanoisi |
| ostaa | ostaisin | ostaisit | ostaisi |
| voida | voisin | voisit | voisi |

Ví dụ: *Voisitko sanoa sen uudelleen?* - Bạn có thể nói lại không?`,
        theoryEn: `### Expressing Opinions

To reach B1 level, you must state your opinion clearly and politely. Use the conditional **-isi-** form to soften suggestions and disagreements.`,
        grammar: [
          {
            title: "Konditionaali - perusmuodostus",
            titleEn: "Conditional - formation",
            explanation: "Lisää -isi- vartaloon ja sitten persoonapääte (-n, -t, -mme, -tte, -vat).",
            explanationEn: "Add -isi- to the stem, then the personal ending.",
            examples: [
              { finnish: "Minä sanoisin niin.", english: "I would say so." },
              { finnish: "Voisitko auttaa minua?", english: "Could you help me?" },
              { finnish: "He ostaisivat uuden auton.", english: "They would buy a new car." },
            ],
          },
          {
            title: "Mielipiteen rakenteet",
            titleEn: "Opinion structures",
            explanation: "Käytä mielipidefraaseja perusteluineen (koska, sillä, siksi).",
            explanationEn: "Combine opinion phrases with reasons (because, therefore).",
            examples: [
              { finnish: "Minun mielestäni etätyö on hyvä, koska se säästää aikaa.", english: "In my opinion remote work is good because it saves time." },
              { finnish: "Olen eri mieltä, sillä se vähentää yhteistyötä.", english: "I disagree, because it reduces collaboration." },
            ],
          },
        ],
        vocabulary: [
          { word: "mielipide", partOfSpeech: "noun", ipa: "/ˈmielipide/", meaningEn: "opinion", meaningVi: "ý kiến", example: "Mikä on mielipiteesi?", exampleEn: "What's your opinion?", category: "opinion" },
          { word: "perustelu", partOfSpeech: "noun", meaningEn: "justification", meaningVi: "lập luận", example: "Anna hyvä perustelu.", exampleEn: "Give a good reason.", category: "opinion" },
          { word: "väittää", partOfSpeech: "verb", meaningEn: "to claim", meaningVi: "khẳng định", example: "Hän väittää tietävänsä.", exampleEn: "He claims he knows.", category: "opinion" },
          { word: "ehdottaa", partOfSpeech: "verb", meaningEn: "to suggest", meaningVi: "đề xuất", example: "Ehdotan kompromissia.", exampleEn: "I suggest a compromise.", category: "opinion" },
          { word: "vakuuttunut", partOfSpeech: "adjective", meaningEn: "convinced", meaningVi: "tin tưởng", example: "En ole vakuuttunut.", exampleEn: "I'm not convinced.", category: "opinion" },
          { word: "näkökulma", partOfSpeech: "noun", meaningEn: "perspective", meaningVi: "góc nhìn", example: "Ymmärrän näkökulmasi.", exampleEn: "I understand your perspective.", category: "opinion" },
          { word: "kompromissi", partOfSpeech: "noun", meaningEn: "compromise", meaningVi: "thoả hiệp", example: "Tehdään kompromissi.", exampleEn: "Let's compromise.", category: "opinion" },
          { word: "ratkaisu", partOfSpeech: "noun", meaningEn: "solution", meaningVi: "giải pháp", example: "Tämä on hyvä ratkaisu.", exampleEn: "This is a good solution.", category: "opinion" },
          { word: "korostaa", partOfSpeech: "verb", meaningEn: "to emphasize", meaningVi: "nhấn mạnh", example: "Haluan korostaa tätä.", exampleEn: "I want to emphasize this.", category: "opinion" },
          { word: "samaa mieltä", partOfSpeech: "phrase", meaningEn: "in agreement", meaningVi: "đồng ý", example: "Olen samaa mieltä.", exampleEn: "I agree.", category: "opinion" },
          { word: "eri mieltä", partOfSpeech: "phrase", meaningEn: "in disagreement", meaningVi: "không đồng ý", example: "Olen eri mieltä.", exampleEn: "I disagree.", category: "opinion" },
          { word: "rakentava", partOfSpeech: "adjective", meaningEn: "constructive", meaningVi: "mang tính xây dựng", example: "Anna rakentavaa palautetta.", exampleEn: "Give constructive feedback.", category: "opinion" },
        ],
        dialogues: [
          {
            situation: "Keskustelu etätyöstä",
            situationEn: "Discussion about remote work",
            lines: [
              { speaker: "Anna", finnish: "Minun mielestäni etätyö on tehokkaampaa kuin toimistotyö.", english: "In my opinion, remote work is more efficient than office work." },
              { speaker: "Mikko", finnish: "Olen osittain samaa mieltä, mutta tiimityö kärsii.", english: "I partly agree, but teamwork suffers." },
              { speaker: "Anna", finnish: "Voisimmeko sopia hybridimallista?", english: "Could we agree on a hybrid model?" },
              { speaker: "Mikko", finnish: "Se olisi hyvä kompromissi.", english: "That would be a good compromise." },
            ],
          },
          {
            situation: "Mielipide kaupungin liikenteestä",
            situationEn: "Opinion about city traffic",
            lines: [
              { speaker: "Liisa", finnish: "Mitä mieltä olet uudesta pyörätiestä?", english: "What do you think of the new bike lane?" },
              { speaker: "Pekka", finnish: "Olen sitä mieltä, että se parantaa turvallisuutta.", english: "I think it improves safety." },
              { speaker: "Liisa", finnish: "Toisaalta autoilijat valittavat ruuhkista.", english: "On the other hand drivers complain about congestion." },
            ],
          },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä konditionaalilla.",
            instructionEn: "Complete with the conditional form.",
            items: [
              { question: "Minä ___ (sanoa) niin.", answer: "sanoisin" },
              { question: "Sinä ___ (voida) auttaa minua?", answer: "voisit" },
              { question: "Hän ___ (ostaa) uuden auton.", answer: "ostaisi" },
              { question: "Me ___ (mennä) elokuviin.", answer: "menisimme" },
              { question: "Te ___ (haluta) kahvia?", answer: "haluaisitte" },
              { question: "He ___ (tulla) myöhemmin.", answer: "tulisivat" },
              { question: "___ (olla) hauskaa nähdä sinut.", answer: "olisi" },
              { question: "Mitä sinä ___ (tehdä) tilanteessa?", answer: "tekisit" },
              { question: "Minä ___ (lähteä) jo nyt.", answer: "lähtisin" },
              { question: "Hän ___ (matkustaa) maailman ympäri.", answer: "matkustaisi" },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Täydennä mielipidefraasit.",
            instructionEn: "Complete the opinion phrases.",
            items: [
              { question: "Minun ___, tämä on hyvä idea.", answer: "mielestäni" },
              { question: "Olen ___ mieltä kanssasi.", answer: "samaa" },
              { question: "Toisaalta on ___ arvostella nykytilannetta.", answer: "perusteltua" },
              { question: "En ole ___ tästä argumentista.", answer: "vakuuttunut" },
              { question: "Annan rakentavaa ___.", answer: "palautetta" },
              { question: "Yritetään löytää ___.", answer: "kompromissi" },
              { question: "Haluan ___ kestävän kehityksen merkitystä.", answer: "korostaa" },
              { question: "Ymmärrän ___, vaikka olen eri mieltä.", answer: "näkökulmasi" },
              { question: "Olen sitä ___, että ratkaisu toimii.", answer: "mieltä" },
              { question: "Ehdotan ___ tilalle.", answer: "kompromissia" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on konditionaalin tunnus?", options: ["-isi-", "-vat-", "-tta-", "-mme-"], answer: 0, explanation: "Konditionaalin merkki on -isi-." },
          { question: "Käännös: 'Could you help me?'", options: ["Voitko auttaa?", "Voisitko auttaa?", "Voit auttaa?", "Aut minua?"], answer: 1, explanation: "Konditionaali pehmentää pyyntöä." },
          { question: "'Minun mielestäni' = ?", options: ["I think", "In my opinion", "I want", "I know"], answer: 1, explanation: "Vakiintunut mielipidefraasi." },
          { question: "Mikä ilmaisee erimielisyyttä?", options: ["Samaa mieltä", "Eri mieltä", "Yhdyn", "Vakuuttunut"], answer: 1, explanation: "'Eri mieltä' = disagree." },
          { question: "Käännös: 'I would say so.'", options: ["Sanon niin.", "Sanoin niin.", "Sanoisin niin.", "Sanonut niin."], answer: 2, explanation: "Konditionaali yks. 1. persoona = sanoisin." },
          { question: "Mikä sopii: 'Hän ___ tulla huomenna.'", options: ["voi", "voisi", "voida", "voinut"], answer: 1, explanation: "Konditionaali = voisi." },
          { question: "Mikä ei ole mielipidefraasi?", options: ["Minun mielestäni", "Olen sitä mieltä", "Mielestäni", "Tervetuloa"], answer: 3, explanation: "'Tervetuloa' on tervehdys." },
          { question: "'Kompromissi' tarkoittaa…", options: ["thoả hiệp", "tranh cãi", "đồng ý", "phản đối"], answer: 0, explanation: "Kompromissi = compromise." },
        ],
      },

      // ─────────────── 2. Passiivi arjessa ───────────────
      {
        id: "b1-passiivi",
        title: "Passiivi arjessa",
        titleEn: "Passive in Everyday Use",
        icon: "🔄",
        level: "A2",
        theory: `### Passiivi (Thể bị động)

Passive Phần Lan dùng cực phổ biến, **không có chủ ngữ rõ ràng** - gần với "people / they / one" trong tiếng Anh, hoặc "người ta" tiếng Việt.

**1. Preesens (hiện tại)**
- Cấu trúc: vartalo + **-taan / -tään** (theo hài hoà nguyên âm).
- Ví dụ: *puhutaan* (người ta nói), *syödään* (người ta ăn).

**2. Imperfekti (quá khứ)**
- Cấu trúc: vartalo + **-ttiin / -ttiin**.
- Ví dụ: *puhuttiin*, *syötiin*.

**3. Käyttö (cách dùng)**
- Tin tức, hướng dẫn: *Suomessa puhutaan suomea.*
- Mời gọi: *Lähdetään!* (Đi nào!)
- Giảm tính cá nhân: *Tehdään se huomenna.*`,
        theoryEn: `### Finnish Passive Voice

The Finnish passive omits the subject. It corresponds to English "people / they / one". Present ends in -taan/-tään; past in -ttiin.`,
        grammar: [
          {
            title: "Preesens-passiivi",
            titleEn: "Present passive",
            explanation: "Pudota verbi-i-vartaloon -taan/-tään.",
            explanationEn: "Drop the personal ending and add -taan/-tään.",
            examples: [
              { finnish: "Suomessa puhutaan suomea.", english: "In Finland Finnish is spoken." },
              { finnish: "Kaupungissa rakennetaan paljon.", english: "A lot is being built in the city." },
              { finnish: "Lähdetään kotiin!", english: "Let's go home!" },
            ],
          },
          {
            title: "Imperfekti-passiivi",
            titleEn: "Past passive",
            explanation: "Lisää -ttiin/-ttiin verbin vartaloon.",
            explanationEn: "Add -ttiin to the stem.",
            examples: [
              { finnish: "Eilen syötiin pizzaa.", english: "Yesterday pizza was eaten." },
              { finnish: "Talo rakennettiin vuonna 1995.", english: "The house was built in 1995." },
            ],
          },
        ],
        vocabulary: [
          { word: "passiivi", partOfSpeech: "noun", meaningEn: "passive", meaningVi: "thể bị động", example: "Passiivi on yleinen suomessa.", exampleEn: "Passive is common in Finnish.", category: "grammar" },
          { word: "rakentaa", partOfSpeech: "verb", meaningEn: "to build", meaningVi: "xây dựng", example: "Talo rakennetaan nopeasti.", exampleEn: "The house is built quickly.", category: "verb" },
          { word: "valmistaa", partOfSpeech: "verb", meaningEn: "to manufacture", meaningVi: "sản xuất", example: "Autoja valmistetaan tehtaassa.", exampleEn: "Cars are made in the factory.", category: "verb" },
          { word: "järjestää", partOfSpeech: "verb", meaningEn: "to organize", meaningVi: "tổ chức", example: "Juhlat järjestetään lauantaina.", exampleEn: "The party is organized on Saturday.", category: "verb" },
          { word: "kirjoittaa", partOfSpeech: "verb", meaningEn: "to write", meaningVi: "viết", example: "Raportti kirjoitetaan englanniksi.", exampleEn: "The report is written in English.", category: "verb" },
          { word: "tehdä", partOfSpeech: "verb", meaningEn: "to do/make", meaningVi: "làm", example: "Tämä tehdään yhdessä.", exampleEn: "This is done together.", category: "verb" },
          { word: "syödä", partOfSpeech: "verb", meaningEn: "to eat", meaningVi: "ăn", example: "Pizzaa syödään perjantaisin.", exampleEn: "Pizza is eaten on Fridays.", category: "verb" },
          { word: "myydä", partOfSpeech: "verb", meaningEn: "to sell", meaningVi: "bán", example: "Liput myydään verkossa.", exampleEn: "Tickets are sold online.", category: "verb" },
          { word: "korjata", partOfSpeech: "verb", meaningEn: "to repair", meaningVi: "sửa chữa", example: "Auto korjataan huomenna.", exampleEn: "The car will be repaired tomorrow.", category: "verb" },
          { word: "siivota", partOfSpeech: "verb", meaningEn: "to clean", meaningVi: "dọn dẹp", example: "Asunto siivotaan viikoittain.", exampleEn: "The apartment is cleaned weekly.", category: "verb" },
          { word: "päättää", partOfSpeech: "verb", meaningEn: "to decide", meaningVi: "quyết định", example: "Päätös tehdään huomenna.", exampleEn: "The decision is made tomorrow.", category: "verb" },
          { word: "avata", partOfSpeech: "verb", meaningEn: "to open", meaningVi: "mở", example: "Kauppa avataan kello yhdeksän.", exampleEn: "The shop opens at 9.", category: "verb" },
        ],
        dialogues: [
          {
            situation: "Uutisten kuuntelu",
            situationEn: "Listening to the news",
            lines: [
              { speaker: "Toimittaja", finnish: "Helsingissä rakennetaan uutta metroa.", english: "A new metro is being built in Helsinki." },
              { speaker: "Toimittaja", finnish: "Hanke valmistuu vuonna 2030.", english: "The project will be completed in 2030." },
              { speaker: "Toimittaja", finnish: "Liput myydään HSL:n sovelluksessa.", english: "Tickets are sold in the HSL app." },
            ],
          },
          {
            situation: "Lähdetään yhdessä",
            situationEn: "Let's go together",
            lines: [
              { speaker: "Liisa", finnish: "Mennäänkö kahville?", english: "Shall we go for coffee?" },
              { speaker: "Pekka", finnish: "Hyvä idea, lähdetään!", english: "Good idea, let's go!" },
              { speaker: "Liisa", finnish: "Sitten käydään kirjastossa.", english: "Then we'll stop by the library." },
            ],
          },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Muuta verbi preesens-passiiviin.",
            instructionEn: "Change the verb to present passive.",
            items: [
              { question: "Suomessa ___ (puhua) suomea.", answer: "puhutaan" },
              { question: "Talo ___ (rakentaa) nopeasti.", answer: "rakennetaan" },
              { question: "Kirjoja ___ (lukea) joka päivä.", answer: "luetaan" },
              { question: "Pizzaa ___ (syödä) perjantaisin.", answer: "syödään" },
              { question: "Liput ___ (myydä) verkossa.", answer: "myydään" },
              { question: "Kahvia ___ (juoda) aamulla.", answer: "juodaan" },
              { question: "Tämä ___ (tehdä) yhdessä.", answer: "tehdään" },
              { question: "Asunto ___ (siivota) viikoittain.", answer: "siivotaan" },
              { question: "Päätös ___ (tehdä) huomenna.", answer: "tehdään" },
              { question: "Kauppa ___ (avata) yhdeksältä.", answer: "avataan" },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Muuta verbi imperfekti-passiiviin.",
            instructionEn: "Change to past passive.",
            items: [
              { question: "Eilen ___ (syödä) pizzaa.", answer: "syötiin" },
              { question: "Talo ___ (rakentaa) vuonna 1995.", answer: "rakennettiin" },
              { question: "Juhlat ___ (järjestää) lauantaina.", answer: "järjestettiin" },
              { question: "Liput ___ (myydä) loppuun nopeasti.", answer: "myytiin" },
              { question: "Päätös ___ (tehdä) eilen.", answer: "tehtiin" },
              { question: "Kahvia ___ (juoda) paljon.", answer: "juotiin" },
              { question: "Auto ___ (korjata) viime viikolla.", answer: "korjattiin" },
              { question: "Kirja ___ (kirjoittaa) kahdessa kuukaudessa.", answer: "kirjoitettiin" },
              { question: "Asunto ___ (siivota) perjantaina.", answer: "siivottiin" },
              { question: "Kauppa ___ (avata) eilen.", answer: "avattiin" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on preesens-passiivin tunnus?", options: ["-vat", "-taan/-tään", "-ttiin", "-nut"], answer: 1, explanation: "Preesens-passiivi = -taan/-tään." },
          { question: "Imperfekti-passiivin tunnus on…", options: ["-ttiin", "-taan", "-isi", "-vat"], answer: 0, explanation: "Imperfekti-passiivi = -ttiin." },
          { question: "Käännös 'Pizza is eaten on Fridays': ", options: ["Syömme pizzaa.", "Pizzaa syödään perjantaisin.", "Syö pizzaa!", "Pizzaa syötiin."], answer: 1, explanation: "Preesens-passiivi." },
          { question: "Mikä on 'lähdetään!' käännös?", options: ["Lähden.", "Let's go!", "He lähtevät.", "Lähti."], answer: 1, explanation: "Passiivin kannustusmuoto = let's." },
          { question: "Käännös: 'The house was built in 1995.'", options: ["Talo rakennetaan vuonna 1995.", "Talo rakennettiin vuonna 1995.", "Talo on rakentanut 1995.", "Talo rakentaa 1995."], answer: 1, explanation: "Imperfekti-passiivi = rakennettiin." },
          { question: "Mikä verbi on passiivissa?", options: ["puhun", "puhuu", "puhutaan", "puhui"], answer: 2, explanation: "puhutaan = passiivi." },
          { question: "'Tickets are sold online' = ?", options: ["Liput myydään verkossa.", "Myyn liput.", "Liput myivät.", "Osta liput!"], answer: 0, explanation: "Passiivin yleinen käyttö." },
          { question: "'Mennäänkö?' tarkoittaa…", options: ["Mennään!", "Đi nhé?", "Tôi đi.", "Đã đi."], answer: 1, explanation: "Kysyvä passiivi = Đi nhé?" },
        ],
      },

      // ─────────────── 3. Rektio-verbit ───────────────
      {
        id: "b1-rektio",
        title: "Rektio-verbit",
        titleEn: "Verb Rections (Case Government)",
        icon: "🧩",
        level: "A2",
        theory: `### Rektio (Quy luật cách của động từ)

Trong tiếng Phần Lan, mỗi động từ "ép" danh từ đi kèm phải ở **một cách (case) cụ thể** - gọi là *rektio*. Học rektio thuộc lòng là chìa khoá để nói đúng B1.

**Một số rektio quan trọng:**

| Verb | Rektio | Ví dụ |
|------|--------|-------|
| pitää | + elatiivi (-sta/-stä) | Pidän kahvi**sta**. |
| tykätä | + elatiivi | Tykkään suklaa**sta**. |
| rakastaa | + partitiivi | Rakastan sinu**a**. |
| odottaa | + partitiivi | Odotan kesä**ä**. |
| auttaa | + partitiivi | Autan ystävä**ä**. |
| kysyä | + ablatiivi (-lta/-ltä) | Kysyn opettaja**lta**. |
| puhua | + allatiivi (-lle) | Puhun isä**lle**. |
| uskoa | + illatiivi (-Vn) | Uskon Jumala**an**. |
| luottaa | + illatiivi | Luotan sinu**un**. |
| osallistua | + illatiivi | Osallistun kokoukse**en**. |`,
        theoryEn: `### Verb Rections - which case follows each verb

Each Finnish verb "governs" a specific case for its object. Learning rections by heart is essential for B1 fluency.`,
        grammar: [
          {
            title: "Tykätä + elatiivi",
            titleEn: "tykätä + elative",
            explanation: "Käytä -sta/-stä, kun ilmaiset mieltymystä.",
            explanationEn: "Use -sta/-stä to express liking.",
            examples: [
              { finnish: "Tykkään kahvista.", english: "I like coffee." },
              { finnish: "Pidän musiikista.", english: "I like music." },
            ],
          },
          {
            title: "Puhua + allatiivi vs partitiivi",
            titleEn: "puhua: to whom vs about what",
            explanation: "Puhua + allatiivi (-lle) = nói VỚI ai. Puhua + elatiivi = nói VỀ cái gì.",
            explanationEn: "puhua + -lle = talk TO someone. puhua + -sta/-stä = talk ABOUT something.",
            examples: [
              { finnish: "Puhun äidille.", english: "I talk to mom." },
              { finnish: "Puhun säästä.", english: "I talk about the weather." },
            ],
          },
        ],
        vocabulary: [
          { word: "tykätä", partOfSpeech: "verb", meaningEn: "to like (+elative)", meaningVi: "thích (+ -sta)", example: "Tykkään kahvista.", exampleEn: "I like coffee.", category: "rektio" },
          { word: "pitää", partOfSpeech: "verb", meaningEn: "to like (+elative)", meaningVi: "thích (+ -sta)", example: "Pidän musiikista.", exampleEn: "I like music.", category: "rektio" },
          { word: "rakastaa", partOfSpeech: "verb", meaningEn: "to love (+partitive)", meaningVi: "yêu (+ partitive)", example: "Rakastan sinua.", exampleEn: "I love you.", category: "rektio" },
          { word: "odottaa", partOfSpeech: "verb", meaningEn: "to wait (+partitive)", meaningVi: "chờ (+ partitive)", example: "Odotan kesää.", exampleEn: "I wait for summer.", category: "rektio" },
          { word: "auttaa", partOfSpeech: "verb", meaningEn: "to help (+partitive)", meaningVi: "giúp (+ partitive)", example: "Autan sinua.", exampleEn: "I help you.", category: "rektio" },
          { word: "kysyä", partOfSpeech: "verb", meaningEn: "to ask (+ablative)", meaningVi: "hỏi (+ -lta)", example: "Kysyn opettajalta.", exampleEn: "I ask the teacher.", category: "rektio" },
          { word: "puhua", partOfSpeech: "verb", meaningEn: "to talk (+allative)", meaningVi: "nói với (+ -lle)", example: "Puhun ystävälle.", exampleEn: "I talk to a friend.", category: "rektio" },
          { word: "uskoa", partOfSpeech: "verb", meaningEn: "to believe (+illative)", meaningVi: "tin vào (+ -Vn)", example: "Uskon itseeni.", exampleEn: "I believe in myself.", category: "rektio" },
          { word: "luottaa", partOfSpeech: "verb", meaningEn: "to trust (+illative)", meaningVi: "tin tưởng (+ -Vn)", example: "Luotan sinuun.", exampleEn: "I trust you.", category: "rektio" },
          { word: "osallistua", partOfSpeech: "verb", meaningEn: "to participate (+illative)", meaningVi: "tham gia (+ -Vn)", example: "Osallistun kurssille.", exampleEn: "I participate in the course.", category: "rektio" },
          { word: "muistuttaa", partOfSpeech: "verb", meaningEn: "to remind (+partitive)", meaningVi: "nhắc (+ partitive)", example: "Muistutan sinua tästä.", exampleEn: "I remind you of this.", category: "rektio" },
          { word: "vastata", partOfSpeech: "verb", meaningEn: "to answer (+illative)", meaningVi: "trả lời (+ -Vn)", example: "Vastaan kysymykseen.", exampleEn: "I answer the question.", category: "rektio" },
        ],
        dialogues: [
          {
            situation: "Mistä tykkäät?",
            situationEn: "What do you like?",
            lines: [
              { speaker: "Anna", finnish: "Mistä musiikista sinä tykkäät?", english: "What music do you like?" },
              { speaker: "Mikko", finnish: "Pidän jazzista ja rockista.", english: "I like jazz and rock." },
              { speaker: "Anna", finnish: "Minä taas tykkään klassisesta.", english: "I, on the other hand, like classical." },
            ],
          },
          {
            situation: "Kuka kysyy keneltä?",
            situationEn: "Who asks whom?",
            lines: [
              { speaker: "Opettaja", finnish: "Kysykää opettajalta, jos ette ymmärrä.", english: "Ask the teacher if you don't understand." },
              { speaker: "Oppilas", finnish: "Voinko kysyä sinulta yhden asian?", english: "Can I ask you one thing?" },
              { speaker: "Opettaja", finnish: "Tietysti, kysy vain.", english: "Of course, just ask." },
            ],
          },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä oikealla rektiolla.",
            instructionEn: "Complete with the correct case.",
            items: [
              { question: "Tykkään ___ (kahvi).", answer: "kahvista" },
              { question: "Pidän ___ (musiikki).", answer: "musiikista" },
              { question: "Rakastan ___ (sinä).", answer: "sinua" },
              { question: "Odotan ___ (kesä).", answer: "kesää" },
              { question: "Autan ___ (ystävä).", answer: "ystävää" },
              { question: "Kysyn ___ (opettaja).", answer: "opettajalta" },
              { question: "Puhun ___ (äiti).", answer: "äidille" },
              { question: "Uskon ___ (itse).", answer: "itseeni" },
              { question: "Luotan ___ (sinä).", answer: "sinuun" },
              { question: "Osallistun ___ (kokous).", answer: "kokoukseen" },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Erottele 'puhua + lle' vs 'puhua + sta'.",
            instructionEn: "Distinguish 'talk to' vs 'talk about'.",
            items: [
              { question: "Puhun ___ (äiti) puhelimessa.", answer: "äidille" },
              { question: "Puhumme ___ (sää) usein.", answer: "säästä" },
              { question: "Voinko puhua ___ (johtaja)?", answer: "johtajalle" },
              { question: "He puhuvat ___ (politiikka) iltaisin.", answer: "politiikasta" },
              { question: "Puhuin ___ (opettaja) eilen.", answer: "opettajalle" },
              { question: "Älä puhu ___ (raha) ruokapöydässä.", answer: "rahasta" },
              { question: "Vastaa ___ (kysymys), kiitos.", answer: "kysymykseen" },
              { question: "Muistutan sinua ___ (tämä asia).", answer: "tästä asiasta" },
              { question: "Hän osallistuu ___ (juhla).", answer: "juhliin" },
              { question: "Luotan ___ (tiimi) täysin.", answer: "tiimiin" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä rektio on verbillä 'tykätä'?", options: ["partitiivi", "elatiivi (-sta/-stä)", "allatiivi", "illatiivi"], answer: 1, explanation: "tykätä + -sta/-stä." },
          { question: "Mikä on oikein: 'Odotan ___ kesää.'", options: ["kesästä", "kesässä", "kesää", "kesälle"], answer: 2, explanation: "odottaa + partitiivi." },
          { question: "'Kysyn opettaja___.' Mikä pääte?", options: ["-lta", "-lle", "-sta", "-an"], answer: 0, explanation: "kysyä + ablatiivi -lta/-ltä." },
          { question: "'Luotan sinu___.'", options: ["-sta", "-lle", "-un", "-lta"], answer: 2, explanation: "luottaa + illatiivi -un." },
          { question: "Mikä on väärin?", options: ["Pidän kahvista.", "Rakastan sinua.", "Tykkään sinuun.", "Autan ystävää."], answer: 2, explanation: "tykätä + -sta, ei -un." },
          { question: "'Puhun äidille' = ?", options: ["nói về mẹ", "nói với mẹ", "nói chuyện", "không có mẹ"], answer: 1, explanation: "puhua + -lle = talk TO." },
          { question: "'Puhun säästä' = ?", options: ["nói với thời tiết", "nói về thời tiết", "trời nói", "không có thời tiết"], answer: 1, explanation: "puhua + -sta = talk ABOUT." },
          { question: "Mikä rektio on 'osallistua'-verbillä?", options: ["partitiivi", "elatiivi", "illatiivi (-Vn)", "ablatiivi"], answer: 2, explanation: "osallistua + illatiivi." },
        ],
      },

      // ─────────────── 4. Yhdyssanat ja sananmuodostus ───────────────
      {
        id: "b1-word-formation",
        title: "Yhdyssanat ja sananmuodostus",
        titleEn: "Compound Words & Word Formation",
        icon: "🧱",
        level: "A2",
        theory: `### Yhdyssanat (Từ ghép Phần Lan)

Tiếng Phần Lan **rất giỏi ghép từ** - ghép 2-3-4 từ lại để tạo từ mới. Quy tắc:

**1. Genetiivi-yhdyssana**
Từ thứ nhất ở **genetiivi (-n)**: *koulun + kirja → koulun kirja → koulukirja* (sách giáo khoa).

**2. Nominatiivi-yhdyssana**
Từ thứ nhất giữ nguyên nominatiivi: *kahvi + kuppi → kahvikuppi* (cốc cà phê).

**3. Sanavartalo + johdin (Hậu tố tạo từ)**
| Johdin | Merkitys | Esim. |
|--------|----------|-------|
| -ja/-jä | người làm | *opettaa → opettaja* |
| -ton/-tön | không có | *koti → koditon* |
| -llinen | có tính chất | *onni → onnellinen* |
| -us/-ys | trừu tượng hoá | *kaunis → kauneus* |
| -sto/-stö | tập hợp | *kirja → kirjasto* |

**Ví dụ thực tế:**
- *työ + paikka = työpaikka* (nơi làm việc)
- *liikenne + valo + t = liikennevalot* (đèn giao thông)
- *ympäristö + ystävä + llinen = ympäristöystävällinen* (thân thiện môi trường)`,
        theoryEn: `### Compound Words & Word Formation

Finnish loves stacking words. Two main types: genitive-compound (school's-book → koulukirja) and nominative-compound (coffee-cup → kahvikuppi). Suffixes like -ja, -ton, -llinen, -us, -sto build many new words.`,
        grammar: [
          {
            title: "Genetiivi-yhdyssana",
            titleEn: "Genitive compound",
            explanation: "Ensimmäinen osa on genetiivissä, kun se kuvaa 'kenen' tai 'minkä'.",
            explanationEn: "First part is genitive when it shows possession.",
            examples: [
              { finnish: "koulun + kirja → koulukirja", english: "school + book → schoolbook" },
              { finnish: "kaupungin + talo → kaupungintalo", english: "city + hall → city hall" },
              { finnish: "viikon + loppu → viikonloppu", english: "week + end → weekend" },
            ],
          },
          {
            title: "Johdokset",
            titleEn: "Derivational suffixes",
            explanation: "-ja tekijä, -ton 'ilman', -llinen 'jonkin täynnä', -us abstrakti, -sto kokoelma.",
            explanationEn: "-ja = doer, -ton = -less, -llinen = -ful, -us = abstract, -sto = collection.",
            examples: [
              { finnish: "opettaa → opettaja", english: "teach → teacher" },
              { finnish: "koti → koditon", english: "home → homeless" },
              { finnish: "kaunis → kauneus", english: "beautiful → beauty" },
              { finnish: "kirja → kirjasto", english: "book → library" },
            ],
          },
        ],
        vocabulary: [
          { word: "yhdyssana", partOfSpeech: "noun", meaningEn: "compound word", meaningVi: "từ ghép", example: "Suomessa on paljon yhdyssanoja.", exampleEn: "Finnish has many compounds.", category: "word-formation" },
          { word: "työpaikka", partOfSpeech: "noun", meaningEn: "workplace", meaningVi: "nơi làm việc", example: "Hänellä on uusi työpaikka.", exampleEn: "She has a new workplace.", category: "word-formation" },
          { word: "viikonloppu", partOfSpeech: "noun", meaningEn: "weekend", meaningVi: "cuối tuần", example: "Viikonloppu on pitkä.", exampleEn: "The weekend is long.", category: "word-formation" },
          { word: "kaupungintalo", partOfSpeech: "noun", meaningEn: "city hall", meaningVi: "toà thị chính", example: "Tapaamme kaupungintalolla.", exampleEn: "We meet at city hall.", category: "word-formation" },
          { word: "liikennevalot", partOfSpeech: "noun", meaningEn: "traffic lights", meaningVi: "đèn giao thông", example: "Pysähdy liikennevaloissa.", exampleEn: "Stop at the traffic lights.", category: "word-formation" },
          { word: "ympäristöystävällinen", partOfSpeech: "adjective", meaningEn: "eco-friendly", meaningVi: "thân thiện môi trường", example: "Tämä on ympäristöystävällinen tuote.", exampleEn: "This is an eco-friendly product.", category: "word-formation" },
          { word: "kirjasto", partOfSpeech: "noun", meaningEn: "library", meaningVi: "thư viện", example: "Käyn kirjastossa usein.", exampleEn: "I often go to the library.", category: "word-formation" },
          { word: "opettaja", partOfSpeech: "noun", meaningEn: "teacher", meaningVi: "giáo viên", example: "Opettaja on ystävällinen.", exampleEn: "The teacher is friendly.", category: "word-formation" },
          { word: "koditon", partOfSpeech: "adjective", meaningEn: "homeless", meaningVi: "vô gia cư", example: "Koditon ihminen tarvitsee apua.", exampleEn: "A homeless person needs help.", category: "word-formation" },
          { word: "onnellinen", partOfSpeech: "adjective", meaningEn: "happy", meaningVi: "hạnh phúc", example: "Olen onnellinen tänään.", exampleEn: "I'm happy today.", category: "word-formation" },
          { word: "kauneus", partOfSpeech: "noun", meaningEn: "beauty", meaningVi: "vẻ đẹp", example: "Luonnon kauneus on ainutlaatuista.", exampleEn: "Nature's beauty is unique.", category: "word-formation" },
          { word: "ystävyys", partOfSpeech: "noun", meaningEn: "friendship", meaningVi: "tình bạn", example: "Ystävyys on kallisarvoista.", exampleEn: "Friendship is precious.", category: "word-formation" },
        ],
        dialogues: [
          {
            situation: "Kirjastossa",
            situationEn: "At the library",
            lines: [
              { speaker: "Asiakas", finnish: "Missä kaunokirjallisuus on?", english: "Where is fiction located?" },
              { speaker: "Kirjastonhoitaja", finnish: "Toisessa kerroksessa, ikkunan vieressä.", english: "On the second floor, by the window." },
              { speaker: "Asiakas", finnish: "Onko teillä ympäristöystävällisistä tuotteista kirjoja?", english: "Do you have books on eco-friendly products?" },
            ],
          },
          {
            situation: "Työpaikkahaastattelu",
            situationEn: "Job interview",
            lines: [
              { speaker: "Haastattelija", finnish: "Miksi haet tätä työpaikkaa?", english: "Why are you applying for this job?" },
              { speaker: "Hakija", finnish: "Olen kiinnostunut ympäristönsuojelusta ja kestävästä kehityksestä.", english: "I'm interested in environmental protection and sustainable development." },
            ],
          },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Yhdistä kaksi sanaa yhdyssanaksi.",
            instructionEn: "Combine two words into one compound.",
            items: [
              { question: "työ + paikka = ___", answer: "työpaikka" },
              { question: "viikon + loppu = ___", answer: "viikonloppu" },
              { question: "kahvi + kuppi = ___", answer: "kahvikuppi" },
              { question: "koulun + kirja = ___", answer: "koulukirja" },
              { question: "liikenne + valot = ___", answer: "liikennevalot" },
              { question: "ravintola + lasku = ___", answer: "ravintolalasku" },
              { question: "kirja + sto = ___", answer: "kirjasto" },
              { question: "ympäristö + suojelu = ___", answer: "ympäristönsuojelu" },
              { question: "kaupungin + talo = ___", answer: "kaupungintalo" },
              { question: "lounas + ravintola = ___", answer: "lounasravintola" },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Muodosta sana johtimella.",
            instructionEn: "Form a word using a suffix.",
            items: [
              { question: "opettaa + -ja → ___", answer: "opettaja" },
              { question: "koti + -ton → ___", answer: "koditon" },
              { question: "onni + -llinen → ___", answer: "onnellinen" },
              { question: "kaunis + -us → ___", answer: "kauneus" },
              { question: "kirja + -sto → ___", answer: "kirjasto" },
              { question: "lukea + -ja → ___", answer: "lukija" },
              { question: "vapaa + -us → ___", answer: "vapaus" },
              { question: "raha + -ton → ___", answer: "rahaton" },
              { question: "ystävä + -llinen → ___", answer: "ystävällinen" },
              { question: "ystävä + -ys → ___", answer: "ystävyys" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on yhdyssana?", options: ["kirja", "kirjakauppa", "kirjat", "kirjoittaa"], answer: 1, explanation: "kirja + kauppa = yhdyssana." },
          { question: "'-ja/-jä' johdin tarkoittaa…", options: ["paikkaa", "tekijää", "kieltoa", "abstraktia"], answer: 1, explanation: "-ja = tekijä (doer)." },
          { question: "'koti' + '-ton' = ?", options: ["kodikkuus", "koditon", "kotitytö", "kotina"], answer: 1, explanation: "-ton = ilman → koditon (vô gia cư)." },
          { question: "'kaunis' → abstrakti?", options: ["kaunis", "kauneus", "kauniilla", "kauniisti"], answer: 1, explanation: "-us tekee abstraktin = kauneus." },
          { question: "'viikon + loppu' on…", options: ["nominatiivi-yhdyssana", "genetiivi-yhdyssana", "ei yhdyssana", "verbi"], answer: 1, explanation: "Genetiivi -n säilyy: viikonloppu." },
          { question: "'opettaja' tulee verbistä…", options: ["oppia", "opettaa", "opiskella", "osata"], answer: 1, explanation: "opettaa + -ja = opettaja." },
          { question: "Mikä ei ole yhdyssana?", options: ["työpaikka", "kahvikuppi", "kirjasto", "kaupungintalo"], answer: 2, explanation: "kirjasto on johdos (-sto), ei yhdyssana." },
          { question: "'-llinen' tarkoittaa…", options: ["ilman", "tekijä", "täynnä jotain", "paikka"], answer: 2, explanation: "-llinen = jonkin omaava." },
        ],
      },
    ],
  },
];
