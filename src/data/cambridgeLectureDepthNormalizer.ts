/**
 * @file cambridgeLectureDepthNormalizer.ts
 * @description Final quality gate for every Cambridge (Starters -> PET) lecture.
 *              Guarantees each lecture is detailed, clear and complete:
 *              - unique lecture ids (duplicates were unreachable in routing)
 *              - level + skill specific exam pattern / secret tip / parent info /
 *                welcome message instead of shared boilerplate
 *              - at least 5 substantive step-by-step items, each with a concrete
 *                worked example students can follow
 *              - balanced quiz / practice answer keys (no "always B" bias)
 *              English comments only.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type {
  CambridgeLecture,
  CambridgeLevel,
  CambridgeSkill,
  CambridgeStepGuide,
} from "./cambridgeLecturesData";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

/** Boilerplate strings that were copy-pasted across dozens of lectures. */
const GENERIC_MARKERS = [
  "cambridge yle / ket / pet task practice",
  "make a mental picture for every new word",
  "read the question twice, underline keywords",
  "underline keywords first, then choose carefully",
  "short focused lesson aligned with cambridge syllabus",
  "compact lesson with vocabulary, rules and quiz aligned",
  "this kid-friendly lesson uses pictures, 5-step guidance",
  "appears in starters via picture matching",
  "appears in movers via picture matching",
  "appears in flyers via picture matching",
  "appears in ket via picture matching",
  "appears in pet via picture matching",
];

const isGeneric = (text: string | undefined, minLen: number): boolean => {
  if (!text) return true;
  const low = text.toLowerCase();
  if (text.trim().length < minLen) return true;
  return GENERIC_MARKERS.some(m => low.includes(m));
};

/* ------------------------------------------------------------------ */
/* Level profiles (CEFR, age, exam paper facts)                        */
/* ------------------------------------------------------------------ */

interface LevelProfile {
  label: string;
  cefr: string;
  age: string;
  ageVi: string;
  /** Realistic paper facts used in examPattern text. */
  papers: string;
  papersVi: string;
  /** A model sentence at the right difficulty, reused inside steps. */
  model: string;
  modelVi: string;
  scoring: string;
  scoringVi: string;
}

