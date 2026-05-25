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
  const ABBR = ["TP.", "GS.", "TS.", "PGS.", "Th.S", "Ths.", "Ph.D", "Mr.", "Mrs.", "Ms.", "St.", "vs.", "Dr.", "Uni."];
  const PLACEHOLDER = "\u0001";
  let safe = text;
  ABBR.forEach((a) => { safe = safe.split(a).join(a.replace(/\./g, PLACEHOLDER)); });
  // Also protect numbered list markers like "1.", "2.", "10." so they don'AI is a chef, data is the ingredient'đọc'those numbers to know what is a face and what is a ball.'Lan – 98%'. That square frame is called a bounding box, 98% is the confidence level.'Đầu vào', which one is 🛒'Đầu ra'of AI Vision?'xin chào'(called tokens), AI turns it into a sequence of numbers (tokens). Each word has its own ID code. This is called tokenization.'đọc hiểu' như con người — nó đoán <b>intention</b> của bạn: bạn đang hỏi giá? hỏi giờ mở cửa? hay phàn nàn? Mỗi intention = 1 intent.",
      },
      {
        heading: "🇻🇳 The teen-code problem",
        body: "Học sinh hay viết 'k bít', 'iu qá', 'lm bt zùm vs'. Vietnamese AI must <b>normalize</b> these words into a standard format ('không biết', 'yêu quá', 'làm bài tập giùm với') before processing.",'Chào hỏi', which example is'Hỏi giá'guessing game'k bit' → 'don't know'", bucket: "ok" },
          { id: "2", label: "'iu qa' → 'love it so much'", bucket: "ok" },
          { id: "3", label: "'hello' → 'goodbye'", bucket: "no" },
          { id: "4", label: "'thank you' → 'sorry'", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Standardized correctly ✅" },
          { id: "no", label: "Sai ❌" },
        ],
      },
      {
        prompt: "Classify the sentiment of the following sentence (Sentiment Analysis):",
        items: [
          { id: "a", label: "The movie is so awesome! 😍", bucket: "pos" },
          { id: "b", label: "Great, love it 💖", bucket: "pos" },
          { id: "c", label: "So boring, a waste of time 😡", bucket: "neg" },
          { id: "d", label: "Terrible, unwatchable", bucket: "neg" },
        ],
        buckets: [
          { id: "pos", label: "Positive 😊" },
          { id: "neg", label: "Negative 😞" },
        ],
      },
    ],
  },
  {
    id: "nn",
    emoji: "🧠",
    Icon: Brain,
    title: "Artificial Neural Networks",
    tag: "The brain of AI",
    desc: "Visual playground: adjust study and sleep hours — see the AI predict your test scores.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    ring: "ring-emerald-400/50",
    badge: { name: "Neural Architect", emoji: "🧬" },
    story: [
      {
        heading: "🔌 Neuron — the building block of AI",
        body: "The human brain has ~86 billion neurons. AI simulates each neuron as <b>a decision filter</b>: receiving an input signal → multiplying by a weight → producing a new signal.",
      },
      {
        heading: "⚖️ Weights",
        body: "Mỗi đường nối giữa 2 neuron có một con số = trọng số. AI 'học'= AI adjusts those millions of weights until it predicts correctly.'dữ liệu dirty'needs cleaning?'bias'due to data", bucket: "yes" }, { id: "c", label: "Because Vietnamese people have faces'xấu'That is <b>Bias</b> (prejudice) in data.'20 câu hỏi'",\n        body: "AI plays 20 questions Yes/No:'Có lông không?' → 'Biết bay không?'-> <b>Bird!</b>. That is a <b>Decision Tree</b> — easy to understand, easy to explain, and very accurate for many problems.'phân loại'(guessing cat/dog), <b>generative</b> AI produces NEW content: images, text, music, video — that never existed on the Internet.'Prompt Engineer'Sandbox: NLPSandbox,'thật'(called hallucination). So always <b>verify</b> before believing a ChatGPT answer for your homework!'rõ ràng' vs 'mơ hồ':",
        items: [
          { id: "1", label: "'draw a cat'", bucket: "bad" },
          { id: "2", label: "'something pretty'", bucket: "bad" },
          { id: "3", label: "'ginger cat sitting by a Hanoi window, sunset, watercolor'", bucket: "good" },
          { id: "4", label: "'silver metallic robot, sci-fi neon, side profile, 4K'Which is clear?'đúng/sai'continuously'học'that female = less suitable → automatically rejecting CVs containing the word'women's chess club'. Amazon đã phải tắt hệ thống đó.",
      },
      {
        heading: "🛡️ How to fix errors?",
        body: "1) Collect <b>diverse</b> data (gender, region, age). 2) Measure fairness metrics. 3) Have <b>human oversight</b>. This is the job of an AI Ethics Engineer.",
      },
    ],
    Sandbox: EthicsSandbox,
    quiz: [
      {
        prompt: "What causes AI bias?",
        items: [
          { id: "a", label: "Biased training data", bucket: "yes" },
          { id: "b", label: "Lack of diversity among data labelers", bucket: "yes" },
          { id: "c", label: "Incorrect optimization goal", bucket: "yes" },
          { id: "d", label: "AI hates a certain group of people", bucket: "no" },
          { id: "e", label: "AI has personal emotions", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Correct cause" },
          { id: "no", label: "Misunderstandings about AI" },
        ],
      },
      {
        prompt: "Which situation shows AI bias?",
        items: [
          { id: "1", label: "AI recruitment filtering out female CVs", bucket: "bias" },
          { id: "2", label: "AI recognizes dark skin tones less accurately than white skin tones", bucket: "bias" },
          { id: "3", label: "AI suggesting books based on reading history", bucket: "ok" },
          { id: "4", label: "AI translates English to Vietnamese", bucket: "ok" },
        ],
        buckets: [
          { id: "bias", label: "Bias present ⚠️" },
          { id: "ok", label: "Normal" },
        ],
      },
      {
        prompt: "How to reduce bias in AI?",
        items: [
          { id: "a", label: "Diverse data", bucket: "yes" },
          { id: "b", label: "Result supervisor", bucket: "yes" },
          { id: "c", label: "Measure fairness periodically", bucket: "yes" },
          { id: "d", label: "Letting AI decide everything", bucket: "no" },
          { id: "e", label: "Hide the error", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Correct way ✅" },
          { id: "no", label: "Wrong way ❌" },
        ],
      },
    ],
  },
  {
    id: "recsys",
    emoji: "📊",
    Icon: Database,
    title: "Analyzing & Suggesting data",
    tag: "Data treasure",
    desc: "},",
    gradient: "from-amber-400 via-orange-500 to-yellow-600",
    ring: "ring-amber-400/50",
    badge: { name: "Data Engineer", emoji: "📈" },
    story: [
      {
        heading: "📦 Data = The oil of the 21st century",
        body: "Every second in the world: 6 million Google searches, 500 hours of video uploaded to YouTube, 100 million Instagram stories. Whoever knows how to <b>exploit</b> that data = gold.",
      },
      {
        heading: "🎯 Interest vectors",
        body: "Apps represent you as a series of numbers (vectors) for each topic: sports 0.9, gaming 0.7, music 0.3... Every video also has a vector. AI calculates <b>cosine similarity</b> to make recommendations.",
      },
      {
        heading: "⚠️ Filter bubble",
        body: "The higher the threshold → AI only suggests content <b>extremely</b> similar to you → you get trapped in a "bubble". Proactively watch various genres to expand your horizons!",
      },
    ],
    Sandbox: RecsysSandbox,
    quiz: [
      {
        prompt: "Which app uses the strongest Recommender System?",
        items: [
          { id: "a", label: "TikTok 🎵", bucket: "yes" },
          { id: "b", label: "Netflix 🎬", bucket: "yes" },
          { id: "c", label: "Shopee Mall 🛍️", bucket: "yes" },
          { id: "d", label: "Pocket calculator 🧮", bucket: "no" },
          { id: "e", label: "Simple Notepad 📝", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Includes Recommender" },
          { id: "no", label: "No need" },
        ],
      },
      {
        prompt: "What data does AI collect to understand you?",
        items: [
          { id: "1", label: "Views & watch time", bucket: "use" },
          { id: "2", label: "Likes/shares/comments", bucket: "use" },
          { id: "3", label: "Who you follow", bucket: "use" },
          { id: "4", label: "Reading thoughts in the brain 🧠", bucket: "no" },
        ],
        buckets: [
          { id: "use", label: "Real data" },
          { id: "no", label: "Unable to" },
        ],
      },
      {
        prompt: "Why is a similarity threshold that's too high harmful?",
        items: [
          { id: "a", label: "Only seeing one perspective", bucket: "bad" },
          { id: "b", label: "Hard to access different perspectives", bucket: "bad" },
          { id: "c", label: "Learning many new things", bucket: "good" },
          { id: "d", label: "Expand your mindset", bucket: "good" },
        ],
        buckets: [
          { id: "bad", label: "Harmful effects ⚠️" },
          { id: "good", label: "Benefits" },
        ],
      },
    ],
  },
  {
    id: "aiot",
    emoji: "🌐",
    Icon: Radio,
    title: "The Artificial Intelligence of Things (AIoT)",
    tag: "City of the future",
    desc: "{",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    ring: "ring-cyan-400/50",
    badge: { name: "AIoT Architect", emoji: "🛰️" },
    story: [
      {
        heading: "📡 What is IoT?",
        body: "Internet of Things = devices with sensors + Internet. Lights, cameras, refrigerators, and smartwatches are all IoT. Add AI → <b>AIoT</b>: devices that make their own decisions.",
      },
      {
        heading: "🚦 Smart traffic lights",
        body: "Sensors count cars in 4 directions → microcontrollers run <b>If-Else</b> rules → prioritizing the most crowded direction. Singapore reduced red light wait times by 25% thanks to AIoT.",
      },
      {
        heading: "🏙️ Smart City",
        body: "Streetlights turn on when people pass, trash cans report they are full, parking lots show empty spots, bus stations predict arrival times — all thanks to AIoT coordinating millions of devices.",
      },
    ],
    Sandbox: AIoTSandbox,
    quiz: [
      {
        prompt: "Which device is IoT?",
        items: [
          { id: "a", label: "Smart watch ⌚", bucket: "iot" },
          { id: "b", label: "Camera an ninh online 📹", bucket: "iot" },
          { id: "c", label: "Smart fridge 🧊", bucket: "iot" },
          { id: "d", label: "Ordinary wooden table 🪵", bucket: "no" },
          { id: "e", label: "The ballpoint pen 🖊️", bucket: "no" },
        ],
        buckets: [
          { id: "iot", label: "Is IoT" },
          { id: "no", label: "It is not" },
        ],
      },
      {
        prompt: "How do smart traffic lights work?",
        items: [
          { id: "1", label: "Vehicle counting sensor", bucket: "yes" },
          { id: "2", label: "Microcontrollers running If-Else rules", bucket: "yes" },
          { id: "3", label: "Turn on the green light for the east direction", bucket: "yes" },
          { id: "4", label: "Police manual traffic control 👮", bucket: "no" },
          { id: "5", label: "Random draw 🎲", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "AIoT mechanism" },
          { id: "no", label: "It is not" },
        ],
      },
      {
        prompt: "What are the benefits of a Smart City?",
        items: [
          { id: "a", label: "Reduce traffic jams", bucket: "good" },
          { id: "b", label: "Saving electricity for street lights", bucket: "good" },
          { id: "c", label: "Reporting full trash cans on time", bucket: "good" },
          { id: "d", label: "Making people lazier", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Benefits ✅" },
          { id: "bad", label: "Misunderstood" },
        ],
      },
    ],
  },
  {
    id: "capstone",
    emoji: "🤖",
    Icon: Cpu,
    title: "Build your own AI Assistant",
    tag: "First project",
    desc: "heading: "⚖️ Hallucination — AI Fabrications",",
    gradient: "from-amber-400 via-fuchsia-500 to-purple-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "AI Certified Guru", emoji: "🏆" },
    story: [
      {
        heading: "🧩 Integration is the most important skill",
        body: "A practical AI isn't just good at one thing. Siri / Google Assistant combine <b>Vision</b> (scan QR), <b>NLP</b> (hear commands), <b>Neural Net</b> (reasoning), and <b>Ethics</b> (filter harmful content).",
      },
      {
        heading: "🔧 AI assembly process",
        body: "1) Select appropriate modules · 2) Plug into the processing core · 3) Run diagnostic boot · 4) Test with real data · 5) Repeat until stable.",
      },
      {
        heading: "🏆 You have reached the end of the journey!",
        body: "Completing the Capstone = officially an <b>AI Certified Guru</b> of HaiEduTech. Next? Sign up for the Python Programming class with Mr. Hai to turn this assistant into real code!",
      },
    ],
    Sandbox: CapstoneSandbox,
    quiz: [
      {
        prompt: "What technologies does a good AI assistant need to combine?",
        items: [
          { id: "a", label: "Computer Vision 👁️", bucket: "yes" },
          { id: "b", label: "NLP 💬", bucket: "yes" },
          { id: "c", label: "Neural Network 🧠", bucket: "yes" },
          { id: "d", label: "Ethics & Safety 🛡️", bucket: "yes" },
          { id: "e", label: "Pure luck 🎲", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Need to have" },
          { id: "no", label: "No need" },
        ],
      },
      {
        prompt: "What is the correct process for building an AI product?",
        items: [
          { id: "1", label: "Define the problem", bucket: "right" },
          { id: "2", label: "Collect data", bucket: "right" },
          { id: "3", label: "Training & evaluation", bucket: "right" },
          { id: "4", label: "Coding without a plan", bucket: "wrong" },
          { id: "5", label: "Skip testing, deploy immediately", bucket: "wrong" },
        ],
        buckets: [
          { id: "right", label: "Correct process ✅" },
          { id: "wrong", label: "Wrong way ❌" },
        ],
      },
      {
        prompt: "What should you do after graduating from AI Academy?",
        items: [
          { id: "a", label: "Learning Python with Teacher Hai", bucket: "good" },
          { id: "b", label: "Tham gia thi AI Olympic", bucket: "good" },
          { id: "c", label: "Build small projects yourself on Lovable", bucket: "good" },
          { id: "d", label: "Shut down and sleep 😴", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Right action 🚀" },
          { id: "bad", label: "Unfortunate" },
        ],
      },
    ],
  },
  {
    id: "deepfake",
    emoji: "🕵️",
    Icon: ShieldAlert,
    title: "AI Recognition and Security",
    tag: "Security detective",
    desc: "body: "Generative AI sometimes invents information that looks very",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    ring: "ring-rose-400/50",
    badge: { name: "Cyber Shield", emoji: "🛡️" },
    story: [
      {
        heading: "🎭 What is Deepfake?",
        body: "Deepfake uses <b>Generative AI</b> to swap one person's face onto another's video — nearly indistinguishable by eye. Fake videos of CEOs, politicians, even friends borrowing money via Zalo have appeared.",
      },
      {
        heading: "🔬 Traces left by AI",
        body: "Hairlines / ears blurred, shadows in the wrong direction, unnatural blinking, distorted teeth, skin lighting not matching the background. Forensic software zooms in to spot <b>noise patterns</b> of real cameras.",
      },
      {
        heading: "🛡️ Protect yourself",
        body: "1) Don't post public HD portraits. 2) Set up 2FA passwords. 3) Video call to verify when relatives message to borrow money. 4) Report offensive deepfakes to the Authority of Information Security.",
      },
    ],
    Sandbox: DeepfakeSandbox,
    quiz: [
      {
        prompt: "Which signs expose a video as a Deepfake?",
        items: [
          { id: "a", label: "Blurred hairline/ears", bucket: "yes" },
          { id: "b", label: "Shadows in the wrong direction", bucket: "yes" },
          { id: "c", label: "Eyes blink less", bucket: "yes" },
          { id: "d", label: "Clear HD 4K video footage", bucket: "no" },
          { id: "e", label: "Has subtitles", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Deepfake signs ⚠️" },
          { id: "no", label: "Normal" },
        ],
      },
      {
        prompt: "How to protect personal photos from being misused?",
        items: [
          { id: "1", label: "Turn on 2FA for all accounts", bucket: "ok" },
          { id: "2", label: "Limit posting HD photos publicly", bucket: "ok" },
          { id: "3", label: "Video calls to verify borrowers", bucket: "ok" },
          { id: "4", label: "Sharing ID cards on Facebook", bucket: "no" },
          { id: "5", label: "Posting selfies with your home address", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Safe ✅" },
          { id: "no", label: "Dangerous ❌" },
        ],
      },
      {
        prompt: "Which situation COULD be a deepfake scam?",
        items: [
          { id: "a", label: "The boss makes an urgent video call asking for a bank transfer", bucket: "scam" },
          { id: "b", label: "Best friend on video asks for an emergency loan", bucket: "scam" },
          { id: "c", label: "Mom calling on a regular phone line to check in", bucket: "ok" },
          { id: "d", label: "Cousin texts on Zalo about a birthday", bucket: "ok" },
        ],
        buckets: [
          { id: "scam", label: "Stay alert ⚠️" },
          { id: "ok", label: "Normal" },
        ],
      },
    ],
  },
  {
    id: "agent",
    emoji: "🤖",
    Icon: Bot,
    title: "Prompt Engineering & Autonomous Agents",
    tag: "Versatile Assistant",
    desc: "{",
    gradient: "from-indigo-500 via-blue-600 to-violet-600",
    ring: "ring-indigo-400/50",
    badge: { name: "Agent Commander", emoji: "🎖️" },
    story: [
      {
        heading: "🧠 What is an AI Agent?",
        body: "Chatbots only answer one sentence. <b>AI Agents</b> have a <b>thinking loop</b>: receive goal -> self-plan -> call tools (search, send email, book ticket) -> observe results -> repeat until finished.",
      },
      {
        heading: "🔧 Tool Use",
        body: "Your agent can have many 'hands': weather API, SMS, read Excel, draw charts. Just give a command: 'Check Hanoi weather every morning at 6 AM, if it rains, SMS a reminder to bring an umbrella.'",
      },
      {
        heading: "🚀 Prompt Engineering",
        body: "A good prompt for an agent includes: <b>Role</b> (You are a specialist...) + <b>Goal</b> + <b>Constraints</b> (Vietnamese only, ≤300 words) + <b>Output Format</b> (JSON, table). This is a super hot skill for 2025.",
      },
    ],
    Sandbox: AgentWorkflowSandbox,
    quiz: [
      {
        prompt: "What is the difference between a Chatbot and an AI Agent?",
        items: [
          { id: "a", label: "Agents plan multiple steps on their own", bucket: "agent" },
          { id: "b", label: "Agents can call external tools/APIs", bucket: "agent" },
          { id: "c", label: "Agents loop until the goal is met", bucket: "agent" },
          { id: "d", label: "Only answer a single question", bucket: "bot" },
          { id: "e", label: "Cannot access the internet", bucket: "bot" },
        ],
        buckets: [
          { id: "agent", label: "AI Agent 🤖" },
          { id: "bot", label: "Regular chatbot" },
        ],
      },
      {
        prompt: "What are the components of a good prompt?",
        items: [
          { id: "1", label: "Role (You are...)", bucket: "good" },
          { id: "2", label: "Clear goals", bucket: "good" },
          { id: "3", label: "Constraints & output format", bucket: "good" },
          { id: "4", label: "Writing vaguely, leaving it up to interpretation", bucket: "bad" },
          { id: "5", label: "Don't tell AI what it needs to do", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Prompt tốt ✅" },
          { id: "bad", label: "Bad prompt ❌" },
        ],
      },
      {
        prompt: "Which applications are suitable for AI Agents?",
        items: [
          { id: "a", label: "Self-schedule study sessions based on deadlines graduation", bucket: "ok" },
          { id: "b", label: "Morning news summary", bucket: "ok" },
          { id: "c", label: "Book the cheapest train tickets for next week", bucket: "ok" },
          { id: "d", label: "Attending face-to-face classes on your behalf 🏫", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Agent can do it" },
          { id: "no", label: "Irreplaceable" },
        ],
      },
    ],
  },
  {
    id: "study", emoji: "🎓", Icon: BookOpen,
    title: "AI & Smart Learning", tag: "AI Era Top Student",
    desc: "Use ChatGPT, NotebookLM, and Gemini the right way to study and prep for exams — don't let AI do the work for you.",
    gradient: "from-blue-400 via-sky-500 to-cyan-600", ring: "ring-blue-400/50",
    badge: { name: "Smart Learner", emoji: "📚" },
    story: [
      { heading: "🧠 AI is a tutor, not the answer key", body: "AI is great at explaining step-by-step, suggesting examples, and checking logic. If you copy a prompt and say 'do it for me' — you lose the chance to think for yourself. Ask <b>'explain how'</b> instead of <b>'do it for me'</b>." },
      { heading: "📚 NotebookLM — the PDF-reading tutor", body: "Upload lecture PDFs/textbooks → AI creates summaries, flashcards, and podcasts to listen to on the go. The most powerful tool for reviewing for the 2025 National High School Exam / IELTS / TOEIC." },
      { heading: "🎯 Mr. Hai's 3-step rule", body: "<b>1. Try it yourself first</b> — ask AI only when stuck. <b>2. Ask for step-by-step explanations</b> — not just the answer. <b>3. Verify</b> with textbooks or by asking teachers." },
    ],
    Sandbox: StudySmartSandbox,
    quiz: [
      { prompt: "Which is a SMART way to LEARN with AI?",
        items: [
          { id: "a", label: "Ask AI to explain step-by-step", bucket: "smart" },
          { id: "b", label: "Ask AI 'why' after every answer", bucket: "smart" },
          { id: "c", label: "Use NotebookLM to summarize lecture PDFs", bucket: "smart" },
          { id: "d", label: "Copying the whole prompt and submitting AI answers", bucket: "lazy" },
          { id: "e", label: "Trusting blindly without verifying", bucket: "lazy" },
        ], buckets: [{ id: "smart", label: "Smart ✅" }, { id: "lazy", label: "Lazy & dangerous ❌" }] },
    ],
  },
  {
    id: "careers", emoji: "💼", Icon: Briefcase,
    title: "AI career roadmap in Vietnam", tag: "Career compass",
    desc: "Discover 8 hot AI careers at VinAI, FPT.AI, Zalo, and Sky Mavis — plus your roadmap from 10th grade to your dream job.",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600", ring: "ring-violet-400/50",
    badge: { name: "Career Explorer", emoji: "🗺️" },
    story: [
      { heading: "🚀 Vietnam is thirsty for AI talent", body: "VinAI, FPT.AI, Zalo AI Lab, VinBigdata recruit 2000+ AI engineers every year. Salaries range from 25 million VND (junior) to 100 million+ (senior). Opportunities for Gen Z have never been better." },
      { heading: "🎨 You can have an AI career without coding", body: "Prompt Engineer, AI Product Manager, AI UX Designer, AI Linguist — four HOT jobs that don't require expert coding. Perfect for students good at languages, art, and communication." },
      { heading: "📍 Roadmap from Grade 10 → Job", body: "<b>Grades 10–11:</b> learn basic Math/Programming, play with Teachable Machine. <b>Grade 12:</b> study for IELTS 6.5+, learn Python. <b>Uni:</b> get into FPT/BK/UIT for AI, do GitHub projects. <b>Year 3:</b> intern at VinAI / Zalo." },
    ],
    Sandbox: CareersMapSandbox,
    quiz: [
      { prompt: "Which of the following companies works on AI in Vietnam?",
        items: [
          { id: "a", label: "VinAI Research", bucket: "yes" },
          { id: "b", label: "Zalo AI Lab", bucket: "yes" },
          { id: "c", label: "FPT.AI", bucket: "yes" },
          { id: "d", label: "Sky Mavis (Axie)", bucket: "yes" },
          { id: "e", label: "Hanoi Pho shop village", bucket: "no" },
        ], buckets: [{ id: "yes", label: "VN AI Company ✅" }, { id: "no", label: "It is not" }] },
    ],
  },
  {
    id: "factcheck", emoji: "🧠", Icon: AlertTriangle,
    title: "Critical thinking with AI", tag: "Truth detective",
    desc: "Learn to spot when ChatGPT makes things up (hallucinations) — a survival skill for Gen Z in 2025.",
    gradient: "from-amber-400 via-orange-500 to-rose-600", ring: "ring-amber-400/50",
    badge: { name: "Fact Checker", emoji: "🔍" },
    story: [
      { heading: "🤖 Why does AI lie?", body: "LLMs predict the next word based on probability — they don't fact-check. When they don't know, they make up something that sounds plausible. This phenomenon is called <b>hallucination</b>." },
      { heading: "🚩 4 suspicious signs", body: "1) Extremely specific numbers (2,347,891 people). 2) Detailed historical events. 3) Citations for non-existent "books/newspapers". 4) Names + dates + achievements that sound too perfect." },
      { heading: "✅ Cross-Check Rule", body: "Always verify AI with a <b>second source</b>: Wikipedia, textbooks, Google Scholar, official news. If no source is found → 90% chance the AI made it up." },
    ],
    Sandbox: FactCheckSandbox,
    quiz: [
      { prompt: "Which is a sign that AI might be hallucinating?",
        items: [
          { id: "a", label: "Super specific, strange data", bucket: "red" },
          { id: "b", label: "Citing a 'book' that cannot be found", bucket: "red" },
          { id: "c", label: "Date + Name + Achievement = perfection!", bucket: "red" },
          { id: "d", label: "Answer briefly and include a Wikipedia link", bucket: "ok" },
          { id: "e", label: "Math formulas can be verified", bucket: "ok" },
        ], buckets: [{ id: "red", label: "🚩 Suspicious" }, { id: "ok", label: "✅ More reliable" }] },
    ],
  },
  {
    id: "safety", emoji: "🔐", Icon: ShieldAlert,
    title: "Digital safety in the AI era", tag: "Digital bodyguard",
    desc: "Voice spoofing, classmate deepfakes, and social media bots — how to protect yourself on Zalo and TikTok.",
    gradient: "from-rose-500 via-red-500 to-orange-600", ring: "ring-rose-400/50",
    badge: { name: "Digital Guardian", emoji: "🛡️" },
    story: [
      { heading: "📞 Deepfake voice — the fear of 2025", body: "AI can mimic a parent's voice from just 3 seconds of audio on TikTok. There have been hundreds of money transfer scams in VN with the 'mom had an accident, urgent' trick. <b>Rule:</b> always verify via a second channel before transferring money." },
      { heading: "📸 Deepfake photos & videos of classmates", body: "AI apps allow swapping your face into embarrassing videos in 30 seconds. This is a criminal offense under Decree 53/2022. Tell your teachers + report the platform — never reshare it." },
      { heading: "🤖 AI bots lure users through Messenger/Zalo", body: "Strange accounts claiming to be an 'AI tutor / recruiter' asking for ID cards, portrait photos, or OTP codes. <b>100% scam</b>. Never send personal documents via chat — even to friends (accounts can be hacked)." },
    ],
    Sandbox: DigitalSafetySandbox,
    quiz: [
      { prompt: "How to SAFELY react to deepfakes / AI scams?",
        items: [
          { id: "a", label: "Verify through a second channel before transferring money.", bucket: "safe" },
          { id: "b", label: "Report suspicious accounts to the platform", bucket: "safe" },
          { id: "c", label: "Report to teachers/parents if you encounter a deepfake", bucket: "safe" },
          { id: "d", label: "Sending your ID card to a strange 'AI tutor' for free lessons", bucket: "danger" },
          { id: "e", label: "Resharing a deepfake to 'expose' it", bucket: "danger" },
        ], buckets: [{ id: "safe", label: "Safe ✅" }, { id: "danger", label: "Dangerous ❌" }] },
    ],
  },
  {
    id: "graduation",
    emoji: "🎓",
    Icon: GraduationCap,
    title: "Product Demo & Future Direction",
    tag: "Future Orators",
    desc: "prompt: "Arrange: which example is an intent",
    gradient: "from-amber-400 via-pink-500 to-purple-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "AI Grandmaster", emoji: "🏆" },
    story: [
      {
        heading: "🎤 Presentation = 50% of the product's value",
        body: "Being good at coding without being able to present it is a disadvantage. Steve Jobs once said: <b>'If an idea can't be demoed, it doesn't exist'</b>. Practice telling your AI story with slides, demo videos, and interactive sandboxes.",
      },
      {
        heading: "🛠️ AI builds slides automatically",
        body: "Gamma, Tome, and Beautiful.ai generate slides from a prompt in 30s. Canva Magic Design creates posters. Adobe Express builds videos. You just need to focus on <b>content & storytelling</b>.",
      },
      {
        heading: "🌟 Hot AI careers 2025–2030",
        body: "AI Engineer ($120k+), Prompt Engineer, AI Product Manager, MLOps, AI Ethics Officer, Data Scientist, AI UX Designer. Vietnam is hungry for talent — this is a golden opportunity for Gen Z.",
      },
    ],
    Sandbox: GraduationSandbox,
    quiz: [
      {
        prompt: "AI tools to support presentations?",
        items: [
          { id: "a", label: "Gamma — auto-generate slides", bucket: "yes" },
          { id: "b", label: "Canva Magic Design — poster", bucket: "yes" },
          { id: "c", label: "Adobe Express — video demo", bucket: "yes" },
          { id: "d", label: "Plain text Notepad", bucket: "no" },
          { id: "e", label: "Pocket calculator", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Useful ✅" },
          { id: "no", label: "Inappropriate" },
        ],
      },
      {
        prompt: "What is the structure of a good AI presentation?",
        items: [
          { id: "1", label: "Real-world problems to solve", bucket: "good" },
          { id: "2", label: "AI solutions & live demo", bucket: "good" },
          { id: "3", label: "Convincing statistical results", bucket: "good" },
          { id: "4", label: "Copying someone else's slides exactly", bucket: "bad" },
          { id: "5", label: "Reading the text on the slides word-for-word", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Correct way ✅" },
          { id: "bad", label: "Wrong way ❌" },
        ],
      },
      {
        prompt: "Which careers will be HOT in the AI era 2025–2030?",
        items: [
          { id: "a", label: "AI / ML Engineer", bucket: "hot" },
          { id: "b", label: "Prompt Engineer", bucket: "hot" },
          { id: "c", label: "AI Product Manager", bucket: "hot" },
          { id: "d", label: "AI Ethics Officer", bucket: "hot" },
          { id: "e", label: "Manual copy-paste jobs", bucket: "cold" },
        ],
        buckets: [
          { id: "hot", label: "HOT Job 🔥" },
          { id: "cold", label: "Replaced" },
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
        title: "Almost there! 💪",
        description: `Score:${score}/${track.quiz.length}— try again to unlock your badge!`,
      });
    }
  };


  const activeTrack = useMemo(() => TRACKS.find((t) => t.id === active) ?? null, [active]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <SEO
        title="AI Academy for Middle & High School Students | HaiEduTech"
        description="Super intuitive AI learning for middle and high school students: Computer Vision, NLP Chatbots, Artificial Neural Networks. Interactive sandboxes, drag-and-drop quizzes, badges, and rewards."
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
            alt="AI Academy assistant robot"
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
                <div className="text-xs opacity-90">🏅 Badge</div>
                <div className="text-xl font-black">{totalBadges}/{TRACKS.length}</div>
              </div>
              <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20">
                <div className="text-xs opacity-90">📊 Progress</div>
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
                  <span className="opacity-90">Lesson</span>
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
                  Congratulations! Em đã đạt {totalStars}/{maxStars} sao 🌟
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
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">📖 The Story</h3>
                    </div>

                    {TRACK_ILLUSTRATIONS[activeTrack.id] && (
                      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm ring-1 ring-purple-500/10">
                        <img
                          src={TRACK_ILLUSTRATIONS[activeTrack.id]}
                          alt={`Lesson illustrations${activeTrack.title}`}
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
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">🎮 Interactive Sandbox</h3>
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
              <h3 className="text-2xl font-display font-black mb-1">Congratulations!</h3>
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
