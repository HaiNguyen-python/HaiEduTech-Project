/**
 * IELTS Speaking Practice - Part 1 top-up bank.
 * Every Part 1 topic that previously had only one or two questions is raised
 * to at least five, using natural everyday collocations, frequency language
 * and preference language.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion } from "./speakingPracticeData";
import { build2, type Seed2 } from "./speakingPracticeExpansion2";

type Pair = [string, string];

/** Topic factory: shared vocabulary / structures / ideas, unique question + model. */
const topic = (
  name: string,
  vocab: Pair[],
  structures: string[],
  ideas: string[],
) => (id: string, question: string, model: string): Seed2 => ({
  id,
  topic: name,
  question,
  vocab,
  structures,
  ideas,
  model,
});

// ---------------------------------------------------------------- Sleep
const sleep = topic(
  "Sleep & Routines",
  [
    ["To be a light sleeper", "Ngủ dễ tỉnh"],
    ["To doze off", "Thiếp đi"],
    ["A set bedtime", "Giờ đi ngủ cố định"],
    ["To feel refreshed", "Cảm thấy tỉnh táo, khỏe khoắn"],
  ],
  ["I'd say I'm the kind of person who...", "On a normal weekday I usually...", "What really helps me is..."],
  ["Screen time before bed", "Weekend lie-ins", "Naps after lunch"],
);

// ---------------------------------------------------------------- Friends
const friends = topic(
  "Friends",
  [
    ["To get on well with someone", "Hợp tính, thân thiết với ai"],
    ["A close-knit group", "Nhóm bạn gắn bó"],
    ["To keep in touch", "Giữ liên lạc"],
    ["To have a lot in common", "Có nhiều điểm chung"],
  ],
  ["I'm lucky in that...", "The friends I see most often are...", "We tend to..."],
  ["School friends vs work friends", "Online contact", "Shared hobbies"],
);

// ---------------------------------------------------------------- Handwriting
const handwriting = topic(
  "Handwriting",
  [
    ["Legible handwriting", "Chữ viết dễ đọc"],
    ["To jot something down", "Ghi nhanh lại"],
    ["Neat and tidy", "Gọn gàng, sạch đẹp"],
    ["To scribble", "Viết nguệch ngoạc"],
  ],
  ["To be honest, my handwriting is...", "I only write by hand when...", "It's something I've never really..."],
  ["Notes in class", "Cards and letters", "Speed vs memory"],
);

// ---------------------------------------------------------------- Neighbours
const neighbours = topic(
  "Neighbours",
  [
    ["To be on friendly terms", "Có quan hệ thân thiện"],
    ["To keep to oneself", "Sống khép kín"],
    ["To lend a hand", "Giúp một tay"],
    ["A tight-knit community", "Cộng đồng gắn bó"],
  ],
  ["Where I live, people tend to...", "I wouldn't say we're close, but...", "It makes a big difference when..."],
  ["Apartment vs village life", "Noise and parking", "Helping during holidays"],
);

// ---------------------------------------------------------------- Noise
const noise = topic(
  "Noise",
  [
    ["Background noise", "Tiếng ồn nền"],
    ["Peace and quiet", "Sự yên tĩnh"],
    ["To drown something out", "Át đi âm thanh khác"],
    ["Soundproof windows", "Cửa sổ cách âm"],
  ],
  ["It can get quite noisy when...", "The main source of noise is...", "I've more or less got used to..."],
  ["Traffic and horns", "Construction work", "Headphones as a solution"],
);

// ---------------------------------------------------------------- Gifts
const gifts = topic(
  "Gifts",
  [
    ["A thoughtful present", "Món quà tinh tế"],
    ["To be spoilt for choice", "Có quá nhiều lựa chọn"],
    ["Gift wrapping", "Gói quà"],
    ["A token of appreciation", "Món quà thay lời cảm ơn"],
  ],
  ["It really depends on who it's for.", "I usually put quite a lot of thought into...", "What I try to avoid is..."],
  ["Handmade gifts", "Gift vouchers", "Tet and birthdays"],
);

// ---------------------------------------------------------------- Cooking
const cooking = topic(
  "Cooking",
  [
    ["A home-cooked meal", "Bữa cơm nhà"],
    ["To follow a recipe", "Làm theo công thức"],
    ["To be a decent cook", "Nấu ăn khá ổn"],
    ["Fresh ingredients", "Nguyên liệu tươi"],
  ],
  ["I cook more often than I used to.", "My speciality, if you can call it that, is...", "The main reason is..."],
  ["Cost and health", "Street food culture", "Cooking with family"],
);

// ---------------------------------------------------------------- Flowers & Plants
const plants = topic(
  "Flowers & Plants",
  [
    ["Houseplants", "Cây trồng trong nhà"],
    ["To have green fingers", "Mát tay trồng cây"],
    ["Low-maintenance plants", "Cây dễ chăm"],
    ["To brighten up a room", "Làm căn phòng tươi sáng hơn"],
  ],
  ["I've got a few plants, mainly because...", "I'm not particularly good at...", "In my culture, flowers are..."],
  ["Balcony gardens", "Flowers at Tet", "Air quality"],
);

// ---------------------------------------------------------------- Apps
const apps = topic(
  "Apps",
  [
    ["A user-friendly interface", "Giao diện dễ dùng"],
    ["To scroll endlessly", "Lướt mãi không dứt"],
    ["Screen time", "Thời gian dùng màn hình"],
    ["A time-saving app", "Ứng dụng tiết kiệm thời gian"],
  ],
  ["The one I open most is definitely...", "I mainly use it for...", "I've been trying to cut down on..."],
  ["Messaging apps", "Study apps", "Payment apps"],
);

// ---------------------------------------------------------------- Teamwork
const teamwork = topic(
  "Teamwork",
  [
    ["To pull your weight", "Làm tròn phần việc của mình"],
    ["To bounce ideas around", "Trao đổi ý tưởng qua lại"],
    ["A clear division of tasks", "Phân chia công việc rõ ràng"],
    ["To meet a deadline", "Kịp hạn nộp"],
  ],
  ["It honestly depends on the task.", "What makes a team work well is...", "The frustrating part is when..."],
  ["Group projects at school", "Different working styles", "Online collaboration tools"],
);

