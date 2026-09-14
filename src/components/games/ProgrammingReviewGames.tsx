import { useEffect, useMemo, useRef, useState } from "react";
import { Bug, CheckCircle2, GitBranch, Keyboard, RotateCcw, ShieldCheck, Timer, Trophy, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { TOPIC_SNIPPETS } from "@/data/programming/typingSnippetBank";
import { finishGame } from "@/lib/gameSession";

interface GameProps {
  onScore?: (delta: number) => void;
}

interface ReviewQuestion {
  prompt: string;
  code?: string;
  options: string[];
  answer: number;
  explanation: string;
}

const PYTHON_SNIPPETS = TOPIC_SNIPPETS
  .filter((topic) => topic.language === "python")
  .flatMap((topic) => topic.snippets)
  .filter((snippet, index, all) => all.indexOf(snippet) === index)
  .slice(0, 5);

const BUG_QUESTIONS: ReviewQuestion[] = [
  { prompt: "Why does this loop never stop?", code: "count = 5\nwhile count > 0:\n    print(count)\n    count += 1", options: ["The condition needs ==", "count should decrease", "print must be outside", "while cannot use numbers"], answer: 1, explanation: "The condition stays true because count increases. Use count -= 1." },
  { prompt: "Which fix makes this function return the sum?", code: "def add(a, b):\n    total = a + b\nprint(add(2, 3))", options: ["Add return total inside the function", "Rename total to sum", "Remove print", "Use a loop"], answer: 0, explanation: "Without return total, Python returns None." },
  { prompt: "What causes the syntax error?", code: "if score >= 80\n    print('Pass')", options: ["Missing colon after the condition", "Wrong comparison operator", "String needs double quotes", "Indentation is too deep"], answer: 0, explanation: "Python condition headers must end with a colon." },
  { prompt: "Why is the final item skipped?", code: "items = ['a', 'b', 'c']\nfor i in range(len(items) - 1):\n    print(items[i])", options: ["The list is immutable", "range stops before len(items) - 1", "print changes the list", "Indices start at one"], answer: 1, explanation: "Use range(len(items)) or iterate directly over items." },
  { prompt: "Which expression correctly checks equality?", code: "if role = 'admin':\n    grant_access()", options: ["role := 'admin'", "role === 'admin'", "role == 'admin'", "role equals 'admin'"], answer: 2, explanation: "Python uses == for comparison and = for assignment." },
  { prompt: "Why can this fail?", code: "age = input('Age: ')\nprint(age + 1)", options: ["input returns a string", "print cannot show numbers", "age is reserved", "The prompt is too short"], answer: 0, explanation: "Convert the input first, for example int(input('Age: '))." },
  { prompt: "Which fix prevents an IndexError?", code: "colors = ['red', 'blue']\nprint(colors[2])", options: ["Use colors[1]", "Use colors(2)", "Add a semicolon", "Reverse the list"], answer: 0, explanation: "A two-item list has indices 0 and 1." },
  { prompt: "What is wrong with this dictionary lookup?", code: "user = {'name': 'Mai'}\nprint(user['email'])", options: ["Dictionaries need numeric keys", "The email key does not exist", "print cannot read dictionaries", "Quotes are invalid"], answer: 1, explanation: "Use user.get('email') or ensure the key exists before reading it." },
];

const GIT_QUESTIONS: ReviewQuestion[] = [
  { prompt: "Start a new repository in the current folder.", options: ["git init", "git start", "git create", "git clone ."], answer: 0, explanation: "git init creates a repository in the current directory." },
  { prompt: "Create and switch to a branch named feature/login.", options: ["git branch feature/login", "git switch -c feature/login", "git merge feature/login", "git push feature/login"], answer: 1, explanation: "git switch -c creates the branch and checks it out." },
  { prompt: "Stage all current changes.", options: ["git add .", "git save .", "git commit .", "git stage --all-only"], answer: 0, explanation: "git add . stages changes under the current directory." },
  { prompt: "Record the staged changes with a message.", options: ["git log -m 'Add login'", "git commit -m 'Add login'", "git push -m 'Add login'", "git save 'Add login'"], answer: 1, explanation: "git commit records staged changes in local history." },
  { prompt: "Move back to the main branch.", options: ["git switch main", "git move main", "git branch -d main", "git merge main"], answer: 0, explanation: "git switch main changes the current branch." },
  { prompt: "Combine feature/login into the current main branch.", options: ["git join feature/login", "git pull feature/login", "git merge feature/login", "git commit feature/login"], answer: 2, explanation: "Run git merge while main is checked out." },
  { prompt: "Inspect the recent commit history.", options: ["git status", "git log --oneline", "git diff --staged", "git branch -a"], answer: 1, explanation: "git log --oneline gives a compact commit history." },
  { prompt: "Safely undo a published commit by creating a new commit.", options: ["git reset --hard", "git revert <commit>", "git delete <commit>", "git clean -fd"], answer: 1, explanation: "git revert preserves shared history and adds an inverse commit." },
];

const CYBER_QUESTIONS: ReviewQuestion[] = [
  { prompt: "A login email asks you to verify your account through an unfamiliar link. What is safest?", options: ["Open it quickly", "Reply with your password", "Visit the official site directly", "Forward it to friends"], answer: 2, explanation: "Open the known official site yourself instead of trusting an unexpected link." },
  { prompt: "Which password is strongest?", options: ["password123", "Mai2009", "Blue-River-7-Lantern!", "12345678"], answer: 2, explanation: "A long, unique passphrase is harder to guess and reuse." },
  { prompt: "A weather app requests access to all contacts. What should you do?", options: ["Allow every permission", "Deny unnecessary access", "Share the contact list manually", "Disable the lock screen"], answer: 1, explanation: "Grant only permissions required for the app's purpose." },
  { prompt: "What adds protection if a password is stolen?", options: ["Reusing it", "Two-factor authentication", "Writing it in chat", "Using a shorter password"], answer: 1, explanation: "A second factor blocks many password-only account takeovers." },
  { prompt: "Which value should never be committed to a public repository?", options: ["README title", "API secret key", "Function name", "CSS class"], answer: 1, explanation: "Secrets belong in protected environment settings, never source control." },
  { prompt: "A teammate asks for database access. What is the safest default?", options: ["Give administrator access", "Share your account", "Grant only required permissions", "Disable access logs"], answer: 2, explanation: "Least privilege limits both mistakes and misuse." },
  { prompt: "Which web address deserves extra caution?", options: ["A saved school bookmark", "A misspelled login domain", "A verified official domain", "A local project page"], answer: 1, explanation: "Lookalike domains are commonly used for phishing." },
  { prompt: "What should you do before installing an unknown package?", options: ["Run it as administrator", "Review its source, owner, and reputation", "Disable antivirus", "Paste secrets into its setup"], answer: 1, explanation: "Verify provenance, maintenance, permissions, and known risks first." },
];

function Results({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
  const percent = Math.round((score / total) * 100);
  return (
    <div className="arcade-game-panel flex min-h-[320px] flex-col items-center justify-center gap-4 p-6 text-center">
      <Trophy className="h-12 w-12 text-[hsl(var(--arcade-gold))]" />
      <div>
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--arcade-text))]">Mission complete</h2>
        <p className="mt-2 text-[hsl(var(--arcade-muted))]">You scored {score}/{total} - {percent}%</p>
      </div>
      <Button onClick={onRetry} className="min-h-11 bg-[hsl(var(--arcade-blue))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-blue)/0.9)]">
        <RotateCcw className="h-4 w-4" /> Play again
      </Button>
    </div>
  );
}

