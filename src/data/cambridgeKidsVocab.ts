/**
 * @file cambridgeKidsVocab.ts
 * @description Vocabulary bank for the Cambridge Kids Arcade — covers
 * Starters, Movers, Flyers, KET (A2 Key) and PET (B1 Preliminary) levels.
 * Each entry pairs an English word with a Vietnamese translation and a
 * playful emoji used by the arcade mini-games.
 */

export type CambridgeKidsLevel =
  | "Starters"
  | "Movers"
  | "Flyers"
  | "KET"
  | "PET";

export interface CambridgeKidsWord {
  word: string;
  vi: string;
  emoji: string;
  level: CambridgeKidsLevel;
  example?: string;
  exampleVi?: string;
}

export const CAMBRIDGE_KIDS_WORDS: CambridgeKidsWord[] = [
  // ============== STARTERS (A1) ==============
  { word: "apple", vi: "quả táo", emoji: "🍎", level: "Starters" },
  { word: "banana", vi: "quả chuối", emoji: "🍌", level: "Starters" },
  { word: "cat", vi: "con mèo", emoji: "🐱", level: "Starters" },
  { word: "dog", vi: "con chó", emoji: "🐶", level: "Starters" },
  { word: "elephant", vi: "con voi", emoji: "🐘", level: "Starters" },
  { word: "fish", vi: "con cá", emoji: "🐟", level: "Starters" },
  { word: "girl", vi: "bạn nữ", emoji: "👧", level: "Starters" },
  { word: "house", vi: "ngôi nhà", emoji: "🏠", level: "Starters" },
  { word: "ice cream", vi: "kem", emoji: "🍦", level: "Starters" },
  { word: "jump", vi: "nhảy", emoji: "🤸", level: "Starters" },
  { word: "kite", vi: "con diều", emoji: "🪁", level: "Starters" },
  { word: "lion", vi: "con sư tử", emoji: "🦁", level: "Starters" },
  { word: "monkey", vi: "con khỉ", emoji: "🐵", level: "Starters" },
  { word: "nose", vi: "cái mũi", emoji: "👃", level: "Starters" },
  { word: "orange", vi: "quả cam", emoji: "🍊", level: "Starters" },
  { word: "pen", vi: "cái bút", emoji: "🖊️", level: "Starters" },
  { word: "queen", vi: "nữ hoàng", emoji: "👸", level: "Starters" },
  { word: "rabbit", vi: "con thỏ", emoji: "🐰", level: "Starters" },
  { word: "sun", vi: "mặt trời", emoji: "☀️", level: "Starters" },
  { word: "tree", vi: "cái cây", emoji: "🌳", level: "Starters" },

  // ============== MOVERS (A1+) ==============
  { word: "bridge", vi: "cây cầu", emoji: "🌉", level: "Movers" },
  { word: "camel", vi: "lạc đà", emoji: "🐪", level: "Movers" },
  { word: "dolphin", vi: "cá heo", emoji: "🐬", level: "Movers" },
  { word: "envelope", vi: "phong bì", emoji: "✉️", level: "Movers" },
  { word: "factory", vi: "nhà máy", emoji: "🏭", level: "Movers" },
  { word: "glasses", vi: "kính mắt", emoji: "👓", level: "Movers" },
  { word: "helicopter", vi: "trực thăng", emoji: "🚁", level: "Movers" },
  { word: "island", vi: "hòn đảo", emoji: "🏝️", level: "Movers" },
  { word: "jacket", vi: "áo khoác", emoji: "🧥", level: "Movers" },
  { word: "kangaroo", vi: "chuột túi", emoji: "🦘", level: "Movers" },
  { word: "library", vi: "thư viện", emoji: "📚", level: "Movers" },
  { word: "mountain", vi: "ngọn núi", emoji: "⛰️", level: "Movers" },
  { word: "necklace", vi: "vòng cổ", emoji: "📿", level: "Movers" },
  { word: "octopus", vi: "bạch tuộc", emoji: "🐙", level: "Movers" },
  { word: "pancake", vi: "bánh kếp", emoji: "🥞", level: "Movers" },
  { word: "rainbow", vi: "cầu vồng", emoji: "🌈", level: "Movers" },
  { word: "skateboard", vi: "ván trượt", emoji: "🛹", level: "Movers" },
  { word: "telescope", vi: "kính thiên văn", emoji: "🔭", level: "Movers" },
  { word: "umbrella", vi: "ô / dù", emoji: "☂️", level: "Movers" },
  { word: "volcano", vi: "núi lửa", emoji: "🌋", level: "Movers" },

  // ============== FLYERS (A2) ==============
  { word: "astronaut", vi: "phi hành gia", emoji: "🧑‍🚀", level: "Flyers" },
  { word: "bicycle", vi: "xe đạp", emoji: "🚴", level: "Flyers" },
  { word: "chemist", vi: "dược sĩ", emoji: "🧪", level: "Flyers" },
  { word: "dinosaur", vi: "khủng long", emoji: "🦖", level: "Flyers" },
  { word: "engineer", vi: "kỹ sư", emoji: "👷", level: "Flyers" },
  { word: "festival", vi: "lễ hội", emoji: "🎪", level: "Flyers" },
  { word: "guitar", vi: "đàn ghi-ta", emoji: "🎸", level: "Flyers" },
  { word: "hospital", vi: "bệnh viện", emoji: "🏥", level: "Flyers" },
  { word: "invention", vi: "phát minh", emoji: "💡", level: "Flyers" },
  { word: "journey", vi: "chuyến đi", emoji: "🧳", level: "Flyers" },
  { word: "knowledge", vi: "kiến thức", emoji: "🧠", level: "Flyers" },
  { word: "laboratory", vi: "phòng thí nghiệm", emoji: "🔬", level: "Flyers" },
  { word: "museum", vi: "bảo tàng", emoji: "🏛️", level: "Flyers" },
  { word: "newspaper", vi: "báo giấy", emoji: "📰", level: "Flyers" },
  { word: "orchestra", vi: "dàn nhạc", emoji: "🎻", level: "Flyers" },
  { word: "passport", vi: "hộ chiếu", emoji: "🛂", level: "Flyers" },
  { word: "robot", vi: "người máy", emoji: "🤖", level: "Flyers" },
  { word: "stadium", vi: "sân vận động", emoji: "🏟️", level: "Flyers" },
  { word: "theatre", vi: "nhà hát", emoji: "🎭", level: "Flyers" },
  { word: "universe", vi: "vũ trụ", emoji: "🌌", level: "Flyers" },

  // ============== KET (A2 Key) ==============
  { word: "appointment", vi: "cuộc hẹn", emoji: "📅", level: "KET" },
  { word: "borrow", vi: "mượn", emoji: "🤝", level: "KET" },
  { word: "celebrate", vi: "ăn mừng", emoji: "🎉", level: "KET" },
  { word: "delicious", vi: "ngon", emoji: "😋", level: "KET" },
  { word: "exciting", vi: "thú vị", emoji: "🤩", level: "KET" },
  { word: "favourite", vi: "yêu thích", emoji: "⭐", level: "KET" },
  { word: "gallery", vi: "phòng tranh", emoji: "🖼️", level: "KET" },
  { word: "hobby", vi: "sở thích", emoji: "🎨", level: "KET" },
  { word: "interview", vi: "phỏng vấn", emoji: "🎤", level: "KET" },
  { word: "journey", vi: "hành trình", emoji: "🗺️", level: "KET" },
  { word: "kitchen", vi: "nhà bếp", emoji: "🍳", level: "KET" },
  { word: "language", vi: "ngôn ngữ", emoji: "🗣️", level: "KET" },
  { word: "message", vi: "tin nhắn", emoji: "💬", level: "KET" },
  { word: "neighbour", vi: "hàng xóm", emoji: "🏘️", level: "KET" },
  { word: "ocean", vi: "đại dương", emoji: "🌊", level: "KET" },
  { word: "popular", vi: "phổ biến", emoji: "📈", level: "KET" },
  { word: "remember", vi: "nhớ", emoji: "🧠", level: "KET" },
  { word: "souvenir", vi: "đồ lưu niệm", emoji: "🎁", level: "KET" },
  { word: "traffic", vi: "giao thông", emoji: "🚦", level: "KET" },
  { word: "uniform", vi: "đồng phục", emoji: "👔", level: "KET" },

  // ============== PET (B1 Preliminary) ==============
  { word: "achievement", vi: "thành tựu", emoji: "🏆", level: "PET" },
  { word: "behaviour", vi: "hành vi", emoji: "🙋", level: "PET" },
  { word: "challenge", vi: "thử thách", emoji: "⚔️", level: "PET" },
  { word: "discover", vi: "khám phá", emoji: "🔍", level: "PET" },
  { word: "environment", vi: "môi trường", emoji: "🌿", level: "PET" },
  { word: "festival", vi: "lễ hội văn hóa", emoji: "🎊", level: "PET" },
  { word: "generation", vi: "thế hệ", emoji: "👨‍👩‍👧", level: "PET" },
  { word: "habit", vi: "thói quen", emoji: "🔁", level: "PET" },
  { word: "imagination", vi: "trí tưởng tượng", emoji: "💭", level: "PET" },
  { word: "journalist", vi: "nhà báo", emoji: "📝", level: "PET" },
  { word: "knowledge", vi: "tri thức", emoji: "📚", level: "PET" },
  { word: "landscape", vi: "phong cảnh", emoji: "🏞️", level: "PET" },
  { word: "memory", vi: "ký ức", emoji: "💾", level: "PET" },
  { word: "nature", vi: "thiên nhiên", emoji: "🍃", level: "PET" },
  { word: "opportunity", vi: "cơ hội", emoji: "🚪", level: "PET" },
  { word: "performance", vi: "buổi biểu diễn", emoji: "🎬", level: "PET" },
  { word: "research", vi: "nghiên cứu", emoji: "🔬", level: "PET" },
  { word: "scientist", vi: "nhà khoa học", emoji: "👩‍🔬", level: "PET" },
  { word: "technology", vi: "công nghệ", emoji: "💻", level: "PET" },
  { word: "volunteer", vi: "tình nguyện viên", emoji: "🤲", level: "PET" },
];

export const CAMBRIDGE_LEVELS: CambridgeKidsLevel[] = [
  "Starters",
  "Movers",
  "Flyers",
  "KET",
  "PET",
];
