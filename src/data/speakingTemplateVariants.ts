/**
 * @file speakingTemplateVariants.ts
 * @description Extra model sentences for every IELTS Speaking Template Lab step.
 *   Each variant trains a DIFFERENT grammar structure from the main model, so a
 *   student drilling one framework step meets several Band 7.0+ ways of saying
 *   the same idea instead of repeating a single pattern.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface DrillVariant {
  /** Complete model sentence. */
  text: string;
  /** The structure this variant trains (bilingual). */
  focusVi: string;
  focusEn: string;
  /** Chunks to bold inside the sentence. */
  highlight: string[];
}

/** Key format: `${typeId}:${stepId}` - same keys as SPEAKING_STEP_DRILLS. */
export const SPEAKING_STEP_VARIANTS: Record<string, DrillVariant[]> = {
  /* ------------------------------ PART 1 ------------------------------ */
  "p1-like:point": [
    {
      text: "I have to say, cooking is something I've grown to love over the past few years.",
      focusVi: "'something I've grown to + V' - hiện tại hoàn thành diễn tả sở thích hình thành dần.",
      focusEn: "'something I've grown to + verb' - present perfect for a taste that developed over time.",
      highlight: ["I have to say", "I've grown to love"],
    },
    {
      text: "Not particularly, to be honest - it's more of a chore for me than a hobby.",
      focusVi: "Trả lời phủ định lịch sự + 'more of a ... than a ...' để nêu sắc thái.",
      focusEn: "A polite negative answer + 'more of a ... than a ...' to add nuance.",
      highlight: ["Not particularly, to be honest", "more of a", "than a"],
    },
  ],
  "p1-like:reason": [
    {
      text: "What I enjoy most about it is the fact that I can switch my brain off completely.",
      focusVi: "Câu chẻ 'What I enjoy most about it is (the fact) that ...'.",
      focusEn: "Cleft sentence: 'What I enjoy most about it is (the fact) that ...'.",
      highlight: ["What I enjoy most about it is", "the fact that"],
    },
    {
      text: "I suppose it appeals to me because it's one of the few things that gives me an instant result.",
      focusVi: "'It appeals to me because ...' + mệnh đề quan hệ 'that gives me ...'.",
      focusEn: "'It appeals to me because ...' + a relative clause 'that gives me ...'.",
      highlight: ["it appeals to me because", "that gives me"],
    },
  ],
  "p1-like:example": [
    {
      text: "Only last week, for instance, I spent a whole Sunday making a curry from scratch.",
      focusVi: "Đảo trạng ngữ thời gian lên đầu câu + quá khứ đơn để kể ví dụ.",
      focusEn: "Fronting the time phrase + past simple to tell a quick example.",
      highlight: ["Only last week, for instance", "spent"],
    },
    {
      text: "I've actually been experimenting with Thai food recently, which has been surprisingly fun.",
      focusVi: "Hiện tại hoàn thành tiếp diễn 'I've been V-ing' + mệnh đề quan hệ 'which'.",
      focusEn: "Present perfect continuous 'I've been V-ing' + a 'which' relative clause.",
      highlight: ["I've actually been experimenting", "which has been"],
    },
  ],
  "p1-like:twist": [
    {
      text: "If I had more free time, I'd probably do it every single evening.",
      focusVi: "Câu điều kiện loại 2: 'If + quá khứ đơn, I'd + V' để chốt câu.",
      focusEn: "Second conditional: 'If + past simple, I'd + verb' as a closing line.",
      highlight: ["If I had", "I'd probably"],
    },
    {
      text: "Having said that, I only really enjoy it when I'm not in a rush.",
      focusVi: "'Having said that' + mệnh đề thời gian 'when I'm not ...' để giới hạn ý.",
      focusEn: "'Having said that' + a time clause 'when I'm not ...' to qualify the idea.",
      highlight: ["Having said that", "when I'm not"],
    },
  ],

  "p1-frequency:point": [
    {
      text: "I'd say I do it fairly regularly - roughly three or four times a month.",
      focusVi: "Trạng từ tần suất mềm 'fairly regularly' + con số ước lượng 'roughly'.",
      focusEn: "A soft frequency adverb 'fairly regularly' + an approximation with 'roughly'.",
      highlight: ["fairly regularly", "roughly"],
    },
    {
      text: "Hardly ever, in all honesty - maybe once or twice a year at the very most.",
      focusVi: "'Hardly ever' (trạng từ phủ định) + 'at the very most' để giới hạn.",
      focusEn: "'Hardly ever' (negative adverb) + 'at the very most' to set an upper limit.",
      highlight: ["Hardly ever", "at the very most"],
    },
  ],
  "p1-frequency:reason": [
    {
      text: "The reason I don't do it more often is simply that my schedule is packed during the week.",
      focusVi: "Câu chẻ 'The reason I don't ... is simply that ...'.",
      focusEn: "Cleft structure: 'The reason I don't ... is simply that ...'.",
      highlight: ["The reason I don't do it more often is", "simply that"],
    },
    {
      text: "It tends to depend on how busy I am, since my workload changes from month to month.",
      focusVi: "'It tends to depend on + mệnh đề wh-' + 'since' chỉ nguyên nhân.",
      focusEn: "'It tends to depend on + wh-clause' + 'since' for the reason.",
      highlight: ["It tends to depend on", "since"],
    },
  ],
  "p1-frequency:example": [
    {
      text: "Just this month, for example, I've only managed it twice because of exams.",
      focusVi: "Hiện tại hoàn thành với khoảng thời gian chưa kết thúc 'just this month'.",
      focusEn: "Present perfect with an unfinished time period, 'just this month'.",
      highlight: ["Just this month, for example", "I've only managed"],
    },
    {
      text: "A typical week would be two short sessions after work and a longer one at the weekend.",
      focusVi: "'A typical week would be ...' - dùng 'would' để mô tả thói quen điển hình.",
      focusEn: "'A typical week would be ...' - using 'would' to describe a typical routine.",
      highlight: ["A typical week would be"],
    },
  ],
  "p1-frequency:twist": [
    {
      text: "Whenever I get a long holiday, though, I do it almost daily.",
      focusVi: "Mệnh đề thời gian 'Whenever + hiện tại đơn' đặt ở đầu câu.",
      focusEn: "A time clause with 'Whenever + present simple' fronted at the start.",
      highlight: ["Whenever", "though"],
    },
    {
      text: "Ideally, I'd like to make it a weekly routine rather than something I squeeze in.",
      focusVi: "'I'd like to + V' cho mong muốn + 'rather than' để đối lập.",
      focusEn: "'I'd like to + verb' for a wish + 'rather than' for contrast.",
      highlight: ["Ideally", "I'd like to", "rather than"],
    },
  ],

  "p1-past-now:point": [
    {
      text: "Definitely less than I did as a teenager - my habits have changed a lot since then.",
      focusVi: "So sánh 'less than I did' + hiện tại hoàn thành 'have changed ... since then'.",
      focusEn: "Comparative 'less than I did' + present perfect 'have changed ... since then'.",
      highlight: ["less than I did", "have changed", "since then"],
    },
    {
      text: "Not really, no - if anything, I do it more now than I ever did back then.",
      focusVi: "'If anything' + so sánh hơn 'more ... than I ever did'.",
      focusEn: "'If anything' + the comparative 'more ... than I ever did'.",
      highlight: ["if anything", "more now than I ever did"],
    },
  ],
  "p1-past-now:reason": [
    {
      text: "That's mostly down to technology - back then we didn't have phones distracting us all day.",
      focusVi: "'That's mostly down to + danh từ' + quá khứ đơn phủ định 'didn't have'.",
      focusEn: "'That's mostly down to + noun' + past simple negative 'didn't have'.",
      highlight: ["That's mostly down to", "back then", "didn't have"],
    },
    {
      text: "One thing that has really changed is my priorities; studying simply comes first now.",
      focusVi: "Câu chẻ 'One thing that has really changed is ...' (hiện tại hoàn thành).",
      focusEn: "Cleft sentence 'One thing that has really changed is ...' in the present perfect.",
      highlight: ["One thing that has really changed is"],
    },
  ],
  "p1-past-now:example": [
    {
      text: "I remember spending entire summers outdoors, whereas now a free afternoon feels rare.",
      focusVi: "'I remember + V-ing' (nhớ về quá khứ) + 'whereas now' để đối lập.",
      focusEn: "'I remember + V-ing' for past memories + 'whereas now' for contrast.",
      highlight: ["I remember spending", "whereas now"],
    },
    {
      text: "Back when I was at school, I'd do it every day; nowadays I'm lucky if I manage it weekly.",
      focusVi: "'Back when + quá khứ' + 'I'd + V' cho thói quen cũ, 'nowadays' cho hiện tại.",
      focusEn: "'Back when + past' + 'I'd + verb' for old habits, 'nowadays' for the present.",
      highlight: ["Back when I was", "I'd do it", "nowadays"],
    },
  ],
  "p1-past-now:twist": [
    {
      text: "In a way it's changed rather than disappeared - I just do it differently now.",
      focusVi: "'In a way' + 'rather than' để làm mềm và điều chỉnh ý.",
      focusEn: "'In a way' + 'rather than' to soften and refine the point.",
      highlight: ["In a way", "rather than"],
    },
    {
      text: "I imagine it'll pick up again once my schedule settles down a bit.",
      focusVi: "'I imagine it'll ...' + mệnh đề thời gian 'once + hiện tại đơn'.",
      focusEn: "'I imagine it'll ...' + a time clause 'once + present simple'.",
      highlight: ["I imagine it'll", "once"],
    },
  ],

  "p1-would:point": [
    {
      text: "Given the chance, I'd jump at it - it's been on my list for years.",
      focusVi: "'Given the chance, I'd + V' - điều kiện rút gọn, rất tự nhiên.",
      focusEn: "'Given the chance, I'd + verb' - a reduced conditional that sounds very natural.",
      highlight: ["Given the chance", "I'd jump at it"],
    },
    {
      text: "Probably not, actually - it's never really appealed to me.",
      focusVi: "Trả lời phủ định mềm + hiện tại hoàn thành 'has never appealed to me'.",
      focusEn: "A softened negative + present perfect 'has never appealed to me'.",
      highlight: ["Probably not, actually", "never really appealed to me"],
    },
  ],
  "p1-would:reason": [
    {
      text: "What attracts me about it is the chance to work with people from completely different backgrounds.",
      focusVi: "Câu chẻ 'What attracts me about it is ...' + 'the chance to + V'.",
      focusEn: "Cleft sentence 'What attracts me about it is ...' + 'the chance to + verb'.",
      highlight: ["What attracts me about it is", "the chance to"],
    },
    {
      text: "If I ever did it, it would almost certainly improve my career prospects.",
      focusVi: "Điều kiện loại 2 'If I ever did ..., it would ...' cho tình huống giả định.",
      focusEn: "Second conditional 'If I ever did ..., it would ...' for a hypothetical.",
      highlight: ["If I ever did it", "it would"],
    },
  ],
  "p1-would:example": [
    {
      text: "I've been saving up for it, so it's not just an idea any more.",
      focusVi: "Hiện tại hoàn thành tiếp diễn 'I've been saving up' + 'so' chỉ kết quả.",
      focusEn: "Present perfect continuous 'I've been saving up' + result linker 'so'.",
      highlight: ["I've been saving up", "so"],
    },
    {
      text: "A friend of mine did exactly that last year, and hearing about it convinced me.",
      focusVi: "Quá khứ đơn kể ví dụ người khác + danh động từ làm chủ ngữ 'hearing about it'.",
      focusEn: "Past simple for someone else's example + a gerund subject 'hearing about it'.",
      highlight: ["did exactly that", "hearing about it convinced me"],
    },
  ],
  "p1-would:twist": [
    {
      text: "Realistically, though, it'll have to wait until I finish my degree.",
      focusVi: "'it'll have to wait until + hiện tại đơn' - mệnh đề thời gian tương lai.",
      focusEn: "'it'll have to wait until + present simple' - a future time clause.",
      highlight: ["Realistically, though", "until I finish"],
    },
    {
      text: "All being well, I'd like to have done it within the next couple of years.",
      focusVi: "'All being well' + 'to have done' (hoàn thành) cho kế hoạch có mốc.",
      focusEn: "'All being well' + the perfect infinitive 'to have done' for a deadline plan.",
      highlight: ["All being well", "to have done", "within the next couple of years"],
    },
  ],

  /* ------------------------------ PART 2 ------------------------------ */
  "p2-person:intro": [
    {
      text: "The person I've chosen to describe is my former teacher, someone I still turn to for advice.",
      focusVi: "Câu chẻ 'The person I've chosen to describe is ...' + đồng vị ngữ 'someone I ...'.",
      focusEn: "Cleft opener 'The person I've chosen to describe is ...' + an appositive 'someone I ...'.",
      highlight: ["The person I've chosen to describe is", "someone I still turn to"],
    },
    {
      text: "If I had to pick just one person, it would definitely be my elder brother.",
      focusVi: "Điều kiện loại 2 'If I had to ..., it would be ...' để mở bài ấn tượng.",
      focusEn: "Second conditional 'If I had to ..., it would be ...' as a strong opener.",
      highlight: ["If I had to pick", "it would definitely be"],
    },
  ],
  "p2-person:details": [
    {
      text: "She's the kind of person who listens far more than she speaks, which is quite rare.",
      focusVi: "'the kind of person who ...' + mệnh đề quan hệ bình luận 'which is ...'.",
      focusEn: "'the kind of person who ...' + a comment clause 'which is ...'.",
      highlight: ["the kind of person who", "which is"],
    },
    {
      text: "In terms of appearance, she's fairly tall with short greying hair, and she always dresses simply.",
      focusVi: "'In terms of ...' + 'with + danh từ' để miêu tả ngoại hình.",
      focusEn: "'In terms of ...' + 'with + noun' to describe appearance.",
      highlight: ["In terms of appearance", "with short greying hair"],
    },
  ],
  "p2-person:story": [
    {
      text: "There was one occasion I'll never forget: I had failed an important test and she stayed behind to go through every mistake with me.",
      focusVi: "'There was one occasion I'll never forget' + quá khứ hoàn thành 'I had failed'.",
      focusEn: "'There was one occasion I'll never forget' + past perfect 'I had failed'.",
      highlight: ["There was one occasion I'll never forget", "I had failed"],
    },
    {
      text: "Not only did she help me revise, but she also refused to take any money for it, which says a lot about her.",
      focusVi: "Đảo ngữ 'Not only did ..., but ... also ...' - cấu trúc band 8.0.",
      focusEn: "Inversion 'Not only did ..., but ... also ...' - a Band 8.0 structure.",
      highlight: ["Not only did she", "but she also"],
    },
  ],
  "p2-person:wrap": [
    {
      text: "If it hadn't been for her, I don't think I'd be where I am today.",
      focusVi: "Điều kiện hỗn hợp 'If it hadn't been for ..., I wouldn't be ...'.",
      focusEn: "Mixed conditional 'If it hadn't been for ..., I wouldn't be ...'.",
      highlight: ["If it hadn't been for her", "I'd be"],
    },
    {
      text: "That's essentially why she's the first person who comes to mind whenever anyone mentions role models.",
      focusVi: "'That's why ...' + 'whenever' + thành ngữ 'comes to mind'.",
      focusEn: "'That's why ...' + 'whenever' + the collocation 'comes to mind'.",
      highlight: ["That's essentially why", "comes to mind", "whenever"],
    },
  ],

  "p2-place:intro": [
    {
      text: "The place I've decided to talk about is a small library near my old school.",
      focusVi: "Câu chẻ 'The place I've decided to talk about is ...'.",
      focusEn: "Cleft opener 'The place I've decided to talk about is ...'.",
      highlight: ["The place I've decided to talk about is"],
    },
    {
      text: "There's a little riverside café I've been going to since I was a student.",
      focusVi: "'There's a ... I've been V-ing since ...' - hiện tại hoàn thành tiếp diễn.",
      focusEn: "'There's a ... I've been V-ing since ...' - present perfect continuous.",
      highlight: ["There's a", "I've been going to since"],
    },
  ],
  "p2-place:details": [
    {
      text: "It's tucked away down a narrow lane, so most people walk straight past it.",
      focusVi: "Bị động miêu tả vị trí 'It's tucked away ...' + 'so' chỉ kết quả.",
      focusEn: "Passive description of location 'It's tucked away ...' + result 'so'.",
      highlight: ["It's tucked away", "so"],
    },
    {
      text: "What makes it special is the light: huge windows on one side and old wooden shelves on the other.",
      focusVi: "Câu chẻ 'What makes it special is ...' + liệt kê song song.",
      focusEn: "Cleft sentence 'What makes it special is ...' + parallel listing.",
      highlight: ["What makes it special is"],
    },
  ],
  "p2-place:story": [
    {
      text: "I first came across it by chance during a rainstorm, and I ended up staying until closing time.",
      focusVi: "Phrasal verb 'come across' + 'end up + V-ing' để kể diễn biến.",
      focusEn: "The phrasal verb 'come across' + 'end up + V-ing' to narrate what happened.",
      highlight: ["came across it by chance", "ended up staying"],
    },
    {
      text: "Never had I found anywhere that quiet in the middle of a city, and I've been going back ever since.",
      focusVi: "Đảo ngữ 'Never had I ...' + hiện tại hoàn thành tiếp diễn 'ever since'.",
      focusEn: "Inversion 'Never had I ...' + present perfect continuous with 'ever since'.",
      highlight: ["Never had I found", "ever since"],
    },
  ],
  "p2-place:wrap": [
    {
      text: "Whenever I feel overwhelmed, that's the first place I think of going.",
      focusVi: "'Whenever + hiện tại đơn' + câu chẻ 'that's the first place I think of + V-ing'.",
      focusEn: "'Whenever + present simple' + cleft 'that's the first place I think of + V-ing'.",
      highlight: ["Whenever", "that's the first place I think of"],
    },
    {
      text: "If I ever move away, it's honestly the place I'd miss the most.",
      focusVi: "Điều kiện loại 1 + so sánh nhất 'the place I'd miss the most'.",
      focusEn: "First conditional + superlative 'the place I'd miss the most'.",
      highlight: ["If I ever move away", "I'd miss the most"],
    },
  ],

  "p2-object:intro": [
    {
      text: "The object I've chosen is a battered leather notebook that I carry everywhere.",
      focusVi: "Câu chẻ + tính từ miêu tả 'battered leather' + mệnh đề quan hệ 'that'.",
      focusEn: "Cleft opener + descriptive adjectives 'battered leather' + relative clause 'that'.",
      highlight: ["The object I've chosen is", "that I carry everywhere"],
    },
    {
      text: "There's a camera at home which was handed down to me by my father.",
      focusVi: "Bị động 'was handed down to me by ...' để nói nguồn gốc đồ vật.",
      focusEn: "Passive 'was handed down to me by ...' to explain where the object came from.",
      highlight: ["which was handed down to me by"],
    },
  ],
  "p2-object:details": [
    {
      text: "It's nothing special to look at - a plain black cover, slightly torn at the corners.",
      focusVi: "'nothing special to look at' + cụm phân từ 'slightly torn at the corners'.",
      focusEn: "'nothing special to look at' + a participle phrase 'slightly torn at the corners'.",
      highlight: ["nothing special to look at", "slightly torn"],
    },
    {
      text: "I've had it for almost five years now, and I use it for everything from lesson notes to shopping lists.",
      focusVi: "'I've had it for ...' + 'everything from ... to ...' để liệt kê.",
      focusEn: "'I've had it for ...' + 'everything from ... to ...' for listing.",
      highlight: ["I've had it for", "everything from", "to"],
    },
  ],
  "p2-object:story": [
    {
      text: "The reason it means so much to me is that every page reminds me of a different stage of my life.",
      focusVi: "Câu chẻ 'The reason it means so much to me is that ...'.",
      focusEn: "Cleft sentence 'The reason it means so much to me is that ...'.",
      highlight: ["The reason it means so much to me is that"],
    },
    {
      text: "Had I lost it that day on the bus, I'd have lost three years of notes with it.",
      focusVi: "Đảo ngữ điều kiện loại 3: 'Had I lost ..., I'd have lost ...'.",
      focusEn: "Inverted third conditional: 'Had I lost ..., I'd have lost ...'.",
      highlight: ["Had I lost it", "I'd have lost"],
    },
  ],
  "p2-object:wrap": [
    {
      text: "All things considered, it's worth far more to me than anything expensive I own.",
      focusVi: "'All things considered' + so sánh hơn 'far more ... than'.",
      focusEn: "'All things considered' + the comparative 'far more ... than'.",
      highlight: ["All things considered", "far more to me than"],
    },
    {
      text: "I doubt I'll ever throw it away, even when every page is full.",
      focusVi: "'I doubt I'll ever ...' + mệnh đề nhượng bộ 'even when ...'.",
      focusEn: "'I doubt I'll ever ...' + a concession clause 'even when ...'.",
      highlight: ["I doubt I'll ever", "even when"],
    },
  ],

  "p2-event:intro": [
    {
      text: "The experience I've chosen took place about three years ago, just after I started university.",
      focusVi: "'take place' (thay cho happen) + 'just after + mệnh đề' cho mốc thời gian.",
      focusEn: "'take place' instead of 'happen' + 'just after + clause' for the time frame.",
      highlight: ["took place", "just after"],
    },
    {
      text: "One event that really stands out is the day my whole class organised a surprise for our teacher.",
      focusVi: "Câu chẻ 'One event that really stands out is ...' + 'the day + mệnh đề'.",
      focusEn: "Cleft 'One event that really stands out is ...' + 'the day + clause'.",
      highlight: ["One event that really stands out is", "the day"],
    },
  ],
  "p2-event:details": [
    {
      text: "At the time, I was studying full-time and working at weekends, so my schedule was chaotic.",
      focusVi: "Quá khứ tiếp diễn 'I was studying ... and working ...' để dựng bối cảnh.",
      focusEn: "Past continuous 'I was studying ... and working ...' to set the scene.",
      highlight: ["At the time", "I was studying", "working"],
    },
    {
      text: "It was organised by a group of us who had never planned anything on that scale before.",
      focusVi: "Bị động 'It was organised by ...' + quá khứ hoàn thành 'who had never planned'.",
      focusEn: "Passive 'It was organised by ...' + past perfect 'who had never planned'.",
      highlight: ["It was organised by", "had never planned"],
    },
  ],
  "p2-event:story": [
    {
      text: "While we were setting everything up, the power suddenly went out, which nearly ruined the whole thing.",
      focusVi: "'While + quá khứ tiếp diễn' + 'suddenly + quá khứ đơn' - kể sự kiện bị ngắt.",
      focusEn: "'While + past continuous' + 'suddenly + past simple' for an interrupted action.",
      highlight: ["While we were setting", "suddenly went out"],
    },
    {
      text: "In the end we managed to pull it off, and by the time she arrived, everything was ready.",
      focusVi: "'manage to + V' + 'by the time + quá khứ đơn' với quá khứ hoàn thành/đơn.",
      focusEn: "'manage to + verb' + 'by the time + past simple' for sequencing.",
      highlight: ["managed to pull it off", "by the time"],
    },
  ],
  "p2-event:wrap": [
    {
      text: "What I took away from it was that a plan matters far less than the people carrying it out.",
      focusVi: "Câu chẻ 'What I took away from it was that ...' để chốt bài học.",
      focusEn: "Cleft sentence 'What I took away from it was that ...' to close with a lesson.",
      highlight: ["What I took away from it was that", "far less than"],
    },
    {
      text: "I'd do it all over again, even though it was exhausting at the time.",
      focusVi: "'I'd + V' giả định + 'even though' nhượng bộ.",
      focusEn: "Hypothetical 'I'd + verb' + the concession linker 'even though'.",
      highlight: ["I'd do it all over again", "even though"],
    },
  ],

  "p2-activity:intro": [
    {
      text: "The activity I've picked is hiking, which I only took up after moving to the north.",
      focusVi: "Danh động từ + mệnh đề quan hệ 'which I only took up after + V-ing'.",
      focusEn: "Gerund + relative clause 'which I only took up after + V-ing'.",
      highlight: ["The activity I've picked is", "took up after moving"],
    },
    {
      text: "Something I do almost every day is play the guitar, usually late at night.",
      focusVi: "Câu chẻ 'Something I do almost every day is + V nguyên thể'.",
      focusEn: "Cleft sentence 'Something I do almost every day is + bare infinitive'.",
      highlight: ["Something I do almost every day is"],
    },
  ],
  "p2-activity:details": [
    {
      text: "It doesn't require much equipment - a decent pair of shoes and a bit of free time are enough.",
      focusVi: "'It doesn't require ...' + chủ ngữ ghép với động từ số nhiều 'are enough'.",
      focusEn: "'It doesn't require ...' + a compound subject with plural 'are enough'.",
      highlight: ["It doesn't require", "are enough"],
    },
    {
      text: "I generally do it on my own, although I'll occasionally go with a couple of friends.",
      focusVi: "Trạng từ tần suất 'generally / occasionally' + 'although' nhượng bộ.",
      focusEn: "Frequency adverbs 'generally / occasionally' + the concession 'although'.",
      highlight: ["generally", "although", "occasionally"],
    },
  ],
  "p2-activity:story": [
    {
      text: "The first time I tried it I could barely finish, whereas now I can keep going for hours.",
      focusVi: "'The first time I ...' + 'could barely' + 'whereas now' đối lập tiến bộ.",
      focusEn: "'The first time I ...' + 'could barely' + 'whereas now' to contrast progress.",
      highlight: ["The first time I tried it", "could barely", "whereas now"],
    },
    {
      text: "It wasn't until I joined a small group that I really started to enjoy it.",
      focusVi: "Cấu trúc nhấn mạnh 'It wasn't until ... that ...'.",
      focusEn: "The emphatic structure 'It wasn't until ... that ...'.",
      highlight: ["It wasn't until", "that I really started"],
    },
  ],
  "p2-activity:wrap": [
    {
      text: "If I stopped doing it, I'd genuinely miss both the exercise and the quiet.",
      focusVi: "Điều kiện loại 2 + 'both ... and ...' để liệt kê song song.",
      focusEn: "Second conditional + 'both ... and ...' for parallel listing.",
      highlight: ["If I stopped doing it", "both", "and"],
    },
    {
      text: "What keeps me going is the feeling afterwards rather than the activity itself.",
      focusVi: "Câu chẻ 'What keeps me going is ...' + 'rather than'.",
      focusEn: "Cleft sentence 'What keeps me going is ...' + 'rather than'.",
      highlight: ["What keeps me going is", "rather than"],
    },
  ],

  /* ------------------------------ PART 3 ------------------------------ */
  "p3-opinion:answer": [
    {
      text: "Personally, I'm firmly of the view that it should be introduced as early as primary school.",
      focusVi: "'I'm firmly of the view that ...' - cách nêu quan điểm trang trọng.",
      focusEn: "'I'm firmly of the view that ...' - a formal way to state a position.",
      highlight: ["I'm firmly of the view that", "should be introduced"],
    },
    {
      text: "It's difficult to generalise, but broadly speaking I'd come down in favour of it.",
      focusVi: "'It's difficult to generalise, but broadly speaking ...' - hedging học thuật.",
      focusEn: "'It's difficult to generalise, but broadly speaking ...' - academic hedging.",
      highlight: ["It's difficult to generalise", "broadly speaking", "come down in favour of"],
    },
  ],
  "p3-opinion:reason": [
    {
      text: "The main justification for this is that habits formed early tend to last a lifetime.",
      focusVi: "'The main justification for this is that ...' + cụm phân từ 'habits formed early'.",
      focusEn: "'The main justification for this is that ...' + participle phrase 'habits formed early'.",
      highlight: ["The main justification for this is that", "habits formed early"],
    },
    {
      text: "Not only would it reduce debt, but it would also make young people far more confident with money.",
      focusVi: "Đảo ngữ 'Not only would ..., but ... also ...' để nêu hai lý do.",
      focusEn: "Inversion 'Not only would ..., but ... also ...' to give two reasons.",
      highlight: ["Not only would it", "but it would also"],
    },
  ],
  "p3-opinion:evidence": [
    {
      text: "Research in several countries suggests that students who study budgeting borrow less as adults.",
      focusVi: "'Research suggests that ...' + mệnh đề quan hệ 'who study ...'.",
      focusEn: "'Research suggests that ...' + a relative clause 'who study ...'.",
      highlight: ["Research", "suggests that", "who study"],
    },
    {
      text: "Take my own generation: almost nobody was taught how credit cards actually work.",
      focusVi: "'Take ...: ' + bị động quá khứ 'was taught' + mệnh đề wh-.",
      focusEn: "'Take ...: ' + past passive 'was taught' + a wh-clause.",
      highlight: ["Take my own generation", "was taught", "how"],
    },
  ],
  "p3-opinion:alternative": [
    {
      text: "Admittedly, the counter-argument is that the curriculum is already overloaded.",
      focusVi: "'Admittedly, the counter-argument is that ...' - thừa nhận ý phản biện.",
      focusEn: "'Admittedly, the counter-argument is that ...' to concede the counterpoint.",
      highlight: ["Admittedly", "the counter-argument is that"],
    },
    {
      text: "While it's true that schools are stretched, that doesn't justify leaving the topic out altogether.",
      focusVi: "'While it's true that ..., that doesn't justify + V-ing' - nhượng bộ rồi bác bỏ.",
      focusEn: "'While it's true that ..., that doesn't justify + V-ing' - concede then rebut.",
      highlight: ["While it's true that", "that doesn't justify"],
    },
  ],
  "p3-opinion:conclusion": [
    {
      text: "All things considered, the benefits would far outweigh the extra teaching hours involved.",
      focusVi: "'All things considered' + 'outweigh' + cụm phân từ 'hours involved'.",
      focusEn: "'All things considered' + 'outweigh' + the participle phrase 'hours involved'.",
      highlight: ["All things considered", "far outweigh"],
    },
    {
      text: "In short, unless schools take this on, young people will keep learning the hard way.",
      focusVi: "'unless + hiện tại đơn, ... will ...' - điều kiện phủ định loại 1.",
      focusEn: "'unless + present simple, ... will ...' - a negative first conditional.",
      highlight: ["In short", "unless", "will keep learning"],
    },
  ],

  "p3-why:answer": [
    {
      text: "There are probably several factors at play, but cost is by far the most significant.",
      focusVi: "'There are several factors at play' + so sánh nhất 'by far the most'.",
      focusEn: "'There are several factors at play' + the superlative 'by far the most'.",
      highlight: ["several factors at play", "by far the most significant"],
    },
    {
      text: "It's largely a matter of lifestyle, at least as far as younger couples are concerned.",
      focusVi: "'It's largely a matter of ...' + 'as far as ... are concerned' để giới hạn phạm vi.",
      focusEn: "'It's largely a matter of ...' + 'as far as ... are concerned' to limit the scope.",
      highlight: ["It's largely a matter of", "as far as", "are concerned"],
    },
  ],
  "p3-why:reason": [
    {
      text: "This can be attributed to the rising cost of housing, which delays almost every major decision.",
      focusVi: "Bị động 'can be attributed to ...' + mệnh đề quan hệ bình luận 'which'.",
      focusEn: "Passive 'can be attributed to ...' + a comment clause with 'which'.",
      highlight: ["can be attributed to", "which delays"],
    },
    {
      text: "The more expensive cities become, the later people tend to settle down.",
      focusVi: "Cấu trúc so sánh kép: 'The more ..., the later ...'.",
      focusEn: "Double comparative: 'The more ..., the later ...'.",
      highlight: ["The more", "the later"],
    },
  ],
  "p3-why:evidence": [
    {
      text: "This is borne out by the fact that birth rates fall fastest in the most expensive cities.",
      focusVi: "'This is borne out by the fact that ...' - dẫn chứng học thuật.",
      focusEn: "'This is borne out by the fact that ...' - academic evidence phrasing.",
      highlight: ["This is borne out by the fact that"],
    },
    {
      text: "You only have to look at my own friends: most of them still rent in their thirties.",
      focusVi: "'You only have to look at ...' - cách đưa ví dụ đời thường mà vẫn tự nhiên.",
      focusEn: "'You only have to look at ...' - a natural way to introduce everyday evidence.",
      highlight: ["You only have to look at"],
    },
  ],
  "p3-why:alternative": [
    {
      text: "It would be misleading, however, to put it all down to money.",
      focusVi: "'It would be misleading to ...' + phrasal verb 'put it down to'.",
      focusEn: "'It would be misleading to ...' + the phrasal verb 'put it down to'.",
      highlight: ["It would be misleading", "put it all down to"],
    },
    {
      text: "Whereas older generations married young, many people now prioritise their careers first.",
      focusVi: "'Whereas + mệnh đề' đặt đầu câu để đối lập hai nhóm.",
      focusEn: "Fronted 'Whereas + clause' to contrast two groups.",
      highlight: ["Whereas", "now prioritise"],
    },
  ],
  "p3-why:conclusion": [
    {
      text: "On balance, then, I'd put it down to economics far more than to changing values.",
      focusVi: "'I'd put it down to ... far more than to ...' - chốt bằng so sánh mức độ.",
      focusEn: "'I'd put it down to ... far more than to ...' - closing with a weighted comparison.",
      highlight: ["I'd put it down to", "far more than"],
    },
    {
      text: "In essence, the trend is unlikely to reverse until housing becomes affordable again.",
      focusVi: "'be unlikely to + V' + 'until + hiện tại đơn' cho mệnh đề thời gian.",
      focusEn: "'be unlikely to + verb' + 'until + present simple' time clause.",
      highlight: ["In essence", "is unlikely to", "until"],
    },
  ],

  "p3-compare:answer": [
    {
      text: "There are clear parallels between the two, though the differences are more striking.",
      focusVi: "'There are parallels between A and B' + 'though' đối lập.",
      focusEn: "'There are parallels between A and B' + the contrast linker 'though'.",
      highlight: ["There are clear parallels between", "though"],
    },
    {
      text: "Broadly speaking, the two groups want much the same thing but go about it differently.",
      focusVi: "'much the same thing' + phrasal verb 'go about it' để so sánh mềm.",
      focusEn: "'much the same thing' + the phrasal verb 'go about it' for a soft comparison.",
      highlight: ["much the same thing", "go about it differently"],
    },
  ],
  "p3-compare:reason": [
    {
      text: "The key distinction is that older people value face-to-face contact, while younger ones value convenience.",
      focusVi: "'The key distinction is that ...' + 'while' để đặt hai vế song song.",
      focusEn: "'The key distinction is that ...' + 'while' to balance two clauses.",
      highlight: ["The key distinction is that", "while"],
    },
    {
      text: "Younger generations are far more likely to socialise online than their parents ever were.",
      focusVi: "'be far more likely to + V than ...' - so sánh xác suất.",
      focusEn: "'be far more likely to + verb than ...' - comparing likelihood.",
      highlight: ["far more likely to", "than their parents ever were"],
    },
  ],
  "p3-compare:evidence": [
    {
      text: "This can be seen in the way my grandparents still visit neighbours, whereas I mostly text mine.",
      focusVi: "'This can be seen in the way + mệnh đề' + 'whereas'.",
      focusEn: "'This can be seen in the way + clause' + 'whereas'.",
      highlight: ["This can be seen in the way", "whereas"],
    },
    {
      text: "Statistics on screen time make the gap between the two generations fairly obvious.",
      focusVi: "'make + tân ngữ + tính từ' (make the gap obvious) - cấu trúc gọn, mạnh.",
      focusEn: "'make + object + adjective' (make the gap obvious) - a compact, strong structure.",
      highlight: ["make the gap", "obvious"],
    },
  ],
  "p3-compare:alternative": [
    {
      text: "That's not to say the older generation avoids technology - many of them use it daily.",
      focusVi: "'That's not to say (that) ...' để tránh khái quát quá đà.",
      focusEn: "'That's not to say (that) ...' to avoid over-generalising.",
      highlight: ["That's not to say"],
    },
    {
      text: "There are, admittedly, plenty of exceptions on both sides of the divide.",
      focusVi: "Chèn 'admittedly' giữa câu + 'on both sides of the divide'.",
      focusEn: "The inserted adverb 'admittedly' + the phrase 'on both sides of the divide'.",
      highlight: ["admittedly", "on both sides"],
    },
  ],
  "p3-compare:conclusion": [
    {
      text: "To sum up, what's changed is the channel, not the underlying need to connect.",
      focusVi: "Câu chẻ 'what's changed is ..., not ...' để chốt so sánh.",
      focusEn: "Cleft 'what's changed is ..., not ...' to close a comparison.",
      highlight: ["what's changed is", "not"],
    },
    {
      text: "Ultimately, the gap is likely to narrow as today's young people grow older.",
      focusVi: "'be likely to narrow' + mệnh đề thời gian 'as + hiện tại đơn'.",
      focusEn: "'be likely to narrow' + a time clause 'as + present simple'.",
      highlight: ["is likely to narrow", "as"],
    },
  ],

  "p3-future:answer": [
    {
      text: "I'd be very surprised if they disappeared altogether within our lifetime.",
      focusVi: "'I'd be surprised if + quá khứ đơn' - dự đoán phủ định lịch sự.",
      focusEn: "'I'd be surprised if + past simple' - a polite negative prediction.",
      highlight: ["I'd be very surprised if", "disappeared"],
    },
    {
      text: "In all likelihood, they'll survive, but in a much smaller form than today.",
      focusVi: "'In all likelihood' + 'will' + so sánh hơn 'much smaller ... than'.",
      focusEn: "'In all likelihood' + 'will' + the comparative 'much smaller ... than'.",
      highlight: ["In all likelihood", "they'll", "much smaller"],
    },
  ],
  "p3-future:reason": [
    {
      text: "That's because people are increasingly buying them as gifts rather than as reading material.",
      focusVi: "Hiện tại tiếp diễn với 'increasingly' để diễn tả xu hướng đang thay đổi.",
      focusEn: "Present continuous with 'increasingly' to express a changing trend.",
      highlight: ["are increasingly buying", "rather than"],
    },
    {
      text: "As long as people enjoy owning physical things, there will always be a market for print.",
      focusVi: "'As long as + hiện tại đơn, there will always be ...' - điều kiện tương lai.",
      focusEn: "'As long as + present simple, there will always be ...' - a future conditional.",
      highlight: ["As long as", "there will always be"],
    },
  ],
  "p3-future:evidence": [
    {
      text: "The fact that vinyl records came back suggests the same could happen with books.",
      focusVi: "'The fact that + mệnh đề' làm chủ ngữ + 'could' cho khả năng.",
      focusEn: "'The fact that + clause' as a subject + 'could' for possibility.",
      highlight: ["The fact that", "could happen"],
    },
    {
      text: "Sales figures over the last five years have actually remained fairly stable.",
      focusVi: "Hiện tại hoàn thành với 'over the last five years' cho xu hướng đến hiện tại.",
      focusEn: "Present perfect with 'over the last five years' for a trend up to now.",
      highlight: ["over the last five years", "have", "remained"],
    },
  ],
  "p3-future:alternative": [
    {
      text: "It's conceivable, of course, that a new generation will simply never pick up a paper book.",
      focusVi: "'It's conceivable that ...' - nêu khả năng trái chiều một cách học thuật.",
      focusEn: "'It's conceivable that ...' - an academic way to raise the opposite possibility.",
      highlight: ["It's conceivable", "that"],
    },
    {
      text: "Were schools to go fully digital, print would certainly lose a huge market overnight.",
      focusVi: "Đảo ngữ điều kiện loại 2: 'Were + S + to V, ... would ...'.",
      focusEn: "Inverted second conditional: 'Were + subject + to verb, ... would ...'.",
      highlight: ["Were schools to go", "would certainly lose"],
    },
  ],
  "p3-future:conclusion": [
    {
      text: "My guess is that print will end up as a niche product rather than a mass one.",
      focusVi: "'My guess is that ...' + 'end up as + danh từ'.",
      focusEn: "'My guess is that ...' + 'end up as + noun'.",
      highlight: ["My guess is that", "end up as"],
    },
    {
      text: "Either way, the format matters far less than whether people keep reading at all.",
      focusVi: "'Either way' + so sánh 'far less than' + mệnh đề 'whether ...'.",
      focusEn: "'Either way' + the comparative 'far less than' + a 'whether' clause.",
      highlight: ["Either way", "far less than", "whether"],
    },
  ],

  "p3-pros-cons:answer": [
    {
      text: "There's a strong case on both sides, though I'd lean towards the benefits.",
      focusVi: "'There's a strong case on both sides' + 'lean towards' để nêu nghiêng về đâu.",
      focusEn: "'There's a strong case on both sides' + 'lean towards' to show your leaning.",
      highlight: ["There's a strong case on both sides", "lean towards"],
    },
    {
      text: "It very much depends on the student, but generally the drawbacks are short-lived.",
      focusVi: "'It very much depends on ...' + 'generally' + tính từ ghép 'short-lived'.",
      focusEn: "'It very much depends on ...' + 'generally' + the compound adjective 'short-lived'.",
      highlight: ["It very much depends on", "short-lived"],
    },
  ],
  "p3-pros-cons:reason": [
    {
      text: "One major benefit is exposure to different teaching styles, which broadens how students think.",
      focusVi: "'One major benefit is ...' + mệnh đề quan hệ 'which broadens ...'.",
      focusEn: "'One major benefit is ...' + a relative clause 'which broadens ...'.",
      highlight: ["One major benefit is", "which broadens"],
    },
    {
      text: "The downside, on the other hand, is that the fees can be prohibitively expensive.",
      focusVi: "'The downside, on the other hand, is that ...' + trạng từ 'prohibitively'.",
      focusEn: "'The downside, on the other hand, is that ...' + the adverb 'prohibitively'.",
      highlight: ["The downside", "on the other hand", "prohibitively"],
    },
  ],
  "p3-pros-cons:evidence": [
    {
      text: "Several of my classmates who studied overseas came back with far better job offers.",
      focusVi: "Mệnh đề quan hệ 'who studied overseas' + so sánh 'far better'.",
      focusEn: "Relative clause 'who studied overseas' + the comparative 'far better'.",
      highlight: ["who studied overseas", "far better"],
    },
    {
      text: "It's worth noting that many families take out loans that take years to repay.",
      focusVi: "'It's worth noting that ...' + phrasal verb 'take out loans'.",
      focusEn: "'It's worth noting that ...' + the phrasal verb 'take out loans'.",
      highlight: ["It's worth noting that", "take out loans"],
    },
  ],
  "p3-pros-cons:alternative": [
    {
      text: "Whether it's worth it or not really comes down to what the student wants afterwards.",
      focusVi: "Mệnh đề 'Whether ... or not' làm chủ ngữ + 'come down to'.",
      focusEn: "A 'Whether ... or not' clause as subject + 'come down to'.",
      highlight: ["Whether it's worth it or not", "comes down to"],
    },
    {
      text: "If universities offered more scholarships, the financial drawback would largely disappear.",
      focusVi: "Điều kiện loại 2 để đề xuất giải pháp cho nhược điểm.",
      focusEn: "Second conditional to propose a solution to the drawback.",
      highlight: ["If universities offered", "would largely disappear"],
    },
  ],
  "p3-pros-cons:conclusion": [
    {
      text: "On the whole, then, the long-term gains tend to justify the short-term costs.",
      focusVi: "Tính từ ghép 'long-term / short-term' + 'justify' để chốt cân bằng.",
      focusEn: "Compound adjectives 'long-term / short-term' + 'justify' for a balanced close.",
      highlight: ["long-term gains", "justify", "short-term costs"],
    },
    {
      text: "In my view, it's worthwhile as long as students go in with realistic expectations.",
      focusVi: "'as long as + hiện tại đơn' - điều kiện, thay cho 'if' để đa dạng.",
      focusEn: "'as long as + present simple' - a conditional linker that varies 'if'.",
      highlight: ["In my view", "as long as"],
    },
  ],
};

export const getStepVariants = (typeId: string, stepId: string): DrillVariant[] =>
  SPEAKING_STEP_VARIANTS[`${typeId}:${stepId}`] ?? [];
