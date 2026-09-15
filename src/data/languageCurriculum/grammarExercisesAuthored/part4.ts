/**
 * @file grammarExercisesAuthored/part4.ts
 * @description Hand-written, topic-specific practice (batch 4).
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart4: Record<string, InteractiveExercise[]> = {
  "passive-basic": [
    {
      type: "transformation",
      instruction: "Chuyển câu chủ động sang bị động.",
      instructionEn: "Rewrite each sentence in the passive voice.",
      items: [
        {
          prompt: "The cleaners lock the gates at nine.",
          target: "The gates are locked at nine.",
          goal: "Present simple passive.",
        },
        {
          prompt: "Someone stole my bicycle last night.",
          target: "My bicycle was stolen last night.",
          goal: "Past simple passive without the agent.",
        },
        {
          prompt: "The committee has approved the budget.",
          target: "The budget has been approved by the committee.",
          goal: "Present perfect passive.",
        },
        {
          prompt: "They are repairing the lift this week.",
          target: "The lift is being repaired this week.",
          goal: "Present continuous passive.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu bị động.",
      instructionEn: "Correct the passive sentence.",
      items: [
        {
          wrong: "The letters was sent yesterday.",
          correct: "The letters were sent yesterday.",
          explanation: "A plural subject takes were.",
        },
        {
          wrong: "The room is clean by the staff every morning.",
          correct: "The room is cleaned by the staff every morning.",
          explanation: "The passive needs the past participle cleaned.",
        },
        {
          wrong: "My phone has stolen at the station.",
          correct: "My phone was stolen at the station.",
          explanation: "The verb must be passive: was stolen.",
        },
      ],
    },
  ],

  "passive-advanced": [
    {
      type: "transformation",
      instruction: "Viết lại câu bị động ở dạng nâng cao.",
      instructionEn: "Rewrite each sentence using an advanced passive form.",
      items: [
        {
          prompt: "People believe that he lives abroad.",
          target: "He is believed to live abroad.",
          goal: "Use the personal passive with an infinitive.",
        },
        {
          prompt: "They expect the results to arrive on Friday.",
          target: "The results are expected to arrive on Friday.",
          goal: "Move the object to subject position.",
        },
        {
          prompt: "Nobody has explained the delay to us.",
          target: "The delay has not been explained to us.",
          goal: "Present perfect passive in the negative.",
        },
        {
          prompt: "They say the museum was built in 1890.",
          target: "The museum is said to have been built in 1890.",
          goal: "Use a perfect passive infinitive.",
        },
      ],
    },
    {
      type: "multiple-choice",
      instruction: "Chọn dạng bị động đúng.",
      instructionEn: "Choose the correct passive form.",
      questions: [
        {
          question: "The suspect ___ to have left the country.",
          options: ["is thought", "thinks", "is thinking", "has thought"],
          answer: 0,
          explanation: "Reporting verbs in the passive take to plus infinitive.",
        },
        {
          question: "The new bridge ___ by the end of next year.",
          options: ["will have been completed", "will complete", "completes", "has completed"],
          answer: 0,
          explanation: "Future perfect passive fits a deadline.",
        },
        {
          question: "Nothing ___ about the leak until Monday.",
          options: ["was said", "said", "was saying", "has say"],
          answer: 0,
          explanation: "Past simple passive with nothing as subject.",
        },
      ],
    },
  ],

  "passive-get-have": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng have hoặc get đúng.",
      instructionEn: "Choose the correct have or get structure.",
      questions: [
        {
          question: "I ___ my hair cut every six weeks.",
          options: ["have", "am having cut", "get cutting", "make"],
          answer: 0,
          explanation: "Have plus object plus past participle for a service.",
        },
        {
          question: "She ___ her laptop repaired at the campus shop.",
          options: ["got", "get", "was got", "getting"],
          answer: 0,
          explanation: "Got plus object plus participle in the past.",
        },
        {
          question: "We ___ the walls painted before we moved in.",
          options: ["had", "have been", "were had", "having"],
          answer: 0,
          explanation: "Had plus object plus participle describes a past service.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu dùng have hoặc get something done.",
      instructionEn: "Rewrite each sentence with have or get something done.",
      items: [
        {
          prompt: "A mechanic serviced my car last week.",
          target: "I had my car serviced last week.",
          goal: "Use had something done.",
        },
        {
          prompt: "A dentist will check my teeth on Monday.",
          target: "I will have my teeth checked on Monday.",
          goal: "Use will have something done.",
        },
        {
          prompt: "Someone is fixing her heater today.",
          target: "She is getting her heater fixed today.",
          goal: "Use getting something done.",
        },
      ],
    },
  ],

  "modals-basic": [
    {
      type: "multiple-choice",
      instruction: "Chọn động từ khiếm khuyết đúng.",
      instructionEn: "Choose the correct modal verb.",
      questions: [
        {
          question: "You ___ wear a helmet on this site.",
          options: ["must", "can", "might", "would"],
          answer: 0,
          explanation: "Must expresses a strong rule.",
        },
        {
          question: "It ___ rain later, so take a jacket.",
          options: ["might", "must", "should not", "can"],
          answer: 0,
          explanation: "Might shows possibility.",
        },
        {
          question: "You ___ revise the notes before the quiz.",
          options: ["should", "must not", "can", "would"],
          answer: 0,
          explanation: "Should gives advice.",
        },
        {
          question: "___ you pass me the stapler, please?",
          options: ["Could", "Must", "Should", "Might"],
          answer: 0,
          explanation: "Could makes a polite request.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi động từ khiếm khuyết.",
      instructionEn: "Correct the modal verb mistake.",
      items: [
        {
          wrong: "He musts finish the form today.",
          correct: "He must finish the form today.",
          explanation: "Modals never take an s.",
        },
        {
          wrong: "You should to book a seat early.",
          correct: "You should book a seat early.",
          explanation: "No to after should.",
        },
        {
          wrong: "We can not to enter without a badge.",
          correct: "We cannot enter without a badge.",
          explanation: "Cannot is followed by the bare infinitive.",
        },
      ],
    },
  ],

  "modals-obligation-advice": [
    {
      type: "multiple-choice",
      instruction: "Chọn cách diễn đạt nghĩa vụ hoặc khuyên bảo đúng.",
      instructionEn: "Choose the correct obligation or advice form.",
      questions: [
        {
          question: "You ___ smoke inside the building; it is illegal.",
          options: ["must not", "do not have to", "should not have", "need not"],
          answer: 0,
          explanation: "Must not states prohibition.",
        },
        {
          question: "You ___ pay for the trial month; it is free.",
          options: ["do not have to", "must not", "should not", "cannot"],
          answer: 0,
          explanation: "Do not have to means there is no obligation.",
        },
        {
          question: "You ___ told her before the meeting started.",
          options: ["should have", "must have", "ought", "had better"],
          answer: 0,
          explanation: "Should have plus participle criticises a past action.",
        },
        {
          question: "You ___ leave now or you will miss the train.",
          options: ["had better", "would rather", "must to", "should to"],
          answer: 0,
          explanation: "Had better gives urgent advice.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi diễn đạt nghĩa vụ.",
      instructionEn: "Correct the obligation form.",
      items: [
        {
          wrong: "You mustn't pay for the ticket; entry is free.",
          correct: "You don't have to pay for the ticket; entry is free.",
          explanation: "Must not means prohibition, not absence of obligation.",
        },
        {
          wrong: "She had better to see a doctor.",
          correct: "She had better see a doctor.",
          explanation: "Had better takes the bare infinitive.",
        },
        {
          wrong: "We must finished the audit last Friday.",
          correct: "We had to finish the audit last Friday.",
          explanation: "Past obligation uses had to.",
        },
      ],
    },
  ],

  "modals-advanced": [
    {
      type: "multiple-choice",
      instruction: "Chọn suy đoán đúng bằng động từ khiếm khuyết.",
      instructionEn: "Choose the correct modal of deduction.",
      questions: [
        {
          question: "The lights are off; they ___ gone out.",
          options: ["must have", "should have", "can have", "would have"],
          answer: 0,
          explanation: "Must have shows a confident conclusion about the past.",
        },
        {
          question: "She is not answering; she ___ be in a lecture.",
          options: ["could", "must not", "should", "would have"],
          answer: 0,
          explanation: "Could shows a possible explanation.",
        },
        {
          question: "He ___ have taken my umbrella; he was not even here.",
          options: ["cannot", "must not", "should not", "would not"],
          answer: 0,
          explanation: "Cannot have expresses a confident negative deduction.",
        },
        {
          question: "They ___ arrived by now; the flight landed hours ago.",
          options: ["should have", "must not have", "can have", "might not"],
          answer: 0,
          explanation: "Should have shows an expectation that may not be met.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu bằng động từ khiếm khuyết suy đoán.",
      instructionEn: "Rewrite each sentence with a modal of deduction.",
      items: [
        {
          prompt: "I am sure she forgot the appointment.",
          target: "She must have forgotten the appointment.",
          goal: "Use must have plus participle.",
        },
        {
          prompt: "It is possible that they missed the announcement.",
          target: "They might have missed the announcement.",
          goal: "Use might have plus participle.",
        },
        {
          prompt: "I am certain he did not write this report.",
          target: "He cannot have written this report.",
          goal: "Use cannot have plus participle.",
        },
      ],
    },
  ],

  "tenses-past": [
    {
      type: "multiple-choice",
      instruction: "Chọn thì quá khứ đúng.",
      instructionEn: "Choose the correct past tense.",
      questions: [
        {
          question: "I ___ my homework when the lights went out.",
          options: ["was doing", "did", "had done", "do"],
          answer: 0,
          explanation: "An interrupted action takes the past continuous.",
        },
        {
          question: "She ___ already left when I called.",
          options: ["had", "has", "was", "did"],
          answer: 0,
          explanation: "The earlier of two past actions takes the past perfect.",
        },
        {
          question: "We ___ in Hue for two years before moving north.",
          options: ["had lived", "have lived", "were living for", "live"],
          answer: 0,
          explanation: "Duration before another past event takes the past perfect.",
        },
        {
          question: "The film ___ at eight and finished at ten.",
          options: ["started", "was starting", "had started", "starts"],
          answer: 0,
          explanation: "A completed past event takes the past simple.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi thì quá khứ.",
      instructionEn: "Correct the past tense mistake.",
      items: [
        {
          wrong: "While I studied, my phone was ringing twice.",
          correct: "While I was studying, my phone rang twice.",
          explanation: "The background action is continuous and the short action is simple.",
        },
        {
          wrong: "He didn't went to the ceremony.",
          correct: "He did not go to the ceremony.",
          explanation: "After did the verb stays in the base form.",
        },
        {
          wrong: "When we arrived, the guests already left.",
          correct: "When we arrived, the guests had already left.",
          explanation: "The earlier action needs the past perfect.",
        },
      ],
    },
  ],

  "tenses-perfect-continuous": [
    {
      type: "fill-in-blank",
      instruction: "Điền thì hoàn thành tiếp diễn.",
      instructionEn: "Complete each sentence with a perfect continuous form.",
      sentences: [
        {
          text: "She ___ for this exam since January.",
          textEn: "She ___ for this exam since January.",
          answer: "has been preparing",
          hint: "Present perfect continuous with since.",
        },
        {
          text: "They ___ for an hour before the coach arrived.",
          textEn: "They ___ for an hour before the coach arrived.",
          answer: "had been waiting",
          hint: "Past perfect continuous before a past event.",
        },
        {
          text: "By June I ___ here for three years.",
          textEn: "By June I ___ here for three years.",
          answer: "will have been working",
          hint: "Future perfect continuous with a duration.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi thì hoàn thành tiếp diễn.",
      instructionEn: "Correct the perfect continuous mistake.",
      items: [
        {
          wrong: "I am waiting here since two o'clock.",
          correct: "I have been waiting here since two o'clock.",
          explanation: "An action continuing from a past point needs the present perfect continuous.",
        },
        {
          wrong: "He has been knowing her for years.",
          correct: "He has known her for years.",
          explanation: "State verbs avoid the continuous.",
        },
        {
          wrong: "She had been finished the report before lunch.",
          correct: "She had finished the report before lunch.",
          explanation: "A completed action takes the past perfect simple.",
        },
      ],
    },
  ],

  "tenses-future-perfect": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng tương lai hoàn thành đúng.",
      instructionEn: "Choose the correct future perfect form.",
      questions: [
        {
          question: "By 2030 the city ___ two new metro lines.",
          options: ["will have built", "will build", "builds", "has built"],
          answer: 0,
          explanation: "A completed action before a future point takes the future perfect.",
        },
        {
          question: "By the time you arrive, we ___ dinner.",
          options: ["will have finished", "finish", "will finish", "had finished"],
          answer: 0,
          explanation: "By the time signals the future perfect.",
        },
        {
          question: "Next month she ___ here for a decade.",
          options: ["will have been working", "will work", "works", "has worked"],
          answer: 0,
          explanation: "A duration up to a future point takes the future perfect continuous.",
        },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu ở tương lai hoàn thành.",
      instructionEn: "Rewrite each sentence in the future perfect.",
      items: [
        {
          prompt: "I will finish the course before September.",
          target: "By September I will have finished the course.",
          goal: "Start with by plus the time.",
        },
        {
          prompt: "They will repay the loan before next winter.",
          target: "By next winter they will have repaid the loan.",
          goal: "Use will have plus participle.",
        },
        {
          prompt: "She will save enough money before the trip.",
          target: "By the time the trip starts, she will have saved enough money.",
          goal: "Use by the time plus a present verb.",
        },
      ],
    },
  ],

  "conditionals-basic": [
    {
      type: "multiple-choice",
      instruction: "Chọn dạng câu điều kiện đúng.",
      instructionEn: "Choose the correct conditional form.",
      questions: [
        {
          question: "If you heat ice, it ___.",
          options: ["melts", "will melt away", "would melt", "melted"],
          answer: 0,
          explanation: "A general truth takes the zero conditional.",
        },
        {
          question: "If it rains tomorrow, we ___ the picnic.",
          options: ["will cancel", "cancel", "would cancel", "cancelled"],
          answer: 0,
          explanation: "The first conditional pairs a present verb with will.",
        },
        {
          question: "If I ___ more time, I would learn Finnish properly.",
          options: ["had", "have", "will have", "would have"],
          answer: 0,
          explanation: "The second conditional uses a past form after if.",
        },
        {
          question: "If she were here, she ___ how to fix it.",
          options: ["would know", "will know", "knows", "knew"],
          answer: 0,
          explanation: "The result clause of a second conditional takes would.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu điều kiện.",
      instructionEn: "Correct the conditional sentence.",
      items: [
        {
          wrong: "If it will snow, the roads close.",
          correct: "If it snows, the roads will close.",
          explanation: "Will does not follow if in the condition clause.",
        },
        {
          wrong: "If I would have money, I would travel more.",
          correct: "If I had money, I would travel more.",
          explanation: "The second conditional takes a past simple after if.",
        },
        {
          wrong: "If you study hard, you would pass.",
          correct: "If you study hard, you will pass.",
          explanation: "A real future condition takes will.",
        },
      ],
    },
  ],

  "conditionals-inverted": [
    {
      type: "transformation",
      instruction: "Viết lại câu điều kiện bằng đảo ngữ.",
      instructionEn: "Rewrite each conditional using inversion.",
      items: [
        {
          prompt: "If you should need help, call this number.",
          target: "Should you need help, call this number.",
          goal: "Drop if and put should first.",
        },
        {
          prompt: "If I were you, I would apply again.",
          target: "Were I you, I would apply again.",
          goal: "Put were before the subject.",
        },
        {
          prompt: "If they had known the risk, they would have stopped.",
          target: "Had they known the risk, they would have stopped.",
          goal: "Put had before the subject.",
        },
        {
          prompt: "If the weather had not improved, the match would have been cancelled.",
          target: "Had the weather not improved, the match would have been cancelled.",
          goal: "Keep not after the subject.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi đảo ngữ trong câu điều kiện.",
      instructionEn: "Correct the inverted conditional.",
      items: [
        {
          wrong: "Did I know the answer, I would tell you.",
          correct: "Were I to know the answer, I would tell you.",
          explanation: "Only should, were and had can invert in conditionals.",
        },
        {
          wrong: "Had I have more time, I would help.",
          correct: "Had I had more time, I would have helped.",
          explanation: "Had plus subject is followed by the past participle.",
        },
        {
          wrong: "Should you will need anything, ask the desk.",
          correct: "Should you need anything, ask the desk.",
          explanation: "Should is followed by the bare infinitive.",
        },
      ],
    },
  ],

  "conditionals-wish": [
    {
      type: "transformation",
      instruction: "Viết lại câu bằng wish hoặc if only.",
      instructionEn: "Rewrite each sentence with wish or if only.",
      items: [
        {
          prompt: "I do not have a car. (wish)",
          target: "I wish I had a car.",
          goal: "Present regret takes a past form.",
        },
        {
          prompt: "She did not apply for the scholarship. (wish)",
          target: "She wishes she had applied for the scholarship.",
          goal: "Past regret takes the past perfect.",
        },
        {
          prompt: "My neighbours play music all night. (if only)",
          target: "If only my neighbours would not play music all night.",
          goal: "Use would for an annoying habit.",
        },
        {
          prompt: "I cannot swim well. (wish)",
          target: "I wish I could swim well.",
          goal: "Use could for ability.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi câu ước.",
      instructionEn: "Correct the wish sentence.",
      items: [
        {
          wrong: "I wish I am taller.",
          correct: "I wish I were taller.",
          explanation: "Wish about the present takes a past form, were.",
        },
        {
          wrong: "He wishes he studied harder last year.",
          correct: "He wishes he had studied harder last year.",
          explanation: "A past regret takes the past perfect.",
        },
        {
          wrong: "If only it stops raining now.",
          correct: "If only it would stop raining now.",
          explanation: "Use would for something you want to change.",
        },
      ],
    },
  ],

  "comparisons-double": [
    {
      type: "transformation",
      instruction: "Viết lại câu bằng cấu trúc so sánh kép.",
      instructionEn: "Rewrite each sentence using a double comparative.",
      items: [
        {
          prompt: "When you practise more, you speak more fluently.",
          target: "The more you practise, the more fluently you speak.",
          goal: "The more ..., the more ...",
        },
        {
          prompt: "As the room got hotter, we became more tired.",
          target: "The hotter the room got, the more tired we became.",
          goal: "Use comparative adjectives in both halves.",
        },
        {
          prompt: "Prices keep rising all the time.",
          target: "Prices are getting higher and higher.",
          goal: "Use the comparative twice with and.",
        },
        {
          prompt: "If you start earlier, you finish sooner.",
          target: "The earlier you start, the sooner you finish.",
          goal: "Keep the same subject in both halves.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi so sánh kép.",
      instructionEn: "Correct the double comparative.",
      items: [
        {
          wrong: "The more you sleep, the better you will feeling.",
          correct: "The more you sleep, the better you will feel.",
          explanation: "After will the verb is in the base form.",
        },
        {
          wrong: "More it rains, more the river rises.",
          correct: "The more it rains, the more the river rises.",
          explanation: "Both halves need the.",
        },
        {
          wrong: "The traffic is getting bad and bad.",
          correct: "The traffic is getting worse and worse.",
          explanation: "Repeat the comparative form, not the adjective.",
        },
      ],
    },
  ],

  "grammar-quantifiers": [
    {
      type: "multiple-choice",
      instruction: "Chọn lượng từ đúng.",
      instructionEn: "Choose the correct quantifier.",
      questions: [
        {
          question: "There is ___ milk left in the fridge.",
          options: ["a little", "a few", "many", "several"],
          answer: 0,
          explanation: "Milk is uncountable, so use a little.",
        },
        {
          question: "Only ___ students signed up for the trip.",
          options: ["a few", "a little", "much", "any"],
          answer: 0,
          explanation: "Students is countable, so use a few.",
        },
        {
          question: "We do not have ___ time before the deadline.",
          options: ["much", "many", "a few", "several"],
          answer: 0,
          explanation: "Much goes with uncountable nouns in negatives.",
        },
        {
          question: "___ of the seats were still empty.",
          options: ["Some", "Much", "A little", "Every"],
          answer: 0,
          explanation: "Some of plus a plural noun works with a plural verb.",
        },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi lượng từ.",
      instructionEn: "Correct the quantifier.",
      items: [
        {
          wrong: "I have many homework tonight.",
          correct: "I have a lot of homework tonight.",
          explanation: "Homework is uncountable.",
        },
        {
          wrong: "Every students must bring an ID.",
          correct: "Every student must bring an ID.",
          explanation: "Every takes a singular noun.",
        },
        {
          wrong: "There were much people at the fair.",
          correct: "There were many people at the fair.",
          explanation: "People is countable, so use many.",
        },
      ],
    },
  ],
};
