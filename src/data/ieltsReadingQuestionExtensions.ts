/**
 * @file ieltsReadingQuestionExtensions.ts
 * @description Adds extra questions to legacy short exams (rx-1, rx-2) so
 *   that every passage carries 13-14 questions like the real Cambridge IELTS
 *   Academic Reading paper. A full 3-passage test then reaches ≥40 questions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReadingQuestion } from "./ieltsFullReadingExams";

export const READING_QUESTION_EXTENSIONS: Record<string, ReadingQuestion[]> = {
  "rx-1": [
    {
      number: 11,
      type: "multiple-choice",
      prompt: "Which of the following best describes the IEA's view on the energy transition?",
      options: [
        "Slower than expected",
        "Inevitable but already complete",
        "Faster than predicted a decade ago",
        "Largely irrelevant to public opinion",
      ],
      answer: "Faster than predicted a decade ago",
      explanation: "Paragraph A: analysts called the shift inevitable and faster than many had predicted.",
    },
    {
      number: 12,
      type: "multiple-choice",
      prompt: "What do supporters of large storage investment say will outweigh the upfront cost?",
      options: [
        "Higher electricity prices",
        "Lower fuel imports, cleaner air, less climate damage",
        "Cheaper natural-gas plants",
        "More jobs in coal mining",
      ],
      answer: "Lower fuel imports, cleaner air, less climate damage",
      explanation: "Paragraph D lists these long-term savings explicitly.",
    },
    {
      number: 13,
      type: "fill-blank",
      prompt: "Complete: 'Young people rate climate change among their top ___ concerns.'",
      answer: "three",
    },
    {
      number: 14,
      type: "fill-blank",
      prompt: "Complete: 'Promising new storage tech includes iron-air batteries and ___ storage.'",
      answer: "gravity",
    },
  ],
  "rx-2": [
    {
      number: 11,
      type: "multiple-choice",
      prompt: "What invention disrupted the link between sleep and sunlight?",
      options: ["The steam engine", "Artificial lighting", "The mechanical clock", "Radio broadcasting"],
      answer: "Artificial lighting",
      explanation: "Paragraph A: artificial lighting in the late 19th century severed the connection.",
    },
    {
      number: 12,
      type: "multiple-choice",
      prompt: "According to the passage, exhaustion in many cultures is treated as:",
      options: ["A serious illness", "A badge of honour", "A legal violation", "Pure laziness"],
      answer: "A badge of honour",
      explanation: "Paragraph C: exhaustion is worn as a badge of honour.",
    },
    {
      number: 13,
      type: "fill-blank",
      prompt: "Complete: 'A cool, ___ bedroom is recommended for better sleep.'",
      answer: "dark",
    },
    {
      number: 14,
      type: "fill-blank",
      prompt: "Complete: 'The biggest challenge is the willingness to ___ the advice.'",
      answer: "follow",
    },
  ],
};
