/**
 * @file swedishReadingNotes.ts
 * @description Builds post-reading study notes for a Swedish passage:
 *              (1) grammar structures actually used in the text, each with a
 *              real example sentence pulled from the passage, and
 *              (2) a "hard words" glossary based on a curated sv -> vi/en
 *              dictionary plus the passage keyVocab.
 *              Pure client-side analysis - no AI calls, fully deterministic.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface GrammarNote {
  id: string;
  /** Swedish label of the structure, e.g. "ska + infinitiv". */
  labelSv: string;
  titleVi: string;
  titleEn: string;
  explainVi: string;
  explainEn: string;
  /** Sentence from the passage where the structure appears. */
  exampleSv: string;
}

export interface HardWord {
  sv: string;
  vi: string;
  en?: string;
}

/** Split a passage into clean sentences (keeps newline-separated lines too). */
const splitSentences = (text: string): string[] =>
  text
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?:])\s+/))
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 3);

interface Rule extends Omit<GrammarNote, "exampleSv"> {
  test: RegExp;
}

/** Ordered by teaching priority: the first matches are shown first. */
const RULES: Rule[] = [
  {
    id: "v2-inversion",
    labelSv: "Omvänd ordföljd (V2)",
    titleVi: "Đảo ngữ V2 - động từ luôn ở vị trí thứ hai",
    titleEn: "V2 inversion - verb stays in second position",
    explainVi:
      "Khi câu mở đầu bằng trạng ngữ (thời gian, địa điểm), động từ đứng ngay sau trạng ngữ rồi mới đến chủ ngữ: 'På lördag ska jag...' chứ không phải 'På lördag jag ska...'.",
    explainEn:
      "When a sentence starts with an adverbial (time or place), the verb comes right after it and the subject follows: 'På lördag ska jag...', never 'På lördag jag ska...'.",
    test: /(^|[.!?]\s+|\n)(På|I|Nu|Idag|Igår|Imorgon|Sedan|Därför|Ibland|Varje|Klockan|Här|Där|Efter|Före|Under|Först)\b[^.!?\n]{0,40}?\s(är|har|ska|kan|vill|måste|får|bor|arbetar|åker|går|kommer|börjar|slutar|finns|blir|tycker|brukar)\b/,
  },
  {
    id: "ska-inf",
    labelSv: "ska + infinitiv",
    titleVi: "Tương lai: ska + động từ nguyên thể",
    titleEn: "Future: ska + infinitive",
    explainVi:
      "'ska' diễn tả kế hoạch/dự định đã quyết định, sau nó là động từ nguyên thể không có 'att': ska gå, ska åka.",
    explainEn:
      "'ska' expresses a planned intention; the following verb is a bare infinitive with no 'att': ska gå, ska åka.",
    test: /\bska(ll)?\s+\w+a\b/i,
  },
  {
    id: "modal",
    labelSv: "Modalverb + infinitiv",
    titleVi: "Động từ khiếm khuyết: kan / vill / måste / får / bör",
    titleEn: "Modal verbs: kan / vill / måste / får / bör",
    explainVi:
      "Sau modal luôn là động từ nguyên thể, không thêm 'att' và không chia theo chủ ngữ: jag kan simma, vi måste vänta.",
    explainEn:
      "A modal is always followed by a bare infinitive - no 'att', no conjugation: jag kan simma, vi måste vänta.",
    test: /\b(kan|kunde|vill|ville|måste|får|fick|bör|brukar)\s+\w+a\b/i,
  },
  {
    id: "perfect",
    labelSv: "Perfekt: har + supinum",
    titleVi: "Thì hiện tại hoàn thành: har/hade + supinum",
    titleEn: "Perfect tense: har/hade + supine",
    explainVi:
      "Dạng supinum kết thúc bằng -at (grupp 1), -t/-tt hoặc -it (động từ mạnh): har bott, har arbetat, har skrivit.",
    explainEn:
      "The supine ends in -at (group 1), -t/-tt, or -it (strong verbs): har bott, har arbetat, har skrivit.",
    test: /\b(har|hade|har inte|hade inte)\s+\w+(at|it|tt|dd|ått|ett)\b/i,
  },
  {
    id: "att-inf",
    labelSv: "att + infinitiv",
    titleVi: "'att' + động từ nguyên thể",
    titleEn: "'att' + infinitive",
    explainVi:
      "Sau các động từ như tycker om, försöker, hoppas, är viktigt ta dùng 'att' + nguyên thể: tycker om att laga mat.",
    explainEn:
      "After verbs like tycker om, försöker, hoppas, or 'är viktigt', use 'att' + infinitive: tycker om att laga mat.",
    test: /\batt\s+\w+a\b/i,
  },
  {
    id: "inte-place",
    labelSv: "Placering av 'inte'",
    titleVi: "Vị trí của 'inte' (không)",
    titleEn: "Placement of 'inte' (not)",
    explainVi:
      "Trong câu chính, 'inte' đứng sau động từ chia: jag förstår inte. Trong câu phụ, 'inte' đứng trước động từ: ...att jag inte förstår.",
    explainEn:
      "In a main clause 'inte' follows the finite verb: jag förstår inte. In a subordinate clause it precedes the verb: ...att jag inte förstår.",
    test: /\binte\b/i,
  },
  {
    id: "subordinate",
    labelSv: "Bisats: att / som / när / eftersom / om",
    titleVi: "Câu phụ với att, som, när, eftersom, om",
    titleEn: "Subordinate clauses: att, som, när, eftersom, om",
    explainVi:
      "Trong câu phụ giữ nguyên trật tự chủ ngữ - động từ, và trạng từ (inte, alltid, ofta) đứng TRƯỚC động từ.",
    explainEn:
      "Subordinate clauses keep subject-verb order, and adverbs (inte, alltid, ofta) come BEFORE the verb.",
    test: /\b(att|som|när|eftersom|därför att|om|innan|medan)\b\s+\w+\s+\w+/i,
  },
  {
    id: "det-finns",
    labelSv: "det finns / det är",
    titleVi: "Cấu trúc tồn tại 'det finns'",
    titleEn: "Existential 'det finns'",
    explainVi:
      "'det finns' = có (tồn tại), dùng cho cả số ít và số nhiều; 'det är' dùng để mô tả hoặc định danh.",
    explainEn:
      "'det finns' means 'there is/are' for both singular and plural; 'det är' identifies or describes.",
    test: /\bdet\s+(finns|fanns)\b/i,
  },
  {
    id: "definite",
    labelSv: "Bestämd form (-en / -et / -na)",
    titleVi: "Dạng xác định của danh từ",
    titleEn: "Definite noun forms",
    explainVi:
      "Tiếng Thụy Điển gắn mạo từ xác định vào cuối từ: en bok -> boken, ett hus -> huset, böcker -> böckerna.",
    explainEn:
      "Swedish attaches the definite article as a suffix: en bok -> boken, ett hus -> huset, böcker -> böckerna.",
    test: /\b\w{3,}(en|et|erna|arna|orna)\b/,
  },
  {
    id: "plural",
    labelSv: "Pluralformer (-or, -ar, -er, -n)",
    titleVi: "Dạng số nhiều của danh từ",
    titleEn: "Plural noun forms",
    explainVi:
      "5 nhóm số nhiều: flicka -> flickor, dag -> dagar, tid -> tider, äpple -> äpplen, hus -> hus (không đổi).",
    explainEn:
      "Five plural groups: flicka -> flickor, dag -> dagar, tid -> tider, äpple -> äpplen, hus -> hus (unchanged).",
    test: /\b\w{3,}(or|ar|er)\b/,
  },
  {
    id: "adj-agreement",
    labelSv: "Adjektivets böjning",
    titleVi: "Hoà hợp tính từ (en / ett / số nhiều)",
    titleEn: "Adjective agreement (en / ett / plural)",
    explainVi:
      "Tính từ đổi theo danh từ: en stor bil, ett stort hus, stora bilar; sau dạng xác định dùng đuôi -a: den stora bilen.",
    explainEn:
      "Adjectives agree with the noun: en stor bil, ett stort hus, stora bilar; after a definite form use -a: den stora bilen.",
    test: /\b(ett)\s+\w+t\s+\w+|\b(den|det|de|min|mitt|mina|vår|våra)\s+\w+a\s+\w+/i,
  },
  {
    id: "comparative",
    labelSv: "Komparativ / superlativ",
    titleVi: "So sánh hơn và so sánh nhất",
    titleEn: "Comparative and superlative",
    explainVi:
      "Thêm -are / -ast: billig -> billigare -> billigast; so sánh hơn dùng 'än': dyrare än.",
    explainEn:
      "Add -are / -ast: billig -> billigare -> billigast; use 'än' for comparisons: dyrare än.",
    test: /\b\w{4,}(are|ast|aste)\b|\bän\b|\b(bättre|bäst|sämre|värre|mer|mest|flera)\b/i,
  },
  {
    id: "particle-verb",
    labelSv: "Partikelverb",
    titleVi: "Động từ có tiểu từ (tycker om, går ut...)",
    titleEn: "Particle verbs (tycker om, går ut...)",
    explainVi:
      "Động từ + tiểu từ tạo nghĩa mới: tycker om (thích), går ut (đi ra), tar med (mang theo), stiger upp (thức dậy).",
    explainEn:
      "Verb + particle forms a new meaning: tycker om (like), går ut (go out), tar med (bring along), stiger upp (get up).",
    test: /\b(tycker|tyckte|går|gick|kommer|kom|tar|tog|stiger|steg|ringer|ringde|sätter|satte|hänger)\s+(om|ut|in|med|upp|ner|på|av|till|bort|igen)\b/i,
  },
  {
    id: "reflexive",
    labelSv: "Reflexiva verb",
    titleVi: "Động từ phản thân (sig, mig, dig)",
    titleEn: "Reflexive verbs (sig, mig, dig)",
    explainVi:
      "Một số động từ luôn cần đại từ phản thân: jag tvättar mig, hon känner sig trött, vi träffas.",
    explainEn:
      "Some verbs always need a reflexive pronoun: jag tvättar mig, hon känner sig trött.",
    test: /\b(mig|dig|sig|oss|er)\b/i,
  },
  {
    id: "passive",
    labelSv: "s-passiv",
    titleVi: "Câu bị động với đuôi -s",
    titleEn: "s-passive",
    explainVi:
      "Thêm -s vào động từ để tạo bị động, rất phổ biến trong thông báo và tin tức: dörren stängs, biljetter säljs.",
    explainEn:
      "Add -s to the verb for the passive, very common in notices and news: dörren stängs, biljetter säljs.",
    test: /\b\w{3,}(as|es|s)\b(?=\s+(av|kl|klockan|varje|på|i|från))/i,
  },
  {
    id: "imperative",
    labelSv: "Imperativ",
    titleVi: "Câu mệnh lệnh",
    titleEn: "Imperative",
    explainVi:
      "Dạng mệnh lệnh bỏ -r của thì hiện tại: skriver -> skriv, ringer -> ring, kommer -> kom. Rất hay gặp ở thông báo.",
    explainEn:
      "The imperative drops the present-tense -r: skriver -> skriv, ringer -> ring, kommer -> kom. Common in notices.",
    test: /(^|\n|[.!?]\s+)(Skriv|Ring|Kom|Ta|Läs|Glöm|Använd|Kontakta|Anmäl|Boka|Se|Häll|Lämna|Tänk|Var)\b/,
  },
  {
    id: "man",
    labelSv: "Pronomenet 'man'",
    titleVi: "Đại từ 'man' (người ta)",
    titleEn: "The pronoun 'man'",
    explainVi:
      "'man' chỉ chủ thể chung chung (người ta, mình), dùng nhiều trong quy định: man måste boka tid.",
    explainEn:
      "'man' refers to people in general ('one', 'you'), common in rules: man måste boka tid.",
    test: /\bman\s+(kan|måste|får|ska|bör|brukar|behöver)\b/i,
  },
  {
    id: "time-prep",
    labelSv: "Tidsprepositioner",
    titleVi: "Giới từ thời gian (på, i, om, klockan)",
    titleEn: "Time prepositions (på, i, om, klockan)",
    explainVi:
      "på lördag (thứ Bảy này), i juni (trong tháng Sáu), om en vecka (sau một tuần), klockan sju (7 giờ).",
    explainEn:
      "på lördag (this Saturday), i juni (in June), om en vecka (in a week), klockan sju (at seven).",
    test: /\b(klockan|kl\.?|på (mån|tis|ons|tors|fre|lör|sön)dag|i (januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)|om en \w+)\b/i,
  },
  {
    id: "genitive",
    labelSv: "s-genitiv",
    titleVi: "Sở hữu cách với -s",
    titleEn: "s-genitive",
    explainVi:
      "Thêm -s (không có dấu nháy) để chỉ sở hữu: Annas katt, husets dörr, Sveriges huvudstad.",
    explainEn:
      "Add -s (no apostrophe) to show possession: Annas katt, husets dörr, Sveriges huvudstad.",
    test: /\b[A-ZÅÄÖ]\w+s\s+\w+/,
  },
];

