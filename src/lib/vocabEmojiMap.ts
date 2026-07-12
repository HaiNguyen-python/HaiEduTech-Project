// Word-level emoji mapping. Keyed by lowercase English definition/word so it works
// across languages (Finnish, Swedish, etc.) as long as an English gloss is provided.
// Falls back to category emoji, then a book. Keep entries short and specific.

// Category → emoji covers all Finnish + IELTS + common categories.
export const categoryEmojiMap: Record<string, string> = {
  // IELTS-style
  Education: "📚",
  Technology: "💻",
  Environment: "🌍",
  Health: "🏥",
  Business: "💼",
  Science: "🔬",
  Society: "👥",
  Arts: "🎨",
  Law: "⚖️",
  Media: "📺",
  Psychology: "🧠",
  Economics: "📊",
  Politics: "🏛️",
  Travel: "✈️",
  Food: "🍽️",
  // Finnish thematic
  "Home & Housing": "🏠",
  "Food & Drink": "🍽️",
  "Body & Health": "🩺",
  "Clothing & Style": "👕",
  Animals: "🐾",
  Nature: "🌳",
  "Weather & Seasons": "🌤️",
  "Time & Calendar": "🕒",
  "Numbers & Math": "🔢",
  "Colors & Shapes": "🎨",
  "Family & People": "👨‍👩‍👧",
  "Emotions & Feelings": "💗",
  "Work & Professions": "🧑‍💼",
  Transport: "🚗",
  "City & Places": "🏙️",
  "Travel & Tourism": "🧳",
  "Shopping & Money": "🛍️",
  "Sports & Hobbies": "⚽",
  "Media & Communication": "📱",
  "Government & Society": "🏛️",
  "Law & Safety": "⚖️",
  "Economy & Business": "📈",
  "Culture & Arts": "🎭",
  History: "📜",
  "Common Verbs": "🏃",
  "Common Adjectives": "🏷️",
  "Adverbs & Conjunctions": "🔗",
  "Finnish Culture & Sisu": "🇫🇮",
};

