import { useState, useEffect } from "react";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PythonEditor from "@/components/PythonEditor";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, ChevronLeft, Trophy, Code2, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pythonChallenges, getChallengeById, getNextChallenge, getPrevChallenge } from "@/data/pythonChallenges";
import { Progress } from "@/components/ui/progress";

const difficultyColors = {
  easy: "bg-green-500/10 text-green-600 border-green-500/30",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  hard: "bg-red-500/10 text-red-600 border-red-500/30",
};

/** Tidy up spacing artefacts so text never shows " ." or double spaces. */
const tidy = (s: string) =>
  s
    .replace(/[ \t]+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/([([])\s+/g, "$1")
    .replace(/\s+([)\]])/g, "$1")
    .trim();

/**
 * Splits a paragraph into sentences without cutting inside quotes:
 * a closing quote / bracket after the final punctuation stays with its sentence.
 */
const splitSentences = (s: string): string[] =>
  (s.match(/[^.!?]+[.!?]+['"’”)\]]*(?=\s|$)|[^.!?]+$/g) || [s]).map(x => x.trim()).filter(Boolean);

/**
 * Formats a dense problem description into readable blocks:
 * - Keeps author line breaks, groups consecutive "-" / "•" lines into one list
 * - Also handles bullets written inline on a single line
 * - Renders inline `code` spans and never splits a sentence inside quotes
 */
const FormattedProblem = ({ text }: { text: string }) => {
  const renderInline = (s: string) => {
    const parts = s.split(/(`[^`]+`)/g);
    return parts.map((p, i) =>
      p.startsWith("`") && p.endsWith("`") ? (
        <code key={i} className="px-1 py-0.5 rounded bg-primary/10 text-primary font-mono text-[0.9em] break-words">
          {p.slice(1, -1)}
        </code>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const blocks: { type: "p" | "ul"; items: string[] }[] = [];

  const pushParagraph = (block: string) => {
    const clean = tidy(block);
    if (!clean) return;
    // Only break up genuinely long paragraphs, two sentences per block.
    if (clean.length > 260) {
      const sentences = splitSentences(clean);
      for (let i = 0; i < sentences.length; i += 2) {
        blocks.push({ type: "p", items: [sentences.slice(i, i + 2).join(" ")] });
      }
    } else {
      blocks.push({ type: "p", items: [clean] });
    }
  };

  const bulletLine = /^[-•*]\s+/;

  for (const line of lines) {
    if (bulletLine.test(line)) {
      const item = tidy(line.replace(bulletLine, ""));
      const last = blocks[blocks.length - 1];
      if (last && last.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
      continue;
    }

    // Inline bullets on one line: "Foo: - one - two - three"
    const inline = line.match(/(?:^|\s)[-•]\s+/g);
    if (inline && inline.length >= 2) {
      const firstIdx = line.search(/(?:^|\s)[-•]\s+/);
      const intro = tidy(line.slice(0, firstIdx).replace(/[:：]$/, ""));
      const items = line
        .slice(firstIdx)
        .split(/(?:^|\s)[-•]\s+/)
        .map(s => tidy(s))
        .filter(Boolean);
      if (intro) blocks.push({ type: "p", items: [intro + ":"] });
      blocks.push({ type: "ul", items });
      continue;
    }

    pushParagraph(line);
  }

  return (
    <div className="space-y-3 text-[17px] text-secondary-foreground leading-relaxed break-words">
      {blocks.map((b, i) =>
        b.type === "p" ? (
          <p key={i}>{renderInline(b.items[0])}</p>
        ) : (
          <ul key={i} className="list-disc pl-5 space-y-1.5 marker:text-primary/60">
            {b.items.map((it, j) => (
              <li key={j}>{renderInline(it)}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

const PythonChallengePage = () => {
  const { challengeId } = useParams();
  const { t } = useLanguage();
  const id = challengeId || "001";
  const challenge = getChallengeById(id);
  const next = getNextChallenge(id);
  const prev = getPrevChallenge(id);

  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const count = pythonChallenges.filter(c => localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1").length;
    setCompletedCount(count);
  }, [id]);

  const handlePass = () => {
    localStorage.setItem(`haiedu_challenge_${id}_passed`, "1");
    setCompletedCount(prev => prev + 1);
    logStudentActivity({
      activityType: "python_challenge",
      activityId: id,
      score: 10,
      maxScore: 10,
      domain: "programming",
    });
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 text-center">
          <p className="text-muted-foreground">Challenge not found.</p>
          <Link to="/python-challenges" className="text-primary hover:underline mt-4 inline-block">
            Back to list
          </Link>
        </div>
      </div>
    );
  }

  const progressPct = (completedCount / pythonChallenges.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/programming" className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Programming
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/python-challenges" className="hover:text-foreground">
                Python Challenges
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">#{challenge.number}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-64 shrink-0">
                <div className="glass-card rounded-xl p-4 sticky top-28 space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" /> Progress
                      </span>
                      <span className="text-xs font-bold text-primary">{completedCount}/{pythonChallenges.length}</span>
                    </div>
                    <Progress value={progressPct} className="h-1.5" />
                  </div>

                  <h3 className="font-semibold text-foreground text-sm">Challenges</h3>
                  <div className="space-y-0.5 max-h-[50vh] overflow-y-auto pr-1">
                    {pythonChallenges.map(c => {
                      const done = localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1";
                      const active = c.id === id;
                      return (
                        <Link
                          key={c.id}
                          to={`/python-challenges/${c.id}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                            active
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            done ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"
                          }`}>
                            {done ? "✓" : c.number}
                          </span>
                          <span className="truncate">{c.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 min-w-0 space-y-6">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h1 className="text-xl font-bold text-foreground leading-tight">
                            #{challenge.number}: {challenge.title}
                          </h1>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${difficultyColors[challenge.difficulty]}`}>
                              {challenge.difficulty.toUpperCase()}
                            </span>
                            {challenge.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="glass-card rounded-xl p-5 mb-6">
                    <h2 className="font-semibold text-foreground text-lg mb-3 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" /> Problem
                    </h2>
                    <FormattedProblem text={challenge.description} />
                    {challenge.testCases.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          {t("Kết quả mong đợi:", "Expected output:")}
                        </p>
                        <div className="text-[15px] font-mono bg-secondary rounded-lg p-4 text-foreground whitespace-pre-wrap break-words overflow-y-auto max-h-56 leading-relaxed">
                          {challenge.testCases[0].expected}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Editor */}
                  <PythonEditor challenge={challenge} onPass={handlePass} />

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6">
                    {prev ? (
                      <Link to={`/python-challenges/${prev.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="w-4 h-4" /> #{prev.number}: {prev.title}
                      </Link>
                    ) : <div />}
                    {next ? (
                      <Link to={`/python-challenges/${next.id}`} className="flex items-center gap-2 text-sm text-primary hover:underline font-medium">
                        #{next.number}: {next.title} <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : <div />}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonChallengePage;
