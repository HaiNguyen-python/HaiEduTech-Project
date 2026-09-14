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
});
