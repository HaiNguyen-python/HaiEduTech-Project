/**
 * PromptLabSandbox - Hands-on lab for 5 prompt-engineering patterns:
 * Role, Few-shot, Chain-of-Thought, ReAct, Self-Critique.
 * Students pick a pattern, see a template, and assemble a stronger prompt.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

type Pattern = {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  template: string;
  example: string;
};
const PATTERNS: Pattern[] = [
  {
    id: "role",
    emoji: "🎭",
    name: "Role Prompting",
    desc: "Gán cho AI một VAI TRÒ cụ thể để nó trả lời như chuyên gia.",
    template: "Bạn là {VAI TRÒ}. Hãy {YÊU CẦU} cho {ĐỐI TƯỢNG}, theo phong cách {PHONG CÁCH}.",
    example: "Bạn là gia sư Toán THPT 15 năm kinh nghiệm. Hãy giải thích Đạo hàm cho học sinh lớp 11 mất gốc, dùng ví dụ thực tế từ tốc độ ô tô.",
  },
  {
    id: "fewshot",
    emoji: "📚",
    name: "Few-shot",
    desc: "Cho AI 2–3 VÍ DỤ mẫu trước khi hỏi, AI sẽ bắt chước phong cách.",
    template: "Ví dụ 1: {INPUT_1} → {OUTPUT_1}\nVí dụ 2: {INPUT_2} → {OUTPUT_2}\nBây giờ: {INPUT_MỚI} →",
    example: "Ví dụ 1: 'Hôm nay nắng đẹp' → 😊 tích cực\nVí dụ 2: 'Bài kiểm tra khó quá' → 😞 tiêu cực\nBây giờ: 'Đi học sớm mệt thật' →",
  },
  {
    id: "cot",
    emoji: "🧠",
    name: "Chain-of-Thought (CoT)",
    desc: "Yêu cầu AI 'suy nghĩ từng bước' trước khi trả lời - tăng độ chính xác 30–50%.",
    template: "{CÂU HỎI}\nHãy suy nghĩ TỪNG BƯỚC trước khi đưa ra đáp án cuối cùng.",
    example: "Mẹ có 7 quả táo, cho con 3 quả, mẹ mua thêm 5 quả. Mẹ có bao nhiêu? Hãy suy nghĩ TỪNG BƯỚC.",
  },
  {
    id: "react",
    emoji: "🤖",
    name: "ReAct (Reason + Act)",
    desc: "AI luân phiên giữa SUY NGHĨ và HÀNH ĐỘNG (gọi tool, search, tính toán).",
    template: "Bạn có các tool: [search, calculator, calendar].\nMục tiêu: {GOAL}\nMỗi lượt trả về JSON: {thought, action, action_input}.",
    example: "Tool: [search, calculator]. Mục tiêu: 'Tìm dân số Hà Nội rồi tính 5% là bao nhiêu'. Bắt đầu.",
  },
  {
    id: "critic",
    emoji: "🔍",
    name: "Self-Critique",
    desc: "Bắt AI tự CHẤM ĐIỂM và SỬA câu trả lời của chính nó.",
    template: "{CÂU HỎI}\nSau khi trả lời, hãy tự đánh giá điểm 1–10 và viết lại bản tốt hơn.",
    example: "Viết đoạn 100 từ về 'Vì sao nên đọc sách'. Sau đó tự chấm 1–10 và viết bản v2 cải thiện điểm yếu.",
  },
];

const PL_TF = [
  { q: "Chain-of-Thought yêu cầu AI suy nghĩ từng bước trước khi trả lời.", a: true },
  { q: "Few-shot là cho AI vài ví dụ mẫu để bắt chước.", a: true },
  { q: "Role Prompting bắt đầu bằng 'Bạn là một chuyên gia X...'.", a: true },
  { q: "Prompt càng ngắn càng tốt, không cần ngữ cảnh.", a: false, why: "Ngược lại - prompt giàu ngữ cảnh cho kết quả chính xác hơn." },
  { q: "ReAct = AI suy luận + gọi tool (search, calc) luân phiên.", a: true },
];
const PL_PAIRS = [
  { a: "Role", b: "Bạn là chuyên gia X..." },
  { a: "Few-shot", b: "Cho AI vài ví dụ mẫu" },
  { a: "CoT", b: "Suy nghĩ từng bước" },
  { a: "ReAct", b: "Suy luận + gọi tool" },
  { a: "Self-Critique", b: "AI tự chấm điểm & sửa" },
];

const PromptLabSandbox = () => {
  const [pid, setPid] = useState(PATTERNS[0].id);
  const [draft, setDraft] = useState(PATTERNS[0].example);
  const [copied, setCopied] = useState(false);
  const p = PATTERNS.find((x) => x.id === pid)!;

  const pick = (id: string) => {
    const np = PATTERNS.find((x) => x.id === id)!;
    setPid(id);
    setDraft(np.example);
    setCopied(false);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ }
  };

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 p-3">
        <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-1">
          <Wand2 className="w-4 h-4" /> 5 Pattern phải biết của Prompt Engineer
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PATTERNS.map((it) => (
            <button
              key={it.id}
              onClick={() => pick(it.id)}
              className={`p-2 rounded-xl border-2 text-xs font-bold transition text-left ${
                pid === it.id
                  ? "border-purple-500 bg-purple-500/20 text-purple-700 dark:text-purple-200"
                  : "border-border bg-card hover:border-purple-400/40"
              }`}
            >
              <div className="text-lg">{it.emoji}</div>
              {it.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border-2 border-fuchsia-400/40 bg-fuchsia-500/5 p-3 space-y-2">
        <p className="text-sm text-foreground"><b>{p.emoji} {p.name}</b> - {p.desc}</p>
        <div className="rounded-lg bg-card border border-border p-2 text-xs font-mono whitespace-pre-wrap text-muted-foreground">
          {p.template}
        </div>
        <label className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300">✍️ Thử viết prompt theo pattern này:</label>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          className="text-sm font-mono"
        />
        <Button onClick={copy} size="sm" variant="outline" className="border-fuchsia-400/50 text-fuchsia-700 dark:text-fuchsia-300">
          {copied ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Đã copy!</> : <><Copy className="w-3 h-3 mr-1" /> Copy prompt</>}
        </Button>
      </motion.div>

      <ChipFilter
        title="✨ Yếu tố làm prompt MẠNH"
        hint="Bật từng yếu tố để xem điểm prompt tăng. Đây là checklist của senior Prompt Engineer."
        baseline={15}
        positive
        goal={80}
        goodLabel="Prompt của bạn đã đủ chuyên nghiệp ✅"
        badLabel="Còn thiếu - bật thêm vài yếu tố"
        metricLabel="Điểm chuyên môn"
        accent="from-purple-500 to-fuchsia-600"
        border="border-purple-400/40"
        options={[
          { id: "1", label: "🎭 Vai trò rõ ràng", weight: 14 },
          { id: "2", label: "🎯 Mục tiêu cụ thể", weight: 14 },
          { id: "3", label: "📚 2–3 ví dụ mẫu", weight: 12 },
          { id: "4", label: "🧠 Yêu cầu CoT", weight: 12 },
          { id: "5", label: "📐 Format đầu ra (JSON/bảng)", weight: 12 },
          { id: "6", label: "🚫 Ràng buộc (≤300 từ, tiếng Việt)", weight: 10 },
          { id: "7", label: "🔁 Tự critique cuối câu trả lời", weight: 10 },
        ]}
      />

      <BestMatchPick
        title="🧪 Ghép pattern phù hợp"
        hint="Với mỗi nhu cầu, pattern prompt nào hợp nhất?"
        accent="from-purple-500 to-fuchsia-600"
        border="border-purple-400/40"
        options={[
          { id: "role", label: "Role" },
          { id: "fewshot", label: "Few-shot" },
          { id: "cot", label: "CoT" },
          { id: "react", label: "ReAct" },
          { id: "critic", label: "Self-Critique" },
        ]}
        items={[
          { prompt: "Cần AI giải bài Toán nhiều bước chính xác", correctId: "cot" },
          { prompt: "Cần AI phân loại cảm xúc đúng style của em", correctId: "fewshot" },
          { prompt: "Cần AI trả lời như một bác sĩ đa khoa", correctId: "role" },
          { prompt: "Cần AI search web + tính toán xen kẽ", correctId: "react" },
          { prompt: "Cần AI tự sửa bài essay tiếng Anh của em", correctId: "critic" },
        ]}
      />

      <BonusGames tfItems={PL_TF} matchPairs={PL_PAIRS} accent="from-purple-500 to-fuchsia-600" border="border-purple-400/40" />
    </div>
  );
};

export default PromptLabSandbox;
