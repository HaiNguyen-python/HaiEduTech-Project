// Exam pictures for Cambridge Speaking Practice tasks.
// Images are resolved from the task itself (part + topic + prompt) so that every
// task whose prompt tells the student to look at a picture always shows one,
// and the picture type always matches the exam format:
//   - "Find the differences" tasks only ever get a two-picture (A/B) sheet
//   - "Picture story" tasks only ever get a multi-panel story strip
//   - Scene / photo tasks only ever get a single scene or photograph
import stToys from "@/assets/cambridge-speaking/st-toys.jpg";
import stAnimals from "@/assets/cambridge-speaking/st-animals.jpg";
import stFood from "@/assets/cambridge-speaking/st-food.jpg";
import stFruit from "@/assets/cambridge-speaking/st-fruit.jpg";
import stClothes from "@/assets/cambridge-speaking/st-clothes.jpg";
import stBedroom from "@/assets/cambridge-speaking/st-bedroom.jpg";
import mvParkDiff from "@/assets/cambridge-speaking/mv-park-diff.jpg";
import mvClassroomDiff from "@/assets/cambridge-speaking/mv-classroom-diff.jpg";
import mvShopDiff from "@/assets/cambridge-speaking/mv-shop-diff.jpg";
import mvBedroomDiff from "@/assets/cambridge-speaking/mv-bedroom-diff.jpg";
import flKitchenDiff from "@/assets/cambridge-speaking/fl-kitchen-diff.jpg";
import mvBeachStory from "@/assets/cambridge-speaking/mv-beach-story.jpg";
import mvLostCat from "@/assets/cambridge-speaking/mv-lost-cat.jpg";
import mvRainyStory from "@/assets/cambridge-speaking/mv-rainy-story.jpg";
import flCampingStory from "@/assets/cambridge-speaking/fl-camping-story.jpg";
import flSportsStory from "@/assets/cambridge-speaking/fl-sports-story.jpg";
import flTownPlaces from "@/assets/cambridge-speaking/fl-town-places.jpg";
import keMarket from "@/assets/cambridge-speaking/ke-market.jpg";
import keSport from "@/assets/cambridge-speaking/ke-sport.jpg";
import keCelebration from "@/assets/cambridge-speaking/ke-celebration.jpg";
import keCafe from "@/assets/cambridge-speaking/ke-cafe.jpg";
import peStation from "@/assets/cambridge-speaking/pe-station.jpg";
import peFarm from "@/assets/cambridge-speaking/pe-farm.jpg";
import peLibrary from "@/assets/cambridge-speaking/pe-library.jpg";
import peTeamwork from "@/assets/cambridge-speaking/pe-teamwork.jpg";

export interface SpeakingImageTask {
  id: string;
  part: string;
  topic: string;
  prompt: string;
  level?: string;
}

type Rule = [RegExp, string];

// Two-picture A/B sheets - only for "find the differences" tasks.
const DIFF_RULES: Rule[] = [
  [/classroom|school|lesson|teacher/i, mvClassroomDiff],
  [/shop|market|supermarket|buy|shopping/i, mvShopDiff],
  [/bedroom|room|house|home|flat/i, mvBedroomDiff],
  [/kitchen|cook|food|meal|dinner/i, flKitchenDiff],
  [/park|garden|playground|outside|street|town/i, mvParkDiff],
];
const DIFF_DEFAULT = mvParkDiff;

// Multi-panel story strips - only for "picture story" tasks.
const STORY_RULES: Rule[] = [
  [/cat|dog|pet|animal|lost/i, mvLostCat],
  [/beach|sea|holiday|swim|boat/i, mvBeachStory],
  [/camp|tent|trip|forest|mountain/i, flCampingStory],
  [/sport|race|match|running|football|team/i, flSportsStory],
  [/rain|weather|storm|wet|umbrella/i, mvRainyStory],
];
const STORY_DEFAULT = mvRainyStory;

// Single scenes, object cards and photographs.
const SCENE_RULES: Rule[] = [
  [/toy|teddy|doll|ball|game with/i, stToys],
  [/clothes|wear|shirt|dress|hat|shoes/i, stClothes],
  [/fruit|apple|banana|orange|mango/i, stFruit],
  [/food|eat|meal|breakfast|lunch|dinner|cook|drink/i, stFood],
  [/bedroom|my room|bed|house|home|flat/i, stBedroom],
  [/farm|wild animal|nature|country|environment|plant/i, peFarm],
  [/animal|zoo|bird|fish|pet/i, stAnimals],
  [/library|book|read|study|homework|exam|learning|language/i, peLibrary],
  [/market|shop|shopping|money|buy|price/i, keMarket],
  [/sport|exercise|fit|health|match|swim|football/i, keSport],
  [/party|birthday|celebrat|festival|tet|holiday/i, keCelebration],
  [/cafe|restaurant|friend|phone|social media|talk/i, keCafe],
  [/station|train|travel|transport|bus|journey|airport/i, peStation],
  [/work|job|office|team|technolog|computer|ai|career|business/i, peTeamwork],
  [/town|city|street|place|neighbour|village|park|playground/i, flTownPlaces],
  [/family|people|classroom|school|class/i, mvClassroomDiff],
];

const pick = (rules: Rule[], text: string, fallback: string): string => {
  for (const [re, img] of rules) if (re.test(text)) return img;
  return fallback;
};

const SCENE_DEFAULTS: Record<string, string> = {
  starters: stToys,
  movers: flTownPlaces,
  flyers: flTownPlaces,
  ket: keCafe,
  pet: peStation,
};

// Does the wording actually ask the student to look at something?
const NEEDS_PICTURE =
  /look at|these pictures|the pictures|this picture|the picture|photo|photograph|scene|differences/i;

export const needsPicture = (task: SpeakingImageTask): boolean =>
  NEEDS_PICTURE.test(task.prompt) || NEEDS_PICTURE.test(task.part);

export const imageForSpeakingTask = (task: SpeakingImageTask): string | undefined => {
  if (!needsPicture(task)) return undefined;
  const text = `${task.topic} ${task.prompt}`;
  if (/difference/i.test(task.part) || /difference/i.test(task.prompt)) {
    return pick(DIFF_RULES, text, DIFF_DEFAULT);
  }
  if (/story/i.test(task.part) || /these pictures show|tell me the story/i.test(task.prompt)) {
    return pick(STORY_RULES, text, STORY_DEFAULT);
  }
  return pick(SCENE_RULES, text, SCENE_DEFAULTS[task.level ?? "ket"] ?? keCafe);
};

// Short instruction shown with the picture, per exam part.
export const pictureHint = (part: string): { vi: string; en: string } => {
  if (/differences/i.test(part)) return { vi: "So sánh hai tranh A và B rồi nói các điểm khác nhau.", en: "Compare pictures A and B and say what is different." };
  if (/story/i.test(part)) return { vi: "Nhìn các tranh theo thứ tự rồi kể lại câu chuyện.", en: "Look at the pictures in order, then tell the story." };
  if (/photo|Long turn/i.test(part)) return { vi: "Mô tả bức ảnh: người, nơi, hành động, cảm xúc.", en: "Describe the photo: people, place, actions, feelings." };
  return { vi: "Nhìn tranh và trả lời câu hỏi của giám thị.", en: "Look at the picture and answer the examiner." };
};
