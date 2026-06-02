/**
 * @file hsk9Mock4.ts - HSK 9 Mock Test 04 (compact, advanced literary)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "新时代的文学创作呈现出多元交融的态势。", q: "本段说？", o: ["单一", "多元交融", "停滞"], c: 1 },
  { a: "他治学严谨，文章字斟句酌，从不敷衍。", q: "他治学？", o: ["敷衍", "严谨", "潦草"], c: 1 },
  { a: "本届论坛探讨人工智能与人文精神的关系。", q: "探讨？", o: ["金融", "AI与人文", "体育"], c: 1 },
  { a: "为完成这部巨著，作家历时十年寒暑。", q: "他在做？", o: ["旅行", "著书", "经商"], c: 1 },
  { a: "调研结果揭示城乡教育资源差距正在缩小。", q: "结果揭示？", o: ["差距扩大", "差距缩小", "无变化"], c: 1 },
  { a: "他不仅学贯中西，处世亦颇具儒者风范。", q: "关于他？", o: ["仅学问好", "学问+风范皆佳", "都差"], c: 1 },
  { a: "这部典籍辑录了历代名家的思想精华。", q: "典籍？", o: ["浅显", "辑录精华", "无价值"], c: 1 },
  { a: "做学问当具备求真务实、独立思辨的精神。", q: "强调？", o: ["盲从", "求真+思辨", "速成"], c: 1 },
  { a: "经过深入磋商，两国签署了战略合作文件。", q: "结果？", o: ["破裂", "签署文件", "终止"], c: 1 },
  { a: "全球性议题呼唤构建人类命运共同体。", q: "呼唤？", o: ["对抗", "共同体", "孤立"], c: 1 },
  { a: "他穷尽一生，致力于古籍整理与文化传承。", q: "致力于？", o: ["金融", "古籍文化", "娱乐"], c: 1 },
  { a: "生态文明建设关乎民族永续发展。", q: "本段主旨？", o: ["无关", "永续发展", "已解决"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "岁月如歌，唯有躬身实践方能著书立说。", q: "作者认为？", o: ["空想", "躬身实践", "放弃"], c: 1 },
  { p: "深邃的思想往往源于对生活的细致观察。", q: "本段强调？", o: ["天赋", "细致观察", "运气"], c: 1 },
  { p: "面对纷繁世事，应当秉持中正之心。", q: "建议？", o: ["偏激", "中正", "退缩"], c: 1 },
  { p: "他的著作影响深远，被誉为学界___之作。", o: ["典范", "平庸", "失败"], c: 0 },
  { p: "这项事业意义非凡，令人深感___。", o: ["崇高", "无聊", "失望"], c: 0 },
  { p: "经过毕生求索，他终于___了真理之门。", o: ["关闭", "叩开", "拒绝"], c: 1 },
  { p: "我们应当___先贤的智慧与情怀。", o: ["否定", "传承", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他著书立说。", "经过研究，使学界获得了启示。", "她精通历史。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["大家齐聚一堂。", "他大约八十岁左右上下。", "我钻研典籍。"], c: 1 },
  { p: "盛世呼唤理性与人文交融的智识阶层。", q: "盛世呼唤？", o: ["盲从", "理性+人文", "拒绝"], c: 1 },
  { p: "千秋伟业源自非凡的___与笃行。", o: ["懒惰", "信念", "幻想"], c: 1 },
  { p: "展望未来，要怀揣___与担当之心。", o: ["消极", "理想", "无所谓"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 完成 / 把 / 圆满地 / 巨著 / 了", o: ["他圆满地把巨著完成了。", "他把圆满地完成巨著了。", "圆满地他完成巨著把了。"], c: 0 },
  { p: "排序：交流 / 应当 / 深化 / 文化 / 之间", o: ["文化之间应当深化交流。", "应当交流文化深化之间。", "深化文化应当交流之间。"], c: 0 },
  { p: "选词：他___学术与文化奉献了毕生心血。", o: ["为", "把", "对"], c: 0 },
  { p: "选词：他对中华文明怀有深厚的___。", o: ["敬意", "怀疑", "陌生"], c: 0 },
  { p: "选词：经过半生研磨，他___了卓尔不群的成就。", o: ["取得", "失去", "放弃"], c: 0 },
  { p: "选词：典籍散佚令学界感到深深的___。", o: ["遗憾", "高兴", "无聊"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h9m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h9m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h9m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk9Mock4: HskTest = {
  level: 9, code: "HSK9-MOCK-04", title: "HSK 9 Mock Test 04", titleVi: "Đề thi thử HSK 9 - Số 04",
  durationMin: 130, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 9 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 9 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn cao cấp văn học.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
