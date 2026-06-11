/**
 * @file ieltsLecturesListeningExpansion.ts
 * @description Listening-focused lectures: tips, techniques, signposting,
 * distractor traps, spelling drills, prediction & section-specific tactics.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

export const listeningExpansion: IeltsLecture[] = [
  // ===================== 1. PREDICT-LISTEN-CONFIRM =====================
  {
    id: "listening-predict-listen-confirm",
    title: "Listening — The PLC Loop (Predict • Listen • Confirm)",
    titleVi: "Listening — Vòng PLC (Đoán • Nghe • Xác nhận)",
    pillar: "skill-based",
    skill: "listening",
    icon: "🎧",
    duration: "18 min",
    level: "intermediate",
    description:
      "You only hear the audio ONCE. The only way to keep up is to predict the answer BEFORE you hear it — then your ears confirm, not search.",
    descriptionVi:
      "Bạn chỉ nghe MỘT lần. Cách duy nhất theo kịp là ĐOÁN đáp án TRƯỚC khi nghe — tai chỉ làm nhiệm vụ xác nhận, không phải tìm.",
    strategySteps: [
      {
        step: 1,
        title: "PREDICT — use the 30s preview window",
        titleVi: "PREDICT — tận dụng 30 giây xem trước",
        description:
          "Read questions BEFORE audio starts. For each blank, predict (a) part of speech (b) singular/plural (c) likely topic word.",
        descriptionVi:
          "Đọc câu hỏi TRƯỚC khi audio chạy. Mỗi chỗ trống đoán: (a) loại từ (b) số ít/nhiều (c) chủ đề có thể.",
        example: "Blank: 'The lecture is held in the ___ Building.' → predict: PROPER NOUN, singular, likely capitalised name.",
      },
      {
        step: 2,
        title: "LISTEN — anchor on signposts",
        titleVi: "LISTEN — bám vào tín hiệu chỉ đường",
        description:
          "Signposts tell you the answer is coming: 'firstly', 'however', 'the key point is', 'so what does this mean'. Pen ready.",
        descriptionVi:
          "Signpost báo đáp án sắp tới: 'firstly', 'however', 'the key point is', 'so what does this mean'. Sẵn sàng bút.",
      },
      {
        step: 3,
        title: "CONFIRM — match prediction to what you heard",
        titleVi: "CONFIRM — đối chiếu đoán với điều nghe được",
        description:
          "If they match → write it. If they don't → trust your ears, not your prediction. Note the next question's number aloud in your head.",
        descriptionVi:
          "Khớp → ghi. Không khớp → tin tai, đừng tin đoán. Tự nhẩm số câu kế tiếp trong đầu.",
      },
      {
        step: 4,
        title: "MOVE ON — never look back",
        titleVi: "MOVE ON — không quay lại",
        description:
          "If you missed an answer, write a question mark and jump to the next. The audio will not wait. Returning costs you 2 more questions.",
        descriptionVi:
          "Lỡ câu nào, đánh dấu chấm hỏi và nhảy ngay sang câu kế. Audio không chờ. Quay lại = mất thêm 2 câu.",
      },
    ],
    practicalExamples: [
      {
        context: "Question 4: 'Cost: $___'",
        contextVi: "Câu 4: 'Chi phí: $___'",
        example:
          "Prediction: a NUMBER. Audio: '…it's normally seventy dollars but with the student discount, just fifty-five.' Confirm: 55, not 70.",
        explanation: "Distractor (70) appears first — the PLC loop saves you from grabbing it.",
      },
      {
        context: "Section 2 map question: 'The car park is to the ___ of the library.'",
        contextVi: "Câu Section 2 map: 'Bãi xe nằm ở phía ___ của thư viện.'",
        example: "Prediction: a DIRECTION word (north, south, east, west, left, right). Audio: '…just past the library, on the right.' → Answer: right.",
        explanation: "Predicting word class narrows your ear to a tiny target set.",
      },
      {
        context: "You missed question 12 completely.",
        contextVi: "Bạn lỡ hẳn câu 12.",
        example: "Write '?' and lock eyes on question 13. The audio is already speaking about Q13 keywords.",
        explanation: "One missed answer = 1 mark; staying lost = 3-4 marks lost.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Trying to understand every single word",
        mistakeVi: "Cố hiểu từng từ",
        why: "You will fall behind by 2-3 sentences and miss the next answer.",
        whyVi: "Bạn sẽ tụt lại 2-3 câu và lỡ luôn đáp án tiếp theo.",
      },
      {
        mistake: "Writing the FIRST number / name you hear",
        mistakeVi: "Viết SỐ / TÊN đầu tiên bạn nghe",
        why: "Distractors are almost always announced first, then corrected. Wait for the confirming verb (e.g. 'actually', 'I mean', 'sorry, it's…').",
        whyVi: "Distractor luôn xuất hiện trước, rồi mới đính chính. Đợi từ chốt như 'actually', 'I mean', 'sorry, it's…'.",
      },
    ],
    goldenSecret:
      "Listen with a PEN, not with an EAR. The pen forces prediction; the ear alone drifts.",
    goldenSecretVi:
      "Nghe bằng CÂY BÚT, không phải bằng TAI. Bút ép bạn dự đoán; tai một mình sẽ trôi.",
    vocabHighlights: [
      { word: "preview window", definition: "the seconds given to read questions before audio", definitionVi: "khoảng thời gian xem trước câu hỏi", example: "Use every second of the preview window.", band: "7.0" },
      { word: "signpost", definition: "discourse marker showing direction", definitionVi: "từ chỉ dấu trong bài nói", example: "'However' is a key signpost.", band: "7.0" },
      { word: "distractor", definition: "wrong option deliberately placed", definitionVi: "đáp án gây nhiễu", example: "The first number is usually a distractor.", band: "7.5" },
      { word: "confirming verb", definition: "phrase that locks the correct answer", definitionVi: "từ chốt đáp án", example: "'Actually it's…' is a confirming verb.", band: "7.5" },
      { word: "drift", definition: "lose focus and fall behind", definitionVi: "trôi, lạc nhịp", example: "Don't drift — anchor on signposts.", band: "7.5" },
    ],
    quiz: [
      {
        question: "What does PLC stand for?",
        options: ["Plan, Listen, Correct", "Predict, Listen, Confirm", "Pause, Look, Continue", "Phrase, Listen, Check"],
        answer: 1,
        explanation: "Predict → Listen → Confirm.",
      },
      {
        question: "Best use of the 30-second preview window?",
        options: ["Relax your ears", "Predict word class & topic for each blank", "Re-read the instructions", "Translate to Vietnamese"],
        answer: 1,
        explanation: "Prediction primes the ear to confirm, not search.",
      },
      {
        question: "If you miss a question, you should…",
        options: ["Pause mentally and search", "Write '?' and move to the next", "Skip the next 2", "Restart from Section 1"],
        answer: 1,
        explanation: "Audio won't wait; protect the next question.",
      },
      {
        question: "The FIRST number you hear is usually…",
        options: ["The answer", "A distractor", "The speaker's age", "Irrelevant"],
        answer: 1,
        explanation: "Distractors lead, corrections follow.",
      },
      {
        question: "Which is NOT a confirming signal?",
        options: ["Actually it's…", "Sorry, I mean…", "Firstly…", "On second thought…"],
        answer: 2,
        explanation: "'Firstly' opens a list; the others correct earlier info.",
      },
      {
        question: "Why hold a pen during listening?",
        options: ["To look professional", "It forces active prediction & note-taking", "Required by IELTS", "To re-read answers"],
        answer: 1,
        explanation: "Pen-in-hand keeps you in active mode.",
      },
    ],
    cheatSheetPoints: [
      "Predict word class + topic in the 30s preview",
      "Anchor on signposts: 'however', 'actually', 'the key point'",
      "First number/name = usually a distractor",
      "Missed answer → '?' and move on instantly",
      "Pen in hand at all times",
    ],
  },

  // ===================== 2. SIGNPOSTS & DISTRACTORS =====================
  {
    id: "listening-signposts-distractors",
    title: "Listening — Signposts & Distractor Traps",
    titleVi: "Listening — Signpost và bẫy Distractor",
    pillar: "tips-hacks",
    skill: "listening",
    icon: "🚩",
    duration: "16 min",
    level: "intermediate",
    description:
      "Cambridge examiners follow a hidden script: announce a wrong answer, then quietly correct it. Learn the script and you stop falling for it.",
    descriptionVi:
      "Người ra đề Cambridge tuân theo kịch bản ẩn: tung đáp án sai trước, rồi âm thầm sửa lại. Học kịch bản này, bạn ngừng mắc bẫy.",
    strategySteps: [
      {
        step: 1,
        title: "Catalogue the 5 distractor patterns",
        titleVi: "Học thuộc 5 kiểu distractor",
        description:
          "1) Number swap ('70 → 55'); 2) Date change ('Monday → Tuesday'); 3) Name spelling correction; 4) Mind-change ('I'll have tea… actually coffee'); 5) Multiple options ('we offer A, B, or C — let's go with B').",
        descriptionVi:
          "1) Đổi số; 2) Đổi ngày; 3) Đính chính cách viết tên; 4) Đổi ý; 5) Nhiều lựa chọn — chọn 1.",
      },
      {
        step: 2,
        title: "Memorise the 'correction verbs'",
        titleVi: "Thuộc các 'từ đính chính'",
        description:
          "actually, in fact, I mean, sorry, on second thought, hold on, but wait, scrap that, let's change that to, rather than… Always wait for one before writing.",
        descriptionVi:
          "actually, in fact, I mean, sorry, on second thought, hold on, but wait, scrap that, let's change that to, rather than… Luôn đợi 1 trong số này trước khi viết.",
      },
      {
        step: 3,
        title: "Use light pencil first, ink at the end",
        titleVi: "Viết nháp bằng chì, đậm lại cuối",
        description:
          "Note first answer lightly. Update if correction comes. Finalise during the 10-minute transfer window (paper test) or 2-minute review (computer).",
        descriptionVi:
          "Ghi đáp án đầu mờ. Cập nhật khi có sửa. Chốt lúc 10 phút chuyển đáp án (giấy) hoặc 2 phút review (máy).",
      },
    ],
    practicalExamples: [
      {
        context: "Audio: 'My surname is Patterson — P-A-T-E-R-S-O-N. Oh sorry, that's P-A-T-T with double T — Patterson.'",
        contextVi: "Audio đính chính cách viết tên Patterson.",
        example: "Answer: Patterson (with double T). The single-T spelling is the distractor.",
        explanation: "'Sorry' is the correction verb — always finalise AFTER it.",
      },
      {
        context: "Audio: 'The meeting was scheduled for Wednesday, but it's been moved to Thursday morning.'",
        contextVi: "Cuộc họp dời từ thứ Tư sang sáng thứ Năm.",
        example: "Answer: Thursday. Wednesday is the distractor.",
        explanation: "Date change pattern + 'but' signpost.",
      },
      {
        context: "MCQ: 'Which course did the student choose?'",
        contextVi: "MCQ: Học sinh chọn khóa nào?",
        example:
          "Audio: 'I was tempted by photography and considered film studies, but in the end I went for graphic design.' → Answer: graphic design.",
        explanation: "Multi-option distractor; lock only after 'in the end'.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Writing the first thing you hear in ink",
        mistakeVi: "Ghi luôn bằng mực điều đầu tiên nghe",
        why: "Correction is coming; you waste time crossing out and lose focus.",
        whyVi: "Sửa đến ngay sau; bạn mất thời gian xóa và mất tập trung.",
      },
      {
        mistake: "Ignoring spelling corrections",
        mistakeVi: "Bỏ qua đính chính chính tả",
        why: "Misspelling = 0 marks even if the word is right.",
        whyVi: "Sai chính tả = 0 điểm dù từ đúng.",
      },
    ],
    goldenSecret:
      "If you hear an answer in the FIRST 3 seconds of a question's audio block, distrust it. Real answers usually come AFTER a correction verb.",
    goldenSecretVi:
      "Nếu nghe đáp án trong 3 GIÂY đầu của khối audio cho câu đó, hãy NGHI NGỜ. Đáp án thật thường đến SAU một từ đính chính.",
    vocabHighlights: [
      { word: "distractor", definition: "wrong option placed to trap candidate", definitionVi: "đáp án nhiễu", example: "Spot the distractor in section 2.", band: "7.5" },
      { word: "correction verb", definition: "phrase signalling answer update", definitionVi: "từ báo hiệu sửa đáp án", example: "'Actually' is a correction verb.", band: "7.5" },
      { word: "mind-change", definition: "speaker changes their decision", definitionVi: "đổi ý", example: "Watch for mind-change distractors.", band: "7.0" },
      { word: "finalise", definition: "lock the answer in", definitionVi: "chốt đáp án", example: "Finalise during the transfer window.", band: "7.0" },
    ],
    quiz: [
      {
        question: "How many distractor patterns are covered?",
        options: ["3", "4", "5", "6"],
        answer: 2,
        explanation: "Number, Date, Spelling, Mind-change, Multi-option.",
      },
      {
        question: "Which is a 'correction verb'?",
        options: ["Firstly", "Actually", "Moreover", "Therefore"],
        answer: 1,
        explanation: "'Actually' signals a correction.",
      },
      {
        question: "Why use pencil first?",
        options: ["It's cheaper", "So you can update quickly without crossing out", "Required by Cambridge", "It's faster"],
        answer: 1,
        explanation: "Light pencil = easy update during corrections.",
      },
      {
        question: "Audio: 'tea… actually coffee.' Answer is:",
        options: ["tea", "coffee", "both", "neither"],
        answer: 1,
        explanation: "'Actually' locks coffee as the final answer.",
      },
      {
        question: "Misspelling a correct word scores you…",
        options: ["Full mark", "Half mark", "Zero marks", "Bonus"],
        answer: 2,
        explanation: "Spelling errors cost the whole mark.",
      },
      {
        question: "An answer heard in the first 3 seconds is usually…",
        options: ["Confirmed correct", "A distractor", "Section heading", "Irrelevant"],
        answer: 1,
        explanation: "Real answers usually follow a correction verb.",
      },
    ],
    cheatSheetPoints: [
      "5 distractor patterns: Number / Date / Spelling / Mind-change / Multi-option",
      "Wait for: actually, in fact, sorry, I mean, rather than",
      "Pencil light first, ink at transfer",
      "First 3s = suspect; final answer follows correction verb",
    ],
  },

  // ===================== 3. SECTION-SPECIFIC TACTICS =====================
  {
    id: "listening-section-tactics",
    title: "Listening — Section-by-Section Battle Plan (1→4)",
    titleVi: "Listening — Sơ đồ chiến đấu Section 1→4",
    pillar: "skill-based",
    skill: "listening",
    icon: "🗺️",
    duration: "20 min",
    level: "intermediate",
    description:
      "Each section has its own personality. Apply the right tactic per section instead of treating them all the same.",
    descriptionVi:
      "Mỗi section có 'tính cách' riêng. Áp đúng chiến thuật theo section, đừng chiến tất cả y nhau.",
    strategySteps: [
      {
        step: 1,
        title: "Section 1 — Transactional (form-filling)",
        titleVi: "Section 1 — Trao đổi hằng ngày (điền form)",
        description:
          "Expect names (spelt), addresses, phone numbers, dates, prices. Pre-write number/letter slots. Watch double letters and 0/oh.",
        descriptionVi:
          "Dự kiến: tên (đánh vần), địa chỉ, số điện thoại, ngày, giá. Vẽ sẵn ô số/chữ. Cẩn thận double letter và 0/oh.",
      },
      {
        step: 2,
        title: "Section 2 — Monologue (tour, map, info)",
        titleVi: "Section 2 — Độc thoại (tour, map, thông tin)",
        description:
          "Map questions follow physical order. Use directional verbs (turn, opposite, behind). Mark north on the map.",
        descriptionVi:
          "Câu hỏi map đi theo trật tự không gian. Bám vào động từ chỉ hướng. Đánh dấu chiều Bắc.",
      },
      {
        step: 3,
        title: "Section 3 — Discussion (2-3 academic speakers)",
        titleVi: "Section 3 — Thảo luận (2-3 học viên)",
        description:
          "Identify each voice's role (tutor / student A / student B). Opinions clash — answer often = whoever changes their mind LAST.",
        descriptionVi:
          "Nhận diện vai từng giọng (giáo viên / SV A / SV B). Ý kiến đối chọi — đáp án thường là người ĐỔI Ý CUỐI CÙNG.",
      },
      {
        step: 4,
        title: "Section 4 — Academic lecture (one speaker, no break)",
        titleVi: "Section 4 — Bài giảng học thuật (1 người, không nghỉ)",
        description:
          "No mid-section pause! Read all 10 questions in the opening 30 seconds. Focus on signposts: 'three main reasons', 'finally', 'in conclusion'.",
        descriptionVi:
          "KHÔNG có khoảng nghỉ giữa! Đọc cả 10 câu trong 30 giây đầu. Bám tín hiệu: 'three main reasons', 'finally', 'in conclusion'.",
      },
    ],
    practicalExamples: [
      {
        context: "Section 1, Q3: Postcode: ___",
        contextVi: "Section 1, câu 3: Postcode: ___",
        example: "Audio: 'NR2 4ER. That's N-R-two, four-E-R.' Repeated spelling = high-confidence answer.",
        explanation: "Numbers + letters are repeated; second pronunciation is the lock.",
      },
      {
        context: "Section 2 map: 'Find the gift shop.'",
        contextVi: "Section 2 map: tìm cửa hàng quà.",
        example: "Audio: 'Walk past the café, the shop is opposite the toilets.' → mark gift shop directly across from the toilet symbol.",
        explanation: "'Opposite' = exactly across; not 'next to'.",
      },
      {
        context: "Section 3: 'What does the tutor RECOMMEND?'",
        contextVi: "Section 3: Tutor khuyên gì?",
        example: "Students propose A and B. Tutor says 'I'd actually suggest C, given your timeline.' → Answer: C.",
        explanation: "Listen for the tutor's final pivot — 'actually suggest'.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Underestimating Section 1",
        mistakeVi: "Xem nhẹ Section 1",
        why: "Easiest in content but spelling traps cost the most marks here.",
        whyVi: "Nội dung dễ nhất nhưng bẫy chính tả lại mất điểm nhiều nhất.",
      },
      {
        mistake: "Confusing speakers in Section 3",
        mistakeVi: "Lẫn lộn các giọng nói trong Section 3",
        why: "Wrong-speaker attribution = wrong answer in 'who thinks…' questions.",
        whyVi: "Gán sai giọng = sai đáp án ở câu 'ai cho rằng…'.",
      },
      {
        mistake: "Trying to skim Section 4 questions mid-section",
        mistakeVi: "Cố đọc câu hỏi Section 4 giữa chừng",
        why: "There is no break — you lose 2-3 answers while reading.",
        whyVi: "Không có khoảng nghỉ — đọc giữa chừng làm bạn lỡ 2-3 câu.",
      },
    ],
    goldenSecret:
      "Section 4 is decided in the first 30 SECONDS — that's the only window to read all 10 questions. Treat that 30s like the exam itself.",
    goldenSecretVi:
      "Section 4 được quyết định trong 30 GIÂY đầu — cửa sổ duy nhất để đọc 10 câu hỏi. Hãy coi 30 giây đó như chính bài thi.",
    vocabHighlights: [
      { word: "transactional", definition: "everyday exchange (booking, enquiry)", definitionVi: "giao dịch hằng ngày", example: "Section 1 is transactional English.", band: "7.0" },
      { word: "attribute (to a speaker)", definition: "assign an opinion to a person", definitionVi: "gán ý kiến cho ai", example: "Attribute each opinion to the right speaker.", band: "7.5" },
      { word: "pivot", definition: "change of direction in opinion", definitionVi: "bước ngoặt, đổi hướng", example: "The tutor's pivot reveals the answer.", band: "8.0" },
      { word: "monologue", definition: "speech by one person", definitionVi: "độc thoại", example: "Section 2 is a monologue.", band: "7.0" },
      { word: "signpost language", definition: "phrases that organise speech", definitionVi: "ngôn ngữ chỉ dấu", example: "Lecturers love signpost language.", band: "7.5" },
    ],
    quiz: [
      {
        question: "Section 1 is mostly about:",
        options: ["Academic lecture", "Everyday transactional dialogue", "Group discussion", "Map labelling"],
        answer: 1,
        explanation: "Section 1 = transactional (form-filling).",
      },
      {
        question: "Map questions in Section 2 follow:",
        options: ["Random order", "Physical / spatial order", "Alphabetical order", "Chronological order"],
        answer: 1,
        explanation: "Map answers track the tour route.",
      },
      {
        question: "In Section 3, the correct answer is often:",
        options: ["The first speaker's opinion", "The opinion that changes LAST", "The longest speech", "The shortest reply"],
        answer: 1,
        explanation: "Look for the final pivot in the discussion.",
      },
      {
        question: "Section 4 is unique because:",
        options: ["It has two speakers", "There is NO mid-section pause", "It is fully musical", "It is the easiest"],
        answer: 1,
        explanation: "No pause — read all 10 questions in the opening 30 seconds.",
      },
      {
        question: "Which is MOST risky in Section 1?",
        options: ["Topic understanding", "Spelling errors", "Speaker accent", "Length of audio"],
        answer: 1,
        explanation: "Easy content but spelling traps cost the most marks.",
      },
      {
        question: "'Opposite' on a map means:",
        options: ["Next to", "Behind", "Exactly across from", "Far away"],
        answer: 2,
        explanation: "'Opposite' = directly across.",
      },
    ],
    cheatSheetPoints: [
      "S1: form-filling — beware spelling & double letters",
      "S2: monologue / map — directional verbs, mark north",
      "S3: discussion — track who pivots LAST",
      "S4: lecture — read all 10 questions in opening 30s",
    ],
  },

  // ===================== 4. SPELLING & NUMBERS =====================
  {
    id: "listening-spelling-numbers",
    title: "Listening — Spelling, Numbers & British/American Traps",
    titleVi: "Listening — Bẫy Chính tả, Số đếm & Anh/Mỹ",
    pillar: "applied-grammar",
    skill: "listening",
    icon: "🔢",
    duration: "15 min",
    level: "foundation",
    description:
      "30-40% of Section 1 marks come from spelling and numbers. A single wrong letter or digit = whole answer lost. Drill the patterns examiners reuse.",
    descriptionVi:
      "30-40% điểm Section 1 đến từ chính tả và số. Sai 1 chữ / 1 chữ số = mất cả câu. Luyện các pattern lặp lại.",
    strategySteps: [
      {
        step: 1,
        title: "Spell-trap consonants: B/P, D/T, M/N, S/F",
        titleVi: "Cặp phụ âm dễ nhầm: B/P, D/T, M/N, S/F",
        description:
          "Train your ear with minimal pairs: bat/pat, dog/tog, sum/fun, sea/fee. Examiners exploit these in proper nouns.",
        descriptionVi:
          "Luyện cặp tối thiểu: bat/pat, dog/tog, sum/fun, sea/fee. Người ra đề hay dùng trong tên riêng.",
      },
      {
        step: 2,
        title: "Numbers: zero/oh, double, hundred vs thousand",
        titleVi: "Số: zero/oh, double, hundred vs thousand",
        description:
          "British speakers say 'oh' for 0 in phone numbers, 'double four' for 44, 'three-and-a-half thousand' = 3,500. Write digits, never words.",
        descriptionVi:
          "Người Anh đọc 0 là 'oh' trong số điện thoại, 44 là 'double four', 3,500 là 'three-and-a-half thousand'. Luôn viết bằng chữ số.",
      },
      {
        step: 3,
        title: "British vs American spellings",
        titleVi: "Chính tả Anh vs Mỹ",
        description:
          "Both accepted, but be consistent: colour/color, organise/organize, centre/center, programme/program. NEVER mix in one word.",
        descriptionVi:
          "Cả 2 đều được chấp nhận, nhưng phải nhất quán: colour/color, organise/organize, centre/center, programme/program. KHÔNG trộn trong cùng 1 từ.",
      },
      {
        step: 4,
        title: "Dates & currency formats",
        titleVi: "Định dạng ngày và tiền tệ",
        description:
          "Dates: 23rd April or April 23 (both fine). Money: write the symbol — £50, $200, €15. Forgetting symbol = wrong answer.",
        descriptionVi:
          "Ngày: 23rd April hoặc April 23 (đều được). Tiền: viết ký hiệu — £50, $200, €15. Quên ký hiệu = sai đáp án.",
      },
    ],
    practicalExamples: [
      {
        context: "Audio: 'My name is Phillip — P-H-I-double-L-I-P.'",
        contextVi: "Tên là Phillip — P-H-I-double-L-I-P.",
        example: "Answer: Phillip (two Ls). 'Double L' = LL, not 'double L letter'.",
        explanation: "Double letter trap — listen for the word 'double' before the letter.",
      },
      {
        context: "Audio: 'It's about three and a half thousand pounds.'",
        contextVi: "Khoảng 3,500 bảng.",
        example: "Answer: £3,500 — number + currency symbol.",
        explanation: "Forgetting £ scores 0.",
      },
      {
        context: "Audio: 'The office is at oh seven nine, double two, eight one five.'",
        contextVi: "Văn phòng có số 079 22 815.",
        example: "Answer: 07922815. Write the digit 0 (not the letter O).",
        explanation: "'Oh' = 0; 'double two' = 22.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Writing 'O' instead of '0' in phone numbers",
        mistakeVi: "Viết chữ O thay vì số 0 trong số điện thoại",
        why: "Examiner marks the answer wrong — phone numbers must be digits.",
        whyVi: "Người chấm coi là sai — số điện thoại phải bằng chữ số.",
      },
      {
        mistake: "Mixing British and American in one word (e.g. 'colorise')",
        mistakeVi: "Trộn Anh-Mỹ trong 1 từ (vd: 'colorise')",
        why: "Inconsistent spelling = wrong.",
        whyVi: "Chính tả không nhất quán = sai.",
      },
      {
        mistake: "Omitting currency or percentage symbols",
        mistakeVi: "Bỏ ký hiệu tiền tệ hoặc %",
        why: "Question reads '$___' — your answer must include the unit it asks for.",
        whyVi: "Câu hỏi ghi '$___' — đáp án phải có đơn vị tương ứng.",
      },
    ],
    goldenSecret:
      "After the audio finishes, spend the first 30 seconds of the transfer window ONLY on Section 1 spelling & numbers. That's where you recover lost marks.",
    goldenSecretVi:
      "Khi audio kết thúc, dành 30 giây đầu của khoảng chuyển đáp án CHỈ để kiểm tra Section 1 chính tả & số. Đó là nơi gỡ điểm.",
    vocabHighlights: [
      { word: "minimal pair", definition: "two words differing by one sound", definitionVi: "cặp từ tối thiểu", example: "Bat/pat is a minimal pair.", band: "7.0" },
      { word: "double letter", definition: "two identical letters in a row", definitionVi: "chữ đôi", example: "Listen for 'double' before the letter.", band: "6.5" },
      { word: "currency symbol", definition: "£, $, € etc.", definitionVi: "ký hiệu tiền tệ", example: "Always include the currency symbol.", band: "6.5" },
      { word: "consistent", definition: "uniform throughout", definitionVi: "nhất quán", example: "Be consistent with British spelling.", band: "7.0" },
    ],
    quiz: [
      {
        question: "'Double four' means:",
        options: ["4", "44", "8", "16"],
        answer: 1,
        explanation: "'Double X' = XX.",
      },
      {
        question: "British speakers often pronounce 0 in phone numbers as:",
        options: ["zero", "oh", "null", "void"],
        answer: 1,
        explanation: "'Oh' is the standard spoken form in UK phone numbers.",
      },
      {
        question: "Which is NOT a Brit/Am spelling pair?",
        options: ["colour/color", "organise/organize", "centre/center", "happy/happiness"],
        answer: 3,
        explanation: "happy/happiness is morphology, not Brit/Am.",
      },
      {
        question: "Forgetting £ in answer '£50' scores:",
        options: ["Full mark", "Half mark", "Zero", "Bonus"],
        answer: 2,
        explanation: "Missing required unit = wrong.",
      },
      {
        question: "Writing 'colorise' instead of 'colorize' or 'colourise' is…",
        options: ["Correct", "An inconsistent Brit/Am mix = wrong", "Half right", "Stylish"],
        answer: 1,
        explanation: "Mixing standards within one word is wrong.",
      },
      {
        question: "Best moment to verify spelling?",
        options: ["During Section 4", "First 30 seconds of transfer window", "Before exam starts", "After leaving the room"],
        answer: 1,
        explanation: "Use the transfer time to audit Section 1 carefully.",
      },
    ],
    cheatSheetPoints: [
      "Spell-trap pairs: B/P, D/T, M/N, S/F",
      "'Double X' = XX; 'oh' = 0 in phone numbers",
      "Consistent Brit OR Am — never mix in one word",
      "Always include £/$/% if the question shows it",
      "Audit Section 1 first in transfer window",
    ],
  },
];
