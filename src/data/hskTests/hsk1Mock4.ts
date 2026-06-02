/**
 * @file hsk1Mock4.ts - HSK 1 Mock Test 04 (compact, Hanban-style)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lPic = [
  { a: "我喜欢喝牛奶。", p: "Wǒ xǐhuān hē niúnǎi.", o: ["🥛", "☕", "🧃"], c: 0, e: "牛奶 = sữa." },
  { a: "他在打电话。", p: "Tā zài dǎ diànhuà.", o: ["📞", "💻", "📺"], c: 0, e: "打电话 = gọi điện." },
  { a: "今天是星期一。", p: "Jīntiān shì xīngqī yī.", o: ["1️⃣", "2️⃣", "7️⃣"], c: 0, e: "星期一 = thứ Hai." },
  { a: "妈妈在做饭。", p: "Māma zài zuò fàn.", o: ["👩‍🍳", "👩‍🏫", "👩‍⚕️"], c: 0, e: "做饭 = nấu ăn." },
  { a: "我有两只狗。", p: "Wǒ yǒu liǎng zhī gǒu.", o: ["🐶", "🐶🐶", "🐶🐶🐶"], c: 1, e: "两 = 2." },
];

const lTf = [
  { a: "她喜欢苹果。", p: "Tā xǐhuān píngguǒ.", pr: "🍎", c: 0, e: "Khớp." },
  { a: "我有六本书。", p: "Wǒ yǒu liù běn shū.", pr: "📚📚", c: 1, e: "6 ≠ 2 → Sai." },
  { a: "外面很热。", p: "Wàimiàn hěn rè.", pr: "🥵", c: 0, e: "Khớp." },
  { a: "他在睡觉。", p: "Tā zài shuì jiào.", pr: "🏃", c: 1, e: "Ngủ ≠ chạy → Sai." },
  { a: "我喝水。", p: "Wǒ hē shuǐ.", pr: "💧", c: 0, e: "Khớp." },
];

const lMcq = [
  { a: "男：你住在哪儿？女：我住在上海。", p: "Nán: Nǐ zhù zài nǎr? Nǚ: Wǒ zhù zài Shànghǎi.",
    pr: "女的住哪儿？", prP: "Nǚ de zhù nǎr?", prVi: "Cô ấy sống ở đâu?",
    o: ["Bắc Kinh", "Thượng Hải", "Hà Nội"], c: 1, e: "上海 = Thượng Hải." },
  { a: "女：你有几个弟弟？男：两个。", p: "Nǚ: Nǐ yǒu jǐ ge dìdi? Nán: Liǎng ge.",
    pr: "他有几个弟弟？", prP: "Tā yǒu jǐ ge dìdi?", prVi: "Anh ấy có mấy em?",
    o: ["1", "2", "3"], c: 1, e: "两个 = 2." },
  { a: "男：你妈妈做什么工作？女：她是老师。", p: "Nán: Nǐ māma zuò shénme gōngzuò? Nǚ: Tā shì lǎoshī.",
    pr: "妈妈是？", prP: "Māma shì?", prVi: "Mẹ làm gì?",
    o: ["Bác sĩ", "Giáo viên", "Sinh viên"], c: 1, e: "老师 = giáo viên." },
  { a: "女：你想吃什么？男：我想吃米饭。", p: "Nǚ: Nǐ xiǎng chī shénme? Nán: Wǒ xiǎng chī mǐfàn.",
    pr: "男的想吃？", prP: "Nán de xiǎng chī?", prVi: "Anh ấy muốn ăn gì?",
    o: ["Mì", "Cơm", "Bánh mì"], c: 1, e: "米饭 = cơm." },
  { a: "男：现在几点？女：现在九点。", p: "Nán: Xiànzài jǐ diǎn? Nǚ: Xiànzài jiǔ diǎn.",
    pr: "现在几点？", prP: "Xiànzài jǐ diǎn?", prVi: "Mấy giờ rồi?",
    o: ["7 giờ", "9 giờ", "11 giờ"], c: 1, e: "九 = 9." },
];

const rPic = [
  { pr: "我吃面包。", prP: "Wǒ chī miànbāo.", prVi: "Tôi ăn bánh mì.", o: ["🍞", "🍚", "🍜"], c: 0, e: "面包 = bánh mì." },
  { pr: "他在睡觉。", prP: "Tā zài shuì jiào.", prVi: "Anh ấy đang ngủ.", o: ["😴", "🏃", "📖"], c: 0, e: "睡觉 = ngủ." },
  { pr: "我去商店。", prP: "Wǒ qù shāngdiàn.", prVi: "Tôi đi cửa hàng.", o: ["🏪", "🏥", "🏫"], c: 0, e: "商店 = cửa hàng." },
  { pr: "现在是早上。", prP: "Xiànzài shì zǎoshang.", prVi: "Bây giờ buổi sáng.", o: ["🌅", "🌇", "🌙"], c: 0, e: "早上 = sáng." },
  { pr: "弟弟在哭。", prP: "Dìdi zài kū.", prVi: "Em đang khóc.", o: ["😢", "😄", "😴"], c: 0, e: "哭 = khóc." },
];

const rTf = [
  { pr: "我有三个苹果。 🍎🍎🍎", prP: "Wǒ yǒu sān ge píngguǒ.", prVi: "Tôi có 3 táo.", o: ["✓", "✗"], c: 0, e: "Khớp." },
  { pr: "今天很冷。 🥵", prP: "Jīntiān hěn lěng.", prVi: "Hôm nay rất lạnh.", o: ["✓", "✗"], c: 1, e: "Lạnh nhưng hình nóng → Sai." },
  { pr: "他是医生。 👨‍⚕️", prP: "Tā shì yīshēng.", prVi: "Anh ấy là bác sĩ.", o: ["✓", "✗"], c: 0, e: "Khớp." },
  { pr: "我喜欢猫。 🐶", prP: "Wǒ xǐhuān māo.", prVi: "Tôi thích mèo.", o: ["✓", "✗"], c: 1, e: "Mèo ≠ chó → Sai." },
  { pr: "明天下雨。 ☔", prP: "Míngtiān xià yǔ.", prVi: "Mai mưa.", o: ["✓", "✗"], c: 0, e: "Khớp." },
];

const rMcq = [
  { pr: "我___是中国人。", prP: "Wǒ ___ shì Zhōngguó rén.", prVi: "Tôi không phải người TQ.", o: ["不", "没", "也"], c: 0, e: "不 + 是." },
  { pr: "你___叫什么名字？", prP: "Nǐ ___ jiào shénme míngzi?", prVi: "Bạn tên gì?", o: ["想", "叫", "是"], c: 1, e: "叫 = gọi/tên là." },
  { pr: "这是___的书？", prP: "Zhè shì ___ de shū?", prVi: "Sách của ai?", o: ["谁", "什么", "哪"], c: 0, e: "谁的 = của ai." },
  { pr: "我家有___人。", prP: "Wǒ jiā yǒu ___ rén.", prVi: "Nhà có 5 người.", o: ["五", "五个", "第五"], c: 1, e: "Số + 个 + 人." },
  { pr: "今天天气___好。", prP: "Jīntiān tiānqì ___ hǎo.", prVi: "Hôm nay thời tiết tốt.", o: ["很", "是", "了"], c: 0, e: "很 + adj." },
];

const L: HskQuestion[] = [
  ...lPic.map((r, i) => ({ id: `h1m4-l${i + 1}`, section: "listening" as const, type: "listen-pic" as const,
    audio: r.a, audioPinyin: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...lTf.map((r, i) => ({ id: `h1m4-l${i + 6}`, section: "listening" as const, type: "listen-tf" as const,
    audio: r.a, audioPinyin: r.p, prompt: r.pr, options: [{ label: "✓" }, { label: "✗" }], correct: r.c, explanation: r.e })),
  ...lMcq.map((r, i) => ({ id: `h1m4-l${i + 11}`, section: "listening" as const, type: "listen-mcq" as const,
    audio: r.a, audioPinyin: r.p, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi,
    options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

const R: HskQuestion[] = [
  ...rPic.map((r, i) => ({ id: `h1m4-r${i + 1}`, section: "reading" as const, type: "read-pic" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rTf.map((r, i) => ({ id: `h1m4-r${i + 6}`, section: "reading" as const, type: "read-tf" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rMcq.map((r, i) => ({ id: `h1m4-r${i + 11}`, section: "reading" as const, type: "read-mcq" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

export const hsk1Mock4: HskTest = {
  level: 1, code: "HSK1-MOCK-04", title: "HSK 1 Mock Test 04", titleVi: "Đề thi thử HSK 1 - Số 04",
  durationMin: 30, passScore: 60, showPinyin: true,
  intro: "Listening 15 + Reading 15 = 30 questions. Compact HSK 1 mock #4.",
  introVi: "Nghe 15 + Đọc 15 = 30 câu. Đề HSK 1 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe → ảnh / Đúng-Sai / chọn đáp án.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Câu → ảnh, Đúng-Sai, điền từ.", questions: R },
  ],
};
