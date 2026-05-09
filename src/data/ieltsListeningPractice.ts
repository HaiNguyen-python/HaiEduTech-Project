// IELTS Listening Practice Sets - one set per question type, with audio (TTS) + transcript + questions.
// Designed to mirror Cambridge IELTS Listening test structure (Sections 1-4).

export type ListeningQuestion =
  | {
      type: "fill-in";
      prompt: string; // sentence/note with ___ for blank
      promptVi?: string;
      answer: string; // case-insensitive accepted
      maxWords?: number;
    }
  | {
      type: "mcq";
      prompt: string;
      promptVi?: string;
      options: string[];
      answer: number; // index
    }
  | {
      type: "matching";
      prompt: string; // statement to match
      promptVi?: string;
      answer: string; // letter A/B/C/...
    };

export interface ListeningPracticeSet {
  id: string;
  section: 1 | 2 | 3 | 4;
  questionType: string;
  questionTypeVi: string;
  title: string;
  titleVi: string;
  context: string; // Brief intro shown to student before audio
  contextVi: string;
  transcript: string; // English text read by TTS
  rate?: number; // TTS rate, default 0.95
  // Optional reference list for "matching" questions (A/B/C labels)
  matchingOptions?: { letter: string; text: string; textVi?: string }[];
  questions: ListeningQuestion[];
}

