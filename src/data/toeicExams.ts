// TOEIC exam dataset: Listening & Reading + Speaking & Writing.
// Compact sample sets representing the official TOEIC structure.
// Each LR question has 4 options, optional audio src + transcript.
// Each SW task has prompt, type and prep/response durations.

export type ToeicSkill = "listening" | "reading" | "speaking" | "writing";
export type ToeicPart = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ToeicLRQuestion {
  id: string;
  part: ToeicPart;
  prompt: string;
  options: string[];
  answer: number; // index 0-3
  audioSrc?: string;
  audioText?: string;
  transcript?: string;
  explanation?: string;
  imageUrl?: string;
  passage?: string; // shared with sibling questions in P6/P7
  passageGroupId?: string;
}

export interface ToeicSWTask {
  id: string;
  type:
    | "read-aloud"
    | "describe-picture"
    | "respond-questions"
    | "propose-solution"
    | "express-opinion"
    | "write-sentence-picture"
    | "respond-email"
    | "write-essay";
  part: number; // 1..8 inside SW
  prompt: string;
  prepSeconds: number;
  responseSeconds: number;
  imageUrl?: string;
  context?: string;
  sampleAnswer?: string;
  scoringCriteria?: string[];
}

export interface ToeicLRExam {
  id: string;
  title: string;
  series: string;
  durationSec: number; // 7200 standard
  questions: ToeicLRQuestion[];
}

export interface ToeicSWExam {
  id: string;
  title: string;
  series: string;
  durationSec: number;
  speakingTasks: ToeicSWTask[];
  writingTasks: ToeicSWTask[];
}

