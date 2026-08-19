/**
 * @file finnishExampleNormalizer.ts
 * @description Replaces the robotic auto-generated Finnish example sentences with
 *              meaningful, grammatically safe ones. Templates are chosen by
 *              category + part of speech, rotated deterministically per word so
 *              learners see varied structures, and only use inflected forms that
 *              the conservative morphology helpers can produce with confidence.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import {
  partitiveSg,
  genitiveSg,
  inessiveSg,
  elativeSg,
  illativeSg,
  adessiveSg,
  capitalize,
} from "@/lib/finnishMorphology";
import { getFinnishExampleOverride } from "./finnishExampleOverrides";

type Form = "nom" | "part" | "gen" | "iness" | "elat" | "illat" | "adess";

interface Template {
  form: Form;
  fi: string; // {w} = inflected word, {W} = capitalized inflected word
  en: string; // {en} = English gloss, {En} = capitalized gloss
  /** Optional guard: template is used only when the English gloss matches. */
  needs?: RegExp;
}

/* ------------------------------ noun templates ----------------------------- */

// Neutral fallback templates: they must make sense for concrete AND abstract nouns.
const GENERIC: Template[] = [
  { form: "nom", fi: "Opin, mitä {w} tarkoittaa suomeksi.", en: "I learned what \"{en}\" means in Finnish." },
  { form: "part", fi: "Haluan ymmärtää {w} paremmin.", en: "I want to understand the {en} better." },
  { form: "elat", fi: "Puhuimme {w} eilen oppitunnilla.", en: "We talked about the {en} in class yesterday." },
  { form: "nom", fi: "{W} kiinnostaa minua todella paljon.", en: "The {en} interests me a great deal." },
  { form: "part", fi: "Opettaja selitti {w} rauhallisesti.", en: "The teacher explained the {en} calmly." },
  { form: "gen", fi: "Tämän {w} merkitys on minulle selvä.", en: "The meaning of this {en} is clear to me." },
  { form: "nom", fi: "Kirjoitin muistiin, millainen {w} on.", en: "I wrote down what the {en} is like." },
  { form: "elat", fi: "Luin {w} suomenkielisestä artikkelista.", en: "I read about the {en} in a Finnish article." },
];



