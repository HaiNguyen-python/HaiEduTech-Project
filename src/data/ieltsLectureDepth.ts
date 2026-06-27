/**
 * @file ieltsLectureDepth.ts
 * @description Standardised "depth layer" for every IELTS lecture.
 * Returns 3 reinforcement blocks for any lecture: (1) focused explanation
 * of the single core idea, (2) 2 mini worked examples, (3) skill checklist
 * of 5 must-do actions. Content is resolved per-lecture override → family
 * pattern override → skill-based default, so all 135 lectures are covered.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

export interface DepthExample {
  context: string;
  contextVi: string;
  demo: string;
  demoVi: string;
}

export interface DepthChecklist {
  en: string;
  vi: string;
}

export interface LectureDepth {
  focusedExplanation: { en: string; vi: string };
  miniExamples: DepthExample[];
  skillChecklist: DepthChecklist[];
}

// ===================================================================
// FAMILY OVERRIDES — keyed by ID prefix/substring. First match wins.
// Covers the most-overlapped lecture families so each variant gets a
// distinct angle even when topics repeat (e.g. matching-headings × 3).
// ===================================================================
type FamilyEntry = { match: RegExp; depth: LectureDepth };

const FAMILY: FamilyEntry[] = [
  // ---------- READING families ----------
  {
    match: /matching-headings-pro/,
    depth: {
      focusedExplanation: {
        en: "PRO version: stop reading paragraphs in order. Solve the 2 shortest paragraphs first (fastest topic-sentence lock), then use elimination on the rest.",
        vi: "Bản PRO: ngừng đọc đoạn theo thứ tự. Giải 2 đoạn ngắn nhất trước (câu chủ đề lộ nhanh nhất), rồi loại trừ cho các đoạn còn lại.",
      },
      miniExamples: [
        {
          context: "Paragraph C is only 4 lines and starts with 'However, the second wave of reform...'",
          contextVi: "Đoạn C chỉ 4 dòng, bắt đầu bằng 'However, the second wave of reform...'",
          demo: "Lock heading 'A change in policy direction' immediately - the discourse marker 'However + second wave' = direct shift.",
          demoVi: "Chốt ngay heading 'A change in policy direction' - 'However + second wave' = chuyển hướng rõ ràng.",
        },
        {
          context: "Two headings remain: vi 'Economic impact' and viii 'Financial consequences'.",
          contextVi: "Còn 2 heading: vi 'Economic impact' và viii 'Financial consequences'.",
          demo: "Compare the paragraph's noun frequency: 'GDP, growth, output' → Economic; 'cost, debt, revenue' → Financial. Decide on the dominant cluster.",
          demoVi: "So tần suất danh từ trong đoạn: 'GDP, growth, output' → Economic; 'cost, debt, revenue' → Financial. Chọn cụm áp đảo.",
        },
      ],
      skillChecklist: [
        { en: "Read all headings BEFORE the passage and group near-twins", vi: "Đọc TẤT CẢ heading TRƯỚC khi đọc bài và gom các heading gần giống nhau" },
        { en: "Solve shortest paragraphs first - topic sentence is exposed", vi: "Giải đoạn ngắn nhất trước - câu chủ đề lộ rõ" },
        { en: "Lock easy matches → eliminate from remaining list", vi: "Chốt match dễ trước → loại khỏi danh sách còn lại" },
        { en: "For twin headings, count keyword clusters in the paragraph", vi: "Với heading sinh đôi, đếm cụm từ khoá xuất hiện trong đoạn" },
        { en: "Never spend >2 minutes on one paragraph - park & return", vi: "Không bao giờ dành >2 phút cho 1 đoạn - bỏ qua và quay lại" },
      ],
    },
  },
  {
    match: /matching-headings-mastery/,
    depth: {
      focusedExplanation: {
        en: "MASTERY angle: triangulate from THREE signals - topic sentence, repeated noun, and the paragraph's final sentence (which often restates the heading).",
        vi: "Góc MASTERY: tam giác từ 3 tín hiệu - câu chủ đề, danh từ lặp, và câu cuối đoạn (thường nhắc lại heading).",
      },
      miniExamples: [
        {
          context: "Paragraph repeats 'memory, recall, forgetting' across all 6 sentences.",
          contextVi: "Đoạn lặp 'memory, recall, forgetting' xuyên suốt 6 câu.",
          demo: "Heading 'How human memory works' wins by sheer noun density - the topic sentence alone is not enough.",
          demoVi: "Heading 'How human memory works' thắng nhờ mật độ danh từ - chỉ riêng câu chủ đề chưa đủ.",
        },
        {
          context: "Topic sentence sounds general; final sentence says 'These findings forced a complete rewrite of theory X.'",
          contextVi: "Câu chủ đề chung chung; câu cuối nói 'These findings forced a complete rewrite of theory X.'",
          demo: "Pick heading 'A turning point in scientific thinking' - the conclusion sentence is the real signpost.",
          demoVi: "Chọn heading 'A turning point in scientific thinking' - câu kết mới là biển báo thật.",
        },
      ],
      skillChecklist: [
        { en: "Check topic sentence + repeated noun + final sentence", vi: "Kiểm tra câu chủ đề + danh từ lặp + câu kết" },
        { en: "Beware paragraphs that start with example - real idea is sentence 2", vi: "Cảnh giác đoạn mở bằng ví dụ - ý chính thường ở câu 2" },
        { en: "Cross out used headings to shrink the search space", vi: "Gạch bỏ heading đã dùng để thu hẹp không gian" },
        { en: "Reject any heading covering only ONE sentence of the paragraph", vi: "Loại heading chỉ bao trùm 1 câu của đoạn" },
        { en: "After matching all, re-check the 'extra' headings - confirm none fits better", vi: "Sau khi match xong, soát lại các heading thừa - chắc rằng không heading nào hợp hơn" },
      ],
    },
  },
  {
    match: /matching-headings/,
    depth: {
      focusedExplanation: {
        en: "Foundation: a paragraph heading = the answer to 'What is this paragraph mainly about?' - never 'What is mentioned in it?'.",
        vi: "Nền tảng: heading của đoạn = đáp án cho 'Đoạn này nói chính về cái gì?' - không phải 'Có nhắc đến gì?'.",
      },
      miniExamples: [
        {
          context: "Paragraph mentions Mozart in 1 line but discusses Baroque music for 6 lines.",
          contextVi: "Đoạn nhắc Mozart 1 dòng nhưng bàn nhạc Baroque 6 dòng.",
          demo: "Correct heading is about Baroque, NOT Mozart - the brief mention is a decoy.",
          demoVi: "Heading đúng nói về Baroque, KHÔNG phải Mozart - phần nhắc ngắn là bẫy.",
        },
        {
          context: "Two paragraphs both discuss 'pollution', headings vi and viii sound similar.",
          contextVi: "Hai đoạn cùng bàn 'ô nhiễm', heading vi và viii nghe giống nhau.",
          demo: "One heading uses 'causes', the other 'effects' - reread to find verbs of causation vs result.",
          demoVi: "Một heading dùng 'causes', cái còn lại 'effects' - đọc lại tìm động từ nguyên nhân vs kết quả.",
        },
      ],
      skillChecklist: [
        { en: "Translate every heading to its core noun + verb pair", vi: "Quy mỗi heading về cặp danh từ chính + động từ chính" },
        { en: "Beware decoy details mentioned in only 1 sentence", vi: "Cảnh giác chi tiết mồi nhử chỉ xuất hiện 1 câu" },
        { en: "Match the dominant idea, not the surface vocabulary", vi: "Match ý áp đảo, không phải từ ngoài mặt" },
        { en: "Use causation vs result verbs to split twin headings", vi: "Dùng động từ nguyên nhân vs kết quả để tách heading sinh đôi" },
        { en: "Last step: every paragraph has exactly one heading - no duplicates", vi: "Bước cuối: mỗi đoạn đúng 1 heading - không trùng" },
      ],
    },
  },
  {
    match: /matching-information/,
    depth: {
      focusedExplanation: {
        en: "Matching Information ≠ Matching Headings. Here you hunt for a SPECIFIC fact inside any paragraph - paraphrase recognition matters more than topic.",
        vi: "Matching Information ≠ Matching Headings. Đây săn 1 chi tiết CỤ THỂ trong bất kỳ đoạn nào - nhận paraphrase quan trọng hơn chủ đề.",
      },
      miniExamples: [
        {
          context: "Statement: 'an example of a successful pilot project'.",
          contextVi: "Câu hỏi: 'một ví dụ về dự án thử nghiệm thành công'.",
          demo: "Scan for 'trial', 'experiment', 'first attempt' + a positive outcome word ('worked', 'succeeded') in the same sentence.",
          demoVi: "Quét 'trial', 'experiment', 'first attempt' + từ kết quả tích cực ('worked', 'succeeded') trong cùng câu.",
        },
        {
          context: "Statement: 'a comparison between two cultures'.",
          contextVi: "Câu hỏi: 'so sánh giữa hai nền văn hoá'.",
          demo: "Look for connector pairs: 'whereas / unlike / in contrast' tying two country/culture names.",
          demoVi: "Tìm cặp liên từ: 'whereas / unlike / in contrast' nối hai tên quốc gia/văn hoá.",
        },
      ],
      skillChecklist: [
        { en: "Underline the functional noun in the statement (example, reason, comparison...)", vi: "Gạch chân danh từ chức năng (ví dụ, lý do, so sánh...)" },
        { en: "Same paragraph CAN supply multiple answers", vi: "Cùng 1 đoạn CÓ THỂ chứa nhiều đáp án" },
        { en: "Not every paragraph is used - leave blanks until last", vi: "Không phải đoạn nào cũng dùng - để trống đến cuối" },
        { en: "Hunt connectors that signal the function (e.g. 'for instance' = example)", vi: "Săn liên từ báo hiệu chức năng (vd 'for instance' = ví dụ)" },
        { en: "Confirm a paraphrased noun in the same sentence before locking", vi: "Xác nhận danh từ paraphrase trong cùng câu trước khi chốt" },
      ],
    },
  },
  {
    match: /(yes-no-not-given|mastering-tfng)/,
    depth: {
      focusedExplanation: {
        en: "T/F/NG tests FACTS. Y/N/NG tests OPINIONS / claims by the writer. Mixing the two question types is the #1 error.",
        vi: "T/F/NG kiểm tra SỰ THẬT. Y/N/NG kiểm tra QUAN ĐIỂM / luận điểm của tác giả. Nhầm 2 dạng này là lỗi số 1.",
      },
      miniExamples: [
        {
          context: "Statement: 'Solar panels are cheaper than wind turbines.' Passage says nothing about wind turbines.",
          contextVi: "Câu hỏi: 'Pin mặt trời rẻ hơn tua-bin gió.' Bài không nói gì về tua-bin gió.",
          demo: "NOT GIVEN - missing the comparison evidence even if solar prices are discussed.",
          demoVi: "NOT GIVEN - thiếu bằng chứng so sánh dù giá pin mặt trời có nhắc.",
        },
        {
          context: "Statement: 'The author believes AI will replace teachers.' Passage: 'AI may assist teachers but is unlikely to replace them.'",
          contextVi: "Câu hỏi: 'Tác giả tin AI sẽ thay thế giáo viên.' Bài: 'AI có thể hỗ trợ nhưng khó thay thế.'",
          demo: "NO - the author explicitly disagrees with the claim.",
          demoVi: "NO - tác giả nói ngược với câu hỏi.",
        },
      ],
      skillChecklist: [
        { en: "Decide TRUE / FALSE / NOT GIVEN one statement at a time - never compare across", vi: "Quyết từng câu - không so sánh giữa các câu" },
        { en: "Spot quantifiers: all / only / always / never are usually FALSE traps", vi: "Bắt định lượng: all / only / always / never thường là bẫy FALSE" },
        { en: "Missing comparison or missing reason → NOT GIVEN", vi: "Thiếu so sánh hoặc thiếu lý do → NOT GIVEN" },
        { en: "Y/N/NG: ask 'does the writer agree?', not 'is it true?'", vi: "Y/N/NG: hỏi 'tác giả có đồng ý không?', không phải 'có thật không?'" },
        { en: "Answers usually appear in passage order", vi: "Đáp án thường xuất hiện theo thứ tự bài đọc" },
      ],
    },
  },
  {
    match: /summary-completion/,
    depth: {
      focusedExplanation: {
        en: "Summary Completion is a grammar test in disguise: predict the WORD CLASS of each blank before scanning.",
        vi: "Summary Completion thực chất là bài ngữ pháp: dự đoán LOẠI TỪ của mỗi ô trống trước khi quét bài.",
      },
      miniExamples: [
        {
          context: "Blank: 'The treatment caused a sharp ___ in cases.'",
          contextVi: "Ô trống: 'Phương pháp gây ra sự ___ mạnh trong số ca.'",
          demo: "Word class = singular countable NOUN after 'a sharp'. Scan for 'fall / drop / decline / reduction'.",
          demoVi: "Loại từ = DANH TỪ đếm được số ít sau 'a sharp'. Quét 'fall / drop / decline / reduction'.",
        },
        {
          context: "Blank: 'Researchers ___ the original hypothesis after new evidence.'",
          contextVi: "Ô trống: 'Nhà nghiên cứu ___ giả thuyết ban đầu sau khi có bằng chứng mới.'",
          demo: "Word class = past-tense VERB. Scan: 'rejected / abandoned / revised / discarded'.",
          demoVi: "Loại từ = ĐỘNG TỪ quá khứ. Quét: 'rejected / abandoned / revised / discarded'.",
        },
      ],
      skillChecklist: [
        { en: "Label every blank with N / V / ADJ / ADV before scanning", vi: "Đánh nhãn N / V / ADJ / ADV cho mỗi ô trống trước khi quét" },
        { en: "Respect word-limit (NO MORE THAN TWO WORDS = max 2)", vi: "Tôn trọng giới hạn từ (NO MORE THAN TWO WORDS = tối đa 2)" },
        { en: "Words must come from the passage - never paraphrase", vi: "Từ phải lấy nguyên trong bài - không paraphrase" },
        { en: "Re-read your finished summary - it must sound grammatical", vi: "Đọc lại bản summary đã điền - phải đúng ngữ pháp" },
        { en: "Plurals & verb tenses must match the passage exactly", vi: "Số nhiều và thì động từ phải khớp y nguyên" },
      ],
    },
  },
  {
    match: /(reading-skim-scan-deep|skimming-scanning)/,
    depth: {
      focusedExplanation: {
        en: "Three speeds, three purposes: SKIM = topology, SCAN = anchor, DEEP = answer. Using only one speed is the Band 6 ceiling.",
        vi: "Ba tốc độ, ba mục đích: SKIM = bản đồ, SCAN = neo, DEEP = đáp án. Dùng 1 tốc độ là trần Band 6.",
      },
      miniExamples: [
        {
          context: "Question: 'In which year did the EU ban neonicotinoids?'",
          contextVi: "Câu hỏi: 'Năm nào EU cấm neonicotinoids?'",
          demo: "Scan only for 4-digit numbers. Found '2018' next to 'Brussels imposed a full ban'. Answer locked in 8 seconds.",
          demoVi: "Quét chỉ số 4 chữ số. Tìm thấy '2018' cạnh 'Brussels imposed a full ban'. Chốt sau 8 giây.",
        },
        {
          context: "Passage 3 is dense academic and 18 minutes left.",
          contextVi: "Passage 3 học thuật nặng, còn 18 phút.",
          demo: "Skip True/False/NG (slow), tackle Matching Headings first (rewards skim), loop back to T/F/NG with what time remains.",
          demoVi: "Bỏ T/F/NG (chậm), làm Matching Headings trước (thưởng skim), quay lại T/F/NG với thời gian còn.",
        },
      ],
      skillChecklist: [
        { en: "Skim 90s for topology before touching any question", vi: "Skim 90 giây để hiểu bố cục trước khi đụng câu hỏi" },
        { en: "Scan for unique shapes: digits, capitals, italics", vi: "Scan tìm hình thức duy nhất: số, chữ HOA, in nghiêng" },
        { en: "Deep-read only the 2-3 sentences around an anchor", vi: "Deep-read chỉ 2-3 câu quanh từ neo" },
        { en: "20-minute hard stop per passage - protect Passage 3", vi: "Dừng cứng 20 phút/passage - bảo vệ Passage 3" },
        { en: "Never re-read the whole paragraph - re-scan a smaller anchor", vi: "Không đọc lại cả đoạn - quét lại với neo nhỏ hơn" },
      ],
    },
  },
  {
    match: /paraphrase-decoder/,
    depth: {
      focusedExplanation: {
        en: "Every IELTS answer is hidden behind ONE of 4 paraphrase patterns. Learn to label each question with its pattern before scanning.",
        vi: "Mọi đáp án IELTS đều ẩn sau MỘT trong 4 kiểu paraphrase. Học cách dán nhãn kiểu paraphrase cho câu hỏi trước khi quét.",
      },
      miniExamples: [
        {
          context: "Q: 'Most students prefer online classes.'",
          contextVi: "Câu: 'Đa số học sinh thích lớp online hơn.'",
          demo: "Passage: 'Surveys reveal learners overwhelmingly favour remote instruction.' → 'most…prefer' = 'overwhelmingly favour' (Pattern 1 synonym).",
          demoVi: "Bài: 'Surveys reveal learners overwhelmingly favour remote instruction.' → 'most…prefer' = 'overwhelmingly favour' (Pattern 1 đồng nghĩa).",
        },
        {
          context: "Q: 'Transport problems were widespread.'",
          contextVi: "Câu: 'Vấn đề giao thông lan rộng.'",
          demo: "Passage lists 'traffic jams, late buses, expensive fuel' - that's Pattern 4 (generalisation → specification).",
          demoVi: "Bài liệt kê 'tắc đường, xe buýt trễ, xăng đắt' - đó là Pattern 4 (khái quát → cụ thể).",
        },
      ],
      skillChecklist: [
        { en: "Label each question: Pattern 1 / 2 / 3 / 4", vi: "Dán nhãn mỗi câu: Pattern 1 / 2 / 3 / 4" },
        { en: "Confirm at least 2 of 3 keywords are paraphrased", vi: "Xác nhận ít nhất 2/3 từ khoá đã paraphrase" },
        { en: "Exact-word matches are usually traps", vi: "Khớp y chang thường là bẫy" },
        { en: "Pattern 4 generalisation = top NOT GIVEN error source", vi: "Pattern 4 khái quát = nguồn lỗi NOT GIVEN hàng đầu" },
        { en: "Build a weekly synonym bank from missed questions", vi: "Xây từ điển đồng nghĩa hàng tuần từ câu sai" },
      ],
    },
  },
  {
    match: /(reading-time-rescue|tips-reading-cheat-clock)/,
    depth: {
      focusedExplanation: {
        en: "Time rescue is decision triage: identify expensive question types and answer order, not speed-reading.",
        vi: "Cứu thời gian là phân loại quyết định: chọn dạng câu hỏi và thứ tự, không phải đọc nhanh hơn.",
      },
      miniExamples: [
        {
          context: "10 minutes left, 15 questions remaining across two passages.",
          contextVi: "Còn 10 phút, 15 câu trên 2 passage.",
          demo: "Do all Matching Headings + Sentence Completion first (anchors are visible); leave T/F/NG (slow logic) for the last 2 minutes - guess if no time.",
          demoVi: "Làm Matching Headings + Sentence Completion trước (neo rõ); để T/F/NG (suy luận chậm) cho 2 phút cuối - đoán nếu hết giờ.",
        },
        {
          context: "Question feels impossible after 90 seconds.",
          contextVi: "Câu cảm giác bất khả thi sau 90 giây.",
          demo: "Star it, mark 'B' as guess, move on. 5 future questions are worth 1 stuck question.",
          demoVi: "Đánh dấu, đoán 'B', đi tiếp. 5 câu tương lai đáng giá hơn 1 câu kẹt.",
        },
      ],
      skillChecklist: [
        { en: "Pre-allocate 20 minutes per passage - hard stop", vi: "Phân bổ 20 phút/passage - dừng cứng" },
        { en: "Start with fastest question types per passage", vi: "Bắt đầu với dạng câu nhanh nhất trong passage" },
        { en: "Use 'B' as default guess for blank MCQ", vi: "Dùng 'B' làm đáp án đoán mặc định cho MCQ" },
        { en: "Transfer answers in batches of 5, not one-by-one", vi: "Chuyển đáp án theo lô 5 câu, không từng câu" },
        { en: "Last 60 seconds: fill EVERY blank - no penalties", vi: "60 giây cuối: điền MỌI ô trống - không trừ điểm" },
      ],
    },
  },
  {
    match: /keyword-transformation-reading/,
    depth: {
      focusedExplanation: {
        en: "Keyword transformation = a paraphrase between question and answer hidden by morphology (verb→noun, noun→adj).",
        vi: "Keyword transformation = paraphrase giữa câu hỏi và đáp án bị nguỵ trang bằng biến thái (động từ→danh từ, danh từ→tính từ).",
      },
      miniExamples: [
        {
          context: "Q: 'The policy was effectively rolled out.'",
          contextVi: "Câu: 'Chính sách được triển khai hiệu quả.'",
          demo: "Passage: 'The roll-out proved effective.' → noun ↔ verb, adj ↔ adv.",
          demoVi: "Bài: 'The roll-out proved effective.' → danh từ ↔ động từ, tính từ ↔ trạng từ.",
        },
        {
          context: "Q: 'increased significantly'.",
          contextVi: "Câu: 'tăng đáng kể'.",
          demo: "Passage: 'a significant rise / a sharp increase / climbed steeply' - learn the noun/verb/adverb triplet for each concept.",
          demoVi: "Bài: 'a significant rise / a sharp increase / climbed steeply' - học bộ ba danh/động/trạng cho mỗi khái niệm.",
        },
      ],
      skillChecklist: [
        { en: "Build root-word families weekly (decide/decision/decisive)", vi: "Xây họ từ gốc hàng tuần (decide/decision/decisive)" },
        { en: "Watch suffix shifts: -tion, -ment, -ity → noun", vi: "Để ý hậu tố: -tion, -ment, -ity → danh từ" },
        { en: "Verb tense in passage rarely matches question - meaning matters", vi: "Thì động từ trong bài hiếm khớp câu hỏi - quan trọng là nghĩa" },
        { en: "Adverbs of degree (sharply, slightly) are key paraphrase carriers", vi: "Trạng từ mức độ (sharply, slightly) mang paraphrase chính" },
        { en: "Reject any 'match' that needs more than 2 morphology steps", vi: "Loại match cần >2 bước biến hình" },
      ],
    },
  },

  // ---------- LISTENING families ----------
  {
    match: /section1-form|section-1-2|listening-section-strategies/,
    depth: {
      focusedExplanation: {
        en: "Section 1 = personal/transactional details. The trap is spelling, plurals and number formats - not vocabulary.",
        vi: "Section 1 = chi tiết cá nhân/giao dịch. Bẫy là chính tả, số nhiều và định dạng số - không phải từ vựng.",
      },
      miniExamples: [
        {
          context: "Speaker: 'My surname is Phillips - that's P-H-I-L-L-I-P-S.'",
          contextVi: "Người nói: 'Họ tôi là Phillips - P-H-I-L-L-I-P-S.'",
          demo: "Write the spelled-out version, not the first guess. Double 'L' is the trap.",
          demoVi: "Ghi phiên bản đánh vần, không phải bản đoán đầu. 2 'L' là bẫy.",
        },
        {
          context: "Speaker: 'It's three hundred and seventy-five pounds.'",
          contextVi: "Người nói: 'Là ba trăm bảy mươi lăm bảng.'",
          demo: "Write '£375' or '375 pounds' - check whether answer requires symbol or word.",
          demoVi: "Viết '£375' hoặc '375 pounds' - kiểm tra yêu cầu ký hiệu hay chữ.",
        },
      ],
      skillChecklist: [
        { en: "Predict word class for every blank in the form", vi: "Dự đoán loại từ cho mọi ô trong form" },
        { en: "Write spelled-out surnames immediately - don't guess", vi: "Viết họ đánh vần ngay - không đoán" },
        { en: "Watch double letters, silent 'h', '-th' endings", vi: "Coi chừng chữ đôi, 'h' câm, đuôi '-th'" },
        { en: "Numbers: capture as digits to save time", vi: "Số: ghi chữ số để tiết kiệm thời gian" },
        { en: "Re-check plural vs singular before transfer", vi: "Soát số nhiều vs số ít trước khi chuyển đáp án" },
      ],
    },
  },
  {
    match: /(section2-map|map-labeling|map-labelling)/,
    depth: {
      focusedExplanation: {
        en: "Map labelling = orientation language drill. Master 'opposite, adjacent, between, on your left as you enter' before vocabulary.",
        vi: "Map labelling = bài về ngôn ngữ định hướng. Thạo 'opposite, adjacent, between, on your left as you enter' trước từ vựng.",
      },
      miniExamples: [
        {
          context: "Speaker: 'As you enter from the south, the cafe is on your immediate right.'",
          contextVi: "Người nói: 'Vào từ phía nam, quán cafe ngay bên phải bạn.'",
          demo: "Mentally rotate so 'south' is at the BOTTOM, then 'right' on the map becomes WEST.",
          demoVi: "Xoay đầu sao cho 'south' ở DƯỚI, 'right' trên map sẽ là PHÍA TÂY.",
        },
        {
          context: "Speaker: 'opposite the library and just past the fountain'.",
          contextVi: "Người nói: 'đối diện thư viện và vừa qua đài phun nước'.",
          demo: "Find the library first, draw a straight line across, then pick the building AFTER the fountain marker.",
          demoVi: "Tìm thư viện trước, kẻ thẳng sang đối diện, rồi chọn toà nhà SAU đài phun nước.",
        },
      ],
      skillChecklist: [
        { en: "Locate your 'start' marker (entrance/north) before audio plays", vi: "Định vị 'điểm bắt đầu' (cửa vào/bắc) trước khi audio chạy" },
        { en: "Track speaker movement with a pencil tip on the map", vi: "Theo dõi chuyển động của người nói bằng đầu bút trên map" },
        { en: "Learn 5 directional pairs: left/right, opposite/next to, between/among, past/before, in front of/behind", vi: "Thuộc 5 cặp định hướng: trái/phải, đối diện/kế bên, giữa/trong nhóm, qua/trước, trước/sau" },
        { en: "Answers appear in spoken order - never skip ahead", vi: "Đáp án theo thứ tự nói - không nhảy" },
        { en: "If lost, write the next answer and re-orient using a known landmark", vi: "Nếu lạc, ghi đáp án tiếp theo rồi định lại bằng mốc đã biết" },
      ],
    },
  },
  {
    match: /(section3-multi|listening-section-3-4|section3|multi-speaker)/,
    depth: {
      focusedExplanation: {
        en: "Section 3/4 = academic discussion + lecture. The challenge is tracking OPINION changes, not new vocabulary.",
        vi: "Section 3/4 = thảo luận học thuật + bài giảng. Thử thách là theo đổi QUAN ĐIỂM, không phải từ mới.",
      },
      miniExamples: [
        {
          context: "Speaker A: 'I thought the experiment was flawed.' Speaker B: 'Actually, I disagree.'",
          contextVi: "Người A: 'Tôi nghĩ thí nghiệm có lỗi.' Người B: 'Thật ra tôi không đồng ý.'",
          demo: "If the question asks 'What does B think?' → answer is OPPOSITE of A's opinion - watch contrast markers.",
          demoVi: "Nếu hỏi 'B nghĩ gì?' → đáp án NGƯỢC ý A - bắt từ tương phản.",
        },
        {
          context: "Lecturer: 'Initially scientists believed X, but recent studies show Y.'",
          contextVi: "Giảng viên: 'Ban đầu các nhà khoa học tin X, nhưng nghiên cứu mới cho thấy Y.'",
          demo: "If asked 'current view' → answer = Y. If asked 'older view' → answer = X. Track time markers.",
          demoVi: "Hỏi 'quan điểm hiện tại' → Y. Hỏi 'quan điểm cũ' → X. Theo dõi mốc thời gian.",
        },
      ],
      skillChecklist: [
        { en: "Tag each speaker with a single letter as they speak", vi: "Gán mỗi người nói 1 chữ cái khi họ nói" },
        { en: "Catch opinion swivels: 'actually, on the other hand, however'", vi: "Bắt cú lật quan điểm: 'actually, on the other hand, however'" },
        { en: "Distinguish 'I used to think' (past) vs 'I now think' (current)", vi: "Phân biệt 'I used to think' (quá khứ) vs 'I now think' (hiện tại)" },
        { en: "MCQ distractors mirror earlier (rejected) opinions - skip them", vi: "Mồi nhử MCQ lặp lại quan điểm cũ (đã bác) - bỏ" },
        { en: "Trust the LAST statement before the question's keyword", vi: "Tin câu CUỐI trước từ khoá của câu hỏi" },
      ],
    },
  },
  {
    match: /(predict-listen-confirm|signposts-distractors|listening-section-tactics)/,
    depth: {
      focusedExplanation: {
        en: "Pre-listening prediction beats fast note-taking. Spend 30 seconds predicting word class + likely vocabulary BEFORE audio.",
        vi: "Dự đoán trước nghe thắng ghi nhanh. Dành 30 giây dự đoán loại từ + từ vựng có khả năng TRƯỚC khi audio chạy.",
      },
      miniExamples: [
        {
          context: "Gap: 'The fee includes lunch and a ___.'",
          contextVi: "Ô trống: 'Phí bao gồm bữa trưa và ___.'",
          demo: "Predict singular noun = workshop / souvenir / drink. When you hear any of those, lock immediately.",
          demoVi: "Dự đoán danh từ số ít = workshop / souvenir / drink. Nghe thấy chốt ngay.",
        },
        {
          context: "Distractor: 'I was going to suggest the museum, but actually the gallery is better.'",
          contextVi: "Bẫy: 'Tôi định gợi ý bảo tàng, nhưng thực ra phòng tranh tốt hơn.'",
          demo: "Final answer = gallery. 'But actually' overrides the earlier suggestion.",
          demoVi: "Đáp án cuối = phòng tranh. 'But actually' đè đáp án trước.",
        },
      ],
      skillChecklist: [
        { en: "Use the 30-second preview to predict word class + topic", vi: "Dùng 30 giây preview dự đoán loại từ + chủ đề" },
        { en: "Underline the keyword most likely to be paraphrased", vi: "Gạch từ khoá có khả năng paraphrase" },
        { en: "Cancellation words: but, however, actually, on second thoughts", vi: "Từ huỷ: but, however, actually, on second thoughts" },
        { en: "Never lock the first matching option - wait for any reversal", vi: "Không chốt option đầu khớp - đợi đảo chiều" },
        { en: "Move on if you missed an answer - never freeze the audio", vi: "Bỏ qua nếu lỡ - không đông cứng theo audio" },
      ],
    },
  },
  {
    match: /spelling-numbers/,
    depth: {
      focusedExplanation: {
        en: "Spelling and numbers cost more bands than vocabulary in Listening. Drill the 20 most-tested patterns weekly.",
        vi: "Chính tả và số mất band nhiều hơn từ vựng trong Listening. Drill 20 mẫu hay ra hàng tuần.",
      },
      miniExamples: [
        {
          context: "Speaker: 'oh-double-seven-four-five-eight'",
          contextVi: "Người nói: 'oh-double-seven-four-five-eight'",
          demo: "Write '077458' - 'double seven' = 77, 'oh' = 0.",
          demoVi: "Viết '077458' - 'double seven' = 77, 'oh' = 0.",
        },
        {
          context: "Date: 'the third of April twenty-twenty-four'",
          contextVi: "Ngày: 'mùng ba tháng tư năm hai-không-hai-bốn'",
          demo: "Accepted: '3 April 2024', '3rd April 2024', '03/04/2024'. NOT '4/3/2024' (US order).",
          demoVi: "Chấp nhận: '3 April 2024', '3rd April 2024', '03/04/2024'. KHÔNG '4/3/2024' (Mỹ).",
        },
      ],
      skillChecklist: [
        { en: "Practise 0 as 'oh', 'zero', 'nought'", vi: "Luyện 0 là 'oh', 'zero', 'nought'" },
        { en: "'Double X' / 'triple X' patterns", vi: "Mẫu 'double X' / 'triple X'" },
        { en: "British date order: day before month", vi: "Thứ tự ngày Anh: ngày trước tháng" },
        { en: "Capitalise proper nouns - lowercase loses the mark", vi: "Viết hoa danh từ riêng - chữ thường mất điểm" },
        { en: "'Th' endings (Smith, Booth) - common spelling traps", vi: "Đuôi 'Th' (Smith, Booth) - bẫy chính tả phổ biến" },
      ],
    },
  },
  {
    match: /listening-mcq-elimination/,
    depth: {
      focusedExplanation: {
        en: "MCQ in Listening = 3 distractors that are MENTIONED but WRONG. Track 'why each option is wrong' instead of 'which is right'.",
        vi: "MCQ Listening = 3 mồi nhử ĐƯỢC NHẮC nhưng SAI. Theo dõi 'vì sao mỗi option sai' thay vì 'cái nào đúng'.",
      },
      miniExamples: [
        {
          context: "Options: A) library, B) gym, C) cafe. Speaker: 'I went to the library but it was closed, so I worked in the cafe.'",
          contextVi: "Options: A) library, B) gym, C) cafe. Người nói: 'Tôi đến thư viện nhưng đóng cửa, nên làm việc ở cafe.'",
          demo: "A = mentioned but rejected. B = never mentioned. C = the real answer. Eliminate A and B with brief notes.",
          demoVi: "A = nhắc nhưng từ chối. B = không nhắc. C = đáp án thật. Loại A và B bằng ghi chú ngắn.",
        },
        {
          context: "Speaker pauses: 'I was thinking maybe…' - then changes.",
          contextVi: "Người nói ngập ngừng: 'Tôi đang nghĩ có lẽ…' - rồi đổi ý.",
          demo: "Hesitation = decoy alert. Wait for the post-pause answer.",
          demoVi: "Ngập ngừng = cảnh báo mồi. Chờ đáp án sau dấu ngắt.",
        },
      ],
      skillChecklist: [
        { en: "Note an X next to mentioned-but-rejected options", vi: "Đánh X cạnh option nhắc-nhưng-bị-từ-chối" },
        { en: "Wait for the post-correction statement - it carries the answer", vi: "Đợi câu sau hiệu đính - mới mang đáp án" },
        { en: "Distractors usually appear EARLIER than the answer", vi: "Mồi nhử thường xuất hiện TRƯỚC đáp án" },
        { en: "If 2 options seem possible, choose the one with paraphrased keyword", vi: "Nếu 2 option có lý, chọn cái có từ khoá paraphrase" },
        { en: "Never leave blank - guess C (most balanced statistically)", vi: "Không bỏ trống - đoán C (cân bằng nhất thống kê)" },
      ],
    },
  },

  // ---------- WRITING families ----------
  {
    match: /writing-task1-trends/,
    depth: {
      focusedExplanation: {
        en: "Trend Task 1 = movement language + grouping. Strong scripts compare 2 lines per sentence, not describe one at a time.",
        vi: "Trend Task 1 = ngôn ngữ chuyển động + nhóm dữ liệu. Bài mạnh so sánh 2 đường mỗi câu, không tả từng đường.",
      },
      miniExamples: [
        {
          context: "Graph: Coffee +30%, Tea -10% over 5 years.",
          contextVi: "Biểu đồ: Cafe +30%, Trà -10% trong 5 năm.",
          demo: "Strong: 'While coffee consumption climbed by roughly a third, tea sales saw a modest decline of one tenth.' One sentence, two variables.",
          demoVi: "Câu mạnh: 'Trong khi tiêu thụ cafe tăng khoảng một phần ba, doanh số trà giảm nhẹ một phần mười.' Một câu, hai biến.",
        },
        {
          context: "Three lines: Solar surges, Wind plateaus, Coal collapses.",
          contextVi: "Ba đường: Năng lượng mặt trời tăng vọt, gió bão hoà, than sụp đổ.",
          demo: "Group: 'renewables rose' (solar + wind) vs 'fossil fuels fell' (coal). Compare GROUPS, not individual lines.",
          demoVi: "Nhóm: 'năng lượng tái tạo tăng' (mặt trời + gió) vs 'nhiên liệu hoá thạch giảm' (than). So nhóm, không so từng đường.",
        },
      ],
      skillChecklist: [
        { en: "Movement verbs: surge, climb, dip, plateau, plummet, level off", vi: "Động từ chuyển động: surge, climb, dip, plateau, plummet, level off" },
        { en: "Magnitude adverbs: dramatically, marginally, steadily", vi: "Trạng từ mức độ: dramatically, marginally, steadily" },
        { en: "Group similar trends - never describe lines one-by-one", vi: "Gom đường giống nhau - không tả từng đường" },
        { en: "Overview = 2 biggest comparisons, no figures", vi: "Overview = 2 so sánh lớn nhất, không số" },
        { en: "Quote the start figure + end figure + change once per group", vi: "Trích số đầu + cuối + chênh lệch 1 lần mỗi nhóm" },
      ],
    },
  },
  {
    match: /(writing-task1-bar|comparison-table|storytelling-numbers|writing-task1-overview)/,
    depth: {
      focusedExplanation: {
        en: "Static charts/tables reward CATEGORY ranking sentences, not figure-by-figure description.",
        vi: "Biểu đồ/bảng tĩnh thưởng câu xếp hạng theo NHÓM, không tả từng số một.",
      },
      miniExamples: [
        {
          context: "Bar chart: Spending - Food 40%, Transport 25%, Leisure 20%, Other 15%.",
          contextVi: "Cột: Chi tiêu - Ăn uống 40%, Đi lại 25%, Giải trí 20%, Khác 15%.",
          demo: "Strong: 'Food was by far the largest expense at 40%, more than double the share devoted to leisure.' Ranking + comparison in one move.",
          demoVi: "Mạnh: 'Ăn uống là khoản lớn nhất với 40%, hơn gấp đôi mức chi cho giải trí.' Xếp hạng + so sánh trong 1 câu.",
        },
        {
          context: "Table compares 4 countries × 3 categories.",
          contextVi: "Bảng so 4 quốc gia × 3 nhóm.",
          demo: "Group by 'highest performer in each category' to control 12 cells - never read row-by-row.",
          demoVi: "Gom theo 'nước cao nhất mỗi nhóm' để xử 12 ô - không đọc từng dòng.",
        },
      ],
      skillChecklist: [
        { en: "Open paragraph 2 with the dominant category", vi: "Mở đoạn 2 bằng nhóm áp đảo" },
        { en: "Use comparison structures: twice as, just over half, the lowest", vi: "Cấu trúc so sánh: twice as, just over half, the lowest" },
        { en: "Never cite more than 3 figures per sentence", vi: "Không trích quá 3 số mỗi câu" },
        { en: "Overview = highest, lowest, surprising gap - no figures", vi: "Overview = cao nhất, thấp nhất, khoảng cách bất ngờ - không số" },
        { en: "Paraphrase the question prompt in your opening sentence", vi: "Paraphrase đề bài trong câu mở" },
      ],
    },
  },
  {
    match: /(writing-task1-describe-process|task1-maps-diagrams)/,
    depth: {
      focusedExplanation: {
        en: "Process & map tasks reward PASSIVE VOICE + sequencing. Tense = present passive for process, past passive for changes.",
        vi: "Process & map thưởng BỊ ĐỘNG + dãy thời gian. Thì = hiện tại bị động cho quy trình, quá khứ bị động cho thay đổi.",
      },
      miniExamples: [
        {
          context: "Process: bottles → washed → filled → labelled → packed.",
          contextVi: "Quy trình: chai → rửa → đổ đầy → dán nhãn → đóng gói.",
          demo: "'First, the bottles are washed thoroughly. Once cleaned, they are filled with the beverage, after which a label is applied.' Notice the linkers and tense.",
          demoVi: "'First, the bottles are washed thoroughly. Once cleaned, they are filled with the beverage, after which a label is applied.' Để ý liên từ + thì.",
        },
        {
          context: "Map: 1990 - empty land; 2020 - shopping mall + car park.",
          contextVi: "Map: 1990 - đất trống; 2020 - trung tâm mua sắm + bãi xe.",
          demo: "'A shopping mall has been built where farmland once stood, while a multi-storey car park was added to the north.' Past passive + present perfect.",
          demoVi: "'A shopping mall has been built where farmland once stood, while a multi-storey car park was added to the north.' Bị động quá khứ + present perfect.",
        },
      ],
      skillChecklist: [
        { en: "Sequencers: firstly, subsequently, after which, finally", vi: "Liên từ chuỗi: firstly, subsequently, after which, finally" },
        { en: "Process = present simple passive; changes = past simple passive", vi: "Quy trình = hiện tại đơn bị động; thay đổi = quá khứ đơn bị động" },
        { en: "Always count the steps in the diagram before writing", vi: "Đếm số bước trong sơ đồ trước khi viết" },
        { en: "Map = compare BEFORE and AFTER, not just describe AFTER", vi: "Map = so TRƯỚC và SAU, không chỉ tả SAU" },
        { en: "Overview = number of stages + biggest transformation", vi: "Overview = số giai đoạn + biến đổi lớn nhất" },
      ],
    },
  },
  {
    match: /(writing-task2-opinion|task2-agree-disagree)/,
    depth: {
      focusedExplanation: {
        en: "Opinion essays reward a CLEAR thesis in line 2 of the introduction + the same opinion repeated in the conclusion.",
        vi: "Bài Opinion thưởng LUẬN ĐIỂM rõ ở dòng 2 phần mở bài + nhắc lại đúng quan điểm ở kết bài.",
      },
      miniExamples: [
        {
          context: "Prompt: 'Some say universities should be free. To what extent do you agree?'",
          contextVi: "Đề: 'Có ý kiến cho rằng đại học nên miễn phí. Bạn đồng ý đến mức nào?'",
          demo: "Thesis: 'I largely agree, as free higher education broadens opportunity, though governments must regulate quality.' Position + qualifier in one sentence.",
          demoVi: "Luận điểm: 'I largely agree, as free higher education broadens opportunity, though governments must regulate quality.' Quan điểm + giới hạn trong 1 câu.",
        },
        {
          context: "Body 1 supports, Body 2 concedes.",
          contextVi: "Thân 1 ủng hộ, Thân 2 nhượng bộ.",
          demo: "Body 1 topic sentence: 'The most compelling reason is that…' Body 2: 'Admittedly, opponents argue that…, but…' Concede then refute.",
          demoVi: "Câu chủ đề Body 1: 'The most compelling reason is that…' Body 2: 'Admittedly, opponents argue that…, but…' Nhượng rồi bác.",
        },
      ],
      skillChecklist: [
        { en: "State your position by sentence 2 of the introduction", vi: "Nêu quan điểm ở câu 2 phần mở bài" },
        { en: "Hedge with 'largely / to a great extent / on balance'", vi: "Giảm nhẹ với 'largely / to a great extent / on balance'" },
        { en: "One main idea per body paragraph - never two", vi: "Mỗi đoạn thân 1 ý chính - không 2" },
        { en: "Always include 1 concession to score Task Response 7+", vi: "Luôn 1 nhượng bộ để đạt Task Response 7+" },
        { en: "Conclusion = restate the same opinion in different words", vi: "Kết bài = nêu lại quan điểm bằng từ khác" },
      ],
    },
  },
  {
    match: /(discussion-both-views)/,
    depth: {
      focusedExplanation: {
        en: "Discuss both views = mandatory BALANCED body paragraphs + your own opinion. Imbalance is the #1 reason for Band 5.5.",
        vi: "Discuss both views = bắt buộc 2 đoạn thân CÂN BẰNG + quan điểm riêng. Lệch là lý do số 1 ra Band 5.5.",
      },
      miniExamples: [
        {
          context: "Prompt: 'Some argue X, others argue Y. Discuss both and give your opinion.'",
          contextVi: "Đề: 'Một số cho rằng X, người khác cho rằng Y. Bàn cả hai và nêu quan điểm.'",
          demo: "Body 1 = supporters of X (their best argument). Body 2 = supporters of Y. Opinion sentence at the END of intro and START of conclusion.",
          demoVi: "Body 1 = phe ủng hộ X (lập luận mạnh nhất). Body 2 = phe ủng hộ Y. Câu quan điểm ở CUỐI mở bài và ĐẦU kết.",
        },
        {
          context: "Common error: writer's opinion buried in Body 2.",
          contextVi: "Lỗi phổ biến: quan điểm bị giấu trong Body 2.",
          demo: "Always signpost: 'Personally, I believe…' twice - once intro, once conclusion.",
          demoVi: "Luôn báo hiệu: 'Personally, I believe…' hai lần - 1 mở, 1 kết.",
        },
      ],
      skillChecklist: [
        { en: "Word count both body paragraphs - keep within 30 words", vi: "Đếm từ 2 đoạn thân - chênh tối đa 30 từ" },
        { en: "Use 'on the one hand / on the other hand' to flag the split", vi: "Dùng 'on the one hand / on the other hand' báo hiệu" },
        { en: "Discuss the SIDE you disagree with first - then close strong", vi: "Thảo phe bạn KHÔNG đồng ý trước - chốt mạnh ở phe bạn theo" },
        { en: "Opinion must appear in intro AND conclusion", vi: "Quan điểm xuất hiện ở mở bài VÀ kết bài" },
        { en: "Never propose a 'middle' opinion if the prompt asks to pick", vi: "Không chọn quan điểm 'trung dung' nếu đề bắt chọn phe" },
      ],
    },
  },
  {
    match: /(problem-solution|cause-solution)/,
    depth: {
      focusedExplanation: {
        en: "Problem-Solution = ONE problem deeply analysed + ONE actionable solution per body. Listing 3 thin ideas tanks Coherence.",
        vi: "Problem-Solution = MỘT vấn đề phân tích sâu + MỘT giải pháp khả thi mỗi đoạn. Liệt kê 3 ý mỏng làm tụt Coherence.",
      },
      miniExamples: [
        {
          context: "Topic: traffic congestion in cities.",
          contextVi: "Chủ đề: tắc đường ở đô thị.",
          demo: "Body 1 = root cause: 'over-reliance on private cars due to weak public transit, leading to gridlock during peak hours...'. Body 2 = solution: 'congestion pricing has reduced peak traffic by 30% in central London since 2003...'",
          demoVi: "Body 1 = nguyên nhân gốc: 'phụ thuộc xe cá nhân vì giao thông công cộng yếu, gây kẹt giờ cao điểm...'. Body 2 = giải pháp: 'thu phí ùn tắc giảm 30% giao thông giờ cao điểm ở trung tâm London từ 2003...'",
        },
        {
          context: "Weak essay lists 3 problems + 3 solutions in 250 words.",
          contextVi: "Bài yếu liệt 3 vấn đề + 3 giải pháp trong 250 từ.",
          demo: "Cut to 1+1. Add evidence/data. Examiner rewards DEPTH over BREADTH.",
          demoVi: "Cắt còn 1+1. Thêm bằng chứng/số liệu. Examiner thưởng SÂU hơn RỘNG.",
        },
      ],
      skillChecklist: [
        { en: "Identify ROOT cause, not symptom", vi: "Xác định nguyên nhân GỐC, không phải triệu chứng" },
        { en: "Each solution needs a real-world example or data", vi: "Mỗi giải pháp cần ví dụ thực tế hoặc số liệu" },
        { en: "Avoid generic solutions like 'the government should act'", vi: "Tránh giải pháp chung chung kiểu 'chính phủ nên hành động'" },
        { en: "Use cause-effect linkers: as a result, consequently, this leads to", vi: "Dùng liên từ nguyên-quả: as a result, consequently, this leads to" },
        { en: "Conclusion = restate cause + most effective solution", vi: "Kết = nhắc nguyên nhân + giải pháp hiệu quả nhất" },
      ],
    },
  },
  {
    match: /two-part-question|double-question/,
    depth: {
      focusedExplanation: {
        en: "Two-part question = TWO separate body paragraphs, one per question. Mixing both questions in one paragraph drops Task Response.",
        vi: "Two-part question = HAI đoạn thân riêng, mỗi đoạn 1 câu hỏi. Trộn 2 câu trong 1 đoạn làm tụt Task Response.",
      },
      miniExamples: [
        {
          context: "Prompt: 'Why is this trend happening? What problems does it cause?'",
          contextVi: "Đề: 'Vì sao xu hướng này xảy ra? Nó gây ra vấn đề gì?'",
          demo: "Intro must signal: 'This essay will examine the underlying causes and then evaluate the resulting drawbacks.' Body 1 = causes only. Body 2 = problems only.",
          demoVi: "Mở bài phải báo: 'This essay will examine the underlying causes and then evaluate the resulting drawbacks.' Body 1 = chỉ nguyên nhân. Body 2 = chỉ vấn đề.",
        },
        {
          context: "Mistake: answering only question 1 in depth, skimping question 2.",
          contextVi: "Lỗi: chỉ trả lời sâu câu 1, lướt câu 2.",
          demo: "Both questions must receive 100-110 words each - equal weight.",
          demoVi: "Cả 2 câu phải được 100-110 từ mỗi câu - đều trọng số.",
        },
      ],
      skillChecklist: [
        { en: "Underline BOTH question words before planning", vi: "Gạch CẢ 2 từ hỏi trước khi lập dàn ý" },
        { en: "Allocate equal word count to each question", vi: "Phân bổ số từ bằng nhau cho mỗi câu" },
        { en: "Topic sentence must echo the question stem", vi: "Câu chủ đề phải lặp lại từ câu hỏi" },
        { en: "Never blend the 2 answers in one paragraph", vi: "Không trộn 2 câu trả lời vào 1 đoạn" },
        { en: "Conclusion answers BOTH in one sentence each", vi: "Kết bài trả lời CẢ 2 - mỗi cái 1 câu" },
      ],
    },
  },
  {
    match: /(coherence-cohesion|3-layer-paragraph)/,
    depth: {
      focusedExplanation: {
        en: "Coherence is built at the SENTENCE level. The PEEL pattern (Point → Explain → Example → Link) guarantees Band 7 cohesion.",
        vi: "Coherence xây ở cấp CÂU. Mẫu PEEL (Point → Explain → Example → Link) đảm bảo Band 7 cohesion.",
      },
      miniExamples: [
        {
          context: "Idea: working from home boosts productivity.",
          contextVi: "Ý: làm việc tại nhà tăng năng suất.",
          demo: "P: Remote work raises individual output. E: Without commuting, employees gain ~2 hours daily for focused tasks. E: A Stanford study (2023) found a 13% productivity rise. L: This explains why even traditional firms have adopted hybrid models.",
          demoVi: "P: Làm từ xa tăng sản lượng cá nhân. E: Không tốn đi lại, nhân viên có ~2 giờ mỗi ngày cho việc tập trung. E: Nghiên cứu Stanford (2023) thấy năng suất tăng 13%. L: Lý do các công ty truyền thống đã chuyển sang mô hình hybrid.",
        },
        {
          context: "Overused linker: 'In addition' appears 4 times.",
          contextVi: "Liên từ lặp: 'In addition' xuất hiện 4 lần.",
          demo: "Replace with 'Furthermore, Moreover, On top of this, Equally important' - variety = band point.",
          demoVi: "Thay bằng 'Furthermore, Moreover, On top of this, Equally important' - đa dạng = điểm band.",
        },
      ],
      skillChecklist: [
        { en: "Every paragraph follows P-E-E-L exactly", vi: "Mỗi đoạn theo P-E-E-L đúng chuẩn" },
        { en: "Use referencing: this, these, such, the latter", vi: "Dùng tham chiếu: this, these, such, the latter" },
        { en: "Vary linkers - never repeat the same one twice in the essay", vi: "Đổi liên từ - không lặp 1 từ 2 lần trong bài" },
        { en: "Each paragraph topic sentence echoes the thesis once", vi: "Câu chủ đề mỗi đoạn echo luận điểm 1 lần" },
        { en: "End every body paragraph with a 'link forward' sentence", vi: "Kết mỗi đoạn thân bằng 1 câu 'liên kết tới đoạn sau'" },
      ],
    },
  },
  {
    match: /(vn-learner-traps|writing-task2-vn)/,
    depth: {
      focusedExplanation: {
        en: "Vietnamese learner traps: word-for-word translation, missing articles, comma splices, and overusing 'on the other hand'.",
        vi: "Bẫy của người Việt: dịch từng từ, thiếu mạo từ, dấu phẩy nối câu, lạm dụng 'on the other hand'.",
      },
      miniExamples: [
        {
          context: "Direct translation: 'Nowaday society development very fast.'",
          contextVi: "Dịch trực tiếp: 'Nowaday society development very fast.'",
          demo: "Correct: 'Today's society is developing very rapidly.' Subject + verb + adverb of degree.",
          demoVi: "Đúng: 'Today's society is developing very rapidly.' Chủ ngữ + động từ + trạng từ mức độ.",
        },
        {
          context: "Missing article: 'Government should support education.'",
          contextVi: "Thiếu mạo từ: 'Government should support education.'",
          demo: "Use 'The government should support education' - countable singular noun needs an article.",
          demoVi: "Dùng 'The government should support education' - danh từ đếm được số ít cần mạo từ.",
        },
      ],
      skillChecklist: [
        { en: "Never translate Vietnamese sentence structure word-for-word", vi: "Không dịch cấu trúc câu tiếng Việt từng chữ" },
        { en: "Articles: a/an/the for every singular countable noun", vi: "Mạo từ: a/an/the cho mọi danh từ đếm được số ít" },
        { en: "Comma splice fix: , and / ; / . - never just ','", vi: "Sửa dấu phẩy nối câu: , and / ; / . - không chỉ ','" },
        { en: "Limit 'on the other hand' to once per essay", vi: "Giới hạn 'on the other hand' 1 lần/bài" },
        { en: "Read each sentence aloud - if it sounds like Vietnamese, rewrite", vi: "Đọc to từng câu - nếu nghe như tiếng Việt, viết lại" },
      ],
    },
  },

  // ---------- SPEAKING families ----------
  {
    match: /speaking-part1-(family-routine|food-cooking|hobbies-hook|home-work|technology-phone|weather-seasons|work-study|emotion-colours|warm-up-mistakes|natural-answers|extending-answers|expanding)/,
    depth: {
      focusedExplanation: {
        en: "Part 1 = 4-6 sentence answers. The trick is the 3-beat rhythm: Direct Answer → Reason → Mini Example.",
        vi: "Part 1 = câu trả lời 4-6 câu. Mẹo là nhịp 3 bước: Trả lời thẳng → Lý do → Ví dụ nhỏ.",
      },
      miniExamples: [
        {
          context: "Q: 'Do you like cooking?'",
          contextVi: "Hỏi: 'Bạn có thích nấu ăn không?'",
          demo: "DA: 'Absolutely, I'd say it's one of my favourite ways to unwind.' R: 'After a long day, chopping vegetables helps me switch off.' EX: 'Just last weekend I tried a Thai green curry from scratch.'",
          demoVi: "DA: 'Absolutely, I'd say it's one of my favourite ways to unwind.' R: 'After a long day, chopping vegetables helps me switch off.' EX: 'Just last weekend I tried a Thai green curry from scratch.'",
        },
        {
          context: "Q: 'What kind of weather do you prefer?'",
          contextVi: "Hỏi: 'Bạn thích kiểu thời tiết nào?'",
          demo: "'I'm a big fan of cool autumn weather, mainly because it's perfect for being outdoors without feeling sticky - I usually go hiking near my hometown around October.'",
          demoVi: "'I'm a big fan of cool autumn weather, mainly because it's perfect for being outdoors without feeling sticky - I usually go hiking near my hometown around October.'",
        },
      ],
      skillChecklist: [
        { en: "Always start with a Direct Answer - never 'Mmm let me think'", vi: "Luôn bắt đầu bằng câu trả lời thẳng - không 'Mmm let me think'" },
        { en: "Give 1 reason + 1 mini example to hit 4-6 sentences", vi: "Đưa 1 lý do + 1 ví dụ nhỏ để đạt 4-6 câu" },
        { en: "Use natural fillers: actually, to be honest, well…", vi: "Dùng filler tự nhiên: actually, to be honest, well…" },
        { en: "Avoid one-word answers - examiner cannot grade them", vi: "Tránh trả lời 1 từ - examiner không chấm được" },
        { en: "Show personality - examiners reward vivid detail", vi: "Thể hiện cá tính - examiner thưởng chi tiết sinh động" },
      ],
    },
  },
  {
    match: /speaking-part2-(describe-place|describe-object|describe-skill|describe-website-app|describe-difficult-decision|memorable-event|personal-stories|cue-card-stories|the-cue-card-90-second-plan|technique|time-pressure-rescue)/,
    depth: {
      focusedExplanation: {
        en: "Part 2 = 1.5-2 min monologue. Use PPF (Past → Present → Future) to fill time naturally and showcase 3 tenses for Grammar Range.",
        vi: "Part 2 = monolog 1.5-2 phút. Dùng PPF (Quá khứ → Hiện tại → Tương lai) lấp thời gian tự nhiên và phô 3 thì cho Grammar Range.",
      },
      miniExamples: [
        {
          context: "Cue card: 'Describe a place you like to visit.'",
          contextVi: "Cue: 'Tả 1 nơi bạn thích đến.'",
          demo: "Past: 'I first discovered this cafe when I was a student…' Present: 'Nowadays I drop by every weekend to read.' Future: 'I'm planning to bring my parents there next month.'",
          demoVi: "Quá khứ: 'I first discovered this cafe when I was a student…' Hiện tại: 'Nowadays I drop by every weekend to read.' Tương lai: 'I'm planning to bring my parents there next month.'",
        },
        {
          context: "Cue card: 'Describe a skill you'd like to learn.'",
          contextVi: "Cue: 'Tả 1 kỹ năng bạn muốn học.'",
          demo: "Add sensory + emotion detail: 'I can almost picture myself sitting at the piano, fingers trembling but completely absorbed.' Imagery = lexical resource boost.",
          demoVi: "Thêm chi tiết giác quan + cảm xúc: 'I can almost picture myself sitting at the piano, fingers trembling but completely absorbed.' Hình ảnh = nâng lexical resource.",
        },
      ],
      skillChecklist: [
        { en: "Use the 1-minute prep to write 4 keywords - not full sentences", vi: "Dùng 1 phút chuẩn bị viết 4 từ khoá - không phải câu đầy đủ" },
        { en: "Tell a story using PPF tense shifts", vi: "Kể chuyện chuyển thì PPF" },
        { en: "Bring in 1 idiom + 1 advanced collocation", vi: "Đưa vào 1 idiom + 1 collocation cao cấp" },
        { en: "Aim for 1.5-2 minutes - examiner cuts you off when ready", vi: "Mục tiêu 1.5-2 phút - examiner cắt khi đủ" },
        { en: "End with a feeling sentence: 'That experience taught me…'", vi: "Kết câu cảm xúc: 'That experience taught me…'" },
      ],
    },
  },
  {
    match: /speaking-part3-(abstract-debate|cause-effect|comparing-eras|debate-frame-claims|discussion|future-speculation|opinion-with-evidence)/,
    depth: {
      focusedExplanation: {
        en: "Part 3 = abstract discussion. Use the 4F frame: Frame the question → Floor your opinion → Furnish evidence → Forecast a consequence.",
        vi: "Part 3 = thảo luận trừu tượng. Dùng khung 4F: Frame câu hỏi → Floor quan điểm → Furnish bằng chứng → Forecast hệ quả.",
      },
      miniExamples: [
        {
          context: "Q: 'Should young people be encouraged to start businesses?'",
          contextVi: "Hỏi: 'Có nên khuyến khích người trẻ khởi nghiệp?'",
          demo: "F1: 'That's a great question because entrepreneurship is reshaping the job market.' F2: 'Personally, I do think so.' F3: 'Vietnam's startup ecosystem grew 30% last year.' F4: 'If we don't encourage it, talent will simply move abroad.'",
          demoVi: "F1: 'That's a great question because entrepreneurship is reshaping the job market.' F2: 'Personally, I do think so.' F3: 'Vietnam's startup ecosystem grew 30% last year.' F4: 'If we don't encourage it, talent will simply move abroad.'",
        },
        {
          context: "Q: 'How might cities look in 50 years?'",
          contextVi: "Hỏi: 'Thành phố 50 năm nữa thế nào?'",
          demo: "Use speculation grammar: 'It's quite likely that…', 'I wouldn't be surprised if…', 'There's every chance that…' - 3 hedging structures in one answer.",
          demoVi: "Dùng ngữ pháp đoán: 'It's quite likely that…', 'I wouldn't be surprised if…', 'There's every chance that…' - 3 cấu trúc hedge trong 1 câu trả lời.",
        },
      ],
      skillChecklist: [
        { en: "Frame the question before answering - buys you thinking time", vi: "Frame câu hỏi trước khi trả lời - mua thời gian suy nghĩ" },
        { en: "Always furnish 1 piece of evidence (data, anecdote, expert)", vi: "Luôn cung cấp 1 bằng chứng (số, mẩu chuyện, chuyên gia)" },
        { en: "Use 2 hedging structures per answer for Grammar Range", vi: "Dùng 2 cấu trúc hedge mỗi câu trả lời cho Grammar Range" },
        { en: "Avoid yes/no - extend with 'although, on the flip side…'", vi: "Tránh yes/no - mở rộng với 'although, on the flip side…'" },
        { en: "Speak 30-45 seconds per question - shorter loses fluency points", vi: "Nói 30-45 giây/câu - ngắn hơn mất điểm fluency" },
      ],
    },
  },
  {
    match: /speaking-(fluency|intonation|body-language|idioms-collocations|exam-day-nerves|natural-fillers|tips-speaking-general-specific)/,
    depth: {
      focusedExplanation: {
        en: "Delivery skills (rhythm, intonation, fillers) are scored under Fluency & Pronunciation, not Lexical Resource. Practise them with a stopwatch.",
        vi: "Kỹ năng truyền tải (nhịp, ngữ điệu, filler) được chấm ở Fluency & Pronunciation, không phải Lexical Resource. Luyện với đồng hồ bấm giờ.",
      },
      miniExamples: [
        {
          context: "Speaker pauses awkwardly: 'I think… ummm… the answer is… yes.'",
          contextVi: "Người nói ngập ngừng: 'I think… ummm… the answer is… yes.'",
          demo: "Replace silence with natural fillers: 'I think, well, basically the answer is yes - mainly because…'. Same length, no awkward dead air.",
          demoVi: "Thay im lặng bằng filler: 'I think, well, basically the answer is yes - mainly because…'. Cùng độ dài, không khoảng trống.",
        },
        {
          context: "Monotone delivery throughout a 2-minute answer.",
          contextVi: "Giọng đều suốt 2 phút.",
          demo: "Stress content words: 'I ABsolutely LOVE THAI food because it's INCREDibly spicy.' Capital = stressed syllable.",
          demoVi: "Nhấn từ nội dung: 'I ABsolutely LOVE THAI food because it's INCREDibly spicy.' Chữ HOA = âm nhấn.",
        },
      ],
      skillChecklist: [
        { en: "Practise with a metronome at 120 BPM for natural pacing", vi: "Luyện với metronome 120 BPM cho nhịp tự nhiên" },
        { en: "Use 5-6 natural fillers per answer - never 'ummm'", vi: "Dùng 5-6 filler tự nhiên/câu trả lời - không 'ummm'" },
        { en: "Stress content words (nouns, verbs, adjectives)", vi: "Nhấn từ nội dung (danh, động, tính)" },
        { en: "Rising intonation = question/uncertainty; falling = statement", vi: "Lên giọng = câu hỏi/không chắc; xuống = câu khẳng định" },
        { en: "Record + transcribe yourself weekly to spot patterns", vi: "Tự ghi âm + chép lại hàng tuần để soi mẫu" },
      ],
    },
  },

  // ---------- GRAMMAR families ----------
  {
    match: /grammar-articles/,
    depth: {
      focusedExplanation: {
        en: "Articles errors cost ~0.5 band silently. Apply the 3-question test: Specific? Mentioned before? Countable singular?",
        vi: "Lỗi mạo từ âm thầm mất ~0.5 band. Áp dụng 3 câu hỏi: Cụ thể? Đã nhắc trước? Đếm được số ít?",
      },
      miniExamples: [
        {
          context: "Sentence: 'I bought ___ car yesterday. ___ car is electric.'",
          contextVi: "Câu: 'Tôi mua ___ xe hơi hôm qua. ___ xe đó chạy điện.'",
          demo: "'I bought A car… THE car is electric.' First mention = a/an, second mention = the.",
          demoVi: "'I bought A car… THE car is electric.' Nhắc lần đầu = a/an, lần sau = the.",
        },
        {
          context: "Sentence: 'Education is important.' (general truth)",
          contextVi: "Câu: 'Giáo dục quan trọng.' (chân lý chung)",
          demo: "Zero article for uncountable abstract nouns when generic. NOT 'The education is important.'",
          demoVi: "Không mạo từ cho danh từ trừu tượng không đếm được khi chung chung. KHÔNG 'The education is important.'",
        },
      ],
      skillChecklist: [
        { en: "First mention countable = a/an; repeat = the", vi: "Nhắc lần đầu danh từ đếm = a/an; nhắc lại = the" },
        { en: "Plural + uncountable + generic = zero article", vi: "Số nhiều + không đếm + chung = không mạo từ" },
        { en: "Use 'the' for unique nouns (the sun, the government)", vi: "Dùng 'the' cho danh từ duy nhất (the sun, the government)" },
        { en: "Geographic: countries no 'the', oceans/rivers use 'the'", vi: "Địa lý: tên quốc gia không 'the', đại dương/sông có 'the'" },
        { en: "Re-read essay only for articles - find 5 errors minimum", vi: "Đọc lại bài chỉ soi mạo từ - tìm ít nhất 5 lỗi" },
      ],
    },
  },
  {
    match: /grammar-(conditionals|mixed-conditionals)/,
    depth: {
      focusedExplanation: {
        en: "Mixed conditionals demonstrate Band 7+ grammar range. Combine past condition + present result OR present condition + past result.",
        vi: "Mixed conditionals thể hiện grammar range Band 7+. Kết hợp điều kiện quá khứ + kết quả hiện tại HOẶC điều kiện hiện tại + kết quả quá khứ.",
      },
      miniExamples: [
        {
          context: "Past condition → present result.",
          contextVi: "Điều kiện quá khứ → kết quả hiện tại.",
          demo: "'If she had studied medicine (past), she would be a doctor today (present).' Mixed type 3 + 2.",
          demoVi: "'If she had studied medicine (quá khứ), she would be a doctor today (hiện tại).' Mixed type 3 + 2.",
        },
        {
          context: "Present condition → past result.",
          contextVi: "Điều kiện hiện tại → kết quả quá khứ.",
          demo: "'If he were more organised (present), he would have finished the project (past).' Mixed type 2 + 3.",
          demoVi: "'If he were more organised (hiện tại), he would have finished the project (quá khứ).' Mixed type 2 + 3.",
        },
      ],
      skillChecklist: [
        { en: "Use 1 mixed conditional in every Task 2 essay", vi: "Dùng 1 mixed conditional trong mọi bài Task 2" },
        { en: "Inversion option: 'Had she studied medicine, she would…'", vi: "Tuỳ chọn đảo: 'Had she studied medicine, she would…'" },
        { en: "Were (not was) after 'If I…' for hypothetical present", vi: "Were (không was) sau 'If I…' cho giả định hiện tại" },
        { en: "Combine with 'unless / provided that / as long as' for variety", vi: "Kết hợp 'unless / provided that / as long as' cho đa dạng" },
        { en: "Avoid 'will' in the if-clause - common Band 6 trap", vi: "Tránh 'will' trong mệnh đề if - bẫy Band 6 phổ biến" },
      ],
    },
  },
  {
    match: /grammar-(passive-voice|passive-academic)/,
    depth: {
      focusedExplanation: {
        en: "Passive voice signals academic tone but overuse kills clarity. Apply the 'Doer Test': use passive ONLY when the doer is unknown, obvious, or unimportant.",
        vi: "Bị động cho giọng học thuật nhưng lạm dụng giết sự rõ ràng. Áp dụng 'Doer Test': dùng bị động CHỈ KHI người thực hiện không rõ, hiển nhiên, hoặc không quan trọng.",
      },
      miniExamples: [
        {
          context: "Active: 'Scientists in Japan have developed a new battery.'",
          contextVi: "Chủ động: 'Các nhà khoa học Nhật đã phát triển 1 loại pin mới.'",
          demo: "Passive (Task 1): 'A new battery has been developed in Japan.' Doer is unimportant - use passive.",
          demoVi: "Bị động (Task 1): 'A new battery has been developed in Japan.' Người thực hiện không quan trọng - dùng bị động.",
        },
        {
          context: "Process essay: 'The water heats. Then it is filtered.'",
          contextVi: "Bài quy trình: 'The water heats. Then it is filtered.'",
          demo: "Consistent passive: 'The water is heated and then filtered.' Match tense across the chain.",
          demoVi: "Bị động nhất quán: 'The water is heated and then filtered.' Khớp thì cả chuỗi.",
        },
      ],
      skillChecklist: [
        { en: "Use passive in Task 1 process diagrams - mandatory", vi: "Dùng bị động trong sơ đồ quy trình Task 1 - bắt buộc" },
        { en: "Limit passive to 25% of sentences in Task 2", vi: "Giới hạn bị động 25% câu trong Task 2" },
        { en: "Add 'by + agent' only when agent is interesting/new", vi: "Thêm 'by + agent' chỉ khi agent thú vị/mới" },
        { en: "Avoid double passive ('It is said to have been done')", vi: "Tránh bị động kép ('It is said to have been done')" },
        { en: "Reporting verbs love passive: 'It has been argued that…'", vi: "Động từ tường thuật ưa bị động: 'It has been argued that…'" },
      ],
    },
  },
  {
    match: /grammar-(relative-clauses)/,
    depth: {
      focusedExplanation: {
        en: "Relative clauses pack two ideas into one sentence. Master DEFINING vs NON-DEFINING via the comma rule.",
        vi: "Mệnh đề quan hệ gói 2 ý vào 1 câu. Thạo DEFINING vs NON-DEFINING qua quy tắc dấu phẩy.",
      },
      miniExamples: [
        {
          context: "Two sentences: 'The professor is famous. He teaches economics.'",
          contextVi: "Hai câu: 'Vị giáo sư rất nổi tiếng. Ông dạy kinh tế.'",
          demo: "Defining: 'The professor who teaches economics is famous.' Non-defining: 'The professor, who teaches economics, is famous.' Comma changes the meaning.",
          demoVi: "Defining: 'The professor who teaches economics is famous.' Non-defining: 'The professor, who teaches economics, is famous.' Dấu phẩy đổi nghĩa.",
        },
        {
          context: "Reduce a clause for elegance.",
          contextVi: "Rút gọn mệnh đề cho duyên dáng.",
          demo: "'The car that was made in Germany' → 'The car made in Germany' (-ed reduction). Lifts Lexical Resource.",
          demoVi: "'The car that was made in Germany' → 'The car made in Germany' (rút -ed). Nâng Lexical Resource.",
        },
      ],
      skillChecklist: [
        { en: "Defining = no comma + restricts the noun", vi: "Defining = không phẩy + giới hạn danh từ" },
        { en: "Non-defining = comma + extra information", vi: "Non-defining = có phẩy + thông tin thêm" },
        { en: "Use 'whose' for possession, 'which/that' for things", vi: "Dùng 'whose' sở hữu, 'which/that' cho vật" },
        { en: "Reduce 'who is / that is' → present participle ('-ing')", vi: "Rút 'who is / that is' → present participle ('-ing')" },
        { en: "'That' cannot follow a comma - non-defining requires 'which'", vi: "'That' không theo dấu phẩy - non-defining cần 'which'" },
      ],
    },
  },
  {
    match: /grammar-(inversion|cleft-sentences|parallelism-cohesion|noun-phrases|participle-clauses|modal-perfects|modal-verbs-precision)/,
    depth: {
      focusedExplanation: {
        en: "Advanced syntax (inversion, clefts, participles) is the fastest visible Band 7→8 signal. Insert 1 per Task 2 essay.",
        vi: "Cú pháp nâng cao (đảo ngữ, cleft, participle) là tín hiệu nhìn thấy nhanh nhất Band 7→8. Chèn 1 cấu trúc/bài Task 2.",
      },
      miniExamples: [
        {
          context: "Plain: 'I have never seen such a beautiful sunset.'",
          contextVi: "Bình: 'Tôi chưa từng thấy hoàng hôn đẹp như vậy.'",
          demo: "Inversion: 'Never have I seen such a beautiful sunset.' Examiner notices in 2 seconds.",
          demoVi: "Đảo ngữ: 'Never have I seen such a beautiful sunset.' Examiner thấy trong 2 giây.",
        },
        {
          context: "Plain: 'Education is what matters most.'",
          contextVi: "Bình: 'Giáo dục là điều quan trọng nhất.'",
          demo: "Cleft: 'It is education that matters most.' Or: 'What matters most is education.' Two cleft variants for emphasis.",
          demoVi: "Cleft: 'It is education that matters most.' Hoặc: 'What matters most is education.' 2 biến thể cleft nhấn mạnh.",
        },
      ],
      skillChecklist: [
        { en: "Memorise 3 inversion triggers: Never, Rarely, Not only", vi: "Thuộc 3 trigger đảo ngữ: Never, Rarely, Not only" },
        { en: "Use cleft 'It is X that…' to highlight the main point", vi: "Dùng cleft 'It is X that…' làm nổi ý chính" },
        { en: "Insert advanced syntax in topic sentences for visibility", vi: "Chèn cú pháp cao cấp ở câu chủ đề để dễ thấy" },
        { en: "Never use more than 2 inversions per essay - feels forced", vi: "Không quá 2 đảo ngữ/bài - cảm giác gượng" },
        { en: "Pair with strong vocab - syntax alone is not enough", vi: "Kết hợp từ vựng mạnh - chỉ cú pháp chưa đủ" },
      ],
    },
  },
];

// ===================================================================
// SKILL DEFAULTS — fallback when no family pattern matches.
// ===================================================================
const SKILL_DEFAULTS: Record<string, LectureDepth> = {
  reading: {
    focusedExplanation: {
      en: "IELTS Reading is a paraphrase-detection test. The passage holds the words; your job is to map the question's wording onto the passage's wording.",
      vi: "IELTS Reading là bài kiểm tra nhận paraphrase. Bài đọc có sẵn từ; việc của bạn là khớp từ trong câu hỏi với từ trong bài.",
    },
    miniExamples: [
      {
        context: "Question keyword: 'beneficial'.",
        contextVi: "Từ khoá: 'beneficial'.",
        demo: "Look for 'advantageous, helpful, positive impact, of value' in the passage - not the exact word 'beneficial'.",
        demoVi: "Tìm 'advantageous, helpful, positive impact, of value' trong bài - không phải y nguyên 'beneficial'.",
      },
      {
        context: "Question asks about an effect in paragraph X.",
        contextVi: "Câu hỏi về một hiệu ứng trong đoạn X.",
        demo: "Scan for cause-effect linkers: 'consequently, leading to, this resulted in' to locate the answer fast.",
        demoVi: "Quét liên từ nguyên-quả: 'consequently, leading to, this resulted in' để định vị đáp án nhanh.",
      },
    ],
    skillChecklist: [
      { en: "Underline the keyword in each question first", vi: "Gạch từ khoá ở mỗi câu hỏi trước" },
      { en: "Hunt for paraphrased synonyms - not exact matches", vi: "Săn từ paraphrase - không khớp y nguyên" },
      { en: "Answers usually appear in passage order", vi: "Đáp án thường xuất hiện theo thứ tự bài" },
      { en: "Confirm with 2 paraphrased keywords before locking", vi: "Xác nhận 2 từ khoá paraphrase trước khi chốt" },
      { en: "20-minute hard stop per passage - protect Passage 3", vi: "Dừng cứng 20 phút/passage - bảo vệ Passage 3" },
    ],
  },
  listening: {
    focusedExplanation: {
      en: "IELTS Listening rewards prediction. Every 30-second preview is the difference between Band 6 and Band 7.5.",
      vi: "IELTS Listening thưởng dự đoán. Mỗi 30 giây preview là chênh giữa Band 6 và Band 7.5.",
    },
    miniExamples: [
      {
        context: "Gap-fill: 'Cost: $___ per person.'",
        contextVi: "Điền: 'Cost: $___ per person.'",
        demo: "Predict: a 2-3 digit number. When the speaker says any price, lock and move on.",
        demoVi: "Dự đoán: số 2-3 chữ số. Khi người nói nêu giá nào đó, chốt và đi tiếp.",
      },
      {
        context: "MCQ: 3 options about a venue.",
        contextVi: "MCQ: 3 lựa chọn về địa điểm.",
        demo: "Underline the option keyword (gym/library/cafe). When the speaker says it AND a positive verb in the same clause, lock.",
        demoVi: "Gạch từ khoá lựa chọn (gym/library/cafe). Khi người nói nói cả từ đó VÀ động từ tích cực cùng mệnh đề, chốt.",
      },
    ],
    skillChecklist: [
      { en: "Use preview seconds to predict word class + topic", vi: "Dùng giây preview dự đoán loại từ + chủ đề" },
      { en: "Catch cancellation words: but, actually, on second thought", vi: "Bắt từ huỷ: but, actually, on second thought" },
      { en: "Answers appear in spoken order - never skip ahead", vi: "Đáp án theo thứ tự nói - không nhảy" },
      { en: "Check spelling and plurals during transfer time", vi: "Soát chính tả và số nhiều khi chuyển đáp án" },
      { en: "Never leave blank - guess and move on", vi: "Không bỏ trống - đoán và đi tiếp" },
    ],
  },
  writing: {
    focusedExplanation: {
      en: "Writing band rises with DEPTH of one idea, not breadth. One developed argument beats three thin ones every time.",
      vi: "Band Writing tăng nhờ độ SÂU của 1 ý, không phải độ rộng. 1 lập luận sâu thắng 3 ý mỏng mọi lần.",
    },
    miniExamples: [
      {
        context: "Body sentence: 'Pollution is bad for health.'",
        contextVi: "Câu thân bài: 'Ô nhiễm hại sức khoẻ.'",
        demo: "Develop: 'PM2.5 particles penetrate the bloodstream, causing asthma in children at rates 30% higher in industrial cities (WHO 2023).' Specific + cited.",
        demoVi: "Phát triển: 'PM2.5 particles penetrate the bloodstream, causing asthma in children at rates 30% higher in industrial cities (WHO 2023).' Cụ thể + trích nguồn.",
      },
      {
        context: "Linker overuse: 'Moreover' x4 in one essay.",
        contextVi: "Lạm dụng linker: 'Moreover' x4 trong 1 bài.",
        demo: "Vary: 'Furthermore, On top of this, What is more, Equally important' - 1 each maximum.",
        demoVi: "Đa dạng: 'Furthermore, On top of this, What is more, Equally important' - mỗi cái tối đa 1.",
      },
    ],
    skillChecklist: [
      { en: "Plan for 5 minutes - skipping this caps you at Band 6", vi: "Lập dàn 5 phút - bỏ qua = trần Band 6" },
      { en: "Use PEEL in every body paragraph", vi: "Dùng PEEL ở mọi đoạn thân" },
      { en: "Cite 1 real example/statistic per body paragraph", vi: "Trích 1 ví dụ thực/số liệu mỗi đoạn thân" },
      { en: "Vary linkers - never repeat the same one twice", vi: "Đa dạng liên từ - không lặp 1 từ 2 lần" },
      { en: "Leave 3 minutes to proofread for articles, plurals, tense", vi: "Để 3 phút soát mạo từ, số nhiều, thì" },
    ],
  },
  speaking: {
    focusedExplanation: {
      en: "Examiners score what they HEAR in 11 minutes, not what you know. Fluency + clear pronunciation outrank rare vocab.",
      vi: "Examiner chấm cái họ NGHE trong 11 phút, không phải cái bạn biết. Fluency + phát âm rõ thắng từ vựng hiếm.",
    },
    miniExamples: [
      {
        context: "Stuck on a word for 4 seconds.",
        contextVi: "Tịt 1 từ trong 4 giây.",
        demo: "Use rescue phrase: 'how can I put this…', then paraphrase. Silence kills fluency more than a vocab gap.",
        demoVi: "Câu cứu: 'how can I put this…', rồi diễn đạt lại. Im lặng giết fluency hơn từ vựng thiếu.",
      },
      {
        context: "Same answer pattern used twice.",
        contextVi: "Lặp 1 mẫu trả lời 2 lần.",
        demo: "Switch frame: from 'I think' to 'Personally, I'd say…' or 'It strikes me that…'. Variety = lexical resource.",
        demoVi: "Đổi khung: từ 'I think' sang 'Personally, I'd say…' hoặc 'It strikes me that…'. Đa dạng = lexical resource.",
      },
    ],
    skillChecklist: [
      { en: "Use 5-6 natural fillers per answer", vi: "Dùng 5-6 filler tự nhiên/câu trả lời" },
      { en: "Vary opening frames: I'd say, Personally, To be honest", vi: "Đổi khung mở câu: I'd say, Personally, To be honest" },
      { en: "Stress content words for natural rhythm", vi: "Nhấn từ nội dung cho nhịp tự nhiên" },
      { en: "1 idiom + 1 collocation per Part 2 answer", vi: "1 idiom + 1 collocation cho mỗi câu Part 2" },
      { en: "Record yourself weekly - listen for ummm / silence patterns", vi: "Tự ghi âm hàng tuần - nghe mẫu ummm / im lặng" },
    ],
  },
};

const GENERIC_DEFAULT: LectureDepth = SKILL_DEFAULTS.reading;

export function getLectureDepth(lecture: IeltsLecture): LectureDepth {
  // Family match by id pattern
  for (const f of FAMILY) {
    if (f.match.test(lecture.id)) return f.depth;
  }
  // Skill fallback
  if (lecture.skill && SKILL_DEFAULTS[lecture.skill]) {
    return SKILL_DEFAULTS[lecture.skill];
  }
  return GENERIC_DEFAULT;
}
