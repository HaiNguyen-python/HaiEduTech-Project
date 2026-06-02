/**
 * @file hsk1Mock3.ts - HSK 1 Mock Test 03 (compact, Hanban-style)
 * Listening 15 + Reading 15 = 30 Q, 30 minutes. Pinyin always shown.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lPic = [
  { a: "我吃米饭。", p: "Wǒ chī mǐfàn.", o: ["🍚", "🍜", "🥖"], c: 0, e: "米饭 = cơm." },
  { a: "今天是星期五。", p: "Jīntiān shì xīngqī wǔ.", o: ["5️⃣", "6️⃣", "1️⃣"], c: 0, e: "星期五 = thứ Sáu." },
  { a: "我的妈妈是医生。", p: "Wǒ de māma shì yīshēng.", o: ["👩‍⚕️", "👩‍🏫", "👩‍🍳"], c: 0, e: "医生 = bác sĩ." },
  { a: "姐姐在看书。", p: "Jiějie zài kàn shū.", o: ["📖", "📺", "🎵"], c: 0, e: "看书 = đọc sách." },
  { a: "我有三个朋友。", p: "Wǒ yǒu sān ge péngyou.", o: ["👤", "👥", "👨‍👩‍👧"], c: 2, e: "三个 = 3." },
];

const lTf = [
  { a: "她不喜欢吃苹果。", p: "Tā bù xǐhuān chī píngguǒ.", pr: "🍎❌", c: 0, e: "不喜欢 + táo → khớp." },
  { a: "今天下雨。", p: "Jīntiān xià yǔ.", pr: "☀️", c: 1, e: "Audio: mưa; hình: nắng → Sai." },
  { a: "他在听音乐。", p: "Tā zài tīng yīnyuè.", pr: "🎧", c: 0, e: "听音乐 = nghe nhạc." },
  { a: "我有四只猫。", p: "Wǒ yǒu sì zhī māo.", pr: "🐱🐱", c: 1, e: "Audio: 4; hình: 2 → Sai." },
  { a: "现在十二点。", p: "Xiànzài shí'èr diǎn.", pr: "🕛", c: 0, e: "12 giờ → khớp." },
];

const lMcq = [
  { a: "男：你今年多大？女：我十八岁。", p: "Nán: Nǐ jīnnián duō dà? Nǚ: Wǒ shíbā suì.",
    pr: "女的多大？", prP: "Nǚ de duō dà?", prVi: "Cô ấy bao nhiêu tuổi?",
    o: ["16", "18", "20"], c: 1, e: "十八 = 18." },
  { a: "女：你哥哥在哪儿工作？男：在北京。", p: "Nǚ: Nǐ gēge zài nǎr gōngzuò? Nán: Zài Běijīng.",
    pr: "哥哥在哪儿工作？", prP: "Gēge zài nǎr gōngzuò?", prVi: "Anh trai làm ở đâu?",
    o: ["Bắc Kinh", "Thượng Hải", "Quảng Châu"], c: 0, e: "北京 = Bắc Kinh." },
  { a: "男：你喜欢什么水果？女：我喜欢香蕉。", p: "Nán: Nǐ xǐhuān shénme shuǐguǒ? Nǚ: Wǒ xǐhuān xiāngjiāo.",
    pr: "女的喜欢什么？", prP: "Nǚ de xǐhuān shénme?", prVi: "Cô ấy thích gì?",
    o: ["🍎", "🍌", "🍊"], c: 1, e: "香蕉 = chuối." },
  { a: "女：你的老师叫什么？男：他叫王老师。", p: "Nǚ: Nǐ de lǎoshī jiào shénme? Nán: Tā jiào Wáng lǎoshī.",
    pr: "老师姓什么？", prP: "Lǎoshī xìng shénme?", prVi: "Thầy họ gì?",
    o: ["Lý", "Vương", "Trương"], c: 1, e: "王 = Vương." },
  { a: "男：你怎么去学校？女：我坐公共汽车。", p: "Nán: Nǐ zěnme qù xuéxiào? Nǚ: Wǒ zuò gōnggòng qìchē.",
    pr: "女的怎么去学校？", prP: "Nǚ de zěnme qù xuéxiào?", prVi: "Cô ấy đi học bằng gì?",
    o: ["Xe đạp", "Xe buýt", "Taxi"], c: 1, e: "公共汽车 = xe buýt." },
];

const rPic = [
  { pr: "我喝茶。", prP: "Wǒ hē chá.", prVi: "Tôi uống trà.", o: ["☕", "🍵", "🥤"], c: 1, e: "茶 = trà." },
  { pr: "爸爸开车。", prP: "Bàba kāi chē.", prVi: "Bố lái xe.", o: ["🚗", "🚲", "✈️"], c: 0, e: "开车 = lái xe." },
  { pr: "我去医院。", prP: "Wǒ qù yīyuàn.", prVi: "Tôi đi bệnh viện.", o: ["🏥", "🏫", "🏠"], c: 0, e: "医院 = bệnh viện." },
  { pr: "今天星期天。", prP: "Jīntiān xīngqī tiān.", prVi: "Hôm nay Chủ Nhật.", o: ["7️⃣", "1️⃣", "5️⃣"], c: 0, e: "星期天 = CN." },
  { pr: "妹妹在画画。", prP: "Mèimei zài huà huà.", prVi: "Em gái đang vẽ.", o: ["🎨", "✍️", "📚"], c: 0, e: "画画 = vẽ tranh." },
];

const rTf = [
  { pr: "他有两个孩子。 👶👶", prP: "Tā yǒu liǎng ge háizi.", prVi: "Anh ấy có 2 đứa con.", o: ["✓", "✗"], c: 0, e: "Khớp." },
  { pr: "今天很冷。 ☀️", prP: "Jīntiān hěn lěng.", prVi: "Hôm nay rất lạnh.", o: ["✓", "✗"], c: 1, e: "Câu lạnh, hình nắng → Sai." },
  { pr: "她在喝水。 💧", prP: "Tā zài hē shuǐ.", prVi: "Cô ấy đang uống nước.", o: ["✓", "✗"], c: 0, e: "Khớp." },
  { pr: "我有五本书。 📕📕📕", prP: "Wǒ yǒu wǔ běn shū.", prVi: "Tôi có 5 quyển.", o: ["✓", "✗"], c: 1, e: "5 ≠ 3." },
  { pr: "外面很热。 🥵", prP: "Wàimiàn hěn rè.", prVi: "Bên ngoài nóng.", o: ["✓", "✗"], c: 0, e: "Khớp." },
];

const rMcq = [
  { pr: "我___去过中国。", prP: "Wǒ ___ qù guò Zhōngguó.", prVi: "Tôi đã từng đến TQ.", o: ["没", "不", "也"], c: 0, e: "没 + 过 = chưa từng." },
  { pr: "这是___的衣服？", prP: "Zhè shì ___ de yīfu?", prVi: "Áo của ai?", o: ["谁", "什么", "哪儿"], c: 0, e: "谁的 = của ai." },
  { pr: "我家有___口人。", prP: "Wǒ jiā yǒu ___ kǒu rén.", prVi: "Gia đình tôi có 4 người.", o: ["四", "四个", "第四"], c: 0, e: "Số đếm + lượng từ 口." },
  { pr: "她___老师。", prP: "Tā ___ lǎoshī.", prVi: "Cô ấy là giáo viên.", o: ["是", "在", "有"], c: 0, e: "是 = là." },
  { pr: "你___想喝茶？", prP: "Nǐ ___ xiǎng hē chá?", prVi: "Bạn có muốn uống trà không?", o: ["想不", "想"+"想", "想不想"], c: 2, e: "想不想 = câu hỏi chính phản." },
];

const L: HskQuestion[] = [
  ...lPic.map((r, i) => ({ id: `h1m3-l${i + 1}`, section: "listening" as const, type: "listen-pic" as const,
    audio: r.a, audioPinyin: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...lTf.map((r, i) => ({ id: `h1m3-l${i + 6}`, section: "listening" as const, type: "listen-tf" as const,
    audio: r.a, audioPinyin: r.p, prompt: r.pr, options: [{ label: "✓" }, { label: "✗" }], correct: r.c, explanation: r.e })),
  ...lMcq.map((r, i) => ({ id: `h1m3-l${i + 11}`, section: "listening" as const, type: "listen-mcq" as const,
    audio: r.a, audioPinyin: r.p, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi,
    options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

const R: HskQuestion[] = [
  ...rPic.map((r, i) => ({ id: `h1m3-r${i + 1}`, section: "reading" as const, type: "read-pic" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rTf.map((r, i) => ({ id: `h1m3-r${i + 6}`, section: "reading" as const, type: "read-tf" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rMcq.map((r, i) => ({ id: `h1m3-r${i + 11}`, section: "reading" as const, type: "read-mcq" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

export const hsk1Mock3: HskTest = {
  level: 1, code: "HSK1-MOCK-03", title: "HSK 1 Mock Test 03", titleVi: "Đề thi thử HSK 1 - Số 03",
  durationMin: 30, passScore: 60, showPinyin: true,
  intro: "Listening 15 + Reading 15 = 30 questions. Compact HSK 1 mock #3.",
  introVi: "Nghe 15 + Đọc 15 = 30 câu. Đề HSK 1 rút gọn #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe → ảnh / Đúng-Sai / chọn đáp án.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Câu → ảnh, Đúng-Sai, điền từ.", questions: R },
  ],
};