// ---------------------------------------------------------------- Childhood
const childhood = topic(
  "Childhood",
  [
    ["To look back on something fondly", "Nhớ lại điều gì với sự trìu mến"],
    ["Carefree days", "Những ngày vô lo"],
    ["To be brought up in", "Được nuôi lớn ở"],
    ["A vivid memory", "Ký ức sống động"],
  ],
  ["Looking back, I...", "When I was little, we used to...", "It's funny how..."],
  ["Outdoor games", "Grandparents' house", "Neighbourhood friends"],
);

// ---------------------------------------------------------------- Shopping
const shopping = topic(
  "Shopping",
  [
    ["To be on a tight budget", "Eo hẹp tiền bạc"],
    ["A bargain", "Món hời"],
    ["Window shopping", "Đi ngắm đồ không mua"],
    ["An impulse buy", "Mua bốc đồng"],
  ],
  ["I'd describe myself as a fairly... shopper.", "I tend to compare prices before...", "The convenience of... is hard to beat."],
  ["Online vs markets", "Sales and discounts", "Returning items"],
);

// ---------------------------------------------------------------- Languages
const languages = topic(
  "Languages",
  [
    ["To pick up a language", "Học được một ngôn ngữ một cách tự nhiên"],
    ["To be fluent in", "Thông thạo"],
    ["A steep learning curve", "Quá trình học đầy thử thách"],
    ["To brush up on", "Ôn lại cho nhuần"],
  ],
  ["The hardest part for me is...", "I've been learning... for about...", "What speeds things up is..."],
  ["Pronunciation vs grammar", "Films and podcasts", "Speaking with foreigners"],
);

// ---------------------------------------------------------------- Free Time
const freeTime = topic(
  "Free Time",
  [
    ["To unwind", "Thư giãn"],
    ["To have some downtime", "Có thời gian nghỉ ngơi"],
    ["A change of scenery", "Đổi không khí"],
    ["To catch up with friends", "Gặp gỡ bạn bè hàn huyên"],
  ],
  ["It varies from week to week.", "If I've got a free afternoon, I'll usually...", "That's my way of..."],
  ["Cafes and reading", "Sport and exercise", "Family time"],
);

// ---------------------------------------------------------------- Advertising
const advertising = topic(
  "Advertising",
  [
    ["A catchy slogan", "Khẩu hiệu bắt tai"],
    ["Targeted ads", "Quảng cáo nhắm đối tượng"],
    ["To be bombarded with ads", "Bị dội bom quảng cáo"],
    ["Brand awareness", "Nhận diện thương hiệu"],
  ],
  ["I'd like to say no, but...", "The ones that stay with me are...", "I usually skip them unless..."],
  ["Social media ads", "Celebrity endorsement", "Ad blockers"],
);

// ---------------------------------------------------------------- Libraries
const libraries = topic(
  "Libraries",
  [
    ["A quiet study space", "Không gian học yên tĩnh"],
    ["To borrow a book", "Mượn sách"],
    ["To concentrate for hours", "Tập trung hàng giờ"],
    ["Reference materials", "Tài liệu tham khảo"],
  ],
  ["I go there mainly when...", "The atmosphere makes it easier to...", "One drawback is..."],
  ["Exam periods", "Free wifi", "Digital libraries"],
);

// ---------------------------------------------------------------- Colours
const colours = topic(
  "Colours",
  [
    ["A bold colour", "Màu nổi bật"],
    ["Neutral tones", "Tông màu trung tính"],
    ["To suit someone", "Hợp với ai đó"],
    ["To brighten up an outfit", "Làm bộ đồ tươi sáng hơn"],
  ],
  ["I'd say I stick to...", "It's not that I dislike..., it's more that...", "In my culture, that colour is associated with..."],
  ["Clothes vs walls", "Cultural meanings", "Mood and colour"],
);

// ---------------------------------------------------------------- Outdoor Activities
const outdoors = topic(
  "Outdoor Activities",
  [
    ["To get some fresh air", "Ra ngoài hít thở không khí"],
    ["To be cooped up indoors", "Bị nhốt trong nhà"],
    ["A brisk walk", "Đi bộ nhanh"],
    ["Weather permitting", "Nếu thời tiết cho phép"],
  ],
  ["Not as much as I'd like, honestly.", "When the weather's good, I...", "It's a good way to..."],
  ["Parks in the morning", "Cycling", "Hot summers"],
);

// ---------------------------------------------------------------- Family
const family = topic(
  "Family",
  [
    ["A close-knit family", "Gia đình gắn bó"],
    ["To take after someone", "Giống ai đó (tính cách, ngoại hình)"],
    ["Quality time", "Thời gian chất lượng bên nhau"],
    ["Extended family", "Đại gia đình"],
  ],
  ["We're quite a close family, so...", "During the week it's difficult because...", "We always make a point of..."],
  ["Family meals", "Tet reunions", "Living apart for work"],
);

// ---------------------------------------------------------------- Time Management
const timeMgmt = topic(
  "Time Management",
  [
    ["To be punctual", "Đúng giờ"],
    ["To put things off", "Trì hoãn"],
    ["To prioritise tasks", "Sắp xếp việc theo thứ tự ưu tiên"],
    ["To run late", "Bị trễ giờ"],
  ],
  ["I'd say I'm reasonably...", "What helps me most is...", "I'm working on..."],
  ["To-do lists", "Traffic delays", "Deadlines at work"],
);

// ---------------------------------------------------------------- News
const news = topic(
  "News",
  [
    ["To keep up with current affairs", "Cập nhật thời sự"],
    ["A news headline", "Tiêu đề tin tức"],
    ["Reliable sources", "Nguồn tin đáng tin cậy"],
    ["To skim through", "Đọc lướt"],
  ],
  ["Mainly on my phone, to be honest.", "I tend to follow... rather than...", "I try to check more than one..."],
  ["Morning scrolling", "Local vs world news", "Fake news"],
);

// ---------------------------------------------------------------- Food
const food = topic(
  "Food",
  [
    ["To have a sweet tooth", "Hảo ngọt"],
    ["A balanced diet", "Chế độ ăn cân bằng"],
    ["To be a picky eater", "Kén ăn"],
    ["Comfort food", "Món ăn khiến ta thấy dễ chịu"],
  ],
  ["I'm not fussy at all, except for...", "My all-time favourite has to be...", "I've been trying to eat more..."],
  ["Vietnamese noodle dishes", "Street food", "Cooking at home"],
);

