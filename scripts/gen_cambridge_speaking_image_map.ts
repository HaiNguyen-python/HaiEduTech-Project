/**
 * Generates src/data/cambridgeSpeakingImageMap.ts - an explicit
 * task id -> picture key map for Cambridge Speaking Practice.
 * Run: bunx tsx scripts/gen_cambridge_speaking_image_map.ts
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { writeFileSync } from "node:fs";
import { cleanCambridgeSpeakingTasks as TASKS } from "../src/data/cambridgeSpeakingTasks";

type Rule = [RegExp, string];

// Two-picture A/B sheets - only for "find the differences" tasks.
const DIFF: Rule[] = [
  [/kitchen|cook/i, "fl-kitchen-diff"],
  [/museum|dinosaur/i, "fl-museum-diff"],
  [/librar/i, "fl-library-diff"],
  [/party|birthday|celebrat/i, "fl-party-diff"],
  [/zoo|monkey|animal/i, "mv-zoo-diff"],
  [/market|seller|flower/i, "mv-market-diff"],
  [/classroom|school|lesson|teacher/i, "mv-classroom-diff"],
  [/shop|supermarket|buy|shopping/i, "mv-shop-diff"],
  [/bedroom|my room|room|house|home|flat/i, "mv-bedroom-diff"],
  [/park|garden|playground|street|town/i, "mv-park-diff"],
];

// Multi-panel story strips - only for "picture story" tasks.
const STORY: Rule[] = [
  [/kite/i, "mv-kite-story"],
  [/cake|birthday/i, "mv-cake-story"],
  [/key/i, "fl-keys-story"],
  [/puppy/i, "fl-puppy-story"],
  [/neighbour|neighbor|helpful/i, "fl-neighbour-story"],
  [/helping her family|helping his family|girl helping|helps her family|tidy/i, "mv-helping-story"],
  [/visitor|surprise/i, "fl-visitor-story"],
  [/school trip/i, "fl-trip-story"],
  [/camp|tent|forest|mountain/i, "fl-camping-story"],
  [/\bbeach\b|\bseaside\b|\bswim/i, "mv-beach-story"],
  [/\bsports?\b|\brace\b|\bmatch\b|\brunning\b|\bfootball\b|\bteam\b/i, "fl-sports-story"],
  [/\bcat\b|\bdog\b|\bpet\b|\blost\b/i, "mv-lost-cat"],
  [/\brain|\bweather\b|\bstorm|\bwet\b|\bumbrella/i, "mv-rainy-story"],
];

// Starters / Movers / Flyers single scenes and object cards (illustrations).
const KID_SCENE: Rule[] = [
  [/\bballoons?\b/i, "st-balloons"],
  [/\bballs?\b/i, "st-balls"],
  [/\bmonster\b/i, "st-monster"],
  [/school bag|in the bag|in your bag|\bschoolbag\b/i, "st-schoolbag"],
  [/\bfruit\b|\bapples?\b|\bbananas?\b|\boranges?\b/i, "st-fruit"],
  [/\bclothes\b|\bwearing\b|\bshirt\b|\bdress\b|\bshoes\b/i, "st-clothes"],
  [/\btoys?\b|\bteddy\b|\bdolls?\b|\bgames?\b/i, "st-toys"],
  [/\bfood\b|\bmeals?\b|\bbreakfast\b|\blunch\b|\bdinner\b|\bsweet\b|\bdrinks?\b|\beat\b/i, "st-food"],
  [/\bfarm\b/i, "st-farm"],
  [/\bzoo\b|\banimals?\b|\bbirds?\b|\bfish\b|\bpets?\b/i, "st-animals"],
  [/\bbedroom\b|\bmy room\b|\bbed\b/i, "st-bedroom"],
  [/\bhouse\b|\bhome\b|\bfamily\b|\bflat\b/i, "st-house"],
  [/\blibrar/i, "st-library"],
  [/\bclassroom\b|\bteacher\b|\bschool\b|\blesson\b|\bdesk\b/i, "st-classroom"],
  [/\bbeach\b|\bsea\b|\bholiday\b|\bswim/i, "st-beach"],
  [/\bpark\b|\bplayground\b|\boutside\b/i, "st-park"],
  [/\btown\b|\bstreet\b|\bplaces\b|\bcity\b|\bvillage\b/i, "fl-town-places"],
];

// KET / PET photographs.
const PHOTO: Rule[] = [
  [/bus stop|waiting at a bus/i, "ke-busstop"],
  [/beach|litter|cleaning/i, "pe-beach-clean"],
  [/volunt/i, "pe-beach-clean"],
  [/moving into|new home|moving house/i, "pe-moving-home"],
  [/train station|busy station|station/i, "pe-station"],
  [/train|travelling|travel|journey|transport/i, "pe-train"],
  [/studying together|study group|group study|students studying|study/i, "pe-study-group"],
  [/librar/i, "pe-library"],
  [/working together|team|project|colleagues/i, "pe-teamwork"],
  [/cooking|someone cooking|family cooking/i, "ke-cooking"],
  [/\bdinner\b|\bmeal\b|eating together/i, "ke-family-dinner"],
  [/cafe|restaurant|coffee/i, "ke-cafe"],
  [/\bmarket\b|\bshopping\b|\bshoppers\b|\bshop\b|\bsupermarket\b|food stall/i, "ke-market"],
  [/celebration|party|festival|wedding/i, "ke-celebration"],
  [/sport|exercise|match|swim|football|running/i, "ke-sport"],
  [/lesson|classroom|class\b|students in a lesson|language class/i, "ke-lesson"],
  [/phone|social media|internet|technolog|computer/i, "ke-phones"],
  [/music|concert|band|sing/i, "ke-music"],
  [/weather|rain|storm|bad weather/i, "ke-weather"],
  [/work|job|office|career|business/i, "ke-job"],
  [/park|weekend|relax|outdoors|picnic/i, "ke-park-summer"],
  [/farm|nature|environment|countryside|plant/i, "pe-farm"],
];

// Alternative pictures for the same idea. Tasks that resolve to one of these
// keys are spread round-robin across the variants so no single picture is
// reused more than a handful of times across the whole bank.
const VARIANTS: Record<string, string[]> = {
  "st-toys": ["st-toys", "st-toys-b"],
  "st-bedroom": ["st-bedroom", "st-bedroom-b"],
  "st-park": ["st-park", "st-park-b"],
  "st-fruit": ["st-fruit", "st-fruit-b"],
  "st-classroom": ["st-classroom", "st-classroom-b"],
  "mv-park-diff": ["mv-park-diff", "mv-park-diff-b"],
  "mv-bedroom-diff": ["mv-bedroom-diff", "mv-bedroom-diff-b"],
  "mv-shop-diff": ["mv-shop-diff", "mv-shop-diff-b"],
  "mv-market-diff": ["mv-market-diff", "mv-market-diff-b"],
  "fl-kitchen-diff": ["fl-kitchen-diff", "fl-kitchen-diff-b"],
  "mv-kite-story": ["mv-kite-story", "mv-kite-story-b"],
  "mv-cake-story": ["mv-cake-story", "mv-cake-story-b"],
  "mv-rainy-story": ["mv-rainy-story", "mv-rainy-story-b"],
  "fl-camping-story": ["fl-camping-story", "fl-camping-story-b"],
  "fl-sports-story": ["fl-sports-story", "fl-sports-story-b"],
  "ke-market": ["ke-market", "ke-market-b", "ke-market-c", "ke-market-d"],
  "ke-sport": ["ke-sport", "ke-sport-b"],
  "ke-celebration": ["ke-celebration", "ke-celebration-b"],
  "ke-job": ["ke-job", "ke-job-b"],
  "ke-busstop": ["ke-busstop", "ke-busstop-b"],
  "ke-lesson": ["ke-lesson", "ke-lesson-b"],
  "ke-cooking": ["ke-cooking", "ke-cooking-b"],
  "ke-cafe": ["ke-cafe", "ke-cafe-b"],
  "ke-music": ["ke-music", "ke-music-b"],
  "ke-phones": ["ke-phones", "ke-phones-b"],
  "ke-study-group": ["ke-study-group"],
  "pe-market": ["pe-market", "pe-market-b"],
  "pe-train": ["pe-train", "pe-train-b"],
  "pe-station": ["pe-station", "pe-station-b"],
  "pe-study-group": ["pe-study-group", "pe-study-group-b"],
};

/**
 * Photographs are level specific: a B1 Preliminary card must not show an
 * A2 Key photo and the other way round. Any key produced by the shared photo
 * rules is translated into the picture built for that level.
 */
