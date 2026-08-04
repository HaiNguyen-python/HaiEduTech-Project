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
    title: "📞 A fake call using mom's voice",
    body: "You get a call from an unknown number, sounding exactly like your mom: 'I've been in an accident, send 5 million VND to this number right now...'.",
    options: [
      { text: "Send the money immediately, scared for mom", safe: false, why: "This is a common deepfake-voice scam in 2024-2025. NEVER send money just because a voice sounds right." },
      { text: "Hang up, call mom's real saved number to verify", safe: true, why: "Correct! Always verify through a second channel (her saved number, calling dad, calling a sibling)." },
      { text: "Message a close friend on Zalo to ask for advice", safe: false, why: "Not wrong, but too slow. Your first move must be verifying directly with family." },
    ],
  },
  {
    title: "📸 A deepfake photo of a classmate",
    body: "You see a TikTok video with a faked photo of your classmate doing something embarrassing. She's crying.",
    options: [
      { text: "Reshare it to 'expose' whoever made the fake", safe: false, why: "Resharing = spreading harmful content further. It's both illegal and unethical." },
      { text: "Report the video to TikTok, tell a teacher, comfort your classmate", safe: true, why: "Correct! Report + support the victim. Adults can handle it through proper channels." },
      { text: "Comment insults at whoever made the fake", safe: false, why: "It solves nothing and hurts your classmate more, since the video is still up." },
    ],
  },
  {
    title: "🤖 An AI chatbot luring you on Messenger",
    body: "A stranger's account messages you: 'I'm an AI Tutor - send me your phone number and an ID photo so I can help you study for free.'",
    options: [
      { text: "Send it, because free tutoring sounds great", safe: false, why: "Wrong! Never send an ID card or photo to a stranger - even a real 'AI tutor' would never need it." },
      { text: "Block, report the account, and don't reply", safe: true, why: "Correct! Asking for personal ID documents is a classic scam / grooming red flag." },
      { text: "Ask for more details before deciding", safe: false, why: "The longer you engage, the easier it is to be manipulated. Cut contact immediately." },
    ],
  },
];

const TF = [
  { q: "AI can clone a voice that sounds exactly like a real person from just 3 seconds of audio.", a: true },
  { q: "Always verify through a second channel before sending money requested over the phone.", a: true },
  { q: "Resharing a deepfake to 'expose' it is a good thing to do.", a: false, why: "Wrong! Resharing spreads harmful content and hurts the victim further." },
  { q: "Never send an ID card / passport photo to a stranger online.", a: true },
];
const PAIRS = [
  { a: "Deepfake voice", b: "AI-generated voice that sounds like a real person" },
  { a: "Two-channel verify", b: "Confirming through a second channel" },
  { a: "Report", b: "Flagging a bad account to the platform" },
  { a: "Grooming", b: "An adult luring a minor online" },
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
          <Shield className="w-4 h-4" /> Scenario {idx + 1}/{SCENARIOS.length}: {s.title}
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
                <span className="text-sm"><span className="font-semibold mr-1">{String.fromCharCode(65 + i)}.</span>{o.text}</span>
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
          Next scenario →
        </Button>
      )}

      <ChipFilter
        title="🛡️ Turn on safe habits"
        hint="Each habit you turn on adds to your Digital Safety score."
        baseline={20}
        positive
        goal={80}
        goodLabel="You're well-equipped against AI scams ✅"
        badLabel="Turn on a few more habits"
        metricLabel="Safety score"
        accent="from-rose-500 to-orange-600"
        border="border-rose-400/40"
        options={[
          { id: "1", label: "🔒 Enable 2-factor authentication (2FA) on Zalo/Facebook", weight: 18 },
          { id: "2", label: "📞 Always call back the original number when 'family needs money'", weight: 20 },
          { id: "3", label: "🚫 Don't post public HD portrait photos", weight: 14 },
          { id: "4", label: "🆔 Never send an ID card/passport photo over chat", weight: 18 },
          { id: "5", label: "🚨 Report suspicious accounts on TikTok/FB", weight: 12 },
          { id: "6", label: "🗣️ Tell your parents/teacher when you encounter a deepfake", weight: 14 },
        ]}
      />

      <BestMatchPick
        title="📨 Sort the suspicious messages"
        hint="Which category does each message below belong to?"
        accent="from-rose-500 to-orange-600"
        border="border-rose-400/40"
        options={[
          { id: "safe", label: "✅ Safe" },
          { id: "doubt", label: "⚠️ Suspicious" },
          { id: "scam", label: "🚨 Scam" },
        ]}
        items={[
          { prompt: "'It's mom, I've had an accident, send 5 million now' (unknown number)", correctId: "scam" },
          { prompt: "'You won a $8,000 scholarship, send your ID to claim it'", correctId: "scam" },
          { prompt: "'I'm an AI tutor, send an ID photo for free lessons'", correctId: "scam" },
          { prompt: "'Math class tomorrow at 7am' (from mom's saved number)", correctId: "safe" },
          { prompt: "'You got a friend request from a stranger with a blurry photo'", correctId: "doubt" },
        ]}
      />

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-rose-500 to-orange-600" border="border-rose-400/40" />
    </div>
  );
};

export default DigitalSafetySandbox;
