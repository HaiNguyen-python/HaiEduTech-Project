/**
 * @file ieltsListeningPracticeExpansion.ts
 * @description Additional Cambridge-style IELTS Listening practice sets.
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion: ListeningPracticeSet[] = [
  {
    id: "form-completion-bank",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Opening a Student Bank Account",
    titleVi: "Mở tài khoản ngân hàng sinh viên",
    context: "A student calls a high-street bank to open a basic student account. Listen and complete the form.",
    contextVi: "Sinh viên gọi ngân hàng mở tài khoản. Nghe và điền vào biểu mẫu.",
    transcript:
      "Agent: Good morning, North Bank, this is Daniel speaking. How can I help?\n" +
      "Student: Hi, I'd like to open a student current account please.\n" +
      "Agent: Of course. Could I take your full name?\n" +
      "Student: Yes, it's Anna Petrov, that's P-E-T-R-O-V.\n" +
      "Agent: Thank you. And your date of birth?\n" +
      "Student: The fourteenth of March, two thousand and three.\n" +
      "Agent: Lovely. What course are you studying?\n" +
      "Student: Mechanical Engineering at Westfield University.\n" +
      "Agent: And how long is your course?\n" +
      "Student: Four years in total.\n" +
      "Agent: Great. Could you give me your current address?\n" +
      "Student: It's Flat 9, Maple Court, Bristol, postcode BS4 2RT.\n" +
      "Agent: And the best phone number to reach you?\n" +
      "Student: It's 0795 442 6180.\n" +
      "Agent: Perfect. The account comes with a free overdraft of up to one thousand five hundred pounds in the first year.\n" +
      "Student: That sounds useful.\n" +
      "Agent: We'll also send you a debit card within seven working days.",
    questions: [
      { type: "fill-in", prompt: "First name: ___", answer: "Anna" },
      { type: "fill-in", prompt: "Surname: ___", answer: "Petrov" },
      { type: "fill-in", prompt: "Date of birth: 14 ___ 2003", answer: "March" },
      { type: "fill-in", prompt: "Course: ___ Engineering", answer: "Mechanical" },
      { type: "fill-in", prompt: "University: ___ University", answer: "Westfield" },
      { type: "fill-in", prompt: "Course length: ___ years", answer: "4", maxWords: 1 },
      { type: "fill-in", prompt: "Address: Flat ___, Maple Court", answer: "9" },
      { type: "fill-in", prompt: "Postcode: ___", answer: "BS4 2RT" },
      { type: "fill-in", prompt: "Overdraft up to £___ in year one", answer: "1500" },
      { type: "fill-in", prompt: "Debit card delivered in ___ working days", answer: "7", maxWords: 1 },
    ],
  },
  {
    id: "mcq-museum",
    section: 2,
    questionType: "Multiple Choice",
    questionTypeVi: "Trắc nghiệm",
    title: "Visitor Guide: City Maritime Museum",
    titleVi: "Hướng dẫn tham quan Bảo tàng Hàng hải",
    context: "A museum guide gives a short introduction to visitors. Choose the best answer for each question.",
    contextVi: "Hướng dẫn viên giới thiệu bảo tàng. Chọn đáp án đúng.",
    transcript:
      "Welcome to the City Maritime Museum. Before you begin your visit, a few quick notes.\n" +
      "The museum was founded in 1923 and moved to this restored dockside warehouse in 2008.\n" +
      "We have three permanent galleries. The ground floor focuses on local fishing history. The first floor covers the age of steam, and the top floor houses our world-class collection of navigational instruments.\n" +
      "Our current temporary exhibition, 'Ocean Plastics', runs until the end of October and is included in your ticket.\n" +
      "Photography is allowed everywhere except in the temporary exhibition, where flash damages the displays.\n" +
      "The café on the ground floor is open from 10 a.m. to 4:30 p.m. and offers a children's menu.\n" +
      "Finally, please note that the lift to the top floor is currently out of service, but staff can offer a guided alternative route on request.",
    questions: [
      { type: "mcq", prompt: "When was the museum founded?", options: ["1923", "2008", "1998", "2018"], answer: 0 },
      { type: "mcq", prompt: "When did the museum move to its current building?", options: ["1923", "2008", "1998", "2018"], answer: 1 },
      { type: "mcq", prompt: "How many permanent galleries are there?", options: ["2", "3", "4", "5"], answer: 1 },
      { type: "mcq", prompt: "The ground floor focuses on:", options: ["Fishing history", "The age of steam", "Navigational instruments", "Ocean plastics"], answer: 0 },
      { type: "mcq", prompt: "What is displayed on the top floor?", options: ["Fishing history", "Steam-age exhibits", "Navigational instruments", "Ocean plastics"], answer: 2 },
      { type: "mcq", prompt: "Where is photography NOT allowed?", options: ["The ground floor", "The first floor", "The temporary exhibition", "The café"], answer: 2 },
      { type: "mcq", prompt: "The café opens at:", options: ["9:00 a.m.", "9:30 a.m.", "10:00 a.m.", "10:30 a.m."], answer: 2 },
      { type: "mcq", prompt: "The café closes at:", options: ["3:30 p.m.", "4:00 p.m.", "4:30 p.m.", "5:00 p.m."], answer: 2 },
      { type: "mcq", prompt: "What service is currently unavailable?", options: ["The café", "The shop", "The lift to the top floor", "The audio guide"], answer: 2 },
      { type: "mcq", prompt: "How long does the 'Ocean Plastics' exhibition run?", options: ["Until end of September", "Until end of October", "Until end of November", "All year"], answer: 1 },
    ],
  },
  {
    id: "matching-research",
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Ghép cặp",
    title: "Tutorial: Choosing a Research Method",
    titleVi: "Buổi tutorial: Chọn phương pháp nghiên cứu",
    context: "A tutor and two students discuss four research methods. Match each statement to the correct method.",
    contextVi: "Giảng viên và hai sinh viên thảo luận về 4 phương pháp. Ghép phát biểu với phương pháp.",
    matchingOptions: [
      { letter: "A", text: "Surveys", textVi: "Khảo sát" },
      { letter: "B", text: "Interviews", textVi: "Phỏng vấn" },
      { letter: "C", text: "Focus groups", textVi: "Thảo luận nhóm" },
      { letter: "D", text: "Observation", textVi: "Quan sát" },
    ],
    transcript:
      "Tutor: Let's quickly review the four methods you'll choose from.\n" +
      "Surveys are best when you need numerical patterns from a very large sample, but they rarely capture motivations behind a choice.\n" +
      "Interviews give you deep, personal accounts and are ideal for sensitive topics, although they are time-consuming to transcribe.\n" +
      "Focus groups are powerful when ideas emerge from the interaction itself, but a dominant participant can easily skew the discussion.\n" +
      "Observation removes the bias that comes from people describing what they think they do, which often differs from what they actually do - but ethics approval is essential.",
    questions: [
      { type: "matching", prompt: "Best for large numerical samples but weak on motivation.", answer: "A" },
      { type: "matching", prompt: "Ideal for sensitive topics but slow to transcribe.", answer: "B" },
      { type: "matching", prompt: "Useful because ideas emerge from group interaction.", answer: "C" },
      { type: "matching", prompt: "Avoids the gap between what people say and what they actually do.", answer: "D" },
      { type: "matching", prompt: "Risks being skewed by a dominant participant.", answer: "C" },
      { type: "matching", prompt: "Requires careful ethical clearance before starting.", answer: "D" },
      { type: "matching", prompt: "Provides numerical patterns from a very large sample.", answer: "A" },
      { type: "matching", prompt: "Captures deep, personal accounts.", answer: "B" },
      { type: "matching", prompt: "Rarely captures the motivations behind a choice.", answer: "A" },
      { type: "matching", prompt: "Removes the bias caused by people describing what they think they do.", answer: "D" },
    ],
  },
  {
    id: "lecture-volcanoes",
    section: 4,
    questionType: "Lecture Note Completion",
    questionTypeVi: "Điền chỗ trống bài giảng",
    title: "Lecture: How Volcanoes Are Monitored",
    titleVi: "Bài giảng: Giám sát núi lửa",
    context: "Listen to part of a geology lecture and complete the notes with NO MORE THAN TWO WORDS or a number.",
    contextVi: "Nghe bài giảng và điền KHÔNG QUÁ HAI TỪ hoặc một số.",
    transcript:
      "Modern volcano monitoring combines four main techniques. The first is seismology - small earthquakes beneath a volcano often signal that magma is moving upwards. Networks of seismometers can detect tremors as weak as magnitude one.\n" +
      "The second is ground deformation, measured by GPS receivers and satellite radar. As magma fills a chamber, the surface above can bulge by several centimetres long before any eruption.\n" +
      "The third is gas monitoring. The ratio of sulphur dioxide to carbon dioxide in the plume rises sharply as magma approaches the surface.\n" +
      "The fourth and increasingly important method is thermal imaging from satellites, which can detect new hot spots even through cloud cover.\n" +
      "Combining these four streams now allows warnings to be issued, on average, around three days before a major eruption - a dramatic improvement on the situation just twenty years ago, when warnings were rarely possible.",
    questions: [
      { type: "fill-in", prompt: "Number of main monitoring techniques: ___", answer: "4" },
      { type: "fill-in", prompt: "Seismometers can detect tremors as weak as magnitude ___.", answer: "1" },
      { type: "fill-in", prompt: "Small earthquakes signal that magma is moving ___.", answer: "upwards" },
      { type: "fill-in", prompt: "Ground deformation is measured by GPS receivers and satellite ___.", answer: "radar" },
      { type: "fill-in", prompt: "The surface above a chamber can bulge by several ___.", answer: "centimetres" },
      { type: "fill-in", prompt: "The ratio of ___ to carbon dioxide rises before eruption.", answer: "sulphur dioxide" },
      { type: "fill-in", prompt: "Sulphur dioxide ratio rises as magma approaches the ___.", answer: "surface" },
      { type: "fill-in", prompt: "Thermal imaging detects new ___ on volcanoes.", answer: "hot spots" },
      { type: "fill-in", prompt: "Thermal imaging works even through ___ cover.", answer: "cloud" },
      { type: "fill-in", prompt: "Warnings can now be issued about ___ days in advance.", answer: "3" },
    ],
  },
];