export const ieltsListeningPracticeSets: ListeningPracticeSet[] = [
  // ===== Section 1: Form Completion =====
  {
    id: "form-completion-s1",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Library Membership Registration",
    titleVi: "Đăng ký thẻ thư viện",
    context: "You will hear a phone call between a new resident and a library staff member. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe một cuộc gọi điện thoại giữa cư dân mới và nhân viên thư viện. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Good morning, Greenfield Library, how can I help you?\n" +
      "Hi, I'd like to apply for a library membership please.\n" +
      "Sure, I'll just take some details. Can I have your full name?\n" +
      "Yes, it's Sarah Mitchell. That's M-I-T-C-H-E-L-L.\n" +
      "Thank you. And your date of birth?\n" +
      "The fourteenth of March, nineteen ninety-five.\n" +
      "Great. What's your current address?\n" +
      "It's forty-two Oakwood Road, postcode B-R-three, four-Y-N.\n" +
      "Lovely. And a contact number?\n" +
      "My mobile is oh seven nine double four, three two one, eight five seven.\n" +
      "Perfect. What type of membership would you like? We offer standard, student, or family.\n" +
      "I'll go for the family membership please, since my children will use it too.\n" +
      "Of course. The annual fee for that is twenty-eight pounds.\n" +
      "That's fine. When can I collect the card?\n" +
      "It will be ready on Tuesday after two p.m. Please bring a passport for ID.\n" +
      "Wonderful, thank you very much.",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Mitchell" },
      { type: "fill-in", prompt: "Date of birth: 14 ___ 1995", answer: "March" },
      { type: "fill-in", prompt: "Address: 42 ___ Road", answer: "Oakwood" },
      { type: "fill-in", prompt: "Mobile number ends in: ___", answer: "857" },
      { type: "fill-in", prompt: "Membership type: ___", answer: "family" },
      { type: "fill-in", prompt: "Annual fee: £___", answer: "28" },
      { type: "fill-in", prompt: "ID required to collect card: ___", answer: "passport" },
    ],
  },

  // ===== Section 2: Multiple Choice =====
  {
    id: "mcq-s2",
    section: 2,
    questionType: "Multiple Choice",
    questionTypeVi: "Trắc nghiệm",
    title: "City Walking Tour Briefing",
    titleVi: "Giới thiệu tour đi bộ thành phố",
    context: "You will hear a tour guide giving information about a city walking tour. Choose the correct answer A, B, or C.",
    contextVi: "Bạn sẽ nghe một hướng dẫn viên giới thiệu tour đi bộ. Chọn đáp án đúng A, B hoặc C.",
    transcript:
      "Welcome everyone to the Old Town walking tour. My name is Daniel and I'll be your guide today.\n" +
      "The tour lasts approximately two and a half hours, with one short break at the cathedral square.\n" +
      "Originally, we planned to start at the river bridge, but due to construction work this morning we'll begin from the museum entrance instead.\n" +
      "Please remember that photography is permitted everywhere outdoors, but inside the cathedral only the main hall allows photos, and flash is not allowed.\n" +
      "If you become separated from the group, the easiest meeting point is the clock tower in the central square at three o'clock.\n" +
      "At the end of the tour you'll receive a small souvenir map. There's no extra charge - it's already included in your ticket.\n" +
      "And finally, the most important rule: please stay together when we cross the busy roads near the market.",
    questions: [
      {
        type: "mcq",
        prompt: "How long is the tour?",
        options: ["1.5 hours", "2 hours", "2.5 hours"],
        answer: 2,
      },
      {
        type: "mcq",
        prompt: "Where will the tour begin today?",
        options: ["The river bridge", "The museum entrance", "The cathedral square"],
        answer: 1,
      },
      {
        type: "mcq",
        prompt: "Inside the cathedral, photography is",
        options: ["completely forbidden", "allowed only in the main hall", "allowed everywhere with flash"],
        answer: 1,
      },
      {
        type: "mcq",
        prompt: "If separated, the meeting point is",
        options: ["the museum at 2 pm", "the clock tower at 3 pm", "the bridge at 4 pm"],
        answer: 1,
      },
      {
        type: "mcq",
        prompt: "The souvenir map is",
        options: ["sold separately", "included in the ticket", "given only to children"],
        answer: 1,
      },
    ],
  },

  // ===== Section 2: Map Labelling =====
  {
    id: "map-labelling-s2",
    section: 2,
    questionType: "Map / Plan Labelling",
    questionTypeVi: "Gắn nhãn bản đồ",
    title: "Riverside Park Layout",
    titleVi: "Sơ đồ công viên Riverside",
    context:
      "You will hear a description of Riverside Park. Label the locations 1-5 with the correct letter A-G from the legend.\n" +
      "Map (text-based):\n" +
      "  • The MAIN ENTRANCE is at the south.\n" +
      "  • A wide path goes north from the entrance to a roundabout in the middle of the park.\n" +
      "  • At the roundabout, a path goes west and another path goes east.\n" +
      "  • Beyond the roundabout, the path continues north to the river.\n" +
      "Locations along the way: A) Café  B) Playground  C) Toilets  D) Boat hire  E) Information centre  F) Picnic area  G) Statue",
    contextVi:
      "Bạn sẽ nghe mô tả công viên Riverside. Gắn nhãn 5 vị trí 1-5 bằng chữ cái A-G phù hợp.\n" +
      "(LỐI VÀO CHÍNH ở phía Nam. Đường chính đi lên Bắc, có vòng xoay ở giữa, đường rẽ Đông-Tây, rồi tiếp tục lên sông.)",
    transcript:
      "Welcome to Riverside Park. Let me describe the layout so you can find your way around.\n" +
      "As you come in through the main entrance at the south, the first thing you'll see immediately on your right is the information centre. That's where you can pick up free maps and event leaflets.\n" +
      "Walk straight ahead along the wide path heading north. About halfway up, on your left, there's a small wooden building - that's the café, which serves hot drinks and snacks.\n" +
      "Continue to the roundabout in the middle of the park. If you turn west at the roundabout and follow that path to the end, you'll reach the children's playground in the western corner.\n" +
      "Going east from the roundabout, the picnic area is the first thing you come to, on the right side of the eastern path.\n" +
      "Finally, if you keep going north past the roundabout all the way to the river, you'll find the boat hire kiosk right by the water.",
    questions: [
      {
        type: "matching",
        prompt: "Just inside the main entrance, on the right",
        answer: "E",
      },
      {
        type: "matching",
        prompt: "Halfway along the main path, on the left",
        answer: "A",
      },
      {
        type: "matching",
        prompt: "End of the western path",
        answer: "B",
      },
      {
        type: "matching",
        prompt: "On the eastern path, first on the right",
        answer: "F",
      },
      {
        type: "matching",
        prompt: "By the river, at the north end",
        answer: "D",
      },
    ],
    matchingOptions: [
      { letter: "A", text: "Café" },
      { letter: "B", text: "Playground" },
      { letter: "C", text: "Toilets" },
      { letter: "D", text: "Boat hire" },
      { letter: "E", text: "Information centre" },
      { letter: "F", text: "Picnic area" },
      { letter: "G", text: "Statue" },
    ],
  },

  // ===== Section 3: Matching =====
  {
    id: "matching-s3",
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Nối thông tin",
    title: "Three Students Discuss Their Projects",
    titleVi: "Ba sinh viên thảo luận dự án",
    context:
      "You will hear three students - Anna, Ben and Chloe - talking about their final-year projects. Match each comment 1-5 to the correct speaker:\n" +
      "A) Anna   B) Ben   C) Chloe",
    contextVi:
      "Bạn sẽ nghe ba sinh viên - Anna, Ben, Chloe - nói về dự án cuối khóa. Nối mỗi nhận xét 1-5 với người nói đúng:\n" +
      "A) Anna   B) Ben   C) Chloe",
    transcript:
      "Tutor: So how are your projects going? Anna, you start.\n" +
      "Anna: To be honest, the data collection has been much harder than I expected. I underestimated how long it would take to recruit participants.\n" +
      "Ben: That's interesting. For me the data was easy because I used existing databases, but I'm really struggling with the statistical analysis - I might need extra help with that.\n" +
      "Chloe: My biggest challenge is actually the writing. I have all the results, but turning them into a clear story is taking forever.\n" +
      "Tutor: What about your supervisor meetings?\n" +
      "Anna: Mine have been excellent. We meet every two weeks and she always gives me really practical feedback.\n" +
      "Ben: I wish I could say the same. My supervisor is very busy and meetings often get cancelled.\n" +
      "Chloe: I see mine once a month, which suits me - I prefer to work independently.\n" +
      "Tutor: And what's the one thing you would change?\n" +
      "Anna: I'd choose a narrower topic. Mine is too broad.\n" +
      "Ben: I'd start the statistics earlier rather than leaving it until the end.\n" +
      "Chloe: I wouldn't change anything about the topic, but I'd plan my writing schedule from week one.",
    questions: [
      { type: "matching", prompt: "Found data collection harder than expected", answer: "A" },
      { type: "matching", prompt: "Is struggling most with statistical analysis", answer: "B" },
      { type: "matching", prompt: "Finds turning results into clear writing difficult", answer: "C" },
      { type: "matching", prompt: "Has very supportive and frequent supervisor meetings", answer: "A" },
      { type: "matching", prompt: "Would plan the writing schedule earlier next time", answer: "C" },
    ],
    matchingOptions: [
      { letter: "A", text: "Anna" },
      { letter: "B", text: "Ben" },
      { letter: "C", text: "Chloe" },
    ],
  },

  // ===== Section 4: Sentence Completion =====
  {
    id: "sentence-completion-s4",
    section: 4,
    questionType: "Sentence Completion",
    questionTypeVi: "Hoàn thành câu",
    title: "Lecture: The History of Coffee",
    titleVi: "Bài giảng: Lịch sử của cà phê",
    context: "You will hear part of a university lecture on the history of coffee. Complete the sentences below using NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe một phần bài giảng đại học về lịch sử cà phê. Hoàn thành các câu bên dưới dùng KHÔNG QUÁ HAI TỪ cho mỗi đáp án.",
    rate: 0.92,
    transcript:
      "Good morning everyone. Today we're looking at the fascinating history of coffee, a drink that has shaped economies and cultures for centuries.\n" +
      "Coffee is believed to have originated in the highlands of Ethiopia, where, according to legend, a goat herder noticed his animals becoming unusually energetic after eating red berries from a particular shrub.\n" +
      "The first solid evidence of coffee being brewed as a drink, however, comes from the fifteenth century in Yemen, where Sufi monks used it to stay awake during long evening prayers.\n" +
      "From Yemen, coffee quickly spread to the major cities of the Ottoman Empire. In Istanbul, the very first coffee house opened in fifteen fifty-four, becoming a centre for conversation, music and even political debate.\n" +
      "When coffee reached Europe in the seventeenth century, it was initially viewed with suspicion by religious authorities, but it gained royal approval in many countries and rapidly became fashionable.\n" +
      "In London alone, by the year sixteen seventy-five, more than three thousand coffee houses had appeared, often called penny universities because for the price of a single penny one could enter and join intellectual discussions.\n" +
      "The plant itself was eventually smuggled out of Arab control and cultivated in colonies across Asia and the Americas. Today, Brazil remains the largest producer in the world, accounting for roughly one third of global supply.",
    questions: [
      { type: "fill-in", prompt: "Coffee is thought to have originated in the highlands of ___.", answer: "Ethiopia" },
      { type: "fill-in", prompt: "A goat herder noticed his goats became energetic after eating red ___.", answer: "berries" },
      { type: "fill-in", prompt: "Sufi monks in Yemen used coffee during long ___ prayers.", answer: "evening" },
      { type: "fill-in", prompt: "The first coffee house opened in ___ in 1554.", answer: "Istanbul" },
      { type: "fill-in", prompt: "London coffee houses were nicknamed ___ universities.", answer: "penny" },
      { type: "fill-in", prompt: "Today, ___ is the largest coffee-producing country.", answer: "Brazil" },
    ],
  },

  // ===== Section 4: Note / Summary Completion =====
  {
    id: "note-completion-s4",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Hoàn thành ghi chú",
    title: "Lecture: Urban Beekeeping",
    titleVi: "Bài giảng: Nuôi ong đô thị",
    context: "You will hear part of a lecture about urban beekeeping. Complete the notes below using NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe một phần bài giảng về nuôi ong đô thị. Hoàn thành ghi chú bên dưới dùng KHÔNG QUÁ HAI TỪ cho mỗi đáp án.",
    rate: 0.92,
    transcript:
      "Today I want to talk about urban beekeeping, which has grown remarkably popular in cities over the past decade.\n" +
      "Surprisingly, urban bees often produce more honey than their rural counterparts. The main reason is that cities offer a wider variety of flowering plants, especially in private gardens and public parks, providing a longer season of nectar.\n" +
      "However, urban beekeepers also face several challenges. The first is space - most hives must be located on rooftops, which requires permission from the building owner.\n" +
      "The second challenge is temperature. City rooftops can become extremely hot in summer, so hives should ideally be placed in light shade and painted a pale colour to reflect heat.\n" +
      "Another consideration is water. Bees need a constant water source within roughly five hundred metres of the hive. A shallow dish filled with pebbles works very well.\n" +
      "Beekeepers should inspect their colonies every seven days during spring and summer to check for disease and to ensure the queen is laying eggs.\n" +
      "Finally, before harvesting honey, you must register your hives with the local council, mainly for public health reasons.",
    questions: [
      { type: "fill-in", prompt: "Urban bees often produce more honey thanks to a greater variety of ___.", answer: "flowering plants" },
      { type: "fill-in", prompt: "Most city hives have to be placed on ___.", answer: "rooftops" },
      { type: "fill-in", prompt: "Hives should be painted a ___ colour to reflect heat.", answer: "pale" },
      { type: "fill-in", prompt: "Bees need water within about ___ metres of the hive.", answer: "500" },
      { type: "fill-in", prompt: "Inspect hives every ___ days during spring and summer.", answer: "7" },
      { type: "fill-in", prompt: "You must register hives with the ___ council before harvesting honey.", answer: "local" },
    ],
  },
];
