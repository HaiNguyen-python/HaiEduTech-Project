/**
 * @file hsk2Mock2.ts - HSK 2 Mock Test 02 (compact, Hanban-style)
 * Listening 15 + Reading 15 = 30 Q, 40 minutes. Pinyin always shown.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lPic = [
  { a: "我每天早上喝牛奶。", p: "Wǒ měitiān zǎoshang hē niúnǎi.", o: ["🥛", "☕", "🧃"], c: 0, e: "牛奶 = sữa." },
  { a: "他在踢足球。", p: "Tā zài tī zúqiú.", o: ["⚽", "🏀", "🎾"], c: 0, e: "足球 = bóng đá." },
  { a: "现在外面刮风。", p: "Xiànzài wàimiàn guā fēng.", o: ["🌬️", "☀️", "🌧️"], c: 0, e: "刮风 = nổi gió." },
  { a: "妹妹在弹钢琴。", p: "Mèimei zài tán gāngqín.", o: ["🎹", "🎸", "🥁"], c: 0, e: "钢琴 = piano." },
  { a: "我们去看电影吧。", p: "Wǒmen qù kàn diànyǐng ba.", o: ["🎬", "🎵", "🏟️"], c: 0, e: "电影 = phim." },
];

const lTf = [
  { a: "他每天跑步半个小时。", p: "Tā měitiān pǎobù bàn ge xiǎoshí.", pr: "🏃 30 min", c: 0, e: "半小时 = 30 phút." },
  { a: "我的房间有两张床。", p: "Wǒ de fángjiān yǒu liǎng zhāng chuáng.", pr: "🛏️🛏️🛏️", c: 1, e: "2 cái, hình 3 → Sai." },
  { a: "今天天气不好，下大雨。", p: "Jīntiān tiānqì bù hǎo, xià dà yǔ.", pr: "☀️", c: 1, e: "Audio: mưa to; hình: nắng → Sai." },
  { a: "我哥哥结婚了。", p: "Wǒ gēge jiéhūn le.", pr: "💍", c: 0, e: "结婚 = kết hôn." },
  { a: "桌子上有四个苹果。", p: "Zhuōzi shàng yǒu sì ge píngguǒ.", pr: "🍎🍎🍎🍎", c: 0, e: "4 quả táo, khớp." },
];

const lMcq = [
  { a: "男：你昨天去哪儿了？女：我去了图书馆。", p: "Nán: Nǐ zuótiān qù nǎr le? Nǚ: Wǒ qù le túshūguǎn.",
    pr: "女的昨天去了哪儿？", prP: "Nǚ de zuótiān qù le nǎr?", prVi: "Hôm qua cô ấy đi đâu?",
    o: ["Bệnh viện", "Thư viện", "Siêu thị"], c: 1, e: "图书馆 = thư viện." },
  { a: "女：这件衣服多少钱？男：一百二十块。", p: "Nǚ: Zhè jiàn yīfu duōshao qián? Nán: Yìbǎi èrshí kuài.",
    pr: "这件衣服多少钱？", prP: "Zhè jiàn yīfu duōshao qián?", prVi: "Áo này bao nhiêu tiền?",
    o: ["120 tệ", "210 tệ", "100 tệ"], c: 0, e: "一百二十 = 120." },
  { a: "男：你会做菜吗？女：我会做中国菜。", p: "Nán: Nǐ huì zuò cài ma? Nǚ: Wǒ huì zuò Zhōngguó cài.",
    pr: "女的会做什么？", prP: "Nǚ de huì zuò shénme?", prVi: "Cô ấy biết làm gì?",
    o: ["Món Trung Quốc", "Món Việt Nam", "Không biết"], c: 0, e: "中国菜 = món Trung." },
  { a: "女：明天我们几点见面？男：上午九点吧。", p: "Nǚ: Míngtiān wǒmen jǐ diǎn jiànmiàn? Nán: Shàngwǔ jiǔ diǎn ba.",
    pr: "他们明天几点见面？", prP: "Tāmen míngtiān jǐ diǎn jiànmiàn?", prVi: "Mai họ gặp lúc mấy giờ?",
    o: ["7 giờ sáng", "9 giờ sáng", "9 giờ tối"], c: 1, e: "上午九点 = 9 giờ sáng." },
  { a: "男：你的工作怎么样？女：很忙，但是我喜欢。", p: "Nán: Nǐ de gōngzuò zěnmeyàng? Nǚ: Hěn máng, dànshì wǒ xǐhuān.",
    pr: "女的工作怎么样？", prP: "Nǚ de gōngzuò zěnmeyàng?", prVi: "Công việc của cô ấy thế nào?",
    o: ["Bận và thích", "Bận và ghét", "Rảnh rỗi"], c: 0, e: "忙 nhưng 喜欢." },
];

const rPic = [
  { pr: "我每天骑自行车上班。", prP: "Wǒ měitiān qí zìxíngchē shàngbān.", prVi: "Tôi đi làm bằng xe đạp mỗi ngày.", o: ["🚲", "🚗", "🚌"], c: 0, e: "自行车 = xe đạp." },
  { pr: "他在医院工作。", prP: "Tā zài yīyuàn gōngzuò.", prVi: "Anh ấy làm việc ở bệnh viện.", o: ["🏥", "🏫", "🏬"], c: 0, e: "医院 = bệnh viện." },
  { pr: "孩子们在公园玩。", prP: "Háizimen zài gōngyuán wán.", prVi: "Bọn trẻ chơi ở công viên.", o: ["🌳", "🏠", "🏥"], c: 0, e: "公园 = công viên." },
  { pr: "她的眼睛很漂亮。", prP: "Tā de yǎnjing hěn piàoliang.", prVi: "Mắt cô ấy rất đẹp.", o: ["👁️", "👄", "👂"], c: 0, e: "眼睛 = mắt." },
  { pr: "我喜欢吃饺子。", prP: "Wǒ xǐhuān chī jiǎozi.", prVi: "Tôi thích ăn sủi cảo.", o: ["🥟", "🍜", "🍣"], c: 0, e: "饺子 = sủi cảo." },
];

const rMatch = [
  { pr: "你今天怎么没来上课？", prP: "Nǐ jīntiān zěnme méi lái shàngkè?", prVi: "Sao hôm nay bạn không đi học?",
    o: ["我生病了。", "我很高兴。", "请进。"], c: 0, e: "Hỏi lý do → trả lời 'tôi bị ốm'." },
  { pr: "请问，洗手间在哪儿？", prP: "Qǐngwèn, xǐshǒujiān zài nǎr?", prVi: "Cho hỏi, nhà vệ sinh ở đâu?",
    o: ["在二楼。", "三点。", "我很好。"], c: 0, e: "在二楼 = trên tầng 2." },
  { pr: "你想喝什么？", prP: "Nǐ xiǎng hē shénme?", prVi: "Bạn muốn uống gì?",
    o: ["我想喝茶。", "我去学校。", "他是医生。"], c: 0, e: "茶 = trà." },
  { pr: "明天是你的生日吗？", prP: "Míngtiān shì nǐ de shēngrì ma?", prVi: "Mai là sinh nhật bạn à?",
    o: ["是的，谢谢。", "在家里。", "我不去。"], c: 0, e: "Câu xác nhận 是的." },
  { pr: "外面冷吗？", prP: "Wàimiàn lěng ma?", prVi: "Bên ngoài có lạnh không?",
    o: ["很冷，多穿点。", "我很饿。", "他很高。"], c: 0, e: "Trả lời thẳng câu hỏi 冷." },
];

const rCloze = [
  { pr: "他___去过北京。", prP: "Tā ___ qù guò Běijīng.", prVi: "Anh ấy đã từng đến Bắc Kinh.", o: ["已经", "正在", "马上"], c: 0, e: "已经 = đã (kinh nghiệm)." },
  { pr: "我比他___两岁。", prP: "Wǒ bǐ tā ___ liǎng suì.", prVi: "Tôi lớn hơn anh ấy 2 tuổi.", o: ["大", "高", "多"], c: 0, e: "比 + adj + chênh lệch." },
  { pr: "你___给我介绍一下吗？", prP: "Nǐ ___ gěi wǒ jièshào yíxià ma?", prVi: "Bạn có thể giới thiệu cho tôi không?", o: ["能", "想", "要"], c: 0, e: "能 = có thể (xin nhờ)." },
  { pr: "今天的天气___昨天好。", prP: "Jīntiān de tiānqì ___ zuótiān hǎo.", prVi: "Hôm nay đẹp trời hơn hôm qua.", o: ["比", "和", "跟"], c: 0, e: "比较: A 比 B + adj." },
  { pr: "他汉语说得很___。", prP: "Tā Hànyǔ shuō de hěn ___.", prVi: "Anh ấy nói tiếng Trung rất tốt.", o: ["好", "高", "快乐"], c: 0, e: "得 + adv: 说得好." },
];

const L: HskQuestion[] = [
  ...lPic.map((r, i) => ({ id: `h2m2-l${i + 1}`, section: "listening" as const, type: "listen-pic" as const, audio: r.a, audioPinyin: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...lTf.map((r, i) => ({ id: `h2m2-l${i + 6}`, section: "listening" as const, type: "listen-tf" as const, audio: r.a, audioPinyin: r.p, prompt: r.pr, options: [{ label: "✓" }, { label: "✗" }], correct: r.c, explanation: r.e })),
  ...lMcq.map((r, i) => ({ id: `h2m2-l${i + 11}`, section: "listening" as const, type: "listen-mcq" as const, audio: r.a, audioPinyin: r.p, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

const R: HskQuestion[] = [
  ...rPic.map((r, i) => ({ id: `h2m2-r${i + 1}`, section: "reading" as const, type: "read-pic" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rMatch.map((r, i) => ({ id: `h2m2-r${i + 6}`, section: "reading" as const, type: "read-match" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rCloze.map((r, i) => ({ id: `h2m2-r${i + 11}`, section: "reading" as const, type: "read-fill" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

export const hsk2Mock2: HskTest = {
  level: 2, code: "HSK2-MOCK-02", title: "HSK 2 Mock Test 02", titleVi: "Đề thi thử HSK 2 - Số 02",
  durationMin: 40, passScore: 60, showPinyin: true,
  intro: "Listening 15 + Reading 15 = 30 questions. Compact HSK 2 mock.",
  introVi: "Nghe 15 + Đọc 15 = 30 câu. Đề HSK 2 rút gọn.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe + chọn ảnh / Đúng-Sai / hội thoại.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Câu → ảnh, hỏi-đáp ghép cặp, điền từ.", questions: R },
  ],
};
