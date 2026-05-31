/**
 * StartupVNSandbox - From idea to MVP for Vietnamese teen founders.
 * Students assemble a startup canvas (problem + solution + model + GTM)
 * and try to maximize an investor score.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

const SU_TF = [
  { q: "MVP = Minimum Viable Product - phiên bản nhỏ nhất giải quyết được vấn đề.", a: true },
  { q: "VinAI, Got It, Misa, ELSA Speak là các startup AI gốc Việt thành công.", a: true },
  { q: "Khởi nghiệp nhất định phải có $1 triệu USD vốn ban đầu.", a: false, why: "Nhiều startup VN bắt đầu từ <100 triệu VND." },
  { q: "Lean Startup khuyên: Build → Measure → Learn liên tục.", a: true },
  { q: "Pitch deck 10 slide là chuẩn quốc tế cho seed round.", a: true },
];
const SU_PAIRS = [
  { a: "MVP", b: "Phiên bản nhỏ nhất khả dụng" },
  { a: "PMF", b: "Product-Market Fit - sản phẩm khớp thị trường" },
  { a: "Pivot", b: "Đổi hướng khi mô hình cũ không chạy" },
  { a: "Burn rate", b: "Tốc độ đốt tiền mỗi tháng" },
  { a: "Runway", b: "Số tháng còn sống với tiền hiện có" },
];

type Component = { id: string; label: string; weight: number };
const PROBLEM: Component[] = [
  { id: "p1", label: "Vấn đề rõ ràng, đo được bằng số", weight: 18 },
  { id: "p2", label: "Có > 1 triệu người gặp vấn đề ở VN", weight: 14 },
  { id: "p3", label: "Người dùng SẴN SÀNG trả tiền giải quyết", weight: 16 },
];
const SOLUTION: Component[] = [
  { id: "s1", label: "Dùng AI giải quyết, không chỉ nói 'có AI'", weight: 14 },
  { id: "s2", label: "MVP làm được trong 1 tháng", weight: 12 },
  { id: "s3", label: "Trải nghiệm 10× tốt hơn cách cũ", weight: 16 },
];
const GTM: Component[] = [
  { id: "g1", label: "Kênh phân phối: TikTok/Zalo OA/Trường học", weight: 10 },
  { id: "g2", label: "Mô hình giá rõ ràng (Freemium / SaaS)", weight: 12 },
  { id: "g3", label: "Có 100 user thử nghiệm trước khi gọi vốn", weight: 14 },
];

const StartupVNSandbox = () => {
  const [problem, setProblem] = useState<Set<string>>(new Set());
  const [solution, setSolution] = useState<Set<string>>(new Set());
  const [gtm, setGtm] = useState<Set<string>>(new Set());
  const [team, setTeam] = useState(3);

  const toggle = (set: Set<string>, setter: (n: Set<string>) => void, id: string) => {
    const n = new Set(set);
    n.has(id) ? n.delete(id) : n.add(id);
    setter(n);
  };

  const score = useMemo(() => {
    const sum = (list: Component[], picked: Set<string>) =>
      list.reduce((s, it) => s + (picked.has(it.id) ? it.weight : 0), 0);
    const base = sum(PROBLEM, problem) + sum(SOLUTION, solution) + sum(GTM, gtm) + team * 4;
    return Math.min(100, base);
  }, [problem, solution, gtm, team]);

  const verdict =
    score >= 80 ? { t: "🏆 Investor sẽ rót vốn seed!", c: "from-emerald-500 to-teal-600", k: "text-emerald-600" } :
    score >= 55 ? { t: "🤝 Có tiềm năng - cần thêm dữ liệu", c: "from-amber-500 to-orange-500", k: "text-amber-600" } :
                  { t: "⚠️ Chưa đủ thuyết phục - sửa lại MVP", c: "from-rose-500 to-pink-500", k: "text-rose-600" };

  const Row = ({ title, list, picked, setter }: { title: string; list: Component[]; picked: Set<string>; setter: (n: Set<string>) => void }) => (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-xs font-bold text-foreground mb-2">{title}</div>
      <div className="flex flex-wrap gap-1.5">
        {list.map((c) => {
          const on = picked.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(picked, setter, c.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border-2 transition active:scale-95 ${
                on
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent shadow"
                  : "bg-card text-foreground border-border hover:border-orange-400/60"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-orange-400/40 bg-gradient-to-br from-orange-500/10 to-rose-500/10 p-3">
        <h4 className="text-sm font-bold text-orange-700 dark:text-orange-300 mb-1 flex items-center gap-1">
          <Rocket className="w-4 h-4" /> Lean Canvas mini - tự xây startup AI Việt
        </h4>
        <p className="text-xs text-muted-foreground">Chọn các viên gạch xây ý tưởng. Investor sẽ chấm điểm cuối cùng.</p>
      </div>

      <Row title="🎯 1. Vấn đề (Problem)" list={PROBLEM} picked={problem} setter={setProblem} />
      <Row title="💡 2. Giải pháp AI (Solution)" list={SOLUTION} picked={solution} setter={setSolution} />
      <Row title="📣 3. Tiếp cận thị trường (Go-To-Market)" list={GTM} picked={gtm} setter={setGtm} />

      <div className="p-3 rounded-xl border bg-card">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>👥 Team kỹ sư + kinh doanh + design</span>
          <span className="font-bold text-orange-600">{team} người</span>
        </div>
        <Slider value={[team]} min={1} max={5} step={1} onValueChange={(v) => setTeam(v[0])} />
      </div>

      <motion.div
        key={score}
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-2xl border-2 p-4 text-center bg-gradient-to-br ${verdict.c} text-white shadow-lg`}
      >
        <div className="text-[11px] uppercase tracking-widest opacity-90">Investor Score</div>
        <div className="text-5xl font-black">{score}<span className="text-xl">/100</span></div>
        <div className="text-sm font-bold mt-1">{verdict.t}</div>
      </motion.div>

      <ChipFilter
        title="🏢 Học từ các startup AI Việt thành công"
        hint="Bật các yếu tố thật sự giúp các startup AI Việt thành công."
        baseline={15}
        positive
        goal={80}
        goodLabel="Bạn đã hiểu công thức thành công ✅"
        badLabel="Còn vài yếu tố quan trọng chưa bật"
        metricLabel="Hiểu biết Startup"
        accent="from-orange-500 to-rose-600"
        border="border-orange-400/40"
        options={[
          { id: "1", label: "✅ ELSA Speak: AI luyện phát âm tiếng Anh cho người Việt", weight: 18 },
          { id: "2", label: "✅ Misa AVA: AI cho kế toán SME - đúng pain point", weight: 16 },
          { id: "3", label: "✅ VinAI ViT5: model NLP riêng cho tiếng Việt", weight: 16 },
          { id: "4", label: "✅ Got It: nền tảng AI tutor xuất khẩu sang Mỹ", weight: 14 },
          { id: "5", label: "❌ Sao chép y nguyên ChatGPT rồi bán cao hơn", weight: -20 },
          { id: "6", label: "❌ Gọi vốn trước khi có 1 user trả tiền", weight: -15 },
        ]}
      />

      <BestMatchPick
        title="🚀 Sản phẩm AI VN nào giải vấn đề nào?"
        hint="Ghép đúng startup với pain point họ giải quyết."
        accent="from-orange-500 to-rose-600"
        border="border-orange-400/40"
        options={[
          { id: "elsa", label: "ELSA Speak" },
          { id: "misa", label: "Misa AVA" },
          { id: "kiki", label: "Zalo Kiki" },
          { id: "got", label: "Got It" },
        ]}
        items={[
          { prompt: "Người Việt nói tiếng Anh khó được hiểu - cần luyện phát âm", correctId: "elsa" },
          { prompt: "Kế toán SME tốn 5 tiếng/ngày nhập hoá đơn thủ công", correctId: "misa" },
          { prompt: "Lái xe ô tô VN không rảnh tay để bấm điện thoại", correctId: "kiki" },
          { prompt: "Học sinh Mỹ cần gia sư AI on-demand 24/7", correctId: "got" },
        ]}
      />

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" />
        Bí mật của thầy Hải: Tất cả startup AI Việt thành công đều giải quyết một <b>vấn đề rất Việt Nam</b> (tiếng Việt, văn hoá, quy trình SME). Đừng cố làm "ChatGPT phiên bản VN" - hãy tìm vấn đề ChatGPT KHÔNG giải được.
      </p>

      <BonusGames tfItems={SU_TF} matchPairs={SU_PAIRS} accent="from-orange-500 to-rose-600" border="border-orange-400/40" />
    </div>
  );
};

export default StartupVNSandbox;
