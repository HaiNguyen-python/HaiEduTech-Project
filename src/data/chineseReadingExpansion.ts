/**
 * @file chineseReadingExpansion.ts
 * @description Extra graded Chinese reading passages - 2 per HSK level.
 */
import type { ChineseReadingPassage } from "./chineseReadingPractice";

// ============ HSK 1 ============
export const hsk1Extra: ChineseReadingPassage[] = [
  {
    id: "hsk1-my-cat",
    emoji: "🐱",
    title: "My Cat",
    titleVi: "Mèo của tôi",
    hanzi: "我有一只小猫。\n它的名字叫米米。\n米米很可爱，喜欢吃鱼。\n白天它睡觉，晚上它玩。\n我很爱米米。",
    pinyin: "Wǒ yǒu yì zhī xiǎo māo.\nTā de míngzi jiào Mǐmi.\nMǐmi hěn kě'ài, xǐhuān chī yú.\nBáitiān tā shuìjiào, wǎnshang tā wán.\nWǒ hěn ài Mǐmi.",
    vi: "Tôi có một con mèo nhỏ.\nTên nó là Mimi.\nMimi rất dễ thương, thích ăn cá.\nBan ngày nó ngủ, ban đêm nó chơi.\nTôi rất yêu Mimi.",
    newWords: [
      { hanzi: "猫", pinyin: "māo", vi: "mèo" },
      { hanzi: "可爱", pinyin: "kě'ài", vi: "dễ thương" },
      { hanzi: "鱼", pinyin: "yú", vi: "cá" },
      { hanzi: "白天", pinyin: "báitiān", vi: "ban ngày" },
      { hanzi: "玩", pinyin: "wán", vi: "chơi" },
    ],
    questions: [
      { q: "What is the cat's name?", qVi: "Tên con mèo là gì?", options: ["Mama", "Mimi", "Mumu", "Lili"], optionsVi: ["Mama", "Mimi", "Mumu", "Lili"], answer: 1, explanation: "名字叫米米.", explanationVi: "Tên là Mimi." },
      { q: "What does the cat like to eat?", qVi: "Mèo thích ăn gì?", options: ["Rice", "Fish", "Bread", "Meat"], optionsVi: ["Cơm", "Cá", "Bánh mì", "Thịt"], answer: 1, explanation: "喜欢吃鱼.", explanationVi: "Thích ăn cá." },
      { q: "When does the cat play?", qVi: "Mèo chơi khi nào?", options: ["Morning", "Noon", "Night", "All day"], optionsVi: ["Sáng", "Trưa", "Tối", "Cả ngày"], answer: 2, explanation: "晚上它玩.", explanationVi: "Buổi tối nó chơi." },
    ],
  },
  {
    id: "hsk1-weather-today",
    emoji: "☀️",
    title: "Today's Weather",
    titleVi: "Thời tiết hôm nay",
    hanzi: "今天天气很好。\n太阳很大，风不大。\n我和妈妈去公园。\n公园里有很多花。\n我们很高兴。",
    pinyin: "Jīntiān tiānqì hěn hǎo.\nTàiyáng hěn dà, fēng bú dà.\nWǒ hé māma qù gōngyuán.\nGōngyuán lǐ yǒu hěn duō huā.\nWǒmen hěn gāoxìng.",
    vi: "Hôm nay thời tiết rất đẹp.\nNắng to, gió nhẹ.\nTôi và mẹ đi công viên.\nTrong công viên có nhiều hoa.\nChúng tôi rất vui.",
    newWords: [
      { hanzi: "天气", pinyin: "tiānqì", vi: "thời tiết" },
      { hanzi: "太阳", pinyin: "tàiyáng", vi: "mặt trời" },
      { hanzi: "风", pinyin: "fēng", vi: "gió" },
      { hanzi: "花", pinyin: "huā", vi: "hoa" },
      { hanzi: "高兴", pinyin: "gāoxìng", vi: "vui vẻ" },
    ],
    questions: [
      { q: "How is the weather?", qVi: "Thời tiết thế nào?", options: ["Rainy", "Good", "Cold", "Snowy"], optionsVi: ["Mưa", "Đẹp", "Lạnh", "Tuyết"], answer: 1, explanation: "天气很好.", explanationVi: "Thời tiết rất đẹp." },
      { q: "Where did they go?", qVi: "Họ đi đâu?", options: ["School", "Park", "Shop", "Home"], optionsVi: ["Trường", "Công viên", "Cửa hàng", "Nhà"], answer: 1, explanation: "去公园.", explanationVi: "Đi công viên." },
      { q: "What did they see in the park?", qVi: "Họ thấy gì trong công viên?", options: ["Cats", "Cars", "Flowers", "Books"], optionsVi: ["Mèo", "Xe hơi", "Hoa", "Sách"], answer: 2, explanation: "有很多花.", explanationVi: "Có nhiều hoa." },
    ],
  },
];

