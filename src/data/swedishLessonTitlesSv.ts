/**
 * @file swedishLessonTitlesSv.ts
 * @description Native sv-SE titles for every Swedish lesson and tier so the
 *              course headings are shown in Swedish (YKI immersion), with the
 *              localized title kept only as a small helper line.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export const SWEDISH_LESSON_TITLES_SV: Record<string, string> = {
  // ── Tiers ──
  a1: "Nivå A1 - Grunderna",
  a2: "Nivå A2 - Vardagssvenska",
  b1: "Nivå B1 - Självständig svenska",

  // ── A1 ──
  "a1-pron": "Nordiskt uttal - grunderna",
  "a1-self": "Jag och min familj",
  "a1-num": "Räkneord, datum och klockan",
  "a1-greetings": "Hälsningar och artighet",
  "a1-shopping": "Enkla inköp och priser",
  "a1-directions": "Fråga om vägen och kollektivtrafik",
  "a1-weather": "Vädret i Norden",
  "a1-restaurant": "Beställa på café och restaurang",
  "a1-weather-seasons": "Vädret och de fyra årstiderna",
  "a1-nature-allemansrätten": "Naturen och allemansrätten",
  "a1-shopping-ica": "Handla på ICA och Lidl",
  "a1-housing": "Hitta en hyresbostad och skriva kontrakt",
  "a1-doctor": "Gå till doktorn och ringa 1177",
  "a1-work": "Enkel jobbintervju",
  "a1-hobbies": "Fritidsintressen och småprat om helgen",
  "a1-fika": "Fikakulturen på jobbet",
  "a1-alphabet": "Alfabetet med 29 bokstäver och stavning",
  "a1-pronouns": "Personliga pronomen och verben vara/ha",
  "a1-en-ett": "En- och ett-ord samt bestämd form",
  "a1-questions": "Ja/nej-frågor och frågeord",
  "a1-colors-clothes": "Färger och kläder",
  "a1-transport-tickets": "Resa och köpa biljett",
  "a1-body-health": "Kroppen och att berätta var det gör ont",
  "a1-daily-routine": "Dagsrutiner och vanor",

  // ── A2 ──
  "a2-v2": "Ordföljd V2 och omvänd ordföljd",
  "a2-enett": "Substantiv en/ett och bestämd form",
  "a2-tense": "Presens och preteritum",
  "a2-email": "Skriva e-post och korta meddelanden",
  "a2-modal": "Hjälpverb: kan, vill, ska, måste",
  "a2-work": "På arbetsplatsen och samtal med kollegor",
  "a2-health": "Hälsa och läkarbesök",
  "a2-housing": "Söka bostad och hyra lägenhet",
  "a2-transport": "Köpa biljett och resa med tåg",
  "a2-doctor-visit": "Besök på vårdcentralen",
  "a2-emotions-small-talk": "Känslor och småprat på kontoret",
  "a2-bank-id": "Öppna bankkonto och skaffa BankID",
  "a2-perfekt": "Perfekt - har + supinum",
  "a2-imperativ": "Imperativ - ge instruktioner",
  "a2-sa-att": "Bisatser med så att och för att",
  "a2-email-pro": "Formell e-post på jobbet",
  "a2-future": "Framtid med ska och kommer att",

  // ── B1 ──
  "b1-sub": "Bisatser och subjunktioner",
  "b1-inv": "Inversion och satsadverb",
  "b1-vocab": "Ordförråd för nyanserade texter",
  "b1-opinion": "Uttrycka åsikter och argumentera",
  "b1-news": "Förstå nyheter och reportage",
  "b1-discuss": "Diskutera och hålla ett samtal",
  "b1-job": "Jobbintervju och arbetslivet",
  "b1-environment": "Miljö och hållbarhet",
  "b1-future": "Planer och framtidsvisioner",
  "b1-climate-debate": "Klimatdebatten i Sverige",
  "b1-digital-life": "Det digitala livet och e-tjänster",
};

/** Returns the Swedish title for a lesson/tier id, or null when unmapped. */
export const svTitle = (id: string): string | null =>
  SWEDISH_LESSON_TITLES_SV[id] ?? null;
