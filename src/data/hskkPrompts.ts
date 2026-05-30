/**
 * @file hskkPrompts.ts
 * @description HSKK Speaking exam prompts (Sơ cấp / Trung cấp / Cao cấp)
 * Format 3 phần theo đề thật:
 *  - Part 1: 听后重复 (nghe rồi lặp lại) — đọc to câu mẫu
 *  - Part 2: 听后回答 / 看图说话 (nghe rồi trả lời / nhìn ảnh nói)
 *  - Part 3: 回答问题 / 复述 (trả lời câu hỏi mở / thuật lại đoạn văn)
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type HskkLevel = "beginner" | "intermediate" | "advanced";
export type HskkPart = 1 | 2 | 3;

export interface HskkPrompt {
  id: string;
  level: HskkLevel;
  part: HskkPart;
  hanzi: string;        // Nội dung chính (câu mẫu / câu hỏi / đoạn văn)
  pinyin: string;       // Phiên âm
  vi: string;           // Bản dịch tiếng Việt
  en?: string;          // Bản dịch tiếng Anh (tuỳ chọn)
  prepSeconds: number;  // Thời gian chuẩn bị (theo đề thật)
  answerSeconds: number;// Thời gian trả lời tối đa
  hint?: string;        // Gợi ý hướng trả lời (cho Part 2/3)
}

export const HSKK_LEVEL_META: Record<HskkLevel, {
  labelVi: string; labelEn: string; hskRange: string; totalMinutes: number; color: string;
}> = {
  beginner: { labelVi: "HSKK Sơ cấp", labelEn: "HSKK Beginner", hskRange: "HSK 1-2", totalMinutes: 17, color: "from-emerald-500 to-teal-500" },
  intermediate: { labelVi: "HSKK Trung cấp", labelEn: "HSKK Intermediate", hskRange: "HSK 3-4", totalMinutes: 21, color: "from-blue-500 to-cyan-500" },
  advanced: { labelVi: "HSKK Cao cấp", labelEn: "HSKK Advanced", hskRange: "HSK 5-6", totalMinutes: 25, color: "from-rose-500 to-amber-500" },
};

export const HSKK_PART_META: Record<HskkPart, { labelVi: string; labelEn: string; descVi: string; descEn: string; }> = {
  1: { labelVi: "Phần 1 · Nghe rồi lặp lại", labelEn: "Part 1 · Listen & Repeat", descVi: "Nghe câu mẫu và đọc to lại nguyên văn. Chú ý phát âm và thanh điệu.", descEn: "Listen to the sample and repeat aloud. Focus on pronunciation and tones." },
  2: { labelVi: "Phần 2 · Nghe rồi trả lời", labelEn: "Part 2 · Listen & Answer", descVi: "Nghe câu hỏi, có thời gian chuẩn bị ngắn rồi trả lời tự nhiên.", descEn: "Listen to the question, prepare briefly, then answer naturally." },
  3: { labelVi: "Phần 3 · Trả lời / Thuật lại", labelEn: "Part 3 · Open Answer / Retell", descVi: "Trả lời câu hỏi mở 2-3 phút, có dàn ý và liên kết logic.", descEn: "Open answer 2-3 minutes with structure and logical flow." },
};

// ============ HSKK SƠ CẤP (HSK 1-2) ============
const beginnerPrompts: HskkPrompt[] = [
  // Part 1 — 15 câu lặp lại
  { id: "b1-1", level: "beginner", part: 1, hanzi: "我叫王明。", pinyin: "Wǒ jiào Wáng Míng.", vi: "Tôi tên là Vương Minh.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-2", level: "beginner", part: 1, hanzi: "今天天气很好。", pinyin: "Jīntiān tiānqì hěn hǎo.", vi: "Hôm nay thời tiết rất đẹp.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-3", level: "beginner", part: 1, hanzi: "我喜欢喝中国茶。", pinyin: "Wǒ xǐhuān hē Zhōngguó chá.", vi: "Tôi thích uống trà Trung Quốc.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-4", level: "beginner", part: 1, hanzi: "他是我的好朋友。", pinyin: "Tā shì wǒ de hǎo péngyǒu.", vi: "Anh ấy là bạn tốt của tôi.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-5", level: "beginner", part: 1, hanzi: "现在几点了?", pinyin: "Xiànzài jǐ diǎn le?", vi: "Bây giờ là mấy giờ rồi?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-6", level: "beginner", part: 1, hanzi: "明天我要去北京。", pinyin: "Míngtiān wǒ yào qù Běijīng.", vi: "Ngày mai tôi sẽ đi Bắc Kinh.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-7", level: "beginner", part: 1, hanzi: "你家有几口人?", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "Nhà bạn có mấy người?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-8", level: "beginner", part: 1, hanzi: "我每天七点起床。", pinyin: "Wǒ měitiān qī diǎn qǐchuáng.", vi: "Mỗi ngày tôi thức dậy lúc 7 giờ.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-9", level: "beginner", part: 1, hanzi: "这本书很有意思。", pinyin: "Zhè běn shū hěn yǒuyìsi.", vi: "Cuốn sách này rất thú vị.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-10", level: "beginner", part: 1, hanzi: "我妈妈在医院工作。", pinyin: "Wǒ māma zài yīyuàn gōngzuò.", vi: "Mẹ tôi làm việc tại bệnh viện.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-11", level: "beginner", part: 1, hanzi: "请你慢一点儿说。", pinyin: "Qǐng nǐ màn yìdiǎnr shuō.", vi: "Xin bạn nói chậm một chút.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-12", level: "beginner", part: 1, hanzi: "苹果多少钱一斤?", pinyin: "Píngguǒ duōshǎo qián yì jīn?", vi: "Táo bao nhiêu tiền một cân?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-13", level: "beginner", part: 1, hanzi: "我学习汉语两年了。", pinyin: "Wǒ xuéxí Hànyǔ liǎng nián le.", vi: "Tôi học tiếng Hán đã hai năm rồi.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-14", level: "beginner", part: 1, hanzi: "周末你想做什么?", pinyin: "Zhōumò nǐ xiǎng zuò shénme?", vi: "Cuối tuần bạn muốn làm gì?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-15", level: "beginner", part: 1, hanzi: "祝你生日快乐!", pinyin: "Zhù nǐ shēngrì kuàilè!", vi: "Chúc bạn sinh nhật vui vẻ!", prepSeconds: 0, answerSeconds: 5 },
  // Part 2 — 10 câu hỏi trả lời ngắn
  { id: "b2-1", level: "beginner", part: 2, hanzi: "你叫什么名字?", pinyin: "Nǐ jiào shénme míngzi?", vi: "Bạn tên là gì?", prepSeconds: 10, answerSeconds: 15, hint: "Trả lời: 我叫... / Tôi tên là..." },
  { id: "b2-2", level: "beginner", part: 2, hanzi: "你今年多大了?", pinyin: "Nǐ jīnnián duō dà le?", vi: "Năm nay bạn bao nhiêu tuổi?", prepSeconds: 10, answerSeconds: 15, hint: "Trả lời: 我今年...岁。" },
  { id: "b2-3", level: "beginner", part: 2, hanzi: "你家在哪儿?", pinyin: "Nǐ jiā zài nǎr?", vi: "Nhà bạn ở đâu?", prepSeconds: 10, answerSeconds: 15 },
  { id: "b2-4", level: "beginner", part: 2, hanzi: "你喜欢吃什么菜?", pinyin: "Nǐ xǐhuān chī shénme cài?", vi: "Bạn thích ăn món gì?", prepSeconds: 10, answerSeconds: 15 },
  { id: "b2-5", level: "beginner", part: 2, hanzi: "你怎么去学校?", pinyin: "Nǐ zěnme qù xuéxiào?", vi: "Bạn đi đến trường bằng phương tiện gì?", prepSeconds: 10, answerSeconds: 15 },
  { id: "b2-6", level: "beginner", part: 2, hanzi: "你的爱好是什么?", pinyin: "Nǐ de àihào shì shénme?", vi: "Sở thích của bạn là gì?", prepSeconds: 10, answerSeconds: 15 },
  { id: "b2-7", level: "beginner", part: 2, hanzi: "你为什么学习汉语?", pinyin: "Nǐ wèishéme xuéxí Hànyǔ?", vi: "Vì sao bạn học tiếng Hán?", prepSeconds: 10, answerSeconds: 20 },
  { id: "b2-8", level: "beginner", part: 2, hanzi: "你最好的朋友是谁?", pinyin: "Nǐ zuì hǎo de péngyǒu shì shéi?", vi: "Bạn thân nhất của bạn là ai?", prepSeconds: 10, answerSeconds: 20 },
  { id: "b2-9", level: "beginner", part: 2, hanzi: "你周末常常做什么?", pinyin: "Nǐ zhōumò chángcháng zuò shénme?", vi: "Cuối tuần bạn thường làm gì?", prepSeconds: 10, answerSeconds: 20 },
  { id: "b2-10", level: "beginner", part: 2, hanzi: "你觉得汉语难吗?", pinyin: "Nǐ juéde Hànyǔ nán ma?", vi: "Bạn thấy tiếng Hán có khó không?", prepSeconds: 10, answerSeconds: 20 },
];

// ============ HSKK TRUNG CẤP (HSK 3-4) ============
const intermediatePrompts: HskkPrompt[] = [
  // Part 1 — 10 câu lặp lại (dài hơn)
  { id: "i1-1", level: "intermediate", part: 1, hanzi: "我打算下个月去上海出差,大概住一个星期。", pinyin: "Wǒ dǎsuàn xià gè yuè qù Shànghǎi chūchāi, dàgài zhù yí gè xīngqī.", vi: "Tháng sau tôi định đi công tác Thượng Hải, ở khoảng một tuần.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-2", level: "intermediate", part: 1, hanzi: "随着经济的发展,人们的生活水平越来越高了。", pinyin: "Suízhe jīngjì de fāzhǎn, rénmen de shēnghuó shuǐpíng yuè lái yuè gāo le.", vi: "Cùng với sự phát triển kinh tế, mức sống của người dân ngày càng cao.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-3", level: "intermediate", part: 1, hanzi: "虽然这件事很难,但是我相信我们一定能解决。", pinyin: "Suīrán zhè jiàn shì hěn nán, dànshì wǒ xiāngxìn wǒmen yídìng néng jiějué.", vi: "Tuy việc này khó nhưng tôi tin chúng ta nhất định giải quyết được.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-4", level: "intermediate", part: 1, hanzi: "他不仅汉语说得流利,英语也非常好。", pinyin: "Tā bùjǐn Hànyǔ shuō de liúlì, Yīngyǔ yě fēicháng hǎo.", vi: "Anh ấy không chỉ nói tiếng Hán lưu loát mà tiếng Anh cũng rất giỏi.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-5", level: "intermediate", part: 1, hanzi: "为了能考上理想的大学,他每天学习到深夜。", pinyin: "Wèile néng kǎo shàng lǐxiǎng de dàxué, tā měitiān xuéxí dào shēnyè.", vi: "Để thi đậu vào trường đại học mơ ước, mỗi ngày anh ấy học đến khuya.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-6", level: "intermediate", part: 1, hanzi: "互联网改变了我们的生活方式和工作方式。", pinyin: "Hùliánwǎng gǎibiàn le wǒmen de shēnghuó fāngshì hé gōngzuò fāngshì.", vi: "Internet đã thay đổi cách sống và cách làm việc của chúng ta.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-7", level: "intermediate", part: 1, hanzi: "无论刮风下雨,他都坚持每天跑步锻炼。", pinyin: "Wúlùn guāfēng xiàyǔ, tā dōu jiānchí měitiān pǎobù duànliàn.", vi: "Bất kể gió mưa, anh ấy đều kiên trì chạy bộ rèn luyện mỗi ngày.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-8", level: "intermediate", part: 1, hanzi: "环境保护是每个人的责任,我们都应该出一份力。", pinyin: "Huánjìng bǎohù shì měi gè rén de zérèn, wǒmen dōu yīnggāi chū yí fèn lì.", vi: "Bảo vệ môi trường là trách nhiệm của mỗi người, ai cũng nên góp sức.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-9", level: "intermediate", part: 1, hanzi: "经过多年的努力,他终于实现了自己的梦想。", pinyin: "Jīngguò duō nián de nǔlì, tā zhōngyú shíxiàn le zìjǐ de mèngxiǎng.", vi: "Sau nhiều năm nỗ lực, anh ấy cuối cùng đã thực hiện được ước mơ.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-10", level: "intermediate", part: 1, hanzi: "学习一门外语既需要兴趣,也需要长期的坚持。", pinyin: "Xuéxí yì mén wàiyǔ jì xūyào xìngqù, yě xūyào chángqī de jiānchí.", vi: "Học một ngoại ngữ vừa cần hứng thú, vừa cần kiên trì lâu dài.", prepSeconds: 0, answerSeconds: 10 },
  // Part 2 — 10 câu hỏi suy nghĩ
  { id: "i2-1", level: "intermediate", part: 2, hanzi: "请你谈一谈你的家乡。", pinyin: "Qǐng nǐ tán yi tán nǐ de jiāxiāng.", vi: "Hãy nói về quê hương của bạn.", prepSeconds: 10, answerSeconds: 60, hint: "Vị trí, đặc sản, con người, cảnh đẹp." },
  { id: "i2-2", level: "intermediate", part: 2, hanzi: "你认为学习汉语最难的是什么?", pinyin: "Nǐ rènwéi xuéxí Hànyǔ zuì nán de shì shénme?", vi: "Bạn cho rằng phần khó nhất khi học tiếng Hán là gì?", prepSeconds: 10, answerSeconds: 60, hint: "Phát âm thanh điệu / chữ Hán / ngữ pháp — cho ví dụ." },
  { id: "i2-3", level: "intermediate", part: 2, hanzi: "你最喜欢的一本书是什么?为什么?", pinyin: "Nǐ zuì xǐhuān de yì běn shū shì shénme? Wèishéme?", vi: "Cuốn sách bạn thích nhất là gì? Vì sao?", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-4", level: "intermediate", part: 2, hanzi: "请介绍一下你的家庭。", pinyin: "Qǐng jièshào yíxià nǐ de jiātíng.", vi: "Hãy giới thiệu về gia đình bạn.", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-5", level: "intermediate", part: 2, hanzi: "你觉得手机给我们的生活带来了什么变化?", pinyin: "Nǐ juéde shǒujī gěi wǒmen de shēnghuó dài lái le shénme biànhuà?", vi: "Bạn thấy điện thoại đã mang lại thay đổi gì cho cuộc sống chúng ta?", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-6", level: "intermediate", part: 2, hanzi: "请说一件让你印象最深的事。", pinyin: "Qǐng shuō yí jiàn ràng nǐ yìnxiàng zuì shēn de shì.", vi: "Hãy kể một sự việc để lại ấn tượng sâu sắc nhất với bạn.", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-7", level: "intermediate", part: 2, hanzi: "你怎么看待网上购物?", pinyin: "Nǐ zěnme kàndài wǎngshàng gòuwù?", vi: "Bạn nghĩ thế nào về việc mua sắm trên mạng?", prepSeconds: 10, answerSeconds: 60, hint: "Ưu / nhược điểm + ví dụ bản thân." },
  { id: "i2-8", level: "intermediate", part: 2, hanzi: "你将来想做什么工作?", pinyin: "Nǐ jiānglái xiǎng zuò shénme gōngzuò?", vi: "Tương lai bạn muốn làm công việc gì?", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-9", level: "intermediate", part: 2, hanzi: "你认为什么样的朋友是好朋友?", pinyin: "Nǐ rènwéi shénme yàng de péngyǒu shì hǎo péngyǒu?", vi: "Theo bạn, người bạn như thế nào là bạn tốt?", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-10", level: "intermediate", part: 2, hanzi: "请谈谈你对环境保护的看法。", pinyin: "Qǐng tántan nǐ duì huánjìng bǎohù de kànfǎ.", vi: "Hãy nói về quan điểm của bạn về bảo vệ môi trường.", prepSeconds: 10, answerSeconds: 60 },
];

// ============ HSKK CAO CẤP (HSK 5-6) ============
const advancedPrompts: HskkPrompt[] = [
  // Part 1 — 3 câu nghe → diễn đạt lại (paraphrase)
  { id: "a1-1", level: "advanced", part: 1, hanzi: "随着科技的迅速发展,人工智能已经深入到我们生活的方方面面,既带来了便利,也引发了许多关于就业和伦理的讨论。", pinyin: "Suízhe kējì de xùnsù fāzhǎn, réngōng zhìnéng yǐjīng shēnrù dào wǒmen shēnghuó de fāngfāngmiànmiàn, jì dài lái le biànlì, yě yǐnfā le xǔduō guānyú jiùyè hé lúnlǐ de tǎolùn.", vi: "Cùng sự phát triển nhanh chóng của công nghệ, AI đã thấm vào mọi mặt cuộc sống, vừa mang lại tiện lợi vừa làm dấy lên nhiều tranh luận về việc làm và đạo đức.", prepSeconds: 10, answerSeconds: 30, hint: "Tóm tắt 2-3 câu chính + thêm 1 ví dụ." },
  { id: "a1-2", level: "advanced", part: 1, hanzi: "全球气候变化对人类社会构成了严峻挑战,各国必须加强合作,共同寻求可持续发展的解决方案。", pinyin: "Quánqiú qìhòu biànhuà duì rénlèi shèhuì gòuchéng le yánjùn tiǎozhàn, gèguó bìxū jiāqiáng hézuò, gòngtóng xúnqiú kěchíxù fāzhǎn de jiějué fāng'àn.", vi: "Biến đổi khí hậu toàn cầu là thách thức nghiêm trọng cho nhân loại, các nước cần tăng cường hợp tác để cùng tìm giải pháp phát triển bền vững.", prepSeconds: 10, answerSeconds: 30 },
  { id: "a1-3", level: "advanced", part: 1, hanzi: "教育的本质不仅在于传授知识,更在于培养独立思考的能力和终身学习的习惯。", pinyin: "Jiàoyù de běnzhí bùjǐn zàiyú chuánshòu zhīshi, gèng zàiyú péiyǎng dúlì sīkǎo de nénglì hé zhōngshēn xuéxí de xíguàn.", vi: "Bản chất của giáo dục không chỉ là truyền đạt kiến thức mà còn là bồi dưỡng năng lực tư duy độc lập và thói quen học tập suốt đời.", prepSeconds: 10, answerSeconds: 30 },
  // Part 2 — 2 đề luận điểm (2-3 phút)
  { id: "a2-1", level: "advanced", part: 2, hanzi: "请就\"年轻人应该选择稳定的工作还是追求自己的梦想\"发表你的看法。", pinyin: "Qǐng jiù \"niánqīng rén yīnggāi xuǎnzé wěndìng de gōngzuò háishì zhuīqiú zìjǐ de mèngxiǎng\" fābiǎo nǐ de kànfǎ.", vi: "Hãy nêu quan điểm về việc \"người trẻ nên chọn công việc ổn định hay theo đuổi ước mơ\".", prepSeconds: 30, answerSeconds: 150, hint: "Luận điểm rõ ràng + 2 lý do + ví dụ + kết luận." },
  { id: "a2-2", level: "advanced", part: 2, hanzi: "请谈谈你对\"读万卷书,行万里路\"这句话的理解。", pinyin: "Qǐng tántan nǐ duì \"dú wàn juàn shū, xíng wàn lǐ lù\" zhè jù huà de lǐjiě.", vi: "Hãy nói cách bạn hiểu câu \"đọc vạn quyển sách, đi vạn dặm đường\".", prepSeconds: 30, answerSeconds: 150 },
  { id: "a2-3", level: "advanced", part: 2, hanzi: "请谈谈你认为成功最重要的因素是什么。", pinyin: "Qǐng tántan nǐ rènwéi chénggōng zuì zhòngyào de yīnsù shì shénme.", vi: "Hãy nói về yếu tố mà bạn cho là quan trọng nhất dẫn đến thành công.", prepSeconds: 30, answerSeconds: 150 },
  { id: "a2-4", level: "advanced", part: 2, hanzi: "请谈谈科技发展对传统文化的影响。", pinyin: "Qǐng tántan kējì fāzhǎn duì chuántǒng wénhuà de yǐngxiǎng.", vi: "Hãy nói về ảnh hưởng của phát triển công nghệ đến văn hoá truyền thống.", prepSeconds: 30, answerSeconds: 150 },
  { id: "a2-5", level: "advanced", part: 2, hanzi: "在你看来,城市生活和乡村生活各有什么优缺点?", pinyin: "Zài nǐ kànlái, chéngshì shēnghuó hé xiāngcūn shēnghuó gè yǒu shénme yōuquēdiǎn?", vi: "Theo bạn, cuộc sống thành thị và nông thôn mỗi nơi có ưu nhược điểm gì?", prepSeconds: 30, answerSeconds: 150 },
  { id: "a2-6", level: "advanced", part: 2, hanzi: "请就\"学习外语对个人发展的重要性\"发表你的观点。", pinyin: "Qǐng jiù \"xuéxí wàiyǔ duì gèrén fāzhǎn de zhòngyàoxìng\" fābiǎo nǐ de guāndiǎn.", vi: "Hãy nêu quan điểm về \"tầm quan trọng của học ngoại ngữ đối với sự phát triển cá nhân\".", prepSeconds: 30, answerSeconds: 150 },
];

export const HSKK_PROMPTS: HskkPrompt[] = [...beginnerPrompts, ...intermediatePrompts, ...advancedPrompts];

export function getPromptsByLevelPart(level: HskkLevel, part: HskkPart): HskkPrompt[] {
  return HSKK_PROMPTS.filter(p => p.level === level && p.part === part);
}
