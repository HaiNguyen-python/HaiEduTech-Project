// IELTS Speaking Practice - Enhanced question data with vocabulary support
// Each question includes useful language, model structures, brainstorming ideas, and model answers

export interface VocabItem {
  phrase: string;
  vietnamese: string;
}

export interface SpeakingPracticeQuestion {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  prompts?: string[];
  useful_language: {
    vocabulary_bank: VocabItem[];
    model_structures: string[];
    brainstorming_ideas: string[];
  };
  model_answer: string;
}

// ===================== PART 1 QUESTIONS =====================

const part1PracticeQuestions: SpeakingPracticeQuestion[] = [
  {
    id: "p1-work-1",
    part: 1,
    topic: "Work & Study",
    question: "What do you do, work or study?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "To pursue a career in", vietnamese: "Theo đuổi sự nghiệp trong lĩnh vực..." },
        { phrase: "A steep learning curve", vietnamese: "Quá trình học hỏi nhiều thử thách" },
        { phrase: "To juggle responsibilities", vietnamese: "Cân bằng nhiều trách nhiệm cùng lúc" },
        { phrase: "A rewarding experience", vietnamese: "Một trải nghiệm đáng giá" },
        { phrase: "To be snowed under with work", vietnamese: "Ngập đầu trong công việc" },
      ],
      model_structures: [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding.",
      ],
      brainstorming_ideas: [
        "Talk about your specific role or major and why you chose it.",
        "Mention what aspects you find most interesting or challenging.",
        "Share a brief future goal related to your work/studies.",
      ],
    },
    model_answer: "Well, I'm currently working as a **data engineer** at a tech company here in Ho Chi Minh City. It's been **a rewarding experience** so far because I get to work with cutting-edge technology every day. I have to say, there was definitely **a steep learning curve** when I first started, but I've grown to love the problem-solving aspect of it. I'm also **pursuing a career in** AI, so I spend a lot of my free time studying machine learning concepts.",
  },
  {
    id: "p1-hometown-1",
    part: 1,
    topic: "Hometown",
    question: "Where is your hometown and what do you like about it?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "A bustling city", vietnamese: "Một thành phố nhộn nhịp" },
        { phrase: "A tight-knit community", vietnamese: "Một cộng đồng gắn bó" },
        { phrase: "To have a lot to offer", vietnamese: "Có nhiều điều thú vị để khám phá" },
        { phrase: "Rich cultural heritage", vietnamese: "Di sản văn hóa phong phú" },
        { phrase: "To be renowned for", vietnamese: "Nổi tiếng về..." },
      ],
      model_structures: [
        "I was born and raised in..., which is a... city/town in the... of Vietnam.",
        "What I love most about my hometown is the fact that...",
        "It's particularly renowned for its... which attracts many tourists.",
      ],
      brainstorming_ideas: [
        "Describe its location, size, and population briefly.",
        "Mention local food, landmarks, or famous festivals.",
        "Talk about the people and community spirit.",
      ],
    },
    model_answer: "I come from Da Nang, which is **a bustling city** on the central coast of Vietnam. It's **renowned for** its stunning beaches and the iconic Dragon Bridge. What I love most is that it has **a lot to offer** — from incredible street food to beautiful mountains nearby. The people there form **a tight-knit community**, and the city has a **rich cultural heritage** with ancient Cham ruins and traditional craft villages.",
  },
  {
    id: "p1-technology-1",
    part: 1,
    topic: "Technology",
    question: "How has technology changed your daily life?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "To revolutionize the way we...", vietnamese: "Cách mạng hóa cách chúng ta..." },
        { phrase: "At the touch of a button", vietnamese: "Chỉ với một cú chạm" },
        { phrase: "To be glued to a screen", vietnamese: "Dán mắt vào màn hình" },
        { phrase: "A double-edged sword", vietnamese: "Con dao hai lưỡi" },
        { phrase: "To keep up with technology", vietnamese: "Theo kịp công nghệ" },
      ],
      model_structures: [
        "Technology has completely revolutionized the way I...",
        "I'd say the biggest change has been in how we...",
        "On the flip side, I think technology can be a double-edged sword because...",
      ],
      brainstorming_ideas: [
        "Communication (messaging apps, video calls).",
        "Work efficiency (apps, cloud storage, AI tools).",
        "Entertainment (streaming, gaming, social media).",
        "Negative aspects (screen addiction, less face-to-face).",
      ],
    },
    model_answer: "Technology has completely **revolutionized the way** I work and communicate. I can now access any information **at the touch of a button**, which has made studying so much more efficient. However, I have to admit that it's **a double-edged sword** — while it makes life convenient, I sometimes find myself **glued to a screen** for hours. I try my best to **keep up with technology** without letting it control my life.",
  },
  {
    id: "p1-food-1",
    part: 1,
    topic: "Food & Cooking",
    question: "What's your favorite type of food?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "Mouth-watering dishes", vietnamese: "Những món ăn hấp dẫn" },
        { phrase: "To have a sweet tooth", vietnamese: "Thích đồ ngọt" },
        { phrase: "Home-cooked meals", vietnamese: "Bữa ăn nấu tại nhà" },
        { phrase: "To be a foodie", vietnamese: "Là người sành ăn" },
        { phrase: "To grab a bite to eat", vietnamese: "Ăn nhanh một chút" },
      ],
      model_structures: [
        "I'd consider myself quite a foodie, and my absolute favorite cuisine is...",
        "There's nothing quite like a home-cooked meal prepared by...",
        "If I had to choose just one dish, it would definitely be...",
      ],
      brainstorming_ideas: [
        "Mention a specific cuisine (Vietnamese, Japanese, Italian).",
        "Describe a dish in detail (taste, ingredients, aroma).",
        "Share a memory associated with the food.",
      ],
    },
    model_answer: "I'd consider myself quite **a foodie**, and my absolute favorite is Vietnamese cuisine. There are so many **mouth-watering dishes** to choose from, but I particularly love pho — it's a perfect combination of rich broth, fresh herbs, and tender meat. I also really enjoy **home-cooked meals** because they remind me of family gatherings. When I'm busy, I usually just **grab a bite to eat** at a local street food stall.",
  },
  {
    id: "p1-hobbies-1",
    part: 1,
    topic: "Hobbies & Leisure",
    question: "What do you enjoy doing in your free time?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "To unwind after a long day", vietnamese: "Thư giãn sau một ngày dài" },
        { phrase: "To take up a hobby", vietnamese: "Bắt đầu một sở thích mới" },
        { phrase: "A great way to de-stress", vietnamese: "Cách tuyệt vời để giải tỏa căng thẳng" },
        { phrase: "To be keen on", vietnamese: "Rất thích, đam mê" },
        { phrase: "Quality time", vietnamese: "Thời gian chất lượng" },
      ],
      model_structures: [
        "In my spare time, I'm particularly keen on...",
        "I find that... is a great way to unwind after a long day.",
        "I recently took up... and I've been really enjoying it because...",
      ],
      brainstorming_ideas: [
        "Physical activities (gym, sports, yoga, hiking).",
        "Creative activities (painting, photography, writing).",
        "Social activities (meeting friends, volunteering).",
        "Indoor activities (reading, coding, gaming).",
      ],
    },
    model_answer: "In my spare time, I'm particularly **keen on** reading and playing badminton. I find that reading is **a great way to de-stress** — I usually pick up a novel before bed to **unwind after a long day**. I also recently **took up** photography, and I've been really enjoying capturing street life in my city. On weekends, I try to spend some **quality time** with my friends, whether that's going for coffee or playing sports together.",
  },
  {
    id: "p1-travel-1",
    part: 1,
    topic: "Travel",
    question: "Do you enjoy traveling? Where would you like to go next?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "To broaden one's horizons", vietnamese: "Mở rộng tầm nhìn" },
        { phrase: "Off the beaten track", vietnamese: "Nơi ít người biết đến" },
        { phrase: "A once-in-a-lifetime experience", vietnamese: "Trải nghiệm có một không hai" },
        { phrase: "Wanderlust", vietnamese: "Niềm đam mê du lịch" },
        { phrase: "To immerse oneself in", vietnamese: "Đắm chìm vào..." },
      ],
      model_structures: [
        "I absolutely love traveling — I think it's a wonderful way to broaden one's horizons.",
        "My dream destination would be... because I've always wanted to...",
        "What I enjoy most about traveling is the opportunity to immerse myself in...",
      ],
      brainstorming_ideas: [
        "Share a memorable trip experience.",
        "Talk about a dream destination and reasons.",
        "Mention what you value most (culture, nature, food, people).",
      ],
    },
    model_answer: "Absolutely! I have a real sense of **wanderlust** and I believe traveling is the best way to **broaden one's horizons**. I love exploring places that are **off the beaten track** rather than typical tourist spots. My dream destination would be Japan — I'd love to **immerse myself in** the culture, try authentic ramen, and visit ancient temples. I think it would be **a once-in-a-lifetime experience** to see the cherry blossoms in spring.",
  },
];