const NOUN_POOLS: Record<string, Template[]> = {
  "Home & Housing": [
    { form: "iness", fi: "Vietän paljon aikaa {w}.", en: "I spend a lot of time in the {en}." },
    { form: "nom", fi: "Meidän kodissa on iso {w}.", en: "Our home has a big {en}." },
    { form: "part", fi: "Siivosin {w} lauantaina.", en: "I cleaned the {en} on Saturday." },
    { form: "elat", fi: "Pidän tästä {w} paljon.", en: "I like this {en} a lot." },
    { form: "nom", fi: "Tämä {w} on valoisa ja siisti.", en: "This {en} is bright and tidy." },
  ],
  "Food & Drink": [
    { form: "part", fi: "Ostin {w} kaupasta tänään.", en: "I bought some {en} at the shop today." },
    { form: "part", fi: "Syön {w} usein aamiaisella.", en: "I often have {en} for breakfast." },
    { form: "nom", fi: "Tämä {w} maistuu erittäin hyvältä.", en: "This {en} tastes really good." },
    { form: "elat", fi: "Pidän tästä {w} enemmän kuin muista.", en: "I like this {en} more than the others." },
    { form: "part", fi: "Voisinko saada vähän {w}, kiitos?", en: "Could I have a little {en}, please?" },
  ],
  "Body & Health": [
    { form: "part", fi: "Lääkäri tutki {w} huolellisesti.", en: "The doctor examined the {en} carefully." },
    { form: "nom", fi: "{W} on tärkeä ihmiselle.", en: "The {en} is important for a person." },
    { form: "elat", fi: "Puhuin {w} lääkärin kanssa.", en: "I talked about the {en} with the doctor." },
    { form: "part", fi: "Minun täytyy hoitaa {w} paremmin.", en: "I have to take better care of the {en}." },
  ],
  "Clothing & Style": [
    { form: "part", fi: "Ostin uuden {w} talvea varten.", en: "I bought a new {en} for the winter." },
    { form: "nom", fi: "Tämä {w} on liian pieni minulle.", en: "This {en} is too small for me." },
    { form: "part", fi: "Käytän {w} joka päivä töissä.", en: "I wear the {en} every day at work." },
    { form: "elat", fi: "Pidän tästä {w} kovasti.", en: "I really like this {en}." },
  ],
  Animals: [
    { form: "part", fi: "Näin {w} metsässä eilen.", en: "I saw a {en} in the forest yesterday." },
    { form: "nom", fi: "{W} on yleinen eläin Suomessa.", en: "The {en} is a common animal in Finland." },
    { form: "elat", fi: "Luin kirjasta {w} ja sen elintavoista.", en: "I read in a book about the {en} and its habits." },
    { form: "part", fi: "Lapset haluavat nähdä {w} eläinpuistossa.", en: "The children want to see a {en} at the zoo." },
  ],
  Nature: [
    { form: "iness", fi: "Kävelen {w} rauhassa sunnuntaisin.", en: "I walk peacefully in the {en} on Sundays." },
    { form: "nom", fi: "{W} on tässä maisemassa kaunis.", en: "The {en} is beautiful in this landscape." },
    { form: "part", fi: "Valokuvasin {w} auringonlaskun aikaan.", en: "I photographed the {en} at sunset." },
    { form: "elat", fi: "Opettaja kertoi {w} oppitunnilla.", en: "The teacher told us about the {en} in class." },
  ],
  "Weather & Seasons": [
    { form: "elat", fi: "Sääennuste kertoi {w} tarkasti.", en: "The weather forecast reported the {en} in detail." },
    { form: "elat", fi: "Suomalaiset puhuvat usein {w}.", en: "Finns often talk about the {en}." },
    { form: "nom", fi: "{W} vaikuttaa suunnitelmiimme paljon.", en: "The {en} affects our plans a lot." },
    { form: "part", fi: "Seuraan {w} uutisista joka päivä.", en: "I follow the {en} in the news every day." },
    { form: "nom", fi: "Suomessa {w} vaihtuu nopeasti.", en: "In Finland the {en} changes quickly." },
  ],
  "Time & Calendar": [
    { form: "nom", fi: "{W} kuluu nopeasti, kun on kiire.", en: "The {en} passes quickly when you are busy." },
    { form: "part", fi: "Odotin {w} kärsivällisesti.", en: "I waited for the {en} patiently." },
    { form: "elat", fi: "Sovimme {w} puhelimessa.", en: "We agreed about the {en} on the phone." },
    { form: "part", fi: "Merkitsin {w} kalenteriin.", en: "I marked the {en} in the calendar." },
    { form: "iness", fi: "Ehdin tehdä paljon {w}.", en: "I get a lot done during the {en}." },
  ],
  "Numbers & Math": [
    { form: "part", fi: "Opettaja selitti {w} matematiikan tunnilla.", en: "The teacher explained the {en} in the maths lesson." },
    { form: "part", fi: "Laskutehtävässä tarvitaan {w}.", en: "The exercise requires the {en}." },
    { form: "elat", fi: "Keskustelimme {w} pienessä ryhmässä.", en: "We discussed the {en} in a small group." },
    { form: "nom", fi: "{W} on helppo ymmärtää harjoituksen jälkeen.", en: "The {en} is easy to understand after practice." },
    { form: "part", fi: "Harjoittelen {w} joka viikko.", en: "I practise the {en} every week." },
  ],

  "Colors & Shapes": [
    { form: "nom", fi: "Seinän väri on {w}.", en: "The colour of the wall is {en}." },
    { form: "part", fi: "Piirsin {w} paperille.", en: "I drew a {en} on the paper." },
    { form: "elat", fi: "Pidän tästä {w} sisustuksessa.", en: "I like this {en} in interior design." },
    { form: "nom", fi: "Tämä kuva on {w}.", en: "This picture is {en}." },
  ],
  "Family & People": [
    { form: "nom", fi: "{W} asuu lähellä meitä.", en: "The {en} lives near us." },
    { form: "part", fi: "Tapaan {w} viikonloppuna.", en: "I am meeting the {en} at the weekend." },
    { form: "elat", fi: "Kerroin {w} ystävälleni.", en: "I told my friend about the {en}." },
    { form: "adess", fi: "{W} on kaksi lasta.", en: "The {en} has two children." },
  ],
  "Emotions & Feelings": [
    { form: "part", fi: "Tunnen {w} usein aamulla.", en: "I often feel {en} in the morning." },
    { form: "elat", fi: "Puhuin {w} terapeutin kanssa.", en: "I talked about the {en} with a therapist." },
    { form: "nom", fi: "{W} on täysin normaali tunne.", en: "The {en} is a completely normal feeling." },
    { form: "part", fi: "Yritän ymmärtää {w} paremmin.", en: "I try to understand the {en} better." },
  ],
  Education: [
    { form: "iness", fi: "Opiskelen {w} joka viikko.", en: "I study in the {en} every week." },
    { form: "part", fi: "Opiskelen {w} suomen kurssilla.", en: "I study the {en} in the Finnish course." },
    { form: "elat", fi: "Opettaja kertoi {w} tarkemmin.", en: "The teacher explained more about the {en}." },
    { form: "nom", fi: "{W} on hyödyllinen YKI-kokeessa.", en: "The {en} is useful in the YKI exam." },
  ],
  "Work & Professions": [
    { form: "nom", fi: "{W} tekee työtä sairaalassa.", en: "The {en} works at a hospital.", needs: /(teacher|doctor|nurse|engineer|police|driver|chef|cook|lawyer|researcher|professor|programmer|therapist|dentist|scientist|psycholog|surgeon|midwife|pharmacist|electrician|plumber|architect|journalist|accountant|cleaner|carpenter|farmer|guard|secretary|manager|waiter|barber|veterinar)/i },
    { form: "part", fi: "Etsin {w} verkkosivuilta.", en: "I am looking for a {en} on the website." },
    { form: "elat", fi: "Keskustelimme {w} työpaikkahaastattelussa.", en: "We discussed the {en} in the job interview." },
    { form: "nom", fi: "Haluaisin joskus olla {w}.", en: "I would like to be a {en} some day." },
  ],
  Transport: [
    { form: "nom", fi: "{W} lähtee asemalta kello kaksi.", en: "The {en} leaves the station at two o'clock.", needs: /(train|bus|tram|metro|coach|ferry|boat|flight|plane)/i },
    { form: "iness", fi: "Luen kirjaa {w}.", en: "I read a book on the {en}.", needs: /(train|bus|tram|metro|coach|ferry|boat|plane|flight)/i },
    { form: "part", fi: "Odotan {w} pysäkillä.", en: "I am waiting for the {en} at the stop.", needs: /(train|bus|tram|metro|coach|taxi)/i },
    { form: "elat", fi: "Kysyin lisätietoja {w} neuvonnasta.", en: "I asked for more information about the {en} at the info desk." },
  ],
  "City & Places": [
    { form: "iness", fi: "Käyn {w} kerran viikossa.", en: "I visit the {en} once a week." },
    { form: "nom", fi: "{W} on aivan kotini lähellä.", en: "The {en} is right near my home." },
    { form: "illat", fi: "Menen {w} bussilla.", en: "I go to the {en} by bus." },
    { form: "elat", fi: "Ystäväni kertoi {w} paljon hyvää.", en: "My friend said many good things about the {en}." },
  ],
  "Travel & Tourism": [
    { form: "part", fi: "Varasin {w} netistä etukäteen.", en: "I booked the {en} online in advance." },
    { form: "nom", fi: "{W} oli matkan paras osa.", en: "The {en} was the best part of the trip." },
    { form: "elat", fi: "Luin {w} matkaoppaasta.", en: "I read about the {en} in the travel guide." },
    { form: "iness", fi: "Otin valokuvia {w}.", en: "I took photos in the {en}." },
  ],
  "Shopping & Money": [
    { form: "nom", fi: "{W} maksaa noin kaksikymmentä euroa.", en: "The {en} costs about twenty euros." },
    { form: "part", fi: "Ostin {w} alennuksesta.", en: "I bought the {en} on sale." },
    { form: "elat", fi: "Kysyin {w} hinnasta myyjältä.", en: "I asked the seller about the price of the {en}." },
    { form: "gen", fi: "Tämän {w} hinta on liian korkea.", en: "The price of this {en} is too high." },
  ],
  "Sports & Hobbies": [
    { form: "part", fi: "Harrastan {w} kolme kertaa viikossa.", en: "I do {en} three times a week." },
    { form: "nom", fi: "{W} on Suomessa suosittu harrastus.", en: "The {en} is a popular hobby in Finland." },
    { form: "elat", fi: "Innostuin {w} viime talvena.", en: "I got excited about the {en} last winter." },
    { form: "part", fi: "Opettelen {w} ohjaajan kanssa.", en: "I am learning the {en} with an instructor." },
  ],
  Technology: [
    { form: "part", fi: "Käytän {w} päivittäin työssäni.", en: "I use the {en} daily in my work." },
    { form: "nom", fi: "{W} helpottaa arkea paljon.", en: "The {en} makes everyday life much easier." },
    { form: "elat", fi: "Luin {w} teknologialehdestä.", en: "I read about the {en} in a technology magazine." },
    { form: "gen", fi: "Tämän {w} asetukset ovat helpot.", en: "The settings of this {en} are easy." },
  ],
  "Media & Communication": [
    { form: "part", fi: "Seuraan {w} joka päivä.", en: "I follow the {en} every day." },
    { form: "nom", fi: "{W} kertoi asiasta ensimmäisenä.", en: "The {en} reported the matter first." },
    { form: "elat", fi: "Kuulin uutisen {w}.", en: "I heard the news from the {en}." },
    { form: "elat", fi: "Kirjoitin {w} lyhyen kommentin.", en: "I wrote a short comment about the {en}." },
  ],
  "Government & Society": [
    { form: "nom", fi: "{W} tekee päätökset yhdessä.", en: "The {en} makes decisions together." },
    { form: "elat", fi: "Keskustelimme {w} kansalaisopistossa.", en: "We discussed the {en} at the adult education centre." },
    { form: "part", fi: "Kansalaiset seuraavat {w} tarkasti.", en: "Citizens follow the {en} closely." },
    { form: "nom", fi: "{W} vaikuttaa monen ihmisen arkeen.", en: "The {en} affects the daily life of many people." },
  ],
  "Law & Safety": [
    { form: "part", fi: "Kaikkien pitää noudattaa {w}.", en: "Everyone must follow the {en}." },
    { form: "nom", fi: "{W} suojelee ihmisiä.", en: "The {en} protects people." },
    { form: "elat", fi: "Poliisi kertoi {w} tarkemmin.", en: "The police explained the {en} in more detail." },
    { form: "elat", fi: "Opettaja kertoi meille {w}.", en: "The teacher told us about the {en}." },
  ],
  Environment: [
    { form: "part", fi: "Meidän pitää suojella {w}.", en: "We must protect the {en}." },
    { form: "nom", fi: "{W} vaikuttaa kaikkien elämään.", en: "The {en} affects everyone's life." },
    { form: "elat", fi: "Luennolla puhuttiin {w}.", en: "The lecture talked about the {en}." },
    { form: "part", fi: "Kaupunki tutkii {w} joka vuosi.", en: "The city studies the {en} every year." },
  ],
  Science: [
    { form: "part", fi: "Tutkijat tutkivat {w} laboratoriossa.", en: "Researchers study the {en} in the laboratory." },
    { form: "nom", fi: "{W} selittää monta ilmiötä.", en: "The {en} explains many phenomena." },
    { form: "elat", fi: "Luin artikkelin {w}.", en: "I read an article about the {en}." },
    { form: "gen", fi: "Tämän {w} merkitys on suuri.", en: "The significance of this {en} is great." },
  ],
  "Economy & Business": [
    { form: "part", fi: "Yritys suunnittelee {w} tarkasti.", en: "The company plans the {en} carefully." },
    { form: "nom", fi: "{W} kasvoi viime vuonna.", en: "The {en} grew last year." },
    { form: "elat", fi: "Uutisissa kerrottiin {w}.", en: "The news reported on the {en}." },
    { form: "gen", fi: "Tämän {w} tulos oli hyvä.", en: "The result of this {en} was good." },
  ],
  "Culture & Arts": [
    { form: "iness", fi: "Kävin {w} viime viikolla.", en: "I visited the {en} last week." },
    { form: "part", fi: "Rakastan {w} ja sen historiaa.", en: "I love the {en} and its history." },
    { form: "nom", fi: "{W} kiinnostaa monia nuoria.", en: "The {en} interests many young people." },
    { form: "elat", fi: "Opettaja kertoi {w} innostuneesti.", en: "The teacher spoke about the {en} with enthusiasm." },
  ],
  History: [
    { form: "elat", fi: "Luimme {w} historian tunnilla.", en: "We read about the {en} in history class." },
    { form: "nom", fi: "{W} muutti Suomen elämää.", en: "The {en} changed life in Finland." },
    { form: "part", fi: "Museo esittelee {w} monipuolisesti.", en: "The museum presents the {en} from many angles." },
    { form: "gen", fi: "Tämän {w} vaiheet ovat kiinnostavia.", en: "The stages of this {en} are interesting." },
  ],
  "Finnish Culture & Sisu": [
    { form: "nom", fi: "{W} kuuluu suomalaiseen arkeen.", en: "The {en} is part of everyday Finnish life." },
    { form: "part", fi: "Kokeilin {w} ensimmäisen kerran Suomessa.", en: "I tried the {en} for the first time in Finland." },
    { form: "elat", fi: "Ystäväni kertoi minulle {w}.", en: "My friend told me about the {en}." },
    { form: "iness", fi: "Perinne näkyy {w} selvästi.", en: "The tradition is clearly visible in the {en}." },
  ],
};