const LEVELS: Record<CambridgeLevel, LevelProfile> = {
  starters: {
    label: "Pre A1 Starters",
    cefr: "Pre-A1",
    age: "ages 6-8",
    ageVi: "6-8 tuổi",
    papers:
      "Listening (4 parts, 20 minutes, 20 questions), Reading & Writing (5 parts, 20 minutes, 25 questions) and Speaking (3-5 minutes, one-to-one with an examiner)",
    papersVi:
      "Nghe (4 phần, 20 phút, 20 câu), Đọc & Viết (5 phần, 20 phút, 25 câu) và Nói (3-5 phút, nói 1-1 với giám khảo)",
    model: "This is a red bag. It is under the table.",
    modelVi: "This is a red bag. It is under the table. (Đây là cái cặp đỏ. Nó ở dưới bàn.)",
    scoring:
      "Children get shields, never a fail: 1-5 shields per paper, so the goal is simply to attempt every question",
    scoringVi:
      "Bé nhận khiên (shield) chứ không trượt: 1-5 khiên mỗi kỹ năng, nên mục tiêu là làm hết mọi câu",
  },
  movers: {
    label: "A1 Movers",
    cefr: "A1",
    age: "ages 8-11",
    ageVi: "8-11 tuổi",
    papers:
      "Listening (5 parts, 25 minutes), Reading & Writing (6 parts, 30 minutes, 35 questions) and Speaking (5-7 minutes)",
    papersVi:
      "Nghe (5 phần, 25 phút), Đọc & Viết (6 phần, 30 phút, 35 câu) và Nói (5-7 phút)",
    model: "Yesterday my sister played badminton in the park with her cousin.",
    modelVi:
      "Yesterday my sister played badminton in the park with her cousin. (Hôm qua chị tôi chơi cầu lông trong công viên với em họ.)",
    scoring:
      "Up to 5 shields per paper; 10-11 shields overall shows the child is ready for Flyers",
    scoringVi:
      "Tối đa 5 khiên mỗi kỹ năng; tổng 10-11 khiên là con đã sẵn sàng lên Flyers",
  },
  flyers: {
    label: "A2 Flyers",
    cefr: "A2",
    age: "ages 10-12",
    ageVi: "10-12 tuổi",
    papers:
      "Listening (5 parts, 25 minutes), Reading & Writing (7 parts, 40 minutes, 50 questions) and Speaking (7-9 minutes)",
    papersVi:
      "Nghe (5 phần, 25 phút), Đọc & Viết (7 phần, 40 phút, 50 câu) và Nói (7-9 phút)",
    model:
      "While we were waiting for the bus, it started to rain, so we ran into a small shop.",
    modelVi:
      "While we were waiting for the bus, it started to rain, so we ran into a small shop. (Trong lúc đợi xe buýt thì trời mưa nên chúng tôi chạy vào một cửa hàng nhỏ.)",
    scoring:
      "5 shields per paper; Flyers sits at the same level as A2 Key for Schools",
    scoringVi:
      "5 khiên mỗi kỹ năng; Flyers tương đương trình độ A2 Key for Schools",
  },
  ket: {
    label: "A2 Key for Schools (KET)",
    cefr: "A2",
    age: "ages 11-14",
    ageVi: "11-14 tuổi",
    papers:
      "Reading & Writing (7 parts, 60 minutes, 50% of the score), Listening (5 parts, ~30 minutes, 25%) and Speaking (2 parts, 8-10 minutes in pairs, 25%)",
    papersVi:
      "Đọc & Viết (7 phần, 60 phút, chiếm 50% điểm), Nghe (5 phần, ~30 phút, 25%) và Nói (2 phần, 8-10 phút theo cặp, 25%)",
    model:
      "I'm writing to tell you about the school trip we went on last weekend. It was great fun.",
    modelVi:
      "I'm writing to tell you about the school trip we went on last weekend. (Mình viết thư kể cho bạn về chuyến đi của trường cuối tuần trước.)",
    scoring:
      "Cambridge English Scale 100-150; 140+ gives a Grade A (a B1 result on the certificate)",
    scoringVi:
      "Thang điểm Cambridge 100-150; từ 140 trở lên đạt Grade A (được ghi nhận mức B1)",
  },
  pet: {
    label: "B1 Preliminary for Schools (PET)",
    cefr: "B1",
    age: "ages 13-16",
    ageVi: "13-16 tuổi",
    papers:
      "Reading (6 parts, 45 minutes), Writing (2 parts, 45 minutes), Listening (4 parts, ~30 minutes) and Speaking (4 parts, 12-17 minutes in pairs) - each paper is 25% of the score",
    papersVi:
      "Đọc (6 phần, 45 phút), Viết (2 phần, 45 phút), Nghe (4 phần, ~30 phút) và Nói (4 phần, 12-17 phút theo cặp) - mỗi kỹ năng chiếm 25% điểm",
    model:
      "Although the museum was crowded, we managed to see everything, which made the long journey worthwhile.",
    modelVi:
      "Although the museum was crowded, we managed to see everything, which made the long journey worthwhile. (Dù bảo tàng rất đông, chúng tôi vẫn xem được hết nên chuyến đi dài rất đáng.)",
    scoring:
      "Cambridge English Scale 120-170; 160+ earns a Grade A, reported as B2",
    scoringVi:
      "Thang điểm Cambridge 120-170; từ 160 trở lên đạt Grade A, ghi nhận mức B2",
  },
};

/* ------------------------------------------------------------------ */
/* Skill profiles                                                      */
/* ------------------------------------------------------------------ */

interface SkillProfile {
  name: string;
  nameVi: string;
  where: string;
  whereVi: string;
  tip: string;
  tipVi: string;
}

