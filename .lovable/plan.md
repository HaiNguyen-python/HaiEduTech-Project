

## Fix Inconsistent Text Sizing in AI Chatbot Responses

### The Problem
The chat bubble currently wraps assistant markdown in `<div class="prose prose-sm">`. Tailwind Typography's `prose` aggressively restyles every element — `# Heading` becomes ~28px, `## Heading` ~22px, `code` shrinks to ~12px, blockquotes get oversized margins. Inside a 400px chat window, this produces the "huge title, tiny code, jumpy spacing" look the user is seeing.

### The Fix
Replace the `prose` wrapper with a **custom, chat-tuned markdown renderer** that locks every element to a consistent ~14px base, keeps headings only slightly larger, and gives code blocks proper monospace styling without size jumps.

### What Changes (single file: `src/components/ChatBot.tsx`)

1. **Remove `prose prose-sm`** wrapper around `<ReactMarkdown>`.

2. **Add explicit component overrides** to `ReactMarkdown` so every element uses chat-appropriate, uniform sizing:

   | Element | New Style |
   |---|---|
   | `p` | `text-sm leading-relaxed` (14px, tight gap between paragraphs) |
   | `h1` | `text-base font-bold mt-2 mb-1` (16px) |
   | `h2` | `text-sm font-bold mt-2 mb-1` (14px) |
   | `h3` | `text-sm font-semibold mt-1.5 mb-1` (14px) |
   | `ul` / `ol` | `text-sm pl-4 space-y-1 list-disc/decimal` |
   | `li` | `text-sm leading-relaxed` |
   | `strong` | `font-semibold text-foreground` |
   | `em` | `italic` |
   | `code` (inline) | `text-[13px] font-mono px-1.5 py-0.5 rounded bg-background/60 border border-border/40` |
   | `pre` | `text-[12.5px] font-mono p-3 rounded-lg bg-zinc-900 text-zinc-100 overflow-x-auto my-2 whitespace-pre` |
   | `blockquote` | `text-sm italic border-l-2 border-primary/40 pl-3 my-2 text-muted-foreground` |
   | `a` | `text-primary underline underline-offset-2 hover:brightness-110` (with `target="_blank"`, `rel="noreferrer"`) |
   | `table` | `text-xs border-collapse my-2`, `th/td` get `border px-2 py-1` |
   | `hr` | `my-2 border-border` |

3. **Add `remark-gfm`** plugin so tables, strikethrough, and task lists render correctly (already a dependency in the project).

4. **Wrap renderer in a single styled container** `<div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 space-y-2">` to guarantee no stray top/bottom margins push the bubble layout around.

5. **Code-block long-line handling**: add `break-words` on `p` and `overflow-x-auto` on `pre` so long URLs or code don't overflow the 85% bubble width.

### Out of Scope (Not Touched)
- The edge function / system prompt — formatting issue is purely client-side.
- The user-message bubble (already uses plain `<p>`, looks fine).
- Profanity, voice, lockout, animation logic — all preserved.

### Expected Result
Every assistant reply — whether it contains a `# Title`, a `**bold**` term, a bullet list, or a Python ` ```code``` ` block — renders at a single, calm visual rhythm: 14px body, 16px max headings, properly contained code blocks, no oversized jumps.

### Files Edited
- `src/components/ChatBot.tsx` (only the assistant-message render block, ~15 lines → ~50 lines)

