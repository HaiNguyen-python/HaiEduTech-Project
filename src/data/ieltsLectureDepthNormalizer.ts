/**
 * @file ieltsLectureDepthNormalizer.ts
 * @description Final quality pass over IELTS Writing & Speaking lectures.
 *   The topic enrichers (ieltsWritingLectureEnricher / ieltsSpeakingLectureEnricher)
 *   already replace generic factory theory with topic-specific Strategy Steps and
 *   Mistakes. This normalizer guarantees ACADEMIC COMPLETENESS for every lecture:
 *     - at least 4 strategy steps
 *     - at least 3 mistakes to avoid (with a "why it costs band score" reason)
 *     - at least 4 practical examples containing full model sentences
 *     - at least 8 vocabulary highlights with definition (EN + VI), example, band
 *     - at least 6 cheat-sheet points
 *   Content is drawn from hand-written sub-topic packs (detected from the lecture
 *   id) and topped up from part-level / task-level packs, so nothing generic or
 *   off-topic is ever injected.
 */
import type {
  IeltsLecture,
  StrategyStep,
  MistakeToAvoid,
  VocabHighlight,
} from "./ieltsLecturesData";

type Example = IeltsLecture["practicalExamples"][number];

const ex = (context: string, contextVi: string, example: string, explanation: string): Example => ({
  context,
  contextVi,
  example,
  explanation,
});

const vc = (word: string, definition: string, definitionVi: string, example: string, band = "7.0+"): VocabHighlight => ({
  word,
  definition,
  definitionVi,
  example,
  band,
});

const mist = (mistake: string, mistakeVi: string, why: string, whyVi: string): MistakeToAvoid => ({
  mistake,
  mistakeVi,
  why,
  whyVi,
});

const step = (n: number, title: string, titleVi: string, description: string, descriptionVi: string): StrategyStep => ({
  step: n,
  title,
  titleVi,
  description,
  descriptionVi,
});

interface Pack {
  examples: Example[];
  vocab: VocabHighlight[];
  mistakes: MistakeToAvoid[];
  cheats: string[];
  steps: StrategyStep[];
}

const emptyPack = (): Pack => ({ examples: [], vocab: [], mistakes: [], cheats: [], steps: [] });

// ===========================================================================
// SPEAKING - PART-LEVEL PACKS
// ===========================================================================

const SPK_P1: Pack = {
  examples: [
    ex(
      "Part 1 - the 3-layer answer (Direct → Detail → Reason)",
      "Part 1 - câu trả lời 3 lớp (Trả lời → Chi tiết → Lý do)",
      "Q: Do you enjoy reading?\nA: I do, yes - though probably not as much as I'd like to. (DIRECT) I tend to get through one novel a month, usually on the commute to work. (DETAIL) It's the only part of the day when nobody can reach me, so it feels like a small pocket of quiet. (REASON)",
      "Three moves in roughly 25 seconds: a hedged direct answer, one concrete habit with a number, and a personal reason. This is the standard shape examiners expect for Band 7 Fluency & Coherence.",
    ),
    ex(
      "Part 1 - upgrading a Band 5 answer to Band 7.5",
      "Part 1 - nâng câu trả lời Band 5 lên Band 7.5",
      "Band 5: 'Yes, I like my city because it is very beautiful and modern.'\nBand 7.5: 'Definitely - Da Nang has grown on me enormously. It's compact enough to cycle across in half an hour, yet it still has that laid-back coastal feel, which suits me far more than the pace of Hanoi.'",
      "The upgrade removes empty adjectives ('beautiful', 'modern') and replaces them with a measurable detail, a collocation ('laid-back coastal feel') and a comparison - all three lift Lexical Resource.",
    ),
    ex(
      "Part 1 - handling a question you have no opinion about",
      "Part 1 - xử lý câu hỏi bạn không có ý kiến",
      "Q: Do you like wild flowers?\nA: Honestly, it's not something I've ever thought much about - I'm not the outdoorsy type. That said, I did notice the lotus ponds outside Hanoi last summer and they were genuinely striking, so maybe I appreciate them more than I realise.",
      "Never say 'I don't know'. Admit it naturally, then pivot to one concrete memory. Honesty plus development protects both Fluency and Task Response.",
    ),
    ex(
      "Part 1 - tense control across a single answer",
      "Part 1 - kiểm soát thì trong cùng một câu trả lời",
      "'I've been living in this neighbourhood since 2019 (present perfect continuous), I usually walk to the market at weekends (present simple habit), and I'm actually thinking of moving closer to the centre next year (future plan).'",
      "Deliberately mixing three tense forms in one answer is the fastest way to evidence Grammatical Range without sounding rehearsed.",
    ),
  ],
  vocab: [
    vc("to be into (something)", "to be interested in / enjoy something", "hứng thú với, mê điều gì", "I've been really into film photography for the past couple of years."),
    vc("grow on me", "to become gradually more likeable", "dần dần thấy thích", "The city didn't impress me at first, but it has definitely grown on me."),
    vc("on the whole", "generally speaking", "nhìn chung", "On the whole, I'd say my weekdays are pretty predictable."),
    vc("a small pocket of quiet", "a short peaceful moment in a busy day", "khoảng lặng nhỏ trong ngày", "Reading before bed is a small pocket of quiet for me."),
    vc("laid-back", "relaxed and easy-going", "thư thái, thoải mái", "My hometown has a laid-back atmosphere that I really appreciate."),
    vc("that said", "used to add a contrasting point", "dù vậy", "I'm not a morning person. That said, I do enjoy an early run at weekends."),
    vc("tend to", "to usually do something", "thường hay", "I tend to cook at home rather than eat out during the week."),
    vc("not something I've given much thought to", "an honest way to admit unfamiliarity", "chưa nghĩ nhiều về điều đó", "Gardening isn't something I've given much thought to, to be honest."),
    vc("suits me down to the ground", "fits my preferences perfectly", "hợp với tôi hoàn toàn", "Remote work suits me down to the ground."),
    vc("more often than not", "usually", "phần lớn thời gian", "More often than not, I end up working late on Fridays."),
  ],
  mistakes: [
    mist("Giving one-sentence answers", "Trả lời chỉ một câu", "Under-extension caps Fluency & Coherence at Band 5 because the examiner has no language to assess.", "Trả lời quá ngắn giới hạn Fluency & Coherence ở Band 5 vì giám khảo không có ngữ liệu để chấm."),
    mist("Over-extending past 45 seconds in Part 1", "Nói quá 45 giây trong Part 1", "Part 1 rewards natural conversation; long monologues sound memorised and get interrupted.", "Part 1 cần hội thoại tự nhiên; nói dài nghe học thuộc và sẽ bị ngắt."),
    mist("Repeating the same adjectives ('good', 'nice', 'interesting')", "Lặp lại các tính từ 'good', 'nice', 'interesting'", "Lexical repetition is the clearest Band 5-6 marker in the Lexical Resource descriptor.", "Lặp từ vựng là dấu hiệu rõ nhất của Band 5-6 ở tiêu chí Lexical Resource."),
  ],
  cheats: [
    "Answer shape: Direct answer → 1 concrete detail → 1 personal reason (20-30 seconds)",
    "Hedge naturally: 'I suppose', 'I'd say', 'more or less', 'to be honest'",
    "Include one number, place name or date in every second answer",
    "Mix at least three tense forms across the Part 1 set",
    "Never say 'I don't know' - say 'That's not something I've thought about, but…'",
    "Stop talking when the idea is finished; do not pad with repetition",
  ],
  steps: [
    step(4, "Close each answer with a personal angle", "Kết mỗi câu bằng góc nhìn cá nhân", "One evaluative clause ('which is exactly why I stuck with it') signals Band 7 development.", "Một mệnh đề đánh giá ('đó chính là lý do tôi theo đuổi nó') báo hiệu phát triển ý Band 7."),
  ],
};