const SKILLS: Record<CambridgeSkill, SkillProfile> = {
  listening: {
    name: "Listening",
    nameVi: "Nghe",
    where:
      "the Listening paper, where every recording is played twice and answers must be copied exactly as they are spelt out",
    whereVi:
      "bài thi Nghe, mỗi đoạn ghi âm được phát 2 lần và đáp án phải chép đúng chính tả như người nói đánh vần",
    tip: "🔑 Use the first listening to catch the answer and the second listening only to check spelling, numbers and plural -s. Distractors are almost always corrected out loud ('No, not Tuesday - Thursday'), so wait for the full sentence before you write.",
    tipVi:
      "🔑 Lần nghe 1 để bắt đáp án, lần nghe 2 chỉ để soát chính tả, con số và đuôi -s. Bẫy thường được người nói sửa lại ngay ('No, not Tuesday - Thursday'), nên hãy nghe hết câu rồi mới viết.",
  },
  "reading-writing": {
    name: "Reading & Writing",
    nameVi: "Đọc & Viết",
    where:
      "the Reading & Writing paper, where gap-fills, matching and short written texts are marked for both meaning and accurate spelling",
    whereVi:
      "bài thi Đọc & Viết, gồm điền từ, nối ý và bài viết ngắn - chấm cả nội dung lẫn chính tả",
    tip: "🔑 Answer with evidence: underline the exact words in the text that prove your choice. If you cannot point to the line, the answer is a guess. In writing tasks, cover every bullet point - a missing point costs more marks than a small grammar slip.",
    tipVi:
      "🔑 Trả lời phải có bằng chứng: gạch chân đúng câu trong bài chứng minh lựa chọn. Không chỉ được dòng nào nghĩa là đang đoán. Bài viết phải trả lời đủ mọi gạch đầu dòng - thiếu ý mất điểm nhiều hơn lỗi ngữ pháp nhỏ.",
  },
  speaking: {
    name: "Speaking",
    nameVi: "Nói",
    where:
      "the Speaking test, where the examiner rewards extended answers, clear pronunciation and natural interaction with the partner",
    whereVi:
      "bài thi Nói, giám khảo cộng điểm cho câu trả lời mở rộng, phát âm rõ và tương tác tự nhiên với bạn cùng cặp",
    tip: "🔑 Never answer in one word. Use the Answer + Reason + Example formula: 'I like swimming, because it keeps me healthy - for example, I swim every Sunday with my brother.' Three sentences is the sweet spot.",
    tipVi:
      "🔑 Không trả lời cụt lủn. Dùng công thức Trả lời + Lý do + Ví dụ: 'I like swimming, because it keeps me healthy - for example, I swim every Sunday with my brother.' Ba câu là vừa đẹp.",
  },
  vocabulary: {
    name: "Vocabulary",
    nameVi: "Từ vựng",
    where:
      "every paper - the official wordlist for this level is the source of almost all test items",
    whereVi:
      "mọi kỹ năng - danh sách từ chính thức của cấp độ này là nguồn của gần như toàn bộ câu hỏi",
    tip: "🔑 Learn words in chunks, not alone: not 'ride' but 'ride a bike to school'. Chunks give you the preposition, the collocation and a ready-made speaking sentence at the same time.",
    tipVi:
      "🔑 Học từ theo cụm, đừng học từ lẻ: không phải 'ride' mà là 'ride a bike to school'. Cụm từ cho bạn cả giới từ, cách kết hợp và một câu nói sẵn.",
  },
  grammar: {
    name: "Grammar",
    nameVi: "Ngữ pháp",
    where:
      "gap-fill and sentence-transformation tasks, and indirectly in every written and spoken answer",
    whereVi:
      "các câu điền từ, biến đổi câu, và gián tiếp trong mọi câu viết và nói",
    tip: "🔑 Say the rule as a formula before you answer: subject + verb + object, or if + past + would + verb. A formula in your head stops 80% of careless mistakes under time pressure.",
    tipVi:
      "🔑 Nhẩm công thức trước khi trả lời: subject + verb + object, hay if + past + would + verb. Có công thức trong đầu là tránh được 80% lỗi ẩu khi thi gấp.",
  },
};

/* ------------------------------------------------------------------ */
/* Step builders: 5 substantive, skill-aware steps with examples       */
/* ------------------------------------------------------------------ */

type StepSeed = Omit<CambridgeStepGuide, "step">;

