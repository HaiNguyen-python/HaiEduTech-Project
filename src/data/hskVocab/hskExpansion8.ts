// HSK Vocabulary Expansion 8 - Modern life, finance, society, science
import type { HskWord } from "./types";

export const hskExpansion8Words: HskWord[] = [
  // HSK 2-3: Daily & shopping
  { character: "收据", pinyin: "shōujù", level: "HSK 3", definition: { vi: "Biên lai", en: "Receipt" }, example: "请给我收据。", examplePinyin: "Qǐng gěi wǒ shōujù.", category: "Shopping" },
  { character: "退款", pinyin: "tuìkuǎn", level: "HSK 4", definition: { vi: "Hoàn tiền", en: "Refund" }, example: "我想申请退款。", examplePinyin: "Wǒ xiǎng shēnqǐng tuìkuǎn.", category: "Shopping" },
  { character: "优惠", pinyin: "yōuhuì", level: "HSK 4", definition: { vi: "Ưu đãi", en: "Discount/Preferential" }, example: "今天有优惠活动。", examplePinyin: "Jīntiān yǒu yōuhuì huódòng.", category: "Shopping" },
  { character: "现金", pinyin: "xiànjīn", level: "HSK 4", definition: { vi: "Tiền mặt", en: "Cash" }, example: "我没带现金。", examplePinyin: "Wǒ méi dài xiànjīn.", category: "Shopping" },
  { character: "刷卡", pinyin: "shuākǎ", level: "HSK 4", definition: { vi: "Quẹt thẻ", en: "Swipe card / pay by card" }, example: "可以刷卡吗？", examplePinyin: "Kěyǐ shuākǎ ma?", category: "Shopping" },
  { character: "扫码", pinyin: "sǎomǎ", level: "HSK 4", definition: { vi: "Quét mã", en: "Scan QR code" }, example: "请扫码付款。", examplePinyin: "Qǐng sǎomǎ fùkuǎn.", category: "Technology" },

  // HSK 4-5: Work & business
  { character: "简历", pinyin: "jiǎnlì", level: "HSK 5", definition: { vi: "Sơ yếu lý lịch", en: "Résumé / CV" }, example: "请把简历发到我邮箱。", examplePinyin: "Qǐng bǎ jiǎnlì fā dào wǒ yóuxiāng.", category: "Work & Business" },
  { character: "面试", pinyin: "miànshì", level: "HSK 5", definition: { vi: "Phỏng vấn", en: "Job interview" }, example: "明天我有一个面试。", examplePinyin: "Míngtiān wǒ yǒu yí gè miànshì.", category: "Work & Business" },
  { character: "加班", pinyin: "jiābān", level: "HSK 4", definition: { vi: "Làm thêm giờ", en: "Work overtime" }, example: "今晚我得加班。", examplePinyin: "Jīnwǎn wǒ děi jiābān.", category: "Work & Business" },
  { character: "工资", pinyin: "gōngzī", level: "HSK 4", definition: { vi: "Tiền lương", en: "Salary" }, example: "他的工资很高。", examplePinyin: "Tā de gōngzī hěn gāo.", category: "Work & Business" },
  { character: "合同", pinyin: "hétong", level: "HSK 5", definition: { vi: "Hợp đồng", en: "Contract" }, example: "请签合同。", examplePinyin: "Qǐng qiān hétong.", category: "Work & Business" },
  { character: "客户", pinyin: "kèhù", level: "HSK 5", definition: { vi: "Khách hàng", en: "Client / Customer" }, example: "我们要重视每一位客户。", examplePinyin: "Wǒmen yào zhòngshì měi yí wèi kèhù.", category: "Work & Business" },
  { character: "项目", pinyin: "xiàngmù", level: "HSK 5", definition: { vi: "Dự án", en: "Project" }, example: "这个项目很重要。", examplePinyin: "Zhège xiàngmù hěn zhòngyào.", category: "Work & Business" },
  { character: "团队", pinyin: "tuánduì", level: "HSK 5", definition: { vi: "Đội nhóm", en: "Team" }, example: "我喜欢这个团队。", examplePinyin: "Wǒ xǐhuān zhège tuánduì.", category: "Work & Business" },

  // HSK 5: Finance
  { character: "投资", pinyin: "tóuzī", level: "HSK 5", definition: { vi: "Đầu tư", en: "Invest / Investment" }, example: "他在股市投资了很多钱。", examplePinyin: "Tā zài gǔshì tóuzī le hěn duō qián.", category: "Work & Business" },
  { character: "利润", pinyin: "lìrùn", level: "HSK 6", definition: { vi: "Lợi nhuận", en: "Profit" }, example: "公司今年的利润增加了。", examplePinyin: "Gōngsī jīnnián de lìrùn zēngjiā le.", category: "Work & Business" },
  { character: "贷款", pinyin: "dàikuǎn", level: "HSK 6", definition: { vi: "Khoản vay", en: "Loan" }, example: "他申请了房屋贷款。", examplePinyin: "Tā shēnqǐng le fángwū dàikuǎn.", category: "Work & Business" },
  { character: "保险", pinyin: "bǎoxiǎn", level: "HSK 5", definition: { vi: "Bảo hiểm", en: "Insurance" }, example: "买保险是为了安全。", examplePinyin: "Mǎi bǎoxiǎn shì wèile ānquán.", category: "Work & Business" },

  // HSK 4-5: Health
  { character: "症状", pinyin: "zhèngzhuàng", level: "HSK 5", definition: { vi: "Triệu chứng", en: "Symptom" }, example: "你有什么症状？", examplePinyin: "Nǐ yǒu shénme zhèngzhuàng?", category: "Health" },
  { character: "处方", pinyin: "chǔfāng", level: "HSK 6", definition: { vi: "Đơn thuốc", en: "Prescription" }, example: "医生开了一张处方。", examplePinyin: "Yīshēng kāi le yì zhāng chǔfāng.", category: "Health" },
  { character: "免疫", pinyin: "miǎnyì", level: "HSK 6", definition: { vi: "Miễn dịch", en: "Immunity" }, example: "锻炼能增强免疫力。", examplePinyin: "Duànliàn néng zēngqiáng miǎnyìlì.", category: "Health" },
  { character: "疫苗", pinyin: "yìmiáo", level: "HSK 6", definition: { vi: "Vắc-xin", en: "Vaccine" }, example: "孩子需要打疫苗。", examplePinyin: "Háizi xūyào dǎ yìmiáo.", category: "Health" },

  // HSK 5-6: Society & culture
  { character: "传统", pinyin: "chuántǒng", level: "HSK 5", definition: { vi: "Truyền thống", en: "Tradition" }, example: "春节是中国的传统节日。", examplePinyin: "Chūnjié shì Zhōngguó de chuántǒng jiérì.", category: "Culture" },
  { character: "习俗", pinyin: "xísú", level: "HSK 6", definition: { vi: "Phong tục", en: "Custom" }, example: "各地有不同的习俗。", examplePinyin: "Gèdì yǒu bùtóng de xísú.", category: "Culture" },
  { character: "礼仪", pinyin: "lǐyí", level: "HSK 6", definition: { vi: "Lễ nghi", en: "Etiquette" }, example: "商务礼仪很重要。", examplePinyin: "Shāngwù lǐyí hěn zhòngyào.", category: "Culture" },
  { character: "志愿者", pinyin: "zhìyuànzhě", level: "HSK 5", definition: { vi: "Tình nguyện viên", en: "Volunteer" }, example: "她是一名志愿者。", examplePinyin: "Tā shì yì míng zhìyuànzhě.", category: "Society" },
  { character: "公益", pinyin: "gōngyì", level: "HSK 6", definition: { vi: "Lợi ích công cộng", en: "Public welfare" }, example: "他们参加了公益活动。", examplePinyin: "Tāmen cānjiā le gōngyì huódòng.", category: "Society" },

  // HSK 5-6: Science & environment
  { character: "气候", pinyin: "qìhòu", level: "HSK 5", definition: { vi: "Khí hậu", en: "Climate" }, example: "全球气候正在变化。", examplePinyin: "Quánqiú qìhòu zhèngzài biànhuà.", category: "Nature" },
  { character: "污染", pinyin: "wūrǎn", level: "HSK 5", definition: { vi: "Ô nhiễm", en: "Pollution" }, example: "空气污染很严重。", examplePinyin: "Kōngqì wūrǎn hěn yánzhòng.", category: "Nature" },
  { character: "节能", pinyin: "jiénéng", level: "HSK 6", definition: { vi: "Tiết kiệm năng lượng", en: "Energy-saving" }, example: "我们应该节能减排。", examplePinyin: "Wǒmen yīnggāi jiénéng jiǎnpái.", category: "Nature" },
  { character: "回收", pinyin: "huíshōu", level: "HSK 5", definition: { vi: "Tái chế", en: "Recycle" }, example: "请把瓶子放进回收箱。", examplePinyin: "Qǐng bǎ píngzi fàng jìn huíshōu xiāng.", category: "Nature" },
  { character: "实验", pinyin: "shíyàn", level: "HSK 5", definition: { vi: "Thí nghiệm", en: "Experiment" }, example: "科学家做了很多实验。", examplePinyin: "Kēxuéjiā zuò le hěn duō shíyàn.", category: "Academic" },

  // HSK 5-6: Abstract & academic
  { character: "观点", pinyin: "guāndiǎn", level: "HSK 5", definition: { vi: "Quan điểm", en: "Viewpoint" }, example: "请说说你的观点。", examplePinyin: "Qǐng shuōshuo nǐ de guāndiǎn.", category: "Abstract" },
  { character: "策略", pinyin: "cèlüè", level: "HSK 6", definition: { vi: "Chiến lược", en: "Strategy" }, example: "他制定了新的营销策略。", examplePinyin: "Tā zhìdìng le xīn de yíngxiāo cèlüè.", category: "Abstract" },
  { character: "效率", pinyin: "xiàolǜ", level: "HSK 5", definition: { vi: "Hiệu suất", en: "Efficiency" }, example: "他工作效率很高。", examplePinyin: "Tā gōngzuò xiàolǜ hěn gāo.", category: "Abstract" },
  { character: "潜力", pinyin: "qiánlì", level: "HSK 6", definition: { vi: "Tiềm năng", en: "Potential" }, example: "这位学生很有潜力。", examplePinyin: "Zhè wèi xuéshēng hěn yǒu qiánlì.", category: "Abstract" },
  { character: "影响力", pinyin: "yǐngxiǎnglì", level: "HSK 6", definition: { vi: "Sức ảnh hưởng", en: "Influence" }, example: "他在业界很有影响力。", examplePinyin: "Tā zài yèjiè hěn yǒu yǐngxiǎnglì.", category: "Abstract" },
  { character: "创新", pinyin: "chuàngxīn", level: "HSK 5", definition: { vi: "Đổi mới sáng tạo", en: "Innovation" }, example: "公司鼓励员工创新。", examplePinyin: "Gōngsī gǔlì yuángōng chuàngxīn.", category: "Abstract" },
  { character: "合作", pinyin: "hézuò", level: "HSK 4", definition: { vi: "Hợp tác", en: "Cooperate" }, example: "希望我们以后多合作。", examplePinyin: "Xīwàng wǒmen yǐhòu duō hézuò.", category: "Work & Business" },
  { character: "竞争", pinyin: "jìngzhēng", level: "HSK 5", definition: { vi: "Cạnh tranh", en: "Compete / Competition" }, example: "市场竞争很激烈。", examplePinyin: "Shìchǎng jìngzhēng hěn jīliè.", category: "Work & Business" },
];
