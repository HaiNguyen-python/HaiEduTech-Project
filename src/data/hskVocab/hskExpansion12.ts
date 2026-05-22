/**
 * @file hskExpansion12.ts
 * @description HSK Vocabulary Expansion #12 — additional high-frequency vocabulary
 * covering education, environment, business, technology and social topics across HSK 2-6.
 */
import type { HskWord } from "./types";

const w = (
  character: string,
  pinyin: string,
  level: HskWord["level"],
  vi: string,
  en: string,
  example: string,
  examplePinyin: string,
  category: string
): HskWord => ({
  character, pinyin, level,
  definition: { vi, en },
  example, examplePinyin, category,
});

export const hskExpansion12Words: HskWord[] = [
  // Education
  w("讲座", "jiǎngzuò", "HSK 5", "Bài giảng / chuyên đề", "Lecture", "今天下午有一个关于历史的讲座。", "Jīntiān xiàwǔ yǒu yī gè guānyú lìshǐ de jiǎngzuò.", "Education"),
  w("作文", "zuòwén", "HSK 4", "Bài tập làm văn", "Essay / composition", "老师让我们写一篇作文。", "Lǎoshī ràng wǒmen xiě yī piān zuòwén.", "Education"),
  w("毕业", "bìyè", "HSK 4", "Tốt nghiệp", "To graduate", "我去年从大学毕业。", "Wǒ qùnián cóng dàxué bìyè.", "Education"),
  w("教授", "jiàoshòu", "HSK 5", "Giáo sư", "Professor", "他是历史学教授。", "Tā shì lìshǐxué jiàoshòu.", "Education"),
  w("奖学金", "jiǎngxuéjīn", "HSK 5", "Học bổng", "Scholarship", "她拿到了全额奖学金。", "Tā nádàole quán'é jiǎngxuéjīn.", "Education"),
  w("学位", "xuéwèi", "HSK 5", "Bằng cấp", "Academic degree", "他获得了博士学位。", "Tā huòdéle bóshì xuéwèi.", "Education"),
  w("考核", "kǎohé", "HSK 6", "Khảo sát đánh giá", "Examination & assessment", "公司每年都有员工考核。", "Gōngsī měi nián dōu yǒu yuángōng kǎohé.", "Education"),

  // Environment & Nature
  w("环境", "huánjìng", "HSK 3", "Môi trường", "Environment", "保护环境是大家的责任。", "Bǎohù huánjìng shì dàjiā de zérèn.", "Nature"),
  w("污染", "wūrǎn", "HSK 5", "Ô nhiễm", "Pollution", "工厂的污染很严重。", "Gōngchǎng de wūrǎn hěn yánzhòng.", "Nature"),
  w("空气", "kōngqì", "HSK 4", "Không khí", "Air", "山上的空气特别新鲜。", "Shān shàng de kōngqì tèbié xīnxiān.", "Nature"),
  w("气候", "qìhòu", "HSK 5", "Khí hậu", "Climate", "这里的气候很温和。", "Zhèlǐ de qìhòu hěn wēnhé.", "Nature"),
  w("节能", "jiénéng", "HSK 6", "Tiết kiệm năng lượng", "Energy saving", "我们应该使用节能灯。", "Wǒmen yīnggāi shǐyòng jiénéng dēng.", "Nature"),
  w("可持续", "kěchíxù", "HSK 6", "Bền vững", "Sustainable", "可持续发展非常重要。", "Kěchíxù fāzhǎn fēicháng zhòngyào.", "Nature"),
  w("生态", "shēngtài", "HSK 6", "Sinh thái", "Ecology", "保护生态平衡刻不容缓。", "Bǎohù shēngtài pínghéng kèbùrónghuǎn.", "Nature"),

  // Business & Work
  w("合同", "hétong", "HSK 4", "Hợp đồng", "Contract", "请仔细看一下这份合同。", "Qǐng zǐxì kàn yīxià zhè fèn hétong.", "Work & Business"),
  w("项目", "xiàngmù", "HSK 5", "Dự án", "Project", "这个项目下个月开始。", "Zhège xiàngmù xià gè yuè kāishǐ.", "Work & Business"),
  w("会议", "huìyì", "HSK 3", "Cuộc họp", "Meeting", "明天上午十点开会议。", "Míngtiān shàngwǔ shí diǎn kāi huìyì.", "Work & Business"),
  w("加班", "jiābān", "HSK 4", "Làm thêm giờ", "Work overtime", "我今晚要加班。", "Wǒ jīn wǎn yào jiābān.", "Work & Business"),
  w("应聘", "yìngpìn", "HSK 5", "Ứng tuyển", "Apply for a job", "他来公司应聘销售经理。", "Tā lái gōngsī yìngpìn xiāoshòu jīnglǐ.", "Work & Business"),
  w("营业", "yíngyè", "HSK 5", "Kinh doanh", "Do business", "这家店从九点开始营业。", "Zhè jiā diàn cóng jiǔ diǎn kāishǐ yíngyè.", "Work & Business"),
  w("利润", "lìrùn", "HSK 6", "Lợi nhuận", "Profit", "公司今年的利润增长了百分之十。", "Gōngsī jīnnián de lìrùn zēngzhǎngle bǎi fēn zhī shí.", "Work & Business"),
  w("投资", "tóuzī", "HSK 5", "Đầu tư", "Invest", "他打算投资房地产。", "Tā dǎsuàn tóuzī fángdìchǎn.", "Work & Business"),

  // Technology
  w("互联网", "hùliánwǎng", "HSK 5", "Internet", "Internet", "互联网改变了我们的生活。", "Hùliánwǎng gǎibiànle wǒmen de shēnghuó.", "Technology"),
  w("软件", "ruǎnjiàn", "HSK 4", "Phần mềm", "Software", "这款软件非常好用。", "Zhè kuǎn ruǎnjiàn fēicháng hǎoyòng.", "Technology"),
  w("硬件", "yìngjiàn", "HSK 5", "Phần cứng", "Hardware", "电脑硬件需要升级。", "Diànnǎo yìngjiàn xūyào shēngjí.", "Technology"),
  w("人工智能", "réngōng zhìnéng", "HSK 6", "Trí tuệ nhân tạo", "Artificial intelligence", "人工智能正在改变各行各业。", "Réngōng zhìnéng zhèngzài gǎibiàn gè háng gè yè.", "Technology"),
  w("数据", "shùjù", "HSK 5", "Dữ liệu", "Data", "我们需要分析这些数据。", "Wǒmen xūyào fēnxī zhèxiē shùjù.", "Technology"),
  w("密码", "mìmǎ", "HSK 4", "Mật khẩu", "Password", "请输入您的密码。", "Qǐng shūrù nín de mìmǎ.", "Technology"),
  w("网络", "wǎngluò", "HSK 4", "Mạng", "Network", "酒店的网络很快。", "Jiǔdiàn de wǎngluò hěn kuài.", "Technology"),

  // Society & Culture
  w("社会", "shèhuì", "HSK 4", "Xã hội", "Society", "我们生活在一个多元的社会。", "Wǒmen shēnghuó zài yī gè duōyuán de shèhuì.", "Society"),
  w("文化", "wénhuà", "HSK 3", "Văn hóa", "Culture", "中国文化历史悠久。", "Zhōngguó wénhuà lìshǐ yōujiǔ.", "Culture"),
  w("传统", "chuántǒng", "HSK 5", "Truyền thống", "Tradition", "春节是中国最重要的传统节日。", "Chūnjié shì Zhōngguó zuì zhòngyào de chuántǒng jiérì.", "Culture"),
  w("习俗", "xísú", "HSK 6", "Phong tục", "Custom", "每个地区都有自己的习俗。", "Měi gè dìqū dōu yǒu zìjǐ de xísú.", "Culture"),
  w("现代", "xiàndài", "HSK 4", "Hiện đại", "Modern", "这是一座现代化的城市。", "Zhè shì yī zuò xiàndàihuà de chéngshì.", "Society"),
  w("人口", "rénkǒu", "HSK 5", "Dân số", "Population", "中国的人口超过十四亿。", "Zhōngguó de rénkǒu chāoguò shísì yì.", "Society"),
  w("发达", "fādá", "HSK 5", "Phát triển", "Developed", "日本是一个发达国家。", "Rìběn shì yī gè fādá guójiā.", "Society"),

  // Daily Life / High-frequency
  w("方便", "fāngbiàn", "HSK 3", "Tiện lợi", "Convenient", "这家店离地铁站很方便。", "Zhè jiā diàn lí dìtiězhàn hěn fāngbiàn.", "Daily Life"),
  w("习惯", "xíguàn", "HSK 3", "Thói quen", "Habit", "我习惯每天早起。", "Wǒ xíguàn měi tiān zǎo qǐ.", "Daily Life"),
  w("情况", "qíngkuàng", "HSK 4", "Tình hình", "Situation", "请告诉我详细情况。", "Qǐng gàosù wǒ xiángxì qíngkuàng.", "Daily Life"),
  w("机会", "jīhuì", "HSK 4", "Cơ hội", "Opportunity", "这是一个难得的机会。", "Zhè shì yī gè nándé de jīhuì.", "Daily Life"),
  w("意见", "yìjiàn", "HSK 4", "Ý kiến", "Opinion", "你的意见很重要。", "Nǐ de yìjiàn hěn zhòngyào.", "Daily Life"),
  w("解决", "jiějué", "HSK 4", "Giải quyết", "Solve", "这个问题需要尽快解决。", "Zhège wèntí xūyào jǐnkuài jiějué.", "Actions"),
  w("讨论", "tǎolùn", "HSK 4", "Thảo luận", "Discuss", "我们一起讨论这个计划。", "Wǒmen yīqǐ tǎolùn zhège jìhuà.", "Actions"),
  w("建议", "jiànyì", "HSK 4", "Đề nghị", "Suggest", "我建议你早点儿休息。", "Wǒ jiànyì nǐ zǎo diǎnr xiūxí.", "Actions"),
  w("考虑", "kǎolǜ", "HSK 4", "Cân nhắc", "Consider", "我需要好好考虑一下。", "Wǒ xūyào hǎohǎo kǎolǜ yīxià.", "Actions"),
  w("决定", "juédìng", "HSK 3", "Quyết định", "Decide", "他决定明天回家。", "Tā juédìng míngtiān huí jiā.", "Actions"),

  // Emotions & Descriptions
  w("紧张", "jǐnzhāng", "HSK 4", "Căng thẳng", "Nervous", "考试前我很紧张。", "Kǎoshì qián wǒ hěn jǐnzhāng.", "Emotions"),
  w("骄傲", "jiāo'ào", "HSK 4", "Tự hào", "Proud", "父母为他感到骄傲。", "Fùmǔ wèi tā gǎndào jiāo'ào.", "Emotions"),
  w("失望", "shīwàng", "HSK 4", "Thất vọng", "Disappointed", "我对结果很失望。", "Wǒ duì jiéguǒ hěn shīwàng.", "Emotions"),
  w("感动", "gǎndòng", "HSK 4", "Cảm động", "Moved / touched", "他的话让我很感动。", "Tā de huà ràng wǒ hěn gǎndòng.", "Emotions"),
  w("可怕", "kěpà", "HSK 4", "Đáng sợ", "Terrible", "这部电影太可怕了。", "Zhè bù diànyǐng tài kěpà le.", "Emotions"),
  w("精彩", "jīngcǎi", "HSK 4", "Tuyệt vời, hấp dẫn", "Wonderful / brilliant", "比赛非常精彩。", "Bǐsài fēicháng jīngcǎi.", "Descriptions"),
  w("严重", "yánzhòng", "HSK 4", "Nghiêm trọng", "Serious", "情况比想象的严重。", "Qíngkuàng bǐ xiǎngxiàng de yánzhòng.", "Descriptions"),
  w("流利", "liúlì", "HSK 4", "Lưu loát", "Fluent", "她的中文说得很流利。", "Tā de Zhōngwén shuō de hěn liúlì.", "Descriptions"),
  w("详细", "xiángxì", "HSK 4", "Chi tiết", "Detailed", "请给我一份详细的报告。", "Qǐng gěi wǒ yī fèn xiángxì de bàogào.", "Descriptions"),
  w("普通", "pǔtōng", "HSK 4", "Thông thường", "Ordinary / common", "这只是一个普通的问题。", "Zhè zhǐshì yī gè pǔtōng de wèntí.", "Descriptions"),

  // Abstract / HSK 5-6
  w("态度", "tàidù", "HSK 4", "Thái độ", "Attitude", "他的工作态度很认真。", "Tā de gōngzuò tàidù hěn rènzhēn.", "Abstract"),
  w("责任", "zérèn", "HSK 4", "Trách nhiệm", "Responsibility", "这是我的责任。", "Zhè shì wǒ de zérèn.", "Abstract"),
  w("观念", "guānniàn", "HSK 5", "Quan niệm", "Concept / view", "现代年轻人的观念变了。", "Xiàndài niánqīngrén de guānniàn biàn le.", "Abstract"),
  w("理论", "lǐlùn", "HSK 5", "Lý thuyết", "Theory", "这个理论很有说服力。", "Zhège lǐlùn hěn yǒu shuōfúlì.", "Abstract"),
  w("现象", "xiànxiàng", "HSK 5", "Hiện tượng", "Phenomenon", "这是一种社会现象。", "Zhè shì yī zhǒng shèhuì xiànxiàng.", "Abstract"),
  w("逻辑", "luójí", "HSK 6", "Logic", "Logic", "他的逻辑很清楚。", "Tā de luójí hěn qīngchu.", "Abstract"),
  w("策略", "cèlüè", "HSK 6", "Chiến lược", "Strategy", "公司需要新的市场策略。", "Gōngsī xūyào xīn de shìchǎng cèlüè.", "Abstract"),
  w("趋势", "qūshì", "HSK 6", "Xu hướng", "Trend", "这是一个全球趋势。", "Zhè shì yī gè quánqiú qūshì.", "Abstract"),
];
