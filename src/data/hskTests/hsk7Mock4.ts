/**
 * @file hsk7Mock4.ts - HSK 7 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "可持续发展理念已成为全球共识。", q: "本段说？", o: ["分歧", "全球共识", "停滞"], c: 1 },
  { a: "他以一丝不苟的态度对待每一份工作。", q: "他的态度？", o: ["敷衍", "一丝不苟", "懒散"], c: 1 },
  { a: "本届论坛的主题为数字经济与社会变革。", q: "主题？", o: ["农业", "数字经济+社会", "体育"], c: 1 },
  { a: "为完成这项研究，团队投入了大量人力物力。", q: "他们在做？", o: ["旅游", "研究", "经商"], c: 1 },
  { a: "数据显示，绿色出行人群占比逐年上升。", q: "数据显示？", o: ["下降", "上升", "停滞"], c: 1 },
  { a: "他不仅学识渊博，处事也极为周到。", q: "关于他？", o: ["仅学识好", "学识+处事都好", "都差"], c: 1 },
  { a: "这座图书馆藏书丰富，是市民读书的好去处。", q: "图书馆？", o: ["藏书少", "藏书丰富", "关闭"], c: 1 },
  { a: "做学问贵在求真务实。", q: "强调？", o: ["浮夸", "求真务实", "速成"], c: 1 },
  { a: "经过反复协商，双方在合作框架上达成一致。", q: "结果？", o: ["分歧", "一致", "终止"], c: 1 },
  { a: "现代社会复杂多变，需要更强的适应力。", q: "需要？", o: ["僵化", "适应力", "退缩"], c: 1 },
  { a: "他自青年时代便投身教育事业。", q: "他从事？", o: ["医学", "教育", "金融"], c: 1 },
  { a: "生物多样性保护刻不容缓。", q: "本段主旨？", o: ["无所谓", "刻不容缓", "已完成"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "时不我待，唯有奋发图强方能不负韶华。", q: "作者认为？", o: ["等待", "奋发", "放弃"], c: 1 },
  { p: "卓越的判断力源于丰富的实践经验。", q: "本段强调？", o: ["天赋", "实践经验", "运气"], c: 1 },
  { p: "面对挑战，应当冷静思考、果断行动。", q: "建议？", o: ["逃避", "冷静果断", "拖延"], c: 1 },
  { p: "他的研究成果获得了同行的高度___。", o: ["认可", "否定", "无视"], c: 0 },
  { p: "这项工作充满创造性，让人深感___。", o: ["充实", "无聊", "失望"], c: 0 },
  { p: "经过长期奋斗，她终于___了人生目标。", o: ["放弃", "实现", "拒绝"], c: 1 },
  { p: "我们应当___前辈的智慧。", o: ["否定", "继承", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他是律师。", "经过讨论，使大家达成了共识。", "她喜欢音乐。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["大家都在。", "他大约六十岁左右上下。", "我学习中文。"], c: 1 },
  { p: "信息洪流中，独立思考显得尤为珍贵。", q: "时代要求？", o: ["盲从", "独立思考", "拒绝"], c: 1 },
  { p: "成就源于持续的___与坚守。", o: ["懒惰", "努力", "幻想"], c: 1 },
  { p: "面对未来，要保持___与勇气。", o: ["绝望", "信心", "无所谓"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 完成 / 把 / 出色地 / 项目 / 了", o: ["他出色地把项目完成了。", "他把出色地完成项目了。", "出色地他完成项目把了。"], c: 0 },
  { p: "排序：合作 / 应当 / 加强 / 部门 / 之间", o: ["部门之间应当加强合作。", "应当合作部门加强之间。", "加强部门应当合作之间。"], c: 0 },
  { p: "选词：他___科研事业奉献了一生。", o: ["为", "把", "对"], c: 0 },
  { p: "选词：他对民族文化有深厚的___。", o: ["感情", "怀疑", "陌生"], c: 0 },
  { p: "选词：经过努力，他___了举世瞩目的成就。", o: ["取得", "失去", "放弃"], c: 0 },
  { p: "选词：这次失败让团队感到十分___。", o: ["遗憾", "高兴", "无聊"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h7m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h7m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h7m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk7Mock4: HskTest = {
  level: 7, code: "HSK7-MOCK-04", title: "HSK 7 Mock Test 04", titleVi: "Đề thi thử HSK 7 - Số 04",
  durationMin: 110, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 7 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 7 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn nâng cao.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
