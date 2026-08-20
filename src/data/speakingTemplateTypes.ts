/**
 * @file speakingTemplateTypes.ts
 * @description Question-type templates for the IELTS Speaking Template Lab.
 *   Each entry maps a common question type (per part) onto the part framework
 *   (PREP / cue-card blocks / AREA + Balance) and adds a fully worked Band 7.5+
 *   example annotated step by step, plus extra practice questions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { getSpeakingTemplate, SpeakingTemplate, TemplateStep } from "./speakingAnswerTemplates";

export interface AnnotatedLine {
  stepId: string;
  text: string;
}

export interface SpeakingQuestionType {
  id: string;
  part: 1 | 2 | 3;
  labelVi: string;
  labelEn: string;
  cueWords: string[];
  /** How to bend the framework for this specific question type. */
  tipVi: string;
  tipEn: string;
  example: {
    question: string;
    band: string;
    lines: AnnotatedLine[];
  };
  practiceQuestions: string[];
}

/** Framework (steps) used by a question type - inherited from its part. */
export const getFrameworkForType = (type: SpeakingQuestionType): SpeakingTemplate =>
  getSpeakingTemplate(type.part);

export const getStepLabel = (steps: TemplateStep[], stepId: string) =>
  steps.find((s) => s.id === stepId);

