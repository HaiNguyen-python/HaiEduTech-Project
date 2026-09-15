/**
 * @file chineseReadingPractice.ts
 * @description Graded Chinese reading practice passages (HSK 1 → HSK 5).
 * Each passage includes Hanzi, Pinyin, Vietnamese translation and 3 comprehension questions.
 */

export interface ChineseReadingQuestion {
  q: string;
  qVi: string;
  options: string[];
  optionsVi: string[];
  answer: number; // 0-based index
  explanation: string;
  explanationVi: string;
}

export interface ChineseReadingPassage {
  id: string;
  title: string;
  titleVi: string;
  emoji: string;
  hanzi: string;   // full passage in simplified Chinese
  pinyin: string;  // matching pinyin (sentence-by-sentence, line-aligned with hanzi)
  vi: string;      // Vietnamese translation
  newWords: { hanzi: string; pinyin: string; vi: string }[];
  questions: ChineseReadingQuestion[];
}

export interface ChineseReadingLevel {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;            // e.g. "HSK 1 · Beginner"
  labelVi: string;
  description: string;
  descriptionVi: string;
  colorFrom: string;        // tailwind from-XXX
  colorTo: string;          // tailwind to-XXX
  chibi: string;            // chibi illustration asset URL for this level
  passages: ChineseReadingPassage[];
}


