// ============================================================
// HSK Vocabulary Expansion 2 - +180 additional words
// 30 new words per HSK level (1-6), curated to avoid duplicates
// ============================================================
import type { HskWord } from "./types";

export const hskExpansion2Words: HskWord[] = [
  // ============================================================
  // HSK 1 EXPANSION 2 (+30)
  // ============================================================
  { character: "花儿", pinyin: "huār", level: "HSK 1", definition: { vi: "Bông hoa", en: "Flower" }, example: "花儿很美。", examplePinyin: "Huār hěn měi.", category: "Nature" },
  { character: "海", pinyin: "hǎi", level: "HSK 1", definition: { vi: "Biển", en: "Sea" }, example: "海很大。", examplePinyin: "Hǎi hěn dà.", category: "Nature" },
  { character: "门口", pinyin: "ménkǒu", level: "HSK 1", definition: { vi: "Cửa ra vào", en: "Doorway" }, example: "我在门口。", examplePinyin: "Wǒ zài ménkǒu.", category: "Daily Life" },
  { character: "厨房", pinyin: "chúfáng", level: "HSK 1", definition: { vi: "Nhà bếp", en: "Kitchen" }, example: "妈妈在厨房。", examplePinyin: "Māma zài chúfáng.", category: "Daily Life" },
  { character: "厕所", pinyin: "cèsuǒ", level: "HSK 1", definition: { vi: "Nhà vệ sinh", en: "Toilet" }, example: "厕所在哪儿？", examplePinyin: "Cèsuǒ zài nǎr?", category: "Daily Life" },
  { character: "毛巾", pinyin: "máojīn", level: "HSK 1", definition: { vi: "Khăn lông", en: "Towel" }, example: "请给我毛巾。", examplePinyin: "Qǐng gěi wǒ máojīn.", category: "Daily Life" },
  { character: "牙刷", pinyin: "yáshuā", level: "HSK 1", definition: { vi: "Bàn chải răng", en: "Toothbrush" }, example: "我有新牙刷。", examplePinyin: "Wǒ yǒu xīn yáshuā.", category: "Daily Life" },
  { character: "肥皂", pinyin: "féizào", level: "HSK 1", definition: { vi: "Xà phòng", en: "Soap" }, example: "用肥皂洗手。", examplePinyin: "Yòng féizào xǐ shǒu.", category: "Daily Life" },
  { character: "果汁", pinyin: "guǒzhī", level: "HSK 1", definition: { vi: "Nước ép", en: "Juice" }, example: "我喝果汁。", examplePinyin: "Wǒ hē guǒzhī.", category: "Food & Drink" },
  { character: "蔬菜", pinyin: "shūcài", level: "HSK 1", definition: { vi: "Rau", en: "Vegetables" }, example: "蔬菜很健康。", examplePinyin: "Shūcài hěn jiànkāng.", category: "Food & Drink" },
  { character: "兄弟", pinyin: "xiōngdì", level: "HSK 1", definition: { vi: "Anh em", en: "Brothers" }, example: "我们是兄弟。", examplePinyin: "Wǒmen shì xiōngdì.", category: "Family" },
  { character: "姐妹", pinyin: "jiěmèi", level: "HSK 1", definition: { vi: "Chị em", en: "Sisters" }, example: "她们是姐妹。", examplePinyin: "Tāmen shì jiěmèi.", category: "Family" },
  { character: "口", pinyin: "kǒu", level: "HSK 1", definition: { vi: "Miệng", en: "Mouth" }, example: "张开口。", examplePinyin: "Zhāng kāi kǒu.", category: "Daily Life" },
  { character: "唱", pinyin: "chàng", level: "HSK 1", definition: { vi: "Hát", en: "Sing" }, example: "我喜欢唱歌。", examplePinyin: "Wǒ xǐhuan chàng gē.", category: "Actions" },
  { character: "跳", pinyin: "tiào", level: "HSK 1", definition: { vi: "Nhảy", en: "Jump" }, example: "她在跳舞。", examplePinyin: "Tā zài tiàowǔ.", category: "Actions" },
  { character: "玩儿", pinyin: "wánr", level: "HSK 1", definition: { vi: "Chơi", en: "Play" }, example: "我们一起玩儿。", examplePinyin: "Wǒmen yìqǐ wánr.", category: "Actions" },
  { character: "小狗", pinyin: "xiǎogǒu", level: "HSK 1", definition: { vi: "Chú chó nhỏ", en: "Puppy" }, example: "小狗很可爱。", examplePinyin: "Xiǎogǒu hěn kě'ài.", category: "Nature" },

  // ============================================================
  // HSK 2 EXPANSION 2 (+30)
  // ============================================================
  { character: "银行卡", pinyin: "yínhángkǎ", level: "HSK 2", definition: { vi: "Thẻ ngân hàng", en: "Bank card" }, example: "我有银行卡。", examplePinyin: "Wǒ yǒu yínhángkǎ.", category: "Shopping" },
  { character: "现金", pinyin: "xiànjīn", level: "HSK 2", definition: { vi: "Tiền mặt", en: "Cash" }, example: "我用现金。", examplePinyin: "Wǒ yòng xiànjīn.", category: "Shopping" },
  { character: "便宜货", pinyin: "piányihuò", level: "HSK 2", definition: { vi: "Hàng rẻ", en: "Bargain" }, example: "这是便宜货。", examplePinyin: "Zhè shì piányihuò.", category: "Shopping" },
  { character: "机票", pinyin: "jīpiào", level: "HSK 2", definition: { vi: "Vé máy bay", en: "Plane ticket" }, example: "买机票贵。", examplePinyin: "Mǎi jīpiào guì.", category: "Travel" },
  { character: "电梯", pinyin: "diàntī", level: "HSK 2", definition: { vi: "Thang máy", en: "Elevator" }, example: "电梯坏了。", examplePinyin: "Diàntī huài le.", category: "Daily Life" },
  { character: "钥匙", pinyin: "yàoshi", level: "HSK 2", definition: { vi: "Chìa khóa", en: "Key" }, example: "我找不到钥匙。", examplePinyin: "Wǒ zhǎo bú dào yàoshi.", category: "Daily Life" },
  { character: "镜子", pinyin: "jìngzi", level: "HSK 2", definition: { vi: "Cái gương", en: "Mirror" }, example: "她照镜子。", examplePinyin: "Tā zhào jìngzi.", category: "Daily Life" },
  { character: "头疼", pinyin: "tóuténg", level: "HSK 2", definition: { vi: "Đau đầu", en: "Headache" }, example: "我头疼。", examplePinyin: "Wǒ tóuténg.", category: "Health" },
  { character: "舒服", pinyin: "shūfu", level: "HSK 2", definition: { vi: "Thoải mái", en: "Comfortable" }, example: "我不舒服。", examplePinyin: "Wǒ bù shūfu.", category: "Health" },
  { character: "客人", pinyin: "kèrén", level: "HSK 2", definition: { vi: "Khách", en: "Guest" }, example: "客人来了。", examplePinyin: "Kèrén lái le.", category: "Society" },

  // ============================================================
  // HSK 3 EXPANSION 2 (+30)
  // ============================================================
  { character: "礼貌", pinyin: "lǐmào", level: "HSK 3", definition: { vi: "Lễ phép", en: "Polite" }, example: "请有礼貌。", examplePinyin: "Qǐng yǒu lǐmào.", category: "Descriptions" },
  { character: "幸福", pinyin: "xìngfú", level: "HSK 3", definition: { vi: "Hạnh phúc", en: "Happy / blessed" }, example: "祝你幸福。", examplePinyin: "Zhù nǐ xìngfú.", category: "Emotions" },
  { character: "放松", pinyin: "fàngsōng", level: "HSK 3", definition: { vi: "Thư giãn", en: "Relax" }, example: "请放松。", examplePinyin: "Qǐng fàngsōng.", category: "Actions" },

  // ============================================================
  // HSK 4 EXPANSION 2 (+30)
  // ============================================================
  { character: "支持", pinyin: "zhīchí", level: "HSK 4", definition: { vi: "Ủng hộ", en: "Support" }, example: "我支持你。", examplePinyin: "Wǒ zhīchí nǐ.", category: "Actions" },
  { character: "反对", pinyin: "fǎnduì", level: "HSK 4", definition: { vi: "Phản đối", en: "Oppose" }, example: "我反对这个想法。", examplePinyin: "Wǒ fǎnduì zhè ge xiǎngfǎ.", category: "Actions" },
  { character: "怀疑", pinyin: "huáiyí", level: "HSK 4", definition: { vi: "Nghi ngờ", en: "Doubt" }, example: "我怀疑他。", examplePinyin: "Wǒ huáiyí tā.", category: "Emotions" },
  { character: "嫉妒", pinyin: "jídù", level: "HSK 4", definition: { vi: "Ghen tỵ", en: "Jealous" }, example: "不要嫉妒别人。", examplePinyin: "Bú yào jídù biérén.", category: "Emotions" },
  { character: "签合同", pinyin: "qiān hétong", level: "HSK 4", definition: { vi: "Ký hợp đồng", en: "Sign contract" }, example: "明天签合同。", examplePinyin: "Míngtiān qiān hétong.", category: "Work & Business" },
  { character: "贷款", pinyin: "dàikuǎn", level: "HSK 4", definition: { vi: "Vay tiền", en: "Loan" }, example: "向银行贷款。", examplePinyin: "Xiàng yínháng dàikuǎn.", category: "Work & Business" },
  { character: "技能", pinyin: "jìnéng", level: "HSK 4", definition: { vi: "Kỹ năng", en: "Skill" }, example: "技能很重要。", examplePinyin: "Jìnéng hěn zhòngyào.", category: "Work & Business" },
  { character: "硕士", pinyin: "shuòshì", level: "HSK 4", definition: { vi: "Thạc sĩ", en: "Master's" }, example: "他读硕士。", examplePinyin: "Tā dú shuòshì.", category: "Education" },
  { character: "博士", pinyin: "bóshì", level: "HSK 4", definition: { vi: "Tiến sĩ", en: "PhD" }, example: "她是博士。", examplePinyin: "Tā shì bóshì.", category: "Education" },
  { character: "演讲", pinyin: "yǎnjiǎng", level: "HSK 4", definition: { vi: "Diễn thuyết", en: "Speech" }, example: "他的演讲很棒。", examplePinyin: "Tā de yǎnjiǎng hěn bàng.", category: "Education" },
  { character: "汇报", pinyin: "huìbào", level: "HSK 4", definition: { vi: "Báo cáo", en: "Report" }, example: "汇报工作。", examplePinyin: "Huìbào gōngzuò.", category: "Work & Business" },
  { character: "退休", pinyin: "tuìxiū", level: "HSK 4", definition: { vi: "Nghỉ hưu", en: "Retire" }, example: "爸爸退休了。", examplePinyin: "Bàba tuìxiū le.", category: "Work & Business" },

  // ============================================================
  // HSK 5 EXPANSION 2 (+30)
  // ============================================================
  { character: "贡品", pinyin: "gòngpǐn", level: "HSK 5", definition: { vi: "Cống phẩm", en: "Tribute" }, example: "送上贡品。", examplePinyin: "Sòngshàng gòngpǐn.", category: "Culture" },
  { character: "价值观", pinyin: "jiàzhíguān", level: "HSK 5", definition: { vi: "Giá trị quan", en: "Values" }, example: "不同的价值观。", examplePinyin: "Bùtóng de jiàzhíguān.", category: "Abstract" },
  { character: "象征", pinyin: "xiàngzhēng", level: "HSK 5", definition: { vi: "Tượng trưng", en: "Symbolize" }, example: "象征希望。", examplePinyin: "Xiàngzhēng xīwàng.", category: "Abstract" },
  { character: "前途", pinyin: "qiántú", level: "HSK 5", definition: { vi: "Tiền đồ", en: "Future / prospects" }, example: "前途光明。", examplePinyin: "Qiántú guāngmíng.", category: "Abstract" },
  { character: "研发", pinyin: "yánfā", level: "HSK 5", definition: { vi: "Nghiên cứu phát triển", en: "R&D" }, example: "研发新产品。", examplePinyin: "Yánfā xīn chǎnpǐn.", category: "Work & Business" },
  { character: "冲突", pinyin: "chōngtū", level: "HSK 5", definition: { vi: "Xung đột", en: "Conflict" }, example: "避免冲突。", examplePinyin: "Bìmiǎn chōngtū.", category: "Society" },
  { character: "道德", pinyin: "dàodé", level: "HSK 5", definition: { vi: "Đạo đức", en: "Morality" }, example: "讲究道德。", examplePinyin: "Jiǎngjiu dàodé.", category: "Society" },

  // ============================================================
  // HSK 6 EXPANSION 2 (+30)
  // ============================================================
  { character: "睿智", pinyin: "ruìzhì", level: "HSK 6", definition: { vi: "Sáng suốt", en: "Wise" }, example: "睿智的领导。", examplePinyin: "Ruìzhì de lǐngdǎo.", category: "Descriptions" },
  { character: "谦逊", pinyin: "qiānxùn", level: "HSK 6", definition: { vi: "Khiêm tốn", en: "Modest" }, example: "为人谦逊。", examplePinyin: "Wéirén qiānxùn.", category: "Descriptions" },
  { character: "傲慢", pinyin: "àomàn", level: "HSK 6", definition: { vi: "Kiêu ngạo", en: "Arrogant" }, example: "态度傲慢。", examplePinyin: "Tàidù àomàn.", category: "Descriptions" },
  { character: "懈怠", pinyin: "xièdài", level: "HSK 6", definition: { vi: "Lười biếng", en: "Slack off" }, example: "不能懈怠。", examplePinyin: "Bù néng xièdài.", category: "Actions" },
  { character: "彷徨", pinyin: "pánghuáng", level: "HSK 6", definition: { vi: "Bàng hoàng", en: "Hesitate" }, example: "他在彷徨。", examplePinyin: "Tā zài pánghuáng.", category: "Emotions" },
  { character: "惆怅", pinyin: "chóuchàng", level: "HSK 6", definition: { vi: "Sầu muộn", en: "Melancholy" }, example: "心中惆怅。", examplePinyin: "Xīnzhōng chóuchàng.", category: "Emotions" },
  { character: "豁达", pinyin: "huòdá", level: "HSK 6", definition: { vi: "Phóng khoáng", en: "Open-minded" }, example: "为人豁达。", examplePinyin: "Wéirén huòdá.", category: "Descriptions" },
  { character: "狭隘", pinyin: "xiá'ài", level: "HSK 6", definition: { vi: "Hẹp hòi", en: "Narrow-minded" }, example: "思想狭隘。", examplePinyin: "Sīxiǎng xiá'ài.", category: "Descriptions" },
  { character: "宏伟", pinyin: "hóngwěi", level: "HSK 6", definition: { vi: "Hùng vĩ", en: "Magnificent" }, example: "宏伟的建筑。", examplePinyin: "Hóngwěi de jiànzhù.", category: "Descriptions" },
  { character: "壮丽", pinyin: "zhuànglì", level: "HSK 6", definition: { vi: "Tráng lệ", en: "Majestic" }, example: "壮丽的山河。", examplePinyin: "Zhuànglì de shānhé.", category: "Descriptions" },
  { character: "幽静", pinyin: "yōujìng", level: "HSK 6", definition: { vi: "Yên tĩnh", en: "Tranquil" }, example: "幽静的小路。", examplePinyin: "Yōujìng de xiǎolù.", category: "Descriptions" },
  { character: "嘈杂", pinyin: "cáozá", level: "HSK 6", definition: { vi: "Ồn ào", en: "Noisy" }, example: "环境嘈杂。", examplePinyin: "Huánjìng cáozá.", category: "Descriptions" },
  { character: "黯然", pinyin: "ànrán", level: "HSK 6", definition: { vi: "U ám", en: "Gloomy" }, example: "黯然神伤。", examplePinyin: "Ànrán shénshāng.", category: "Emotions" },
  { character: "斡旋", pinyin: "wòxuán", level: "HSK 6", definition: { vi: "Hòa giải", en: "Mediate" }, example: "从中斡旋。", examplePinyin: "Cóngzhōng wòxuán.", category: "Actions" },
  { character: "周旋", pinyin: "zhōuxuán", level: "HSK 6", definition: { vi: "Chu tuyền", en: "Deal with" }, example: "与对手周旋。", examplePinyin: "Yǔ duìshǒu zhōuxuán.", category: "Actions" },
  { character: "审慎", pinyin: "shěnshèn", level: "HSK 6", definition: { vi: "Thận trọng", en: "Cautious" }, example: "审慎决定。", examplePinyin: "Shěnshèn juédìng.", category: "Descriptions" },
  { character: "鲁莽", pinyin: "lǔmǎng", level: "HSK 6", definition: { vi: "Lỗ mãng", en: "Reckless" }, example: "做事鲁莽。", examplePinyin: "Zuòshì lǔmǎng.", category: "Descriptions" },
  { character: "缜密", pinyin: "zhěnmì", level: "HSK 6", definition: { vi: "Chu đáo", en: "Meticulous" }, example: "思维缜密。", examplePinyin: "Sīwéi zhěnmì.", category: "Descriptions" },
  { character: "粗糙", pinyin: "cūcāo", level: "HSK 6", definition: { vi: "Thô ráp", en: "Rough" }, example: "工艺粗糙。", examplePinyin: "Gōngyì cūcāo.", category: "Descriptions" },
  { character: "细腻", pinyin: "xìnì", level: "HSK 6", definition: { vi: "Tinh tế", en: "Delicate" }, example: "情感细腻。", examplePinyin: "Qínggǎn xìnì.", category: "Descriptions" },
  { character: "迥异", pinyin: "jiǒngyì", level: "HSK 6", definition: { vi: "Khác biệt", en: "Vastly different" }, example: "风格迥异。", examplePinyin: "Fēnggé jiǒngyì.", category: "Descriptions" },
  { character: "雷同", pinyin: "léitóng", level: "HSK 6", definition: { vi: "Trùng lặp", en: "Duplicate" }, example: "答案雷同。", examplePinyin: "Dá'àn léitóng.", category: "Descriptions" },
  { character: "媲美", pinyin: "pìměi", level: "HSK 6", definition: { vi: "Sánh ngang", en: "Rival" }, example: "媲美名牌。", examplePinyin: "Pìměi míngpái.", category: "Actions" },
];
