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
  // Expansion pack 3 - picture-based tasks reuse the closest exam picture.
  "st-x3-1": stBedroom,
  "st-x3-3": mvParkDiff,
  "st-x3-5": stToys,
  "st-x3-7": mvClassroomDiff,
  "st-x3-10": stFood,
  "mv-x3-1": flKitchenDiff,
  "mv-x3-2": mvBeachStory,
  "mv-x3-3": peStation,
  "mv-x3-5": stBedroom,
  "mv-x3-6": keCelebration,
  "mv-x3-9": stAnimals,
  "fl-x3-1": peLibrary,
  "fl-x3-2": flTownPlaces,
  "fl-x3-3": flTownPlaces,
  "fl-x3-5": flCampingStory,
  "fl-x3-9": keMarket,
  "ket-x3-2": peStation,
  "ket-x3-5": flKitchenDiff,
  "ket-x3-8": peLibrary,
  "pet-x3-1": mvBeachStory,
  "pet-x3-4": peStation,
  "pet-x3-7": stBedroom,
  "pet-x3-10": keMarket,
  // Expansion pack 5 - picture-based tasks reuse the closest exam picture.
  "st-x5-5": stBedroom,
  "st-x5-8": mvParkDiff,
  "st-x5-10": stToys,
  "st-x5-12": mvClassroomDiff,
  "st-x5-14": stToys,
  "st-x5-16": peFarm,
  "st-x5-18": stFood,
  "mv-x5-1": mvParkDiff,
  "mv-x5-2": mvLostCat,
  "mv-x5-7": stBedroom,
  "mv-x5-8": mvBeachStory,
  "mv-x5-13": keMarket,
  "mv-x5-14": keCelebration,
  "mv-x5-17": mvClassroomDiff,
  "mv-x5-19": keSport,
  "fl-x5-1": flKitchenDiff,
  "fl-x5-2": flCampingStory,
  "fl-x5-8": keMarket,
  "fl-x5-9": mvLostCat,
  "fl-x5-13": peLibrary,
  "fl-x5-18": flTownPlaces,
  "ke-x5-2": keMarket,
  "ke-x5-4": keCelebration,
  "ke-x5-6": peLibrary,
  "ke-x5-8": keSport,
  "ke-x5-10": peStation,
  "ke-x5-12": flKitchenDiff,
  "ke-x5-14": mvClassroomDiff,
  "ke-x5-16": mvParkDiff,
  "ke-x5-18": keMarket,
  "ke-x5-20": keCelebration,
  "pe-x5-1": peLibrary,
  "pe-x5-4": peFarm,
  "pe-x5-7": peStation,
  "pe-x5-11": flTownPlaces,
  "pe-x5-14": flKitchenDiff,
  "pe-x5-18": keCafe,
  "st-x6-5": stBedroom,
  "st-x6-8": mvParkDiff,
  "st-x6-10": stToys,
  "st-x6-12": mvClassroomDiff,
  "st-x6-16": peFarm,
  "st-x6-18": stFood,
  "st-x6-2": stAnimals,
  "mv-x6-1": mvParkDiff,
  "mv-x6-2": mvLostCat,
  "mv-x6-6": mvClassroomDiff,
  "mv-x6-8": mvBeachStory,
  "mv-x6-13": keMarket,
  "mv-x6-16": stBedroom,
  "fl-x6-1": flKitchenDiff,
  "fl-x6-2": flCampingStory,
  "fl-x6-5": flTownPlaces,
  "fl-x6-6": flSportsStory,
  "fl-x6-8": keMarket,
  "fl-x6-13": peLibrary,
  "fl-x6-15": stBedroom,
  "ke-x6-2": keMarket,
  "ke-x6-4": keSport,
  "ke-x6-6": keCelebration,
  "ke-x6-8": keCafe,
  "ke-x6-10": peStation,
  "ke-x6-14": mvParkDiff,
  "ke-x6-16": keCafe,
  "ke-x6-18": peStation,
  "ke-x6-20": mvClassroomDiff,
  "ke-x6-12": keCafe,
  "pe-x6-1": peStation,
  "pe-x6-4": peFarm,
  "pe-x6-7": peLibrary,
  "pe-x6-10": keSport,
  "pe-x6-14": keCelebration,
  "pe-x6-17": keMarket,
};

export const imageForTask = (id: string): string | undefined => cambridgeSpeakingImages[id];

// Short instruction shown with the picture, per level.
export const pictureHint = (part: string): { vi: string; en: string } => {
  if (/differences/i.test(part)) return { vi: "So sánh hai tranh và nói các điểm khác nhau.", en: "Compare the two pictures and say what is different." };
  if (/story/i.test(part)) return { vi: "Nhìn các tranh theo thứ tự rồi kể lại câu chuyện.", en: "Look at the pictures in order, then tell the story." };
  if (/photo|Long turn/i.test(part)) return { vi: "Mô tả bức ảnh: người, nơi, hành động, cảm xúc.", en: "Describe the photo: people, place, actions, feelings." };
  return { vi: "Nhìn tranh và trả lời câu hỏi của giám thị.", en: "Look at the picture and answer the examiner." };
};