// =================================================================
// HSK 1 - VERY BEGINNER (3-5 sentences, only most common words)
// =================================================================
const hsk1: ChineseReadingPassage[] = [
  {
    id: "hsk1-my-family",
    emoji: "\n",
    title: "My Family",
    titleVi: "Gia đình tôi",
    hanzi: "我叫小明。\n我家有四个人：爸爸、妈妈、姐姐和我。\n爸爸是医生，妈妈是老师。\n姐姐是学生，我也是学生。\n我们都很好。",
    pinyin: "Wǒ jiào Xiǎomíng.\nWǒ jiā yǒu sì gè rén: bàba, māma, jiějie hé wǒ.\nBàba shì yīshēng, māma shì lǎoshī.\nJiějie shì xuéshēng, wǒ yě shì xuéshēng.\nWǒmen dōu hěn hǎo.",
    vi: "Tôi tên là Tiểu Minh.\nGia đình tôi có bốn người: bố, mẹ, chị gái và tôi.\nBố là bác sĩ, mẹ là giáo viên.\nChị gái là học sinh, tôi cũng là học sinh.\nChúng tôi đều rất khỏe.",
    newWords: [
      { hanzi: "家", pinyin: "jiā", vi: "nhà, gia đình" },
      { hanzi: "医生", pinyin: "yīshēng", vi: "bác sĩ" },
      { hanzi: "老师", pinyin: "lǎoshī", vi: "giáo viên" },
      { hanzi: "学生", pinyin: "xuéshēng", vi: "học sinh" },
      { hanzi: "姐姐", pinyin: "jiějie", vi: "chị gái" },
    ],
    questions: [
      { q: "How many people are in Xiaoming's family?", qVi: "Gia đình Tiểu Minh có bao nhiêu người?", options: ["3", "4", "5", "6"], optionsVi: ["3", "4", "5", "6"], answer: 1, explanation: "我家有四个人 = 4 people.", explanationVi: "我家有四个人 = 4 người." },
      { q: "What does the father do?", qVi: "Bố làm nghề gì?", options: ["Teacher", "Doctor", "Student", "Driver"], optionsVi: ["Giáo viên", "Bác sĩ", "Học sinh", "Tài xế"], answer: 1, explanation: "爸爸是医生 = Dad is a doctor.", explanationVi: "爸爸是医生 = Bố là bác sĩ." },
      { q: "Who is also a student?", qVi: "Ai cũng là học sinh?", options: ["Mother", "Father", "Older sister", "Nobody"], optionsVi: ["Mẹ", "Bố", "Chị gái", "Không ai cả"], answer: 2, explanation: "姐姐是学生，我也是学生.", explanationVi: "姐姐是学生 - chị gái cũng là học sinh." },
    ],
  },
  {
    id: "hsk1-my-day",
    emoji: "🌞",
    title: "My Day",
    titleVi: "Một ngày của tôi",
    hanzi: "今天是星期一。\n早上我去学校。\n中午我和朋友吃饭。\n下午我学习汉语。\n晚上我看书，然后睡觉。",
    pinyin: "Jīntiān shì xīngqīyī.\nZǎoshang wǒ qù xuéxiào.\nZhōngwǔ wǒ hé péngyǒu chīfàn.\nXiàwǔ wǒ xuéxí Hànyǔ.\nWǎnshang wǒ kàn shū, ránhòu shuìjiào.",
    vi: "Hôm nay là thứ Hai.\nBuổi sáng tôi đi đến trường.\nBuổi trưa tôi ăn cơm cùng bạn.\nBuổi chiều tôi học tiếng Trung.\nBuổi tối tôi đọc sách, sau đó đi ngủ.",
    newWords: [
      { hanzi: "星期一", pinyin: "xīngqīyī", vi: "thứ Hai" },
      { hanzi: "学校", pinyin: "xuéxiào", vi: "trường học" },
      { hanzi: "朋友", pinyin: "péngyǒu", vi: "bạn bè" },
      { hanzi: "汉语", pinyin: "Hànyǔ", vi: "tiếng Hán/Trung" },
      { hanzi: "睡觉", pinyin: "shuìjiào", vi: "đi ngủ" },
    ],
    questions: [
      { q: "What day is it today?", qVi: "Hôm nay là thứ mấy?", options: ["Sunday", "Monday", "Tuesday", "Friday"], optionsVi: ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Sáu"], answer: 1, explanation: "今天是星期一 = Today is Monday.", explanationVi: "星期一 = thứ Hai." },
      { q: "When does the writer eat with friends?", qVi: "Người viết ăn cơm với bạn lúc nào?", options: ["Morning", "Noon", "Afternoon", "Evening"], optionsVi: ["Sáng", "Trưa", "Chiều", "Tối"], answer: 1, explanation: "中午我和朋友吃饭 = at noon.", explanationVi: "中午 = buổi trưa." },
      { q: "What does the writer do in the evening?", qVi: "Buổi tối tác giả làm gì?", options: ["Goes to school", "Studies Chinese", "Reads and sleeps", "Eats with friends"], optionsVi: ["Đi học", "Học tiếng Trung", "Đọc sách rồi ngủ", "Ăn với bạn"], answer: 2, explanation: "晚上我看书，然后睡觉.", explanationVi: "Tối: đọc sách rồi đi ngủ." },
    ],
  },
  {
    id: "hsk1-buying-fruit",
    emoji: "🍎",
    title: "Buying Fruit",
    titleVi: "Mua trái cây",
    hanzi: "我去商店买水果。\n苹果五块钱一斤，香蕉三块钱一斤。\n我买了两斤苹果和一斤香蕉。\n一共十三块钱。\n谢谢！",
    pinyin: "Wǒ qù shāngdiàn mǎi shuǐguǒ.\nPíngguǒ wǔ kuài qián yī jīn, xiāngjiāo sān kuài qián yī jīn.\nWǒ mǎi le liǎng jīn píngguǒ hé yī jīn xiāngjiāo.\nYígòng shísān kuài qián.\nXièxie!",
    vi: "Tôi đến cửa hàng mua trái cây.\nTáo 5 tệ/cân, chuối 3 tệ/cân.\nTôi mua 2 cân táo và 1 cân chuối.\nTổng cộng 13 tệ.\nCảm ơn!",
    newWords: [
      { hanzi: "商店", pinyin: "shāngdiàn", vi: "cửa hàng" },
      { hanzi: "水果", pinyin: "shuǐguǒ", vi: "trái cây" },
      { hanzi: "苹果", pinyin: "píngguǒ", vi: "táo" },
      { hanzi: "香蕉", pinyin: "xiāngjiāo", vi: "chuối" },
      { hanzi: "一共", pinyin: "yígòng", vi: "tổng cộng" },
    ],
    questions: [
      { q: "How much do apples cost per jin?", qVi: "Táo bao nhiêu một cân?", options: ["3 yuan", "5 yuan", "10 yuan", "13 yuan"], optionsVi: ["3 tệ", "5 tệ", "10 tệ", "13 tệ"], answer: 1, explanation: "苹果五块钱一斤.", explanationVi: "Táo 5 tệ/cân." },
      { q: "How many jin of bananas did the writer buy?", qVi: "Tác giả mua bao nhiêu cân chuối?", options: ["0", "1", "2", "3"], optionsVi: ["0", "1", "2", "3"], answer: 1, explanation: "一斤香蕉.", explanationVi: "1 cân chuối." },
      { q: "Total cost?", qVi: "Tổng tiền?", options: ["8 yuan", "10 yuan", "13 yuan", "15 yuan"], optionsVi: ["8 tệ", "10 tệ", "13 tệ", "15 tệ"], answer: 2, explanation: "2×5 + 1×3 = 13.", explanationVi: "2×5 + 1×3 = 13." },
    ],
  },
];

// =================================================================
// HSK 2 - ELEMENTARY (slightly longer sentences, ~80-120 chars total)
// =================================================================
const hsk2: ChineseReadingPassage[] = [
  {
    id: "hsk2-weekend-park",
    emoji: "🌳",
    title: "Weekend in the Park",
    titleVi: "Cuối tuần ở công viên",
    hanzi: "周末的时候，我喜欢和家人一起去公园。\n那里有很多大树，空气很新鲜。\n爸爸喜欢跑步，妈妈喜欢跳舞。\n我和弟弟最喜欢骑自行车。\n中午我们在公园里吃面包，喝果汁。\n下午三点，我们才回家。",
    pinyin: "Zhōumò de shíhou, wǒ xǐhuān hé jiārén yìqǐ qù gōngyuán.\nNàlǐ yǒu hěn duō dà shù, kōngqì hěn xīnxiān.\nBàba xǐhuān pǎobù, māma xǐhuān tiàowǔ.\nWǒ hé dìdi zuì xǐhuān qí zìxíngchē.\nZhōngwǔ wǒmen zài gōngyuán lǐ chī miànbāo, hē guǒzhī.\nXiàwǔ sān diǎn, wǒmen cái huí jiā.",
    vi: "Vào cuối tuần, tôi thích cùng cả nhà đi công viên.\nỞ đó có nhiều cây lớn, không khí rất trong lành.\nBố thích chạy bộ, mẹ thích nhảy múa.\nTôi và em trai thích nhất là đạp xe.\nBuổi trưa cả nhà ăn bánh mì, uống nước trái cây trong công viên.\nĐến 3 giờ chiều mới về nhà.",
    newWords: [
      { hanzi: "周末", pinyin: "zhōumò", vi: "cuối tuần" },
      { hanzi: "公园", pinyin: "gōngyuán", vi: "công viên" },
      { hanzi: "空气", pinyin: "kōngqì", vi: "không khí" },
      { hanzi: "新鲜", pinyin: "xīnxiān", vi: "tươi mới, trong lành" },
      { hanzi: "自行车", pinyin: "zìxíngchē", vi: "xe đạp" },
      { hanzi: "果汁", pinyin: "guǒzhī", vi: "nước ép trái cây" },
    ],
    questions: [
      { q: "What does the family do on weekends?", qVi: "Gia đình làm gì vào cuối tuần?", options: ["Go to school", "Go to the park", "Stay home", "Go shopping"], optionsVi: ["Đi học", "Đi công viên", "Ở nhà", "Đi mua sắm"], answer: 1, explanation: "去公园 = go to the park.", explanationVi: "去公园 = đi công viên." },
      { q: "What does the writer like most?", qVi: "Tác giả thích nhất việc gì?", options: ["Running", "Dancing", "Cycling", "Eating"], optionsVi: ["Chạy bộ", "Nhảy múa", "Đạp xe", "Ăn uống"], answer: 2, explanation: "我和弟弟最喜欢骑自行车.", explanationVi: "最喜欢骑自行车 = thích đạp xe nhất." },
      { q: "What time does the family go home?", qVi: "Mấy giờ về nhà?", options: ["12:00", "2:00 pm", "3:00 pm", "5:00 pm"], optionsVi: ["12 giờ", "2 giờ chiều", "3 giờ chiều", "5 giờ chiều"], answer: 2, explanation: "下午三点回家.", explanationVi: "3 giờ chiều mới về." },
    ],
  },
  {
    id: "hsk2-learning-chinese",
    emoji: "📚",
    title: "Learning Chinese",
    titleVi: "Học tiếng Trung",
    hanzi: "我学汉语已经一年了。\n刚开始的时候，我觉得汉字很难写，发音也很难。\n但是我的老师非常好，她每天帮助我练习。\n现在我可以看简单的文章，也能和中国朋友聊天。\n我希望明年去中国旅游！",
    pinyin: "Wǒ xué Hànyǔ yǐjīng yì nián le.\nGāng kāishǐ de shíhou, wǒ juéde Hànzì hěn nán xiě, fāyīn yě hěn nán.\nDànshì wǒ de lǎoshī fēicháng hǎo, tā měitiān bāngzhù wǒ liànxí.\nXiànzài wǒ kěyǐ kàn jiǎndān de wénzhāng, yě néng hé Zhōngguó péngyǒu liáotiān.\nWǒ xīwàng míngnián qù Zhōngguó lǚyóu!",
    vi: "Tôi học tiếng Trung đã một năm.\nLúc mới bắt đầu, tôi thấy chữ Hán rất khó viết, phát âm cũng khó.\nNhưng cô giáo của tôi rất tốt, mỗi ngày đều giúp tôi luyện tập.\nBây giờ tôi có thể đọc bài đơn giản, cũng có thể trò chuyện với bạn Trung Quốc.\nTôi hy vọng năm sau sẽ đi du lịch Trung Quốc!",
    newWords: [
      { hanzi: "已经", pinyin: "yǐjīng", vi: "đã, đã rồi" },
      { hanzi: "发音", pinyin: "fāyīn", vi: "phát âm" },
      { hanzi: "帮助", pinyin: "bāngzhù", vi: "giúp đỡ" },
      { hanzi: "练习", pinyin: "liànxí", vi: "luyện tập" },
      { hanzi: "希望", pinyin: "xīwàng", vi: "hy vọng" },
      { hanzi: "旅游", pinyin: "lǚyóu", vi: "du lịch" },
    ],
    questions: [
      { q: "How long has the writer been learning Chinese?", qVi: "Tác giả học tiếng Trung được bao lâu?", options: ["6 months", "1 year", "2 years", "3 years"], optionsVi: ["6 tháng", "1 năm", "2 năm", "3 năm"], answer: 1, explanation: "已经一年了 = already 1 year.", explanationVi: "已经一年 = đã 1 năm." },
      { q: "What was difficult at first?", qVi: "Lúc đầu cái gì khó?", options: ["Listening", "Writing characters & pronunciation", "Reading", "Speaking"], optionsVi: ["Nghe", "Viết chữ và phát âm", "Đọc", "Nói"], answer: 1, explanation: "汉字很难写，发音也很难.", explanationVi: "Khó viết chữ và phát âm." },
      { q: "What does the writer hope for next year?", qVi: "Năm sau tác giả hy vọng điều gì?", options: ["Pass HSK 5", "Travel to China", "Find a job", "Move to Beijing"], optionsVi: ["Đậu HSK 5", "Đi du lịch Trung Quốc", "Tìm việc", "Chuyển tới Bắc Kinh"], answer: 1, explanation: "希望明年去中国旅游.", explanationVi: "Hy vọng năm sau đi du lịch TQ." },
    ],
  },
  {
    id: "hsk2-restaurant",
    emoji: "🍜",
    title: "At the Restaurant",
    titleVi: "Ở nhà hàng",
    hanzi: "昨天晚上，我和朋友去了一家中国饭馆。\n服务员给我们看了菜单。\n我点了一碗牛肉面，朋友点了米饭和一条鱼。\n我们还要了两杯茶。\n菜很好吃，价格也不贵。\n我们一定会再来！",
    pinyin: "Zuótiān wǎnshang, wǒ hé péngyǒu qù le yì jiā Zhōngguó fànguǎn.\nFúwùyuán gěi wǒmen kàn le càidān.\nWǒ diǎn le yì wǎn niúròu miàn, péngyǒu diǎn le mǐfàn hé yì tiáo yú.\nWǒmen hái yào le liǎng bēi chá.\nCài hěn hǎochī, jiàgé yě bú guì.\nWǒmen yídìng huì zài lái!",
    vi: "Tối hôm qua, tôi và bạn tôi đã đến một nhà hàng Trung Quốc.\nNhân viên đưa cho chúng tôi xem thực đơn.\nTôi gọi một tô mì bò, bạn tôi gọi cơm và một con cá.\nChúng tôi còn gọi hai ly trà.\nMón ăn rất ngon, giá cả cũng không đắt.\nNhất định sẽ quay lại!",
    newWords: [
      { hanzi: "饭馆", pinyin: "fànguǎn", vi: "nhà hàng" },
      { hanzi: "服务员", pinyin: "fúwùyuán", vi: "nhân viên phục vụ" },
      { hanzi: "菜单", pinyin: "càidān", vi: "thực đơn" },
      { hanzi: "牛肉面", pinyin: "niúròu miàn", vi: "mì bò" },
      { hanzi: "价格", pinyin: "jiàgé", vi: "giá cả" },
      { hanzi: "一定", pinyin: "yídìng", vi: "nhất định" },
    ],
    questions: [
      { q: "When did the writer go to the restaurant?", qVi: "Tác giả đi nhà hàng khi nào?", options: ["This morning", "Yesterday evening", "Last week", "Today noon"], optionsVi: ["Sáng nay", "Tối hôm qua", "Tuần trước", "Trưa nay"], answer: 1, explanation: "昨天晚上 = yesterday evening.", explanationVi: "昨天晚上 = tối hôm qua." },
      { q: "What did the writer order?", qVi: "Tác giả gọi món gì?", options: ["Rice and fish", "Beef noodles", "Dumplings", "Soup"], optionsVi: ["Cơm và cá", "Mì bò", "Sủi cảo", "Canh"], answer: 1, explanation: "我点了一碗牛肉面.", explanationVi: "Tác giả gọi mì bò." },
      { q: "What did they think of the food?", qVi: "Họ nghĩ gì về món ăn?", options: ["Bad and expensive", "Good and cheap", "Good but expensive", "Bad but cheap"], optionsVi: ["Dở và đắt", "Ngon và rẻ", "Ngon nhưng đắt", "Dở nhưng rẻ"], answer: 1, explanation: "好吃，价格不贵.", explanationVi: "Ngon, giá không đắt." },
    ],
  },
];

// =================================================================
// HSK 3 - INTERMEDIATE (200-280 chars, paragraph-style)
// =================================================================
const hsk3: ChineseReadingPassage[] = [
  {
    id: "hsk3-trip-beijing",
    emoji: "🏯",
    title: "A Trip to Beijing",
    titleVi: "Chuyến đi Bắc Kinh",
    hanzi: "上个月，我和家人一起去北京旅游。\n那是我第一次坐飞机，心里又兴奋又紧张。\n到了北京以后，我们先去了天安门广场。\n那里特别大，人也非常多，我们在那里照了很多照片。\n第二天，我们爬长城。虽然有点儿累，但是风景真的太美了！\n回家之前，我还买了一些有名的北京烤鸭送给朋友。\n这次旅行让我学到了很多中国的文化。",
    pinyin: "Shàng gè yuè, wǒ hé jiārén yìqǐ qù Běijīng lǚyóu.\nNà shì wǒ dì yī cì zuò fēijī, xīnlǐ yòu xīngfèn yòu jǐnzhāng.\nDào le Běijīng yǐhòu, wǒmen xiān qù le Tiān'ānmén Guǎngchǎng.\nNàlǐ tèbié dà, rén yě fēicháng duō, wǒmen zài nàlǐ zhào le hěn duō zhàopiàn.\nDì èr tiān, wǒmen pá Chángchéng. Suīrán yǒu diǎnr lèi, dànshì fēngjǐng zhēn de tài měi le!\nHuí jiā zhīqián, wǒ hái mǎi le yìxiē yǒumíng de Běijīng kǎoyā sòng gěi péngyǒu.\nZhè cì lǚxíng ràng wǒ xué dào le hěn duō Zhōngguó de wénhuà.",
    vi: "Tháng trước, tôi và gia đình cùng nhau đi du lịch Bắc Kinh.\nĐó là lần đầu tôi đi máy bay, trong lòng vừa phấn khích vừa hồi hộp.\nĐến Bắc Kinh, chúng tôi đến quảng trường Thiên An Môn trước.\nỞ đó cực kỳ rộng, người cũng rất đông, chúng tôi chụp được rất nhiều ảnh.\nHôm sau, chúng tôi leo Vạn Lý Trường Thành. Tuy hơi mệt, nhưng phong cảnh thật sự quá đẹp!\nTrước khi về nhà, tôi còn mua vài con vịt quay Bắc Kinh nổi tiếng làm quà cho bạn bè.\nChuyến đi này giúp tôi học được rất nhiều về văn hoá Trung Quốc.",
    newWords: [
      { hanzi: "兴奋", pinyin: "xīngfèn", vi: "phấn khích" },
      { hanzi: "紧张", pinyin: "jǐnzhāng", vi: "hồi hộp, căng thẳng" },
      { hanzi: "广场", pinyin: "guǎngchǎng", vi: "quảng trường" },
      { hanzi: "长城", pinyin: "Chángchéng", vi: "Vạn Lý Trường Thành" },
      { hanzi: "风景", pinyin: "fēngjǐng", vi: "phong cảnh" },
      { hanzi: "烤鸭", pinyin: "kǎoyā", vi: "vịt quay" },
      { hanzi: "文化", pinyin: "wénhuà", vi: "văn hoá" },
    ],
    questions: [
      { q: "How did the writer feel on the plane?", qVi: "Tác giả cảm thấy thế nào trên máy bay?", options: ["Bored", "Both excited and nervous", "Tired and sleepy", "Sad"], optionsVi: ["Chán", "Vừa phấn khích vừa hồi hộp", "Mệt và buồn ngủ", "Buồn"], answer: 1, explanation: "又兴奋又紧张.", explanationVi: "又兴奋又紧张 = vừa phấn khích vừa hồi hộp." },
      { q: "What did they do on the second day?", qVi: "Hôm thứ hai họ làm gì?", options: ["Visited Tiananmen", "Climbed the Great Wall", "Went shopping", "Flew home"], optionsVi: ["Đến Thiên An Môn", "Leo Vạn Lý Trường Thành", "Đi mua sắm", "Bay về nhà"], answer: 1, explanation: "第二天我们爬长城.", explanationVi: "Hôm sau leo Trường Thành." },
      { q: "What souvenir did the writer buy?", qVi: "Tác giả mua món quà gì?", options: ["Tea", "Silk", "Beijing roast duck", "Postcards"], optionsVi: ["Trà", "Lụa", "Vịt quay Bắc Kinh", "Bưu thiếp"], answer: 2, explanation: "买了北京烤鸭.", explanationVi: "Mua vịt quay Bắc Kinh." },
    ],
  },
  {
    id: "hsk3-online-shopping",
    emoji: "📦",
    title: "Online Shopping",
    titleVi: "Mua sắm online",
    hanzi: "现在越来越多的人喜欢在网上买东西。\n网上的东西种类很多，价格也常常比商店便宜。\n你只要打开手机，几分钟就能下单。\n但是网购也有一些缺点。\n比如，有的时候衣服的颜色或者大小跟图片不一样，让人很失望。\n所以买东西以前，最好先看看别人的评价，这样可以减少麻烦。",
    pinyin: "Xiànzài yuè lái yuè duō de rén xǐhuān zài wǎngshàng mǎi dōngxi.\nWǎngshàng de dōngxi zhǒnglèi hěn duō, jiàgé yě chángcháng bǐ shāngdiàn piányi.\nNǐ zhǐyào dǎkāi shǒujī, jǐ fēnzhōng jiù néng xiàdān.\nDànshì wǎnggòu yě yǒu yìxiē quēdiǎn.\nBǐrú, yǒu de shíhou yīfu de yánsè huòzhě dàxiǎo gēn túpiàn bù yíyàng, ràng rén hěn shīwàng.\nSuǒyǐ mǎi dōngxi yǐqián, zuì hǎo xiān kàn kàn biérén de píngjià, zhèyàng kěyǐ jiǎnshǎo máfan.",
    vi: "Hiện nay ngày càng nhiều người thích mua sắm trên mạng.\nĐồ trên mạng đủ loại, giá cũng thường rẻ hơn ở cửa hàng.\nBạn chỉ cần mở điện thoại, vài phút là đặt được hàng.\nNhưng mua online cũng có vài nhược điểm.\nVí dụ đôi khi màu sắc hay kích cỡ quần áo khác với hình, khiến người ta thất vọng.\nVì vậy trước khi mua, tốt nhất nên xem đánh giá của người khác để giảm phiền phức.",
    newWords: [
      { hanzi: "越来越", pinyin: "yuè lái yuè", vi: "càng ngày càng" },
      { hanzi: "种类", pinyin: "zhǒnglèi", vi: "chủng loại" },
      { hanzi: "下单", pinyin: "xiàdān", vi: "đặt hàng" },
      { hanzi: "缺点", pinyin: "quēdiǎn", vi: "nhược điểm" },
      { hanzi: "失望", pinyin: "shīwàng", vi: "thất vọng" },
      { hanzi: "评价", pinyin: "píngjià", vi: "đánh giá" },
    ],
    questions: [
      { q: "What is one advantage of online shopping?", qVi: "Một ưu điểm của mua sắm online là gì?", options: ["Cheaper than stores", "Always perfect color", "Always fast delivery", "No phone needed"], optionsVi: ["Rẻ hơn cửa hàng", "Luôn đúng màu", "Luôn giao nhanh", "Không cần điện thoại"], answer: 0, explanation: "价格比商店便宜.", explanationVi: "Rẻ hơn cửa hàng." },
      { q: "What disadvantage is mentioned?", qVi: "Nhược điểm được nêu là gì?", options: ["High price", "Color or size differs from photo", "Too slow", "Hard to order"], optionsVi: ["Giá cao", "Màu/kích cỡ khác hình", "Quá chậm", "Khó đặt hàng"], answer: 1, explanation: "颜色或大小跟图片不一样.", explanationVi: "Khác với hình ảnh." },
      { q: "What does the author suggest?", qVi: "Tác giả khuyên điều gì?", options: ["Stop online shopping", "Read reviews first", "Buy only in stores", "Always buy the cheapest"], optionsVi: ["Ngừng mua online", "Đọc đánh giá trước", "Chỉ mua tại cửa hàng", "Luôn mua rẻ nhất"], answer: 1, explanation: "先看看别人的评价.", explanationVi: "Xem đánh giá trước." },
    ],
  },
  {
    id: "hsk3-healthy-life",
    emoji: "🏃",
    title: "A Healthy Lifestyle",
    titleVi: "Lối sống lành mạnh",
    hanzi: "健康对每个人都很重要。\n要想身体好，首先得有好的生活习惯。\n比如，每天早睡早起，多吃水果和蔬菜，少吃肉和甜的东西。\n其次，运动也非常重要。\n年轻人可以跑步、游泳，老人可以走路或者打太极拳。\n最后，别忘了让自己开心。\n心情好，身体才会更健康。",
    pinyin: "Jiànkāng duì měi gè rén dōu hěn zhòngyào.\nYào xiǎng shēntǐ hǎo, shǒuxiān děi yǒu hǎo de shēnghuó xíguàn.\nBǐrú, měitiān zǎo shuì zǎo qǐ, duō chī shuǐguǒ hé shūcài, shǎo chī ròu hé tián de dōngxi.\nQícì, yùndòng yě fēicháng zhòngyào.\nNiánqīng rén kěyǐ pǎobù, yóuyǒng, lǎorén kěyǐ zǒulù huòzhě dǎ tàijíquán.\nZuìhòu, bié wàng le ràng zìjǐ kāixīn.\nXīnqíng hǎo, shēntǐ cái huì gèng jiànkāng.",
    vi: "Sức khoẻ rất quan trọng với mỗi người.\nMuốn cơ thể khoẻ, trước tiên phải có thói quen sinh hoạt tốt.\nVí dụ, mỗi ngày ngủ sớm dậy sớm, ăn nhiều rau quả, ăn ít thịt và đồ ngọt.\nTiếp đó, vận động cũng rất quan trọng.\nNgười trẻ có thể chạy bộ, bơi lội; người già có thể đi bộ hoặc đánh thái cực quyền.\nCuối cùng, đừng quên làm bản thân vui vẻ.\nTâm trạng tốt, cơ thể mới khoẻ hơn.",
    newWords: [
      { hanzi: "健康", pinyin: "jiànkāng", vi: "sức khoẻ" },
      { hanzi: "习惯", pinyin: "xíguàn", vi: "thói quen" },
      { hanzi: "蔬菜", pinyin: "shūcài", vi: "rau xanh" },
      { hanzi: "运动", pinyin: "yùndòng", vi: "vận động, thể thao" },
      { hanzi: "太极拳", pinyin: "tàijíquán", vi: "thái cực quyền" },
      { hanzi: "心情", pinyin: "xīnqíng", vi: "tâm trạng" },
    ],
    questions: [
      { q: "What food should be eaten less?", qVi: "Nên ăn ít loại đồ ăn nào?", options: ["Fruits", "Vegetables", "Meat and sweets", "Rice"], optionsVi: ["Trái cây", "Rau", "Thịt và đồ ngọt", "Cơm"], answer: 2, explanation: "少吃肉和甜的东西.", explanationVi: "Ăn ít thịt và đồ ngọt." },
      { q: "What activity is suggested for elderly people?", qVi: "Hoạt động nào dành cho người già?", options: ["Running", "Swimming", "Walking or Tai Chi", "Football"], optionsVi: ["Chạy bộ", "Bơi", "Đi bộ hoặc thái cực quyền", "Bóng đá"], answer: 2, explanation: "老人可以走路或者打太极拳.", explanationVi: "Đi bộ hoặc thái cực quyền." },
      { q: "What is the third tip?", qVi: "Điều thứ ba là gì?", options: ["Sleep less", "Eat more meat", "Keep a good mood", "Exercise alone"], optionsVi: ["Ngủ ít hơn", "Ăn nhiều thịt hơn", "Giữ tâm trạng tốt", "Tập một mình"], answer: 2, explanation: "让自己开心，心情好.", explanationVi: "Giữ tâm trạng vui vẻ." },
    ],
  },
];

// =================================================================
// HSK 4 - UPPER-INTERMEDIATE (more complex grammar, ~300-380 chars)
// =================================================================
const hsk4: ChineseReadingPassage[] = [
  {
    id: "hsk4-environment",
    emoji: "🌍",
    title: "Protecting the Environment",
    titleVi: "Bảo vệ môi trường",
    hanzi: "随着经济的快速发展，环境问题变得越来越严重。\n空气污染、水污染和垃圾问题，几乎每个城市都在面对。\n保护环境其实不是政府一个人的责任，而是每个人都应该参与的事情。\n比如，我们可以少开车，多坐公共交通工具；尽量不用一次性的东西；把垃圾分类放好。\n这些事情虽然看起来很小，但是如果十几亿人一起做，就会带来巨大的改变。\n地球是我们共同的家，保护它就是保护我们自己的未来。",
    pinyin: "Suízhe jīngjì de kuàisù fāzhǎn, huánjìng wèntí biàn de yuè lái yuè yánzhòng.\nKōngqì wūrǎn, shuǐ wūrǎn hé lājī wèntí, jīhū měi gè chéngshì dōu zài miànduì.\nBǎohù huánjìng qíshí bú shì zhèngfǔ yí gè rén de zérèn, érshì měi gè rén dōu yīnggāi cānyù de shìqing.\nBǐrú, wǒmen kěyǐ shǎo kāichē, duō zuò gōnggòng jiāotōng gōngjù; jǐnliàng bú yòng yícìxìng de dōngxi; bǎ lājī fēnlèi fàng hǎo.\nZhèxiē shìqing suīrán kàn qǐlái hěn xiǎo, dànshì rúguǒ shí jǐ yì rén yìqǐ zuò, jiù huì dài lái jùdà de gǎibiàn.\nDìqiú shì wǒmen gòngtóng de jiā, bǎohù tā jiù shì bǎohù wǒmen zìjǐ de wèilái.",
    vi: "Cùng với sự phát triển nhanh của kinh tế, vấn đề môi trường ngày càng nghiêm trọng.\nÔ nhiễm không khí, ô nhiễm nước và vấn đề rác thải - hầu như thành phố nào cũng đang đối mặt.\nBảo vệ môi trường thực ra không phải trách nhiệm của riêng chính phủ, mà là việc mỗi người đều nên tham gia.\nVí dụ chúng ta có thể lái xe ít hơn, dùng phương tiện công cộng nhiều hơn; cố gắng không dùng đồ một lần; phân loại rác đúng cách.\nNhững việc này nhìn nhỏ, nhưng nếu hàng tỷ người cùng làm, sẽ tạo ra thay đổi to lớn.\nTrái Đất là ngôi nhà chung, bảo vệ nó chính là bảo vệ tương lai của chúng ta.",
    newWords: [
      { hanzi: "随着", pinyin: "suízhe", vi: "cùng với" },
      { hanzi: "污染", pinyin: "wūrǎn", vi: "ô nhiễm" },
      { hanzi: "严重", pinyin: "yánzhòng", vi: "nghiêm trọng" },
      { hanzi: "责任", pinyin: "zérèn", vi: "trách nhiệm" },
      { hanzi: "参与", pinyin: "cānyù", vi: "tham gia" },
      { hanzi: "分类", pinyin: "fēnlèi", vi: "phân loại" },
      { hanzi: "巨大", pinyin: "jùdà", vi: "to lớn" },
      { hanzi: "未来", pinyin: "wèilái", vi: "tương lai" },
    ],
    questions: [
      { q: "What causes environment problems to worsen?", qVi: "Nguyên nhân làm môi trường tệ đi?", options: ["War", "Rapid economic development", "Population decrease", "Cold weather"], optionsVi: ["Chiến tranh", "Kinh tế phát triển nhanh", "Dân số giảm", "Thời tiết lạnh"], answer: 1, explanation: "经济的快速发展.", explanationVi: "Kinh tế phát triển nhanh." },
      { q: "Whose responsibility is the environment?", qVi: "Bảo vệ môi trường là trách nhiệm của ai?", options: ["Only government", "Only companies", "Everyone", "Scientists only"], optionsVi: ["Chỉ chính phủ", "Chỉ doanh nghiệp", "Mỗi người", "Chỉ nhà khoa học"], answer: 2, explanation: "每个人都应该参与.", explanationVi: "Mỗi người đều nên tham gia." },
      { q: "Which action is NOT suggested?", qVi: "Hành động nào KHÔNG được đề xuất?", options: ["Use public transport", "Sort garbage", "Use disposable items", "Drive less"], optionsVi: ["Dùng phương tiện công cộng", "Phân loại rác", "Dùng đồ dùng một lần", "Lái xe ít hơn"], answer: 2, explanation: "尽量不用一次性的东西.", explanationVi: "Cố gắng KHÔNG dùng đồ dùng một lần." },
    ],
  },
  {
    id: "hsk4-friendship-distance",
    emoji: "💌",
    title: "Friendship and Distance",
    titleVi: "Tình bạn và khoảng cách",
    hanzi: "大学毕业以后，我和最好的朋友小李分开了。\n她去了上海工作，我留在了老家。\n刚开始那段时间，我们几乎每天都通过微信聊天，分享彼此生活中的小事。\n但是随着时间的过去，我们都变得越来越忙，联系也慢慢变少了。\n有一天，我突然收到她寄来的一封手写信。\n她在信里写：「虽然我们不能常常见面，但你一直是我心里最重要的朋友。」\n那一刻，我才明白--真正的友谊不在于距离，而在于心。",
    pinyin: "Dàxué bìyè yǐhòu, wǒ hé zuì hǎo de péngyǒu Xiǎo Lǐ fēnkāi le.\nTā qù le Shànghǎi gōngzuò, wǒ liú zài le lǎojiā.\nGāng kāishǐ nà duàn shíjiān, wǒmen jīhū měitiān dōu tōngguò Wēixìn liáotiān, fēnxiǎng bǐcǐ shēnghuó zhōng de xiǎoshì.\nDànshì suízhe shíjiān de guòqù, wǒmen dōu biàn de yuè lái yuè máng, liánxì yě mànmàn biàn shǎo le.\nYǒu yì tiān, wǒ tūrán shōudào tā jì lái de yì fēng shǒuxiě xìn.\nTā zài xìn lǐ xiě: 「Suīrán wǒmen bù néng chángcháng jiànmiàn, dàn nǐ yìzhí shì wǒ xīnlǐ zuì zhòngyào de péngyǒu.」\nNà yí kè, wǒ cái míngbái - zhēnzhèng de yǒuyì bù zàiyú jùlí, érzài yú xīn.",
    vi: "Sau khi tốt nghiệp đại học, tôi và người bạn thân nhất Tiểu Lý phải chia tay.\nCô ấy đến Thượng Hải làm việc, tôi ở lại quê nhà.\nThời gian đầu, gần như ngày nào chúng tôi cũng nhắn WeChat, chia sẻ chuyện nhỏ trong cuộc sống.\nNhưng theo thời gian, cả hai đều bận hơn, liên lạc cũng dần ít đi.\nMột hôm, tôi bất ngờ nhận được một bức thư viết tay cô ấy gửi.\nTrong thư cô viết: «Dù chúng ta không thường xuyên gặp nhau, nhưng cậu vẫn luôn là người bạn quan trọng nhất trong tim mình.»\nKhoảnh khắc đó, tôi mới hiểu - tình bạn thật sự không nằm ở khoảng cách, mà nằm ở trái tim.",
    newWords: [
      { hanzi: "毕业", pinyin: "bìyè", vi: "tốt nghiệp" },
      { hanzi: "分开", pinyin: "fēnkāi", vi: "chia tách" },
      { hanzi: "通过", pinyin: "tōngguò", vi: "thông qua" },
      { hanzi: "彼此", pinyin: "bǐcǐ", vi: "lẫn nhau" },
      { hanzi: "联系", pinyin: "liánxì", vi: "liên lạc" },
      { hanzi: "突然", pinyin: "tūrán", vi: "đột nhiên" },
      { hanzi: "友谊", pinyin: "yǒuyì", vi: "tình bạn" },
      { hanzi: "距离", pinyin: "jùlí", vi: "khoảng cách" },
    ],
    questions: [
      { q: "Where did Xiao Li go after graduation?", qVi: "Tiểu Lý đi đâu sau tốt nghiệp?", options: ["Beijing", "Shanghai", "Guangzhou", "Hometown"], optionsVi: ["Bắc Kinh", "Thượng Hải", "Quảng Châu", "Quê nhà"], answer: 1, explanation: "她去了上海工作.", explanationVi: "Cô ấy đến Thượng Hải." },
      { q: "Why did they communicate less?", qVi: "Tại sao họ liên lạc ít đi?", options: ["They quarrelled", "They became too busy", "WeChat stopped working", "She moved abroad"], optionsVi: ["Họ cãi nhau", "Họ bận hơn", "WeChat hỏng", "Cô ấy ra nước ngoài"], answer: 1, explanation: "都变得越来越忙.", explanationVi: "Cả hai đều bận hơn." },
      { q: "What is the main message?", qVi: "Thông điệp chính là gì?", options: ["Friends must meet often", "True friendship transcends distance", "Letters are better than WeChat", "Cities are bad for friendship"], optionsVi: ["Bạn phải gặp thường", "Tình bạn thật vượt qua khoảng cách", "Thư tốt hơn WeChat", "Thành phố xấu cho tình bạn"], answer: 1, explanation: "友谊不在于距离，而在于心.", explanationVi: "Tình bạn không ở khoảng cách." },
    ],
  },
  {
    id: "hsk4-job-interview",
    emoji: "💼",
    title: "My First Job Interview",
    titleVi: "Buổi phỏng vấn đầu tiên",
    hanzi: "上周五，我去一家大公司参加面试。\n面试之前，我紧张了好几天，担心自己说错话或者回答不好问题。\n那天我提前一个小时到了公司，在大厅里反复看自己准备的内容。\n面试官是一位四十多岁的女士，她非常友好，先让我做自我介绍，然后问了我对未来工作的想法。\n虽然有些问题不太好回答，但我尽量保持冷静，认真地说出自己的看法。\n面试结束的时候，她笑着对我说：「年轻人，相信自己。」\n几天后我收到了录取通知，那一刻我真的差点哭了。",
    pinyin: "Shàng zhōu wǔ, wǒ qù yì jiā dà gōngsī cānjiā miànshì.\nMiànshì zhīqián, wǒ jǐnzhāng le hǎo jǐ tiān, dānxīn zìjǐ shuō cuò huà huòzhě huídá bù hǎo wèntí.\nNà tiān wǒ tíqián yí gè xiǎoshí dào le gōngsī, zài dàtīng lǐ fǎnfù kàn zìjǐ zhǔnbèi de nèiróng.\nMiànshìguān shì yí wèi sìshí duō suì de nǚshì, tā fēicháng yǒuhǎo, xiān ràng wǒ zuò zìwǒ jièshào, ránhòu wèn le wǒ duì wèilái gōngzuò de xiǎngfǎ.\nSuīrán yǒuxiē wèntí bú tài hǎo huídá, dàn wǒ jǐnliàng bǎochí lěngjìng, rènzhēn de shuō chū zìjǐ de kànfǎ.\nMiànshì jiéshù de shíhou, tā xiào zhe duì wǒ shuō: 「Niánqīng rén, xiāngxìn zìjǐ.」\nJǐ tiān hòu wǒ shōudào le lùqǔ tōngzhī, nà yí kè wǒ zhēn de chàdiǎn kū le.",
    vi: "Thứ Sáu tuần trước, tôi đến một công ty lớn tham gia phỏng vấn.\nTrước buổi phỏng vấn, tôi đã hồi hộp mấy ngày, lo lắng mình sẽ nói nhầm hoặc trả lời không tốt.\nHôm đó tôi đến sớm một tiếng, ngồi ở sảnh đọc đi đọc lại nội dung đã chuẩn bị.\nNgười phỏng vấn là một phụ nữ ngoài bốn mươi, rất thân thiện, đầu tiên cho tôi tự giới thiệu, sau đó hỏi suy nghĩ về công việc trong tương lai.\nDù có những câu khó trả lời, tôi vẫn cố giữ bình tĩnh, trình bày quan điểm của mình một cách nghiêm túc.\nKhi phỏng vấn kết thúc, cô ấy mỉm cười nói: «Người trẻ, hãy tin vào bản thân.»\nVài ngày sau tôi nhận được thông báo trúng tuyển, lúc đó thật sự suýt khóc.",
    newWords: [
      { hanzi: "面试", pinyin: "miànshì", vi: "phỏng vấn" },
      { hanzi: "担心", pinyin: "dānxīn", vi: "lo lắng" },
      { hanzi: "提前", pinyin: "tíqián", vi: "đến/làm sớm hơn" },
      { hanzi: "反复", pinyin: "fǎnfù", vi: "đi đi lại lại" },
      { hanzi: "冷静", pinyin: "lěngjìng", vi: "bình tĩnh" },
      { hanzi: "看法", pinyin: "kànfǎ", vi: "quan điểm" },
      { hanzi: "相信", pinyin: "xiāngxìn", vi: "tin tưởng" },
      { hanzi: "录取", pinyin: "lùqǔ", vi: "trúng tuyển" },
    ],
    questions: [
      { q: "How early did the writer arrive?", qVi: "Tác giả đến sớm bao lâu?", options: ["10 minutes", "30 minutes", "1 hour", "2 hours"], optionsVi: ["10 phút", "30 phút", "1 tiếng", "2 tiếng"], answer: 2, explanation: "提前一个小时.", explanationVi: "Đến sớm 1 tiếng." },
      { q: "What did the interviewer ask first?", qVi: "Người phỏng vấn hỏi gì đầu tiên?", options: ["Salary expectation", "Self-introduction", "Hobbies", "Future plans"], optionsVi: ["Mức lương mong muốn", "Tự giới thiệu", "Sở thích", "Kế hoạch tương lai"], answer: 1, explanation: "先让我做自我介绍.", explanationVi: "Đầu tiên tự giới thiệu." },
      { q: "What advice did the interviewer give?", qVi: "Người phỏng vấn đưa lời khuyên gì?", options: ["Work harder", "Believe in yourself", "Speak slower", "Read more books"], optionsVi: ["Làm việc chăm hơn", "Tin vào bản thân", "Nói chậm hơn", "Đọc nhiều sách hơn"], answer: 1, explanation: "相信自己.", explanationVi: "Tin vào bản thân." },
    ],
  },
];

// =================================================================
// HSK 5 - ADVANCED (richer vocabulary, idiomatic, ~380-450 chars)
// =================================================================
const hsk5: ChineseReadingPassage[] = [
  {
    id: "hsk5-traditional-culture",
    emoji: "🏮",
    title: "Traditional Culture in Modern Society",
    titleVi: "Văn hoá truyền thống trong xã hội hiện đại",
    hanzi: "在快速发展的现代社会里，许多传统文化正面临着被遗忘的危险。\n年轻人更喜欢西方的电影、音乐和节日，而对自己国家的传统习俗了解得越来越少。\n其实，传统文化并不是落后的象征，它包含着祖先几千年的智慧。\n比如中国的春节，不仅是一个家人团聚的日子，更是一种感恩与希望的表达。\n要想让传统文化继续流传下去，我们就不能只把它放在博物馆里。\n学校应该开设相关的课程，媒体可以用更生动的方式去介绍它，年轻人也应该主动去体验和分享。\n只有当传统真正融入日常生活，它才能在新时代里焕发出新的光彩。",
    pinyin: "Zài kuàisù fāzhǎn de xiàndài shèhuì lǐ, xǔduō chuántǒng wénhuà zhèng miànlín zhe bèi yíwàng de wēixiǎn.\nNiánqīng rén gèng xǐhuān xīfāng de diànyǐng, yīnyuè hé jiérì, ér duì zìjǐ guójiā de chuántǒng xísú liǎojiě de yuè lái yuè shǎo.\nQíshí, chuántǒng wénhuà bìng bú shì luòhòu de xiàngzhēng, tā bāohán zhe zǔxiān jǐ qiān nián de zhìhuì.\nBǐrú Zhōngguó de Chūnjié, bùjǐn shì yí gè jiārén tuánjù de rìzi, gèng shì yì zhǒng gǎn'ēn yǔ xīwàng de biǎodá.\nYào xiǎng ràng chuántǒng wénhuà jìxù liúchuán xiàqù, wǒmen jiù bù néng zhǐ bǎ tā fàng zài bówùguǎn lǐ.\nXuéxiào yīnggāi kāishè xiāngguān de kèchéng, méitǐ kěyǐ yòng gèng shēngdòng de fāngshì qù jièshào tā, niánqīng rén yě yīnggāi zhǔdòng qù tǐyàn hé fēnxiǎng.\nZhǐyǒu dāng chuántǒng zhēnzhèng róngrù rìcháng shēnghuó, tā cái néng zài xīn shídài lǐ huànfā chū xīn de guāngcǎi.",
    vi: "Trong xã hội hiện đại phát triển nhanh, nhiều giá trị văn hoá truyền thống đang đối mặt với nguy cơ bị lãng quên.\nNgười trẻ thích phim, nhạc, lễ hội phương Tây hơn, còn hiểu biết về phong tục truyền thống của nước mình ngày càng ít.\nThực ra, văn hoá truyền thống không phải là biểu tượng lạc hậu, nó chứa đựng trí tuệ hàng nghìn năm của tổ tiên.\nVí dụ Tết Trung Quốc không chỉ là ngày sum họp gia đình, mà còn là cách bày tỏ lòng biết ơn và niềm hy vọng.\nMuốn văn hoá truyền thống tiếp tục được lưu truyền, chúng ta không thể chỉ đặt nó trong bảo tàng.\nTrường học nên mở các môn liên quan, truyền thông có thể giới thiệu nó một cách sinh động hơn, và người trẻ cũng cần chủ động trải nghiệm và chia sẻ.\nChỉ khi truyền thống thực sự hoà vào cuộc sống thường ngày, nó mới có thể toả sáng trong thời đại mới.",
    newWords: [
      { hanzi: "面临", pinyin: "miànlín", vi: "đối mặt" },
      { hanzi: "遗忘", pinyin: "yíwàng", vi: "lãng quên" },
      { hanzi: "习俗", pinyin: "xísú", vi: "phong tục" },
      { hanzi: "落后", pinyin: "luòhòu", vi: "lạc hậu" },
      { hanzi: "象征", pinyin: "xiàngzhēng", vi: "biểu tượng" },
      { hanzi: "智慧", pinyin: "zhìhuì", vi: "trí tuệ" },
      { hanzi: "团聚", pinyin: "tuánjù", vi: "đoàn tụ" },
      { hanzi: "感恩", pinyin: "gǎn'ēn", vi: "biết ơn" },
      { hanzi: "融入", pinyin: "róngrù", vi: "hòa nhập" },
      { hanzi: "焕发", pinyin: "huànfā", vi: "toả sáng" },
    ],
    questions: [
      { q: "What danger do traditional cultures face?", qVi: "Văn hoá truyền thống đối mặt nguy cơ nào?", options: ["Becoming too popular", "Being forgotten", "Being banned", "Becoming expensive"], optionsVi: ["Quá phổ biến", "Bị lãng quên", "Bị cấm", "Trở nên đắt đỏ"], answer: 1, explanation: "面临着被遗忘的危险.", explanationVi: "Nguy cơ bị lãng quên." },
      { q: "What does Chinese New Year express, according to the text?", qVi: "Theo bài, Tết Trung Quốc thể hiện điều gì?", options: ["Wealth & power", "Gratitude & hope", "Religion only", "Politics"], optionsVi: ["Sự giàu có & quyền lực", "Lòng biết ơn & hy vọng", "Chỉ tôn giáo", "Chính trị"], answer: 1, explanation: "感恩与希望的表达.", explanationVi: "Biểu đạt lòng biết ơn và hy vọng." },
      { q: "What is NOT suggested to preserve traditions?", qVi: "Điều nào KHÔNG được đề xuất?", options: ["Add school courses", "Use lively media", "Lock them in museums only", "Young people sharing"], optionsVi: ["Thêm môn ở trường", "Truyền thông sinh động", "Chỉ đặt trong bảo tàng", "Người trẻ chia sẻ"], answer: 2, explanation: "不能只把它放在博物馆里.", explanationVi: "Không thể chỉ để trong bảo tàng." },
    ],
  },
  {
    id: "hsk5-ai-future",
    emoji: "🤖",
    title: "AI and Our Future",
    titleVi: "AI và tương lai của chúng ta",
    hanzi: "近几年，人工智能技术飞速发展，已经悄悄走进了我们的生活。\n从手机里的智能助手，到自动驾驶汽车，再到能写文章、画图的AI模型，人工智能正在改变各行各业。\n它带来的便利不可否认：医生可以借助AI更准确地诊断疾病，老师可以根据每个学生的水平设计学习方案，企业也能在大量数据中发现新的机会。\n然而，人们的担忧也在增加。\n有人担心AI将取代大量传统工作，使许多人失业；也有人警告，如果人类过度依赖机器，可能会失去思考和创造的能力。\n面对这场新的技术浪潮，最关键的不是恐惧或抗拒，而是学会与AI合作。\n只有不断学习新技能、保持独立思考，我们才能在未来的世界里找到属于自己的位置。",
    pinyin: "Jìn jǐ nián, réngōng zhìnéng jìshù fēisù fāzhǎn, yǐjīng qiāoqiāo zǒu jìn le wǒmen de shēnghuó.\nCóng shǒujī lǐ de zhìnéng zhùshǒu, dào zìdòng jiàshǐ qìchē, zài dào néng xiě wénzhāng, huàtú de AI móxíng, réngōng zhìnéng zhèngzài gǎibiàn gè háng gè yè.\nTā dài lái de biànlì bùkě fǒurèn: yīshēng kěyǐ jièzhù AI gèng zhǔnquè de zhěnduàn jíbìng, lǎoshī kěyǐ gēnjù měi gè xuéshēng de shuǐpíng shèjì xuéxí fāng'àn, qǐyè yě néng zài dàliàng shùjù zhōng fāxiàn xīn de jīhuì.\nRán'ér, rénmen de dānyōu yě zài zēngjiā.\nYǒu rén dānxīn AI jiāng qǔdài dàliàng chuántǒng gōngzuò, shǐ xǔduō rén shīyè; yě yǒu rén jǐnggào, rúguǒ rénlèi guòdù yīlài jīqì, kěnéng huì shīqù sīkǎo hé chuàngzào de nénglì.\nMiànduì zhè chǎng xīn de jìshù làngcháo, zuì guānjiàn de bú shì kǒngjù huò kàngjù, érshì xuéhuì yǔ AI hézuò.\nZhǐyǒu búduàn xuéxí xīn jìnéng, bǎochí dúlì sīkǎo, wǒmen cái néng zài wèilái de shìjiè lǐ zhǎodào shǔyú zìjǐ de wèizhì.",
    vi: "Vài năm gần đây, công nghệ trí tuệ nhân tạo phát triển vũ bão, đã âm thầm bước vào cuộc sống của chúng ta.\nTừ trợ lý thông minh trong điện thoại, xe tự lái, đến những mô hình AI có thể viết bài, vẽ tranh - AI đang thay đổi mọi ngành nghề.\nLợi ích nó mang lại không thể phủ nhận: bác sĩ có thể nhờ AI chẩn đoán bệnh chính xác hơn, giáo viên có thể thiết kế lộ trình học theo trình độ từng học sinh, doanh nghiệp có thể tìm ra cơ hội mới từ khối dữ liệu khổng lồ.\nTuy nhiên, lo lắng cũng đang tăng lên.\nMột số người sợ AI sẽ thay thế nhiều công việc truyền thống, khiến nhiều người thất nghiệp; số khác cảnh báo, nếu con người quá phụ thuộc vào máy móc, có thể sẽ mất khả năng tư duy và sáng tạo.\nTrước làn sóng công nghệ mới này, điều quan trọng nhất không phải là sợ hãi hay chống đối, mà là học cách hợp tác với AI.\nChỉ khi không ngừng học kỹ năng mới và giữ tư duy độc lập, chúng ta mới có thể tìm được chỗ đứng của mình trong thế giới tương lai.",
    newWords: [
      { hanzi: "人工智能", pinyin: "réngōng zhìnéng", vi: "trí tuệ nhân tạo" },
      { hanzi: "悄悄", pinyin: "qiāoqiāo", vi: "lặng lẽ" },
      { hanzi: "诊断", pinyin: "zhěnduàn", vi: "chẩn đoán" },
      { hanzi: "依赖", pinyin: "yīlài", vi: "phụ thuộc" },
      { hanzi: "创造", pinyin: "chuàngzào", vi: "sáng tạo" },
      { hanzi: "浪潮", pinyin: "làngcháo", vi: "làn sóng" },
      { hanzi: "抗拒", pinyin: "kàngjù", vi: "chống cự" },
      { hanzi: "合作", pinyin: "hézuò", vi: "hợp tác" },
      { hanzi: "独立", pinyin: "dúlì", vi: "độc lập" },
    ],
    questions: [
      { q: "How can AI help doctors?", qVi: "AI giúp bác sĩ thế nào?", options: ["Replace them entirely", "Diagnose diseases more accurately", "Pay them more", "Reduce patient count"], optionsVi: ["Thay thế hoàn toàn", "Chẩn đoán bệnh chính xác hơn", "Trả lương cao hơn", "Giảm bệnh nhân"], answer: 1, explanation: "更准确地诊断疾病.", explanationVi: "Chẩn đoán bệnh chính xác hơn." },
      { q: "What is one concern about AI?", qVi: "Một lo ngại về AI là gì?", options: ["Costs too much", "May replace jobs and reduce thinking", "Too slow", "Hard to use"], optionsVi: ["Quá đắt", "Có thể thay thế việc làm và giảm tư duy", "Quá chậm", "Khó dùng"], answer: 1, explanation: "取代工作、失去思考能力.", explanationVi: "Thay thế việc làm, mất khả năng tư duy." },
      { q: "What is the author's recommended attitude?", qVi: "Tác giả khuyên thái độ nào?", options: ["Fear AI", "Resist AI", "Cooperate with AI & keep learning", "Ignore AI"], optionsVi: ["Sợ AI", "Chống lại AI", "Hợp tác với AI và học liên tục", "Phớt lờ AI"], answer: 2, explanation: "学会与AI合作，不断学习.", explanationVi: "Hợp tác với AI và học liên tục." },
    ],
  },
  {
    id: "hsk5-mountain-village",
    emoji: "🏔️",
    title: "The Village That Came Back to Life",
    titleVi: "Ngôi làng được hồi sinh",
    hanzi: "在云南的群山深处，有一个名叫「白石村」的小村子。\n十年前，这里的年轻人几乎都离开了，去大城市打工。\n留下的，多是上了年纪的老人，村子里几乎听不到孩子的笑声。\n然而，从两年前开始，情况慢慢发生了变化。\n一位曾在城里做设计师的姑娘回到了家乡，她把自家的老房子改造成了小客栈，并通过短视频向全国介绍村里的风景与美食。\n渐渐地，越来越多的游客慕名而来，村里也开始有人卖手工艺品、开餐厅。\n如今，村口的小路被青石板重新铺好，孩子们的笑声又一次响起。\n这个故事让我深深地感到：只要有人愿意付出，再偏远的地方也能重新焕发出光彩。",
    pinyin: "Zài Yúnnán de qúnshān shēnchù, yǒu yí gè míngjiào \"Báishí Cūn\" de xiǎo cūnzi.\nShí nián qián, zhèlǐ de niánqīng rén jīhū dōu líkāi le, qù dà chéngshì dǎgōng.\nLiú xià de, duō shì shàng le niánjì de lǎorén, cūnzi lǐ jīhū tīng bú dào háizi de xiàoshēng.\nRán'ér, cóng liǎng nián qián kāishǐ, qíngkuàng mànmàn fāshēng le biànhuà.\nYí wèi céng zài chéng lǐ zuò shèjìshī de gūniang huí dào le jiāxiāng, tā bǎ zìjiā de lǎo fángzi gǎizào chéng le xiǎo kèzhàn, bìng tōngguò duǎn shìpín xiàng quánguó jièshào cūn lǐ de fēngjǐng yǔ měishí.\nJiànjiàn de, yuè lái yuè duō de yóukè mùmíng ér lái, cūn lǐ yě kāishǐ yǒu rén mài shǒugōngyìpǐn, kāi cāntīng.\nRújīn, cūnkǒu de xiǎolù bèi qīngshíbǎn chóngxīn pū hǎo, háizimen de xiàoshēng yòu yí cì xiǎngqǐ.\nZhège gùshi ràng wǒ shēnshēn de gǎndào: zhǐyào yǒu rén yuànyì fùchū, zài piānyuǎn de dìfāng yě néng chóngxīn huànfā chū guāngcǎi.",
    vi: "Sâu trong dãy núi Vân Nam, có một ngôi làng nhỏ tên \"Bạch Thạch\".\nMười năm trước, gần như tất cả người trẻ ở đây đều rời đi, lên thành phố lớn làm thuê.\nNgười ở lại phần lớn là người già, trong làng gần như không còn nghe tiếng cười trẻ con.\nNhưng từ hai năm trước, mọi thứ dần thay đổi.\nMột cô gái từng làm thiết kế ở thành phố đã trở về quê, cải tạo căn nhà cũ thành quán trọ nhỏ và dùng video ngắn giới thiệu cảnh sắc, món ngon của làng tới khắp cả nước.\nDần dần, ngày càng nhiều khách du lịch tìm đến, dân làng cũng bắt đầu bán đồ thủ công, mở nhà hàng.\nNay, con đường đầu làng đã được lát đá xanh lại, tiếng cười trẻ con một lần nữa vang lên.\nCâu chuyện này khiến tôi cảm nhận sâu sắc: chỉ cần có người sẵn lòng cống hiến, dù nơi xa xôi đến đâu cũng có thể tỏa sáng trở lại.",
    newWords: [
      { hanzi: "群山", pinyin: "qúnshān", vi: "dãy núi" },
      { hanzi: "打工", pinyin: "dǎgōng", vi: "đi làm thuê" },
      { hanzi: "改造", pinyin: "gǎizào", vi: "cải tạo" },
      { hanzi: "客栈", pinyin: "kèzhàn", vi: "quán trọ" },
      { hanzi: "慕名", pinyin: "mùmíng", vi: "ngưỡng mộ tiếng tăm" },
      { hanzi: "手工艺品", pinyin: "shǒugōngyìpǐn", vi: "đồ thủ công" },
      { hanzi: "付出", pinyin: "fùchū", vi: "cống hiến, bỏ ra" },
      { hanzi: "偏远", pinyin: "piānyuǎn", vi: "xa xôi" },
    ],
    questions: [
      { q: "Why was the village quiet 10 years ago?", qVi: "Vì sao 10 năm trước làng vắng vẻ?", options: ["Disease", "Young people left for cities", "War", "Earthquake"], optionsVi: ["Bệnh dịch", "Người trẻ rời đi", "Chiến tranh", "Động đất"], answer: 1, explanation: "年轻人几乎都离开了.", explanationVi: "Người trẻ đều rời đi." },
      { q: "What did the designer do first?", qVi: "Cô thiết kế đã làm gì đầu tiên?", options: ["Built a school", "Turned her old house into an inn", "Opened a factory", "Wrote a book"], optionsVi: ["Xây trường", "Biến nhà cũ thành quán trọ", "Mở nhà máy", "Viết sách"], answer: 1, explanation: "把老房子改造成了小客栈.", explanationVi: "Biến nhà cũ thành quán trọ." },
      { q: "What is the moral of the story?", qVi: "Bài học của câu chuyện?", options: ["Cities are always better", "Effort can revive remote places", "Tourism is harmful", "Old houses are useless"], optionsVi: ["Thành phố luôn tốt hơn", "Cống hiến có thể hồi sinh nơi xa xôi", "Du lịch có hại", "Nhà cũ vô dụng"], answer: 1, explanation: "再偏远的地方也能焕发光彩.", explanationVi: "Nơi xa xôi cũng có thể toả sáng trở lại." },
    ],
  },
];

// =================================================================
// LEVELS EXPORT
// =================================================================
import { hsk1Extra, hsk2Extra, hsk3Extra, hsk4Extra, hsk5Extra } from "./chineseReadingExpansion";
import { hsk1Expansion2, hsk2Expansion2, hsk3Expansion2, hsk4Expansion2, hsk5Expansion2 } from "./chineseReadingExpansion2";
import chibiHsk1 from "@/assets/chibi-cn-hsk1.png";
import chibiHsk2 from "@/assets/chibi-cn-hsk2.png";
import chibiHsk3 from "@/assets/chibi-cn-hsk3.png";
import chibiHsk4 from "@/assets/chibi-cn-hsk4.png";
import chibiHsk5 from "@/assets/chibi-cn-hsk5.png";

export const chineseReadingLevels: ChineseReadingLevel[] = [
  {
    level: 1,
    label: "HSK 1 · Beginner",
    labelVi: "HSK 1 · Sơ cấp",
    description: "Ultra-short passages with the most common 150 words. Perfect for first reading.",
    descriptionVi: "Bài đọc cực ngắn với 150 từ phổ biến nhất. Hoàn hảo cho lần đầu đọc.",
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-500",
    chibi: chibiHsk1,
    passages: [...hsk1, ...hsk1Extra, ...hsk1Expansion2],
  },
  {
    level: 2,
    label: "HSK 2 · Elementary",
    labelVi: "HSK 2 · Cơ bản",
    description: "Short paragraphs about daily life - family, weekend, food, friends.",
    descriptionVi: "Đoạn ngắn về đời sống hằng ngày - gia đình, cuối tuần, ăn uống, bạn bè.",
    colorFrom: "from-sky-500",
    colorTo: "to-cyan-500",
    chibi: chibiHsk2,
    passages: [...hsk2, ...hsk2Extra, ...hsk2Expansion2],
  },
  {
    level: 3,
    label: "HSK 3 · Intermediate",
    labelVi: "HSK 3 · Trung cấp",
    description: "Multi-paragraph texts on travel, shopping, healthy living.",
    descriptionVi: "Bài đọc nhiều đoạn về du lịch, mua sắm, sống khoẻ.",
    colorFrom: "from-indigo-500",
    colorTo: "to-blue-600",
    chibi: chibiHsk3,
    passages: [...hsk3, ...hsk3Extra, ...hsk3Expansion2],
  },
  {
    level: 4,
    label: "HSK 4 · Upper-Intermediate",
    labelVi: "HSK 4 · Trung cấp cao",
    description: "Argumentative & narrative texts: environment, friendship, careers.",
    descriptionVi: "Bài nghị luận & tự sự: môi trường, tình bạn, sự nghiệp.",
    colorFrom: "from-purple-500",
    colorTo: "to-violet-600",
    chibi: chibiHsk4,
    passages: [...hsk4, ...hsk4Extra, ...hsk4Expansion2],
  },
  {
    level: 5,
    label: "HSK 5 · Advanced",
    labelVi: "HSK 5 · Nâng cao",
    description: "Rich vocabulary and complex ideas: culture, AI, social change.",
    descriptionVi: "Từ vựng phong phú, ý tưởng phức tạp: văn hoá, AI, biến đổi xã hội.",
    colorFrom: "from-rose-500",
    colorTo: "to-red-600",
    chibi: chibiHsk5,
    passages: [...hsk5, ...hsk5Extra, ...hsk5Expansion2],
  },
];
