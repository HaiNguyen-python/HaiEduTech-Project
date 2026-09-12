/**
 * Content quality layer for IELTS Listening practice sets.
 * Builds exam-realistic recordings from the authored question data while
 * keeping set IDs stable. Answers are embedded in natural speech: no phrase
 * ever announces that a detail is "the answer", and distractors are spoken
 * as genuine alternatives rather than being labelled as wrong.
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet, ListeningQuestion } from "./ieltsListeningPractice";
import { AUTHORED_LISTENING_TRANSCRIPTS } from "./ieltsListeningTranscripts";

type MatchingOption = NonNullable<ListeningPracticeSet["matchingOptions"]>[number];
type Section = ListeningPracticeSet["section"];

const wordCount = (text: string) => (text.match(/[A-Za-zÀ-ỹ0-9']+/g) ?? []).length;

const collapseSpaces = (text: string) => text.replace(/\s+/g, " ").trim();

/** Turns a question prompt into a phrase that can be spoken inside a sentence. */
const promptPhrase = (prompt: string) =>
  collapseSpaces(
    prompt
      .replace(/_+/g, " ")
      .replace(/:\s*$/, "")
      .replace(/\s+:/g, ":")
      .replace(/\s+([?.,])/g, "$1")
      .replace(/[?.:]\s*$/, ""),
  ).toLowerCase();

const answerText = (question: ListeningQuestion) => {
  if (question.type === "fill-in" || question.type === "matching") return String(question.answer);
  const option = question.options[question.answer];
  return typeof option === "string" ? option : "that arrangement";
};

const fillPromptWithAnswer = (prompt: string, answer: string) => {
  const cleaned = collapseSpaces(prompt.replace(/_+/g, answer));
  return /[.?!]$/.test(cleaned) ? cleaned : `${cleaned}.`;
};

const inferredMaxWords = (answer: string) => {
  const trimmed = answer.trim();
  if (/^[A-Z]{1,3}\d/.test(trimmed) || /\d/.test(trimmed)) return 2;
  return Math.max(1, Math.min(3, trimmed.split(/\s+/).length));
};

const hashText = (text: string) => {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
};

