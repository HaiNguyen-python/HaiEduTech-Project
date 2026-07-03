/** Adaptive placement item bank: difficulty 1 (easy A1) → 5 (hard B1). */
export interface VFFPlacementItem {
  id: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  skill: "vocab" | "grammar" | "listening" | "reading";
  prompt: string;
  choices: string[];
  answerIndex: number;
  explain?: string;
}

export const VFF_PLACEMENT_BANK: VFFPlacementItem[] = [
  // Diff 1 - basic vocab
  { id: "p1", difficulty: 1, skill: "vocab", prompt: "'Xin chào' means…", choices: ["Goodbye", "Hello", "Thank you", "Sorry"], answerIndex: 1 },
  { id: "p2", difficulty: 1, skill: "vocab", prompt: "'Cảm ơn' means…", choices: ["Sorry", "Please", "Thank you", "Yes"], answerIndex: 2 },
  { id: "p3", difficulty: 1, skill: "vocab", prompt: "Số 5 in Vietnamese is…", choices: ["bốn", "năm", "sáu", "bảy"], answerIndex: 1 },
  { id: "p4", difficulty: 1, skill: "vocab", prompt: "'Nước' means…", choices: ["Rice", "Water", "Tea", "Coffee"], answerIndex: 1 },
  // Diff 2 - simple grammar
  { id: "p5", difficulty: 2, skill: "grammar", prompt: "Choose: 'Tôi ___ sinh viên.'", choices: ["có", "là", "ở", "đi"], answerIndex: 1 },
  { id: "p6", difficulty: 2, skill: "grammar", prompt: "Question: 'Bạn tên ___?'", choices: ["gì", "sao", "đâu", "nào"], answerIndex: 0 },
  { id: "p7", difficulty: 2, skill: "vocab", prompt: "'Bao nhiêu tuổi?' asks about…", choices: ["Name", "Age", "Job", "Country"], answerIndex: 1 },
  { id: "p8", difficulty: 2, skill: "reading", prompt: "'Tôi ăn phở.' means…", choices: ["I drink pho", "I eat pho", "I cook pho", "I like pho"], answerIndex: 1 },
  // Diff 3 - A2 range
  { id: "p9", difficulty: 3, skill: "grammar", prompt: "Past tense marker: 'Hôm qua tôi ___ đi Hà Nội.'", choices: ["sẽ", "đang", "đã", "chưa"], answerIndex: 2 },
  { id: "p10", difficulty: 3, skill: "vocab", prompt: "'Rẻ' means…", choices: ["Expensive", "Cheap", "Beautiful", "Fast"], answerIndex: 1 },
  { id: "p11", difficulty: 3, skill: "grammar", prompt: "'Bạn có thích cà phê ___?' (Do you like coffee?)", choices: ["không", "chưa", "rồi", "à"], answerIndex: 0 },
  { id: "p12", difficulty: 3, skill: "reading", prompt: "'Trời hôm nay nóng quá!' expresses…", choices: ["Cold weather", "Hot weather", "Rain", "Wind"], answerIndex: 1 },
  // Diff 4 - upper A2 / lower B1
  { id: "p13", difficulty: 4, skill: "grammar", prompt: "'Nếu trời mưa, tôi ___ ở nhà.'", choices: ["đã", "sẽ", "đang", "vừa"], answerIndex: 1 },
  { id: "p14", difficulty: 4, skill: "vocab", prompt: "'Chắc chắn' means…", choices: ["Maybe", "Certainly", "Sometimes", "Never"], answerIndex: 1 },
  { id: "p15", difficulty: 4, skill: "grammar", prompt: "Correct classifier: 'Một ___ sách'", choices: ["con", "cái", "quyển", "chiếc"], answerIndex: 2 },
  { id: "p16", difficulty: 4, skill: "reading", prompt: "'Tôi vừa mới ăn xong.' means…", choices: ["I will eat", "I just finished eating", "I am eating", "I don't eat"], answerIndex: 1 },
  // Diff 5 - B1
  { id: "p17", difficulty: 5, skill: "grammar", prompt: "'Mặc dù trời mưa ___ tôi vẫn đi làm.'", choices: ["nên", "nhưng", "vì", "và"], answerIndex: 1 },
  { id: "p18", difficulty: 5, skill: "vocab", prompt: "'Kinh nghiệm' means…", choices: ["Experiment", "Experience", "Expensive", "Explanation"], answerIndex: 1 },
  { id: "p19", difficulty: 5, skill: "grammar", prompt: "Passive-like: 'Cuốn sách này ___ nhiều người đọc.'", choices: ["do", "bị", "được", "bởi"], answerIndex: 2 },
  { id: "p20", difficulty: 5, skill: "reading", prompt: "'Càng học, tôi càng thấy khó.' means…", choices: ["The more I study, the harder it feels", "I study hard", "Study is easy", "I don't want to study"], answerIndex: 0 },
];

/** Simple adaptive: start at diff 2. Correct → +1, wrong → -1. Stop after 12 items or diff range exhausted. */
export function scoreToLevel(correctByDiff: Record<number, number>): "A1" | "A2" | "B1" {
  const easy = (correctByDiff[1] || 0) + (correctByDiff[2] || 0);
  const mid = (correctByDiff[3] || 0) + (correctByDiff[4] || 0);
  const hard = correctByDiff[5] || 0;
  if (hard >= 2 && mid >= 2) return "B1";
  if (mid >= 2) return "A2";
  return "A1";
}
