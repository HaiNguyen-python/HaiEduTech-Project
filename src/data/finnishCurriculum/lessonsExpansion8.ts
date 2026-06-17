// YKI A2 Lessons - Expansion 8: Imperfekti, Omistus, Konditionaali, Partitive object, Locative cases, Time expressions
import type { FinnishModule } from "./types";

export const finnishLessonExpansion8Modules: FinnishModule[] = [
  {
    id: "yki-a2-perustaidot-2",
    title: "A2 Perustaidot 2",
    titleEn: "A2 Core Skills 2",
    icon: "📖",
    color: "from-emerald-500 to-teal-500",
    description: "Imperfekti (mennyt aika), omistusrakenne ja ehdollinen muoto.",
    descriptionEn: "Past tense (imperfekti), possession structure and conditional mood.",
    pillar: "lessons",
    lessons: [
      {
        id: "a2-imperfekti",
        title: "Imperfekti (mennyt aika)",
        titleEn: "Past tense (imperfekti)",
        icon: "⏪",
        level: "A2",
        theory: `### Imperfekti - thì quá khứ đơn

Dùng để kể chuyện đã xảy ra, viết nhật ký, kể về ngày hôm qua trong bài thi YKI.

**1. Quy tắc cơ bản:** thân động từ + **-i-** + đuôi nhân xưng.
- *puhua → puhuin* (tôi đã nói)
- *asua → asuin* (tôi đã sống)
- *opiskella → opiskelin* (tôi đã học)

**2. Biến đổi nguyên âm trước -i-:**
- *a / o / u* giữ nguyên: *anto-i → antoi* (đã cho)
- *e* biến mất: *luke-i → luki* (đã đọc)
- *aa → o*: *saa-i → sai* (đã nhận)

**3. Phủ định:** *ei + NUT-partisiippi*
- *Minä en mennyt kouluun.* (Tôi đã không đi học.)
- *Hän ei tullut juhliin.* (Anh ấy đã không đến tiệc.)

**Mẹo của thầy Hải:** Khi kể chuyện hôm qua, kết hợp *eilen, viikonloppuna, viime kesänä* để tăng độ tự nhiên.`,
        theoryEn: `### Imperfekti - simple past

Use to tell stories, write a diary, or answer YKI questions like "what did you do yesterday?". Stem + -i- + personal ending. Negation: ei + NUT-participle (en mennyt, et tullut...).`,
        grammar: [
          {
            title: "Myönteinen imperfekti",
            titleEn: "Affirmative past",
            explanation: "Vartalo + -i- + persoonapääte. Joskus vokaali muuttuu.",
            explanationEn: "Stem + -i- + personal ending; stem vowel sometimes changes.",
            examples: [
              { finnish: "Asuin Helsingissä viisi vuotta.", english: "I lived in Helsinki for five years." },
              { finnish: "Hän opiskeli yliopistossa.", english: "He studied at university." },
              { finnish: "Söimme illallista ravintolassa.", english: "We had dinner at a restaurant." },
            ],
          },
          {
            title: "Kielteinen imperfekti",
            titleEn: "Negative past",
            explanation: "ei + NUT-partisiippi (men-nyt, tul-lut, syö-nyt).",
            explanationEn: "ei + NUT-participle (men-nyt, tul-lut, syö-nyt).",
            examples: [
              { finnish: "En nähnyt häntä eilen.", english: "I didn't see him yesterday." },
              { finnish: "Emme menneet elokuviin.", english: "We didn't go to the cinema." },
              { finnish: "Hän ei tehnyt läksyjä.", english: "He didn't do the homework." },
            ],
          },
        ],
        vocabulary: [
          { word: "eilen", partOfSpeech: "adverb", meaningEn: "yesterday", meaningVi: "hôm qua", example: "Eilen oli kaunis päivä.", exampleEn: "Yesterday was a nice day.", category: "aika" },
          { word: "viikonloppu", partOfSpeech: "noun", meaningEn: "weekend", meaningVi: "cuối tuần", example: "Viikonloppuna lepäsin.", exampleEn: "I rested over the weekend.", category: "aika" },
          { word: "viime vuonna", partOfSpeech: "phrase", meaningEn: "last year", meaningVi: "năm ngoái", example: "Viime vuonna kävin Lapissa.", exampleEn: "Last year I visited Lapland.", category: "aika" },
          { word: "matkustaa", partOfSpeech: "verb", meaningEn: "to travel", meaningVi: "đi du lịch", example: "Matkustin Tukholmaan.", exampleEn: "I travelled to Stockholm.", category: "verbit" },
          { word: "tavata", partOfSpeech: "verb", meaningEn: "to meet", meaningVi: "gặp", example: "Tapasin vanhan ystävän.", exampleEn: "I met an old friend.", category: "verbit" },
          { word: "soittaa", partOfSpeech: "verb", meaningEn: "to call / play", meaningVi: "gọi / chơi nhạc", example: "Soitin äidille eilen.", exampleEn: "I called mum yesterday.", category: "verbit" },
        ],
        exercises: [],
        quiz: [
          { question: "Imperfekti sanasta 'puhua' (minä)?", options: ["puhuin", "puhun", "puhuisin", "puhunut"], answer: 0, explanation: "puhua → puhu + i + n = puhuin." },
          { question: "Käännös: 'I didn't go to school.'", options: ["En mene kouluun.", "En mennyt kouluun.", "Ei mene kouluun.", "Olin koulussa."], answer: 1, explanation: "Negative past = en + mennyt." },
          { question: "Imperfekti sanasta 'lukea' (hän)?", options: ["lukee", "luki", "lukenut", "lukisi"], answer: 1, explanation: "lukea: e katoaa ennen -i- → luki." },
          { question: "Käännös: 'We ate dinner.'", options: ["Syömme illallista.", "Söimme illallista.", "Söisimme illallista.", "Olemme syöneet."], answer: 1, explanation: "syödä → söimme (we ate)." },
          { question: "Imperfekti sanasta 'saada' (he)?", options: ["saavat", "saivat", "saaneet", "saisivat"], answer: 1, explanation: "saa- → sai-, monikko 3. = saivat." },
        ],
      },
      {
        id: "a2-omistus",
        title: "Omistusrakenne ('minulla on')",
        titleEn: "Possession ('I have')",
        icon: "🤲",
        level: "A2",
        theory: `### Minulla on - cấu trúc sở hữu

Tiếng Phần Lan **không có động từ "to have"**. Sở hữu được diễn tả bằng *adessive (-lla/-llä) + on*.

**Khẳng định:** *Minulla on auto.* (Tôi có một chiếc xe.)
**Phủ định:** *Minulla ei ole autoa.* (Tôi không có xe → autoa = partitive!)
**Câu hỏi:** *Onko sinulla aikaa?* (Bạn có thời gian không?)

**Đại từ ở dạng adessive:**
| Người | Dạng |
|-------|------|
| minä | minulla |
| sinä | sinulla |
| hän | hänellä |
| me | meillä |
| te | teillä |
| he | heillä |

**Mẹo của thầy Hải:** Khi phủ định "có", **tân ngữ chuyển sang partitive** - đây là lỗi rất phổ biến trong bài viết YKI.`,
        theoryEn: `### Possession ('to have')

Finnish has no verb 'to have'. Use adessive case + on: 'Minulla on…' (literally 'on me is…'). Negative form takes a partitive object: 'Minulla ei ole autoa'.`,
        grammar: [
          {
            title: "Myönteinen omistus",
            titleEn: "Affirmative",
            explanation: "Henkilö-lla/-llä + on + esine (nominative).",
            explanationEn: "Person-lla/-llä + on + thing (nominative).",
            examples: [
              { finnish: "Minulla on koira.", english: "I have a dog." },
              { finnish: "Hänellä on uusi puhelin.", english: "She has a new phone." },
              { finnish: "Meillä on kaksi lasta.", english: "We have two children." },
            ],
          },
          {
            title: "Kielteinen omistus",
            titleEn: "Negative possession",
            explanation: "Henkilö-lla/-llä + ei ole + partitive!",
            explanationEn: "Person-lla/-llä + ei ole + partitive object.",
            examples: [
              { finnish: "Minulla ei ole autoa.", english: "I don't have a car." },
              { finnish: "Hänellä ei ole aikaa.", english: "He doesn't have time." },
              { finnish: "Meillä ei ole rahaa.", english: "We don't have money." },
            ],
          },
        ],
        vocabulary: [
          { word: "auto", partOfSpeech: "noun", meaningEn: "car", meaningVi: "xe hơi", example: "Minulla on punainen auto.", exampleEn: "I have a red car.", category: "esineet" },
          { word: "aikaa", partOfSpeech: "noun (partitive)", meaningEn: "time", meaningVi: "thời gian", example: "Onko sinulla aikaa?", exampleEn: "Do you have time?", category: "abstrakti" },
          { word: "lapsi", partOfSpeech: "noun", meaningEn: "child", meaningVi: "đứa con", example: "Meillä on kolme lasta.", exampleEn: "We have three children.", category: "perhe" },
          { word: "asunto", partOfSpeech: "noun", meaningEn: "apartment", meaningVi: "căn hộ", example: "Hänellä on iso asunto.", exampleEn: "She has a big apartment.", category: "asuminen" },
          { word: "ystävä", partOfSpeech: "noun", meaningEn: "friend", meaningVi: "bạn", example: "Minulla on monta ystävää.", exampleEn: "I have many friends.", category: "ihmiset" },
        ],
        exercises: [],
        quiz: [
          { question: "Käännös: 'I have a cat.'", options: ["Minä on kissa.", "Minulla on kissa.", "Minä omistan kissan.", "Minulle on kissa."], answer: 1, explanation: "Possession = minulla + on." },
          { question: "Käännös: 'We don't have time.'", options: ["Meillä ei ole aikaa.", "Meillä ei ole aika.", "Me ei ole aikaa.", "Meillä on aikaa."], answer: 0, explanation: "Negative possession → partitive (aikaa)." },
          { question: "Mikä on adessiivin pääte?", options: ["-ssa/-ssä", "-lla/-llä", "-sta/-stä", "-lle"], answer: 1, explanation: "Adessive = -lla/-llä." },
          { question: "'Hänellä ___ uusi puhelin.'", options: ["on", "ovat", "ole", "olen"], answer: 0, explanation: "Affirmative possession uses 'on'." },
          { question: "Käännös: 'Do you (sg) have a brother?'", options: ["Sinulla on veli?", "Onko sinulla veli?", "Onko sinulla veljeä?", "Sinä on veli?"], answer: 1, explanation: "Question: Onko + adessive + nominative object." },
        ],
      },
      {
        id: "a2-konditionaali",
        title: "Konditionaali (muoto -isi-)",
        titleEn: "Conditional mood (-isi-)",
        icon: "🌗",
        level: "A2",
        theory: `### Konditionaali - "sẽ / sẽ làm" lịch sự

Konditionaali diễn đạt **giả định, ước muốn, lời mời lịch sự**. Đây là dạng KHẲNG ĐỊNH của lịch sự — bắt buộc xuất hiện trong YKI Tala A2 khi đặt câu hỏi với người lạ.

**Cấu tạo:** Thân động từ + **-isi-** + đuôi nhân xưng.
- *puhua → puhuisin* (tôi sẽ nói)
- *ostaa → ostaisin* (tôi muốn mua)
- *mennä → menisin* (tôi sẽ đi)

**Biến đổi nguyên âm trước -isi-:** giống imperfekti.
- *aa → o*: *saa-isi → saisi* (sẽ nhận)
- *e biến mất*: *luke-isi → lukisi* (sẽ đọc)

**Phủ định:** *en/et/ei… + -isi-stem*
- *En tulisi tänne yksin.* (Tôi sẽ không đến đây một mình.)

**3 chức năng vàng:**
1. **Lịch sự:** *Haluaisin kahvia, kiitos.* (Tôi muốn 1 ly cà phê.)
2. **Giả định:** *Jos olisin rikas, matkustaisin maailmaa.* (Nếu giàu, tôi đi vòng thế giới.)
3. **Đề nghị:** *Voisitko auttaa minua?* (Bạn giúp tôi được không?)

**Mẹo của thầy Hải:** Trong YKI Tala A2 mục "ostostilanne" (mua hàng), KHÔNG nói *Haluan kahvia* — quá thẳng. Luôn dùng *Haluaisin* / *Saisinko* để giữ điểm lịch sự.`,
        theoryEn: `### Conditional - polite "would"

Stem + -isi- + personal ending. Express politeness ('Haluaisin kahvia' — I'd like coffee), hypotheticals (Jos olisin rikas…), and polite requests (Voisitko auttaa?). Required on YKI Tala A2 when asking strangers — using bare 'Haluan' loses politeness points.`,
        grammar: [
          {
            title: "Kohtelias pyyntö",
            titleEn: "Polite request",
            explanation: "Saisinko / Voisitko / Haluaisin — câu cửa miệng khi đến quầy.",
            explanationEn: "Saisinko / Voisitko / Haluaisin — go-to phrases at any counter.",
            examples: [
              { finnish: "Saisinko yhden kahvin?", english: "Could I get one coffee?" },
              { finnish: "Voisitko auttaa minua hetken?", english: "Could you help me for a moment?" },
              { finnish: "Haluaisin varata pöydän kahdelle.", english: "I'd like to book a table for two." },
            ],
          },
          {
            title: "Hypoteettinen lause (jos…)",
            titleEn: "Hypothetical clause (if…)",
            explanation: "Jos + konditionaali, päälause myös konditionaali.",
            explanationEn: "Jos + conditional, main clause also in conditional.",
            examples: [
              { finnish: "Jos minulla olisi aikaa, lukisin enemmän.", english: "If I had time, I'd read more." },
              { finnish: "Jos sataisi, jäisin kotiin.", english: "If it rained, I'd stay home." },
              { finnish: "Mitä tekisit, jos voittaisit lotossa?", english: "What would you do if you won the lottery?" },
            ],
          },
        ],
        vocabulary: [
          { word: "haluaisin", partOfSpeech: "verb (cond.)", meaningEn: "I would like", meaningVi: "tôi muốn (lịch sự)", example: "Haluaisin teetä, kiitos.", exampleEn: "I'd like tea, please.", category: "kohteliaisuus" },
          { word: "saisinko", partOfSpeech: "verb (cond. q.)", meaningEn: "may I have", meaningVi: "cho tôi xin", example: "Saisinko laskun?", exampleEn: "Could I have the bill?", category: "kohteliaisuus" },
          { word: "voisitko", partOfSpeech: "verb (cond. q.)", meaningEn: "could you", meaningVi: "bạn có thể …không", example: "Voisitko toistaa?", exampleEn: "Could you repeat?", category: "kohteliaisuus" },
          { word: "jos", partOfSpeech: "conjunction", meaningEn: "if", meaningVi: "nếu", example: "Jos sataisi, en menisi ulos.", exampleEn: "If it rained, I wouldn't go out.", category: "konjunktio" },
          { word: "ehkä", partOfSpeech: "adverb", meaningEn: "maybe", meaningVi: "có lẽ", example: "Ehkä menisin elokuviin.", exampleEn: "Maybe I'd go to the movies.", category: "adverbi" },
          { word: "mielellään", partOfSpeech: "adverb", meaningEn: "gladly", meaningVi: "vui lòng", example: "Tulisin mielelläni mukaan.", exampleEn: "I'd gladly come along.", category: "adverbi" },
        ],
        exercises: [],
        quiz: [
          { question: "Konditionaali sanasta 'puhua' (minä)?", options: ["puhun", "puhuin", "puhuisin", "puhunut"], answer: 2, explanation: "puhu + isi + n = puhuisin." },
          { question: "Käännös: 'Could I have a coffee?'", options: ["Haluan kahvin.", "Saisinko kahvin?", "Annatko kahvi?", "Olenko kahvin?"], answer: 1, explanation: "Polite request = Saisinko + accusative." },
          { question: "'Jos minulla ___ aikaa, lukisin enemmän.'", options: ["on", "oli", "olisi", "ollut"], answer: 2, explanation: "Hypothetical jos-clause needs conditional 'olisi'." },
          { question: "Konditionaali sanasta 'saada' (hän)?", options: ["saa", "sai", "saisi", "saanut"], answer: 2, explanation: "saa- + isi → sa-isi → 'saisi' (vowel reduction)." },
          { question: "Mikä on KOHTELIAIN tapa sanoa 'I want tea'?", options: ["Haluan teetä.", "Anna teetä!", "Haluaisin teetä, kiitos.", "Teetä!"], answer: 2, explanation: "Conditional + kiitos = most polite." },
        ],
      },
      {
        id: "a2-partitive-object",
        title: "Partitive object — khi nào dùng?",
        titleEn: "Partitive object — when to use",
        icon: "🍰",
        level: "A2",
        theory: `### Partitive object - 3 quy tắc vàng

Đối tượng (objekti) tiếng Phần Lan có 2 dạng: **akkusatiivi** (toàn bộ, hoàn thành) vs **partitiivi** (một phần, chưa hoàn thành). Sai partitive là lỗi nặng nhất YKI A2 Kirjoittaminen.

**3 trường hợp BẮT BUỘC dùng partitive:**

**1. Hành động chưa hoàn thành / đang diễn ra:**
- *Luen kirjaa.* (Tôi đang đọc sách — chưa xong)
- *Luin kirjan.* (Tôi đã đọc xong cuốn sách → akkusatiivi)

**2. Đại lượng không xác định / không đếm được:**
- *Juon kahvia.* (Tôi uống cà phê — bao nhiêu cũng được)
- *Ostan leipää.* (Tôi mua bánh mì)

**3. Sau câu phủ định — LUÔN LUÔN:**
- *En syö lihaa.* (Tôi không ăn thịt)
- *Hän ei osta autoa.* (Anh ấy không mua xe)

**Đuôi partitive:**
- Đuôi nguyên âm + *-a/-ä*: *kahvi → kahvia*, *leipä → leipää*
- Đuôi phụ âm + *-ta/-tä*: *perhe → perhettä*, *työ → työtä*
- Đuôi -i/-e + biến đổi: *vesi → vettä*, *kieli → kieltä*

**Mẹo của thầy Hải:** Sau các động từ cảm xúc (*rakastaa, vihata, odottaa, ajatella*) — LUÔN dùng partitive. *Rakastan sinua.* (Tôi yêu bạn — không bao giờ *sinun*.)`,
        theoryEn: `### When to use partitive object

Three mandatory cases: (1) ongoing/unfinished action, (2) indefinite quantity / mass nouns, (3) ALL negative sentences. Endings: -a/-ä, -ta/-tä, with stem changes for -i/-e nouns. Emotion verbs (rakastaa, vihata, odottaa) always take partitive.`,
        grammar: [
          {
            title: "Keskeneräinen toiminta",
            titleEn: "Unfinished action",
            explanation: "Luen kirjaa (chưa xong) vs Luin kirjan (đã xong).",
            explanationEn: "Luen kirjaa (still reading) vs Luin kirjan (finished).",
            examples: [
              { finnish: "Syön omenaa.", english: "I'm eating an apple (still going)." },
              { finnish: "Söin omenan.", english: "I ate the (whole) apple." },
              { finnish: "Kirjoitan kirjettä.", english: "I'm writing a letter." },
            ],
          },
          {
            title: "Kielteinen lause",
            titleEn: "Negative sentence",
            explanation: "Phủ định → partitive 100%.",
            explanationEn: "Negative → always partitive object.",
            examples: [
              { finnish: "En juo kahvia aamulla.", english: "I don't drink coffee in the morning." },
              { finnish: "Hän ei osta uutta autoa.", english: "He doesn't buy a new car." },
              { finnish: "Emme katso televisiota.", english: "We don't watch TV." },
            ],
          },
        ],
        vocabulary: [
          { word: "kahvia", partOfSpeech: "noun (part.)", meaningEn: "coffee", meaningVi: "cà phê (partitive)", example: "Juon kahvia.", exampleEn: "I drink coffee.", category: "ruoka" },
          { word: "vettä", partOfSpeech: "noun (part.)", meaningEn: "water", meaningVi: "nước", example: "Haluaisin vettä.", exampleEn: "I'd like water.", category: "ruoka" },
          { word: "leipää", partOfSpeech: "noun (part.)", meaningEn: "bread", meaningVi: "bánh mì", example: "Ostan leipää kaupasta.", exampleEn: "I buy bread at the shop.", category: "ruoka" },
          { word: "rakastaa", partOfSpeech: "verb", meaningEn: "to love (+part.)", meaningVi: "yêu (+ partitive)", example: "Rakastan sinua.", exampleEn: "I love you.", category: "verbit" },
          { word: "odottaa", partOfSpeech: "verb", meaningEn: "to wait for (+part.)", meaningVi: "chờ (+ partitive)", example: "Odotan bussia.", exampleEn: "I'm waiting for the bus.", category: "verbit" },
          { word: "ajatella", partOfSpeech: "verb", meaningEn: "to think of (+part.)", meaningVi: "nghĩ về (+ partitive)", example: "Ajattelen sinua.", exampleEn: "I think of you.", category: "verbit" },
        ],
        exercises: [],
        quiz: [
          { question: "Käännös: 'I'm reading a book.' (still ongoing)", options: ["Luen kirja.", "Luen kirjan.", "Luen kirjaa.", "Lukenut kirja."], answer: 2, explanation: "Ongoing action → partitive (kirjaa)." },
          { question: "Käännös: 'I don't drink milk.'", options: ["En juo maitoa.", "En juo maito.", "En juo maidon.", "Ei juon maitoa."], answer: 0, explanation: "Negative → ALWAYS partitive (maitoa)." },
          { question: "Mikä verbi vaatii AINA partitiiviobjektin?", options: ["mennä", "rakastaa", "ostaa", "lukea"], answer: 1, explanation: "rakastaa always takes partitive: rakastan sinua." },
          { question: "Käännös: 'I love you.'", options: ["Rakastan sinut.", "Rakastan sinun.", "Rakastan sinua.", "Rakastan sinulle."], answer: 2, explanation: "Emotion verbs → partitive: sinua." },
          { question: "Käännös: 'I'm waiting for the bus.'", options: ["Odotan bussi.", "Odotan bussin.", "Odotan bussia.", "Odotan bussille."], answer: 2, explanation: "odottaa + partitive = bussia." },
        ],
      },
      {
        id: "a2-paikallissijat",
        title: "Locative cases — ở / đi / đến (sisä- & ulkopaikallissijat)",
        titleEn: "Locative cases — inside / outside locations",
        icon: "🧭",
        level: "A2",
        theory: `### 6 locative cases - bản đồ vị trí Phần Lan

Tiếng Phần Lan có **6 sijaa** để diễn tả vị trí. Chia làm 2 nhóm: **bên trong** (sisä-) và **bên ngoài** (ulko-).

**SISÄ- (bên trong: trường, nhà, thành phố):**
| Hành động | Đuôi | Ví dụ |
|-----------|------|-------|
| Vào (mihin?) | **-an/-en/-in** (illatiivi) | menen koul**uun** |
| Ở trong (missä?) | **-ssa/-ssä** (inessiivi) | olen koul**ussa** |
| Ra khỏi (mistä?) | **-sta/-stä** (elatiivi) | tulen koul**usta** |

**ULKO- (bên ngoài: hồ, ga, làng, đảo):**
| Hành động | Đuôi | Ví dụ |
|-----------|------|-------|
| Lên/đến (mihin?) | **-lle** (allatiivi) | menen jär**velle** |
| Ở trên (missä?) | **-lla/-llä** (adessiivi) | olen jär**vellä** |
| Rời khỏi (mistä?) | **-lta/-ltä** (ablatiivi) | tulen jär**veltä** |

**Khi nào sisä, khi nào ulko?**
- **SISÄ** — toà nhà có 4 vách, thành phố, đất nước: *koulussa, talossa, Helsingissä, Suomessa*
- **ULKO** — bề mặt mở, sự kiện ngoài trời: *kadulla, juhlissa, asemalla, työllä*

**Ngoại lệ phổ biến cần học thuộc:**
- *aamulla, illalla, kesällä* (sáng/tối/mùa hè — dùng adessive cho thời gian)
- *Venäjällä, Suomenlinnassa* (Russia — adessive vì là "trên mặt đất rộng")

**Mẹo của thầy Hải:** YKI A2 Lukeminen luôn có 1 câu "Missä asut?" — trả lời PHẢI có *-ssa/-ssä* (*Asun Vantaalla* SAI vì Vantaa là thành phố → *Asun Vantaalla* thực tế đúng, vì Vantaa thuộc nhóm ngoại lệ ulko). Học thuộc 20 địa danh ngoại lệ.`,
        theoryEn: `### Six locative cases

Inside group (sisä-): illative -an/-en/-in (into), inessive -ssa/-ssä (in), elative -sta/-stä (out of). Outside group (ulko-): allative -lle (onto), adessive -lla/-llä (on/at), ablative -lta/-ltä (off). Use sisä- for enclosed spaces and most cities; ulko- for open surfaces, events, and a list of exceptional places (Vantaa, Tampere, Venäjä).`,
        grammar: [
          {
            title: "Sisäpaikallissijat",
            titleEn: "Inside cases",
            explanation: "Toà nhà, phòng, thành phố lớn: -ssa/-ssä, -sta/-stä, -an.",
            explanationEn: "Buildings, rooms, most big cities use the inside set.",
            examples: [
              { finnish: "Menen kauppaan.", english: "I go to the shop." },
              { finnish: "Olen kotona Helsingissä.", english: "I'm at home in Helsinki." },
              { finnish: "Tulen kirjastosta.", english: "I'm coming from the library." },
            ],
          },
          {
            title: "Ulkopaikallissijat",
            titleEn: "Outside cases",
            explanation: "Mặt phẳng mở, sự kiện, ngoại lệ: -lle, -lla/-llä, -lta/-ltä.",
            explanationEn: "Open surfaces, events, exceptions: -lle, -lla/-llä, -lta/-ltä.",
            examples: [
              { finnish: "Menen asemalle.", english: "I go to the station." },
              { finnish: "Lapset ovat pihalla.", english: "The kids are in the yard." },
              { finnish: "Tulin juuri töistä.", english: "I just came from work." },
            ],
          },
        ],
        vocabulary: [
          { word: "kotona", partOfSpeech: "adv. (loc.)", meaningEn: "at home", meaningVi: "ở nhà", example: "Olen kotona koko päivän.", exampleEn: "I'm home all day.", category: "paikka" },
          { word: "töissä", partOfSpeech: "adv. (iness.)", meaningEn: "at work", meaningVi: "đang làm việc", example: "Mies on töissä Espoossa.", exampleEn: "My husband works in Espoo.", category: "paikka" },
          { word: "ulkona", partOfSpeech: "adv.", meaningEn: "outside", meaningVi: "bên ngoài", example: "Lapset leikkivät ulkona.", exampleEn: "The kids play outside.", category: "paikka" },
          { word: "asemalla", partOfSpeech: "noun (adess.)", meaningEn: "at the station", meaningVi: "tại nhà ga", example: "Tavataan asemalla klo 8.", exampleEn: "Let's meet at the station at 8.", category: "paikka" },
          { word: "kaupasta", partOfSpeech: "noun (elat.)", meaningEn: "from the shop", meaningVi: "từ cửa hàng", example: "Ostin maitoa kaupasta.", exampleEn: "I bought milk from the shop.", category: "paikka" },
          { word: "kirjastoon", partOfSpeech: "noun (illat.)", meaningEn: "to the library", meaningVi: "tới thư viện", example: "Menen kirjastoon iltapäivällä.", exampleEn: "I go to the library this afternoon.", category: "paikka" },
        ],
        exercises: [],
        quiz: [
          { question: "Käännös: 'I go to the shop.'", options: ["Menen kauppa.", "Menen kauppaan.", "Menen kaupassa.", "Menen kaupalla."], answer: 1, explanation: "mihin? → illative: kauppaan." },
          { question: "Käännös: 'I'm at the station.'", options: ["Olen asemassa.", "Olen asemalla.", "Olen asemalle.", "Olen asemasta."], answer: 1, explanation: "asema is an ULKO exception → adessive 'asemalla'." },
          { question: "Käännös: 'I come from the library.'", options: ["Tulen kirjasto.", "Tulen kirjastoon.", "Tulen kirjastossa.", "Tulen kirjastosta."], answer: 3, explanation: "mistä? → elative: kirjastosta." },
          { question: "Mikä on ADESSIIVIN pääte?", options: ["-ssa/-ssä", "-lla/-llä", "-an/-en", "-sta/-stä"], answer: 1, explanation: "Adessive = -lla/-llä." },
          { question: "Käännös: 'The kids are outside.'", options: ["Lapset ovat ulkona.", "Lapset ovat ulkoon.", "Lapset ovat ulko.", "Lapset ovat ulosta."], answer: 0, explanation: "Static location 'outside' = ulkona (essive form, fixed)." },
        ],
      },
      {
        id: "a2-ajan-ilmaisut",
        title: "Diễn đạt thời gian (klo, viikonpäivät, kuukaudet)",
        titleEn: "Time expressions (clock, weekdays, months)",
        icon: "🕒",
        level: "A2",
        theory: `### Ajan ilmaisut - bản đồ thời gian YKI A2

Thời gian là **chủ đề bắt buộc** trong YKI A2 Tala — đặt lịch hẹn, hỏi giờ tàu, mô tả thói quen.

**1. Giờ (klo / kello):**
- *Kello on yksi.* (1:00)
- *Kello on viisitoista yli kaksi.* (2:15 — 15 phút hơn 2)
- *Kello on puoli kolme.* (2:30 — nửa BA, KHÔNG phải nửa hai!)
- *Kello on varttia vaille neljä.* (3:45 — 15 phút tới 4)

⚠️ **Bẫy quan trọng:** *puoli kolme* = 2:30, không phải 3:30! "Nửa" nghĩa là "nửa đến" giờ tiếp theo.

**2. Vào lúc mấy giờ — adessive *-lta*:**
- *Tapaan sinut **kello kahdeksalta** illalla.* (Tôi gặp bạn lúc 8 giờ tối.)

**3. Thứ trong tuần — adessive *-na*:**
- maanantai → **maanantaina** (vào thứ Hai)
- tiistai → tiistaina
- perjantai → perjantaina
- viikonloppu → **viikonloppuna** (vào cuối tuần)

**4. Tháng — inessive *-ssa/-ssä*:**
- tammikuu → **tammikuussa** (vào tháng 1)
- kesäkuu → kesäkuussa (tháng 6)
- joulukuu → joulukuussa (tháng 12)

**5. Mùa — adessive *-lla/-llä*:**
- kevät → **keväällä** (mùa xuân)
- kesä → kesällä, syksy → syksyllä, talvi → talvella

**Mẹo của thầy Hải:** Trong YKI A2 Tala, khi hỏi giờ tàu, KHÔNG bao giờ nói "klo 2 ja 30 minuuttia" — phải nói "puoli kolme" mới điểm A2. Học thuộc 6 cách nói giờ.`,
        theoryEn: `### Time expressions

Clock: 'puoli kolme' = 2:30 (half TO the next hour — common trap). Weekdays take essive -na (maanantaina). Months take inessive -ssa/-ssä (tammikuussa). Seasons take adessive -lla/-llä (keväällä). "At [time]" uses ablative -lta (kello kahdeksalta).`,
        grammar: [
          {
            title: "Kello (clock)",
            titleEn: "Telling time",
            explanation: "puoli + seuraava tunti — half + NEXT hour, never current.",
            explanationEn: "puoli + NEXT hour — never the current one.",
            examples: [
              { finnish: "Kello on puoli yhdeksän.", english: "It's half past eight (= 8:30)." },
              { finnish: "Tavataan kello seitsemältä.", english: "Let's meet at seven o'clock." },
              { finnish: "Juna lähtee varttia yli kuusi.", english: "The train leaves at quarter past six." },
            ],
          },
          {
            title: "Viikonpäivät & kuukaudet",
            titleEn: "Weekdays & months",
            explanation: "Päivät: -na. Kuukaudet: -ssa. Vuodenajat: -lla.",
            explanationEn: "Days: -na. Months: -ssa/-ssä. Seasons: -lla/-llä.",
            examples: [
              { finnish: "Käyn salilla maanantaina ja torstaina.", english: "I go to the gym on Mondays and Thursdays." },
              { finnish: "Syntymäpäiväni on heinäkuussa.", english: "My birthday is in July." },
              { finnish: "Suomessa on kylmää talvella.", english: "It's cold in Finland in winter." },
            ],
          },
        ],
        vocabulary: [
          { word: "puoli", partOfSpeech: "noun", meaningEn: "half (to next hour)", meaningVi: "nửa (đến giờ tiếp theo)", example: "Kello on puoli kuusi.", exampleEn: "It's 5:30.", category: "aika" },
          { word: "vartti", partOfSpeech: "noun", meaningEn: "a quarter", meaningVi: "15 phút", example: "Vartti yli yhdeksän.", exampleEn: "Quarter past nine.", category: "aika" },
          { word: "maanantaina", partOfSpeech: "adv. (essive)", meaningEn: "on Monday", meaningVi: "vào thứ Hai", example: "Tapaamme maanantaina.", exampleEn: "We meet on Monday.", category: "viikonpäivä" },
          { word: "viikonloppuna", partOfSpeech: "adv. (essive)", meaningEn: "at the weekend", meaningVi: "cuối tuần", example: "Lepään viikonloppuna.", exampleEn: "I rest at the weekend.", category: "aika" },
          { word: "tammikuussa", partOfSpeech: "noun (iness.)", meaningEn: "in January", meaningVi: "vào tháng 1", example: "Sataa lunta tammikuussa.", exampleEn: "It snows in January.", category: "kuukausi" },
          { word: "kesällä", partOfSpeech: "adv. (adess.)", meaningEn: "in summer", meaningVi: "vào mùa hè", example: "Kesällä on lämmintä.", exampleEn: "It's warm in summer.", category: "vuodenaika" },
        ],
        exercises: [],
        quiz: [
          { question: "Mikä kello on 'puoli kahdeksan'?", options: ["7:30", "8:30", "7:00", "8:00"], answer: 0, explanation: "puoli + NEXT hour: puoli kahdeksan = half to 8 = 7:30." },
          { question: "Käännös: 'on Monday'", options: ["maanantai", "maanantaina", "maanantaissa", "maanantailla"], answer: 1, explanation: "Days of week → essive '-na'." },
          { question: "Käännös: 'in July'", options: ["heinäkuu", "heinäkuuna", "heinäkuussa", "heinäkuulla"], answer: 2, explanation: "Months → inessive '-ssa/-ssä'." },
          { question: "Käännös: 'in winter'", options: ["talvi", "talvena", "talvessa", "talvella"], answer: 3, explanation: "Seasons → adessive '-lla/-llä'." },
          { question: "Käännös: 'Let's meet at 7.'", options: ["Tavataan kello seitsemän.", "Tavataan kello seitsemältä.", "Tavataan kello seitsemässä.", "Tavataan kello seitsemään."], answer: 1, explanation: "AT [time] → ablative '-lta/-ltä': seitsemältä." },
        ],
      },
    ],
  },
];