const SPK_P2: Pack = {
  examples: [
    ex(
      "Part 2 - the 60-second note plan (4 bullets, not sentences)",
      "Part 2 - dàn ý 1 phút (4 gạch đầu dòng, không viết câu)",
      "Cue card: Describe a skill you learned recently.\nNotes: (1) touch-typing, Feb 2024 (2) online course, 20 min/night (3) hard: unlearning old habits (4) now 70 wpm → less overtime.\nOpening line: 'The skill I'd like to talk about is touch-typing, which I picked up over about three months last spring.'",
      "Notes are keywords + numbers only. Writing full sentences wastes the minute and produces a read-aloud delivery that examiners penalise under Fluency.",
    ),
    ex(
      "Part 2 - a Band 8 opening and closing pair",
      "Part 2 - cặp mở-kết Band 8",
      "Opening: 'I'd like to tell you about my grandmother's house in Nam Dinh - a place I keep going back to in my head whenever life gets loud.'\nClosing: 'So although it's just an old brick house, it's probably the one place where I feel completely unhurried.'",
      "A vivid opening buys the examiner's attention; a reflective closing proves you controlled the two minutes rather than being cut off mid-sentence.",
    ),
    ex(
      "Part 2 - stretching thin content with the P-A-S-T frame",
      "Part 2 - kéo dài nội dung mỏng bằng khung P-A-S-T",
      "Place ('a narrow lane off Hang Bac') → Action ('we'd sit on plastic stools drinking iced tea') → Sensation ('the smell of grilled pork drifting over') → Thought ('it made me realise how much I miss unplanned evenings').",
      "When ideas run out, the frame gives four guaranteed content layers, which is enough to reach the full two minutes with genuine detail.",
    ),
    ex(
      "Part 2 - covering the final bullet properly",
      "Part 2 - trả lời trọn vẹn gạch đầu dòng cuối",
      "'…and explain why it was important to you.'\nModel: 'It mattered to me for two reasons really. On a practical level it saved me hours every week, but more importantly it proved to me that I could still pick up something new in my thirties.'",
      "The final bullet is the 'why' bullet and carries most of the Task Response weight. Answering it with two distinct reasons is the safest Band 7.5 move.",
    ),
  ],
  vocab: [
    vc("I'd like to tell you about…", "standard, natural cue-card opener", "tôi muốn kể về…", "I'd like to tell you about a trip that completely changed my plans."),
    vc("it dawned on me", "I suddenly realised", "tôi chợt nhận ra", "It dawned on me halfway through that I'd been doing it wrong for years."),
    vc("out of the blue", "unexpectedly", "bất ngờ", "The invitation came completely out of the blue."),
    vc("looking back on it now", "reflective discourse marker", "nhìn lại bây giờ", "Looking back on it now, it was the best decision I made that year."),
    vc("a turning point", "a moment of significant change", "bước ngoặt", "That conversation was a real turning point for me."),
    vc("vividly remember", "remember with clear detail", "nhớ như in", "I vividly remember the sound of rain on the tin roof."),
    vc("stick with me", "remain memorable", "đọng lại trong tôi", "That evening has stuck with me ever since."),
    vc("unhurried", "calm and without time pressure", "thong thả", "The village felt completely unhurried compared with the city."),
    vc("on a practical level", "signposting a concrete reason", "về mặt thực tế", "On a practical level, it saved me two hours a week."),
    vc("more importantly", "signposting the stronger reason", "quan trọng hơn là", "More importantly, it rebuilt my confidence."),
  ],
  mistakes: [
    mist("Writing full sentences during the one-minute preparation", "Viết cả câu trong 1 phút chuẩn bị", "You then read aloud, which flattens intonation and is penalised under Fluency & Pronunciation.", "Bạn sẽ đọc lại, khiến ngữ điệu phẳng và bị trừ ở Fluency & Pronunciation."),
    mist("Finishing after 50-60 seconds", "Kết thúc sau 50-60 giây", "Under-length long turns cannot reach Band 7 for Fluency & Coherence - you must fill the full two minutes.", "Nói quá ngắn không thể đạt Band 7 Fluency & Coherence - phải nói đủ 2 phút."),
    mist("Ignoring one of the cue-card bullets", "Bỏ qua một gạch đầu dòng của đề", "Each uncovered bullet directly reduces Task Response / topic coverage.", "Mỗi ý bỏ sót trực tiếp làm giảm Task Response."),
  ],
  cheats: [
    "Notes = 4 bullets of keywords + numbers, never full sentences",
    "Open with 'I'd like to tell you about…' + a vivid detail",
    "Follow the bullets in order - it is a built-in structure",
    "Spend 45-60 seconds on the final 'why' bullet",
    "Use past simple for the story, past continuous for background, present perfect for impact",
    "Prepare a 10-second reflective closing line so you never trail off",
  ],
  steps: [
    step(4, "Reserve the last 20 seconds for reflection", "Dành 20 giây cuối để suy ngẫm", "A closing evaluation ('what I took away from it was…') shows control of the long turn and lifts Coherence.", "Câu kết đánh giá ('điều tôi rút ra là…') thể hiện kiểm soát lượt nói dài và nâng Coherence."),
  ],
};

