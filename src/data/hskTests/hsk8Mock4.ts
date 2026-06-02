/**
 * @file hsk8Mock4.ts - HSK 8 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "国际社会正面临前所未有的合作机遇。", q: "本段说？", o: ["对抗", "合作机遇", "停滞"], c: 1 },
  { a: "他始终秉持精益求精的工匠精神。", q: "他的精神？", o: ["敷衍", "精益求精", "懒散"], c: 1 },
  { a: "本次峰会聚焦碳中和路径与产业转型。", q: "聚焦？", o: ["农业", "碳中和+转型", "娱乐"], c: 1 },
  { a: "为推进这项改革，团队进行了广泛调研。", q: "他们在做？", o: ["度假", "调研", "经商"], c: 1 },
  { a: "数据表明，新能源汽车销量持续攀升。", q: "数据表明？", o: ["下降", "攀升", "停滞"], c: 1 },
  { a: "他不仅理论扎实，实战经验也十分丰富。", q: "关于他？", o: ["仅理论好", "理论+实战都好", "都差"], c: 1 },
  { a: "这部学术著作论述严密，影响深远。", q: "著作？", o: ["影响小", "影响深远", "无价值"], c: 1 },
  { a: "学问之道贵在融会贯通。", q: "强调？", o: ["孤立", "融会贯通", "速成"], c: 1 },
  { a: "经过数轮谈判，双方达成战略合作协议。", q: "结果？", o: ["破裂", "达成协议", "终止"], c: 1 },
  { a: "全球治理需要各国通力合作。", q: "需要？", o: ["对抗", "通力合作", "孤立"], c: 1 },
  { a: "他长期致力于濒危物种保护事业。", q: "他致力于？", o: ["金融", "物种保护", "娱乐"], c: 1 },
  { a: "极端天气频发警示我们必须正视气候问题。", q: "本段主旨？", o: ["无关", "正视气候", "已解决"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "光阴荏苒，唯有笃行不怠方能成就辉煌。", q: "作者认为？", o: ["等待", "笃行不怠", "放弃"], c: 1 },
  { p: "卓越的洞察力源于深厚的学识积累。", q: "本段强调？", o: ["天赋", "学识积累", "运气"], c: 1 },
  { p: "面对复杂局势，需要审时度势、运筹帷幄。", q: "建议？", o: ["盲动", "审时度势", "退缩"], c: 1 },
  { p: "他的学术贡献获得了国际同行的高度___。", o: ["赞誉", "批评", "无视"], c: 0 },
  { p: "这项使命意义重大，让人深感___。", o: ["责任", "无聊", "失望"], c: 0 },
  { p: "经过艰苦奋斗，他终于___了崇高理想。", o: ["放弃", "实现", "拒绝"], c: 1 },
  { p: "我们应当___人类文明的优秀成果。", o: ["否定", "继承", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他是教授。", "经过研究，使我们得到了启示。", "她喜欢历史。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["大家都到了。", "他大约七十岁左右上下。", "我学习哲学。"], c: 1 },
  { p: "信息时代呼唤理性思辨与人文关怀。", q: "时代呼唤？", o: ["盲从", "理性+人文", "拒绝"], c: 1 },
  { p: "伟大的成就源自非凡的___与执着。", o: ["懒惰", "毅力", "幻想"], c: 1 },
  { p: "展望未来，应秉持___与担当。", o: ["消极", "信念", "无所谓"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 完成 / 把 / 圆满地 / 使命 / 了", o: ["他圆满地把使命完成了。", "他把圆满地完成使命了。", "圆满地他完成使命把了。"], c: 0 },
  { p: "排序：协作 / 应当 / 强化 / 各方 / 之间", o: ["各方之间应当强化协作。", "应当协作各方强化之间。", "强化各方应当协作之间。"], c: 0 },
  { p: "选词：他___学术事业奉献了毕生精力。", o: ["为", "把", "对"], c: 0 },
  { p: "选词：他对传统文化怀有深厚的___。", o: ["敬意", "怀疑", "陌生"], c: 0 },
  { p: "选词：经过半生奋斗，他___了卓越的成就。", o: ["取得", "失去", "放弃"], c: 0 },
  { p: "选词：这次挫折让团队感到深深___。", o: ["遗憾", "高兴", "无聊"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h8m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h8m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h8m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk8Mock4: HskTest = {
  level: 8, code: "HSK8-MOCK-04", title: "HSK 8 Mock Test 04", titleVi: "Đề thi thử HSK 8 - Số 04",
  durationMin: 120, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 8 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 8 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
