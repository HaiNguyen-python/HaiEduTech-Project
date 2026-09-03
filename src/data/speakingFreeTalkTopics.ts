// Free Talk prompts per language and CEFR level for the Speaking Coach.
export interface FreeTalkTopic {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  prompt: string;
  promptVi: string;
  ideas: string[];
}

const t = (
  id: string,
  level: FreeTalkTopic["level"],
  prompt: string,
  promptVi: string,
  ideas: string[]
): FreeTalkTopic => ({ id, level, prompt, promptVi, ideas });

const english: FreeTalkTopic[] = [
  t("en-ft1", "A1", "Introduce yourself: name, where you live, and what you do every day.", "Giới thiệu bản thân: tên, nơi sống và việc bạn làm mỗi ngày.", ["my name is", "I live in", "every morning I"]),
  t("en-ft2", "A1", "Describe your family and who you spend the most time with.", "Miêu tả gia đình và người bạn ở cùng nhiều nhất.", ["there are ... people", "my father works", "we usually"]),
  t("en-ft3", "A2", "Talk about your favourite food and how it is cooked.", "Nói về món ăn bạn thích và cách nấu.", ["I really enjoy", "first you", "it tastes"]),
  t("en-ft4", "A2", "Describe a place you like visiting at the weekend.", "Miêu tả một nơi bạn thích đến vào cuối tuần.", ["it is located", "I go there because", "the best part is"]),
  t("en-ft5", "B1", "Describe a skill you learned recently and how you practised it.", "Nói về một kỹ năng bạn mới học và cách bạn luyện tập.", ["I started by", "the hardest part was", "now I can"]),
  t("en-ft6", "B1", "Do you prefer studying alone or in a group? Explain why.", "Bạn thích học một mình hay theo nhóm? Vì sao?", ["personally", "on the other hand", "that is why"]),
  t("en-ft7", "B2", "Some people say social media harms teenagers. What is your view?", "Nhiều người cho rằng mạng xã hội gây hại cho thanh thiếu niên. Ý kiến bạn?", ["it is often argued", "however", "a good example is"]),
  t("en-ft8", "B2", "Describe a problem in your city and a realistic solution.", "Nói về một vấn đề ở thành phố bạn và giải pháp thực tế.", ["the main issue is", "as a result", "one solution would be"]),
  t("en-ft9", "C1", "To what extent should governments fund artificial intelligence research?", "Chính phủ nên tài trợ nghiên cứu AI đến mức nào?", ["broadly speaking", "the counter-argument", "on balance"]),
  t("en-ft10", "C1", "Is economic growth compatible with protecting the environment?", "Tăng trưởng kinh tế có song hành với bảo vệ môi trường?", ["it hinges on", "critics claim", "ultimately"]),
];

const chinese: FreeTalkTopic[] = [
  t("zh-ft1", "A1", "介绍你自己：名字、家乡和爱好。", "Giới thiệu bản thân: tên, quê và sở thích.", ["我叫", "我来自", "我喜欢"]),
  t("zh-ft2", "A2", "说说你平常的一天。", "Kể về một ngày bình thường của bạn.", ["我每天", "然后", "晚上"]),
  t("zh-ft3", "A2", "描述你最喜欢的中国菜。", "Miêu tả món Trung Quốc bạn thích nhất.", ["我最喜欢", "因为", "味道"]),
  t("zh-ft4", "B1", "说说你学中文的原因和方法。", "Vì sao và bằng cách nào bạn học tiếng Trung.", ["因为", "首先", "对我来说"]),
  t("zh-ft5", "B1", "你觉得在国外生活有什么好处和困难？", "Sống ở nước ngoài có lợi và khó gì?", ["好处是", "不过", "所以"]),
  t("zh-ft6", "B2", "网络购物会不会取代实体商店？", "Mua hàng online có thay thế cửa hàng truyền thống?", ["一方面", "另一方面", "总的来说"]),
  t("zh-ft7", "C1", "人工智能对就业市场的影响是什么？", "AI ảnh hưởng thế nào tới thị trường lao động?", ["从长远来看", "值得注意的是", "综上所述"]),
];

const japanese: FreeTalkTopic[] = [
  t("ja-ft1", "A1", "自己紹介をしてください。名前、出身、仕事や学校について。", "Giới thiệu bản thân: tên, xuất thân, công việc/trường học.", ["わたしは", "しゅみは", "です"]),
  t("ja-ft2", "A2", "きのう何をしましたか。", "Hôm qua bạn đã làm gì?", ["きのう", "それから", "たのしかったです"]),
  t("ja-ft3", "A2", "好きな食べ物について話してください。", "Nói về món ăn bạn thích.", ["いちばん好きな", "なぜなら", "おいしいです"]),
  t("ja-ft4", "B1", "日本語を勉強している理由を教えてください。", "Vì sao bạn học tiếng Nhật?", ["理由は", "たとえば", "これから"]),
  t("ja-ft5", "B1", "住んでいる町のいいところを説明してください。", "Điểm hay của thành phố bạn sống.", ["わたしの町は", "とくに", "だから"]),
  t("ja-ft6", "B2", "リモートワークについてどう思いますか。", "Bạn nghĩ gì về làm việc từ xa?", ["メリットは", "一方で", "結論として"]),
  t("ja-ft7", "C1", "少子高齢化の課題と対策について述べてください。", "Thách thức và giải pháp cho già hóa dân số.", ["現状では", "その背景には", "したがって"]),
];

