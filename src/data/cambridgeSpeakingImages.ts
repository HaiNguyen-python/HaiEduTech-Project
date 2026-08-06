// Exam pictures for Cambridge Speaking Practice tasks.
// Keyed by task id so a task card can show the picture the examiner would hand over.
import stToys from "@/assets/cambridge-speaking/st-toys.jpg";
import stAnimals from "@/assets/cambridge-speaking/st-animals.jpg";
import stFood from "@/assets/cambridge-speaking/st-food.jpg";
import stBedroom from "@/assets/cambridge-speaking/st-bedroom.jpg";
import mvParkDiff from "@/assets/cambridge-speaking/mv-park-diff.jpg";
import mvBeachStory from "@/assets/cambridge-speaking/mv-beach-story.jpg";
import mvLostCat from "@/assets/cambridge-speaking/mv-lost-cat.jpg";
import mvClassroomDiff from "@/assets/cambridge-speaking/mv-classroom-diff.jpg";
import flKitchenDiff from "@/assets/cambridge-speaking/fl-kitchen-diff.jpg";
import flCampingStory from "@/assets/cambridge-speaking/fl-camping-story.jpg";
import flTownPlaces from "@/assets/cambridge-speaking/fl-town-places.jpg";
import flSportsStory from "@/assets/cambridge-speaking/fl-sports-story.jpg";
import keMarket from "@/assets/cambridge-speaking/ke-market.jpg";
import keSport from "@/assets/cambridge-speaking/ke-sport.jpg";
import keCelebration from "@/assets/cambridge-speaking/ke-celebration.jpg";
import keCafe from "@/assets/cambridge-speaking/ke-cafe.jpg";
import peStation from "@/assets/cambridge-speaking/pe-station.jpg";
import peFarm from "@/assets/cambridge-speaking/pe-farm.jpg";
import peLibrary from "@/assets/cambridge-speaking/pe-library.jpg";

export const cambridgeSpeakingImages: Record<string, string> = {
  "st-1": stToys,
  "st-2": stAnimals,
  "st-4": stFood,
  "st-6": stBedroom,
  "st-9": stToys,
  "mv-1": mvParkDiff,
  "mv-2": mvBeachStory,
  "mv-5": mvLostCat,
  "mv-6": mvClassroomDiff,
  "mv-8": mvBeachStory,
  "fl-1": flKitchenDiff,
  "fl-3": flCampingStory,
  "fl-5": flTownPlaces,
  "fl-6": flSportsStory,
  "fl-9": flTownPlaces,
  "ke-2": keMarket,
  "ke-3": keSport,
  "ke-5": keCelebration,
  "ke-6": keCafe,
  "ke-9": keCafe,
  "pe-1": peStation,
  "pe-4": peFarm,
  "pe-7": peLibrary,
  "pe-10": peStation,
  // Expansion pack 2 - reuse the closest matching exam picture.
  "st-11": stToys,
  "st-13": stFood,
  "st-15": peFarm,
  "st-17": stToys,
  "st-19": mvClassroomDiff,
  "mv-11": stBedroom,
  "mv-12": mvBeachStory,
  "mv-15": keMarket,
  "mv-16": mvLostCat,
  "mv-19": mvParkDiff,
  "fl-11": keCelebration,
  "fl-12": flKitchenDiff,
  "fl-15": peLibrary,
  "fl-16": flSportsStory,
  "fl-19": mvLostCat,
  "ke-12": keCafe,
  "ke-14": peStation,
  "ke-16": mvClassroomDiff,
  "ke-18": mvParkDiff,
  "ke-20": keMarket,
  "pe-14": flKitchenDiff,
  "pe-17": peStation,
  "pe-20": flTownPlaces,
};

export const imageForTask = (id: string): string | undefined => cambridgeSpeakingImages[id];

// Short instruction shown with the picture, per level.
export const pictureHint = (part: string): { vi: string; en: string } => {
  if (/differences/i.test(part)) return { vi: "So sánh hai tranh và nói các điểm khác nhau.", en: "Compare the two pictures and say what is different." };
  if (/story/i.test(part)) return { vi: "Nhìn các tranh theo thứ tự rồi kể lại câu chuyện.", en: "Look at the pictures in order, then tell the story." };
  if (/photo|Long turn/i.test(part)) return { vi: "Mô tả bức ảnh: người, nơi, hành động, cảm xúc.", en: "Describe the photo: people, place, actions, feelings." };
  return { vi: "Nhìn tranh và trả lời câu hỏi của giám thị.", en: "Look at the picture and answer the examiner." };
};