// Exact English word/definition → emoji. Definition matcher normalizes:
// lowercase, strips leading articles ("a ", "an ", "the "), trims.
const wordEmojiMap: Record<string, string> = {
  // Home & Housing
  home: "🏠", house: "🏡", apartment: "🏢", "apartment building": "🏢",
  "detached house": "🏡", "row house": "🏘️", cottage: "🛖", room: "🚪",
  kitchen: "🍳", bedroom: "🛏️", "living room": "🛋️", bathroom: "🛁",
  toilet: "🚽", balcony: "🏞️", yard: "🌱", roof: "🏚️", wall: "🧱",
  floor: "🟫", door: "🚪", window: "🪟", stair: "🪜", elevator: "🛗",
  sauna: "🧖", fireplace: "🔥", bed: "🛏️", chair: "🪑", table: "🪑",
  sofa: "🛋️", cupboard: "🗄️", shelf: "🗄️", lamp: "💡", mirror: "🪞",
  carpet: "🟪", curtain: "🪟", key: "🔑", lock: "🔒", garden: "🌷",
  // Food & Drink
  bread: "🍞", milk: "🥛", cheese: "🧀", egg: "🥚", butter: "🧈",
  water: "💧", coffee: "☕", tea: "🍵", juice: "🧃", beer: "🍺",
  wine: "🍷", meat: "🥩", chicken: "🍗", fish: "🐟", rice: "🍚",
  pasta: "🍝", pizza: "🍕", soup: "🥣", salad: "🥗", sandwich: "🥪",
  cake: "🍰", chocolate: "🍫", candy: "🍬", sugar: "🍬", salt: "🧂",
  pepper: "🌶️", apple: "🍎", banana: "🍌", orange: "🍊", strawberry: "🍓",
  potato: "🥔", tomato: "🍅", carrot: "🥕", onion: "🧅", cucumber: "🥒",
  lemon: "🍋", grape: "🍇", berry: "🫐", mushroom: "🍄", flour: "🌾",
  breakfast: "🍳", lunch: "🥪", dinner: "🍽️", meal: "🍽️", food: "🍲",
  drink: "🥤", restaurant: "🍴", cafe: "☕",
  // Body & Health
  head: "🧠", hair: "💇", face: "😊", eye: "👁️", ear: "👂", nose: "👃",
  mouth: "👄", tooth: "🦷", tongue: "👅", neck: "🦒", shoulder: "💪",
  arm: "💪", hand: "✋", finger: "☝️", leg: "🦵", foot: "🦶", knee: "🦵",
  back: "🔙", stomach: "🫃", heart: "❤️", brain: "🧠", blood: "🩸",
  bone: "🦴", skin: "🖐️", doctor: "👨‍⚕️", nurse: "👩‍⚕️", hospital: "🏥",
  medicine: "💊", pill: "💊", pain: "😖", fever: "🌡️", cold: "🤧",
  flu: "🤒", cough: "😷", exercise: "🏋️", sleep: "😴",
  // Clothing
  shirt: "👕", "t-shirt": "👕", pants: "👖", jeans: "👖", dress: "👗",
  skirt: "👗", jacket: "🧥", coat: "🧥", sweater: "🧶", shoe: "👟",
  boot: "🥾", sock: "🧦", hat: "🎩", cap: "🧢", scarf: "🧣", glove: "🧤",
  belt: "👖", bag: "👜", wallet: "👛",
  // Animals
  dog: "🐶", cat: "🐱", bird: "🐦", fish_animal: "🐟", horse: "🐴",
  cow: "🐄", pig: "🐷", sheep: "🐑", chicken_animal: "🐔", duck: "🦆",
  rabbit: "🐰", mouse: "🐭", rat: "🐀", bear: "🐻", wolf: "🐺",
  fox: "🦊", deer: "🦌", moose: "🫎", elk: "🫎", reindeer: "🦌",
  squirrel: "🐿️", frog: "🐸", snake: "🐍", spider: "🕷️", bee: "🐝",
  butterfly: "🦋", ant: "🐜", elephant: "🐘", lion: "🦁", tiger: "🐯",
  monkey: "🐒", penguin: "🐧", owl: "🦉", eagle: "🦅",
  // Nature
  tree: "🌳", forest: "🌲", flower: "🌸", grass: "🌿", leaf: "🍃",
  root: "🌱", seed: "🌱", plant: "🪴", mountain: "⛰️", hill: "🏔️",
  lake: "🏞️", river: "🏞️", sea: "🌊", ocean: "🌊", beach: "🏖️",
  island: "🏝️", desert: "🏜️", stone: "🪨", rock: "🪨", sand: "🏖️",
  sun: "☀️", moon: "🌙", star: "⭐", sky: "☁️", cloud: "☁️",
  // Weather & Seasons
  rain: "🌧️", snow: "❄️", wind: "💨", storm: "⛈️", thunder: "⚡",
  lightning: "⚡", ice: "🧊", fog: "🌫️", weather: "🌤️",
  spring: "🌷", summer: "☀️", autumn: "🍂", fall: "🍂", winter: "⛄",
  hot: "🥵", cold_weather: "🥶", warm: "🌡️", cool: "🌬️",
  // Time & Calendar
  day: "🌞", night: "🌙", morning: "🌅", evening: "🌆", noon: "🕛",
  midnight: "🕛", hour: "⏰", minute: "⏱️", second: "⏱️", week: "📅",
  month: "🗓️", year: "📆", today: "📅", tomorrow: "➡️", yesterday: "⬅️",
  monday: "📅", tuesday: "📅", wednesday: "📅", thursday: "📅",
  friday: "📅", saturday: "📅", sunday: "📅", clock: "🕐", calendar: "📆",
  time: "⏰",
  // Numbers
  number: "🔢", one: "1️⃣", two: "2️⃣", three: "3️⃣", four: "4️⃣",
  five: "5️⃣", six: "6️⃣", seven: "7️⃣", eight: "8️⃣", nine: "9️⃣",
  ten: "🔟", zero: "0️⃣", hundred: "💯",
  // Colors
  red: "🔴", blue: "🔵", green: "🟢", yellow: "🟡", black: "⚫",
  white: "⚪", orange_color: "🟠", purple: "🟣", brown: "🟤", pink: "🩷",
  gray: "⬜", grey: "⬜", color: "🎨", colour: "🎨",
  // Family & People
  family: "👨‍👩‍👧", father: "👨", mother: "👩", dad: "👨", mom: "👩",
  parent: "🧑", son: "👦", daughter: "👧", child: "🧒", children: "🧒",
  baby: "👶", brother: "👦", sister: "👧", grandfather: "👴",
  grandmother: "👵", grandpa: "👴", grandma: "👵", uncle: "🧔",
  aunt: "👩", cousin: "🧑", husband: "🤵", wife: "👰", friend: "🤝",
  neighbor: "🏘️", man: "👨", woman: "👩", boy: "👦", girl: "👧",
  person: "🧑", people: "👥",
  // Emotions
  love: "❤️", happy: "😊", sad: "😢", angry: "😠", tired: "😴",
  scared: "😨", afraid: "😨", surprised: "😲", bored: "🥱", excited: "🤩",
  laugh: "😂", cry: "😭", smile: "😊", fear: "😨", joy: "😄",
  feeling: "💗", emotion: "💗",
  // Education
  school: "🏫", university: "🎓", teacher: "👨‍🏫", student: "🧑‍🎓",
  class: "🏫", classroom: "🏫", lesson: "📖", book: "📖", pen: "🖊️",
  pencil: "✏️", paper: "📄", notebook: "📓", exam: "📝", test: "📝",
  homework: "📝", library: "📚", learn: "🎓", study: "📖", read: "📖",
  write: "✍️",
  // Work
  work: "💼", job: "💼", office: "🏢", boss: "👔", employee: "👔",
  meeting: "🤝", email: "📧", computer: "💻", phone: "📱", "cell phone": "📱",
  engineer: "👨‍💻", programmer: "👨‍💻", nurse_p: "👩‍⚕️", chef: "👨‍🍳",
  cook: "👨‍🍳", driver: "🚗", pilot: "🧑‍✈️", farmer: "🧑‍🌾",
  police: "👮", firefighter: "🧑‍🚒", soldier: "🪖", artist: "🧑‍🎨",
  musician: "🎼", writer: "✍️", lawyer: "⚖️",
  // Transport
  car: "🚗", bus: "🚌", train: "🚆", plane: "✈️", airplane: "✈️",
  bicycle: "🚲", bike: "🚲", motorcycle: "🏍️", boat: "⛵", ship: "🚢",
  taxi: "🚕", truck: "🚚", subway: "🚇", metro: "🚇", tram: "🚊",
  road: "🛣️", street: "🛣️", highway: "🛣️", bridge: "🌉", station: "🚉",
  airport: "🛫", port: "⚓",
  // City & Places
  city: "🏙️", town: "🏘️", village: "🏘️", country: "🗺️", capital: "🏛️",
  street_p: "🛣️", park: "🌳", square: "🏛️", church: "⛪", museum: "🏛️",
  theater: "🎭", theatre: "🎭", cinema: "🎬", store: "🏪", shop: "🏪",
  market: "🏪", supermarket: "🛒", bank: "🏦", hotel: "🏨",
  // Money
  money: "💰", coin: "🪙", cash: "💵", price: "💲", cost: "💲",
  bill: "🧾", card: "💳", "credit card": "💳", euro: "💶", dollar: "💵",
  discount: "🏷️", sale: "🏷️", shopping: "🛍️",
  // Sports
  ball: "⚽", football: "⚽", soccer: "⚽", basketball: "🏀", tennis: "🎾",
  swimming: "🏊", running: "🏃", skiing: "⛷️", ski: "⛷️", skating: "⛸️",
  hockey: "🏒", golf: "⛳", gym: "🏋️", music: "🎵", song: "🎵",
  dance: "💃", game: "🎮", movie: "🎬", film: "🎬", tv: "📺",
  television: "📺",
  // Technology
  internet: "🌐", website: "🌐", app: "📱", software: "💻",
  keyboard: "⌨️", mouse_tech: "🖱️", screen: "🖥️", camera: "📷",
  robot: "🤖", data: "💾", // (mouse ambiguity handled below)
  // Government
  government: "🏛️", president: "🎖️", king: "👑", queen: "👑",
  minister: "🎖️", vote: "🗳️", election: "🗳️", law: "⚖️", court: "⚖️",
  judge: "⚖️", prison: "🚔", army: "🪖", war: "⚔️", peace: "🕊️",
  // Environment
  environment: "🌍", pollution: "🏭", recycling: "♻️", climate: "🌡️",
  earth: "🌍", world: "🌍",
  // Science
  science: "🔬", chemistry: "⚗️", physics: "⚛️", biology: "🧬",
  math: "➕", mathematics: "➕", experiment: "🧪",
  // Culture & Arts
  culture: "🎭", art: "🎨", painting: "🖼️", picture: "🖼️", drawing: "🖌️",
  photograph: "📷", photo: "📷", statue: "🗿", theater_c: "🎭",
  history: "📜",
  // Verbs common
  eat: "🍽️", drink_v: "🥤", walk: "🚶", run: "🏃", sit: "🪑",
  stand: "🧍", sleep_v: "😴", speak: "🗣️", talk: "💬", say: "💬",
  buy: "🛒", sell: "💵", give: "🤝", take: "🤲", open: "🔓",
  close: "🔒", start: "▶️", begin: "▶️", stop: "⏹️", finish: "🏁",
  come: "➡️", go: "➡️", travel: "🧳", drive: "🚗", cook_v: "🍳",
  wash: "🧼", clean: "🧹", help: "🤝", think: "🤔", know: "🧠",
  want: "🎯", need: "🎯", like: "👍", love_v: "❤️", live: "🏠",
  work_v: "💼", play: "🎮", sing: "🎤", dance_v: "💃", jump: "🤸",
  swim: "🏊", fly: "🕊️", listen: "👂", hear: "👂", look: "👀",
  see: "👀", watch: "👀",
};

