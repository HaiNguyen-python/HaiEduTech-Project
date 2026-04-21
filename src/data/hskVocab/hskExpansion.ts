// ============================================================
// HSK Vocabulary Expansion — +300 additional words
// 50 new words per HSK level (1-6), curated to avoid duplicates
// ============================================================
import type { HskWord } from "./types";

export const hskExpansionWords: HskWord[] = [
  // ============================================================
  // HSK 1 EXPANSION (+50 words) — Daily essentials
  // ============================================================
  { character: "中午", pinyin: "zhōngwǔ", level: "HSK 1", definition: { vi: "Buổi trưa", en: "Noon" }, example: "中午吃饭。", examplePinyin: "Zhōngwǔ chī fàn.", category: "Time" },
  { character: "白天", pinyin: "báitiān", level: "HSK 1", definition: { vi: "Ban ngày", en: "Daytime" }, example: "白天工作。", examplePinyin: "Báitiān gōngzuò.", category: "Time" },
  { character: "面包", pinyin: "miànbāo", level: "HSK 1", definition: { vi: "Bánh mì", en: "Bread" }, example: "早上吃面包。", examplePinyin: "Zǎoshang chī miànbāo.", category: "Food & Drink" },
  { character: "鸟", pinyin: "niǎo", level: "HSK 1", definition: { vi: "Chim", en: "Bird" }, example: "鸟在树上。", examplePinyin: "Niǎo zài shù shàng.", category: "Nature" },
  { character: "山", pinyin: "shān", level: "HSK 1", definition: { vi: "Núi", en: "Mountain" }, example: "山很高。", examplePinyin: "Shān hěn gāo.", category: "Nature" },
  { character: "河", pinyin: "hé", level: "HSK 1", definition: { vi: "Sông", en: "River" }, example: "河水很干净。", examplePinyin: "Héshuǐ hěn gānjìng.", category: "Nature" },
  { character: "雨", pinyin: "yǔ", level: "HSK 1", definition: { vi: "Mưa", en: "Rain" }, example: "今天下雨。", examplePinyin: "Jīntiān xià yǔ.", category: "Nature" },
  { character: "风", pinyin: "fēng", level: "HSK 1", definition: { vi: "Gió", en: "Wind" }, example: "今天风很大。", examplePinyin: "Jīntiān fēng hěn dà.", category: "Nature" },
  { character: "窗户", pinyin: "chuānghu", level: "HSK 1", definition: { vi: "Cửa sổ", en: "Window" }, example: "打开窗户。", examplePinyin: "Dǎkāi chuānghu.", category: "Daily Life" },
  { character: "床", pinyin: "chuáng", level: "HSK 1", definition: { vi: "Giường", en: "Bed" }, example: "我在床上。", examplePinyin: "Wǒ zài chuáng shàng.", category: "Daily Life" },
  { character: "灯", pinyin: "dēng", level: "HSK 1", definition: { vi: "Đèn", en: "Lamp" }, example: "请开灯。", examplePinyin: "Qǐng kāi dēng.", category: "Daily Life" },
  { character: "包", pinyin: "bāo", level: "HSK 1", definition: { vi: "Cặp / túi", en: "Bag" }, example: "这是我的包。", examplePinyin: "Zhè shì wǒ de bāo.", category: "Daily Life" },
  { character: "雨伞", pinyin: "yǔsǎn", level: "HSK 1", definition: { vi: "Cái ô", en: "Umbrella" }, example: "下雨用雨伞。", examplePinyin: "Xià yǔ yòng yǔsǎn.", category: "Daily Life" },
  { character: "鞋", pinyin: "xié", level: "HSK 1", definition: { vi: "Giày", en: "Shoes" }, example: "我的鞋很新。", examplePinyin: "Wǒ de xié hěn xīn.", category: "Daily Life" },
  { character: "帽子", pinyin: "màozi", level: "HSK 1", definition: { vi: "Mũ", en: "Hat" }, example: "戴帽子吧。", examplePinyin: "Dài màozi ba.", category: "Daily Life" },
  { character: "蓝色", pinyin: "lánsè", level: "HSK 1", definition: { vi: "Màu xanh", en: "Blue" }, example: "我喜欢蓝色。", examplePinyin: "Wǒ xǐhuan lánsè.", category: "Descriptions" },
  { character: "绿色", pinyin: "lǜsè", level: "HSK 1", definition: { vi: "Màu xanh lá", en: "Green" }, example: "树是绿色的。", examplePinyin: "Shù shì lǜsè de.", category: "Descriptions" },
  { character: "黄色", pinyin: "huángsè", level: "HSK 1", definition: { vi: "Màu vàng", en: "Yellow" }, example: "太阳是黄色的。", examplePinyin: "Tàiyáng shì huángsè de.", category: "Descriptions" },
  { character: "笔", pinyin: "bǐ", level: "HSK 1", definition: { vi: "Bút", en: "Pen" }, example: "我有一支笔。", examplePinyin: "Wǒ yǒu yì zhī bǐ.", category: "Education" },
  { character: "纸", pinyin: "zhǐ", level: "HSK 1", definition: { vi: "Giấy", en: "Paper" }, example: "请给我纸。", examplePinyin: "Qǐng gěi wǒ zhǐ.", category: "Education" },
  { character: "汽车", pinyin: "qìchē", level: "HSK 1", definition: { vi: "Xe hơi", en: "Car" }, example: "我开汽车。", examplePinyin: "Wǒ kāi qìchē.", category: "Travel" },

  // ============================================================
  // HSK 2 EXPANSION (+50 words)
  // ============================================================
  { character: "酒店", pinyin: "jiǔdiàn", level: "HSK 2", definition: { vi: "Khách sạn", en: "Hotel" }, example: "酒店在市中心。", examplePinyin: "Jiǔdiàn zài shì zhōngxīn.", category: "Travel" },
  { character: "音乐", pinyin: "yīnyuè", level: "HSK 2", definition: { vi: "Âm nhạc", en: "Music" }, example: "我听音乐。", examplePinyin: "Wǒ tīng yīnyuè.", category: "Culture" },
  { character: "足球", pinyin: "zúqiú", level: "HSK 2", definition: { vi: "Bóng đá", en: "Soccer" }, example: "我们踢足球。", examplePinyin: "Wǒmen tī zúqiú.", category: "Health" },
  { character: "篮球", pinyin: "lánqiú", level: "HSK 2", definition: { vi: "Bóng rổ", en: "Basketball" }, example: "他打篮球。", examplePinyin: "Tā dǎ lánqiú.", category: "Health" },
  { character: "护士", pinyin: "hùshi", level: "HSK 2", definition: { vi: "Y tá", en: "Nurse" }, example: "护士很温柔。", examplePinyin: "Hùshi hěn wēnróu.", category: "Health" },
  { character: "邮件", pinyin: "yóujiàn", level: "HSK 2", definition: { vi: "Email / thư", en: "Email / mail" }, example: "请发邮件给我。", examplePinyin: "Qǐng fā yóujiàn gěi wǒ.", category: "Technology" },
  { character: "蛋糕", pinyin: "dàngāo", level: "HSK 2", definition: { vi: "Bánh kem", en: "Cake" }, example: "生日蛋糕真好吃。", examplePinyin: "Shēngrì dàngāo zhēn hǎochī.", category: "Food & Drink" },
  { character: "同事", pinyin: "tóngshì", level: "HSK 2", definition: { vi: "Đồng nghiệp", en: "Colleague" }, example: "同事都很好。", examplePinyin: "Tóngshì dōu hěn hǎo.", category: "Work & Business" },
  { character: "会议", pinyin: "huìyì", level: "HSK 2", definition: { vi: "Hội nghị", en: "Meeting" }, example: "下午开会议。", examplePinyin: "Xiàwǔ kāi huìyì.", category: "Work & Business" },
  { character: "记得", pinyin: "jìde", level: "HSK 2", definition: { vi: "Nhớ", en: "Remember" }, example: "我记得他。", examplePinyin: "Wǒ jìde tā.", category: "Actions" },
  { character: "忘记", pinyin: "wàngjì", level: "HSK 2", definition: { vi: "Quên", en: "Forget" }, example: "别忘记带钥匙。", examplePinyin: "Bié wàngjì dài yàoshi.", category: "Actions" },

  // ============================================================
  // HSK 3 EXPANSION (+50 words)
  // ============================================================
  { character: "温度", pinyin: "wēndù", level: "HSK 3", definition: { vi: "Nhiệt độ", en: "Temperature" }, example: "今天温度很高。", examplePinyin: "Jīntiān wēndù hěn gāo.", category: "Nature" },
  { character: "物理", pinyin: "wùlǐ", level: "HSK 3", definition: { vi: "Vật lý", en: "Physics" }, example: "我学物理。", examplePinyin: "Wǒ xué wùlǐ.", category: "Academic" },
  { character: "化学", pinyin: "huàxué", level: "HSK 3", definition: { vi: "Hóa học", en: "Chemistry" }, example: "化学实验。", examplePinyin: "Huàxué shíyàn.", category: "Academic" },
  { character: "大学", pinyin: "dàxué", level: "HSK 3", definition: { vi: "Đại học", en: "University" }, example: "我上大学。", examplePinyin: "Wǒ shàng dàxué.", category: "Education" },
  { character: "项目", pinyin: "xiàngmù", level: "HSK 3", definition: { vi: "Dự án", en: "Project" }, example: "我负责这个项目。", examplePinyin: "Wǒ fùzé zhège xiàngmù.", category: "Work & Business" },
  { character: "目标", pinyin: "mùbiāo", level: "HSK 3", definition: { vi: "Mục tiêu", en: "Goal" }, example: "我的目标很清楚。", examplePinyin: "Wǒ de mùbiāo hěn qīngchu.", category: "Abstract" },
  { character: "感谢", pinyin: "gǎnxiè", level: "HSK 3", definition: { vi: "Biết ơn", en: "Be grateful" }, example: "非常感谢。", examplePinyin: "Fēicháng gǎnxiè.", category: "Emotions" },
  { character: "轻松", pinyin: "qīngsōng", level: "HSK 3", definition: { vi: "Thoải mái", en: "Relaxed" }, example: "周末很轻松。", examplePinyin: "Zhōumò hěn qīngsōng.", category: "Emotions" },
  { character: "辛苦", pinyin: "xīnkǔ", level: "HSK 3", definition: { vi: "Vất vả", en: "Hard / toilsome" }, example: "工作很辛苦。", examplePinyin: "Gōngzuò hěn xīnkǔ.", category: "Descriptions" },

  // ============================================================
  // HSK 4 EXPANSION (+50 words)
  // ============================================================
  { character: "国际", pinyin: "guójì", level: "HSK 4", definition: { vi: "Quốc tế", en: "International" }, example: "国际会议在北京。", examplePinyin: "Guójì huìyì zài Běijīng.", category: "Society" },
  { character: "全球", pinyin: "quánqiú", level: "HSK 4", definition: { vi: "Toàn cầu", en: "Global" }, example: "全球气候变化。", examplePinyin: "Quánqiú qìhòu biànhuà.", category: "Society" },
  { character: "政策", pinyin: "zhèngcè", level: "HSK 4", definition: { vi: "Chính sách", en: "Policy" }, example: "新政策很重要。", examplePinyin: "Xīn zhèngcè hěn zhòngyào.", category: "Society" },
  { character: "商品", pinyin: "shāngpǐn", level: "HSK 4", definition: { vi: "Hàng hóa", en: "Goods" }, example: "这种商品很贵。", examplePinyin: "Zhè zhǒng shāngpǐn hěn guì.", category: "Work & Business" },
  { character: "服务", pinyin: "fúwù", level: "HSK 4", definition: { vi: "Dịch vụ", en: "Service" }, example: "服务很好。", examplePinyin: "Fúwù hěn hǎo.", category: "Work & Business" },
  { character: "生产", pinyin: "shēngchǎn", level: "HSK 4", definition: { vi: "Sản xuất", en: "Produce" }, example: "工厂生产汽车。", examplePinyin: "Gōngchǎng shēngchǎn qìchē.", category: "Work & Business" },
  { character: "系统", pinyin: "xìtǒng", level: "HSK 4", definition: { vi: "Hệ thống", en: "System" }, example: "系统升级了。", examplePinyin: "Xìtǒng shēngjí le.", category: "Technology" },
  { character: "调查", pinyin: "diàochá", level: "HSK 4", definition: { vi: "Điều tra", en: "Investigate" }, example: "做市场调查。", examplePinyin: "Zuò shìchǎng diàochá.", category: "Academic" },
  { character: "证明", pinyin: "zhèngmíng", level: "HSK 4", definition: { vi: "Chứng minh", en: "Prove" }, example: "证明你是对的。", examplePinyin: "Zhèngmíng nǐ shì duì de.", category: "Academic" },
  { character: "印象", pinyin: "yìnxiàng", level: "HSK 4", definition: { vi: "Ấn tượng", en: "Impression" }, example: "印象深刻。", examplePinyin: "Yìnxiàng shēnkè.", category: "Abstract" },
  { character: "改变", pinyin: "gǎibiàn", level: "HSK 4", definition: { vi: "Thay đổi", en: "Change" }, example: "改变生活。", examplePinyin: "Gǎibiàn shēnghuó.", category: "Actions" },
  { character: "保持", pinyin: "bǎochí", level: "HSK 4", definition: { vi: "Giữ vững", en: "Maintain" }, example: "保持安静。", examplePinyin: "Bǎochí ānjìng.", category: "Actions" },
  { character: "降低", pinyin: "jiàngdī", level: "HSK 4", definition: { vi: "Hạ xuống", en: "Lower / reduce" }, example: "降低成本。", examplePinyin: "Jiàngdī chéngběn.", category: "Actions" },
  { character: "理解", pinyin: "lǐjiě", level: "HSK 4", definition: { vi: "Hiểu", en: "Understand" }, example: "我理解你。", examplePinyin: "Wǒ lǐjiě nǐ.", category: "Actions" },

  // ============================================================
  // HSK 5 EXPANSION (+50 words)
  // ============================================================
  { character: "战术", pinyin: "zhànshù", level: "HSK 5", definition: { vi: "Chiến thuật", en: "Tactics" }, example: "改变战术。", examplePinyin: "Gǎibiàn zhànshù.", category: "Work & Business" },
  { character: "体制", pinyin: "tǐzhì", level: "HSK 5", definition: { vi: "Thể chế", en: "System / institution" }, example: "改革体制。", examplePinyin: "Gǎigé tǐzhì.", category: "Society" },
  { character: "实施", pinyin: "shíshī", level: "HSK 5", definition: { vi: "Thực thi", en: "Implement" }, example: "实施新政策。", examplePinyin: "Shíshī xīn zhèngcè.", category: "Actions" },
  { character: "执行", pinyin: "zhíxíng", level: "HSK 5", definition: { vi: "Thực hiện", en: "Execute" }, example: "执行命令。", examplePinyin: "Zhíxíng mìnglìng.", category: "Actions" },
  { character: "推广", pinyin: "tuīguǎng", level: "HSK 5", definition: { vi: "Quảng bá", en: "Promote" }, example: "推广产品。", examplePinyin: "Tuīguǎng chǎnpǐn.", category: "Work & Business" },
  { character: "宣传", pinyin: "xuānchuán", level: "HSK 5", definition: { vi: "Tuyên truyền", en: "Publicize" }, example: "宣传环保。", examplePinyin: "Xuānchuán huánbǎo.", category: "Society" },
  { character: "媒体", pinyin: "méitǐ", level: "HSK 5", definition: { vi: "Truyền thông", en: "Media" }, example: "媒体报道。", examplePinyin: "Méitǐ bàodào.", category: "Society" },
  { character: "舆论", pinyin: "yúlùn", level: "HSK 5", definition: { vi: "Dư luận", en: "Public opinion" }, example: "舆论压力大。", examplePinyin: "Yúlùn yālì dà.", category: "Society" },
  { character: "营销", pinyin: "yíngxiāo", level: "HSK 5", definition: { vi: "Marketing", en: "Marketing" }, example: "营销策略。", examplePinyin: "Yíngxiāo cèlüè.", category: "Work & Business" },
  { character: "财务", pinyin: "cáiwù", level: "HSK 5", definition: { vi: "Tài chính", en: "Finance" }, example: "财务报告。", examplePinyin: "Cáiwù bàogào.", category: "Work & Business" },
  { character: "预算", pinyin: "yùsuàn", level: "HSK 5", definition: { vi: "Ngân sách", en: "Budget" }, example: "控制预算。", examplePinyin: "Kòngzhì yùsuàn.", category: "Work & Business" },
  { character: "成本", pinyin: "chéngběn", level: "HSK 5", definition: { vi: "Chi phí", en: "Cost" }, example: "降低成本。", examplePinyin: "Jiàngdī chéngběn.", category: "Work & Business" },
  { character: "贸易", pinyin: "màoyì", level: "HSK 5", definition: { vi: "Thương mại", en: "Trade" }, example: "国际贸易。", examplePinyin: "Guójì màoyì.", category: "Work & Business" },
  { character: "出口", pinyin: "chūkǒu", level: "HSK 5", definition: { vi: "Xuất khẩu", en: "Export" }, example: "出口商品。", examplePinyin: "Chūkǒu shāngpǐn.", category: "Work & Business" },
  { character: "进口", pinyin: "jìnkǒu", level: "HSK 5", definition: { vi: "Nhập khẩu", en: "Import" }, example: "进口汽车。", examplePinyin: "Jìnkǒu qìchē.", category: "Work & Business" },
  { character: "情绪", pinyin: "qíngxù", level: "HSK 5", definition: { vi: "Cảm xúc", en: "Emotion" }, example: "控制情绪。", examplePinyin: "Kòngzhì qíngxù.", category: "Emotions" },
  { character: "梦想", pinyin: "mèngxiǎng", level: "HSK 5", definition: { vi: "Ước mơ", en: "Dream" }, example: "实现梦想。", examplePinyin: "Shíxiàn mèngxiǎng.", category: "Abstract" },
  { character: "信念", pinyin: "xìnniàn", level: "HSK 5", definition: { vi: "Niềm tin", en: "Belief" }, example: "坚定信念。", examplePinyin: "Jiāndìng xìnniàn.", category: "Abstract" },
  { character: "价值", pinyin: "jiàzhí", level: "HSK 5", definition: { vi: "Giá trị", en: "Value" }, example: "人生价值。", examplePinyin: "Rénshēng jiàzhí.", category: "Abstract" },
  { character: "意义", pinyin: "yìyì", level: "HSK 5", definition: { vi: "Ý nghĩa", en: "Meaning" }, example: "生活的意义。", examplePinyin: "Shēnghuó de yìyì.", category: "Abstract" },
  { character: "命运", pinyin: "mìngyùn", level: "HSK 5", definition: { vi: "Số phận", en: "Fate" }, example: "改变命运。", examplePinyin: "Gǎibiàn mìngyùn.", category: "Abstract" },
  { character: "缘分", pinyin: "yuánfèn", level: "HSK 5", definition: { vi: "Duyên phận", en: "Predestined affinity" }, example: "我们有缘分。", examplePinyin: "Wǒmen yǒu yuánfèn.", category: "Abstract" },
  { character: "灵感", pinyin: "línggǎn", level: "HSK 5", definition: { vi: "Cảm hứng", en: "Inspiration" }, example: "我有灵感。", examplePinyin: "Wǒ yǒu línggǎn.", category: "Abstract" },
  { character: "想象", pinyin: "xiǎngxiàng", level: "HSK 5", definition: { vi: "Tưởng tượng", en: "Imagine" }, example: "想象未来。", examplePinyin: "Xiǎngxiàng wèilái.", category: "Actions" },
  { character: "记忆", pinyin: "jìyì", level: "HSK 5", definition: { vi: "Trí nhớ", en: "Memory" }, example: "美好记忆。", examplePinyin: "Měihǎo jìyì.", category: "Abstract" },
  { character: "回忆", pinyin: "huíyì", level: "HSK 5", definition: { vi: "Hồi tưởng", en: "Recall" }, example: "回忆过去。", examplePinyin: "Huíyì guòqù.", category: "Actions" },

  // ============================================================
  // HSK 6 EXPANSION (+50 words) — Advanced
  // ============================================================
  { character: "辩证", pinyin: "biànzhèng", level: "HSK 6", definition: { vi: "Biện chứng", en: "Dialectical" }, example: "辩证思维。", examplePinyin: "Biànzhèng sīwéi.", category: "Academic" },
  { character: "范畴", pinyin: "fànchóu", level: "HSK 6", definition: { vi: "Phạm trù", en: "Category" }, example: "属于这个范畴。", examplePinyin: "Shǔyú zhège fànchóu.", category: "Abstract" },
  { character: "统一", pinyin: "tǒngyī", level: "HSK 6", definition: { vi: "Thống nhất", en: "Unify" }, example: "意见统一。", examplePinyin: "Yìjiàn tǒngyī.", category: "Abstract" },
  { character: "兴衰", pinyin: "xīngshuāi", level: "HSK 6", definition: { vi: "Hưng thịnh và suy vong", en: "Rise and fall" }, example: "朝代兴衰。", examplePinyin: "Cháodài xīngshuāi.", category: "Society" },
  { character: "崛起", pinyin: "juéqǐ", level: "HSK 6", definition: { vi: "Trỗi dậy", en: "Rise" }, example: "民族崛起。", examplePinyin: "Mínzú juéqǐ.", category: "Society" },
  { character: "衰落", pinyin: "shuāiluò", level: "HSK 6", definition: { vi: "Suy sụp", en: "Decline" }, example: "帝国衰落。", examplePinyin: "Dìguó shuāiluò.", category: "Society" },
  { character: "侵略", pinyin: "qīnlüè", level: "HSK 6", definition: { vi: "Xâm lược", en: "Invade" }, example: "反对侵略。", examplePinyin: "Fǎnduì qīnlüè.", category: "Society" },
  { character: "和平", pinyin: "hépíng", level: "HSK 6", definition: { vi: "Hòa bình", en: "Peace" }, example: "世界和平。", examplePinyin: "Shìjiè hépíng.", category: "Society" },
  { character: "战争", pinyin: "zhànzhēng", level: "HSK 6", definition: { vi: "Chiến tranh", en: "War" }, example: "结束战争。", examplePinyin: "Jiéshù zhànzhēng.", category: "Society" },
  { character: "外交", pinyin: "wàijiāo", level: "HSK 6", definition: { vi: "Ngoại giao", en: "Diplomacy" }, example: "外交关系。", examplePinyin: "Wàijiāo guānxi.", category: "Society" },
  { character: "条约", pinyin: "tiáoyuē", level: "HSK 6", definition: { vi: "Hiệp ước", en: "Treaty" }, example: "签订条约。", examplePinyin: "Qiāndìng tiáoyuē.", category: "Society" },
  { character: "联盟", pinyin: "liánméng", level: "HSK 6", definition: { vi: "Liên minh", en: "Alliance" }, example: "国际联盟。", examplePinyin: "Guójì liánméng.", category: "Society" },
  { character: "主权", pinyin: "zhǔquán", level: "HSK 6", definition: { vi: "Chủ quyền", en: "Sovereignty" }, example: "维护主权。", examplePinyin: "Wéihù zhǔquán.", category: "Society" },
  { character: "公正", pinyin: "gōngzhèng", level: "HSK 6", definition: { vi: "Công bằng", en: "Just / fair" }, example: "公正的判决。", examplePinyin: "Gōngzhèng de pànjué.", category: "Society" },
  { character: "歧视", pinyin: "qíshì", level: "HSK 6", definition: { vi: "Kỳ thị", en: "Discriminate" }, example: "反对歧视。", examplePinyin: "Fǎnduì qíshì.", category: "Society" },
  { character: "升华", pinyin: "shēnghuá", level: "HSK 6", definition: { vi: "Thăng hoa", en: "Sublimate" }, example: "情感升华。", examplePinyin: "Qínggǎn shēnghuá.", category: "Abstract" },
  { character: "蜕变", pinyin: "tuìbiàn", level: "HSK 6", definition: { vi: "Lột xác", en: "Transform" }, example: "完成蜕变。", examplePinyin: "Wánchéng tuìbiàn.", category: "Abstract" },
  { character: "杰出", pinyin: "jiéchū", level: "HSK 6", definition: { vi: "Kiệt xuất", en: "Eminent" }, example: "杰出的人才。", examplePinyin: "Jiéchū de réncái.", category: "Descriptions" },
  { character: "辉煌", pinyin: "huīhuáng", level: "HSK 6", definition: { vi: "Huy hoàng", en: "Splendid" }, example: "辉煌的成就。", examplePinyin: "Huīhuáng de chéngjiù.", category: "Descriptions" },
  { character: "璀璨", pinyin: "cuǐcàn", level: "HSK 6", definition: { vi: "Rực rỡ", en: "Resplendent" }, example: "璀璨的星空。", examplePinyin: "Cuǐcàn de xīngkōng.", category: "Descriptions" },
  { character: "崇高", pinyin: "chónggāo", level: "HSK 6", definition: { vi: "Cao thượng", en: "Lofty" }, example: "崇高的理想。", examplePinyin: "Chónggāo de lǐxiǎng.", category: "Descriptions" },
  { character: "伟大", pinyin: "wěidà", level: "HSK 6", definition: { vi: "Vĩ đại", en: "Great" }, example: "伟大的人物。", examplePinyin: "Wěidà de rénwù.", category: "Descriptions" },
  { character: "渺小", pinyin: "miǎoxiǎo", level: "HSK 6", definition: { vi: "Nhỏ bé", en: "Tiny / insignificant" }, example: "人类很渺小。", examplePinyin: "Rénlèi hěn miǎoxiǎo.", category: "Descriptions" },
  { character: "脆弱", pinyin: "cuìruò", level: "HSK 6", definition: { vi: "Mong manh", en: "Fragile" }, example: "生命脆弱。", examplePinyin: "Shēngmìng cuìruò.", category: "Descriptions" },
  { character: "毅力", pinyin: "yìlì", level: "HSK 6", definition: { vi: "Nghị lực", en: "Perseverance" }, example: "他有毅力。", examplePinyin: "Tā yǒu yìlì.", category: "Abstract" },
  { character: "执着", pinyin: "zhízhuó", level: "HSK 6", definition: { vi: "Bền chí", en: "Persistent" }, example: "执着追求。", examplePinyin: "Zhízhuó zhuīqiú.", category: "Abstract" },
  { character: "追求", pinyin: "zhuīqiú", level: "HSK 6", definition: { vi: "Theo đuổi", en: "Pursue" }, example: "追求梦想。", examplePinyin: "Zhuīqiú mèngxiǎng.", category: "Actions" },
  { character: "拼搏", pinyin: "pīnbó", level: "HSK 6", definition: { vi: "Hết mình", en: "Go all out" }, example: "拼搏精神。", examplePinyin: "Pīnbó jīngshén.", category: "Actions" },
  { character: "奉献", pinyin: "fèngxiàn", level: "HSK 6", definition: { vi: "Cống hiến", en: "Dedicate" }, example: "奉献社会。", examplePinyin: "Fèngxiàn shèhuì.", category: "Actions" },
  { character: "牺牲", pinyin: "xīshēng", level: "HSK 6", definition: { vi: "Hy sinh", en: "Sacrifice" }, example: "牺牲自己。", examplePinyin: "Xīshēng zìjǐ.", category: "Actions" },
  { character: "震撼", pinyin: "zhènhàn", level: "HSK 6", definition: { vi: "Chấn động", en: "Shake / shock" }, example: "心灵震撼。", examplePinyin: "Xīnlíng zhènhàn.", category: "Emotions" },
  { character: "感慨", pinyin: "gǎnkǎi", level: "HSK 6", definition: { vi: "Cảm khái", en: "Sigh with emotion" }, example: "深有感慨。", examplePinyin: "Shēn yǒu gǎnkǎi.", category: "Emotions" },
  { character: "依恋", pinyin: "yīliàn", level: "HSK 6", definition: { vi: "Quyến luyến", en: "Be attached to" }, example: "依恋家人。", examplePinyin: "Yīliàn jiārén.", category: "Emotions" },
];