function ReviewGame({ title, gameType, questions, icon, onScore, accent = "blue", extra }: { title: string; gameType: string; questions: ReviewQuestion[]; icon: React.ReactNode; onScore?: (delta: number) => void; accent?: "blue" | "green" | "gold" | "pink"; extra?: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const savedRef = useRef(false);
  const done = index >= questions.length;
  const question = questions[index];

  useEffect(() => {
    if (!done || savedRef.current) return;
    savedRef.current = true;
    void finishGame({ gameType, score, accuracy: Math.round((score / questions.length) * 100) });
  }, [done, gameType, questions.length, score]);

  const choose = (choice: number) => {
    if (picked !== null || !question) return;
    setPicked(choice);
    if (choice === question.answer) {
      setScore((value) => value + 1);
      onScore?.(20);
    }
  };

  const next = () => {
    setPicked(null);
    setIndex((value) => value + 1);
  };

  const reset = () => {
    savedRef.current = false;
    setIndex(0);
    setScore(0);
    setPicked(null);
  };

  if (done) return <Results score={score} total={questions.length} onRetry={reset} />;

  return (
    <div className={`arcade-game-panel arcade-mission--${accent} p-4 sm:p-6`}>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="arcade-icon">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold text-[hsl(var(--arcade-text))] sm:text-2xl">{title}</h2>
          <p className="text-sm text-[hsl(var(--arcade-muted))]">Question {index + 1} of {questions.length}</p>
        </div>
        <span className="arcade-meta text-[hsl(var(--arcade-gold))]">{score * 20} XP</span>
      </div>
      <Progress value={(index / questions.length) * 100} className="mb-6 h-2 bg-[hsl(var(--arcade-line))]" />
      {extra}
      <p className="mb-4 text-base font-semibold text-[hsl(var(--arcade-text))] sm:text-lg">{question.prompt}</p>
      {question.code && <div className="arcade-terminal mb-4 whitespace-pre-wrap font-mono text-sm text-[hsl(var(--arcade-green))]">{question.code}</div>}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, optionIndex) => {
          const answered = picked !== null;
          const correct = optionIndex === question.answer;
          const selected = optionIndex === picked;
          const state = answered && correct ? "border-[hsl(var(--arcade-green))] bg-[hsl(var(--arcade-green)/0.13)]" : answered && selected ? "border-destructive bg-destructive/10" : "border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] hover:border-[hsl(var(--arcade-blue)/0.7)]";
          return <Button key={option} variant="outline" disabled={answered} onClick={() => choose(optionIndex)} className={`min-h-14 h-auto justify-start whitespace-normal px-4 py-3 text-left text-[hsl(var(--arcade-text))] disabled:opacity-100 ${state}`}>{option}</Button>;
        })}
      </div>
      {picked !== null && (
        <div className={`mt-5 rounded-md border p-4 ${picked === question.answer ? "border-[hsl(var(--arcade-green)/0.45)] bg-[hsl(var(--arcade-green)/0.08)]" : "border-destructive/40 bg-destructive/10"}`} aria-live="polite">
          <div className="flex items-start gap-2 text-sm text-[hsl(var(--arcade-text))]">
            {picked === question.answer ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--arcade-green))]" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />}
            <p>{question.explanation}</p>
          </div>
          <Button onClick={next} className="mt-4 min-h-11 bg-[hsl(var(--arcade-blue))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-blue)/0.9)]">Next challenge</Button>
        </div>
      )}
    </div>
  );
}

