/**
 * IELTS Speaking Practice - second expansion bank (Part 1 and Part 2).
 * Adds fresh topics with vocabulary tailored to each question type:
 *  - Part 1: everyday collocations, frequency and preference language
 *  - Part 2: narrative / descriptive language for the two-minute long turn
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion, VocabItem } from "./speakingPracticeData";

const v = (phrase: string, vietnamese: string): VocabItem => ({ phrase, vietnamese });

export interface Seed2 {
  id: string;
  topic: string;
  question: string;
  prompts?: string[];
  vocab: [string, string][];
  structures: string[];
  ideas: string[];
  model: string;
}

export const build2 = (part: 1 | 2 | 3, seeds: Seed2[]): SpeakingPracticeQuestion[] =>
  seeds.map((s) => ({
    id: s.id,
    part,
    topic: s.topic,
    question: s.question,
    ...(s.prompts ? { prompts: s.prompts } : {}),
    useful_language: {
      vocabulary_bank: s.vocab.map(([p, vi]) => v(p, vi)),
      model_structures: s.structures,
      brainstorming_ideas: s.ideas,
    },
    model_answer: s.model,
  }));

const CUE_PROMPTS = (a: string, b: string, c: string, d: string) => [a, b, c, d];

// ===================== PART 1 (short personal questions) =====================
const p1: Seed2[] = [
  {
    id: "py1-handwriting",
    topic: "Handwriting",
    question: "Do you prefer writing by hand or typing?",
    vocab: [
      ["Legible handwriting", "Chữ viết dễ đọc"],
      ["To jot something down", "Ghi nhanh lại"],
      ["Muscle memory", "Trí nhớ cơ"],
      ["Out of practice", "Lâu không luyện nên kém"],
    ],
    structures: ["It depends on what I'm doing, really.", "For anything longer than..., I'd rather...", "I've got into the habit of..."],
    ideas: ["Notes in lectures", "Speed vs memory", "Signing documents"],
    model:
      "It depends on what I'm doing. I type essays because it's far quicker, but I always **jot down** vocabulary by hand - the **muscle memory** helps me remember it. That said, my **handwriting** has become less **legible** since I'm quite **out of practice**.",
  },
  {
    id: "py1-neighbours",
    topic: "Neighbours",
    question: "Do you know your neighbours well?",
    vocab: [
      ["To be on friendly terms", "Có quan hệ thân thiện"],
      ["To keep to oneself", "Sống khép kín"],
      ["A tight-knit community", "Cộng đồng gắn bó"],
      ["To lend a hand", "Giúp một tay"],
    ],
    structures: ["I wouldn't say we're close, but...", "We tend to..., especially when...", "Compared with the countryside,..."],
    ideas: ["Apartment vs village life", "Helping during festivals", "Noise and privacy"],
    model:
      "I wouldn't say we're close, but we're definitely **on friendly terms** - we chat in the lift and they'll **lend a hand** if I'm carrying something heavy. In my grandparents' village it's much more **tight-knit**, whereas city people tend to **keep to themselves**.",
  },
  {
    id: "py1-mornings",
    topic: "Daily Routine",
    question: "Are you a morning person?",
    vocab: [
      ["A night owl", "Cú đêm"],
      ["To hit the snooze button", "Bấm báo lại"],
      ["To get into gear", "Bắt nhịp, khởi động"],
      ["A slow start", "Khởi đầu chậm chạp"],
    ],
    structures: ["Not at all, to be honest.", "It usually takes me... before I...", "I function best when..."],
    ideas: ["Study schedule", "Coffee habit", "Weekend difference"],
    model:
      "Not at all, to be honest - I'm more of **a night owl**. I **hit the snooze button** at least twice and it takes a coffee before I really **get into gear**. After that **slow start** though, I'm fine for the rest of the day.",
  },
  {
    id: "py1-photos",
    topic: "Photography",
    question: "Do you take a lot of photos?",
    vocab: [
      ["To capture a moment", "Ghi lại khoảnh khắc"],
      ["A candid shot", "Ảnh chụp tự nhiên"],
      ["Camera roll", "Thư viện ảnh điện thoại"],
      ["To edit heavily", "Chỉnh sửa quá tay"],
    ],
    structures: ["Far too many, probably.", "I mostly photograph... rather than...", "I don't bother..., I just..."],
    ideas: ["Food and travel photos", "Photos as a diary", "Filters and authenticity"],
    model:
      "Far too many, probably - my **camera roll** has thousands. I prefer **candid shots** of my friends to posed ones because they **capture the moment** better, and I don't like pictures that have been **edited heavily**.",
  },
  {
    id: "py1-noise",
    topic: "Noise",
    question: "Is the area where you live noisy?",
    vocab: [
      ["Traffic congestion", "Ùn tắc giao thông"],
      ["Constant honking", "Tiếng còi liên tục"],
      ["To drown out", "Át đi (âm thanh)"],
      ["To get used to something", "Quen dần với điều gì"],
    ],
    structures: ["It can be, particularly during...", "You'd think... but actually...", "Over time you simply..."],
    ideas: ["Rush hour", "Street food vendors", "Soundproof windows"],
    model:
      "It can be, particularly during rush hour when **traffic congestion** and **constant honking** fill the street. You'd think it would keep me awake, but you **get used to it** - and a fan in my room **drowns out** most of the noise.",
  },
  {
    id: "py1-gifts",
    topic: "Gifts",
    question: "Do you enjoy choosing gifts for other people?",
    vocab: [
      ["Thoughtful present", "Món quà tinh tế"],
      ["To rack one's brains", "Vắt óc suy nghĩ"],
      ["Last-minute", "Sát giờ chót"],
      ["Sentimental value", "Giá trị tinh thần"],
    ],
    structures: ["I do, although I find it...", "Rather than..., I try to...", "The best gifts I've given have been..."],
    ideas: ["Handmade gifts", "Tet and birthdays", "Practical vs meaningful"],
    model:
      "I do enjoy it, although I often **rack my brains** for days. Rather than buying something expensive, I try to find a **thoughtful present** with some **sentimental value** - a photo book, for instance. What I hate is **last-minute** shopping.",
  },
  {
    id: "py1-publictransport",
    topic: "Transport",
    question: "How often do you use public transport?",
    vocab: [
      ["To commute", "Đi lại hằng ngày"],
      ["Packed like sardines", "Chật như nêm"],
      ["A season ticket", "Vé tháng"],
      ["To be stuck in traffic", "Kẹt xe"],
    ],
    structures: ["Nearly every day, since...", "The main advantage for me is...", "I only take a taxi when..."],
    ideas: ["Bus vs motorbike", "Cost saving", "Metro line in Hanoi/HCMC"],
    model:
      "Nearly every day, since I don't own a car. I bought **a season ticket** for the bus, which is far cheaper than driving and means I'm not the one **stuck in traffic**. The only downside is the evening bus, when we're **packed like sardines**.",
  },
  {
    id: "py1-cooking",
    topic: "Cooking",
    question: "Do you often cook at home?",
    vocab: [
      ["To whip something up", "Nấu nhanh món gì"],
      ["A go-to dish", "Món tủ"],
      ["From scratch", "Từ nguyên liệu tươi"],
      ["Leftovers", "Đồ ăn thừa"],
    ],
    structures: ["I try to, mainly because...", "My **go-to dish** would have to be...", "When I'm short of time, I just..."],
    ideas: ["Health and cost", "Cooking with family", "Meal prep"],
    model:
      "I try to, mainly because eating out every day is expensive. My **go-to dish** is stir-fried noodles - I can **whip it up** in fifteen minutes. At weekends I cook a big pot of pho **from scratch** and live off the **leftovers**.",
  },
  {
    id: "py1-flowers",
    topic: "Flowers & Plants",
    question: "Do you like having plants in your home?",
    vocab: [
      ["Low-maintenance plants", "Cây dễ chăm"],
      ["To brighten up a space", "Làm không gian tươi sáng"],
      ["Green thumb", "Mát tay trồng cây"],
      ["To wither", "Héo úa"],
    ],
    structures: ["I love the idea, though...", "They really do... which is why...", "Anything that needs... is out of the question."],
    ideas: ["Small apartment", "Air quality", "Tet peach blossom"],
    model:
      "I love the idea, though I definitely don't have **a green thumb** - half of mine **wither** within a month. I stick to **low-maintenance plants** like succulents because they **brighten up** my tiny room without much effort.",
  },
  {
    id: "py1-apps",
    topic: "Apps",
    question: "Which app do you use the most?",
    vocab: [
      ["A must-have app", "Ứng dụng không thể thiếu"],
      ["User-friendly interface", "Giao diện dễ dùng"],
      ["To be glued to", "Dán mắt vào"],
      ["Screen time", "Thời gian dùng màn hình"],
    ],
    structures: ["Without a doubt, it's...", "What makes it useful is...", "I've had to set limits because..."],
    ideas: ["Messaging vs study apps", "Notifications", "Digital detox"],
    model:
      "Without a doubt it's Zalo, since everyone in Vietnam uses it. What makes it **a must-have** is the **user-friendly interface** - even my grandmother manages it. I do check my **screen time** though, because I can easily end up **glued to** my phone.",
  },
  {
    id: "py1-teamwork",
    topic: "Teamwork",
    question: "Do you prefer working alone or in a team?",
    vocab: [
      ["To bounce ideas around", "Trao đổi ý tưởng"],
      ["To pull one's weight", "Làm đủ phần việc"],
      ["Group project", "Bài tập nhóm"],
      ["To take the lead", "Đứng ra dẫn dắt"],
    ],
    structures: ["It really depends on the task.", "In a group I usually end up...", "The frustrating part is when..."],
    ideas: ["Creative vs detailed work", "Free riders", "Learning from others"],
    model:
      "It depends on the task. For creative work I like **bouncing ideas around**, and I often end up **taking the lead**. The frustrating part of any **group project** is when one or two members don't **pull their weight**.",
  },
  {
    id: "py1-childhoodgames",
    topic: "Childhood",
    question: "What games did you play as a child?",
    vocab: [
      ["Traditional games", "Trò chơi dân gian"],
      ["To be hooked on", "Nghiện, mê"],
      ["Out in the open air", "Ngoài trời"],
      ["To look back fondly", "Nhớ lại đầy trìu mến"],
    ],
    structures: ["Back then we mostly...", "I remember being completely **hooked on**...", "Looking back, I appreciate..."],
    ideas: ["Tug of war, hide and seek", "No smartphones", "Neighbourhood friends"],
    model:
      "Back then we mostly played **traditional games** like tug of war and hide-and-seek **out in the open air**. I was completely **hooked on** kite flying one summer. I **look back fondly** on it because we entertained ourselves without a single screen.",
  },
  {
    id: "py1-secondhand",
    topic: "Shopping",
    question: "Would you buy second-hand items?",
    vocab: [
      ["A bargain", "Món hời"],
      ["Wear and tear", "Hao mòn do sử dụng"],
      ["To be in good nick", "Còn tốt (thân mật)"],
      ["Thrift shopping", "Mua đồ cũ"],
    ],
    structures: ["Absolutely, provided that...", "I'd draw the line at...", "There's something satisfying about..."],
    ideas: ["Books and furniture", "Hygiene concerns", "Sustainability"],
    model:
      "Absolutely, provided the item is still **in good nick**. I've picked up textbooks and a bike at a real **bargain** through **thrift shopping**, and reusing things is better for the planet. I'd draw the line at shoes, though - the **wear and tear** shows.",
  },
  {
    id: "py1-languages",
    topic: "Languages",
    question: "Do you think learning a foreign language is difficult?",
    vocab: [
      ["To pick up a language", "Học được một ngôn ngữ"],
      ["Language barrier", "Rào cản ngôn ngữ"],
      ["To be exposed to", "Được tiếp xúc với"],
      ["Trial and error", "Thử và sai"],
    ],
    structures: ["Difficult isn't quite the word - it's more...", "What helped me most was...", "You can't avoid..."],
    ideas: ["Speaking anxiety", "Immersion", "Grammar vs communication"],
    model:
      "Difficult isn't quite the word - it's more time-consuming. What helped me **pick up** English was being **exposed to** podcasts every day. You can't avoid **trial and error**, but once you get past the initial **language barrier** it becomes enjoyable.",
  },
  {
    id: "py1-weekendplans",
    topic: "Free Time",
    question: "What do you usually do at the weekend?",
    vocab: [
      ["To unwind", "Thư giãn"],
      ["A change of scenery", "Đổi không khí"],
      ["To catch up with friends", "Gặp lại bạn bè"],
      ["A lazy Sunday", "Chủ nhật thư thả"],
    ],
    structures: ["It varies, but typically...", "If the weather's nice, I'll...", "Otherwise I just..."],
    ideas: ["Cafe culture", "Family lunch", "Short trips"],
    model:
      "It varies, but typically I **catch up with friends** at a coffee shop on Saturday. If the weather's nice we ride out of the city for **a change of scenery**. Sunday is usually **a lazy Sunday** at home, which is how I **unwind** before Monday.",
  },
  {
    id: "py1-adverts",
    topic: "Advertising",
    question: "Do advertisements influence what you buy?",
    vocab: [
      ["An eye-catching advert", "Quảng cáo bắt mắt"],
      ["Impulse buy", "Mua bốc đồng"],
      ["To be bombarded with", "Bị dội bom bởi"],
      ["Word of mouth", "Truyền miệng"],
    ],
    structures: ["I'd like to say no, but...", "I trust... far more than...", "The ones that work on me are..."],
    ideas: ["Social media ads", "Influencers", "Reviews"],
    model:
      "I'd like to say no, but I'm **bombarded with** ads on TikTok and I've certainly made the odd **impulse buy**. Still, I trust **word of mouth** far more - a friend's recommendation beats the most **eye-catching advert**.",
  },
  {
    id: "py1-libraries",
    topic: "Libraries",
    question: "Do you ever study in a library?",
    vocab: [
      ["To knuckle down", "Tập trung làm việc"],
      ["A distraction-free environment", "Môi trường không xao nhãng"],
      ["Reference section", "Khu sách tham khảo"],
      ["To be within walking distance", "Cách vài bước chân"],
    ],
    structures: ["Quite often, especially when...", "The atmosphere makes me...", "At home I'd be tempted to..."],
    ideas: ["Exam season", "Free air conditioning", "Study buddies"],
    model:
      "Quite often, especially during exam season. The library is **within walking distance** and the silence gives me **a distraction-free environment**, so I really **knuckle down**. At home I'd be tempted to watch something instead.",
  },
  {
    id: "py1-colours",
    topic: "Colours",
    question: "Is there a colour you would never wear?",
    vocab: [
      ["To suit someone", "Hợp với ai"],
      ["Bold colours", "Màu sắc nổi bật"],
      ["Neutral tones", "Tông trung tính"],
      ["To stand out", "Nổi bật"],
    ],
    structures: ["Probably..., simply because...", "I gravitate towards...", "I save... for special occasions."],
    ideas: ["Skin tone", "Work dress code", "Confidence"],
    model:
      "Probably bright orange - it just doesn't **suit me**. I tend to gravitate towards **neutral tones** like navy and grey for university, and I only wear **bold colours** at parties when I actually want to **stand out**.",
  },
  {
    id: "py1-outdooractivity",
    topic: "Outdoor Activities",
    question: "Do you spend much time outdoors?",
    vocab: [
      ["Fresh air", "Không khí trong lành"],
      ["To get some exercise", "Vận động"],
      ["Cooped up", "Bí bách trong nhà"],
      ["Green space", "Không gian xanh"],
    ],
    structures: ["Less than I'd like, honestly.", "Whenever I get the chance, I...", "It clears my head after..."],
    ideas: ["Parks and lakes", "Weather limits", "Running habit"],
    model:
      "Less than I'd like, honestly, because I sit at a desk all day. Whenever I get the chance I walk around the lake to **get some exercise** and enjoy the **fresh air** - it clears my head after hours of being **cooped up** indoors.",
  },
  {
    id: "py1-familytime",
    topic: "Family",
    question: "How much time do you spend with your family?",
    vocab: [
      ["Quality time", "Thời gian chất lượng"],
      ["Family gathering", "Buổi họp mặt gia đình"],
      ["To keep in touch", "Giữ liên lạc"],
      ["Under the same roof", "Sống chung một nhà"],
    ],
    structures: ["We still live..., so...", "Even when I'm busy, I make sure...", "Once a month we..."],
    ideas: ["Shared dinners", "Video calls", "Death anniversaries and Tet"],
    model:
      "We still live **under the same roof**, so I see my parents every evening at dinner - that's our real **quality time**. My sister studies abroad, but we **keep in touch** weekly, and there's always a big **family gathering** at Tet.",
  },
  {
    id: "py1-latecomers",
    topic: "Time Management",
    question: "Are you usually on time?",
    vocab: [
      ["To be punctual", "Đúng giờ"],
      ["To run late", "Bị trễ"],
      ["To allow extra time", "Trừ hao thời gian"],
      ["Pet peeve", "Điều khó chịu"],
    ],
    structures: ["I'd say I'm fairly...", "I always **allow extra time** for...", "Lateness is a bit of a **pet peeve** of mine."],
    ideas: ["Traffic in Vietnam", "Respect for others", "Alarms and calendars"],
    model:
      "I'd say I'm fairly **punctual**. I always **allow extra time** for traffic because it's so unpredictable here. If I do **run late**, I text straight away - unexplained lateness is a real **pet peeve** of mine.",
  },
  {
    id: "py1-newspapers",
    topic: "News",
    question: "How do you keep up with the news?",
    vocab: [
      ["To scroll through headlines", "Lướt tiêu đề"],
      ["Reliable source", "Nguồn đáng tin"],
      ["Breaking news", "Tin nóng"],
      ["Fake news", "Tin giả"],
    ],
    structures: ["Almost entirely online these days.", "I cross-check anything that...", "My parents still prefer..."],
    ideas: ["VnExpress and BBC", "Push notifications", "Verification habits"],
    model:
      "Almost entirely online these days - I **scroll through headlines** on my phone at breakfast. I stick to **reliable sources** like VnExpress and the BBC, and I always cross-check **breaking news** because there's so much **fake news** on social media.",
  },
  {
    id: "py1-sweets",
    topic: "Food",
    question: "Do you have a sweet tooth?",
    vocab: [
      ["To have a sweet tooth", "Hảo ngọt"],
      ["To cut down on sugar", "Giảm đường"],
      ["A treat", "Món thưởng thức thi thoảng"],
      ["Rich and creamy", "Béo ngậy"],
    ],
    structures: ["Guilty as charged.", "I've been trying to...", "I keep it as **a treat** rather than..."],
    ideas: ["Che and desserts", "Health worries", "Birthday cake"],
    model:
      "Guilty as charged - I definitely **have a sweet tooth**, especially for **rich and creamy** Vietnamese che. I have been trying to **cut down on sugar** though, so now dessert is **a treat** at the weekend rather than a daily habit.",
  },
  {
    id: "py1-pets",
    topic: "Animals",
    question: "Have you ever kept a pet?",
    vocab: [
      ["To look after", "Chăm sóc"],
      ["Loyal companion", "Người bạn trung thành"],
      ["A handful", "Khá vất vả để trông"],
      ["To be attached to", "Gắn bó với"],
    ],
    structures: ["Yes, we've had... for...", "He can be **a handful**, but...", "I'd never have imagined how..."],
    ideas: ["Dog vs cat", "Responsibility for children", "Apartment rules"],
    model:
      "Yes, we've had a dog called Nau for six years. He can be **a handful** when guests arrive, but he's a **loyal companion** and my little brother is incredibly **attached to** him. Having to **look after** an animal taught us both responsibility.",
  },
  {
    id: "py1-decoration",
    topic: "Home",
    question: "Do you like decorating your room?",
    vocab: [
      ["To personalise a space", "Cá nhân hóa không gian"],
      ["Clutter", "Đồ đạc lộn xộn"],
      ["Cosy atmosphere", "Không khí ấm cúng"],
      ["On a budget", "Với ngân sách hạn hẹp"],
    ],
    structures: ["I do, although I'm limited by...", "Small touches like... make a big difference.", "I can't stand..."],
    ideas: ["Fairy lights and posters", "Minimalism", "Rented room limits"],
    model:
      "I do, although I'm renting so I can't paint the walls. Small touches like fairy lights and photos **personalise the space** and create a **cosy atmosphere**, even **on a budget**. What I can't stand is **clutter** on my desk.",
  },
  {
    id: "py1-museumvisit",
    topic: "Museums",
    question: "Do you enjoy visiting museums?",
    vocab: [
      ["Exhibition", "Triển lãm"],
      ["Interactive display", "Trưng bày tương tác"],
      ["To bring history to life", "Làm lịch sử sống động"],
      ["Guided tour", "Chuyến tham quan có hướng dẫn"],
    ],
    structures: ["More than I used to, actually.", "What I appreciate is...", "Without..., it can feel..."],
    ideas: ["Ethnology Museum", "School trips", "Modern technology in museums"],
    model:
      "More than I used to. What I appreciate now are **interactive displays** - the Museum of Ethnology really **brings history to life**. Without a **guided tour**, though, an **exhibition** of old objects can feel a bit dry.",
  },
  {
    id: "py1-drink",
    topic: "Drinks",
    question: "What do you usually drink during the day?",
    vocab: [
      ["To stay hydrated", "Uống đủ nước"],
      ["Caffeine kick", "Cú hích caffeine"],
      ["To cut back on", "Cắt giảm"],
      ["Sugary drinks", "Đồ uống nhiều đường"],
    ],
    structures: ["Mostly..., with the occasional...", "I need... first thing in the morning.", "I've been trying to..."],
    ideas: ["Vietnamese iced coffee", "Green tea", "Water bottle habit"],
    model:
      "Mostly water - I keep a bottle on my desk to **stay hydrated**. I do need one Vietnamese iced coffee for that **caffeine kick** in the morning, but I've been trying to **cut back on** **sugary drinks** like bubble tea.",
  },
  {
    id: "py1-repair",
    topic: "Things & Repairs",
    question: "Do you usually repair things or buy new ones?",
    vocab: [
      ["To be beyond repair", "Hỏng không sửa được"],
      ["Throwaway culture", "Văn hóa vứt bỏ"],
      ["Handy", "Khéo tay"],
      ["To get one's money's worth", "Dùng cho đáng tiền"],
    ],
    structures: ["My first instinct is to...", "It only makes sense to replace something when...", "I dislike the way..."],
    ideas: ["Repair shops in Vietnam", "Phones and laptops", "Environmental cost"],
    model:
      "My first instinct is to repair. My dad is quite **handy**, so we fix fans and bicycles at home and really **get our money's worth**. I only replace something when it's genuinely **beyond repair** - I dislike this **throwaway culture**.",
  },
  {
    id: "py1-mapsapp",
    topic: "Directions",
    question: "Are you good at finding your way in a new place?",
    vocab: [
      ["A good sense of direction", "Định hướng tốt"],
      ["To get lost", "Bị lạc"],
      ["Landmark", "Địa điểm dễ nhận biết"],
      ["To rely on GPS", "Phụ thuộc vào định vị"],
    ],
    structures: ["Not really, which is why...", "I navigate by... rather than...", "Before smartphones, I'd have had to..."],
    ideas: ["Old Quarter alleys", "Asking locals", "Over-reliance on apps"],
    model:
      "Not really - I don't have **a good sense of direction**, so I **rely on GPS** constantly. I navigate by **landmarks** like a big temple rather than street names, and I still **get lost** in the alleys of the Old Quarter.",
  },
  {
    id: "py1-uniform",
    topic: "Clothes",
    question: "Did you wear a uniform at school?",
    vocab: [
      ["School uniform", "Đồng phục"],
      ["To level the playing field", "Tạo sự công bằng"],
      ["To express individuality", "Thể hiện cá tính"],
      ["Smart appearance", "Vẻ ngoài chỉn chu"],
    ],
    structures: ["Yes, throughout...", "At the time I resented it, but...", "The argument in favour is that..."],
    ideas: ["Ao dai on Mondays", "Cost for parents", "Discipline"],
    model:
      "Yes, throughout secondary school, and ao dai every Monday. At the time I resented it, but the argument in favour is strong: a **school uniform** creates a **smart appearance** and **levels the playing field** so nobody is judged by their clothes.",
  },
  {
    id: "py1-relaxsound",
    topic: "Sounds",
    question: "What sounds do you find relaxing?",
    vocab: [
      ["Background noise", "Tiếng nền"],
      ["Soothing", "Êm dịu"],
      ["To block out", "Chặn bớt (âm thanh)"],
      ["Rainfall", "Tiếng mưa rơi"],
    ],
    structures: ["I find... incredibly **soothing**.", "I often play... while...", "The opposite would be..."],
    ideas: ["Rain and waves", "Cafe chatter", "Noise-cancelling headphones"],
    model:
      "I find **rainfall** incredibly **soothing** - I often play it while studying to **block out** the street noise. Gentle cafe chatter works as **background noise** too. The opposite would be a ticking clock, which drives me mad.",
  },
  {
    id: "py1-videocall",
    topic: "Communication",
    question: "Do you prefer video calls or text messages?",
    vocab: [
      ["Face-to-face", "Trực tiếp, mặt đối mặt"],
      ["Tone of voice", "Ngữ điệu giọng nói"],
      ["To be misinterpreted", "Bị hiểu nhầm"],
      ["At one's convenience", "Vào lúc thuận tiện"],
    ],
    structures: ["For everyday things I'd choose..., but...", "Text can easily...", "There's no substitute for..."],
    ideas: ["Family abroad", "Work updates", "Emoji and tone"],
    model:
      "For everyday things I'd choose texting because I can reply **at my convenience**. But a message can easily **be misinterpreted** without **tone of voice**, so for anything emotional there's no substitute for a video call - it's the closest thing to **face-to-face**.",
  },
  {
    id: "py1-goals",
    topic: "Goals",
    question: "Do you set goals for yourself?",
    vocab: [
      ["Realistic target", "Mục tiêu khả thi"],
      ["To keep track of progress", "Theo dõi tiến độ"],
      ["Short-term goal", "Mục tiêu ngắn hạn"],
      ["To stay motivated", "Giữ động lực"],
    ],
    structures: ["I do, though I try to keep them...", "Breaking things down into... helps me...", "Otherwise I tend to..."],
    ideas: ["IELTS band target", "Fitness", "To-do lists"],
    model:
      "I do, though I keep them **realistic**. Breaking a big aim like IELTS 7.0 into **short-term goals** - twenty words a day - helps me **stay motivated**, and I **keep track of progress** in a notebook. Otherwise I tend to give up by week two.",
  },
  {
    id: "py1-mathsschool",
    topic: "School Subjects",
    question: "What was your favourite subject at school?",
    vocab: [
      ["To have a knack for", "Có khiếu về"],
      ["Hands-on", "Thực hành"],
      ["Rote learning", "Học vẹt"],
      ["To bring out the best in someone", "Khơi dậy điều tốt nhất ở ai"],
    ],
    structures: ["Without question, it was...", "The teacher really...", "Unlike..., it wasn't just about..."],
    ideas: ["Good teacher effect", "Experiments", "Memorisation culture"],
    model:
      "Without question it was chemistry, because the lessons were **hands-on**. My teacher **brought out the best in me** and I discovered I **had a knack for** problem solving. Unlike history, it wasn't just **rote learning**.",
  },
  {
    id: "py1-crowds",
    topic: "Places",
    question: "Do you like crowded places?",
    vocab: [
      ["Hustle and bustle", "Sự náo nhiệt"],
      ["Overwhelming", "Choáng ngợp"],
      ["Peak season", "Mùa cao điểm"],
      ["To avoid the crowds", "Tránh đông người"],
    ],
    structures: ["In small doses, yes.", "For a couple of hours it's..., but after that...", "I'd rather go... to..."],
    ideas: ["Night markets", "Festivals", "Early morning trips"],
    model:
      "In small doses, yes - I enjoy the **hustle and bustle** of a night market. After a couple of hours, though, it becomes **overwhelming**. During **peak season** I'd rather set off early to **avoid the crowds** completely.",
  },
  {
    id: "py1-borrowing",
    topic: "Money",
    question: "Do you keep track of how you spend your money?",
    vocab: [
      ["To budget", "Lập ngân sách"],
      ["To live within one's means", "Chi tiêu trong khả năng"],
      ["Rainy day fund", "Quỹ dự phòng"],
      ["To splash out", "Chi mạnh tay"],
    ],
    structures: ["Reasonably carefully, yes.", "I put aside... every month for...", "Once in a while I'll..."],
    ideas: ["Student budget", "Saving apps", "Spending on travel"],
    model:
      "Reasonably carefully, yes - I use an app to **budget** each week so that I **live within my means**. I put a little aside every month as a **rainy day fund**, but once in a while I'll **splash out** on a concert ticket.",
  },
];

// ===================== PART 2 (cue cards) =====================
const p2: Seed2[] = [
  {
    id: "py2-app-changed",
    topic: "Technology",
    question: "Describe an app that has changed the way you do something.",
    prompts: CUE_PROMPTS("What the app is", "How you found it", "How you use it", "Why it has changed things for you"),
    vocab: [
      ["Game-changer", "Thứ thay đổi cuộc chơi"],
      ["Intuitive design", "Thiết kế trực quan"],
      ["To streamline", "Tinh gọn quy trình"],
      ["To keep me accountable", "Giúp tôi có trách nhiệm"],
      ["Free of charge", "Miễn phí"],
    ],
    structures: ["The app I'd like to talk about is...", "I stumbled across it when...", "What makes it so useful is that...", "Looking back, it has genuinely..."],
    ideas: ["Anki, Notion, Google Maps", "Before-and-after contrast", "One concrete example of use"],
    model:
      "The app I'd like to talk about is Anki, a flashcard app I stumbled across while searching for IELTS tips. Its **intuitive design** means I can add a word in seconds, and its spaced repetition **streamlines** my revision so I only review what I'm about to forget. It's completely **free of charge** and, more importantly, it **keeps me accountable** with a daily streak. Before Anki I'd write vocabulary in a notebook and never open it again; now I retain around eighty per cent of new words, so it's been a real **game-changer** for my English.",
  },
  {
    id: "py2-difficult-decision-study",
    topic: "Life Choices",
    question: "Describe a difficult choice you had to make about your education.",
    prompts: CUE_PROMPTS("What the choice was", "What the options were", "How you decided", "How you feel about it now"),
    vocab: [
      ["To weigh up the pros and cons", "Cân nhắc lợi hại"],
      ["A crossroads", "Ngã rẽ quan trọng"],
      ["To follow one's gut", "Nghe theo trực giác"],
      ["Peer pressure", "Áp lực từ bạn bè"],
      ["In hindsight", "Nhìn lại"],
    ],
    structures: ["I found myself at **a crossroads** when...", "On the one hand..., on the other...", "In the end I decided to...", "**In hindsight**, it was the right call because..."],
    ideas: ["Major selection", "Family expectations", "Financial factors"],
    model:
      "I found myself at **a crossroads** in my final year of high school when I had to choose between medicine, which my parents wanted, and information technology. I spent weeks **weighing up the pros and cons**: medicine offered prestige and job security, while IT matched my genuine interests and needed a shorter degree. There was quite a lot of **peer pressure** too, since most of my top-set classmates applied for medicine. In the end I talked honestly with my father and **followed my gut**. **In hindsight** it was absolutely the right call, because I enjoy my coursework and I've already had a paid internship.",
  },
  {
    id: "py2-street-food",
    topic: "Food",
    question: "Describe a place where you like to eat street food.",
    prompts: CUE_PROMPTS("Where it is", "What they serve", "Who you go with", "Why you like it"),
    vocab: [
      ["A hole-in-the-wall place", "Quán nhỏ giản dị"],
      ["Piping hot", "Nóng hổi"],
      ["Regulars", "Khách quen"],
      ["Bursting with flavour", "Đậm đà hương vị"],
      ["Value for money", "Đáng đồng tiền"],
    ],
    structures: ["The spot I have in mind is...", "It's nothing fancy - just...", "The owner has been... for...", "The reason I keep going back is..."],
    ideas: ["Bun cha or banh mi stall", "Plastic stools atmosphere", "Price comparison"],
    model:
      "The spot I have in mind is **a hole-in-the-wall place** on my street selling bun cha. It's nothing fancy - a charcoal grill, plastic stools and four tables - but the pork patties come **piping hot** and the broth is **bursting with flavour**. The owner has been cooking there for over twenty years and knows all her **regulars** by name, including me and my two flatmates. At forty thousand dong a bowl it's incredible **value for money**, and honestly the atmosphere of eating on the pavement is half the reason I keep going back.",
  },
  {
    id: "py2-piece-of-advice",
    topic: "People",
    question: "Describe a piece of advice you received that you still remember.",
    prompts: CUE_PROMPTS("Who gave it", "What the advice was", "Why they gave it", "How it affected you"),
    vocab: [
      ["Words of wisdom", "Lời khuyên sâu sắc"],
      ["To take something to heart", "Ghi nhớ trong lòng"],
      ["A turning point", "Bước ngoặt"],
      ["To second-guess oneself", "Tự nghi ngờ bản thân"],
      ["Down-to-earth", "Giản dị, thực tế"],
    ],
    structures: ["The advice came from...", "At the time I was...", "What she said was simply...", "I've **taken it to heart** ever since because..."],
    ideas: ["Teacher or grandparent", "Exam failure context", "Concrete change in behaviour"],
    model:
      "The advice came from my aunt, who is the most **down-to-earth** person in my family. At the time I'd failed a scholarship interview and kept **second-guessing myself**. She said something very simple: 'Compare yourself with who you were last month, not with the best person in the room.' Those **words of wisdom** were a genuine **turning point** - I stopped scrolling through other people's achievements and started keeping a small progress journal. I've **taken it to heart** ever since, and my confidence in speaking English has improved enormously as a result.",
  },
  {
    id: "py2-old-object",
    topic: "Objects",
    question: "Describe an old object your family has kept for a long time.",
    prompts: CUE_PROMPTS("What it is", "Where it came from", "What it looks like", "Why the family keeps it"),
    vocab: [
      ["Family heirloom", "Vật gia truyền"],
      ["Worn with age", "Cũ đi theo năm tháng"],
      ["To pass down", "Truyền lại"],
      ["Sentimental value", "Giá trị tinh thần"],
      ["A reminder of", "Lời nhắc về"],
    ],
    structures: ["The object I'd like to describe is...", "It was **passed down** from...", "Physically, it's...", "We keep it because..."],
    ideas: ["Watch, sewing machine, photograph", "War or migration story", "Displayed on the altar"],
    model:
      "The object I'd like to describe is my grandfather's pocket watch, a genuine **family heirloom**. He bought it in Hue in the 1960s and it was **passed down** to my father and eventually to me. It's a small silver watch, clearly **worn with age**: the glass is scratched and the strap has been replaced twice. It hasn't kept accurate time for years, so its worth is purely **sentimental value**. We keep it in a wooden box beside the family altar as **a reminder of** how hard my grandparents worked, and I plan to give it to my own children one day.",
  },
  {
    id: "py2-outdoor-place",
    topic: "Places",
    question: "Describe an outdoor place you like to go to relax.",
    prompts: CUE_PROMPTS("Where it is", "How often you go", "What you do there", "Why it relaxes you"),
    vocab: [
      ["Off the beaten track", "Ít người biết đến"],
      ["Breathtaking view", "Khung cảnh ngoạn mục"],
      ["To recharge one's batteries", "Nạp lại năng lượng"],
      ["Peace and quiet", "Yên bình tĩnh lặng"],
      ["A stone's throw away", "Rất gần"],
    ],
    structures: ["The place I'd like to talk about is...", "It's only **a stone's throw away** from...", "Typically I'll...", "It's the perfect place to..."],
    ideas: ["Lake, hill, riverside", "Sunset walks", "Contrast with city stress"],
    model:
      "The place I'd like to talk about is a small lake about twenty minutes from my house - **a stone's throw away** by bike but far enough to feel **off the beaten track**. I go most Sunday evenings. Typically I'll walk one lap, sit on a bench with iced tea and watch the sunset, which gives a genuinely **breathtaking view** when the sky turns orange over the water. What I value most is the **peace and quiet**: no traffic, no notifications, just a few old men fishing. Half an hour there is enough to **recharge my batteries** for the whole week.",
  },
  {
    id: "py2-team-success",
    topic: "Work & Study",
    question: "Describe a time when you worked well as part of a team.",
    prompts: CUE_PROMPTS("What the task was", "Who was in the team", "What your role was", "Why it went well"),
    vocab: [
      ["To play to our strengths", "Phát huy thế mạnh"],
      ["To delegate tasks", "Phân công công việc"],
      ["A tight deadline", "Hạn chót gấp"],
      ["To pull together", "Chung sức"],
      ["Constructive feedback", "Góp ý mang tính xây dựng"],
    ],
    structures: ["I'd like to describe... when...", "There were four of us, each...", "My responsibility was...", "The reason it worked so well was..."],
    ideas: ["University presentation", "Volunteer event", "Hackathon"],
    model:
      "I'd like to describe a marketing presentation I did last semester under **a tight deadline** of just five days. There were four of us and we deliberately **played to our strengths**: one was excellent at design, another at data, while I structured the argument and presented. We **delegated tasks** in the first meeting and used a shared document so nobody duplicated work. Crucially, everyone gave **constructive feedback** rather than criticism, and when one member fell ill we simply **pulled together** and covered her slides. We scored the highest mark in the class, and I learnt that clear roles matter more than talent.",
  },
  {
    id: "py2-changed-mind",
    topic: "Experiences",
    question: "Describe a time when you changed your opinion about something.",
    prompts: CUE_PROMPTS("What you used to think", "What changed your mind", "How you feel now", "What you learnt"),
    vocab: [
      ["To have a change of heart", "Thay đổi suy nghĩ"],
      ["Preconception", "Định kiến"],
      ["Eye-opening", "Mở mang tầm mắt"],
      ["To see things from another angle", "Nhìn từ góc độ khác"],
      ["Open-minded", "Cởi mở"],
    ],
    structures: ["I used to be convinced that...", "That changed when...", "The experience was genuinely **eye-opening**...", "Now I'd say..."],
    ideas: ["Vegetarian food", "Online learning", "A stereotype about a place"],
    model:
      "I used to be convinced that online learning was a poor substitute for the classroom - a real **preconception** on my part. That changed during the pandemic when I took a data course taught by a professor in Singapore. Being able to rewind explanations and ask questions in a forum was genuinely **eye-opening**, and I performed better than in some face-to-face subjects. I had a complete **change of heart** and now I'd say the format matters far less than the teacher. More broadly, it taught me to stay **open-minded** and **see things from another angle** before dismissing them.",
  },
  {
    id: "py2-helpful-website",
    topic: "Technology",
    question: "Describe a website you often use for studying.",
    prompts: CUE_PROMPTS("What the website is", "How you use it", "What features it has", "Why you recommend it"),
    vocab: [
      ["A goldmine of information", "Kho thông tin quý"],
      ["Bite-sized lessons", "Bài học ngắn gọn"],
      ["To brush up on", "Ôn lại"],
      ["Ad-free", "Không quảng cáo"],
      ["Self-paced", "Tự điều chỉnh tốc độ"],
    ],
    structures: ["The site I use most is...", "I visit it roughly... to...", "The feature I like best is...", "I'd recommend it to anyone who..."],
    ideas: ["Practice tests", "Progress tracking", "Community forum"],
    model:
      "The site I use most is a free IELTS practice platform my teacher recommended. I visit it about four evenings a week to **brush up on** reading skills. It's **a goldmine of information**: full mock tests with timers, **bite-sized lessons** on each question type and, best of all, detailed explanations for every answer. The lessons are **self-paced**, so I can do one at midnight if I want, and the whole thing is **ad-free**, which keeps me focused. I'd recommend it to anyone who cannot afford a private tutor, because it gives structure without costing anything.",
  },
  {
    id: "py2-noisy-neighbour",
    topic: "Problems",
    question: "Describe a problem you had with a neighbour or a housemate.",
    prompts: CUE_PROMPTS("What the problem was", "How long it lasted", "How you dealt with it", "How it ended"),
    vocab: [
      ["To have a word with someone", "Nói chuyện thẳng thắn"],
      ["To lose one's temper", "Mất bình tĩnh"],
      ["A compromise", "Sự thỏa hiệp"],
      ["To clear the air", "Làm rõ hiểu lầm"],
      ["Considerate", "Biết nghĩ cho người khác"],
    ],
    structures: ["The issue arose when...", "It went on for about...", "Rather than..., I decided to...", "In the end we reached..."],
    ideas: ["Late-night karaoke", "Shared kitchen", "Politeness strategy"],
    model:
      "The issue arose last year when the family above us started karaoke sessions that ran until midnight. It went on for about three weeks and I was exhausted before exams. Rather than complaining to the building manager or **losing my temper**, I decided to **have a word with** the father directly, taking a box of fruit with me. We **cleared the air** quite quickly - he had no idea the sound carried so badly. We reached **a compromise**: singing is fine, but it stops at ten. He turned out to be very **considerate**, and we've been on good terms ever since.",
  },
  {
    id: "py2-childhood-teacher",
    topic: "People",
    question: "Describe a teacher from your childhood who you still remember.",
    prompts: CUE_PROMPTS("Who the teacher was", "What they taught", "What they were like", "Why you remember them"),
    vocab: [
      ["To have a lasting impact", "Ảnh hưởng lâu dài"],
      ["Strict but fair", "Nghiêm nhưng công bằng"],
      ["To spark an interest", "Khơi dậy niềm đam mê"],
      ["To go the extra mile", "Làm hơn cả trách nhiệm"],
      ["Patient", "Kiên nhẫn"],
    ],
    structures: ["The teacher I'd like to talk about is...", "She taught me... when I was...", "What set her apart was...", "She has **had a lasting impact** because..."],
    ideas: ["Extra lessons for free", "Encouraging a shy student", "Career influence"],
    model:
      "The teacher I'd like to talk about is Mrs Lan, my English teacher in grade six. She was **strict but fair**: homework had to be on time, yet she never humiliated anyone for a wrong answer. What set her apart was that she **went the extra mile** - she ran a free Saturday club where we sang songs and acted out dialogues, and that's exactly what **sparked my interest** in the language. She was extremely **patient** with me because I was too shy to speak. She has **had a lasting impact** on my life; without those Saturdays I doubt I'd be preparing for IELTS today.",
  },
  {
    id: "py2-money-saved",
    topic: "Money",
    question: "Describe something you saved money for over a long time.",
    prompts: CUE_PROMPTS("What it was", "How long you saved", "How you managed to save", "How you felt when you bought it"),
    vocab: [
      ["To put money aside", "Để dành tiền"],
      ["To cut down on spending", "Cắt giảm chi tiêu"],
      ["Worth every penny", "Đáng từng đồng"],
      ["A sense of achievement", "Cảm giác thành tựu"],
      ["Part-time job", "Việc làm bán thời gian"],
    ],
    structures: ["The thing I saved up for was...", "It took me roughly...", "To make it possible, I...", "When I finally..., I felt..."],
    ideas: ["Laptop, trip, camera", "Tutoring income", "Delayed gratification"],
    model:
      "The thing I saved up for was a second-hand laptop for my design course. It took me roughly eight months. To make it possible I took a **part-time job** tutoring two secondary students at weekends and **put money aside** the day I was paid, before I could spend it. I also **cut down on spending** in obvious places - bubble tea, taxis and new clothes. When I finally handed over the cash I felt an enormous **sense of achievement**, far greater than if my parents had simply bought it. Three years on, it still runs perfectly, so it was **worth every penny**.",
  },
  {
    id: "py2-tradition",
    topic: "Culture",
    question: "Describe a tradition in your country that you enjoy.",
    prompts: CUE_PROMPTS("What the tradition is", "When it takes place", "What people do", "Why you enjoy it"),
    vocab: [
      ["To be deeply rooted in", "Ăn sâu vào"],
      ["To pay respects to ancestors", "Tưởng nhớ tổ tiên"],
      ["Festive atmosphere", "Không khí lễ hội"],
      ["To hand down through generations", "Lưu truyền qua các thế hệ"],
      ["Reunion", "Sum họp"],
    ],
    structures: ["The tradition I'd like to describe is...", "It takes place every...", "The preparation involves...", "For me the best part is..."],
    ideas: ["Tet, Mid-Autumn Festival", "Banh chung wrapping", "Family gathering"],
    model:
      "The tradition I'd like to describe is Tet, our lunar new year, which is **deeply rooted in** Vietnamese culture. It takes place in late January or February and lasts about a week. Preparation involves cleaning the whole house, wrapping banh chung and **paying respects to ancestors** at the family altar - customs **handed down through generations**. The **festive atmosphere** is unmistakable: peach blossom on every corner and children in new clothes receiving lucky money. For me, though, the best part is the **reunion**: relatives who work in Saigon or abroad come home, and for a few days the whole family eats together again.",
  },
  {
    id: "py2-risk-taken",
    topic: "Experiences",
    question: "Describe a risk you took that turned out well.",
    prompts: CUE_PROMPTS("What the risk was", "Why you took it", "What could have gone wrong", "What the outcome was"),
    vocab: [
      ["To step out of one's comfort zone", "Bước ra vùng an toàn"],
      ["To take the plunge", "Liều một phen"],
      ["To pay off", "Đem lại kết quả"],
      ["Nerve-racking", "Căng thẳng, hồi hộp"],
      ["Calculated risk", "Rủi ro có tính toán"],
    ],
    structures: ["The risk I took was...", "I did it because...", "It was **nerve-racking** at the time since...", "Fortunately it **paid off**..."],
    ideas: ["Public speaking contest", "Changing city", "Starting a small business"],
    model:
      "The risk I took was entering an English speaking contest in my first year, even though I had never spoken in front of a large audience. I did it because a friend argued that my accent would only improve if I **stepped out of my comfort zone**. It was genuinely **nerve-racking**: I could have frozen on stage or forgotten my notes in front of three hundred people. Still, it was a **calculated risk** - I practised with my teacher for a fortnight first. In the end I **took the plunge**, came third, and the confidence I gained **paid off** in every class presentation since.",
  },
  {
    id: "py2-photograph",
    topic: "Objects",
    question: "Describe a photograph that means a lot to you.",
    prompts: CUE_PROMPTS("What is in the photo", "When it was taken", "Who took it", "Why it is special"),
    vocab: [
      ["To capture a moment", "Ghi lại khoảnh khắc"],
      ["Faded", "Bạc màu"],
      ["To bring back memories", "Gợi lại ký ức"],
      ["Candid", "Tự nhiên, không dàn dựng"],
      ["Framed", "Được lồng khung"],
    ],
    structures: ["The photograph I've chosen shows...", "It was taken in... by...", "It's a completely **candid** shot, which...", "Every time I look at it, it..."],
    ideas: ["Graduation, grandparents, travel", "Story behind the shot", "Where it is kept"],
    model:
      "The photograph I've chosen shows my grandmother laughing in her garden with my little cousin on her lap. It was taken about six years ago by my uncle on an old digital camera, so the colours are slightly **faded**. It's a completely **candid** shot - nobody was posing, which is exactly why it **captures the moment** so well. My grandmother passed away two years later, so the picture is now **framed** on the wall in our living room. Every time I look at it, it **brings back memories** of long summers at her house, and it reminds me to visit relatives while I still can.",
  },
  {
    id: "py2-course-take",
    topic: "Learning",
    question: "Describe a course or subject you would like to study in the future.",
    prompts: CUE_PROMPTS("What it is", "Where you would study it", "Why you are interested", "How it would help you"),
    vocab: [
      ["To broaden one's horizons", "Mở rộng tầm nhìn"],
      ["Cutting-edge", "Tiên tiến nhất"],
      ["Career prospects", "Triển vọng nghề nghiệp"],
      ["Hands-on training", "Đào tạo thực hành"],
      ["Tuition fees", "Học phí"],
    ],
    structures: ["The course I'd love to take is...", "Ideally I'd study it at...", "My interest began when...", "In career terms it would..."],
    ideas: ["Data science, UX design, teaching", "Scholarship plan", "Industry demand"],
    model:
      "The course I'd love to take is a master's in data science, ideally in Finland, where **tuition fees** for EU-funded programmes are relatively low and the teaching is **cutting-edge**. My interest began when I automated a spreadsheet at my part-time job and realised how much time good analysis saves. Such a programme would give me **hands-on training** with real datasets rather than pure theory, and it would clearly improve my **career prospects**, since almost every Vietnamese bank is now hiring analysts. Studying abroad would also **broaden my horizons** culturally, which matters just as much to me.",
  },
  {
    id: "py2-song-meaning",
    topic: "Music",
    question: "Describe a song that has a special meaning for you.",
    prompts: CUE_PROMPTS("What the song is", "When you first heard it", "What it is about", "Why it matters to you"),
    vocab: [
      ["Catchy melody", "Giai điệu bắt tai"],
      ["Meaningful lyrics", "Ca từ ý nghĩa"],
      ["To strike a chord", "Chạm đến cảm xúc"],
      ["To lift one's spirits", "Nâng đỡ tinh thần"],
      ["Nostalgic", "Hoài niệm"],
    ],
    structures: ["The song I'd like to talk about is...", "I first heard it when...", "Musically it's..., but what matters is...", "It **struck a chord** with me because..."],
    ideas: ["Exam period", "Family memory", "Motivational lyrics"],
    model:
      "The song I'd like to talk about is 'Duong Den Ngay Vinh Quang', a Vietnamese rock classic. I first heard it properly during grade twelve, when the whole class sang it before the national exam. Musically it has a **catchy melody**, but it's the **meaningful lyrics** about walking a hard road towards your own glory that really **struck a chord** with me. Whenever revision felt hopeless, playing it would **lift my spirits** within a minute. It's quite **nostalgic** now - I can't hear the opening guitar without picturing that classroom and my friends shouting the chorus.",
  },
  {
    id: "py2-helped-stranger",
    topic: "People",
    question: "Describe a time when you helped someone you did not know.",
    prompts: CUE_PROMPTS("Who the person was", "What the situation was", "What you did", "How you felt afterwards"),
    vocab: [
      ["To lend a hand", "Giúp một tay"],
      ["In distress", "Đang gặp khó khăn"],
      ["Random act of kindness", "Hành động tử tế ngẫu nhiên"],
      ["To go out of one's way", "Chịu khó, không ngại phiền"],
      ["Grateful", "Biết ơn"],
    ],
    structures: ["This happened about... when...", "I noticed that...", "Without really thinking, I...", "Afterwards I felt..."],
    ideas: ["Tourist lost", "Elderly person", "Broken-down motorbike"],
    model:
      "This happened last rainy season near my university. I noticed an elderly woman clearly **in distress**, pushing a motorbike that had stalled in a flooded street while cars splashed past her. Without really thinking, I parked mine and helped her push it two hundred metres to a repair shop, and I paid the mechanic's fifty-thousand-dong fee because she had left her purse at home. It only cost me twenty minutes, but I had to **go out of my way** and I got soaked. She was extremely **grateful** and kept insisting on my phone number. Afterwards I felt genuinely lighter - that small **random act of kindness** improved my whole week.",
  },
  {
    id: "py2-busy-time",
    topic: "Experiences",
    question: "Describe a period when you were extremely busy.",
    prompts: CUE_PROMPTS("When it was", "Why you were busy", "How you coped", "What you learnt from it"),
    vocab: [
      ["To be snowed under", "Ngập trong công việc"],
      ["To juggle commitments", "Xoay xở nhiều việc"],
      ["To prioritise", "Ưu tiên"],
      ["Burnout", "Kiệt sức"],
      ["To keep on top of things", "Kiểm soát được mọi việc"],
    ],
    structures: ["The busiest period of my life was...", "I was **juggling**... at the same time.", "To cope, I started...", "The main lesson was..."],
    ideas: ["Final exams plus internship", "Time-blocking", "Sleep sacrifice"],
    model:
      "The busiest period of my life was last November, when I was **snowed under** with final exams, a part-time internship and organising a charity event for my student club. I was **juggling** three sets of deadlines and sleeping about five hours a night. To cope, I started time-blocking my calendar every Sunday and learnt to **prioritise** ruthlessly - anything that wasn't urgent or important simply got postponed. I also delegated half the event tasks, which I'd never done before. I got through it and even scored well, but I came close to **burnout**, so the real lesson was that saying no is what keeps you **on top of things**.",
  },
  {
    id: "py2-childhood-place",
    topic: "Places",
    question: "Describe a place from your childhood that you remember well.",
    prompts: CUE_PROMPTS("Where it was", "What it looked like", "What you did there", "Why you remember it"),
    vocab: [
      ["Vivid memory", "Ký ức sống động"],
      ["Rural", "Thuộc nông thôn"],
      ["To roam freely", "Chạy nhảy tự do"],
      ["Unspoilt", "Còn nguyên sơ"],
      ["To hold a special place in one's heart", "Có vị trí đặc biệt trong tim"],
    ],
    structures: ["The place I remember most vividly is...", "Picture a...", "We used to spend hours...", "It **holds a special place in my heart** because..."],
    ideas: ["Grandparents' village", "Rice fields and river", "How it has changed"],
    model:
      "The place I remember most vividly is my grandparents' village in Nam Dinh, where I spent every summer until I was twelve. Picture a **rural** lane with bamboo on both sides, rice fields stretching to the horizon and a muddy river at the end. My cousins and I would **roam freely** all day - catching crickets, swimming in the river and coming home only when the smoke from the kitchen appeared. It was completely **unspoilt** then; today there's a concrete road and half the young people have moved to the city. Those summers are my most **vivid memories**, so the village **holds a special place in my heart**.",
  },
  {
    id: "py2-skill-learn-online",
    topic: "Learning",
    question: "Describe a skill you learnt from the internet.",
    prompts: CUE_PROMPTS("What the skill is", "How you learnt it", "How long it took", "How useful it has been"),
    vocab: [
      ["Step-by-step tutorial", "Hướng dẫn từng bước"],
      ["Trial and error", "Thử và sai"],
      ["To get the hang of", "Thành thạo dần"],
      ["Transferable skill", "Kỹ năng có thể áp dụng rộng"],
      ["At my own pace", "Theo tốc độ của tôi"],
    ],
    structures: ["The skill I picked up online is...", "I learnt it mainly through...", "It took about... before I...", "It's proved useful because..."],
    ideas: ["Video editing, cooking, coding", "YouTube playlists", "Freelance income"],
    model:
      "The skill I picked up online is video editing. I learnt it during lockdown, mainly through **step-by-step tutorials** on YouTube and a lot of **trial and error** with free software. It took roughly three months of practising a few evenings a week before I really **got the hang of** pacing and transitions, and I could work **at my own pace**, which suited me. It's turned out to be extremely useful: I now edit clips for my university's fan page and I've earned some pocket money making wedding videos. It's also a **transferable skill**, since storytelling matters in presentations too.",
  },
  {
    id: "py2-crowded-event",
    topic: "Events",
    question: "Describe a crowded event you attended.",
    prompts: CUE_PROMPTS("What the event was", "Where and when it took place", "Who you went with", "How you felt about the crowd"),
    vocab: [
      ["Packed", "Chật kín"],
      ["An electric atmosphere", "Không khí bùng nổ"],
      ["To be swept along", "Bị cuốn theo dòng người"],
      ["Overwhelming", "Choáng ngợp"],
      ["Once in a lifetime", "Có một không hai"],
    ],
    structures: ["The event I'd like to describe is...", "It was held at... on...", "The place was absolutely **packed** -...", "Despite the crowd, ..."],
    ideas: ["Football final celebration", "Concert", "New Year fireworks"],
    model:
      "The event I'd like to describe is the street celebration after Vietnam won the AFF Cup. It was held everywhere really, but I was on Nguyen Hue Street in Ho Chi Minh City with four university friends. The place was absolutely **packed** - I've never seen so many red flags - and at times we were simply **swept along** by the crowd rather than walking. The **atmosphere was electric**: strangers hugging, drums, motorbike horns in rhythm. It was slightly **overwhelming** and we lost one friend for an hour, but it still felt like a **once in a lifetime** night of collective happiness.",
  },
  {
    id: "py2-magazine-article",
    topic: "Media",
    question: "Describe an article or a piece of news that interested you.",
    prompts: CUE_PROMPTS("What it was about", "Where you read it", "What you learnt", "Why it interested you"),
    vocab: [
      ["To come across", "Tình cờ thấy"],
      ["In-depth analysis", "Phân tích chuyên sâu"],
      ["Thought-provoking", "Gợi nhiều suy nghĩ"],
      ["To shed light on", "Làm sáng tỏ"],
      ["Statistics", "Số liệu thống kê"],
    ],
    structures: ["The article I'd like to talk about is...", "I **came across** it while...", "It **shed light on**...", "I found it **thought-provoking** because..."],
    ideas: ["Climate report", "AI in education", "Local urban planning"],
    model:
      "The article I'd like to talk about examined how artificial intelligence is being used in Vietnamese classrooms. I **came across** it while scrolling through VnExpress on the bus. It offered genuinely **in-depth analysis** rather than hype, with **statistics** showing that around forty per cent of teachers surveyed already use AI to prepare lessons, yet very few have had any training. It **shed light on** a gap I'd never considered - the tools exist, but the support doesn't. I found it **thought-provoking** because I want to work in education technology, and it convinced me that teacher training is where the real opportunity lies.",
  },
  {
    id: "py2-goal-achieved",
    topic: "Achievements",
    question: "Describe a goal you set and achieved.",
    prompts: CUE_PROMPTS("What the goal was", "Why you set it", "What you did to achieve it", "How you felt"),
    vocab: [
      ["To set one's sights on", "Đặt mục tiêu vào"],
      ["Milestone", "Cột mốc"],
      ["To stick to a plan", "Bám sát kế hoạch"],
      ["Perseverance", "Sự kiên trì"],
      ["To pay off", "Được đền đáp"],
    ],
    structures: ["The goal I'd like to describe is...", "I set it because...", "I broke it down into...", "When I finally achieved it, I..."],
    ideas: ["Running 10km", "Band 7.0", "Saving for a trip"],
    model:
      "The goal I'd like to describe is running ten kilometres without stopping. I **set my sights on** it after realising I got out of breath climbing four flights of stairs. I broke it down into weekly **milestones** using a beginner's plan: three runs a week, adding half a kilometre each time. The hardest part was **sticking to the plan** in the rainy season, when I ran laps in a car park instead. Twelve weeks of **perseverance** finally **paid off** at a charity race, where I finished in just under an hour. Crossing that line felt better than any exam result.",
  },
  {
    id: "py2-argument-resolved",
    topic: "Relationships",
    question: "Describe a disagreement you had with a friend and how you solved it.",
    prompts: CUE_PROMPTS("What the disagreement was about", "How it started", "How you resolved it", "What you learnt"),
    vocab: [
      ["To fall out with someone", "Giận nhau với ai"],
      ["To see eye to eye", "Đồng quan điểm"],
      ["To apologise sincerely", "Xin lỗi chân thành"],
      ["To patch things up", "Làm lành"],
      ["Misunderstanding", "Sự hiểu lầm"],
    ],
    structures: ["We **fell out** over...", "Looking back, it started because...", "After a week of silence, I...", "The experience taught me..."],
    ideas: ["Group project credit", "Borrowed money", "Communication"],
    model:
      "We **fell out** over a group project in second year. My closest friend presented our work and thanked everyone except me, which felt deliberate at the time. Looking back, it was a simple **misunderstanding** - he was nervous and skipped part of his script. We didn't **see eye to eye** for about a week and messages became very short. Eventually I invited him for coffee and explained calmly how it had felt, and he **apologised sincerely** the moment he understood. We **patched things up** that afternoon. The experience taught me to raise problems immediately instead of letting resentment build.",
  },
  {
    id: "py2-public-place-improve",
    topic: "Places",
    question: "Describe a public place in your city that could be improved.",
    prompts: CUE_PROMPTS("What the place is", "How people use it", "What problems it has", "How it could be improved"),
    vocab: [
      ["Run-down", "Xuống cấp"],
      ["Facilities", "Cơ sở vật chất"],
      ["Poorly maintained", "Bảo trì kém"],
      ["To upgrade", "Nâng cấp"],
      ["Accessible", "Dễ tiếp cận"],
    ],
    structures: ["The place I have in mind is...", "It's used mainly by...", "The main problem is that...", "With a modest budget they could..."],
    ideas: ["Local park", "Bus station", "Library"],
    model:
      "The place I have in mind is the small park near my apartment block. It's used mainly by elderly people exercising at dawn and children in the evening. The main problem is that it's rather **run-down**: the **facilities** amount to three broken benches and one rusted swing, the lighting is **poorly maintained**, and there's no ramp, so it isn't **accessible** for wheelchairs. With a fairly modest budget the district could **upgrade** the paths, add solar lights and plant more shade trees. I'd also love to see a simple outdoor gym, because that would attract younger residents in the evening.",
  },
  {
    id: "py2-favourite-app-game",
    topic: "Entertainment",
    question: "Describe a game or sport you enjoy playing.",
    prompts: CUE_PROMPTS("What it is", "When you started", "Who you play with", "Why you enjoy it"),
    vocab: [
      ["To take up a sport", "Bắt đầu chơi môn thể thao"],
      ["Team spirit", "Tinh thần đồng đội"],
      ["To keep fit", "Giữ dáng, khỏe mạnh"],
      ["A stress reliever", "Cách giải tỏa căng thẳng"],
      ["Competitive", "Ganh đua"],
    ],
    structures: ["The sport I enjoy most is...", "I **took it up** when...", "We play every... at...", "For me it's not just about..."],
    ideas: ["Badminton, football, chess", "Friends and routine", "Health benefits"],
    model:
      "The sport I enjoy most is badminton. I **took it up** in high school because the courts near my house were cheap and my father played. Now I play twice a week with three colleagues at a small hall around the corner. For me it isn't just about being **competitive**, although we do keep score - it's the fastest way I know to **keep fit** while chatting with friends, so it doubles as **a stress reliever** after a long day at a screen. The **team spirit** in doubles is what I like best; you win or lose together and there's always a meal afterwards.",
  },
  {
    id: "py2-something-borrowed",
    topic: "Objects",
    question: "Describe something useful you borrowed from someone.",
    prompts: CUE_PROMPTS("What it was", "Who you borrowed it from", "Why you needed it", "What happened in the end"),
    vocab: [
      ["To lend", "Cho mượn"],
      ["To come in handy", "Rất hữu ích"],
      ["To take good care of", "Giữ gìn cẩn thận"],
      ["To return something promptly", "Trả lại đúng hẹn"],
      ["A lifesaver", "Vị cứu tinh"],
    ],
    structures: ["The thing I borrowed was...", "I needed it because...", "It really **came in handy** when...", "I made sure to..."],
    ideas: ["Laptop, camera, bicycle", "Emergency situation", "Trust between friends"],
    model:
      "The thing I borrowed was my cousin's camera for a two-day university event. I needed it because my phone's battery would never have survived a full day of filming and the club had no budget for rental. It really **came in handy**: we captured the whole opening ceremony, and the photos are still used on our fan page, so it was an absolute **lifesaver**. Since it's expensive equipment, I **took good care of** it - kept it in the padded bag and never left it unattended - and I **returned it promptly** on the Monday with a small gift. He's happy to **lend** it to me again, which says everything.",
  },
  {
    id: "py2-quiet-moment",
    topic: "Lifestyle",
    question: "Describe a time when you spent a whole day without the internet.",
    prompts: CUE_PROMPTS("When it was", "Why you had no internet", "What you did instead", "How you felt"),
    vocab: [
      ["Digital detox", "Cai nghiện công nghệ"],
      ["To be disconnected", "Ngắt kết nối"],
      ["Withdrawal", "Cảm giác thiếu vắng"],
      ["To be fully present", "Hiện diện trọn vẹn"],
      ["Refreshing", "Sảng khoái"],
    ],
    structures: ["This happened when...", "At first I found it...", "Instead of..., I ended up...", "By the evening I realised..."],
    ideas: ["Trip to the countryside", "Power cut", "Reading and conversation"],
    model:
      "This happened last summer when I visited my grandmother's village and the signal there is almost non-existent, so I had an accidental **digital detox**. At first I found being **disconnected** surprisingly uncomfortable - I reached for my phone perhaps thirty times before lunch, a kind of **withdrawal**. Instead of scrolling, I ended up helping her in the garden, finishing an entire novel and listening to stories about my late grandfather that I'd never heard. By the evening I realised I had been **fully present** for the first time in months. It was so **refreshing** that I now switch my phone off every Sunday morning.",
  },
  {
    id: "py2-inspiring-person",
    topic: "People",
    question: "Describe a person who inspires you to work harder.",
    prompts: CUE_PROMPTS("Who the person is", "How you know them", "What they have achieved", "Why they inspire you"),
    vocab: [
      ["A role model", "Hình mẫu"],
      ["To work one's way up", "Phấn đấu đi lên"],
      ["Determination", "Sự quyết tâm"],
      ["To lead by example", "Làm gương"],
      ["Humble", "Khiêm tốn"],
    ],
    structures: ["The person who inspires me most is...", "I've known him/her since...", "What impresses me is that...", "He/She **leads by example** by..."],
    ideas: ["Older sibling", "Former colleague", "Overcoming hardship"],
    model:
      "The person who inspires me most is my older sister. She left our small town at eighteen with almost no English and **worked her way up** from a call-centre job to managing a team of fifteen at a logistics firm. What impresses me is her sheer **determination**: for three years she studied online from ten at night until one in the morning after full shifts. Despite her success she remains completely **humble** - she still sends money home and never talks about her salary. She **leads by example** rather than lecturing me, and whenever I feel like postponing revision, I think of those late nights and open my book.",
  },
  {
    id: "py2-plan-changed",
    topic: "Experiences",
    question: "Describe a time when your plans were changed at the last minute.",
    prompts: CUE_PROMPTS("What the original plan was", "What happened", "How you reacted", "What the result was"),
    vocab: [
      ["To fall through", "Đổ bể"],
      ["At short notice", "Ngay sát giờ"],
      ["To improvise", "Ứng biến"],
      ["A blessing in disguise", "Trong rủi có may"],
      ["To adapt", "Thích nghi"],
    ],
    structures: ["We had originally planned to...", "Then, **at short notice**,...", "Rather than cancelling, we...", "It turned out to be..."],
    ideas: ["Trip cancelled by weather", "Venue problem", "Unexpected upside"],
    model:
      "We had originally planned a three-day trip to Sapa for my birthday last October. Two days before, a storm warning was issued and the coach company cancelled, so the whole plan **fell through** **at short notice**. I was quite upset, but rather than cancelling altogether, we **improvised**: my friends brought food to my flat, we cooked hotpot and watched films all night. In the end it turned out to be **a blessing in disguise** - it cost a tenth of the trip, nobody spent nine hours on a bus, and we talked far more than we would have done sightseeing. It taught me to **adapt** quickly instead of complaining.",
  },
  {
    id: "py2-local-business",
    topic: "Business",
    question: "Describe a small local business you like.",
    prompts: CUE_PROMPTS("What the business is", "Where it is", "What it sells or offers", "Why you like it"),
    vocab: [
      ["Family-run", "Gia đình tự kinh doanh"],
      ["Loyal customers", "Khách hàng trung thành"],
      ["Personal touch", "Sự chăm chút cá nhân"],
      ["To support local businesses", "Ủng hộ doanh nghiệp địa phương"],
      ["Reasonably priced", "Giá cả hợp lý"],
    ],
    structures: ["The business I'd like to talk about is...", "It's been **family-run** for...", "What sets it apart is...", "I keep going back because..."],
    ideas: ["Bookshop, bakery, tailor", "Owner's personality", "Chain store contrast"],
    model:
      "The business I'd like to talk about is a tiny **family-run** bookshop two streets from my university. It's been open for nearly thirty years and is now run by the founder's daughter. It sells second-hand English novels and textbooks, all **reasonably priced**, and they'll order anything they don't have. What sets it apart from the big chains is the **personal touch**: the owner remembers what I bought last time and puts similar titles aside for me. That's why they have such **loyal customers**. I make a point of **supporting local businesses** like this, because if they close, the street loses its character.",
  },
  {
    id: "py2-tired-journey",
    topic: "Travel",
    question: "Describe a long journey you found tiring.",
    prompts: CUE_PROMPTS("Where you went", "How you travelled", "Why it was tiring", "How you felt on arrival"),
    vocab: [
      ["Exhausting", "Mệt lử"],
      ["A stopover", "Điểm dừng chân"],
      ["Cramped", "Chật chội"],
      ["Jet lag", "Lệch múi giờ"],
      ["To catch up on rest", "Nghỉ bù"],
    ],
    structures: ["The journey I'd like to describe is...", "It involved... and took about...", "What made it so **exhausting** was...", "By the time I arrived, I..."],
    ideas: ["Overnight bus", "Long-haul flight", "Delays"],
    model:
      "The journey I'd like to describe is an overnight bus from Hanoi to Da Nang that I took two summers ago. It involved sixteen hours in a **cramped** sleeper berth designed for someone considerably shorter than me. What made it so **exhausting** was the combination of the driver's horn every few minutes, freezing air conditioning and a two-hour **stopover** at three in the morning. I probably slept ninety minutes in total. By the time I arrived I felt something close to **jet lag**, even though there's no time difference, and I had to **catch up on rest** for most of the first day. I now happily pay more for the train.",
  },
  {
    id: "py2-improve-community",
    topic: "Society",
    question: "Describe something you have done to help your local community.",
    prompts: CUE_PROMPTS("What you did", "When and where", "Who else was involved", "What difference it made"),
    vocab: [
      ["To volunteer", "Tình nguyện"],
      ["To raise awareness", "Nâng cao nhận thức"],
      ["Grassroots initiative", "Sáng kiến từ cơ sở"],
      ["To make a difference", "Tạo ra khác biệt"],
      ["Turnout", "Số người tham gia"],
    ],
    structures: ["What I did was...", "It took place in... over...", "There were about... of us, and my job was...", "The impact was..."],
    ideas: ["Beach clean-up", "Free English class", "Charity collection"],
    model:
      "What I did was help organise a free Saturday English class for children in my neighbourhood. It ran for four months last year in the community hall, which the ward lent us for nothing. There were six of us **volunteering**, all students, and my job was planning the speaking games and messaging parents. The **turnout** was better than expected - twenty-two children every week. It was a genuine **grassroots initiative** with no funding, yet it did **make a difference**: several parents told us their children stopped being afraid to speak, and the ward has now agreed to fund materials, which also **raised awareness** of how much demand there is.",
  },
  {
    id: "py2-something-you-collect",
    topic: "Hobbies",
    question: "Describe something you collect or used to collect.",
    prompts: CUE_PROMPTS("What it is", "How you started", "How large the collection is", "Why you enjoy it"),
    vocab: [
      ["To take up a hobby", "Bắt đầu một sở thích"],
      ["To add to a collection", "Bổ sung vào bộ sưu tập"],
      ["Rare item", "Món hiếm"],
      ["On display", "Được trưng bày"],
      ["A labour of love", "Việc làm vì đam mê"],
    ],
    structures: ["What I collect is...", "It began when...", "At the moment I have roughly...", "It's very much **a labour of love** because..."],
    ideas: ["Stamps, coins, postcards, badges", "Gifts from travellers", "Storage and display"],
    model:
      "What I collect is postcards from places I've never been. It began when a cousin studying in Australia sent me one; I liked the idea of holding something that had physically travelled. At the moment I have roughly one hundred and forty, mostly swapped through an online exchange community, and about twenty are **on display** on a corkboard above my desk. My favourite - a hand-drawn card from a small town in Poland - is definitely the **rare item** of the collection. It's very much **a labour of love**: postage costs more than the cards, but every time I **add to the collection** I learn a little geography.",
  },
  {
    id: "py2-difficult-task-completed",
    topic: "Work & Study",
    question: "Describe a difficult task you completed successfully.",
    prompts: CUE_PROMPTS("What the task was", "Why it was difficult", "How you approached it", "How you felt at the end"),
    vocab: [
      ["To be out of one's depth", "Quá sức mình"],
      ["To break something down", "Chia nhỏ ra"],
      ["A steep learning curve", "Đường cong học tập dốc"],
      ["To see something through", "Theo đến cùng"],
      ["Rewarding", "Xứng đáng, đáng giá"],
    ],
    structures: ["The task I'd like to describe is...", "It was difficult because...", "My approach was to...", "Completing it was extremely **rewarding** since..."],
    ideas: ["Research report", "Building a website", "Organising an event"],
    model:
      "The task I'd like to describe is building my first website, for a family friend's coffee shop. It was difficult because I'd only ever done small exercises in class and I felt completely **out of my depth** dealing with a real client who kept changing her mind. My approach was to **break it down**: design first, then content, then the booking form, with a checklist for each stage. There was **a steep learning curve** with the payment plugin in particular, and I nearly gave up in week three. I decided to **see it through**, though, and the site went live a month later. Seeing real customers use it was incredibly **rewarding**.",
  },
  {
    id: "py2-shop-you-like",
    topic: "Shopping",
    question: "Describe a shop you enjoy going to.",
    prompts: CUE_PROMPTS("Where it is", "What it sells", "How often you go", "Why you enjoy it"),
    vocab: [
      ["Well-stocked", "Đầy đủ hàng hóa"],
      ["To browse", "Xem lướt hàng"],
      ["Attentive staff", "Nhân viên chu đáo"],
      ["Reasonable prices", "Giá phải chăng"],
      ["To treat oneself", "Tự thưởng cho bản thân"],
    ],
    structures: ["The shop I enjoy most is...", "It's located...", "I usually go there to...", "The main appeal for me is..."],
    ideas: ["Stationery shop", "Market stall", "Atmosphere and lighting"],
    model:
      "The shop I enjoy most is a stationery shop near the Old Quarter. It's small but incredibly **well-stocked** - notebooks, fountain pens, washi tape, all arranged by colour. I go about once a month, usually just to **browse** rather than buy, though I do sometimes **treat myself** to a new notebook before exams. The **staff are attentive** without hovering, and they let you test every pen, which most shops don't. Prices are **reasonable** compared with the imported brands in the mall. For me it's almost therapeutic: fifteen minutes there and I actually want to sit down and study.",
  },
  {
    id: "py2-time-you-waited",
    topic: "Experiences",
    question: "Describe a time when you had to wait a long time for something.",
    prompts: CUE_PROMPTS("What you were waiting for", "How long you waited", "How you passed the time", "How you felt"),
    vocab: [
      ["To queue up", "Xếp hàng"],
      ["Patience", "Sự kiên nhẫn"],
      ["To kill time", "Giết thời gian"],
      ["Frustrating", "Bực bội"],
      ["Worth the wait", "Đáng để chờ"],
    ],
    structures: ["The occasion I remember is when...", "In total I waited about...", "To **kill time** I...", "Looking back, it was..."],
    ideas: ["Visa appointment", "Exam results", "Concert tickets"],
    model:
      "The occasion I remember most clearly is waiting for my IELTS results two years ago. Officially it takes thirteen days, and I checked the website perhaps forty times. I also had to **queue up** for two hours at the visa centre the same week, which tested my **patience** in a different way. To **kill time** during the results wait I threw myself into a part-time job and deliberately left my phone in another room in the evenings. It was **frustrating** because everything else in my application depended on that one number. When 7.0 finally appeared, it was absolutely **worth the wait** - I applied that same night.",
  },
  {
    id: "py2-food-first-time",
    topic: "Food",
    question: "Describe a dish you tried for the first time recently.",
    prompts: CUE_PROMPTS("What the dish was", "Where you tried it", "What it tasted like", "Whether you would eat it again"),
    vocab: [
      ["An acquired taste", "Vị phải làm quen mới thích"],
      ["Mouth-watering", "Ngon đến chảy nước miếng"],
      ["Texture", "Kết cấu món ăn"],
      ["Bland", "Nhạt nhẽo"],
      ["To be worth trying", "Đáng thử"],
    ],
    structures: ["The dish I tried recently is...", "I had it at...", "In terms of taste, it was...", "Would I order it again? ..."],
    ideas: ["Foreign cuisine", "Regional Vietnamese speciality", "Comparison with familiar food"],
    model:
      "The dish I tried recently is Korean raw crab marinated in soy sauce, which a friend ordered at a restaurant in District 1 without telling me what it was. Visually it looked **mouth-watering**, but the **texture** was the shock - soft, almost jelly-like, quite unlike any seafood I'd eaten. The flavour itself was rich, salty and slightly sweet, definitely not **bland**. I'd call it **an acquired taste**; my first two bites were hesitant and by the fifth I genuinely enjoyed it. It's certainly **worth trying** once, though at that price I'd order it only on a special occasion.",
  },
  {
    id: "py2-childhood-book",
    topic: "Books",
    question: "Describe a book you enjoyed reading as a child.",
    prompts: CUE_PROMPTS("What the book was", "Who gave it to you", "What it was about", "Why you liked it"),
    vocab: [
      ["To be gripped by", "Bị cuốn hút bởi"],
      ["Illustration", "Tranh minh họa"],
      ["To read something cover to cover", "Đọc từ đầu đến cuối"],
      ["Imagination", "Trí tưởng tượng"],
      ["A page-turner", "Cuốn sách gây nghiện"],
    ],
    structures: ["The book I loved as a child was...", "My... gave it to me when...", "It tells the story of...", "I liked it because..."],
    ideas: ["Doraemon, De Men Phieu Luu Ky", "Bedtime reading", "Lessons learnt"],
    model:
      "The book I loved as a child was 'De Men Phieu Luu Ky', a Vietnamese classic about a young cricket who leaves home. My mother gave it to me for my eighth birthday. It follows the cricket's journey across the countryside, where his arrogance causes a friend's death and he gradually learns humility. I was completely **gripped by** it and read it **cover to cover** in two days - a genuine **page-turner** for a child. The black-and-white **illustrations** fed my **imagination** enormously, and the moral stayed with me: think about the consequences before you act. I reread it last year and still enjoyed it.",
  },
  {
    id: "py2-technology-older",
    topic: "Technology",
    question: "Describe a piece of technology that older people find difficult to use.",
    prompts: CUE_PROMPTS("What it is", "Who you have seen struggle with it", "Why it is difficult for them", "How they could be helped"),
    vocab: [
      ["Digital literacy", "Kỹ năng số"],
      ["Counter-intuitive", "Khó hiểu, phản trực giác"],
      ["To walk someone through", "Hướng dẫn từng bước"],
      ["Font size", "Cỡ chữ"],
      ["To be wary of", "Cảnh giác với"],
    ],
    structures: ["The technology I'd like to talk about is...", "I've watched my... struggle with...", "The main barrier is that...", "What genuinely helps is..."],
    ideas: ["Banking apps", "QR payment", "Scam fear"],
    model:
      "The technology I'd like to talk about is mobile banking. I've watched my mother struggle with it for two years. The main barrier isn't intelligence at all - it's that the design is **counter-intuitive** for someone with limited **digital literacy**: tiny **font size**, menus hidden behind three taps, and a one-time password that expires while she's still looking for her glasses. She's also understandably **wary of** scams, since her friend lost money last year. What genuinely helps is patience: I **walk her through** each transfer, we wrote the steps on paper, and I enabled fingerprint login. Banks could solve most of this with a simple mode for older users.",
  },
  {
    id: "py2-relaxing-day",
    topic: "Lifestyle",
    question: "Describe a day when you did nothing but relax.",
    prompts: CUE_PROMPTS("When it was", "Where you spent it", "What you did", "Why you needed it"),
    vocab: [
      ["To take it easy", "Thư giãn, thong thả"],
      ["To have a lie-in", "Ngủ nướng"],
      ["To switch off", "Tạm gác mọi thứ"],
      ["Well-deserved", "Xứng đáng"],
      ["To lounge around", "Nằm dài thư giãn"],
    ],
    structures: ["The day I'd like to describe was...", "I started by...", "The rest of the day I simply...", "I needed it because..."],
    ideas: ["After exams", "Rainy Sunday", "Food and films"],
    model:
      "The day I'd like to describe was the Sunday after my final exams last June. I started with **a lie-in** until almost eleven, which I never normally allow myself. The rest of the day I simply **lounged around** the flat: I made pancakes, watched two films with my flatmate, and read on the balcony while it rained. I deliberately left my phone on silent so that I could properly **switch off**. I needed it because I'd studied twelve-hour days for three weeks and my concentration had collapsed. It felt completely **well-deserved**, and honestly, **taking it easy** for one day made me far more productive on the Monday.",
  },
  {
    id: "py2-clothing-item",
    topic: "Clothes",
    question: "Describe an item of clothing that is important to you.",
    prompts: CUE_PROMPTS("What it is", "Where you got it", "When you wear it", "Why it matters to you"),
    vocab: [
      ["Hand-me-down", "Đồ được cho lại"],
      ["To wear something out", "Mặc đến sờn cũ"],
      ["Timeless", "Không lỗi mốt"],
      ["To go with anything", "Dễ phối đồ"],
      ["Attached to", "Gắn bó với"],
    ],
    structures: ["The item I'd like to describe is...", "I got it when...", "I tend to wear it for...", "It matters to me because..."],
    ideas: ["Ao dai, jacket, football shirt", "Gift from a relative", "Memory attached"],
    model:
      "The item I'd like to describe is a dark green denim jacket that used to belong to my father - so technically a **hand-me-down**. He bought it in the 1990s and gave it to me when I started university. The style is genuinely **timeless** and the colour **goes with anything**, so I wear it for almost everything except formal events. I'm very **attached to** it because he wore it on the day he met my mother, and because it survived four winters in Hanoi with me. I've almost **worn it out** - the cuffs are frayed - but I'd rather repair it than replace it.",
  },
  {
    id: "py2-nature-experience",
    topic: "Nature",
    question: "Describe a time when you saw something beautiful in nature.",
    prompts: CUE_PROMPTS("What you saw", "Where and when", "Who you were with", "How it made you feel"),
    vocab: [
      ["Stunning scenery", "Cảnh đẹp ngoạn mục"],
      ["To take one's breath away", "Làm nghẹt thở vì đẹp"],
      ["Untouched", "Chưa bị tác động"],
      ["Serene", "Thanh bình"],
      ["In awe", "Kinh ngạc, thán phục"],
    ],
    structures: ["The moment I'd like to describe is...", "It happened at... while...", "The scenery was absolutely...", "Standing there, I felt..."],
    ideas: ["Sunrise on a mountain", "Terraced fields", "Sea at night"],
    model:
      "The moment I'd like to describe is a sunrise I watched from Fansipan two years ago with my university hiking club. We had climbed in darkness from four in the morning, and when the sun finally rose, a sea of cloud sat below us with peaks poking through - genuinely **stunning scenery** that **took my breath away**. Everything was **serene**; nobody in the group spoke for several minutes, which for eight students is remarkable. What struck me most was how **untouched** it looked from up there. Standing **in awe** of something that large made my worries about exams feel very small, and I still use that photo as my wallpaper.",
  },
  {
    id: "py2-conversation-remember",
    topic: "People",
    question: "Describe an interesting conversation you had with someone.",
    prompts: CUE_PROMPTS("Who you talked to", "Where the conversation took place", "What you talked about", "Why it was interesting"),
    vocab: [
      ["To strike up a conversation", "Bắt chuyện"],
      ["Insightful", "Sâu sắc"],
      ["To hit it off", "Hợp nhau ngay"],
      ["A fresh perspective", "Góc nhìn mới mẻ"],
      ["Time flew by", "Thời gian trôi rất nhanh"],
    ],
    structures: ["The conversation I'd like to describe took place...", "I **struck up a conversation** with...", "We ended up discussing...", "What made it so interesting was..."],
    ideas: ["Stranger on a train", "Guest speaker", "Older relative"],
    model:
      "The conversation I'd like to describe took place on a train from Hue to Da Nang. I **struck up a conversation** with an elderly Japanese man who was travelling the coast alone at seventy-eight. We **hit it off** immediately and ended up discussing everything from his career as an engineer to why young people in both our countries delay marriage. His view that 'retirement should be the beginning of learning, not the end' was extremely **insightful** and gave me **a fresh perspective** on ageing. **Time flew by** - three hours felt like thirty minutes. We still exchange emails at new year.",
  },
  {
    id: "py2-rule-disagree",
    topic: "Society",
    question: "Describe a rule at your school or workplace that you did not agree with.",
    prompts: CUE_PROMPTS("What the rule was", "Why it existed", "Why you disagreed", "Whether it ever changed"),
    vocab: [
      ["To enforce a rule", "Thi hành quy định"],
      ["Outdated", "Lỗi thời"],
      ["Counterproductive", "Phản tác dụng"],
      ["To voice an objection", "Nêu ý kiến phản đối"],
      ["Reasonable", "Hợp lý"],
    ],
    structures: ["The rule I'd like to talk about is...", "Officially it existed to...", "I disagreed because...", "In the end..."],
    ideas: ["Phone ban", "Hair length rule", "Attendance policy"],
    model:
      "The rule I'd like to talk about is the total phone ban at my high school - devices had to be handed in each morning. Officially it existed to stop cheating and distraction, which is **reasonable** in principle, and teachers **enforced** it strictly. I disagreed because it felt **outdated** and, in practice, **counterproductive**: we couldn't look up a word in class or contact parents in an emergency, and students simply carried a second cheap phone. Several of us **voiced an objection** through the student council. It did change slightly in my final year: phones are now allowed but must stay in bags unless a teacher asks for them, which seems far more sensible.",
  },
  {
    id: "py2-service-good",
    topic: "Services",
    question: "Describe a time when you received excellent customer service.",
    prompts: CUE_PROMPTS("Where it happened", "What the situation was", "What the staff did", "How you felt about it"),
    vocab: [
      ["To go above and beyond", "Vượt trên cả mong đợi"],
      ["Prompt", "Nhanh chóng"],
      ["To resolve an issue", "Giải quyết vấn đề"],
      ["Courteous", "Lịch sự"],
      ["A refund", "Khoản hoàn tiền"],
    ],
    structures: ["This happened at... when...", "The problem was that...", "Instead of..., the staff...", "I was impressed because..."],
    ideas: ["Faulty product", "Hotel upgrade", "Airline delay"],
    model:
      "This happened at an electronics shop where I bought headphones that stopped working after ten days. The problem was that I'd lost the receipt, so strictly speaking they could have refused. Instead of arguing, the assistant found the transaction on their system, apologised, and offered me either **a refund** or a newer model for the same price. She was extremely **courteous** and the whole thing was **prompt** - fifteen minutes from start to finish. She even charged the new pair so I could test them before leaving. That's what I'd call **going above and beyond**, and it's why I still buy from that shop rather than online.",
  },
  {
    id: "py2-invention-useful",
    topic: "Technology",
    question: "Describe an invention that has made a big difference to daily life.",
    prompts: CUE_PROMPTS("What the invention is", "When it appeared", "How people use it", "Why it is so important"),
    vocab: [
      ["Indispensable", "Không thể thiếu"],
      ["To revolutionise", "Cách mạng hóa"],
      ["Widespread", "Phổ biến rộng rãi"],
      ["Labour-saving", "Tiết kiệm sức lao động"],
      ["Downside", "Mặt trái"],
    ],
    structures: ["The invention I've chosen is...", "It became **widespread** in Vietnam around...", "In everyday terms it...", "Of course, there is a **downside**..."],
    ideas: ["Washing machine, smartphone, refrigerator", "Effect on women's time", "Overuse issues"],
    model:
      "The invention I've chosen is the washing machine, which sounds unglamorous but has genuinely **revolutionised** daily life. It became **widespread** in Vietnamese cities in the 1990s; my mother still remembers washing everything by hand at the well. In everyday terms this **labour-saving** device gives back perhaps eight hours a week - time that overwhelmingly used to be taken from women. That's why I'd call it **indispensable** rather than a luxury: it didn't just clean clothes, it freed people to study and work. The only real **downside** is water and electricity consumption, though modern machines are far more efficient than the early models.",
  },
  {
    id: "py2-time-you-were-proud",
    topic: "Achievements",
    question: "Describe a time when you felt proud of a family member.",
    prompts: CUE_PROMPTS("Who the person is", "What they did", "Why it was impressive", "How you reacted"),
    vocab: [
      ["To be over the moon", "Vui sướng tột độ"],
      ["Against the odds", "Dù rất khó khăn"],
      ["To overcome obstacles", "Vượt qua trở ngại"],
      ["Well-deserved", "Hoàn toàn xứng đáng"],
      ["To look up to someone", "Ngưỡng mộ ai"],
    ],
    structures: ["The moment I felt proudest was when...", "What made it impressive is that...", "**Against the odds**, she...", "I was **over the moon** because..."],
    ideas: ["Mother passing an exam", "Brother's competition", "Recovery from illness"],
    model:
      "The moment I felt proudest was when my mother passed her driving test last year at the age of fifty-two. What makes it impressive is that she failed twice, and several relatives openly joked that she should give up. She had to **overcome obstacles** most learners don't face: no free time until nine at night, and real anxiety after a small accident years ago. **Against the odds**, she practised every Sunday for eight months. When she called me with the result I was absolutely **over the moon** and we took the whole family out for dinner. It was **well-deserved**, and it's one of the reasons I genuinely **look up to** her.",
  },
];

export const SPEAKING_PRACTICE_EXPANSION_2 = {
  part1: build2(1, p1),
  part2: build2(2, p2),
};
