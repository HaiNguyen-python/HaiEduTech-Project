/**
 * @file hsk3Mock3.ts - HSK 3 Mock Test 03 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "我打算暑假去上海旅游。", q: "他暑假做什么？", o: ["工作", "旅游", "学习"], c: 1 },
  { a: "我哥哥的爱好是打篮球。", q: "哥哥的爱好？", o: ["足球", "篮球", "唱歌"], c: 1 },
  { a: "他已经把房间打扫干净了。", q: "他做什么了？", o: ["睡觉", "打扫房间", "做饭"], c: 1 },
  { a: "这家店的菜不太好吃，但是很便宜。", q: "这家店怎么样？", o: ["贵又难吃", "便宜但难吃", "便宜又好吃"], c: 1 },
  { a: "对不起，我把你的杯子打破了。", q: "他怎么了？", o: ["丢了杯子", "打破了杯子", "买了杯子"], c: 1 },
  { a: "听说明天会下雪。", q: "明天天气？", o: ["晴", "下雪", "下雨"], c: 1 },
  { a: "我姐姐的男朋友是医生。", q: "姐姐男友的职业？", o: ["老师", "医生", "司机"], c: 1 },
  { a: "请你帮我把这封信寄出去。", q: "他请人做什么？", o: ["写信", "寄信", "读信"], c: 1 },
  { a: "如果你累了，就早点休息吧。", q: "他建议什么？", o: ["熬夜", "早休息", "运动"], c: 1 },
  { a: "虽然下雨了，但是我们还是去公园了。", q: "他们去了哪里？", o: ["没出门", "公园", "电影院"], c: 1 },
  { a: "我家附近有一个超市，很方便。", q: "他家附近有什么？", o: ["医院", "超市", "学校"], c: 1 },
  { a: "因为堵车，我迟到了十分钟。", q: "他为什么迟到？", o: ["睡过头", "堵车", "下雨"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "我每天都要喝八杯水，对身体很好。", q: "他每天做什么？", o: ["喝水", "喝茶", "喝咖啡"], c: 0 },
  { p: "北京的春天有时候有沙尘暴。", q: "北京春天怎么样？", o: ["很美", "有沙尘暴", "无变化"], c: 1 },
  { p: "请把窗户关上，外面太冷了。", q: "他想做什么？", o: ["开窗", "关窗", "买窗"], c: 1 },
  { p: "中秋节中国人喜欢一起吃月饼。", q: "中秋节做什么？", o: ["吃饺子", "吃月饼", "吃粽子"], c: 1 },
  { p: "学习外语最重要的是要___练习。", o: ["放弃", "多", "停止"], c: 1 },
  { p: "他___生病了，___还是来上课。", o: ["虽然…但是", "因为…所以", "如果…就"], c: 0 },
  { p: "我们要___老师和长辈。", o: ["尊敬", "讨厌", "忘记"], c: 0 },
  { p: "这次比赛我得了第二名，下次要___努力。", o: ["懒", "更", "少"], c: 1 },
  { p: "她的爱好是听音乐和看电影。", q: "她的爱好？", o: ["音乐+电影", "运动", "购物"], c: 0 },
  { p: "这件衣服比那件___，但样式更好看。", o: ["便宜", "贵", "短"], c: 1 },
  { p: "笑能让人感到轻松和开心。", q: "笑有什么好处？", o: ["让人累", "让人轻松开心", "让人难过"], c: 1 },
  { p: "请___下午五点之前回复邮件。", o: ["把", "在", "到"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 看书 / 喜欢 / 很", o: ["他很喜欢看书。", "看书他很喜欢。", "喜欢他很看书。"], c: 0 },
  { p: "排序：把 / 我 / 喝完了 / 茶", o: ["我把茶喝完了。", "茶把我喝完了。", "把我茶喝完了。"], c: 0 },
  { p: "填字：他___去过北京三次。", o: ["已经", "也许", "永远"], c: 0 },
  { p: "填字：这件事___让我感动。", o: ["真", "假", "很"], c: 2 },
  { p: "选词：房间太___，需要打扫。", o: ["乱", "干净", "漂亮"], c: 0 },
  { p: "选词：请你给我们___一下你的家乡。", o: ["介绍", "出去", "听见"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h3m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h3m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h3m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk3Mock3: HskTest = {
  level: 3, code: "HSK3-MOCK-03", title: "HSK 3 Mock Test 03", titleVi: "Đề thi thử HSK 3 - Số 03",
  durationMin: 60, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 3 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 3 rút gọn #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu/hội thoại ngắn.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc đoạn ngắn → chọn đáp án.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu / chọn từ.", questions: W },
  ],
};
