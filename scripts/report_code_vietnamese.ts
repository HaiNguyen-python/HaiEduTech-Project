/** Reports Vietnamese lines remaining inside code snippet fields. */
import { readFileSync } from "fs";
const VI = /[ăâđêôơưĂÂĐÊÔƠƯáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/;
for (const f of process.argv.slice(2)) {
  const src = readFileSync(f, "utf8");
  const re = /\b(code|codeExample|starterCode|template)\s*:\s*`/g; let m;
  while ((m = re.exec(src))) {
    const start = re.lastIndex; let i = start, depth = 0;
    while (i < src.length) { const ch = src[i];
      if (ch === "\\") { i += 2; continue; }
      if (ch === "`" && depth === 0) break;
      if (ch === "$" && src[i+1] === "{") depth++;
      if (ch === "}" && depth > 0) depth--;
      i++; }
    const body = src.slice(start, i);
    if (VI.test(body)) {
      const line = src.slice(0, start).split("\n").length;
      body.split("\n").forEach((l, k) => { if (VI.test(l)) console.log(`${f}:${line + k}: ${l}`); });
    }
    re.lastIndex = i;
  }
}