export const SPEAKING_QUESTION_TYPES: SpeakingQuestionType[] = [
  /* ------------------------------ PART 1 ------------------------------ */
  {
    id: "p1-like",
    part: 1,
    labelVi: "Sở thích / thói quen (Do you like...?)",
    labelEn: "Preference / habit (Do you like...?)",
    cueWords: ["Do you like", "Do you enjoy", "Are you interested in"],
    tipVi: "Trả lời có/không rõ ràng ngay câu đầu, rồi mới giải thích - đừng vòng vo.",
    tipEn: "Give a clear yes/no in the first sentence, then explain - do not stall.",
    example: {
      question: "Do you like cooking?",
      band: "Band 7.5",
      lines: [
        { stepId: "point", text: "Yes, definitely - I'd say cooking is one of the few things that genuinely relaxes me." },
        { stepId: "reason", text: "It's mainly because it takes my mind off work; chopping and stirring is almost meditative after a long day." },
        { stepId: "example", text: "For instance, just last weekend I spent nearly two hours making a beef pho broth from scratch for my family." },
        { stepId: "twist", text: "So overall, it's something I really look forward to, even though I'm nowhere near a professional cook." },
      ],
    },
    practiceQuestions: [
      "Do you like listening to music while you work?",
      "Do you enjoy shopping in traditional markets?",
      "Are you interested in learning new languages?",
      "Do you like the area where you live?",
    ],
  },
  {
    id: "p1-frequency",
    part: 1,
    labelVi: "Tần suất (How often...?)",
    labelEn: "Frequency (How often...?)",
    cueWords: ["How often", "How much time", "When do you usually"],
    tipVi: "Đưa ra tần suất cụ thể (twice a week, hardly ever) rồi giải thích, tránh chỉ nói 'sometimes'.",
    tipEn: "Give a precise frequency (twice a week, hardly ever) then explain - avoid a bare 'sometimes'.",
    example: {
      question: "How often do you go to the cinema?",
      band: "Band 7.5",
      lines: [
        { stepId: "point", text: "Not as often as I'd like, to be honest - maybe once every couple of months these days." },
        { stepId: "reason", text: "That's largely down to the fact that streaming platforms are so convenient, so I rarely bother going out." },
        { stepId: "example", text: "Take last month, for example - I only went once, and that was for a Vietnamese film everyone was talking about." },
        { stepId: "twist", text: "That said, I used to go almost every week when I was a student, so it's clearly a matter of time rather than interest." },
      ],
    },
    practiceQuestions: [
      "How often do you use public transport?",
      "How much time do you spend on social media each day?",
      "How often do you eat out with friends?",
      "When do you usually do your exercise?",
    ],
  },
  {
    id: "p1-past-now",
    part: 1,
    labelVi: "So sánh quá khứ - hiện tại (Did you use to...?)",
    labelEn: "Past vs now (Did you use to...?)",
    cueWords: ["Did you use to", "Has that changed", "When you were a child"],
    tipVi: "Dùng 'used to' + 'these days' để làm rõ sự thay đổi - đây là điểm ngữ pháp giám khảo muốn nghe.",
    tipEn: "Contrast 'used to' with 'these days' - that grammatical shift is exactly what the examiner wants.",
    example: {
      question: "Did you use to read more when you were younger?",
      band: "Band 7.5",
      lines: [
        { stepId: "point", text: "Yes, far more - I used to finish a novel almost every fortnight as a teenager." },
        { stepId: "reason", text: "The main reason is that I simply had fewer responsibilities, whereas these days my evenings disappear into work emails." },
        { stepId: "example", text: "A good example would be the summer holidays, when I'd borrow five or six books from the school library at a time." },
        { stepId: "twist", text: "Compared with most of my friends, though, I'm probably still a fairly keen reader - I just do it on my phone now." },
      ],
    },
    practiceQuestions: [
      "Did you use to play a lot of sport as a child?",
      "Has the way you celebrate birthdays changed?",
      "Were you interested in science when you were at school?",
      "Do you keep in touch with childhood friends as much as before?",
    ],
  },
  {
    id: "p1-would",
    part: 1,
    labelVi: "Dự định / mong muốn (Would you like to...?)",
    labelEn: "Wish / intention (Would you like to...?)",
    cueWords: ["Would you like", "Do you plan to", "In the future"],
    tipVi: "Dùng thì tương lai và 'would love to' - nêu một kế hoạch cụ thể để tránh trả lời chung chung.",
    tipEn: "Use future forms and 'would love to' - name one concrete plan so the answer is not vague.",
    example: {
      question: "Would you like to learn another foreign language?",
      band: "Band 7.5",
      lines: [
        { stepId: "point", text: "I'd love to, yes - Finnish is actually next on my list." },
        { stepId: "reason", text: "The main reason is that I'm planning to study in Northern Europe, and even basic Finnish would help me settle in." },
        { stepId: "example", text: "For instance, I've already downloaded an app and I'm doing about fifteen minutes of vocabulary every morning." },
        { stepId: "twist", text: "So overall, it's less of a dream and more of a project I've already started." },
      ],
    },
    practiceQuestions: [
      "Would you like to live in another country?",
      "Do you plan to change jobs in the near future?",
      "Would you like to learn a musical instrument?",
      "Is there a place in your country you'd like to visit?",
    ],
  },

  /* ------------------------------ PART 2 ------------------------------ */
  {
    id: "p2-person",
    part: 2,
    labelVi: "Describe a person (người)",
    labelEn: "Describe a person",
    cueWords: ["Describe a person", "someone who", "a person you admire"],
    tipVi: "Chọn 1 người thật, tả tính cách bằng hành động cụ thể chứ không chỉ tính từ.",
    tipEn: "Pick one real person and show character through actions, not just adjectives.",
    example: {
      question: "Describe a person who has influenced you. You should say who they are, how you know them, what they do, and explain why they influenced you.",
      band: "Band 7.5",
      lines: [
        { stepId: "intro", text: "I'd like to talk about my former maths teacher, Mr Tuan, who probably shaped my study habits more than anyone else." },
        { stepId: "details", text: "To give you some background, he taught me for three years in secondary school in Hanoi. He was in his fifties, softly spoken, and famously patient with weaker students." },
        { stepId: "story", text: "What really stood out for me was one term when I failed two tests in a row. Instead of criticising me, he stayed after class twice a week and rebuilt my basics from scratch. The turning point came when I scored top of the class in the final exam - he simply said the result belonged to me, not to him. That taught me that steady effort beats natural talent." },
        { stepId: "wrap", text: "Looking back, I feel incredibly grateful for that year, and all in all he's the reason I now enjoy teaching others myself." },
      ],
    },
    practiceQuestions: [
      "Describe a friend you have known for a long time.",
      "Describe an older person you respect.",
      "Describe a person who is good at their job.",
      "Describe a family member you spend the most time with.",
    ],
  },
  {
    id: "p2-place",
    part: 2,
    labelVi: "Describe a place (địa điểm)",
    labelEn: "Describe a place",
    cueWords: ["Describe a place", "a city", "somewhere you visited"],
    tipVi: "Tả bằng các giác quan (âm thanh, mùi, ánh sáng) để phần Details dài và sinh động.",
    tipEn: "Use the senses (sound, smell, light) so the Details block feels vivid, not listed.",
    example: {
      question: "Describe a place you like to relax. You should say where it is, when you go there, what you do there, and explain why it helps you relax.",
      band: "Band 7.5",
      lines: [
        { stepId: "intro", text: "I'd like to talk about a small lakeside cafe near West Lake in Hanoi, which has become my default escape." },
        { stepId: "details", text: "To give you some background, it's about ten minutes from my flat, tucked behind a row of old flame trees. I usually go on Sunday mornings, when the streets are still quiet and you can hear the water rather than the traffic." },
        { stepId: "story", text: "What really stood out for me was the first time I went there, during a really stressful exam period. I sat by the window for almost three hours with a coffee and my notebook, and for once nobody could reach me. Since then it's become a habit: I plan my week, read a few pages, and watch elderly people doing tai chi across the road. It works because nothing there demands anything from me." },
        { stepId: "wrap", text: "All in all, it's the one place where I can genuinely slow down, and I'd recommend it to anyone visiting the city." },
      ],
    },
    practiceQuestions: [
      "Describe a city you would like to live in.",
      "Describe a shop or market you enjoy going to.",
      "Describe a place in nature that impressed you.",
      "Describe a building you find interesting.",
    ],
  },
  {
    id: "p2-object",
    part: 2,
    labelVi: "Describe an object (đồ vật)",
    labelEn: "Describe an object",
    cueWords: ["Describe something you own", "a gift", "an item"],
    tipVi: "Tả hình dáng ngắn thôi - dành phần lớn thời gian cho câu chuyện gắn với đồ vật đó.",
    tipEn: "Keep the physical description short - spend most of the time on the story behind the object.",
    example: {
      question: "Describe an important object you own. You should say what it is, how you got it, how often you use it, and explain why it is important to you.",
      band: "Band 7.5",
      lines: [
        { stepId: "intro", text: "I'd like to talk about a rather battered second-hand laptop that I still keep on my desk." },
        { stepId: "details", text: "To give you some background, my parents bought it for me about six years ago, just before I started university. It's a silver 13-inch machine, the keyboard is worn smooth, and honestly it's far too slow for anything demanding now." },
        { stepId: "story", text: "It mattered to me because at the time my family really couldn't afford it, and my mother saved for months. Every assignment of my degree was written on it, including a dissertation I finished at three in the morning. The turning point came when it finally started failing last year and I realised I couldn't bring myself to throw it away - it's basically a record of four years of effort." },
        { stepId: "wrap", text: "Looking back, I feel incredibly grateful for that sacrifice, and that's why, whenever someone asks me about my most valuable possession, this is the story I tell." },
      ],
    },
    practiceQuestions: [
      "Describe a gift you received that you liked.",
      "Describe a piece of technology you use every day.",
      "Describe an item of clothing that is special to you.",
      "Describe something you bought that was good value.",
    ],
  },
  {
    id: "p2-event",
    part: 2,
    labelVi: "Describe an event / experience (sự kiện, trải nghiệm)",
    labelEn: "Describe an event / experience",
    cueWords: ["Describe a time when", "an occasion", "an experience"],
    tipVi: "Kể theo trình tự thời gian và dùng thì quá khứ nhất quán; nêu rõ 'turning point'.",
    tipEn: "Narrate in order with consistent past tenses, and make the turning point explicit.",
    example: {
      question: "Describe a time when you helped someone. You should say who you helped, what the situation was, what you did, and explain how you felt about it.",
      band: "Band 7.5",
      lines: [
        { stepId: "intro", text: "I'd like to talk about a time last year when I helped a neighbour prepare for a job interview." },
        { stepId: "details", text: "To give you some background, she'd just moved to our building, she was in her early thirties, and she'd been out of work for almost a year after having a baby. The interview was for an administrative role at a hospital." },
        { stepId: "story", text: "She mentioned over dinner that she was terrified of the English part of the interview, so I offered to run mock sessions with her. We met four evenings in a row, and I recorded her answers so she could hear her own hesitations. The turning point came on the third evening, when she suddenly stopped translating in her head and started speaking naturally. She got the job the following week and brought my family a cake." },
        { stepId: "wrap", text: "Looking back, I feel genuinely proud of those few evenings, and all in all it's the experience that convinced me I enjoy coaching people." },
      ],
    },
    practiceQuestions: [
      "Describe a time when you were late for something important.",
      "Describe a celebration you enjoyed.",
      "Describe a journey that did not go as planned.",
      "Describe an occasion when you learned something new quickly.",
    ],
  },
  {
    id: "p2-activity",
    part: 2,
    labelVi: "Describe an activity / habit (hoạt động, thói quen)",
    labelEn: "Describe an activity / habit",
    cueWords: ["Describe an activity", "something you do", "a hobby"],
    tipVi: "Dùng thì hiện tại đơn cho phần Details, quá khứ cho phần Story để thể hiện độ linh hoạt ngữ pháp.",
    tipEn: "Use present simple for Details and past forms for the Story - it shows grammatical range.",
    example: {
      question: "Describe an activity you do to keep fit. You should say what it is, when you started, how often you do it, and explain why you enjoy it.",
      band: "Band 7.5",
      lines: [
        { stepId: "intro", text: "I'd like to talk about early-morning running, which has become a fixed part of my routine." },
        { stepId: "details", text: "I run about four times a week, usually at half past five, along a two-kilometre stretch beside the river near my house. I started roughly three years ago with a beginners' app that alternated walking and jogging." },
        { stepId: "story", text: "What really stood out was how quickly it changed more than my fitness. In the first month I could barely manage ten minutes, and the turning point came when I completed a five-kilometre charity race without stopping. Since then, running has become the time when I plan my day - I've solved more work problems on that riverside path than at my desk." },
        { stepId: "wrap", text: "All in all, it's the cheapest and most reliable habit I've ever built, and I can't imagine dropping it now." },
      ],
    },
    practiceQuestions: [
      "Describe a skill you learned outside school.",
      "Describe something you do to relax after studying.",
      "Describe a hobby you would like to take up.",
      "Describe a daily routine you find useful.",
    ],
  },

  /* ------------------------------ PART 3 ------------------------------ */
  {
    id: "p3-opinion",
    part: 3,
    labelVi: "Quan điểm (Do you think...?)",
    labelEn: "Opinion (Do you think...?)",
    cueWords: ["Do you think", "Do you agree", "Some people say"],
    tipVi: "Nêu quan điểm rõ nhưng có hedging, và luôn thừa nhận ý ngược lại trước khi chốt.",
    tipEn: "State a clear but hedged position, and always concede the opposite view before closing.",
    example: {
      question: "Do you think schools should teach students how to manage money?",
      band: "Band 7.5",
      lines: [
        { stepId: "answer", text: "I'd argue that they absolutely should, ideally from the last years of secondary school onwards." },
        { stepId: "reason", text: "This is largely because financial decisions are now made much earlier than before - teenagers have digital wallets and access to credit, so the knock-on effect of financial illiteracy is debt before they even graduate." },
        { stepId: "evidence", text: "In Vietnam, for example, a lot of my university friends had never seen a budget spreadsheet until they were paying rent themselves." },
        { stepId: "alternative", text: "That said, some people argue that this is a parental responsibility and that the curriculum is already overloaded, which I'd accept to a point." },
        { stepId: "conclusion", text: "So on balance, I'd still say a short compulsory module would deliver more practical value than almost anything else we add." },
      ],
    },
    practiceQuestions: [
      "Do you think governments should fund public art?",
      "Do you agree that working from home suits everyone?",
      "Some people say competition is bad for children. Do you agree?",
      "Do you think tourism always benefits local communities?",
    ],
  },
  {
    id: "p3-why",
    part: 3,
    labelVi: "Nguyên nhân - kết quả (Why do...?)",
    labelEn: "Cause and effect (Why do...?)",
    cueWords: ["Why do", "What causes", "What are the reasons"],
    tipVi: "Trình bày 1-2 nguyên nhân sâu và giải thích chuỗi nhân quả, đừng liệt kê 5 nguyên nhân hời hợt.",
    tipEn: "Develop one or two deep causes with a chain of consequences instead of listing five shallow ones.",
    example: {
      question: "Why do people in cities tend to have fewer children?",
      band: "Band 7.5",
      lines: [
        { stepId: "answer", text: "On the whole, I tend to think it comes down to cost and opportunity rather than any change in how much people value family." },
        { stepId: "reason", text: "One key factor here is that urban housing and schooling are disproportionately expensive, so couples delay having children; the knock-on effect of delaying is that they simply end up with fewer." },
        { stepId: "evidence", text: "A clear illustration of this is Hanoi, where a young couple might spend close to half their income on rent alone, compared with a fraction of that in the countryside." },
        { stepId: "alternative", text: "Having said that, there's a counter-argument that career ambition, particularly among women with better access to professional work, plays an equally large role." },
        { stepId: "conclusion", text: "Ultimately, it comes down to economics reshaping personal timelines rather than a decline in family values." },
      ],
    },
    practiceQuestions: [
      "Why do some people prefer buying second-hand goods?",
      "What causes traffic problems in large cities?",
      "Why are traditional crafts disappearing in some countries?",
      "What are the reasons young people move abroad to study?",
    ],
  },
  {
    id: "p3-compare",
    part: 3,
    labelVi: "So sánh nhóm / thế hệ",
    labelEn: "Comparison (groups / generations)",
    cueWords: ["What's the difference between", "compared with", "young people and older people"],
    tipVi: "Dùng cấu trúc so sánh (whereas, compared with, far more) và nêu điểm giống nhau để cân bằng.",
    tipEn: "Use comparative structures (whereas, compared with, far more) and add one similarity for balance.",
    example: {
      question: "What are the differences between how young people and older people spend their free time?",
      band: "Band 7.5",
      lines: [
        { stepId: "answer", text: "I'd argue the biggest difference isn't the activity itself but how social and how screen-based it is." },
        { stepId: "reason", text: "This is largely because younger people grew up with digital communities, so their leisure is often mediated by a device, whereas older generations built habits around physical spaces such as parks and tea houses." },
        { stepId: "evidence", text: "Compared with a decade ago, my own family is a good illustration: my parents still meet the same neighbours every morning, while my cousins socialise mainly through gaming and group chats." },
        { stepId: "alternative", text: "Of course, it isn't quite that simple, since plenty of retired people now use social media heavily, and many teenagers are returning to sport and hiking." },
        { stepId: "conclusion", text: "For those reasons, I'd describe it as a difference in medium rather than in what people fundamentally want - company and a break from work." },
      ],
    },
    practiceQuestions: [
      "How is shopping today different from shopping in the past?",
      "Do men and women choose different kinds of jobs in your country?",
      "How do city and countryside childhoods differ?",
      "Is family life different now compared with your grandparents' time?",
    ],
  },
  {
    id: "p3-future",
    part: 3,
    labelVi: "Dự đoán tương lai (Will...?)",
    labelEn: "Future prediction (Will...?)",
    cueWords: ["Will", "in the future", "Do you think this will change"],
    tipVi: "Dùng ngôn ngữ dự đoán có mức độ (is likely to, may well, I doubt) - đừng khẳng định tuyệt đối.",
    tipEn: "Use graded prediction language (is likely to, may well, I doubt) rather than absolute claims.",
    example: {
      question: "Will printed books disappear in the future?",
      band: "Band 7.5",
      lines: [
        { stepId: "answer", text: "It largely depends on the type of book, but generally I doubt printed books will disappear altogether within our lifetime." },
        { stepId: "reason", text: "This is largely because print now serves a different purpose: it's slower, easier on the eyes, and increasingly treated as a physical object people want to own." },
        { stepId: "evidence", text: "A clear illustration of this is the way independent bookshops in Hanoi have actually expanded over the last five years, despite e-readers being cheap and widely available." },
        { stepId: "alternative", text: "Having said that, there's a strong counter-argument for textbooks and manuals, which are likely to move online completely because they need constant updating." },
        { stepId: "conclusion", text: "So on balance, I'd predict print shrinking into a premium, leisure market rather than dying out." },
      ],
    },
    practiceQuestions: [
      "Will most people work from home in the future?",
      "Do you think cash will still be used in twenty years?",
      "Will artificial intelligence replace teachers?",
      "Do you think family sizes will keep getting smaller?",
    ],
  },
  {
    id: "p3-pros-cons",
    part: 3,
    labelVi: "Ưu - nhược điểm (Advantages / disadvantages)",
    labelEn: "Advantages / disadvantages",
    cueWords: ["What are the advantages", "drawbacks", "benefits and problems"],
    tipVi: "Nêu 1 ưu điểm mạnh nhất + 1 nhược điểm mạnh nhất rồi cân nhắc, thay vì liệt kê dàn trải.",
    tipEn: "Give the strongest advantage and the strongest drawback, then weigh them - do not list everything.",
    example: {
      question: "What are the advantages and disadvantages of studying abroad?",
      band: "Band 7.5",
      lines: [
        { stepId: "answer", text: "On the whole, I tend to think the benefits outweigh the drawbacks, though the balance depends heavily on the student's maturity." },
        { stepId: "reason", text: "The clearest advantage is independence: living alone in a different system forces students to manage money, deadlines and relationships, and the knock-on effect is that employers see them as far more adaptable." },
        { stepId: "evidence", text: "In Vietnam, for example, graduates returning from Europe are often fast-tracked into international teams precisely because they can operate across cultures." },
        { stepId: "alternative", text: "That said, some people argue that the cost and the isolation are serious problems, and I'd agree that homesickness derails a fair number of students in their first year." },
        { stepId: "conclusion", text: "For those reasons, I'm convinced it's worthwhile, provided students are prepared for the emotional side and not just the academic one." },
      ],
    },
    practiceQuestions: [
      "What are the benefits and problems of remote learning?",
      "What are the advantages of living in a big city?",
      "Are there drawbacks to being famous?",
      "What are the pros and cons of a cashless society?",
    ],
  },
];

export const getTypesByPart = (part: 1 | 2 | 3) =>
  SPEAKING_QUESTION_TYPES.filter((t) => t.part === part);
