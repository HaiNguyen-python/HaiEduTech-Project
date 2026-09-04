/**
 * IELTS Speaking Practice - Part 2 top-up bank.
 * A second cue card for the most frequently examined Part 2 topics, so
 * students can practise the same topic twice with different angles.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion } from "./speakingPracticeData";
import { build2, type Seed2 } from "./speakingPracticeExpansion2";

type Pair = [string, string];

const cue = (
  id: string,
  topicName: string,
  question: string,
  prompts: [string, string, string, string],
  vocab: Pair[],
  structures: string[],
  ideas: string[],
  model: string,
): Seed2 => ({ id, topic: topicName, question, prompts, vocab, structures, ideas, model });

const NARRATE = [
  "I'd like to talk about...",
  "The reason it stands out is that...",
  "Looking back on it now, I'd say...",
];

const seeds: Seed2[] = [
  cue("p2x-person-admire-2", "A Person You Admire",
    "Describe a person you admire for their work ethic.",
    ["Who this person is", "What kind of work they do", "How they work", "Why you admire them"],
    [["To go the extra mile", "Làm hơn cả mức yêu cầu"], ["Dedication", "Sự tận tụy"], ["To set an example", "Làm gương"], ["Down-to-earth", "Giản dị, thực tế"]],
    NARRATE, ["A teacher or manager", "Long hours", "Quiet influence"],
    "I'd like to talk about my former manager, Ms Lan, who ran a small design studio where I interned. She was the first in and the last out, but what struck me wasn't the hours - it was that she'd **go the extra mile** for junior staff, sitting with us to explain feedback instead of simply rejecting our work. Despite running the company she stayed completely **down-to-earth**, and that **dedication** **set an example** the whole team followed. Looking back, she taught me that leadership is mostly about the standard you keep when nobody is watching."),

  cue("p2x-place-visit-2", "A Place You Like to Visit",
    "Describe a place you often go to relax.",
    ["Where it is", "How often you go there", "What you do there", "Why it relaxes you"],
    [["A change of scenery", "Đổi không khí"], ["To recharge", "Nạp lại năng lượng"], ["Tranquil", "Tĩnh lặng"], ["To clear your head", "Làm đầu óc thư thái"]],
    NARRATE, ["A lakeside path", "Early mornings", "No phone"],
    "The place I'd choose is a small lake about fifteen minutes from my flat. I go there two or three evenings a week, usually alone, and simply walk the path around it for half an hour. It isn't spectacular, but after a day of screens that **change of scenery** is exactly what I need to **clear my head**. The water is **tranquil** even when the traffic behind it isn't, and I always come home feeling **recharged**."),

  cue("p2x-book-2", "A Book You Enjoyed",
    "Describe a book that taught you something useful.",
    ["What the book was", "When you read it", "What it taught you", "How you have used that lesson"],
    [["A page-turner", "Cuốn sách cuốn hút"], ["Practical advice", "Lời khuyên thiết thực"], ["To put something into practice", "Áp dụng vào thực tế"], ["An eye-opener", "Điều mở mang tầm mắt"]],
    NARRATE, ["Habit building", "Small changes", "Note-taking"],
    "The book I want to describe is a short book about habits that a friend lent me last year. It wasn't exactly **a page-turner** in the dramatic sense, but it was full of **practical advice** about starting extremely small - two minutes a day rather than an ambitious plan. That was genuinely **an eye-opener** for me, because I'd always failed by aiming too high. I **put it into practice** with English study, and a year later I'm still doing it."),

  cue("p2x-trip-2", "A Memorable Trip",
    "Describe a short trip that did not go as planned.",
    ["Where you went", "Who you went with", "What went wrong", "How you felt afterwards"],
    [["To go awry", "Đi chệch kế hoạch"], ["A blessing in disguise", "Trong cái rủi có cái may"], ["To make the best of it", "Cố tận dụng tình huống"], ["Unforeseen", "Không lường trước"]],
    NARRATE, ["Missed transport", "Bad weather", "Unexpected discovery"],
    "I'd like to describe a weekend trip to the coast with two university friends. Everything **went awry** from the start - our bus broke down, we arrived four hours late, and it then rained for the entire first day. We had no choice but to **make the best of it**, so we spent the afternoon in a tiny family restaurant talking to the owner. That **unforeseen** detour turned out to be **a blessing in disguise**: it's the part of the trip we all still talk about."),

  cue("p2x-technology-2", "A Piece of Technology",
    "Describe a piece of technology you would find hard to live without.",
    ["What it is", "How long you have had it", "What you use it for", "Why it would be hard to live without"],
    [["To rely on something heavily", "Phụ thuộc nhiều vào thứ gì"], ["Indispensable", "Không thể thiếu"], ["To streamline", "Làm tinh gọn"], ["Battery life", "Thời lượng pin"]],
    NARRATE, ["Laptop for study", "Maps and payment", "Backup habits"],
    "The item I'd choose is my laptop, which I've had for about three years. I use it for everything academic - writing assignments, joining online classes and storing years of notes - so it has quietly become **indispensable**. It **streamlines** work that would otherwise take days, and I **rely on** it **heavily**, perhaps too much. If it broke tomorrow I could survive with my phone, but I'd lose the deep work that a proper keyboard and screen make possible."),

  cue("p2x-teacher-2", "A Teacher You Remember",
    "Describe a teacher who changed the way you think about a subject.",
    ["Who the teacher was", "What they taught", "How they taught", "How your view changed"],
    [["To bring a subject to life", "Làm môn học trở nên sống động"], ["Patient and encouraging", "Kiên nhẫn và động viên"], ["To grasp a concept", "Nắm được khái niệm"], ["A turning point", "Bước ngoặt"]],
    NARRATE, ["Maths or literature", "Real-life examples", "Confidence"],
    "I'd like to talk about my grade-ten maths teacher, Mr Hung. I'd always assumed I simply wasn't a maths person, and my results supported that. He taught with real-world problems - loan interest, distances, probability in games - which **brought the subject to life** for me. He was **patient and encouraging** enough to let me ask basic questions without embarrassment, and once I began to **grasp the concepts**, my marks improved sharply. That year was **a turning point** in how I judge my own ability."),

  cue("p2x-skill-2", "A Skill You Learned",
    "Describe a practical skill you taught yourself.",
    ["What the skill is", "Why you decided to learn it", "How you learned it", "How useful it has been"],
    [["Trial and error", "Thử và sai"], ["To pick something up", "Học được, nắm được"], ["A tutorial", "Bài hướng dẫn"], ["To come in handy", "Trở nên hữu ích"]],
    NARRATE, ["Online videos", "Practice schedule", "Saving money"],
    "The skill I'd like to describe is basic video editing, which I taught myself two summers ago. I needed it for a university club project and couldn't afford to pay anyone, so I worked through free **tutorials** on YouTube. It was mostly **trial and error** at first - my early videos were far too long - but I **picked up** the essentials within a month. It has **come in handy** repeatedly since, and it even helped me get a part-time job."),

  cue("p2x-decision-2", "An Important Decision",
    "Describe a decision you made that other people disagreed with.",
    ["What the decision was", "Who disagreed and why", "How you decided", "What the outcome was"],
    [["To weigh up the pros and cons", "Cân nhắc lợi hại"], ["To stand your ground", "Giữ vững lập trường"], ["Peer pressure", "Áp lực từ bạn bè"], ["In hindsight", "Nhìn lại thì"]],
    NARRATE, ["Choosing a major", "Family expectations", "Long-term view"],
    "I'd like to talk about my decision to change my university major from economics to information technology at the end of my first year. My parents disagreed strongly, mainly because economics seemed safer to them. I spent weeks **weighing up the pros and cons**, talked to students in both faculties, and eventually **stood my ground**. **In hindsight** it was clearly right - I enjoy the work and found a job quickly - and my parents now admit they were reacting out of worry rather than evidence."),

  cue("p2x-festival-2", "A Festival or Celebration",
    "Describe a celebration you helped to organise.",
    ["What the occasion was", "What you had to do", "Who attended", "How it went"],
    [["To pull something off", "Xoay xở làm được"], ["To run smoothly", "Diễn ra suôn sẻ"], ["A last-minute change", "Thay đổi phút chót"], ["Behind the scenes", "Hậu trường"]],
    NARRATE, ["Birthday surprise", "Class farewell", "Budget and venue"],
    "The occasion I'd like to describe is a farewell party our class organised for our homeroom teacher. I was responsible for the programme and the music, which meant a lot of unglamorous work **behind the scenes**. There was **a last-minute change** when the room we'd booked became unavailable, and we moved everything to the school yard two hours before. Somehow we **pulled it off** - the evening **ran smoothly**, and our teacher was genuinely moved, which made the stress worthwhile."),

  cue("p2x-photo-2", "A Photo You Like",
    "Describe a photograph that brings back good memories.",
    ["What is in the photo", "Who took it", "When it was taken", "Why it means a lot to you"],
    [["To capture a moment", "Ghi lại khoảnh khắc"], ["Candid", "Tự nhiên, không dàn dựng"], ["To bring back memories", "Gợi lại kỷ niệm"], ["Faded", "Đã phai màu"]],
    NARRATE, ["Family holiday", "Grandparents", "Printed vs digital"],
    "The photo I'd like to describe shows my whole family outside my grandparents' house at Tet about ten years ago. My uncle took it on an old camera, so it's slightly **faded** and nobody is looking at the lens - it's completely **candid**, which is exactly why I like it. It **captured a moment** that can't be repeated, since my grandfather passed away a few years later. Every time I see it on the wall it **brings back memories** of noisy, crowded family lunches."),

  cue("p2x-challenge-2", "A Difficult Challenge",
    "Describe a time when you had to work under pressure.",
    ["What the situation was", "Why there was pressure", "What you did", "What you learned"],
    [["A tight deadline", "Hạn chót gấp"], ["To keep a cool head", "Giữ bình tĩnh"], ["To prioritise", "Ưu tiên"], ["Under the wire", "Sát nút"]],
    NARRATE, ["Exam week", "Group project", "Sleep and planning"],
    "I'd like to describe the week before my final-year project deadline. A teammate dropped out, so two of us had to finish a presentation and a forty-page report against **a tight deadline**. I made myself **keep a cool head**, listed everything that remained and **prioritised** ruthlessly, cutting sections that added little. We submitted it **under the wire** with an hour to spare, and I learned that planning calmly for twenty minutes saves hours of panic later."),

  cue("p2x-gift-2", "A Gift You Received",
    "Describe a gift you gave to someone else.",
    ["What the gift was", "Who you gave it to", "Why you chose it", "How they reacted"],
    [["A thoughtful present", "Món quà tinh tế"], ["To put thought into something", "Dụng tâm vào điều gì"], ["Sentimental value", "Giá trị tinh thần"], ["To be over the moon", "Vui sướng tột độ"]],
    NARRATE, ["Handmade album", "Graduation", "Budget gifts"],
    "The gift I'd like to talk about is a photo album I made for my sister's graduation. I collected pictures from her whole university life, asked her friends to write short messages, and had it printed. It cost very little, but I **put** a great deal of **thought into** it, so it has real **sentimental value**. She was **over the moon** when she opened it, and she still keeps it on her desk, which tells me **a thoughtful present** beats an expensive one."),

  cue("p2x-music-2", "A Piece of Music",
    "Describe a song that means a lot to you.",
    ["What the song is", "When you first heard it", "What it reminds you of", "Why it is special"],
    [["To be catchy", "Bắt tai"], ["Lyrics", "Lời bài hát"], ["To strike a chord", "Chạm đến cảm xúc"], ["On repeat", "Nghe đi nghe lại"]],
    NARRATE, ["Exam period", "A friend's recommendation", "Live performance"],
    "The song I'd like to describe is a Vietnamese ballad my mother used to sing while cooking. I first really listened to the **lyrics** when I moved away for university and felt homesick. They're about leaving home and coming back, so they **struck a chord** immediately. It isn't especially **catchy**, but I had it **on repeat** for weeks that first term, and even now it makes me want to phone home."),

  cue("p2x-goal-2", "A Goal You Want to Achieve",
    "Describe a goal you achieved recently.",
    ["What the goal was", "How long it took", "What obstacles you faced", "How you felt when you achieved it"],
    [["To set your sights on", "Đặt mục tiêu vào"], ["A setback", "Trở ngại"], ["To stick with something", "Kiên trì theo đuổi"], ["A sense of achievement", "Cảm giác thành tựu"]],
    NARRATE, ["Fitness target", "Language test", "Consistency"],
    "The goal I'd like to describe is running five kilometres without stopping, which I **set my sights on** last spring. It took about four months, longer than I expected, because I had **a setback** with a knee injury in the second month. I had to rest for three weeks and start again more slowly, but I **stuck with it**. Finishing that first full five kilometres gave me a genuine **sense of achievement**, mainly because I'd nearly given up twice."),

  cue("p2x-help-2", "A Time You Helped Someone",
    "Describe a time when someone helped you.",
    ["Who helped you", "What the situation was", "What they did", "How you felt"],
    [["To be in a fix", "Rơi vào tình thế khó"], ["To go out of their way", "Không ngại phiền hà để giúp"], ["To be indebted to someone", "Mang ơn ai đó"], ["A kind gesture", "Cử chỉ tử tế"]],
    NARRATE, ["A stranger", "Lost documents", "Paying it forward"],
    "I'd like to talk about a time I lost my wallet on a bus, with my student card and all my cash in it. I was completely **in a fix** - I was in an unfamiliar district and had no way home. A woman waiting at the stop lent me the fare and refused to take my number to be repaid. She **went out of her way** for a stranger, and that small **kind gesture** genuinely changed my mood for weeks; I still feel **indebted to** her."),

  cue("p2x-app-2", "A Smart Phone App",
    "Describe an app that has changed the way you do something.",
    ["What the app is", "How you found it", "What you use it for", "How it changed your routine"],
    [["User-friendly", "Dễ sử dụng"], ["To keep track of", "Theo dõi"], ["To build a habit", "Hình thành thói quen"], ["A notification", "Thông báo"]],
    NARRATE, ["Study app", "Budget app", "Streaks and reminders"],
    "The app I'd like to describe is a vocabulary app a classmate recommended before our IELTS course. It's extremely **user-friendly** - five minutes of cards, then it's done - and it **keeps track of** which words I keep forgetting. What changed my routine was the daily **notification** at eight in the evening, which turned studying from a decision into a habit. I've **built a habit** of over three hundred days now, and my reading speed has clearly improved."),

  cue("p2x-job-2", "A Job You Would Like",
    "Describe a job you would not like to do.",
    ["What the job is", "What it involves", "Why it would not suit you", "Who you think would enjoy it"],
    [["Repetitive tasks", "Công việc lặp đi lặp lại"], ["To be cut out for something", "Hợp với việc gì"], ["Shift work", "Làm theo ca"], ["High-pressure", "Áp lực cao"]],
    NARRATE, ["Call centre", "Night shifts", "Personality fit"],
    "The job I'd like to describe is working in a call centre handling complaints. It involves the same **repetitive tasks** for eight hours, often on **shift work**, and every conversation begins with someone who is already angry. I simply wouldn't be **cut out for** it, because I take criticism personally and would carry it home. People who are naturally calm and can separate the complaint from themselves would find that **high-pressure** environment far more manageable."),

  cue("p2x-childhood-2", "A Childhood Memory",
    "Describe a place you often visited as a child.",
    ["Where the place was", "Who you went with", "What you did there", "Why you remember it"],
    [["To hold fond memories", "Lưu giữ kỷ niệm đẹp"], ["Carefree", "Vô tư"], ["A hideaway", "Nơi trốn riêng tư"], ["To roam around", "Lang thang khắp nơi"]],
    NARRATE, ["Grandparents' garden", "Summer holidays", "Cousins"],
    "The place I'd like to describe is my grandparents' garden in the countryside, where I spent almost every summer until I was thirteen. My cousins and I would **roam around** all afternoon, climbing the fruit trees and building a **hideaway** out of bamboo behind the house. Nobody supervised us closely, which made those days feel completely **carefree**. I **hold** such **fond memories** of it that I still visit whenever I can, even though the garden is much smaller than I remember."),

  cue("p2x-advice-2", "A Piece of Advice",
    "Describe advice you gave to someone.",
    ["Who you gave advice to", "What the problem was", "What you advised", "Whether they followed it"],
    [["To be at a crossroads", "Đứng trước ngã ba đường"], ["To talk something through", "Bàn bạc kỹ lưỡng"], ["To have second thoughts", "Do dự, nghĩ lại"], ["To take advice on board", "Tiếp thu lời khuyên"]],
    NARRATE, ["Choosing a course", "Quitting a job", "Listening first"],
    "I'd like to describe advice I gave my cousin, who was **at a crossroads** about accepting a job in another city. She was excited but kept **having second thoughts** because she'd be far from family. Rather than telling her what to do, we **talked it through** and I suggested she agree a one-year trial with herself. She **took** that **on board**, moved, and although she came back after eighteen months, she says she'd have always wondered otherwise."),

  cue("p2x-website-2", "A Website You Use",
    "Describe a website you often use for learning.",
    ["What the website is", "How often you use it", "What you do on it", "Why you recommend it"],
    [["Free of charge", "Miễn phí"], ["Bite-sized lessons", "Bài học ngắn gọn"], ["To brush up on", "Ôn lại"], ["Reliable content", "Nội dung đáng tin cậy"]],
    NARRATE, ["Language site", "Coding practice", "Progress tracking"],
    "The website I'd like to describe is an English learning site I use almost daily. It offers **bite-sized lessons** of about ten minutes, which fits the gap between classes perfectly, and much of it is **free of charge**. I mainly use it to **brush up on** collocations and to do listening practice with transcripts. What I appreciate most is the **reliable content** - the examples sound like real English, not textbook sentences."),

  cue("p2x-outdoor-2", "An Outdoor Activity",
    "Describe an outdoor activity you would like to try.",
    ["What the activity is", "Where you would do it", "Why it appeals to you", "What you would need to prepare"],
    [["To be keen to try", "Háo hức muốn thử"], ["Scenic", "Có phong cảnh đẹp"], ["Stamina", "Sức bền"], ["Gear", "Trang bị, dụng cụ"]],
    NARRATE, ["Multi-day hiking", "Northern mountains", "Fitness and cost"],
    "The activity I'm **keen to try** is multi-day hiking in the northern mountains, somewhere like Ha Giang. The routes are famously **scenic**, and the idea of walking for three days with no traffic noise really appeals to me. I'd need to build up my **stamina** first, since I currently walk far too little, and borrow proper **gear** - boots and a decent backpack. I'm planning to attempt it next autumn when the weather cools down."),

  cue("p2x-tradition-2", "A Tradition in Your Family",
    "Describe a tradition in your country that you value.",
    ["What the tradition is", "When it takes place", "What people do", "Why you value it"],
    [["To be handed down", "Được truyền lại"], ["To pay respects", "Bày tỏ lòng thành kính"], ["A sense of belonging", "Cảm giác thuộc về"], ["Deep-rooted", "Ăn sâu, lâu đời"]],
    NARRATE, ["Death anniversaries", "Tet visits", "Younger generation"],
    "The tradition I'd like to describe is the family death anniversary, which is **deep-rooted** in Vietnamese life. Once a year relatives gather at the eldest son's house, prepare a meal and **pay respects** to a grandparent or great-grandparent. It's been **handed down** for generations, and although the religious side matters less to my age group, the gathering itself does. It gives me **a sense of belonging** to a family much larger than the people I see every week."),

  cue("p2x-news-2", "A News Story",
    "Describe a news story that surprised you.",
    ["What the story was about", "Where you heard it", "Why it surprised you", "How you reacted"],
    [["To make headlines", "Lên trang nhất"], ["To be taken aback", "Bị bất ngờ"], ["Unprecedented", "Chưa từng có"], ["To follow a story closely", "Theo dõi sát câu chuyện"]],
    NARRATE, ["Local rescue", "Technology breakthrough", "Discussion with friends"],
    "The story I'd like to describe is a rescue in my province that **made headlines** last year, when a child fell into a deep shaft and was brought out alive after two days. I first saw it on Facebook and then **followed the story closely** on the news. I was **taken aback** by the scale of the operation - hundreds of people worked non-stop - and by how an **unprecedented** situation brought total strangers together. It stayed in my mind for weeks."),

  cue("p2x-quiet-place-2", "A Quiet Place",
    "Describe a quiet place where you like to study.",
    ["Where it is", "When you go there", "What makes it quiet", "How it helps you"],
    [["To concentrate fully", "Tập trung hoàn toàn"], ["Distraction-free", "Không bị phân tâm"], ["A steady routine", "Thói quen đều đặn"], ["To lose track of time", "Quên mất thời gian"]],
    NARRATE, ["University library", "Early mornings", "Phone away"],
    "The place I'd like to describe is the third floor of my university library, which is reserved for silent study. I go there most weekday mornings before nine, when it's almost empty. It's genuinely **distraction-free** - no talking, no music, and I leave my phone in my bag - so I can **concentrate fully** for two hours. Going at the same time has built **a steady routine**, and I often **lose track of time** there, which never happens at home."),

  cue("p2x-meal-2", "A Meal You Cooked",
    "Describe a meal you shared with family or friends.",
    ["What the meal was", "Who was there", "Where it took place", "Why it was memorable"],
    [["To tuck in", "Ăn ngon lành"], ["A spread", "Mâm cỗ thịnh soạn"], ["To catch up", "Hàn huyên, cập nhật tin tức"], ["Homely", "Ấm cúng như ở nhà"]],
    NARRATE, ["Tet dinner", "Cooking together", "Long conversations"],
    "The meal I'd like to describe is the dinner on the first evening of Tet last year at my grandmother's house. About fifteen of us were there, and she'd prepared an enormous **spread** - banh chung, boiled chicken, pickled onions and several soups. Everyone **tucked in** and then sat for hours simply **catching up**, because most of my cousins now work in different cities. It wasn't fancy, but that **homely** atmosphere is exactly why I remember it."),

  cue("p2x-building-2", "A Building You Like",
    "Describe a modern building you find impressive.",
    ["What the building is", "Where it is", "What it looks like", "Why it impresses you"],
    [["A striking design", "Thiết kế ấn tượng"], ["Glass facade", "Mặt tiền kính"], ["To blend in with", "Hòa hợp với"], ["Landmark", "Công trình biểu tượng"]],
    NARRATE, ["City tower", "Museum", "Sustainability features"],
    "The building I'd like to describe is a new library complex in my city, finished about three years ago. It has **a striking design** - a curved **glass facade** with wooden panels that soften the light inside. What impresses me is that despite being modern it **blends in with** the older buildings around it rather than overshadowing them. It has quickly become **a landmark**, and unlike many showpieces it's genuinely used by ordinary people every day."),

  cue("p2x-animal-2", "An Animal You Like",
    "Describe an animal that is common in your country.",
    ["What the animal is", "Where people see it", "What it is like", "How people feel about it"],
    [["Domesticated", "Đã thuần hóa"], ["To roam freely", "Đi lại tự do"], ["Harmless", "Vô hại"], ["Part of daily life", "Một phần của đời sống hằng ngày"]],
    NARRATE, ["Water buffalo", "Street dogs", "Symbolism in culture"],
    "The animal I'd like to describe is the water buffalo, which is still common in the Vietnamese countryside. You see them in rice fields, often with a child sitting on their back while they **roam freely** along the paths. They look enormous but they're **domesticated** and generally **harmless**. For farming families they were **part of daily life** for centuries, and even now the buffalo appears in paintings and proverbs as a symbol of patience and hard work."),

  cue("p2x-weekend-2", "A Perfect Weekend",
    "Describe how you would spend a free day with no responsibilities.",
    ["What you would do first", "Who you would spend it with", "Where you would go", "Why it would be enjoyable"],
    [["To have a lie-in", "Ngủ nướng"], ["At a leisurely pace", "Thong thả"], ["To make the most of", "Tận dụng tối đa"], ["To switch off", "Ngắt kết nối, thư giãn"]],
    NARRATE, ["Late breakfast", "Cafe and reading", "Evening with friends"],
    "If I had a completely free day, I'd start with **a lie-in** until about nine, which almost never happens during term. Then I'd take a book to a quiet cafe and read at **a leisurely pace** for a couple of hours. In the afternoon I'd cycle somewhere green with a friend, and in the evening we'd cook rather than eat out. The point wouldn't be to do a lot, but to **switch off** properly and **make the most of** having nowhere to be."),

  cue("p2x-conversation-2", "An Interesting Conversation",
    "Describe a conversation that changed your opinion about something.",
    ["Who you spoke to", "What the topic was", "What they said", "How your opinion changed"],
    [["To see something in a new light", "Nhìn nhận theo cách mới"], ["A compelling argument", "Lập luận thuyết phục"], ["To have a change of heart", "Thay đổi suy nghĩ"], ["Firsthand experience", "Trải nghiệm trực tiếp"]],
    NARRATE, ["Talking to an older relative", "Study abroad", "Listening properly"],
    "I'd like to describe a conversation with a colleague who had studied abroad and returned home. I'd assumed that anyone with that opportunity would stay overseas permanently. She explained, with **firsthand experience**, how isolating it had been and why she valued being near family more than a higher salary. It was **a compelling argument** precisely because it wasn't theoretical, and I genuinely **had a change of heart** - I now **see** the whole question **in a new light**."),

  cue("p2x-competition-2", "A Competition",
    "Describe a competition you watched or took part in.",
    ["What the competition was", "When it took place", "What happened", "How you felt about the result"],
    [["To be neck and neck", "Bám đuổi sát nút"], ["Nerve-racking", "Căng thẳng thần kinh"], ["To come first / runner-up", "Về nhất / á quân"], ["Team spirit", "Tinh thần đồng đội"]],
    NARRATE, ["School English contest", "Football final", "Preparation"],
    "The competition I'd like to describe is an English speaking contest at my school in grade eleven. We prepared for a month, and on the day the final two rounds were **neck and neck** between me and a classmate. Standing on stage was genuinely **nerve-racking** - my hands were shaking - but I got through it. I ended up as **runner-up**, and although I was disappointed for an hour, the **team spirit** afterwards and the confidence I gained mattered far more than the placing."),
];

export const SPEAKING_PRACTICE_EXPANSION_6: { part2: SpeakingPracticeQuestion[] } = {
  part2: build2(2, seeds),
};