// ============ HSK 2 ============
export const hsk2Extra: ChineseReadingPassage[] = [
  {
    id: "hsk2-birthday-party",
    emoji: "🎂",
    title: "My Birthday Party",
    titleVi: "Tiệc sinh nhật của tôi",
    hanzi: "昨天是我的生日。\n妈妈给我做了一个大蛋糕，上面有十二支蜡烛。\n我请了五个好朋友来我家。\n我们一起唱歌、跳舞、吃蛋糕。\n朋友们送给我很多礼物，我最喜欢的是一本中文书。\n这是我最快乐的一天！",
    pinyin: "Zuótiān shì wǒ de shēngrì.\nMāma gěi wǒ zuò le yí gè dà dàngāo, shàngmiàn yǒu shí'èr zhī làzhú.\nWǒ qǐng le wǔ gè hǎo péngyǒu lái wǒ jiā.\nWǒmen yìqǐ chànggē, tiàowǔ, chī dàngāo.\nPéngyǒumen sòng gěi wǒ hěn duō lǐwù, wǒ zuì xǐhuān de shì yì běn Zhōngwén shū.\nZhè shì wǒ zuì kuàilè de yì tiān!",
    vi: "Hôm qua là sinh nhật của tôi.\nMẹ làm cho tôi một chiếc bánh lớn, trên có 12 cây nến.\nTôi mời 5 người bạn thân đến nhà.\nChúng tôi cùng hát, nhảy, ăn bánh.\nCác bạn tặng tôi rất nhiều quà, món tôi thích nhất là một quyển sách tiếng Trung.\nĐó là ngày vui nhất của tôi!",
    newWords: [
      { hanzi: "生日", pinyin: "shēngrì", vi: "sinh nhật" },
      { hanzi: "蛋糕", pinyin: "dàngāo", vi: "bánh kem" },
      { hanzi: "蜡烛", pinyin: "làzhú", vi: "nến" },
      { hanzi: "唱歌", pinyin: "chànggē", vi: "hát" },
      { hanzi: "礼物", pinyin: "lǐwù", vi: "quà" },
      { hanzi: "快乐", pinyin: "kuàilè", vi: "vui vẻ" },
    ],
    questions: [
      { q: "How old did the writer turn?", qVi: "Tác giả bao nhiêu tuổi?", options: ["10", "11", "12", "13"], optionsVi: ["10", "11", "12", "13"], answer: 2, explanation: "十二支蜡烛.", explanationVi: "12 cây nến." },
      { q: "How many friends came?", qVi: "Có bao nhiêu bạn đến?", options: ["3", "4", "5", "6"], optionsVi: ["3", "4", "5", "6"], answer: 2, explanation: "五个好朋友.", explanationVi: "5 người bạn." },
      { q: "What was the favorite gift?", qVi: "Món quà yêu thích là gì?", options: ["A toy", "A Chinese book", "A cake", "Clothes"], optionsVi: ["Đồ chơi", "Sách tiếng Trung", "Bánh kem", "Quần áo"], answer: 1, explanation: "一本中文书.", explanationVi: "Một quyển sách tiếng Trung." },
    ],
  },
  {
    id: "hsk2-my-hometown",
    emoji: "🏘️",
    title: "My Hometown",
    titleVi: "Quê hương của tôi",
    hanzi: "我的家乡是一个小城市，离北京不太远。\n那里的人不多，但是大家都很热情。\n春天的时候，山上有很多花；秋天的时候，叶子变成红色和黄色，非常漂亮。\n我家附近有一条小河，小时候我常常在河边玩。\n虽然现在我在大城市工作，但我每年都回家看看父母。",
    pinyin: "Wǒ de jiāxiāng shì yí gè xiǎo chéngshì, lí Běijīng bú tài yuǎn.\nNàlǐ de rén bù duō, dànshì dàjiā dōu hěn rèqíng.\nChūntiān de shíhou, shān shàng yǒu hěn duō huā; qiūtiān de shíhou, yèzi biàn chéng hóngsè hé huángsè, fēicháng piàoliang.\nWǒ jiā fùjìn yǒu yì tiáo xiǎo hé, xiǎoshíhou wǒ chángcháng zài hébiān wán.\nSuīrán xiànzài wǒ zài dà chéngshì gōngzuò, dàn wǒ měi nián dōu huí jiā kàn kan fùmǔ.",
    vi: "Quê tôi là một thành phố nhỏ, cách Bắc Kinh không xa.\nỞ đó người không đông, nhưng ai cũng nhiệt tình.\nMùa xuân, trên núi có nhiều hoa; mùa thu, lá đổi sang đỏ và vàng, rất đẹp.\nGần nhà tôi có một con sông nhỏ, hồi bé tôi hay chơi bên bờ sông.\nDù bây giờ tôi làm việc ở thành phố lớn, mỗi năm tôi đều về thăm bố mẹ.",
    newWords: [
      { hanzi: "家乡", pinyin: "jiāxiāng", vi: "quê hương" },
      { hanzi: "热情", pinyin: "rèqíng", vi: "nhiệt tình" },
      { hanzi: "叶子", pinyin: "yèzi", vi: "lá cây" },
      { hanzi: "附近", pinyin: "fùjìn", vi: "gần, lân cận" },
      { hanzi: "小时候", pinyin: "xiǎoshíhou", vi: "thời thơ ấu" },
      { hanzi: "父母", pinyin: "fùmǔ", vi: "bố mẹ" },
    ],
    questions: [
      { q: "How is the hometown described?", qVi: "Quê hương được miêu tả thế nào?", options: ["Big and busy", "Small with warm people", "Very crowded", "Far from any city"], optionsVi: ["Lớn và đông", "Nhỏ với người nhiệt tình", "Đông đúc", "Xa mọi thành phố"], answer: 1, explanation: "小城市，人热情.", explanationVi: "Thành phố nhỏ, người nhiệt tình." },
      { q: "What is near the writer's home?", qVi: "Gần nhà có gì?", options: ["A mountain", "A small river", "A school", "A shop"], optionsVi: ["Núi", "Sông nhỏ", "Trường", "Cửa hàng"], answer: 1, explanation: "附近有一条小河.", explanationVi: "Gần có sông nhỏ." },
      { q: "How often does the writer visit home?", qVi: "Tác giả về thăm nhà bao lâu một lần?", options: ["Every month", "Every year", "Every 5 years", "Never"], optionsVi: ["Mỗi tháng", "Mỗi năm", "Mỗi 5 năm", "Không bao giờ"], answer: 1, explanation: "每年都回家.", explanationVi: "Mỗi năm đều về." },
    ],
  },
];

