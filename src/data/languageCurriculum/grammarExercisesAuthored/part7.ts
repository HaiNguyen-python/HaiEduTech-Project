/**
 * @file grammarExercisesAuthored/part7.ts
 * @description Hand-written top-up practice (batch 7).
 */
import type { InteractiveExercise } from "../types";

export const authoredGrammarExercisesPart7: Record<string, InteractiveExercise[]> = {
  "modals-advanced": [
    {
      type: "matching",
      instruction: "Nối câu suy đoán với mức độ chắc chắn.",
      instructionEn: "Match each sentence with how certain the speaker is.",
      pairs: [
        { left: "He must be at the library.", right: "almost certain it is true" },
        { left: "He may be at the library.", right: "possible, about fifty percent" },
        { left: "He cannot be at the library.", right: "almost certain it is not true" },
        { left: "He should be at the library by now.", right: "expected, based on a plan" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu suy đoán.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["She", "must", "have", "left", "her", "keys", "at", "home"],
          correct: "She must have left her keys at home",
        },
        {
          scrambled: ["They", "cannot", "have", "finished", "the", "test", "already"],
          correct: "They cannot have finished the test already",
        },
      ],
    },
  ],

  "modals-obligation-advice": [
    {
      type: "matching",
      instruction: "Nối cấu trúc với sắc thái nghĩa.",
      instructionEn: "Match each structure with its meaning.",
      pairs: [
        { left: "must not", right: "it is forbidden" },
        { left: "do not have to", right: "there is no obligation" },
        { left: "should", right: "it is a good idea" },
        { left: "had better", right: "urgent advice with a warning" },
        { left: "had to", right: "obligation in the past" },
      ],
    },
  ],

  "comparisons-basic": [
    {
      type: "matching",
      instruction: "Nối tính từ với dạng so sánh hơn.",
      instructionEn: "Match each adjective with its comparative form.",
      pairs: [
        { left: "good", right: "better" },
        { left: "bad", right: "worse" },
        { left: "far", right: "further" },
        { left: "busy", right: "busier" },
        { left: "expensive", right: "more expensive" },
      ],
    },
  ],

  "comparisons-double": [
    {
      type: "matching",
      instruction: "Nối nửa đầu với nửa sau của câu so sánh kép.",
      instructionEn: "Match the two halves of each double comparative.",
      pairs: [
        { left: "The longer you wait,", right: "the harder it becomes to start." },
        { left: "The more you read,", right: "the wider your vocabulary grows." },
        { left: "The colder it gets,", right: "the more electricity we use." },
        { left: "The bigger the class,", right: "the less speaking time each student gets." },
      ],
    },
  ],

  "grammar-quantifiers": [
    {
      type: "matching",
      instruction: "Nối lượng từ với loại danh từ.",
      instructionEn: "Match each quantifier with the noun type it fits.",
      pairs: [
        { left: "many", right: "countable plural nouns" },
        { left: "much", right: "uncountable nouns" },
        { left: "a few", right: "a small number of countable nouns" },
        { left: "a little", right: "a small amount of an uncountable noun" },
        { left: "every", right: "a singular countable noun" },
      ],
    },
  ],

  "gerunds-basic": [
    {
      type: "matching",
      instruction: "Nối động từ với dạng theo sau.",
      instructionEn: "Match each verb with the form that follows it.",
      pairs: [
        { left: "enjoy", right: "gerund: enjoy swimming" },
        { left: "decide", right: "infinitive: decide to leave" },
        { left: "avoid", right: "gerund: avoid arguing" },
        { left: "promise", right: "infinitive: promise to help" },
        { left: "look forward to", right: "gerund: look forward to meeting you" },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi danh động từ và động từ nguyên mẫu.",
      instructionEn: "Correct the gerund or infinitive mistake.",
      items: [
        {
          wrong: "I enjoy to cook at the weekend.",
          correct: "I enjoy cooking at the weekend.",
          explanation: "Enjoy takes a gerund.",
        },
        {
          wrong: "She decided going home early.",
          correct: "She decided to go home early.",
          explanation: "Decide takes an infinitive.",
        },
        {
          wrong: "We are looking forward to meet you.",
          correct: "We are looking forward to meeting you.",
          explanation: "To here is a preposition, so use the gerund.",
        },
      ],
    },
  ],

  "gerunds-advanced": [
    {
      type: "matching",
      instruction: "Nối câu với sự khác nghĩa.",
      instructionEn: "Match each sentence with its meaning.",
      pairs: [
        { left: "I stopped smoking.", right: "I gave up the habit." },
        { left: "I stopped to smoke.", right: "I paused in order to smoke." },
        { left: "I remember locking the door.", right: "I have a memory of the action." },
        { left: "I remembered to lock the door.", right: "I did not forget the task." },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu bằng danh động từ hoặc nguyên mẫu.",
      instructionEn: "Rewrite each sentence with a gerund or an infinitive.",
      items: [
        {
          prompt: "It is not worth the effort to argue with him.",
          target: "It is not worth arguing with him.",
          goal: "Worth takes a gerund.",
        },
        {
          prompt: "She managed that she finished on time.",
          target: "She managed to finish on time.",
          goal: "Manage takes an infinitive.",
        },
        {
          prompt: "I would rather that we started earlier.",
          target: "I would rather start earlier.",
          goal: "Would rather takes the bare infinitive.",
        },
      ],
    },
  ],

  "inversions": [
    {
      type: "matching",
      instruction: "Nối cụm mở đầu với phần đảo ngữ theo sau.",
      instructionEn: "Match each opening phrase with the inverted clause.",
      pairs: [
        { left: "Never before", right: "had we seen such a queue." },
        { left: "Not only", right: "did she pass, but she also topped the class." },
        { left: "Rarely", right: "does he miss a deadline." },
        { left: "No sooner", right: "had the bell rung than the room emptied." },
      ],
    },
    {
      type: "transformation",
      instruction: "Viết lại câu bằng đảo ngữ.",
      instructionEn: "Rewrite each sentence using inversion.",
      items: [
        {
          prompt: "I have never heard such a weak excuse.",
          target: "Never have I heard such a weak excuse.",
          goal: "Put never first and invert.",
        },
        {
          prompt: "She rarely takes a day off.",
          target: "Rarely does she take a day off.",
          goal: "Add does after rarely.",
        },
        {
          prompt: "The train had hardly left when the storm started.",
          target: "Hardly had the train left when the storm started.",
          goal: "Put hardly first and invert had.",
        },
      ],
    },
  ],

  "inversion-negative-adverbials": [
    {
      type: "transformation",
      instruction: "Viết lại câu bắt đầu bằng trạng ngữ phủ định.",
      instructionEn: "Rewrite each sentence starting with the negative adverbial.",
      items: [
        {
          prompt: "We had barely sat down when the fire alarm rang.",
          target: "Barely had we sat down when the fire alarm rang.",
          goal: "Barely plus inverted had.",
        },
        {
          prompt: "He did not realise his mistake at any point.",
          target: "At no point did he realise his mistake.",
          goal: "At no point plus did plus subject.",
        },
        {
          prompt: "She does not complain under any circumstances.",
          target: "Under no circumstances does she complain.",
          goal: "Under no circumstances plus does.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối trạng ngữ phủ định với nghĩa.",
      instructionEn: "Match each negative adverbial with its meaning.",
      pairs: [
        { left: "Seldom", right: "not often" },
        { left: "No sooner ... than", right: "immediately after" },
        { left: "Under no circumstances", right: "absolutely never" },
        { left: "Little", right: "not at all, used with know or realise" },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi đảo ngữ.",
      instructionEn: "Correct the inversion.",
      items: [
        {
          wrong: "Never I have seen such a crowd.",
          correct: "Never have I seen such a crowd.",
          explanation: "The auxiliary comes before the subject after never.",
        },
        {
          wrong: "No sooner we arrived when it rained.",
          correct: "No sooner had we arrived than it rained.",
          explanation: "No sooner pairs with than and needs inversion.",
        },
      ],
    },
  ],

  "cleft-it-was": [
    {
      type: "transformation",
      instruction: "Viết lại câu bằng cấu trúc nhấn mạnh với it.",
      instructionEn: "Rewrite each sentence as an it cleft.",
      items: [
        {
          prompt: "Minh broke the printer, not me.",
          target: "It was Minh who broke the printer, not me.",
          goal: "It was plus person plus who.",
        },
        {
          prompt: "We met in Turku, not in Helsinki.",
          target: "It was in Turku that we met, not in Helsinki.",
          goal: "It was plus place plus that.",
        },
        {
          prompt: "The noise woke me, not the alarm.",
          target: "It was the noise that woke me, not the alarm.",
          goal: "It was plus thing plus that.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối câu nhấn mạnh với phần được nhấn.",
      instructionEn: "Match each cleft sentence with the element it emphasises.",
      pairs: [
        { left: "It was on Friday that she resigned.", right: "the time" },
        { left: "It was her manager who signed the form.", right: "the person" },
        { left: "What I need is a quiet room.", right: "the thing needed" },
        { left: "It was the delay that annoyed everyone.", right: "the cause" },
      ],
    },
  ],

  "subjunctive-that-clauses": [
    {
      type: "matching",
      instruction: "Nối động từ với mệnh đề giả định.",
      instructionEn: "Match each reporting verb with a that clause in the subjunctive.",
      pairs: [
        { left: "The board recommended", right: "that the policy be revised." },
        { left: "The doctor insisted", right: "that he rest for a week." },
        { left: "It is essential", right: "that every form be signed." },
        { left: "She demanded", right: "that the refund be issued at once." },
      ],
    },
  ],

  "sv-agreement-rules": [
    {
      type: "matching",
      instruction: "Nối chủ ngữ với dạng động từ đúng.",
      instructionEn: "Match each subject with the correct verb form.",
      pairs: [
        { left: "Each of the students", right: "needs a copy" },
        { left: "The news", right: "is encouraging" },
        { left: "Ten kilometres", right: "is a long walk" },
        { left: "The staff", right: "are still discussing it" },
        { left: "Neither answer", right: "seems complete" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu đúng hòa hợp chủ ngữ động từ.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["Each", "of", "the", "answers", "carries", "two", "marks"],
          correct: "Each of the answers carries two marks",
        },
        {
          scrambled: ["Neither", "of", "the", "candidates", "was", "available"],
          correct: "Neither of the candidates was available",
        },
      ],
    },
  ],

  "grammar-sv-tricky": [
    {
      type: "matching",
      instruction: "Nối chủ ngữ khó với động từ.",
      instructionEn: "Match each tricky subject with the correct verb.",
      pairs: [
        { left: "A number of students", right: "have signed up" },
        { left: "The number of students", right: "has risen" },
        { left: "Mathematics", right: "is her strongest subject" },
        { left: "There", right: "are two options left" },
        { left: "Everybody", right: "knows the rule" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["The", "number", "of", "applications", "has", "doubled", "this", "year"],
          correct: "The number of applications has doubled this year",
        },
        {
          scrambled: ["A", "number", "of", "parents", "have", "asked", "for", "a", "meeting"],
          correct: "A number of parents have asked for a meeting",
        },
      ],
    },
  ],

  "linking-words-overview": [
    {
      type: "matching",
      instruction: "Nối từ nối với chức năng.",
      instructionEn: "Match each linking word with its function.",
      pairs: [
        { left: "however", right: "contrast between two sentences" },
        { left: "therefore", right: "result" },
        { left: "in addition", right: "adding information" },
        { left: "for instance", right: "giving an example" },
        { left: "despite", right: "contrast followed by a noun or gerund" },
      ],
    },
    {
      type: "transformation",
      instruction: "Nối hai câu bằng từ nối cho sẵn.",
      instructionEn: "Join the sentences with the linking word given.",
      items: [
        {
          prompt: "It rained heavily. The match continued. (although)",
          target: "Although it rained heavily, the match continued.",
          goal: "Although plus a clause.",
        },
        {
          prompt: "The fees rose. Enrolment stayed high. (despite)",
          target: "Despite the rise in fees, enrolment stayed high.",
          goal: "Despite plus a noun phrase.",
        },
        {
          prompt: "She missed two classes. She still passed. (nevertheless)",
          target: "She missed two classes; nevertheless, she still passed.",
          goal: "Use a semicolon before nevertheless.",
        },
      ],
    },
  ],

  "noun-clauses-overview": [
    {
      type: "matching",
      instruction: "Nối mệnh đề danh ngữ với chức năng trong câu.",
      instructionEn: "Match each noun clause with its role.",
      pairs: [
        { left: "What she said surprised us.", right: "subject of the sentence" },
        { left: "I know that he is honest.", right: "object of the verb" },
        { left: "The problem is that we are late.", right: "complement after be" },
        { left: "We talked about how it happened.", right: "object of a preposition" },
      ],
    },
  ],

  "question-indirect": [
    {
      type: "transformation",
      instruction: "Viết lại thành câu hỏi gián tiếp lịch sự.",
      instructionEn: "Rewrite each question as a polite indirect question.",
      items: [
        {
          prompt: "Where is the registration desk?",
          target: "Could you tell me where the registration desk is?",
          goal: "Keep normal word order after where.",
        },
        {
          prompt: "Does the shuttle stop here?",
          target: "Do you know whether the shuttle stops here?",
          goal: "Use whether for a yes or no question.",
        },
        {
          prompt: "When did the results come out?",
          target: "I wonder when the results came out.",
          goal: "No auxiliary after wonder.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối câu hỏi trực tiếp với dạng gián tiếp.",
      instructionEn: "Match the direct question with its indirect form.",
      pairs: [
        { left: "How much is the deposit?", right: "Could you tell me how much the deposit is?" },
        { left: "Is the library open today?", right: "Do you know if the library is open today?" },
        { left: "Who signed this form?", right: "I would like to know who signed this form." },
      ],
    },
  ],

  "question-tag": [
    {
      type: "matching",
      instruction: "Nối câu với câu hỏi đuôi đúng.",
      instructionEn: "Match each statement with its question tag.",
      pairs: [
        { left: "You have finished,", right: "haven't you?" },
        { left: "She isn't coming,", right: "is she?" },
        { left: "Let's start now,", right: "shall we?" },
        { left: "Close the door,", right: "will you?" },
        { left: "Nobody called,", right: "did they?" },
      ],
    },
  ],

  "tag-questions": [
    {
      type: "matching",
      instruction: "Nối câu với đuôi phù hợp.",
      instructionEn: "Match each sentence with the correct tag.",
      pairs: [
        { left: "He can swim,", right: "can't he?" },
        { left: "They didn't reply,", right: "did they?" },
        { left: "I am late,", right: "aren't I?" },
        { left: "There is a problem,", right: "isn't there?" },
      ],
    },
    {
      type: "transformation",
      instruction: "Thêm câu hỏi đuôi.",
      instructionEn: "Add the correct question tag.",
      items: [
        {
          prompt: "She has already paid",
          target: "She has already paid, hasn't she?",
          goal: "Positive statement takes a negative tag.",
        },
        {
          prompt: "You won't tell anyone",
          target: "You won't tell anyone, will you?",
          goal: "Negative statement takes a positive tag.",
        },
      ],
    },
  ],

  "adverb-position": [
    {
      type: "matching",
      instruction: "Nối trạng từ với vị trí thường gặp.",
      instructionEn: "Match each adverb with its usual position.",
      pairs: [
        { left: "always, never, often", right: "before the main verb, after be" },
        { left: "yesterday, last week", right: "at the end of the sentence" },
        { left: "carefully, quickly", right: "after the object or after the verb" },
        { left: "probably, certainly", right: "before the main verb" },
      ],
    },
  ],

  "parallel-structure": [
    {
      type: "matching",
      instruction: "Nối cặp liên từ tương quan.",
      instructionEn: "Match the correlative conjunction pairs.",
      pairs: [
        { left: "not only", right: "but also" },
        { left: "either", right: "or" },
        { left: "neither", right: "nor" },
        { left: "both", right: "and" },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi cấu trúc song song.",
      instructionEn: "Correct the parallel structure.",
      items: [
        {
          wrong: "She likes hiking, swimming and to cycle.",
          correct: "She likes hiking, swimming and cycling.",
          explanation: "Keep all three items in the same form.",
        },
        {
          wrong: "The course is both practical and it saves time.",
          correct: "The course is both practical and time-saving.",
          explanation: "Both and joins items of the same type.",
        },
      ],
    },
  ],

  "sentence-patterns-core": [
    {
      type: "matching",
      instruction: "Nối câu với mẫu cấu trúc.",
      instructionEn: "Match each sentence with its pattern.",
      pairs: [
        { left: "The class ended.", right: "S + V" },
        { left: "The result seems fair.", right: "S + V + C" },
        { left: "She wrote a report.", right: "S + V + O" },
        { left: "He sent me the link.", right: "S + V + O + O" },
        { left: "They elected her chair.", right: "S + V + O + C" },
      ],
    },
  ],

  "punctuation-comma-semicolon": [
    {
      type: "matching",
      instruction: "Nối dấu câu với cách dùng.",
      instructionEn: "Match each punctuation mark with its use.",
      pairs: [
        { left: "comma before and, but, so", right: "joining two independent clauses" },
        { left: "semicolon", right: "linking two closely related clauses without a conjunction" },
        { left: "comma after an opening phrase", right: "After the meeting, we left." },
        { left: "pair of commas", right: "adding extra information in the middle" },
      ],
    },
  ],

  "punctuation-apostrophe-colon": [
    {
      type: "matching",
      instruction: "Nối dấu câu với chức năng.",
      instructionEn: "Match each mark with its function.",
      pairs: [
        { left: "colon", right: "introducing a list or an explanation" },
        { left: "apostrophe with s", right: "singular possession: the student's notes" },
        { left: "apostrophe after s", right: "plural possession: the students' notes" },
        { left: "it's", right: "short form of it is" },
        { left: "its", right: "possessive form, no apostrophe" },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi dấu câu.",
      instructionEn: "Correct the punctuation.",
      items: [
        {
          wrong: "The dog wagged it's tail.",
          correct: "The dog wagged its tail.",
          explanation: "Its is possessive and takes no apostrophe.",
        },
        {
          wrong: "We need three things, paper, ink and time.",
          correct: "We need three things: paper, ink and time.",
          explanation: "A colon introduces a list.",
        },
      ],
    },
  ],

  "grammar-comma-splice": [
    {
      type: "error-correction",
      instruction: "Sửa lỗi nối câu bằng dấu phẩy.",
      instructionEn: "Fix the comma splice.",
      items: [
        {
          wrong: "The lecture was long, everyone stayed until the end.",
          correct: "The lecture was long, but everyone stayed until the end.",
          explanation: "Add a conjunction after the comma.",
        },
        {
          wrong: "I finished the draft, I sent it to my tutor.",
          correct: "I finished the draft and sent it to my tutor.",
          explanation: "Join the actions with and.",
        },
        {
          wrong: "The bus was late, therefore we missed the opening.",
          correct: "The bus was late; therefore, we missed the opening.",
          explanation: "Therefore needs a semicolon before it.",
        },
      ],
    },
    {
      type: "matching",
      instruction: "Nối cách sửa với ví dụ.",
      instructionEn: "Match each repair strategy with an example.",
      pairs: [
        { left: "add a conjunction", right: "It rained, so the match stopped." },
        { left: "use a semicolon", right: "It rained; the match stopped." },
        { left: "write two sentences", right: "It rained. The match stopped." },
        { left: "use a subordinator", right: "Because it rained, the match stopped." },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp thành câu ghép đúng.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["The", "room", "was", "full", "so", "we", "stood", "at", "the", "back"],
          correct: "The room was full so we stood at the back",
        },
        {
          scrambled: ["Because", "the", "file", "was", "corrupted", "we", "resent", "it"],
          correct: "Because the file was corrupted we resent it",
        },
      ],
    },
  ],

  "confusing-pairs-1": [
    {
      type: "matching",
      instruction: "Nối từ dễ nhầm với nghĩa.",
      instructionEn: "Match each confusing word with its meaning.",
      pairs: [
        { left: "affect", right: "verb: to influence something" },
        { left: "effect", right: "noun: the result of something" },
        { left: "advise", right: "verb: to give advice" },
        { left: "advice", right: "noun: an opinion offered" },
        { left: "lose", right: "verb: to no longer have something" },
        { left: "loose", right: "adjective: not tight" },
      ],
    },
  ],

  "confusing-pairs-2": [
    {
      type: "matching",
      instruction: "Nối từ dễ nhầm với nghĩa.",
      instructionEn: "Match each confusing word with its meaning.",
      pairs: [
        { left: "raise", right: "to lift something, takes an object" },
        { left: "rise", right: "to go up by itself, no object" },
        { left: "lay", right: "to put something down, takes an object" },
        { left: "lie", right: "to be in a flat position, no object" },
        { left: "borrow", right: "to take something for a while" },
        { left: "lend", right: "to give something for a while" },
      ],
    },
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu dùng đúng từ dễ nhầm.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["Please", "raise", "your", "hand", "before", "you", "speak"],
          correct: "Please raise your hand before you speak",
        },
        {
          scrambled: ["Prices", "rise", "every", "January", "in", "this", "city"],
          correct: "Prices rise every January in this city",
        },
      ],
    },
  ],

  "phrasal-verbs-structure": [
    {
      type: "matching",
      instruction: "Nối loại cụm động từ với ví dụ.",
      instructionEn: "Match each phrasal verb type with an example.",
      pairs: [
        { left: "separable", right: "turn the light off / turn off the light" },
        { left: "inseparable", right: "look after the children" },
        { left: "three-part", right: "put up with the noise" },
        { left: "no object", right: "The car broke down." },
      ],
    },
    {
      type: "error-correction",
      instruction: "Sửa lỗi trật tự cụm động từ.",
      instructionEn: "Correct the phrasal verb word order.",
      items: [
        {
          wrong: "Please turn off it before you leave.",
          correct: "Please turn it off before you leave.",
          explanation: "A pronoun goes between the verb and the particle.",
        },
        {
          wrong: "She looks the twins after every Friday.",
          correct: "She looks after the twins every Friday.",
          explanation: "Look after is inseparable.",
        },
      ],
    },
  ],

  "phrasal-verbs-themes": [
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu có cụm động từ.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["We", "put", "off", "the", "presentation", "until", "next", "week"],
          correct: "We put off the presentation until next week",
        },
        {
          scrambled: ["She", "looked", "into", "the", "problem", "straight", "away"],
          correct: "She looked into the problem straight away",
        },
        {
          scrambled: ["He", "gets", "along", "with", "everyone", "in", "the", "team"],
          correct: "He gets along with everyone in the team",
        },
      ],
    },
  ],

  "phrasal-verbs-structure": [
    {
      type: "transformation",
      instruction: "Viết lại câu, đặt đại từ vào đúng vị trí.",
      instructionEn: "Rewrite each sentence with the pronoun in the right place.",
      items: [
        {
          prompt: "Please hand in the form. (it)",
          target: "Please hand it in.",
          goal: "Separable verb: pronoun goes in the middle.",
        },
        {
          prompt: "They called off the trip. (it)",
          target: "They called it off.",
          goal: "Pronoun before the particle.",
        },
        {
          prompt: "I put up with the noise. (it)",
          target: "I put up with it.",
          goal: "Three-part verbs stay together.",
        },
      ],
    },
  ],

  "phrasal-verbs-themes-extra": [
    {
      type: "transformation",
      instruction: "Viết lại câu bằng cụm động từ.",
      instructionEn: "Rewrite each sentence with a phrasal verb.",
      items: [
        {
          prompt: "They postponed the interview.",
          target: "They put off the interview.",
          goal: "Use put off.",
        },
        {
          prompt: "She refused the invitation.",
          target: "She turned down the invitation.",
          goal: "Use turn down.",
        },
        {
          prompt: "We investigated the complaint.",
          target: "We looked into the complaint.",
          goal: "Use look into.",
        },
      ],
    },
  ],

  "question-tag-extra": [
    {
      type: "transformation",
      instruction: "Thêm câu hỏi đuôi phù hợp.",
      instructionEn: "Add the correct question tag.",
      items: [
        {
          prompt: "You live near the campus",
          target: "You live near the campus, don't you?",
          goal: "Present simple takes do not.",
        },
        {
          prompt: "He can't come tonight",
          target: "He can't come tonight, can he?",
          goal: "Negative statement takes a positive tag.",
        },
        {
          prompt: "Let's take a break",
          target: "Let's take a break, shall we?",
          goal: "Let us takes shall we.",
        },
      ],
    },
  ],

  "punctuation-apostrophe-colon-extra": [
    {
      type: "fill-in-blank",
      instruction: "Điền dấu câu hoặc dạng đúng.",
      instructionEn: "Complete each sentence with the correct form.",
      wordBank: ["its", "it's", "students'", "student's"],
      sentences: [
        {
          text: "The company published ___ annual report in March.",
          textEn: "The company published ___ annual report in March.",
          answer: "its",
          hint: "Possessive, no apostrophe.",
        },
        {
          text: "___ too early to judge the results.",
          textEn: "___ too early to judge the results.",
          answer: "It's",
          hint: "Short form of it is.",
        },
        {
          text: "All the ___ projects were displayed in the hall.",
          textEn: "All the ___ projects were displayed in the hall.",
          answer: "students'",
          hint: "Plural possession.",
        },
      ],
    },
  ],

  "parallel-structure-extra": [
    {
      type: "sentence-reorder",
      instruction: "Sắp xếp câu có cấu trúc song song.",
      instructionEn: "Put the words in order.",
      items: [
        {
          scrambled: ["The", "course", "teaches", "reading", "writing", "and", "speaking"],
          correct: "The course teaches reading writing and speaking",
        },
        {
          scrambled: ["She", "is", "not", "only", "punctual", "but", "also", "reliable"],
          correct: "She is not only punctual but also reliable",
        },
      ],
    },
  ],
};
