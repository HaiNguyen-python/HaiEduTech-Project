/**
 * @file hsk5Mock2.ts - HSK 5 Mock Test 02 (compact)
 * Listening 12 + Reading 12 + Writing 6 = 30 Q, 90 minutes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lRows = [
  { a: "随着网购的普及，传统商店的生意越来越难做了。", q: "本段说明？", o: ["网购冲击实体店", "网购不流行", "实体店扩张"], c: 0 },
  { a: "他说话很直接，有时候让人觉得不太舒服。", q: "他说话怎么样？", o: ["很委婉", "很直接", "很慢"], c: 1 },
  { a: "这次会议的主要目的是讨论明年的工作计划。", q: "会议讨论什么？", o: ["旅游计划", "明年工作计划", "辞职"], c: 1 },
  { a: "为了通过考试，他每天复习到很晚。", q: "他为什么熬夜？", o: ["看电视", "准备考试", "玩游戏"], c: 1 },
  { a: "据调查，年轻人更喜欢用手机看新闻。", q: "调查显示？", o: ["年轻人爱报纸", "年轻人用手机看新闻", "年轻人不看新闻"], c: 1 },
  { a: "他不仅是一位优秀的医生，还是一位作家。", q: "关于他，正确的是？", o: ["医生兼作家", "只是医生", "只是作家"], c: 0, e: "不仅…还… = không chỉ…mà còn…" },
  { a: "这家餐厅的环境优雅，价格也不贵。", q: "餐厅怎么样？", o: ["贵且差", "优雅且便宜", "差且便宜"], c: 1 },
  { a: "学习外语贵在坚持，不要轻易放弃。", q: "作者建议？", o: ["放弃外语", "坚持学习", "换语言"], c: 1 },
  { a: "通过这次合作，两家公司建立了良好的关系。", q: "合作的结果？", o: ["关系紧张", "建立良好关系", "破裂"], c: 1 },
  { a: "现代人压力大，很多人开始关注心理健康。", q: "现代人关注？", o: ["心理健康", "外貌", "美食"], c: 0 },
  { a: "他从小就喜欢音乐，长大后成了一名钢琴家。", q: "他现在的职业？", o: ["医生", "钢琴家", "老师"], c: 1 },
  { a: "环境污染对人类的健康造成了严重影响。", q: "本段主旨？", o: ["环境污染影响健康", "环境无污染", "健康无关环境"], c: 0 },
];

const rRows = [
  { p: "时间是最公平的，每个人每天都有24小时。如何利用这些时间，决定了一个人的成就。", q: "作者认为时间？", o: ["对每人不同", "公平利用决定成就", "无用"], c: 1 },
  { p: "良好的家庭氛围对孩子的成长有重要影响。", q: "本段强调？", o: ["家庭无关成长", "家庭氛围重要", "学校最重要"], c: 1 },
  { p: "面对困难，最重要的是保持冷静，仔细分析问题。", q: "作者建议？", o: ["逃避", "冷静分析", "找人哭"], c: 1 },
  { p: "他的演讲非常精彩，赢得了在场所有人的___。", o: ["掌声", "嘲笑", "无视"], c: 0 },
  { p: "这份工作虽然辛苦，但是非常有___感。", o: ["成就", "失落", "厌烦"], c: 0, e: "成就感 cố định." },
  { p: "他凭借自己的努力，___了今天的成功。", o: ["失去", "获得", "拒绝"], c: 1 },
  { p: "我们应当___传统文化，让它代代相传。", o: ["遗忘", "继承", "丢弃"], c: 1 },
  { p: "请选出有语病的一句。", o: ["他喜欢读书。", "通过这次学习，使我们成长了。", "她是位优秀的老师。"], c: 1, e: "通过…使… 缺主语。" },
  { p: "请选出有语病的一句。", o: ["大家都同意了。", "他大约二十岁左右。", "我喜欢这本书。"], c: 1, e: "大约 + 左右 ngữ nghĩa trùng." },
  { p: "现代社会节奏快，很多人都感到压力大。", q: "本段说？", o: ["生活轻松", "压力大", "无变化"], c: 1 },
  { p: "成功不是靠运气，而是靠___与汗水。", o: ["懒惰", "努力", "幻想"], c: 1 },
  { p: "面对挑战，我们应当保持___的心态。", o: ["消极", "积极", "无所谓"], c: 1 },
];

const wRows = [
  { p: "排序：他 / 解决 / 把 / 顺利地 / 问题 / 了", o: ["他顺利地把问题解决了。", "他把顺利地解决问题了。", "顺利地他解决问题把了。"], c: 0 },
  { p: "排序：教育 / 受到 / 良好的 / 应当 / 孩子", o: ["孩子应当受到良好的教育。", "良好的教育应当受到孩子。", "孩子受到应当良好的教育。"], c: 0 },
  { p: "选词：他___公司做了20年的贡献。", o: ["为", "把", "对"], c: 0, e: "为…做贡献 cố định." },
  { p: "选词：他对父母非常___，常常回家看望。", o: ["孝顺", "讨厌", "陌生"], c: 0 },
  { p: "选词：经过多年的努力，她终于___了梦想。", o: ["实现", "完成", "得到"], c: 0 },
  { p: "选词：这场比赛的结果让所有人都感到___。", o: ["失望", "无聊", "高兴"], c: 0, e: "Tùy ngữ cảnh; 失望 thường gặp nhất với 'kết quả không mong đợi'." },
];

const L = lRows.map<HskQuestion>((r, i) => ({ id: `h5m2-l${i + 1}`, section: "listening", type: "listen-mcq", audio: r.a, prompt: r.q, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const R = rRows.map<HskQuestion>((r, i) => ({ id: `h5m2-r${i + 1}`, section: "reading", type: "read-mcq", prompt: r.q ? `${r.p}\n\n${r.q}` : r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));
const W = wRows.map<HskQuestion>((r, i) => ({ id: `h5m2-w${i + 1}`, section: "writing", type: "read-mcq", prompt: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e }));

export const hsk5Mock2: HskTest = {
  level: 5, code: "HSK5-MOCK-02", title: "HSK 5 Mock Test 02", titleVi: "Đề thi thử HSK 5 - Số 02",
  durationMin: 90, passScore: 60, showPinyin: false,
  intro: "Listening 12 + Reading 12 + Writing 6 = 30 questions. Compact HSK 5 mock.",
  introVi: "Nghe 12 + Đọc 12 + Viết 6 = 30 câu. Đề HSK 5 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe đoạn ngắn trung-cao cấp.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Đọc hiểu + chọn từ + tìm câu sai.", questions: R },
    { id: "writing", nameVi: "第三部分 书写", nameEn: "Part 3: Writing", description: "Sắp xếp câu + chọn từ phù hợp.", questions: W },
  ],
};
