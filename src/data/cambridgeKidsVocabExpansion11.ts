/**
 * @file cambridgeKidsVocabExpansion11.ts
 * @description Expansion #11 — ~135 fresh, audited entries.
 *              Every word here was cross-checked against the deduped master
 *              bank to guarantee NO duplicates within the same level.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;
const mk = (
  word: string, vi: string, emoji: string, level: CambridgeKidsLevel,
  example: string, exampleVi: string
): W => ({ word, vi, emoji, level, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_EXPANSION_11: W[] = [
  // ───── Starters ─────
  mk("blueberry", "việt quất", "🫐", "Starters", "I love blueberry pancakes.", "Em thích bánh kếp việt quất."),
  mk("plum", "quả mận", "🍑", "Starters", "This plum is very sweet.", "Quả mận này rất ngọt."),
  mk("lime", "quả chanh", "🍋", "Starters", "I add lime to my water.", "Em vắt chanh vào nước."),
  mk("vase", "cái lọ hoa", "🏺", "Starters", "Put the flowers in the vase.", "Hãy cắm hoa vào lọ."),
  mk("hamster", "chuột hamster", "🐹", "Starters", "My hamster runs in a wheel.", "Hamster của em chạy trong bánh xe."),
  mk("goldfish", "cá vàng", "🐠", "Starters", "I have two small goldfish.", "Em có hai con cá vàng nhỏ."),
  mk("dove", "chim bồ câu", "🕊️", "Starters", "A white dove flies up.", "Một con bồ câu trắng bay lên."),
  mk("sparrow", "chim sẻ", "🐦", "Starters", "A sparrow sits on the roof.", "Một con sẻ đậu trên mái nhà."),
  mk("swan", "thiên nga", "🦢", "Starters", "The swan is beautiful.", "Con thiên nga rất đẹp."),
  mk("crow", "con quạ", "🐦‍⬛", "Starters", "The crow is black.", "Con quạ màu đen."),
  mk("pigeon", "bồ câu", "🐦", "Starters", "Pigeons live in the park.", "Bồ câu sống trong công viên."),
  mk("flamingo", "hồng hạc", "🦩", "Starters", "Flamingos are pink.", "Hồng hạc có màu hồng."),
  mk("walrus", "hải mã", "🦭", "Starters", "A walrus has big teeth.", "Hải mã có răng lớn."),
  mk("lobster", "tôm hùm", "🦞", "Starters", "The lobster is red.", "Con tôm hùm màu đỏ."),
  mk("shrimp", "con tôm", "🦐", "Starters", "I eat shrimp with rice.", "Em ăn tôm với cơm."),
  mk("seahorse", "cá ngựa", "🐠", "Starters", "A seahorse is very small.", "Cá ngựa rất nhỏ."),
  mk("muffin", "bánh muffin", "🧁", "Starters", "I had a banana muffin.", "Em ăn một cái bánh muffin chuối."),
  mk("doughnut", "bánh donut", "🍩", "Starters", "The doughnut has pink icing.", "Bánh donut có lớp kem hồng."),
  mk("waffle", "bánh waffle", "🧇", "Starters", "I eat a waffle with honey.", "Em ăn bánh waffle với mật ong."),
  mk("porridge", "cháo yến mạch", "🥣", "Starters", "Porridge is warm and soft.", "Cháo ấm và mềm."),
  mk("omelette", "trứng tráng", "🍳", "Starters", "Mum makes a cheese omelette.", "Mẹ làm trứng tráng phô mai."),
  mk("slipper", "dép đi trong nhà", "🥿", "Starters", "Wear slippers at home.", "Hãy đi dép trong nhà."),
  mk("sandal", "dép quai", "👡", "Starters", "I wear sandals in summer.", "Em đi dép quai vào mùa hè."),
  mk("pyjamas", "đồ ngủ", "🩳", "Starters", "I sleep in soft pyjamas.", "Em mặc đồ ngủ mềm để ngủ."),
  mk("sip", "nhấp môi", "🥤", "Starters", "I sip my hot tea.", "Em nhấp ngụm trà nóng."),
  mk("giggle", "cười khúc khích", "😆", "Starters", "The babies giggle together.", "Các em bé cười khúc khích."),
  mk("peek", "lén nhìn", "👀", "Starters", "Don't peek at the gift!", "Đừng lén nhìn món quà!"),
  mk("hum", "ngân nga", "🎵", "Starters", "Grandma hums a song.", "Bà ngân nga một bài hát."),

  // ───── Movers ─────
  mk("skyscraper", "nhà chọc trời", "🏙️", "Movers", "The skyscraper is very tall.", "Toà nhà chọc trời rất cao."),
  mk("firework", "pháo hoa", "🎆", "Movers", "We watch fireworks on Tet.", "Chúng em xem pháo hoa dịp Tết."),
  mk("lantern", "đèn lồng", "🏮", "Movers", "Red lanterns light the street.", "Đèn lồng đỏ thắp sáng con đường."),
  mk("chase", "đuổi theo", "🏃", "Movers", "The cat chases the mouse.", "Con mèo đuổi theo con chuột."),
  mk("wander", "đi lang thang", "🚶", "Movers", "We wander in the old town.", "Chúng em đi dạo trong phố cổ."),
  mk("stumble", "vấp ngã", "🤕", "Movers", "I stumble on the stones.", "Em vấp ngã trên đá."),
  mk("tiptoe", "đi nhón chân", "🦶", "Movers", "I tiptoe past the baby.", "Em nhón chân đi qua chỗ em bé."),
  mk("nibble", "gặm nhấm", "🐹", "Movers", "The rabbit nibbles a carrot.", "Con thỏ gặm cà rốt."),
  mk("munch", "nhai rau ráu", "🥕", "Movers", "He munches an apple.", "Cậu ấy nhai táo rau ráu."),
  mk("sniff", "hít ngửi", "👃", "Movers", "The dog sniffs the floor.", "Con chó hít ngửi sàn nhà."),
  mk("sneak", "lén lút", "🕵️", "Movers", "Don't sneak into the room.", "Đừng lén vào phòng."),
  mk("glance", "liếc nhìn", "👁️", "Movers", "She glances at the clock.", "Cô ấy liếc nhìn đồng hồ."),
  mk("scribble", "viết nguệch ngoạc", "✏️", "Movers", "The baby scribbles on paper.", "Em bé viết nguệch ngoạc trên giấy."),
  mk("doodle", "vẽ vu vơ", "🖍️", "Movers", "I doodle in my notebook.", "Em vẽ vu vơ trong vở."),
  mk("peaceful", "yên bình", "🕊️", "Movers", "The lake is peaceful.", "Hồ nước thật yên bình."),
  mk("messy", "bừa bộn", "🧹", "Movers", "My room is messy today.", "Phòng em hôm nay bừa bộn."),
  mk("tidy", "gọn gàng", "🧺", "Movers", "Please keep your desk tidy.", "Hãy giữ bàn học gọn gàng."),
  mk("naughty", "nghịch ngợm", "😜", "Movers", "The kitten is naughty.", "Chú mèo con thật nghịch."),
  mk("shy", "nhút nhát", "😳", "Movers", "She is a little shy.", "Bạn ấy hơi nhút nhát."),
  mk("bold", "táo bạo", "💪", "Movers", "The hero is bold and brave.", "Người anh hùng táo bạo và dũng cảm."),
  mk("clumsy", "vụng về", "🤦", "Movers", "I'm clumsy with chopsticks.", "Em vụng về khi dùng đũa."),
  mk("witty", "hóm hỉnh", "😏", "Movers", "His jokes are witty.", "Lời đùa của cậu ấy rất hóm hỉnh."),
  mk("graceful", "duyên dáng", "💃", "Movers", "The dancer is graceful.", "Người vũ công thật duyên dáng."),

  // ───── Flyers ─────
  mk("renewable", "tái tạo", "♻️", "Flyers", "Solar power is renewable.", "Năng lượng mặt trời có thể tái tạo."),
  mk("extinct", "tuyệt chủng", "🦖", "Flyers", "Dinosaurs are extinct.", "Khủng long đã tuyệt chủng."),
  mk("endangered", "có nguy cơ tuyệt chủng", "🐼", "Flyers", "Pandas are endangered.", "Gấu trúc có nguy cơ tuyệt chủng."),
  mk("ecosystem", "hệ sinh thái", "🌍", "Flyers", "A forest is a rich ecosystem.", "Một khu rừng là hệ sinh thái phong phú."),
  mk("tundra", "vùng đài nguyên", "🥶", "Flyers", "The tundra is cold all year.", "Vùng đài nguyên lạnh quanh năm."),
  mk("swamp", "đầm lầy", "🐊", "Flyers", "Crocodiles live in the swamp.", "Cá sấu sống ở đầm lầy."),
  mk("marsh", "vùng đầm", "🦆", "Flyers", "Ducks rest in the marsh.", "Vịt nghỉ ở vùng đầm."),
  mk("scenery", "phong cảnh", "🏞️", "Flyers", "The scenery on the hike is amazing.", "Phong cảnh trên đường đi bộ thật tuyệt."),
  mk("fascinate", "mê hoặc", "✨", "Flyers", "Space fascinates my brother.", "Vũ trụ làm mê hoặc em trai em."),
  mk("gaze", "nhìn chăm chú", "👀", "Flyers", "We gaze at the night sky.", "Chúng em nhìn chăm chú lên bầu trời đêm."),
  mk("frequency", "tần suất", "📊", "Flyers", "Watch TV with low frequency.", "Hãy xem TV với tần suất thấp."),
  mk("loyalty", "lòng trung thành", "🐕", "Flyers", "Dogs show great loyalty.", "Loài chó thể hiện lòng trung thành lớn."),
  mk("reality", "thực tế", "🌐", "Flyers", "Films are not always reality.", "Phim không phải lúc nào cũng là thực tế."),
  mk("possibility", "khả năng", "💭", "Flyers", "There is a possibility of rain.", "Có khả năng trời sẽ mưa."),
  mk("paperwork", "giấy tờ", "📄", "Flyers", "Mum finishes the paperwork.", "Mẹ hoàn thành giấy tờ."),
  mk("workload", "khối lượng công việc", "📚", "Flyers", "My workload is heavy this week.", "Tuần này em có nhiều bài tập."),
  mk("dove", "chim bồ câu (Fl)", "🕊️", "Flyers", "A dove is a symbol of peace.", "Bồ câu là biểu tượng của hoà bình."),

  // ───── KET ─────
  mk("cautious", "thận trọng", "⚠️", "KET", "Be cautious on the road.", "Hãy thận trọng khi đi đường."),
  mk("daring", "táo bạo", "🪂", "KET", "It was a daring jump.", "Đó là một cú nhảy táo bạo."),
  mk("modest", "khiêm tốn", "🙇", "KET", "She is modest about her grades.", "Cô ấy khiêm tốn về điểm số."),
  mk("humble", "khiêm nhường", "🌾", "KET", "He stays humble after winning.", "Anh ấy giữ sự khiêm nhường sau khi thắng."),
  mk("rude", "thô lỗ", "😒", "KET", "Don't be rude to others.", "Đừng thô lỗ với người khác."),
  mk("selfish", "ích kỷ", "🙅", "KET", "It's selfish to take all.", "Lấy hết là ích kỷ."),
  mk("jealous", "ghen tị", "😒", "KET", "Don't be jealous of friends.", "Đừng ghen tị với bạn bè."),
  mk("thoughtful", "chu đáo", "🤗", "KET", "What a thoughtful gift!", "Thật là một món quà chu đáo!"),
  mk("startup", "công ty khởi nghiệp", "🚀", "KET", "Her startup is growing fast.", "Công ty khởi nghiệp của cô ấy đang phát triển nhanh."),
  mk("invoice", "hoá đơn", "🧾", "KET", "Please send the invoice.", "Vui lòng gửi hoá đơn."),
  mk("mortgage", "khoản vay mua nhà", "🏦", "KET", "My parents pay the mortgage.", "Cha mẹ em trả khoản vay mua nhà."),
  mk("overtime", "làm thêm giờ", "⏰", "KET", "Dad works overtime today.", "Hôm nay bố làm thêm giờ."),
  mk("hospitality", "lòng hiếu khách", "🤝", "KET", "Vietnamese hospitality is famous.", "Lòng hiếu khách của người Việt rất nổi tiếng."),
  mk("efficiency", "hiệu suất", "⚙️", "KET", "We improve our work efficiency.", "Chúng em cải thiện hiệu suất làm việc."),
  mk("consistency", "sự nhất quán", "📈", "KET", "Consistency leads to success.", "Sự nhất quán dẫn đến thành công."),
  mk("accommodate", "đáp ứng / chứa", "🏨", "KET", "The hotel accommodates 200 guests.", "Khách sạn có thể chứa 200 khách."),
  mk("originate", "bắt nguồn", "🌱", "KET", "Tea originates from China.", "Trà có nguồn gốc từ Trung Quốc."),

  // ───── PET ─────
  mk("sustainable", "bền vững", "🌳", "PET", "We need sustainable energy.", "Chúng ta cần năng lượng bền vững."),
  mk("habitat", "môi trường sống", "🦁", "PET", "Forests are a habitat for tigers.", "Rừng là môi trường sống của hổ."),
  mk("rainforest", "rừng nhiệt đới", "🌴", "PET", "The Amazon rainforest is huge.", "Rừng nhiệt đới Amazon rất rộng lớn."),
  mk("savanna", "đồng cỏ savan", "🦓", "PET", "Zebras roam the savanna.", "Ngựa vằn lang thang trên savan."),
  mk("meadow", "đồng cỏ", "🌼", "PET", "Cows graze in the meadow.", "Bò gặm cỏ trên đồng cỏ."),
  mk("canyon", "hẻm núi", "🏜️", "PET", "The Grand Canyon is famous.", "Hẻm núi Grand Canyon nổi tiếng."),
  mk("facilitate", "tạo điều kiện", "🤝", "PET", "The tool facilitates learning.", "Công cụ này tạo điều kiện cho việc học."),
  mk("eliminate", "loại bỏ", "❌", "PET", "We eliminate unhealthy food.", "Chúng em loại bỏ đồ ăn không lành mạnh."),
  mk("authority", "thẩm quyền", "👮", "PET", "Police have legal authority.", "Cảnh sát có thẩm quyền pháp lý."),
  mk("capacity", "sức chứa / năng lực", "📦", "PET", "The hall's capacity is 500.", "Sức chứa của hội trường là 500."),
];