const LEVEL_EQUIVALENT: Record<string, Record<string, string>> = {
  pet: {
    "ke-job": "pe-job",
    "ke-cooking": "pe-cooking",
    "ke-family-dinner": "pe-family-dinner",
    "ke-celebration": "pe-family-dinner",
    "ke-cafe": "pe-family-dinner",
    "ke-market": "pe-market",
    "ke-sport": "pe-sport",
    "ke-lesson": "pe-study-group",
    "ke-phones": "pe-study-group",
    "ke-music": "pe-teamwork",
    "ke-busstop": "pe-station",
    "ke-weather": "pe-farm",
    "ke-park-summer": "pe-farm",
  },
  ket: {
    "pe-library": "ke-library",
    "pe-station": "ke-station",
    "pe-train": "ke-busstop",
    "pe-study-group": "ke-study-group",
    "pe-teamwork": "ke-job",
    "pe-beach-clean": "ke-park-summer",
    "pe-farm": "ke-weather",
    "pe-moving-home": "ke-cafe",
  },
};

/** Kid illustrations (st-/mv-/fl-) share one visual family across the YLE levels. */
const ALLOWED_PREFIX: Record<string, RegExp> = {
  starters: /^(st|mv|fl)-/,
  movers: /^(st|mv|fl)-/,
  flyers: /^(st|mv|fl)-/,
  ket: /^ke-/,
  pet: /^pe-/,
};

