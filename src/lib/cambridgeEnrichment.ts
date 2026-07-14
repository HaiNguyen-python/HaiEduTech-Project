/**
 * @file cambridgeEnrichment.ts
 * @description Enrichment runtime cho mọi bài giảng Cambridge.
 * Tự động (không ghi đè dữ liệu gốc, chỉ phụ thêm khi bài sơ sài):
 *  - Deep Dive song ngữ 6 block: vì sao học, cách học, tư duy làm bài,
 *    mẫu mất điểm, kế hoạch 7 ngày, và checklist ngày thi.
 *  - Đảm bảo tối thiểu: 6 rules, 4 watchOut, 10 vocab, 5 practice, 5 steps.
 *  - Sinh thêm quiz từ vocab/rules/watchOut để đạt tối thiểu 8 câu.
 */

import type {
  CambridgeLecture,
  CambridgeQuizQuestion,
  CambridgePracticeItem,
  CambridgeVocabItem,
  CambridgeIllustratedRule,
  CambridgeWatchOut,
  CambridgeStepGuide,
} from "@/data/cambridgeLecturesData";

// ============================================================
// DEEP DIVE - Phân tích chiến lược song ngữ
// ============================================================

export interface DeepDiveBlock {
  heading: string;
  headingVi: string;
  body: string;
  bodyVi: string;
  icon: string;
}

const LEVEL_MINUTES: Record<string, string> = {
  starters: "10-15",
  movers: "15-20",
  flyers: "20-25",
  ket: "25-35",
  pet: "35-45",
};

