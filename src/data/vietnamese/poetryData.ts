// Vietnamese Poetry Collection

import namQuocSonHaImg from "@/assets/poetry/nam-quoc-son-ha.jpg";
import truyenKieuImg from "@/assets/poetry/truyen-kieu.jpg";
import quaDeoNgangImg from "@/assets/poetry/qua-deo-ngang.jpg";
import dayThonViDaImg from "@/assets/poetry/tinh-da.jpg";
import songImg from "@/assets/poetry/song.jpg";
import muaXuanNhoNhoImg from "@/assets/poetry/mua-xuan-nho-nho.jpg";
import sangThuImg from "@/assets/poetry/thu-dieu.jpg";
import viengLangBacImg from "@/assets/poetry/dat-nuoc.jpg";
import trangGiangImg from "@/assets/poetry/chieu-hom-nho-nha.jpg";
import conCoImg from "@/assets/poetry/ben-khong-chong.jpg";
import tayTienImg from "@/assets/poetry/tay-tien.jpg";
import vietBacImg from "@/assets/poetry/viet-bac.jpg";
import dongChiImg from "@/assets/poetry/dong-chi.jpg";
import tuTinhImg from "@/assets/poetry/tu-tinh.jpg";
import nhoRungImg from "@/assets/poetry/nho-rung.jpg";

export interface PoemExercise {
  question: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
}

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
  exercises?: PoemExercise[];
  imageUrl?: string;
}

