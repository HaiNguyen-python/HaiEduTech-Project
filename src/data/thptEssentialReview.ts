// Essential Grammar & Vocabulary review for the Vietnamese THPT National Exam
// 12 key grammar topics + 8 high-frequency vocabulary themes (with bilingual content).

export interface GrammarTopic {
  id: string;
  icon: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  /** Optional in-depth explanation paragraph displayed above rules. */
  detailVi?: string;
  detailEn?: string;
  /** Optional headline formula(s) (monospaced display). */
  formulas?: string[];
  rules: { vi: string; en: string }[];
  examples: { en: string; vi: string }[];
  trapVi: string; // common pitfall in the exam
  trapEn: string;
  /** Optional Mr Hai's exam-room strategy tip. */
  tipVi?: string;
  tipEn?: string;
}

export const thptGrammarTopics: GrammarTopic[] = [
  {
    id: "tenses",
    icon: "⏱️",
    titleVi: "12 Thì cơ bản",
    titleEn: "12 Basic Tenses",
    summaryVi: "Nắm vững dấu hiệu nhận biết và cấu trúc của 12 thì - chiếm ~6 điểm trong đề.",
    summaryEn: "Master signal words and structures for all 12 tenses — ~6 questions per exam.",
    detailVi: "Đề THPT thường xoáy vào 5 thì lõi: Hiện tại đơn, Hiện tại tiếp diễn, Hiện tại hoàn thành, Quá khứ đơn và Tương lai đơn. Bí quyết là nhận ra DẤU HIỆU NHẬN BIẾT (since/for, ago, by the time, while…) trước, sau đó mới chia động từ. Khi 2 mệnh đề nối nhau, hãy xác định mệnh đề nào xảy ra TRƯỚC để dùng đúng quá khứ hoàn thành (had + V3) hoặc quá khứ đơn.",
    detailEn: "The THPT exam focuses on 5 core tenses: Present Simple, Present Continuous, Present Perfect, Past Simple and Future Simple. The trick is to spot SIGNAL WORDS (since/for, ago, by the time, while…) FIRST, then conjugate. When two clauses are linked, identify which action happened EARLIER to choose between Past Perfect (had + V3) or Past Simple correctly.",
    formulas: [
      "Present Perfect: S + has/have + V3/Ved (+ since/for…)",
      "Past Continuous + Past Simple: While S + was/were + V-ing, S + V2",
      "Past Perfect: By the time S + V2, S + had + V3",
    ],
    rules: [
      { vi: "Hiện tại đơn: always, often, usually, every…", en: "Present Simple: always, often, usually, every…" },
      { vi: "Hiện tại tiếp diễn: now, at the moment, look!, listen!", en: "Present Continuous: now, at the moment, look!, listen!" },
      { vi: "Hiện tại hoàn thành: just, already, yet, since, for, ever, never", en: "Present Perfect: just, already, yet, since, for, ever, never" },
      { vi: "Quá khứ đơn: yesterday, ago, last…, in + năm trong quá khứ", en: "Past Simple: yesterday, ago, last…, in + past year" },
      { vi: "Tương lai đơn: tomorrow, next…, in + tương lai, I think/believe", en: "Future Simple: tomorrow, next…, in + future, I think/believe" },
    ],
    examples: [
      { en: "She has lived here since 2010.", vi: "Cô ấy đã sống ở đây từ năm 2010." },
      { en: "When I arrived, they were having dinner.", vi: "Khi tôi đến, họ đang ăn tối." },
      { en: "By the time we got to the cinema, the film had already started.", vi: "Khi chúng tôi đến rạp, phim đã bắt đầu rồi." },
    ],
    trapVi: "Mệnh đề 'when/while' + quá khứ tiếp diễn, mệnh đề chính dùng quá khứ đơn. Đừng lẫn 'since' (mốc) với 'for' (khoảng thời gian).",
    trapEn: "When/while + past continuous, main clause = past simple. Don't confuse 'since' (point in time) with 'for' (duration).",
    tipVi: "Trong phòng thi: gạch chân dấu hiệu thời gian TRƯỚC khi nhìn đáp án. 80% câu hỏi thì sẽ tự lộ đáp án.",
    tipEn: "Exam tactic: underline the time signal BEFORE looking at the options. 80% of tense questions reveal themselves immediately.",
  },
  {
    id: "conditional",
    icon: "🔀",
    titleVi: "Câu điều kiện (Loại 1, 2, 3 & hỗn hợp)",
    titleEn: "Conditional Sentences (Type 1, 2, 3 & Mixed)",
    summaryVi: "Phân biệt 4 loại câu điều kiện và đảo ngữ - dạng câu phổ biến trong phần Sentence Combination.",
    summaryEn: "Distinguish 4 conditional types and inversion — common in Sentence Combination tasks.",
    detailVi: "Câu điều kiện diễn tả mối quan hệ NẾU - THÌ. Loại 1 nói về điều có thể xảy ra trong tương lai; Loại 2 giả định trái ngược hiện tại; Loại 3 tiếc nuối quá khứ; Hỗn hợp dùng khi điều kiện xảy ra ở quá khứ nhưng kết quả ở hiện tại. Khi câu bắt đầu bằng 'Were', 'Had' hoặc 'Should' thì đó là dạng ĐẢO NGỮ - bỏ 'If' và đảo trợ động từ lên trước chủ ngữ.",
    detailEn: "Conditionals express IF–THEN relations. Type 1 = possible future; Type 2 = unreal present; Type 3 = past regret; Mixed = past condition with present result. When a sentence opens with 'Were', 'Had', or 'Should', it is the INVERTED form — drop 'If' and move the auxiliary in front of the subject.",
    formulas: [
      "Type 1: If + S + V(s/es), S + will/can/may + V",
      "Type 2: If + S + V2/were, S + would/could + V",
      "Type 3: If + S + had + V3, S + would have + V3",
      "Mixed: If + S + had + V3, S + would + V (now)",
      "Inversion: Were S to V…, / Had S V3…, / Should S V…",
    ],
    rules: [
      { vi: "Loại 1: If + S + V(s/es), S + will + V (có thật)", en: "Type 1: If + S + V(s/es), S + will + V (real)" },
      { vi: "Loại 2: If + S + V2/ed, S + would + V (giả định hiện tại)", en: "Type 2: If + S + V2/ed, S + would + V (present unreal)" },
      { vi: "Loại 3: If + S + had + V3, S + would have + V3 (giả định quá khứ)", en: "Type 3: If + S + had + V3, S + would have + V3 (past unreal)" },
      { vi: "Đảo ngữ: Were S to V / Had S V3 (bỏ 'If')", en: "Inversion: Were S to V / Had S V3 (drop 'If')" },
    ],
    examples: [
      { en: "If I had studied harder, I would have passed the exam.", vi: "Nếu tôi học chăm hơn, tôi đã đậu kỳ thi." },
      { en: "Had I known earlier, I would have helped you.", vi: "Nếu biết sớm hơn, tôi đã giúp bạn." },
      { en: "If I had taken that job last year, I would be living in Tokyo now.", vi: "(Hỗn hợp) Nếu năm ngoái tôi nhận việc đó, giờ tôi đã đang sống ở Tokyo." },
    ],
    trapVi: "Trong câu loại 2, 'were' dùng cho mọi ngôi (If I were you…). Hỗn hợp: If + had V3 (quá khứ), would V (hiện tại).",
    trapEn: "In Type 2, use 'were' for all subjects (If I were you…). Mixed: If + had V3 (past), would V (present).",
    tipVi: "Nhìn vế kết quả TRƯỚC: 'would have V3' → loại 3; 'would V' → loại 2; 'will V' → loại 1. Đây là cách phân loại nhanh nhất.",
    tipEn: "Read the RESULT clause first: 'would have V3' → Type 3; 'would V' → Type 2; 'will V' → Type 1. Fastest classification trick.",
  },
  {
    id: "passive",
    icon: "🔄",
    titleVi: "Câu bị động (Passive Voice)",
    titleEn: "Passive Voice",
    summaryVi: "Chuyển từ chủ động sang bị động đúng thì, bao gồm động từ khuyết thiếu và 2 tân ngữ.",
    summaryEn: "Convert active to passive in the correct tense, including modals and double-object verbs.",
    detailVi: "Bị động dùng khi muốn nhấn mạnh ĐỐI TƯỢNG bị tác động hơn là người thực hiện hành động. Quy trình 3 bước: (1) Xác định thì của câu chủ động → (2) chia 'be' theo đúng thì đó → (3) thêm V3/Vp.p và (by + agent) nếu cần. Với động từ khuyết thiếu giữ nguyên modal rồi thêm 'be + V3'. Với verbs có 2 tân ngữ (give/send/offer/show/tell), tân ngữ chỉ NGƯỜI thường được chọn làm chủ ngữ ở câu bị động.",
    detailEn: "Use the passive when the focus is on the OBJECT receiving the action rather than the doer. 3-step process: (1) identify the active tense → (2) conjugate 'be' in that exact tense → (3) add V3/past participle and (by + agent) if needed. With modals, keep the modal then add 'be + V3'. With double-object verbs (give/send/offer/show/tell), the PERSON object usually becomes the new subject.",
    formulas: [
      "Active: S + V + O  →  Passive: O + be + V3 + (by S)",
      "Modal passive: S + modal + be + V3",
      "Perfect passive: S + has/had + been + V3",
      "Reporting passive: It is said that S + V  →  S + is said + to V / to have V3",
    ],
    rules: [
      { vi: "Công thức chung: be + V3/Vp.p", en: "General formula: be + V3/past participle" },
      { vi: "Modal passive: modal + be + V3 (must be done)", en: "Modal passive: modal + be + V3 (must be done)" },
      { vi: "Verbs với 2 tân ngữ (give, send, offer): chuyển tân ngữ chỉ người lên đầu", en: "Verbs with 2 objects (give, send, offer): person object goes first" },
      { vi: "Bị động kép: It is said that… / S + is said + to V", en: "Double passive: It is said that… / S + is said + to V" },
    ],
    examples: [
      { en: "The report must be submitted by Friday.", vi: "Báo cáo phải được nộp trước thứ Sáu." },
      { en: "He is believed to have stolen the painting.", vi: "Người ta tin rằng anh ta đã đánh cắp bức tranh." },
      { en: "She was given a beautiful necklace on her birthday.", vi: "Cô ấy được tặng một chiếc vòng cổ đẹp vào sinh nhật." },
    ],
    trapVi: "Khi chuyển bị động kép sang dạng 'S + is said + to V', V chia tùy theo thì của mệnh đề 'that'.",
    trapEn: "For 'S + is said + to V' form, the infinitive form depends on the original tense in the 'that' clause.",
    tipVi: "Đừng quên 'by + agent' chỉ giữ lại khi tác nhân QUAN TRỌNG. Câu 'The window was broken' tự nhiên hơn 'The window was broken by someone'.",
    tipEn: "Drop 'by + agent' when the doer is unimportant. 'The window was broken' sounds more natural than 'The window was broken by someone'.",
  },
  {
    id: "reported",
    icon: "💬",
    titleVi: "Câu tường thuật (Reported Speech)",
    titleEn: "Reported Speech",
    summaryVi: "Lùi thì, đổi đại từ, đổi trạng từ chỉ thời gian/nơi chốn. Câu hỏi và câu mệnh lệnh.",
    summaryEn: "Backshift tenses, change pronouns and time/place adverbs. Questions and commands.",
    detailVi: "C\u00e2u t\u01b0\u1eddng thu\u1eadt chuy\u1ec3n t\u1eeb l\u1eddi n\u00f3i tr\u1ef1c ti\u1ebfp (direct speech) sang gi\u00e1n ti\u1ebfp (indirect). Quy tr\u00ecnh: (1) \u0111\u1ed5i \u0111\u1ed9ng t\u1eeb t\u01b0\u1eddng thu\u1eadt say/tell/ask\u2026 \u2192 (2) L\u00d9I TH\u00cc trong m\u1ec7nh \u0111\u1ec1 \u0111\u01b0\u1ee3c t\u01b0\u1eddng thu\u1eadt m\u1ed9t b\u1eadc v\u1ec1 qu\u00e1 kh\u1ee9 \u2192 (3) \u0111\u1ed5i \u0111\u1ea1i t\u1eeb theo ng\u01b0\u1eddi t\u01b0\u1eddng thu\u1eadt \u2192 (4) \u0111\u1ed5i tr\u1ea1ng t\u1eeb th\u1eddi gian/n\u01a1i ch\u1ed1n (now \u2192 then, today \u2192 that day, here \u2192 there). C\u00e2u h\u1ecfi Yes/No d\u00f9ng if/whether; c\u00e2u h\u1ecfi Wh- gi\u1eef t\u1eeb \u0111\u1ec3 h\u1ecfi nh\u01b0ng \u0111\u1ed5i sang tr\u1eadt t\u1ef1 c\u00e2u tr\u1ea7n thu\u1eadt.",
    detailEn: "Reported speech turns direct quotes into indirect statements. Process: (1) change the reporting verb (say/tell/ask\u2026) \u2192 (2) BACKSHIFT the reported verb one tense into the past \u2192 (3) shift pronouns from the speaker's perspective \u2192 (4) update time/place adverbs (now \u2192 then, today \u2192 that day, here \u2192 there). Yes/No questions use if/whether; Wh-questions keep the question word but switch to statement word order.",
    formulas: [
      "Statement: S + said (that) + S + V (l\u00f9i th\u00ec)",
      "Yes/No Q: S + asked + (O) + if/whether + S + V (l\u00f9i th\u00ec)",
      "Wh- Q: S + asked + (O) + Wh- + S + V (l\u00f9i th\u00ec)",
      "Command: S + told/asked + O + (not) to V",
    ],
    rules: [
      { vi: "Lùi thì: present → past, past → past perfect, will → would", en: "Backshift: present → past, past → past perfect, will → would" },
      { vi: "Đổi: now → then, today → that day, tomorrow → the next day, here → there", en: "Change: now → then, today → that day, tomorrow → the next day, here → there" },
      { vi: "Câu hỏi Yes/No: asked + if/whether + S + V", en: "Yes/No question: asked + if/whether + S + V" },
      { vi: "Mệnh lệnh: told/asked + O + (not) to V", en: "Commands: told/asked + O + (not) to V" },
    ],
    examples: [
      { en: "She said she had finished her homework.", vi: "Cô ấy nói cô đã làm xong bài tập." },
      { en: "He asked me whether I could help him.", vi: "Anh ấy hỏi tôi liệu tôi có thể giúp anh không." },      { en: "\"I will call you tomorrow,\" he said. \u2192 He said he would call me the next day.", vi: "\"T\u00f4i s\u1ebd g\u1ecdi b\u1ea1n ng\u00e0y mai,\" anh \u1ea5y n\u00f3i. \u2192 Anh \u1ea5y n\u00f3i s\u1ebd g\u1ecdi t\u00f4i v\u00e0o ng\u00e0y h\u00f4m sau." },

    ],
    trapVi: "Không lùi thì với sự thật hiển nhiên hoặc động từ tường thuật ở thì hiện tại.",
    trapEn: "Don't backshift universal truths, or when the reporting verb stays in the present.",
    tipVi: "Khi g\u1eb7p d\u1ea5u nh\u00e1y k\u00e9p, h\u00e3y L\u00d9I TH\u00cc tr\u01b0\u1edbc r\u1ed3i \u0111\u1ed5i \u0111\u1ea1i t\u1eeb \u2013 \u0111\u00e2y l\u00e0 2 l\u1ed7i chi\u1ebfm 90% sai s\u00f3t.",
    tipEn: "When you see quotation marks, BACKSHIFT first then swap pronouns \u2013 these two steps cause 90% of the mistakes.",
  },
  {
    id: "relative-clauses",
    icon: "🔗",
    titleVi: "Mệnh đề quan hệ (Relative Clauses)",
    titleEn: "Relative Clauses",
    summaryVi: "Who/which/that/whose/whom + rút gọn mệnh đề quan hệ (Ving / V3 / to V).",
    summaryEn: "Who/which/that/whose/whom + reduced relative clauses (Ving / V3 / to V).",
    detailVi: "M\u1ec7nh \u0111\u1ec1 quan h\u1ec7 b\u1ed5 ngh\u0129a cho danh t\u1eeb \u0111\u1ee9ng tr\u01b0\u1edbc n\u00f3. C\u00f3 2 lo\u1ea1i: X\u00c1C \u0110\u1ecaNH (defining \u2013 kh\u00f4ng c\u00f3 d\u1ea5u ph\u1ea9y, kh\u00f4ng th\u1ec3 b\u1ecf) v\u00e0 KH\u00d4NG X\u00c1C \u0110\u1ecaNH (non-defining \u2013 c\u00f3 d\u1ea5u ph\u1ea9y, c\u00f3 th\u1ec3 b\u1ecf v\u1eabn \u0111\u1ee7 ngh\u0129a). Sau d\u1ea5u ph\u1ea9y KH\u00d4NG d\u00f9ng 'that'. Sau gi\u1edbi t\u1eeb ch\u1ec9 d\u00f9ng 'whom' (ng\u01b0\u1eddi) ho\u1eb7c 'which' (v\u1eadt). C\u00f3 th\u1ec3 R\u00daT G\u1eccN m\u1ec7nh \u0111\u1ec1 quan h\u1ec7 th\u00e0nh c\u1ee5m Ving (ch\u1ee7 \u0111\u1ed9ng), V3/Ved (b\u1ecb \u0111\u1ed9ng) ho\u1eb7c to V (m\u1ec7nh \u0111\u1ec1 ch\u1ec9 m\u1ee5c \u0111\u00edch/duy nh\u1ea5t).",
    detailEn: "Relative clauses modify the noun in front of them. Two types: DEFINING (no commas, essential) and NON-DEFINING (with commas, removable). NEVER use 'that' after a comma. After prepositions only 'whom' (people) or 'which' (things). Reduce to V-ing (active), V3/Ved (passive), or to V (purpose/superlative).",
    formulas: [
      "Subject: N + who/which/that + V\u2026",
      "Object: N + (whom/which/that) + S + V\u2026",
      "Possessive: N + whose + N + V\u2026",
      "Reduced active: N + V-ing\u2026  /  Reduced passive: N + V3/Ved\u2026",
    ],
    rules: [
      { vi: "who: người (chủ ngữ); whom: người (tân ngữ); which: vật; that: cả 2 (không dùng sau dấu phẩy/giới từ)", en: "who: person (subject); whom: person (object); which: thing; that: both (not after comma/preposition)" },
      { vi: "whose: sở hữu; where = in/at which; when = on which", en: "whose: possessive; where = in/at which; when = on which" },
      { vi: "Rút gọn: chủ động → Ving; bị động → V3/Ved; mệnh đề mục đích/đầu tiên → to V", en: "Reduce: active → Ving; passive → V3/Ved; purpose/first → to V" },
    ],
    examples: [
      { en: "The book (which is) lying on the table is mine.", vi: "Quyển sách đang nằm trên bàn là của tôi." },
      { en: "The man whose car was stolen is my uncle.", vi: "Người đàn ông bị mất xe là chú tôi." },      { en: "The novel (which was) written by Nguyen Du is a masterpiece.", vi: "Cu\u1ed1n ti\u1ec3u thuy\u1ebft \u0111\u01b0\u1ee3c vi\u1ebft b\u1edfi Nguy\u1ec5n Du l\u00e0 m\u1ed9t ki\u1ec7t t\u00e1c." },

    ],
    trapVi: "Sau dấu phẩy không dùng 'that'. Sau giới từ chỉ dùng whom/which (in which, with whom).",
    trapEn: "No 'that' after a comma. After prepositions only whom/which (in which, with whom).",
    tipVi: "Tr\u01b0\u1edbc khi ch\u1ecdn 'who/which/that', h\u00e3y h\u1ecfi: danh t\u1eeb ph\u00eda tr\u01b0\u1edbc l\u00e0 ng\u01b0\u1eddi hay v\u1eadt, v\u00e0 c\u00f3 d\u1ea5u ph\u1ea9y kh\u00f4ng? Hai c\u00e2u h\u1ecfi \u0111\u00f3 gi\u1ea3i quy\u1ebft h\u1ea7u h\u1ebft c\u00e1c c\u00e2u.",
    tipEn: "Before picking 'who/which/that', ask: is the noun a person or a thing, and is there a comma? Those two questions solve most items.",
  },
  {
    id: "modals",
    icon: "🎯",
    titleVi: "Động từ khuyết thiếu (Modal Verbs)",
    titleEn: "Modal Verbs",
    summaryVi: "Diễn đạt khả năng, sự cho phép, lời khuyên, suy đoán - tần suất xuất hiện cao trong cloze test.",
    summaryEn: "Express ability, permission, advice, deduction — high frequency in cloze tests.",
    detailVi: "Modal verbs (can, could, may, might, must, should, ought to, will, would, shall) \u0111\u1ee9ng TR\u01af\u1edaC \u0111\u1ed9ng t\u1eeb nguy\u00ean th\u1ec3 kh\u00f4ng 'to'. Ch\u00fang di\u1ec5n \u0111\u1ea1t th\u00e1i \u0111\u1ed9 c\u1ee7a ng\u01b0\u1eddi n\u00f3i: kh\u1ea3 n\u0103ng, s\u1ef1 cho ph\u00e9p, l\u1eddi khuy\u00ean, ngh\u0129a v\u1ee5 hay suy \u0111o\u00e1n. D\u1ea1ng QU\u00c1 KH\u1ee8 r\u1ea5t quan tr\u1ecdng trong \u0111\u1ec1: 'modal + have + V3' \u0111\u1ec3 n\u00f3i v\u1ec1 \u0111i\u1ec1u \u0111\u00e1ng l\u1ebd/ch\u1eafc ch\u1eafn/c\u00f3 th\u1ec3 \u0111\u00e3 x\u1ea3y ra.",
    detailEn: "Modal verbs (can, could, may, might, must, should, ought to, will, would, shall) come BEFORE a bare infinitive. They express the speaker's attitude: ability, permission, advice, obligation or deduction. The PAST form is heavily tested: 'modal + have + V3' for what should/must/might have happened.",
    formulas: [
      "Present: S + modal + V (bare)",
      "Past deduction: S + must/might/can't + have + V3",
      "Past regret: S + should/shouldn't + have + V3",
      "Past ability (one occasion): S + was/were able to + V",
    ],
    rules: [
      { vi: "must / have to: bắt buộc; mustn't: cấm; don't have to: không cần", en: "must / have to: obligation; mustn't: prohibition; don't have to: no need" },
      { vi: "should / ought to: lời khuyên; had better: cảnh báo", en: "should / ought to: advice; had better: warning" },
      { vi: "could / was able to: khả năng quá khứ (was able to khi thực hiện thành công)", en: "could / was able to: past ability (was able to = succeeded once)" },
      { vi: "must have V3: chắc đã; might/could have V3: có lẽ đã; can't have V3: không thể đã", en: "must have V3: must have done; might/could have V3: might have done; can't have V3: couldn't have done" },
    ],
    examples: [
      { en: "You should have called me earlier.", vi: "Lẽ ra bạn nên gọi tôi sớm hơn." },
      { en: "She must have left already – the lights are off.", vi: "Cô ấy chắc đã đi rồi - đèn đã tắt." },      { en: "He can't have stolen it \u2013 he was with me all night.", vi: "Anh \u1ea5y kh\u00f4ng th\u1ec3 \u0111\u00e3 tr\u1ed9m n\u00f3 \u2013 anh \u1ea5y \u1edf v\u1edbi t\u00f4i c\u1ea3 \u0111\u00eam." },

    ],
    trapVi: "Phân biệt 'should V' (lời khuyên hiện tại) và 'should have V3' (đáng lẽ đã - tiếc nuối).",
    trapEn: "Distinguish 'should V' (present advice) vs 'should have V3' (regret about the past).",
    tipVi: "Khi \u0111\u1ec1 cho 'must have V3' ho\u1eb7c 'can't have V3' \u2192 \u0111\u00e2y l\u00e0 SUY \u0110O\u00c1N V\u1ec0 QU\u00c1 KH\u1ee8, \u0111\u1eebng d\u1ecbch sang ngh\u0129a hi\u1ec7n t\u1ea1i.",
    tipEn: "If you see 'must have V3' or 'can't have V3' \u2192 it's a PAST DEDUCTION, don't translate it as a present meaning.",
  },
  {
    id: "gerund-infinitive",
    icon: "📝",
    titleVi: "Gerund vs To-infinitive",
    titleEn: "Gerund vs To-infinitive",
    summaryVi: "Học thuộc danh sách động từ + Ving / + to V. Lưu ý các động từ đổi nghĩa.",
    summaryEn: "Memorize verbs that take Ving vs to V. Watch out for verbs that change meaning.",
    detailVi: "Khi m\u1ed9t \u0111\u1ed9ng t\u1eeb \u0111\u1ee9ng sau m\u1ed9t \u0111\u1ed9ng t\u1eeb kh\u00e1c, ta ph\u1ea3i bi\u1ebft n\u00f3 \u0111i v\u1edbi V-ing hay 'to V'. C\u00f3 4 nh\u00f3m: (1) ch\u1ec9 + V-ing: enjoy, avoid, mind, finish, suggest, deny, admit\u2026 (2) ch\u1ec9 + to V: want, decide, hope, plan, promise, agree, refuse, manage\u2026 (3) + V-ing ho\u1eb7c + to V kh\u00f4ng \u0111\u1ed5i ngh\u0129a: like, love, hate, prefer, begin, start. (4) + V-ing ho\u1eb7c + to V \u0110\u1ed4I NGH\u0128A: stop, remember, forget, regret, try, mean. Sau gi\u1edbi t\u1eeb v\u00e0 sau 'be used to / look forward to' lu\u00f4n d\u00f9ng V-ing.",
    detailEn: "When a verb follows another verb, you must know whether it takes V-ing or 'to V'. Four groups: (1) V-ing only: enjoy, avoid, mind, finish, suggest, deny, admit\u2026 (2) to V only: want, decide, hope, plan, promise, agree, refuse, manage\u2026 (3) V-ing or to V with same meaning: like, love, hate, prefer, begin, start. (4) V-ing or to V with DIFFERENT meaning: stop, remember, forget, regret, try, mean. After prepositions and 'be used to / look forward to' always use V-ing.",
    formulas: [
      "+ V-ing: enjoy / avoid / mind / finish / suggest / deny / admit + V-ing",
      "+ to V: want / decide / hope / plan / promise / agree / refuse + to V",
      "stop V-ing \u2260 stop to V    |    remember V-ing \u2260 remember to V",
      "After preposition: \u2026of/in/at/on/for + V-ing",
    ],
    rules: [
      { vi: "+ Ving: enjoy, avoid, mind, finish, suggest, deny, admit, consider", en: "+ Ving: enjoy, avoid, mind, finish, suggest, deny, admit, consider" },
      { vi: "+ to V: want, decide, hope, plan, promise, agree, refuse, manage", en: "+ to V: want, decide, hope, plan, promise, agree, refuse, manage" },
      { vi: "Đổi nghĩa: stop Ving (dừng việc đang làm) ≠ stop to V (dừng để làm)", en: "Meaning changes: stop Ving (stop the action) ≠ stop to V (stop in order to)" },
      { vi: "Remember/Forget Ving: nhớ/quên đã làm; + to V: nhớ/quên phải làm", en: "Remember/Forget + Ving: recall doing; + to V: remember to do" },
    ],
    examples: [
      { en: "I remember locking the door (đã khóa).", vi: "Tôi nhớ đã khóa cửa." },
      { en: "Remember to lock the door before leaving (phải khóa).", vi: "Hãy nhớ khóa cửa trước khi đi." },      { en: "She avoided answering the question.", vi: "C\u00f4 \u1ea5y n\u00e9 tr\u1ea3 l\u1eddi c\u00e2u h\u1ecfi." },

    ],
    trapVi: "Sau giới từ luôn dùng Ving. 'Used to V' (thói quen quá khứ) ≠ 'be used to Ving' (đã quen với).",
    trapEn: "Always Ving after prepositions. 'Used to V' (past habit) ≠ 'be used to Ving' (accustomed to).",
    tipVi: "\u0110\u1eb7c bi\u1ec7t nh\u1edb 4 c\u1eb7p \u0111\u1ed5i ngh\u0129a: stop / remember / forget / try. \u0110\u00e2y l\u00e0 d\u1ea1ng c\u00e2u B\u1eaaY \u01b0a th\u00edch c\u1ee7a \u0111\u1ec1 THPT.",
    tipEn: "Memorise the 4 meaning-changing pairs: stop / remember / forget / try. These are the THPT examiner's favourite trap.",
  },
  {
    id: "comparison",
    icon: "⚖️",
    titleVi: "Cấu trúc so sánh (Comparison)",
    titleEn: "Comparison Structures",
    summaryVi: "So sánh hơn, nhất, kép, gấp bội, càng… càng…",
    summaryEn: "Comparative, superlative, double, multiples, the more… the more…",
    detailVi: "So s\u00e1nh chia l\u00e0m 4 d\u1ea1ng ch\u00ednh: (1) B\u1eb0NG: as + adj/adv + as; (2) H\u01a0N: -er than (1 \u00e2m ti\u1ebft) ho\u1eb7c more + adj/adv than (\u22652 \u00e2m ti\u1ebft); (3) NH\u1ea4T: the -est / the most; (4) c\u00e1c c\u1ea5u tr\u00fac n\u00e2ng cao: K\u00c9P (-er and -er, more and more), G\u1ea4P B\u1ed8I (twice/three times as adj as), C\u00c0NG\u2026C\u00c0NG (The + comparative\u2026, the + comparative\u2026). M\u1ed9t s\u1ed1 t\u00ednh t\u1eeb b\u1ea5t quy t\u1eafc: good\u2192better\u2192best, bad\u2192worse\u2192worst, far\u2192farther/further\u2192farthest/furthest.",
    detailEn: "There are 4 main comparison structures: (1) EQUAL: as + adj/adv + as; (2) MORE: -er than (1 syllable) or more + adj/adv than (\u22652 syllables); (3) MOST: the -est / the most; (4) advanced patterns: DOUBLE (-er and -er, more and more), MULTIPLES (twice/three times as adj as), THE-MORE-THE-MORE (The + comparative\u2026, the + comparative\u2026). Irregulars: good\u2192better\u2192best, bad\u2192worse\u2192worst, far\u2192farther/further\u2192farthest/furthest.",
    formulas: [
      "Equal: S + V + as + adj/adv + as + N",
      "Comparative: S + V + adj-er / more adj + than + N",
      "Superlative: S + V + the + adj-est / the most + adj",
      "The + comparative \u2026, the + comparative \u2026 (c\u00e0ng\u2026 c\u00e0ng\u2026)",
    ],
    rules: [
      { vi: "Hơn: -er than / more … than (tính từ ≥ 2 âm tiết)", en: "Comparative: -er than / more … than (≥ 2 syllables)" },
      { vi: "Nhất: the -est / the most …", en: "Superlative: the -est / the most …" },
      { vi: "Kép: -er and -er, more and more", en: "Double: -er and -er, more and more" },
      { vi: "Gấp bội: twice/three times as Adj as", en: "Multiples: twice/three times as Adj as" },
      { vi: "Càng … càng …: The + comparative …, the + comparative …", en: "The + comparative …, the + comparative …" },
    ],
    examples: [
      { en: "The harder you work, the more you achieve.", vi: "Bạn càng làm việc chăm, bạn càng đạt được nhiều." },
      { en: "This phone is twice as expensive as that one.", vi: "Điện thoại này đắt gấp đôi cái kia." },      { en: "The more she practises, the more confident she becomes.", vi: "C\u00f4 \u1ea5y c\u00e0ng luy\u1ec7n t\u1eadp, c\u00e0ng tr\u1edf n\u00ean t\u1ef1 tin." },

    ],
    trapVi: "Cấu trúc 'as Adj as' không dùng 'more'. So sánh nhất luôn có 'the'.",
    trapEn: "'as Adj as' never uses 'more'. Always 'the' before superlatives.",
    tipVi: "N\u1ebfu th\u1ea5y 'than' \u2192 b\u1eaft bu\u1ed9c d\u00f9ng so s\u00e1nh h\u01a1n (-er / more). N\u1ebfu th\u1ea5y 'in/of' ph\u00eda sau \u2192 so s\u00e1nh nh\u1ea5t (the\u2026-est).",
    tipEn: "If you see 'than' \u2192 comparative (-er / more) is required. If 'in/of' follows \u2192 superlative (the\u2026-est).",
  },
  {
    id: "articles-prepositions",
    icon: "🔤",
    titleVi: "Mạo từ & Giới từ",
    titleEn: "Articles & Prepositions",
    summaryVi: "a/an/the và các giới từ thời gian, nơi chốn dễ nhầm.",
    summaryEn: "a/an/the and easily-confused time/place prepositions.",
    detailVi: "M\u1ea0O T\u1eea: a/an d\u00f9ng cho danh t\u1eeb \u0111\u1ebfm \u0111\u01b0\u1ee3c s\u1ed1 \u00edt, l\u1ea7n \u0111\u1ea7u nh\u1eafc \u0111\u1ebfn (a = ph\u1ee5 \u00e2m, an = nguy\u00ean \u00e2m); 'the' d\u00f9ng khi \u0111\u1ed1i t\u01b0\u1ee3ng \u0111\u00e3 \u0111\u01b0\u1ee3c x\u00e1c \u0111\u1ecbnh, l\u00e0 duy nh\u1ea5t, ho\u1eb7c \u0111\u00e3 nh\u1eafc \u0111\u1ebfn tr\u01b0\u1edbc. Kh\u00f4ng d\u00f9ng m\u1ea1o t\u1eeb v\u1edbi t\u00ean ng\u01b0\u1eddi, t\u00ean qu\u1ed1c gia (tr\u1eeb the UK, the USA), t\u00ean m\u00f4n th\u1ec3 thao, ng\u00f4n ng\u1eef. GI\u1edaI T\u1eea TH\u1edcI GIAN: at + gi\u1edd/l\u00fac; on + ng\u00e0y/th\u1ee9; in + th\u00e1ng/n\u0103m/th\u1ebf k\u1ef7. GI\u1edaI T\u1eea N\u01a0I CH\u1ed0N: at + \u0111i\u1ec3m c\u1ee5 th\u1ec3; on + b\u1ec1 m\u1eb7t/\u0111\u01b0\u1eddng; in + kh\u00f4ng gian bao quanh.",
    detailEn: "ARTICLES: a/an for singular countable nouns on first mention (a = consonant sound, an = vowel sound); 'the' for known, unique, or previously-mentioned things. No article with personal names, most countries (except the UK, the USA), sports, or languages. TIME PREPOSITIONS: at + clock time; on + day/date; in + month/year/century. PLACE PREPOSITIONS: at + specific point; on + surface/street; in + enclosed space.",
    formulas: [
      "a/an + danh t\u1eeb \u0111\u1ebfm \u0111\u01b0\u1ee3c s\u1ed1 \u00edt, l\u1ea7n \u0111\u1ea7u nh\u1eafc",
      "the + danh t\u1eeb \u0111\u00e3 x\u00e1c \u0111\u1ecbnh / duy nh\u1ea5t / l\u1ea7n th\u1ee9 2 tr\u1edf \u0111i",
      "TIME: at 7pm  /  on Monday  /  in July / 2026",
      "PLACE: at the bus stop  /  on Hoang Dieu Street  /  in Hanoi",
    ],
    rules: [
      { vi: "a/an: lần đầu nhắc đến; the: lần thứ 2 hoặc duy nhất", en: "a/an: first mention; the: second mention or unique" },
      { vi: "in + tháng/năm/thế kỷ; on + ngày; at + giờ", en: "in + month/year/century; on + day; at + time" },
      { vi: "in + thành phố/quốc gia; at + địa chỉ cụ thể; on + đường", en: "in + city/country; at + specific address; on + street" },
      { vi: "by + phương tiện (by bus); on foot; in + bệnh viện/tù", en: "by + transport; on foot; in + hospital/jail" },
    ],
    examples: [
      { en: "She lives in Hanoi, on Hoang Dieu Street, at number 25.", vi: "Cô ấy sống ở Hà Nội, trên đường Hoàng Diệu, số 25." },
      { en: "The Earth revolves around the Sun.", vi: "Trái Đất quay quanh Mặt Trời." },      { en: "I bought a book yesterday. The book is about AI.", vi: "T\u00f4i mua m\u1ed9t quy\u1ec3n s\u00e1ch h\u00f4m qua. Quy\u1ec3n s\u00e1ch \u0111\u00f3 n\u00f3i v\u1ec1 AI." },

    ],
    trapVi: "'the' đứng trước tên sông, biển, dãy núi nhưng KHÔNG đứng trước tên hồ, núi đơn lẻ, lục địa.",
    trapEn: "'the' is used with rivers, oceans, mountain ranges, but NOT lakes, single mountains, continents.",
    tipVi: "Quy t\u1eafc nhanh: AT (ch\u00ednh x\u00e1c) > ON (b\u1ec1 m\u1eb7t) > IN (bao quanh). \u00c1p d\u1ee5ng c\u1ea3 th\u1eddi gian v\u00e0 n\u01a1i ch\u1ed1n.",
    tipEn: "Quick rule: AT (precise) > ON (surface) > IN (enclosed). Works for both time and place.",
  },
  {
    id: "phrasal-verbs",
    icon: "🧩",
    titleVi: "Cụm động từ (Phrasal Verbs)",
    titleEn: "Phrasal Verbs",
    summaryVi: "Khoảng 50 phrasal verbs xuất hiện thường xuyên - thuộc nghĩa và cách dùng.",
    summaryEn: "About 50 phrasal verbs appear regularly — memorize meanings and usage.",
    detailVi: "Phrasal verb l\u00e0 \u0111\u1ed9ng t\u1eeb + gi\u1edbi t\u1eeb/tr\u1ea1ng t\u1eeb t\u1ea1o ngh\u0129a M\u1edaI kh\u00e1c h\u1eb3n ngh\u0129a g\u1ed1c. V\u00ed d\u1ee5 'look' = nh\u00ecn nh\u01b0ng 'look after' = ch\u0103m s\u00f3c, 'look up' = tra c\u1ee9u, 'look forward to' = mong \u0111\u1ee3i. C\u00f3 2 lo\u1ea1i: T\u00c1CH \u0110\u01af\u1ee2C (give it up \u2713) v\u00e0 KH\u00d4NG T\u00c1CH (look after him \u2713, kh\u00f4ng th\u1ec3 look him after). Khi t\u00e2n ng\u1eef l\u00e0 \u0111\u1ea1i t\u1eeb (it/them/me\u2026) ph\u1ea3i \u0111\u1eb7t GI\u1eeeA \u0111\u1ed9ng t\u1eeb v\u00e0 gi\u1edbi t\u1eeb v\u1edbi nh\u00f3m t\u00e1ch \u0111\u01b0\u1ee3c.",
    detailEn: "A phrasal verb is verb + preposition/adverb that creates a NEW meaning different from the original. E.g. 'look' = see, but 'look after' = take care, 'look up' = search, 'look forward to' = anticipate. Two kinds: SEPARABLE (give it up \u2713) and INSEPARABLE (look after him \u2713, NOT look him after). When the object is a pronoun (it/them/me\u2026), it must go BETWEEN the verb and particle for separable phrasal verbs.",
    formulas: [
      "Inseparable: S + verb + particle + O   (look after the kids)",
      "Separable: S + verb + O + particle   (turn the music down)",
      "Pronoun rule: S + verb + pronoun + particle   (turn it down \u2713)",
      "+ to + V-ing: look forward to V-ing  /  be used to V-ing",
    ],
    rules: [
      { vi: "look after = chăm sóc; look up = tra cứu; look forward to = mong đợi", en: "look after = take care; look up = search; look forward to = anticipate" },
      { vi: "give up = từ bỏ; turn down = từ chối; put off = trì hoãn", en: "give up = quit; turn down = reject; put off = postpone" },
      { vi: "find out = phát hiện; carry out = thực hiện; take after = giống ai", en: "find out = discover; carry out = perform; take after = resemble" },
      { vi: "break down = hỏng; break up = chia tay; break out = bùng phát", en: "break down = stop working; break up = end relationship; break out = erupt" },
    ],
    examples: [
      { en: "I'm looking forward to hearing from you.", vi: "Tôi mong nhận được tin từ bạn." },
      { en: "He takes after his father.", vi: "Anh ấy giống bố." },      { en: "Could you turn the music down? It's too loud.", vi: "B\u1ea1n v\u1eb7n nh\u1ecf nh\u1ea1c xu\u1ed1ng \u0111\u01b0\u1ee3c kh\u00f4ng? \u1ed2n qu\u00e1." },

    ],
    trapVi: "'look forward to' + Ving (không phải to V). Phân biệt break down/up/out.",
    trapEn: "'look forward to' + Ving (NOT to V). Distinguish break down/up/out.",
    tipVi: "M\u1ed7i tu\u1ea7n h\u1ecdc 10 phrasal verbs theo CH\u1ee6 \u0110\u1ec0 (work / travel / health\u2026) thay v\u00ec h\u1ecdc b\u1ea3ng ch\u1eef c\u00e1i \u2013 nh\u1edb l\u00e2u g\u1ea5p 3 l\u1ea7n.",
    tipEn: "Learn 10 phrasal verbs per week by THEME (work / travel / health\u2026) instead of alphabetically \u2013 you'll retain them 3\u00d7 longer.",
  },
  {
    id: "word-form",
    icon: "🔠",
    titleVi: "Word Form (Từ loại)",
    titleEn: "Word Form",
    summaryVi: "Nhận biết hậu tố để chọn đúng N/V/Adj/Adv. Phần này luôn có ~4-5 câu.",
    summaryEn: "Recognize suffixes to pick the right N/V/Adj/Adv. ~4-5 questions per exam.",
    detailVi: "Word form (t\u1eeb lo\u1ea1i) l\u00e0 d\u1ea1ng c\u00e2u h\u1ecfi cho s\u1eb5n t\u1eeb g\u1ed1c trong ngo\u1eb7c, th\u00ed sinh ph\u1ea3i bi\u1ebfn \u0111\u1ed5i th\u00e0nh DANH T\u1eea / \u0110\u1ed8NG T\u1eea / T\u00cdNH T\u1eea / TR\u1ea0NG T\u1eea ph\u00f9 h\u1ee3p. C\u00e1ch l\u00e0m: (1) Xem v\u1ecb tr\u00ed trong c\u00e2u \u0111\u1ec3 x\u00e1c \u0111\u1ecbnh c\u1ea7n lo\u1ea1i t\u1eeb g\u00ec. (2) \u00c1p d\u1ee5ng h\u1eadu t\u1ed1 t\u01b0\u01a1ng \u1ee9ng. (3) Ki\u1ec3m tra \u00fd ngh\u0129a c\u00e2u \u0111\u1ec3 ch\u1ecdn d\u1ea1ng t\u00edch c\u1ef1c hay ti\u00eau c\u1ef1c (un-, in-, dis-, mis-\u2026). V\u1ecb tr\u00ed th\u01b0\u1eddng g\u1eb7p: sau 'the/a/an' \u2192 danh t\u1eeb; sau 'be/become/seem/look' \u2192 t\u00ednh t\u1eeb; sau \u0111\u1ed9ng t\u1eeb th\u01b0\u1eddng \u2192 tr\u1ea1ng t\u1eeb; thi\u1ebfu \u0111\u1ed9ng t\u1eeb \u2192 \u0111\u1ed9ng t\u1eeb.",
    detailEn: "Word-form questions give the root word in brackets and ask you to convert it into the right NOUN / VERB / ADJECTIVE / ADVERB. Method: (1) Look at the slot in the sentence to decide the part of speech. (2) Apply the matching suffix. (3) Check the meaning to choose positive or negative form (un-, in-, dis-, mis-\u2026). Common slots: after 'the/a/an' \u2192 noun; after 'be/become/seem/look' \u2192 adjective; after a normal verb \u2192 adverb; missing verb \u2192 verb.",
    formulas: [
      "Noun: -tion / -ment / -ness / -ity / -ence / -er / -or / -ist",
      "Adjective: -ful / -less / -ous / -al / -ive / -able / -ic",
      "Adverb: adj + -ly  (irregular: hard, fast, late, early, well)",
      "Verb: -ize / -ify / -en / -ate    Negative: un- / in- / dis- / mis-",
    ],
    rules: [
      { vi: "Hậu tố danh từ: -tion, -ment, -ness, -ity, -ence, -er, -or, -ist", en: "Noun suffixes: -tion, -ment, -ness, -ity, -ence, -er, -or, -ist" },
      { vi: "Hậu tố tính từ: -ful, -less, -ous, -al, -ive, -able, -ic", en: "Adjective suffixes: -ful, -less, -ous, -al, -ive, -able, -ic" },
      { vi: "Hậu tố trạng từ: -ly (thường dùng); một số bất quy tắc: hard, fast, late", en: "Adverb suffix: -ly (most); irregular: hard, fast, late" },
      { vi: "Hậu tố động từ: -ize, -ify, -en, -ate", en: "Verb suffixes: -ize, -ify, -en, -ate" },
    ],
    examples: [
      { en: "His ___ (decide) surprised everyone. → decision", vi: "Quyết định của anh ấy khiến mọi người ngạc nhiên." },
      { en: "She speaks English ___ (fluent). → fluently", vi: "Cô ấy nói tiếng Anh trôi chảy." },      { en: "His ___ (decide) surprised everyone. \u2192 decision (noun after possessive)", vi: "Quy\u1ebft \u0111\u1ecbnh c\u1ee7a anh \u1ea5y khi\u1ebfn m\u1ecdi ng\u01b0\u1eddi ng\u1ea1c nhi\u00ean." },

    ],
    trapVi: "Sau 'be / become / seem / look' dùng tính từ chứ không phải trạng từ.",
    trapEn: "After 'be / become / seem / look' use adjective, not adverb.",
    tipVi: "\u0110\u1ecdc to c\u00e2u sau khi \u0111i\u1ec1n \u2013 n\u1ebfu nghe 'l\u1ea1 tai' th\u00ec 90% l\u00e0 sai t\u1eeb lo\u1ea1i. \u0110\u00e2y l\u00e0 c\u00e1ch ki\u1ec3m tra c\u1ef1c nhanh.",
    tipEn: "Read the sentence aloud after filling \u2013 if it sounds 'off', 90% of the time it's the wrong word form. Fastest sanity check.",
  },
  {
    id: "inversion-emphasis",
    icon: "⚡",
    titleVi: "Đảo ngữ & Câu nhấn mạnh",
    titleEn: "Inversion & Emphatic Structures",
    summaryVi: "Cấu trúc khó - thường xuất hiện trong câu đồng nghĩa hoặc viết lại câu.",
    summaryEn: "Advanced structures — common in synonym or sentence rewriting tasks.",
    detailVi: "\u0110\u1ea3o ng\u1eef l\u00e0 c\u1ea5u tr\u00fac \u0111\u01b0a tr\u1ee3 \u0111\u1ed9ng t\u1eeb L\u00caN TR\u01af\u1edaC ch\u1ee7 ng\u1eef \u0111\u1ec3 nh\u1ea5n m\u1ea1nh, th\u01b0\u1eddng xu\u1ea5t hi\u1ec7n sau c\u00e1c tr\u1ea1ng t\u1eeb ph\u1ee7 \u0111\u1ecbnh/h\u1ea1n \u0111\u1ecbnh \u1edf \u0111\u1ea7u c\u00e2u. C\u00e2u nh\u1ea5n m\u1ea1nh d\u1ea1ng 'It is/was\u2026that\u2026' (cleft) d\u00f9ng \u0111\u1ec3 l\u00e0m n\u1ed5i b\u1eadt m\u1ed9t th\u00e0nh ph\u1ea7n c\u1ee5 th\u1ec3. \u0110\u00e2y l\u00e0 d\u1ea1ng c\u1ea5u tr\u00fac kh\u00f3 - t\u1ea7n su\u1ea5t cao trong c\u00e2u vi\u1ebft l\u1ea1i / c\u00e2u \u0111\u1ed3ng ngh\u0129a.",
    detailEn: "Inversion moves the auxiliary BEFORE the subject for emphasis, usually after a fronted negative/limiting adverb. The 'It is/was\u2026that\u2026' cleft sentence highlights one particular element. These advanced patterns appear frequently in rewriting / synonym questions.",
    formulas: [
      "Never / Rarely / Seldom / Hardly + aux + S + V",
      "Not until + clause/time, + aux + S + V",
      "Only when / Only after / Only by + clause, + aux + S + V",
      "It + be + emphasised part + that + clause",
    ],
    rules: [
      { vi: "Never/Rarely/Hardly + trợ động từ + S + V", en: "Never/Rarely/Hardly + auxiliary + S + V" },
      { vi: "Not until + S + V + auxiliary + S + V", en: "Not until + S + V + auxiliary + S + V" },
      { vi: "Only when/by/after + clause, auxiliary + S + V", en: "Only when/by/after + clause, auxiliary + S + V" },
      { vi: "It is/was + emphasized part + that…", en: "It is/was + emphasized part + that…" },
    ],
    examples: [
      { en: "Never have I seen such a beautiful sunset.", vi: "Tôi chưa bao giờ thấy hoàng hôn đẹp đến vậy." },
      { en: "It was John who broke the vase.", vi: "Chính John là người đã làm vỡ bình hoa." },      { en: "Not only did he apologise, but he also paid for the damage.", vi: "Kh\u00f4ng nh\u1eefng anh \u1ea5y xin l\u1ed7i m\u00e0 c\u00f2n tr\u1ea3 ti\u1ec1n cho ph\u1ea7n thi\u1ec7t h\u1ea1i." },

    ],
    trapVi: "Sau 'No sooner' đi với 'than'; sau 'Hardly' đi với 'when'.",
    trapEn: "'No sooner' pairs with 'than'; 'Hardly' pairs with 'when'.",
    tipVi: "Khi vi\u1ebft l\u1ea1i c\u00e2u, \u01b0u ti\u00ean \u0111\u1ea3o ng\u1eef v\u1edbi 'Never / Not until / Only when' \u2013 \u0111\u00e2y l\u00e0 c\u1ea5u tr\u00fac '\u0103n \u0111i\u1ec3m' c\u1ee7a \u0111\u1ec1 THPT.",
    tipEn: "For rewriting tasks, prefer inversion with 'Never / Not until / Only when' \u2013 these score reliable points on the THPT exam.",
  },
];