export function BugHunter({ onScore }: GameProps) {
  return <ReviewGame title="Bug Hunter" gameType="prog_bug_hunter" questions={BUG_QUESTIONS} icon={<Bug className="h-6 w-6" />} onScore={onScore} accent="pink" />;
}

export function GitBranchQuest({ onScore }: GameProps) {
  const graph = (
    <div className="arcade-terminal mb-5 overflow-hidden" aria-hidden>
      <div className="flex items-center gap-2 text-xs text-[hsl(var(--arcade-muted))]"><span className="h-3 w-3 rounded-full bg-[hsl(var(--arcade-blue))]" /><span>main</span><span className="h-px flex-1 bg-[hsl(var(--arcade-blue)/0.45)]" /><span className="h-3 w-3 rounded-full bg-[hsl(var(--arcade-blue))]" /></div>
      <div className="ml-8 mt-2 flex items-center gap-2 text-xs text-[hsl(var(--arcade-green))]"><GitBranch className="h-4 w-4" /><span>feature/login</span><span className="h-px flex-1 bg-[hsl(var(--arcade-green)/0.45)]" /></div>
    </div>
  );
  return <ReviewGame title="Git Branch Quest" gameType="prog_git_branch_quest" questions={GIT_QUESTIONS} icon={<GitBranch className="h-6 w-6" />} onScore={onScore} accent="green" extra={graph} />;
}

