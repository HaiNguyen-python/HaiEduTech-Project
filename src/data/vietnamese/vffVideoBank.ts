export interface VFFVideoClip {
  id: string;
  title: string;
  titleVi: string;
  youtubeId: string;
  level: "A1" | "A2" | "B1";
  topic: string;
  transcript: { t: number; vi: string; en: string }[];
  glossary: { vi: string; en: string; ipa?: string }[];
  quiz: { q: string; choices: string[]; answer: number }[];
}

export const VFF_VIDEO_BANK: VFFVideoClip[] = [
  {
    id: "hanoi-street",
    title: "Hanoi Street Life",
    titleVi: "Phố phường Hà Nội",
    youtubeId: "0m5v-K3JlZI",
    level: "A1",
    topic: "City life",
    transcript: [
      { t: 0, vi: "Xin chào các bạn.", en: "Hello everyone." },
      { t: 4, vi: "Đây là phố cổ Hà Nội.", en: "This is the Old Quarter of Hanoi." },
      { t: 9, vi: "Buổi sáng rất đông người.", en: "The morning is very crowded." },
    ],
    glossary: [
      { vi: "phố cổ", en: "old quarter", ipa: "/fo˧˧ ko˧ˀ˥/" },
      { vi: "buổi sáng", en: "morning" },
      { vi: "đông người", en: "crowded (lit. many people)" },
    ],
    quiz: [
      { q: "'Phố cổ' means…", choices: ["New street", "Old quarter", "Highway", "Market"], answer: 1 },
      { q: "Time of day mentioned?", choices: ["Evening", "Morning", "Night", "Noon"], answer: 1 },
      { q: "The street is…", choices: ["Empty", "Crowded", "Quiet", "Dark"], answer: 1 },
    ],
  },
  {
    id: "pho-bowl",
    title: "How to Order Phở",
    titleVi: "Cách gọi phở",
    youtubeId: "GgQTG3B4RQ4",
    level: "A1",
    topic: "Food",
    transcript: [
      { t: 0, vi: "Cho tôi một bát phở bò.", en: "Give me one bowl of beef phở." },
      { t: 5, vi: "Không hành, ít cay.", en: "No onion, little spice." },
      { t: 10, vi: "Bao nhiêu tiền ạ?", en: "How much is it?" },
    ],
    glossary: [
      { vi: "phở bò", en: "beef pho" },
      { vi: "hành", en: "onion" },
      { vi: "cay", en: "spicy" },
      { vi: "bao nhiêu tiền", en: "how much money" },
    ],
    quiz: [
      { q: "The customer orders…", choices: ["Chicken pho", "Beef pho", "Pork pho", "Vegetable pho"], answer: 1 },
      { q: "'Không hành' means…", choices: ["Extra onion", "No onion", "Cook onion", "Small onion"], answer: 1 },
      { q: "'Bao nhiêu tiền?' asks…", choices: ["What time", "How much", "Where", "Why"], answer: 1 },
    ],
  },
  {
    id: "tet-holiday",
    title: "Tết Lunar New Year",
    titleVi: "Tết Nguyên Đán",
    youtubeId: "gN0Zsm3XPXk",
    level: "A2",
    topic: "Culture",
    transcript: [
      { t: 0, vi: "Tết là lễ lớn nhất của người Việt.", en: "Tết is the biggest festival of the Vietnamese." },
      { t: 5, vi: "Mọi người về quê thăm gia đình.", en: "Everyone goes home to visit family." },
      { t: 12, vi: "Trẻ em được lì xì.", en: "Children receive lucky money." },
    ],
    glossary: [
      { vi: "lễ", en: "festival" },
      { vi: "về quê", en: "return to hometown" },
      { vi: "lì xì", en: "lucky money envelope" },
    ],
    quiz: [
      { q: "Tết is…", choices: ["A food", "The biggest festival", "A city", "A song"], answer: 1 },
      { q: "People go home to…", choices: ["Work", "Visit family", "Sleep", "Cook"], answer: 1 },
      { q: "Children receive…", choices: ["Books", "Lucky money", "Toys", "Clothes"], answer: 1 },
    ],
  },
];
