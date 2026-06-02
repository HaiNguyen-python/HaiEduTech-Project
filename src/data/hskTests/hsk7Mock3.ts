/**
 * @file hsk7Mock3.ts - HSK 7 Mock Test 03 (HSK 3.0, compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "在数字经济时代，数据已成为新的生产要素。", q: "本段说？", o: ["数据无用", "数据是生产要素", "数据消失"], c: 1 },
  { a: "他在采访中强调，跨界融合是未来创新的关键。", q: "他强调？", o: ["专一", "跨界融合", "分割"], c: 1 },
  { a: "教育专家指出，批判性思维比应试能力更重要。", q: "专家观点？", o: ["应试重要", "批判性思维重要", "都不重要"], c: 1 },
  { a: "近期调查显示，乡村振兴战略取得了显著成效。", q: "调查显示？", o: ["失败", "显著成效", "无效果"], c: 1 },
  { a: "他指出，企业可持续发展离不开社会责任。", q: "他认为？", o: ["社会责任无关", "社会责任关键", "管理最重要"], c: 1 },
  { a: "随着AI的进步，许多行业正经历深刻变革。", q: "本段反映？", o: ["AI无影响", "行业变革", "AI被禁"], c: 1 },
  { a: "他说：真正的领导力源于影响而非命令。", q: "他认为领导力源于？", o: ["命令", "影响", "权威"], c: 1 },
  { a: "心理学家提醒，过度焦虑会损害身心健康。", q: "心理学家提醒？", o: ["焦虑有益", "损害健康", "无影响"], c: 1 },
  { a: "据调查，越来越多青年关注可持续生活方式。", q: "调查显示？", o: ["青年冷漠", "关注可持续", "不参与"], c: 1 },
  { a: "学者认为，文化交流是促进文明发展的桥梁。", q: "学者强调？", o: ["文化封闭", "文化交流", "无关"], c: 1 },
  { a: "在演讲中他坦言，真正的智慧是知道自己的局限。", q: "他认为智慧是？", o: ["全知", "知道局限", "盲目"], c: 1 },
  { a: "随着AI普及，伦理与法律问题日益受到关注。", q: "本段反映？", o: ["无问题", "伦理法律受关注", "AI禁止"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "在效率至上的时代，深度思考反而成为一种稀缺能力。能停下来反思的人，才能走得更远。", q: "本段主旨？", o: ["越快越好", "深度思考稀缺且重要", "无需思考"], c: 1 },
  { p: "古人云：\"学而不思则罔。\" 强调学习与思考缺一不可。", q: "强调？", o: ["只学习", "只思考", "学思结合"], c: 2 },
  { p: "面对AI的快速发展，人类最大的优势是同理心与价值判断。", q: "作者认为？", o: ["AI胜人类", "人类优势在情感判断", "无优势"], c: 1 },
  { p: "成长往往伴随阵痛，但每一次蜕变都让我们更加___。", o: ["脆弱", "成熟", "迷茫"], c: 1 },
  { p: "他以___的精神攻克了重重难关。", o: ["执着", "懒散", "随便"], c: 0 },
  { p: "保护生态需要每个人的___，而非置身事外。", o: ["参与", "旁观", "拒绝"], c: 0 },
  { p: "请选出有语病的一句。", o: ["他认真备课。", "通过实验，使我们验证了假设。", "我喜欢音乐。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["这本书很好。", "他大约四十岁左右。", "她是医生。"], c: 1 },
  { p: "中国哲学讲究\"知行合一\"，主张认识与实践统一。", q: "\"知行合一\"核心？", o: ["割裂", "知行统一", "只认识"], c: 1 },
  { p: "幸福不是终点，而是过程中的体验。", q: "作者认为幸福？", o: ["终点", "过程体验", "目标"], c: 1 },
  { p: "面对失败，最重要的是从中___智慧。", o: ["逃避", "提炼", "忽视"], c: 1 },
  { p: "他始终保持谦逊，从未被掌声___。", o: ["迷惑", "增强", "提升"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"在万物互联的时代，注意力成为最稀缺的资源。学会专注，是这个时代最重要的能力，也是抵御信息洪流的最佳武器。\"",
    o: ["信息越多越好。",
        "注意力稀缺，专注力成为关键能力。",
        "互联网毫无价值。"], c: 1,
    exp: "Câu giữ ý đối lập + bài học cốt lõi." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h7m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h7m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h7m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk7Mock3: HskTest = {
  level: 7, code: "HSK7-MOCK-03", title: "HSK 7 Mock Test 03", titleVi: "Đề thi thử HSK 7 - Số 03",
  durationMin: 90, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. HSK 3.0 Level 7 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. HSK 3.0 cấp 7 #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Tin tức/phỏng vấn/học thuật.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn (MCQ).", questions: W },
  ],
};