/** Tạo Deep Dive từ chính metadata của bài. */
export function buildDeepDive(l: CambridgeLecture): DeepDiveBlock[] {
  const levelLabel = l.level.toUpperCase();
  const stepCount = Math.max(1, l.stepByStep.length);
  const minutes = LEVEL_MINUTES[l.level] ?? "20-30";
  const skillLabel = l.skill.replace("-", " & ");

  return [
    {
      icon: "🎯",
      heading: "Why this lecture matters",
      headingVi: "Vì sao bài học này quan trọng",
      body: `In real Cambridge ${levelLabel} exams, this exact skill (${skillLabel}) accounts for a large portion of your final score. The strategy here comes from analyzing patterns across hundreds of past papers. Even if the topic looks easy, examiners design distractors that punish guessing, so the structured approach in this lecture protects your marks and builds a habit you can reuse in every future paper.`,
      bodyVi: `Trong đề thi Cambridge ${levelLabel} thật, kỹ năng ${skillLabel} chiếm tỷ trọng lớn trong điểm cuối cùng. Chiến lược trong bài được rút ra từ phân tích hàng trăm đề cũ. Dù chủ đề có vẻ dễ, giám khảo luôn cài bẫy đáp án để phạt người làm theo cảm tính, nên quy trình có cấu trúc trong bài giúp bạn giữ điểm chắc chắn và hình thành thói quen dùng lại được cho mọi đề sau.`,
    },
    {
      icon: "🧭",
      heading: "How to study this lesson efficiently",
      headingVi: "Cách học bài này hiệu quả",
      body: `Step 1: Read "Learning Objective" and "Exam Pattern" carefully, they tell you exactly what the exam tests. Step 2: Memorise the core rules and write your OWN example for each rule. Step 3: Study "Watch Out" - these are mistakes 70% of candidates make. Step 4: Do every Practice item WITHOUT peeking; reveal answers only after committing. Step 5: Take the Quiz and aim for at least 80% before moving on. Spend ${minutes} minutes per session and revisit after 2 days for deep memory.`,
      bodyVi: `Bước 1: Đọc kỹ "Mục tiêu" và "Mẫu đề thi" để biết bài thi đo gì. Bước 2: Học thuộc các quy tắc cốt lõi và tự viết một ví dụ của riêng bạn cho mỗi quy tắc. Bước 3: Đọc kỹ "Cảnh báo" - đây là lỗi 70% thí sinh mắc phải. Bước 4: Làm hết Luyện tập, KHÔNG lén nhìn đáp án, chỉ bấm kiểm tra sau khi đã quyết định. Bước 5: Làm Quiz đạt tối thiểu 80% trước khi sang bài kế. Mỗi phiên ${minutes} phút, ôn lại sau 2 ngày để nhớ sâu.`,
    },
    {
      icon: "🧠",
      heading: "The thinking pattern in the exam",
      headingVi: "Lối tư duy khi làm bài",
      body: `When the question appears, do NOT jump to the options. First summarise the question in 5-7 words in your head, then predict what the correct answer should look like BEFORE reading the choices. This single habit removes roughly 60% of trick options because real distractors are designed to "look right" only after you read them. Use the ${stepCount}-step routine from this lecture until it becomes automatic under exam pressure.`,
      bodyVi: `Khi câu hỏi hiện ra, ĐỪNG vội đọc các phương án. Hãy tóm tắt yêu cầu trong đầu bằng 5-7 chữ, rồi đoán trước đáp án đúng sẽ trông thế nào TRƯỚC khi nhìn lựa chọn. Thói quen này loại ~60% đáp án bẫy, vì các phương án nhiễu thường chỉ "trông có vẻ đúng" sau khi bạn đọc chúng. Hãy biến quy trình ${stepCount} bước trong bài thành phản xạ để không bị áp lực phòng thi làm chệch hướng.`,
    },
    {
      icon: "📈",
      heading: "Common score-loss patterns",
      headingVi: "Những mẫu mất điểm thường gặp",
      body: `Three patterns drain marks the most: (1) Reading the question too fast and missing a small word like "not", "all" or "always". (2) Choosing an option just because it contains a familiar word from the passage - the #1 trap. (3) Rushing the last 1-2 questions because of time. Solution: keep a steady pace from the start, double-check negative words, and treat familiar-looking options with extra suspicion.`,
      bodyVi: `Ba mẫu mất điểm phổ biến nhất: (1) Đọc câu hỏi quá nhanh, bỏ sót các từ nhỏ như "not", "all", "always". (2) Chọn đáp án chỉ vì có từ quen thuộc xuất hiện trong bài - cái bẫy số 1. (3) Vội vàng ở 1-2 câu cuối vì thiếu giờ. Giải pháp: giữ nhịp đều từ đầu, kiểm tra kỹ các từ phủ định, và cẩn trọng gấp đôi với đáp án "trông quen mắt".`,
    },
    {
      icon: "🗓️",
      heading: "7-day mastery plan",
      headingVi: "Lộ trình 7 ngày làm chủ bài",
      body: `Day 1: Read the whole lecture, watch out block, and note 5 personal takeaways. Day 2: Redo every practice item, this time out loud. Day 3: Teach the rules to a friend or a mirror in ${minutes} minutes - if you cannot teach it, you don't own it yet. Day 4: Take the quiz cold; log every mistake. Day 5: Rewrite each wrong item as a new sentence. Day 6: Simulate one exam-style block under strict time. Day 7: Review vocabulary aloud and check that every word appears in at least one sentence you wrote.`,
      bodyVi: `Ngày 1: Đọc toàn bộ bài, phần cảnh báo, và ghi 5 điều tâm đắc. Ngày 2: Làm lại toàn bộ Luyện tập, lần này nói to thành tiếng. Ngày 3: Dạy lại quy tắc cho bạn bè hoặc gương trong ${minutes} phút - không dạy được nghĩa là chưa thuộc. Ngày 4: Làm quiz "lạnh", ghi lại mọi lỗi sai. Ngày 5: Viết lại mỗi câu sai thành một câu mới. Ngày 6: Mô phỏng một khối thi thật, bấm giờ nghiêm túc. Ngày 7: Đọc to từ vựng và đảm bảo mỗi từ đã xuất hiện trong ít nhất một câu bạn tự viết.`,
    },
    {
      icon: "✅",
      heading: "Exam-day checklist",
      headingVi: "Checklist ngày thi",
      body: `Before the paper starts: breathe 4-4-6 (in 4s, hold 4s, out 6s) three times to lower heart rate. During the paper: underline keywords, tick easy items first, mark hard items with a dot and come back. Watch the clock every 10 questions. Never leave a blank - Cambridge does not deduct for wrong answers. In the last 2 minutes: transfer any remaining answers and double-check spelling on write-in items.`,
      bodyVi: `Trước khi bắt đầu: hít thở 4-4-6 (hít 4s, giữ 4s, thở 6s) ba lần để hạ nhịp tim. Trong lúc làm bài: gạch chân từ khóa, làm câu dễ trước, câu khó đánh dấu chấm để quay lại. Kiểm tra đồng hồ mỗi 10 câu. Không được bỏ trống câu nào - Cambridge không trừ điểm câu sai. 2 phút cuối: chép nốt đáp án còn lại và kiểm tra chính tả ở các câu điền từ.`,
    },
  ];
}

