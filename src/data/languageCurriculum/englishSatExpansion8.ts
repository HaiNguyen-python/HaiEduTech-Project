// SAT Expansion 8 - Fills the remaining gaps in the 30-week curriculum so every
// week links to at least one concrete lesson. Adds: SVA traps, modifier placement,
// pronoun clarity, vocab set 3, mock debrief framework, targeted weakness drilling,
// test-day psychology, hard R&W / Math mixed sets, simulation peak, taper week.
import type { LanguageModule } from "./types";

const v = (word: string, meaning: string, meaningEn: string, example: string) => ({
  word,
  partOfSpeech: "noun",
  meaning,
  meaningEn,
  example,
  exampleEn: example,
});

export const satExpansionModules8: LanguageModule[] = [
  // ── Module A: Conventions deep-dive (Weeks 5 & 19) ─────────────────
  {
    id: "sat-conventions-deepdive",
    title: "Standard English Conventions - Deep Dive",
    titleEn: "Standard English Conventions - Deep Dive",
    icon: "✏️",
    color: "from-rose-500 to-orange-500",
    description: "Bẫy SVA, modifier sai vị trí và đại từ mơ hồ - 3 lỗi mất điểm phổ biến nhất.",
    descriptionEn: "SVA traps, misplaced modifiers, and ambiguous pronouns - the 3 highest-frequency Conventions losses.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sva-traps",
        title: "SVA Traps - Khi chủ ngữ ‘ẩn mình’",
        titleEn: "SVA Traps - When the Subject Hides",
        level: 3,
        difficulty: "intermediate",
        theory:
          "SAT yêu thích 4 dạng bẫy SVA:\n1) Cụm chen giữa: 'The list of supplies (was/were) lost' - chủ ngữ là 'list'.\n2) Either/neither/none/each + of: luôn coi như SỐ ÍT.\n3) Đảo ngữ: 'There (is/are) three reasons' - động từ theo 'reasons'.\n4) Danh động từ làm chủ ngữ: 'Studying every night helps' - luôn SỐ ÍT.\n\nQuy trình 3 bước: gạch cụm prep, khoanh subject thật, gắn mũi tên tới động từ.",
        theoryEn:
          "The SAT loves 4 SVA traps:\n1) Inserted phrase: 'The list of supplies (was/were) lost' - subject is 'list'.\n2) Either/neither/none/each + of: always SINGULAR.\n3) Inverted order: 'There (is/are) three reasons' - verb agrees with 'reasons'.\n4) Gerund subject: 'Studying every night helps' - always SINGULAR.\n\n3-step routine: cross out prep phrases, circle the real subject, draw an arrow to the verb.",
        proTips: [
          "‘Each / every / one of’ KHÔNG bao giờ đi với động từ số nhiều.",
          "Khi thấy ‘along with / as well as / together with’ - bỏ qua, không đổi số chủ ngữ.",
          "Đọc to câu trước khi chọn - tai sẽ phát hiện sai trước mắt."
        ],
        proTipsEn: [
          "‘Each / every / one of’ NEVER takes a plural verb.",
          "‘Along with / as well as / together with’ - ignore them; subject number doesn't change.",
          "Read the sentence aloud before answering - the ear catches what the eye misses."
        ],
        vocabulary: [
          v("agreement", "sự hoà hợp", "concord between subject and verb", "Subject-verb agreement is tested often."),
          v("subject", "chủ ngữ", "the doer of the action", "Find the real subject first."),
          v("verb", "động từ", "the action word", "The verb must match the subject."),
          v("clause", "mệnh đề", "a subject + verb unit", "Every clause needs agreement."),
          v("gerund", "danh động từ", "an -ing form acting as noun", "A gerund subject is singular."),
          v("inversion", "đảo ngữ", "verb-before-subject order", "Inversion can hide the subject."),
          v("singular", "số ít", "one of something", "Each is always singular."),
          v("plural", "số nhiều", "more than one", "Most -s nouns are plural."),
          v("trap", "bẫy đáp án", "a tempting wrong choice", "SAT writers love SVA traps."),
          v("prepositional phrase", "cụm giới từ", "of/in/on + noun", "Prepositional phrases hide the subject.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn động từ đúng:",
            instructionEn: "Choose the correct verb:",
            sentences: [
              { text: "The list of supplies ___ (was / were) misplaced.", textEn: "The list of supplies ___ (was / were) misplaced.", answer: "was" },
              { text: "Each of the runners ___ (has / have) a number.", textEn: "Each of the runners ___ (has / have) a number.", answer: "has" },
              { text: "There ___ (is / are) several reasons to revise.", textEn: "There ___ (is / are) several reasons to revise.", answer: "are" },
              { text: "Studying late ___ (helps / help) memory consolidation.", textEn: "Studying late ___ (helps / help) memory consolidation.", answer: "helps" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which subject takes a SINGULAR verb?",
            options: ["The students", "Each of the players", "Many books", "Several teachers"],
            answer: 1,
            explanation: "‘Each of …’ is always singular regardless of the noun that follows.",
          },
          {
            question: "In ‘There ___ five reasons’, the verb agrees with…",
            options: ["There", "five", "reasons", "the listener"],
            answer: 2,
            explanation: "In inverted order, the verb agrees with the real subject that follows it.",
          }
        ]
      },
      {
        id: "modifier-placement",
        title: "Modifier Placement - Mũi tên ngắn nhất",
        titleEn: "Modifier Placement - The Shortest Arrow",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Modifier (cụm bổ nghĩa) PHẢI đứng cạnh danh từ nó mô tả. SAT thích thử bằng câu mở đầu bằng -ing/-ed: 'Walking down the street, the trees looked golden.' → SAI: cây không tự đi bộ.\n\nKỹ thuật mũi tên: kẻ mũi tên TỪ modifier ĐẾN danh từ. Nếu mũi tên dài hoặc trỏ sai danh từ → câu sai. Sửa: đổi chủ ngữ chính ngay sau dấu phẩy.",
        theoryEn:
          "A modifier must sit next to the noun it describes. SAT favours sentences opening with -ing/-ed: 'Walking down the street, the trees looked golden.' → WRONG: trees don't walk.\n\nArrow technique: draw an arrow FROM the modifier TO the noun. A long arrow or one pointing to the wrong noun = error. Fix: place the right subject immediately after the comma.",
        proTips: [
          "Câu bắt đầu bằng -ing/-ed → chủ ngữ chính NGAY sau dấu phẩy phải là người/vật làm hành động đó.",
          "Đáp án dài hơn không phải lúc nào cũng sai - quan trọng là mũi tên đúng.",
          "Nếu modifier không sửa được vì lựa chọn ép, hãy xem có thể đổi nó thành mệnh đề ‘When/After’ không."
        ],
        proTipsEn: [
          "Sentences starting with -ing/-ed → the subject right after the comma must be the doer.",
          "Longer answers aren't automatically wrong - the arrow must just be correct.",
          "If the modifier can't be fixed, look for a choice that turns it into a 'When/After' clause."
        ],
        vocabulary: [
          v("modifier", "cụm bổ nghĩa", "a phrase describing a noun", "Place the modifier next to its noun."),
          v("dangling", "mơ hồ, lủng lẳng", "unattached to a noun", "A dangling modifier confuses the reader."),
          v("participle", "phân từ", "an -ing or -ed form", "Participles often start modifiers."),
          v("subject", "chủ ngữ", "the doer of the action", "The subject must follow the comma."),
          v("clause", "mệnh đề", "subject + verb unit", "A modifier can become a clause."),
          v("comma", "dấu phẩy", "punctuation mark", "Commas separate the modifier."),
          v("placement", "vị trí đặt", "the spot in the sentence", "Placement decides meaning."),
          v("ambiguity", "tính mơ hồ", "unclear reference", "Avoid ambiguity in modifiers."),
          v("introductory phrase", "cụm mở đầu", "phrase before the main clause", "Introductory phrases need a clear subject."),
          v("logic", "logic", "the meaning makes sense", "Test logic before grammar.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn chủ ngữ đúng để hoàn thành câu:",
            instructionEn: "Choose the correct subject to complete the sentence:",
            sentences: [
              { text: "Walking down the street, ___ noticed the golden trees.", textEn: "Walking down the street, ___ noticed the golden trees.", answer: "I" },
              { text: "Exhausted after the test, ___ went straight to bed.", textEn: "Exhausted after the test, ___ went straight to bed.", answer: "she" },
              { text: "Built in 1920, ___ still stands today.", textEn: "Built in 1920, ___ still stands today.", answer: "the bridge" },
              { text: "Hoping to score 1500, ___ practiced every weekend.", textEn: "Hoping to score 1500, ___ practiced every weekend.", answer: "Lan" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which sentence has a CORRECTLY placed modifier?",
            options: [
              "Walking to school, the rain started.",
              "Walking to school, I felt the rain start.",
              "The rain started walking to school.",
              "Walking the rain started to school."
            ],
            answer: 1,
            explanation: "‘I’ is the doer of ‘walking’; the arrow from the modifier to the subject is short and logical.",
          }
        ]
      },
      {
        id: "pronoun-clarity",
        title: "Pronoun Clarity - Mỗi đại từ một chủ nhân",
        titleEn: "Pronoun Clarity - One Pronoun, One Owner",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Mỗi đại từ (it, they, this, that, which) PHẢI chỉ rõ MỘT danh từ duy nhất. SAT đánh sập bạn ở 3 dạng:\n1) Không có tiền tố (antecedent): 'On the website, they say…' → ‘they’ là ai?\n2) Có 2+ tiền tố cùng số: 'Lan told Mai that she was wrong' → ‘she’ là ai?\n3) Sai số/giống: 'Each student brought their book' → SAT vẫn coi là sai (phải ‘his or her’ hoặc viết lại).\n\nGiải pháp: thay đại từ bằng danh từ cụ thể nếu nghi ngờ.",
        theoryEn:
          "Every pronoun (it, they, this, that, which) must point to ONE clear noun. The SAT attacks 3 patterns:\n1) No antecedent: 'On the website, they say…' → who is ‘they’?\n2) Two same-number antecedents: 'Lan told Mai that she was wrong' → who is ‘she’?\n3) Wrong number/gender: 'Each student brought their book' → SAT still flags this; rewrite or use ‘his or her’.\n\nFix: replace the pronoun with the specific noun whenever in doubt.",
        proTips: [
          "Nếu phải dừng lại để hỏi ‘ai/cái gì?’ - đáp án đó SAI.",
          "‘This’ và ‘that’ đứng một mình thường mơ hồ - SAT thích đặt bẫy ‘This shows…’.",
          "Đáp án dài hơn nhưng nêu rõ tên thường an toàn hơn."
        ],
        proTipsEn: [
          "If you must pause to ask ‘who/what?’ the choice is WRONG.",
          "Stand-alone ‘This’ and ‘That’ are usually ambiguous - watch for ‘This shows…’ traps.",
          "A longer choice that names the noun is usually safer."
        ],
        vocabulary: [
          v("pronoun", "đại từ", "word replacing a noun", "Every pronoun needs a clear owner."),
          v("antecedent", "tiền tố", "the noun a pronoun refers to", "The antecedent must be unambiguous."),
          v("ambiguity", "mơ hồ", "more than one possible owner", "SAT punishes pronoun ambiguity."),
          v("reference", "sự quy chiếu", "what a pronoun points to", "Check pronoun reference twice."),
          v("number", "số (ít/nhiều)", "singular vs plural", "Number must match."),
          v("gender", "giống", "he/she/they", "Gender must match the antecedent."),
          v("clarity", "tính rõ ràng", "clear meaning", "Clarity beats brevity here."),
          v("noun", "danh từ", "person/place/thing", "Pronouns replace nouns."),
          v("rephrase", "viết lại", "say again differently", "Rephrase to fix ambiguity."),
          v("specific", "cụ thể", "exact, named", "Choose the specific answer.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Sửa câu bằng cách điền danh từ rõ ràng:",
            instructionEn: "Fix the sentence by inserting a clear noun:",
            sentences: [
              { text: "Lan told Mai that ___ had to leave early.", textEn: "Lan told Mai that ___ had to leave early.", answer: "Lan" },
              { text: "On the website, ___ describe the new policy.", textEn: "On the website, ___ describe the new policy.", answer: "the editors" },
              { text: "The book has many maps; ___ are very detailed.", textEn: "The book has many maps; ___ are very detailed.", answer: "the maps" },
              { text: "Each student must bring ___ own laptop.", textEn: "Each student must bring ___ own laptop.", answer: "his or her" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which sentence has an UNCLEAR pronoun?",
            options: [
              "Lan told Mai that Mai had to leave.",
              "Lan told Mai that she had to leave.",
              "Lan, who was tired, left early.",
              "Mai left because she felt tired."
            ],
            answer: 1,
            explanation: "‘She’ could refer to Lan or Mai - that's the ambiguity SAT flags.",
          }
        ]
      }
    ]
  },

  // ── Module B: Vocabulary Set 3 (Week 15) ───────────────────────────
  {
    id: "sat-vocab-set3-module",
    title: "SAT High-Frequency Vocabulary - Set 3",
    titleEn: "SAT High-Frequency Vocabulary - Set 3",
    icon: "📚",
    color: "from-violet-500 to-fuchsia-600",
    description: "60 từ vựng SAT cao tần đợt 3 với collocation và bẫy nghĩa.",
    descriptionEn: "Set 3 of high-frequency SAT vocabulary with collocations and meaning traps.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-vocab-set3",
        title: "Vocab Set 3 - Academic & Abstract",
        titleEn: "Vocab Set 3 - Academic & Abstract",
        level: 4,
        difficulty: "advanced",
        theory:
          "Set 3 tập trung 60 từ học thuật xuất hiện trong Words-in-Context level 4–5. Mỗi từ học theo công thức 3 lớp:\n1) Nghĩa cốt lõi (1 dòng).\n2) Collocation phổ biến (vd: ‘mitigate the risk’, ‘reconcile differences’).\n3) Bẫy nghĩa: từ trông giống nhưng khác nghĩa (vd: ‘candid’ ≠ ‘candied’).\n\nLuyện ‘predict-then-pick’: đọc câu, tự nói nghĩa cần thay vào, mới nhìn 4 đáp án.",
        theoryEn:
          "Set 3 covers 60 academic words seen on level 4–5 Words-in-Context items. Learn each word in 3 layers:\n1) Core meaning (one line).\n2) Common collocation (e.g. ‘mitigate the risk’, ‘reconcile differences’).\n3) Meaning trap: lookalikes that differ (e.g. ‘candid’ ≠ ‘candied’).\n\nDrill ‘predict-then-pick’: read the sentence, say the needed meaning out loud, THEN look at the 4 choices.",
        proTips: [
          "Học theo cụm collocation, không học từ rời rạc.",
          "Mỗi từ viết 1 câu THẬT của bản thân - nhớ lâu gấp 3.",
          "Khi không chắc, loại đáp án có nghĩa quá tích cực hoặc quá tiêu cực so với câu gốc."
        ],
        proTipsEn: [
          "Learn in collocations, not isolated words.",
          "Write ONE personal sentence per word - retention triples.",
          "When unsure, eliminate choices whose tone is much more positive or negative than the source sentence."
        ],
        vocabulary: [
          v("mitigate", "làm giảm nhẹ", "to make less severe", "Engineers mitigate flood risk."),
          v("reconcile", "hoà giải", "to make consistent", "Reconcile the two viewpoints."),
          v("candid", "thẳng thắn", "honest, frank", "Her candid feedback helped."),
          v("austere", "khắc khổ", "stern, plain", "An austere lifestyle."),
          v("nuanced", "có sắc thái tinh tế", "subtly varied", "A nuanced argument."),
          v("paradigm", "mô hình", "a model or pattern", "A paradigm shift in physics."),
          v("scrutinize", "soi xét kỹ", "to examine closely", "Scrutinize the data."),
          v("ambivalent", "lưỡng lự", "having mixed feelings", "Ambivalent about moving."),
          v("ephemeral", "phù du", "lasting briefly", "Fame is often ephemeral."),
          v("pragmatic", "thực dụng", "practical", "A pragmatic decision."),
          v("compelling", "thuyết phục", "convincingly forceful", "Compelling evidence."),
          v("undermine", "làm suy yếu", "to weaken", "Rumours undermine trust."),
          v("substantiate", "chứng minh", "to back up with evidence", "Substantiate the claim."),
          v("equivocal", "mơ hồ", "open to interpretation", "An equivocal answer.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ phù hợp nhất:",
            instructionEn: "Pick the best word:",
            sentences: [
              { text: "The new policy aims to ___ the impact of layoffs.", textEn: "The new policy aims to ___ the impact of layoffs.", answer: "mitigate" },
              { text: "Her ___ feedback helped the team improve.", textEn: "Her ___ feedback helped the team improve.", answer: "candid" },
              { text: "The judge asked the witness to ___ the claim with evidence.", textEn: "The judge asked the witness to ___ the claim with evidence.", answer: "substantiate" },
              { text: "Her tone was ___ - neither praising nor criticizing.", textEn: "Her tone was ___ - neither praising nor criticizing.", answer: "equivocal" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which word means ‘to make less severe’?",
            options: ["mitigate", "magnify", "merit", "muddle"],
            answer: 0,
            explanation: "Mitigate = reduce the severity/intensity of something.",
          },
          {
            question: "‘Ephemeral’ most nearly means…",
            options: ["lasting briefly", "permanent", "powerful", "expensive"],
            answer: 0,
            explanation: "Ephemeral describes something that lasts for a very short time.",
          }
        ]
      }
    ]
  },

  // ── Module C: Mock & Mastery System (Weeks 16, 21, 22, 24, 27, 28) ──
  {
    id: "sat-mastery-system",
    title: "Mock Debrief & Mastery System",
    titleEn: "Mock Debrief & Mastery System",
    icon: "🎯",
    color: "from-amber-500 to-rose-600",
    description: "Quy trình debrief mock, drill điểm yếu cá nhân và hard-only practice.",
    descriptionEn: "Mock-debrief routine, personalized weakness drilling, and hard-only practice.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-mock-debrief-framework",
        title: "Mock Debrief Framework - 4 lăng kính",
        titleEn: "Mock Debrief Framework - 4 Lenses",
        level: 4,
        difficulty: "advanced",
        theory:
          "Mỗi mock cần debrief qua 4 lăng kính:\n1) Score - chia theo skill (Algebra, Geometry, Words-in-Context…), không chỉ tổng điểm.\n2) Time - câu nào quá 90s? Module nào hết giờ?\n3) Errors - phân loại 3 nhóm: Don't-Know / Knew-Missed / Careless.\n4) Emotion - đoạn nào căng thẳng? Có ‘mind blank’ không?\n\nKết quả debrief = 1 trang A4 với top 3 weakness + kế hoạch 7 ngày tiếp theo.",
        theoryEn:
          "Every mock deserves a 4-lens debrief:\n1) Score - break down by skill (Algebra, Geometry, Words-in-Context…), not just the total.\n2) Time - which questions exceeded 90s? Which module ran out?\n3) Errors - classify into 3 buckets: Don't-Know / Knew-Missed / Careless.\n4) Emotion - where did stress spike? Any ‘mind blank’ moments?\n\nThe debrief output = a single A4 page with top 3 weaknesses + the next 7-day plan.",
        proTips: [
          "Debrief PHẢI làm trong 24h sau mock - bộ nhớ còn nóng.",
          "Nhóm Careless ưu tiên fix trước nhóm Don't-Know - ROI cao hơn nhiều.",
          "Nếu cùng 1 lỗi xuất hiện ở 2 mock liên tiếp → đó là leak phải xử lý ngay."
        ],
        proTipsEn: [
          "Debrief MUST happen within 24h while memory is fresh.",
          "Fix Careless misses before Don't-Know misses - higher ROI.",
          "If the same error appears in 2 consecutive mocks → it's a leak; fix it now."
        ],
        vocabulary: [
          v("debrief", "rút kinh nghiệm", "post-event review", "Debrief every mock you take."),
          v("breakdown", "phân tích chi tiết", "detailed split", "A score breakdown by skill."),
          v("leak", "lỗ hổng kéo dài", "a recurring weakness", "Plug your top 3 leaks first."),
          v("ROI", "lợi tức đầu tư", "return on investment", "Careless fixes have high ROI."),
          v("baseline", "mức nền", "starting reference", "Mock #1 sets the baseline."),
          v("trend", "xu hướng", "direction over time", "Track the score trend."),
          v("reflection", "suy ngẫm", "personal review", "Write a 1-page reflection."),
          v("metric", "chỉ số đo", "measurement", "Time-per-question is a key metric."),
          v("audit", "rà soát kỹ", "thorough check", "Audit the error log weekly."),
          v("plan", "kế hoạch", "step-by-step path", "Always end debrief with a plan.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành quy trình debrief:",
            instructionEn: "Complete the debrief routine:",
            sentences: [
              { text: "A mock debrief uses 4 lenses: Score, Time, Errors, and ___.", textEn: "A mock debrief uses 4 lenses: Score, Time, Errors, and ___.", answer: "Emotion" },
              { text: "The 3 error buckets are Don't-Know, Knew-Missed, and ___.", textEn: "The 3 error buckets are Don't-Know, Knew-Missed, and ___.", answer: "Careless" },
              { text: "Debrief must happen within ___ hours of finishing the mock.", textEn: "Debrief must happen within ___ hours of finishing the mock.", answer: "24" },
              { text: "Fix ___ misses first because they have the highest ROI.", textEn: "Fix ___ misses first because they have the highest ROI.", answer: "Careless" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which lens is MISSING from a complete mock debrief: Score, Time, Errors, ___?",
            options: ["Emotion", "Vocabulary", "Sleep", "Lighting"],
            answer: 0,
            explanation: "Emotion (where stress or mind-blank happened) is the 4th lens.",
          }
        ]
      },
      {
        id: "sat-targeted-weakness-drill",
        title: "Targeted Weakness Drilling - Playlist cá nhân hoá",
        titleEn: "Targeted Weakness Drilling - Personalized Playlist",
        level: 4,
        difficulty: "advanced",
        theory:
          "Sau debrief, mỗi học sinh nhận một playlist gồm: 3 bài học lý thuyết + 60 câu drill chính xác top 3 weakness. Quy tắc 20-20-20: cứ mỗi 20 câu, dừng lại, ghi accuracy, đối chiếu lý do sai.\n\nMục tiêu: accuracy của weakness area tăng ≥ 15% trong 1 tuần. Nếu không đạt - đổi giáo viên/phương pháp tiếp cận, không drill thêm câu.",
        theoryEn:
          "After the debrief, each student gets a playlist: 3 theory lessons + 60 drill questions targeting the top 3 weaknesses. The 20-20-20 rule: every 20 questions, pause, log accuracy, and review why each error happened.\n\nTarget: weakness-area accuracy up ≥ 15% in one week. If not achieved - change teacher or approach, don't just drill more.",
        proTips: [
          "Mỗi 20 câu DỪNG LẠI - không drill liên tục 60 câu mà không phân tích.",
          "Học sinh tự chọn 1 trong 3 weakness để ‘teach back’ cho bạn cùng lớp - nhớ gấp đôi.",
          "Nếu accuracy không tăng sau 60 câu → vấn đề là LÝ THUYẾT, không phải LƯỢNG CÂU."
        ],
        proTipsEn: [
          "PAUSE every 20 questions - don't drill 60 straight without analysis.",
          "Have the student ‘teach back’ one of the 3 weaknesses - retention doubles.",
          "If accuracy doesn't rise after 60 items → the gap is THEORY, not VOLUME."
        ],
        vocabulary: [
          v("playlist", "danh sách bài tập", "ordered set of lessons", "A 3-lesson playlist per week."),
          v("weakness", "điểm yếu", "underperforming skill", "Identify your top 3 weaknesses."),
          v("accuracy", "độ chính xác", "% correct", "Aim for ≥ 15% accuracy gain."),
          v("personalized", "cá nhân hoá", "tailored to one student", "A personalized plan beats a generic one."),
          v("playlist", "danh sách bài tập", "ordered set of lessons", "Stick to the playlist for a week."),
          v("targeted", "có mục tiêu", "focused on one gap", "Targeted drills work fastest."),
          v("teach-back", "dạy lại", "re-explain to peers", "Teach-back doubles retention."),
          v("benchmark", "mốc chuẩn", "reference target", "Set a 15% benchmark."),
          v("threshold", "ngưỡng", "cut-off point", "Cross the accuracy threshold."),
          v("review", "ôn tập", "look back over", "Review every miss.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Each playlist targets the top ___ weaknesses from the latest mock.", textEn: "Each playlist targets the top ___ weaknesses from the latest mock.", answer: "3" },
              { text: "Pause every ___ questions to log accuracy.", textEn: "Pause every ___ questions to log accuracy.", answer: "20" },
              { text: "The accuracy target is at least a ___% gain in one week.", textEn: "The accuracy target is at least a ___% gain in one week.", answer: "15" }
            ]
          }
        ],
        quiz: [
          {
            question: "If 60 drill questions don't raise accuracy, the problem is most likely…",
            options: ["Need more questions", "Theory gap", "Bad lighting", "Slow internet"],
            answer: 1,
            explanation: "Volume can't fix a missing concept - return to theory before drilling more.",
          }
        ]
      },
      {
        id: "sat-hard-rw-mixed",
        title: "Hard-Only R&W Mixed Set",
        titleEn: "Hard-Only R&W Mixed Set",
        level: 5,
        difficulty: "advanced",
        theory:
          "Sau Phase 3, học sinh đủ trình độ làm bài 80 câu R&W chỉ chọn câu Hard từ Bluebook. Trộn đều: Cross-Text, Inference cao cấp, Rhetorical Synthesis level 5, Transitions ‘double-trap’.\n\nQuy tắc: làm 4 đợt 20 câu, nghỉ 5 phút giữa mỗi đợt. Sau mỗi đợt phải tag mỗi câu sai bằng 1 trong 6 trap pattern (word-trap / opposite / half-right / extreme / out-of-scope / true-but-irrelevant).",
        theoryEn:
          "After Phase 3, students are ready for an 80-question Hard-only R&W set drawn from Bluebook. Mix evenly: Cross-Text, advanced Inference, level-5 Rhetorical Synthesis, ‘double-trap’ Transitions.\n\nRule: 4 waves of 20 questions, 5-min break between waves. After each wave, tag every miss with one of the 6 trap patterns (word-trap / opposite / half-right / extreme / out-of-scope / true-but-irrelevant).",
        proTips: [
          "Mục tiêu accuracy ≥ 70% - không cần 100%, vì đây là câu Hard.",
          "Re-do tất cả câu sai trong vòng 48 giờ - nếu vẫn sai lần 2, đó là LEAK thật sự.",
          "Tag trap pattern là bước quan trọng nhất, không phải số lượng câu làm."
        ],
        proTipsEn: [
          "Target accuracy ≥ 70% - perfection is not the goal on Hard items.",
          "Re-do every miss within 48h - a second miss confirms a real LEAK.",
          "Tagging the trap pattern matters more than the raw question count."
        ],
        vocabulary: [
          v("hard-only", "chỉ câu khó", "filter for hardest items", "Hard-only sets sharpen ceiling."),
          v("trap pattern", "kiểu bẫy", "category of wrong-answer lure", "Six trap patterns dominate the SAT."),
          v("re-do", "làm lại", "retry a problem", "Re-do misses within 48 hours."),
          v("double-trap", "bẫy kép", "two distractors at once", "Transitions love double-traps."),
          v("ceiling", "trần điểm", "the top of the score range", "Hard practice raises your ceiling."),
          v("wave", "đợt", "a batch of questions", "Run four 20-question waves."),
          v("recovery", "hồi phục", "rest between sets", "Build in 5-min recovery breaks."),
          v("filter", "lọc câu hỏi", "narrow the question pool", "Filter Bluebook to Hard-only."),
          v("verify", "xác minh", "confirm correctness", "Verify each tagged trap."),
          v("trend", "xu hướng", "direction over sessions", "Track accuracy trend across waves.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền số/từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "The Hard-only R&W set has ___ questions divided into 4 waves.", textEn: "The Hard-only R&W set has ___ questions divided into 4 waves.", answer: "80" },
              { text: "There are ___ trap patterns to tag misses with.", textEn: "There are ___ trap patterns to tag misses with.", answer: "6" },
              { text: "Re-do every miss within ___ hours.", textEn: "Re-do every miss within ___ hours.", answer: "48" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which trap describes an answer that REPEATS exact words from the passage but answers the wrong question?",
            options: ["word-trap", "extreme", "out-of-scope", "half-right"],
            answer: 0,
            explanation: "Word-trap = verbatim repetition that lures students into a wrong choice.",
          }
        ]
      },
      {
        id: "sat-hard-math-mixed",
        title: "Hard-Only Math Mixed Set",
        titleEn: "Hard-Only Math Mixed Set",
        level: 5,
        difficulty: "advanced",
        theory:
          "60 câu Hard Math trộn từ 4 nhóm chính: Quadratics nâng cao, Functions deep-dive, Geometry/Trig hỗn hợp, và Word Problems nhiều bước. Bắt buộc dùng Desmos cho ≥ 30 câu - coi đây là kỹ năng riêng cần luyện đến phản xạ.\n\nMục tiêu kép: accuracy ≥ 70% VÀ pacing ≤ 110 giây/câu. Nếu đạt accuracy nhưng pacing quá → phải drill lại Desmos shortcut.",
        theoryEn:
          "60 Hard Math questions mixed from 4 areas: advanced Quadratics, Functions deep-dive, mixed Geometry/Trig, and multi-step Word Problems. Use Desmos on ≥ 30 - treat it as a separate, drilled-in reflex.\n\nDual target: accuracy ≥ 70% AND pacing ≤ 110 seconds/item. Hitting accuracy but missing pacing = drill Desmos shortcuts again.",
        proTips: [
          "Học thuộc 5 phím tắt Desmos: tham số ‘a’ với slider, ‘zoom fit’, ‘table’, regression, intersect.",
          "Câu word problem nhiều bước → BẮT BUỘC viết ‘Let x = …’ ra giấy nháp trước khi chạm đáp án.",
          "Nếu đáp án có dấu phẩy hoặc đơn vị, KIỂM TRA đơn vị 2 lần trước khi gõ."
        ],
        proTipsEn: [
          "Memorize 5 Desmos shortcuts: parameter ‘a’ with slider, ‘zoom fit’, ‘table’, regression, intersect.",
          "Multi-step word problems → ALWAYS write ‘Let x = …’ on scratch before tapping an answer.",
          "If an answer has a comma or unit, double-check the unit before typing."
        ],
        vocabulary: [
          v("Desmos", "máy tính Desmos", "graphing tool inside Bluebook", "Desmos is your secret weapon."),
          v("regression", "hồi quy", "best-fit line/curve", "Use regression for line-of-best-fit items."),
          v("slider", "thanh trượt", "Desmos parameter slider", "A slider tests parameter behavior fast."),
          v("intersect", "giao điểm", "where curves cross", "Use intersect for systems."),
          v("multi-step", "nhiều bước", "requires several stages", "Multi-step problems need scratch work."),
          v("scratch paper", "giấy nháp", "physical or onscreen notes", "Scratch paper saves you from arithmetic slips."),
          v("unit", "đơn vị đo", "feet/seconds/etc.", "Unit checks catch silent errors."),
          v("pacing", "tốc độ", "speed per question", "Pacing target ≤ 110s/item."),
          v("shortcut", "phím tắt", "keyboard combo", "Desmos shortcuts cut 20s per item."),
          v("buffer", "thời gian dự phòng", "spare time", "Always preserve buffer time.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thông số đúng:",
            instructionEn: "Fill in the correct number:",
            sentences: [
              { text: "The Hard-only Math set has ___ questions.", textEn: "The Hard-only Math set has ___ questions.", answer: "60" },
              { text: "Use Desmos on at least ___ of those questions.", textEn: "Use Desmos on at least ___ of those questions.", answer: "30" },
              { text: "Pacing target: at most ___ seconds per question.", textEn: "Pacing target: at most ___ seconds per question.", answer: "110" }
            ]
          }
        ],
        quiz: [
          {
            question: "If you hit accuracy but MISS pacing on Hard Math, what do you drill next?",
            options: ["More theory", "Desmos shortcuts", "Vocabulary", "Reading speed"],
            answer: 1,
            explanation: "Pacing on Hard Math is usually a tooling problem; drill Desmos shortcuts.",
          }
        ]
      },
      {
        id: "sat-test-psychology",
        title: "Test-Day Psychology - 4-7-8 & Plan B",
        titleEn: "Test-Day Psychology - 4-7-8 & Plan B",
        level: 4,
        difficulty: "intermediate",
        theory:
          "Áp lực phòng thi gây ra 3 hiện tượng: mind blank, ‘re-read loop’ (đọc đi đọc lại 1 câu), và panic-skip (bỏ qua quá nhiều câu).\n\nKỹ thuật xử lý:\n• Hít thở 4-7-8: hít 4 giây, giữ 7 giây, thở ra 8 giây × 3 lần - reset hệ thần kinh trong 60 giây.\n• Plan B: nếu module 1 quá khó, mục tiêu chuyển từ ‘ăn điểm cao’ sang ‘không bỏ trống câu nào’ - vẫn được vào module 2 ‘Easier’ chứ không sụp đổ.\n• ‘Look-away reset’: nhìn xa 5 mét trong 10 giây giữa các câu khó.",
        theoryEn:
          "Test pressure produces 3 phenomena: mind blank, the ‘re-read loop’ (re-reading the same line), and panic-skip (skipping too many items).\n\nCountermeasures:\n• 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s × 3 - resets the nervous system in 60 seconds.\n• Plan B: if Module 1 feels brutal, switch the goal from ‘score high’ to ‘don't leave anything blank’ - you still drop into the ‘Easier’ Module 2 instead of collapsing.\n• ‘Look-away reset’: stare 5 metres away for 10 seconds between hard items.",
        proTips: [
          "Tập 4-7-8 mỗi tối 1 tuần trước thi để cơ thể quen - đừng tập lần đầu trong phòng thi.",
          "Plan B PHẢI viết ra giấy trước ngày thi - não căng thẳng không nghĩ ra được.",
          "Ngủ đủ 8h đêm trước - quan trọng hơn 1 buổi ôn 4 tiếng."
        ],
        proTipsEn: [
          "Practice 4-7-8 each night for a week pre-test - don't first try it in the exam room.",
          "Write Plan B on paper BEFORE test day - a stressed brain can't invent it.",
          "Eight hours of sleep the night before beats a 4-hour cram."
        ],
        vocabulary: [
          v("mind blank", "đầu rỗng", "sudden cognitive freeze", "Mind blanks fade in 60 seconds."),
          v("breathing", "kỹ thuật thở", "controlled inhale/exhale", "Breathing resets the nervous system."),
          v("Plan B", "kế hoạch dự phòng", "backup strategy", "Always carry a Plan B."),
          v("reset", "tái thiết lập", "return to baseline", "A 10-second reset helps."),
          v("loop", "vòng lặp", "repetitive read", "Break the re-read loop."),
          v("stamina", "sức bền", "endurance", "Build test stamina with mocks."),
          v("composure", "sự điềm tĩnh", "calm self-control", "Composure beats raw speed."),
          v("taper", "giảm dần", "reducing intensity before the event", "Taper your study the test week."),
          v("ritual", "nghi thức", "stable routine", "A pre-test ritual lowers anxiety."),
          v("focus", "sự tập trung", "concentrated attention", "Focus is the trainable skill.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thông số kỹ thuật 4-7-8:",
            instructionEn: "Fill in the 4-7-8 specs:",
            sentences: [
              { text: "Inhale for ___ seconds.", textEn: "Inhale for ___ seconds.", answer: "4" },
              { text: "Hold for ___ seconds.", textEn: "Hold for ___ seconds.", answer: "7" },
              { text: "Exhale for ___ seconds.", textEn: "Exhale for ___ seconds.", answer: "8" }
            ]
          }
        ],
        quiz: [
          {
            question: "If Module 1 feels brutal, your Plan B should be to…",
            options: ["leave items blank", "answer everything, even guesses", "give up", "switch to Math"],
            answer: 1,
            explanation: "Filling everything keeps you eligible for the ‘Easier’ Module 2 instead of collapsing the score.",
          }
        ]
      },
      {
        id: "sat-simulation-peak",
        title: "Simulation Peak - Back-to-Back Mocks",
        titleEn: "Simulation Peak - Back-to-Back Mocks",
        level: 5,
        difficulty: "advanced",
        theory:
          "Tuần ‘peak’ là tuần áp chót - 2 mock cách nhau 3 ngày (vd: Mock #6 thứ Hai, Mock #7 thứ Sáu). Mục tiêu KHÔNG phải tăng điểm; mục tiêu là rèn STAMINA và sự ổn định.\n\nGiữa 2 mock: KHÔNG học bài mới, KHÔNG ôn dồn - chỉ ngủ đủ, vận động nhẹ, và xem lại error log cũ. Tỉ lệ chênh lệch giữa 2 mock không quá 30 điểm = sẵn sàng thi thật.",
        theoryEn:
          "‘Peak’ week is the second-to-last week - 2 mocks 3 days apart (e.g. Mock #6 Mon, Mock #7 Fri). The goal is NOT to push score; it's to train STAMINA and consistency.\n\nBetween mocks: NO new content, NO cramming - just sleep, light exercise, and a quick error-log review. A gap ≤ 30 points between the two mocks = test-ready.",
        proTips: [
          "Đặt báo thức cùng giờ thi thật - tập não vào ‘chế độ thi’ đúng nhịp sinh học.",
          "Sau mock #6, không debrief sâu - để dành năng lượng cho mock #7.",
          "Nếu chênh > 50 điểm giữa 2 mock → vấn đề là stamina, KHÔNG phải kiến thức."
        ],
        proTipsEn: [
          "Set the alarm to the actual test start time - train your circadian rhythm into ‘test mode’.",
          "After Mock #6, skip deep debrief - save energy for Mock #7.",
          "A gap > 50 points between the two = stamina issue, NOT knowledge."
        ],
        vocabulary: [
          v("simulation", "mô phỏng", "real-condition rehearsal", "A simulation peaks the prep cycle."),
          v("stamina", "sức bền", "mental endurance", "Stamina decides the back half."),
          v("consistency", "sự ổn định", "steady performance", "Consistency beats one good mock."),
          v("circadian", "nhịp sinh học", "daily body clock", "Train your circadian rhythm."),
          v("recovery", "hồi phục", "rest between efforts", "Recovery is part of training."),
          v("benchmark", "mốc đối chiếu", "reference target", "Mock #6 sets the benchmark."),
          v("variance", "độ biến thiên", "score difference", "Keep variance under 30 points."),
          v("pacing", "phân bổ tốc độ", "time control", "Pacing must hold across both mocks."),
          v("rehearsal", "diễn tập", "practice run", "Treat each mock as full rehearsal."),
          v("readiness", "sự sẵn sàng", "fitness for test day", "Stable mocks signal readiness.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thông số:",
            instructionEn: "Fill in the spec:",
            sentences: [
              { text: "The peak week runs ___ mocks.", textEn: "The peak week runs ___ mocks.", answer: "2" },
              { text: "The mocks are spaced ___ days apart.", textEn: "The mocks are spaced ___ days apart.", answer: "3" },
              { text: "A score gap under ___ points means you're ready.", textEn: "A score gap under ___ points means you're ready.", answer: "30" }
            ]
          }
        ],
        quiz: [
          {
            question: "What's the PRIMARY goal of the simulation-peak week?",
            options: ["Push the highest score", "Train stamina & consistency", "Learn new content", "Skip practice"],
            answer: 1,
            explanation: "Peak week trains endurance and consistency, not raw score gains.",
          }
        ]
      },
      {
        id: "sat-taper-and-test-day",
        title: "Tapering & Test-Day Protocol",
        titleEn: "Tapering & Test-Day Protocol",
        level: 4,
        difficulty: "intermediate",
        theory:
          "Tuần thi (W30) áp dụng nguyên tắc TAPER:\n• T2-T3: chỉ ôn flashcard + 5 công thức Math không có trên reference sheet.\n• T4-T5: nghỉ hoàn toàn - đi bộ, ngủ sớm, KHÔNG mở Bluebook.\n• T6: rà soát laptop sạc đầy, ID, đường đi tới điểm thi.\n• T7 (ngày thi): ăn sáng đủ tinh bột + protein, đến sớm 30 phút, đi vệ sinh trước khi vào phòng.\n\nSau khi thi: dành 30 phút viết reflection trong vòng 24h - kể cả khi cảm thấy ổn/không ổn.",
        theoryEn:
          "Test week (W30) follows the TAPER principle:\n• Mon–Tue: flashcards + the 5 Math formulas NOT on the reference sheet.\n• Wed–Thu: full rest - walks, early sleep, NO Bluebook.\n• Fri: verify laptop fully charged, ID, route to the centre.\n• Sat (test day): carb + protein breakfast, arrive 30 minutes early, restroom before entering.\n\nAfter the test: spend 30 minutes writing a reflection within 24 hours - even if you felt great or terrible.",
        proTips: [
          "Đừng làm thêm full mock trong tuần thi - sẽ làm cạn pin tinh thần.",
          "Mang theo 1 chai nước + 1 thanh năng lượng cho giờ giải lao 10 phút.",
          "KHÔNG đọc forum sau khi thi xong - comment người khác làm bạn nghi ngờ vô ích."
        ],
        proTipsEn: [
          "Don't run a full mock in test week - it drains your mental battery.",
          "Bring water + an energy bar for the 10-minute break.",
          "Do NOT read forums after the test - others' comments breed pointless self-doubt."
        ],
        vocabulary: [
          v("taper", "giảm dần cường độ", "reduce training before the event", "Taper for the final week."),
          v("readiness", "sự sẵn sàng", "preparedness", "Readiness peaks with rest."),
          v("ritual", "nghi thức cá nhân", "personal pre-event routine", "A consistent ritual lowers anxiety."),
          v("checklist", "danh sách kiểm tra", "items to verify", "Run the night-before checklist."),
          v("hydration", "uống đủ nước", "fluid balance", "Stay hydrated, but not over."),
          v("nutrition", "dinh dưỡng", "food and energy intake", "Carbs + protein at breakfast."),
          v("logistics", "hậu cần", "transport, ID, materials", "Sort logistics on Friday."),
          v("reflection", "ghi chép suy ngẫm", "post-test write-up", "Write reflection within 24h."),
          v("recovery", "hồi phục", "rest after effort", "Sleep is recovery #1."),
          v("focus", "sự tập trung", "centred attention", "Focus on what you can control.")
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền vào lịch taper:",
            instructionEn: "Fill in the taper schedule:",
            sentences: [
              { text: "Mon–Tue: review ___ and the 5 Math formulas not on the reference sheet.", textEn: "Mon–Tue: review ___ and the 5 Math formulas not on the reference sheet.", answer: "flashcards" },
              { text: "Wed–Thu: full ___ with no Bluebook.", textEn: "Wed–Thu: full ___ with no Bluebook.", answer: "rest" },
              { text: "Arrive ___ minutes early on test day.", textEn: "Arrive ___ minutes early on test day.", answer: "30" },
              { text: "Write a reflection within ___ hours after the test.", textEn: "Write a reflection within ___ hours after the test.", answer: "24" }
            ]
          }
        ],
        quiz: [
          {
            question: "Which activity should you AVOID during test week?",
            options: ["Sleeping 8 hours", "Running a full mock", "Reviewing flashcards", "Light walks"],
            answer: 1,
            explanation: "Running a full mock in test week drains the mental energy you need on test day.",
          }
        ]
      }
    ]
  }
];
