/**
 * @file cambridgeLectureImages.ts
 * @description Topic illustration resolver for Cambridge lectures.
 * Every lecture gets a picture that matches its TOPIC (not only its level):
 * keywords from the lecture title/description are matched against a curated
 * asset map. When no topic matches, the level illustration is used as fallback.
 */
import type { CambridgeLecture, CambridgeLevel } from "@/data/cambridgeLecturesData";

// Topic assets (shared with the speaking module) + lecture-specific packs
import stAnimals from "@/assets/cambridge-speaking/st-animals.jpg";
import stBedroom from "@/assets/cambridge-speaking/st-bedroom.jpg";
import stClothes from "@/assets/cambridge-speaking/st-clothes.jpg";
import stFood from "@/assets/cambridge-speaking/st-food.jpg";
import stFruit from "@/assets/cambridge-speaking/st-fruit.jpg";
import stToys from "@/assets/cambridge-speaking/st-toys.jpg";
import mvClassroom from "@/assets/cambridge-speaking/mv-classroom-diff.jpg";
import mvPark from "@/assets/cambridge-speaking/mv-park-diff.jpg";
import mvShop from "@/assets/cambridge-speaking/mv-shop-diff.jpg";
import mvBeach from "@/assets/cambridge-speaking/mv-beach-story.jpg";
import mvRainy from "@/assets/cambridge-speaking/mv-rainy-story.jpg";
import mvLostCat from "@/assets/cambridge-speaking/mv-lost-cat.jpg";
import flKitchen from "@/assets/cambridge-speaking/fl-kitchen-diff.jpg";
import flCamping from "@/assets/cambridge-speaking/fl-camping-story.jpg";
import flSports from "@/assets/cambridge-speaking/fl-sports-story.jpg";
import flTown from "@/assets/cambridge-speaking/fl-town-places.jpg";
import keCafe from "@/assets/cambridge-speaking/ke-cafe.jpg";
import keMarket from "@/assets/cambridge-speaking/ke-market.jpg";
import keCelebration from "@/assets/cambridge-speaking/ke-celebration.jpg";
import keSport from "@/assets/cambridge-speaking/ke-sport.jpg";
import peFarm from "@/assets/cambridge-speaking/pe-farm.jpg";
import peLibrary from "@/assets/cambridge-speaking/pe-library.jpg";
import peStation from "@/assets/cambridge-speaking/pe-station.jpg";
import peTeamwork from "@/assets/cambridge-speaking/pe-teamwork.jpg";

import topicFamily from "@/assets/cambridge-lectures/topic-family.jpg";
import topicBody from "@/assets/cambridge-lectures/topic-body-health.jpg";
import topicTransport from "@/assets/cambridge-lectures/topic-transport.jpg";
import topicWeather from "@/assets/cambridge-lectures/topic-weather.jpg";
import topicSchool from "@/assets/cambridge-lectures/topic-school.jpg";
import topicHobbies from "@/assets/cambridge-lectures/topic-hobbies.jpg";
import topicJobs from "@/assets/cambridge-lectures/topic-jobs.jpg";
import topicTravel from "@/assets/cambridge-lectures/topic-travel.jpg";
import topicWriting from "@/assets/cambridge-lectures/topic-writing.jpg";

import startersFun from "@/assets/cambridge/starters-fun.jpg";
import moversFun from "@/assets/cambridge/movers-fun.jpg";
import flyersFun from "@/assets/cambridge/flyers-fun.jpg";
import ketFun from "@/assets/cambridge/ket-fun.jpg";
import petFun from "@/assets/cambridge/pet-fun.jpg";

export const LEVEL_ILLUSTRATIONS: Record<CambridgeLevel, string> = {
  starters: startersFun,
  movers: moversFun,
  flyers: flyersFun,
  ket: ketFun,
  pet: petFun,
};

interface TopicRule {
  /** Lower-case keywords searched in the lecture title + description. */
  keys: string[];
  src: string;
  captionEn: string;
  captionVi: string;
}

