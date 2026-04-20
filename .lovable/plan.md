

## Fix the remaining broken math formulas in lessons

The screenshot shows `((\lambda ||\beta||^2))` rendering as raw text. Two root causes:

1. **AI sometimes emits bare LaTeX without `$...$` delimiters** (despite our prompt rules), and our auto-wrapper in `normalizeMath` doesn't recognize:
   - Norm bars `||x||` (double-pipe is treated as two unrelated operators, breaking the run)
   - Expressions wrapped inside text parentheses like `(\lambda ||\beta||^2)`
   - Expressions where tokens are glued without spaces (e.g. `||\beta||^2`)
2. **Even if delimited**, KaTeX doesn't natively understand `||...||` — it requires `\|...\|` or `\lVert ... \rVert`.

### What I'll change

**1. `src/components/TheorySections.tsx` — `normalizeMath` upgrades**

- **Pre-pass**: Outside fenced code, replace `||...||` with `\|...\|` so KaTeX renders norms correctly (both inside and outside existing `$...$`).
- **Looser run detection in `wrapLatexRuns`**: 
  - Add `\|` and `||` (mapped to `\|`) as a recognized math token.
  - Allow tokens to be glued **without spaces** (currently requires single space between tokens), so `||\beta||^2` is captured as one run.
  - Recognize a leading `\` immediately followed by a Greek letter / command as a strong math signal.
- **Strip wrapping text-parens from math runs**: If a candidate run is itself surrounded by a single pair of `(...)` and clearly mathematical (contains `\cmd` or `_{`/`^{`), wrap as `($...$)` so the parens stay textual but the inside renders as math.
- **KaTeX macro additions**: register `\|` mapping for safety and add `\norm` → `\left\| #1 \right\|` so future AI emissions like `\norm{\beta}` also work.

**2. `supabase/functions/enhance-programming-theory/index.ts` — tighter prompt**

Add explicit, copy-pasteable examples of common pitfalls in the MATH RULES section:

```
- Norms: write $\|\beta\|^2$ (NOT ||\beta||^2, NOT ((\lambda ||\beta||^2)))
- L2 penalty example: $\lambda \|\beta\|^2$
- Sum example:        $\sum_{i=1}^{n} (y_i - \hat{y}_i)^2$
- ALWAYS wrap formulas in $...$ — never leave bare LaTeX inside text parentheses.
```

This nudges the AI to stop producing the `((...))` pattern in newly generated lessons.

**3. Lightweight repair pass for already-cached lessons**

Inside `normalizeMath`, add one extra regex that specifically catches the common AI mistake: `(\lambda \|...\|^k)` or any `(...)` containing `\cmd` and converts the inside to inline math. This means existing cached lessons will render correctly **without re-generation** — no need to clear the cache or re-run AI.

### Files touched

- **EDIT** `src/components/TheorySections.tsx` — extend `normalizeMath`, `wrapLatexRuns`, MATH_TOKEN, KATEX_OPTIONS macros.
- **EDIT** `supabase/functions/enhance-programming-theory/index.ts` — add 4 lines of math examples to the system prompt.

### Why no DB / image / cache changes are needed

The fix is pure rendering — old cached markdown will start displaying correctly the moment the frontend update ships. No need to regenerate any lessons or run migrations.

