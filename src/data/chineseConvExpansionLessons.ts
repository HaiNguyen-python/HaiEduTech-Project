// 15 new English-only lessons for Chinese Conversational Curriculum
// 5 per pillar: Daily Life, Business, Social
// All translations in English (international learners)
import type { ChineseConvLesson } from "./chineseConversationalCurriculum";

// Helper to mirror EN to legacy VI fields (satisfies type without showing VI in UI)
const en = (s: string) => s;

export const dailyLifeExpansion: ChineseConvLesson[] = [
  // ──── Lesson 15: Holidays & Travel Plans ────
  {
    id: "cn-dl-15-holidays",
    title: "Holidays & Travel Plans",
    titleVi: "Holidays & Travel Plans",
    titleZh: "假期旅行计划",
    icon: "Plane",
    description: "Plan vacations, book trips, and discuss holiday traditions",
    descriptionVi: "Plan vacations, book trips, and discuss holiday traditions",
    hskLevel: 3,
    badge: "Travel Planner",
    badgeVi: "Travel Planner",
    keySituations: [
      {
        title: "Booking a Hotel",
        titleVi: "Booking a Hotel",
        description: "Reserving a room and asking about facilities",
        descriptionVi: "Reserving a room and asking about facilities",
        culturalNote: "Many hotels in China require a passport for check-in. Tipping is not customary.",
        culturalNoteVi: "Many hotels in China require a passport for check-in. Tipping is not customary.",
        sampleDialogue: [
          { speaker: "Guest", line: "我想订一间双人房，三个晚上。", pinyin: "Wǒ xiǎng dìng yì jiān shuāngrénfáng, sān ge wǎnshàng.", translationEn: "I'd like to book a double room for three nights." },
          { speaker: "Reception", line: "好的，请出示您的护照。", pinyin: "Hǎo de, qǐng chūshì nín de hùzhào.", translationEn: "Sure, please show me your passport." },
          { speaker: "Guest", line: "包含早餐吗？", pinyin: "Bāohán zǎocān ma?", translationEn: "Does it include breakfast?" },
          { speaker: "Reception", line: "包含，自助早餐在二楼。", pinyin: "Bāohán, zìzhù zǎocān zài èr lóu.", translationEn: "Yes, the buffet breakfast is on the 2nd floor." },
        ],
      },
      {
        title: "Discussing Travel Plans",
        titleVi: "Discussing Travel Plans",
        description: "Sharing vacation ideas with friends",
        descriptionVi: "Sharing vacation ideas with friends",
        sampleDialogue: [
          { speaker: "Friend A", line: "国庆节你打算去哪儿？", pinyin: "Guóqìngjié nǐ dǎsuàn qù nǎr?", translationEn: "Where are you planning to go for National Day?" },
          { speaker: "Friend B", line: "我想去云南，听说那里风景很美。", pinyin: "Wǒ xiǎng qù Yúnnán, tīngshuō nàlǐ fēngjǐng hěn měi.", translationEn: "I want to go to Yunnan — I hear the scenery is beautiful." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "假期", pinyin: "jiàqī", meaning: "vacation", meaningEn: "vacation / holiday", type: "phrase", example: "我的假期有两个星期。", examplePinyin: "Wǒ de jiàqī yǒu liǎng ge xīngqī.", exampleVi: "My vacation is two weeks long.", exampleEn: "My vacation is two weeks long." },
      { hanzi: "订", pinyin: "dìng", meaning: "to book", meaningEn: "to book / reserve", type: "phrase", example: "我已经订好机票了。", examplePinyin: "Wǒ yǐjīng dìng hǎo jīpiào le.", exampleVi: "I've already booked the flight ticket.", exampleEn: "I've already booked the flight ticket." },
      { hanzi: "护照", pinyin: "hùzhào", meaning: "passport", meaningEn: "passport", type: "phrase", example: "请带好您的护照。", examplePinyin: "Qǐng dài hǎo nín de hùzhào.", exampleVi: "Please bring your passport.", exampleEn: "Please bring your passport." },
      { hanzi: "签证", pinyin: "qiānzhèng", meaning: "visa", meaningEn: "visa", type: "phrase", example: "申请签证需要多久？", examplePinyin: "Shēnqǐng qiānzhèng xūyào duō jiǔ?", exampleVi: "How long does it take to apply for a visa?", exampleEn: "How long does it take to apply for a visa?" },
      { hanzi: "行李", pinyin: "xíngli", meaning: "luggage", meaningEn: "luggage", type: "phrase", example: "我的行李丢了。", examplePinyin: "Wǒ de xíngli diū le.", exampleVi: "My luggage is lost.", exampleEn: "My luggage is lost." },
      { hanzi: "风景", pinyin: "fēngjǐng", meaning: "scenery", meaningEn: "scenery / landscape", type: "phrase", example: "这里的风景太美了。", examplePinyin: "Zhèlǐ de fēngjǐng tài měi le.", exampleVi: "The scenery here is so beautiful.", exampleEn: "The scenery here is so beautiful." },
      { hanzi: "纪念品", pinyin: "jìniànpǐn", meaning: "souvenir", meaningEn: "souvenir", type: "phrase", example: "我买了一些纪念品。", examplePinyin: "Wǒ mǎi le yìxiē jìniànpǐn.", exampleVi: "I bought some souvenirs.", exampleEn: "I bought some souvenirs." },
      { hanzi: "导游", pinyin: "dǎoyóu", meaning: "tour guide", meaningEn: "tour guide", type: "phrase", example: "我们的导游很专业。", examplePinyin: "Wǒmen de dǎoyóu hěn zhuānyè.", exampleVi: "Our tour guide is very professional.", exampleEn: "Our tour guide is very professional." },
    ],
    commonStructures: [
      {
        pattern: "打算 + Verb",
        patternPinyin: "dǎsuàn + Verb",
        explanation: "Used to express plans or intentions",
        explanationVi: "Used to express plans or intentions",
        examples: [
          { zh: "我打算去日本旅游。", pinyin: "Wǒ dǎsuàn qù Rìběn lǚyóu.", vi: "I plan to travel to Japan.", en: "I plan to travel to Japan." },
          { zh: "你打算什么时候出发？", pinyin: "Nǐ dǎsuàn shénme shíhòu chūfā?", vi: "When do you plan to depart?", en: "When do you plan to depart?" },
        ],
      },
    ],
    listeningChallenge: {
      title: "Booking a Trip to Yunnan",
      titleVi: "Booking a Trip to Yunnan",
      transcript: "我想订一个去云南的五日游，包含机票和酒店。我们一共三个人，希望住在大理古城附近。",
      transcriptPinyin: "Wǒ xiǎng dìng yí ge qù Yúnnán de wǔ rì yóu, bāohán jīpiào hé jiǔdiàn. Wǒmen yígòng sān ge rén, xīwàng zhù zài Dàlǐ gǔchéng fùjìn.",
      transcriptEn: "I'd like to book a 5-day tour to Yunnan, including flights and hotel. There are three of us, and we'd like to stay near Dali Old Town.",
      questions: [
        { q: "How many days is the trip?", qVi: "How many days is the trip?", options: ["3 days", "5 days", "7 days", "10 days"], answer: 1 },
        { q: "How many people are traveling?", qVi: "How many people are traveling?", options: ["2", "3", "4", "5"], answer: 1 },
      ],
    },
    speakingTopics: ["Describe your dream vacation", "Tell about a memorable trip you've taken"],
    fillInBlankExercises: [
      { sentence: "我想___一间房间。", pinyin: "Wǒ xiǎng ___ yì jiān fángjiān.", answer: "订", translationVi: "I want to book a room.", translationEn: "I want to book a room." },
      { sentence: "请出示您的___。", pinyin: "Qǐng chūshì nín de ___.", answer: "护照", translationVi: "Please show your passport.", translationEn: "Please show your passport." },
      { sentence: "这里的___太美了。", pinyin: "Zhèlǐ de ___ tài měi le.", answer: "风景", translationVi: "The scenery here is beautiful.", translationEn: "The scenery here is beautiful." },
    ],
  },

  // ──── Lesson 16: Apps & Mobile Payments ────
  {
    id: "cn-dl-16-apps",
    title: "Apps & Mobile Payments",
    titleVi: "Apps & Mobile Payments",
    titleZh: "手机支付",
    icon: "Smartphone",
    description: "Use WeChat Pay, Alipay, food delivery, and ride-sharing apps in China",
    descriptionVi: "Use WeChat Pay, Alipay, food delivery, and ride-sharing apps in China",
    hskLevel: 3,
    badge: "Digital Native",
    badgeVi: "Digital Native",
    keySituations: [
      {
        title: "Paying with WeChat",
        titleVi: "Paying with WeChat",
        description: "Scanning QR codes to pay at a shop",
        descriptionVi: "Scanning QR codes to pay at a shop",
        culturalNote: "China is largely cashless. WeChat Pay (微信支付) and Alipay (支付宝) dominate everyday transactions, even at street stalls.",
        culturalNoteVi: "China is largely cashless. WeChat Pay (微信支付) and Alipay (支付宝) dominate everyday transactions.",
        sampleDialogue: [
          { speaker: "Cashier", line: "您扫码还是我扫您？", pinyin: "Nín sǎo mǎ háishì wǒ sǎo nín?", translationEn: "Do you scan the code or shall I scan yours?" },
          { speaker: "Customer", line: "我扫您的二维码。", pinyin: "Wǒ sǎo nín de èrwéimǎ.", translationEn: "I'll scan your QR code." },
          { speaker: "Cashier", line: "一共三十八块。", pinyin: "Yígòng sānshíbā kuài.", translationEn: "That's 38 yuan total." },
          { speaker: "Customer", line: "好的，付款成功了。", pinyin: "Hǎo de, fùkuǎn chénggōng le.", translationEn: "Okay, the payment went through." },
        ],
      },
      {
        title: "Ordering Food Delivery",
        titleVi: "Ordering Food Delivery",
        description: "Using Meituan or Eleme to order food",
        descriptionVi: "Using Meituan or Eleme to order food",
        sampleDialogue: [
          { speaker: "Customer", line: "我用美团点了外卖，半小时就到。", pinyin: "Wǒ yòng Měituán diǎn le wàimài, bàn xiǎoshí jiù dào.", translationEn: "I ordered delivery on Meituan — it'll arrive in half an hour." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "扫码", pinyin: "sǎo mǎ", meaning: "scan QR code", meaningEn: "to scan a QR code", type: "phrase", example: "请扫码付款。", examplePinyin: "Qǐng sǎo mǎ fùkuǎn.", exampleVi: "Please scan the QR code to pay.", exampleEn: "Please scan the QR code to pay." },
      { hanzi: "二维码", pinyin: "èrwéimǎ", meaning: "QR code", meaningEn: "QR code", type: "phrase", example: "这是我的二维码。", examplePinyin: "Zhè shì wǒ de èrwéimǎ.", exampleVi: "This is my QR code.", exampleEn: "This is my QR code." },
      { hanzi: "微信支付", pinyin: "Wēixìn zhīfù", meaning: "WeChat Pay", meaningEn: "WeChat Pay", type: "phrase", example: "我用微信支付。", examplePinyin: "Wǒ yòng Wēixìn zhīfù.", exampleVi: "I'll pay with WeChat.", exampleEn: "I'll pay with WeChat." },
      { hanzi: "支付宝", pinyin: "Zhīfùbǎo", meaning: "Alipay", meaningEn: "Alipay", type: "phrase", example: "支付宝也可以。", examplePinyin: "Zhīfùbǎo yě kěyǐ.", exampleVi: "Alipay also works.", exampleEn: "Alipay also works." },
      { hanzi: "外卖", pinyin: "wàimài", meaning: "food delivery", meaningEn: "food delivery / takeout", type: "phrase", example: "今晚我点外卖。", examplePinyin: "Jīnwǎn wǒ diǎn wàimài.", exampleVi: "I'll order delivery tonight.", exampleEn: "I'll order delivery tonight." },
      { hanzi: "打车", pinyin: "dǎ chē", meaning: "to hail a ride", meaningEn: "to hail / book a ride", type: "phrase", example: "用滴滴打车很方便。", examplePinyin: "Yòng Dīdī dǎ chē hěn fāngbiàn.", exampleVi: "Booking a ride with Didi is convenient.", exampleEn: "Booking a ride with Didi is convenient." },
      { hanzi: "充值", pinyin: "chōngzhí", meaning: "top up", meaningEn: "to top up / recharge", type: "phrase", example: "我需要给手机充值。", examplePinyin: "Wǒ xūyào gěi shǒujī chōngzhí.", exampleVi: "I need to top up my phone.", exampleEn: "I need to top up my phone." },
      { hanzi: "红包", pinyin: "hóngbāo", meaning: "red envelope (digital cash gift)", meaningEn: "red envelope / digital cash gift", type: "phrase", example: "新年发红包。", examplePinyin: "Xīnnián fā hóngbāo.", exampleVi: "Send red envelopes for New Year.", exampleEn: "Send red envelopes for New Year." },
    ],
    commonStructures: [
      {
        pattern: "用 + App + Verb",
        patternPinyin: "yòng + App + Verb",
        explanation: "Used to express doing something via an app",
        explanationVi: "Used to express doing something via an app",
        examples: [
          { zh: "我用微信付款。", pinyin: "Wǒ yòng Wēixìn fùkuǎn.", vi: "I pay with WeChat.", en: "I pay with WeChat." },
          { zh: "她用滴滴打车。", pinyin: "Tā yòng Dīdī dǎ chē.", vi: "She uses Didi to book rides.", en: "She uses Didi to book rides." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Splitting the Bill on WeChat",
      titleVi: "Splitting the Bill on WeChat",
      transcript: "今天我们一共五个人吃饭，总共两百块。我先付，然后用微信发AA收款，每个人四十块。",
      transcriptPinyin: "Jīntiān wǒmen yígòng wǔ ge rén chīfàn, zǒnggòng liǎngbǎi kuài. Wǒ xiān fù, ránhòu yòng Wēixìn fā AA shōukuǎn, měi ge rén sìshí kuài.",
      transcriptEn: "Today there are 5 of us eating, the total is 200 yuan. I'll pay first, then use WeChat to send a split bill — 40 yuan per person.",
      questions: [
        { q: "How many people are eating?", qVi: "How many people are eating?", options: ["3", "4", "5", "6"], answer: 2 },
        { q: "How much per person?", qVi: "How much per person?", options: ["30", "40", "50", "60"], answer: 1 },
      ],
    },
    speakingTopics: ["Describe how you pay daily in your country", "Compare WeChat Pay with apps from your country"],
    fillInBlankExercises: [
      { sentence: "请___付款。", pinyin: "Qǐng ___ fùkuǎn.", answer: "扫码", translationVi: "Please scan the QR code to pay.", translationEn: "Please scan the QR code to pay." },
      { sentence: "今晚我点___。", pinyin: "Jīnwǎn wǒ diǎn ___.", answer: "外卖", translationVi: "I'll order delivery tonight.", translationEn: "I'll order delivery tonight." },
      { sentence: "新年发___。", pinyin: "Xīnnián fā ___.", answer: "红包", translationVi: "Send red envelopes for New Year.", translationEn: "Send red envelopes for New Year." },
    ],
  },

  // ──── Lesson 17: Family Gatherings ────
  {
    id: "cn-dl-17-family",
    title: "Family Gatherings",
    titleVi: "Family Gatherings",
    titleZh: "家庭聚会",
    icon: "Users",
    description: "Talk about family members, gatherings, and traditional family roles",
    descriptionVi: "Talk about family members, gatherings, and traditional family roles",
    hskLevel: 2,
    badge: "Family Speaker",
    badgeVi: "Family Speaker",
    keySituations: [
      {
        title: "Introducing Your Family",
        titleVi: "Introducing Your Family",
        description: "Showing family photos to a friend",
        descriptionVi: "Showing family photos to a friend",
        culturalNote: "In Chinese, family titles are very specific. 哥哥 (older brother) and 弟弟 (younger brother) are different words — age order matters.",
        culturalNoteVi: "In Chinese, family titles are very specific. Age order matters.",
        sampleDialogue: [
          { speaker: "A", line: "这是我的家人，我们一共五口人。", pinyin: "Zhè shì wǒ de jiārén, wǒmen yígòng wǔ kǒu rén.", translationEn: "This is my family — there are five of us." },
          { speaker: "B", line: "你有兄弟姐妹吗？", pinyin: "Nǐ yǒu xiōngdì jiěmèi ma?", translationEn: "Do you have siblings?" },
          { speaker: "A", line: "我有一个哥哥和一个妹妹。", pinyin: "Wǒ yǒu yí ge gēge hé yí ge mèimei.", translationEn: "I have one older brother and one younger sister." },
        ],
      },
      {
        title: "Spring Festival Reunion",
        titleVi: "Spring Festival Reunion",
        description: "Family dinner during Chinese New Year",
        descriptionVi: "Family dinner during Chinese New Year",
        sampleDialogue: [
          { speaker: "Grandma", line: "孩子们，过来吃年夜饭！", pinyin: "Háizimen, guòlái chī niányèfàn!", translationEn: "Kids, come eat the New Year's Eve dinner!" },
          { speaker: "Child", line: "奶奶，新年快乐！", pinyin: "Nǎinai, xīnnián kuàilè!", translationEn: "Grandma, Happy New Year!" },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "家人", pinyin: "jiārén", meaning: "family", meaningEn: "family members", type: "phrase", example: "我爱我的家人。", examplePinyin: "Wǒ ài wǒ de jiārén.", exampleVi: "I love my family.", exampleEn: "I love my family." },
      { hanzi: "父母", pinyin: "fùmǔ", meaning: "parents", meaningEn: "parents", type: "phrase", example: "我父母都很健康。", examplePinyin: "Wǒ fùmǔ dōu hěn jiànkāng.", exampleVi: "My parents are both healthy.", exampleEn: "My parents are both healthy." },
      { hanzi: "兄弟姐妹", pinyin: "xiōngdì jiěmèi", meaning: "siblings", meaningEn: "siblings", type: "phrase", example: "我没有兄弟姐妹。", examplePinyin: "Wǒ méiyǒu xiōngdì jiěmèi.", exampleVi: "I have no siblings.", exampleEn: "I have no siblings." },
      { hanzi: "亲戚", pinyin: "qīnqi", meaning: "relatives", meaningEn: "relatives", type: "phrase", example: "我的亲戚都住在北京。", examplePinyin: "Wǒ de qīnqi dōu zhù zài Běijīng.", exampleVi: "All my relatives live in Beijing.", exampleEn: "All my relatives live in Beijing." },
      { hanzi: "聚会", pinyin: "jùhuì", meaning: "gathering", meaningEn: "gathering / get-together", type: "phrase", example: "这周末有家庭聚会。", examplePinyin: "Zhè zhōumò yǒu jiātíng jùhuì.", exampleVi: "There's a family gathering this weekend.", exampleEn: "There's a family gathering this weekend." },
      { hanzi: "年夜饭", pinyin: "niányèfàn", meaning: "New Year's Eve dinner", meaningEn: "Lunar New Year's Eve dinner", type: "phrase", example: "年夜饭是最重要的一餐。", examplePinyin: "Niányèfàn shì zuì zhòngyào de yì cān.", exampleVi: "New Year's Eve dinner is the most important meal.", exampleEn: "New Year's Eve dinner is the most important meal." },
      { hanzi: "团圆", pinyin: "tuányuán", meaning: "family reunion", meaningEn: "family reunion", type: "phrase", example: "春节是团圆的节日。", examplePinyin: "Chūnjié shì tuányuán de jiérì.", exampleVi: "Spring Festival is a holiday for reunion.", exampleEn: "Spring Festival is a holiday for reunion." },
      { hanzi: "孝顺", pinyin: "xiàoshùn", meaning: "filial piety", meaningEn: "filial / respectful to parents", type: "phrase", example: "他很孝顺父母。", examplePinyin: "Tā hěn xiàoshùn fùmǔ.", exampleVi: "He is very filial to his parents.", exampleEn: "He is very filial to his parents." },
    ],
    commonStructures: [
      {
        pattern: "一共 + 数 + 口人",
        patternPinyin: "yígòng + number + kǒu rén",
        explanation: "Used to count family members. 口 is the measure word for people in a family",
        explanationVi: "Used to count family members",
        examples: [
          { zh: "我家一共四口人。", pinyin: "Wǒ jiā yígòng sì kǒu rén.", vi: "There are four people in my family.", en: "There are four people in my family." },
          { zh: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "How many people are in your family?", en: "How many people are in your family?" },
        ],
      },
    ],
    listeningChallenge: {
      title: "A Family Reunion Story",
      titleVi: "A Family Reunion Story",
      transcript: "我家一共六口人：爸爸、妈妈、哥哥、姐姐、我和妹妹。每年春节我们都会聚在一起吃年夜饭。",
      transcriptPinyin: "Wǒ jiā yígòng liù kǒu rén: bàba, māma, gēge, jiějie, wǒ hé mèimei. Měi nián chūnjié wǒmen dōu huì jù zài yìqǐ chī niányèfàn.",
      transcriptEn: "There are 6 in my family: dad, mom, older brother, older sister, me, and younger sister. Every Spring Festival we gather together for the reunion dinner.",
      questions: [
        { q: "How many people in the family?", qVi: "How many people in the family?", options: ["4", "5", "6", "7"], answer: 2 },
        { q: "When do they gather?", qVi: "When do they gather?", options: ["National Day", "Mid-Autumn", "Spring Festival", "Lantern Festival"], answer: 2 },
      ],
    },
    speakingTopics: ["Describe your family", "Talk about a family tradition"],
    fillInBlankExercises: [
      { sentence: "我家一共五___人。", pinyin: "Wǒ jiā yígòng wǔ ___ rén.", answer: "口", translationVi: "There are five in my family.", translationEn: "There are five in my family." },
      { sentence: "春节是___的节日。", pinyin: "Chūnjié shì ___ de jiérì.", answer: "团圆", translationVi: "Spring Festival is a reunion holiday.", translationEn: "Spring Festival is a reunion holiday." },
      { sentence: "他很___父母。", pinyin: "Tā hěn ___ fùmǔ.", answer: "孝顺", translationVi: "He is filial to his parents.", translationEn: "He is filial to his parents." },
    ],
  },

  // ──── Lesson 18: Education & School Life ────
  {
    id: "cn-dl-18-education",
    title: "Education & School Life",
    titleVi: "Education & School Life",
    titleZh: "学校生活",
    icon: "GraduationCap",
    description: "Discuss school subjects, exams, and student life in Chinese",
    descriptionVi: "Discuss school subjects, exams, and student life in Chinese",
    hskLevel: 3,
    badge: "Scholar",
    badgeVi: "Scholar",
    keySituations: [
      {
        title: "Talking About Studies",
        titleVi: "Talking About Studies",
        description: "Discussing university major and courses",
        descriptionVi: "Discussing university major and courses",
        culturalNote: "The Gaokao (高考) is the national college entrance exam in China — extremely competitive and a major life event for students.",
        culturalNoteVi: "The Gaokao is the national college entrance exam in China.",
        sampleDialogue: [
          { speaker: "A", line: "你在哪所大学读书？", pinyin: "Nǐ zài nǎ suǒ dàxué dúshū?", translationEn: "Which university do you study at?" },
          { speaker: "B", line: "我在北京大学，学计算机。", pinyin: "Wǒ zài Běijīng Dàxué, xué jìsuànjī.", translationEn: "I'm at Peking University, studying computer science." },
          { speaker: "A", line: "下学期有什么课？", pinyin: "Xià xuéqī yǒu shénme kè?", translationEn: "What courses do you have next semester?" },
          { speaker: "B", line: "有数据结构和人工智能。", pinyin: "Yǒu shùjù jiégòu hé réngōng zhìnéng.", translationEn: "Data structures and artificial intelligence." },
        ],
      },
      {
        title: "Preparing for Exams",
        titleVi: "Preparing for Exams",
        description: "Talking about exam stress",
        descriptionVi: "Talking about exam stress",
        sampleDialogue: [
          { speaker: "A", line: "下周就要考试了，我好紧张。", pinyin: "Xià zhōu jiù yào kǎoshì le, wǒ hǎo jǐnzhāng.", translationEn: "The exam is next week — I'm so nervous." },
          { speaker: "B", line: "别担心，加油！", pinyin: "Bié dānxīn, jiāyóu!", translationEn: "Don't worry, you got this!" },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "大学", pinyin: "dàxué", meaning: "university", meaningEn: "university", type: "phrase", example: "我在北京读大学。", examplePinyin: "Wǒ zài Běijīng dú dàxué.", exampleVi: "I study at university in Beijing.", exampleEn: "I study at university in Beijing." },
      { hanzi: "专业", pinyin: "zhuānyè", meaning: "major", meaningEn: "major / specialization", type: "phrase", example: "我的专业是经济学。", examplePinyin: "Wǒ de zhuānyè shì jīngjìxué.", exampleVi: "My major is economics.", exampleEn: "My major is economics." },
      { hanzi: "学期", pinyin: "xuéqī", meaning: "semester", meaningEn: "semester", type: "phrase", example: "这个学期很忙。", examplePinyin: "Zhè ge xuéqī hěn máng.", exampleVi: "This semester is very busy.", exampleEn: "This semester is very busy." },
      { hanzi: "考试", pinyin: "kǎoshì", meaning: "exam", meaningEn: "exam / test", type: "phrase", example: "明天有考试。", examplePinyin: "Míngtiān yǒu kǎoshì.", exampleVi: "There's an exam tomorrow.", exampleEn: "There's an exam tomorrow." },
      { hanzi: "毕业", pinyin: "bìyè", meaning: "graduate", meaningEn: "to graduate", type: "phrase", example: "我明年毕业。", examplePinyin: "Wǒ míngnián bìyè.", exampleVi: "I'll graduate next year.", exampleEn: "I'll graduate next year." },
      { hanzi: "作业", pinyin: "zuòyè", meaning: "homework", meaningEn: "homework", type: "phrase", example: "今天的作业很多。", examplePinyin: "Jīntiān de zuòyè hěn duō.", exampleVi: "Today's homework is a lot.", exampleEn: "Today's homework is a lot." },
      { hanzi: "成绩", pinyin: "chéngjì", meaning: "grades", meaningEn: "grades / scores", type: "phrase", example: "她的成绩很好。", examplePinyin: "Tā de chéngjì hěn hǎo.", exampleVi: "Her grades are very good.", exampleEn: "Her grades are very good." },
      { hanzi: "高考", pinyin: "gāokǎo", meaning: "Gaokao", meaningEn: "Gaokao (national college entrance exam)", type: "phrase", example: "高考非常重要。", examplePinyin: "Gāokǎo fēicháng zhòngyào.", exampleVi: "Gaokao is very important.", exampleEn: "Gaokao is very important." },
    ],
    commonStructures: [
      {
        pattern: "在 + Place + 读书 / 学",
        patternPinyin: "zài + Place + dúshū / xué",
        explanation: "Used to say where you study",
        explanationVi: "Used to say where you study",
        examples: [
          { zh: "我在清华大学读书。", pinyin: "Wǒ zài Qīnghuá Dàxué dúshū.", vi: "I study at Tsinghua University.", en: "I study at Tsinghua University." },
          { zh: "他在美国学医。", pinyin: "Tā zài Měiguó xué yī.", vi: "He studies medicine in the US.", en: "He studies medicine in the US." },
        ],
      },
    ],
    listeningChallenge: {
      title: "A Student's Schedule",
      titleVi: "A Student's Schedule",
      transcript: "我是大三的学生，专业是国际贸易。这个学期我有六门课，每天的作业都很多，下个月还有期末考试。",
      transcriptPinyin: "Wǒ shì dà sān de xuéshēng, zhuānyè shì guójì màoyì. Zhè ge xuéqī wǒ yǒu liù mén kè, měi tiān de zuòyè dōu hěn duō, xià ge yuè hái yǒu qīmò kǎoshì.",
      transcriptEn: "I'm a third-year student majoring in International Trade. This semester I have 6 courses, lots of homework every day, and final exams next month.",
      questions: [
        { q: "What is the major?", qVi: "What is the major?", options: ["Economics", "International Trade", "Computer Science", "Law"], answer: 1 },
        { q: "How many courses this semester?", qVi: "How many courses this semester?", options: ["4", "5", "6", "7"], answer: 2 },
      ],
    },
    speakingTopics: ["Describe your school or university", "Talk about your favorite subject"],
    fillInBlankExercises: [
      { sentence: "我的___是经济学。", pinyin: "Wǒ de ___ shì jīngjìxué.", answer: "专业", translationVi: "My major is economics.", translationEn: "My major is economics." },
      { sentence: "明天有___。", pinyin: "Míngtiān yǒu ___.", answer: "考试", translationVi: "There's an exam tomorrow.", translationEn: "There's an exam tomorrow." },
      { sentence: "她的___很好。", pinyin: "Tā de ___ hěn hǎo.", answer: "成绩", translationVi: "Her grades are good.", translationEn: "Her grades are good." },
    ],
  },

  // ──── Lesson 19: Daily Routines ────
  {
    id: "cn-dl-19-routines",
    title: "Daily Routines",
    titleVi: "Daily Routines",
    titleZh: "日常生活",
    icon: "Sun",
    description: "Describe your daily schedule from morning to night",
    descriptionVi: "Describe your daily schedule from morning to night",
    hskLevel: 2,
    badge: "Routine Master",
    badgeVi: "Routine Master",
    keySituations: [
      {
        title: "Morning Routine",
        titleVi: "Morning Routine",
        description: "Describing what you do in the morning",
        descriptionVi: "Describing what you do in the morning",
        sampleDialogue: [
          { speaker: "A", line: "你每天几点起床？", pinyin: "Nǐ měi tiān jǐ diǎn qǐchuáng?", translationEn: "What time do you get up every day?" },
          { speaker: "B", line: "我早上六点半起床。", pinyin: "Wǒ zǎoshang liù diǎn bàn qǐchuáng.", translationEn: "I get up at 6:30 in the morning." },
          { speaker: "A", line: "起床后做什么？", pinyin: "Qǐchuáng hòu zuò shénme?", translationEn: "What do you do after getting up?" },
          { speaker: "B", line: "先刷牙洗脸，然后吃早饭。", pinyin: "Xiān shuā yá xǐ liǎn, ránhòu chī zǎofàn.", translationEn: "First brush teeth and wash face, then eat breakfast." },
        ],
      },
      {
        title: "Evening Routine",
        titleVi: "Evening Routine",
        description: "Talking about how you wind down",
        descriptionVi: "Talking about how you wind down",
        sampleDialogue: [
          { speaker: "A", line: "你晚上一般做什么？", pinyin: "Nǐ wǎnshang yìbān zuò shénme?", translationEn: "What do you usually do in the evening?" },
          { speaker: "B", line: "我喜欢看书，十一点睡觉。", pinyin: "Wǒ xǐhuān kàn shū, shíyī diǎn shuìjiào.", translationEn: "I like to read, and sleep at 11." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "起床", pinyin: "qǐchuáng", meaning: "get up", meaningEn: "to get up / wake up", type: "phrase", example: "我七点起床。", examplePinyin: "Wǒ qī diǎn qǐchuáng.", exampleVi: "I get up at 7.", exampleEn: "I get up at 7." },
      { hanzi: "刷牙", pinyin: "shuā yá", meaning: "brush teeth", meaningEn: "to brush teeth", type: "phrase", example: "饭后要刷牙。", examplePinyin: "Fàn hòu yào shuā yá.", exampleVi: "Brush teeth after meals.", exampleEn: "Brush teeth after meals." },
      { hanzi: "洗澡", pinyin: "xǐ zǎo", meaning: "take a shower", meaningEn: "to take a shower", type: "phrase", example: "我每天晚上洗澡。", examplePinyin: "Wǒ měi tiān wǎnshang xǐ zǎo.", exampleVi: "I shower every evening.", exampleEn: "I shower every evening." },
      { hanzi: "上班", pinyin: "shàngbān", meaning: "go to work", meaningEn: "to go to work", type: "phrase", example: "我九点上班。", examplePinyin: "Wǒ jiǔ diǎn shàngbān.", exampleVi: "I start work at 9.", exampleEn: "I start work at 9." },
      { hanzi: "下班", pinyin: "xiàbān", meaning: "leave work", meaningEn: "to finish work / leave the office", type: "phrase", example: "六点下班。", examplePinyin: "Liù diǎn xiàbān.", exampleVi: "Finish work at 6.", exampleEn: "Finish work at 6." },
      { hanzi: "睡觉", pinyin: "shuìjiào", meaning: "sleep", meaningEn: "to sleep / go to bed", type: "phrase", example: "我十一点睡觉。", examplePinyin: "Wǒ shíyī diǎn shuìjiào.", exampleVi: "I sleep at 11.", exampleEn: "I sleep at 11." },
      { hanzi: "锻炼", pinyin: "duànliàn", meaning: "exercise", meaningEn: "to exercise / work out", type: "phrase", example: "我每天早上锻炼。", examplePinyin: "Wǒ měi tiān zǎoshang duànliàn.", exampleVi: "I exercise every morning.", exampleEn: "I exercise every morning." },
      { hanzi: "习惯", pinyin: "xíguàn", meaning: "habit", meaningEn: "habit / be used to", type: "phrase", example: "这是我的好习惯。", examplePinyin: "Zhè shì wǒ de hǎo xíguàn.", exampleVi: "This is my good habit.", exampleEn: "This is my good habit." },
    ],
    commonStructures: [
      {
        pattern: "先 ... 然后 ... 最后 ...",
        patternPinyin: "xiān ... ránhòu ... zuìhòu ...",
        explanation: "Sequencing: first ... then ... finally ...",
        explanationVi: "Sequencing actions",
        examples: [
          { zh: "我先吃早饭，然后上班，最后回家。", pinyin: "Wǒ xiān chī zǎofàn, ránhòu shàngbān, zuìhòu huí jiā.", vi: "First I eat breakfast, then go to work, finally come home.", en: "First I eat breakfast, then go to work, finally come home." },
        ],
      },
    ],
    listeningChallenge: {
      title: "A Typical Day",
      titleVi: "A Typical Day",
      transcript: "我每天早上七点起床，先去跑步半个小时，然后回家洗澡吃早饭。九点上班，下午六点下班。晚上看一个小时电视就睡觉。",
      transcriptPinyin: "Wǒ měi tiān zǎoshang qī diǎn qǐchuáng, xiān qù pǎobù bàn ge xiǎoshí, ránhòu huí jiā xǐ zǎo chī zǎofàn. Jiǔ diǎn shàngbān, xiàwǔ liù diǎn xiàbān. Wǎnshang kàn yí ge xiǎoshí diànshì jiù shuìjiào.",
      transcriptEn: "I wake up at 7 every morning, run for 30 min, then come home to shower and eat breakfast. Work starts at 9 and ends at 6. In the evening I watch TV for an hour before bed.",
      questions: [
        { q: "What time does she wake up?", qVi: "What time does she wake up?", options: ["6:00", "6:30", "7:00", "7:30"], answer: 2 },
        { q: "How long does she run?", qVi: "How long does she run?", options: ["15 min", "30 min", "45 min", "1 hour"], answer: 1 },
      ],
    },
    speakingTopics: ["Describe your typical weekday", "Compare your weekday and weekend routines"],
    fillInBlankExercises: [
      { sentence: "我早上七点___。", pinyin: "Wǒ zǎoshang qī diǎn ___.", answer: "起床", translationVi: "I wake up at 7.", translationEn: "I wake up at 7." },
      { sentence: "饭后要___。", pinyin: "Fàn hòu yào ___.", answer: "刷牙", translationVi: "Brush teeth after meals.", translationEn: "Brush teeth after meals." },
      { sentence: "我每天早上___。", pinyin: "Wǒ měi tiān zǎoshang ___.", answer: "锻炼", translationVi: "I exercise every morning.", translationEn: "I exercise every morning." },
    ],
  },
];

export const businessExpansion: ChineseConvLesson[] = [
  // ──── Lesson 13: Networking & Business Cards ────
  {
    id: "cn-bz-13-networking",
    title: "Networking & Business Cards",
    titleVi: "Networking & Business Cards",
    titleZh: "商务社交",
    icon: "Users",
    description: "Exchange business cards, network at events, and build connections",
    descriptionVi: "Exchange business cards, network at events, and build connections",
    hskLevel: 4,
    badge: "Networker",
    badgeVi: "Networker",
    keySituations: [
      {
        title: "Exchanging Business Cards",
        titleVi: "Exchanging Business Cards",
        description: "Meeting a new contact at a conference",
        descriptionVi: "Meeting a new contact at a conference",
        culturalNote: "Always present and receive business cards (名片) with both hands. Look at the card carefully before putting it away — it shows respect.",
        culturalNoteVi: "Always present and receive business cards with both hands.",
        sampleDialogue: [
          { speaker: "A", line: "您好，这是我的名片，请多关照。", pinyin: "Nín hǎo, zhè shì wǒ de míngpiàn, qǐng duō guānzhào.", translationEn: "Hello, here is my business card. I look forward to working with you." },
          { speaker: "B", line: "谢谢，这是我的，希望以后多多合作。", pinyin: "Xièxie, zhè shì wǒ de, xīwàng yǐhòu duōduō hézuò.", translationEn: "Thank you, this is mine. I hope we can collaborate often in the future." },
          { speaker: "A", line: "我们加个微信吧？", pinyin: "Wǒmen jiā ge Wēixìn ba?", translationEn: "Shall we add each other on WeChat?" },
          { speaker: "B", line: "好的，请扫一下我的二维码。", pinyin: "Hǎo de, qǐng sǎo yíxià wǒ de èrwéimǎ.", translationEn: "Sure, please scan my QR code." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "名片", pinyin: "míngpiàn", meaning: "business card", meaningEn: "business card", type: "phrase", example: "请收下我的名片。", examplePinyin: "Qǐng shōuxià wǒ de míngpiàn.", exampleVi: "Please accept my business card.", exampleEn: "Please accept my business card." },
      { hanzi: "关照", pinyin: "guānzhào", meaning: "look after", meaningEn: "to look after / consideration", type: "expression", example: "请多关照。", examplePinyin: "Qǐng duō guānzhào.", exampleVi: "Please look out for me.", exampleEn: "Please look out for me." },
      { hanzi: "合作", pinyin: "hézuò", meaning: "cooperate", meaningEn: "to cooperate / collaborate", type: "phrase", example: "希望以后合作愉快。", examplePinyin: "Xīwàng yǐhòu hézuò yúkuài.", exampleVi: "Hope our future cooperation is pleasant.", exampleEn: "Hope our future cooperation is pleasant." },
      { hanzi: "联系", pinyin: "liánxì", meaning: "contact", meaningEn: "to contact / get in touch", type: "phrase", example: "保持联系。", examplePinyin: "Bǎochí liánxì.", exampleVi: "Keep in touch.", exampleEn: "Keep in touch." },
      { hanzi: "人脉", pinyin: "rénmài", meaning: "network", meaningEn: "social network / connections", type: "phrase", example: "他的人脉很广。", examplePinyin: "Tā de rénmài hěn guǎng.", exampleVi: "His network is very wide.", exampleEn: "His network is very wide." },
      { hanzi: "介绍", pinyin: "jièshào", meaning: "introduce", meaningEn: "to introduce", type: "phrase", example: "我来介绍一下。", examplePinyin: "Wǒ lái jièshào yíxià.", exampleVi: "Let me introduce.", exampleEn: "Let me introduce." },
      { hanzi: "会议", pinyin: "huìyì", meaning: "conference", meaningEn: "conference / meeting", type: "phrase", example: "下周有一个行业会议。", examplePinyin: "Xià zhōu yǒu yí ge hángyè huìyì.", exampleVi: "There's an industry conference next week.", exampleEn: "There's an industry conference next week." },
      { hanzi: "行业", pinyin: "hángyè", meaning: "industry", meaningEn: "industry / sector", type: "phrase", example: "我们在同一个行业。", examplePinyin: "Wǒmen zài tóng yí ge hángyè.", exampleVi: "We're in the same industry.", exampleEn: "We're in the same industry." },
    ],
    commonStructures: [
      {
        pattern: "请多 + Verb",
        patternPinyin: "qǐng duō + Verb",
        explanation: "Polite formula asking for consideration / cooperation",
        explanationVi: "Polite formula asking for consideration",
        examples: [
          { zh: "请多关照。", pinyin: "Qǐng duō guānzhào.", vi: "Please look out for me.", en: "Please look out for me." },
          { zh: "请多指教。", pinyin: "Qǐng duō zhǐjiào.", vi: "Please give me your guidance.", en: "Please give me your guidance." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Conference Networking",
      titleVi: "Conference Networking",
      transcript: "在今天的会议上我认识了很多新朋友，交换了二十多张名片。我希望能跟其中几位保持长期合作关系。",
      transcriptPinyin: "Zài jīntiān de huìyì shàng wǒ rènshí le hěn duō xīn péngyǒu, jiāohuàn le èrshí duō zhāng míngpiàn. Wǒ xīwàng néng gēn qízhōng jǐ wèi bǎochí chángqī hézuò guānxì.",
      transcriptEn: "At today's conference I met many new people and exchanged over 20 business cards. I hope to maintain long-term cooperation with some of them.",
      questions: [
        { q: "How many business cards exchanged?", qVi: "How many business cards exchanged?", options: ["10+", "15+", "20+", "30+"], answer: 2 },
        { q: "What does the speaker hope for?", qVi: "What does the speaker hope for?", options: ["Short-term deal", "Long-term cooperation", "Job offer", "Funding"], answer: 1 },
      ],
    },
    speakingTopics: ["Practice exchanging business cards", "Describe a networking event you attended"],
    fillInBlankExercises: [
      { sentence: "请收下我的___。", pinyin: "Qǐng shōuxià wǒ de ___.", answer: "名片", translationVi: "Please accept my business card.", translationEn: "Please accept my business card." },
      { sentence: "希望以后多多___。", pinyin: "Xīwàng yǐhòu duōduō ___.", answer: "合作", translationVi: "Hope to cooperate often in the future.", translationEn: "Hope to cooperate often in the future." },
      { sentence: "他的___很广。", pinyin: "Tā de ___ hěn guǎng.", answer: "人脉", translationVi: "His network is very wide.", translationEn: "His network is very wide." },
    ],
  },

  // ──── Lesson 14: Remote Work & Online Meetings ────
  {
    id: "cn-bz-14-remote-work",
    title: "Remote Work & Online Meetings",
    titleVi: "Remote Work & Online Meetings",
    titleZh: "远程办公",
    icon: "Monitor",
    description: "Navigate Zoom calls, Slack messages, and remote team collaboration",
    descriptionVi: "Navigate Zoom calls, Slack messages, and remote team collaboration",
    hskLevel: 4,
    badge: "Remote Pro",
    badgeVi: "Remote Pro",
    keySituations: [
      {
        title: "Joining a Video Meeting",
        titleVi: "Joining a Video Meeting",
        description: "Audio/video troubleshooting in a Zoom call",
        descriptionVi: "Audio/video troubleshooting in a Zoom call",
        sampleDialogue: [
          { speaker: "Host", line: "大家能听到我说话吗？", pinyin: "Dàjiā néng tīngdào wǒ shuōhuà ma?", translationEn: "Can everyone hear me?" },
          { speaker: "Member", line: "听得到，但是您的画面有点卡。", pinyin: "Tīng de dào, dànshì nín de huàmiàn yǒu diǎn kǎ.", translationEn: "We can hear you, but your video is a bit laggy." },
          { speaker: "Host", line: "好的，我重新连接一下网络。", pinyin: "Hǎo de, wǒ chóngxīn liánjiē yíxià wǎngluò.", translationEn: "Okay, let me reconnect my internet." },
          { speaker: "Member", line: "现在好多了。", pinyin: "Xiànzài hǎo duō le.", translationEn: "It's much better now." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "远程办公", pinyin: "yuǎnchéng bàngōng", meaning: "remote work", meaningEn: "remote work", type: "phrase", example: "我现在远程办公。", examplePinyin: "Wǒ xiànzài yuǎnchéng bàngōng.", exampleVi: "I work remotely now.", exampleEn: "I work remotely now." },
      { hanzi: "视频会议", pinyin: "shìpín huìyì", meaning: "video meeting", meaningEn: "video conference", type: "phrase", example: "下午有视频会议。", examplePinyin: "Xiàwǔ yǒu shìpín huìyì.", exampleVi: "There's a video meeting this afternoon.", exampleEn: "There's a video meeting this afternoon." },
      { hanzi: "静音", pinyin: "jìngyīn", meaning: "mute", meaningEn: "to mute", type: "phrase", example: "请把麦克风静音。", examplePinyin: "Qǐng bǎ màikèfēng jìngyīn.", exampleVi: "Please mute your microphone.", exampleEn: "Please mute your microphone." },
      { hanzi: "屏幕", pinyin: "píngmù", meaning: "screen", meaningEn: "screen", type: "phrase", example: "我来分享屏幕。", examplePinyin: "Wǒ lái fēnxiǎng píngmù.", exampleVi: "Let me share my screen.", exampleEn: "Let me share my screen." },
      { hanzi: "网络", pinyin: "wǎngluò", meaning: "internet", meaningEn: "internet / network", type: "phrase", example: "网络不太稳定。", examplePinyin: "Wǎngluò bú tài wěndìng.", exampleVi: "The internet is unstable.", exampleEn: "The internet is unstable." },
      { hanzi: "卡", pinyin: "kǎ", meaning: "lag", meaningEn: "to lag / freeze", type: "slang", example: "画面有点卡。", examplePinyin: "Huàmiàn yǒu diǎn kǎ.", exampleVi: "The video is laggy.", exampleEn: "The video is laggy." },
      { hanzi: "在线", pinyin: "zàixiàn", meaning: "online", meaningEn: "online", type: "phrase", example: "我一直在线。", examplePinyin: "Wǒ yìzhí zàixiàn.", exampleVi: "I'm always online.", exampleEn: "I'm always online." },
      { hanzi: "效率", pinyin: "xiàolǜ", meaning: "efficiency", meaningEn: "efficiency", type: "phrase", example: "在家工作效率更高。", examplePinyin: "Zài jiā gōngzuò xiàolǜ gèng gāo.", exampleVi: "Working from home is more efficient.", exampleEn: "Working from home is more efficient." },
    ],
    commonStructures: [
      {
        pattern: "把 + Object + Verb",
        patternPinyin: "bǎ + Object + Verb",
        explanation: "Used to focus on what's being done to an object",
        explanationVi: "Used to focus on what's being done to an object",
        examples: [
          { zh: "请把摄像头打开。", pinyin: "Qǐng bǎ shèxiàngtóu dǎkāi.", vi: "Please turn on your camera.", en: "Please turn on your camera." },
          { zh: "把麦克风关掉。", pinyin: "Bǎ màikèfēng guāndiào.", vi: "Turn off the microphone.", en: "Turn off the microphone." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Remote Work Pros and Cons",
      titleVi: "Remote Work Pros and Cons",
      transcript: "我已经远程办公两年了。优点是省时间，不用通勤。缺点是有时候网络不稳定，开会时画面会卡。",
      transcriptPinyin: "Wǒ yǐjīng yuǎnchéng bàngōng liǎng nián le. Yōudiǎn shì shěng shíjiān, bú yòng tōngqín. Quēdiǎn shì yǒu shíhòu wǎngluò bù wěndìng, kāihuì shí huàmiàn huì kǎ.",
      transcriptEn: "I've been working remotely for two years. The advantage is saving time, no commute. The downside is sometimes the internet is unstable and the video lags during meetings.",
      questions: [
        { q: "How long has the speaker worked remotely?", qVi: "How long has the speaker worked remotely?", options: ["1 year", "2 years", "3 years", "5 years"], answer: 1 },
        { q: "What is the main downside?", qVi: "What is the main downside?", options: ["Boring", "Lonely", "Internet issues", "Pay cut"], answer: 2 },
      ],
    },
    speakingTopics: ["Compare remote work and office work", "Describe your home office setup"],
    fillInBlankExercises: [
      { sentence: "请把麦克风___。", pinyin: "Qǐng bǎ màikèfēng ___.", answer: "静音", translationVi: "Please mute the microphone.", translationEn: "Please mute the microphone." },
      { sentence: "画面有点___。", pinyin: "Huàmiàn yǒu diǎn ___.", answer: "卡", translationVi: "The video is a bit laggy.", translationEn: "The video is a bit laggy." },
      { sentence: "在家工作___更高。", pinyin: "Zài jiā gōngzuò ___ gèng gāo.", answer: "效率", translationVi: "Working from home is more efficient.", translationEn: "Working from home is more efficient." },
    ],
  },

  // ──── Lesson 15: Performance Reviews ────
  {
    id: "cn-bz-15-performance",
    title: "Performance Reviews & Feedback",
    titleVi: "Performance Reviews & Feedback",
    titleZh: "绩效评估",
    icon: "TrendingUp",
    description: "Discuss KPIs, give and receive feedback, and ask for raises",
    descriptionVi: "Discuss KPIs, give and receive feedback, and ask for raises",
    hskLevel: 5,
    badge: "Career Builder",
    badgeVi: "Career Builder",
    keySituations: [
      {
        title: "Year-End Review",
        titleVi: "Year-End Review",
        description: "Discussing performance with manager",
        descriptionVi: "Discussing performance with manager",
        sampleDialogue: [
          { speaker: "Manager", line: "你今年的表现非常出色，超额完成了KPI。", pinyin: "Nǐ jīnnián de biǎoxiàn fēicháng chūsè, chāo'é wánchéng le KPI.", translationEn: "Your performance this year was outstanding — you exceeded your KPIs." },
          { speaker: "Employee", line: "谢谢您的认可，我会继续努力。", pinyin: "Xièxie nín de rènkě, wǒ huì jìxù nǔlì.", translationEn: "Thank you for the recognition, I'll keep working hard." },
          { speaker: "Manager", line: "公司决定给你加薪百分之十五。", pinyin: "Gōngsī juédìng gěi nǐ jiā xīn bǎi fēn zhī shíwǔ.", translationEn: "The company has decided to give you a 15% raise." },
          { speaker: "Employee", line: "太感谢了！", pinyin: "Tài gǎnxiè le!", translationEn: "Thank you so much!" },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "表现", pinyin: "biǎoxiàn", meaning: "performance", meaningEn: "performance", type: "phrase", example: "他的表现很好。", examplePinyin: "Tā de biǎoxiàn hěn hǎo.", exampleVi: "His performance is good.", exampleEn: "His performance is good." },
      { hanzi: "绩效", pinyin: "jìxiào", meaning: "KPI", meaningEn: "performance / KPI", type: "phrase", example: "绩效考核很严格。", examplePinyin: "Jìxiào kǎohé hěn yángé.", exampleVi: "Performance review is strict.", exampleEn: "Performance review is strict." },
      { hanzi: "加薪", pinyin: "jiā xīn", meaning: "raise", meaningEn: "to raise salary", type: "phrase", example: "我想申请加薪。", examplePinyin: "Wǒ xiǎng shēnqǐng jiā xīn.", exampleVi: "I want to ask for a raise.", exampleEn: "I want to ask for a raise." },
      { hanzi: "晋升", pinyin: "jìnshēng", meaning: "promotion", meaningEn: "promotion", type: "phrase", example: "她得到了晋升。", examplePinyin: "Tā dédào le jìnshēng.", exampleVi: "She got a promotion.", exampleEn: "She got a promotion." },
      { hanzi: "反馈", pinyin: "fǎnkuì", meaning: "feedback", meaningEn: "feedback", type: "phrase", example: "请给我一些反馈。", examplePinyin: "Qǐng gěi wǒ yìxiē fǎnkuì.", exampleVi: "Please give me some feedback.", exampleEn: "Please give me some feedback." },
      { hanzi: "目标", pinyin: "mùbiāo", meaning: "goal", meaningEn: "goal / target", type: "phrase", example: "今年的目标完成了。", examplePinyin: "Jīnnián de mùbiāo wánchéng le.", exampleVi: "This year's goal is achieved.", exampleEn: "This year's goal is achieved." },
      { hanzi: "认可", pinyin: "rènkě", meaning: "recognition", meaningEn: "recognition / approval", type: "phrase", example: "得到老板的认可。", examplePinyin: "Dédào lǎobǎn de rènkě.", exampleVi: "Get the boss's recognition.", exampleEn: "Get the boss's recognition." },
      { hanzi: "改进", pinyin: "gǎijìn", meaning: "improve", meaningEn: "to improve", type: "phrase", example: "需要改进的地方还很多。", examplePinyin: "Xūyào gǎijìn de dìfāng hái hěn duō.", exampleVi: "There's still a lot to improve.", exampleEn: "There's still a lot to improve." },
    ],
    commonStructures: [
      {
        pattern: "超额 + 完成 + Goal",
        patternPinyin: "chāo'é + wánchéng + Goal",
        explanation: "Used to express exceeding a target",
        explanationVi: "Used to express exceeding a target",
        examples: [
          { zh: "我们超额完成了销售目标。", pinyin: "Wǒmen chāo'é wánchéng le xiāoshòu mùbiāo.", vi: "We exceeded the sales target.", en: "We exceeded the sales target." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Asking for a Raise",
      titleVi: "Asking for a Raise",
      transcript: "我在公司工作了三年，今年的表现也很好。我想跟老板谈一下加薪的事情，希望能得到百分之二十的提升。",
      transcriptPinyin: "Wǒ zài gōngsī gōngzuò le sān nián, jīnnián de biǎoxiàn yě hěn hǎo. Wǒ xiǎng gēn lǎobǎn tán yíxià jiā xīn de shìqíng, xīwàng néng dédào bǎi fēn zhī èrshí de tíshēng.",
      transcriptEn: "I've worked at the company for 3 years and my performance this year was good. I want to talk to my boss about a raise, hoping for a 20% increase.",
      questions: [
        { q: "How many years at the company?", qVi: "How many years at the company?", options: ["1", "2", "3", "5"], answer: 2 },
        { q: "What raise % is she hoping for?", qVi: "What raise % is she hoping for?", options: ["10%", "15%", "20%", "25%"], answer: 2 },
      ],
    },
    speakingTopics: ["Practice asking for a raise", "Give constructive feedback to a colleague"],
    fillInBlankExercises: [
      { sentence: "我想申请___。", pinyin: "Wǒ xiǎng shēnqǐng ___.", answer: "加薪", translationVi: "I want to request a raise.", translationEn: "I want to request a raise." },
      { sentence: "请给我一些___。", pinyin: "Qǐng gěi wǒ yìxiē ___.", answer: "反馈", translationVi: "Please give me some feedback.", translationEn: "Please give me some feedback." },
      { sentence: "她得到了___。", pinyin: "Tā dédào le ___.", answer: "晋升", translationVi: "She got a promotion.", translationEn: "She got a promotion." },
    ],
  },

  // ──── Lesson 16: Customer Service ────
  {
    id: "cn-bz-16-customer-service",
    title: "Customer Service",
    titleVi: "Customer Service",
    titleZh: "客户服务",
    icon: "Headphones",
    description: "Handle customer complaints, provide support, and build relationships",
    descriptionVi: "Handle customer complaints, provide support, and build relationships",
    hskLevel: 4,
    badge: "Service Star",
    badgeVi: "Service Star",
    keySituations: [
      {
        title: "Handling a Complaint",
        titleVi: "Handling a Complaint",
        description: "Apologizing and offering a solution",
        descriptionVi: "Apologizing and offering a solution",
        sampleDialogue: [
          { speaker: "Customer", line: "你们的产品有质量问题，我要退货。", pinyin: "Nǐmen de chǎnpǐn yǒu zhìliàng wèntí, wǒ yào tuìhuò.", translationEn: "Your product has a quality issue, I want to return it." },
          { speaker: "Service", line: "非常抱歉给您带来不便，我们会立刻处理。", pinyin: "Fēicháng bàoqiàn gěi nín dàilái bú biàn, wǒmen huì lìkè chǔlǐ.", translationEn: "We're very sorry for the inconvenience, we'll handle it immediately." },
          { speaker: "Customer", line: "什么时候能退款？", pinyin: "Shénme shíhòu néng tuìkuǎn?", translationEn: "When will I get my refund?" },
          { speaker: "Service", line: "三到五个工作日内退款到您的账户。", pinyin: "Sān dào wǔ ge gōngzuò rì nèi tuìkuǎn dào nín de zhànghù.", translationEn: "The refund will be sent to your account in 3-5 business days." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "客户", pinyin: "kèhù", meaning: "customer", meaningEn: "customer / client", type: "phrase", example: "客户至上。", examplePinyin: "Kèhù zhì shàng.", exampleVi: "Customer first.", exampleEn: "Customer first." },
      { hanzi: "投诉", pinyin: "tóusù", meaning: "complaint", meaningEn: "to complain", type: "phrase", example: "我要投诉这个服务。", examplePinyin: "Wǒ yào tóusù zhè ge fúwù.", exampleVi: "I want to complain about this service.", exampleEn: "I want to complain about this service." },
      { hanzi: "退货", pinyin: "tuìhuò", meaning: "return", meaningEn: "to return goods", type: "phrase", example: "可以退货吗？", examplePinyin: "Kěyǐ tuìhuò ma?", exampleVi: "Can I return it?", exampleEn: "Can I return it?" },
      { hanzi: "退款", pinyin: "tuìkuǎn", meaning: "refund", meaningEn: "refund", type: "phrase", example: "申请退款。", examplePinyin: "Shēnqǐng tuìkuǎn.", exampleVi: "Apply for a refund.", exampleEn: "Apply for a refund." },
      { hanzi: "质量", pinyin: "zhìliàng", meaning: "quality", meaningEn: "quality", type: "phrase", example: "质量很重要。", examplePinyin: "Zhìliàng hěn zhòngyào.", exampleVi: "Quality is important.", exampleEn: "Quality is important." },
      { hanzi: "处理", pinyin: "chǔlǐ", meaning: "handle", meaningEn: "to handle / deal with", type: "phrase", example: "我们立刻处理。", examplePinyin: "Wǒmen lìkè chǔlǐ.", exampleVi: "We'll handle it immediately.", exampleEn: "We'll handle it immediately." },
      { hanzi: "抱歉", pinyin: "bàoqiàn", meaning: "sorry", meaningEn: "sorry / apologize", type: "expression", example: "非常抱歉。", examplePinyin: "Fēicháng bàoqiàn.", exampleVi: "Very sorry.", exampleEn: "Very sorry." },
      { hanzi: "满意", pinyin: "mǎnyì", meaning: "satisfied", meaningEn: "satisfied", type: "phrase", example: "客户很满意。", examplePinyin: "Kèhù hěn mǎnyì.", exampleVi: "The customer is satisfied.", exampleEn: "The customer is satisfied." },
    ],
    commonStructures: [
      {
        pattern: "给您带来 + 不便",
        patternPinyin: "gěi nín dàilái + bú biàn",
        explanation: "Polite apology formula: 'sorry for the inconvenience caused'",
        explanationVi: "Polite apology formula",
        examples: [
          { zh: "非常抱歉给您带来不便。", pinyin: "Fēicháng bàoqiàn gěi nín dàilái bú biàn.", vi: "Very sorry for the inconvenience caused.", en: "Very sorry for the inconvenience caused." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Customer Service Call",
      titleVi: "Customer Service Call",
      transcript: "您好，我上周买的手机有问题，开机后屏幕一直闪。我希望能换一台新的，或者全额退款。",
      transcriptPinyin: "Nín hǎo, wǒ shàng zhōu mǎi de shǒujī yǒu wèntí, kāijī hòu píngmù yìzhí shǎn. Wǒ xīwàng néng huàn yì tái xīn de, huòzhě quán'é tuìkuǎn.",
      transcriptEn: "Hello, the phone I bought last week has issues — the screen keeps flickering after powering on. I'd like to exchange it for a new one or get a full refund.",
      questions: [
        { q: "What's the problem?", qVi: "What's the problem?", options: ["Battery dies", "Screen flickers", "No sound", "Won't turn on"], answer: 1 },
        { q: "What does the customer want?", qVi: "What does the customer want?", options: ["Repair", "Discount", "Exchange or refund", "Apology"], answer: 2 },
      ],
    },
    speakingTopics: ["Role-play a customer complaint", "Practice apologizing professionally"],
    fillInBlankExercises: [
      { sentence: "我要___这个服务。", pinyin: "Wǒ yào ___ zhè ge fúwù.", answer: "投诉", translationVi: "I want to complain about this service.", translationEn: "I want to complain about this service." },
      { sentence: "申请___。", pinyin: "Shēnqǐng ___.", answer: "退款", translationVi: "Apply for a refund.", translationEn: "Apply for a refund." },
      { sentence: "我们立刻___。", pinyin: "Wǒmen lìkè ___.", answer: "处理", translationVi: "We'll handle it immediately.", translationEn: "We'll handle it immediately." },
    ],
  },

  // ──── Lesson 17: Cross-Cultural Business ────
  {
    id: "cn-bz-17-cross-cultural",
    title: "Cross-Cultural Business",
    titleVi: "Cross-Cultural Business",
    titleZh: "跨文化商务",
    icon: "Globe",
    description: "Navigate guanxi, business banquets, and cross-cultural etiquette",
    descriptionVi: "Navigate guanxi, business banquets, and cross-cultural etiquette",
    hskLevel: 5,
    badge: "Cultural Bridge",
    badgeVi: "Cultural Bridge",
    keySituations: [
      {
        title: "Business Banquet Toast",
        titleVi: "Business Banquet Toast",
        description: "Toasting at a Chinese business dinner",
        descriptionVi: "Toasting at a Chinese business dinner",
        culturalNote: "At Chinese business banquets, the host toasts first. When clinking glasses with seniors, lower your glass slightly to show respect. 干杯 (gān bēi) means 'dry the cup' (bottoms up).",
        culturalNoteVi: "At Chinese business banquets, the host toasts first.",
        sampleDialogue: [
          { speaker: "Host", line: "为了我们的合作，干杯！", pinyin: "Wèile wǒmen de hézuò, gān bēi!", translationEn: "To our cooperation, cheers!" },
          { speaker: "Guest", line: "干杯！合作愉快！", pinyin: "Gān bēi! Hézuò yúkuài!", translationEn: "Cheers! Pleasant cooperation!" },
          { speaker: "Host", line: "请尝尝我们的特色菜。", pinyin: "Qǐng chángchang wǒmen de tèsè cài.", translationEn: "Please try our specialty dishes." },
          { speaker: "Guest", line: "谢谢，看起来很美味。", pinyin: "Xièxie, kàn qǐlái hěn měiwèi.", translationEn: "Thank you, it looks delicious." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "关系", pinyin: "guānxì", meaning: "guanxi", meaningEn: "guanxi / connections", type: "phrase", example: "在中国关系很重要。", examplePinyin: "Zài Zhōngguó guānxì hěn zhòngyào.", exampleVi: "In China, guanxi is important.", exampleEn: "In China, guanxi is important." },
      { hanzi: "面子", pinyin: "miànzi", meaning: "face", meaningEn: "face / honor", type: "phrase", example: "给他一点面子。", examplePinyin: "Gěi tā yìdiǎn miànzi.", exampleVi: "Give him some face.", exampleEn: "Give him some face." },
      { hanzi: "应酬", pinyin: "yìngchóu", meaning: "social engagement", meaningEn: "social/business engagement", type: "phrase", example: "今晚有应酬。", examplePinyin: "Jīnwǎn yǒu yìngchóu.", exampleVi: "I have a business dinner tonight.", exampleEn: "I have a business dinner tonight." },
      { hanzi: "干杯", pinyin: "gān bēi", meaning: "cheers", meaningEn: "cheers / bottoms up", type: "expression", example: "干杯！", examplePinyin: "Gān bēi!", exampleVi: "Cheers!", exampleEn: "Cheers!" },
      { hanzi: "敬酒", pinyin: "jìng jiǔ", meaning: "toast", meaningEn: "to propose a toast", type: "phrase", example: "我来敬您一杯。", examplePinyin: "Wǒ lái jìng nín yì bēi.", exampleVi: "Let me toast you.", exampleEn: "Let me toast you." },
      { hanzi: "礼物", pinyin: "lǐwù", meaning: "gift", meaningEn: "gift", type: "phrase", example: "送礼物表示感谢。", examplePinyin: "Sòng lǐwù biǎoshì gǎnxiè.", exampleVi: "Give a gift to show gratitude.", exampleEn: "Give a gift to show gratitude." },
      { hanzi: "礼仪", pinyin: "lǐyí", meaning: "etiquette", meaningEn: "etiquette / protocol", type: "phrase", example: "商务礼仪很重要。", examplePinyin: "Shāngwù lǐyí hěn zhòngyào.", exampleVi: "Business etiquette is important.", exampleEn: "Business etiquette is important." },
      { hanzi: "尊重", pinyin: "zūnzhòng", meaning: "respect", meaningEn: "to respect", type: "phrase", example: "互相尊重。", examplePinyin: "Hùxiāng zūnzhòng.", exampleVi: "Respect each other.", exampleEn: "Respect each other." },
    ],
    commonStructures: [
      {
        pattern: "为了 + Goal + 干杯",
        patternPinyin: "wèile + Goal + gān bēi",
        explanation: "Toast formula: 'To [goal], cheers!'",
        explanationVi: "Toast formula",
        examples: [
          { zh: "为了我们的友谊，干杯！", pinyin: "Wèile wǒmen de yǒuyì, gān bēi!", vi: "To our friendship, cheers!", en: "To our friendship, cheers!" },
          { zh: "为了成功，干杯！", pinyin: "Wèile chénggōng, gān bēi!", vi: "To success, cheers!", en: "To success, cheers!" },
        ],
      },
    ],
    listeningChallenge: {
      title: "Doing Business in China",
      titleVi: "Doing Business in China",
      transcript: "在中国做生意，关系和面子非常重要。建立信任需要时间，吃饭、喝酒、送礼都是建立关系的方式。",
      transcriptPinyin: "Zài Zhōngguó zuò shēngyì, guānxì hé miànzi fēicháng zhòngyào. Jiànlì xìnrèn xūyào shíjiān, chīfàn, hē jiǔ, sòng lǐ dōu shì jiànlì guānxì de fāngshì.",
      transcriptEn: "Doing business in China, guanxi and face are extremely important. Building trust takes time — eating together, drinking, and gift-giving are all ways to build relationships.",
      questions: [
        { q: "What's most important in Chinese business?", qVi: "What's most important in Chinese business?", options: ["Speed", "Price", "Guanxi & face", "Quality"], answer: 2 },
        { q: "How do you build trust?", qVi: "How do you build trust?", options: ["Quickly", "Through time and shared activities", "By signing contracts", "Through emails"], answer: 1 },
      ],
    },
    speakingTopics: ["Compare business culture in China and your country", "Practice making a business toast"],
    fillInBlankExercises: [
      { sentence: "在中国___很重要。", pinyin: "Zài Zhōngguó ___ hěn zhòngyào.", answer: "关系", translationVi: "In China, guanxi is important.", translationEn: "In China, guanxi is important." },
      { sentence: "为了我们的合作，___！", pinyin: "Wèile wǒmen de hézuò, ___!", answer: "干杯", translationVi: "To our cooperation, cheers!", translationEn: "To our cooperation, cheers!" },
      { sentence: "商务___很重要。", pinyin: "Shāngwù ___ hěn zhòngyào.", answer: "礼仪", translationVi: "Business etiquette is important.", translationEn: "Business etiquette is important." },
    ],
  },
];

export const socialExpansion: ChineseConvLesson[] = [
  // ──── Lesson 14: Music & Concerts ────
  {
    id: "cn-sc-14-music",
    title: "Music & Concerts",
    titleVi: "Music & Concerts",
    titleZh: "音乐演唱会",
    icon: "Music",
    description: "Discuss favorite genres, attend concerts, and recommend songs",
    descriptionVi: "Discuss favorite genres, attend concerts, and recommend songs",
    hskLevel: 3,
    badge: "Music Lover",
    badgeVi: "Music Lover",
    keySituations: [
      {
        title: "Talking About Music Taste",
        titleVi: "Talking About Music Taste",
        description: "Sharing favorite singers and genres",
        descriptionVi: "Sharing favorite singers and genres",
        sampleDialogue: [
          { speaker: "A", line: "你最喜欢什么类型的音乐？", pinyin: "Nǐ zuì xǐhuān shénme lèixíng de yīnyuè?", translationEn: "What kind of music do you like most?" },
          { speaker: "B", line: "我喜欢流行音乐，特别是周杰伦的歌。", pinyin: "Wǒ xǐhuān liúxíng yīnyuè, tèbié shì Zhōu Jiélún de gē.", translationEn: "I like pop music, especially Jay Chou's songs." },
          { speaker: "A", line: "他的演唱会我也去过，超级精彩！", pinyin: "Tā de yǎnchànghuì wǒ yě qù guò, chāojí jīngcǎi!", translationEn: "I've been to his concert too — super amazing!" },
        ],
      },
      {
        title: "Buying Concert Tickets",
        titleVi: "Buying Concert Tickets",
        description: "Discussing ticket prices and seats",
        descriptionVi: "Discussing ticket prices and seats",
        sampleDialogue: [
          { speaker: "A", line: "下个月的演唱会门票卖得很快。", pinyin: "Xià ge yuè de yǎnchànghuì ménpiào mài de hěn kuài.", translationEn: "Next month's concert tickets are selling fast." },
          { speaker: "B", line: "我抢到了第三排，太幸运了！", pinyin: "Wǒ qiǎng dào le dì sān pái, tài xìngyùn le!", translationEn: "I grabbed third row tickets — so lucky!" },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "音乐", pinyin: "yīnyuè", meaning: "music", meaningEn: "music", type: "phrase", example: "我每天听音乐。", examplePinyin: "Wǒ měi tiān tīng yīnyuè.", exampleVi: "I listen to music every day.", exampleEn: "I listen to music every day." },
      { hanzi: "歌手", pinyin: "gēshǒu", meaning: "singer", meaningEn: "singer", type: "phrase", example: "她是有名的歌手。", examplePinyin: "Tā shì yǒumíng de gēshǒu.", exampleVi: "She's a famous singer.", exampleEn: "She's a famous singer." },
      { hanzi: "演唱会", pinyin: "yǎnchànghuì", meaning: "concert", meaningEn: "concert", type: "phrase", example: "这场演唱会很棒。", examplePinyin: "Zhè chǎng yǎnchànghuì hěn bàng.", exampleVi: "This concert is great.", exampleEn: "This concert is great." },
      { hanzi: "流行", pinyin: "liúxíng", meaning: "pop", meaningEn: "popular / pop", type: "phrase", example: "这首歌很流行。", examplePinyin: "Zhè shǒu gē hěn liúxíng.", exampleVi: "This song is popular.", exampleEn: "This song is popular." },
      { hanzi: "门票", pinyin: "ménpiào", meaning: "ticket", meaningEn: "entrance ticket", type: "phrase", example: "门票多少钱？", examplePinyin: "Ménpiào duōshǎo qián?", exampleVi: "How much is the ticket?", exampleEn: "How much is the ticket?" },
      { hanzi: "抢", pinyin: "qiǎng", meaning: "grab", meaningEn: "to grab / snap up", type: "slang", example: "我抢到了门票。", examplePinyin: "Wǒ qiǎng dào le ménpiào.", exampleVi: "I grabbed a ticket.", exampleEn: "I grabbed a ticket." },
      { hanzi: "现场", pinyin: "xiànchǎng", meaning: "live", meaningEn: "live / on-site", type: "phrase", example: "现场气氛很好。", examplePinyin: "Xiànchǎng qìfēn hěn hǎo.", exampleVi: "The live atmosphere is great.", exampleEn: "The live atmosphere is great." },
      { hanzi: "粉丝", pinyin: "fěnsī", meaning: "fan", meaningEn: "fan", type: "slang", example: "我是她的粉丝。", examplePinyin: "Wǒ shì tā de fěnsī.", exampleVi: "I'm her fan.", exampleEn: "I'm her fan." },
    ],
    commonStructures: [
      {
        pattern: "特别 + 喜欢 + Object",
        patternPinyin: "tèbié + xǐhuān + Object",
        explanation: "Used to express strong preference",
        explanationVi: "Used to express strong preference",
        examples: [
          { zh: "我特别喜欢摇滚乐。", pinyin: "Wǒ tèbié xǐhuān yáogǔn yuè.", vi: "I especially like rock music.", en: "I especially like rock music." },
        ],
      },
    ],
    listeningChallenge: {
      title: "A Concert Experience",
      titleVi: "A Concert Experience",
      transcript: "上周末我去看了周杰伦的演唱会。门票是我提前一个月抢的，第五排，超级近！现场有三万多个粉丝，气氛特别热烈。",
      transcriptPinyin: "Shàng zhōumò wǒ qù kàn le Zhōu Jiélún de yǎnchànghuì. Ménpiào shì wǒ tíqián yí ge yuè qiǎng de, dì wǔ pái, chāojí jìn! Xiànchǎng yǒu sān wàn duō ge fěnsī, qìfēn tèbié rèliè.",
      transcriptEn: "Last weekend I went to a Jay Chou concert. I grabbed the tickets a month in advance — 5th row, super close! There were over 30,000 fans, and the atmosphere was extremely lively.",
      questions: [
        { q: "Whose concert?", qVi: "Whose concert?", options: ["Jay Chou", "JJ Lin", "Faye Wong", "Eason Chan"], answer: 0 },
        { q: "How many fans?", qVi: "How many fans?", options: ["10,000+", "20,000+", "30,000+", "50,000+"], answer: 2 },
      ],
    },
    speakingTopics: ["Describe your favorite singer or band", "Talk about a memorable concert experience"],
    fillInBlankExercises: [
      { sentence: "我喜欢___音乐。", pinyin: "Wǒ xǐhuān ___ yīnyuè.", answer: "流行", translationVi: "I like pop music.", translationEn: "I like pop music." },
      { sentence: "我___到了门票。", pinyin: "Wǒ ___ dào le ménpiào.", answer: "抢", translationVi: "I grabbed a ticket.", translationEn: "I grabbed a ticket." },
      { sentence: "我是她的___。", pinyin: "Wǒ shì tā de ___.", answer: "粉丝", translationVi: "I'm her fan.", translationEn: "I'm her fan." },
    ],
  },

  // ──── Lesson 15: Books & Reading ────
  {
    id: "cn-sc-15-books",
    title: "Books & Reading",
    titleVi: "Books & Reading",
    titleZh: "书与阅读",
    icon: "Book",
    description: "Recommend books, discuss authors, and share reading habits",
    descriptionVi: "Recommend books, discuss authors, and share reading habits",
    hskLevel: 4,
    badge: "Bookworm",
    badgeVi: "Bookworm",
    keySituations: [
      {
        title: "Recommending a Book",
        titleVi: "Recommending a Book",
        description: "Sharing a favorite read with a friend",
        descriptionVi: "Sharing a favorite read with a friend",
        sampleDialogue: [
          { speaker: "A", line: "最近有什么好书推荐吗？", pinyin: "Zuìjìn yǒu shénme hǎo shū tuījiàn ma?", translationEn: "Got any good book recommendations recently?" },
          { speaker: "B", line: "我刚看完《活着》，余华写的，非常震撼。", pinyin: "Wǒ gāng kàn wán 《Huózhe》, Yú Huá xiě de, fēicháng zhènhàn.", translationEn: "I just finished 'To Live' by Yu Hua — really moving." },
          { speaker: "A", line: "听起来很有意思，借我看看？", pinyin: "Tīng qǐlái hěn yǒu yìsi, jiè wǒ kànkan?", translationEn: "Sounds interesting — can I borrow it?" },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "书", pinyin: "shū", meaning: "book", meaningEn: "book", type: "phrase", example: "我喜欢看书。", examplePinyin: "Wǒ xǐhuān kàn shū.", exampleVi: "I like reading.", exampleEn: "I like reading." },
      { hanzi: "小说", pinyin: "xiǎoshuō", meaning: "novel", meaningEn: "novel", type: "phrase", example: "这本小说很有名。", examplePinyin: "Zhè běn xiǎoshuō hěn yǒumíng.", exampleVi: "This novel is famous.", exampleEn: "This novel is famous." },
      { hanzi: "作者", pinyin: "zuòzhě", meaning: "author", meaningEn: "author", type: "phrase", example: "作者是中国人。", examplePinyin: "Zuòzhě shì Zhōngguó rén.", exampleVi: "The author is Chinese.", exampleEn: "The author is Chinese." },
      { hanzi: "推荐", pinyin: "tuījiàn", meaning: "recommend", meaningEn: "to recommend", type: "phrase", example: "推荐一本书。", examplePinyin: "Tuījiàn yì běn shū.", exampleVi: "Recommend a book.", exampleEn: "Recommend a book." },
      { hanzi: "情节", pinyin: "qíngjié", meaning: "plot", meaningEn: "plot", type: "phrase", example: "情节很精彩。", examplePinyin: "Qíngjié hěn jīngcǎi.", exampleVi: "The plot is exciting.", exampleEn: "The plot is exciting." },
      { hanzi: "图书馆", pinyin: "túshūguǎn", meaning: "library", meaningEn: "library", type: "phrase", example: "图书馆很安静。", examplePinyin: "Túshūguǎn hěn ānjìng.", exampleVi: "The library is quiet.", exampleEn: "The library is quiet." },
      { hanzi: "读书", pinyin: "dúshū", meaning: "read", meaningEn: "to read / study", type: "phrase", example: "我每天读书一小时。", examplePinyin: "Wǒ měi tiān dúshū yì xiǎoshí.", exampleVi: "I read for an hour every day.", exampleEn: "I read for an hour every day." },
      { hanzi: "电子书", pinyin: "diànzǐ shū", meaning: "e-book", meaningEn: "e-book", type: "phrase", example: "我用Kindle看电子书。", examplePinyin: "Wǒ yòng Kindle kàn diànzǐ shū.", exampleVi: "I use Kindle to read e-books.", exampleEn: "I use Kindle to read e-books." },
    ],
    commonStructures: [
      {
        pattern: "刚 + Verb + 完",
        patternPinyin: "gāng + Verb + wán",
        explanation: "Just finished doing something",
        explanationVi: "Just finished doing something",
        examples: [
          { zh: "我刚看完一本书。", pinyin: "Wǒ gāng kàn wán yì běn shū.", vi: "I just finished a book.", en: "I just finished a book." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Reading Habits",
      titleVi: "Reading Habits",
      transcript: "我每天晚上睡觉前会看半小时的书。我最喜欢看历史小说，已经看了一百多本。最近开始尝试用电子书，更方便。",
      transcriptPinyin: "Wǒ měi tiān wǎnshang shuìjiào qián huì kàn bàn xiǎoshí de shū. Wǒ zuì xǐhuān kàn lìshǐ xiǎoshuō, yǐjīng kàn le yìbǎi duō běn. Zuìjìn kāishǐ chángshì yòng diànzǐ shū, gèng fāngbiàn.",
      transcriptEn: "I read for half an hour every night before sleep. I love historical novels — I've read over 100. Recently I started trying e-books — much more convenient.",
      questions: [
        { q: "How long does she read each night?", qVi: "How long does she read each night?", options: ["15 min", "30 min", "1 hour", "2 hours"], answer: 1 },
        { q: "Favorite genre?", qVi: "Favorite genre?", options: ["Romance", "Sci-fi", "Historical", "Mystery"], answer: 2 },
      ],
    },
    speakingTopics: ["Recommend your favorite book", "Compare paper books and e-books"],
    fillInBlankExercises: [
      { sentence: "这本___很有名。", pinyin: "Zhè běn ___ hěn yǒumíng.", answer: "小说", translationVi: "This novel is famous.", translationEn: "This novel is famous." },
      { sentence: "请___一本书。", pinyin: "Qǐng ___ yì běn shū.", answer: "推荐", translationVi: "Please recommend a book.", translationEn: "Please recommend a book." },
      { sentence: "___很安静。", pinyin: "___ hěn ānjìng.", answer: "图书馆", translationVi: "The library is quiet.", translationEn: "The library is quiet." },
    ],
  },

  // ──── Lesson 16: Health & Wellness ────
  {
    id: "cn-sc-16-wellness",
    title: "Health & Wellness",
    titleVi: "Health & Wellness",
    titleZh: "健康养生",
    icon: "Heart",
    description: "Discuss diet, exercise, mental health, and Chinese wellness traditions",
    descriptionVi: "Discuss diet, exercise, mental health, and Chinese wellness traditions",
    hskLevel: 4,
    badge: "Wellness Guru",
    badgeVi: "Wellness Guru",
    keySituations: [
      {
        title: "Talking About Healthy Lifestyle",
        titleVi: "Talking About Healthy Lifestyle",
        description: "Sharing wellness tips with a friend",
        descriptionVi: "Sharing wellness tips with a friend",
        culturalNote: "Traditional Chinese Medicine (中医) emphasizes balance — 阴阳 (yin/yang) and the five elements. Drinking hot water is a common health practice.",
        culturalNoteVi: "Traditional Chinese Medicine emphasizes balance.",
        sampleDialogue: [
          { speaker: "A", line: "你怎么保持身材这么好？", pinyin: "Nǐ zěnme bǎochí shēncái zhème hǎo?", translationEn: "How do you stay in such good shape?" },
          { speaker: "B", line: "我每天健身，少吃油腻的食物。", pinyin: "Wǒ měi tiān jiànshēn, shǎo chī yóunì de shíwù.", translationEn: "I work out every day and eat less greasy food." },
          { speaker: "A", line: "我也想开始健康生活。", pinyin: "Wǒ yě xiǎng kāishǐ jiànkāng shēnghuó.", translationEn: "I also want to start a healthy lifestyle." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "健康", pinyin: "jiànkāng", meaning: "health", meaningEn: "health / healthy", type: "phrase", example: "健康最重要。", examplePinyin: "Jiànkāng zuì zhòngyào.", exampleVi: "Health is most important.", exampleEn: "Health is most important." },
      { hanzi: "健身", pinyin: "jiànshēn", meaning: "fitness", meaningEn: "fitness / work out", type: "phrase", example: "我每天健身。", examplePinyin: "Wǒ měi tiān jiànshēn.", exampleVi: "I work out every day.", exampleEn: "I work out every day." },
      { hanzi: "营养", pinyin: "yíngyǎng", meaning: "nutrition", meaningEn: "nutrition", type: "phrase", example: "注意营养均衡。", examplePinyin: "Zhùyì yíngyǎng jūnhéng.", exampleVi: "Pay attention to balanced nutrition.", exampleEn: "Pay attention to balanced nutrition." },
      { hanzi: "瑜伽", pinyin: "yújiā", meaning: "yoga", meaningEn: "yoga", type: "phrase", example: "瑜伽可以放松身心。", examplePinyin: "Yújiā kěyǐ fàngsōng shēnxīn.", exampleVi: "Yoga relaxes body and mind.", exampleEn: "Yoga relaxes body and mind." },
      { hanzi: "减肥", pinyin: "jiǎnféi", meaning: "lose weight", meaningEn: "to lose weight", type: "phrase", example: "我在减肥。", examplePinyin: "Wǒ zài jiǎnféi.", exampleVi: "I'm losing weight.", exampleEn: "I'm losing weight." },
      { hanzi: "心理", pinyin: "xīnlǐ", meaning: "mental", meaningEn: "mental / psychological", type: "phrase", example: "心理健康也很重要。", examplePinyin: "Xīnlǐ jiànkāng yě hěn zhòngyào.", exampleVi: "Mental health is important too.", exampleEn: "Mental health is important too." },
      { hanzi: "压力", pinyin: "yālì", meaning: "stress", meaningEn: "pressure / stress", type: "phrase", example: "工作压力太大。", examplePinyin: "Gōngzuò yālì tài dà.", exampleVi: "Work stress is too much.", exampleEn: "Work stress is too much." },
      { hanzi: "中医", pinyin: "zhōngyī", meaning: "TCM", meaningEn: "Traditional Chinese Medicine", type: "phrase", example: "我相信中医。", examplePinyin: "Wǒ xiāngxìn zhōngyī.", exampleVi: "I believe in TCM.", exampleEn: "I believe in TCM." },
    ],
    commonStructures: [
      {
        pattern: "少 / 多 + Verb",
        patternPinyin: "shǎo / duō + Verb",
        explanation: "Less / more (do something) — used for advice",
        explanationVi: "Less / more — for advice",
        examples: [
          { zh: "少吃油，多喝水。", pinyin: "Shǎo chī yóu, duō hē shuǐ.", vi: "Eat less oil, drink more water.", en: "Eat less oil, drink more water." },
          { zh: "多运动，少熬夜。", pinyin: "Duō yùndòng, shǎo áoyè.", vi: "Exercise more, stay up less.", en: "Exercise more, stay up less." },
        ],
      },
    ],
    listeningChallenge: {
      title: "My Wellness Routine",
      titleVi: "My Wellness Routine",
      transcript: "为了保持健康，我每周三次健身房，每天做半小时瑜伽。饮食方面少盐少糖，多吃蔬菜水果。睡眠也很重要，晚上十一点前睡觉。",
      transcriptPinyin: "Wèile bǎochí jiànkāng, wǒ měi zhōu sān cì jiànshēnfáng, měi tiān zuò bàn xiǎoshí yújiā. Yǐnshí fāngmiàn shǎo yán shǎo táng, duō chī shūcài shuǐguǒ. Shuìmián yě hěn zhòngyào, wǎnshang shíyī diǎn qián shuìjiào.",
      transcriptEn: "To stay healthy, I go to the gym 3x per week and do yoga for 30 min daily. For diet, less salt and sugar, more vegetables and fruit. Sleep matters too — I go to bed before 11pm.",
      questions: [
        { q: "How often does she go to the gym?", qVi: "How often does she go to the gym?", options: ["1x/week", "2x/week", "3x/week", "Daily"], answer: 2 },
        { q: "When does she sleep?", qVi: "When does she sleep?", options: ["Before 10", "Before 11", "Before 12", "After 12"], answer: 1 },
      ],
    },
    speakingTopics: ["Describe your wellness routine", "Discuss the importance of mental health"],
    fillInBlankExercises: [
      { sentence: "___最重要。", pinyin: "___ zuì zhòngyào.", answer: "健康", translationVi: "Health is most important.", translationEn: "Health is most important." },
      { sentence: "工作___太大。", pinyin: "Gōngzuò ___ tài dà.", answer: "压力", translationVi: "Work stress is too much.", translationEn: "Work stress is too much." },
      { sentence: "我相信___。", pinyin: "Wǒ xiāngxìn ___.", answer: "中医", translationVi: "I believe in TCM.", translationEn: "I believe in TCM." },
    ],
  },

  // ──── Lesson 17: Travel & Adventure ────
  {
    id: "cn-sc-17-adventure",
    title: "Travel & Adventure",
    titleVi: "Travel & Adventure",
    titleZh: "旅行冒险",
    icon: "Mountain",
    description: "Share travel stories, plan adventures, and discuss bucket lists",
    descriptionVi: "Share travel stories, plan adventures, and discuss bucket lists",
    hskLevel: 4,
    badge: "Adventurer",
    badgeVi: "Adventurer",
    keySituations: [
      {
        title: "Sharing a Travel Story",
        titleVi: "Sharing a Travel Story",
        description: "Telling a friend about a recent trip",
        descriptionVi: "Telling a friend about a recent trip",
        sampleDialogue: [
          { speaker: "A", line: "你去过哪些地方？", pinyin: "Nǐ qù guò nǎxiē dìfāng?", translationEn: "What places have you been to?" },
          { speaker: "B", line: "我去过日本、泰国、还有欧洲几个国家。", pinyin: "Wǒ qù guò Rìběn, Tàiguó, hái yǒu Ōuzhōu jǐ ge guójiā.", translationEn: "I've been to Japan, Thailand, and several European countries." },
          { speaker: "A", line: "最难忘的是哪次旅行？", pinyin: "Zuì nánwàng de shì nǎ cì lǚxíng?", translationEn: "What was your most memorable trip?" },
          { speaker: "B", line: "去西藏的那次，风景太壮观了。", pinyin: "Qù Xīzàng de nà cì, fēngjǐng tài zhuàngguān le.", translationEn: "The trip to Tibet — the scenery was magnificent." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "旅行", pinyin: "lǚxíng", meaning: "travel", meaningEn: "to travel", type: "phrase", example: "我喜欢旅行。", examplePinyin: "Wǒ xǐhuān lǚxíng.", exampleVi: "I love traveling.", exampleEn: "I love traveling." },
      { hanzi: "冒险", pinyin: "màoxiǎn", meaning: "adventure", meaningEn: "adventure", type: "phrase", example: "我喜欢冒险。", examplePinyin: "Wǒ xǐhuān màoxiǎn.", exampleVi: "I love adventure.", exampleEn: "I love adventure." },
      { hanzi: "背包客", pinyin: "bēibāokè", meaning: "backpacker", meaningEn: "backpacker", type: "slang", example: "他是个背包客。", examplePinyin: "Tā shì ge bēibāokè.", exampleVi: "He's a backpacker.", exampleEn: "He's a backpacker." },
      { hanzi: "目的地", pinyin: "mùdìdì", meaning: "destination", meaningEn: "destination", type: "phrase", example: "我们的目的地是西安。", examplePinyin: "Wǒmen de mùdìdì shì Xī'ān.", exampleVi: "Our destination is Xi'an.", exampleEn: "Our destination is Xi'an." },
      { hanzi: "护照", pinyin: "hùzhào", meaning: "passport", meaningEn: "passport", type: "phrase", example: "护照不能丢。", examplePinyin: "Hùzhào bù néng diū.", exampleVi: "Don't lose your passport.", exampleEn: "Don't lose your passport." },
      { hanzi: "壮观", pinyin: "zhuàngguān", meaning: "magnificent", meaningEn: "magnificent / spectacular", type: "phrase", example: "瀑布很壮观。", examplePinyin: "Pùbù hěn zhuàngguān.", exampleVi: "The waterfall is magnificent.", exampleEn: "The waterfall is magnificent." },
      { hanzi: "难忘", pinyin: "nánwàng", meaning: "unforgettable", meaningEn: "unforgettable", type: "phrase", example: "那是难忘的经历。", examplePinyin: "Nà shì nánwàng de jīnglì.", exampleVi: "That was an unforgettable experience.", exampleEn: "That was an unforgettable experience." },
      { hanzi: "高原", pinyin: "gāoyuán", meaning: "plateau", meaningEn: "plateau / highland", type: "phrase", example: "西藏在高原。", examplePinyin: "Xīzàng zài gāoyuán.", exampleVi: "Tibet is on a plateau.", exampleEn: "Tibet is on a plateau." },
    ],
    commonStructures: [
      {
        pattern: "Subject + 去过 + Place",
        patternPinyin: "Subject + qù guò + Place",
        explanation: "Used to express experience of visiting somewhere",
        explanationVi: "Used to express experience of visiting somewhere",
        examples: [
          { zh: "我去过长城。", pinyin: "Wǒ qù guò Chángchéng.", vi: "I've been to the Great Wall.", en: "I've been to the Great Wall." },
          { zh: "他没去过日本。", pinyin: "Tā méi qù guò Rìběn.", vi: "He's never been to Japan.", en: "He's never been to Japan." },
        ],
      },
    ],
    listeningChallenge: {
      title: "Backpacking in Tibet",
      titleVi: "Backpacking in Tibet",
      transcript: "去年我和两个朋友去西藏背包旅行了三个星期。我们坐火车从北京出发，到拉萨花了四十多个小时。高原反应很厉害，但是风景太美了。",
      transcriptPinyin: "Qùnián wǒ hé liǎng ge péngyǒu qù Xīzàng bēibāo lǚxíng le sān ge xīngqī. Wǒmen zuò huǒchē cóng Běijīng chūfā, dào Lāsà huā le sìshí duō ge xiǎoshí. Gāoyuán fǎnyìng hěn lìhài, dànshì fēngjǐng tài měi le.",
      transcriptEn: "Last year I went backpacking in Tibet with 2 friends for 3 weeks. We took the train from Beijing — it took over 40 hours to reach Lhasa. Altitude sickness was tough, but the scenery was breathtaking.",
      questions: [
        { q: "How long was the trip?", qVi: "How long was the trip?", options: ["1 week", "2 weeks", "3 weeks", "1 month"], answer: 2 },
        { q: "How long did the train take?", qVi: "How long did the train take?", options: ["20+ hours", "30+ hours", "40+ hours", "50+ hours"], answer: 2 },
      ],
    },
    speakingTopics: ["Describe your dream travel destination", "Tell about an adventurous trip"],
    fillInBlankExercises: [
      { sentence: "我喜欢___。", pinyin: "Wǒ xǐhuān ___.", answer: "旅行", translationVi: "I love traveling.", translationEn: "I love traveling." },
      { sentence: "瀑布很___。", pinyin: "Pùbù hěn ___.", answer: "壮观", translationVi: "The waterfall is magnificent.", translationEn: "The waterfall is magnificent." },
      { sentence: "那是___的经历。", pinyin: "Nà shì ___ de jīnglì.", answer: "难忘", translationVi: "That was an unforgettable experience.", translationEn: "That was an unforgettable experience." },
    ],
  },

  // ──── Lesson 18: Future Dreams & Goals ────
  {
    id: "cn-sc-18-dreams",
    title: "Future Dreams & Goals",
    titleVi: "Future Dreams & Goals",
    titleZh: "梦想与目标",
    icon: "Star",
    description: "Talk about life goals, career dreams, and bucket list items",
    descriptionVi: "Talk about life goals, career dreams, and bucket list items",
    hskLevel: 4,
    badge: "Dreamer",
    badgeVi: "Dreamer",
    keySituations: [
      {
        title: "Sharing Dreams",
        titleVi: "Sharing Dreams",
        description: "Discussing life goals over coffee",
        descriptionVi: "Discussing life goals over coffee",
        sampleDialogue: [
          { speaker: "A", line: "你最大的梦想是什么？", pinyin: "Nǐ zuì dà de mèngxiǎng shì shénme?", translationEn: "What's your biggest dream?" },
          { speaker: "B", line: "我希望开自己的公司，做有意义的事情。", pinyin: "Wǒ xīwàng kāi zìjǐ de gōngsī, zuò yǒu yìyì de shìqíng.", translationEn: "I hope to start my own company and do meaningful work." },
          { speaker: "A", line: "你打算什么时候开始？", pinyin: "Nǐ dǎsuàn shénme shíhòu kāishǐ?", translationEn: "When do you plan to start?" },
          { speaker: "B", line: "再过两年，等我攒够钱。", pinyin: "Zài guò liǎng nián, děng wǒ zǎn gòu qián.", translationEn: "In 2 years, when I save enough money." },
        ],
      },
    ],
    vocabulary: [
      { hanzi: "梦想", pinyin: "mèngxiǎng", meaning: "dream", meaningEn: "dream / aspiration", type: "phrase", example: "梦想要远大。", examplePinyin: "Mèngxiǎng yào yuǎndà.", exampleVi: "Dreams should be big.", exampleEn: "Dreams should be big." },
      { hanzi: "目标", pinyin: "mùbiāo", meaning: "goal", meaningEn: "goal", type: "phrase", example: "明年的目标是什么？", examplePinyin: "Míngnián de mùbiāo shì shénme?", exampleVi: "What's next year's goal?", exampleEn: "What's next year's goal?" },
      { hanzi: "实现", pinyin: "shíxiàn", meaning: "achieve", meaningEn: "to achieve / realize", type: "phrase", example: "实现梦想。", examplePinyin: "Shíxiàn mèngxiǎng.", exampleVi: "Achieve your dream.", exampleEn: "Achieve your dream." },
      { hanzi: "努力", pinyin: "nǔlì", meaning: "effort", meaningEn: "to make effort / hard work", type: "phrase", example: "继续努力。", examplePinyin: "Jìxù nǔlì.", exampleVi: "Keep working hard.", exampleEn: "Keep working hard." },
      { hanzi: "成功", pinyin: "chénggōng", meaning: "success", meaningEn: "success / succeed", type: "phrase", example: "祝你成功。", examplePinyin: "Zhù nǐ chénggōng.", exampleVi: "Wish you success.", exampleEn: "Wish you success." },
      { hanzi: "创业", pinyin: "chuàngyè", meaning: "start a business", meaningEn: "to start a business", type: "phrase", example: "我想创业。", examplePinyin: "Wǒ xiǎng chuàngyè.", exampleVi: "I want to start a business.", exampleEn: "I want to start a business." },
      { hanzi: "意义", pinyin: "yìyì", meaning: "meaning", meaningEn: "meaning / significance", type: "phrase", example: "做有意义的事。", examplePinyin: "Zuò yǒu yìyì de shì.", exampleVi: "Do meaningful things.", exampleEn: "Do meaningful things." },
      { hanzi: "未来", pinyin: "wèilái", meaning: "future", meaningEn: "future", type: "phrase", example: "未来充满希望。", examplePinyin: "Wèilái chōngmǎn xīwàng.", exampleVi: "The future is full of hope.", exampleEn: "The future is full of hope." },
    ],
    commonStructures: [
      {
        pattern: "希望 / 想 + Verb Phrase",
        patternPinyin: "xīwàng / xiǎng + Verb Phrase",
        explanation: "Used to express hopes and desires",
        explanationVi: "Used to express hopes and desires",
        examples: [
          { zh: "我希望成为一名医生。", pinyin: "Wǒ xīwàng chéngwéi yì míng yīshēng.", vi: "I hope to become a doctor.", en: "I hope to become a doctor." },
          { zh: "她想环游世界。", pinyin: "Tā xiǎng huányóu shìjiè.", vi: "She wants to travel around the world.", en: "She wants to travel around the world." },
        ],
      },
    ],
    listeningChallenge: {
      title: "My Five-Year Plan",
      titleVi: "My Five-Year Plan",
      transcript: "我的五年计划是这样的：第一年继续工作存钱，第二年读研究生，第三年开始创业，最后两年把公司做大。我相信只要努力，梦想一定能实现。",
      transcriptPinyin: "Wǒ de wǔ nián jìhuà shì zhèyàng de: dì yī nián jìxù gōngzuò cún qián, dì èr nián dú yánjiūshēng, dì sān nián kāishǐ chuàngyè, zuìhòu liǎng nián bǎ gōngsī zuò dà. Wǒ xiāngxìn zhǐyào nǔlì, mèngxiǎng yídìng néng shíxiàn.",
      transcriptEn: "My 5-year plan is: Year 1 keep working and saving, Year 2 grad school, Year 3 start a business, last 2 years grow the company. I believe with hard work, dreams can come true.",
      questions: [
        { q: "When does she plan to start a business?", qVi: "When does she plan to start a business?", options: ["Year 1", "Year 2", "Year 3", "Year 4"], answer: 2 },
        { q: "What's the total plan duration?", qVi: "What's the total plan duration?", options: ["3 years", "5 years", "7 years", "10 years"], answer: 1 },
      ],
    },
    speakingTopics: ["Describe your 5-year goals", "Talk about a dream you want to achieve"],
    fillInBlankExercises: [
      { sentence: "___要远大。", pinyin: "___ yào yuǎndà.", answer: "梦想", translationVi: "Dreams should be big.", translationEn: "Dreams should be big." },
      { sentence: "我想___。", pinyin: "Wǒ xiǎng ___.", answer: "创业", translationVi: "I want to start a business.", translationEn: "I want to start a business." },
      { sentence: "祝你___。", pinyin: "Zhù nǐ ___.", answer: "成功", translationVi: "Wish you success.", translationEn: "Wish you success." },
    ],
  },
];
