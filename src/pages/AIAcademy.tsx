/**
 * AI Academy — gamified AI hub for Vietnamese middle & high school students.
 * 3 visual tracks: Computer Vision, NLP, Neural Networks. Each has a
 * story-driven concept panel + interactive sandbox + drag-drop quiz.
 * Progress + reward badges persist in localStorage; track completions also
 * log to Supabase student_activity_log when the user is signed in.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, MessageSquare, Brain, Sparkles, Trophy, Star, ArrowLeft, Lock,
  Zap, Award, Rocket, CheckCircle2, Wand2, Car, Scale, Database, Radio, Cpu,
  ShieldAlert, Bot, GraduationCap, Lightbulb, BookOpen, Briefcase, Home, ExternalLink, AlertTriangle, MapPin, ChevronDown,
} from "lucide-react";
import { TRACK_EXTRAS } from "@/data/aiAcademyContent";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeHtml } from "@/lib/utils";
import CVSandbox from "@/components/ai-academy/ComputerVisionSandbox";
import NLPSandbox from "@/components/ai-academy/NLPSandbox";
import NeuralNetSandbox from "@/components/ai-academy/NeuralNetSandbox";
import GenAISandbox from "@/components/ai-academy/GenAISandbox";
import RLSandbox from "@/components/ai-academy/RLSandbox";
import EthicsSandbox from "@/components/ai-academy/EthicsSandbox";
import RecsysSandbox from "@/components/ai-academy/RecsysSandbox";
import AIoTSandbox from "@/components/ai-academy/AIoTSandbox";
import CapstoneSandbox from "@/components/ai-academy/CapstoneSandbox";
import DragDropQuiz, { type DDQuestion } from "@/components/ai-academy/DragDropQuiz";
import MultipleChoiceQuiz from "@/components/ai-academy/MultipleChoiceQuiz";
import ScenarioQuiz from "@/components/ai-academy/ScenarioQuiz";
import { QUIZ_EXTRAS } from "@/data/aiAcademyQuizExtras";
import DeepfakeSandbox from "@/components/ai-academy/DeepfakeSandbox";
import AgentWorkflowSandbox from "@/components/ai-academy/AgentWorkflowSandbox";
import GraduationSandbox from "@/components/ai-academy/GraduationSandbox";
import DataDetectiveSandbox from "@/components/ai-academy/DataDetectiveSandbox";
import MLMagicSandbox from "@/components/ai-academy/MLMagicSandbox";

// Lesson illustrations (kid-friendly AI cartoons)
import illVision from "@/assets/ai-academy/vision.jpg";
import illNlp from "@/assets/ai-academy/nlp.jpg";
import illNn from "@/assets/ai-academy/nn.jpg";
import illGenai from "@/assets/ai-academy/genai.jpg";
import illRl from "@/assets/ai-academy/rl.jpg";
import illEthics from "@/assets/ai-academy/ethics.jpg";
import illRecsys from "@/assets/ai-academy/recsys.jpg";
import illAiot from "@/assets/ai-academy/aiot.jpg";
import illCapstone from "@/assets/ai-academy/capstone.jpg";
import illDeepfake from "@/assets/ai-academy/deepfake.jpg";
import illAgent from "@/assets/ai-academy/agent.jpg";
import illStudy from "@/assets/ai-academy/study.jpg";
import illCareers from "@/assets/ai-academy/careers.jpg";
import illFactcheck from "@/assets/ai-academy/factcheck.jpg";
import illSafety from "@/assets/ai-academy/safety.jpg";
import illGraduation from "@/assets/ai-academy/graduation.jpg";
import illDataDet from "@/assets/ai-academy/data-detective.jpg";
import illMLMagic from "@/assets/ai-academy/ml-magic.jpg";

const TRACK_ILLUSTRATIONS: Record<string, string> = {
  vision: illVision,
  nlp: illNlp,
  nn: illNn,
  genai: illGenai,
  rl: illRl,
  ethics: illEthics,
  recsys: illRecsys,
  aiot: illAiot,
  capstone: illCapstone,
  deepfake: illDeepfake,
  agent: illAgent,
  study: illStudy,
  careers: illCareers,
  factcheck: illFactcheck,
  safety: illSafety,
  graduation: illGraduation,
  datadet: illDataDet,
  mlmagic: illMLMagic,
};

import FloatingAIIcons from "@/components/ai-academy/FloatingAIIcons";
import FloatingChibi from "@/components/FloatingChibi";
import chibiRobotHero from "@/assets/ai-chibi-robot.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiRocket from "@/assets/chibi-rocket.png";
import GraduationCertificate from "@/components/ai-academy/GraduationCertificate";
import XPStreakHUD from "@/components/ai-academy/XPStreakHUD";
import { useAIAcademyXP } from "@/hooks/useAIAcademyXP";

import AutoTranslateBoundary from "@/components/ai-academy/AutoTranslateBoundary";
import StudySmartSandbox from "@/components/ai-academy/StudySmartSandbox";
import CareersMapSandbox from "@/components/ai-academy/CareersMapSandbox";
import FactCheckSandbox from "@/components/ai-academy/FactCheckSandbox";
import DigitalSafetySandbox from "@/components/ai-academy/DigitalSafetySandbox";
import MathAISandbox from "@/components/ai-academy/MathAISandbox";
import PromptLabSandbox from "@/components/ai-academy/PromptLabSandbox";
import StartupVNSandbox from "@/components/ai-academy/StartupVNSandbox";
import heroBg from "@/assets/ai-academy-hero-bg.jpg";
import chibiRobot from "@/assets/ai-chibi-robot.png";

/**
 * SmartText — renders long Vietnamese paragraphs as bullet points
 * when 3+ sentences are detected, otherwise as a single paragraph.
 * Strips inline HTML to keep things safe (only used for plain text fields).
 */
