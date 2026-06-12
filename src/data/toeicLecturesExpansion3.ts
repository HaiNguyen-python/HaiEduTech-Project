/**
 * @file toeicLecturesExpansion3.ts
 * @description Wave 3 — 9 new TOEIC lectures across all Parts plus business
 * vocab and a speed-hack module. Each lecture follows the standard
 * ToeicLecture shape: ≥3 trapAlerts, ≥4 coreTechnique steps, ≥3 practiceSet,
 * ≥6 vocabHighlights and ≥6 quiz questions, plus an SVG diagram registered
 * in ToeicLectureDiagram.tsx.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ToeicLecture } from "./toeicLecturesData";

// 1. PART 1 — People & State (standing / leaning / facing)
const part1PeopleState: ToeicLecture = {
  id: "toeic-part1-people-state",
  title: "Part 1 — Describing People's State (standing • leaning • facing)",
  titleVi: "Part 1 — Mô tả trạng thái người (đứng • dựa • hướng về)",
  category: "listening",
  parts: ["Part 1"],
  icon: "🧍",
  duration: "16 min",
  level: "foundation",
  targetScore: "450+",
  description:
    "About 30 % of Part 1 photos test STATE verbs (standing, leaning, facing, holding) rather than action verbs. Learners who memorise the 14 most-frequent state verbs gain 3-4 extra points instantly.",
  descriptionVi:
    "Khoảng 30% ảnh Part 1 hỏi động từ TRẠNG THÁI (standing, leaning, facing, holding) chứ không phải hành động. Học thuộc 14 động từ trạng thái phổ biến nhất sẽ kiếm thêm 3-4 điểm ngay.",
  trapAlerts: [
    { trap: "Confusing ‘holding’ vs ‘grabbing’ vs ‘picking up’", trapVi: "Nhầm ‘holding’ vs ‘grabbing’ vs ‘picking up’", why: "ETS uses the wrong action verb even when the object is correct.", whyVi: "ETS dùng SAI động từ hành động dù đồ vật đúng." },
    { trap: "‘Facing each other’ vs ‘standing side by side’", trapVi: "‘Facing each other’ vs ‘standing side by side’", why: "Body orientation traps; you must check WHICH WAY they look.", whyVi: "Bẫy hướng người; phải xem họ NHÌN HƯỚNG NÀO." },
    { trap: "Plurals: ‘both men’ vs ‘one of the men’", trapVi: "Số ít/nhiều: ‘both men’ vs ‘one of the men’", why: "If only ONE person is doing X, ‘both’ is automatically wrong.", whyVi: "Nếu chỉ 1 người làm X, ‘both’ tự động sai." },
  ],
  coreTechnique: [
    { step: 1, title: "Pre-photo scan: count people, note posture", titleVi: "Quét trước: đếm người, ghi tư thế", description: "Before audio plays, mentally label: ‘2 men, 1 standing, 1 sitting, both facing camera’.", descriptionVi: "Trước audio, gán nhãn trong đầu: ‘2 người, 1 đứng, 1 ngồi, cả hai hướng camera’." },
    { step: 2, title: "Lock the SUBJECT first", titleVi: "Khóa CHỦ NGỮ trước", description: "If option starts ‘The women…’ but you see 1 woman + 1 man, eliminate instantly.", descriptionVi: "Nếu option mở ‘The women…’ nhưng bạn thấy 1 nữ + 1 nam, loại ngay." },
    { step: 3, title: "Check the VERB-TENSE = present continuous", titleVi: "Kiểm tra THÌ = present continuous", description: "All Part 1 answers use is/are + V-ing. Anything else is a trap (e.g. ‘has been repaired’).", descriptionVi: "Mọi đáp án Part 1 dùng is/are + V-ing. Khác thì là bẫy (vd ‘has been repaired’)." },
    { step: 4, title: "Confirm with the OBJECT", titleVi: "Xác nhận bằng TÂN NGỮ", description: "Object must be VISIBLE in the photo. If you can't see it, the option is wrong.", descriptionVi: "Tân ngữ phải có TRONG ảnh. Không thấy = sai." },
  ],
  practiceSet: [
    { context: "Photo: a man leans on a railing overlooking a city", contextVi: "Ảnh: người đàn ông dựa lan can nhìn thành phố", question: "What is the man doing?", options: ["He is leaning on the railing.", "He is climbing the railing.", "He is repairing the railing.", "He is painting the railing."], answer: 0, explanation: "Only ‘leaning’ matches the visible posture.", explanationVi: "Chỉ ‘leaning’ khớp tư thế thấy được." },
    { context: "Photo: two colleagues face a laptop together", contextVi: "Ảnh: hai đồng nghiệp cùng nhìn laptop", question: "Which sentence describes the photo?", options: ["They are facing each other.", "They are looking at the screen.", "They are standing back-to-back.", "They are leaving the room."], answer: 1, explanation: "Both pairs of eyes are on the screen — ‘facing each other’ is the trap.", explanationVi: "Cả hai mắt nhìn màn hình — ‘facing each other’ là bẫy." },
    { context: "Photo: one woman seated at a desk while another stands behind", contextVi: "Ảnh: 1 nữ ngồi bàn, 1 nữ đứng sau", question: "Which option is correct?", options: ["Both women are sitting down.", "One woman is standing behind the other.", "They are walking together.", "They are leaving the office."], answer: 1, explanation: "‘Both sitting’ contradicts the standing woman.", explanationVi: "‘Both sitting’ mâu thuẫn với người đang đứng." },
  ],
  businessContext: "Office photos with people working at desks dominate Part 1; mastering state verbs reflects real workplace observation tasks.",
  businessContextVi: "Ảnh văn phòng người làm việc tại bàn chiếm đa số Part 1; thạo động từ trạng thái mô tả đúng quan sát công sở thực tế.",
  proSpeedTip: "Glance at the photo 0.5 sec → silently caption it in your own English BEFORE audio plays.",
  proSpeedTipVi: "Liếc ảnh 0.5 giây → tự đặt caption bằng tiếng Anh TRƯỚC khi audio chạy.",
  vocabHighlights: [
    { word: "to lean (on/against)", definition: "To rest one's weight on something.", definitionVi: "Dựa, tựa vào.", example: "She is leaning against the wall.", businessContext: "Common posture verb in office photos." },
    { word: "to face", definition: "To be turned towards.", definitionVi: "Hướng về.", example: "The clients are facing the screen.", businessContext: "Meeting-room body orientation." },
    { word: "to glance at", definition: "To look quickly.", definitionVi: "Liếc nhìn.", example: "He is glancing at his phone.", businessContext: "Used for ‘checking time’ photos." },
    { word: "to hold", definition: "To carry in the hands.", definitionVi: "Cầm, giữ.", example: "She is holding a folder.", businessContext: "Document-handling photos." },
    { word: "to stack", definition: "To arrange in a pile.", definitionVi: "Xếp chồng.", example: "Boxes are stacked in the warehouse.", businessContext: "Warehouse photos." },
    { word: "to be seated", definition: "Formal version of ‘to sit’.", definitionVi: "Đang ngồi (trang trọng).", example: "Guests are seated around the table.", businessContext: "Boardroom photos." },
  ],
  quiz: [
    { question: "Around what % of Part 1 photos test STATE verbs (not action)?", options: ["10 %", "30 %", "70 %", "0 %"], answer: 1, explanation: "Roughly 30 % — that's why mastering state verbs is high-leverage." },
    { question: "All correct Part 1 sentences use which structure?", options: ["Present perfect passive", "Present continuous (is/are + V-ing)", "Past simple", "Future"], answer: 1, explanation: "Part 1 always describes what's happening NOW." },
    { question: "‘Both women are sitting’ is wrong because:", options: ["Wrong tense", "Only ONE woman is sitting", "‘Both’ is informal", "Spelling"], answer: 1, explanation: "‘Both’ requires every person to do X — if one is standing, eliminate." },
    { question: "Best pre-audio routine is to:", options: ["Read all 4 options aloud", "Silently caption the photo in English", "Close your eyes", "Translate to Vietnamese"], answer: 1, explanation: "Self-captioning primes your ears for the correct vocabulary." },
    { question: "Which verb belongs to the STATE family?", options: ["leaning", "running", "throwing", "kicking"], answer: 0, explanation: "Leaning = static posture; the others are dynamic actions." },
    { question: "An option mentions an object NOT visible in the photo. You should:", options: ["Choose it anyway", "Eliminate it", "Re-listen", "Choose 'C' by default"], answer: 1, explanation: "If the object isn't visible, the option is wrong." },
  ],
  cheatSheetPoints: [
    "Pre-scan: count people, note posture & orientation",
    "All correct answers use ‘is/are + V-ing’",
    "‘Both / all’ require EVERY person doing the same action",
    "Object must be VISIBLE in the photo",
    "Self-caption the photo silently BEFORE audio plays",
  ],
  isNew: true,
};

// 2. PART 2 — Question-Type Map
const part2QuestionMap: ToeicLecture = {
  id: "toeic-part2-question-types-map",
  title: "Part 2 — The Question-Type Decision Map",
  titleVi: "Part 2 — Bản đồ phân loại câu hỏi",
  category: "listening",
  parts: ["Part 2"],
  icon: "🗺️",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "Part 2's 25 questions hide only 6 question patterns. Recognise the pattern in the first 2 words and you eliminate two distractors before they speak.",
  descriptionVi:
    "25 câu Part 2 chỉ ẩn trong 6 dạng câu hỏi. Nhận diện dạng trong 2 chữ đầu, bạn loại sẵn 2 đáp án nhiễu trước khi chúng được đọc.",
  trapAlerts: [
    { trap: "‘Yes/No’ answers to WH-questions", trapVi: "Trả lời ‘Yes/No’ cho WH-question", why: "If question starts with Who/Where/When/Why/What/How, eliminate any ‘Yes/No’ option.", whyVi: "Nếu câu hỏi bắt đầu Who/Where/When/Why/What/How, loại ngay đáp án ‘Yes/No’." },
    { trap: "Echo trap (repeated word/sound)", trapVi: "Bẫy lặp âm (echo)", why: "Distractors repeat a word from the question to lure you.", whyVi: "Đáp án nhiễu lặp từ trong câu hỏi để dụ bạn." },
    { trap: "Indirect answers (‘I'm not sure’, ‘Ask Tom’)", trapVi: "Đáp án gián tiếp (‘I'm not sure’, ‘Ask Tom’)", why: "These vague replies are correct 18 % of the time — don't dismiss them.", whyVi: "Đáp án mơ hồ kiểu này đúng tới 18% — đừng loại bỏ." },
  ],
  coreTechnique: [
    { step: 1, title: "Catch the first WORD", titleVi: "Bắt CHỮ ĐẦU", description: "WH / Yes-No / Tag / Choice / Statement / Negative — six categories.", descriptionVi: "WH / Yes-No / Tag / Choice / Statement / Negative — 6 loại." },
    { step: 2, title: "Apply the YES/NO filter", titleVi: "Áp bộ lọc YES/NO", description: "WH ⇒ never Yes/No. Yes-No ⇒ usually Yes/No (but indirect OK).", descriptionVi: "WH ⇒ không bao giờ Yes/No. Yes-No ⇒ thường Yes/No (gián tiếp cũng OK)." },
    { step: 3, title: "Listen for ECHO and reject", titleVi: "Bắt ECHO và loại", description: "Same word in question + answer = trap 80 % of the time.", descriptionVi: "Cùng từ trong câu hỏi + đáp án = bẫy 80%." },
    { step: 4, title: "Don't fear INDIRECT answers", titleVi: "Đừng sợ đáp án GIÁN TIẾP", description: "‘I'll check with HR’ is a complete and correct reply to ‘When does the meeting start?’", descriptionVi: "‘I'll check with HR’ là đáp án đúng hoàn chỉnh cho ‘When does the meeting start?’" },
  ],
  practiceSet: [
    { context: "WH-question", contextVi: "Câu hỏi WH", question: "Where is the printer?", options: ["Yes, it is.", "Next to the copier.", "Print 20 copies."], answer: 1, explanation: "WH ⇒ never Yes/No; (C) is an echo trap (‘print’).", explanationVi: "WH ⇒ không Yes/No; (C) là bẫy lặp từ ‘print’." },
    { context: "Tag question", contextVi: "Câu hỏi đuôi", question: "You ordered the supplies, didn't you?", options: ["No, Jane did.", "The supply room.", "Yesterday."], answer: 0, explanation: "Tag-Q expects confirmation/correction; ‘No, Jane did’ corrects.", explanationVi: "Tag-Q chờ xác nhận/sửa; ‘No, Jane did’ là sửa lại." },
    { context: "Indirect answer", contextVi: "Đáp án gián tiếp", question: "When will the report be ready?", options: ["By the elevator.", "Ask Sarah, she's writing it.", "Yes, it's ready."], answer: 1, explanation: "Indirect but valid; (C) violates the WH ⇒ never Yes filter.", explanationVi: "Gián tiếp nhưng hợp lệ; (C) phạm bộ lọc WH ⇒ không Yes." },
  ],
  businessContext: "Part 2 mirrors workplace small-talk: scheduling, reporting, requesting supplies. Mastering the pattern map is a direct workplace listening skill.",
  businessContextVi: "Part 2 mô phỏng nói chuyện công sở: lịch họp, báo cáo, xin đồ. Thạo bản đồ dạng câu là kỹ năng nghe văn phòng thực thụ.",
  proSpeedTip: "The MOMENT you hear ‘Where / When / Who / Why’, mentally cross out any A/B/C starting with ‘Yes’ or ‘No’.",
  proSpeedTipVi: "Vừa nghe ‘Where / When / Who / Why’, gạch ngay đáp án A/B/C nào bắt đầu ‘Yes/No’.",
  vocabHighlights: [
    { word: "purchase order", definition: "An official document requesting goods.", definitionVi: "Đơn đặt hàng.", example: "I'll submit the purchase order tomorrow.", businessContext: "Procurement vocabulary." },
    { word: "to follow up", definition: "To check progress later.", definitionVi: "Theo dõi sau.", example: "I'll follow up with the supplier.", businessContext: "Common Part 2 verb." },
    { word: "to confirm", definition: "To make sure something is correct.", definitionVi: "Xác nhận.", example: "Could you confirm the time?", businessContext: "Scheduling vocabulary." },
    { word: "to look into", definition: "To investigate.", definitionVi: "Tìm hiểu.", example: "Let me look into the issue.", businessContext: "Customer-service vocabulary." },
    { word: "in charge of", definition: "Responsible for.", definitionVi: "Phụ trách.", example: "Lin is in charge of the project.", businessContext: "Org-structure language." },
    { word: "to get back to you", definition: "To respond later.", definitionVi: "Phản hồi lại sau.", example: "I'll get back to you by Friday.", businessContext: "Polite delay reply." },
  ],
  quiz: [
    { question: "How many basic question patterns appear in Part 2?", options: ["3", "6", "10", "25"], answer: 1, explanation: "WH / Yes-No / Tag / Choice / Statement / Negative." },
    { question: "Question: ‘Why are you late?’ Which option is automatically wrong?", options: ["‘Traffic was terrible.’", "‘I missed the bus.’", "‘Yes, I am.’"], answer: 2, explanation: "WH ⇒ never Yes/No." },
    { question: "‘I'll check with HR’ as a reply to a WH-question is:", options: ["Always wrong", "Often correct (indirect answer)", "Grammatically illegal", "Only for Part 3"], answer: 1, explanation: "Indirect answers are valid ~18 % of the time." },
    { question: "Question: ‘Have you printed the agenda?’ Option: ‘The printer is jammed.’ — verdict:", options: ["Echo trap", "Indirect but correct (explains why not)", "Yes/No mismatch", "Off-topic"], answer: 1, explanation: "Indirectly says ‘No, because…’ — valid reply." },
    { question: "Echo distractors usually appear in what % of Part 2 questions?", options: ["10 %", "Roughly 80 % of trap options", "Never", "1 %"], answer: 1, explanation: "Echo is the dominant distractor design in Part 2." },
    { question: "Tag question expects:", options: ["Yes/No", "Confirmation or correction", "An apology", "A long story"], answer: 1, explanation: "‘…, didn't you?’ asks for confirmation or correction." },
  ],
  cheatSheetPoints: [
    "Six question types: WH / Yes-No / Tag / Choice / Statement / Negative",
    "WH ⇒ NEVER Yes/No answer",
    "Same word echoed = 80 % chance it's a trap",
    "Indirect answers (‘Ask Sarah’) are valid ~18 % of the time",
    "Tag questions expect confirmation or correction",
  ],
  isNew: true,
};

// 3. PART 3 — 3-Question Flow
const part3Flow: ToeicLecture = {
  id: "toeic-part3-3-question-flow",
  title: "Part 3 — The 3-Question Flow (Topic → Detail → Future)",
  titleVi: "Part 3 — Dòng chảy 3 câu (Chủ đề → Chi tiết → Tương lai)",
  category: "listening",
  parts: ["Part 3"],
  icon: "💬",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "Every Part 3 dialogue answers exactly 3 questions in a predictable order: Topic (gist) → Detail (fact) → Future (next step). Pre-reading the question stems makes the audio feel scripted.",
  descriptionVi:
    "Mọi đoạn hội thoại Part 3 trả lời đúng 3 câu theo thứ tự cố định: Chủ đề (ý chính) → Chi tiết (sự thật) → Tương lai (bước tiếp). Đọc trước câu hỏi khiến audio như được viết sẵn cho bạn.",
  trapAlerts: [
    { trap: "Synonym-paraphrase answers (the right one!)", trapVi: "Đáp án paraphrase (chính là đáp án đúng)", why: "Correct answers RARELY repeat the speaker's word; they paraphrase.", whyVi: "Đáp án đúng HIẾM khi lặp từ người nói; thường paraphrase." },
    { trap: "Distractors using ‘decoy’ numbers", trapVi: "Đáp án nhiễu dùng số ‘mồi’", why: "Speaker says ‘$15 each’ — distractor says ‘$50’.", whyVi: "Người nói ‘$15 each’ — đáp án nhiễu ‘$50’." },
    { trap: "Future-tense for Past-tense questions", trapVi: "Tương lai trộn quá khứ", why: "Q3 (future) options often include past facts to confuse you.", whyVi: "Câu Q3 (tương lai) thường chèn quá khứ để gây nhầm." },
  ],
  coreTechnique: [
    { step: 1, title: "Pre-read all 3 stems in 8 seconds", titleVi: "Đọc trước 3 câu hỏi trong 8 giây", description: "Stem keywords decide which words you need from the audio.", descriptionVi: "Keyword trong stem cho biết từ nào cần bắt." },
    { step: 2, title: "Map stems to speakers", titleVi: "Gán stem cho speaker", description: "Q1 usually = first speaker line; Q3 = last 2 lines.", descriptionVi: "Q1 thường = câu speaker đầu; Q3 = 2 câu cuối." },
    { step: 3, title: "Listen for PARAPHRASE, not exact words", titleVi: "Nghe PARAPHRASE chứ không phải lặp", description: "If you hear ‘can't make it on Friday’, the answer says ‘not available’.", descriptionVi: "Nghe ‘can't make it on Friday’ → đáp án sẽ là ‘not available’." },
    { step: 4, title: "Lock answers BEFORE the narrator reads", titleVi: "Chốt đáp án TRƯỚC khi narrator đọc", description: "Use the narrator reading time to pre-read the NEXT set.", descriptionVi: "Tận dụng lúc narrator đọc để đọc trước bộ câu hỏi tiếp." },
  ],
  practiceSet: [
    { context: "Office chat about a delayed project", contextVi: "Đoạn chat về dự án trễ", question: "What is the main topic of the conversation?", options: ["A budget cut", "A delayed delivery", "A new hire", "A holiday party"], answer: 1, explanation: "Topic question = first 2 lines; speaker opens with ‘the shipment is late.’", explanationVi: "Câu chủ đề = 2 câu đầu; speaker mở ‘shipment is late.’" },
    { context: "Same conversation, detail", contextVi: "Cùng đoạn, chi tiết", question: "What is the new delivery date?", options: ["Monday", "Wednesday", "Friday", "Next Tuesday"], answer: 2, explanation: "Speaker B: ‘They've pushed it to Friday.’", explanationVi: "Speaker B: ‘They've pushed it to Friday.’" },
    { context: "Same conversation, future", contextVi: "Cùng đoạn, tương lai", question: "What will the man do next?", options: ["Call the supplier", "Email the manager", "Cancel the order", "Visit the warehouse"], answer: 1, explanation: "Man: ‘I'll email Sarah right away.’ — future action.", explanationVi: "Man: ‘I'll email Sarah right away.’ — hành động tương lai." },
  ],
  businessContext: "Part 3 conversations mirror typical inter-department chats: deliveries, scheduling, hiring. Mastery is directly usable at work.",
  businessContextVi: "Hội thoại Part 3 mô phỏng trao đổi liên phòng ban: giao hàng, lịch họp, tuyển dụng. Học xong dùng được tại công sở.",
  proSpeedTip: "Pre-read = points. Every 8 seconds spent pre-reading buys you 3 confident answers.",
  proSpeedTipVi: "Đọc trước = điểm. 8 giây đọc trước đổi được 3 đáp án chắc.",
  vocabHighlights: [
    { word: "to push back", definition: "To delay to a later date.", definitionVi: "Dời lại.", example: "We pushed back the launch to Q3.", businessContext: "Scheduling vocabulary." },
    { word: "to follow through", definition: "To complete what was promised.", definitionVi: "Hoàn tất lời hứa.", example: "Make sure you follow through on the order.", businessContext: "Project-management vocabulary." },
    { word: "agenda", definition: "List of meeting items.", definitionVi: "Chương trình họp.", example: "Email the agenda by 5 pm.", businessContext: "Meeting vocabulary." },
    { word: "client", definition: "A paying customer.", definitionVi: "Khách hàng.", example: "The client signed the contract.", businessContext: "Sales vocabulary." },
    { word: "to reach out", definition: "To contact someone.", definitionVi: "Liên hệ.", example: "I'll reach out to HR.", businessContext: "Office communication." },
    { word: "deadline", definition: "Final due date.", definitionVi: "Hạn chót.", example: "Deadline is Friday.", businessContext: "Workplace urgency." },
  ],
  quiz: [
    { question: "Part 3 questions follow which fixed order?", options: ["Future → Topic → Detail", "Detail → Topic → Future", "Topic → Detail → Future", "Random"], answer: 2, explanation: "Topic (gist) → Detail (fact) → Future (next step)." },
    { question: "Q1 (Topic) is usually answered in:", options: ["The last line", "The first 2 lines", "The middle line", "The narrator's intro"], answer: 1, explanation: "Topic gist appears in the opening lines." },
    { question: "Correct answers tend to be:", options: ["Exact word matches", "Paraphrases of what was said", "Random options", "Always ‘C’"], answer: 1, explanation: "Paraphrase is the dominant correct-answer style." },
    { question: "‘They've pushed it to Friday’ paraphrases best as:", options: ["Cancelled until Friday", "Delivery delayed to Friday", "Friday off", "Friday meeting"], answer: 1, explanation: "‘Push to’ = delay to a later date." },
    { question: "What should you do during the narrator's reading of questions?", options: ["Relax", "Pre-read the NEXT set", "Translate", "Re-listen mentally"], answer: 1, explanation: "Use narrator time to pre-read the next set's stems." },
    { question: "Q3 (future) often hides which trap?", options: ["Echo", "Past-tense decoys", "Spelling", "Tag questions"], answer: 1, explanation: "Past-tense facts are slipped into future-question options to confuse." },
  ],
  cheatSheetPoints: [
    "Fixed order: Topic → Detail → Future",
    "Pre-read 3 stems in 8 seconds",
    "Q1 lives in first 2 lines; Q3 in last 2 lines",
    "Correct answers PARAPHRASE — they don't repeat",
    "Use narrator time to pre-read the next set",
  ],
  isNew: true,
};

// 4. PART 4 — Announcement Decoder
const part4Announcement: ToeicLecture = {
  id: "toeic-part4-announcement-decoder",
  title: "Part 4 — Announcement Decoder (3-Block Structure)",
  titleVi: "Part 4 — Giải mã thông báo (cấu trúc 3 khối)",
  category: "listening",
  parts: ["Part 4"],
  icon: "📢",
  duration: "20 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Almost every Part 4 monologue is built in 3 blocks: GREETING → BODY → CTA. Identify each block and you can predict where each answer lives BEFORE the speaker arrives.",
  descriptionVi:
    "Gần như mọi đoạn độc thoại Part 4 có 3 khối: CHÀO → THÂN → KÊU GỌI HÀNH ĐỘNG. Nhận diện khối nào ⇒ đoán được đáp án nằm ở đâu TRƯỚC khi speaker nói tới.",
  trapAlerts: [
    { trap: "Listener-identity decoys (‘co-workers’ vs ‘shoppers’)", trapVi: "Bẫy danh tính người nghe", why: "Speakers rarely say ‘colleagues’; they hint via context (‘meeting room 2’).", whyVi: "Speaker hiếm nói ‘colleagues’; gợi qua bối cảnh (‘meeting room 2’)." },
    { trap: "Numbers said TWICE with self-correction", trapVi: "Số nói 2 lần kèm sửa", why: "‘Five — sorry, fifteen percent off’. Always take the SECOND number.", whyVi: "‘Five — sorry, fifteen percent off’. Luôn lấy số thứ HAI." },
    { trap: "Hidden CTA = the implied answer", trapVi: "CTA ngầm = đáp án gợi ý", why: "‘Please proceed to Gate 22’ ⇒ listeners are about to BOARD a plane.", whyVi: "‘Please proceed to Gate 22’ ⇒ người nghe sắp LÊN máy bay." },
  ],
  coreTechnique: [
    { step: 1, title: "Block 1 GREETING — answers Q1 (who/what)", titleVi: "Khối 1 CHÀO — trả Q1 (ai/cái gì)", description: "‘Welcome to Sky Airlines’ ⇒ context = airline passengers.", descriptionVi: "‘Welcome to Sky Airlines’ ⇒ bối cảnh = hành khách hàng không." },
    { step: 2, title: "Block 2 BODY — answers Q2 (detail)", titleVi: "Khối 2 THÂN — trả Q2 (chi tiết)", description: "Numbers, names, reasons live here. Pen ready.", descriptionVi: "Số, tên, lý do nằm đây. Sẵn bút." },
    { step: 3, title: "Block 3 CTA — answers Q3 (next step)", titleVi: "Khối 3 CTA — trả Q3 (bước tiếp)", description: "‘Please…’, ‘You should…’, ‘Don't forget…’ trigger Q3.", descriptionVi: "‘Please…’, ‘You should…’, ‘Don't forget…’ kích hoạt Q3." },
    { step: 4, title: "Pre-read 3 stems in 5 seconds", titleVi: "Đọc trước 3 stem trong 5 giây", description: "Same routine as Part 3. The narrator's reading is your pre-read budget.", descriptionVi: "Giống Part 3. Lúc narrator đọc là ngân sách đọc trước của bạn." },
  ],
  practiceSet: [
    { context: "Airport announcement", contextVi: "Thông báo sân bay", question: "Who are the listeners?", options: ["Passengers", "Pilots", "Mechanics", "Cleaners"], answer: 0, explanation: "‘Welcome aboard Flight 207’ = passengers (greeting block).", explanationVi: "‘Welcome aboard Flight 207’ = hành khách (khối chào)." },
    { context: "Same announcement, detail", contextVi: "Cùng thông báo, chi tiết", question: "What time will the plane depart?", options: ["7:15", "7:50", "8:15", "8:50"], answer: 2, explanation: "‘Departure has been moved from 7:50 to 8:15.’ — second number wins.", explanationVi: "‘Departure has been moved from 7:50 to 8:15.’ — số thứ hai thắng." },
    { context: "Same, CTA", contextVi: "Cùng thông báo, CTA", question: "What are listeners asked to do?", options: ["Buy duty-free", "Board at Gate 22", "Show passports", "Stow seat belts"], answer: 1, explanation: "‘Please proceed to Gate 22 for boarding.’", explanationVi: "‘Please proceed to Gate 22 for boarding.’" },
  ],
  businessContext: "Part 4 monologues mirror PA announcements, voicemails and conference openings — daily workplace listening skills.",
  businessContextVi: "Độc thoại Part 4 giống thông báo loa, voicemail, mở hội thảo — kỹ năng nghe văn phòng hàng ngày.",
  proSpeedTip: "Greeting words = listener identity. Always lock Q1 in the first 5 seconds of the monologue.",
  proSpeedTipVi: "Từ chào = danh tính người nghe. Chốt Q1 trong 5 giây đầu monologue.",
  vocabHighlights: [
    { word: "to proceed", definition: "To go forward / continue.", definitionVi: "Tiến hành / đi tiếp.", example: "Please proceed to the boarding gate.", businessContext: "Airport / event announcements." },
    { word: "attendees", definition: "People who attend an event.", definitionVi: "Người tham dự.", example: "Attendees should sign in at reception.", businessContext: "Conference vocabulary." },
    { word: "voicemail", definition: "Recorded message.", definitionVi: "Tin nhắn thoại.", example: "Please leave a voicemail.", businessContext: "Office phone vocabulary." },
    { word: "promotional offer", definition: "Special discount or deal.", definitionVi: "Ưu đãi khuyến mãi.", example: "Today's promotional offer ends at 6 pm.", businessContext: "Retail announcements." },
    { word: "to be advised", definition: "Formal phrase to inform someone.", definitionVi: "Xin lưu ý.", example: "Please be advised that the lobby is closed.", businessContext: "Formal announcement vocabulary." },
    { word: "shortly", definition: "Soon.", definitionVi: "Sắp tới.", example: "Boarding will begin shortly.", businessContext: "Time-related vocabulary." },
  ],
  quiz: [
    { question: "The 3 blocks of a Part 4 monologue are:", options: ["Intro / Joke / Outro", "Greeting / Body / CTA", "Past / Present / Future", "Topic / Vote / Close"], answer: 1, explanation: "Greeting → Body → Call-to-Action." },
    { question: "Q1 (listener identity) is decoded from:", options: ["The CTA", "The Greeting block", "Random", "The numbers"], answer: 1, explanation: "Opening words betray who the listeners are." },
    { question: "‘Departure moved from 7:50 to 8:15.’ Correct answer is:", options: ["7:50", "8:15", "7:15", "8:50"], answer: 1, explanation: "Always take the SECOND number after a self-correction." },
    { question: "Words like ‘Please…’ or ‘Don't forget…’ signal:", options: ["Greeting", "Body", "CTA", "Disclaimer"], answer: 2, explanation: "Imperatives mark the Call-to-Action block." },
    { question: "Why pre-read the question stems?", options: ["For speed reading", "To predict where each answer lives", "To impress the proctor", "It's optional"], answer: 1, explanation: "Pre-reading maps stems to greeting / body / CTA in advance." },
    { question: "‘Welcome aboard Flight 207’ tells you listeners are:", options: ["Mechanics", "Passengers", "Pilots", "Ground staff"], answer: 1, explanation: "Greeting block reveals identity instantly." },
  ],
  cheatSheetPoints: [
    "Every Part 4 monologue = Greeting + Body + CTA",
    "Q1 = greeting; Q2 = body; Q3 = CTA",
    "Second number wins after self-correction",
    "Imperative phrases (Please, Don't forget) signal CTA",
    "Pre-read 3 stems during the narrator's intro",
  ],
  isNew: true,
};

// 5. PART 5 — Preposition Decoder
const part5Prepositions: ToeicLecture = {
  id: "toeic-part5-preposition-decoder",
  title: "Part 5 — Preposition Decoder (in • on • at • by • for)",
  titleVi: "Part 5 — Giải mã giới từ (in • on • at • by • for)",
  category: "grammar",
  parts: ["Part 5"],
  icon: "🔤",
  duration: "16 min",
  level: "foundation",
  targetScore: "600+",
  description:
    "Preposition questions are 6-8 marks per Part 5. Learn the 5-rule decoder and your accuracy on this question type jumps from ~50 % to ~90 %.",
  descriptionVi:
    "Câu giới từ chiếm 6-8 điểm/Part 5. Học bộ giải mã 5 quy tắc dưới đây, độ chính xác dạng này nhảy từ ~50% lên ~90%.",
  trapAlerts: [
    { trap: "Confusing TIME prepositions: in (year/month) / on (day/date) / at (clock)", trapVi: "Nhầm giới từ thời gian", why: "‘in Monday’ is a classic Vietnamese-learner error; must be ‘on Monday’.", whyVi: "‘in Monday’ là lỗi quen — phải ‘on Monday’." },
    { trap: "‘By’ vs ‘until’", trapVi: "‘By’ vs ‘until’", why: "‘by Friday’ = deadline; ‘until Friday’ = continuous up to.", whyVi: "‘by Friday’ = hạn chót; ‘until Friday’ = liên tục đến." },
    { trap: "‘For’ vs ‘during’", trapVi: "‘For’ vs ‘during’", why: "‘for 2 hours’ = duration; ‘during the meeting’ = within an event.", whyVi: "‘for 2 hours’ = khoảng; ‘during the meeting’ = trong sự kiện." },
  ],
  coreTechnique: [
    { step: 1, title: "Identify what FOLLOWS the blank", titleVi: "Xác định CÁI ĐI SAU chỗ trống", description: "Year/month? → in. Day/date? → on. Clock-time? → at.", descriptionVi: "Năm/tháng? → in. Thứ/ngày? → on. Giờ? → at." },
    { step: 2, title: "Check for DEADLINE vs DURATION", titleVi: "Kiểm tra HẠN CHÓT vs THỜI GIAN", description: "‘Submit … 5 pm’ → by. ‘Wait … 5 pm’ → until.", descriptionVi: "‘Submit … 5 pm’ → by. ‘Wait … 5 pm’ → until." },
    { step: 3, title: "FOR + length vs DURING + event", titleVi: "FOR + khoảng vs DURING + sự kiện", description: "‘for two weeks’ vs ‘during the conference’.", descriptionVi: "‘for two weeks’ vs ‘during the conference’." },
    { step: 4, title: "Use elimination if 2 prepositions look possible", titleVi: "Loại trừ nếu 2 giới từ đều hợp", description: "Test each in the sentence aloud (mentally) and feel the rhythm.", descriptionVi: "Thử thay từng cái vào câu (trong đầu) và cảm nhận." },
  ],
  practiceSet: [
    { context: "Time preposition", contextVi: "Giới từ thời gian", question: "The board meeting is scheduled ___ March 14.", options: ["in", "on", "at", "by"], answer: 1, explanation: "Specific date → on.", explanationVi: "Ngày cụ thể → on." },
    { context: "Deadline", contextVi: "Hạn chót", question: "Please return the survey ___ Friday afternoon.", options: ["by", "until", "at", "in"], answer: 0, explanation: "‘By’ = deadline.", explanationVi: "‘By’ = hạn chót." },
    { context: "Duration", contextVi: "Khoảng thời gian", question: "Mr. Lee will be out of office ___ two weeks.", options: ["during", "for", "by", "since"], answer: 1, explanation: "‘For’ + length of time.", explanationVi: "‘For’ + khoảng thời gian." },
  ],
  businessContext: "Prepositions appear constantly in workplace emails, contracts and schedules — they're the connective tissue of business English.",
  businessContextVi: "Giới từ xuất hiện liên tục trong email, hợp đồng, lịch — chất kết dính của tiếng Anh công sở.",
  proSpeedTip: "If the blank is followed by a YEAR or MONTH → ‘in’. By a DATE → ‘on’. By a CLOCK → ‘at’. Decide in 3 seconds.",
  proSpeedTipVi: "Sau chỗ trống là NĂM/THÁNG → ‘in’. Là NGÀY → ‘on’. Là GIỜ → ‘at’. Quyết trong 3 giây.",
  vocabHighlights: [
    { word: "deadline", definition: "Final due date.", definitionVi: "Hạn chót.", example: "Submit by the deadline.", businessContext: "Project vocabulary." },
    { word: "agenda", definition: "Meeting plan.", definitionVi: "Chương trình họp.", example: "Item 3 on the agenda.", businessContext: "Meeting vocabulary." },
    { word: "tentative", definition: "Not yet final.", definitionVi: "Tạm thời.", example: "A tentative schedule.", businessContext: "Planning vocabulary." },
    { word: "renew", definition: "To extend a contract.", definitionVi: "Gia hạn.", example: "Renew the lease by July.", businessContext: "Contracts vocabulary." },
    { word: "in advance", definition: "Beforehand.", definitionVi: "Trước, sớm.", example: "RSVP in advance.", businessContext: "Event vocabulary." },
    { word: "concurrent", definition: "Happening at the same time.", definitionVi: "Cùng lúc.", example: "Concurrent workshops.", businessContext: "Event vocabulary." },
  ],
  quiz: [
    { question: "Choose: ‘The meeting is ___ Monday.’", options: ["in", "on", "at", "by"], answer: 1, explanation: "Days of the week → on." },
    { question: "Choose: ‘She'll be away ___ three weeks.’", options: ["during", "for", "by", "since"], answer: 1, explanation: "‘For’ + length of time." },
    { question: "Choose: ‘Submit the report ___ Friday.’ (deadline)", options: ["until", "by", "on", "in"], answer: 1, explanation: "Deadline = by." },
    { question: "Choose: ‘We can't enter the lab ___ the inspection.’", options: ["for", "during", "by", "at"], answer: 1, explanation: "‘During’ + event noun." },
    { question: "Choose: ‘The store opens ___ 9 AM.’", options: ["in", "on", "at", "by"], answer: 2, explanation: "Clock time → at." },
    { question: "Choose: ‘Construction will continue ___ June 2027.’ (continuous up to)", options: ["by", "until", "for", "during"], answer: 1, explanation: "‘Until’ = continuous up to a point." },
  ],
  cheatSheetPoints: [
    "In + year/month  •  On + day/date  •  At + clock time",
    "By = deadline  •  Until = continuous up to",
    "For + length  •  During + event noun",
    "Eliminate by testing the sentence aloud",
    "Decide in 3 seconds — Part 5 rewards speed",
  ],
  isNew: true,
};

// 6. PART 6 — Cohesion Flow
const part6Cohesion: ToeicLecture = {
  id: "toeic-part6-cohesion-flow",
  title: "Part 6 — Cohesion Flow (Reading BEFORE and AFTER)",
  titleVi: "Part 6 — Mạch Cohesion (đọc TRƯỚC và SAU)",
  category: "reading",
  parts: ["Part 6"],
  icon: "🧵",
  duration: "16 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Half of Part 6 mistakes come from picking a connector that fits ONE sentence but breaks the paragraph's logic flow. The Before/After Rule fixes this in 10 seconds per question.",
  descriptionVi:
    "Một nửa lỗi Part 6 do chọn liên từ khớp 1 câu nhưng phá mạch logic đoạn. Quy tắc Trước/Sau sửa lỗi trong 10 giây/câu.",
  trapAlerts: [
    { trap: "Picking ‘however’ when no contrast exists", trapVi: "Chọn ‘however’ khi không có tương phản", why: "Connector must match the LOGIC between sentences, not the sound of one.", whyVi: "Liên từ phải khớp LOGIC giữa các câu, không phải âm thanh 1 câu." },
    { trap: "Verb tense mismatch with surrounding paragraph", trapVi: "Sai thì so với đoạn xung quanh", why: "Look at tenses TWO sentences before and after to decide.", whyVi: "Xem thì 2 câu trước và sau để quyết." },
    { trap: "Sentence-insertion trap: picking a topic-shift sentence", trapVi: "Bẫy chèn câu lệch chủ đề", why: "The inserted sentence must keep the paragraph's THEME, not introduce a new one.", whyVi: "Câu chèn phải giữ CHỦ ĐỀ đoạn, không mở chủ đề mới." },
  ],
  coreTechnique: [
    { step: 1, title: "Always read the sentence BEFORE + AFTER the blank", titleVi: "Luôn đọc câu TRƯỚC + SAU chỗ trống", description: "Connectors and tenses depend on context, not just the local sentence.", descriptionVi: "Liên từ và thì phụ thuộc ngữ cảnh, không chỉ câu chứa." },
    { step: 2, title: "Map logical RELATIONSHIP", titleVi: "Xác định MỐI QUAN HỆ logic", description: "Add / Contrast / Cause / Result / Example / Sequence — pick the connector to match.", descriptionVi: "Thêm / Tương phản / Nguyên nhân / Kết quả / Ví dụ / Trình tự — chọn liên từ cho khớp." },
    { step: 3, title: "Use the PARAGRAPH tense as the anchor", titleVi: "Dùng THÌ ĐOẠN làm neo", description: "If 4 surrounding verbs are past simple, your answer probably is too.", descriptionVi: "Nếu 4 động từ xung quanh là past simple, đáp án cũng vậy." },
    { step: 4, title: "Sentence-insertion: track the THEME word", titleVi: "Chèn câu: bám TỪ chủ đề", description: "The correct sentence repeats or paraphrases the theme word.", descriptionVi: "Câu đúng lặp hoặc paraphrase từ chủ đề." },
  ],
  practiceSet: [
    { context: "Tense check", contextVi: "Kiểm tra thì", question: "‘Our company opened in 2010. By 2015 we ___ three new branches.’", options: ["open", "had opened", "are opening", "will open"], answer: 1, explanation: "‘By 2015’ + past reference → past perfect.", explanationVi: "‘By 2015’ + mốc quá khứ → past perfect." },
    { context: "Connector logic", contextVi: "Logic liên từ", question: "‘Sales fell in Q1. ___, the company introduced a new product line.’", options: ["Therefore", "However", "For example", "In addition"], answer: 1, explanation: "Contrast between fall and new initiative → However.", explanationVi: "Tương phản giữa sụt giảm và sáng kiến mới → However." },
    { context: "Sentence insertion", contextVi: "Chèn câu", question: "Paragraph about employee wellness. Best sentence to insert?", options: ["Our cafeteria menu changes weekly.", "Wellness programs reduce absenteeism by 12%.", "The CEO grew up in Boston.", "Sales targets remain unchanged."], answer: 1, explanation: "Only (B) keeps the wellness theme.", explanationVi: "Chỉ (B) giữ chủ đề wellness." },
  ],
  businessContext: "Part 6 texts mimic real business memos, notices and emails — cohesion skill carries straight into the workplace.",
  businessContextVi: "Văn bản Part 6 mô phỏng memo, thông báo, email công sở — kỹ năng cohesion áp dụng trực tiếp ở công sở.",
  proSpeedTip: "Don't read the entire passage twice. Read the 1 sentence before + 1 sentence after the blank — that's 80 % of the context you need.",
  proSpeedTipVi: "Đừng đọc cả bài 2 lần. Đọc 1 câu trước + 1 câu sau chỗ trống — đủ 80% ngữ cảnh cần thiết.",
  vocabHighlights: [
    { word: "consequently", definition: "As a result.", definitionVi: "Kết quả là.", example: "Sales rose; consequently, profits doubled.", businessContext: "Cause-effect signals." },
    { word: "in contrast", definition: "On the other hand.", definitionVi: "Ngược lại.", example: "In contrast, Asian markets cooled.", businessContext: "Comparison signals." },
    { word: "in addition", definition: "Also / besides.", definitionVi: "Thêm vào đó.", example: "In addition, we hired 5 engineers.", businessContext: "Additive signals." },
    { word: "for instance", definition: "For example.", definitionVi: "Ví dụ.", example: "For instance, our Tokyo branch outperformed.", businessContext: "Example signals." },
    { word: "subsequently", definition: "Afterwards.", definitionVi: "Sau đó.", example: "Subsequently, the policy was revised.", businessContext: "Sequence signals." },
    { word: "however", definition: "But / yet.", definitionVi: "Tuy nhiên.", example: "Costs rose; however, demand stayed strong.", businessContext: "Contrast signals." },
  ],
  quiz: [
    { question: "Before answering a Part 6 connector question, you should always:", options: ["Read just the sentence", "Read the sentence BEFORE and AFTER", "Re-read the title", "Guess C"], answer: 1, explanation: "Connectors depend on inter-sentence logic." },
    { question: "‘Sales fell. ___, the firm launched a new product.’ Best connector:", options: ["Therefore", "However", "For example", "Meanwhile"], answer: 1, explanation: "Contrast between fall and new launch → However." },
    { question: "Tense for ‘By 2015 we ___ three new branches.’", options: ["open", "had opened", "are opening", "will open"], answer: 1, explanation: "‘By + past year’ → past perfect." },
    { question: "Sentence insertion correct answers always:", options: ["Introduce a new topic", "Match the paragraph THEME", "Quote the title", "Use idioms"], answer: 1, explanation: "Theme continuity is non-negotiable." },
    { question: "Which signals CAUSE-EFFECT?", options: ["In contrast", "For instance", "Consequently", "Meanwhile"], answer: 2, explanation: "Consequently = result of previous cause." },
    { question: "‘Subsequently’ best signals:", options: ["Time sequence", "Cause", "Example", "Contrast"], answer: 0, explanation: "‘Subsequently’ = afterwards in time." },
  ],
  cheatSheetPoints: [
    "Always read the sentence BEFORE + AFTER the blank",
    "Map logic: Add / Contrast / Cause / Result / Sequence",
    "Match the PARAGRAPH tense, not just the local sentence",
    "Sentence insertion = keep the theme word",
    "Connector cheat: however (contrast) · consequently (cause) · for instance (example)",
  ],
  isNew: true,
};

// 7. PART 7 — Email Thread Hunt
const part7Email: ToeicLecture = {
  id: "toeic-part7-email-thread",
  title: "Part 7 — Email Thread Hunt (sender • request • action)",
  titleVi: "Part 7 — Săn thread email (người gửi • yêu cầu • hành động)",
  category: "reading",
  parts: ["Part 7"],
  icon: "📧",
  duration: "20 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Email-thread passages are nearly guaranteed in Part 7. Master the 3-Slot Hunt — Who sent it? What's requested? What action follows? — and you answer 5 questions in 4 minutes.",
  descriptionVi:
    "Đề thread email gần như chắc chắn có trong Part 7. Thạo 3-Slot Hunt — Ai gửi? Yêu cầu gì? Hành động tiếp theo? — bạn trả 5 câu trong 4 phút.",
  trapAlerts: [
    { trap: "Mistaking the SECOND email's sender for the requester", trapVi: "Nhầm người gửi email THỨ HAI là người yêu cầu", why: "The reply often AGREES; the request came in email #1.", whyVi: "Email trả lời thường ĐỒNG Ý; yêu cầu nằm ở email 1." },
    { trap: "Confusing CC vs To recipients", trapVi: "Nhầm CC và To", why: "Some questions ask ‘who must take action?’ — only the TO recipient.", whyVi: "Có câu hỏi ‘ai phải hành động?’ — chỉ TO chứ không phải CC." },
    { trap: "Time-zone / date confusion in attachments", trapVi: "Nhầm múi giờ / ngày trong file đính kèm", why: "Dates inside an attached schedule may differ from the email's send date.", whyVi: "Ngày trong file đính kèm có thể khác ngày gửi email." },
  ],
  coreTechnique: [
    { step: 1, title: "Read the HEADERS first (From / To / Subject)", titleVi: "Đọc HEADERS trước (From / To / Subject)", description: "80 % of ‘who/what/when’ questions are decoded here.", descriptionVi: "80% câu ‘ai/cái gì/khi nào’ giải mã được ở đây." },
    { step: 2, title: "Highlight the REQUEST verb", titleVi: "Highlight động từ YÊU CẦU", description: "‘Could you…’, ‘Please send…’, ‘Would you mind…’ — circle them.", descriptionVi: "‘Could you…’, ‘Please send…’, ‘Would you mind…’ — khoanh tròn." },
    { step: 3, title: "Scan email 2 for AGREEMENT or COUNTER-OFFER", titleVi: "Quét email 2 tìm ĐỒNG Ý hoặc PHẢN ĐỀ", description: "‘I'll send it by Tuesday’ vs ‘Could we push to next week?’", descriptionVi: "‘I'll send it by Tuesday’ vs ‘Could we push to next week?’" },
    { step: 4, title: "Cross-check dates with any attachment", titleVi: "Đối chiếu ngày với file đính kèm", description: "‘What date will the event happen?’ may need the attachment, not the email body.", descriptionVi: "‘Sự kiện diễn ra ngày nào?’ có thể cần file, không phải thân email." },
  ],
  practiceSet: [
    { context: "Email 1 (From: Lin To: Carlos) — request quote", contextVi: "Email 1 — yêu cầu báo giá", question: "Who is requesting a quote?", options: ["Carlos", "Lin", "The CC recipient", "An attached supplier"], answer: 1, explanation: "Sender of email 1 (Lin) made the request.", explanationVi: "Người gửi email 1 (Lin) yêu cầu." },
    { context: "Email 2 (From: Carlos To: Lin) — agrees, attaches PDF", contextVi: "Email 2 — đồng ý, đính kèm PDF", question: "What will Carlos do next?", options: ["Cancel the order", "Email the price list", "Call the warehouse", "Visit Lin's office"], answer: 1, explanation: "‘I've attached our latest price list.’", explanationVi: "‘I've attached our latest price list.’" },
    { context: "Attached PDF: event date is 14 May", contextVi: "PDF đính kèm: sự kiện 14/5", question: "When will the event take place?", options: ["10 May", "12 May", "14 May", "20 May"], answer: 2, explanation: "Date comes from the ATTACHMENT, not the body.", explanationVi: "Ngày lấy từ FILE ĐÍNH KÈM, không phải thân email." },
  ],
  businessContext: "Email-thread passages mirror everyday workplace communication; mastering them strengthens both your TOEIC and real-job inbox.",
  businessContextVi: "Đề thread email mô phỏng giao tiếp công sở mỗi ngày; thạo nó tăng cả điểm TOEIC lẫn năng lực email công việc.",
  proSpeedTip: "Always answer ‘who sent first?’ in 5 seconds — it sets the direction for every later question.",
  proSpeedTipVi: "Trả ‘ai gửi đầu?’ trong 5 giây — định hướng mọi câu sau.",
  vocabHighlights: [
    { word: "to attach", definition: "To include a file with an email.", definitionVi: "Đính kèm.", example: "Please find the report attached.", businessContext: "Email vocabulary." },
    { word: "RSVP", definition: "Reply, please.", definitionVi: "Vui lòng phản hồi.", example: "RSVP by Friday.", businessContext: "Event invitations." },
    { word: "cc / bcc", definition: "Carbon copy / blind copy recipients.", definitionVi: "Người nhận song song / ẩn.", example: "Add HR in cc.", businessContext: "Email distribution." },
    { word: "reschedule", definition: "Change to a new time.", definitionVi: "Dời lịch.", example: "Can we reschedule for Friday?", businessContext: "Calendar vocabulary." },
    { word: "amend", definition: "To revise.", definitionVi: "Sửa đổi.", example: "Please amend the contract.", businessContext: "Legal/doc vocabulary." },
    { word: "draft", definition: "An early version.", definitionVi: "Bản nháp.", example: "Send a draft by EOD.", businessContext: "Document vocabulary." },
  ],
  quiz: [
    { question: "Read the headers first because:", options: ["They look pretty", "They decode 80 % of who/what/when questions", "It saves paper", "They are decorative"], answer: 1, explanation: "From / To / Subject reveal sender, recipient, and topic instantly." },
    { question: "‘Who is requesting?’ — usually answered in:", options: ["Email 1", "Email 2", "The attachment", "Cc field"], answer: 0, explanation: "Email 1 typically contains the request." },
    { question: "Why does the TO field matter more than CC for action questions?", options: ["Only TO recipients are expected to act", "CC is fake", "TO sorts alphabetically", "It doesn't matter"], answer: 0, explanation: "CC is informational; TO carries the action obligation." },
    { question: "Event date may live in:", options: ["Only the body", "Only the subject line", "The attachment, not the body", "The CC field"], answer: 2, explanation: "Many TOEIC questions hide dates inside attachments." },
    { question: "‘Could we push to next week?’ signals:", options: ["Agreement", "Counter-offer / reschedule request", "Cancellation", "Greeting"], answer: 1, explanation: "Polite request to reschedule." },
    { question: "If the question asks ‘what will the reader do?’, you should locate:", options: ["Greeting", "Sign-off + action verb", "Subject line", "Date"], answer: 1, explanation: "Action verbs near the sign-off reveal next steps." },
  ],
  cheatSheetPoints: [
    "Read From / To / Subject FIRST",
    "Email 1 = request; Email 2 = response",
    "TO recipients = action; CC = info only",
    "Dates may live inside an ATTACHMENT, not the body",
    "Action verbs near the sign-off reveal next steps",
  ],
  isNew: true,
};

// 8. BUSINESS VOCAB — Finance Essentials
const businessFinance: ToeicLecture = {
  id: "toeic-business-finance-vocab",
  title: "Business Vocabulary — Finance Essentials",
  titleVi: "Từ vựng kinh doanh — Tài chính cốt lõi",
  category: "business-vocab",
  parts: ["Part 5", "Part 6", "Part 7"],
  icon: "💰",
  duration: "18 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "TOEIC tests finance vocabulary in ~12 questions per exam. Master these 15 essentials and you unlock easy points across Parts 5-7 and Listening Parts 3-4.",
  descriptionVi:
    "TOEIC kiểm tra từ vựng tài chính ~12 câu/đề. Nắm 15 từ cốt lõi dưới đây mở khóa điểm dễ ở Part 5-7 và Part 3-4 nghe.",
  trapAlerts: [
    { trap: "‘Profit’ vs ‘revenue’ vs ‘income’", trapVi: "‘Profit’ vs ‘revenue’ vs ‘income’", why: "Revenue = total sales; profit = revenue − costs; income may include non-sales.", whyVi: "Revenue = tổng doanh thu; profit = doanh thu − chi phí; income có thể gồm thu nhập khác." },
    { trap: "‘Expense’ vs ‘expenditure’", trapVi: "‘Expense’ vs ‘expenditure’", why: "Synonyms but expenditure is more formal and often plural in scope (capital expenditure).", whyVi: "Đồng nghĩa nhưng expenditure trang trọng và rộng hơn (capital expenditure)." },
    { trap: "‘Audit’ ≠ general check-up", trapVi: "‘Audit’ ≠ kiểm tra chung", why: "Audit specifically means an OFFICIAL financial inspection.", whyVi: "Audit chỉ kiểm toán TÀI CHÍNH chính thức." },
  ],
  coreTechnique: [
    { step: 1, title: "Group by PROFIT-LOSS axis", titleVi: "Nhóm theo trục LỜI-LỖ", description: "Revenue / Profit / Loss / Margin live together.", descriptionVi: "Revenue / Profit / Loss / Margin học cùng nhau." },
    { step: 2, title: "Group by ACCOUNTING axis", titleVi: "Nhóm theo trục KẾ TOÁN", description: "Audit / Statement / Ledger / Reconcile.", descriptionVi: "Audit / Statement / Ledger / Reconcile." },
    { step: 3, title: "Group by INVESTMENT axis", titleVi: "Nhóm theo trục ĐẦU TƯ", description: "Asset / Liability / Equity / Dividend / Yield.", descriptionVi: "Asset / Liability / Equity / Dividend / Yield." },
    { step: 4, title: "Drill collocations, not isolated words", titleVi: "Luyện collocation, không học từ rời", description: "‘Profit margin slipped 2 %’ beats ‘margin’ alone.", descriptionVi: "‘Profit margin slipped 2 %’ thắng học ‘margin’ rời." },
  ],
  practiceSet: [
    { context: "Annual report", contextVi: "Báo cáo thường niên", question: "‘Despite higher revenue, our profit ___ due to rising costs.’", options: ["surged", "slipped", "renewed", "audited"], answer: 1, explanation: "‘Slipped’ = decreased slightly — fits the contrast with ‘higher revenue’.", explanationVi: "‘Slipped’ = giảm nhẹ — khớp tương phản với ‘higher revenue’." },
    { context: "Audit context", contextVi: "Bối cảnh audit", question: "‘The external ___ began reviewing the books on Monday.’", options: ["auditor", "advertiser", "applicant", "architect"], answer: 0, explanation: "Auditor reviews books.", explanationVi: "Auditor kiểm tra sổ sách." },
    { context: "Investment context", contextVi: "Bối cảnh đầu tư", question: "‘The bond's ___ rose to 4.5 % last quarter.’", options: ["audit", "yield", "agenda", "deficit"], answer: 1, explanation: "Yield = return on a bond/investment.", explanationVi: "Yield = lợi suất trái phiếu/đầu tư." },
  ],
  businessContext: "Finance terms underpin investor reports, board minutes and listings — high-value vocabulary for any white-collar career.",
  businessContextVi: "Từ tài chính làm nền cho báo cáo nhà đầu tư, biên bản, niêm yết — từ vựng giá trị cao cho dân văn phòng.",
  proSpeedTip: "Spotting ‘revenue’, ‘margin’ or ‘deficit’ in a passage tells you the answer involves NUMBERS — pre-scan numbers first.",
  proSpeedTipVi: "Thấy ‘revenue’, ‘margin’ hoặc ‘deficit’ ⇒ đáp án liên quan SỐ — quét số trước.",
  vocabHighlights: [
    { word: "revenue", definition: "Total income from sales.", definitionVi: "Doanh thu.", example: "Revenue rose 12 % year-on-year.", businessContext: "P&L statement." },
    { word: "profit margin", definition: "Profit as a percentage of revenue.", definitionVi: "Biên lợi nhuận.", example: "Profit margin narrowed to 8 %.", businessContext: "Investor reports." },
    { word: "deficit", definition: "Shortfall in revenue vs expenses.", definitionVi: "Thâm hụt.", example: "The agency posted a $2 m deficit.", businessContext: "Government & corporate budgets." },
    { word: "to audit", definition: "To officially inspect accounts.", definitionVi: "Kiểm toán.", example: "Big Four firms audit major banks.", businessContext: "Accounting vocabulary." },
    { word: "yield", definition: "Return on investment.", definitionVi: "Lợi suất.", example: "Treasury yields hit a 5-year high.", businessContext: "Bond market." },
    { word: "to reconcile", definition: "To match two sets of records.", definitionVi: "Đối chiếu.", example: "Please reconcile the bank statement.", businessContext: "Accounting vocabulary." },
  ],
  quiz: [
    { question: "Profit = ?", options: ["Revenue + Expenses", "Revenue − Expenses", "Revenue × Margin", "Revenue ÷ Profit"], answer: 1, explanation: "Profit = Revenue − Expenses." },
    { question: "‘Deficit’ means:", options: ["Surplus", "Shortfall", "Investment", "Asset"], answer: 1, explanation: "Deficit = shortfall." },
    { question: "Which word means ‘official financial inspection’?", options: ["Audit", "Agenda", "Asset", "Average"], answer: 0, explanation: "Audit." },
    { question: "‘Yield’ in finance refers to:", options: ["A road sign", "Return on investment", "An employee", "An agenda"], answer: 1, explanation: "Yield = return on a bond / investment." },
    { question: "‘Reconcile’ in accounting means:", options: ["To argue", "To match two records", "To delete records", "To audit"], answer: 1, explanation: "Reconcile = match two sets of records." },
    { question: "‘Profit margin slipped 2 %’ — slipped means:", options: ["Rose", "Decreased slightly", "Vanished", "Doubled"], answer: 1, explanation: "Slipped = decreased slightly." },
  ],
  cheatSheetPoints: [
    "Profit = Revenue − Expenses",
    "Margin = Profit ÷ Revenue (express as %)",
    "Audit = official financial inspection",
    "Yield = return on a bond / investment",
    "Reconcile = match two sets of records",
  ],
  isNew: true,
};

// 9. SPEED — Skim-and-Scan Loop
const speedSkimScan: ToeicLecture = {
  id: "toeic-speed-skim-scan",
  title: "Speed Hack — The Skim-and-Scan Loop for Part 7",
  titleVi: "Mẹo tốc độ — Vòng Skim-and-Scan cho Part 7",
  category: "speed-hacks",
  parts: ["Part 7"],
  icon: "⚡",
  duration: "14 min",
  level: "advanced",
  targetScore: "900+",
  description:
    "Part 7 contains 54 questions across 15 passages — there's no time to read everything. The Skim-and-Scan Loop is a 4-step routine elite candidates use to finish on time with 90 %+ accuracy.",
  descriptionVi:
    "Part 7 có 54 câu trong 15 đoạn — không đủ thời gian đọc hết. Vòng Skim-and-Scan là quy trình 4 bước thí sinh top dùng để hoàn thành đúng giờ với độ chính xác 90%+.",
  trapAlerts: [
    { trap: "Reading every word of every passage", trapVi: "Đọc kỹ từng chữ mọi đoạn", why: "You'll run out of time before reaching the triple passages.", whyVi: "Sẽ hết giờ trước khi tới triple passages." },
    { trap: "Spending >90 seconds on a single-passage question", trapVi: "Dành >90 giây cho 1 câu single-passage", why: "Budget = ~75 sec single, ~90 sec double, ~100 sec triple. Over-budget = next-set damage.", whyVi: "Ngân sách = ~75 giây single, ~90 giây double, ~100 giây triple. Vượt = hỏng bộ tiếp." },
    { trap: "Re-reading instead of skipping & flagging", trapVi: "Đọc lại thay vì bỏ và đánh dấu", why: "Re-reading triples your time. Skip → flag → return only if time remains.", whyVi: "Đọc lại tốn x3 thời gian. Bỏ → đánh dấu → quay lại nếu còn giờ." },
  ],
  coreTechnique: [
    { step: 1, title: "SKIM the passage in 30 seconds", titleVi: "SKIM đoạn trong 30 giây", description: "First sentence of each paragraph + any bold/heading — that's the map.", descriptionVi: "Câu đầu mỗi đoạn + bất kỳ chữ đậm/heading — đó là bản đồ." },
    { step: 2, title: "READ the question stem", titleVi: "ĐỌC câu hỏi (stem)", description: "Identify keywords (name, date, number).", descriptionVi: "Tìm keyword (tên, ngày, số)." },
    { step: 3, title: "SCAN for the keyword", titleVi: "SCAN tìm keyword", description: "Eyes move zigzag; stop only on capital letters, numbers and bold.", descriptionVi: "Mắt chữ Z; chỉ dừng ở chữ hoa, số, in đậm." },
    { step: 4, title: "VERIFY with the surrounding sentence", titleVi: "XÁC NHẬN bằng câu xung quanh", description: "Read 1 sentence above + 1 below before locking the answer.", descriptionVi: "Đọc 1 câu trên + 1 câu dưới trước khi chốt." },
  ],
  practiceSet: [
    { context: "Notice about office closure", contextVi: "Thông báo đóng cửa văn phòng", question: "Where would this notice most likely appear?", options: ["A magazine ad", "A bulletin board in the office", "A textbook", "A receipt"], answer: 1, explanation: "Office notices live on bulletin boards / intranet.", explanationVi: "Thông báo nội bộ trên bảng tin / intranet." },
    { context: "Advertisement for a new gym", contextVi: "Quảng cáo phòng gym mới", question: "What is the main purpose of the ad?", options: ["To recruit staff", "To promote a membership offer", "To complain", "To audit the gym"], answer: 1, explanation: "Ads with discount language → promote offer.", explanationVi: "Quảng cáo có giảm giá → khuyến mãi." },
    { context: "Triple passage: invoice + email + reply", contextVi: "Triple: hóa đơn + email + trả lời", question: "Which document shows the discount amount?", options: ["The reply only", "The invoice only", "The email only", "All three"], answer: 1, explanation: "Numbers always live on the invoice.", explanationVi: "Số liệu luôn nằm trên hóa đơn." },
  ],
  businessContext: "Skim-and-scan is the same skill you use on real-job emails, contracts and dashboards — TOEIC's reading section trains it directly.",
  businessContextVi: "Skim-and-scan là kỹ năng dùng email, hợp đồng, dashboard công việc thực — TOEIC reading luyện trực tiếp.",
  proSpeedTip: "If a question takes >90 seconds, mark ‘C’ and FLAG IT. Time saved = more points later.",
  proSpeedTipVi: "Nếu câu nào >90 giây, chọn ‘C’ và đánh dấu. Thời gian dành cho câu sau.",
  vocabHighlights: [
    { word: "to skim", definition: "To read quickly for gist.", definitionVi: "Đọc lướt lấy ý chính.", example: "Skim the article in 30 seconds.", businessContext: "Reading strategy." },
    { word: "to scan", definition: "To search for specific info.", definitionVi: "Quét tìm thông tin cụ thể.", example: "Scan for the date.", businessContext: "Reading strategy." },
    { word: "bulletin board", definition: "A board for posted notices.", definitionVi: "Bảng tin.", example: "Pin it on the bulletin board.", businessContext: "Office vocabulary." },
    { word: "promotion", definition: "Sales offer or career advancement.", definitionVi: "Khuyến mãi / thăng chức.", example: "A 20 % promotion on laptops.", businessContext: "Marketing vocabulary." },
    { word: "invoice", definition: "A bill for goods or services.", definitionVi: "Hóa đơn.", example: "Pay the invoice within 30 days.", businessContext: "Finance vocabulary." },
    { word: "to flag", definition: "To mark for later review.", definitionVi: "Đánh dấu để xem lại.", example: "Flag the question and move on.", businessContext: "Test-taking vocabulary." },
  ],
  quiz: [
    { question: "Skim in how many seconds per passage?", options: ["10", "30", "60", "120"], answer: 1, explanation: "30 seconds for the first sentence of each paragraph + bold." },
    { question: "Time budget for a single-passage question:", options: ["~30 sec", "~75 sec", "~3 min", "Unlimited"], answer: 1, explanation: "~75 seconds keeps you on pace for the full section." },
    { question: "When scanning, your eyes should:", options: ["Read every word", "Move zigzag, stopping on caps/numbers/bold", "Close briefly", "Read right-to-left"], answer: 1, explanation: "Zigzag scanning is the fastest pattern." },
    { question: "If a question takes >90 sec, you should:", options: ["Keep trying", "Mark C and flag", "Skip the next 2 questions", "Stop the test"], answer: 1, explanation: "Mark and flag — protect time for later questions." },
    { question: "Where do numbers usually live in a triple passage?", options: ["Email", "Invoice", "Reply email", "Footer"], answer: 1, explanation: "Invoices carry the figures." },
    { question: "Before locking the answer, you should:", options: ["Re-read the entire passage", "Verify with 1 sentence above + 1 below", "Skip verification", "Translate"], answer: 1, explanation: "Verify by reading the immediate surroundings only." },
  ],
  cheatSheetPoints: [
    "Skim each passage in 30 sec (1st sentence per ¶ + bold)",
    "Single ≈ 75 sec · Double ≈ 90 sec · Triple ≈ 100 sec",
    "Scan in zigzag, stop on caps / numbers / bold",
    ">90 sec on one Q → mark C + FLAG, move on",
    "Verify with 1 sentence above + 1 below before locking",
  ],
  isNew: true,
};

export const toeicLecturesExpansion3: ToeicLecture[] = [
  part1PeopleState,
  part2QuestionMap,
  part3Flow,
  part4Announcement,
  part5Prepositions,
  part6Cohesion,
  part7Email,
  businessFinance,
  speedSkimScan,
];
