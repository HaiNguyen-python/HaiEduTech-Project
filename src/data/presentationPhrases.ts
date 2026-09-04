/**
 * @file presentationPhrases.ts
 * @description Bank of high-frequency phrases and sentence patterns used in real
 *   presentations, grouped by presentation stage. Used by the Presentation &
 *   Public Speaking Studio phrase bank so learners rehearse the language of a
 *   talk, not just the delivery.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type PresentationStageId =
  | "opening"
  | "purpose"
  | "signposting"
  | "data"
  | "emphasis"
  | "questions"
  | "closing";

export interface PresentationStage {
  id: PresentationStageId;
  label: string;
  labelVi: string;
  emoji: string;
}

export interface PresentationPhrase {
  id: string;
  stage: PresentationStageId;
  /** English pattern with a blank slot for the learner's own content. */
  en: string;
  /** Short Vietnamese meaning. */
  vi: string;
  /** One example sentence in context. */
  example: string;
}

export const PRESENTATION_STAGES: PresentationStage[] = [
  { id: "opening", label: "Opening & greeting", labelVi: "Mở đầu & chào hỏi", emoji: "👋" },
  { id: "purpose", label: "Purpose & agenda", labelVi: "Mục đích & dàn ý", emoji: "🎯" },
  { id: "signposting", label: "Signposting & transitions", labelVi: "Dẫn dắt & chuyển ý", emoji: "🧭" },
  { id: "data", label: "Data & visuals", labelVi: "Số liệu & hình ảnh", emoji: "📊" },
  { id: "emphasis", label: "Emphasis & evidence", labelVi: "Nhấn mạnh & dẫn chứng", emoji: "⭐" },
  { id: "questions", label: "Questions & objections", labelVi: "Câu hỏi & phản biện", emoji: "🙋" },
  { id: "closing", label: "Closing & call to action", labelVi: "Kết bài & kêu gọi", emoji: "🏁" },
];

