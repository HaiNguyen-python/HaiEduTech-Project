/**
 * @file hsk6Mock4.ts - HSK 6 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "随着城市化进程加快，乡村面貌正在悄然改变。", q: "本段说？", o: ["停滞", "乡村变化", "无关"], c: 1 },
  { a: "他向来以严谨著称，从不轻易下结论。", q: "他的特点？", o: ["草率", "严谨", "粗心"], c: 1 },
  { a: "本次研讨会聚焦人工智能在教育中的应用。", q: "聚焦？", o: ["农业", "AI教育", "金融"], c: 1 },
  { a: "为筹备这次国际会议，团队花费了半年时间。", q: "他们在做？", o: ["度假", "筹备会议", "搬家"], c: 1 },
  { a: "研究表明，长期阅读有助于提升思维能力。", q: "研究表明？", o: ["阅读无益", "提升思维", "浪费时间"], c: 1 },
  { a: "他不仅学术造诣深厚，为人也极其谦逊。", q: "关于他？", o: ["傲慢", "谦逊", "都差"], c: 1 },
  { a: "这家美术馆的展品丰富，参观者络绎不绝。", q: "美术馆？", o: ["冷清", "热闹", "关闭"], c: 1 },
  { a: "学问之道贵在坚持不懈的钻研。", q: "强调？", o: ["放弃", "坚持钻研", "速成"], c: 1 },
  { a: "经过深入磋商，双方就贸易问题达成一致。", q: "结果？", o: ["分歧", "达成一致", "终止"], c: 1 },
  { a: "当代社会节奏紧张，心理调适尤为重要。", q: "强调？", o: ["更紧张", "心理调适", "放弃"], c: 1 },
  { a: "他从青年时代便致力于环境保护事业。", q: "他致力于？", o: ["医学", "环保", "金融"], c: 1 },
  { a: "气候变化对全球生态构成严峻挑战。", q: "本段主旨？", o: ["无影响", "构成挑战", "已解决"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "岁月不居，唯有不懈努力方能成就梦想。", q: "作者认为？", o: ["等待", "不懈努力", "放弃"], c: 1 },
  { p: "卓越的领导力源于对人性的深刻理解。", q: "本段强调？", o: ["技术", "理解人性", "运气"], c: 1 },
  { p: "面对逆境，应当以积极心态主动应对。", q: "建议？", o: ["逃避", "积极应对", "放弃"], c: 1 },
  { p: "他的论文论证严密，得到了专家的高度___。", o: ["评价", "批评", "无视"], c: 0 },
  { p: "这部小说情节跌宕起伏，引人___。", o: ["入胜", "无趣", "失望"], c: 0 },
  { p: "通过长期实践，他终于___了核心技术。", o: ["放弃", "掌握", "拒绝"], c: 1 },
  { p: "我们应当___传统美德，弘扬正能量。", o: ["遗忘", "传承", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他是工程师。", "经过研究，使我们获得了成果。", "她喜欢阅读。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["大家都到了。", "他大约五十岁上下左右。", "我学习汉语。"], c: 1 },
  { p: "海量信息时代要求我们具备批判性思维。", q: "时代要求？", o: ["盲从", "批判性思维", "拒绝"], c: 1 },
  { p: "成功源于不懈的___与执着。", o: ["懒惰", "努力", "幻想"], c: 1 },
  { p: "面对未来，应保持___与希望。", o: ["绝望", "信心", "无所谓"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 实现 / 把 / 顺利地 / 计划 / 了", o: ["他顺利地把计划实现了。", "他把顺利地实现计划了。", "顺利地他实现计划把了。"], c: 0 },
  { p: "排序：沟通 / 应当 / 加强 / 团队 / 内部", o: ["团队内部应当加强沟通。", "应当沟通团队加强内部。", "加强团队应当沟通内部。"], c: 0 },
  { p: "选词：他___事业付出了毕生心血。", o: ["为", "把", "对"], c: 0 },
  { p: "选词：他对祖国怀有深厚的___。", o: ["感情", "怀疑", "陌生"], c: 0 },
  { p: "选词：经过数十年奋斗，他___了卓越成就。", o: ["取得", "失去", "放弃"], c: 0 },
  { p: "选词：这次失利让团队感到十分___。", o: ["遗憾", "高兴", "无聊"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h6m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h6m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h6m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk6Mock4: HskTest = {
  level: 6, code: "HSK6-MOCK-04", title: "HSK 6 Mock Test 04", titleVi: "Đề thi thử HSK 6 - Số 04",
  durationMin: 100, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 6 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 6 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
