/**
 * @file hsk4Mock4.ts - HSK 4 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "为了减肥，她每天坚持跑步。", q: "她每天做什么？", o: ["跳舞", "跑步", "游泳"], c: 1 },
  { a: "经理建议我们提前准备会议材料。", q: "经理建议？", o: ["取消会议", "提前准备", "推迟会议"], c: 1 },
  { a: "他工作认真，所以同事都很喜欢他。", q: "同事为何喜欢他？", o: ["有钱", "工作认真", "幽默"], c: 1 },
  { a: "这家餐厅的菜很好吃，可是有点儿贵。", q: "餐厅怎么样？", o: ["便宜+难吃", "好吃+贵", "差+贵"], c: 1 },
  { a: "如果明天不下雨，我们就去爬山。", q: "去爬山的条件？", o: ["有钱", "不下雨", "周末"], c: 1 },
  { a: "他刚搬到一个安静的小区。", q: "新小区怎样？", o: ["热闹", "安静", "脏"], c: 1 },
  { a: "学习一门外语需要长期坚持。", q: "学外语关键？", o: ["速度", "长期坚持", "天赋"], c: 1 },
  { a: "因为路上堵车，我比平时晚到了半小时。", q: "他迟到多久？", o: ["10分钟", "半小时", "1小时"], c: 1 },
  { a: "她的爱好是收集邮票，已经收集了十多年。", q: "她的爱好？", o: ["集邮", "画画", "唱歌"], c: 0 },
  { a: "无论遇到什么困难，他都不会轻易放弃。", q: "关于他？", o: ["容易放弃", "不轻易放弃", "怕困难"], c: 1 },
  { a: "公司决定下个月给员工加薪。", q: "下个月？", o: ["裁员", "加薪", "放假"], c: 1 },
  { a: "他终于通过了驾照考试。", q: "考试结果？", o: ["失败", "通过", "没考"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "保持好心情有助于身体健康。", q: "本段主旨？", o: ["心情无关", "好心情有益健康", "运动最重要"], c: 1 },
  { p: "随着科技发展，人们的生活越来越方便。", q: "本段说？", o: ["生活变难", "更方便", "无变化"], c: 1 },
  { p: "礼貌的微笑能拉近人与人之间的距离。", q: "微笑的作用？", o: ["距离更远", "拉近距离", "无关"], c: 1 },
  { p: "这位老师讲课___，学生们都很喜欢。", o: ["生动", "无聊", "缓慢"], c: 0 },
  { p: "他工作___负责，从不出错。", o: ["认真", "马虎", "懒"], c: 0 },
  { p: "通过努力学习，他终于___了好成绩。", o: ["失去", "取得", "拒绝"], c: 1 },
  { p: "经理对这个方案表示___。", o: ["反对", "满意", "无所谓"], c: 1 },
  { p: "我们应当___朋友的建议。", o: ["拒绝", "接受", "忽视"], c: 1 },
  { p: "学生应当尊敬老师。", q: "本句强调？", o: ["不尊敬", "应尊敬", "无所谓"], c: 1 },
  { p: "这次旅游让我大开___界。", o: ["眼", "心", "手"], c: 0 },
  { p: "面对挑战，要保持___的心态。", o: ["消极", "积极", "放弃"], c: 1 },
  { p: "经过反复练习，他___掌握了这项技能。", o: ["失去", "终于", "拒绝"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 工作 / 努力 / 非常 / 地", o: ["他非常努力地工作。", "工作他非常努力地。", "努力他非常地工作。"], c: 0 },
  { p: "排序：把 / 我 / 看完了 / 这本书", o: ["我把这本书看完了。", "这本书把我看完了。", "把我这本书看完了。"], c: 0 },
  { p: "选词：他对工作非常___。", o: ["认真", "马虎", "无聊"], c: 0 },
  { p: "选词：经过努力，她终于___了成功。", o: ["获得", "失去", "拒绝"], c: 0 },
  { p: "选词：请你___一下今天的会议。", o: ["介绍", "出门", "听见"], c: 0 },
  { p: "选词：他___把作业交给老师。", o: ["已经", "也许", "永远"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h4m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h4m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h4m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk4Mock4: HskTest = {
  level: 4, code: "HSK4-MOCK-04", title: "HSK 4 Mock Test 04", titleVi: "Đề thi thử HSK 4 - Số 04",
  durationMin: 75, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 4 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 4 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu/hội thoại trung cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc đoạn ngắn → chọn đáp án.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu / chọn từ.", questions: W },
  ],
};
