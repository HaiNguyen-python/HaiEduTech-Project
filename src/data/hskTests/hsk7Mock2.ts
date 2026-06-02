/**
 * @file hsk7Mock2.ts - HSK 7 Mock Test 02 (HSK 3.0 advanced, compact)
 * Listening 12 + Reading 12 + Writing 1 = 25 Q, 90 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows = [
  { a: "随着碳中和目标的提出，新能源行业迎来了前所未有的发展机遇。", q: "本段说明？", o: ["新能源衰退", "迎来发展机遇", "无变化"], c: 1 },
  { a: "他在采访中强调，团队的多元化是创新的源泉。", q: "他强调？", o: ["单一团队", "多元化驱动创新", "团队不重要"], c: 1 },
  { a: "教育专家认为，培养孩子的独立思考能力比记忆知识更重要。", q: "专家观点？", o: ["记忆最重要", "独立思考更重要", "都不重要"], c: 1 },
  { a: "近期数据显示，国民阅读率有所回升，电子书读者群体扩大。", q: "数据显示？", o: ["阅读率下降", "回升+电子书增", "无变化"], c: 1 },
  { a: "他指出，企业的长期成功离不开员工的归属感。", q: "他认为？", o: ["归属感不重要", "员工归属感关键", "管理最重要"], c: 1 },
  { a: "随着AI技术的发展，许多重复性工作正在被自动化取代。", q: "本段反映？", o: ["AI无影响", "重复工作被取代", "AI被禁用"], c: 1 },
  { a: "他在演讲中说：成功源于热爱，而非压力。", q: "他认为成功源于？", o: ["压力", "热爱", "运气"], c: 1 },
  { a: "心理学家提醒，长期孤独会显著影响身心健康。", q: "心理学家提醒？", o: ["孤独有益", "影响身心健康", "无影响"], c: 1 },
  { a: "据调查，越来越多年轻人愿意从事公益事业。", q: "调查显示？", o: ["年轻人爱公益", "年轻人冷漠", "不参与"], c: 0 },
  { a: "学者认为，文化自信是民族复兴的重要基础。", q: "学者强调？", o: ["文化无关复兴", "文化自信是基础", "复兴不需要"], c: 1 },
  { a: "在演讲中他坦言，真正的勇气是承认自己的不足。", q: "他认为勇气是？", o: ["逞强", "承认不足", "盲目自信"], c: 1 },
  { a: "随着大数据的普及，个人隐私保护成为社会热议话题。", q: "本段反映？", o: ["隐私无忧", "隐私成热议", "数据无用"], c: 1 },
];

const rRows = [
  { p: "在快节奏的现代生活中，慢下来反而成为一种奢侈。学会享受当下，是这个时代最稀缺的能力。", q: "本段主旨？", o: ["越快越好", "慢与享受当下稀缺", "生活很慢"], c: 1 },
  { p: "古人云：\"读万卷书，行万里路。\" 强调知识与实践缺一不可。", q: "强调？", o: ["只读书", "只旅行", "读书与实践兼顾"], c: 2 },
  { p: "面对人工智能的冲击，人类最大的优势仍是同理心与创造力。", q: "作者认为？", o: ["AI完胜人类", "人类优势在情感与创造", "无优势"], c: 1 },
  { p: "成长往往伴随着痛苦，但每一次蜕变都让我们变得更___。", o: ["脆弱", "强大", "迷茫"], c: 1 },
  { p: "他以___的精神攻克了一个又一个难关。", o: ["坚韧", "懒散", "随便"], c: 0 },
  { p: "保护环境需要每个人的___，不能仅靠政府。", o: ["参与", "旁观", "拒绝"], c: 0 },
  { p: "请选出有语病的一句。", o: ["他认真学习。", "通过努力，使我们成功了。", "我喜欢音乐。"], c: 1 },
  { p: "请选出有语病的一句。", o: ["这本书很好。", "他大约三十岁左右。", "她是医生。"], c: 1 },
  { p: "中国传统文化讲究\"中庸之道\"，主张做事不偏不倚、恰到好处。", q: "\"中庸\"的核心？", o: ["极端", "平衡适度", "放纵"], c: 1 },
  { p: "幸福不是追求来的，而是创造出来的。", q: "作者认为幸福？", o: ["靠追求", "靠创造", "靠等待"], c: 1 },
  { p: "面对失败，最重要的是从中___教训。", o: ["逃避", "汲取", "忽视"], c: 1 },
  { p: "他始终坚守初心，从未被外界的诱惑___。", o: ["改变", "增强", "提升"], c: 0 },
];

const wRows = [
  { p: "请阅读下列短文并选出最贴切的一句概括：\n\n\"科技在带来便利的同时，也在悄悄改变人与人之间的关系。我们与世界的连接更紧密，但与身边人的距离却可能更远。学会平衡线上与线下，是这一代人的必修课。\"",
    o: ["科技拉近一切人际关系。",
        "科技改变了人际关系，需平衡线上线下。",
        "科技毫无价值。"], c: 1,
    exp: "Đáp án giữ ý đối lập + bài học rút ra." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h7m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h7m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h7m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.exp }));

export const hsk7Mock2: HskTest = {
  level: 7, code: "HSK7-MOCK-02", title: "HSK 7 Mock Test 02", titleVi: "Đề thi thử HSK 7 - Số 02",
  durationMin: 90, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 1 = 25 questions. HSK 3.0 advanced (Level 7) compact.",
  introVi: "Nghe 12 + Đọc 12 + Viết 1 = 25 câu. HSK 3.0 cấp 7 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Tin tức, phỏng vấn, học thuật.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Summary", description: "Tóm tắt đoạn (MCQ rút gọn).", questions: W },
  ],
};