const SPK_P3: Pack = {
  examples: [
    ex(
      "Part 3 - the PEEL-style analytical answer",
      "Part 3 - câu trả lời phân tích kiểu PEEL",
      "Q: Why do people in cities tend to have fewer children?\nA: The dominant factor is almost certainly cost. (POINT) Housing and childcare in major cities absorb a disproportionate share of household income. (EXPLAIN) In Hanoi, for instance, a young couple can spend close to half their salary on rent alone. (EXAMPLE) So the decision is less about preference and more about arithmetic. (LINK)",
      "Part 3 is a mini-essay spoken aloud. Point-Explain-Example-Link gives you 40-50 seconds of coherent, analytical speech - exactly what the Band 7+ descriptors reward.",
    ),
    ex(
      "Part 3 - two-sided answers with concession",
      "Part 3 - trả lời hai chiều có nhượng bộ",
      "'On the face of it, remote work looks like a clear win for employees. That said, there is a hidden cost: younger staff lose the informal mentoring that happens in an office. On balance, I'd argue hybrid arrangements strike the healthiest compromise.'",
      "Concede → counter → conclude. The three-move pattern demonstrates critical thinking, which is the main separator between Band 6.5 and Band 7.5 in Part 3.",
    ),
    ex(
      "Part 3 - hedging with precision instead of vagueness",
      "Part 3 - rào chắn chính xác thay vì nói mơ hồ",
      "Weak: 'Maybe some people think it is bad.'\nStrong: 'It's arguably counter-productive, at least for households on lower incomes, though I'd be reluctant to generalise beyond that group.'",
      "Precise hedging ('arguably', 'at least for', 'reluctant to generalise') signals academic register while protecting you from indefensible claims.",
    ),
    ex(
      "Part 3 - answering a future-speculation question",
      "Part 3 - trả lời câu hỏi dự đoán tương lai",
      "Q: How will schools change in the next 20 years?\nA: I'd expect assessment to change faster than teaching itself. With AI tools able to produce essays instantly, schools will most likely shift towards oral defence and in-class tasks. Whether that improves learning is another matter entirely.",
      "Use modal chains ('I'd expect… will most likely… whether that improves… is another matter') to show speculative grammar range without committing to false certainty.",
    ),
  ],
  vocab: [
    vc("the dominant factor", "the most influential cause", "yếu tố chi phối", "The dominant factor here is almost certainly economic."),
    vc("on the face of it", "judging by appearances", "thoạt nhìn", "On the face of it, the policy looks straightforward."),
    vc("a disproportionate share", "an unfairly large portion", "tỷ lệ không cân xứng", "Housing absorbs a disproportionate share of young people's income."),
    vc("strike a compromise", "reach a balanced solution", "đạt được thoả hiệp", "Hybrid work strikes a sensible compromise for both sides."),
    vc("arguably", "it can be reasonably claimed", "có thể lập luận rằng", "It's arguably the single biggest change of the decade."),
    vc("I'd be reluctant to generalise", "careful academic hedging", "tôi ngại khái quát hoá", "I'd be reluctant to generalise from one country's experience."),
    vc("in the long run", "over an extended period", "về lâu dài", "In the long run, prevention is far cheaper than treatment."),
    vc("a knock-on effect", "an indirect consequence", "hệ quả dây chuyền", "Rising fuel prices have a knock-on effect on food costs."),
    vc("that's another matter entirely", "distinguishing two questions", "đó lại là chuyện khác", "Whether it is affordable is another matter entirely."),
    vc("by and large", "mostly, generally", "nhìn chung", "By and large, the reforms have been well received."),
  ],
  mistakes: [
    mist("Answering a societal question with a personal anecdote only", "Trả lời câu hỏi xã hội chỉ bằng chuyện cá nhân", "Part 3 assesses abstract, analytical language; 'my family does X' alone caps Task Response at Band 6.", "Part 3 chấm ngôn ngữ trừu tượng, phân tích; chỉ kể 'gia đình tôi' giới hạn Band 6."),
    mist("Repeating the same discourse marker ('I think') every sentence", "Lặp 'I think' mỗi câu", "Range of stance markers is explicitly assessed under Lexical Resource.", "Sự đa dạng của từ thể hiện quan điểm được chấm trong Lexical Resource."),
    mist("Giving a two-sentence answer in Part 3", "Trả lời 2 câu trong Part 3", "Part 3 expects 40-60 seconds of developed reasoning per question.", "Part 3 cần 40-60 giây lập luận có phát triển cho mỗi câu."),
  ],
  cheats: [
    "Answer length target: 40-60 seconds, roughly 5-7 sentences",
    "Structure: Point → Explain → Example → Link back",
    "Always concede one counter-point before concluding",
    "Hedge precisely: 'arguably', 'in most cases', 'at least among…'",
    "Use nominalisation ('the shift towards', 'the erosion of') for academic register",
    "Distinguish questions: 'whether X is desirable is a separate issue'",
  ],
  steps: [
    step(4, "Finish with an explicit stance sentence", "Kết bằng một câu nêu rõ lập trường", "'So on balance, I'd side with…' tells the examiner your reasoning reached a conclusion.", "'Vì vậy, cân nhắc tất cả, tôi nghiêng về…' cho giám khảo thấy lập luận đã có kết luận."),
  ],
};

