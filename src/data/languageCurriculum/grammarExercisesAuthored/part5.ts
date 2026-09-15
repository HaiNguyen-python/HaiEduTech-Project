/**
 * @file grammarExercisesAuthored/part5.ts
 * @description Hand-written, topic-specific practice (batch 5).
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart5: Record<string, InteractiveExercise[]> = {
  "question-forms": [
    {
      type: "transformation",
      instruction: "Đặt câu hỏi cho phần được gợi ý.",
      instructionEn: "Write a question for the underlined idea.",
      items: [
        {
          prompt: "She left the office at six. (time)",
          target: "What time did she leave the office?",
          goal: "Auxiliary did plus the base verb.",
        },
        {
          prompt: "They are staying in Da Nang. (place)",
          target: "Where are they staying?",
          goal: "Invert be with the subject.",
        },
        {
          prompt: "Minh wrote the report. (subject)",
          target: "Who wrote the report?",
          goal: "A subject question needs no auxiliary.",
        },
        {
          prompt: "He has finished three chapters. (quantity)",
          target: "How many chapters has he finished?",
          goal: "How many plus the plural noun first.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu hỏi.",
      instructionEn: "Correct the question.",
      items: [
        {
          wrong: "Where you did put the keys?",
          correct: "Where did you put the keys?",
          explanation: "The auxiliary comes before the subject.",
        },
        {
          wrong: "Who did write this note?",
          correct: "Who wrote this note?",
          explanation: "Subject questions use no auxiliary.",
        },
        {
          wrong: "Does she has a spare charger?",
          correct: "Does she have a spare charger?",
          explanation: "After does the verb stays in the base form.",
        },
      ],
    },
  ],

  "question-yes-no-wh": [
    {
      type: "multiple-choice",
      instruction: "Chọn câu hỏi đúng.",
      instructionEn: "Choose the correct question.",
      questions: [
        {
          question: "___ you finished the assignment yet?",
          options: ["Have", "Did", "Are", "Do"],
          answer: 0,
          explanation: "Yet with a present perfect needs have.",
        },
        {
          question: "___ does the library close on Sundays?",
          options: ["When", "How much", "Which", "Whose"],
          answer: 0,
          explanation: "When asks about time.",
        },
        {
          question: "___ bag is this on the chair?",
          options: ["Whose", "Who", "Which of", "What of"],
          answer: 0,
          explanation: "Whose asks about the owner.",
        },
        {
          question: "___ far is the station from here?",
          options: ["How", "What", "Which", "Where"],
          answer: 0,
          explanation: "How far asks about distance.",
        },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp thành câu hỏi đúng.",
      instructionEn: "Put the words in order to make a question.",
      items: [
        {
          scrambled: ["Why", "did", "they", "cancel", "the", "workshop"],
          correct: "Why did they cancel the workshop",
        },
        {
          scrambled: ["Are", "you", "coming", "with", "us", "tonight"],
          correct: "Are you coming with us tonight",
        },
        {
          scrambled: ["How", "many", "people", "signed", "the", "petition"],
          correct: "How many people signed the petition",
        },
      ],
    },
  ],

  "reported-statements": [
    {
      type: "transformation",
      instruction: "Chuyển sang câu tường thuật.",
      instructionEn: "Change each sentence into reported speech.",
      items: [
        {
          prompt: '"I am revising for the test," she said.',
          target: "She said that she was revising for the test.",
          goal: "Backshift the present continuous.",
        },
        {
          prompt: '"We have booked the hall," he told me.',
          target: "He told me that they had booked the hall.",
          goal: "Present perfect becomes past perfect.",
        },
        {
          prompt: '"I will call you tomorrow," Lan promised.',
          target: "Lan promised that she would call me the next day.",
          goal: "Will becomes would and tomorrow shifts.",
        },
        {
          prompt: '"I cannot find my notes," the student said.',
          target: "The student said that he could not find his notes.",
          goal: "Cannot becomes could not.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu tường thuật.",
      instructionEn: "Correct the reported statement.",
      items: [
        {
          wrong: "He said me that he was tired.",
          correct: "He told me that he was tired.",
          explanation: "Say takes no personal object; tell does.",
        },
        {
          wrong: "She said she will send the file today.",
          correct: "She said she would send the file that day.",
          explanation: "Will backshifts to would and today shifts to that day.",
        },
        {
          wrong: "They told that the office was closed.",
          correct: "They said that the office was closed.",
          explanation: "Tell needs an object such as us.",
        },
      ],
    },
  ],

  "phrasal-verbs-themes": [
    {
      type: "matching",
      instruction: "Nối cụm động từ với nghĩa.",
      instructionEn: "Match each phrasal verb with its meaning.",
      pairs: [
        { left: "put off", right: "postpone something to a later time" },
        { left: "take up", right: "start a new hobby or activity" },
        { left: "run out of", right: "have no more of something left" },
        { left: "look into", right: "investigate a problem" },
        { left: "get along with", right: "have a friendly relationship with" },
        { left: "turn down", right: "refuse an offer or invitation" },
      ],
    },
    {
      type: "fill-in-blank",
      instruction: "Điền cụm động từ phù hợp.",
      instructionEn: "Complete each sentence with the right phrasal verb.",
      wordBank: ["put off", "ran out of", "looked into", "took up", "turned down", "gets along with"],
      sentences: [
        {
          text: "We had to ___ the trip because of the storm.",
          textEn: "We had to ___ the trip because of the storm.",
          answer: "put off",
          hint: "Postpone.",
        },
        {
          text: "She ___ yoga after her exams finished.",
          textEn: "She ___ yoga after her exams finished.",
          answer: "took up",
          hint: "Start a hobby, past form.",
        },
        {
          text: "The printer ___ paper halfway through the job.",
          textEn: "The printer ___ paper halfway through the job.",
          answer: "ran out of",
          hint: "Have nothing left, past form.",
        },
        {
          text: "He ___ the offer because the salary was too low.",
          textEn: "He ___ the offer because the salary was too low.",
          answer: "turned down",
          hint: "Refuse, past form.",
        },
      ],
    },
  ],

  "relative-quantifiers": [
    {
      type: "transformation",
      instruction: "Nối hai câu bằng cụm quantifier với of which hoặc of whom.",
      instructionEn: "Join the sentences using a quantifier with of which or of whom.",
      items: [
        {
          prompt: "The team has twelve members. Three of them are new.",
          target: "The team has twelve members, three of whom are new.",
          goal: "Use of whom for people.",
        },
        {
          prompt: "She wrote five papers. None of them were rejected.",
          target: "She wrote five papers, none of which were rejected.",
          goal: "Use of which for things.",
        },
        {
          prompt: "We visited two campuses. Both of them had modern labs.",
          target: "We visited two campuses, both of which had modern labs.",
          goal: "Both of which after a comma.",
        },
        {
          prompt: "He interviewed thirty students. Most of them were first-years.",
          target: "He interviewed thirty students, most of whom were first-years.",
          goal: "Most of whom for people.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi cụm quantifier trong mệnh đề quan hệ.",
      instructionEn: "Correct the relative quantifier.",
      items: [
        {
          wrong: "The books, many of them were damaged, came from the old library.",
          correct: "The books, many of which were damaged, came from the old library.",
          explanation: "Inside a relative clause use of which, not of them.",
        },
        {
          wrong: "Ten candidates applied, two of which were shortlisted.",
          correct: "Ten candidates applied, two of whom were shortlisted.",
          explanation: "Candidates are people, so use of whom.",
        },
        {
          wrong: "He owns three cars, none of which is electric cars.",
          correct: "He owns three cars, none of which are electric.",
          explanation: "Keep the clause simple and agree with the plural noun.",
        },
      ],
    },
  ],

  "inversion-conditionals": [
    {
      type: "multiple-choice",
      instruction: "Chọn câu đảo ngữ điều kiện đúng.",
      instructionEn: "Choose the correct inverted conditional.",
      questions: [
        {
          question: "___ you require assistance, press the green button.",
          options: ["Should", "Would", "Did", "Do"],
          answer: 0,
          explanation: "Should plus subject replaces if for a formal possibility.",
        },
        {
          question: "___ I known about the change, I would have rebooked.",
          options: ["Had", "Have", "Did", "Were"],
          answer: 0,
          explanation: "Had plus subject replaces the third conditional if.",
        },
        {
          question: "___ the offer to expire, we would negotiate again.",
          options: ["Were", "Was", "Had", "Should be"],
          answer: 0,
          explanation: "Were plus subject plus to infinitive states a hypothesis.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại bằng đảo ngữ, không dùng if.",
      instructionEn: "Rewrite without if, using inversion.",
      items: [
        {
          prompt: "If the results are delayed, applicants will be informed.",
          target: "Should the results be delayed, applicants will be informed.",
          goal: "Formal should inversion.",
        },
        {
          prompt: "If we had left earlier, we would have avoided the queue.",
          target: "Had we left earlier, we would have avoided the queue.",
          goal: "Had inversion.",
        },
        {
          prompt: "If the plan were to fail, we would need a backup.",
          target: "Were the plan to fail, we would need a backup.",
          goal: "Were plus to infinitive.",
        },
      ],
    },
  ],

  "subjunctive-wish-if-only": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu ước và if only.",
      instructionEn: "Correct the wish or if only sentence.",
      items: [
        {
          wrong: "If only I have studied medicine.",
          correct: "If only I had studied medicine.",
          explanation: "A regret about the past needs the past perfect.",
        },
        {
          wrong: "I wish my brother stops borrowing my charger.",
          correct: "I wish my brother would stop borrowing my charger.",
          explanation: "Use would for an irritating habit.",
        },
        {
          wrong: "She wishes she can drive.",
          correct: "She wishes she could drive.",
          explanation: "Can becomes could after wish.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu bằng wish hoặc if only.",
      instructionEn: "Rewrite each sentence with wish or if only.",
      items: [
        {
          prompt: "It is a pity that the flat is so small. (wish)",
          target: "I wish the flat were bigger.",
          goal: "Use were for a present hypothetical.",
        },
        {
          prompt: "I regret leaving the meeting early. (wish)",
          target: "I wish I had not left the meeting early.",
          goal: "Past regret in the negative.",
        },
        {
          prompt: "Unfortunately I live far from campus. (if only)",
          target: "If only I lived closer to campus.",
          goal: "Present situation takes a past form.",
        },
      ],
    },
  ],

  "comparisons-basic": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng so sánh đúng.",
      instructionEn: "Choose the correct comparative or superlative.",
      questions: [
        {
          question: "This route is ___ than the one through the centre.",
          options: ["quicker", "more quick", "quickest", "as quick"],
          answer: 0,
          explanation: "Short adjectives add er.",
        },
        {
          question: "Her presentation was ___ interesting of the three.",
          options: ["the most", "more", "most of", "as"],
          answer: 0,
          explanation: "Superlatives of long adjectives take the most.",
        },
        {
          question: "My laptop is not ___ fast as yours.",
          options: ["as", "so more", "than", "the most"],
          answer: 0,
          explanation: "Not as plus adjective plus as shows equal comparison.",
        },
        {
          question: "Today is ___ day of the year so far.",
          options: ["the hottest", "hotter", "most hot", "the more hot"],
          answer: 0,
          explanation: "One syllable adjective doubles the consonant and adds est.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi so sánh.",
      instructionEn: "Correct the comparison.",
      items: [
        {
          wrong: "This exam was more easier than the last one.",
          correct: "This exam was easier than the last one.",
          explanation: "Do not use more with an er comparative.",
        },
        {
          wrong: "She is the more talented singer in the choir.",
          correct: "She is the most talented singer in the choir.",
          explanation: "Comparing within a group needs the superlative.",
        },
        {
          wrong: "My room is as big than yours.",
          correct: "My room is as big as yours.",
          explanation: "As big is followed by as.",
        },
      ],
    },
  ],

  "adjective-order": [
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp tính từ theo trật tự chuẩn.",
      instructionEn: "Put the adjectives in the standard order.",
      items: [
        {
          scrambled: ["a", "lovely", "small", "wooden", "table"],
          correct: "a lovely small wooden table",
        },
        {
          scrambled: ["two", "old", "Vietnamese", "silk", "scarves"],
          correct: "two old Vietnamese silk scarves",
        },
        {
          scrambled: ["a", "huge", "round", "black", "clock"],
          correct: "a huge round black clock",
        },
        {
          scrambled: ["an", "expensive", "new", "Italian", "coffee", "machine"],
          correct: "an expensive new Italian coffee machine",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa trật tự tính từ.",
      instructionEn: "Correct the adjective order.",
      items: [
        {
          wrong: "She bought a leather brown nice jacket.",
          correct: "She bought a nice brown leather jacket.",
          explanation: "Opinion comes first, then colour, then material.",
        },
        {
          wrong: "We rented a Japanese tiny old flat.",
          correct: "We rented a tiny old Japanese flat.",
          explanation: "Size comes before age and origin.",
        },
        {
          wrong: "He wore a cotton white long shirt.",
          correct: "He wore a long white cotton shirt.",
          explanation: "Size, then colour, then material.",
        },
      ],
    },
  ],

  "articles-zero": [
    {
      type: "fill-in-blank",
      instruction: "Điền a, an, the hoặc để trống nếu không cần mạo từ.",
      instructionEn: "Write a, an, the, or leave the gap empty if no article is needed.",
      sentences: [
        {
          text: "___ breakfast is served from seven in this hostel.",
          textEn: "___ breakfast is served from seven in this hostel.",
          answer: "-",
          hint: "Meals usually take no article. Type a hyphen for zero article.",
        },
        {
          text: "She studies ___ economics at a university in Hanoi.",
          textEn: "She studies ___ economics at a university in Hanoi.",
          answer: "-",
          hint: "Subjects of study take no article.",
        },
        {
          text: "We travelled by ___ train to the coast.",
          textEn: "We travelled by ___ train to the coast.",
          answer: "-",
          hint: "By plus transport takes no article.",
        },
        {
          text: "___ children learn languages quickly.",
          textEn: "___ children learn languages quickly.",
          answer: "-",
          hint: "General plural statements take no article.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi mạo từ.",
      instructionEn: "Correct the article mistake.",
      items: [
        {
          wrong: "He goes to the school by the bus every day.",
          correct: "He goes to school by bus every day.",
          explanation: "School as an institution and by bus take no article.",
        },
        {
          wrong: "The life in a big city can be stressful.",
          correct: "Life in a big city can be stressful.",
          explanation: "Abstract nouns used generally take no article.",
        },
        {
          wrong: "We had the lunch at noon.",
          correct: "We had lunch at noon.",
          explanation: "Meal names take no article.",
        },
      ],
    },
  ],
};
