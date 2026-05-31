// SAT Expansion 13 - adds 4 thematic modules × 5 lessons each (20 new lessons).
// Every lesson contains worked EXAMPLES inside the theory and at least one
// interactive exercise (fill-in-blank or sentence-reorder) plus a 4-Q quiz.
//   1) R&W · Rhetorical Synthesis (notes → one sentence)
//   2) R&W · Transitions & Logical Flow
//   3) Math · Linear Equations, Systems & Inequalities
//   4) Math · Geometry, Trigonometry & Circles
import type { LanguageModule } from "./types";

export const satExpansionModules13: LanguageModule[] = [
  // ════════════════ 1. R&W · Rhetorical Synthesis
  {
    id: "sat-rw-rhetorical-synthesis-pack",
    title: "SAT R&W · Rhetorical Synthesis (Notes → 1 sentence)",
    titleEn: "SAT R&W · Rhetorical Synthesis (Notes → 1 sentence)",
    icon: "📝",
    color: "from-sky-500 to-cyan-600",
    description: "Gói 5 bài dạy tổng hợp ghi chú thành 1 câu duy nhất phục vụ mục tiêu cụ thể - dạng cuối của module R&W.",
    descriptionEn: "Five lessons on collapsing bullet notes into a single sentence that fits a stated purpose - the last set in every R&W module.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rs-1-intro",
        title: "Bài 1 · Làm quen dạng 'student wants to…'",
        titleEn: "Lesson 1 · Meet the 'Student wants to…' Question",
        level: 2,
        difficulty: "beginner",
        theory:
          "Đề cho 4–6 dòng ghi chú và một MỤC TIÊU (purpose), ví dụ: 'The student wants to emphasise a similarity between two artists.' Bạn chọn câu duy nhất KHỚP MỤC TIÊU, dùng dữ liệu trong ghi chú.\n\nVí dụ ghi chú:\n• Monet (1840–1926) - French Impressionist.\n• Renoir (1841–1919) - French Impressionist.\n• Both painted outdoor light effects.\n\nMục tiêu: nhấn mạnh điểm GIỐNG nhau.\nĐáp án đúng: 'Like Renoir, Monet was a French Impressionist who painted outdoor light effects.' - bám đúng mục tiêu 'similarity'.",
        theoryEn:
          "The prompt gives 4–6 bullet notes plus a PURPOSE, e.g. 'The student wants to emphasise a similarity between two artists.' Pick the single sentence that MATCHES the purpose using only the notes.\n\nExample notes:\n• Monet (1840–1926) - French Impressionist.\n• Renoir (1841–1919) - French Impressionist.\n• Both painted outdoor light effects.\n\nPurpose: emphasise SIMILARITY.\nCorrect: 'Like Renoir, Monet was a French Impressionist who painted outdoor light effects.' - hits the 'similarity' goal.",
        proTips: [
          "Gạch chân động từ MỤC TIÊU: emphasise, contrast, introduce, explain.",
          "Loại đáp án 'đúng dữ liệu nhưng SAI mục tiêu' - bẫy phổ biến nhất.",
        ],
        proTipsEn: [
          "Underline the purpose verb: emphasise, contrast, introduce, explain.",
          "Eliminate options that are factually true but miss the purpose - the #1 trap.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn TỪ KHÓA mục tiêu phù hợp (similarity / contrast / introduction):",
            instructionEn: "Pick the matching purpose keyword (similarity / contrast / introduction):",
            sentences: [
              { text: "'Whereas Monet used short brushstrokes, Renoir blended his.' → ___", textEn: "'Whereas Monet used short brushstrokes, Renoir blended his.' → ___", answer: "contrast" },
              { text: "'Like Renoir, Monet was a French Impressionist.' → ___", textEn: "'Like Renoir, Monet was a French Impressionist.' → ___", answer: "similarity" },
              { text: "'Claude Monet was a 19th-century painter from France.' → ___", textEn: "'Claude Monet was a 19th-century painter from France.' → ___", answer: "introduction" },
            ],
          },
        ],
        quiz: [
          { question: "First step on a Rhetorical Synthesis item?", options: ["Read all 4 options", "Underline the purpose verb", "Translate notes", "Skip notes"], answer: 1, explanation: "Purpose verb drives the correct answer." },
          { question: "'Emphasise a similarity' suggests a sentence starting with…", options: ["'Although'", "'Like' / 'Both'", "'In contrast'", "'However'"], answer: 1, explanation: "Similarity signals: like / both / similarly." },
          { question: "Classic trap on Synthesis?", options: ["non-English option", "true facts that miss the purpose", "ungrammatical option", "very long option"], answer: 1, explanation: "Facts can be true yet ignore the purpose." },
          { question: "May the answer use information NOT in the notes?", options: ["yes, freely", "no - only the notes", "only if footnoted", "only numerical"], answer: 1, explanation: "Stick strictly to the bullets." },
        ],
      },
      {
        id: "sat-rs-2-contrast",
        title: "Bài 2 · Mục tiêu 'contrast' & 'distinguish'",
        titleEn: "Lesson 2 · Contrast & Distinguish",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Khi mục tiêu là CONTRAST, đáp án thường có 'whereas', 'while', 'unlike', 'in contrast'. Kiểm tra: hai vế của câu PHẢI nêu hai sự khác biệt cụ thể.\n\nVí dụ ghi chú:\n• Solar panels: zero fuel cost, expensive install.\n• Diesel generators: cheap install, ongoing fuel cost.\n\nMục tiêu: distinguish hai công nghệ về CHI PHÍ.\nĐáp án đúng: 'Whereas solar panels are expensive to install but free to run, diesel generators are cheap to install but costly to fuel.' - nêu rõ TƯƠNG PHẢN ở cả install và fuel.",
        theoryEn:
          "When the goal is CONTRAST, correct answers tend to use 'whereas', 'while', 'unlike', 'in contrast'. Check: BOTH halves of the sentence must state a distinct difference.\n\nExample notes:\n• Solar panels: zero fuel cost, expensive install.\n• Diesel generators: cheap install, ongoing fuel cost.\n\nPurpose: distinguish the two technologies on COST.\nCorrect: 'Whereas solar panels are expensive to install but free to run, diesel generators are cheap to install but costly to fuel.' - explicit contrast on both install and fuel.",
        proTips: ["Đáp án có 'whereas/while' nhưng chỉ nêu 1 vế khác biệt → vẫn SAI."],
        proTipsEn: ["An option with 'whereas/while' but only one contrasted half is still wrong."],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp lại các mảnh thành 1 câu contrast hợp lệ:",
            instructionEn: "Re-order the fragments into a valid contrast sentence:",
            items: [
              { scrambled: ["diesel generators", "cheap to install", "Whereas solar panels are expensive to install,", "are"], correct: "Whereas solar panels are expensive to install, diesel generators are cheap to install" },
            ],
          },
        ],
        quiz: [
          { question: "Hallmark signal of CONTRAST sentences?", options: ["'and', 'also'", "'whereas', 'while', 'unlike'", "'because', 'so'", "'first', 'then'"], answer: 1, explanation: "These conjunctions explicitly contrast." },
          { question: "An option with 'whereas' but only one contrasted half is…", options: ["correct", "still wrong", "neutral", "off-topic"], answer: 1, explanation: "Contrast requires two distinct halves." },
          { question: "Goal verb 'distinguish' tells you to…", options: ["unify", "show how items differ", "describe", "summarise"], answer: 1, explanation: "Distinguish = highlight differences." },
          { question: "Best opener for a contrast sentence?", options: ["'Like'", "'Both'", "'Whereas'", "'Similarly'"], answer: 2, explanation: "'Whereas' frames a contrast cleanly." },
        ],
      },
      {
        id: "sat-rs-3-emphasis",
        title: "Bài 3 · Nhấn mạnh số liệu (emphasise a result)",
        titleEn: "Lesson 3 · Emphasising a Statistic / Result",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Khi mục tiêu là 'emphasise a result' hoặc 'highlight a finding', đáp án đúng PHẢI bao gồm con số / kết quả nổi bật từ ghi chú và đặt nó ở vị trí ngữ pháp QUAN TRỌNG (vị trí chủ ngữ hoặc bổ ngữ chính).\n\nVí dụ ghi chú:\n• Trial enrolled 1,200 participants.\n• Drug X cut symptoms by 47%.\n• Side effects rare (<2%).\n\nMục tiêu: nhấn mạnh kết quả lâm sàng chính.\nĐáp án đúng: 'In a 1,200-person trial, Drug X reduced symptoms by 47%.' - đặt con số 47% làm điểm rơi của câu.",
        theoryEn:
          "When the goal is 'emphasise a result' or 'highlight a finding', the right answer MUST include the headline number from the notes AND place it in a grammatically prominent slot (subject or main complement).\n\nExample notes:\n• Trial enrolled 1,200 participants.\n• Drug X cut symptoms by 47%.\n• Side effects rare (<2%).\n\nPurpose: emphasise the main clinical result.\nCorrect: 'In a 1,200-person trial, Drug X reduced symptoms by 47%.' - places the 47% as the punch.",
        proTips: ["Đáp án ĐÚNG luôn chứa CON SỐ chính; đáp án thiếu số → loại."],
        proTipsEn: ["The correct answer always contains the headline NUMBER; numberless options → eliminate."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền con số phù hợp lấy từ ghi chú ví dụ phía trên:",
            instructionEn: "Fill in the number from the notes above:",
            sentences: [
              { text: "'In a ___-person trial, Drug X cut symptoms by 47%.'", textEn: "'In a ___-person trial, Drug X cut symptoms by 47%.'", answer: "1,200" },
              { text: "'Side effects occurred in fewer than ___% of patients.'", textEn: "'Side effects occurred in fewer than ___% of patients.'", answer: "2" },
            ],
          },
        ],
        quiz: [
          { question: "An 'emphasise a result' option without numbers is…", options: ["acceptable", "always wrong", "preferred", "neutral"], answer: 1, explanation: "Result questions demand the headline figure." },
          { question: "Best slot for the headline number?", options: ["buried in a relative clause", "subject or main complement", "before the period only", "anywhere"], answer: 1, explanation: "Prominent slot = stronger emphasis." },
          { question: "If two options have the number, prefer the one that…", options: ["is shorter", "places the number more prominently", "uses 'and'", "starts with 'In'"], answer: 1, explanation: "Prominence wins ties." },
          { question: "Goal verb 'highlight' is closest to…", options: ["hide", "emphasise", "compare", "doubt"], answer: 1, explanation: "Highlight = emphasise." },
        ],
      },
      {
        id: "sat-rs-4-intro-readers",
        title: "Bài 4 · 'Introduce X to readers' - câu định nghĩa",
        titleEn: "Lesson 4 · 'Introduce X to a reader' - Definition Sentences",
        level: 4,
        difficulty: "advanced",
        theory:
          "Mục tiêu 'introduce X to an unfamiliar reader' đòi câu cung cấp ĐỊNH NGHĨA cốt lõi: tên + loại / chức năng + 1 đặc điểm phân biệt. Đừng chọn câu chứa CHI TIẾT NÂNG CAO mà người mới chưa biết.\n\nVí dụ ghi chú:\n• Octopus - cephalopod mollusc.\n• Has 8 arms, blue blood.\n• Solves puzzles in labs.\n\nMục tiêu: giới thiệu octopus cho người chưa biết.\nĐáp án đúng: 'The octopus is an eight-armed mollusc known for its puzzle-solving intelligence.' - định nghĩa rõ, dùng chi tiết phân biệt.",
        theoryEn:
          "Purpose 'introduce X to an unfamiliar reader' wants a DEFINITION: name + category/function + one distinguishing trait. Reject options that drop advanced specifics a newcomer cannot anchor.\n\nExample notes:\n• Octopus - cephalopod mollusc.\n• Has 8 arms, blue blood.\n• Solves puzzles in labs.\n\nPurpose: introduce the octopus to a new reader.\nCorrect: 'The octopus is an eight-armed mollusc known for its puzzle-solving intelligence.' - clean definition with a distinguishing trait.",
        proTips: ["Định nghĩa SAT theo công thức: 'X is a [type] that [distinguishing trait].'"],
        proTipsEn: ["SAT definition template: 'X is a [type] that [distinguishing trait].'"],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền các phần theo công thức 'X is a [type] that [trait]':",
            instructionEn: "Fill the slots in 'X is a [type] that [trait]':",
            sentences: [
              { text: "The octopus is a ___ that solves puzzles.", textEn: "The octopus is a ___ that solves puzzles.", answer: "mollusc" },
              { text: "Pluto is a ___ that orbits beyond Neptune.", textEn: "Pluto is a ___ that orbits beyond Neptune.", answer: "dwarf planet" },
            ],
          },
        ],
        quiz: [
          { question: "Best opener for an 'introduce X' answer?", options: ["'However, X…'", "'X is a [type] that…'", "'X was once thought to…'", "'In conclusion, X…'"], answer: 1, explanation: "Definition template fits the goal." },
          { question: "Advanced-only specifics in an 'introduce' answer are…", options: ["ideal", "wrong because they alienate newcomers", "neutral", "required"], answer: 1, explanation: "Match the reader's prior knowledge." },
          { question: "A distinguishing trait helps the reader…", options: ["memorise dates", "tell X apart from siblings", "calculate", "translate"], answer: 1, explanation: "Distinguishing = telling apart." },
          { question: "Pick the better intro sentence:", options: ["'Octopuses have RNA editing rates of 60%.'", "'The octopus is an eight-armed mollusc known for solving puzzles.'", "'See below for details.'", "'Numerous species exist.'"], answer: 1, explanation: "Definition + trait beats advanced trivia." },
        ],
      },
      {
        id: "sat-rs-5-timed",
        title: "Bài 5 · Rhetorical Synthesis - bộ luyện bấm giờ 75s",
        titleEn: "Lesson 5 · Rhetorical Synthesis - 75s Timed Drill",
        level: 5,
        difficulty: "advanced",
        theory:
          "Mục tiêu: 75 giây / câu Synthesis. Phân bổ: 15s đọc purpose, 30s quét ghi chú, 30s ghép từng đáp án vào purpose. Câu nào còn lưỡng lự giữa 2 đáp án → so PURPOSE TYPE (similarity / contrast / emphasise / introduce) trước.\n\nVí dụ rút gọn:\nNotes: A - fast, expensive. B - slow, cheap. Purpose: contrast.\nCandidate 1: 'A is faster than B.' → SAI (chỉ 1 vế).\nCandidate 2: 'Whereas A is fast and expensive, B is slow and cheap.' → ĐÚNG (đủ 2 vế).",
        theoryEn:
          "Target: 75s per Synthesis item. Budget: 15s purpose, 30s scan notes, 30s plug each option into the purpose. When torn between two, test the PURPOSE TYPE first (similarity / contrast / emphasise / introduce).\n\nMini example:\nNotes: A - fast, expensive. B - slow, cheap. Purpose: contrast.\nCandidate 1: 'A is faster than B.' → WRONG (only one half).\nCandidate 2: 'Whereas A is fast and expensive, B is slow and cheap.' → RIGHT (both halves).",
        proTips: ["Quá 75s → mark + chọn đáp án có nhiều DỮ LIỆU từ ghi chú nhất."],
        proTipsEn: ["Over 75s → mark + pick the option pulling the most DATA from the notes."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành kế hoạch:",
            instructionEn: "Complete the plan:",
            sentences: [
              { text: "Time budget per Synthesis item: ___ seconds.", textEn: "Time budget per Synthesis item: ___ seconds.", answer: "75" },
              { text: "When torn between 2 options, test the ___ first.", textEn: "When torn between 2 options, test the ___ first.", answer: "purpose" },
            ],
          },
        ],
        quiz: [
          { question: "Best per-Synthesis time budget?", options: ["30s", "75s", "120s", "180s"], answer: 1, explanation: "75s averages well across the R&W module." },
          { question: "If stuck after 75s, the safest move is…", options: ["leave blank", "Mark + pick the data-richest option", "redo all notes", "pick the longest"], answer: 1, explanation: "Data overlap correlates with the correct answer." },
          { question: "Step 1 of the 75s plan?", options: ["read every option", "read the purpose (15s)", "skip notes", "count words"], answer: 1, explanation: "Purpose first = filter for everything else." },
          { question: "Purpose 'contrast' demands…", options: ["one half difference", "two contrasted halves", "no numbers", "an intro"], answer: 1, explanation: "Contrast = 2 sides explicit." },
        ],
      },
    ],
  },

  // ════════════════ 2. R&W · Transitions & Logical Flow
  {
    id: "sat-rw-transitions-pack",
    title: "SAT R&W · Transitions & Logical Flow",
    titleEn: "SAT R&W · Transitions & Logical Flow",
    icon: "🔁",
    color: "from-fuchsia-500 to-purple-600",
    description: "5 bài luyện chọn transition đúng (however, therefore, for example…) - dạng câu hỏi tần suất cao của R&W.",
    descriptionEn: "Five lessons on picking the right transition word (however, therefore, for example…) - a high-frequency R&W item.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-tr-1-families",
        title: "Bài 1 · 4 họ transition cốt lõi",
        titleEn: "Lesson 1 · The Four Core Transition Families",
        level: 2,
        difficulty: "beginner",
        theory:
          "4 họ transition cần thuộc:\n• CONTRAST: however, yet, nevertheless, in contrast, on the other hand.\n• CAUSE/EFFECT: therefore, thus, as a result, consequently.\n• EXAMPLE: for example, for instance, specifically, in particular.\n• ADDITION: moreover, furthermore, additionally, in addition.\n\nVí dụ:\n'Sales fell 12%. ___ , the company cut bonuses.' → CAUSE/EFFECT → 'Therefore' / 'As a result'.\n'Sales fell 12%. ___ , marketing reached a record high.' → CONTRAST → 'However'.",
        theoryEn:
          "Four families to memorise:\n• CONTRAST: however, yet, nevertheless, in contrast, on the other hand.\n• CAUSE/EFFECT: therefore, thus, as a result, consequently.\n• EXAMPLE: for example, for instance, specifically, in particular.\n• ADDITION: moreover, furthermore, additionally, in addition.\n\nExample:\n'Sales fell 12%. ___ , the company cut bonuses.' → CAUSE/EFFECT → 'Therefore' / 'As a result'.\n'Sales fell 12%. ___ , marketing reached a record high.' → CONTRAST → 'However'.",
        proTips: ["Đọc 2 câu kề trước khi chọn - đừng đoán theo cảm giác."],
        proTipsEn: ["Read both adjacent sentences before choosing - never gut-pick."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Gán mỗi từ vào đúng họ (contrast / cause / example / addition):",
            instructionEn: "Assign each word to its family (contrast / cause / example / addition):",
            sentences: [
              { text: "'However' → ___", textEn: "'However' → ___", answer: "contrast" },
              { text: "'Therefore' → ___", textEn: "'Therefore' → ___", answer: "cause" },
              { text: "'For instance' → ___", textEn: "'For instance' → ___", answer: "example" },
              { text: "'Moreover' → ___", textEn: "'Moreover' → ___", answer: "addition" },
            ],
          },
        ],
        quiz: [
          { question: "Which is CAUSE/EFFECT?", options: ["however", "moreover", "as a result", "for instance"], answer: 2, explanation: "'As a result' signals effect." },
          { question: "'Nevertheless' belongs to…", options: ["addition", "contrast", "example", "cause"], answer: 1, explanation: "Mild contrast." },
          { question: "Best transition for adding evidence?", options: ["yet", "moreover", "thus", "however"], answer: 1, explanation: "Moreover = addition." },
          { question: "Best transition introducing a concrete case?", options: ["for example", "however", "consequently", "in addition"], answer: 0, explanation: "Examples → 'for example'." },
        ],
      },
      {
        id: "sat-tr-2-contrast",
        title: "Bài 2 · Transition tương phản nâng cao",
        titleEn: "Lesson 2 · Advanced Contrast Transitions",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Phân biệt sắc thái:\n• 'However' = phản bác trực tiếp.\n• 'On the other hand' = nêu góc nhìn khác (cần 2 mặt cân bằng).\n• 'Nevertheless / nonetheless' = công nhận trước, phản bác sau.\n• 'In contrast' = so sánh 2 đối tượng khác nhau.\n\nVí dụ:\n'The drug is expensive. ___ , insurers still cover it.' → 'Nevertheless' (công nhận đắt, nhưng vẫn được chi trả).\n'Cats are aloof. ___ , dogs crave attention.' → 'In contrast' (so 2 đối tượng).",
        theoryEn:
          "Nuance map:\n• 'However' = direct rebuttal.\n• 'On the other hand' = balanced alternative perspective.\n• 'Nevertheless / nonetheless' = concede first, push back next.\n• 'In contrast' = compares two distinct subjects.\n\nExample:\n'The drug is expensive. ___ , insurers still cover it.' → 'Nevertheless' (concede cost, push back).\n'Cats are aloof. ___ , dogs crave attention.' → 'In contrast' (two subjects).",
        proTips: ["Nếu câu trước CÔNG NHẬN một nhược điểm, ưu tiên 'nevertheless'."],
        proTipsEn: ["When the previous sentence concedes a downside, prefer 'nevertheless'."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn transition tốt nhất:",
            instructionEn: "Pick the best transition:",
            sentences: [
              { text: "'The hike was steep. ___ , every participant finished.' → ___", textEn: "'The hike was steep. ___ , every participant finished.' → ___", answer: "Nevertheless" },
              { text: "'Wolves hunt in packs. ___ , tigers stalk alone.' → ___", textEn: "'Wolves hunt in packs. ___ , tigers stalk alone.' → ___", answer: "In contrast" },
              { text: "'The lecture was clear. ___ , the slides were cluttered.' → ___", textEn: "'The lecture was clear. ___ , the slides were cluttered.' → ___", answer: "However" },
            ],
          },
        ],
        quiz: [
          { question: "Best transition when conceding a weakness then pushing back?", options: ["for example", "nevertheless", "moreover", "thus"], answer: 1, explanation: "Nevertheless = concede + push back." },
          { question: "When comparing two separate subjects, prefer…", options: ["however", "in contrast", "therefore", "for instance"], answer: 1, explanation: "'In contrast' fits two distinct subjects." },
          { question: "'On the other hand' requires…", options: ["one perspective", "two balanced perspectives", "a number", "a question"], answer: 1, explanation: "It frames a balanced alternative." },
          { question: "'However' is closest to…", options: ["because", "but / yet", "and", "for"], answer: 1, explanation: "However ≈ but." },
        ],
      },
      {
        id: "sat-tr-3-cause-effect",
        title: "Bài 3 · Cause / Effect & 'sequence'",
        titleEn: "Lesson 3 · Cause / Effect & Sequence",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Cause/Effect:\n• 'Therefore / thus' = kết quả logic chặt.\n• 'As a result / consequently' = kết quả thực tế.\n• 'Because of this' = nguyên nhân-kết quả thân mật.\n\nSequence:\n• 'First / then / finally' = thứ tự bước.\n• 'Subsequently' = sau đó (sự kiện sau).\n• 'Meanwhile' = đồng thời.\n\nVí dụ:\n'Glaciers melted faster than predicted. ___ , sea levels rose 2 mm earlier than forecast.' → 'As a result' / 'Consequently'.",
        theoryEn:
          "Cause/Effect:\n• 'Therefore / thus' = tight logical result.\n• 'As a result / consequently' = real-world consequence.\n• 'Because of this' = informal cause-effect.\n\nSequence:\n• 'First / then / finally' = step order.\n• 'Subsequently' = afterwards.\n• 'Meanwhile' = simultaneously.\n\nExample:\n'Glaciers melted faster than predicted. ___ , sea levels rose 2 mm earlier than forecast.' → 'As a result' / 'Consequently'.",
        proTips: ["'Therefore' đứng đầu một KẾT LUẬN; 'as a result' đứng trước một KẾT QUẢ thực tế."],
        proTipsEn: ["'Therefore' fronts a CONCLUSION; 'as a result' fronts a real-world CONSEQUENCE."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn transition cause / sequence:",
            instructionEn: "Pick a cause / sequence transition:",
            sentences: [
              { text: "'The bridge cracked. ___ , the city closed it overnight.' → ___", textEn: "'The bridge cracked. ___ , the city closed it overnight.' → ___", answer: "Consequently" },
              { text: "'Mix the dough. ___ , let it rest 30 minutes.' → ___", textEn: "'Mix the dough. ___ , let it rest 30 minutes.' → ___", answer: "Then" },
              { text: "'Inflation rose 5%. ___ , wages stagnated.' → ___", textEn: "'Inflation rose 5%. ___ , wages stagnated.' → ___", answer: "Meanwhile" },
            ],
          },
        ],
        quiz: [
          { question: "'Subsequently' is closest in meaning to…", options: ["before", "afterwards", "however", "for example"], answer: 1, explanation: "Subsequently = afterwards." },
          { question: "Best transition for a real-world consequence?", options: ["thus", "as a result", "for instance", "in addition"], answer: 1, explanation: "Result phrasing fits consequences." },
          { question: "Best for 'two events happening at the same time'?", options: ["meanwhile", "therefore", "however", "finally"], answer: 0, explanation: "Meanwhile = simultaneously." },
          { question: "'Therefore' fronts a…", options: ["question", "conclusion", "example", "contrast"], answer: 1, explanation: "Conclusion / logical result." },
        ],
      },
      {
        id: "sat-tr-4-example-addition",
        title: "Bài 4 · Example vs Addition - đừng nhầm",
        titleEn: "Lesson 4 · Example vs Addition - Don't Confuse",
        level: 4,
        difficulty: "advanced",
        theory:
          "Quy tắc vàng:\n• EXAMPLE (for example, specifically) → câu sau MINH HỌA câu trước (chi tiết / case).\n• ADDITION (moreover, furthermore) → câu sau bổ sung Ý MỚI cùng chiều, KHÔNG phải minh họa.\n\nVí dụ:\n'Many fungi glow. ___ , the bitter oyster emits green light.' → EXAMPLE (cụ thể loại nấm).\n'The lab won a grant. ___ , it published 3 papers.' → ADDITION (ý mới, không minh họa).",
        theoryEn:
          "Golden rule:\n• EXAMPLE (for example, specifically) → next sentence ILLUSTRATES the previous (detail / case).\n• ADDITION (moreover, furthermore) → next sentence ADDS A NEW point in the same direction, NOT an illustration.\n\nExample:\n'Many fungi glow. ___ , the bitter oyster emits green light.' → EXAMPLE (specific species).\n'The lab won a grant. ___ , it published 3 papers.' → ADDITION (new point).",
        proTips: ["Hỏi: 'Câu sau có CỤ THỂ HÓA câu trước không?' Có → example. Không → addition."],
        proTipsEn: ["Ask: 'Does the next sentence make the previous one MORE CONCRETE?' Yes → example. No → addition."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'example' hoặc 'addition':",
            instructionEn: "Fill 'example' or 'addition':",
            sentences: [
              { text: "'Birds migrate vast distances. ___ , the Arctic tern flies pole-to-pole.' → ___", textEn: "'Birds migrate vast distances. ___ , the Arctic tern flies pole-to-pole.' → ___", answer: "example" },
              { text: "'The course covers algebra. ___ , students also study trigonometry.' → ___", textEn: "'The course covers algebra. ___ , students also study trigonometry.' → ___", answer: "addition" },
              { text: "'Many vaccines need cold storage. ___ , the polio vaccine spoils at room temperature.' → ___", textEn: "'Many vaccines need cold storage. ___ , the polio vaccine spoils at room temperature.' → ___", answer: "example" },
            ],
          },
        ],
        quiz: [
          { question: "If the next sentence narrows to a specific case, use…", options: ["moreover", "for instance", "however", "thus"], answer: 1, explanation: "Narrowing = example." },
          { question: "If the next sentence brings a separate new point, use…", options: ["specifically", "furthermore", "for example", "in particular"], answer: 1, explanation: "Separate new point = addition." },
          { question: "Test for EXAMPLE transitions:", options: ["Does it contrast?", "Is it more concrete?", "Is it a question?", "Is it shorter?"], answer: 1, explanation: "More concrete = example." },
          { question: "Pick the EXAMPLE option:", options: ["moreover", "for example", "however", "consequently"], answer: 1, explanation: "Example family." },
        ],
      },
      {
        id: "sat-tr-5-mixed",
        title: "Bài 5 · Bộ luyện transition hỗn hợp",
        titleEn: "Lesson 5 · Mixed Transition Drill",
        level: 5,
        difficulty: "advanced",
        theory:
          "Quy trình 3 bước cho mọi câu transition:\n1) Đọc câu trước + câu sau (KHÔNG đọc chỗ trống có sẵn).\n2) Phân loại quan hệ: contrast / cause / example / addition / sequence.\n3) Mới đối chiếu 4 đáp án.\n\nVí dụ tự chấm:\n'Bees prefer purple flowers. ___ , they often ignore red ones.' → cause/effect → 'Consequently'.\n'Bees prefer purple flowers. ___ , they also see ultraviolet.' → addition → 'Moreover'.",
        theoryEn:
          "Three-step routine for every transition item:\n1) Read the sentence BEFORE and AFTER (ignore the blank).\n2) Classify the relationship: contrast / cause / example / addition / sequence.\n3) THEN compare the 4 options.\n\nSelf-check examples:\n'Bees prefer purple flowers. ___ , they often ignore red ones.' → cause/effect → 'Consequently'.\n'Bees prefer purple flowers. ___ , they also see ultraviolet.' → addition → 'Moreover'.",
        proTips: ["Nếu 2 đáp án cùng họ, chọn từ có SẮC THÁI khớp ngữ cảnh hơn (formal vs informal)."],
        proTipsEn: ["If two options share a family, pick the one whose REGISTER fits the passage (formal vs informal)."],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp lại đúng quy trình 3 bước:",
            instructionEn: "Order the 3-step routine:",
            items: [
              { scrambled: ["Compare the 4 options", "Read sentences before and after", "Classify the relationship"], correct: "Read sentences before and after, Classify the relationship, Compare the 4 options" },
            ],
          },
        ],
        quiz: [
          { question: "Step 1 of the transition routine?", options: ["compare options", "read before + after", "translate", "skip"], answer: 1, explanation: "Sentences first, options last." },
          { question: "When options share a family, the tiebreaker is…", options: ["alphabetical", "register / tone", "length", "first letter"], answer: 1, explanation: "Tone alignment wins." },
          { question: "'Bees prefer purple flowers. ___ they ignore red ones.' Best transition:", options: ["Moreover", "Consequently", "For example", "However"], answer: 1, explanation: "Preference causes the ignore behaviour." },
          { question: "Reading the blank's option first is…", options: ["smart", "a common mistake", "required", "ideal"], answer: 1, explanation: "It biases your classification." },
        ],
      },
    ],
  },

  // ════════════════ 3. MATH · Linear Equations, Systems & Inequalities
  {
    id: "sat-math-linear-systems-pack",
    title: "SAT Math · Linear Equations, Systems & Inequalities",
    titleEn: "SAT Math · Linear Equations, Systems & Inequalities",
    icon: "📐",
    color: "from-emerald-500 to-green-600",
    description: "5 bài luyện trục linear - chiếm ~35% module Math. Có ví dụ và bài tập từng bước.",
    descriptionEn: "Five lessons on the linear pillar - ~35% of every Math module. Worked examples + step-by-step practice.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-lin-1-slope-intercept",
        title: "Bài 1 · Slope-intercept y = mx + b",
        titleEn: "Lesson 1 · Slope-Intercept: y = mx + b",
        level: 2,
        difficulty: "beginner",
        theory:
          "Dạng: y = mx + b với m = slope (độ dốc), b = y-intercept (giao trục y khi x = 0).\nSlope = (y₂ − y₁) / (x₂ − x₁).\n\nVí dụ: hai điểm (2, 5) và (6, 13).\nm = (13 − 5)/(6 − 2) = 8/4 = 2.\nThay (2, 5): 5 = 2·2 + b ⇒ b = 1.\nPhương trình: y = 2x + 1.",
        theoryEn:
          "Form: y = mx + b where m = slope, b = y-intercept (y when x = 0).\nSlope = (y₂ − y₁) / (x₂ − x₁).\n\nWorked example: points (2, 5) and (6, 13).\nm = (13 − 5)/(6 − 2) = 8/4 = 2.\nPlug (2, 5): 5 = 2·2 + b ⇒ b = 1.\nLine: y = 2x + 1.",
        proTips: ["Slope dương → đi lên; âm → đi xuống; 0 → đường ngang; undefined → đường dọc."],
        proTipsEn: ["Positive slope rises; negative falls; 0 = horizontal; undefined = vertical line."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tính slope:",
            instructionEn: "Compute the slope:",
            sentences: [
              { text: "Through (1, 2) and (4, 11), m = ___", textEn: "Through (1, 2) and (4, 11), m = ___", answer: "3" },
              { text: "Through (0, 5) and (2, 5), m = ___", textEn: "Through (0, 5) and (2, 5), m = ___", answer: "0" },
              { text: "Through (3, 7) and (3, 1), slope is ___ (write 'undefined' or a number).", textEn: "Through (3, 7) and (3, 1), slope is ___ (write 'undefined' or a number).", answer: "undefined" },
            ],
          },
        ],
        quiz: [
          { question: "In y = mx + b, m is…", options: ["intercept", "slope", "constant", "midpoint"], answer: 1, explanation: "m = slope." },
          { question: "Line y = −2x + 7 has y-intercept…", options: ["−2", "2", "7", "−7"], answer: 2, explanation: "b = 7." },
          { question: "Slope of horizontal line:", options: ["0", "1", "undefined", "−1"], answer: 0, explanation: "Δy = 0 → slope 0." },
          { question: "Slope through (0,1) and (4,9):", options: ["1", "2", "4", "8"], answer: 1, explanation: "(9−1)/(4−0) = 2." },
        ],
      },
      {
        id: "sat-lin-2-systems",
        title: "Bài 2 · Hệ phương trình tuyến tính",
        titleEn: "Lesson 2 · Systems of Linear Equations",
        level: 3,
        difficulty: "intermediate",
        theory:
          "3 phương pháp: substitution, elimination, graphing (Desmos).\n\nVí dụ - elimination:\n2x + 3y = 12\n4x − 3y = 6\nCộng 2 PT: 6x = 18 ⇒ x = 3. Thay vào PT1: 2·3 + 3y = 12 ⇒ y = 2.\nNghiệm: (3, 2).\n\nVí dụ - nhận biết số nghiệm:\n• Hai đường cắt nhau → 1 nghiệm.\n• Song song (cùng slope, khác intercept) → 0 nghiệm.\n• Trùng nhau (cùng slope + intercept) → vô số nghiệm.",
        theoryEn:
          "Three methods: substitution, elimination, graphing (Desmos).\n\nWorked example - elimination:\n2x + 3y = 12\n4x − 3y = 6\nAdd: 6x = 18 ⇒ x = 3. Sub into Eq1: 2·3 + 3y = 12 ⇒ y = 2.\nSolution: (3, 2).\n\nNumber-of-solutions rule:\n• Intersect → 1 solution.\n• Parallel (same slope, diff intercept) → 0.\n• Coincide (same slope + intercept) → infinite.",
        proTips: ["SAT thích đếm nghiệm: nhớ so SLOPE trước, INTERCEPT sau."],
        proTipsEn: ["SAT loves 'how many solutions?': compare SLOPES first, intercepts second."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Số nghiệm của mỗi hệ (0 / 1 / infinite):",
            instructionEn: "Number of solutions (0 / 1 / infinite):",
            sentences: [
              { text: "y = 2x + 1 and y = 2x + 5 → ___", textEn: "y = 2x + 1 and y = 2x + 5 → ___", answer: "0" },
              { text: "y = 3x − 1 and 2y = 6x − 2 → ___", textEn: "y = 3x − 1 and 2y = 6x − 2 → ___", answer: "infinite" },
              { text: "y = x and y = −x + 4 → ___", textEn: "y = x and y = −x + 4 → ___", answer: "1" },
            ],
          },
        ],
        quiz: [
          { question: "Two lines with the same slope and different intercepts have…", options: ["1 sol", "0 sol", "infinite", "depends"], answer: 1, explanation: "Parallel = no intersection." },
          { question: "Solve: x + y = 5, x − y = 1. x = ?", options: ["2", "3", "4", "5"], answer: 1, explanation: "Add: 2x = 6 → x = 3." },
          { question: "Best Desmos method for systems?", options: ["table", "graph + intersection", "calculator", "matrix"], answer: 1, explanation: "Intersection dot solves instantly." },
          { question: "Coincident lines give…", options: ["1 sol", "0 sol", "infinite sol", "complex sol"], answer: 2, explanation: "Same line everywhere." },
        ],
      },
      {
        id: "sat-lin-3-inequalities",
        title: "Bài 3 · Bất phương trình tuyến tính",
        titleEn: "Lesson 3 · Linear Inequalities",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Quy tắc vàng: NHÂN/CHIA cho số ÂM → đổi chiều bất đẳng thức.\n\nVí dụ:\n−3x + 5 < 14\n−3x < 9\nx > −3 (đổi chiều khi chia −3).\n\nBất phương trình kép:\n2 ≤ 2x − 4 ≤ 10 ⇒ 6 ≤ 2x ≤ 14 ⇒ 3 ≤ x ≤ 7.",
        theoryEn:
          "Golden rule: dividing or multiplying by a NEGATIVE flips the inequality.\n\nExample:\n−3x + 5 < 14\n−3x < 9\nx > −3 (flip when dividing by −3).\n\nCompound inequality:\n2 ≤ 2x − 4 ≤ 10 ⇒ 6 ≤ 2x ≤ 14 ⇒ 3 ≤ x ≤ 7.",
        proTips: ["Khi vẽ trên trục số: dấu '<' hoặc '>' → vòng tròn rỗng; '≤' hoặc '≥' → vòng tròn đặc."],
        proTipsEn: ["On a number line: '<' or '>' = open circle; '≤' or '≥' = filled circle."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Giải bất phương trình:",
            instructionEn: "Solve the inequality:",
            sentences: [
              { text: "4x − 7 > 5 ⇒ x > ___", textEn: "4x − 7 > 5 ⇒ x > ___", answer: "3" },
              { text: "−2x ≥ 10 ⇒ x ≤ ___", textEn: "−2x ≥ 10 ⇒ x ≤ ___", answer: "-5" },
              { text: "1 ≤ 3x − 2 ≤ 7 ⇒ ___ ≤ x ≤ ___ (write '1 to 3').", textEn: "1 ≤ 3x − 2 ≤ 7 ⇒ ___ ≤ x ≤ ___ (write '1 to 3').", answer: "1 to 3" },
            ],
          },
        ],
        quiz: [
          { question: "Dividing both sides by a negative number…", options: ["keeps sign", "flips the sign", "removes sign", "doubles sign"], answer: 1, explanation: "Always flip." },
          { question: "Solution to 5 − 2x ≤ 1?", options: ["x ≤ 2", "x ≥ 2", "x ≤ −2", "x ≥ −2"], answer: 1, explanation: "−2x ≤ −4 → x ≥ 2." },
          { question: "Open circle on a number line means…", options: ["≤", "<", "=", "≥"], answer: 1, explanation: "Open = strict inequality." },
          { question: "Compound 0 < x − 3 < 5 gives…", options: ["3 < x < 8", "−3 < x < 5", "0 < x < 5", "3 ≤ x ≤ 8"], answer: 0, explanation: "Add 3 throughout." },
        ],
      },
      {
        id: "sat-lin-4-word-systems",
        title: "Bài 4 · Word problems dẫn về hệ",
        titleEn: "Lesson 4 · Word Problems → Systems",
        level: 4,
        difficulty: "advanced",
        theory:
          "Quy trình 3 bước:\n1) Đặt 2 biến rõ ràng.\n2) Lập 2 phương trình từ 2 điều kiện.\n3) Giải bằng elimination hoặc Desmos.\n\nVí dụ:\nMua 3 vở + 2 bút = $13. Mua 5 vở + 4 bút = $23. Tìm giá 1 vở.\nĐặt v = vở, b = bút.\n3v + 2b = 13 (×2): 6v + 4b = 26.\nTrừ PT thứ hai: (6v + 4b) − (5v + 4b) = 26 − 23 ⇒ v = 3.\nGiá 1 vở = $3.",
        theoryEn:
          "Three-step routine:\n1) Define 2 variables.\n2) Write 2 equations from 2 conditions.\n3) Solve via elimination or Desmos.\n\nExample:\n3 notebooks + 2 pens = $13. 5 notebooks + 4 pens = $23. Find one notebook's price.\nLet n = notebook, p = pen.\n3n + 2p = 13 (×2): 6n + 4p = 26.\nSubtract second eq: (6n + 4p) − (5n + 4p) = 26 − 23 ⇒ n = 3.\nNotebook = $3.",
        proTips: ["Đọc lại câu hỏi: nó hỏi 1 biến hay TỔNG/HIỆU? Sai bước cuối là lỗi đắt nhất."],
        proTipsEn: ["Re-read the prompt: does it want a single variable or a SUM/DIFFERENCE? Final-step errors cost the most."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Lập hệ rồi giải:",
            instructionEn: "Set up the system and solve:",
            sentences: [
              { text: "Sum of two numbers is 20, difference is 4. Larger number = ___", textEn: "Sum of two numbers is 20, difference is 4. Larger number = ___", answer: "12" },
              { text: "Tickets: adult $8, child $5. 20 tickets sold for $130. Adults = ___", textEn: "Tickets: adult $8, child $5. 20 tickets sold for $130. Adults = ___", answer: "10" },
            ],
          },
        ],
        quiz: [
          { question: "First step on a word→system problem?", options: ["solve", "define 2 variables", "guess", "plug answers"], answer: 1, explanation: "Variables first." },
          { question: "If 2 conditions are given, expect…", options: ["1 equation", "2 equations", "3 equations", "0"], answer: 1, explanation: "Two conditions = two equations." },
          { question: "Last-step error to avoid?", options: ["over-solving", "answering for the wrong variable", "skipping check", "drawing graph"], answer: 1, explanation: "Read what the prompt asks." },
          { question: "Best Desmos move?", options: ["plot both equations and click intersection", "table only", "trace", "label axes"], answer: 0, explanation: "Intersection dot = solution." },
        ],
      },
      {
        id: "sat-lin-5-mixed",
        title: "Bài 5 · Linear · bộ luyện hỗn hợp 95s/câu",
        titleEn: "Lesson 5 · Linear Mixed Drill (95s/item)",
        level: 5,
        difficulty: "advanced",
        theory:
          "Mục tiêu 95s/câu linear. Phân nhánh nhanh:\n• Một biến đơn lẻ → giải tay 30s.\n• Hệ 2 ẩn → Desmos intersection 45s.\n• Bất phương trình + flip → giải tay 60s.\n• Word problem → 3-step routine 90s.\n\nVí dụ phân nhánh: 'Giải 2x + 5 = 17.' → 1 biến → 30s.\n'Giải hệ y = 3x + 1, y = −x + 9.' → Desmos → intersection (2, 7).",
        theoryEn:
          "Target 95s per linear item. Quick triage:\n• Single variable → solve by hand in 30s.\n• 2-variable system → Desmos intersection in 45s.\n• Inequality with flip → solve by hand in 60s.\n• Word problem → 3-step routine in 90s.\n\nTriage example: 'Solve 2x + 5 = 17.' → single variable → 30s.\n'Solve y = 3x + 1, y = −x + 9.' → Desmos → intersection (2, 7).",
        proTips: ["Quá 95s → mark + Desmos plug-in answer choices."],
        proTipsEn: ["Past 95s → mark + Desmos-test the answer choices."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Triage này thuộc nhánh nào?",
            instructionEn: "Which triage branch fits?",
            sentences: [
              { text: "'Solve 5x − 7 = 18.' → ___ variable problem", textEn: "'Solve 5x − 7 = 18.' → ___ variable problem", answer: "single" },
              { text: "'Solve y = 2x + 1 and y = −x + 7.' → use ___", textEn: "'Solve y = 2x + 1 and y = −x + 7.' → use ___", answer: "Desmos" },
            ],
          },
        ],
        quiz: [
          { question: "Best per-linear-item budget?", options: ["30s", "60s", "95s", "180s"], answer: 2, explanation: "95s aligns with overall Math pacing." },
          { question: "2-variable system fastest move?", options: ["substitution by hand", "Desmos intersection", "matrix", "guess"], answer: 1, explanation: "Desmos is faster and visual." },
          { question: "Inequality flip trap is triggered when…", options: ["adding", "subtracting", "dividing by a negative", "multiplying by 1"], answer: 2, explanation: "Negative divide flips the sign." },
          { question: "Past the time cap, what's the move?", options: ["leave blank", "mark + Desmos plug-in", "redo from scratch", "skip whole section"], answer: 1, explanation: "Mark + plug-in keeps the score moving." },
        ],
      },
    ],
  },

  // ════════════════ 4. MATH · Geometry, Trigonometry & Circles
  {
    id: "sat-math-geometry-trig-pack",
    title: "SAT Math · Geometry, Trigonometry & Circles",
    titleEn: "SAT Math · Geometry, Trigonometry & Circles",
    icon: "🟢",
    color: "from-cyan-500 to-blue-600",
    description: "5 bài luyện trục hình học - Pythagoras, similar triangles, SOHCAHTOA, đường tròn & cung.",
    descriptionEn: "Five lessons on the geometry pillar - Pythagoras, similar triangles, SOHCAHTOA, circles & arcs.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-geo-1-pythagoras",
        title: "Bài 1 · Pythagoras & bộ 3 thường gặp",
        titleEn: "Lesson 1 · Pythagoras & Common Triples",
        level: 2,
        difficulty: "beginner",
        theory:
          "Định lý: a² + b² = c² (c = cạnh huyền).\nBộ ba thường gặp: 3-4-5, 5-12-13, 8-15-17, 7-24-25.\n\nVí dụ: cạnh 9 và 12 → tìm cạnh huyền.\n9² + 12² = 81 + 144 = 225 = 15². Cạnh huyền = 15 (bộ 9-12-15 = 3×{3-4-5}).",
        theoryEn:
          "Theorem: a² + b² = c² (c = hypotenuse).\nCommon Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.\n\nExample: legs 9 and 12 → find hypotenuse.\n9² + 12² = 81 + 144 = 225 = 15². Hypotenuse = 15 (9-12-15 = 3×{3-4-5}).",
        proTips: ["Thuộc 4 bộ trên - tiết kiệm 30 giây/câu hình học."],
        proTipsEn: ["Memorise the four triples - saves ~30s per geometry item."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tìm cạnh còn thiếu:",
            instructionEn: "Find the missing side:",
            sentences: [
              { text: "Legs 6 & 8 → hypotenuse = ___", textEn: "Legs 6 & 8 → hypotenuse = ___", answer: "10" },
              { text: "Hypotenuse 13, one leg 5 → other leg = ___", textEn: "Hypotenuse 13, one leg 5 → other leg = ___", answer: "12" },
              { text: "Legs 7 & 24 → hypotenuse = ___", textEn: "Legs 7 & 24 → hypotenuse = ___", answer: "25" },
            ],
          },
        ],
        quiz: [
          { question: "Which is a Pythagorean triple?", options: ["3-4-6", "5-12-13", "6-7-8", "4-5-6"], answer: 1, explanation: "5-12-13 is a classic triple." },
          { question: "Legs 9 and 12 → hypotenuse?", options: ["13", "14", "15", "21"], answer: 2, explanation: "9-12-15 = 3×{3-4-5}." },
          { question: "Pythagoras applies to…", options: ["all triangles", "right triangles only", "circles", "squares"], answer: 1, explanation: "Right triangles only." },
          { question: "Hypotenuse is opposite…", options: ["the smallest angle", "the right angle", "the largest leg only", "any angle"], answer: 1, explanation: "Opposite the 90° angle." },
        ],
      },
      {
        id: "sat-geo-2-similar",
        title: "Bài 2 · Tam giác đồng dạng - tỉ số cạnh",
        titleEn: "Lesson 2 · Similar Triangles - Side Ratios",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Hai tam giác đồng dạng (AA): các góc bằng nhau từng cặp → các cạnh tương ứng có CÙNG tỉ số k.\n\nVí dụ:\n△ABC ~ △DEF với AB = 4, DE = 6 → k = 6/4 = 1.5.\nBC = 5 → EF = 5 × 1.5 = 7.5.\n\nDấu hiệu phổ biến trên đề: hai tam giác chia nhau bởi một đường song song một cạnh → tự động đồng dạng.",
        theoryEn:
          "Two triangles are similar (AA) when angles match pairwise → corresponding sides share the SAME ratio k.\n\nExample:\n△ABC ~ △DEF with AB = 4, DE = 6 → k = 6/4 = 1.5.\nBC = 5 → EF = 5 × 1.5 = 7.5.\n\nClassic SAT cue: a line parallel to one side splits a triangle into two similar triangles.",
        proTips: ["Ghép TƯƠNG ỨNG theo thứ tự góc - AB↔DE, BC↔EF, CA↔FD."],
        proTipsEn: ["Match by vertex order: AB↔DE, BC↔EF, CA↔FD."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Áp dụng tỉ số k:",
            instructionEn: "Apply the ratio k:",
            sentences: [
              { text: "k = 2; cạnh nhỏ 3 → cạnh tương ứng lớn = ___", textEn: "k = 2; small side 3 → matching large side = ___", answer: "6" },
              { text: "AB = 5, DE = 10 → k = ___", textEn: "AB = 5, DE = 10 → k = ___", answer: "2" },
              { text: "k = 1.5; cạnh nhỏ 8 → cạnh lớn = ___", textEn: "k = 1.5; small side 8 → large side = ___", answer: "12" },
            ],
          },
        ],
        quiz: [
          { question: "AA similarity needs…", options: ["1 angle equal", "2 angles equal", "all sides equal", "1 side equal"], answer: 1, explanation: "Two equal angles force the third." },
          { question: "If k = 3 and a small side is 4, large side = ?", options: ["7", "12", "4/3", "1/3"], answer: 1, explanation: "Multiply by k." },
          { question: "A line parallel to one side of a triangle creates…", options: ["congruent halves", "two similar triangles", "right angles", "circles"], answer: 1, explanation: "Classic similarity setup." },
          { question: "Corresponding sides of similar triangles are in…", options: ["arithmetic progression", "the same ratio", "perpendicular", "equal lengths"], answer: 1, explanation: "Same ratio k." },
        ],
      },
      {
        id: "sat-geo-3-soh-cah-toa",
        title: "Bài 3 · SOHCAHTOA & special triangles",
        titleEn: "Lesson 3 · SOHCAHTOA & Special Triangles",
        level: 3,
        difficulty: "intermediate",
        theory:
          "SOHCAHTOA:\nsin θ = opposite / hypotenuse\ncos θ = adjacent / hypotenuse\ntan θ = opposite / adjacent\n\nSpecial triangles:\n• 30°-60°-90° : 1 : √3 : 2\n• 45°-45°-90° : 1 : 1 : √2\n\nVí dụ: trong tam giác vuông, góc 30°, cạnh huyền 10.\nCạnh đối diện 30° = 10 × sin 30° = 10 × 1/2 = 5.",
        theoryEn:
          "SOHCAHTOA:\nsin θ = opposite / hypotenuse\ncos θ = adjacent / hypotenuse\ntan θ = opposite / adjacent\n\nSpecial right triangles:\n• 30°-60°-90° : 1 : √3 : 2\n• 45°-45°-90° : 1 : 1 : √2\n\nExample: right triangle, 30°, hypotenuse 10.\nSide opposite 30° = 10 × sin 30° = 10 × 1/2 = 5.",
        proTips: ["sin (90° − θ) = cos θ - mẹo SAT thường ra dạng đổi đồng phụ."],
        proTipsEn: ["sin (90° − θ) = cos θ - a SAT favourite (complementary angles)."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tính giá trị:",
            instructionEn: "Compute the value:",
            sentences: [
              { text: "sin 30° = ___ (decimal)", textEn: "sin 30° = ___ (decimal)", answer: "0.5" },
              { text: "In a 45°-45°-90° triangle with leg 5, hypotenuse = 5 × ___ (write 'sqrt2').", textEn: "In a 45°-45°-90° triangle with leg 5, hypotenuse = 5 × ___ (write 'sqrt2').", answer: "sqrt2" },
              { text: "cos 60° = sin ___ °", textEn: "cos 60° = sin ___ °", answer: "30" },
            ],
          },
        ],
        quiz: [
          { question: "tan θ equals…", options: ["opp/hyp", "adj/hyp", "opp/adj", "hyp/adj"], answer: 2, explanation: "Tangent = opposite over adjacent." },
          { question: "In 30-60-90, sides ratio is…", options: ["1:1:√2", "1:√3:2", "2:3:4", "3:4:5"], answer: 1, explanation: "Classic ratio." },
          { question: "sin (90° − θ) equals…", options: ["sin θ", "cos θ", "tan θ", "−sin θ"], answer: 1, explanation: "Complementary identity." },
          { question: "In 45-45-90 with leg 7, hypotenuse?", options: ["7√2", "7", "14", "7/√2"], answer: 0, explanation: "Multiply leg by √2." },
        ],
      },
      {
        id: "sat-geo-4-circles",
        title: "Bài 4 · Đường tròn - chu vi, diện tích & cung",
        titleEn: "Lesson 4 · Circles - Circumference, Area & Arcs",
        level: 4,
        difficulty: "advanced",
        theory:
          "Công thức:\n• Chu vi: C = 2πr.\n• Diện tích: A = πr².\n• Độ dài cung: s = r·θ (θ tính bằng radian).\n• Diện tích quạt: A = (1/2)·r²·θ (radian).\n\nĐổi: 180° = π radian → 1° = π/180.\n\nVí dụ: đường tròn r = 6, góc ở tâm 60°.\n60° = π/3.\nĐộ dài cung = 6 × π/3 = 2π.\nDiện tích quạt = (1/2)·6²·π/3 = 6π.",
        theoryEn:
          "Formulas:\n• Circumference: C = 2πr.\n• Area: A = πr².\n• Arc length: s = r·θ (θ in radians).\n• Sector area: A = (1/2)·r²·θ (radians).\n\nConversion: 180° = π rad → 1° = π/180.\n\nExample: circle r = 6, central angle 60°.\n60° = π/3.\nArc length = 6 × π/3 = 2π.\nSector area = (1/2)·6²·π/3 = 6π.",
        proTips: ["Đổi sang radian TRƯỚC khi dùng s = rθ và A = ½r²θ - đây là bẫy phổ biến."],
        proTipsEn: ["Always convert to RADIANS before using s = rθ and A = ½r²θ - common trap."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Đổi độ ↔ radian:",
            instructionEn: "Convert degrees ↔ radians:",
            sentences: [
              { text: "90° = ___ rad (viết 'pi/2').", textEn: "90° = ___ rad (write 'pi/2').", answer: "pi/2" },
              { text: "π rad = ___ °", textEn: "π rad = ___ °", answer: "180" },
              { text: "Arc length for r=10, θ=π/5: s = ___ (viết '2pi').", textEn: "Arc length for r=10, θ=π/5: s = ___ (write '2pi').", answer: "2pi" },
            ],
          },
        ],
        quiz: [
          { question: "Circumference formula?", options: ["πr²", "2πr", "πd²", "r²/2"], answer: 1, explanation: "C = 2πr." },
          { question: "Sector area formula (radian)?", options: ["½ r² θ", "r² θ", "πr², regardless of θ", "rθ"], answer: 0, explanation: "Half r squared theta." },
          { question: "180° equals…", options: ["π/2 rad", "π rad", "2π rad", "π/3 rad"], answer: 1, explanation: "Definition of radian." },
          { question: "Common trap on arc / sector items?", options: ["forgetting r", "using degrees in s = rθ", "wrong π value", "missing area"], answer: 1, explanation: "Must convert to radians first." },
        ],
      },
      {
        id: "sat-geo-5-mixed",
        title: "Bài 5 · Geometry · bộ luyện 95s/câu",
        titleEn: "Lesson 5 · Geometry Mixed Drill (95s/item)",
        level: 5,
        difficulty: "advanced",
        theory:
          "Triage hình học:\n• Tam giác vuông + 2 cạnh → Pythagoras hoặc nhận diện triple.\n• Có góc 30/45/60 → special triangle.\n• Có hình chia bởi đường song song → similar triangles.\n• Có đường tròn + góc → công thức cung / quạt.\n\nVí dụ: cạnh 8 và 15 → nhận diện 8-15-17 → cạnh huyền 17 (không cần bấm máy).",
        theoryEn:
          "Geometry triage:\n• Right triangle + 2 sides → Pythagoras or spot a triple.\n• 30/45/60 angles → special triangle ratios.\n• Figure split by parallel line → similar triangles.\n• Circle + angle → arc / sector formula.\n\nExample: sides 8 and 15 → recognise 8-15-17 → hypotenuse 17 (no calculator).",
        proTips: ["Vẽ lại hình lên scratch paper - đề Bluebook hiển thị nhỏ."],
        proTipsEn: ["Redraw the figure on scratch paper - Bluebook displays them small."],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp lại quy trình triage:",
            instructionEn: "Order the triage routine:",
            items: [
              { scrambled: ["Apply the matching tool (Pythagoras / similar / SOHCAHTOA / circle)", "Identify the figure type", "Redraw the figure"], correct: "Redraw the figure, Identify the figure type, Apply the matching tool (Pythagoras / similar / SOHCAHTOA / circle)" },
            ],
          },
        ],
        quiz: [
          { question: "First geometry move on Bluebook?", options: ["solve", "redraw figure on scratch", "skip", "translate"], answer: 1, explanation: "Redraw fixes small renderings." },
          { question: "Best tool when 30°/60° appears?", options: ["Pythagoras alone", "special triangle ratios", "law of cosines", "circle formulas"], answer: 1, explanation: "1:√3:2 saves time." },
          { question: "Parallel line cutting a triangle suggests…", options: ["congruent triangles", "similar triangles", "circle theorems", "SOHCAHTOA"], answer: 1, explanation: "Parallel = similarity." },
          { question: "Spotting 8-15-17 saves how many computations?", options: ["0", "Pythagoras computation entirely", "1 step", "all algebra"], answer: 1, explanation: "Recognising the triple = no calculation." },
        ],
      },
    ],
  },
];
