/**
 * @file hsk4Mock2.ts - HSK 4 Mock Test 02 (compact)
 * Listening 12 + Reading 12 + Writing 6 = 30 Q, 70 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "我打算下个月去日本出差，大概一周。", q: "他下个月去日本做什么？", o: ["旅游", "出差", "留学"], c: 1 },
  { a: "这个电影虽然很长，但是非常感人。", q: "电影怎么样？", o: ["短又感人", "长但感人", "无聊"], c: 1 },
  { a: "我们公司最近招了很多新员工。", q: "公司最近怎么了？", o: ["裁员", "招新人", "搬家"], c: 1 },
  { a: "我女儿对画画非常感兴趣，每天都画。", q: "女儿喜欢什么？", o: ["唱歌", "画画", "跳舞"], c: 1, e: "对…感兴趣 = quan tâm đến…" },
  { a: "因为堵车，我比平时晚到了半个小时。", q: "他为什么晚到？", o: ["睡过头", "堵车", "找不到路"], c: 1 },
  { a: "这次考试的题目比上次难得多。", q: "这次考试怎么样？", o: ["更简单", "差不多", "更难"], c: 2 },
  { a: "请你把会议室的灯关一下，没人用了。", q: "他请别人做什么？", o: ["开灯", "关灯", "修灯"], c: 1 },
  { a: "我已经习惯了在国外的生活。", q: "他现在怎么样？", o: ["不适应", "已经习惯", "想回国"], c: 1 },
  { a: "通过这次活动，我认识了很多新朋友。", q: "活动有什么收获？", o: ["赚钱", "结交朋友", "学外语"], c: 1 },
  { a: "无论刮风下雨，他都坚持锻炼身体。", q: "他怎么锻炼？", o: ["只在晴天", "天气好才锻炼", "无论天气如何都坚持"], c: 2, e: "无论…都… = bất kể…đều…" },
  { a: "这家公司的老板对员工非常严格。", q: "老板怎么样？", o: ["很温和", "很严格", "不管事"], c: 1 },
  { a: "你最好早点儿睡觉，明天还要早起。", q: "他建议什么？", o: ["熬夜", "早睡", "看电视"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "随着科技的发展，人们的生活变得越来越方便。", q: "本段主要讲？", o: ["科技让生活方便", "科技很贵", "科技无用"], c: 0 },
  { p: "学习一门新语言，需要长时间的坚持和大量的练习。", q: "学语言需要？", o: ["坚持和练习", "只需要天赋", "短时间速成"], c: 0 },
  { p: "这本书的内容很精彩，我推荐你也读一读。", q: "他想干什么？", o: ["送书", "推荐书", "卖书"], c: 1 },
  { p: "保护环境是每个人的责任，不只是政府的事情。", q: "作者认为？", o: ["只是政府的事", "人人有责", "不重要"], c: 1 },
  { p: "他平时很忙，___周末才有时间陪家人。", o: ["只有", "因为", "如果"], c: 0, e: "只有…才…" },
  { p: "我已经___电影票了，明天晚上一起去看吧。", o: ["买", "买好", "买完"], c: 1, e: "买好 = đã mua xong sẵn." },
  { p: "经过努力，他终于___了梦想。", o: ["实现", "完成", "得到"], c: 0, e: "实现梦想 cố định." },
  { p: "我们要养成___读书的好习惯。", o: ["放弃", "讨厌", "坚持"], c: 2 },
  { p: "感谢你对我的___，我很感动。", o: ["帮助", "麻烦", "讨厌"], c: 0 },
  { p: "现在很多年轻人都喜欢一边工作，一边继续学习。", q: "本段说什么？", o: ["不喜欢学习", "工作与学习同时", "完全不工作"], c: 1 },
  { p: "幸福其实很简单，关键是要懂得知足。", q: "作者认为幸福源于？", o: ["有钱", "知足", "出名"], c: 1 },
  { p: "运动不仅能锻炼身体，___能让心情变好。", o: ["而且", "但是", "如果"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "排序：他 / 跑得 / 班里 / 在 / 最快", o: ["他在班里跑得最快。", "他跑得最快在班里。", "在班里他最快跑得。"], c: 0 },
  { p: "排序：把 / 老师 / 改完了 / 作业", o: ["老师把作业改完了。", "老师作业把改完了。", "把老师作业改完了。"], c: 0 },
  { p: "选词：他对工作非常___。", o: ["认真", "懒惰", "讨厌"], c: 0 },
  { p: "选词：通过这次旅行，我___了中国文化。", o: ["了解", "讨厌", "拒绝"], c: 0 },
  { p: "选词：医生建议我们多吃水果，少吃___食物。", o: ["健康", "油腻", "新鲜"], c: 1 },
  { p: "选词：他汉语水平进步得很快，已经能___地交流了。", o: ["流利", "困难", "复杂"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h4m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h4m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h4m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk4Mock2: HskTest = {
  level: 4, code: "HSK4-MOCK-02", title: "HSK 4 Mock Test 02", titleVi: "Đề thi thử HSK 4 - Số 02",
  durationMin: 70, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 4 mock.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 4 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu/hội thoại trung cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc đoạn + điền từ + đọc hiểu.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
