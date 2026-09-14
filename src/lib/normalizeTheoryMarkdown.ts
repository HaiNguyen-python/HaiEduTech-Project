/**
 * Repairs high-confidence Markdown structure issues in Programming theory.
 * Code fences and inline code are preserved byte-for-byte.
 */
export const normalizeTheoryMarkdownStructure = (markdown: string): string => {
  if (!markdown) return markdown;

  let inFence = false;
  const output: string[] = [];
  const lines = markdown.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      output.push(line);
      continue;
    }
    if (inFence) {
      output.push(line);
      continue;
    }

    const group = /^-\s+\*\*([^*\n]+)\*\*\s*:??\s*$/.exec(line);
    const nextLine = lines[index + 1] ?? "";
    if (group && /^ {1,3}-\s+\S/.test(nextLine)) {
      if (output.length > 0 && output[output.length - 1]?.trim()) output.push("");
      output.push(`### ${group[1].trim()}`);
      output.push("");

      while (index + 1 < lines.length && /^ {1,3}-\s+\S/.test(lines[index + 1] ?? "")) {
        index += 1;
        output.push((lines[index] ?? "").replace(/^ {1,3}(?=-\s)/, ""));
      }
      continue;
    }

    output.push(line);
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n");
};
