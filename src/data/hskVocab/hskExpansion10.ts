/**
 * @file hskExpansion10.ts
 * @description HSK Vocabulary Expansion #10 — extra coverage of media,
 * business, science, law, daily life and idiomatic expressions for HSK 4–6.
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

export const hskExpansion10Words: HskWord[] = [
  // Media & Society
  w("舆论", "yúlùn", "HSK 6", "Dư luận", "Public opinion", "舆论压力使政府改变了决定。", "Yúlùn yālì shǐ zhèngfǔ gǎibiànle juédìng.", "Society"),
  w("媒体", "méitǐ", "HSK 5", "Truyền thông", "Media", "社交媒体改变了我们的生活方式。", "Shèjiāo méitǐ gǎibiànle wǒmen de shēnghuó fāngshì.", "Media"),
  w("新闻", "xīnwén", "HSK 3", "Tin tức", "News", "我每天早上看新闻。", "Wǒ měitiān zǎoshang kàn xīnwén.", "Media"),
  w("广告", "guǎnggào", "HSK 4", "Quảng cáo", "Advertisement", "这个广告很有创意。", "Zhège guǎnggào hěn yǒu chuàngyì.", "Media"),
  w("报道", "bàodào", "HSK 5", "Đưa tin", "To report (news)", "记者报道了这件事。", "Jìzhě bàodàole zhè jiàn shì.", "Media"),

  // Business & Economy
  w("投资", "tóuzī", "HSK 5", "Đầu tư", "To invest", "他投资了一家科技公司。", "Tā tóuzīle yì jiā kējì gōngsī.", "Business"),
  w("利润", "lìrùn", "HSK 6", "Lợi nhuận", "Profit", "公司的利润大幅增长。", "Gōngsī de lìrùn dàfú zēngzhǎng.", "Business"),
  w("合同", "hétong", "HSK 5", "Hợp đồng", "Contract", "请仔细阅读合同条款。", "Qǐng zǐxì yuèdú hétong tiáokuǎn.", "Business"),
  w("谈判", "tánpàn", "HSK 5", "Đàm phán", "To negotiate", "双方进行了艰苦的谈判。", "Shuāngfāng jìnxíngle jiānkǔ de tánpàn.", "Business"),
  w("预算", "yùsuàn", "HSK 5", "Ngân sách", "Budget", "项目预算需要重新审核。", "Xiàngmù yùsuàn xūyào chóngxīn shěnhé.", "Business"),
  w("成本", "chéngběn", "HSK 5", "Chi phí", "Cost", "降低成本是当务之急。", "Jiàngdī chéngběn shì dāngwùzhījí.", "Business"),
  w("市场份额", "shìchǎng fèn'é", "HSK 6", "Thị phần", "Market share", "公司在亚洲的市场份额上升。", "Gōngsī zài Yàzhōu de shìchǎng fèn'é shàngshēng.", "Business"),

  // Science & Tech
  w("数据", "shùjù", "HSK 5", "Dữ liệu", "Data", "大数据正在改变许多行业。", "Dà shùjù zhèngzài gǎibiàn xǔduō hángyè.", "Technology"),
  w("人工智能", "réngōng zhìnéng", "HSK 6", "Trí tuệ nhân tạo", "Artificial intelligence", "人工智能将影响未来的工作。", "Réngōng zhìnéng jiāng yǐngxiǎng wèilái de gōngzuò.", "Technology"),
  w("算法", "suànfǎ", "HSK 6", "Thuật toán", "Algorithm", "推荐算法基于用户行为。", "Tuījiàn suànfǎ jīyú yònghù xíngwéi.", "Technology"),
  w("网络安全", "wǎngluò ānquán", "HSK 6", "An ninh mạng", "Cybersecurity", "网络安全是企业的优先事项。", "Wǎngluò ānquán shì qǐyè de yōuxiān shìxiàng.", "Technology"),
  w("研究", "yánjiū", "HSK 4", "Nghiên cứu", "To research", "他正在研究气候变化。", "Tā zhèngzài yánjiū qìhòu biànhuà.", "Science"),
  w("实验", "shíyàn", "HSK 5", "Thí nghiệm", "Experiment", "实验结果令人鼓舞。", "Shíyàn jiéguǒ lìng rén gǔwǔ.", "Science"),

  // Law & Government
  w("法律", "fǎlǜ", "HSK 4", "Pháp luật", "Law", "每个人都应该遵守法律。", "Měi gè rén dōu yīnggāi zūnshǒu fǎlǜ.", "Law"),
  w("权利", "quánlì", "HSK 5", "Quyền lợi", "Rights", "公民有言论自由的权利。", "Gōngmín yǒu yánlùn zìyóu de quánlì.", "Law"),
  w("义务", "yìwù", "HSK 5", "Nghĩa vụ", "Duty", "纳税是公民的义务。", "Nàshuì shì gōngmín de yìwù.", "Law"),
  w("政策", "zhèngcè", "HSK 5", "Chính sách", "Policy", "新政策有助于中小企业。", "Xīn zhèngcè yǒuzhù yú zhōngxiǎo qǐyè.", "Politics"),
  w("选举", "xuǎnjǔ", "HSK 6", "Bầu cử", "Election", "下个月将举行选举。", "Xià gè yuè jiāng jǔxíng xuǎnjǔ.", "Politics"),

  // Health & Lifestyle
  w("健康", "jiànkāng", "HSK 3", "Sức khỏe", "Health", "保持健康比什么都重要。", "Bǎochí jiànkāng bǐ shénme dōu zhòngyào.", "Health"),
  w("锻炼", "duànliàn", "HSK 4", "Tập luyện", "To exercise", "每天锻炼半小时。", "Měitiān duànliàn bàn xiǎoshí.", "Health"),
  w("睡眠", "shuìmián", "HSK 5", "Giấc ngủ", "Sleep", "良好的睡眠对学习很重要。", "Liánghǎo de shuìmián duì xuéxí hěn zhòngyào.", "Health"),
  w("心理", "xīnlǐ", "HSK 5", "Tâm lý", "Psychology", "心理健康同样重要。", "Xīnlǐ jiànkāng tóngyàng zhòngyào.", "Health"),
  w("压力", "yālì", "HSK 4", "Áp lực", "Pressure", "工作压力让人疲惫。", "Gōngzuò yālì ràng rén píbèi.", "Health"),

  // Travel & Daily life
  w("航班", "hángbān", "HSK 4", "Chuyến bay", "Flight", "我的航班延误了两个小时。", "Wǒ de hángbān yánwùle liǎng gè xiǎoshí.", "Travel"),
  w("签证", "qiānzhèng", "HSK 5", "Visa", "Visa", "申请签证需要很多文件。", "Shēnqǐng qiānzhèng xūyào hěn duō wénjiàn.", "Travel"),
  w("行李", "xíngli", "HSK 4", "Hành lý", "Luggage", "请把行李放在这里。", "Qǐng bǎ xíngli fàng zài zhèlǐ.", "Travel"),
  w("地铁", "dìtiě", "HSK 3", "Tàu điện ngầm", "Subway", "坐地铁去更快。", "Zuò dìtiě qù gèng kuài.", "Travel"),

  // Emotions & Personality
  w("乐观", "lèguān", "HSK 5", "Lạc quan", "Optimistic", "她总是非常乐观。", "Tā zǒng shì fēicháng lèguān.", "Emotions"),
  w("悲观", "bēiguān", "HSK 5", "Bi quan", "Pessimistic", "不要太悲观,事情会好转。", "Bùyào tài bēiguān, shìqing huì hǎozhuǎn.", "Emotions"),
  w("自信", "zìxìn", "HSK 4", "Tự tin", "Confident", "她对自己的能力很自信。", "Tā duì zìjǐ de nénglì hěn zìxìn.", "Emotions"),
  w("害羞", "hàixiū", "HSK 5", "Nhút nhát", "Shy", "这个孩子有点儿害羞。", "Zhège háizi yǒudiǎnr hàixiū.", "Emotions"),

  // Education
  w("奖学金", "jiǎngxuéjīn", "HSK 5", "Học bổng", "Scholarship", "他获得了全额奖学金。", "Tā huòdéle quán'é jiǎngxuéjīn.", "Education"),
  w("毕业", "bìyè", "HSK 4", "Tốt nghiệp", "To graduate", "我去年从大学毕业。", "Wǒ qùnián cóng dàxué bìyè.", "Education"),
  w("论文", "lùnwén", "HSK 5", "Luận văn", "Thesis", "她正在写硕士论文。", "Tā zhèngzài xiě shuòshì lùnwén.", "Education"),
  w("讲座", "jiǎngzuò", "HSK 5", "Bài giảng", "Lecture", "今天下午有一个有趣的讲座。", "Jīntiān xiàwǔ yǒu yí gè yǒuqù de jiǎngzuò.", "Education"),
];
