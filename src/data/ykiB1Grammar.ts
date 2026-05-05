/**
 * @file ykiB1Grammar.ts
 * @description YKI B1 (Keskitaso) essential grammar bank organized into modules.
 * @author Teacher Hai (HaiEduTech)
 */

export interface B1GrammarExample {
  fi: string;
  en: string;
  vi: string;
}

export interface B1GrammarPoint {
  id: string;
  titleFi: string;
  titleEn: string;
  titleVi: string;
  emoji: string;
  explanationFi: string;
  explanationEn: string;
  explanationVi: string;
  formula?: string;
  examples: B1GrammarExample[];
  teacherTipVi: string;
  teacherTipEn: string;
}

export interface B1GrammarModule {
  id: string;
  emoji: string;
  titleFi: string;
  titleEn: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  points: B1GrammarPoint[];
}

const cases: B1GrammarPoint[] = [
  {
    id: "g-partitive",
    emoji: "🧩",
    titleFi: "Partitiivi",
    titleEn: "Partitive case",
    titleVi: "Cách Partitive (-a/-ä, -ta/-tä)",
    explanationFi: "Käytä partitiivia osittaiseen kohteeseen, määrään, tunteen kohteeseen ja kieltolauseessa.",
    explanationEn: "Use the partitive for partial objects, quantities, emotions, and in negative sentences.",
    explanationVi: "Dùng partitive cho đối tượng từng phần, số lượng, đối tượng cảm xúc, và câu phủ định.",
    formula: "noun + -a/-ä  |  -ta/-tä  |  -tta/-ttä",
    examples: [
      { fi: "Juon kahvia joka aamu.", en: "I drink coffee every morning.", vi: "Tôi uống cà phê mỗi sáng." },
      { fi: "En syö lihaa.", en: "I don't eat meat.", vi: "Tôi không ăn thịt." },
      { fi: "Rakastan musiikkia.", en: "I love music.", vi: "Tôi yêu âm nhạc." },
    ],
    teacherTipEn: "After negation and feelings (rakastaa, vihata) → always partitive.",
    teacherTipVi: "Sau phủ định và động từ cảm xúc → luôn dùng partitive.",
  },
  {
    id: "g-genitive",
    emoji: "🔗",
    titleFi: "Genetiivi",
    titleEn: "Genitive case",
    titleVi: "Cách sở hữu Genitive (-n)",
    explanationFi: "Genetiivi ilmaisee omistusta, kokonaista kohdetta ja käytetään monien postpositioiden kanssa.",
    explanationEn: "Genitive shows possession, total objects, and is used with many postpositions.",
    explanationVi: "Genitive thể hiện sở hữu, đối tượng hoàn chỉnh, và đi với nhiều giới từ.",
    formula: "noun (vahva vartalo) + -n",
    examples: [
      { fi: "Tämä on Annan kirja.", en: "This is Anna's book.", vi: "Đây là sách của Anna." },
      { fi: "Ostin auton.", en: "I bought a/the car.", vi: "Tôi mua một chiếc xe." },
      { fi: "Pöydän alla on kissa.", en: "Under the table is a cat.", vi: "Dưới bàn có một con mèo." },
    ],
    teacherTipEn: "Total object = genitive (Ostin auton). Partial object = partitive (Ostin maitoa).",
    teacherTipVi: "Đối tượng trọn vẹn dùng genitive, từng phần dùng partitive.",
  },
  {
    id: "g-locals",
    emoji: "📍",
    titleFi: "Sisä- ja ulkopaikallissijat",
    titleEn: "Internal & external local cases",
    titleVi: "Cách chỉ vị trí (inessive/elative/illative & adessive/ablative/allative)",
    explanationFi: "Sisäpaikallissijat (-ssa, -sta, -Vn) = sisällä. Ulkopaikallissijat (-lla, -lta, -lle) = pinnalla / luona.",
    explanationEn: "Internal cases (-ssa, -sta, -Vn) = inside. External cases (-lla, -lta, -lle) = on surface / by.",
    explanationVi: "Cách trong (-ssa/-sta/-Vn) = bên trong. Cách ngoài (-lla/-lta/-lle) = trên bề mặt/cạnh.",
    formula: "in: -ssa/-sta/-Vn  ·  on/at: -lla/-lta/-lle",
    examples: [
      { fi: "Olen kaupassa. Tulen kaupasta. Menen kauppaan.", en: "I'm at the shop / from the shop / to the shop.", vi: "Tôi đang ở/ từ/ đến cửa hàng." },
      { fi: "Kirja on pöydällä.", en: "The book is on the table.", vi: "Cuốn sách trên bàn." },
      { fi: "Annan lahjan ystävälle.", en: "I give a gift to a friend.", vi: "Tôi tặng quà cho bạn." },
    ],
    teacherTipEn: "Cities: usually -ssa (Helsingissä), but rivers/lakes/some towns use -lla (Tampereella).",
    teacherTipVi: "Thành phố thường -ssa (Helsingissä), riêng vài nơi dùng -lla (Tampereella).",
  },
];

