/**
 * IELTS Speaking Practice - extra question bank (Part 1 / 2 / 3).
 * Merged into speakingPracticeData so the practice page shows more topics.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion, VocabItem } from "./speakingPracticeData";

const v = (phrase: string, vietnamese: string): VocabItem => ({ phrase, vietnamese });

interface Seed {
  id: string;
  topic: string;
  question: string;
  prompts?: string[];
  vocab: [string, string][];
  structures: string[];
  ideas: string[];
  model: string;
}

const build = (part: 1 | 2 | 3, seeds: Seed[]): SpeakingPracticeQuestion[] =>
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

// ===================== PART 1 =====================
const part1Seeds: Seed[] = [
  {
    id: "px1-sleep-1",
    topic: "Sleep & Routines",
    question: "Do you usually get enough sleep?",
    vocab: [
      ["To be a light sleeper", "Người ngủ không sâu giấc"],
      ["To catch up on sleep", "Ngủ bù"],
      ["A solid eight hours", "Ngủ đủ tám tiếng"],
      ["To toss and turn", "Trằn trọc"],
      ["To wind down before bed", "Thư giãn trước khi ngủ"],
    ],
    structures: [
      "Ideally, I'd get..., but in reality...",
      "It really depends on how busy my week is.",
      "I've found that... helps me sleep much better.",
    ],
    ideas: ["Weekday vs weekend contrast", "Screen time before bed", "Effect on concentration next day"],
    model:
      "Honestly, not always. On weekdays I rarely manage **a solid eight hours** because I study late, so I often **catch up on sleep** at the weekend. I've noticed that if I **wind down** with a book instead of my phone, I fall asleep far more quickly and feel much sharper the next morning.",
  },
  {
    id: "px1-weather-1",
    topic: "Weather & Seasons",
    question: "What kind of weather do you like most?",
    vocab: [
      ["Crisp autumn air", "Không khí mùa thu se lạnh"],
      ["Scorching heat", "Cái nóng gay gắt"],
      ["A downpour", "Trận mưa như trút"],
      ["Mild and breezy", "Mát mẻ, có gió nhẹ"],
      ["To be cooped up indoors", "Bị nhốt trong nhà"],
    ],
    structures: [
      "If I had to choose, I'd go for...",
      "I'm not a big fan of... because...",
      "That's mainly because it lets me...",
    ],
    ideas: ["Link weather to activities", "Compare two seasons", "Mention your city's climate"],
    model:
      "If I had to choose, I'd go for **mild and breezy** autumn days. The **crisp autumn air** is perfect for cycling, whereas in summer the **scorching heat** keeps me **cooped up indoors** with the air conditioning on all afternoon.",
  },
  {
    id: "px1-shopping-1",
    topic: "Shopping",
    question: "Do you prefer shopping online or in stores?",
    vocab: [
      ["To browse", "Xem hàng, dạo xem"],
      ["An impulse buy", "Mua theo cảm hứng"],
      ["Value for money", "Đáng đồng tiền"],
      ["To hunt for bargains", "Săn hàng giảm giá"],
      ["Hassle-free returns", "Đổi trả dễ dàng"],
    ],
    structures: [
      "It depends on what I'm buying, to be honest.",
      "For everyday things, I tend to..., whereas for..., I'd rather...",
      "The main advantage for me is...",
    ],
    ideas: ["Clothes need fitting", "Online is cheaper/faster", "Impulse buying risk"],
    model:
      "It depends on what I'm buying. For books or electronics I shop online because it's cheaper and there are **hassle-free returns**. But with clothes I'd rather **browse** in a store, otherwise I end up with **impulse buys** that don't fit and never offer **value for money**.",
  },
  {
    id: "px1-music-1",
    topic: "Music",
    question: "When do you usually listen to music?",
    vocab: [
      ["To be in the mood for", "Đang có hứng với"],
      ["An upbeat track", "Bài hát sôi động"],
      ["To lift my spirits", "Làm tôi phấn chấn"],
      ["Background music", "Nhạc nền"],
      ["To have it on repeat", "Nghe đi nghe lại"],
    ],
    structures: [
      "I'd say the main time is when...",
      "Whenever I'm..., I'll put on...",
      "It really helps me... ",
    ],
    ideas: ["Commuting", "Studying with lo-fi", "Music to change mood"],
    model:
      "Mostly when I'm commuting or cleaning the flat. If I'm tired, an **upbeat track** genuinely **lifts my spirits**, and when I study I keep quiet **background music** on. If I really love a song, I'll shamelessly **have it on repeat** for a week.",
  },
  {
    id: "px1-cooking-1",
    topic: "Food & Cooking",
    question: "Do you enjoy cooking at home?",
    vocab: [
      ["To whip something up", "Nấu nhanh món gì đó"],
      ["A go-to recipe", "Món tủ"],
      ["To eat out", "Ăn ngoài"],
      ["Home-cooked meal", "Bữa cơm nhà"],
      ["To be a fussy eater", "Kén ăn"],
    ],
    structures: [
      "I'd describe myself as a fairly... cook.",
      "During the week I usually..., but at weekends...",
      "What I enjoy most about it is...",
    ],
    ideas: ["Time constraints on weekdays", "Cooking as relaxation", "Health and cost"],
    model:
      "I do, although I'm no chef. On busy weekdays I just **whip up** something simple like fried rice, my **go-to recipe**. At weekends I take my time, and a proper **home-cooked meal** is both healthier and far cheaper than **eating out**.",
  },
  {
    id: "px1-transport-1",
    topic: "Transport",
    question: "How do you usually travel around your city?",
    vocab: [
      ["Public transport", "Giao thông công cộng"],
      ["Rush hour", "Giờ cao điểm"],
      ["To be stuck in traffic", "Kẹt xe"],
      ["Within walking distance", "Trong khoảng cách đi bộ"],
      ["A reliable service", "Dịch vụ đáng tin cậy"],
    ],
    structures: [
      "Nine times out of ten, I...",
      "I avoid... because...",
      "The bus network here is pretty...",
    ],
    ideas: ["Cost comparison", "Traffic congestion", "Environmental angle"],
    model:
      "Nine times out of ten I take the bus, mainly because parking is a nightmare and I hate **being stuck in traffic** during **rush hour**. Luckily my university is almost **within walking distance**, so on sunny days I just walk and save the fare.",
  },
  {
    id: "px1-social-media-1",
    topic: "Technology",
    question: "How much time do you spend on social media?",
    vocab: [
      ["To scroll endlessly", "Lướt mãi không dứt"],
      ["Screen time", "Thời gian dùng màn hình"],
      ["To stay in touch", "Giữ liên lạc"],
      ["A digital detox", "Cai nghiện công nghệ"],
      ["Information overload", "Quá tải thông tin"],
    ],
    structures: [
      "Probably more than I'd like to admit...",
      "I mainly use it to..., rather than...",
      "Recently I've tried to cut down by...",
    ],
    ideas: ["Useful for family abroad", "Distraction while studying", "App timers"],
    model:
      "Probably more than I'd like to admit - around an hour a day. I mainly use it **to stay in touch** with relatives abroad, but it's easy to **scroll endlessly** and lose half an evening, so I've set app limits to bring my **screen time** down.",
  },
  {
    id: "px1-reading-1",
    topic: "Reading",
    question: "Do you read much in your free time?",
    vocab: [
      ["A page-turner", "Cuốn sách cuốn hút"],
      ["To get through a book", "Đọc xong một cuốn"],
      ["Non-fiction", "Sách phi hư cấu"],
      ["To broaden your knowledge", "Mở rộng kiến thức"],
      ["An e-reader", "Máy đọc sách"],
    ],
    structures: [
      "I try to read at least...",
      "I'm more into... than...",
      "The last book I read was..., and it...",
    ],
    ideas: ["Paper vs digital", "Reading before bed", "Reading in English for IELTS"],
    model:
      "I try to read for twenty minutes before bed. I'm more into **non-fiction** these days because it helps me **broaden my knowledge**, though if I find a real **page-turner** I can **get through a book** in a weekend.",
  },
  {
    id: "px1-friends-1",
    topic: "Friends",
    question: "Do you prefer spending time with a few close friends or a big group?",
    vocab: [
      ["A close-knit group", "Nhóm bạn thân thiết"],
      ["To hit it off", "Hợp nhau ngay"],
      ["Small talk", "Chuyện phiếm"],
      ["To catch up", "Hàn huyên, cập nhật tin tức"],
      ["A social butterfly", "Người rất giỏi giao tiếp"],
    ],
    structures: [
      "I'm definitely more of a... person.",
      "With big groups I find that...",
      "That said, occasionally I do enjoy...",
    ],
    ideas: ["Depth vs breadth of conversation", "Introvert/extrovert", "Weekend routine"],
    model:
      "I'm definitely more of a small-group person. With a **close-knit group** you can really **catch up** properly, whereas big parties usually mean an hour of **small talk**. I'm not much of a **social butterfly**, to be honest.",
  },
  {
    id: "px1-photos-1",
    topic: "Photography",
    question: "Do you like taking photographs?",
    vocab: [
      ["To capture a moment", "Ghi lại khoảnh khắc"],
      ["A candid shot", "Ảnh chụp tự nhiên"],
      ["To edit photos", "Chỉnh sửa ảnh"],
      ["Scenery", "Phong cảnh"],
      ["To look back on", "Nhìn lại"],
    ],
    structures: [
      "I wouldn't call myself a photographer, but...",
      "I mostly take pictures of...",
      "For me the point is...",
    ],
    ideas: ["Travel memories", "Phone vs camera", "Sharing with family"],
    model:
      "I wouldn't call myself a photographer, but I love **capturing moments** when I travel. I prefer **candid shots** of friends to posed ones, and years later it's lovely **to look back on** them, even if I never bother **editing** any of them.",
  },
];

// ===================== PART 2 =====================
const part2Seeds: Seed[] = [
  {
    id: "px2-app",
    topic: "An App You Use",
    question: "Describe a mobile app you use often.",
    prompts: ["What the app is", "How you found it", "How often you use it", "Why it is useful to you"],
    vocab: [
      ["User-friendly interface", "Giao diện dễ dùng"],
      ["To streamline a task", "Đơn giản hoá công việc"],
      ["Notifications", "Thông báo"],
      ["To be hooked on", "Bị nghiện"],
      ["A game-changer", "Thứ thay đổi cuộc chơi"],
    ],
    structures: [
      "The app I'd like to talk about is..., which I stumbled across...",
      "What makes it stand out is...",
      "All in all, it's been a real game-changer because...",
    ],
    ideas: ["Language app / maps / banking", "Daily habit built around it", "One concrete example of use"],
    model:
      "I'd like to talk about a language app I've been using for about two years. A classmate recommended it, and I was **hooked on** it within a week thanks to its **user-friendly interface** and daily **notifications**. It **streamlines** revision into ten-minute chunks, so even on hectic days I keep my streak. For someone preparing for IELTS, it has honestly been **a game-changer**.",
  },
  {
    id: "px2-skill",
    topic: "A Skill You Learned",
    question: "Describe a practical skill you learned recently.",
    prompts: ["What the skill is", "How you learned it", "How difficult it was", "How it has helped you"],
    vocab: [
      ["To pick up a skill", "Học được một kỹ năng"],
      ["Trial and error", "Thử và sai"],
      ["A steep learning curve", "Giai đoạn học rất vất vả"],
      ["To get the hang of", "Quen tay, nắm được"],
      ["Hands-on practice", "Thực hành trực tiếp"],
    ],
    structures: [
      "The skill I'd like to describe is..., which I took up...",
      "At first it was a steep learning curve because...",
      "Now that I've got the hang of it, I...",
    ],
    ideas: ["Cooking, driving, coding, editing", "Free online tutorials", "Mistakes made early on"],
    model:
      "The skill I'd like to describe is basic video editing, which I picked up last summer from free tutorials. At the start it was **a steep learning curve** - my first clips were a mess of **trial and error**. But after weeks of **hands-on practice** I finally **got the hang of** timing and subtitles, and now I edit short lesson videos for my class in under an hour.",
  },
  {
    id: "px2-conversation",
    topic: "A Memorable Conversation",
    question: "Describe a conversation that changed the way you think.",
    prompts: ["Who you talked to", "When and where it happened", "What you talked about", "Why it mattered to you"],
    vocab: [
      ["An eye-opener", "Điều mở mang tầm mắt"],
      ["To see things differently", "Nhìn nhận khác đi"],
      ["Blunt advice", "Lời khuyên thẳng thắn"],
      ["To take something on board", "Tiếp thu điều gì đó"],
      ["A turning point", "Bước ngoặt"],
    ],
    structures: [
      "This happened about... years ago, when...",
      "What struck me most was when they said...",
      "Looking back, it was a genuine turning point because...",
    ],
    ideas: ["Teacher/mentor advice", "A hard truth you needed", "How your behaviour changed after"],
    model:
      "About two years ago my mentor gave me some rather **blunt advice** about my study habits. She pointed out that I was busy rather than productive, which was a real **eye-opener**. I **took it on board**, rebuilt my timetable around three deep-work blocks, and my results improved within a term. That short chat was a genuine **turning point**.",
  },
  {
    id: "px2-quiet-place",
    topic: "A Quiet Place",
    question: "Describe a quiet place you like to go to.",
    prompts: ["Where it is", "How often you go", "What you do there", "Why you find it relaxing"],
    vocab: [
      ["Off the beaten track", "Ít người biết đến"],
      ["Peace and quiet", "Sự yên tĩnh"],
      ["To recharge my batteries", "Nạp lại năng lượng"],
      ["A hidden gem", "Viên ngọc ẩn"],
      ["Serene atmosphere", "Không gian thanh bình"],
    ],
    structures: [
      "The place I have in mind is..., tucked away...",
      "Whenever I need to clear my head, I...",
      "What I love about it is the...",
    ],
    ideas: ["Library, lake, rooftop, temple", "Sensory details", "Contrast with noisy city"],
    model:
      "The place I have in mind is a small lakeside park about fifteen minutes from my house - a real **hidden gem** that's slightly **off the beaten track**. I go there on Sunday mornings to walk and read. The **serene atmosphere**, with just birdsong and the odd jogger, lets me **recharge my batteries** before another demanding week.",
  },
  {
    id: "px2-tradition",
    topic: "A Tradition",
    question: "Describe a tradition in your country that you enjoy.",
    prompts: ["What the tradition is", "When it takes place", "What people do", "Why you like it"],
    vocab: [
      ["To be deeply rooted in", "Ăn sâu vào"],
      ["To pass down through generations", "Truyền qua các thế hệ"],
      ["A festive atmosphere", "Không khí lễ hội"],
      ["Extended family", "Đại gia đình"],
      ["Cultural heritage", "Di sản văn hoá"],
    ],
    structures: [
      "The tradition I'd like to describe is..., which takes place...",
      "It's deeply rooted in our... and has been passed down...",
      "The reason I'm so fond of it is...",
    ],
    ideas: ["Lunar New Year, mid-autumn, harvest", "Food and family rituals", "Modern changes to the custom"],
    model:
      "I'd like to talk about Tet, our Lunar New Year, which is **deeply rooted in** Vietnamese **cultural heritage**. For several days the whole **extended family** gathers, we clean the house, cook banh chung and visit relatives. What I love is the **festive atmosphere** in the streets and the sense that customs **passed down through generations** still bring everyone together.",
  },
  {
    id: "px2-difficult-decision",
    topic: "A Difficult Decision",
    question: "Describe a difficult decision you had to make.",
    prompts: ["What the decision was", "What options you had", "How you decided", "How you feel about it now"],
    vocab: [
      ["To weigh up the pros and cons", "Cân nhắc lợi hại"],
      ["To be torn between", "Phân vân giữa"],
      ["A leap of faith", "Bước đi liều lĩnh"],
      ["In hindsight", "Nhìn lại thì"],
      ["To have no regrets", "Không hối tiếc"],
    ],
    structures: [
      "The decision I'd like to describe was whether to...",
      "I was torn between... and..., so I sat down and weighed up...",
      "In hindsight, I'm convinced I made the right call because...",
    ],
    ideas: ["Major/university choice", "Moving city", "Turning down a job"],
    model:
      "The hardest decision I've made was turning down a stable job to study abroad. I was genuinely **torn between** financial security and long-term growth, so I **weighed up the pros and cons** with my parents for weeks. Choosing to leave felt like **a leap of faith**, but **in hindsight** the exposure I gained was priceless, and I **have no regrets**.",
  },
  {
    id: "px2-teacher",
    topic: "A Teacher",
    question: "Describe a teacher who influenced you.",
    prompts: ["Who the teacher was", "What subject they taught", "What they were like", "How they influenced you"],
    vocab: [
      ["To bring a subject to life", "Làm môn học trở nên sinh động"],
      ["Patient and approachable", "Kiên nhẫn và dễ gần"],
      ["To instil confidence in", "Gieo sự tự tin cho"],
      ["Constructive feedback", "Phản hồi mang tính xây dựng"],
      ["To go the extra mile", "Nỗ lực hơn mức cần thiết"],
    ],
    structures: [
      "The teacher I'd like to talk about is..., who taught me...",
      "What set her apart was the way she...",
      "Thanks to her, I...",
    ],
    ideas: ["A specific lesson you remember", "Extra help after class", "Long-term effect on your choices"],
    model:
      "I'd like to talk about my secondary school English teacher. She was **patient and approachable**, and she genuinely **brought the subject to life** with songs, debates and news clips instead of endless grammar drills. She always **went the extra mile**, giving **constructive feedback** on every essay, and that steadily **instilled confidence in** me. It's largely why I'm still studying languages today.",
  },
  {
    id: "px2-gadget",
    topic: "A Useful Object",
    question: "Describe an everyday object you could not live without.",
    prompts: ["What the object is", "How long you have had it", "How you use it", "Why it matters to you"],
    vocab: [
      ["Indispensable", "Không thể thiếu"],
      ["To rely on", "Phụ thuộc vào"],
      ["Portable", "Dễ mang theo"],
      ["Battery life", "Thời lượng pin"],
      ["Wear and tear", "Hao mòn"],
    ],
    structures: [
      "The object I'd choose is..., which I've had for...",
      "I rely on it mainly for...",
      "It might sound trivial, but...",
    ],
    ideas: ["Headphones, laptop, notebook, bike", "A day without it", "Emotional value"],
    model:
      "The object I'd choose is my pair of noise-cancelling headphones, which I've had for three years. They're light, **portable** and the **battery life** lasts an entire day, so I **rely on** them for studying in noisy cafés. Despite obvious **wear and tear**, they're **indispensable** - without them my concentration collapses.",
  },
  {
    id: "px2-volunteering",
    topic: "Helping Others",
    question: "Describe a time you helped someone in your community.",
    prompts: ["Who you helped", "What the situation was", "What you did", "How you felt afterwards"],
    vocab: [
      ["To lend a hand", "Giúp một tay"],
      ["A worthwhile cause", "Một việc đáng làm"],
      ["To make a difference", "Tạo ra sự khác biệt"],
      ["Grassroots initiative", "Sáng kiến cộng đồng"],
      ["Rewarding", "Đáng giá, mãn nguyện"],
    ],
    structures: [
      "The occasion I'd like to describe took place...",
      "My role was mainly to..., which involved...",
      "It was incredibly rewarding because...",
    ],
    ideas: ["Free tutoring", "Flood relief", "Clean-up campaign"],
    model:
      "Last summer I joined a **grassroots initiative** giving free English lessons to children in my neighbourhood. I taught a group of eight every Saturday morning, preparing simple games and songs. Seeing shy kids answer confidently after two months proved that even a few hours a week can **make a difference**, and it was easily the most **rewarding** thing I did all year.",
  },
  {
    id: "px2-news-story",
    topic: "A News Story",
    question: "Describe a news story that caught your attention.",
    prompts: ["What the story was about", "Where you heard it", "Why it interested you", "How you felt about it"],
    vocab: [
      ["To make headlines", "Lên trang nhất"],
      ["Coverage", "Sự đưa tin"],
      ["To spark debate", "Làm dấy lên tranh luận"],
      ["A breakthrough", "Bước đột phá"],
      ["Misinformation", "Thông tin sai lệch"],
    ],
    structures: [
      "The story I'd like to describe made headlines...",
      "I came across it while...",
      "It struck me because...",
    ],
    ideas: ["Scientific breakthrough", "Local environmental issue", "Sports achievement"],
    model:
      "The story that stuck with me was a medical **breakthrough** in early cancer detection using AI, which **made headlines** back in spring. I came across the **coverage** while scrolling the news at breakfast. It **sparked debate** about privacy, but what struck me most was how technology I study every day could actually save lives.",
  },
];

// ===================== PART 3 =====================
const part3Seeds: Seed[] = [
  {
    id: "px3-work-1",
    topic: "Work & Careers",
    question: "Do you think people will change jobs more often in the future?",
    vocab: [
      ["Job security", "Sự ổn định công việc"],
      ["The gig economy", "Nền kinh tế tự do"],
      ["Transferable skills", "Kỹ năng có thể chuyển đổi"],
      ["To reskill", "Học lại kỹ năng mới"],
      ["A linear career path", "Lộ trình nghề nghiệp tuyến tính"],
    ],
    structures: [
      "There's a growing consensus that...",
      "One could argue that..., although...",
      "In the long run, I'd expect...",
    ],
    ideas: ["Automation reshaping roles", "Younger workers value flexibility", "Lifelong learning"],
    model:
      "Almost certainly. The idea of **a linear career path** with one employer for life is fading, partly because of **the gig economy** and partly because automation keeps redefining roles. People who can **reskill** quickly and carry **transferable skills** between industries will thrive, though the trade-off is clearly less **job security**.",
  },
  {
    id: "px3-education-1",
    topic: "Education",
    question: "Should schools teach practical life skills as well as academic subjects?",
    vocab: [
      ["Financial literacy", "Hiểu biết tài chính"],
      ["A well-rounded education", "Nền giáo dục toàn diện"],
      ["An overloaded curriculum", "Chương trình quá tải"],
      ["To equip students with", "Trang bị cho học sinh"],
      ["Real-world application", "Ứng dụng thực tế"],
    ],
    structures: [
      "I'd strongly argue that...",
      "The counter-argument is usually that..., but...",
      "A sensible compromise might be to...",
    ],
    ideas: ["Budgeting, cooking, first aid", "Curriculum time is limited", "Integrate skills into existing subjects"],
    model:
      "I'd strongly argue they should. Many graduates leave school with no **financial literacy** whatsoever, which shows how narrow a purely academic focus can be. Critics say the timetable is already **an overloaded curriculum**, but skills like budgeting could be embedded in maths, giving genuine **real-world application** and **a well-rounded education**.",
  },
  {
    id: "px3-environment-1",
    topic: "Environment",
    question: "Whose responsibility is it to protect the environment: individuals or governments?",
    vocab: [
      ["Carbon footprint", "Dấu chân carbon"],
      ["Systemic change", "Thay đổi mang tính hệ thống"],
      ["To impose regulations", "Áp đặt quy định"],
      ["Collective action", "Hành động tập thể"],
      ["Greenwashing", "Tẩy xanh, quảng cáo xanh giả"],
    ],
    structures: [
      "It's not really an either-or question...",
      "While individuals can..., only governments can...",
      "Ultimately, the two reinforce each other because...",
    ],
    ideas: ["Recycling vs industrial emissions", "Carbon taxes", "Corporate accountability"],
    model:
      "It isn't really an either-or question. Individuals can reduce their **carbon footprint** by cutting waste, yet those choices are marginal next to industrial emissions. Only governments can **impose regulations** and drive **systemic change** - though public pressure through **collective action** is exactly what pushes politicians to act in the first place.",
  },
  {
    id: "px3-technology-1",
    topic: "Technology",
    question: "Has technology made people less patient?",
    vocab: [
      ["Instant gratification", "Sự thoả mãn tức thì"],
      ["An attention span", "Khả năng tập trung"],
      ["To be bombarded with", "Bị dội bom bởi"],
      ["Deep work", "Làm việc tập trung sâu"],
      ["On-demand services", "Dịch vụ theo yêu cầu"],
    ],
    structures: [
      "There's certainly some truth in that...",
      "That said, I'd be cautious about generalising because...",
      "Evidence suggests..., although...",
    ],
    ideas: ["Same-day delivery expectations", "Short-form video", "Skills that still need patience"],
    model:
      "There's certainly some truth in that. With **on-demand services** and endless short videos, we're conditioned to expect **instant gratification**, and many people find their **attention span** shrinking. That said, I'd be cautious about generalising: plenty of young people still commit years to music or research, which shows patience hasn't disappeared - it's simply been redistributed.",
  },
  {
    id: "px3-city-1",
    topic: "Cities & Housing",
    question: "What problems do fast-growing cities face?",
    vocab: [
      ["Urban sprawl", "Đô thị mở rộng thiếu kiểm soát"],
      ["To place strain on infrastructure", "Gây áp lực lên hạ tầng"],
      ["Affordable housing", "Nhà ở giá phải chăng"],
      ["Congestion", "Ùn tắc"],
      ["Green space", "Không gian xanh"],
    ],
    structures: [
      "The most pressing issue is arguably...",
      "This is compounded by...",
      "A workable solution would be to...",
    ],
    ideas: ["Housing prices", "Transport planning", "Loss of parks"],
    model:
      "The most pressing issue is arguably housing: rapid migration pushes prices up until **affordable housing** disappears. That's compounded by **congestion** and **urban sprawl**, which **place enormous strain on infrastructure**. Cities that invest early in metro networks and protect **green space** cope far better than those that simply keep widening roads.",
  },
  {
    id: "px3-culture-1",
    topic: "Culture & Globalisation",
    question: "Is globalisation a threat to local cultures?",
    vocab: [
      ["Cultural identity", "Bản sắc văn hoá"],
      ["Homogenisation", "Sự đồng hoá"],
      ["To dilute traditions", "Làm phai nhạt truyền thống"],
      ["Cross-cultural exchange", "Giao lưu văn hoá"],
      ["To preserve heritage", "Bảo tồn di sản"],
    ],
    structures: [
      "While I accept that..., it can also...",
      "It largely depends on whether...",
      "On balance, I'd say...",
    ],
    ideas: ["Global brands vs local food", "Tourism funding heritage", "Young people and language loss"],
    model:
      "While I accept that global brands can **dilute traditions** and lead to a certain cultural **homogenisation**, globalisation also finances efforts **to preserve heritage** through tourism and gives minority cultures a global audience. On balance, the outcome depends on whether governments actively protect **cultural identity** while welcoming **cross-cultural exchange**.",
  },
  {
    id: "px3-health-1",
    topic: "Health",
    question: "Why do many people find it hard to stay healthy nowadays?",
    vocab: [
      ["A sedentary lifestyle", "Lối sống ít vận động"],
      ["Processed food", "Thực phẩm chế biến sẵn"],
      ["To be under constant pressure", "Chịu áp lực liên tục"],
      ["Preventive healthcare", "Y tế dự phòng"],
      ["To break a bad habit", "Bỏ thói quen xấu"],
    ],
    structures: [
      "There are several overlapping reasons...",
      "The root cause, in my view, is...",
      "Tackling this would require...",
    ],
    ideas: ["Desk jobs", "Cheap fast food", "Stress and sleep debt"],
    model:
      "There are several overlapping reasons. Most jobs now involve **a sedentary lifestyle**, and because people are **under constant pressure**, cheap **processed food** becomes the default. The root cause, in my view, is time poverty rather than ignorance, so investing in **preventive healthcare** and shorter working hours would help more than another awareness campaign.",
  },
  {
    id: "px3-media-1",
    topic: "Media",
    question: "How reliable is the news people read online?",
    vocab: [
      ["Fact-checking", "Kiểm chứng thông tin"],
      ["Clickbait", "Tiêu đề giật gân"],
      ["An echo chamber", "Buồng vọng thông tin"],
      ["Editorial standards", "Chuẩn mực biên tập"],
      ["To verify a source", "Xác minh nguồn tin"],
    ],
    structures: [
      "It varies enormously depending on...",
      "The danger is that...",
      "The obvious remedy is to...",
    ],
    ideas: ["Established outlets vs social feeds", "Algorithms and bias", "Media literacy in schools"],
    model:
      "It varies enormously. Established outlets still maintain **editorial standards** and proper **fact-checking**, whereas social feeds reward **clickbait** and trap users in **an echo chamber**. The obvious remedy is teaching people **to verify sources** at school, because regulation alone will never keep pace with how quickly misinformation spreads.",
  },
  {
    id: "px3-money-1",
    topic: "Money & Society",
    question: "Do you think money makes people happier?",
    vocab: [
      ["Financial stability", "Ổn định tài chính"],
      ["Diminishing returns", "Lợi ích giảm dần"],
      ["Materialistic", "Coi trọng vật chất"],
      ["Quality of life", "Chất lượng cuộc sống"],
      ["To live within your means", "Sống trong khả năng chi trả"],
    ],
    structures: [
      "Up to a point, yes, because...",
      "Beyond that threshold, however...",
      "What seems to matter more is...",
    ],
    ideas: ["Income and stress", "Research on income thresholds", "Relationships and purpose"],
    model:
      "Up to a point, yes. **Financial stability** removes the daily stress of rent and medical bills, which clearly improves **quality of life**. Beyond a certain threshold, though, extra income brings **diminishing returns**, and overly **materialistic** goals can even harm wellbeing. What matters more is purpose, relationships and simply **living within your means**.",
  },
  {
    id: "px3-travel-1",
    topic: "Travel & Tourism",
    question: "What are the drawbacks of mass tourism?",
    vocab: [
      ["Overtourism", "Quá tải du lịch"],
      ["To price out locals", "Đẩy người dân địa phương ra khỏi thị trường"],
      ["Seasonal employment", "Việc làm theo mùa"],
      ["Environmental degradation", "Suy thoái môi trường"],
      ["Sustainable tourism", "Du lịch bền vững"],
    ],
    structures: [
      "The most visible drawback is...",
      "A less obvious consequence is...",
      "Rather than..., destinations would be better off...",
    ],
    ideas: ["Housing costs in tourist cities", "Waste and coral damage", "Visitor caps and fees"],
    model:
      "The most visible drawback is **environmental degradation** - beaches and heritage sites simply cannot absorb millions of visitors. A less obvious consequence is that short-term rentals **price out locals**, while the jobs created are often low-paid and **seasonal**. Rather than chasing volume, destinations would be better off capping numbers and promoting **sustainable tourism**.",
  },
];

export const SPEAKING_PRACTICE_EXPANSION = {
  part1: build(1, part1Seeds),
  part2: build(2, part2Seeds),
  part3: build(3, part3Seeds),
};