const SmartText = ({ text, className = "", html = false }: { text: string; className?: string; html?: boolean }) => {
  // Protect common Vietnamese/English abbreviations from being split mid-sentence.
  const ABBR = ["TP.", "GS.", "TS.", "PGS.", "Th.S", "Ths.", "Ph.D", "Mr.", "Mrs.", "Ms.", "St.", "vs.", "Dr.", "ĐH."];
  const PLACEHOLDER = "\u0001";
  let safe = text;
  ABBR.forEach((a) => { safe = safe.split(a).join(a.replace(/\./g, PLACEHOLDER)); });
  // Also protect numbered list markers like "1.", "2.", "10." so they don't trigger a split.
  safe = safe.replace(/(\b\d{1,2})\.(?=\s)/g, `$1${PLACEHOLDER}`);

  // Only split on real sentence boundaries (. ! ?). Em-dash " — " is parenthetical
  // and must NOT split — keeping it intact preserves the original meaning.
  const rough = safe
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(new RegExp(PLACEHOLDER, "g"), ".").trim())
    .filter(Boolean);


  // Bulletize only when there are 3+ real sentences, OR 2 sentences and text is long.
  const shouldBullet = rough.length >= 3 || (rough.length >= 2 && text.length > 180);
  if (shouldBullet) {
    return (
      <ul className={`space-y-1.5 list-none ${className}`}>
        {rough.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary mt-0.5 shrink-0">▸</span>
            {html ? (
              <span className="flex-1" dangerouslySetInnerHTML={sanitizeHtml(p)} />
            ) : (
              <span className="flex-1">{p}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return html ? (
    <p className={className} dangerouslySetInnerHTML={sanitizeHtml(text)} />
  ) : (
    <p className={className}>{text}</p>
  );
};

type TrackId = "vision" | "nlp" | "nn" | "datadet" | "mlmagic" | "genai" | "rl" | "ethics" | "recsys" | "aiot" | "capstone" | "deepfake" | "agent" | "study" | "careers" | "factcheck" | "safety" | "mathai" | "promptlab" | "startup" | "graduation";

type Track = {
  id: TrackId;
  emoji: string;
  Icon: typeof Eye;
  title: string;
  tag: string;
  desc: string;
  gradient: string;
  ring: string;
  badge: { name: string; emoji: string };
  story: { heading: string; body: string }[];
  Sandbox: React.FC;
  quiz: DDQuestion[];
};

const TRACKS: Track[] = [
  {
    id: "vision",
    emoji: "👁️",
    Icon: Eye,
    title: "Thị giác máy tính",
    tag: "Siêu thám tử AI",
    desc: "Học cách AI nhận diện khuôn mặt, đồ vật, biểu cảm — như FaceID điểm danh học sinh.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    ring: "ring-cyan-400/50",
    badge: { name: "AI Explorer", emoji: "🔍" },
    story: [
      {
        heading: "📸 AI nhìn bằng cách nào?",
        body: "Ảnh trong máy tính là một bảng số khổng lồ — mỗi điểm ảnh có 3 con số (đỏ, xanh lá, xanh dương). AI học cách 'đọc' bảng số đó để biết đâu là khuôn mặt, đâu là quả bóng.",
      },
      {
        heading: "🧪 Bounding Box là gì?",
        body: "Khi camera điểm danh chạy, AI vẽ một khung vuông quanh khuôn mặt và ghi nhãn 'Lan – 98%'. Khung vuông đó gọi là bounding box, 98% là độ tự tin (confidence).",
      },
      {
        heading: "🎯 Ứng dụng đời thực",
        body: "FaceID iPhone, camera giao thông đọc biển số, ứng dụng lọc ảnh TikTok, xe tự lái Tesla — tất cả đều dùng Computer Vision.",
      },
    ],
    Sandbox: CVSandbox,
    quiz: [
      {
        prompt: "Kéo từng thứ vào đúng hộp: cái nào là 'Đầu vào', cái nào là 'Đầu ra' của AI Vision?",
        items: [
          { id: "i1", label: "Ảnh khuôn mặt 📷", bucket: "in" },
          { id: "i2", label: "Video camera 🎥", bucket: "in" },
          { id: "i3", label: "Bounding box + nhãn 🏷️", bucket: "out" },
          { id: "i4", label: "Confidence 95% ✅", bucket: "out" },
        ],
        buckets: [
          { id: "in", label: "Đầu vào (Input)" },
          { id: "out", label: "Đầu ra (Output)" },
        ],
      },
      {
        prompt: "Phân loại: cái nào là Computer Vision, cái nào KHÔNG phải?",
        items: [
          { id: "a", label: "FaceID iPhone", bucket: "cv" },
          { id: "b", label: "Đọc biển số xe", bucket: "cv" },
          { id: "c", label: "Dịch tiếng Anh ↔ Việt", bucket: "no" },
          { id: "d", label: "Gợi ý nhạc Spotify", bucket: "no" },
        ],
        buckets: [
          { id: "cv", label: "Computer Vision" },
          { id: "no", label: "Không phải" },
        ],
      },
      {
        prompt: "Quy trình train model: bước nào trước, bước nào sau?",
        items: [
          { id: "1", label: "Thu thập 10.000 ảnh 📦", bucket: "first" },
          { id: "2", label: "Gắn nhãn ảnh (mèo/chó) ✏️", bucket: "first" },
          { id: "3", label: "Cho AI dự đoán ảnh mới 🚀", bucket: "after" },
        ],
        buckets: [
          { id: "first", label: "Trước (Training)" },
          { id: "after", label: "Sau (Predicting)" },
        ],
      },
    ],
  },
  {
    id: "nlp",
    emoji: "💬",
    Icon: MessageSquare,
    title: "Xử lý ngôn ngữ",
    tag: "Chatbot thông minh",
    desc: "Khám phá cách AI hiểu tiếng Việt, teen-code, dịch máy và phân tích cảm xúc.",
    gradient: "from-fuchsia-400 via-purple-500 to-indigo-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "Data Wizard", emoji: "🪄" },
    story: [
      {
        heading: "🔤 Máy không hiểu chữ — nó hiểu số",
        body: "Khi bạn gõ 'xin chào', AI biến nó thành dãy số (tokens). Mỗi từ có một mã ID riêng. Đây gọi là tokenization.",
      },
      {
        heading: "🎯 Intent Classification",
        body: "Chatbot Messenger của shop không 'đọc hiểu' như con người — nó đoán <b>ý định</b> của bạn: bạn đang hỏi giá? hỏi giờ mở cửa? hay phàn nàn? Mỗi ý định = 1 intent.",
      },
      {
        heading: "🇻🇳 Bài toán teen-code",
        body: "Học sinh hay viết 'k bít', 'iu qá', 'lm bt zùm vs'. AI tiếng Việt phải <b>chuẩn hoá</b> những từ này về dạng chuẩn ('không biết', 'yêu quá', 'làm bài tập giùm với') trước khi xử lý.",
      },
    ],
    Sandbox: NLPSandbox,
    quiz: [
      {
        prompt: "Sắp xếp: ví dụ nào là intent 'Chào hỏi', ví dụ nào là 'Hỏi giá'?",
        items: [
          { id: "a", label: "Xin chào shop", bucket: "greet" },
          { id: "b", label: "Hello bạn ơi", bucket: "greet" },
          { id: "c", label: "Áo này bao nhiêu tiền?", bucket: "price" },
          { id: "d", label: "Giá sỉ sao shop?", bucket: "price" },
        ],
        buckets: [
          { id: "greet", label: "Chào hỏi 👋" },
          { id: "price", label: "Hỏi giá 💰" },
        ],
      },
      {
        prompt: "Teen-code → Tiếng Việt chuẩn: cái nào ghép đúng?",
        items: [
          { id: "1", label: "'k bít' → 'không biết'", bucket: "ok" },
          { id: "2", label: "'iu qá' → 'yêu quá'", bucket: "ok" },
          { id: "3", label: "'xin chào' → 'tạm biệt'", bucket: "no" },
          { id: "4", label: "'cảm ơn' → 'xin lỗi'", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Chuẩn hoá đúng ✅" },
          { id: "no", label: "Sai ❌" },
        ],
      },
      {
        prompt: "Phân loại cảm xúc câu sau (Sentiment Analysis):",
        items: [
          { id: "a", label: "Phim hay quá trời luôn! 😍", bucket: "pos" },
          { id: "b", label: "Tuyệt vời, mê lắm 💖", bucket: "pos" },
          { id: "c", label: "Chán òm, phí thời gian 😡", bucket: "neg" },
          { id: "d", label: "Dở tệ, không xem nổi", bucket: "neg" },
        ],
        buckets: [
          { id: "pos", label: "Tích cực 😊" },
          { id: "neg", label: "Tiêu cực 😞" },
        ],
      },
    ],
  },
  {
    id: "nn",
    emoji: "🧠",
    Icon: Brain,
    title: "Mạng thần kinh nhân tạo",
    tag: "Não bộ của AI",
    desc: "Sân chơi trực quan: chỉnh giờ học, giờ ngủ — xem AI dự đoán điểm thi của bạn.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    ring: "ring-emerald-400/50",
    badge: { name: "Neural Architect", emoji: "🧬" },
    story: [
      {
        heading: "🔌 Neuron — viên gạch của AI",
        body: "Não người có ~86 tỷ neuron. AI mô phỏng từng neuron là <b>một bộ lọc quyết định</b>: nhận tín hiệu vào → nhân với trọng số → đưa ra tín hiệu mới.",
      },
      {
        heading: "⚖️ Trọng số (Weights)",
        body: "Mỗi đường nối giữa 2 neuron có một con số = trọng số. AI 'học' = AI điều chỉnh hàng triệu trọng số đó cho đến khi dự đoán đúng.",
      },
      {
        heading: "🎨 Generative AI",
        body: "ChatGPT, Midjourney cũng là mạng neuron — nhưng cực lớn (hàng trăm tỷ trọng số). Chúng học từ Internet rồi <b>tạo ra</b> chữ và ảnh mới chưa từng tồn tại.",
      },
    ],
    Sandbox: NeuralNetSandbox,
    quiz: [
      {
        prompt: "Mỗi neuron trong AI làm gì?",
        items: [
          { id: "a", label: "Nhận input × trọng số", bucket: "yes" },
          { id: "b", label: "Đưa ra output mới", bucket: "yes" },
          { id: "c", label: "Tự nó nghĩ ra ý tưởng", bucket: "no" },
          { id: "d", label: "Cảm xúc như con người", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng ✅" },
          { id: "no", label: "Sai ❌" },
        ],
      },
      {
        prompt: "Phân loại các AI sau:",
        items: [
          { id: "a", label: "ChatGPT (sinh văn bản)", bucket: "gen" },
          { id: "b", label: "Midjourney (sinh tranh)", bucket: "gen" },
          { id: "c", label: "Phân loại email spam", bucket: "cls" },
          { id: "d", label: "Nhận diện chữ viết tay", bucket: "cls" },
        ],
        buckets: [
          { id: "gen", label: "Generative (Tạo sinh)" },
          { id: "cls", label: "Classification (Phân loại)" },
        ],
      },
      {
        prompt: "Khi AI dự đoán SAI → nó làm gì để học?",
        items: [
          { id: "1", label: "Điều chỉnh trọng số", bucket: "yes" },
          { id: "2", label: "Lặp lại hàng nghìn lần", bucket: "yes" },
          { id: "3", label: "Khóc và bỏ cuộc 😭", bucket: "no" },
          { id: "4", label: "Gọi điện hỏi thầy", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "AI làm" },
          { id: "no", label: "AI không làm" },
        ],
      },
    ],
  },
  {
    id: "datadet",
    emoji: "🕵️",
    Icon: Database,
    title: "Thám tử dữ liệu",
    tag: "AI ăn gì để thông minh?",
    desc: "Khám phá cách dữ liệu nuôi AI: dữ liệu sạch vs bẩn, có cấu trúc vs phi cấu trúc, và bias.",
    gradient: "from-blue-400 via-sky-500 to-indigo-600",
    ring: "ring-sky-400/50",
    badge: { name: "Data Detective", emoji: "🔎" },
    story: [
      {
        heading: "🍳 AI là đầu bếp, dữ liệu là nguyên liệu",
        body: "Cho AI ăn dữ liệu <b>bẩn</b> (sai, thiếu, lệch) → nó nấu ra món <b>dở</b>. Đó là quy luật <i>Garbage In, Garbage Out</i> — rác vào thì rác ra.",
      },
      {
        heading: "📊 Có cấu trúc vs phi cấu trúc",
        body: "<b>Có cấu trúc</b>: bảng Excel, danh bạ — gọn gàng theo hàng cột. <b>Phi cấu trúc</b>: ảnh selfie, video TikTok, tin nhắn Zalo — 80% dữ liệu thế giới thuộc loại này.",
      },
      {
        heading: "⚖️ Bias — AI cũng có định kiến",
        body: "FaceID Apple lúc mới ra <b>nhận diện kém học sinh châu Á</b> vì train chủ yếu trên ảnh người da trắng. Dữ liệu lệch → AI lệch. Đó là vì sao VinAI phải thu 1 triệu ảnh người Việt.",
      },
    ],
    Sandbox: DataDetectiveSandbox,
    quiz: [
      {
        prompt: "Sắp xếp các loại dữ liệu sau:",
        items: [
          { id: "a", label: "Bảng điểm học sinh 📑", bucket: "struct" },
          { id: "b", label: "File Excel doanh thu", bucket: "struct" },
          { id: "c", label: "Danh bạ điện thoại", bucket: "struct" },
          { id: "d", label: "Ảnh selfie 📷", bucket: "unstruct" },
          { id: "e", label: "Video TikTok 🎵", bucket: "unstruct" },
          { id: "f", label: "Tin nhắn Zalo 💬", bucket: "unstruct" },
        ],
        buckets: [
          { id: "struct", label: "Có cấu trúc 📊" },
          { id: "unstruct", label: "Phi cấu trúc 🎨" },
        ],
      },
      {
        prompt: "Cái nào là 'dữ liệu bẩn' cần làm sạch?",
        items: [
          { id: "1", label: "Tuổi học sinh = -5", bucket: "dirty" },
          { id: "2", label: "Chiều cao = 999 cm", bucket: "dirty" },
          { id: "3", label: "Tên để trống", bucket: "dirty" },
          { id: "4", label: "Điểm Toán = 8.5", bucket: "clean" },
          { id: "5", label: "Tuổi = 14", bucket: "clean" },
        ],
        buckets: [
          { id: "dirty", label: "Cần làm sạch 🧹" },
          { id: "clean", label: "Đã sạch ✅" },
        ],
      },
      {
        prompt: "Vì sao FaceID nhận diện kém học sinh Việt lúc mới ra?",
        items: [
          { id: "a", label: "Vì dữ liệu train lệch về người phương Tây", bucket: "yes" },
          { id: "b", label: "Đó là 'bias' do dữ liệu", bucket: "yes" },
          { id: "c", label: "Vì người Việt có khuôn mặt 'xấu'", bucket: "no" },
          { id: "d", label: "Vì AI ghét học sinh", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng ✅" },
          { id: "no", label: "Sai ❌" },
        ],
      },
    ],
  },
  {
    id: "mlmagic",
    emoji: "🎩",
    Icon: Sparkles,
    title: "Học máy siêu đơn giản",
    tag: "Supervised vs Unsupervised",
    desc: "Hai thuật toán trực quan nhất: Cây quyết định (có thầy giáo) và K-Means (tự khám phá).",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    ring: "ring-violet-400/50",
    badge: { name: "ML Magician", emoji: "🪄" },
    story: [
      {
        heading: "🌳 Cây quyết định = trò '20 câu hỏi'",
        body: "AI chơi 20 câu hỏi Yes/No: 'Có lông không?' → 'Biết bay không?' → <b>Chim!</b>. Đó là <b>Decision Tree</b> — dễ hiểu, dễ giải thích, và rất chính xác cho nhiều bài toán.",
      },
      {
        heading: "🎨 K-Means = AI tự gom nhóm",
        body: "Cho AI 20 chấm rải rác → nó tự gom thành K nhóm gần nhau, <b>không cần ai dạy nhãn</b>. Shopee dùng K-Means để gom khách hàng cùng sở thích, gợi ý sản phẩm.",
      },
      {
        heading: "🎓 Supervised vs Unsupervised",
        body: "<b>Supervised</b> (có giám sát) = data có nhãn, như có thầy giáo chấm điểm. <b>Unsupervised</b> (không giám sát) = data không nhãn, AI tự khám phá quy luật. Đơn giản vậy thôi!",
      },
    ],
    Sandbox: MLMagicSandbox,
    quiz: [
      {
        prompt: "Bài toán nào là Supervised, bài nào Unsupervised?",
        items: [
          { id: "a", label: "Lọc email spam (có nhãn spam/không)", bucket: "sup" },
          { id: "b", label: "Đoán giá nhà (có giá thật)", bucket: "sup" },
          { id: "c", label: "Dịch Anh ↔ Việt (có cặp câu mẫu)", bucket: "sup" },
          { id: "d", label: "Gom khách hàng theo hành vi", bucket: "unsup" },
          { id: "e", label: "Phát hiện giao dịch lạ bất thường", bucket: "unsup" },
          { id: "f", label: "Nhóm bài hát có giai điệu giống", bucket: "unsup" },
        ],
        buckets: [
          { id: "sup", label: "Supervised 👨‍🏫" },
          { id: "unsup", label: "Unsupervised 🔍" },
        ],
      },
      {
        prompt: "Cây quyết định hoạt động thế nào?",
        items: [
          { id: "a", label: "Hỏi 1 chuỗi câu Yes/No", bucket: "yes" },
          { id: "b", label: "Chia data thành các nhánh con", bucket: "yes" },
          { id: "c", label: "Dễ giải thích cho con người", bucket: "yes" },
          { id: "d", label: "Cần GPU siêu mạnh để chạy", bucket: "no" },
          { id: "e", label: "Chỉ làm được với ảnh", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng ✅" },
          { id: "no", label: "Sai ❌" },
        ],
      },
      {
        prompt: "K trong K-Means là gì?",
        items: [
          { id: "1", label: "Số nhóm (cluster) muốn chia", bucket: "yes" },
          { id: "2", label: "Một siêu tham số do người chọn", bucket: "yes" },
          { id: "3", label: "Tên một ngôn ngữ lập trình", bucket: "no" },
          { id: "4", label: "Tốc độ chạy của AI", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng ✅" },
          { id: "no", label: "Sai ❌" },
        ],
      },
    ],
  },
  {
    id: "genai",
    emoji: "✨",
    Icon: Wand2,
    title: "Trí tuệ nhân tạo tạo sinh",
    tag: "Thế giới sáng tạo",
    desc: "Khám phá cách AI tự viết văn, vẽ tranh từ những câu lệnh (Prompt) và thử tài làm một Prompt Master.",
    gradient: "from-pink-400 via-fuchsia-500 to-purple-600",
    ring: "ring-pink-400/50",
    badge: { name: "Prompt Master", emoji: "🪄" },
    story: [
      {
        heading: "🎨 Generative AI là gì?",
        body: "Khác với AI 'phân loại' (đoán mèo/chó), AI <b>tạo sinh</b> sản xuất ra nội dung MỚI: hình ảnh, văn bản, nhạc, video — chưa từng tồn tại trên Internet.",
      },
      {
        heading: "📝 Prompt — câu thần chú",
        body: "Bạn ra lệnh cho AI bằng <b>prompt</b>. Prompt càng cụ thể (chủ thể + phong cách + ánh sáng + cảm xúc) → kết quả càng đẹp. Đó là vì sao công ty trả lương $200k cho 'Prompt Engineer'.",
      },
      {
        heading: "⚖️ Hallucination — AI bịa",
        body: "Generative AI đôi khi bịa thông tin trông rất 'thật' (gọi là hallucination). Vì vậy hãy luôn <b>kiểm chứng</b> trước khi tin ChatGPT trả lời bài tập!",
      },
    ],
    Sandbox: GenAISandbox,
    quiz: [
      {
        prompt: "AI nào là Generative, AI nào KHÔNG phải?",
        items: [
          { id: "a", label: "ChatGPT viết bài văn", bucket: "gen" },
          { id: "b", label: "Midjourney vẽ tranh", bucket: "gen" },
          { id: "c", label: "Suno tạo bài hát", bucket: "gen" },
          { id: "d", label: "Camera nhận diện biển số", bucket: "no" },
          { id: "e", label: "Lọc email spam", bucket: "no" },
        ],
        buckets: [
          { id: "gen", label: "Tạo sinh ✨" },
          { id: "no", label: "Không phải" },
        ],
      },
      {
        prompt: "Prompt nào tốt hơn? Sắp xếp thành 'rõ ràng' vs 'mơ hồ':",
        items: [
          { id: "1", label: "'vẽ con mèo'", bucket: "bad" },
          { id: "2", label: "'cái gì đó đẹp đẹp'", bucket: "bad" },
          { id: "3", label: "'mèo cam ngồi cửa sổ Hà Nội, hoàng hôn, watercolor'", bucket: "good" },
          { id: "4", label: "'robot kim loại bạc, sci-fi neon, góc nghiêng, 4K'", bucket: "good" },
        ],
        buckets: [
          { id: "good", label: "Rõ ràng ✅" },
          { id: "bad", label: "Mơ hồ ❌" },
        ],
      },
      {
        prompt: "ChatGPT trả lời sai một cách tự tin — đó là gì?",
        items: [
          { id: "a", label: "Hallucination 🤖", bucket: "yes" },
          { id: "b", label: "AI bịa thông tin", bucket: "yes" },
          { id: "c", label: "AI suy nghĩ như người", bucket: "no" },
          { id: "d", label: "AI có ý thức tự tin", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng bản chất" },
          { id: "no", label: "Hiểu sai" },
        ],
      },
    ],
  },
  {
    id: "rl",
    emoji: "🎮",
    Icon: Car,
    title: "Học tăng cường",
    tag: "Tự học để trưởng thành",
    desc: "Học cách AI tự tối ưu hóa hành vi qua cơ chế Thưởng – Phạt để điều khiển xe tự lái vượt chướng ngại vật.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    ring: "ring-emerald-400/50",
    badge: { name: "RL Strategist", emoji: "🧭" },
    story: [
      {
        heading: "🎯 Reinforcement Learning là gì?",
        body: "Khác với học có giám sát (cho ảnh + nhãn), RL <b>không có nhãn</b>. Agent <b>thử – sai – nhận điểm</b>: làm đúng được thưởng, làm sai bị phạt. Lặp hàng triệu lần → tự khám phá chiến lược tối ưu.",
      },
      {
        heading: "🏎️ Xe tự lái Tesla & Waymo",
        body: "Mỗi mét đi đúng làn = +điểm, mỗi va chạm = -điểm cực lớn. Sau hàng tỷ km mô phỏng, AI tự học cách <b>né người, dừng đèn đỏ, đỗ xe</b> mà không cần ai dạy từng bước.",
      },
      {
        heading: "♟️ AlphaGo & DeepMind",
        body: "Google DeepMind dùng RL để dạy AI chơi cờ vây — và đánh bại nhà vô địch thế giới Lee Sedol năm 2016. AI không học từ sách, nó <b>tự chơi với chính nó</b> hàng triệu ván.",
      },
    ],
    Sandbox: RLSandbox,
    quiz: [
      {
        prompt: "Cái gì là tín hiệu HỌC chính của Reinforcement Learning?",
        items: [
          { id: "a", label: "Thưởng (+điểm) khi đúng", bucket: "yes" },
          { id: "b", label: "Phạt (-điểm) khi sai", bucket: "yes" },
          { id: "c", label: "Nhãn chính xác từng bước", bucket: "no" },
          { id: "d", label: "Ai đó nói 'đúng/sai' liên tục", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Tín hiệu RL ✅" },
          { id: "no", label: "Không phải RL" },
        ],
      },
      {
        prompt: "Ứng dụng nào dùng Reinforcement Learning?",
        items: [
          { id: "1", label: "Xe tự lái Tesla 🚗", bucket: "rl" },
          { id: "2", label: "AlphaGo chơi cờ vây ♟️", bucket: "rl" },
          { id: "3", label: "Robot hút bụi tự sạc 🤖", bucket: "rl" },
          { id: "4", label: "Máy tính bỏ túi 🧮", bucket: "no" },
          { id: "5", label: "Trang web tĩnh HTML 📄", bucket: "no" },
        ],
        buckets: [
          { id: "rl", label: "Có dùng RL" },
          { id: "no", label: "Không cần RL" },
        ],
      },
      {
        prompt: "Nếu phạt va chạm CAO hơn thưởng đi nhanh — agent sẽ làm gì?",
        items: [
          { id: "a", label: "Đi chậm, né chướng ngại", bucket: "ok" },
          { id: "b", label: "Ưu tiên an toàn", bucket: "ok" },
          { id: "c", label: "Đâm thẳng vào mọi thứ", bucket: "no" },
          { id: "d", label: "Bỏ cuộc đứng yên mãi", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Hành vi đúng ✅" },
          { id: "no", label: "Sai logic ❌" },
        ],
      },
    ],
  },
  {
    id: "ethics",
    emoji: "⚖️",
    Icon: Scale,
    title: "Đạo đức & An toàn AI",
    tag: "Trợ lý công bằng",
    desc: "Trở thành hộ vệ công nghệ: Lọc dữ liệu, loại bỏ thiên vị (Bias) để giữ cho AI luôn khách quan và an toàn.",
    gradient: "from-purple-400 via-fuchsia-500 to-violet-600",
    ring: "ring-purple-400/50",
    badge: { name: "Ethics Guardian", emoji: "🛡️" },
    story: [
      {
        heading: "🔬 AI học từ dữ liệu",
        body: "AI <b>không có ý thức</b>. Nó chỉ tìm quy luật trong dữ liệu. Nếu dữ liệu lệch, AI sẽ lệch theo — đó gọi là <b>Bias</b> (thiên vị).",
      },
      {
        heading: "📰 Bài học Amazon 2018",
        body: "Amazon từng dùng AI lọc CV. Vì 10 năm trước hầu hết kỹ sư là nam, AI 'học' rằng nữ = ít phù hợp → tự động loại CV có chữ 'women's chess club'. Amazon đã phải tắt hệ thống đó.",
      },
      {
        heading: "🛡️ Sửa lỗi bằng cách nào?",
        body: "1) Thu thập dữ liệu <b>đa dạng</b> (giới, vùng miền, độ tuổi). 2) Đo lường công bằng (fairness metrics). 3) Có người <b>giám sát</b>. Đây là việc của AI Ethics Engineer.",
      },
    ],
    Sandbox: EthicsSandbox,
    quiz: [
      {
        prompt: "Nguyên nhân AI thiên vị là gì?",
        items: [
          { id: "a", label: "Dữ liệu huấn luyện lệch", bucket: "yes" },
          { id: "b", label: "Thiếu đa dạng người dán nhãn", bucket: "yes" },
          { id: "c", label: "Mục tiêu tối ưu sai", bucket: "yes" },
          { id: "d", label: "AI ghét một nhóm người", bucket: "no" },
          { id: "e", label: "AI có cảm xúc cá nhân", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng nguyên nhân" },
          { id: "no", label: "Hiểu sai về AI" },
        ],
      },
      {
        prompt: "Tình huống nào là AI thiên vị?",
        items: [
          { id: "1", label: "AI tuyển dụng loại CV nữ", bucket: "bias" },
          { id: "2", label: "AI nhận diện da màu kém hơn da trắng", bucket: "bias" },
          { id: "3", label: "AI gợi ý sách dựa trên lịch sử đọc", bucket: "ok" },
          { id: "4", label: "AI dịch tiếng Anh sang tiếng Việt", bucket: "ok" },
        ],
        buckets: [
          { id: "bias", label: "Có thiên vị ⚠️" },
          { id: "ok", label: "Bình thường" },
        ],
      },
      {
        prompt: "Cách giảm bias trong AI?",
        items: [
          { id: "a", label: "Dữ liệu đa dạng", bucket: "yes" },
          { id: "b", label: "Người giám sát kết quả", bucket: "yes" },
          { id: "c", label: "Đo fairness định kỳ", bucket: "yes" },
          { id: "d", label: "Để AI tự quyết hết", bucket: "no" },
          { id: "e", label: "Giấu lỗi đi", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Đúng cách ✅" },
          { id: "no", label: "Sai cách ❌" },
        ],
      },
    ],
  },
  {
    id: "recsys",
    emoji: "📊",
    Icon: Database,
    title: "Phân tích & Gợi ý dữ liệu",
    tag: "Kho báu dữ liệu",
    desc: "Khám phá cách thuật toán YouTube, TikTok hiểu sở thích của bạn và thử tài xây dựng một bộ lọc gợi ý nội dung thông minh.",
    gradient: "from-amber-400 via-orange-500 to-yellow-600",
    ring: "ring-amber-400/50",
    badge: { name: "Data Engineer", emoji: "📈" },
    story: [
      {
        heading: "📦 Dữ liệu = Dầu mỏ thế kỷ 21",
        body: "Mỗi giây trên thế giới: 6 triệu tìm kiếm Google, 500 giờ video lên YouTube, 100 triệu story Instagram. Ai biết <b>khai thác</b> dữ liệu đó = vàng.",
      },
      {
        heading: "🎯 Vector sở thích",
        body: "App biểu diễn bạn thành dãy số (vector) cho từng chủ đề: thể thao 0.9, game 0.7, nhạc 0.3... Mỗi video cũng có vector. AI tính <b>cosine similarity</b> để đề xuất.",
      },
      {
        heading: "⚠️ Bong bóng lọc",
        body: "Ngưỡng càng cao → AI chỉ gợi ý nội dung <b>cực kỳ</b> giống bạn → bạn bị nhốt trong 'bong bóng'. Tự chủ động xem nhiều thể loại để mở rộng tầm nhìn!",
      },
    ],
    Sandbox: RecsysSandbox,
    quiz: [
      {
        prompt: "App nào dùng Recommender System mạnh nhất?",
        items: [
          { id: "a", label: "TikTok 🎵", bucket: "yes" },
          { id: "b", label: "Netflix 🎬", bucket: "yes" },
          { id: "c", label: "Shopee Mall 🛍️", bucket: "yes" },
          { id: "d", label: "Máy tính bỏ túi 🧮", bucket: "no" },
          { id: "e", label: "Notepad đơn giản 📝", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Có Recommender" },
          { id: "no", label: "Không cần" },
        ],
      },
      {
        prompt: "Dữ liệu nào AI thu thập để hiểu bạn?",
        items: [
          { id: "1", label: "Lượt xem & thời gian xem", bucket: "use" },
          { id: "2", label: "Lượt like/share/comment", bucket: "use" },
          { id: "3", label: "Bạn theo dõi ai", bucket: "use" },
          { id: "4", label: "Đọc suy nghĩ trong não 🧠", bucket: "no" },
        ],
        buckets: [
          { id: "use", label: "Dữ liệu thật" },
          { id: "no", label: "Không thể" },
        ],
      },
      {
        prompt: "Ngưỡng tương đồng quá cao gây hại vì sao?",
        items: [
          { id: "a", label: "Chỉ thấy 1 quan điểm", bucket: "bad" },
          { id: "b", label: "Khó tiếp cận góc nhìn khác", bucket: "bad" },
          { id: "c", label: "Học được nhiều thứ mới", bucket: "good" },
          { id: "d", label: "Mở rộng tư duy", bucket: "good" },
        ],
        buckets: [
          { id: "bad", label: "Tác hại ⚠️" },
          { id: "good", label: "Lợi ích" },
        ],
      },
    ],
  },
  {
    id: "aiot",
    emoji: "🌐",
    Icon: Radio,
    title: "Vạn vật kết nối trí tuệ nhân tạo",
    tag: "Thành phố tương lai",
    desc: "Kết nối AI với thiết bị ngoại vi để tự động hóa đèn giao thông chống kẹt xe và vận hành mô hình đô thị thông minh.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    ring: "ring-cyan-400/50",
    badge: { name: "AIoT Architect", emoji: "🛰️" },
    story: [
      {
        heading: "📡 IoT là gì?",
        body: "Internet of Things = thiết bị có cảm biến + Internet. Đèn, camera, tủ lạnh, đồng hồ thông minh đều là IoT. Cộng thêm AI → <b>AIoT</b>: thiết bị tự ra quyết định.",
      },
      {
        heading: "🚦 Đèn giao thông thông minh",
        body: "Cảm biến đếm xe ở 4 hướng → vi điều khiển chạy luật <b>If-Else</b> → ưu tiên hướng đông nhất. Singapore giảm 25% thời gian chờ đèn đỏ nhờ AIoT.",
      },
      {
        heading: "🏙️ Smart City",
        body: "Đèn đường tự bật khi có người, thùng rác báo đầy, bãi xe chỉ chỗ trống, trạm bus dự đoán giờ đến — tất cả nhờ AIoT phối hợp hàng triệu thiết bị.",
      },
    ],
    Sandbox: AIoTSandbox,
    quiz: [
      {
        prompt: "Thiết bị nào là IoT?",
        items: [
          { id: "a", label: "Đồng hồ thông minh ⌚", bucket: "iot" },
          { id: "b", label: "Camera an ninh online 📹", bucket: "iot" },
          { id: "c", label: "Tủ lạnh smart 🧊", bucket: "iot" },
          { id: "d", label: "Bàn gỗ thường 🪵", bucket: "no" },
          { id: "e", label: "Cây bút bi 🖊️", bucket: "no" },
        ],
        buckets: [
          { id: "iot", label: "Là IoT" },
          { id: "no", label: "Không phải" },
        ],
      },
      {
        prompt: "Đèn giao thông thông minh hoạt động thế nào?",
        items: [
          { id: "1", label: "Cảm biến đếm xe", bucket: "yes" },
          { id: "2", label: "Vi điều khiển chạy luật If-Else", bucket: "yes" },
          { id: "3", label: "Bật đèn xanh cho hướng đông", bucket: "yes" },
          { id: "4", label: "Cảnh sát đứng bấm tay 👮", bucket: "no" },
          { id: "5", label: "Bốc thăm ngẫu nhiên 🎲", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Cơ chế AIoT" },
          { id: "no", label: "Không phải" },
        ],
      },
      {
        prompt: "Lợi ích của Smart City là gì?",
        items: [
          { id: "a", label: "Giảm kẹt xe", bucket: "good" },
          { id: "b", label: "Tiết kiệm điện đèn đường", bucket: "good" },
          { id: "c", label: "Báo thùng rác đầy kịp thời", bucket: "good" },
          { id: "d", label: "Làm người dân lười đi", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Lợi ích ✅" },
          { id: "bad", label: "Hiểu sai" },
        ],
      },
    ],
  },
  {
    id: "capstone",
    emoji: "🤖",
    Icon: Cpu,
    title: "Tự chế tạo Trợ lý AI",
    tag: "Dự án đầu tay",
    desc: "Trận chiến cuối cùng! Kết hợp các mảnh ghép công nghệ đã học để tự tay lắp ráp và vận hành một siêu Robot trợ lý.",
    gradient: "from-amber-400 via-fuchsia-500 to-purple-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "AI Certified Guru", emoji: "🏆" },
    story: [
      {
        heading: "🧩 Tích hợp là kỹ năng quan trọng nhất",
        body: "Một AI thực dụng không chỉ giỏi 1 thứ. Trợ lý Siri / Google Assistant kết hợp <b>Vision</b> (nhìn QR), <b>NLP</b> (nghe lệnh), <b>Neural Net</b> (suy luận), <b>Ethics</b> (lọc nội dung độc hại).",
      },
      {
        heading: "🔧 Quy trình lắp ráp AI",
        body: "1) Chọn các mô-đun phù hợp · 2) Cắm vào lõi xử lý · 3) Chạy diagnostic boot · 4) Test với dữ liệu thật · 5) Lặp lại cho đến khi ổn định.",
      },
      {
        heading: "🏆 Bạn đã đến cuối hành trình!",
        body: "Hoàn thành Capstone = chính thức là <b>AI Certified Guru</b> của HaiEduTech. Tiếp theo? Đăng ký lớp Lập trình Python với thầy Hải để biến trợ lý này thành code thật!",
      },
    ],
    Sandbox: CapstoneSandbox,
    quiz: [
      {
        prompt: "Trợ lý AI tốt cần kết hợp những công nghệ nào?",
        items: [
          { id: "a", label: "Computer Vision 👁️", bucket: "yes" },
          { id: "b", label: "NLP 💬", bucket: "yes" },
          { id: "c", label: "Neural Network 🧠", bucket: "yes" },
          { id: "d", label: "Ethics & Safety 🛡️", bucket: "yes" },
          { id: "e", label: "May rủi hên xui 🎲", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Cần có" },
          { id: "no", label: "Không cần" },
        ],
      },
      {
        prompt: "Quy trình build sản phẩm AI đúng là?",
        items: [
          { id: "1", label: "Định nghĩa bài toán", bucket: "right" },
          { id: "2", label: "Thu thập dữ liệu", bucket: "right" },
          { id: "3", label: "Huấn luyện & đánh giá", bucket: "right" },
          { id: "4", label: "Code mò không kế hoạch", bucket: "wrong" },
          { id: "5", label: "Bỏ qua test, deploy luôn", bucket: "wrong" },
        ],
        buckets: [
          { id: "right", label: "Đúng quy trình ✅" },
          { id: "wrong", label: "Sai cách ❌" },
        ],
      },
      {
        prompt: "Sau khi tốt nghiệp AI Academy bạn nên làm gì?",
        items: [
          { id: "a", label: "Học Python với thầy Hải", bucket: "good" },
          { id: "b", label: "Tham gia thi AI Olympic", bucket: "good" },
          { id: "c", label: "Tự build dự án nhỏ trên Lovable", bucket: "good" },
          { id: "d", label: "Đóng máy ngủ luôn 😴", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Hành động đúng 🚀" },
          { id: "bad", label: "Đáng tiếc" },
        ],
      },
    ],
  },
  {
    id: "deepfake",
    emoji: "🕵️",
    Icon: ShieldAlert,
    title: "Nhận diện và Bảo mật AI",
    tag: "Thám tử an ninh",
    desc: "Lật tẩy công nghệ Deepfake, học cách phân biệt thật giả và bảo vệ an toàn hình ảnh cá nhân trên không gian mạng.",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    ring: "ring-rose-400/50",
    badge: { name: "Cyber Shield", emoji: "🛡️" },
    story: [
      {
        heading: "🎭 Deepfake là gì?",
        body: "Deepfake dùng <b>Generative AI</b> để ghép mặt người này lên video người khác — gần như không phân biệt bằng mắt thường. Đã xuất hiện video giả CEO, chính trị gia, thậm chí bạn bè vay tiền qua Zalo.",
      },
      {
        heading: "🔬 Dấu vết AI để lại",
        body: "Mép tóc / tai bị mờ, bóng đổ sai hướng, mắt chớp không tự nhiên, răng méo, ánh sáng da không khớp nền. Phần mềm forensic phóng to để soi <b>noise pattern</b> của camera thật.",
      },
      {
        heading: "🛡️ Bảo vệ bản thân",
        body: "1) Không đăng ảnh chân dung HD công khai. 2) Đặt mật khẩu 2FA. 3) Gọi video xác minh khi người thân nhắn vay tiền. 4) Báo cáo deepfake xúc phạm cho Cục An toàn TT.",
      },
    ],
    Sandbox: DeepfakeSandbox,
    quiz: [
      {
        prompt: "Dấu hiệu nào tố cáo một video là Deepfake?",
        items: [
          { id: "a", label: "Mép tóc/tai bị mờ", bucket: "yes" },
          { id: "b", label: "Bóng đổ sai hướng", bucket: "yes" },
          { id: "c", label: "Mắt ít chớp", bucket: "yes" },
          { id: "d", label: "Video quay rõ HD 4K", bucket: "no" },
          { id: "e", label: "Có chữ phụ đề", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Dấu hiệu deepfake ⚠️" },
          { id: "no", label: "Bình thường" },
        ],
      },
      {
        prompt: "Cách bảo vệ ảnh cá nhân khỏi bị lạm dụng?",
        items: [
          { id: "1", label: "Bật 2FA cho mọi tài khoản", bucket: "ok" },
          { id: "2", label: "Hạn chế đăng ảnh HD công khai", bucket: "ok" },
          { id: "3", label: "Gọi video xác minh người vay tiền", bucket: "ok" },
          { id: "4", label: "Chia sẻ CCCD lên Facebook", bucket: "no" },
          { id: "5", label: "Đăng ảnh selfie kèm địa chỉ nhà", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "An toàn ✅" },
          { id: "no", label: "Nguy hiểm ❌" },
        ],
      },
      {
        prompt: "Tình huống nào CÓ THỂ là lừa đảo deepfake?",
        items: [
          { id: "a", label: "Sếp gọi video gấp yêu cầu chuyển khoản", bucket: "scam" },
          { id: "b", label: "Bạn thân video bảo vay tiền nóng", bucket: "scam" },
          { id: "c", label: "Mẹ gọi điện thoại bình thường hỏi thăm", bucket: "ok" },
          { id: "d", label: "Em họ nhắn tin Zalo về sinh nhật", bucket: "ok" },
        ],
        buckets: [
          { id: "scam", label: "Cảnh giác ⚠️" },
          { id: "ok", label: "Bình thường" },
        ],
      },
    ],
  },
  {
    id: "agent",
    emoji: "🤖",
    Icon: Bot,
    title: "Kỹ nghệ câu lệnh & Đặc vụ tự hành",
    tag: "Trợ lý đa năng",
    desc: "Học cách thiết kế các Đặc vụ AI (AI Agent) biết tự động tư duy, đọc tin tức và thay bạn giải quyết chuỗi công việc phức tạp.",
    gradient: "from-indigo-500 via-blue-600 to-violet-600",
    ring: "ring-indigo-400/50",
    badge: { name: "Agent Commander", emoji: "🎖️" },
    story: [
      {
        heading: "🧠 AI Agent là gì?",
        body: "Chatbot chỉ trả lời 1 câu. <b>AI Agent</b> thì có <b>vòng lặp tư duy</b>: nhận mục tiêu → tự lên kế hoạch → gọi công cụ (search, gửi mail, đặt vé) → quan sát kết quả → lặp lại đến khi xong.",
      },
      {
        heading: "🔧 Tool Use",
        body: "Agent của bạn có thể có nhiều 'tay': API thời tiết, gửi SMS, đọc file Excel, vẽ biểu đồ. Bạn chỉ cần ra lệnh: 'Mỗi sáng 6h check thời tiết Hà Nội, nếu mưa thì SMS nhắc mang ô'.",
      },
      {
        heading: "🚀 Prompt Engineering",
        body: "Một prompt tốt cho agent gồm: <b>Vai trò</b> (Bạn là chuyên viên...) + <b>Mục tiêu</b> + <b>Ràng buộc</b> (chỉ tiếng Việt, ≤300 từ) + <b>Format đầu ra</b> (JSON, bảng). Đây là kỹ năng siêu hot 2025.",
      },
    ],
    Sandbox: AgentWorkflowSandbox,
    quiz: [
      {
        prompt: "Khác biệt giữa Chatbot và AI Agent?",
        items: [
          { id: "a", label: "Agent tự lập kế hoạch nhiều bước", bucket: "agent" },
          { id: "b", label: "Agent gọi được tool/API ngoài", bucket: "agent" },
          { id: "c", label: "Agent lặp đến khi đạt mục tiêu", bucket: "agent" },
          { id: "d", label: "Chỉ trả lời 1 câu hỏi đơn lẻ", bucket: "bot" },
          { id: "e", label: "Không truy cập internet được", bucket: "bot" },
        ],
        buckets: [
          { id: "agent", label: "AI Agent 🤖" },
          { id: "bot", label: "Chatbot thường" },
        ],
      },
      {
        prompt: "Thành phần nào của một prompt tốt?",
        items: [
          { id: "1", label: "Vai trò (Bạn là...)", bucket: "good" },
          { id: "2", label: "Mục tiêu rõ ràng", bucket: "good" },
          { id: "3", label: "Ràng buộc & format output", bucket: "good" },
          { id: "4", label: "Viết mơ hồ, ai hiểu sao thì hiểu", bucket: "bad" },
          { id: "5", label: "Không nói AI cần làm gì", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Prompt tốt ✅" },
          { id: "bad", label: "Prompt tệ ❌" },
        ],
      },
      {
        prompt: "Ứng dụng nào hợp lý cho AI Agent?",
        items: [
          { id: "a", label: "Tự lên lịch học theo deadline", bucket: "ok" },
          { id: "b", label: "Tổng hợp tin tức buổi sáng", bucket: "ok" },
          { id: "c", label: "Đặt vé tàu rẻ nhất tuần sau", bucket: "ok" },
          { id: "d", label: "Thay bạn đi học mặt-đối-mặt 🏫", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Agent làm được" },
          { id: "no", label: "Không thay được" },
        ],
      },
    ],
  },
  {
    id: "study", emoji: "🎓", Icon: BookOpen,
    title: "AI & Học tập thông minh", tag: "Học bá thời AI",
    desc: "Dùng ChatGPT, NotebookLM, Gemini đúng cách để học bài, ôn thi — không để AI làm thay.",
    gradient: "from-blue-400 via-sky-500 to-cyan-600", ring: "ring-blue-400/50",
    badge: { name: "Smart Learner", emoji: "📚" },
    story: [
      { heading: "🧠 AI là gia sư, không phải đáp án", body: "AI giỏi giải thích từng bước, gợi ý ví dụ, kiểm tra lập luận. Nếu bạn copy đề bài và bảo 'làm hộ' — bạn mất cơ hội tự suy nghĩ. Hãy hỏi <b>'giải thích cách'</b> thay vì <b>'làm hộ'</b>." },
      { heading: "📚 NotebookLM — gia sư đọc PDF", body: "Upload PDF bài giảng/SGK → AI tạo tóm tắt, flashcard, podcast nghe lúc đi đường. Công cụ mạnh nhất cho ôn THPT QG / IELTS / TOEIC 2025." },
      { heading: "🎯 Quy tắc 3 bước của thầy Hải", body: "<b>1. Tự làm trước</b> — bí mới hỏi AI.  <b>2. Yêu cầu giải thích từng bước</b> — không phải đáp án.  <b>3. Kiểm chứng</b> bằng SGK hoặc hỏi thầy cô." },
    ],
    Sandbox: StudySmartSandbox,
    quiz: [
      { prompt: "Cái nào là cách HỌC THÔNG MINH với AI?",
        items: [
          { id: "a", label: "Yêu cầu AI giải thích từng bước", bucket: "smart" },
          { id: "b", label: "Hỏi AI 'tại sao' sau mỗi đáp án", bucket: "smart" },
          { id: "c", label: "Dùng NotebookLM tóm tắt PDF bài giảng", bucket: "smart" },
          { id: "d", label: "Copy nguyên đề rồi nộp đáp án AI", bucket: "lazy" },
          { id: "e", label: "Tin tuyệt đối, không kiểm chứng", bucket: "lazy" },
        ], buckets: [{ id: "smart", label: "Thông minh ✅" }, { id: "lazy", label: "Lười & nguy hiểm ❌" }] },
    ],
  },
  {
    id: "careers", emoji: "💼", Icon: Briefcase,
    title: "Bản đồ nghề AI tại Việt Nam", tag: "La bàn nghề nghiệp",
    desc: "Khám phá 8 nghề AI hot tại VinAI, FPT.AI, Zalo, Sky Mavis — và lộ trình từ lớp 10 đến job mơ ước.",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600", ring: "ring-violet-400/50",
    badge: { name: "Career Explorer", emoji: "🗺️" },
    story: [
      { heading: "🚀 Việt Nam đang khát nhân lực AI", body: "VinAI, FPT.AI, Zalo AI Lab, VinBigdata tuyển 2000+ kỹ sư AI mỗi năm. Lương từ 25 triệu (junior) đến 100 triệu+ (senior). Cơ hội cho thế hệ Gen Z chưa bao giờ tốt như bây giờ." },
      { heading: "🎨 Không cần code vẫn có nghề AI", body: "Prompt Engineer, AI Product Manager, AI UX Designer, AI Linguist — bốn nghề HOT không đòi hỏi code thành thạo. Phù hợp HS giỏi ngôn ngữ, vẽ, giao tiếp." },
      { heading: "📍 Lộ trình từ lớp 10 → Job", body: "<b>Lớp 10–11:</b> học Toán/Lập trình cơ bản, chơi Teachable Machine.  <b>Lớp 12:</b> ôn IELTS 6.5+, học Python.  <b>ĐH:</b> thi vào FPT/BK/UIT ngành AI, làm dự án mở GitHub.  <b>Năm 3 ĐH:</b> intern VinAI / Zalo." },
    ],
    Sandbox: CareersMapSandbox,
    quiz: [
      { prompt: "Công ty nào dưới đây làm AI tại Việt Nam?",
        items: [
          { id: "a", label: "VinAI Research", bucket: "yes" },
          { id: "b", label: "Zalo AI Lab", bucket: "yes" },
          { id: "c", label: "FPT.AI", bucket: "yes" },
          { id: "d", label: "Sky Mavis (Axie)", bucket: "yes" },
          { id: "e", label: "Tiệm phở Hà Nội", bucket: "no" },
        ], buckets: [{ id: "yes", label: "Công ty AI VN ✅" }, { id: "no", label: "Không phải" }] },
    ],
  },
  {
    id: "factcheck", emoji: "🧠", Icon: AlertTriangle,
    title: "Tư duy phản biện với AI", tag: "Thám tử sự thật",
    desc: "Học cách phát hiện khi ChatGPT bịa (hallucination) — kỹ năng sống còn của Gen Z 2025.",
    gradient: "from-amber-400 via-orange-500 to-rose-600", ring: "ring-amber-400/50",
    badge: { name: "Fact Checker", emoji: "🔍" },
    story: [
      { heading: "🤖 Vì sao AI nói xạo?", body: "LLM dự đoán từ tiếp theo dựa trên xác suất — không kiểm tra sự thật. Khi không biết, nó bịa ra câu nghe hợp lý. Hiện tượng này gọi là <b>hallucination</b>." },
      { heading: "🚩 4 dấu hiệu đáng nghi", body: "1) Con số cực cụ thể (2.347.891 người).  2) Sự kiện lịch sử chi tiết.  3) Trích dẫn 'sách/báo' không tồn tại.  4) Tên người + ngày tháng + thành tựu nghe quá đẹp." },
      { heading: "✅ Quy tắc Cross-Check", body: "Luôn kiểm chứng AI bằng <b>nguồn thứ 2</b>: Wikipedia, SGK, Google Scholar, báo chính thống. Nếu không tìm thấy nguồn → 90% là AI bịa." },
    ],
    Sandbox: FactCheckSandbox,
    quiz: [
      { prompt: "Cái nào là dấu hiệu AI có thể đang bịa?",
        items: [
          { id: "a", label: "Số liệu siêu cụ thể, lạ", bucket: "red" },
          { id: "b", label: "Trích dẫn 'cuốn sách' không tìm được", bucket: "red" },
          { id: "c", label: "Ngày tháng + tên người + thành tựu quá đẹp", bucket: "red" },
          { id: "d", label: "Trả lời ngắn gọn, có dẫn link Wikipedia", bucket: "ok" },
          { id: "e", label: "Công thức Toán có thể kiểm chứng", bucket: "ok" },
        ], buckets: [{ id: "red", label: "🚩 Đáng nghi" }, { id: "ok", label: "✅ Đáng tin hơn" }] },
    ],
  },
  {
    id: "safety", emoji: "🔐", Icon: ShieldAlert,
    title: "An toàn số trong kỷ nguyên AI", tag: "Vệ sĩ kỹ thuật số",
    desc: "Lừa đảo giả giọng, deepfake bạn cùng lớp, bot dụ dỗ trên MXH — cách tự bảo vệ trên Zalo, TikTok.",
    gradient: "from-rose-500 via-red-500 to-orange-600", ring: "ring-rose-400/50",
    badge: { name: "Digital Guardian", emoji: "🛡️" },
    story: [
      { heading: "📞 Deepfake voice — nỗi sợ 2025", body: "AI có thể nhái giọng bố/mẹ chỉ từ 3 giây ghi âm trên TikTok. Đã có hàng trăm vụ lừa chuyển tiền ở VN với chiêu 'mẹ bị tai nạn cần gấp'. <b>Quy tắc:</b> luôn xác minh qua kênh thứ 2 trước khi chuyển tiền." },
      { heading: "📸 Deepfake ảnh & video bạn học", body: "App AI cho phép ghép mặt bạn lên video xấu hổ trong 30 giây. Đây là tội hình sự theo Nghị định 53/2022. Báo thầy cô + report nền tảng — không bao giờ chia sẻ lại." },
      { heading: "🤖 Bot AI dụ dỗ qua Messenger/Zalo", body: "Tài khoản lạ tự xưng 'AI tutor / tuyển dụng' xin CMND, ảnh thẻ, mã OTP. <b>100% là lừa đảo</b>. Không bao giờ gửi giấy tờ cá nhân qua chat — kể cả bạn bè (account có thể bị hack)." },
    ],
    Sandbox: DigitalSafetySandbox,
    quiz: [
      { prompt: "Cách phản ứng AN TOÀN với deepfake / lừa đảo AI?",
        items: [
          { id: "a", label: "Xác minh bằng kênh thứ 2 trước khi chuyển tiền", bucket: "safe" },
          { id: "b", label: "Report tài khoản đáng nghi cho nền tảng", bucket: "safe" },
          { id: "c", label: "Báo thầy cô / bố mẹ khi gặp deepfake", bucket: "safe" },
          { id: "d", label: "Gửi CMND cho 'AI tutor' lạ để học miễn phí", bucket: "danger" },
          { id: "e", label: "Chia sẻ lại deepfake để 'vạch trần'", bucket: "danger" },
        ], buckets: [{ id: "safe", label: "An toàn ✅" }, { id: "danger", label: "Nguy hiểm ❌" }] },
    ],
  },
  {
    id: "graduation",
    emoji: "🎓",
    Icon: GraduationCap,
    title: "Trình diễn sản phẩm & Định hướng",
    tag: "Nhà hùng biện tương lai",
    desc: "Ứng dụng AI làm slide thuyết trình đồ án cuối khóa và khám phá những bản đồ nghề nghiệp công nghệ đỉnh cao trong tương lai.",
    gradient: "from-amber-400 via-pink-500 to-purple-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "AI Grandmaster", emoji: "🏆" },
    story: [
      {
        heading: "🎤 Trình diễn = 50% giá trị sản phẩm",
        body: "Code giỏi mà không trình bày được = thiệt thòi. Steve Jobs từng nói: <b>'Ý tưởng không demo được thì không tồn tại'</b>. Hãy luyện kể chuyện AI bằng slide, video demo, sandbox tương tác.",
      },
      {
        heading: "🛠️ AI làm slide tự động",
        body: "Gamma, Tome, Beautiful.ai sinh slide từ prompt trong 30s. Canva Magic Design vẽ poster. Adobe Express dựng video. Bạn chỉ cần tập trung <b>nội dung & câu chuyện</b>.",
      },
      {
        heading: "🌟 Nghề AI hot 2025–2030",
        body: "AI Engineer ($120k+), Prompt Engineer, AI Product Manager, MLOps, AI Ethics Officer, Data Scientist, AI UX Designer. Việt Nam khát nhân lực — đây là cơ hội vàng cho thế hệ Gen Z.",
      },
    ],
    Sandbox: GraduationSandbox,
    quiz: [
      {
        prompt: "Công cụ AI hỗ trợ thuyết trình?",
        items: [
          { id: "a", label: "Gamma — sinh slide tự động", bucket: "yes" },
          { id: "b", label: "Canva Magic Design — poster", bucket: "yes" },
          { id: "c", label: "Adobe Express — video demo", bucket: "yes" },
          { id: "d", label: "Notepad thuần chữ", bucket: "no" },
          { id: "e", label: "Máy tính bỏ túi", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Hữu ích ✅" },
          { id: "no", label: "Không phù hợp" },
        ],
      },
      {
        prompt: "Cấu trúc một bài thuyết trình AI tốt?",
        items: [
          { id: "1", label: "Vấn đề thực tế cần giải quyết", bucket: "good" },
          { id: "2", label: "Giải pháp AI & demo trực tiếp", bucket: "good" },
          { id: "3", label: "Kết quả số liệu thuyết phục", bucket: "good" },
          { id: "4", label: "Copy nguyên slide người khác", bucket: "bad" },
          { id: "5", label: "Đọc nguyên văn chữ trên slide", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Đúng cách ✅" },
          { id: "bad", label: "Sai cách ❌" },
        ],
      },
      {
        prompt: "Nghề nào HOT trong kỷ nguyên AI 2025–2030?",
        items: [
          { id: "a", label: "AI / ML Engineer", bucket: "hot" },
          { id: "b", label: "Prompt Engineer", bucket: "hot" },
          { id: "c", label: "AI Product Manager", bucket: "hot" },
          { id: "d", label: "AI Ethics Officer", bucket: "hot" },
          { id: "e", label: "Nghề copy-paste thủ công", bucket: "cold" },
        ],
        buckets: [
          { id: "hot", label: "Nghề HOT 🔥" },
          { id: "cold", label: "Bị thay thế" },
        ],
      },
    ],
  },
];

// Difficulty-ordered learning path (easy → hard). Card list & numbering follow this order.
const TRACK_ORDER: TrackId[] = [
  "study", "safety", "factcheck", "datadet", "vision", "nlp", "genai", "recsys",
  "nn", "mlmagic", "rl", "ethics", "deepfake", "aiot", "agent", "careers", "capstone", "graduation",
];
const ORDERED_TRACKS: Track[] = TRACK_ORDER
  .map((id) => TRACKS.find((t) => t.id === id))
  .filter((t): t is Track => Boolean(t));

const STORAGE_KEY = "haiedu_ai_academy_progress";

type Progress = Record<TrackId, { stars: number; badge?: boolean }>;

const loadProgress = (): Progress => {
  const defaults: Progress = { vision: { stars: 0 }, nlp: { stars: 0 }, nn: { stars: 0 }, datadet: { stars: 0 }, mlmagic: { stars: 0 }, genai: { stars: 0 }, rl: { stars: 0 }, ethics: { stars: 0 }, recsys: { stars: 0 }, aiot: { stars: 0 }, capstone: { stars: 0 }, deepfake: { stars: 0 }, agent: { stars: 0 }, study: { stars: 0 }, careers: { stars: 0 }, factcheck: { stars: 0 }, safety: { stars: 0 }, mathai: { stars: 0 }, promptlab: { stars: 0 }, startup: { stars: 0 }, graduation: { stars: 0 } };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch (_e) { /* ignore */ }
  return defaults;
};

const saveProgress = (p: Progress) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (_e) { /* ignore */ }
};

const AIAcademy = () => {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [active, setActive] = useState<TrackId | null>(null);
  const [overlay, setOverlay] = useState<{ track: Track; stars: number } | null>(null);
  const { touchStreak, awardXP } = useAIAcademyXP();
  // Touch streak once on mount (visiting AI Academy counts as activity)
  useEffect(() => { touchStreak(); }, [touchStreak]);

  // Certificate state — unlocks only when totalStars === maxStars
  const [certOpen, setCertOpen] = useState(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentSeed, setStudentSeed] = useState<string>("");

  useEffect(() => { saveProgress(progress); }, [progress]);



  // Fetch the signed-in user's display name once so the certificate can be
  // personalized. Guests fall back to a default label.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!mounted || !user) return;
        const meta = (user.user_metadata || {}) as Record<string, unknown>;
        const name = (meta.full_name as string) || (meta.name as string) || user.email?.split("@")[0] || "";
        setStudentName(name);
        setStudentSeed(user.id);
      } catch { /* ignore */ }
    })();
    return () => { mounted = false; };
  }, []);

  const totalStars = (Object.values(progress) as Progress[TrackId][]).reduce((a, b) => a + b.stars, 0);
  const totalBadges = (Object.values(progress) as Progress[TrackId][]).filter((p) => p.badge).length;
  const maxStars = TRACKS.length * 3;
  const overallPct = (totalStars / maxStars) * 100;
  const certificateUnlocked = totalStars >= maxStars;

  const handleQuizComplete = async (track: Track, passed: boolean, score: number) => {
    const stars = Math.min(3, score);
    const prevStars = progress[track.id]?.stars ?? 0;
    const newStars = Math.max(prevStars, stars);
    const starsGained = Math.max(0, newStars - prevStars);
    setProgress((p) => ({
      ...p,
      [track.id]: {
        stars: newStars,
        badge: p[track.id]?.badge || passed,
      },
    }));

    // Award XP: 20 per quiz attempt + 30 per new star earned + 100 bonus first-pass
    const xpGain = 20 + starsGained * 30 + (passed && !progress[track.id]?.badge ? 100 : 0);
    awardXP(xpGain, "quiz");
    if (starsGained > 0) awardXP(0, "star");

    if (passed) {
      confetti({ particleCount: 180, spread: 110, origin: { y: 0.6 } });
      setTimeout(() => confetti({
        particleCount: 120, spread: 100, origin: { y: 0.4 },
        colors: ["#a855f7", "#06b6d4", "#10b981"],
      }), 250);
      setOverlay({ track, stars });

      // Reward log to Supabase if signed in
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("student_activity_log").insert({
            user_id: user.id,
            activity_type: "ai_academy_track",
            activity_id: track.id,
            domain: "programming",
            score,
            max_score: track.quiz.length,
            metadata: { track_title: track.title, badge: track.badge.name },
          });
        }
      } catch (_e) { /* ignore */ }
    } else {
      toast({
        title: "Gần được rồi! 💪",
        description: `Điểm: ${score}/${track.quiz.length} — thử lại để mở khóa huy hiệu nhé.`,
      });
    }
  };


  const activeTrack = useMemo(() => TRACKS.find((t) => t.id === active) ?? null, [active]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <SEO
        title="AI Academy cho học sinh THCS & THPT | HaiEduTech"
        description="Học AI siêu trực quan dành cho học sinh cấp 2-3: Computer Vision, NLP Chatbot, Mạng thần kinh nhân tạo. Sandbox tương tác, quiz kéo thả, huy hiệu và phần thưởng."
        path="/programming/ai-academy"
      />
      <FloatingAIIcons />
      {/* Side floating chibis (desktop only) — like homepage */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] hidden xl:block">
        <FloatingChibi src={chibiRobotHero} alt="" size={110} delay={0} className="absolute left-[1.5%] top-[18%]" />
        <FloatingChibi src={chibiCoder} alt="" size={100} delay={0.8} className="absolute left-[2%] top-[58%]" />
        <FloatingChibi src={chibiRocket} alt="" size={105} delay={0.4} className="absolute right-[2%] top-[22%]" />
        <FloatingChibi src={chibiOwl} alt="" size={95} delay={1.2} className="absolute right-[1.5%] top-[62%]" />
      </div>
      <div className="relative z-10">
      <Navbar />
      <AutoTranslateBoundary>
      <div className="container mx-auto px-4 sm:px-6 pt-6 pb-16 max-w-6xl">
        {/* Breadcrumb */}
        <Link to="/programming" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-3 h-3" /> Lập trình
        </Link>

        {/* Hero with AI image background + animated chibi robot */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-xl min-h-[280px] sm:min-h-[320px]"
        >
          {/* Background image layer */}
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Color overlay for contrast — darker on the left to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />

          {/* Animated chibi robot — top/right corner */}
          <motion.img
            src={chibiRobot}
            alt="Robot trợ lý AI Academy"
            className="absolute right-2 sm:right-4 lg:right-8 bottom-2 sm:bottom-3 w-20 sm:w-32 lg:w-44 h-auto drop-shadow-2xl select-none pointer-events-none"
            animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold mb-3">
              <Sparkles className="w-3 h-3" /> AI ACADEMY · CẤP 2 – CẤP 3
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black leading-tight mb-2 drop-shadow-lg">
              Học AI siêu vui 🚀
            </h1>
            <p className="text-white/95 max-w-2xl text-sm sm:text-base pr-24 sm:pr-36 lg:pr-48 drop-shadow">
              {TRACKS.length - 1} chặng phiêu lưu trực quan — chạm, kéo, thả, dạy bot, vẽ neuron. Hoàn thành để mở khoá huy hiệu, sao thưởng và Chứng chỉ tốt nghiệp!
            </p>

            {/* Progress strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20">
                <div className="text-xs opacity-90">⭐ Sao</div>
                <div className="text-xl font-black">{totalStars}/{TRACKS.length * 3}</div>
              </div>
              <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20">
                <div className="text-xs opacity-90">🏅 Huy hiệu</div>
                <div className="text-xl font-black">{totalBadges}/{TRACKS.length}</div>
              </div>
              <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20">
                <div className="text-xs opacity-90">📊 Tiến độ</div>
                <div className="text-xl font-black">{Math.round(overallPct)}%</div>
              </div>
            </div>
            <Progress value={overallPct} className="mt-3 h-2 bg-white/20" />
          </div>
        </motion.div>

        {/* XP / Streak / Daily Quest HUD */}
        <XPStreakHUD />

        {/* Track cards */}

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {ORDERED_TRACKS.map((t, i) => {
            const p = progress[t.id] ?? { stars: 0 };
            const stars = p.stars;
            const lessonNo = i + 1;
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setActive(t.id);
                  // Award 10 XP first-time-per-session open, mark daily quest
                  awardXP(10, "lesson");

                  setTimeout(() => {
                    document.getElementById("ai-track-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                className={`group relative text-left rounded-3xl p-5 bg-card border-2 transition-all overflow-hidden hover:shadow-2xl active:scale-[0.98] electric-border ${
                  stars >= 3 ? "electric-strong" : ""
                } ${
                  active === t.id ? `border-transparent ring-4 ${t.ring}` : "border-border hover:border-primary/30"
                }`}
              >
                <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${t.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
                {/* Lesson number badge — sequence in the easy→hard path */}
                <div className={`absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${t.gradient} text-white text-[11px] font-black shadow-md`}>
                  <span className="opacity-90">Bài</span>
                  <span className="text-sm leading-none">{String(lessonNo).padStart(2, "0")}</span>
                </div>
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-2xl text-white shadow-lg mb-3`}>
                  {t.emoji}
                </div>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{t.tag}</div>
                  <h3 className="font-display font-black text-lg text-foreground leading-tight">{t.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-3">{t.desc}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= stars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
                        />
                      ))}
                    </div>
                    {p.badge ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        {t.badge.emoji} {t.badge.name}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Lock className="w-3 h-3" /> {t.badge.name}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ============= GRADUATION CERTIFICATE BANNER ============= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative rounded-3xl p-5 sm:p-6 mb-10 overflow-hidden border-2 transition-all ${
            certificateUnlocked
              ? "border-amber-400/60 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-900/40 shadow-[0_0_40px_rgba(217,170,68,0.35)]"
              : "border-border bg-muted/40"
          }`}
        >
          {certificateUnlocked && (
            <>
              {/* Celebration ring pulse */}
              <motion.div
                aria-hidden
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full border-4 border-amber-400/30"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-4 border-yellow-400/30"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
          <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div
              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl ${
                certificateUnlocked
                  ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-xl"
                  : "bg-muted text-muted-foreground/60 grayscale opacity-60"
              }`}
            >
              {certificateUnlocked ? "🎓" : <Lock className="w-8 h-8" />}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${certificateUnlocked ? "text-amber-700 dark:text-amber-300" : "text-muted-foreground"}`}>
                Chứng chỉ tốt nghiệp · Graduation Certificate
              </div>
              {certificateUnlocked ? (
                <h3 className="font-display font-black text-lg sm:text-2xl text-foreground leading-tight">
                  Chúc mừng! Em đã đạt {totalStars}/{maxStars} sao 🌟
                </h3>
              ) : (
                <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                  Hoàn thành {TRACKS.length - 1} bài học và đạt {maxStars}/{maxStars} sao để mở khoá Chứng chỉ tốt nghiệp!
                </h3>
              )}
              <div className="mt-1 text-xs text-muted-foreground">
                Tiến độ hiện tại: <span className="font-bold text-foreground">{totalStars}/{maxStars} sao</span>
              </div>
            </div>
            {certificateUnlocked ? (
              <motion.button
                onClick={() => setCertOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: [
                  "0 0 0 0 rgba(217,170,68,0.55)",
                  "0 0 0 14px rgba(217,170,68,0)",
                ] }}
                transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
                className="shrink-0 px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-black text-sm sm:text-base shadow-xl"
              >
                🎓 Nhận chứng chỉ tốt nghiệp của bạn
              </motion.button>
            ) : (
              <div className="shrink-0 px-5 py-3 rounded-2xl bg-muted text-muted-foreground font-bold text-sm inline-flex items-center gap-2 border-2 border-dashed border-border">
                <Lock className="w-4 h-4" /> Chưa mở khoá
              </div>
            )}
          </div>
        </motion.div>

        {/* Active track detail */}
        <div id="ai-track-detail">
          <AnimatePresence mode="wait">
            {activeTrack && (
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${activeTrack.gradient} text-white shadow-xl`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                      {activeTrack.emoji}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider opacity-90 font-bold">{activeTrack.tag}</div>
                      <h2 className="text-xl sm:text-2xl font-display font-black">{activeTrack.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Split view: concept | sandbox */}
                <div className="grid lg:grid-cols-2 gap-5">
                  {/* Concept */}
                  <div className="rounded-3xl border-2 border-border bg-card p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-purple-600" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">📖 Câu chuyện</h3>
                    </div>

                    {TRACK_ILLUSTRATIONS[activeTrack.id] && (
                      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm ring-1 ring-purple-500/10">
                        <img
                          src={TRACK_ILLUSTRATIONS[activeTrack.id]}
                          alt={`Minh họa bài học ${activeTrack.title}`}
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {activeTrack.story.map((s, i) => {
                      // Pull the leading emoji from heading for a visual badge.
                      const emojiMatch = s.heading.match(/^(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic})*)/u);
                      const emoji = emojiMatch ? emojiMatch[1] : "✨";
                      const headingText = s.heading.replace(/^(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic})*)\s*/u, "");
                      const gradients = [
                        "from-purple-500/20 via-fuchsia-500/15 to-pink-500/20",
                        "from-cyan-500/20 via-sky-500/15 to-blue-500/20",
                        "from-emerald-500/20 via-teal-500/15 to-green-500/20",
                        "from-amber-500/20 via-orange-500/15 to-rose-500/20",
                      ];
                      const grad = gradients[i % gradients.length];
                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-3 sm:p-4 rounded-2xl border-l-4 border-purple-500 bg-gradient-to-br ${grad} shadow-sm`}
                        >
                          <div
                            aria-hidden
                            className="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur ring-1 ring-white/40 dark:ring-white/10 shadow-md text-3xl sm:text-4xl"
                          >
                            <span data-no-translate>{emoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-foreground mb-1.5 text-[15px] sm:text-base">{headingText}</h4>
                            <SmartText
                              text={s.body}
                              html
                              className="text-[15px] text-foreground leading-relaxed"
                            />
                          </div>
                        </div>
                      );
                    })}



                    {/* ===== Extended educational content (Đợt 1) ===== */}
                    {(() => {
                      const extra = TRACK_EXTRAS[activeTrack.id];
                      if (!extra) return null;
                      return (
                        <div className="space-y-4 pt-2">
                          {/* Vietnam case study */}
                          <div className="p-4 rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-yellow-500/10">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-red-600" />
                              <h4 className="font-bold text-foreground text-sm">{extra.vietnamCase.title}</h4>
                            </div>
                            <SmartText text={extra.vietnamCase.body} className="text-[15px] text-foreground leading-relaxed" />
                          </div>

                          {/* Golden tip */}
                          <div className="p-4 rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-400/15 to-orange-400/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-amber-600" />
                              <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm uppercase tracking-wide">
                                💡 Mẹo vàng của thầy Hải
                              </h4>
                            </div>
                            <SmartText text={extra.goldenTip} className="text-[15px] text-foreground leading-relaxed italic font-medium" />
                          </div>

                          {/* Glossary */}
                          <details className="p-4 rounded-2xl border-2 border-indigo-400/40 bg-indigo-500/5 group">
                            <summary className="flex items-center gap-2 cursor-pointer font-bold text-sm text-indigo-700 dark:text-indigo-300">
                              <BookOpen className="w-4 h-4" />
                              📖 Từ điển AI ({extra.glossary.length} thuật ngữ)
                            </summary>
                            <ul className="mt-3 space-y-2 list-none">
                              {extra.glossary.map((g, i) => (
                                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                                  <span className="text-indigo-500 mt-0.5 shrink-0 font-bold">▸</span>
                                  <span className="flex-1">
                                    <span className="font-bold text-indigo-700 dark:text-indigo-300">{g.term}:</span>{" "}
                                    <span className="text-foreground">{g.def}</span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </details>

                          {/* Careers */}
                          <div className="p-4 rounded-2xl border-2 border-emerald-400/40 bg-emerald-500/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Briefcase className="w-4 h-4 text-emerald-600" />
                              <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm uppercase tracking-wide">
                                🎯 Nghề tương lai liên quan
                              </h4>
                            </div>
                            <ul className="space-y-1">
                              {extra.careers.map((c, i) => (
                                <li key={i} className="text-[15px] text-foreground flex gap-2">
                                  <span className="text-emerald-500">▸</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Homework */}
                          <div className="p-4 rounded-2xl border-2 border-fuchsia-400/40 bg-fuchsia-500/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Home className="w-4 h-4 text-fuchsia-600" />
                              <h4 className="font-bold text-fuchsia-700 dark:text-fuchsia-300 text-sm uppercase tracking-wide">
                                🏠 Thử sức ở nhà
                              </h4>
                            </div>
                            <SmartText text={extra.homework} className="text-[15px] text-foreground leading-relaxed" />
                          </div>

                          {/* External demos */}
                          <div className="p-4 rounded-2xl border-2 border-cyan-400/40 bg-cyan-500/5">
                            <div className="flex items-center gap-2 mb-2">
                              <ExternalLink className="w-4 h-4 text-cyan-600" />
                              <h4 className="font-bold text-cyan-700 dark:text-cyan-300 text-sm uppercase tracking-wide">
                                🔗 Chơi với AI thật
                              </h4>
                            </div>
                            <div className="space-y-1.5">
                              {extra.externalDemo.map((d, i) => (
                                <a
                                  key={i}
                                  href={d.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-sm text-cyan-700 dark:text-cyan-300 hover:underline hover:text-cyan-600 font-medium"
                                >
                                  → {d.label}
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Safety note (optional, only for sensitive tracks) */}
                          {extra.safetyNote && (
                            <div className="p-4 rounded-2xl border-2 border-rose-500/50 bg-gradient-to-br from-rose-500/15 to-red-500/10">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-rose-600" />
                                <h4 className="font-bold text-rose-700 dark:text-rose-300 text-sm uppercase tracking-wide">
                                  {extra.safetyNote.title}
                                </h4>
                              </div>
                              <SmartText text={extra.safetyNote.body} className="text-[15px] text-foreground leading-relaxed" />
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Sandbox */}
                  <div className="rounded-3xl border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-cyan-600" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">🎮 Sandbox tương tác</h3>
                    </div>
                    <activeTrack.Sandbox />
                  </div>
                </div>

                {/* Quiz */}
                <div className="rounded-3xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/5 to-rose-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      🧩 Mini Quiz — Kéo & Thả
                    </h3>
                  </div>
                  <DragDropQuiz
                    key={`${activeTrack.id}-${progress[activeTrack.id]?.stars ?? 0}`}
                    questions={activeTrack.quiz}
                    onComplete={(passed, score) => handleQuizComplete(activeTrack, passed, score)}
                  />
                </div>

                {/* Bonus practice — Multiple Choice + Scenario (no extra stars) */}
                {QUIZ_EXTRAS[activeTrack.id] && (
                  <div className="grid lg:grid-cols-2 gap-5">
                    <div className="rounded-3xl border-2 border-indigo-400/40 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                          🎯 Luyện thêm — Trắc nghiệm
                        </h3>
                      </div>
                      <MultipleChoiceQuiz
                        key={`mc-${activeTrack.id}`}
                        questions={QUIZ_EXTRAS[activeTrack.id].mc}
                      />
                    </div>
                    <div className="rounded-3xl border-2 border-teal-400/40 bg-gradient-to-br from-teal-500/5 to-violet-500/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <h3 className="font-bold text-sm uppercase tracking-wider text-teal-700 dark:text-teal-400">
                          🎬 Tình huống đời thực
                        </h3>
                      </div>
                      <ScenarioQuiz
                        key={`sc-${activeTrack.id}`}
                        questions={QUIZ_EXTRAS[activeTrack.id].scenario}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!activeTrack && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              👆 Chọn một chặng ở trên để bắt đầu cuộc phiêu lưu AI!
            </div>
          )}
        </div>
      </div>
      </AutoTranslateBoundary>

      {/* Reward overlay */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur p-4"
            onClick={() => setOverlay(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-500 text-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-2">{overlay.track.badge.emoji}</div>
              <Award className="w-10 h-10 mx-auto mb-2" />
              <h3 className="text-2xl font-display font-black mb-1">Chúc mừng!</h3>
              <p className="text-white/90 mb-3">
                Bạn vừa mở khoá huy hiệu <b>{overlay.track.badge.name}</b> 🏅
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3].map((s) => (
                  <Star key={s} className={`w-7 h-7 ${s <= overlay.stars ? "fill-amber-300 text-amber-300" : "text-white/30"}`} />
                ))}
              </div>
              <Button
                onClick={() => setOverlay(null)}
                className="bg-white text-purple-700 hover:bg-white/90 font-bold w-full"
              >
                <CheckCircle2 className="w-4 h-4 mr-1" /> Tiếp tục phiêu lưu
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graduation certificate modal */}
      <GraduationCertificate
        open={certOpen}
        onClose={() => setCertOpen(false)}
        studentName={studentName}
        seed={studentSeed}
      />

      <Footer />
      </div>
    </div>
  );
};

export default AIAcademy;
