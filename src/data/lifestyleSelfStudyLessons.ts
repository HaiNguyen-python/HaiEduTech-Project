/**
 * @file lifestyleSelfStudyLessons.ts
 * @description Fifth pillar of the Lifestyle Academy: Self-Study Skills.
 *              15 bilingual lessons across foundation / intermediate / mastery,
 *              each with a named framework, concrete drill, reflection prompt,
 *              "why it matters" context and a deep-dive narrative.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleLesson } from "./lifestyleAcademyLessons";

export const LIFESTYLE_SELF_STUDY_LESSONS: LifestyleLesson[] = [
  // ── FOUNDATION ──────────────────────────────────────────
  {
    id: "ss-01",
    pillar: "selfstudy",
    level: "foundation",
    minutes: 8,
    medium: "read",
    titleVi: "Học cách học - Bộ nhớ của bạn thật sự hoạt động thế nào",
    titleEn: "Learning How to Learn - How Your Memory Actually Works",
    subtitleVi:
      "Ba trạm nhớ: cảm giác, ngắn hạn, dài hạn. Biết tín hiệu nào đi qua trạm nào, bạn học nhanh hơn 2 lần với cùng số giờ.",
    subtitleEn:
      "Three memory stations: sensory, short term, long term. Know which signal passes which station and you learn twice as fast in the same hours.",
    takeaways: [
      { vi: "Bộ nhớ ngắn hạn chỉ giữ khoảng 4 khối thông tin trong 20-30 giây, nên 'đọc thêm 10 trang' không giúp ghi nhớ.",
        en: "Short-term memory holds about 4 chunks for 20-30 seconds, so 'read 10 more pages' does not create memory." },
      { vi: "Thông tin chỉ vào bộ nhớ dài hạn khi được lặp lại có khoảng cách và được lấy ra chủ động.",
        en: "Information reaches long-term memory only through spaced repetition plus active retrieval." },
      { vi: "Gộp khối (chunking): 0968235800 dễ nhớ hơn khi thành 0968 - 235 - 800, giảm 10 khối còn 3.",
        en: "Chunking: 0968235800 is easier as 0968 - 235 - 800, cutting 10 chunks down to 3." },
      { vi: "Chế độ tập trung (focused) và chế độ lan toả (diffuse) phải luân phiên: đi bộ 10 phút cũng là học.",
        en: "Focused and diffuse modes must alternate: a 10-minute walk is still studying." },
      { vi: "Ngủ là bước cuối của việc học, không phải phần thưởng sau khi học.",
        en: "Sleep is the final step of learning, not the reward that comes after it." },
    ],
    frameworkVi:
      "Mô hình 3 trạm nhớ (Atkinson-Shiffrin) kết hợp hai chế độ tư duy focused/diffuse của Barbara Oakley.",
    frameworkEn:
      "The three-store memory model (Atkinson-Shiffrin) combined with Barbara Oakley's focused/diffuse modes.",
    reflectionVi:
      "Lần gần nhất bạn 'học 3 tiếng mà không nhớ gì': bạn đã ở trạm nhớ nào suốt 3 tiếng đó?",
    reflectionEn:
      "Think of the last time you studied 3 hours and remembered nothing: which memory station were you stuck in?",
    drillVi:
      "15 phút: lấy 1 trang tài liệu bạn vừa đọc. Gập lại, viết ra giấy tất cả những gì nhớ được trong 5 phút. Mở lại, tô đỏ phần bỏ sót. Đó chính là danh sách ôn của bạn.",
    drillEn:
      "15 min: take one page you just read. Close it, write everything you recall for 5 minutes. Reopen and mark the gaps in red. That gap list is your review list.",
    whyItMattersVi:
      "Phần lớn học sinh không thiếu thời gian, họ chỉ dùng thời gian ở sai trạm nhớ. Hiểu cơ chế này giúp bạn cắt bỏ những giờ học vô ích trước khi cắt bỏ giấc ngủ.",
    whyItMattersEn:
      "Most students are not short on time, they simply spend it at the wrong memory station. Understanding the mechanism lets you cut useless study hours before you cut sleep.",
    deepDiveVi: [
      "Năm 1956, George Miller công bố con số nổi tiếng '7 cộng trừ 2' cho dung lượng bộ nhớ ngắn hạn. Nghiên cứu sau này của Nelson Cowan hạ con số đó xuống khoảng 4 khối. Điều này giải thích vì sao khi thầy giảng một công thức có 6 biến, tới biến thứ năm bạn đã mất dấu biến đầu tiên: không phải bạn kém, mà là bạn đã hết chỗ.",
      "Cách duy nhất để vượt giới hạn 4 khối là gộp khối. Một người mới học tiếng Anh nghe 'I have been working here' là 5 khối rời rạc; người thành thạo nghe thành 1 khối duy nhất mang nghĩa 'tôi làm ở đây một thời gian rồi'. Mọi kỹ năng đều là quá trình biến nhiều khối nhỏ thành một khối lớn.",
      "Chế độ lan toả là phần bị coi rẻ nhất. Khi bạn rời bàn học và đi bộ, não vẫn tiếp tục nối các mảnh kiến thức lại với nhau ở nền. Đây là lý do đáp án của bài toán khó thường xuất hiện lúc tắm, chứ không xuất hiện ở phút thứ 90 ngồi nhìn vào vở.",
    ],
    deepDiveEn: [
      "In 1956 George Miller published the famous 'seven plus or minus two' figure for short-term memory. Later work by Nelson Cowan lowered it to roughly four chunks. That explains why, when a teacher explains a formula with six variables, you lose the first variable by the fifth: you are not slow, you are simply out of slots.",
      "The only way past the four-chunk ceiling is chunking. A beginner hears 'I have been working here' as five separate pieces; a fluent speaker hears one single chunk meaning 'I have worked here for a while'. Every skill is the process of turning many small chunks into one big one.",
      "Diffuse mode is the most underrated part. When you leave your desk and walk, your brain keeps stitching fragments together in the background. That is why the answer to a hard problem shows up in the shower rather than in minute 90 of staring at your notebook.",
    ],
    illustrationEmojis: ["🧠", "📥", "🔁", "😴"],
  },
  {
    id: "ss-02",
    pillar: "selfstudy",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Truy xuất chủ động thay vì đọc lại - Kỹ thuật hiệu quả nhất đang bị bỏ qua",
    titleEn: "Active Recall Over Re-reading - The Most Effective Habit Students Skip",
    subtitleVi:
      "Đọc lại cho bạn cảm giác biết. Tự hỏi lại cho bạn năng lực thật. Hai điều đó khác nhau tới 50% điểm số.",
    subtitleEn:
      "Re-reading gives you the feeling of knowing. Self-quizzing gives you the actual ability. The gap between them can be half your score.",
    takeaways: [
      { vi: "Nghiên cứu Karpicke & Roediger 2008: nhóm tự kiểm tra nhớ 61% sau một tuần, nhóm đọc lại chỉ nhớ 40%.",
        en: "Karpicke and Roediger 2008: the self-testing group recalled 61% after a week, the re-reading group only 40%." },
      { vi: "Đọc lại dễ chịu vì quen mắt; sự quen mắt bị não hiểu nhầm thành 'đã hiểu'.",
        en: "Re-reading feels good because text looks familiar, and the brain mistakes familiarity for understanding." },
      { vi: "Sau mỗi đoạn, gập sách và trả lời 1 câu: 'Đoạn này nói gì bằng lời của tôi?'",
        en: "After each section, close the book and answer one question: what did this say in my own words?" },
      { vi: "Biến mọi tiêu đề trong vở thành câu hỏi; vở của bạn trở thành đề thi thử miễn phí.",
        en: "Turn every heading in your notes into a question, and your notebook becomes a free mock exam." },
      { vi: "Nhớ sai rồi được sửa ngay tạo dấu vết nhớ mạnh hơn nhớ đúng ngay lần đầu.",
        en: "Recalling wrong then being corrected leaves a stronger memory trace than getting it right first try." },
    ],
    frameworkVi:
      "Retrieval Practice (Karpicke) triển khai bằng chu trình Đọc - Gập - Nói - Kiểm.",
    frameworkEn:
      "Retrieval Practice (Karpicke) run through a Read - Close - Say - Check loop.",
    reflectionVi:
      "Trong 5 giờ học gần nhất, bao nhiêu phút bạn thực sự lấy thông tin RA khỏi đầu, thay vì đưa vào?",
    reflectionEn:
      "Across your last 5 study hours, how many minutes did you actually pull information out instead of pushing it in?",
    drillVi:
      "12 phút: chọn 1 bài đã học tuần này. Viết 8 câu hỏi từ các tiêu đề. Trả lời bằng miệng, không nhìn vở. Chấm điểm và ghi lại 2 câu sai vào sổ lỗi.",
    drillEn:
      "12 min: pick a lesson from this week. Write 8 questions from its headings. Answer out loud with notes closed. Score yourself and log the 2 misses in an error notebook.",
    whyItMattersVi:
      "Đây là kỹ thuật rẻ nhất, nhanh nhất và có bằng chứng mạnh nhất trong khoa học học tập, nhưng chỉ khoảng 1 trên 10 học sinh dùng đều đặn vì nó gây cảm giác khó chịu.",
    whyItMattersEn:
      "This is the cheapest, fastest and best-evidenced technique in learning science, yet only about one student in ten uses it regularly because it feels uncomfortable.",
    deepDiveVi: [
      "Thí nghiệm kinh điển: sinh viên học một bài khoa học rồi chia ba nhóm. Nhóm đọc lại bốn lần, nhóm vẽ sơ đồ khái niệm, nhóm chỉ đọc một lần rồi viết lại từ đầu bằng ký ức. Khi được hỏi 'bạn nghĩ mình sẽ nhớ bao nhiêu', nhóm đọc lại tự tin nhất. Một tuần sau kiểm tra, họ về cuối cùng.",
      "Nguyên nhân là hiệu ứng dễ đọc trơn. Chữ đã nhìn ba lần trở nên trơn tuột trong mắt, và não gán cảm giác trơn tuột đó thành 'tôi biết rồi'. Chỉ khi phải tự tạo lại câu trả lời từ hư không, bạn mới biết mình biết hay không.",
      "Cách áp dụng đơn giản nhất cho học sinh Việt: sau mỗi trang vở, tự đặt ba câu hỏi Cái gì, Vì sao, Ví dụ nào. Nếu không trả lời được câu Ví dụ nào, bạn chưa hiểu, chỉ nhớ mặt chữ.",
    ],
    deepDiveEn: [
      "The classic experiment: students study a science passage, then split into three groups. One re-reads four times, one draws concept maps, one reads once and rewrites everything from memory. Asked to predict their own performance, the re-readers are the most confident. A week later on the test, they finish last.",
      "The cause is fluency. Text you have seen three times slides past the eye, and the brain reads that smoothness as 'I know this'. Only when you must rebuild the answer from nothing do you learn whether you really know it.",
      "The simplest version for a student: after each page of notes, ask yourself three questions - what, why, and which example. If you cannot produce an example, you have memorised shapes of words, not the idea.",
    ],
    illustrationEmojis: ["🔍", "🗣️", "✅", "📓"],
  },
  {
    id: "ss-03",
    pillar: "selfstudy",
    level: "foundation",
    minutes: 9,
    medium: "read",
    titleVi: "Lặp lại có khoảng cách - Xây lịch ôn cá nhân 1-3-7-21",
    titleEn: "Spaced Repetition - Building a Personal 1-3-7-21 Review Schedule",
    subtitleVi:
      "Ôn đúng vào lúc gần quên là lúc bộ nhớ được củng cố mạnh nhất. Lịch 1-3-7-21 biến điều đó thành thói quen.",
    subtitleEn:
      "Reviewing right before you forget is when memory strengthens most. A 1-3-7-21 schedule turns that into a habit.",
    takeaways: [
      { vi: "Ôn lại vào ngày 1, 3, 7 và 21 sau khi học; mỗi lần chỉ mất 5-10 phút nhưng giữ kiến thức hàng tháng.",
        en: "Review on days 1, 3, 7 and 21 after learning; each pass costs 5-10 minutes yet holds knowledge for months." },
      { vi: "Đường cong quên của Ebbinghaus: không ôn, sau 1 ngày bạn mất khoảng 50-60% nội dung mới.",
        en: "Ebbinghaus forgetting curve: with no review you lose roughly 50-60% of new material within a day." },
      { vi: "Thẻ ghi nhớ chỉ nên có 1 ý mỗi thẻ; thẻ dài là thẻ sẽ bị bỏ qua.",
        en: "One idea per flashcard; long cards are the cards you will skip." },
      { vi: "Thẻ trả lời sai quay lại sau 1 ngày, thẻ trả lời dễ đẩy ra xa hơn - đó là toàn bộ thuật toán.",
        en: "Cards you miss come back in a day, easy cards get pushed further out. That is the whole algorithm." },
      { vi: "10 phút ôn mỗi ngày thắng 3 giờ nhồi trước kỳ thi, với chi phí căng thẳng thấp hơn nhiều.",
        en: "Ten minutes of daily review beats a 3-hour cram, at a fraction of the stress cost." },
    ],
    frameworkVi:
      "Đường cong quên Ebbinghaus vận hành bằng lịch 1-3-7-21 và hộp thẻ Leitner 5 khay.",
    frameworkEn:
      "The Ebbinghaus forgetting curve run through a 1-3-7-21 schedule and a 5-box Leitner card system.",
    reflectionVi:
      "Kiến thức nào bạn từng học rất kỹ nhưng nay đã biến mất hoàn toàn? Nếu có 4 lần ôn 10 phút, nó còn mất không?",
    reflectionEn:
      "Which topic did you once know well but has now vanished? Would four ten-minute reviews have saved it?",
    drillVi:
      "10 phút: mở lịch điện thoại. Với bài học hôm nay, đặt 4 nhắc nhở vào ngày mai, ngày thứ 3, ngày thứ 7 và ngày thứ 21, mỗi nhắc nhở tên là 'Ôn 10 phút: [tên bài]'.",
    drillEn:
      "10 min: open your phone calendar. For today's lesson, set four reminders for tomorrow, day 3, day 7 and day 21, each titled 'Review 10 min: [lesson]'.",
    whyItMattersVi:
      "Học sinh Việt thường học rất nhiều nhưng ôn rất ít, nên kiến thức lớp 10 gần như biến mất khi thi cuối cấp. Lịch giãn cách chính là chiếc phanh giữ lại vốn đã học.",
    whyItMattersEn:
      "Students often study a lot and review very little, so grade-10 material is nearly gone by the final exam. A spaced schedule is the brake that keeps what you already paid for.",
    deepDiveVi: [
      "Hermann Ebbinghaus tự làm vật thí nghiệm cho chính mình vào những năm 1880, học hàng nghìn âm tiết vô nghĩa và đo lại tỷ lệ nhớ theo thời gian. Kết quả là một đường dốc đứng: mất nhanh trong 24 giờ đầu, sau đó dốc dần thoải ra. Mỗi lần ôn lại làm đường cong mới dốc chậm hơn đường cong trước.",
      "Hộp Leitner là bản vật lý của thuật toán này và không cần app: năm khay giấy, thẻ trả lời đúng chuyển sang khay xa hơn, thẻ trả lời sai quay về khay 1. Khay 1 ôn hằng ngày, khay 5 ôn mỗi ba tuần.",
      "Sai lầm hay gặp là biến buổi ôn thành buổi học lại. Buổi ôn chỉ nên là kiểm tra: hỏi, trả lời, chấm, đóng vở. Nếu một buổi ôn 10 phút biến thành 40 phút đọc lại, bạn sẽ bỏ nó sau ba ngày.",
    ],
    deepDiveEn: [
      "Hermann Ebbinghaus made himself the test subject in the 1880s, memorising thousands of nonsense syllables and measuring recall over time. The result is a steep slope: rapid loss in the first 24 hours, then a gentler decline. Each review makes the next curve fall more slowly than the last.",
      "The Leitner box is the physical version of the algorithm and needs no app: five paper trays, correct cards move outward, missed cards return to tray one. Tray one is reviewed daily, tray five every three weeks.",
      "The common mistake is turning a review into a fresh study session. A review should only test: ask, answer, score, close. If a 10-minute review becomes 40 minutes of re-reading, you will quit it within three days.",
    ],
    illustrationEmojis: ["🗓️", "📈", "🃏", "⏱️"],
  },
  {
    id: "ss-04",
    pillar: "selfstudy",
    level: "foundation",
    minutes: 8,
    medium: "practice",
    titleVi: "Khối làm việc sâu và nhịp 50/10 - Bảo vệ 3 giờ quý nhất trong ngày",
    titleEn: "Deep Work Blocks and the 50/10 Rhythm - Protecting Your Best 3 Hours",
    subtitleVi:
      "Không phải học nhiều giờ, mà là có bao nhiêu giờ không bị ngắt. Mỗi lần bị ngắt, bạn mất khoảng 23 phút để quay lại độ sâu cũ.",
    subtitleEn:
      "It is not about long hours, it is about unbroken hours. Each interruption costs roughly 23 minutes to regain your previous depth.",
    takeaways: [
      { vi: "Nhịp 50 phút học - 10 phút nghỉ phù hợp bài dài hơn Pomodoro 25 phút, vì tránh cắt ngang lúc đang trôi.",
        en: "A 50-minute work and 10-minute break rhythm suits long tasks better than 25-minute Pomodoros because it avoids cutting flow." },
      { vi: "Phút nghỉ phải rời màn hình: đứng lên, uống nước, nhìn xa 6 mét. Xem điện thoại không phải nghỉ.",
        en: "The break must leave the screen: stand, drink water, look 6 metres away. Scrolling is not a break." },
      { vi: "Ghi ra một câu mục tiêu duy nhất trước mỗi khối: 'Hết khối này tôi sẽ làm được X'.",
        en: "Write one goal sentence before each block: by the end of this block I will have done X." },
      { vi: "Não người trưởng thành trẻ chịu được khoảng 3-4 khối sâu mỗi ngày; khối thứ 6 hầu như vô giá trị.",
        en: "Most young adults sustain 3-4 deep blocks a day; the sixth block is almost worthless." },
      { vi: "Đặt điện thoại ngoài phòng: chỉ để trong túi cũng đã làm giảm khả năng làm việc.",
        en: "Leave the phone outside the room: even in a pocket it measurably reduces working capacity." },
    ],
    frameworkVi:
      "Deep Work (Cal Newport) triển khai theo nhịp 50/10 và quy tắc 'một mục tiêu mỗi khối'.",
    frameworkEn:
      "Deep Work (Cal Newport) run on a 50/10 rhythm with a one-goal-per-block rule.",
    reflectionVi:
      "Trong 24 giờ qua, khoảng thời gian dài nhất bạn không hề chạm điện thoại là bao lâu?",
    reflectionEn:
      "In the last 24 hours, what was the longest stretch you did not touch your phone at all?",
    drillVi:
      "Ngay hôm nay: chạy đúng 1 khối 50 phút. Điện thoại ở phòng khác, một câu mục tiêu viết trên giấy dán vào màn hình. Hết khối, ghi lại số lần bạn muốn thoát ra.",
    drillEn:
      "Today: run exactly one 50-minute block. Phone in another room, one goal sentence on a sticky note. At the end, write down how many times you wanted to escape.",
    whyItMattersVi:
      "Khả năng ngồi sâu 50 phút đang trở thành kỹ năng khan hiếm. Người giữ được nó sẽ vượt xa người thông minh hơn nhưng luôn bị ngắt quãng.",
    whyItMattersEn:
      "The ability to sit deep for 50 minutes is becoming a rare skill. Whoever keeps it will outpace smarter people who are always interrupted.",
    deepDiveVi: [
      "Nghiên cứu của Gloria Mark tại Đại học California Irvine theo dõi nhân viên tri thức và thấy trung bình họ bị chuyển việc mỗi 3 phút, và mất khoảng 23 phút để trở lại nhiệm vụ cũ ở cùng độ sâu. Áp dụng cho học sinh: mỗi tin nhắn trả lời giữa giờ học có giá gần nửa khối học.",
      "Cal Newport phân biệt công việc sâu và công việc nông. Chép lại vở cho đẹp, sắp xếp file, chọn màu highlight đều là nông: cảm giác năng suất mà không tạo năng lực. Giải một đề khó không nhìn đáp án là sâu.",
      "Vì sao 50/10 thay vì 25/5: các bài toán dài, đoạn văn dài hoặc đoạn mã cần khoảng 10-15 phút để nạp toàn bộ ngữ cảnh vào đầu. Nếu chuông reo ở phút 25, bạn vừa nạp xong đã phải xả ra.",
    ],
    deepDiveEn: [
      "Gloria Mark's research at UC Irvine tracked knowledge workers and found they switched tasks roughly every 3 minutes and needed about 23 minutes to return to the original task at the same depth. For a student, one reply to a message mid-session costs nearly half a study block.",
      "Cal Newport separates deep work from shallow work. Recopying notes neatly, organising files, choosing highlighter colours are all shallow: the feeling of productivity without the growth of ability. Solving a hard problem without peeking at the answer is deep.",
      "Why 50/10 instead of 25/5: long problems, long passages or blocks of code need 10-15 minutes just to load the full context into your head. If the timer rings at minute 25, you unload right after you finished loading.",
    ],
    illustrationEmojis: ["⏳", "🚪", "🎯", "🔕"],
  },
  {
    id: "ss-05",
    pillar: "selfstudy",
    level: "foundation",
    minutes: 10,
    medium: "read",
    titleVi: "Ghi chú để dùng lại - Cornell kết hợp Zettelkasten",
    titleEn: "Notes You Actually Reuse - Cornell Meets Zettelkasten",
    subtitleVi:
      "Vở đẹp mà không bao giờ mở lại là vở chết. Ghi chú tốt được thiết kế để bị tra lại và bị nối với ghi chú khác.",
    subtitleEn:
      "A beautiful notebook you never reopen is a dead notebook. Good notes are designed to be searched and linked.",
    takeaways: [
      { vi: "Chia trang Cornell: cột trái 1/3 cho câu hỏi, cột phải 2/3 cho nội dung, đáy trang cho 3 câu tóm tắt.",
        en: "Cornell layout: left third for questions, right two thirds for content, bottom strip for a 3-sentence summary." },
      { vi: "Ghi bằng lời của mình; câu nào chép nguyên xi phải đặt trong ngoặc kép và ghi nguồn.",
        en: "Write in your own words; anything copied verbatim goes in quotation marks with its source." },
      { vi: "Mỗi ghi chú Zettelkasten chỉ chứa 1 ý và có 1 mã số, để nối được với ý khác sau này.",
        en: "Each Zettelkasten note holds exactly one idea and one ID so it can be linked to other ideas later." },
      { vi: "Cuối mỗi ghi chú thêm dòng 'Liên hệ với: ...' để tạo mạng lưới thay vì danh sách rời.",
        en: "End each note with a 'Connects to' line so you build a network instead of a stack." },
      { vi: "Nếu 3 câu tóm tắt đáy trang viết được ngay sau giờ học, bạn đã hiểu; nếu không, bạn cần ôn ngay.",
        en: "If you can write the 3-sentence summary right after class you understood it; if not, review immediately." },
    ],
    frameworkVi:
      "Cornell Note System (Walter Pauk) cho cấu trúc trang, Zettelkasten (Niklas Luhmann) cho liên kết ý.",
    frameworkEn:
      "The Cornell Note System (Walter Pauk) for page structure, Zettelkasten (Niklas Luhmann) for linking ideas.",
    reflectionVi:
      "Lần cuối bạn mở lại vở của tháng trước là khi nào, và bạn đã tìm thấy thứ mình cần trong bao lâu?",
    reflectionEn:
      "When did you last reopen last month's notes, and how long did it take to find what you needed?",
    drillVi:
      "15 phút: chuyển 1 trang vở cũ sang dạng Cornell. Viết 5 câu hỏi ở cột trái, 3 câu tóm tắt ở đáy, và 1 dòng 'Liên hệ với' nối sang một bài khác.",
    drillEn:
      "15 min: convert one old page into Cornell format. Add 5 questions on the left, a 3-sentence summary at the bottom, and one 'Connects to' line pointing at another lesson.",
    whyItMattersVi:
      "Ghi chú là bộ nhớ ngoài của bạn. Nếu bộ nhớ ngoài không tra được, bạn buộc phải học lại từ đầu mỗi kỳ thi.",
    whyItMattersEn:
      "Notes are your external memory. If that external memory is not searchable, you must relearn everything before every exam.",
    deepDiveVi: [
      "Niklas Luhmann, nhà xã hội học Đức, xuất bản hơn 70 cuốn sách nhờ một hộp giấy khoảng 90.000 phiếu. Bí mật không nằm ở số lượng phiếu mà ở mã số và liên kết: mỗi phiếu trỏ tới phiếu khác, nên khi cần viết một chương, ông chỉ cần đi theo chuỗi liên kết đã có.",
      "Cột câu hỏi bên trái của Cornell chính là công cụ truy xuất chủ động dựng sẵn trong vở. Sau giờ học, bạn che cột nội dung, chỉ nhìn cột câu hỏi và trả lời. Vở vừa là tài liệu vừa là đề thi.",
      "Với học sinh dùng máy, nguyên tắc không đổi: một ý một ghi chú, tên ghi chú là một câu khẳng định chứ không phải một chủ đề. 'Lãi kép thắng nhờ thời gian, không nhờ số tiền' dễ tìm và dễ nối hơn tiêu đề 'Lãi kép'.",
    ],
    deepDiveEn: [
      "Niklas Luhmann, the German sociologist, published more than 70 books using a paper box of roughly 90,000 slips. The secret was not the number of slips but the IDs and links: each slip pointed to others, so writing a chapter meant following a chain that already existed.",
      "Cornell's left question column is active recall built into the page. After class, cover the content column, read only the questions and answer. The notebook is both reference and exam paper.",
      "For students working digitally the rule is unchanged: one idea per note, and title the note as a claim rather than a topic. 'Compound interest wins through time, not through size' is easier to find and link than a heading called 'Compound interest'.",
    ],
    illustrationEmojis: ["📝", "🗂️", "🔗", "🧩"],
  },

  // ── INTERMEDIATE ────────────────────────────────────────
  {
    id: "ss-06",
    pillar: "selfstudy",
    level: "intermediate",
    minutes: 10,
    medium: "practice",
    titleVi: "Kỹ thuật Feynman - Giải thích cho một đứa trẻ 12 tuổi",
    titleEn: "The Feynman Technique - Explain It to a 12-Year-Old",
    subtitleVi:
      "Bốn bước: viết tên khái niệm, giảng bằng từ đơn giản, phát hiện chỗ tắc, quay lại nguồn và giản lược tiếp.",
    subtitleEn:
      "Four steps: name the concept, teach it in plain words, find where you stall, return to the source and simplify again.",
    takeaways: [
      { vi: "Chỗ bạn phải dùng thuật ngữ để lấp chính là chỗ bạn chưa hiểu.",
        en: "Wherever you reach for jargon to fill a gap is exactly where you do not understand." },
      { vi: "Cấm dùng từ chuyên môn trong bản giải thích đầu tiên; thay bằng ví dụ đời thường.",
        en: "Ban technical terms in your first explanation and replace them with everyday examples." },
      { vi: "Giảng thành tiếng, đứng dậy, dùng bảng hoặc giấy A4; nói thầm trong đầu không tính.",
        en: "Teach out loud, standing, with a board or a sheet of paper. Explaining silently in your head does not count." },
      { vi: "Bản giải thích tốt dài không quá 1 trang và có ít nhất 1 hình vẽ tay.",
        en: "A good explanation fits on one page and includes at least one hand-drawn picture." },
      { vi: "Dạy lại cho bạn cùng lớp là bài kiểm tra rẻ nhất và trung thực nhất bạn có.",
        en: "Teaching a classmate is the cheapest and most honest test available to you." },
    ],
    frameworkVi:
      "Feynman Technique 4 bước: Đặt tên - Giảng đơn giản - Xác định lỗ hổng - Giản lược và dùng phép so sánh.",
    frameworkEn:
      "The 4-step Feynman Technique: Name it - Teach it simply - Find the gap - Simplify with an analogy.",
    reflectionVi:
      "Khái niệm nào bạn tin là mình hiểu, nhưng chưa bao giờ giải thích cho ai mà không nhìn tài liệu?",
    reflectionEn:
      "Which concept do you believe you understand but have never explained to anyone without notes?",
    drillVi:
      "15 phút: chọn 1 khái niệm khó tuần này. Quay video 3 phút giảng cho em nhỏ, không dùng thuật ngữ. Xem lại và khoanh 2 chỗ bạn nói vòng vo.",
    drillEn:
      "15 min: pick one hard concept from this week. Record a 3-minute video teaching it to a child, with no jargon. Rewatch and circle the two places you rambled.",
    whyItMattersVi:
      "Điểm số kiểm tra việc nhận ra đáp án; giảng lại kiểm tra việc tạo ra đáp án. Trong công việc thật, người ta chỉ trả tiền cho việc thứ hai.",
    whyItMattersEn:
      "Tests check whether you can recognise an answer; teaching checks whether you can build one. In real work, only the second gets paid.",
    deepDiveVi: [
      "Richard Feynman, nhà vật lý đoạt Nobel, nổi tiếng vì khả năng giải thích cơ học lượng tử mà không cần công thức. Ông kể rằng mỗi khi chuẩn bị bài giảng cho sinh viên năm nhất, ông thường phát hiện mình chưa hiểu điều mình tưởng đã hiểu suốt hai mươi năm.",
      "Lý do kỹ thuật này hiệu quả là nó buộc bạn đổi mã. Thông tin lưu dưới dạng câu chữ của sách nằm ở lớp nông; khi phải diễn lại bằng từ của mình và bằng một phép so sánh mới, bạn buộc phải hiểu quan hệ nhân quả bên dưới.",
      "Áp dụng cho học tiếng: đừng dịch định nghĩa của thì hiện tại hoàn thành. Hãy kể một câu chuyện dài ba câu về chính bạn khiến người nghe hiểu vì sao phải dùng thì đó. Nếu câu chuyện không cần thì đó, ví dụ của bạn sai.",
    ],
    deepDiveEn: [
      "Richard Feynman, the Nobel physicist, was famous for explaining quantum mechanics without formulas. He said that whenever he prepared a lecture for first-year students, he often discovered he did not understand something he had assumed he understood for twenty years.",
      "The technique works because it forces recoding. Information stored as the book's sentences sits in a shallow layer; forced to restate it in your own words with a fresh analogy, you must grasp the causal structure underneath.",
      "Applied to language learning: do not translate the definition of the present perfect. Tell a three-sentence story about yourself that makes a listener feel why that tense is needed. If the story works without the tense, your example is wrong.",
    ],
    illustrationEmojis: ["👩‍🏫", "✏️", "💡", "🎥"],
  },
  {
    id: "ss-07",
    pillar: "selfstudy",
    level: "intermediate",
    minutes: 9,
    medium: "read",
    titleVi: "Xen kẽ và khó khăn hữu ích - Vì sao học lộn xộn lại nhớ lâu hơn",
    titleEn: "Interleaving and Desirable Difficulty - Why Mixed Practice Sticks",
    subtitleVi:
      "Luyện một dạng bài 30 lần liền cho điểm cao ngay hôm nay; trộn ba dạng bài cho điểm cao trong kỳ thi.",
    subtitleEn:
      "Drilling one problem type 30 times wins today; mixing three types wins on exam day.",
    takeaways: [
      { vi: "Học theo khối (block) tạo cảm giác giỏi nhanh nhưng rơi mạnh khi đề trộn dạng.",
        en: "Blocked practice feels fast but collapses when the exam mixes question types." },
      { vi: "Xen kẽ buộc não làm thêm một việc: chọn phương pháp nào, chính là việc mà đề thi thật yêu cầu.",
        en: "Interleaving forces one extra step, choosing which method applies, which is exactly what the real exam demands." },
      { vi: "Nghiên cứu Rohrer & Taylor: nhóm xen kẽ điểm cao hơn nhóm học khối tới 43% khi kiểm tra sau này.",
        en: "Rohrer and Taylor found interleaved groups outscored blocked groups by up to 43% on a delayed test." },
      { vi: "Khó khăn hữu ích: học chậm hơn trong lúc luyện, nhớ lâu hơn sau khi luyện.",
        en: "Desirable difficulty: slower during practice, more durable afterwards." },
      { vi: "Đổi cả bối cảnh: học ở hai chỗ khác nhau cũng tạo thêm đầu mối truy xuất.",
        en: "Vary context too: studying in two different places adds extra retrieval cues." },
    ],
    frameworkVi:
      "Interleaving và Desirable Difficulty (Robert Bjork) áp dụng qua lịch luyện trộn 3 dạng ABC.",
    frameworkEn:
      "Interleaving and Desirable Difficulty (Robert Bjork) applied through an A-B-C mixed practice set.",
    reflectionVi:
      "Bạn có thói quen làm hết một dạng bài rồi mới chuyển dạng khác? Kết quả trong đề thi tổng hợp thế nào?",
    reflectionEn:
      "Do you finish one question type before moving to the next? How does that hold up in a mixed exam?",
    drillVi:
      "15 phút: lấy 12 bài tập của 3 dạng khác nhau. Xáo trộn thứ tự rồi làm liên tục. Ghi lại số lần bạn phải dừng để nhận diện dạng bài.",
    drillEn:
      "15 min: take 12 exercises from 3 different types. Shuffle the order and work through them. Note how often you had to pause to identify the type.",
    whyItMattersVi:
      "Đề thi thật không nói trước dạng bài. Nếu bạn chỉ luyện theo khối, bạn giỏi giải bài nhưng yếu ở việc nhận ra phải giải thế nào.",
    whyItMattersEn:
      "A real exam never labels the question type. Blocked practice makes you good at solving but weak at recognising what to solve.",
    deepDiveVi: [
      "Thí nghiệm nổi tiếng dùng bài toán thể tích bốn khối hình. Nhóm học khối làm tốt hơn trong buổi luyện, và chính họ tự đánh giá mình học hiệu quả hơn. Một tuần sau, nhóm xen kẽ vượt xa. Khoảng cách giữa cảm giác hiệu quả và hiệu quả thật là cái bẫy lớn nhất của tự học.",
      "Cơ chế nằm ở chỗ xen kẽ buộc bạn phân biệt. Khi ba dạng bài đứng cạnh nhau, não phải tìm dấu hiệu nhận dạng đặc trưng của từng dạng, và chính bộ dấu hiệu đó là thứ bạn cần trong phòng thi.",
      "Cách trộn hợp lý cho học sinh: một buổi luyện 45 phút chia thành ba lượt A-B-C, mỗi lượt 4 bài. Đừng trộn quá vụn tới mức mỗi bài một dạng, vì bạn sẽ không kịp nạp phương pháp nào cho đủ sâu.",
    ],
    deepDiveEn: [
      "A famous experiment used volume problems for four solids. The blocked group performed better during practice and rated their own learning higher. A week later, the interleaved group was far ahead. The gap between felt effectiveness and real effectiveness is the biggest trap in self-study.",
      "The mechanism is discrimination. With three types side by side, your brain must hunt for the distinguishing features of each, and that feature set is exactly what you need in the exam room.",
      "A sensible mix for students: split a 45-minute session into three A-B-C rounds of 4 problems each. Do not shuffle so finely that every problem is a new type, or no method gets loaded deeply enough.",
    ],
    illustrationEmojis: ["🔀", "🧮", "📊", "🏋️"],
  },
  {
    id: "ss-08",
    pillar: "selfstudy",
    level: "intermediate",
    minutes: 11,
    medium: "read",
    titleVi: "Đọc tài liệu khó - Quy trình SQ3R cho sách và bài báo",
    titleEn: "Reading Hard Material - The SQ3R Routine for Books and Papers",
    subtitleVi:
      "Đừng đọc từ chữ đầu tới chữ cuối. Khảo sát trước, đặt câu hỏi, rồi mới đọc để đi tìm câu trả lời.",
    subtitleEn:
      "Do not read from first word to last. Survey first, ask questions, then read hunting for answers.",
    takeaways: [
      { vi: "Khảo sát 3 phút: mục lục, tiêu đề, hình, câu đầu và cuối mỗi phần, phần kết luận.",
        en: "Three-minute survey: table of contents, headings, figures, first and last sentence of each section, conclusion." },
      { vi: "Biến mỗi tiêu đề thành câu hỏi trước khi đọc; bạn đọc để tìm, không đọc để ngắm.",
        en: "Turn every heading into a question before reading, so you read to find rather than to admire." },
      { vi: "Với bài báo khoa học, đọc theo thứ tự: tóm tắt, kết luận, hình, rồi mới phương pháp.",
        en: "For a research paper read in this order: abstract, conclusion, figures, then methods." },
      { vi: "Sau mỗi phần, nói lại bằng 2 câu không nhìn sách; nếu không nói được, đọc lại phần đó thôi.",
        en: "After each section, restate it in 2 sentences with the book closed. If you cannot, reread only that section." },
      { vi: "Đánh dấu tối đa 3 câu mỗi trang; tô vàng cả trang là cách chắc chắn để không nhớ gì.",
        en: "Highlight at most 3 sentences per page. A fully yellow page guarantees you remember nothing." },
    ],
    frameworkVi:
      "SQ3R (Survey - Question - Read - Recite - Review) của Francis Robinson, thêm lớp đọc bài báo theo hình.",
    frameworkEn:
      "Francis Robinson's SQ3R (Survey, Question, Read, Recite, Review) plus a figure-first pass for papers.",
    reflectionVi:
      "Cuốn sách khó gần nhất bạn bỏ giữa: bạn bỏ vì nó khó, hay vì bạn đọc nó sai cách?",
    reflectionEn:
      "The last hard book you abandoned: did you quit because it was hard, or because you read it the wrong way?",
    drillVi:
      "20 phút: chọn 1 chương sách khó. Dành 3 phút khảo sát, 2 phút viết 5 câu hỏi, 10 phút đọc tìm đáp án, 5 phút nói lại bằng miệng.",
    drillEn:
      "20 min: pick one hard chapter. Spend 3 minutes surveying, 2 writing 5 questions, 10 reading for answers, 5 reciting out loud.",
    whyItMattersVi:
      "Từ đại học trở đi, phần lớn kiến thức đến từ tài liệu bạn tự đọc, không phải từ giờ giảng. Ai đọc tài liệu khó nhanh và chắc sẽ tự học được bất cứ ngành nào.",
    whyItMattersEn:
      "From university onward, most knowledge comes from what you read yourself, not from lectures. Whoever reads hard material well can self-teach any field.",
    deepDiveVi: [
      "SQ3R được xây dựng trong Thế chiến thứ hai để huấn luyện quân nhân đọc tài liệu kỹ thuật nhanh. Ý tưởng cốt lõi: bộ não giữ thông tin tốt hơn khi đã có khung để treo thông tin vào. Ba phút khảo sát chính là dựng khung đó.",
      "Với bài báo khoa học, thứ tự đọc truyền thống là cái bẫy. Phần phương pháp dày đặc kỹ thuật và sẽ vô nghĩa nếu bạn chưa biết kết luận. Đọc tóm tắt và kết luận trước cho bạn biết bài báo muốn chứng minh gì, sau đó phần hình vẽ cho bạn biết bằng chứng, cuối cùng phương pháp cho bạn biết bằng chứng đó đáng tin hay không.",
      "Bước Recite là bước bị bỏ nhiều nhất và cũng là bước duy nhất tạo bộ nhớ. Chỉ cần hai câu nói thành tiếng sau mỗi phần, một chương 30 trang biến từ 'đã đọc' thành 'đã hiểu'.",
    ],
    deepDiveEn: [
      "SQ3R was developed during the Second World War to train servicemen to read technical manuals fast. The core idea: the brain retains more when a frame already exists to hang information on. The three-minute survey builds that frame.",
      "For research papers the traditional reading order is a trap. The methods section is dense and meaningless until you know the conclusion. Abstract and conclusion first tell you the claim, figures then show the evidence, and methods finally tell you whether that evidence can be trusted.",
      "Recite is the most skipped step and the only one that creates memory. Two spoken sentences after each section turn a 30-page chapter from 'read' into 'understood'.",
    ],
    illustrationEmojis: ["📖", "❓", "🔎", "🗣️"],
  },
  {
    id: "ss-09",
    pillar: "selfstudy",
    level: "intermediate",
    minutes: 9,
    medium: "practice",
    titleVi: "Thắng trì hoãn - Khởi động 2 phút và cắt nhỏ nhiệm vụ",
    titleEn: "Beating Procrastination - The 2-Minute Start and Task Shaping",
    subtitleVi:
      "Trì hoãn không phải bệnh lười, mà là cách né cảm xúc khó chịu. Sửa nhiệm vụ trước, đừng sửa tính cách.",
    subtitleEn:
      "Procrastination is not laziness, it is avoiding an uncomfortable feeling. Fix the task before you try to fix your character.",
    takeaways: [
      { vi: "Nguyên nhân thường là nhiệm vụ mơ hồ: 'ôn Toán' gây né, 'làm bài 3 trang 42' thì không.",
        en: "The usual cause is vagueness: 'study maths' invites avoidance, 'do problem 3 on page 42' does not." },
      { vi: "Quy tắc 2 phút: cam kết chỉ làm 2 phút đầu tiên; động lực đến sau khi bắt đầu, không đến trước.",
        en: "The 2-minute rule: commit only to the first 2 minutes. Motivation arrives after starting, not before." },
      { vi: "Chia nhiệm vụ tới mức bước tiếp theo nhìn thấy được bằng mắt: mở vở, viết tiêu đề, làm câu a.",
        en: "Shape the task until the next step is physically visible: open the book, write the title, do part a." },
      { vi: "Đặt trước thời điểm và địa điểm: 'sau bữa tối, tại bàn bếp' hiệu quả hơn 'tối nay'.",
        en: "Pre-decide time and place: 'after dinner at the kitchen table' beats 'tonight'." },
      { vi: "Kết thúc buổi học giữa một câu chưa xong; hôm sau bạn có điểm bám để bắt đầu ngay.",
        en: "Stop mid-sentence when you finish a session, so tomorrow you have a handle to grab." },
    ],
    frameworkVi:
      "Mô hình trì hoãn theo cảm xúc (Tim Pychyl) kết hợp Implementation Intentions (Peter Gollwitzer) và quy tắc 2 phút.",
    frameworkEn:
      "The emotion-regulation model of procrastination (Tim Pychyl) with implementation intentions (Peter Gollwitzer) and the 2-minute rule.",
    reflectionVi:
      "Nhiệm vụ bạn đang né hiện nay khiến bạn cảm thấy gì: sợ làm sai, sợ nhàm, hay không biết bắt đầu từ đâu?",
    reflectionEn:
      "The task you are avoiding right now: does it trigger fear of failing, boredom, or not knowing where to start?",
    drillVi:
      "10 phút: viết nhiệm vụ bạn né nhất ra giấy. Cắt thành 5 bước, bước đầu phải làm được trong 2 phút. Làm bước đầu ngay bây giờ.",
    drillEn:
      "10 min: write down the task you avoid most. Cut it into 5 steps where step one takes 2 minutes. Do step one right now.",
    whyItMattersVi:
      "Người tự học không có ai nhắc bài. Kỹ năng tự khởi động là thứ quyết định bạn học được bao nhiêu trong 4 năm tới.",
    whyItMattersEn:
      "A self-learner has nobody chasing them. The ability to start on your own decides how much you learn over the next four years.",
    deepDiveVi: [
      "Tim Pychyl ở Đại học Carleton chỉ ra rằng trì hoãn là hành vi điều tiết cảm xúc ngắn hạn: bạn không né bài tập, bạn né cảm giác bất lực khi nhìn vào nó. Vì thế mọi lời khuyên kiểu 'hãy có kỷ luật hơn' đều đánh vào sai mục tiêu.",
      "Peter Gollwitzer phát hiện rằng chỉ cần viết ra công thức 'Khi X xảy ra, tôi sẽ làm Y ở Z' đã tăng đáng kể tỷ lệ hoàn thành, vì quyết định được chuyển từ lúc mệt sang lúc còn tỉnh táo. Học sinh viết 'Sau khi rửa bát, tôi mở vở Toán ở bàn bếp' bắt đầu đúng giờ nhiều hơn học sinh chỉ nói 'tối nay học Toán'.",
      "Ernest Hemingway có thói quen dừng viết khi vẫn còn biết câu tiếp theo là gì. Học sinh có thể vay mượn nguyên xi: dừng buổi học ở giữa một bài đang giải, ghi rõ bước kế tiếp lên lề. Chi phí khởi động hôm sau gần như bằng không.",
    ],
    deepDiveEn: [
      "Tim Pychyl at Carleton University showed procrastination is short-term emotion regulation: you are not avoiding the assignment, you are avoiding the helpless feeling it triggers. That is why advice like 'be more disciplined' aims at the wrong target.",
      "Peter Gollwitzer found that simply writing 'when X happens, I will do Y at Z' sharply raises completion rates, because the decision moves from when you are tired to when you are still clear-headed. A student who writes 'after the dishes I open my maths book at the kitchen table' starts on time far more often than one who says 'maths tonight'.",
      "Ernest Hemingway stopped writing while he still knew the next sentence. Students can borrow this exactly: end a session mid-problem and write the next step in the margin. Tomorrow's start-up cost is nearly zero.",
    ],
    illustrationEmojis: ["⏰", "🧱", "🚀", "✂️"],
  },
  {
    id: "ss-10",
    pillar: "selfstudy",
    level: "intermediate",
    minutes: 10,
    medium: "practice",
    titleVi: "Sổ lỗi - Biến sai sót thành giáo trình riêng của bạn",
    titleEn: "The Error Log - Turning Mistakes Into Your Own Syllabus",
    subtitleVi:
      "Mỗi câu sai là một bài học được cá nhân hoá miễn phí. Không ghi lại, bạn sẽ trả tiền cho nó lần nữa trong kỳ thi.",
    subtitleEn:
      "Every wrong answer is a free personalised lesson. If you do not log it, you pay for it again on exam day.",
    takeaways: [
      { vi: "Mỗi dòng sổ lỗi có 4 cột: câu hỏi, tôi đã trả lời gì, đáp án đúng, nguyên nhân gốc.",
        en: "Each error-log row has 4 columns: the question, my answer, the correct answer, the root cause." },
      { vi: "Nguyên nhân gốc chỉ có 4 loại: chưa biết, biết mà nhầm, đọc sai đề, hết thời gian.",
        en: "Root causes come in only 4 kinds: did not know, knew but slipped, misread the question, ran out of time." },
      { vi: "Sai vì đọc sai đề cần luyện quy trình, không cần học lại kiến thức - hai cách chữa khác nhau.",
        en: "A misreading error needs process practice, not more content study. The two cures are different." },
      { vi: "Mỗi Chủ nhật làm lại 10 câu trong sổ lỗi; câu nào đúng 2 lần liền thì gạch bỏ.",
        en: "Every Sunday redo 10 logged items; cross out anything you get right twice in a row." },
      { vi: "Sổ lỗi 100 dòng có giá trị hơn 1000 bài tập làm đúng, vì nó chỉ chứa phần bạn yếu.",
        en: "A 100-row error log beats 1000 correct exercises because it contains only your weak spots." },
    ],
    frameworkVi:
      "Error Log 4 cột kết hợp phân loại nguyên nhân gốc và vòng ôn hằng tuần.",
    frameworkEn:
      "A 4-column error log combined with root-cause tagging and a weekly review loop.",
    reflectionVi:
      "Trong bài kiểm tra gần nhất, bao nhiêu phần trăm điểm mất đi là vì chưa biết, và bao nhiêu vì bất cẩn?",
    reflectionEn:
      "In your last test, what share of lost marks came from not knowing versus carelessness?",
    drillVi:
      "15 phút: lấy bài kiểm tra gần nhất. Lập bảng 4 cột cho mọi câu sai và gắn nhãn nguyên nhân. Đếm xem nhãn nào nhiều nhất và viết 1 hành động cho nhãn đó.",
    drillEn:
      "15 min: take your latest test. Build the 4-column table for every miss and tag its root cause. Count the most frequent tag and write one action for it.",
    whyItMattersVi:
      "Học sinh thường luyện thêm phần mình đã giỏi vì nó dễ chịu. Sổ lỗi buộc thời gian ôn chảy đúng vào chỗ đang chảy máu điểm.",
    whyItMattersEn:
      "Students tend to drill what they already do well because it feels pleasant. An error log forces review time into the places actually losing marks.",
    deepDiveVi: [
      "Trong huấn luyện phi công và y khoa, việc mổ xẻ sai sót sau mỗi ca là quy trình bắt buộc, gọi là debrief. Điều đáng chú ý là debrief không tập trung vào việc ai sai, mà vào việc dấu hiệu nào đã bị bỏ qua. Sổ lỗi của học sinh nên giữ đúng tinh thần đó: không tự mắng, chỉ truy dấu hiệu.",
      "Việc phân loại nguyên nhân quan trọng hơn việc ghi lại đáp án. Một học sinh mất 6 điểm vì đọc sai đề và một học sinh mất 6 điểm vì chưa học chương đó cần hai kế hoạch hoàn toàn khác nhau; nếu cả hai chỉ 'làm thêm đề', chỉ một người tiến bộ.",
      "Sau khoảng tám tuần, sổ lỗi bắt đầu lộ ra khuôn mẫu: cùng một loại lỗi lặp lại ở nhiều môn. Ví dụ luôn quên điều kiện xác định, hoặc luôn trả lời quá vội ở câu cuối. Đó là lúc sổ lỗi biến thành bản đồ điểm yếu chiến lược, không còn là danh sách rời.",
    ],
    deepDiveEn: [
      "In pilot and medical training, dissecting mistakes after every case is mandatory and is called a debrief. Notably, a debrief does not focus on who erred but on which signal was missed. A student error log should keep that spirit: no self-scolding, only signal hunting.",
      "Tagging the cause matters more than recording the answer. A student who loses 6 marks by misreading and one who loses 6 marks from an unstudied chapter need completely different plans; if both just 'do more papers', only one improves.",
      "After about eight weeks the log starts revealing patterns: the same error type repeating across subjects, such as always forgetting domain conditions or always rushing the final question. That is when the log becomes a strategic weakness map rather than a loose list.",
    ],
    illustrationEmojis: ["📕", "❌", "🔬", "📈"],
  },

  // ── MASTERY ─────────────────────────────────────────────
  {
    id: "ss-11",
    pillar: "selfstudy",
    level: "mastery",
    minutes: 13,
    medium: "read",
    titleVi: "Thiết kế giáo trình tự học 12 tuần - Từ mục tiêu tới bằng chứng",
    titleEn: "Designing a 12-Week Self-Study Curriculum - From Goal to Evidence",
    subtitleVi:
      "Bắt đầu từ bài kiểm tra cuối cùng bạn muốn vượt qua, rồi thiết kế ngược về tuần 1. Đây là cách các trường thiết kế môn học.",
    subtitleEn:
      "Start from the final test you want to pass, then design backwards to week one. This is how schools design courses.",
    takeaways: [
      { vi: "Viết mục tiêu dạng bằng chứng: 'nói 3 phút về công việc, người bản ngữ hiểu hết', không phải 'giỏi tiếng Anh'.",
        en: "State goals as evidence: 'speak 3 minutes about my job and be fully understood', not 'be good at English'." },
      { vi: "Thiết kế ngược: bài kiểm tra cuối, 3 mốc giữa kỳ (tuần 4, 8, 12), rồi mới tới nội dung tuần.",
        en: "Backward design: final assessment, three checkpoints (weeks 4, 8, 12), then weekly content." },
      { vi: "Mỗi tuần chỉ 1 chủ đề chính cộng 1 buổi ôn tích luỹ; nhiều hơn là công thức của bỏ dở.",
        en: "One main topic per week plus one cumulative review session. More than that is a recipe for quitting." },
      { vi: "Chốt ngân sách giờ thật: 5 giờ mỗi tuần trong 12 tuần là 60 giờ, hãy thiết kế cho 60 giờ đó.",
        en: "Fix a real hour budget: 5 hours a week for 12 weeks is 60 hours, so design for 60 hours." },
      { vi: "Đặt trước tuần đệm (tuần 6 hoặc 11) để bù cho ốm, thi cử, việc gia đình.",
        en: "Pre-book a buffer week (week 6 or 11) to absorb illness, exams and family events." },
      { vi: "Bằng chứng công khai bắt buộc: một video, một bài viết, một bản trình bày vào tuần 12.",
        en: "Require public evidence: one video, one essay or one presentation in week 12." },
    ],
    frameworkVi:
      "Backward Design (Wiggins & McTighe) kết hợp chu kỳ 12 tuần có tuần đệm và bằng chứng công khai.",
    frameworkEn:
      "Backward Design (Wiggins and McTighe) run as a 12-week cycle with a buffer week and public evidence.",
    reflectionVi:
      "Khoá học tự học nào bạn từng bỏ giữa? Nó thiếu bằng chứng cuối cùng, thiếu mốc giữa kỳ, hay thiếu ngân sách giờ thật?",
    reflectionEn:
      "Which self-study plan did you abandon? Was it missing a final piece of evidence, mid-point checkpoints, or a realistic hour budget?",
    drillVi:
      "25 phút: viết 1 trang giáo trình 12 tuần cho kỹ năng bạn muốn nhất. Ghi rõ bài kiểm tra cuối, 3 mốc, ngân sách giờ mỗi tuần và tuần đệm.",
    drillEn:
      "25 min: write a one-page 12-week curriculum for the skill you want most. Name the final assessment, three checkpoints, the weekly hour budget and the buffer week.",
    whyItMattersVi:
      "Người tự học thất bại thường không thiếu tài liệu, họ thiếu kiến trúc. Một trang giấy thiết kế đúng có giá trị hơn mười khoá học đã mua.",
    whyItMattersEn:
      "Failed self-learners rarely lack material, they lack architecture. One well-designed page is worth more than ten purchased courses.",
    deepDiveVi: [
      "Wiggins và McTighe gọi cách làm phổ biến là 'đi theo sách giáo khoa': mở trang một, học tới khi hết thời gian. Vấn đề là không ai biết khi nào thì xong, nên động lực tan dần. Thiết kế ngược bắt đầu bằng câu hỏi khó chịu: cuối cùng tôi phải làm được gì để chứng minh mình đã học?",
      "Ba mốc giữa kỳ có tác dụng như đèn giao thông. Ở tuần 4 bạn không cần giỏi, chỉ cần chứng minh mình vẫn đang đi đúng đường; nếu mốc tuần 4 trượt, bạn sửa kế hoạch chứ không tự bỏ. Không có mốc, người học chỉ nhận tin xấu vào tuần 12, khi đã quá muộn.",
      "Tuần đệm là chi tiết nhỏ nhưng cứu sống cả kế hoạch. Ai đó chắc chắn sẽ ốm, thi giữa kỳ hoặc có việc gia đình trong 12 tuần. Kế hoạch không có đệm sẽ vỡ ở lần đầu tiên gặp thực tế, và cảm giác vỡ kế hoạch mới là thứ khiến người ta bỏ, chứ không phải bản thân sự chậm trễ.",
      "Bằng chứng công khai đóng vai trò hạn chót thật. Hẹn trước với một người bạn rằng tuần 12 bạn sẽ trình bày 10 phút cho họ nghe: chi phí bằng không, hiệu lực gần bằng một kỳ thi.",
    ],
    deepDiveEn: [
      "Wiggins and McTighe call the common approach 'marching through the textbook': open page one and study until time runs out. The problem is nobody knows when it ends, so motivation drains. Backward design starts with an uncomfortable question: what must I finally be able to do to prove I learned this?",
      "The three checkpoints work like traffic lights. At week 4 you do not need to be good, only to show you are on the right road; if week 4 fails, you revise the plan instead of quitting. Without checkpoints, a learner gets the bad news in week 12 when it is too late.",
      "The buffer week is a small detail that saves whole plans. Someone will certainly get sick, sit a midterm or face a family event inside 12 weeks. A plan with no buffer breaks at first contact with reality, and it is the feeling of a broken plan, not the delay itself, that makes people quit.",
      "Public evidence acts as a real deadline. Arrange in advance that in week 12 you will present for 10 minutes to one friend: zero cost, nearly the force of an exam.",
    ],
    illustrationEmojis: ["🗺️", "📆", "🏁", "🎤"],
  },
  {
    id: "ss-12",
    pillar: "selfstudy",
    level: "mastery",
    minutes: 12,
    medium: "read",
    titleVi: "Học cùng AI mà không giao khoán tư duy",
    titleEn: "Learning With AI Without Outsourcing Your Thinking",
    subtitleVi:
      "AI là bạn học kiên nhẫn vô hạn, nhưng nếu nó làm phần khó thay bạn, bạn trả tiền cho tốc độ bằng năng lực.",
    subtitleEn:
      "AI is an infinitely patient study partner, but if it does the hard part for you, you buy speed with your own ability.",
    takeaways: [
      { vi: "Quy tắc vàng: tự làm trước, hỏi AI sau. Bản nháp của bạn phải tồn tại trước khi bạn mở chat.",
        en: "Golden rule: attempt first, ask second. Your own draft must exist before you open the chat." },
      { vi: "Dùng AI để tạo câu hỏi kiểm tra bạn, không phải để tạo đáp án cho bạn.",
        en: "Use AI to generate questions that test you, not answers that replace you." },
      { vi: "Câu lệnh tốt: 'Đóng vai giám khảo, hỏi tôi 5 câu về chủ đề này, chỉ nhận xét sau khi tôi trả lời'.",
        en: "A strong prompt: act as an examiner, ask me 5 questions on this topic, and only comment after I answer." },
      { vi: "Luôn đòi lập luận và ví dụ trái chiều, rồi tự kiểm tra lại bằng một nguồn độc lập.",
        en: "Always ask for reasoning and counter-examples, then verify against one independent source." },
      { vi: "Nếu bạn không thể giải thích lại câu trả lời của AI sau 10 phút, bạn chưa học gì cả.",
        en: "If you cannot re-explain the AI's answer ten minutes later, you have learned nothing." },
      { vi: "Ghi lại phần bạn từng sai trước khi AI sửa; đó mới là dữ liệu học tập của bạn.",
        en: "Log what you got wrong before the AI corrected you. That is your actual learning data." },
    ],
    frameworkVi:
      "Chu trình Attempt - Ask - Argue - Archive: tự làm, hỏi AI, tranh luận lại, lưu lỗi vào sổ.",
    frameworkEn:
      "The Attempt - Ask - Argue - Archive loop: try it yourself, ask AI, push back, archive the error.",
    reflectionVi:
      "Lần gần nhất bạn dùng AI cho bài tập: bạn đã giỏi hơn sau đó, hay chỉ nộp bài xong nhanh hơn?",
    reflectionEn:
      "The last time you used AI for homework: did you become better afterwards, or just finish faster?",
    drillVi:
      "20 phút: chọn 1 bài tập. Tự làm 10 phút, lưu bản nháp. Sau đó yêu cầu AI đóng vai giám khảo hỏi bạn 5 câu và chỉ chấm sau khi bạn trả lời. Ghi 2 lỗi vào sổ lỗi.",
    drillEn:
      "20 min: pick one exercise. Work alone for 10 minutes and save your draft. Then ask AI to act as examiner with 5 questions, marking only after you answer. Log 2 errors.",
    whyItMattersVi:
      "AI làm cho việc trông như đã học trở nên quá dễ. Người phân biệt được giữa nhờ AI kiểm tra và nhờ AI làm hộ sẽ bỏ xa cả một thế hệ.",
    whyItMattersEn:
      "AI makes looking like you learned far too easy. Whoever can tell the difference between being tested by AI and being replaced by AI will outgrow a whole generation.",
    deepDiveVi: [
      "Có một hiệu ứng đã được nghiên cứu nhiều trước cả AI: khi thông tin dễ tra cứu, người ta ghi nhớ ít hơn nhưng lại tự tin hơn về hiểu biết của mình. Chat có sẵn đáp án đẩy hiệu ứng đó lên mức cao nhất từng có. Cảm giác 'câu này rõ ràng mà' xuất hiện ngay khi đọc lời giải mượt mà, và cảm giác đó biến mất trong phòng thi.",
      "Cách dùng có lợi nhất hiện nay là biến AI thành người ra đề và người phản biện, hai vai mà con người xung quanh bạn ít khi có thời gian đảm nhận. Yêu cầu nó hỏi bạn, chấm bạn theo tiêu chí, chỉ ra lỗi lập luận, đưa ví dụ trái chiều, rồi bắt nó im lặng trong lúc bạn tự trả lời.",
      "Với ngoại ngữ, đừng để AI viết bài rồi bạn học thuộc. Hãy tự viết, đưa cho AI ba yêu cầu cụ thể: sửa lỗi ngữ pháp và giải thích quy tắc, nâng cấp 5 cụm từ theo trình độ B2 lên C1, và chỉ ra chỗ nào nghe không tự nhiên với người bản ngữ. Bài vẫn là của bạn, phần nâng cấp mới là kiến thức mới.",
      "Cuối cùng, hãy giữ một quy tắc kiểm tra sạch: mỗi tuần làm một bài không có AI, không có ghi chú, tính giờ. Đó là thước đo trung thực duy nhất cho việc bạn đang tiến bộ hay chỉ đang được kéo đi.",
    ],
    deepDiveEn: [
      "A well-studied effect predates AI: when information is easy to look up, people remember less yet feel more knowledgeable. A chat window with instant answers pushes that effect to its historic peak. The feeling 'this is obvious' appears the moment you read a smooth solution, and that feeling disappears in the exam room.",
      "The most valuable use today is turning AI into an examiner and a devil's advocate, two roles the people around you rarely have time for. Ask it to question you, mark you against criteria, point out reasoning flaws and give counter-examples, then make it stay silent while you answer.",
      "For languages, never let AI write the text you then memorise. Write it yourself and give AI three specific jobs: fix grammar and explain the rule, upgrade 5 phrases from B2 towards C1, and flag anything that sounds unnatural to a native ear. The work stays yours and the upgrades are the new knowledge.",
      "Finally keep one clean test: once a week, do a timed task with no AI and no notes. That is the only honest measure of whether you are improving or simply being carried.",
    ],
    illustrationEmojis: ["🤖", "🧑‍⚖️", "📝", "⚖️"],
  },
  {
    id: "ss-13",
    pillar: "selfstudy",
    level: "mastery",
    minutes: 11,
    medium: "read",
    titleVi: "Siêu nhận thức - Hiệu chỉnh cảm giác 'tôi biết rồi'",
    titleEn: "Metacognition - Calibrating Your Sense of Knowing",
    subtitleVi:
      "Người học giỏi không đoán chính xác hơn về kiến thức, họ chỉ kiểm tra dự đoán của mình thường xuyên hơn.",
    subtitleEn:
      "Strong learners are not better at guessing what they know, they simply check their guesses more often.",
    takeaways: [
      { vi: "Trước khi làm bài, ghi dự đoán điểm; sau khi chấm, so sánh. Khoảng lệch là mức mù của bạn.",
        en: "Before a test, write your predicted score; after marking, compare. The gap is your blind spot size." },
      { vi: "Chấm mức tự tin 1-5 cho từng câu; câu tự tin 5 mà sai là loại lỗi nguy hiểm nhất.",
        en: "Rate confidence 1-5 per question; a confident-5 answer that is wrong is the most dangerous error type." },
      { vi: "Hỏi ba câu sau mỗi buổi học: hôm nay tôi học được gì, phần nào còn mờ, mai tôi sẽ làm gì.",
        en: "Ask three questions after each session: what did I learn, what is still fuzzy, what will I do tomorrow." },
      { vi: "Cảm giác trôi chảy khi đọc là tín hiệu giả; cảm giác lấy ra được khi gập sách là tín hiệu thật.",
        en: "Fluency while reading is a false signal; successful retrieval with the book closed is a real one." },
      { vi: "Hiệu chỉnh sai làm bạn học sai chỗ: bạn ôn phần đã biết và bỏ phần đang mù.",
        en: "Poor calibration makes you study the wrong thing: you revise what you know and skip what you cannot see." },
    ],
    frameworkVi:
      "Vòng Plan - Monitor - Evaluate (Flavell) kết hợp bảng dự đoán điểm và thang tự tin 1-5.",
    frameworkEn:
      "The Plan - Monitor - Evaluate cycle (Flavell) with score prediction and a 1-5 confidence scale.",
    reflectionVi:
      "Lần gần nhất bạn tự tin sẽ được điểm cao nhưng kết quả thấp: dấu hiệu nào bạn đã bỏ qua từ trước?",
    reflectionEn:
      "The last time you felt sure of a high score but got a low one: which warning sign had you ignored?",
    drillVi:
      "20 phút: làm 10 câu bất kỳ. Trước mỗi câu ghi mức tự tin 1-5. Chấm và lập bảng: tự tin cao mà sai, tự tin thấp mà đúng. Ôn nhóm thứ nhất trước.",
    drillEn:
      "20 min: do any 10 questions, rating confidence 1-5 before each. Mark them and build a table of high-confidence misses and low-confidence hits. Review the first group first.",
    whyItMattersVi:
      "Bạn không thể sửa điều bạn không thấy. Siêu nhận thức là chiếc đèn pin soi vào vùng bạn tưởng đã sáng.",
    whyItMattersEn:
      "You cannot fix what you cannot see. Metacognition is the torch you shine into the area you assumed was lit.",
    deepDiveVi: [
      "John Flavell đặt ra khái niệm siêu nhận thức từ những năm 1970: suy nghĩ về chính quá trình suy nghĩ. Trong lớp học, biểu hiện của nó rất cụ thể. Hai học sinh cùng học hai giờ; người thứ nhất khép vở với cảm giác ổn, người thứ hai khép vở với danh sách ba câu chưa trả lời được. Người thứ hai sẽ tiến nhanh hơn dù cùng số giờ.",
      "Nghiên cứu về hiệu chỉnh cho thấy người kém nhất trong một kỹ năng lại thường tự đánh giá cao nhất, vì họ thiếu chính bộ tiêu chí để nhận ra mình sai. Cách phá vỡ vòng này là dùng chuẩn ngoài: đáp án chuẩn, tiêu chí chấm, hoặc một người biết nhiều hơn bạn.",
      "Thang tự tin biến việc học thành có dữ liệu. Sau bốn tuần, bạn sẽ thấy khuôn mẫu: có thể bạn luôn quá tự tin ở phần lý thuyết và quá khiêm tốn ở phần tính toán. Biết vậy, bạn phân bổ lại thời gian ôn theo bằng chứng chứ theo cảm giác.",
    ],
    deepDiveEn: [
      "John Flavell coined metacognition in the 1970s: thinking about your own thinking. In a classroom it looks very concrete. Two students study for two hours; the first closes the book feeling fine, the second closes it holding three unanswered questions. The second improves faster on identical hours.",
      "Calibration research shows the weakest performers in a skill often rate themselves highest, because they lack the very criteria needed to notice their errors. The way out is an external standard: answer keys, marking criteria, or a person who knows more than you.",
      "A confidence scale turns study into data. After four weeks you will see patterns, perhaps chronic overconfidence in theory and excessive doubt in calculation. Knowing that, you reallocate review time by evidence rather than by feeling.",
    ],
    illustrationEmojis: ["🔭", "📉", "🧭", "🪞"],
  },
  {
    id: "ss-14",
    pillar: "selfstudy",
    level: "mastery",
    minutes: 10,
    medium: "practice",
    titleVi: "Môi trường tập trung và vệ sinh số",
    titleEn: "Focus Environment and Digital Hygiene",
    subtitleVi:
      "Ý chí là nguồn lực cạn nhanh. Thiết kế môi trường để bạn không cần dùng ý chí ngay từ đầu.",
    subtitleEn:
      "Willpower drains fast. Design the environment so you never need willpower in the first place.",
    takeaways: [
      { vi: "Ma sát vật lý thắng ý chí: điện thoại ở phòng khác, tai nghe đã sạc, nước đã rót trước.",
        en: "Physical friction beats willpower: phone in another room, headphones charged, water poured in advance." },
      { vi: "Một bàn học chỉ dùng để học; ăn và xem phim ở nơi khác để não gắn bàn đó với sự tập trung.",
        en: "Keep one desk only for study; eat and watch elsewhere so your brain ties that desk to focus." },
      { vi: "Tắt toàn bộ thông báo trừ cuộc gọi; thông báo là lời mời chuyển việc do người khác gửi.",
            en: "Silence every notification except calls. A notification is a task switch scheduled by someone else." },
      { vi: "Dùng danh sách 'để sau': khi nảy ý muốn tra cứu, viết ra giấy và tra sau khối học.",
        en: "Keep a 'later list': when the urge to look something up appears, write it down and check after the block." },
      { vi: "Ánh sáng đủ, ghế đúng chiều cao, màn hình ngang tầm mắt làm tăng thời gian ngồi được.",
        en: "Good light, a correct chair height and a screen at eye level extend how long you can sit." },
      { vi: "Buổi tối: đặt điện thoại sạc ngoài phòng ngủ; đây là thay đổi có lợi nhất cho việc học ngày mai.",
        en: "At night, charge the phone outside the bedroom. It is the highest-return change for tomorrow's study." },
    ],
    frameworkVi:
      "Choice Architecture (Thaler & Sunstein) áp dụng cho góc học tập, cộng danh sách 'để sau' của Newport.",
    frameworkEn:
      "Choice architecture (Thaler and Sunstein) applied to a study corner, plus Newport's 'later list'.",
    reflectionVi:
      "Nếu một người lạ nhìn góc học của bạn, họ sẽ đoán bạn đang chuẩn bị học hay đang chuẩn bị giải trí?",
    reflectionEn:
      "If a stranger looked at your study corner, would they guess you are set up to study or set up to be entertained?",
    drillVi:
      "15 phút: dọn bàn còn đúng 4 vật cần cho buổi học tới. Tắt mọi thông báo trừ cuộc gọi. Dán tờ 'để sau' lên góc bàn.",
    drillEn:
      "15 min: clear your desk down to the 4 items your next session needs. Silence all notifications except calls. Tape a 'later list' to the corner.",
    whyItMattersVi:
      "Không ai thắng được thiết kế môi trường bằng quyết tâm. Nửa giờ dọn dẹp mua lại nhiều giờ tập trung mỗi tuần.",
    whyItMattersEn:
      "Nobody out-willpowers their environment. Half an hour of setup buys back hours of focus every week.",
    deepDiveVi: [
      "Nghiên cứu về hiện diện của điện thoại thông minh cho thấy chỉ cần thiết bị nằm úp trên bàn, hiệu suất làm việc nhận thức đã giảm so với khi nó ở phòng khác, dù người tham gia khẳng định họ không hề bị ảnh hưởng. Điều này quan trọng: cảm giác 'tôi kiểm soát được' chính là phần bị ảnh hưởng đầu tiên.",
      "Vệ sinh số nên đối xử giống vệ sinh răng miệng, tức là quy trình lặp lại chứ không phải quyết tâm. Ba việc nhỏ mỗi ngày đủ tạo khác biệt: sáng không mở mạng xã hội trước khi làm việc quan trọng đầu tiên, chiều gom mọi tin nhắn vào hai lần trả lời, tối cất điện thoại khỏi phòng ngủ.",
      "Danh sách 'để sau' giải quyết một cái bẫy tinh vi: nhu cầu tra cứu chính đáng. Bạn đang giải bài và thật sự cần biết một khái niệm, mở máy tra, hai mươi phút sau bạn đang đọc thứ khác. Ghi ra giấy giữ trọn ý định mà không mở cánh cửa dẫn đi.",
    ],
    deepDiveEn: [
      "Research on smartphone presence found that merely having the device face down on the desk lowered cognitive performance compared with leaving it in another room, even though participants insisted it had no effect on them. That matters: the sense of 'I have this under control' is the first thing affected.",
      "Treat digital hygiene like dental hygiene, a repeated routine rather than an act of resolve. Three small rules are enough: no social feeds before the first important task, batch all messaging into two reply windows, and keep the phone out of the bedroom at night.",
      "The 'later list' solves a subtle trap: the legitimate need to look something up. You are solving a problem, you genuinely need one definition, you open the device, and twenty minutes later you are reading something else. Writing it down preserves the intention without opening the door.",
    ],
    illustrationEmojis: ["🪑", "🔇", "🧹", "💡"],
  },
  {
    id: "ss-15",
    pillar: "selfstudy",
    level: "mastery",
    minutes: 12,
    medium: "practice",
    titleVi: "Dạy lại, làm dự án và công bố - Kỳ thi cuối cùng của người tự học",
    titleEn: "Teaching, Projects and Publishing - The Self-Learner's Final Exam",
    subtitleVi:
      "Kiến thức chưa được dùng trước mặt người khác vẫn chỉ là giả thuyết. Dự án và bài công bố biến nó thành năng lực có bằng chứng.",
    subtitleEn:
      "Knowledge never used in front of other people is still a hypothesis. Projects and published work turn it into evidenced ability.",
    takeaways: [
      { vi: "Chọn dự án nhỏ nhưng hoàn chỉnh: một trang web, một bài phân tích 3 trang, một video 5 phút.",
        en: "Choose a small but complete project: one web page, a 3-page analysis, a 5-minute video." },
      { vi: "Dự án phải có người xem thật; khán giả là cơ chế nâng chuẩn mạnh hơn mọi lời hứa với bản thân.",
        en: "Projects need a real audience. An audience raises standards more than any promise to yourself." },
      { vi: "Dạy lại một chương cho nhóm 3 bạn buộc bạn học sâu hơn cả việc thi chương đó.",
        en: "Teaching one chapter to three classmates forces deeper learning than being tested on it." },
      { vi: "Ghi lại quá trình, không chỉ kết quả: quá trình là phần người khác học được và là hồ sơ của bạn.",
        en: "Document the process, not just the result. The process is what others learn from and what your portfolio shows." },
      { vi: "Nhịp bền vững: 1 dự án nhỏ mỗi 6 tuần, kèm 1 bài viết ngắn về điều bạn đã sai.",
        en: "A sustainable rhythm: one small project every 6 weeks plus a short write-up of what you got wrong." },
      { vi: "Sau 1 năm, sáu dự án hoàn chỉnh nói được nhiều hơn ba mươi khoá học đã ghi danh.",
        en: "After a year, six finished projects say more than thirty enrolled courses." },
    ],
    frameworkVi:
      "Learning in Public kết hợp Protégé Effect: học để dạy, dạy để công bố, công bố để nhận phản hồi.",
    frameworkEn:
      "Learning in Public combined with the protégé effect: learn to teach, teach to publish, publish to get feedback.",
    reflectionVi:
      "Ai là ba người có thể nghe bạn trình bày trong tuần này, và bạn sẽ trình bày điều gì?",
    reflectionEn:
      "Who are three people who could listen to you present this week, and what would you present?",
    drillVi:
      "25 phút: chọn 1 chủ đề bạn học tháng này. Viết bản dàn ý 1 trang cho buổi dạy 10 phút, hẹn ngày cụ thể với ít nhất 1 người nghe.",
    drillEn:
      "25 min: pick one topic from this month. Write a one-page outline for a 10-minute teaching session and book a date with at least one listener.",
    whyItMattersVi:
      "Bằng cấp chứng minh bạn đã ngồi trong lớp; dự án và bài công bố chứng minh bạn làm được. Trong tuyển dụng và học bổng, cái thứ hai ngày càng nặng hơn.",
    whyItMattersEn:
      "A certificate proves you sat in a classroom; projects and published work prove you can do the thing. In hiring and scholarships, the second increasingly weighs more.",
    deepDiveVi: [
      "Hiệu ứng protégé mô tả điều mà mọi trợ giảng đều biết: bạn hiểu một chương kỹ nhất vào ngày bạn phải dạy nó. Nguyên nhân là dạy đòi hỏi ba việc mà học một mình không đòi: sắp xếp trật tự ý, dự đoán câu hỏi khó, và chọn ví dụ phù hợp người nghe.",
      "Dự án nhỏ và hoàn chỉnh quan trọng hơn dự án lớn và dở dang. Một trang web ba màn hình đã chạy dạy bạn nhiều hơn một ứng dụng lớn bỏ ở giữa, vì chỉ phần hoàn thiện cuối cùng mới lộ ra những chi tiết mà lý thuyết bỏ qua.",
      "Việc công bố cả phần mình từng sai có giá trị kép. Nó buộc bạn nhìn lại quá trình một lần nữa, và nó giúp bạn được người khác tìm đến, vì phần lớn người học đang tìm chính những lỗi mà họ đang mắc.",
      "Với học sinh Việt, con đường dễ nhất là một chuỗi bài ngắn bằng hai ngôn ngữ về chủ đề bạn đang học, kèm ví dụ tự làm. Sau sáu tháng, đó vừa là hồ sơ học bổng, vừa là bộ ghi chú tốt nhất bạn từng có.",
    ],
    deepDiveEn: [
      "The protégé effect describes what every teaching assistant knows: you understand a chapter best on the day you must teach it. Teaching demands three things solo study does not: ordering the ideas, predicting the hard questions, and choosing examples that fit the listener.",
      "Small and finished beats large and abandoned. A three-screen website that actually runs teaches more than a big app left half-built, because only the final polish exposes the details theory skips.",
      "Publishing your mistakes has double value. It forces one more pass over your process, and it draws other people to you, since most learners are searching for exactly the errors they are currently making.",
      "For students here, the easiest route is a series of short bilingual posts about what you are studying, each with an example you built yourself. After six months that is both a scholarship portfolio and the best set of notes you have ever owned.",
    ],
    illustrationEmojis: ["🧑‍🏫", "🛠️", "🌍", "🏆"],
  },
];