// ===================== PART 2 QUESTIONS =====================

const part2PracticeQuestions: SpeakingPracticeQuestion[] = [
  {
    id: "p2-creative-person",
    part: 2,
    topic: "Describe a creative person that you admire",
    question: "Describe a creative person that you admire.",
    prompts: [
      "Who this person is",
      "How you know this person",
      "What creative things they have done",
      "And explain why you admire them",
    ],
    useful_language: {
      vocabulary_bank: [
        { phrase: "To think outside the box", vietnamese: "Tư duy sáng tạo, không theo lối mòn" },
        { phrase: "A wealth of experience", vietnamese: "Một kho tàng kinh nghiệm" },
        { phrase: "To have a knack for", vietnamese: "Có năng khiếu bẩm sinh về..." },
        { phrase: "An imaginative mind", vietnamese: "Một trí tưởng tượng phong phú" },
        { phrase: "To break the mold", vietnamese: "Phá vỡ những quy chuẩn cũ" },
        { phrase: "To push the boundaries", vietnamese: "Vượt qua các giới hạn" },
      ],
      model_structures: [
        "I'd like to start by saying that I've always been drawn to people who...",
        "What strikes me most about this individual is their ability to...",
        "In terms of their achievements, they have successfully...",
      ],
      brainstorming_ideas: [
        "Talk about a famous artist, a colleague, or a family member.",
        "Mention a specific project or innovation they created.",
        "Explain how their work has inspired you or changed your perspective.",
        "Discuss how they overcome challenges in their creative process.",
      ],
    },
    model_answer: "I'd like to talk about a close friend of mine, Nam, who I believe truly **breaks the mold** when it comes to digital art. He has **an imaginative mind** and always manages to **think outside the box** when approaching new projects. With **a wealth of experience** in graphic design, he has created stunning visual campaigns for several major brands. What I admire most is his ability to **push the boundaries** of what's possible with technology and art. He seems to **have a knack for** combining colors and shapes in ways that nobody else would think of.",
  },
  {
    id: "p2-memorable-trip",
    part: 2,
    topic: "Describe a memorable trip you have taken",
    question: "Describe a memorable trip you have taken.",
    prompts: [
      "Where you went",
      "Who you went with",
      "What you did there",
      "And explain why it was memorable",
    ],
    useful_language: {
      vocabulary_bank: [
        { phrase: "Breathtaking scenery", vietnamese: "Phong cảnh ngoạn mục" },
        { phrase: "To make lasting memories", vietnamese: "Tạo ra những kỷ niệm đáng nhớ" },
        { phrase: "An eye-opening experience", vietnamese: "Trải nghiệm mở mang tầm mắt" },
        { phrase: "To live life to the fullest", vietnamese: "Sống hết mình" },
        { phrase: "A change of scenery", vietnamese: "Thay đổi không gian" },
        { phrase: "To soak up the atmosphere", vietnamese: "Tận hưởng bầu không khí" },
      ],
      model_structures: [
        "The trip that stands out the most in my memory is when I visited...",
        "What made this trip truly special was the fact that...",
        "Looking back, I'd say this experience taught me the importance of...",
      ],
      brainstorming_ideas: [
        "Describe the destination and what made it unique.",
        "Share a funny or unexpected incident during the trip.",
        "Talk about the people you met and cultural exchanges.",
        "Explain how the trip changed your perspective on something.",
      ],
    },
    model_answer: "The trip that stands out the most in my memory is when I visited Sapa last winter with my university friends. The **breathtaking scenery** of terraced rice fields covered in mist was absolutely stunning. We spent three days trekking through local villages, trying to **soak up the atmosphere** and learn about ethnic minority cultures. It was **an eye-opening experience** that taught me to appreciate the simple things in life. We **made lasting memories** together, and the trip was really **a change of scenery** from our busy city lives. It inspired me to **live life to the fullest**.",
  },
  {
    id: "p2-important-decision",
    part: 2,
    topic: "Describe an important decision you made",
    question: "Describe an important decision you made.",
    prompts: [
      "What the decision was",
      "When you made it",
      "How you made the decision",
      "And explain why it was important",
    ],
    useful_language: {
      vocabulary_bank: [
        { phrase: "To weigh up the pros and cons", vietnamese: "Cân nhắc ưu và nhược điểm" },
        { phrase: "A turning point in one's life", vietnamese: "Bước ngoặt trong cuộc đời" },
        { phrase: "To take the plunge", vietnamese: "Quyết định mạo hiểm, liều thử" },
        { phrase: "In hindsight", vietnamese: "Nhìn lại, hồi tưởng" },
        { phrase: "To have second thoughts", vietnamese: "Suy nghĩ lại, phân vân" },
        { phrase: "To follow one's gut instinct", vietnamese: "Đi theo bản năng" },
      ],
      model_structures: [
        "One of the most significant decisions I've ever made was...",
        "Before making this decision, I spent a long time weighing up the pros and cons.",
        "In hindsight, I believe it was the right choice because...",
      ],
      brainstorming_ideas: [
        "Career change or choosing a university major.",
        "Moving to a new city for work or study.",
        "Starting a new business or project.",
        "A personal relationship decision.",
      ],
    },
    model_answer: "One of the most significant decisions I've ever made was leaving my stable accounting job to **take the plunge** into the tech industry. Before making this decision, I spent months **weighing up the pros and cons** and I definitely **had second thoughts** many times. It was **a turning point in my life** because it meant starting from scratch at the age of 28. However, I decided to **follow my gut instinct** because I was passionate about data and technology. **In hindsight**, it was absolutely the right choice — I now work as a data engineer and feel much more fulfilled in my career.",
  },
  {
    id: "p2-useful-skill",
    part: 2,
    topic: "Describe a useful skill you learned",
    question: "Describe a useful skill you have learned.",
    prompts: [
      "What the skill is",
      "How you learned it",
      "How long it took you to learn",
      "And explain why you find it useful",
    ],
    useful_language: {
      vocabulary_bank: [
        { phrase: "To pick up a skill", vietnamese: "Học được một kỹ năng" },
        { phrase: "Through trial and error", vietnamese: "Qua quá trình thử và sai" },
        { phrase: "To come in handy", vietnamese: "Trở nên hữu ích" },
        { phrase: "Self-taught", vietnamese: "Tự học" },
        { phrase: "A transferable skill", vietnamese: "Kỹ năng có thể áp dụng vào nhiều lĩnh vực" },
        { phrase: "To get the hang of something", vietnamese: "Dần quen, thành thạo" },
      ],
      model_structures: [
        "I'd like to talk about a skill that has proven incredibly useful in my life, which is...",
        "I first picked up this skill when I was... and it's been invaluable ever since.",
        "What makes this skill particularly useful is that it's a transferable skill that...",
      ],
      brainstorming_ideas: [
        "A language skill (English, Chinese, coding language).",
        "A practical skill (cooking, driving, public speaking).",
        "A digital skill (graphic design, data analysis, video editing).",
        "How the skill has opened up opportunities.",
      ],
    },
    model_answer: "I'd like to talk about Python programming, which I **picked up** about two years ago. I was completely **self-taught** — I learned mostly from online courses and YouTube tutorials. At first, it was challenging, and I went **through trial and error** many times before I started to **get the hang of** it. Now, it has **come in handy** in so many ways — from automating repetitive tasks at work to building small web applications. I think coding is truly **a transferable skill** because the logical thinking it develops can be applied to virtually any field.",
  },
  {
    id: "p2-technology",
    part: 2,
    topic: "Describe a piece of technology you find useful",
    question: "Describe a piece of technology you find useful.",
    prompts: [
      "What it is",
      "How you got it",
      "How you use it",
      "And explain why you find it useful",
    ],
    useful_language: {
      vocabulary_bank: [
        { phrase: "User-friendly interface", vietnamese: "Giao diện thân thiện với người dùng" },
        { phrase: "State-of-the-art technology", vietnamese: "Công nghệ tiên tiến nhất" },
        { phrase: "To streamline a process", vietnamese: "Tối ưu hóa một quy trình" },
        { phrase: "An indispensable tool", vietnamese: "Một công cụ không thể thiếu" },
        { phrase: "To boost productivity", vietnamese: "Tăng năng suất" },
      ],
      model_structures: [
        "The piece of technology that I find most useful in my daily life is...",
        "I first got it when... and since then, it has become an indispensable tool for me.",
        "What I appreciate most about it is its ability to streamline...",
      ],
      brainstorming_ideas: [
        "A laptop, tablet, or smartphone and specific uses.",
        "A particular app or software that changed how you work.",
        "Smart home devices or wearable technology.",
        "How it compares to older alternatives.",
      ],
    },
    model_answer: "The piece of technology that I find most useful is my MacBook laptop. I first got it about three years ago when I started my career in tech, and since then, it has become **an indispensable tool** for me. It has **a user-friendly interface** and runs on **state-of-the-art technology** that allows me to handle complex data processing tasks smoothly. It has really helped **streamline** my workflow and **boost productivity** — I can code, design, and manage projects all from one device. Whether I'm working at the office or in a coffee shop, it's always reliable.",
  },
  {
    id: "p2-successful-person",
    part: 2,
    topic: "Describe a successful person you know",
    question: "Describe a successful person you know.",
    prompts: [
      "Who this person is",
      "How you know them",
      "What they have achieved",
      "And explain why you consider them successful",
    ],
    useful_language: {
      vocabulary_bank: [
        { phrase: "To climb the corporate ladder", vietnamese: "Thăng tiến trong sự nghiệp" },
        { phrase: "A self-made individual", vietnamese: "Người tự lập, tự mình gây dựng sự nghiệp" },
        { phrase: "To set the bar high", vietnamese: "Đặt tiêu chuẩn cao" },
        { phrase: "An inspiring role model", vietnamese: "Một hình mẫu truyền cảm hứng" },
        { phrase: "To overcome adversity", vietnamese: "Vượt qua nghịch cảnh" },
        { phrase: "Work-life balance", vietnamese: "Cân bằng công việc và cuộc sống" },
      ],
      model_structures: [
        "The most successful person I know is... who has achieved remarkable things in...",
        "What I find most impressive about them is their ability to...",
        "They serve as an inspiring role model because they prove that...",
      ],
      brainstorming_ideas: [
        "Talk about their journey from humble beginnings.",
        "Mention specific achievements (business, academic, personal).",
        "Discuss the qualities that led to their success (perseverance, creativity).",
        "Explain what success means beyond just financial achievement.",
      ],
    },
    model_answer: "The most successful person I know is my older cousin, Minh, who is **a self-made individual** in every sense of the word. Starting from a small town with very limited resources, he managed to **climb the corporate ladder** and is now a senior manager at a multinational company. He has always **set the bar high** for himself and has **overcome adversity** at every stage of his career. What I admire most is that despite his professional achievements, he maintains a healthy **work-life balance** and always finds time for his family. He's truly **an inspiring role model** for everyone around him.",
  },
];

