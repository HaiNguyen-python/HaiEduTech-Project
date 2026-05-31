/**
 * StudySmartSandbox - "Prompt Coach for studying"
 * Students type a study question, sandbox suggests a better prompt
 * template and shows quality score (Specific / With context / Asks for steps).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick, ChipFilter } from "./SandboxMiniActivity";

const TF = [
  { q: "Prompt càng cụ thể, AI trả lời càng đúng.", a: true },
  { q: "Bảo AI 'giải thích từng bước' giúp hiểu sâu hơn.", a: true },
  { q: "Copy nguyên đề bài rồi yêu cầu AI làm hộ là cách học tốt.", a: false, why: "Đó là 'AI làm thay' - bạn không học được gì." },
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
  const [text, setText] = useState("Em chưa hiểu cách giải phương trình bậc 2, hãy giúp em.");
  const r = score(text);
  const better = `Em đang học lớp 10, môn Toán. Hãy giải thích từng bước cách giải phương trình bậc 2 ax² + bx + c = 0, kèm 1 ví dụ cụ thể và cách kiểm tra nghiệm. Đừng làm hộ bài tập của em - chỉ hướng dẫn cách suy nghĩ.`;

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

      <ChipFilter
        title="🧱 Lắp ráp prompt 4 lớp"
        hint="Một prompt mạnh có 4 lớp: Vai trò + Ngữ cảnh + Yêu cầu + Định dạng. Chọn các viên gạch để cộng điểm."
        baseline={20}
        positive
        goal={75}
        goodLabel="Prompt đã đủ chuẩn 4 lớp ✅"
        badLabel="Còn thiếu - thêm vài viên gạch nữa"
        metricLabel="Điểm Prompt"
        accent="from-blue-500 to-cyan-600"
        border="border-blue-400/40"
        options={[
          { id: "1", label: "🎭 Vai trò: 'Bạn là gia sư Toán lớp 10'", weight: 20 },
          { id: "2", label: "📚 Ngữ cảnh: 'Em đang ôn THPT QG'", weight: 18 },
          { id: "3", label: "🎯 Yêu cầu cụ thể: 'Giải phương trình bậc 2'", weight: 18 },
          { id: "4", label: "📝 Định dạng: 'Trình bày 5 bước, đánh số'", weight: 14 },
          { id: "5", label: "🚫 Ràng buộc: 'Không làm hộ, chỉ hướng dẫn'", weight: 12 },
        ]}
      />

      <BestMatchPick
        title="🥇 Chọn prompt tốt nhất cho IELTS"
        hint="Mỗi mục tiêu có 3 prompt mẫu (A · Lười / B · Hời hợt / C · Chuẩn). Hãy chọn prompt 'chuẩn bài' nhất."
        accent="from-blue-500 to-cyan-600"
        border="border-blue-400/40"
        options={[
          { id: "a", label: "A · Lười" },
          { id: "b", label: "B · Hời hợt" },
          { id: "c", label: "C · Chuẩn" },
        ]}
        items={[
          {
            prompt: "Mục tiêu: Cải thiện Writing Task 2 từ band 5.5 → 6.5",
            correctId: "c",
            candidates: [
              { id: "a", label: "A · Lười", text: "Viết hộ tôi 1 bài essay band 6.5 chủ đề Education." },
              { id: "b", label: "B · Hời hợt", text: "Làm sao để tăng band Writing Task 2 lên 6.5?" },
              { id: "c", label: "C · Chuẩn", text: "Bạn là examiner IELTS. Tôi đang ở band 5.5 Writing Task 2, điểm yếu là Task Response và Coherence. Hãy: (1) liệt kê 5 lỗi phổ biến khiến bài bị giữ ở band 5.5, (2) đưa 3 cấu trúc câu band 6.5 thay thế cho câu đơn giản, (3) cho 1 đề mẫu chủ đề Education kèm outline 4 đoạn theo tiêu chí band 6.5." },
            ],
          },
          {
            prompt: "Mục tiêu: Ôn 50 từ vựng IELTS chủ đề Environment",
            correctId: "c",
            candidates: [
              { id: "a", label: "A · Lười", text: "Cho tôi 50 từ vựng Environment." },
              { id: "b", label: "B · Hời hợt", text: "Liệt kê 50 từ vựng IELTS chủ đề Environment có nghĩa tiếng Việt." },
              { id: "c", label: "C · Chuẩn", text: "Bạn là giáo viên IELTS band 8.0. Hãy tạo bảng 50 từ vựng band 6.5–7.5 chủ đề Environment gồm: từ | loại từ | phiên âm | nghĩa tiếng Việt | collocation phổ biến | 1 câu ví dụ dùng trong Writing Task 2. Nhóm theo 5 chủ đề con (pollution, climate change, conservation, energy, waste). Cuối cùng tạo 10 câu hỏi quiz fill-in-blank để tôi tự kiểm tra." },
            ],
          },
          {
            prompt: "Mục tiêu: Phân tích lỗi grammar trong bài essay tự viết",
            correctId: "c",
            candidates: [
              { id: "a", label: "A · Lười", text: "Sửa bài essay này cho tôi: [paste]" },
              { id: "b", label: "B · Hời hợt", text: "Kiểm tra grammar bài essay sau và sửa lỗi giúp tôi: [paste]" },
              { id: "c", label: "C · Chuẩn", text: "Bạn là IELTS examiner. Đây là bài Writing Task 2 của tôi (mục tiêu band 6.5): [paste]. Hãy: (1) liệt kê từng lỗi grammar theo bảng (câu gốc | loại lỗi | câu sửa | giải thích ngắn), (2) chấm điểm 4 tiêu chí (TR/CC/LR/GRA) kèm lý do, (3) gợi ý 3 câu nâng cấp từ band 5.5 lên 6.5, (4) KHÔNG viết lại cả bài hộ tôi - chỉ hướng dẫn để tôi tự sửa." },
            ],
          },
        ]}
      />

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-blue-500 to-cyan-600" border="border-blue-400/40" />
    </div>
  );
};

export default StudySmartSandbox;
