/**
 * NLPSandbox — "Train your Chatbot" + extra hands-on NLP toys.
 *
 *  1. Intent trainer (keyword → reply) — student dạy chatbot rồi thử chat.
 *  2. Sentiment Meter — phân tích cảm xúc câu tiếng Việt bằng từ điển mini.
 *  3. Tokenizer Live — gõ câu, xem cách AI cắt thành tokens + ID số.
 *  4. Teen-code Normalizer — chuẩn hoá teen-code về tiếng Việt chuẩn.
 *  5. + 2 bonus games (True/False, Match Pairs).
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  Plus,
  Trash2,
  Bot,
  Smile,
  Frown,
  Meh,
  Hash,
  Wand2,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { BonusGames } from "./SandboxBonusGames";

type Intent = { id: string; keyword: string; reply: string };
type ChatMsg = { who: "user" | "bot"; text: string };

/* ───────────────────────── 1. Intent Trainer + Chat ───────────────────────── */

const IntentTrainer = () => {
  const [intents, setIntents] = useState<Intent[]>([
    { id: "1", keyword: "hello", reply: "Xin chào bạn! 👋" },
    { id: "2", keyword: "homework", reply: "Mình giúp bạn ôn bài nhé! 📚" },
    { id: "3", keyword: "game", reply: "Học xong rồi chơi nha 🎮" },
  ]);
  const [keyword, setKeyword] = useState("");
  const [reply, setReply] = useState("");
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState<"keyword" | "reply" | null>(null);

  const addIntent = () => {
    const k = keyword.trim().toLowerCase();
    const r = reply.trim();
    if (!k) {
      setFlash("keyword");
      toast({ title: "Thiếu từ khoá", description: "Hãy nhập từ khoá để bot nhận biết.", variant: "destructive" });
      window.setTimeout(() => setFlash(null), 900);
      return;
    }
    if (!r) {
      setFlash("reply");
      toast({ title: "Thiếu câu trả lời", description: "Hãy nhập câu trả lời tự động cho bot.", variant: "destructive" });
      window.setTimeout(() => setFlash(null), 900);
      return;
    }
    if (intents.some((i) => i.keyword === k)) {
      toast({ title: "Trùng từ khoá", description: `'${k}' đã có sẵn — sửa câu trả lời ở danh sách trên.`, variant: "destructive" });
      return;
    }
    setIntents((p) => [...p, { id: Date.now().toString(), keyword: k, reply: r }]);
    setKeyword("");
    setReply("");
    toast({ title: "✅ Đã thêm intent", description: `'${k}' → "${r.slice(0, 40)}${r.length > 40 ? "…" : ""}"` });
  };

  const removeIntent = (id: string) => setIntents((p) => p.filter((i) => i.id !== id));

  const send = () => {
    const msg = input.trim();
    if (!msg) return;
    const lower = msg.toLowerCase();
    const hit = intents.find((i) => lower.includes(i.keyword));
    const r = hit ? hit.reply : "Mình chưa được dạy câu này 🤖 — hãy thêm intent mới ở bên trái!";
    setChat((p) => [...p, { who: "user", text: msg }, { who: "bot", text: r }]);
    setInput("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {/* Trainer */}
      <div className="rounded-2xl border-2 border-fuchsia-400/40 bg-fuchsia-500/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-fuchsia-600" />
          <h4 className="font-bold text-sm">🧠 Dạy chatbot (Intents)</h4>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
          {intents.map((i) => (
            <div key={i.id} className="flex items-center gap-2 p-2 rounded-lg bg-background border">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 shrink-0">
                {i.keyword}
              </span>
              <span className="text-xs flex-1 truncate text-foreground">{i.reply}</span>
              <button onClick={() => removeIntent(i.id)} className="text-rose-500 hover:text-rose-700">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Input
            placeholder="① Từ khoá (vd: bài tập)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIntent()}
            className={`text-sm transition ${flash === "keyword" ? "border-rose-500 ring-2 ring-rose-300" : ""}`}
          />
          <Input
            placeholder="② Câu trả lời tự động của bot"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIntent()}
            className={`text-sm transition ${flash === "reply" ? "border-rose-500 ring-2 ring-rose-300" : ""}`}
          />
          <Button
            type="button"
            onClick={addIntent}
            disabled={!keyword.trim() || !reply.trim()}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white disabled:opacity-50"
          >
            <Plus className="w-4 h-4 mr-1" /> Thêm intent
          </Button>
          <p className="text-[11px] text-muted-foreground">
            💡 Điền cả 2 ô rồi bấm <b>Thêm intent</b> (hoặc nhấn Enter).
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="rounded-2xl border-2 border-purple-400/40 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-purple-600" />
          <h4 className="font-bold text-sm">💬 Thử nói với bot</h4>
        </div>
        <div className="flex-1 min-h-[180px] max-h-[260px] overflow-y-auto space-y-2 mb-3 p-2 rounded-lg bg-background/60">
          {chat.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">
              Gõ "hello" hoặc "game" để bot trả lời 👇
            </p>
          )}
          <AnimatePresence initial={false}>
            {chat.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.who === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-sm ${
                    m.who === "user"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-background border rounded-bl-sm text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Nhắn gì đó..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="text-sm"
          />
          <Button onClick={send} size="icon" className="bg-purple-600 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── 2. Sentiment Meter ───────────────────────── */

const POS_WORDS = ["yêu", "thích", "tuyệt", "hay", "vui", "đẹp", "mê", "tốt", "ngon", "đỉnh", "xuất sắc", "happy", "love", "good", "great", "nice", "đáng yêu", "thú vị"];
const NEG_WORDS = ["chán", "ghét", "tệ", "buồn", "dở", "xấu", "kinh", "ngu", "phí", "thất vọng", "bad", "hate", "sad", "boring", "horrible", "ức chế", "khó chịu"];

const SAMPLES = [
  "Phim hay quá trời luôn, tôi mê tít!",
  "Chán òm, phí cả buổi tối.",
  "Hôm nay trời đẹp, mình rất vui 😍",
  "Dở tệ, không xem nổi quá 5 phút.",
  "Cô giáo dạy thú vị, mình yêu lớp học này.",
];

const SentimentMeter = () => {
  const [text, setText] = useState("Phim hay quá trời luôn, tôi mê tít!");

  const analysis = useMemo(() => {
    const lower = text.toLowerCase();
    const pos = POS_WORDS.filter((w) => lower.includes(w));
    const neg = NEG_WORDS.filter((w) => lower.includes(w));
    const score = pos.length - neg.length;
    const total = pos.length + neg.length;
    const ratio = total === 0 ? 0 : score / total; // -1..1
    const verdict = score > 0 ? "pos" : score < 0 ? "neg" : "neu";
    return { pos, neg, score, ratio, verdict };
  }, [text]);

  const widthPct = ((analysis.ratio + 1) / 2) * 100;

  return (
    <div className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-rose-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Smile className="w-4 h-4 text-emerald-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          💖 Sentiment Meter — AI đoán cảm xúc câu
        </h4>
      </div>
      <p className="text-[12px] text-muted-foreground">
        Gõ một câu, AI mini đếm từ tích cực/tiêu cực rồi đoán cảm xúc.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="w-full text-sm p-2 rounded-lg border-2 border-border bg-card focus:border-emerald-400 outline-none"
        placeholder="Gõ câu tiếng Việt..."
      />

      <div className="flex flex-wrap gap-1.5">
        {SAMPLES.map((s) => (
          <button
            key={s}
            onClick={() => setText(s)}
            className="text-[11px] px-2 py-0.5 rounded-full border border-border bg-card hover:bg-muted"
          >
            {s.slice(0, 22)}…
          </button>
        ))}
      </div>

      <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-rose-500 via-amber-300 to-emerald-500">
        <motion.div
          animate={{ left: `${widthPct}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="absolute -top-1 w-3 h-6 rounded-md bg-slate-900 dark:bg-white shadow-lg"
          style={{ transform: "translateX(-50%)" }}
        />
      </div>

      <div className="flex items-center justify-between">
        <motion.div
          key={analysis.verdict}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-extrabold border-2 ${
            analysis.verdict === "pos"
              ? "bg-emerald-500/15 border-emerald-400 text-emerald-700 dark:text-emerald-200"
              : analysis.verdict === "neg"
              ? "bg-rose-500/15 border-rose-400 text-rose-700 dark:text-rose-200"
              : "bg-amber-500/15 border-amber-400 text-amber-700 dark:text-amber-200"
          }`}
        >
          {analysis.verdict === "pos" ? <Smile className="w-4 h-4" /> : analysis.verdict === "neg" ? <Frown className="w-4 h-4" /> : <Meh className="w-4 h-4" />}
          {analysis.verdict === "pos" ? "Tích cực" : analysis.verdict === "neg" ? "Tiêu cực" : "Trung tính"}
        </motion.div>
        <div className="text-xs text-muted-foreground">
          +{analysis.pos.length} | -{analysis.neg.length}
        </div>
      </div>

      {(analysis.pos.length > 0 || analysis.neg.length > 0) && (
        <div className="flex flex-wrap gap-1">
          {analysis.pos.map((w) => (
            <span key={`p-${w}`} className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-200 font-mono">+{w}</span>
          ))}
          {analysis.neg.map((w) => (
            <span key={`n-${w}`} className="text-[11px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-200 font-mono">-{w}</span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── 3. Tokenizer Live ───────────────────────── */

const TokenizerLive = () => {
  const [text, setText] = useState("Xin chào, hôm nay học AI rất vui!");
  const tokens = useMemo(() => {
    return text
      .toLowerCase()
      .replace(/[.,!?;:()"'„""]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }, [text]);

  // Stable hash → ID (toy embedding)
  const idOf = (t: string) => {
    let h = 0;
    for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
    return (h % 9000) + 1000;
  };

  const colors = ["bg-cyan-500/20 text-cyan-700 dark:text-cyan-200", "bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-200", "bg-emerald-500/20 text-emerald-700 dark:text-emerald-200", "bg-amber-500/20 text-amber-700 dark:text-amber-200", "bg-purple-500/20 text-purple-700 dark:text-purple-200"];

  return (
    <div className="rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Hash className="w-4 h-4 text-cyan-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
          # Tokenizer Live — AI nhìn câu bạn như thế nào?
        </h4>
      </div>
      <p className="text-[12px] text-muted-foreground">
        Trước khi "đọc", AI cắt câu thành <b>tokens</b> và đổi mỗi token thành 1 con số (token ID).
      </p>

      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-sm"
        placeholder="Gõ câu của bạn..."
      />

      <div className="flex flex-wrap gap-1.5 min-h-[44px]">
        {tokens.length === 0 ? (
          <span className="text-xs text-muted-foreground">— Chưa có token —</span>
        ) : (
          tokens.map((t, i) => (
            <motion.span
              key={`${t}-${i}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${colors[i % colors.length]}`}
            >
              {t}
              <span className="ml-1 text-[10px] font-mono opacity-70">#{idOf(t)}</span>
            </motion.span>
          ))
        )}
      </div>

      <div className="text-[11px] text-muted-foreground">
        Số token: <b>{tokens.length}</b> · ChatGPT thật tính tiền theo… đúng cái này 😅
      </div>
    </div>
  );
};

/* ───────────────────────── 4. Teen-code Normalizer ───────────────────────── */

const TEEN_MAP: Record<string, string> = {
  "k": "không", "ko": "không", "kh": "không", "hok": "không",
  "bít": "biết", "bit": "biết",
  "iu": "yêu",
  "qá": "quá", "wa": "quá",
  "lm": "làm", "lám": "làm",
  "bt": "bài tập",
  "zùm": "giùm", "dùm": "giùm",
  "vs": "với",
  "ng": "người",
  "trc": "trước",
  "z": "vậy",
  "j": "gì", "ji": "gì",
  "đc": "được", "dc": "được",
  "r": "rồi", "rui": "rồi",
  "mng": "mọi người",
  "nhìu": "nhiều",
  "thik": "thích",
  "lun": "luôn",
};

const TEEN_SAMPLES = [
  "k bít lm bt zùm vs",
  "iu qá đi mất r",
  "mng oi giúp e ji với",
  "ko thik mưa lun á",
];

const TeenCodeNormalizer = () => {
  const [text, setText] = useState(TEEN_SAMPLES[0]);

  const normalized = useMemo(() => {
    return text
      .split(/(\s+)/)
      .map((token) => {
        const key = token.toLowerCase().replace(/[.,!?]/g, "");
        if (TEEN_MAP[key]) {
          const punct = token.match(/[.,!?]$/)?.[0] ?? "";
          return { orig: token, fixed: TEEN_MAP[key] + punct, changed: true };
        }
        return { orig: token, fixed: token, changed: false };
      });
  }, [text]);

  const changedCount = normalized.filter((n) => n.changed).length;

  return (
    <div className="rounded-2xl border-2 border-orange-400/40 bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Wand2 className="w-4 h-4 text-orange-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-orange-700 dark:text-orange-300">
          🪄 Teen-code → Tiếng Việt chuẩn
        </h4>
      </div>
      <p className="text-[12px] text-muted-foreground">
        Trước khi xử lý tiếng Việt, AI phải <b>chuẩn hoá</b> teen-code về dạng từ điển.
      </p>

      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-sm font-mono"
      />

      <div className="flex flex-wrap gap-1.5">
        {TEEN_SAMPLES.map((s) => (
          <button
            key={s}
            onClick={() => setText(s)}
            className="text-[11px] px-2 py-0.5 rounded-full border border-border bg-card hover:bg-muted font-mono"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-card border border-border min-h-[44px]">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          AI hiểu là:
        </div>
        <div className="text-sm leading-relaxed">
          {normalized.map((n, i) => (
            <span
              key={i}
              className={n.changed ? "bg-emerald-500/25 text-emerald-800 dark:text-emerald-200 px-1 rounded font-bold" : ""}
            >
              {n.fixed}
            </span>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground flex items-center gap-2">
        <RefreshCcw className="w-3 h-3" />
        Đã chuẩn hoá <b className="text-orange-600">{changedCount}</b> từ teen-code.
      </div>
    </div>
  );
};

/* ───────────────────────── Topic-specific bonus content ─────────────────────── */

const NLP_TF = [
  { q: "AI hiểu chữ tiếng Việt trực tiếp như con người.", a: false, why: "AI biến chữ thành số (tokens) trước khi xử lý." },
  { q: "Intent là 'ý định' của người dùng (vd: hỏi giá).", a: true, why: "Chatbot phân loại câu vào các intent." },
  { q: "Phân tích cảm xúc gọi là Sentiment Analysis.", a: true },
  { q: "Teen-code 'k bít' chuẩn hoá thành 'không biết'.", a: true },
  { q: "ChatGPT đếm chữ cái để tính tiền.", a: false, why: "Nó đếm theo TOKEN — gần giống số 'từ con'." },
];

const NLP_PAIRS = [
  { a: "Tokenization", b: "Cắt câu thành các đơn vị nhỏ" },
  { a: "Intent", b: "Ý định người dùng (hỏi giá, chào…)" },
  { a: "Sentiment", b: "Cảm xúc tích cực / tiêu cực" },
  { a: "Translation", b: "Dịch máy (VI ↔ EN)" },
];

/* ───────────────────────── Root export ─────────────────────── */

const NLPSandbox = () => (
  <div className="space-y-3">
    <IntentTrainer />
    <SentimentMeter />
    <TokenizerLive />
    <TeenCodeNormalizer />
    <BonusGames tfItems={NLP_TF} matchPairs={NLP_PAIRS} accent="from-fuchsia-500 to-purple-600" border="border-fuchsia-400/40" />
  </div>
);

export default NLPSandbox;
