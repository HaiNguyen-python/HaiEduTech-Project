/**
 * EthicsSandbox — "AI có công bằng không?"
 * Students adjust a biased training dataset (gender ratio) for a fake hiring
 * model and watch the predicted hire-rate gap shrink. Teaches dataset bias
 * and why diverse training data matters.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Scale, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";

const ETH_TF = [
  { q: "AI có ý thức và có thể tự quyết định đạo đức.", a: false, why: "AI chỉ học theo dữ liệu — không có 'lương tâm'." },
  { q: "Dữ liệu thiên vị → AI thiên vị.", a: true },
  { q: "Amazon từng phải bỏ AI tuyển dụng vì phân biệt giới.", a: true, why: "Năm 2018, vì dữ liệu lịch sử lệch về nam giới." },
  { q: "Cân bằng dữ liệu giúp AI công bằng hơn.", a: true },
  { q: "AI Ethics chỉ quan trọng cho công ty lớn.", a: false, why: "Mọi sản phẩm AI dùng cho con người đều cần — kể cả app nhỏ." },
];
const ETH_PAIRS = [
  { a: "Bias", b: "Thiên vị trong dữ liệu / mô hình" },
  { a: "Fairness", b: "Công bằng giữa các nhóm người" },
  { a: "Transparency", b: "Người dùng hiểu được AI quyết định ra sao" },
  { a: "Privacy", b: "Bảo vệ dữ liệu cá nhân" },
];

const EthicsSandbox = () => {
  // % of training examples that are male engineers (rest female)
  const [maleRatio, setMaleRatio] = useState(85);

  // Model "learns" the bias: predicted hire rate is correlated to representation
  const malePred = useMemo(() => 0.35 + (maleRatio / 100) * 0.5, [maleRatio]);
  const femalePred = useMemo(() => 0.85 - (maleRatio / 100) * 0.5, [maleRatio]);
  const gap = Math.abs(malePred - femalePred);
  const fair = gap < 0.08;

  return (
    <div className="space-y-6 sm:space-y-7">
      <div className="rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/5 to-rose-500/5 p-4">
        <div className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1">
          <Scale className="w-3 h-3" /> Dữ liệu huấn luyện AI tuyển dụng
        </div>

        {/* Avatar bar */}
        <div className="grid grid-cols-20 gap-0.5 mb-3" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
          {Array.from({ length: 20 }).map((_, i) => {
            const isMale = i < Math.round(maleRatio / 5);
            return (
              <div key={i} className="text-base sm:text-lg text-center">
                {isMale ? "👨‍💻" : "👩‍💻"}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs mb-1">
          <span>👨‍💻 Nam: <b>{maleRatio}%</b></span>
          <span>👩‍💻 Nữ: <b>{100 - maleRatio}%</b></span>
        </div>
        <Slider value={[maleRatio]} min={10} max={95} step={5} onValueChange={(v) => setMaleRatio(v[0])} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-blue-400/40 bg-blue-500/5 p-3 text-center">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">Tỉ lệ AI tuyển NAM</div>
          <motion.div key={malePred} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-black text-blue-600">
            {(malePred * 100).toFixed(0)}%
          </motion.div>
        </div>
        <div className="rounded-2xl border-2 border-pink-400/40 bg-pink-500/5 p-3 text-center">
          <div className="text-xs font-bold text-pink-700 dark:text-pink-300 mb-1">Tỉ lệ AI tuyển NỮ</div>
          <motion.div key={femalePred} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-black text-pink-600">
            {(femalePred * 100).toFixed(0)}%
          </motion.div>
        </div>
      </div>

      <motion.div
        key={fair ? "fair" : "unfair"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border-2 p-3 ${
          fair
            ? "border-emerald-400/50 bg-emerald-500/10"
            : "border-rose-400/50 bg-rose-500/10"
        }`}
      >
        <div className={`flex items-center gap-2 font-bold text-sm ${fair ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
          {fair ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {fair ? "Công bằng ✅" : "Thiên vị ⚠️"} (chênh lệch {(gap * 100).toFixed(0)}%)
        </div>
        <p className="text-xs text-foreground/80 mt-1">
          {fair
            ? "Dữ liệu cân bằng → AI ra quyết định công bằng hơn cho cả 2 giới."
            : "Dữ liệu lệch quá nhiều → AI 'học' rằng nghề lập trình thuộc về một giới, và sẽ loại CV của giới còn lại. Đây là Amazon đã từng gặp năm 2018!"}
        </p>
      </motion.div>

      <p className="text-xs text-muted-foreground">
        💡 AI <b>không có ý thức</b> — nó chỉ học từ dữ liệu. Nếu dữ liệu thiên vị, AI sẽ thiên vị. Đó là lý do <b>AI Ethics</b> là môn quan trọng nhất ở MIT, Stanford.
      </p>

      <BonusGames tfItems={ETH_TF} matchPairs={ETH_PAIRS} accent="from-amber-500 to-rose-500" border="border-amber-400/40" />
    </div>
  );
};

export default EthicsSandbox;
