/** Remove digit separators from numeric tokens, never identifiers or strings. */
export function normalizeTypingNumbers(code: string): string {
  return code.replace(
    /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(0[xX][\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?)\b/g,
    (token: string, quoted: string | undefined) => quoted ? token : token.replace(/_/g, ""),
  );
}