/**
 * DsaTheoryText
 * Splits a long DSA theory paragraph into easy-to-scan sections.
 * - Inserts headings before key phrases (Vi + En)
 * - Converts inline "(1) ... (2) ... (3) ..." enumerations into bullet lists
 * - Adds spacing between sentences for better readability
 */
import React from "react";
import { Lightbulb, AlertTriangle, Zap, Info, Sparkles, BookOpen } from "lucide-react";

interface Props {
  text: string;
  lang: "vi" | "en";
}

// Section markers: phrase -> {label, icon, color}
const MARKERS_VI: { re: RegExp; label: string; icon: React.ComponentType<any>; color: string }[] = [
  { re: /Bẫy thường gặp\s*:?/i, label: "Bẫy thường gặp", icon: AlertTriangle, color: "text-amber-500" },
  { re: /Nhược điểm\s*:?/i, label: "Nhược điểm", icon: AlertTriangle, color: "text-rose-500" },
  { re: /Ưu điểm\s*:?/i, label: "Ưu điểm", icon: Sparkles, color: "text-emerald-500" },
  { re: /Mẹo\s*:?/i, label: "Mẹo", icon: Lightbulb, color: "text-yellow-500" },
  { re: /Lưu ý\s*:?/i, label: "Lưu ý", icon: Info, color: "text-sky-500" },
  { re: /Ứng dụng\s*:?/i, label: "Ứng dụng thực tế", icon: Zap, color: "text-violet-500" },
  { re: /Ví dụ\s*:?/i, label: "Ví dụ", icon: BookOpen, color: "text-blue-500" },
];

const MARKERS_EN: { re: RegExp; label: string; icon: React.ComponentType<any>; color: string }[] = [
  { re: /Common pitfalls\s*:?/i, label: "Common pitfalls", icon: AlertTriangle, color: "text-amber-500" },
  { re: /Pitfalls\s*:?/i, label: "Pitfalls", icon: AlertTriangle, color: "text-amber-500" },
  { re: /Downside\s*:?/i, label: "Downside", icon: AlertTriangle, color: "text-rose-500" },
  { re: /Upside\s*:?/i, label: "Upside", icon: Sparkles, color: "text-emerald-500" },
  { re: /Tips?\s*:?/i, label: "Tip", icon: Lightbulb, color: "text-yellow-500" },
  { re: /Notes?\s*:?/i, label: "Note", icon: Info, color: "text-sky-500" },
  { re: /Applications?\s*:?/i, label: "Real-world uses", icon: Zap, color: "text-violet-500" },
  { re: /Examples?\s*:?/i, label: "Example", icon: BookOpen, color: "text-blue-500" },
];

interface Block {
  label?: string;
  icon?: React.ComponentType<any>;
  color?: string;
  body: string;
}

const splitInlineList = (text: string): string[] | null => {
  // Detect "(1) ... (2) ... (3) ..."
  const matches = text.match(/\(\d+\)/g);
  if (!matches || matches.length < 2) return null;
  const parts = text.split(/\s*\(\d+\)\s*/).map((s) => s.trim()).filter(Boolean);
  return parts.length >= 2 ? parts : null;
};

const splitIntoBlocks = (text: string, lang: "vi" | "en"): Block[] => {
  const markers = lang === "vi" ? MARKERS_VI : MARKERS_EN;
  // Build a combined regex with capture so we can split while keeping markers
  const combined = new RegExp(
    "(" + markers.map((m) => m.re.source).join("|") + ")",
    "gi"
  );
  const pieces = text.split(combined).filter((p) => p && p.trim());
  const blocks: Block[] = [];
  let i = 0;
  // First piece (before any marker) is the intro
  if (pieces.length && !markers.some((m) => m.re.test(pieces[0]))) {
    blocks.push({ body: pieces[0].trim() });
    i = 1;
  }
  while (i < pieces.length) {
    const head = pieces[i];
    const matched = markers.find((m) => m.re.test(head));
    if (matched) {
      const body = (pieces[i + 1] || "").trim();
      blocks.push({ label: matched.label, icon: matched.icon, color: matched.color, body });
      i += 2;
    } else {
      blocks.push({ body: head.trim() });
      i += 1;
    }
  }
  return blocks;
};

// Add line break after sentence-ending punctuation followed by capital — but
// keep it lightweight: split on " — " (em-dash) groups and on ". " every ~2 sentences
const renderBody = (body: string) => {
  const list = splitInlineList(body);
  if (list) {
    return (
      <ul className="list-disc pl-5 space-y-1.5">
        {list.map((item, i) => (
          <li key={i} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    );
  }
  // Break into sentences and group every 2 for readable paragraphs
  const sentences = body.split(/(?<=[.!?])\s+(?=[A-ZÀ-ỹ])/);
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
