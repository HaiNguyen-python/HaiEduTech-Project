// Vietnamese Folklore Stories Collection - "Kho tàng Truyện cổ tích Việt Nam"

export interface FolkloreStory {
  id: string;
  title: string;
  titleEn: string;
  coverColor: string; // gradient for vintage book cover
  coverIcon: string;
  illustrationUrl?: string;
  category: "than-thoai" | "co-tich" | "truyen-thuyet" | "ngu-ngon";
  categoryLabel: string;
  categoryLabelEn: string;
  summary: string;
  summaryEn: string;
  story: string;
  storyEn: string;
  lessonsLearned: { vi: string; en: string }[];
  vocabulary: { word: string; meaning: string; meaningEn: string }[];
  difficulty: "easy" | "medium" | "hard";
}

export const folkloreStories: FolkloreStory[] = [
  {
    id: "son-tinh-thuy-tinh",
    title: "Sơn Tinh Thủy Tinh",
    titleEn: "The Mountain God & The Water God",
    coverColor: "from-emerald-700 to-cyan-800",
    coverIcon: "🏔️",
    category: "truyen-thuyet",
    categoryLabel: "Truyền thuyết",
    categoryLabelEn: "Legend",
    summary: "Cuộc chiến giữa Thần Núi và Thần Nước để giành tay công chúa Mỵ Nương.",
    summaryEn: "The epic battle between the Mountain God and Water God for Princess Mỵ Nương's hand.",
    difficulty: "medium",
    story: `Ngày xưa, vua Hùng Vương thứ 18 có một người con gái xinh đẹp tên là Mỵ Nương. Nàng đẹp như hoa, dịu dàng và hiền thục. Vua cha rất yêu thương con gái và muốn tìm cho nàng một người chồng xứng đáng.

Một ngày, có hai chàng trai đến cầu hôn. Người thứ nhất là Sơn Tinh — chúa Tản Viên, có phép lạ gọi đất đá, cây cối mọc lên theo ý muốn. Người thứ hai là Thủy Tinh — chúa vùng biển, có thể hô mưa gọi gió, dâng nước lên cao.

Cả hai đều tài giỏi, vua Hùng không biết chọn ai. Ngài bèn ra điều kiện: "Ai mang sính lễ đến trước sẽ được cưới Mỵ Nương." Sính lễ gồm: một trăm ván cơm nếp, một trăm nệp bánh chưng, voi chín ngà, gà chín cựa, ngựa chín hồng mao.

Sáng hôm sau, Sơn Tinh mang sính lễ đến trước và rước Mỵ Nương về núi Tản Viên. Thủy Tinh đến sau, tức giận đùng đùng, dâng nước đánh Sơn Tinh. Nước dâng cao bao nhiêu, Sơn Tinh hóa phép cho núi cao lên bấy nhiêu. Đánh mãi không thắng, Thủy Tinh đành rút lui.

Từ đó, năm nào Thủy Tinh cũng dâng nước đánh Sơn Tinh, gây ra lũ lụt. Đó là lý do vì sao mỗi năm Việt Nam đều có mùa mưa lũ.`,
    storyEn: `Long ago, the 18th Hùng King had a beautiful daughter named Mỵ Nương. She was as lovely as a flower, gentle and graceful. The king loved her dearly and wanted to find her a worthy husband.

One day, two young men came to ask for her hand. The first was Sơn Tinh — Lord of Tản Viên Mountain, who could command earth, rocks, and trees to rise at his will. The second was Thủy Tinh — Lord of the Seas, who could summon rain, wind, and raise the waters high.

Both were equally talented, and the king could not choose. He set a challenge: "Whoever brings the wedding gifts first shall marry Mỵ Nương." The gifts required: one hundred trays of sticky rice, one hundred bánh chưng cakes, an elephant with nine tusks, a rooster with nine spurs, and a horse with nine red manes.

The next morning, Sơn Tinh arrived first with all the gifts and took Mỵ Nương to Tản Viên Mountain. Thủy Tinh arrived late and flew into a rage, raising the waters to attack Sơn Tinh. But however high the waters rose, Sơn Tinh made the mountains rise higher. Unable to win, Thủy Tinh had to retreat.

Since then, every year Thủy Tinh raises the waters to fight Sơn Tinh, causing floods. This is why Vietnam has a flood season every year.`,
    lessonsLearned: [
      { vi: "Thiên nhiên luôn có quy luật: lũ lụt là hiện tượng tự nhiên.", en: "Nature follows its own laws: floods are a natural phenomenon." },
      { vi: "Kiên trì và bền bỉ sẽ chiến thắng.", en: "Persistence and resilience lead to victory." },
      { vi: "Người Việt luôn sống hài hòa với thiên nhiên.", en: "Vietnamese people live in harmony with nature." },
    ],
    vocabulary: [
      { word: "cầu hôn", meaning: "xin cưới", meaningEn: "to propose marriage" },
      { word: "sính lễ", meaning: "lễ vật cưới", meaningEn: "wedding gifts/dowry" },
      { word: "hóa phép", meaning: "dùng phép thuật", meaningEn: "to use magic" },
      { word: "lũ lụt", meaning: "nước dâng cao gây ngập", meaningEn: "flood" },
    ],
  },
  {
    id: "thanh-giong",
    title: "Thánh Gióng",
    titleEn: "Saint Gióng – The Giant Hero",
    coverColor: "from-red-700 to-amber-800",
    coverIcon: "🐴",
    category: "truyen-thuyet",
    categoryLabel: "Truyền thuyết",
    categoryLabelEn: "Legend",
    summary: "Cậu bé 3 tuổi vươn mình thành người khổng lồ, cưỡi ngựa sắt đánh giặc Ân.",
    summaryEn: "A 3-year-old boy grows into a giant, rides an iron horse, and defeats the Ân invaders.",
    difficulty: "easy",
    story: `Đời Hùng Vương thứ 6, ở làng Gióng có hai vợ chồng già, hiền lành nhưng chưa có con. Một hôm, bà vợ ra đồng, thấy một vết chân to lạ thường, bèn ướm thử. Về nhà, bà mang thai và sinh ra một cậu bé khôi ngô.

Lạ thay, cậu bé lên ba tuổi vẫn không biết nói, không biết cười, đặt đâu nằm đấy. Bấy giờ, giặc Ân kéo đến xâm lăng. Vua Hùng sai sứ đi khắp nơi tìm người tài cứu nước.

Khi sứ giả đến làng Gióng, cậu bé bỗng cất tiếng nói: "Mẹ ơi, mời sứ giả vào đây!" Cậu bảo sứ giả về tâu vua rèn cho một con ngựa sắt, một cây roi sắt và một bộ áo giáp sắt.

Khi giặc đến, cậu bé vươn vai biến thành một tráng sĩ khổng lồ, mặc áo giáp, cầm roi sắt, nhảy lên ngựa sắt phun lửa, xông ra trận. Giặc tan tác. Roi sắt gãy, Gióng nhổ bụi tre bên đường quật vào giặc. Đánh tan giặc, Gióng cưỡi ngựa bay lên trời từ núi Sóc Sơn.

Vua nhớ công ơn, phong là Phù Đổng Thiên Vương. Ngày nay, những bụi tre đằng ngà ở vùng ấy có màu vàng óng — dấu tích ngựa sắt phun lửa.`,
    storyEn: `During the reign of the 6th Hùng King, in Gióng village there lived an old couple who were kind but had no children. One day, the wife went to the field and saw an unusually large footprint. She stepped into it curiously. When she returned home, she became pregnant and gave birth to a handsome boy.

Strangely, by age three the boy could not speak, laugh, or move from wherever he was placed. At that time, the Ân invaders attacked. The king sent messengers everywhere to find heroes.

When the messenger reached Gióng village, the boy suddenly spoke: "Mother, invite the messenger in!" He told the messenger to ask the king for an iron horse, an iron whip, and a suit of iron armor.

When the enemy arrived, the boy stretched and transformed into a giant warrior. He donned the armor, took the iron whip, mounted the fire-breathing iron horse, and charged into battle. The enemy scattered. When his whip broke, Gióng uprooted bamboo clumps to strike the invaders. After defeating them all, Gióng rode his horse into the sky from Sóc Sơn Mountain.

The king honored him as Phù Đổng Thiên Vương. Today, the golden bamboo in that region is said to be scorched by the iron horse's fire.`,
    lessonsLearned: [
      { vi: "Lòng yêu nước là sức mạnh vô biên.", en: "Patriotism is a boundless strength." },
      { vi: "Anh hùng có thể đến từ bất cứ đâu.", en: "Heroes can come from anywhere." },
      { vi: "Đoàn kết chống ngoại xâm là truyền thống Việt Nam.", en: "Unity against invaders is a Vietnamese tradition." },
    ],
    vocabulary: [
      { word: "tráng sĩ", meaning: "người trai khỏe mạnh", meaningEn: "warrior/hero" },
      { word: "xâm lăng", meaning: "xâm chiếm đất nước khác", meaningEn: "to invade" },
      { word: "áo giáp", meaning: "đồ bảo vệ cơ thể", meaningEn: "armor" },
      { word: "vươn vai", meaning: "duỗi thẳng người", meaningEn: "to stretch up" },
    ],
  },
  {
    id: "su-tich-trau-cau",
    title: "Sự tích Trầu Cau",
    titleEn: "The Legend of Betel & Areca",
    coverColor: "from-green-800 to-lime-700",
    coverIcon: "🌿",
    category: "truyen-thuyet",
    categoryLabel: "Truyền thuyết",
    categoryLabelEn: "Legend",
    summary: "Câu chuyện về tình anh em, tình vợ chồng và nguồn gốc tục ăn trầu.",
    summaryEn: "A tale of brotherly love, marital devotion, and the origin of betel chewing.",
    difficulty: "medium",
    story: `Ngày xưa, có hai anh em sinh đôi tên Tân và Lang, giống nhau như đúc. Sau khi cha mẹ mất, Tân lấy vợ. Người vợ tên là nàng Lưu.

Một hôm, nàng Lưu nhầm Lang là chồng mình. Lang xấu hổ bỏ nhà ra đi. Đến bờ suối, Lang khóc mãi rồi hóa thành tảng đá vôi.

Tân đi tìm em, thấy tảng đá, ngồi khóc bên cạnh rồi hóa thành cây cau, thân thẳng vươn cao bên tảng đá.

Nàng Lưu đi tìm chồng, ôm cây cau khóc rồi hóa thành dây trầu quấn quanh cây cau.

Vua Hùng đi qua, nghe câu chuyện, lấy lá trầu, quả cau, và vôi từ đá nhai thử. Miếng trầu đỏ thắm tượng trưng cho tình yêu bền chặt. Từ đó, tục ăn trầu trở thành phong tục quan trọng trong đám cưới và lễ hội Việt Nam.`,
    storyEn: `Long ago, there were twin brothers named Tân and Lang who looked exactly alike. After their parents passed away, Tân married a woman named Lưu.

One day, Lưu mistook Lang for her husband. Embarrassed, Lang left home. He walked to a stream, wept endlessly, and turned into a limestone rock.

Tân searched for his brother. He found the rock, sat beside it crying, and turned into an areca palm tree, its trunk rising tall beside the stone.

Lưu searched for her husband. She embraced the areca tree, wept, and transformed into a betel vine wrapping around the tree.

King Hùng passed by, heard the story, and chewed betel leaf, areca nut, and lime from the rock together. The bright red color symbolized undying love. From then on, betel chewing became an essential tradition in Vietnamese weddings and festivals.`,
    lessonsLearned: [
      { vi: "Tình anh em là thiêng liêng, không gì có thể chia cắt.", en: "Brotherly love is sacred and inseparable." },
      { vi: "Miếng trầu là đầu câu chuyện — tục ăn trầu thể hiện sự gắn kết.", en: "Betel symbolizes connection — it starts every conversation." },
      { vi: "Văn hóa Việt trân trọng tình cảm gia đình.", en: "Vietnamese culture deeply values family bonds." },
    ],
    vocabulary: [
      { word: "sinh đôi", meaning: "hai anh em cùng sinh ra", meaningEn: "twins" },
      { word: "hóa thành", meaning: "biến thành", meaningEn: "to transform into" },
      { word: "phong tục", meaning: "tập quán truyền thống", meaningEn: "custom/tradition" },
      { word: "tượng trưng", meaning: "đại diện cho", meaningEn: "to symbolize" },
    ],
  },
  {
    id: "thach-sanh",
    title: "Thạch Sanh",
    titleEn: "Thạch Sanh – The Brave Woodcutter",
    coverColor: "from-amber-700 to-orange-800",
    coverIcon: "🪓",
    category: "co-tich",
    categoryLabel: "Cổ tích",
    categoryLabelEn: "Fairy Tale",
    summary: "Chàng tiều phu dũng cảm diệt chằn tinh, giải cứu công chúa dưới hang sâu.",
    summaryEn: "A brave woodcutter slays a serpent demon and rescues the princess from an underground cave.",
    difficulty: "medium",
    story: `Thạch Sanh là con của một gia đình nghèo. Cha mẹ mất sớm, Thạch Sanh sống một mình dưới gốc đa, chặt củi kiếm sống. Chàng được thiên thần dạy cho võ nghệ và phép thuật.

Lý Thông — một kẻ gian xảo — kết nghĩa anh em với Thạch Sanh. Khi đến lượt Lý Thông nộp mạng cho chằn tinh, hắn lừa Thạch Sanh đi thay. Thạch Sanh dũng cảm giết chằn tinh, nhưng Lý Thông cướp công, nhận mình là người giết.

Sau đó, công chúa bị đại bàng khổng lồ bắt xuống hang sâu. Thạch Sanh xuống hang cứu được công chúa, nhưng Lý Thông lại lấp cửa hang, bỏ mặc Thạch Sanh.

Dưới hang, Thạch Sanh cứu thêm con trai vua Thủy Tề và được tặng cây đàn thần. Chàng đánh đàn, tiếng đàn thấu đến cung vua. Công chúa từ ngày trở về không nói không cười, nhưng khi nghe tiếng đàn, nàng sống lại.

Vua tìm ra sự thật, trừng phạt Lý Thông, và gả công chúa cho Thạch Sanh. Khi 18 nước kéo quân đến đánh, Thạch Sanh đánh đàn, tiếng nhạc khiến quân giặc buông vũ khí. Chàng nấu niêu cơm thần đãi quân giặc, cơm ăn mãi không hết. Quân giặc cảm phục rút lui.`,
    storyEn: `Thạch Sanh was born to a poor family. Orphaned young, he lived alone under a banyan tree, chopping wood for a living. A heavenly spirit taught him martial arts and magic.

Lý Thông — a cunning man — became his sworn brother. When it was Lý Thông's turn to be sacrificed to the serpent demon, he tricked Thạch Sanh into going instead. Thạch Sanh bravely slayed the demon, but Lý Thông stole the credit.

Later, a giant eagle captured the princess and took her to a deep cave. Thạch Sanh descended to rescue her, but Lý Thông sealed the cave entrance, abandoning him.

Underground, Thạch Sanh also rescued the Sea King's son and received a magical lute. He played it, and its music reached the royal palace. The princess, who had not spoken or smiled since her return, came back to life upon hearing the melody.

The king discovered the truth, punished Lý Thông, and married the princess to Thạch Sanh. When 18 nations attacked, Thạch Sanh played his lute — the music made the soldiers drop their weapons. He served them rice from his magic pot that never emptied. Moved by his generosity, the armies retreated.`,
    lessonsLearned: [
      { vi: "Người hiền lành, dũng cảm sẽ được đền đáp xứng đáng.", en: "The kind and brave are justly rewarded." },
      { vi: "Kẻ gian xảo sẽ bị trừng phạt.", en: "The deceitful will face punishment." },
      { vi: "Âm nhạc và lòng nhân ái mạnh hơn vũ lực.", en: "Music and compassion are more powerful than force." },
    ],
    vocabulary: [
      { word: "chằn tinh", meaning: "yêu quái hình rắn", meaningEn: "serpent demon" },
      { word: "kết nghĩa", meaning: "nhận làm anh em", meaningEn: "to become sworn brothers" },
      { word: "cướp công", meaning: "lấy công của người khác", meaningEn: "to steal credit" },
      { word: "niêu cơm thần", meaning: "nồi cơm ăn không hết", meaningEn: "magic rice pot" },
    ],
  },
  {
    id: "tam-cam",
    title: "Tấm Cám",
    titleEn: "Tấm Cám – The Vietnamese Cinderella",
    coverColor: "from-pink-700 to-rose-800",
    coverIcon: "👸",
    category: "co-tich",
    categoryLabel: "Cổ tích",
    categoryLabelEn: "Fairy Tale",
    summary: "Cô gái mồ côi Tấm bị dì ghẻ hãm hại nhưng cuối cùng trở thành hoàng hậu.",
    summaryEn: "Orphan girl Tấm is mistreated by her stepmother but eventually becomes queen.",
    difficulty: "hard",
    story: `Tấm và Cám là hai chị em cùng cha khác mẹ. Mẹ Tấm mất sớm, Tấm sống với dì ghẻ và em gái Cám. Dì ghẻ bắt Tấm làm mọi việc nặng nhọc, còn Cám thì được nuông chiều.

Một hôm, dì ghẻ sai hai chị em đi bắt tôm. Tấm siêng năng bắt được đầy giỏ, nhưng Cám lừa trút hết tôm sang giỏ mình. Tấm chỉ còn con cá bống nhỏ, nuôi ngoài giếng. Dì ghẻ lừa Tấm đi chăn trâu, bắt cá bống ăn thịt.

Tấm khóc, ông Bụt hiện lên dạy Tấm lấy xương cá bống bỏ vào bốn cái lọ chôn dưới chân giường. Đến ngày hội, Tấm không có áo đẹp. Bụt bảo đào lọ lên — trong đó có áo đẹp, giày, và ngựa. Tấm đi dự hội, đánh rơi chiếc giày. Vua nhặt được, cho thử giày khắp nước. Chỉ Tấm mang vừa, vua cưới Tấm làm hoàng hậu.

Nhưng dì ghẻ không buông tha, nhiều lần hại Tấm. Tấm chết đi sống lại qua nhiều kiếp: chim vàng anh, cây xoan đào, khung cửi, quả thị. Cuối cùng, một bà lão nhặt quả thị, Tấm bước ra, xinh đẹp hơn xưa. Vua nhận ra vợ, đón Tấm về cung.`,
    storyEn: `Tấm and Cám were half-sisters sharing the same father. Tấm's mother died early, leaving her with a cruel stepmother and stepsister Cám. The stepmother forced Tấm to do all the hard work while spoiling Cám.

One day, the stepmother sent both to catch shrimp. Hardworking Tấm caught a full basket, but Cám tricked her and poured all the shrimp into her own basket. Tấm was left with only a tiny goby fish, which she kept in the well. The stepmother tricked Tấm into herding buffalo and killed the fish.

Tấm wept. The fairy Bụt appeared and told her to save the fish bones in four jars buried under her bed. On festival day, Tấm had no fine clothes. Bụt told her to dig up the jars — inside were beautiful clothes, shoes, and a horse. Tấm went to the festival and dropped a shoe. The king found it and had every girl try it on. Only Tấm's foot fit perfectly, and the king married her.

But the stepmother wouldn't stop. She killed Tấm multiple times. Tấm was reborn through many forms: a golden oriole, a peach tree, a loom, and a persimmon fruit. Finally, an old woman found the persimmon, and Tấm stepped out, more beautiful than ever. The king recognized his wife and brought her back to the palace.`,
    lessonsLearned: [
      { vi: "Ở hiền gặp lành — thiện sẽ thắng ác.", en: "Goodness prevails — virtue defeats evil." },
      { vi: "Sự kiên cường giúp vượt qua mọi thử thách.", en: "Resilience helps overcome all challenges." },
      { vi: "Đừng bao giờ từ bỏ, dù hoàn cảnh khó khăn nhất.", en: "Never give up, even in the most difficult circumstances." },
    ],
    vocabulary: [
      { word: "dì ghẻ", meaning: "mẹ kế", meaningEn: "stepmother" },
      { word: "nuông chiều", meaning: "cưng chiều quá mức", meaningEn: "to spoil/pamper" },
      { word: "ông Bụt", meaning: "vị thần giúp đỡ người tốt", meaningEn: "the fairy godfather" },
      { word: "kiếp", meaning: "đời sống", meaningEn: "reincarnation/life" },
    ],
  },
  {
    id: "chu-cuoi",
    title: "Chú Cuội ngồi gốc cây đa",
    titleEn: "Cuội on the Moon",
    coverColor: "from-indigo-700 to-purple-800",
    coverIcon: "🌕",
    category: "co-tich",
    categoryLabel: "Cổ tích",
    categoryLabelEn: "Fairy Tale",
    summary: "Chú Cuội nói dối bị cây đa mang lên mặt trăng.",
    summaryEn: "Cuội the liar is carried to the moon by a magical banyan tree.",
    difficulty: "easy",
    story: `Ngày xưa, có một chàng tiều phu tên Cuội. Một hôm đi rừng, Cuội thấy một cây thuốc thần có thể cứu người chết sống lại. Chàng mang cây về trồng trước nhà.

Cây thần rất linh, ai ốm đau, Cuội hái lá chữa đều khỏi. Nhưng có một điều kiêng kỵ: không được tưới nước bẩn vào gốc cây.

Vợ Cuội hay quên lại hay nói dối. Một hôm, nàng lỡ tưới nước bẩn vào gốc cây. Cây bật gốc bay lên trời. Cuội chạy đến bám vào rễ cây, nhưng cây cứ bay mãi lên đến tận mặt trăng.

Từ đó, chú Cuội ngồi gốc cây đa trên mặt trăng. Mỗi đêm rằm, trẻ em nhìn lên trăng đều thấy hình chú Cuội ngồi buồn dưới gốc đa, nhớ nhà.

Đêm Trung thu, trẻ em Việt Nam rước đèn, phá cỗ và hát: "Chú Cuội ngồi gốc cây đa, để trâu ăn lúa gọi cha ời ời..."`,
    storyEn: `Long ago, there was a woodcutter named Cuội. One day in the forest, he discovered a magical tree that could bring the dead back to life. He brought it home and planted it in his yard.

The tree was powerful — Cuội could cure anyone by using its leaves. But there was one rule: never water its roots with dirty water.

Cuội's wife was forgetful and dishonest. One day, she accidentally poured dirty water on the tree's roots. The tree uprooted itself and began flying toward the sky. Cuội ran and grabbed onto the roots, but the tree kept rising until it reached the moon.

Since then, Cuội has been sitting under the banyan tree on the moon. Every full moon night, children look up and see the silhouette of Cuội sitting sadly under the tree, missing home.

During the Mid-Autumn Festival, Vietnamese children carry lanterns, share mooncakes, and sing: "Cuội sits under the banyan tree, let the buffalo eat the rice, calling for father..."`,
    lessonsLearned: [
      { vi: "Nói dối sẽ gánh hậu quả — hãy sống thật.", en: "Lying has consequences — live honestly." },
      { vi: "Tết Trung thu là ngày của trẻ em và gia đình.", en: "The Mid-Autumn Festival celebrates children and family." },
      { vi: "Hãy trân trọng những gì mình có trước khi mất đi.", en: "Appreciate what you have before it's gone." },
    ],
    vocabulary: [
      { word: "tiều phu", meaning: "người chặt củi", meaningEn: "woodcutter" },
      { word: "kiêng kỵ", meaning: "điều cấm, không nên làm", meaningEn: "taboo/prohibition" },
      { word: "rằm", meaning: "ngày 15 âm lịch, trăng tròn", meaningEn: "full moon (15th lunar day)" },
      { word: "rước đèn", meaning: "đi diễu hành với đèn lồng", meaningEn: "lantern parade" },
    ],
  },
  {
    id: "lac-long-quan-au-co",
    title: "Lạc Long Quân và Âu Cơ",
    titleEn: "The Dragon Lord & The Fairy – Origin of Vietnam",
    coverColor: "from-yellow-700 to-red-700",
    coverIcon: "🐉",
    category: "than-thoai",
    categoryLabel: "Thần thoại",
    categoryLabelEn: "Mythology",
    summary: "Truyền thuyết về nguồn gốc Con Rồng Cháu Tiên của dân tộc Việt Nam.",
    summaryEn: "The legend of the Dragon and Fairy origin of the Vietnamese people.",
    difficulty: "easy",
    story: `Ngày xưa, Lạc Long Quân là con trai của thần rồng, sống dưới biển. Âu Cơ là tiên nữ xinh đẹp, sống trên núi cao.

Hai người gặp nhau và yêu nhau. Âu Cơ sinh ra một bọc trăm trứng, nở ra trăm người con, trai gái đều khôi ngô tuấn tú.

Nhưng Lạc Long Quân thuộc về biển, Âu Cơ thuộc về núi. Họ không thể sống cùng nhau mãi. Lạc Long Quân nói: "Ta là giống Rồng, nàng là giống Tiên. Thủy hỏa tương khắc, không thể ở cùng."

Họ chia nhau: 50 con theo cha xuống biển, 50 con theo mẹ lên núi. Người con cả theo mẹ lên vùng đất Phong Châu, được tôn làm vua, lấy hiệu Hùng Vương — mở đầu triều đại Hùng Vương.

Vì thế, người Việt Nam tự hào gọi mình là "Con Rồng Cháu Tiên" — con cháu của rồng và tiên.`,
    storyEn: `Long ago, Lạc Long Quân was the son of a dragon god who lived under the sea. Âu Cơ was a beautiful fairy who dwelt in the high mountains.

They met and fell in love. Âu Cơ gave birth to a sac containing one hundred eggs, which hatched into one hundred beautiful children.

But Lạc Long Quân belonged to the sea, and Âu Cơ belonged to the mountains. They could not live together forever. Lạc Long Quân said: "I am of the Dragon race, you are of the Fairy race. Water and fire oppose each other — we cannot stay together."

They divided their children: 50 went with the father to the sea, 50 went with the mother to the mountains. The eldest son followed his mother to Phong Châu and was crowned king, taking the title Hùng Vương — beginning the Hùng dynasty.

This is why Vietnamese people proudly call themselves "Con Rồng Cháu Tiên" — descendants of the Dragon and the Fairy.`,
    lessonsLearned: [
      { vi: "Người Việt cùng một nguồn gốc — đoàn kết là sức mạnh.", en: "All Vietnamese share one origin — unity is strength." },
      { vi: "Truyền thuyết giải thích bản sắc dân tộc.", en: "Legends explain national identity." },
      { vi: "Con Rồng Cháu Tiên — niềm tự hào Việt Nam.", en: "Dragon and Fairy descendants — Vietnamese pride." },
    ],
    vocabulary: [
      { word: "bọc trứng", meaning: "túi chứa trứng", meaningEn: "egg sac" },
      { word: "tương khắc", meaning: "đối lập, không hợp nhau", meaningEn: "incompatible/opposing" },
      { word: "triều đại", meaning: "thời kỳ cai trị của một dòng vua", meaningEn: "dynasty" },
      { word: "tôn làm vua", meaning: "tôn lên ngôi vua", meaningEn: "to crown as king" },
    ],
  },
  {
    id: "su-tich-banh-chung",
    title: "Sự tích Bánh Chưng Bánh Dày",
    titleEn: "The Legend of Bánh Chưng & Bánh Dày",
    coverColor: "from-green-700 to-teal-800",
    coverIcon: "🍚",
    category: "truyen-thuyet",
    categoryLabel: "Truyền thuyết",
    categoryLabelEn: "Legend",
    summary: "Hoàng tử Lang Liêu dâng bánh chưng, bánh dày được nối ngôi vua.",
    summaryEn: "Prince Lang Liêu offers rice cakes and inherits the throne.",
    difficulty: "easy",
    story: `Vua Hùng Vương thứ 6 muốn truyền ngôi cho con. Ngài ra lệnh: "Ai dâng lên lễ vật ý nghĩa nhất trong ngày Tết sẽ được nối ngôi."

Các hoàng tử tranh nhau tìm sơn hào hải vị quý hiếm. Riêng Lang Liêu — con trai thứ 18, mồ côi mẹ, nghèo nhất — không biết dâng gì.

Đêm đó, Lang Liêu nằm mơ thấy thần linh bảo: "Trên đời không gì quý bằng gạo. Hãy dùng gạo nếp làm bánh." Lang Liêu dùng gạo nếp, đỗ xanh, thịt lợn gói lá dong thành bánh vuông — tượng trưng cho Đất. Chàng lại lấy gạo nếp giã nhuyễn nặn thành bánh tròn — tượng trưng cho Trời.

Vua Hùng nếm thử, thấy bánh vừa ngon vừa ý nghĩa. Ngài nói: "Bánh vuông là Đất, bánh tròn là Trời. Đây mới là lễ vật đáng quý nhất!" Ngài truyền ngôi cho Lang Liêu.

Từ đó, mỗi dịp Tết Nguyên Đán, người Việt Nam gói bánh chưng (vuông) và bánh dày (tròn) để nhớ ơn tổ tiên và trân trọng hạt gạo.`,
    storyEn: `The 6th Hùng King wanted to pass the throne to one of his sons. He declared: "Whoever presents the most meaningful offering for Tết shall inherit the throne."

The princes competed to find the rarest delicacies from mountains and seas. But Lang Liêu — the 18th prince, motherless and the poorest — had nothing to offer.

That night, Lang Liêu dreamed of a spirit who said: "Nothing on earth is more precious than rice. Use sticky rice to make cakes." Lang Liêu used sticky rice, mung beans, and pork wrapped in dong leaves to make a square cake — symbolizing Earth. He also pounded sticky rice into a round cake — symbolizing Heaven.

The king tasted them and found them both delicious and meaningful. He said: "The square cake is Earth, the round cake is Heaven. These are the most precious offerings!" He passed the throne to Lang Liêu.

Since then, every Lunar New Year, Vietnamese people make bánh chưng (square) and bánh dày (round) to honor their ancestors and cherish rice.`,
    lessonsLearned: [
      { vi: "Sáng tạo và lòng chân thành quý hơn vật chất.", en: "Creativity and sincerity are more valuable than material wealth." },
      { vi: "Hạt gạo là biểu tượng của nền văn minh lúa nước.", en: "Rice symbolizes the wet-rice civilization." },
      { vi: "Tết Nguyên Đán gắn liền với tri ân tổ tiên.", en: "Lunar New Year is tied to gratitude toward ancestors." },
    ],
    vocabulary: [
      { word: "sơn hào hải vị", meaning: "món ăn quý hiếm từ núi và biển", meaningEn: "rare mountain and sea delicacies" },
      { word: "gạo nếp", meaning: "loại gạo dẻo dùng làm bánh", meaningEn: "sticky/glutinous rice" },
      { word: "tượng trưng", meaning: "đại diện cho", meaningEn: "to symbolize" },
      { word: "Tết Nguyên Đán", meaning: "năm mới âm lịch", meaningEn: "Lunar New Year" },
    ],
  },
  {
    id: "cay-khe",
    title: "Cây Khế",
    titleEn: "The Star Fruit Tree",
    coverColor: "from-lime-600 to-yellow-700",
    coverIcon: "⭐",
    category: "co-tich",
    categoryLabel: "Cổ tích",
    categoryLabelEn: "Fairy Tale",
    summary: "Hai anh em và cây khế — người lương thiện được thưởng, kẻ tham lam bị trừng phạt.",
    summaryEn: "Two brothers and a star fruit tree — the honest is rewarded, the greedy is punished.",
    difficulty: "easy",
    story: `Ngày xưa, có hai anh em. Cha mẹ mất, người anh tham lam chiếm hết gia tài, chỉ chia cho em một cây khế.

Mùa khế chín, một con chim lạ đến ăn quả. Người em buồn bã nói: "Chim ơi, chim ăn hết khế, tôi lấy gì sống?" Chim đáp: "Ăn một quả, trả cục vàng. May túi ba gang, mang đi mà đựng."

Người em may túi đúng ba gang, chim chở đến đảo vàng. Anh chỉ lấy đầy túi rồi về. Từ đó, người em sống sung sướng.

Người anh nghe tin, đổi hết gia tài lấy cây khế. Chim lại đến, nói câu cũ. Nhưng người anh tham lam may túi mười hai gang, ra đảo vàng nhét đầy vàng bạc châu báu. Trên đường về, túi quá nặng, chim không bay nổi. Người anh rơi xuống biển mất tích.`,
    storyEn: `Long ago, there were two brothers. After their parents died, the greedy elder brother took all the inheritance and only gave the younger brother a star fruit tree.

When the star fruits ripened, a strange bird came to eat them. The younger brother said sadly: "Bird, you've eaten all my fruits. How will I survive?" The bird replied: "Eat one fruit, repay with gold. Sew a three-span bag to carry it."

The younger brother sewed a bag exactly three spans, and the bird carried him to a golden island. He took only what the bag could hold and returned. From then on, he lived happily.

The elder brother heard this and traded all his wealth for the star fruit tree. The bird came and said the same words. But the greedy brother sewed a twelve-span bag and stuffed it with gold, silver, and jewels at the island. On the way back, the bag was too heavy — the bird couldn't fly. The elder brother fell into the sea and was never seen again.`,
    lessonsLearned: [
      { vi: "Tham thì thâm — lòng tham dẫn đến tai họa.", en: "Greed leads to ruin." },
      { vi: "Biết đủ là giàu — hãy sống thanh đạm.", en: "Knowing enough is wealth — live simply." },
      { vi: "Chia sẻ và lương thiện mang lại hạnh phúc.", en: "Sharing and honesty bring happiness." },
    ],
    vocabulary: [
      { word: "gia tài", meaning: "tài sản gia đình", meaningEn: "family fortune/inheritance" },
      { word: "tham lam", meaning: "muốn nhiều hơn mức cần", meaningEn: "greedy" },
      { word: "ba gang", meaning: "đơn vị đo bằng sải tay", meaningEn: "three spans (hand measurement)" },
      { word: "mất tích", meaning: "biến mất, không tìm thấy", meaningEn: "disappeared/missing" },
    ],
  },
  {
    id: "su-tich-ho-guom",
    title: "Sự tích Hồ Gươm",
    titleEn: "The Legend of the Sword Lake",
    coverColor: "from-teal-700 to-blue-800",
    coverIcon: "⚔️",
    category: "truyen-thuyet",
    categoryLabel: "Truyền thuyết",
    categoryLabelEn: "Legend",
    summary: "Lê Lợi mượn gươm thần đánh giặc Minh, trả gươm cho Rùa Vàng tại Hồ Hoàn Kiếm.",
    summaryEn: "Lê Lợi borrows a divine sword to fight the Ming invaders and returns it to the Golden Turtle at Hoàn Kiếm Lake.",
    difficulty: "medium",
    story: `Thế kỷ 15, giặc Minh xâm lược nước ta. Lê Lợi — một vị tướng nghèo ở Thanh Hóa — dấy nghĩa khởi binh chống giặc.

Một hôm, một ngư dân kéo lưới được một lưỡi gươm sáng rực dưới đáy hồ. Sau đó, Lê Lợi tìm thấy chuôi gươm trên cây đa trong rừng. Lưỡi gươm và chuôi gươm khớp nhau hoàn hảo — đó là Thanh gươm thần.

Nhờ gươm thần, Lê Lợi đánh tan quân Minh sau 10 năm kháng chiến. Năm 1428, Lê Lợi lên ngôi vua, lập nên triều đại Hậu Lê.

Một ngày, vua đi thuyền trên hồ Lục Thủy ở Thăng Long. Bỗng, một con Rùa Vàng khổng lồ nổi lên, cất tiếng: "Xin bệ hạ trả gươm lại cho Long Vương." Lê Lợi rút gươm, Rùa Vàng ngậm gươm lặn xuống hồ.

Từ đó, hồ được đổi tên thành Hồ Hoàn Kiếm (Hồ Gươm) — nghĩa là "Hồ trả gươm." Ngày nay, Hồ Gươm là trái tim của Hà Nội.`,
    storyEn: `In the 15th century, Ming dynasty invaders occupied Vietnam. Lê Lợi — a poor commander from Thanh Hóa — raised an army to resist them.

One day, a fisherman pulled up a glowing sword blade from the bottom of a lake. Later, Lê Lợi found a sword handle on a banyan tree in the forest. The blade and handle fit perfectly — it was the Divine Sword.

With the sword's power, Lê Lợi defeated the Ming army after 10 years of resistance. In 1428, he became king and founded the Later Lê dynasty.

One day, the king was boating on Lục Thủy Lake in Thăng Long (Hanoi). Suddenly, a giant Golden Turtle surfaced and spoke: "Your Majesty, please return the sword to the Dragon King." Lê Lợi drew the sword, and the turtle took it beneath the water.

From then on, the lake was renamed Hoàn Kiếm Lake (Sword Lake) — meaning "Lake of the Returned Sword." Today, Hoàn Kiếm Lake is the heart of Hanoi.`,
    lessonsLearned: [
      { vi: "Gươm thần tượng trưng cho ý chí độc lập của dân tộc.", en: "The divine sword symbolizes the nation's will for independence." },
      { vi: "Trả gươm = hòa bình; giữ gươm = chiến tranh.", en: "Returning the sword = peace; keeping it = war." },
      { vi: "Hồ Gươm là biểu tượng văn hóa của Hà Nội.", en: "Hoàn Kiếm Lake is a cultural symbol of Hanoi." },
    ],
    vocabulary: [
      { word: "khởi nghĩa", meaning: "nổi dậy chống lại", meaningEn: "to revolt/uprising" },
      { word: "kháng chiến", meaning: "chiến đấu chống xâm lược", meaningEn: "resistance war" },
      { word: "triều đại", meaning: "thời kỳ cai trị", meaningEn: "dynasty" },
      { word: "bệ hạ", meaning: "cách gọi vua", meaningEn: "Your Majesty" },
    ],
  },
  {
    id: "cay-tre-tram-dot",
    title: "Cây Tre Trăm Đốt",
    titleEn: "The Hundred-Knot Bamboo",
    coverColor: "from-emerald-600 to-green-900",
    coverIcon: "🎋",
    category: "co-tich",
    categoryLabel: "Cổ tích",
    categoryLabelEn: "Fairy Tale",
    summary: "Chàng trai hiền lành bị lừa, nhưng nhờ phép thần mà chiến thắng kẻ gian.",
    summaryEn: "An honest young man is deceived but triumphs over the trickster with divine magic.",
    difficulty: "easy",
    story: `Ngày xưa, có một anh nông dân hiền lành tên là Khoai. Anh đi ở cho nhà phú ông. Phú ông hứa: "Nếu con làm giỏi ba năm, ta sẽ gả con gái cho con."

Khoai siêng năng, chăm chỉ suốt ba năm. Đến ngày hẹn, phú ông nuốt lời, bảo: "Con hãy vào rừng tìm cho ta một cây tre đúng trăm đốt, ta mới gả con gái."

Khoai buồn bã vào rừng. Chàng tìm mãi không được cây tre nào đủ trăm đốt. Chàng ngồi khóc. Bỗng, ông Bụt hiện ra hỏi: "Con khóc vì sao?" Khoai kể sự tình. Bụt bảo: "Con hãy chặt đủ trăm đốt tre rời, rồi đọc câu thần chú: 'Khắc nhập, khắc nhập!' thì các đốt sẽ dính lại thành một cây."

Khoai làm theo. Chàng chặt đủ trăm đốt, đọc "Khắc nhập!" — lập tức các đốt tre nối liền thành cây tre trăm đốt. Khoai vác cây tre về.

Phú ông sững sờ, nhưng vẫn cố chối. Khoai đọc: "Khắc nhập!" — phú ông bị dính chặt vào cây tre, không gỡ ra được. Phú ông van xin, hứa gả con gái. Khoai đọc: "Khắc xuất!" — phú ông được thả ra.

Từ đó, Khoai cưới được vợ, sống hạnh phúc. Câu chuyện dạy rằng: kẻ tham lam, bội ước sẽ bị trừng phạt.`,
    storyEn: `Long ago, there was a kind farmer named Khoai. He worked as a servant for a wealthy landlord. The landlord promised: "If you work hard for three years, I will let you marry my daughter."

Khoai was diligent and hardworking for three years. When the time came, the landlord broke his promise and said: "Go into the forest and find me a single bamboo stalk with exactly one hundred knots, then you may marry my daughter."

Khoai went sadly into the forest. He searched everywhere but could not find a bamboo with a hundred knots. He sat down and cried. Suddenly, the fairy Bụt appeared and asked: "Why do you cry?" Khoai told his story. Bụt said: "Cut one hundred separate bamboo knots, then say the magic words: 'Khắc nhập, khắc nhập!' and they will join together."

Khoai did as told. He cut a hundred knots and chanted "Khắc nhập!" — instantly, the knots fused into a single bamboo with a hundred segments. Khoai carried it home.

The landlord was stunned but still refused. Khoai chanted "Khắc nhập!" — the landlord was stuck to the bamboo and couldn't break free. He begged and promised to honor his word. Khoai chanted "Khắc xuất!" — and the landlord was released.

From then on, Khoai married the daughter and lived happily. The story teaches that the greedy and deceitful will be punished.`,
    lessonsLearned: [
      { vi: "Kẻ bội ước sẽ bị trừng phạt — hãy giữ lời hứa.", en: "Those who break promises will be punished — keep your word." },
      { vi: "Người hiền lành, chăm chỉ sẽ được giúp đỡ.", en: "The kind and hardworking will receive help." },
      { vi: "Công bằng luôn chiến thắng sự gian xảo.", en: "Justice always triumphs over deceit." },
    ],
    vocabulary: [
      { word: "phú ông", meaning: "người giàu có", meaningEn: "wealthy landlord" },
      { word: "nuốt lời", meaning: "không giữ lời hứa", meaningEn: "to break a promise" },
      { word: "thần chú", meaning: "câu nói có phép thuật", meaningEn: "magic spell/incantation" },
      { word: "bội ước", meaning: "phản bội lời hứa", meaningEn: "to betray a promise" },
      { word: "khắc nhập", meaning: "dính vào nhau", meaningEn: "join together (magic word)" },
    ],
  },
];

export const folkloreCategories = [
  { id: "all", label: "Tất cả", labelEn: "All" },
  { id: "than-thoai", label: "Thần thoại", labelEn: "Mythology" },
  { id: "truyen-thuyet", label: "Truyền thuyết", labelEn: "Legends" },
  { id: "co-tich", label: "Cổ tích", labelEn: "Fairy Tales" },
  { id: "ngu-ngon", label: "Ngụ ngôn", labelEn: "Fables" },
];
