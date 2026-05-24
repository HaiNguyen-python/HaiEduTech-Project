/**
 * StudySmartSandbox — "Prompt Coach for studying"
 * Students type a study question, sandbox suggests a better prompt
 * template and shows quality score (Specific / With context / Asks for steps).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BonusGames } from "./SandboxBonusGames";

const TF = [
  { q: "Prompt càng cụ thể, AI trả lời càng đúng.", a: true },
  { q: "Bảo AI 'giải thích từng bước' giúp hiểu sâu hơn.", a: true },
  { q: "Copy nguyên đề bài rồi yêu cầu AI làm hộ là cách học tốt.", a: false, why: "Đó là 'AI làm thay' — bạn không học được gì." },
  { q: "NotebookLM có thể đọc PDF bài giảng và hỏi đáp theo nội dung.", a: true },
  { q: "Nên kiểm tra lại đáp án AI bằng SGK hoặc thầy cô.", a: true },
];
const PAIRS = [
  { a: "Prompt tốt", b: "Có ngữ cảnh + yêu cầu cụ thể" },
  { a: "ChatGPT", b: "Trợ lý chat đa năng" },
  { a: "NotebookLM", b: "Đọc tài liệu PDF và Q&A" },
  { a: "Hallucination", b: "AI bịa thông tin sai sự thật" },
];

const score = (p: string) => {
  const s = p.toLowerCase();
  let n = 0;
  const checks = [
    { ok: p.length >= 30, label: "Đủ dài (≥ 30 ký tự)" },
    { ok: /lớp|grade|cấp|tuổi|tôi|em|mình/.test(s), label: "Có ngữ cảnh về bản thân" },
    { ok: /bước|step|giải thích|ví dụ|why|tại sao|cách/.test(s), label: "Yêu cầu giải thích / ví dụ" },
    { ok: /toán|lý|hóa|văn|anh|sử|địa|sinh|tin|môn/.test(s), label: "Nêu rõ chủ đề / môn học" },
  ];
  n = checks.filter((c) => c.ok).length;
  return { n, checks };
};

const StudySmartSandbox = () => {
  const [text, setText] = useState("Giải bài tập hộ tôi.");
  const r = score(text);
  const better = `Em đang học lớp 10, môn Toán. Hãy giải thích từng bước cách giải phương trình bậc 2 ax² + bx + c = 0, kèm 1 ví dụ cụ thể và cách kiểm tra nghiệm. Đừng làm hộ bài tập của em — chỉ hướng dẫn cách suy nghĩ.`;

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3">
        <label className="text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1 mb-2">
          <Sparkles className="w-4 h-4" /> Gõ prompt học bài của bạn
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="text-sm"
          placeholder="Ví dụ: Em học lớp 9, môn Vật Lý..."
        />
        <div className="mt-3 space-y-1.5">
          {r.checks.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {c.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-400" />}
              <span className={c.ok ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}>{c.label}</span>
            </div>
          ))}
        </div>
        <motion.div
          key={r.n}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="mt-3 text-center text-2xl font-black"
        >
          <span className={r.n >= 3 ? "text-emerald-500" : r.n >= 2 ? "text-amber-500" : "text-rose-500"}>
            Điểm prompt: {r.n}/4
          </span>
        </motion.div>
      </div>

      <div className="rounded-2xl border-2 border-emerald-400/40 bg-emerald-500/5 p-3">
        <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-2">✨ Mẫu prompt 4/4 sao của thầy Hải</h4>
        <p className="text-[15px] text-foreground leading-relaxed italic">"{better}"</p>
        <Button
          onClick={() => setText(better)}
          size="sm"
          variant="outline"
          className="mt-3 border-emerald-400/50 text-emerald-700 dark:text-emerald-300"
        >
          Thử mẫu này →
        </Button>
      </div>

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-blue-500 to-cyan-600" border="border-blue-400/40" />
    </div>
  );
};

export default StudySmartSandbox;
