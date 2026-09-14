const FOUR_SPACE_LANGUAGES = new Set(["python", "py"]);
const TWO_SPACE_LANGUAGES = new Set([
  "javascript", "js", "typescript", "ts", "tsx", "jsx", "json", "css", "scss",
  "html", "xml", "yaml", "yml", "bash", "sh", "shell", "java", "hcl", "terraform",
  "mermaid",
]);

const leadingWidth = (line: string): number => line.match(/^ */)?.[0].length ?? 0;

const dedent = (code: string): string => {
  const lines = code.replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && !lines[0]?.trim()) lines.shift();
  while (lines.length > 0 && !lines[lines.length - 1]?.trim()) lines.pop();
  const nonBlank = lines.filter((line) => line.trim());
  const commonIndent = nonBlank.length > 0
    ? Math.min(...nonBlank.map(leadingWidth))
    : 0;
  return lines.map((line) => line.slice(Math.min(commonIndent, leadingWidth(line))).trimEnd()).join("\n");
};

const hasSensitiveMultilineLiteral = (code: string, language: string): boolean => {
  if (FOUR_SPACE_LANGUAGES.has(language)) {
    const tripleQuotes = code.match(/'''|"""/g)?.length ?? 0;
    return tripleQuotes > 0;
  }
  return /(?:^|[^\\])`/.test(code) && ["javascript", "js", "typescript", "ts", "tsx", "jsx"].includes(language);
};

/**
 * Repairs shallow AI-generated indentation without reformatting valid code.
 * It only scales a block when its smallest structural indent is below the
 * language convention, so aligned continuation lines remain untouched.
 */
export const normalizeCodeIndentation = (input: string, language = "text"): string => {
  const normalizedLanguage = language.trim().toLowerCase();
  const code = dedent(input.replace(/\t/g, FOUR_SPACE_LANGUAGES.has(normalizedLanguage) ? "    " : "  "));
  const target = FOUR_SPACE_LANGUAGES.has(normalizedLanguage)
    ? 4
    : TWO_SPACE_LANGUAGES.has(normalizedLanguage)
      ? 2
      : 0;

  if (!target || hasSensitiveMultilineLiteral(code, normalizedLanguage)) return code;

  const widths = code
    .split("\n")
    .filter((line) => line.trim() && leadingWidth(line) > 0)
    .map(leadingWidth);
  if (widths.length === 0) return code;

  const shallowest = Math.min(...widths);
  if (shallowest >= target) return code;

  return code
    .split("\n")
    .map((line) => {
      const width = leadingWidth(line);
      if (!line.trim() || width === 0) return line;
      return `${" ".repeat(Math.round(width * target / shallowest))}${line.slice(width)}`;
    })
    .join("\n");
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