/**
 * Curated hard-word glossary (sv -> vi / en). Only words present here or in the
 * passage keyVocab are surfaced, which keeps the quality of the translations high.
 */
const HARD_WORDS: Record<string, { vi: string; en: string }> = {
  ansöka: { vi: "nộp đơn, xin", en: "to apply" },
  ansökan: { vi: "đơn xin", en: "application" },
  anmäla: { vi: "đăng ký, khai báo", en: "to register/report" },
  anmälan: { vi: "việc đăng ký", en: "registration" },
  arbetsgivare: { vi: "người sử dụng lao động", en: "employer" },
  avfall: { vi: "rác thải", en: "waste" },
  avgift: { vi: "phí", en: "fee" },
  behöva: { vi: "cần", en: "to need" },
  bekväm: { vi: "tiện lợi, thoải mái", en: "comfortable" },
  beställa: { vi: "đặt hàng", en: "to order" },
  betala: { vi: "trả tiền", en: "to pay" },
  bidrag: { vi: "khoản trợ cấp", en: "allowance/grant" },
  biljett: { vi: "vé", en: "ticket" },
  bostad: { vi: "nơi ở, nhà ở", en: "housing" },
  bostadsrätt: { vi: "căn hộ sở hữu", en: "owner-occupied flat" },
  bekymrad: { vi: "lo lắng", en: "worried" },
  budget: { vi: "ngân sách", en: "budget" },
  besked: { vi: "thông báo, câu trả lời", en: "notification" },
  bibliotek: { vi: "thư viện", en: "library" },
  brukar: { vi: "thường (làm gì)", en: "usually do" },
  dessutom: { vi: "hơn nữa", en: "moreover" },
  däremot: { vi: "ngược lại", en: "on the other hand" },
  däck: { vi: "lốp xe", en: "tyre" },
  eftersom: { vi: "bởi vì", en: "because" },
  egentligen: { vi: "thật ra", en: "actually" },
  enkelt: { vi: "đơn giản", en: "simple/simply" },
  erbjuda: { vi: "cung cấp, mời", en: "to offer" },
  erbjudande: { vi: "ưu đãi", en: "offer" },
  ersättning: { vi: "khoản bù, tiền bồi thường", en: "compensation" },
  faktiskt: { vi: "thực sự", en: "actually" },
  farlig: { vi: "nguy hiểm", en: "dangerous" },
  fastighet: { vi: "toà nhà, bất động sản", en: "property" },
  fortsätta: { vi: "tiếp tục", en: "to continue" },
  fritid: { vi: "thời gian rảnh", en: "leisure time" },
  förbjuden: { vi: "bị cấm", en: "forbidden" },
  förening: { vi: "hội, hiệp hội", en: "association" },
  försäkring: { vi: "bảo hiểm", en: "insurance" },
  förslag: { vi: "đề xuất", en: "proposal" },
  förändring: { vi: "sự thay đổi", en: "change" },
  gäller: { vi: "có hiệu lực, áp dụng cho", en: "applies to" },
  gemensam: { vi: "chung", en: "shared/common" },
  hyra: { vi: "tiền thuê / thuê", en: "rent" },
  hälsa: { vi: "sức khoẻ / chào", en: "health / to greet" },
  händelse: { vi: "sự kiện", en: "event" },
  inkomst: { vi: "thu nhập", en: "income" },
  innehåll: { vi: "nội dung", en: "content" },
  invånare: { vi: "cư dân", en: "inhabitant" },
  jämföra: { vi: "so sánh", en: "to compare" },
  kollektivtrafik: { vi: "giao thông công cộng", en: "public transport" },
  kunskap: { vi: "kiến thức", en: "knowledge" },
  källsortering: { vi: "phân loại rác", en: "waste sorting" },
  ledig: { vi: "rảnh, còn trống", en: "free/vacant" },
  lägenhet: { vi: "căn hộ", en: "apartment" },
  liknande: { vi: "tương tự", en: "similar" },
  lösning: { vi: "giải pháp", en: "solution" },
  meddelande: { vi: "tin nhắn, thông báo", en: "message" },
  miljö: { vi: "môi trường", en: "environment" },
  minska: { vi: "giảm", en: "to reduce" },
  mottagning: { vi: "phòng khám, giờ tiếp", en: "reception/clinic" },
  möjlighet: { vi: "cơ hội, khả năng", en: "possibility" },
  nyfiken: { vi: "tò mò", en: "curious" },
  nödvändig: { vi: "cần thiết", en: "necessary" },
  områden: { vi: "các khu vực", en: "areas" },
  område: { vi: "khu vực", en: "area" },
  ordna: { vi: "sắp xếp, tổ chức", en: "to arrange" },
  ovanlig: { vi: "khác thường", en: "unusual" },
  personal: { vi: "nhân viên", en: "staff" },
  påminna: { vi: "nhắc nhở", en: "to remind" },
  regel: { vi: "quy định", en: "rule" },
  rabatt: { vi: "giảm giá", en: "discount" },
  samhälle: { vi: "xã hội", en: "society" },
  sambo: { vi: "người sống chung (bạn đời)", en: "live-in partner" },
  skyldig: { vi: "có nghĩa vụ, mắc lỗi", en: "obliged/guilty" },
  självklart: { vi: "hiển nhiên", en: "of course" },
  skräp: { vi: "rác", en: "rubbish" },
  slutligen: { vi: "cuối cùng", en: "finally" },
  spara: { vi: "tiết kiệm, lưu", en: "to save" },
  ställe: { vi: "chỗ, nơi", en: "place" },
  stänga: { vi: "đóng", en: "to close" },
  särskilt: { vi: "đặc biệt", en: "especially" },
  tillgänglig: { vi: "khả dụng, dễ tiếp cận", en: "available" },
  tillsammans: { vi: "cùng nhau", en: "together" },
  tvättstuga: { vi: "phòng giặt chung", en: "laundry room" },
  undvika: { vi: "tránh", en: "to avoid" },
  utbildning: { vi: "việc học, đào tạo", en: "education" },
  utveckling: { vi: "sự phát triển", en: "development" },
  vanlig: { vi: "thông thường", en: "common" },
  verkligen: { vi: "thật sự", en: "really" },
  viktig: { vi: "quan trọng", en: "important" },
  återvinning: { vi: "tái chế", en: "recycling" },
  åtminstone: { vi: "ít nhất là", en: "at least" },
  ändå: { vi: "dù vậy", en: "still/anyway" },
  ändra: { vi: "thay đổi", en: "to change" },
  öka: { vi: "tăng", en: "to increase" },
  önska: { vi: "mong muốn", en: "to wish" },
  öppettider: { vi: "giờ mở cửa", en: "opening hours" },
  övrigt: { vi: "khác, còn lại", en: "other" },
};

