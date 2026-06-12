/**
 * @file ieltsListeningPracticeExpansion5.ts
 * @description Wave 5 — 4 new IELTS Listening practice sets (one per
 * official section). Scripts use natural speaker tags + short sentences
 * for stable TTS pacing. Answers verified against transcripts.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion5: ListeningPracticeSet[] = [
  // ============================================================
  // Section 1 — Form Completion (Library membership)
  // ============================================================
  {
    id: "form-library-membership",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Joining the City Public Library",
    titleVi: "Đăng ký thẻ thư viện công cộng",
    context: "A new resident phones the city library to register for membership. Complete the registration form.",
    contextVi: "Một cư dân mới gọi điện đăng ký thẻ thư viện. Điền vào form đăng ký.",
    transcript:
      "Librarian: Good morning, Greenfield City Library. How can I help?\n" +
      "Caller: Hi, I've just moved here and I'd like to register for a library card.\n" +
      "Librarian: Of course. Could I have your full name, please?\n" +
      "Caller: Yes. It's Sophia Bennett. That's B-E-N-N-E-T-T.\n" +
      "Librarian: Thank you. And your date of birth?\n" +
      "Caller: The twelfth of August, nineteen ninety-eight.\n" +
      "Librarian: We offer three membership types — Basic, Standard and Premium. Which one would you like?\n" +
      "Caller: I'll take the Standard one, please. What does it include?\n" +
      "Librarian: Standard gives you up to eight books at a time, plus free access to our online journal database. The annual fee is just fifteen pounds.\n" +
      "Caller: That sounds good.\n" +
      "Librarian: Could I have your current address?\n" +
      "Caller: It's forty-seven Oakwood Road, Greenfield. The postcode is G-F-three, four-N-Y.\n" +
      "Librarian: And a contact number?\n" +
      "Caller: My mobile is 0-7-7-1-2, double-four, eight-five-nine.\n" +
      "Librarian: Lovely. Finally, would you like to opt in to our weekly newsletter?\n" +
      "Caller: Yes please — and could you also book me onto the Saturday morning book club?",
    rate: 0.85,
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Bennett" },
      { type: "fill-in", prompt: "Date of birth: 12 August ___", answer: "1998" },
      { type: "fill-in", prompt: "Membership type chosen: ___", answer: "Standard" },
      { type: "fill-in", prompt: "Maximum books at one time: ___", answer: "8" },
      { type: "fill-in", prompt: "Annual fee: £___", answer: "15" },
      { type: "fill-in", prompt: "Address: 47 ___ Road, Greenfield", answer: "Oakwood" },
      { type: "fill-in", prompt: "Postcode: ___", answer: "GF3 4NY" },
      { type: "fill-in", prompt: "Mobile: 07712 ___ 859", answer: "44" },
      { type: "fill-in", prompt: "Caller wants to join the Saturday morning ___", answer: "book club" },
      { type: "fill-in", prompt: "Standard plan includes access to the online ___ database", answer: "journal" },
    ],
  },

  // ============================================================
  // Section 2 — Multiple Choice (Community garden tour)
  // ============================================================
  {
    id: "monologue-community-garden",
    section: 2,
    questionType: "Multiple Choice",
    questionTypeVi: "Chọn đáp án đúng",
    title: "Welcome Talk at the Community Garden",
    titleVi: "Giới thiệu vườn cộng đồng",
    context: "A volunteer welcomes visitors to a community garden open day. Choose the correct answer for each question.",
    contextVi: "Một tình nguyện viên đón khách tham quan vườn cộng đồng. Chọn đáp án đúng.",
    transcript:
      "Hello everyone, and welcome to the Riverside Community Garden. My name's Aiden, and I'll be your guide for the next forty-five minutes.\n" +
      "A quick bit of history: the garden was opened in two thousand and eleven on land that was once a derelict car park. Today it's run entirely by local volunteers.\n" +
      "Before we start the tour, a few practical points. Please feel free to take photographs anywhere except inside the greenhouse — the strong light from camera flashes can damage our young seedlings.\n" +
      "The toilets are at the back of the visitor centre, just past the small café.\n" +
      "Speaking of the café — it's open until four today, and all the cakes are baked by our volunteers using ingredients grown right here.\n" +
      "If you'd like to take part in something hands-on, we run a free weekly workshop. This week's topic is composting, and it starts at two o'clock in the main shed.\n" +
      "Finally, every visitor today is welcome to take home a small bag of free herbs from the basket near the exit — but please don't pick anything yourself from the beds.",
    rate: 0.85,
    questions: [
      { type: "mcq", prompt: "When did the community garden open?", options: ["2001", "2009", "2011", "2015"], answer: 2 },
      { type: "mcq", prompt: "What was the site BEFORE it became a garden?", options: ["A school", "A car park", "A factory", "A market"], answer: 1 },
      { type: "mcq", prompt: "Photography is NOT allowed inside the:", options: ["café", "main shed", "greenhouse", "visitor centre"], answer: 2 },
      { type: "mcq", prompt: "The café closes today at:", options: ["3 pm", "4 pm", "5 pm", "6 pm"], answer: 1 },
      { type: "mcq", prompt: "This week's free workshop topic is:", options: ["pest control", "watering", "pruning", "composting"], answer: 3 },
      { type: "mcq", prompt: "Visitors may take home a free bag of:", options: ["seeds", "herbs", "flowers", "vegetables"], answer: 1 },
    ],
  },

  // ============================================================
  // Section 3 — Matching (project roles)
  // ============================================================
  {
    id: "discussion-history-project",
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Ghép câu - chọn chữ cái",
    title: "Tutorial: Planning a Local History Project",
    titleVi: "Tutorial: Lên kế hoạch dự án lịch sử địa phương",
    context: "Three students plan tasks for a history project. Match each task to the right student (A = Liam, B = Hana, C = Oliver).",
    contextVi: "Ba sinh viên phân chia công việc cho dự án lịch sử. Ghép nhiệm vụ với sinh viên (A = Liam, B = Hana, C = Oliver).",
    matchingOptions: [
      { letter: "A", text: "Liam" },
      { letter: "B", text: "Hana" },
      { letter: "C", text: "Oliver" },
    ],
    transcript:
      "Tutor: So, you've got three weeks. Let's confirm who's doing what.\n" +
      "Liam: I'm happy to interview the elderly residents at the community centre — I've already spoken to the manager.\n" +
      "Hana: That works. I'll take the archive research at the city library. I'm comfortable with the digital catalogue.\n" +
      "Oliver: I'll handle the photograph collection — my uncle has boxes of old family pictures from the nineteen-sixties.\n" +
      "Tutor: Good. And who is making the final timeline poster?\n" +
      "Hana: On reflection, I think Oliver should — his design skills are the strongest.\n" +
      "Oliver: Fine, but only if Liam writes the short introduction paragraph for the exhibition.\n" +
      "Liam: Sure, no problem.\n" +
      "Tutor: Excellent. One last thing — who is doing the audio recordings for the interactive display?\n" +
      "Hana: I'd like to do that, actually. I want more practice with the editing software.",
    rate: 0.85,
    questions: [
      { type: "matching", prompt: "Interviewing elderly residents: ___", answer: "A" },
      { type: "matching", prompt: "Archive research at the city library: ___", answer: "B" },
      { type: "matching", prompt: "Collecting old photographs: ___", answer: "C" },
      { type: "matching", prompt: "Designing the timeline poster: ___", answer: "C" },
      { type: "matching", prompt: "Writing the exhibition introduction: ___", answer: "A" },
      { type: "matching", prompt: "Recording and editing audio: ___", answer: "B" },
    ],
  },

  // ============================================================
  // Section 4 — Sentence Completion (Bee decline lecture)
  // ============================================================
  {
    id: "lecture-bees-decline",
    section: 4,
    questionType: "Sentence Completion",
    questionTypeVi: "Hoàn thành câu",
    title: "Lecture: Why Bee Populations Are Falling",
    titleVi: "Bài giảng: Vì sao số lượng ong đang giảm",
    context: "A university lecturer discusses the global decline of bee populations. Complete each sentence with NO MORE THAN TWO WORDS or a number.",
    contextVi: "Giảng viên nói về sự suy giảm ong toàn cầu. Hoàn thành mỗi câu với không quá hai từ hoặc một số.",
    transcript:
      "Today I'd like to talk about one of the most serious environmental problems of our time — the rapid decline of bee populations across the globe.\n" +
      "Let me start with some scale. Bees are responsible for pollinating roughly one third of all the food we eat, from apples and almonds to coffee and cocoa.\n" +
      "Now, the bad news. Long-term monitoring in Europe shows that some wild bee species have fallen in number by as much as seventy per cent over the past fifty years.\n" +
      "The first major driver is the loss of habitat. As farms have grown larger and more uniform, the meadows and hedgerows that bees rely on for food have disappeared.\n" +
      "The second driver is pesticides. A class of chemicals called neonicotinoids has been shown to damage the navigation system of bees, meaning workers cannot find their way back to the hive.\n" +
      "The third driver is disease, and in particular a parasitic mite called Varroa, which weakens colonies and spreads viruses between them.\n" +
      "The good news is that recovery is possible. Studies from the Netherlands show that simply planting strips of wildflowers along the edges of fields can boost local bee numbers by up to forty per cent within two years.\n" +
      "Cities have a role to play as well. Urban parks and even balcony gardens, when planted with the right flowers, become valuable refuges for pollinators.",
    rate: 0.85,
    questions: [
      { type: "fill-in", prompt: "Bees pollinate about one ___ of the food we eat.", answer: "third" },
      { type: "fill-in", prompt: "Some wild bee species have fallen by up to ___ per cent in 50 years.", answer: "70" },
      { type: "fill-in", prompt: "The first driver of decline is the loss of ___.", answer: "habitat" },
      { type: "fill-in", prompt: "Neonicotinoids damage the ___ system of bees.", answer: "navigation" },
      { type: "fill-in", prompt: "A parasitic mite called ___ weakens colonies.", answer: "Varroa" },
      { type: "fill-in", prompt: "Planting wildflower strips can boost bee numbers by up to ___ per cent.", answer: "40" },
      { type: "fill-in", prompt: "Improvements were measured within ___ years in the Netherlands.", answer: "two" },
      { type: "fill-in", prompt: "Urban parks and balcony gardens can become valuable ___ for pollinators.", answer: "refuges" },
    ],
  },
];
