/**
 * @file hsk2Mock3.ts - HSK 2 Mock Test 03 (compact)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { HskTest, HskQuestion } from "./index";

const lPic = [
  { a: "我每天坐地铁上班。", p: "Wǒ měitiān zuò dìtiě shàngbān.", o: ["🚇", "🚗", "🚲"], c: 0, e: "地铁 = tàu điện ngầm." },
  { a: "他在洗碗。", p: "Tā zài xǐ wǎn.", o: ["🍽️", "🧺", "🧹"], c: 0, e: "洗碗 = rửa bát." },
  { a: "外面下雪了。", p: "Wàimiàn xià xuě le.", o: ["❄️", "☀️", "🌧️"], c: 0, e: "下雪 = tuyết rơi." },
  { a: "弟弟在跑步。", p: "Dìdi zài pǎobù.", o: ["🏃", "🚶", "🧘"], c: 0, e: "跑步 = chạy." },
  { a: "我们一起去吃饭吧。", p: "Wǒmen yìqǐ qù chī fàn ba.", o: ["🍱", "🎮", "📚"], c: 0, e: "吃饭 = ăn cơm." },
];

const lTf = [
  { a: "她每天睡八个小时。", p: "Tā měitiān shuì bā ge xiǎoshí.", pr: "😴 8h", c: 0, e: "Khớp." },
  { a: "我有三个姐姐。", p: "Wǒ yǒu sān ge jiějie.", pr: "👩👩", c: 1, e: "3 ≠ 2 → Sai." },
  { a: "今天我很高兴。", p: "Jīntiān wǒ hěn gāoxìng.", pr: "😊", c: 0, e: "Khớp." },
  { a: "他喜欢喝咖啡。", p: "Tā xǐhuān hē kāfēi.", pr: "🍵", c: 1, e: "Cà phê ≠ trà → Sai." },
  { a: "我们一起去打球。", p: "Wǒmen yìqǐ qù dǎ qiú.", pr: "🏀", c: 0, e: "Khớp." },
];

const lMcq = [
  { a: "男：你周末做什么？女：我去爬山。", p: "Nán: Nǐ zhōumò zuò shénme? Nǚ: Wǒ qù páshān.",
    pr: "女的周末做什么？", prP: "Nǚ de zhōumò zuò shénme?", prVi: "Cô ấy làm gì cuối tuần?",
    o: ["Bơi", "Leo núi", "Ngủ"], c: 1, e: "爬山 = leo núi." },
  { a: "女：苹果多少钱一斤？男：五块。", p: "Nǚ: Píngguǒ duōshao qián yì jīn? Nán: Wǔ kuài.",
    pr: "苹果多少钱一斤？", prP: "Píngguǒ duōshao qián yì jīn?", prVi: "Táo bao nhiêu/cân?",
    o: ["3 tệ", "5 tệ", "10 tệ"], c: 1, e: "五 = 5." },
  { a: "男：你会游泳吗？女：会，但游得不好。", p: "Nán: Nǐ huì yóuyǒng ma? Nǚ: Huì, dàn yóu de bù hǎo.",
    pr: "女的游泳怎么样？", prP: "Nǚ de yóuyǒng zěnmeyàng?", prVi: "Cô ấy bơi thế nào?",
    o: ["Không biết", "Biết nhưng không giỏi", "Rất giỏi"], c: 1, e: "会 nhưng 不好." },
  { a: "女：你想吃中国菜还是日本菜？男：日本菜。", p: "Nǚ: Nǐ xiǎng chī Zhōngguó cài háishì Rìběn cài? Nán: Rìběn cài.",
    pr: "男的想吃什么？", prP: "Nán de xiǎng chī shénme?", prVi: "Anh ấy muốn ăn gì?",
    o: ["Món Trung", "Món Nhật", "Món Hàn"], c: 1, e: "日本菜 = món Nhật." },
  { a: "男：你昨天为什么没来？女：我生病了。", p: "Nán: Nǐ zuótiān wèi shénme méi lái? Nǚ: Wǒ shēngbìng le.",
    pr: "女的昨天为什么没来？", prP: "Nǚ de zuótiān wèi shénme méi lái?", prVi: "Sao hôm qua cô ấy không đến?",
    o: ["Bận", "Bị ốm", "Quên"], c: 1, e: "生病 = bị bệnh." },
];

const rPic = [
  { pr: "我每天走路去公司。", prP: "Wǒ měitiān zǒulù qù gōngsī.", prVi: "Tôi đi bộ đi làm.", o: ["🚶", "🚗", "🚲"], c: 0, e: "走路 = đi bộ." },
  { pr: "她在学校教书。", prP: "Tā zài xuéxiào jiāo shū.", prVi: "Cô ấy dạy ở trường.", o: ["🏫", "🏥", "🏬"], c: 0, e: "教书 = dạy." },
  { pr: "我们去喝啤酒。", prP: "Wǒmen qù hē píjiǔ.", prVi: "Đi uống bia.", o: ["🍺", "🍷", "🧃"], c: 0, e: "啤酒 = bia." },
  { pr: "他的手很大。", prP: "Tā de shǒu hěn dà.", prVi: "Tay anh ấy rất to.", o: ["✋", "👀", "👂"], c: 0, e: "手 = tay." },
  { pr: "我喜欢吃面条。", prP: "Wǒ xǐhuān chī miàntiáo.", prVi: "Tôi thích ăn mì.", o: ["🍜", "🍚", "🍣"], c: 0, e: "面条 = mì." },
];

const rMatch = [
  { pr: "你怎么了？", prP: "Nǐ zěnme le?", prVi: "Bạn sao vậy?",
    o: ["我头疼。", "我去学校。", "他很高。"], c: 0, e: "怎么了 hỏi tình trạng." },
  { pr: "请问，火车站怎么走？", prP: "Qǐngwèn, huǒchēzhàn zěnme zǒu?", prVi: "Ga tàu đi sao?",
    o: ["往前走，然后右转。", "三点。", "很贵。"], c: 0, e: "Chỉ đường." },
  { pr: "你想喝什么？", prP: "Nǐ xiǎng hē shénme?", prVi: "Bạn muốn uống gì?",
    o: ["果汁，谢谢。", "他来了。", "在家里。"], c: 0, e: "Trả lời thẳng câu hỏi." },
  { pr: "你的生日是什么时候？", prP: "Nǐ de shēngrì shì shénme shíhou?", prVi: "Sinh nhật khi nào?",
    o: ["五月十号。", "在中国。", "我很忙。"], c: 0, e: "Trả lời ngày tháng." },
  { pr: "你觉得这个怎么样？", prP: "Nǐ juéde zhè ge zěnmeyàng?", prVi: "Bạn thấy thế nào?",
    o: ["很好，我喜欢。", "我不去。", "他是医生。"], c: 0, e: "Đánh giá." },
];

const rCloze = [
  { pr: "我___在公司工作。", prP: "Wǒ ___ zài gōngsī gōngzuò.", prVi: "Tôi đang ở cty làm.", o: ["正", "正在", "了"], c: 1, e: "正在 = đang." },
  { pr: "他___我大三岁。", prP: "Tā ___ wǒ dà sān suì.", prVi: "Anh ấy lớn hơn 3.", o: ["比", "和", "跟"], c: 0, e: "比较." },
  { pr: "你___借我十块钱吗？", prP: "Nǐ ___ jiè wǒ shí kuài qián ma?", prVi: "Cho mượn 10 tệ?", o: ["能", "想", "要"], c: 0, e: "能 = có thể." },
  { pr: "今天的菜___好吃。", prP: "Jīntiān de cài ___ hǎochī.", prVi: "Đồ ăn rất ngon.", o: ["很", "比", "在"], c: 0, e: "很 + adj." },
  { pr: "他唱歌唱___很好听。", prP: "Tā chàng gē chàng ___ hěn hǎotīng.", prVi: "Anh ấy hát hay.", o: ["得", "了", "过"], c: 0, e: "V + 得 + adv." },
];

const L: HskQuestion[] = [
  ...lPic.map((r, i) => ({ id: `h2m3-l${i + 1}`, section: "listening" as const, type: "listen-pic" as const, audio: r.a, audioPinyin: r.p, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...lTf.map((r, i) => ({ id: `h2m3-l${i + 6}`, section: "listening" as const, type: "listen-tf" as const, audio: r.a, audioPinyin: r.p, prompt: r.pr, options: [{ label: "✓" }, { label: "✗" }], correct: r.c, explanation: r.e })),
  ...lMcq.map((r, i) => ({ id: `h2m3-l${i + 11}`, section: "listening" as const, type: "listen-mcq" as const, audio: r.a, audioPinyin: r.p, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

const R: HskQuestion[] = [
  ...rPic.map((r, i) => ({ id: `h2m3-r${i + 1}`, section: "reading" as const, type: "read-pic" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rMatch.map((r, i) => ({ id: `h2m3-r${i + 6}`, section: "reading" as const, type: "read-match" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
  ...rCloze.map((r, i) => ({ id: `h2m3-r${i + 11}`, section: "reading" as const, type: "read-fill" as const, prompt: r.pr, promptPinyin: r.prP, promptVi: r.prVi, options: r.o.map(label => ({ label })), correct: r.c, explanation: r.e })),
];

export const hsk2Mock3: HskTest = {
  level: 2, code: "HSK2-MOCK-03", title: "HSK 2 Mock Test 03", titleVi: "Đề thi thử HSK 2 - Số 03",
  durationMin: 40, passScore: 60, showPinyin: true,
  intro: "Listening 15 + Reading 15 = 30 questions. Compact HSK 2 mock #3.",
  introVi: "Nghe 15 + Đọc 15 = 30 câu. Đề HSK 2 rút gọn #3.",
  sections: [
    { id: "listening", nameVi: "第一部分 听力", nameEn: "Part 1: Listening", description: "Nghe + chọn ảnh / Đúng-Sai / hội thoại.", questions: L },
    { id: "reading", nameVi: "第二部分 阅读", nameEn: "Part 2: Reading", description: "Câu → ảnh, ghép cặp, điền từ.", questions: R },
  ],
};
