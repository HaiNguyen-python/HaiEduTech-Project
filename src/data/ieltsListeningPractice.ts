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
  // Optional inline SVG markup for map / plan labelling sets
  mapSvg?: string;
  // Cambridge-style form/notes renderer:
  //   formTitle:  e.g. "LIBRARY MEMBERSHIP FORM"
  //   formLayout: multiline template with {1} {2} ... placeholders that map
  //               to the fill-in questions by 1-based index. When present,
  //               the card renders the form layout instead of separate Q cards.
  formTitle?: string;
  formLayout?: string;
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
      "Perfect. What type of membership would you like? We offer standard, student, or family?\n" +
      "I'll go for the family membership please, since my children will use it too.\n" +
      "How many children are we adding?\n" +
      "Two children, please.\n" +
      "Of course. The annual fee for that is twenty-eight pounds.\n" +
      "That's fine. When can I collect the card?\n" +
      "It will be ready on Tuesday after two p.m. Please bring a passport for ID.\n" +
      "And finally - would you like to subscribe to our weekly newsletter?\n" +
      "Yes please, send it to my email: sarah dot mitchell at quickmail dot net.\n" +
      "Wonderful, thank you very much.",
    formTitle: "GREENFIELD LIBRARY - MEMBERSHIP FORM",
    formLayout:
      "PERSONAL DETAILS\n" +
      "  First name:       Sarah\n" +
      "  Surname:          {1}\n" +
      "  Date of birth:    14 {2} 1995\n" +
      "  Address:          42 {3} Road\n" +
      "  Postcode:         {4}\n" +
      "  Mobile (last 3):  {5}\n" +
      "\n" +
      "MEMBERSHIP\n" +
      "  Membership type:        {6}\n" +
      "  Number of children:     {7}\n" +
      "  Annual fee:             £ {8}\n" +
      "  Card ready on:          {9} (after 2 p.m.)\n" +
      "  ID required to collect: {10}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Mitchell" },
      { type: "fill-in", prompt: "Date of birth: 14 ___ 1995", answer: "March" },
      { type: "fill-in", prompt: "Address: 42 ___ Road", answer: "Oakwood" },
      { type: "fill-in", prompt: "Postcode: ___", answer: "BR3 4YN" },
      { type: "fill-in", prompt: "Mobile number ends in: ___", answer: "857" },
      { type: "fill-in", prompt: "Membership type: ___", answer: "family" },
      { type: "fill-in", prompt: "Number of children added: ___", answer: "2" },
      { type: "fill-in", prompt: "Annual fee: £___", answer: "28" },
      { type: "fill-in", prompt: "Card ready on: ___ after 2 p.m.", answer: "Tuesday" },
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
      "Guide: Welcome everyone to the Old Town walking tour. My name is Daniel and I'll be your guide today.\n" +
      "The tour lasts approximately two and a half hours, with one short break at the cathedral square.\n" +
      "Originally, we planned to start at the river bridge, but due to construction work this morning we'll begin from the museum entrance instead.\n" +
      "Please remember that photography is permitted everywhere outdoors, but inside the cathedral only the main hall allows photos, and flash is not allowed.\n" +
      "If you become separated from the group, the easiest meeting point is the clock tower in the central square at three o'clock.\n" +
      "At the end of the tour you'll receive a small souvenir map. There's no extra charge - it's already included in your ticket.\n" +
      "The tour itself costs fifteen pounds per adult, but children under twelve come along for free with a paying adult.\n" +
      "Our short break will last about fifteen minutes, so please use the toilets at the visitor centre next to the cathedral.\n" +
      "Drinking water is fine, but please no hot drinks inside the historic buildings - spillages have damaged the stone floors in the past.\n" +
      "And one quick warning - the cobbled lane to the castle is uneven, so please wear sensible shoes.\n" +
      "Finally, the most important rule: please stay together when we cross the busy roads near the market.",
    questions: [
      { type: "mcq", prompt: "How long is the tour?", options: ["1.5 hours", "2 hours", "2.5 hours"], answer: 2 },
      { type: "mcq", prompt: "Where will the tour begin today?", options: ["The river bridge", "The museum entrance", "The cathedral square"], answer: 1 },
      { type: "mcq", prompt: "Why did the start point change?", options: ["Bad weather", "Construction work", "A festival"], answer: 1 },
      { type: "mcq", prompt: "Inside the cathedral, photography is", options: ["completely forbidden", "allowed only in the main hall", "allowed everywhere with flash"], answer: 1 },
      { type: "mcq", prompt: "Where is the short break held?", options: ["The market", "The castle", "The cathedral square"], answer: 2 },
      { type: "mcq", prompt: "How long is the short break?", options: ["10 minutes", "15 minutes", "20 minutes"], answer: 1 },
      { type: "mcq", prompt: "If separated, the meeting point is", options: ["the museum at 2 pm", "the clock tower at 3 pm", "the bridge at 4 pm"], answer: 1 },
      { type: "mcq", prompt: "The souvenir map is", options: ["sold separately", "included in the ticket", "given only to children"], answer: 1 },
      { type: "mcq", prompt: "The ticket price for one adult is:", options: ["£10", "£12", "£15"], answer: 2 },
      { type: "mcq", prompt: "Visitors must take care because", options: ["the cobbled lane to the castle is uneven", "the cathedral floor is slippery", "the market closes early"], answer: 0 },
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
      "You will hear a description of Riverside Park. Five locations on the map are marked 1-5. Listen carefully and write the letter (A-G) of the facility that is found at each numbered location. Two of the items in the list are NOT on the map. Then answer questions 6-10.",
    contextVi:
      "Bạn sẽ nghe mô tả công viên Riverside. Trên bản đồ có 5 vị trí được đánh số 1-5. Hãy nghe và viết chữ cái (A-G) tương ứng với CƠ SỞ nằm tại mỗi vị trí. Có 2 mục trong danh sách KHÔNG xuất hiện trên bản đồ. Sau đó trả lời câu 6-10.",
    transcript:
      "Guide: Welcome to Riverside Park. Let me describe the layout so you can find your way around.\n" +
      "As you come in through the main entrance at the south, the first thing you'll see immediately on your right is the information centre. That's where you can pick up free maps and event leaflets.\n" +
      "Walk straight ahead along the wide path heading north. About halfway up, on your left, there's a small wooden building - that's the café, which serves hot drinks and snacks.\n" +
      "Continue to the roundabout in the middle of the park. If you turn west at the roundabout and follow that path to the end, you'll reach the children's playground in the western corner.\n" +
      "Going east from the roundabout, the picnic area is the first thing you come to, on the right side of the eastern path.\n" +
      "Finally, if you keep going north past the roundabout all the way to the river, you'll find the boat hire kiosk right by the water.\n" +
      "A few practical points before you head off.\n" +
      "The park is open from seven in the morning until nine in the evening, every day of the year except Christmas Day.\n" +
      "The café closes thirty minutes before the rest of the park.\n" +
      "Dogs are very welcome but must be kept on a lead in the playground area.\n" +
      "Boat hire costs ten pounds per hour and is available only for visitors aged sixteen and over.\n" +
      "We recommend allowing about two hours to enjoy everything the park has to offer. Enjoy your visit.",
    mapSvg:
      '<svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Riverside Park map">' +
      '<rect x="0" y="0" width="560" height="380" fill="#f3efe2"/>' +
      // River at the top
      '<rect x="0" y="0" width="560" height="42" fill="#bfe3f3"/>' +
      '<text x="280" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#0b6e8f">RIVER</text>' +
      // Compass
      '<g transform="translate(508,70)"><circle r="22" fill="#fff" stroke="#888"/><text y="-6" text-anchor="middle" font-size="11" fill="#444">N</text><text y="18" text-anchor="middle" font-size="11" fill="#444">S</text><text x="-13" y="6" text-anchor="middle" font-size="11" fill="#444">W</text><text x="13" y="6" text-anchor="middle" font-size="11" fill="#444">E</text><line x1="0" y1="-14" x2="0" y2="14" stroke="#444"/><polygon points="0,-16 -4,-8 4,-8" fill="#c0392b"/></g>' +
      // Park boundary
      '<rect x="40" y="60" width="450" height="300" fill="#dfead0" stroke="#4a7c3a" stroke-width="2"/>' +
      // Vertical main path (entrance -> roundabout -> river)
      '<line x1="260" y1="360" x2="260" y2="42" stroke="#b08a55" stroke-width="14" stroke-linecap="round"/>' +
      // West and east paths from roundabout
      '<line x1="60" y1="210" x2="470" y2="210" stroke="#b08a55" stroke-width="12" stroke-linecap="round"/>' +
      // Roundabout
      '<circle cx="260" cy="210" r="22" fill="#e2c896" stroke="#8a6a3a" stroke-width="2"/>' +
      '<text x="260" y="214" text-anchor="middle" font-size="10" fill="#5a4012">roundabout</text>' +
      // Main entrance
      '<rect x="232" y="350" width="56" height="20" fill="#2c3e50"/>' +
      '<text x="260" y="364" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">ENTRANCE</text>' +
      // Numbered location markers 1-5 (positions only, no item labels)
      // 1 - just inside entrance, right (answer: E = Information centre)
      '<g><circle cx="296" cy="332" r="18" fill="#fef3c7" stroke="#b45309" stroke-width="2.5"/><text x="296" y="338" text-anchor="middle" font-size="16" font-weight="800" fill="#b45309">1</text></g>' +
      // 2 - halfway up main path, left (answer: A = Café)
      '<g><circle cx="232" cy="290" r="18" fill="#fef3c7" stroke="#b45309" stroke-width="2.5"/><text x="232" y="296" text-anchor="middle" font-size="16" font-weight="800" fill="#b45309">2</text></g>' +
      // 3 - west end of west path (answer: B = Playground)
      '<g><circle cx="78" cy="210" r="18" fill="#fef3c7" stroke="#b45309" stroke-width="2.5"/><text x="78" y="216" text-anchor="middle" font-size="16" font-weight="800" fill="#b45309">3</text></g>' +
      // 4 - east path, first on the right (answer: F = Picnic area)
      '<g><circle cx="330" cy="182" r="18" fill="#fef3c7" stroke="#b45309" stroke-width="2.5"/><text x="330" y="188" text-anchor="middle" font-size="16" font-weight="800" fill="#b45309">4</text></g>' +
      // 5 - north end by the river (answer: D = Boat hire)
      '<g><circle cx="260" cy="70" r="18" fill="#fef3c7" stroke="#b45309" stroke-width="2.5"/><text x="260" y="76" text-anchor="middle" font-size="16" font-weight="800" fill="#b45309">5</text></g>' +
      // Direction hints
      '<text x="55" y="200" font-size="10" fill="#5a4012">west path</text>' +
      '<text x="410" y="200" font-size="10" fill="#5a4012">east path</text>' +
      '</svg>',
    questions: [
      { type: "matching", prompt: "1. Location marked 1 on the map", answer: "E" },
      { type: "matching", prompt: "2. Location marked 2 on the map", answer: "A" },
      { type: "matching", prompt: "3. Location marked 3 on the map", answer: "B" },
      { type: "matching", prompt: "4. Location marked 4 on the map", answer: "F" },
      { type: "matching", prompt: "5. Location marked 5 on the map", answer: "D" },
      { type: "fill-in", prompt: "6. Park opens at ___ a.m.", answer: "7" },
      { type: "fill-in", prompt: "7. Park is closed only on ___ Day.", answer: "Christmas" },
      { type: "fill-in", prompt: "8. Dogs must be on a lead in the ___ area.", answer: "playground" },
      { type: "fill-in", prompt: "9. Boat hire cost: £___ per hour", answer: "10" },
      { type: "fill-in", prompt: "10. Minimum age for boat hire: ___", answer: "16" },
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
      "You will hear three students - Anna, Ben and Chloe - talking about their final-year projects. Match each comment 1-10 to the correct speaker:\n" +
      "A) Anna   B) Ben   C) Chloe",
    contextVi:
      "Bạn sẽ nghe ba sinh viên - Anna, Ben, Chloe - nói về dự án cuối khóa. Nối mỗi nhận xét 1-10 với người nói đúng:\n" +
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
      { type: "matching", prompt: "Used existing databases for the project data", answer: "B" },
      { type: "matching", prompt: "Reports that supervisor meetings often get cancelled", answer: "B" },
      { type: "matching", prompt: "Prefers to work independently between meetings", answer: "C" },
      { type: "matching", prompt: "Would choose a narrower topic next time", answer: "A" },
      { type: "matching", prompt: "Would start the statistics earlier next time", answer: "B" },
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
      { type: "fill-in", prompt: "First solid evidence of brewing comes from the ___ century.", answer: "fifteenth" },
      { type: "fill-in", prompt: "The first evidence comes from ___ (country).", answer: "Yemen" },
      { type: "fill-in", prompt: "Sufi monks in Yemen used coffee during long ___ prayers.", answer: "evening" },
      { type: "fill-in", prompt: "The first coffee house opened in ___ in 1554.", answer: "Istanbul" },
      { type: "fill-in", prompt: "Number of London coffee houses by 1675: more than ___", answer: "3000" },
      { type: "fill-in", prompt: "London coffee houses were nicknamed ___ universities.", answer: "penny" },
      { type: "fill-in", prompt: "Today, ___ is the largest coffee-producing country.", answer: "Brazil" },
      { type: "fill-in", prompt: "Brazil accounts for roughly ___ of global supply.", answer: "one third" },
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
      { type: "fill-in", prompt: "Urban beekeeping has grown popular over the past ___.", answer: "decade" },
      { type: "fill-in", prompt: "Urban bees often produce more honey thanks to a greater variety of ___.", answer: "flowering plants" },
      { type: "fill-in", prompt: "Most city hives have to be placed on ___.", answer: "rooftops" },
      { type: "fill-in", prompt: "Rooftop hives require ___ from the building owner.", answer: "permission" },
      { type: "fill-in", prompt: "Hives should be placed in light ___.", answer: "shade" },
      { type: "fill-in", prompt: "Hives should be painted a ___ colour to reflect heat.", answer: "pale" },
      { type: "fill-in", prompt: "Bees need water within about ___ metres of the hive.", answer: "500" },
      { type: "fill-in", prompt: "A shallow dish filled with ___ works well as a water source.", answer: "pebbles" },
      { type: "fill-in", prompt: "Inspect hives every ___ days during spring and summer.", answer: "7" },
      { type: "fill-in", prompt: "Register hives with the local council, mainly for ___ reasons.", answer: "public health" },
    ],
  },
];
