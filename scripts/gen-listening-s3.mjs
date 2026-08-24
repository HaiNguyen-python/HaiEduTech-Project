/**
 * Generates 17 new Section 3 listening sets (tutorial discussions, matching, 10 questions each).
 * Item format: [task statement, "A" | "B" | "C"]
 * @copyright 2026 HaiEduTech
 */
import fs from "fs";
import { q, transcriptLiteral, fileHeader } from "./listening-gen-lib.mjs";

const topics = [
  {
    id: "discussion-literature-review", title: "Tutorial: Dividing Up a Literature Review",
    titleVi: "Tutorial: Phân chia phần tổng quan tài liệu",
    names: ["Amelia", "Daniel", "Tutor"],
    intro: "Right, you two have a joint literature review due in four weeks. Let's agree exactly who does what.",
    close: "Good. Send me a shared document by Friday so I can see the structure.",
    items: [
      ["searching the online databases", "A"],
      ["reading the three key theoretical papers", "B"],
      ["building the reference list in the citation software", "A"],
      ["summarising the methodology debates", "B"],
      ["writing the introduction to the review", "A"],
      ["checking that every source is peer-reviewed", "C"],
      ["drafting the section on research gaps", "B"],
      ["proofreading the final version", "A"],
      ["approving the final structure before submission", "C"],
      ["preparing the short oral summary for the seminar", "B"],
    ],
  },
  {
    id: "discussion-questionnaire-design", title: "Tutorial: Designing a Student Questionnaire",
    titleVi: "Tutorial: Thiết kế bảng hỏi",
    names: ["Nour", "Felix", "Tutor"],
    intro: "So, the survey. You need a questionnaire that will actually get responses. Let's split the work.",
    close: "Excellent. Remember the pilot must happen before the main distribution.",
    items: [
      ["writing the demographic questions", "A"],
      ["designing the rating scales", "B"],
      ["piloting the questionnaire with ten students", "A"],
      ["checking the wording for bias", "C"],
      ["setting up the online survey form", "B"],
      ["writing the consent statement", "C"],
      ["contacting the departments for distribution", "A"],
      ["preparing the spreadsheet for the responses", "B"],
      ["analysing the pilot feedback", "A"],
      ["writing the summary of the pilot for the tutor", "B"],
    ],
  },
  {
    id: "discussion-group-presentation-split", title: "Tutorial: Splitting a Group Presentation",
    titleVi: "Tutorial: Phân chia bài thuyết trình nhóm",
    names: ["Isla", "Marcus", "Tutor"],
    intro: "You've got fifteen minutes for the presentation, so the timing matters as much as the content.",
    close: "Fine. Rehearse once with a timer before you present to the class.",
    items: [
      ["opening the presentation and setting out the aims", "A"],
      ["explaining the research method", "B"],
      ["preparing the slides", "A"],
      ["presenting the main findings", "B"],
      ["designing the summary diagram", "A"],
      ["timing the rehearsal", "C"],
      ["answering questions on the statistics", "B"],
      ["writing the handout for the audience", "A"],
      ["giving feedback on the draft slides", "C"],
      ["closing the presentation with the conclusions", "B"],
    ],
  },
  {
    id: "discussion-lab-report-rewrite", title: "Tutorial: Rewriting a Weak Lab Report",
    titleVi: "Tutorial: Viết lại báo cáo thí nghiệm",
    names: ["Theo", "Ruby", "Tutor"],
    intro: "Your first lab report lost marks for structure rather than science, so let's plan the rewrite carefully.",
    close: "Good plan. The resubmission deadline is the end of next week.",
    items: [
      ["rewriting the aims and hypothesis", "A"],
      ["redrawing the apparatus diagram", "B"],
      ["recalculating the percentage error", "A"],
      ["explaining what the marking criteria expect", "C"],
      ["rewriting the discussion of sources of error", "B"],
      ["adding the missing units to the results table", "A"],
      ["shortening the introduction", "B"],
      ["checking the report against the criteria", "C"],
      ["writing the final conclusion", "A"],
      ["formatting the references correctly", "B"],
    ],
  },
  {
    id: "discussion-placement-choice", title: "Tutorial: Choosing a Work Placement",
    titleVi: "Tutorial: Chọn nơi thực tập",
    names: ["Yusuf", "Clara", "Tutor"],
    intro: "You both need to confirm a placement by the end of the month, so let's talk through the options and the paperwork.",
    close: "Right. Both applications need to reach me before the twentieth.",
    items: [
      ["applying to the hospital laboratory", "A"],
      ["applying to the environmental consultancy", "B"],
      ["arranging the reference letters", "C"],
      ["preparing a skills-based CV", "A"],
      ["practising the telephone interview", "B"],
      ["checking the insurance requirements", "C"],
      ["visiting the placement site beforehand", "A"],
      ["writing the learning agreement", "B"],
      ["keeping the weekly reflective log", "A"],
      ["arranging the mid-placement visit", "C"],
    ],
  },
  {
    id: "discussion-data-analysis-problems", title: "Tutorial: Solving Problems in Data Analysis",
    titleVi: "Tutorial: Xử lý vấn đề phân tích dữ liệu",
    names: ["Elena", "Sam", "Tutor"],
    intro: "You said the numbers aren't behaving. Let's work out who tackles which problem.",
    close: "Sensible. Bring the cleaned dataset to next week's session.",
    items: [
      ["removing the duplicate responses", "A"],
      ["dealing with the missing values", "B"],
      ["recoding the reversed scale items", "A"],
      ["explaining which statistical test to use", "C"],
      ["running the correlation analysis", "B"],
      ["drawing the scatter plots", "A"],
      ["checking the assumptions of the test", "C"],
      ["writing up the results section", "B"],
      ["labelling the figures and tables", "A"],
      ["backing up the dataset securely", "B"],
    ],
  },
  {
    id: "discussion-module-selection", title: "Tutorial: Selecting Optional Modules",
    titleVi: "Tutorial: Chọn môn học tự chọn",
    names: ["Harper", "Ivan", "Tutor"],
    intro: "Module choices close on Friday, so let's make sure you both understand the consequences of each option.",
    close: "Good. Confirm your choices on the portal, not by email.",
    items: [
      ["choosing the statistics module", "A"],
      ["choosing the field-work module", "B"],
      ["explaining the assessment pattern of each module", "C"],
      ["checking the timetable for clashes", "A"],
      ["asking last year's students about the workload", "B"],
      ["confirming the prerequisites", "C"],
      ["deciding whether to take the language option", "A"],
      ["reading the module handbooks", "B"],
      ["submitting the choices on the portal", "A"],
      ["signing the change-of-module form", "C"],
    ],
  },
  {
    id: "discussion-poster-session", title: "Tutorial: Preparing for a Research Poster Session",
    titleVi: "Tutorial: Chuẩn bị buổi trưng bày poster",
    names: ["Zoe", "Adrian", "Tutor"],
    intro: "The poster session is in a fortnight. Posters are judged on clarity, not on how much text you can fit.",
    close: "Right. Send me a draft layout on Monday and I'll comment.",
    items: [
      ["writing the abstract for the poster", "A"],
      ["designing the layout", "B"],
      ["choosing the colour scheme", "B"],
      ["producing the graphs", "A"],
      ["advising on the font sizes", "C"],
      ["printing the poster", "B"],
      ["preparing the two-minute spoken summary", "A"],
      ["booking the display board", "C"],
      ["writing the take-away handout", "A"],
      ["photographing the poster for the portfolio", "B"],
    ],
  },
  {
    id: "discussion-ethics-approval", title: "Tutorial: Getting Ethics Approval for a Study",
    titleVi: "Tutorial: Xin phê duyệt đạo đức nghiên cứu",
    names: ["Bianca", "Louis", "Tutor"],
    intro: "Nothing can start until the ethics form is approved, so let's work through the sections.",
    close: "Good. The committee meets on the first Tuesday of the month.",
    items: [
      ["writing the participant information sheet", "A"],
      ["drafting the consent form", "B"],
      ["explaining the committee's timetable", "C"],
      ["describing how data will be stored", "A"],
      ["listing the possible risks to participants", "B"],
      ["arranging anonymous coding of the data", "A"],
      ["signing the supervisor declaration", "C"],
      ["writing the debriefing statement", "B"],
      ["submitting the completed form", "A"],
      ["checking the form against the university policy", "C"],
    ],
  },
  {
    id: "discussion-case-study", title: "Tutorial: Working on a Business Case Study",
    titleVi: "Tutorial: Làm bài case study kinh doanh",
    names: ["Mina", "Callum", "Tutor"],
    intro: "This case study is deliberately open-ended. The marks come from your reasoning, not from finding one right answer.",
    close: "Fine. I'd like a one-page outline from each of you by Thursday.",
    items: [
      ["analysing the company's financial figures", "A"],
      ["researching the competitors", "B"],
      ["explaining the marking criteria", "C"],
      ["writing the SWOT analysis", "A"],
      ["interviewing a manager from the sector", "B"],
      ["preparing the recommendations", "A"],
      ["checking the word count and format", "C"],
      ["writing the executive summary", "B"],
      ["drawing the process diagram", "A"],
      ["editing the final document", "B"],
    ],
  },
  {
    id: "discussion-field-survey", title: "Tutorial: Planning a Geography Field Survey",
    titleVi: "Tutorial: Lên kế hoạch khảo sát thực địa",
    names: ["Rosa", "Ben", "Tutor"],
    intro: "You have two days in the field, so preparation is everything. Let's confirm the tasks.",
    close: "Good. Check the weather forecast the night before you travel.",
    items: [
      ["booking the field equipment", "A"],
      ["planning the sampling points", "B"],
      ["explaining the risk assessment rules", "C"],
      ["recording the water measurements", "A"],
      ["photographing the sites", "B"],
      ["keeping the field notebook", "A"],
      ["arranging the minibus", "C"],
      ["entering the data into the spreadsheet", "B"],
      ["drawing the site sketch maps", "A"],
      ["writing the field-work summary", "B"],
    ],
  },
  {
    id: "discussion-dissertation-timeline", title: "Tutorial: Setting a Dissertation Timeline",
    titleVi: "Tutorial: Lập tiến độ luận văn",
    names: ["Priya", "Nathan", "Tutor"],
    intro: "The dissertation is long, so the timeline matters more than the title. Let's break it down.",
    close: "Good. I'll expect a chapter draft every three weeks.",
    items: [
      ["finalising the research question", "A"],
      ["completing the reading by the end of month one", "B"],
      ["approving the timeline", "C"],
      ["collecting the data in month two", "A"],
      ["writing the methods chapter first", "B"],
      ["booking the monthly supervision meetings", "C"],
      ["drafting the results chapter in month four", "A"],
      ["arranging proofreading in the final month", "B"],
      ["preparing the appendices", "A"],
      ["submitting the electronic and printed copies", "B"],
    ],
  },
  {
    id: "discussion-coding-project", title: "Tutorial: Managing a Software Coursework Project",
    titleVi: "Tutorial: Quản lý dự án lập trình",
    names: ["Aisha", "Leo", "Tutor"],
    intro: "For this project the process is assessed as well as the product, so version control is not optional.",
    close: "Right. Commit at least twice a week so I can see progress.",
    items: [
      ["setting up the shared repository", "A"],
      ["writing the user interface code", "B"],
      ["explaining how the code will be assessed", "C"],
      ["designing the database structure", "A"],
      ["writing the unit tests", "B"],
      ["documenting the functions", "A"],
      ["reviewing the code quality", "C"],
      ["fixing the reported bugs", "B"],
      ["writing the user guide", "A"],
      ["preparing the demonstration video", "B"],
    ],
  },
  {
    id: "discussion-interview-transcripts", title: "Tutorial: Handling Interview Transcripts",
    titleVi: "Tutorial: Xử lý bản ghi phỏng vấn",
    names: ["Freya", "Kofi", "Tutor"],
    intro: "You have twelve interviews recorded. Transcription always takes longer than students expect, so plan it properly.",
    close: "Good. Keep the recordings on the encrypted drive only.",
    items: [
      ["transcribing the first six interviews", "A"],
      ["transcribing the remaining interviews", "B"],
      ["explaining the coding framework", "C"],
      ["anonymising the participant names", "A"],
      ["identifying the main themes", "B"],
      ["choosing the illustrative quotations", "A"],
      ["checking the reliability of the coding", "C"],
      ["writing the thematic analysis", "B"],
      ["storing the files securely", "A"],
      ["deleting the recordings after submission", "B"],
    ],
  },
  {
    id: "discussion-exchange-semester", title: "Tutorial: Preparing for an Exchange Semester",
    titleVi: "Tutorial: Chuẩn bị kỳ trao đổi",
    names: ["Tomas", "Layla", "Tutor"],
    intro: "You leave in September, so there is quite a bit of administration to sort out before then.",
    close: "Fine. Come back to me once the host university replies.",
    items: [
      ["completing the learning agreement", "A"],
      ["arranging the accommodation abroad", "B"],
      ["confirming which credits will transfer", "C"],
      ["applying for the travel grant", "A"],
      ["taking the language placement test", "B"],
      ["signing the credit-transfer form", "C"],
      ["booking the flights", "A"],
      ["arranging health insurance", "B"],
      ["registering with the host university", "A"],
      ["preparing the pre-departure presentation", "B"],
    ],
  },
  {
    id: "discussion-group-conflict", title: "Tutorial: Resolving Problems in a Group Project",
    titleVi: "Tutorial: Giải quyết vấn đề làm việc nhóm",
    names: ["Owen", "Sara", "Tutor"],
    intro: "You've told me the group work isn't going smoothly. Let's fix the process rather than blame anyone.",
    close: "Good. I'll review the agreement at our next meeting.",
    items: [
      ["writing a clear group agreement", "A"],
      ["taking minutes at each meeting", "B"],
      ["mediating the disagreement over roles", "C"],
      ["setting internal deadlines", "A"],
      ["checking that tasks are shared fairly", "C"],
      ["updating the shared task list", "B"],
      ["chairing the weekly meeting", "A"],
      ["contacting the member who missed sessions", "B"],
      ["recording individual contributions", "A"],
      ["writing the group reflection", "B"],
    ],
  },
  {
    id: "discussion-viva-preparation", title: "Tutorial: Preparing for an Oral Examination",
    titleVi: "Tutorial: Chuẩn bị vấn đáp",
    names: ["Nadia", "Hugo", "Tutor"],
    intro: "The oral exam lasts twenty minutes each. It's a discussion, not a test of memory.",
    close: "Good. Practise out loud, not just in your head.",
    items: [
      ["preparing a two-minute summary of the project", "A"],
      ["listing the likely questions", "B"],
      ["explaining how the examiners will assess you", "C"],
      ["rehearsing answers about the methodology", "A"],
      ["revising the key statistics", "B"],
      ["arranging a mock oral exam", "C"],
      ["preparing the limitations of the study", "A"],
      ["practising with a recording", "B"],
      ["preparing questions for the examiners", "A"],
      ["checking the room and time of the exam", "B"],
    ],
  },
];

