import { describe, expect, it } from "vitest";
import { normalizeMath } from "@/components/TheorySections";

describe("Programming theory math normalization", () => {
  it("turns Markdown-wrapped LaTeX into inline math", () => {
    expect(normalizeMath("Uses **\\hat{P}, \\hat{R}** for planning."))
      .toBe("Uses $\\hat{P}, \\hat{R}$ for planning.");
  });

  it("removes Markdown emphasis accidentally placed inside math", () => {
    expect(normalizeMath("Value: $**\\theta_t** = \\hat{x}$"))
      .toBe("Value: $\\theta_t = \\hat{x}$");
  });

  it("normalizes common inline and display delimiters", () => {
    expect(normalizeMath("\\(x_t = r_t\\) and \\[\\sum_i x_i\\]"))
      .toBe("$x_t = r_t$ and $$\\sum_i x_i$$");
  });

  it("keeps consecutive formulas separate", () => {
    expect(normalizeMath("$$x=1$$$$y=2$$"))
      .toBe("$$x=1$$$$y=2$$");
  });

  it("does not reinterpret currency tiers as math", () => {
    expect(normalizeMath("Cost: $$$$) and GPU hours ($$$)."))
      .toBe("Cost: \\$\\$\\$\\$) and GPU hours (\\$\\$\\$).");
  });

  it("protects inline code, fenced code, tables, links, and Mermaid", () => {
    const input = [
      "`\\hat{x}`",
      "```python\nvalue = \\\\hat{x}\n```",
      "| Formula | `\\frac{a}{b}` |",
      "[\\hat docs](https://example.com/\\hat)",
      "```mermaid\nA[\\hat{x}] --> B\n```",
    ].join("\n");
    expect(normalizeMath(input)).toBe(input);
  });

  it("keeps probability bars and nested fractions renderable", () => {
    expect(normalizeMath("$P(y|x) = \\frac{P(x|y)P(y)}{P(x)}$"))
      .toBe("$P(y\\mid x) = \\frac{P(x\\mid y)P(y)}{P(x)}$");
  });
});