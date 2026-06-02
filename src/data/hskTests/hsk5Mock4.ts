/**
 * @file hsk5Mock4.ts - HSK 5 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "随着人工智能的发展，许多行业正在发生变革。", q: "本段说？", o: ["AI停滞", "行业变革", "无关"], c: 1 },
  { a: "他做事一向细心，从不疏忽细节。", q: "他做事怎样？", o: ["粗心", "细心", "懒"], c: 1 },
  { a: "今天会议的核心议题是新产品上市策略。", q: "议题？", o: ["人事调整", "新产品策略", "财务"], c: 1 },
  { a: "为了准备这场演讲，她花了整整一周时间。", q: "她在做？", o: ["旅游", "准备演讲", "购物"], c: 1 },
  { a: "调查表明，越来越多的年轻人选择环保生活方式。", q: "调查显示？", o: ["浪费", "环保生活", "无变化"], c: 1 },
  { a: "他不仅业务能力突出，沟通能力也很强。", q: "关于他？", o: ["仅业务好", "业务+沟通都好", "都差"], c: 1 },
  { a: "这家书店环境优雅，咖啡也很不错。", q: "书店？", o: ["差且贵", "优雅+好咖啡", "脏乱"], c: 1 },
  { a: "掌握一门技能贵在持之以恒。", q: "作者强调？", o: ["放弃", "持之以恒", "速成"], c: 1 },
  { a: "通过谈判，双方在多个领域达成了共识。", q: "结果？", o: ["未达成", "达成共识", "终止"], c: 1 },
  { a: "现代人生活节奏快，应当学会调节情绪。", q: "应当？", o: ["更紧张", "调节情绪", "放弃"], c: 1 },
  { a: "他从小喜欢音乐，后来成为了一名作曲家。", q: "职业？", o: ["医生", "作曲家", "教师"], c: 1 },
  { a: "全球变暖是当今最紧迫的环境问题之一。", q: "本段主旨？", o: ["无影响", "变暖紧迫", "已解决"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "时光易逝，唯有珍惜方能不负年华。", q: "作者认为？", o: ["浪费时光", "珍惜时光", "等待"], c: 1 },
  { p: "高效的团队协作是项目成功的关键。", q: "本段强调？", o: ["个人能力", "团队协作", "运气"], c: 1 },
  { p: "面对压力，应当学会理性应对，而非逃避。", q: "建议？", o: ["逃避", "理性应对", "放弃"], c: 1 },
  { p: "她的演讲非常精彩，赢得了观众的___。", o: ["掌声", "嘘声", "无视"], c: 0 },
  { p: "这份工作充满挑战，但也很有___。", o: ["意义", "无聊", "失望"], c: 0 },
  { p: "经过反复努力，他最终___了梦想。", o: ["放弃", "实现", "拒绝"], c: 1 },
  { p: "我们应当___传统文化，传承精神。", o: ["遗忘", "尊重", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他是医生。", "经过讨论，使大家明白了。", "她喜欢音乐。"], c: 1, e: "经过…使… 缺主语。" },
  { p: "请选出有语病的一句。", o: ["大家都来了。", "他大约三十岁左右。", "我学习汉语。"], c: 1 },
  { p: "信息时代要求我们具备筛选信息的能力。", q: "时代要求？", o: ["接受全部", "筛选信息", "拒绝"], c: 1 },
  { p: "成功离不开___与坚持。", o: ["懒惰", "努力", "幻想"], c: 1 },
  { p: "面对未来，要保持___的心态。", o: ["消极", "积极", "无所谓"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string }[] = [
  { p: "排序：他 / 完成 / 把 / 顺利地 / 任务 / 了", o: ["他顺利地把任务完成了。", "他把顺利地完成任务了。", "顺利地他完成任务把了。"], c: 0 },
  { p: "排序：理解 / 应当 / 互相 / 朋友 / 之间", o: ["朋友之间应当互相理解。", "应当理解朋友互相之间。", "互相朋友应当理解之间。"], c: 0 },
  { p: "选词：他___公司付出了全部精力。", o: ["为", "把", "对"], c: 0 },
  { p: "选词：他对长辈非常___。", o: ["尊敬", "讨厌", "陌生"], c: 0 },
  { p: "选词：经过多年努力，她终于___了事业。", o: ["建立", "失去", "放弃"], c: 0 },
  { p: "选词：比赛失利让队员们都很___。", o: ["失望", "高兴", "无聊"], c: 0 },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h5m4-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h5m4-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h5m4-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk5Mock4: HskTest = {
  level: 5, code: "HSK5-MOCK-04", title: "HSK 5 Mock Test 04", titleVi: "Đề thi thử HSK 5 - Số 04",
  durationMin: 90, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 5 mock #4.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 5 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn trung-cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ.", questions: W },
  ],
};
