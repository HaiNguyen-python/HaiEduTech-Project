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
    ],
    trapVi: "Mệnh đề 'when/while' + quá khứ tiếp diễn, mệnh đề chính dùng quá khứ đơn. Đừng lẫn 'since' (mốc) với 'for' (khoảng thời gian).",
    trapEn: "When/while + past continuous, main clause = past simple. Don't confuse 'since' (point in time) with 'for' (duration).",
  },
  {
    id: "conditional",
    icon: "🔀",
    titleVi: "Câu điều kiện (Loại 1, 2, 3 & hỗn hợp)",
    titleEn: "Conditional Sentences (Type 1, 2, 3 & Mixed)",
    summaryVi: "Phân biệt 4 loại câu điều kiện và đảo ngữ - dạng câu phổ biến trong phần Sentence Combination.",
    summaryEn: "Distinguish 4 conditional types and inversion — common in Sentence Combination tasks.",
    rules: [
      { vi: "Loại 1: If + S + V(s/es), S + will + V (có thật)", en: "Type 1: If + S + V(s/es), S + will + V (real)" },
      { vi: "Loại 2: If + S + V2/ed, S + would + V (giả định hiện tại)", en: "Type 2: If + S + V2/ed, S + would + V (present unreal)" },
      { vi: "Loại 3: If + S + had + V3, S + would have + V3 (giả định quá khứ)", en: "Type 3: If + S + had + V3, S + would have + V3 (past unreal)" },
      { vi: "Đảo ngữ: Were S to V / Had S V3 (bỏ 'If')", en: "Inversion: Were S to V / Had S V3 (drop 'If')" },
    ],
    examples: [
      { en: "If I had studied harder, I would have passed the exam.", vi: "Nếu tôi học chăm hơn, tôi đã đậu kỳ thi." },
      { en: "Had I known earlier, I would have helped you.", vi: "Nếu biết sớm hơn, tôi đã giúp bạn." },
    ],
    trapVi: "Trong câu loại 2, 'were' dùng cho mọi ngôi (If I were you…). Hỗn hợp: If + had V3 (quá khứ), would V (hiện tại).",
    trapEn: "In Type 2, use 'were' for all subjects (If I were you…). Mixed: If + had V3 (past), would V (present).",
  },
  {
    id: "passive",
    icon: "🔄",
    titleVi: "Câu bị động (Passive Voice)",
    titleEn: "Passive Voice",
    summaryVi: "Chuyển từ chủ động sang bị động đúng thì, bao gồm động từ khuyết thiếu và 2 tân ngữ.",
    summaryEn: "Convert active to passive in the correct tense, including modals and double-object verbs.",
    rules: [
      { vi: "Công thức chung: be + V3/Vp.p", en: "General formula: be + V3/past participle" },
      { vi: "Modal passive: modal + be + V3 (must be done)", en: "Modal passive: modal + be + V3 (must be done)" },
      { vi: "Verbs với 2 tân ngữ (give, send, offer): chuyển tân ngữ chỉ người lên đầu", en: "Verbs with 2 objects (give, send, offer): person object goes first" },
      { vi: "Bị động kép: It is said that… / S + is said + to V", en: "Double passive: It is said that… / S + is said + to V" },
    ],
    examples: [
      { en: "The report must be submitted by Friday.", vi: "Báo cáo phải được nộp trước thứ Sáu." },
      { en: "He is believed to have stolen the painting.", vi: "Người ta tin rằng anh ta đã đánh cắp bức tranh." },
    ],
    trapVi: "Khi chuyển bị động kép sang dạng 'S + is said + to V', V chia tùy theo thì của mệnh đề 'that'.",
    trapEn: "For 'S + is said + to V' form, the infinitive form depends on the original tense in the 'that' clause.",
  },
  {
    id: "reported",
    icon: "💬",
    titleVi: "Câu tường thuật (Reported Speech)",
    titleEn: "Reported Speech",
    summaryVi: "Lùi thì, đổi đại từ, đổi trạng từ chỉ thời gian/nơi chốn. Câu hỏi và câu mệnh lệnh.",
    summaryEn: "Backshift tenses, change pronouns and time/place adverbs. Questions and commands.",
    rules: [
      { vi: "Lùi thì: present → past, past → past perfect, will → would", en: "Backshift: present → past, past → past perfect, will → would" },
      { vi: "Đổi: now → then, today → that day, tomorrow → the next day, here → there", en: "Change: now → then, today → that day, tomorrow → the next day, here → there" },
      { vi: "Câu hỏi Yes/No: asked + if/whether + S + V", en: "Yes/No question: asked + if/whether + S + V" },
      { vi: "Mệnh lệnh: told/asked + O + (not) to V", en: "Commands: told/asked + O + (not) to V" },
    ],
    examples: [
      { en: "She said she had finished her homework.", vi: "Cô ấy nói cô đã làm xong bài tập." },
      { en: "He asked me whether I could help him.", vi: "Anh ấy hỏi tôi liệu tôi có thể giúp anh không." },
    ],
    trapVi: "Không lùi thì với sự thật hiển nhiên hoặc động từ tường thuật ở thì hiện tại.",
    trapEn: "Don't backshift universal truths, or when the reporting verb stays in the present.",
  },
  {
    id: "relative-clauses",
    icon: "🔗",
    titleVi: "Mệnh đề quan hệ (Relative Clauses)",
    titleEn: "Relative Clauses",
    summaryVi: "Who/which/that/whose/whom + rút gọn mệnh đề quan hệ (Ving / V3 / to V).",
    summaryEn: "Who/which/that/whose/whom + reduced relative clauses (Ving / V3 / to V).",
    rules: [
      { vi: "who: người (chủ ngữ); whom: người (tân ngữ); which: vật; that: cả 2 (không dùng sau dấu phẩy/giới từ)", en: "who: person (subject); whom: person (object); which: thing; that: both (not after comma/preposition)" },
      { vi: "whose: sở hữu; where = in/at which; when = on which", en: "whose: possessive; where = in/at which; when = on which" },
      { vi: "Rút gọn: chủ động → Ving; bị động → V3/Ved; mệnh đề mục đích/đầu tiên → to V", en: "Reduce: active → Ving; passive → V3/Ved; purpose/first → to V" },
    ],
    examples: [
      { en: "The book (which is) lying on the table is mine.", vi: "Quyển sách đang nằm trên bàn là của tôi." },
      { en: "The man whose car was stolen is my uncle.", vi: "Người đàn ông bị mất xe là chú tôi." },
    ],
    trapVi: "Sau dấu phẩy không dùng 'that'. Sau giới từ chỉ dùng whom/which (in which, with whom).",
    trapEn: "No 'that' after a comma. After prepositions only whom/which (in which, with whom).",
  },
  {
    id: "modals",
    icon: "🎯",
    titleVi: "Động từ khuyết thiếu (Modal Verbs)",
    titleEn: "Modal Verbs",
    summaryVi: "Diễn đạt khả năng, sự cho phép, lời khuyên, suy đoán - tần suất xuất hiện cao trong cloze test.",
    summaryEn: "Express ability, permission, advice, deduction — high frequency in cloze tests.",
    rules: [
      { vi: "must / have to: bắt buộc; mustn't: cấm; don't have to: không cần", en: "must / have to: obligation; mustn't: prohibition; don't have to: no need" },
      { vi: "should / ought to: lời khuyên; had better: cảnh báo", en: "should / ought to: advice; had better: warning" },
      { vi: "could / was able to: khả năng quá khứ (was able to khi thực hiện thành công)", en: "could / was able to: past ability (was able to = succeeded once)" },
      { vi: "must have V3: chắc đã; might/could have V3: có lẽ đã; can't have V3: không thể đã", en: "must have V3: must have done; might/could have V3: might have done; can't have V3: couldn't have done" },
    ],
    examples: [
      { en: "You should have called me earlier.", vi: "Lẽ ra bạn nên gọi tôi sớm hơn." },
      { en: "She must have left already – the lights are off.", vi: "Cô ấy chắc đã đi rồi - đèn đã tắt." },
    ],
    trapVi: "Phân biệt 'should V' (lời khuyên hiện tại) và 'should have V3' (đáng lẽ đã - tiếc nuối).",
    trapEn: "Distinguish 'should V' (present advice) vs 'should have V3' (regret about the past).",
  },
  {
    id: "gerund-infinitive",
    icon: "📝",
    titleVi: "Gerund vs To-infinitive",
    titleEn: "Gerund vs To-infinitive",
    summaryVi: "Học thuộc danh sách động từ + Ving / + to V. Lưu ý các động từ đổi nghĩa.",
    summaryEn: "Memorize verbs that take Ving vs to V. Watch out for verbs that change meaning.",
    rules: [
      { vi: "+ Ving: enjoy, avoid, mind, finish, suggest, deny, admit, consider", en: "+ Ving: enjoy, avoid, mind, finish, suggest, deny, admit, consider" },
      { vi: "+ to V: want, decide, hope, plan, promise, agree, refuse, manage", en: "+ to V: want, decide, hope, plan, promise, agree, refuse, manage" },
      { vi: "Đổi nghĩa: stop Ving (dừng việc đang làm) ≠ stop to V (dừng để làm)", en: "Meaning changes: stop Ving (stop the action) ≠ stop to V (stop in order to)" },
      { vi: "Remember/Forget Ving: nhớ/quên đã làm; + to V: nhớ/quên phải làm", en: "Remember/Forget + Ving: recall doing; + to V: remember to do" },
    ],
    examples: [
      { en: "I remember locking the door (đã khóa).", vi: "Tôi nhớ đã khóa cửa." },
      { en: "Remember to lock the door before leaving (phải khóa).", vi: "Hãy nhớ khóa cửa trước khi đi." },
    ],
    trapVi: "Sau giới từ luôn dùng Ving. 'Used to V' (thói quen quá khứ) ≠ 'be used to Ving' (đã quen với).",
    trapEn: "Always Ving after prepositions. 'Used to V' (past habit) ≠ 'be used to Ving' (accustomed to).",
  },
  {
    id: "comparison",
    icon: "⚖️",
    titleVi: "Cấu trúc so sánh (Comparison)",
    titleEn: "Comparison Structures",
    summaryVi: "So sánh hơn, nhất, kép, gấp bội, càng… càng…",
    summaryEn: "Comparative, superlative, double, multiples, the more… the more…",
    rules: [
      { vi: "Hơn: -er than / more … than (tính từ ≥ 2 âm tiết)", en: "Comparative: -er than / more … than (≥ 2 syllables)" },
      { vi: "Nhất: the -est / the most …", en: "Superlative: the -est / the most …" },
      { vi: "Kép: -er and -er, more and more", en: "Double: -er and -er, more and more" },
      { vi: "Gấp bội: twice/three times as Adj as", en: "Multiples: twice/three times as Adj as" },
      { vi: "Càng … càng …: The + comparative …, the + comparative …", en: "The + comparative …, the + comparative …" },
    ],
    examples: [
      { en: "The harder you work, the more you achieve.", vi: "Bạn càng làm việc chăm, bạn càng đạt được nhiều." },
      { en: "This phone is twice as expensive as that one.", vi: "Điện thoại này đắt gấp đôi cái kia." },
    ],
    trapVi: "Cấu trúc 'as Adj as' không dùng 'more'. So sánh nhất luôn có 'the'.",
    trapEn: "'as Adj as' never uses 'more'. Always 'the' before superlatives.",
  },
  {
    id: "articles-prepositions",
    icon: "🔤",
    titleVi: "Mạo từ & Giới từ",
    titleEn: "Articles & Prepositions",
    summaryVi: "a/an/the và các giới từ thời gian, nơi chốn dễ nhầm.",
    summaryEn: "a/an/the and easily-confused time/place prepositions.",
    rules: [
      { vi: "a/an: lần đầu nhắc đến; the: lần thứ 2 hoặc duy nhất", en: "a/an: first mention; the: second mention or unique" },
      { vi: "in + tháng/năm/thế kỷ; on + ngày; at + giờ", en: "in + month/year/century; on + day; at + time" },
      { vi: "in + thành phố/quốc gia; at + địa chỉ cụ thể; on + đường", en: "in + city/country; at + specific address; on + street" },
      { vi: "by + phương tiện (by bus); on foot; in + bệnh viện/tù", en: "by + transport; on foot; in + hospital/jail" },
    ],
    examples: [
      { en: "She lives in Hanoi, on Hoang Dieu Street, at number 25.", vi: "Cô ấy sống ở Hà Nội, trên đường Hoàng Diệu, số 25." },
      { en: "The Earth revolves around the Sun.", vi: "Trái Đất quay quanh Mặt Trời." },
    ],
    trapVi: "'the' đứng trước tên sông, biển, dãy núi nhưng KHÔNG đứng trước tên hồ, núi đơn lẻ, lục địa.",
    trapEn: "'the' is used with rivers, oceans, mountain ranges, but NOT lakes, single mountains, continents.",
  },
  {
    id: "phrasal-verbs",
    icon: "🧩",
    titleVi: "Cụm động từ (Phrasal Verbs)",
    titleEn: "Phrasal Verbs",
    summaryVi: "Khoảng 50 phrasal verbs xuất hiện thường xuyên - thuộc nghĩa và cách dùng.",
    summaryEn: "About 50 phrasal verbs appear regularly — memorize meanings and usage.",
    rules: [
      { vi: "look after = chăm sóc; look up = tra cứu; look forward to = mong đợi", en: "look after = take care; look up = search; look forward to = anticipate" },
      { vi: "give up = từ bỏ; turn down = từ chối; put off = trì hoãn", en: "give up = quit; turn down = reject; put off = postpone" },
      { vi: "find out = phát hiện; carry out = thực hiện; take after = giống ai", en: "find out = discover; carry out = perform; take after = resemble" },
      { vi: "break down = hỏng; break up = chia tay; break out = bùng phát", en: "break down = stop working; break up = end relationship; break out = erupt" },
    ],
    examples: [
      { en: "I'm looking forward to hearing from you.", vi: "Tôi mong nhận được tin từ bạn." },
      { en: "He takes after his father.", vi: "Anh ấy giống bố." },
    ],
    trapVi: "'look forward to' + Ving (không phải to V). Phân biệt break down/up/out.",
    trapEn: "'look forward to' + Ving (NOT to V). Distinguish break down/up/out.",
  },
  {
    id: "word-form",
    icon: "🔠",
    titleVi: "Word Form (Từ loại)",
    titleEn: "Word Form",
    summaryVi: "Nhận biết hậu tố để chọn đúng N/V/Adj/Adv. Phần này luôn có ~4-5 câu.",
    summaryEn: "Recognize suffixes to pick the right N/V/Adj/Adv. ~4-5 questions per exam.",
    rules: [
      { vi: "Hậu tố danh từ: -tion, -ment, -ness, -ity, -ence, -er, -or, -ist", en: "Noun suffixes: -tion, -ment, -ness, -ity, -ence, -er, -or, -ist" },
      { vi: "Hậu tố tính từ: -ful, -less, -ous, -al, -ive, -able, -ic", en: "Adjective suffixes: -ful, -less, -ous, -al, -ive, -able, -ic" },
      { vi: "Hậu tố trạng từ: -ly (thường dùng); một số bất quy tắc: hard, fast, late", en: "Adverb suffix: -ly (most); irregular: hard, fast, late" },
      { vi: "Hậu tố động từ: -ize, -ify, -en, -ate", en: "Verb suffixes: -ize, -ify, -en, -ate" },
    ],
    examples: [
      { en: "His ___ (decide) surprised everyone. → decision", vi: "Quyết định của anh ấy khiến mọi người ngạc nhiên." },
      { en: "She speaks English ___ (fluent). → fluently", vi: "Cô ấy nói tiếng Anh trôi chảy." },
    ],
    trapVi: "Sau 'be / become / seem / look' dùng tính từ chứ không phải trạng từ.",
    trapEn: "After 'be / become / seem / look' use adjective, not adverb.",
  },
  {
    id: "inversion-emphasis",
    icon: "⚡",
    titleVi: "Đảo ngữ & Câu nhấn mạnh",
    titleEn: "Inversion & Emphatic Structures",
    summaryVi: "Cấu trúc khó - thường xuất hiện trong câu đồng nghĩa hoặc viết lại câu.",
    summaryEn: "Advanced structures — common in synonym or sentence rewriting tasks.",
    rules: [
      { vi: "Never/Rarely/Hardly + trợ động từ + S + V", en: "Never/Rarely/Hardly + auxiliary + S + V" },
      { vi: "Not until + S + V + auxiliary + S + V", en: "Not until + S + V + auxiliary + S + V" },
      { vi: "Only when/by/after + clause, auxiliary + S + V", en: "Only when/by/after + clause, auxiliary + S + V" },
      { vi: "It is/was + emphasized part + that…", en: "It is/was + emphasized part + that…" },
    ],
    examples: [
      { en: "Never have I seen such a beautiful sunset.", vi: "Tôi chưa bao giờ thấy hoàng hôn đẹp đến vậy." },
      { en: "It was John who broke the vase.", vi: "Chính John là người đã làm vỡ bình hoa." },
    ],
    trapVi: "Sau 'No sooner' đi với 'than'; sau 'Hardly' đi với 'when'.",
    trapEn: "'No sooner' pairs with 'than'; 'Hardly' pairs with 'when'.",
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
