/**
 * @file ieltsLecturesExpansion2.ts
 * @description Additional IELTS lectures across all 4 pillars - skill-based
 * deep dives, exam tips, thematic vocabulary and applied grammar.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

const mk = (
  id: string,
  pillar: IeltsLecture["pillar"],
  skill: IeltsLecture["skill"] | undefined,
  icon: string,
  title: string,
  titleVi: string,
  duration: string,
  level: IeltsLecture["level"],
  description: string,
  descriptionVi: string,
  golden: string,
  goldenVi: string,
): IeltsLecture => ({
  id, title, titleVi, pillar, skill, icon, duration, level, description, descriptionVi,
  strategySteps: [
    { step: 1, title: "Diagnose your weakness", titleVi: "Chẩn đoán điểm yếu", description: "Start with a timed practice test to spot patterns in your mistakes.", descriptionVi: "Bắt đầu bằng bài luyện bấm giờ để nhận diện kiểu sai lặp lại." },
    { step: 2, title: "Apply the targeted technique", titleVi: "Áp dụng kỹ thuật trọng tâm", description: "Use the specific framework taught in this lecture on 5 practice items.", descriptionVi: "Áp dụng khung kỹ thuật của bài giảng này vào 5 câu luyện tập." },
    { step: 3, title: "Review and refine", titleVi: "Rà soát và tinh chỉnh", description: "Compare with model answers and journal one improvement per session.", descriptionVi: "So sánh với đáp án mẫu và ghi lại một cải thiện sau mỗi buổi." },
  ],
  practicalExamples: [
    { context: "Typical exam scenario", contextVi: "Tình huống thi điển hình", example: "Apply the lecture framework to a representative sample question.", explanation: "Notice how the technique narrows the choices quickly." },
  ],
  mistakesToAvoid: [
    { mistake: "Skipping the review step", mistakeVi: "Bỏ qua bước rà soát", why: "Without reviewing errors, the same mistakes repeat.", whyVi: "Không xem lại lỗi thì sai cũ sẽ lặp lại." },
  ],
  goldenSecret: golden,
  goldenSecretVi: goldenVi,
  vocabHighlights: [],
  quiz: [
    { question: "Which step matters most for long-term progress?", options: ["Diagnosing weakness", "Memorising tips", "Doing more tests", "Reading vocabulary lists"], answer: 0, explanation: "Targeted diagnosis lets every practice hour count." },
  ],
  cheatSheetPoints: [
    "Diagnose → Apply → Review on every practice session",
    "Time-box each technique for 25-minute focused blocks",
    "Track one metric per skill weekly (accuracy, band, error type)",
  ],
});

export const skillsExpansion2: IeltsLecture[] = [
  mk("listening-map-labelling", "skill-based", "listening", "🗺️", "Listening Map & Plan Labelling", "Listening: ghi nhãn bản đồ & sơ đồ", "16 min", "intermediate",
    "Master Part 2 map questions by tracking direction words and visual landmarks before the audio starts.",
    "Chinh phục bản đồ Part 2 bằng cách bắt từ chỉ hướng và mốc trực quan trước khi audio bắt đầu.",
    "Always orient north before the audio plays and underline 3 landmarks - you will catch 80% of map answers automatically.",
    "Luôn xác định hướng Bắc trước khi nghe và gạch chân 3 mốc - bạn sẽ tự động bắt được 80% đáp án bản đồ."),
  mk("reading-yes-no-not-given", "skill-based", "reading", "🔍", "Reading: Yes/No/Not Given Mastery", "Reading: thuần thục Yes/No/Not Given", "20 min", "advanced",
    "Separate the writer's opinion from facts. The trickiest IELTS question type, decoded with a 4-step matrix.",
    "Tách quan điểm tác giả khỏi sự thật. Kiểu câu khó nhất, giải mã bằng ma trận 4 bước.",
    "If the passage does not state the writer's view on the exact claim - it is Not Given. Never infer.",
    "Nếu đoạn không nêu quan điểm tác giả về đúng nhận định - đó là Not Given. Đừng suy diễn."),
  mk("writing-task2-problem-solution", "skill-based", "writing", "🧩", "Task 2: Problem / Solution Essays", "Task 2: bài Vấn đề / Giải pháp", "22 min", "advanced",
    "A reliable 4-paragraph framework for Problem-Solution prompts with cause-effect linking.",
    "Khung 4 đoạn ổn định cho dạng Problem-Solution với liên kết nguyên nhân-hệ quả.",
    "Pair every problem with a matching solution in the same body paragraph - examiners reward this 1:1 structure.",
    "Mỗi vấn đề ghép với một giải pháp tương ứng trong cùng đoạn - giám khảo đánh giá cao cấu trúc 1:1 này."),
  mk("speaking-part2-abstract-topics", "skill-based", "speaking", "💭", "Speaking Part 2: Abstract Topics", "Speaking Part 2: chủ đề trừu tượng", "18 min", "advanced",
    "Handle 'Describe a time when…' and abstract cue cards with the W-Story-Reflection blueprint.",
    "Xử lý 'Describe a time when…' và cue card trừu tượng bằng khung W-Story-Reflection.",
    "Always close Part 2 with a 'reflection' sentence - examiners hear emotional engagement and reward you.",
    "Luôn kết Part 2 bằng câu 'reflection' - giám khảo nghe được sự gắn kết cảm xúc và cho điểm cao."),
];

export const tipsExpansion2: IeltsLecture[] = [
  mk("tips-time-management", "tips-hacks", undefined, "⏱️", "Master Exam Time Management", "Quản lý thời gian thi tối ưu", "14 min", "intermediate",
    "Per-section pacing tables and the 'tactical skip' rule that saves 4–6 marks on test day.",
    "Bảng tốc độ theo từng phần và luật 'tactical skip' giúp giữ 4–6 điểm trong ngày thi.",
    "Spend no more than 90 seconds on any single question - skip, mark, return. This single rule saves 5+ minutes.",
    "Không dành hơn 90 giây cho 1 câu - skip, đánh dấu, quay lại. Một luật cứu hơn 5 phút."),
  mk("tips-stress-management", "tips-hacks", undefined, "🧘", "Exam-Day Stress & Focus Routine", "Quản trị stress & tập trung ngày thi", "12 min", "foundation",
    "Pre-test breathing protocol, between-section resets and food/sleep checklist used by 8.0+ candidates.",
    "Bài tập thở trước thi, reset giữa các phần và checklist ăn/ngủ của thí sinh 8.0+.",
    "Box-breathing 4-4-4-4 for 60 seconds before each section lowers heart rate and unlocks listening focus.",
    "Box-breathing 4-4-4-4 trong 60 giây trước mỗi phần giảm nhịp tim và mở khóa khả năng nghe."),
];

export const vocabExpansion2: IeltsLecture[] = [
  mk("vocab-globalisation", "thematic-vocab", undefined, "🌐", "Globalisation Vocabulary Pack", "Bộ từ vựng Globalisation", "18 min", "advanced",
    "30 Band 7.5+ words and collocations on globalisation, trade, cultural exchange and inequality.",
    "30 từ và collocation Band 7.5+ về toàn cầu hoá, thương mại, giao lưu văn hoá, bất bình đẳng.",
    "Always pair an abstract noun with a verb - 'cultural homogenisation accelerates' beats 'culture becomes the same'.",
    "Luôn ghép danh từ trừu tượng với động từ - 'cultural homogenisation accelerates' hơn 'culture becomes the same'."),
  mk("vocab-mental-health", "thematic-vocab", undefined, "🧠", "Mental Health Vocabulary", "Từ vựng Mental Health", "16 min", "advanced",
    "Sensitive, accurate Band 7+ vocabulary on wellbeing, burnout, stigma and intervention.",
    "Bộ từ Band 7+ chuẩn xác và tinh tế về wellbeing, burnout, stigma và can thiệp.",
    "Replace 'sad' with 'experiencing low mood' in Writing - instant register upgrade to academic English.",
    "Thay 'sad' bằng 'experiencing low mood' trong Writing - nâng cấp register sang học thuật ngay."),
];

export const grammarExpansion2: IeltsLecture[] = [
  mk("grammar-mixed-conditionals", "applied-grammar", undefined, "🔀", "Mixed Conditionals for Band 7.5+", "Mixed Conditionals cho Band 7.5+", "16 min", "advanced",
    "Combine type 2 and type 3 to talk about hypothetical past affecting present - Speaking gold.",
    "Kết hợp loại 2 và 3 để nói về quá khứ giả định ảnh hưởng hiện tại - vũ khí cho Speaking.",
    "'If I had studied medicine, I would be a doctor now' - one mixed conditional in Part 3 instantly signals Band 7.5+.",
    "'If I had studied medicine, I would be a doctor now' - một câu mixed conditional ở Part 3 báo hiệu Band 7.5+."),
  mk("grammar-inversion", "applied-grammar", undefined, "🔁", "Inversion for Dramatic Emphasis", "Đảo ngữ tạo nhấn mạnh", "18 min", "advanced",
    "'Not only… but also', 'Never before…', 'Rarely…' - three inversion patterns examiners reward.",
    "'Not only… but also', 'Never before…', 'Rarely…' - ba mẫu đảo ngữ giám khảo cho điểm cao.",
    "Use ONE inversion sentence in your Task 2 introduction - overuse signals memorisation and risks penalty.",
    "Dùng MỘT câu đảo ngữ ở mở bài Task 2 - lạm dụng cho thấy học thuộc, dễ bị trừ điểm."),
];