// ---- Listening & Reading practice test 01 (compact: 28 sample questions) ----
const LR_01: ToeicLRExam = {
  id: "lr-01",
  title: "TOEIC LR Practice Test 01",
  series: "HaiEdu Series 2025",
  durationSec: 7200,
  questions: [
    // Part 1 - Photographs
    {
      id: "p1-1",
      part: 1,
      prompt: "Listen and choose the statement that best describes the picture.",
      options: [
        "She is typing on a laptop.",
        "She is reading a newspaper.",
        "She is talking on the phone.",
        "She is writing on a whiteboard.",
      ],
      answer: 0,
      transcript: "A woman is sitting at a desk and typing on a laptop computer.",
      explanation: "Tập trung vào động từ chính: typing trên laptop.",
    },
    {
      id: "p1-2",
      part: 1,
      prompt: "Choose the best description of the photograph.",
      options: [
        "The men are shaking hands.",
        "The men are loading a truck.",
        "The men are reviewing documents.",
        "The men are leaving the office.",
      ],
      answer: 2,
      transcript: "Two men in suits are sitting at a table reviewing a stack of documents together.",
      explanation: "'Reviewing documents' khớp với hành động đang quan sát.",
    },
    // Part 2 - Question-Response
    {
      id: "p2-1",
      part: 2,
      prompt: "Listen to the question and choose the best response.",
      options: [
        "Yes, by Friday afternoon.",
        "It was a great meeting.",
        "She works in marketing.",
      ],
      answer: 0,
      transcript: "Q: When do you need the report finished?\nA: Yes, by Friday afternoon.",
      explanation: "Câu hỏi 'when' cần thông tin thời gian → 'by Friday afternoon'.",
    },
    {
      id: "p2-2",
      part: 2,
      prompt: "Listen to the question and choose the best response.",
      options: [
        "On the third floor.",
        "Twice a week.",
        "Because it was cancelled.",
      ],
      answer: 0,
      transcript: "Q: Where is the HR department located?\nA: On the third floor.",
      explanation: "Câu hỏi 'where' → câu trả lời chỉ vị trí.",
    },
    {
      id: "p2-3",
      part: 2,
      prompt: "Choose the best response.",
      options: [
        "I'd prefer the morning flight.",
        "He hasn't arrived yet.",
        "The conference room is booked.",
      ],
      answer: 0,
      transcript: "Q: Would you like the morning or afternoon flight?\nA: I'd prefer the morning flight.",
      explanation: "Câu hỏi lựa chọn (or) → chọn 1 trong 2.",
    },
    // Part 3 - Conversations
    {
      id: "p3-1",
      part: 3,
      prompt: "Where most likely are the speakers?",
      options: ["At a hotel", "At a bank", "At an airport", "At a restaurant"],
      answer: 2,
      transcript:
        "M: Excuse me, my flight to Tokyo has been delayed. Can I rebook to a later one?\nW: Of course. Please show me your boarding pass and ID.",
      explanation: "Từ khóa 'flight', 'boarding pass' → sân bay.",
      passageGroupId: "p3-conv-1",
    },
    {
      id: "p3-2",
      part: 3,
      prompt: "What does the woman ask for?",
      options: ["Passport only", "Boarding pass and ID", "Credit card", "Visa"],
      answer: 1,
      transcript:
        "W: Please show me your boarding pass and ID.",
      explanation: "Cô ấy yêu cầu 2 thứ: boarding pass và ID.",
      passageGroupId: "p3-conv-1",
    },
    {
      id: "p3-3",
      part: 3,
      prompt: "What will the man most likely do next?",
      options: [
        "Pay a fee",
        "Hand over his documents",
        "Cancel his trip",
        "Call his manager",
      ],
      answer: 1,
      transcript: "(Implied next action)",
      explanation: "Sau khi được yêu cầu show documents, hành động kế tiếp là đưa giấy tờ.",
      passageGroupId: "p3-conv-1",
    },
    // Part 4 - Talks
    {
      id: "p4-1",
      part: 4,
      prompt: "What is the purpose of the announcement?",
      options: [
        "To welcome new employees",
        "To announce a system maintenance",
        "To introduce a new product",
        "To cancel a meeting",
      ],
      answer: 1,
      transcript:
        "Attention all staff. Our internal email system will undergo scheduled maintenance this Saturday from 10 PM to 2 AM. Please save your work in advance.",
      explanation: "Từ 'maintenance' và thời gian cụ thể → bảo trì hệ thống.",
      passageGroupId: "p4-ann-1",
    },
    {
      id: "p4-2",
      part: 4,
      prompt: "When will the maintenance occur?",
      options: ["Friday night", "Saturday 10 PM - 2 AM", "Sunday morning", "Monday afternoon"],
      answer: 1,
      transcript: "this Saturday from 10 PM to 2 AM",
      passageGroupId: "p4-ann-1",
    },
    {
      id: "p4-3",
      part: 4,
      prompt: "What are listeners asked to do?",
      options: [
        "Restart their computers",
        "Save their work in advance",
        "Notify the IT team",
        "Use a backup server",
      ],
      answer: 1,
      transcript: "Please save your work in advance.",
      passageGroupId: "p4-ann-1",
    },
    // Part 5 - Incomplete sentences (grammar/vocab)
    {
      id: "p5-1",
      part: 5,
      prompt: "All employees must submit their expense reports ___ the end of the month.",
      options: ["by", "until", "since", "during"],
      answer: 0,
      explanation: "'by' = chậm nhất là (deadline). 'until' diễn tả hành động kéo dài.",
    },
    {
      id: "p5-2",
      part: 5,
      prompt: "The new training program has been highly ___ by participants.",
      options: ["recommend", "recommendation", "recommended", "recommending"],
      answer: 2,
      explanation: "Cần V3/p.p sau 'has been' (passive perfect).",
    },
    {
      id: "p5-3",
      part: 5,
      prompt: "Mr. Park, ___ joined our firm last year, has been promoted to senior manager.",
      options: ["who", "which", "whom", "whose"],
      answer: 0,
      explanation: "Đại từ quan hệ chủ ngữ chỉ người → 'who'.",
    },
    {
      id: "p5-4",
      part: 5,
      prompt: "The proposal was rejected ___ several flaws in the budget plan.",
      options: ["because", "due to", "although", "however"],
      answer: 1,
      explanation: "'due to' + cụm danh từ; 'because' + mệnh đề.",
    },
    {
      id: "p5-5",
      part: 5,
      prompt: "Sales have increased ___ since the launch of the new advertising campaign.",
      options: ["significant", "significance", "significantly", "signify"],
      answer: 2,
      explanation: "Trạng từ bổ nghĩa cho động từ 'have increased'.",
    },
    {
      id: "p5-6",
      part: 5,
      prompt: "Please contact the IT department ___ you encounter any technical issues.",
      options: ["if", "unless", "despite", "even"],
      answer: 0,
      explanation: "Mệnh đề điều kiện → 'if'.",
    },
    // Part 6 - Text completion
    {
      id: "p6-1",
      part: 6,
      passage:
        "Dear Ms. Lopez,\n\nThank you for your interest in our online course. We are pleased to inform you that your registration has been [BLANK1]. The course will begin on March 5 and run for eight weeks. Please [BLANK2] your account dashboard for the schedule.\n\nIf you have any questions, do not hesitate to contact us.\n\nBest regards,\nLearning Team",
      prompt: "BLANK1 — Choose the best option:",
      options: ["confirm", "confirmed", "confirming", "confirmation"],
      answer: 1,
      explanation: "Câu bị động 'has been + V3' → confirmed.",
      passageGroupId: "p6-email-1",
    },
    {
      id: "p6-2",
      part: 6,
      passage: "(See passage in question above)",
      prompt: "BLANK2 — Choose the best option:",
      options: ["check", "checked", "checking", "to check"],
      answer: 0,
      explanation: "'Please' + V nguyên thể → check.",
      passageGroupId: "p6-email-1",
    },
    {
      id: "p6-3",
      part: 6,
      passage: "(See passage above)",
      prompt: "Where would the following sentence best fit? 'A welcome email with login details has also been sent to you.'",
      options: [
        "Before 'Thank you for your interest...'",
        "After 'has been confirmed.'",
        "After 'do not hesitate to contact us.'",
        "After 'Best regards,'",
      ],
      answer: 1,
      explanation: "Liên kết logic: sau khi xác nhận đăng ký thì gửi email chào mừng.",
      passageGroupId: "p6-email-1",
    },
    // Part 7 - Reading comprehension
    {
      id: "p7-1",
      part: 7,
      passage:
        "NOTICE\nThe Westgate Library will be closed from June 10 to June 14 for the installation of new energy-efficient lighting. During the closure, online resources including e-books and digital journals remain accessible 24/7 with your library card. Items currently checked out will have their due dates automatically extended to June 20. We apologize for any inconvenience.",
      prompt: "Why will the library be closed?",
      options: [
        "For staff training",
        "To install new lighting",
        "For inventory checking",
        "For renovation of the entrance",
      ],
      answer: 1,
      explanation: "Câu thứ 2: 'installation of new energy-efficient lighting'.",
      passageGroupId: "p7-notice-1",
    },
    {
      id: "p7-2",
      part: 7,
      passage: "(See passage above)",
      prompt: "What is true about online resources during the closure?",
      options: [
        "They will be unavailable.",
        "They require a new password.",
        "They remain available 24/7.",
        "They are available only on weekdays.",
      ],
      answer: 2,
      explanation: "'remain accessible 24/7'.",
      passageGroupId: "p7-notice-1",
    },
    {
      id: "p7-3",
      part: 7,
      passage: "(See passage above)",
      prompt: "What will happen to currently borrowed items?",
      options: [
        "They must be returned by June 9.",
        "Due dates will be extended to June 20.",
        "They will incur a small fee.",
        "They must be renewed online.",
      ],
      answer: 1,
      passageGroupId: "p7-notice-1",
    },
    {
      id: "p7-4",
      part: 7,
      passage:
        "From: hr@brightcorp.com\nTo: all-staff@brightcorp.com\nSubject: Annual Wellness Day\n\nDear team,\n\nWe are delighted to announce our Annual Wellness Day on Friday, July 12. Activities include yoga sessions, health screenings, and a nutritionist Q&A. Lunch will be provided. Please RSVP by July 5 via the staff portal.\n\nBest,\nHR",
      prompt: "What is the main purpose of the email?",
      options: [
        "To launch a new health insurance plan",
        "To invite staff to a wellness event",
        "To announce a job opening",
        "To explain a new HR policy",
      ],
      answer: 1,
      passageGroupId: "p7-email-1",
    },
    {
      id: "p7-5",
      part: 7,
      passage: "(See passage above)",
      prompt: "Which is NOT mentioned as an activity?",
      options: ["Yoga sessions", "Health screenings", "Cooking class", "Nutritionist Q&A"],
      answer: 2,
      passageGroupId: "p7-email-1",
    },
    {
      id: "p7-6",
      part: 7,
      passage: "(See passage above)",
      prompt: "By when must employees RSVP?",
      options: ["June 30", "July 5", "July 12", "July 15"],
      answer: 1,
      passageGroupId: "p7-email-1",
    },
    {
      id: "p7-7",
      part: 7,
      passage:
        "Job Posting — Marketing Coordinator at Lumen Tech.\nResponsibilities: planning campaigns, coordinating with designers, monitoring KPIs.\nRequirements: Bachelor's degree, 2+ years of experience, excellent communication.\nBenefits: hybrid working, performance bonuses, annual training budget.\nEmail your CV to careers@lumentech.com by September 30.",
      prompt: "Which is a stated benefit of the position?",
      options: [
        "Company car",
        "Hybrid working",
        "Stock options",
        "Free housing",
      ],
      answer: 1,
      passageGroupId: "p7-job-1",
    },
    {
      id: "p7-8",
      part: 7,
      passage: "(See posting above)",
      prompt: "What is the application deadline?",
      options: ["August 31", "September 15", "September 30", "October 10"],
      answer: 2,
      passageGroupId: "p7-job-1",
    },
  ],
};

