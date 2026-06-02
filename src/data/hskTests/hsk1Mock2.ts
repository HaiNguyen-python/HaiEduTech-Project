/**
 * @file hsk1Mock2.ts - HSK 1 Mock Test 02 (authentic Hanban format, compact)
 * Listening 15 + Reading 15 = 30 Q, 30 minutes. Pinyin always shown.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

// Listening: listen-pic (audio + emoji choices)
const lPic: { a: string; p: string; o: string[]; c: number; e: string }[] = [
  { a: "我喝水。", p: "Wǒ hē shuǐ.", o: ["💧", "🍵", "☕"], c: 0, e: "水 (shuǐ) = nước." },
  { a: "今天星期一。", p: "Jīntiān xīngqī yī.", o: ["1️⃣", "2️⃣", "7️⃣"], c: 0, e: "星期一 = thứ Hai." },
  { a: "我的爸爸是老师。", p: "Wǒ de bàba shì lǎoshī.", o: ["👨‍🏫", "👨‍⚕️", "👨‍🍳"], c: 0, e: "老师 = giáo viên." },
  { a: "弟弟在睡觉。", p: "Dìdi zài shuìjiào.", o: ["😴", "🏃", "📚"], c: 0, e: "睡觉 = đi ngủ." },
  { a: "我有两个苹果。", p: "Wǒ yǒu liǎng ge píngguǒ.", o: ["🍎", "🍎🍎", "🍎🍎🍎"], c: 1, e: "两 = hai." },
];

// Listening: listen-tf (audio + emoji prompt → ✓/✗)
const lTf: { a: string; p: string; pr: string; c: number; e: string }[] = [
  { a: "她喜欢喝咖啡。", p: "Tā xǐhuān hē kāfēi.", pr: "☕", c: 0, e: "咖啡 = cà phê → khớp." },
  { a: "我有五本书。", p: "Wǒ yǒu wǔ běn shū.", pr: "📘📘📘", c: 1, e: "Audio: 5 quyển; hình: 3 → Sai." },
  { a: "外面下雪。", p: "Wàimiàn xià xuě.", pr: "❄️", c: 0, e: "下雪 = trời tuyết." },
  { a: "他在打电话。", p: "Tā zài dǎ diànhuà.", pr: "📞", c: 0, e: "打电话 = gọi điện." },
  { a: "今天是我的生日。", p: "Jīntiān shì wǒ de shēngrì.", pr: "🎂", c: 0, e: "生日 = sinh nhật." },
];

// Listening: listen-mcq
const lMcq: { a: string; p: string; pr: string; prP: string; prVi: string; o: string[]; c: number; e: string }[] = [
  { a: "男：你叫什么名字？女：我叫小红。", p: "Nán: Nǐ jiào shénme míngzi? Nǚ: Wǒ jiào Xiǎo Hóng.",
    pr: "女的叫什么？", prP: "Nǚ de jiào shénme?", prVi: "Cô ấy tên gì?",
    o: ["小红", "小明", "小李"], c: 0, e: "Nữ trả lời: 我叫小红." },
  { a: "男：现在几点？女：现在十点。", p: "Nán: Xiànzài jǐ diǎn? Nǚ: Xiànzài shí diǎn.",
    pr: "现在几点？", prP: "Xiànzài jǐ diǎn?", prVi: "Bây giờ mấy giờ?",
    o: ["8 giờ", "10 giờ", "12 giờ"], c: 1, e: "十点 = 10 giờ." },
  { a: "女：你喜欢什么颜色？男：我喜欢蓝色。", p: "Nǚ: Nǐ xǐhuān shénme yánsè? Nán: Wǒ xǐhuān lánsè.",
    pr: "男的喜欢什么颜色？", prP: "Nán de xǐhuān shénme yánsè?", prVi: "Anh ấy thích màu gì?",
    o: ["🔴 Đỏ", "🔵 Xanh dương", "🟢 Xanh lá"], c: 1, e: "蓝色 = xanh dương." },
  { a: "男：你去哪儿？女：我去图书馆。", p: "Nán: Nǐ qù nǎr? Nǚ: Wǒ qù túshūguǎn.",
    pr: "女的去哪儿？", prP: "Nǚ de qù nǎr?", prVi: "Cô ấy đi đâu?",
    o: ["Trường", "Thư viện", "Nhà"], c: 1, e: "图书馆 = thư viện." },
  { a: "女：你的哥哥多大？男：他二十岁。", p: "Nǚ: Nǐ de gēge duō dà? Nán: Tā èrshí suì.",
    pr: "哥哥多大？", prP: "Gēge duō dà?", prVi: "Anh trai bao nhiêu tuổi?",
    o: ["12", "20", "22"], c: 1, e: "二十 = 20." },
];

// Reading: read-pic (sentence → emoji)
const rPic: { pr: string; prP: string; prVi: string; o: string[]; c: number; e: string }[] = [
  { pr: "我喜欢猫。", prP: "Wǒ xǐhuān māo.", prVi: "Tôi thích mèo.", o: ["🐶", "🐱", "🐰"], c: 1, e: "猫 = mèo." },
  { pr: "妈妈做菜。", prP: "Māma zuò cài.", prVi: "Mẹ nấu ăn.", o: ["👩‍🍳", "👩‍🏫", "👩‍⚕️"], c: 0, e: "做菜 = nấu ăn." },
  { pr: "我坐飞机。", prP: "Wǒ zuò fēijī.", prVi: "Tôi đi máy bay.", o: ["🚗", "✈️", "🚆"], c: 1, e: "飞机 = máy bay." },
  { pr: "现在六点。", prP: "Xiànzài liù diǎn.", prVi: "Bây giờ 6 giờ.", o: ["🕕", "🕘", "🕛"], c: 0, e: "六点 = 6 giờ." },
  { pr: "弟弟在写字。", prP: "Dìdi zài xiě zì.", prVi: "Em đang viết chữ.", o: ["✍️", "📖", "🎵"], c: 0, e: "写字 = viết chữ." },
];

// Reading: read-tf (sentence + emoji prompt)
const rTf: { pr: string; prP: string; prVi: string; o: string[]; c: number; e: string }[] = [
  { pr: "他有三只狗。 🐶🐶🐶", prP: "Tā yǒu sān zhī gǒu.", prVi: "Anh ấy có 3 con chó.", o: ["✓", "✗"], c: 0, e: "3 con chó, khớp hình." },
  { pr: "今天很热。 ❄️", prP: "Jīntiān hěn rè.", prVi: "Hôm nay rất nóng.", o: ["✓", "✗"], c: 1, e: "Hình: tuyết → ngược nghĩa." },
  { pr: "她在看电视。 📺", prP: "Tā zài kàn diànshì.", prVi: "Cô ấy đang xem TV.", o: ["✓", "✗"], c: 0, e: "电视 = TV." },
  { pr: "我有一本书。 📚📚📚", prP: "Wǒ yǒu yì běn shū.", prVi: "Tôi có 1 cuốn sách.", o: ["✓", "✗"], c: 1, e: "Câu: 1 cuốn; hình: 3 → Sai." },
  { pr: "外面下雨。 🌧️", prP: "Wàimiàn xià yǔ.", prVi: "Trời đang mưa.", o: ["✓", "✗"], c: 0, e: "下雨 = trời mưa." },
];

// Reading: read-mcq (cloze)
const rMcq: { pr: string; prP: string; prVi: string; o: string[]; c: number; e: string }[] = [
  { pr: "我___喜欢喝茶。", prP: "Wǒ ___ xǐhuān hē chá.", prVi: "Tôi ___ thích uống trà.", o: ["很", "不", "也"], c: 0, e: "很 = rất (đứng trước động từ trạng thái)." },
  { pr: "这是___书？", prP: "Zhè shì ___ shū?", prVi: "Đây là sách của ai?", o: ["谁的", "什么", "哪儿"], c: 0, e: "谁的 = của ai." },
  { pr: "他有___个孩子。", prP: "Tā yǒu ___ ge háizi.", prVi: "Anh ấy có ___ đứa con.", o: ["三", "三个", "第三"], c: 0, e: "Sau số đếm dùng lượng từ 个 đã có sẵn." },
  { pr: "我___北京人。", prP: "Wǒ ___ Běijīng rén.", prVi: "Tôi là người Bắc Kinh.", o: ["是", "在", "有"], c: 0, e: "是 = là." },
  { pr: "你___吃饭了吗？", prP: "Nǐ ___ chī fàn le ma?", prVi: "Bạn đã ăn cơm chưa?", o: ["不", "没", "也"], c: 1, e: "没/还没 dùng với 了/吗 hỏi đã xảy ra chưa." },
];

const L: HskQuestion[] = [
  ...lPic.map((r, i) => ({ id: `h1m2-l${i + 1}`, section: "listening" as const, type: "listen-pic" as const,
    audio: r.a, audioPinyin: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...lTf.map((r, i) => ({ id: `h1m2-l${i + 6}`, section: "listening" as const, type: "listen-tf" as const,
    audio: r.a, audioPinyin: r.p, prompt: r.pr, options: [{ label: "✓" }, { label: "✗" }], correct: r.c, explanation: r.e })),
  ...lMcq.map((r, i) => ({ id: `h1m2-l${i + 11}`, section: "listening" as const, type: "listen-mcq" as const,
    audio: r.a, audioPinyin: r.p, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi,
    options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

const R: HskQuestion[] = [
  ...rPic.map((r, i) => ({ id: `h1m2-r${i + 1}`, section: "reading" as const, type: "read-pic" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rTf.map((r, i) => ({ id: `h1m2-r${i + 6}`, section: "reading" as const, type: "read-tf" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rMcq.map((r, i) => ({ id: `h1m2-r${i + 11}`, section: "reading" as const, type: "read-mcq" as const,
    prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

export const hsk1Mock2: HskTest = {
  level: 1, code: "HSK1-MOCK-02", title: "HSK 1 Mock Test 02", titleVi: "Đề thi thử HSK 1 - Số 02",
  durationMin: 30, passScore: 60, showPinyin: true,
  intro: "Listening 15 + Reading 15 = 30 questions. Compact HSK 1 mock following Hanban format.",
  introVi: "Nghe 15 + Đọc 15 = 30 câu. Đề rút gọn HSK 1 theo chuẩn Hanban.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe câu → chọn ảnh / Đúng-Sai / chọn đáp án.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Câu → ảnh, Đúng-Sai, điền từ.", questions: R },
  ],
};
