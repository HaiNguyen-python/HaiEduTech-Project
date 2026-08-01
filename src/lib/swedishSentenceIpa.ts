/**
 * @file swedishSentenceIpa.ts
 * @description Sentence-level Swedish IPA transcription for the Speaking Coach.
 *              The word-level engine in `swedishIpa.ts` only handles single
 *              words, so full sentences used to come out mangled (punctuation
 *              transcribed, no word boundaries). This module tokenises a
 *              sentence, applies a curated dictionary of high-frequency words
 *              used in the coach content, and falls back to the rule engine.
 *
 *              It also detects which "hard sounds" occur in a sentence so the
 *              UI can show targeted pronunciation coaching (sj-, tj-, u/y,
 *              retroflex after r, pitch accent).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { generateSwedishIpa } from "./swedishIpa";

/* Curated word IPA — checked against Central Standard Swedish (rikssvenska). */
const WORD_IPA: Record<string, string> = {
  // Greetings / politeness
  "hej": "hɛj", "hejsan": "ˈhɛjsan", "hallå": "haˈloː", "tack": "tak",
  "ursäkta": "ˈʉːʂɛkta", "förlåt": "fœrˈloːt", "trevligt": "ˈtreːvlɪt",
  "träffas": "ˈtrɛfːas", "heter": "ˈheːtɛr", "hälsningar": "ˈhɛlsnɪŋar",
  "varsågod": "ˈvaʂoˌɡuːd", "välkommen": "vɛlˈkɔmːɛn",
  // Pronouns / function words
  "jag": "jɑː", "du": "dʉː", "han": "han", "hon": "hɔn", "vi": "viː", "ni": "niː",
  "de": "dɔm", "dem": "dɔm", "den": "dɛn", "det": "deː", "detta": "ˈdɛtːa",
  "min": "mɪn", "mitt": "mɪt", "mina": "ˈmiːna", "din": "dɪn", "ditt": "dɪt",
  "hans": "hans", "hennes": "ˈhɛnːɛs", "vår": "voːr", "vårt": "vɔʈ", "våra": "ˈvoːra",
  "sig": "sɛj", "mig": "mɛj", "dig": "dɛj", "oss": "ɔs", "er": "eːr",
  "och": "ɔk", "att": "at", "som": "sɔm", "men": "mɛn", "eller": "ˈɛlːɛr",
  "inte": "ˈɪntɛ", "också": "ˈɔkˌsoː", "mycket": "ˈmʏkɛ", "lite": "ˈliːtɛ",
  "här": "hæːr", "där": "dæːr", "nu": "nʉː", "sedan": "ˈseːdan", "redan": "ˈreːdan",
  "alltid": "ˈalːtiːd", "aldrig": "ˈaldrɪɡ", "ofta": "ˈɔfta", "ibland": "ɪˈbland",
  "kanske": "ˈkanːɧɛ", "gärna": "ˈjæːɳa", "bara": "ˈbɑːra", "ganska": "ˈɡanska",
  "väldigt": "ˈvɛldɪt", "jättebra": "ˈjɛtːɛˌbrɑː",
  // Verbs (high frequency, irregular)
  "är": "ɛː", "var": "vɑːr", "varit": "ˈvɑːrɪt", "blir": "bliːr", "blev": "bleːv",
  "har": "hɑːr", "hade": "ˈhɑːdɛ", "haft": "haft",
  "ska": "skɑː", "skulle": "ˈskɵlːɛ", "vill": "vɪl", "kan": "kan", "kunde": "ˈkɵnːdɛ",
  "får": "foːr", "fick": "fɪk", "måste": "ˈmɔstɛ", "borde": "ˈbuːɖɛ",
  "går": "ɡoːr", "gick": "jɪk", "gör": "jœr", "gjorde": "ˈjuːɖɛ",
  "kommer": "ˈkɔmːɛr", "kom": "kɔm", "tar": "tɑːr", "tog": "tuːɡ",
  "ser": "seːr", "såg": "soːɡ", "säger": "ˈsɛjːɛr", "sa": "sɑː",
  "tycker": "ˈtʏkːɛr", "tänker": "ˈtɛŋːkɛr", "tror": "truːr", "vet": "veːt",
  "bor": "buːr", "jobbar": "ˈjɔbːar", "arbetar": "ˈarbeːtar",
  "pratar": "ˈprɑːtar", "talar": "ˈtɑːlar", "läser": "ˈlɛːsɛr", "skriver": "ˈskriːvɛr",
  "äter": "ˈɛːtɛr", "dricker": "ˈdrɪkːɛr", "lagar": "ˈlɑːɡar",
  "köper": "ˈɕøːpɛr", "betalar": "bɛˈtɑːlar", "kostar": "ˈkɔstar",
  "åker": "ˈoːkɛr", "reser": "ˈreːsɛr", "kör": "ɕøːr", "cyklar": "ˈsʏklar",
  "hjälper": "ˈjɛlpɛr", "väntar": "ˈvɛntar", "börjar": "ˈbœrjar", "slutar": "ˈslʉːtar",
  "sover": "ˈsoːvɛr", "tvättar": "ˈtvɛtːar", "städar": "ˈstɛːdar",
  "behöver": "bɛˈhøːvɛr", "önskar": "ˈœnskar", "hoppas": "ˈhɔpːas",
  "förstår": "fœˈʂtoːr", "förklarar": "fœrˈklɑːrar", "upprepa": "ˈɵpːˌreːpa",
  "träffar": "ˈtrɛfːar", "ringer": "ˈrɪŋːɛr", "skickar": "ˈɧɪkːar",
  "söker": "ˈsøːkɛr", "hittar": "ˈhɪtːar", "flyttar": "ˈflʏtːar",
  "studerar": "stʉˈdeːrar", "diskuterar": "dɪskʉˈteːrar", "planerar": "plaˈneːrar",
  // Question words
  "vad": "vɑː", "vem": "vɛm", "vilken": "ˈvɪlkɛn", "vilket": "ˈvɪlkɛt",
  "var?": "vɑːr", "hur": "hʉːr", "när": "nɛːr", "varför": "ˈvarˌfœr",
  // Family / people
  "familj": "faˈmɪlj", "mamma": "ˈmamːa", "pappa": "ˈpapːa", "syster": "ˈsʏstɛr",
  "bror": "bruːr", "bröder": "ˈbrøːdɛr", "barn": "bɑːɳ", "dotter": "ˈdɔtːɛr",
  "son": "soːn", "man": "man", "fru": "frʉː", "vän": "vɛn", "vänner": "ˈvɛnːɛr",
  "kollega": "kɔˈleːɡa", "chef": "ɧeːf", "lärare": "ˈlæːrarɛ", "läkare": "ˈlɛːkarɛ",
  "sjuksköterska": "ˈɧʉːkˌɧøːtɛʂka", "ingenjör": "ɪnɧɛnˈjøːr",
  // Everyday nouns
  "hus": "hʉːs", "hemma": "ˈhɛmːa", "lägenhet": "ˈlɛːɡɛnˌheːt", "rum": "rɵm",
  "kök": "ɕøːk", "jobb": "jɔb", "arbete": "ˈarbeːtɛ", "skola": "ˈskuːla",
  "kurs": "kʊʂ", "lektion": "lɛkˈɧuːn", "prov": "pruːv", "läxa": "ˈlɛkːsa",
  "pengar": "ˈpɛŋːar", "kort": "kʊʈ", "kvitto": "ˈkvɪtːʊ", "pris": "priːs",
  "buss": "bɵs", "tåg": "toːɡ", "bil": "biːl", "cykel": "ˈsʏkːɛl",
  "biljett": "bɪlˈjɛt", "tunnelbana": "ˈtɵnːɛlˌbɑːna",
  "affär": "aˈfæːr", "butik": "bʉˈtiːk", "restaurang": "ˌrɛstɔˈraŋ",
  "sjukhus": "ˈɧʉːkˌhʉːs", "apotek": "apʊˈteːk", "bank": "baŋk", "post": "pɔst",
  "telefon": "tɛlɛˈfoːn", "dator": "ˈdɑːtɔr", "mobil": "mʊˈbiːl",
  "kaffe": "ˈkafːɛ", "mat": "mɑːt", "frukost": "ˈfrʉːkɔst", "lunch": "lɵnɧ",
  "middag": "ˈmɪdːɑːɡ", "vatten": "ˈvatːɛn", "mjölk": "mjœlk", "bröd": "brøːd",
  "väder": "ˈvɛːdɛr", "sommar": "ˈsɔmːar", "vinter": "ˈvɪntɛr", "snö": "snøː",
  "regn": "rɛŋn", "sol": "suːl", "sjö": "ɧøː", "skog": "skuːɡ",
  // Time
  "idag": "ɪˈdɑːɡ", "imorgon": "ɪˈmɔrːɔn", "igår": "ɪˈɡoːr", "ikväll": "ɪˈkvɛl",
  "klockan": "ˈklɔkːan", "timme": "ˈtɪmːɛ", "minut": "mɪˈnʉːt", "vecka": "ˈvɛkːa",
  "helgen": "ˈhɛljɛn", "månad": "ˈmoːnad", "år": "oːr",
  // Feelings / adjectives
  "glad": "ɡlɑːd", "ledsen": "ˈlɛsːɛn", "trött": "trœt", "nervös": "nɛrˈvøːs",
  "stolt": "stɔlt", "arg": "arj", "rädd": "rɛd", "lycklig": "ˈlʏkːlɪɡ",
  "stressad": "ˈstrɛsːad", "ensam": "ˈeːnsam", "hungrig": "ˈhɵŋrɪɡ",
  "bra": "brɑː", "dålig": "ˈdoːlɪɡ", "viktig": "ˈvɪktɪɡ", "svårt": "svoːʈ",
  "billigt": "ˈbɪlːɪt", "dyrt": "dyːʈ", "trevlig": "ˈtreːvlɪɡ",
  // Society / abstract (B1-C1)
  "samhälle": "ˈsamˌhɛlːɛ", "regeringen": "rɛˈjeːrɪŋɛn", "riksdagen": "ˈrɪksˌdɑːɡɛn",
  "myndighet": "ˈmʏndɪɡˌheːt", "skatt": "skat", "försäkring": "fœˈʂɛːkrɪŋ",
  "utbildning": "ˈʉːtˌbɪldnɪŋ", "forskning": "ˈfɔʂknɪŋ", "utveckling": "ˈʉːtˌvɛklɪŋ",
  "miljö": "mɪlˈjøː", "klimat": "klɪˈmɑːt", "hållbarhet": "ˈhɔlːbaˌheːt",
  "ekonomi": "ɛkʊnʊˈmiː", "arbetsmarknad": "ˈarbeːtsˌmarknad",
  "erfarenhet": "ɛrˈfɑːrɛnˌheːt", "möjlighet": "ˈmøjlɪɡˌheːt",
  "utmaning": "ˈʉːtˌmɑːnɪŋ", "lösning": "ˈløːsnɪŋ", "ansvar": "ˈanˌsvɑːr",
  "integration": "ɪntɛɡraˈɧuːn", "invandring": "ˈɪnˌvandrɪŋ",
  "teknologi": "tɛknʊlʊˈɡiː", "kunskap": "ˈkʉnːskɑːp", "framtiden": "ˈframˌtiːdɛn",
  "yttrandefrihet": "ˈʏtːrandɛˌfriːheːt", "demokrati": "dɛmʊkraˈtiː",
  "jämställdhet": "ˈjɛmːˌstɛldheːt", "resurser": "rɛˈsʊʂɛr",
  // Places
  "sverige": "ˈsvɛrjɛ", "svenska": "ˈsvɛnska", "finland": "ˈfɪnland",
  "vietnam": "vjɛtˈnam", "stockholm": "ˈstɔkˌhɔlm", "göteborg": "ˌjøːtɛˈbɔrj",
  "malmö": "ˈmalmø", "helsingfors": "ˈhɛlsɪŋˌfɔʂ", "europa": "ɛʊˈroːpa",
};