// ============ HSK 3 ============
export const hsk3Extra: ChineseReadingPassage[] = [
  {
    id: "hsk3-learning-cook",
    emoji: "🍳",
    title: "Learning to Cook",
    titleVi: "Học nấu ăn",
    hanzi: "上个月，我开始学做中国菜。\n以前我觉得做饭很麻烦，每天都吃外卖。\n后来发现外卖又贵又不健康，所以决定自己学。\n我先从最简单的西红柿炒鸡蛋开始。\n第一次做的时候，我把盐放多了，菜咸得不能吃。\n但是我没有放弃，每天都练习。\n现在我已经能做十几个菜了，朋友们都说很好吃。\n做饭不仅省钱，还让我感到很有成就感。",
    pinyin: "Shàng gè yuè, wǒ kāishǐ xué zuò Zhōngguó cài.\nYǐqián wǒ juéde zuòfàn hěn máfan, měitiān dōu chī wàimài.\nHòulái fāxiàn wàimài yòu guì yòu bù jiànkāng, suǒyǐ juédìng zìjǐ xué.\nWǒ xiān cóng zuì jiǎndān de xīhóngshì chǎo jīdàn kāishǐ.\nDì yī cì zuò de shíhou, wǒ bǎ yán fàng duō le, cài xián de bù néng chī.\nDànshì wǒ méiyǒu fàngqì, měitiān dōu liànxí.\nXiànzài wǒ yǐjīng néng zuò shí jǐ gè cài le, péngyǒumen dōu shuō hěn hǎochī.\nZuòfàn bùjǐn shěng qián, hái ràng wǒ gǎndào hěn yǒu chéngjiùgǎn.",
    vi: "Tháng trước tôi bắt đầu học nấu món Trung.\nTrước đây tôi thấy nấu ăn phiền phức, ngày nào cũng gọi đồ ăn.\nSau đó tôi thấy đồ giao vừa đắt vừa không tốt, nên quyết định tự học.\nTôi bắt đầu từ món đơn giản nhất là trứng xào cà chua.\nLần đầu tôi cho muối quá tay, món ăn mặn không nuốt nổi.\nNhưng tôi không bỏ cuộc, ngày nào cũng luyện.\nGiờ tôi đã nấu được hơn mười món, bạn bè đều khen ngon.\nNấu ăn vừa tiết kiệm, vừa làm tôi rất có cảm giác thành tựu.",
    newWords: [
      { hanzi: "外卖", pinyin: "wàimài", vi: "đồ ăn giao tận nơi" },
      { hanzi: "决定", pinyin: "juédìng", vi: "quyết định" },
      { hanzi: "西红柿", pinyin: "xīhóngshì", vi: "cà chua" },
      { hanzi: "盐", pinyin: "yán", vi: "muối" },
      { hanzi: "咸", pinyin: "xián", vi: "mặn" },
      { hanzi: "放弃", pinyin: "fàngqì", vi: "từ bỏ" },
      { hanzi: "成就感", pinyin: "chéngjiùgǎn", vi: "cảm giác thành tựu" },
    ],
    questions: [
      { q: "Why did the writer stop ordering takeout?", qVi: "Vì sao tác giả ngừng gọi đồ giao?", options: ["Too cold", "Expensive and unhealthy", "Too slow", "Not tasty"], optionsVi: ["Quá lạnh", "Đắt và không tốt", "Quá chậm", "Không ngon"], answer: 1, explanation: "又贵又不健康.", explanationVi: "Vừa đắt vừa không tốt." },
      { q: "What dish did the writer start with?", qVi: "Bắt đầu với món gì?", options: ["Dumplings", "Tomato & egg", "Beef noodles", "Rice"], optionsVi: ["Sủi cảo", "Trứng xào cà chua", "Mì bò", "Cơm"], answer: 1, explanation: "西红柿炒鸡蛋.", explanationVi: "Trứng xào cà chua." },
      { q: "How many dishes can the writer make now?", qVi: "Hiện nấu được bao nhiêu món?", options: ["A few", "More than 10", "About 50", "Hundreds"], optionsVi: ["Vài món", "Hơn 10 món", "Khoảng 50", "Hàng trăm"], answer: 1, explanation: "十几个菜.", explanationVi: "Hơn 10 món." },
    ],
  },
  {
    id: "hsk3-pets-and-people",
    emoji: "🐶",
    title: "Pets and People",
    titleVi: "Thú cưng và con người",
    hanzi: "现在越来越多的中国人喜欢养宠物，特别是猫和狗。\n对很多年轻人来说，宠物不只是动物，更像是家人。\n下班回家以后，看到小狗摇着尾巴跑过来，所有的累就消失了。\n当然，养宠物也需要责任。\n你要每天喂它，带它出去走，还要带它去看医生。\n如果你不能照顾它一辈子，最好不要随便买。\n爱宠物，就要对它负责。",
    pinyin: "Xiànzài yuè lái yuè duō de Zhōngguó rén xǐhuān yǎng chǒngwù, tèbié shì māo hé gǒu.\nDuì hěn duō niánqīng rén lái shuō, chǒngwù bù zhǐ shì dòngwù, gèng xiàng shì jiārén.\nXiàbān huí jiā yǐhòu, kàndào xiǎo gǒu yáo zhe wěiba pǎo guòlái, suǒyǒu de lèi jiù xiāoshī le.\nDāngrán, yǎng chǒngwù yě xūyào zérèn.\nNǐ yào měitiān wèi tā, dài tā chūqù zǒu, hái yào dài tā qù kàn yīshēng.\nRúguǒ nǐ bù néng zhàogù tā yíbèizi, zuì hǎo bú yào suíbiàn mǎi.\nÀi chǒngwù, jiù yào duì tā fùzé.",
    vi: "Ngày càng nhiều người Trung Quốc thích nuôi thú cưng, đặc biệt là mèo và chó.\nVới nhiều người trẻ, thú cưng không chỉ là động vật mà như người nhà.\nTan làm về, thấy chú chó vẫy đuôi chạy ra, mọi mệt mỏi tan biến.\nDĩ nhiên nuôi thú cưng cũng cần trách nhiệm.\nBạn phải cho ăn hàng ngày, dắt đi dạo, đưa đi khám.\nNếu không thể chăm sóc cả đời, tốt nhất đừng mua bừa.\nYêu thú cưng nghĩa là phải có trách nhiệm với chúng.",
    newWords: [
      { hanzi: "宠物", pinyin: "chǒngwù", vi: "thú cưng" },
      { hanzi: "动物", pinyin: "dòngwù", vi: "động vật" },
      { hanzi: "尾巴", pinyin: "wěiba", vi: "đuôi" },
      { hanzi: "消失", pinyin: "xiāoshī", vi: "biến mất" },
      { hanzi: "照顾", pinyin: "zhàogù", vi: "chăm sóc" },
      { hanzi: "一辈子", pinyin: "yíbèizi", vi: "cả đời" },
      { hanzi: "负责", pinyin: "fùzé", vi: "chịu trách nhiệm" },
    ],
    questions: [
      { q: "Which pets are most popular?", qVi: "Thú cưng nào phổ biến nhất?", options: ["Birds & fish", "Cats & dogs", "Rabbits", "Hamsters"], optionsVi: ["Chim & cá", "Mèo & chó", "Thỏ", "Chuột hamster"], answer: 1, explanation: "特别是猫和狗.", explanationVi: "Đặc biệt mèo và chó." },
      { q: "What do many young people see pets as?", qVi: "Người trẻ xem thú cưng là?", options: ["Toys", "Investment", "Family members", "Workers"], optionsVi: ["Đồ chơi", "Đầu tư", "Thành viên gia đình", "Lao động"], answer: 2, explanation: "更像是家人.", explanationVi: "Như người nhà." },
      { q: "What is the main message?", qVi: "Thông điệp chính?", options: ["Don't get pets", "Love means responsibility", "Pets are expensive", "Cats are better than dogs"], optionsVi: ["Đừng nuôi thú", "Yêu thì phải có trách nhiệm", "Thú cưng đắt", "Mèo hơn chó"], answer: 1, explanation: "爱它就要对它负责.", explanationVi: "Yêu thì phải có trách nhiệm." },
    ],
  },
];

