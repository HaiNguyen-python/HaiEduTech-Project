/**
 * @file ieltsListeningPracticeExpansion3.ts
 * @description Fourth batch of IELTS Listening practice sets - one per section,
 * each with 10 questions to match real Cambridge IELTS pacing.
 * Pacing tuned for the chunked TTS engine: short sentences, clear speaker tags,
 * deliberate spelling lines so the TTS card slows down letter-by-letter.
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion3: ListeningPracticeSet[] = [
  // ====== SECTION 1 - Form Completion (everyday transactional) ======
  {
    id: "form-hotel-booking",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Hotel Booking Enquiry",
    titleVi: "Đặt phòng khách sạn",
    context: "You will hear a phone call between a guest and a hotel receptionist. Complete the booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi giữa khách và lễ tân khách sạn. Hoàn thành form đặt phòng.",
    transcript:
      "Receptionist: Good morning, Lakeside Hotel, Olivia speaking. How can I help?\n" +
      "Caller: Hello, I'd like to book a room for next weekend, please.\n" +
      "Receptionist: Certainly. May I take your full name?\n" +
      "Caller: Yes. It's Daniel Hughes. That's H-U-G-H-E-S.\n" +
      "Receptionist: Thank you. And which dates would you like to stay?\n" +
      "Caller: From the eighteenth to the twentieth of October - two nights.\n" +
      "Receptionist: Lovely. What type of room would you prefer - Standard, Deluxe or Suite?\n" +
      "Caller: I'll take the Deluxe, please.\n" +
      "Receptionist: Wonderful. The Deluxe with a lake view is one hundred and forty pounds per night.\n" +
      "Caller: That's fine.\n" +
      "Receptionist: Will you be having breakfast?\n" +
      "Caller: Yes please, the buffet option.\n" +
      "Receptionist: Could I take a contact number?\n" +
      "Caller: It's oh seven nine, double four, five six seven, two one nine.\n" +
      "Receptionist: And an email for confirmation?\n" +
      "Caller: Yes - d dot hughes at mailbox dot co dot uk.\n" +
      "Receptionist: Any special requests?\n" +
      "Caller: Could we have a quiet room, please?\n" +
      "Receptionist: Of course. We'll book you into the garden wing. Your confirmation number is B-K-four-seven-two-nine.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Hughes" },
      { type: "fill-in", prompt: "Check-in date: ___ October", answer: "18" },
      { type: "fill-in", prompt: "Number of nights: ___", answer: "2" },
      { type: "fill-in", prompt: "Room type: ___", answer: "Deluxe" },
      { type: "fill-in", prompt: "Price per night: £___", answer: "140" },
      { type: "fill-in", prompt: "Breakfast option: ___", answer: "buffet" },
      { type: "fill-in", prompt: "Contact number ends in: ___", answer: "219" },
      { type: "fill-in", prompt: "Email starts with: ___ dot hughes", answer: "d" },
      { type: "fill-in", prompt: "Special request: a ___ room", answer: "quiet" },
      { type: "fill-in", prompt: "Confirmation number: BK___", answer: "4729" },
    ],
  },

  // ====== SECTION 2 - Monologue / map labelling style (single speaker) ======
  {
    id: "monologue-museum-tour-2",
    section: 2,
    questionType: "Multiple Choice + Sentence Completion",
    questionTypeVi: "Trắc nghiệm + điền câu",
    title: "Welcome Talk at the City Museum",
    titleVi: "Bài giới thiệu tại bảo tàng thành phố",
    context: "You will hear a guide welcoming visitors to a city museum. Answer the questions.",
    contextVi: "Bạn sẽ nghe hướng dẫn viên giới thiệu bảo tàng. Trả lời câu hỏi.",
    transcript:
      "Good morning everyone and welcome to the Riverside City Museum.\n" +
      "My name is Patricia and I'll be your guide for the next hour.\n" +
      "The museum opened in nineteen eighty-six and now welcomes over half a million visitors each year.\n" +
      "Before we begin, just a few practical points.\n" +
      "The cloakroom is on your right as you came in - please leave any large bags there, free of charge.\n" +
      "Photography is allowed in all galleries except the Ancient Coins room on the second floor, where flash can damage the exhibits.\n" +
      "Our café is on the ground floor and serves hot meals until four p.m.\n" +
      "The gift shop closes at five thirty, half an hour before the museum itself.\n" +
      "Now, our tour today will focus on three highlights.\n" +
      "First, the Roman gallery, where you'll see a beautifully preserved mosaic discovered in nineteen ninety-two.\n" +
      "Second, the Industrial Revolution wing, with original steam engines that still run on special days.\n" +
      "Third, our newest exhibition - a collection of contemporary photography on loan from a private collector until December.\n" +
      "Please stay together as a group and keep your voices low in the quiet rooms.\n" +
      "And finally, do ask questions - I much prefer talking to listening to myself.",
    rate: 0.8,
    questions: [
      { type: "mcq", prompt: "The museum opened in:", options: ["1976", "1986", "1996"], answer: 1 },
      { type: "mcq", prompt: "Annual visitor numbers are about:", options: ["half a million", "one million", "two hundred thousand"], answer: 0 },
      { type: "fill-in", prompt: "Large bags should be left in the ___.", answer: "cloakroom" },
      { type: "fill-in", prompt: "Photography is NOT allowed in the ___ room.", answer: "Ancient Coins" },
      { type: "fill-in", prompt: "The café closes at ___ p.m.", answer: "4" },
      { type: "fill-in", prompt: "The gift shop closes at ___.", answer: "5:30" },
      { type: "fill-in", prompt: "The Roman mosaic was discovered in ___.", answer: "1992" },
      { type: "mcq", prompt: "The Industrial Revolution wing features:", options: ["paintings", "steam engines", "ceramic pots"], answer: 1 },
      { type: "fill-in", prompt: "The contemporary photography exhibition runs until ___.", answer: "December" },
      { type: "mcq", prompt: "Visitors are asked to:", options: ["walk silently throughout", "stay together as a group", "follow a printed map"], answer: 1 },
    ],
  },

  // ====== SECTION 3 - Academic discussion (2-3 speakers) ======
  {
    id: "discussion-research-project-2",
    section: 3,
    questionType: "Matching + Multiple Choice",
    questionTypeVi: "Nối + Trắc nghiệm",
    title: "Tutor Meeting About a Research Project",
    titleVi: "Buổi gặp giáo viên hướng dẫn về dự án nghiên cứu",
    context: "You will hear two students, Amy and Jake, discussing their joint research project with their tutor, Dr. Bennett.",
    contextVi: "Bạn sẽ nghe hai sinh viên Amy và Jake trao đổi với tiến sĩ Bennett về dự án nghiên cứu.",
    transcript:
      "Dr. Bennett: So, Amy, Jake, how is the project going?\n" +
      "Amy: Quite well overall, but we're behind on the data collection.\n" +
      "Jake: We managed to interview eight participants last week, but we're aiming for twenty.\n" +
      "Dr. Bennett: That's a reasonable target. What's slowing you down?\n" +
      "Amy: Honestly, recruitment. Many people simply don't reply to our emails.\n" +
      "Dr. Bennett: Have you tried using the student volunteer pool?\n" +
      "Jake: Yes, but most of them are first-years and don't match our criteria.\n" +
      "Dr. Bennett: I see. What about offering a small incentive - perhaps a coffee voucher?\n" +
      "Amy: That's a great idea. We could fund it from the small research grant.\n" +
      "Jake: I was a bit worried about whether it counts as bias.\n" +
      "Dr. Bennett: It's perfectly acceptable as long as you mention it in your ethics statement.\n" +
      "Amy: Good. We also need help with the interview transcripts. They are taking forever.\n" +
      "Dr. Bennett: The library has new transcription software you can use for free.\n" +
      "Jake: Brilliant. And what about the literature review? We feel it's too long.\n" +
      "Dr. Bennett: Aim for two thousand words. Focus on the last five years of research.\n" +
      "Amy: Right. And the deadline for the first draft?\n" +
      "Dr. Bennett: Friday the twentieth of June. Send it by midday.\n" +
      "Jake: Thank you, that's really helpful.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Number of participants already interviewed: ___", answer: "8" },
      { type: "fill-in", prompt: "Target number of participants: ___", answer: "20" },
      { type: "mcq", prompt: "The main problem with recruitment is:", options: ["the topic is unpopular", "people don't reply to emails", "the interview is too long"], answer: 1 },
      { type: "mcq", prompt: "Most student volunteers don't match the criteria because they are:", options: ["studying part-time", "first-year students", "international students"], answer: 1 },
      { type: "fill-in", prompt: "Suggested incentive: a ___ voucher", answer: "coffee" },
      { type: "fill-in", prompt: "The incentive must be mentioned in the ___ statement.", answer: "ethics" },
      { type: "fill-in", prompt: "The library offers free ___ software.", answer: "transcription" },
      { type: "fill-in", prompt: "Recommended literature review length: ___ words", answer: "2000" },
      { type: "fill-in", prompt: "Literature review should focus on the last ___ years.", answer: "5" },
      { type: "fill-in", prompt: "First-draft deadline: Friday ___ June", answer: "20" },
    ],
  },

  // ====== SECTION 4 - Academic lecture (single speaker, harder) ======
  {
    id: "lecture-urban-trees-2",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Điền ghi chú học thuật",
    title: "The Role of Urban Trees in Modern Cities",
    titleVi: "Vai trò của cây xanh đô thị",
    context: "You will hear part of a university lecture about urban trees. Complete the notes. Write NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe bài giảng đại học về cây xanh đô thị. Điền vào ghi chú.",
    transcript:
      "Good afternoon. Today's lecture is about the surprising importance of trees in our cities.\n" +
      "Urban trees are often dismissed as decorative, but research now shows they deliver substantial environmental and economic benefits.\n" +
      "Let me give you a few headline figures.\n" +
      "First, cooling. A single mature tree can lower the surrounding air temperature by up to two degrees Celsius on a hot day.\n" +
      "In cities prone to heatwaves, this dramatically reduces demand for air conditioning, cutting household energy bills by roughly fifteen percent.\n" +
      "Second, air quality. Trees absorb pollutants such as nitrogen dioxide and small particulate matter.\n" +
      "A recent study in London estimated that the city's trees remove about two thousand tonnes of particulates each year.\n" +
      "Third, mental health. People living within three hundred metres of green spaces report significantly lower levels of anxiety.\n" +
      "There is also a measurable effect on property prices: homes near mature trees sell for around seven percent more.\n" +
      "However, there are challenges. The most pressing is water. Newly planted trees fail at high rates because they are not watered during the first two summers.\n" +
      "Soil compaction is another threat - heavy pavement reduces root oxygen.\n" +
      "Cities such as Melbourne now use special structural soil under footpaths to give roots room to breathe.\n" +
      "Looking ahead, the most ambitious target comes from Paris, which has pledged to plant one hundred and seventy thousand new trees by twenty thirty.\n" +
      "To conclude, urban trees are not a luxury - they are critical infrastructure, and they should be planned and funded accordingly.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Maximum cooling effect of a mature tree: ___ °C", answer: "2" },
      { type: "fill-in", prompt: "Reduction in household energy bills: about ___ %", answer: "15" },
      { type: "fill-in", prompt: "Trees absorb pollutants such as nitrogen dioxide and ___ matter.", answer: "particulate" },
      { type: "fill-in", prompt: "Particulates removed annually in London: about ___ tonnes", answer: "2000" },
      { type: "fill-in", prompt: "Distance to green space linked to lower anxiety: ___ metres", answer: "300" },
      { type: "fill-in", prompt: "Property price premium near mature trees: about ___ %", answer: "7" },
      { type: "fill-in", prompt: "Main reason newly planted trees fail: lack of ___", answer: "water" },
      { type: "fill-in", prompt: "Another threat to roots: soil ___", answer: "compaction" },
      { type: "fill-in", prompt: "Melbourne uses special ___ soil under footpaths.", answer: "structural" },
      { type: "fill-in", prompt: "Paris pledge: ___ new trees by 2030", answer: "170000" },
    ],
  },
];
