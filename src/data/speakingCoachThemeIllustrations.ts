import greetingsImage from "@/assets/speaking-chibi-greetings.jpg";
import dailyLifeImage from "@/assets/speaking-chibi-daily-life.jpg";
import travelImage from "@/assets/speaking-chibi-travel.jpg";
import workImage from "@/assets/speaking-chibi-work.jpg";
import educationImage from "@/assets/speaking-chibi-education.jpg";
import healthImage from "@/assets/speaking-chibi-health.jpg";
import technologyImage from "@/assets/speaking-chibi-technology.jpg";
import natureImage from "@/assets/speaking-chibi-nature.jpg";
import foodImage from "@/assets/speaking-chibi-food.jpg";
import cultureImage from "@/assets/speaking-chibi-culture.jpg";
import shoppingImage from "@/assets/speaking-chibi-shopping.jpg";
import communityImage from "@/assets/speaking-chibi-community.jpg";

export interface SpeakingThemeIllustration {
  src: string;
  altVi: string;
  altEn: string;
}

type IllustrationCategory =
  | "greetings"
  | "daily"
  | "travel"
  | "work"
  | "education"
  | "health"
  | "technology"
  | "nature"
  | "food"
  | "culture"
  | "shopping"
  | "community";

const ILLUSTRATIONS: Record<IllustrationCategory, SpeakingThemeIllustration> = {
  greetings: { src: greetingsImage, altVi: "Hai học viên chibi đang chào hỏi", altEn: "Two chibi learners greeting each other" },
  daily: { src: dailyLifeImage, altVi: "Học viên chibi trong sinh hoạt hằng ngày", altEn: "A chibi learner during a daily routine" },
  travel: { src: travelImage, altVi: "Hai du khách chibi tại nhà ga", altEn: "Two chibi travellers at a station" },
  work: { src: workImage, altVi: "Nhóm chibi trao đổi trong công việc", altEn: "A chibi team collaborating at work" },
  education: { src: educationImage, altVi: "Nhóm học viên chibi trong lớp học", altEn: "A group of chibi learners in class" },
  health: { src: healthImage, altVi: "Học viên chibi chăm sóc sức khỏe", altEn: "A chibi learner practising healthy habits" },
  technology: { src: technologyImage, altVi: "Học viên chibi khám phá công nghệ", altEn: "Chibi learners exploring technology" },
  nature: { src: natureImage, altVi: "Nhóm chibi chăm sóc thiên nhiên", altEn: "Chibi learners caring for nature" },
  food: { src: foodImage, altVi: "Hai bạn chibi chuẩn bị món ăn", altEn: "Two chibi friends preparing food" },
  culture: { src: cultureImage, altVi: "Nhóm chibi khám phá văn hóa nghệ thuật", altEn: "Chibi learners exploring arts and culture" },
  shopping: { src: shoppingImage, altVi: "Nhóm chibi trò chuyện khi mua sắm", altEn: "Chibi learners talking while shopping" },
  community: { src: communityImage, altVi: "Bạn bè chibi trò chuyện trong phòng khách", altEn: "Chibi friends talking in a living room" },
};

const CATEGORY_TERMS: Array<[IllustrationCategory, string[]]> = [
  ["greetings", ["greet", "intro", "hello", "chào", "giới thiệu", "häls", "terveh", "挨拶", "紹介", "问候", "介绍"]],
  ["travel", ["travel", "transport", "airport", "hotel", "direction", "journey", "trip", "du lịch", "giao thông", "matka", "resa", "旅行", "交通", "旅游"]],
  ["work", ["work", "business", "job", "career", "office", "meeting", "công việc", "kinh doanh", "työ", "arbete", "仕事", "職場", "工作", "商务"]],
  ["education", ["education", "school", "study", "university", "exam", "learning", "giáo dục", "trường", "học", "koulu", "opisk", "skola", "stud", "学校", "勉強", "教育", "学习"]],
  ["health", ["health", "fitness", "doctor", "body", "feeling", "emotion", "sức khỏe", "cảm xúc", "terve", "hälsa", "健康", "病院", "健康", "医院"]],
  ["technology", ["tech", "internet", "digital", "computer", "media", "ai", "công nghệ", "tietotek", "teknik", "テクノロジ", "技術", "科技", "网络"]],
  ["nature", ["environment", "nature", "weather", "climate", "animal", "môi trường", "thiên nhiên", "sää", "luonto", "miljö", "väder", "環境", "天気", "环境", "天气"]],
  ["food", ["food", "cook", "restaurant", "drink", "meal", "ẩm thực", "nấu", "ruoka", "ravintola", "mat", "restaurang", "食べ", "料理", "饮食", "餐厅"]],
  ["culture", ["culture", "music", "movie", "art", "festival", "history", "sport", "văn hóa", "giải trí", "kulttu", "musi", "kultur", "musik", "文化", "音楽", "文化", "音乐"]],
  ["shopping", ["shop", "money", "bank", "service", "clothes", "mua", "tiền", "kaup", "pank", "köp", "bank", "買", "お金", "购物", "银行"]],
  ["community", ["family", "friend", "home", "housing", "relationship", "society", "community", "gia đình", "bạn bè", "yhteis", "perhe", "familj", "samhälle", "家族", "友達", "家庭", "朋友", "社会"]],
];

export function getSpeakingThemeIllustration(theme: { id: string; name: string; nameVi: string }): SpeakingThemeIllustration {
  const searchable = `${theme.id} ${theme.name} ${theme.nameVi}`.toLocaleLowerCase();
  const category = CATEGORY_TERMS.find(([, terms]) => terms.some((term) => searchable.includes(term)))?.[0] ?? "daily";
  return ILLUSTRATIONS[category];
}
