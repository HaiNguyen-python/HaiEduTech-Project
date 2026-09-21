import { useEffect, useMemo, useState } from "react";

/**
 * Runtime English IPA lookup for AI-generated lessons.
 * The dictionary (public/ipa/en-ipa.json) is built by scripts/build_en_ipa_dict.ts
 * and loaded lazily, only when a lesson actually needs phonemic transcriptions.
 */

let dictPromise: Promise<Record<string, string>> | null = null;
let dictCache: Record<string, string> | null = null;

export function loadEnglishIpaDict(): Promise<Record<string, string>> {
  if (dictCache) return Promise.resolve(dictCache);
  if (!dictPromise) {
    dictPromise = fetch("/ipa/en-ipa.json")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, string>) => {
        dictCache = data;
        return data;
      })
      .catch(() => {
        dictCache = {};
        return dictCache;
      });
  }
  return dictPromise;
}

const IPA_ONLY = /^[\sˈˌ.ːəɚɜɝɪiʊuɔɒɑæʌeɛoaɹɾrjwpbtdkgfvθðszʃʒhmnŋlʧʤtʃdʒeɪaɪɔɪaʊoʊ()/[\]|-]+$/u;
const IPA_HINT = /[ˈˌəɚɪʊʃʒθðŋɹɔæɛɑʌː]/u;

/** True when a string looks like real IPA rather than an ad-hoc respelling ("ri-TAY-ner"). */
export function isIpaLike(value?: string): boolean {
  if (!value) return false;
  const trimmed = value.replace(/^\/+|\/+$/g, "").replace(/^\[+|\]+$/g, "").trim();
  if (!trimmed) return false;
  if (/[A-Z]{2,}/.test(trimmed)) return false; // SET-l-mənt style respelling
  if (!IPA_HINT.test(trimmed)) return false;
  return IPA_ONLY.test(trimmed);
}

const cleanWord = (word: string) =>
  word
    .toLowerCase()
    .replace(/[^a-z''-]/g, "")
    .replace(/'/g, "'");

const SUFFIXES: Array<[RegExp, string]> = [
  [/ing$/, "ɪŋ"],
  [/ings$/, "ɪŋz"],
  [/ness$/, "nəs"],
  [/less$/, "ləs"],
  [/ly$/, "li"],
];

function wordToIpa(word: string, dict: Record<string, string>): string | null {
  const direct = dict[word] ?? dict[word.replace(/'s$/, "")];
  if (direct) return direct;

  // Compound words: "onboarding" -> "on" + "boarding".
  for (let i = 3; i <= word.length - 3; i++) {
    const left = dict[word.slice(0, i)];
    const right = dict[word.slice(i)];
    if (left && right) return `${left}${right}`;
  }

  // Regular derivations: "reviewing" -> "review" + ɪŋ.
  for (const [pattern, tail] of SUFFIXES) {
    if (!pattern.test(word)) continue;
    const stem = word.replace(pattern, "");
    const base = dict[stem] ?? dict[`${stem}e`];
    if (base) return `${base}${tail}`;
  }
  return null;
}

/** Transcribes a word or multiword phrase. Returns null when any word is unknown. */
export function phraseToIpa(phrase: string, dict: Record<string, string>): string | null {
  const words = phrase.split(/\s+/).map(cleanWord).filter(Boolean);
  if (!words.length) return null;
  const parts: string[] = [];
  for (const word of words) {
    const hit = wordToIpa(word, dict);
    if (!hit) return null;
    parts.push(hit);
  }
  return parts.join(" ");
}

export function formatIpa(ipa: string): string {
  return `/${ipa.replace(/^\/+|\/+$/g, "")}/`;
}

/**
 * Resolves the best transcription for a term:
 * dictionary IPA first, then the model's value only when it is genuine IPA.
 */
export function resolveIpa(term: string, fallback: string | undefined, dict: Record<string, string>): string | null {
  const fromDict = phraseToIpa(term, dict);
  if (fromDict) return formatIpa(fromDict);
  if (isIpaLike(fallback)) return formatIpa(fallback!.trim());
  return null;
}

/** Loads the dictionary when `enabled` and returns term -> IPA for the given terms. */
export function useEnglishIpa(terms: string[], enabled: boolean): Record<string, string> {
  const [dict, setDict] = useState<Record<string, string>>(dictCache ?? {});

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadEnglishIpaDict().then((data) => {
      if (alive) setDict(data);
    });
    return () => {
      alive = false;
    };
  }, [enabled]);

  const key = terms.join("|");
  return useMemo(() => {
    if (!enabled) return {};
    const map: Record<string, string> = {};
    for (const term of terms) {
      const ipa = phraseToIpa(term, dict);
      if (ipa) map[term] = formatIpa(ipa);
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, dict, enabled]);
}
