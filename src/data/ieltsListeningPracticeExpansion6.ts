/**
 * @file ieltsListeningPracticeExpansion6.ts
 * @description Wave 6 - 4 new IELTS Listening practice sets (one per
 * official section). Every answer has been verified line-by-line against
 * the transcript. MCQ `answer` is the index into `options[]`; matching
 * `answer` is the letter key declared in `matchingOptions[]`.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion6: ListeningPracticeSet[] = [
  // ============================================================
  // Section 1 - Form Completion (Weekend cooking class)
  // ============================================================
  {
    id: "form-cooking-class",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Booking a Weekend Cooking Class",
    titleVi: "Đăng ký lớp nấu ăn cuối tuần",
    context: "A customer phones a cooking school to book a weekend class. Complete the booking form with NO MORE THAN TWO WORDS AND/OR A NUMBER.",
    contextVi: "Một khách gọi điện đặt lớp nấu ăn cuối tuần. Điền form với không quá hai từ và/hoặc một số.",
    transcript:
      "Receptionist: Good afternoon, Sunshine Cooking School. How may I help?\n" +
      "Caller: Hi, I'd like to book a class for this Saturday.\n" +
      "Receptionist: Of course. May I have your full name, please?\n" +
      "Caller: Yes, it's Daniel Foster - F-O-S-T-E-R.\n" +
      "Receptionist: Thank you. We're running three styles on Saturday - Italian, Thai and French. Which would you like?\n" +
      "Caller: I'll go for Italian, please.\n" +
      "Receptionist: Italian on Saturday the fourteenth of June, then. The class runs for three hours, from ten in the morning until one.\n" +
      "Caller: Perfect. And the cost?\n" +
      "Receptionist: Forty-five pounds per person, including all ingredients.\n" +
      "Caller: Do I need to bring anything?\n" +
      "Receptionist: Just an apron. We provide everything else.\n" +
      "Caller: And where exactly is the school?\n" +
      "Receptionist: We're on Bridge Street, about two minutes from the public library - there's a small car park behind the building.\n" +
      "Caller: Got it. A friend mentioned you have a discount code.\n" +
      "Receptionist: Yes - if you book this week, the code WEEKEND10 gives you ten per cent off.\n" +
      "Caller: Brilliant. One more thing - I have a nut allergy. Is that a problem?\n" +
      "Receptionist: Not at all. We'll prepare a nut-free station for you.\n" +
      "Caller: And how many people will be in the class?\n" +
      "Receptionist: We cap each class at six participants.",
    rate: 0.85,
    formTitle: "SUNSHINE COOKING SCHOOL - BOOKING FORM",
    formLayout:
      "STUDENT\n" +
      "  First name:       Daniel\n" +
      "  Surname:          {1}\n" +
      "\n" +
      "CLASS DETAILS\n" +
      "  Cooking style:    {2}\n" +
      "  Date:             Saturday {3} June\n" +
      "  Duration:         {4} hours (10 a.m. - 1 p.m.)\n" +
      "  Cost per person:  £ {5}\n" +
      "  Bring:            an {6}\n" +
      "  Class capacity:   {10} participants\n" +
      "\n" +
      "LOCATION\n" +
      "  Bridge Street - 2 min from public {7}\n" +
      "\n" +
      "DISCOUNT & ALLERGIES\n" +
      "  Discount code:    {8} (10% off)\n" +
      "  Allergy noted:    {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Foster" },
      { type: "fill-in", prompt: "Cooking style chosen: ___", answer: "Italian" },
      { type: "fill-in", prompt: "Class date: Saturday ___ June", answer: "14" },
      { type: "fill-in", prompt: "Class duration: ___ hours", answer: "3" },
      { type: "fill-in", prompt: "Cost per person: £___", answer: "45" },
      { type: "fill-in", prompt: "Student must bring an ___", answer: "apron" },
      { type: "fill-in", prompt: "School is about 2 minutes from the public ___", answer: "library" },
      { type: "fill-in", prompt: "Discount code (10% off): ___", answer: "WEEKEND10" },
      { type: "fill-in", prompt: "Allergy noted: ___", answer: "nut" },
      { type: "fill-in", prompt: "Maximum number of participants: ___", answer: "6" },
    ],
  },

  // ============================================================
  // Section 2 - Multiple Choice (Art gallery introduction)
  // ============================================================
  {
    id: "monologue-art-gallery-v2",
    section: 2,
    questionType: "Multiple Choice",
    questionTypeVi: "Chọn đáp án đúng",
    title: "Welcome to the Westbrook Art Gallery",
    titleVi: "Giới thiệu phòng tranh Westbrook",
    context: "A guide welcomes visitors to an art gallery. Choose the correct answer for each question.",
    contextVi: "Một hướng dẫn viên giới thiệu phòng tranh. Chọn đáp án đúng.",
    transcript:
      "Priya: Welcome to the Westbrook Art Gallery. My name is Priya, and I'll be looking after the gallery this afternoon.\n" +
      "The building you're standing in was opened in nineteen ninety-five, although the collection itself dates back more than two hundred years.\n" +
      "Our current exhibition, on the first floor, is called 'Light and Shadow' and focuses entirely on modern photography from Southeast Asia.\n" +
      "A quick note on the rules: photographs are welcome in all rooms, but please keep your flash turned off - flash can damage the older paintings on the ground floor.\n" +
      "The café in the courtyard is open from ten until five today, and there's a small terrace if the weather stays dry.\n" +
      "If you'd like more detail, audio guides are available at reception for three pounds. They come in English, French and Mandarin.\n" +
      "Finally, please remember: our free family workshop runs every Sunday at two o'clock, not on weekdays. Children must be accompanied by an adult.",
    rate: 0.85,
    questions: [
      { type: "mcq", prompt: "The gallery building was opened in:", options: ["1885", "1985", "1995", "2005"], answer: 2 },
      { type: "mcq", prompt: "The current exhibition focuses on:", options: ["sculpture", "modern photography", "oil paintings", "ceramics"], answer: 1 },
      { type: "mcq", prompt: "The exhibition title is:", options: ["War and Peace", "Light and Shadow", "Faces of Asia", "Sea and Sky"], answer: 1 },
      { type: "mcq", prompt: "Visitors may take photos but must:", options: ["pay extra", "keep flash off", "stay on ground floor", "ask the guide first"], answer: 1 },
      { type: "mcq", prompt: "The café is open today until:", options: ["3 pm", "4 pm", "5 pm", "6 pm"], answer: 2 },
      { type: "mcq", prompt: "Audio guides at reception cost:", options: ["free", "£2", "£3", "£5"], answer: 2 },
      { type: "mcq", prompt: "Family workshops are held on:", options: ["Saturdays", "Sundays", "weekdays", "Fridays"], answer: 1 },
    ],
  },

  // ============================================================
  // Section 3 - Matching (Marketing pitch roles)
  // ============================================================
  {
    id: "discussion-marketing-pitch",
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Ghép câu - chọn chữ cái",
    title: "Tutorial: Splitting Roles for a Marketing Pitch",
    titleVi: "Tutorial: Chia vai trò cho buổi pitch marketing",
    context: "Three students plan a Friday marketing pitch. Match each task to the right student (A = Maya, B = Tom, C = Sara).",
    contextVi: "Ba sinh viên chuẩn bị buổi pitch marketing. Ghép nhiệm vụ với sinh viên (A = Maya, B = Tom, C = Sara).",
    matchingOptions: [
      { letter: "A", text: "Maya" },
      { letter: "B", text: "Tom" },
      { letter: "C", text: "Sara" },
    ],
    transcript:
      "Tutor: Right, team - the pitch is on Friday. Let's lock the roles.\n" +
      "Maya: I'll do the slide design - I've already drafted a colour scheme.\n" +
      "Tom: Great. Then I'll handle the competitor analysis. I still have access to last year's industry report.\n" +
      "Sara: And I can write the consumer survey. I want to interview about thirty students on campus.\n" +
      "Tutor: Excellent. Who is preparing the budget table?\n" +
      "Tom: Maya is much better with spreadsheets, honestly.\n" +
      "Maya: Fine, I'll add it.\n" +
      "Tutor: And the live demo on the day?\n" +
      "Sara: I'd like to lead the demo - public speaking is the part I most want to practise.\n" +
      "Tutor: Last one - who'll write the executive summary handout?\n" +
      "Tom: I'll do that - it follows naturally from the competitor research.",
    rate: 0.85,
    questions: [
      { type: "matching", prompt: "Designing the slides: ___", answer: "A" },
      { type: "matching", prompt: "Competitor analysis: ___", answer: "B" },
      { type: "matching", prompt: "Writing the consumer survey: ___", answer: "C" },
      { type: "matching", prompt: "Preparing the budget table: ___", answer: "A" },
      { type: "matching", prompt: "Leading the live demo: ___", answer: "C" },
      { type: "matching", prompt: "Writing the executive summary: ___", answer: "B" },
    ],
  },

  // ============================================================
  // Section 4 - Sentence Completion (Microplastics lecture)
  // ============================================================
  {
    id: "lecture-microplastics",
    section: 4,
    questionType: "Sentence Completion",
    questionTypeVi: "Hoàn thành câu",
    title: "Lecture: Microplastics in the Ocean",
    titleVi: "Bài giảng: Vi nhựa trong đại dương",
    context: "A lecturer explains the microplastics problem. Complete each sentence with NO MORE THAN TWO WORDS or a number.",
    contextVi: "Giảng viên trình bày vấn đề vi nhựa. Hoàn thành mỗi câu với không quá hai từ hoặc một số.",
    transcript:
      "Lecturer: Good afternoon. Today's lecture is on microplastics - that is, plastic fragments smaller than five millimetres in length.\n" +
      "These particles enter the ocean from two main sources. The first is the gradual breakdown of larger plastic waste. The second, perhaps surprisingly, is synthetic clothing, which sheds tiny fibres every time it is washed.\n" +
      "Research published in twenty twenty-two estimated that there are now around five trillion plastic particles floating on the surface of the world's oceans.\n" +
      "Microplastics enter the food chain through plankton, which mistake the particles for food. From there they move up to fish and, eventually, to humans.\n" +
      "A study in Norway found microplastics in eighty per cent of the seabirds examined.\n" +
      "The good news is that solutions exist. Simple washing-machine filters can capture up to ninety per cent of clothing fibres before they reach the sewage system.\n" +
      "At the policy level, more than sixty countries have now banned single-use plastic bags, although enforcement remains uneven.\n" +
      "The next decade will test whether these efforts can outpace the scale of the problem.",
    rate: 0.85,
    questions: [
      { type: "fill-in", prompt: "Microplastics are smaller than ___ millimetres.", answer: "5" },
      { type: "fill-in", prompt: "Synthetic ___ sheds fibres every wash.", answer: "clothing" },
      { type: "fill-in", prompt: "A 2022 study estimated ___ trillion particles on the ocean surface.", answer: "5" },
      { type: "fill-in", prompt: "Microplastics enter the food chain through ___.", answer: "plankton" },
      { type: "fill-in", prompt: "In Norway, ___ per cent of seabirds contained microplastics.", answer: "80" },
      { type: "fill-in", prompt: "Washing-machine ___ can stop up to 90% of fibres.", answer: "filters" },
      { type: "fill-in", prompt: "More than ___ countries have banned single-use plastic bags.", answer: "60" },
      { type: "fill-in", prompt: "The next ___ will test if solutions outpace the problem.", answer: "decade" },
    ],
  },
];
