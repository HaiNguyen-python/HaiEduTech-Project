/**
 * Vietnamese for Foreigners - Core Grammar Reference
 * 25 essential grammar points covering A1 → B1.
 */

export interface GrammarPoint {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  titleEn: string;
  formula: string;
  explanationEn: string;
  examples: { vi: string; en: string }[];
  commonMistakeEn?: string;
}

export const vffGrammarPoints: GrammarPoint[] = [
  { id: "g1", level: "A1", title: "Thứ tự SVO", titleEn: "SVO word order", formula: "S + V + O", explanationEn: "Vietnamese is strict SVO with no verb conjugation.", examples: [{ vi: "Tôi ăn phở.", en: "I eat pho." }] },
  { id: "g2", level: "A1", title: "Copula 'là'", titleEn: "The copula 'là'", formula: "S + là + N", explanationEn: "'là' = 'to be' before nouns ONLY. Never before adjectives.", examples: [{ vi: "Tôi là kỹ sư.", en: "I'm an engineer." }, { vi: "Tôi mệt.", en: "I'm tired (no 'là')." }], commonMistakeEn: "Never 'Tôi là mệt' - just 'Tôi mệt'." },
  { id: "g3", level: "A1", title: "Câu hỏi Yes/No", titleEn: "Yes/No questions", formula: "S + V + O + không?", explanationEn: "Add 'không?' at end. Answer 'Có' or 'Không'.", examples: [{ vi: "Anh có xe không?", en: "Do you have a car?" }] },
  { id: "g4", level: "A1", title: "Câu hỏi 'gì'", titleEn: "What-questions", formula: "S + V + gì?", explanationEn: "'gì' at the end of the question.", examples: [{ vi: "Đây là gì?", en: "What is this?" }] },
  { id: "g5", level: "A1", title: "Phủ định 'không'", titleEn: "Negation with 'không'", formula: "S + không + V", explanationEn: "'không' directly before the verb.", examples: [{ vi: "Tôi không hiểu.", en: "I don't understand." }] },
  { id: "g6", level: "A1", title: "Loại từ", titleEn: "Classifiers", formula: "[Number] + [Classifier] + [Noun]", explanationEn: "cái (things), con (animals), quyển (books), chiếc (vehicles).", examples: [{ vi: "hai con mèo", en: "two cats" }] },
  { id: "g7", level: "A1", title: "Đại từ theo tuổi", titleEn: "Age-based pronouns", formula: "anh/chị/em/cô/chú/bác", explanationEn: "Pronouns shift by age and gender.", examples: [{ vi: "Em chào chị.", en: "I (younger) greet you (older female)." }] },
  { id: "g8", level: "A1", title: "Sở hữu 'của'", titleEn: "Possessive 'của'", formula: "N + của + N", explanationEn: "'của' = of/'s. Order: possessed + của + possessor.", examples: [{ vi: "Sách của tôi.", en: "My book." }] },
  { id: "g9", level: "A1", title: "Số lượng cơ bản", titleEn: "Basic numbers", formula: "một - mười - trăm - nghìn/ngàn", explanationEn: "10 = mười, 100 = trăm, 1000 = nghìn (N) / ngàn (S).", examples: [{ vi: "một trăm nghìn", en: "100,000" }] },
  { id: "g10", level: "A1", title: "Politeness particle 'ạ'", titleEn: "Politeness 'ạ'", formula: "[Sentence] + ạ", explanationEn: "Add 'ạ' at the end to sound respectful.", examples: [{ vi: "Dạ vâng ạ.", en: "Yes (very polite)." }] },

  { id: "g11", level: "A2", title: "Thì quá khứ 'đã'", titleEn: "Past marker 'đã'", formula: "S + đã + V", explanationEn: "Optional past marker. Often dropped in context.", examples: [{ vi: "Tôi đã ăn.", en: "I ate." }] },
  { id: "g12", level: "A2", title: "Tiếp diễn 'đang'", titleEn: "Progressive 'đang'", formula: "S + đang + V", explanationEn: "Ongoing action.", examples: [{ vi: "Tôi đang học.", en: "I am studying." }] },
  { id: "g13", level: "A2", title: "Tương lai 'sẽ'", titleEn: "Future 'sẽ'", formula: "S + sẽ + V", explanationEn: "Future intent/prediction.", examples: [{ vi: "Tôi sẽ đến.", en: "I will come." }] },
  { id: "g14", level: "A2", title: "'chưa/rồi' aspect", titleEn: "Perfect aspect 'rồi'", formula: "S + V + rồi / chưa?", explanationEn: "'rồi' = already done. 'chưa?' = yet? Reply 'Rồi' or 'Chưa'.", examples: [{ vi: "Ăn cơm chưa? - Rồi.", en: "Eaten yet? - Yes." }] },
  { id: "g15", level: "A2", title: "So sánh hơn", titleEn: "Comparative 'hơn'", formula: "A + Adj + hơn + B", explanationEn: "'hơn' = more than.", examples: [{ vi: "Anh cao hơn em.", en: "You are taller than me." }] },
  { id: "g16", level: "A2", title: "So sánh nhất", titleEn: "Superlative 'nhất'", formula: "A + Adj + nhất", explanationEn: "'nhất' = the most.", examples: [{ vi: "Phở ngon nhất.", en: "Pho is the best." }] },
  { id: "g17", level: "A2", title: "Chỉ đường", titleEn: "Directions", formula: "rẽ trái/phải · đi thẳng · ngã tư", explanationEn: "Key spatial vocabulary and imperatives.", examples: [{ vi: "Rẽ trái ở ngã tư.", en: "Turn left at the intersection." }] },
  { id: "g18", level: "A2", title: "'Có thể' - khả năng", titleEn: "Ability 'có thể'", formula: "S + có thể + V + được (không)?", explanationEn: "'có thể... được không?' = can/could you?", examples: [{ vi: "Anh có thể giúp em được không?", en: "Can you help me?" }] },

  { id: "g19", level: "B1", title: "Bị động 'được / bị'", titleEn: "Passive: 'được' vs 'bị'", formula: "S + được/bị + (agent) + V", explanationEn: "'được' = positive passive, 'bị' = negative passive.", examples: [{ vi: "Tôi được khen.", en: "I was praised." }, { vi: "Anh ấy bị phạt.", en: "He was fined." }], commonMistakeEn: "Don't say 'Tôi bị thăng chức' - promotions are positive → 'được'." },
  { id: "g20", level: "B1", title: "Điều kiện 'nếu... thì...'", titleEn: "Conditional 'if... then...'", formula: "Nếu + clause, thì + clause", explanationEn: "Standard conditional. 'thì' may be dropped in casual speech.", examples: [{ vi: "Nếu mưa thì ở nhà.", en: "If it rains, stay home." }] },
  { id: "g21", level: "B1", title: "Tương phản 'tuy... nhưng...'", titleEn: "Concessive 'although'", formula: "Tuy + clause + nhưng + clause", explanationEn: "'Although X, still Y'.", examples: [{ vi: "Tuy mệt nhưng vẫn đi.", en: "Although tired, I still go." }] },
  { id: "g22", level: "B1", title: "Nguyên nhân 'vì... nên...'", titleEn: "Causal 'because... so...'", formula: "Vì + cause + nên + effect", explanationEn: "'because X so Y'.", examples: [{ vi: "Vì mưa nên đường ướt.", en: "Because of rain, the road is wet." }] },
  { id: "g23", level: "B1", title: "Mệnh đề quan hệ 'mà'", titleEn: "Relative clauses 'mà'", formula: "N + mà + S + V", explanationEn: "'mà' = which/that/whom.", examples: [{ vi: "Người mà tôi gặp.", en: "The person I met." }] },
  { id: "g24", level: "B1", title: "Ý kiến 'theo tôi'", titleEn: "Opinion openers", formula: "Theo tôi / Tôi cho rằng + clause", explanationEn: "Formal ways to state opinions.", examples: [{ vi: "Theo tôi, ý này hay.", en: "In my view, this is good." }] },
  { id: "g25", level: "B1", title: "Từ chối lịch sự", titleEn: "Polite refusal", formula: "E rằng + [reason] + mong ... thông cảm", explanationEn: "Never say a flat 'không' - use softener + reason + please-understand.", examples: [{ vi: "E rằng em không tham gia được, mong anh thông cảm.", en: "I'm afraid I can't join, please understand." }] },
];

export const grammarByLevel = {
  A1: vffGrammarPoints.filter(g => g.level === "A1"),
  A2: vffGrammarPoints.filter(g => g.level === "A2"),
  B1: vffGrammarPoints.filter(g => g.level === "B1"),
};