const SPK_DELIVERY: Pack = {
  examples: [
    ex(
      "Delivery - sentence stress carries meaning",
      "Trình bày - trọng âm câu tạo nghĩa",
      "'I didn't say she stole the money.' Stressing each of the seven words in turn produces seven different meanings. Practise stressing only the content words: 'I DIDN'T say she STOLE the MONEY.'",
      "English is stress-timed. Stressing content words (nouns, main verbs, adjectives, adverbs) and weakening function words is what makes speech sound natural under the Pronunciation descriptor.",
    ),
    ex(
      "Delivery - chunking to eliminate false starts",
      "Trình bày - chia cụm để bỏ lỗi ngập ngừng",
      "Unchunked: 'I- I think that- that maybe the government should- should invest more.'\nChunked: 'I think / the government should invest more / particularly in public transport.'",
      "Speaking in 4-6 word thought groups with a micro-pause between them removes repetition and self-correction, both of which are explicitly listed in the Band 5-6 Fluency descriptors.",
    ),
    ex(
      "Delivery - natural fillers versus damaging fillers",
      "Trình bày - filler tự nhiên vs. filler gây hại",
      "Damaging: 'em… em… em…'\nNatural: 'Well, let me think for a second - I suppose the honest answer is…' / 'Off the top of my head, I'd say…'",
      "Fillers are not penalised; silence and 'um' loops are. Lexical fillers buy the same thinking time while adding assessable vocabulary.",
    ),
    ex(
      "Delivery - intonation for listing and contrast",
      "Trình bày - ngữ điệu khi liệt kê và tương phản",
      "'It's cheaper ↗, faster ↗, and far more reliable ↘.' / 'I enjoy the job ↗, but the commute is exhausting ↘.'",
      "Rising tone on non-final items and falling tone on the final item signals completeness; flat delivery is the most common reason strong speakers stay at Pronunciation Band 6.",
    ),
  ],
  vocab: [
    vc("off the top of my head", "without preparation", "nghĩ ngay lúc này", "Off the top of my head, I'd say about a third of my classmates."),
    vc("let me think for a second", "natural thinking-time phrase", "để tôi nghĩ một chút", "Let me think for a second - that's a tricky one."),
    vc("thought group", "a short chunk spoken as one unit", "cụm ý", "Speaking in thought groups makes you sound far more fluent."),
    vc("content word", "a word carrying meaning that takes stress", "từ mang nghĩa", "Stress the content words and weaken the rest."),
    vc("to trail off", "to stop speaking gradually and unclearly", "nói lịm dần", "Try not to trail off at the end of your long turn."),
    vc("self-correction", "repairing your own grammar mid-sentence", "tự sửa lỗi", "Excessive self-correction damages your fluency score."),
    vc("to paraphrase the question", "restate it in your own words", "diễn giải câu hỏi", "Paraphrasing the question buys five seconds of thinking time."),
    vc("weak form", "the reduced pronunciation of a function word", "dạng yếu", "'Can' becomes /kən/ in its weak form."),
    vc("to signpost", "to mark the structure of what you say", "báo hiệu cấu trúc", "Signpost with 'firstly' only once per answer."),
    vc("to keep the floor", "to continue holding your speaking turn", "giữ lượt nói", "A short filler helps you keep the floor while you think."),
  ],
  mistakes: [
    mist("Speaking too fast to sound fluent", "Nói nhanh để tỏ ra trôi chảy", "Speed without chunking reduces intelligibility, which is the core criterion of the Pronunciation band.", "Nói nhanh mà không chia cụm làm giảm độ dễ hiểu - tiêu chí cốt lõi của Pronunciation."),
    mist("Memorising and reciting prepared answers", "Học thuộc và đọc lại câu trả lời soạn sẵn", "Recited language has flat intonation and off-topic content; examiners may stop assessing it.", "Ngôn ngữ học thuộc có ngữ điệu phẳng và lạc đề; giám khảo có thể không tính điểm."),
    mist("Long silent pauses over four seconds", "Dừng im quá 4 giây", "Silence is the single clearest Band 5 fluency signal - always fill with a lexical filler.", "Im lặng là dấu hiệu Band 5 rõ nhất - luôn lấp bằng filler có nghĩa."),
  ],
  cheats: [
    "Speak in 4-6 word thought groups with micro-pauses",
    "Stress content words; weaken 'to, of, and, can, was'",
    "Rise on list items, fall on the final item",
    "Replace 'um' with 'well…', 'I suppose…', 'off the top of my head…'",
    "Record yourself for 2 minutes daily and count self-corrections",
    "Slow down 10% - clarity outscores speed in every Pronunciation band",
  ],
  steps: [
    step(4, "Record, count, and fix one habit per week", "Ghi âm, đếm lỗi và sửa 1 thói quen mỗi tuần", "Track pauses over 3 seconds, repeated fillers and dropped word endings; fix only one at a time.", "Theo dõi khoảng dừng >3 giây, filler lặp và mất âm cuối; mỗi lần chỉ sửa một lỗi."),
  ],
};

// ===========================================================================
// WRITING - TASK-LEVEL PACKS
// ===========================================================================

const WRT_T1: Pack = {
  examples: [
    ex(
      "Task 1 - introduction and overview written correctly",
      "Task 1 - viết đúng mở bài và overview",
      "Intro: 'The bar chart compares the average weekly expenditure on three categories of household goods in four European countries in 2019, measured in euros.'\nOverview: 'Overall, food accounted for the largest share of spending in every country surveyed, while expenditure on leisure showed by far the widest variation between nations.'",
      "The introduction paraphrases chart type + what + where + when + units. The overview states two chart-wide patterns and contains no specific figures - this pairing alone secures Task Achievement Band 7.",
    ),
    ex(
      "Task 1 - a Band 8 body sentence with integrated data",
      "Task 1 - câu thân bài Band 8 tích hợp số liệu",
      "'Spending in Germany rose steadily from just under €40 to a peak of €62 in 2015, before levelling off at approximately €60 for the remainder of the period - an overall increase of roughly 50 per cent.'",
      "One sentence delivers direction, degree, two data points, a turning point and a summary comparison. Density like this is what separates Band 6 lists from Band 8 analysis.",
    ),
    ex(
      "Task 1 - grouping rather than listing",
      "Task 1 - nhóm dữ liệu thay vì liệt kê",
      "Listing (Band 6): 'France was 20. Italy was 22. Spain was 45. Poland was 48.'\nGrouping (Band 7.5): 'France and Italy clustered tightly around the 20-euro mark, whereas Spain and Poland spent more than twice as much, at roughly 45 and 48 euros respectively.'",
      "Grouping demonstrates Coherence & Cohesion and comparison language. Examiners explicitly look for 'selects and reports the main features and makes comparisons where relevant'.",
    ),
    ex(
      "Task 1 - describing a process diagram",
      "Task 1 - mô tả sơ đồ quy trình",
      "'The process begins when raw cocoa pods are harvested by hand. Once the beans have been extracted, they are left to ferment for approximately five days, after which they are spread out to dry in the sun.'",
      "Processes require the passive voice, sequencers ('once', 'after which') and the present simple. No figures and no overall trend - the overview instead states the number of stages and the start/end points.",
    ),
  ],
  vocab: [
    vc("to account for", "to make up a proportion of a total", "chiếm tỷ lệ", "Rice accounted for almost half of total exports."),
    vc("to level off / plateau", "to stop rising or falling and stay stable", "chững lại", "Sales levelled off at around 300 units after 2016."),
    vc("to peak at", "to reach the highest point", "đạt đỉnh ở mức", "Unemployment peaked at 11 per cent in 2010."),
    vc("a marginal increase", "a very small rise", "mức tăng không đáng kể", "There was a marginal increase of just two percentage points."),
    vc("respectively", "in the order already mentioned", "lần lượt", "Spain and Poland spent €45 and €48 respectively."),
    vc("to fluctuate", "to rise and fall irregularly", "dao động", "Prices fluctuated between €20 and €30 throughout the decade."),
    vc("roughly / approximately", "hedged quantification", "khoảng chừng", "Roughly a third of respondents chose the first option."),
    vc("the remainder of the period", "the rest of the time span", "phần còn lại của giai đoạn", "It held steady for the remainder of the period."),
    vc("in stark contrast", "signalling a strong opposite pattern", "trái ngược hoàn toàn", "In stark contrast, rural figures declined sharply."),
    vc("percentage point", "the unit of difference between percentages", "điểm phần trăm", "The gap widened by eight percentage points."),
  ],
  mistakes: [
    mist("Omitting the overview paragraph", "Bỏ qua đoạn overview", "An essay with no overview cannot exceed Band 5 for Task Achievement, regardless of language quality.", "Bài không có overview không thể vượt Band 5 Task Achievement, dù ngôn ngữ tốt đến đâu."),
    mist("Listing every single number in the chart", "Liệt kê toàn bộ số liệu trong biểu đồ", "Task 1 asks you to SELECT main features; exhaustive listing shows no analytical selection.", "Task 1 yêu cầu CHỌN đặc điểm chính; liệt kê hết cho thấy không có phân tích."),
    mist("Adding reasons or opinions ('this is because people prefer…')", "Thêm nguyên nhân hay ý kiến cá nhân", "Task 1 is purely descriptive; speculation is off-task and reduces Task Achievement.", "Task 1 chỉ mô tả; suy đoán là lạc đề và làm giảm Task Achievement."),
  ],
  cheats: [
    "Structure: Intro (1 sentence) → Overview (2 sentences) → Body 1 → Body 2",
    "Overview contains NO specific figures - only chart-wide patterns",
    "Write 170-190 words; never under 150",
    "Group similar items; never describe each item in isolation",
    "Vary word class: 'rose sharply' → 'a sharp rise in'",
    "Copy the units and the time frame exactly from the axis labels",
  ],
  steps: [
    step(4, "Proofread units, tenses and comparatives", "Soát lại đơn vị, thì và so sánh", "Check every figure carries its unit, past data uses past tense, and 'than' follows every comparative.", "Kiểm tra mọi số liệu có đơn vị, dữ liệu quá khứ dùng thì quá khứ, và mọi so sánh đều có 'than'."),
  ],
};

