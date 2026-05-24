/**
 * @file cambridgeKidsVocabMaster9.ts
 * @description Additional Cambridge YLE vocabulary expansion across all levels.
 * Each word includes a child-friendly bilingual example.
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;

const mk = (
  word: string, vi: string, emoji: string, level: CambridgeKidsLevel,
  example: string, exampleVi: string
): W => ({ word, vi, emoji, level, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_MASTER_9: W[] = [
  // ─── STARTERS (A1) ───
  mk("balloon", "bóng bay", "🎈", "Starters", "Hold the red balloon tight.", "Hãy giữ chặt quả bóng bay đỏ."),
  mk("bee", "con ong", "🐝", "Starters", "A bee makes sweet honey.", "Con ong làm mật ngọt."),
  mk("box", "cái hộp", "📦", "Starters", "The toy is in the box.", "Đồ chơi ở trong hộp."),
  mk("butter", "bơ", "🧈", "Starters", "I put butter on my bread.", "Em phết bơ lên bánh mì."),
  mk("candy", "kẹo", "🍬", "Starters", "I love sweet candy.", "Em rất thích kẹo ngọt."),
  mk("carrot", "cà rốt", "🥕", "Starters", "Rabbits eat orange carrots.", "Thỏ ăn cà rốt màu cam."),
  mk("cheese", "phô mai", "🧀", "Starters", "Mice love yellow cheese.", "Chuột rất thích phô mai vàng."),
  mk("chicken", "con gà", "🐔", "Starters", "The chicken says cluck cluck.", "Con gà kêu cục cục."),
  mk("crayon", "bút sáp màu", "🖍️", "Starters", "I draw with my crayons.", "Em vẽ bằng bút sáp màu."),
  mk("dad", "bố", "👨", "Starters", "My dad plays football with me.", "Bố em chơi đá bóng với em."),
  mk("dish", "cái đĩa", "🍽️", "Starters", "The dish is clean.", "Cái đĩa thật sạch."),
  mk("doll", "búp bê", "🪆", "Starters", "She plays with her doll.", "Bạn ấy chơi với búp bê."),
  mk("egg", "quả trứng", "🥚", "Starters", "An egg is in the nest.", "Một quả trứng ở trong tổ."),
  mk("fan", "cái quạt", "🪭", "Starters", "Turn on the fan, please.", "Hãy bật quạt giúp em."),
  mk("flag", "lá cờ", "🚩", "Starters", "The flag is red and gold.", "Lá cờ màu đỏ và vàng."),
  mk("fork", "cái nĩa", "🍴", "Starters", "Use a fork to eat.", "Hãy dùng nĩa để ăn."),
  mk("hat", "cái mũ", "👒", "Starters", "Her hat is very pretty.", "Cái mũ của bạn ấy rất đẹp."),
  mk("kid", "trẻ em", "🧒", "Starters", "The kids play in the park.", "Trẻ em chơi trong công viên."),
  mk("lamp", "cái đèn", "💡", "Starters", "I read by the lamp.", "Em đọc sách bên đèn."),
  mk("mom", "mẹ", "👩", "Starters", "My mom makes nice food.", "Mẹ em nấu món ngon."),
  mk("plate", "cái dĩa", "🍽️", "Starters", "My plate is empty.", "Đĩa của em đã hết."),
  mk("sock", "vớ", "🧦", "Starters", "Wear warm socks in winter.", "Hãy đi tất ấm vào mùa đông."),
  mk("spoon", "cái thìa", "🥄", "Starters", "Eat soup with a spoon.", "Hãy ăn súp bằng thìa."),
  mk("sweet", "ngọt", "🍭", "Starters", "Honey is very sweet.", "Mật ong rất ngọt."),
  mk("toy", "đồ chơi", "🪀", "Starters", "My toy car is red.", "Xe đồ chơi của em màu đỏ."),

  // ─── MOVERS (A1+) ───
  mk("actor", "diễn viên", "🎭", "Movers", "The actor is very funny.", "Diễn viên rất vui nhộn."),
  mk("art", "nghệ thuật", "🎨", "Movers", "I love art class.", "Em yêu giờ học nghệ thuật."),
  mk("blanket", "cái chăn", "🛌", "Movers", "The blanket is soft and warm.", "Cái chăn mềm và ấm."),
  mk("brave", "dũng cảm", "🦸", "Movers", "The brave boy helps others.", "Cậu bé dũng cảm giúp đỡ mọi người."),
  mk("bucket", "cái xô", "🪣", "Movers", "Fill the bucket with water.", "Đổ đầy nước vào xô."),
  mk("cabbage", "bắp cải", "🥬", "Movers", "Cabbage is healthy and green.", "Bắp cải tốt cho sức khỏe và có màu xanh."),
  mk("clever", "thông minh", "🧠", "Movers", "My sister is very clever.", "Chị em rất thông minh."),
  mk("coach", "huấn luyện viên", "🧑‍🏫", "Movers", "The coach teaches us football.", "Huấn luyện viên dạy chúng em đá bóng."),
  mk("coconut", "dừa", "🥥", "Movers", "Coconuts grow on tall trees.", "Dừa mọc trên cây cao."),
  mk("dentist", "nha sĩ", "🦷", "Movers", "The dentist checks my teeth.", "Nha sĩ kiểm tra răng em."),
  mk("desert", "sa mạc", "🏜️", "Movers", "The desert is hot and dry.", "Sa mạc thì nóng và khô."),
  mk("envelope", "phong bì", "✉️", "Movers", "Put the letter in the envelope.", "Bỏ lá thư vào phong bì."),
  mk("famous", "nổi tiếng", "🌟", "Movers", "She is a famous singer.", "Cô ấy là ca sĩ nổi tiếng."),
  mk("hill", "ngọn đồi", "🌄", "Movers", "We climb up the green hill.", "Chúng em leo lên ngọn đồi xanh."),
  mk("knee", "đầu gối", "🦵", "Movers", "I hurt my knee playing.", "Em đau đầu gối khi chơi."),
  mk("magic", "phép thuật", "✨", "Movers", "The magic show is amazing!", "Buổi diễn ảo thuật thật tuyệt vời!"),
  mk("polite", "lịch sự", "🙇", "Movers", "Please be polite to others.", "Hãy lịch sự với mọi người."),
  mk("safe", "an toàn", "🛡️", "Movers", "Keep your money safe.", "Hãy giữ tiền của bạn an toàn."),
  mk("ticket", "vé", "🎫", "Movers", "I have two cinema tickets.", "Em có hai vé xem phim."),
  mk("umbrella", "cái ô", "☂️", "Movers", "Take your umbrella — it's raining!", "Hãy mang ô — trời đang mưa!"),

  // ─── FLYERS (A2) ───
  mk("adventure", "cuộc phiêu lưu", "🗺️", "Flyers", "Our trip was a big adventure.", "Chuyến đi là một cuộc phiêu lưu lớn."),
  mk("astronaut", "phi hành gia", "👨‍🚀", "Flyers", "The astronaut floats in space.", "Phi hành gia bay trong vũ trụ."),
  mk("brave", "dũng cảm", "🦁", "Flyers", "Be brave and try your best.", "Hãy dũng cảm và cố hết sức."),
  mk("celebrate", "ăn mừng", "🎊", "Flyers", "We celebrate her birthday.", "Chúng em ăn mừng sinh nhật bạn ấy."),
  mk("creative", "sáng tạo", "💡", "Flyers", "Her drawings are very creative.", "Tranh của bạn ấy rất sáng tạo."),
  mk("decide", "quyết định", "🤔", "Flyers", "Decide what you want to eat.", "Hãy quyết định bạn muốn ăn gì."),
  mk("explore", "khám phá", "🔍", "Flyers", "Let's explore the forest!", "Cùng khám phá khu rừng nào!"),
  mk("friendly", "thân thiện", "🤗", "Flyers", "My neighbours are friendly.", "Hàng xóm của em rất thân thiện."),
  mk("homework", "bài tập về nhà", "📓", "Flyers", "I finish my homework first.", "Em làm xong bài tập trước."),
  mk("invent", "phát minh", "🔧", "Flyers", "She wants to invent a robot.", "Bạn ấy muốn phát minh ra một con robot."),
  mk("journey", "hành trình", "🛤️", "Flyers", "Our journey takes two days.", "Hành trình của chúng tôi mất hai ngày."),
  mk("kindness", "lòng tốt", "💖", "Flyers", "Kindness costs nothing.", "Lòng tốt chẳng tốn gì cả."),
  mk("magazine", "tạp chí", "📔", "Flyers", "I read a science magazine.", "Em đọc một tạp chí khoa học."),
  mk("neighbour", "hàng xóm", "🏘️", "Flyers", "Our neighbour has a big dog.", "Hàng xóm có một con chó to."),
  mk("opinion", "ý kiến", "💬", "Flyers", "What's your opinion?", "Ý kiến của bạn là gì?"),

  // ─── KET (A2 Key) ───
  mk("advice", "lời khuyên", "🗣️", "KET", "Thanks for your good advice.", "Cảm ơn lời khuyên tốt của bạn."),
  mk("apologise", "xin lỗi", "🙏", "KET", "She apologised for being late.", "Cô ấy xin lỗi vì đến muộn."),
  mk("appointment", "cuộc hẹn", "📅", "KET", "I have a doctor's appointment.", "Em có một cuộc hẹn với bác sĩ."),
  mk("borrow", "mượn", "🤲", "KET", "Can I borrow your pen?", "Mình mượn bút của bạn được không?"),
  mk("careful", "cẩn thận", "⚠️", "KET", "Be careful on the stairs.", "Hãy cẩn thận trên cầu thang."),
  mk("describe", "miêu tả", "📝", "KET", "Describe your best friend.", "Hãy miêu tả người bạn thân nhất."),
  mk("disappointed", "thất vọng", "😞", "KET", "I felt disappointed by the news.", "Em cảm thấy thất vọng vì tin đó."),
  mk("encourage", "khích lệ", "💪", "KET", "Parents encourage their children.", "Cha mẹ khích lệ con cái."),
  mk("environment", "môi trường", "🌳", "KET", "We must protect the environment.", "Chúng ta phải bảo vệ môi trường."),
  mk("explain", "giải thích", "💡", "KET", "The teacher will explain it.", "Cô giáo sẽ giải thích điều đó."),
  mk("imagine", "tưởng tượng", "🌈", "KET", "Imagine you can fly.", "Hãy tưởng tượng bạn có thể bay."),
  mk("memory", "ký ức", "🧠", "KET", "I have a happy memory of summer.", "Em có ký ức vui về mùa hè."),
  mk("opportunity", "cơ hội", "🚪", "KET", "Don't miss this opportunity.", "Đừng bỏ lỡ cơ hội này."),
  mk("organise", "tổ chức", "📋", "KET", "Let's organise a party.", "Cùng tổ chức một bữa tiệc nào."),
  mk("recommend", "đề xuất", "👍", "KET", "I recommend this restaurant.", "Em đề xuất nhà hàng này."),

  // ─── PET (B1) ───
  mk("achieve", "đạt được", "🎯", "PET", "She achieved her dream.", "Cô ấy đã đạt được giấc mơ."),
  mk("attitude", "thái độ", "🧘", "PET", "A positive attitude helps a lot.", "Thái độ tích cực giúp ích rất nhiều."),
  mk("benefit", "lợi ích", "✅", "PET", "Reading has many benefits.", "Đọc sách có nhiều lợi ích."),
  mk("challenge", "thử thách", "🏔️", "PET", "Climbing is a real challenge.", "Leo núi là một thử thách thật sự."),
  mk("commit", "cam kết", "🤝", "PET", "Commit to your goals.", "Hãy cam kết với mục tiêu của bạn."),
  mk("confident", "tự tin", "💪", "PET", "She is confident on stage.", "Cô ấy tự tin trên sân khấu."),
  mk("cooperate", "hợp tác", "👥", "PET", "Teams cooperate to win.", "Các đội hợp tác để chiến thắng."),
  mk("creative", "sáng tạo", "🎨", "PET", "He is a creative writer.", "Anh ấy là một nhà văn sáng tạo."),
  mk("debate", "tranh luận", "💬", "PET", "Students debate hot topics.", "Học sinh tranh luận về các chủ đề nóng."),
  mk("encourage", "khuyến khích", "📣", "PET", "Teachers encourage students.", "Giáo viên khuyến khích học sinh."),
  mk("essential", "thiết yếu", "⚙️", "PET", "Water is essential for life.", "Nước là thiết yếu cho sự sống."),
  mk("flexible", "linh hoạt", "🤸", "PET", "Be flexible with your plans.", "Hãy linh hoạt với kế hoạch của bạn."),
  mk("generous", "hào phóng", "🎁", "PET", "He is generous with his time.", "Anh ấy hào phóng với thời gian."),
  mk("inspire", "truyền cảm hứng", "🌟", "PET", "Great teachers inspire us.", "Giáo viên giỏi truyền cảm hứng cho ta."),
  mk("respect", "tôn trọng", "🙇", "PET", "We respect our elders.", "Chúng ta tôn trọng người lớn tuổi."),
  mk("responsible", "có trách nhiệm", "📌", "PET", "Be responsible for your actions.", "Hãy có trách nhiệm với hành động của bạn."),
  mk("solution", "giải pháp", "💡", "PET", "We found a smart solution.", "Chúng tôi tìm ra giải pháp thông minh."),
  mk("succeed", "thành công", "🏆", "PET", "Hard work helps you succeed.", "Chăm chỉ giúp bạn thành công."),
  mk("talent", "tài năng", "🌟", "PET", "She has a talent for music.", "Cô ấy có tài năng âm nhạc."),
  mk("teamwork", "làm việc nhóm", "🤝", "PET", "Teamwork makes the dream work.", "Làm việc nhóm biến giấc mơ thành sự thật."),
];
