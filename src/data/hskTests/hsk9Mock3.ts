/**
 * @file hsk9Mock3.ts - HSK 9 Mock Test 03 (HSK 3.0 Level 9, compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "全球供应链重构正深刻影响着各国的产业布局。", q: "本段反映？", o: ["供应链稳定", "重构影响产业", "无变化"], c: 1 },
  { a: "学者指出，人工智能伦理是未来科技治理的核心议题。", q: "学者观点？", o: ["伦理无关", "伦理是核心", "禁止AI"], c: 1 },
  { a: "她在演讲中强调，多元包容是现代社会的基石。", q: "她强调？", o: ["排斥", "多元包容", "同质化"], c: 1 },
  { a: "数据显示，绿色低碳消费已成为新的时代潮流。", q: "数据显示？", o: ["传统消费回归", "绿色低碳成潮流", "无变化"], c: 1 },
  { a: "心理学研究表明，正向思维能显著提升心理韧性。", q: "研究表明？", o: ["负向更好", "正向提升韧性", "无关"], c: 1 },
  { a: "经济学家认为，新质生产力是经济转型的关键引擎。", q: "经济学家观点？", o: ["旧动能", "新质生产力关键", "无关"], c: 1 },
  { a: "他在采访中坦言，真正的成功源于持续的自我超越。", q: "他认为成功源于？", o: ["运气", "自我超越", "天赋"], c: 1 },
  { a: "据报告，全球青年正面临前所未有的职业挑战。", q: "报告反映？", o: ["职业轻松", "前所未有挑战", "无变化"], c: 1 },
  { a: "他认为，文化创新需要根植于传统又超越传统。", q: "他认为？", o: ["全盘西化", "根植又超越传统", "守旧"], c: 1 },
  { a: "随着老龄化加剧，银发经济迎来巨大发展空间。", q: "本段反映？", o: ["银发经济衰退", "迎来发展空间", "无关"], c: 1 },
  { a: "教育的终极目标，是培养健全的人格与独立的思想。", q: "教育终极目标？", o: ["分数", "人格与独立思想", "服从"], c: 1 },
  { a: "他指出，真正的领导者首先要成为优秀的倾听者。", q: "他认为？", o: ["命令", "倾听", "权威"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "在算法主导的时代，保持独立判断比以往任何时候都更为珍贵。", q: "本段主旨？", o: ["跟随算法", "独立判断更珍贵", "算法万能"], c: 1 },
  { p: "古训云：\"温故而知新。\" 强调反思与创新并重。", q: "强调？", o: ["只学新", "只学旧", "反思与创新并重"], c: 2 },
  { p: "面对全球性挑战，多边主义合作机制至关重要。", q: "应对全球挑战？", o: ["单边主义", "多边合作", "无需行动"], c: 1 },
  { p: "在信息过载的时代，深度阅读的能力愈发___。", o: ["普遍", "稀缺", "过时"], c: 1 },
  { p: "他以___的精神投身公益事业。", o: ["奉献", "敷衍", "懒散"], c: 0 },
  { p: "构建人类命运共同体需要全球的___与智慧。", o: ["合作", "对抗", "孤立"], c: 0 },
  { p: "请选出有语病的一句。", o: ["他笃定前行。", "通过反思，使我们获得了启发。", "我喜欢哲学。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["这本书启迪人心。", "他大约七十岁左右。", "她是学者。"], c: 1 },
  { p: "\"和而不同\"是中华文明的处世智慧，主张包容与共生。", q: "\"和而不同\"核心？", o: ["排斥", "包容共生", "对立"], c: 1 },
  { p: "真正的修养是对他人的差异保持___。", o: ["敌意", "尊重", "无视"], c: 1 },
  { p: "面对未来不确定性，应当保持___与开放。", o: ["僵化", "韧性", "固执"], c: 1 },
  { p: "他始终秉持初心，从未被时代浪潮所___。", o: ["裹挟", "增强", "提升"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"在飞速变化的时代，唯一不变的是变化本身。能够拥抱不确定性、持续学习的人，才能在浪潮中找到自己的位置。\"",
    o: ["唯有静止才是真理。",
        "拥抱变化与持续学习才能立足于时代。",
        "时代无关个人。"], c: 1,
    exp: "Câu giữ ý đối lập + bài học cốt lõi." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h9m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h9m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h9m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk9Mock3: HskTest = {
  level: 9, code: "HSK9-MOCK-03", title: "HSK 9 Mock Test 03", titleVi: "Đề thi thử HSK 9 - Số 03",
  durationMin: 120, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. HSK 3.0 Level 9 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. HSK 3.0 cấp 9 #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Học thuật/diễn thuyết/phỏng vấn cấp cao.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn (MCQ).", questions: W },
  ],
};