const finnish: FreeTalkTopic[] = [
  t("fi-ft1", "A1", "Esittele itsesi: nimi, kotipaikka ja perhe.", "Giới thiệu bản thân: tên, nơi ở và gia đình.", ["minun nimeni on", "asun", "perheessäni on"]),
  t("fi-ft2", "A2", "Kerro tavallisesta päivästäsi.", "Kể về một ngày thường của bạn.", ["aamulla", "sen jälkeen", "illalla"]),
  t("fi-ft3", "A2", "Millainen sää on tänään ja mitä teet silloin?", "Hôm nay thời tiết thế nào và bạn làm gì?", ["tänään on", "kun on kylmä", "yleensä"]),
  t("fi-ft4", "B1", "Miksi opiskelet suomea ja miten harjoittelet sitä?", "Vì sao và bằng cách nào bạn học tiếng Phần Lan?", ["opiskelen suomea koska", "harjoittelen", "minun mielestäni"]),
  t("fi-ft5", "B1", "Kerro asuinpaikkasi hyvistä ja huonoista puolista.", "Điểm tốt và xấu của nơi bạn sống.", ["hyvä puoli on", "toisaalta", "siksi"]),
  t("fi-ft6", "B2", "Pitäisikö julkinen liikenne olla ilmaista? Perustele.", "Giao thông công cộng nên miễn phí? Vì sao?", ["mielestäni", "toisaalta", "yhteenvetona"]),
  t("fi-ft7", "C1", "Miten ilmastonmuutos vaikuttaa Pohjoismaihin?", "Biến đổi khí hậu ảnh hưởng Bắc Âu thế nào?", ["pitkällä aikavälillä", "on huomattava", "näin ollen"]),
];

const swedish: FreeTalkTopic[] = [
  t("sv-ft1", "A1", "Presentera dig själv: namn, var du bor och din familj.", "Giới thiệu bản thân: tên, nơi ở, gia đình.", ["jag heter", "jag bor i", "min familj"]),
  t("sv-ft2", "A2", "Berätta om en vanlig dag i ditt liv.", "Kể về một ngày bình thường.", ["på morgonen", "sedan", "på kvällen"]),
  t("sv-ft3", "A2", "Beskriv din favoritmat och hur man lagar den.", "Món ăn bạn thích và cách nấu.", ["jag tycker om", "först", "det smakar"]),
  t("sv-ft4", "B1", "Varför lär du dig svenska?", "Vì sao bạn học tiếng Thụy Điển?", ["jag lär mig svenska eftersom", "till exempel", "i framtiden"]),
  t("sv-ft5", "B1", "Vad är bra och dåligt med staden där du bor?", "Điều hay và dở của thành phố bạn.", ["en fördel är", "däremot", "därför"]),
  t("sv-ft6", "B2", "Borde skolan förbjuda mobiltelefoner? Motivera.", "Trường có nên cấm điện thoại? Vì sao?", ["enligt min mening", "å andra sidan", "sammanfattningsvis"]),
  t("sv-ft7", "C1", "Hur påverkar digitaliseringen arbetsmarknaden?", "Số hóa ảnh hưởng thị trường lao động thế nào?", ["på lång sikt", "det bör noteras", "slutligen"]),
];

const vietnamese: FreeTalkTopic[] = [
  t("vi-ft1", "A1", "Hãy giới thiệu về bản thân bạn.", "Introduce yourself.", ["tôi tên là", "tôi sống ở", "tôi thích"]),
  t("vi-ft2", "A2", "Kể về một ngày bình thường của bạn.", "Describe a normal day.", ["buổi sáng", "sau đó", "buổi tối"]),
  t("vi-ft3", "A2", "Món ăn Việt Nam nào bạn thích nhất? Vì sao?", "Your favourite Vietnamese dish and why.", ["tôi thích nhất", "bởi vì", "hương vị"]),
  t("vi-ft4", "B1", "Vì sao bạn học tiếng Việt và bạn học thế nào?", "Why and how you learn Vietnamese.", ["tôi học vì", "mỗi ngày tôi", "khó nhất là"]),
  t("vi-ft5", "B1", "Hãy nói về một chuyến đi đáng nhớ.", "Talk about a memorable trip.", ["năm ngoái", "chúng tôi đã", "điều tôi nhớ nhất"]),
  t("vi-ft6", "B2", "Bạn nghĩ gì về việc học trực tuyến?", "What do you think about online learning?", ["theo tôi", "tuy nhiên", "vì vậy"]),
  t("vi-ft7", "C1", "Đô thị hóa mang lại cơ hội và thách thức gì cho Việt Nam?", "Opportunities and challenges of urbanisation in Vietnam.", ["về lâu dài", "đáng chú ý là", "tóm lại"]),
];

export const speakingFreeTalkTopics: Record<string, FreeTalkTopic[]> = {
  english,
  chinese,
  japanese,
  finnish,
  swedish,
  vietnamese,
};

// Filler patterns used by the local heuristic report.
export const fillerPatterns: Record<string, string[]> = {
  english: ["um", "uh", "er", "like", "you know", "actually", "basically", "kind of", "sort of"],
  chinese: ["那个", "就是", "然后", "嗯"],
  japanese: ["あの", "えー", "まあ", "そのー"],
  finnish: ["niinku", "tota", "no", "siis"],
  swedish: ["liksom", "typ", "eh", "alltså"],
  vietnamese: ["à", "ừm", "kiểu", "thì là", "cái đó"],
};
