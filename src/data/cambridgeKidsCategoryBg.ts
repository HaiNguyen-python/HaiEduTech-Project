/**
 * @file cambridgeKidsCategoryBg.ts
 * @description Per-category subtle background illustration metadata.
 */
import type { KidsCategory } from "./cambridgeKidsCategories";

export const CATEGORY_BG: Record<KidsCategory, { tint: string; pattern: string[] }> = {
  "Animals":                          { tint: "linear-gradient(135deg, #FFF7E6 0%, #FFE8C2 100%)", pattern: ["🐾", "🐰", "🦁", "🐼", "🐸"] },
  "Food & Drink":                     { tint: "linear-gradient(135deg, #FFF1F0 0%, #FFD9D4 100%)", pattern: ["🍎", "🍕", "🍰", "🍌", "🥛"] },
  "Body, Health & Feelings":          { tint: "linear-gradient(135deg, #FFF0F5 0%, #FFD6E5 100%)", pattern: ["❤️", "💪", "😊", "🥰", "🤗"] },
  "People & Jobs":                    { tint: "linear-gradient(135deg, #FFF4E6 0%, #FFE0B8 100%)", pattern: ["👨‍👩‍👧", "👶", "👨‍⚕️", "👩‍🏫", "🧑‍🚀"] },
  "Home & Clothes":                   { tint: "linear-gradient(135deg, #FFF8E1 0%, #FFE9A8 100%)", pattern: ["🏠", "🛋️", "👕", "🧥", "🧦"] },
  "School & Stationery":              { tint: "linear-gradient(135deg, #EEF6FF 0%, #C8E2FF 100%)", pattern: ["📚", "✏️", "🎒", "🖍️", "📐"] },
  "Nature & Weather":                 { tint: "linear-gradient(135deg, #ECFDF5 0%, #B8F0CF 100%)", pattern: ["🌳", "☀️", "🌧️", "❄️", "🌸"] },
  "Places, Transport & Travel":       { tint: "linear-gradient(135deg, #EEF6FF 0%, #BCDFFF 100%)", pattern: ["🏰", "🏖️", "🚗", "✈️", "🗺️"] },
  "Sports, Hobbies & Music":          { tint: "linear-gradient(135deg, #FFF4E0 0%, #FFD89B 100%)", pattern: ["⚽", "🎮", "🎸", "🏀", "🎵"] },
  "Technology":                       { tint: "linear-gradient(135deg, #EEF2FF 0%, #C9D2FF 100%)", pattern: ["📱", "💻", "🤖", "🛰️", "🖥️"] },
  "Time, Numbers, Colors & Shapes":   { tint: "linear-gradient(135deg, #F3F4F6 0%, #D6DAE3 100%)", pattern: ["⏰", "🔢", "🌈", "🟥", "🟡"] },
  "Actions (Verbs)":                  { tint: "linear-gradient(135deg, #FFF4F4 0%, #FFD4D4 100%)", pattern: ["🏃", "🤸", "🦘", "🏊", "🚴"] },
  "Descriptions (Adjectives)":        { tint: "linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)", pattern: ["🌟", "💎", "🌈", "✨", "🎯"] },
  "Concepts & Society":               { tint: "linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)", pattern: ["🧠", "💭", "🏛️", "🌐", "📜"] },
  "Business & Money":                 { tint: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)", pattern: ["💰", "💼", "💳", "📈", "🏦"] },
  "Other":                            { tint: "linear-gradient(135deg, #FAFAFA 0%, #E5E5E5 100%)", pattern: ["✨", "🌟", "💫", "⭐", "🎈"] },
};
