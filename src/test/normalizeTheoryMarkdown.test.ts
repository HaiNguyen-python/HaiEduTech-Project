import { describe, expect, it } from "vitest";
import { normalizeTheoryMarkdownStructure } from "@/lib/normalizeTheoryMarkdown";

describe("normalizeTheoryMarkdownStructure", () => {
  it("turns bullet group labels into headings and preserves their items", () => {
    const input = "- **Startups**\n - Goal: Discover a scalable model.\n - Culture: High autonomy.\n\nClosing paragraph.";
    expect(normalizeTheoryMarkdownStructure(input)).toBe(
      "### Startups\n\n- Goal: Discover a scalable model.\n- Culture: High autonomy.\n\nClosing paragraph.",
    );
  });

  it("does not change valid lists, inline code, or fenced code", () => {
    const input = "- **Scalability** - Revenue grows faster than cost.\n\n```md\n- **Group**\n - child\n```";
    expect(normalizeTheoryMarkdownStructure(input)).toBe(input);
  });

  it("repairs shallow Python indentation by nesting level", () => {
    const input = "```python\ndef train():\n for epoch in range(2):\n  if epoch:\n   print(epoch)\n```";
    expect(normalizeTheoryMarkdownStructure(input)).toBe(
      "```python\ndef train():\n    for epoch in range(2):\n        if epoch:\n            print(epoch)\n```",
    );
  });

  it("uses two spaces for TypeScript and converts tabs", () => {
    const input = "```typescript\nif (ready) {\n\tstart();\n}\n```";
    expect(normalizeTheoryMarkdownStructure(input)).toBe(
      "```typescript\nif (ready) {\n  start();\n}\n```",
    );
  });

  it("preserves Python multiline string contents", () => {
    const input = "```python\nquery = \"\"\"\n SELECT *\n FROM users\n\"\"\"\n```";
    expect(normalizeTheoryMarkdownStructure(input)).toBe(input);
  });
});
