/**
 * AI Academy - gamified AI hub for middle & high school students.
 * All content is authored in English (English-medium track).
 * Each lesson has a story-driven concept panel + interactive sandbox +
 * drag-drop quiz. Progress + reward badges persist in localStorage; track
 * completions also log to Supabase student_activity_log when signed in.
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
import { logStudentActivity } from "@/hooks/useActivityLogger";

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

// AI Academy content is authored in English, so no runtime translation layer.
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
 * SmartText - renders long paragraphs as bullet points when 3+ sentences are
 * detected, otherwise as a single paragraph.
 * Strips inline HTML to keep things safe (only used for plain text fields).
 */
const SmartText = ({ text, className = "", html = false }: { text: string; className?: string; html?: boolean }) => {
  // Protect common abbreviations from being split mid-sentence.
  const ABBR = ["Prof.", "Dr.", "Mr.", "Mrs.", "Ms.", "St.", "vs.", "Ph.D", "e.g.", "i.e.", "approx."];
  const PLACEHOLDER = "\u0001";
  let safe = text;
  ABBR.forEach((a) => { safe = safe.split(a).join(a.replace(/\./g, PLACEHOLDER)); });
  // Also protect numbered list markers like "1.", "2.", "10." so they don't trigger a split.
  safe = safe.replace(/(\b\d{1,2})\.(?=\s)/g, `$1${PLACEHOLDER}`);


  // Only split on real sentence boundaries (. ! ?). Em-dash " - " is parenthetical
  // and must NOT split - keeping it intact preserves the original meaning.
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
    title: "Computer Vision",
    tag: "AI Super Detective",
    desc: "Learn how AI recognizes faces, objects and expressions - the same tech behind FaceID and attendance cameras.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    ring: "ring-cyan-400/50",
    badge: { name: "AI Explorer", emoji: "🔍" },
    story: [
      {
        heading: "📸 How does AI actually 'see'?",
        body: "A digital photo is really a giant grid of numbers - every pixel has 3 values (red, green, blue). For example, a pure red pixel is (255, 0, 0). AI learns to read that grid of numbers to figure out where a face is, or where a ball is.",
      },
      {
        heading: "🧪 What is a bounding box?",
        body: "When an attendance camera runs, AI draws a square frame (box) around a face and labels it 'Lan - 98%'. That square is called a bounding box, and 98% is the confidence score - how sure the AI is.",
      },
      {
        heading: "🎯 Real-world uses",
        body: "iPhone FaceID, traffic cameras reading license plates, TikTok's photo filters, Tesla's self-driving cars - all of them run on Computer Vision.",
      },
    ],
    Sandbox: CVSandbox,
    quiz: [
      {
        prompt: "Drag each item into the right box: which is an 'Input' and which is an 'Output' for an AI Vision system?",
        items: [
          { id: "i1", label: "Photo of a face 📷", bucket: "in" },
          { id: "i2", label: "Camera video feed 🎥", bucket: "in" },
          { id: "i3", label: "Bounding box + label 🏷️", bucket: "out" },
          { id: "i4", label: "Confidence score 95% ✅", bucket: "out" },
        ],
        buckets: [
          { id: "in", label: "Input" },
          { id: "out", label: "Output" },
        ],
      },
      {
        prompt: "Sort these: which one IS Computer Vision, and which one is NOT?",
        items: [
          { id: "a", label: "iPhone FaceID", bucket: "cv" },
          { id: "b", label: "Reading a license plate", bucket: "cv" },
          { id: "c", label: "Translating English to Vietnamese", bucket: "no" },
          { id: "d", label: "Spotify song recommendations", bucket: "no" },
        ],
        buckets: [
          { id: "cv", label: "Computer Vision" },
          { id: "no", label: "Not Vision" },
        ],
      },
      {
        prompt: "Put the model-training steps in order: which happens first, which happens after?",
        items: [
          { id: "1", label: "Collect 10,000 photos 📦", bucket: "first" },
          { id: "2", label: "Label the photos (cat/dog) ✏️", bucket: "first" },
          { id: "3", label: "Let the AI predict a new photo 🚀", bucket: "after" },
        ],
        buckets: [
          { id: "first", label: "Before (Training)" },
          { id: "after", label: "After (Predicting)" },
        ],
      },
    ],
  },
  {
    id: "nlp",
    emoji: "💬",
    Icon: MessageSquare,
    title: "Natural Language Processing",
    tag: "Smart Chatbots",
    desc: "Discover how AI understands slang and typing shortcuts, translates languages, and reads the emotion behind a message.",
    gradient: "from-fuchsia-400 via-purple-500 to-indigo-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "Data Wizard", emoji: "🪄" },
    story: [
      {
        heading: "🔤 Computers don't read words - they read numbers",
        body: "When you type 'hello', AI turns it into a sequence of numbers called tokens. Every word gets its own ID number. This process is called tokenization.",
      },
      {
        heading: "🎯 Intent classification",
        body: "A shop's Messenger chatbot doesn't 'understand' like a human - it guesses your <b>intent</b>: are you asking the price? asking for opening hours? or complaining? Each type of goal is called an intent.",
      },
      {
        heading: "📝 The slang problem",
        body: "People type shortcuts like 'u there?', 'gr8', 'lemme kno'. AI has to <b>normalize</b> this text back to standard words ('are you there?', 'great', 'let me know') before it can process it.",
      },
    ],
    Sandbox: NLPSandbox,
    quiz: [
      {
        prompt: "Sort these: which is the 'Greeting' intent, which is the 'Ask price' intent?",
        items: [
          { id: "a", label: "Hi there, shop!", bucket: "greet" },
          { id: "b", label: "Hello, good morning", bucket: "greet" },
          { id: "c", label: "How much is this shirt?", bucket: "price" },
          { id: "d", label: "What's your wholesale price?", bucket: "price" },
        ],
        buckets: [
          { id: "greet", label: "Greeting 👋" },
          { id: "price", label: "Ask price 💰" },
        ],
      },
      {
        prompt: "Slang to standard English: which pairs are matched correctly?",
        items: [
          { id: "1", label: "'gonna' → 'going to'", bucket: "ok" },
          { id: "2", label: "'idk' → 'I don't know'", bucket: "ok" },
          { id: "3", label: "'hello' → 'goodbye'", bucket: "no" },
          { id: "4", label: "'thanks' → 'sorry'", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Correctly normalized ✅" },
          { id: "no", label: "Wrong ❌" },
        ],
      },
      {
        prompt: "Classify the emotion in each sentence (Sentiment Analysis):",
        items: [
          { id: "a", label: "This movie is amazing! 😍", bucket: "pos" },
          { id: "b", label: "Absolutely love it 💖", bucket: "pos" },
          { id: "c", label: "So boring, waste of time 😡", bucket: "neg" },
          { id: "d", label: "Terrible, couldn't finish it", bucket: "neg" },
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
    title: "Neural Networks",
    tag: "The Brain of AI",
    desc: "A hands-on playground: adjust study hours and sleep hours, and watch AI predict your test score.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    ring: "ring-emerald-400/50",
    badge: { name: "Neural Architect", emoji: "🧬" },
    story: [
      {
        heading: "🔌 Neurons - the building blocks of AI",
        body: "A human brain has about 86 billion neurons. AI simulates each neuron as <b>a tiny decision filter</b>: it takes signals in, multiplies them by weights, and produces a new signal out.",
      },
      {
        heading: "⚖️ Weights - the numbers that matter",
        body: "Every connection between two neurons has a number attached to it, called a weight. When we say 'AI learns', we mean it adjusts millions of these weights until its predictions get closer to correct. For example, starting weight 0.2 might shift to 0.7 after training.",
      },
      {
        heading: "🎨 Generative AI",
        body: "ChatGPT and Midjourney are also neural networks - just massive ones with hundreds of billions of weights. They learn patterns from the internet, then <b>generate</b> brand-new text and images that never existed before.",
      },
    ],
    Sandbox: NeuralNetSandbox,
    quiz: [
      {
        prompt: "What does each neuron in an AI actually do?",
        items: [
          { id: "a", label: "Takes input × weight", bucket: "yes" },
          { id: "b", label: "Produces a new output", bucket: "yes" },
          { id: "c", label: "Comes up with its own ideas", bucket: "no" },
          { id: "d", label: "Feels emotions like a human", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "True ✅" },
          { id: "no", label: "False ❌" },
        ],
      },
      {
        prompt: "Sort these AI systems:",
        items: [
          { id: "a", label: "ChatGPT (generates text)", bucket: "gen" },
          { id: "b", label: "Midjourney (generates images)", bucket: "gen" },
          { id: "c", label: "Spam email filter", bucket: "cls" },
          { id: "d", label: "Handwriting recognition", bucket: "cls" },
        ],
        buckets: [
          { id: "gen", label: "Generative (creates new stuff)" },
          { id: "cls", label: "Classification (sorts into categories)" },
        ],
      },
      {
        prompt: "When an AI predicts WRONG, what does it do to learn?",
        items: [
          { id: "1", label: "Adjusts its weights", bucket: "yes" },
          { id: "2", label: "Repeats this thousands of times", bucket: "yes" },
          { id: "3", label: "Cries and gives up 😭", bucket: "no" },
          { id: "4", label: "Calls a teacher for help", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "What AI does" },
          { id: "no", label: "What AI does NOT do" },
        ],
      },
    ],
  },
  {
    id: "datadet",
    emoji: "🕵️",
    Icon: Database,
    title: "Data Detective",
    tag: "What does AI eat to get smart?",
    desc: "Discover how data feeds AI: clean vs dirty data, structured vs unstructured data, and bias.",
    gradient: "from-blue-400 via-sky-500 to-indigo-600",
    ring: "ring-sky-400/50",
    badge: { name: "Data Detective", emoji: "🔎" },
    story: [
      {
        heading: "🍳 AI is a chef, data is the ingredients",
        body: "Feed an AI <b>dirty</b> data (wrong, missing, skewed) and it cooks up a <b>bad</b> result. This is the rule of <i>Garbage In, Garbage Out</i> - bad input means bad output.",
      },
      {
        heading: "📊 Structured vs unstructured",
        body: "<b>Structured</b> data: spreadsheets, contact lists - neat rows and columns. <b>Unstructured</b> data: selfies, TikTok videos, chat messages - about 80 percent of the world's data is this messy type.",
      },
      {
        heading: "⚖️ Bias - AI can be prejudiced too",
        body: "Early versions of Apple's FaceID <b>struggled to recognize Asian students</b> because it was mostly trained on photos of white faces. Skewed data leads to a skewed AI. That is exactly why VinAI collected one million photos of Vietnamese faces to fix this for local users.",
      },
    ],
    Sandbox: DataDetectiveSandbox,
    quiz: [
      {
        prompt: "Sort these types of data:",
        items: [
          { id: "a", label: "Student grade spreadsheet 📑", bucket: "struct" },
          { id: "b", label: "Sales Excel file", bucket: "struct" },
          { id: "c", label: "Phone contact list", bucket: "struct" },
          { id: "d", label: "Selfie photo 📷", bucket: "unstruct" },
          { id: "e", label: "TikTok video 🎵", bucket: "unstruct" },
          { id: "f", label: "Chat message 💬", bucket: "unstruct" },
        ],
        buckets: [
          { id: "struct", label: "Structured 📊" },
          { id: "unstruct", label: "Unstructured 🎨" },
        ],
      },
      {
        prompt: "Which of these is 'dirty data' that needs cleaning?",
        items: [
          { id: "1", label: "Student age = -5", bucket: "dirty" },
          { id: "2", label: "Height = 999 cm", bucket: "dirty" },
          { id: "3", label: "Name field left blank", bucket: "dirty" },
          { id: "4", label: "Math score = 8.5", bucket: "clean" },
          { id: "5", label: "Age = 14", bucket: "clean" },
        ],
        buckets: [
          { id: "dirty", label: "Needs cleaning 🧹" },
          { id: "clean", label: "Already clean ✅" },
        ],
      },
      {
        prompt: "Why did early FaceID struggle with Vietnamese students?",
        items: [
          { id: "a", label: "The training data was skewed toward Western faces", bucket: "yes" },
          { id: "b", label: "This is called 'bias' caused by data", bucket: "yes" },
          { id: "c", label: "Because Vietnamese faces are 'ugly'", bucket: "no" },
          { id: "d", label: "Because AI hates students", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Correct ✅" },
          { id: "no", label: "Wrong ❌" },
        ],
      },
    ],
  },
  {
    id: "mlmagic",
    emoji: "🎩",
    Icon: Sparkles,
    title: "Machine Learning Made Simple",
    tag: "Supervised vs Unsupervised",
    desc: "The two most visual algorithms in AI: Decision Trees (learning with a teacher) and K-Means (learning by discovery).",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    ring: "ring-violet-400/50",
    badge: { name: "ML Magician", emoji: "🪄" },
    story: [
      {
        heading: "🌳 A decision tree is like a game of '20 Questions'",
        body: "AI plays 20 Questions with Yes/No answers: 'Does it have feathers?' then 'Can it fly?' then <b>Bird!</b>. This is a <b>Decision Tree</b> (a tree of yes/no branches) - easy to understand, easy to explain, and surprisingly accurate for many problems.",
      },
      {
        heading: "🎨 K-Means - AI that groups things by itself",
        body: "Give AI 20 scattered dots and it groups them into K clusters of nearby points, <b>with no one telling it the labels</b>. Shopee uses K-Means (an unsupervised grouping algorithm) to cluster customers with similar interests and suggest products.",
      },
      {
        heading: "🎓 Supervised vs Unsupervised",
        body: "<b>Supervised</b> learning means the data has labels, like a teacher grading answers. <b>Unsupervised</b> learning means the data has no labels, and AI discovers the patterns on its own. That's the whole difference!",
      },
    ],
    Sandbox: MLMagicSandbox,
    quiz: [
      {
        prompt: "Which problems are Supervised, and which are Unsupervised?",
        items: [
          { id: "a", label: "Filtering spam email (labeled spam/not-spam)", bucket: "sup" },
          { id: "b", label: "Predicting house price (has real price data)", bucket: "sup" },
          { id: "c", label: "English to Vietnamese translation (has sample sentence pairs)", bucket: "sup" },
          { id: "d", label: "Grouping customers by behavior", bucket: "unsup" },
          { id: "e", label: "Detecting unusual, suspicious transactions", bucket: "unsup" },
          { id: "f", label: "Grouping songs with similar melodies", bucket: "unsup" },
        ],
        buckets: [
          { id: "sup", label: "Supervised 👨‍🏫" },
          { id: "unsup", label: "Unsupervised 🔍" },
        ],
      },
      {
        prompt: "How does a decision tree actually work?",
        items: [
          { id: "a", label: "Asks a chain of Yes/No questions", bucket: "yes" },
          { id: "b", label: "Splits data into smaller branches", bucket: "yes" },
          { id: "c", label: "Easy for humans to explain", bucket: "yes" },
          { id: "d", label: "Needs a super powerful GPU to run", bucket: "no" },
          { id: "e", label: "Only works with images", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "True ✅" },
          { id: "no", label: "False ❌" },
        ],
      },
      {
        prompt: "What does the K in K-Means mean?",
        items: [
          { id: "1", label: "The number of clusters to divide into", bucket: "yes" },
          { id: "2", label: "A setting the person chooses beforehand", bucket: "yes" },
          { id: "3", label: "The name of a programming language", bucket: "no" },
          { id: "4", label: "How fast the AI runs", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "True ✅" },
          { id: "no", label: "False ❌" },
        ],
      },
    ],
  },
  {
    id: "genai",
    emoji: "✨",
    Icon: Wand2,
    title: "Generative AI",
    tag: "The Creative World",
    desc: "Discover how AI writes stories and paints pictures from a written instruction (a Prompt), then try becoming a Prompt Master yourself.",
    gradient: "from-pink-400 via-fuchsia-500 to-purple-600",
    ring: "ring-pink-400/50",
    badge: { name: "Prompt Master", emoji: "🪄" },
    story: [
      {
        heading: "🎨 What is Generative AI?",
        body: "Unlike a 'classifying' AI (which just guesses cat or dog), <b>Generative AI</b> produces brand-new content: images, text, music, video that never existed on the internet before.",
      },
      {
        heading: "📝 Prompt - the magic instruction",
        body: "You command AI using a <b>prompt</b> (a written instruction). The more specific your prompt (subject + style + lighting + mood), the better the result. That is exactly why companies pay 'Prompt Engineers' salaries around $200,000 a year.",
      },
      {
        heading: "⚖️ Hallucination - when AI makes things up",
        body: "Generative AI sometimes invents information that sounds very convincing (this is called hallucination). Always <b>double-check</b> before trusting ChatGPT's answer on your homework!",
      },
    ],
    Sandbox: GenAISandbox,
    quiz: [
      {
        prompt: "Which AI is Generative, and which is NOT?",
        items: [
          { id: "a", label: "ChatGPT writing an essay", bucket: "gen" },
          { id: "b", label: "Midjourney painting a picture", bucket: "gen" },
          { id: "c", label: "Suno creating a song", bucket: "gen" },
          { id: "d", label: "Camera reading a license plate", bucket: "no" },
          { id: "e", label: "Filtering spam email", bucket: "no" },
        ],
        buckets: [
          { id: "gen", label: "Generative ✨" },
          { id: "no", label: "Not Generative" },
        ],
      },
      {
        prompt: "Sort these prompts into 'clear' vs 'vague':",
        items: [
          { id: "1", label: "'draw a cat'", bucket: "bad" },
          { id: "2", label: "'something nice looking'", bucket: "bad" },
          { id: "3", label: "'orange cat sitting by a Hanoi window, sunset, watercolor style'", bucket: "good" },
          { id: "4", label: "'silver metal robot, sci-fi neon lights, side angle, 4K'", bucket: "good" },
        ],
        buckets: [
          { id: "good", label: "Clear ✅" },
          { id: "bad", label: "Vague ❌" },
        ],
      },
      {
        prompt: "ChatGPT answers confidently but incorrectly - what is this called?",
        items: [
          { id: "a", label: "Hallucination 🤖", bucket: "yes" },
          { id: "b", label: "AI making up information", bucket: "yes" },
          { id: "c", label: "AI thinking like a human", bucket: "no" },
          { id: "d", label: "AI having real confidence as a feeling", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Correct explanation" },
          { id: "no", label: "Misunderstanding" },
        ],
      },
    ],
  },
  {
    id: "rl",
    emoji: "🎮",
    Icon: Car,
    title: "Reinforcement Learning",
    tag: "Learning by Trial and Error",
    desc: "Learn how AI improves its own behavior through a Reward-Punishment system to steer a self-driving car around obstacles.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    ring: "ring-emerald-400/50",
    badge: { name: "RL Strategist", emoji: "🧭" },
    story: [
      {
        heading: "🎯 What is Reinforcement Learning?",
        body: "Unlike supervised learning (which gets photos plus labels), Reinforcement Learning (RL) has <b>no labels at all</b>. An agent <b>tries, fails, and earns points</b>: correct moves get rewarded, mistakes get punished. Repeat this millions of times and it discovers the best strategy on its own.",
      },
      {
        heading: "🏎️ Self-driving cars like Tesla and Waymo",
        body: "Every meter driven correctly in lane = +points, every collision = a huge -points penalty. After billions of kilometers in simulation, the AI learns on its own how to <b>avoid pedestrians, stop at red lights, and park</b> without anyone teaching it step by step.",
      },
      {
        heading: "♟️ AlphaGo and DeepMind",
        body: "Google DeepMind used RL to teach an AI to play the board game Go - and it beat world champion Lee Sedol in 2016. The AI didn't learn from books, it <b>played against itself</b> millions of times.",
      },
    ],
    Sandbox: RLSandbox,
    quiz: [
      {
        prompt: "What is the main learning signal in Reinforcement Learning?",
        items: [
          { id: "a", label: "Reward (+points) for correct actions", bucket: "yes" },
          { id: "b", label: "Punishment (-points) for mistakes", bucket: "yes" },
          { id: "c", label: "An exact correct label for every single step", bucket: "no" },
          { id: "d", label: "Someone saying 'right/wrong' out loud constantly", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "RL signal ✅" },
          { id: "no", label: "Not RL" },
        ],
      },
      {
        prompt: "Which applications use Reinforcement Learning?",
        items: [
          { id: "1", label: "Tesla self-driving car 🚗", bucket: "rl" },
          { id: "2", label: "AlphaGo playing Go ♟️", bucket: "rl" },
          { id: "3", label: "Self-charging robot vacuum 🤖", bucket: "rl" },
          { id: "4", label: "Pocket calculator 🧮", bucket: "no" },
          { id: "5", label: "Static HTML webpage 📄", bucket: "no" },
        ],
        buckets: [
          { id: "rl", label: "Uses RL" },
          { id: "no", label: "Doesn't need RL" },
        ],
      },
      {
        prompt: "If the collision penalty is much higher than the speed reward, what will the agent do?",
        items: [
          { id: "a", label: "Drive slowly, avoid obstacles", bucket: "ok" },
          { id: "b", label: "Prioritize safety", bucket: "ok" },
          { id: "c", label: "Crash straight into everything", bucket: "no" },
          { id: "d", label: "Give up and stand still forever", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Correct behavior ✅" },
          { id: "no", label: "Wrong logic ❌" },
        ],
      },
    ],
  },
  {
    id: "ethics",
    emoji: "⚖️",
    Icon: Scale,
    title: "AI Ethics and Safety",
    tag: "The Fair Assistant",
    desc: "Become a technology guardian: filter data and remove bias to keep AI objective and safe for everyone.",
    gradient: "from-purple-400 via-fuchsia-500 to-violet-600",
    ring: "ring-purple-400/50",
    badge: { name: "Ethics Guardian", emoji: "🛡️" },
    story: [
      {
        heading: "🔬 AI learns from data",
        body: "AI <b>has no consciousness</b>. It only finds patterns in data. If the data is skewed, the AI becomes skewed too - this is called <b>Bias</b>.",
      },
      {
        heading: "📰 The Amazon 2018 lesson",
        body: "Amazon once used AI to screen job resumes. Because most engineers hired over the previous 10 years were men, the AI 'learned' that female candidates were less suitable, and it automatically rejected resumes containing phrases like 'women's chess club'. Amazon had to shut the system down.",
      },
      {
        heading: "🛡️ How do we fix it?",
        body: "1) Collect <b>diverse</b> data (across gender, region, age). 2) Measure fairness with proper metrics. 3) Keep a human <b>supervisor</b> in the loop. This is the job of an AI Ethics Engineer.",
      },
    ],
    Sandbox: EthicsSandbox,
    quiz: [
      {
        prompt: "What causes AI to become biased?",
        items: [
          { id: "a", label: "Skewed training data", bucket: "yes" },
          { id: "b", label: "Lack of diversity among data labelers", bucket: "yes" },
          { id: "c", label: "A poorly chosen optimization goal", bucket: "yes" },
          { id: "d", label: "AI hating a certain group of people", bucket: "no" },
          { id: "e", label: "AI having personal feelings", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Real cause" },
          { id: "no", label: "Misunderstanding of AI" },
        ],
      },
      {
        prompt: "Which situation is an example of AI bias?",
        items: [
          { id: "1", label: "Hiring AI rejects female resumes", bucket: "bias" },
          { id: "2", label: "AI recognizes darker skin tones less accurately than lighter ones", bucket: "bias" },
          { id: "3", label: "AI recommends books based on reading history", bucket: "ok" },
          { id: "4", label: "AI translates English to Vietnamese", bucket: "ok" },
        ],
        buckets: [
          { id: "bias", label: "Biased ⚠️" },
          { id: "ok", label: "Normal" },
        ],
      },
      {
        prompt: "How can we reduce bias in AI?",
        items: [
          { id: "a", label: "Use diverse data", bucket: "yes" },
          { id: "b", label: "Keep a human reviewer for results", bucket: "yes" },
          { id: "c", label: "Measure fairness regularly", bucket: "yes" },
          { id: "d", label: "Let AI decide everything on its own", bucket: "no" },
          { id: "e", label: "Hide the errors", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Right approach ✅" },
          { id: "no", label: "Wrong approach ❌" },
        ],
      },
    ],
  },
  {
    id: "recsys",
    emoji: "📊",
    Icon: Database,
    title: "Data Analysis and Recommendations",
    tag: "The Data Treasure Chest",
    desc: "Discover how YouTube and TikTok's algorithms learn your interests, then try building your own smart content-recommendation filter.",
    gradient: "from-amber-400 via-orange-500 to-yellow-600",
    ring: "ring-amber-400/50",
    badge: { name: "Data Engineer", emoji: "📈" },
    story: [
      {
        heading: "📦 Data is the oil of the 21st century",
        body: "Every second worldwide: 6 million Google searches, 500 hours of video uploaded to YouTube, 100 million Instagram stories posted. Whoever knows how to <b>mine</b> that data holds gold.",
      },
      {
        heading: "🎯 The interest vector",
        body: "An app represents you as a sequence of numbers (a vector) for each topic: sports 0.9, gaming 0.7, music 0.3, and so on. Every video also has its own vector. AI computes <b>cosine similarity</b> (a way to measure how close two vectors are) to decide what to recommend.",
      },
      {
        heading: "⚠️ The filter bubble",
        body: "The higher the similarity threshold, the more AI only recommends content that is <b>almost identical</b> to what you already like, trapping you inside a 'bubble'. Deliberately watch varied content to keep your view of the world wide open!",
      },
    ],
    Sandbox: RecsysSandbox,
    quiz: [
      {
        prompt: "Which apps rely heavily on a Recommender System?",
        items: [
          { id: "a", label: "TikTok 🎵", bucket: "yes" },
          { id: "b", label: "Netflix 🎬", bucket: "yes" },
          { id: "c", label: "Shopee Mall 🛍️", bucket: "yes" },
          { id: "d", label: "Pocket calculator 🧮", bucket: "no" },
          { id: "e", label: "Simple notepad app 📝", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Uses Recommender" },
          { id: "no", label: "Doesn't need one" },
        ],
      },
      {
        prompt: "Which data does AI actually collect to understand you?",
        items: [
          { id: "1", label: "View count and watch time", bucket: "use" },
          { id: "2", label: "Likes / shares / comments", bucket: "use" },
          { id: "3", label: "Who you follow", bucket: "use" },
          { id: "4", label: "Reading your thoughts directly 🧠", bucket: "no" },
        ],
        buckets: [
          { id: "use", label: "Real data" },
          { id: "no", label: "Not possible" },
        ],
      },
      {
        prompt: "Why is a too-high similarity threshold harmful?",
        items: [
          { id: "a", label: "You only see one point of view", bucket: "bad" },
          { id: "b", label: "Harder to reach different perspectives", bucket: "bad" },
          { id: "c", label: "You learn lots of new things", bucket: "good" },
          { id: "d", label: "Broadens your thinking", bucket: "good" },
        ],
        buckets: [
          { id: "bad", label: "Downside ⚠️" },
          { id: "good", label: "Upside" },
        ],
      },
    ],
  },
  {
    id: "aiot",
    emoji: "🌐",
    Icon: Radio,
    title: "AI of Things",
    tag: "The City of the Future",
    desc: "Connect AI to physical devices to automate traffic lights that fight congestion, and run a smart-city model.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    ring: "ring-cyan-400/50",
    badge: { name: "AIoT Architect", emoji: "🛰️" },
    story: [
      {
        heading: "📡 What is IoT?",
        body: "Internet of Things (IoT) means devices with sensors plus an internet connection. Lights, cameras, fridges, smartwatches are all IoT. Add AI to that and you get <b>AIoT</b>: devices that make decisions by themselves.",
      },
      {
        heading: "🚦 Smart traffic lights",
        body: "Sensors count cars from all 4 directions, a microcontroller runs an <b>If-Else</b> rule, and it gives priority to the busiest direction. Singapore cut red-light waiting time by 25 percent using AIoT.",
      },
      {
        heading: "🏙️ Smart City",
        body: "Streetlights turn on automatically when someone walks by, trash bins report when they're full, parking lots point to open spots, bus stops predict arrival times - all powered by AIoT coordinating millions of devices.",
      },
    ],
    Sandbox: AIoTSandbox,
    quiz: [
      {
        prompt: "Which of these devices count as IoT?",
        items: [
          { id: "a", label: "Smartwatch ⌚", bucket: "iot" },
          { id: "b", label: "Online security camera 📹", bucket: "iot" },
          { id: "c", label: "Smart fridge 🧊", bucket: "iot" },
          { id: "d", label: "Regular wooden table 🪵", bucket: "no" },
          { id: "e", label: "A ballpoint pen 🖊️", bucket: "no" },
        ],
        buckets: [
          { id: "iot", label: "Is IoT" },
          { id: "no", label: "Not IoT" },
        ],
      },
      {
        prompt: "How do smart traffic lights actually work?",
        items: [
          { id: "1", label: "Sensors count cars", bucket: "yes" },
          { id: "2", label: "Microcontroller runs If-Else rules", bucket: "yes" },
          { id: "3", label: "Green light given to busiest direction", bucket: "yes" },
          { id: "4", label: "A police officer presses a button manually 👮", bucket: "no" },
          { id: "5", label: "Random lottery draw 🎲", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "AIoT mechanism" },
          { id: "no", label: "Not this" },
        ],
      },
      {
        prompt: "What are the benefits of a Smart City?",
        items: [
          { id: "a", label: "Reduces traffic congestion", bucket: "good" },
          { id: "b", label: "Saves streetlight electricity", bucket: "good" },
          { id: "c", label: "Reports full trash bins in time", bucket: "good" },
          { id: "d", label: "Makes citizens lazier", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Benefit ✅" },
          { id: "bad", label: "Misconception" },
        ],
      },
    ],
  },
  {
    id: "capstone",
    emoji: "🤖",
    Icon: Cpu,
    title: "Build Your Own AI Assistant",
    tag: "Your First Project",
    desc: "The final showdown! Combine every piece of technology you've learned to assemble and run your own super assistant robot.",
    gradient: "from-amber-400 via-fuchsia-500 to-purple-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "AI Certified Guru", emoji: "🏆" },
    story: [
      {
        heading: "🧩 Integration is the most important skill",
        body: "A truly useful AI is never good at just one thing. Assistants like Siri or Google Assistant combine <b>Vision</b> (reading a QR code), <b>NLP</b> (listening to a command), <b>Neural Networks</b> (reasoning), and <b>Ethics</b> (filtering harmful content).",
      },
      {
        heading: "🔧 The AI assembly process",
        body: "1) Choose the right modules. 2) Plug them into the processing core. 3) Run a diagnostic boot. 4) Test with real data. 5) Repeat until it's stable.",
      },
      {
        heading: "🏆 You've reached the end of the journey!",
        body: "Finishing the Capstone officially makes you an <b>AI Certified Guru</b> from HaiEduTech. What's next? Sign up for the Python programming class with Teacher Hai to turn this assistant into real, working code!",
      },
    ],
    Sandbox: CapstoneSandbox,
    quiz: [
      {
        prompt: "Which technologies does a good AI assistant need to combine?",
        items: [
          { id: "a", label: "Computer Vision 👁️", bucket: "yes" },
          { id: "b", label: "NLP 💬", bucket: "yes" },
          { id: "c", label: "Neural Network 🧠", bucket: "yes" },
          { id: "d", label: "Ethics & Safety 🛡️", bucket: "yes" },
          { id: "e", label: "Pure luck and guessing 🎲", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Needed" },
          { id: "no", label: "Not needed" },
        ],
      },
      {
        prompt: "What is the correct process for building an AI product?",
        items: [
          { id: "1", label: "Define the problem", bucket: "right" },
          { id: "2", label: "Collect the data", bucket: "right" },
          { id: "3", label: "Train and evaluate", bucket: "right" },
          { id: "4", label: "Code randomly with no plan", bucket: "wrong" },
          { id: "5", label: "Skip testing and deploy right away", bucket: "wrong" },
        ],
        buckets: [
          { id: "right", label: "Correct process ✅" },
          { id: "wrong", label: "Wrong approach ❌" },
        ],
      },
      {
        prompt: "What should you do after graduating from AI Academy?",
        items: [
          { id: "a", label: "Learn Python with Teacher Hai", bucket: "good" },
          { id: "b", label: "Enter an AI Olympiad", bucket: "good" },
          { id: "c", label: "Build a small project on Lovable", bucket: "good" },
          { id: "d", label: "Shut the laptop and go to sleep 😴", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Great next step 🚀" },
          { id: "bad", label: "A missed opportunity" },
        ],
      },
    ],
  },
  {
    id: "deepfake",
    emoji: "🕵️",
    Icon: ShieldAlert,
    title: "AI Detection and Security",
    tag: "Security Detective",
    desc: "Expose deepfake technology, learn to tell real from fake, and protect your personal images online.",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    ring: "ring-rose-400/50",
    badge: { name: "Cyber Shield", emoji: "🛡️" },
    story: [
      {
        heading: "🎭 What is a deepfake?",
        body: "A deepfake uses <b>Generative AI</b> to swap one person's face onto another person's video - often almost impossible to spot with the naked eye. Fake videos of CEOs, politicians, and even friends asking to borrow money over chat apps have already appeared.",
      },
      {
        heading: "🔬 The traces AI leaves behind",
        body: "Blurry hairlines or ears, shadows falling the wrong way, unnatural blinking, warped teeth, skin lighting that doesn't match the background. Forensic software zooms in to check the <b>noise pattern</b> a real camera sensor produces.",
      },
      {
        heading: "🛡️ Protecting yourself",
        body: "1) Don't post public HD close-up portraits. 2) Turn on two-factor authentication (2FA). 3) Make a video call to verify when someone asks to borrow money. 4) Report offensive deepfakes to your country's cybersecurity authority.",
      },
    ],
    Sandbox: DeepfakeSandbox,
    quiz: [
      {
        prompt: "Which signs expose a video as a deepfake?",
        items: [
          { id: "a", label: "Blurry hairline or ears", bucket: "yes" },
          { id: "b", label: "Shadows falling the wrong direction", bucket: "yes" },
          { id: "c", label: "Very little blinking", bucket: "yes" },
          { id: "d", label: "Sharp, clear 4K HD footage", bucket: "no" },
          { id: "e", label: "Has subtitles", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Deepfake warning sign ⚠️" },
          { id: "no", label: "Normal" },
        ],
      },
      {
        prompt: "How can you protect your personal photos from being misused?",
        items: [
          { id: "1", label: "Turn on 2FA for every account", bucket: "ok" },
          { id: "2", label: "Limit posting public HD photos", bucket: "ok" },
          { id: "3", label: "Video-call to verify anyone asking for money", bucket: "ok" },
          { id: "4", label: "Share your ID card on Facebook", bucket: "no" },
          { id: "5", label: "Post selfies tagged with your home address", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Safe ✅" },
          { id: "no", label: "Dangerous ❌" },
        ],
      },
      {
        prompt: "Which situation COULD be a deepfake scam?",
        items: [
          { id: "a", label: "Your boss urgently video-calls demanding a bank transfer", bucket: "scam" },
          { id: "b", label: "A close friend on video asks to urgently borrow money", bucket: "scam" },
          { id: "c", label: "Mom calls on a normal phone call to check in", bucket: "ok" },
          { id: "d", label: "Your cousin texts about a birthday party", bucket: "ok" },
        ],
        buckets: [
          { id: "scam", label: "Be cautious ⚠️" },
          { id: "ok", label: "Normal" },
        ],
      },
    ],
  },
  {
    id: "agent",
    emoji: "🤖",
    Icon: Bot,
    title: "Prompt Engineering and AI Agents",
    tag: "The All-Purpose Assistant",
    desc: "Learn to design AI Agents that think for themselves, read the news, and handle complex multi-step tasks for you.",
    gradient: "from-indigo-500 via-blue-600 to-violet-600",
    ring: "ring-indigo-400/50",
    badge: { name: "Agent Commander", emoji: "🎖️" },
    story: [
      {
        heading: "🧠 What is an AI Agent?",
        body: "A chatbot just answers a single question. An <b>AI Agent</b> runs a <b>thinking loop</b>: it takes a goal, plans steps on its own, calls tools (search the web, send an email, book a ticket), observes the result, and repeats until the goal is done.",
      },
      {
        heading: "🔧 Tool use",
        body: "Your agent can have many 'hands': a weather API, an SMS sender, an Excel reader, a chart generator. You just give a command: 'Every morning at 6am, check the Hanoi weather, and if it's raining, text me a reminder to bring an umbrella.'",
      },
      {
        heading: "🚀 Prompt engineering",
        body: "A good prompt for an agent includes: a <b>Role</b> (You are a specialist in...), a <b>Goal</b>, <b>Constraints</b> (English only, under 300 words), and an <b>Output format</b> (JSON, table). This is one of the hottest skills of 2025.",
      },
    ],
    Sandbox: AgentWorkflowSandbox,
    quiz: [
      {
        prompt: "What is the difference between a Chatbot and an AI Agent?",
        items: [
          { id: "a", label: "Agent plans multiple steps on its own", bucket: "agent" },
          { id: "b", label: "Agent can call outside tools/APIs", bucket: "agent" },
          { id: "c", label: "Agent repeats actions until the goal is met", bucket: "agent" },
          { id: "d", label: "Only answers a single isolated question", bucket: "bot" },
          { id: "e", label: "Cannot access the internet", bucket: "bot" },
        ],
        buckets: [
          { id: "agent", label: "AI Agent 🤖" },
          { id: "bot", label: "Regular chatbot" },
        ],
      },
      {
        prompt: "What makes up a good prompt?",
        items: [
          { id: "1", label: "A role (You are...)", bucket: "good" },
          { id: "2", label: "A clear goal", bucket: "good" },
          { id: "3", label: "Constraints and an output format", bucket: "good" },
          { id: "4", label: "Vague wording, open to any interpretation", bucket: "bad" },
          { id: "5", label: "Never telling the AI what to actually do", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Good prompt ✅" },
          { id: "bad", label: "Bad prompt ❌" },
        ],
      },
      {
        prompt: "Which use case makes sense for an AI Agent?",
        items: [
          { id: "a", label: "Automatically build a study schedule around deadlines", bucket: "ok" },
          { id: "b", label: "Summarize the morning news", bucket: "ok" },
          { id: "c", label: "Book the cheapest train ticket next week", bucket: "ok" },
          { id: "d", label: "Attend in-person school for you 🏫", bucket: "no" },
        ],
        buckets: [
          { id: "ok", label: "Agent can do this" },
          { id: "no", label: "Cannot replace this" },
        ],
      },
    ],
  },
  {
    id: "study", emoji: "🎓", Icon: BookOpen,
    title: "AI-Powered Smart Studying", tag: "Ace School with AI",
    desc: "Use ChatGPT, NotebookLM and Gemini the right way to study and review for tests - without letting AI do the work for you.",
    gradient: "from-blue-400 via-sky-500 to-cyan-600", ring: "ring-blue-400/50",
    badge: { name: "Smart Learner", emoji: "📚" },
    story: [
      { heading: "🧠 AI is a tutor, not an answer key", body: "AI is great at explaining steps, offering examples, and checking your reasoning. If you paste in a question and say 'do it for me', you lose the chance to think it through yourself. Ask AI to <b>explain the method</b> instead of asking it to <b>do it for you</b>." },
      { heading: "📚 NotebookLM - a tutor that reads your PDFs", body: "Upload a lecture PDF or textbook chapter and AI generates a summary, flashcards, and even a podcast you can listen to on the go. One of the most powerful tools for exam prep in 2025." },
      { heading: "🎯 Teacher Hai's 3-step rule", body: "<b>1. Try it yourself first</b> - only ask AI when you're genuinely stuck. <b>2. Ask for a step-by-step explanation</b> - not just the final answer. <b>3. Double-check</b> against your textbook or your teacher." },
    ],
    Sandbox: StudySmartSandbox,
    quiz: [
      { prompt: "Which of these is a SMART way to study with AI?",
        items: [
          { id: "a", label: "Ask AI to explain each step", bucket: "smart" },
          { id: "b", label: "Ask AI 'why' after every answer", bucket: "smart" },
          { id: "c", label: "Use NotebookLM to summarize a lecture PDF", bucket: "smart" },
          { id: "d", label: "Copy the whole question and submit AI's answer as your own", bucket: "lazy" },
          { id: "e", label: "Trust it blindly with no fact-checking", bucket: "lazy" },
        ], buckets: [{ id: "smart", label: "Smart ✅" }, { id: "lazy", label: "Lazy and risky ❌" }] },
    ],
  },
  {
    id: "careers", emoji: "💼", Icon: Briefcase,
    title: "Mapping AI Careers in Vietnam", tag: "Career Compass",
    desc: "Explore 8 hot AI careers at companies like VinAI, FPT.AI, Zalo and Sky Mavis - and a roadmap from grade 10 to your dream job.",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600", ring: "ring-violet-400/50",
    badge: { name: "Career Explorer", emoji: "🗺️" },
    story: [
      { heading: "🚀 Vietnam is hungry for AI talent", body: "VinAI, FPT.AI, Zalo AI Lab and VinBigdata hire over 2,000 AI engineers every year. Salaries range from about 25 million VND per month for juniors to over 100 million VND for seniors. Opportunities for Gen Z have never been better." },
      { heading: "🎨 You don't need to code to have an AI career", body: "Prompt Engineer, AI Product Manager, AI UX Designer, AI Linguist - four hot careers that don't require serious coding skills. Great fits for students who are strong in language, design, or communication." },
      { heading: "📍 The roadmap from grade 10 to a job", body: "<b>Grades 10-11:</b> study basic math and programming, play with Teachable Machine. <b>Grade 12:</b> aim for IELTS 6.5+, learn Python. <b>University:</b> apply to AI programs at schools like FPT, Bach Khoa, or UIT, and build open-source projects on GitHub. <b>3rd year of university:</b> intern at VinAI or Zalo." },
    ],
    Sandbox: CareersMapSandbox,
    quiz: [
      { prompt: "Which of these companies do AI work in Vietnam?",
        items: [
          { id: "a", label: "VinAI Research", bucket: "yes" },
          { id: "b", label: "Zalo AI Lab", bucket: "yes" },
          { id: "c", label: "FPT.AI", bucket: "yes" },
          { id: "d", label: "Sky Mavis (Axie)", bucket: "yes" },
          { id: "e", label: "A local pho restaurant", bucket: "no" },
        ], buckets: [{ id: "yes", label: "Vietnamese AI company ✅" }, { id: "no", label: "Not one" }] },
    ],
  },
  {
    id: "factcheck", emoji: "🧠", Icon: AlertTriangle,
    title: "Critical Thinking with AI", tag: "Truth Detective",
    desc: "Learn how to spot when ChatGPT makes things up (hallucination) - an essential survival skill for Gen Z in 2025.",
    gradient: "from-amber-400 via-orange-500 to-rose-600", ring: "ring-amber-400/50",
    badge: { name: "Fact Checker", emoji: "🔍" },
    story: [
      { heading: "🤖 Why does AI make things up?", body: "An LLM (Large Language Model) predicts the next word based on probability - it never checks facts. When it doesn't know something, it invents a sentence that just sounds plausible. This is called <b>hallucination</b>." },
      { heading: "🚩 4 warning signs to watch for", body: "1) Suspiciously exact numbers (like 2,347,891 people). 2) Highly detailed historical events. 3) Quotes from a 'book' or 'article' that doesn't actually exist. 4) A person's name plus a date plus an achievement that sounds too perfect." },
      { heading: "✅ The cross-check rule", body: "Always verify AI's claims against a <b>second source</b>: Wikipedia, your textbook, Google Scholar, or a trustworthy news outlet. If you can't find a source, there's a 90 percent chance AI made it up." },
    ],
    Sandbox: FactCheckSandbox,
    quiz: [
      { prompt: "Which of these is a sign AI might be making something up?",
        items: [
          { id: "a", label: "Oddly specific, unusual statistics", bucket: "red" },
          { id: "b", label: "A quote from a 'book' you can't find", bucket: "red" },
          { id: "c", label: "A date plus a name plus a too-perfect achievement", bucket: "red" },
          { id: "d", label: "A short answer with a Wikipedia link attached", bucket: "ok" },
          { id: "e", label: "A math formula you can verify yourself", bucket: "ok" },
        ], buckets: [{ id: "red", label: "🚩 Suspicious" }, { id: "ok", label: "✅ More trustworthy" }] },
    ],
  },
  {
    id: "safety", emoji: "🔐", Icon: ShieldAlert,
    title: "Digital Safety in the AI Era", tag: "The Digital Bodyguard",
    desc: "Voice-clone scams, classmate deepfakes, bots luring you on social media - how to stay safe on Zalo and TikTok.",
    gradient: "from-rose-500 via-red-500 to-orange-600", ring: "ring-rose-400/50",
    badge: { name: "Digital Guardian", emoji: "🛡️" },
    story: [
      { heading: "📞 Voice deepfakes - the fear of 2025", body: "AI can clone a parent's voice from just 3 seconds of audio taken off TikTok. There have already been hundreds of money-transfer scams using the line 'Mom had an accident, I need money urgently'. <b>Rule:</b> always verify through a second channel before sending money." },
      { heading: "📸 Deepfake photos and videos of classmates", body: "AI apps can paste your face onto an embarrassing video in 30 seconds. This is a criminal offense under cybersecurity law. Tell a teacher, report it to the platform - and never share it further." },
      { heading: "🤖 AI bots luring people on Messenger or Zalo", body: "A stranger's account claiming to be an 'AI tutor' or 'recruiter' asks for your ID, ID photo, or OTP code. This is <b>100 percent a scam</b>. Never send personal documents over chat - even to friends, since their accounts could be hacked." },
    ],
    Sandbox: DigitalSafetySandbox,
    quiz: [
      { prompt: "What is the SAFE way to respond to deepfakes or AI scams?",
        items: [
          { id: "a", label: "Verify through a second channel before sending money", bucket: "safe" },
          { id: "b", label: "Report suspicious accounts to the platform", bucket: "safe" },
          { id: "c", label: "Tell a teacher or parent when you encounter a deepfake", bucket: "safe" },
          { id: "d", label: "Send your ID to a stranger 'AI tutor' for free lessons", bucket: "danger" },
          { id: "e", label: "Reshare a deepfake to 'expose' it", bucket: "danger" },
        ], buckets: [{ id: "safe", label: "Safe ✅" }, { id: "danger", label: "Dangerous ❌" }] },
    ],
  },
  {
    id: "graduation",
    emoji: "🎓",
    Icon: GraduationCap,
    title: "Presenting Your Project and Charting Your Path",
    tag: "The Future Speaker",
    desc: "Use AI to build presentation slides for your final project, and explore the most exciting future careers in technology.",
    gradient: "from-amber-400 via-pink-500 to-purple-600",
    ring: "ring-fuchsia-400/50",
    badge: { name: "AI Grandmaster", emoji: "🏆" },
    story: [
      {
        heading: "🎤 Presenting is 50 percent of a project's value",
        body: "Great code that can't be presented well is a wasted opportunity. Steve Jobs once said: <b>'An idea that can't be demoed doesn't exist.'</b> Practice telling your AI story through slides, demo videos, and interactive sandboxes.",
      },
      {
        heading: "🛠️ AI that builds slides for you",
        body: "Gamma, Tome, and Beautiful.ai generate slides from a prompt in 30 seconds. Canva Magic Design creates posters. Adobe Express builds videos. That leaves you free to focus on the <b>content and the story</b>.",
      },
      {
        heading: "🌟 Hot AI careers for 2025-2030",
        body: "AI Engineer ($120k+), Prompt Engineer, AI Product Manager, MLOps Engineer, AI Ethics Officer, Data Scientist, AI UX Designer. Vietnam is hungry for talent - this is a golden opportunity for Gen Z.",
      },
    ],
    Sandbox: GraduationSandbox,
    quiz: [
      {
        prompt: "Which AI tools help with presentations?",
        items: [
          { id: "a", label: "Gamma - auto-generates slides", bucket: "yes" },
          { id: "b", label: "Canva Magic Design - posters", bucket: "yes" },
          { id: "c", label: "Adobe Express - demo videos", bucket: "yes" },
          { id: "d", label: "A plain text notepad", bucket: "no" },
          { id: "e", label: "A pocket calculator", bucket: "no" },
        ],
        buckets: [
          { id: "yes", label: "Useful ✅" },
          { id: "no", label: "Not a fit" },
        ],
      },
      {
        prompt: "What makes a good AI presentation structure?",
        items: [
          { id: "1", label: "A real problem that needs solving", bucket: "good" },
          { id: "2", label: "The AI solution plus a live demo", bucket: "good" },
          { id: "3", label: "Convincing numbers and results", bucket: "good" },
          { id: "4", label: "Copying someone else's slides directly", bucket: "bad" },
          { id: "5", label: "Reading the slide text word for word", bucket: "bad" },
        ],
        buckets: [
          { id: "good", label: "Right approach ✅" },
          { id: "bad", label: "Wrong approach ❌" },
        ],
      },
      {
        prompt: "Which careers are HOT in the AI era of 2025-2030?",
        items: [
          { id: "a", label: "AI / ML Engineer", bucket: "hot" },
          { id: "b", label: "Prompt Engineer", bucket: "hot" },
          { id: "c", label: "AI Product Manager", bucket: "hot" },
          { id: "d", label: "AI Ethics Officer", bucket: "hot" },
          { id: "e", label: "Manual copy-paste jobs", bucket: "cold" },
        ],
        buckets: [
          { id: "hot", label: "HOT career 🔥" },
          { id: "cold", label: "Being replaced" },
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

  // Certificate state - unlocks only when totalStars === maxStars
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

    // Feed the Learning DNA dashboard with a real graded attempt.
    void logStudentActivity({
      activityType: "ai_academy_track",
      activityId: track.id,
      score,
      maxScore: Math.max(track.quiz?.length ?? score, 1),
      domain: "programming",
      metadata: { trackId: track.id, trackTitle: track.title, stars: newStars, passed },
    });


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
        title: "So close! 💪",
        description: `Score: ${score}/${track.quiz.length} - try again to unlock the badge.`,
      });

    }
  };


  const activeTrack = useMemo(() => TRACKS.find((t) => t.id === active) ?? null, [active]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <SEO
        title="AI Academy for Teen Students | HaiEduTech"
        description="Hands-on AI lessons for ages 11-18: computer vision, NLP chatbots, neural networks, AI ethics and safety. Interactive sandboxes, drag-and-drop quizzes, badges and a graduation certificate."

        path="/programming/ai-academy"
      />
      <FloatingAIIcons />
      {/* Side floating chibis (desktop only) - like homepage */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] hidden xl:block">
        <FloatingChibi src={chibiRobotHero} alt="" size={110} delay={0} className="absolute left-[1.5%] top-[18%]" />
        <FloatingChibi src={chibiCoder} alt="" size={100} delay={0.8} className="absolute left-[2%] top-[58%]" />
        <FloatingChibi src={chibiRocket} alt="" size={105} delay={0.4} className="absolute right-[2%] top-[22%]" />
        <FloatingChibi src={chibiOwl} alt="" size={95} delay={1.2} className="absolute right-[1.5%] top-[62%]" />
      </div>
      <div className="relative z-10">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-6 pb-16 max-w-6xl">
        {/* Breadcrumb */}
        <Link to="/programming" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-3 h-3" /> Programming
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
          {/* Color overlay for contrast - darker on the left to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />

          {/* Animated chibi robot - top/right corner */}
          <motion.img
            src={chibiRobot}
            alt="AI Academy robot assistant"
            className="absolute right-2 sm:right-4 lg:right-8 bottom-2 sm:bottom-3 w-20 sm:w-32 lg:w-44 h-auto drop-shadow-2xl select-none pointer-events-none"
            animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold mb-3">
              <Sparkles className="w-3 h-3" /> AI ACADEMY · AGES 11-18
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black leading-tight mb-2 drop-shadow-lg">
              Learn AI the fun way 🚀
            </h1>
            <p className="text-white/95 max-w-2xl text-sm sm:text-base pr-24 sm:pr-36 lg:pr-48 drop-shadow">
              {TRACKS.length - 1} hands-on lessons - tap, drag, drop, train a bot, wire up neurons. Finish them to unlock badges, stars and your Graduation Certificate.
            </p>

            {/* Progress strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20">
                <div className="text-xs opacity-90">⭐ Stars</div>
                <div className="text-xl font-black">{totalStars}/{TRACKS.length * 3}</div>
              </div>
              <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20">
                <div className="text-xs opacity-90">🏅 Badges</div>
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
                {/* Lesson number badge - sequence in the easy→hard path */}
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
                Graduation Certificate
              </div>
              {certificateUnlocked ? (
                <h3 className="font-display font-black text-lg sm:text-2xl text-foreground leading-tight">
                  Congratulations! You earned {totalStars}/{maxStars} stars 🌟
                </h3>
              ) : (
                <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                  Finish all {TRACKS.length - 1} lessons and collect {maxStars}/{maxStars} stars to unlock your Graduation Certificate.
                </h3>
              )}
              <div className="mt-1 text-xs text-muted-foreground">
                Current progress: <span className="font-bold text-foreground">{totalStars}/{maxStars} stars</span>
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
                🎓 Claim your Graduation Certificate
              </motion.button>
            ) : (
              <div className="shrink-0 px-5 py-3 rounded-2xl bg-muted text-muted-foreground font-bold text-sm inline-flex items-center gap-2 border-2 border-dashed border-border">
                <Lock className="w-4 h-4" /> Locked
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
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">📖 The story</h3>
                    </div>

                    {TRACK_ILLUSTRATIONS[activeTrack.id] && (
                      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm ring-1 ring-purple-500/10">
                        <img
                          src={TRACK_ILLUSTRATIONS[activeTrack.id]}
                          alt={`Lesson illustration: ${activeTrack.title}`}

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



                    {/* ===== Extended educational content ===== */}
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
                                💡 Teacher Hai's golden tip
                              </h4>
                            </div>
                            <SmartText text={extra.goldenTip} className="text-[15px] text-foreground leading-relaxed italic font-medium" />
                          </div>

                          {/* Glossary */}
                          <details className="p-4 rounded-2xl border-2 border-indigo-400/40 bg-indigo-500/5 group">
                            <summary className="flex items-center gap-2 cursor-pointer font-bold text-sm text-indigo-700 dark:text-indigo-300">
                              <BookOpen className="w-4 h-4" />
                              📖 AI glossary ({extra.glossary.length} terms)
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
                                🎯 Related future careers
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
                                🏠 Try it at home
                              </h4>
                            </div>
                            <SmartText text={extra.homework} className="text-[15px] text-foreground leading-relaxed" />
                          </div>

                          {/* External demos */}
                          <div className="p-4 rounded-2xl border-2 border-cyan-400/40 bg-cyan-500/5">
                            <div className="flex items-center gap-2 mb-2">
                              <ExternalLink className="w-4 h-4 text-cyan-600" />
                              <h4 className="font-bold text-cyan-700 dark:text-cyan-300 text-sm uppercase tracking-wide">
                                🔗 Play with real AI tools
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
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">🎮 Interactive sandbox</h3>
                    </div>
                    <activeTrack.Sandbox />
                  </div>
                </div>

                {/* Quiz */}
                <div className="rounded-3xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/5 to-rose-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      🧩 Mini Quiz - Drag & Drop
                    </h3>
                  </div>
                  <DragDropQuiz
                    key={`${activeTrack.id}-${progress[activeTrack.id]?.stars ?? 0}`}
                    questions={activeTrack.quiz}
                    onComplete={(passed, score) => handleQuizComplete(activeTrack, passed, score)}
                  />
                </div>

                {/* Bonus practice - Multiple Choice + Scenario (no extra stars) */}
                {QUIZ_EXTRAS[activeTrack.id] && (
                  <div className="grid lg:grid-cols-2 gap-5">
                    <div className="rounded-3xl border-2 border-indigo-400/40 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                          🎯 Extra practice - Multiple choice
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
                          🎬 Real-life scenarios
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
              👆 Pick a lesson above to start your AI adventure!
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
              <h3 className="text-2xl font-display font-black mb-1">Congratulations!</h3>
              <p className="text-white/90 mb-3">
                You just unlocked the <b>{overlay.track.badge.name}</b> badge 🏅
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
                <CheckCircle2 className="w-4 h-4 mr-1" /> Continue the adventure
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
