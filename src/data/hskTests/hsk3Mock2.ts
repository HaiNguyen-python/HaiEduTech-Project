/**
 * @file hsk3Mock2.ts - HSK 3 Mock Test 02 (compact)
 * Listening 12 + Reading 12 + Writing 6 = 30 Q, 60 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "明天是周末，我打算去爬山。", q: "他周末打算做什么？", o: ["爬山", "游泳", "睡觉"], c: 0 },
  { a: "我最喜欢的运动是打篮球。", q: "他喜欢什么运动？", o: ["足球", "篮球", "网球"], c: 1 },
  { a: "你别担心，我已经把作业写完了。", q: "他做完了什么？", o: ["饭", "作业", "工作"], c: 1 },
  { a: "这家饭馆的菜又便宜又好吃。", q: "饭馆的菜怎么样？", o: ["贵但好吃", "便宜又好吃", "便宜但难吃"], c: 1, e: "又…又… = vừa…vừa…" },
  { a: "对不起，我可能要迟到五分钟。", q: "他怎么了？", o: ["生病了", "可能迟到", "很高兴"], c: 1 },
  { a: "听天气预报说明天会下大雨。", q: "明天天气怎么样？", o: ["晴天", "下大雨", "下雪"], c: 1 },
  { a: "我哥哥的女朋友是一名护士。", q: "他哥哥的女朋友做什么工作？", o: ["医生", "护士", "老师"], c: 1 },
  { a: "请你帮我把这本书还给图书馆。", q: "他请别人做什么？", o: ["买书", "还书", "借书"], c: 1, e: "把字句: 把书还给…" },
  { a: "如果你有问题，可以打电话问我。", q: "有问题怎么办？", o: ["发邮件", "打电话", "发短信"], c: 1 },
  { a: "虽然今天很冷，但是阳光很好。", q: "今天天气怎么样？", o: ["冷且阴", "冷但有阳光", "热且有阳光"], c: 1 },
  { a: "我们公司离地铁站很近，走路五分钟就到。", q: "公司怎么样？", o: ["很远", "离地铁近", "在地铁里"], c: 1 },
  { a: "他生病了，所以今天没来上班。", q: "他为什么没来？", o: ["旅游", "生病", "开会"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "我每天都坚持锻炼身体，这样才能有好的身体。", q: "他每天做什么？", o: ["锻炼身体", "看电视", "睡觉"], c: 0 },
  { p: "这个城市的交通很方便，特别是地铁。", q: "城市的交通怎么样？", o: ["不方便", "很方便", "很堵"], c: 1 },
  { p: "请把空调关上，外面很凉快。", q: "说话人想做什么？", o: ["开空调", "关空调", "买空调"], c: 1, e: "把…关上 = đóng/tắt." },
  { p: "中国人喜欢在春节的时候和家人一起吃饭。", q: "春节中国人做什么？", o: ["旅游", "和家人吃饭", "工作"], c: 1 },
  { p: "学习汉语最重要的是要___。", o: ["放弃", "坚持", "睡觉"], c: 1 },
  { p: "他___生病了，___还是来上班了。", o: ["虽然…但是", "因为…所以", "如果…就"], c: 0 },
  { p: "我们应该多___老人和小孩。", o: ["关心", "讨厌", "忘记"], c: 0 },
  { p: "这次考试我考得不太好，下次一定要更___。", o: ["懒", "努力", "高兴"], c: 1 },
  { p: "他的爱好是收集邮票，已经收集了很多年。", q: "他的爱好是？", o: ["画画", "收集邮票", "拍照"], c: 1 },
  { p: "这个手机比那个___，但是功能更多。", o: ["便宜", "贵", "小"], c: 1, e: "Đối lập: đắt nhưng tính năng nhiều." },
  { p: "听音乐能让人感到放松和快乐。", q: "听音乐有什么好处？", o: ["让人累", "让人放松快乐", "让人生气"], c: 1 },
  { p: "请你___下午三点之前把报告交给我。", o: ["把", "在", "到"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 学习 / 努力 / 很", o: ["他很努力学习。", "学习他很努力。", "努力他学习很。"], c: 0 },
  { p: "排序：把 / 我 / 关上了 / 门", o: ["我把门关上了。", "门把我关上了。", "把我门关上了。"], c: 0, e: "把字句: S + 把 + O + V + 了." },
  { p: "填字：他___打算去中国旅游。", o: ["明年", "明明", "命运"], c: 0 },
  { p: "填字：这件衣服___小了一点。", o: ["有", "在", "有点儿"], c: 2, e: "有点儿 = hơi (mang nghĩa không hài lòng)." },
  { p: "选词：这个房间太___了，应该打扫一下。", o: ["脏", "干净", "好看"], c: 0 },
  { p: "选词：请你___一下中国的首都。", o: ["介绍", "出去", "听见"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h3m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h3m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h3m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk3Mock2: HskTest = {
  level: 3, code: "HSK3-MOCK-02", title: "HSK 3 Mock Test 02", titleVi: "Đề thi thử HSK 3 - Số 02",
  durationMin: 60, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 3 mock.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 3 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu/hội thoại ngắn → chọn đáp án.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc câu/đoạn ngắn → chọn đáp án.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu / chọn từ thích hợp.", questions: W },
  ],
};