const toLevel = (key: string, level: string): string => {
  const base = key.replace(/-[b-d]$/, "");
  const mapped = LEVEL_EQUIVALENT[level]?.[base] ?? LEVEL_EQUIVALENT[level]?.[key] ?? key;
  return ALLOWED_PREFIX[level]?.test(mapped) ? mapped : mapped;
};

const rotation = new Map<string, number>();
const spread = (key: string): string => {
  const pool = VARIANTS[key];
  if (!pool) return key;
  const n = rotation.get(key) ?? 0;
  rotation.set(key, n + 1);
  return pool[n % pool.length];
};

const pick = (rules: Rule[], text: string): string | undefined => {
  for (const [re, key] of rules) if (re.test(text)) return key;
  return undefined;
};

const DIFF_DEFAULT = "mv-park-diff";
const STORY_DEFAULT = "mv-rainy-story";
const PHOTO_DEFAULT: Record<string, string> = { ket: "ke-cafe", pet: "pe-station" };
const KID_DEFAULT: Record<string, string> = { starters: "st-toys", movers: "st-park", flyers: "fl-town-places" };

// A task shows a picture only when the wording (or the exam part) really
// points at one. Collaborative tasks show written options, never a photo,
// and "odd one out" cards list their four words in the prompt.
const NEEDS =
  /look at|these (?:two |three |four |five |six )?pictures|the pictures|this picture|the picture|picture story|photo|photograph|scene|differences|tell the story|tell me the story/i;
const PICTURE_PARTS =
  /find the differences|picture story|describe the picture|photo|scene card|long turn|object cards/i;
const NO_PICTURE_PROMPT = /talk about a book|talk about a story you|discuss these|point to|:\s*(?:a|an|the)\s[^.?]*,\s/i;
const isOdd = (t: { part: string; prompt: string }) =>
  /odd one out/i.test(t.part) || /which one is different|which one does not belong/i.test(t.prompt);

const entries: string[] = [];
const missing: string[] = [];
const mismatched: string[] = [];
const usage = new Map<string, number>();

for (const t of TASKS as { id: string; level: string; part: string; topic: string; prompt: string }[]) {
  if (isOdd(t) || /collaborative/i.test(t.part) || NO_PICTURE_PROMPT.test(t.prompt)) continue;
  // A2 Key Part 2 always works from a picture prompt, even when the question
  // wording does not mention it.
  const ketDiscussion = t.level === "ket" && /Part 2/i.test(t.part);
  if (!(PICTURE_PARTS.test(t.part) || NEEDS.test(t.prompt) || ketDiscussion)) continue;

  const text = `${t.topic} ${t.prompt}`;
  let key: string | undefined;
  if (/difference/i.test(t.part) || /difference/i.test(t.prompt)) {
    key = pick(DIFF, text) ?? DIFF_DEFAULT;
  } else if (/story/i.test(t.part) || /tell (?:me )?the story|these pictures show/i.test(t.prompt)) {
    key = pick(STORY, text) ?? STORY_DEFAULT;
  } else if (t.level === "ket" || t.level === "pet") {
    key = toLevel(pick(PHOTO, text) ?? PHOTO_DEFAULT[t.level], t.level);
  } else {
    key = pick(KID_SCENE, text) ?? KID_DEFAULT[t.level] ?? "st-toys";
  }
  if (!key) {
    missing.push(t.id);
    continue;
  }
  key = spread(key);
  if (ALLOWED_PREFIX[t.level] && !ALLOWED_PREFIX[t.level].test(key)) {
    mismatched.push(`${t.id} (${t.level}) -> ${key}`);
  }
  usage.set(key, (usage.get(key) ?? 0) + 1);
  entries.push(`  "${t.id}": "${key}",`);
}

const header = `/**
 * Explicit picture assignment for every Cambridge Speaking Practice task
 * that shows an exam picture. Generated by
 * scripts/gen_cambridge_speaking_image_map.ts - do not hand-edit ids here,
 * edit the rules in that script and regenerate.
 * A task that is absent from this map shows no picture.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
export const speakingImageMap: Record<string, string> = {
`;
writeFileSync("src/data/cambridgeSpeakingImageMap.ts", header + entries.join("\n") + "\n};\n");

console.log(`mapped ${entries.length} tasks, ${usage.size} images used`);
[...usage.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(`  ${k}: ${n}`));
if (missing.length) console.log("unmapped:", missing.join(", "));
if (mismatched.length) console.log("level mismatch:", mismatched.join(", "));
