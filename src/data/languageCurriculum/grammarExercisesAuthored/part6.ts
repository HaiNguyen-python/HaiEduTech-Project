/**
 * @file grammarExercisesAuthored/part6.ts
 * @description Hand-written top-up practice (batch 6) for lessons that still
 *              lacked exercise count or type variety after the generator.
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart6: Record<string, InteractiveExercise[]> = {
  "tenses-present": [
    {
      type: "matching",
      instruction: "Nối câu với cách dùng thì hiện tại.",
      instructionEn: "Match each sentence with the use of the present tense.",
      pairs: [
        { left: "Water boils at 100 degrees.", right: "a scientific fact" },
        { left: "I am living with my cousin this term.", right: "a temporary situation" },
        { left: "She has just handed in her essay.", right: "a very recent action" },
        { left: "We meet the tutor every Thursday.", right: "a fixed routine" },
        { left: "They have been revising since dawn.", right: "an action still in progress" },
      ],
    },
  ],

  "tenses-perfect-continuous": [
    {
      type: "matching",
      instruction: "Nối câu với ý nghĩa.",
      instructionEn: "Match the sentence with its meaning.",
      pairs: [
        { left: "I have been reading all morning.", right: "the activity is still going on" },
        { left: "I have read the whole chapter.", right: "the result matters, the task is done" },
        { left: "She had been driving for hours.", right: "a long action before another past event" },
        { left: "By May he will have been teaching for ten years.", right: "duration up to a future point" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp thành câu hoàn thành tiếp diễn.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["We", "have", "been", "waiting", "for", "the", "results", "since", "Monday"],
          correct: "We have been waiting for the results since Monday",
        },
        {
          scrambled: ["She", "had", "been", "studying", "Finnish", "before", "she", "moved", "to", "Turku"],
          correct: "She had been studying Finnish before she moved to Turku",
        },
      ],
    },
  ],

  "tenses-mixed-mastery": [
    {
      type: "matching",
      instruction: "Nối dấu hiệu thời gian với thì phù hợp.",
      instructionEn: "Match each time marker with the tense it signals.",
      pairs: [
        { left: "since last April", right: "present perfect or present perfect continuous" },
        { left: "two years ago", right: "past simple" },
        { left: "by next December", right: "future perfect" },
        { left: "at the moment", right: "present continuous" },
        { left: "while I was cooking", right: "past continuous" },
      ],
    },
  ],

  "conditionals-advanced": [
    {
      type: "matching",
      instruction: "Nối câu điều kiện với loại của nó.",
      instructionEn: "Match each conditional with its type.",
      pairs: [
        { left: "If I had saved more, I would be debt free now.", right: "mixed: past condition, present result" },
        { left: "If she takes the early bus, she arrives on time.", right: "zero conditional: a regular result" },
        { left: "If we had booked earlier, we would have paid less.", right: "third conditional: unreal past" },
        { left: "If they were here, they would help.", right: "second conditional: unreal present" },
      ],
    },
  ],

  "passive-basic": [
    {
      type: "matching",
      instruction: "Nối câu bị động với thì.",
      instructionEn: "Match each passive sentence with its tense.",
      pairs: [
        { left: "The forms are checked daily.", right: "present simple passive" },
        { left: "The forms were checked yesterday.", right: "past simple passive" },
        { left: "The forms are being checked now.", right: "present continuous passive" },
        { left: "The forms have been checked already.", right: "present perfect passive" },
      ],
    },
  ],

  "reported-commands": [
    {
      type: "transformation",
      instruction: "Chuyển sang câu tường thuật dạng mệnh lệnh.",
      instructionEn: "Report each command or request.",
      items: [
        {
          prompt: '"Close the window, please," she said.',
          target: "She asked me to close the window.",
          goal: "Use asked plus object plus to infinitive.",
        },
        {
          prompt: '"Do not touch the wires," the technician said.',
          target: "The technician told us not to touch the wires.",
          goal: "Negative command takes not to.",
        },
        {
          prompt: '"Hand in the form by Friday," the clerk said.',
          target: "The clerk told me to hand in the form by Friday.",
          goal: "Use told plus object plus to infinitive.",
        },
      ],
    },
  ],

  "reported-questions": [
    {
      type: "matching",
      instruction: "Nối câu hỏi trực tiếp với câu hỏi tường thuật.",
      instructionEn: "Match the direct question with its reported form.",
      pairs: [
        { left: '"Where do you live?"', right: "He asked me where I lived." },
        { left: '"Are you ready?"', right: "He asked whether I was ready." },
        { left: '"When did she call?"', right: "He asked when she had called." },
        { left: '"Can you drive?"', right: "He asked if I could drive." },
      ],
    },
  ],

  "relative-defining": [
    {
      type: "matching",
      instruction: "Nối đại từ quan hệ với chức năng.",
      instructionEn: "Match each relative pronoun with its use.",
      pairs: [
        { left: "who", right: "subject that is a person" },
        { left: "whom", right: "object that is a person, formal" },
        { left: "which", right: "a thing or an animal" },
        { left: "whose", right: "possession" },
        { left: "where", right: "a place" },
        { left: "when", right: "a time" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp thành mệnh đề quan hệ xác định.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["The", "book", "that", "I", "borrowed", "is", "overdue"],
          correct: "The book that I borrowed is overdue",
        },
        {
          scrambled: ["The", "tutor", "who", "marked", "my", "essay", "was", "very", "fair"],
          correct: "The tutor who marked my essay was very fair",
        },
      ],
    },
  ],

  "relative-nondefining": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi mệnh đề quan hệ không xác định.",
      instructionEn: "Correct the non-defining relative clause.",
      items: [
        {
          wrong: "My sister, that lives in Hue, is a nurse.",
          correct: "My sister, who lives in Hue, is a nurse.",
          explanation: "That is not used in non-defining clauses.",
        },
        {
          wrong: "The report which was published in May caused a debate, it was long.",
          correct: "The report, which was published in May, caused a debate.",
          explanation: "Extra information needs commas on both sides.",
        },
        {
          wrong: "Hanoi where I grew up has changed a lot.",
          correct: "Hanoi, where I grew up, has changed a lot.",
          explanation: "A unique place takes a non-defining clause with commas.",
        },
      ],
    },
  ],

  "relative-reduced": [
    {
      type: "transformation",
      instruction: "Rút gọn mệnh đề quan hệ.",
      instructionEn: "Reduce the relative clause.",
      items: [
        {
          prompt: "The students who are waiting outside are first-years.",
          target: "The students waiting outside are first-years.",
          goal: "Drop who are and keep the participle.",
        },
        {
          prompt: "The email which was sent this morning has an attachment.",
          target: "The email sent this morning has an attachment.",
          goal: "Drop which was before a past participle.",
        },
        {
          prompt: "The girl who is sitting by the door is my cousin.",
          target: "The girl sitting by the door is my cousin.",
          goal: "Use the ing form.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối dạng đầy đủ với dạng rút gọn.",
      instructionEn: "Match the full clause with its reduced form.",
      pairs: [
        { left: "the man who is standing there", right: "the man standing there" },
        { left: "the parcel that was delivered today", right: "the parcel delivered today" },
        { left: "the people who were invited", right: "the people invited" },
        { left: "the road which leads to the lake", right: "the road leading to the lake" },
      ],
    },
  ],

  "articles-usage": [
    {
      type: "matching",
      instruction: "Nối cách dùng mạo từ với ví dụ.",
      instructionEn: "Match each article rule with an example.",
      pairs: [
        { left: "a or an: first mention", right: "I bought a notebook this morning." },
        { left: "the: already known", right: "The notebook was quite cheap." },
        { left: "the: unique thing", right: "The sun rose at six." },
        { left: "no article: general plural", right: "Notebooks are cheaper online." },
      ],
    },
  ],

  "grammar-articles-abstract": [
    {
      type: "matching",
      instruction: "Nối danh từ trừu tượng với cách dùng mạo từ.",
      instructionEn: "Match each abstract noun phrase with the article rule.",
      pairs: [
        { left: "Happiness matters more than money.", right: "no article for a general idea" },
        { left: "The happiness of her students was clear.", right: "the when the idea is specified" },
        { left: "He showed a patience I had never seen.", right: "a when the quality is a particular instance" },
        { left: "Education should be free.", right: "no article for a whole field" },
      ],
    },
  ],

  "articles-phrasal-verbs": [
    {
      type: "matching",
      instruction: "Nối cụm động từ với nghĩa.",
      instructionEn: "Match each phrasal verb with its meaning.",
      pairs: [
        { left: "give up", right: "stop doing something" },
        { left: "bring up", right: "raise a topic or a child" },
        { left: "carry out", right: "perform a task or study" },
        { left: "point out", right: "draw attention to a fact" },
        { left: "set up", right: "establish or arrange something" },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi mạo từ và cụm động từ.",
      instructionEn: "Correct the article or phrasal verb.",
      items: [
        {
          wrong: "She brought up a interesting point.",
          correct: "She brought up an interesting point.",
          explanation: "An is used before a vowel sound.",
        },
        {
          wrong: "They carried the survey out of last month.",
          correct: "They carried out the survey last month.",
          explanation: "Carry out is not followed by of.",
        },
      ],
    },
  ],

  "prepositions-common": [
    {
      type: "matching",
      instruction: "Nối giới từ với cách dùng.",
      instructionEn: "Match each preposition with its use.",
      pairs: [
        { left: "at", right: "an exact time or point" },
        { left: "on", right: "a day, a date or a surface" },
        { left: "in", right: "a month, a year or an enclosed space" },
        { left: "by", right: "not later than a deadline" },
        { left: "during", right: "throughout a period" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu có giới từ.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["The", "lecture", "starts", "at", "nine", "on", "Monday"],
          correct: "The lecture starts at nine on Monday",
        },
        {
          scrambled: ["Please", "send", "the", "form", "by", "Friday", "afternoon"],
          correct: "Please send the form by Friday afternoon",
        },
      ],
    },
  ],

  "prepositions-time-place": [
    {
      type: "matching",
      instruction: "Nối cụm giới từ chỉ nơi chốn với nghĩa.",
      instructionEn: "Match each place phrase with its meaning.",
      pairs: [
        { left: "in the corner", right: "inside a room, where two walls meet" },
        { left: "on the corner", right: "at the outside meeting point of two streets" },
        { left: "at the corner", right: "at that point as a location on a route" },
        { left: "under the bridge", right: "below the structure" },
        { left: "across from the bank", right: "on the opposite side" },
      ],
    },
  ],

  "prepositions-confusing": [
    {
      type: "matching",
      instruction: "Nối cặp giới từ dễ nhầm với cách dùng.",
      instructionEn: "Match each tricky preposition with its use.",
      pairs: [
        { left: "between", right: "two clearly separate things" },
        { left: "among", right: "a group of three or more" },
        { left: "beside", right: "next to something" },
        { left: "besides", right: "in addition to something" },
        { left: "until", right: "up to a point in time" },
      ],
    },
  ],

  "dependent-prepositions": [
    {
      type: "matching",
      instruction: "Nối động từ hoặc tính từ với giới từ đi kèm.",
      instructionEn: "Match each word with the preposition that follows it.",
      pairs: [
        { left: "depend", right: "on" },
        { left: "afraid", right: "of" },
        { left: "interested", right: "in" },
        { left: "belong", right: "to" },
        { left: "good", right: "at" },
        { left: "responsible", right: "for" },
      ],
    },
    {
      type: "fill-in-blank",
      instruction: "Điền giới từ đi kèm.",
      instructionEn: "Complete each sentence with the dependent preposition.",
      wordBank: ["on", "of", "in", "at", "for", "to"],
      sentences: [
        {
          text: "The result depends ___ the weather.",
          textEn: "The result depends ___ the weather.",
          answer: "on",
        },
        {
          text: "She is very good ___ mental maths.",
          textEn: "She is very good ___ mental maths.",
          answer: "at",
        },
        {
          text: "He is responsible ___ the schedule.",
          textEn: "He is responsible ___ the schedule.",
          answer: "for",
        },
        {
          text: "I am interested ___ data engineering.",
          textEn: "I am interested ___ data engineering.",
          answer: "in",
        },
      ],
    },
  ],
};