// ---- LR Practice Test 02 (compact) ----
const LR_02: ToeicLRExam = {
  id: "lr-02",
  title: "TOEIC LR Practice Test 02",
  series: "HaiEdu Series 2025",
  durationSec: 7200,
  questions: [
    {
      id: "lr2-p1-1",
      part: 1,
      prompt: "Choose the best description of the photograph.",
      options: [
        "Cars are stopped at a traffic light.",
        "Workers are repairing the road.",
        "Pedestrians are crossing the street.",
        "A bus is leaving the station.",
      ],
      answer: 2,
      transcript: "Several pedestrians are crossing a busy street at a marked crosswalk.",
    },
    {
      id: "lr2-p2-1",
      part: 2,
      prompt: "Choose the best response.",
      options: [
        "Yes, I have already booked it.",
        "It costs about fifty dollars.",
        "She is on vacation this week.",
      ],
      answer: 0,
      transcript: "Q: Have you reserved the conference room for tomorrow?\nA: Yes, I have already booked it.",
    },
    {
      id: "lr2-p3-1",
      part: 3,
      prompt: "What problem does the woman mention?",
      options: [
        "A delayed shipment",
        "A broken printer",
        "A missing invoice",
        "A scheduling conflict",
      ],
      answer: 1,
      transcript:
        "W: The printer in the meeting room isn't working again. I've called IT twice.\nM: Let me try to restart it before the 3 PM presentation.",
    },
    {
      id: "lr2-p4-1",
      part: 4,
      prompt: "Who is the intended audience?",
      options: [
        "New customers",
        "Hotel guests",
        "Conference attendees",
        "Restaurant staff",
      ],
      answer: 2,
      transcript:
        "Welcome to the 2025 Marketing Innovators Conference. Please collect your name badge at the registration desk before entering Hall B.",
    },
    {
      id: "lr2-p5-1",
      part: 5,
      prompt: "The director ___ that all departments submit their budgets by Friday.",
      options: ["request", "requests", "requesting", "to request"],
      answer: 1,
      explanation: "Chủ ngữ số ít → động từ chia 's'.",
    },
    {
      id: "lr2-p5-2",
      part: 5,
      prompt: "The new policy will take ___ on January 1.",
      options: ["effect", "affect", "effective", "effectively"],
      answer: 0,
      explanation: "'Take effect' = có hiệu lực.",
    },
    {
      id: "lr2-p5-3",
      part: 5,
      prompt: "Sales of the new model have ___ since the redesign was launched.",
      options: ["double", "doubled", "doubling", "doubles"],
      answer: 1,
      explanation: "'have + V3' (present perfect) → doubled.",
    },
    {
      id: "lr2-p6-1",
      part: 6,
      passage:
        "Dear Customer,\n\nThank you for [BLANK1] our service. We have processed your refund and the amount will appear in your account within 5 business days.",
      prompt: "BLANK1 — choose the best option:",
      options: ["choose", "choosing", "chose", "chosen"],
      answer: 1,
      explanation: "'Thank you for + V-ing'.",
    },
    {
      id: "lr2-p7-1",
      part: 7,
      passage:
        "MEMO\nTo: All Sales Reps\nFrom: Regional Manager\nSubject: Q4 Targets\n\nOur Q4 sales target is set at $2.5M, an increase of 15% over Q3. Each rep should meet weekly with their team lead to review pipeline. Bonuses will be distributed in mid-January based on performance.",
      prompt: "What is the Q4 target?",
      options: ["$1.5M", "$2.0M", "$2.5M", "$3.0M"],
      answer: 2,
      passageGroupId: "lr2-memo-1",
    },
    {
      id: "lr2-p7-2",
      part: 7,
      passage: "(See memo above)",
      prompt: "When will bonuses be distributed?",
      options: ["End of December", "Mid-January", "End of January", "Mid-February"],
      answer: 1,
      passageGroupId: "lr2-memo-1",
    },
  ],
};

