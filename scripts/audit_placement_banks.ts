/**
 * @file audit_placement_banks.ts
 * @description Structural audit of every placement bank: unique ids, band and
 *   skill coverage, valid answer indexes, scramble items that rebuild their
 *   answer, and no duplicate options.
 *
 * Run: bunx tsx scripts/audit_placement_banks.ts
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { getPlacementBank, type PlacementSubject } from "../src/data/placementBanks";
import type { PlacementQuestion } from "../src/data/placementTest";

const SUBJECTS: PlacementSubject[] = [
  "english", "chinese", "vietnamese", "finnish", "japanese", "swedish", "programming",
];

const issues: string[] = [];
const add = (s: string) => issues.push(s);

const norm = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ");

for (const subject of SUBJECTS) {
  const bank = getPlacementBank(subject);
  const ids = new Set<number>();
  const bands = new Map<string, number>();
  const skills = new Map<string, number>();

  bank.forEach((q: PlacementQuestion) => {
    if (ids.has(q.id)) add(`${subject}: duplicate id ${q.id}`);
    ids.add(q.id);
    bands.set(q.cefr, (bands.get(q.cefr) ?? 0) + 1);
    skills.set(q.skill, (skills.get(q.skill) ?? 0) + 1);

    if ("options" in q && Array.isArray(q.options)) {
      const labels = q.options.map((o) =>
        typeof o === "string" ? norm(o) : norm(String(o.label)));
      if (new Set(labels).size !== labels.length) {
        add(`${subject} q${q.id}: duplicate answer options`);
      }
      if (labels.some((l) => l.length === 0)) {
        add(`${subject} q${q.id}: empty option label`);
      }
      if (typeof (q as { correct?: unknown }).correct === "number") {
        const c = (q as { correct: number }).correct;
        if (c < 0 || c >= q.options.length) add(`${subject} q${q.id}: correct index out of range`);
      }
    }

    if (q.type === "read-cloze") {
      if (q.choices.length !== q.correct.length) {
        add(`${subject} q${q.id}: cloze choices/correct length mismatch`);
      }
      q.correct.forEach((c, i) => {
        if (c < 0 || c >= (q.choices[i]?.length ?? 0)) {
          add(`${subject} q${q.id}: cloze blank ${i} correct index out of range`);
        }
      });
      const blanks = (q.paragraph.match(/\[\[\d+\]\]/g) ?? []).length;
      if (blanks !== q.choices.length) {
        add(`${subject} q${q.id}: paragraph has ${blanks} blanks but ${q.choices.length} choice sets`);
      }
    }

    if (q.type === "write-scramble") {
      const joined = q.tokens.join("");
      if (joined.replace(/\s+/g, "") !== q.answer.replace(/\s+/g, "")) {
        const spaced = q.tokens.join(" ");
        if (norm(spaced) !== norm(q.answer)) {
          add(`${subject} q${q.id}: scrambled tokens do not rebuild the answer`);
        }
      }
      if (new Set(q.tokens).size !== q.tokens.length) {
        // Repeated tokens are legal, but flag when a token appears three times.
        const counts = new Map<string, number>();
        q.tokens.forEach((tk) => counts.set(tk, (counts.get(tk) ?? 0) + 1));
        for (const [tk, n] of counts) {
          if (n > 2) add(`${subject} q${q.id}: token "${tk}" repeated ${n} times`);
        }
      }
    }

    if (q.type === "write-essay" && q.maxWords && q.minWords >= q.maxWords) {
      add(`${subject} q${q.id}: minWords >= maxWords`);
    }

    if (!q.prompt || q.prompt.trim().length < 3) add(`${subject} q${q.id}: prompt too short`);
    if (/—/.test(JSON.stringify(q))) add(`${subject} q${q.id}: em-dash found`);
  });

  // Coverage rules: language banks need all four skills and >= 4 items per band.
  if (subject !== "programming") {
    for (const s of ["listening", "reading", "writing", "speaking"]) {
      if ((skills.get(s) ?? 0) < 3) add(`${subject}: only ${skills.get(s) ?? 0} ${s} items`);
    }
    for (const [band, n] of bands) {
      if (n < 4) add(`${subject}: band ${band} has only ${n} items`);
    }
    if (!bands.has("C1")) add(`${subject}: no C1 block`);
  } else {
    const domains = new Map<string, number>();
    bank.forEach((q) => domains.set(q.domain ?? "logic", (domains.get(q.domain ?? "logic") ?? 0) + 1));
    for (const d of ["logic", "python", "sql", "ai"]) {
      if ((domains.get(d) ?? 0) < 4) add(`programming: domain ${d} has only ${domains.get(d) ?? 0} items`);
    }
  }

  console.log(
    `${subject.padEnd(12)} ${String(bank.length).padStart(3)} items · bands ${
      [...bands.entries()].map(([b, n]) => `${b}:${n}`).join(" ")
    }${subject === "programming" ? "" : ` · skills ${[...skills.entries()].map(([s, n]) => `${s[0].toUpperCase()}${n}`).join(" ")}`}`,
  );
}

console.log(`\n${issues.length} issue(s)`);
issues.forEach((i) => console.log(" - " + i));
if (issues.length > 0) process.exit(1);
