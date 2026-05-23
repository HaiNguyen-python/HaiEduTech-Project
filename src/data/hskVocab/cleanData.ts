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

// Fallback when the entire gloss was an annotation. Keep words, drop punctuation.
const lossyFallback = (s: string): string => {
  if (!s) return s;
  return s.replace(/\[[^\]]*\]/g, "").replace(/[()|"']/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
};

// ---- Small EN→VI dictionary for the most common HSK-style glosses ----
// Keys are normalized: lowercase, "to " prefix stripped for verbs handled separately.
const COMMON_VERBS: Record<string, string> = {
  "read": "đọc", "read a book": "đọc sách", "write": "viết", "speak": "nói", "say": "nói",
  "listen": "nghe", "hear": "nghe", "see": "thấy", "look": "nhìn", "watch": "xem",
  "eat": "ăn", "drink": "uống", "buy": "mua", "sell": "bán", "go": "đi", "come": "đến",
  "arrive": "đến", "leave": "rời đi", "return": "trở về", "walk": "đi bộ", "run": "chạy",
  "drive": "lái xe", "drive a car": "lái xe", "ride": "đi (xe)", "fly": "bay",
  "sleep": "ngủ", "wake up": "thức dậy", "rest": "nghỉ", "work": "làm việc", "study": "học",
  "learn": "học", "teach": "dạy", "ask": "hỏi", "answer": "trả lời", "know": "biết",
  "understand": "hiểu", "think": "nghĩ", "remember": "nhớ", "forget": "quên",
  "love": "yêu", "like": "thích", "hate": "ghét", "want": "muốn", "need": "cần",
  "give": "cho", "take": "lấy", "send": "gửi", "receive": "nhận", "bring": "mang",
  "carry": "mang", "open": "mở", "close": "đóng", "start": "bắt đầu", "begin": "bắt đầu",
  "stop": "dừng", "end": "kết thúc", "finish": "hoàn thành", "wait": "đợi",
  "meet": "gặp", "help": "giúp đỡ", "make": "làm", "do": "làm", "use": "dùng",
  "find": "tìm", "look for": "tìm", "lose": "mất", "win": "thắng", "play": "chơi",
  "sing": "hát", "dance": "nhảy múa", "draw": "vẽ", "paint": "vẽ", "cook": "nấu ăn",
  "wash": "rửa", "clean": "lau dọn", "wear": "mặc", "put on": "mặc vào",
  "take off": "cởi", "sit": "ngồi", "stand": "đứng", "lie down": "nằm",
  "live": "sống", "die": "chết", "be born": "sinh ra", "grow": "lớn lên",
  "change": "thay đổi", "become": "trở thành", "feel": "cảm thấy", "look like": "trông giống",
  "be called": "được gọi là", "introduce": "giới thiệu", "invite": "mời",
  "thank": "cảm ơn", "apologize": "xin lỗi", "agree": "đồng ý", "refuse": "từ chối",
  "decide": "quyết định", "choose": "chọn", "compare": "so sánh", "exchange": "trao đổi",
  "discuss": "thảo luận", "argue": "tranh luận", "explain": "giải thích",
  "drive a car (or train etc)": "lái xe", "go to class": "đi học", "go to school": "đi học",
  "touch briefly": "chạm nhẹ", "tap": "gõ nhẹ", "divide": "chia", "separate": "tách",
  "catch sight of": "trông thấy",
};

const COMMON_NOUNS: Record<string, string> = {
  "time": "thời gian", "day": "ngày", "year": "năm", "month": "tháng", "week": "tuần",
  "morning": "buổi sáng", "afternoon": "buổi chiều", "evening": "buổi tối", "night": "đêm",
  "today": "hôm nay", "tomorrow": "ngày mai", "yesterday": "hôm qua",
  "people": "người", "person": "người", "man": "đàn ông", "woman": "phụ nữ",
  "child": "trẻ em", "friend": "bạn", "family": "gia đình", "father": "bố",
  "mother": "mẹ", "brother": "anh trai", "sister": "chị gái",
  "school": "trường học", "teacher": "giáo viên", "student": "học sinh",
  "book": "sách", "pen": "bút", "paper": "giấy", "desk": "bàn", "chair": "ghế",
  "house": "nhà", "room": "phòng", "door": "cửa", "window": "cửa sổ",
  "city": "thành phố", "country": "đất nước", "road": "đường", "street": "phố",
  "car": "xe hơi", "bus": "xe buýt", "train": "tàu hỏa", "plane": "máy bay",
  "water": "nước", "food": "thức ăn", "rice": "cơm", "bread": "bánh mì",
  "tea": "trà", "coffee": "cà phê", "milk": "sữa",
  "money": "tiền", "work": "công việc", "job": "việc làm",
  "name": "tên", "word": "từ", "sentence": "câu", "language": "ngôn ngữ",
  "color": "màu sắc", "flower": "hoa", "tree": "cây", "animal": "động vật",
  "side": "phía", "back": "đằng sau", "front": "phía trước", "scene": "cảnh",
  "illness": "bệnh", "doctor": "bác sĩ", "hospital": "bệnh viện",
  "country; nation; state": "đất nước",
};

const COMMON_ADJ_OTHER: Record<string, string> = {
  "good": "tốt", "bad": "xấu", "big": "to", "small": "nhỏ", "many": "nhiều", "few": "ít",
  "high": "cao", "low": "thấp", "long": "dài", "short": "ngắn", "new": "mới", "old": "cũ",
  "fast": "nhanh", "slow": "chậm", "hot": "nóng", "cold": "lạnh", "warm": "ấm",
  "happy": "vui", "sad": "buồn", "angry": "tức giận", "tired": "mệt",
  "beautiful": "đẹp", "ugly": "xấu", "easy": "dễ", "difficult": "khó", "hard": "khó",
  "right": "đúng", "wrong": "sai", "important": "quan trọng", "interesting": "thú vị",
  "really": "thực sự", "very": "rất", "very; really": "rất",
  "everywhere": "khắp nơi", "always": "luôn luôn", "often": "thường",
  "good-looking": "đẹp", "nice-looking": "ưa nhìn", "pleasant to hear": "dễ nghe",
  "careless": "bất cẩn", "and": "và", "together with": "cùng với", "with": "với",
  "inside": "bên trong", "outside": "bên ngoài",
  "how much": "bao nhiêu", "item": "cái", "this year": "năm nay",
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
  const enClean = enStripped || enRaw.replace(/[\[\]]/g, "").trim();

  let viClean: string;
  if (looksVietnamese(viRaw) && viRaw !== enRaw) {
    viClean = viRaw.trim();
  } else {
    // VI field was English (leaked from CC-CEDICT). Clean + try translate.
    const viStripped = stripAnnotations(viRaw);
    const translated = translateEnToVi(viStripped || enClean);
    // Prefer translation > stripped EN > cleaned EN. Never fall back to noisy raw.
    viClean = translated || viStripped || enClean;
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
