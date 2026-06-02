/**
 * @file hsk6Mock2.ts - HSK 6 Mock Test 02 (compact)
 * Listening 12 + Reading 12 + Writing 1 = 25 Q, 100 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows = [
  { a: "近年来，共享经济在中国发展迅猛，深刻改变了人们的消费方式。", q: "本段说明？", o: ["共享经济衰退", "共享经济改变消费", "传统消费回归"], c: 1 },
  { a: "专家建议，青少年每天使用电子产品的时间不应超过两小时。", q: "专家的建议？", o: ["完全禁用", "每天不超过2小时", "无限制"], c: 1 },
  { a: "他在采访中坦言，最大的成功秘诀就是从不放弃。", q: "他的成功秘诀？", o: ["运气", "从不放弃", "天赋"], c: 1 },
  { a: "随着人口老龄化加剧，养老问题日益突出。", q: "本段反映？", o: ["人口减少", "老龄化带来养老压力", "年轻人增多"], c: 1 },
  { a: "据报告，过度使用社交媒体可能影响心理健康。", q: "报告指出？", o: ["社交媒体有益", "影响心理健康", "无影响"], c: 1 },
  { a: "他认为，真正的教育不仅是传授知识，更是培养品格。", q: "他的教育观？", o: ["只传知识", "兼顾知识与品格", "只看分数"], c: 1 },
  { a: "面对气候变化，各国必须加强国际合作。", q: "应对气候变化需要？", o: ["各自为政", "国际合作", "无需行动"], c: 1 },
  { a: "近期调查显示，越来越多年轻人选择在家工作。", q: "调查显示？", o: ["都去办公室", "在家工作增多", "都失业了"], c: 1 },
  { a: "她在演讲中强调，女性应当拥有独立的事业。", q: "她强调什么？", o: ["女性独立事业", "女性回归家庭", "无所谓"], c: 0 },
  { a: "保护生态环境，需要从日常生活的点滴做起。", q: "本段主张？", o: ["从小事做起", "等政府解决", "无能为力"], c: 0 },
  { a: "经济学家指出，绿色经济将成为未来增长的新动力。", q: "经济学家观点？", o: ["绿色经济无意义", "成新动力", "已过时"], c: 1 },
  { a: "他强调，团队合作比个人能力更加重要。", q: "他认为？", o: ["个人最重要", "团队合作更重要", "都不重要"], c: 1 },
];

const rRows = [
  { p: "信息时代，人们获取知识的途径变得多元化。然而，如何辨别信息真伪，已成为新的挑战。", q: "本段主旨？", o: ["信息少", "信息多元但需辨别", "无挑战"], c: 1 },
  { p: "古人云：\"业精于勤。\"意思是事业的成就来自勤奋。", q: "\"业精于勤\"指？", o: ["成就来自勤奋", "成就靠运气", "成就靠他人"], c: 0 },
  { p: "中医讲究\"上医治未病\"，强调预防胜于治疗。", q: "\"治未病\"的核心？", o: ["治大病", "预防为主", "依赖药物"], c: 1 },
  { p: "现代社会信息爆炸，深度阅读的价值反而被___了。", o: ["放大", "凸显", "忽视"], c: 2 },
  { p: "他以___的态度对待每一项工作。", o: ["认真负责", "马马虎虎", "懒散"], c: 0 },
  { p: "面对挫折，他始终___积极乐观。", o: ["保持", "放弃", "失去"], c: 0 },
  { p: "请选出有语病的一句。", o: ["大家都同意了。", "通过努力学习，使他取得了进步。", "天气很好。"], c: 1, e: "通过…使… 缺主语。" },
  { p: "请选出有语病的一句。", o: ["这本书很有趣。", "他大概有30岁左右。", "我喜欢音乐。"], c: 1, e: "大概 + 左右 lặp." },
  { p: "请选出有语病的一句。", o: ["他认真听课。", "防止类似事件再发生。", "我去上学。"], c: 1, e: "防止…再发生 thiếu 不 (双重否定 / 完整表达 thường dùng 防止…不再发生 / 防止再次发生)." },
  { p: "幸福不在于拥有多少，而在于___多少。", o: ["计较", "感恩", "失去"], c: 1 },
  { p: "随着技术进步，远程办公的优势越来越___。", o: ["明显", "消失", "减弱"], c: 0 },
  { p: "他始终坚持自己的理想，从未___。", o: ["放弃", "实现", "改变"], c: 0 },
];

const wRows = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"人生最大的财富不是金钱，而是健康、家庭与内心的平和。一个人若失去了这些，再多的财富也难以填补内心的空虚。\"",
    o: ["金钱是最大的财富。",
        "真正的财富是健康、家庭与内心平和，金钱无法替代。",
        "财富无关紧要。"], c: 1,
    exp: "Câu giữ được 3 yếu tố chính + ý đối lập với tiền bạc." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h6m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h6m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h6m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk6Mock2: HskTest = {
  level: 6, code: "HSK6-MOCK-02", title: "HSK 6 Mock Test 02", titleVi: "Đề thi thử HSK 6 - Số 02",
  durationMin: 100, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. Compact HSK 6 mock.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. Đề HSK 6 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe bản tin / phỏng vấn / phát biểu.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + tìm câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn văn (MCQ rút gọn).", questions: W },
  ],
};
