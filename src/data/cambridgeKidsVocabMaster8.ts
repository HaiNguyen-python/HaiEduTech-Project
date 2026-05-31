/**
 * @file cambridgeKidsVocabMaster8.ts
 * @description Batch 8 - additional Cambridge YLE vocabulary (Starters → PET).
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;

const mk = (
  word: string, vi: string, emoji: string, level: CambridgeKidsLevel,
  example: string, exampleVi: string
): W => ({ word, vi, emoji, level, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_MASTER_8: W[] = [
  // ============ STARTERS ============
  mk("banana", "quả chuối", "🍌", "Starters", "Monkeys love bananas.", "Khỉ thích chuối lắm."),
  mk("car", "xe ô tô", "🚗", "Starters", "My car is red.", "Xe của em màu đỏ."),
  mk("hat", "cái mũ", "🎩", "Starters", "Wear a hat in the sun.", "Hãy đội mũ khi trời nắng."),
  mk("ice cream", "kem", "🍦", "Starters", "I want a chocolate ice cream.", "Em muốn một cây kem sô-cô-la."),
  mk("kite", "diều", "🪁", "Starters", "We fly a kite at the park.", "Chúng em thả diều ở công viên."),
  mk("moon", "mặt trăng", "🌙", "Starters", "The moon shines at night.", "Mặt trăng sáng vào ban đêm."),
  mk("piano", "đàn piano", "🎹", "Starters", "I play piano on Sunday.", "Em chơi piano vào chủ nhật."),
  mk("queen", "nữ hoàng", "👸", "Starters", "The queen wears a crown.", "Nữ hoàng đội vương miện."),
  mk("smile", "nụ cười", "😊", "Starters", "Your smile is bright.", "Nụ cười của bạn thật rạng rỡ."),
  mk("toy", "đồ chơi", "🧸", "Starters", "I share my toys with friends.", "Em chia sẻ đồ chơi với bạn."),
  mk("yellow", "màu vàng", "💛", "Starters", "The sun is yellow.", "Mặt trời màu vàng."),
  mk("zoo", "sở thú", "🦁", "Starters", "We see lions at the zoo.", "Chúng em xem sư tử ở sở thú."),
  mk("snowman", "người tuyết", "⛄", "Starters", "We build a snowman.", "Chúng em đắp người tuyết."),
  mk("umbrella", "cái ô", "☂️", "Starters", "Take an umbrella, it's raining.", "Mang ô đi, trời đang mưa."),
  mk("violin", "đàn vĩ cầm", "🎻", "Starters", "She plays the violin softly.", "Bạn ấy chơi vĩ cầm nhẹ nhàng."),

  // ============ MOVERS ============
  mk("airport", "sân bay", "✈️", "Movers", "We arrive at the airport early.", "Chúng em đến sân bay sớm."),
  mk("bakery", "tiệm bánh", "🥐", "Movers", "The bakery smells lovely.", "Tiệm bánh thơm phức."),
  mk("castle", "lâu đài", "🏰", "Movers", "The castle is on a hill.", "Lâu đài trên ngọn đồi."),
  mk("dolphin", "cá heo", "🐬", "Movers", "Dolphins play in the sea.", "Cá heo chơi đùa dưới biển."),
  mk("elephant", "voi", "🐘", "Movers", "Elephants are very strong.", "Voi rất khoẻ."),
  mk("forest", "rừng", "🌲", "Movers", "Many animals live in the forest.", "Nhiều loài vật sống trong rừng."),
  mk("garden", "khu vườn", "🌷", "Movers", "Flowers bloom in the garden.", "Hoa nở trong vườn."),
  mk("helicopter", "trực thăng", "🚁", "Movers", "A helicopter flies low.", "Trực thăng bay thấp."),
  mk("island", "hòn đảo", "🏝️", "Movers", "The island has white sand.", "Hòn đảo có cát trắng."),
  mk("juice", "nước ép", "🧃", "Movers", "I drink orange juice every morning.", "Em uống nước cam mỗi sáng."),
  mk("knight", "hiệp sĩ", "🛡️", "Movers", "The knight is brave.", "Hiệp sĩ thật dũng cảm."),
  mk("library", "thư viện", "📚", "Movers", "We read at the library.", "Chúng em đọc sách ở thư viện."),
  mk("museum", "bảo tàng", "🏛️", "Movers", "The museum has old paintings.", "Bảo tàng có những bức tranh cổ."),
  mk("notebook", "sổ tay", "📓", "Movers", "Write in your notebook.", "Hãy viết vào sổ tay của em."),
  mk("octopus", "bạch tuộc", "🐙", "Movers", "An octopus is very smart.", "Bạch tuộc rất thông minh."),

  // ============ FLYERS ============
  mk("balcony", "ban công", "🌿", "Flyers", "I sit on the balcony.", "Em ngồi trên ban công."),
  mk("celebrate", "ăn mừng", "🎉", "Flyers", "We celebrate Tet together.", "Chúng em cùng ăn Tết."),
  mk("decoration", "đồ trang trí", "🎀", "Flyers", "Hang the decorations carefully.", "Hãy treo đồ trang trí cẩn thận."),
  mk("explore", "khám phá", "🧭", "Flyers", "Let's explore the forest.", "Hãy cùng khám phá khu rừng."),
  mk("freedom", "tự do", "🕊️", "Flyers", "Birds enjoy freedom.", "Chim chóc yêu thích sự tự do."),
  mk("gentle", "dịu dàng", "🌸", "Flyers", "She has a gentle voice.", "Bạn ấy có giọng nói dịu dàng."),
  mk("helmet", "mũ bảo hiểm", "⛑️", "Flyers", "Always wear a helmet on a bike.", "Luôn đội mũ bảo hiểm khi đi xe đạp."),
  mk("imagination", "trí tưởng tượng", "💭", "Flyers", "Children have great imagination.", "Trẻ em có trí tưởng tượng tuyệt vời."),
  mk("kindness", "lòng tốt", "💝", "Flyers", "Kindness makes the world better.", "Lòng tốt làm thế giới tốt đẹp hơn."),
  mk("landscape", "phong cảnh", "🏞️", "Flyers", "The landscape is beautiful.", "Phong cảnh thật đẹp."),
  mk("memory", "ký ức", "📷", "Flyers", "I have happy memories.", "Em có nhiều ký ức vui."),
  mk("ocean", "đại dương", "🌊", "Flyers", "The ocean is deep and blue.", "Đại dương sâu và xanh."),
  mk("planet", "hành tinh", "🪐", "Flyers", "Earth is our planet.", "Trái đất là hành tinh của chúng ta."),
  mk("rainbow", "cầu vồng", "🌈", "Flyers", "A rainbow appears after rain.", "Cầu vồng xuất hiện sau cơn mưa."),
  mk("treasure", "kho báu", "💰", "Flyers", "Pirates hide treasure.", "Hải tặc cất giấu kho báu."),

  // ============ KET ============
  mk("ambition", "hoài bão", "🎯", "KET", "She has big ambitions.", "Bạn ấy có hoài bão lớn."),
  mk("balance", "sự cân bằng", "⚖️", "KET", "Find a balance in life.", "Hãy tìm sự cân bằng trong cuộc sống."),
  mk("celebration", "lễ kỷ niệm", "🎊", "KET", "The celebration was lively.", "Lễ kỷ niệm rất sôi động."),
  mk("decision", "quyết định", "✅", "KET", "Make a wise decision.", "Hãy đưa ra quyết định khôn ngoan."),
  mk("environment", "môi trường", "🌍", "KET", "We protect the environment.", "Chúng em bảo vệ môi trường."),
  mk("freedom", "tự do", "🕊️", "KET", "Freedom is important.", "Tự do rất quan trọng."),
  mk("generation", "thế hệ", "👨‍👩‍👧‍👦", "KET", "Three generations live here.", "Ba thế hệ sống ở đây."),
  mk("highlight", "điểm nổi bật", "🌟", "KET", "That was the highlight of the trip.", "Đó là điểm nổi bật của chuyến đi."),
  mk("imagine", "tưởng tượng", "💭", "KET", "Imagine a peaceful world.", "Hãy tưởng tượng một thế giới yên bình."),
  mk("journey", "hành trình", "🗺️", "KET", "Life is a journey.", "Cuộc sống là một hành trình."),
  mk("knowledge", "kiến thức", "📖", "KET", "Knowledge is power.", "Kiến thức là sức mạnh."),
  mk("leadership", "khả năng lãnh đạo", "🚩", "KET", "Good leadership helps the team.", "Khả năng lãnh đạo tốt giúp đội nhóm."),
  mk("motivation", "động lực", "🔥", "KET", "Find your motivation.", "Hãy tìm động lực của mình."),
  mk("network", "mạng lưới", "🌐", "KET", "Build a strong network.", "Hãy xây dựng mạng lưới vững chắc."),
  mk("opinion", "ý kiến", "💬", "KET", "Share your opinion politely.", "Hãy chia sẻ ý kiến lịch sự."),

  // ============ PET ============
  mk("achieve", "đạt được", "🏆", "PET", "Work hard to achieve dreams.", "Hãy nỗ lực để đạt được ước mơ."),
  mk("brilliant", "xuất sắc", "✨", "PET", "Her idea is brilliant.", "Ý tưởng của bạn ấy xuất sắc."),
  mk("creative", "sáng tạo", "🎨", "PET", "Be creative every day.", "Hãy sáng tạo mỗi ngày."),
  mk("determine", "quyết tâm", "🎯", "PET", "She is determined to win.", "Bạn ấy quyết tâm chiến thắng."),
  mk("encourage", "khuyến khích", "👏", "PET", "Teachers encourage us.", "Thầy cô khuyến khích chúng em."),
  mk("flexible", "linh hoạt", "🤸", "PET", "Be flexible with your plan.", "Hãy linh hoạt với kế hoạch."),
  mk("grateful", "biết ơn", "🙏", "PET", "I am grateful to my parents.", "Em biết ơn bố mẹ."),
  mk("honest", "trung thực", "💎", "PET", "Always be honest.", "Hãy luôn trung thực."),
  mk("inspire", "truyền cảm hứng", "💡", "PET", "Books inspire me to learn.", "Sách truyền cảm hứng cho em học."),
  mk("journey", "hành trình", "🛤️", "PET", "Every journey has a beginning.", "Mỗi hành trình đều có khởi đầu."),
  mk("knowledge", "tri thức", "🧠", "PET", "Knowledge is a treasure.", "Tri thức là kho báu."),
  mk("leader", "người dẫn đầu", "👑", "PET", "A good leader listens.", "Người dẫn đầu giỏi biết lắng nghe."),
  mk("motivate", "truyền động lực", "🚀", "PET", "Coaches motivate athletes.", "Huấn luyện viên truyền động lực cho vận động viên."),
  mk("negotiate", "đàm phán", "🤝", "PET", "They negotiate a fair price.", "Họ đàm phán một mức giá công bằng."),
  mk("originality", "tính độc đáo", "🎭", "PET", "Her art shows originality.", "Tác phẩm của bạn ấy thể hiện tính độc đáo."),
];