// ============ HSK 4 ============
export const hsk4Extra: ChineseReadingPassage[] = [
  {
    id: "hsk4-social-media",
    emoji: "📱",
    title: "Living with Social Media",
    titleVi: "Sống cùng mạng xã hội",
    hanzi: "今天，几乎每个年轻人都离不开手机和社交媒体。\n微信、微博、抖音让我们随时随地能和朋友联系，也能看到世界各地的新鲜事。\n但是，长时间使用社交媒体也会带来一些问题。\n比如，有的人因为不停地看别人的「精彩生活」，反而觉得自己不够好；还有人因为熬夜刷视频，第二天上班没有精神。\n其实，手机只是一个工具，关键看我们怎么用。\n每天给自己留一点不看手机的时间，去散步、读书、和家人聊天，生活反而会更幸福。",
    pinyin: "Jīntiān, jīhū měi gè niánqīng rén dōu líbukāi shǒujī hé shèjiāo méitǐ.\nWēixìn, Wēibó, Dǒuyīn ràng wǒmen suíshí suídì néng hé péngyǒu liánxì, yě néng kàn dào shìjiè gèdì de xīnxiān shì.\nDànshì, cháng shíjiān shǐyòng shèjiāo méitǐ yě huì dài lái yìxiē wèntí.\nBǐrú, yǒu de rén yīnwèi bù tíng de kàn biérén de \"jīngcǎi shēnghuó\", fǎn'ér juéde zìjǐ bú gòu hǎo; hái yǒu rén yīnwèi áoyè shuā shìpín, dì èr tiān shàngbān méiyǒu jīngshen.\nQíshí, shǒujī zhǐ shì yí gè gōngjù, guānjiàn kàn wǒmen zěnme yòng.\nMěitiān gěi zìjǐ liú yìdiǎn bú kàn shǒujī de shíjiān, qù sànbù, dúshū, hé jiārén liáotiān, shēnghuó fǎn'ér huì gèng xìngfú.",
    vi: "Ngày nay, hầu như mọi người trẻ đều không thể rời chiếc điện thoại và mạng xã hội.\nWeChat, Weibo, Douyin giúp chúng ta liên lạc bạn bè bất cứ lúc nào, cũng thấy được chuyện mới khắp thế giới.\nNhưng dùng mạng xã hội quá lâu cũng kéo theo vấn đề.\nVí dụ, có người cứ xem \"cuộc sống lung linh\" của người khác lại thấy mình không đủ tốt; người khác lại thức khuya lướt video, hôm sau đi làm không có tinh thần.\nThật ra điện thoại chỉ là công cụ, mấu chốt là cách ta dùng.\nMỗi ngày dành chút thời gian không nhìn điện thoại, đi dạo, đọc sách, trò chuyện với gia đình - cuộc sống sẽ hạnh phúc hơn.",
    newWords: [
      { hanzi: "社交媒体", pinyin: "shèjiāo méitǐ", vi: "mạng xã hội" },
      { hanzi: "随时随地", pinyin: "suíshí suídì", vi: "mọi lúc mọi nơi" },
      { hanzi: "精彩", pinyin: "jīngcǎi", vi: "tuyệt vời" },
      { hanzi: "熬夜", pinyin: "áoyè", vi: "thức khuya" },
      { hanzi: "工具", pinyin: "gōngjù", vi: "công cụ" },
      { hanzi: "关键", pinyin: "guānjiàn", vi: "mấu chốt" },
      { hanzi: "幸福", pinyin: "xìngfú", vi: "hạnh phúc" },
    ],
    questions: [
      { q: "What negative effect is mentioned?", qVi: "Tác hại nào được nêu?", options: ["Eyesight problems", "Feeling not good enough & no energy", "Spending too much money", "Forgetting friends"], optionsVi: ["Hỏng mắt", "Cảm thấy mình kém & mất tinh thần", "Tiêu tiền nhiều", "Quên bạn bè"], answer: 1, explanation: "觉得自己不够好，没精神.", explanationVi: "Thấy mình kém, mất tinh thần." },
      { q: "What is the phone, according to the writer?", qVi: "Theo tác giả, điện thoại là gì?", options: ["A toy", "An enemy", "A tool", "A teacher"], optionsVi: ["Đồ chơi", "Kẻ địch", "Công cụ", "Người dạy"], answer: 2, explanation: "手机只是一个工具.", explanationVi: "Điện thoại chỉ là công cụ." },
      { q: "What advice is given?", qVi: "Lời khuyên là gì?", options: ["Delete all apps", "Stay offline forever", "Reserve some phone-free time", "Use only WeChat"], optionsVi: ["Xoá hết ứng dụng", "Không bao giờ online", "Dành chút thời gian không dùng điện thoại", "Chỉ dùng WeChat"], answer: 2, explanation: "留一点不看手机的时间.", explanationVi: "Dành thời gian không xem điện thoại." },
    ],
  },
  {
    id: "hsk4-volunteer-trip",
    emoji: "🤝",
    title: "A Week of Volunteering",
    titleVi: "Một tuần làm tình nguyện",
    hanzi: "去年夏天，我参加了一个志愿者活动，去山区的一所小学帮助孩子们学习。\n那里的条件比我想象的还要差，教室很旧，书本也不够。\n但是孩子们的眼睛非常明亮，他们对外面的世界充满了好奇。\n我教他们英语和画画，他们教我唱当地的歌。\n短短一个星期，我们就成为了好朋友。\n离开那天，一个小女孩塞给我一张纸条，上面写着：「老师，谢谢你来。」\n回到城市后，我才真正明白，帮助别人，其实也是在治愈自己。",
    pinyin: "Qùnián xiàtiān, wǒ cānjiā le yí gè zhìyuànzhě huódòng, qù shānqū de yì suǒ xiǎoxué bāngzhù háizimen xuéxí.\nNàlǐ de tiáojiàn bǐ wǒ xiǎngxiàng de hái yào chà, jiàoshì hěn jiù, shūběn yě bú gòu.\nDànshì háizimen de yǎnjing fēicháng míngliàng, tāmen duì wàimiàn de shìjiè chōngmǎn le hàoqí.\nWǒ jiāo tāmen Yīngyǔ hé huàhuà, tāmen jiāo wǒ chàng dāngdì de gē.\nDuǎnduǎn yí gè xīngqī, wǒmen jiù chéngwéi le hǎo péngyǒu.\nLíkāi nà tiān, yí gè xiǎo nǚhái sāi gěi wǒ yì zhāng zhǐtiáo, shàngmiàn xiě zhe: \"Lǎoshī, xièxie nǐ lái.\"\nHuí dào chéngshì hòu, wǒ cái zhēnzhèng míngbái, bāngzhù biérén, qíshí yě shì zài zhìyù zìjǐ.",
    vi: "Hè năm ngoái tôi tham gia hoạt động tình nguyện, đến một trường tiểu học vùng núi giúp các em học.\nĐiều kiện ở đó còn tệ hơn tôi tưởng, phòng học cũ, sách cũng không đủ.\nNhưng đôi mắt các em rất sáng, đầy tò mò với thế giới bên ngoài.\nTôi dạy các em tiếng Anh và vẽ; các em dạy tôi hát bài địa phương.\nChỉ một tuần ngắn ngủi, chúng tôi đã thành bạn thân.\nNgày rời đi, một bé gái nhét vào tay tôi mẩu giấy, ghi: \"Thầy ơi, cảm ơn thầy đã đến.\"\nVề lại thành phố, tôi mới thật sự hiểu - giúp người khác cũng chính là chữa lành cho mình.",
    newWords: [
      { hanzi: "志愿者", pinyin: "zhìyuànzhě", vi: "tình nguyện viên" },
      { hanzi: "条件", pinyin: "tiáojiàn", vi: "điều kiện" },
      { hanzi: "想象", pinyin: "xiǎngxiàng", vi: "tưởng tượng" },
      { hanzi: "好奇", pinyin: "hàoqí", vi: "tò mò" },
      { hanzi: "当地", pinyin: "dāngdì", vi: "địa phương" },
      { hanzi: "纸条", pinyin: "zhǐtiáo", vi: "mẩu giấy" },
      { hanzi: "治愈", pinyin: "zhìyù", vi: "chữa lành" },
    ],
    questions: [
      { q: "Where did the volunteering happen?", qVi: "Hoạt động diễn ra ở đâu?", options: ["A city school", "A mountain village school", "A library", "A hospital"], optionsVi: ["Trường thành phố", "Trường tiểu học vùng núi", "Thư viện", "Bệnh viện"], answer: 1, explanation: "山区的一所小学.", explanationVi: "Trường tiểu học vùng núi." },
      { q: "What did the writer teach?", qVi: "Tác giả dạy gì?", options: ["Math & music", "English & drawing", "Chinese & sports", "Cooking"], optionsVi: ["Toán & nhạc", "Tiếng Anh & vẽ", "Tiếng Trung & thể thao", "Nấu ăn"], answer: 1, explanation: "教他们英语和画画.", explanationVi: "Dạy tiếng Anh và vẽ." },
      { q: "What did the writer realize?", qVi: "Tác giả nhận ra điều gì?", options: ["Cities are bad", "Helping others heals oneself", "Kids don't need school", "Teaching is easy"], optionsVi: ["Thành phố tệ", "Giúp người khác chữa lành chính mình", "Trẻ không cần học", "Dạy học dễ"], answer: 1, explanation: "帮助别人也是在治愈自己.", explanationVi: "Giúp người khác là chữa lành mình." },
    ],
  },
];

