/**
 * @file grammarExercisesAuthored/part3.ts
 * @description Hand-written, topic-specific practice (batch 3).
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart3: Record<string, InteractiveExercise[]> = {
  "subjunctive-that-clauses": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng động từ đúng sau các động từ đề nghị.",
      instructionEn: "Choose the correct verb form in the that-clause.",
      questions: [
        {
          question: "The doctor insisted that he ___ more water every day.",
          options: ["drink", "drinks", "drank", "is drinking"],
          answer: 0,
          explanation: "After insist that the verb stays in the base form.",
        },
        {
          question: "It is essential that every applicant ___ on time.",
          options: ["be", "is", "was", "being"],
          answer: 0,
          explanation: "It is essential that takes be for all subjects.",
        },
        {
          question: "We recommended that she ___ the deadline.",
          options: ["not miss", "does not miss", "did not miss", "not misses"],
          answer: 0,
          explanation: "The negative subjunctive is not plus the base verb.",
        },
        {
          question: "The board demanded that the report ___ rewritten.",
          options: ["be", "is", "was", "were"],
          answer: 0,
          explanation: "The passive subjunctive uses be plus the past participle.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi thức giả định.",
      instructionEn: "Correct the subjunctive mistake.",
      items: [
        {
          wrong: "I suggest that he goes to the clinic today.",
          correct: "I suggest that he go to the clinic today.",
          explanation: "Suggest that takes the base form of the verb.",
        },
        {
          wrong: "It is vital that she is informed immediately.",
          correct: "It is vital that she be informed immediately.",
          explanation: "The subjunctive passive uses be informed.",
        },
        {
          wrong: "They requested that the fee is not increased.",
          correct: "They requested that the fee not be increased.",
          explanation: "Negative subjunctive: not be plus the participle.",
        },
      ],
    },
  ],

  "participle-reduced-clauses": [
    {
      type: "transformation",
      instruction: "Rút gọn mệnh đề bằng phân từ.",
      instructionEn: "Reduce each clause using a participle.",
      items: [
        {
          prompt: "Because she was tired, she went to bed early.",
          target: "Being tired, she went to bed early.",
          goal: "Use a present participle for the reason.",
        },
        {
          prompt: "The letters that were sent last week have arrived.",
          target: "The letters sent last week have arrived.",
          goal: "Use a past participle for a passive clause.",
        },
        {
          prompt: "After he had checked the figures, he signed the report.",
          target: "Having checked the figures, he signed the report.",
          goal: "Use having plus the participle for an earlier action.",
        },
        {
          prompt: "The man who is waiting outside is my uncle.",
          target: "The man waiting outside is my uncle.",
          goal: "Delete who is before the -ing form.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi rút gọn mệnh đề.",
      instructionEn: "Correct the reduced clause.",
      items: [
        {
          wrong: "Walking to school, the rain started suddenly.",
          correct: "While I was walking to school, the rain started suddenly.",
          explanation: "The participle must share the subject of the main clause.",
        },
        {
          wrong: "Written in 1920, the author finished the novel quickly.",
          correct: "Written in 1920, the novel became a classic.",
          explanation: "The past participle must describe the subject, the novel.",
        },
        {
          wrong: "Having finish the test, we left the hall.",
          correct: "Having finished the test, we left the hall.",
          explanation: "Having is followed by the past participle.",
        },
      ],
    },
  ],

  "confusing-pairs-1": [
    {
      type: "multiple-choice",
      instruction: "Chọn từ đúng.",
      instructionEn: "Choose the correct word.",
      questions: [
        {
          question: "He ___ his wallet on the bus this morning.",
          options: ["lost", "loosed", "loose", "losed"],
          answer: 0,
          explanation: "Lose - lost is the verb; loose is an adjective.",
        },
        {
          question: "Their flight was delayed, so they missed ___ connection.",
          options: ["their", "there", "they're", "theirs"],
          answer: 0,
          explanation: "Their is the possessive form.",
        },
        {
          question: "The exam was ___ easier than I expected.",
          options: ["much", "very", "many", "too much"],
          answer: 0,
          explanation: "Much strengthens a comparative adjective.",
        },
        {
          question: "She has ___ experience with data pipelines.",
          options: ["a lot of", "many", "much of", "a lot"],
          answer: 0,
          explanation: "Experience is uncountable here, so use a lot of.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa từ dùng sai.",
      instructionEn: "Correct the misused word.",
      items: [
        {
          wrong: "Your going to love the new library.",
          correct: "You're going to love the new library.",
          explanation: "You're is the contraction of you are.",
        },
        {
          wrong: "The temperature effects how fast the dough rises.",
          correct: "The temperature affects how fast the dough rises.",
          explanation: "Affect is the verb.",
        },
        {
          wrong: "I have too much books to carry.",
          correct: "I have too many books to carry.",
          explanation: "Books is countable, so use too many.",
        },
      ],
    },
  ],

  "sv-agreement-rules": [
    {
      type: "fill-in-blank",
      instruction: "Điền động từ hòa hợp với chủ ngữ.",
      instructionEn: "Complete each sentence with a verb that agrees.",
      sentences: [
        {
          text: "Twenty minutes ___ enough for the warm-up.",
          textEn: "Twenty minutes ___ enough for the warm-up.",
          answer: "is",
          hint: "A period of time counts as one unit.",
        },
        {
          text: "The team ___ training in Oulu this week.",
          textEn: "The team ___ training in Oulu this week.",
          answer: "is",
          hint: "A collective noun acting as one body takes a singular verb.",
        },
        {
          text: "Both of the applicants ___ strong references.",
          textEn: "Both of the applicants ___ strong references.",
          answer: "have",
          hint: "Both is plural.",
        },
        {
          text: "There ___ two options left on the menu.",
          textEn: "There ___ two options left on the menu.",
          answer: "are",
          hint: "The verb agrees with options.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi hòa hợp.",
      instructionEn: "Fix the agreement mistake.",
      items: [
        {
          wrong: "One of my friends live in Vaasa.",
          correct: "One of my friends lives in Vaasa.",
          explanation: "The subject is one, which is singular.",
        },
        {
          wrong: "Physics were harder than I expected.",
          correct: "Physics was harder than I expected.",
          explanation: "Physics is singular despite the final s.",
        },
        {
          wrong: "Not only the tutor but also the students was late.",
          correct: "Not only the tutor but also the students were late.",
          explanation: "The verb agrees with the nearer subject, students.",
        },
      ],
    },
  ],

  "conditionals-advanced": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng câu điều kiện đúng.",
      instructionEn: "Choose the correct conditional form.",
      questions: [
        {
          question: "If I ___ about the strike, I would have taken the car.",
          options: ["had known", "knew", "would know", "have known"],
          answer: 0,
          explanation: "A past unreal condition takes the past perfect.",
        },
        {
          question: "If she had studied medicine, she ___ a doctor now.",
          options: ["would be", "would have been", "will be", "was"],
          answer: 0,
          explanation: "A mixed conditional links a past condition to a present result.",
        },
        {
          question: "___ you need help, call the front desk.",
          options: ["Should", "Would", "Will", "Might"],
          answer: 0,
          explanation: "Should you replaces if you in formal conditionals.",
        },
        {
          question: "I would rather you ___ so loudly in the library.",
          options: ["did not talk", "do not talk", "not talking", "will not talk"],
          answer: 0,
          explanation: "Would rather you takes a past form for present meaning.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu điều kiện.",
      instructionEn: "Rewrite each sentence as a conditional.",
      items: [
        {
          prompt: "I did not save the file, so I lost my work.",
          target: "If I had saved the file, I would not have lost my work.",
          goal: "Use the third conditional.",
        },
        {
          prompt: "She missed the train because she woke up late.",
          target: "If she had not woken up late, she would not have missed the train.",
          goal: "Negate both halves.",
        },
        {
          prompt: "He does not speak Swedish, so he did not get the job.",
          target: "If he spoke Swedish, he would have got the job.",
          goal: "Use a mixed conditional.",
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
          wrong: "My aunt who lives in Tampere is a nurse.",
          correct: "My aunt, who lives in Tampere, is a nurse.",
          explanation: "Extra information about a known person needs commas.",
        },
        {
          wrong: "The novel, that won the prize, sold out quickly.",
          correct: "The novel, which won the prize, sold out quickly.",
          explanation: "That cannot be used in a non-defining clause.",
        },
        {
          wrong: "He failed the test, what surprised everyone.",
          correct: "He failed the test, which surprised everyone.",
          explanation: "Which refers to the whole previous clause.",
        },
        {
          wrong: "Helsinki where I studied is on the coast.",
          correct: "Helsinki, where I studied, is on the coast.",
          explanation: "A place already identified takes commas.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn câu đúng.",
      instructionEn: "Choose the correct sentence.",
      questions: [
        {
          question: "Which sentence is a correct non-defining clause?",
          options: [
            "Mr Hai, who teaches IELTS, studied in Finland.",
            "Mr Hai who teaches IELTS studied in Finland.",
            "Mr Hai, that teaches IELTS, studied in Finland.",
            "Mr Hai, which teaches IELTS, studied in Finland.",
          ],
          answer: 0,
          explanation: "Who plus commas gives extra information about a named person.",
        },
        {
          question: "Which sentence comments on the whole clause?",
          options: [
            "She arrived an hour late, which annoyed the guests.",
            "She arrived an hour late, who annoyed the guests.",
            "She arrived an hour late that annoyed the guests.",
            "She arrived an hour late, what annoyed the guests.",
          ],
          answer: 0,
          explanation: "Which after a comma refers back to the whole idea.",
        },
        {
          question: "Which sentence keeps the possessive form correct?",
          options: [
            "My neighbour, whose dog barks all night, apologised.",
            "My neighbour, who's dog barks all night, apologised.",
            "My neighbour, which dog barks all night, apologised.",
            "My neighbour whose dog barks all night, apologised.",
          ],
          answer: 0,
          explanation: "Whose shows possession and the clause needs both commas.",
        },
      ],
    },
  ],

  "gerunds-advanced": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng động từ đúng.",
      instructionEn: "Choose the correct verb form.",
      questions: [
        {
          question: "I do not mind ___ late to finish the project.",
          options: ["staying", "to stay", "stay", "stayed"],
          answer: 0,
          explanation: "Mind is followed by a gerund.",
        },
        {
          question: "She stopped ___ coffee after six in the evening.",
          options: ["drinking", "to drink", "drink", "drunk"],
          answer: 0,
          explanation: "Stop plus gerund means she gave up the habit.",
        },
        {
          question: "We remembered ___ the door before leaving.",
          options: ["to lock", "locking", "lock", "locked"],
          answer: 0,
          explanation: "Remember plus infinitive means the task was not forgotten.",
        },
        {
          question: "He is looking forward to ___ his family in June.",
          options: ["seeing", "see", "have seen", "sees"],
          answer: 0,
          explanation: "To here is a preposition, so it takes the gerund.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi danh động từ và động từ nguyên mẫu.",
      instructionEn: "Fix the gerund or infinitive mistake.",
      items: [
        {
          wrong: "She avoided to answer the question.",
          correct: "She avoided answering the question.",
          explanation: "Avoid takes a gerund.",
        },
        {
          wrong: "They are used to work under pressure.",
          correct: "They are used to working under pressure.",
          explanation: "Be used to is followed by the gerund.",
        },
        {
          wrong: "I regret to tell him the truth last night.",
          correct: "I regret telling him the truth last night.",
          explanation: "Regret plus gerund refers to a past action.",
        },
      ],
    },
  ],

  "prepositions-time-place": [
    {
      type: "fill-in-blank",
      instruction: "Điền in, on hoặc at.",
      instructionEn: "Complete each sentence with in, on or at.",
      sentences: [
        {
          text: "The ceremony starts ___ 9 a.m. ___ Saturday.",
          textEn: "The ceremony starts ___ 9 a.m. ___ Saturday.",
          answer: "at, on",
          hint: "At for clock time, on for days.",
        },
        {
          text: "We moved to Turku ___ March, ___ 2021.",
          textEn: "We moved to Turku ___ March, ___ 2021.",
          answer: "in, in",
          hint: "In for months and years.",
        },
        {
          text: "I will wait for you ___ the bus stop ___ the corner.",
          textEn: "I will wait for you ___ the bus stop ___ the corner.",
          answer: "at, on",
          hint: "At for a point, on for a corner.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi giới từ chỉ thời gian và nơi chốn.",
      instructionEn: "Correct the time or place preposition.",
      items: [
        {
          wrong: "The workshop is in Monday afternoon.",
          correct: "The workshop is on Monday afternoon.",
          explanation: "A named day takes on, even with a part of the day.",
        },
        {
          wrong: "She lives at Vietnam with her grandparents.",
          correct: "She lives in Vietnam with her grandparents.",
          explanation: "Countries take in.",
        },
        {
          wrong: "The film starts in 7:30 tonight.",
          correct: "The film starts at 7:30 tonight.",
          explanation: "Clock times take at.",
        },
      ],
    },
  ],

  "tag-questions": [
    {
      type: "fill-in-blank",
      instruction: "Điền câu hỏi đuôi đúng.",
      instructionEn: "Complete each sentence with the correct question tag.",
      sentences: [
        {
          text: "You have finished your homework, ___?",
          textEn: "You have finished your homework, ___?",
          answer: "haven't you",
          hint: "A positive statement takes a negative tag.",
        },
        {
          text: "She does not drive, ___?",
          textEn: "She does not drive, ___?",
          answer: "does she",
          hint: "A negative statement takes a positive tag.",
        },
        {
          text: "Let us take a short break, ___?",
          textEn: "Let us take a short break, ___?",
          answer: "shall we",
          hint: "Let us always takes shall we.",
        },
        {
          text: "Nobody called while I was out, ___?",
          textEn: "Nobody called while I was out, ___?",
          answer: "did they",
          hint: "Nobody is treated as negative and plural.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu hỏi đuôi.",
      instructionEn: "Correct the question tag.",
      items: [
        {
          wrong: "You are coming tonight, are you?",
          correct: "You are coming tonight, aren't you?",
          explanation: "A positive statement needs a negative tag.",
        },
        {
          wrong: "I am late, am not I?",
          correct: "I am late, aren't I?",
          explanation: "The fixed tag for I am is aren't I.",
        },
        {
          wrong: "Open the window, will you not?",
          correct: "Open the window, will you?",
          explanation: "Imperatives take the positive tag will you.",
        },
      ],
    },
  ],

  "adverb-position": [
    {
      type: "error-correction",
      instruction: "Sửa vị trí trạng từ.",
      instructionEn: "Correct the adverb position.",
      items: [
        {
          wrong: "She speaks very well English.",
          correct: "She speaks English very well.",
          explanation: "An adverb of manner follows the object.",
        },
        {
          wrong: "I go always to bed before midnight.",
          correct: "I always go to bed before midnight.",
          explanation: "Frequency adverbs go before the main verb.",
        },
        {
          wrong: "He has finished already the report.",
          correct: "He has already finished the report.",
          explanation: "Already goes between the auxiliary and the main verb.",
        },
        {
          wrong: "We watched yesterday a documentary.",
          correct: "We watched a documentary yesterday.",
          explanation: "Time adverbs usually go at the end.",
        },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu với trạng từ đúng vị trí.",
      instructionEn: "Reorder each sentence, placing the adverb correctly.",
      items: [
        {
          scrambled: ["she", "rarely", "meetings", "attends", "morning"],
          correct: "She rarely attends morning meetings",
          correctEn: "She rarely attends morning meetings",
        },
        {
          scrambled: ["carefully", "the", "read", "instructions", "students", "the"],
          correct: "The students read the instructions carefully",
          correctEn: "The students read the instructions carefully",
        },
        {
          scrambled: ["been", "has", "he", "recently", "promoted"],
          correct: "He has recently been promoted",
          correctEn: "He has recently been promoted",
        },
      ],
    },
  ],

  "noun-clauses-overview": [
    {
      type: "multiple-choice",
      instruction: "Chọn mệnh đề danh từ đúng.",
      instructionEn: "Choose the correct noun clause.",
      questions: [
        {
          question: "___ surprised everyone at the meeting.",
          options: [
            "What she suggested",
            "What did she suggest",
            "That what she suggested",
            "Which she suggested",
          ],
          answer: 0,
          explanation: "A noun clause as subject keeps statement word order.",
        },
        {
          question: "I do not know ___ the office opens on Sundays.",
          options: ["whether", "that", "what", "which"],
          answer: 0,
          explanation: "Whether introduces a yes/no idea.",
        },
        {
          question: "The problem is ___ nobody checked the data.",
          options: ["that", "what", "which", "whether"],
          answer: 0,
          explanation: "That introduces a fact after a linking verb.",
        },
        {
          question: "Tell me ___ you would like for lunch.",
          options: ["what", "that", "whether that", "which that"],
          answer: 0,
          explanation: "What acts as the object inside the clause.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi mệnh đề danh từ.",
      instructionEn: "Correct the noun clause.",
      items: [
        {
          wrong: "I wonder what is the answer.",
          correct: "I wonder what the answer is.",
          explanation: "A noun clause keeps subject before verb.",
        },
        {
          wrong: "That she said made no sense.",
          correct: "What she said made no sense.",
          explanation: "What is needed when the clause has no object.",
        },
        {
          wrong: "It is clear whether he needs more time.",
          correct: "It is clear that he needs more time.",
          explanation: "A stated fact takes that, not whether.",
        },
      ],
    },
  ],

  "modals-ability-permission": [
    {
      type: "multiple-choice",
      instruction: "Chọn động từ khiếm khuyết đúng.",
      instructionEn: "Choose the correct modal verb.",
      questions: [
        {
          question: "When I was six I ___ already swim.",
          options: ["could", "can", "was able", "may"],
          answer: 0,
          explanation: "Could describes a general past ability.",
        },
        {
          question: "After hours of work, they ___ fix the engine.",
          options: ["were able to", "could", "can", "may"],
          answer: 0,
          explanation: "A single past success takes was or were able to.",
        },
        {
          question: "___ I borrow your charger for a minute?",
          options: ["Could", "Should", "Must", "Would"],
          answer: 0,
          explanation: "Could makes a polite request for permission.",
        },
        {
          question: "Students ___ not use phones during the exam.",
          options: ["may", "could", "can be", "might have"],
          answer: 0,
          explanation: "May not states a formal prohibition.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi động từ khiếm khuyết.",
      instructionEn: "Correct the modal mistake.",
      items: [
        {
          wrong: "She can to drive a van.",
          correct: "She can drive a van.",
          explanation: "Modals are followed by the bare infinitive.",
        },
        {
          wrong: "Yesterday I could finally finish the marathon.",
          correct: "Yesterday I was finally able to finish the marathon.",
          explanation: "One achieved action takes was able to.",
        },
        {
          wrong: "Can you please to open the window?",
          correct: "Can you please open the window?",
          explanation: "No to after can.",
        },
      ],
    },
  ],
};