/** Detect grammar structures used in the passage, with a real example each. */
export const buildGrammarNotes = (textSv: string, max = 6): GrammarNote[] => {
  const sentences = splitSentences(textSv);
  const notes: GrammarNote[] = [];
  for (const rule of RULES) {
    if (notes.length >= max) break;
    const hit = sentences.find((s) => rule.test.test(s));
    if (!hit) continue;
    const { test: _omit, ...rest } = rule;
    notes.push({ ...rest, exampleSv: hit });
  }
  return notes;
};

/**
 * Collect difficult words: dictionary hits inside the passage (matched on the
 * word stem so inflected forms count), merged with the passage keyVocab.
 */
export const buildHardWords = (
  textSv: string,
  keyVocab: { sv: string; vi: string }[] = [],
  max = 14,
): HardWord[] => {
  const tokens = Array.from(
    new Set(
      textSv
        .toLowerCase()
        .replace(/[^a-zåäöéA-ZÅÄÖ\s-]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 5),
    ),
  );

  const out: HardWord[] = [];
  const seen = new Set<string>();

  for (const [entry, meaning] of Object.entries(HARD_WORDS)) {
    const stem = entry.replace(/(a|en|er|ar|or|ing|het)$/i, "");
    if (stem.length < 4) continue;
    const match = tokens.find((tk) => tk.startsWith(stem));
    if (!match) continue;
    seen.add(entry);
    out.push({ sv: entry, vi: meaning.vi, en: meaning.en });
    if (out.length >= max) break;
  }

  // Always keep the curated key vocab of the passage as a fallback / supplement.
  for (const kv of keyVocab) {
    const key = kv.sv.toLowerCase();
    if (seen.has(key)) continue;
    if (out.length >= max) break;
    seen.add(key);
    out.push({ sv: kv.sv, vi: kv.vi });
  }

  return out;
};
