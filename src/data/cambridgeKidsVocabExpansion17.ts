/**
 * @file cambridgeKidsVocabExpansion17.ts
 * @description Expansion 17 — broadens fruit/food, clothes, school, sports,
 * animals, jobs, nature & tech categories per level. All entries audited
 * unique vs the existing deduped master set (no intra-level duplicates).
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;
const mk = (
  word: string, vi: string, emoji: string, level: CambridgeKidsLevel,
  example: string, exampleVi: string
): W => ({ word, vi, emoji, level, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_EXPANSION_17: W[] = [
  // ===== STARTERS — Food =====
  mk("pancake", "bánh kếp", "🥞", "Starters", "I eat a pancake with honey.", "Em ăn bánh kếp với mật ong."),
  mk("popcorn", "bỏng ngô", "🍿", "Starters", "Popcorn is yummy at the cinema.", "Bỏng ngô rất ngon ở rạp phim."),
  mk("ham", "thịt nguội", "🥓", "Starters", "I have ham in my sandwich.", "Em có thịt nguội trong bánh mì."),
  mk("taco", "bánh taco", "🌮", "Starters", "I love a cheesy taco.", "Em thích bánh taco có phô mai."),
  mk("dumpling", "há cảo", "🥟", "Starters", "Grandma makes tasty dumplings.", "Bà làm há cảo ngon."),

  // ===== STARTERS — Clothes =====
  mk("boot", "ủng", "🥾", "Starters", "I wear boots in the rain.", "Em đi ủng khi trời mưa."),
  mk("tie", "cà vạt", "👔", "Starters", "Dad wears a blue tie.", "Bố đeo cà vạt màu xanh."),

  // ===== STARTERS — Animals =====
  mk("wolf", "con sói", "🐺", "Starters", "The grey wolf is in the forest.", "Con sói xám ở trong rừng."),
  mk("koala", "gấu túi", "🐨", "Starters", "A koala hugs the tree.", "Gấu túi ôm cái cây."),

  // ===== STARTERS — School =====
  mk("chalk", "phấn", "🟦", "Starters", "The teacher writes with chalk.", "Cô giáo viết bằng phấn."),
  mk("schoolbag", "cặp sách", "🎒", "Starters", "My schoolbag is heavy today.", "Hôm nay cặp em nặng."),

  // ===== MOVERS — Food =====
  mk("pineapple", "quả dứa", "🍍", "Movers", "Pineapple juice is sweet and cool.", "Nước dứa ngọt và mát."),
  mk("raspberry", "phúc bồn tử", "🍒", "Movers", "Raspberries are red and tiny.", "Phúc bồn tử đỏ và bé."),
  mk("pumpkin", "bí ngô", "🎃", "Movers", "We make a pumpkin lantern.", "Chúng em làm đèn bí ngô."),
  mk("broccoli", "súp lơ xanh", "🥦", "Movers", "Broccoli helps us grow strong.", "Súp lơ giúp ta lớn khoẻ."),
  mk("spinach", "rau bina", "🥬", "Movers", "Spinach makes Popeye strong.", "Rau bina làm Popeye khoẻ."),
  mk("yoghurt", "sữa chua", "🥣", "Movers", "I eat yoghurt after dinner.", "Em ăn sữa chua sau bữa tối."),
  mk("doughnut", "bánh donut", "🍩", "Movers", "A pink doughnut for me, please!", "Cho em một cái donut hồng nhé!"),
  mk("muffin", "bánh muffin", "🧁", "Movers", "Mum bakes blueberry muffins.", "Mẹ làm bánh muffin việt quất."),
  mk("pretzel", "bánh pretzel", "🥨", "Movers", "We share a salty pretzel.", "Chúng em chia một cái pretzel mặn."),
  mk("baguette", "bánh mì baguette", "🥖", "Movers", "A baguette is long and crusty.", "Bánh baguette dài và giòn."),

  // ===== MOVERS — Clothes =====
  mk("trousers", "quần dài", "👖", "Movers", "He wears blue trousers.", "Anh ấy mặc quần xanh."),
  mk("collar", "cổ áo", "👕", "Movers", "My shirt has a white collar.", "Áo em có cổ trắng."),
  mk("apron", "tạp dề", "🥻", "Movers", "The chef wears a clean apron.", "Đầu bếp đeo tạp dề sạch."),

  // ===== MOVERS — Sports =====
  mk("volleyball", "bóng chuyền", "🏐", "Movers", "We play volleyball on the beach.", "Chúng em chơi bóng chuyền trên biển."),
  mk("basketball", "bóng rổ", "🏀", "Movers", "He shoots a basketball hoop.", "Anh ấy ném bóng vào rổ."),
  mk("baseball", "bóng chày", "⚾", "Movers", "Baseball is popular in the US.", "Bóng chày phổ biến ở Mỹ."),
  mk("tennis", "quần vợt", "🎾", "Movers", "I play tennis on Saturday.", "Em chơi quần vợt thứ Bảy."),
  mk("skating", "trượt băng", "⛸️", "Movers", "We go skating in winter.", "Mùa đông chúng em đi trượt băng."),
  mk("skiing", "trượt tuyết", "⛷️", "Movers", "Skiing on snow is fun.", "Trượt tuyết rất vui."),
  mk("jogging", "chạy bộ", "🏃‍♀️", "Movers", "Mum goes jogging in the park.", "Mẹ đi chạy bộ ở công viên."),

  // ===== MOVERS — Music =====
  mk("flute", "sáo", "🪈", "Movers", "She plays the flute beautifully.", "Cô ấy thổi sáo hay lắm."),
  mk("xylophone", "đàn mộc cầm", "🎶", "Movers", "I tap the colourful xylophone.", "Em gõ đàn mộc cầm nhiều màu."),
  mk("tambourine", "trống lục lạc", "🪘", "Movers", "Shake the tambourine to the song.", "Lắc trống lục lạc theo bài hát."),
  mk("harmonica", "kèn harmonica", "🎼", "Movers", "Grandpa plays the harmonica.", "Ông chơi kèn harmonica."),

  // ===== MOVERS — Animals =====
  mk("rhino", "tê giác", "🦏", "Movers", "A rhino has a strong horn.", "Tê giác có sừng cứng."),
  mk("hippo", "hà mã", "🦛", "Movers", "Hippos love water and mud.", "Hà mã thích nước và bùn."),
  mk("cheetah", "báo gêpa", "🐆", "Movers", "A cheetah runs the fastest.", "Báo gêpa chạy nhanh nhất."),
  mk("crane", "chim sếu", "🦩", "Movers", "Cranes fly in a long line.", "Sếu bay thành hàng dài."),

  // ===== MOVERS — School supplies =====
  mk("whiteboard", "bảng trắng", "📋", "Movers", "She draws on the whiteboard.", "Cô viết trên bảng trắng."),
  mk("calculator", "máy tính bỏ túi", "🧮", "Movers", "I use a calculator for maths.", "Em dùng máy tính cho môn Toán."),
  mk("notepad", "sổ tay nhỏ", "🗒️", "Movers", "I write ideas in my notepad.", "Em ghi ý tưởng vào sổ tay."),
  mk("sticker", "miếng dán", "🌟", "Movers", "I get a star sticker.", "Em được một miếng dán ngôi sao."),
  mk("bookmark", "đánh dấu trang", "🔖", "Movers", "I use a bookmark in my book.", "Em dùng cái đánh dấu trang."),

  // ===== FLYERS — Food =====
  mk("sushi", "sushi", "🍣", "Flyers", "Sushi is a famous Japanese dish.", "Sushi là món Nhật nổi tiếng."),
  mk("lasagna", "mì lasagna", "🍝", "Flyers", "Mum bakes cheesy lasagna.", "Mẹ làm mì lasagna phô mai."),
  mk("burrito", "bánh burrito", "🌯", "Flyers", "A burrito is wrapped in a tortilla.", "Bánh burrito được cuộn trong vỏ."),
  mk("steak", "bít tết", "🥩", "Flyers", "Dad orders a juicy steak.", "Bố gọi một miếng bít tết."),

  // ===== FLYERS — Health & body =====
  mk("toothbrush", "bàn chải đánh răng", "🪥", "Flyers", "Brush your teeth with a toothbrush.", "Đánh răng bằng bàn chải."),
  mk("toothpaste", "kem đánh răng", "🧴", "Flyers", "Squeeze a little toothpaste.", "Bóp một ít kem đánh răng."),
  mk("shampoo", "dầu gội", "🧴", "Flyers", "I wash my hair with shampoo.", "Em gội đầu bằng dầu gội."),
  mk("thermometer", "nhiệt kế", "🌡️", "Flyers", "The thermometer shows my fever.", "Nhiệt kế cho thấy em sốt."),
  mk("bandage", "băng gạc", "🩹", "Flyers", "She puts a bandage on my knee.", "Cô dán băng vào đầu gối em."),
  mk("vitamin", "vitamin", "💊", "Flyers", "I take a vitamin every morning.", "Em uống vitamin mỗi sáng."),

  // ===== FLYERS — Jobs =====
  mk("plumber", "thợ ống nước", "🪠", "Flyers", "The plumber fixed the sink.", "Thợ ống nước đã sửa bồn rửa."),
  mk("electrician", "thợ điện", "💡", "Flyers", "An electrician repairs the lights.", "Thợ điện sửa đèn."),
  mk("barber", "thợ cắt tóc", "💈", "Flyers", "The barber cuts dad's hair.", "Thợ cắt tóc cắt tóc cho bố."),
  mk("tailor", "thợ may", "🧵", "Flyers", "A tailor sews a new suit.", "Thợ may may bộ vest mới."),
  mk("designer", "nhà thiết kế", "🎨", "Flyers", "My aunt is a fashion designer.", "Dì em là nhà thiết kế thời trang."),

  // ===== FLYERS — Animals (sea / land) =====
  mk("alligator", "cá sấu mõm ngắn", "🐊", "Flyers", "An alligator swims slowly.", "Cá sấu bơi chậm."),
  mk("chimpanzee", "tinh tinh", "🐒", "Flyers", "Chimpanzees use simple tools.", "Tinh tinh biết dùng dụng cụ."),
  mk("salmon", "cá hồi", "🐟", "Flyers", "Salmon is pink and tasty.", "Cá hồi màu hồng và ngon."),
  mk("squid", "mực ống", "🦑", "Flyers", "A squid has long arms.", "Mực ống có nhiều tay dài."),
  mk("oyster", "hàu", "🦪", "Flyers", "Some oysters hide a pearl.", "Một số con hàu giấu ngọc trai."),
  mk("flute-fish", "cá thổi", "🐠", "Flyers", "Reef fish swim in colourful groups.", "Cá rạn bơi thành đàn nhiều màu."),

  // ===== FLYERS — Nature =====
  mk("volcano", "núi lửa", "🌋", "Flyers", "A volcano can shoot hot lava.", "Núi lửa có thể phun dung nham."),
  mk("waterfall", "thác nước", "💦", "Flyers", "The waterfall is very loud.", "Thác nước rất ồn."),
  mk("glacier", "sông băng", "🧊", "Flyers", "A glacier moves very slowly.", "Sông băng di chuyển rất chậm."),
  mk("canyon", "hẻm núi", "🏞️", "Flyers", "The Grand Canyon is huge.", "Grand Canyon rất rộng lớn."),
  mk("dune", "đụn cát", "🏜️", "Flyers", "Camels walk over the dunes.", "Lạc đà đi qua các đụn cát."),

  // ===== KET — Tech =====
  mk("software", "phần mềm", "🧩", "KET", "We install new software at school.", "Chúng em cài phần mềm mới ở trường."),
  mk("hardware", "phần cứng", "🖱️", "KET", "Computer hardware can be upgraded.", "Phần cứng máy tính có thể nâng cấp."),
  mk("monitor", "màn hình", "🖥️", "KET", "My monitor is large and clear.", "Màn hình của em to và rõ."),
  mk("keyboard", "bàn phím", "⌨️", "KET", "Type your name on the keyboard.", "Gõ tên bạn trên bàn phím."),
  mk("printer", "máy in", "🖨️", "KET", "The printer ran out of ink.", "Máy in hết mực rồi."),
  mk("scanner", "máy quét", "📠", "KET", "We scan papers with a scanner.", "Chúng em quét giấy bằng máy quét."),
  mk("router", "bộ định tuyến", "📡", "KET", "Restart the router if wifi is slow.", "Khởi động lại router nếu wifi chậm."),
  mk("password", "mật khẩu", "🔐", "KET", "Choose a strong password.", "Hãy chọn mật khẩu mạnh."),
  mk("username", "tên đăng nhập", "🆔", "KET", "Type your username to log in.", "Nhập tên đăng nhập để vào."),
  mk("inbox", "hộp thư đến", "📥", "KET", "Check your inbox for the message.", "Kiểm tra hộp thư cho tin nhắn."),
  mk("spam", "thư rác", "🚫", "KET", "Delete the spam emails.", "Hãy xoá các thư rác."),
  mk("vlog", "vlog", "🎥", "KET", "She films a travel vlog.", "Cô ấy quay vlog du lịch."),

  // ===== KET — Jobs & places =====
  mk("cashier", "thu ngân", "💵", "KET", "The cashier is very friendly.", "Cô thu ngân rất thân thiện."),
  mk("mechanic", "thợ máy", "🔧", "KET", "A mechanic fixes our car.", "Thợ máy sửa xe của chúng em."),
  mk("pier", "cầu tàu", "⚓", "KET", "We walked along the wooden pier.", "Chúng em đi dọc cầu tàu gỗ."),
  mk("windmill", "cối xay gió", "🌬️", "KET", "A windmill spins in the wind.", "Cối xay gió quay theo gió."),
  mk("cabin", "căn nhà gỗ", "🏚️", "KET", "We stayed in a forest cabin.", "Chúng em ở trong căn nhà gỗ trong rừng."),
  mk("igloo", "lều băng", "🏔️", "KET", "An igloo is made of ice blocks.", "Lều băng làm từ các khối băng."),

  // ===== KET — Cooking =====
  mk("omelette", "trứng tráng", "🍳", "KET", "She makes a fluffy omelette.", "Cô ấy làm trứng tráng xốp."),
  mk("cereal", "ngũ cốc", "🥣", "KET", "Cereal with milk is my breakfast.", "Bữa sáng của em là ngũ cốc với sữa."),
  mk("waffle", "bánh waffle", "🧇", "KET", "I love waffles with maple syrup.", "Em thích bánh waffle với siro."),
  mk("ribs", "sườn", "🍖", "KET", "Grilled ribs taste amazing.", "Sườn nướng rất ngon."),

  // ===== PET — Abstract / academic =====
  mk("hardware-store", "cửa hàng đồ kim khí", "🏬", "PET", "We buy nails at the hardware store.", "Chúng em mua đinh ở cửa hàng đồ kim khí."),
  mk("startup", "công ty khởi nghiệp", "🚀", "PET", "She founded a green tech startup.", "Cô ấy lập công ty khởi nghiệp công nghệ xanh."),
  mk("portfolio", "hồ sơ năng lực", "📁", "PET", "Designers build a strong portfolio.", "Nhà thiết kế xây dựng hồ sơ năng lực."),
  mk("internship", "thực tập", "🧑‍💼", "PET", "He got a summer internship.", "Anh ấy được nhận thực tập hè."),
  mk("freelancer", "người làm tự do", "💻", "PET", "A freelancer chooses their own hours.", "Người làm tự do tự chọn giờ làm."),
  mk("dashboard", "bảng điều khiển", "📊", "PET", "The dashboard shows live data.", "Bảng điều khiển hiển thị dữ liệu trực tiếp."),
  mk("subscription", "gói đăng ký", "💳", "PET", "Cancel any unused subscription.", "Huỷ gói đăng ký không dùng."),
  mk("workshop", "buổi hội thảo", "🛠️", "PET", "We joined a coding workshop.", "Chúng em tham gia hội thảo lập trình."),
  mk("podcast-host", "người dẫn podcast", "🎙️", "PET", "The podcast host interviews scientists.", "Người dẫn podcast phỏng vấn nhà khoa học."),
  mk("crowdfunding", "gây quỹ cộng đồng", "🤝", "PET", "They use crowdfunding for the film.", "Họ dùng gây quỹ cộng đồng cho phim."),
  mk("renewable", "tái tạo (năng lượng)", "♻️", "PET", "Solar power is renewable energy.", "Năng lượng mặt trời là năng lượng tái tạo."),
  mk("biodegradable", "phân huỷ sinh học", "🌱", "PET", "This bag is biodegradable.", "Túi này có thể phân huỷ sinh học."),
  mk("carbon", "carbon", "🌫️", "PET", "We must reduce carbon emissions.", "Chúng ta phải giảm khí thải carbon."),
  mk("habitat", "môi trường sống", "🌳", "PET", "Pandas need a bamboo habitat.", "Gấu trúc cần môi trường sống có tre."),
  mk("species", "loài", "🐾", "PET", "Many species are endangered.", "Nhiều loài đang gặp nguy hiểm."),
  mk("biodiversity", "đa dạng sinh học", "🦋", "PET", "Forests protect biodiversity.", "Rừng bảo vệ đa dạng sinh học."),
  mk("sustainable", "bền vững", "🌿", "PET", "Choose sustainable materials.", "Hãy chọn vật liệu bền vững."),
  mk("renewable-energy", "năng lượng tái tạo", "⚡", "PET", "Wind is renewable energy.", "Gió là năng lượng tái tạo."),
];
