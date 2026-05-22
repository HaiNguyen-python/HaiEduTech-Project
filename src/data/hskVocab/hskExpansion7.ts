// HSK Vocabulary Expansion 7 - Additional topical words across HSK 1-6
// Focus: modern life, technology, environment, business, abstract concepts
import type { HskWord } from "./types";

export const hskExpansion7Words: HskWord[] = [
  // HSK 1-2: Daily essentials
  { character: "手表", pinyin: "shǒubiǎo", level: "HSK 2", definition: { vi: "Đồng hồ đeo tay", en: "Wristwatch" }, example: "我的手表停了。", examplePinyin: "Wǒ de shǒubiǎo tíng le.", category: "Daily Life" },
  { character: "钥匙", pinyin: "yàoshi", level: "HSK 2", definition: { vi: "Chìa khóa", en: "Key" }, example: "我找不到钥匙。", examplePinyin: "Wǒ zhǎo bú dào yàoshi.", category: "Daily Life" },
  { character: "雨伞", pinyin: "yǔsǎn", level: "HSK 2", definition: { vi: "Ô (dù)", en: "Umbrella" }, example: "下雨了，带把雨伞。", examplePinyin: "Xià yǔ le, dài bǎ yǔsǎn.", category: "Daily Life" },
  { character: "镜子", pinyin: "jìngzi", level: "HSK 2", definition: { vi: "Gương", en: "Mirror" }, example: "她在照镜子。", examplePinyin: "Tā zài zhào jìngzi.", category: "Daily Life" },
  { character: "牙刷", pinyin: "yáshuā", level: "HSK 2", definition: { vi: "Bàn chải đánh răng", en: "Toothbrush" }, example: "我每天换牙刷。", examplePinyin: "Wǒ měitiān huàn yáshuā.", category: "Daily Life" },
  { character: "肥皂", pinyin: "féizào", level: "HSK 2", definition: { vi: "Xà phòng", en: "Soap" }, example: "请用肥皂洗手。", examplePinyin: "Qǐng yòng féizào xǐshǒu.", category: "Daily Life" },
  { character: "毛巾", pinyin: "máojīn", level: "HSK 2", definition: { vi: "Khăn lông", en: "Towel" }, example: "这条毛巾很软。", examplePinyin: "Zhè tiáo máojīn hěn ruǎn.", category: "Daily Life" },

  // HSK 3: Travel & places
  { character: "机场", pinyin: "jīchǎng", level: "HSK 3", definition: { vi: "Sân bay", en: "Airport" }, example: "我去机场接朋友。", examplePinyin: "Wǒ qù jīchǎng jiē péngyǒu.", category: "Travel" },
  { character: "火车站", pinyin: "huǒchēzhàn", level: "HSK 3", definition: { vi: "Ga tàu hỏa", en: "Train station" }, example: "火车站离这里很近。", examplePinyin: "Huǒchēzhàn lí zhèlǐ hěn jìn.", category: "Travel" },
  { character: "护照", pinyin: "hùzhào", level: "HSK 3", definition: { vi: "Hộ chiếu", en: "Passport" }, example: "出国要带护照。", examplePinyin: "Chū guó yào dài hùzhào.", category: "Travel" },
  { character: "签证", pinyin: "qiānzhèng", level: "HSK 4", definition: { vi: "Visa, thị thực", en: "Visa" }, example: "申请签证要多久？", examplePinyin: "Shēnqǐng qiānzhèng yào duōjiǔ?", category: "Travel" },
  { character: "行李", pinyin: "xínglǐ", level: "HSK 3", definition: { vi: "Hành lý", en: "Luggage" }, example: "我的行李太重了。", examplePinyin: "Wǒ de xínglǐ tài zhòng le.", category: "Travel" },
  { character: "导游", pinyin: "dǎoyóu", level: "HSK 4", definition: { vi: "Hướng dẫn viên du lịch", en: "Tour guide" }, example: "导游介绍得很详细。", examplePinyin: "Dǎoyóu jièshào de hěn xiángxì.", category: "Travel" },

  // HSK 3-4: Technology
  { character: "手机", pinyin: "shǒujī", level: "HSK 2", definition: { vi: "Điện thoại di động", en: "Mobile phone" }, example: "我的手机没电了。", examplePinyin: "Wǒ de shǒujī méi diàn le.", category: "Technology" },
  { character: "充电", pinyin: "chōngdiàn", level: "HSK 3", definition: { vi: "Sạc pin", en: "Charge (battery)" }, example: "手机需要充电。", examplePinyin: "Shǒujī xūyào chōngdiàn.", category: "Technology" },
  { character: "网络", pinyin: "wǎngluò", level: "HSK 4", definition: { vi: "Mạng (internet)", en: "Network/Internet" }, example: "这里的网络很快。", examplePinyin: "Zhèlǐ de wǎngluò hěn kuài.", category: "Technology" },
  { character: "密码", pinyin: "mìmǎ", level: "HSK 4", definition: { vi: "Mật khẩu", en: "Password" }, example: "请输入你的密码。", examplePinyin: "Qǐng shūrù nǐ de mìmǎ.", category: "Technology" },
  { character: "下载", pinyin: "xiàzài", level: "HSK 4", definition: { vi: "Tải xuống", en: "Download" }, example: "我下载了一个新软件。", examplePinyin: "Wǒ xiàzài le yí gè xīn ruǎnjiàn.", category: "Technology" },
  { character: "软件", pinyin: "ruǎnjiàn", level: "HSK 5", definition: { vi: "Phần mềm", en: "Software" }, example: "这个软件非常实用。", examplePinyin: "Zhège ruǎnjiàn fēicháng shíyòng.", category: "Technology" },
  { character: "屏幕", pinyin: "píngmù", level: "HSK 5", definition: { vi: "Màn hình", en: "Screen" }, example: "电脑屏幕坏了。", examplePinyin: "Diànnǎo píngmù huài le.", category: "Technology" },
  { character: "人工智能", pinyin: "réngōng zhìnéng", level: "HSK 6", definition: { vi: "Trí tuệ nhân tạo (AI)", en: "Artificial Intelligence" }, example: "人工智能正在改变世界。", examplePinyin: "Réngōng zhìnéng zhèngzài gǎibiàn shìjiè.", category: "Technology" },

  // HSK 4: Work & Business
  { character: "面试", pinyin: "miànshì", level: "HSK 4", definition: { vi: "Phỏng vấn", en: "Interview" }, example: "我明天有一个面试。", examplePinyin: "Wǒ míngtiān yǒu yí gè miànshì.", category: "Work & Business" },
  { character: "简历", pinyin: "jiǎnlì", level: "HSK 5", definition: { vi: "Sơ yếu lý lịch", en: "Resume/CV" }, example: "请把简历发给我。", examplePinyin: "Qǐng bǎ jiǎnlì fā gěi wǒ.", category: "Work & Business" },
  { character: "工资", pinyin: "gōngzī", level: "HSK 4", definition: { vi: "Lương", en: "Salary" }, example: "他的工资很高。", examplePinyin: "Tā de gōngzī hěn gāo.", category: "Work & Business" },
  { character: "加班", pinyin: "jiābān", level: "HSK 4", definition: { vi: "Làm thêm giờ", en: "Work overtime" }, example: "今晚我得加班。", examplePinyin: "Jīn wǎn wǒ děi jiābān.", category: "Work & Business" },
  { character: "会议", pinyin: "huìyì", level: "HSK 4", definition: { vi: "Cuộc họp", en: "Meeting" }, example: "下午三点开会议。", examplePinyin: "Xiàwǔ sān diǎn kāi huìyì.", category: "Work & Business" },
  { character: "合同", pinyin: "hétong", level: "HSK 5", definition: { vi: "Hợp đồng", en: "Contract" }, example: "请仔细看合同。", examplePinyin: "Qǐng zǐxì kàn hétong.", category: "Work & Business" },
  { character: "投资", pinyin: "tóuzī", level: "HSK 5", definition: { vi: "Đầu tư", en: "Invest" }, example: "他喜欢投资股票。", examplePinyin: "Tā xǐhuān tóuzī gǔpiào.", category: "Work & Business" },

  // HSK 4-5: Health
  { character: "感冒", pinyin: "gǎnmào", level: "HSK 3", definition: { vi: "Cảm cúm", en: "Cold (illness)" }, example: "我感冒了，头很疼。", examplePinyin: "Wǒ gǎnmào le, tóu hěn téng.", category: "Health" },
  { character: "发烧", pinyin: "fāshāo", level: "HSK 3", definition: { vi: "Sốt", en: "Have a fever" }, example: "孩子发烧了。", examplePinyin: "Háizi fāshāo le.", category: "Health" },
  { character: "咳嗽", pinyin: "késou", level: "HSK 4", definition: { vi: "Ho", en: "Cough" }, example: "他咳嗽得很厉害。", examplePinyin: "Tā késou de hěn lìhai.", category: "Health" },
  { character: "锻炼", pinyin: "duànliàn", level: "HSK 4", definition: { vi: "Rèn luyện, tập thể dục", en: "Exercise" }, example: "每天锻炼对身体好。", examplePinyin: "Měitiān duànliàn duì shēntǐ hǎo.", category: "Health" },
  { character: "营养", pinyin: "yíngyǎng", level: "HSK 5", definition: { vi: "Dinh dưỡng", en: "Nutrition" }, example: "水果很有营养。", examplePinyin: "Shuǐguǒ hěn yǒu yíngyǎng.", category: "Health" },

  // HSK 4-5: Nature & Environment
  { character: "环境", pinyin: "huánjìng", level: "HSK 3", definition: { vi: "Môi trường", en: "Environment" }, example: "保护环境是大家的责任。", examplePinyin: "Bǎohù huánjìng shì dàjiā de zérèn.", category: "Nature" },
  { character: "污染", pinyin: "wūrǎn", level: "HSK 4", definition: { vi: "Ô nhiễm", en: "Pollution" }, example: "空气污染很严重。", examplePinyin: "Kōngqì wūrǎn hěn yánzhòng.", category: "Nature" },
  { character: "气候", pinyin: "qìhòu", level: "HSK 5", definition: { vi: "Khí hậu", en: "Climate" }, example: "这里的气候很温和。", examplePinyin: "Zhèlǐ de qìhòu hěn wēnhé.", category: "Nature" },
  { character: "森林", pinyin: "sēnlín", level: "HSK 4", definition: { vi: "Rừng", en: "Forest" }, example: "森林里有很多动物。", examplePinyin: "Sēnlín lǐ yǒu hěn duō dòngwù.", category: "Nature" },
  { character: "节约", pinyin: "jiéyuē", level: "HSK 5", definition: { vi: "Tiết kiệm", en: "Save/Conserve" }, example: "我们要节约用水。", examplePinyin: "Wǒmen yào jiéyuē yòng shuǐ.", category: "Nature" },

  // HSK 5-6: Abstract & Society
  { character: "文化", pinyin: "wénhuà", level: "HSK 3", definition: { vi: "Văn hóa", en: "Culture" }, example: "中国文化博大精深。", examplePinyin: "Zhōngguó wénhuà bódà jīngshēn.", category: "Society" },
  { character: "传统", pinyin: "chuántǒng", level: "HSK 4", definition: { vi: "Truyền thống", en: "Tradition" }, example: "春节是中国的传统节日。", examplePinyin: "Chūnjié shì Zhōngguó de chuántǒng jiérì.", category: "Society" },
  { character: "现代", pinyin: "xiàndài", level: "HSK 4", definition: { vi: "Hiện đại", en: "Modern" }, example: "现代生活节奏很快。", examplePinyin: "Xiàndài shēnghuó jiézòu hěn kuài.", category: "Society" },
  { character: "经济", pinyin: "jīngjì", level: "HSK 4", definition: { vi: "Kinh tế", en: "Economy" }, example: "经济发展得很快。", examplePinyin: "Jīngjì fāzhǎn de hěn kuài.", category: "Society" },
  { character: "政府", pinyin: "zhèngfǔ", level: "HSK 5", definition: { vi: "Chính phủ", en: "Government" }, example: "政府推出了新政策。", examplePinyin: "Zhèngfǔ tuīchū le xīn zhèngcè.", category: "Society" },
  { character: "法律", pinyin: "fǎlǜ", level: "HSK 5", definition: { vi: "Pháp luật", en: "Law" }, example: "每个公民都要遵守法律。", examplePinyin: "Měi gè gōngmín dōu yào zūnshǒu fǎlǜ.", category: "Society" },
  { character: "理想", pinyin: "lǐxiǎng", level: "HSK 5", definition: { vi: "Lý tưởng, ước mơ", en: "Ideal/Dream" }, example: "他的理想是当医生。", examplePinyin: "Tā de lǐxiǎng shì dāng yīshēng.", category: "Abstract" },
  { character: "梦想", pinyin: "mèngxiǎng", level: "HSK 5", definition: { vi: "Ước mơ", en: "Dream/Aspiration" }, example: "永远不要放弃梦想。", examplePinyin: "Yǒngyuǎn búyào fàngqì mèngxiǎng.", category: "Abstract" },
  { character: "机会", pinyin: "jīhuì", level: "HSK 3", definition: { vi: "Cơ hội", en: "Opportunity" }, example: "这是一个好机会。", examplePinyin: "Zhè shì yí gè hǎo jīhuì.", category: "Abstract" },
  { character: "挑战", pinyin: "tiǎozhàn", level: "HSK 5", definition: { vi: "Thách thức", en: "Challenge" }, example: "我喜欢接受挑战。", examplePinyin: "Wǒ xǐhuān jiēshòu tiǎozhàn.", category: "Abstract" },

  // HSK 6: Advanced abstract
  { character: "潜力", pinyin: "qiánlì", level: "HSK 6", definition: { vi: "Tiềm năng", en: "Potential" }, example: "他很有发展潜力。", examplePinyin: "Tā hěn yǒu fāzhǎn qiánlì.", category: "Abstract" },
  { character: "策略", pinyin: "cèlüè", level: "HSK 6", definition: { vi: "Chiến lược", en: "Strategy" }, example: "公司制定了新策略。", examplePinyin: "Gōngsī zhìdìng le xīn cèlüè.", category: "Work & Business" },
  { character: "效率", pinyin: "xiàolǜ", level: "HSK 5", definition: { vi: "Hiệu suất", en: "Efficiency" }, example: "工作效率很重要。", examplePinyin: "Gōngzuò xiàolǜ hěn zhòngyào.", category: "Work & Business" },
  { character: "趋势", pinyin: "qūshì", level: "HSK 6", definition: { vi: "Xu hướng", en: "Trend" }, example: "这是未来的发展趋势。", examplePinyin: "Zhè shì wèilái de fāzhǎn qūshì.", category: "Abstract" },
  { character: "可持续", pinyin: "kěchíxù", level: "HSK 6", definition: { vi: "Bền vững", en: "Sustainable" }, example: "可持续发展非常重要。", examplePinyin: "Kěchíxù fāzhǎn fēicháng zhòngyào.", category: "Abstract" },
];