const buildSteps = (
  skill: CambridgeSkill,
  level: CambridgeLevel,
  topic: string,
  topicVi: string
): StepSeed[] => {
  const L = LEVELS[level];
  const common: StepSeed[] = [
    {
      title: "Check your answers like an examiner",
      titleVi: "Tự soát bài như giám khảo",
      detail: `Before you finish, re-read every answer once. Check three things: spelling of the key word, the verb ending (-s, -ed, -ing) and whether the answer really matches the question word (who / where / when / how many). Example: the question asks "How many?" so "at the park" cannot be right - the answer must be a number such as "fourteen". ${L.scoring}.`,
      detailVi: `Trước khi nộp, đọc lại từng đáp án một lần. Kiểm tra 3 thứ: chính tả từ khoá, đuôi động từ (-s, -ed, -ing) và đáp án có khớp từ để hỏi không (who / where / when / how many). Ví dụ: câu hỏi "How many?" thì "at the park" chắc chắn sai - đáp án phải là số như "fourteen". ${L.scoringVi}.`,
    },
    {
      title: "Practise with a 10-minute daily routine",
      titleVi: "Luyện 10 phút mỗi ngày",
      detail: `Repeat this lesson in short bursts: 3 minutes reading the rules aloud, 4 minutes doing the practice set below, 3 minutes writing your own example sentence about ${topic}. Short daily practice beats one long session because the brain keeps what it meets again within 24 hours.`,
      detailVi: `Ôn bài này theo từng đợt ngắn: 3 phút đọc to phần quy tắc, 4 phút làm bài luyện tập bên dưới, 3 phút tự viết một câu ví dụ về ${topicVi}. Luyện ngắn mỗi ngày hiệu quả hơn học dồn vì não giữ lại thứ được gặp lại trong 24 giờ.`,
    },
  ];

  const bySkill: Record<CambridgeSkill, StepSeed[]> = {
    listening: [
      {
        title: "Read the questions before the audio starts",
        titleVi: "Đọc câu hỏi trước khi mở audio",
        detail: `You always get time to look at the paper first. Use it to underline the question word and to predict the answer type: a number, a name, a colour or a place. Example for ${topic}: if the question is "What time does the class start?" you already know the answer is a time such as "half past nine", so you listen only for clock words.`,
        detailVi: `Bạn luôn có thời gian nhìn đề trước. Hãy gạch chân từ để hỏi và đoán loại đáp án: số, tên, màu hay nơi chốn. Ví dụ với ${topicVi}: nếu hỏi "What time does the class start?" thì bạn biết đáp án là giờ như "half past nine", nên chỉ cần nghe từ chỉ giờ.`,
      },
      {
        title: "Catch the keyword, not every word",
        titleVi: "Bắt từ khoá, không nghe từng chữ",
        detail: `Trying to understand 100% of the recording makes students freeze. Listen for the keyword you underlined and for the words around it. Example: to answer "Where is the cat?" you only need the preposition - "The cat is behind the door" - so "behind" is the whole answer.`,
        detailVi: `Cố nghe hiểu 100% khiến học sinh hoảng. Chỉ nghe từ khoá đã gạch chân và các từ xung quanh nó. Ví dụ: để trả lời "Where is the cat?" bạn chỉ cần giới từ - "The cat is behind the door" - vậy "behind" chính là đáp án.`,
      },
      {
        title: "Beware of the correction trap",
        titleVi: "Cẩn thận bẫy 'nói lại'",
        detail: `Cambridge recordings almost always mention a wrong option first and then correct it: "We'll meet at four... no, sorry, at five." The answer is the SECOND one. Never write during the first half of a sentence - wait for the full stop, then write.`,
        detailVi: `Băng thi Cambridge gần như luôn nhắc phương án sai trước rồi mới sửa: "We'll meet at four... no, sorry, at five." Đáp án là thông tin THỨ HAI. Đừng viết khi câu chưa hết - nghe hết câu rồi hãy viết.`,
      },
      {
        title: "Spell the answer exactly",
        titleVi: "Viết đúng chính tả đáp án",
        detail: `Spelling questions are lost marks, not lost listening. When a name is spelt out ("H-A-N-O-I"), write the letters as you hear them and read them back. Watch double letters (Bill, Ann, Emma) and capital letters for names and days. ${L.model}`,
        detailVi: `Mất điểm chính tả là mất điểm oan chứ không phải do nghe kém. Khi người ta đánh vần ("H-A-N-O-I"), viết ngay từng chữ rồi đọc lại. Chú ý chữ đôi (Bill, Ann, Emma) và viết hoa tên riêng, thứ trong tuần. ${L.modelVi}`,
      },
    ],
    "reading-writing": [
      {
        title: "Skim the whole text in 30 seconds",
        titleVi: "Đọc lướt toàn bài trong 30 giây",
        detail: `First read the title and the first line of each paragraph to see what the text is about - do not stop at unknown words. For ${topic}, a quick skim tells you whether the text is a story, an email or a factual description, and that decides where the answers will be.`,
        detailVi: `Đầu tiên đọc tiêu đề và câu đầu mỗi đoạn để biết bài nói về gì - đừng dừng lại ở từ lạ. Với ${topicVi}, đọc lướt cho biết đây là truyện, email hay bài mô tả, và điều đó quyết định đáp án nằm ở đâu.`,
      },
      {
        title: "Match the question to the exact line",
        titleVi: "Nối câu hỏi với đúng dòng trong bài",
        detail: `Every correct answer can be proved by one line of the text. Underline that line and write the question number next to it. Example: question "Where did Tom go on Sunday?" → the text says "On Sunday Tom visited his grandmother in the countryside" → the answer is "to his grandmother's" / "the countryside".`,
        detailVi: `Mỗi đáp án đúng đều chứng minh được bằng một dòng trong bài. Gạch chân dòng đó và ghi số câu bên cạnh. Ví dụ: hỏi "Where did Tom go on Sunday?" → bài viết "On Sunday Tom visited his grandmother in the countryside" → đáp án là "to his grandmother's" / "the countryside".`,
      },
      {
        title: "Watch for paraphrase, not the same word",
        titleVi: "Chú ý cách diễn đạt lại, không lặp từ",
        detail: `Cambridge rewrites the idea instead of repeating it: "cheap" in the question can be "didn't cost much" in the text; "began" can be "started". An option that copies words from the text word-for-word is usually the trap option.`,
        detailVi: `Cambridge diễn đạt lại ý chứ không lặp từ: "cheap" trong câu hỏi có thể là "didn't cost much" trong bài; "began" thành "started". Phương án sao chép nguyên văn từ bài thường chính là bẫy.`,
      },
      {
        title: "Plan writing before you write",
        titleVi: "Lập dàn ý trước khi viết",
        detail: `Spend 2 minutes listing the bullet points you must answer, one short note each. Then write: opening line, one sentence per bullet, closing line. Model sentence at this level: "${L.model}" Finally count the words - too short loses content marks.`,
        detailVi: `Dành 2 phút liệt kê các gạch đầu dòng phải trả lời, mỗi ý một ghi chú ngắn. Rồi viết: câu mở, mỗi ý một câu, câu kết. Câu mẫu ở cấp độ này: "${L.model}" Cuối cùng đếm số từ - viết thiếu là mất điểm nội dung.`,
      },
    ],
    speaking: [
      {
        title: "Warm up your mouth and your ideas",
        titleVi: "Khởi động miệng và ý tưởng",
        detail: `Before the test, say five sentences about ${topic} out loud. Speaking starts badly when the first English sentence of the day is said in front of the examiner. Warming up also fixes pronunciation of the /s/ and /t/ endings Vietnamese learners often drop.`,
        detailVi: `Trước khi thi, nói to 5 câu về ${topicVi}. Phần Nói hay hỏng khi câu tiếng Anh đầu tiên trong ngày lại nói trước mặt giám khảo. Khởi động cũng giúp sửa đuôi /s/, /t/ mà người Việt hay bỏ.`,
      },
      {
        title: "Use the Answer + Reason + Example formula",
        titleVi: "Dùng công thức Trả lời + Lý do + Ví dụ",
        detail: `One-word answers score low. Example: "Do you like ${topic}?" → "Yes, I do. I like it because it makes me feel relaxed. For example, last weekend I spent two hours on it with my best friend." That is three sentences and a full mark for extended answers.`,
        detailVi: `Trả lời một từ bị điểm thấp. Ví dụ: "Do you like ${topicVi}?" → "Yes, I do. I like it because it makes me feel relaxed. For example, last weekend I spent two hours on it with my best friend." Ba câu là đủ điểm cho phần mở rộng.`,
      },
      {
        title: "Keep talking when you forget a word",
        titleVi: "Quên từ vẫn phải nói tiếp",
        detail: `Silence loses more marks than a wrong word. Use a rescue phrase: "I don't know the word in English, but it's a thing you use for..." Examiners reward this - it is real communication strategy, exactly what the mark scheme calls "interactive communication".`,
        detailVi: `Im lặng mất điểm nhiều hơn nói sai từ. Dùng câu cứu nguy: "I don't know the word in English, but it's a thing you use for..." Giám khảo cộng điểm cho việc này - đó chính là "interactive communication" trong thang chấm.`,
      },
      {
        title: "Work with your partner, not against them",
        titleVi: "Hợp tác với bạn cùng cặp",
        detail: `In paired tasks, ask your partner questions and react: "What do you think?", "That's a good idea, and we could also...". Never interrupt or answer for them. ${L.model}`,
        detailVi: `Ở phần thi cặp, hãy hỏi và phản hồi bạn mình: "What do you think?", "That's a good idea, and we could also...". Không cắt lời hay nói thay bạn. ${L.modelVi}`,
      },
    ],
    vocabulary: [
      {
        title: "Learn the word in a chunk",
        titleVi: "Học từ theo cụm",
        detail: `Never record a single word. Record the chunk it lives in: not "ride" but "ride a bike to school"; not "interested" but "interested IN music". The chunk carries the preposition and gives you a ready-made sentence for Speaking about ${topic}.`,
        detailVi: `Đừng ghi từ lẻ. Ghi cả cụm chứa nó: không phải "ride" mà "ride a bike to school"; không phải "interested" mà "interested IN music". Cụm từ mang theo giới từ và cho bạn sẵn một câu để nói về ${topicVi}.`,
      },
      {
        title: "Say it, see it, write it",
        titleVi: "Nói - nhìn - viết",
        detail: `Use three channels for each new word: say it aloud twice, draw or picture the meaning, then write one true sentence about yourself. Example: "quiet" → picture a library → "My bedroom is quiet in the evening." Words tied to your real life stay for months.`,
        detailVi: `Dùng ba kênh cho mỗi từ mới: nói to 2 lần, vẽ hoặc hình dung nghĩa, rồi viết một câu thật về bản thân. Ví dụ: "quiet" → hình dung thư viện → "My bedroom is quiet in the evening." Từ gắn với đời thật sẽ nhớ hàng tháng.`,
      },
      {
        title: "Group words into families",
        titleVi: "Nhóm từ theo họ từ",
        detail: `Store words by topic and by word family: play - player - playground; happy - unhappy - happiness. Cambridge tests the family member that fits the gap, so knowing only one form is a common way to lose an easy mark.`,
        detailVi: `Lưu từ theo chủ đề và theo họ từ: play - player - playground; happy - unhappy - happiness. Cambridge hay hỏi dạng từ phù hợp với chỗ trống, nên chỉ biết một dạng là mất điểm dễ.`,
      },
      {
        title: "Review on days 1, 3 and 7",
        titleVi: "Ôn lại vào ngày 1, 3 và 7",
        detail: `Spaced repetition beats rereading. Test yourself the next day, again after three days and again after a week; keep only the words you got wrong in the "hard" pile. ${L.model}`,
        detailVi: `Ôn giãn cách hiệu quả hơn đọc lại. Tự kiểm tra vào hôm sau, sau 3 ngày và sau 1 tuần; chỉ giữ lại các từ sai vào nhóm "khó". ${L.modelVi}`,
      },
    ],
    grammar: [
      {
        title: "Turn the rule into a formula",
        titleVi: "Biến quy tắc thành công thức",
        detail: `Write the pattern as a short formula you can say in one breath, for example "He/She/It + verb + s" or "was/were + V-ing". A formula is faster to recall under exam pressure than a long explanation about ${topic}.`,
        detailVi: `Viết quy tắc thành công thức ngắn đọc được trong một hơi, ví dụ "He/She/It + verb + s" hay "was/were + V-ing". Công thức nhớ nhanh hơn lời giải thích dài về ${topicVi} khi đang thi gấp.`,
      },
      {
        title: "Compare a right and a wrong sentence",
        titleVi: "So sánh câu đúng và câu sai",
        detail: `Always study the pair. ✗ "She go to school by bus." ✓ "She goes to school by bus." Seeing the two side by side teaches the eye to spot the missing -s instantly, which is exactly what gap-fill questions test.`,
        detailVi: `Luôn học theo cặp. ✗ "She go to school by bus." ✓ "She goes to school by bus." Nhìn hai câu cạnh nhau giúp mắt phát hiện thiếu -s ngay lập tức - đúng thứ câu điền từ kiểm tra.`,
      },
      {
        title: "Find the time words first",
        titleVi: "Tìm từ chỉ thời gian trước",
        detail: `Time markers decide the tense: yesterday / last week → past simple; every day / usually → present simple; now / at the moment → present continuous. Read the whole sentence and circle the time word before you choose a verb form.`,
        detailVi: `Từ chỉ thời gian quyết định thì: yesterday / last week → quá khứ đơn; every day / usually → hiện tại đơn; now / at the moment → hiện tại tiếp diễn. Đọc cả câu, khoanh từ chỉ thời gian rồi mới chọn dạng động từ.`,
      },
      {
        title: "Use the rule in your own sentence",
        titleVi: "Dùng quy tắc trong câu của chính mình",
        detail: `A rule is only learnt when you can produce it. Write two true sentences about your own week using the pattern. Model at this level: "${L.model}" Read them aloud - if it sounds wrong, check the formula again.`,
        detailVi: `Chỉ khi tự tạo được câu thì mới thực sự nắm quy tắc. Viết 2 câu thật về tuần của bạn theo mẫu đó. Câu mẫu cấp độ này: "${L.model}" Đọc to lên - nếu nghe sai thì kiểm tra lại công thức.`,
      },
    ],
  };

  return [...bySkill[skill], ...common];
};

