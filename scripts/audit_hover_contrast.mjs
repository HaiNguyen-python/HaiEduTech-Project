/**
 * @file audit_hover_contrast.mjs
 * @description Flags hover styles that can make text vanish: a light or
 * theme-surface background combined with white / very light hover text, or a
 * dark custom surface that inherits a light hover background without setting
 * its own hover background.
 * Usage: bun scripts/audit_hover_contrast.mjs
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src";
const LIGHT_BG = /\bbg-(white|background|card|popover|muted|(?:slate|gray|zinc|neutral|stone|rose|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink)-(?:50|100|200))\b/;
const LIGHT_HOVER_TEXT = /\bhover:text-(white|primary-foreground|accent-foreground|(?:slate|gray|zinc|neutral|stone)-(?:50|100|200))\b/;
const DARK_TEXT_TOKEN = /\btext-(white|slate-(?:50|100|200|300))\b/;
const DARK_BG = /\bbg-(black|(?:slate|gray|zinc|neutral|stone)-(?:700|800|900|950)|white\/\d+)\b/;
const HAS_HOVER_BG = /\bhover:(bg-|from-)/;
/** A hover background dark enough to carry white text. */
const STRONG_HOVER_BG = /\bhover:(bg-(primary|destructive|foreground|black|\[#|(?:slate|gray|zinc|neutral|stone|rose|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink)-(?:500|600|700|800|900))|from-)/;
const OUTLINE_OR_GHOST = /<Button[^>]*variant=\{?"(outline|ghost)"/;

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.tsx$/.test(entry)) files.push(full);
  }
};
walk(ROOT);

const findings = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const at = `${file}:${i + 1}`;
    if (
      LIGHT_HOVER_TEXT.test(line) &&
      LIGHT_BG.test(line) &&
      !DARK_BG.test(line) &&
      !STRONG_HOVER_BG.test(line)
    ) {
      findings.push(`${at}  light background + light hover text`);
    }
    if (OUTLINE_OR_GHOST.test(line) && DARK_TEXT_TOKEN.test(line) && !HAS_HOVER_BG.test(line) && !DARK_BG.test(line)) {
      findings.push(`${at}  light-text button on a shared hover surface without its own hover background`);
    }
  });
}

if (findings.length) {
  console.error(`Hover contrast audit: ${findings.length} issue(s)`);
  findings.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
console.log(`Hover contrast audit: 0 issues across ${files.length} files.`);