export const vietnamesePoems: VietnamesePoem[] = [
  {
    id: "nam-quoc-son-ha",
    imageUrl: namQuocSonHaImg,
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
    exercises: [
      { question: "Bài thơ này được coi là gì của dân tộc Việt Nam?", questionEn: "What is this poem considered to be for Vietnam?", options: ["Bài hát quốc gia", "Tuyên ngôn độc lập đầu tiên", "Lời cầu nguyện", "Bài ca chiến thắng"], correctIndex: 1, explanation: "Bài thơ được coi là bản Tuyên ngôn độc lập đầu tiên của Việt Nam.", explanationEn: "The poem is considered Vietnam's first Declaration of Independence." },
      { question: "'Thiên thư' trong bài thơ có nghĩa là gì?", questionEn: "What does 'thiên thư' mean in the poem?", options: ["Sách giáo khoa", "Sách trời", "Lịch sử", "Bản đồ"], correctIndex: 1, explanation: "'Thiên thư' nghĩa là sách trời, ý chỉ sự phân định lãnh thổ đã được trời định.", explanationEn: "'Thiên thư' means Book of Heaven, implying territorial boundaries are ordained by heaven." },
      { question: "Bài thơ vang lên trong sự kiện lịch sử nào?", questionEn: "During which historical event was this poem recited?", options: ["Trận Bạch Đằng", "Trận sông Như Nguyệt 1077", "Khởi nghĩa Hai Bà Trưng", "Trận Điện Biên Phủ"], correctIndex: 1, explanation: "Bài thơ vang lên trên sông Như Nguyệt năm 1077 khi quân Lý chống quân Tống.", explanationEn: "The poem was heard at the Như Nguyệt River in 1077 during the Lý defense against the Song." },
    ],
  },
  {
    id: "truyen-kieu-mo-dau",
    imageUrl: truyenKieuImg,
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
    exercises: [
      { question: "Chủ đề chính của đoạn mở đầu Truyện Kiều là gì?", questionEn: "What is the main theme of the opening of Truyện Kiều?", options: ["Tình yêu đôi lứa", "Xung đột giữa tài năng và số phận", "Ca ngợi thiên nhiên", "Chiến tranh và hòa bình"], correctIndex: 1, explanation: "Chủ đề chính là sự xung đột giữa tài năng (chữ tài) và số phận (chữ mệnh).", explanationEn: "The main theme is the conflict between talent and fate." },
      { question: "'Bể dâu' trong bài thơ ám chỉ điều gì?", questionEn: "What does 'bể dâu' refer to in the poem?", options: ["Biển và ruộng dâu", "Sự biến đổi lớn của cuộc đời", "Một loại trái cây", "Vùng đất trù phú"], correctIndex: 1, explanation: "'Bể dâu' (bãi bể nương dâu) là thành ngữ chỉ những biến đổi lớn lao của cuộc đời.", explanationEn: "'Bể dâu' is an idiom for the great vicissitudes of life." },
      { question: "Truyện Kiều được viết theo thể thơ nào?", questionEn: "What poetic form is Truyện Kiều written in?", options: ["Thất ngôn bát cú", "Lục bát", "Tự do", "Song thất lục bát"], correctIndex: 1, explanation: "Truyện Kiều được viết theo thể thơ lục bát — thể thơ truyền thống của Việt Nam.", explanationEn: "Truyện Kiều is written in lục bát (six-eight) meter — Vietnam's traditional poetic form." },
    ],
  },
  {
    id: "qua-deo-ngang",
    imageUrl: quaDeoNgangImg,
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
    exercises: [
      { question: "Câu thơ cuối 'ta với ta' thể hiện điều gì?", questionEn: "What does the final line 'ta với ta' express?", options: ["Niềm vui gặp bạn", "Sự cô đơn, lẻ loi", "Tình yêu đôi lứa", "Sự tự hào dân tộc"], correctIndex: 1, explanation: "'Ta với ta' thể hiện sự cô đơn tuyệt đối — chỉ có mình ta đối diện với chính mình.", explanationEn: "'Ta với ta' expresses absolute solitude — only oneself facing oneself." },
      { question: "Đèo Ngang nằm ở đâu?", questionEn: "Where is Đèo Ngang located?", options: ["Hà Nội – Hải Phòng", "Hà Tĩnh – Quảng Bình", "Huế – Đà Nẵng", "Lạng Sơn – Cao Bằng"], correctIndex: 1, explanation: "Đèo Ngang nằm trên ranh giới Hà Tĩnh – Quảng Bình.", explanationEn: "Đèo Ngang is on the Hà Tĩnh–Quảng Bình border." },
      { question: "Bài thơ được viết theo thể thơ nào?", questionEn: "What poetic form is this poem written in?", options: ["Lục bát", "Thất ngôn bát cú Đường luật", "Tự do", "Năm chữ"], correctIndex: 1, explanation: "Bài thơ theo thể thất ngôn bát cú Đường luật (7 chữ, 8 câu).", explanationEn: "The poem follows the regulated verse form (seven words, eight lines)." },
    ],
  },
  {
    id: "day-thon-vi-da",
    imageUrl: dayThonViDaImg,
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
    exercises: [
      { question: "Hàn Mặc Tử viết bài thơ trong hoàn cảnh nào?", questionEn: "Under what circumstances did Hàn Mặc Tử write this poem?", options: ["Khi đi du lịch", "Khi mắc bệnh phong", "Khi cưới vợ", "Khi tốt nghiệp"], correctIndex: 1, explanation: "Hàn Mặc Tử sáng tác bài thơ khi mắc bệnh phong, gửi gắm nỗi nhớ Huế.", explanationEn: "He wrote the poem while suffering from leprosy, longing for Huế." },
      { question: "'Vườn ai mướt quá xanh như ngọc' sử dụng biện pháp tu từ nào?", questionEn: "What literary device is used in 'Vườn ai mướt quá xanh như ngọc'?", options: ["Nhân hóa", "So sánh", "Ẩn dụ", "Hoán dụ"], correctIndex: 1, explanation: "Câu thơ dùng so sánh 'xanh như ngọc' để tả vẻ đẹp của khu vườn.", explanationEn: "The verse uses simile 'green as jade' to describe the garden's beauty." },
      { question: "Thôn Vĩ Dạ thuộc vùng nào?", questionEn: "Which region does Vĩ Dạ village belong to?", options: ["Hà Nội", "Huế", "Sài Gòn", "Đà Nẵng"], correctIndex: 1, explanation: "Thôn Vĩ Dạ nằm bên bờ sông Hương, thuộc thành phố Huế.", explanationEn: "Vĩ Dạ village is on the Perfume River bank in Huế city." },
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
    exercises: [
      { question: "Hình ảnh 'sóng' trong bài thơ là ẩn dụ cho điều gì?", questionEn: "What is the 'wave' a metaphor for in the poem?", options: ["Biển cả", "Tình yêu", "Chiến tranh", "Thời gian"], correctIndex: 1, explanation: "Sóng là ẩn dụ cho tình yêu — mãnh liệt, dịu dàng và không ngừng tìm kiếm.", explanationEn: "Waves are a metaphor for love — fierce, tender, and ceaselessly searching." },
      { question: "Xuân Quỳnh được mệnh danh là gì?", questionEn: "What is Xuân Quỳnh known as?", options: ["Nữ hoàng thơ tình", "Bà chúa thơ Nôm", "Thi tiên", "Nữ sĩ đất Bắc"], correctIndex: 0, explanation: "Xuân Quỳnh được mệnh danh là 'nữ hoàng thơ tình' Việt Nam hiện đại.", explanationEn: "Xuân Quỳnh is known as 'the queen of love poetry' in modern Vietnam." },
      { question: "'Dữ dội và dịu êm' thể hiện đặc điểm gì của tình yêu?", questionEn: "What characteristic of love does 'fierce yet gentle' show?", options: ["Sự đơn điệu", "Sự mâu thuẫn, đối lập", "Sự bình yên", "Sự buồn bã"], correctIndex: 1, explanation: "Cặp đối lập thể hiện tính chất mâu thuẫn, phức tạp của tình yêu.", explanationEn: "The contrasting pair shows the contradictory, complex nature of love." },
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
    exercises: [
      { question: "Thanh Hải sáng tác bài thơ trong hoàn cảnh nào?", questionEn: "Under what circumstances did Thanh Hải write this poem?", options: ["Khi đi dạo", "Trên giường bệnh", "Khi đi chiến đấu", "Trong lễ hội mùa xuân"], correctIndex: 1, explanation: "Thanh Hải viết bài thơ trên giường bệnh, thể hiện tình yêu cuộc sống mãnh liệt.", explanationEn: "Thanh Hải wrote this on his sickbed, showing his intense love for life." },
      { question: "'Một nốt trầm xao xuyến' thể hiện ước nguyện gì?", questionEn: "What wish does 'a deep note, full of emotion' express?", options: ["Muốn nổi tiếng", "Cống hiến khiêm tốn cho đời", "Muốn hát hay", "Muốn đi xa"], correctIndex: 1, explanation: "'Nốt trầm' là ẩn dụ cho sự cống hiến nhỏ bé nhưng sâu sắc, không cần nổi bật.", explanationEn: "'A deep note' is a metaphor for humble yet profound contribution, without needing to stand out." },
      { question: "'Giọt long lanh' trong bài thơ là hình ảnh gì?", questionEn: "What image does 'glistening drops' represent?", options: ["Giọt mưa", "Giọt sương", "Giọt âm thanh (tiếng chim)", "Giọt nước mắt"], correctIndex: 2, explanation: "'Giọt long lanh' là ẩn dụ chuyển đổi cảm giác — tiếng chim hót được hình dung như những giọt sáng.", explanationEn: "'Glistening drops' is a synesthetic metaphor — birdsong visualized as shining droplets." },
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
    exercises: [
      { question: "Tín hiệu đầu tiên báo mùa thu đến trong bài thơ là gì?", questionEn: "What is the first signal of autumn in the poem?", options: ["Lá vàng rơi", "Hương ổi trong gió se", "Mưa phùn", "Trời lạnh"], correctIndex: 1, explanation: "Hương ổi chín phả trong gió se là tín hiệu đầu tiên nhà thơ cảm nhận thu về.", explanationEn: "The scent of ripe guava in the cool breeze is the first autumn signal the poet notices." },
      { question: "'Vắt nửa mình sang thu' sử dụng biện pháp tu từ nào?", questionEn: "What literary device is used in 'half of itself into autumn'?", options: ["So sánh", "Nhân hóa", "Điệp ngữ", "Liệt kê"], correctIndex: 1, explanation: "Đám mây được nhân hóa như đang 'vắt' mình — nửa ở hạ, nửa sang thu.", explanationEn: "The cloud is personified as stretching itself — half in summer, half into autumn." },
      { question: "Bài thơ chủ yếu sử dụng giác quan nào để cảm nhận mùa thu?", questionEn: "Which senses does the poem primarily use to perceive autumn?", options: ["Chỉ thị giác", "Khứu giác và xúc giác", "Chỉ thính giác", "Vị giác"], correctIndex: 1, explanation: "Bài thơ dùng khứu giác (hương ổi) và xúc giác (gió se) để cảm nhận thu.", explanationEn: "The poem uses smell (guava scent) and touch (cool breeze) to sense autumn." },
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
    exercises: [
      { question: "'Mặt trời trong lăng rất đỏ' là ẩn dụ cho ai?", questionEn: "Who does 'another sun inside, glowing red' refer to?", options: ["Mặt trời thật", "Bác Hồ", "Một bức tranh", "Ngọn đèn"], correctIndex: 1, explanation: "'Mặt trời trong lăng' là ẩn dụ cho Bác Hồ — người soi sáng con đường cách mạng.", explanationEn: "'The sun inside the mausoleum' is a metaphor for Hồ Chí Minh — who illuminated the revolutionary path." },
      { question: "Hình ảnh 'hàng tre' tượng trưng cho điều gì?", questionEn: "What does the 'bamboo row' symbolize?", options: ["Cây cối Hà Nội", "Sức mạnh, kiên cường của dân tộc Việt", "Vẻ đẹp thiên nhiên", "Sự giàu có"], correctIndex: 1, explanation: "Tre đứng thẳng hàng dù bão táp — tượng trưng cho ý chí kiên cường của dân tộc.", explanationEn: "Bamboo standing straight despite storms symbolizes the nation's resilient spirit." },
      { question: "Viễn Phương viết bài thơ vào năm nào?", questionEn: "When did Viễn Phương write this poem?", options: ["1945", "1954", "1975", "1976"], correctIndex: 3, explanation: "Bài thơ được viết năm 1976, sau ngày thống nhất đất nước.", explanationEn: "The poem was written in 1976, after the country's reunification." },
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
    exercises: [
      { question: "'Củi một cành khô lạc mấy dòng' gợi hình ảnh gì?", questionEn: "What image does 'a dry branch lost in the streams' evoke?", options: ["Sự giàu có", "Con người nhỏ bé, lạc lõng giữa dòng đời", "Mùa đông lạnh", "Thiên nhiên tươi đẹp"], correctIndex: 1, explanation: "Cành củi khô trôi dạt là ẩn dụ cho con người nhỏ bé, lạc lõng giữa cuộc đời mênh mông.", explanationEn: "The drifting dry branch is a metaphor for a small, lost human in the vast stream of life." },
      { question: "Bài thơ lấy cảm hứng từ cảnh nào?", questionEn: "What scene inspired this poem?", options: ["Biển Đà Nẵng", "Sông Hồng chiều tà", "Hồ Gươm buổi sáng", "Sông Mekong"], correctIndex: 1, explanation: "Bài thơ lấy cảm hứng từ cảnh sông Hồng chiều tà.", explanationEn: "The poem was inspired by the Red River at dusk." },
      { question: "Tâm trạng chủ đạo trong bài thơ là gì?", questionEn: "What is the dominant mood of the poem?", options: ["Vui vẻ, lạc quan", "Buồn bã, cô đơn", "Giận dữ", "Hạnh phúc"], correctIndex: 1, explanation: "Tâm trạng chủ đạo là nỗi buồn mênh mang, cô đơn trước thiên nhiên bao la.", explanationEn: "The dominant mood is vast sadness and loneliness before immense nature." },
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
Mai mai mẹ vẫn là cánh cò,
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
    exercises: [
      { question: "Hình ảnh 'con cò' trong bài thơ tượng trưng cho ai?", questionEn: "Who does the 'stork' symbolize in the poem?", options: ["Người cha", "Người mẹ", "Đứa trẻ", "Người bà"], correctIndex: 1, explanation: "Con cò tượng trưng cho người mẹ — bay hoài không mỏi để che chở con.", explanationEn: "The stork symbolizes the mother — flying tirelessly to shelter her child." },
      { question: "Bài thơ lấy cảm hứng từ thể loại văn học dân gian nào?", questionEn: "What folk literature genre inspired this poem?", options: ["Truyện cổ tích", "Ca dao, lời ru", "Tục ngữ", "Truyện thần thoại"], correctIndex: 1, explanation: "Bài thơ lấy cảm hứng từ ca dao và lời ru của mẹ về con cò.", explanationEn: "The poem is inspired by folk songs and mother's lullabies about the stork." },
      { question: "'Bay hoài không mỏi' thể hiện phẩm chất gì của người mẹ?", questionEn: "What quality of the mother does 'flying tirelessly' express?", options: ["Sự giàu có", "Sự hy sinh, tận tụy không ngừng", "Sự thông minh", "Sự nghiêm khắc"], correctIndex: 1, explanation: "'Bay hoài không mỏi' thể hiện sự hy sinh, tận tụy không ngừng nghỉ của mẹ.", explanationEn: "'Flying tirelessly' expresses the mother's ceaseless sacrifice and dedication." },
    ],
  },
];