// ---------------------------------------------------------------- Animals
const animals = topic(
  "Animals",
  [
    ["To keep a pet", "Nuôi thú cưng"],
    ["Loyal companions", "Người bạn trung thành"],
    ["To look after an animal", "Chăm sóc con vật"],
    ["Stray animals", "Động vật đi lạc"],
  ],
  ["We had one when I was younger.", "I'm more of a... person.", "The responsibility is..."],
  ["Dogs and cats", "Zoos", "Animal videos online"],
);

// ---------------------------------------------------------------- Home
const home = topic(
  "Home",
  [
    ["Cosy and welcoming", "Ấm cúng, dễ chịu"],
    ["To do up a room", "Sửa sang, trang trí phòng"],
    ["Natural light", "Ánh sáng tự nhiên"],
    ["Clutter", "Đồ đạc bừa bộn"],
  ],
  ["My room is fairly simple, but...", "If I had the budget, I'd...", "What matters most to me is..."],
  ["Posters and photos", "Plants", "Tidiness"],
);

// ---------------------------------------------------------------- Museums
const museums = topic(
  "Museums",
  [
    ["An exhibition", "Triển lãm"],
    ["Hands-on displays", "Trưng bày cho khách trải nghiệm"],
    ["To bring history to life", "Làm lịch sử trở nên sống động"],
    ["A guided tour", "Chuyến tham quan có hướng dẫn"],
  ],
  ["I don't go often, but when I do...", "What I enjoy most is...", "They can be a bit... if..."],
  ["School trips", "History museums", "Free entry days"],
);

// ---------------------------------------------------------------- Drinks
const drinks = topic(
  "Drinks",
  [
    ["To stay hydrated", "Uống đủ nước"],
    ["A caffeine hit", "Cú hích caffeine"],
    ["To cut down on sugar", "Giảm đường"],
    ["Freshly squeezed juice", "Nước ép tươi"],
  ],
  ["Mostly water, I'd say.", "I can't really start the day without...", "I've been trying to..."],
  ["Vietnamese iced coffee", "Tea culture", "Sugary drinks"],
);

// ---------------------------------------------------------------- Things & Repairs
const repairs = topic(
  "Things & Repairs",
  [
    ["To fix something yourself", "Tự sửa đồ"],
    ["Wear and tear", "Hao mòn do dùng lâu"],
    ["To be beyond repair", "Hỏng không sửa được"],
    ["A throwaway culture", "Văn hóa dùng rồi vứt"],
  ],
  ["It depends how expensive it was.", "For small things I'd rather...", "I'd always try to... first."],
  ["Phones and laptops", "Local repair shops", "Cost vs new"],
);

// ---------------------------------------------------------------- Directions
const directions = topic(
  "Directions",
  [
    ["To have a good sense of direction", "Có khả năng định hướng tốt"],
    ["To get lost", "Bị lạc"],
    ["A landmark", "Điểm mốc dễ nhận biết"],
    ["To rely on GPS", "Phụ thuộc vào định vị"],
  ],
  ["Honestly, not really.", "I rely far too much on...", "I usually orient myself by..."],
  ["Google Maps", "Asking locals", "Old town alleys"],
);

// ---------------------------------------------------------------- Clothes
const clothes = topic(
  "Clothes",
  [
    ["Casual clothes", "Quần áo thường ngày"],
    ["A dress code", "Quy định trang phục"],
    ["To dress up", "Ăn mặc chỉnh tề, đẹp"],
    ["Comfortable and practical", "Thoải mái và tiện dụng"],
  ],
  ["For everyday life I go for...", "I only really dress up when...", "Looking back, the uniform..."],
  ["School uniforms", "Office wear", "Weather and fabrics"],
);

// ---------------------------------------------------------------- Sounds
const sounds = topic(
  "Sounds",
  [
    ["Soothing sounds", "Âm thanh dễ chịu"],
    ["A constant hum", "Tiếng ù đều đều"],
    ["To block out noise", "Chặn tiếng ồn"],
    ["Birdsong", "Tiếng chim hót"],
  ],
  ["Anything from nature, really.", "The sound I can't stand is...", "I often put on... when I'm..."],
  ["Rain and waves", "Traffic horns", "Music while studying"],
);

// ---------------------------------------------------------------- Communication
const communication = topic(
  "Communication",
  [
    ["To keep it brief", "Nói ngắn gọn"],
    ["Face-to-face conversation", "Trò chuyện trực tiếp"],
    ["To misread a message", "Hiểu sai tin nhắn"],
    ["Body language", "Ngôn ngữ cơ thể"],
  ],
  ["It depends who I'm talking to.", "For anything important, I'd rather...", "Texting is convenient, but..."],
  ["Family video calls", "Work emails", "Tone in messages"],
);

// ---------------------------------------------------------------- Goals
const goals = topic(
  "Goals",
  [
    ["A short-term goal", "Mục tiêu ngắn hạn"],
    ["To stay motivated", "Giữ động lực"],
    ["To keep track of progress", "Theo dõi tiến độ"],
    ["A realistic target", "Mục tiêu thực tế"],
  ],
  ["I do, though I'm not always...", "At the moment my main goal is...", "What keeps me going is..."],
  ["IELTS band target", "Fitness goals", "Saving money"],
);

// ---------------------------------------------------------------- School Subjects
const subjects = topic(
  "School Subjects",
  [
    ["To be good at a subject", "Học tốt một môn"],
    ["A demanding subject", "Môn học đòi hỏi nhiều"],
    ["To struggle with", "Vật lộn với"],
    ["Practical lessons", "Tiết học thực hành"],
  ],
  ["My favourite by far was...", "I was never particularly strong at...", "A lot of it came down to the teacher."],
  ["Maths and literature", "Lab experiments", "Teachers' influence"],
);

// ---------------------------------------------------------------- Places
const places = topic(
  "Places",
  [
    ["A bustling area", "Khu vực nhộn nhịp"],
    ["Off the beaten track", "Ít người biết đến"],
    ["A lively atmosphere", "Bầu không khí sôi động"],
    ["To be packed with people", "Đông nghịt người"],
  ],
  ["In small doses, yes.", "I much prefer somewhere...", "It depends on my mood, really."],
  ["Night markets", "Quiet cafes", "Weekend crowds"],
);