// ===================== PART 3 QUESTIONS =====================

const part3PracticeQuestions: SpeakingPracticeQuestion[] = [
  {
    id: "p3-education-1",
    part: 3,
    topic: "Education & Learning",
    question: "How has education changed in your country over the past few decades?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "To undergo a dramatic transformation", vietnamese: "Trải qua sự chuyển đổi mạnh mẽ" },
        { phrase: "Rote learning vs. critical thinking", vietnamese: "Học thuộc lòng vs. tư duy phản biện" },
        { phrase: "Equal access to education", vietnamese: "Bình đẳng trong tiếp cận giáo dục" },
        { phrase: "To bridge the gap", vietnamese: "Thu hẹp khoảng cách" },
        { phrase: "A holistic approach", vietnamese: "Cách tiếp cận toàn diện" },
      ],
      model_structures: [
        "From my perspective, education has undergone a dramatic transformation in terms of...",
        "One significant change that I've noticed is the shift from... to...",
        "However, I believe there's still a long way to go when it comes to...",
      ],
      brainstorming_ideas: [
        "Shift from traditional to modern teaching methods.",
        "Technology integration in classrooms.",
        "Access to education in rural vs. urban areas.",
        "The growing importance of soft skills and creativity.",
        "Comparison between past and present exam systems.",
      ],
    },
    model_answer: "From my perspective, education in Vietnam has **undergone a dramatic transformation** over the past few decades. There has been a notable shift from **rote learning** to **critical thinking** and more interactive teaching methods. The government has also worked to **bridge the gap** and provide **equal access to education** for students in both rural and urban areas. Schools are increasingly adopting **a holistic approach** that focuses not just on academics but also on social skills and creativity. However, I believe there's still a long way to go in fully embracing these modern educational philosophies.",
  },
  {
    id: "p3-technology-society",
    part: 3,
    topic: "Technology & Society",
    question: "Do you think artificial intelligence will replace human workers in the future?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "To render something obsolete", vietnamese: "Làm cho cái gì đó trở nên lỗi thời" },
        { phrase: "To augment rather than replace", vietnamese: "Hỗ trợ chứ không thay thế" },
        { phrase: "The foreseeable future", vietnamese: "Tương lai gần" },
        { phrase: "To adapt to changing circumstances", vietnamese: "Thích nghi với hoàn cảnh thay đổi" },
        { phrase: "Ethical implications", vietnamese: "Hệ quả đạo đức" },
        { phrase: "Technological disruption", vietnamese: "Sự đổi mới/phá vỡ công nghệ" },
      ],
      model_structures: [
        "This is a highly debated topic, and I believe that...",
        "While it's true that AI has the potential to..., I think it's more likely to...",
        "We need to carefully consider the ethical implications of...",
      ],
      brainstorming_ideas: [
        "Jobs that AI can automate (manufacturing, data entry).",
        "Jobs that require human creativity and empathy.",
        "The need for reskilling and lifelong learning.",
        "Historical parallels (Industrial Revolution).",
        "Government policies to manage the transition.",
      ],
    },
    model_answer: "This is a highly debated topic, and personally I believe that AI is more likely to **augment rather than replace** most human workers in **the foreseeable future**. While **technological disruption** will certainly **render** some routine jobs **obsolete**, careers that require creativity, empathy, and complex decision-making will remain in high demand. The key is for workers to **adapt to changing circumstances** by continuously reskilling. We also need to carefully consider the **ethical implications** of widespread AI adoption, including issues of privacy, bias, and income inequality.",
  },
  {
    id: "p3-environment-1",
    part: 3,
    topic: "Environment",
    question: "What can individuals do to help protect the environment?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "Carbon footprint", vietnamese: "Lượng khí thải carbon" },
        { phrase: "Sustainable living", vietnamese: "Lối sống bền vững" },
        { phrase: "To make a conscious effort", vietnamese: "Nỗ lực có ý thức" },
        { phrase: "To raise awareness", vietnamese: "Nâng cao nhận thức" },
        { phrase: "A collective responsibility", vietnamese: "Trách nhiệm chung" },
        { phrase: "Eco-friendly alternatives", vietnamese: "Các lựa chọn thân thiện với môi trường" },
      ],
      model_structures: [
        "I firmly believe that every individual has a collective responsibility to...",
        "One of the most effective ways to... is to make a conscious effort to...",
        "While governments play a crucial role, I think individuals can also...",
      ],
      brainstorming_ideas: [
        "Reduce, reuse, recycle — practical daily actions.",
        "Using public transport or cycling instead of driving.",
        "Supporting eco-friendly businesses and products.",
        "Educating the younger generation about sustainability.",
        "Community clean-up events and tree planting.",
      ],
    },
    model_answer: "I firmly believe that protecting the environment is **a collective responsibility**, and every individual can contribute. The first step is to **make a conscious effort** to reduce our **carbon footprint** by choosing **eco-friendly alternatives** in our daily lives, such as using public transport instead of driving. Adopting a **sustainable living** lifestyle — from cutting down on single-use plastics to conserving water and energy — can make a significant impact when done collectively. Additionally, we should **raise awareness** among our communities and educate the younger generation about the importance of environmental protection.",
  },
  {
    id: "p3-health-1",
    part: 3,
    topic: "Health & Wellbeing",
    question: "Why do you think some people find it difficult to maintain a healthy lifestyle?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "Sedentary lifestyle", vietnamese: "Lối sống ít vận động" },
        { phrase: "To fall into bad habits", vietnamese: "Rơi vào thói quen xấu" },
        { phrase: "The root cause", vietnamese: "Nguyên nhân gốc rễ" },
        { phrase: "To prioritize health over convenience", vietnamese: "Ưu tiên sức khỏe hơn sự tiện lợi" },
        { phrase: "Mental well-being", vietnamese: "Sức khỏe tinh thần" },
      ],
      model_structures: [
        "I think the root cause of this issue is...",
        "In today's fast-paced society, many people tend to prioritize... over...",
        "It's also worth noting that mental well-being plays a significant role in...",
      ],
      brainstorming_ideas: [
        "Time constraints due to work pressure.",
        "Availability of cheap, unhealthy fast food.",
        "Lack of education about nutrition and exercise.",
        "Social media creating unrealistic body standards.",
        "The link between mental health and physical health.",
      ],
    },
    model_answer: "I think **the root cause** of this issue is that modern society encourages a **sedentary lifestyle**. People spend long hours at desks and then come home too tired to exercise. It's easy to **fall into bad habits** like eating fast food because it's convenient and cheap. Many people struggle to **prioritize health over convenience** when they're under constant work pressure. It's also worth noting that **mental well-being** plays a significant role — stress and anxiety can lead to emotional eating and lack of motivation to exercise.",
  },
  {
    id: "p3-globalization-1",
    part: 3,
    topic: "Globalization",
    question: "How has globalization affected traditional cultures?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "Cultural homogenization", vietnamese: "Sự đồng nhất văn hóa" },
        { phrase: "To preserve one's identity", vietnamese: "Bảo tồn bản sắc" },
        { phrase: "To strike a balance", vietnamese: "Tìm sự cân bằng" },
        { phrase: "Cultural exchange", vietnamese: "Giao lưu văn hóa" },
        { phrase: "To erode traditions", vietnamese: "Làm xói mòn truyền thống" },
        { phrase: "The flip side of the coin", vietnamese: "Mặt khác của vấn đề" },
      ],
      model_structures: [
        "Globalization has had a profound impact on traditional cultures, both positively and negatively.",
        "On one hand, cultural exchange has enriched... On the other hand, it has led to...",
        "The challenge lies in striking a balance between embracing modernity and preserving...",
      ],
      brainstorming_ideas: [
        "Western culture influencing fashion, food, and entertainment.",
        "Loss of indigenous languages and customs.",
        "Tourism as both a preserver and destroyer of culture.",
        "The role of social media in spreading global culture.",
        "Examples of countries successfully preserving traditions (Japan, India).",
      ],
    },
    model_answer: "Globalization has had a profound impact on traditional cultures. On one hand, **cultural exchange** has enriched societies by introducing new ideas, cuisines, and art forms. However, **the flip side of the coin** is **cultural homogenization**, where local traditions are gradually being **eroded** by dominant Western influences. Many young people now prefer global brands and entertainment over traditional customs. The challenge lies in **striking a balance** between embracing modernity and **preserving one's identity**. Countries like Japan have done this remarkably well — they have fully embraced technology while still honoring their centuries-old traditions.",
  },
  {
    id: "p3-media-1",
    part: 3,
    topic: "Media & Communication",
    question: "How has social media changed the way people communicate?",
    useful_language: {
      vocabulary_bank: [
        { phrase: "Instant communication", vietnamese: "Giao tiếp tức thì" },
        { phrase: "To blur the line between", vietnamese: "Làm mờ ranh giới giữa..." },
        { phrase: "The spread of misinformation", vietnamese: "Sự lan truyền thông tin sai lệch" },
        { phrase: "Face-to-face interaction", vietnamese: "Giao tiếp trực tiếp" },
        { phrase: "A sense of belonging", vietnamese: "Cảm giác thuộc về" },
      ],
      model_structures: [
        "Social media has fundamentally transformed the way we communicate by...",
        "While it has made instant communication possible, it has also...",
        "I believe the key to healthy social media use is to...",
      ],
      brainstorming_ideas: [
        "Connecting with friends and family across distances.",
        "Replacing deep conversations with shallow interactions.",
        "Creating echo chambers and filter bubbles.",
        "Impact on mental health (comparison, cyberbullying).",
        "Social media as a tool for activism and awareness.",
      ],
    },
    model_answer: "Social media has fundamentally transformed the way we communicate by enabling **instant communication** across the globe. People can now maintain relationships regardless of physical distance, which creates **a sense of belonging** in online communities. However, it has also **blurred the line between** genuine connection and superficial interaction — many people have thousands of online friends but lack meaningful **face-to-face interactions**. Another major concern is **the spread of misinformation**, which can have serious consequences for public opinion and even democratic processes. I believe the key is to use social media mindfully while prioritizing real-world relationships.",
  },
];

// Export all questions grouped by part
export const speakingPracticeData = {
  part1: part1PracticeQuestions,
  part2: part2PracticeQuestions,
  part3: part3PracticeQuestions,
};

// Get all topics for a given part
export const getTopicsByPart = (part: 1 | 2 | 3): string[] => {
  const questions = speakingPracticeData[`part${part}`];
  return [...new Set(questions.map(q => q.topic))];
};

// Get questions for a given part and optional topic filter
export const getQuestionsByPartAndTopic = (part: 1 | 2 | 3, topic?: string): SpeakingPracticeQuestion[] => {
  const questions = speakingPracticeData[`part${part}`];
  if (!topic) return questions;
  return questions.filter(q => q.topic === topic);
};