/* ------------------------------------------------------------------ */
/* Normalizer                                                          */
/* ------------------------------------------------------------------ */

const MIN_STEPS = 5;
const MIN_DETAIL = 110;

const topicOf = (l: CambridgeLecture) =>
  l.title.replace(/^[^A-Za-z0-9]+/, "").replace(/\s*[-–:].*$/, "").trim() || SKILLS[l.skill].name;
const topicViOf = (l: CambridgeLecture) =>
  l.titleVi.replace(/^[^A-Za-zÀ-ỹ0-9]+/, "").replace(/\s*[-–:].*$/, "").trim() || SKILLS[l.skill].nameVi;

/** Rotate multiple-choice options so correct answers are spread across A-D. */
const balanceOptions = <T extends { question: string; options: string[]; answer: number }>(
  item: T,
  seed: string
): T => {
  const n = item.options.length;
  if (n < 2 || item.answer < 0 || item.answer >= n) return item;
  const target = hash(seed + item.question) % n;
  if (target === item.answer) return item;
  const options = [...item.options];
  [options[item.answer], options[target]] = [options[target], options[item.answer]];
  return { ...item, options, answer: target };
};

const enrichStepDetail = (
  s: CambridgeStepGuide,
  L: LevelProfile
): CambridgeStepGuide => {
  if ((s.detail || "").length >= MIN_DETAIL) return s;
  return {
    ...s,
    detail: `${s.detail} Worked example at this level: "${L.model}" Say it aloud, then build one sentence of your own using the same pattern.`,
    detailVi: `${s.detailVi} Ví dụ mẫu ở cấp độ này: "${L.modelVi}" Hãy đọc to, rồi tự đặt một câu tương tự.`,
  };
};

