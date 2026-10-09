import type { ReadingQuestion } from "@/data/ieltsFullReadingExams";

export const readingTaskGroups = (questions: ReadingQuestion[]): ReadingQuestion[][] => {
  const groups: ReadingQuestion[][] = [];
  for (const question of questions) {
    const last = groups.at(-1);
    const previous = last?.at(-1);
    const options = (q: ReadingQuestion) => q.headings ?? q.features ?? q.endings ?? q.wordBank;
    if (previous?.type === question.type && JSON.stringify(options(previous)) === JSON.stringify(options(question)) && readingTaskInstruction(previous) === readingTaskInstruction(question)) {
      last?.push(question);
    } else groups.push([question]);
  }
  return groups;
};

export const readingTaskInstruction = (q: ReadingQuestion): string => {
  switch (q.type) {
    case "matching-headings": return "Choose the correct heading for each paragraph from the list of headings below. Write the correct Roman numeral in each box. There are more headings than paragraphs, so you will not use them all. Use each heading once only.";
    case "tfng": return "Do the following statements agree with the information in the Reading Passage? TRUE: the statement agrees with the information. FALSE: the statement contradicts the information. NOT GIVEN: there is no information on this.";
    case "ynng": return "Do the following statements agree with the views or claims of the writer? YES: the statement agrees with the writer. NO: the statement contradicts the writer. NOT GIVEN: it is impossible to say what the writer thinks about this.";
    case "multiple-choice": return "Choose the correct letter, A, B, C or D.";
    case "mcq-multi": return "Choose TWO letters.";
    case "fill-blank": return q.instruction ?? "Write NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage.";
    default: return q.instruction ?? "";
  }
};

export const parseReadingLetters = (value: string): string[] =>
  [...new Set(value.toUpperCase().replace(/[^A-Z]/g, "").split(""))].sort();

export const expandReadingAnswerSlots = (questions: ReadingQuestion[]): ReadingQuestion[] => {
  const result: ReadingQuestion[] = [];
  for (const q of questions) {
    const number = result.length + 1;
    const sourceNumber = q.sourceNumber ?? q.number;
    if (q.type === "mcq-multi") {
      result.push({ ...q, number, sourceNumber, pairStart: number, pairIndex: 0 });
      result.push({ ...q, number: number + 1, sourceNumber, pairStart: number, pairIndex: 1 });
    } else result.push({ ...q, number, sourceNumber });
  }
  return result;
};

/** Never leave half of a choose-TWO task at a full-paper boundary. */
export const selectReadingSlots = (questions: ReadingQuestion[], count: number): ReadingQuestion[] => {
  const selected = questions.slice(0, count);
  if (selected.at(-1)?.pairIndex === 0) {
    selected.pop();
    const single = questions.slice(count).find(q => q.pairIndex === undefined);
    if (single) selected.push(single);
    else {
      const remove = selected.map(q => q.pairIndex === undefined).lastIndexOf(true);
      const pairFirst = questions[count - 1];
      const pairSecond = questions[count];
      if (remove >= 0 && pairFirst && pairSecond) {
        selected.splice(remove, 1);
        selected.push(pairFirst, pairSecond);
      }
    }
  }
  return selected;
};

export const allocateReadingCounts = (lengths: number[]): number[] => {
  const counts = lengths.map((length, index) => Math.min(length, index === 2 ? 14 : 13));
  let remaining = 40 - counts.reduce((sum, count) => sum + count, 0);
  while (remaining > 0) {
    const index = counts.findIndex((count, i) => count < lengths[i]);
    if (index < 0) break;
    counts[index] += 1;
    remaining -= 1;
  }
  return counts;
};