// ---- Speaking & Writing Practice Test 01 ----
const SW_01: ToeicSWExam = {
  id: "sw-01",
  title: "TOEIC Speaking & Writing Practice Test 01",
  series: "HaiEdu Series 2025",
  durationSec: 4800,
  speakingTasks: [
    {
      id: "sw1-s1",
      type: "read-aloud",
      part: 1,
      prompt:
        "Read aloud the following announcement: 'Welcome to the City Museum. Please note that photography is allowed in the main galleries but not in the special exhibitions. Audio guides are available at the front desk for a small fee.'",
      prepSeconds: 45,
      responseSeconds: 45,
      scoringCriteria: ["Pronunciation", "Intonation & Stress"],
    },
    {
      id: "sw1-s2",
      type: "describe-picture",
      part: 3,
      prompt: "Describe the picture in as much detail as you can.",
      prepSeconds: 45,
      responseSeconds: 45,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      scoringCriteria: ["Pronunciation", "Vocabulary", "Cohesion"],
    },
    {
      id: "sw1-s3",
      type: "respond-questions",
      part: 4,
      prompt:
        "Imagine an English-speaking friend is asking about your study habits.\nQ1: How often do you study English?\nQ2: What time of day do you find best for learning?\nQ3: Describe a study technique that works well for you.",
      prepSeconds: 0,
      responseSeconds: 45,
      scoringCriteria: ["Relevance", "Completeness", "Pronunciation"],
    },
    {
      id: "sw1-s4",
      type: "propose-solution",
      part: 6,
      prompt:
        "A colleague is having trouble managing their workload and feels stressed. Propose a solution describing the issue, suggesting at least two practical actions, and explain why your suggestions would help.",
      prepSeconds: 45,
      responseSeconds: 60,
      scoringCriteria: ["Problem Identification", "Practicality", "Cohesion"],
    },
    {
      id: "sw1-s5",
      type: "express-opinion",
      part: 8,
      prompt:
        "Some people prefer to work from home, while others prefer working in an office. Which do you prefer and why? Use specific reasons and examples.",
      prepSeconds: 30,
      responseSeconds: 60,
      scoringCriteria: ["Position", "Supporting Reasons", "Vocabulary"],
    },
  ],
  writingTasks: [
    {
      id: "sw1-w1",
      type: "write-sentence-picture",
      part: 1,
      prompt: "Write ONE sentence about the picture using the two given words: meeting / discuss",
      prepSeconds: 0,
      responseSeconds: 480, // 8 minutes for 5 sentences typically; per-sentence ~60s
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      sampleAnswer: "The team is having a meeting to discuss the marketing strategy for next quarter.",
      scoringCriteria: ["Grammar", "Word Use", "Relevance"],
    },
    {
      id: "sw1-w2",
      type: "respond-email",
      part: 2,
      prompt:
        "You received the following email from a customer:\n---\nFrom: Linda Carter\nTo: Customer Service\nSubject: Damaged delivery\n\nI received my order today but two of the items were damaged during shipping. Please advise me on how to proceed.\n---\nWrite a reply that apologizes, explains the next step, and asks for two pieces of information.",
      prepSeconds: 0,
      responseSeconds: 600, // 10 minutes
      scoringCriteria: ["Quality of Sentences", "Vocabulary", "Organization"],
    },
    {
      id: "sw1-w3",
      type: "write-essay",
      part: 3,
      prompt:
        "Some companies offer employees the option to work fully remotely. Do you think this is a good idea? Use specific reasons and examples to support your opinion. Write at least 300 words.",
      prepSeconds: 0,
      responseSeconds: 1800, // 30 minutes
      scoringCriteria: ["Reasons & Examples", "Grammar", "Vocabulary", "Organization"],
    },
  ],
};