// ---------------------------------------------------------------- Money
const money = topic(
  "Money",
  [
    ["To keep an eye on spending", "Theo dõi chi tiêu"],
    ["To save up for something", "Tiết kiệm để mua gì đó"],
    ["To live within your means", "Chi tiêu trong khả năng"],
    ["Cashless payments", "Thanh toán không tiền mặt"],
  ],
  ["Roughly, yes - I use an app for...", "I try to put aside...", "I'm more careful than I used to be."],
  ["Banking apps", "Saving for travel", "Student budgets"],
);

// ---------------------------------------------------------------- Transport
const transport = topic(
  "Transport",
  [
    ["Rush hour", "Giờ cao điểm"],
    ["To commute", "Đi lại giữa nhà và nơi làm việc"],
    ["To get stuck in traffic", "Kẹt xe"],
    ["A reliable service", "Dịch vụ đáng tin cậy"],
  ],
  ["Most of the time I...", "The journey takes about...", "The main problem is..."],
  ["Motorbikes in Vietnam", "Buses and metro", "Cycling"],
);

// ---------------------------------------------------------------- Photography
const photography = topic(
  "Photography",
  [
    ["To take a snapshot", "Chụp nhanh một tấm"],
    ["A good eye for composition", "Có mắt thẩm mỹ khi bố cục"],
    ["To capture a moment", "Ghi lại khoảnh khắc"],
    ["To edit photos", "Chỉnh sửa ảnh"],
  ],
  ["I'm no photographer, but...", "I mostly take photos of...", "I like looking back at..."],
  ["Phone cameras", "Travel photos", "Family albums"],
);

