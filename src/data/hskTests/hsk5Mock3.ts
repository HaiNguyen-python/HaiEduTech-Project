/**
 * @file hsk5Mock3.ts - HSK 5 Mock Test 03 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows = [
  { a: "随着外卖行业的兴起，许多人改变了用餐习惯。", q: "本段说？", o: ["外卖衰退", "改变用餐习惯", "无变化"], c: 1 },
  { a: "他做事一向认真负责，从不马虎。", q: "他工作怎样？", o: ["马虎", "认真", "懒"], c: 1 },
  { a: "今天会议的主题是公司未来三年的发展规划。", q: "会议讨论？", o: ["辞职", "三年规划", "旅游"], c: 1 },
  { a: "为了顺利通过面试，她准备了整整一个月。", q: "她为何努力？", o: ["考试", "面试", "比赛"], c: 1 },
  { a: "调查显示，城市居民更倾向于绿色出行。", q: "调查显示？", o: ["开车出行", "绿色出行", "不出门"], c: 1 },
  { a: "他不仅工作能力强，人际关系也处理得很好。", q: "关于他？", o: ["仅工作好", "工作+人际都好", "都不好"], c: 1 },
  { a: "这家咖啡馆环境舒适，价格也合理。", q: "咖啡馆？", o: ["贵且差", "舒适且合理", "差且便宜"], c: 1 },
  { a: "学习一项技能贵在反复练习。", q: "作者认为？", o: ["放弃", "反复练习", "换技能"], c: 1 },
  { a: "通过这次谈判，双方达成了重要的合作协议。", q: "结果？", o: ["失败", "达成协议", "推迟"], c: 1 },
  { a: "现代人工作压力大，需要学会放松。", q: "现代人需要？", o: ["更努力", "学会放松", "拒绝工作"], c: 1 },
  { a: "他从小热爱绘画，后来成为了一位画家。", q: "他的职业？", o: ["医生", "画家", "教师"], c: 1 },
  { a: "塑料污染已成为全球性环境问题。", q: "本段主旨？", o: ["塑料无害", "塑料污染严重", "无关环境"], c: 1 },
];

const rRows = [
  { p: "时间不会等任何人，珍惜当下才是最重要的。", q: "作者认为？", o: ["时间无价", "珍惜当下", "等待时机"], c: 1 },
  { p: "良好的沟通能力是职场成功的关键。", q: "本段强调？", o: ["技术最重要", "沟通是关键", "无关紧要"], c: 1 },
  { p: "遇到困难时，应当冷静分析，而不是慌乱。", q: "建议？", o: ["慌乱", "冷静分析", "逃避"], c: 1 },
  { p: "她的表演非常出色，赢得了观众的___。", o: ["喝彩", "嘲笑", "无视"], c: 0 },
  { p: "这份工作充满挑战，但很有___感。", o: ["成就", "失落", "无聊"], c: 0 },
  { p: "经过努力，他终于___了大家的认可。", o: ["失去", "获得", "拒绝"], c: 1 },
  { p: "我们应当___历史，以史为鉴。", o: ["遗忘", "尊重", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他喜欢读书。", "经过研究，使我们得出结论。", "她是老师。"], c: 1, e: "经过…使… 缺主语。" },
  { p: "请选出有语病的一句。", o: ["大家都来了。", "他大概四十岁左右。", "我喜欢音乐。"], c: 1 },
  { p: "当今社会信息泛滥，我们要学会筛选。", q: "作者建议？", o: ["全部接受", "学会筛选", "拒绝信息"], c: 1 },
  { p: "成功靠的是___与坚持，而非运气。", o: ["懒惰", "努力", "幻想"], c: 1 },
  { p: "面对未来，我们应当保持___的态度。", o: ["消极", "乐观", "无所谓"], c: 1 },
];

const wRows = [
  { p: "排序：他 / 处理 / 把 / 完美地 / 事情 / 了", o: ["他完美地把事情处理了。", "他把完美地处理事情了。", "完美地他处理事情把了。"], c: 0 },
  { p: "排序：尊重 / 应当 / 互相 / 同事 / 之间", o: ["同事之间应当互相尊重。", "应当尊重同事互相之间。", "互相同事应当尊重之间。"], c: 0 },
  { p: "选词：他___公司付出了很多努力。", o: ["为", "把", "对"], c: 0 },
  { p: "选词：他对老人非常___，常去看望。", o: ["尊敬", "讨厌", "陌生"], c: 0 },
  { p: "选词：经过多年奋斗，她终于___了自己的事业。", o: ["建立", "失去", "拒绝"], c: 0 },
  { p: "选词：比赛失利，让队员们都很___。", o: ["失望", "高兴", "无聊"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h5m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h5m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h5m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk5Mock3: HskTest = {
  level: 5, code: "HSK5-MOCK-03", title: "HSK 5 Mock Test 03", titleVi: "Đề thi thử HSK 5 - Số 03",
  durationMin: 90, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 5 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 5 rút gọn #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn trung-cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
