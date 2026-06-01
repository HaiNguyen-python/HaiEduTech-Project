// Catalog of lessons/exercises that Teacher Hai can assign as homework.
// Each entry maps to an internal route that students will follow when opening
// the assignment from their dashboard. Entries cover both "Exercises / Tests"
// (practice & assessment) and "Lessons" (deep-review study material).

export interface CatalogLesson {
  id: string;
  title: string;
  route: string;
  level?: string;
}

export const ASSIGNMENT_LESSON_CATALOG: Record<string, CatalogLesson[]> = {
  ai_academy: [
    // --- Lessons (deep study) ---
    { id: "ai-l-1", title: "Lesson 1: Thị giác máy tính (Computer Vision)", route: "/programming/ai-academy/lesson-1" },
    { id: "ai-l-2", title: "Lesson 2: Xử lý ngôn ngữ tự nhiên (NLP)", route: "/programming/ai-academy/lesson-2" },
    { id: "ai-l-3", title: "Lesson 3: Machine Learning căn bản", route: "/programming/ai-academy/lesson-3" },
    { id: "ai-l-4", title: "Lesson 4: Deep Learning & mạng nơ-ron", route: "/programming/ai-academy/lesson-4" },
    { id: "ai-l-5", title: "Lesson 5: Học tăng cường (Reinforcement Learning)", route: "/programming/ai-academy/lesson-5" },
    { id: "ai-l-6", title: "Lesson 6: Generative AI & LLMs", route: "/programming/ai-academy/lesson-6" },
    { id: "ai-l-7", title: "Lesson 7: Đạo đức AI & AI có trách nhiệm", route: "/programming/ai-academy/lesson-7" },
    { id: "ai-l-8", title: "Lesson 8: Prompt Engineering", route: "/programming/ai-academy/lesson-8" },
    { id: "ai-l-9", title: "Lesson 9: AI Agents & Tool Use", route: "/programming/ai-academy/lesson-9" },
    { id: "ai-l-10", title: "Lesson 10: RAG & Vector Databases", route: "/programming/ai-academy/lesson-10" },
    { id: "ai-l-11", title: "Lesson 11: Fine-tuning & Transfer Learning", route: "/programming/ai-academy/lesson-11" },
    { id: "ai-l-12", title: "Lesson 12: AI in Production (MLOps)", route: "/programming/ai-academy/lesson-12" },
    // --- Exercises / practice hubs ---
    { id: "ai-ex-python", title: "Practice: Python Coding Challenges", route: "/programming/python-challenges" },
    { id: "ai-ex-lab", title: "Practice: Programming Lab Playground", route: "/programming" },
  ],
  english: [
    // --- Lessons (review) ---
    { id: "en-l-ielts-lectures", title: "Lesson: IELTS Lectures (4 pillars)", route: "/ielts/lectures", level: "IELTS" },
    { id: "en-l-toeic-lectures", title: "Lesson: TOEIC Masterclass (Parts 1-7)", route: "/toeic/lectures", level: "TOEIC" },
    { id: "en-l-cambridge-lectures", title: "Lesson: Cambridge Lectures (Starters → PET)", route: "/cambridge/lectures", level: "Cambridge" },
    { id: "en-l-grammar", title: "Lesson: English Grammar - Full Modules", route: "/english-grammar", level: "All" },
    { id: "en-l-thpt-lessons", title: "Lesson: National THPT Tactical Modules", route: "/national-exam-prep", level: "THPT" },
    { id: "en-l-sat-roadmap", title: "Lesson: SAT Curriculum & Roadmap", route: "/sat/curriculum", level: "SAT" },
    { id: "en-l-pronunciation", title: "Lesson: Pronunciation & Intonation", route: "/english-pronunciation", level: "All" },
    { id: "en-l-conv", title: "Lesson: Conversational English (38 lessons)", route: "/conversational-dashboard", level: "Conversation" },
    // --- Exercises / tests ---
    { id: "en-ex-ielts-reading", title: "Exercise: IELTS Reading Practice", route: "/ielts/reading-practice", level: "IELTS" },
    { id: "en-ex-ielts-listening", title: "Exercise: IELTS Listening Practice", route: "/ielts/listening-practice", level: "IELTS" },
    { id: "en-ex-ielts-writing", title: "Exercise: IELTS Writing Skills", route: "/ielts/writing-practice", level: "IELTS" },
    { id: "en-ex-ielts-speaking", title: "Exercise: IELTS Speaking Practice", route: "/ielts/speaking-practice", level: "IELTS" },
    { id: "en-ex-ielts-vocab", title: "Exercise: IELTS Vocabulary Bank", route: "/ielts/vocabulary", level: "IELTS" },
    { id: "en-ex-toeic-vocab", title: "Exercise: TOEIC Vocabulary System", route: "/toeic/vocabulary", level: "TOEIC" },
    { id: "en-ex-toeic-exams", title: "Exercise: TOEIC Mock Exams", route: "/toeic/exams", level: "TOEIC" },
    { id: "en-ex-pet", title: "Exercise: Cambridge PET Mock Exam", route: "/cambridge/mock-exam", level: "PET" },
    { id: "en-ex-ket", title: "Exercise: Cambridge KET Test Prep", route: "/cambridge/yle-test-prep", level: "KET" },
    { id: "en-ex-thpt", title: "Exercise: National THPT 20 Mock Exams", route: "/national-exam-prep", level: "THPT" },
    { id: "en-ex-sat", title: "Exercise: SAT Mock Exam", route: "/sat/mock-exam", level: "SAT" },
  ],
  chinese: [
    // --- Lessons (review) ---
    { id: "zh-l-grammar", title: "Lesson: HSK Grammar Modules", route: "/hsk/grammar", level: "All HSK" },
    { id: "zh-l-hub", title: "Lesson: HSK Vocabulary Hub (1100+ words)", route: "/hsk/hub", level: "All HSK" },
    { id: "zh-l-conv", title: "Lesson: Conversational Chinese (18 lessons)", route: "/chinese-conversational-dashboard", level: "Beginner" },
    { id: "zh-l-level-guide", title: "Lesson: HSK Level Guide", route: "/hsk/level-guide", level: "All HSK" },
    // --- Exercises / tests ---
    { id: "zh-ex-hsk1", title: "Exercise: HSK 1 Mock Test", route: "/hsk/test-room?level=1", level: "HSK1" },
    { id: "zh-ex-hsk2", title: "Exercise: HSK 2 Mock Test", route: "/hsk/test-room?level=2", level: "HSK2" },
    { id: "zh-ex-hsk3", title: "Exercise: HSK 3 Mock Test", route: "/hsk/test-room?level=3", level: "HSK3" },
    { id: "zh-ex-hsk4", title: "Exercise: HSK 4 Mock Test", route: "/hsk/test-room?level=4", level: "HSK4" },
    { id: "zh-ex-hsk5", title: "Exercise: HSK 5 Mock Test", route: "/hsk/test-room?level=5", level: "HSK5" },
    { id: "zh-ex-hsk6", title: "Exercise: HSK 6 Mock Test", route: "/hsk/test-room?level=6", level: "HSK6" },
    { id: "zh-ex-reading", title: "Exercise: Chinese Reading Practice", route: "/chinese/reading", level: "Intermediate" },
    { id: "zh-ex-listening", title: "Exercise: Chinese Listening Practice", route: "/chinese/listening", level: "Intermediate" },
  ],
  scratch: [
    // --- Lessons (project briefs) ---
    { id: "sc-l-1", title: "Lesson: Mission 1 Brief - Maze Runner", route: "/programming/scratch/mission-1" },
    { id: "sc-l-2", title: "Lesson: Mission 2 Brief - Catch the Stars", route: "/programming/scratch/mission-2" },
    { id: "sc-l-3", title: "Lesson: Mission 3 Brief - Animated Story", route: "/programming/scratch/mission-3" },
    { id: "sc-l-4", title: "Lesson: Mission 4 Brief - Pong Arcade", route: "/programming/scratch/mission-4" },
    { id: "sc-l-5", title: "Lesson: Mission 5 Brief - Quiz Show", route: "/programming/scratch/mission-5" },
    { id: "sc-l-6", title: "Lesson: Mission 6 Brief - Platformer", route: "/programming/scratch/mission-6" },
    // --- Exercises (build & submit) ---
    { id: "sc-ex-1", title: "Exercise: Build Mission 1 - Maze Runner Game", route: "/programming/scratch/mission-1" },
    { id: "sc-ex-2", title: "Exercise: Build Mission 2 - Catch the Falling Stars", route: "/programming/scratch/mission-2" },
    { id: "sc-ex-3", title: "Exercise: Build Mission 3 - Animated Story Scene", route: "/programming/scratch/mission-3" },
    { id: "sc-ex-4", title: "Exercise: Build Mission 4 - Pong-style Arcade", route: "/programming/scratch/mission-4" },
    { id: "sc-ex-5", title: "Exercise: Build Mission 5 - Quiz Show Game", route: "/programming/scratch/mission-5" },
    { id: "sc-ex-6", title: "Exercise: Build Mission 6 - Platformer Adventure", route: "/programming/scratch/mission-6" },
  ],
  other: [],
};
