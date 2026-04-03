// Vietnamese Poetry Collection

export interface VietnamesePoem {
  id: string;
  title: string;
  titleEn: string;
  author: string;
  authorEn: string;
  period: string;
  periodEn: string;
  text: string;
  textEn: string;
  analysis: string;
  analysisEn: string;
  culturalNote: string;
  culturalNoteEn: string;
  vocabulary: { word: string; meaning: string; meaningEn: string }[];
}

export const vietnamesePoems: VietnamesePoem[] = [
  {
    id: "nam-quoc-son-ha",
    title: "Nam Quốc Sơn Hà",
    titleEn: "Mountains and Rivers of the Southern Land",
    author: "Lý Thường Kiệt",
    authorEn: "Lý Thường Kiệt",
    period: "Thế kỷ 11",
    periodEn: "11th Century",
    text: `Nam quốc sơn hà Nam đế cư,
Tiệt nhiên phận định tại thiên thư.
Như hà nghịch lỗ lai xâm phạm,
Nhữ đẳng hành khan thủ bại hư.`,
    textEn: `The mountains and rivers of the Southern land belong to the Southern Emperor,
This is clearly ordained in the Book of Heaven.
How dare the barbarians come to invade,
You shall see yourselves utterly defeated.`,
    analysis: "Bài thơ được xem là bản Tuyên ngôn độc lập đầu tiên của dân tộc Việt Nam, khẳng định chủ quyền lãnh thổ và ý chí bảo vệ đất nước.",
    analysisEn: "This poem is considered Vietnam's first Declaration of Independence, affirming territorial sovereignty and the will to defend the nation.",
    culturalNote: "Tương truyền bài thơ vang lên từ đền thờ trên sông Như Nguyệt năm 1077 khi quân Lý chống quân Tống xâm lược.",
    culturalNoteEn: "Legend says this poem resonated from a temple on the Như Nguyệt River in 1077 when Lý forces repelled the Song invasion.",
    vocabulary: [
      { word: "sơn hà", meaning: "núi sông, đất nước", meaningEn: "mountains and rivers / homeland" },
      { word: "đế", meaning: "vua, hoàng đế", meaningEn: "emperor" },
      { word: "thiên thư", meaning: "sách trời", meaningEn: "Book of Heaven" },
      { word: "nghịch lỗ", meaning: "giặc xâm lược", meaningEn: "invading barbarians" },
    ],
  },
  {
    id: "truyen-kieu-mo-dau",
    title: "Truyện Kiều (Mở đầu)",
    titleEn: "The Tale of Kiều (Opening)",
    author: "Nguyễn Du",
    authorEn: "Nguyễn Du",
    period: "Đầu thế kỷ 19",
    periodEn: "Early 19th Century",
    text: `Trăm năm trong cõi người ta,
Chữ tài chữ mệnh khéo là ghét nhau.
Trải qua một cuộc bể dâu,
Những điều trông thấy mà đau đớn lòng.
Lạ gì bỉ sắc tư phong,
Trời xanh quen thói má hồng đánh ghen.`,
    textEn: `In the span of a hundred years of human existence,
Talent and fate are always in conflict.
Having gone through life's vicissitudes,
What one sees is enough to break the heart.
It is no surprise that beauty provokes envy,
Even Heaven is jealous of rosy cheeks.`,
    analysis: "Sáu câu mở đầu nêu bật chủ đề xuyên suốt tác phẩm: sự xung đột giữa tài năng và số phận, giữa cái đẹp và sự đố kị của tạo hóa.",
    analysisEn: "The opening six lines highlight the work's central theme: the conflict between talent and destiny, beauty and the jealousy of fate.",
    culturalNote: "Truyện Kiều gồm 3.254 câu thơ lục bát, là tác phẩm văn học vĩ đại nhất của Việt Nam. Người Việt thường dùng 'bói Kiều' để xem vận mệnh.",
    culturalNoteEn: "The Tale of Kiều, with 3,254 verses in six-eight meter, is Vietnam's greatest literary work. Vietnamese often use 'Kiều fortune-telling' to divine fate.",
    vocabulary: [
      { word: "bể dâu", meaning: "biến đổi lớn của cuộc đời", meaningEn: "vicissitudes of life" },
      { word: "bỉ sắc tư phong", meaning: "khinh sắc đẹp chuộng phong cách", meaningEn: "disparaging beauty for manner" },
      { word: "má hồng", meaning: "người phụ nữ đẹp", meaningEn: "rosy cheeks / a beautiful woman" },
    ],
  },
  {
    id: "qua-deo-ngang",
    title: "Qua Đèo Ngang",
    titleEn: "Crossing Đèo Ngang Pass",
    author: "Bà Huyện Thanh Quan",
    authorEn: "Bà Huyện Thanh Quan",
    period: "Thế kỷ 19",
    periodEn: "19th Century",
    text: `Bước tới Đèo Ngang bóng xế tà,
Cỏ cây chen đá, lá chen hoa.
Lom khom dưới núi, tiều vài chú,
Lác đác bên sông, chợ mấy nhà.
Nhớ nước đau lòng con cuốc cuốc,
Thương nhà mỏi miệng cái gia gia.
Dừng chân đứng lại, trời, non, nước,
Một mảnh tình riêng, ta với ta.`,
    textEn: `Reaching Đèo Ngang as the sun slopes west,
Grass and trees crowd rocks, leaves mingle with flowers.
Crouching beneath the mountain, a few woodcutters,
Scattered by the river, a few market stalls.
Longing for the homeland, the cuckoo cries in pain,
Missing home, the partridge calls tirelessly.
I stop and stand still—sky, mountains, water—
A lonely heart, just me with me.`,
    analysis: "Bài thơ Đường luật thất ngôn bát cú thể hiện nỗi buồn cô đơn trước cảnh thiên nhiên hoang vắng, qua đó bộc lộ tâm trạng nhớ nhà da diết.",
    analysisEn: "This regulated verse poem expresses solitary sorrow before desolate nature, revealing the poet's deep homesickness.",
    culturalNote: "Đèo Ngang nằm trên ranh giới Hà Tĩnh – Quảng Bình, từng là cửa ngõ giữa Đàng Trong và Đàng Ngoài.",
    culturalNoteEn: "Đèo Ngang lies on the Hà Tĩnh–Quảng Bình border, once the gateway between the Northern and Southern courts.",
    vocabulary: [
      { word: "xế tà", meaning: "chiều muộn", meaningEn: "late afternoon" },
      { word: "tiều", meaning: "người đốn củi", meaningEn: "woodcutter" },
      { word: "cuốc cuốc", meaning: "tiếng chim cuốc kêu", meaningEn: "cuckoo cry" },
    ],
  },
  {
    id: "day-thon-vi-da",
    title: "Đây thôn Vĩ Dạ",
    titleEn: "This is Vĩ Dạ Village",
    author: "Hàn Mặc Tử",
    authorEn: "Hàn Mặc Tử",
    period: "1938",
    periodEn: "1938",
    text: `Sao anh không về chơi thôn Vĩ?
Nhìn nắng hàng cau nắng mới lên.
Vườn ai mướt quá xanh như ngọc,
Lá trúc che ngang mặt chữ điền.

Gió theo lối gió, mây đường mây,
Dòng nước buồn thiu, hoa bắp lay.
Thuyền ai đậu bến sông trăng đó,
Có chở trăng về kịp tối nay?`,
    textEn: `Why don't you come visit Vĩ village?
See the areca palms catching the new sunrise.
Someone's garden, so lush and green as jade,
Bamboo leaves brush across a square-jawed face.

Wind follows wind, clouds follow clouds,
The stream flows sadly, corn flowers sway.
Whose boat is moored at that moonlit pier,
Will it carry the moon home in time tonight?`,
    analysis: "Bài thơ là tiếng lòng tha thiết của Hàn Mặc Tử khi nhớ về Huế và mối tình đơn phương, kết hợp giữa thực và mộng, sáng và tối.",
    analysisEn: "The poem is Hàn Mặc Tử's passionate longing for Huế and an unrequited love, blending reality and dream, light and darkness.",
    culturalNote: "Hàn Mặc Tử sáng tác bài thơ khi mắc bệnh phong, gửi gắm nỗi nhớ thương vô hạn qua từng câu chữ.",
    culturalNoteEn: "Hàn Mặc Tử wrote this poem while suffering from leprosy, pouring infinite longing into every word.",
    vocabulary: [
      { word: "mướt", meaning: "xanh tươi, bóng mượt", meaningEn: "lush, glossy" },
      { word: "chữ điền", meaning: "khuôn mặt vuông vức", meaningEn: "square-shaped face" },
      { word: "buồn thiu", meaning: "buồn bã, ủ rũ", meaningEn: "gloomy, listless" },
    ],
  },
  {
    id: "song",
    title: "Sóng",
    titleEn: "Waves",
    author: "Xuân Quỳnh",
    authorEn: "Xuân Quỳnh",
    period: "1967",
    periodEn: "1967",
    text: `Dữ dội và dịu êm,
Ồn ào và lặng lẽ,
Sông không hiểu nổi mình,
Sóng tìm ra tận bể.

Ôi con sóng ngày xưa,
Và ngày sau vẫn thế,
Nỗi khát vọng tình yêu,
Bồi hồi trong ngực trẻ.

Con sóng dưới lòng sâu,
Con sóng trên mặt nước,
Ôi con sóng nhớ bờ,
Ngày đêm không ngủ được.`,
    textEn: `Fierce yet gentle,
Noisy yet silent,
The river cannot understand itself,
The wave seeks the open sea.

Oh, the waves of old,
And tomorrow still the same,
The longing for love,
Stirring in a young heart.

The wave deep below,
The wave on the surface,
Oh, the wave misses the shore,
Day and night, unable to sleep.`,
    analysis: "Sóng là ẩn dụ cho tình yêu — mãnh liệt nhưng dịu dàng, luôn khao khát và không ngừng tìm kiếm.",
    analysisEn: "Waves serve as a metaphor for love — fierce yet tender, always yearning and ceaselessly searching.",
    culturalNote: "Xuân Quỳnh là nữ thi sĩ nổi tiếng nhất Việt Nam hiện đại, được mệnh danh là 'nữ hoàng thơ tình'.",
    culturalNoteEn: "Xuân Quỳnh is modern Vietnam's most celebrated female poet, known as 'the queen of love poetry'.",
    vocabulary: [
      { word: "dữ dội", meaning: "mạnh mẽ, hung bạo", meaningEn: "fierce, violent" },
      { word: "khát vọng", meaning: "ước muốn mãnh liệt", meaningEn: "aspiration, longing" },
      { word: "bồi hồi", meaning: "xúc động, rung cảm", meaningEn: "stirring, moved" },
    ],
  },
  {
    id: "mua-xuan-nho-nho",
    title: "Mùa xuân nho nhỏ",
    titleEn: "A Tiny Spring",
    author: "Thanh Hải",
    authorEn: "Thanh Hải",
    period: "1980",
    periodEn: "1980",
    text: `Mọc giữa dòng sông xanh,
Một bông hoa tím biếc.
Ơi con chim chiền chiện,
Hót chi mà vang trời.
Từng giọt long lanh rơi,
Tôi đưa tay tôi hứng.

Ta làm con chim hót,
Ta làm một cành hoa,
Ta nhập vào hòa ca,
Một nốt trầm xao xuyến.`,
    textEn: `Growing in the green river,
A violet flower blooms bright.
Oh, the skylark above,
Why do you sing so loud?
Each glistening drop falls,
I stretch my hand to catch.

Let me be a singing bird,
Let me be a flower branch,
Let me join the chorus,
A deep note, full of emotion.`,
    analysis: "Bài thơ thể hiện ước nguyện cống hiến cho đời bằng những gì nhỏ bé nhất, giản dị mà sâu sắc.",
    analysisEn: "The poem expresses the wish to contribute to life with the smallest things, simple yet profound.",
    culturalNote: "Thanh Hải sáng tác bài thơ trên giường bệnh, gửi gắm tình yêu cuộc sống và khát vọng cống hiến cuối cùng.",
    culturalNoteEn: "Thanh Hải wrote this poem on his sickbed, conveying his final love for life and desire to contribute.",
    vocabulary: [
      { word: "tím biếc", meaning: "màu tím đậm, đẹp", meaningEn: "deep violet" },
      { word: "long lanh", meaning: "lấp lánh", meaningEn: "glistening, sparkling" },
      { word: "xao xuyến", meaning: "rung động, cảm xúc", meaningEn: "stirring, emotional" },
    ],
  },
  {
    id: "sang-thu",
    title: "Sang thu",
    titleEn: "Arriving Autumn",
    author: "Hữu Thỉnh",
    authorEn: "Hữu Thỉnh",
    period: "1977",
    periodEn: "1977",
    text: `Bỗng nhận ra hương ổi
Phả vào trong gió se.
Sương chùng chình qua ngõ,
Hình như thu đã về.

Sông được lúc dềnh dàng,
Chim bắt đầu vội vã.
Có đám mây mùa hạ,
Vắt nửa mình sang thu.`,
    textEn: `Suddenly I notice the guava fragrance
Wafting in the cool breeze.
Mist lingers through the alley,
It seems autumn has arrived.

The river takes its time flowing,
Birds begin to hurry.
A summer cloud stretches,
Half of itself into autumn.`,
    analysis: "Bài thơ nắm bắt khoảnh khắc chuyển mùa tinh tế, dùng các giác quan để cảm nhận sự giao mùa hạ — thu.",
    analysisEn: "The poem captures the subtle moment of seasonal transition, using the senses to feel the shift from summer to autumn.",
    culturalNote: "Hương ổi chín là biểu tượng đặc trưng của mùa thu miền Bắc Việt Nam.",
    culturalNoteEn: "The scent of ripe guava is an iconic symbol of autumn in Northern Vietnam.",
    vocabulary: [
      { word: "phả", meaning: "tỏa ra, lan tỏa", meaningEn: "to diffuse, waft" },
      { word: "se", meaning: "hơi lạnh, khô", meaningEn: "cool and dry" },
      { word: "chùng chình", meaning: "chậm chạp, lưỡng lự", meaningEn: "lingering, hesitant" },
      { word: "dềnh dàng", meaning: "chậm rãi, thong thả", meaningEn: "leisurely, unhurried" },
    ],
  },
  {
    id: "vieng-lang-bac",
    title: "Viếng lăng Bác",
    titleEn: "Visiting Uncle Hồ's Mausoleum",
    author: "Viễn Phương",
    authorEn: "Viễn Phương",
    period: "1976",
    periodEn: "1976",
    text: `Con ở miền Nam ra thăm lăng Bác,
Đã thấy trong sương hàng tre bát ngát.
Ôi! Hàng tre xanh xanh Việt Nam,
Bão táp mưa sa đứng thẳng hàng.

Ngày ngày mặt trời đi qua trên lăng,
Thấy một mặt trời trong lăng rất đỏ.
Ngày ngày dòng người đi trong thương nhớ,
Kết tràng hoa dâng bảy mươi chín mùa xuân.`,
    textEn: `I come from the South to visit Uncle's mausoleum,
Through the mist I see endless rows of bamboo.
Oh! The green bamboo of Vietnam,
Standing straight through storms and rain.

Day after day the sun passes over the mausoleum,
Seeing another sun inside, glowing red.
Day after day, streams of people walk in remembrance,
Weaving garlands for seventy-nine springs.`,
    analysis: "Bài thơ bày tỏ niềm xúc động và lòng kính yêu sâu sắc khi lần đầu ra Bắc viếng lăng Bác sau ngày thống nhất.",
    analysisEn: "The poem expresses deep emotion and reverence upon visiting Hồ Chí Minh's mausoleum for the first time after reunification.",
    culturalNote: "Bài thơ được viết năm 1976 khi Viễn Phương từ miền Nam ra Hà Nội lần đầu sau chiến tranh.",
    culturalNoteEn: "Written in 1976 when Viễn Phương traveled from the South to Hanoi for the first time after the war.",
    vocabulary: [
      { word: "bát ngát", meaning: "rộng lớn, mênh mông", meaningEn: "vast, boundless" },
      { word: "bão táp", meaning: "bão tố dữ dội", meaningEn: "storms and tempests" },
      { word: "tràng hoa", meaning: "vòng hoa", meaningEn: "garland, wreath" },
    ],
  },
  {
    id: "trang-giang",
    title: "Tràng Giang",
    titleEn: "The Long River",
    author: "Huy Cận",
    authorEn: "Huy Cận",
    period: "1939",
    periodEn: "1939",
    text: `Sóng gợn tràng giang buồn điệp điệp,
Con thuyền xuôi mái nước song song.
Thuyền về nước lại, sầu trăm ngả,
Củi một cành khô lạc mấy dòng.

Lơ thơ cồn nhỏ gió đìu hiu,
Đâu tiếng làng xa vãn chợ chiều.
Nắng xuống, trời lên sâu chót vót,
Sông dài, trời rộng, bến cô liêu.`,
    textEn: `Waves ripple on the long river, sadness upon sadness,
A boat drifts with the current, waters running parallel.
Boat departs, water stays — sorrow in every direction,
A dry branch of firewood, lost in the streams.

A few small islets, wind blowing forlornly,
Where are the sounds of a distant village's evening market?
Sunlight descends, sky rises infinitely deep,
Long river, vast sky, a lonely pier.`,
    analysis: "Tràng Giang là bức tranh sông nước mênh mông gợi nỗi buồn vũ trụ và nỗi cô đơn của con người trước thiên nhiên bao la.",
    analysisEn: "The Long River paints a vast waterscape evoking cosmic melancholy and human loneliness before immense nature.",
    culturalNote: "Bài thơ lấy cảm hứng từ cảnh sông Hồng chiều tà — một biểu tượng quen thuộc trong thơ ca Việt Nam.",
    culturalNoteEn: "The poem was inspired by the Red River at dusk — a familiar symbol in Vietnamese poetry.",
    vocabulary: [
      { word: "điệp điệp", meaning: "chồng chất, nối tiếp", meaningEn: "layered, successive" },
      { word: "đìu hiu", meaning: "quạnh quẽ, hiu hắt", meaningEn: "desolate, lonely" },
      { word: "cô liêu", meaning: "cô đơn, hiu quạnh", meaningEn: "solitary, forlorn" },
    ],
  },
  {
    id: "con-co",
    title: "Con cò",
    titleEn: "The Stork",
    author: "Chế Lan Viên",
    authorEn: "Chế Lan Viên",
    period: "1962",
    periodEn: "1962",
    text: `Con còn bế trên tay,
Con chưa biết con cò.
Nhưng trong lời mẹ hát,
Có cánh cò đang bay.

Con ngủ yên thì cò cũng ngủ,
Cánh của cò, hai đứa đắp chung đôi.
Maimai mẹ vẫn là cánh cò,
Bay hoài không mỏi giữa đời bao la.`,
    textEn: `Still carried in arms,
The child doesn't know the stork.
But in mother's lullaby,
A stork's wings are in flight.

When the child sleeps peacefully, the stork sleeps too,
The stork's wings cover them both.
Forever, mother remains the stork,
Flying tirelessly through the vast world.`,
    analysis: "Bài thơ sử dụng hình ảnh con cò trong ca dao để ca ngợi tình mẫu tử thiêng liêng — mẹ là cánh cò suốt đời che chở con.",
    analysisEn: "The poem uses the folk image of the stork to celebrate sacred maternal love — the mother as an eternal stork sheltering her child.",
    culturalNote: "Con cò là biểu tượng quen thuộc trong ca dao Việt Nam, tượng trưng cho người phụ nữ lam lũ, tần tảo.",
    culturalNoteEn: "The stork is a familiar symbol in Vietnamese folk songs, representing the hardworking, enduring woman.",
    vocabulary: [
      { word: "bế", meaning: "ôm trẻ trên tay", meaningEn: "to carry (a baby)" },
      { word: "đắp", meaning: "phủ lên", meaningEn: "to cover" },
      { word: "bao la", meaning: "rộng lớn vô cùng", meaningEn: "vast, immense" },
    ],
  },
];
