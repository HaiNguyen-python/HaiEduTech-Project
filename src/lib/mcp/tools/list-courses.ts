import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const COURSES = [
  { id: "ielts", title: "IELTS Preparation", url: "/ielts", description: "Full IELTS coaching: reading, listening, speaking, writing, vocab bank." },
  { id: "toeic", title: "TOEIC Masterclass", url: "/toeic", description: "TOEIC Parts 1-7 with trap alerts and business vocabulary." },
  { id: "hsk", title: "HSK Chinese", url: "/hsk", description: "HSK 1-6 grammar, vocabulary and mock tests with stroke animations." },
  { id: "cambridge", title: "Cambridge YLE", url: "/cambridge", description: "Starters to PET lectures and 10 mock exams." },
  { id: "sat", title: "SAT Prep", url: "/sat", description: "SAT roadmap, exercises, exams, and daily warmups." },
  { id: "pte", title: "PTE Academic", url: "/pte", description: "PTE listening, reading, writing modules with scoring." },
  { id: "thpt", title: "Vietnamese National Exam (THPT)", url: "/national-exam-prep", description: "20 mock exams and 5 tactical modules for THPT English." },
  { id: "vietnamese-foreigners", title: "Vietnamese for Foreigners (VFF)", url: "/learn-vietnamese/for-foreigners", description: "A1-B1 CEFR track with AI roleplay, writing grader, video immersion." },
  { id: "vietnamese-kids", title: "Learn Vietnamese", url: "/learn-vietnamese", description: "Alphabet, poetry, folklore, dictation, cuisine, culture, films." },
  { id: "finnish", title: "Finnish / YKI", url: "/finnish", description: "Finnish beginner + YKI A2/B1 prep with speaking coach." },
  { id: "swedish", title: "Swedish / Svenskfinland", url: "/swedish", description: "Swedish beginner + YKI A2/B1 modules." },
  { id: "english-grammar", title: "English Grammar", url: "/english-grammar", description: "9 modules, 30 lessons of interactive grammar." },
  { id: "conversational-english", title: "Conversational English", url: "/conversational", description: "38 lessons with dual-speed TTS." },
  { id: "conversational-chinese", title: "Conversational Chinese", url: "/chinese-conversational", description: "18 lessons with Hanzi + Pinyin + VI." },
  { id: "programming", title: "Programming Lab", url: "/programming", description: "Scratch, Python, SQL, ML, Spark - taught in Vietnamese." },
  { id: "scholarships", title: "Global Scholarship Hub", url: "/scholarships", description: "60+ ICT/EdTech scholarships with AI advisor." },
  { id: "counseling", title: "Counseling Hub", url: "/dashboard", description: "Compass AI career/mood/IKIGAI/MBTI/Holland counseling." },
];

export default defineTool({
  name: "list_courses",
  title: "List HaiEduTech courses",
  description: "List all learning tracks available on HaiEduTech (IELTS, TOEIC, HSK, Vietnamese, Finnish, Swedish, programming, scholarships, etc.) with URLs and short descriptions.",
  inputSchema: {
    filter: z.string().optional().describe("Optional substring to filter course id / title / description (case-insensitive)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ filter }) => {
    const f = filter?.toLowerCase().trim();
    const items = f
      ? COURSES.filter((c) => `${c.id} ${c.title} ${c.description}`.toLowerCase().includes(f))
      : COURSES;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { courses: items, count: items.length },
    };
  },
});