const WRT_T2: Pack = {
  examples: [
    ex(
      "Task 2 - a complete Band 8 introduction",
      "Task 2 - mở bài Band 8 hoàn chỉnh",
      "Prompt: Some people believe university education should be free for all students. To what extent do you agree?\nIntro: 'Whether higher education ought to be funded entirely by the state remains one of the most divisive questions in education policy. While free tuition undeniably widens access, I would argue that a means-tested model delivers the same social benefit at a far lower cost to the taxpayer.'",
      "Two sentences: a paraphrased context statement and a thesis that answers 'to what extent' with a clear, qualified position. No 'Nowadays', no copied prompt wording.",
    ),
    ex(
      "Task 2 - a fully developed PEEL body paragraph",
      "Task 2 - đoạn thân bài PEEL triển khai đầy đủ",
      "'The most compelling argument for state funding is that it removes the financial barrier facing capable but low-income applicants. (POINT) When tuition is charged upfront, prospective students weigh a decade of debt against an uncertain graduate premium, and many rationally opt out. (EXPLAIN) Germany's abolition of tuition fees in 2014, for instance, was followed by a marked rise in enrolments from non-academic families. (EXAMPLE) Free provision therefore functions less as a subsidy for the wealthy than as a corrective to an unequal starting line. (LINK)",
      "Roughly 90 words, one idea, four functional moves. Examiners reward depth of development over the number of ideas mentioned.",
    ),
    ex(
      "Task 2 - concession paragraph that protects Task Response",
      "Task 2 - đoạn nhượng bộ bảo vệ Task Response",
      "'Admittedly, universal free tuition is fiscally demanding, and critics reasonably point out that it can subsidise affluent households who would have enrolled regardless. This objection, however, is an argument for better targeting rather than for abandoning public funding altogether.'",
      "Concede a genuine counter-argument, then rebut it. A one-sided essay with no acknowledgement of opposing views rarely exceeds Band 6.5 for Task Response.",
    ),
    ex(
      "Task 2 - conclusion with a forward-looking final clause",
      "Task 2 - kết bài có câu hướng tương lai",
      "'In conclusion, although blanket free tuition is an imperfect instrument, the principle of publicly funded higher education is sound. A means-tested system would, in my view, prove the most sustainable compromise as participation rates continue to rise.'",
      "Restates the thesis in new wording, adds no new argument, and ends with a prediction - the standard Band 7.5+ closing move.",
    ),
  ],
  vocab: [
    vc("divisive", "causing strong disagreement", "gây chia rẽ", "Tuition policy remains a deeply divisive issue."),
    vc("means-tested", "based on assessed income", "xét theo thu nhập", "A means-tested grant targets support where it is needed."),
    vc("to widen access", "to make something available to more people", "mở rộng cơ hội tiếp cận", "Scholarships widen access to elite institutions."),
    vc("admittedly", "conceding a valid opposing point", "phải thừa nhận rằng", "Admittedly, the policy carries a significant fiscal cost."),
    vc("a compelling argument", "a highly persuasive reason", "lập luận thuyết phục", "The most compelling argument concerns long-term equity."),
    vc("to outweigh", "to be more significant than", "vượt trội hơn", "The social benefits clearly outweigh the short-term expense."),
    vc("a corrective to", "something that fixes an imbalance", "biện pháp khắc phục", "The subsidy acts as a corrective to regional inequality."),
    vc("unsustainable in the long term", "impossible to maintain", "không bền vững lâu dài", "Such spending is unsustainable in the long term."),
    vc("to prioritise", "to treat as most important", "ưu tiên", "Governments should prioritise vocational training."),
    vc("far-reaching implications", "wide and important consequences", "hệ quả sâu rộng", "The reform has far-reaching implications for rural schools."),
  ],
  mistakes: [
    mist("A thesis that does not answer the question directly", "Thesis không trả lời trực tiếp câu hỏi", "If the examiner cannot locate your position in the introduction, Task Response is capped at Band 6.", "Nếu giám khảo không thấy lập trường ở mở bài, Task Response bị giới hạn Band 6."),
    mist("Listing four ideas instead of developing two", "Liệt kê 4 ý thay vì triển khai 2 ý", "Undeveloped ideas score lower than two ideas explained with mechanism and example.", "Ý không triển khai điểm thấp hơn 2 ý được giải thích kèm cơ chế và ví dụ."),
    mist("Fabricating precise statistics ('87.3% of researchers')", "Bịa số liệu quá chi tiết ('87,3% nhà nghiên cứu')", "Invented precision looks dishonest; hedge instead with 'roughly a third' or a named real case.", "Số liệu bịa quá chính xác nghe thiếu trung thực; hãy dùng 'khoảng một phần ba' hoặc ví dụ thật."),
  ],
  cheats: [
    "40 minutes: 5 plan / 32 write / 3 proofread",
    "Introduction = paraphrase + thesis (2 sentences, 40-55 words)",
    "Each body = PEEL, one idea, 90-110 words",
    "Include one concession ('Admittedly…') per essay",
    "Word count 260-290 - never under 250",
    "Ban 'Nowadays', 'In today's modern world', 'Firstly/Secondly/Finally'",
  ],
  steps: [
    step(4, "Proofread the four cheap-mark zones", "Soát 4 vùng dễ ăn điểm", "Articles, plural -s, subject-verb agreement and spelling of the prompt's own keywords.", "Mạo từ, -s số nhiều, hoà hợp chủ-vị và chính tả từ khoá của đề bài."),
  ],
};

