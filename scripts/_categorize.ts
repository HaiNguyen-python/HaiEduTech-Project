/**
 * Auto-categorize "Other" Cambridge YLE vocabulary words.
 * Uses Vietnamese-meaning + English-word heuristics in priority order.
 * Output is appended to cambridgeKidsCategories.ts as add(...) calls.
 */
import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "../src/data/cambridgeKidsVocabMaster";
import { getCategory, type KidsCategory } from "../src/data/cambridgeKidsCategories";

type Cat = KidsCategory;

// Rule definitions: each rule has (test) and assigned category.
// Order matters — first match wins.
const has = (s: string, ...needles: string[]) => needles.some(n => s.includes(n));

function classify(word: string, vi: string): Cat | null {
  const w = word.toLowerCase();
  const v = vi.toLowerCase();

  // ANIMALS — Vietnamese animal markers
  if (has(v, "con ", "động vật", "loài ", "chim ", "cá ", "côn trùng", "thú ", "gia súc", "gia cầm")) return "Animals";
  if (has(v, "mèo con", "chuột ", "khỉ ", "ngựa ", "voi ", "sư tử", "hổ ", "gấu", "thỏ ", "rắn", "ếch", "chuồn", "bướm", "ong ", "kiến ", "muỗi", "nhện", "ốc", "cua", "tôm", "sò", "mực ", "bạch tuộc")) return "Animals";
  if (/^(baby |kitten|puppy)/.test(w)) return "Animals";

  // FOOD & DRINK
  if (has(v, "bánh ", "thịt ", "rau ", "quả ", "trái ", "nước ép", "sữa", "kẹo", "gia vị", "món ", "đồ ăn", "thức uống", "thức ăn", "ngũ cốc", "rượu", "bia", "cà phê", "trà ", "súp", "cháo", "đậu ", "hạt ", "sô-cô-la", "chocolate", "mứt", "dầu ăn", "đường", "muối", "tiêu", "giấm", "bột ", "bơ ", "phô mai", "trứng", "kem ", "đồ uống", "đồ ngọt", "nước sốt", "nước chấm", "vỏ trái")) return "Food & Drink";
  if (has(v, "vị giác", "vị ngọt", "vị mặn", "vị chua", "vị cay", "vị đắng", "ngon ", "nướng", "luộc", "chiên", "xào ", "hầm", "nấu", "đun sôi")) return "Food & Drink";

  // BODY / HEALTH / FEELINGS
  if (has(v, "cơ thể", "bộ phận cơ thể", "đau ", "bệnh", "viêm", "vết ", "sưng ", "chấn thương", "máu", "tim mạch", "tế bào", "vi rút", "vi khuẩn", "thuốc ", "phòng khám", "bệnh viện", "y tế", "y khoa", "sức khoẻ", "sức khỏe", "giấc ngủ", "ngủ ", "tỉnh táo", "khoẻ ", "khỏe ", "ốm", "mệt", "cảm cúm", "sốt ", "ho ", "hắt hơi", "nôn", "buồn nôn", "đói ", "khát ", "no ", "đầy bụng", "dị ứng", "hen suyễn", "huyết áp", "tiểu đường", "miễn dịch")) return "Body, Health & Feelings";
  // feelings (cảm xúc)
  if (has(v, "cảm xúc", "vui ", "buồn ", "giận ", "tức ", "sợ ", "lo ", "hồi hộp", "ngạc nhiên", "ngượng", "xấu hổ", "tự hào", "tự tin", "ghen ", "yêu thương", "thất vọng", "chán ", "phấn khích", "hạnh phúc", "đau khổ", "hối tiếc", "tiếc nuối", "cô đơn", "bồn chồn", "căng thẳng", "stress", "thoải mái", "thư giãn", "bình tĩnh", "an ủi", "đồng cảm", "trắc ẩn", "biết ơn", "lạc quan", "bi quan", "tâm trạng", "tâm trạng", "thái độ", "tính cách", "sự kiên nhẫn", "kiên nhẫn")) return "Body, Health & Feelings";

  // PEOPLE & JOBS
  if (has(v, "người ", "nhà ", "thợ ", "kỹ sư", "bác sĩ", "y tá", "giáo viên", "học sinh", "sinh viên", "luật sư", "kiến trúc sư", "lập trình viên", "ca sĩ", "diễn viên", "vũ công", "nghệ sĩ", "doanh nhân", "công nhân", "nông dân", "nhân viên", "khách hàng", "tổng thống", "chính trị gia", "vua ", "nữ hoàng", "hoàng tử", "công chúa", "vận động viên", "cảnh sát", "lính ", "binh sĩ", "tu sĩ", "linh mục", "phi công", "thuỷ thủ", "phóng viên", "biên tập", "nhà báo", "nhà văn", "tác giả", "huấn luyện viên", "trọng tài", "đại sứ", "thị trưởng", "tướng", "thẩm phán", "nhà khoa học", "nhà nghiên cứu", "nhà thiết kế", "đầu bếp", "bồi bàn", "tài xế", "thợ máy", "thợ điện", "thợ xây", "thợ mộc", "thợ cắt tóc", "thợ may", "thợ hàn")) return "People & Jobs";
  if (has(v, "trẻ ", "trẻ em", "thiếu niên", "vị thành niên", "người lớn", "thanh niên", "cha ", "mẹ ", "anh ", "chị ", "em ", "bạn ", "đồng nghiệp", "hàng xóm", "khách ", "công dân", "tổ tiên", "họ hàng", "gia đình", "tị nạn", "người dân", "dân số", "thành viên")) return "People & Jobs";

  // HOME & CLOTHES
  if (has(v, "đồ nội thất", "nội thất", "phòng ", "nhà bếp", "phòng tắm", "phòng ngủ", "phòng khách", "tủ ", "giường", "ghế ", "bàn ", "đèn ", "cửa ", "cửa sổ", "rèm", "thảm ", "khăn ", "chăn", "gối ", "nến ", "bình hoa", "lọ hoa", "ấm trà", "bát ", "đĩa ", "thìa", "đũa", "chén", "ly ", "cốc ", "nồi ", "chảo ", "bếp ", "tủ lạnh", "máy giặt", "máy hút bụi", "máy nướng", "kem đánh răng", "bàn chải", "xà phòng", "khăn giấy", "khăn lau")) return "Home & Clothes";
  if (has(v, "áo ", "quần ", "váy ", "giày ", "dép ", "nón ", "mũ ", "khăn quàng", "thắt lưng", "găng tay", "ủng ", "nhẫn ", "vòng cổ", "bông tai", "vòng tay", "khuy", "khoá kéo", "khóa kéo", "ruy băng", "đồng phục", "đồ ngủ", "tất ", "vớ", "kính ", "đồng hồ đeo")) return "Home & Clothes";

  // SCHOOL & STATIONERY
  if (has(v, "trường ", "lớp ", "học ", "bài tập", "bài kiểm tra", "thi ", "câu hỏi", "câu trả lời", "sách ", "vở ", "giấy ", "bút ", "thước ", "tẩy", "phấn ", "bảng đen", "bảng trắng", "bút chì", "bút mực", "tập vở", "thư viện", "giáo dục", "khóa học", "khoá học", "giáo trình", "giảng viên", "sinh viên", "học bổng", "học phí", "bài giảng", "bài luận", "đề thi", "kỳ học", "học kỳ", "niên khoá")) return "School & Stationery";

  // NATURE & WEATHER
  if (has(v, "thời tiết", "khí hậu", "mưa ", "tuyết ", "nắng ", "gió ", "bão ", "sấm ", "chớp ", "sét ", "lốc ", "lụt", "sương ", "mù ", "ẩm", "nhiệt độ", "trời ", "bầu trời", "mây ", "mặt trời", "mặt trăng", "ngôi sao", "vũ trụ", "thiên nhiên", "rừng ", "biển ", "đại dương", "sông ", "suối ", "hồ ", "núi ", "đồi ", "đồng cỏ", "thung lũng", "sa mạc", "đầm lầy", "thác ", "vực ", "đảo ", "vịnh ", "đá ", "cát ", "đất ", "cây ", "hoa ", "lá ", "cỏ ", "thực vật", "sinh thái", "môi trường", "đa dạng sinh học", "ozone", "hiệu ứng nhà kính", "ô nhiễm", "carbon", "nhiên liệu", "năng lượng", "tài nguyên thiên nhiên", "khoáng sản", "địa chất", "thiên văn", "thuỷ triều", "sóng biển", "vùng cực", "băng ", "bụi ", "bùn", "ánh sáng", "tia ", "lửa ", "khói ", "tuyết ")) return "Nature & Weather";

  // PLACES, TRANSPORT & TRAVEL
  if (has(v, "thành phố", "thị trấn", "làng ", "quốc gia", "đất nước", "vùng ", "khu ", "địa điểm", "địa phương", "thủ đô", "phố ", "đường ", "ngõ ", "quảng trường", "công viên", "sân bay", "ga ", "bến ", "cảng", "khách sạn", "nhà hàng", "quán ", "tiệm ", "siêu thị", "chợ ", "trung tâm thương mại", "rạp ", "nhà thờ", "lâu đài", "bảo tàng", "viện ", "thư viện", "đại học", "trạm ", "kênh đào", "đường hầm", "cây cầu", "cầu ", "tháp ", "tượng đài", "kim tự tháp", "hang động", "khu vườn", "vườn nho", "vườn ươm", "trang trại", "đại lý", "trụ sở", "đại sứ quán")) return "Places, Transport & Travel";
  if (has(v, "xe ", "máy bay", "tàu ", "thuyền ", "tàu hoả", "tàu thuỷ", "tàu điện", "tàu vũ trụ", "tên lửa", "xe đạp", "xe máy", "xe buýt", "xe tải", "xe hơi", "ô tô", "trực thăng", "phương tiện", "giao thông", "lộ trình", "đường cao tốc", "đường sắt", "đường bộ", "đường thuỷ", "vé ", "hành lý", "vali")) return "Places, Transport & Travel";
  if (has(v, "du lịch", "du khách", "chuyến đi", "hành trình", "tham quan", "kỳ nghỉ", "nghỉ dưỡng", "hộ chiếu", "thị thực", "visa", "thẻ lên máy bay", "bưu thiếp", "lưu niệm", "lễ hội", "diễu hành", "khám phá", "thám hiểm", "phiêu lưu", "chỗ ở", "đặt phòng", "đặt chỗ", "cẩm nang du lịch", "bản đồ", "la bàn")) return "Places, Transport & Travel";

  // SPORTS, HOBBIES & MUSIC
  if (has(v, "thể thao", "vận động", "bóng đá", "bóng rổ", "bóng chuyền", "bóng chày", "tennis", "quần vợt", "cầu lông", "bơi lội", "chạy bộ", "đạp xe", "leo núi", "trượt tuyết", "trượt băng", "võ thuật", "karate", "judo", "taekwondo", "boxing", "đấu vật", "đua xe", "đua ngựa", "marathon", "giải đấu", "đối thủ", "đội ", "huy chương", "cúp ", "trận đấu", "cuộc thi", "khán giả", "cổ vũ", "khởi động", "tập luyện", "thể dục", "yoga")) return "Sports, Hobbies & Music";
  if (has(v, "âm nhạc", "nhạc cụ", "ca khúc", "bài hát", "giai điệu", "guitar", "piano", "violin", "trống ", "kèn ", "sáo ", "đàn ", "ban nhạc", "dàn nhạc", "hòa nhạc", "buổi hòa nhạc", "ca sĩ", "nhạc sĩ", "nhạc trưởng", "soạn nhạc", "hát ", "vũ điệu", "khiêu vũ", "múa ", "sở thích", "trò chơi", "đồ chơi", "cờ vua", "cờ ", "câu cá", "cắm trại", "vẽ ", "tô màu", "đan ", "thêu ", "nhiếp ảnh", "chụp ảnh", "diều ", "đu quay", "xích đu", "cầu trượt", "đan lát", "thủ công")) return "Sports, Hobbies & Music";

  // TECHNOLOGY
  if (has(v, "máy ", "máy tính", "điện thoại", "phần mềm", "phần cứng", "ứng dụng", "trình duyệt", "internet", "wifi", "bluetooth", "trang web", "website", "mạng ", "mạng xã hội", "mã ", "mật khẩu", "tài khoản", "tin nhắn", "thông báo điện tử", "robot", "tự động hoá", "trí tuệ nhân tạo", "máy học", "học máy", "công nghệ", "kỹ thuật số", "dữ liệu", "an ninh mạng", "mã hoá", "blockchain", "vệ tinh", "tên lửa", "thiết bị", "máy ảnh", "máy quay", "máy chiếu", "máy in", "máy quét", "loa ", "tai nghe", "bàn phím", "chuột máy tính", "màn hình", "ổ cứng", "usb", "pin ", "sạc ", "cáp ", "ổ cắm", "bóng đèn", "đèn led", "đèn pin", "ti vi", "ti-vi", "tivi", "radio", "podcast", "phát sóng", "kênh truyền hình", "lập trình", "thuật toán", "thư rác", "spam", "hộp thư", "email", "video ", "âm thanh ", "kỹ thuật số")) return "Technology";

  // TIME / NUMBERS / COLORS / SHAPES
  if (has(v, "thời gian", "giờ ", "phút ", "giây ", "ngày ", "tuần ", "tháng ", "năm ", "thế kỷ", "thập kỷ", "thời đại", "kỷ nguyên", "sáng ", "trưa ", "chiều ", "tối ", "đêm ", "buổi ", "sớm ", "muộn ", "trễ ", "đầu năm", "cuối năm", "quá khứ", "hiện tại", "tương lai", "lịch ", "lịch trình", "lịch sử", "hôm nay", "hôm qua", "hôm sau", "ngày mai", "thường xuyên", "hằng ngày", "hằng tuần", "hằng tháng", "hằng năm", "định kỳ")) return "Time, Numbers, Colors & Shapes";
  if (has(v, "số ", "phép cộng", "phép trừ", "phép nhân", "phép chia", "hàng nghìn", "hàng triệu", "tỷ", "phân số", "thập phân", "phần tư", "phần ba", "nửa ", "đôi ", "tá ", "dãy số")) return "Time, Numbers, Colors & Shapes";
  if (has(v, "màu ", "màu sắc", "sắc ", "đỏ ", "xanh ", "vàng ", "tím ", "hồng ", "đen ", "trắng ", "nâu ", "xám ", "bạc ", "vàng kim", "hình vuông", "hình tròn", "hình tam giác", "hình chữ nhật", "hình thoi", "hình bầu dục", "hình ngũ giác", "hình lục giác", "hình dạng", "hình khối")) return "Time, Numbers, Colors & Shapes";

  // ACTIONS (Verbs)
  // common Vietnamese verb starters & infinitive markers
  if (/^(làm|làm cho|đi |đến |về |ra |vào |bước |chạy |nhảy |bay |bơi |trèo |leo |bò |cúi |đứng |ngồi |nằm |ngủ |dậy |thức |nhìn |xem |ngắm |quan sát |nghe |nói |hát |đọc |viết |vẽ |tô |kể |hỏi |trả lời |gọi |gửi |nhận |cho |lấy |đưa |mua |bán |trao đổi |thuê |mượn |trả |chia sẻ |giúp |bảo vệ |che chở |bao bọc |giữ |nắm |cầm |bưng |bê |kéo |đẩy |ném |vứt |xé |cắt |dán |gắn |buộc |cột |mở |đóng |khoá |bật |tắt |bắt đầu |kết thúc |hoàn thành |dừng |dừng lại |tiếp tục |thử |cố gắng |luyện tập |học |dạy |giải thích |mô tả |giới thiệu |kể về |so sánh |phân tích |tổng hợp |đánh giá |kiểm tra |sửa |sửa chữa |sửa đổi |thay đổi |cải thiện |tăng |giảm |bớt |thêm |nhân |chia |cộng |trừ |tính |đếm |đo |cân |chứng minh |phủ nhận |bác bỏ |chấp nhận |từ chối |đồng ý |không đồng ý |tranh luận |tranh cãi |đàm phán |thương lượng |thuyết phục |khuyên |cảnh báo |nhắc nhở |hứa |cam kết |thề |thông báo |loan tin |tuyên bố |khẳng định |xác nhận |phủ định )/.test(v)) return "Actions (Verbs)";
  if (/^(làm khổ|làm bối rối|làm dịu|làm phiền|làm rõ|làm sạch|làm hỏng|làm hư|làm nóng|làm lạnh|làm mới|làm nhẹ|làm nản|làm ngạc nhiên|làm xấu hổ|làm ô nhiễm|làm suy thoái)/.test(v)) return "Actions (Verbs)";
  // English -ate, -ise/ize, -ify verbs not assigned yet
  if (/^[a-z]+(ate|ise|ize|ify|ish|ute|orb|end|ave|ear|eep|ake|ade|ame|art|eat|eet|est|ush|ust|elt|old|own|ide|ode|une|ide)$/.test(w) && /^(t|đ|c|s|p|n|m|l|k|h|g|v|b|r|q|x|y|ư|ô|ơ|ê|â)/.test(v) && (v.startsWith("t") || v.startsWith("đ") || v.startsWith("c") || v.startsWith("ph") || v.startsWith("nh") || v.startsWith("th") || v.startsWith("kh") || v.startsWith("h") || v.startsWith("b") || v.startsWith("ng") || v.startsWith("gi")) && !has(v, "sự ", "tính ", "việc ", "người ", "đồ ", "máy ", "cái ", "con ", "nhà ", "tầng ", "ngôi ")) {
    // skip nouns — keep only verbs by exclusion above
  }

  // DESCRIPTIONS (Adjectives) — Vietnamese descriptor markers
  if (/^(rất |hơi |khá |quá |đầy |hoàn toàn |thuộc |có )/.test(v)) return "Descriptions (Adjectives)";
  if (has(v, "đẹp ", "xấu ", "tốt ", "tệ ", "lớn ", "nhỏ ", "to ", "bé ", "cao ", "thấp ", "dài ", "ngắn ", "rộng ", "hẹp ", "dày ", "mỏng ", "nặng ", "nhẹ ", "nhanh ", "chậm ", "nóng ", "lạnh ", "ấm ", "mát ", "ướt ", "khô ", "sạch ", "bẩn ", "mới ", "cũ ", "trẻ ", "già ", "mạnh ", "yếu ", "đầy đủ", "trống rỗng", "đắt ", "rẻ ", "đông ", "vắng ", "an toàn", "nguy hiểm", "dễ ", "khó ", "đơn giản", "phức tạp", "quan trọng", "cần thiết", "hữu ích", "vô ích", "hiệu quả", "thông minh", "ngu ngốc", "ngu si", "hài hước", "buồn chán", "thú vị", "hấp dẫn", "kỳ lạ", "lạ ", "quen ", "phổ biến", "hiếm ", "thường ", "đặc biệt", "thông thường", "trang trọng", "thân mật", "lịch sự", "thô lỗ", "ngọt ", "mặn ", "chua ", "đắng ", "cay ", "tươi ", "ôi ")) return "Descriptions (Adjectives)";

  // Fallback by English suffix
  if (/(?:ous|ful|less|able|ible|ive|ish|al|ic|ical|ary|ory|ant|ent)$/.test(w)) return "Descriptions (Adjectives)";
  if (/(?:ly)$/.test(w) && !w.endsWith("ily")) return "Descriptions (Adjectives)";
  if (/(?:ion|sion|tion|ment|ness|ity|ence|ance|ism|ship|hood|dom|cy)$/.test(w)) return "Concepts & Society" as Cat;
  if (/(?:ate|ise|ize|ify)$/.test(w)) return "Actions (Verbs)";

  return null;
}

// Build additions map
const additions: Partial<Record<Cat, string[]>> = {};
let unassigned: string[] = [];

for (const w of CAMBRIDGE_KIDS_WORDS_DEDUPED) {
  if (getCategory(w.word) !== "Other") continue;
  const c = classify(w.word, w.vi);
  if (c) {
    (additions[c] ||= []).push(w.word);
  } else {
    unassigned.push(`${w.word} | ${w.vi}`);
  }
}

// Print summary
console.log("=== ADDITIONS PER CATEGORY ===");
for (const [cat, list] of Object.entries(additions)) {
  console.log(`\n// ${cat}: ${list!.length}`);
  console.log(`add("${cat}", [`);
  for (let i = 0; i < list!.length; i += 10) {
    console.log("  " + list!.slice(i, i + 10).map(s => `"${s}"`).join(",") + ",");
  }
  console.log("]);");
}

console.log(`\n=== UNASSIGNED: ${unassigned.length} ===`);
console.log(unassigned.join("\n"));
