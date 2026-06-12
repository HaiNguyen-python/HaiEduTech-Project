/**
 * @file ieltsLecturesExpansion5.ts
 * @description Wave 5 — 8 new IELTS lectures with deeper, more vivid teaching:
 * concrete VN-learner mistakes, mini scripts, paraphrase ladders, "Mr Hai's
 * golden secret", and 5–6 quiz questions per lecture (>= padder threshold).
 *
 * Pillar coverage:
 *   - listening x2 (Sec 2 map, Sec 3 multi-speaker)
 *   - reading x2 (Yes/No/Not Given, Summary Completion)
 *   - writing x1 (Task 2 Two-Part question)
 *   - speaking x1 (Part 1 — Hometown / Home / Work)
 *   - tips-hacks x1 (Time management cheat-clock)
 *   - thematic-vocab x1 (Technology — Band 7+)
 *
 * @copyright 2026 HaiEduTech
 */
import type { IeltsLecture } from "./ieltsLecturesData";

export const ieltsLecturesExpansion5: IeltsLecture[] = [
  // ============================================================
  // 1. LISTENING — Section 2 Map / Plan Labelling
  // ============================================================
  {
    id: "listening-section2-map-labelling",
    title: "Listening Section 2 — Map & Plan Labelling Decoder",
    titleVi: "Listening Section 2 — Giải mã đề bản đồ & sơ đồ",
    pillar: "skill-based",
    skill: "listening",
    icon: "🗺️",
    duration: "18 min",
    level: "intermediate",
    description:
      "Map questions terrify candidates because the speaker never says north/south directly. Learn the 4-direction compass trick and the 8 location phrases that unlock every map question.",
    descriptionVi:
      "Bài map khiến thí sinh sợ vì người nói không bao giờ nói 'north/south' trực tiếp. Học mẹo la bàn 4 hướng và 8 cụm chỉ vị trí mở khóa mọi câu map.",
    strategySteps: [
      { step: 1, title: "Orient the map FIRST", titleVi: "Định hướng bản đồ NGAY đầu", description: "Find the entrance/you-are-here arrow and lightly draw N-S-E-W on the corners. 80% of maps put north at the top, but always verify.", descriptionVi: "Tìm mũi tên 'lối vào / you are here' và viết nhẹ N-S-E-W ở 4 góc. 80% bản đồ có north ở trên, nhưng luôn kiểm tra lại." },
      { step: 2, title: "Pre-label fixed landmarks", titleVi: "Đánh dấu mốc cố định trước", description: "Circle anything already named (e.g. 'café', 'lake'). The speaker uses these as REFERENCE points — 'opposite the café', 'just past the lake'.", descriptionVi: "Khoanh tròn mọi tên đã có sẵn. Người nói dùng chúng làm MỐC: 'opposite the café', 'just past the lake'." },
      { step: 3, title: "Listen for movement verbs", titleVi: "Nghe động từ di chuyển", description: "go past / turn left / head north / continue along / take the second turning. These verbs ARE the route — sketch the arrow as you hear it.", descriptionVi: "go past / turn left / head north / continue along / take the second turning. Các động từ này CHÍNH LÀ lộ trình — vẽ mũi tên theo." },
      { step: 4, title: "Eliminate as you go", titleVi: "Loại trừ ngay khi nghe", description: "Once a building is labelled, cross it off. The remaining empty boxes become smaller targets for the next clue.", descriptionVi: "Vừa nghe vừa loại. Mỗi khi gắn nhãn một ô, gạch nó đi để các ô còn lại dễ chọn hơn." },
    ],
    practicalExamples: [
      { context: "Park orientation talk", contextVi: "Giới thiệu công viên", example: "'If you walk past the lake and take the second path on your right, you'll see the café on your left.'", answer: "Café = building west of second right-hand path", explanation: "'second path on your right' + 'on your left' → café sits west of that path." },
      { context: "University campus tour", contextVi: "Tour khuôn viên đại học", example: "'The library is directly opposite the main gate, across the courtyard.'", answer: "Library = north of main gate", explanation: "'directly opposite' = đối diện theo trục — kẻ thẳng vạch qua sân." },
      { context: "Museum floor plan", contextVi: "Sơ đồ bảo tàng", example: "'The gift shop is between the entrance and the toilets, on the same side.'", answer: "Gift shop = middle box on entrance wall", explanation: "'between … on the same side' loại trừ phía đối diện." },
    ],
    mistakesToAvoid: [
      { mistake: "Treating 'left/right' as fixed compass directions", mistakeVi: "Hiểu 'left/right' là hướng la bàn cố định", why: "'Left/right' is relative to the walker's direction. If they turn, left becomes a new direction.", whyVi: "'Left/right' phụ thuộc hướng đi. Khi rẽ, 'left' thành hướng mới." },
      { mistake: "Skipping the pre-labelled landmarks", mistakeVi: "Bỏ qua các mốc đã có sẵn", why: "Speakers anchor every direction to a landmark. Without them you lose the reference frame.", whyVi: "Người nói luôn neo theo mốc. Bỏ qua mốc = mất hệ quy chiếu." },
      { mistake: "Writing answers while still listening", mistakeVi: "Vừa nghe vừa cố viết đáp án", why: "Sketch arrows first; commit letters to the answer sheet only at the 30-second review pause.", whyVi: "Vẽ mũi tên trước; chỉ viết chữ cái cuối cùng vào phiếu lúc nghỉ 30 giây." },
    ],
    goldenSecret: "Always trace your finger on the map AS the speaker moves. If your finger lifts off, you have lost orientation — restart from the last known landmark.",
    goldenSecretVi: "Luôn đặt ngón tay rê theo lời người nói. Nếu ngón tay nhấc lên, bạn đã mất phương hướng — quay lại mốc cuối cùng đã biết.",
    vocabHighlights: [
      { word: "adjacent to", definition: "next to / right beside", definitionVi: "ngay cạnh", example: "The car park is adjacent to the main building.", band: "7.0" },
      { word: "diagonally opposite", definition: "across in a diagonal line", definitionVi: "đối chéo", example: "The bank is diagonally opposite the post office.", band: "7.5" },
      { word: "head towards", definition: "go in the direction of", definitionVi: "đi về phía", example: "Head towards the river and stop at the second bridge.", band: "6.5" },
      { word: "tucked away", definition: "hidden in a corner", definitionVi: "nằm khuất / nép vào", example: "The toilets are tucked away behind the gift shop.", band: "7.5" },
      { word: "on your right-hand side", definition: "to the right of you", definitionVi: "bên phải của bạn", example: "The café is on your right-hand side.", band: "6.0" },
    ],
    quiz: [
      { question: "On an IELTS map, what is usually the FIRST thing you should mark?", options: ["The compass directions on corners", "Every blank answer line", "The teacher's example", "The hardest building"], answer: 0, explanation: "Orient the map (N-S-E-W) before the audio starts to avoid losing reference." },
      { question: "‘Diagonally opposite the lake’ means the building is:", options: ["Right next to the lake", "Across in a diagonal line from the lake", "Directly north of the lake", "Inside the lake area"], answer: 1, explanation: "Diagonally opposite = chéo qua hai góc." },
      { question: "Why is ‘left/right’ risky on IELTS maps?", options: ["It is rarely used", "It depends on the walker's current heading", "It is always wrong", "It only refers to north"], answer: 1, explanation: "Left/right is relative; the walker may have just turned." },
      { question: "What should you do at the 30-second pause?", options: ["Listen again", "Capitalise & verify your letters on the answer sheet", "Erase everything", "Start the next section"], answer: 1, explanation: "Use the pause to finalise capital letters and recheck spellings." },
      { question: "Which phrase signals a final destination?", options: ["Go past", "Continue along", "You'll find it on your left", "Turn right"], answer: 2, explanation: "'You'll find it…' is the arrival cue — commit the answer." },
      { question: "If your tracing finger lifts off the map, you should:", options: ["Guess the rest", "Return to the last known landmark", "Skip to the next question", "Re-read the title"], answer: 1, explanation: "Reset from the last confirmed reference, not from scratch." },
    ],
    cheatSheetPoints: [
      "Mark N-S-E-W on corners before audio.",
      "Circle every pre-labelled landmark.",
      "Trace direction verbs with your finger.",
      "Cross off buildings as you label them.",
      "Capitalise answers only at the 30-second pause.",
    ],
  },

  // ============================================================
  // 2. LISTENING — Section 3 Multi-Speaker Tracking
  // ============================================================
  {
    id: "listening-section3-multi-speaker",
    title: "Listening Section 3 — Tracking 3 Speakers Without Drowning",
    titleVi: "Listening Section 3 — Theo dõi 3 người nói mà không bị ngợp",
    pillar: "skill-based",
    skill: "listening",
    icon: "🎙️",
    duration: "17 min",
    level: "intermediate",
    description:
      "Section 3 is a 4-minute academic discussion with 3 speakers (often a tutor + 2 students). Vietnamese candidates lose marks not because of vocab — but because they cannot tell WHO said WHAT.",
    descriptionVi:
      "Section 3 dài 4 phút với 3 người (thường là tutor + 2 sinh viên). Thí sinh Việt mất điểm không phải vì từ vựng — mà vì không phân biệt được AI nói gì.",
    strategySteps: [
      { step: 1, title: "Use the 30-second intro to ID voices", titleVi: "Dùng 30 giây giới thiệu để nhận giọng", description: "The first speaker (tutor) usually has the lowest pitch. Tag voices in your head: T = tutor, S1 = student-1 (often female), S2 = student-2.", descriptionVi: "Người đầu tiên (tutor) thường có giọng trầm nhất. Gán nhãn trong đầu: T = tutor, S1 = sinh viên 1, S2 = sinh viên 2." },
      { step: 2, title: "Listen for AGREEMENT / DISAGREEMENT markers", titleVi: "Nghe dấu hiệu ĐỒNG Ý / PHẢN ĐỐI", description: "'I see what you mean, but…' / 'Actually…' / 'On the contrary…' signal the answer is the SECOND opinion, not the first.", descriptionVi: "'I see what you mean, but…' / 'Actually…' / 'On the contrary…' báo đáp án là ý KIẾN THỨ HAI, không phải ý đầu." },
      { step: 3, title: "Match question wording to speaker tag", titleVi: "Ghép từ khóa câu hỏi với nhãn người nói", description: "If the question says 'What does the tutor recommend?', only T's lines count. Cross out S1/S2 opinions as distractors.", descriptionVi: "Nếu câu hỏi hỏi 'tutor khuyên gì?', chỉ tính câu của T. Gạch bỏ ý của S1/S2 vì đó là distractor." },
      { step: 4, title: "Tame distractors with the 'last-word-wins' rule", titleVi: "Khắc chế distractor bằng quy tắc 'lời cuối thắng'", description: "When a speaker offers 3 ideas then says 'but in the end I'll go with X', X is the answer — not the earlier alternatives.", descriptionVi: "Khi người nói đưa 3 ý rồi nói 'cuối cùng tôi chọn X', X là đáp án — bỏ các phương án trước đó." },
    ],
    practicalExamples: [
      { context: "Tutorial on a research project", contextVi: "Bàn về dự án nghiên cứu", example: "S1: 'I thought about a survey, but actually a focus group would give us richer data.'", answer: "Focus group", explanation: "'Actually' overrides 'survey'." },
      { context: "Choosing a presentation tool", contextVi: "Chọn công cụ thuyết trình", example: "T: 'You could use slides or a poster, but for this audience I'd really recommend a short video.'", answer: "Short video", explanation: "Tutor's recommendation = the final option after 'I'd really recommend'." },
    ],
    mistakesToAvoid: [
      { mistake: "Writing every key word you hear", mistakeVi: "Chép tất cả từ khóa nghe được", why: "Three voices fill the page with distractors. You only need the answer to YOUR question.", whyVi: "Ba giọng nói sẽ phủ kín giấy bằng distractor. Bạn chỉ cần đáp án cho câu HỎI." },
      { mistake: "Assuming the tutor is always right", mistakeVi: "Mặc định tutor luôn đúng", why: "Sometimes the tutor asks a question and a student gives the correct answer. Trust the wording of the QUESTION.", whyVi: "Đôi khi tutor chỉ đặt câu hỏi, sinh viên đưa đáp án đúng. Hãy bám theo câu hỏi đề." },
    ],
    goldenSecret: "Draw 3 tiny columns at the top of your question paper (T, S1, S2). Tick the column of the speaker who 'wins' each exchange. This visual track-record beats memory every time.",
    goldenSecretVi: "Vẽ 3 cột nhỏ (T, S1, S2) trên đầu đề. Mỗi lần ai 'thắng' lượt trao đổi, đánh tick vào cột người đó. Mắt nhìn cột rõ hơn nhớ trong đầu.",
    vocabHighlights: [
      { word: "to elaborate on", definition: "to give more detail about", definitionVi: "trình bày chi tiết hơn", example: "Could you elaborate on your second point?", band: "7.0" },
      { word: "I'd lean towards", definition: "I prefer (gently)", definitionVi: "tôi nghiêng về", example: "I'd lean towards interviews over surveys.", band: "7.5" },
      { word: "to push back on", definition: "to disagree politely", definitionVi: "phản biện nhẹ nhàng", example: "I'd push back on that — the sample is too small.", band: "7.5" },
      { word: "on reflection", definition: "after thinking about it", definitionVi: "ngẫm lại thì", example: "On reflection, the focus group is the stronger choice.", band: "7.5" },
    ],
    quiz: [
      { question: "Which marker usually signals the CORRECT answer?", options: ["'I see what you mean, but…'", "'Yes exactly'", "'Maybe'", "'I'm not sure'"], answer: 0, explanation: "Contrast markers reverse the previous opinion." },
      { question: "If the question asks 'What does S1 suggest?', you should:", options: ["Listen to every speaker equally", "Focus only on S1's lines", "Trust the tutor's lines", "Pick the longest answer"], answer: 1, explanation: "Match the speaker tag exactly." },
      { question: "The 'last-word-wins' rule means:", options: ["The final option mentioned is the answer", "The first option mentioned is the answer", "The loudest speaker wins", "All options are correct"], answer: 0, explanation: "Speakers often discard earlier ideas before stating their final choice." },
      { question: "‘On reflection’ signals:", options: ["A revised, considered opinion", "A joke", "Disagreement", "A fact"], answer: 0, explanation: "It introduces the speaker's updated view." },
      { question: "Why use the 3-column T/S1/S2 tracker?", options: ["To impress the examiner", "To externalise memory and avoid speaker confusion", "Because it is required", "To save paper"], answer: 1, explanation: "Writing > memory under exam pressure." },
      { question: "Drawing every key word you hear is risky because:", options: ["It is slow and fills the page with distractors", "It saves time", "It guarantees full marks", "It is required by IELTS"], answer: 0, explanation: "Distractors crowd out the real answer." },
    ],
    cheatSheetPoints: [
      "Tag voices T / S1 / S2 in the first 30 seconds.",
      "Match question wording to the right speaker tag.",
      "Contrast markers usually flag the answer.",
      "Apply the 'last-word-wins' rule on long turns.",
      "Use a 3-column tracker, not memory.",
    ],
  },

  // ============================================================
  // 3. READING — Yes / No / Not Given
  // ============================================================
  {
    id: "reading-yes-no-not-given",
    title: "Reading — Yes / No / Not Given Decoded",
    titleVi: "Reading — Giải mã Yes / No / Not Given",
    pillar: "skill-based",
    skill: "reading",
    icon: "✅",
    duration: "20 min",
    level: "intermediate",
    description:
      "Y/N/NG tests the WRITER'S OPINION — not facts. Confusing this with T/F/NG is the #1 reason candidates score Band 5.0 instead of 6.5 in Reading.",
    descriptionVi:
      "Y/N/NG kiểm tra Ý KIẾN của tác giả — không phải sự thật. Nhầm với T/F/NG là lý do số 1 khiến thí sinh dừng ở Band 5.0 thay vì 6.5.",
    strategySteps: [
      { step: 1, title: "Hunt for opinion verbs", titleVi: "Săn động từ thể hiện ý kiến", description: "Underline argue / claim / believe / suggest / propose / insist. These are the writer's voice — only sentences with them carry opinion.", descriptionVi: "Gạch dưới argue / claim / believe / suggest / propose / insist. Đây là tiếng nói tác giả — chỉ câu chứa chúng mới mang ý kiến." },
      { step: 2, title: "Match statement view vs writer view", titleVi: "So khớp quan điểm đề bài vs tác giả", description: "If both say the same thing → YES. If opposites → NO. If the writer never expresses a view on it → NOT GIVEN.", descriptionVi: "Cùng quan điểm → YES. Trái ngược → NO. Tác giả không nêu quan điểm → NOT GIVEN." },
      { step: 3, title: "Beware partial agreement", titleVi: "Cẩn thận đồng ý một phần", description: "'The writer agrees X is important' is FALSE if the writer only says X exists. Existence ≠ opinion.", descriptionVi: "'Tác giả thấy X quan trọng' là SAI nếu tác giả chỉ nói X có tồn tại. Tồn tại ≠ ý kiến." },
      { step: 4, title: "Time-cap each question at 1.5 min", titleVi: "Đặt giới hạn 1.5 phút mỗi câu", description: "If after 90 seconds you cannot find the opinion sentence, write NG and move on. Coming back is cheaper than over-thinking.", descriptionVi: "Sau 90 giây không tìm được câu nêu ý kiến, ghi NG và đi tiếp. Quay lại sau rẻ hơn nghĩ mãi." },
    ],
    practicalExamples: [
      { context: "Writer's claim", contextVi: "Quan điểm tác giả", example: "Passage: 'It is clear that remote work has, on balance, harmed productivity.' Statement: 'The writer believes remote work has reduced productivity.'", answer: "YES", explanation: "Both express the same opinion — harm = reduce." },
      { context: "Opposite opinion", contextVi: "Quan điểm trái ngược", example: "Passage: 'Critics insist exams are outdated, but I would argue they remain the fairest measure available.' Statement: 'The writer believes exams are outdated.'", answer: "NO", explanation: "'I would argue' = tác giả cho rằng KHÔNG outdated." },
      { context: "Not given", contextVi: "Không nêu", example: "Passage: 'Online learning grew rapidly during the pandemic.' Statement: 'The writer believes online learning is better than classroom teaching.'", answer: "NOT GIVEN", explanation: "Passage cites a fact (growth) but no comparison opinion." },
    ],
    mistakesToAvoid: [
      { mistake: "Treating Y/N/NG like T/F/NG", mistakeVi: "Coi Y/N/NG như T/F/NG", why: "Y/N/NG is about opinions. A true fact may still be NOT GIVEN if the writer never expresses agreement.", whyVi: "Y/N/NG hỏi ý kiến. Một sự thật đúng vẫn có thể NG nếu tác giả không nêu quan điểm." },
      { mistake: "Using outside knowledge", mistakeVi: "Dùng kiến thức bên ngoài", why: "What you know is irrelevant. Only the writer's printed opinion counts.", whyVi: "Hiểu biết của bạn không tính. Chỉ tính ý kiến viết trên đề." },
      { mistake: "Choosing NO whenever statement disagrees with a fact", mistakeVi: "Chọn NO khi đề nói ngược với một sự thật", why: "NO requires the WRITER to disagree. A statement that contradicts a fact but is not addressed by the writer is NG.", whyVi: "NO đòi hỏi TÁC GIẢ phải phản đối. Câu trái với một sự thật mà tác giả không bàn = NG." },
    ],
    goldenSecret: "Whisper to yourself: 'Where does the writer take SIDES?' If you cannot point to a side-taking verb (argue/believe/insist), the answer is almost always NOT GIVEN.",
    goldenSecretVi: "Tự nhắc: 'Tác giả có CHỌN PHE ở đâu không?' Không chỉ ra được động từ chọn phe (argue/believe/insist) → đáp án gần như luôn là NOT GIVEN.",
    vocabHighlights: [
      { word: "to contend", definition: "to argue strongly", definitionVi: "lập luận, khẳng định", example: "The author contends that traditional libraries remain relevant.", band: "7.5" },
      { word: "to maintain (a view)", definition: "to keep holding an opinion", definitionVi: "giữ quan điểm", example: "He maintains that automation will create more jobs than it destroys.", band: "7.0" },
      { word: "to be sceptical of", definition: "to doubt", definitionVi: "hoài nghi", example: "The writer is sceptical of universal basic income.", band: "7.5" },
      { word: "to endorse", definition: "to support publicly", definitionVi: "ủng hộ công khai", example: "The report endorses a four-day working week.", band: "7.5" },
    ],
    quiz: [
      { question: "Y/N/NG questions test:", options: ["The writer's OPINIONS", "Factual data only", "Grammar rules", "Vocabulary range"], answer: 0, explanation: "Opinion is the key — fact-only sentences are usually decoys." },
      { question: "Which verb is the strongest opinion signal?", options: ["mention", "argue", "list", "include"], answer: 1, explanation: "Argue takes a side; the others merely report." },
      { question: "Passage states a fact but writer gives no view. The statement asserts the writer agrees. Answer:", options: ["YES", "NO", "NOT GIVEN", "Cannot decide"], answer: 2, explanation: "No opinion = NG, even if the fact is true." },
      { question: "When should you commit to NOT GIVEN?", options: ["When you cannot locate an opinion sentence within ~90 seconds", "Only on the last question", "Never — always pick YES", "Whenever the statement is long"], answer: 0, explanation: "Time-cap + lack of opinion-verb evidence = NG." },
      { question: "Using outside knowledge is:", options: ["Encouraged", "Required for Band 7+", "Forbidden in Y/N/NG", "Only allowed in Listening"], answer: 2, explanation: "Only what the writer prints on the page counts." },
      { question: "'He maintains that automation creates jobs.' This is closest to:", options: ["the writer reports automation neutrally", "the writer expresses an opinion in favour", "the writer disagrees", "the writer is unsure"], answer: 1, explanation: "Maintain = continue to hold an opinion → in favour." },
    ],
    cheatSheetPoints: [
      "Opinion verbs: argue, believe, claim, insist, contend, maintain.",
      "Same view = YES. Opposite view = NO. No view = NOT GIVEN.",
      "Ignore outside knowledge.",
      "Time-cap 1.5 min/question, NG if stuck.",
      "Existence of a fact ≠ writer's opinion.",
    ],
  },

  // ============================================================
  // 4. READING — Summary Completion
  // ============================================================
  {
    id: "reading-summary-completion",
    title: "Reading — Summary Completion in 5 Moves",
    titleVi: "Reading — Hoàn thành đoạn tóm tắt trong 5 bước",
    pillar: "skill-based",
    skill: "reading",
    icon: "📝",
    duration: "18 min",
    level: "intermediate",
    description:
      "Summary tasks combine reading + grammar. You must scan for the right paragraph AND choose a word that grammatically fits the gap.",
    descriptionVi:
      "Bài summary kết hợp reading + ngữ pháp. Bạn vừa phải scan đúng đoạn vừa chọn từ vừa khớp ngữ pháp với chỗ trống.",
    strategySteps: [
      { step: 1, title: "Predict word class FIRST", titleVi: "Đoán LOẠI từ trước", description: "Before scanning, write N (noun), V (verb), Adj, Adv next to each gap. Eliminates 50% of word-box options.", descriptionVi: "Trước khi scan, ghi N (noun), V (verb), Adj, Adv cạnh mỗi chỗ trống. Loại được 50% từ trong hộp." },
      { step: 2, title: "Find the parallel paragraph", titleVi: "Tìm đoạn song song trong bài", description: "The summary usually follows the order of ONE paragraph (or two consecutive ones). Locate it via a unique proper noun / number.", descriptionVi: "Đoạn tóm tắt thường bám theo thứ tự MỘT đoạn (hoặc hai đoạn liền). Tìm bằng danh từ riêng / con số." },
      { step: 3, title: "Match meaning, not exact words", titleVi: "Ghép NGHĨA, không phải từ giống", description: "The passage paraphrases. 'Significant increase' → answer = surge / rise / jump.", descriptionVi: "Bài đọc paraphrase. 'Tăng đáng kể' → đáp án = surge / rise / jump." },
      { step: 4, title: "Test the grammar fit", titleVi: "Thử ráp ngữ pháp", description: "Plug the word into the gap and read aloud silently. If subject-verb agreement or singular/plural breaks → wrong word.", descriptionVi: "Ráp từ vào đọc thầm. Sai chia động từ hay số ít/số nhiều → chọn lại." },
      { step: 5, title: "Lock answers in pencil first", titleVi: "Viết bút chì trước, ô đáp án sau", description: "Summary errors cluster: one wrong fill often pushes 2-3 others off-track. Pencil first, transfer when section is fully checked.", descriptionVi: "Lỗi trong summary kéo theo nhau: sai 1 ô thường kéo 2-3 ô khác. Viết bút chì, chuyển khi kiểm xong cả phần." },
    ],
    practicalExamples: [
      { context: "Summary of a science passage", contextVi: "Tóm tắt bài khoa học", example: "Gap: 'Researchers observed a ___ in coral growth.' Passage: 'Coral grew at almost twice its previous rate.'", answer: "surge / doubling", explanation: "‘Almost twice the rate’ paraphrases as a sudden increase → surge." },
      { context: "History summary", contextVi: "Tóm tắt lịch sử", example: "Gap: 'The treaty was ___ in 1948.' Passage: 'Both nations put pen to paper in 1948.'", answer: "signed", explanation: "‘Put pen to paper’ = signed; verb fits passive structure." },
    ],
    mistakesToAvoid: [
      { mistake: "Copying the first matching word seen", mistakeVi: "Chép từ giống đầu tiên thấy được", why: "Distractor words appear in the passage but break grammar in the gap.", whyVi: "Từ distractor xuất hiện trong bài nhưng phá ngữ pháp chỗ trống." },
      { mistake: "Ignoring the word-limit instruction", mistakeVi: "Bỏ qua giới hạn số từ", why: "‘No more than two words’ — write three and lose the mark even if meaning is right.", whyVi: "‘Không quá 2 từ’ — viết 3 là sai dù nghĩa đúng." },
      { mistake: "Filling gaps in random order", mistakeVi: "Điền lung tung không theo thứ tự", why: "Summaries follow passage order. Random filling causes contamination errors.", whyVi: "Summary theo thứ tự bài. Điền lung tung gây sai dây chuyền." },
    ],
    goldenSecret: "Before writing, READ the whole summary as if the gaps don't exist — then guess each missing word from CONTEXT. Match against the box afterwards. This forces meaning-first thinking.",
    goldenSecretVi: "Trước khi viết, đọc cả đoạn tóm tắt như thể không có chỗ trống — đoán nghĩa từ ngữ cảnh. Sau đó mới đối chiếu với hộp từ. Cách này ép bạn suy nghĩ từ nghĩa trước.",
    vocabHighlights: [
      { word: "to undergo", definition: "to experience a change", definitionVi: "trải qua", example: "The species undergoes a transformation in spring.", band: "7.0" },
      { word: "marked (adj)", definition: "noticeable, significant", definitionVi: "đáng chú ý", example: "There was a marked decline in attendance.", band: "7.5" },
      { word: "to attribute X to Y", definition: "to say X is caused by Y", definitionVi: "quy X là do Y", example: "The team attributed the success to better planning.", band: "7.5" },
      { word: "modest (adj)", definition: "not large", definitionVi: "khiêm tốn, nhỏ", example: "Profits showed a modest rise.", band: "7.0" },
    ],
    quiz: [
      { question: "What should you do BEFORE scanning the passage?", options: ["Predict the word class for each gap", "Copy the first paragraph", "Translate every word", "Time yourself"], answer: 0, explanation: "Word-class prediction eliminates wrong options instantly." },
      { question: "If the passage says 'put pen to paper' and the gap is a verb, the answer is most likely:", options: ["wrote", "signed", "designed", "approved"], answer: 1, explanation: "Idiomatic paraphrase of 'signed'." },
      { question: "Why fill gaps in order?", options: ["Examiners require it", "Summaries follow passage order; out-of-order filling causes chain errors", "It's faster", "It is impossible otherwise"], answer: 1, explanation: "Summary text mirrors passage flow." },
      { question: "‘No more than TWO WORDS’ — you write 'a significant rise'. Result:", options: ["Mark is awarded", "Mark is lost (3 words)", "Mark is halved", "Depends on examiner"], answer: 1, explanation: "Articles count. 3 words = wrong." },
      { question: "The grammar-fit test means:", options: ["Reading the answer aloud silently to test subject-verb / number fit", "Translating to Vietnamese", "Asking a friend", "Skipping the gap"], answer: 0, explanation: "Plug-and-read catches grammatical mismatches." },
      { question: "Best place to write final answers is:", options: ["Directly on the answer sheet first", "Pencil-on-question-paper first, then transfer once the whole section is verified", "Memory only", "Margin of the passage"], answer: 1, explanation: "Pencil-first prevents domino errors." },
    ],
    cheatSheetPoints: [
      "Predict word class per gap.",
      "Locate the parallel paragraph using a unique landmark.",
      "Match MEANING, not appearance.",
      "Respect the word-limit (articles count).",
      "Pencil first, transfer after section check.",
    ],
  },

  // ============================================================
  // 5. WRITING — Task 2 Two-Part / Direct Question
  // ============================================================
  {
    id: "writing-task2-two-part-question",
    title: "Writing Task 2 — Two-Part (Direct) Question Mastery",
    titleVi: "Writing Task 2 — Làm chủ đề hỏi 2 phần (Direct Question)",
    pillar: "skill-based",
    skill: "writing",
    icon: "✍️",
    duration: "22 min",
    level: "advanced",
    description:
      "‘Why does X happen? What can be done?’ — Direct-question essays test whether you can split your answer into TWO equal bodies. Most candidates over-write Part 1 and rush Part 2.",
    descriptionVi:
      "‘Vì sao X xảy ra? Có thể làm gì?’ — Đề Direct-question kiểm tra khả năng chia bài thành HAI thân bài ngang nhau. Đa số thí sinh viết quá dài phần 1, vội vã phần 2.",
    strategySteps: [
      { step: 1, title: "Underline BOTH question parts", titleVi: "Gạch chân CẢ HAI phần đề", description: "Number them Q1 and Q2. Your essay must answer BOTH or you cap at Band 5 on Task Response.", descriptionVi: "Đánh số Q1 và Q2. Bài phải trả lời CẢ HAI, nếu không Task Response tối đa Band 5." },
      { step: 2, title: "Plan a 2-body skeleton", titleVi: "Lên dàn ý 2 thân bài cân bằng", description: "Body 1 = answer Q1 with 2 reasons + examples. Body 2 = answer Q2 with 2 solutions + examples. Equal weight.", descriptionVi: "Body 1 = trả lời Q1 với 2 nguyên nhân + ví dụ. Body 2 = trả lời Q2 với 2 giải pháp + ví dụ. Cân nhau." },
      { step: 3, title: "Use clear signposts", titleVi: "Dùng signpost rõ ràng", description: "Body 1: 'There are two main reasons for this trend…' Body 2: 'To address this, the following measures could be taken…'", descriptionVi: "Body 1: 'There are two main reasons…' Body 2: 'To address this, the following measures…'" },
      { step: 4, title: "Mirror conclusion to both parts", titleVi: "Kết bài soi gương cả hai phần", description: "Conclusion = 2 sentences. Sentence 1 = restate causes. Sentence 2 = restate solutions + outlook.", descriptionVi: "Kết bài = 2 câu. Câu 1 = nhắc lại nguyên nhân. Câu 2 = nhắc lại giải pháp + triển vọng." },
    ],
    practicalExamples: [
      { context: "Prompt", contextVi: "Đề bài", example: "Many cities suffer from severe air pollution. Why is this happening, and what can governments do to solve the problem?", answer: "Body 1: traffic + factories. Body 2: public transport + emission caps.", explanation: "Two causes match two solutions for balanced structure." },
      { context: "Sample sentence", contextVi: "Câu mẫu", example: "‘A primary driver is the relentless growth of private car ownership, which fuels both congestion and toxic emissions.’", answer: "Body 1 topic sentence", explanation: "Strong cause sentence with band-7 vocabulary (relentless, fuels)." },
    ],
    mistakesToAvoid: [
      { mistake: "Writing one giant body about reasons only", mistakeVi: "Viết một thân bài khổng lồ chỉ về nguyên nhân", why: "Ignoring Q2 caps Task Response at Band 5 regardless of language quality.", whyVi: "Bỏ Q2 thì Task Response tối đa Band 5 dù ngôn ngữ tốt." },
      { mistake: "Listing 5 solutions superficially", mistakeVi: "Liệt kê 5 giải pháp hời hợt", why: "Examiners reward 2 fully-developed ideas over 5 shallow ones (Coherence & Cohesion).", whyVi: "Giám khảo chấm cao 2 ý sâu hơn 5 ý nông (Coherence & Cohesion)." },
      { mistake: "Forgetting to give YOUR position", mistakeVi: "Quên nêu quan điểm của BẠN", why: "Direct-question essays still need a thesis statement: 'I will outline two key causes and propose two practical solutions.'", whyVi: "Direct-question vẫn cần thesis: 'I will outline two key causes and propose two practical solutions.'" },
    ],
    goldenSecret: "Set a stop-watch: 20 minutes for Body 1, 20 for Body 2. The moment Body 1 hits 130 words, STOP and switch — no exceptions. Equal length = equal score weight.",
    goldenSecretVi: "Bấm đồng hồ: 20 phút Body 1, 20 phút Body 2. Khi Body 1 chạm 130 từ, DỪNG và đổi — không ngoại lệ. Cân số từ = cân điểm.",
    vocabHighlights: [
      { word: "the root cause", definition: "the main, original reason", definitionVi: "nguyên nhân gốc rễ", example: "The root cause of obesity is sedentary lifestyle.", band: "7.0" },
      { word: "to mitigate", definition: "to reduce harm", definitionVi: "giảm nhẹ", example: "Investing in green transport can mitigate urban pollution.", band: "7.5" },
      { word: "a viable solution", definition: "a workable solution", definitionVi: "giải pháp khả thi", example: "Congestion charges are a viable solution adopted in London.", band: "7.5" },
      { word: "to curb", definition: "to limit / restrain", definitionVi: "kiềm chế", example: "Stricter emission caps would curb factory pollution.", band: "7.5" },
      { word: "a multi-pronged approach", definition: "a strategy with several parts", definitionVi: "cách tiếp cận đa mũi", example: "Tackling youth unemployment requires a multi-pronged approach.", band: "8.0" },
    ],
    quiz: [
      { question: "Direct-question essays REQUIRE you to:", options: ["Pick one part to answer", "Answer both parts equally", "Disagree with the prompt", "Add a personal story"], answer: 1, explanation: "Ignoring one part caps TR at Band 5." },
      { question: "Best Body-1 topic sentence:", options: ["First of all I will talk about reasons.", "There are two main reasons for this worrying trend.", "Many things cause pollution.", "Pollution is bad."], answer: 1, explanation: "Clear, signposted, and previews 2 ideas." },
      { question: "Stop-watch rule recommends switching at:", options: ["100 words", "130 words", "200 words", "Whenever inspired"], answer: 1, explanation: "Forced balance between Body 1 and Body 2." },
      { question: "Which vocabulary best replaces 'reduce pollution'?", options: ["fight pollution", "mitigate pollution", "talk about pollution", "watch pollution"], answer: 1, explanation: "Mitigate is precise and band-7+." },
      { question: "Why prefer 2 deep ideas over 5 shallow ideas?", options: ["Faster to write", "Higher Coherence & Cohesion + Task Response marks", "More words", "Less risk of grammar errors"], answer: 1, explanation: "Depth wins both TR and C&C bands." },
      { question: "‘Multi-pronged approach’ means:", options: ["A single big solution", "A strategy with several coordinated parts", "A failed plan", "A government-only plan"], answer: 1, explanation: "Multi-pronged = many parallel actions." },
    ],
    cheatSheetPoints: [
      "Underline & number both question parts.",
      "Equal-length bodies: 130 words each.",
      "Signposts: 'two main reasons' / 'two practical solutions'.",
      "Thesis statement still required.",
      "Conclusion mirrors causes + solutions in 2 sentences.",
    ],
  },

  // ============================================================
  // 6. SPEAKING — Part 1 Hometown / Home / Work
  // ============================================================
  {
    id: "speaking-part1-home-work",
    title: "Speaking Part 1 — Hometown, Home & Work (Confidence Engine)",
    titleVi: "Speaking Part 1 — Hometown, Home & Work (Cỗ máy tự tin)",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🏠",
    duration: "15 min",
    level: "foundation",
    description:
      "The first 4 minutes shape the examiner's impression. Use ready-to-deploy templates for the 3 most common Part 1 topics without sounding rehearsed.",
    descriptionVi:
      "4 phút đầu định hình ấn tượng giám khảo. Dùng template sẵn cho 3 chủ đề Part 1 phổ biến nhất mà vẫn nghe tự nhiên.",
    strategySteps: [
      { step: 1, title: "Use the ARE formula (Answer • Reason • Example)", titleVi: "Dùng công thức ARE (Trả lời • Lý do • Ví dụ)", description: "Each Part 1 answer = 2-3 sentences: direct answer → because → for example.", descriptionVi: "Mỗi câu Part 1 = 2-3 câu: trả lời thẳng → vì → ví dụ." },
      { step: 2, title: "Personalise stock phrases", titleVi: "Cá nhân hóa cụm có sẵn", description: "‘I was born and raised in Hue, a peaceful city in central Vietnam known for its imperial cuisine.’ — one ready sentence covers 5 possible questions.", descriptionVi: "‘I was born and raised in Hue, a peaceful city in central Vietnam known for its imperial cuisine.’ — một câu sẵn dùng cho 5 câu hỏi." },
      { step: 3, title: "Avoid yes/no dead-ends", titleVi: "Tránh đáp Yes/No cụt", description: "Never answer ‘Yes I do.’ Always extend: ‘Yes I do, mainly because…’.", descriptionVi: "Đừng đáp ‘Yes I do.’ Luôn mở rộng: ‘Yes I do, mainly because…’" },
      { step: 4, title: "Keep tone warm, not robotic", titleVi: "Giữ giọng ấm, không như robot", description: "Use light fillers ('actually', 'to be honest', 'I'd say') in moderation. They show fluency control, not memorisation.", descriptionVi: "Dùng filler nhẹ ('actually', 'to be honest', 'I'd say') vừa phải. Chúng thể hiện lưu loát, không phải học thuộc." },
    ],
    practicalExamples: [
      { context: "Q: Where are you from?", contextVi: "Hỏi quê quán", example: "‘I'm originally from Da Nang, a coastal city in central Vietnam famous for its beaches and seafood. I moved to Hanoi three years ago for university.’", answer: "ARE structure: answer + reason + example", explanation: "Covers hometown, location, reason for move — 3 follow-ups pre-answered." },
      { context: "Q: Do you prefer living in a house or a flat?", contextVi: "Thích nhà hay căn hộ?", example: "‘To be honest, I much prefer a flat because the city centre is just a short walk away, and I don't have to worry about maintenance like gardening.’", answer: "Opinion + two reasons", explanation: "‘To be honest’ + comparative + two distinct reasons = Band 7 hallmark." },
      { context: "Q: What do you do?", contextVi: "Bạn làm nghề gì?", example: "‘I'm currently a final-year student majoring in International Business, and I also do part-time content writing on weekends to gain real-world experience.’", answer: "Identity + side activity", explanation: "Adds depth without rambling — perfect 12-second answer." },
    ],
    mistakesToAvoid: [
      { mistake: "Memorised speeches that sound rehearsed", mistakeVi: "Bài học thuộc nghe như đọc", why: "Examiners are trained to detect memorisation and may penalise Fluency & Coherence.", whyVi: "Giám khảo phát hiện học thuộc và trừ điểm Fluency & Coherence." },
      { mistake: "Over-using ‘I think’", mistakeVi: "Lạm dụng ‘I think’", why: "Rotate with ‘I'd say’, ‘In my view’, ‘Personally’ to show range.", whyVi: "Đổi sang ‘I'd say’, ‘In my view’, ‘Personally’ để khoe vốn." },
      { mistake: "Answering longer than 30 seconds", mistakeVi: "Trả lời quá 30 giây", why: "Part 1 is rapid-fire. Long answers eat into Part 3 thinking time.", whyVi: "Part 1 nhanh. Trả lời dài cắt mất thời gian Part 3." },
    ],
    goldenSecret: "Prepare ONE rich ‘home base’ sentence about your city/job/home. Recycle and reshape it across questions — examiners want fluency, not unique content.",
    goldenSecretVi: "Soạn MỘT câu ‘home base’ giàu thông tin về thành phố/nghề/nhà. Tái sử dụng và biến hóa qua nhiều câu hỏi — giám khảo cần lưu loát, không cần nội dung mới mỗi câu.",
    vocabHighlights: [
      { word: "born and raised in", definition: "born and grew up in", definitionVi: "sinh ra và lớn lên ở", example: "I was born and raised in Hai Phong.", band: "6.5" },
      { word: "a stone's throw from", definition: "very close to", definitionVi: "rất gần", example: "My flat is a stone's throw from the river.", band: "7.5" },
      { word: "to settle down", definition: "to live somewhere permanently", definitionVi: "định cư", example: "I plan to settle down in Da Lat eventually.", band: "7.0" },
      { word: "off the beaten track", definition: "not commonly visited", definitionVi: "ít người biết tới", example: "My hometown is off the beaten track but charming.", band: "7.5" },
    ],
    quiz: [
      { question: "ARE stands for:", options: ["Answer • Reason • Example", "Argue • Repeat • Echo", "Ask • Reply • End", "Adverb • Relative • Emphasis"], answer: 0, explanation: "ARE = Answer + Reason + Example." },
      { question: "Best response to ‘Do you live in a house or a flat?’", options: ["A flat.", "Yes I do.", "I live in a flat because the centre is just a short walk away.", "Maybe."], answer: 2, explanation: "Direct answer + reason = ARE in action." },
      { question: "Why avoid memorised speeches?", options: ["They are faster", "Examiners penalise detection of memorisation", "They are required", "They sound natural"], answer: 1, explanation: "Memorisation hurts Fluency & Coherence." },
      { question: "Which phrase shows higher range?", options: ["I think", "I'd say / In my view / Personally (rotated)", "Yes", "I don't know"], answer: 1, explanation: "Variation = lexical resource." },
      { question: "Ideal Part 1 answer length:", options: ["~12-25 seconds (2-3 sentences)", "60 seconds", "100 seconds", "1 word"], answer: 0, explanation: "Part 1 is rapid-fire." },
      { question: "‘A stone's throw from’ means:", options: ["Far away", "Very close to", "Above", "Below"], answer: 1, explanation: "Idiom for proximity." },
    ],
    cheatSheetPoints: [
      "ARE: Answer → Reason → Example.",
      "One ‘home base’ sentence, recycled.",
      "Never yes/no — always extend.",
      "12-25 seconds per answer.",
      "Rotate opinion phrases for lexical range.",
    ],
  },

  // ============================================================
  // 7. TIPS — Reading Time-Management Cheat Clock
  // ============================================================
  {
    id: "tips-reading-cheat-clock",
    title: "Mr Hai's Cheat-Clock — 60-Minute Reading Game Plan",
    titleVi: "Đồng hồ thần thánh — Phân bổ 60 phút Reading",
    pillar: "tips-hacks",
    icon: "⏱️",
    duration: "12 min",
    level: "intermediate",
    description:
      "The single biggest reason Vietnamese candidates score Band 5.5 instead of 7.0 in Reading is time mismanagement on Passage 3. This is the surgical fix.",
    descriptionVi:
      "Lý do số một khiến thí sinh Việt dừng ở Band 5.5 thay vì 7.0 Reading là quản lý thời gian sai ở Passage 3. Đây là phác đồ chữa.",
    strategySteps: [
      { step: 1, title: "17 / 20 / 23 split", titleVi: "Chia 17 / 20 / 23 phút", description: "Passage 1 = 17 min, Passage 2 = 20 min, Passage 3 = 23 min. Difficulty scales — so does time.", descriptionVi: "Passage 1 = 17', Passage 2 = 20', Passage 3 = 23'. Khó hơn = nhiều thời gian hơn." },
      { step: 2, title: "Transfer-as-you-go", titleVi: "Chuyển đáp án theo từng bài", description: "Write answers directly on the answer sheet — NOT on the question paper. Saves 5-7 minutes vs. last-minute transfer.", descriptionVi: "Viết thẳng vào phiếu đáp án — KHÔNG viết nháp rồi chuyển. Tiết kiệm 5-7 phút." },
      { step: 3, title: "2-min hard-stop per question", titleVi: "Dừng cứng 2 phút mỗi câu", description: "If 2 minutes pass, write your best guess, circle the number on the paper, and move on. Return only after the passage is done.", descriptionVi: "Quá 2 phút thì viết đáp án đoán tốt nhất, khoanh số trên đề, đi tiếp. Quay lại khi xong cả bài." },
      { step: 4, title: "Glance at the clock every passage", titleVi: "Liếc đồng hồ mỗi khi qua passage", description: "If you're behind by >3 minutes, skip the hardest question type (often matching-headings) and bank guesses.", descriptionVi: "Nếu trễ >3 phút, bỏ dạng khó nhất (thường là matching-headings) và đoán đáp án dự phòng." },
    ],
    practicalExamples: [
      { context: "Behind schedule on P2", contextVi: "Trễ tiến độ ở P2", example: "After 22 min on P2 you still have 3 questions left and 18 min remain.", answer: "Guess + flag, jump to P3 — return to flagged P2 items only if P3 finishes early.", explanation: "Loss on P3 is more expensive (harder vocab, harder questions)." },
    ],
    mistakesToAvoid: [
      { mistake: "Equal 20-min split for all three passages", mistakeVi: "Chia đều 20' cho cả ba", why: "P3 is 30-40% harder. Equal time means rushed final passage and 3-4 lost marks.", whyVi: "P3 khó hơn 30-40%. Chia đều = vội ở passage cuối, mất 3-4 câu." },
      { mistake: "Transferring all answers in the last 5 minutes", mistakeVi: "Cuối giờ mới chuyển đáp án", why: "Stress + tired eyes = transcription errors. Score can drop a full band.", whyVi: "Stress + mắt mỏi = chép sai. Có thể tụt nguyên band." },
    ],
    goldenSecret: "Write ‘17 • 37 • 60’ (passage cut-off times) on your scratch paper the moment the test starts. When the wall clock hits each number, FORCE yourself to switch passage.",
    goldenSecretVi: "Vừa bắt đầu thi, ghi ngay '17 • 37 • 60' (mốc kết thúc mỗi passage) lên giấy nháp. Đồng hồ chạm mốc nào, ÉP mình chuyển passage.",
    vocabHighlights: [
      { word: "to pace yourself", definition: "to control your speed", definitionVi: "điều tiết tốc độ", example: "Pace yourself or you'll exhaust your time on Passage 1.", band: "7.0" },
      { word: "to flag", definition: "to mark for review", definitionVi: "đánh dấu để xem lại", example: "Flag the question and move on.", band: "6.5" },
      { word: "diminishing returns", definition: "less benefit per extra effort", definitionVi: "lợi ích giảm dần", example: "After 2 minutes on one question, you hit diminishing returns.", band: "8.0" },
    ],
    quiz: [
      { question: "Recommended time split for the 3 passages:", options: ["20 / 20 / 20", "17 / 20 / 23", "25 / 20 / 15", "10 / 25 / 25"], answer: 1, explanation: "Harder passages need more minutes." },
      { question: "When should you transfer answers to the sheet?", options: ["At the end only", "As you finish each passage / directly on the sheet", "Before reading", "Never"], answer: 1, explanation: "Transfer-as-you-go prevents end-of-test errors." },
      { question: "Hard-stop time per single question:", options: ["30 seconds", "2 minutes", "5 minutes", "No limit"], answer: 1, explanation: "Beyond 2 min you hit diminishing returns." },
      { question: "If you're 4 minutes behind on P2, you should:", options: ["Keep grinding P2", "Guess remaining P2 items, jump to P3, return only if time permits", "Skip P3 entirely", "Restart"], answer: 1, explanation: "Protect P3 — it carries the harder marks." },
      { question: "‘Diminishing returns’ in this context means:", options: ["Earning more per minute", "Less benefit per extra minute spent on one question", "A type of question", "Examiner penalty"], answer: 1, explanation: "Time invested stops paying off." },
      { question: "Write the cut-off times '17 • 37 • 60' to:", options: ["Decorate the paper", "Force a visual reminder to switch passages on time", "Calculate the band", "Confuse examiners"], answer: 1, explanation: "External cues > internal willpower under stress." },
    ],
    cheatSheetPoints: [
      "17 / 20 / 23 min split.",
      "Transfer answers directly to the sheet.",
      "2-min hard-stop per question.",
      "Glance at the clock every passage.",
      "Bank guesses; protect Passage 3 time.",
    ],
  },

  // ============================================================
  // 8. THEMATIC VOCAB — Technology (Band 7+)
  // ============================================================
  {
    id: "vocab-technology-band7",
    title: "Thematic Vocab — Technology & AI (Band 7+)",
    titleVi: "Vocab chủ đề — Công nghệ & AI (Band 7+)",
    pillar: "thematic-vocab",
    icon: "🤖",
    duration: "14 min",
    level: "intermediate",
    description:
      "Technology is the #2 most common Writing Task 2 + Speaking topic of the last 3 years. Plug-in these 12 high-precision phrases to instantly upgrade your essays and Part 3 answers.",
    descriptionVi:
      "Công nghệ là chủ đề Writing Task 2 + Speaking phổ biến thứ 2 trong 3 năm qua. Cài 12 cụm từ chính xác này để nâng band ngay lập tức.",
    strategySteps: [
      { step: 1, title: "Group by sub-theme", titleVi: "Nhóm theo chủ đề con", description: "AI (4 phrases) / privacy (4 phrases) / digital wellbeing (4 phrases). Easier to retrieve under pressure.", descriptionVi: "AI (4 cụm) / privacy (4 cụm) / digital wellbeing (4 cụm). Dễ nhớ khi áp lực." },
      { step: 2, title: "Pair each phrase with a context sentence", titleVi: "Mỗi cụm gắn 1 câu ngữ cảnh", description: "Memorise the phrase + a full natural sentence. The sentence becomes plug-and-play in essays.", descriptionVi: "Học cụm + 1 câu hoàn chỉnh. Câu đó dùng thẳng trong bài." },
      { step: 3, title: "Avoid over-using ‘nowadays/modern technology’", titleVi: "Tránh lạm dụng ‘nowadays/modern technology’", why: "Replace with ‘in the digital age’ / ‘amid rapid technological advances’.", descriptionVi: "Thay bằng ‘in the digital age’ / ‘amid rapid technological advances’.", description: "Replace with ‘in the digital age’ / ‘amid rapid technological advances’." },
    ],
    practicalExamples: [
      { context: "Sample Task 2 sentence (AI)", contextVi: "Câu mẫu Task 2 về AI", example: "‘The rise of generative AI has fundamentally reshaped the workplace, automating routine tasks and freeing employees to focus on higher-order thinking.’", answer: "Plug-in opening sentence", explanation: "Uses generative AI, reshape, automate, higher-order — 4 band-7+ items in one sentence." },
      { context: "Sample Speaking Part 3 (privacy)", contextVi: "Câu mẫu Speaking Part 3 về quyền riêng tư", example: "‘Personally, I'd say data privacy is a double-edged sword — convenient services come at the cost of constant surveillance.’", answer: "Plug-in opinion sentence", explanation: "Double-edged sword + surveillance = band 7.5 vocabulary." },
    ],
    mistakesToAvoid: [
      { mistake: "Using ‘internet’ for everything", mistakeVi: "Dùng ‘internet’ cho mọi thứ", why: "Specify: cloud services / streaming platforms / social media — precision lifts Lexical Resource.", whyVi: "Cụ thể hóa: cloud services / streaming platforms / social media — chính xác mới nâng Lexical Resource." },
      { mistake: "Inventing tech jargon you don't fully understand", mistakeVi: "Bịa thuật ngữ không nắm chắc", why: "‘Blockchain decentralisation paradigm’ used incorrectly hurts Grammatical Range AND Lexical Resource.", whyVi: "‘Blockchain decentralisation paradigm’ dùng sai sẽ trừ cả ngữ pháp lẫn từ vựng." },
    ],
    goldenSecret: "Memorise 3 ‘opening shells’ — one for AI, one for privacy, one for screen-time. In the exam, slot the prompt's keyword into the shell. Saves 30 seconds of planning per essay.",
    goldenSecretVi: "Học thuộc 3 ‘vỏ câu mở bài’ — một về AI, một về privacy, một về screen-time. Trong phòng thi, chỉ cần thay từ khóa đề bài vào vỏ. Tiết kiệm 30 giây mỗi bài.",
    vocabHighlights: [
      { word: "generative AI", definition: "AI that creates text/image content", definitionVi: "AI tạo sinh", example: "Generative AI is transforming creative industries.", band: "7.5" },
      { word: "to automate routine tasks", definition: "to use machines for repetitive work", definitionVi: "tự động hóa việc lặp lại", example: "Software now automates routine accounting tasks.", band: "7.0" },
      { word: "a double-edged sword", definition: "having both benefits and drawbacks", definitionVi: "con dao hai lưỡi", example: "Smartphones are a double-edged sword for teenagers.", band: "7.5" },
      { word: "surveillance capitalism", definition: "business based on tracking user data", definitionVi: "chủ nghĩa giám sát", example: "Critics warn of surveillance capitalism in big tech.", band: "8.0" },
      { word: "screen fatigue", definition: "tiredness from screens", definitionVi: "mỏi mắt do màn hình", example: "Remote work has triggered widespread screen fatigue.", band: "7.5" },
      { word: "a digital detox", definition: "a break from screens", definitionVi: "cai nghiện công nghệ", example: "Many professionals now schedule a weekly digital detox.", band: "7.5" },
      { word: "to bridge the digital divide", definition: "to close inequality in tech access", definitionVi: "thu hẹp khoảng cách công nghệ", example: "Free Wi-Fi programmes help bridge the digital divide.", band: "8.0" },
      { word: "data-driven decision-making", definition: "decisions based on data", definitionVi: "ra quyết định dựa trên dữ liệu", example: "Hospitals increasingly rely on data-driven decision-making.", band: "7.5" },
    ],
    quiz: [
      { question: "Best replacement for ‘nowadays modern technology’:", options: ["these days tech things", "in the digital age", "in current time", "at the moment"], answer: 1, explanation: "‘In the digital age’ is formal and band-7+." },
      { question: "‘A double-edged sword’ means:", options: ["a useless tool", "something with both benefits and drawbacks", "a sharp weapon", "an old invention"], answer: 1, explanation: "Classic idiom for trade-offs." },
      { question: "‘To bridge the digital divide’ means:", options: ["to build a bridge online", "to close inequality in technology access", "to ban the internet", "to upgrade hardware"], answer: 1, explanation: "Common in essays on developing countries / education." },
      { question: "Which phrase is band 8?", options: ["use computer a lot", "surveillance capitalism", "have wifi", "play game"], answer: 1, explanation: "Specialist, precise, evaluative." },
      { question: "Why is grouping vocab by sub-theme useful?", options: ["Looks tidy", "Faster retrieval in exam", "Examiners require it", "Reduces total words"], answer: 1, explanation: "Memory works by clusters." },
      { question: "‘Screen fatigue’ best fits in an essay about:", options: ["space exploration", "remote work / digital wellbeing", "ancient history", "agriculture"], answer: 1, explanation: "Topic match = high marks." },
    ],
    cheatSheetPoints: [
      "Group by AI / privacy / wellbeing.",
      "Learn phrase + ready-made context sentence.",
      "Replace ‘nowadays’ with ‘in the digital age’.",
      "Avoid jargon you can't fully control.",
      "Three opening shells save 30s of planning each.",
    ],
  },
];