export interface VocabTheme {
  id: string;
  icon: string;
  titleVi: string;
  titleEn: string;
  words: { en: string; pos: string; vi: string; example: string }[];
}

export const thptVocabThemes: VocabTheme[] = [
  {
    id: "education",
    icon: "🎓",
    titleVi: "Giáo dục & Học tập",
    titleEn: "Education & Learning",
    words: [
      { en: "curriculum", pos: "n", vi: "chương trình học", example: "The new curriculum is very challenging." },
      { en: "scholarship", pos: "n", vi: "học bổng", example: "She won a full scholarship to Harvard." },
      { en: "graduate", pos: "v/n", vi: "tốt nghiệp / sinh viên đã tốt nghiệp", example: "He graduated with honors last year." },
      { en: "tuition fee", pos: "n", vi: "học phí", example: "Tuition fees have risen by 10% this year." },
      { en: "extracurricular", pos: "adj", vi: "ngoại khóa", example: "Extracurricular activities build leadership." },
      { en: "literacy", pos: "n", vi: "khả năng đọc viết", example: "Vietnam has a high literacy rate." },
      { en: "vocational", pos: "adj", vi: "thuộc dạy nghề", example: "Vocational training prepares students for jobs." },
      { en: "compulsory", pos: "adj", vi: "bắt buộc", example: "Math is a compulsory subject." },
    ],
  },
  {
    id: "environment",
    icon: "🌱",
    titleVi: "Môi trường & Biến đổi khí hậu",
    titleEn: "Environment & Climate Change",
    words: [
      { en: "pollution", pos: "n", vi: "ô nhiễm", example: "Air pollution is a serious problem in big cities." },
      { en: "deforestation", pos: "n", vi: "nạn phá rừng", example: "Deforestation contributes to global warming." },
      { en: "greenhouse gas", pos: "n", vi: "khí nhà kính", example: "Greenhouse gases trap heat in the atmosphere." },
      { en: "renewable", pos: "adj", vi: "có thể tái tạo", example: "Solar power is a renewable source of energy." },
      { en: "biodiversity", pos: "n", vi: "đa dạng sinh học", example: "The forest is rich in biodiversity." },
      { en: "endangered", pos: "adj", vi: "có nguy cơ tuyệt chủng", example: "Many species are endangered today." },
      { en: "sustainable", pos: "adj", vi: "bền vững", example: "We need a sustainable development plan." },
      { en: "conserve", pos: "v", vi: "bảo tồn", example: "We must conserve water during the dry season." },
    ],
  },
  {
    id: "technology",
    icon: "💻",
    titleVi: "Công nghệ & Đời sống số",
    titleEn: "Technology & Digital Life",
    words: [
      { en: "artificial intelligence", pos: "n", vi: "trí tuệ nhân tạo", example: "AI is transforming many industries." },
      { en: "cyberbullying", pos: "n", vi: "bắt nạt trên mạng", example: "Cyberbullying has serious consequences." },
      { en: "innovation", pos: "n", vi: "sự đổi mới", example: "Innovation drives economic growth." },
      { en: "virtual", pos: "adj", vi: "ảo", example: "Many meetings are now held in virtual reality." },
      { en: "automation", pos: "n", vi: "tự động hóa", example: "Automation may replace some jobs." },
      { en: "social media", pos: "n", vi: "mạng xã hội", example: "Social media affects our daily lives." },
      { en: "device", pos: "n", vi: "thiết bị", example: "Mobile devices are everywhere." },
      { en: "user-friendly", pos: "adj", vi: "dễ sử dụng", example: "The new app is user-friendly." },
    ],
  },
  {
    id: "career",
    icon: "💼",
    titleVi: "Việc làm & Nghề nghiệp",
    titleEn: "Work & Careers",
    words: [
      { en: "employment", pos: "n", vi: "việc làm", example: "Youth employment is a national priority." },
      { en: "candidate", pos: "n", vi: "ứng viên", example: "We have ten candidates for the position." },
      { en: "promotion", pos: "n", vi: "thăng chức", example: "She got a promotion last week." },
      { en: "salary", pos: "n", vi: "lương", example: "He earns a competitive salary." },
      { en: "qualification", pos: "n", vi: "bằng cấp", example: "This job requires high qualifications." },
      { en: "freelance", pos: "adj", vi: "tự do, không cố định", example: "She works as a freelance designer." },
      { en: "workforce", pos: "n", vi: "lực lượng lao động", example: "Women make up half the workforce." },
      { en: "applicant", pos: "n", vi: "người nộp đơn", example: "Each applicant must submit a CV." },
    ],
  },
  {
    id: "health",
    icon: "💚",
    titleVi: "Sức khỏe & Lối sống",
    titleEn: "Health & Lifestyle",
    words: [
      { en: "nutrition", pos: "n", vi: "dinh dưỡng", example: "Good nutrition is vital for children." },
      { en: "obesity", pos: "n", vi: "béo phì", example: "Obesity is a growing health concern." },
      { en: "immune system", pos: "n", vi: "hệ miễn dịch", example: "Exercise strengthens the immune system." },
      { en: "well-being", pos: "n", vi: "sự khỏe mạnh, hạnh phúc", example: "Mental well-being matters as much as physical health." },
      { en: "stressful", pos: "adj", vi: "căng thẳng", example: "Final exams can be stressful." },
      { en: "balanced diet", pos: "n", vi: "chế độ ăn cân bằng", example: "A balanced diet keeps you healthy." },
      { en: "vaccination", pos: "n", vi: "tiêm chủng", example: "Vaccination protects us from diseases." },
      { en: "sedentary", pos: "adj", vi: "ít vận động", example: "A sedentary lifestyle is harmful." },
    ],
  },
  {
    id: "society",
    icon: "🌍",
    titleVi: "Xã hội & Văn hóa",
    titleEn: "Society & Culture",
    words: [
      { en: "tradition", pos: "n", vi: "truyền thống", example: "Tet is an important Vietnamese tradition." },
      { en: "diversity", pos: "n", vi: "sự đa dạng", example: "Cultural diversity enriches our society." },
      { en: "community", pos: "n", vi: "cộng đồng", example: "Volunteers help the local community." },
      { en: "generation", pos: "n", vi: "thế hệ", example: "Each generation has its own challenges." },
      { en: "etiquette", pos: "n", vi: "phép xã giao", example: "Table etiquette varies across cultures." },
      { en: "heritage", pos: "n", vi: "di sản", example: "Hue is a UNESCO heritage site." },
      { en: "globalization", pos: "n", vi: "toàn cầu hóa", example: "Globalization has changed how we live." },
      { en: "integrate", pos: "v", vi: "hòa nhập", example: "Immigrants try to integrate into local society." },
    ],
  },
  {
    id: "travel",
    icon: "✈️",
    titleVi: "Du lịch & Khám phá",
    titleEn: "Travel & Exploration",
    words: [
      { en: "destination", pos: "n", vi: "điểm đến", example: "Da Nang is a popular destination." },
      { en: "itinerary", pos: "n", vi: "lịch trình", example: "Plan your itinerary in advance." },
      { en: "accommodation", pos: "n", vi: "chỗ ở", example: "Book accommodation early in peak season." },
      { en: "sightseeing", pos: "n", vi: "tham quan", example: "We went sightseeing in the old town." },
      { en: "souvenir", pos: "n", vi: "đồ lưu niệm", example: "She bought souvenirs for her family." },
      { en: "luggage", pos: "n", vi: "hành lý", example: "Don't forget to label your luggage." },
      { en: "adventure", pos: "n", vi: "cuộc phiêu lưu", example: "Trekking in Sapa is a real adventure." },
      { en: "tourist attraction", pos: "n", vi: "điểm du lịch", example: "Hoi An is a famous tourist attraction." },
    ],
  },
  {
    id: "youth",
    icon: "🧑‍🎓",
    titleVi: "Thanh niên & Tương lai",
    titleEn: "Youth & Future",
    words: [
      { en: "ambition", pos: "n", vi: "tham vọng", example: "Her ambition is to become a doctor." },
      { en: "responsibility", pos: "n", vi: "trách nhiệm", example: "Young people share social responsibility." },
      { en: "self-confidence", pos: "n", vi: "sự tự tin", example: "Public speaking builds self-confidence." },
      { en: "potential", pos: "n", vi: "tiềm năng", example: "Every student has great potential." },
      { en: "achievement", pos: "n", vi: "thành tựu", example: "Winning the prize was a big achievement." },
      { en: "challenge", pos: "n", vi: "thử thách", example: "Life is full of challenges." },
      { en: "perseverance", pos: "n", vi: "sự kiên trì", example: "Perseverance is the key to success." },
      { en: "role model", pos: "n", vi: "tấm gương", example: "Teachers are role models for students." },
    ],
  },
];