/* --------------------------- non-noun templates ---------------------------- */

// Verbs are stored in the infinitive, so every template keeps the infinitive.
const VERB_TEMPLATES: Template[] = [
  { fi: "Haluan {w} tänään.", en: "I want to {en} today.", form: "nom" },
  { fi: "Minun täytyy {w} ennen iltaa.", en: "I have to {en} before the evening.", form: "nom" },
  { fi: "Voitko {w} minun kanssani?", en: "Can you {en} with me?", form: "nom" },
  { fi: "On mukavaa {w} ystävien kanssa.", en: "It is nice to {en} with friends.", form: "nom" },
  { fi: "En halua {w} yksin.", en: "I do not want to {en} alone.", form: "nom" },
  { fi: "Opettelen {w} suomeksi.", en: "I am learning to {en} in Finnish.", form: "nom" },
  { fi: "Lapset rakastavat {w} kesällä.", en: "The children love to {en} in the summer.", form: "nom" },
  { fi: "Sinun ei tarvitse {w} kiireellä.", en: "You do not need to {en} in a hurry.", form: "nom" },
];

const ADJ_TEMPLATES: Template[] = [
  { fi: "Mielestäni tämä on aika {w}.", en: "In my opinion this is quite {en}.", form: "nom" },
  { fi: "Se tuntui minusta hyvin {w}.", en: "It felt very {en} to me.", form: "nom" },
  { fi: "Kaikki sanoivat, että se oli {w}.", en: "Everyone said that it was {en}.", form: "nom" },
  { fi: "Tämä tehtävä ei ollut lainkaan {w}.", en: "This exercise was not {en} at all.", form: "nom" },
  { fi: "Eilen ilta oli todella {w}.", en: "Yesterday evening was really {en}.", form: "nom" },
  { fi: "Suomen kielen opiskelu on välillä {w}.", en: "Studying Finnish is sometimes {en}.", form: "nom" },
  { fi: "Uusi tilanne vaikutti minusta {w}.", en: "The new situation seemed {en} to me.", form: "nom" },
];