// Compound tokens ending in _tech / _v / _p / _color / _animal / _weather / _c
// let us disambiguate. When looking up we try raw definition first, then a
// category-scoped fallback (e.g. "mouse" → check "mouse_tech" if category is Technology).

const CATEGORY_SUFFIX: Record<string, string> = {
  Technology: "_tech",
  "Common Verbs": "_v",
  "Work & Professions": "_p",
  "Colors & Shapes": "_color",
  Animals: "_animal",
  "Weather & Seasons": "_weather",
  "Culture & Arts": "_c",
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/^(a|an|the|to)\s+/i, "")
    .replace(/[.,;:!?()]/g, "")
    .trim();
}

/**
 * Resolve the best emoji for a vocabulary entry.
 * Order: exact english definition → first word of definition → category-scoped
 *   variant (e.g. mouse in Technology) → category emoji → fallback book.
 */
export function resolveVocabEmoji(
  englishDefinition: string,
  category?: string,
): string {
  const norm = normalize(englishDefinition || "");
  if (norm && wordEmojiMap[norm]) return wordEmojiMap[norm];

  // Try category-scoped variant first (mouse_tech beats mouse when category matches).
  if (category && CATEGORY_SUFFIX[category]) {
    const scoped = norm + CATEGORY_SUFFIX[category];
    if (wordEmojiMap[scoped]) return wordEmojiMap[scoped];
  }

  // Try first significant token (e.g. "living room" → try "living", "room").
  const tokens = norm.split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    if (wordEmojiMap[tok]) return wordEmojiMap[tok];
  }

  if (category && categoryEmojiMap[category]) return categoryEmojiMap[category];
  return "📖";
}
