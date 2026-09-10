/**
 * One-off maintenance script: translate Vietnamese text found inside code
 * snippets (fields `code:`, `codeExample:`, `starterCode:`, `template:`) into
 * English so every Programming code block - including Code Typing Race drills -
 * is English-only. Code structure is preserved byte-for-byte apart from prose.
 */
import { readFileSync, writeFileSync } from "fs";

const VI = /[ăâđêôơưĂÂĐÊÔƠƯáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/;
const KEY = process.env.LOVABLE_API_KEY!;

interface Block { start: number; end: number; body: string }

function findBlocks(src: string): Block[] {
  const re = /\b(code|codeExample|starterCode|template)\s*:\s*`/g;
  const out: Block[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const start = re.lastIndex;
    let i = start, depth = 0;
    while (i < src.length) {
      const ch = src[i];
      if (ch === "\\") { i += 2; continue; }
      if (ch === "`" && depth === 0) break;
      if (ch === "$" && src[i + 1] === "{") depth++;
      if (ch === "}" && depth > 0) depth--;
      i++;
    }
    out.push({ start, end: i, body: src.slice(start, i) });
    re.lastIndex = i;
  }
  return out;
}

async function translate(body: string): Promise<string | null> {
  const prompt = `Translate every Vietnamese word in this source-code snippet into concise technical English. Rules:
- Output ONLY the snippet, no markdown fences, no commentary.
- Keep EXACTLY the same number of lines, same indentation, same code, same identifiers, same string quoting.
- Translate comments, docstrings and human-readable strings only. Never translate keywords, identifiers, API names.
- Never output a backtick character; use a single quote instead.
- Never output the characters \${ (dollar + brace).
- Do not use an em dash; use a hyphen.

SNIPPET:
${body}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      }),
    });
    if (!r.ok) { await new Promise((s) => setTimeout(s, 2000 * (attempt + 1))); continue; }
    const j = await r.json();
    let text: string = j?.choices?.[0]?.message?.content ?? "";
    text = text.replace(/^\s*```[a-zA-Z]*\n/, "").replace(/\n```\s*$/, "");
    if (!text.trim()) continue;
    if (text.includes("`")) continue;
    if (VI.test(text)) continue;
    if (body.includes("${") !== text.includes("${")) continue;
    return text;
  }
  return null;
}

const files = process.argv.slice(2);
for (const f of files) {
  let src = readFileSync(f, "utf8");
  const blocks = findBlocks(src).filter((b) => VI.test(b.body));
  if (!blocks.length) { console.log("clean", f); continue; }
  let ok = 0, fail = 0;
  // Replace from the end so earlier offsets stay valid.
  for (const b of blocks.reverse()) {
    const t = await translate(b.body);
    if (!t) { fail++; console.log("  FAILED block at", f, b.start); continue; }
    src = src.slice(0, b.start) + t + src.slice(b.end);
    ok++;
  }
  writeFileSync(f, src);
  console.log(`${f}: translated ${ok}, failed ${fail}`);
}
