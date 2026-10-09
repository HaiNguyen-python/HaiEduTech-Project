export type PteExamSkill = "speaking" | "writing" | "reading" | "listening";

export type PteScoringMethod = "objective" | "rubric" | "unscored";

export interface PteItemTypeBlueprint {
  id: string;
  name: string;
  section: "Speaking & Writing" | "Reading" | "Listening";
  primarySkill: PteExamSkill;
  contributesTo: PteExamSkill[];
  scoring: PteScoringMethod;
  available: boolean;
  practiceRoute?: string;
  note: string;
}

export const PTE_EXAM_BLUEPRINT: PteItemTypeBlueprint[] = [
  { id: "personal-introduction", name: "Personal Introduction", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: [], scoring: "unscored", available: false, note: "An unscored introduction recorded before the assessed tasks." },
  { id: "read-aloud", name: "Read Aloud", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking", "reading"], scoring: "rubric", available: true, practiceRoute: "/pte/speaking", note: "Read an academic text clearly with natural rhythm." },
  { id: "repeat-sentence", name: "Repeat Sentence", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking", "listening"], scoring: "rubric", available: true, practiceRoute: "/pte/speaking", note: "Repeat a sentence after hearing it once." },
  { id: "describe-image", name: "Describe Image", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking"], scoring: "rubric", available: true, practiceRoute: "/pte/speaking", note: "Describe the key information in a visual." },
  { id: "retell-lecture", name: "Re-tell Lecture", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking", "listening"], scoring: "rubric", available: true, practiceRoute: "/pte/speaking", note: "Retell the main points of an academic lecture." },
  { id: "answer-short-question", name: "Answer Short Question", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking", "listening"], scoring: "objective", available: false, note: "Give a short, precise spoken response." },
  { id: "respond-to-situation", name: "Respond to a Situation", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking"], scoring: "rubric", available: false, note: "Respond appropriately to a practical situation." },
  { id: "summarize-group-discussion", name: "Summarize Group Discussion", section: "Speaking & Writing", primarySkill: "speaking", contributesTo: ["speaking", "listening"], scoring: "rubric", available: false, note: "Summarize the viewpoints and outcome of a discussion." },
  { id: "summarize-written-text", name: "Summarize Written Text", section: "Speaking & Writing", primarySkill: "writing", contributesTo: ["writing", "reading"], scoring: "rubric", available: true, practiceRoute: "/pte/writing", note: "Write a one-sentence summary of a passage." },
  { id: "write-essay", name: "Write Essay", section: "Speaking & Writing", primarySkill: "writing", contributesTo: ["writing"], scoring: "rubric", available: true, practiceRoute: "/pte/writing", note: "Develop a focused academic argument." },
  { id: "reading-fill-dropdown", name: "Fill in the Blanks - Dropdown", section: "Reading", primarySkill: "reading", contributesTo: ["reading"], scoring: "objective", available: true, practiceRoute: "/pte/reading", note: "Choose the best word for each gap." },
  { id: "reading-multiple-answer", name: "Multiple Choice, Multiple Answers", section: "Reading", primarySkill: "reading", contributesTo: ["reading"], scoring: "objective", available: true, practiceRoute: "/pte/objective-practice", note: "Select every supported answer; incorrect selections can lose credit." },
  { id: "reorder-paragraphs", name: "Re-order Paragraphs", section: "Reading", primarySkill: "reading", contributesTo: ["reading"], scoring: "objective", available: true, practiceRoute: "/pte/reading", note: "Restore the logical order of a text." },
  { id: "reading-fill-drag-drop", name: "Fill in the Blanks - Drag and Drop", section: "Reading", primarySkill: "reading", contributesTo: ["reading", "writing"], scoring: "objective", available: false, note: "Place words from a shared pool into gaps." },
  { id: "reading-single-answer", name: "Multiple Choice, Single Answer", section: "Reading", primarySkill: "reading", contributesTo: ["reading"], scoring: "objective", available: true, practiceRoute: "/pte/objective-practice", note: "Select the single answer best supported by the text." },
  { id: "summarize-spoken-text", name: "Summarize Spoken Text", section: "Listening", primarySkill: "listening", contributesTo: ["listening", "writing"], scoring: "rubric", available: true, practiceRoute: "/pte/listening", note: "Write a concise summary after listening to a lecture." },
  { id: "listening-multiple-answer", name: "Multiple Choice, Multiple Answers", section: "Listening", primarySkill: "listening", contributesTo: ["listening"], scoring: "objective", available: false, note: "Select all answers supported by the recording." },
  { id: "listening-fill-blanks", name: "Fill in the Blanks", section: "Listening", primarySkill: "listening", contributesTo: ["listening", "writing"], scoring: "objective", available: false, note: "Complete a transcript while listening." },
  { id: "highlight-correct-summary", name: "Highlight Correct Summary", section: "Listening", primarySkill: "listening", contributesTo: ["listening", "reading"], scoring: "objective", available: false, note: "Choose the summary that best represents the recording." },
  { id: "listening-single-answer", name: "Multiple Choice, Single Answer", section: "Listening", primarySkill: "listening", contributesTo: ["listening"], scoring: "objective", available: false, note: "Choose one answer after listening." },
  { id: "select-missing-word", name: "Select Missing Word", section: "Listening", primarySkill: "listening", contributesTo: ["listening"], scoring: "objective", available: false, note: "Infer the missing final word or phrase." },
  { id: "highlight-incorrect-words", name: "Highlight Incorrect Words", section: "Listening", primarySkill: "listening", contributesTo: ["listening", "reading"], scoring: "objective", available: true, practiceRoute: "/pte/objective-practice", note: "Identify words that differ from the recording." },
  { id: "write-from-dictation", name: "Write from Dictation", section: "Listening", primarySkill: "listening", contributesTo: ["listening", "writing"], scoring: "objective", available: true, practiceRoute: "/pte/listening", note: "Type a sentence exactly after hearing it." },
];

export const PTE_SCORED_ITEM_TYPES = PTE_EXAM_BLUEPRINT.filter(item => item.scoring !== "unscored");

export const PTE_SECTION_TIMINGS = [
  { section: "Speaking & Writing", minutes: "76-84", itemTypes: 10 },
  { section: "Reading", minutes: "23-30", itemTypes: 5 },
  { section: "Listening", minutes: "31-39", itemTypes: 8 },
] as const;
