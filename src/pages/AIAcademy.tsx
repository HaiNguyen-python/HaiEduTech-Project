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
  Zap, Award, Rocket, CheckCircle2, Wand2, Film, Scale,
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CVSandbox from "@/components/ai-academy/ComputerVisionSandbox";
import NLPSandbox from "@/components/ai-academy/NLPSandbox";
import NeuralNetSandbox from "@/components/ai-academy/NeuralNetSandbox";
import GenAISandbox from "@/components/ai-academy/GenAISandbox";
import RecommenderSandbox from "@/components/ai-academy/RecommenderSandbox";
import EthicsSandbox from "@/components/ai-academy/EthicsSandbox";
import DragDropQuiz, { type DDQuestion } from "@/components/ai-academy/DragDropQuiz";

type TrackId = "vision" | "nlp" | "nn" | "genai" | "recsys" | "ethics";

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
    id: "genai",
    emoji: "✨",
    Icon: Wand2,
    title: "Generative AI",
    tag: "Tạo ảnh & văn bằng AI",
    desc: "Chơi với Prompt Engineering — chỉ đường cho AI vẽ tranh, viết văn theo ý mình.",
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
    id: "recsys",
    emoji: "🎯",
    Icon: Film,
    title: "Hệ gợi ý",
    tag: "Mini Netflix của bạn",
    desc: "Chấm 4 phim — xem AI dựng 'hồ sơ sở thích' và gợi ý phim tiếp theo y như Netflix, TikTok.",
    gradient: "from-rose-400 via-orange-500 to-amber-500",
    ring: "ring-rose-400/50",
    badge: { name: "Algo Curator", emoji: "🎬" },
    story: [
      {
        heading: "🍿 Vì sao TikTok 'gây nghiện'?",
        body: "Mỗi lần bạn xem, lướt, like — TikTok ghi lại. Sau ~50 video, nó biết bạn thích gì hơn cả bạn bè thân nhất. Đó là <b>Recommender System</b>.",
      },
      {
        heading: "📊 Vector sở thích",
        body: "AI biểu diễn mỗi phim/clip thành một <b>vector</b> (danh sách số) cho các thể loại. Sở thích của bạn cũng là vector. Phim có vector 'gần' bạn nhất sẽ được đề xuất.",
      },
      {
        heading: "⚠️ Bong bóng lọc (Filter Bubble)",
        body: "Nếu chỉ xem video một phía, AI sẽ chỉ đề xuất video đó → bạn bị nhốt trong 'bong bóng' thông tin. Hãy chủ động xem nhiều thể loại để mở rộng tầm nhìn!",
      },
    ],
    Sandbox: RecommenderSandbox,
    quiz: [
      {
        prompt: "App nào dùng Recommender System mạnh nhất?",
        items: [
          { id: "a", label: "TikTok 🎵", bucket: "yes" },
          { id: "b", label: "Netflix 🎬", bucket: "yes" },
          { id: "c", label: "YouTube ▶️", bucket: "yes" },
          { id: "d", label: "Máy tính bỏ túi 🧮", bucket: "no" },
          { id: "e", label: "Notepad đơn giản 📝", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Có Recommender" },
          { id: "no", label: "Không cần" },
        ],
      },
      {
        prompt: "AI dùng dữ liệu gì để hiểu bạn?",
        items: [
          { id: "1", label: "Lượt xem & thời gian xem", bucket: "use" },
          { id: "2", label: "Lượt like/share", bucket: "use" },
          { id: "3", label: "Bạn theo dõi ai", bucket: "use" },
          { id: "4", label: "Đọc suy nghĩ não bạn 🧠", bucket: "no" },
        ],
        buckets: [
          { id: "use", label: "Dữ liệu thật" },
          { id: "no", label: "Không thể" },
        ],
      },
      {
        prompt: "Filter Bubble nguy hiểm vì sao?",
        items: [
          { id: "a", label: "Chỉ thấy quan điểm 1 phía", bucket: "bad" },
          { id: "b", label: "Khó tiếp cận thông tin trái chiều", bucket: "bad" },
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
    id: "ethics",
    emoji: "⚖️",
    Icon: Scale,
    title: "AI có công bằng?",
    tag: "AI Ethics & Bias",
    desc: "Khám phá vì sao AI tuyển dụng của Amazon đã loại CV của phụ nữ — và cách sửa.",
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    ring: "ring-amber-400/50",
    badge: { name: "Fairness Guardian", emoji: "🛡️" },
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
];

const STORAGE_KEY = "haiedu_ai_academy_progress";

type Progress = Record<TrackId, { stars: number; badge?: boolean }>;

const loadProgress = (): Progress => {
  const defaults: Progress = { vision: { stars: 0 }, nlp: { stars: 0 }, nn: { stars: 0 }, genai: { stars: 0 }, recsys: { stars: 0 }, ethics: { stars: 0 } };
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

  useEffect(() => { saveProgress(progress); }, [progress]);

  const totalStars = (Object.values(progress) as Progress[TrackId][]).reduce((a, b) => a + b.stars, 0);
  const totalBadges = (Object.values(progress) as Progress[TrackId][]).filter((p) => p.badge).length;
  const overallPct = (totalStars / (TRACKS.length * 3)) * 100;

  const handleQuizComplete = async (track: Track, passed: boolean, score: number) => {
    const stars = Math.min(3, score);
    setProgress((p) => ({
      ...p,
      [track.id]: {
        stars: Math.max(p[track.id]?.stars ?? 0, stars),
        badge: p[track.id]?.badge || passed,
      },
    }));

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <SEO
        title="AI Academy cho học sinh THCS & THPT | HaiEduTech"
        description="Học AI siêu trực quan dành cho học sinh cấp 2-3: Computer Vision, NLP Chatbot, Mạng thần kinh nhân tạo. Sandbox tương tác, quiz kéo thả, huy hiệu và phần thưởng."
        path="/programming/ai-academy"
      />
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-6 pb-16 max-w-6xl">
        {/* Breadcrumb */}
        <Link to="/programming" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-3 h-3" /> Lập trình
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-500 text-white shadow-xl"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold mb-3">
              <Sparkles className="w-3 h-3" /> AI ACADEMY · CẤP 2 – CẤP 3
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black leading-tight mb-2">
              Học AI siêu vui 🚀
            </h1>
            <p className="text-white/90 max-w-2xl text-sm sm:text-base">
              3 chặng phiêu lưu trực quan — chạm, kéo, thả, dạy bot, vẽ neuron. Hoàn thành để mở khoá huy hiệu và sao thưởng!
            </p>

            {/* Progress strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-xl bg-white/15 backdrop-blur p-3">
                <div className="text-xs opacity-80">⭐ Sao</div>
                <div className="text-xl font-black">{totalStars}/{TRACKS.length * 3}</div>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur p-3">
                <div className="text-xs opacity-80">🏅 Huy hiệu</div>
                <div className="text-xl font-black">{totalBadges}/{TRACKS.length}</div>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur p-3">
                <div className="text-xs opacity-80">📊 Tiến độ</div>
                <div className="text-xl font-black">{Math.round(overallPct)}%</div>
              </div>
            </div>
            <Progress value={overallPct} className="mt-3 h-2 bg-white/20" />
          </div>
        </motion.div>

        {/* Track cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {TRACKS.map((t, i) => {
            const p = progress[t.id] ?? { stars: 0 };
            const stars = p.stars;
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => {
                  setActive(t.id);
                  setTimeout(() => {
                    document.getElementById("ai-track-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                className={`group relative text-left rounded-3xl p-5 bg-card border-2 transition-all overflow-hidden hover:shadow-2xl active:scale-[0.98] ${
                  active === t.id ? `border-transparent ring-4 ${t.ring}` : "border-border hover:border-primary/30"
                }`}
              >
                <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${t.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
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
                    {activeTrack.story.map((s, i) => (
                      <div key={i} className="p-3 rounded-2xl border-l-4 border-purple-500 bg-purple-500/5">
                        <h4 className="font-bold text-foreground mb-1">{s.heading}</h4>
                        <p
                          className="text-sm text-foreground/80 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: s.body }}
                        />
                      </div>
                    ))}
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
                    key={`${activeTrack.id}-${progress[activeTrack.id].stars}`}
                    questions={activeTrack.quiz}
                    onComplete={(passed, score) => handleQuizComplete(activeTrack, passed, score)}
                  />
                </div>
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

      <Footer />
    </div>
  );
};

export default AIAcademy;
