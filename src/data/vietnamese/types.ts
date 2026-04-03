// Vietnamese curriculum shared types

export interface VietnameseVocabEntry {
  word: string;
  meaning: string;
  meaningEn: string;
  example: string;
  exampleEn: string;
  partOfSpeech?: string;
  ipa?: string;
  literalMeaning?: string;
  literalMeaningEn?: string;
}

export interface VietnameseQuizQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationEn: string;
}

export interface VietnameseLesson {
  id: string;
  title: string;
  titleEn: string;
  level: "beginner" | "intermediate" | "advanced";
  theory: string;
  theoryEn: string;
  vocabulary: VietnameseVocabEntry[];
  quiz: VietnameseQuizQuestion[];
  proTips?: string[];
  proTipsEn?: string[];
  teacherInsight?: string;
  teacherInsightEn?: string;
}

export interface VietnameseModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  category: "grammar" | "vocabulary" | "reading" | "speaking" | "folklore";
  lessons: VietnameseLesson[];
}

export interface HistoryEvent {
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

// Segment for illustrated story cards
export interface StorySegment {
  title: string;
  titleEn: string;
  text: string;
  textEn: string;
  imageUrl?: string;
  icon?: string; // Lucide icon name for visual variety per segment
}

export interface HistoryLesson {
  id: string;
  title: string;
  titleEn: string;
  story: string;
  storyEn: string;
  storySegments?: StorySegment[];
  videoUrl?: string;
  keyDates: HistoryEvent[];
  quiz: VietnameseQuizQuestion[];
}

export interface HistoryMonth {
  id: string;
  month: number;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  lessons: HistoryLesson[];
}

export interface FactOrMythItem {
  id: string;
  statement: string;
  statementEn: string;
  isFact: boolean;
  explanation: string;
  explanationEn: string;
  category: "history" | "culture" | "geography";
}

export interface FolkloreItem {
  id: string;
  title: string;
  titleEn: string;
  type: "ca-dao" | "tuc-ngu" | "truyen-co";
  content: string;
  contentEn: string;
  grammarNote: string;
  grammarNoteEn: string;
  meaning: string;
  meaningEn: string;
}
