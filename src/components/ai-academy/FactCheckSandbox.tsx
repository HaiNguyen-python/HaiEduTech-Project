/**
 * FactCheckSandbox — Spot AI hallucinations.
 * 5 sample ChatGPT answers; student marks each as TRUE or HALLUCINATION,
 * sandbox reveals red flags and explanation.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";

type Claim = { text: string; isTrue: boolean; explain: string };
const CLAIMS: Claim[] = [
  {
    text: "Thủ đô của Việt Nam là Hà Nội, có dân số khoảng 8 triệu người.",
    isTrue: true,
    explain: "Đúng — Hà Nội ~ 8.4 triệu dân (2024). Số liệu hợp lý, dễ kiểm chứng.",
  },
  {
    text: "Chủ tịch Hồ Chí Minh từng giành giải Nobel Hòa bình năm 1954.",
    isTrue: false,
    explain: "Hallucination! Bác Hồ chưa bao giờ nhận giải Nobel. AI bịa con số cụ thể để nghe đáng tin.",
  },
  {
    text: "Công thức tính diện tích hình tròn là π × r².",
    isTrue: true,
    explain: "Đúng — công thức kinh điển, kiểm tra dễ bằng SGK Toán 8.",
  },
  {
    text: "Albert Einstein đã viết cuốn sách 'Thuyết tương đối cho trẻ em' năm 1923 bán được 2 triệu bản.",
    isTrue: false,
    explain: "Hallucination! Einstein chưa từng viết sách tên đó. Cảnh báo: số liệu cực kỳ cụ thể nhưng không kiểm chứng được.",
  },
  {
    text: "Tổng thống Mỹ Donald Trump đã ký Hiệp định Paris về khí hậu năm 2017.",
    isTrue: false,
    explain: "Hallucination! Trump RÚT khỏi Paris năm 2017 (ngược lại). AI nhầm chiều của sự kiện — lỗi rất phổ biến.",
  },
];

const TF = [
  { q: "AI thỉnh thoảng 'bịa' thông tin nghe rất hợp lý.", a: true },
  { q: "Càng cụ thể (con số, tên người), càng phải nghi ngờ AI bịa.", a: true },
  { q: "ChatGPT luôn chính xác 100% với câu hỏi lịch sử.", a: false, why: "ChatGPT có hallucination — đặc biệt với chi tiết lịch sử." },
  { q: "Phải kiểm chứng AI bằng nguồn thứ 2 (Wikipedia, sách, thầy cô).", a: true },
];
const PAIRS = [
  { a: "Hallucination", b: "AI bịa thông tin nghe có vẻ thật" },
  { a: "Cross-check", b: "Kiểm chứng bằng nguồn thứ 2" },
  { a: "Source citation", b: "Yêu cầu AI trích nguồn" },
  { a: "Red flag", b: "Dấu hiệu đáng nghi: số liệu lạ" },
];

const FactCheckSandbox = () => {
  const [picks, setPicks] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState(false);
  const correct = revealed ? CLAIMS.filter((c, i) => picks[i] === c.isTrue).length : 0;

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <p className="text-sm text-muted-foreground">
        Mỗi câu dưới đây do ChatGPT viết. Hãy đánh dấu <b>ĐÚNG</b> hay <b>BỊA</b>, rồi bấm "Tiết lộ".
      </p>

      <div className="space-y-2">
        {CLAIMS.map((c, i) => {
          const pick = picks[i];
          const right = revealed && pick === c.isTrue;
          const wrong = revealed && pick !== undefined && pick !== c.isTrue;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-3 rounded-xl border-2 ${
                right ? "border-emerald-400 bg-emerald-500/10" : wrong ? "border-rose-400 bg-rose-500/10" : "border-border bg-card"
              }`}
            >
              <p className="text-sm text-foreground italic">"{c.text}"</p>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant={pick === true ? "default" : "outline"}
                  disabled={revealed}
                  onClick={() => setPicks((p) => ({ ...p, [i]: true }))}
                  className="text-xs"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Đúng
                </Button>
                <Button
                  size="sm"
                  variant={pick === false ? "default" : "outline"}
                  disabled={revealed}
                  onClick={() => setPicks((p) => ({ ...p, [i]: false }))}
                  className="text-xs"
                >
                  <XCircle className="w-3 h-3 mr-1" /> Bịa
                </Button>
              </div>
              {revealed && (
                <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-xs text-amber-800 dark:text-amber-200 flex gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{c.explain}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setRevealed(true)}
          disabled={revealed || Object.keys(picks).length < CLAIMS.length}
          className="flex-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white"
        >
          🔍 Tiết lộ đáp án
        </Button>
        <Button onClick={() => { setPicks({}); setRevealed(false); }} variant="outline">
          Reset
        </Button>
      </div>
      {revealed && (
        <p className="text-center font-bold text-lg">
          Bạn đúng <span className="text-emerald-500">{correct}/{CLAIMS.length}</span> câu — kỹ năng fact-check
          {correct >= 4 ? " 🌟 xuất sắc!" : correct >= 3 ? " 👍 khá tốt." : " cần luyện thêm."}
        </p>
      )}

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-amber-500 to-rose-600" border="border-amber-400/40" />
    </div>
  );
};

export default FactCheckSandbox;