const NUM_TEMPLATES: Template[] = [
  { fi: "Kirjoitin numeron {w} paperille.", en: "I wrote the number {en} on the paper.", form: "nom" },
  { fi: "Opettaja luki ääneen numeron {w}.", en: "The teacher read out the number {en}.", form: "nom" },
  { fi: "Laskun vastaus on {w}.", en: "The answer to the sum is {en}.", form: "nom" },
  { fi: "Bussi numero {w} menee keskustaan.", en: "Bus number {en} goes to the city centre.", form: "nom" },
  { fi: "Sivulla {w} on hyvä harjoitus.", en: "On page {en} there is a good exercise.", form: "nom" },
];

const ADV_TEMPLATES: Template[] = [
  { fi: "Hän tekee työnsä {w}.", en: "He does his work {en}.", form: "nom" },
  { fi: "Voitko puhua {w}, kiitos?", en: "Could you speak {en}, please?", form: "nom" },
  { fi: "Opiskelen suomea {w}.", en: "I study Finnish {en}.", form: "nom" },
  { fi: "Kävelen kotiin {w}.", en: "I walk home {en}.", form: "nom" },
  { fi: "Kirjoitan muistiinpanot {w}.", en: "I write my notes {en}.", form: "nom" },
];

/* -------------------------------- helpers --------------------------------- */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function inflect(word: string, form: Form): string | null {
  switch (form) {
    case "nom":
      return word;
    case "part":
      return partitiveSg(word);
    case "gen":
      return genitiveSg(word);
    case "iness":
      return inessiveSg(word);
    case "elat":
      return elativeSg(word);
    case "illat":
      return illativeSg(word);
    case "adess":
      return adessiveSg(word);
    default:
      return null;
  }
}