// ===========================================================================
// SUB-TOPIC PACKS (lecture-specific colour on top of the part/task packs)
// ===========================================================================

interface SubPack {
  match: RegExp;
  base: Pack;
  examples?: Example[];
  vocab?: VocabHighlight[];
}

const SUB_PACKS: SubPack[] = [
  {
    match: /speaking-part1-(home|hometown|family|home-work)/,
    base: SPK_P1,
    examples: [
      ex(
        "Home & hometown - a Band 7.5 model answer",
        "Nhà & quê hương - câu trả lời mẫu Band 7.5",
        "Q: Where do you live?\nA: I'm based in Thu Duc, on the eastern edge of Ho Chi Minh City. It used to be fairly quiet farmland, but over the last decade it's turned into a proper student district - my street alone has three coffee shops that stay open until midnight.",
        "A named district, a 'used to / has turned into' contrast and one concrete detail. That combination shows tense range and specific lexis in under 25 seconds.",
      ),
    ],
    vocab: [
      vc("on the outskirts of", "on the edge of a city", "ở ngoại ô", "We live on the outskirts of Hue, about ten kilometres from the centre."),
      vc("a close-knit community", "a community with strong bonds", "cộng đồng gắn bó", "It's a close-knit community where everyone knows their neighbours."),
    ],
  },
  {
    match: /speaking-part1-(work|study|job)/,
    base: SPK_P1,
    examples: [
      ex(
        "Work & study - a Band 7.5 model answer",
        "Công việc & học tập - câu trả lời mẫu Band 7.5",
        "Q: What do you do?\nA: I'm a data analyst at a logistics firm - essentially I turn delivery records into dashboards that the operations team uses each morning. It's repetitive at times, but I genuinely enjoy the moment when a chart explains something nobody had noticed.",
        "Role + industry + one real daily task + a two-layer feeling. This avoids the rehearsed CV monologue examiners immediately probe.",
      ),
    ],
    vocab: [
      vc("hands-on", "involving practical work", "thực hành trực tiếp", "My role is very hands-on rather than purely theoretical."),
      vc("a steep learning curve", "a demanding period of learning", "giai đoạn học rất dốc", "The first six months were a steep learning curve."),
    ],
  },
  {
    match: /speaking-part1-(hobb|free-time|sport|music)/,
    base: SPK_P1,
    examples: [
      ex(
        "Hobbies - depth over breadth",
        "Sở thích - sâu hơn rộng",
        "Q: What do you do in your free time?\nA: Most of my free time goes into bouldering, believe it or not. I train at a small gym near my flat maybe three evenings a week, and what keeps me coming back is that every route is a puzzle - it's as much problem-solving as it is physical.",
        "One hobby, frequency, place and an insight into why it appeals. Listing five hobbies would produce half the assessable language.",
      ),
    ],
    vocab: [
      vc("to unwind", "to relax after work", "thư giãn", "Cooking is how I unwind after a long shift."),
      vc("to keep me coming back", "to make me continue an activity", "khiến tôi quay lại", "What keeps me coming back is the community around it."),
    ],
  },
  {
    match: /speaking-part1-(food|cook|cuisine)/,
    base: SPK_P1,
    examples: [
      ex(
        "Food & cooking - concrete sensory detail",
        "Ẩm thực - chi tiết cảm giác cụ thể",
        "Q: Do you enjoy cooking?\nA: I do, though only at weekends when I'm not rushing. I mostly cook northern Vietnamese food - bun rieng, that sort of thing - and I find the slow part, simmering the broth for an hour, oddly therapeutic.",
        "Naming a dish and describing one physical process is far stronger than 'I like cooking because it is fun and healthy'.",
      ),
    ],
    vocab: [
      vc("comfort food", "food that gives emotional comfort", "món ăn gợi cảm giác ấm áp", "A bowl of pho is the ultimate comfort food for me."),
      vc("to have a sweet tooth", "to love sugary food", "hảo ngọt", "I've always had a sweet tooth, unfortunately."),
    ],
  },
  {
    match: /speaking-part1-(tech|social-media|phone|internet)/,
    base: SPK_P1,
    examples: [
      ex(
        "Technology & phones - balanced Part 1 answer",
        "Công nghệ & điện thoại - trả lời cân bằng",
        "Q: How often do you use your phone?\nA: Far more than I'd like to admit - probably four or five hours a day. A good chunk of that is genuinely useful: maps, banking, messaging my parents. The rest is mindless scrolling, which I've started trying to cap with a screen-time limit.",
        "A self-aware answer with a number, a category split and a solution. Evaluation like this is exactly what 'develops the topic' means in the Band 7 descriptor.",
      ),
    ],
    vocab: [
      vc("mindless scrolling", "browsing without purpose", "lướt vô thức", "I lose an hour a night to mindless scrolling."),
      vc("to cut down on screen time", "to reduce device usage", "giảm thời gian dùng thiết bị", "I'm trying to cut down on screen time before bed."),
    ],
  },
  {
    match: /speaking-part2-describe-(person|people)/,
    base: SPK_P2,
    examples: [
      ex(
        "Describe a person - character evidence, not adjectives",
        "Tả một người - dẫn chứng tính cách, không chỉ tính từ",
        "'Rather than simply calling her generous, I'd say this: when a neighbour's shop burned down, my aunt closed her own stall for a week and ran his deliveries for free. That's the kind of person she is.'",
        "Show, don't tell. One narrated action proves a character trait far more effectively than three adjectives, and it fills 20 seconds of the long turn.",
      ),
    ],
    vocab: [
      vc("down to earth", "practical and modest", "giản dị, thực tế", "Despite his success, he's remarkably down to earth."),
      vc("to look up to someone", "to admire someone", "ngưỡng mộ ai", "She's the person I've looked up to since childhood."),
    ],
  },
  {
    match: /speaking-part2-describe-(place|website|app)/,
    base: SPK_P2,
    examples: [
      ex(
        "Describe a place - the sensory sweep",
        "Tả một nơi - quét giác quan",
        "'The market opens before dawn, so you arrive in half-light. There's steam rising off the noodle stalls, the constant clatter of metal bowls, and that unmistakable smell of charcoal and lime. By seven it's shoulder to shoulder.'",
        "Sight, sound and smell in three sentences. Sensory lexis is the quickest legitimate route to Band 8 Lexical Resource in a descriptive long turn.",
      ),
    ],
    vocab: [
      vc("bustling", "full of energetic activity", "nhộn nhịp", "It's a bustling street market from dawn until noon."),
      vc("off the beaten track", "away from tourist routes", "ít người biết đến", "The village is well off the beaten track."),
    ],
  },
  {
    match: /speaking-part2-describe-(object|thing|possession)/,
    base: SPK_P2,
    examples: [
      ex(
        "Describe an object - physical detail plus story",
        "Tả một vật - chi tiết vật lý kèm câu chuyện",
        "'It's a battered Casio watch, gold-plated but the plating has worn through at the edges. My father wore it for twenty-two years on the railways, and he handed it over the day I left for university - which is why I'd never replace it with something newer.'",
        "Material, condition, history and emotional value. Four content layers guarantee the full two minutes without invention.",
      ),
    ],
    vocab: [
      vc("battered", "old and damaged from use", "cũ sờn, sứt sẹo", "I still carry the same battered leather notebook."),
      vc("sentimental value", "emotional rather than financial worth", "giá trị tinh thần", "It has enormous sentimental value for me."),
    ],
  },
  {
    match: /speaking-part2-(describe-event|memorable-event|personal-stories|sensory-storytelling|describe-activity|describe-skill|difficult-decision|time-management|time-pressure)/,
    base: SPK_P2,
    examples: [
      ex(
        "Narrative long turn - tense layering",
        "Lượt nói kể chuyện - phân tầng thì",
        "'We had been planning the trip for months (past perfect continuous) when the typhoon warning came through (past simple). While everyone else was cancelling (past continuous), we decided to drive inland instead - and honestly it's the best decision we've made as a group (present perfect).'",
        "Four tense forms in one short narrative. Grammatical Range is assessed on what you actually produce, so build the range into the story deliberately.",
      ),
    ],
    vocab: [
      vc("in hindsight", "looking back with knowledge gained", "nhìn lại mới thấy", "In hindsight, we should have booked earlier."),
      vc("to take it in my stride", "to handle difficulty calmly", "bình tĩnh xử lý", "She took the setback completely in her stride."),
    ],
  },
  {
    match: /speaking-part3-(compar|era)/,
    base: SPK_P3,
    examples: [
      ex(
        "Comparing past and present - controlled structures",
        "So sánh quá khứ và hiện tại - cấu trúc kiểm soát",
        "'A generation ago, job security was effectively assumed; today it has to be negotiated year by year. The shift isn't purely negative, though - workers now enjoy a degree of mobility their parents never had.'",
        "Use 'used to / whereas now', 'a generation ago… today', and one balancing clause. Comparative precision is a named Band 7 requirement in Part 3.",
      ),
    ],
    vocab: [
      vc("a generation ago", "framing a past era", "một thế hệ trước", "A generation ago, few households owned a car."),
      vc("to a far greater extent", "much more so", "ở mức độ lớn hơn nhiều", "Young people travel to a far greater extent than before."),
    ],
  },
  {
    match: /speaking-part3-(speculat|future|predict)/,
    base: SPK_P3,
    examples: [
      ex(
        "Speculating - modal chains",
        "Dự đoán - chuỗi modal",
        "'Cities will almost certainly become denser rather than larger. If land prices keep climbing, developers are likely to build upwards, which could well make public transport viable in districts that currently depend on motorbikes.'",
        "'Almost certainly → are likely to → could well' shows graded certainty. Flat 'will' repetition is a Band 6 grammar signal.",
      ),
    ],
    vocab: [
      vc("could well", "quite possibly", "rất có thể", "That could well become the norm within a decade."),
      vc("in all likelihood", "very probably", "nhiều khả năng", "In all likelihood, remote work is here to stay."),
    ],
  },
  {
    match: /speaking-part3-(cause|effect|problem-solution)/,
    base: SPK_P3,
    examples: [
      ex(
        "Cause and effect - the causal chain",
        "Nguyên nhân - kết quả - chuỗi nhân quả",
        "'Rising rents push young families out to the suburbs, which lengthens commutes, which in turn eats into the time parents spend with their children. So a housing problem quietly becomes a family-wellbeing problem.'",
        "Chaining three consequences ('which… which in turn… so') proves analytical depth and produces complex sentences naturally.",
      ),
    ],
    vocab: [
      vc("to stem from", "to originate from", "bắt nguồn từ", "The issue stems from decades of under-investment."),
      vc("a vicious circle", "a self-reinforcing negative cycle", "vòng luẩn quẩn", "Debt and low wages create a vicious circle."),
    ],
  },
  {
    match: /speaking-part3-(opinion|debate|justification|evidence)/,
    base: SPK_P3,
    examples: [
      ex(
        "Justifying an opinion under pressure",
        "Bảo vệ quan điểm khi bị hỏi vặn",
        "Examiner: 'But isn't that unfair on rural students?'\nA: 'That's a fair challenge. I'd still hold my position, but I'd qualify it: the policy only works if it's paired with transport subsidies - without that, you're right, it simply relocates the inequality.'",
        "Acknowledge, restate, qualify. Defending a position without becoming rigid is the clearest evidence of Band 8 flexibility.",
      ),
    ],
    vocab: [
      vc("that's a fair challenge", "acknowledging a counter-question", "đó là phản biện hợp lý", "That's a fair challenge, and I'd qualify what I said."),
      vc("to qualify a claim", "to add limiting conditions", "giới hạn lại nhận định", "Let me qualify that - it applies mainly to large cities."),
    ],
  },
  {
    match: /speaking-part3-(abstract|hedging)/,
    base: SPK_P3,
    examples: [
      ex(
        "Abstract questions - define, then analyse",
        "Câu hỏi trừu tượng - định nghĩa rồi phân tích",
        "'It depends on what we mean by success. If we define it purely in financial terms, then yes, the gap is widening. But if we include job satisfaction and autonomy, the picture is far less clear-cut.'",
        "A ten-second definitional move converts a vague question into a structured answer and immediately introduces conditional grammar.",
      ),
    ],
    vocab: [
      vc("clear-cut", "obvious and unambiguous", "rõ ràng dứt khoát", "The evidence is far from clear-cut."),
      vc("it depends on how you define", "framing an abstract term", "còn tuỳ định nghĩa thế nào", "It depends on how you define 'community'."),
    ],
  },
  {
    match: /(fillers|fluency|pronunciation|intonation|stress|body-language|nerves|exam-day|buying-time|emotion-colours|general-specific)/,
    base: SPK_DELIVERY,
  },
  { match: /speaking-part1/, base: SPK_P1 },
  { match: /speaking-part2/, base: SPK_P2 },
  { match: /speaking-part3/, base: SPK_P3 },
  { match: /^speaking-/, base: SPK_DELIVERY },
  {
    match: /writing-task1-(line|trend|bar|pie|table|chart|units|numbers|time-expressions|comparison|grouping|overview|storytelling|multi|mixed)/,
    base: WRT_T1,
  },
  { match: /writing-task1-(process|map|diagram)/, base: WRT_T1 },
  { match: /writing-task1/, base: WRT_T1 },
  { match: /writing-task2|^band8|peel/, base: WRT_T2 },
  { match: /^writing-/, base: WRT_T2 },
];

