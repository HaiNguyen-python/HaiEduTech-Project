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
  | "closing"
  | "story"
  | "audience"
  | "team"
  | "recovery";

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
  { id: "story", label: "Storytelling & examples", labelVi: "Kể chuyện & ví dụ", emoji: "📖" },
  { id: "audience", label: "Engaging the audience", labelVi: "Tương tác khán giả", emoji: "🤝" },
  { id: "team", label: "Introducing people & products", labelVi: "Giới thiệu người & sản phẩm", emoji: "🧑\u200d🤝\u200d🧑" },
  { id: "recovery", label: "Timing & recovery", labelVi: "Thời lượng & xử lý sự cố", emoji: "🛠️" },
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

  // ---------------- Opening & greeting (more) ----------------
  { id: "op-11", stage: "opening", en: "Hello everyone, I hope you can all hear me clearly.", vi: "Xin chào mọi người, hy vọng mọi người nghe rõ.", example: "Hello everyone, I hope you can all hear me clearly." },
  { id: "op-12", stage: "opening", en: "Let me introduce myself briefly: I'm ... from ...", vi: "Cho tôi giới thiệu ngắn: tôi là ... đến từ ...", example: "Let me introduce myself briefly: I'm Linh from the science club." },
  { id: "op-13", stage: "opening", en: "How many of you have ever ...?", vi: "Bao nhiêu người ở đây từng ...?", example: "How many of you have ever forgotten a word in the middle of a sentence?" },
  { id: "op-14", stage: "opening", en: "I only need ... minutes of your time.", vi: "Tôi chỉ cần ... phút của các bạn.", example: "I only need five minutes of your time." },
  { id: "op-15", stage: "opening", en: "Thank you all for making the time today.", vi: "Cảm ơn mọi người đã dành thời gian hôm nay.", example: "Thank you all for making the time today." },
  { id: "op-16", stage: "opening", en: "Let's start with a word you all know: ...", vi: "Hãy bắt đầu bằng một từ ai cũng biết: ...", example: "Let's start with a word you all know: confidence." },
  { id: "op-17", stage: "opening", en: "There is one thing I'd like you to keep in mind from the start: ...", vi: "Có một điều tôi muốn bạn ghi nhớ từ đầu: ...", example: "There is one thing I'd like you to keep in mind from the start: nobody speaks perfectly." },

  // ---------------- Purpose & agenda (more) ----------------
  { id: "pu-11", stage: "purpose", en: "What I hope to show you today is ...", vi: "Điều tôi mong cho các bạn thấy hôm nay là ...", example: "What I hope to show you today is a simpler way to plan a talk." },
  { id: "pu-12", stage: "purpose", en: "My talk will follow this order: ..., then ..., then ...", vi: "Bài nói của tôi sẽ theo thứ tự: ..., rồi ..., rồi ...", example: "My talk will follow this order: the problem, the idea, then the plan." },
  { id: "pu-13", stage: "purpose", en: "I'd like to focus on three things in particular.", vi: "Tôi muốn tập trung vào ba điều cụ thể.", example: "I'd like to focus on three things in particular." },
  { id: "pu-14", stage: "purpose", en: "I won't cover ... today, because ...", vi: "Hôm nay tôi sẽ không nói về ..., vì ...", example: "I won't cover pricing today, because that deserves its own session." },
  { id: "pu-15", stage: "purpose", en: "Why does this matter? Because ...", vi: "Vì sao điều này quan trọng? Vì ...", example: "Why does this matter? Because most learners quit in the first month." },
  { id: "pu-16", stage: "purpose", en: "There are handouts, so you don't need to write everything down.", vi: "Có tài liệu phát tay, nên bạn không cần ghi hết.", example: "There are handouts, so you don't need to write everything down." },
  { id: "pu-17", stage: "purpose", en: "My goal is to leave you with one clear action.", vi: "Mục tiêu của tôi là để bạn ra về với một hành động rõ ràng.", example: "My goal is to leave you with one clear action." },

  // ---------------- Signposting (more) ----------------
  { id: "si-13", stage: "signposting", en: "First of all, I'd like to look at ...", vi: "Trước hết, tôi muốn xem tới ...", example: "First of all, I'd like to look at where the time goes." },
  { id: "si-14", stage: "signposting", en: "Before I move on, let me quickly recap.", vi: "Trước khi chuyển tiếp, cho tôi tóm lại nhanh.", example: "Before I move on, let me quickly recap." },
  { id: "si-15", stage: "signposting", en: "This is closely linked to what I said about ...", vi: "Điều này liên quan chặt tới điều tôi nói về ...", example: "This is closely linked to what I said about practice time." },
  { id: "si-16", stage: "signposting", en: "With that in mind, let's consider ...", vi: "Với điều đó trong đầu, hãy cân nhắc ...", example: "With that in mind, let's consider the cost." },
  { id: "si-17", stage: "signposting", en: "There's one more thing I need to mention before I finish.", vi: "Còn một điều tôi cần nói trước khi kết thúc.", example: "There's one more thing I need to mention before I finish." },
  { id: "si-18", stage: "signposting", en: "Let me deal with these one at a time.", vi: "Cho tôi giải quyết từng vấn đề một.", example: "Let me deal with these one at a time." },
  { id: "si-19", stage: "signposting", en: "In short, ...", vi: "Nói ngắn gọn, ...", example: "In short, the habit matters more than the method." },
  { id: "si-20", stage: "signposting", en: "So much for ...; now let's see ...", vi: "Vậy là xong phần ...; giờ hãy xem ...", example: "So much for the background; now let's see the results." },

  // ---------------- Data & visuals (more) ----------------
  { id: "da-13", stage: "data", en: "Let me walk you through this table row by row.", vi: "Cho tôi dẫn bạn qua bảng này theo từng dòng.", example: "Let me walk you through this table row by row." },
  { id: "da-14", stage: "data", en: "The blue line represents ..., and the orange line represents ...", vi: "Đường xanh thể hiện ..., đường cam thể hiện ...", example: "The blue line represents this year, and the orange line represents last year." },
  { id: "da-15", stage: "data", en: "There is a clear upward trend here.", vi: "Ở đây có xu hướng tăng rõ rệt.", example: "There is a clear upward trend here." },
  { id: "da-16", stage: "data", en: "The gap between the two groups widened over time.", vi: "Khoảng cách giữa hai nhóm nới rộng theo thời gian.", example: "The gap between the two groups widened over time." },
  { id: "da-17", stage: "data", en: "This figure peaked in ... and then fell back.", vi: "Con số này đạt đỉnh vào ... rồi giảm lại.", example: "This figure peaked in the middle of the term and then fell back." },
  { id: "da-18", stage: "data", en: "Roughly ... out of ... reported the same thing.", vi: "Khoảng ... trong ... người phản hồi giống nhau.", example: "Roughly two out of three learners reported the same thing." },
  { id: "da-19", stage: "data", en: "I'd like to draw your attention to this part of the slide.", vi: "Tôi muốn hướng chú ý của bạn tới phần này trên slide.", example: "I'd like to draw your attention to this part of the slide." },
  { id: "da-20", stage: "data", en: "Please note that these figures are estimates.", vi: "Lưu ý rằng đây là các con số ước tính.", example: "Please note that these figures are estimates." },

  // ---------------- Emphasis & evidence (more) ----------------
  { id: "em-11", stage: "emphasis", en: "I cannot stress this enough: ...", vi: "Tôi không thể nhấn mạnh đủ điều này: ...", example: "I cannot stress this enough: start speaking from day one." },
  { id: "em-12", stage: "emphasis", en: "This is the single biggest reason why ...", vi: "Đây là lý do lớn nhất khiến ...", example: "This is the single biggest reason why learners plateau." },
  { id: "em-13", stage: "emphasis", en: "Notice that ...", vi: "Hãy để ý rằng ...", example: "Notice that the change happens in week two, not week one." },
  { id: "em-14", stage: "emphasis", en: "Take ... as an example.", vi: "Lấy ... làm ví dụ.", example: "Take my evening class as an example." },
  { id: "em-15", stage: "emphasis", en: "What this tells us is ...", vi: "Điều này cho ta biết rằng ...", example: "What this tells us is that feedback speed matters." },
  { id: "em-16", stage: "emphasis", en: "To be perfectly clear, ...", vi: "Nói cho thật rõ, ...", example: "To be perfectly clear, this is not a replacement for a teacher." },
  { id: "em-17", stage: "emphasis", en: "The key difference is ...", vi: "Điểm khác biệt then chốt là ...", example: "The key difference is the amount of speaking time." },
  { id: "em-18", stage: "emphasis", en: "Above all, ...", vi: "Trên hết, ...", example: "Above all, keep the practice short and daily." },

  // ---------------- Questions (more) ----------------
  { id: "qu-12", stage: "questions", en: "Sorry, could you repeat the question a little louder?", vi: "Xin lỗi, bạn nhắc lại câu hỏi to hơn được không?", example: "Sorry, could you repeat the question a little louder?" },
  { id: "qu-13", stage: "questions", en: "Let me answer that in two parts.", vi: "Cho tôi trả lời câu đó theo hai phần.", example: "Let me answer that in two parts." },
  { id: "qu-14", stage: "questions", en: "I'm glad you asked, because it's a common worry.", vi: "Tôi rất vui vì bạn hỏi, vì đó là lo ngại phổ biến.", example: "I'm glad you asked, because it's a common worry." },
  { id: "qu-15", stage: "questions", en: "In my experience, ...", vi: "Theo kinh nghiệm của tôi, ...", example: "In my experience, learners need a routine more than a new app." },
  { id: "qu-16", stage: "questions", en: "That's a valid concern, and the honest answer is ...", vi: "Đó là lo ngại chính đáng, và câu trả lời thật là ...", example: "That's a valid concern, and the honest answer is that it takes discipline." },
  { id: "qu-17", stage: "questions", en: "Anyone else have a question before we finish?", vi: "Còn ai có câu hỏi trước khi kết thúc không?", example: "Anyone else have a question before we finish?" },
  { id: "qu-18", stage: "questions", en: "I'll answer that briefly and we can discuss more afterwards.", vi: "Tôi trả lời ngắn, ta có thể bàn thêm sau.", example: "I'll answer that briefly and we can discuss more afterwards." },

  // ---------------- Closing (more) ----------------
  { id: "cl-11", stage: "closing", en: "Let me finish where I started: ...", vi: "Cho tôi kết ở nơi tôi bắt đầu: ...", example: "Let me finish where I started: the first sentence is the hardest." },
  { id: "cl-12", stage: "closing", en: "That brings me to the end of my presentation.", vi: "Điều đó đưa tôi tới phần cuối bài thuyết trình.", example: "That brings me to the end of my presentation." },
  { id: "cl-13", stage: "closing", en: "So, to recap the key points: ..., ..., and ...", vi: "Vậy, nhắc lại các điểm chính: ..., ..., và ...", example: "So, to recap the key points: practise daily, record yourself, and ask for feedback." },
  { id: "cl-14", stage: "closing", en: "What I'd like you to do next is ...", vi: "Điều tôi muốn bạn làm tiếp theo là ...", example: "What I'd like you to do next is choose one topic and record it tonight." },
  { id: "cl-15", stage: "closing", en: "Thank you for listening so patiently.", vi: "Cảm ơn mọi người đã kiên nhẫn lắng nghe.", example: "Thank you for listening so patiently." },
  { id: "cl-16", stage: "closing", en: "I look forward to hearing your thoughts.", vi: "Tôi rất mong nghe ý kiến của các bạn.", example: "I look forward to hearing your thoughts." },
  { id: "cl-17", stage: "closing", en: "If there's one action to take away, it's this: ...", vi: "Nếu chỉ mang về một hành động, thì đó là: ...", example: "If there's one action to take away, it's this: speak for two minutes every day." },

  // ---------------- Storytelling & examples ----------------
  { id: "st-1", stage: "story", en: "Let me tell you about a student of mine.", vi: "Cho tôi kể về một học sinh của tôi.", example: "Let me tell you about a student of mine." },
  { id: "st-2", stage: "story", en: "It all started when ...", vi: "Mọi chuyện bắt đầu khi ...", example: "It all started when she recorded her first answer." },
  { id: "st-3", stage: "story", en: "At first, ..., but then something changed.", vi: "Ban đầu thì ..., nhưng rồi có điều thay đổi.", example: "At first, she hated listening back, but then something changed." },
  { id: "st-4", stage: "story", en: "To give you a sense of scale, ...", vi: "Để bạn hình dung quy mô, ...", example: "To give you a sense of scale, that is one class every single day." },
  { id: "st-5", stage: "story", en: "Here's what happened next.", vi: "Và đây là điều xảy ra sau đó.", example: "Here's what happened next." },
  { id: "st-6", stage: "story", en: "The lesson I took from that was ...", vi: "Bài học tôi rút ra là ...", example: "The lesson I took from that was to keep the task tiny." },
  { id: "st-7", stage: "story", en: "Think of it like ...", vi: "Hãy hình dung nó giống như ...", example: "Think of it like training for a race, not sitting an exam." },
  { id: "st-8", stage: "story", en: "It's the same as when you ...", vi: "Nó giống như khi bạn ...", example: "It's the same as when you learn to ride a bike." },
  { id: "st-9", stage: "story", en: "That story is not unusual - I hear it often.", vi: "Câu chuyện đó không hề lạ - tôi nghe thường xuyên.", example: "That story is not unusual - I hear it often." },
  { id: "st-10", stage: "story", en: "Let me put a face to that number.", vi: "Cho tôi đặt một con người vào con số đó.", example: "Let me put a face to that number." },

  // ---------------- Engaging the audience ----------------
  { id: "au-1", stage: "audience", en: "Put your hand up if ...", vi: "Hãy giơ tay nếu ...", example: "Put your hand up if you have ever felt nervous on stage." },
  { id: "au-2", stage: "audience", en: "Turn to the person next to you and ...", vi: "Hãy quay sang người bên cạnh và ...", example: "Turn to the person next to you and share one goal." },
  { id: "au-3", stage: "audience", en: "What would you do in that situation?", vi: "Bạn sẽ làm gì trong tình huống đó?", example: "What would you do in that situation?" },
  { id: "au-4", stage: "audience", en: "Let's do a quick show of hands.", vi: "Hãy cùng giơ tay nhanh một lượt.", example: "Let's do a quick show of hands." },
  { id: "au-5", stage: "audience", en: "I'm curious - what comes to mind when you hear ...?", vi: "Tôi tò mò - bạn nghĩ tới gì khi nghe ...?", example: "I'm curious - what comes to mind when you hear the word fluency?" },
  { id: "au-6", stage: "audience", en: "Take a moment to think about your own ...", vi: "Hãy dành một chút nghĩ về ... của chính bạn.", example: "Take a moment to think about your own study routine." },
  { id: "au-7", stage: "audience", en: "Does that sound familiar to anyone?", vi: "Điều đó có quen với ai không?", example: "Does that sound familiar to anyone?" },
  { id: "au-8", stage: "audience", en: "Feel free to shout out your answer.", vi: "Cứ nói to câu trả lời của bạn.", example: "Feel free to shout out your answer." },
  { id: "au-9", stage: "audience", en: "I'll pause here so you can note that down.", vi: "Tôi dừng ở đây để bạn ghi lại.", example: "I'll pause here so you can note that down." },
  { id: "au-10", stage: "audience", en: "Keep that question in mind while I explain ...", vi: "Hãy giữ câu hỏi đó trong đầu khi tôi giải thích ...", example: "Keep that question in mind while I explain the next slide." },

  // ---------------- Introducing people & products ----------------
  { id: "te-1", stage: "team", en: "I'd like to introduce my teammate, ..., who works on ...", vi: "Tôi muốn giới thiệu đồng đội của tôi, ..., người phụ trách ...", example: "I'd like to introduce my teammate, Minh, who works on the lessons." },
  { id: "te-2", stage: "team", en: "I'll now hand over to ...", vi: "Giờ tôi xin chuyển lời cho ...", example: "I'll now hand over to my colleague for the demo." },
  { id: "te-3", stage: "team", en: "Thank you, ... I'll take it from here.", vi: "Cảm ơn ... Tôi xin tiếp tục từ đây.", example: "Thank you, Minh. I'll take it from here." },
  { id: "te-4", stage: "team", en: "Our team brings together ... and ...", vi: "Đội của chúng tôi kết hợp ... và ...", example: "Our team brings together teachers and engineers." },
  { id: "te-5", stage: "team", en: "In a nutshell, our product helps ... to ...", vi: "Nói gọn, sản phẩm của chúng tôi giúp ... làm ...", example: "In a nutshell, our product helps learners to speak every day." },
  { id: "te-6", stage: "team", en: "What makes it different is ...", vi: "Điều làm nó khác biệt là ...", example: "What makes it different is the instant feedback." },
  { id: "te-7", stage: "team", en: "Let me show you a short demo.", vi: "Cho tôi trình diễn nhanh một chút.", example: "Let me show you a short demo." },
  { id: "te-8", stage: "team", en: "This is how it works in three steps.", vi: "Đây là cách nó hoạt động qua ba bước.", example: "This is how it works in three steps." },
  { id: "te-9", stage: "team", en: "We built this because ...", vi: "Chúng tôi làm điều này vì ...", example: "We built this because our own students asked for it." },
  { id: "te-10", stage: "team", en: "If you'd like to try it, ...", vi: "Nếu bạn muốn thử, ...", example: "If you'd like to try it, come and see us after the session." },

  // ---------------- Timing & recovery ----------------
  { id: "re-1", stage: "recovery", en: "I'm aware of the time, so I'll keep this brief.", vi: "Tôi để ý thời gian, nên sẽ nói ngắn gọn.", example: "I'm aware of the time, so I'll keep this brief." },
  { id: "re-2", stage: "recovery", en: "Since we're short of time, I'll skip ahead to ...", vi: "Vì ít thời gian, tôi xin nhảy tới ...", example: "Since we're short of time, I'll skip ahead to the results." },
  { id: "re-3", stage: "recovery", en: "Sorry, let me rephrase that.", vi: "Xin lỗi, cho tôi nói lại cách khác.", example: "Sorry, let me rephrase that." },
  { id: "re-4", stage: "recovery", en: "Where was I? Ah yes, ...", vi: "Tôi đang nói tới đâu nhỉ? À vâng, ...", example: "Where was I? Ah yes, the second reason." },
  { id: "re-5", stage: "recovery", en: "Bear with me for a second while I fix this.", vi: "Xin chờ tôi một giây để xử lý chỗ này.", example: "Bear with me for a second while I fix this." },
  { id: "re-6", stage: "recovery", en: "The slide isn't loading, so let me just explain it.", vi: "Slide chưa hiện, nên cho tôi giải thích bằng lời.", example: "The slide isn't loading, so let me just explain it." },
  { id: "re-7", stage: "recovery", en: "Can everyone at the back still see the screen?", vi: "Mọi người phía sau còn thấy màn hình không?", example: "Can everyone at the back still see the screen?" },
  { id: "re-8", stage: "recovery", en: "I've got about ... minutes left, so I'll focus on ...", vi: "Tôi còn khoảng ... phút, nên sẽ tập trung vào ...", example: "I've got about two minutes left, so I'll focus on the main point." },
  { id: "re-9", stage: "recovery", en: "Let me come back to that if we have time.", vi: "Cho tôi quay lại điều đó nếu còn thời gian.", example: "Let me come back to that if we have time." },
  { id: "re-10", stage: "recovery", en: "Thank you for your patience.", vi: "Cảm ơn mọi người đã kiên nhẫn.", example: "Thank you for your patience." },
];

/** Phrases for one stage. */
export const phrasesByStage = (stage: PresentationStageId): PresentationPhrase[] =>
  PRESENTATION_PHRASES.filter((p) => p.stage === stage);

/** Strip the blank-slot markers so a phrase can be matched or spoken. */
export const phraseCore = (en: string): string =>
  en.replace(/\.\.\./g, " ").replace(/\s+/g, " ").trim();
