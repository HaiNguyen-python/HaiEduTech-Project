/**
 * Vietnamese for Foreigners - Placement Test
 * 15 questions (5 A1 + 5 A2 + 5 B1). Adaptive scoring recommends start level.
 */

export interface PlacementQuestion {
  id: string;
  level: "A1" | "A2" | "B1";
  skill: "pronunciation" | "vocab" | "grammar" | "pragmatics";
  question: string;
  questionEn: string;
  options: string[];
  answer: number;
  explanationEn: string;
}

export const vffPlacementTest: PlacementQuestion[] = [
  // ---------- A1 ----------
  { id: "p1", level: "A1", skill: "pronunciation", question: "Từ 'má' mang thanh gì?", questionEn: "Which tone is on 'má'?", options: ["ngang", "sắc (rising)", "huyền (falling)", "nặng (heavy)"], answer: 1, explanationEn: "The acute mark = sắc = high rising." },
  { id: "p2", level: "A1", skill: "grammar", question: "Câu ĐÚNG:", questionEn: "Correct sentence:", options: ["Tôi là mệt.", "Tôi mệt.", "Là tôi mệt.", "Tôi mệt là."], answer: 1, explanationEn: "No 'là' before adjectives." },
  { id: "p3", level: "A1", skill: "vocab", question: "'Chủ nhật' =", questionEn: "Translate", options: ["Monday", "Friday", "Sunday", "Weekend"], answer: 2, explanationEn: "Chủ nhật = Sunday." },
  { id: "p4", level: "A1", skill: "pragmatics", question: "You (25, male) meet Linh (30, female). You say:", questionEn: "Correct greeting", options: ["Chào em!", "Chào bạn!", "Em chào chị!", "Anh chào em!"], answer: 2, explanationEn: "Younger male → older female = em → chị." },
  { id: "p5", level: "A1", skill: "grammar", question: "'Two dogs' =", questionEn: "With classifier", options: ["hai chó", "hai cái chó", "hai con chó", "hai chiếc chó"], answer: 2, explanationEn: "Animal classifier = 'con'." },

  // ---------- A2 ----------
  { id: "p6", level: "A2", skill: "grammar", question: "'I have already eaten' =", questionEn: "Perfect aspect", options: ["Tôi ăn rồi.", "Tôi sẽ ăn.", "Tôi đang ăn.", "Tôi ăn chưa."], answer: 0, explanationEn: "'rồi' = already." },
  { id: "p7", level: "A2", skill: "vocab", question: "'Bao nhiêu tiền?' means:", questionEn: "Meaning", options: ["What time?", "How much?", "Where?", "When?"], answer: 1, explanationEn: "'Bao nhiêu tiền?' = how much money." },
  { id: "p8", level: "A2", skill: "pragmatics", question: "At a market, to bargain politely:", questionEn: "Bargain phrase", options: ["Cho tôi.", "Bớt chút được không?", "Đắt quá!", "Không mua."], answer: 1, explanationEn: "'Bớt chút được không?' = can you lower a bit?" },
  { id: "p9", level: "A2", skill: "grammar", question: "'I don't eat meat' =", questionEn: "Negation", options: ["Tôi không thịt ăn.", "Tôi ăn không thịt.", "Tôi không ăn thịt.", "Không tôi ăn thịt."], answer: 2, explanationEn: "'không' immediately before the verb." },
  { id: "p10", level: "A2", skill: "vocab", question: "'ngã tư' =", questionEn: "Translate", options: ["park", "intersection (4-way)", "airport", "bus stop"], answer: 1, explanationEn: "ngã tư = 4-way intersection." },

  // ---------- B1 ----------
  { id: "p11", level: "B1", skill: "grammar", question: "'She got fired' =", questionEn: "Negative passive", options: ["Cô ấy được đuổi việc.", "Cô ấy bị đuổi việc.", "Cô ấy đuổi việc rồi.", "Cô ấy sẽ đuổi việc."], answer: 1, explanationEn: "Negative event = 'bị'." },
  { id: "p12", level: "B1", skill: "grammar", question: "'The book that I read' =", questionEn: "Relative clause", options: ["Sách tôi đọc mà.", "Sách mà tôi đọc.", "Mà sách tôi đọc.", "Tôi đọc mà sách."], answer: 1, explanationEn: "[N] + mà + [S+V]." },
  { id: "p13", level: "B1", skill: "pragmatics", question: "Polite refusal in email:", questionEn: "Best refusal", options: ["Không được.", "E rằng em không tham gia được, mong anh thông cảm.", "Bận rồi.", "Không rảnh."], answer: 1, explanationEn: "Softener + reason + please-understand." },
  { id: "p14", level: "B1", skill: "vocab", question: "'kinh tế phát triển bền vững' =", questionEn: "Translate", options: ["fast economy", "sustainable economic development", "government economy", "market crash"], answer: 1, explanationEn: "kinh tế = economy, phát triển bền vững = sustainable development." },
  { id: "p15", level: "B1", skill: "grammar", question: "'Although it rained, we still went' =", questionEn: "Concessive", options: ["Vì trời mưa nên chúng tôi đi.", "Nếu trời mưa thì chúng tôi đi.", "Tuy trời mưa nhưng chúng tôi vẫn đi.", "Do trời mưa mà chúng tôi đi."], answer: 2, explanationEn: "'Tuy... nhưng...' = although." },
];

export interface PlacementResult {
  score: number;
  total: number;
  a1: number;
  a2: number;
  b1: number;
  recommendedLevel: "A1" | "A2" | "B1";
  rationaleEn: string;
}

export function scorePlacement(answers: (number | null)[]): PlacementResult {
  let a1 = 0, a2 = 0, b1 = 0;
  vffPlacementTest.forEach((q, i) => {
    if (answers[i] === q.answer) {
      if (q.level === "A1") a1++;
      else if (q.level === "A2") a2++;
      else b1++;
    }
  });
  const score = a1 + a2 + b1;
  let recommendedLevel: "A1" | "A2" | "B1" = "A1";
  let rationaleEn = "Start with A1 to build a solid foundation.";
  if (a1 >= 4 && a2 >= 3) {
    recommendedLevel = "A2";
    rationaleEn = "You've mastered the basics - jump into A2 everyday scenarios.";
  }
  if (a1 >= 4 && a2 >= 4 && b1 >= 3) {
    recommendedLevel = "B1";
    rationaleEn = "Excellent! You're ready for B1 fluency (work, opinions, news).";
  }
  return { score, total: 15, a1, a2, b1, recommendedLevel, rationaleEn };
}