// ============ HSK 5 ============
export const hsk5Extra: ChineseReadingPassage[] = [
  {
    id: "hsk5-slow-living",
    emoji: "🍵",
    title: "The Art of Slow Living",
    titleVi: "Nghệ thuật sống chậm",
    hanzi: "在这个一切都讲究「快」的时代，越来越多的人开始反思：我们是不是走得太快了？\n地铁里的人低头看手机，餐厅里的人一边吃饭一边回邮件，连周末似乎也变成了另一种「加班」。\n然而，幸福并不等于效率。\n泡一壶茶，看茶叶慢慢舒展；散步去菜市场，认真挑一把青菜--这些看似无用的小事，恰恰是生活的味道。\n所谓「慢生活」，并不是懒惰，而是在快节奏中为自己保留一个能呼吸的角落。\n当你愿意慢下来，你才会发现，原来时间一直在等你，是你跑得太急，错过了它温柔的样子。",
    pinyin: "Zài zhège yíqiè dōu jiǎngjiu \"kuài\" de shídài, yuè lái yuè duō de rén kāishǐ fǎnsī: wǒmen shì bú shì zǒu de tài kuài le?\nDìtiě lǐ de rén dī tóu kàn shǒujī, cāntīng lǐ de rén yìbiān chīfàn yìbiān huí yóujiàn, lián zhōumò sìhū yě biàn chéng le lìng yì zhǒng \"jiābān\".\nRán'ér, xìngfú bìng bù děngyú xiàolǜ.\nPào yì hú chá, kàn cháyè mànmàn shūzhǎn; sànbù qù càishìchǎng, rènzhēn tiāo yì bǎ qīngcài - zhèxiē kàn sì wúyòng de xiǎoshì, qiàqià shì shēnghuó de wèidao.\nSuǒwèi \"màn shēnghuó\", bìng bú shì lǎnduò, érshì zài kuài jiézòu zhōng wèi zìjǐ bǎoliú yí gè néng hūxī de jiǎoluò.\nDāng nǐ yuànyì màn xiàlái, nǐ cái huì fāxiàn, yuánlái shíjiān yìzhí zài děng nǐ, shì nǐ pǎo de tài jí, cuòguò le tā wēnróu de yàngzi.",
    vi: "Trong thời đại mọi thứ đều chú trọng \"nhanh\", ngày càng nhiều người bắt đầu tự hỏi: chúng ta có đang đi quá vội?\nTrong tàu điện ngầm ai cũng cúi đầu nhìn điện thoại, trong nhà hàng ai cũng vừa ăn vừa trả lời email, đến cuối tuần dường như cũng thành một kiểu \"tăng ca\".\nThế nhưng hạnh phúc không bằng hiệu suất.\nPha một ấm trà, nhìn lá trà từ từ nở ra; tản bộ ra chợ, nghiêm túc chọn một bó rau - những việc tưởng vô dụng ấy lại chính là vị của cuộc sống.\nCái gọi là \"sống chậm\" không phải lười biếng, mà là giữ cho mình một góc nhỏ để thở giữa nhịp sống vội vã.\nKhi bạn chịu chậm lại, bạn sẽ nhận ra thời gian vẫn luôn chờ bạn - chỉ là bạn chạy quá vội, lỡ mất dáng vẻ dịu dàng của nó.",
    newWords: [
      { hanzi: "反思", pinyin: "fǎnsī", vi: "tự ngẫm, phản tư" },
      { hanzi: "效率", pinyin: "xiàolǜ", vi: "hiệu suất" },
      { hanzi: "舒展", pinyin: "shūzhǎn", vi: "duỗi ra, nở ra" },
      { hanzi: "无用", pinyin: "wúyòng", vi: "vô dụng" },
      { hanzi: "懒惰", pinyin: "lǎnduò", vi: "lười biếng" },
      { hanzi: "节奏", pinyin: "jiézòu", vi: "nhịp điệu" },
      { hanzi: "呼吸", pinyin: "hūxī", vi: "hô hấp" },
      { hanzi: "温柔", pinyin: "wēnróu", vi: "dịu dàng" },
    ],
    questions: [
      { q: "What problem is described?", qVi: "Vấn đề được mô tả là gì?", options: ["People work too little", "Modern life is too fast", "Cities are too quiet", "Tea is too expensive"], optionsVi: ["Người làm việc quá ít", "Cuộc sống hiện đại quá nhanh", "Thành phố quá yên", "Trà quá đắt"], answer: 1, explanation: "走得太快.", explanationVi: "Đi quá nhanh." },
      { q: "What is 'slow living' according to the author?", qVi: "\"Sống chậm\" theo tác giả là gì?", options: ["Being lazy", "Quitting your job", "Keeping a space to breathe", "Sleeping more"], optionsVi: ["Lười biếng", "Nghỉ việc", "Giữ một góc để thở", "Ngủ nhiều hơn"], answer: 2, explanation: "保留一个能呼吸的角落.", explanationVi: "Giữ một góc để thở." },
      { q: "What does the closing line suggest?", qVi: "Câu kết gợi điều gì?", options: ["Time abandons us", "We outran time and missed it", "Time is money", "Time never waits"], optionsVi: ["Thời gian bỏ rơi ta", "Ta chạy vội nên bỏ lỡ thời gian", "Thời gian là tiền", "Thời gian không đợi ai"], answer: 1, explanation: "你跑得太急，错过了它.", explanationVi: "Bạn chạy quá vội, lỡ mất nó." },
    ],
  },
  {
    id: "hsk5-language-power",
    emoji: "🗣️",
    title: "The Hidden Power of Language",
    titleVi: "Sức mạnh tiềm ẩn của ngôn ngữ",
    hanzi: "学习一门新语言，远远不只是记住一些单词和语法。\n语言像一扇窗户，每打开一扇，就能看到一个不同的世界。\n当你开始用中文思考时，你会发现中国人表达情感的方式很含蓄，许多重要的话往往藏在沉默和微笑之间。\n当你用法语点一杯咖啡时，你会感受到那种从容与优雅。\n语言不仅改变我们如何说话，也悄悄塑造着我们如何思考、如何看待世界。\n所以，掌握一门外语，就像在自己心里种下另一棵树--它会用陌生的根，长出新的视野和新的自己。",
    pinyin: "Xuéxí yì mén xīn yǔyán, yuǎnyuǎn bù zhǐ shì jì zhù yìxiē dāncí hé yǔfǎ.\nYǔyán xiàng yí shàn chuānghu, měi dǎkāi yí shàn, jiù néng kàn dào yí gè bùtóng de shìjiè.\nDāng nǐ kāishǐ yòng Zhōngwén sīkǎo shí, nǐ huì fāxiàn Zhōngguó rén biǎodá qínggǎn de fāngshì hěn hánxù, xǔduō zhòngyào de huà wǎngwǎng cáng zài chénmò hé wēixiào zhī jiān.\nDāng nǐ yòng Fǎyǔ diǎn yì bēi kāfēi shí, nǐ huì gǎnshòu dào nà zhǒng cóngróng yǔ yōuyǎ.\nYǔyán bùjǐn gǎibiàn wǒmen rúhé shuōhuà, yě qiāoqiāo sùzào zhe wǒmen rúhé sīkǎo, rúhé kàndài shìjiè.\nSuǒyǐ, zhǎngwò yì mén wàiyǔ, jiù xiàng zài zìjǐ xīnlǐ zhòng xià lìng yì kē shù - tā huì yòng mòshēng de gēn, zhǎng chū xīn de shìyě hé xīn de zìjǐ.",
    vi: "Học một ngôn ngữ mới không chỉ là thuộc vài từ và ngữ pháp.\nNgôn ngữ như một ô cửa sổ, mỗi lần mở ra, ta thấy một thế giới khác.\nKhi bạn bắt đầu suy nghĩ bằng tiếng Trung, bạn sẽ nhận ra người Trung Quốc biểu đạt cảm xúc rất kín đáo, nhiều điều quan trọng ẩn trong sự im lặng và nụ cười.\nKhi bạn gọi một ly cà phê bằng tiếng Pháp, bạn sẽ cảm nhận sự thong dong và thanh lịch.\nNgôn ngữ không chỉ thay đổi cách ta nói, mà còn lặng lẽ định hình cách ta suy nghĩ, cách ta nhìn thế giới.\nVậy nên, nắm vững một ngoại ngữ giống như trồng thêm một cái cây trong tim mình - nó sẽ dùng những gốc rễ xa lạ để mọc ra góc nhìn mới và một phiên bản mới của bạn.",
    newWords: [
      { hanzi: "语法", pinyin: "yǔfǎ", vi: "ngữ pháp" },
      { hanzi: "含蓄", pinyin: "hánxù", vi: "kín đáo" },
      { hanzi: "沉默", pinyin: "chénmò", vi: "im lặng" },
      { hanzi: "从容", pinyin: "cóngróng", vi: "thong dong" },
      { hanzi: "优雅", pinyin: "yōuyǎ", vi: "thanh lịch" },
      { hanzi: "塑造", pinyin: "sùzào", vi: "định hình" },
      { hanzi: "陌生", pinyin: "mòshēng", vi: "xa lạ" },
      { hanzi: "视野", pinyin: "shìyě", vi: "tầm nhìn" },
    ],
    questions: [
      { q: "Language is compared to what?", qVi: "Ngôn ngữ được ví với gì?", options: ["A road", "A window", "A river", "A book"], optionsVi: ["Con đường", "Ô cửa sổ", "Dòng sông", "Quyển sách"], answer: 1, explanation: "语言像一扇窗户.", explanationVi: "Ngôn ngữ như ô cửa sổ." },
      { q: "How do Chinese people express emotions?", qVi: "Người Trung Quốc biểu đạt cảm xúc thế nào?", options: ["Very loudly", "Reservedly, in silence & smiles", "By writing letters", "Through music"], optionsVi: ["Rất to", "Kín đáo, trong im lặng và nụ cười", "Qua thư", "Qua âm nhạc"], answer: 1, explanation: "含蓄，藏在沉默和微笑之间.", explanationVi: "Kín đáo, trong im lặng và nụ cười." },
      { q: "What is the final metaphor for learning a language?", qVi: "Phép ẩn dụ cuối cùng là gì?", options: ["Building a wall", "Planting another tree in your heart", "Buying new clothes", "Climbing a mountain"], optionsVi: ["Xây tường", "Trồng thêm cây trong tim", "Mua quần áo mới", "Leo núi"], answer: 1, explanation: "种下另一棵树.", explanationVi: "Trồng thêm một cái cây." },
    ],
  },
];
