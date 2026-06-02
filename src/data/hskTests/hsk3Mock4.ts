/**
 * @file hsk3Mock4.ts - HSK 3 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "我打算下个月去日本旅游。", q: "下个月做什么？", o: ["工作", "去日本", "搬家"], c: 1 },
  { a: "她的爱好是唱歌和跳舞。", q: "她的爱好？", o: ["跑步", "唱歌跳舞", "画画"], c: 1 },
  { a: "他已经把作业写完了。", q: "他做什么？", o: ["开始作业", "写完作业", "忘了作业"], c: 1 },
  { a: "这家咖啡馆不太贵，但环境很安静。", q: "咖啡馆怎样？", o: ["贵又吵", "便宜+安静", "贵+安静"], c: 1 },
  { a: "对不起，我把你的伞丢了。", q: "发生了什么？", o: ["买了伞", "丢了伞", "借了伞"], c: 1 },
  { a: "听说明天会刮风。", q: "明天天气？", o: ["晴", "有风", "下雪"], c: 1 },
  { a: "我哥哥是公司经理。", q: "哥哥职业？", o: ["老师", "经理", "司机"], c: 1 },
  { a: "请帮我把这本书还给老师。", q: "请帮什么？", o: ["买书", "还书", "借书"], c: 1 },
  { a: "你感冒了，多喝水休息吧。", q: "建议什么？", o: ["运动", "喝水休息", "工作"], c: 1 },
  { a: "虽然很累，但是我还是要完成工作。", q: "他要做什么？", o: ["放弃", "完成工作", "睡觉"], c: 1 },
  { a: "我家附近有一个公园，每天去散步。", q: "他每天做？", o: ["买菜", "散步", "购物"], c: 1 },
  { a: "因为路上堵车，他迟到了二十分钟。", q: "迟到原因？", o: ["睡懒觉", "堵车", "下雨"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "我每天要锻炼一个小时，对身体好。", q: "他每天做？", o: ["看电视", "锻炼", "睡觉"], c: 1 },
  { p: "上海的冬天不太冷，但有时候下雨。", q: "上海冬天？", o: ["很冷", "不冷有时雨", "总下雪"], c: 1 },
  { p: "请把灯关上，我要睡觉了。", q: "他想？", o: ["开灯", "关灯", "买灯"], c: 1 },
  { p: "春节中国人喜欢一起吃饺子。", q: "春节做？", o: ["吃月饼", "吃饺子", "吃粽子"], c: 1 },
  { p: "学外语最重要是要___开口说。", o: ["少", "多", "不"], c: 1 },
  { p: "他___努力，___成绩很好。", o: ["因为…所以", "虽然…但是", "如果…就"], c: 0 },
  { p: "我们要___老人和孩子。", o: ["关心", "讨厌", "忘记"], c: 0 },
  { p: "这次考试我没考好，下次要___努力。", o: ["少", "更", "停止"], c: 1 },
  { p: "她的爱好是看书和写日记。", q: "她爱好？", o: ["看书+日记", "购物", "唱歌"], c: 0 },
  { p: "这件外套比那件___，但更暖和。", o: ["便宜", "贵", "短"], c: 1 },
  { p: "笑能让人感到快乐和放松。", q: "笑的好处？", o: ["让人累", "快乐放松", "让人哭"], c: 1 },
  { p: "请___晚上八点前到家。", o: ["把", "在", "向"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：她 / 跳舞 / 喜欢 / 非常", o: ["她非常喜欢跳舞。", "跳舞她喜欢非常。", "喜欢她非常跳舞。"], c: 0 },
  { p: "排序：把 / 我 / 吃完了 / 苹果", o: ["我把苹果吃完了。", "苹果把我吃完了。", "把我苹果吃完了。"], c: 0 },
  { p: "填字：他___去过上海两次。", o: ["已经", "也许", "永远"], c: 0 },
  { p: "填字：这件事___让我感动。", o: ["真", "假", "很"], c: 2 },
  { p: "选词：教室太___，需要打扫。", o: ["脏", "干净", "新"], c: 0 },
  { p: "选词：请___一下你的家人。", o: ["介绍", "出门", "听见"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h3m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h3m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h3m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk3Mock4: HskTest = {
  level: 3, code: "HSK3-MOCK-04", title: "HSK 3 Mock Test 04", titleVi: "Đề thi thử HSK 3 - Số 04",
  durationMin: 60, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 3 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 3 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu/hội thoại ngắn.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc đoạn ngắn → chọn đáp án.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu / chọn từ.", questions: W },
  ],
};
