// Utilities for ConversationalLessonView: protagonist names per lesson
// and thematic banner illustrations per situation (no AI image gen — pure CSS).

const NAME_POOL = [
  "Peter", "Mary", "John", "Emma", "Liam", "Sophia", "Noah", "Olivia",
  "Ethan", "Ava", "Lucas", "Chloe", "Daniel", "Mia", "Alex", "Grace",
  "Henry", "Lily", "Oscar", "Zoe",
];

// Stable hash for deterministic name picking
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Returns a consistent protagonist name for a given lesson id. */
export function protagonistFor(lessonId: string): string {
  return NAME_POOL[hash(lessonId) % NAME_POOL.length];
}

// Theme keywords -> emojis + gradient
type Theme = { emojis: string[]; gradient: string };

const THEMES: { keywords: RegExp; theme: Theme }[] = [
  { keywords: /airport|flight|baggage|boarding|customs/i, theme: { emojis: ["✈️", "🧳", "🛂", "🌍"], gradient: "from-sky-400 via-blue-400 to-indigo-400" } },
  { keywords: /restaurant|dining|menu|order|waiter|food|meal|cooking|chef/i, theme: { emojis: ["🍽️", "👨‍🍳", "🥘", "🍷"], gradient: "from-amber-400 via-orange-400 to-rose-400" } },
  { keywords: /complaint|refund|return|wrong order/i, theme: { emojis: ["😤", "📦", "↩️", "💬"], gradient: "from-rose-400 via-red-400 to-orange-400" } },
  { keywords: /interview|hiring|job offer/i, theme: { emojis: ["💼", "🤝", "📋", "🌟"], gradient: "from-indigo-500 via-blue-500 to-cyan-500" } },
  { keywords: /salary|negotia|contract|deal|price/i, theme: { emojis: ["💰", "🤝", "📈", "✍️"], gradient: "from-emerald-500 via-teal-500 to-cyan-500" } },
  { keywords: /meeting|agenda|brainstorm|standup/i, theme: { emojis: ["📅", "💡", "🗂️", "👥"], gradient: "from-violet-400 via-purple-400 to-fuchsia-400" } },
  { keywords: /presentation|pitch|demo|product launch/i, theme: { emojis: ["📊", "🎤", "🖥️", "✨"], gradient: "from-fuchsia-400 via-pink-400 to-rose-400" } },
  { keywords: /email|message|chat/i, theme: { emojis: ["📧", "💬", "📨", "⌨️"], gradient: "from-blue-400 via-sky-400 to-cyan-400" } },
  { keywords: /conflict|difficult|coworker|argument/i, theme: { emojis: ["⚖️", "🤔", "💢", "🕊️"], gradient: "from-amber-500 via-orange-500 to-red-500" } },
  { keywords: /doctor|health|hospital|pharmacy|medicine|symptom/i, theme: { emojis: ["🩺", "💊", "🏥", "❤️"], gradient: "from-red-400 via-rose-400 to-pink-400" } },
  { keywords: /shopping|store|clothes|sweater|jacket|buy/i, theme: { emojis: ["🛍️", "👕", "💳", "🏬"], gradient: "from-pink-400 via-fuchsia-400 to-purple-400" } },
  { keywords: /direction|map|address|lost|street/i, theme: { emojis: ["🗺️", "📍", "🚶", "🧭"], gradient: "from-teal-400 via-emerald-400 to-green-400" } },
  { keywords: /dating|romance|date|coffee/i, theme: { emojis: ["💖", "☕", "🌹", "✨"], gradient: "from-rose-400 via-pink-400 to-fuchsia-400" } },
  { keywords: /bank|loan|money|saving|invest|budget/i, theme: { emojis: ["🏦", "💵", "📈", "💳"], gradient: "from-emerald-400 via-green-400 to-lime-400" } },
  { keywords: /weather|season|rain|snow|sun/i, theme: { emojis: ["☀️", "🌧️", "❄️", "🌈"], gradient: "from-sky-400 via-cyan-400 to-blue-400" } },
  { keywords: /celebration|festival|party|holiday|birthday/i, theme: { emojis: ["🎉", "🎂", "🎊", "🥳"], gradient: "from-yellow-400 via-amber-400 to-pink-400" } },
  { keywords: /pet|dog|cat|animal/i, theme: { emojis: ["🐶", "🐱", "🐾", "❤️"], gradient: "from-amber-300 via-orange-300 to-yellow-300" } },
  { keywords: /housing|apartment|rent|lease|home/i, theme: { emojis: ["🏠", "🔑", "🛋️", "📝"], gradient: "from-orange-400 via-amber-400 to-yellow-400" } },
  { keywords: /entertainment|movie|music|concert|game/i, theme: { emojis: ["🎬", "🎵", "🎮", "🎤"], gradient: "from-purple-400 via-fuchsia-400 to-pink-400" } },
  { keywords: /digital|online|social media|app|tech/i, theme: { emojis: ["📱", "💻", "🌐", "✨"], gradient: "from-cyan-400 via-blue-400 to-indigo-400" } },
  { keywords: /travel|trip|vacation|tour|hotel/i, theme: { emojis: ["🧳", "🗺️", "🏝️", "📸"], gradient: "from-sky-400 via-teal-400 to-emerald-400" } },
  { keywords: /emergency|police|fire|accident/i, theme: { emojis: ["🚨", "🚑", "🆘", "📞"], gradient: "from-red-500 via-orange-500 to-amber-500" } },
  { keywords: /network|conference|introduc/i, theme: { emojis: ["🤝", "🌐", "💼", "✨"], gradient: "from-indigo-400 via-violet-400 to-purple-400" } },
  { keywords: /remote|work from home|video call|zoom/i, theme: { emojis: ["💻", "🎧", "🏡", "📹"], gradient: "from-blue-400 via-indigo-400 to-purple-400" } },
  { keywords: /customer|service|support|help desk/i, theme: { emojis: ["🎧", "💬", "🙋", "⭐"], gradient: "from-teal-400 via-cyan-400 to-sky-400" } },
  { keywords: /leadership|manage|mentor|coach/i, theme: { emojis: ["🌟", "🧭", "👥", "🚀"], gradient: "from-amber-400 via-orange-400 to-rose-400" } },
  { keywords: /onboard|new employee|first day/i, theme: { emojis: ["🆕", "👋", "📚", "🎯"], gradient: "from-lime-400 via-green-400 to-emerald-400" } },
  { keywords: /freelance|client|invoice|gig/i, theme: { emojis: ["💻", "💰", "📑", "🏠"], gradient: "from-violet-400 via-purple-400 to-indigo-400" } },
  { keywords: /culture|workplace|diversity/i, theme: { emojis: ["🌍", "🤝", "🎭", "💡"], gradient: "from-orange-400 via-pink-400 to-purple-400" } },
  { keywords: /debate|opinion|argue|discuss/i, theme: { emojis: ["💭", "⚖️", "🗣️", "🎯"], gradient: "from-indigo-400 via-blue-400 to-cyan-400" } },
  { keywords: /study abroad|exchange|university|college/i, theme: { emojis: ["🎓", "✈️", "📚", "🌍"], gradient: "from-blue-400 via-indigo-400 to-violet-400" } },
  { keywords: /essay|writing|research|thesis/i, theme: { emojis: ["📝", "📚", "🔬", "✍️"], gradient: "from-slate-400 via-gray-400 to-zinc-400" } },
  { keywords: /internship|career|graduation/i, theme: { emojis: ["🎓", "💼", "🚀", "⭐"], gradient: "from-emerald-400 via-teal-400 to-blue-400" } },
  { keywords: /group project|team|collaborat/i, theme: { emojis: ["👥", "🤝", "💡", "📊"], gradient: "from-fuchsia-400 via-pink-400 to-rose-400" } },
  { keywords: /quitting|resign|leave/i, theme: { emojis: ["👋", "📤", "🚪", "🌅"], gradient: "from-orange-400 via-rose-400 to-red-400" } },
  { keywords: /socializ|friend|hobby/i, theme: { emojis: ["🎉", "👫", "☕", "💬"], gradient: "from-pink-400 via-rose-400 to-orange-400" } },
];

const DEFAULT_THEME: Theme = {
  emojis: ["💬", "🗣️", "✨", "🌐"],
  gradient: "from-blue-400 via-cyan-400 to-emerald-400",
};

export function bannerFor(title: string, descriptionVi?: string): Theme {
  const text = `${title} ${descriptionVi ?? ""}`;
  for (const { keywords, theme } of THEMES) {
    if (keywords.test(text)) return theme;
  }
  return DEFAULT_THEME;
}