/** Strip punctuation that should not be transcribed. */
const clean = (token: string) => token.replace(/[.,!?;:"“”„«»()]/g, "").toLowerCase();

/**
 * Transcribe a full Swedish sentence. Returns a slash-wrapped IPA string,
 * e.g. `/jɑː ˈheːtɛr lan/`.
 */
export function transcribeSwedishSentence(sentence: string): string {
  const tokens = sentence.split(/\s+/).filter(Boolean);
  const parts: string[] = [];
  for (const raw of tokens) {
    const w = clean(raw);
    if (!w) continue;
    if (WORD_IPA[w]) { parts.push(WORD_IPA[w]); continue; }
    // Hyphenated compounds: transcribe each half.
    if (w.includes("-")) {
      const halves = w.split("-").filter(Boolean).map((h) =>
        WORD_IPA[h] || generateSwedishIpa(h).replace(/^\/|\/$/g, ""));
      parts.push(halves.join("-"));
      continue;
    }
    parts.push(generateSwedishIpa(w).replace(/^\/|\/$/g, ""));
  }
  return parts.length ? `/${parts.join(" ")}/` : "";
}

export interface SwedishSoundTip {
  id: string;
  symbol: string;
  labelVi: string;
  labelEn: string;
  tipVi: string;
  tipEn: string;
}

const SOUND_TIPS: (SwedishSoundTip & { test: RegExp })[] = [
  {
    id: "sj", symbol: "ɧ", test: /sj|skj|stj|sk[eiyäö]|sch|ssion|tion/i,
    labelVi: "Âm sj- (ɧ)", labelEn: "The sj-sound (ɧ)",
    tipVi: "Chu môi như thổi nến, hơi thoát ra nhẹ ở giữa vòm miệng: sjö, skön, station. Không đọc thành 's' hay 'sh' tiếng Anh.",
    tipEn: "Round the lips as if blowing out a candle and push air through the mid-palate: sjö, skön, station. Not English 's' or 'sh'.",
  },
  {
    id: "tj", symbol: "ɕ", test: /tj|kj|k[eiyäö]/i,
    labelVi: "Âm tj- (ɕ)", labelEn: "The tj-sound (ɕ)",
    tipVi: "Giống 'x' tiếng Việt nhưng lưỡi cao và căng hơn: tjugo, kök, köpa. Đây là âm khác hoàn toàn với sj-.",
    tipEn: "Close to a hissing 'sh' with the tongue high and tense: tjugo, kök, köpa. Clearly different from the sj-sound.",
  },
  {
    id: "u", symbol: "ʉː", test: /u/i,
    labelVi: "Nguyên âm u (ʉː)", labelEn: "The u vowel (ʉː)",
    tipVi: "Không phải 'u' tiếng Việt. Môi tròn nhưng lưỡi đưa ra trước: hus, ut, tusen.",
    tipEn: "Not a Vietnamese/English 'oo'. Lips rounded but tongue pushed forward: hus, ut, tusen.",
  },
  {
    id: "y", symbol: "yː", test: /y/i,
    labelVi: "Nguyên âm y (yː)", labelEn: "The y vowel (yː)",
    tipVi: "Đặt lưỡi ở vị trí 'i' rồi tròn môi: ny, by, mycket.",
    tipEn: "Say 'ee' then round your lips without moving the tongue: ny, by, mycket.",
  },
  {
    id: "retroflex", symbol: "ʂ ʈ ɖ ɳ", test: /r[stdnl]/i,
    labelVi: "Âm cuộn lưỡi sau r", labelEn: "Retroflex after r",
    tipVi: "r + s/t/d/n/l nhập lại thành một âm cuộn lưỡi: kort → kʊʈ, person → pɛˈʂuːn, barn → bɑːɳ.",
    tipEn: "r + s/t/d/n/l merge into one retroflex sound: kort → kʊʈ, person → pɛˈʂuːn, barn → bɑːɳ.",
  },
  {
    id: "long", symbol: "ː", test: /(a|e|i|o|u|y|å|ä|ö)[^aeiouyåäö\s]?\b/i,
    labelVi: "Độ dài nguyên âm", labelEn: "Vowel length",
    tipVi: "Một phụ âm sau nguyên âm → nguyên âm dài (vi:ta); hai phụ âm → nguyên âm ngắn (vitt). Sai độ dài là đổi nghĩa.",
    tipEn: "One consonant after the vowel → long vowel (vita); two consonants → short vowel (vitt). Length changes meaning.",
  },
  {
    id: "tone", symbol: "´ `", test: /en\b|et\b|ar\b|or\b/i,
    labelVi: "Thanh điệu (tonaccent)", labelEn: "Pitch accent",
    tipVi: "Tiếng Thụy Điển có 2 thanh: accent 1 (anden = con vịt) và accent 2 (anden = linh hồn). Hãy để giọng lên nhẹ ở âm tiết thứ hai của từ ghép.",
    tipEn: "Swedish has two accents: accent 1 (anden = the duck) vs accent 2 (anden = the spirit). Add a small second rise in compounds.",
  },
];

/** Return up to `max` pronunciation tips relevant to the given sentence. */
export function swedishSoundTipsFor(sentence: string, max = 2): SwedishSoundTip[] {
  const hits = SOUND_TIPS.filter((tip) => tip.test.test(sentence));
  return hits.slice(0, max).map(({ test: _test, ...rest }) => rest);
}