/** Deterministic per-set random generator so content varies but stays stable. */
const makeRandom = (seed: number) => {
  let state = seed || 1;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const pick = <T,>(items: T[], random: () => number) => items[Math.floor(random() * items.length) % items.length];

/** Fisher-Yates using the seeded generator. */
const shuffled = <T,>(items: T[], random: () => number) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const rotateMcqAnswer = (question: Extract<ListeningQuestion, { type: "mcq" }>, targetIndex: number) => {
  const currentAnswer = question.options[question.answer];
  if (typeof currentAnswer !== "string") return question;
  const remaining = question.options.filter((_, index) => index !== question.answer);
  const options = [...remaining];
  options.splice(targetIndex, 0, currentAnswer);
  return { ...question, options, answer: targetIndex };
};

/**
 * Rebalances matching keys: the letters keep their meaning by moving the
 * option texts, so each letter is used a different amount across the bank.
 */
const rebalanceMatching = (set: ListeningPracticeSet, random: () => number) => {
  const options = set.matchingOptions;
  if (!options || options.length < 2) return { questions: set.questions, matchingOptions: options };
  const letters = options.map(option => option.letter);
  const texts = shuffled(options.map(option => ({ text: option.text, textVi: option.textVi })), random);
  const remap = new Map<string, string>(); // old letter -> new letter
  options.forEach(option => {
    const newIndex = texts.findIndex(entry => entry.text === option.text);
    remap.set(option.letter, letters[newIndex]);
  });
  const matchingOptions: MatchingOption[] = letters.map((letter, index) => ({
    letter,
    text: texts[index].text,
    ...(texts[index].textVi ? { textVi: texts[index].textVi } : {}),
  }));
  const questions = set.questions.map(question =>
    question.type === "matching"
      ? { ...question, answer: remap.get(String(question.answer)) ?? question.answer }
      : question,
  );
  return { questions, matchingOptions };
};

let mcqRotationCounter = 0;

const normaliseQuestions = (set: ListeningPracticeSet, random: () => number): ListeningQuestion[] =>
  set.questions.map((question, index) => {
    if (question.type === "mcq") {
      // Round-robin across the whole bank so keys spread evenly over A-D.
      mcqRotationCounter += 1;
      const targetIndex = mcqRotationCounter % Math.max(1, question.options.length);
      return rotateMcqAnswer(question, targetIndex);
    }
    if (question.type !== "fill-in") return question;
    const answer = String(question.answer);
    const inferred = inferredMaxWords(answer);
    return { ...question, maxWords: Math.max(question.maxWords ?? inferred, inferred) };
  });

const otherOptions = (question: ListeningQuestion) => {
  if (question.type !== "mcq") return [];
  return question.options.filter((_, index) => index !== question.answer).map(String);
};

const spellOut = (answer: string) => {
  if (!/^[A-Za-z]{4,12}$/.test(answer)) return null;
  return answer.toUpperCase().split("").join("-");
};

/** Topic-aware filler sentences: unique per use, so no line is ever repeated. */
const fillerPool = (section: Section, topic: string): string[] => {
  const common = [
    `Just so the picture is complete, ${topic} has been organised slightly differently over the last two years, and a few people are still working from the older information.`,
    `There is quite a lot of interest in ${topic} at the moment, which is why the arrangements have been reviewed and, in a couple of places, simplified.`,
    `Most of what I am describing about ${topic} is written down somewhere, but the printed versions are not always up to date, so it is worth taking notes.`,
  ];
  if (section === 1) {
    return [
      ...common,
      "I do have to read the screen while I type, so there may be a short pause between one field and the next.",
      "If any of these details change during the week, you can ring back and we will amend the record without a charge.",
      "The system asks for the details in a fixed order, so I may come back to something you have already mentioned.",
      "We keep the paperwork for three years, and after that it is deleted automatically unless you renew.",
      "One thing that catches people out is that the confirmation email arrives from a different address, so it sometimes ends up in the junk folder.",
      "There is a short summary at the end of the call, which is when most people notice a small mistake in a name or a number.",
      "We can also post a paper copy, although that takes about a week longer than the electronic version.",
    ];
  }
  if (section === 2) {
    return [
      ...common,
      "You will see a number of noticeboards as you walk round, and some of them describe a layout that was changed at the start of the year.",
      "Staff wearing green badges are volunteers, so if a question is about money or bookings they will pass you on to the office.",
      "During school holidays the site is considerably busier, and at those times we open a second entrance to spread the crowds out.",
      "There is a small shop by the exit, and profits from it go back into maintaining the buildings and the grounds.",
      "We ask groups to stay together in the narrower parts of the route, mostly because the floors there are uneven.",
      "Photography is fine everywhere except in one room, and that is marked with a sign rather than announced.",
      "If the weather turns, the outdoor part of the visit is shortened rather than cancelled altogether.",
    ];
  }
  if (section === 3) {
    return [
      ...common,
      "Before we go further, remember that the marking scheme rewards the quality of the argument far more than the number of sources.",
      "I would rather you produced something narrow and well evidenced than something broad and rather thin.",
      "Last year a group ran into trouble because they left the data cleaning until the week before submission.",
      "It is worth agreeing now how you will keep your notes, because two different filing systems tends to cause duplication.",
      "If one part turns out to be much larger than expected, come back to me instead of quietly reallocating everything.",
      "You will each be asked to comment on the process in the reflective section, so keep a record of the decisions you make.",
      "There is a workshop on Thursday about referencing software, and I think it would save you both a fair amount of time.",
    ];
  }
  return [
    ...common,
    "It is worth remembering that the early studies in this area used small samples, which is one reason the figures are often quoted with caution.",
    "The terminology has shifted as well, so older papers use a word that now has a slightly narrower meaning.",
    "Where measurements were taken makes a considerable difference, and that is not always stated clearly in the published summaries.",
    "Two research groups working independently reached broadly similar conclusions, which is part of why the model became widely accepted.",
    "There are practical constraints too, since long-term observation is expensive and rarely funded for more than a few years.",
    "Later in the module you will read a paper that challenges part of this on methodological grounds.",
    "For the essay, the interesting question is not what happens but why the effect varies so much from one site to another.",
  ];
};

const FILLER_TAILS = [
  "It is a small detail, but it comes up in almost every session.",
  "I mention it because two people asked about exactly that last week.",
  "You do not need to write that part down.",
  "That has been the position since the review was completed.",
  "It applies all year, not only in the busy months.",
  "The wording on the website is clearer than the printed version.",
  "I will say a little more about that at the end if there is time.",
  "Most people find it makes sense once they have seen the layout.",
];

/** Produces an endless supply of distinct filler lines for a section. */
const fillerLines = (section: Section, topic: string, random: () => number) => {
  const base = shuffled(fillerPool(section, topic), random);
  const tails = shuffled(FILLER_TAILS, random);
  const speaker = section === 1 ? "Receptionist" : section === 2 ? "Speaker" : section === 3 ? "Tutor" : "Lecturer";
  const out: string[] = [];
  for (let round = 0; round < tails.length; round += 1) {
    base.forEach(sentence => {
      out.push(round === 0 ? `${speaker}: ${sentence}` : `${speaker}: ${sentence} ${tails[round]}`);
    });
  }
  return out;
};

const padToTarget = (lines: string[], targetWords: number, section: Section, topic: string, random: () => number) => {
  const pool = fillerLines(section, topic, random);
  let index = 0;
  while (wordCount(lines.join("\n")) < targetWords && index < pool.length) {
    lines.splice(Math.min(lines.length - 1, 4 + index * 3), 0, pool[index]);
    index += 1;
  }
  return lines;
};

/** Makes any verbatim repeated line unique so the audio never loops a sentence. */
const dedupeLines = (lines: string[], random: () => number) => {
  const tails = shuffled(FILLER_TAILS, random);
  const seen = new Map<string, number>();
  return lines.map(line => {
    const count = seen.get(line) ?? 0;
    seen.set(line, count + 1);
    if (count === 0) return line;
    return `${line} ${tails[(count - 1) % tails.length]}`;
  });
};

const SECTION_ONE_OPENINGS = [
  (topic: string) => [
    `Receptionist: Good morning, ${topic} enquiries, Ruth speaking.`,
    "Caller: Oh, hello. I was hoping to sort something out today, if that's possible.",
    "Receptionist: It should be. Let me open a new record and we can work through it together.",
  ],
  (topic: string) => [
    "Receptionist: Hello, reception.",
    `Caller: Hi. I rang yesterday about ${topic} but the line was engaged, so I'm trying again.`,
    "Receptionist: Sorry about that, we were rather busy. I have the form on screen now, so let's go through it.",
  ],
  (topic: string) => [
    `Receptionist: Good afternoon, you've come through to the office that deals with ${topic}.`,
    "Caller: Good afternoon. A colleague suggested I speak to you rather than filling anything in online.",
    "Receptionist: That's usually quicker, yes. I'll take the details over the phone.",
  ],
];

const SECTION_TWO_OPENINGS = [
  (topic: string) => [
    `Speaker: Right, if everyone can hear me at the back - welcome, and thank you for coming along to hear about ${topic}.`,
    "Speaker: I'll talk for about ten minutes, and then there will be time for questions before we move off.",
  ],
  (topic: string) => [
    `Speaker: Good morning everybody. My name's Dan and I look after ${topic}.`,
    "Speaker: I'd like to run through the practical arrangements first, because that's what people usually want to know.",
  ],
  (topic: string) => [
    `Speaker: Before we start, a quick word about ${topic}, since a few things have changed since the leaflets were printed.`,
    "Speaker: I'll keep it brief, but do make a note of anything that affects your own plans.",
  ],
];

const SECTION_THREE_OPENINGS = [
  (topic: string, a: string, b: string) => [
    `Tutor: Come in, both of you. So, ${topic} - where have you got to?`,
    `${a}: We've made a start, but we're not agreed on who does which part.`,
    `${b}: That's putting it politely. We've each assumed the other one was doing the difficult bits.`,
  ],
  (topic: string, a: string, b: string) => [
    `Tutor: Let's use this session to settle the division of work on ${topic}.`,
    `${a}: Good, because we tried to split it evenly and it didn't really work.`,
    `${b}: Some parts look small on paper and then take a whole week.`,
  ],
  (topic: string, a: string, b: string) => [
    `Tutor: How are you getting on with ${topic}?`,
    `${a}: Slowly. We've done the reading, but the planning has drifted a bit.`,
    `${b}: I think we need someone to arbitrate, honestly.`,
  ],
];

const SECTION_FOUR_OPENINGS = [
  (topic: string) => [
    `Lecturer: In this lecture I want to look at ${topic}, and in particular at why the evidence is harder to interpret than it first appears.`,
    "Lecturer: I'll define the key terms as I go, then turn to the measurements, and finish with the implications for practice.",
  ],
  (topic: string) => [
    `Lecturer: Today's subject is ${topic}. It's an area where the everyday explanation and the research picture have drifted apart.`,
    "Lecturer: I'll start with the definitions, because a good deal of the disagreement comes down to how the terms are used.",
  ],
  (topic: string) => [
    `Lecturer: We're continuing the module with ${topic}, which brings together several of the ideas from last week.`,
    "Lecturer: There's a fair amount of detail, so I'll signal each stage rather than expecting you to follow the numbering on the handout.",
  ],
];

const buildSectionOne = (set: ListeningPracticeSet, random: () => number) => {
  const topic = set.title.toLowerCase();
  const lines = [...pick(SECTION_ONE_OPENINGS, random)(topic)];

  set.questions.forEach((question, index) => {
    const answer = answerText(question);
    const phrase = promptPhrase(question.prompt);
    const asks = [
      `Receptionist: And can I ask about ${phrase}?`,
      `Receptionist: The next thing on the form is ${phrase}.`,
      `Receptionist: Now, ${phrase} - what should I put?`,
      `Receptionist: It's asking me here for ${phrase}.`,
    ];
    lines.push(pick(asks, random));

    const replies = [
      `Caller: ${answer}.`,
      `Caller: It's ${answer}, I think - yes, ${answer}.`,
      `Caller: Let me just check the letter in front of me. Right, ${answer}.`,
      `Caller: ${answer}. I hope that's the sort of thing you need.`,
    ];
    lines.push(pick(replies, random));

    const spelled = spellOut(answer);
    if (spelled && index % 4 === 1) {
      lines.push(`Receptionist: Would you mind spelling that?`);
      lines.push(`Caller: Of course - ${spelled}.`);
    } else if (index % 3 === 2) {
      lines.push(pick([
        "Receptionist: Lovely, that's gone in.",
        "Receptionist: Right, I've typed that.",
        "Receptionist: Got it, thank you.",
      ], random));
    }
    if (question.type === "mcq") {
      const others = otherOptions(question);
      if (others.length) {
        lines.push(`Caller: I did wonder about ${others.slice(0, 2).join(" or ")}, but that isn't how it has worked out.`);
      }
    }
  });

  lines.push(pick([
    "Receptionist: That's everything I need. You'll get an email within the hour, and do ring back if anything looks wrong.",
    "Receptionist: Right, that's the record complete. The confirmation goes out tonight.",
    "Receptionist: Lovely, all done. I'll send the details over and you can check them at your leisure.",
  ], random));
  lines.push("Caller: Thank you, that's been very helpful.");
  return dedupeLines(padToTarget(lines, 540, 1, topic, random), random).join("\n");
};

const buildSectionTwo = (set: ListeningPracticeSet, random: () => number) => {
  const topic = set.title.toLowerCase();
  const lines = [...pick(SECTION_TWO_OPENINGS, random)(topic)];

  set.questions.forEach((question, index) => {
    const answer = answerText(question);
    const phrase = promptPhrase(question.prompt);
    if (question.type === "mcq") {
      const others = otherOptions(question);
      if (others.length >= 2) {
        lines.push(`Speaker: People often ask about ${phrase}. I know some of you will have heard about ${others[0]}, and there was a suggestion at one point about ${others[1]}.`);
      } else if (others.length === 1) {
        lines.push(`Speaker: On ${phrase} - you may have come across ${others[0]} somewhere.`);
      } else {
        lines.push(`Speaker: A word now about ${phrase}.`);
      }
      lines.push(pick([
        `Speaker: What actually happens here is ${answer}.`,
        `Speaker: In practice, it comes down to ${answer}.`,
        `Speaker: The arrangement we work to is ${answer}.`,
      ], random));
    } else if (question.type === "matching") {
      lines.push(`Speaker: If you're looking at ${phrase}, that belongs with ${answer} rather than with the area immediately before it.`);
    } else {
      lines.push(pick([
        `Speaker: Worth noting: ${fillPromptWithAnswer(question.prompt, answer)}`,
        `Speaker: And here's a detail people miss - ${fillPromptWithAnswer(question.prompt, answer)}`,
        `Speaker: One more thing. ${fillPromptWithAnswer(question.prompt, answer)}`,
      ], random));
    }
    if (index % 3 === 1) {
      lines.push(pick([
        "Speaker: That was decided after we asked visitors what they found confusing, and it seems to be working.",
        "Speaker: It sounds like a small point, but it saves a good deal of queueing on busy afternoons.",
        "Speaker: The reason is practical rather than financial, I should say.",
      ], random));
    }
  });

  lines.push(pick([
    "Speaker: That's the main information. If you're using the printed map, follow the route I've just described rather than the dotted line on the map itself.",
    "Speaker: Right, I'll stop there. There's a leaflet by the door with the timings, though the rest of it is a year out of date.",
    "Speaker: That covers the essentials. I'll be at the front if you want to check anything before we set off.",
  ], random));
  return dedupeLines(padToTarget(lines, 780, 2, topic, random), random).join("\n");
};

const personForLetter = (options: MatchingOption[] | undefined, letter: string) => {
  const found = options?.find(option => option.letter === letter);
  return found?.text ?? letter;
};

const buildSectionThree = (set: ListeningPracticeSet, random: () => number) => {
  const topic = set.title.toLowerCase();
  const options = set.matchingOptions;
  const first = options?.[0]?.text ?? "Student A";
  const second = options?.[1]?.text ?? "Student B";
  const lines = [...pick(SECTION_THREE_OPENINGS, random)(topic, first, second)];

  // Speak the items in a different order from the printed task.
  const order = shuffled(set.questions.map((_, index) => index), random);
  order.forEach((questionIndex, position) => {
    const question = set.questions[questionIndex];
    const answer = answerText(question);
    const phrase = promptPhrase(question.prompt);
    const responsible = question.type === "matching" ? personForLetter(options, answer) : answer;
    const proposer = position % 2 === 0 ? first : second;
    const other = position % 2 === 0 ? second : first;

    if (question.type === "matching") {
      lines.push(pick([
        `${proposer}: What about ${phrase}? I assumed ${other} would pick that up.`,
        `${proposer}: Then there's ${phrase}. I'd rather not add that to my list.`,
        `${proposer}: We still haven't sorted ${phrase}.`,
      ], random));
      lines.push(pick([
        `${other}: I could, but I've already got two of the longer sections, and that one needs proper checking.`,
        `${other}: Not this week, honestly. I'd end up rushing it.`,
        `${other}: I'd rather swap - it overlaps with the part I'm least confident about.`,
      ], random));
      lines.push(pick([
        `Tutor: Then ${responsible} should take ${phrase}. That fits better with the rest of the workload.`,
        `Tutor: Let's put ${phrase} with ${responsible}, and move on.`,
        `Tutor: Fine. ${responsible}, ${phrase} is yours - make a note of it.`,
      ], random));
    } else if (question.type === "mcq") {
      const others = otherOptions(question);
      if (others.length) {
        lines.push(`${proposer}: On ${phrase}, we were torn between ${others.slice(0, 2).join(" and ")}.`);
      }
      lines.push(`Tutor: I'd go with ${answer}, given what the data actually allows you to claim.`);
    } else {
      lines.push(`${proposer}: And ${phrase}?`);
      lines.push(`Tutor: ${fillPromptWithAnswer(question.prompt, answer)}`);
    }

    if (position % 4 === 3) {
      lines.push(pick([
        `${first}: That's fine by me, as long as we set a date for the first draft.`,
        `${second}: Agreed. I'll put it in the shared document tonight.`,
        `${first}: Can we review it next week in case the balance shifts?`,
      ], random));
    }
  });

  lines.push("Tutor: Good. Check your notes against each other before you leave, because one or two allocations changed while we were talking.");
  lines.push(`${second}: We will. Thanks for sorting it out.`);
  return dedupeLines(padToTarget(lines, 850, 3, topic, random), random).join("\n");
};

const buildSectionFour = (set: ListeningPracticeSet, random: () => number) => {
  const topic = set.title.toLowerCase();
  const lines = [...pick(SECTION_FOUR_OPENINGS, random)(topic)];

  set.questions.forEach((question, index) => {
    const answer = answerText(question);
    const completed = question.type === "fill-in"
      ? fillPromptWithAnswer(question.prompt, answer)
      : `${promptPhrase(question.prompt)} is best understood as ${answer}.`;
    const signals = [
      "Lecturer: Let's begin with the basic picture.",
      "Lecturer: That leads to the second strand of the research.",
      "Lecturer: Now, the measurements themselves.",
      "Lecturer: There is a further complication here.",
      "Lecturer: This next point tends to be the one students find counter-intuitive.",
      "Lecturer: Turning to the wider consequences,",
    ];
    lines.push(`${signals[index % signals.length]} ${completed}`);
    lines.push(pick([
      "Lecturer: What makes that significant is the underlying process rather than the label itself.",
      "Lecturer: Notice that the effect is described as a tendency, not as something that happens in every case.",
      "Lecturer: The figure has been revised twice, and the current estimate is the one used in the reading list.",
      "Lecturer: That distinction matters when you compare studies carried out in different decades.",
    ], random));
    if (question.type === "mcq") {
      const others = otherOptions(question);
      if (others.length) {
        lines.push(`Lecturer: You will also see ${others.slice(0, 2).join(" and ")} discussed in the literature, largely for historical reasons.`);
      }
    }
  });

  lines.push("Lecturer: I'll leave it there. Next week we'll set this against a case study and look at how policy responded to the same evidence.");
  return dedupeLines(padToTarget(lines, 850, 4, topic, random), random).join("\n");
};

const buildTranscript = (set: ListeningPracticeSet, random: () => number) => {
  // Authored recordings always win over the legacy generated fallback.
  const authored = AUTHORED_LISTENING_TRANSCRIPTS[set.id];
  if (authored && authored.trim()) return authored;
  switch (set.section) {
    case 1:
      return buildSectionOne(set, random);
    case 2:
      return buildSectionTwo(set, random);
    case 3:
      return buildSectionThree(set, random);
    case 4:
      return buildSectionFour(set, random);
    default:
      return set.transcript;
  }
};

const WORD_LIMIT_EN = "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.";
const WORD_LIMIT_VI = "Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.";

/** Keeps the authored instructions and only appends a missing word limit. */
const withWordLimit = (set: ListeningPracticeSet) => {
  const hasFill = set.questions.some(question => question.type === "fill-in");
  const context = hasFill && !/NO MORE THAN/i.test(set.context)
    ? `${set.context.trim()} ${WORD_LIMIT_EN}`
    : set.context;
  const contextVi = hasFill && !/KHÔNG QUÁ/i.test(set.contextVi)
    ? `${set.contextVi.trim()} ${WORD_LIMIT_VI}`
    : set.contextVi;
  return { context, contextVi };
};

export const upgradeListeningSet = (set: ListeningPracticeSet): ListeningPracticeSet => {
  const random = makeRandom(hashText(set.id));
  const balanced = rebalanceMatching(set, random);
  const withKeys: ListeningPracticeSet = {
    ...set,
    questions: balanced.questions,
    ...(balanced.matchingOptions ? { matchingOptions: balanced.matchingOptions } : {}),
  };
  const questions = normaliseQuestions(withKeys, random);
  const prepared = { ...withKeys, questions };
  const { context, contextVi } = withWordLimit(prepared);
  return {
    ...prepared,
    context,
    contextVi,
    transcript: buildTranscript(prepared, random),
    rate: set.section === 4 ? 0.8 : set.section === 3 ? 0.85 : set.section === 2 ? 0.87 : 0.84,
  };
};
