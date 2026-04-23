import type {
  FillInBlankExercise,
  LanguageLesson,
  LanguageModule,
  MCQExercise,
  SentenceReorderExercise,
  VocabEntry,
} from "@/data/languageCurriculum/types";

const MIN_GRAMMAR_QUIZ_QUESTIONS = 10;

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\*\*|__|`|~~/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/\[(.*?)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const sanitizeSentence = (value: string) =>
  value
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const unique = <T,>(items: T[]) => Array.from(new Set(items));

const rotateOptions = (options: string[], seed: number) => {
  if (options.length <= 1) return options;
  const shift = seed % options.length;
  return options.map((_, index) => options[(index + shift) % options.length]);
};

const fallbackDistractors = (answer: string) => {
  const trimmed = answer.trim();

  if (["at", "on", "in"].includes(trimmed)) return ["at", "on", "in"].filter((item) => item !== trimmed);
  if (["a", "an", "the", "-"].includes(trimmed)) return ["a", "an", "the", "-"].filter((item) => item !== trimmed);
  if (trimmed === "be") return ["is", "was", "being"];
  if (trimmed === "were") return ["was", "are", "be"];
  if (trimmed === "is") return ["are", "be", "was"];
  if (trimmed === "are") return ["is", "were", "be"];
  if (trimmed === "has") return ["have", "had", "having"];
  if (trimmed === "have") return ["has", "had", "having"];
  if (trimmed === "had") return ["has", "have", "having"];
  if (trimmed === "will") return ["would", "is going to", "can"];
  if (trimmed === "would") return ["will", "could", "should"];
  if (trimmed === "could") return ["can", "would", "had"];
  if (trimmed === "not talk") return ["doesn't talk", "not talks", "not to talk"];

  if (trimmed.includes(" ")) {
    const [first, ...rest] = trimmed.split(" ");
    const tail = rest.join(" ");
    const replacements = {
      am: ["is", "are", "was"],
      is: ["are", "was", "be"],
      are: ["is", "were", "be"],
      was: ["were", "is", "be"],
      were: ["was", "are", "be"],
      has: ["have", "had", "having"],
      have: ["has", "had", "having"],
      had: ["has", "have", "having"],
      will: ["would", "can", "is going to"],
      would: ["will", "could", "should"],
    } as const;

    const mapped = first in replacements
      ? replacements[first as keyof typeof replacements].map((item) => `${item} ${tail}`.trim())
      : [];

    return unique([
      ...mapped,
      tail,
      `${first} ${tail.replace(/ing\b/, "ed")}`.trim(),
      `${first} ${tail.replace(/ed\b/, "ing")}`.trim(),
    ]).filter((item) => item && item !== trimmed);
  }

  if (trimmed.endsWith("ies")) return [trimmed.replace(/ies$/, "y"), trimmed.replace(/ies$/, "ied"), `${trimmed.replace(/ies$/, "y")}ing`];
  if (trimmed.endsWith("es")) return [trimmed.replace(/es$/, ""), `${trimmed.replace(/es$/, "")}ed`, `${trimmed.replace(/es$/, "")}ing`];
  if (trimmed.endsWith("ed")) return [trimmed.replace(/ed$/, ""), `${trimmed.replace(/ed$/, "")}s`, `${trimmed.replace(/ed$/, "")}ing`];
  if (trimmed.endsWith("ing")) return [trimmed.replace(/ing$/, ""), `${trimmed.replace(/ing$/, "")}s`, `${trimmed.replace(/ing$/, "")}ed`];

  return [`${trimmed}s`, `${trimmed}ed`, `${trimmed}ing`];
};

const buildOptions = (answer: string, pool: string[], seed: number) => {
  const distractors = unique([
    ...pool.filter((item) => item && item !== answer),
    ...fallbackDistractors(answer),
  ]).slice(0, 3);

  const options = unique([answer, ...distractors]);
  if (options.length < 4) {
    const more = ["be", "do", "have", "will", "would", "is", "are", "on", "in", "at"]
      .filter((item) => item !== answer && !options.includes(item));
    options.push(...more.slice(0, 4 - options.length));
  }

  return rotateOptions(options.slice(0, 4), seed);
};

const buildQuestion = (question: string, correct: string, options: string[], explanation: string): MCQExercise => ({
  question,
  options,
  answer: options.indexOf(correct),
  explanation,
});

const replaceBlankWithOption = (template: string, option: string) =>
  sanitizeSentence(template.replace(/_{3,5}/, option));

const cleanExampleLine = (line: string) =>
  stripMarkdown(
    line
      .replace(/^[-*•]\s*/, "")
      .replace(/^(?:✅|✔️|✔|Correct:?)\s*/i, "")
      .replace(/^(?:❌|✘|Wrong:?)\s*/i, "")
      .replace(/^Example:?\s*/i, "")
  );

const extractExampleLines = (theory: string) => {
  const lines = theory.replace(/\r/g, "").split("\n").map((line) => line.trim()).filter(Boolean);

  return {
    correct: unique(lines
      .filter((line) => /^(?:[-*•]\s*)?(?:✅|✔️|✔|Correct:?)/i.test(line))
      .map(cleanExampleLine)
      .filter((line) => line.split(/\s+/).length >= 3)),
    wrong: unique(lines
      .filter((line) => /^(?:[-*•]\s*)?(?:❌|✘|Wrong:?)/i.test(line))
      .map(cleanExampleLine)
      .filter((line) => line.split(/\s+/).length >= 3)),
  };
};

const scoreQuestionPracticality = (question: MCQExercise) => {
  const prompt = question.question.toLowerCase();
  const averageOptionLength = question.options.reduce((sum, option) => sum + option.split(/\s+/).length, 0) / question.options.length;

  let score = averageOptionLength >= 4 ? 2 : 0;
  if (/choose the best completion|complete the sentence correctly|which sentence/.test(prompt)) score += 6;
  if (/correct order|best correct order/.test(prompt)) score += 5;
  if (/apply|context|natural/.test(prompt)) score += 3;
  if (/which structure|when do we usually use|which rule best explains|review statement|review check/.test(prompt)) score -= 3;
  if (/most nearly mean|review tip/.test(prompt)) score -= 4;

  return score;
};

const prioritizePracticalQuestions = (questions: MCQExercise[]) =>
  questions
    .map((question, index) => ({ question, index, score: scoreQuestionPracticality(question) }))
    .sort((a, b) => (b.score - a.score) || (a.index - b.index))
    .map(({ question }) => question);

const extractSectionMeta = (theory: string) => {
  const normalized = theory.replace(/\r/g, "");
  const matches = [...normalized.matchAll(/^###\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const title = stripMarkdown(match[1]);
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? normalized.length;
    const body = normalized.slice(start, end);
    const structure = stripMarkdown(body.match(/(?:Structure|Form):\*\*\s*([^\n]+)/i)?.[1] ?? "");
    const usage = stripMarkdown(body.match(/(?:Usage|Core idea|Quick decision rule|Fast recognition guide|Study strategy|Why sentence patterns matter|Key distinctions|Notes?):\*\*\s*([^\n]+)/i)?.[1] ?? "");

    return { title, structure, usage };
  }).filter((section) => section.title);
};

const buildTheoryQuestions = (lesson: LanguageLesson): MCQExercise[] => {
  const sections = extractSectionMeta(lesson.theoryEn || lesson.theory);
  const structurePool = unique(sections.map((section) => section.structure).filter(Boolean));
  const usagePool = unique(sections.map((section) => section.usage).filter(Boolean));

  return sections.flatMap((section, index) => {
    const questions: MCQExercise[] = [];

    if (section.structure && structurePool.length > 1) {
      const options = rotateOptions(
        unique([section.structure, ...structurePool.filter((item) => item !== section.structure)]).slice(0, 4),
        index
      );
      questions.push(buildQuestion(
        `Which structure best matches "${section.title}"?`,
        section.structure,
        options,
        `The correct structure for ${section.title} is ${section.structure}.`
      ));
    }

    if (section.usage && usagePool.length > 1) {
      const options = rotateOptions(
        unique([section.usage, ...usagePool.filter((item) => item !== section.usage)]).slice(0, 4),
        index + 1
      );
      questions.push(buildQuestion(
        `When do we usually use "${section.title}"?`,
        section.usage,
        options,
        `${section.title} is typically used when ${section.usage.toLowerCase()}.`
      ));
    }

    return questions;
  });
};

const buildFillBlankQuestions = (exercise: FillInBlankExercise, lessonAnswers: string[]) =>
  exercise.sentences
    .filter((sentence) => sentence.answer && !sentence.answer.includes("/") && !sentence.textEn.includes("→"))
    .map((sentence, index) => {
      const prompt = sanitizeSentence((sentence.textEn || sentence.text).replace("___", "_____"));
      const answer = sentence.answer.trim();
      const options = buildOptions(answer, lessonAnswers, index);
      return buildQuestion(
        `Complete the sentence correctly: "${prompt}"`,
        answer,
        options,
        `${sentence.hint ? `${capitalize(stripMarkdown(sentence.hint))}. ` : ""}The correct answer is "${answer}".`
      );
    });

const buildAppliedFillBlankQuestions = (exercise: FillInBlankExercise, lessonAnswers: string[]) =>
  exercise.sentences
    .filter((sentence) => sentence.answer && !sentence.answer.includes("/") && (sentence.textEn || sentence.text).includes("___"))
    .map((sentence, index) => {
      const template = sentence.textEn || sentence.text;
      const answer = sentence.answer.trim();
      const options = buildOptions(answer, lessonAnswers, index + 20);

      return buildQuestion(
        `Choose the best completion for this real-use sentence: "${sanitizeSentence(template.replace("___", "_____"))}"`,
        replaceBlankWithOption(template, answer),
        options.map((option) => replaceBlankWithOption(template, option)),
        `${sentence.hint ? `${capitalize(stripMarkdown(sentence.hint))}. ` : ""}In natural English, we say: "${replaceBlankWithOption(template, answer)}".`
      );
    });

const buildSentenceVariants = (correct: string, scrambled: string[]) => {
  const tokens = correct.replace(/[.?!]$/, "").split(/\s+/);
  const swapped = tokens.length > 3 ? [tokens[1], tokens[0], ...tokens.slice(2)].join(" ") : tokens.slice().reverse().join(" ");
  const scrambledVersion = scrambled.join(" ").replace(/\s+/g, " ").trim();
  const noHelper = tokens.length > 2 ? [tokens[0], ...tokens.slice(2)].join(" ") : correct;

  return unique([
    correct,
    `${swapped}${/[.?!]$/.test(correct) ? correct.slice(-1) : ""}`,
    `${scrambledVersion}${/[.?!]$/.test(correct) ? correct.slice(-1) : ""}`,
    `${noHelper}${/[.?!]$/.test(correct) ? correct.slice(-1) : ""}`,
  ]);
};

const buildSentenceReorderQuestions = (exercise: SentenceReorderExercise) =>
  exercise.items.map((item, index) => {
    const correct = (item.correctEn || item.correct).trim();
    const options = rotateOptions(buildSentenceVariants(correct, item.scrambled).slice(0, 4), index);

    return buildQuestion(
      `Which sentence is the best correct order for: ${item.scrambled.join(" · ")}?`,
      correct,
      options,
      `The correctly ordered sentence is "${correct}".`
    );
  });

const buildCorrectVsWrongQuestions = (lesson: LanguageLesson) => {
  const { correct, wrong } = extractExampleLines(lesson.theoryEn || lesson.theory);
  if (!correct.length || !wrong.length) return [];

  return correct.slice(0, 4).map((correctSentence, index) => {
    const pairedWrong = wrong[index % wrong.length];
    const additionalWrong = wrong.filter((item) => item !== pairedWrong);
    const options = rotateOptions(
      unique([correctSentence, pairedWrong, ...additionalWrong]).slice(0, 4),
      index + 30
    );

    return buildQuestion(
      `Which sentence sounds correct and natural in this grammar context?`,
      correctSentence,
      options,
      `Correct form: "${correctSentence}". Compare it with the incorrect pattern to notice the grammar choice.`
    );
  });
};

const buildVocabularyQuestions = (vocabulary: VocabEntry[]) => {
  const meanings = unique(vocabulary.map((item) => item.meaningEn || item.meaning).filter(Boolean));

  return vocabulary.map((item, index) => {
    const correct = (item.meaningEn || item.meaning).trim();
    const options = rotateOptions(
      unique([correct, ...meanings.filter((meaning) => meaning !== correct)]).slice(0, 4),
      index + 2
    );

    return buildQuestion(
      `In this lesson, what does "${item.word}" most nearly mean?`,
      correct,
      options,
      item.exampleEn
        ? `"${item.word}" means "${correct}". Example: ${item.exampleEn}`
        : `"${item.word}" means "${correct}" in this lesson.`
    );
  });
};

const buildProTipQuestions = (lesson: LanguageLesson) => {
  const tips = unique((lesson.proTipsEn || lesson.proTips || []).map((tip) => stripMarkdown(tip)).filter(Boolean));
  if (!tips.length) return [];

  const genericWrong = [
    "Choose grammar only from translation word by word.",
    "Ignore the signal words because tense does not depend on context.",
    "Memorize isolated words instead of full grammar patterns.",
    "Change the subject form first and check the rule later.",
  ];

  return tips.map((tip, index) => {
    const options = rotateOptions(
      unique([tip, ...tips.filter((item) => item !== tip), ...genericWrong]).slice(0, 4),
      index + 3
    );

    return buildQuestion(
      `Which review tip is correct for "${lesson.titleEn}"?`,
      tip,
      options,
      `${tip}`
    );
  });
};

const buildExplanationRecapQuestions = (lesson: LanguageLesson) => {
  const explanations = unique(lesson.quiz.map((item) => stripMarkdown(item.explanation)).filter(Boolean));
  if (!explanations.length) return [];

  return lesson.quiz.map((item, index) => {
    const correct = stripMarkdown(item.explanation);
    const options = rotateOptions(
      unique([correct, ...explanations.filter((text) => text !== correct)]).slice(0, 4),
      index + 4
    );

    return buildQuestion(
      `Which rule best explains the correct answer to: "${item.question}"?`,
      correct,
      options,
      correct
    );
  });
};

const buildFallbackReviewQuestions = (lesson: LanguageLesson): MCQExercise[] => {
  const lessonName = lesson.titleEn || lesson.title;
  const theory = stripMarkdown(lesson.theoryEn || lesson.theory);
  const sentences = theory
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 30)
    .slice(0, 4);

  const distractorPool = unique([
    ...sentences,
    ...stripMarkdown(lesson.theoryEn || lesson.theory).split(/\n+/).map((item) => item.trim()).filter((item) => item.length > 12),
    ...(lesson.proTipsEn || lesson.proTips || []).map((item) => stripMarkdown(item)),
  ]);

  return sentences.map((sentence, index) => {
    const options = rotateOptions(
      unique([sentence, ...distractorPool.filter((item) => item !== sentence)]).slice(0, 4),
      index + 6
    );

    return buildQuestion(
      `Which review statement matches the lesson "${lessonName}"?`,
      sentence,
      options,
      sentence
    );
  });
};

const dedupeQuestions = (questions: MCQExercise[]) => {
  const seen = new Set<string>();

  return questions.filter((question) => {
    const key = `${question.question}__${question.options.join("||")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const ensureGrammarLessonQuizDepth = (lesson: LanguageLesson): LanguageLesson => {
  if (lesson.quiz.length >= MIN_GRAMMAR_QUIZ_QUESTIONS) return lesson;

  const fillInBlankExercises = lesson.exercises.filter(
    (exercise): exercise is FillInBlankExercise => exercise.type === "fill-in-blank"
  );
  const sentenceReorderExercises = lesson.exercises.filter(
    (exercise): exercise is SentenceReorderExercise => exercise.type === "sentence-reorder"
  );

  const lessonAnswers = unique([
    ...fillInBlankExercises.flatMap((exercise) => exercise.sentences.map((sentence) => sentence.answer.trim())),
    ...lesson.quiz.flatMap((question) => question.options),
    ...(lesson.vocabulary || []).map((item) => item.word),
  ]);

  const generated = dedupeQuestions([
    ...lesson.quiz,
    ...fillInBlankExercises.flatMap((exercise) => buildFillBlankQuestions(exercise, lessonAnswers)),
    ...fillInBlankExercises.flatMap((exercise) => buildAppliedFillBlankQuestions(exercise, lessonAnswers)),
    ...sentenceReorderExercises.flatMap((exercise) => buildSentenceReorderQuestions(exercise)),
    ...buildCorrectVsWrongQuestions(lesson),
    ...buildTheoryQuestions(lesson),
    ...buildFallbackReviewQuestions(lesson),
    ...buildVocabularyQuestions(lesson.vocabulary || []),
    ...buildProTipQuestions(lesson),
    ...buildExplanationRecapQuestions(lesson),
  ]);

  while (generated.length < MIN_GRAMMAR_QUIZ_QUESTIONS) {
    const index = generated.length + 1;
    const lessonName = lesson.titleEn || lesson.title;
    const summary = stripMarkdown(lesson.theoryEn || lesson.theory)
      .split(/(?<=[.!?])\s+/)
      .find((item) => item.trim().length > 24) || `Review the core rule of ${lessonName}.`;

    generated.push({
      question: `Review check ${index}: which statement best matches the focus of "${lessonName}"?`,
      options: rotateOptions(
        [
          summary,
          `Ignore structure and choose only by intuition.`,
          `Memorize isolated words without checking the grammar frame.`,
          `Use the same pattern in every sentence regardless of context.`,
        ],
        index
      ),
      answer: rotateOptions(
        [
          summary,
          `Ignore structure and choose only by intuition.`,
          `Memorize isolated words without checking the grammar frame.`,
          `Use the same pattern in every sentence regardless of context.`,
        ],
        index
      ).indexOf(summary),
      explanation: summary,
    });
  }

  return {
    ...lesson,
    quiz: prioritizePracticalQuestions(generated).slice(0, Math.max(MIN_GRAMMAR_QUIZ_QUESTIONS, lesson.quiz.length)),
  };
};

export const enhanceGrammarModulesWithQuizDepth = (modules: LanguageModule[]): LanguageModule[] =>
  modules.map((module) => ({
    ...module,
    lessons: module.lessons.map((lesson) => ensureGrammarLessonQuizDepth(lesson)),
  }));