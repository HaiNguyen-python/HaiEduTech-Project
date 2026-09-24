/**
 * @file ieltsListeningVoices.ts
 * @description Maps a speaker label in an IELTS Listening transcript to a stable
 * high-quality AI voice, so the same character keeps the same voice inside a set
 * and different characters always sound different.
 * @copyright 2026 HaiEduTech
 */

/** Clear, lively voices offered by the AI speech model, split by perceived gender. */
const FEMALE_VOICES = ["shimmer", "coral", "nova"] as const;
const MALE_VOICES = ["echo", "ash", "fable"] as const;

const FEMALE_NAMES =
  /^(anna|sarah|chloe|emma|lisa|mary|jane|kate|sophie|olivia|amelia|sophia|grace|lily|mia|ava|ella|zoe|julia|maria|hannah|laura|emily|alice|nora|rachel|claire|receptionist|woman|female|assistant|librarian|clerk)$/i;
const MALE_NAMES =
  /^(ben|daniel|tom|john|mark|david|james|harry|jack|peter|paul|michael|alex|robert|matthew|noah|oliver|ethan|liam|william|simon|chris|adam|sam|man|male|guide|lecturer|professor|officer|manager)$/i;

const hash = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};

/** Deterministic voice id for a speaker label (null = narrator / single speaker). */
export const voiceForSpeaker = (speaker: string | null, section: number): string => {
  const label = (speaker ?? (section === 4 ? "lecturer" : "narrator")).trim().toLowerCase();
  const h = hash(label);
  const female = FEMALE_NAMES.test(label) ? true : MALE_NAMES.test(label) ? false : h % 2 === 0;
  const pool = female ? FEMALE_VOICES : MALE_VOICES;
  return pool[h % pool.length];
};

/** Voice-direction prompt: British exam recording, section-appropriate pacing. */
export const instructionsForSection = (section: number, speaker: string | null): string => {
  const role =
    section === 1
      ? "a natural everyday conversation on the telephone or at a service desk"
      : section === 2
        ? "a friendly public talk or briefing to a group of visitors"
        : section === 3
          ? "an academic tutorial discussion at a university"
          : "a university lecture";
  const who = speaker ? `You are the speaker called "${speaker}".` : "";
  return [
    "Perform this as a polished British IELTS Listening recording with a neutral RP accent.",
    `This line comes from ${role}.`,
    who,
    "Keep the vocal tone clear, warm, alert and naturally bright, with human variation and forward energy. Avoid a deep, sleepy, flat or announcer-like delivery, but never sound shrill, theatrical or cartoonish.",
    section === 4
      ? "Sound like an engaging real university lecturer: fluent, articulate and expressive, with meaningful emphasis rather than a low monotone."
      : section === 3
        ? "Sound like a genuinely engaged university discussion: responsive, thoughtful and conversational, with varied emphasis rather than a formal monotone."
        : "Sound friendly, attentive and spontaneous, using connected speech, responsive intonation and subtle conversational energy.",
    "Keep a natural 1.0 speaking pace. Never sound like slow dictation.",
    "Never announce answers or add words that are not in the text.",
  ]
    .filter(Boolean)
    .join(" ");
};

/** Natural recording pace; the player applies any learner-selected multiplier. */
export const speedForSection = (_section?: number) => 1.0;
