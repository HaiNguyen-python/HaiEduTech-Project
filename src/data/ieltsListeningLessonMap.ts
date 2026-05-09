// Maps each ielts-listening lesson ID to the most relevant practice set ID.
import { ieltsListeningPracticeSets, type ListeningPracticeSet } from "./ieltsListeningPractice";

const byId = new Map(ieltsListeningPracticeSets.map(s => [s.id, s]));

// Lesson → practice-set mapping based on each lesson's topic / question type.
const LESSON_TO_SET: Record<string, string> = {
  "ielts-listening-1":  "form-completion-s1",   // Section 1 & 2: Everyday English
  "ielts-listening-2":  "matching-s3",          // Section 3: Academic Discussion
  "ielts-listening-3":  "sentence-completion-s4", // Section 4: Academic Lecture
  "ielts-listening-4":  "map-labelling-s2",     // Map & Diagram Labelling
  "ielts-listening-5":  "mcq-s2",               // Multiple Choice
  "ielts-listening-6":  "matching-s3",          // Matching & Classification
  "ielts-listening-7":  "form-completion-s1",   // Form & Note Completion
  "ielts-listening-8":  "sentence-completion-s4", // Signpost & Prediction
  "ielts-listening-9":  "mcq-s2",               // Distractors
  "ielts-listening-10": "sentence-completion-s4", // Sentence Completion
  "ielts-listening-11": "map-labelling-s2",     // Plan & Map (Advanced)
  "ielts-listening-12": "form-completion-s1",   // Form Completion Mastery
  "ielts-listening-13": "map-labelling-s2",     // Map & Plan Labelling
  "ielts-listening-14": "matching-s3",          // Section 3 - Academic Discussion
  "ielts-listening-15": "note-completion-s4",   // Section 4 - Lecture Note-taking
  "ielts-listening-16": "mcq-s2",               // Distractor Recognition
  "ielts-listening-17": "matching-s3",          // Connective Listening
  "ielts-listening-18": "form-completion-s1",   // Booking Conversation S1
  "ielts-listening-19": "mcq-s2",               // Tour Guide S2
  "ielts-listening-20": "matching-s3",          // S3 Academic Discussion
  "ielts-listening-21": "note-completion-s4",   // S4 University Lecture
};

export const getListeningPracticeForLesson = (lessonId: string): ListeningPracticeSet | null => {
  const setId = LESSON_TO_SET[lessonId];
  if (!setId) return null;
  return byId.get(setId) ?? null;
};