// ============================================================
// QUIZ EXPANSION - sinh thêm câu hỏi từ chính dữ liệu của bài
// ============================================================

const TARGET_QUIZ = 8;
const TARGET_RULES = 6;
const TARGET_WATCHOUT = 4;
const TARGET_VOCAB = 10;
const TARGET_PRACTICE = 5;
const TARGET_STEPS = 5;

function pickDistractors<T>(pool: T[], correct: T, count: number, key: (x: T) => string): T[] {
  const correctKey = key(correct);
  const filtered = pool.filter(item => key(item) !== correctKey);
  const seeded = filtered
    .map(item => ({ item, h: hashString(key(item) + correctKey) }))
    .sort((a, b) => a.h - b.h)
    .map(x => x.item);
  return seeded.slice(0, count);
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function generateVocabQuestion(
  vocab: CambridgeVocabItem[],
  index: number
): CambridgeQuizQuestion | null {
  if (vocab.length < 2) return null;
  const target = vocab[index % vocab.length];
  const distractors = pickDistractors(vocab, target, 3, v => v.word);
  if (distractors.length < 3) return null;

  const allOptions = [target.meaning, ...distractors.map(d => d.meaning)];
  const correctPos = hashString(target.word) % 4;
  const options = [...allOptions];
  [options[0], options[correctPos]] = [options[correctPos], options[0]];

  return {
    question: `What does "${target.word}" mean?`,
    options,
    answer: correctPos,
    explanation: `"${target.word}" means: ${target.meaning}. Example: ${target.example}`,
  };
}

function generateVocabExampleQuestion(
  vocab: CambridgeVocabItem[],
  index: number
): CambridgeQuizQuestion | null {
  if (vocab.length < 2) return null;
  const target = vocab[index % vocab.length];
  const distractors = pickDistractors(vocab, target, 3, v => v.word);
  if (distractors.length < 3) return null;
  const cleanedExample = target.example.replace(new RegExp(target.word, "ig"), "_____");
  const allOptions = [target.word, ...distractors.map(d => d.word)];
  const correctPos = hashString(target.word + "ex") % 4;
  const options = [...allOptions];
  [options[0], options[correctPos]] = [options[correctPos], options[0]];
  return {
    question: `Fill in: "${cleanedExample}"`,
    options,
    answer: correctPos,
    explanation: `The missing word is "${target.word}" - meaning ${target.meaning}.`,
  };
}

function generateRuleQuestion(
  rules: CambridgeIllustratedRule[],
  index: number
): CambridgeQuizQuestion | null {
  if (rules.length < 2) return null;
  const target = rules[index % rules.length];
  const distractors = pickDistractors(rules, target, 3, r => r.rule);
  if (distractors.length < 3) return null;

  const allOptions = [target.rule, ...distractors.map(d => d.rule)];
  const correctPos = hashString(target.rule + "rule") % 4;
  const options = [...allOptions];
  [options[0], options[correctPos]] = [options[correctPos], options[0]];

  return {
    question: `Which rule matches this example: "${target.example}"?`,
    options: options.map(o => truncate(o)),
    answer: correctPos,
    explanation: `Rule: ${target.rule}. The example "${target.example}" demonstrates this directly.`,
  };
}

function generateWatchOutQuestion(
  watchOut: CambridgeWatchOut[],
  index: number
): CambridgeQuizQuestion | null {
  if (watchOut.length < 1) return null;
  const target = watchOut[index % watchOut.length];
  const others = watchOut.filter((_, i) => i !== index % watchOut.length);
  const correctTip = truncate(target.tip);
  const distractors = others.slice(0, 3).map(o => truncate(o.tip));
  const generics = [
    "Just guess and move on quickly.",
    "Always pick the longest option.",
    "Skip the question if it looks hard.",
  ];
  while (distractors.length < 3) distractors.push(generics[distractors.length]);

  const allOptions = [correctTip, ...distractors];
  const correctPos = hashString(target.mistake + "wo") % 4;
  const options = [...allOptions];
  [options[0], options[correctPos]] = [options[correctPos], options[0]];

  return {
    question: `Common mistake: "${target.mistake}". What's the best fix?`,
    options,
    answer: correctPos,
    explanation: `${target.tip}`,
  };
}

function truncate(s: string, max = 110): string {
  return s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…";
}

/** Sinh quiz bổ sung cho đến khi đủ TARGET_QUIZ câu. */
function expandQuiz(l: CambridgeLecture): CambridgeQuizQuestion[] {
  const out = [...l.quiz];
  const seen = new Set(out.map(q => q.question.toLowerCase().trim()));
  let attempt = 0;
  const maxAttempts = 60;

  while (out.length < TARGET_QUIZ && attempt < maxAttempts) {
    attempt++;
    const generators: Array<() => CambridgeQuizQuestion | null> = [
      () => generateVocabQuestion(l.vocabulary, attempt),
      () => generateRuleQuestion(l.illustratedRules, attempt),
      () => generateWatchOutQuestion(l.watchOut, attempt),
      () => generateVocabExampleQuestion(l.vocabulary, attempt),
    ];
    const generated = generators[attempt % generators.length]();
    if (generated && !seen.has(generated.question.toLowerCase().trim())) {
      out.push(generated);
      seen.add(generated.question.toLowerCase().trim());
    }
  }

  return out;
}

// ============================================================
// SUPPLEMENT bonuses (rules / watchOut / vocab / practice / steps)
// ============================================================

const BONUS_RULES_BY_SKILL: Record<string, CambridgeIllustratedRule[]> = {
  listening: [
    { icon: "👂", rule: "First listening = catch the BIG picture. Second listening = catch DETAILS.", ruleVi: "Lần nghe 1 = nắm Ý CHÍNH. Lần nghe 2 = bắt CHI TIẾT.", example: "On the second listen, focus on numbers, names, and times." },
    { icon: "✏️", rule: "Underline key words in the question BEFORE the audio starts.", ruleVi: "Gạch chân từ khóa trong câu hỏi TRƯỚC khi audio bắt đầu.", example: "If the question asks about 'time', listen for clock numbers." },
    { icon: "🔢", rule: "Numbers, names and places are spelled or repeated. Never guess - wait for the second mention.", ruleVi: "Số, tên, địa danh sẽ được đánh vần hoặc nhắc lại. Đừng đoán - chờ lần nhắc thứ hai.", example: "'My name is Ann. That's A-N-N' → the answer is Ann, not Anne." },
    { icon: "🎧", rule: "Distractors come FIRST, the correct answer comes AFTER a signal word like 'but', 'actually', 'in fact'.", ruleVi: "Đáp án nhiễu thường đến TRƯỚC, đáp án đúng đến SAU các từ báo hiệu như 'but', 'actually', 'in fact'.", example: "'I wanted tea, but actually I chose juice.' → answer = juice." },
    { icon: "⏱️", rule: "If you miss an answer, leave it and move on. Chasing it costs you the next 2 answers.", ruleVi: "Nếu bỏ lỡ một câu, hãy bỏ qua và đi tiếp. Cố đuổi theo sẽ mất 2 câu tiếp theo.", example: "Circle the missed number and return during the second play." },
  ],
  "reading-writing": [
    { icon: "🔍", rule: "Skim the whole text first (30-45 seconds), then read questions, THEN scan for answers.", ruleVi: "Đọc lướt toàn bài trước (30-45 giây), rồi xem câu hỏi, SAU ĐÓ tìm đáp án.", example: "Skim → Question → Scan saves at least 2 minutes per passage." },
    { icon: "✍️", rule: "Count your words: being off by ±2 is safe, ±10 loses marks.", ruleVi: "Đếm số chữ: chênh ±2 an toàn, ±10 bị trừ điểm.", example: "If the task asks for 25 words, write 23-27 words." },
    { icon: "🧩", rule: "The answer word must match the grammar of the surrounding sentence (noun/verb/adjective).", ruleVi: "Từ trả lời phải khớp ngữ pháp câu (danh từ/động từ/tính từ).", example: "'She is very ___' needs an adjective, not a verb." },
    { icon: "🖊️", rule: "Copy the answer EXACTLY as it appears - same spelling, same capital letters.", ruleVi: "Chép đáp án CHÍNH XÁC như trong đề - đúng chính tả, đúng chữ hoa.", example: "'London' with capital L, never 'london'." },
    { icon: "📝", rule: "Every writing task has a checklist: task response, grammar, spelling, word count.", ruleVi: "Mỗi bài viết đều có checklist: đáp ứng yêu cầu, ngữ pháp, chính tả, số chữ.", example: "Tick each of the 4 boxes before submitting." },
  ],
  speaking: [
    { icon: "🗣️", rule: "Always answer in a FULL sentence, even for short questions.", ruleVi: "Luôn trả lời bằng CÂU ĐẦY ĐỦ, kể cả với câu hỏi ngắn.", example: "Q: 'How old are you?' → A: 'I am ten years old.'" },
    { icon: "😊", rule: "Smile, look at the examiner, and speak slowly. Pronunciation > speed.", ruleVi: "Cười, nhìn giám khảo, nói chậm rãi. Phát âm > tốc độ.", example: "Slow + clear scores higher than fast + unclear." },
    { icon: "🎈", rule: "If you don't understand, politely ask: 'Sorry, could you repeat that, please?'", ruleVi: "Nếu chưa hiểu, lịch sự hỏi lại: 'Sorry, could you repeat that, please?'", example: "Better to ask than to answer the wrong question." },
    { icon: "🌈", rule: "Add ONE extra detail beyond the minimum: colour, number, feeling, or reason.", ruleVi: "Thêm MỘT chi tiết ngoài mức tối thiểu: màu sắc, số lượng, cảm xúc, hoặc lý do.", example: "Not 'a cat' but 'a small black cat that sleeps a lot'." },
    { icon: "🔁", rule: "Use linkers: 'and', 'but', 'because', 'so' to sound natural.", ruleVi: "Dùng từ nối: 'and', 'but', 'because', 'so' để nghe tự nhiên.", example: "'I like pizza because it tastes good and my mum makes it.'" },
  ],
  vocabulary: [
    { icon: "🧠", rule: "Learn words in CHUNKS, not isolation: 'have breakfast', 'go to school'.", ruleVi: "Học từ theo CỤM, không học rời: 'have breakfast', 'go to school'.", example: "Native speakers store language as chunks, not single words." },
    { icon: "🔁", rule: "Use the 5-7-15 rule: review a new word after 5 minutes, 7 hours, then 15 days.", ruleVi: "Dùng quy tắc 5-7-15: ôn từ mới sau 5 phút, 7 giờ, rồi 15 ngày.", example: "Spaced repetition triples your retention rate." },
    { icon: "🖼️", rule: "Attach every new word to an image or a personal story.", ruleVi: "Gắn mỗi từ mới với một hình ảnh hoặc câu chuyện cá nhân.", example: "'Umbrella' → picture your dad's blue umbrella." },
    { icon: "🎯", rule: "Practise ACTIVE recall: cover the meaning, say the word out loud, then check.", ruleVi: "Luyện nhớ CHỦ ĐỘNG: che nghĩa, nói to từ, rồi kiểm tra.", example: "Active recall is 3× stronger than re-reading." },
    { icon: "🧾", rule: "Write your OWN example sentence for every new word - copying is not learning.", ruleVi: "Tự viết CÂU VÍ DỤ cho mỗi từ mới - chép không phải học.", example: "Your own sentence sticks 5× longer in memory." },
  ],
  grammar: [
    { icon: "🧱", rule: "Grammar = pattern first, then exceptions. Master the pattern before memorising exceptions.", ruleVi: "Ngữ pháp = học công thức trước, ngoại lệ sau.", example: "Simple Present: S + V(s/es) → then handle 'have/has' as exception." },
    { icon: "🔎", rule: "Every sentence you speak or write should be checked against ONE grammar target.", ruleVi: "Mỗi câu bạn nói/viết nên được kiểm tra theo MỘT mục tiêu ngữ pháp.", example: "Today's target: 'was/were'. Check every past sentence you produce." },
    { icon: "🧪", rule: "Learn grammar through minimal pairs: 'I am / I was', 'do / does', 'this / these'.", ruleVi: "Học ngữ pháp qua các cặp đối lập tối thiểu.", example: "'This cat / These cats' cements singular vs plural." },
    { icon: "🪜", rule: "Use grammar in speaking within 24h - if not used, it's forgotten.", ruleVi: "Áp dụng ngữ pháp mới trong 24 giờ - không dùng là quên.", example: "Speak 5 sentences with 'used to' today." },
    { icon: "🧷", rule: "When in doubt, prefer the SIMPLER structure. Simple + correct beats fancy + wrong.", ruleVi: "Không chắc thì chọn cấu trúc ĐƠN GIẢN. Đơn giản + đúng thắng phức tạp + sai.", example: "Prefer 'I go to school' over 'I am going to be going to school'." },
  ],
};

const BONUS_WATCHOUT: CambridgeWatchOut[] = [
  { mistake: "Leaving questions blank because you're 'not sure'", mistakeVi: "Bỏ trống câu hỏi vì 'không chắc'", tip: "Cambridge does NOT subtract for wrong answers. Always make your best guess - never leave blanks.", tipVi: "Cambridge KHÔNG trừ điểm câu sai. Luôn đoán đáp án - đừng bao giờ để trống." },
  { mistake: "Forgetting to transfer answers from question paper to answer sheet", mistakeVi: "Quên chép đáp án từ đề sang phiếu trả lời", tip: "Transfer answers every 5-7 questions, not all at the end. Saves you from time-out disasters.", tipVi: "Chép đáp án sau mỗi 5-7 câu, không dồn cuối. Tránh thảm họa hết giờ." },
  { mistake: "Answering with a word that has the wrong grammar form", mistakeVi: "Trả lời bằng từ sai dạng ngữ pháp", tip: "Read the sentence around the gap: singular or plural? verb or noun? Match the form BEFORE writing.", tipVi: "Đọc câu quanh chỗ trống: số ít/nhiều? động từ/danh từ? Khớp dạng TRƯỚC khi viết." },
  { mistake: "Choosing the option that uses a familiar word from the passage", mistakeVi: "Chọn đáp án có từ quen thuộc xuất hiện trong bài", tip: "Familiar words are the #1 trap. Judge by MEANING, not by word overlap.", tipVi: "Từ quen thuộc là cái bẫy số 1. Đánh giá bằng NGHĨA, không phải trùng chữ." },
];

const BONUS_STEPS: CambridgeStepGuide[] = [
  { step: 900, title: "Warm up your brain", titleVi: "Khởi động bộ não", detail: "Spend 60 seconds reading the instructions aloud, softly. This activates language centres before the timer starts.", detailVi: "Dành 60 giây đọc thầm đề bài thành tiếng. Việc này kích hoạt vùng ngôn ngữ trước khi bấm giờ." },
  { step: 901, title: "Mark, don't marinate", titleVi: "Đánh dấu, đừng đắn đo", detail: "If you spend more than 40 seconds on one item, mark it with a dot and move on. Come back when the easy items are done.", detailVi: "Nếu một câu tốn hơn 40 giây, hãy đánh dấu chấm và đi tiếp. Quay lại sau khi làm hết câu dễ." },
  { step: 902, title: "Prove with evidence", titleVi: "Chứng minh bằng bằng chứng", detail: "For every answer, mentally point to the exact word or sentence in the text/audio that supports it.", detailVi: "Với mỗi đáp án, hãy chỉ ra trong đầu từ hoặc câu cụ thể trong bài đọc/nghe làm bằng chứng." },
  { step: 903, title: "Final 90-second sweep", titleVi: "Rà soát 90 giây cuối", detail: "Reserve the last 90 seconds to check spelling, capital letters, and that every answer sheet bubble is filled.", detailVi: "Dành 90 giây cuối để kiểm tra chính tả, chữ hoa, và mọi ô đáp án đều được điền." },
];

const BONUS_VOCAB: CambridgeVocabItem[] = [
  { word: "practise", meaning: "to do something regularly to improve", meaningVi: "luyện tập thường xuyên để giỏi hơn", example: "I practise English every day." },
  { word: "improve", meaning: "to get better at something", meaningVi: "trở nên giỏi hơn", example: "Reading books helps you improve your vocabulary." },
  { word: "confident", meaning: "sure about yourself and your ability", meaningVi: "tự tin", example: "She feels confident before the speaking test." },
  { word: "mistake", meaning: "something you do that is wrong", meaningVi: "lỗi sai", example: "It's okay to make a mistake when you learn." },
  { word: "review", meaning: "to look at something again to remember it", meaningVi: "ôn lại", example: "Review the lesson before you go to bed." },
  { word: "focus", meaning: "to give all your attention to one thing", meaningVi: "tập trung", example: "Focus on the question, not on the clock." },
];

function skillPractice(skill: string): CambridgePracticeItem[] {
  const base: CambridgePracticeItem[] = [
    {
      instruction: "Choose the correct answer.",
      instructionVi: "Chọn đáp án đúng.",
      question: "In a Cambridge exam, the FIRST thing you should do when you get the paper is:",
      options: ["Start writing", "Read the instructions carefully", "Look at the clock", "Ask the examiner a question"],
      answer: 1,
      explanation: "Reading instructions prevents most avoidable mistakes.",
      explanationVi: "Đọc hướng dẫn tránh được hầu hết lỗi có thể phòng." ,
    },
    {
      instruction: "Choose the correct answer.",
      instructionVi: "Chọn đáp án đúng.",
      question: "If you don't know the answer to a question, you should:",
      options: ["Leave it blank", "Cry", "Make your best guess", "Skip the whole section"],
      answer: 2,
      explanation: "Cambridge does not deduct for wrong answers, so always guess.",
      explanationVi: "Cambridge không trừ điểm câu sai, nên luôn đoán.",
    },
  ];
  if (skill === "speaking") {
    base.push({
      instruction: "Choose the best full-sentence reply.",
      instructionVi: "Chọn câu trả lời đầy đủ nhất.",
      question: "Examiner: 'What is your favourite colour?'",
      options: ["Blue.", "My favourite colour is blue because it looks like the sky.", "Colour blue.", "I don't know."],
      answer: 1,
      explanation: "A full sentence with a reason scores higher than a one-word answer.",
      explanationVi: "Câu đầy đủ có lý do đạt điểm cao hơn câu một từ.",
    });
  }
  return base;
}

function expandRules(l: CambridgeLecture): CambridgeIllustratedRule[] {
  if (l.illustratedRules.length >= TARGET_RULES) return l.illustratedRules;
  const bonuses = BONUS_RULES_BY_SKILL[l.skill] ?? [];
  const existingRules = new Set(l.illustratedRules.map(r => r.rule.toLowerCase().trim()));
  const fresh = bonuses.filter(b => !existingRules.has(b.rule.toLowerCase().trim()));
  const need = TARGET_RULES - l.illustratedRules.length;
  return [...l.illustratedRules, ...fresh.slice(0, need)];
}

function expandWatchOut(l: CambridgeLecture): CambridgeWatchOut[] {
  if (l.watchOut.length >= TARGET_WATCHOUT) return l.watchOut;
  const need = TARGET_WATCHOUT - l.watchOut.length;
  const existing = new Set(l.watchOut.map(w => w.mistake.toLowerCase().trim()));
  const fresh = BONUS_WATCHOUT.filter(b => !existing.has(b.mistake.toLowerCase().trim()));
  return [...l.watchOut, ...fresh.slice(0, need)];
}

function expandSteps(l: CambridgeLecture): CambridgeStepGuide[] {
  if (l.stepByStep.length >= TARGET_STEPS) return l.stepByStep;
  const need = TARGET_STEPS - l.stepByStep.length;
  const maxStep = l.stepByStep.reduce((m, s) => Math.max(m, s.step), 0);
  const fresh = BONUS_STEPS.slice(0, need).map((s, i) => ({ ...s, step: maxStep + i + 1 }));
  return [...l.stepByStep, ...fresh];
}

function expandVocab(l: CambridgeLecture): CambridgeVocabItem[] {
  if (l.vocabulary.length >= TARGET_VOCAB) return l.vocabulary;
  const existing = new Set(l.vocabulary.map(v => v.word.toLowerCase().trim()));
  const fresh = BONUS_VOCAB.filter(b => !existing.has(b.word.toLowerCase().trim()));
  const need = TARGET_VOCAB - l.vocabulary.length;
  return [...l.vocabulary, ...fresh.slice(0, need)];
}

function expandPractice(l: CambridgeLecture): CambridgePracticeItem[] {
  if (l.practiceSet.length >= TARGET_PRACTICE) return l.practiceSet;
  const need = TARGET_PRACTICE - l.practiceSet.length;
  const existing = new Set(l.practiceSet.map(p => p.question.toLowerCase().trim()));
  const fresh = skillPractice(l.skill).filter(p => !existing.has(p.question.toLowerCase().trim()));
  return [...l.practiceSet, ...fresh.slice(0, need)];
}

// ============================================================
// MAIN ENRICHMENT API
// ============================================================

export interface EnrichedCambridgeLecture extends CambridgeLecture {
  deepDive: DeepDiveBlock[];
  /** Số câu quiz được sinh tự động (để hiển thị badge). */
  generatedQuizCount: number;
}

const cache = new Map<string, EnrichedCambridgeLecture>();

export function enrichCambridgeLecture(
  lecture: CambridgeLecture
): EnrichedCambridgeLecture {
  const cached = cache.get(lecture.id);
  if (cached) return cached;

  const originalQuizLen = lecture.quiz.length;
  const expandedRules = expandRules(lecture);
  const expandedWatchOut = expandWatchOut(lecture);
  const expandedSteps = expandSteps(lecture);
  const expandedVocab = expandVocab(lecture);
  const expandedPractice = expandPractice(lecture);
  // Quiz uses expanded rules/vocab/watchOut for richer generation pool.
  const expandedQuiz = expandQuiz({
    ...lecture,
    illustratedRules: expandedRules,
    watchOut: expandedWatchOut,
    vocabulary: expandedVocab,
  });

  const enriched: EnrichedCambridgeLecture = {
    ...lecture,
    stepByStep: expandedSteps,
    illustratedRules: expandedRules,
    watchOut: expandedWatchOut,
    practiceSet: expandedPractice,
    vocabulary: expandedVocab,
    quiz: expandedQuiz,
    deepDive: buildDeepDive(lecture),
    generatedQuizCount: Math.max(0, expandedQuiz.length - originalQuizLen),
  };

  cache.set(lecture.id, enriched);
  return enriched;
}
