/**
 * @file warm-listening-audio.mjs
 * @description Pre-generates and caches the AI voice files for the first IELTS
 * Listening full tests so students never wait for a cold recording.
 * Usage: bun scripts/warm-listening-audio.mjs [numberOfFullTests]
 * @copyright 2026 HaiEduTech
 */
import { readFileSync } from "node:fs";
const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx), line.slice(idx + 1).replace(/^"|"$/g, "")];
    })
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

const { ALL_LISTENING_SETS, IELTS_FULL_LISTENING_TESTS } = await import(
  "../src/data/ieltsListeningPractice.ts"
);
const { instructionsForSection, speedForSection, voiceForSpeaker } = await import(
  "../src/lib/ieltsListeningVoices.ts"
);

const count = Number(process.argv[2] ?? 5);
const wanted = new Set(IELTS_FULL_LISTENING_TESTS.slice(0, count).flatMap(test => test.setIds));
const sets = ALL_LISTENING_SETS.filter(set => wanted.has(set.id));
const PAGE = 12;

const speakerOf = (lines, index) => {
  for (let i = index; i >= 0; i--) {
    const match = lines[i].match(/^([A-Z][a-zA-Z]{1,20}):/);
    if (match) return match[1];
  }
  return null;
};

for (const set of sets) {
  const lines = set.transcript.split(/\n+/).map(line => line.trim()).filter(Boolean);
  const payload = lines.map((line, i) => ({
    i,
    text: line.replace(/^([A-Z][a-zA-Z]{1,20}):\s*/, ""),
    voice: voiceForSpeaker(speakerOf(lines, i), set.section),
    instructions: instructionsForSection(set.section, speakerOf(lines, i)),
    speed: speedForSection(set.section),
  }));
  for (let p = 0; p * PAGE < payload.length; p++) {
    const slice = payload.slice(p * PAGE, p * PAGE + PAGE);
    const res = await fetch(`${url}/functions/v1/listening-tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, apikey: key },
      body: JSON.stringify({ setId: set.id, lines: slice }),
    });
    if (!res.ok) {
      console.error(`${set.id} page ${p}: ${res.status}`);
      process.exit(1);
    }
    console.log(`${set.id} page ${p + 1} ok (${slice.length} turns)`);
  }
}
console.log(`warmed ${sets.length} recordings`);
