/**
 * @file ieltsListeningPracticeExpansion2.ts
 * @description Third batch of IELTS Listening practice sets (Sections 1-4).
 * Pacing tuned for the chunked TTS engine: short sentences, clear speaker tags.
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion2: ListeningPracticeSet[] = [
  {
    id: "form-gym-membership",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Joining a Local Sports Centre",
    titleVi: "Đăng ký trung tâm thể thao",
    context: "A man phones a community sports centre to join. Complete the membership form.",
    contextVi: "Một người gọi đăng ký trung tâm thể thao. Điền vào form.",
    transcript:
      "Receptionist: Good afternoon, Riverside Sports Centre, Megan speaking. How can I help?\n" +
      "Caller: Hi. I'd like to sign up for a membership, please.\n" +
      "Receptionist: Of course. Could I take your full name?\n" +
      "Caller: Yes. It's Thomas Reilly. That's R-E-I-L-L-Y.\n" +
      "Receptionist: Thank you. And your date of birth?\n" +
      "Caller: The third of November, nineteen ninety-five.\n" +
      "Receptionist: Lovely. Which membership would you like — Standard, Plus or Premium?\n" +
      "Caller: I'll go with the Plus one, I think.\n" +
      "Receptionist: Good choice. That gives you the gym, the pool and two classes a week. The monthly fee is forty-five pounds.\n" +
      "Caller: That's fine.\n" +
      "Receptionist: Could I have your address, please?\n" +
      "Caller: It's twenty-six Beech Avenue, Leeds, LS6 4HP.\n" +
      "Receptionist: And which class would you like to book first?\n" +
      "Caller: I'd like to start with the Tuesday evening yoga session, please.\n" +
      "Receptionist: Perfect. We'll see you then.",
    rate: 0.85,
    questions: [
      { type: "fill-in", prompt: "Receptionist's name: ___", answer: "Megan" },
      { type: "fill-in", prompt: "Surname: ___", answer: "Reilly" },
      { type: "fill-in", prompt: "Date of birth: 3 November ___", answer: "1995" },
      { type: "fill-in", prompt: "Membership type: ___", answer: "Plus" },
      { type: "fill-in", prompt: "Monthly fee: £___", answer: "45" },
      { type: "fill-in", prompt: "Number of classes per week included: ___", answer: "2" },
      { type: "fill-in", prompt: "Plan also includes gym and ___", answer: "pool" },
      { type: "fill-in", prompt: "Address: 26 ___ Avenue, Leeds", answer: "Beech" },
      { type: "fill-in", prompt: "Postcode: ___", answer: "LS6 4HP" },
      { type: "fill-in", prompt: "First class booked: ___ on Tuesday evening", answer: "yoga" },
    ],
  },
  {
    id: "monologue-museum-tour",
    section: 2,
    questionType: "Multiple Choice",
    questionTypeVi: "Chọn đáp án đúng",
    title: "Museum Audio Tour Introduction",
    titleVi: "Giới thiệu tour bảo tàng",
    context: "A museum guide introduces visitors to the day's tour. Choose the correct answer for each question.",
    contextVi: "Hướng dẫn viên giới thiệu tour. Chọn đáp án đúng.",
    transcript:
      "Welcome, everyone, to the Eastfield Maritime Museum. My name is Helen and I'll be looking after you for the next ninety minutes.\n" +
      "Before we start, a few quick reminders. Photography is allowed in every room except the new exhibition on lighthouses, where flash damages the original maps.\n" +
      "The café on the first floor is open until five, but please note it does not serve hot meals after three o'clock — only sandwiches and cakes.\n" +
      "Our gift shop is on the ground floor, just past the main entrance, and the toilets are on the lower level.\n" +
      "Today's special talk, at two thirty in the main hall, is about the rescue of a cargo ship in the great storm of 1953. It lasts roughly forty-five minutes and is free with your ticket.\n" +
      "If you'd like a quieter visit, our most peaceful gallery is usually the East Wing, which focuses on small fishing communities.",
    rate: 0.85,
    questions: [
      {
        type: "mcq",
        prompt: "Photography is NOT permitted in which area?",
        options: ["The main hall", "The lighthouse exhibition", "The East Wing", "The gift shop"],
        answer: 1,
      },
      {
        type: "mcq",
        prompt: "What time does the café stop serving hot meals?",
        options: ["2 pm", "3 pm", "4 pm", "5 pm"],
        answer: 1,
      },
      {
        type: "mcq",
        prompt: "Where are the toilets located?",
        options: ["First floor", "Ground floor", "Lower level", "East Wing"],
        answer: 2,
      },
      {
        type: "mcq",
        prompt: "Today's special talk is about a ship rescue in:",
        options: ["1923", "1933", "1953", "1973"],
        answer: 2,
      },
      {
        type: "mcq",
        prompt: "The quietest gallery is described as the:",
        options: ["Main Hall", "North Wing", "East Wing", "South Gallery"],
        answer: 2,
      },
    ],
  },
  {
    id: "discussion-research-project",
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Ghép câu — chọn chữ cái",
    title: "Students Plan a Group Research Project",
    titleVi: "Sinh viên lên kế hoạch nghiên cứu",
    context: "Three students decide who will do which part of a group project. Match each task to the right student (A = Mark, B = Priya, C = Daniel).",
    contextVi: "Ba sinh viên phân chia phần việc. Ghép từng phần việc với sinh viên phụ trách (A = Mark, B = Priya, C = Daniel).",
    matchingOptions: [
      { letter: "A", text: "Mark" },
      { letter: "B", text: "Priya" },
      { letter: "C", text: "Daniel" },
    ],
    transcript:
      "Tutor: So, you have four weeks. Let's confirm who is doing what.\n" +
      "Mark: I'm happy to design the survey questions — I did the statistics module last term, so I'm comfortable with that.\n" +
      "Priya: That works. I can take the interviews — I've already contacted two of the participants.\n" +
      "Daniel: I'll handle the literature review, since I've read most of the recent papers already.\n" +
      "Mark: Great. And who is writing the final report?\n" +
      "Priya: I think Daniel should — his writing is the clearest of the three of us.\n" +
      "Daniel: Fine, but only if Mark takes care of the slide deck for the presentation.\n" +
      "Mark: Sure, no problem.\n" +
      "Tutor: Excellent. And the data analysis?\n" +
      "Priya: I'd like to do that — I want more practice with SPSS.",
    rate: 0.85,
    questions: [
      { type: "matching", prompt: "Designing the survey questions: ___", answer: "A" },
      { type: "matching", prompt: "Conducting the interviews: ___", answer: "B" },
      { type: "matching", prompt: "Writing the literature review: ___", answer: "C" },
      { type: "matching", prompt: "Writing the final report: ___", answer: "C" },
      { type: "matching", prompt: "Preparing the presentation slides: ___", answer: "A" },
      { type: "matching", prompt: "Doing the data analysis: ___", answer: "B" },
    ],
  },
  {
    id: "lecture-urban-trees",
    section: 4,
    questionType: "Sentence Completion",
    questionTypeVi: "Hoàn thành câu",
    title: "Lecture: Why Cities Need More Trees",
    titleVi: "Bài giảng: Vì sao đô thị cần nhiều cây xanh",
    context: "A university lecturer talks about the benefits of urban trees. Complete each sentence with NO MORE THAN TWO WORDS or a number.",
    contextVi: "Giảng viên nói về lợi ích cây xanh đô thị. Hoàn thành mỗi câu với không quá hai từ hoặc một số.",
    transcript:
      "Today I'd like to look at why cities around the world are now treating trees as serious public infrastructure, rather than as decoration.\n" +
      "The first benefit is temperature. On a hot summer afternoon, the air under a mature street tree can be up to seven degrees cooler than the air just a few metres away in full sun.\n" +
      "This matters for health: in major heatwaves, neighbourhoods with low tree cover record significantly higher rates of hospital admissions for elderly residents.\n" +
      "The second benefit is air quality. Tree leaves trap particles of pollution, especially close to busy roads. Studies in London suggest that a single mature plane tree can remove up to twenty kilograms of pollutants every year.\n" +
      "The third benefit is mental wellbeing. Surveys consistently find that people living within a short walk of green space report lower levels of stress and better sleep.\n" +
      "Finally, urban trees have an economic value. Real-estate data from twelve major cities shows that homes on tree-lined streets sell for roughly nine per cent more than equivalent homes on bare streets.",
    rate: 0.85,
    questions: [
      { type: "fill-in", prompt: "Cities now treat trees as serious public ___.", answer: "infrastructure" },
      { type: "fill-in", prompt: "Air under a mature street tree can be up to ___ degrees cooler.", answer: "seven" },
      { type: "fill-in", prompt: "Low tree cover is linked to more hospital admissions during a ___.", answer: "heatwave" },
      { type: "fill-in", prompt: "One mature plane tree can remove up to ___ kilograms of pollutants yearly.", answer: "20" },
      { type: "fill-in", prompt: "People near green space report lower stress and better ___.", answer: "sleep" },
      { type: "fill-in", prompt: "Homes on tree-lined streets sell for around ___ per cent more.", answer: "nine" },
    ],
  },
];