import { TOEIC_LR_EXTRA, TOEIC_SW_EXTRA } from "./toeicExamsExtra";
import { TOEIC_LR_EXTRA2, TOEIC_SW_EXTRA2 } from "./toeicExamsExtra2";
import { createFullToeicLRExam, createFullToeicSWExam } from "./toeicFullExamBuilder";

const TOEIC_LR_BASE_EXAMS: ToeicLRExam[] = [LR_01, LR_02, ...TOEIC_LR_EXTRA, ...TOEIC_LR_EXTRA2];
const TOEIC_SW_BASE_EXAMS: ToeicSWExam[] = [SW_01, ...TOEIC_SW_EXTRA, ...TOEIC_SW_EXTRA2];

export const TOEIC_LR_EXAMS: ToeicLRExam[] = TOEIC_LR_BASE_EXAMS.map(createFullToeicLRExam);
export const TOEIC_SW_EXAMS: ToeicSWExam[] = TOEIC_SW_BASE_EXAMS.map(createFullToeicSWExam);

// Score conversion: number correct -> approximate scaled score per section (0..495)
// Simplified linear curve based on ETS published distributions.
export function convertToScaledScore(numCorrect: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  const ratio = numCorrect / totalQuestions;
  // Floor of 5, ceiling 495, slight S-curve via easing.
  const eased = Math.pow(ratio, 0.92);
  return Math.round(5 + eased * 490);
}

export const PART_LABELS: Record<ToeicPart, string> = {
  1: "Part 1 — Photographs",
  2: "Part 2 — Question-Response",
  3: "Part 3 — Conversations",
  4: "Part 4 — Talks",
  5: "Part 5 — Incomplete Sentences",
  6: "Part 6 — Text Completion",
  7: "Part 7 — Reading Comprehension",
};
