/**
 * DsaTheoryText
 * Splits a long DSA theory paragraph into easy-to-scan sections.
 *
 * Strict marker matching: a section heading must be one of the known phrases,
 * START a sentence (beginning of string, or right after newline / ". " / "! ")
 * AND be followed by ":" — this prevents false positives like the literal
 * phrase "ví dụ" appearing inside another sentence (e.g. "thử bằng ví dụ phản ví dụ").
 */
import React from "react";
import { Lightbulb, AlertTriangle, Zap, Info, Sparkles, BookOpen } from "lucide-react";

interface Props {
  text: string;
  lang: "vi" | "en";
}

interface MarkerDef {
  // Strict phrase (must appear capitalised, at sentence boundary, with colon)
  phrase: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const MARKERS_VI: MarkerDef[] = [
  { phrase: "Bẫy thường gặp", label: "Bẫy thường gặp", icon: AlertTriangle, color: "text-amber-500" },
  { phrase: "Bẫy", label: "Bẫy", icon: AlertTriangle, color: "text-amber-500" },
  { phrase: "Nhược điểm", label: "Nhược điểm", icon: AlertTriangle, color: "text-rose-500" },
  { phrase: "Ưu điểm", label: "Ưu điểm", icon: Sparkles, color: "text-emerald-500" },
  { phrase: "Mẹo", label: "Mẹo", icon: Lightbulb, color: "text-yellow-500" },
  { phrase: "Lưu ý", label: "Lưu ý", icon: Info, color: "text-sky-500" },
  { phrase: "Ứng dụng", label: "Ứng dụng thực tế", icon: Zap, color: "text-violet-500" },
  { phrase: "Quy trình", label: "Quy trình", icon: Info, color: "text-sky-500" },
  { phrase: "Bài kinh điển", label: "Bài kinh điển", icon: BookOpen, color: "text-blue-500" },
  { phrase: "Ví dụ", label: "Ví dụ", icon: BookOpen, color: "text-blue-500" },
];

const MARKERS_EN: MarkerDef[] = [
  { phrase: "Common pitfalls", label: "Common pitfalls", icon: AlertTriangle, color: "text-amber-500" },
  { phrase: "Pitfalls", label: "Pitfalls", icon: AlertTriangle, color: "text-amber-500" },
  { phrase: "Downside", label: "Downside", icon: AlertTriangle, color: "text-rose-500" },
  { phrase: "Upside", label: "Upside", icon: Sparkles, color: "text-emerald-500" },
  { phrase: "Tip", label: "Tip", icon: Lightbulb, color: "text-yellow-500" },
  { phrase: "Tips", label: "Tips", icon: Lightbulb, color: "text-yellow-500" },
  { phrase: "Note", label: "Note", icon: Info, color: "text-sky-500" },
  { phrase: "Notes", label: "Notes", icon: Info, color: "text-sky-500" },
  { phrase: "Applications", label: "Real-world uses", icon: Zap, color: "text-violet-500" },
  { phrase: "Application", label: "Real-world use", icon: Zap, color: "text-violet-500" },
  { phrase: "Classic problems", label: "Classic problems", icon: BookOpen, color: "text-blue-500" },
  { phrase: "Example", label: "Example", icon: BookOpen, color: "text-blue-500" },
  { phrase: "Examples", label: "Examples", icon: BookOpen, color: "text-blue-500" },
];

interface Block {
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  body: string;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const splitIntoBlocks = (raw: string, lang: "vi" | "en"): Block[] => {
  // Normalize literal "\n" sequences and collapse whitespace around newlines
  const text = raw.replace(/\\n/g, "\n").trim();
  const markers = lang === "vi" ? MARKERS_VI : MARKERS_EN;

  // Build a strict regex: marker must be preceded by start / newline / sentence end,
  // and followed by ":" — this prevents matching inline lowercase / mid-sentence uses.
  // We use a capture group so split() keeps the marker text.
  const phraseAlt = markers.map((m) => escapeRe(m.phrase)).join("|");
  const re = new RegExp(`(?:^|(?<=[.!?]\\s)|(?<=\\n))((?:${phraseAlt}))\\s*:`, "g");

  const blocks: Block[] = [];
  let lastIndex = 0;
  let lastMarker: MarkerDef | null = null;

  const pushBlock = (body: string, marker: MarkerDef | null) => {
    const trimmed = body.trim().replace(/^[:\s]+/, "").trim();
    if (!trimmed) return;
    if (marker) {
      blocks.push({ label: marker.label, icon: marker.icon, color: marker.color, body: trimmed });
    } else {
      blocks.push({ body: trimmed });
    }
  };

  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const matchedPhrase = match[1];
    const start = match.index;
    // Body for the PREVIOUS block ends just before this match
    const prevBody = text.slice(lastIndex, start);
    pushBlock(prevBody, lastMarker);
    // Find the marker definition
    lastMarker = markers.find((m) => m.phrase === matchedPhrase) ?? null;
    lastIndex = start + match[0].length;
  }
  // Final block
  pushBlock(text.slice(lastIndex), lastMarker);

