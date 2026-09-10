/**
 * ChatMessageList - memoized transcript renderer for the AI Study Pet chatbot.
 *
 * Each bubble is memoized on its own content, so markdown is only rebuilt for
 * the message that actually changed. During streaming this keeps the earlier
 * history static instead of re-parsing the whole conversation per token.
 */
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Chat-tuned markdown components: lock typography to a uniform ~14px rhythm
// so headings, code, and lists never blow up inside the narrow chat bubble.
export const chatMarkdownComponents = {
  p: ({ node, ...props }: any) => <p className="text-sm leading-relaxed break-words" {...props} />,
  h1: ({ node, ...props }: any) => <h1 className="text-base font-bold mt-2 mb-1" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-sm font-bold mt-2 mb-1" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-sm font-semibold mt-1.5 mb-1" {...props} />,
  h4: ({ node, ...props }: any) => <h4 className="text-sm font-semibold mt-1.5 mb-1" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="text-sm pl-4 space-y-1 list-disc" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="text-sm pl-4 space-y-1 list-decimal" {...props} />,
  li: ({ node, ...props }: any) => <li className="text-sm leading-relaxed" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-semibold text-foreground" {...props} />,
  em: ({ node, ...props }: any) => <em className="italic" {...props} />,
  code: ({ node, inline, className, children, ...props }: any) =>
    inline ? (
      <code
        className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-background/60 border border-border/40"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code className={`text-[12.5px] font-mono ${className || ""}`} {...props}>
        {children}
      </code>
    ),
  pre: ({ node, ...props }: any) => (
    <pre
      className="text-[12.5px] font-mono p-3 rounded-lg bg-zinc-900 text-zinc-100 overflow-x-auto my-2 whitespace-pre"
      {...props}
    />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="text-sm italic border-l-2 border-primary/40 pl-3 my-2 text-muted-foreground"
      {...props}
    />
  ),
  a: ({ node, ...props }: any) => (
    <a
      className="text-primary underline underline-offset-2 hover:brightness-110"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-2">
      <table className="text-xs border-collapse" {...props} />
    </div>
  ),
  th: ({ node, ...props }: any) => (
    <th className="border border-border px-2 py-1 text-left font-semibold" {...props} />
  ),
  td: ({ node, ...props }: any) => <td className="border border-border px-2 py-1" {...props} />,
  hr: ({ node, ...props }: any) => <hr className="my-2 border-border" {...props} />,
};

export type ChatMessage = { role: "user" | "assistant"; content: string };

const CTA_RE = /\[\[CTA:COURSE_REGISTRATION(?::([a-z]+))?\]\]/i;

const SUBJECT_LABEL: Record<string, { vi: string; en: string }> = {
  chinese: { vi: "Tiếng Trung", en: "Chinese" },
  english: { vi: "Tiếng Anh", en: "English" },
  vietnamese: { vi: "Tiếng Việt", en: "Vietnamese" },
  finnish: { vi: "Tiếng Phần Lan", en: "Finnish" },
  programming: { vi: "Lập trình", en: "Programming" },
};

type BubbleProps = {
  role: "user" | "assistant";
  content: string;
  t: (vi: string, en: string) => string;
  onPlacementClick: (href: string) => void;
  messageId?: string;
  speaking?: boolean;
  onSpeak?: (content: string, id: string) => void;
  onStopSpeak?: () => void;
};

const ChatBubble = memo(function ChatBubble({
  role,
  content,
  t,
  onPlacementClick,
  messageId,
  speaking,
  onSpeak,
  onStopSpeak,
}: BubbleProps) {
  const ctaMatch = role === "assistant" ? content.match(CTA_RE) : null;
  const ctaSubject = ctaMatch?.[1]?.toLowerCase();
  const placementHref = ctaSubject
    ? `/placement-test?subject=${encodeURIComponent(ctaSubject)}`
    : "/placement-test";
  const ctaLabel =
    ctaSubject && SUBJECT_LABEL[ctaSubject]
      ? t(
          `🎯 Làm Test Đầu Vào ${SUBJECT_LABEL[ctaSubject].vi}`,
          `🎯 Take ${SUBJECT_LABEL[ctaSubject].en} Placement Test`,
        )
      : t("🎯 Làm Test Đầu Vào Ngay", "🎯 Take the Placement Test");
  const displayContent = ctaMatch ? content.replace(CTA_RE, "").trim() : content;

  return (
    <div className={`flex flex-col ${role === "user" ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
          role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}
      >
        {role === "assistant" ? (
          <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 space-y-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={chatMarkdownComponents}>
              {displayContent}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </div>

      {ctaMatch && (
        <div className="mt-3 grid w-full max-w-[92%] grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPlacementClick(placementHref)}
            className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 px-3 py-2.5 text-xs font-semibold leading-tight text-white shadow-sm ring-1 ring-emerald-600/20 transition-all hover:shadow-md hover:brightness-110 active:scale-[0.97]"
            title={ctaLabel}
          >
            <span className="text-base leading-none">🎯</span>
            <span className="line-clamp-2 text-left">{ctaLabel.replace(/^🎯\s*/, "")}</span>
          </button>
          <a
            href="https://zalo.me/0962823800"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-white px-3 py-2.5 text-xs font-semibold leading-tight text-emerald-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md active:scale-[0.97] dark:bg-background dark:text-emerald-400"
          >
            <span className="text-base leading-none">💬</span>
            <span className="line-clamp-2 text-left">{t("Chat Zalo với Thầy Hải", "Chat Zalo with Mr. Hai")}</span>
          </a>
        </div>
      )}
    </div>
  );
});

type Props = {
  messages: ChatMessage[];
  t: (vi: string, en: string) => string;
  onPlacementClick: (href: string) => void;
};

const ChatMessageList = memo(function ChatMessageList({ messages, t, onPlacementClick }: Props) {
  return (
    <>
      {messages.map((msg, i) => (
        <ChatBubble
          key={i}
          role={msg.role}
          content={msg.content}
          t={t}
          onPlacementClick={onPlacementClick}
        />
      ))}
    </>
  );
});

export default ChatMessageList;
