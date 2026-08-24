/**
 * @file ieltsListeningPracticeExpansion7.ts
 * @description Wave 7 - 4 fresh IELTS Listening practice sets (one per
 * official section). All IDs are unique across expansions 1-6. Answers
 * verified line-by-line against transcript. Pacing tuned for the chunked
 * TTS engine: short sentences, clear speaker tags, natural rhythm.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion7: ListeningPracticeSet[] = [
  // ============================================================
  // Section 1 - Form Completion (Photography workshop booking)
  // ============================================================
  {
    id: "form-photography-workshop",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Booking a Weekend Photography Workshop",
    titleVi: "Đăng ký workshop nhiếp ảnh cuối tuần",
    context: "A caller books a photography workshop. Complete the booking form with NO MORE THAN TWO WORDS AND/OR A NUMBER.",
    contextVi: "Một người gọi đặt workshop nhiếp ảnh. Điền form với không quá hai từ và/hoặc một số.",
    transcript:
      "Receptionist: Good morning, Northlight Photography, this is Sophie speaking.\n" +
      "Caller: Hi, I saw your weekend workshop advertised online. I'd like to book a place.\n" +
      "Receptionist: Lovely. Could I take your full name, please?\n" +
      "Caller: Yes. It's Andrew Blackwood - B-L-A-C-K-W-O-O-D.\n" +
      "Receptionist: Thank you. And which workshop - Portrait, Landscape or Street?\n" +
      "Caller: Landscape, please.\n" +
      "Receptionist: The next Landscape session is Sunday the twelfth of April, from nine in the morning until four in the afternoon.\n" +
      "Caller: That's fine. What's the fee?\n" +
      "Receptionist: The full-day workshop is eighty pounds. That includes lunch and a printed handbook.\n" +
      "Caller: Do I need to bring my own camera?\n" +
      "Receptionist: Ideally yes, but we can lend you one for a small deposit. Most students bring a tripod as well.\n" +
      "Caller: Where does the group meet?\n" +
      "Receptionist: We meet at the entrance of Ashford Park, near the west gate.\n" +
      "Caller: Great. How can I pay?\n" +
      "Receptionist: A bank transfer is easiest. And your mobile number, in case the weather changes?\n" +
      "Caller: It's oh seven eight two, four five six, one nine three four.\n" +
      "Receptionist: Perfect. You'll receive a confirmation email within twenty-four hours.",
    rate: 0.9,
    formTitle: "NORTHLIGHT PHOTOGRAPHY - WORKSHOP BOOKING",
    formLayout:
      "STAFF HANDLING CALL\n" +
      "  Receptionist:      {1}\n" +
      "\n" +
      "CUSTOMER\n" +
      "  Full name:         Andrew {2}\n" +
      "  Mobile number:     07824 456 {10}\n" +
      "\n" +
      "WORKSHOP\n" +
      "  Type:              {3}\n" +
      "  Date:              Sunday {4} April\n" +
      "  Finish time:       {5} pm\n" +
      "  Fee:               £ {6}\n" +
      "  Included:          lunch and printed {7}\n" +
      "  Bring:             own camera + a {8}\n" +
      "  Meeting point:     {9} gate of Ashford Park",
    questions: [
      { type: "fill-in", prompt: "Receptionist's name: ___", answer: "Sophie" },
      { type: "fill-in", prompt: "Surname: ___", answer: "Blackwood" },
      { type: "fill-in", prompt: "Workshop type: ___", answer: "Landscape" },
      { type: "fill-in", prompt: "Date: Sunday ___ April", answer: "12" },
      { type: "fill-in", prompt: "Finish time: ___ pm", answer: "4" },
      { type: "fill-in", prompt: "Fee: £___", answer: "80" },
      { type: "fill-in", prompt: "Included: lunch and printed ___", answer: "handbook" },
      { type: "fill-in", prompt: "Recommended item to bring: ___", answer: "tripod" },
      { type: "fill-in", prompt: "Meeting point: ___ gate of Ashford Park", answer: "west" },
      { type: "fill-in", prompt: "Mobile number ending: 07824 456 ___", answer: "1934" },
    ],
  },

  // ============================================================
  // Section 2 - Multiple Choice (Farmers' market briefing)
  // ============================================================
  {
    id: "monologue-farmers-market",
    section: 2,
    questionType: "Multiple Choice",
    questionTypeVi: "Chọn đáp án đúng",
    title: "Farmers' Market Visitor Briefing",
    titleVi: "Giới thiệu chợ nông sản cho khách",
    context: "A market coordinator welcomes weekend visitors to a farmers' market. Choose the correct answer for each question.",
    contextVi: "Điều phối viên chợ giới thiệu cho khách cuối tuần. Chọn đáp án đúng.",
    transcript:
      "Coordinator: Good morning, everyone, and welcome to Millfield Farmers' Market. My name is Rachel and I coordinate the weekend stalls.\n" +
      "First, a quick history. Our market opened in two thousand and eight with just twelve stalls. Today we host over sixty local producers every Saturday.\n" +
      "The market runs from eight in the morning until two in the afternoon. Please note that hot food stalls close half an hour earlier, at one thirty, to allow for cleaning.\n" +
      "You'll find the fresh produce and cheese stalls along the main aisle. The bakery corner is at the far end, near the old clock tower.\n" +
      "If you're travelling with children, our free family activity today is a fruit-tasting session in the yellow tent, starting at eleven.\n" +
      "Parking is limited on the square itself, so we recommend the multi-storey car park behind the library, which is free at weekends.\n" +
      "Finally, all our vendors accept cards, but a few of the smaller producers still prefer cash for orders under five pounds.\n" +
      "A word on waste: every stall here now uses compostable packaging.\n" +
      "You'll find the flower stall right beside the main entrance, so it's easy to find on the way out.\n" +
      "If it rains heavily, the whole market moves into the covered hall next door.\n" +
      "Coordinator: And traders who would like a stall next season should email the market office.\n",
    rate: 0.9,
    questions: [
      {
        type: "mcq",
        prompt: "How many stalls did the market open with in 2008?",
        options: ["Twelve", "Ten", "Twenty", "Sixty"],
        answer: 0,
      },
      {
        type: "mcq",
        prompt: "What time do hot food stalls close?",
        options: ["1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm"],
        answer: 1,
      },
      {
        type: "mcq",
        prompt: "The bakery corner is located near:",
        options: ["The main gate", "The yellow tent", "The old clock tower", "The library"],
        answer: 2,
      },
      {
        type: "mcq",
        prompt: "The free family activity today is a:",
        options: ["Cooking demonstration", "Craft workshop", "Farm-animal show", "Fruit-tasting session"],
        answer: 3,
      },
      {
        type: "mcq",
        prompt: "The recommended weekend parking is:",
        options: ["Behind the library", "On the square", "Next to the yellow tent", "Beside the clock tower"],
        answer: 0,
      },
      {
        type: "mcq",
        prompt: "Some smaller producers prefer cash for orders under:",
        options: ["£2", "£5", "£10", "£20"],
        answer: 1,
      },
      { type: "mcq", prompt: "All the stalls now use packaging that is:", options: ["recycled", "reusable", "compostable", "paper only"], answer: 2 },
      { type: "mcq", prompt: "The flower stall is beside the:", options: ["clock tower", "yellow tent", "library", "main entrance"], answer: 3 },
      { type: "mcq", prompt: "In heavy rain the market moves into:", options: ["the covered hall", "the library", "the car park", "the yellow tent"], answer: 0 },
      { type: "mcq", prompt: "New traders should contact the market office:", options: ["in person", "by email", "by phone", "through a form"], answer: 1 },
    ],
  },

  // ============================================================
  // Section 3 - Matching (Tutor + 2 students on a group video project)
  // ============================================================
  {
    id: "discussion-video-project",
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Ghép câu - chọn chữ cái",
    title: "Planning a Group Documentary Video",
    titleVi: "Lên kế hoạch làm phim tài liệu nhóm",
    context: "A tutor and two students divide roles for a documentary video project. Match each task to the right person (A = Emma, B = Josh, C = Tutor).",
    contextVi: "Giảng viên và hai sinh viên phân vai làm phim tài liệu. Ghép mỗi phần việc với người phụ trách (A = Emma, B = Josh, C = Giảng viên).",
    matchingOptions: [
      { letter: "A", text: "Emma" },
      { letter: "B", text: "Josh" },
      { letter: "C", text: "Tutor" },
    ],
    transcript:
      "Tutor: Right, let's finalise who does what for the documentary.\n" +
      "Emma: I'm happy to write the script. I've already drafted an outline over the weekend.\n" +
      "Josh: That works. I'll take the filming - I've got a good camera and I know the location.\n" +
      "Tutor: Excellent. And who's contacting the two interviewees?\n" +
      "Emma: I can do that. I already know one of them from my part-time job.\n" +
      "Josh: I'll take care of the sound recording during the interviews.\n" +
      "Tutor: Good. Now, the editing is the most technical part. I'll handle that myself, since we're on a tight deadline.\n" +
      "Emma: Great. Who writes the final reflective report for the module?\n" +
      "Josh: I'd rather do that than the presentation. My writing is stronger than my speaking.\n" +
      "Emma: Perfect - then I'll deliver the class presentation next Friday.\n" +
      "Tutor: Sounds balanced. I'll also provide the background music tracks from the university library.\n" +
      "Emma: I'll also write the subtitles, so the film is accessible.\n" +
      "Tutor: And I'll book the editing suite for you both.\n",
    rate: 0.9,
    questions: [
      { type: "matching", prompt: "Writing the script: ___", answer: "A" },
      { type: "matching", prompt: "Filming the footage: ___", answer: "B" },
      { type: "matching", prompt: "Contacting the interviewees: ___", answer: "A" },
      { type: "matching", prompt: "Recording the sound: ___", answer: "B" },
      { type: "matching", prompt: "Editing the final video: ___", answer: "C" },
      { type: "matching", prompt: "Writing the reflective report: ___", answer: "B" },
      { type: "matching", prompt: "Delivering the class presentation: ___", answer: "A" },
      { type: "matching", prompt: "Providing background music tracks: ___", answer: "C" },
      { type: "matching", prompt: "Writing the subtitles: ___", answer: "A" },
      { type: "matching", prompt: "Booking the editing suite: ___", answer: "C" },
    ],
  },

  // ============================================================
  // Section 4 - Sentence Completion (Lecture on coral reefs)
  // ============================================================
  {
    id: "lecture-coral-reefs",
    section: 4,
    questionType: "Sentence Completion",
    questionTypeVi: "Hoàn thành câu",
    title: "Lecture: Why Coral Reefs Matter",
    titleVi: "Bài giảng: Vì sao rạn san hô quan trọng",
    context: "A marine-biology lecturer explains the importance of coral reefs. Complete each sentence with NO MORE THAN TWO WORDS or a number.",
    contextVi: "Giảng viên sinh học biển giải thích tầm quan trọng của rạn san hô. Hoàn thành mỗi câu với không quá hai từ hoặc một số.",
    transcript:
      "Lecturer: Today I'd like to look at why coral reefs are one of the most valuable ecosystems on the planet.\n" +
      "First, biodiversity. Although coral reefs cover less than one per cent of the ocean floor, they support around a quarter of all known marine species. That figure alone should make us take their protection seriously.\n" +
      "Second, coastal defence. A healthy reef acts as a natural breakwater, reducing wave energy reaching the shore by up to ninety-seven per cent during storms. Communities living behind intact reefs suffer far less flooding.\n" +
      "Third, food security. Reef fisheries provide the main source of protein for roughly half a billion people, most of them in developing countries.\n" +
      "Fourth, medicine. Compounds first isolated from reef organisms are now used in treatments for cancer, arthritis and, more recently, certain viral infections.\n" +
      "Finally, the economic value. Global reef tourism generates an estimated thirty-six billion dollars every year, supporting jobs in more than seventy countries.\n" +
      "The bad news, of course, is that half of the world's shallow reefs have already been lost since nineteen fifty, mainly because of rising sea temperatures.\n" +
      "Reefs also support tourism, and in some island states reef tourism provides most of the national income.\n" +
      "Lecturer: Finally, restoration projects now grow young corals in underwater nurseries before replanting them.\n",
    rate: 0.9,
    questions: [
      { type: "fill-in", prompt: "Coral reefs cover less than ___ per cent of the ocean floor.", answer: "one" },
      { type: "fill-in", prompt: "They support around a ___ of all known marine species.", answer: "quarter" },
      { type: "fill-in", prompt: "A healthy reef can reduce wave energy by up to ___ per cent.", answer: "97" },
      { type: "fill-in", prompt: "Reef fisheries provide protein for around half a ___ people.", answer: "billion" },
      { type: "fill-in", prompt: "Reef-derived compounds are used to treat cancer, arthritis and viral ___.", answer: "infections" },
      { type: "fill-in", prompt: "Global reef tourism generates about $___ billion each year.", answer: "36" },
      { type: "fill-in", prompt: "Half of shallow reefs have been lost since ___.", answer: "1950" },
      { type: "fill-in", prompt: "The main cause of reef loss is rising sea ___.", answer: "temperatures" },
      { type: "fill-in", prompt: "In some island states reef tourism provides most of the national ___.", answer: "income", maxWords: 1 },
      { type: "fill-in", prompt: "Young corals are grown in underwater ___ before replanting.", answer: "nurseries", maxWords: 1 },
    ],
  },
];
