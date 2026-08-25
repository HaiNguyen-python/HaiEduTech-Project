/**
 * Runtime content upgrade layer for IELTS Listening practice sets.
 * It keeps stable IDs while expanding scripts to a more realistic IELTS length.
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet, ListeningQuestion } from "./ieltsListeningPractice";

type MatchingOption = NonNullable<ListeningPracticeSet["matchingOptions"]>[number];

const wordCount = (text: string) => (text.match(/[A-Za-zÀ-ỹ0-9']+/g) ?? []).length;

const collapseSpaces = (text: string) => text.replace(/\s+/g, " ").trim();

const cleanPrompt = (prompt: string) =>
  collapseSpaces(
    prompt
      .replace(/_+/g, "blank")
      .replace(/\s+:/g, ":")
      .replace(/\s+\?/g, "?")
      .replace(/\s+\./g, "."),
  );

const answerText = (question: ListeningQuestion) => {
  if (question.type === "fill-in" || question.type === "matching") return String(question.answer);
  const option = question.options[question.answer];
  return typeof option === "string" ? option : "the confirmed option";
};

const fillPromptWithAnswer = (prompt: string, answer: string) => {
  if (prompt.includes("___")) return prompt.replace(/___+/g, answer);
  return `${prompt} ${answer}`;
};

const inferredMaxWords = (answer: string) => {
  const trimmed = answer.trim();
  if (/^[A-Z]{1,3}\d/.test(trimmed) || /\d/.test(trimmed)) return 2;
  return Math.max(1, Math.min(3, trimmed.split(/\s+/).length));
};

const hashText = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
};

const rotateMcqAnswer = (question: Extract<ListeningQuestion, { type: "mcq" }>, targetIndex: number) => {
  const currentAnswer = question.options[question.answer];
  if (typeof currentAnswer !== "string") return question;
  const remaining = question.options.filter((_, index) => index !== question.answer);
  const options = [...remaining];
  options.splice(targetIndex, 0, currentAnswer);
  return { ...question, options, answer: targetIndex };
};

const normaliseQuestions = (set: ListeningPracticeSet): ListeningQuestion[] =>
  set.questions.map((question, index) => {
    if (question.type === "mcq") {
      const targetIndex = (hashText(set.id) + index) % Math.max(1, question.options.length);
      return rotateMcqAnswer(question, targetIndex);
    }
    if (question.type !== "fill-in") return question;
    const answer = String(question.answer);
    const inferred = inferredMaxWords(answer);
    return {
      ...question,
      maxWords: Math.max(question.maxWords ?? inferred, inferred),
    };
  });

const optionDistractors = (question: ListeningQuestion) => {
  if (question.type !== "mcq") return [];
  return question.options.filter((_, index) => index !== question.answer).slice(0, 3);
};

const naturalAnswerRepeat = (answer: string) => {
  if (/^[A-Z0-9 ]{4,}$/.test(answer)) {
    return `${answer}. I will say it slowly once more for the form: ${answer}.`;
  }
  return answer;
};

const padToTarget = (lines: string[], targetWords: number, section: ListeningPracticeSet["section"], title: string) => {
  const additions: Record<ListeningPracticeSet["section"], string[]> = {
    1: [
      "Staff: Before I close the form, I need to check the information in the same order as it appears on the screen, because small errors in dates, fees and reference details can delay the booking.",
      "Caller: That's fine. Some of those details sounded similar to alternatives I had considered earlier, so it is useful to confirm the final version rather than the first possibility mentioned.",
      "Staff: Exactly. In this type of booking, the important thing is to listen for corrections, repeated spellings and the final confirmation after the customer changes or rejects an option.",
    ],
    2: [
      "Speaker: I should emphasise that several older leaflets and signs still mention previous arrangements, so please rely on the details I am giving now rather than assuming the most obvious option is correct.",
      "Speaker: The main points are connected: opening times affect visitor flow, facilities affect safety, and the recommended route is designed to prevent people from missing the less visible parts of the site.",
      "Speaker: Listen especially for contrast words such as however, instead and although, because those are where the final answer often differs from the first detail you hear.",
    ],
    3: [
      "Tutor: What I want you both to notice is that a good academic plan changes as people challenge each other's first ideas. Do not simply write down the first name you hear beside a task.",
      "Student: That makes sense. Some responsibilities sounded suitable for one person at first, but after considering workload, evidence and deadlines, we moved them to someone else.",
      "Tutor: Precisely. In a real seminar, the decision is often signalled by phrases such as in that case, let's leave that to, or actually it would be better if.",
    ],
    4: [
      "Lecturer: To place this in a broader academic context, the issue is not a single isolated fact but a chain of causes, measurements and consequences that researchers are still debating.",
      "Lecturer: One limitation of the evidence is that short-term studies often produce clearer results than long-term field observations, so interpretation requires caution.",
      "Lecturer: For examination purposes, listen for definitions, classifications, numerical evidence and the speaker's final evaluation, because those points usually carry the key information.",
    ],
  };

  let index = 0;
  while (wordCount(lines.join("\n")) < targetWords) {
    const addition = additions[section][index % additions[section].length];
    lines.push(`${addition} Topic focus: ${title}.`);
    index += 1;
  }
  return lines;
};

const buildSectionOneTranscript = (set: ListeningPracticeSet) => {
  const lines = [
    `Receptionist: Good morning. You are through to the office dealing with ${set.title.toLowerCase()}. How can I help?`,
    "Caller: Hello. I would like to make an arrangement today, but I may need to check a few details as we go along.",
    "Receptionist: That is completely fine. I will complete the form step by step and repeat the final details before I submit it.",
    "Caller: Thank you. Some of the details have changed since I first looked online, so please use what I confirm in this call.",
  ];

  set.questions.forEach((question, index) => {
    const answer = naturalAnswerRepeat(answerText(question));
    const prompt = cleanPrompt(question.prompt);
    const earlier = index % 3 === 0 ? "I had written a different detail in my notes earlier," : "The website gave a similar option,";
    lines.push(`Receptionist: For item ${index + 1}, I need the detail connected with ${prompt}.`);
    lines.push(`Caller: ${earlier} but the correct information to enter now is ${answer}.`);
    lines.push(`Receptionist: Let me read that back carefully: ${answer}. I will record that as the final answer, not the earlier possibility.`);
  });

  lines.push("Receptionist: I have now checked the spelling, numbers and charges. You will receive the confirmation by email, and the booking is active from today.");
  lines.push("Caller: Perfect. Thank you for repeating the details clearly.");
  return padToTarget(lines, 520, 1, set.title).join("\n");
};

const buildSectionTwoTranscript = (set: ListeningPracticeSet) => {
  const lines = [
    `Speaker: Good morning everyone. This talk introduces ${set.title.toLowerCase()}, and I will describe the arrangements in the order visitors usually encounter them.`,
    "Speaker: Some details have changed recently, so listen carefully for corrections and contrasts rather than relying on the most familiar option.",
    "Speaker: I will also point out several common misunderstandings, because they are exactly the things visitors tend to remember incorrectly.",
  ];

  set.questions.forEach((question, index) => {
    const prompt = cleanPrompt(question.prompt);
    const answer = answerText(question);
    const distractors = optionDistractors(question);
    if (question.type === "mcq" && distractors.length) {
      const rejected = distractors.join(", ");
      lines.push(`Speaker: Regarding ${prompt}, you may hear people mention ${rejected}. Those are old arrangements, partial information or details for a different group.`);
      lines.push(`Speaker: The detail that applies to today's visitors is ${answer}, and that is the one you should remember.`);
    } else if (question.type === "matching") {
      lines.push(`Speaker: For ${prompt}, the correct category is ${answer}. I mention this after describing two alternatives, because the final route or facility is easy to confuse.`);
    } else {
      lines.push(`Speaker: A useful detail here is this: ${fillPromptWithAnswer(question.prompt, answer)}. This is not printed clearly on the old noticeboards, so please make a note of it.`);
    }
    if (index % 2 === 1) {
      lines.push("Speaker: The reason for the change is practical rather than financial, and it should make the visit smoother during busy periods.");
    }
  });

  lines.push("Speaker: That covers the main arrangements. If you are following a map, start with the current route I described, not the older route shown on last year's leaflet.");
  return padToTarget(lines, 740, 2, set.title).join("\n");
};

const personForLetter = (options: MatchingOption[] | undefined, letter: string) => {
  const found = options?.find(option => option.letter === letter);
  return found?.text ?? letter;
};

const buildSectionThreeTranscript = (set: ListeningPracticeSet) => {
  const options = set.matchingOptions;
  const first = options?.[0]?.text ?? "Student A";
  const second = options?.[1]?.text ?? "Student B";
  const tutor = options?.[2]?.text ?? "Tutor";
  const lines = [
    `Tutor: Let's spend this tutorial discussing ${set.title.toLowerCase()}. I want the plan to be realistic, not just divided evenly on paper.`,
    `${first}: I agree. Some tasks look simple at first, but they depend on evidence or software we have not finished using yet.`,
    `${second}: And we should avoid putting all the presentation or writing work on one person, because the deadline is close.`,
    "Tutor: Good. I will challenge a few first suggestions, so listen for the final decision after each discussion.",
  ];

  set.questions.forEach((question, index) => {
    const prompt = cleanPrompt(question.prompt.replace(/:\s*blank$/i, ""));
    const answer = answerText(question);
    const responsible = question.type === "matching" ? personForLetter(options, answer) : answer;
    const challenger = index % 2 === 0 ? second : first;
    const proposer = index % 2 === 0 ? first : second;
    lines.push(`${proposer}: For ${prompt}, my first thought was that ${challenger} could handle it, because it connects with earlier work.`);
    lines.push(`${challenger}: I could, but I am already responsible for another part, and this task needs someone with more time to check the details properly.`);
    lines.push(`Tutor: In that case, let's make the final decision that ${responsible} will take responsibility for ${prompt}. Please write that down as the agreed allocation.`);
    if (index % 3 === 2) {
      lines.push(`${responsible}: That works for me. I will prepare a short note explaining the evidence, so the rest of the group can still follow what I have done.`);
    }
  });

  lines.push("Tutor: Excellent. Notice that several decisions changed during the discussion, so the final allocation is not always the first person mentioned.");
  lines.push(`${first}: We will update the shared document tonight and mark the changed responsibilities in a different colour.`);
  lines.push(`${second}: Then we can use the next meeting to check whether the workload is still balanced.`);
  return padToTarget(lines, 850, 3, set.title).join("\n");
};

const buildSectionFourTranscript = (set: ListeningPracticeSet) => {
  const lines = [
    `Lecturer: In today's lecture we are examining ${set.title.toLowerCase()}. I will move from definitions to evidence, and then to the wider implications.`,
    "Lecturer: The topic is more complex than it first appears because researchers have to compare laboratory findings, field observations and long-term historical data.",
    "Lecturer: I will signpost each stage clearly, but you should listen for paraphrase rather than expecting the wording on your question paper to be repeated exactly.",
  ];

  set.questions.forEach((question, index) => {
    const answer = answerText(question);
    const completed = question.type === "fill-in" ? fillPromptWithAnswer(question.prompt, answer) : `${cleanPrompt(question.prompt)} ${answer}`;
    const signal = ["First", "A second point", "The next issue", "The evidence here", "A further implication"][index % 5];
    lines.push(`Lecturer: ${signal} is that ${completed}`);
    lines.push("Lecturer: This matters because it links the observable pattern to an underlying process, rather than simply naming a fact in isolation.");
    if (index % 2 === 0) {
      lines.push("Lecturer: Researchers have tested this through comparative studies, although the results vary depending on scale, measurement method and local conditions.");
    } else {
      lines.push("Lecturer: A common misconception is to treat this as a single cause problem, but the stronger interpretation considers several interacting variables.");
    }
  });

  lines.push("Lecturer: To conclude, the strongest answer is usually the one supported by a definition, a measurement and a consequence, not merely by a familiar term.");
  lines.push("Lecturer: In the next lecture, we will compare this topic with a related case study and evaluate the policy or practical responses in more detail.");
  return padToTarget(lines, 830, 4, set.title).join("\n");
};

const buildTranscript = (set: ListeningPracticeSet) => {
  switch (set.section) {
    case 1:
      return buildSectionOneTranscript(set);
    case 2:
      return buildSectionTwoTranscript(set);
    case 3:
      return buildSectionThreeTranscript(set);
    case 4:
      return buildSectionFourTranscript(set);
    default:
      return set.transcript;
  }
};

const upgradedContext = (set: ListeningPracticeSet) => {
  if (set.section === 1) {
    return "You will hear a longer telephone conversation. Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Listen for corrections and final confirmations.";
  }
  if (set.section === 2) {
    return "You will hear a public talk or announcement. Choose the correct answer for each question. Listen for contrasts, changed arrangements and rejected options.";
  }
  if (set.section === 3) {
    return "You will hear an academic discussion between students and a tutor. Complete the task by following the final decisions, not only the first suggestion.";
  }
  return "You will hear part of an academic lecture. Complete each answer with NO MORE THAN TWO WORDS OR A NUMBER from the recording. Listen for definitions, evidence and implications.";
};

const upgradedContextVi = (set: ListeningPracticeSet) => {
  if (set.section === 1) {
    return "Bạn sẽ nghe một cuộc gọi dài hơn. Hoàn thành ghi chú. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án. Chú ý phần sửa lại và xác nhận cuối cùng.";
  }
  if (set.section === 2) {
    return "Bạn sẽ nghe một bài nói hoặc thông báo công cộng. Chọn đáp án đúng. Chú ý các ý tương phản, thay đổi và phương án bị loại.";
  }
  if (set.section === 3) {
    return "Bạn sẽ nghe thảo luận học thuật giữa sinh viên và giảng viên. Theo dõi quyết định cuối cùng, không chỉ gợi ý đầu tiên.";
  }
  return "Bạn sẽ nghe một phần bài giảng học thuật. Điền KHÔNG QUÁ HAI TỪ HOẶC MỘT SỐ từ bài nghe. Chú ý định nghĩa, dẫn chứng và hàm ý.";
};

export const upgradeListeningSet = (set: ListeningPracticeSet): ListeningPracticeSet => {
  const questions = normaliseQuestions(set);
  const upgradedSet = { ...set, questions };
  return {
    ...upgradedSet,
    context: upgradedContext(set),
    contextVi: upgradedContextVi(set),
    transcript: buildTranscript(upgradedSet),
    rate: set.section === 4 ? 0.78 : set.section === 3 ? 0.84 : set.section === 2 ? 0.86 : 0.82,
  };
};
