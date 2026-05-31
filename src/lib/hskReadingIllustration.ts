/**
 * @file hskReadingIllustration.ts
 * @description Infer a contextual emoji illustration for HSK reading
 * questions that don't already include a picture prompt. The mapping is
 * Chinese-keyword based and ordered roughly from most specific →
 * generic so the first match wins.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

// Ordered list - first matching keyword wins.
const HSK_EMOJI_MAP: [RegExp, string][] = [
  // Family & people
  [/妈妈|母亲/, "👩"], [/爸爸|父亲/, "👨"], [/爷爷/, "👴"], [/奶奶/, "👵"],
  [/哥哥|弟弟/, "👦"], [/姐姐|妹妹|女儿/, "👧"], [/儿子/, "👦"],
  [/朋友/, "👫"], [/同学/, "🧑‍🎓"], [/老师/, "👨‍🏫"], [/医生/, "👨‍⚕️"],
  [/学生/, "🧑‍🎓"], [/服务员/, "🧑‍🍳"], [/经理/, "🧑‍💼"], [/警察/, "👮"],

  // Food & drink
  [/苹果/, "🍎"], [/香蕉/, "🍌"], [/西瓜/, "🍉"], [/葡萄/, "🍇"],
  [/水果/, "🍓"], [/米饭|吃饭|饭/, "🍚"], [/面条|面/, "🍜"], [/饺子/, "🥟"],
  [/包子/, "🥟"], [/茶/, "🍵"], [/咖啡/, "☕"], [/水(?!果)/, "💧"],
  [/牛奶/, "🥛"], [/啤酒|酒/, "🍺"], [/鸡蛋|蛋/, "🥚"], [/鱼/, "🐟"],
  [/肉/, "🥩"], [/菜/, "🥬"], [/蛋糕/, "🍰"], [/糖/, "🍬"],

  // Animals
  [/猫/, "🐱"], [/狗/, "🐶"], [/鸟/, "🐦"], [/马/, "🐴"], [/熊猫/, "🐼"],

  // Places
  [/学校/, "🏫"], [/医院/, "🏥"], [/银行/, "🏦"], [/饭馆|餐厅/, "🍽️"],
  [/商店|超市/, "🏪"], [/公司/, "🏢"], [/机场/, "✈️"], [/火车站/, "🚉"],
  [/家/, "🏠"], [/房子|房间/, "🏠"], [/教室/, "🏫"], [/图书馆/, "📚"],
  [/公园/, "🌳"], [/中国|北京/, "🇨🇳"], [/美国/, "🇺🇸"], [/越南/, "🇻🇳"],

  // Weather & nature
  [/下雨|雨/, "🌧️"], [/下雪|雪/, "❄️"], [/晴|太阳/, "☀️"], [/云/, "☁️"],
  [/风/, "🌬️"], [/热/, "🥵"], [/冷/, "🥶"], [/天气/, "🌤️"],

  // Transport
  [/飞机/, "✈️"], [/火车/, "🚆"], [/汽车|出租车/, "🚗"], [/公共汽车|公交/, "🚌"],
  [/自行车/, "🚲"], [/地铁/, "🚇"], [/船/, "🚢"],

  // Time
  [/星期日|星期天/, "📅"], [/星期/, "📅"], [/月.*号|号|日期/, "🗓️"],
  [/今天|明天|昨天|早上|晚上|中午|下午/, "🕐"], [/点|小时|时间/, "🕐"],
  [/生日/, "🎂"], [/春节|过年/, "🧧"],

  // Activities
  [/看电视/, "📺"], [/看电影/, "🎬"], [/听音乐|音乐/, "🎵"], [/唱歌/, "🎤"],
  [/跳舞/, "💃"], [/跑步/, "🏃"], [/游泳/, "🏊"], [/踢足球|足球/, "⚽"],
  [/打篮球|篮球/, "🏀"], [/打网球/, "🎾"], [/旅游|旅行/, "🧳"],
  [/睡觉/, "🛌"], [/起床/, "⏰"], [/工作/, "💼"], [/学习|读书|学/, "📖"],
  [/写字|写/, "✍️"], [/看书|读/, "📖"], [/打电话/, "📞"], [/发短信/, "💬"],

  // Objects
  [/电脑/, "💻"], [/手机/, "📱"], [/电视/, "📺"], [/书/, "📚"],
  [/桌子/, "🪑"], [/椅子/, "🪑"], [/床/, "🛏️"], [/钱/, "💰"],
  [/衣服/, "👕"], [/鞋/, "👟"], [/帽子/, "🎩"], [/钥匙/, "🔑"],
  [/车/, "🚗"], [/钟|表/, "⏰"], [/雨伞/, "☂️"], [/包/, "🎒"],

  // Body & health
  [/眼睛/, "👀"], [/嘴|口/, "👄"], [/手/, "✋"], [/脚/, "🦶"],
  [/身体/, "🧍"], [/生病|药|病/, "💊"], [/累/, "😪"], [/高兴|快乐|开心/, "😊"],

  // Numbers / money
  [/多少钱|价格|元|块/, "💴"],

  // Communication / language
  [/汉语|中文|普通话/, "🀄"], [/英语|英文/, "🔤"], [/说|讲/, "🗣️"],

  // Color
  [/红/, "🟥"], [/绿/, "🟩"], [/蓝/, "🟦"], [/黄/, "🟨"], [/黑/, "⬛"], [/白/, "⬜"],

  // Generic fallbacks
  [/问题|题/, "❓"], [/喜欢|爱/, "❤️"], [/不/, "🚫"],
];

/**
 * Pick a representative emoji for a Chinese reading prompt.
 * Returns "" when nothing matches so the caller can skip rendering.
 */
export function inferReadingEmoji(text?: string): string {
  if (!text) return "";
  // Skip if the text already starts with an emoji / picture char
  const first = text.trim().codePointAt(0);
  if (first && first > 0x1f000) return "";
  for (const [re, emoji] of HSK_EMOJI_MAP) {
    if (re.test(text)) return emoji;
  }
  return "";
}
