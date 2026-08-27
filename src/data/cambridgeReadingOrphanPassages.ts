/**
 * @file cambridgeReadingOrphanPassages.ts
 * @description A few Reading & Writing questions were authored as if a text was
 *              on the page ("Where is the party?", "What is the best title for
 *              the text?") but shipped without one. This module attaches the
 *              missing short text so no comprehension question is context-free.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam } from "./cambridgeMockExamData";

/** examId -> (question text fragment -> passage to attach). */
const ORPHAN_PASSAGES: Record<string, { match: RegExp; passage: string }[]> = {
  "cambridge-flyers-2": [
    {
      match: /where is the party\?/i,
      passage:
        "INVITATION\n\nHi Tom,\n\nIt's my birthday on Saturday! The party starts at 3 o'clock. My house is too small, so we are having it at the community centre next to the park. Please bring your swimming things - there is a small pool there.\n\nSee you soon,\nAnna",
    },
  ],
  "cambridge-movers-1": [
    {
      match: /what time do most children go to school\?/i,
      passage:
        "SCHOOL DAY SURVEY\n\nWe asked 100 children about their school day.\n\nMost children wake up at 7 AM and have breakfast with their family. They leave home a little later and start school at 8 AM. Lessons finish at 12 PM, and after lunch the children have sport or music. By 6 PM almost everybody is at home again doing homework.",
    },
  ],
  "cambridge-starters-6": [
    {
      match: /what time does the girl get up in the morning\?/i,
      passage:
        "MY DAY\n\n\"Hello! My name is Lucy.\n\nI get up at seven o'clock. I have milk and bread for breakfast. Then I go to school with my brother.\n\nI play with my friends at four o'clock and I go to bed at eight o'clock.\"",
    },
  ],
  "cambridge-ket-2": [
    {
      match: /how much is a return ticket\?/i,
      passage:
        "CITY BUS: TICKET PRICES\n\nSingle ticket (one way): 8 pounds.\nReturn ticket (there and back): 14 pounds.\nDay pass (all buses, all day): 18 pounds.\n\nChildren under 12 pay half price. Buses leave the station every 20 minutes from 6 AM until 10 PM.",
    },
  ],
  "cambridge-ket-1": [
    {
      match: /where is the children's area\?/i,
      passage:
        "NOTICE: City Library\n\nGround floor: newspapers and magazines.\n1st floor: adult fiction and study desks.\n2nd floor: children's area and story time (Saturdays, 11 AM).\n3rd floor: staff offices - no public entry.",
    },
  ],
  "cambridge-pet-5": [
    {
      match: /the writer's main purpose is to/i,
      passage:
        "Every year our school collected hundreds of old mobile phones in a cupboard, and nobody knew what to do with them. Broken screens and dead batteries piled up, and buying new devices for the computer club was far too expensive. Then a group of students had a simple idea: instead of throwing the phones away, they asked a local repair shop to teach them basic repairs. In three afternoons the students learned to change batteries and screens. Forty phones were repaired and given to younger pupils who had no device for homework. The problem did not need money - it needed a small, practical solution and a few volunteers who were willing to learn.",
    },
  ],
  "cambridge-pet-6": [
    {
      match: /best title for the text\?/i,
      passage:
        "Twelve months ago Marta was working in an office she disliked, checking numbers she did not care about. She had always loved books, but she believed that turning a hobby into work was a risk only rich people could take. One Saturday she volunteered at a second-hand book stall in her town market. She enjoyed recommending titles to strangers so much that she began spending every weekend there. Within six months she had saved enough to rent a tiny shop, and by the end of the year she was ordering stock, hosting reading evenings for children and paying herself a modest salary. She says the year taught her that a career can change slowly, one small decision at a time, and that the courage came from doing rather than from planning.",
    },
  ],
};

/**
 * Stems that only make sense with a text on the page. When such a question has
 * no passage of its own, it borrows the main reading text of the same paper.
 */
const TEXT_DEPENDENT =
  /(the (writer|author|text|passage|article|notice|email|message|story|advert|leaflet))|according to the text/i;

const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();

/** Attach authored texts to Reading questions that reference a missing text. */
export const withCambridgeOrphanPassages = (exam: CambridgeMockExam): CambridgeMockExam => {
  const rules = ORPHAN_PASSAGES[exam.id];

  const passages = [
    ...new Set(
      exam.questions
        .filter((q) => q.section === "Reading & Writing" && q.passage && q.passage.trim())
        .map((q) => q.passage!.trim())
    ),
  ];
  // Longest reading text of this paper, used as fallback context.
  const mainPassage = [...passages].sort((a, b) => b.length - a.length)[0];

  const questions = exam.questions.map((q) => {
    if (q.section !== "Reading & Writing" || (q.passage && q.passage.trim())) return q;
    const rule = rules?.find((r) => r.match.test(q.question));
    if (rule) return { ...q, passage: rule.passage };
    if (mainPassage && TEXT_DEPENDENT.test(q.question)) return { ...q, passage: mainPassage };

    // Comprehension question (not a gap-fill) whose key is stated in one of this
    // paper's texts: that text is clearly the missing context.
    if (q.question.trim().endsWith("?") && !q.question.includes("___")) {
      const key = norm(q.options[q.correctAnswer] ?? "");
      if (key.length >= 4) {
        const owner = passages.find((p) => norm(p).includes(key));
        if (owner) return { ...q, passage: owner };
      }
    }
    return q;
  });
  return { ...exam, questions };
};