/** Ordered: the first matching rule wins, so put specific topics first. */
const TOPIC_RULES: TopicRule[] = [
  { keys: ["letter", "email", "note to", "postcard", "message", "article", "story writing", "punctuation", "spelling rule"], src: topicWriting, captionEn: "Plan on paper for 1 minute before you write.", captionVi: "Hãy phác thảo 1 phút trên giấy trước khi viết." },
  { keys: ["animal", "pet", "zoo", "farm animal", "insect"], src: stAnimals, captionEn: "Point at each animal and say its name aloud.", captionVi: "Chỉ vào từng con vật và đọc to tên của nó." },
  { keys: ["fruit", "vegetable"], src: stFruit, captionEn: "Name the fruit you can see, then say the one you like best.", captionVi: "Gọi tên các loại quả em thấy, rồi nói quả em thích nhất." },
  { keys: ["food", "drink", "meal", "breakfast", "lunch", "dinner", "restaurant", "menu"], src: stFood, captionEn: "Find the food words in the picture before you read the rules.", captionVi: "Tìm các từ về đồ ăn trong tranh trước khi đọc phần quy tắc." },
  { keys: ["clothes", "clothing", "wear", "shoes"], src: stClothes, captionEn: "Say what each person is wearing today.", captionVi: "Nói xem mỗi người đang mặc gì hôm nay." },
  { keys: ["toy", "game", "play", "arcade"], src: stToys, captionEn: "Which toy would you choose? Say why.", captionVi: "Em sẽ chọn món đồ chơi nào? Hãy nói vì sao." },
  { keys: ["bedroom", "house", "home", "room", "furniture", "living room"], src: stBedroom, captionEn: "Describe where each object is: on, in, under, next to.", captionVi: "Mô tả vị trí từng đồ vật: on, in, under, next to." },
  { keys: ["kitchen", "cook", "recipe"], src: flKitchen, captionEn: "Look at the kitchen and name five objects.", captionVi: "Nhìn vào bếp và gọi tên năm đồ vật." },
  { keys: ["classroom", "school object", "school", "lesson", "subject", "teacher", "study"], src: topicSchool, captionEn: "School words appear in almost every exam paper.", captionVi: "Từ vựng về trường học xuất hiện trong hầu hết đề thi." },
  { keys: ["family", "friend", "people", "relative", "describing people"], src: topicFamily, captionEn: "Talk about the people: who they are and what they do.", captionVi: "Nói về những người trong tranh: họ là ai và làm gì." },
  { keys: ["body", "health", "doctor", "illness", "hospital", "face"], src: topicBody, captionEn: "Touch each body part while you say the word.", captionVi: "Chạm vào từng bộ phận cơ thể trong khi đọc từ." },
  { keys: ["transport", "travel by", "bus", "train", "bike", "car", "plane"], src: topicTransport, captionEn: "Use 'by bus / by bike / on foot' when you describe a trip.", captionVi: "Dùng 'by bus / by bike / on foot' khi kể về một chuyến đi." },
  { keys: ["weather", "season", "rain", "snow", "sunny", "climate"], src: topicWeather, captionEn: "Match each picture with a weather word.", captionVi: "Ghép mỗi tranh với một từ chỉ thời tiết." },
  { keys: ["hobby", "hobbies", "free time", "music", "art", "dance", "read for fun"], src: topicHobbies, captionEn: "Say which free-time activity you do every week.", captionVi: "Nói hoạt động rảnh rỗi nào em làm hằng tuần." },
  { keys: ["job", "work", "career", "occupation"], src: topicJobs, captionEn: "Name each job and one thing that person does.", captionVi: "Gọi tên từng nghề và một việc người đó làm." },
  { keys: ["holiday", "trip", "travel", "airport", "hotel", "tourist"], src: topicTravel, captionEn: "Plan a short holiday out loud: where, who with, why.", captionVi: "Hãy nói to kế hoạch một chuyến đi ngắn: ở đâu, với ai, vì sao." },
  { keys: ["sport", "football", "swim", "exercise", "match"], src: keSport, captionEn: "Use 'play / go / do' correctly with each sport.", captionVi: "Dùng đúng 'play / go / do' với từng môn thể thao." },
  { keys: ["park", "playground", "outdoor"], src: mvPark, captionEn: "Describe the scene from left to right.", captionVi: "Mô tả bức tranh từ trái sang phải." },
  { keys: ["beach", "sea", "swimming", "summer"], src: mvBeach, captionEn: "Tell the story of the picture in three sentences.", captionVi: "Kể lại câu chuyện trong tranh bằng ba câu." },
  { keys: ["shop", "shopping", "money", "price", "buy"], src: mvShop, captionEn: "Practise asking 'How much is it?' with the items you see.", captionVi: "Luyện hỏi 'How much is it?' với các món em thấy." },
  { keys: ["market", "supermarket"], src: keMarket, captionEn: "Ask and answer about prices and quantities.", captionVi: "Hỏi và trả lời về giá cả và số lượng." },
  { keys: ["camp", "camping", "adventure", "nature"], src: flCamping, captionEn: "Order the events: first, then, after that, finally.", captionVi: "Sắp xếp diễn biến: first, then, after that, finally." },
  { keys: ["town", "city", "place", "direction", "map"], src: flTown, captionEn: "Give directions from one place to another.", captionVi: "Chỉ đường từ địa điểm này sang địa điểm khác." },
  { keys: ["party", "birthday", "festival", "celebration", "tet"], src: keCelebration, captionEn: "Describe the celebration and how people feel.", captionVi: "Mô tả buổi lễ và cảm xúc của mọi người." },
  { keys: ["cafe", "café", "coffee", "order food"], src: keCafe, captionEn: "Role-play ordering politely: 'Could I have...?'", captionVi: "Đóng vai gọi món lịch sự: 'Could I have...?'" },
  { keys: ["library", "book", "story", "reading habit"], src: peLibrary, captionEn: "Talk about the last book you read.", captionVi: "Nói về cuốn sách gần nhất em đã đọc." },
  { keys: ["station", "journey", "timetable", "ticket"], src: peStation, captionEn: "Listen for times, platforms and prices.", captionVi: "Chú ý nghe giờ, sân ga và giá vé." },
  { keys: ["team", "group work", "project", "collaborat", "discussion", "agree"], src: peTeamwork, captionEn: "Use agreeing and disagreeing phrases naturally.", captionVi: "Dùng các mẫu câu đồng ý và không đồng ý thật tự nhiên." },
  { keys: ["farm", "countryside", "village"], src: peFarm, captionEn: "Compare life in the countryside and in the city.", captionVi: "So sánh cuộc sống ở nông thôn và thành phố." },
  { keys: ["rain", "storm", "lost", "problem", "help"], src: mvRainy, captionEn: "Say what happened and how the problem was solved.", captionVi: "Nói điều gì đã xảy ra và vấn đề được giải quyết thế nào." },
  { keys: ["cat", "dog", "missing", "notice"], src: mvLostCat, captionEn: "Describe the animal so someone could find it.", captionVi: "Mô tả con vật để người khác có thể tìm ra nó." },
  { keys: ["sports story", "race", "competition"], src: flSports, captionEn: "Tell the sports story in the past tense.", captionVi: "Kể câu chuyện thể thao bằng thì quá khứ." },
  { keys: ["classroom rules", "spelling", "alphabet", "letter"], src: mvClassroom, captionEn: "Spell each word aloud, letter by letter.", captionVi: "Đánh vần từng từ thật to, từng chữ cái một." },
  { keys: ["writing", "write", "email", "letter", "note", "article", "story writing", "grammar", "tense", "punctuation"], src: topicWriting, captionEn: "Plan on paper for 1 minute before you write.", captionVi: "Hãy phác thảo 1 phút trên giấy trước khi viết." },
];

export interface LectureIllustration {
  src: string;
  captionEn: string;
  captionVi: string;
  isTopical: boolean;
}

/** Resolve the best illustration for a lecture (topic first, then level). */
export function illustrationForLecture(lecture: CambridgeLecture): LectureIllustration {
  const haystack = `${lecture.title} ${lecture.description} ${lecture.learningObjective}`.toLowerCase();
  for (const rule of TOPIC_RULES) {
    if (rule.keys.some(k => haystack.includes(k))) {
      return { src: rule.src, captionEn: rule.captionEn, captionVi: rule.captionVi, isTopical: true };
    }
  }
  const level = lecture.level.toUpperCase();
  return {
    src: LEVEL_ILLUSTRATIONS[lecture.level],
    captionEn: `Let's enjoy ${level} together! Look at the picture and describe it in 2 sentences.`,
    captionVi: `Cùng học ${level} thật vui nhé! Hãy nhìn tranh và mô tả bằng 2 câu.`,
    isTopical: false,
  };
}
