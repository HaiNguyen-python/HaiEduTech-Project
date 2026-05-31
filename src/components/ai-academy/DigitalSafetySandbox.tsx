/**
 * DigitalSafetySandbox - Real-life scam scenarios with deepfake voice / AI
 * chatbots targeting Vietnamese teens. Student picks the safe response.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

type Scenario = {
  title: string;
  body: string;
  options: { text: string; safe: boolean; why: string }[];
};
const SCENARIOS: Scenario[] = [
  {
    title: "📞 Cuộc gọi giả giọng mẹ",
    body: "Em nhận cuộc gọi từ số lạ, giọng giống hệt mẹ: 'Mẹ bị tai nạn cần 5 triệu chuyển ngay vào số 0987...'.",
    options: [
      { text: "Chuyển tiền ngay vì sợ mẹ nguy hiểm", safe: false, why: "Đây là lừa đảo deepfake voice phổ biến 2024–2025. KHÔNG bao giờ chuyển tiền vì giọng nói." },
      { text: "Cúp máy, gọi lại số gốc của mẹ để xác minh", safe: true, why: "Đúng! Luôn xác minh qua kênh thứ 2 (số cũ, gọi bố, gọi anh chị)." },
      { text: "Nhắn Zalo cho bạn thân hỏi ý kiến", safe: false, why: "Không sai nhưng chậm. Bước đầu phải xác minh trực tiếp với người thân." },
    ],
  },
  {
    title: "📸 Deepfake ảnh bạn cùng lớp",
    body: "Em thấy trên TikTok có video chế ảnh bạn lớp em làm việc xấu hổ. Bạn ấy đang khóc.",
    options: [
      { text: "Chia sẻ lại để 'vạch trần' kẻ làm fake", safe: false, why: "Chia sẻ = lan truyền nội dung gây hại. Đó là vi phạm pháp luật & đạo đức." },
      { text: "Báo TikTok report video, báo thầy cô, an ủi bạn", safe: true, why: "Đúng! Report + hỗ trợ nạn nhân. Người lớn sẽ giúp xử lý theo luật." },
      { text: "Bình luận chửi kẻ tạo fake", safe: false, why: "Không giải quyết được gì, lại làm bạn thêm tổn thương vì video còn tồn tại." },
    ],
  },
  {
    title: "🤖 Chatbot AI rủ rê trên Messenger",
    body: "Một tài khoản lạ chat: 'Anh là AI Tutor, gửi anh số điện thoại + ảnh chứng minh để anh giúp em học miễn phí.'",
    options: [
      { text: "Gửi vì học miễn phí thì quá tốt", safe: false, why: "Sai! Không bao giờ gửi CMND/ảnh thẻ cho người lạ - dù là 'AI tutor' xịn cũng không cần." },
      { text: "Chặn, báo cáo tài khoản, không trả lời", safe: true, why: "Đúng! Yêu cầu giấy tờ cá nhân = dấu hiệu lừa đảo / dụ dỗ trẻ em." },
      { text: "Hỏi thêm thông tin trước khi quyết định", safe: false, why: "Càng nói chuyện càng dễ bị thao túng. Cắt liên lạc ngay." },
    ],
  },
];

const TF = [
  { q: "AI có thể tạo giọng nói giả y hệt người thật chỉ từ 3 giây ghi âm.", a: true },
  { q: "Luôn xác minh bằng kênh thứ 2 trước khi chuyển tiền theo yêu cầu qua điện thoại.", a: true },
  { q: "Chia sẻ lại deepfake để 'vạch trần' là việc tốt.", a: false, why: "Sai! Chia sẻ = lan truyền nội dung gây hại cho nạn nhân." },
  { q: "Không bao giờ gửi CMND/CCCD/ảnh thẻ cho người lạ qua mạng.", a: true },
];
const PAIRS = [
  { a: "Deepfake voice", b: "Giọng AI giả y hệt người thật" },
  { a: "Two-channel verify", b: "Xác minh qua kênh thứ 2" },
  { a: "Report", b: "Báo cáo tài khoản xấu cho nền tảng" },
  { a: "Grooming", b: "Người lớn dụ dỗ trẻ qua mạng" },
];

const DigitalSafetySandbox = () => {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const s = SCENARIOS[idx];

  const next = () => {
    setPick(null);
    setIdx((i) => (i + 1) % SCENARIOS.length);
  };

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-rose-400/40 bg-gradient-to-br from-rose-500/10 to-orange-500/10 p-3">
        <h4 className="font-bold text-rose-700 dark:text-rose-300 text-sm flex items-center gap-1 mb-1">
          <Shield className="w-4 h-4" /> Tình huống {idx + 1}/{SCENARIOS.length}: {s.title}
        </h4>
        <p className="text-sm text-foreground italic">"{s.body}"</p>
      </div>

      <div className="space-y-2">
        {s.options.map((o, i) => {
          const picked = pick === i;
          return (
            <motion.button
              key={i}
              onClick={() => setPick(i)}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 rounded-xl border-2 transition ${
                picked
                  ? o.safe
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-rose-500 bg-rose-500/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-2">
                {picked && (o.safe ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5" />)}
                <span className="text-sm">{o.text}</span>
              </div>
              {picked && (
                <p className={`text-xs mt-2 ${o.safe ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                  {o.why}
                </p>
              )}
            </motion.button>
          );
        })}
      </div>

      {pick !== null && (
        <Button onClick={next} className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white">
          Tình huống tiếp theo →
        </Button>
      )}

      <ChipFilter
        title="🛡️ Bật các thói quen an toàn"
        hint="Mỗi thói quen bật lên sẽ cộng điểm An toàn số của bạn."
        baseline={20}
        positive
        goal={80}
        goodLabel="Bạn đã đủ trang bị chống lừa đảo AI ✅"
        badLabel="Bật thêm vài thói quen nữa nhé"
        metricLabel="Điểm An toàn"
        accent="from-rose-500 to-orange-600"
        border="border-rose-400/40"
        options={[
          { id: "1", label: "🔒 Bật xác thực 2 lớp (2FA) cho Zalo/Facebook", weight: 18 },
          { id: "2", label: "📞 Luôn gọi lại số gốc khi nghe 'người thân cần tiền'", weight: 20 },
          { id: "3", label: "🚫 Không đăng ảnh chân dung HD công khai", weight: 14 },
          { id: "4", label: "🆔 Không gửi CMND/CCCD qua chat", weight: 18 },
          { id: "5", label: "🚨 Report tài khoản đáng nghi cho TikTok/FB", weight: 12 },
          { id: "6", label: "🗣️ Báo bố mẹ/thầy cô khi gặp deepfake", weight: 14 },
        ]}
      />

      <BestMatchPick
        title="📨 Phân loại tin nhắn đáng nghi"
        hint="Mỗi tin nhắn dưới đây nên xếp vào nhóm nào?"
        accent="from-rose-500 to-orange-600"
        border="border-rose-400/40"
        options={[
          { id: "safe", label: "✅ An toàn" },
          { id: "doubt", label: "⚠️ Nghi ngờ" },
          { id: "scam", label: "🚨 Lừa đảo" },
        ]}
        items={[
          { prompt: "'Mẹ đây, mẹ bị tai nạn, chuyển gấp 5 triệu' (số lạ)", correctId: "scam" },
          { prompt: "'Em trúng học bổng 200tr, gửi CMND để nhận'", correctId: "scam" },
          { prompt: "'Anh là AI tutor, gửi ảnh thẻ để học miễn phí'", correctId: "scam" },
          { prompt: "'Ngày mai 7h con học toán nhé' (số mẹ đã lưu)", correctId: "safe" },
          { prompt: "'Bạn nhận được lời mời kết bạn từ tài khoản lạ ảnh mờ'", correctId: "doubt" },
        ]}
      />

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-rose-500 to-orange-600" border="border-rose-400/40" />
    </div>
  );
};

export default DigitalSafetySandbox;
