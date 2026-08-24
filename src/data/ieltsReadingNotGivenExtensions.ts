/**
 * @file ieltsReadingNotGivenExtensions.ts
 * @description Adds one authentic NOT GIVEN item to hard passages whose
 *   TRUE/FALSE or YES/NO set previously offered only two possible keys. Real
 *   Cambridge papers always keep NOT GIVEN live, which is what stops students
 *   from guessing by pattern. Each statement below is deliberately plausible
 *   but is never addressed anywhere in the passage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReadingQuestion } from "./ieltsFullReadingExams";

const tf = (number: number, prompt: string, explanation: string): ReadingQuestion => ({
  number,
  type: "tfng",
  prompt,
  instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
  answer: "Not Given",
  explanation,
});

const yn = (number: number, prompt: string, explanation: string): ReadingQuestion => ({
  number,
  type: "ynng",
  prompt,
  instruction: "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
  answer: "Not Given",
  explanation,
});

export const READING_NOT_GIVEN_EXTENSIONS: Record<string, ReadingQuestion[]> = {
  "rx-hard-2": [
    tf(15, "Tree-ring laboratories in Europe process more samples each year than those in North America.",
      "Not Given: the passage discusses methods and chronologies, but never compares the workload of laboratories in different regions."),
  ],
  "rx-hard-3": [
    yn(15, "The writer believes oral examinations are fairer than written ones.",
      "Not Given: the writer discusses what written examinations measure and reward, but never evaluates oral examinations as an alternative."),
  ],
  "rx-hard-4": [
    tf(15, "Nourishment schemes are more expensive to maintain than the sea walls they replace.",
      "Not Given: the passage describes how nourishment behaves and how sediment is managed, but gives no maintenance cost comparison with sea walls."),
  ],
  "rx-hard-5": [
    tf(15, "Animals raised without playmates live shorter lives than those raised in groups.",
      "Not Given: deprivation studies are mentioned in terms of behaviour and brain development, not lifespan."),
  ],
  "rx-hard-6": [
    tf(15, "Bronze objects were valued more highly than gold ones in the same period.",
      "Not Given: the passage traces the supply of tin and the organisation of trade, and never ranks bronze against gold in value."),
  ],
  "rx-hard-8": [
    yn(15, "The writer thinks modern irrigation schemes in the region should be abandoned.",
      "Not Given: the writer draws a lesson from the ancient record but makes no recommendation about present-day schemes."),
  ],
  "rx-hard-9": [
    tf(15, "Residents of hotter districts report lower satisfaction with their neighbourhoods.",
      "Not Given: the passage reports temperature, mortality and cooling measures, but no survey of residents' satisfaction."),
  ],
  "rx-hard-10": [
    yn(15, "The writer believes zoos are the most suitable institutions to lead de-extinction projects.",
      "Not Given: the writer weighs the science and the conservation trade-offs, but never says which institutions should lead the work."),
  ],
  "rx-hard-12": [
    yn(15, "The writer regards written documentation as more valuable than audio recording for endangered languages.",
      "Not Given: the writer discusses documentation and transmission in general, without comparing written and audio methods."),
  ],
  "rx-hard-14": [
    yn(15, "The writer expects self-healing concrete to become cheaper than ordinary concrete within a decade.",
      "Not Given: the writer notes the promise and the unresolved problems of the technology, but offers no prediction about its price."),
  ],
};
