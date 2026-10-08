import { describe, expect, it } from "vitest";
import { normalizeCodeIndentation, normalizeFencedCodeIndentation } from "@/lib/normalizeCodeIndentation";

describe("code presentation whitespace", () => {
  it("preserves valid shallow Python and continuation alignment", () => {
    const source = "values = (\n  1,\n  2\n)\nif values:\n    for value in values:\n        print(value)";
    expect(normalizeCodeIndentation(source, "python")).toBe(source);
  });
  it("removes a common presentation margin without changing nesting", () => {
    expect(normalizeCodeIndentation("\n    if True:\n        print(1)\n", "python")).toBe("if True:\n    print(1)");
  });
  it("keeps multiline literals, tabs, trailing spaces and diagrams intact", () => {
    for (const [source, lang] of [
      ['    text = """\n  literal content  \n    """', "python"],
      ["const text = `\n  content  \n`;", "javascript"],
      ["if True:\n\tprint('literal\\t')", "python"],
      ["  +---+\n  | A |\n  +---+", "text"],
      ["message: |\n  content  ", "yaml"],
    ]) expect(normalizeCodeIndentation(source, lang)).toBe(source);
    expect(normalizeCodeIndentation("value = 'a'  ", "python")).toBe("value = 'a'  ");
  });
  it("preserves code semantics inside markdown fences", () => {
    const md = "Text\n```python\nif True:\n  print(1)\n```";
    expect(normalizeFencedCodeIndentation(md)).toBe(md);
  });
});