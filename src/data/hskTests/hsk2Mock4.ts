/**
 * @file hsk2Mock4.ts - HSK 2 Mock Test 04 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lPic = [
  { a: "我每天骑自行车上学。", p: "Wǒ měitiān qí zìxíngchē shàngxué.", o: ["🚲", "🚌", "🚗"], c: 0, e: "自行车 = xe đạp." },
  { a: "她在洗衣服。", p: "Tā zài xǐ yīfu.", o: ["🧺", "🍳", "📺"], c: 0, e: "洗衣服 = giặt đồ." },
  { a: "今天有大风。", p: "Jīntiān yǒu dà fēng.", o: ["🌬️", "☀️", "❄️"], c: 0, e: "大风 = gió to." },
  { a: "弟弟在唱歌。", p: "Dìdi zài chàng gē.", o: ["🎤", "🏃", "📚"], c: 0, e: "唱歌 = hát." },
  { a: "我去看电影。", p: "Wǒ qù kàn diànyǐng.", o: ["🎬", "📚", "🎮"], c: 0, e: "电影 = phim." },
];

const lTf = [
  { a: "她每天七点起床。", p: "Tā měitiān qī diǎn qǐchuáng.", pr: "🕖", c: 0, e: "Khớp." },
  { a: "我有两个哥哥。", p: "Wǒ yǒu liǎng ge gēge.", pr: "👨", c: 1, e: "2 ≠ 1 → Sai." },
  { a: "今天很累。", p: "Jīntiān hěn lèi.", pr: "😩", c: 0, e: "Khớp." },
  { a: "他喜欢吃鱼。", p: "Tā xǐhuān chī yú.", pr: "🍗", c: 1, e: "Cá ≠ gà → Sai." },
  { a: "我们去打篮球。", p: "Wǒmen qù dǎ lánqiú.", pr: "🏀", c: 0, e: "Khớp." },
];

const lMcq = [
  { a: "男：你今天去哪儿？女：我去医院看朋友。", p: "Nán: Nǐ jīntiān qù nǎr? Nǚ: Wǒ qù yīyuàn kàn péngyou.",
    pr: "女的去哪儿？", prP: "Nǚ de qù nǎr?", prVi: "Cô ấy đi đâu?",
    o: ["Trường", "Bệnh viện", "Cửa hàng"], c: 1, e: "医院 = bệnh viện." },
  { a: "女：这件衣服多少钱？男：一百二十块。", p: "Nǚ: Zhè jiàn yīfu duōshao qián? Nán: Yìbǎi èrshí kuài.",
    pr: "衣服多少钱？", prP: "Yīfu duōshao qián?", prVi: "Áo bao nhiêu?",
    o: ["100 tệ", "120 tệ", "200 tệ"], c: 1, e: "一百二十 = 120." },
  { a: "男：你会做饭吗？女：会一点儿。", p: "Nán: Nǐ huì zuò fàn ma? Nǚ: Huì yìdiǎnr.",
    pr: "女的会做饭吗？", prP: "Nǚ de huì zuò fàn ma?", prVi: "Cô ấy biết nấu ăn không?",
    o: ["Không biết", "Biết một chút", "Rất giỏi"], c: 1, e: "一点儿 = một chút." },
  { a: "女：你昨天看的电影怎么样？男：很有意思。", p: "Nǚ: Nǐ zuótiān kàn de diànyǐng zěnmeyàng? Nán: Hěn yǒu yìsi.",
    pr: "电影怎么样？", prP: "Diànyǐng zěnmeyàng?", prVi: "Phim thế nào?",
    o: ["Dở", "Thú vị", "Bình thường"], c: 1, e: "有意思 = thú vị." },
  { a: "男：今天天气怎么样？女：今天有点儿冷。", p: "Nán: Jīntiān tiānqì zěnmeyàng? Nǚ: Jīntiān yǒudiǎnr lěng.",
    pr: "今天天气？", prP: "Jīntiān tiānqì?", prVi: "Thời tiết hôm nay?",
    o: ["Nóng", "Hơi lạnh", "Mưa"], c: 1, e: "有点儿冷 = hơi lạnh." },
];

const rPic = [
  { pr: "我喜欢吃苹果。", prP: "Wǒ xǐhuān chī píngguǒ.", prVi: "Tôi thích táo.", o: ["🍎", "🍊", "🍇"], c: 0, e: "苹果 = táo." },
  { pr: "他在踢足球。", prP: "Tā zài tī zúqiú.", prVi: "Anh ấy đá bóng.", o: ["⚽", "🏀", "🎾"], c: 0, e: "足球 = bóng đá." },
  { pr: "外面下雨了。", prP: "Wàimiàn xià yǔ le.", prVi: "Bên ngoài mưa.", o: ["🌧️", "☀️", "❄️"], c: 0, e: "下雨 = mưa." },
  { pr: "她的眼睛很大。", prP: "Tā de yǎnjing hěn dà.", prVi: "Mắt cô ấy to.", o: ["👀", "👃", "👂"], c: 0, e: "眼睛 = mắt." },
  { pr: "我家有一只猫。", prP: "Wǒ jiā yǒu yì zhī māo.", prVi: "Nhà có 1 mèo.", o: ["🐱", "🐶", "🐰"], c: 0, e: "猫 = mèo." },
];

const rMatch = [
  { pr: "你叫什么名字？", prP: "Nǐ jiào shénme míngzi?", prVi: "Bạn tên gì?",
    o: ["我叫小明。", "我去学校。", "他很高。"], c: 0, e: "Hỏi tên → trả lời tên." },
  { pr: "今天几号？", prP: "Jīntiān jǐ hào?", prVi: "Hôm nay ngày mấy?",
    o: ["十五号。", "在医院。", "很贵。"], c: 0, e: "Hỏi ngày → ngày." },
  { pr: "你喜欢什么运动？", prP: "Nǐ xǐhuān shénme yùndòng?", prVi: "Bạn thích môn gì?",
    o: ["游泳。", "明天。", "在家。"], c: 0, e: "Trả lời môn thể thao." },
  { pr: "你弟弟几岁了？", prP: "Nǐ dìdi jǐ suì le?", prVi: "Em mấy tuổi?",
    o: ["八岁。", "在北京。", "我累了。"], c: 0, e: "Trả lời tuổi." },
  { pr: "这本书是谁的？", prP: "Zhè běn shū shì shéi de?", prVi: "Sách của ai?",
    o: ["是我的。", "在学校。", "很好吃。"], c: 0, e: "Trả lời sở hữu." },
];

const rCloze = [
  { pr: "我___去过北京。", prP: "Wǒ ___ qù guò Běijīng.", prVi: "Tôi đã đi BK rồi.", o: ["已经", "还", "不"], c: 0, e: "已经 = đã rồi." },
  { pr: "他比我___两岁。", prP: "Tā bǐ wǒ ___ liǎng suì.", prVi: "Anh ấy lớn hơn 2.", o: ["大", "高", "多"], c: 0, e: "比…大." },
  { pr: "请___茶。", prP: "Qǐng ___ chá.", prVi: "Mời uống trà.", o: ["喝", "吃", "看"], c: 0, e: "喝茶 = uống trà." },
  { pr: "我每天___睡八小时。", prP: "Wǒ měitiān ___ shuì bā xiǎoshí.", prVi: "Tôi ngủ 8 tiếng mỗi ngày.", o: ["都", "也", "还"], c: 0, e: "每天都 = ngày nào cũng." },
  { pr: "你___去过这家店吗？", prP: "Nǐ ___ qù guò zhè jiā diàn ma?", prVi: "Bạn từng đến chưa?", o: ["以前", "明天", "现在"], c: 0, e: "Quá khứ 以前." },
];

const L: HskQuestion[] = [
  ...lPic.map((r, i) => ({ id: `h2m4-l${i + 1}`, section: "listening" as const, type: "listen-pic" as const, audio: r.a, audioPinyin: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...lTf.map((r, i) => ({ id: `h2m4-l${i + 6}`, section: "listening" as const, type: "listen-tf" as const, audio: r.a, audioPinyin: r.p, prompt: r.pr, options: [{ label: "✓" }, { label: "✗" }], correct: r.c, explanation: r.e })),
  ...lMcq.map((r, i) => ({ id: `h2m4-l${i + 11}`, section: "listening" as const, type: "listen-mcq" as const, audio: r.a, audioPinyin: r.p, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

const R: HskQuestion[] = [
  ...rPic.map((r, i) => ({ id: `h2m4-r${i + 1}`, section: "reading" as const, type: "read-pic" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rMatch.map((r, i) => ({ id: `h2m4-r${i + 6}`, section: "reading" as const, type: "read-match" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rCloze.map((r, i) => ({ id: `h2m4-r${i + 11}`, section: "reading" as const, type: "read-fill" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

export const hsk2Mock4: HskTest = {
  level: 2, code: "HSK2-MOCK-04", title: "HSK 2 Mock Test 04", titleVi: "Đề thi thử HSK 2 - Số 04",
  durationMin: 40, passScore: 60, showPinyin: true,
  intro: "Listening 15 + Reading 15 = 30 questions. Compact HSK 2 mock #4.",
  introVi: "Nghe 15 + Đọc 15 = 30 câu. Đề HSK 2 rút gọn #4.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe + chọn ảnh / Đúng-Sai / hội thoại.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Câu → ảnh, ghép cặp, điền từ.", questions: R },
  ],
};
