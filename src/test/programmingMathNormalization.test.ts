import { describe, expect, it } from "vitest";
import { emphasizeKeyTerms, normalizeMath } from "@/components/TheorySections";

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

  it("repairs inline display delimiters without changing standalone display math", () => {
    const input = [
      "- Coefficient ($$\\beta$$): Learned weight.",
      "Prediction: $$\\hat{y} = X\\beta$$ for this sample.",
      "",
      "$$\\sum_{i=1}^{n} x_i$$",
    ].join("\n");
    expect(normalizeMath(input)).toBe([
      "- Coefficient ($\\beta$): Learned weight.",
      "Prediction: $\\hat{y} = X\\beta$ for this sample.",
      "",
      "$$\\sum_{i=1}^{n} x_i$$",
    ].join("\n"));
  });

  it("repairs malformed nested dollars around definition labels", () => {
    expect(normalizeMath("- $Coefficients ($\\beta$)$: Learned weights indicating feature impact."))
      .toBe("- **Coefficients** ($\\beta$): Learned weights indicating feature impact.");
    expect(normalizeMath("- **Intercept ($$\\beta_0$$)**: Baseline prediction."))
      .toBe("- **Intercept** ($\\beta_0$): Baseline prediction.");
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

describe("Programming theory key-term emphasis", () => {
  it("bolds important cloud concepts in each Theory section", () => {
    const input = [
      "## Why and When",
      "Cloud computing shifts CAPEX to OPEX and enables auto-scaling for variable workloads.",
      "",
      "## Architecture",
      "Cloud computing supports high availability through a load balancer.",
    ].join("\n");

    expect(emphasizeKeyTerms(input)).toContain("**Cloud computing** shifts **CAPEX to OPEX**");
    expect(emphasizeKeyTerms(input)).toContain("**auto-scaling**");
    expect(emphasizeKeyTerms(input)).toContain("**variable workloads**");
    expect(emphasizeKeyTerms(input)).toContain("**high availability**");
    expect(emphasizeKeyTerms(input)).toContain("**load balancer**");
  });

  it("does not alter code, links, or existing bold text", () => {
    const input = "**CAPEX** and `OPEX` with [cloud computing](https://example.com).";
    expect(emphasizeKeyTerms(input)).toBe(input);
  });

  it("emphasizes repeated concepts and meaningful scale figures", () => {
    const input = "AWS runs cloud infrastructure. AWS can scale to 100,000+ instances across 33 regions.";
    expect(emphasizeKeyTerms(input)).toBe(
      "**AWS** runs cloud infrastructure. **AWS** can scale to **100,000+ instances** across **33 regions**.",
    );
  });
});