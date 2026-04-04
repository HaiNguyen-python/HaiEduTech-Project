

## Plan: Expand AI Speaking Coach Content for All Languages

### Current state
| Language | Themes | Sentences |
|----------|--------|-----------|
| English | 11 (greetings, daily, travel, work, food, health, tech, culture, education, environment) | ~130 |
| Finnish | 12 (greetings, daily, food, shopping, services, transport, health, work, nature, culture, housing) | ~130 |
| Chinese | 12 (greetings, daily, travel, work, food, shopping, health, weather, culture, education, technology, environment) | ~130 |
| Vietnamese | **5** (greetings, family, food, travel, work) | **55** |

Vietnamese is severely lacking. All languages could benefit from more themes.

### What to add

**Vietnamese — add 7 new themes (70 sentences):**
- 🏫 Giáo dục (Education) — 10 sentences
- 🏥 Sức khỏe (Health) — 10 sentences
- 🛒 Mua sắm (Shopping) — 10 sentences
- 🏠 Nhà cửa (Housing) — 10 sentences
- 🌿 Thiên nhiên (Nature & Environment) — 10 sentences
- 🎭 Văn hóa (Culture) — 10 sentences
- 💻 Công nghệ (Technology) — 10 sentences

**English — add 4 new themes (40 sentences):**
- 🏠 Housing & Home — 10 sentences
- 🛒 Shopping & Services — 10 sentences
- 🎓 Academic English — 10 sentences
- 📱 Social Media & Digital — 10 sentences

**Finnish — add 2 new themes (20 sentences):**
- 🎓 Opiskelu (Study & Education) — 10 sentences
- 🎉 Vapaa-aika (Leisure & Hobbies) — 10 sentences

**Chinese — add 2 new themes (20 sentences):**
- 🏠 住房 (Housing) — 10 sentences
- 🎉 休闲 (Leisure & Hobbies) — 10 sentences

### Total after expansion
| Language | Themes | Sentences |
|----------|--------|-----------|
| English | 15 | ~170 |
| Finnish | 14 | ~150 |
| Chinese | 14 | ~150 |
| Vietnamese | 12 | ~125 |

### File to modify
- `src/data/speakingCoachData.ts` — add new theme arrays to each language section

### What stays the same
- `AISpeakingCoach` component logic — no changes needed (themes render dynamically)
- `SpeakingCoachPage` — no changes
- All gamification, badges, leaderboard logic — unchanged