function packFor(id: string, skill?: string): Pack {
  for (const sp of SUB_PACKS) {
    if (sp.match.test(id)) {
      return {
        ...sp.base,
        examples: [...(sp.examples || []), ...sp.base.examples],
        vocab: [...(sp.vocab || []), ...sp.base.vocab],
      };
    }
  }
  if (skill === "speaking") return SPK_DELIVERY;
  if (skill === "writing") return WRT_T2;
  return emptyPack();
}

// ===========================================================================
// Normalizer
// ===========================================================================

const MIN_EXAMPLES = 4;
const MIN_VOCAB = 8;
const MIN_MISTAKES = 3;
const MIN_STEPS = 4;
const MIN_CHEATS = 6;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Signature text produced by the generic mk() lecture factories - these
// examples say nothing lecture-specific and must be dropped, not padded around.
const GENERIC_EXAMPLE_RE =
  /apply the framework above|apply this framework to a past ielts prompt|apply the framework on a past paper|time yourself on a real cambridge|drill it on a real prompt|typical band 7\+ sentence pattern/i;

function stripGenericExamples(current: Example[]): Example[] {
  return current.filter(
    e => !GENERIC_EXAMPLE_RE.test(`${e.context || ""} ${e.example || ""} ${e.explanation || ""}`),
  );
}

