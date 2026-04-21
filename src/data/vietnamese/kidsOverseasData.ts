// For Vietnamese kids overseas — family vocab, daily greetings, lullabies, simple stories
export interface KidsLesson {
  id: string;
  emoji: string;
  title: string;
  titleEn: string;
  ageGroup: "3-6" | "7-10" | "11-14";
  topic: string;
  topicEn: string;
  vocabulary: { vi: string; en: string; emoji: string; example?: string; exampleEn?: string }[];
  song?: { title: string; lyrics: string; lyricsEn: string };
  story?: { title: string; titleEn: string; text: string; textEn: string };
}

export const kidsLessons: KidsLesson[] = [
  {
    id: "family-tree",
    emoji: "👨‍👩‍👧‍👦",
    title: "Cây gia đình",
    titleEn: "Family Tree",
    ageGroup: "3-6",
    topic: "Gọi tên người thân",
    topicEn: "Naming family members",
    vocabulary: [
      { vi: "ông nội", en: "paternal grandpa", emoji: "👴", example: "Ông nội của con là họa sĩ.", exampleEn: "My grandpa is an artist." },
      { vi: "bà nội", en: "paternal grandma", emoji: "👵", example: "Bà nội nấu phở rất ngon.", exampleEn: "Grandma cooks delicious pho." },
      { vi: "ông ngoại", en: "maternal grandpa", emoji: "👴" },
      { vi: "bà ngoại", en: "maternal grandma", emoji: "👵" },
      { vi: "bố / ba", en: "dad", emoji: "👨", example: "Bố con đi làm ở Mỹ.", exampleEn: "My dad works in the USA." },
      { vi: "mẹ / má", en: "mom", emoji: "👩" },
      { vi: "anh trai", en: "older brother", emoji: "🧑" },
      { vi: "chị gái", en: "older sister", emoji: "👧" },
      { vi: "em trai", en: "younger brother", emoji: "👦" },
      { vi: "em gái", en: "younger sister", emoji: "👧" },
      { vi: "cô / chú", en: "aunt/uncle (paternal)", emoji: "🧑‍🤝‍🧑" },
      { vi: "cậu / dì", en: "uncle/aunt (maternal)", emoji: "🧑‍🤝‍🧑" },
    ],
    song: {
      title: "Cả nhà thương nhau",
      lyrics: "Ba thương con vì con giống mẹ\nMẹ thương con vì con giống ba\nCả nhà ta cùng thương yêu nhau\nXa là nhớ, gần nhau là cười.",
      lyricsEn: "Dad loves me because I look like mom\nMom loves me because I look like dad\nOur whole family loves each other\nApart we miss, together we smile.",
    },
  },
  {
    id: "greetings",
    emoji: "👋",
    title: "Chào hỏi mỗi ngày",
    titleEn: "Daily Greetings",
    ageGroup: "3-6",
    topic: "Lễ phép với người lớn",
    topicEn: "Polite greetings to elders",
    vocabulary: [
      { vi: "Chào ông ạ!", en: "Hello, grandpa!", emoji: "👋", example: "Mỗi sáng con phải chào ông trước khi đi học.", exampleEn: "Every morning, greet grandpa before going to school." },
      { vi: "Chào bà ạ!", en: "Hello, grandma!", emoji: "👋" },
      { vi: "Cháu chào cô / chú ạ!", en: "Hello, auntie / uncle!", emoji: "🙇" },
      { vi: "Con cảm ơn ạ!", en: "Thank you!", emoji: "🙏" },
      { vi: "Con xin lỗi ạ!", en: "I'm sorry!", emoji: "😔" },
      { vi: "Dạ vâng ạ!", en: "Yes (polite)!", emoji: "✅" },
      { vi: "Con đi học ạ!", en: "I'm going to school!", emoji: "🎒" },
      { vi: "Con về rồi ạ!", en: "I'm home!", emoji: "🏠" },
    ],
  },
  {
    id: "body-parts",
    emoji: "🧒",
    title: "Bộ phận cơ thể",
    titleEn: "Body Parts",
    ageGroup: "3-6",
    topic: "Tên các bộ phận cơ thể",
    topicEn: "Body parts vocabulary",
    vocabulary: [
      { vi: "đầu", en: "head", emoji: "🗣️" },
      { vi: "tóc", en: "hair", emoji: "💇" },
      { vi: "mắt", en: "eyes", emoji: "👀" },
      { vi: "mũi", en: "nose", emoji: "👃" },
      { vi: "miệng", en: "mouth", emoji: "👄" },
      { vi: "tai", en: "ears", emoji: "👂" },
      { vi: "tay", en: "hand/arm", emoji: "✋" },
      { vi: "chân", en: "leg/foot", emoji: "🦵" },
      { vi: "bụng", en: "tummy", emoji: "🫃" },
      { vi: "lưng", en: "back", emoji: "🔙" },
    ],
    song: {
      title: "Một ngón tay nhúc nhích",
      lyrics: "Một ngón tay nhúc nhích nhúc nhích\nMột ngón tay nhúc nhích cũng đủ làm ta vui rồi.\nHai ngón tay nhúc nhích nhúc nhích\nHai ngón tay nhúc nhích cũng đủ làm ta vui rồi.",
      lyricsEn: "One finger wiggling, wiggling\nOne finger wiggling is enough to make us happy.\nTwo fingers wiggling, wiggling\nTwo fingers wiggling is enough to make us happy.",
    },
  },
  {
    id: "lullaby",
    emoji: "🌙",
    title: "Hát ru con",
    titleEn: "Vietnamese Lullabies",
    ageGroup: "3-6",
    topic: "Bài hát ru truyền thống",
    topicEn: "Traditional bedtime songs",
    vocabulary: [
      { vi: "à ơi", en: "lullaby sound (like 'la la')", emoji: "🎶" },
      { vi: "ngủ ngoan", en: "sleep well", emoji: "😴" },
      { vi: "võng", en: "hammock", emoji: "🛌" },
      { vi: "trăng", en: "moon", emoji: "🌙" },
    ],
    song: {
      title: "Ầu ơ ví dầu",
      lyrics: "Ầu ơ... ví dầu cầu ván đóng đinh\nCầu tre lắt lẻo gập ghềnh khó đi\nKhó đi mẹ dắt con đi\nCon đi trường học, mẹ đi trường đời.",
      lyricsEn: "Lullaby... a wooden bridge with nails\nA shaky bamboo bridge, hard to cross\nHard to walk, mother holds your hand\nYou go to school, mother walks the road of life.",
    },
  },
  {
    id: "simple-story",
    emoji: "📚",
    title: "Truyện ngắn: Bé và mèo",
    titleEn: "Short Story: The Child and the Cat",
    ageGroup: "7-10",
    topic: "Đọc hiểu cơ bản",
    topicEn: "Basic reading comprehension",
    vocabulary: [
      { vi: "con mèo", en: "cat", emoji: "🐱" },
      { vi: "bé", en: "little child", emoji: "👶" },
      { vi: "vui", en: "happy", emoji: "😊" },
      { vi: "ôm", en: "to hug", emoji: "🤗" },
      { vi: "sữa", en: "milk", emoji: "🥛" },
    ],
    story: {
      title: "Bé và mèo Mun",
      titleEn: "The Child and Mun the Cat",
      text: "Bé Lan có một con mèo đen tên là Mun. Mun rất hiền và thích uống sữa. Mỗi sáng, bé Lan rót sữa cho Mun. Mun kêu 'meo meo' rất vui. Bé Lan ôm Mun và cười. Hai bạn rất thân nhau.",
      textEn: "Little Lan has a black cat named Mun. Mun is very gentle and loves milk. Every morning, Lan pours milk for Mun. Mun says 'meow meow' happily. Lan hugs Mun and laughs. They are best friends.",
    },
  },
  {
    id: "vietnamese-pride",
    emoji: "🇻🇳",
    title: "Tự hào là người Việt",
    titleEn: "Proud to Be Vietnamese",
    ageGroup: "11-14",
    topic: "Văn hóa & bản sắc",
    topicEn: "Heritage & identity",
    vocabulary: [
      { vi: "quê hương", en: "homeland", emoji: "🏞️" },
      { vi: "tổ tiên", en: "ancestors", emoji: "🙏" },
      { vi: "tiếng mẹ đẻ", en: "mother tongue", emoji: "🗣️" },
      { vi: "tự hào", en: "proud", emoji: "💪" },
      { vi: "truyền thống", en: "tradition", emoji: "🏮" },
      { vi: "Việt kiều", en: "Overseas Vietnamese", emoji: "✈️" },
    ],
    story: {
      title: "Là Việt kiều",
      titleEn: "Being Vietnamese Overseas",
      text: "Em sinh ra ở nước ngoài nhưng bố mẹ em là người Việt Nam. Mỗi tuần em học tiếng Việt với bà ngoại qua video call. Em yêu phở, áo dài và Tết. Em tự hào nói: 'Em là người Việt!'",
      textEn: "I was born abroad but my parents are Vietnamese. Every week I learn Vietnamese with grandma over video call. I love phở, áo dài, and Tết. I proudly say: 'I am Vietnamese!'",
    },
  },
];
