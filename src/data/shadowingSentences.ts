/**
 * Shadowing Practice Sentence Library
 * Each sentence targets one Band 7.0-9.0 grammar structure + advanced lexis.
 */
export interface ShadowingVocab {
  word: string;
  definition: string;
  synonyms?: string[];
  example?: string;
}

export interface ShadowingSentence {
  id: string;
  sentence: string;
  /** Substring that contains the target grammar — used to highlight */
  grammarSpan: string;
  grammarPoint: string;
  grammarExplanation: string;
  /** Words that should be visually stressed (bold). */
  stressWords: string[];
  /** Words that should rise (↑) or fall (↓) in intonation. */
  intonation?: { word: string; direction: "up" | "down" }[];
  vocabulary: ShadowingVocab[];
  collocations: string[];
  vietnamese: string;
  level: "B2" | "C1" | "C2";
}

export const SHADOWING_SENTENCES: ShadowingSentence[] = [
  {
    id: "s1",
    sentence: "Had I known about the traffic jam, I would have left an hour earlier.",
    grammarSpan: "Had I known about the traffic jam, I would have left",
    grammarPoint: "Inverted Conditional Type 3",
    grammarExplanation:
      "We invert the auxiliary 'had' to the front instead of using 'If I had known...'. This makes the sentence more formal and academic.",
    stressWords: ["known", "traffic", "left", "hour", "earlier"],
    intonation: [
      { word: "jam", direction: "down" },
      { word: "earlier", direction: "down" },
    ],
    vocabulary: [
      { word: "traffic jam", definition: "a long line of vehicles that cannot move", synonyms: ["congestion", "gridlock"] },
    ],
    collocations: ["heavy traffic", "leave earlier", "an hour earlier"],
    vietnamese: "Giá mà tôi biết về việc tắc đường, tôi đã rời đi sớm hơn một tiếng.",
    level: "C1",
  },
  {
    id: "s2",
    sentence: "Not only does she speak three languages, but she also plays the violin beautifully.",
    grammarSpan: "Not only does she speak three languages, but she also plays",
    grammarPoint: "Negative Inversion (Not only ... but also)",
    grammarExplanation:
      "After 'Not only' at the start of a sentence, we invert subject and auxiliary: 'does she speak' instead of 'she speaks'.",
    stressWords: ["Not", "only", "three", "also", "violin", "beautifully"],
    intonation: [
      { word: "languages", direction: "up" },
      { word: "beautifully", direction: "down" },
    ],
    vocabulary: [
      { word: "beautifully", definition: "in a way that is pleasing to listen to", synonyms: ["elegantly", "gracefully"] },
    ],
    collocations: ["speak a language", "play the violin", "fluent in"],
    vietnamese: "Cô ấy không chỉ nói được ba thứ tiếng, mà còn chơi violin rất hay.",
    level: "C1",
  },
  {
    id: "s3",
    sentence: "What I really need is a quiet place where I can concentrate on my studies.",
    grammarSpan: "What I really need is a quiet place",
    grammarPoint: "Cleft Sentence (What ... is)",
    grammarExplanation:
      "Cleft sentences split information for emphasis. 'What I need is X' emphasises X more strongly than 'I need X'.",
    stressWords: ["What", "really", "need", "quiet", "concentrate", "studies"],
    intonation: [{ word: "studies", direction: "down" }],
    vocabulary: [
      { word: "concentrate", definition: "to focus all your attention on something", synonyms: ["focus", "zero in"] },
    ],
    collocations: ["concentrate on", "a quiet place", "deep focus"],
    vietnamese: "Điều tôi thực sự cần là một nơi yên tĩnh để có thể tập trung học tập.",
    level: "B2",
  },
  {
    id: "s4",
    sentence: "Despite the overwhelming evidence, the committee remained unconvinced of his innocence.",
    grammarSpan: "Despite the overwhelming evidence",
    grammarPoint: "Despite + Noun Phrase (Concession)",
    grammarExplanation:
      "'Despite' is followed directly by a noun or '-ing' form, not a full clause. Use it for academic contrast.",
    stressWords: ["Despite", "overwhelming", "evidence", "committee", "unconvinced", "innocence"],
    intonation: [{ word: "innocence", direction: "down" }],
    vocabulary: [
      { word: "overwhelming", definition: "very great in amount or effect", synonyms: ["compelling", "irrefutable"] },
      { word: "unconvinced", definition: "not believing or accepting that something is true" },
      { word: "innocence", definition: "the state of not being guilty of a crime" },
    ],
    collocations: ["overwhelming evidence", "remain unconvinced", "prove someone's innocence"],
    vietnamese: "Bất chấp bằng chứng áp đảo, hội đồng vẫn không tin vào sự vô tội của anh ta.",
    level: "C1",
  },
  {
    id: "s5",
    sentence: "Having finished her homework, Sarah decided to treat herself to a movie.",
    grammarSpan: "Having finished her homework",
    grammarPoint: "Perfect Participle Clause",
    grammarExplanation:
      "'Having + past participle' shows an action completed BEFORE the main action. It replaces 'After she had finished...'.",
    stressWords: ["Having", "finished", "homework", "decided", "treat", "movie"],
    intonation: [{ word: "movie", direction: "down" }],
    vocabulary: [
      { word: "treat oneself", definition: "to do something special and enjoyable for yourself", synonyms: ["reward yourself", "indulge"] },
    ],
    collocations: ["finish homework", "treat yourself to", "make a decision"],
    vietnamese: "Sau khi hoàn thành bài tập, Sarah quyết định tự thưởng cho mình bằng một bộ phim.",
    level: "B2",
  },
  {
    id: "s6",
    sentence: "If I were in your position, I would seriously consider taking that job offer.",
    grammarSpan: "If I were in your position, I would seriously consider",
    grammarPoint: "Second Conditional (Hypothetical Advice)",
    grammarExplanation:
      "Use 'If + past simple, would + base verb' for hypothetical situations. 'Were' (not 'was') is the formal subjunctive.",
    stressWords: ["If", "were", "position", "seriously", "consider", "job", "offer"],
    intonation: [
      { word: "position", direction: "up" },
      { word: "offer", direction: "down" },
    ],
    vocabulary: [
      { word: "seriously consider", definition: "to think carefully about doing something" },
      { word: "job offer", definition: "an invitation to accept a job" },
    ],
    collocations: ["in your position", "seriously consider", "accept a job offer"],
    vietnamese: "Nếu tôi ở vị trí của bạn, tôi sẽ nghiêm túc cân nhắc nhận lời mời làm việc đó.",
    level: "B2",
  },
  {
    id: "s7",
    sentence: "The proposal, which had been thoroughly debated for weeks, was finally approved unanimously.",
    grammarSpan: "which had been thoroughly debated for weeks",
    grammarPoint: "Non-defining Relative Clause + Past Perfect Passive",
    grammarExplanation:
      "The commas mark a non-defining clause that adds extra information. 'Had been + past participle' = past perfect passive.",
    stressWords: ["proposal", "thoroughly", "debated", "weeks", "approved", "unanimously"],
    intonation: [{ word: "unanimously", direction: "down" }],
    vocabulary: [
      { word: "thoroughly", definition: "in a complete and careful way", synonyms: ["comprehensively", "exhaustively"] },
      { word: "unanimously", definition: "with the agreement of every person" },
    ],
    collocations: ["debate a proposal", "approve unanimously", "thoroughly discuss"],
    vietnamese: "Đề xuất, vốn đã được tranh luận kỹ lưỡng trong nhiều tuần, cuối cùng được thông qua nhất trí.",
    level: "C1",
  },
  {
    id: "s8",
    sentence: "Such was the intensity of the storm that even seasoned sailors were terrified.",
    grammarSpan: "Such was the intensity of the storm that",
    grammarPoint: "Inversion with 'Such ... that'",
    grammarExplanation:
      "'Such + be + noun + that' is a formal inversion showing extreme degree. Equivalent to 'The storm was so intense that...'.",
    stressWords: ["Such", "intensity", "storm", "seasoned", "sailors", "terrified"],
    intonation: [{ word: "terrified", direction: "down" }],
    vocabulary: [
      { word: "intensity", definition: "the strength of something", synonyms: ["severity", "ferocity"] },
      { word: "seasoned", definition: "having a lot of experience", synonyms: ["experienced", "veteran"] },
    ],
    collocations: ["seasoned sailor", "the intensity of", "absolutely terrified"],
    vietnamese: "Cơn bão dữ dội đến mức ngay cả những thủy thủ dày dạn cũng phải khiếp sợ.",
    level: "C2",
  },
  {
    id: "s9",
    sentence: "By the time we arrived at the airport, our flight had already taken off.",
    grammarSpan: "By the time we arrived at the airport, our flight had already taken off",
    grammarPoint: "Past Perfect with 'By the time'",
    grammarExplanation:
      "Use past perfect ('had + past participle') for an action completed BEFORE another past action.",
    stressWords: ["By", "time", "arrived", "airport", "flight", "already", "taken", "off"],
    intonation: [{ word: "off", direction: "down" }],
    vocabulary: [
      { word: "take off", definition: "(of an aircraft) to leave the ground and begin to fly" },
    ],
    collocations: ["by the time", "take off", "miss a flight"],
    vietnamese: "Khi chúng tôi đến sân bay, chuyến bay đã cất cánh rồi.",
    level: "B2",
  },
  {
    id: "s10",
    sentence: "It is widely believed that regular exercise significantly enhances cognitive performance.",
    grammarSpan: "It is widely believed that",
    grammarPoint: "Impersonal Passive (It is ... that)",
    grammarExplanation:
      "Common academic structure. 'It is believed/said/argued that...' lets you state ideas objectively without naming a source.",
    stressWords: ["widely", "believed", "regular", "exercise", "significantly", "enhances", "cognitive", "performance"],
    intonation: [{ word: "performance", direction: "down" }],
    vocabulary: [
      { word: "significantly", definition: "in a way that is large enough to be important", synonyms: ["substantially", "considerably"] },
      { word: "enhance", definition: "to improve the quality, amount, or strength of something", synonyms: ["boost", "improve"] },
      { word: "cognitive", definition: "connected with mental processes of understanding" },
    ],
    collocations: ["widely believed", "enhance performance", "cognitive ability"],
    vietnamese: "Người ta tin rằng việc tập thể dục thường xuyên giúp nâng cao đáng kể hiệu suất nhận thức.",
    level: "C1",
  },
  {
    id: "s11",
    sentence: "Were the government to invest more in education, we would see dramatic improvements in literacy rates.",
    grammarSpan: "Were the government to invest more in education",
    grammarPoint: "Inverted Conditional Type 2 (Were to)",
    grammarExplanation:
      "A very formal alternative to 'If the government invested...'. 'Were + subject + to + verb' = hypothetical future.",
    stressWords: ["Were", "government", "invest", "education", "dramatic", "improvements", "literacy"],
    intonation: [{ word: "rates", direction: "down" }],
    vocabulary: [
      { word: "literacy", definition: "the ability to read and write" },
      { word: "dramatic", definition: "sudden and noticeable", synonyms: ["striking", "marked"] },
    ],
    collocations: ["invest in education", "dramatic improvement", "literacy rate"],
    vietnamese: "Nếu chính phủ đầu tư nhiều hơn vào giáo dục, chúng ta sẽ thấy sự cải thiện đáng kể về tỷ lệ biết chữ.",
    level: "C2",
  },
  {
    id: "s12",
    sentence: "The book, written by a renowned historian, offers fresh insights into ancient civilizations.",
    grammarSpan: "written by a renowned historian",
    grammarPoint: "Reduced Relative Clause (Past Participle)",
    grammarExplanation:
      "Shortens 'which was written by...' to just 'written by...'. Makes sentences more concise and academic.",
    stressWords: ["book", "written", "renowned", "historian", "fresh", "insights", "ancient", "civilizations"],
    intonation: [{ word: "civilizations", direction: "down" }],
    vocabulary: [
      { word: "renowned", definition: "famous and respected", synonyms: ["celebrated", "distinguished"] },
      { word: "insight", definition: "a clear understanding of something complex", synonyms: ["perspective", "understanding"] },
    ],
    collocations: ["renowned historian", "offer insights", "ancient civilization"],
    vietnamese: "Cuốn sách, được viết bởi một sử gia nổi tiếng, mang đến những góc nhìn mới về các nền văn minh cổ đại.",
    level: "C1",
  },
  {
    id: "s13",
    sentence: "Rarely have I encountered a problem as challenging as this one.",
    grammarSpan: "Rarely have I encountered",
    grammarPoint: "Negative Adverb Inversion (Rarely / Seldom / Never)",
    grammarExplanation:
      "After negative adverbs at the start, invert auxiliary and subject. 'Rarely have I' instead of 'I have rarely'.",
    stressWords: ["Rarely", "encountered", "problem", "challenging"],
    intonation: [{ word: "one", direction: "down" }],
    vocabulary: [
      { word: "encounter", definition: "to experience or meet something, especially unpleasant", synonyms: ["come across", "face"] },
      { word: "challenging", definition: "difficult in an interesting way", synonyms: ["demanding", "tough"] },
    ],
    collocations: ["encounter a problem", "challenging task", "as ... as"],
    vietnamese: "Hiếm khi tôi gặp phải một bài toán khó nhằn như thế này.",
    level: "C1",
  },
  {
    id: "s14",
    sentence: "Should you require any further assistance, please do not hesitate to contact us.",
    grammarSpan: "Should you require any further assistance",
    grammarPoint: "Inverted Conditional Type 1 (Should)",
    grammarExplanation:
      "Formal alternative to 'If you require...'. Common in business and customer-service English.",
    stressWords: ["Should", "require", "further", "assistance", "hesitate", "contact"],
    intonation: [{ word: "us", direction: "down" }],
    vocabulary: [
      { word: "require", definition: "to need something", synonyms: ["need", "necessitate"] },
      { word: "hesitate", definition: "to pause before doing or saying something", synonyms: ["pause", "waver"] },
    ],
    collocations: ["further assistance", "do not hesitate to", "contact us"],
    vietnamese: "Nếu quý vị cần thêm bất kỳ sự hỗ trợ nào, xin đừng ngần ngại liên hệ với chúng tôi.",
    level: "C1",
  },
  {
    id: "s15",
    sentence: "The more you practise speaking, the more confident you will become.",
    grammarSpan: "The more you practise speaking, the more confident you will become",
    grammarPoint: "Double Comparative (The more ... the more)",
    grammarExplanation:
      "Shows that two things change together. 'The + comparative ..., the + comparative ...'.",
    stressWords: ["more", "practise", "speaking", "more", "confident", "become"],
    intonation: [{ word: "become", direction: "down" }],
    vocabulary: [
      { word: "confident", definition: "feeling sure about your own ability", synonyms: ["self-assured", "assured"] },
    ],
    collocations: ["practise speaking", "gain confidence", "the more ... the more"],
    vietnamese: "Bạn càng luyện nói nhiều, bạn sẽ càng tự tin hơn.",
    level: "B2",
  },
];

export const getShadowingByLevel = (level?: "B2" | "C1" | "C2") =>
  level ? SHADOWING_SENTENCES.filter((s) => s.level === level) : SHADOWING_SENTENCES;
