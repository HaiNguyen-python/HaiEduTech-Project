/**
 * @file hsk6Mock3.ts - HSK 6 Mock Test 03 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "数字经济正成为推动中国高质量发展的重要引擎。", q: "本段说？", o: ["数字经济衰退", "推动高质量发展", "无影响"], c: 1 },
  { a: "心理学家指出，适度的压力有助于提高工作效率。", q: "心理学家观点？", o: ["压力有害", "适度压力有益", "压力无用"], c: 1 },
  { a: "她在采访中坦言，平衡家庭与事业是最大的挑战。", q: "她最大挑战？", o: ["金钱", "家庭与事业平衡", "健康"], c: 1 },
  { a: "随着城镇化进程加快，乡村空心化问题日益突出。", q: "本段反映？", o: ["乡村繁荣", "乡村空心化", "城市萎缩"], c: 1 },
  { a: "据报告，过度依赖手机会削弱人的专注力。", q: "报告指出？", o: ["手机增强专注", "削弱专注力", "无影响"], c: 1 },
  { a: "他认为，教育的本质是唤醒，而不是灌输。", q: "他的教育观？", o: ["灌输", "唤醒", "考试"], c: 1 },
  { a: "面对全球疫情，国际社会必须加强合作。", q: "应对疫情？", o: ["各自为战", "国际合作", "无需行动"], c: 1 },
  { a: "调查显示，越来越多家庭重视亲子陪伴。", q: "调查显示？", o: ["忽视亲子", "重视陪伴", "不变"], c: 1 },
  { a: "她在演讲中强调，自信是女性最重要的品质。", q: "她强调？", o: ["美貌", "自信", "服从"], c: 1 },
  { a: "保护文化遗产，需要全社会的共同努力。", q: "本段主张？", o: ["不需保护", "共同努力", "政府独立完成"], c: 1 },
  { a: "经济学家指出，创新将成为未来发展的核心驱动力。", q: "经济学家观点？", o: ["创新无关", "创新是核心", "无用"], c: 1 },
  { a: "他强调，诚信是立身之本，也是成功之基。", q: "他认为？", o: ["运气重要", "诚信是根本", "技巧重要"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "在算法时代，每个人都被困在自己的信息茧房中，难以接触不同的观点。", q: "本段主旨？", o: ["信息丰富", "信息茧房问题", "无影响"], c: 1 },
  { p: "古人云：\"水滴石穿。\" 意思是坚持不懈终能成功。", q: "\"水滴石穿\"指？", o: ["坚持能成功", "靠运气", "靠他人"], c: 0 },
  { p: "中医讲究\"天人合一\"，强调人与自然的和谐。", q: "\"天人合一\"核心？", o: ["对抗自然", "人与自然和谐", "脱离自然"], c: 1 },
  { p: "如今短视频盛行，深度阅读的能力反而被___了。", o: ["放大", "强化", "削弱"], c: 2 },
  { p: "他以___的态度对待每一位顾客。", o: ["真诚", "敷衍", "懒散"], c: 0 },
  { p: "面对挑战，他始终___积极进取的心态。", o: ["保持", "放弃", "失去"], c: 0 },
  { p: "请选出有语病的一句。", o: ["大家都到了。", "通过这次会议，使我们达成共识。", "天气很好。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["这本书很有趣。", "他大约五十岁左右。", "我喜欢音乐。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他认真听讲。", "防止类似事故再发生。", "我去上班。"], c: 1 },
  { p: "幸福不在于获得多少，而在于___多少。", o: ["计较", "感恩", "失去"], c: 1 },
  { p: "随着远程办公的普及，工作与生活的边界越来越___。", o: ["清晰", "模糊", "稳定"], c: 1 },
  { p: "他始终坚守自己的原则，从未___。", o: ["妥协", "实现", "改变"], c: 0 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"真正的自由，不是想做什么就做什么，而是能够拒绝自己不想做的事。一个人若不能掌控自己的欲望，再多的物质也只是枷锁。\"",
    o: ["自由就是随心所欲。",
        "真正的自由是能拒绝不愿做的事，掌控欲望。",
        "自由与物质无关。"], c: 1,
    exp: "Câu giữ ý đối lập + bài học cốt lõi." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h6m3-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h6m3-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h6m3-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk6Mock3: HskTest = {
  level: 6, code: "HSK6-MOCK-03", title: "HSK 6 Mock Test 03", titleVi: "Đề thi thử HSK 6 - Số 03",
  durationMin: 100, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. Compact HSK 6 mock #3.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. Đề HSK 6 rút gọn #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Tin tức/phỏng vấn cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + tìm câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn văn (MCQ).", questions: W },
  ],
};