  return blocks;
};

// Convert "(1) ... (2) ... (3) ..." into a bullet list — but only when there
// are AT LEAST 2 parenthesised numbers AND each follows a space (so we don't
// shred set-literals like "{1, 3, 4}" which have no parens anyway).
const splitInlineList = (text: string): string[] | null => {
  const matches = text.match(/(?:^|[\s—–-])\(\d+\)\s/g);
  if (!matches || matches.length < 2) return null;
  const parts = text
    .split(/(?:^|\s)\(\d+\)\s+/)
    .map((s) => s.trim().replace(/[;,.]\s*$/, ""))
    .filter(Boolean);
  return parts.length >= 2 ? parts : null;
};

const renderBody = (body: string): React.ReactNode => {
  // If body has explicit newlines, treat each non-empty line as a paragraph
  if (/\n/.test(body)) {
    const paras = body.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    return (
      <div className="space-y-2.5">
        {paras.map((p, i) => (
          <p key={i} className="leading-relaxed">{p}</p>
        ))}
      </div>
    );
  }

  const list = splitInlineList(body);
  if (list) {
    // Find the lead-in (text before the first "(1)")
    const leadMatch = body.match(/^(.*?)(?=(?:^|\s)\(1\)\s)/s);
    const lead = leadMatch ? leadMatch[1].trim().replace(/[:：]\s*$/, "") : "";
    return (
      <div className="space-y-2">
        {lead && <p className="leading-relaxed">{lead}:</p>}
        <ul className="list-disc pl-5 space-y-1.5">
          {list.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Group every 2 sentences for readable paragraphs
  const sentences = body.split(/(?<=[.!?])\s+(?=[A-ZÀ-ỹ0-9])/);
  if (sentences.length <= 1) {
    return <p className="leading-relaxed">{body}</p>;
  }
  const paras: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paras.push(sentences.slice(i, i + 2).join(" "));
  }
  return (
    <div className="space-y-2.5">
      {paras.map((p, i) => (
        <p key={i} className="leading-relaxed">{p}</p>
      ))}
    </div>
  );
};

export const DsaTheoryText: React.FC<Props> = ({ text, lang }) => {
  if (!text) return null;
  const blocks = splitIntoBlocks(text, lang);
  return (
    <div className="space-y-4 text-sm text-foreground">
      {blocks.map((b, i) => {
        if (!b.label) {
          return <div key={i}>{renderBody(b.body)}</div>;
        }
        const Icon = b.icon!;
        return (
          <div
            key={i}
            className="rounded-lg border border-border/60 bg-muted/30 p-3.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${b.color}`} />
              <span className="font-semibold text-foreground text-[13px] uppercase tracking-wide">
                {b.label}
              </span>
            </div>
            <div className="text-foreground/90">{renderBody(b.body)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DsaTheoryText;
