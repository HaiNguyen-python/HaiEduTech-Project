/**
 * @file hsk9Mock2.ts - HSK 9 Mock Test 02 (HSK 3.0 expert, compact)
 * Listening 12 + Reading 12 + Writing 1 = 25 Q, 110 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "学者认为，文明的高度，最终体现在对弱者的关怀程度上。", q: "学者观点？", o: ["弱肉强食", "文明在于关怀弱者", "无关怀"], c: 1 },
  { a: "在国际关系研究中，软实力的作用日益超越硬实力。", q: "本段反映？", o: ["硬实力更重要", "软实力日益重要", "无变化"], c: 1 },
  { a: "他指出，科技伦理已成为未来发展的核心议题之一。", q: "他认为？", o: ["伦理无关", "成核心议题", "已过时"], c: 1 },
  { a: "据研究显示，长期睡眠不足会显著影响认知能力。", q: "研究显示？", o: ["睡眠无影响", "影响认知", "助提升"], c: 1 },
  { a: "他在演讲中强调，文化交流应建立在相互尊重的基础上。", q: "他强调？", o: ["单向输出", "相互尊重", "无需交流"], c: 1 },
  { a: "经济学家警告，金融杠杆过高将放大系统性风险。", q: "经济学家警告？", o: ["杠杆无风险", "放大风险", "鼓励高杠杆"], c: 1 },
  { a: "教育的最高境界，是让学生学会自我教育与终身成长。", q: "教育的最高境界？", o: ["灌输", "自我教育", "考高分"], c: 1 },
  { a: "据研究，城市绿地的增加可显著提升居民幸福感。", q: "研究表明？", o: ["与幸福无关", "提升幸福感", "降低"], c: 1 },
  { a: "他坦言，真正的创新需要容忍失败的文化土壤。", q: "他认为创新需要？", o: ["惩罚失败", "容忍失败", "禁止失败"], c: 1 },
  { a: "随着气候变化加剧，可持续发展已成为人类共同议题。", q: "本段反映？", o: ["气候无变化", "可持续成共识", "拒绝变革"], c: 1 },
  { a: "在文学讲座中，他强调好的作品总能引发深层共鸣。", q: "好作品的特征？", o: ["畅销", "引发共鸣", "短小"], c: 1 },
  { a: "经济学家认为，包容性增长是衡量发展质量的重要指标。", q: "经济学家认为？", o: ["单一指标", "包容性增长是关键", "无关质量"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "古人云：\"道法自然。\" 强调人类活动应当尊重自然规律，与之和谐共生，这是中华哲学最深刻的智慧之一。", q: "\"道法自然\"的含义？", o: ["征服自然", "尊重并和谐", "回到原始"], c: 1 },
  { p: "在多元价值并存的时代，理性对话比简单否定更具建设性。", q: "作者认为？", o: ["简单否定好", "理性对话更佳", "拒绝对话"], c: 1 },
  { p: "真正的成熟，是在了解世界的复杂后依然选择善良。", q: "作者定义的成熟？", o: ["世故", "知复杂仍善良", "回避复杂"], c: 1 },
  { p: "他以___的胸怀接纳不同的观点，从中汲取智慧。", o: ["狭隘", "开放", "封闭"], c: 1 },
  { p: "面对人工智能的挑战，我们更应强化人之所以为人的___能力。", o: ["共情与创造", "重复劳动", "记忆背诵"], c: 0 },
  { p: "我们应当___历史，但不应被历史所束缚。", o: ["遗忘", "铭记", "扭曲"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他坚持读书。", "通过这场考验，使他变得更加坚强。", "她乐于助人。"], c: 1, e: "缺主语。" },
  { p: "请选出有语病的一句。", o: ["这本书写得很好。", "他大致有四十岁左右。", "她在写诗。"], c: 1, e: "大致 + 左右 lặp." },
  { p: "请选出有语病的一句。", o: ["他热爱艺术。", "防止类似事件不再发生。", "我喜欢散步。"], c: 1, e: "Phủ định kép sai logic." },
  { p: "在不确定的时代，___与适应力比固定的知识更重要。", o: ["僵化", "学习力", "停滞"], c: 1 },
  { p: "真正的领导者，懂得在适当的时候___权力，让团队成长。", o: ["攥紧", "下放", "独占"], c: 1 },
  { p: "面对历史的复杂，最理性的态度是___，而非简单评判。", o: ["理解", "盲从", "回避"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"在全球化与本土化的张力之间，文化的未来不在于选择某一方，而在于以开放的心态吸纳外来精华，同时坚守自身文化的根基。这种创造性的转化，正是文明保持活力的关键。\"",
    o: ["应当全盘西化。",
        "文化未来在于开放吸纳与坚守根基的创造性转化。",
        "应当完全封闭。"], c: 1,
    exp: "Đáp án giữ ba ý cốt lõi: tiếp thu mở, giữ gốc, chuyển hoá sáng tạo." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h9m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h9m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h9m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk9Mock2: HskTest = {
  level: 9, code: "HSK9-MOCK-02", title: "HSK 9 Mock Test 02", titleVi: "Đề thi thử HSK 9 - Số 02",
  durationMin: 110, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. HSK 3.0 expert (Level 9) compact.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. HSK 3.0 cấp 9 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Học thuật chuyên sâu, triết luận.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu cao cấp + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn nghị luận.", questions: W },
  ],
};
