const leadingWidth = (line: string): number => line.match(/^ */)?.[0].length ?? 0;

const dedent = (code: string): string => {
  const lines = code.replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && !lines[0]?.trim()) lines.shift();
  while (lines.length > 0 && !lines[lines.length - 1]?.trim()) lines.pop();
  const nonBlank = lines.filter((line) => line.trim());
  const commonIndent = nonBlank.length > 0
    ? Math.min(...nonBlank.map(leadingWidth))
    : 0;
  return lines.map((line) => line.slice(Math.min(commonIndent, leadingWidth(line)))).join("\n");
};

const hasSensitiveMultilineLiteral = (code: string, language: string): boolean => {
  if (["python", "py", "python3"].includes(language)) {
    const tripleQuotes = code.match(/'''|"""/g)?.length ?? 0;
    return tripleQuotes > 0;
  }
  if (["javascript", "js", "typescript", "ts", "tsx", "jsx"].includes(language)) return code.includes("`");
  // Here-docs, YAML blocks, SQL strings and diagrams also rely on literal whitespace.
  return !["python", "py", "python3", "javascript", "js", "typescript", "ts", "tsx", "jsx", "json", "css", "scss", "java"].includes(language);
};

/**
 * Remove only a safe, shared presentation margin. Never infer nesting from
 * indent widths: continuation alignment is not a structural indent, and
 * two-space Python is valid. Fix malformed source code at its source.
 */
export const normalizeCodeIndentation = (input: string, language = "text"): string => {
  const normalizedLanguage = language.trim().toLowerCase();
  const code = input.replace(/\r\n?/g, "\n");
  if (hasSensitiveMultilineLiteral(code, normalizedLanguage) || code.includes("\t")) return code;
  return dedent(code);
};

export const normalizeFencedCodeIndentation = (markdown: string): string =>
  markdown.replace(/```([^\n`]*)\n([\s\S]*?)```/g, (_whole, info: string, code: string) => {
    const language = info.trim().split(/\s+/)[0] || "text";
    return `\`\`\`${info.trim()}\n${normalizeCodeIndentation(code, language)}\n\`\`\``;
  });

export const inspectFencedCodeIndentation = (markdown: string): string[] => {
  const issues: string[] = [];
  let blockNumber = 0;
  markdown.replace(/```([^\n`]*)\n([\s\S]*?)```/g, (_whole, info: string, code: string) => {
    blockNumber += 1;
    const language = info.trim().split(/\s+/)[0]?.toLowerCase() || "text";
    if (/\t/.test(code)) issues.push(`code block ${blockNumber} (${language}): contains tabs`);
    const normalized = normalizeCodeIndentation(code, language);
    if (normalized !== dedent(code)) issues.push(`code block ${blockNumber} (${language}): shallow or mixed indentation`);
    return "";
  });
  const fences = markdown.match(/^\s*```/gm)?.length ?? 0;
  if (fences % 2 !== 0) issues.push("unbalanced code fence");
  return issues;
};