const seeds: Seed2[] = [
  // Sleep & Routines
  sleep("p1x-sleep-2", "What time do you usually go to bed?",
    "On a normal weekday I'm in bed by around eleven, because I have to be up at six. I try to keep **a set bedtime** during the week, although at weekends it slips by an hour or two."),
  sleep("p1x-sleep-3", "Do you ever take naps during the day?",
    "Occasionally, yes. If I've had a bad night I'll **doze off** for twenty minutes after lunch, and I usually wake up feeling much more **refreshed**. Any longer than that and I feel worse, to be honest."),
  sleep("p1x-sleep-4", "What helps you sleep well?",
    "What really helps me is staying off my phone for half an hour before bed. I'm quite **a light sleeper**, so a dark, quiet room makes a big difference too."),
  sleep("p1x-sleep-5", "Has your sleep routine changed in recent years?",
    "Quite a lot, actually. As a student I'd stay up until two, whereas now I stick to **a set bedtime** because my job starts early. I definitely **feel refreshed** more often than I used to."),

  // Friends
  friends("p1x-friends-2", "How often do you see your friends?",
    "Probably once a week, usually at a coffee shop at the weekend. During busy months we mostly **keep in touch** through messages, but we always try to meet at least once."),
  friends("p1x-friends-3", "How did you meet your best friend?",
    "We met at secondary school and sat next to each other for two years. We **had a lot in common** - the same music, the same sense of humour - so we just **got on well** straight away."),
  friends("p1x-friends-4", "Is it easy to make new friends as an adult?",
    "Harder than at school, I'd say. At university you're in **a close-knit group** every day, whereas as an adult you have to make a real effort to meet people outside work."),
  friends("p1x-friends-5", "What qualities do you look for in a friend?",
    "Honesty, mainly. I'd rather have someone who tells me the truth than someone who only says nice things. It also helps if we **have a lot in common**, but that's less important than trust."),

  // Handwriting
  handwriting("p1x-hand-2", "Do you think your handwriting is good?",
    "Not really. It's **legible** when I take my time, but when I'm in a hurry I just **scribble** and even I struggle to read it later."),
  handwriting("p1x-hand-3", "Do children still need to learn handwriting?",
    "I think so, yes. Writing by hand helps young children remember letter shapes, and there are still situations - forms, exams, signatures - where **neat and tidy** handwriting matters."),
  handwriting("p1x-hand-4", "When was the last time you wrote something by hand?",
    "This morning, actually. I **jotted down** a shopping list before going out. Apart from lists and birthday cards, almost everything I write these days is typed."),
  handwriting("p1x-hand-5", "Can you tell anything about a person from their handwriting?",
    "People say you can, though I'm sceptical. At most it might show whether someone is patient, because **neat and tidy** writing takes time. I wouldn't judge anyone on it."),

  // Neighbours
  neighbours("p1x-neigh-2", "Do you often talk to your neighbours?",
    "Just briefly, when we bump into each other in the lift. We're **on friendly terms** rather than close friends, which honestly suits everyone."),
  neighbours("p1x-neigh-3", "What makes a good neighbour?",
    "Being considerate about noise, mainly, and being willing to **lend a hand** occasionally - taking in a parcel, for example. Beyond that, most people prefer neighbours who **keep to themselves** a bit."),
  neighbours("p1x-neigh-4", "Do people know their neighbours as well as in the past?",
    "Definitely less. In my grandparents' village it was **a tight-knit community** where everyone knew everyone, whereas in a city apartment block people come and go all the time."),
  neighbours("p1x-neigh-5", "Have you ever helped a neighbour?",
    "Yes, I helped the family next door carry a wardrobe upstairs last year. It only took ten minutes to **lend a hand**, but since then we always stop to chat, so it was worth it."),

  // Noise
  noise("p1x-noise-2", "What kinds of noise bother you most?",
    "Motorbike horns, without a doubt. Constant **background noise** like a fan doesn't bother me at all, but sudden, sharp sounds break my concentration completely."),
  noise("p1x-noise-3", "Do you mind noise when you are studying?",
    "It depends on the task. For reading I need **peace and quiet**, but for simple work I quite like a cafe, because the chatter **drowns out** my own distracting thoughts."),
  noise("p1x-noise-4", "Are cities noisier than they used to be?",
    "In my city, yes. There's far more traffic than ten years ago and building work seems endless. Newer apartments do have **soundproof windows**, which helps a lot."),
  noise("p1x-noise-5", "What do you do to avoid noise?",
    "I use noise-cancelling headphones on the bus, and at home I close the windows in the evening. When I really need **peace and quiet**, I go to the library."),

  // Gifts
  gifts("p1x-gift-2", "What kind of gifts do people give in your country?",
    "For Tet it's traditionally lucky money in red envelopes, and for weddings people usually give money too. For birthdays it's more personal - **a thoughtful present** like a book or something handmade."),
  gifts("p1x-gift-3", "Is it difficult to choose a gift?",
    "It can be. You're **spoilt for choice** online, which somehow makes it harder. I usually think about what the person has mentioned recently rather than browsing randomly."),
  gifts("p1x-gift-4", "Do you prefer giving or receiving gifts?",
    "Giving, surprisingly. Seeing someone genuinely surprised is more enjoyable than opening something myself, especially if I've spent time on the **gift wrapping**."),
  gifts("p1x-gift-5", "What was the best gift you have received?",
    "A photo album my sister made for my graduation. It cost almost nothing, but as **a token of appreciation** it meant far more than anything expensive."),

  // Cooking
  cooking("p1x-cook-2", "Who does the cooking in your family?",
    "Mostly my mother, though I cook at weekends. She's much faster, but I'd say I'm **a decent cook** for simple dishes like fried rice or noodle soup."),
  cooking("p1x-cook-3", "Did you learn to cook when you were a child?",
    "A little. I helped my grandmother prepare vegetables, so I picked things up by watching rather than **following a recipe**. I only started cooking properly at university."),
  cooking("p1x-cook-4", "Do you prefer eating at home or in a restaurant?",
    "At home, generally. **A home-cooked meal** is cheaper and I know exactly what's in it, since I choose the **fresh ingredients** myself. Restaurants are more for special occasions."),
  cooking("p1x-cook-5", "Would you like to learn to cook new dishes?",
    "I would. I'd love to learn some Japanese dishes, mainly because the technique is so precise. I'd probably just **follow a recipe** from an online video rather than pay for a class."),

  // Flowers & Plants
  plants("p1x-plant-2", "Do people in your country give flowers as gifts?",
    "Very often, yes - especially on Teachers' Day and Women's Day. Flowers are seen as a polite, safe gift, and a simple bunch really does **brighten up a room**."),
  plants("p1x-plant-3", "Have you ever grown anything yourself?",
    "I've tried a few herbs on my balcony. I don't exactly **have green fingers**, so I stick to **low-maintenance plants** like mint and basil that survive my forgetfulness."),
  plants("p1x-plant-4", "Where do you usually see flowers in your city?",
    "In parks and along the main boulevards, and there's a huge flower market near my house before Tet. It completely **brightens up** the neighbourhood for a week or two."),
  plants("p1x-plant-5", "Do plants make a home more pleasant?",
    "Definitely. Even two or three **houseplants** make a small flat feel calmer, and looking after them is quite relaxing after a day of screens."),

  // Apps
  apps("p1x-app-2", "How many apps do you have on your phone?",
    "Far too many - probably fifty, though I only use about eight regularly. I keep the **time-saving** ones like maps and banking, and delete the rest to free up space."),
  apps("p1x-app-3", "What makes a good app?",
    "**A user-friendly interface**, above all. If I need instructions to find a basic function, I'll delete it. Speed and not being full of ads matter too."),
  apps("p1x-app-4", "Do you spend too much time on your phone?",
    "Probably, yes. My **screen time** report is embarrassing, mostly because it's so easy to **scroll endlessly** on social media in the evening. I've set a daily limit to help."),
  apps("p1x-app-5", "Do you pay for apps?",
    "Rarely. I paid for a **time-saving app** for note-taking because I use it every day, but generally I stick to free versions and accept the ads."),

  // Teamwork
  teamwork("p1x-team-2", "Have you ever worked on a group project?",
    "Yes, several at university. The best one had **a clear division of tasks** from day one, so nobody duplicated work and we **met the deadline** comfortably."),
  teamwork("p1x-team-3", "What makes teamwork difficult?",
    "Usually it's when one person doesn't **pull their weight**, so the others have to cover for them. Different standards of quality can also cause friction."),
  teamwork("p1x-team-4", "Are you a good team player?",
    "I'd like to think so. I'm happy to take on the organising role and I enjoy **bouncing ideas around**, although I do have to remind myself to listen more."),
  teamwork("p1x-team-5", "Do children learn teamwork at school in your country?",
    "More than before. Group presentations are common now, so children learn early that everyone has to **pull their weight**, whereas my parents' generation studied almost entirely alone."),

  // Childhood
  childhood("p1x-child-2", "Where did you grow up?",
    "I was **brought up in** a small town about an hour from the city. It was quiet, everyone knew everyone, and we spent most afternoons outside."),
  childhood("p1x-child-3", "What is your happiest childhood memory?",
    "Summers at my grandparents' house. I have **a vivid memory** of picking fruit in their garden and eating it straight away - those were genuinely **carefree days**."),
  childhood("p1x-child-4", "Do you think children today have a better childhood?",
    "In some ways, yes - more opportunities and better technology. But they spend far less time outdoors, and I **look back fondly on** how much freedom we had."),
  childhood("p1x-child-5", "Were you well-behaved as a child?",
    "Mostly, though I was quite talkative in class. Moving my seat is **a vivid memory** for me, and my mother still finds the story funny."),

  // Shopping
  shopping("p1x-shop-2", "Do you prefer shopping online or in shops?",
    "Online for electronics, since I can compare prices and often find **a bargain**, but in person for clothes because sizes vary so much. Online returns are just too much trouble."),
  shopping("p1x-shop-3", "Do you enjoy shopping for clothes?",
    "In small doses. I quite like **window shopping** with a friend, but spending a whole afternoon trying things on is exhausting."),
  shopping("p1x-shop-4", "Do you often buy things you do not need?",
    "Occasionally I make **an impulse buy** during a sale and regret it. I'm on **a tight budget** at the moment, so I've started giving myself a day to think it over."),
  shopping("p1x-shop-5", "Are markets popular in your country?",
    "Very. Traditional markets are still where most families buy food, mainly because it's fresher and you can find **a bargain** if you're willing to bargain politely."),

  // Languages
  languages("p1x-lang-2", "How long have you been learning English?",
    "About ten years on and off, though I only started studying seriously two years ago. I'm now trying to **brush up on** my speaking for the IELTS test."),
  languages("p1x-lang-3", "Would you like to learn another language?",
    "I'd love to learn Japanese. The writing system looks like **a steep learning curve**, but I watch a lot of Japanese films, so I'd probably **pick up** phrases quickly."),
  languages("p1x-lang-4", "What is the best way to learn a language?",
    "Using it, honestly. Grammar books help at the start, but you only become **fluent** by speaking to real people and making a lot of mistakes."),
  languages("p1x-lang-5", "Is English important in your country?",
    "Increasingly so. Most good jobs expect you to **be fluent in** English, and many universities teach some subjects in it, so parents start their children very early."),

  // Free Time
  freeTime("p1x-free-2", "How do you like to relax after a long day?",
    "Something simple - a shower and a series episode. That's my way of **unwinding** without having to think about anything."),
  freeTime("p1x-free-3", "Do you have enough free time?",
    "Not really, especially during exam periods. I get **some downtime** on Sunday afternoons, and I've learned to protect that time."),
  freeTime("p1x-free-4", "Do you prefer spending free time alone or with others?",
    "A bit of both. During the week I need quiet time alone, but at the weekend I like to **catch up with friends** - it's a nice **change of scenery**."),
  freeTime("p1x-free-5", "Has the way you spend free time changed?",
    "Yes. I used to play video games for hours, whereas now I'd rather walk or read to **unwind**. My eyes are tired enough after work."),

  // Advertising
  advertising("p1x-ad-2", "Where do you see most advertisements?",
    "On social media, without question. I'm **bombarded with ads** every time I open an app, and they're worryingly **targeted** - I mention something and it appears."),
  advertising("p1x-ad-3", "What makes an advertisement effective?",
    "Humour and a story, rather than facts about the product. **A catchy slogan** helps too - there are jingles from my childhood I still remember word for word."),
  advertising("p1x-ad-4", "Should advertising be controlled?",
    "In some areas, yes. Children are **bombarded with ads** for junk food during their programmes, and they can't really judge what is being sold to them."),
  advertising("p1x-ad-5", "Have you ever bought something because of an advert?",
    "Yes, a pair of running shoes I saw repeatedly online. I'd say the advert built the **brand awareness** and a friend's recommendation finished the job."),

  // Libraries
  libraries("p1x-lib-2", "Did you use libraries when you were a child?",
    "Quite often. My primary school had a small one and I'd **borrow a book** every week. It was where I first got into reading properly."),
  libraries("p1x-lib-3", "What do people use libraries for nowadays?",
    "Mostly as **a quiet study space** with free wifi, especially students before exams. Borrowing physical books seems secondary now, though **reference materials** are still useful."),
  libraries("p1x-lib-4", "Do you think libraries will disappear?",
    "I doubt it, though they'll change. As long as people need somewhere free and quiet to **concentrate for hours**, libraries will have a purpose."),
  libraries("p1x-lib-5", "How could libraries be improved in your city?",
    "Longer opening hours would help enormously, and more group study rooms. Many close at five, which is exactly when working students are free."),

  // Colours
  colours("p1x-col-2", "What is your favourite colour?",
    "Dark green. It's calm without being boring, and it **suits me** better than brighter shades. Most of my clothes are green or grey."),
  colours("p1x-col-3", "Do colours affect your mood?",
    "I think so. A room painted in **neutral tones** feels much calmer, whereas strong red walls would make me restless. I notice it most in workspaces."),
  colours("p1x-col-4", "Are certain colours important in your culture?",
    "Yes - red is **a bold colour** associated with luck and celebration, so you see it everywhere at Tet and at weddings. White, on the other hand, is linked to funerals."),
  colours("p1x-col-5", "Do you like wearing bright colours?",
    "Occasionally, as an accent. I might add **a bold colour** with a scarf or shoes to **brighten up an outfit**, but not head to toe."),

  // Outdoor Activities
  outdoors("p1x-out-2", "What outdoor activities are popular in your country?",
    "Early morning exercise in the parks - walking, badminton and group aerobics. Weekend trips to the beach or mountains are popular with younger people."),
  outdoors("p1x-out-3", "Did you spend more time outdoors as a child?",
    "Far more. We were outside until dark every day, whereas now I'm often **cooped up indoors** with a laptop. I try to compensate with **a brisk walk** at lunchtime."),
  outdoors("p1x-out-4", "Does the weather affect your plans?",
    "Constantly. In the rainy season everything is **weather permitting**, and in the summer it's too hot to be outside between eleven and three."),
  outdoors("p1x-out-5", "What outdoor activity would you like to try?",
    "Hiking a multi-day trail in the north. I'd need to get much fitter first, but the idea of **getting fresh air** for three days straight really appeals to me."),

  // Family
  family("p1x-fam-2", "Do you have a large family?",
    "Fairly large by modern standards - two siblings, plus my grandparents live nearby. My **extended family** is enormous once you count cousins."),
  family("p1x-fam-3", "Who are you closest to in your family?",
    "My older sister. We **take after** our father in temperament, so we understand each other quickly, and she's the person I call when something goes wrong."),
  family("p1x-fam-4", "Do families in your country live together?",
    "Traditionally yes, three generations under one roof, and an **extended family** like that is still common in the countryside. In cities young people increasingly rent their own place for work."),
  family("p1x-fam-5", "What activities do you do together as a family?",
    "Dinner every evening is the main one, and we **make a point of** travelling together once a year. Those trips are the best **quality time** we get."),

  // Time Management
  timeMgmt("p1x-time-2", "Do you ever arrive late?",
    "Occasionally, but only because of traffic. I hate **running late**, so I usually leave fifteen minutes earlier than I need to."),
  timeMgmt("p1x-time-3", "How do you organise your day?",
    "With a simple list on my phone. I **prioritise tasks** in the morning and do the hardest one first, otherwise I'll **put it off** all day."),
  timeMgmt("p1x-time-4", "Do you think being punctual is important?",
    "Very. **Being punctual** shows you respect other people's time, and in a work context it affects how reliable people think you are."),
  timeMgmt("p1x-time-5", "Do you ever waste time?",
    "Of course - usually on my phone. I **put things off** without noticing and lose half an hour, which is why I now keep it in another room while I study."),

  // News
  news("p1x-news-2", "Do you prefer reading or watching the news?",
    "Reading, because I can **skim through** the headlines in five minutes and choose what to open. Television news moves at its own pace."),
  news("p1x-news-3", "What kind of news interests you most?",
    "Technology and education, mainly, because they relate to my studies. I also follow local news so I know what's happening in my own city."),
  news("p1x-news-4", "Do you trust the news you read?",
    "Not automatically. I check whether it comes from **reliable sources**, and if a story sounds dramatic I look for a second report before believing it."),
  news("p1x-news-5", "Do young people in your country follow the news?",
    "They do, but through social media rather than newspapers. The risk is that they only see **headlines** without the full story behind them."),

  // Food
  food("p1x-food-2", "What is your favourite dish?",
    "Bun bo Hue, without hesitation. It's spicy, filling and reminds me of family trips, so it's genuinely **comfort food** for me."),
  food("p1x-food-3", "Do you eat healthily?",
    "Reasonably. I aim for **a balanced diet** with plenty of vegetables, though I **have a sweet tooth**, so dessert is my weakness."),
  food("p1x-food-4", "Have your eating habits changed?",
    "Yes, I eat far less fast food than at university and cook more. I've also cut back on late-night snacks, which has made a noticeable difference."),
  food("p1x-food-5", "Is there any food you dislike?",
    "I'm not **a picky eater**, but I've never enjoyed very fatty meat. Apart from that, I'll try almost anything once."),

  // Animals
  animals("p1x-ani-2", "Do you like animals?",
    "Very much. I'm more of a dog person - they're such **loyal companions** - though I get on with cats too."),
  animals("p1x-ani-3", "Are pets popular in your country?",
    "Increasingly so, especially in cities. Twenty years ago dogs mainly guarded houses, whereas now people genuinely **look after** them as family members."),
  animals("p1x-ani-4", "Did you learn about animals at school?",
    "A little in biology, and we had one school trip to a nature reserve where we learned how to **look after** injured birds. Most of what I know, though, comes from documentaries."),
  animals("p1x-ani-5", "Would you like to work with animals?",
    "Not as a career, but I'd happily volunteer at a shelter. There are a lot of **stray animals** in my area and the shelters are always short of help."),

  // Home
  home("p1x-home-2", "Can you describe your home?",
    "It's a two-bedroom flat on the fifth floor. It's not large, but there's plenty of **natural light**, which makes it feel **cosy and welcoming**."),
  home("p1x-home-3", "What is your favourite room?",
    "The kitchen, oddly enough. It's where everyone ends up talking, and it's the tidiest room because we're strict about **clutter** there."),
  home("p1x-home-4", "Would you like to move house?",
    "Eventually. I'd like somewhere closer to work with a balcony. If I had the budget I'd **do up** the whole place rather than move, though."),
  home("p1x-home-5", "How do people decorate their homes in your country?",
    "Practically, with family photos and often an ancestral altar in the main room. At Tet almost everyone adds flowers and red decorations."),

  // Museums
  museums("p1x-mus-2", "Are there many museums in your city?",
    "A handful - mostly history and war museums, plus a fine arts museum. The history ones are the most visited, especially by school groups."),
  museums("p1x-mus-3", "Did you visit museums as a child?",
    "Only on school trips. We rushed through the rooms, so I remember the coach journey better than the **exhibitions**, unfortunately."),
  museums("p1x-mus-4", "How could museums attract more young people?",
    "More **hands-on displays** and better use of technology. A **guided tour** with a good storyteller can genuinely **bring history to life**, whereas glass cases alone can't."),
  museums("p1x-mus-5", "Should museums be free?",
    "Ideally yes, or at least free for students. **An exhibition** is educational, so charging high prices rather defeats the point of having museums at all."),

  // Drinks
  drinks("p1x-drink-2", "Do you drink coffee or tea?",
    "Both, at different times. Vietnamese iced coffee in the morning for **a caffeine hit**, and green tea in the afternoon because it's lighter."),
  drinks("p1x-drink-3", "Do you drink enough water?",
    "Not always. I keep a bottle on my desk to remind myself to **stay hydrated**, because I only notice I'm thirsty when I already have a headache."),
  drinks("p1x-drink-4", "Are soft drinks popular in your country?",
    "Very, especially among teenagers, though there's growing awareness about sugar. Many of my friends have consciously **cut down on sugar** in the last few years."),
  drinks("p1x-drink-5", "What do people drink at celebrations?",
    "Beer at family gatherings and weddings, and **freshly squeezed juice** or soft drinks for anyone not drinking. Tea is always on the table too."),

  // Things & Repairs
  repairs("p1x-rep-2", "Are you good at fixing things?",
    "Only simple things - changing a plug or tightening a screw. If something is **beyond repair** I'll take it to a shop rather than make it worse."),
  repairs("p1x-rep-3", "Is it easy to get things repaired where you live?",
    "Yes, fortunately. There are small repair shops on almost every street for phones, bikes and shoes, and they're quick and cheap."),
  repairs("p1x-rep-4", "Do people repair things less than in the past?",
    "Definitely. We live in **a throwaway culture** now: replacing something is often cheaper than repairing it, so items get thrown out long before they're **beyond repair**."),
  repairs("p1x-rep-5", "What was the last thing you repaired?",
    "My headphones - one side had stopped working because of **wear and tear** in the cable. I watched a video and soldered it, and they've lasted another year."),

  // Directions
  directions("p1x-dir-2", "Do you use maps on your phone?",
    "All the time. I **rely on GPS** even in areas I know reasonably well, which probably explains why my sense of direction hasn't improved."),
  directions("p1x-dir-3", "Have you ever got lost?",
    "Yes, in the old quarter of Hanoi. The alleys all look similar, so I **got lost** for about twenty minutes until I found a **landmark** I recognised."),
  directions("p1x-dir-4", "Would you ask a stranger for directions?",
    "I would, and people here are usually very helpful. The only problem is that they sometimes give directions using places only locals know."),
  directions("p1x-dir-5", "Is it easy to find your way around your city?",
    "In the newer districts yes, because the streets are in a grid. The older areas are far harder unless you **have a good sense of direction**."),

  // Clothes
  clothes("p1x-clo-2", "What kind of clothes do you usually wear?",
    "Something **comfortable and practical** - jeans and a T-shirt most days. The weather is hot, so light fabrics matter more than style."),
  clothes("p1x-clo-3", "Do you follow fashion?",
    "Not closely. I notice trends, but I mostly buy **comfortable and practical** clothes that last, rather than whatever is popular for one season."),
  clothes("p1x-clo-4", "Do you like dressing formally?",
    "Occasionally. I quite enjoy **dressing up** for a wedding or an interview, but I wouldn't want **a dress code** like that every day."),
  clothes("p1x-clo-5", "Do people in your country wear traditional clothes?",
    "Mainly at festivals and weddings, where people **dress up** properly. The ao dai is also still worn by female students in many high schools on Mondays."),

  // Sounds
  sounds("p1x-sou-2", "Is there any sound you dislike?",
    "Car alarms. There's nothing useful about them - everybody ignores them, and they cut straight through walls no matter what you do to **block out noise**."),
  sounds("p1x-sou-3", "Do you listen to music while working?",
    "Only instrumental music. Lyrics distract me, but a steady, **constant hum** in the background actually helps me focus."),
  sounds("p1x-sou-4", "What sounds remind you of your childhood?",
    "The street vendors calling out early in the morning, and **birdsong** in my grandparents' garden. Both take me straight back."),
  sounds("p1x-sou-5", "Do you prefer a quiet or a lively environment?",
    "Quiet for studying, lively for eating out. I like **soothing sounds** when I need to think and noise when I want to enjoy myself."),

  // Communication
  communication("p1x-com-2", "How often do you use social media to talk to people?",
    "Every day, mostly on messaging apps with family and classmates. It's convenient, but I try not to let it replace real conversations."),
  communication("p1x-com-3", "Do you like talking on the phone?",
    "Not particularly. I'd rather **keep it brief** on the phone and discuss anything complicated **face to face**, where I can read someone's **body language**."),
  communication("p1x-com-4", "Has technology changed how people communicate?",
    "Enormously. We're in constant contact but the conversations are shorter, and it's very easy to **misread a message** without tone of voice."),
  communication("p1x-com-5", "Are you good at explaining things?",
    "I'm getting better. I used to give too much detail, so now I **keep it brief** and add explanation only if the person asks."),

  // Goals
  goals("p1x-goal-2", "What is your main goal at the moment?",
    "Getting the IELTS band I need for my master's application. It's **a realistic target** if I keep practising speaking four times a week."),
  goals("p1x-goal-3", "Do you write your goals down?",
    "Yes, in a notebook. Writing them down makes them feel real, and it's easier to **keep track of progress** when I can see the list."),
  goals("p1x-goal-4", "What do you do when you fail to reach a goal?",
    "I try to work out whether the goal or the plan was wrong. Usually it's the plan - I've been too ambitious about how much time I actually have."),
  goals("p1x-goal-5", "Are long-term goals important?",
    "They give direction, but I find **short-term goals** more motivating day to day. A five-year plan is useless without something to do this week."),

  // School Subjects
  subjects("p1x-sub-2", "Which subject did you find most difficult?",
    "Chemistry. I could memorise the equations but I never understood why they worked, so I always **struggled with** the harder problems."),
  subjects("p1x-sub-3", "Do you think schools teach the right subjects?",
    "Mostly, though I'd add personal finance and basic cooking. They're **practical lessons** everybody needs and almost nobody is taught formally."),
  subjects("p1x-sub-4", "Did you prefer practical or theoretical lessons?",
    "**Practical lessons**, definitely. In biology we did experiments a few times a term, and I remember those far better than any textbook chapter."),
  subjects("p1x-sub-5", "Would you like to study a new subject now?",
    "Psychology, I think. It's **a demanding subject**, but understanding why people behave the way they do would be useful in almost any job."),

  // Places
  places("p1x-pla-2", "What is your favourite place in your city?",
    "A small lake near my house. It has **a lively atmosphere** in the evening but it's still calm enough to walk and think."),
  places("p1x-pla-3", "Do you prefer indoor or outdoor places?",
    "Outdoor, when the weather allows. I'd choose a quiet park bench over a shopping centre that's **packed with people**, even though the centres are air-conditioned."),
  places("p1x-pla-4", "Are there any places you would like to visit in your country?",
    "Ha Giang in the north. It's still fairly **off the beaten track**, and the mountain scenery there looks completely different from where I live."),
  places("p1x-pla-5", "How have places in your city changed?",
    "Rapidly. Areas that were fields ten years ago are now **bustling** with apartment blocks, and old cafes have been replaced by chains."),

  // Money
  money("p1x-mon-2", "Do you prefer paying by cash or card?",
    "Card, or rather my phone. **Cashless payments** are accepted almost everywhere now, and it makes it much easier to **keep an eye on spending**."),
  money("p1x-mon-3", "Did your parents teach you about money?",
    "Yes, they were quite strict about it. I got a small allowance and had to make it last the month, which taught me to **live within my means**."),
  money("p1x-mon-4", "Are you saving for anything at the moment?",
    "I'm **saving up for** a trip to Japan next year. I transfer a fixed amount every payday so I'm not tempted to spend it."),
  money("p1x-mon-5", "Should schools teach children about money?",
    "Absolutely. Learning to **live within your means** is something everyone deals with sooner or later, and most people currently learn it the hard way instead."),

  // Transport
  transport("p1x-tra-3", "What is the traffic like where you live?",
    "Heavy at **rush hour**, especially between seven and eight in the morning. Outside those hours it's manageable, but you always plan extra time."),
  transport("p1x-tra-4", "How could transport be improved in your city?",
    "More metro lines, mainly. Buses exist but they're not **a reliable service** yet, so people stick to motorbikes and everyone **gets stuck in traffic**."),
  transport("p1x-tra-5", "Do you enjoy your daily commute?",
    "Not really, though I've made peace with it. I **commute** about forty minutes each way and use the time to listen to podcasts."),

  // Photography
  photography("p1x-pho-3", "Do you prefer taking photos of people or places?",
    "Places, usually. I'm not confident enough to **capture a moment** with people naturally, whereas landscapes wait patiently for you."),
  photography("p1x-pho-4", "Do you edit your photos?",
    "Only lightly - brightness and cropping. I don't like heavily **edited photos** because they stop looking like the place I actually visited."),
  photography("p1x-pho-5", "Do you keep printed photographs?",
    "A few in an album at my parents' house. Almost everything is digital now, but printed photos **capture a moment** better, so I print the best ones each year."),
];

export const SPEAKING_PRACTICE_EXPANSION_4: { part1: SpeakingPracticeQuestion[] } = {
  part1: build2(1, seeds),
};
