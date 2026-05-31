/**
 * @file hskExpansion11.ts
 * @description HSK Vocabulary Expansion #11 - high-utility words across
 * travel, technology, environment, emotions and idiomatic expressions.
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

export const hskExpansion11Words: HskWord[] = [
  // Travel & Transport
  w("机场", "jīchǎng", "HSK 2", "Sân bay", "Airport", "我们在机场见面吧。", "Wǒmen zài jīchǎng jiànmiàn ba.", "Travel"),
  w("护照", "hùzhào", "HSK 4", "Hộ chiếu", "Passport", "出国旅行需要护照。", "Chūguó lǚxíng xūyào hùzhào.", "Travel"),
  w("签证", "qiānzhèng", "HSK 4", "Thị thực", "Visa", "申请签证需要一周时间。", "Shēnqǐng qiānzhèng xūyào yī zhōu shíjiān.", "Travel"),
  w("行李", "xíngli", "HSK 3", "Hành lý", "Luggage", "你的行李太重了。", "Nǐ de xíngli tài zhòng le.", "Travel"),
  w("景点", "jǐngdiǎn", "HSK 5", "Điểm tham quan", "Tourist spot", "这是北京最有名的景点。", "Zhè shì Běijīng zuì yǒumíng de jǐngdiǎn.", "Travel"),
  w("导游", "dǎoyóu", "HSK 5", "Hướng dẫn viên", "Tour guide", "导游讲解得很生动。", "Dǎoyóu jiǎngjiě de hěn shēngdòng.", "Travel"),

  // Technology
  w("人工智能", "réngōng zhìnéng", "HSK 6", "Trí tuệ nhân tạo", "Artificial intelligence", "人工智能正在改变世界。", "Réngōng zhìnéng zhèngzài gǎibiàn shìjiè.", "Technology"),
  w("软件", "ruǎnjiàn", "HSK 4", "Phần mềm", "Software", "这个软件很好用。", "Zhège ruǎnjiàn hěn hǎoyòng.", "Technology"),
  w("硬件", "yìngjiàn", "HSK 5", "Phần cứng", "Hardware", "电脑硬件需要升级。", "Diànnǎo yìngjiàn xūyào shēngjí.", "Technology"),
  w("数据", "shùjù", "HSK 5", "Dữ liệu", "Data", "公司分析用户数据。", "Gōngsī fēnxī yònghù shùjù.", "Technology"),
  w("网络", "wǎngluò", "HSK 4", "Mạng (internet)", "Network / Internet", "网络速度很快。", "Wǎngluò sùdù hěn kuài.", "Technology"),
  w("密码", "mìmǎ", "HSK 4", "Mật khẩu", "Password", "请输入你的密码。", "Qǐng shūrù nǐ de mìmǎ.", "Technology"),

  // Environment
  w("污染", "wūrǎn", "HSK 4", "Ô nhiễm", "Pollution", "空气污染对健康有害。", "Kōngqì wūrǎn duì jiànkāng yǒuhài.", "Environment"),
  w("环保", "huánbǎo", "HSK 5", "Bảo vệ môi trường", "Environmental protection", "环保意识越来越强。", "Huánbǎo yìshí yuèláiyuè qiáng.", "Environment"),
  w("气候", "qìhòu", "HSK 5", "Khí hậu", "Climate", "气候变化是全球问题。", "Qìhòu biànhuà shì quánqiú wèntí.", "Environment"),
  w("可再生", "kězàishēng", "HSK 6", "Có thể tái tạo", "Renewable", "可再生能源很重要。", "Kězàishēng néngyuán hěn zhòngyào.", "Environment"),
  w("生态", "shēngtài", "HSK 6", "Sinh thái", "Ecology", "保护生态平衡。", "Bǎohù shēngtài pínghéng.", "Environment"),

  // Emotions & Mind
  w("自信", "zìxìn", "HSK 4", "Tự tin", "Confident", "她对自己很自信。", "Tā duì zìjǐ hěn zìxìn.", "Psychology"),
  w("紧张", "jǐnzhāng", "HSK 4", "Căng thẳng", "Nervous / tense", "考试前我很紧张。", "Kǎoshì qián wǒ hěn jǐnzhāng.", "Psychology"),
  w("孤独", "gūdú", "HSK 5", "Cô đơn", "Lonely", "一个人在国外有时会感到孤独。", "Yīgè rén zài guówài yǒushí huì gǎndào gūdú.", "Psychology"),
  w("骄傲", "jiāo'ào", "HSK 4", "Tự hào / kiêu ngạo", "Proud / arrogant", "父母为我感到骄傲。", "Fùmǔ wèi wǒ gǎndào jiāo'ào.", "Psychology"),
  w("乐观", "lèguān", "HSK 5", "Lạc quan", "Optimistic", "他对未来很乐观。", "Tā duì wèilái hěn lèguān.", "Psychology"),
  w("悲观", "bēiguān", "HSK 5", "Bi quan", "Pessimistic", "不要太悲观。", "Bùyào tài bēiguān.", "Psychology"),

  // Business & Work
  w("会议", "huìyì", "HSK 3", "Cuộc họp", "Meeting", "今天下午有一个会议。", "Jīntiān xiàwǔ yǒu yīgè huìyì.", "Business"),
  w("合同", "hétong", "HSK 5", "Hợp đồng", "Contract", "我们签了一个三年的合同。", "Wǒmen qiānle yīgè sān nián de hétong.", "Business"),
  w("客户", "kèhù", "HSK 5", "Khách hàng", "Client", "我们要满足客户的需求。", "Wǒmen yào mǎnzú kèhù de xūqiú.", "Business"),
  w("市场", "shìchǎng", "HSK 4", "Thị trường", "Market", "亚洲市场增长很快。", "Yàzhōu shìchǎng zēngzhǎng hěn kuài.", "Business"),
  w("投资", "tóuzī", "HSK 5", "Đầu tư", "To invest / investment", "投资股票有风险。", "Tóuzī gǔpiào yǒu fēngxiǎn.", "Business"),

  // Idiomatic / Chengyu
  w("一帆风顺", "yī fān fēng shùn", "HSK 6", "Thuận buồm xuôi gió", "Smooth sailing", "祝你一帆风顺。", "Zhù nǐ yī fān fēng shùn.", "Idioms"),
  w("入乡随俗", "rù xiāng suí sú", "HSK 6", "Nhập gia tùy tục", "When in Rome, do as the Romans", "在国外要入乡随俗。", "Zài guówài yào rù xiāng suí sú.", "Idioms"),
  w("百闻不如一见", "bǎi wén bùrú yī jiàn", "HSK 6", "Trăm nghe không bằng một thấy", "Seeing is believing", "百闻不如一见，长城真壮观。", "Bǎi wén bùrú yī jiàn, Chángchéng zhēn zhuàngguān.", "Idioms"),
  w("水到渠成", "shuǐ dào qú chéng", "HSK 6", "Có công mài sắt có ngày nên kim", "Things will fall into place", "努力工作，成功水到渠成。", "Nǔlì gōngzuò, chénggōng shuǐ dào qú chéng.", "Idioms"),
];
