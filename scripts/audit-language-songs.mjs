#!/usr/bin/env node

/**
 * Audits a language_songs JSON export. Export rows as a JSON array and run:
 *   node scripts/audit-language-songs.mjs path/to/language_songs.json
 */

import fs from "node:fs";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/audit-language-songs.mjs <songs.json>");
  process.exit(2);
}

const rows = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const errors = [];
const titleKeys = new Set();
const allowedLanguages = new Set(["english", "chinese", "finnish", "vietnamese"]);

const report = (song, message) => {
  errors.push(`${song.language ?? "unknown"} | ${song.title ?? "untitled"} | ${message}`);
};

for (const song of rows) {
  if (!allowedLanguages.has(song.language)) report(song, "invalid language");
  const titleKey = `${song.language}:${String(song.title ?? "").trim().toLocaleLowerCase()}`;
  if (titleKeys.has(titleKey)) report(song, "duplicate title in language");
  titleKeys.add(titleKey);

  if (!song.is_public_domain) report(song, "not cleared for full-lyrics display");
  if (!Array.isArray(song.lyrics) || song.lyrics.length < 4) {
    report(song, "lyrics missing or unusually short");
    continue;
  }

  song.lyrics.forEach((line, lineIndex) => {
    if (!String(line?.original ?? "").trim()) report(song, `line ${lineIndex}: missing original`);
    if (!String(line?.translation ?? "").trim()) report(song, `line ${lineIndex}: missing translation`);
    if (/\.{3}|…/.test(String(line?.original ?? ""))) report(song, `line ${lineIndex}: ellipsis used as omitted lyrics`);
    if (song.language === "chinese" && !String(line?.pinyin ?? "").trim()) {
      report(song, `line ${lineIndex}: missing Pinyin`);
    }
    if (line?.durationMs != null && (!Number.isInteger(line.durationMs) || line.durationMs < 1000 || line.durationMs > 15000)) {
      report(song, `line ${lineIndex}: durationMs must be an integer from 1000 to 15000`);
    }
  });

  if (!Array.isArray(song.core_vocab) || song.core_vocab.length < 5) {
    report(song, "fewer than 5 core vocabulary items");
  } else {
    song.core_vocab.forEach((item, vocabIndex) => {
      if (!String(item?.word ?? "").trim() || !String(item?.meaning ?? "").trim() || !String(item?.example ?? "").trim()) {
        report(song, `vocabulary ${vocabIndex}: word, meaning, and example are required`);
      }
    });
  }

  if (!Array.isArray(song.blanks_quiz) || song.blanks_quiz.length < 1) {
    report(song, "missing fill-in-the-blank items");
  } else {
    song.blanks_quiz.forEach((item, quizIndex) => {
      if (typeof item?.line === "string" && typeof item?.answer === "string") {
        if (!item.line.includes("___")) report(song, `quiz ${quizIndex}: legacy quiz has no blank marker`);
        return;
      }
      const line = song.lyrics[item?.lineIndex];
      if (!line) {
        report(song, `quiz ${quizIndex}: lineIndex is out of range`);
        return;
      }
      const words = String(line.original).split(/\s+/);
      for (const blank of item.blanks ?? []) {
        if (song.language === "chinese") {
          if (!String(line.original).includes(String(blank.answer))) {
            report(song, `quiz ${quizIndex}: answer not found in referenced line`);
          }
          continue;
        }
        const token = words[blank.wordIndex];
        if (!token) report(song, `quiz ${quizIndex}: wordIndex is out of range`);
        else if (
          !token.toLocaleLowerCase().includes(String(blank.answer).toLocaleLowerCase()) &&
          !String(line.original).toLocaleLowerCase().includes(String(blank.answer).toLocaleLowerCase())
        ) {
          report(song, `quiz ${quizIndex}: answer not found in referenced token`);
        }
      }
    });
  }
}

const counts = Object.fromEntries(
  [...allowedLanguages].map((language) => [language, rows.filter((song) => song.language === language).length]),
);
console.log(`Audited ${rows.length} songs: ${JSON.stringify(counts)}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Song audit passed.");