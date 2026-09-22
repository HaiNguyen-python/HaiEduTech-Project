/**
 * @file expansionV11Folklore.ts
 * @description Giai đoạn 2 (phần 4) - 8 bài văn hoá dân gian mới cho vn-folk-arts và vn-culture-expanded.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { folkloreLanguageModules } from "./folkloreLessons";
import { vietnameseLessonsExpansionModules } from "./lessonsExpansion";
import type { VietnameseLesson, VietnameseQuizQuestion, VietnameseVocabEntry } from "./types";

const v = (
  word: string,
  meaning: string,
  meaningEn: string,
  example: string,
  exampleEn: string,
  partOfSpeech?: string,
): VietnameseVocabEntry => ({ word, meaning, meaningEn, example, exampleEn, partOfSpeech });

const q = (
  question: string,
  questionEn: string,
  options: string[],
  answer: number,
  explanation: string,
  explanationEn: string,
): VietnameseQuizQuestion => ({ question, questionEn, options, answer, explanation, explanationEn });

const artsLessons: VietnameseLesson[] = [
  {
    id: "vn-v11-folk-cheo",
    title: "Hát chèo: sân khấu của làng quê Bắc Bộ",
    titleEn: "Cheo Theatre: The Stage of Northern Villages",
    level: "intermediate",
    theory: `## Hát chèo

Chèo là loại hình sân khấu dân gian của đồng bằng Bắc Bộ, hình thành từ khoảng thế kỷ 10 đến 11 và phát triển mạnh ở Thái Bình, Hà Nam, Hải Dương, Ninh Bình.

### 1. Không gian diễn
Sân khấu chèo truyền thống là sân đình, chỉ cần một chiếc chiếu, mấy nhạc cụ và đèn dầu. Khán giả ngồi vòng quanh, có thể nói chen vào, vỗ tay hay bình luận.

### 2. Nhân vật tiêu biểu
- **Thị Kính**: người phụ nữ chịu oan, biểu tượng của đức nhẫn.
- **Thị Mầu**: cô gái phóng khoáng, dám nói ý mình.
- **Mẹ Đốp**: vai hài, đại diện tiếng nói dân gian chua nhưng thật.

### 3. Nhạc cụ
trống đế, đàn nguyệt, đàn nhị, sáo, mõ

### 4. Đặc điểm nghệ thuật
Chèo trộn hát, nói, múa và diễn hài. Nhân vật hay quay ra nói trực tiếp với khán giả để bình luận, một kỹ thuật rất hiện đại dù có từ rất xưa.`,
    theoryEn: `## Cheo theatre

Cheo is a folk theatre form of the northern delta, taking shape around the 10th to 11th centuries and flourishing in Thai Binh, Ha Nam, Hai Duong and Ninh Binh.

Traditionally staged in a communal-house yard, it needs only a mat, a few instruments and an oil lamp, with the audience seated around and free to comment.

Signature characters: Thi Kinh (the wrongly accused woman, patience embodied), Thi Mau (the bold, outspoken girl) and Me Dop (the comic voice of the common people).

Instruments include trong de drum, dan nguyet moon lute, dan nhi fiddle, flute and wooden clapper. Cheo blends singing, speech, dance and comedy, and characters often address the audience directly.`,
    vocabulary: [
      v("chèo", "sân khấu dân gian Bắc Bộ", "cheo folk theatre", "Chèo diễn ở sân đình.", "Cheo is performed in the communal-house yard.", "danh từ"),
      v("sân đình", "sân trước nhà chung của làng", "communal-house yard", "Sân đình là sân khấu tự nhiên.", "The yard is a natural stage.", "danh từ"),
      v("chiếu", "tấm đan để ngồi hoặc diễn", "woven mat", "Nghệ sĩ diễn trên một chiếc chiếu.", "Artists perform on a single mat.", "danh từ"),
      v("trống đế", "trống nhỏ giữ nhịp trong chèo", "de drum", "Trống đế giữ nhịp cho vở diễn.", "The de drum keeps the rhythm.", "danh từ"),
      v("đàn nguyệt", "đàn hình tròn như mặt trăng", "moon lute", "Đàn nguyệt đệm cho câu hát.", "The moon lute accompanies the singing.", "danh từ"),
      v("vai hài", "nhân vật gây cười", "comic role", "Mẹ Đốp là vai hài nổi tiếng.", "Me Dop is a famous comic role.", "danh từ"),
      v("chịu oan", "bị buộc tội sai", "to be wrongly accused", "Thị Kính chịu oan nhiều năm.", "Thi Kinh was wrongly accused for years.", "động từ"),
      v("đức nhẫn", "đức tính chịu đựng", "virtue of forbearance", "Thị Kính tượng trưng cho đức nhẫn.", "Thi Kinh symbolises forbearance.", "danh từ"),
      v("phóng khoáng", "thoải mái, không gò bó", "free-spirited", "Thị Mầu là cô gái phóng khoáng.", "Thi Mau is a free-spirited girl.", "tính từ"),
      v("bình luận", "nói ý kiến về sự việc", "to comment", "Khán giả bình luận ngay khi diễn.", "The audience comments during the show.", "động từ"),
    ],
    quiz: [
      q("Chèo phát triển mạnh ở vùng nào?", "Where did cheo flourish?", ["Đồng bằng Bắc Bộ", "Tây Nguyên", "Đồng bằng sông Cửu Long", "Duyên hải Trung Bộ"], 0, "Chèo là sân khấu dân gian của đồng bằng Bắc Bộ.", "Cheo belongs to the northern delta."),
      q("Sân khấu chèo truyền thống ở đâu?", "Where is traditional cheo staged?", ["Sân đình của làng", "Nhà hát lớn", "Trên thuyền", "Trong chùa"], 0, "Chèo diễn ở sân đình với một chiếc chiếu.", "It is staged in the communal-house yard on a mat."),
      q("Nhân vật nào tượng trưng cho đức nhẫn?", "Which character symbolises forbearance?", ["Thị Kính", "Thị Mầu", "Mẹ Đốp", "Lý trưởng"], 0, "Thị Kính chịu oan, là biểu tượng của đức nhẫn.", "Thi Kinh, wrongly accused, embodies forbearance."),
      q("Nhạc cụ nào giữ nhịp trong chèo?", "Which instrument keeps the beat in cheo?", ["Trống đế", "Đàn nguyệt", "Sáo", "Đàn nhị"], 0, "Trống đế giữ nhịp cho toàn vở.", "The de drum keeps the rhythm."),
      q("Kỹ thuật nào của chèo nghe rất hiện đại?", "Which cheo technique feels modern?", ["Nhân vật nói trực tiếp với khán giả", "Dùng đèn điện", "Diễn không nhạc", "Sân khấu quay"], 0, "Nhân vật quay ra bình luận với khán giả, kỹ thuật rất gần sân khấu hiện đại.", "Direct address to the audience mirrors modern theatre."),
    ],
  },
  {
    id: "vn-v11-folk-donghho",
    title: "Tranh Đông Hồ và mỹ thuật dân gian",
    titleEn: "Dong Ho Woodblock Prints and Folk Art",
    level: "intermediate",
    theory: `## Tranh Đông Hồ

Tranh Đông Hồ ra đời ở làng Đông Hồ, tỉnh Bắc Ninh, in bằng bản gỗ trên giấy dó quét điệp.

### 1. Chất liệu tự nhiên
| Màu | Nguyên liệu |
|---|---|
| Trắng óng | vỏ điệp nghiền |
| Đỏ | sỏi son |
| Vàng | hoa hòe |
| Xanh | lá chàm |
| Đen | than lá tre |

### 2. Đề tài quen thuộc
Đám cưới chuột, Vinh hoa - Phú quý, Hứng dừa, Đàn gà mẹ con, Lợn ăn lá ráy. Tranh thường treo dịp Tết, mỗi bức gửi một lời chúc.

### 3. Cách in
Mỗi màu một bản gỗ riêng, in lần lượt từ nhạt tới đậm, cuối cùng in nét đen viền.

### 4. Vì sao đáng quý
Tranh Đông Hồ không cố vẽ giống thật. Người nghệ nhân phóng to cái quan trọng, giản lược cái phụ, nên tranh vừa dễ hiểu vừa giàu tính biểu tượng.`,
    theoryEn: `## Dong Ho prints

Dong Ho prints come from Dong Ho village in Bac Ninh, printed from woodblocks onto do paper brushed with crushed seashell.

Natural pigments: crushed shell for shimmering white, red gravel for red, hoe flowers for yellow, indigo leaves for blue, burnt bamboo leaves for black.

Classic subjects include the Mouse Wedding, Prosperity pair, Coconut Picking, Hen and Chicks and Pig with Taro Leaf. Prints hang at Tet, each carrying a wish.

Each colour needs its own block, printed light to dark, with the black outline last. The art enlarges what matters and simplifies the rest, making it both readable and symbolic.`,
    vocabulary: [
      v("tranh Đông Hồ", "tranh in bản gỗ làng Đông Hồ", "Dong Ho woodblock print", "Tranh Đông Hồ treo dịp Tết.", "Dong Ho prints hang at Tet.", "danh từ"),
      v("giấy dó", "giấy làm từ vỏ cây dó", "do paper", "Giấy dó bền và dai.", "Do paper is durable.", "danh từ"),
      v("điệp", "vỏ sò nghiền tạo màu óng", "crushed seashell powder", "Điệp cho màu trắng óng.", "Shell powder gives shimmering white.", "danh từ"),
      v("bản gỗ", "khuôn gỗ khắc để in", "woodblock", "Mỗi màu cần một bản gỗ.", "Each colour needs a woodblock.", "danh từ"),
      v("hoa hòe", "loài hoa cho màu vàng", "hoe flower", "Hoa hòe nhuộm màu vàng.", "Hoe flowers dye yellow.", "danh từ"),
      v("lá chàm", "lá cho màu xanh", "indigo leaf", "Lá chàm cho màu xanh.", "Indigo leaves give blue.", "danh từ"),
      v("nét viền", "đường kẻ ngoài của hình", "outline", "Nét viền đen in cuối cùng.", "The black outline is printed last.", "danh từ"),
      v("biểu tượng", "hình mang ý nghĩa sâu hơn", "symbol", "Đàn gà là biểu tượng sung túc.", "The hen and chicks symbolise abundance.", "danh từ"),
      v("giản lược", "bớt chi tiết cho gọn", "to simplify", "Nghệ nhân giản lược chi tiết phụ.", "Artisans simplify minor details.", "động từ"),
      v("sung túc", "đầy đủ, khá giả", "abundant, well-off", "Tranh chúc gia đình sung túc.", "The print wishes a family abundance.", "tính từ"),
    ],
    quiz: [
      q("Tranh Đông Hồ in trên loại giấy nào?", "What paper are Dong Ho prints made on?", ["Giấy dó quét điệp", "Giấy báo", "Giấy lụa", "Giấy gói"], 0, "Tranh in trên giấy dó có quét lớp điệp.", "They are printed on do paper brushed with shell powder."),
      q("Màu vàng trong tranh lấy từ đâu?", "Where does the yellow come from?", ["Hoa hòe", "Lá chàm", "Sỏi son", "Than lá tre"], 0, "Hoa hòe cho màu vàng.", "Hoe flowers give yellow."),
      q("Mỗi màu cần gì để in?", "What does each colour require?", ["Một bản gỗ riêng", "Một loại giấy riêng", "Một nghệ nhân riêng", "Một khuôn kim loại"], 0, "Mỗi màu in bằng một bản gỗ riêng.", "Each colour has its own woodblock."),
      q("Bước in cuối cùng là gì?", "What is the final printing step?", ["In nét đen viền", "In màu trắng", "Quét điệp", "Phơi giấy"], 0, "Nét đen viền được in sau cùng.", "The black outline comes last."),
      q("Vì sao tranh Đông Hồ giàu tính biểu tượng?", "Why are Dong Ho prints symbolic?", ["Nghệ nhân phóng to cái quan trọng và giản lược cái phụ", "Vì vẽ giống thật tuyệt đối", "Vì chỉ dùng một màu", "Vì in bằng máy"], 0, "Bài nêu cách phóng to ý chính và giản lược chi tiết phụ.", "The text describes enlarging essentials and simplifying the rest."),
    ],
  },
  {
    id: "vn-v11-folk-catru",
    title: "Ca trù: thơ, nhạc và không gian thính phòng",
    titleEn: "Ca Tru: Poetry, Music and Chamber Space",
    level: "advanced",
    theory: `## Ca trù

Ca trù là nghệ thuật hát thơ có từ khoảng thế kỷ 15, được UNESCO ghi vào danh sách di sản cần bảo vệ khẩn cấp năm 2009.

### 1. Ba người làm nên một canh hát
| Vai | Nhiệm vụ |
|---|---|
| Đào nương | hát và gõ phách |
| Kép | đàn đáy |
| Quan viên | điểm trống chầu, khen hoặc phê |

Điểm đặc biệt là người nghe không thụ động: tiếng trống chầu chính là lời phê bình ngay trong lúc hát.

### 2. Nhạc cụ
đàn đáy ba dây thùng sâu, phách tre, trống chầu

### 3. Thể thơ
Ca trù thường hát thể hát nói, câu chữ linh hoạt, cho phép người hát ngân dài và nhấn theo ý nghĩa của chữ.

### 4. Vì sao khó học
Người hát phải vừa giữ nhịp phách bằng tay, vừa ngân giọng theo lối nảy hạt, vừa hiểu nghĩa bài thơ để nhấn đúng chữ.`,
    theoryEn: `## Ca tru

Ca tru is an art of sung poetry dating from around the 15th century, listed by UNESCO in 2009 as heritage in urgent need of safeguarding.

A session needs three people: the dao nuong singer who also strikes bamboo clappers, the kep who plays the three-string dan day, and the quan vien who taps a praise drum that functions as live criticism.

The usual verse form is hat noi, flexible enough for the singer to stretch notes and stress meaningful words. It is hard to learn because the singer must keep the clapper rhythm, produce the distinctive pearled vibrato, and understand the poem well enough to stress the right words.`,
    vocabulary: [
      v("ca trù", "nghệ thuật hát thơ cổ", "ca tru sung poetry", "Ca trù là di sản cần bảo vệ.", "Ca tru is heritage needing protection.", "danh từ"),
      v("đào nương", "người phụ nữ hát ca trù", "female ca tru singer", "Đào nương vừa hát vừa gõ phách.", "The singer sings and keeps the clappers.", "danh từ"),
      v("kép", "người đàn trong canh hát", "male instrumentalist", "Kép chơi đàn đáy.", "The kep plays the dan day.", "danh từ"),
      v("quan viên", "người nghe điểm trống chầu", "listener who strikes the praise drum", "Quan viên khen bằng tiếng trống.", "The listener praises with the drum.", "danh từ"),
      v("đàn đáy", "đàn ba dây thùng sâu", "dan day three-string lute", "Đàn đáy có tiếng trầm ấm.", "The dan day sounds warm and low.", "danh từ"),
      v("phách", "thanh tre gõ giữ nhịp", "bamboo clappers", "Phách giữ nhịp cho câu hát.", "The clappers keep the beat.", "danh từ"),
      v("trống chầu", "trống nhỏ để khen hoặc phê", "praise drum", "Tiếng trống chầu là lời phê bình.", "The praise drum is live criticism.", "danh từ"),
      v("hát nói", "thể thơ dùng trong ca trù", "hat noi verse form", "Hát nói cho phép ngân dài.", "Hat noi allows long sustained notes.", "danh từ"),
      v("nảy hạt", "kỹ thuật ngân giọng đặc trưng", "pearled vibrato", "Lối nảy hạt rất khó học.", "The pearled vibrato is hard to master.", "danh từ"),
      v("thính phòng", "không gian nhỏ dành cho người nghe kỹ", "chamber setting", "Ca trù diễn trong không gian thính phòng.", "Ca tru suits a chamber setting.", "danh từ"),
    ],
    quiz: [
      q("Một canh hát ca trù cần bao nhiêu vai?", "How many roles make a ca tru session?", ["Ba vai", "Một vai", "Hai vai", "Năm vai"], 0, "Ba vai gồm đào nương, kép và quan viên.", "Three: the singer, the instrumentalist and the drum-striking listener."),
      q("Trống chầu có vai trò gì?", "What is the praise drum's role?", ["Khen hoặc phê ngay trong lúc hát", "Giữ nhịp chính", "Mở đầu buổi diễn", "Thay cho đàn đáy"], 0, "Tiếng trống chầu chính là lời phê bình ngay lúc hát.", "It delivers criticism during the performance."),
      q("Đào nương dùng nhạc cụ nào?", "What does the dao nuong play?", ["Phách tre", "Đàn đáy", "Trống chầu", "Sáo"], 0, "Đào nương vừa hát vừa gõ phách.", "She sings while striking the bamboo clappers."),
      q("Ca trù được UNESCO ghi danh năm nào?", "When did UNESCO list ca tru?", ["2009", "1999", "2015", "2020"], 0, "Năm 2009, ca trù vào danh sách di sản cần bảo vệ khẩn cấp.", "In 2009 it entered the urgent-safeguarding list."),
      q("Vì sao ca trù khó học?", "Why is ca tru hard to learn?", ["Phải giữ nhịp phách, ngân nảy hạt và hiểu nghĩa thơ cùng lúc", "Vì không có người dạy", "Vì nhạc cụ quá nhiều", "Vì hát rất nhanh"], 0, "Bài nêu ba yêu cầu đồng thời này.", "The text lists these three simultaneous demands."),
    ],
  },
  {
    id: "vn-v11-folk-donca",
    title: "Đờn ca tài tử Nam Bộ",
    titleEn: "Don Ca Tai Tu of the South",
    level: "intermediate",
    theory: `## Đờn ca tài tử

Đờn ca tài tử hình thành ở Nam Bộ khoảng cuối thế kỷ 19, được UNESCO ghi danh là di sản văn hóa phi vật thể năm 2013.

### 1. "Tài tử" nghĩa là gì
"Tài tử" ở đây không phải diễn viên nổi tiếng, mà là người chơi nhạc vì yêu nghệ thuật, không lấy biểu diễn làm nghề chính.

### 2. Không gian diễn
Không cần sân khấu. Một bộ bàn ghế trong nhà, dưới mái hiên hay trên xuồng giữa vườn cũng đủ. Ai thuộc bài thì góp giọng.

### 3. Nhạc cụ
đàn kìm, đàn tranh, đàn cò, đàn bầu, ghi ta phím lõm, song lang

### 4. Đặc điểm
Bài bản có khung nhưng người chơi được phép biến hóa gọi là "rao" và "chạy chữ". Vì thế hai lần đàn cùng một bài không bao giờ giống hệt nhau. Đây là nét ứng tác gần với tinh thần jazz.`,
    theoryEn: `## Don ca tai tu

Don ca tai tu formed in southern Vietnam in the late 19th century and was recognised by UNESCO as intangible heritage in 2013.

'Tai tu' does not mean celebrity performer but amateur devotee: someone who plays for love of the art rather than as a profession.

No stage is required. A table indoors, a veranda or a boat in an orchard will do, and anyone who knows the piece may join in.

Instruments include dan kim, dan tranh zither, dan co fiddle, dan bau monochord, scalloped-fret guitar and song lang clapper. Pieces have a skeleton, but players embellish freely, so no two renditions match, an improvisational spirit close to jazz.`,
    vocabulary: [
      v("đờn ca tài tử", "nhạc thính phòng dân gian Nam Bộ", "don ca tai tu music", "Đờn ca tài tử phổ biến ở Nam Bộ.", "Don ca tai tu is popular in the south.", "danh từ"),
      v("tài tử", "người chơi nhạc vì yêu nghệ thuật", "amateur devotee", "Tài tử không lấy diễn làm nghề.", "A tai tu does not perform for a living.", "danh từ"),
      v("đàn kìm", "đàn hai dây của Nam Bộ", "dan kim two-string lute", "Đàn kìm giữ vai trò chính.", "The dan kim leads.", "danh từ"),
      v("ghi ta phím lõm", "ghi ta khoét phím để luyến", "scalloped-fret guitar", "Ghi ta phím lõm luyến được nhiều.", "The scalloped guitar bends notes richly.", "danh từ"),
      v("song lang", "nhạc cụ nhỏ giữ nhịp", "song lang clapper", "Song lang giữ nhịp cho bài.", "The song lang keeps the beat.", "danh từ"),
      v("rao", "đoạn dạo đầu tự do", "free prelude", "Người đàn rao trước khi vào bài.", "Players improvise a prelude first.", "danh từ"),
      v("ứng tác", "sáng tạo ngay khi biểu diễn", "improvisation", "Ứng tác là linh hồn của thể loại này.", "Improvisation is the soul of the genre.", "danh từ"),
      v("bài bản", "khung bài nhạc có sẵn", "canonical piece", "Bài bản có khung nhưng cho phép biến hóa.", "Pieces have a skeleton yet allow variation.", "danh từ"),
      v("mái hiên", "phần mái che trước nhà", "veranda", "Họ đàn ca dưới mái hiên.", "They play on the veranda.", "danh từ"),
      v("phi vật thể", "không phải vật chất, là tri thức và thực hành", "intangible", "Đây là di sản phi vật thể.", "This is intangible heritage.", "tính từ"),
    ],
    quiz: [
      q("'Tài tử' trong đờn ca tài tử nghĩa là gì?", "What does 'tai tu' mean here?", ["Người chơi nhạc vì yêu nghệ thuật", "Diễn viên nổi tiếng", "Người dạy nhạc", "Người viết bài hát"], 0, "'Tài tử' chỉ người chơi vì yêu nghệ thuật, không lấy đó làm nghề chính.", "It means an amateur devotee, not a professional."),
      q("Đờn ca tài tử được UNESCO ghi danh năm nào?", "When did UNESCO recognise it?", ["2013", "2003", "2009", "2019"], 0, "Năm 2013 loại hình này được ghi danh.", "It was listed in 2013."),
      q("Nhạc cụ nào giữ nhịp?", "Which instrument keeps the beat?", ["Song lang", "Đàn tranh", "Đàn bầu", "Đàn cò"], 0, "Song lang là nhạc cụ nhỏ giữ nhịp.", "The song lang clapper keeps the beat."),
      q("'Rao' là gì?", "What is a 'rao'?", ["Đoạn dạo đầu tự do trước khi vào bài", "Tên một nhạc cụ", "Lời hát chính", "Nhịp cuối bài"], 0, "'Rao' là đoạn dạo đầu ứng tác trước khi vào bài bản.", "It is the improvised prelude before the piece."),
      q("Vì sao hai lần đàn cùng một bài không giống hệt nhau?", "Why do two renditions differ?", ["Vì người chơi được phép ứng tác biến hóa", "Vì bài không có khung", "Vì nhạc cụ đổi liên tục", "Vì không ai nhớ bài"], 0, "Bài bản có khung nhưng cho phép ứng tác nên mỗi lần khác nhau.", "The skeleton allows improvisation, so each performance differs."),
    ],
  },
];

const cultureLessons: VietnameseLesson[] = [
  {
    id: "vn-v11-culture-giotet",
    title: "Giỗ tổ và tục thờ cúng tổ tiên",
    titleEn: "Death Anniversaries and Ancestor Worship",
    level: "intermediate",
    theory: `## Thờ cúng tổ tiên

Trong nhà người Việt, bàn thờ thường đặt ở nơi cao và trang trọng nhất. Thờ cúng tổ tiên không phải tôn giáo riêng, mà là cách bày tỏ lòng biết ơn với người đã sinh thành.

### 1. Ngày giỗ
Giỗ là ngày mất theo âm lịch của người thân. Con cháu nấu những món người đã mất từng thích, thắp hương, mời họ hàng tới ăn cơm và nhắc lại chuyện xưa.

### 2. Trên bàn thờ
bát hương, đèn hoặc nến, chén nước, hoa tươi, mâm ngũ quả, ảnh người đã mất

### 3. Cách hành lễ đúng mực
- Ăn mặc gọn gàng, nói năng nhẹ nhàng.
- Thắp hương số lẻ, thường là một hoặc ba nén.
- Không để hoa quả hỏng trên bàn thờ.
- Người ngoài được mời dự thì chỉ cần đứng chắp tay, không bắt buộc quỳ lễ.

### 4. Ý nghĩa xã hội
Ngày giỗ là dịp họ hàng gặp nhau, truyền lại gia phả và những câu chuyện gia đình cho lớp trẻ.`,
    theoryEn: `## Ancestor worship

In Vietnamese homes the altar sits in the highest, most dignified place. Ancestor worship is not a separate religion but an expression of gratitude to those who gave you life.

A gio is the lunar-calendar anniversary of a relative's death. Descendants cook the dishes the deceased loved, light incense, invite relatives to share a meal and retell old stories.

The altar holds an incense bowl, a lamp or candles, cups of water, fresh flowers, a five-fruit tray and a photograph.

Proper conduct: dress neatly, speak softly, light an odd number of incense sticks, never leave spoiled fruit, and as an invited guest simply stand with joined hands.

Socially, the anniversary gathers the extended family and passes lineage and stories to the young.`,
    vocabulary: [
      v("bàn thờ", "nơi đặt đồ thờ trong nhà", "family altar", "Bàn thờ đặt ở nơi trang trọng nhất.", "The altar sits in the most dignified spot.", "danh từ"),
      v("ngày giỗ", "ngày mất theo âm lịch", "death anniversary", "Ngày giỗ họ hàng tới đông.", "Relatives gather on the anniversary.", "danh từ"),
      v("bát hương", "bát để cắm hương", "incense bowl", "Bát hương đặt giữa bàn thờ.", "The incense bowl sits at the centre.", "danh từ"),
      v("thắp hương", "đốt hương để cúng", "to light incense", "Con cháu thắp hương trước bữa cơm.", "Descendants light incense before the meal.", "động từ"),
      v("mâm ngũ quả", "mâm năm loại quả", "five-fruit tray", "Mâm ngũ quả bày ngày lễ.", "The five-fruit tray appears on holy days.", "danh từ"),
      v("gia phả", "sổ ghi dòng họ", "family genealogy", "Ngày giỗ là dịp đọc lại gia phả.", "The anniversary is a time to review the genealogy.", "danh từ"),
      v("chắp tay", "để hai tay lại tỏ ý kính", "to join one's hands", "Khách chỉ cần đứng chắp tay.", "Guests need only stand with joined hands.", "động từ"),
      v("sinh thành", "sinh ra và nuôi lớn", "to give birth and raise", "Biết ơn công sinh thành.", "Be grateful for being born and raised.", "động từ"),
      v("họ hàng", "người cùng dòng họ", "relatives", "Họ hàng tới ăn cơm giỗ.", "Relatives come for the anniversary meal.", "danh từ"),
      v("số lẻ", "số không chia hết cho hai", "odd number", "Thắp hương số lẻ.", "Light an odd number of incense sticks.", "danh từ"),
    ],
    quiz: [
      q("'Giỗ' là ngày gì?", "What is a 'giỗ'?", ["Ngày mất theo âm lịch của người thân", "Ngày sinh của người thân", "Ngày cưới", "Ngày đầu năm"], 0, "Giỗ là ngày mất tính theo âm lịch.", "It is the lunar anniversary of a death."),
      q("Nên thắp bao nhiêu nén hương?", "How many incense sticks should you light?", ["Số lẻ, thường một hoặc ba nén", "Luôn hai nén", "Luôn bốn nén", "Càng nhiều càng tốt"], 0, "Tục lệ thắp hương theo số lẻ, thường một hoặc ba nén.", "Custom favours an odd number, usually one or three."),
      q("Khách được mời dự giỗ nên làm gì?", "What should an invited guest do?", ["Đứng chắp tay, không bắt buộc quỳ lễ", "Bắt buộc quỳ lễ ba lần", "Tự sắp lại bàn thờ", "Không cần chào ai"], 0, "Khách chỉ cần đứng chắp tay tỏ lòng kính trọng.", "A guest simply stands with joined hands."),
      q("Ý nghĩa xã hội của ngày giỗ là gì?", "What is the social meaning of a gio?", ["Dịp họ hàng gặp nhau và truyền lại chuyện gia đình", "Dịp mua sắm lớn", "Dịp nghỉ phép dài", "Dịp đi du lịch"], 0, "Bài nêu đây là dịp gặp gỡ, truyền lại gia phả và chuyện gia đình.", "It gathers family and passes on lineage and stories."),
      q("Thờ cúng tổ tiên được hiểu là gì?", "How is ancestor worship understood?", ["Cách bày tỏ lòng biết ơn với người sinh thành", "Một tôn giáo riêng biệt", "Một nghi lễ của nhà nước", "Một hình thức mê tín bắt buộc"], 0, "Bài nói đây không phải tôn giáo riêng mà là cách bày tỏ lòng biết ơn.", "The text calls it gratitude, not a separate religion."),
    ],
  },
  {
    id: "vn-v11-culture-mecung",
    title: "Trung thu và tuổi thơ Việt Nam",
    titleEn: "Mid-Autumn Festival and Vietnamese Childhood",
    level: "beginner",
    theory: `## Tết Trung thu

Trung thu diễn ra ngày rằm tháng Tám âm lịch, khi mặt trăng sáng và tròn nhất trong năm.

### 1. Hoạt động quen thuộc
- **Rước đèn**: trẻ em cầm đèn ông sao, đèn cá chép đi quanh làng hoặc khu phố.
- **Múa lân**: đội lân gõ trống tới từng nhà, chủ nhà tặng quà lấy may.
- **Phá cỗ**: cả nhà ngồi ngoài sân ăn bánh nướng, bánh dẻo, bưởi, hồng.

### 2. Bánh trung thu
Bánh nướng vỏ vàng, bánh dẻo màu trắng. Nhân truyền thống là đậu xanh, hạt sen, thập cẩm có lạp xưởng và mứt bí.

### 3. Chuyện kể ngày Trung thu
Chuyện chú Cuội ngồi dưới gốc cây đa trên mặt trăng là chuyện quen thuộc nhất, thường được kể cho trẻ trong lúc chờ phá cỗ.

### 4. Ý nghĩa
Trung thu vốn là lễ mừng mùa gặt, sau trở thành ngày của trẻ em và cũng là dịp người lớn tặng quà tỏ lòng biết ơn nhau.`,
    theoryEn: `## Mid-Autumn Festival

Trung thu falls on the fifteenth day of the eighth lunar month, when the moon is brightest and roundest.

Customs include lantern parades with star and carp lanterns, lion dances that visit each house for a lucky gift, and pha co, sharing baked and sticky mooncakes with pomelo and persimmon in the yard.

Baked mooncakes have golden crusts; sticky ones are white. Fillings include mung bean, lotus seed and mixed filling with Chinese sausage and candied winter melon.

The tale of Cuoi under the banyan tree on the moon is the classic bedtime story of the night.

Originally a harvest festival, Trung thu became a children's day and an occasion for adults to exchange gifts of gratitude.`,
    vocabulary: [
      v("Trung thu", "tết rằm tháng Tám", "Mid-Autumn Festival", "Trung thu là ngày của trẻ em.", "Mid-Autumn is a children's day.", "danh từ"),
      v("rằm", "ngày mười lăm âm lịch", "the fifteenth of a lunar month", "Rằm tháng Tám trăng sáng nhất.", "The eighth-month full moon is brightest.", "danh từ"),
      v("rước đèn", "đi thành đoàn cầm đèn", "lantern parade", "Trẻ em rước đèn quanh khu phố.", "Children parade lanterns around the block.", "động từ"),
      v("đèn ông sao", "đèn hình ngôi sao năm cánh", "star lantern", "Đèn ông sao làm bằng tre và giấy bóng.", "Star lanterns are bamboo and cellophane.", "danh từ"),
      v("múa lân", "màn múa con lân", "lion dance", "Đội múa lân gõ trống rất to.", "The lion dance troupe drums loudly.", "danh từ"),
      v("phá cỗ", "cùng ăn mâm cỗ trung thu", "to share the festive tray", "Cả nhà phá cỗ ngoài sân.", "The family shares the tray in the yard.", "động từ"),
      v("bánh nướng", "bánh trung thu vỏ nướng vàng", "baked mooncake", "Bánh nướng có vỏ vàng.", "Baked mooncakes have golden crusts.", "danh từ"),
      v("bánh dẻo", "bánh trung thu vỏ trắng mềm", "sticky mooncake", "Bánh dẻo màu trắng thơm mùi hoa bưởi.", "Sticky mooncakes are white and pomelo-scented.", "danh từ"),
      v("thập cẩm", "nhân gồm nhiều thứ trộn lại", "mixed filling", "Nhân thập cẩm có lạp xưởng và mứt bí.", "Mixed filling contains sausage and candied melon.", "danh từ"),
      v("chú Cuội", "nhân vật trong chuyện mặt trăng", "Cuoi, the man on the moon", "Chuyện chú Cuội kể cho trẻ nghe.", "Cuoi's story is told to children.", "danh từ"),
    ],
    quiz: [
      q("Trung thu diễn ra ngày nào?", "When is Trung thu?", ["Rằm tháng Tám âm lịch", "Mùng một tháng Một", "Rằm tháng Bảy", "Mùng năm tháng Năm"], 0, "Trung thu là ngày rằm tháng Tám âm lịch.", "It falls on the fifteenth of the eighth lunar month."),
      q("'Phá cỗ' nghĩa là gì?", "What does 'phá cỗ' mean?", ["Cùng nhau ăn mâm cỗ trung thu", "Dọn dẹp sau tiệc", "Làm bánh trung thu", "Tắt đèn đi ngủ"], 0, "Phá cỗ là lúc cả nhà cùng ăn mâm bánh trái.", "It is when the family shares the festive tray."),
      q("Bánh nào có vỏ trắng mềm?", "Which mooncake has a soft white skin?", ["Bánh dẻo", "Bánh nướng", "Bánh chưng", "Bánh gai"], 0, "Bánh dẻo có vỏ trắng mềm.", "The sticky mooncake is soft and white."),
      q("Đội múa lân tới nhà để làm gì?", "Why does the lion dance visit homes?", ["Biểu diễn lấy may, chủ nhà tặng quà", "Bán bánh trung thu", "Thu tiền điện", "Dạy trẻ làm đèn"], 0, "Bài nêu đội lân tới từng nhà, chủ nhà tặng quà lấy may.", "The troupe visits and receives a lucky gift."),
      q("Nguồn gốc ban đầu của Trung thu là gì?", "What was Trung thu originally?", ["Lễ mừng mùa gặt", "Ngày thành lập làng", "Ngày giỗ tổ", "Ngày hội đua thuyền"], 0, "Bài nêu Trung thu vốn là lễ mừng mùa gặt.", "The text says it began as a harvest festival."),
    ],
  },
  {
    id: "vn-v11-culture-tea",
    title: "Văn hóa uống trà của người Việt",
    titleEn: "Vietnamese Tea Culture",
    level: "intermediate",
    theory: `## Uống trà

Trà là thức uống hằng ngày và cũng là nghi thức tiếp khách của người Việt.

### 1. Ba loại trà quen thuộc
| Loại | Đặc điểm |
|---|---|
| Trà xanh (trà mộc) | vị chát nhẹ, hậu ngọt, uống hằng ngày |
| Trà sen | ướp hoa sen, thơm dịu, dùng dịp đặc biệt |
| Trà nhài | ướp hoa nhài, dễ uống, phổ biến ở hàng nước |

### 2. Cách mời trà đúng phép
- Rót trà chỉ khoảng bảy phần chén, không rót đầy tràn.
- Mời người lớn tuổi nhất trước, đưa bằng hai tay.
- Người nhận nên đỡ chén bằng hai tay và nói "cảm ơn".

### 3. Trà trong đời sống
Bàn trà là nơi bàn việc họ hàng, hỏi cưới, giảng hòa sau mâu thuẫn. Câu "mời chén trà" nhiều khi là cách mở lời cho một cuộc nói chuyện quan trọng.

### 4. Lưu ý
Không rót trà lạnh cho khách, cũng không để khách tự rót lần đầu, vì đó là phần việc của chủ nhà.`,
    theoryEn: `## Drinking tea

Tea is both a daily drink and a ritual of hospitality in Vietnam.

Three familiar kinds: green tea, mildly astringent with a sweet finish, for every day; lotus tea, scented with lotus for special occasions; jasmine tea, easy-drinking and common at roadside stalls.

Etiquette: fill a cup about seven tenths, never to the brim; serve the eldest first with both hands; receive the cup with both hands and thank the host.

The tea table is where families discuss marriages, settle disputes and open serious conversations. Never serve cold tea to a guest, and never let a guest pour the first round, as pouring is the host's duty.`,
    vocabulary: [
      v("trà mộc", "trà xanh không ướp hương", "plain green tea", "Ông tôi chỉ uống trà mộc.", "My grandfather drinks only plain green tea.", "danh từ"),
      v("trà sen", "trà ướp hoa sen", "lotus tea", "Trà sen dùng dịp đặc biệt.", "Lotus tea is for special occasions.", "danh từ"),
      v("chát", "vị hơi gắt ở đầu lưỡi", "astringent", "Trà xanh có vị chát nhẹ.", "Green tea is mildly astringent.", "tính từ"),
      v("hậu ngọt", "vị ngọt còn lại sau khi uống", "sweet aftertaste", "Trà tốt có hậu ngọt.", "Good tea leaves a sweet aftertaste.", "danh từ"),
      v("mời trà", "đưa trà cho khách", "to offer tea", "Chủ nhà mời trà trước khi nói chuyện.", "The host offers tea before talking.", "động từ"),
      v("chén", "cốc nhỏ để uống trà", "small teacup", "Rót bảy phần chén là vừa.", "Seven tenths of a cup is right.", "danh từ"),
      v("ấm trà", "bình để pha trà", "teapot", "Ấm trà đất nung giữ nhiệt tốt.", "A clay teapot holds heat well.", "danh từ"),
      v("bàn trà", "nơi ngồi uống trà và nói chuyện", "tea table", "Bàn trà là nơi bàn việc lớn.", "Important matters are discussed at the tea table.", "danh từ"),
      v("giảng hòa", "làm cho hai bên hết mâu thuẫn", "to reconcile", "Chén trà giúp giảng hòa.", "A cup of tea helps reconcile.", "động từ"),
      v("tiếp khách", "đón và mời khách", "to receive guests", "Trà là nghi thức tiếp khách.", "Tea is a ritual of hospitality.", "động từ"),
    ],
    quiz: [
      q("Nên rót trà đầy đến mức nào?", "How full should a teacup be?", ["Khoảng bảy phần chén", "Đầy tràn", "Nửa chén", "Chỉ một ngụm"], 0, "Phép mời trà là rót khoảng bảy phần chén.", "Etiquette says about seven tenths."),
      q("Mời trà nên mời ai trước?", "Who should be served first?", ["Người lớn tuổi nhất", "Người trẻ nhất", "Chủ nhà", "Người ngồi gần nhất"], 0, "Mời người lớn tuổi nhất trước là phép lịch sự.", "The eldest is served first."),
      q("Trà sen thường dùng khi nào?", "When is lotus tea used?", ["Dịp đặc biệt", "Mỗi bữa ăn", "Khi trời lạnh", "Khi uống một mình"], 0, "Trà sen thơm dịu, dùng dịp đặc biệt.", "Lotus tea suits special occasions."),
      q("Vai trò của bàn trà trong gia đình là gì?", "What role does the tea table play?", ["Nơi bàn việc họ hàng và giảng hòa", "Nơi ăn cơm chính", "Nơi học bài", "Nơi cất đồ"], 0, "Bài nêu bàn trà là nơi bàn việc và giảng hòa.", "The text calls it the place for family matters and reconciliation."),
      q("Điều nào KHÔNG đúng phép khi tiếp khách?", "Which is NOT proper hospitality?", ["Để khách tự rót chén trà đầu tiên", "Rót bảy phần chén", "Đưa trà bằng hai tay", "Mời người lớn tuổi trước"], 0, "Rót lần đầu là phần việc của chủ nhà.", "Pouring the first round is the host's duty."),
    ],
  },
  {
    id: "vn-v11-culture-wedding",
    title: "Nghi lễ cưới truyền thống",
    titleEn: "Traditional Wedding Rituals",
    level: "advanced",
    theory: `## Cưới xin truyền thống

Một lễ cưới truyền thống thường qua ba bước chính, dù nhiều gia đình nay rút gọn.

### 1. Ba bước
| Lễ | Nội dung |
|---|---|
| **Dạm ngõ** | hai gia đình gặp nhau lần đầu chính thức |
| **Ăn hỏi** | nhà trai mang lễ vật, chính thức xin cưới |
| **Lễ cưới** | rước dâu, làm lễ gia tiên, tiệc mừng |

### 2. Lễ vật ăn hỏi
Số mâm lễ thường là số lẻ: năm, bảy hoặc chín mâm. Bên trong có bánh, chè, rượu, trầu cau, hoa quả, lợn sữa hoặc xôi gấc tùy vùng.

### 3. Lễ gia tiên
Cô dâu chú rể thắp hương trước bàn thờ hai bên gia đình để trình với tổ tiên. Đây là phần được coi trọng nhất, hơn cả tiệc.

### 4. Khác biệt vùng miền
Miền Bắc chú trọng mâm lễ và thứ tự nghi thức. Miền Trung giản dị và nghiêm cẩn. Miền Nam thoải mái hơn, tiệc thường đông và vui.`,
    theoryEn: `## Traditional weddings

A traditional wedding has three main stages, though many families now shorten them: dam ngo, the first formal meeting of the two families; an hoi, when the groom's family brings gifts and formally asks for the marriage; and le cuoi, the procession, ancestral rite and banquet.

Gift trays come in odd numbers, usually five, seven or nine, holding cakes, tea, wine, betel and areca, fruit and, depending on the region, suckling pig or red sticky rice.

The ancestral rite, when bride and groom light incense at both family altars, is valued above the banquet.

Regional styles differ: the north stresses trays and sequence, the centre is austere and solemn, the south is more relaxed with large lively banquets.`,
    vocabulary: [
      v("dạm ngõ", "lễ gặp mặt chính thức đầu tiên", "first formal family meeting", "Dạm ngõ là bước mở đầu.", "Dam ngo opens the process.", "danh từ"),
      v("ăn hỏi", "lễ nhà trai mang lễ vật xin cưới", "betrothal ceremony", "Lễ ăn hỏi có chín mâm.", "The betrothal had nine trays.", "danh từ"),
      v("rước dâu", "đón cô dâu về nhà chồng", "bridal procession", "Rước dâu diễn ra buổi sáng.", "The procession takes place in the morning.", "động từ"),
      v("lễ gia tiên", "lễ trình trước bàn thờ tổ tiên", "ancestral rite", "Lễ gia tiên được coi trọng nhất.", "The ancestral rite matters most.", "danh từ"),
      v("trầu cau", "lá trầu và quả cau trong lễ cưới", "betel and areca", "Trầu cau không thể thiếu.", "Betel and areca are indispensable.", "danh từ"),
      v("mâm lễ", "khay đựng lễ vật", "gift tray", "Số mâm lễ thường là số lẻ.", "Gift trays come in odd numbers.", "danh từ"),
      v("xôi gấc", "xôi màu đỏ từ quả gấc", "red gac sticky rice", "Xôi gấc màu đỏ tượng trưng may mắn.", "Red gac rice symbolises luck.", "danh từ"),
      v("nhà trai", "gia đình chú rể", "the groom's family", "Nhà trai mang lễ vật tới.", "The groom's family brings the gifts.", "danh từ"),
      v("nhà gái", "gia đình cô dâu", "the bride's family", "Nhà gái đón đoàn ở cổng.", "The bride's family greets them at the gate.", "danh từ"),
      v("nghiêm cẩn", "trang nghiêm và cẩn trọng", "solemn and careful", "Lễ cưới miền Trung rất nghiêm cẩn.", "Central weddings are solemn and careful.", "tính từ"),
    ],
    quiz: [
      q("Ba bước chính của lễ cưới truyền thống là gì?", "What are the three main stages?", ["Dạm ngõ, ăn hỏi, lễ cưới", "Ăn hỏi, tiệc, rước dâu", "Dạm ngõ, tiệc, lại mặt", "Rước dâu, lễ gia tiên, dạm ngõ"], 0, "Bài nêu thứ tự dạm ngõ, ăn hỏi, lễ cưới.", "The text lists dam ngo, an hoi and le cuoi."),
      q("Số mâm lễ ăn hỏi thường là số nào?", "Gift trays usually come in what number?", ["Số lẻ như năm, bảy, chín", "Số chẵn như bốn, sáu", "Luôn là mười", "Luôn là hai"], 0, "Số mâm lễ thường là số lẻ.", "Trays come in odd numbers."),
      q("Phần nào được coi trọng nhất?", "Which part is valued most?", ["Lễ gia tiên", "Tiệc mừng", "Chụp ảnh cưới", "Rước dâu"], 0, "Bài nêu lễ gia tiên được coi trọng hơn cả tiệc.", "The ancestral rite outweighs the banquet."),
      q("Đặc điểm lễ cưới miền Trung là gì?", "What characterises central weddings?", ["Giản dị và nghiêm cẩn", "Rất nhiều mâm lễ", "Tiệc lớn và ồn ào", "Không có lễ gia tiên"], 0, "Bài nêu miền Trung giản dị và nghiêm cẩn.", "The text calls them austere and solemn."),
      q("Lễ vật nào không thể thiếu trong cưới xin?", "Which gift is indispensable?", ["Trầu cau", "Bánh kem", "Trà sữa", "Hoa hồng nhập khẩu"], 0, "Trầu cau là lễ vật truyền thống không thể thiếu.", "Betel and areca are the indispensable traditional gift."),
    ],
  },
];

const artsModule = folkloreLanguageModules.find((mod) => mod.id === "vn-folk-arts");
if (artsModule) artsModule.lessons.push(...artsLessons);

const cultureModule = vietnameseLessonsExpansionModules.find((mod) => mod.id === "vn-culture-expanded");
if (cultureModule) cultureModule.lessons.push(...cultureLessons);