const tenses: B1GrammarPoint[] = [
  {
    id: "g-imperfect",
    emoji: "⏳",
    titleFi: "Imperfekti (mennyt aika)",
    titleEn: "Past tense (imperfect)",
    titleVi: "Thì quá khứ Imperfect",
    explanationFi: "Imperfektillä kerrotaan menneistä tapahtumista. Tunnusmerkki: -i- vartalon ja päätteen välissä.",
    explanationEn: "Imperfect tells past events. Marker: -i- between stem and ending.",
    explanationVi: "Thì quá khứ kể sự việc đã qua. Dấu hiệu: -i- giữa thân động từ và đuôi.",
    formula: "verb stem + i + person ending  (mennä → menin)",
    examples: [
      { fi: "Eilen menin kauppaan.", en: "Yesterday I went to the shop.", vi: "Hôm qua tôi đi siêu thị." },
      { fi: "Hän osti uuden auton.", en: "He bought a new car.", vi: "Anh ấy mua xe mới." },
      { fi: "Me asuimme Helsingissä.", en: "We lived in Helsinki.", vi: "Chúng tôi sống ở Helsinki." },
    ],
    teacherTipEn: "B1 examiners look for past tense — use it in writing & speaking to prove level.",
    teacherTipVi: "Giám khảo B1 luôn tìm thì quá khứ — phải dùng để chứng minh trình độ.",
  },
  {
    id: "g-perfect",
    emoji: "✅",
    titleFi: "Perfekti (olen tehnyt)",
    titleEn: "Perfect tense",
    titleVi: "Thì hoàn thành Perfect",
    explanationFi: "Perfektillä yhdistetään mennyt nykyhetkeen tai puhutaan kokemuksista.",
    explanationEn: "Perfect connects past to present, or talks about experiences.",
    explanationVi: "Hoàn thành nối quá khứ với hiện tại hoặc nói về kinh nghiệm.",
    formula: "olla (preesens) + NUT-partisiippi  (olen käynyt)",
    examples: [
      { fi: "Olen asunut Suomessa kaksi vuotta.", en: "I have lived in Finland for two years.", vi: "Tôi đã sống ở Phần Lan 2 năm." },
      { fi: "Oletko käynyt Lapissa?", en: "Have you been to Lapland?", vi: "Bạn từng đến Lapland chưa?" },
      { fi: "En ole nähnyt sitä elokuvaa.", en: "I haven't seen that film.", vi: "Tôi chưa xem phim đó." },
    ],
    teacherTipEn: "Use perfect for life experiences ('Olen käynyt…') in Speaking part 1.",
    teacherTipVi: "Dùng Perfect khi kể trải nghiệm ('Olen käynyt…') trong phần Speaking 1.",
  },
  {
    id: "g-conditional",
    emoji: "🌈",
    titleFi: "Konditionaali (-isi-)",
    titleEn: "Conditional mood",
    titleVi: "Thức điều kiện (-isi-)",
    explanationFi: "Konditionaalia käytetään toiveissa, kohteliaisuudessa ja hypoteettisissa tilanteissa.",
    explanationEn: "Conditional is used for wishes, politeness, and hypothetical situations.",
    explanationVi: "Conditional dùng cho mong ước, lịch sự, và tình huống giả định.",
    formula: "verb stem + isi + person ending  (mennä → menisin)",
    examples: [
      { fi: "Haluaisin kahvia, kiitos.", en: "I would like coffee, please.", vi: "Tôi muốn cà phê, cảm ơn." },
      { fi: "Jos olisi aikaa, matkustaisin.", en: "If I had time, I would travel.", vi: "Nếu có thời gian, tôi sẽ đi du lịch." },
      { fi: "Voisitko auttaa minua?", en: "Could you help me?", vi: "Bạn có thể giúp tôi không?" },
    ],
    teacherTipEn: "Always start polite requests with 'Voisitko…?' or 'Haluaisin…' — examiners reward politeness.",
    teacherTipVi: "Yêu cầu lịch sự luôn bắt đầu bằng 'Voisitko…?' hoặc 'Haluaisin…' — giám khảo thưởng điểm lịch sự.",
  },
];

