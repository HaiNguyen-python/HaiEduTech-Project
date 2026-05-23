// ============================================================
// HSK Vocabulary cleaning helpers
// Fixes systemic issues in auto-generated HSK 3.0 dataset:
//  - Strips polysemy digit suffixes from characters (本1, 会1 ...)
//  - Strips CC-CEDICT annotations from definitions
//  - Translates the most common English definitions into Vietnamese
//    when the VI field was leaked English text from CC-CEDICT.
// ============================================================
import type { HskWord } from "./types";

// ---- Strip noise annotations from CC-CEDICT english glosses ----
const stripAnnotations = (s: string): string => {
  if (!s) return s;
  let out = s;
  // Strip bracketed pinyin first: [pin1 yin1]
  out = out.replace(/\[[^\]]*\]/g, "");
  // Remove "see also X", "erhua variant of X", "old variant of X", "variant of X", "same as X"
  out = out.replace(/\b(see also|erhua variant of|old variant of|variant of|same as|see)\s+\S+/gi, "");
  // Remove parenthesised annotations: (...)
  out = out.replace(/\([^()]*\)/g, "");
  // Remove "CL:..." classifier hints up to ; or end
  out = out.replace(/\bCL:[^;]*;?/g, "");
  // Collapse stray punctuation/pipes/whitespace
  out = out.replace(/\s+/g, " ").replace(/\s*([;,])\s*/g, "$1 ").replace(/^[;,\s|]+|[;,\s|]+$/g, "");
  const parts = out.split(";").map(p => p.trim()).filter(Boolean);
  if (parts.length > 2) out = parts.slice(0, 2).join("; ");
  else out = parts.join("; ");
  return out.trim();
};

