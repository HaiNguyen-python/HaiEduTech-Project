/**
 * @file grammarExerciseSupplement.ts
 * @description Hand-written practice items for the few grammar lessons whose
 *              source data is too thin for the automatic exercise generator to
 *              reach the required variety (min 7 exercises, min 4 types).
 */
import type { InteractiveExercise, LanguageModule } from "./types";
import { authoredGrammarExercisesPart1 } from "./grammarExercisesAuthored/part1";
import { authoredGrammarExercisesPart2 } from "./grammarExercisesAuthored/part2";
import { authoredGrammarExercisesPart3 } from "./grammarExercisesAuthored/part3";
import { authoredGrammarExercisesPart4 } from "./grammarExercisesAuthored/part4";
import { authoredGrammarExercisesPart5 } from "./grammarExercisesAuthored/part5";
import { authoredGrammarExercisesPart6 } from "./grammarExercisesAuthored/part6";
import { authoredGrammarExercisesPart7 } from "./grammarExercisesAuthored/part7";



export const grammarExerciseSupplement: Record<string, InteractiveExercise[]> = {
  "adjective-order": [
    {
      type: "error-correction",
      instruction: "Tìm lỗi trật tự tính từ và viết lại cho đúng.",
      instructionEn: "Each phrase breaks the OSASCOMP order. Rewrite it correctly.",
      items: [
        {
          wrong: "She bought a wooden round small table.",
          correct: "She bought a small round wooden table.",
          explanation: "Size before shape before material: small - round - wooden.",
        },
        {
          wrong: "They hired two Vietnamese young engineers.",
          correct: "They hired two young Vietnamese engineers.",
          explanation: "Age comes before origin: young - Vietnamese.",
        },
        {
          wrong: "I sat in an old comfortable leather chair.",
          correct: "I sat in a comfortable old leather chair.",
          explanation: "Opinion comes first: comfortable - old - leather.",
        },
        {
          wrong: "He wore a black big cotton jacket.",
          correct: "He wore a big black cotton jacket.",
          explanation: "Size before colour: big - black - cotton.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại cụm danh từ theo đúng trật tự OSASCOMP.",
      instructionEn: "Rewrite each noun phrase in the correct adjective order.",
      items: [
        {
          prompt: "a box (wooden / jewellery / little / lovely)",
          target: "a lovely little wooden jewellery box",
          cue: "Opinion - Size - Material - Purpose",
          goal: "Opinion - Size - Material - Purpose",
        },
        {
          prompt: "a car (red / new / Italian / sports)",
          target: "a new red Italian sports car",
          cue: "Age - Colour - Origin - Purpose",
          goal: "Age - Colour - Origin - Purpose",
        },
        {
          prompt: "a shirt (cotton / expensive / Japanese)",
          target: "an expensive Japanese cotton shirt",
          cue: "Opinion - Origin - Material",
          goal: "Opinion - Origin - Material",
        },
        {
          prompt: "a cafe (French / small / charming)",
          target: "a charming small French cafe",
          cue: "Opinion - Size - Origin",
          goal: "Opinion - Size - Origin",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn phương án đúng.",
      instructionEn: "Choose the correct phrase.",
      questions: [
        {
          question: "Which phrase is correct?",
          options: [
            "a big red plastic bucket",
            "a red big plastic bucket",
            "a plastic big red bucket",
            "a red plastic big bucket",
          ],
          answer: 0,
          explanation: "Size - colour - material: big - red - plastic.",
        },
        {
          question: "Which phrase is correct?",
          options: [
            "two Vietnamese tall students",
            "two tall Vietnamese students",
            "two Vietnamese students tall",
            "two students tall Vietnamese",
          ],
          answer: 1,
          explanation: "Size or physical description comes before origin.",
        },
        {
          question: "Where does an opinion adjective go?",
          options: [
            "After the colour adjective",
            "Immediately before the noun",
            "First, before all factual adjectives",
            "After the material adjective",
          ],
          answer: 2,
          explanation: "Opinion is the O at the start of OSASCOMP.",
        },
        {
          question: "Which phrase uses the comma correctly?",
          options: [
            "a big, red bus",
            "a cheap, unreliable service",
            "a small, wooden table",
            "a new, Italian car",
          ],
          answer: 1,
          explanation: "A comma is used only between two opinion adjectives.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối tính từ với nhóm nghĩa của nó.",
      instructionEn: "Match each adjective with its OSASCOMP category.",
      pairs: [
        { left: "lovely", right: "Opinion" },
        { left: "tiny", right: "Size" },
        { left: "ancient", right: "Age" },
        { left: "rectangular", right: "Shape" },
        { left: "wooden", right: "Material" },
      ],
    },
  ],

  "dependent-prepositions": [
    {
      type: "error-correction",
      instruction: "Sửa giới từ dùng sai.",
      instructionEn: "Correct the dependent preposition in each sentence.",
      items: [
        {
          wrong: "Success depends of daily effort.",
          correct: "Success depends on daily effort.",
          explanation: "The fixed chunk is depend on.",
        },
        {
          wrong: "She is responsible of the final report.",
          correct: "She is responsible for the final report.",
          explanation: "The fixed chunk is responsible for.",
        },
        {
          wrong: "This design is similar with the old one.",
          correct: "This design is similar to the old one.",
          explanation: "The fixed chunk is similar to.",
        },
        {
          wrong: "He is very good in maths.",
          correct: "He is very good at maths.",
          explanation: "good at + skill; good for + benefit.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu bằng cụm giới từ trong ngoặc.",
      instructionEn: "Rewrite each sentence using the cue phrase.",
      items: [
        {
          prompt: "Exercise benefits your health.",
          target: "Exercise is good for your health.",
          cue: "good for",
          goal: "good for",
        },
        {
          prompt: "She often thinks about her future career.",
          target: "She often worries about her future career.",
          cue: "worry about",
          goal: "worry about",
        },
        {
          prompt: "The teacher was annoyed by my late homework.",
          target: "The teacher was angry about my late homework.",
          cue: "angry about",
          goal: "angry about",
        },
        {
          prompt: "Our plan relies on the weather.",
          target: "Our plan depends on the weather.",
          cue: "depend on",
          goal: "depend on",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn giới từ đúng.",
      instructionEn: "Choose the correct preposition.",
      questions: [
        {
          question: "I am not interested ______ crypto trading.",
          options: ["for", "in", "at", "on"],
          answer: 1,
          explanation: "interested in + topic.",
        },
        {
          question: "She apologised ______ arriving late.",
          options: ["for", "to", "about", "of"],
          answer: 0,
          explanation: "apologise for + reason.",
        },
        {
          question: "This result is different ______ last year's figure.",
          options: ["with", "than", "from", "to"],
          answer: 2,
          explanation: "different from is the standard academic form.",
        },
        {
          question: "The manager is angry ______ his assistant.",
          options: ["at", "with", "for", "in"],
          answer: 1,
          explanation: "angry with + person; angry about + thing.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối cụm từ với nghĩa dùng của nó.",
      instructionEn: "Match each chunk with the meaning it expresses.",
      pairs: [
        { left: "good at", right: "expressing a skill" },
        { left: "good for", right: "expressing a benefit" },
        { left: "angry with", right: "reacting to a person" },
        { left: "angry about", right: "reacting to a situation" },
        { left: "responsible for", right: "having a duty" },
      ],
    },
  ],

  "passive-causative": [
    {
      type: "transformation",
      instruction: "Viết lại câu dùng cấu trúc nhờ vả (causative).",
      instructionEn: "Rewrite each sentence using the causative structure.",
      items: [
        {
          prompt: "A mechanic repaired my car yesterday.",
          target: "I had my car repaired yesterday.",
          cue: "have + object + past participle",
          goal: "have + object + past participle",
        },
        {
          prompt: "A barber is cutting his hair right now.",
          target: "He is getting his hair cut right now.",
          cue: "get + object + past participle",
          goal: "get + object + past participle",
        },
        {
          prompt: "Someone will deliver the documents tomorrow.",
          target: "We will have the documents delivered tomorrow.",
          cue: "will have + object + past participle",
          goal: "will have + object + past participle",
        },
        {
          prompt: "A designer made her a website last month.",
          target: "She had a website made last month.",
          cue: "had + object + past participle",
          goal: "had + object + past participle",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi trong câu nhờ vả.",
      instructionEn: "Correct the causative structure in each sentence.",
      items: [
        {
          wrong: "I had my laptop repair last week.",
          correct: "I had my laptop repaired last week.",
          explanation: "The causative needs a past participle: repaired.",
        },
        {
          wrong: "She got cut her hair before the interview.",
          correct: "She got her hair cut before the interview.",
          explanation: "Word order: get + object + past participle.",
        },
        {
          wrong: "We will have deliver the parcel on Monday.",
          correct: "We will have the parcel delivered on Monday.",
          explanation: "The object comes before the participle.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn phương án đúng.",
      instructionEn: "Choose the correct option.",
      questions: [
        {
          question: "I ______ my eyes tested every year.",
          options: ["have", "am having tested", "having", "have been"],
          answer: 0,
          explanation: "Routine action: have + object + past participle.",
        },
        {
          question: "Which sentence is a causative?",
          options: [
            "The wall was painted blue.",
            "They painted the wall blue.",
            "We had the wall painted blue.",
            "The wall is painting blue.",
          ],
          answer: 2,
          explanation: "have + object + participle shows someone else did the work.",
        },
        {
          question: "The informal alternative to 'have something done' is:",
          options: [
            "make something done",
            "get something done",
            "let something done",
            "take something done",
          ],
          answer: 1,
          explanation: "get + object + past participle is the informal form.",
        },
      ],
    },
  ],

  "relative-prepositions": [
    {
      type: "transformation",
      instruction: "Viết lại câu, đưa giới từ lên trước đại từ quan hệ.",
      instructionEn: "Rewrite each sentence with the preposition before the relative pronoun.",
      items: [
        {
          prompt: "This is the report which I referred to.",
          target: "This is the report to which I referred.",
          cue: "formal: preposition + which",
          goal: "formal: preposition + which",
        },
        {
          prompt: "She is the colleague who I worked with.",
          target: "She is the colleague with whom I worked.",
          cue: "formal: preposition + whom",
          goal: "formal: preposition + whom",
        },
        {
          prompt: "That is the reason which he resigned for.",
          target: "That is the reason for which he resigned.",
          cue: "formal: for which",
          goal: "formal: for which",
        },
        {
          prompt: "These are the tools which we depend on.",
          target: "These are the tools on which we depend.",
          cue: "formal: on which",
          goal: "formal: on which",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi trong mệnh đề quan hệ có giới từ.",
      instructionEn: "Correct the relative clause in each sentence.",
      items: [
        {
          wrong: "This is the house in that I grew up.",
          correct: "This is the house in which I grew up.",
          explanation: "After a preposition use which or whom, never that.",
        },
        {
          wrong: "He is the expert with who we consulted.",
          correct: "He is the expert with whom we consulted.",
          explanation: "After a preposition, who becomes whom.",
        },
        {
          wrong: "The method to which we used was simple.",
          correct: "The method which we used was simple.",
          explanation: "Use has no preposition, so no preposition is needed.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn phương án đúng.",
      instructionEn: "Choose the correct option.",
      questions: [
        {
          question: "The conference ______ she spoke was held online.",
          options: ["at which", "which at", "at that", "at who"],
          answer: 0,
          explanation: "Preposition + which is the formal pattern.",
        },
        {
          question: "Which sentence is more formal?",
          options: [
            "The person who I spoke to was helpful.",
            "The person to whom I spoke was helpful.",
            "The person that I spoke to was helpful.",
            "The person I spoke to was helpful.",
          ],
          answer: 1,
          explanation: "Fronted preposition + whom is the most formal option.",
        },
        {
          question: "In informal English the preposition usually goes:",
          options: [
            "before the relative pronoun",
            "at the end of the clause",
            "before the main verb",
            "at the start of the sentence",
          ],
          answer: 1,
          explanation: "Informal English strands the preposition at the end.",
        },
      ],
    },
  ],
};

/** Deterministic small hash so option order is stable across renders. */
const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
};

/**
 * Hand-written MCQs are authored with the correct option first for readability.
 * Rotate the options deterministically so the answer key is spread across
 * positions instead of always being A.
 */
export const balanceMcqKeys = (exercises: InteractiveExercise[]): InteractiveExercise[] =>
  exercises.map((exercise) => {
    if (exercise.type !== "multiple-choice") return exercise;

    const base = hashString(exercise.questions.map((q) => q.question).join("|"));

    return {
      ...exercise,
      questions: exercise.questions.map((question, index) => {
        const count = question.options.length;
        if (count < 2) return question;

        // Spread the key across positions: question i keeps a distinct slot.
        const target = (base + index) % count;
        const shift = (target - question.answer + count) % count;
        if (shift === 0) return question;

        const options = [
          ...question.options.slice(count - shift),
          ...question.options.slice(0, count - shift),
        ];

        return { ...question, options, answer: target };
      }),
    };
  });

export const applyGrammarExerciseSupplement = (
  modules: LanguageModule[]
): LanguageModule[] =>
  modules.map((module) => ({
    ...module,
    lessons: module.lessons.map((lesson) => {
      const extra = ([
        ...(grammarExerciseSupplement[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart1[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart2[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart3[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart4[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart5[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart6[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart7[lesson.id] ?? []),
        ...(authoredGrammarExercisesPart6[`${lesson.id}-extra`] ?? []),
        ...(authoredGrammarExercisesPart7[`${lesson.id}-extra`] ?? []),
      ]);

      return {
        ...lesson,
        exercises: balanceMcqKeys([...lesson.exercises, ...extra]),
      };
    }),
  }));

