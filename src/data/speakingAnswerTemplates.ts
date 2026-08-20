/**
 * @file speakingAnswerTemplates.ts
 * @description Structured answer frameworks for IELTS Speaking Part 1/2/3.
 *   Each part has a named framework (PREP / cue-card blocks / AREA + Balance)
 *   split into timed steps with band 7.0+ sentence starters students can lean on.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface TemplateStep {
  id: string;
  labelVi: string;
  labelEn: string;
  goalVi: string;
  goalEn: string;
  starters: string[];
  seconds: number;
  placeholderVi: string;
  placeholderEn: string;
}

export interface SpeakingTemplate {
  name: string;
  taglineVi: string;
  taglineEn: string;
  totalSecondsLabel: string;
  steps: TemplateStep[];
}

const PART1: SpeakingTemplate = {
  name: "PREP",
  taglineVi: "Point - Reason - Example - Personal twist (2-4 câu, 20-30 giây)",
  taglineEn: "Point - Reason - Example - Personal twist (2-4 sentences, 20-30s)",
  totalSecondsLabel: "20-30s",
  steps: [
    {
      id: "point",
      labelVi: "P - Trả lời trực tiếp",
      labelEn: "P - Point (direct answer)",
      goalVi: "Trả lời thẳng câu hỏi trong 1 câu, không lan man.",
      goalEn: "Answer the question directly in one clear sentence.",
      starters: [
        "Yes, definitely - I'd say ...",
        "Not really, to be honest. I'd rather ...",
        "It's actually something I do quite often, ...",
      ],
      seconds: 6,
      placeholderVi: "Câu trả lời trực tiếp của bạn...",
      placeholderEn: "Your direct answer...",
    },
    {
      id: "reason",
      labelVi: "R - Lý do",
      labelEn: "R - Reason",
      goalVi: "Giải thích vì sao, dùng liên từ (because, mainly because, the reason is).",
      goalEn: "Explain why, using linkers (because, mainly because, the reason is).",
      starters: [
        "mainly because ...",
        "The main reason is that ...",
        "That's largely down to the fact that ...",
      ],
      seconds: 8,
      placeholderVi: "Vì sao bạn nghĩ vậy...",
      placeholderEn: "Why you feel that way...",
    },
    {
      id: "example",
      labelVi: "E - Ví dụ ngắn",
      labelEn: "E - Example",
      goalVi: "Một ví dụ cụ thể từ trải nghiệm cá nhân (1 câu).",
      goalEn: "One concrete example from your own life (1 sentence).",
      starters: [
        "For instance, just last weekend I ...",
        "A good example would be ...",
        "Take yesterday, for example - I ...",
      ],
      seconds: 8,
      placeholderVi: "Ví dụ cụ thể...",
      placeholderEn: "A concrete example...",
    },
    {
      id: "twist",
      labelVi: "P - Cảm nhận / so sánh nhỏ",
      labelEn: "P - Personal twist",
      goalVi: "Thêm cảm nhận hoặc so sánh nhỏ để câu trả lời không bị cụt.",
      goalEn: "Add a feeling or small comparison so the answer does not end abruptly.",
      starters: [
        "So overall, it's something I really look forward to.",
        "That said, I used to enjoy it far more when I was younger.",
        "Compared with most of my friends, I'm probably a bit unusual in that respect.",
      ],
      seconds: 6,
      placeholderVi: "Cảm nhận hoặc so sánh...",
      placeholderEn: "Feeling or comparison...",
    },
  ],
};

const PART2: SpeakingTemplate = {
  name: "Cue-card blocks",
  taglineVi: "Intro - Details - Story/Why - Feeling & Wrap-up (nói 1.5-2 phút)",
  taglineEn: "Intro - Details - Story/Why - Feeling & Wrap-up (speak 1.5-2 minutes)",
  totalSecondsLabel: "90-120s",
  steps: [
    {
      id: "intro",
      labelVi: "1. Mở bài (paraphrase đề)",
      labelEn: "1. Intro (paraphrase the prompt)",
      goalVi: "Nhắc lại đề bằng từ của mình + nêu bạn sẽ nói về cái gì.",
      goalEn: "Paraphrase the task and name what you will talk about.",
      starters: [
        "I'd like to talk about ...",
        "The first thing that came to mind was ...",
        "There are a few things I could mention, but I'll focus on ...",
      ],
      seconds: 10,
      placeholderVi: "Tôi sẽ nói về...",
      placeholderEn: "I'd like to talk about...",
    },
    {
      id: "details",
      labelVi: "2. Chi tiết (What / When / Where / Who)",
      labelEn: "2. Details (What / When / Where / Who)",
      goalVi: "Trả lời các gạch đầu dòng đầu của cue card bằng chi tiết cụ thể.",
      goalEn: "Cover the first cue-card bullets with concrete details.",
      starters: [
        "It happened about two years ago, when I was ...",
        "To give you some background, ...",
        "I was with ..., and the whole thing took place in ...",
      ],
      seconds: 25,
      placeholderVi: "Chi tiết: khi nào, ở đâu, với ai...",
      placeholderEn: "Details: when, where, who...",
    },
    {
      id: "story",
      labelVi: "3. Câu chuyện / Vì sao quan trọng (phần dài nhất)",
      labelEn: "3. Story / Why it matters (longest part)",
      goalVi: "Kể diễn biến và lý do đáng nhớ - đây là phần chiếm nhiều thời gian nhất.",
      goalEn: "Narrate what happened and why it stood out - spend most time here.",
      starters: [
        "What really stood out for me was ...",
        "The turning point came when ...",
        "It mattered to me because ...",
      ],
      seconds: 45,
      placeholderVi: "Diễn biến, chi tiết đáng nhớ, vì sao quan trọng...",
      placeholderEn: "What happened, memorable details, why it matters...",
    },
    {
      id: "wrap",
      labelVi: "4. Cảm xúc + Chốt bài",
      labelEn: "4. Feeling + Wrap-up",
      goalVi: "Nêu cảm xúc hiện tại và chốt bằng 1 câu tổng kết.",
      goalEn: "State how you feel now and close with one summary sentence.",
      starters: [
        "Looking back, I feel incredibly grateful for ...",
        "All in all, it's an experience I'll never forget.",
        "That's why, whenever someone asks me about ..., this is the story I tell.",
      ],
      seconds: 15,
      placeholderVi: "Cảm xúc và câu chốt...",
      placeholderEn: "Feeling and closing line...",
    },
  ],
};

const PART3: SpeakingTemplate = {
  name: "AREA + Balance",
  taglineVi: "Answer - Reason - Example - Alternative view - Conclusion (3-5 câu, 40-60 giây)",
  taglineEn: "Answer - Reason - Example - Alternative view - Conclusion (3-5 sentences, 40-60s)",
  totalSecondsLabel: "40-60s",
  steps: [
    {
      id: "answer",
      labelVi: "A - Quan điểm",
      labelEn: "A - Answer (your position)",
      goalVi: "Nêu quan điểm rõ ràng, có thể dùng cách nói dè dặt (hedging).",
      goalEn: "State a clear position, hedging where useful.",
      starters: [
        "I'd argue that ...",
        "On the whole, I tend to think ...",
        "It largely depends on ..., but generally ...",
      ],
      seconds: 8,
      placeholderVi: "Quan điểm của bạn...",
      placeholderEn: "Your position...",
    },
    {
      id: "reason",
      labelVi: "R - Lý do / lập luận",
      labelEn: "R - Reason (argument)",
      goalVi: "Giải thích cơ chế nhân - quả, không chỉ nhắc lại quan điểm.",
      goalEn: "Explain the cause-effect mechanism, not just repeat the opinion.",
      starters: [
        "This is largely because ...",
        "One key factor here is that ...",
        "The knock-on effect of that is ...",
      ],
      seconds: 14,
      placeholderVi: "Lý do, phân tích nguyên nhân - kết quả...",
      placeholderEn: "Reason, cause-effect analysis...",
    },
    {
      id: "evidence",
      labelVi: "E - Ví dụ / dẫn chứng",
      labelEn: "E - Example / Evidence",
      goalVi: "Dẫn chứng xã hội, số liệu ước lượng hoặc so sánh giữa các nước / thế hệ.",
      goalEn: "Use a societal example, rough figures, or a country/generation comparison.",
      starters: [
        "In Vietnam, for example, ...",
        "A clear illustration of this is ...",
        "Compared with a decade ago, ...",
      ],
      seconds: 14,
      placeholderVi: "Dẫn chứng cụ thể...",
      placeholderEn: "Concrete evidence...",
    },
    {
      id: "alternative",
      labelVi: "A - Góc nhìn đối lập (cân bằng)",
      labelEn: "A - Alternative view (balance)",
      goalVi: "Nêu quan điểm ngược lại rồi bảo vệ ý mình - đây là điểm cộng Band 7+.",
      goalEn: "Acknowledge the opposite view, then defend yours - a Band 7+ move.",
      starters: [
        "That said, some people argue that ...",
        "Having said that, there's a counter-argument that ...",
        "Of course, it isn't quite that simple, since ...",
      ],
      seconds: 12,
      placeholderVi: "Ý kiến ngược lại và phản biện...",
      placeholderEn: "Opposite view and your rebuttal...",
    },
    {
      id: "conclusion",
      labelVi: "C - Kết luận",
      labelEn: "C - Conclusion",
      goalVi: "Chốt lại quan điểm trong 1 câu ngắn gọn.",
      goalEn: "Close by restating your stance in one concise sentence.",
      starters: [
        "So on balance, I'd still say ...",
        "Ultimately, it comes down to ...",
        "For those reasons, I'm convinced that ...",
      ],
      seconds: 8,
      placeholderVi: "Câu kết luận...",
      placeholderEn: "Closing sentence...",
    },
  ],
};

/** One-minute planning checklist shown for Part 2 cue cards. */
export const PART2_PLANNING_HINTS: { vi: string; en: string }[] = [
  { vi: "Ý 1 - What: chọn nhanh 1 chủ đề, đừng đổi ý", en: "Bullet 1 - What: pick one topic fast, do not switch" },
  { vi: "Ý 2 - When/Where: 2-3 từ khóa hoàn cảnh", en: "Bullet 2 - When/Where: 2-3 setting keywords" },
  { vi: "Ý 3 - Why/Story: 1 chi tiết đáng nhớ nhất", en: "Bullet 3 - Why/Story: your single best detail" },
  { vi: "Ý 4 - Feeling: 1 tính từ mạnh + câu chốt", en: "Bullet 4 - Feeling: one strong adjective + closing line" },
];

export const getSpeakingTemplate = (part: 1 | 2 | 3): SpeakingTemplate =>
  part === 1 ? PART1 : part === 2 ? PART2 : PART3;