// Fallback when stripAnnotations returns empty (the whole gloss was annotation).
// Aggressively rewrite common HSK/CC-CEDICT noise into short readable text.
const lossyFallback = (s: string): string => {
  if (!s) return s;
  let out = s
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\b(erhua variant of|old variant of|variant of|same as|see also)\s+\S+/gi, "biến thể")
    .replace(/^\(prefix indicating[^)]*\)?/i, "tiền tố thứ tự")
    .replace(/^\(suffix[^)]*\)?/i, "hậu tố")
    .replace(/\bplural marker[^;,]*/i, "hậu tố số nhiều")
    .replace(/[()|"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return out.slice(0, 80);
};

// ---- Small EN→VI dictionary for the most common HSK-style glosses ----
// Keys are normalized: lowercase, "to " prefix stripped for verbs handled separately.
const COMMON_VERBS: Record<string, string> = {
  "read": "đọc", "read a book": "đọc sách", "read aloud": "đọc to", "write": "viết", "write down": "viết xuống",
  "speak": "nói", "say": "nói", "talk": "nói chuyện", "chat": "trò chuyện", "tell": "kể",
  "listen": "nghe", "hear": "nghe", "see": "thấy", "look": "nhìn", "watch": "xem", "view": "xem",
  "look at": "nhìn", "stare": "nhìn chằm chằm", "glance": "liếc nhìn", "observe": "quan sát",
  "eat": "ăn", "drink": "uống", "taste": "nếm", "swallow": "nuốt", "chew": "nhai",
  "buy": "mua", "sell": "bán", "pay": "trả tiền", "spend": "tiêu", "earn": "kiếm",
  "go": "đi", "come": "đến", "arrive": "đến nơi", "reach": "đến", "leave": "rời đi",
  "depart": "khởi hành", "return": "trở về", "go back": "trở lại", "walk": "đi bộ",
  "run": "chạy", "jump": "nhảy", "climb": "leo", "swim": "bơi",
  "drive": "lái xe", "drive a car": "lái xe", "ride": "đi (xe)", "fly": "bay", "sail": "đi thuyền",
  "sleep": "ngủ", "wake": "thức", "wake up": "thức dậy", "rest": "nghỉ ngơi", "relax": "thư giãn",
  "work": "làm việc", "study": "học", "learn": "học", "teach": "dạy", "train": "huấn luyện",
  "practice": "luyện tập", "review": "ôn tập", "memorize": "ghi nhớ",
  "ask": "hỏi", "answer": "trả lời", "reply": "trả lời", "respond": "phản hồi",
  "know": "biết", "understand": "hiểu", "realize": "nhận ra", "recognize": "nhận ra",
  "think": "nghĩ", "consider": "cân nhắc", "believe": "tin", "doubt": "nghi ngờ",
  "remember": "nhớ", "forget": "quên", "recall": "nhớ lại",
  "love": "yêu", "like": "thích", "enjoy": "thích thú", "hate": "ghét", "dislike": "không thích",
  "want": "muốn", "wish": "mong", "hope": "hy vọng", "need": "cần", "desire": "ao ước",
  "give": "cho", "take": "lấy", "send": "gửi", "deliver": "giao", "receive": "nhận",
  "accept": "chấp nhận", "bring": "mang", "carry": "mang", "hold": "cầm", "grasp": "nắm",
  "open": "mở", "close": "đóng", "shut": "đóng lại", "lock": "khoá", "unlock": "mở khoá",
  "start": "bắt đầu", "begin": "bắt đầu", "stop": "dừng", "pause": "tạm dừng",
  "end": "kết thúc", "finish": "hoàn thành", "complete": "hoàn tất", "continue": "tiếp tục",
  "wait": "đợi", "meet": "gặp", "see off": "tiễn", "welcome": "chào đón",
  "help": "giúp đỡ", "assist": "hỗ trợ", "support": "ủng hộ", "protect": "bảo vệ",
  "save": "cứu", "rescue": "giải cứu", "make": "làm", "do": "làm", "use": "dùng",
  "borrow": "mượn", "lend": "cho mượn", "return something": "trả lại",
  "find": "tìm thấy", "search": "tìm kiếm", "look for": "tìm", "discover": "phát hiện",
  "lose": "mất", "drop": "đánh rơi", "win": "thắng", "defeat": "đánh bại",
  "play": "chơi", "sing": "hát", "dance": "nhảy múa", "draw": "vẽ", "paint": "tô vẽ",
  "cook": "nấu ăn", "bake": "nướng", "fry": "chiên", "boil": "luộc",
  "wash": "rửa", "clean": "lau dọn", "tidy": "dọn dẹp", "sweep": "quét",
  "wear": "mặc", "put on": "mặc vào", "take off": "cởi ra", "dress": "ăn mặc",
  "sit": "ngồi", "stand": "đứng", "lie down": "nằm", "kneel": "quỳ",
  "live": "sống", "die": "chết", "be born": "sinh ra", "grow": "lớn lên",
  "grow up": "trưởng thành", "raise": "nuôi", "feed": "cho ăn",
  "change": "thay đổi", "become": "trở thành", "transform": "biến đổi",
  "feel": "cảm thấy", "look like": "trông giống", "seem": "có vẻ", "appear": "xuất hiện",
  "be called": "được gọi là", "introduce": "giới thiệu", "invite": "mời",
  "thank": "cảm ơn", "apologize": "xin lỗi", "agree": "đồng ý", "refuse": "từ chối",
  "accept invitation": "nhận lời", "decide": "quyết định", "choose": "chọn", "pick": "chọn",
  "compare": "so sánh", "exchange": "trao đổi", "trade": "trao đổi",
  "discuss": "thảo luận", "argue": "tranh luận", "debate": "tranh luận", "explain": "giải thích",
  "describe": "miêu tả", "express": "biểu đạt", "show": "chỉ ra", "demonstrate": "thể hiện",
  "drive a car (or train etc)": "lái xe", "go to class": "đi học", "go to school": "đi học",
  "touch": "chạm", "touch briefly": "chạm nhẹ", "tap": "gõ nhẹ", "knock": "gõ",
  "divide": "chia", "separate": "tách", "join": "tham gia", "combine": "kết hợp",
  "catch sight of": "trông thấy", "look up": "tra cứu", "search for": "tìm kiếm",
  "build": "xây dựng", "create": "tạo ra", "produce": "sản xuất", "design": "thiết kế",
  "develop": "phát triển", "improve": "cải thiện", "increase": "tăng", "decrease": "giảm",
  "rise": "lên", "fall": "rơi", "throw": "ném", "catch": "bắt", "kick": "đá",
  "hit": "đánh", "push": "đẩy", "pull": "kéo", "lift": "nâng", "drag": "kéo lê",
  "turn": "rẽ", "turn on": "bật", "turn off": "tắt", "press": "nhấn",
  "call": "gọi", "phone": "gọi điện", "ring": "rung", "shout": "hét", "whisper": "thì thầm",
  "smile": "cười", "laugh": "cười to", "cry": "khóc", "weep": "khóc",
  "fear": "sợ", "worry": "lo lắng", "miss": "nhớ", "long for": "khao khát",
  "promise": "hứa", "swear": "thề", "lie": "nói dối", "trust": "tin tưởng",
  "obey": "tuân theo", "respect": "tôn trọng", "admire": "ngưỡng mộ",
  "control": "kiểm soát", "manage": "quản lý", "lead": "dẫn dắt", "follow": "đi theo",
  "report": "báo cáo", "announce": "thông báo", "publish": "xuất bản",
  "translate": "dịch", "copy": "sao chép", "print": "in", "record": "ghi lại",
  "save file": "lưu", "delete": "xóa", "edit": "chỉnh sửa", "share": "chia sẻ",
  "borrow money": "vay tiền", "owe": "nợ", "pay back": "trả nợ",
  "celebrate": "ăn mừng", "congratulate": "chúc mừng", "praise": "khen ngợi",
  "criticize": "phê bình", "blame": "đổ lỗi", "punish": "trừng phạt", "forgive": "tha thứ",
  "fight": "đánh nhau", "quarrel": "cãi nhau", "compete": "cạnh tranh", "cooperate": "hợp tác",
  "be": "là", "to be": "là", "have": "có", "exist": "tồn tại", "happen": "xảy ra",
  "occur": "xảy ra", "appear in": "xuất hiện trong", "disappear": "biến mất",
  "rain": "mưa", "snow": "tuyết rơi", "blow": "thổi", "shine": "chiếu sáng",
};

const COMMON_NOUNS: Record<string, string> = {
  "time": "thời gian", "day": "ngày", "year": "năm", "month": "tháng", "week": "tuần",
  "hour": "giờ", "minute": "phút", "second": "giây", "moment": "khoảnh khắc",
  "morning": "buổi sáng", "noon": "buổi trưa", "afternoon": "buổi chiều",
  "evening": "buổi tối", "night": "đêm", "midnight": "nửa đêm",
  "today": "hôm nay", "tomorrow": "ngày mai", "yesterday": "hôm qua",
  "weekend": "cuối tuần", "weekday": "ngày thường", "holiday": "ngày lễ",
  "spring": "mùa xuân", "summer": "mùa hè", "autumn": "mùa thu", "winter": "mùa đông",
  "people": "người", "person": "người", "human": "con người", "man": "đàn ông",
  "woman": "phụ nữ", "boy": "con trai", "girl": "con gái", "adult": "người lớn",
  "child": "trẻ em", "baby": "em bé", "kid": "đứa trẻ", "youth": "thanh niên",
  "friend": "bạn", "classmate": "bạn cùng lớp", "colleague": "đồng nghiệp",
  "neighbor": "hàng xóm", "stranger": "người lạ", "guest": "khách",
  "family": "gia đình", "parent": "phụ huynh", "father": "bố", "mother": "mẹ",
  "dad": "ba", "mom": "má", "brother": "anh trai", "sister": "chị gái",
  "son": "con trai", "daughter": "con gái", "husband": "chồng", "wife": "vợ",
  "grandfather": "ông", "grandmother": "bà", "uncle": "chú", "aunt": "cô",
  "cousin": "anh chị em họ", "relative": "người thân",
  "school": "trường học", "university": "đại học", "college": "cao đẳng",
  "classroom": "lớp học", "library": "thư viện", "office": "văn phòng",
  "teacher": "giáo viên", "professor": "giáo sư", "student": "học sinh",
  "class": "lớp", "lesson": "bài học", "course": "khoá học", "homework": "bài tập",
  "exam": "kỳ thi", "test": "bài kiểm tra", "grade": "điểm", "score": "điểm số",
  "book": "sách", "notebook": "vở", "textbook": "sách giáo khoa",
  "pen": "bút", "pencil": "bút chì", "paper": "giấy", "ruler": "thước",
  "desk": "bàn", "chair": "ghế", "bed": "giường", "sofa": "ghế sa lông",
  "house": "nhà", "home": "nhà", "apartment": "căn hộ", "room": "phòng",
  "bedroom": "phòng ngủ", "kitchen": "nhà bếp", "bathroom": "phòng tắm",
  "door": "cửa", "window": "cửa sổ", "wall": "tường", "floor": "sàn", "ceiling": "trần",
  "garden": "vườn", "yard": "sân",
  "city": "thành phố", "town": "thị trấn", "village": "làng", "country": "đất nước",
  "nation": "quốc gia", "world": "thế giới", "earth": "trái đất",
  "road": "đường", "street": "phố", "highway": "đường cao tốc", "bridge": "cầu",
  "station": "ga", "airport": "sân bay", "port": "cảng",
  "car": "xe hơi", "bus": "xe buýt", "truck": "xe tải", "bicycle": "xe đạp",
  "motorcycle": "xe máy", "train": "tàu hỏa", "subway": "tàu điện ngầm",
  "plane": "máy bay", "ship": "tàu thủy", "boat": "thuyền",
  "water": "nước", "fire": "lửa", "air": "không khí", "wind": "gió",
  "snow noun": "tuyết", "ice": "băng", "cloud": "mây", "sky": "bầu trời",
  "sun": "mặt trời", "moon": "mặt trăng", "star": "ngôi sao",
  "mountain": "núi", "hill": "đồi", "river": "sông", "lake": "hồ", "sea": "biển",
  "ocean": "đại dương", "forest": "rừng", "field": "cánh đồng", "land": "đất",
  "food": "thức ăn", "meal": "bữa ăn", "breakfast": "bữa sáng",
  "lunch": "bữa trưa", "dinner": "bữa tối", "snack": "đồ ăn vặt",
  "rice": "cơm", "bread": "bánh mì", "noodle": "mì", "meat": "thịt",
  "egg": "trứng", "vegetable": "rau", "fruit": "trái cây", "soup": "súp",
  "tea": "trà", "coffee": "cà phê", "milk": "sữa", "juice": "nước ép",
  "wine": "rượu vang", "beer": "bia", "alcohol": "rượu",
  "money": "tiền", "cash": "tiền mặt", "coin": "đồng xu", "bill": "hoá đơn",
  "price": "giá", "cost": "chi phí", "salary": "lương", "wage": "tiền công",
  "work": "công việc", "job": "việc làm", "career": "sự nghiệp", "profession": "nghề",
  "company": "công ty", "factory": "nhà máy", "shop": "cửa hàng", "store": "cửa hàng",
  "market": "chợ", "supermarket": "siêu thị", "restaurant": "nhà hàng",
  "hotel": "khách sạn", "bank": "ngân hàng", "post office": "bưu điện",
  "name": "tên", "word": "từ", "sentence": "câu", "language": "ngôn ngữ",
  "letter": "chữ", "character": "chữ", "page": "trang", "chapter": "chương",
  "story": "câu chuyện", "news": "tin tức", "information": "thông tin",
  "question": "câu hỏi", "answer noun": "câu trả lời", "problem": "vấn đề",
  "color": "màu sắc", "shape": "hình dạng", "size": "kích thước",
  "flower": "hoa", "tree": "cây", "grass": "cỏ", "leaf": "lá",
  "animal": "động vật", "dog": "chó", "cat": "mèo", "bird": "chim", "horse": "ngựa",
  "pig": "lợn", "cow": "bò", "sheep": "cừu", "chicken": "gà",
  "side": "phía", "back": "phía sau", "front": "phía trước",
  "left": "bên trái", "right": "bên phải", "top": "trên", "bottom": "dưới",
  "middle": "giữa", "center": "trung tâm", "edge": "mép", "corner": "góc",
  "scene": "cảnh", "place": "nơi", "location": "vị trí",
  "illness": "bệnh", "disease": "căn bệnh", "pain": "cơn đau", "fever": "sốt",
  "doctor": "bác sĩ", "nurse": "y tá", "patient": "bệnh nhân",
  "hospital": "bệnh viện", "clinic": "phòng khám", "medicine": "thuốc",
  "country; nation; state": "đất nước",
  "thing": "đồ vật", "object": "đồ vật", "stuff": "đồ đạc",
  "matter": "việc", "issue": "vấn đề", "topic": "chủ đề", "subject": "chủ đề",
  "idea": "ý tưởng", "thought": "suy nghĩ", "opinion": "ý kiến", "plan": "kế hoạch",
  "way": "cách", "method": "phương pháp", "reason": "lý do", "result": "kết quả",
  "effect": "ảnh hưởng", "purpose": "mục đích", "goal": "mục tiêu",
  "feeling": "cảm xúc", "emotion": "cảm xúc", "mood": "tâm trạng",
  "health": "sức khỏe", "life": "cuộc sống", "death": "cái chết",
  "friendship": "tình bạn", "happiness": "hạnh phúc",
  "music": "âm nhạc", "song": "bài hát", "movie": "phim", "film": "phim",
  "tv": "tivi", "television": "truyền hình", "radio": "đài", "computer": "máy tính",
  "internet": "mạng internet", "email": "thư điện tử",
  "clothes": "quần áo", "shirt": "áo sơ mi", "pants": "quần", "shoes": "giày",
  "hat": "mũ", "bag": "túi",
};

const COMMON_ADJ_OTHER: Record<string, string> = {
  "good": "tốt", "bad": "xấu", "great": "tuyệt", "terrible": "tệ",
  "big": "to", "large": "lớn", "huge": "khổng lồ", "small": "nhỏ", "tiny": "nhỏ xíu",
  "many": "nhiều", "much": "nhiều", "few": "ít", "little": "ít",
  "high": "cao", "low": "thấp", "tall": "cao", "long": "dài", "short": "ngắn",
  "wide": "rộng", "narrow": "hẹp", "thick": "dày", "thin": "mỏng",
  "deep": "sâu", "shallow": "nông", "heavy": "nặng", "light": "nhẹ",
  "new": "mới", "old": "cũ", "young": "trẻ", "ancient": "cổ xưa",
  "fast": "nhanh", "quick": "nhanh", "slow": "chậm",
  "hot": "nóng", "cold": "lạnh", "warm": "ấm", "cool": "mát",
  "wet": "ướt", "dry": "khô", "clean adj": "sạch", "dirty": "bẩn",
  "happy": "vui", "glad": "mừng", "sad": "buồn", "angry": "tức giận", "mad": "giận",
  "tired": "mệt", "sleepy": "buồn ngủ", "hungry": "đói", "thirsty": "khát",
  "full": "no", "empty": "trống", "busy": "bận", "free": "rảnh",
  "beautiful": "đẹp", "pretty": "xinh", "handsome": "đẹp trai", "ugly": "xấu",
  "easy": "dễ", "simple": "đơn giản", "difficult": "khó", "hard": "khó",
  "right adj": "đúng", "correct": "chính xác", "wrong": "sai", "false": "sai",
  "true": "thật", "real": "thật", "fake": "giả",
  "important": "quan trọng", "necessary": "cần thiết", "useful": "hữu ích",
  "useless": "vô dụng", "interesting": "thú vị", "boring": "nhàm chán",
  "funny": "vui nhộn", "serious": "nghiêm túc", "strange": "lạ",
  "common": "phổ biến", "rare": "hiếm", "normal": "bình thường", "special": "đặc biệt",
  "safe": "an toàn", "dangerous": "nguy hiểm", "strong": "mạnh", "weak": "yếu",
  "rich": "giàu", "poor": "nghèo", "cheap": "rẻ", "expensive": "đắt",
  "easy to use": "dễ dùng", "delicious": "ngon", "tasty": "ngon",
  "really": "thực sự", "very": "rất", "very; really": "rất", "extremely": "cực kỳ",
  "everywhere": "khắp nơi", "anywhere": "bất cứ đâu", "somewhere": "đâu đó",
  "always": "luôn luôn", "often": "thường", "sometimes": "đôi khi",
  "usually": "thường xuyên", "rarely": "hiếm khi", "never": "không bao giờ",
  "now": "bây giờ", "later": "sau", "soon": "sớm", "early": "sớm",
  "good-looking": "đẹp", "nice-looking": "ưa nhìn", "pleasant to hear": "dễ nghe",
  "careless": "bất cẩn", "careful": "cẩn thận", "polite": "lịch sự",
  "kind": "tử tế", "friendly": "thân thiện", "honest": "trung thực",
  "lazy": "lười", "diligent": "siêng năng", "smart": "thông minh", "clever": "khéo léo",
  "stupid": "ngu ngốc", "and": "và", "or": "hoặc", "but": "nhưng",
  "together with": "cùng với", "with": "với", "without": "không có",
  "inside": "bên trong", "outside": "bên ngoài", "above": "trên", "below": "dưới",
  "near": "gần", "far": "xa", "here": "ở đây", "there": "ở đó",
  "how much": "bao nhiêu", "how many": "bao nhiêu", "item": "cái",
  "this year": "năm nay", "next year": "năm sau", "last year": "năm ngoái",
  "this": "này", "that": "đó", "these": "những cái này", "those": "những cái đó",
  "all": "tất cả", "every": "mỗi", "each": "mỗi", "some": "vài", "any": "bất kỳ",
  "none": "không có", "other": "khác", "another": "khác", "same": "giống",
  "different": "khác nhau", "similar": "tương tự",
};

const LOOKUP = { ...COMMON_VERBS, ...COMMON_NOUNS, ...COMMON_ADJ_OTHER };

const translateEnToVi = (en: string): string | null => {
  if (!en) return null;
  const cleaned = en.trim().toLowerCase();
  // Direct match
  if (LOOKUP[cleaned]) return LOOKUP[cleaned];
  // Match "to X" verbs
  if (cleaned.startsWith("to ")) {
    const verb = cleaned.slice(3);
    if (COMMON_VERBS[verb]) return COMMON_VERBS[verb];
  }
  // Single-word fallback
  const firstSense = cleaned.split(/[;,]/)[0].trim().replace(/^to\s+/, "");
  if (LOOKUP[firstSense]) return LOOKUP[firstSense];
  return null;
};

// ---- Already-Vietnamese detector ----
const VI_DIACRITIC = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
const looksVietnamese = (s: string) => {
  if (!s) return false;
  if (VI_DIACRITIC.test(s)) return true;
  // Short ASCII may still be Vietnamese (e.g. "ban", "nha"); treat <= 12 chars w/o english function words as VN
  if (s.length <= 12 && !/\b(the|a|an|of|and|to|with|for|in|on|or)\b/i.test(s)) return true;
  return false;
};

// ---- Main cleaner ----
export function cleanHskWord(w: HskWord): HskWord {
  // 1. Strip polysemy digit suffixes from character (本1 → 本)
  const character = w.character.replace(/\d+$/, "");

  // 2. Clean definitions
  const enRaw = w.definition?.en || "";
  const viRaw = w.definition?.vi || "";
  // For EN: stripped version is always better; only keep raw if stripping nukes everything.
  const enStripped = stripAnnotations(enRaw);
  const enClean = enStripped || lossyFallback(enRaw);

  let viClean: string;
  if (looksVietnamese(viRaw) && viRaw !== enRaw) {
    viClean = viRaw.trim();
  } else {
    const viStripped = stripAnnotations(viRaw);
    const translated = translateEnToVi(viStripped || enClean);
    viClean = translated || viStripped || enClean || lossyFallback(viRaw);
  }

  // 3. Pinyin cleanup: 'shú/shóu' → 'shú'
  const pinyin = (w.pinyin || "").split("/")[0].trim();

  return {
    ...w,
    character,
    pinyin,
    definition: {
      vi: viClean || w.definition?.vi || "",
      en: enClean || w.definition?.en || "",
    },
  };
}