export function normalizeCambridgeLectureDepth(
  lecture: CambridgeLecture
): CambridgeLecture {
  const L = LEVELS[lecture.level] ?? LEVELS.starters;
  const S = SKILLS[lecture.skill] ?? SKILLS.vocabulary;
  const topic = topicOf(lecture);
  const topicVi = topicViOf(lecture);

  /* 1. Steps: at least 5 substantive steps with concrete examples. */
  let steps = (lecture.stepByStep ?? []).map(s => enrichStepDetail(s, L));
  if (steps.length < MIN_STEPS) {
    const existing = new Set(steps.map(s => s.title.toLowerCase().trim()));
    const extra = buildSteps(lecture.skill, lecture.level, topic, topicVi).filter(
      s => !existing.has(s.title.toLowerCase().trim())
    );
    steps = [...steps, ...extra.slice(0, MIN_STEPS - steps.length)];
  }
  steps = steps.map((s, i) => ({ ...s, step: i + 1 }));

  /* 2. Replace shared boilerplate with level + skill specific copy. */
  const examPattern = isGeneric(lecture.examPattern, 120)
    ? `${topic} is tested in ${S.where}. ${L.label} (${L.cefr}, ${L.age}) consists of ${L.papers}. ${L.scoring}.`
    : lecture.examPattern;
  const examPatternVi = isGeneric(lecture.examPattern, 120)
    ? `${topicVi} được kiểm tra trong ${S.whereVi}. ${L.label} (${L.cefr}, ${L.ageVi}) gồm ${L.papersVi}. ${L.scoringVi}.`
    : lecture.examPatternVi;

  const secretTip = isGeneric(lecture.secretTip, 110) ? S.tip : lecture.secretTip;
  const secretTipVi = isGeneric(lecture.secretTip, 110) ? S.tipVi : lecture.secretTipVi;

  const parentInfo = isGeneric(lecture.parentInfo, 180)
    ? `This ${S.name} lesson prepares your child for ${L.label} (${L.cefr}, ${L.age}). It contains a 5-step method, illustrated rules with examples, warnings about the mistakes Vietnamese learners make most often, a graded practice set, key vocabulary with example sentences and a quiz. At home, ask your child to explain the ${topic} rule back to you and to say one example sentence aloud - teaching it back is the fastest proof that the lesson was understood.`
    : lecture.parentInfo;
  const parentInfoVi = isGeneric(lecture.parentInfo, 180)
    ? `Bài ${S.nameVi} này chuẩn bị cho con thi ${L.label} (${L.cefr}, ${L.ageVi}). Bài gồm phương pháp 5 bước, quy tắc minh hoạ kèm ví dụ, cảnh báo lỗi mà học sinh Việt Nam hay mắc, bài luyện tập theo cấp độ, từ vựng kèm câu ví dụ và bài kiểm tra. Ở nhà, hãy nhờ con giảng lại quy tắc ${topicVi} cho bố mẹ và nói to một câu ví dụ - dạy lại được là bằng chứng nhanh nhất cho thấy con đã hiểu bài.`
    : lecture.parentInfoVi;

  const learningObjective =
    (lecture.learningObjective || "").length >= 60
      ? lecture.learningObjective
      : `${lecture.learningObjective} By the end of this lesson you can use ${topic} accurately in ${L.label} tasks and produce your own example sentences.`;
  const learningObjectiveVi =
    (lecture.learningObjective || "").length >= 60
      ? lecture.learningObjectiveVi
      : `${lecture.learningObjectiveVi} Học xong bài này bạn dùng đúng ${topicVi} trong các dạng bài ${L.label} và tự đặt được câu ví dụ.`;

  /* 3. Spread correct answers across positions. */
  const quiz = (lecture.quiz ?? []).map((q, i) =>
    balanceOptions(q, `${lecture.id}-q${i}`)
  );
  const practiceSet = (lecture.practiceSet ?? []).map((p, i) =>
    balanceOptions(p, `${lecture.id}-p${i}`)
  );

  return {
    ...lecture,
    stepByStep: steps,
    examPattern,
    examPatternVi,
    secretTip,
    secretTipVi,
    parentInfo,
    parentInfoVi,
    learningObjective,
    learningObjectiveVi,
    quiz,
    practiceSet,
  };
}

/** Give duplicated lecture ids a stable unique suffix so routing works. */
export function dedupeCambridgeLectureIds(
  lectures: CambridgeLecture[]
): CambridgeLecture[] {
  const seen = new Map<string, number>();
  return lectures.map(l => {
    const count = seen.get(l.id) ?? 0;
    seen.set(l.id, count + 1);
    return count === 0 ? l : { ...l, id: `${l.id}-${count + 1}` };
  });
}
