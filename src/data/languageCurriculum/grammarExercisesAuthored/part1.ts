/**
 * @file grammarExercisesAuthored/part1.ts
 * @description Hand-written, topic-specific practice for the grammar lessons
 *              whose source data cannot feed the generator (batch 1).
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart1: Record<string, InteractiveExercise[]> = {
  "sentence-patterns-core": [
    {
      type: "multiple-choice",
      instruction: "Chọn mẫu câu đúng cho mỗi câu.",
      instructionEn: "Choose the sentence pattern each sentence follows.",
      questions: [
        {
          question: 'Which pattern does this sentence use? "The children laughed."',
          options: ["SV", "SVO", "SVOO", "SVOC"],
          answer: 0,
          explanation: "Laughed takes no object, so the pattern is subject + verb.",
        },
        {
          question: 'Which pattern does this sentence use? "My uncle sent me a postcard."',
          options: ["SVOO", "SVC", "SV", "SVOC"],
          answer: 0,
          explanation: "Me is the indirect object and a postcard the direct object.",
        },
        {
          question: 'Which pattern does this sentence use? "The soup tastes salty."',
          options: ["SVC", "SVO", "SVOO", "SV"],
          answer: 0,
          explanation: "Tastes is a linking verb, so salty completes the subject.",
        },
        {
          question: 'Which pattern does this sentence use? "They elected her captain."',
          options: ["SVOC", "SVOO", "SVO", "SVC"],
          answer: 0,
          explanation: "Captain describes the object her, so the pattern is SVOC.",
        },
      ],
    },
    {
      type: "fill-in-blank",
      instruction: "Điền thành phần còn thiếu để câu đủ mẫu.",
      instructionEn: "Complete each sentence so the pattern is complete.",
      sentences: [
        {
          text: "The manager offered the new interns ___ during the first week.",
          textEn: "The manager offered the new interns ___ during the first week.",
          answer: "training",
          hint: "SVOO needs a direct object after the indirect object.",
        },
        {
          text: "Everyone in the meeting room stayed ___ until the results appeared.",
          textEn: "Everyone in the meeting room stayed ___ until the results appeared.",
          answer: "calm",
          hint: "Stayed is a linking verb, so it needs a complement.",
        },
        {
          text: "The committee considered the proposal ___ and asked for changes.",
          textEn: "The committee considered the proposal ___ and asked for changes.",
          answer: "incomplete",
          hint: "SVOC: the word describes the object proposal.",
        },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp các từ thành câu đúng mẫu.",
      instructionEn: "Reorder the words into a correctly patterned sentence.",
      items: [
        {
          scrambled: ["her", "the", "students", "teacher", "showed", "a", "shortcut"],
          correct: "The teacher showed her students a shortcut",
          correctEn: "The teacher showed her students a shortcut",
        },
        {
          scrambled: ["silent", "the", "audience", "remained", "completely"],
          correct: "The audience remained completely silent",
          correctEn: "The audience remained completely silent",
        },
        {
          scrambled: ["the", "judges", "declared", "match", "the", "invalid"],
          correct: "The judges declared the match invalid",
          correctEn: "The judges declared the match invalid",
        },
      ],
    },
  ],

  "relative-defining": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi trong mệnh đề quan hệ xác định.",
      instructionEn: "Correct the mistake in each defining relative clause.",
      items: [
        {
          wrong: "The candidate, who applied last week, has been hired.",
          correct: "The candidate who applied last week has been hired.",
          explanation: "A defining clause identifies the noun, so no commas are used.",
        },
        {
          wrong: "This is the report which I mentioned it yesterday.",
          correct: "This is the report which I mentioned yesterday.",
          explanation: "The relative pronoun already stands for the object, so drop it.",
        },
        {
          wrong: "The building what burned down was very old.",
          correct: "The building that burned down was very old.",
          explanation: "What is never a relative pronoun after a noun; use that or which.",
        },
        {
          wrong: "The girl whose is sitting there is my cousin.",
          correct: "The girl who is sitting there is my cousin.",
          explanation: "Whose shows possession and must be followed by a noun.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn đại từ quan hệ đúng.",
      instructionEn: "Choose the correct relative pronoun.",
      questions: [
        {
          question: "The app ___ tracks my study time is free.",
          options: ["that", "who", "whose", "where"],
          answer: 0,
          explanation: "The app is a thing and the pronoun is the subject of the clause.",
        },
        {
          question: "I met a nurse ___ father teaches at my old school.",
          options: ["whose", "who", "which", "whom"],
          answer: 0,
          explanation: "Whose links the nurse to father, showing possession.",
        },
        {
          question: "The café ___ we studied last night closes at ten.",
          options: ["where", "which", "who", "whose"],
          answer: 0,
          explanation: "Where replaces in which for a place.",
        },
        {
          question: "The colleague ___ I trust most is on leave.",
          options: ["whom", "whose", "which", "where"],
          answer: 0,
          explanation: "Whom is the object of trust in formal English.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Nối hai câu thành một câu có mệnh đề quan hệ xác định.",
      instructionEn: "Join the two sentences with a defining relative clause.",
      items: [
        {
          prompt: "I bought a laptop. It has a backlit keyboard.",
          target: "I bought a laptop that has a backlit keyboard.",
          goal: "Use that as the subject of the clause.",
        },
        {
          prompt: "She is the student. Her project won the prize.",
          target: "She is the student whose project won the prize.",
          goal: "Use whose for possession.",
        },
        {
          prompt: "That is the hospital. My sister works there.",
          target: "That is the hospital where my sister works.",
          goal: "Use where for a place.",
        },
      ],
    },
  ],

  "grammar-comma-splice": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi nối câu bằng dấu phẩy.",
      instructionEn: "Fix each comma splice.",
      items: [
        {
          wrong: "The lecture ended early, we went to the library.",
          correct: "The lecture ended early, so we went to the library.",
          explanation: "Two independent clauses need a conjunction after the comma.",
        },
        {
          wrong: "I revised all night, I still failed the quiz.",
          correct: "I revised all night, but I still failed the quiz.",
          explanation: "But shows the contrast between the two clauses.",
        },
        {
          wrong: "The printer is broken, however the deadline stays the same.",
          correct: "The printer is broken; however, the deadline stays the same.",
          explanation: "However is not a conjunction, so use a semicolon before it.",
        },
        {
          wrong: "She speaks three languages, she studied abroad for years.",
          correct: "She speaks three languages because she studied abroad for years.",
          explanation: "A subordinator turns one clause into a dependent clause.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn cách sửa đúng cho câu bị nối sai.",
      instructionEn: "Choose the correct repair for each comma splice.",
      questions: [
        {
          question: 'Repair: "The bus was late, I missed the exam."',
          options: [
            "The bus was late, so I missed the exam.",
            "The bus was late, I missed the exam.",
            "The bus was late I missed the exam.",
            "The bus was late, however I missed the exam.",
          ],
          answer: 0,
          explanation: "So joins the cause and the result correctly.",
        },
        {
          question: 'Repair: "He forgot his notes, he answered from memory."',
          options: [
            "He forgot his notes; he answered from memory.",
            "He forgot his notes, he answered from memory.",
            "He forgot his notes, therefore he answered from memory.",
            "He forgot his notes he answered from memory.",
          ],
          answer: 0,
          explanation: "A semicolon links two closely related independent clauses.",
        },
        {
          question: 'Repair: "The data looked odd, the team ran the test again."',
          options: [
            "Because the data looked odd, the team ran the test again.",
            "The data looked odd, the team ran the test again.",
            "The data looked odd the team ran the test again.",
            "The data looked odd, moreover the team ran the test again.",
          ],
          answer: 0,
          explanation: "Because makes the first clause dependent, removing the splice.",
        },
      ],
    },
  ],

  "inversion-negative-adverbials": [
    {
      type: "transformation",
      instruction: "Viết lại câu bắt đầu bằng trạng ngữ phủ định.",
      instructionEn: "Rewrite each sentence beginning with the negative adverbial.",
      items: [
        {
          prompt: "I have never seen such a long queue. (Never)",
          target: "Never have I seen such a long queue.",
          cue: "Never",
          goal: "Invert the auxiliary and the subject.",
        },
        {
          prompt: "She rarely arrives late. (Rarely)",
          target: "Rarely does she arrive late.",
          cue: "Rarely",
          goal: "Add do or does when there is no auxiliary.",
        },
        {
          prompt: "He had no sooner sat down than the phone rang. (No sooner)",
          target: "No sooner had he sat down than the phone rang.",
          cue: "No sooner",
          goal: "Keep than after no sooner.",
        },
        {
          prompt: "They did not realise the risk at any time. (At no time)",
          target: "At no time did they realise the risk.",
          cue: "At no time",
          goal: "Use did for a past simple verb.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi đảo ngữ.",
      instructionEn: "Correct the inversion mistake in each sentence.",
      items: [
        {
          wrong: "Seldom I have heard a better excuse.",
          correct: "Seldom have I heard a better excuse.",
          explanation: "After seldom the auxiliary moves in front of the subject.",
        },
        {
          wrong: "Not only she sings, but she also writes music.",
          correct: "Not only does she sing, but she also writes music.",
          explanation: "Not only at the front requires does plus the base verb.",
        },
        {
          wrong: "Hardly he had left when it started raining.",
          correct: "Hardly had he left when it started raining.",
          explanation: "Hardly triggers inversion of had and the subject.",
        },
      ],
    },
  ],

  "tenses-present": [
    {
      type: "multiple-choice",
      instruction: "Chọn thì hiện tại đúng.",
      instructionEn: "Choose the correct present tense.",
      questions: [
        {
          question: "Water ___ at 100 degrees Celsius.",
          options: ["boils", "is boiling", "has boiled", "boil"],
          answer: 0,
          explanation: "A scientific fact takes the present simple.",
        },
        {
          question: "Listen! Someone ___ the piano upstairs.",
          options: ["is playing", "plays", "has played", "play"],
          answer: 0,
          explanation: "Listen signals an action happening right now.",
        },
        {
          question: "I ___ this book three times this month.",
          options: ["have read", "read", "am reading", "reads"],
          answer: 0,
          explanation: "This month is unfinished, so the present perfect fits.",
        },
        {
          question: "She ___ for the same company since 2019.",
          options: ["has been working", "works", "is working", "worked"],
          answer: 0,
          explanation: "Since 2019 with an ongoing action needs the present perfect continuous.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi thì hiện tại.",
      instructionEn: "Correct the present tense mistake.",
      items: [
        {
          wrong: "He is knowing the answer already.",
          correct: "He knows the answer already.",
          explanation: "Know is a state verb and avoids the continuous form.",
        },
        {
          wrong: "I live here since last April.",
          correct: "I have lived here since last April.",
          explanation: "Since with a period that continues needs the present perfect.",
        },
        {
          wrong: "My sister work at a clinic downtown.",
          correct: "My sister works at a clinic downtown.",
          explanation: "A third person singular subject takes an s on the verb.",
        },
      ],
    },
  ],

  "tenses-future": [
    {
      type: "multiple-choice",
      instruction: "Chọn cách diễn đạt tương lai đúng.",
      instructionEn: "Choose the correct future form.",
      questions: [
        {
          question: "Look at those clouds. It ___ rain.",
          options: ["is going to", "will", "shall", "is raining"],
          answer: 0,
          explanation: "Present evidence points to going to.",
        },
        {
          question: "I promise I ___ tell anyone your secret.",
          options: ["will not", "am not going to", "do not", "am not"],
          answer: 0,
          explanation: "A promise made while speaking uses will.",
        },
        {
          question: "Our flight ___ at 06:40 tomorrow.",
          options: ["leaves", "will leave soon", "is leaving now", "left"],
          answer: 0,
          explanation: "A timetable takes the present simple.",
        },
        {
          question: "This time next week we ___ on the coast.",
          options: ["will be relaxing", "will relax", "relax", "are relaxed"],
          answer: 0,
          explanation: "An action in progress at a future moment takes will be doing.",
        },
      ],
    },
    {
      type: "fill-in-blank",
      instruction: "Điền dạng tương lai phù hợp.",
      instructionEn: "Complete each sentence with a suitable future form.",
      sentences: [
        {
          text: "We ___ dinner with my parents on Friday; the table is already booked.",
          textEn: "We ___ dinner with my parents on Friday; the table is already booked.",
          answer: "are having",
          hint: "A fixed arrangement takes the present continuous.",
        },
        {
          text: "Do not worry, I ___ you a hand with the boxes.",
          textEn: "Do not worry, I ___ you a hand with the boxes.",
          answer: "will give",
          hint: "An offer made now takes will.",
        },
        {
          text: "She ___ to study medicine after graduation.",
          textEn: "She ___ to study medicine after graduation.",
          answer: "is going",
          hint: "A plan decided earlier takes going to.",
        },
      ],
    },
  ],

  "question-indirect": [
    {
      type: "transformation",
      instruction: "Chuyển câu hỏi trực tiếp thành câu hỏi gián tiếp.",
      instructionEn: "Rewrite each direct question as an indirect question.",
      items: [
        {
          prompt: "Where is the nearest pharmacy? (Could you tell me)",
          target: "Could you tell me where the nearest pharmacy is?",
          goal: "Keep normal word order after the introduction.",
        },
        {
          prompt: "Does this bus stop at the museum? (Do you know)",
          target: "Do you know whether this bus stops at the museum?",
          goal: "Use whether or if for a yes/no question.",
        },
        {
          prompt: "How much did the repair cost? (I wonder)",
          target: "I wonder how much the repair cost.",
          goal: "Drop the auxiliary did and end with a full stop.",
        },
        {
          prompt: "When will the results be published? (Could I ask)",
          target: "Could I ask when the results will be published?",
          goal: "Move will after the subject.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu hỏi gián tiếp.",
      instructionEn: "Correct the indirect question.",
      items: [
        {
          wrong: "Could you tell me where is the exit?",
          correct: "Could you tell me where the exit is?",
          explanation: "An indirect question keeps subject before verb.",
        },
        {
          wrong: "I wonder does she speak Finnish.",
          correct: "I wonder whether she speaks Finnish.",
          explanation: "Use whether or if instead of the auxiliary does.",
        },
        {
          wrong: "Do you know what time does the office open?",
          correct: "Do you know what time the office opens?",
          explanation: "Delete does and put the verb in the present simple.",
        },
      ],
    },
  ],

  "parallel-structure": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi thiếu cấu trúc song song.",
      instructionEn: "Fix the faulty parallelism.",
      items: [
        {
          wrong: "She likes hiking, swimming and to cycle.",
          correct: "She likes hiking, swimming and cycling.",
          explanation: "All three items in the list must be gerunds.",
        },
        {
          wrong: "The course is short, practical and it costs little.",
          correct: "The course is short, practical and cheap.",
          explanation: "A list of adjectives cannot end with a clause.",
        },
        {
          wrong: "He is responsible for hiring staff and to plan budgets.",
          correct: "He is responsible for hiring staff and planning budgets.",
          explanation: "After a preposition both items take the gerund form.",
        },
        {
          wrong: "Not only did she design the app but also marketing it.",
          correct: "Not only did she design the app but also marketed it.",
          explanation: "Both halves of not only ... but also need the same verb form.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn câu có cấu trúc song song đúng.",
      instructionEn: "Choose the sentence with correct parallel structure.",
      questions: [
        {
          question: "Which sentence keeps the list parallel?",
          options: [
            "The job requires patience, accuracy and creativity.",
            "The job requires patience, accuracy and to be creative.",
            "The job requires being patient, accuracy and creativity.",
            "The job requires patience, to be accurate and creativity.",
          ],
          answer: 0,
          explanation: "Three nouns in a row keep the list balanced.",
        },
        {
          question: "Which sentence is parallel after the comparison?",
          options: [
            "Reading aloud is easier than memorising silently.",
            "Reading aloud is easier than to memorise silently.",
            "To read aloud is easier than memorising silently.",
            "Reading aloud is easier than you memorise silently.",
          ],
          answer: 0,
          explanation: "Both sides of than use the gerund form.",
        },
        {
          question: "Which sentence balances the paired conjunction?",
          options: [
            "She either emails clients or calls them directly.",
            "She either emails clients or calling them directly.",
            "She either emails clients or she calling them.",
            "She either emailing clients or calls them.",
          ],
          answer: 0,
          explanation: "Either ... or must join two matching verb phrases.",
        },
      ],
    },
  ],

  "reported-commands": [
    {
      type: "transformation",
      instruction: "Chuyển câu mệnh lệnh sang lời tường thuật.",
      instructionEn: "Report each command or request.",
      items: [
        {
          prompt: '"Close the window, please," she said to me.',
          target: "She asked me to close the window.",
          goal: "Use ask plus object plus to + verb for a request.",
        },
        {
          prompt: '"Do not touch the wires," the technician said.',
          target: "The technician told us not to touch the wires.",
          goal: "Use not to for a negative command.",
        },
        {
          prompt: '"Hand in your essays by Friday," the teacher said.',
          target: "The teacher told the class to hand in their essays by Friday.",
          goal: "Shift the possessive to their.",
        },
        {
          prompt: '"Please wait outside," the nurse said to him.',
          target: "The nurse asked him to wait outside.",
          goal: "Please signals a request, so use ask.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi tường thuật câu mệnh lệnh.",
      instructionEn: "Correct the reported command.",
      items: [
        {
          wrong: "He told to me to sit down.",
          correct: "He told me to sit down.",
          explanation: "Tell takes a direct object with no preposition.",
        },
        {
          wrong: "She asked me don't be late.",
          correct: "She asked me not to be late.",
          explanation: "A reported negative command uses not to + verb.",
        },
        {
          wrong: "The guard said us to leave the building.",
          correct: "The guard told us to leave the building.",
          explanation: "Say cannot take an object like us; use tell.",
        },
      ],
    },
  ],

  "phrasal-verbs-structure": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng đúng của cụm động từ.",
      instructionEn: "Choose the correct phrasal verb structure.",
      questions: [
        {
          question: "I could not ___ the password, so I reset it.",
          options: ["work out", "work out it", "out work", "work it up"],
          answer: 0,
          explanation: "Work out is separable, but the object here is a noun phrase.",
        },
        {
          question: "The meeting was cancelled, so they ___ to next week.",
          options: ["put it off", "put off it", "put off", "off put it"],
          answer: 0,
          explanation: "A pronoun object must sit between the verb and the particle.",
        },
        {
          question: "She ___ her old classmate at the airport.",
          options: ["ran into", "ran into her", "into ran", "ran her into"],
          answer: 0,
          explanation: "Run into is inseparable, so the object follows the particle.",
        },
        {
          question: "He promised to ___ smoking before the marathon.",
          options: ["give up", "give it up smoking", "up give", "give up it"],
          answer: 0,
          explanation: "The gerund object goes after the complete phrasal verb.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi trật tự trong cụm động từ.",
      instructionEn: "Correct the phrasal verb word order.",
      items: [
        {
          wrong: "Please turn off it before you leave.",
          correct: "Please turn it off before you leave.",
          explanation: "A pronoun always goes between the verb and the particle.",
        },
        {
          wrong: "We are looking the report over forward to.",
          correct: "We are looking forward to the report.",
          explanation: "Look forward to is a three-part verb and cannot be split.",
        },
        {
          wrong: "She got the bus off two stops early.",
          correct: "She got off the bus two stops early.",
          explanation: "Get off is inseparable, so the noun follows the particle.",
        },
      ],
    },
  ],
};
