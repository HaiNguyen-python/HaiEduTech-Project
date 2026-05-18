// Advanced IELTS grammar structures bank for Grammatical Range & Accuracy (Band 7+).
// Each item gives students a target structure to write a sentence with, mirroring
// the IELTS examiner's expectation of variety + accuracy.

export interface IELTSGrammarItem {
  id: string;
  category: string;
  structure: string;        // The target grammar structure / formula
  meaning: string;          // Vietnamese explanation
  example: string;          // A model Band 7.5+ sentence
  hint?: string;            // Optional prompt to guide the learner
}

export const GRAMMAR_CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All structures" },
  { value: "conditionals", label: "Conditionals" },
  { value: "inversion", label: "Inversion" },
  { value: "cleft", label: "Cleft sentences" },
  { value: "relative", label: "Relative clauses" },
  { value: "participle", label: "Participle clauses" },
  { value: "passive", label: "Passive & causative" },
  { value: "nominalisation", label: "Nominalisation" },
  { value: "comparison", label: "Comparison & contrast" },
  { value: "modals", label: "Modals & hedging" },
  { value: "linking", label: "Linking & cohesion" },
];

export const IELTS_GRAMMAR: IELTSGrammarItem[] = [
  // --- Conditionals ---
  {
    id: "g-cond-mixed",
    category: "conditionals",
    structure: "Mixed conditional: If + past perfect, ... would + V (now)",
    meaning: "Câu điều kiện hỗn hợp — giả thiết quá khứ ảnh hưởng hiện tại.",
    example: "If governments **had invested** more in renewables in the 1990s, cities **would not be suffering** such severe air pollution today.",
    hint: "Write about a past decision still shaping today's society.",
  },
  {
    id: "g-cond-were-to",
    category: "conditionals",
    structure: "Were + S + to V, ... would ... (formal 2nd conditional)",
    meaning: "Câu điều kiện loại 2 trang trọng dùng 'were to'.",
    example: "**Were** the government **to impose** higher fuel taxes, citizens would inevitably switch to public transport.",
  },
  {
    id: "g-cond-unless",
    category: "conditionals",
    structure: "Unless + present, ... will/may + V",
    meaning: "Trừ khi ... — tương đương 'if not'.",
    example: "**Unless** stricter laws **are introduced**, plastic waste will continue to choke marine ecosystems.",
  },
  {
    id: "g-cond-provided",
    category: "conditionals",
    structure: "Provided that / As long as + clause",
    meaning: "Miễn là / với điều kiện rằng.",
    example: "Remote work can boost productivity, **provided that** employers establish clear performance metrics.",
  },

  // --- Inversion ---
  {
    id: "g-inv-not-only",
    category: "inversion",
    structure: "Not only + aux + S + V, but S + also + V",
    meaning: "Đảo ngữ với 'not only ... but also'.",
    example: "**Not only does** online learning reduce commuting costs, **but** it **also** offers unparalleled flexibility.",
  },
  {
    id: "g-inv-rarely",
    category: "inversion",
    structure: "Rarely / Seldom / Never + aux + S + V",
    meaning: "Đảo ngữ với trạng từ phủ định để nhấn mạnh.",
    example: "**Rarely have** policymakers faced a challenge as complex as climate change.",
  },
  {
    id: "g-inv-no-sooner",
    category: "inversion",
    structure: "No sooner + had + S + V3, than + S + V2",
    meaning: "Vừa mới ... thì ...",
    example: "**No sooner had** the new subway line opened **than** road congestion noticeably eased.",
  },
  {
    id: "g-inv-only-when",
    category: "inversion",
    structure: "Only when + clause + aux + S + V",
    meaning: "Chỉ khi ...",
    example: "**Only when** governments collaborate internationally **will** carbon emissions decline meaningfully.",
  },
  {
    id: "g-inv-little",
    category: "inversion",
    structure: "Little + aux + S + V (with verbs of awareness)",
    meaning: "Đảo ngữ với 'little' = hầu như không.",
    example: "**Little do** young people realise the long-term impact of excessive screen time on cognition.",
  },

  // --- Cleft ---
  {
    id: "g-cleft-it-that",
    category: "cleft",
    structure: "It is/was + X + that/who + clause",
    meaning: "Câu chẻ nhấn mạnh chủ thể/tân ngữ.",
    example: "**It is** affordable childcare **that** most effectively encourages women to remain in the workforce.",
  },
  {
    id: "g-cleft-what",
    category: "cleft",
    structure: "What + clause + is/was + X",
    meaning: "Câu chẻ với 'what' để nhấn mạnh ý.",
    example: "**What** developing economies urgently need **is** sustained investment in vocational education.",
  },
  {
    id: "g-cleft-all",
    category: "cleft",
    structure: "All (that) + clause + is + X",
    meaning: "Tất cả những gì ... chính là ...",
    example: "**All that** is required to curb obesity **is** a coordinated effort between schools and parents.",
  },
  {
    id: "g-cleft-reason",
    category: "cleft",
    structure: "The reason (why) + clause + is that + clause",
    meaning: "Lý do ... là vì ...",
    example: "**The reason why** young graduates emigrate **is that** domestic salaries lag far behind international standards.",
  },

  // --- Relative clauses ---
  {
    id: "g-rel-which-summative",
    category: "relative",
    structure: ", which + clause (summative — refers to whole previous clause)",
    meaning: "Mệnh đề quan hệ tổng kết — 'which' thay cho cả mệnh đề trước.",
    example: "Many cities have introduced congestion charges, **which has** dramatically improved air quality.",
  },
  {
    id: "g-rel-prep-which",
    category: "relative",
    structure: "Preposition + which / whom + clause",
    meaning: "Giới từ + which/whom (trang trọng).",
    example: "The neighbourhoods **in which** low-income families live often lack basic recreational facilities.",
  },
  {
    id: "g-rel-whose",
    category: "relative",
    structure: "..., whose + N + V",
    meaning: "Sở hữu cách trong mệnh đề quan hệ.",
    example: "Students **whose** parents read to them daily tend to develop stronger literacy skills.",
  },
  {
    id: "g-rel-reduced",
    category: "relative",
    structure: "N + V-ing / V-ed (reduced relative clause)",
    meaning: "Rút gọn mệnh đề quan hệ bằng V-ing / V-ed.",
    example: "Policies **promoting** cycling, **introduced** in the 2010s, have reshaped urban mobility.",
  },

  // --- Participle clauses ---
  {
    id: "g-part-present",
    category: "participle",
    structure: "V-ing clause, main clause",
    meaning: "Mệnh đề phân từ hiện tại làm trạng ngữ.",
    example: "**Recognising** the value of bilingual education, many governments now fund language immersion programmes.",
  },
  {
    id: "g-part-past",
    category: "participle",
    structure: "V-ed clause, main clause",
    meaning: "Mệnh đề phân từ quá khứ (bị động) làm trạng ngữ.",
    example: "**Faced with** rising sea levels, coastal cities are investing heavily in flood defences.",
  },
  {
    id: "g-part-having",
    category: "participle",
    structure: "Having + V3, main clause",
    meaning: "Diễn tả hành động hoàn thành trước hành động chính.",
    example: "**Having weighed** the evidence, I firmly believe that universities should remain tuition-free.",
  },

  // --- Passive & causative ---
  {
    id: "g-pass-impersonal",
    category: "passive",
    structure: "It is widely believed/argued/claimed that + clause",
    meaning: "Câu bị động vô nhân xưng — phong cách học thuật.",
    example: "**It is widely argued that** automation will eliminate millions of low-skilled jobs within a decade.",
  },
  {
    id: "g-pass-causative",
    category: "passive",
    structure: "have / get + O + V3",
    meaning: "Câu sai khiến bị động.",
    example: "Many companies now **have** their internal systems **audited** quarterly to detect cyber-vulnerabilities.",
  },
  {
    id: "g-pass-future",
    category: "passive",
    structure: "will be / is going to be + V3",
    meaning: "Bị động ở tương lai để mô tả xu hướng.",
    example: "Renewable energy **will be adopted** on an unprecedented scale by 2040.",
  },

  // --- Nominalisation ---
  {
    id: "g-nom-the-fact",
    category: "nominalisation",
    structure: "The N of X (nominalising a verb/idea)",
    meaning: "Danh từ hoá để tạo phong cách học thuật.",
    example: "**The implementation of** congestion charging has significantly reduced traffic in central London.",
  },
  {
    id: "g-nom-failure-to",
    category: "nominalisation",
    structure: "The failure / ability / tendency + to V",
    meaning: "Danh từ hoá với 'to V'.",
    example: "**The failure to invest** in primary healthcare disproportionately harms rural communities.",
  },

  // --- Comparison & contrast ---
  {
    id: "g-comp-the-more",
    category: "comparison",
    structure: "The + comparative ..., the + comparative ...",
    meaning: "Càng ... càng ...",
    example: "**The greater** the access to early-childhood education, **the higher** the long-term earnings of citizens.",
  },
  {
    id: "g-comp-whereas",
    category: "comparison",
    structure: "Whereas / While + clause, clause",
    meaning: "Trong khi ... — đối chiếu hai ý.",
    example: "**Whereas** older generations prized job security, millennials tend to prioritise meaningful work.",
  },
  {
    id: "g-comp-far-from",
    category: "comparison",
    structure: "Far from + V-ing, S + V",
    meaning: "Hoàn toàn không phải ... mà thực ra ...",
    example: "**Far from being** a luxury, public libraries are vital community hubs.",
  },

  // --- Modals & hedging ---
  {
    id: "g-mod-may-well",
    category: "modals",
    structure: "S + may/might well + V",
    meaning: "Rất có thể ... — hedging trang trọng.",
    example: "Artificial intelligence **may well transform** medical diagnostics within the next decade.",
  },
  {
    id: "g-mod-tend-to",
    category: "modals",
    structure: "S + tend(s) to + V",
    meaning: "Có xu hướng ... — diễn đạt nhẹ nhàng.",
    example: "Children raised in bilingual households **tend to demonstrate** stronger cognitive flexibility.",
  },
  {
    id: "g-mod-be-likely",
    category: "modals",
    structure: "S + is/are (un)likely + to V",
    meaning: "Có/không khả năng ...",
    example: "Workers without digital skills **are likely to face** diminishing employment opportunities.",
  },

  // --- Linking & cohesion ---
  {
    id: "g-link-not-merely",
    category: "linking",
    structure: "Not merely ... but rather ...",
    meaning: "Không chỉ ... mà còn ...",
    example: "Education should **not merely** transmit facts **but rather** cultivate critical thinking.",
  },
  {
    id: "g-link-given-that",
    category: "linking",
    structure: "Given that + clause, main clause",
    meaning: "Xét thấy rằng ...",
    example: "**Given that** urban populations continue to swell, investment in mass transit is indispensable.",
  },
  {
    id: "g-link-insofar",
    category: "linking",
    structure: "Insofar as + clause",
    meaning: "Trong chừng mực mà ...",
    example: "Social media is beneficial **insofar as** it fosters genuine human connection rather than passive scrolling.",
  },
];
