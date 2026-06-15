// YKI A2 Lessons - Expansion 8: Past tense (imperfekti) & Possession ('minulla on')
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
    ],
  },
];