function render(t: Template, word: string, gloss: string): string[] | null {
  if (t.needs && !t.needs.test(gloss)) return null;
  const form = inflect(word, t.form);
  if (!form) return null;
  const fi = t.fi.replace("{W}", capitalize(form)).replace("{w}", form);
  const cleanGloss = gloss.replace(/^to\s+/i, "").trim();
  const en = t.en
    .replace("{En}", capitalize(cleanGloss))
    .replace("{en}", cleanGloss)
    .replace(/\ba (?=[aeiou])/g, "an ");
  return [fi, en];
}

export interface FinnishExampleInput {
  word: string;
  category: string;
  partOfSpeech?: string;
  definition: { en: string; vi: string };
}

/**
 * Builds a natural {example, exampleEn} pair for a vocabulary entry.
 * Curated overrides win; otherwise a deterministic template rotation is used.
 */
export function buildFinnishExample(entry: FinnishExampleInput): { example: string; exampleEn: string } {
  const word = entry.word;
  const override = getFinnishExampleOverride(word);
  if (override) return { example: override.fi, exampleEn: override.en };

  let pos = (entry.partOfSpeech || "noun").toLowerCase();
  // Many participial adjectives are tagged as nouns in the raw data
  // (hermostunut, kiinnostava). Route them to the adjective templates.
  if (/^noun/.test(pos) && /(nut|nyt|nnut|va|vä|ton|tön)$/.test(word) && !/\s/.test(word)) pos = "adj";
  // Only real numerals may use the arithmetic templates; many nouns in the
  // "Numbers & Math" category are mislabelled as "num" in the raw data.
  const isNumeral = /^(numeral|num)/.test(pos) && /^[a-zäö\s-]+$/.test(word) &&
    /(\\d|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|teen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|first|second|third|fourth|fifth)/i.test(entry.definition.en);
  let pool: Template[];
  let nounLike = false;
  if (/^verb/.test(pos)) pool = VERB_TEMPLATES;
  else if (/^adj/.test(pos)) pool = ADJ_TEMPLATES;
  else if (isNumeral) pool = NUM_TEMPLATES;
  else if (/^adv/.test(pos)) pool = ADV_TEMPLATES;
  else { pool = NOUN_POOLS[entry.category] || GENERIC; nounLike = true; }

  // Category templates come first (best semantic fit); neutral generic noun
  // templates are only a fallback, and only for noun-like entries.
  const chains = nounLike && pool !== GENERIC ? [pool, GENERIC] : [pool];
  for (const chain of chains) {
    const start = hash(word) % chain.length;
    for (let i = 0; i < chain.length; i++) {
      const t = chain[(start + i) % chain.length];
      const out = render(t, word, entry.definition.en);
      if (out) return { example: out[0], exampleEn: out[1] };
    }
  }

  // Last resort: nominative-only generic sentence (always grammatical).
  const gloss = entry.definition.en.replace(/^to\s+/i, "");
  return {
    example: `${capitalize(word)} on hyödyllinen sana arjessa.`,
    exampleEn: `"${gloss}" is a useful word in everyday life.`,
  };
}

/** Applies the normalizer to a whole vocabulary array. */
export function normalizeFinnishExamples<T extends FinnishExampleInput & { example: string; exampleEn: string }>(
  rows: T[]
): T[] {
  return rows.map((row) => ({ ...row, ...buildFinnishExample(row) }));
}
