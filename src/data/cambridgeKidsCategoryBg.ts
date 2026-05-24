/**
 * @file cambridgeKidsCategoryBg.ts
 * @description Per-category subtle background illustration metadata.
 * Used to give each collapsible vocabulary group its own themed look.
 * - `tint`: very soft tinted gradient that blends with level theme
 * - `pattern`: array of emojis used as a watermarked illustration pattern
 */
import type { KidsCategory } from "./cambridgeKidsCategories";

export const CATEGORY_BG: Record<KidsCategory, { tint: string; pattern: string[] }> = {
  "Animals":                   { tint: "linear-gradient(135deg, #FFF7E6 0%, #FFE8C2 100%)", pattern: ["🐾", "🐰", "🦁", "🐼", "🐸"] },
  "Food & Drink":              { tint: "linear-gradient(135deg, #FFF1F0 0%, #FFD9D4 100%)", pattern: ["🍎", "🍕", "🍰", "🍌", "🥛"] },
  "Body & Health":             { tint: "linear-gradient(135deg, #FFF0F5 0%, #FFD6E5 100%)", pattern: ["❤️", "💪", "🦷", "👁️", "🩺"] },
  "Family & People":           { tint: "linear-gradient(135deg, #FFF4E6 0%, #FFE0B8 100%)", pattern: ["👨‍👩‍👧", "👶", "👵", "🧑", "👫"] },
  "Home & Furniture":          { tint: "linear-gradient(135deg, #FFF8E1 0%, #FFE9A8 100%)", pattern: ["🏠", "🛋️", "🛏️", "🪑", "🚪"] },
  "School & Stationery":       { tint: "linear-gradient(135deg, #EEF6FF 0%, #C8E2FF 100%)", pattern: ["📚", "✏️", "🎒", "🖍️", "📐"] },
  "Clothes":                   { tint: "linear-gradient(135deg, #F5F0FF 0%, #DCC8FF 100%)", pattern: ["👕", "👖", "🧥", "🧦", "🧢"] },
  "Colors & Shapes":           { tint: "linear-gradient(135deg, #FFF0F8 0%, #FFD0EC 100%)", pattern: ["🎨", "🌈", "🔵", "🟥", "🟡"] },
  "Nature & Weather":          { tint: "linear-gradient(135deg, #ECFDF5 0%, #B8F0CF 100%)", pattern: ["🌳", "☀️", "🌧️", "❄️", "🌸"] },
  "Places":                    { tint: "linear-gradient(135deg, #EEF6FF 0%, #BCDFFF 100%)", pattern: ["🏰", "🏖️", "🏛️", "🌉", "🗺️"] },
  "Transport":                 { tint: "linear-gradient(135deg, #EAF4FF 0%, #B5D8FF 100%)", pattern: ["🚗", "✈️", "🚂", "🚲", "⛵"] },
  "Sports & Hobbies":          { tint: "linear-gradient(135deg, #FFF4E0 0%, #FFD89B 100%)", pattern: ["⚽", "🎮", "🎸", "🏀", "🎨"] },
  "Jobs":                      { tint: "linear-gradient(135deg, #F0F8FF 0%, #C5E0FF 100%)", pattern: ["👨‍⚕️", "👩‍🏫", "👨‍🍳", "👮", "🧑‍🚀"] },
  "Technology":                { tint: "linear-gradient(135deg, #EEF2FF 0%, #C9D2FF 100%)", pattern: ["📱", "💻", "🤖", "🛰️", "🖥️"] },
  "Travel & Holidays":         { tint: "linear-gradient(135deg, #FFF8E1 0%, #FFE7A0 100%)", pattern: ["🧳", "🗺️", "📷", "🏝️", "🎒"] },
  "Time & Numbers":            { tint: "linear-gradient(135deg, #F3F4F6 0%, #D6DAE3 100%)", pattern: ["⏰", "🔢", "📅", "🕐", "⌛"] },
  "Actions (Verbs)":           { tint: "linear-gradient(135deg, #FFF4F4 0%, #FFD4D4 100%)", pattern: ["🏃", "🤸", "🦘", "🏊", "🚴"] },
  "Feelings & Personality":    { tint: "linear-gradient(135deg, #FFFBEB 0%, #FFE8A0 100%)", pattern: ["😊", "😍", "😎", "🤗", "🥰"] },
  "Descriptions (Adjectives)": { tint: "linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)", pattern: ["🌟", "💎", "🌈", "✨", "🎯"] },
  "Other":                     { tint: "linear-gradient(135deg, #FAFAFA 0%, #E5E5E5 100%)", pattern: ["✨", "🌟", "💫", "⭐", "🎈"] },
};
