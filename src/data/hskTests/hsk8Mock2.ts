/**
 * @file hsk8Mock2.ts - HSK 8 Mock Test 02 (HSK 3.0 master, compact)
 * Listening 12 + Reading 12 + Writing 1 = 25 Q, 100 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows: { a: string; q: string; o: string[]; c: number; e?: string }[] = [
  { a: "学者指出，知识经济时代，终身学习已不再是选择，而是必需。", q: "学者认为？", o: ["可选", "必需", "无意义"], c: 1 },
  { a: "在文化讲座中，他强调中华文明的连续性是其独特优势。", q: "他强调？", o: ["断裂", "连续性是优势", "西化"], c: 1 },
  { a: "经济学家警告，过度依赖单一产业将带来巨大的系统性风险。", q: "经济学家警告？", o: ["专注好", "依赖单一产业有风险", "无风险"], c: 1 },
  { a: "他在演讲中表示，未来十年是全球能源转型的关键期。", q: "他认为？", o: ["能源不变", "10年关键转型期", "已转型完成"], c: 1 },
  { a: "据研究表明，深度阅读对培养批判性思维至关重要。", q: "研究表明？", o: ["阅读无用", "深读养批判思维", "只看影像"], c: 1 },
  { a: "他坦言，决定一个人成就的，往往是其韧性而非才华。", q: "他认为成就关键？", o: ["才华", "韧性", "运气"], c: 1 },
  { a: "随着城市化进程加快，乡村文化正面临前所未有的挑战。", q: "本段说？", o: ["乡村繁荣", "面临挑战", "无变化"], c: 1 },
  { a: "教育家强调，培养孩子的同理心比传授知识更具长远价值。", q: "他认为？", o: ["知识更重要", "同理心更重要", "都不重要"], c: 1 },
  { a: "心理学研究指出，幸福感与人际关系的质量密切相关。", q: "研究指出？", o: ["与金钱有关", "与人际质量有关", "无关任何"], c: 1 },
  { a: "他认为，真正的领导力来自服务他人，而非控制他人。", q: "他的领导观？", o: ["控制他人", "服务他人", "无所谓"], c: 1 },
  { a: "面对全球化逆流，开放合作仍是各国发展的最佳选择。", q: "本段主张？", o: ["闭关", "开放合作", "孤立"], c: 1 },
  { a: "他强调，文化输出应建立在文化自信的基础之上。", q: "他认为？", o: ["盲目输出", "需文化自信", "无需输出"], c: 1 },
];

const rRows: { p: string; q?: string; o: string[]; c: number; e?: string }[] = [
  { p: "古人云：\"己所不欲，勿施于人。\" 这句话所体现的换位思考，是中华文明最重要的伦理智慧之一。", q: "本段强调？", o: ["利己", "换位思考", "竞争"], c: 1 },
  { p: "在信息泛滥的时代，独立判断力比任何时候都更显珍贵。", q: "作者强调？", o: ["盲从", "独立判断", "依赖权威"], c: 1 },
  { p: "真正的智慧并非源于阅读了多少书，而是源于在生活中持续地反思与实践。", q: "智慧源于？", o: ["读书量", "反思与实践", "天赋"], c: 1 },
  { p: "他以___的态度面对每一次挑战，从不轻言放弃。", o: ["从容", "畏惧", "懒散"], c: 0 },
  { p: "面对快速变化的世界，___学习已成为生存的必备技能。", o: ["放弃", "持续", "拒绝"], c: 1 },
  { p: "我们应当___传统文化的精髓，并赋予其新的时代内涵。", o: ["抛弃", "传承", "忽视"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他热爱工作。", "通过这次教训，使我们更加成熟。", "她很善良。"], c: 1, e: "缺主语。" },
  { p: "请选出有语病的一句。", o: ["大家都来了。", "这本书大约有300页左右。", "他正在写作。"], c: 1, e: "大约 + 左右 lặp." },
  { p: "请选出有语病的一句。", o: ["他认真听讲。", "为了防止类似悲剧再发生。", "他喜欢音乐。"], c: 1, e: "Câu thiếu vế chính." },
  { p: "幸福的本质不在于占有，而在于___与分享。", o: ["计较", "感恩", "失去"], c: 1 },
  { p: "面对压力，最有效的方式是直面而非___它。", o: ["接受", "逃避", "正视"], c: 1 },
  { p: "成功的关键往往不在于天赋，而在于___与坚持。", o: ["懒惰", "勤奋", "放弃"], c: 1 },
];

const wRows: { p: string; o: string[]; c: number; e?: string; exp?: string }[] = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"科技的发展是一柄双刃剑。它在解决旧问题的同时，也不断制造新问题。真正成熟的社会，不在于拥有多么先进的科技，而在于能否审慎地驾驭科技，让其服务于人的全面发展。\"",
    o: ["科技必然带来进步。",
        "科技是双刃剑，成熟社会能审慎驾驭它，使其服务于人。",
        "应当抵制科技。"], c: 1,
    exp: "Đáp án giữ 3 ý: hai mặt + xã hội chín muồi + phục vụ con người." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h8m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h8m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h8m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk8Mock2: HskTest = {
  level: 8, code: "HSK8-MOCK-02", title: "HSK 8 Mock Test 02", titleVi: "Đề thi thử HSK 8 - Số 02",
  durationMin: 100, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. HSK 3.0 master (Level 8) compact.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. HSK 3.0 cấp 8 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Học thuật, kinh tế, văn hoá.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn (MCQ rút gọn).", questions: W },
  ],
};
