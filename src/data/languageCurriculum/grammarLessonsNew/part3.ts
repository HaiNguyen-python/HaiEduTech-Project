import type { LanguageLesson } from "../types";

/** Batch 3: Subjunctive, Phrasal Verbs, Word Order, Confusing Pairs, Preposition Patterns, Sentence Patterns. */
export const newGrammarLessonsPart3: Record<string, LanguageLesson[]> = {
  "grammar-subjunctive": [
    {
      id: "subjunctive-wish-would-rather",
      title: "Giả định với wish, if only và would rather",
      titleEn: "Subjunctive with wish, if only and would rather",
      level: 4,
      difficulty: "advanced",
      theory: `## Giả định với wish, if only, would rather

### 1. Quy tắc
Sau wish và if only, dùng thì lùi một bậc để diễn tả điều trái thực tế.

### 2. Công thức
| Ý nghĩa | Mẫu câu |
| --- | --- |
| Tiếc ở hiện tại | I wish I **had** more free time. |
| Tiếc ở quá khứ | I wish I **had studied** harder. |
| Mong người khác đổi | I wish he **would** listen. |
| Muốn khác đi | I would rather you **came** tomorrow. |

### 3. Khi nào dùng
- Nói về hối tiếc trong IELTS Speaking Part 2.
- Diễn đạt mong muốn lịch sự với would rather.
- Viết đoạn phản ánh trong bài luận cá nhân.

### 4. Câu mẫu
- *I wish the flat were closer to campus.* (Tôi mong căn hộ gần trường hơn.)
- *If only we had booked earlier.* (Nếu chúng tôi đặt sớm hơn thì tốt.)

### 5. Lỗi thường gặp
- Sai: *I wish I have a car.* Đúng: *I wish I had a car.*
- Sai: *I would rather you come yesterday.* Đúng: *I would rather you had come yesterday.*

### 6. So sánh nhanh
Wish + quá khứ đơn = hiện tại trái thực tế; wish + quá khứ hoàn thành = hối tiếc quá khứ.`,
      theoryEn: `## Subjunctive with wish, if only and would rather

### 1. Rule
After wish and if only, shift the tense back one step to show that the situation is contrary to fact.

### 2. Form
| Meaning | Model |
| --- | --- |
| Present regret | I wish I **had** more free time. |
| Past regret | I wish I **had studied** harder. |
| Wanting somebody to change | I wish he **would** listen. |
| Preference | I would rather you **came** tomorrow. |

### 3. When to use
- To talk about regrets in a speaking answer.
- To express a polite preference with would rather.
- To write a reflective paragraph in a personal essay.

### 4. Model sentences
- I wish the flat were closer to campus.
- If only we had booked earlier.
- She would rather we discussed the issue in private.

### 5. Common mistakes
- Wrong: I wish I have a car. Right: I wish I had a car. Why: present regret needs the past simple.
- Wrong: I would rather you come yesterday. Right: I would rather you had come yesterday. Why: a past preference needs the past perfect.

### 6. Contrast box
Wish plus past simple describes an unreal present, while wish plus past perfect describes a past regret.`,
      proTips: [
        "Với chủ ngữ số ít, were vẫn được ưu tiên trong văn trang trọng: I wish it were possible.",
        "Không dùng would sau wish khi nói về chính mình.",
        "Would rather + S + quá khứ đơn để nói về mong muốn hiện tại.",
      ],
      proTipsEn: [
        "With a singular subject, formal English still prefers were: I wish it were possible.",
        "Do not use would after wish when talking about yourself.",
        "Use would rather plus subject plus past simple for a present preference.",
      ],
      vocabulary: [
        { word: "regret", ipa: "/rɪˈɡret/", meaning: "sự hối tiếc", meaningEn: "a feeling of sadness about the past", example: "Wish clauses express regret.", exampleEn: "Wish clauses express regret.", partOfSpeech: "noun" },
        { word: "preference", ipa: "/ˈprefrəns/", meaning: "sự ưa thích hơn", meaningEn: "liking one thing more than another", example: "Would rather shows a preference.", exampleEn: "Would rather shows a preference.", partOfSpeech: "noun" },
        { word: "hypothetical", ipa: "/ˌhaɪpəˈθetɪkl/", meaning: "mang tính giả định", meaningEn: "imagined rather than real", example: "These sentences are hypothetical.", exampleEn: "These sentences are hypothetical.", partOfSpeech: "adjective" },
        { word: "reflective", ipa: "/rɪˈflektɪv/", meaning: "mang tính suy ngẫm", meaningEn: "thinking carefully about experience", example: "A reflective paragraph often uses wish.", exampleEn: "A reflective paragraph often uses wish.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền dạng động từ giả định đúng.",
          instructionEn: "Complete each sentence with the correct unreal form.",
          sentences: [
            { text: "I wish the winter ___ shorter here.", textEn: "I wish the winter ___ shorter here.", answer: "were" },
            { text: "If only I ___ saved money last year.", textEn: "If only I ___ saved money last year.", answer: "had" },
            { text: "I would rather you ___ me before deciding.", textEn: "I would rather you ___ me before deciding.", answer: "asked" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi trong câu giả định.",
          instructionEn: "Correct the unreal form in each sentence.",
          items: [
            { wrong: "I wish I can speak three languages.", correct: "I wish I could speak three languages.", explanation: "Wish takes a past modal for an unreal present." },
            { wrong: "If only he listens to my advice last week.", correct: "If only he had listened to my advice last week.", explanation: "Past regret needs the past perfect." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng cấu trúc gợi ý.",
          instructionEn: "Rewrite each sentence with the cue structure.",
          items: [
            { prompt: "I am sorry that my room is so small.", target: "I wish my room were bigger.", cue: "I wish" },
            { prompt: "I prefer that you send the file today.", target: "I would rather you sent the file today.", cue: "would rather" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối câu với ý nghĩa giả định.",
          instructionEn: "Match each sentence with its meaning.",
          pairs: [
            { left: "I wish I had a bike.", right: "an unreal present situation" },
            { left: "I wish I had bought a bike.", right: "a regret about the past" },
            { left: "I wish she would reply.", right: "wanting somebody else to change" },
          ],
        },
      ],
      quiz: [
        { question: "I wish I ___ more time for reading.", options: ["have", "had", "will have", "am having"], answer: 1, explanation: "Unreal present uses the past simple." },
        { question: "If only we ___ the earlier train.", options: ["catch", "caught", "had caught", "have caught"], answer: 2, explanation: "Past regret uses the past perfect." },
        { question: "I wish my brother ___ tidy his room.", options: ["will", "would", "wills", "is going to"], answer: 1, explanation: "Would expresses a wish about another person's behaviour." },
        { question: "I would rather you ___ so loudly.", options: ["do not talk", "did not talk", "will not talk", "have not talked"], answer: 1, explanation: "Would rather plus subject takes the past simple." },
        { question: "Which sentence is correct?", options: ["I wish it were sunny today.", "I wish it is sunny today.", "I wish it will be sunny today.", "I wish it be sunny today."], answer: 0, explanation: "Were is the standard unreal form." },
        { question: "She wishes she ___ the offer last month.", options: ["accepted", "had accepted", "accepts", "would accept"], answer: 1, explanation: "The regret refers to the past." },
        { question: "I wish I ___ swim when I was younger.", options: ["can", "could", "will", "may"], answer: 1, explanation: "Could is the past form of can." },
        { question: "Would rather plus a past perfect refers to ___.", options: ["a future plan", "a past preference", "a present habit", "a general truth"], answer: 1, explanation: "The past perfect marks the past preference." },
        { question: "If only the bus ___ more often on Sundays.", options: ["runs", "ran", "will run", "has run"], answer: 1, explanation: "Unreal present uses the past simple." },
        { question: "I wish they ___ us about the change earlier.", options: ["tell", "told", "had told", "would tell yesterday"], answer: 2, explanation: "Earlier points to a past regret." },
      ],
    },
  ],
  "grammar-phrasal-verbs": [
    {
      id: "phrasal-verbs-separable-objects",
      title: "Cụm động từ tách được và vị trí tân ngữ",
      titleEn: "Separable phrasal verbs and object position",
      level: 3,
      difficulty: "intermediate",
      theory: `## Cụm động từ tách được

### 1. Quy tắc
Với cụm động từ tách được, tân ngữ là danh từ có thể đứng trước hoặc sau tiểu từ, nhưng **đại từ luôn đứng giữa**.

### 2. Công thức
| Trường hợp | Ví dụ |
| --- | --- |
| Danh từ sau tiểu từ | Please **turn off the light**. |
| Danh từ trước tiểu từ | Please **turn the light off**. |
| Đại từ ở giữa | Please **turn it off**. |
| Cụm không tách được | We **ran into an old friend**. |

### 3. Khi nào dùng
- Nói tự nhiên trong hội thoại hằng ngày.
- Viết email thân thiện, không quá trang trọng.
- Diễn tả hành động quen thuộc gọn gàng hơn.

### 4. Câu mẫu
- *Could you fill in this form, please?* (Bạn điền vào mẫu này nhé?)
- *I looked the word up in the dictionary.* (Tôi tra từ đó trong từ điển.)

### 5. Lỗi thường gặp
- Sai: *Turn off it.* Đúng: *Turn it off.*
- Sai: *I ran an old friend into.* Đúng: *I ran into an old friend.*

### 6. So sánh nhanh
Cụm tách được cho phép hai vị trí với danh từ; cụm không tách được luôn giữ nguyên trật tự.`,
      theoryEn: `## Separable phrasal verbs

### 1. Rule
With separable phrasal verbs, a noun object can come before or after the particle, but a **pronoun always goes in the middle**.

### 2. Form
| Case | Example |
| --- | --- |
| Noun after the particle | Please **turn off the light**. |
| Noun before the particle | Please **turn the light off**. |
| Pronoun in the middle | Please **turn it off**. |
| Inseparable verb | We **ran into an old friend**. |

### 3. When to use
- To sound natural in everyday conversation.
- To write friendly, less formal email.
- To describe familiar actions more compactly.

### 4. Model sentences
- Could you fill in this form, please?
- I looked the word up in the dictionary.
- The teacher handed the papers out at the start.

### 5. Common mistakes
- Wrong: Turn off it. Right: Turn it off. Why: a pronoun sits between verb and particle.
- Wrong: I ran an old friend into. Right: I ran into an old friend. Why: run into is inseparable.

### 6. Contrast box
Separable verbs allow two positions with a noun, while inseparable verbs keep a fixed order.`,
      proTips: [
        "Nếu tân ngữ là it, them, him, her thì luôn đặt ở giữa.",
        "Nếu tân ngữ dài, đặt sau tiểu từ để câu dễ đọc.",
        "Học cụm không tách được riêng: look after, run into, get over.",
      ],
      proTipsEn: [
        "If the object is it, them, him or her, always place it in the middle.",
        "If the object is long, place it after the particle for readability.",
        "Learn inseparable verbs separately: look after, run into, get over.",
      ],
      vocabulary: [
        { word: "particle", ipa: "/ˈpɑːtɪkl/", meaning: "tiểu từ", meaningEn: "the small word in a phrasal verb", example: "Off is the particle in turn off.", exampleEn: "Off is the particle in turn off.", partOfSpeech: "noun" },
        { word: "separable", ipa: "/ˈsepərəbl/", meaning: "có thể tách", meaningEn: "able to be split", example: "Turn off is separable.", exampleEn: "Turn off is separable.", partOfSpeech: "adjective" },
        { word: "hand out", ipa: "/hænd aʊt/", meaning: "phát ra, phân phát", meaningEn: "to give something to each person", example: "The teacher handed out the tests.", exampleEn: "The teacher handed out the tests.", partOfSpeech: "phrasal verb" },
        { word: "look after", ipa: "/lʊk ˈɑːftə/", meaning: "chăm sóc", meaningEn: "to take care of somebody", example: "She looks after her grandmother.", exampleEn: "She looks after her grandmother.", partOfSpeech: "phrasal verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền đại từ hoặc tiểu từ đúng vị trí.",
          instructionEn: "Complete each sentence with the correct word.",
          sentences: [
            { text: "The heater is still on. Please switch ___ off.", textEn: "The heater is still on. Please switch ___ off.", answer: "it" },
            { text: "I could not find the word, so I looked it ___.", textEn: "I could not find the word, so I looked it ___.", answer: "up" },
            { text: "My aunt looks ___ three young children.", textEn: "My aunt looks ___ three young children.", answer: "after" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa vị trí tân ngữ.",
          instructionEn: "Correct the object position in each sentence.",
          items: [
            { wrong: "Could you fill in it before Friday?", correct: "Could you fill it in before Friday?", explanation: "A pronoun goes between the verb and the particle." },
            { wrong: "She got her illness over quite quickly.", correct: "She got over her illness quite quickly.", explanation: "Get over is inseparable." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu thay danh từ bằng đại từ.",
          instructionEn: "Rewrite each sentence, replacing the noun with a pronoun.",
          items: [
            { prompt: "Please turn off the television.", target: "Please turn it off.", cue: "it" },
            { prompt: "The staff handed out the leaflets.", target: "The staff handed them out.", cue: "them" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối cụm động từ với nghĩa.",
          instructionEn: "Match each phrasal verb with its meaning.",
          pairs: [
            { left: "put off", right: "delay something to a later time" },
            { left: "look up", right: "find information in a reference source" },
            { left: "run into", right: "meet somebody unexpectedly" },
            { left: "look after", right: "take care of somebody" },
          ],
        },
      ],
      quiz: [
        { question: "The radio is loud. Please turn ___.", options: ["down it", "it down", "down of it", "it of down"], answer: 1, explanation: "A pronoun sits between verb and particle." },
        { question: "Which sentence is correct?", options: ["I looked up the number.", "I looked the up number.", "I up looked the number.", "I looked up it."], answer: 0, explanation: "A noun object may follow the particle." },
        { question: "We ran ___ our old neighbour at the market.", options: ["into", "in", "over of", "into with"], answer: 0, explanation: "Run into means meet by chance." },
        { question: "She put the meeting ___ until Monday.", options: ["off", "of", "away of", "up to"], answer: 0, explanation: "Put off means postpone." },
        { question: "Which phrasal verb is inseparable?", options: ["turn off", "fill in", "look after", "hand out"], answer: 2, explanation: "Look after keeps a fixed order." },
        { question: "Please fill ___ before you leave.", options: ["in it", "it in", "in of it", "it of in"], answer: 1, explanation: "Pronouns go in the middle." },
        { question: "The teacher handed ___ at the start of class.", options: ["the worksheets out", "out them", "them the out", "out of them"], answer: 0, explanation: "A noun object can follow or precede the particle." },
        { question: "He got over ___ within a week.", options: ["the flu", "it over", "over it", "the flu over"], answer: 0, explanation: "Get over is inseparable, so the object follows." },
        { question: "Where must a pronoun object go in a separable phrasal verb?", options: ["after the particle", "between verb and particle", "before the verb", "at the end of the clause"], answer: 1, explanation: "This is a fixed rule." },
        { question: "Long objects usually go ___ the particle.", options: ["before", "after", "instead of", "inside"], answer: 1, explanation: "Placing them after keeps the sentence readable." },
      ],
    },
  ],
  "grammar-word-order": [
    {
      id: "word-order-adverb-placement",
      title: "Vị trí trạng từ trong câu",
      titleEn: "Adverb placement in a sentence",
      level: 3,
      difficulty: "intermediate",
      theory: `## Vị trí trạng từ

### 1. Quy tắc
Trạng từ tần suất đứng trước động từ chính nhưng sau động từ to be; trạng từ chỉ cách thức, nơi chốn, thời gian theo thứ tự **cách thức - nơi chốn - thời gian**.

### 2. Công thức
| Loại | Vị trí | Ví dụ |
| --- | --- | --- |
| Tần suất | trước động từ chính | She **often** works late. |
| Tần suất với be | sau be | He **is always** punctual. |
| Cách thức | sau tân ngữ | She read the letter **carefully**. |
| Trật tự đầy đủ | manner, place, time | They played **well at the stadium yesterday**. |

### 3. Khi nào dùng
- Miêu tả thói quen chính xác.
- Viết câu tường thuật rõ ràng, tránh mơ hồ.
- Nhấn mạnh thời gian bằng cách đưa lên đầu câu.

### 4. Câu mẫu
- *We usually study in the library after dinner.* (Chúng tôi thường học ở thư viện sau bữa tối.)
- *Yesterday the team trained hard.* (Hôm qua cả đội tập luyện rất nặng.)

### 5. Lỗi thường gặp
- Sai: *She works often late.* Đúng: *She often works late.*
- Sai: *I like very much this song.* Đúng: *I like this song very much.*

### 6. So sánh nhanh
Trạng từ tần suất đứng giữa câu; trạng từ thời gian thường đứng cuối hoặc đầu câu.`,
      theoryEn: `## Adverb placement

### 1. Rule
Frequency adverbs go before the main verb but after the verb be, and adverbs of manner, place and time follow the order **manner, place, time**.

### 2. Form
| Type | Position | Example |
| --- | --- | --- |
| Frequency | before the main verb | She **often** works late. |
| Frequency with be | after be | He **is always** punctual. |
| Manner | after the object | She read the letter **carefully**. |
| Full order | manner, place, time | They played **well at the stadium yesterday**. |

### 3. When to use
- To describe habits precisely.
- To write clear narrative sentences.
- To emphasise time by fronting the time adverb.

### 4. Model sentences
- We usually study in the library after dinner.
- Yesterday the team trained hard.
- He speaks English fluently at work every day.

### 5. Common mistakes
- Wrong: She works often late. Right: She often works late. Why: frequency adverbs precede the main verb.
- Wrong: I like very much this song. Right: I like this song very much. Why: the object comes before the degree phrase.

### 6. Contrast box
Frequency adverbs sit mid-sentence, while time adverbs usually sit at the end or the very beginning.`,
      proTips: [
        "Không chen trạng từ giữa động từ và tân ngữ.",
        "Với trợ động từ, trạng từ tần suất đứng sau trợ động từ: has never seen.",
        "Đưa trạng từ thời gian lên đầu câu để nhấn mạnh, nhớ dùng dấu phẩy khi cần.",
      ],
      proTipsEn: [
        "Never place an adverb between a verb and its object.",
        "With an auxiliary, the frequency adverb follows it: has never seen.",
        "Front the time adverb for emphasis and add a comma when the phrase is long.",
      ],
      vocabulary: [
        { word: "frequency", ipa: "/ˈfriːkwənsi/", meaning: "tần suất", meaningEn: "how often something happens", example: "Often shows frequency.", exampleEn: "Often shows frequency.", partOfSpeech: "noun" },
        { word: "manner", ipa: "/ˈmænə/", meaning: "cách thức", meaningEn: "the way an action is done", example: "Carefully is an adverb of manner.", exampleEn: "Carefully is an adverb of manner.", partOfSpeech: "noun" },
        { word: "punctual", ipa: "/ˈpʌŋktʃuəl/", meaning: "đúng giờ", meaningEn: "arriving at the right time", example: "He is always punctual.", exampleEn: "He is always punctual.", partOfSpeech: "adjective" },
        { word: "fluently", ipa: "/ˈfluːəntli/", meaning: "một cách lưu loát", meaningEn: "smoothly and easily", example: "She speaks Finnish fluently.", exampleEn: "She speaks Finnish fluently.", partOfSpeech: "adverb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Đặt trạng từ vào đúng vị trí bằng cách điền từ còn thiếu.",
          instructionEn: "Complete each sentence with the missing word in the right position.",
          sentences: [
            { text: "My father ___ drinks coffee after nine at night.", textEn: "My father ___ drinks coffee after nine at night.", answer: "rarely" },
            { text: "The nurse is ___ kind to new patients.", textEn: "The nurse is ___ kind to new patients.", answer: "always" },
            { text: "They finished the project ___ last Friday.", textEn: "They finished the project ___ last Friday.", answer: "quickly" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa vị trí trạng từ.",
          instructionEn: "Correct the adverb position in each sentence.",
          items: [
            { wrong: "He speaks fluently English at work.", correct: "He speaks English fluently at work.", explanation: "An adverb of manner follows the object." },
            { wrong: "We go usually to the market on Sunday.", correct: "We usually go to the market on Sunday.", explanation: "Frequency adverbs precede the main verb." },
          ],
        },
        {
          type: "sentence-reorder",
          instruction: "Sắp xếp các từ thành câu đúng.",
          instructionEn: "Put the words in the correct order.",
          sentences: [
            { words: ["She", "often", "studies", "in", "the", "library"], correct: "She often studies in the library" },
            { words: ["They", "played", "well", "at", "the", "stadium", "yesterday"], correct: "They played well at the stadium yesterday" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối loại trạng từ với vị trí thường gặp.",
          instructionEn: "Match each adverb type with its usual position.",
          pairs: [
            { left: "always, never", right: "before the main verb or after be" },
            { left: "carefully, slowly", right: "after the verb or object" },
            { left: "yesterday, last week", right: "at the end or the start of the sentence" },
          ],
        },
      ],
      quiz: [
        { question: "She ___ arrives before eight.", options: ["always", "arrives always", "always is", "is always arrive"], answer: 0, explanation: "Frequency adverbs precede the main verb." },
        { question: "He is ___ late for practice.", options: ["never", "never be", "be never", "not never"], answer: 0, explanation: "The adverb follows the verb be." },
        { question: "Which sentence is correct?", options: ["I like this book very much.", "I like very much this book.", "I very much like it this book.", "I like much very this book."], answer: 0, explanation: "The object comes before the degree phrase." },
        { question: "They worked ___ in the workshop all morning.", options: ["hard", "hardly", "harder much", "hard much"], answer: 0, explanation: "Hard is the adverb of manner here." },
        { question: "Choose the correct order.", options: ["She sang beautifully at the hall last night.", "She sang at the hall beautifully last night.", "She sang last night beautifully at the hall.", "She sang at the hall last night beautifully."], answer: 0, explanation: "Manner, place, then time." },
        { question: "We have ___ visited that museum.", options: ["never", "never have", "not never", "visited never"], answer: 0, explanation: "The adverb follows the auxiliary." },
        { question: "___ the students received their results.", options: ["Yesterday", "Yesterday very", "Very yesterday", "The yesterday"], answer: 0, explanation: "A time adverb can be fronted." },
        { question: "He reads the news ___ every morning.", options: ["carefully", "careful", "care", "carefuly"], answer: 0, explanation: "An adverb of manner is needed." },
        { question: "An adverb should not sit between ___.", options: ["subject and verb", "verb and object", "adverb and adjective", "two clauses"], answer: 1, explanation: "That position breaks standard word order." },
        { question: "She is ___ willing to help new members.", options: ["usually", "usual", "usually is", "is usual"], answer: 0, explanation: "After be, the frequency adverb comes next." },
      ],
    },
  ],
  "grammar-confusing-pairs": [
    {
      id: "confusing-pairs-say-tell-speak-talk",
      title: "Phân biệt say, tell, speak và talk",
      titleEn: "Say, tell, speak and talk",
      level: 2,
      difficulty: "intermediate",
      theory: `## Phân biệt say, tell, speak, talk

### 1. Quy tắc
Say tập trung vào nội dung; tell cần người nhận; speak nhấn vào hành động nói và ngôn ngữ; talk nhấn vào cuộc trò chuyện.

### 2. Công thức
| Động từ | Mẫu | Ví dụ |
| --- | --- | --- |
| say | say something (to sb) | She **said** that she was tired. |
| tell | tell sb something | She **told** me the news. |
| speak | speak to sb, speak a language | He **speaks** Finnish well. |
| talk | talk to sb about sth | We **talked** about the plan. |

### 3. Khi nào dùng
- Tường thuật lời nói trong bài viết.
- Nói về khả năng ngôn ngữ.
- Miêu tả cuộc thảo luận thân mật.

### 4. Câu mẫu
- *He told the class a short story.* (Anh ấy kể cho lớp một câu chuyện ngắn.)
- *May I speak to the manager, please?* (Tôi nói chuyện với quản lý được không?)

### 5. Lỗi thường gặp
- Sai: *She said me the answer.* Đúng: *She told me the answer.*
- Sai: *He talks English fluently.* Đúng: *He speaks English fluently.*

### 6. So sánh nhanh
Tell + người nghe ngay sau động từ; say không có người nghe trực tiếp.`,
      theoryEn: `## Say, tell, speak and talk

### 1. Rule
Say focuses on the words, tell needs a listener, speak focuses on the act of speaking or a language, and talk focuses on the conversation.

### 2. Form
| Verb | Pattern | Example |
| --- | --- | --- |
| say | say something (to somebody) | She **said** that she was tired. |
| tell | tell somebody something | She **told** me the news. |
| speak | speak to somebody, speak a language | He **speaks** Finnish well. |
| talk | talk to somebody about something | We **talked** about the plan. |

### 3. When to use
- To report speech in writing.
- To describe language ability.
- To describe an informal discussion.

### 4. Model sentences
- He told the class a short story.
- May I speak to the manager, please?
- They talked about the budget for an hour.

### 5. Common mistakes
- Wrong: She said me the answer. Right: She told me the answer. Why: say does not take a direct listener.
- Wrong: He talks English fluently. Right: He speaks English fluently. Why: languages go with speak.

### 6. Contrast box
Tell is followed directly by the listener, while say is not.`,
      proTips: [
        "Nhớ mẫu tell sb sth và say sth to sb.",
        "Dùng speak cho ngôn ngữ và tình huống trang trọng qua điện thoại.",
        "Talk about dùng cho chủ đề trò chuyện.",
      ],
      proTipsEn: [
        "Remember the patterns tell somebody something and say something to somebody.",
        "Use speak for languages and formal telephone situations.",
        "Use talk about for the topic of a conversation.",
      ],
      vocabulary: [
        { word: "report", ipa: "/rɪˈpɔːt/", meaning: "tường thuật", meaningEn: "to give an account of what was said", example: "We report speech with say and tell.", exampleEn: "We report speech with say and tell.", partOfSpeech: "verb" },
        { word: "listener", ipa: "/ˈlɪsənə/", meaning: "người nghe", meaningEn: "the person who receives the message", example: "Tell needs a listener.", exampleEn: "Tell needs a listener.", partOfSpeech: "noun" },
        { word: "conversation", ipa: "/ˌkɒnvəˈseɪʃn/", meaning: "cuộc trò chuyện", meaningEn: "an informal talk", example: "We had a long conversation.", exampleEn: "We had a long conversation.", partOfSpeech: "noun" },
        { word: "fluent", ipa: "/ˈfluːənt/", meaning: "lưu loát", meaningEn: "able to speak smoothly", example: "She is fluent in two languages.", exampleEn: "She is fluent in two languages.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền say, tell, speak hoặc talk ở dạng đúng.",
          instructionEn: "Complete each sentence with say, tell, speak or talk in the correct form.",
          sentences: [
            { text: "My grandmother ___ me a folk story every evening.", textEn: "My grandmother ___ me a folk story every evening.", answer: "told" },
            { text: "Could I ___ to the receptionist, please?", textEn: "Could I ___ to the receptionist, please?", answer: "speak" },
            { text: "We ___ about the timetable for twenty minutes.", textEn: "We ___ about the timetable for twenty minutes.", answer: "talked" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi dùng động từ.",
          instructionEn: "Correct the verb in each sentence.",
          items: [
            { wrong: "The guide said us the museum rules.", correct: "The guide told us the museum rules.", explanation: "Tell takes the listener directly." },
            { wrong: "He talks three languages at work.", correct: "He speaks three languages at work.", explanation: "Languages go with speak." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng động từ gợi ý.",
          instructionEn: "Rewrite each sentence with the cue verb.",
          items: [
            { prompt: "She said the news to me.", target: "She told me the news.", cue: "tell" },
            { prompt: "He told me that the shop was closed.", target: "He said that the shop was closed.", cue: "say" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối động từ với mẫu câu đúng.",
          instructionEn: "Match each verb with its pattern.",
          pairs: [
            { left: "say", right: "say something to somebody" },
            { left: "tell", right: "tell somebody something" },
            { left: "speak", right: "speak a language or speak to somebody" },
            { left: "talk", right: "talk to somebody about a topic" },
          ],
        },
      ],
      quiz: [
        { question: "She ___ me that the class had moved.", options: ["said", "told", "spoke", "talked"], answer: 1, explanation: "Tell takes an object listener." },
        { question: "He ___ that the shop closed early.", options: ["told", "said", "spoke", "talked"], answer: 1, explanation: "Say introduces the words without a listener." },
        { question: "May I ___ to Mr Nguyen, please?", options: ["say", "tell", "speak", "talk about"], answer: 2, explanation: "Speak to is standard on the phone." },
        { question: "They ___ about their holiday plans.", options: ["said", "told", "spoke a", "talked"], answer: 3, explanation: "Talk about introduces a topic." },
        { question: "Which sentence is correct?", options: ["She said me the truth.", "She told me the truth.", "She spoke me the truth.", "She talked me the truth."], answer: 1, explanation: "Only tell takes a direct listener." },
        { question: "He ___ Japanese and Korean.", options: ["says", "tells", "speaks", "talks"], answer: 2, explanation: "Languages go with speak." },
        { question: "The teacher ___ us to review chapter four.", options: ["said", "told", "spoke", "talked"], answer: 1, explanation: "Tell somebody to do something is standard." },
        { question: "Please ___ hello to your parents.", options: ["say", "tell", "speak", "talk"], answer: 0, explanation: "Say hello is a fixed expression." },
        { question: "We need to ___ about the schedule.", options: ["say", "tell", "talk", "speak a"], answer: 2, explanation: "Talk about a topic." },
        { question: "Tell is always followed by ___.", options: ["a preposition", "a listener", "a language", "an adjective"], answer: 1, explanation: "That is the core pattern of tell." },
      ],
    },
  ],
  "grammar-prepositions-patterns": [
    {
      id: "prepositions-adjective-noun-patterns",
      title: "Giới từ theo sau tính từ và danh từ",
      titleEn: "Prepositions after adjectives and nouns",
      level: 3,
      difficulty: "intermediate",
      theory: `## Giới từ theo sau tính từ và danh từ

### 1. Quy tắc
Nhiều tính từ và danh từ luôn đi kèm một giới từ cố định; cần học theo cụm.

### 2. Công thức
| Cụm | Ví dụ |
| --- | --- |
| aware of | She is aware **of** the risk. |
| responsible for | He is responsible **for** the budget. |
| similar to | This case is similar **to** the last one. |
| reason for | The reason **for** the delay was fog. |
| increase in | There was an increase **in** demand. |
| solution to | We found a solution **to** the problem. |

### 3. Khi nào dùng
- Viết Writing Task 1 khi mô tả tăng giảm.
- Trình bày nguyên nhân và giải pháp trong bài luận.
- Viết email công việc chính xác hơn.

### 4. Câu mẫu
- *There was a sharp increase in fuel prices.* (Giá nhiên liệu tăng mạnh.)
- *She is responsible for training new staff.* (Cô ấy phụ trách đào tạo nhân viên mới.)

### 5. Lỗi thường gặp
- Sai: *an increase of demand* trong ngữ cảnh mô tả xu hướng. Đúng: *an increase in demand.*
- Sai: *the reason of the delay.* Đúng: *the reason for the delay.*

### 6. So sánh nhanh
Increase in + đối tượng tăng; increase of + con số cụ thể.`,
      theoryEn: `## Prepositions after adjectives and nouns

### 1. Rule
Many adjectives and nouns take a fixed preposition, so learn them as whole phrases.

### 2. Form
| Phrase | Example |
| --- | --- |
| aware of | She is aware **of** the risk. |
| responsible for | He is responsible **for** the budget. |
| similar to | This case is similar **to** the last one. |
| reason for | The reason **for** the delay was fog. |
| increase in | There was an increase **in** demand. |
| solution to | We found a solution **to** the problem. |

### 3. When to use
- To describe rises and falls in a data report.
- To present causes and solutions in an essay.
- To write more accurate business email.

### 4. Model sentences
- There was a sharp increase in fuel prices.
- She is responsible for training new staff.
- The solution to overcrowding is better planning.

### 5. Common mistakes
- Wrong: an increase of demand when describing a trend. Right: an increase in demand. Why: in names the area that grows.
- Wrong: the reason of the delay. Right: the reason for the delay. Why: reason takes for.

### 6. Contrast box
Increase in names what grows, while increase of names the exact amount.`,
      proTips: [
        "Ghi cụm đầy đủ vào sổ: an increase in, a decrease in, a solution to.",
        "Nói về con số thì dùng of: an increase of 12 per cent.",
        "Similar to và different from là cặp cần nhớ cùng nhau.",
      ],
      proTipsEn: [
        "Note the whole phrase: an increase in, a decrease in, a solution to.",
        "Use of before an exact figure: an increase of 12 per cent.",
        "Learn similar to and different from as a pair.",
      ],
      vocabulary: [
        { word: "aware", ipa: "/əˈweə/", meaning: "nhận thức được", meaningEn: "knowing about something", example: "She is aware of the deadline.", exampleEn: "She is aware of the deadline.", partOfSpeech: "adjective" },
        { word: "responsible", ipa: "/rɪˈspɒnsəbl/", meaning: "chịu trách nhiệm", meaningEn: "in charge of something", example: "He is responsible for safety checks.", exampleEn: "He is responsible for safety checks.", partOfSpeech: "adjective" },
        { word: "demand", ipa: "/dɪˈmɑːnd/", meaning: "nhu cầu", meaningEn: "the desire of customers for a product", example: "There was an increase in demand.", exampleEn: "There was an increase in demand.", partOfSpeech: "noun" },
        { word: "overcrowding", ipa: "/ˌəʊvəˈkraʊdɪŋ/", meaning: "tình trạng quá đông", meaningEn: "too many people in one place", example: "The solution to overcrowding is planning.", exampleEn: "The solution to overcrowding is planning.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền giới từ đúng.",
          instructionEn: "Complete each phrase with the correct preposition.",
          sentences: [
            { text: "The chart shows an increase ___ tourist numbers.", textEn: "The chart shows an increase ___ tourist numbers.", answer: "in" },
            { text: "Every driver is responsible ___ checking the tyres.", textEn: "Every driver is responsible ___ checking the tyres.", answer: "for" },
            { text: "This design is similar ___ the earlier model.", textEn: "This design is similar ___ the earlier model.", answer: "to" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa giới từ sai.",
          instructionEn: "Correct the preposition in each sentence.",
          items: [
            { wrong: "The reason of the cancellation was heavy snow.", correct: "The reason for the cancellation was heavy snow.", explanation: "Reason takes for." },
            { wrong: "Engineers found a solution for the noise problem.", correct: "Engineers found a solution to the noise problem.", explanation: "Solution takes to." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng cụm giới từ gợi ý.",
          instructionEn: "Rewrite each sentence using the cue phrase.",
          items: [
            { prompt: "Fuel prices rose sharply last year.", target: "There was a sharp increase in fuel prices last year.", cue: "an increase in" },
            { prompt: "She knows about the new regulations.", target: "She is aware of the new regulations.", cue: "aware of" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối từ với giới từ cố định.",
          instructionEn: "Match each word with its fixed preposition.",
          pairs: [
            { left: "aware", right: "of" },
            { left: "responsible", right: "for" },
            { left: "solution", right: "to" },
            { left: "different", right: "from" },
          ],
        },
      ],
      quiz: [
        { question: "There was a steady decrease ___ rainfall.", options: ["of", "in", "for", "to"], answer: 1, explanation: "In names the area that changes." },
        { question: "He is responsible ___ the weekly report.", options: ["of", "to", "for", "on"], answer: 2, explanation: "Responsible takes for." },
        { question: "The reason ___ the delay was a technical fault.", options: ["of", "for", "to", "in"], answer: 1, explanation: "Reason takes for." },
        { question: "This method is different ___ the previous one.", options: ["from", "of", "to be", "for"], answer: 0, explanation: "Different from is standard." },
        { question: "Researchers proposed a solution ___ the shortage.", options: ["for", "to", "of", "with"], answer: 1, explanation: "Solution takes to." },
        { question: "Sales rose by an increase ___ 15 per cent.", options: ["in", "of", "for", "to"], answer: 1, explanation: "Use of before an exact figure." },
        { question: "Are you aware ___ the new rules?", options: ["of", "for", "about", "to"], answer: 0, explanation: "Aware takes of." },
        { question: "Her results are similar ___ mine.", options: ["with", "to", "of", "as"], answer: 1, explanation: "Similar takes to." },
        { question: "Which phrase is correct in a trend description?", options: ["a rise in unemployment", "a rise of unemployment", "a rise for unemployment", "a rise to unemployment"], answer: 0, explanation: "In names what rises." },
        { question: "Fixed preposition phrases are best learned ___.", options: ["as whole phrases", "as single words", "by translation only", "by guessing"], answer: 0, explanation: "The preposition belongs to the phrase." },
      ],
    },
  ],
  "grammar-sentence-patterns": [
    {
      id: "sentence-patterns-there-it-structures",
      title: "Cấu trúc there và it làm chủ ngữ",
      titleEn: "There and it as sentence subjects",
      level: 3,
      difficulty: "intermediate",
      theory: `## Cấu trúc there và it

### 1. Quy tắc
There + be giới thiệu sự tồn tại; it làm chủ ngữ giả cho mệnh đề hoặc động từ nguyên mẫu, và cho thời tiết, thời gian, khoảng cách.

### 2. Công thức
| Cấu trúc | Ví dụ |
| --- | --- |
| There is / are | **There are** three options. |
| There + modal + be | **There may be** a delay. |
| It is + adj + to V | **It is important to** check the data. |
| It is + adj + that | **It is clear that** demand has grown. |
| It cho thời tiết | **It was** freezing yesterday. |

### 3. Khi nào dùng
- Mở đầu đoạn miêu tả trong Writing Task 1.
- Nêu nhận định khách quan trong bài luận.
- Nói về thời gian, khoảng cách và thời tiết.

### 4. Câu mẫu
- *There has been a sharp rise in online shopping.* (Đã có mức tăng mạnh trong mua sắm trực tuyến.)
- *It takes twenty minutes to walk there.* (Đi bộ tới đó mất hai mươi phút.)

### 5. Lỗi thường gặp
- Sai: *There have a problem.* Đúng: *There is a problem.*
- Sai: *Is important to arrive early.* Đúng: *It is important to arrive early.*

### 6. So sánh nhanh
There nêu sự tồn tại; it nêu nhận định hoặc giữ chỗ cho mệnh đề.`,
      theoryEn: `## There and it structures

### 1. Rule
There plus be introduces existence, while it works as a dummy subject for a clause or infinitive and for weather, time and distance.

### 2. Form
| Structure | Example |
| --- | --- |
| There is / are | **There are** three options. |
| There plus modal plus be | **There may be** a delay. |
| It is plus adjective plus to V | **It is important to** check the data. |
| It is plus adjective plus that | **It is clear that** demand has grown. |
| It for weather | **It was** freezing yesterday. |

### 3. When to use
- To open a description in a data report.
- To state an objective judgement in an essay.
- To talk about time, distance and weather.

### 4. Model sentences
- There has been a sharp rise in online shopping.
- It takes twenty minutes to walk there.
- It is unlikely that the policy will change soon.

### 5. Common mistakes
- Wrong: There have a problem. Right: There is a problem. Why: there combines with be, not have.
- Wrong: Is important to arrive early. Right: It is important to arrive early. Why: English needs the dummy subject it.

### 6. Contrast box
There announces existence, while it introduces a judgement or holds the place of a clause.`,
      proTips: [
        "Động từ sau there hòa hợp với danh từ theo sau: There is one book. There are two books.",
        "Không bỏ it ở đầu câu nhận định.",
        "Dùng There has been cho xu hướng đã diễn ra đến hiện tại.",
      ],
      proTipsEn: [
        "The verb after there agrees with the noun that follows: There is one book. There are two books.",
        "Never drop it at the start of a judgement sentence.",
        "Use There has been for a trend continuing to the present.",
      ],
      vocabulary: [
        { word: "existence", ipa: "/ɪɡˈzɪstəns/", meaning: "sự tồn tại", meaningEn: "the fact of being present", example: "There introduces existence.", exampleEn: "There introduces existence.", partOfSpeech: "noun" },
        { word: "dummy subject", ipa: "/ˈdʌmi ˈsʌbdʒɪkt/", meaning: "chủ ngữ giả", meaningEn: "a subject with no real meaning", example: "It is a dummy subject here.", exampleEn: "It is a dummy subject here.", partOfSpeech: "noun" },
        { word: "judgement", ipa: "/ˈdʒʌdʒmənt/", meaning: "nhận định", meaningEn: "an opinion formed after thinking", example: "It is clear that expresses a judgement.", exampleEn: "It is clear that expresses a judgement.", partOfSpeech: "noun" },
        { word: "unlikely", ipa: "/ʌnˈlaɪkli/", meaning: "khó xảy ra", meaningEn: "not probable", example: "It is unlikely that prices will fall.", exampleEn: "It is unlikely that prices will fall.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền there hoặc it.",
          instructionEn: "Complete each sentence with there or it.",
          sentences: [
            { text: "___ are four routes to the city centre.", textEn: "___ are four routes to the city centre.", answer: "There" },
            { text: "___ is essential to keep a backup file.", textEn: "___ is essential to keep a backup file.", answer: "It" },
            { text: "___ has been a slight fall in membership.", textEn: "___ has been a slight fall in membership.", answer: "There" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi cấu trúc.",
          instructionEn: "Correct the structure in each sentence.",
          items: [
            { wrong: "There have many reasons for this trend.", correct: "There are many reasons for this trend.", explanation: "There combines with be." },
            { wrong: "Is clear that the plan needs funding.", correct: "It is clear that the plan needs funding.", explanation: "English requires the dummy subject it." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng cấu trúc gợi ý.",
          instructionEn: "Rewrite each sentence with the cue structure.",
          items: [
            { prompt: "Online shopping rose sharply last year.", target: "There was a sharp rise in online shopping last year.", cue: "There was" },
            { prompt: "Checking the data carefully is important.", target: "It is important to check the data carefully.", cue: "It is" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối cấu trúc với chức năng.",
          instructionEn: "Match each structure with its function.",
          pairs: [
            { left: "There are", right: "introducing existence of several things" },
            { left: "It is likely that", right: "giving a judgement about probability" },
            { left: "It takes", right: "talking about time needed" },
            { left: "There may be", right: "mentioning a possible situation" },
          ],
        },
      ],
      quiz: [
        { question: "___ are several ways to solve this issue.", options: ["It", "There", "They", "That"], answer: 1, explanation: "There introduces existence." },
        { question: "___ is difficult to find parking here.", options: ["There", "It", "That", "This"], answer: 1, explanation: "It is the dummy subject before an infinitive." },
        { question: "___ has been a steady rise in rents.", options: ["It", "There", "That", "They"], answer: 1, explanation: "There has been suits a trend." },
        { question: "___ takes an hour to reach the airport.", options: ["There", "It", "That", "This"], answer: 1, explanation: "It is used for time needed." },
        { question: "Which sentence is correct?", options: ["There is two options left.", "There are two options left.", "There have two options left.", "It are two options left."], answer: 1, explanation: "The verb agrees with the plural noun." },
        { question: "___ was raining heavily all afternoon.", options: ["There", "It", "That", "This"], answer: 1, explanation: "Weather takes it." },
        { question: "___ may be a delay because of the storm.", options: ["It", "There", "That", "They"], answer: 1, explanation: "There plus modal plus be states a possible situation." },
        { question: "___ is unlikely that the fee will drop.", options: ["There", "It", "That", "This"], answer: 1, explanation: "It introduces a judgement clause." },
        { question: "Choose the correct report opening.", options: ["There was a sharp fall in sales.", "It was a sharp fall in sales figures existence.", "There has a sharp fall in sales.", "It there was a sharp fall."], answer: 0, explanation: "There plus be reports existence of a change." },
        { question: "The word it in It is clear that ... acts as ___.", options: ["a real subject", "a dummy subject", "an object", "an adverb"], answer: 1, explanation: "It holds the subject position for the clause." },
      ],
    },
  ],
};