function topUpExamples(current: Example[], pack: Example[]): Example[] {
  if (current.length >= MIN_EXAMPLES) return current;
  const seen = new Set(current.map(e => norm(e.example || "")));
  const out = [...current];
  for (const e of pack) {
    if (out.length >= MIN_EXAMPLES) break;
    if (!seen.has(norm(e.example))) {
      out.push(e);
      seen.add(norm(e.example));
    }
  }
  return out;
}

function topUpVocab(current: VocabHighlight[], pack: VocabHighlight[]): VocabHighlight[] {
  if (current.length >= MIN_VOCAB) return current;
  const seen = new Set(current.map(v => v.word.toLowerCase().trim()));
  const out = [...current];
  for (const v of pack) {
    if (out.length >= MIN_VOCAB) break;
    if (!seen.has(v.word.toLowerCase().trim())) {
      out.push(v);
      seen.add(v.word.toLowerCase().trim());
    }
  }
  return out;
}

function topUpMistakes(current: MistakeToAvoid[], pack: MistakeToAvoid[]): MistakeToAvoid[] {
  if (current.length >= MIN_MISTAKES) return current;
  const seen = new Set(current.map(m => norm(m.mistake)));
  const out = [...current];
  for (const m of pack) {
    if (out.length >= MIN_MISTAKES) break;
    if (!seen.has(norm(m.mistake))) {
      out.push(m);
      seen.add(norm(m.mistake));
    }
  }
  return out;
}

function topUpCheats(current: string[], pack: string[]): string[] {
  if (current.length >= MIN_CHEATS) return current;
  const seen = new Set(current.map(norm));
  const out = [...current];
  for (const c of pack) {
    if (out.length >= MIN_CHEATS) break;
    if (!seen.has(norm(c))) {
      out.push(c);
      seen.add(norm(c));
    }
  }
  return out;
}

function topUpSteps(current: StrategyStep[], pack: StrategyStep[]): StrategyStep[] {
  if (current.length >= MIN_STEPS) return current;
  const seen = new Set(current.map(s => norm(s.title)));
  const out = [...current];
  for (const s of pack) {
    if (out.length >= MIN_STEPS) break;
    if (!seen.has(norm(s.title))) {
      out.push({ ...s, step: out.length + 1 });
      seen.add(norm(s.title));
    }
  }
  return out.map((s, i) => ({ ...s, step: i + 1 }));
}

/**
 * Guarantees academic completeness for a single Writing/Speaking lecture.
 * Other skills are returned untouched.
 */
export function normalizeLectureDepth(l: IeltsLecture): IeltsLecture {
  const isTarget =
    l.skill === "writing" ||
    l.skill === "speaking" ||
    /^writing-/.test(l.id) ||
    /^speaking-/.test(l.id);
  if (!isTarget) return l;

  const pack = packFor(l.id, l.skill);

  return {
    ...l,
    strategySteps: topUpSteps(l.strategySteps || [], pack.steps),
    practicalExamples: topUpExamples(stripGenericExamples(l.practicalExamples || []), pack.examples),
    vocabHighlights: topUpVocab(l.vocabHighlights || [], pack.vocab),
    mistakesToAvoid: topUpMistakes(l.mistakesToAvoid || [], pack.mistakes),
    cheatSheetPoints: topUpCheats(l.cheatSheetPoints || [], pack.cheats),
  };
}

export function normalizeLectureDepthAll(lectures: IeltsLecture[]): IeltsLecture[] {
  return lectures.map(normalizeLectureDepth);
}
