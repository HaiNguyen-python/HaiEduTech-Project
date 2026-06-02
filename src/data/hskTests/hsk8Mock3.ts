/**
 * @file hsk8Mock3.ts - HSK 8 Mock Test 03 (HSK 3.0 Level 8, compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "在全球化深入发展的今天，文化软实力的较量愈发激烈。", q: "本段反映？", o: ["软实力无关", "软实力较量激烈", "全球化倒退"], c: 1 },
  { a: "学者指出，传统文化的现代转化是文化自信的关键。", q: "学者观点？", o: ["拒绝传统", "现代转化是关键", "全盘西化"], c: 1 },
  { a: "在采访中她坦言，真正的勇气是敢于面对真实的自己。", q: "她认为勇气是？", o: ["逃避", "面对自我", "盲目自信"], c: 1 },
  { a: "随着碳中和目标的推进，绿色金融迎来新机遇。", q: "本段说？", o: ["绿色金融衰退", "迎来新机遇", "无变化"], c: 1 },
  { a: "心理学研究表明，长期社交隔离会显著影响认知能力。", q: "研究表明？", o: ["无影响", "影响认知", "提升认知"], c: 1 },
  { a: "经济学家认为，消费升级将成为内需扩张的新动力。", q: "经济学家观点？", o: ["消费降级", "消费升级是动力", "无关"], c: 1 },
  { a: "在演讲中他强调，企业的成功离不开员工的成长。", q: "他强调？", o: ["员工无关", "员工成长关键", "管理最重要"], c: 1 },
  { a: "数据显示，国民健身意识在过去十年显著提升。", q: "数据显示？", o: ["下降", "显著提升", "不变"], c: 1 },
  { a: "他认为，真正的奢侈是拥有自由支配时间的能力。", q: "他的观点？", o: ["金钱", "时间自由", "权力"], c: 1 },
  { a: "随着乡村振兴战略实施，许多传统手艺正焕发新生。", q: "本段反映？", o: ["手艺失传", "焕发新生", "无变化"], c: 1 },
  { a: "教育改革旨在培养具有创新精神和实践能力的人才。", q: "改革目标？", o: ["应试人才", "创新+实践人才", "服从型"], c: 1 },
  { a: "他指出，可持续发展是企业长期竞争力的基石。", q: "他认为？", o: ["短期获利", "可持续是基石", "扩张"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "在数字化浪潮下，慢节奏的生活反而成为一种稀缺的奢侈。", q: "本段反映？", o: ["快节奏好", "慢节奏稀缺珍贵", "无差别"], c: 1 },
  { p: "古语云：\"千里之行，始于足下。\" 强调行动的重要性。", q: "强调？", o: ["空想", "行动", "等待"], c: 1 },
  { p: "面对气候变化，国际社会需共同承担责任。", q: "应对气候？", o: ["各自为政", "共同承担", "无需行动"], c: 1 },
  { p: "在信息爆炸的时代，独立思考的能力变得尤为___。", o: ["可有可无", "宝贵", "过时"], c: 1 },
  { p: "他以___的态度对待每一项事业。", o: ["敬业", "敷衍", "懒散"], c: 0 },
  { p: "保护文化多样性需要全球的___。", o: ["合作", "竞争", "对抗"], c: 0 },
  { p: "请选出有语病的一句。", o: ["他热爱工作。", "通过实践，使我们获得了真知。", "我喜欢音乐。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["这本书很好。", "他大约六十岁左右。", "她是教师。"], c: 1 },
  { p: "中国哲学提倡\"己所不欲，勿施于人\"，强调换位思考。", q: "本段核心？", o: ["独断", "换位思考", "强加于人"], c: 1 },
  { p: "真正的智慧是认识到自己的___。", o: ["全能", "无知", "强大"], c: 1, e: "Tham chiếu Socrates." },
  { p: "面对挑战，应当以积极的心态去___。", o: ["逃避", "迎接", "拒绝"], c: 1 },
  { p: "他始终保持初心，从未被名利所___。", o: ["迷惑", "增强", "提升"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"在追求成功的路上，我们常常忽略了过程的意义。其实，沿途的风景与经历，比终点的奖牌更值得珍藏。\"",
    o: ["只有结果才重要。",
        "过程中的风景与经历比结果更值得珍惜。",
        "成功无意义。"], c: 1,
    exp: "Câu giữ ý đối lập + bài học cốt lõi." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h8m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h8m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h8m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk8Mock3: HskTest = {
  level: 8, code: "HSK8-MOCK-03", title: "HSK 8 Mock Test 03", titleVi: "Đề thi thử HSK 8 - Số 03",
  durationMin: 100, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. HSK 3.0 Level 8 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. HSK 3.0 cấp 8 #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Phát biểu/phỏng vấn/học thuật cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn (MCQ).", questions: W },
  ],
};