export function CyberShield({ onScore }: GameProps) {
  return <ReviewGame title="Cyber Shield" gameType="prog_cyber_shield" questions={CYBER_QUESTIONS} icon={<ShieldCheck className="h-6 w-6" />} onScore={onScore} accent="gold" />;
}

export function PythonSpeedRun({ onScore }: GameProps) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [clock, setClock] = useState(0);
  const savedRef = useRef(false);
  const snippet = PYTHON_SNIPPETS[index];
  const complete = index >= PYTHON_SNIPPETS.length;

  useEffect(() => {
    if (!startedAt || finishedAt) return;
    const timer = window.setInterval(() => setClock(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [finishedAt, startedAt]);

  useEffect(() => {
    if (!complete || savedRef.current) return;
    savedRef.current = true;
    void finishGame({ gameType: "prog_python_speed_run", score: totalScore, accuracy: 100 });
  }, [complete, totalScore]);

  const elapsed = startedAt ? ((finishedAt ?? (clock || Date.now())) - startedAt) / 1000 : 0;
  const correctChars = snippet ? [...typed].filter((char, i) => char === snippet[i]).length : 0;
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;

  const type = (value: string) => {
    if (!startedAt) setStartedAt(Date.now());
    setTyped(value);
    if (value === snippet) {
      const end = Date.now();
      const seconds = Math.max(1, (end - (startedAt ?? end)) / 1000);
      const points = Math.max(20, Math.round(120 - seconds));
      setFinishedAt(end);
      setTotalScore((score) => score + points);
      onScore?.(points);
    }
  };

  const next = () => {
    setIndex((value) => value + 1);
    setTyped("");
    setStartedAt(null);
    setFinishedAt(null);
    setClock(0);
  };

  const reset = () => {
    savedRef.current = false;
    setIndex(0);
    setTyped("");
    setStartedAt(null);
    setFinishedAt(null);
    setTotalScore(0);
    setClock(0);
  };

  if (complete) return <Results score={totalScore} total={PYTHON_SNIPPETS.length * 120} onRetry={reset} />;

  return (
    <div className="arcade-game-panel p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="arcade-icon"><Keyboard className="h-6 w-6" /></span>
        <div className="min-w-0 flex-1"><h2 className="font-display text-xl font-bold text-[hsl(var(--arcade-text))] sm:text-2xl">Python Speed Run</h2><p className="text-sm text-[hsl(var(--arcade-muted))]">Snippet {index + 1} of {PYTHON_SNIPPETS.length}</p></div>
        <span className="arcade-meta"><Timer className="h-4 w-4" />{elapsed.toFixed(1)}s</span>
        <span className="arcade-meta text-[hsl(var(--arcade-gold))]">{totalScore} XP</span>
      </div>
      <Progress value={(index / PYTHON_SNIPPETS.length) * 100} className="mb-6 h-2 bg-[hsl(var(--arcade-line))]" />
      <p className="mb-3 text-sm text-[hsl(var(--arcade-muted))]">Retype the Python code exactly. Capital letters, spaces, and line breaks matter.</p>
      <div className="arcade-terminal mb-4 whitespace-pre-wrap font-mono text-sm leading-6 text-[hsl(var(--arcade-green))]">{snippet}</div>
      <Textarea value={typed} onChange={(event) => type(event.target.value)} disabled={finishedAt !== null} spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-label="Type the Python snippet" className="min-h-36 border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-canvas))] font-mono text-[hsl(var(--arcade-text))]" />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[hsl(var(--arcade-muted))]"><span>Accuracy: {accuracy}%</span>{finishedAt && <Button onClick={next} className="min-h-11 bg-[hsl(var(--arcade-green))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-green)/0.9)]">Next snippet</Button>}</div>
    </div>
  );
}