const sentence: B1GrammarPoint[] = [
  {
    id: "g-koska",
    emoji: "🔁",
    titleFi: "Sivulauseet (että, koska, jos, kun)",
    titleEn: "Subordinate clauses",
    titleVi: "Mệnh đề phụ (että, koska, jos, kun)",
    explanationFi: "B1-tasolla yhdistä lauseita konjunktioilla, jotta puhe ja kirjoitus kuulostaa luonnolliselta.",
    explanationEn: "At B1, combine sentences with conjunctions for natural speech and writing.",
    explanationVi: "Ở B1, hãy nối các câu bằng liên từ để câu nghe tự nhiên hơn.",
    formula: "main clause + ,että / koska / jos / kun + sub clause",
    examples: [
      { fi: "Luulen, että huomenna sataa.", en: "I think it'll rain tomorrow.", vi: "Tôi nghĩ ngày mai trời mưa." },
      { fi: "En tullut, koska olin sairas.", en: "I didn't come because I was sick.", vi: "Tôi không đến vì bị ốm." },
      { fi: "Jos sinulla on aikaa, soita minulle.", en: "If you have time, call me.", vi: "Nếu rảnh, hãy gọi tôi." },
    ],
    teacherTipEn: "Pilkku always before että/koska/jos/kun in the middle of a sentence.",
    teacherTipVi: "Luôn có dấu phẩy trước että/koska/jos/kun ở giữa câu.",
  },
  {
    id: "g-passive",
    emoji: "🛠️",
    titleFi: "Passiivi",
    titleEn: "Passive voice",
    titleVi: "Thể bị động",
    explanationFi: "Suomen passiivi on yleinen 'me'/'ihmiset'-merkityksessä eikä mainitse tekijää.",
    explanationEn: "Finnish passive is common, meaning 'we'/'people', without naming an agent.",
    explanationVi: "Bị động tiếng Phần thường mang nghĩa 'chúng tôi'/'người ta', không nêu chủ thể.",
    formula: "verb stem + -taan/-tään  (syödä → syödään)",
    examples: [
      { fi: "Suomessa syödään paljon ruisleipää.", en: "In Finland, rye bread is eaten a lot.", vi: "Ở Phần Lan, người ta ăn nhiều bánh mì lúa mạch." },
      { fi: "Mennäänkö elokuviin?", en: "Shall we go to the movies?", vi: "Mình đi xem phim nhé?" },
      { fi: "Tätä kirjaa luetaan kouluissa.", en: "This book is read in schools.", vi: "Cuốn sách này được đọc trong trường." },
    ],
    teacherTipEn: "'Mennäänkö?' = the most natural way to suggest something — use it in Speaking.",
    teacherTipVi: "'Mennäänkö?' = cách rủ rê tự nhiên nhất — dùng trong Speaking.",
  },
  {
    id: "g-comparative",
    emoji: "📊",
    titleFi: "Komparatiivi & superlatiivi",
    titleEn: "Comparative & superlative",
    titleVi: "So sánh hơn & nhất",
    explanationFi: "Vertaile asioita: -mpi (vertailu) ja -in (paras/superlatiivi).",
    explanationEn: "Compare things: -mpi (comparative) and -in (superlative).",
    explanationVi: "So sánh: -mpi (hơn) và -in (nhất).",
    formula: "adj + -mpi  (kuin)  ·  adj + -in",
    examples: [
      { fi: "Helsinki on suurempi kuin Turku.", en: "Helsinki is bigger than Turku.", vi: "Helsinki lớn hơn Turku." },
      { fi: "Tämä on paras ravintola kaupungissa.", en: "This is the best restaurant in town.", vi: "Đây là nhà hàng ngon nhất thành phố." },
      { fi: "Suomi on minulle vaikeampi kuin englanti.", en: "Finnish is harder for me than English.", vi: "Tiếng Phần khó hơn tiếng Anh với tôi." },
    ],
    teacherTipEn: "Memorise irregulars: hyvä → parempi → paras (good/better/best).",
    teacherTipVi: "Học bất quy tắc: hyvä → parempi → paras (tốt/hơn/nhất).",
  },
];

export const B1_GRAMMAR_MODULES: B1GrammarModule[] = [
  {
    id: "gm-cases",
    emoji: "🧱",
    titleFi: "Sijamuodot",
    titleEn: "Cases",
    titleVi: "Các cách (Case System)",
    description: "Partitive, genitive and local cases - the foundation of B1 Finnish.",
    descriptionVi: "Partitive, Genitive và các cách chỉ vị trí - nền tảng của tiếng Phần B1.",
    points: cases,
  },
  {
    id: "gm-tenses",
    emoji: "⏰",
    titleFi: "Aikamuodot ja moodit",
    titleEn: "Tenses & moods",
    titleVi: "Thì và Thức",
    description: "Past, perfect and conditional - prove your B1 range.",
    descriptionVi: "Quá khứ, hoàn thành và điều kiện - chứng minh trình độ B1.",
    points: tenses,
  },
  {
    id: "gm-sentence",
    emoji: "🧠",
    titleFi: "Lauseen rakenne",
    titleEn: "Sentence structure",
    titleVi: "Cấu trúc câu",
    description: "Conjunctions, passive and comparison - sound natural at B1.",
    descriptionVi: "Liên từ, bị động và so sánh - nghe tự nhiên ở B1.",
    points: sentence,
  },
];

export const B1_GRAMMAR_ALL: B1GrammarPoint[] = B1_GRAMMAR_MODULES.flatMap(m => m.points);