export const PRESENTATION_PHRASES: PresentationPhrase[] = [
  // ---------------- Opening & greeting ----------------
  { id: "op-1", stage: "opening", en: "Good morning, everyone, and thank you for joining me today.", vi: "Chào buổi sáng mọi người, cảm ơn đã tham dự.", example: "Good morning, everyone, and thank you for joining me today." },
  { id: "op-2", stage: "opening", en: "For those who don't know me, my name is ... and I work on ...", vi: "Với ai chưa biết tôi, tôi tên là ... và tôi làm về ...", example: "For those who don't know me, my name is Hai and I work on learning technology." },
  { id: "op-3", stage: "opening", en: "Before I start, let me ask you a quick question: ...", vi: "Trước khi bắt đầu, cho tôi hỏi nhanh một câu: ...", example: "Before I start, let me ask you a quick question: how many of you learn a language on your phone?" },
  { id: "op-4", stage: "opening", en: "I'd like to open with a short story about ...", vi: "Tôi muốn mở đầu bằng một câu chuyện ngắn về ...", example: "I'd like to open with a short story about my first classroom." },
  { id: "op-5", stage: "opening", en: "Imagine for a moment that ...", vi: "Hãy tưởng tượng trong giây lát rằng ...", example: "Imagine for a moment that every student had a private tutor." },
  { id: "op-6", stage: "opening", en: "It's a real pleasure to be here at ...", vi: "Thật vinh dự khi được có mặt tại ...", example: "It's a real pleasure to be here at the annual education forum." },
  { id: "op-7", stage: "opening", en: "Thank you for the kind introduction.", vi: "Cảm ơn lời giới thiệu tốt đẹp.", example: "Thank you for the kind introduction." },
  { id: "op-8", stage: "opening", en: "Today I want to talk about something that affects all of us: ...", vi: "Hôm nay tôi muốn nói về điều ảnh hưởng tới tất cả chúng ta: ...", example: "Today I want to talk about something that affects all of us: how we learn." },
  { id: "op-9", stage: "opening", en: "Let me begin by setting the scene.", vi: "Cho tôi bắt đầu bằng việc dựng bối cảnh.", example: "Let me begin by setting the scene." },
  { id: "op-10", stage: "opening", en: "I'll keep this short - about ... minutes - and leave time for questions.", vi: "Tôi sẽ nói ngắn gọn - khoảng ... phút - và dành thời gian cho câu hỏi.", example: "I'll keep this short - about ten minutes - and leave time for questions." },

  // ---------------- Purpose & agenda ----------------
  { id: "pu-1", stage: "purpose", en: "The purpose of my talk today is to ...", vi: "Mục đích bài nói hôm nay của tôi là ...", example: "The purpose of my talk today is to show why speaking practice matters most." },
  { id: "pu-2", stage: "purpose", en: "By the end of this presentation, you'll be able to ...", vi: "Kết thúc bài này, bạn sẽ có thể ...", example: "By the end of this presentation, you'll be able to design your own study plan." },
  { id: "pu-3", stage: "purpose", en: "I've divided my talk into three main parts.", vi: "Tôi chia bài nói thành ba phần chính.", example: "I've divided my talk into three main parts." },
  { id: "pu-4", stage: "purpose", en: "First, I'll ...; second, I'll ...; and finally, I'll ...", vi: "Đầu tiên tôi sẽ ...; thứ hai tôi sẽ ...; và cuối cùng tôi sẽ ...", example: "First, I'll describe the problem; second, I'll show our solution; and finally, I'll share the next steps." },
  { id: "pu-5", stage: "purpose", en: "My key message today is simple: ...", vi: "Thông điệp chính hôm nay rất đơn giản: ...", example: "My key message today is simple: practice beats theory." },
  { id: "pu-6", stage: "purpose", en: "This talk is aimed at ..., so I'll keep the technical detail light.", vi: "Bài nói này hướng tới ..., nên tôi sẽ hạn chế chi tiết kỹ thuật.", example: "This talk is aimed at teachers, so I'll keep the technical detail light." },
  { id: "pu-7", stage: "purpose", en: "Feel free to interrupt me if anything is unclear.", vi: "Hãy ngắt lời tôi nếu có gì chưa rõ.", example: "Feel free to interrupt me if anything is unclear." },
  { id: "pu-8", stage: "purpose", en: "I'll take questions at the end, if that's alright.", vi: "Tôi sẽ nhận câu hỏi ở cuối, nếu mọi người đồng ý.", example: "I'll take questions at the end, if that's alright." },
  { id: "pu-9", stage: "purpose", en: "Here's a quick look at what we'll cover.", vi: "Đây là phần tóm lược những gì chúng ta sẽ đi qua.", example: "Here's a quick look at what we'll cover." },
  { id: "pu-10", stage: "purpose", en: "The question I want to answer is: ...", vi: "Câu hỏi tôi muốn trả lời là: ...", example: "The question I want to answer is: why do learners give up in week three?" },

  // ---------------- Signposting & transitions ----------------
  { id: "si-1", stage: "signposting", en: "To begin with, let's look at ...", vi: "Trước tiên, hãy cùng xem ...", example: "To begin with, let's look at the size of the problem." },
  { id: "si-2", stage: "signposting", en: "That brings me to my next point, which is ...", vi: "Điều đó dẫn tôi tới điểm tiếp theo, đó là ...", example: "That brings me to my next point, which is cost." },
  { id: "si-3", stage: "signposting", en: "Moving on to ...", vi: "Chuyển sang ...", example: "Moving on to how the product actually works." },
  { id: "si-4", stage: "signposting", en: "Let's turn to ...", vi: "Hãy chuyển sang ...", example: "Let's turn to the results from the pilot classes." },
  { id: "si-5", stage: "signposting", en: "Now that we've covered ..., let's look at ...", vi: "Sau khi đã nói về ..., hãy xem tới ...", example: "Now that we've covered the problem, let's look at the solution." },
  { id: "si-6", stage: "signposting", en: "I'd like to expand on that for a moment.", vi: "Tôi muốn nói rộng thêm một chút về điều đó.", example: "I'd like to expand on that for a moment." },
  { id: "si-7", stage: "signposting", en: "As I mentioned earlier, ...", vi: "Như tôi đã đề cập trước đó, ...", example: "As I mentioned earlier, speaking time is the bottleneck." },
  { id: "si-8", stage: "signposting", en: "I'll come back to this point later.", vi: "Tôi sẽ quay lại điểm này sau.", example: "I'll come back to this point later." },
  { id: "si-9", stage: "signposting", en: "Let me put this in context.", vi: "Cho tôi đặt điều này vào bối cảnh.", example: "Let me put this in context." },
  { id: "si-10", stage: "signposting", en: "So far we've seen ...; the next question is ...", vi: "Đến giờ chúng ta đã thấy ...; câu hỏi tiếp theo là ...", example: "So far we've seen where learners struggle; the next question is what we can change." },
  { id: "si-11", stage: "signposting", en: "On the other hand, ...", vi: "Mặt khác, ...", example: "On the other hand, small classes are harder to scale." },
  { id: "si-12", stage: "signposting", en: "This leads me to the heart of my argument.", vi: "Điều này dẫn tôi tới trọng tâm lập luận.", example: "This leads me to the heart of my argument." },

  // ---------------- Data & visuals ----------------
  { id: "da-1", stage: "data", en: "As you can see on this slide, ...", vi: "Như bạn thấy trên slide này, ...", example: "As you can see on this slide, the two lines cross in the middle of the year." },
  { id: "da-2", stage: "data", en: "The horizontal axis shows ..., and the vertical axis shows ...", vi: "Trục ngang thể hiện ..., trục dọc thể hiện ...", example: "The horizontal axis shows the month, and the vertical axis shows active learners." },
  { id: "da-3", stage: "data", en: "This chart compares ... with ...", vi: "Biểu đồ này so sánh ... với ...", example: "This chart compares self-study hours with class hours." },
  { id: "da-4", stage: "data", en: "The figure rose sharply from ... to ...", vi: "Con số tăng mạnh từ ... lên ...", example: "The figure rose sharply from the first term to the second." },
  { id: "da-5", stage: "data", en: "There was a steady decline over the period.", vi: "Có sự giảm đều trong giai đoạn này.", example: "There was a steady decline over the period." },
  { id: "da-6", stage: "data", en: "The numbers levelled off towards the end.", vi: "Các con số đi ngang về cuối giai đoạn.", example: "The numbers levelled off towards the end." },
  { id: "da-7", stage: "data", en: "What stands out here is ...", vi: "Điều nổi bật ở đây là ...", example: "What stands out here is the gap between the two groups." },
  { id: "da-8", stage: "data", en: "To put that number in perspective, ...", vi: "Để dễ hình dung con số đó, ...", example: "To put that number in perspective, that is one extra lesson every week." },
  { id: "da-9", stage: "data", en: "The takeaway from this slide is ...", vi: "Điều cần nhớ từ slide này là ...", example: "The takeaway from this slide is that early practice predicts the final score." },
  { id: "da-10", stage: "data", en: "I won't read every number - the pattern is what matters.", vi: "Tôi sẽ không đọc từng con số - điều quan trọng là xu hướng.", example: "I won't read every number - the pattern is what matters." },
  { id: "da-11", stage: "data", en: "If we zoom in on ..., a clearer picture appears.", vi: "Nếu phóng to vào ..., ta thấy bức tranh rõ hơn.", example: "If we zoom in on the first month, a clearer picture appears." },
  { id: "da-12", stage: "data", en: "These figures come from ...", vi: "Những số liệu này lấy từ ...", example: "These figures come from our own classroom records." },

  // ---------------- Emphasis & evidence ----------------
  { id: "em-1", stage: "emphasis", en: "The point I want to stress is ...", vi: "Điểm tôi muốn nhấn mạnh là ...", example: "The point I want to stress is that consistency beats intensity." },
  { id: "em-2", stage: "emphasis", en: "What's really important here is ...", vi: "Điều thực sự quan trọng ở đây là ...", example: "What's really important here is the daily habit." },
  { id: "em-3", stage: "emphasis", en: "Let me say that again, because it matters: ...", vi: "Cho tôi nhắc lại, vì điều này quan trọng: ...", example: "Let me say that again, because it matters: fifteen minutes a day is enough." },
  { id: "em-4", stage: "emphasis", en: "Evidence for this comes from ...", vi: "Dẫn chứng cho điều này đến từ ...", example: "Evidence for this comes from our pilot with two classes." },
  { id: "em-5", stage: "emphasis", en: "Let me give you a concrete example.", vi: "Cho tôi đưa ra một ví dụ cụ thể.", example: "Let me give you a concrete example." },
  { id: "em-6", stage: "emphasis", en: "In practice, this means ...", vi: "Trên thực tế, điều này nghĩa là ...", example: "In practice, this means one short recording every evening." },
  { id: "em-7", stage: "emphasis", en: "There are two reasons for this. First, ... Second, ...", vi: "Có hai lý do. Thứ nhất, ... Thứ hai, ...", example: "There are two reasons for this. First, feedback is instant. Second, the learner controls the pace." },
  { id: "em-8", stage: "emphasis", en: "This is not just theory - we tested it with ...", vi: "Đây không chỉ là lý thuyết - chúng tôi đã thử với ...", example: "This is not just theory - we tested it with our own students." },
  { id: "em-9", stage: "emphasis", en: "It's worth noting that ...", vi: "Đáng lưu ý là ...", example: "It's worth noting that the effect was strongest for beginners." },
  { id: "em-10", stage: "emphasis", en: "If you remember one thing today, remember this: ...", vi: "Nếu chỉ nhớ một điều hôm nay, hãy nhớ điều này: ...", example: "If you remember one thing today, remember this: speak before you feel ready." },

  // ---------------- Questions & objections ----------------
  { id: "qu-1", stage: "questions", en: "That's a great question, thank you.", vi: "Đó là câu hỏi rất hay, cảm ơn bạn.", example: "That's a great question, thank you." },
  { id: "qu-2", stage: "questions", en: "So, if I understand correctly, you're asking ...", vi: "Nếu tôi hiểu đúng, bạn đang hỏi ...", example: "So, if I understand correctly, you're asking about cost per class." },
  { id: "qu-3", stage: "questions", en: "Let me repeat the question for everyone at the back.", vi: "Cho tôi nhắc lại câu hỏi cho mọi người phía sau.", example: "Let me repeat the question for everyone at the back." },
  { id: "qu-4", stage: "questions", en: "I don't have that figure to hand, but I'll follow up after the session.", vi: "Tôi chưa có số liệu đó ngay, tôi sẽ gửi lại sau buổi này.", example: "I don't have that figure to hand, but I'll follow up after the session." },
  { id: "qu-5", stage: "questions", en: "That's outside the scope of today's talk, but briefly ...", vi: "Điều đó ngoài phạm vi bài nói hôm nay, nhưng nói ngắn gọn ...", example: "That's outside the scope of today's talk, but briefly, we do plan to support more languages." },
  { id: "qu-6", stage: "questions", en: "I see your concern, and here's how we handle it.", vi: "Tôi hiểu lo ngại của bạn, và đây là cách chúng tôi xử lý.", example: "I see your concern, and here's how we handle it." },
  { id: "qu-7", stage: "questions", en: "That ties into my earlier point about ...", vi: "Điều đó liên quan tới điểm tôi nói trước về ...", example: "That ties into my earlier point about learner motivation." },
  { id: "qu-8", stage: "questions", en: "Does that answer your question?", vi: "Câu trả lời đó đã đủ cho bạn chưa?", example: "Does that answer your question?" },
  { id: "qu-9", stage: "questions", en: "I'd like to push back on that gently, because ...", vi: "Tôi xin phản biện nhẹ điều đó, vì ...", example: "I'd like to push back on that gently, because our data shows the opposite." },
  { id: "qu-10", stage: "questions", en: "Let's take that offline so we can go into detail.", vi: "Mình bàn riêng chuyện đó để đi sâu hơn nhé.", example: "Let's take that offline so we can go into detail." },
  { id: "qu-11", stage: "questions", en: "You raise a fair point, and I'd add that ...", vi: "Bạn nêu một điểm hợp lý, tôi xin bổ sung rằng ...", example: "You raise a fair point, and I'd add that teachers still guide every step." },

  // ---------------- Closing & call to action ----------------
  { id: "cl-1", stage: "closing", en: "Let me summarise the three main points.", vi: "Cho tôi tóm tắt ba điểm chính.", example: "Let me summarise the three main points." },
  { id: "cl-2", stage: "closing", en: "To sum up, ...", vi: "Tóm lại, ...", example: "To sum up, small daily practice changes the outcome." },
  { id: "cl-3", stage: "closing", en: "In conclusion, ...", vi: "Kết luận lại, ...", example: "In conclusion, the tool works best beside a teacher, not instead of one." },
  { id: "cl-4", stage: "closing", en: "So where does that leave us?", vi: "Vậy điều đó đưa chúng ta tới đâu?", example: "So where does that leave us?" },
  { id: "cl-5", stage: "closing", en: "My ask today is simple: ...", vi: "Điều tôi mong hôm nay rất đơn giản: ...", example: "My ask today is simple: give us one class to run a pilot." },
  { id: "cl-6", stage: "closing", en: "The next step I'd like to propose is ...", vi: "Bước tiếp theo tôi muốn đề xuất là ...", example: "The next step I'd like to propose is a four-week trial." },
  { id: "cl-7", stage: "closing", en: "If you'd like to know more, you can reach me at ...", vi: "Nếu muốn biết thêm, bạn có thể liên hệ tôi tại ...", example: "If you'd like to know more, you can reach me after the session." },
  { id: "cl-8", stage: "closing", en: "Thank you for your time and attention.", vi: "Cảm ơn thời gian và sự chú ý của mọi người.", example: "Thank you for your time and attention." },
  { id: "cl-9", stage: "closing", en: "I'm happy to take any questions now.", vi: "Tôi rất vui được nhận câu hỏi bây giờ.", example: "I'm happy to take any questions now." },
  { id: "cl-10", stage: "closing", en: "I'd like to leave you with one thought: ...", vi: "Tôi muốn để lại cho các bạn một suy nghĩ: ...", example: "I'd like to leave you with one thought: the first sentence is always the hardest." },
];

/** Phrases for one stage. */
export const phrasesByStage = (stage: PresentationStageId): PresentationPhrase[] =>
  PRESENTATION_PHRASES.filter((p) => p.stage === stage);

/** Strip the blank-slot markers so a phrase can be matched or spoken. */
export const phraseCore = (en: string): string =>
  en.replace(/\.\.\./g, " ").replace(/\s+/g, " ").trim();
