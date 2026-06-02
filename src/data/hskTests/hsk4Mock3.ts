/**
 * @file hsk4Mock3.ts - HSK 4 Mock Test 03 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "我打算下周末跟朋友一起去爬长城。", q: "他下周末做什么？", o: ["看电影", "爬长城", "工作"], c: 1 },
  { a: "这部小说虽然长，但情节很吸引人。", q: "小说怎么样？", o: ["短无聊", "长但吸引人", "无趣"], c: 1 },
  { a: "我们公司最近搬到了新的办公楼。", q: "公司怎么了？", o: ["关闭", "搬家", "扩张"], c: 1 },
  { a: "我儿子对足球特别感兴趣，每天放学就去踢。", q: "儿子喜欢什么？", o: ["篮球", "足球", "游泳"], c: 1 },
  { a: "因为天气不好，飞机推迟了两个小时起飞。", q: "飞机怎么了？", o: ["取消", "推迟", "提前"], c: 1 },
  { a: "这次的考试题目比预想的简单。", q: "考试怎么样？", o: ["更难", "更简单", "差不多"], c: 1 },
  { a: "请你把空调温度调低一点儿。", q: "他请人做什么？", o: ["关空调", "调低温度", "开窗"], c: 1 },
  { a: "我终于适应了这里的生活节奏。", q: "他现在怎样？", o: ["不适应", "适应了", "想搬走"], c: 1 },
  { a: "通过这次实习，我学到了很多实用的知识。", q: "实习有何收获？", o: ["赚钱", "学知识", "出名"], c: 1 },
  { a: "不管多忙，他每天都坚持读书一小时。", q: "他每天做什么？", o: ["看电视", "读书", "睡觉"], c: 1 },
  { a: "这家公司对应聘者的要求非常高。", q: "公司怎么样？", o: ["要求低", "要求高", "不招人"], c: 1 },
  { a: "你最好提前预订餐厅，周末人比较多。", q: "他建议什么？", o: ["不去", "预订餐厅", "改时间"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "互联网的出现，让世界变成了一个地球村。", q: "本段主要讲？", o: ["互联网连接世界", "互联网无用", "村庄变大"], c: 0 },
  { p: "想要学好一门技能，离不开持之以恒的练习。", q: "学技能需要？", o: ["练习", "天赋", "运气"], c: 0 },
  { p: "这家餐厅的服务态度好，菜也好吃，值得推荐。", q: "作者想？", o: ["批评", "推荐", "投诉"], c: 1 },
  { p: "节约用水是我们每个人的责任。", q: "作者认为？", o: ["浪费水", "人人节约", "无所谓"], c: 1 },
  { p: "我太忙了，___周末才能见到家人。", o: ["只有", "因为", "如果"], c: 0 },
  { p: "我已经___机票了，下周就出发。", o: ["买", "买好", "买完"], c: 1 },
  { p: "经过几年的努力，他___了自己的目标。", o: ["实现", "完成", "得到"], c: 0 },
  { p: "我们要养成___思考的好习惯。", o: ["放弃", "独立", "讨厌"], c: 1 },
  { p: "谢谢你这段时间的___，我非常感动。", o: ["关心", "麻烦", "讨厌"], c: 0 },
  { p: "越来越多的年轻人选择回到家乡创业。", q: "本段说？", o: ["都去城市", "回乡创业", "都辞职"], c: 1 },
  { p: "真正的成功不在于得到了多少，而在于___了多少。", o: ["失去", "付出", "拒绝"], c: 1 },
  { p: "运动不仅有益健康，___能让人心情愉快。", o: ["而且", "但是", "如果"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 写得 / 同学中 / 在 / 最好", o: ["他在同学中写得最好。", "他写得最好在同学中。", "在同学中他最好写得。"], c: 0 },
  { p: "排序：把 / 妈妈 / 做好了 / 晚饭", o: ["妈妈把晚饭做好了。", "妈妈晚饭把做好了。", "把妈妈晚饭做好了。"], c: 0 },
  { p: "选词：他对学习非常___。", o: ["认真", "懒惰", "讨厌"], c: 0 },
  { p: "选词：通过这次比赛，我___了不少经验。", o: ["积累", "失去", "拒绝"], c: 0 },
  { p: "选词：医生建议大家少吃___食物。", o: ["健康", "油腻", "新鲜"], c: 1 },
  { p: "选词：她中文进步很快，能___地交谈了。", o: ["流利", "困难", "复杂"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h4m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h4m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h4m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk4Mock3: HskTest = {
  level: 4, code: "HSK4-MOCK-03", title: "HSK 4 Mock Test 03", titleVi: "Đề thi thử HSK 4 - Số 03",
  durationMin: 70, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 4 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 4 rút gọn #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu/hội thoại trung cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc đoạn + điền từ.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
