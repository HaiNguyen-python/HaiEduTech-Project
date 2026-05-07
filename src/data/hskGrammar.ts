/**
 * @file hskGrammar.ts
 * @description HSK Grammar curriculum from HSK 1 to HSK 6.
 * Each level groups core grammar points with explanation (VI/EN),
 * structure pattern, and bilingual examples (Hanzi + Pinyin + meaning).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface HskGrammarExample {
  hanzi: string;
  pinyin: string;
  vi: string;
  en: string;
}

export interface HskGrammarPoint {
  id: string;
  title: string; // VI
  titleEn: string;
  pattern: string; // structure formula
  explanationVi: string;
  explanationEn: string;
  examples: HskGrammarExample[];
  tipVi?: string;
  tipEn?: string;
}

export interface HskGrammarLevel {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  badge: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  points: HskGrammarPoint[];
}

export const HSK_GRAMMAR: HskGrammarLevel[] = [
  {
    level: 1,
    badge: "🥉",
    titleVi: "HSK 1 - Ngữ pháp Khởi đầu",
    titleEn: "HSK 1 - Starter Grammar",
    summaryVi: "Trật tự câu cơ bản, đại từ, số đếm, câu hỏi đơn giản và phủ định với 不/没.",
    summaryEn: "Basic word order, pronouns, numbers, simple questions, and negation with 不/没.",
    points: [
      {
        id: "hsk1-svo",
        title: "Trật tự câu Chủ - Vị - Tân",
        titleEn: "Subject - Verb - Object word order",
        pattern: "S + V + O",
        explanationVi: "Tiếng Trung dùng trật tự CN-ĐT-TN giống tiếng Việt. Không chia động từ theo ngôi.",
        explanationEn: "Mandarin follows the Subject-Verb-Object order. Verbs do not conjugate.",
        examples: [
          { hanzi: "我喝水。", pinyin: "Wǒ hē shuǐ.", vi: "Tôi uống nước.", en: "I drink water." },
          { hanzi: "他学中文。", pinyin: "Tā xué Zhōngwén.", vi: "Anh ấy học tiếng Trung.", en: "He studies Chinese." },
        ],
      },
      {
        id: "hsk1-ma",
        title: "Câu hỏi với 吗 (ma)",
        titleEn: "Yes/No questions with 吗",
        pattern: "Câu khẳng định + 吗 ?",
        explanationVi: "Thêm 吗 vào cuối câu khẳng định để tạo câu hỏi Có/Không.",
        explanationEn: "Add 吗 at the end of a statement to form a yes/no question.",
        examples: [
          { hanzi: "你好吗？", pinyin: "Nǐ hǎo ma?", vi: "Bạn khỏe không?", en: "How are you?" },
          { hanzi: "你是学生吗？", pinyin: "Nǐ shì xuéshēng ma?", vi: "Bạn là học sinh phải không?", en: "Are you a student?" },
        ],
      },
      {
        id: "hsk1-bu-mei",
        title: "Phủ định với 不 và 没",
        titleEn: "Negation with 不 and 没",
        pattern: "S + 不/没 + V",
        explanationVi: "不 phủ định ý chí, thói quen, tương lai. 没 phủ định 'có' (有) và hành động đã xảy ra.",
        explanationEn: "不 negates will, habit, future. 没 negates 'have' (有) and completed actions.",
        examples: [
          { hanzi: "我不喝咖啡。", pinyin: "Wǒ bù hē kāfēi.", vi: "Tôi không uống cà phê.", en: "I don't drink coffee." },
          { hanzi: "我没有钱。", pinyin: "Wǒ méiyǒu qián.", vi: "Tôi không có tiền.", en: "I don't have money." },
        ],
        tipVi: "Trước thanh 4 (去 qù), 不 đọc thành bú (không nhất thiết viết).",
        tipEn: "Before 4th tone (去 qù), 不 changes to bú in pronunciation.",
      },
      {
        id: "hsk1-shi",
        title: "Động từ 是 (là)",
        titleEn: "The verb 是 (to be)",
        pattern: "A + 是 + B",
        explanationVi: "Dùng 是 để định nghĩa hoặc xác định danh tính. Phủ định: 不是.",
        explanationEn: "Use 是 to define or identify. Negation: 不是.",
        examples: [
          { hanzi: "我是越南人。", pinyin: "Wǒ shì Yuènán rén.", vi: "Tôi là người Việt Nam.", en: "I am Vietnamese." },
          { hanzi: "他不是医生。", pinyin: "Tā bù shì yīshēng.", vi: "Anh ấy không phải bác sĩ.", en: "He is not a doctor." },
        ],
      },
      {
        id: "hsk1-you",
        title: "Sở hữu / tồn tại với 有",
        titleEn: "Possession / existence with 有",
        pattern: "S + 有 + O",
        explanationVi: "有 nghĩa là 'có'. Phủ định bằng 没有, không dùng 不有.",
        explanationEn: "有 means 'to have'. Negate with 没有, never 不有.",
        examples: [
          { hanzi: "我有一本书。", pinyin: "Wǒ yǒu yì běn shū.", vi: "Tôi có một cuốn sách.", en: "I have a book." },
          { hanzi: "桌子上有水。", pinyin: "Zhuōzi shàng yǒu shuǐ.", vi: "Trên bàn có nước.", en: "There is water on the table." },
        ],
      },
      {
        id: "hsk1-measure",
        title: "Lượng từ 个 và lượng từ phổ biến",
        titleEn: "Measure word 个 and common classifiers",
        pattern: "Số + Lượng từ + Danh từ",
        explanationVi: "Mỗi danh từ cần một lượng từ. 个 (gè) là lượng từ chung. Một số khác: 本 (sách), 只 (động vật nhỏ), 张 (tờ, bàn).",
        explanationEn: "Every noun requires a measure word. 个 is the general one. Others: 本 (books), 只 (small animals), 张 (sheets, tables).",
        examples: [
          { hanzi: "三个学生", pinyin: "sān gè xuéshēng", vi: "ba học sinh", en: "three students" },
          { hanzi: "两本书", pinyin: "liǎng běn shū", vi: "hai cuốn sách", en: "two books" },
        ],
      },
      {
        id: "hsk1-question-words",
        title: "Đại từ nghi vấn 什么 / 谁 / 哪儿",
        titleEn: "Question words 什么 / 谁 / 哪儿",
        pattern: "S + V + 什么/谁/哪儿 ?",
        explanationVi: "Đặt đại từ nghi vấn vào vị trí của thông tin cần hỏi. Không cần đảo trật tự.",
        explanationEn: "Place the question word where the answer would go. No word-order inversion.",
        examples: [
          { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", vi: "Bạn tên là gì?", en: "What's your name?" },
          { hanzi: "他是谁？", pinyin: "Tā shì shéi?", vi: "Anh ấy là ai?", en: "Who is he?" },
          { hanzi: "你去哪儿？", pinyin: "Nǐ qù nǎr?", vi: "Bạn đi đâu?", en: "Where are you going?" },
        ],
      },
      {
        id: "hsk1-de",
        title: "Trợ từ 的 chỉ sở hữu",
        titleEn: "Possessive particle 的",
        pattern: "A + 的 + B (B của A)",
        explanationVi: "的 nối hai danh từ tạo cụm sở hữu. Có thể bỏ 的 với quan hệ thân thiết: 我妈妈.",
        explanationEn: "的 links two nouns to show possession. It can be dropped with close relations: 我妈妈.",
        examples: [
          { hanzi: "这是我的书。", pinyin: "Zhè shì wǒ de shū.", vi: "Đây là sách của tôi.", en: "This is my book." },
          { hanzi: "老师的电话", pinyin: "lǎoshī de diànhuà", vi: "số điện thoại của giáo viên", en: "the teacher's phone number" },
        ],
      },
    ],
  },
  {
    level: 2,
    badge: "🥈",
    titleVi: "HSK 2 - Ngữ pháp Mở rộng",
    titleEn: "HSK 2 - Expanding Grammar",
    summaryVi: "Trợ từ thì 了/过, so sánh, giới từ chỉ thời gian-địa điểm, trợ động từ.",
    summaryEn: "Aspect particles 了/过, comparison, time/place prepositions, modal verbs.",
    points: [
      {
        id: "hsk2-le",
        title: "Trợ từ 了 - hành động hoàn thành",
        titleEn: "Aspect particle 了 - completed action",
        pattern: "S + V + 了 (+ O)",
        explanationVi: "了 sau động từ thể hiện hành động đã hoàn tất. Có thể đặt cuối câu để diễn đạt thay đổi trạng thái.",
        explanationEn: "了 after a verb signals completion. Sentence-final 了 expresses change of state.",
        examples: [
          { hanzi: "我吃了饭。", pinyin: "Wǒ chī le fàn.", vi: "Tôi đã ăn cơm.", en: "I ate." },
          { hanzi: "下雨了。", pinyin: "Xià yǔ le.", vi: "Trời bắt đầu mưa rồi.", en: "It's started raining." },
        ],
        tipVi: "Phủ định 了 dùng 没: 我没吃饭。",
        tipEn: "To negate, use 没: 我没吃饭。",
      },
      {
        id: "hsk2-guo",
        title: "Trợ từ 过 - kinh nghiệm",
        titleEn: "Aspect particle 过 - experience",
        pattern: "S + V + 过 (+ O)",
        explanationVi: "过 thể hiện kinh nghiệm 'đã từng'. Phủ định: 没 + V + 过.",
        explanationEn: "过 marks past experience ('have ever'). Negate with 没 + V + 过.",
        examples: [
          { hanzi: "我去过北京。", pinyin: "Wǒ qù guo Běijīng.", vi: "Tôi từng đến Bắc Kinh.", en: "I've been to Beijing." },
          { hanzi: "他没吃过寿司。", pinyin: "Tā méi chī guo shòusī.", vi: "Anh ấy chưa từng ăn sushi.", en: "He has never eaten sushi." },
        ],
      },
      {
        id: "hsk2-bi",
        title: "So sánh hơn với 比",
        titleEn: "Comparison with 比",
        pattern: "A + 比 + B + Tính từ (+ mức độ)",
        explanationVi: "Cấu trúc 比 dùng để so sánh hơn. Không dùng 很/非常 trước tính từ trong câu này.",
        explanationEn: "Use 比 to compare. Do not place 很/非常 before the adjective in such sentences.",
        examples: [
          { hanzi: "他比我高。", pinyin: "Tā bǐ wǒ gāo.", vi: "Anh ấy cao hơn tôi.", en: "He is taller than me." },
          { hanzi: "今天比昨天冷一点。", pinyin: "Jīntiān bǐ zuótiān lěng yìdiǎn.", vi: "Hôm nay lạnh hơn hôm qua một chút.", en: "Today is a bit colder than yesterday." },
        ],
      },
      {
        id: "hsk2-zai",
        title: "Giới từ 在 chỉ địa điểm",
        titleEn: "Preposition 在 for location",
        pattern: "S + 在 + Địa điểm + V + O",
        explanationVi: "在 đứng trước địa điểm và trước động từ. 在 cũng là động từ độc lập nghĩa 'ở'.",
        explanationEn: "在 precedes the location and the verb. As a stand-alone verb, 在 means 'to be at'.",
        examples: [
          { hanzi: "我在家看书。", pinyin: "Wǒ zài jiā kàn shū.", vi: "Tôi đọc sách ở nhà.", en: "I read books at home." },
          { hanzi: "她在学校。", pinyin: "Tā zài xuéxiào.", vi: "Cô ấy đang ở trường.", en: "She is at school." },
        ],
      },
      {
        id: "hsk2-modal",
        title: "Trợ động từ 会 / 能 / 可以",
        titleEn: "Modal verbs 会 / 能 / 可以",
        pattern: "S + 会/能/可以 + V",
        explanationVi: "会: kĩ năng học được; 能: khả năng/điều kiện cho phép; 可以: được phép, lịch sự xin phép.",
        explanationEn: "会: learned skill; 能: capability or permission; 可以: permission, polite requests.",
        examples: [
          { hanzi: "我会说中文。", pinyin: "Wǒ huì shuō Zhōngwén.", vi: "Tôi biết nói tiếng Trung.", en: "I can speak Chinese." },
          { hanzi: "我能游一千米。", pinyin: "Wǒ néng yóu yìqiān mǐ.", vi: "Tôi có thể bơi 1000 mét.", en: "I can swim 1000 meters." },
          { hanzi: "可以进来吗？", pinyin: "Kěyǐ jìnlái ma?", vi: "Tôi có thể vào không?", en: "May I come in?" },
        ],
      },
      {
        id: "hsk2-time-order",
        title: "Trật tự thời gian trong câu",
        titleEn: "Time word placement",
        pattern: "S + Thời gian + V + O  hoặc  Thời gian + S + V + O",
        explanationVi: "Thời gian luôn đứng trước động từ. Có thể đứng đầu câu để nhấn mạnh.",
        explanationEn: "Time always precedes the verb. It may move to sentence-initial for emphasis.",
        examples: [
          { hanzi: "我每天七点起床。", pinyin: "Wǒ měitiān qī diǎn qǐchuáng.", vi: "Tôi dậy lúc 7 giờ mỗi ngày.", en: "I get up at 7 every day." },
          { hanzi: "明天我们去公园。", pinyin: "Míngtiān wǒmen qù gōngyuán.", vi: "Ngày mai chúng tôi đi công viên.", en: "Tomorrow we go to the park." },
        ],
      },
      {
        id: "hsk2-yidian",
        title: "Phân biệt 一点儿 và 有点儿",
        titleEn: "一点儿 vs 有点儿",
        pattern: "Adj/V + 一点儿  /  有点儿 + Adj",
        explanationVi: "有点儿 đứng trước tính từ, mang nghĩa 'hơi' (thường tiêu cực). 一点儿 đứng sau, nghĩa 'một chút' (trung tính).",
        explanationEn: "有点儿 precedes the adjective and carries a slightly negative tone. 一点儿 follows and is neutral.",
        examples: [
          { hanzi: "今天有点儿热。", pinyin: "Jīntiān yǒudiǎnr rè.", vi: "Hôm nay hơi nóng.", en: "It's a bit hot today." },
          { hanzi: "便宜一点儿吧。", pinyin: "Piányi yìdiǎnr ba.", vi: "Rẻ hơn một chút đi.", en: "Make it a bit cheaper." },
        ],
      },
    ],
  },
  {
    level: 3,
    badge: "🥇",
    titleVi: "HSK 3 - Ngữ pháp Trung cấp",
    titleEn: "HSK 3 - Intermediate Grammar",
    summaryVi: "Bổ ngữ kết quả/phương hướng/khả năng, câu chữ 把, 着, trùng phức động từ, liên từ.",
    summaryEn: "Result/direction/potential complements, 把 sentence, 着, verb reduplication, conjunctions.",
    points: [
      {
        id: "hsk3-resultative",
        title: "Bổ ngữ kết quả (V + 完/到/见/好)",
        titleEn: "Resultative complement",
        pattern: "S + V + 完/到/见/好 + (O)",
        explanationVi: "Thêm tính từ/động từ ngắn sau động từ chính để chỉ kết quả của hành động.",
        explanationEn: "A short verb/adj added after the main verb expresses the action's result.",
        examples: [
          { hanzi: "我看完了这本书。", pinyin: "Wǒ kànwán le zhè běn shū.", vi: "Tôi đã đọc xong cuốn sách này.", en: "I finished reading this book." },
          { hanzi: "我没听见。", pinyin: "Wǒ méi tīngjiàn.", vi: "Tôi không nghe thấy.", en: "I didn't hear it." },
        ],
      },
      {
        id: "hsk3-directional",
        title: "Bổ ngữ phương hướng đơn (来/去)",
        titleEn: "Simple directional complement",
        pattern: "V + 来/去",
        explanationVi: "来 chỉ chiều về phía người nói; 去 chỉ chiều ra xa người nói.",
        explanationEn: "来 indicates motion toward the speaker; 去 motion away from the speaker.",
        examples: [
          { hanzi: "他跑过来了。", pinyin: "Tā pǎo guolái le.", vi: "Anh ấy chạy lại đây.", en: "He ran over here." },
          { hanzi: "请进来。", pinyin: "Qǐng jìnlái.", vi: "Mời vào.", en: "Please come in." },
        ],
      },
      {
        id: "hsk3-ba",
        title: "Câu chữ 把 - xử lý đối tượng",
        titleEn: "把 sentence - disposing of an object",
        pattern: "S + 把 + O + V + (bổ ngữ/了)",
        explanationVi: "Câu 把 nhấn mạnh tác động lên đối tượng cụ thể. Động từ phải có thành phần bổ sung (bổ ngữ, 了, lặp lại).",
        explanationEn: "The 把 sentence stresses the impact on a specific object. The verb must carry an extra element (complement, 了, reduplication).",
        examples: [
          { hanzi: "请把窗户关上。", pinyin: "Qǐng bǎ chuānghu guānshàng.", vi: "Vui lòng đóng cửa sổ lại.", en: "Please close the window." },
          { hanzi: "他把作业做完了。", pinyin: "Tā bǎ zuòyè zuòwán le.", vi: "Anh ấy đã làm xong bài tập.", en: "He finished the homework." },
        ],
        tipVi: "Tân ngữ trong câu 把 phải xác định ('cái này', 'bài tập', không dùng 一个).",
        tipEn: "The object in a 把 sentence must be definite (this, the homework), not indefinite.",
      },
      {
        id: "hsk3-zhe",
        title: "Trợ từ 着 - trạng thái tiếp diễn",
        titleEn: "Particle 着 - ongoing state",
        pattern: "V + 着",
        explanationVi: "着 mô tả trạng thái duy trì của hành động (đeo, mặc, mở…).",
        explanationEn: "着 describes a sustained state resulting from an action (wearing, holding, open).",
        examples: [
          { hanzi: "门开着。", pinyin: "Mén kāi zhe.", vi: "Cửa đang mở.", en: "The door is open." },
          { hanzi: "他笑着说。", pinyin: "Tā xiào zhe shuō.", vi: "Anh ấy vừa cười vừa nói.", en: "He spoke while smiling." },
        ],
      },
      {
        id: "hsk3-yinwei",
        title: "Liên từ 因为...所以...",
        titleEn: "Conjunction 因为...所以...",
        pattern: "因为 + nguyên nhân, 所以 + kết quả",
        explanationVi: "Cặp liên từ thể hiện quan hệ nhân quả. Có thể bỏ một trong hai vế.",
        explanationEn: "Paired conjunctions for cause-effect. One half may be omitted.",
        examples: [
          { hanzi: "因为下雨，所以我没去。", pinyin: "Yīnwèi xià yǔ, suǒyǐ wǒ méi qù.", vi: "Vì trời mưa nên tôi không đi.", en: "Because it rained, I didn't go." },
        ],
      },
      {
        id: "hsk3-suiran",
        title: "虽然...但是... - tuy nhưng",
        titleEn: "虽然...但是... - although... but...",
        pattern: "虽然 + sự thật, 但是 + tương phản",
        explanationVi: "Diễn đạt sự nhượng bộ và tương phản. Tiếng Trung giữ cả hai vế.",
        explanationEn: "Expresses concession-contrast. Mandarin keeps both halves of the pair.",
        examples: [
          { hanzi: "虽然很贵，但是很好。", pinyin: "Suīrán hěn guì, dànshì hěn hǎo.", vi: "Tuy đắt nhưng rất tốt.", en: "Although it's expensive, it's very good." },
        ],
      },
      {
        id: "hsk3-reduplication",
        title: "Trùng phức động từ V V / V 一 V",
        titleEn: "Verb reduplication V V / V 一 V",
        pattern: "V V  hoặc  V 一 V",
        explanationVi: "Trùng phức làm dịu hành động, thể hiện 'thử một chút'. Áp dụng cho động từ một âm tiết.",
        explanationEn: "Reduplication softens the verb, suggests 'give it a try'. For monosyllabic verbs.",
        examples: [
          { hanzi: "你看看这个。", pinyin: "Nǐ kànkan zhège.", vi: "Bạn xem cái này thử.", en: "Take a look at this." },
          { hanzi: "我们休息一下。", pinyin: "Wǒmen xiūxi yíxià.", vi: "Chúng ta nghỉ một chút.", en: "Let's take a quick break." },
        ],
      },
    ],
  },
  {
    level: 4,
    badge: "🏅",
    titleVi: "HSK 4 - Ngữ pháp Cao trung",
    titleEn: "HSK 4 - Upper-Intermediate Grammar",
    summaryVi: "Câu bị động 被, kết cấu 是...的, bổ ngữ trình độ/khả năng, các cặp liên từ phức tạp.",
    summaryEn: "Passive 被, 是...的 structure, degree/potential complements, advanced conjunction pairs.",
    points: [
      {
        id: "hsk4-bei",
        title: "Câu bị động với 被",
        titleEn: "Passive sentence with 被",
        pattern: "Bị thể + 被 + (chủ thể) + V + bổ ngữ",
        explanationVi: "被 thường dùng cho việc tiêu cực. Động từ cần bổ ngữ hoặc 了.",
        explanationEn: "被 is often used for negative events. The verb needs a complement or 了.",
        examples: [
          { hanzi: "我的手机被偷了。", pinyin: "Wǒ de shǒujī bèi tōu le.", vi: "Điện thoại của tôi bị trộm rồi.", en: "My phone was stolen." },
          { hanzi: "蛋糕被孩子吃完了。", pinyin: "Dàngāo bèi háizi chīwán le.", vi: "Bánh đã bị trẻ con ăn hết.", en: "The cake was eaten up by the kid." },
        ],
      },
      {
        id: "hsk4-shi-de",
        title: "Kết cấu 是...的 nhấn mạnh",
        titleEn: "是...的 structure for emphasis",
        pattern: "S + 是 + (thời gian/địa điểm/cách thức) + V + 的",
        explanationVi: "Dùng để nhấn mạnh thời gian, địa điểm, cách thức của một hành động đã xảy ra.",
        explanationEn: "Highlights when, where, or how a past action occurred.",
        examples: [
          { hanzi: "我是去年来的中国。", pinyin: "Wǒ shì qùnián lái de Zhōngguó.", vi: "Tôi đến Trung Quốc vào năm ngoái.", en: "I came to China last year." },
          { hanzi: "他是坐飞机来的。", pinyin: "Tā shì zuò fēijī lái de.", vi: "Anh ấy đến bằng máy bay.", en: "He came by plane." },
        ],
      },
      {
        id: "hsk4-degree",
        title: "Bổ ngữ trình độ với 得",
        titleEn: "Degree complement with 得",
        pattern: "S + V + 得 + bổ ngữ",
        explanationVi: "得 nối động từ với cách đánh giá hành động. Nếu có tân ngữ, lặp động từ: V + O + V + 得 + adj.",
        explanationEn: "得 connects the verb with a description. With an object, repeat the verb: V + O + V + 得 + adj.",
        examples: [
          { hanzi: "他跑得很快。", pinyin: "Tā pǎo de hěn kuài.", vi: "Anh ấy chạy rất nhanh.", en: "He runs very fast." },
          { hanzi: "他说汉语说得很好。", pinyin: "Tā shuō Hànyǔ shuō de hěn hǎo.", vi: "Anh ấy nói tiếng Trung rất tốt.", en: "He speaks Chinese very well." },
        ],
      },
      {
        id: "hsk4-potential",
        title: "Bổ ngữ khả năng (V 得/不 + bổ ngữ)",
        titleEn: "Potential complement",
        pattern: "V + 得/不 + 完/到/见/动",
        explanationVi: "Diễn đạt khả năng đạt được kết quả. 得 = có thể; 不 = không thể.",
        explanationEn: "Expresses ability to reach a result. 得 = can; 不 = cannot.",
        examples: [
          { hanzi: "我听得懂。", pinyin: "Wǒ tīng de dǒng.", vi: "Tôi có thể nghe hiểu.", en: "I can understand it." },
          { hanzi: "字太小，看不见。", pinyin: "Zì tài xiǎo, kàn bú jiàn.", vi: "Chữ quá nhỏ, không nhìn thấy.", en: "The text is too small to see." },
        ],
      },
      {
        id: "hsk4-yibian",
        title: "一边...一边... - đồng thời",
        titleEn: "一边...一边... - simultaneously",
        pattern: "S + 一边 + V1 + 一边 + V2",
        explanationVi: "Diễn đạt hai hành động xảy ra cùng lúc.",
        explanationEn: "Expresses two actions happening at the same time.",
        examples: [
          { hanzi: "我一边吃饭一边看电视。", pinyin: "Wǒ yìbiān chīfàn yìbiān kàn diànshì.", vi: "Tôi vừa ăn vừa xem TV.", en: "I eat and watch TV at the same time." },
        ],
      },
      {
        id: "hsk4-budan",
        title: "不但...而且... - không những mà còn",
        titleEn: "不但...而且... - not only... but also...",
        pattern: "不但 + A, 而且 + B",
        explanationVi: "Thêm thông tin theo hướng tăng tiến.",
        explanationEn: "Adds escalating information.",
        examples: [
          { hanzi: "他不但聪明，而且努力。", pinyin: "Tā búdàn cōngming, érqiě nǔlì.", vi: "Anh ấy không những thông minh mà còn chăm chỉ.", en: "He is not only smart but also hardworking." },
        ],
      },
      {
        id: "hsk4-jiu-cai",
        title: "就 và 才 - sớm/muộn",
        titleEn: "就 vs 才 - earlier vs later",
        pattern: "Thời gian + 就/才 + V",
        explanationVi: "就 nhấn mạnh điều xảy ra sớm/nhanh; 才 nhấn mạnh điều xảy ra muộn/khó khăn.",
        explanationEn: "就 highlights something happening early/easily; 才 stresses lateness or difficulty.",
        examples: [
          { hanzi: "他六点就来了。", pinyin: "Tā liù diǎn jiù lái le.", vi: "Anh ấy đã đến lúc 6 giờ (sớm).", en: "He came as early as 6." },
          { hanzi: "他九点才来。", pinyin: "Tā jiǔ diǎn cái lái.", vi: "Mãi 9 giờ anh ấy mới đến.", en: "He didn't come until 9." },
        ],
      },
    ],
  },
  {
    level: 5,
    badge: "🏆",
    titleVi: "HSK 5 - Ngữ pháp Cao cấp",
    titleEn: "HSK 5 - Advanced Grammar",
    summaryVi: "Cấu trúc nhấn mạnh, liên từ điều kiện/giả định, từ trừu tượng, mẫu câu báo chí.",
    summaryEn: "Emphasis structures, conditional/hypothetical conjunctions, abstract usage, journalistic patterns.",
    points: [
      {
        id: "hsk5-jishi",
        title: "即使...也... - cho dù... cũng...",
        titleEn: "即使...也... - even if... still...",
        pattern: "即使 + giả định, 也 + kết quả",
        explanationVi: "Nhấn mạnh kết quả không thay đổi dù có giả định nào.",
        explanationEn: "Stresses that the outcome holds regardless of the hypothesis.",
        examples: [
          { hanzi: "即使下雨，我也要去。", pinyin: "Jíshǐ xià yǔ, wǒ yě yào qù.", vi: "Cho dù trời mưa, tôi cũng đi.", en: "Even if it rains, I will still go." },
        ],
      },
      {
        id: "hsk5-zhiyao",
        title: "只要...就... và 只有...才...",
        titleEn: "只要...就... and 只有...才...",
        pattern: "只要 + ĐK đủ, 就 ; 只有 + ĐK cần, 才",
        explanationVi: "只要 nêu điều kiện đủ; 只有 nêu điều kiện cần (nếu thiếu sẽ không thành).",
        explanationEn: "只要 marks a sufficient condition; 只有 marks a necessary condition.",
        examples: [
          { hanzi: "只要努力，就能成功。", pinyin: "Zhǐyào nǔlì, jiù néng chénggōng.", vi: "Chỉ cần chăm chỉ thì sẽ thành công.", en: "As long as you work hard, you can succeed." },
          { hanzi: "只有努力，才能成功。", pinyin: "Zhǐyǒu nǔlì, cáinéng chénggōng.", vi: "Chỉ có chăm chỉ mới thành công được.", en: "Only by working hard can one succeed." },
        ],
      },
      {
        id: "hsk5-buguan",
        title: "不管...都/也... - bất kể",
        titleEn: "不管...都/也... - no matter what",
        pattern: "不管 + lựa chọn (bao quát), 都/也 + kết quả",
        explanationVi: "Sau 不管 thường có cặp lựa chọn (A 还是 B) hoặc đại từ nghi vấn.",
        explanationEn: "After 不管, use either an A 还是 B pair or a question word.",
        examples: [
          { hanzi: "不管多忙，他都坚持锻炼。", pinyin: "Bùguǎn duō máng, tā dōu jiānchí duànliàn.", vi: "Bất kể bận thế nào, anh ấy vẫn kiên trì tập luyện.", en: "No matter how busy, he sticks to exercising." },
        ],
      },
      {
        id: "hsk5-yuelai",
        title: "越来越 / 越...越...",
        titleEn: "越来越 / 越...越...",
        pattern: "越来越 + Adj  /  越 + V1, 越 + V2/Adj",
        explanationVi: "越来越 = càng ngày càng; 越...越... = càng... thì càng...",
        explanationEn: "越来越 = more and more; 越...越... = the more... the more...",
        examples: [
          { hanzi: "天气越来越冷。", pinyin: "Tiānqì yuè lái yuè lěng.", vi: "Thời tiết càng ngày càng lạnh.", en: "The weather is getting colder." },
          { hanzi: "他越说越快。", pinyin: "Tā yuè shuō yuè kuài.", vi: "Anh ấy càng nói càng nhanh.", en: "The more he talks, the faster he speaks." },
        ],
      },
      {
        id: "hsk5-jiang",
        title: "Văn viết: 将 thay cho 把/会",
        titleEn: "Formal: 将 for 把 / future will",
        pattern: "S + 将 + O + V  /  S + 将 + V",
        explanationVi: "将 mang sắc thái trang trọng, thường dùng trong báo chí, văn bản chính thức.",
        explanationEn: "将 is formal, common in journalism and official documents.",
        examples: [
          { hanzi: "公司将推出新产品。", pinyin: "Gōngsī jiāng tuīchū xīn chǎnpǐn.", vi: "Công ty sẽ ra mắt sản phẩm mới.", en: "The company will launch a new product." },
        ],
      },
      {
        id: "hsk5-zhi-suoyi",
        title: "之所以...是因为... - đảo nguyên nhân",
        titleEn: "之所以...是因为... - inverted cause",
        pattern: "S + 之所以 + kết quả, 是因为 + nguyên nhân",
        explanationVi: "Đảo cấu trúc nhân quả, nhấn mạnh kết quả trước.",
        explanationEn: "Inverted cause-effect structure, emphasizing the result first.",
        examples: [
          { hanzi: "他之所以成功，是因为努力。", pinyin: "Tā zhīsuǒyǐ chénggōng, shì yīnwèi nǔlì.", vi: "Sở dĩ anh ấy thành công là vì chăm chỉ.", en: "The reason he succeeded is that he worked hard." },
        ],
      },
      {
        id: "hsk5-haoxiang",
        title: "好像 / 似乎 / 仿佛 - dường như",
        titleEn: "好像 / 似乎 / 仿佛 - seem / as if",
        pattern: "S + 好像/似乎/仿佛 + (一样)",
        explanationVi: "Diễn đạt sự suy đoán hoặc so sánh ẩn dụ. 仿佛 mang tính văn chương.",
        explanationEn: "Express speculation or metaphorical comparison. 仿佛 is literary.",
        examples: [
          { hanzi: "他好像生病了。", pinyin: "Tā hǎoxiàng shēngbìng le.", vi: "Hình như anh ấy bị bệnh.", en: "He seems to be sick." },
          { hanzi: "他高兴得仿佛在飞。", pinyin: "Tā gāoxìng de fǎngfú zài fēi.", vi: "Anh vui như đang bay.", en: "He was so happy he seemed to be flying." },
        ],
      },
      {
        id: "hsk5-keyi-haishi",
        title: "宁可...也不... - thà... chứ không...",
        titleEn: "宁可...也不... - would rather... than...",
        pattern: "宁可 + A, 也不 + B",
        explanationVi: "Lựa chọn A để tránh B, dù A có khó khăn hơn.",
        explanationEn: "Choose A to avoid B, even if A is harder.",
        examples: [
          { hanzi: "我宁可走路，也不坐他的车。", pinyin: "Wǒ nìngkě zǒulù, yě bù zuò tā de chē.", vi: "Tôi thà đi bộ chứ không đi xe của anh ta.", en: "I'd rather walk than ride in his car." },
        ],
      },
    ],
  },
  {
    level: 6,
    badge: "👑",
    titleVi: "HSK 6 - Ngữ pháp Tinh thông",
    titleEn: "HSK 6 - Mastery Grammar",
    summaryVi: "Cú pháp văn chương, mẫu câu thành ngữ, nhấn mạnh trừu tượng, lùi đảo trật tự.",
    summaryEn: "Literary syntax, idiomatic patterns, abstract emphasis, inversion structures.",
    points: [
      {
        id: "hsk6-buguan-douhao",
        title: "无论...都... vs 不管...都...",
        titleEn: "无论...都... vs 不管...都...",
        pattern: "无论 + lựa chọn, 都 + kết quả",
        explanationVi: "无论 trang trọng hơn 不管, ưa dùng trong văn viết.",
        explanationEn: "无论 is more formal than 不管, preferred in writing.",
        examples: [
          { hanzi: "无论遇到什么困难，他都不放弃。", pinyin: "Wúlùn yùdào shénme kùnnán, tā dōu bú fàngqì.", vi: "Bất kể gặp khó khăn gì, anh ấy đều không bỏ cuộc.", en: "No matter what difficulty he meets, he never gives up." },
        ],
      },
      {
        id: "hsk6-yu-qi",
        title: "与其...不如... - thay vì... chi bằng...",
        titleEn: "与其...不如... - rather than... it's better to...",
        pattern: "与其 + A, 不如 + B",
        explanationVi: "So sánh hai lựa chọn và chọn B vì hợp lý hơn.",
        explanationEn: "Compares two options and recommends B as more reasonable.",
        examples: [
          { hanzi: "与其抱怨，不如行动。", pinyin: "Yǔqí bàoyuàn, bùrú xíngdòng.", vi: "Thay vì than phiền, chi bằng hành động.", en: "Rather than complain, it's better to act." },
        ],
      },
      {
        id: "hsk6-budan-fanerr",
        title: "不但不...反而... - chẳng những không... mà ngược lại",
        titleEn: "不但不...反而... - not only not... on the contrary...",
        pattern: "不但不 + A, 反而 + B (kết quả ngược kì vọng)",
        explanationVi: "Diễn đạt kết quả trái ngược với kì vọng, mang sắc thái ngạc nhiên hoặc phê phán.",
        explanationEn: "Expresses an outcome opposite to expectation, often surprising or critical.",
        examples: [
          { hanzi: "他不但不道歉，反而生气了。", pinyin: "Tā búdàn bú dàoqiàn, fǎn'ér shēngqì le.", vi: "Anh ấy chẳng những không xin lỗi mà còn nổi giận.", en: "Not only did he not apologize, he got angry instead." },
        ],
      },
      {
        id: "hsk6-fei-buke",
        title: "非...不可 / 非...不行 - nhất định phải",
        titleEn: "非...不可 / 非...不行 - must definitely",
        pattern: "非 + V/N + 不可/不行",
        explanationVi: "Khẳng định sự bắt buộc, không có lựa chọn khác.",
        explanationEn: "Stresses obligation, leaving no alternative.",
        examples: [
          { hanzi: "今天非完成不可。", pinyin: "Jīntiān fēi wánchéng bùkě.", vi: "Hôm nay nhất định phải hoàn thành.", en: "It must be finished today." },
        ],
      },
      {
        id: "hsk6-jia-xie",
        title: "加以 / 予以 - văn viết hành chính",
        titleEn: "加以 / 予以 - formal verbs",
        pattern: "对 + N + 加以/予以 + V (2 âm tiết)",
        explanationVi: "Cấu trúc trang trọng, thay cho V trực tiếp lên đối tượng.",
        explanationEn: "Formal structure replacing a direct verb on the object.",
        examples: [
          { hanzi: "我们将对此问题加以研究。", pinyin: "Wǒmen jiāng duì cǐ wèntí jiāyǐ yánjiū.", vi: "Chúng tôi sẽ tiến hành nghiên cứu vấn đề này.", en: "We will conduct research on this issue." },
        ],
      },
      {
        id: "hsk6-suo",
        title: "Cấu trúc 所 + V + 的",
        titleEn: "所 + V + 的 structure",
        pattern: "(N + ) 所 + V + 的 + (N)",
        explanationVi: "Tạo cụm danh từ trang trọng từ động từ. Thường gặp trong văn viết.",
        explanationEn: "Creates a formal noun phrase from a verb. Common in writing.",
        examples: [
          { hanzi: "这是我所知道的事实。", pinyin: "Zhè shì wǒ suǒ zhīdào de shìshí.", vi: "Đây là sự thật mà tôi biết.", en: "This is the fact that I know." },
        ],
      },
      {
        id: "hsk6-zhi-yu",
        title: "至于 - về phần",
        titleEn: "至于 - as for",
        pattern: "至于 + chủ đề mới, ...",
        explanationVi: "Chuyển chủ đề trong câu, dùng nhiều ở văn viết và bình luận.",
        explanationEn: "Shifts to a new topic, common in writing and commentary.",
        examples: [
          { hanzi: "他参加，至于我，还没决定。", pinyin: "Tā cānjiā, zhìyú wǒ, hái méi juédìng.", vi: "Anh ấy tham gia, còn về phần tôi thì chưa quyết định.", en: "He'll attend; as for me, I haven't decided." },
        ],
      },
      {
        id: "hsk6-yiwei",
        title: "意味着 / 等于 - mang nghĩa, tương đương",
        titleEn: "意味着 / 等于 - to imply, equal to",
        pattern: "S + 意味着/等于 + N/Cụm V",
        explanationVi: "Dùng để giải nghĩa, suy luận trong văn nghị luận và báo chí.",
        explanationEn: "Used to interpret or infer, common in essays and news.",
        examples: [
          { hanzi: "失败并不意味着结束。", pinyin: "Shībài bìng bù yìwèi zhe jiéshù.", vi: "Thất bại không có nghĩa là kết thúc.", en: "Failure does not mean the end." },
          { hanzi: "沉默等于同意。", pinyin: "Chénmò děngyú tóngyì.", vi: "Im lặng tương đương với đồng ý.", en: "Silence equals consent." },
        ],
      },
    ],
  },
];