const openersA = [
  "I'm happy to take on", "I'll do", "I don't mind doing", "I'll take care of",
  "I'd like to handle", "Let me deal with",
];
const openersB = [
  "Then I'll take", "I can manage", "I'll handle", "That leaves me with",
  "I'll look after", "I'll take on",
];
const openersC = [
  "I'll do that myself -", "Leave", "I'll take responsibility for",
  "That one is my job -", "I'll deal with",
];

function buildSet(t, ti) {
  const [nameA, nameB, nameC] = t.names;
  const lines = [`${nameC}: ${t.intro}`];
  let ca = 0, cb = 0, cc = 0;
  t.items.forEach(([statement, who]) => {
    if (who === "A") {
      lines.push(`${nameA}: ${openersA[ca++ % openersA.length]} ${statement}.`);
    } else if (who === "B") {
      lines.push(`${nameB}: ${openersB[cb++ % openersB.length]} ${statement}.`);
    } else {
      const op = openersC[cc++ % openersC.length];
      lines.push(`${nameC}: ${op === "Leave" ? `Leave ${statement} to me.` : `${op} ${statement}.`}`);
    }
  });
  lines.push(`${nameC}: ${t.close}`);

  const questions = t.items.map(([statement, who]) => ({
    prompt: `${statement.charAt(0).toUpperCase()}${statement.slice(1)}: ___`,
    answer: who,
  }));

  return `  {
    id: ${q(t.id)},
    section: 3,
    questionType: "Matching",
    questionTypeVi: "Ghép câu - chọn chữ cái",
    title: ${q(t.title)},
    titleVi: ${q(t.titleVi)},
    context: ${q(`You will hear two students and their tutor dividing up the work. Match each task with the person responsible. Write A, B or C. (A = ${nameA}, B = ${nameB}, C = ${nameC})`)},
    contextVi: ${q(`Bạn sẽ nghe hai sinh viên và giảng viên phân chia công việc. Ghép mỗi nhiệm vụ với người phụ trách: A = ${nameA}, B = ${nameB}, C = ${nameC}.`)},
    matchingOptions: [
      { letter: "A", text: ${q(nameA)} },
      { letter: "B", text: ${q(nameB)} },
      { letter: "C", text: ${q(nameC)} },
    ],
    transcript:
${transcriptLiteral(lines)},
    rate: 0.9,
    questions: [
${questions.map(qq => `      { type: "matching", prompt: ${q(qq.prompt)}, answer: ${q(qq.answer)} },`).join("\n")}
    ],
  },`;
}

const body = topics.map(buildSet).join("\n\n");
const out = `${fileHeader(
  "ieltsListeningPracticeExpansion10.ts",
  "Wave 10 - 17 new Section 3 sets (tutorial discussions, 10 matching questions each) so IELTS Listening reaches 30 unique Section 3 recordings."
)}
export const ieltsListeningPracticeSetsExpansion10: ListeningPracticeSet[] = [
${body}
];
`;
fs.writeFileSync("src/data/ieltsListeningPracticeExpansion10.ts", out);
console.log("wrote src/data/ieltsListeningPracticeExpansion10.ts", topics.length, "sets");
