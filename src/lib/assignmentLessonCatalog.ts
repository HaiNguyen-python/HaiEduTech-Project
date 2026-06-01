// Catalog of lessons/exercises that Teacher Hai can assign as homework.
// Each entry maps to an internal route that students will follow when opening
// the assignment from their dashboard.

export interface CatalogLesson {
  id: string;
  title: string;
  route: string;
  level?: string;
}

export const ASSIGNMENT_LESSON_CATALOG: Record<string, CatalogLesson[]> = {
  ai_academy: [
    { id: "ai-1", title: "Lesson 1: Thị giác máy tính (Computer Vision)", route: "/programming/ai-academy/lesson-1" },
    { id: "ai-2", title: "Lesson 2: Xử lý ngôn ngữ tự nhiên (NLP)", route: "/programming/ai-academy/lesson-2" },
    { id: "ai-3", title: "Lesson 3: Machine Learning căn bản", route: "/programming/ai-academy/lesson-3" },
    { id: "ai-4", title: "Lesson 4: Deep Learning & mạng nơ-ron", route: "/programming/ai-academy/lesson-4" },
    { id: "ai-5", title: "Lesson 5: Học tăng cường (Reinforcement Learning)", route: "/programming/ai-academy/lesson-5" },
    { id: "ai-6", title: "Lesson 6: Generative AI & LLMs", route: "/programming/ai-academy/lesson-6" },
    { id: "ai-7", title: "Lesson 7: Đạo đức AI & AI có trách nhiệm", route: "/programming/ai-academy/lesson-7" },
    { id: "ai-8", title: "Lesson 8: Prompt Engineering", route: "/programming/ai-academy/lesson-8" },
    { id: "ai-9", title: "Lesson 9: AI Agents & Tool Use", route: "/programming/ai-academy/lesson-9" },
    { id: "ai-10", title: "Lesson 10: RAG & Vector Databases", route: "/programming/ai-academy/lesson-10" },
    { id: "ai-11", title: "Lesson 11: Fine-tuning & Transfer Learning", route: "/programming/ai-academy/lesson-11" },
    { id: "ai-12", title: "Lesson 12: AI in Production (MLOps)", route: "/programming/ai-academy/lesson-12" },
  ],
  english: [
    { id: "en-ielts-reading", title: "IELTS - Reading Practice", route: "/ielts/reading-practice", level: "IELTS" },
    { id: "en-ielts-listening", title: "IELTS - Listening Practice", route: "/ielts/listening-practice", level: "IELTS" },
    { id: "en-ielts-writing", title: "IELTS - Writing Skills", route: "/ielts/writing-practice", level: "IELTS" },
    { id: "en-ielts-speaking", title: "IELTS - Speaking Practice", route: "/ielts/speaking-practice", level: "IELTS" },
    { id: "en-ielts-vocab", title: "IELTS - Vocabulary Bank", route: "/ielts/vocabulary", level: "IELTS" },
    { id: "en-toeic-vocab", title: "TOEIC - Vocabulary System", route: "/toeic/vocabulary", level: "TOEIC" },
    { id: "en-toeic-exams", title: "TOEIC - Mock Exams", route: "/toeic/exams", level: "TOEIC" },
    { id: "en-pet-test", title: "Cambridge PET - Mock Exam", route: "/cambridge/mock-exam", level: "PET" },
    { id: "en-ket-test", title: "Cambridge KET - Test Prep", route: "/cambridge/yle-test-prep", level: "KET" },
    { id: "en-grammar", title: "English Grammar - Full Modules", route: "/english-grammar", level: "All" },
    { id: "en-thpt", title: "National Exam (THPT) - Practice", route: "/national-exam-prep", level: "THPT" },
    { id: "en-sat", title: "SAT - Curriculum & Practice", route: "/sat/curriculum", level: "SAT" },
  ],
  chinese: [
    { id: "zh-hsk1", title: "HSK 1 - Mock Test", route: "/hsk/test-room?level=1", level: "HSK1" },
    { id: "zh-hsk2", title: "HSK 2 - Mock Test", route: "/hsk/test-room?level=2", level: "HSK2" },
    { id: "zh-hsk3", title: "HSK 3 - Mock Test", route: "/hsk/test-room?level=3", level: "HSK3" },
    { id: "zh-hsk4", title: "HSK 4 - Mock Test", route: "/hsk/test-room?level=4", level: "HSK4" },
    { id: "zh-hsk5", title: "HSK 5 - Mock Test", route: "/hsk/test-room?level=5", level: "HSK5" },
    { id: "zh-hsk6", title: "HSK 6 - Mock Test", route: "/hsk/test-room?level=6", level: "HSK6" },
    { id: "zh-hsk-vocab", title: "HSK Vocabulary Bank", route: "/hsk/hub", level: "All HSK" },
    { id: "zh-grammar", title: "HSK Grammar Modules", route: "/hsk/grammar", level: "All HSK" },
    { id: "zh-reading", title: "Chinese Reading Practice", route: "/chinese/reading", level: "Intermediate" },
    { id: "zh-listening", title: "Chinese Listening Practice", route: "/chinese/listening", level: "Intermediate" },
    { id: "zh-conv", title: "Conversational Chinese", route: "/chinese-conversational-dashboard", level: "Beginner" },
  ],
  scratch: [
    { id: "sc-1", title: "Mission 1: Maze Runner Game", route: "/programming/scratch/mission-1" },
    { id: "sc-2", title: "Mission 2: Catch the Falling Stars", route: "/programming/scratch/mission-2" },
    { id: "sc-3", title: "Mission 3: Animated Story Scene", route: "/programming/scratch/mission-3" },
    { id: "sc-4", title: "Mission 4: Pong-style Arcade", route: "/programming/scratch/mission-4" },
    { id: "sc-5", title: "Mission 5: Quiz Show Game", route: "/programming/scratch/mission-5" },
    { id: "sc-6", title: "Mission 6: Platformer Adventure", route: "/programming/scratch/mission-6" },
  ],
  other: [],
};
