/**
 * @file grammarExercisesAuthored/part2.ts
 * @description Hand-written, topic-specific practice (batch 2).
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart2: Record<string, InteractiveExercise[]> = {
  "tenses-mixed-mastery": [
    {
      type: "multiple-choice",
      instruction: "Chọn thì đúng theo ngữ cảnh.",
      instructionEn: "Choose the tense that fits the context.",
      questions: [
        {
          question: "By the time we arrived, the concert ___.",
          options: ["had already started", "already started", "has already started", "was already start"],
          answer: 0,
          explanation: "An earlier past action takes the past perfect.",
        },
        {
          question: "I ___ my keys, so I cannot lock the door.",
          options: ["have lost", "lost", "had lost", "am losing"],
          answer: 0,
          explanation: "A past action with a present result takes the present perfect.",
        },
        {
          question: "While she ___, the power went out.",
          options: ["was cooking", "cooked", "has cooked", "cooks"],
          answer: 0,
          explanation: "A longer background action takes the past continuous.",
        },
        {
          question: "Next June I ___ here for ten years.",
          options: ["will have worked", "will work", "have worked", "work"],
          answer: 0,
          explanation: "Duration up to a future point takes the future perfect.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi phối hợp thì.",
      instructionEn: "Fix the tense mistake.",
      items: [
        {
          wrong: "I have finished the report yesterday.",
          correct: "I finished the report yesterday.",
          explanation: "Yesterday is a finished time, so use the past simple.",
        },
        {
          wrong: "When I will see him, I will tell him.",
          correct: "When I see him, I will tell him.",
          explanation: "After when we use a present form for future meaning.",
        },
        {
          wrong: "She was studying French for three years before she moved.",
          correct: "She had been studying French for three years before she moved.",
          explanation: "Duration before a past event takes the past perfect continuous.",
        },
      ],
    },
  ],

  "reported-time-place-shift": [
    {
      type: "transformation",
      instruction: "Chuyển lời nói sang tường thuật, đổi từ chỉ thời gian và nơi chốn.",
      instructionEn: "Report each sentence, shifting time and place words.",
      items: [
        {
          prompt: '"I will call you tomorrow," he said.',
          target: "He said he would call me the next day.",
          goal: "Tomorrow becomes the next day.",
        },
        {
          prompt: '"We met here last week," she said.',
          target: "She said they had met there the week before.",
          goal: "Here becomes there and last week becomes the week before.",
        },
        {
          prompt: '"I am busy today," he said.',
          target: "He said he was busy that day.",
          goal: "Today becomes that day.",
        },
        {
          prompt: '"This book is mine," she said.',
          target: "She said that book was hers.",
          goal: "This becomes that.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn từ chỉ thời gian đúng khi tường thuật.",
      instructionEn: "Choose the correct shifted time expression.",
      questions: [
        {
          question: 'She said she had seen the film ___. (original: "yesterday")',
          options: ["the day before", "yesterday", "the next day", "today"],
          answer: 0,
          explanation: "Yesterday shifts back to the day before.",
        },
        {
          question: 'He told me he would leave ___. (original: "next month")',
          options: ["the following month", "next month", "last month", "this month"],
          answer: 0,
          explanation: "Next month shifts to the following month.",
        },
        {
          question: 'They said they were living ___ then. (original: "here")',
          options: ["there", "here", "everywhere", "somewhere here"],
          answer: 0,
          explanation: "Here shifts to there when the place changes.",
        },
      ],
    },
  ],

  "confusing-pairs-2": [
    {
      type: "multiple-choice",
      instruction: "Chọn từ đúng trong các cặp dễ lẫn.",
      instructionEn: "Choose the correct word from each confusing pair.",
      questions: [
        {
          question: "The medicine had a strong ___ on my sleep.",
          options: ["effect", "affect", "effective", "affection"],
          answer: 0,
          explanation: "Effect is the noun; affect is the verb.",
        },
        {
          question: "Please ___ me if the schedule changes.",
          options: ["advise", "advice", "advised of", "advices"],
          answer: 0,
          explanation: "Advise is the verb; advice is the uncountable noun.",
        },
        {
          question: "There are ___ people in the waiting room today.",
          options: ["fewer", "less", "lesser", "little"],
          answer: 0,
          explanation: "Fewer goes with countable nouns.",
        },
        {
          question: "The proposal will ___ the final budget.",
          options: ["affect", "effect", "affection", "effective"],
          answer: 0,
          explanation: "Affect as a verb means to influence.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa từ bị dùng sai.",
      instructionEn: "Correct the misused word.",
      items: [
        {
          wrong: "He gave me a good advise about the interview.",
          correct: "He gave me good advice about the interview.",
          explanation: "Advice is an uncountable noun and takes no article.",
        },
        {
          wrong: "We had less options than we expected.",
          correct: "We had fewer options than we expected.",
          explanation: "Options is countable, so use fewer.",
        },
        {
          wrong: "The new rule effects all part-time staff.",
          correct: "The new rule affects all part-time staff.",
          explanation: "The verb here is affect.",
        },
      ],
    },
  ],

  "articles-usage": [
    {
      type: "fill-in-blank",
      instruction: "Điền a, an, the hoặc để trống.",
      instructionEn: "Complete each sentence with a, an, the or no article.",
      sentences: [
        {
          text: "She plays ___ violin in a student orchestra.",
          textEn: "She plays ___ violin in a student orchestra.",
          answer: "the",
          hint: "Musical instruments take the.",
        },
        {
          text: "We stayed at ___ hotel near the station; ___ hotel was very quiet.",
          textEn: "We stayed at ___ hotel near the station; ___ hotel was very quiet.",
          answer: "a, the",
          hint: "First mention takes a, second mention takes the.",
        },
        {
          text: "He wants to become ___ engineer after graduation.",
          textEn: "He wants to become ___ engineer after graduation.",
          answer: "an",
          hint: "Jobs take a or an, and engineer starts with a vowel sound.",
        },
        {
          text: "___ Mount Fuji is the highest peak in Japan.",
          textEn: "___ Mount Fuji is the highest peak in Japan.",
          answer: "no article",
          hint: "Single mountains take no article.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi mạo từ.",
      instructionEn: "Correct the article mistake.",
      items: [
        {
          wrong: "She is best student in the class.",
          correct: "She is the best student in the class.",
          explanation: "Superlatives take the.",
        },
        {
          wrong: "I go to the work by bus every morning.",
          correct: "I go to work by bus every morning.",
          explanation: "Work as a place takes no article.",
        },
        {
          wrong: "He bought an new phone last week.",
          correct: "He bought a new phone last week.",
          explanation: "The article follows the sound of the next word, new.",
        },
      ],
    },
  ],

  "prepositions-common": [
    {
      type: "multiple-choice",
      instruction: "Chọn giới từ đúng.",
      instructionEn: "Choose the correct preposition.",
      questions: [
        {
          question: "The report is ___ my desk, under the folder.",
          options: ["on", "in", "at", "to"],
          answer: 0,
          explanation: "On is used for a surface.",
        },
        {
          question: "We will meet ___ the entrance of the library.",
          options: ["at", "on", "in", "into"],
          answer: 0,
          explanation: "At marks a specific point.",
        },
        {
          question: "She has lived ___ Helsinki since March.",
          options: ["in", "at", "on", "to"],
          answer: 0,
          explanation: "In is used for cities.",
        },
        {
          question: "Put the documents ___ the envelope, please.",
          options: ["in", "on", "at", "by"],
          answer: 0,
          explanation: "In shows something inside a container.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi giới từ.",
      instructionEn: "Correct the preposition mistake.",
      items: [
        {
          wrong: "I am waiting the bus at the corner.",
          correct: "I am waiting for the bus at the corner.",
          explanation: "Wait takes the preposition for.",
        },
        {
          wrong: "She arrived to the airport very early.",
          correct: "She arrived at the airport very early.",
          explanation: "Arrive takes at for a place, never to.",
        },
        {
          wrong: "He is good in mathematics.",
          correct: "He is good at mathematics.",
          explanation: "Good is followed by at for skills.",
        },
      ],
    },
  ],

  "grammar-sv-tricky": [
    {
      type: "multiple-choice",
      instruction: "Chọn động từ hòa hợp đúng với chủ ngữ khó.",
      instructionEn: "Choose the verb that agrees with the tricky subject.",
      questions: [
        {
          question: "Each of the applicants ___ a short interview.",
          options: ["has", "have", "having", "are having"],
          answer: 0,
          explanation: "Each is singular, so the verb is singular.",
        },
        {
          question: "The number of complaints ___ falling steadily.",
          options: ["is", "are", "were", "have been"],
          answer: 0,
          explanation: "The number takes a singular verb.",
        },
        {
          question: "Neither the manager nor the assistants ___ available.",
          options: ["are", "is", "was", "has been"],
          answer: 0,
          explanation: "With neither ... nor the verb agrees with the nearer subject.",
        },
        {
          question: "Mathematics ___ my favourite subject at school.",
          options: ["was", "were", "have been", "are"],
          answer: 0,
          explanation: "Subjects ending in -ics are singular.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi hòa hợp chủ ngữ và động từ.",
      instructionEn: "Fix the subject-verb agreement.",
      items: [
        {
          wrong: "A number of students has requested a retake.",
          correct: "A number of students have requested a retake.",
          explanation: "A number of takes a plural verb.",
        },
        {
          wrong: "The list of names were posted on the door.",
          correct: "The list of names was posted on the door.",
          explanation: "The head noun is list, which is singular.",
        },
        {
          wrong: "Everybody in the choir sing beautifully.",
          correct: "Everybody in the choir sings beautifully.",
          explanation: "Everybody is singular.",
        },
      ],
    },
  ],

  "cleft-it-was": [
    {
      type: "transformation",
      instruction: "Viết lại câu bằng cấu trúc nhấn mạnh It was ... that.",
      instructionEn: "Rewrite each sentence as an it-cleft to emphasise the underlined idea.",
      items: [
        {
          prompt: "My brother broke the window. (emphasise my brother)",
          target: "It was my brother who broke the window.",
          goal: "Use who for a person.",
        },
        {
          prompt: "They moved to Turku in 2019. (emphasise in 2019)",
          target: "It was in 2019 that they moved to Turku.",
          goal: "Use that for a time phrase.",
        },
        {
          prompt: "She left her passport at home. (emphasise her passport)",
          target: "It was her passport that she left at home.",
          goal: "Use that for a thing.",
        },
        {
          prompt: "We complained about the noise. (emphasise the noise)",
          target: "It was the noise that we complained about.",
          goal: "Keep the preposition at the end.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi cấu trúc nhấn mạnh.",
      instructionEn: "Correct the cleft sentence.",
      items: [
        {
          wrong: "It was in Hanoi where I first met her.",
          correct: "It was in Hanoi that I first met her.",
          explanation: "An it-cleft uses that, not where.",
        },
        {
          wrong: "It were the students who organised the event.",
          correct: "It was the students who organised the event.",
          explanation: "The cleft always begins with it was or it is.",
        },
        {
          wrong: "It was Minh who did not knew the answer.",
          correct: "It was Minh who did not know the answer.",
          explanation: "After did not the verb stays in the base form.",
        },
      ],
    },
  ],

  "linking-words-overview": [
    {
      type: "multiple-choice",
      instruction: "Chọn từ nối phù hợp.",
      instructionEn: "Choose the appropriate linking word.",
      questions: [
        {
          question: "The room was small. ___, it felt bright and welcoming.",
          options: ["Nevertheless", "Therefore", "Moreover", "For example"],
          answer: 0,
          explanation: "Nevertheless signals contrast.",
        },
        {
          question: "He missed three deadlines. ___, he lost the contract.",
          options: ["Consequently", "However", "In contrast", "Similarly"],
          answer: 0,
          explanation: "Consequently introduces a result.",
        },
        {
          question: "The course covers grammar. ___, it includes weekly speaking clubs.",
          options: ["In addition", "Instead", "Otherwise", "Nonetheless"],
          answer: 0,
          explanation: "In addition adds information.",
        },
        {
          question: "Take an umbrella; ___ you will get soaked.",
          options: ["otherwise", "therefore", "moreover", "meanwhile"],
          answer: 0,
          explanation: "Otherwise states the negative consequence.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi dùng từ nối.",
      instructionEn: "Correct the linking word usage.",
      items: [
        {
          wrong: "Although the rain, we finished the survey.",
          correct: "Despite the rain, we finished the survey.",
          explanation: "Although needs a clause; despite takes a noun phrase.",
        },
        {
          wrong: "She studied hard, therefore she passed easily.",
          correct: "She studied hard; therefore, she passed easily.",
          explanation: "Therefore is not a conjunction, so punctuate with a semicolon.",
        },
        {
          wrong: "Because of he was late, the meeting started at ten.",
          correct: "Because he was late, the meeting started at ten.",
          explanation: "Because of takes a noun phrase, not a clause.",
        },
      ],
    },
  ],

  "punctuation-comma-semicolon": [
    {
      type: "error-correction",
      instruction: "Sửa dấu câu cho đúng.",
      instructionEn: "Correct the punctuation.",
      items: [
        {
          wrong: "After the exam we went home, and slept.",
          correct: "After the exam we went home and slept.",
          explanation: "No comma before and when the subject is not repeated.",
        },
        {
          wrong: "My best friend, Linh is moving to Tampere.",
          correct: "My best friend, Linh, is moving to Tampere.",
          explanation: "An appositive needs a comma on both sides.",
        },
        {
          wrong: "We visited three cities, Turku, Oulu and Vaasa.",
          correct: "We visited three cities: Turku, Oulu and Vaasa.",
          explanation: "A colon introduces a list after a complete clause.",
        },
        {
          wrong: "The train was cancelled; because of heavy snow.",
          correct: "The train was cancelled because of heavy snow.",
          explanation: "A semicolon cannot precede a dependent phrase.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn câu có dấu câu đúng.",
      instructionEn: "Choose the correctly punctuated sentence.",
      questions: [
        {
          question: "Which sentence is punctuated correctly?",
          options: [
            "She revised all week; her results improved sharply.",
            "She revised all week, her results improved sharply.",
            "She revised all week; and her results improved sharply.",
            "She revised all week: her results, improved sharply.",
          ],
          answer: 0,
          explanation: "A semicolon joins two related independent clauses.",
        },
        {
          question: "Which sentence uses commas correctly?",
          options: [
            "In the end, however, the plan worked.",
            "In the end however the plan worked.",
            "In the end, however the plan, worked.",
            "In, the end however, the plan worked.",
          ],
          answer: 0,
          explanation: "However inside a sentence takes commas on both sides.",
        },
        {
          question: "Which sentence needs no extra comma?",
          options: [
            "The students who arrived late missed the briefing.",
            "The students, who arrived late missed the briefing.",
            "The students who arrived late, missed the briefing.",
            "The students, who arrived late, missed, the briefing.",
          ],
          answer: 0,
          explanation: "A defining relative clause takes no commas.",
        },
      ],
    },
  ],

  "punctuation-apostrophe-colon": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi dấu lược và dấu hai chấm.",
      instructionEn: "Fix the apostrophe or colon mistake.",
      items: [
        {
          wrong: "The student's notebooks were left on the teachers desk.",
          correct: "The students' notebooks were left on the teacher's desk.",
          explanation: "Plural possession takes s', singular takes 's.",
        },
        {
          wrong: "Its going to rain before the ceremony ends.",
          correct: "It is going to rain before the ceremony ends.",
          explanation: "Its shows possession; it's is the contraction.",
        },
        {
          wrong: "Bring the following: pens, and a calculator, and an ID.",
          correct: "Bring the following: pens, a calculator and an ID.",
          explanation: "A colon introduces the list once; separate items with commas.",
        },
        {
          wrong: "The childrens' area closes at six.",
          correct: "The children's area closes at six.",
          explanation: "Children is already plural, so add 's.",
        },
      ],
    },
    {
      type: "fill-in-blank",
      instruction: "Điền dạng đúng của dấu lược.",
      instructionEn: "Complete each sentence with the correct possessive or contraction.",
      sentences: [
        {
          text: "___ almost time to submit the assignment.",
          textEn: "___ almost time to submit the assignment.",
          answer: "It's",
          hint: "This means it is.",
        },
        {
          text: "The ___ lounge is on the second floor. (teachers, plural)",
          textEn: "The ___ lounge is on the second floor. (teachers, plural)",
          answer: "teachers'",
          hint: "Plural possession puts the apostrophe after the s.",
        },
        {
          text: "That is my ___ car, not mine. (brother, singular)",
          textEn: "That is my ___ car, not mine. (brother, singular)",
          answer: "brother's",
          hint: "Singular possession takes apostrophe plus s.",
        },
      ],
    },
  ],

  "reported-questions": [
    {
      type: "transformation",
      instruction: "Chuyển câu hỏi sang lời tường thuật.",
      instructionEn: "Report each question.",
      items: [
        {
          prompt: '"Where do you live?" she asked me.',
          target: "She asked me where I lived.",
          goal: "Drop do and shift the tense back.",
        },
        {
          prompt: '"Have you finished the task?" he asked.',
          target: "He asked whether I had finished the task.",
          goal: "Use whether for a yes/no question.",
        },
        {
          prompt: '"Why are you leaving early?" they asked her.',
          target: "They asked her why she was leaving early.",
          goal: "Keep the wh-word and use normal word order.",
        },
        {
          prompt: '"Will you join us tomorrow?" she asked.',
          target: "She asked if I would join them the next day.",
          goal: "Will becomes would and tomorrow becomes the next day.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi tường thuật câu hỏi.",
      instructionEn: "Correct the reported question.",
      items: [
        {
          wrong: "He asked me where did I put the file.",
          correct: "He asked me where I had put the file.",
          explanation: "A reported question keeps statement word order.",
        },
        {
          wrong: "She asked that I was ready.",
          correct: "She asked whether I was ready.",
          explanation: "Yes/no questions are reported with whether or if.",
        },
        {
          wrong: "They wanted to know when will the results come out.",
          correct: "They wanted to know when the results would come out.",
          explanation: "Will shifts to would and follows the subject.",
        },
      ],
    },
  ],

  "prepositions-confusing": [
    {
      type: "multiple-choice",
      instruction: "Chọn giới từ đúng trong các cặp dễ lẫn.",
      instructionEn: "Choose the correct preposition.",
      questions: [
        {
          question: "She has been ill ___ Monday.",
          options: ["since", "for", "from", "during"],
          answer: 0,
          explanation: "Since marks a starting point.",
        },
        {
          question: "We studied together ___ two hours.",
          options: ["for", "since", "during", "from"],
          answer: 0,
          explanation: "For marks a length of time.",
        },
        {
          question: "The office is closed ___ the holidays.",
          options: ["during", "for", "since", "while"],
          answer: 0,
          explanation: "During goes with a named period.",
        },
        {
          question: "The parcel should arrive ___ Friday at the latest.",
          options: ["by", "until", "since", "in"],
          answer: 0,
          explanation: "By means not later than.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa giới từ bị dùng sai.",
      instructionEn: "Correct the confusing preposition.",
      items: [
        {
          wrong: "I have known her since five years.",
          correct: "I have known her for five years.",
          explanation: "A duration takes for, not since.",
        },
        {
          wrong: "He stayed at the library until he finished, from midnight.",
          correct: "He stayed at the library until midnight to finish the work.",
          explanation: "Until marks the end point of a continuing action.",
        },
        {
          wrong: "The class is different than the one I took last term.",
          correct: "The class is different from the one I took last term.",
          explanation: "Different is followed by from in standard English.",
        },
      ],
    },
  ],
};
