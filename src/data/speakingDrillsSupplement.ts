/**
 * @file speakingDrillsSupplement.ts
 * @description Extra high-frequency vocabulary and model structures added on top
 * of the topic banks inside the IELTS Speaking "Structure & Vocabulary Practice"
 * mode, so every topic has enough material to study and drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface SupplementVocabItem {
  phrase: string;
  vietnamese: string;
}

/** Useful in any Part 1 answer (personal, everyday register). */
const PART1_VOCAB: SupplementVocabItem[] = [
  { phrase: "To be really into something", vietnamese: "Rất thích, say mê điều gì" },
  { phrase: "On a daily basis", vietnamese: "Hằng ngày, thường xuyên" },
  { phrase: "To unwind after a long day", vietnamese: "Thư giãn sau một ngày dài" },
  { phrase: "A close friend of mine", vietnamese: "Một người bạn thân của tôi" },
  { phrase: "Now and then", vietnamese: "Thỉnh thoảng" },
  { phrase: "To get the hang of something", vietnamese: "Bắt đầu làm quen, thành thạo dần" },
  { phrase: "To be worth the effort", vietnamese: "Đáng để bỏ công sức" },
  { phrase: "A change of scenery", vietnamese: "Sự thay đổi không gian, cảnh vật" },
  { phrase: "To make time for something", vietnamese: "Dành thời gian cho điều gì" },
  { phrase: "To put my mind at ease", vietnamese: "Giúp tôi thấy an tâm" },
];

/** Useful for Part 2 story telling (narrative, descriptive register). */
const PART2_VOCAB: SupplementVocabItem[] = [
  { phrase: "It sticks in my mind", vietnamese: "Nó vẫn in đậm trong tâm trí tôi" },
  { phrase: "Out of the blue", vietnamese: "Bất ngờ, không báo trước" },
  { phrase: "A once-in-a-lifetime experience", vietnamese: "Trải nghiệm có một lần trong đời" },
  { phrase: "To be over the moon", vietnamese: "Vui mừng tột độ" },
  { phrase: "A turning point for me", vietnamese: "Một bước ngoặt với tôi" },
  { phrase: "To take me by surprise", vietnamese: "Làm tôi ngạc nhiên" },
  { phrase: "Looking back on it now", vietnamese: "Bây giờ nhìn lại" },
  { phrase: "To leave a lasting impression", vietnamese: "Để lại ấn tượng lâu dài" },
  { phrase: "In the middle of nowhere", vietnamese: "Ở nơi vắng vẻ, xa xôi" },
  { phrase: "To go the extra mile", vietnamese: "Nỗ lực hơn mức cần thiết" },
];

/** Useful for Part 3 discussion (analytical, academic register). */
const PART3_VOCAB: SupplementVocabItem[] = [
  { phrase: "A significant shift in attitudes", vietnamese: "Sự thay đổi rõ rệt trong thái độ" },
  { phrase: "To have far-reaching consequences", vietnamese: "Gây ra hệ quả sâu rộng" },
  { phrase: "To strike a balance between", vietnamese: "Tạo sự cân bằng giữa..." },
  { phrase: "A double-edged sword", vietnamese: "Con dao hai lưỡi" },
  { phrase: "To address the root cause", vietnamese: "Giải quyết nguyên nhân gốc rễ" },
  { phrase: "In the long run", vietnamese: "Về lâu dài" },
  { phrase: "To place emphasis on", vietnamese: "Nhấn mạnh vào..." },
  { phrase: "A widening gap between", vietnamese: "Khoảng cách ngày càng lớn giữa..." },
  { phrase: "To be held accountable for", vietnamese: "Phải chịu trách nhiệm về..." },
  { phrase: "To pave the way for", vietnamese: "Mở đường cho..." },
  { phrase: "A growing body of evidence suggests", vietnamese: "Ngày càng nhiều bằng chứng cho thấy" },
  { phrase: "To outweigh the drawbacks", vietnamese: "Lợi ích lớn hơn hạn chế" },
];

const PART1_STRUCTURES = [
  "To be honest, I've never really thought about it, but I'd say...",
  "It depends, but generally speaking I tend to...",
  "The main reason for that is probably that...",
  "I suppose the best example would be...",
  "It's not something I do very often, mainly because...",
  "What I like most about it is that it helps me...",
];

const PART2_STRUCTURES = [
  "The experience I'd like to talk about happened about... years ago.",
  "What made it so memorable was the fact that...",
  "I remember feeling... because at that point...",
  "To give you a bit of background,...",
  "The reason I've chosen this is that it completely changed the way I...",
  "Looking back, I'd say it taught me that...",
];

const PART3_STRUCTURES = [
  "There are a number of factors at play here, but the most important one is...",
  "On the one hand..., on the other hand..., so overall I'd argue that...",
  "A good case in point would be...",
  "It's difficult to generalise, although in most cases...",
  "If that trend continues, the likely outcome is that...",
  "While I can see the argument for..., I'm more inclined to think that...",
];

export const getSupplementVocabulary = (part: 1 | 2 | 3): SupplementVocabItem[] =>
  part === 1 ? PART1_VOCAB : part === 2 ? PART2_VOCAB : PART3_VOCAB;

export const getSupplementStructures = (part: 1 | 2 | 3): string[] =>
  part === 1 ? PART1_STRUCTURES : part === 2 ? PART2_STRUCTURES : PART3_STRUCTURES;
