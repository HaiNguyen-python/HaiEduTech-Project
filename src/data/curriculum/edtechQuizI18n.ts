/**
 * @file edtechQuizI18n.ts
 * @description English translations for EdTech Knowledge Check items.
 *   Keyed by the Vietnamese question string (unique across edtech lessons).
 *   The ProgrammingLesson renderer falls back to the VI text when a key is
 *   missing, so partial coverage is safe.
 */
export interface QuizEn {
  q: string;
  opts: string[];
  exp: string;
}

export const edtechQuizEn: Record<string, QuizEn> = {
  "Spaced Repetition giúp điều gì?": {
    q: "What does Spaced Repetition achieve?",
    opts: ["Cramming overnight", "Reviewing right before you'd forget, for long-term memory", "Faster reading", "Fewer exercises"],
    exp: "Spaced Repetition schedules reviews right before forgetting — maximum retention with minimum effort.",
  },
  "Retrieval practice là gì?": {
    q: "What is retrieval practice?",
    opts: ["Re-reading the same text", "Actively recalling information (e.g. quizzes)", "Watching videos", "Taking notes"],
    exp: "Active recall is far more effective than passive re-reading.",
  },
  "EdTech tốt cần đo lường gì nhất?": {
    q: "What should good EdTech measure most?",
    opts: ["Time online", "Mastery / actual progress", "App opens", "UI colors"],
    exp: "Mastery tells you who understands and who still needs help.",
  },
  "Interleaving nghĩa là gì?": {
    q: "What does interleaving mean?",
    opts: ["Studying a single topic only", "Mixing several problem types / topics in one session", "Studying non-stop", "Group study"],
    exp: "Mixing problem types helps the brain discriminate and remember more deeply.",
  },
  "Vì sao feedback loop quan trọng?": {
    q: "Why are feedback loops important?",
    opts: ["To make the app prettier", "Learners correct mistakes immediately, preventing them from setting in", "To boost revenue", "Not important"],
    exp: "Fast feedback fixes errors before they get burned into long-term memory.",
  },
  "Khi người học trả lời sai (q<3), điều gì xảy ra với repetitions?": {
    q: "When the learner answers incorrectly (q<3), what happens to repetitions?",
    opts: ["+1", "Reset to 0", "Unchanged", "+2"],
    exp: "Wrong → treat as relearning from scratch, repetitions = 0 and interval = 1.",
  },
  "EF không được nhỏ hơn?": {
    q: "EF must not fall below?",
    opts: ["1.0", "1.3", "2.0", "0.5"],
    exp: "SM-2 floors EF at 1.3 to stop cards from collapsing to ever-shorter intervals.",
  },
  "Sau lần ôn đúng thứ 2, interval đặt thành?": {
    q: "After the 2nd successful review, the interval is set to?",
    opts: ["1", "3", "6", "10"],
    exp: "Review 1 → 1 day, review 2 → 6 days, then multiply by EF.",
  },
  "SM-2 lấy cảm hứng từ?": {
    q: "SM-2 is inspired by?",
    opts: ["Newton's laws", "Ebbinghaus's forgetting curve", "Moore's law", "Game theory"],
    exp: "SM-2 (Piotr Wozniak) is based on Ebbinghaus's forgetting research.",
  },
  "Mục tiêu của SM-2?": {
    q: "The goal of SM-2?",
    opts: ["Cram as much as possible each day", "Review right before forgetting — minimum effort", "Punish wrong answers", "No goal"],
    exp: "Minimum effort — maximum long-term retention.",
  },
  "EMA với alpha lớn hơn nghĩa là?": {
    q: "A larger alpha in EMA means?",
    opts: ["Older results decay slower", "Recent results carry more weight", "No change", "Mastery reset"],
    exp: "Larger alpha → faster reaction to new results.",
  },
  "Tại sao cần ≥ 5 mẫu trước khi đổi độ khó?": {
    q: "Why wait for ≥5 samples before changing difficulty?",
    opts: ["For cleaner code", "Avoid decisions driven by luck", "Save RAM", "No need"],
    exp: "Tiny samples are noisy — wrong decisions frustrate learners.",
  },
  "IRT mô hình hóa điều gì?": {
    q: "What does IRT model?",
    opts: ["UI colors", "Learner ability and item difficulty", "Network speed", "Revenue"],
    exp: "IRT (θ, b) is the gold standard for standardized tests like TOEIC and SAT.",
  },
  "Quy tắc 'mastered' trong bài gồm?": {
    q: "The 'mastered' rule in this lesson requires?",
    opts: ["Mastery ≥ 0.85 AND last 3 attempts correct", "One correct answer", "10 minutes of study", "No rule"],
    exp: "You need both a mastery threshold and a recent streak to be sure.",
  },
  "Bẫy lớn khi adaptive?": {
    q: "Biggest trap of adaptive systems?",
    opts: ["Too safe", "Ramping difficulty too fast — learners give up", "Too many colors", "No trap"],
    exp: "Bad adaptive logic is more frustrating than no adaptivity at all.",
  },
  "AI Tutor khác chatbot thường ở chỗ?": {
    q: "How does an AI Tutor differ from a regular chatbot?",
    opts: ["Prettier", "Pedagogy + learner profile", "Faster", "Cheaper"],
    exp: "A tutor adds pedagogy and personalization — not just answers.",
  },
  "Socratic method nghĩa là?": {
    q: "The Socratic method means?",
    opts: ["Give the answer immediately", "Ask guiding questions", "Punish mistakes", "Praise everything"],
    exp: "Socratic dialogue lets students discover ideas themselves → deeper memory.",
  },
  "System prompt giữ vai trò gì?": {
    q: "What role does the system prompt play?",
    opts: ["Decoration", "Constrains AI behavior to stay pedagogical", "Speed up", "Reduce tokens"],
    exp: "The system prompt is the 'contract' keeping the AI in its teaching role.",
  },
  "Vì sao cần log mastery sau mỗi lượt?": {
    q: "Why log mastery after every turn?",
    opts: ["For revenue reporting", "So the adaptive system can adjust difficulty", "Boost SEO", "Not needed"],
    exp: "Mastery logs feed the adaptive engine and progress reports.",
  },
  "Bẫy lớn nhất khi triển khai AI tutor?": {
    q: "Biggest pitfall when shipping an AI tutor?",
    opts: ["Ugly UI", "No pedagogical guardrails → arbitrary answers", "Slow API", "Too cheap"],
    exp: "Without pedagogical guardrails, the educational value evaporates.",
  },
  "Lớp 'surface' kiểm tra gì?": {
    q: "What does the 'surface' layer check?",
    opts: ["Deep meaning", "Word count, spelling, formatting", "Emotion", "Logic"],
    exp: "Surface checks are formal: word count, format, spelling.",
  },
  "WER trong speaking dùng để?": {
    q: "What is WER used for in speaking grading?",
    opts: ["Measure network speed", "Pronunciation accuracy via text comparison", "Measure emotion", "Measure length"],
    exp: "WER compares the STT transcript with the reference → error rate.",
  },
  "Vì sao bắt LLM trả JSON?": {
    q: "Why force the LLM to return JSON?",
    opts: ["Looks nice", "So the frontend can parse and render each rubric criterion", "To make the LLM think harder", "To save tokens"],
    exp: "JSON lets us render the full rubric and store it in the DB.",
  },
  "Bẫy lớn nhất của chấm tự động?": {
    q: "Biggest trap of auto-grading?",
    opts: ["Too expensive", "Returning only a total score with no actionable feedback", "Too slow", "Too accurate"],
    exp: "A single total isn't actionable — per-criterion feedback is required.",
  },
  "Speaking grading thường kết hợp?": {
    q: "Speaking grading usually combines?",
    opts: ["STT + WER + LLM rubric", "STT only", "LLM only", "Regex only"],
    exp: "The 3-step pipeline yields accurate scores plus rich feedback.",
  },
  "Mastery gap cao có nghĩa?": {
    q: "A high mastery gap means?",
    opts: ["Strong in that skill", "Weak in that skill — needs practice", "Item too hard", "Meaningless"],
    exp: "Gap = 1 − mastery → high gap = weak skill = good recommendation target.",
  },
  "Collaborative filtering dựa trên?": {
    q: "Collaborative filtering relies on?",
    opts: ["Lesson content", "Behavior of similar learners", "Pricing", "UI colors"],
    exp: "It finds patterns across similar users (Netflix, Spotify).",
  },
  "Cold start là vấn đề gì?": {
    q: "What is the cold-start problem?",
    opts: ["Cold servers", "No data for a new learner or lesson", "Slow internet", "Low battery"],
    exp: "New learners have no history → collaborative filtering can't fire.",
  },
  "Vì sao kết hợp 3 chiến thuật?": {
    q: "Why combine all three recommendation strategies?",
    opts: ["For fun", "Each one compensates for the others' weaknesses", "Longer code", "Not needed"],
    exp: "Hybrid recommenders beat any single strategy.",
  },
  "Bẫy khi chỉ đề xuất bài dễ?": {
    q: "Trap of only recommending easy lessons?",
    opts: ["Builds confidence but no real progress", "Strong learners grow fast", "Saves time", "No trap"],
    exp: "You need challenge in the zone of proximal development.",
  },
  "Vì sao 'tổng phút online' là vanity metric?": {
    q: "Why is 'total minutes online' a vanity metric?",
    opts: ["Hard to compute", "Drives no concrete decision; can be inflated by spam notifications", "Too precise", "Privacy"],
    exp: "Vanity metrics look nice but don't tell you what to do.",
  },
  "Cohort analysis giúp phát hiện?": {
    q: "Cohort analysis helps detect?",
    opts: ["Front-end bugs", "Per-release regressions hidden inside averages", "API speed", "DB index count"],
    exp: "Cohorts split users by signup week so you can compare app versions.",
  },
  "Vì sao event nên immutable?": {
    q: "Why should events be immutable?",
    opts: ["Easier editing", "For auditing, replay, and accurate A/B later", "Save space", "Not required"],
    exp: "Edited events = lost ground truth → every downstream metric becomes wrong.",
  },
  "Healthy D7 retention với EdTech tốt là?": {
    q: "A healthy D7 retention for solid EdTech is?",
    opts: [">5%", ">25%", ">75%", ">95%"],
    exp: ">25% D7 is a strong benchmark for self-paced EdTech.",
  },
  "Bẫy 'chỉ nhìn trung bình' nghĩa là?": {
    q: "The 'averages-only' trap means?",
    opts: ["Ignoring the tail — the weakest users who need help most", "Median beats mean", "Meaningless", "Use mode only"],
    exp: "Averages hide the group that needs support; always look at p10/p50/p90.",
  },
  "Variable reward mạnh hơn fixed reward vì?": {
    q: "Variable rewards beat fixed rewards because?",
    opts: ["Cheaper", "They trigger the dopamine system more strongly through surprise", "Easier to code", "Prettier UI"],
    exp: "Slot-machine effect: surprise retains users better than predictability.",
  },
  "Dark pattern nào sau đây cần TRÁNH trong EdTech?": {
    q: "Which dark pattern should EdTech AVOID?",
    opts: ["Streak shaming", "Mastery bar", "Chibi avatar", "Short weekly leaderboard"],
    exp: "Streak shaming creates anxiety, especially for younger learners.",
  },
  "Investment trong Hook loop nghĩa là?": {
    q: "What does 'investment' in the Hook loop mean?",
    opts: ["Spending money", "User leaves something valuable (streak, collection) that makes returning easier", "Advertising", "Server upgrade"],
    exp: "Investment increases switching cost in a healthy way (ownership).",
  },
  "Vì sao nên decay XP cho bài lặp dễ?": {
    q: "Why decay XP for trivial repeated lessons?",
    opts: ["Punish users", "Prevent XP farming and keep XP tied to real learning", "Save DB", "No reason"],
    exp: "Without decay, users farm easy lessons instead of tackling hard ones.",
  },
  "Trụ cột 'Identity' trong gamification gồm?": {
    q: "The 'Identity' pillar of gamification includes?",
    opts: ["Avatar, badge, title", "API key", "DB system", "Caching"],
    exp: "'Who I am on this platform' is a long-term motivator.",
  },
  "Vì sao không nên peek p-value mỗi ngày?": {
    q: "Why shouldn't you peek at p-values daily?",
    opts: ["Server cost", "It dramatically inflates false positives (multiple testing)", "Violates RLS", "No problem"],
    exp: "Peeking turns a 5% α into 30%+ in practice.",
  },
  "Sample Ratio Mismatch nghĩa là?": {
    q: "What is Sample Ratio Mismatch?",
    opts: ["Sample too small", "The split deviates from the design (e.g. 60/40)", "Too many arms", "Out of RAM"],
    exp: "SRM means assignment is broken — the results aren't trustworthy.",
  },
  "Novelty effect là?": {
    q: "What is the novelty effect?",
    opts: ["A new bug", "Temporary excitement for the new variant that fades after 1–2 weeks", "Speed boost", "A new token"],
    exp: "Run long enough to pass the novelty period.",
  },
  "p < 0.05 nghĩa là?": {
    q: "What does p < 0.05 mean?",
    opts: ["B is definitely better", "Evidence that B differs from A — still check effect size and CI", "B is 95% better", "Meaningless"],
    exp: "Always combine effect size and confidence interval for interpretation.",
  },
  "Khi nào dừng experiment sớm?": {
    q: "When should you stop an experiment early?",
    opts: ["When it feels enough", "When B causes clear harm (harm threshold) or you use a formal Bayesian framework", "When the boss asks", "Anytime"],
    exp: "Stopping ad-hoc breaks the statistics — only stop on harm or via Bayesian.",
  },
  "Tại sao R≈0.85 thường là 'sweet spot' để ôn?": {
    q: "Why is R≈0.85 typically the review 'sweet spot'?",
    opts: ["Looks nice", "Hard enough to strengthen memory yet not fully forgotten", "Required by RLS", "To spam notifications"],
    exp: "Too easy wastes time; too hard requires relearning — 0.85 balances both.",
  },
  "FSRS hơn SM-2 ở điểm nào?": {
    q: "Where does FSRS beat SM-2?",
    opts: ["Shorter code", "Learns parameters from real data — schedules 20–30% better", "No reviews needed", "More free"],
    exp: "FSRS fits its model on real logs → more personal than fixed heuristics.",
  },
  "Vì sao review log phải immutable?": {
    q: "Why must review logs be immutable?",
    opts: ["So algorithms can be re-fit and audited when the scheduler changes", "Saves RAM", "Required by GDPR", "No reason"],
    exp: "Editing logs = losing ground truth, no re-training, no model comparison.",
  },
  "Đặt target retention 99% có vấn đề gì?": {
    q: "What's wrong with a 99% target retention?",
    opts: ["Nothing", "Users have to review too much → they drop off", "More data to store", "High latency"],
    exp: "Marginal returns plummet; users burn out.",
  },
  "Trong SM-2, khi q < 3 thì?": {
    q: "In SM-2, when q < 3 we?",
    opts: ["Reset repetitions=0 and interval=1", "Increase the interval", "Delete the card", "Ban the user"],
    exp: "Forgotten → relearn from scratch, next review in 1 day.",
  },
  "Vì sao Fisher information cực đại tại b ≈ θ?": {
    q: "Why is Fisher information maximized when b ≈ θ?",
    opts: ["Because the function is pretty", "Items near the learner's ability carry the most information to refine θ", "Because of RNG", "It's not"],
    exp: "The curve is steepest at b=θ → each right/wrong updates θ the most.",
  },
  "Mastery 0.85 trên N câu liên tiếp giúp?": {
    q: "Requiring mastery 0.85 across N consecutive items helps?",
    opts: ["Avoid accidentally unlocking on a lucky guess", "Speed up the API", "Security", "Meaningless"],
    exp: "You need enough evidence — not a single lucky answer.",
  },
  "Bandit thiếu min_pulls dẫn đến?": {
    q: "A bandit without min_pulls leads to?",
    opts: ["A crash", "New items never get a fair chance — they stay forever asleep", "Higher latency", "No impact"],
    exp: "Cold-start: you need a minimum exploration budget before trusting exploit.",
  },
  "Thompson Sampling thuộc nhóm nào?": {
    q: "Thompson Sampling belongs to which family?",
    opts: ["Pure greedy", "Bayesian — sample from the posterior, then pick", "Heuristic", "Brute force"],
    exp: "Sample θ from the posterior each round → natural explore/exploit balance.",
  },
  "Vì sao cần kết hợp adaptive + spaced repetition?": {
    q: "Why combine adaptive testing with spaced repetition?",
    opts: ["For a nice slogan", "Adaptive measures ability; spaced repetition keeps it from fading", "Hardware reasons", "Not needed"],
    exp: "Mastery today ≠ mastery next month — schedule reinforcement.",
  },
  "Vì sao tutor mặc định nên Socratic?": {
    q: "Why should the tutor default to Socratic?",
    opts: ["Looks nice", "It forces active thinking → deeper learning than spoon-feeding answers", "Saves tokens", "Required by RLS"],
    exp: "Counter-questions trigger retrieval in the learner's brain — strong evidence base.",
  },
  "Khi nào chuyển sang solution-first?": {
    q: "When should we switch to solution-first?",
    opts: ["After the first question", "When the user fails repeatedly on the same concept or explicitly asks for the answer", "Never", "Whenever"],
    exp: "Avoid a frustrating tutor. Clear rules tell you when to drop Socratic mode.",
  },
  "Groundedness đo gì?": {
    q: "What does groundedness measure?",
    opts: ["Speed", "% of answers backed by valid excerpts from the retrieved context", "Length", "Cost"],
    exp: "Ensures the LLM doesn't fabricate beyond the curriculum.",
  },
  "Memory rolling 5–10 lượt thay vì vô hạn vì?": {
    q: "Why use a rolling 5–10 turn memory instead of unlimited history?",
    opts: ["Cost & focus — long logs drift the LLM and burn tokens", "RLS", "RAM", "No reason"],
    exp: "Long memory raises cost and hurts quality via historical noise.",
  },
  "Self-harm signal nên dẫn tới?": {
    q: "A self-harm signal should lead to?",
    opts: ["Tutor handling it solo", "Show a hotline and escalate to teacher / guardian", "Ignore", "Silent log"],
    exp: "Tutors aren't clinicians — escalate via the proper channels.",
  },
  "Vì sao phải chấm per-criterion thay vì 1 điểm tổng?": {
    q: "Why grade per-criterion instead of a single total?",
    opts: ["More tokens", "So feedback is explainable and fixable — students know what to improve", "Hide bugs", "No difference"],
    exp: "A total isn't actionable; per-criterion + feedback drives progress.",
  },
  "QWK đo gì?": {
    q: "What does QWK measure?",
    opts: ["Grading speed", "Agreement between two graders on an ordinal scale, penalizing distant disagreements more", "Cost", "RAM"],
    exp: "QWK is the gold standard for essay scoring (Hewlett ASAP).",
  },
  "Vì sao không tự động trừ điểm khi 'AI-generated detector' báo dương?": {
    q: "Why not auto-penalize when an 'AI-generated detector' flags an essay?",
    opts: ["AI detection is very noisy — treat it as a signal, not proof", "It's definitive evidence", "RLS", "Latency"],
    exp: "Detectors still have high false-positive rates — automatic penalties are unfair.",
  },
  "Speaking: vì sao dùng word confidence từ ASR?": {
    q: "Speaking: why use ASR word confidence?",
    opts: ["Avoid penalizing the user when the ASR misheard, not the user", "Speed", "Security", "Not needed"],
    exp: "Separate ASR errors from learner errors to grade fairly.",
  },
  "Khi nào route bài cho giáo viên review?": {
    q: "When should a submission be routed to a teacher for review?",
    opts: ["All of them", "Low confidence, scores near a critical band boundary, plus a periodic 10–20% sample", "Never", "Every 1000 items"],
    exp: "Selective human-in-the-loop keeps quality high without overloading teachers.",
  },
  "Vì sao 'trả lời đúng' không đồng nghĩa 'đã hiểu' trong KT?": {
    q: "Why doesn't 'answered correctly' equal 'understood' in KT?",
    opts: ["The learner may have guessed or recalled temporarily", "UI bug", "Wrong gold answer", "No problem"],
    exp: "BKT models p_guess and p_slip precisely for this reason.",
  },
  "p_slip trong BKT nghĩa là?": {
    q: "What does p_slip mean in BKT?",
    opts: ["P(doesn't know but answers right)", "P(knows but answers wrong out of carelessness)", "Skip rate", "Cost"],
    exp: "Slip = knew but slipped; Guess = didn't know but got it right.",
  },
  "DKT khắc phục điểm yếu nào của BKT?": {
    q: "Which BKT weakness does DKT fix?",
    opts: ["Too fast", "Independence-of-skills assumption — DKT captures dependencies via an RNN", "Too cheap", "No difference"],
    exp: "RNN/Transformer learns skill embeddings → captures cross-skill links.",
  },
  "Ngưỡng mastery 0.85 phổ biến vì?": {
    q: "Why is 0.85 the common mastery threshold?",
    opts: ["Nice number", "Balances pace and retention; industry standard (Khan, Duolingo)", "Speed", "No reason"],
    exp: "0.70 forgets fast; 0.95 is too slow; 0.85 is the sweet spot.",
  },
  "Khi học sinh kẹt ở 'past perfect', hệ thống nên?": {
    q: "When a student gets stuck on 'past perfect', the system should?",
    opts: ["Push harder material", "Re-teach the prerequisite 'past simple' via the skill graph", "Skip it", "Show an ad"],
    exp: "Skill graphs let you route learners back to the root cause.",
  },
};
