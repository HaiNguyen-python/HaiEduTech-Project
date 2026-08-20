/**
 * @file speakingTemplateDrills.ts
 * @description Speaking drill content for the IELTS Speaking Template Lab.
 *   For every question type + framework step we store a second complete model
 *   sentence (a variation of the Band 7.5 model), the grammar/structure the
 *   step is training, and the exact chunk to highlight so students can see the
 *   pattern they must reuse.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface StepDrill {
  /** Second complete model sentence for the same step. */
  alt: string;
  /** Grammar / structure focus of the step (bilingual). */
  focusVi: string;
  focusEn: string;
  /** Chunks to bold inside the model sentences. */
  highlight: string[];
}

/** Key format: `${typeId}:${stepId}` */
export const SPEAKING_STEP_DRILLS: Record<string, StepDrill> = {
  /* ------------------------------ PART 1 ------------------------------ */
  "p1-like:point": {
    alt: "Yes, I'm really keen on it - it's probably my favourite way to unwind after work.",
    focusVi: "Trả lời yes/no + 'I'd say / I'm really keen on' để nêu quan điểm ngay câu đầu.",
    focusEn: "Clear yes/no + 'I'd say / I'm really keen on' to state the opinion immediately.",
    highlight: ["Yes, definitely", "I'd say", "I'm really keen on"],
  },
  "p1-like:reason": {
    alt: "It's mainly because it gives me something creative to do that has nothing to do with a screen.",
    focusVi: "Liên từ chỉ nguyên nhân: 'It's mainly because ...' + hiện tại đơn diễn tả thói quen.",
    focusEn: "Cause linker 'It's mainly because ...' with the present simple for habits.",
    highlight: ["It's mainly because"],
  },
  "p1-like:example": {
    alt: "For instance, only yesterday I tried a new noodle recipe I'd seen on YouTube.",
    focusVi: "'For instance' + quá khứ đơn với mốc thời gian cụ thể (last weekend, yesterday).",
    focusEn: "'For instance' + past simple with a concrete time marker (last weekend, yesterday).",
    highlight: ["For instance", "just last weekend", "only yesterday"],
  },
  "p1-like:twist": {
    alt: "So overall, it's become a real hobby, even though I'm still learning the basics.",
    focusVi: "Câu chốt với 'So overall' + 'even though' (mệnh đề nhượng bộ).",
    focusEn: "Closing line with 'So overall' + a concession clause with 'even though'.",
    highlight: ["So overall", "even though"],
  },

  "p1-frequency:point": {
    alt: "Probably twice a week at most, so less often than I really should.",
    focusVi: "Tần suất cụ thể (twice a week, once every couple of months) thay vì 'sometimes'.",
    focusEn: "A precise frequency (twice a week, once every couple of months) instead of 'sometimes'.",
    highlight: ["Not as often as I'd like", "once every couple of months", "twice a week at most"],
  },
  "p1-frequency:reason": {
    alt: "That's largely down to the fact that my working hours are quite unpredictable.",
    focusVi: "'That's largely down to the fact that + mệnh đề' - cấu trúc nguyên nhân band 7.0+.",
    focusEn: "'That's largely down to the fact that + clause' - a Band 7.0+ cause structure.",
    highlight: ["That's largely down to the fact that"],
  },
  "p1-frequency:example": {
    alt: "Take last month, for example - I managed it only once, and that was on a public holiday.",
    focusVi: "'Take ..., for example' + quá khứ đơn để minh hoạ tần suất vừa nêu.",
    focusEn: "'Take ..., for example' + past simple to illustrate the frequency you gave.",
    highlight: ["Take last month, for example"],
  },
  "p1-frequency:twist": {
    alt: "That said, I used to go far more regularly, so it's really a question of time these days.",
    focusVi: "Đối lập 'That said' + 'used to' vs 'these days' để cho thấy thay đổi.",
    focusEn: "Contrast with 'That said' + 'used to' vs 'these days' to show the change.",
    highlight: ["That said", "used to", "these days"],
  },

  "p1-past-now:point": {
    alt: "Yes, considerably more - as a child I used to spend whole afternoons reading.",
    focusVi: "'used to + V' để nói thói quen trong quá khứ đã không còn.",
    focusEn: "'used to + verb' for a past habit that has stopped.",
    highlight: ["used to"],
  },
  "p1-past-now:reason": {
    alt: "The main reason is that I had far more free time, whereas these days my evenings are taken up by work.",
    focusVi: "'whereas these days ...' - đối lập quá khứ và hiện tại trong cùng một câu.",
    focusEn: "'whereas these days ...' - contrasting past and present inside one sentence.",
    highlight: ["The main reason is that", "whereas these days"],
  },
  "p1-past-now:example": {
    alt: "A good example would be the school holidays, when I'd read three or four books in a fortnight.",
    focusVi: "'would + V' cho hành động lặp lại trong quá khứ + mệnh đề quan hệ với 'when'.",
    focusEn: "'would + verb' for repeated past actions, plus a relative clause with 'when'.",
    highlight: ["A good example would be", "I'd read", "when"],
  },
  "p1-past-now:twist": {
    alt: "Compared with most of my friends, though, I still read a fair amount - just on a phone now.",
    focusVi: "'Compared with ...' + 'though' để so sánh nhẹ và chốt câu tự nhiên.",
    focusEn: "'Compared with ...' + 'though' for a light comparison and a natural close.",
    highlight: ["Compared with", "though"],
  },

  "p1-would:point": {
    alt: "I'd love to, yes - Japanese is the one I keep coming back to.",
    focusVi: "'I'd love to / I'd really like to' - thể điều kiện lịch sự cho câu Would you...?",
    focusEn: "'I'd love to / I'd really like to' - the polite conditional for Would you...? questions.",
    highlight: ["I'd love to", "I'd really like to"],
  },
  "p1-would:reason": {
    alt: "The main reason is that I'm hoping to work abroad, and the language would open a lot of doors.",
    focusVi: "'be hoping to + V' cho dự định + 'would' cho kết quả giả định.",
    focusEn: "'be hoping to + verb' for plans + 'would' for the hypothetical result.",
    highlight: ["The main reason is that", "would"],
  },
  "p1-would:example": {
    alt: "For instance, I've already signed up for a beginners' course starting next month.",
    focusVi: "Hiện tại hoàn thành 'I've already ...' để chứng minh việc đã bắt đầu.",
    focusEn: "Present perfect 'I've already ...' to prove you have already started.",
    highlight: ["For instance", "I've already"],
  },
  "p1-would:twist": {
    alt: "So overall, it's less of a vague wish and more of a plan I'm already working on.",
    focusVi: "Cấu trúc 'less of a ... and more of a ...' để chốt câu ấn tượng.",
    focusEn: "The 'less of a ... and more of a ...' pattern for a strong closing line.",
    highlight: ["So overall", "less of a", "more of a"],
  },

  /* ------------------------------ PART 2 ------------------------------ */
  "p2-person:intro": {
    alt: "I'd like to talk about my aunt, who has probably influenced my choices more than anyone else in my family.",
    focusVi: "'I'd like to talk about ...' + mệnh đề quan hệ 'who ...' để giới thiệu người.",
    focusEn: "'I'd like to talk about ...' + a relative clause with 'who ...' to introduce the person.",
    highlight: ["I'd like to talk about", "who"],
  },
  "p2-person:details": {
    alt: "To give you some background, she's in her late forties, she runs a small pharmacy in Hue, and I've known her all my life.",
    focusVi: "'To give you some background' + chuỗi mệnh đề hiện tại đơn (she's..., she runs..., I've known...) để liệt kê thông tin nền.",
    focusEn: "'To give you some background' + a chain of present-simple clauses (she's..., she runs..., I've known...) to list background facts.",

    highlight: ["To give you some background", "in her late forties"],
  },
  "p2-person:story": {
    alt: "What really stood out for me was the year I nearly dropped out. She rang me every single evening, and the turning point came when she offered to pay for extra classes herself. That taught me that support matters more than advice.",
    focusVi: "Câu chẻ 'What really stood out was ...' + 'The turning point came when ...' + quá khứ đơn kể chuyện.",
    focusEn: "Cleft sentence 'What really stood out was ...' + 'The turning point came when ...' with narrative past simple.",
    highlight: ["What really stood out for me was", "The turning point came when"],
  },
  "p2-person:wrap": {
    alt: "Looking back, I feel enormously grateful for her patience, and all in all she's the reason I chose this career.",
    focusVi: "'Looking back, I feel ...' + 'all in all' để chốt cảm xúc và tổng kết.",
    focusEn: "'Looking back, I feel ...' + 'all in all' to close with feeling and a summary.",
    highlight: ["Looking back, I feel", "all in all"],
  },

  "p2-place:intro": {
    alt: "I'd like to talk about a quiet rooftop garden in my neighbourhood, which is where I go whenever I need to switch off.",
    focusVi: "Mệnh đề quan hệ 'which is where ...' để giới thiệu địa điểm.",
    focusEn: "A relative clause 'which is where ...' to introduce a place.",
    highlight: ["I'd like to talk about", "which is where"],
  },
  "p2-place:details": {
    alt: "To give you some background, it's roughly a fifteen-minute walk from my flat, and I usually go there late in the afternoon when the heat has faded.",
    focusVi: "Giới từ chỉ vị trí và thời gian: 'about ten minutes from', 'on Sunday mornings', 'late in the afternoon'.",
    focusEn: "Prepositions of place and time: 'about ten minutes from', 'on Sunday mornings', 'late in the afternoon'.",
    highlight: ["To give you some background", "a fifteen-minute walk from", "late in the afternoon"],
  },
  "p2-place:story": {
    alt: "What really stood out for me was the first evening I went up there during a stressful week. I stayed for nearly two hours doing absolutely nothing, and since then it's become a weekly habit. It works because nothing up there demands anything from me.",
    focusVi: "'Since then it's become ...' (hiện tại hoàn thành) + 'It works because ...' để giải thích.",
    focusEn: "'Since then it's become ...' (present perfect) + 'It works because ...' to explain.",
    highlight: ["What really stood out for me was", "Since then it's become", "It works because"],
  },
  "p2-place:wrap": {
    alt: "All in all, it's the one place where I can genuinely slow down, and I'd happily take any visitor there.",
    focusVi: "'All in all' + 'the one place where ...' + 'I'd happily ...' chốt bài.",
    focusEn: "'All in all' + 'the one place where ...' + 'I'd happily ...' to finish.",
    highlight: ["All in all", "the one place where", "I'd happily"],
  },

  "p2-object:intro": {
    alt: "I'd like to talk about an old wooden watch my grandfather left me, which still sits on my desk.",
    focusVi: "Trật tự tính từ (old wooden) + mệnh đề quan hệ 'which ...' khi giới thiệu đồ vật.",
    focusEn: "Adjective order (old wooden) + a relative clause 'which ...' when introducing an object.",
    highlight: ["I'd like to talk about", "which"],
  },
  "p2-object:details": {
    alt: "To give you some background, I was given it about ten years ago, and although the strap is worn out, it still keeps perfect time.",
    focusVi: "Bị động 'I was given it' + 'although' để nêu nhược điểm nhưng vẫn quý.",
    focusEn: "Passive 'I was given it' + 'although' to admit a flaw while still valuing the object.",
    highlight: ["To give you some background", "I was given it", "although"],
  },
  "p2-object:story": {
    alt: "It mattered to me because it's the only thing of his I own. I wore it through every important exam, and the turning point came when I nearly lost it on a train and realised how much it meant.",
    focusVi: "'It mattered to me because ...' + 'The turning point came when ...' + quá khứ đơn.",
    focusEn: "'It mattered to me because ...' + 'The turning point came when ...' with past simple.",
    highlight: ["It mattered to me because", "The turning point came when"],
  },
  "p2-object:wrap": {
    alt: "Looking back, I feel very lucky to have it, and that's why, whenever someone asks about my most precious possession, this is the story I tell.",
    focusVi: "'That's why, whenever ..., this is the story I tell' - câu chốt có nhịp, rất ăn điểm.",
    focusEn: "'That's why, whenever ..., this is the story I tell' - a rhythmic, high-scoring closing line.",
    highlight: ["Looking back, I feel", "That's why, whenever", "this is the story I tell"],
  },

  "p2-event:intro": {
    alt: "I'd like to talk about a time two summers ago when I helped a classmate move house.",
    focusVi: "'a time ... when ...' + mốc thời gian quá khứ để mở bài dạng kể trải nghiệm.",
    focusEn: "'a time ... when ...' with a past time marker to open an experience task.",
    highlight: ["I'd like to talk about", "a time", "when"],
  },
  "p2-event:details": {
    alt: "To give you some background, he'd only just arrived in the city, he had no family nearby, and he had to be out of his old room within two days.",
    focusVi: "Quá khứ hoàn thành 'he'd only just arrived' để dựng bối cảnh trước sự việc chính.",
    focusEn: "Past perfect 'he'd only just arrived' to set the scene before the main event.",
    highlight: ["To give you some background", "he'd only just arrived", "had to"],
  },
  "p2-event:story": {
    alt: "He mentioned that he couldn't afford a van, so I offered to help. We spent an entire Saturday carrying boxes up four flights of stairs, and the turning point came when two neighbours joined in without being asked. He cooked for all of us that evening.",
    focusVi: "'so I offered to ...' + 'The turning point came when ...' + bị động 'without being asked'.",
    focusEn: "'so I offered to ...' + 'The turning point came when ...' + the passive 'without being asked'.",
    highlight: ["so I offered to", "The turning point came when", "without being asked"],
  },
  "p2-event:wrap": {
    alt: "Looking back, I feel genuinely proud of that day, and all in all it taught me how much small help can mean to someone.",
    focusVi: "'Looking back, I feel ...' + 'all in all it taught me ...' chốt bằng bài học.",
    focusEn: "'Looking back, I feel ...' + 'all in all it taught me ...' closing with a lesson.",
    highlight: ["Looking back, I feel", "all in all", "taught me"],
  },

  "p2-activity:intro": {
    alt: "I'd like to talk about swimming, which has become the one form of exercise I actually look forward to.",
    focusVi: "Danh động từ (swimming, running) làm chủ ngữ + 'has become' (hiện tại hoàn thành).",
    focusEn: "A gerund subject (swimming, running) + 'has become' in the present perfect.",
    highlight: ["I'd like to talk about", "which has become"],
  },
  "p2-activity:details": {
    alt: "I swim about three times a week, normally in the early evening, at a public pool ten minutes from my office. I took it up roughly two years ago after a knee injury.",
    focusVi: "Tần suất + 'I took it up ... ago' (phrasal verb bắt đầu một hoạt động).",
    focusEn: "Frequency + 'I took it up ... ago' (a phrasal verb for starting an activity).",
    highlight: ["about three times a week", "I took it up", "ago"],
  },
  "p2-activity:story": {
    alt: "What really stood out was how much it changed beyond my fitness. At first I could barely manage ten lengths, and the turning point came when I swam a kilometre without stopping. Since then it's become the hour when I stop thinking about work.",
    focusVi: "'At first ... and the turning point came when ...' + 'Since then it's become ...' để kể tiến bộ.",
    focusEn: "'At first ... and the turning point came when ...' + 'Since then it's become ...' to narrate progress.",
    highlight: ["What really stood out", "At first", "The turning point came when", "Since then it's become"],
  },
  "p2-activity:wrap": {
    alt: "All in all, it's the most reliable habit I've ever built, and I honestly can't imagine giving it up now.",
    focusVi: "So sánh nhất + hiện tại hoàn thành 'I've ever built' + 'can't imagine + V-ing'.",
    focusEn: "Superlative + present perfect 'I've ever built' + 'can't imagine + V-ing'.",
    highlight: ["All in all", "I've ever built", "can't imagine giving it up"],
  },

  /* ------------------------------ PART 3 ------------------------------ */
  "p3-opinion:answer": {
    alt: "I'd argue that they definitely should, and ideally as part of the compulsory curriculum.",
    focusVi: "'I'd argue that ...' + 'should' - nêu quan điểm rõ ràng ngay câu đầu.",
    focusEn: "'I'd argue that ...' + 'should' - a clear position in the very first sentence.",
    highlight: ["I'd argue that", "should"],
  },
  "p3-opinion:reason": {
    alt: "This is largely because young people now handle money digitally, so the knock-on effect of poor habits appears far earlier than it used to.",
    focusVi: "'This is largely because ...' + 'the knock-on effect of ...' - lập luận nhân quả.",
    focusEn: "'This is largely because ...' + 'the knock-on effect of ...' for cause-and-effect reasoning.",
    highlight: ["This is largely because", "the knock-on effect of"],
  },
  "p3-opinion:evidence": {
    alt: "In Vietnam, for example, many students only learn to budget once they are already paying rent.",
    focusVi: "'In ..., for example' + 'once + hiện tại đơn' cho mệnh đề thời gian.",
    focusEn: "'In ..., for example' + 'once + present simple' for a time clause.",
    highlight: ["In Vietnam, for example", "once"],
  },
  "p3-opinion:alternative": {
    alt: "That said, some people argue that parents should teach this at home, which I'd accept up to a point.",
    focusVi: "'That said, some people argue that ...' + 'which I'd accept up to a point' - nêu và nhượng bộ quan điểm trái chiều.",
    focusEn: "'That said, some people argue that ...' + 'which I'd accept up to a point' - concede the opposite view.",
    highlight: ["That said, some people argue that", "up to a point"],
  },
  "p3-opinion:conclusion": {
    alt: "So on balance, I'd still say a short practical module would be more useful than most subjects we already teach.",
    focusVi: "'So on balance, I'd still say ...' + so sánh hơn 'more useful than'.",
    focusEn: "'So on balance, I'd still say ...' + the comparative 'more useful than'.",
    highlight: ["So on balance", "more useful than"],
  },

  "p3-why:answer": {
    alt: "On the whole, I tend to think it's mostly a financial issue rather than a cultural one.",
    focusVi: "'I tend to think ...' + 'rather than' - trả lời có tính suy xét, không tuyệt đối.",
    focusEn: "'I tend to think ...' + 'rather than' - a hedged, considered answer.",
    highlight: ["On the whole", "I tend to think", "rather than"],
  },
  "p3-why:reason": {
    alt: "One key factor here is that raising a child in a city is simply more expensive, so couples postpone it, and the knock-on effect is a smaller family.",
    focusVi: "'One key factor here is that ...' + 'so' chỉ kết quả + 'the knock-on effect is ...'.",
    focusEn: "'One key factor here is that ...' + result 'so' + 'the knock-on effect is ...'.",
    highlight: ["One key factor here is that", "the knock-on effect is"],
  },
  "p3-why:evidence": {
    alt: "A clear illustration of this is Ho Chi Minh City, where rent alone can swallow a third of a young couple's income.",
    focusVi: "'A clear illustration of this is ...' + mệnh đề quan hệ 'where ...'.",
    focusEn: "'A clear illustration of this is ...' + a relative clause with 'where ...'.",
    highlight: ["A clear illustration of this is", "where"],
  },
  "p3-why:alternative": {
    alt: "Having said that, there's a counter-argument that career ambition plays an equally important role.",
    focusVi: "'Having said that, there's a counter-argument that ...' - mở phần phản biện học thuật.",
    focusEn: "'Having said that, there's a counter-argument that ...' to open an academic counterpoint.",
    highlight: ["Having said that", "there's a counter-argument that"],
  },
  "p3-why:conclusion": {
    alt: "Ultimately, it comes down to economics reshaping when people start families, not how much they value them.",
    focusVi: "'Ultimately, it comes down to ...' + đối lập 'not ...' để chốt gọn.",
    focusEn: "'Ultimately, it comes down to ...' with a contrasting 'not ...' to finish crisply.",
    highlight: ["Ultimately, it comes down to"],
  },

  "p3-compare:answer": {
    alt: "I'd argue the real difference lies in the medium rather than in the activity itself.",
    focusVi: "'The difference lies in ... rather than ...' - cấu trúc so sánh học thuật.",
    focusEn: "'The difference lies in ... rather than ...' - an academic comparison structure.",
    highlight: ["I'd argue", "lies in", "rather than"],
  },
  "p3-compare:reason": {
    alt: "This is largely because younger people grew up online, whereas older generations built their routines around physical places.",
    focusVi: "'whereas' để so sánh hai nhóm trong một câu phức.",
    focusEn: "'whereas' to compare two groups inside one complex sentence.",
    highlight: ["This is largely because", "whereas"],
  },
  "p3-compare:evidence": {
    alt: "Compared with a decade ago, my own family is a good illustration: my parents still meet neighbours daily, while my cousins socialise through group chats.",
    focusVi: "'Compared with ...' + 'while' để đặt hai ví dụ song song.",
    focusEn: "'Compared with ...' + 'while' to set two examples side by side.",
    highlight: ["Compared with", "while"],
  },
  "p3-compare:alternative": {
    alt: "Of course, it isn't quite that simple, since many retired people are now very active on social media.",
    focusVi: "'it isn't quite that simple, since ...' - làm mềm lập luận, thể hiện tư duy phản biện.",
    focusEn: "'it isn't quite that simple, since ...' - softening the claim to show critical thinking.",
    highlight: ["it isn't quite that simple", "since"],
  },
  "p3-compare:conclusion": {
    alt: "For those reasons, I'd describe it as a difference in medium rather than in what people actually want.",
    focusVi: "'For those reasons, I'd describe it as ...' - chốt bằng cách định nghĩa lại vấn đề.",
    focusEn: "'For those reasons, I'd describe it as ...' - closing by reframing the issue.",
    highlight: ["For those reasons", "I'd describe it as"],
  },

  "p3-future:answer": {
    alt: "It largely depends on the format, but I doubt printed books will vanish completely.",
    focusVi: "'It largely depends on ...' + 'will' cho dự đoán tương lai có phòng bị.",
    focusEn: "'It largely depends on ...' + 'will' for a hedged future prediction.",
    highlight: ["It largely depends on", "I doubt", "will"],
  },
  "p3-future:reason": {
    alt: "This is largely because print is increasingly treated as an object people want to own rather than just a way to read.",
    focusVi: "Bị động 'is treated as' + 'rather than just' để làm rõ sự thay đổi vai trò.",
    focusEn: "Passive 'is treated as' + 'rather than just' to show the shift in role.",
    highlight: ["This is largely because", "is increasingly treated as", "rather than just"],
  },
  "p3-future:evidence": {
    alt: "A clear illustration of this is the number of small bookshops that have opened in Hanoi despite cheap e-readers.",
    focusVi: "Hiện tại hoàn thành 'that have opened' + 'despite + danh từ'.",
    focusEn: "Present perfect 'that have opened' + 'despite + noun'.",
    highlight: ["A clear illustration of this is", "have opened", "despite"],
  },
  "p3-future:alternative": {
    alt: "Having said that, textbooks are likely to move online entirely, simply because they need updating every year.",
    focusVi: "'be likely to + V' cho dự đoán + 'simply because' cho lý do.",
    focusEn: "'be likely to + verb' for prediction + 'simply because' for the reason.",
    highlight: ["Having said that", "are likely to", "simply because"],
  },
  "p3-future:conclusion": {
    alt: "So on balance, I'd predict print becoming a smaller, premium market rather than disappearing.",
    focusVi: "'I'd predict + V-ing' + 'rather than + V-ing' để chốt dự đoán.",
    focusEn: "'I'd predict + V-ing' + 'rather than + V-ing' to close a prediction.",
    highlight: ["So on balance", "I'd predict", "rather than disappearing"],
  },

  "p3-pros-cons:answer": {
    alt: "On the whole, I'd say the advantages outweigh the disadvantages, although a lot depends on the individual.",
    focusVi: "'the advantages outweigh the disadvantages' + 'although' - câu trả lời cân bằng.",
    focusEn: "'the advantages outweigh the disadvantages' + 'although' for a balanced answer.",
    highlight: ["the advantages outweigh the disadvantages", "although"],
  },
  "p3-pros-cons:reason": {
    alt: "The clearest advantage is independence, since students have to manage money and deadlines alone, and the knock-on effect is that employers see them as more adaptable.",
    focusVi: "'The clearest advantage is ...' + 'since' + 'the knock-on effect is that ...'.",
    focusEn: "'The clearest advantage is ...' + 'since' + 'the knock-on effect is that ...'.",
    highlight: ["The clearest advantage is", "since", "the knock-on effect is that"],
  },
  "p3-pros-cons:evidence": {
    alt: "In Vietnam, for example, graduates who studied in Europe are often given international projects straight away.",
    focusVi: "Mệnh đề quan hệ 'who studied' + bị động 'are given'.",
    focusEn: "Relative clause 'who studied' + passive 'are given'.",
    highlight: ["In Vietnam, for example", "who studied", "are often given"],
  },
  "p3-pros-cons:alternative": {
    alt: "That said, some people argue that the cost and the loneliness are serious drawbacks, and I'd agree that homesickness affects many first-year students.",
    focusVi: "'That said, some people argue that ...' + 'I'd agree that ...' - vừa nêu vừa đánh giá.",
    focusEn: "'That said, some people argue that ...' + 'I'd agree that ...' - present and evaluate.",
    highlight: ["That said, some people argue that", "I'd agree that"],
  },
  "p3-pros-cons:conclusion": {
    alt: "For those reasons, I'm convinced it's worth it, provided students are ready for the emotional side too.",
    focusVi: "'provided (that) + mệnh đề' - điều kiện, rất ăn điểm ở Part 3.",
    focusEn: "'provided (that) + clause' - a conditional linker that scores well in Part 3.",
    highlight: ["For those reasons", "I'm convinced", "provided"],
  },
};

export const getStepDrill = (typeId: string, stepId: string): StepDrill | undefined =>
  SPEAKING_STEP_DRILLS[`${typeId}:${stepId}`];
