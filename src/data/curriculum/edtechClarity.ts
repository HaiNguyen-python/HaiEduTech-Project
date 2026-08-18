import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech clarity layer.
 *
 * Every EdTech lesson gets three extra blocks appended to its theory so the
 * content is easier to follow:
 *  - "In one sentence" (the core idea, plain language)
 *  - "Key terms" (a 3-term glossary written for beginners)
 *  - "Concrete example" + "Common mistake"
 *
 * The blocks are hand-written per lesson, in Vietnamese and English, so both
 * languages stay 1:1.
 */

interface ClarityEntry {
  /** One-sentence core idea */
  gist: string;
  gistEn: string;
  /** Glossary: term -> plain explanation */
  terms: [string, string][];
  termsEn: [string, string][];
  /** A concrete, realistic example */
  example: string;
  exampleEn: string;
  /** The mistake beginners make most often */
  mistake: string;
  mistakeEn: string;
}

const CLARITY: Record<string, ClarityEntry> = {
  "edtech-1": {
    gist: "EdTech chỉ hiệu quả khi phần mềm phục vụ một nguyên lý học tập cụ thể, không phải khi có nhiều tính năng.",
    gistEn: "EdTech only works when the software serves a specific learning principle, not when it has more features.",
    terms: [
      ["Khoa học học tập", "Tập hợp bằng chứng về cách trí nhớ và sự chú ý hoạt động"],
      ["Vòng lặp học tập", "Chu trình: học sinh làm - hệ thống phản hồi - học sinh sửa"],
      ["Hiệu quả sư phạm", "Mức tiến bộ đo được, không phải thời gian ngồi trước màn hình"],
    ],
    termsEn: [
      ["Learning science", "The body of evidence about how memory and attention actually work"],
      ["Learning loop", "The cycle: learner acts - system responds - learner corrects"],
      ["Pedagogical effectiveness", "Measured progress, not time spent staring at a screen"],
    ],
    example: "Một app từ vựng thêm nút 'nghe lại' rẻ hơn và tăng ghi nhớ nhiều hơn là thêm bảng xếp hạng mới.",
    exampleEn: "Adding a 'replay audio' button to a vocabulary app is cheaper and improves retention more than adding another leaderboard.",
    mistake: "Xây tính năng vì đối thủ có, rồi mới đi tìm lý do sư phạm để biện minh.",
    mistakeEn: "Building a feature because a competitor has it, then inventing a pedagogical reason afterwards.",
  },
  "edtech-2": {
    gist: "SM-2 quyết định NGÀY ôn lại tiếp theo dựa trên việc bạn nhớ dễ hay khó, nên thời gian ôn tăng dần.",
    gistEn: "SM-2 decides the NEXT review date from how easily you recalled an item, so intervals grow over time.",
    terms: [
      ["Interval", "Số ngày tới lần ôn kế tiếp"],
      ["Ease factor (EF)", "Hệ số nhân độ dễ, thường bắt đầu 2.5 và giảm khi trả lời sai"],
      ["Quality (q)", "Điểm tự đánh giá 0-5 cho lần ôn vừa rồi"],
    ],
    termsEn: [
      ["Interval", "Number of days until the next review"],
      ["Ease factor (EF)", "Difficulty multiplier, usually starting at 2.5 and dropping after failures"],
      ["Quality (q)", "A 0-5 self-rating of the review you just did"],
    ],
    example: "Từ 'ubiquitous' trả lời đúng dễ dàng (q=5): 1 ngày -> 6 ngày -> 15 ngày. Sai một lần là quay lại 1 ngày.",
    exampleEn: "The word 'ubiquitous' recalled easily (q=5): 1 day -> 6 days -> 15 days. One failure resets it to 1 day.",
    mistake: "Cho học sinh ôn tất cả thẻ mỗi ngày, làm mất toàn bộ lợi ích của giãn cách.",
    mistakeEn: "Making learners review every card daily, which destroys the entire benefit of spacing.",
  },
  "edtech-3": {
    gist: "Độ khó thích ứng giữ tỷ lệ đúng quanh 70-85% để học sinh không chán và cũng không nản.",
    gistEn: "Adaptive difficulty keeps accuracy around 70-85% so learners are neither bored nor overwhelmed.",
    terms: [
      ["Mastery", "Xác suất ước lượng rằng học sinh đã nắm một kỹ năng"],
      ["Vùng phát triển gần", "Mức khó vừa trên khả năng hiện tại"],
      ["Ngưỡng thăng cấp", "Điều kiện để mở nội dung khó hơn, ví dụ 5 lần đúng liên tiếp"],
    ],
    termsEn: [
      ["Mastery", "The estimated probability that a learner has acquired a skill"],
      ["Zone of proximal development", "Difficulty just above current ability"],
      ["Promotion threshold", "The rule for unlocking harder content, e.g. 5 correct in a row"],
    ],
    example: "Học sinh đúng 9/10 câu A2 -> chuyển sang B1. Đúng 4/10 câu B1 -> hạ lại A2 kèm gợi ý.",
    exampleEn: "A learner scoring 9/10 at A2 moves to B1; scoring 4/10 at B1 drops back to A2 with hints.",
    mistake: "Tăng độ khó theo số bài đã làm thay vì theo kết quả thật.",
    mistakeEn: "Raising difficulty by lessons completed instead of by actual performance.",
  },
  "edtech-4": {
    gist: "AI Tutor tốt không đưa đáp án ngay mà dẫn dắt bằng câu hỏi, dựa trên giáo trình có kiểm soát.",
    gistEn: "A good AI tutor withholds the answer and guides with questions, grounded in a controlled curriculum.",
    terms: [
      ["System prompt", "Bản mô tả vai trò và giới hạn của tutor"],
      ["Socratic mode", "Cách trả lời bằng câu hỏi gợi mở thay vì lời giải"],
      ["Grounding", "Buộc mô hình chỉ dùng nội dung bài học được cung cấp"],
    ],
    termsEn: [
      ["System prompt", "The description of the tutor's role and limits"],
      ["Socratic mode", "Responding with guiding questions instead of solutions"],
      ["Grounding", "Forcing the model to rely only on supplied lesson content"],
    ],
    example: "Học sinh hỏi 'đáp án câu 3?' -> tutor hỏi lại 'Câu này thì hiện tại đơn hay tiếp diễn? Vì sao?'.",
    exampleEn: "A learner asks 'what's the answer to Q3?' - the tutor replies 'Is this present simple or continuous? Why?'.",
    mistake: "Gắn thẳng LLM vào khung chat mà không có prompt vai trò, không log, không giới hạn chủ đề.",
    mistakeEn: "Wiring an LLM straight into a chat box with no role prompt, no logging and no topic limits.",
  },
  "edtech-5": {
    gist: "Chấm tự động chỉ đáng tin khi có rubric rõ ràng và được đối chiếu với điểm của giáo viên thật.",
    gistEn: "Auto-grading is only trustworthy with an explicit rubric validated against real teacher scores.",
    terms: [
      ["Rubric", "Bảng tiêu chí chấm với mô tả từng mức điểm"],
      ["Inter-rater agreement", "Mức trùng khớp giữa AI và giáo viên"],
      ["Feedback hành động", "Nhận xét chỉ rõ việc cần sửa, không chỉ nêu điểm"],
    ],
    termsEn: [
      ["Rubric", "A scoring table describing each band explicitly"],
      ["Inter-rater agreement", "How closely AI scores match teacher scores"],
      ["Actionable feedback", "Comments naming what to fix, not just a score"],
    ],
    example: "Bài IELTS Writing được chấm 4 tiêu chí, mỗi tiêu chí kèm 1 câu trích dẫn từ bài làm.",
    exampleEn: "An IELTS Writing task is scored on 4 criteria, each with one quoted sentence from the essay.",
    mistake: "Trả về một con số duy nhất mà học sinh không biết phải sửa gì.",
    mistakeEn: "Returning a single number that tells the learner nothing about what to change.",
  },
  "edtech-6": {
    gist: "Gợi ý bài kế tiếp là bài toán chọn nội dung vừa lấp lỗ hổng kiến thức vừa giữ động lực.",
    gistEn: "Next-lesson recommendation means picking content that fills a knowledge gap while keeping motivation.",
    terms: [
      ["Content-based", "Gợi ý theo độ giống nội dung học sinh vừa học"],
      ["Collaborative filtering", "Gợi ý dựa trên hành vi của học sinh tương tự"],
      ["Cold start", "Tình huống chưa có dữ liệu về người dùng mới"],
    ],
    termsEn: [
      ["Content-based", "Recommending by similarity to what the learner just studied"],
      ["Collaborative filtering", "Recommending from the behaviour of similar learners"],
      ["Cold start", "Having no data yet about a new user"],
    ],
    example: "Học sinh sai nhiều câu thì quá khứ -> hệ thống xếp bài 'Past Simple review' lên đầu hàng chờ.",
    exampleEn: "A learner failing past-tense items gets 'Past Simple review' pushed to the top of the queue.",
    mistake: "Luôn gợi bài dễ nhất để chỉ số hoàn thành đẹp, khiến học sinh giậm chân tại chỗ.",
    mistakeEn: "Always recommending the easiest lesson to inflate completion rates, so learners plateau.",
  },
  "edtech-7": {
    gist: "Learning analytics chỉ có giá trị khi đo tiến bộ học tập, không phải lượt bấm.",
    gistEn: "Learning analytics only matters when it measures learning progress, not clicks.",
    terms: [
      ["Vanity metric", "Chỉ số nhìn đẹp nhưng không liên quan tới học tập"],
      ["Retention", "Tỷ lệ học sinh quay lại sau N ngày"],
      ["Mastery growth", "Mức tăng năng lực đo bằng bài kiểm tra"],
    ],
    termsEn: [
      ["Vanity metric", "A number that looks good but is unrelated to learning"],
      ["Retention", "Share of learners returning after N days"],
      ["Mastery growth", "Ability gains measured by assessment"],
    ],
    example: "Thay 'tổng phút sử dụng' bằng 'số từ chuyển từ mới sang thành thạo mỗi tuần'.",
    exampleEn: "Replace 'total minutes used' with 'words moved from new to mastered per week'.",
    mistake: "Báo cáo cho phụ huynh bằng thời gian online thay vì kết quả học.",
    mistakeEn: "Reporting time online to parents instead of learning outcomes.",
  },
  "edtech-8": {
    gist: "Gamification hiệu quả khi phần thưởng gắn với hành vi học, không gắn với việc mở app.",
    gistEn: "Gamification works when rewards attach to learning behaviour, not to opening the app.",
    terms: [
      ["Engagement loop", "Kích hoạt - hành động - phần thưởng - đầu tư"],
      ["Streak", "Chuỗi ngày học liên tiếp"],
      ["Extrinsic overshadowing", "Phần thưởng ngoài làm giảm hứng thú bên trong"],
    ],
    termsEn: [
      ["Engagement loop", "Trigger - action - reward - investment"],
      ["Streak", "Consecutive days of study"],
      ["Extrinsic overshadowing", "External rewards crowding out intrinsic interest"],
    ],
    example: "Cho XP khi hoàn thành bài ôn đúng hạn, không cho XP khi chỉ mở ứng dụng.",
    exampleEn: "Award XP for completing a due review, never for merely opening the app.",
    mistake: "Streak quá nghiêm khắc khiến học sinh bỏ hẳn sau một ngày lỡ.",
    mistakeEn: "Streaks so punishing that one missed day makes learners quit entirely.",
  },
  "edtech-9": {
    gist: "A/B test sư phạm phải so sánh kết quả học, với đủ cỡ mẫu và thời gian đủ dài.",
    gistEn: "Pedagogical A/B tests must compare learning outcomes, with adequate sample size and duration.",
    terms: [
      ["Biến phụ thuộc", "Chỉ số kết quả bạn muốn cải thiện"],
      ["Cỡ mẫu", "Số học sinh cần để kết quả đáng tin"],
      ["Peeking", "Xem kết quả sớm rồi dừng test, gây kết luận sai"],
    ],
    termsEn: [
      ["Outcome variable", "The result metric you want to improve"],
      ["Sample size", "How many learners you need for a trustworthy result"],
      ["Peeking", "Stopping a test early after checking, which produces false conclusions"],
    ],
    example: "Thử 2 kiểu phản hồi trong 3 tuần, so điểm bài kiểm tra cuối chứ không so lượt bấm.",
    exampleEn: "Trial two feedback styles for 3 weeks and compare end-of-unit test scores, not clicks.",
    mistake: "Kết luận sau 2 ngày với 40 học sinh.",
    mistakeEn: "Concluding after 2 days with 40 learners.",
  },
  "edtech-helsinki-1": {
    gist: "Đọc paper để lấy phương pháp và giới hạn, không chỉ lấy kết luận giật tít.",
    gistEn: "Read papers for method and limitations, not just the headline conclusion.",
    terms: [
      ["Abstract", "Tóm tắt: câu hỏi, phương pháp, kết quả"],
      ["Effect size", "Độ lớn của tác động, quan trọng hơn giá trị p"],
      ["Limitations", "Phần tác giả tự nêu điểm yếu của nghiên cứu"],
    ],
    termsEn: [
      ["Abstract", "The summary: question, method, result"],
      ["Effect size", "How large the impact is, more informative than a p-value"],
      ["Limitations", "The section where authors state their own weaknesses"],
    ],
    example: "Một nghiên cứu tăng điểm 0.2 SD trên 60 học sinh không đủ để đổi toàn bộ giáo trình.",
    exampleEn: "A study showing a 0.2 SD gain across 60 learners is not enough to redesign a whole curriculum.",
    mistake: "Trích một câu trong abstract làm bằng chứng cho tính năng sản phẩm.",
    mistakeEn: "Quoting one line of an abstract as evidence for a product feature.",
  },
  "edtech-adv-1": {
    gist: "FSRS thay heuristic của SM-2 bằng mô hình trí nhớ có tham số học từ dữ liệu thật.",
    gistEn: "FSRS replaces SM-2 heuristics with a memory model whose parameters are learned from real data.",
    terms: [
      ["Retrievability", "Xác suất nhớ được ngay lúc này"],
      ["Stability", "Độ bền của trí nhớ, quyết định tốc độ quên"],
      ["Difficulty", "Độ khó riêng của từng thẻ"],
    ],
    termsEn: [
      ["Retrievability", "Probability of recalling the item right now"],
      ["Stability", "How durable the memory is, driving the forgetting rate"],
      ["Difficulty", "The intrinsic hardness of a specific card"],
    ],
    example: "Đặt mục tiêu retrievability 0.9: hệ thống lên lịch ôn đúng lúc xác suất nhớ tụt về 90%.",
    exampleEn: "Target retrievability 0.9: the scheduler reviews an item exactly when recall probability falls to 90%.",
    mistake: "Áp tham số FSRS mặc định rồi không bao giờ huấn luyện lại theo dữ liệu người dùng.",
    mistakeEn: "Shipping default FSRS parameters and never retraining them on your own user data.",
  },
  "edtech-adv-2": {
    gist: "IRT tách năng lực học sinh khỏi độ khó câu hỏi, còn bandit chọn câu hỏi mang nhiều thông tin nhất.",
    gistEn: "IRT separates learner ability from item difficulty, while bandits pick the most informative item.",
    terms: [
      ["Theta", "Năng lực ước lượng của học sinh"],
      ["Item difficulty (b)", "Mức năng lực cần để trả lời đúng 50%"],
      ["Exploration", "Thử câu hỏi chưa chắc để thu thêm thông tin"],
    ],
    termsEn: [
      ["Theta", "The learner's estimated ability"],
      ["Item difficulty (b)", "The ability level giving a 50% chance of a correct answer"],
      ["Exploration", "Trying uncertain items to gather more information"],
    ],
    example: "Bài thi thích ứng: đúng thì câu sau khó hơn, sai thì dễ hơn, kết thúc khi sai số theta đủ nhỏ.",
    exampleEn: "An adaptive test: correct answers raise difficulty, wrong ones lower it, stopping when theta error is small.",
    mistake: "Ước lượng theta từ 3 câu rồi coi đó là trình độ chính thức.",
    mistakeEn: "Estimating theta from 3 items and treating it as an official proficiency level.",
  },
  "edtech-adv-3": {
    gist: "RAG cho tutor nghĩa là mọi câu trả lời phải truy về được một đoạn giáo trình cụ thể.",
    gistEn: "RAG for a tutor means every answer must trace back to a specific curriculum passage.",
    terms: [
      ["Chunk", "Đoạn nội dung nhỏ được đánh chỉ mục"],
      ["Embedding", "Vector số biểu diễn ý nghĩa của đoạn"],
      ["Citation", "Nguồn trích dẫn kèm theo câu trả lời"],
    ],
    termsEn: [
      ["Chunk", "A small indexed slice of content"],
      ["Embedding", "A numeric vector representing meaning"],
      ["Citation", "The source reference attached to an answer"],
    ],
    example: "Hỏi 'thì hiện tại hoàn thành dùng khi nào' -> tutor trả lời và ghi 'Bài 12, mục 2'.",
    exampleEn: "Asked 'when do we use present perfect?' the tutor answers and cites 'Lesson 12, section 2'.",
    mistake: "Cho mô hình tự do trả lời khi không tìm thấy chunk phù hợp.",
    mistakeEn: "Letting the model answer freely when no relevant chunk was retrieved.",
  },
  "edtech-adv-4": {
    gist: "Chấm AI công bằng cần rubric, mẫu chuẩn (anchor) và kiểm tra thiên lệch theo nhóm học sinh.",
    gistEn: "Fair AI grading needs rubrics, anchor samples and bias checks across learner groups.",
    terms: [
      ["Anchor sample", "Bài mẫu đã được giáo viên chấm dùng làm chuẩn"],
      ["Calibration", "Hiệu chỉnh điểm AI về thang điểm thật"],
      ["Bias audit", "Kiểm tra chênh lệch điểm giữa các nhóm"],
    ],
    termsEn: [
      ["Anchor sample", "A teacher-scored exemplar used as a reference"],
      ["Calibration", "Aligning AI scores with the real scale"],
      ["Bias audit", "Checking score gaps between learner groups"],
    ],
    example: "Kèm 3 bài mẫu band 5/6.5/8 trong prompt để mô hình neo thang điểm.",
    exampleEn: "Include three exemplars at band 5/6.5/8 in the prompt so the model anchors its scale.",
    mistake: "Chấm speaking chỉ dựa vào transcript, bỏ qua phát âm và độ trôi chảy.",
    mistakeEn: "Grading speaking from the transcript alone, ignoring pronunciation and fluency.",
  },
  "edtech-adv-5": {
    gist: "Knowledge tracing ước lượng xác suất học sinh nắm từng kỹ năng sau mỗi lần trả lời.",
    gistEn: "Knowledge tracing estimates the probability a learner knows each skill after every response.",
    terms: [
      ["BKT", "Mô hình Bayes với 4 tham số: init, learn, slip, guess"],
      ["Slip", "Biết nhưng vẫn trả lời sai"],
      ["Guess", "Không biết nhưng đoán trúng"],
    ],
    termsEn: [
      ["BKT", "A Bayesian model with four parameters: init, learn, slip, guess"],
      ["Slip", "Knowing the skill but answering wrongly"],
      ["Guess", "Not knowing but answering correctly by chance"],
    ],
    example: "Sau 6 lần đúng liên tiếp, P(biết) đạt 0.95 -> đánh dấu thành thạo và giãn lịch ôn.",
    exampleEn: "After six consecutive correct answers P(known) hits 0.95, so the skill is marked mastered and spaced out.",
    mistake: "Xem một lần trả lời sai là mất hoàn toàn kỹ năng.",
    mistakeEn: "Treating a single wrong answer as complete loss of the skill.",
  },
  "edtech-adv-6": {
    gist: "Onboarding tốt đưa học sinh tới trải nghiệm giá trị đầu tiên trong vài phút, không phải vài ngày.",
    gistEn: "Good onboarding delivers the first real value in minutes, not days.",
    terms: [
      ["Aha moment", "Khoảnh khắc học sinh thấy sản phẩm hữu ích"],
      ["Time-to-value", "Thời gian từ đăng ký tới lợi ích đầu tiên"],
      ["Activation", "Hoàn thành hành vi cốt lõi lần đầu"],
    ],
    termsEn: [
      ["Aha moment", "When the learner first sees the product's value"],
      ["Time-to-value", "Time from signup to first benefit"],
      ["Activation", "Completing the core behaviour for the first time"],
    ],
    example: "Cho học sinh làm 5 câu đầu trước khi bắt tạo tài khoản.",
    exampleEn: "Let learners answer the first five questions before asking them to create an account.",
    mistake: "Bắt điền hồ sơ và khảo sát mục tiêu trước khi cho học thử.",
    mistakeEn: "Forcing profile forms and goal surveys before any actual learning.",
  },
  "edtech-adv-7": {
    gist: "Gợi ý lộ trình phải cân bằng ba lực: lỗ hổng kiến thức, lịch ôn tới hạn và mục tiêu của học sinh.",
    gistEn: "Path recommendation balances three forces: knowledge gaps, due reviews and the learner's own goal.",
    terms: [
      ["Prerequisite graph", "Đồ thị bài học nào cần học trước"],
      ["Due queue", "Danh sách nội dung tới hạn ôn"],
      ["Diversity", "Trộn chủ đề để tránh nhàm chán"],
    ],
    termsEn: [
      ["Prerequisite graph", "The graph of which lesson must come first"],
      ["Due queue", "The list of items due for review"],
      ["Diversity", "Mixing topics to avoid monotony"],
    ],
    example: "Mỗi phiên 20 phút: 40% ôn tới hạn, 40% kỹ năng yếu, 20% nội dung mới theo mục tiêu.",
    exampleEn: "Each 20-minute session: 40% due reviews, 40% weak skills, 20% new goal-driven content.",
    mistake: "Bỏ qua đồ thị tiên quyết nên gợi bài nâng cao cho người chưa có nền.",
    mistakeEn: "Ignoring the prerequisite graph and recommending advanced work to unprepared learners.",
  },
  "edtech-adv-8": {
    gist: "Với trẻ em, mặc định phải là thu thập dữ liệu tối thiểu và có sự đồng ý của phụ huynh.",
    gistEn: "For children, the default must be minimal data collection with verified parental consent.",
    terms: [
      ["Data minimisation", "Chỉ thu thập dữ liệu thật sự cần"],
      ["Parental consent", "Sự đồng ý có xác minh của người giám hộ"],
      ["Retention policy", "Quy định xoá dữ liệu sau thời hạn"],
    ],
    termsEn: [
      ["Data minimisation", "Collecting only what is genuinely required"],
      ["Parental consent", "Verified approval from a guardian"],
      ["Retention policy", "Rules for deleting data after a set period"],
    ],
    example: "Không lưu ảnh khuôn mặt, chỉ lưu điểm bài làm và xoá log giọng nói sau 30 ngày.",
    exampleEn: "Store no face images, keep only scores, and delete voice logs after 30 days.",
    mistake: "Bật analytics bên thứ ba trên tài khoản trẻ em.",
    mistakeEn: "Enabling third-party analytics on children's accounts.",
  },
  "edtech-gr-1": {
    gist: "Bloom cho thấy kèm 1-1 hơn lớp thường khoảng 2 độ lệch chuẩn; EdTech cố thu hẹp khoảng cách đó.",
    gistEn: "Bloom showed 1:1 tutoring beats classrooms by about two standard deviations; EdTech tries to close that gap.",
    terms: [
      ["Sigma", "Một độ lệch chuẩn của phân bố điểm"],
      ["Mastery learning", "Chỉ học tiếp khi đã đạt chuẩn phần trước"],
      ["Replication", "Nghiên cứu lặp lại để kiểm chứng"],
    ],
    termsEn: [
      ["Sigma", "One standard deviation of the score distribution"],
      ["Mastery learning", "Only moving on after meeting the standard"],
      ["Replication", "Repeat studies that verify a result"],
    ],
    example: "Học sinh trung bình được kèm 1-1 vươn lên top 2% của lớp truyền thống trong nghiên cứu gốc.",
    exampleEn: "In the original study, the average tutored learner reached the top 2% of a conventional class.",
    mistake: "Coi con số 2-sigma là bảo đảm cho mọi sản phẩm gắn nhãn 'cá nhân hoá'.",
    mistakeEn: "Treating the 2-sigma figure as a guarantee for anything labelled 'personalised'.",
  },
  "edtech-gr-2": {
    gist: "PSLC DataShop chứng minh giá trị của dữ liệu học tập chuẩn hoá dùng chung giữa các nghiên cứu.",
    gistEn: "PSLC DataShop shows the value of standardised learning data shared across studies.",
    terms: [
      ["Learning curve", "Đường tỷ lệ lỗi giảm dần theo số lần luyện"],
      ["KC (knowledge component)", "Đơn vị kỹ năng nhỏ nhất được đo"],
      ["Transaction log", "Bản ghi từng thao tác của học sinh"],
    ],
    termsEn: [
      ["Learning curve", "Error rate falling as practice opportunities increase"],
      ["KC (knowledge component)", "The smallest measured unit of skill"],
      ["Transaction log", "A record of every learner action"],
    ],
    example: "Vẽ learning curve cho KC 'chia phân số': nếu đường không dốc xuống, nội dung dạy chưa hiệu quả.",
    exampleEn: "Plot the learning curve for the KC 'dividing fractions': a flat curve means the instruction is not working.",
    mistake: "Ghi log không có mã KC nên sau này không phân tích được gì.",
    mistakeEn: "Logging events without KC tags, which makes later analysis impossible.",
  },
  "edtech-gr-3": {
    gist: "MOOC dạy rằng quy mô lớn không tự tạo ra kết quả học; thiết kế và hỗ trợ mới tạo.",
    gistEn: "MOOCs taught us that scale alone does not produce learning; design and support do.",
    terms: [
      ["Completion rate", "Tỷ lệ hoàn thành khoá, thường dưới 10%"],
      ["Cohort", "Nhóm học sinh bắt đầu cùng thời điểm"],
      ["Blended learning", "Kết hợp trực tuyến và trên lớp"],
    ],
    termsEn: [
      ["Completion rate", "Share of learners finishing a course, often under 10%"],
      ["Cohort", "A group starting at the same time"],
      ["Blended learning", "Mixing online and in-person instruction"],
    ],
    example: "Khoá có deadline theo cohort và diễn đàn có trợ giảng hoàn thành cao hơn hẳn khoá tự do.",
    exampleEn: "Courses with cohort deadlines and staffed forums finish far better than fully self-paced ones.",
    mistake: "Đo thành công bằng số lượt đăng ký.",
    mistakeEn: "Measuring success by enrolment counts.",
  },
  "edtech-gr-4": {
    gist: "Học mở quy mô lớn chỉ hiệu quả khi có cấu trúc tối thiểu và cộng đồng đi kèm.",
    gistEn: "Open learning at scale works only with minimal structure and a surrounding community.",
    terms: [
      ["OER", "Tài nguyên giáo dục mở, được phép dùng lại"],
      ["Minimally invasive education", "Học sinh tự khám phá với can thiệp tối thiểu"],
      ["Scaffolding", "Hỗ trợ tạm thời rồi rút dần"],
    ],
    termsEn: [
      ["OER", "Open educational resources, licensed for reuse"],
      ["Minimally invasive education", "Learners exploring with minimal intervention"],
      ["Scaffolding", "Temporary support that is gradually withdrawn"],
    ],
    example: "MIT OCW hữu ích nhất khi người học có lộ trình rõ và nhóm học cùng.",
    exampleEn: "MIT OCW helps most when the learner has a clear path and a study group.",
    mistake: "Đưa toàn bộ tài liệu lên mạng rồi coi đó là một sản phẩm giáo dục.",
    mistakeEn: "Dumping all materials online and calling it an educational product.",
  },
  "edtech-gr-5": {
    gist: "Chính sách AI trong giáo dục xoay quanh minh bạch, bảo vệ dữ liệu và quyền kiểm soát của giáo viên.",
    gistEn: "AI-in-education policy centres on transparency, data protection and teacher oversight.",
    terms: [
      ["Human-in-the-loop", "Giáo viên luôn có quyền quyết định cuối"],
      ["Algorithmic transparency", "Giải thích được cách hệ thống ra quyết định"],
      ["Data sovereignty", "Dữ liệu học sinh lưu ở đâu và ai kiểm soát"],
    ],
    termsEn: [
      ["Human-in-the-loop", "Teachers keep the final decision"],
      ["Algorithmic transparency", "Being able to explain how the system decides"],
      ["Data sovereignty", "Where learner data lives and who controls it"],
    ],
    example: "Điểm AI hiển thị dưới dạng đề xuất, giáo viên duyệt trước khi vào học bạ.",
    exampleEn: "AI scores appear as suggestions that a teacher approves before they reach the gradebook.",
    mistake: "Dùng AI ra quyết định xếp lớp mà không có kênh khiếu nại.",
    mistakeEn: "Letting AI make placement decisions with no appeal channel.",
  },
  "edtech-ai-1": {
    gist: "LLM tutor là một chuỗi: nhận câu hỏi - tìm ngữ cảnh - sinh câu trả lời - kiểm duyệt - ghi log.",
    gistEn: "An LLM tutor is a pipeline: receive question - retrieve context - generate - moderate - log.",
    terms: [
      ["Orchestration", "Lớp điều phối các bước trong pipeline"],
      ["Context window", "Lượng văn bản mô hình đọc được một lần"],
      ["Guardrail", "Bộ lọc chặn nội dung không phù hợp"],
    ],
    termsEn: [
      ["Orchestration", "The layer coordinating pipeline steps"],
      ["Context window", "How much text the model can read at once"],
      ["Guardrail", "A filter blocking unsuitable content"],
    ],
    example: "Edge function nhận câu hỏi, truy vấn 5 chunk, gọi LLM, lọc đầu ra rồi ghi log chi phí.",
    exampleEn: "An edge function takes the question, retrieves 5 chunks, calls the LLM, filters output and logs cost.",
    mistake: "Gọi LLM trực tiếp từ trình duyệt bằng khoá API.",
    mistakeEn: "Calling the LLM straight from the browser with an API key.",
  },
  "edtech-ai-2": {
    gist: "Chất lượng RAG phụ thuộc vào cách cắt chunk nhiều hơn là vào mô hình sinh văn bản.",
    gistEn: "RAG quality depends more on how you chunk content than on the generation model.",
    terms: [
      ["Chunk size", "Độ dài mỗi đoạn, thường 200-500 token"],
      ["Overlap", "Phần chồng lấn giữa hai chunk để không mất ngữ cảnh"],
      ["Top-k", "Số chunk lấy ra cho mỗi câu hỏi"],
    ],
    termsEn: [
      ["Chunk size", "Length of each slice, typically 200-500 tokens"],
      ["Overlap", "Shared text between chunks so context is not lost"],
      ["Top-k", "How many chunks are retrieved per question"],
    ],
    example: "Cắt theo tiêu đề bài học, 300 token, overlap 50 token, lấy top-5 rồi xếp hạng lại.",
    exampleEn: "Chunk by lesson heading at 300 tokens with 50-token overlap, retrieve top-5, then rerank.",
    mistake: "Nhét cả bài học 5000 từ vào một chunk khiến truy hồi mất chính xác.",
    mistakeEn: "Putting a whole 5,000-word lesson in one chunk, which destroys retrieval precision.",
  },
  "edtech-ai-3": {
    gist: "Prompt cho học tập cần nêu rõ vai trò, trình độ học sinh, định dạng đầu ra và điều cấm.",
    gistEn: "Learning prompts must state the role, learner level, output format and prohibitions.",
    terms: [
      ["Few-shot", "Đưa vài ví dụ mẫu trong prompt"],
      ["Chain-of-Thought", "Yêu cầu mô hình lập luận từng bước"],
      ["ReAct", "Xen kẽ suy luận và gọi công cụ"],
    ],
    termsEn: [
      ["Few-shot", "Including a few worked examples in the prompt"],
      ["Chain-of-Thought", "Asking the model to reason step by step"],
      ["ReAct", "Interleaving reasoning with tool calls"],
    ],
    example: "'Bạn là gia sư IELTS. Học sinh band 5.5. Trả lời tối đa 120 từ, kèm 1 ví dụ. Không viết hộ bài.'",
    exampleEn: "'You are an IELTS tutor. The learner is band 5.5. Answer in 120 words with one example. Never write the essay for them.'",
    mistake: "Prompt mơ hồ kiểu 'hãy giúp học sinh học tốt hơn'.",
    mistakeEn: "Vague prompts like 'help the student learn better'.",
  },
  "edtech-ai-4": {
    gist: "Không có bộ đánh giá thì không biết tutor đang tốt lên hay xấu đi sau mỗi lần đổi prompt.",
    gistEn: "Without an eval set you cannot tell whether a prompt change made the tutor better or worse.",
    terms: [
      ["Golden set", "Bộ câu hỏi mẫu kèm đáp án chuẩn"],
      ["Hallucination", "Câu trả lời nghe hợp lý nhưng sai sự thật"],
      ["Groundedness", "Mức câu trả lời bám vào nguồn được cung cấp"],
    ],
    termsEn: [
      ["Golden set", "Reference questions with verified answers"],
      ["Hallucination", "A plausible-sounding but false answer"],
      ["Groundedness", "How closely the answer sticks to the supplied source"],
    ],
    example: "Giữ 100 câu hỏi mẫu, chạy lại sau mỗi lần đổi prompt và so tỷ lệ đúng.",
    exampleEn: "Keep 100 reference questions, rerun after every prompt change and compare accuracy.",
    mistake: "Đánh giá bằng cảm giác sau khi thử vài câu.",
    mistakeEn: "Judging quality by feel after trying a few questions.",
  },
  "edtech-ai-5": {
    gist: "An toàn cho tutor trẻ em là lọc cả đầu vào lẫn đầu ra, cộng với đường thoát tới người thật.",
    gistEn: "Child-safe tutoring means filtering both input and output, plus an escalation path to a human.",
    terms: [
      ["Moderation", "Kiểm duyệt nội dung tự động"],
      ["Age-appropriate", "Ngôn ngữ và chủ đề phù hợp lứa tuổi"],
      ["Escalation", "Chuyển tình huống nhạy cảm cho giáo viên"],
    ],
    termsEn: [
      ["Moderation", "Automated content screening"],
      ["Age-appropriate", "Language and topics suited to the age group"],
      ["Escalation", "Routing sensitive cases to a teacher"],
    ],
    example: "Phát hiện dấu hiệu căng thẳng tâm lý -> hiện thông tin hỗ trợ và gửi cảnh báo cho giáo viên.",
    exampleEn: "Detecting signs of distress shows support information and alerts a teacher.",
    mistake: "Chỉ lọc đầu ra mà không chặn câu hỏi nhạy cảm ở đầu vào.",
    mistakeEn: "Filtering only the output while letting sensitive prompts through.",
  },
  "edtech-ai-6": {
    gist: "Đa phương thức có ích khi mỗi kênh giải quyết một khó khăn học tập thật, không phải để trình diễn.",
    gistEn: "Multi-modal helps when each channel solves a real learning problem, not as a demo feature.",
    terms: [
      ["STT", "Chuyển giọng nói thành văn bản"],
      ["TTS", "Chuyển văn bản thành giọng nói"],
      ["OCR", "Nhận dạng chữ trong ảnh"],
    ],
    termsEn: [
      ["STT", "Speech to text"],
      ["TTS", "Text to speech"],
      ["OCR", "Recognising text inside an image"],
    ],
    example: "Học sinh chụp bài toán viết tay -> OCR -> tutor hỏi lại từng bước thay vì đưa đáp số.",
    exampleEn: "A learner photographs a handwritten problem; OCR feeds the tutor, which questions each step instead of giving the answer.",
    mistake: "Thêm giọng nói AI nhưng không kiểm tra chất lượng phát âm ngôn ngữ đích.",
    mistakeEn: "Adding AI voice without checking pronunciation quality in the target language.",
  },
  "edtech-ai-7": {
    gist: "LLMOps là phần biến một demo AI thành dịch vụ chạy được lâu dài với chi phí kiểm soát.",
    gistEn: "LLMOps is what turns an AI demo into a service that runs long term at controlled cost.",
    terms: [
      ["Token cost", "Chi phí theo số token vào/ra"],
      ["Canary rollout", "Bật tính năng cho một phần nhỏ người dùng trước"],
      ["Fallback model", "Mô hình dự phòng khi mô hình chính lỗi"],
    ],
    termsEn: [
      ["Token cost", "Cost driven by input/output tokens"],
      ["Canary rollout", "Enabling a change for a small slice of users first"],
      ["Fallback model", "A backup model when the primary one fails"],
    ],
    example: "Cache câu trả lời cho 200 câu hỏi phổ biến nhất, giảm 60% chi phí gọi mô hình.",
    exampleEn: "Caching answers for the 200 most common questions cuts model spend by 60%.",
    mistake: "Không đặt giới hạn chi tiêu, tới cuối tháng mới phát hiện hoá đơn tăng vọt.",
    mistakeEn: "Setting no spend limits and discovering the bill only at month end.",
  },
  "edtech-rm-1": {
    gist: "Một câu hỏi nghiên cứu tốt nêu rõ ai, can thiệp gì, so với gì và đo bằng chỉ số nào.",
    gistEn: "A good research question names the population, the intervention, the comparison and the outcome.",
    terms: [
      ["RQ", "Research question - câu hỏi nghiên cứu"],
      ["H1", "Giả thuyết dự đoán tác động"],
      ["Operationalisation", "Biến khái niệm trừu tượng thành chỉ số đo được"],
    ],
    termsEn: [
      ["RQ", "The research question"],
      ["H1", "The hypothesis predicting an effect"],
      ["Operationalisation", "Turning an abstract idea into a measurable metric"],
    ],
    example: "'Học sinh lớp 8 dùng flashcard giãn cách 4 tuần có điểm từ vựng cao hơn nhóm ôn tự do không?'",
    exampleEn: "'Do grade-8 learners using spaced flashcards for 4 weeks score higher on vocabulary than free-review peers?'",
    mistake: "Hỏi 'app của tôi có tốt không' - không đo được.",
    mistakeEn: "Asking 'is my app good?' - unmeasurable.",
  },
  "edtech-rm-2": {
    gist: "RCT mạnh vì phân nhóm ngẫu nhiên loại bỏ hầu hết yếu tố gây nhiễu.",
    gistEn: "RCTs are strong because randomisation removes most confounders.",
    terms: [
      ["Randomisation", "Chia nhóm hoàn toàn ngẫu nhiên"],
      ["Power", "Khả năng phát hiện tác động nếu nó tồn tại"],
      ["Attrition", "Học sinh bỏ giữa chừng"],
    ],
    termsEn: [
      ["Randomisation", "Assigning groups purely by chance"],
      ["Power", "The chance of detecting an effect that truly exists"],
      ["Attrition", "Participants dropping out mid-study"],
    ],
    example: "Ngẫu nhiên theo lớp thay vì theo học sinh để tránh học sinh trao đổi tài liệu với nhau.",
    exampleEn: "Randomise by class rather than by student so groups do not share materials.",
    mistake: "Để giáo viên chọn nhóm nào dùng tính năng mới.",
    mistakeEn: "Letting teachers choose which group gets the new feature.",
  },
  "edtech-rm-3": {
    gist: "Schema sự kiện thiết kế tốt từ đầu là điều kiện để phân tích học tập về sau.",
    gistEn: "A well-designed event schema up front is what makes later learning analysis possible.",
    terms: [
      ["Event", "Một hành động có thời điểm và ngữ cảnh"],
      ["Session", "Chuỗi sự kiện liên tục của một học sinh"],
      ["Idempotency", "Ghi lặp không làm sai số liệu"],
    ],
    termsEn: [
      ["Event", "A timestamped, contextualised action"],
      ["Session", "A continuous run of events by one learner"],
      ["Idempotency", "Duplicate writes not corrupting the numbers"],
    ],
    example: "Mỗi lần trả lời ghi: user_id, lesson_id, skill_id, đúng/sai, thời gian phản hồi.",
    exampleEn: "Each answer logs user_id, lesson_id, skill_id, correctness and response time.",
    mistake: "Chỉ ghi 'đã hoàn thành bài' nên không biết học sinh sai ở đâu.",
    mistakeEn: "Logging only 'lesson completed', so you never learn where errors happen.",
  },
  "edtech-rm-4": {
    gist: "A/B test cần tính cỡ mẫu trước và cố định thời điểm kết thúc trước khi bật thử nghiệm.",
    gistEn: "A/B tests need a sample-size calculation and a fixed end date decided before launch.",
    terms: [
      ["MDE", "Mức tác động nhỏ nhất muốn phát hiện"],
      ["p-value", "Xác suất thấy kết quả này nếu không có tác động thật"],
      ["Guardrail metric", "Chỉ số phải không xấu đi"],
    ],
    termsEn: [
      ["MDE", "The minimum detectable effect you care about"],
      ["p-value", "Probability of this result if there were no real effect"],
      ["Guardrail metric", "A metric that must not get worse"],
    ],
    example: "Muốn phát hiện tăng 3% tỷ lệ hoàn thành -> cần khoảng vài nghìn học sinh mỗi nhánh.",
    exampleEn: "Detecting a 3% lift in completion needs roughly a few thousand learners per arm.",
    mistake: "Chạy 5 biến thể cùng lúc trên 300 người dùng.",
    mistakeEn: "Running five variants at once on 300 users.",
  },
  "edtech-rm-5": {
    gist: "Khi không thể ngẫu nhiên hoá, DiD, IV và RDD giúp ước lượng tác động nhân quả gần đúng.",
    gistEn: "When randomisation is impossible, DiD, IV and RDD approximate causal effects.",
    terms: [
      ["DiD", "So sánh thay đổi trước-sau giữa hai nhóm"],
      ["IV", "Biến công cụ tác động gián tiếp tới can thiệp"],
      ["RDD", "So sánh quanh một ngưỡng cắt"],
    ],
    termsEn: [
      ["DiD", "Comparing before-after changes across two groups"],
      ["IV", "An instrument affecting treatment only indirectly"],
      ["RDD", "Comparing units just above and below a cutoff"],
    ],
    example: "Trường A triển khai app từ tháng 9, trường B chưa -> DiD so mức tăng điểm hai trường.",
    exampleEn: "School A adopts the app in September, school B does not; DiD compares their score changes.",
    mistake: "Coi tương quan giữa thời gian dùng app và điểm số là quan hệ nhân quả.",
    mistakeEn: "Treating the correlation between app time and scores as causation.",
  },
  "edtech-rm-6": {
    gist: "Nghiên cứu với trẻ em cần phê duyệt đạo đức, đồng ý của phụ huynh và quyền rút lui bất cứ lúc nào.",
    gistEn: "Research with children needs ethics approval, parental consent and the right to withdraw at any time.",
    terms: [
      ["IRB", "Hội đồng đạo đức duyệt nghiên cứu"],
      ["Assent", "Sự đồng ý của chính trẻ, bên cạnh của phụ huynh"],
      ["Anonymisation", "Loại bỏ thông tin định danh khỏi dữ liệu"],
    ],
    termsEn: [
      ["IRB", "The ethics board approving the study"],
      ["Assent", "The child's own agreement, alongside the parent's"],
      ["Anonymisation", "Stripping identifying information from data"],
    ],
    example: "Bản đồng ý viết ngôn ngữ đơn giản cho trẻ 10 tuổi, kèm bản chi tiết cho phụ huynh.",
    exampleEn: "A plain-language assent form for a 10-year-old plus a detailed consent form for the parent.",
    mistake: "Dùng dữ liệu sản phẩm thu thập sẵn cho bài báo mà không xin phép.",
    mistakeEn: "Reusing product data for a paper without permission.",
  },
  "edtech-prac-1": {
    gist: "Trí nhớ làm việc rất nhỏ, nên thiết kế bài học phải cắt bỏ mọi thứ không phục vụ mục tiêu.",
    gistEn: "Working memory is tiny, so lesson design must strip anything that does not serve the objective.",
    terms: [
      ["Intrinsic load", "Độ khó vốn có của nội dung"],
      ["Extraneous load", "Gánh nặng do trình bày kém gây ra"],
      ["Germane load", "Nỗ lực dùng để xây dựng hiểu biết"],
    ],
    termsEn: [
      ["Intrinsic load", "The inherent difficulty of the content"],
      ["Extraneous load", "Burden caused by poor presentation"],
      ["Germane load", "Effort spent building understanding"],
    ],
    example: "Đặt chú thích ngay cạnh hình thay vì dưới chân trang giúp giảm tải phân tán chú ý.",
    exampleEn: "Placing labels next to the diagram instead of in a caption reduces split-attention load.",
    mistake: "Vừa đọc chữ trên màn hình vừa phát giọng đọc y hệt, gây hiệu ứng dư thừa.",
    mistakeEn: "Narrating on-screen text word for word, causing the redundancy effect.",
  },
  "edtech-prac-2": {
    gist: "Thiết kế ngược bắt đầu từ đầu ra mong muốn, rồi mới tới bài kiểm tra và cuối cùng là hoạt động.",
    gistEn: "Backward design starts from the desired outcome, then the assessment, and only then the activities.",
    terms: [
      ["Learning outcome", "Điều học sinh làm được sau bài học"],
      ["Alignment", "Sự khớp giữa mục tiêu, bài kiểm tra và hoạt động"],
      ["Động từ Bloom", "Động từ quan sát được như 'phân loại', 'so sánh'"],
    ],
    termsEn: [
      ["Learning outcome", "What the learner can do after the lesson"],
      ["Alignment", "The match between objective, assessment and activity"],
      ["Bloom verb", "An observable verb such as 'classify' or 'compare'"],
    ],
    example: "Mục tiêu 'phân biệt hiện tại đơn và tiếp diễn' -> bài kiểm tra là 10 câu chọn thì đúng.",
    exampleEn: "Objective 'distinguish present simple from continuous' means the test is 10 tense-choice items.",
    mistake: "Viết mục tiêu 'hiểu về thì hiện tại' - không thể quan sát hay chấm được.",
    mistakeEn: "Writing 'understand the present tense' - impossible to observe or grade.",
  },
  "edtech-prac-3": {
    gist: "Tự gợi nhớ khó hơn đọc lại nhưng tạo trí nhớ bền hơn nhiều.",
    gistEn: "Retrieving from memory feels harder than rereading but builds far more durable memory.",
    terms: [
      ["Testing effect", "Việc kiểm tra chính là một cách học"],
      ["Interleaving", "Xen kẽ các dạng bài thay vì làm khối"],
      ["Desirable difficulty", "Khó khăn có chủ đích giúp học sâu hơn"],
    ],
    termsEn: [
      ["Testing effect", "Being tested is itself a way of learning"],
      ["Interleaving", "Mixing problem types instead of blocking them"],
      ["Desirable difficulty", "Deliberate difficulty that deepens learning"],
    ],
    example: "Trộn bài cộng, trừ, nhân trong một buổi thay vì làm 20 câu cộng liên tiếp.",
    exampleEn: "Mix addition, subtraction and multiplication in one session instead of 20 addition items in a row.",
    mistake: "Cho học sinh đọc lại ghi chú và tưởng rằng mình đã thuộc.",
    mistakeEn: "Letting learners reread notes and mistake fluency for knowledge.",
  },
  "edtech-prac-4": {
    gist: "Phản hồi hiệu quả nói rõ khoảng cách tới mục tiêu và bước tiếp theo, càng sớm càng tốt.",
    gistEn: "Effective feedback names the gap to the goal and the next step, as soon as possible.",
    terms: [
      ["Feed up", "Mục tiêu là gì"],
      ["Feed back", "Hiện tại đang ở đâu"],
      ["Feed forward", "Bước tiếp theo cần làm"],
    ],
    termsEn: [
      ["Feed up", "What the goal is"],
      ["Feed back", "Where the learner is now"],
      ["Feed forward", "What to do next"],
    ],
    example: "'Câu chủ đề rõ (đạt). Thiếu ví dụ ở đoạn 2. Việc tiếp theo: thêm 1 ví dụ cụ thể vào đoạn 2.'",
    exampleEn: "'Topic sentence is clear. Paragraph 2 lacks an example. Next step: add one concrete example to paragraph 2.'",
    mistake: "Chỉ khen chung chung 'làm tốt lắm' mà không nêu điều cụ thể.",
    mistakeEn: "Generic praise like 'great job' with nothing specific.",
  },
  "edtech-prac-5": {
    gist: "Động lực bền đến từ tự chủ, năng lực và kết nối, không đến từ điểm thưởng vô hạn.",
    gistEn: "Durable motivation comes from autonomy, competence and relatedness, not endless points.",
    terms: [
      ["Autonomy", "Được chọn học gì và học thế nào"],
      ["Competence", "Cảm giác mình đang giỏi lên"],
      ["Relatedness", "Cảm giác thuộc về một cộng đồng"],
    ],
    termsEn: [
      ["Autonomy", "Having a say in what and how to study"],
      ["Competence", "The felt sense of getting better"],
      ["Relatedness", "Belonging to a community"],
    ],
    example: "Cho học sinh chọn 1 trong 3 chủ đề luyện nói mỗi tuần, thay vì ấn định sẵn.",
    exampleEn: "Let learners pick one of three speaking topics each week instead of assigning one.",
    mistake: "Tăng phần thưởng liên tục cho tới khi bỏ thưởng là học sinh ngừng học.",
    mistakeEn: "Escalating rewards until removing them stops learning altogether.",
  },
  "edtech-prac-6": {
    gist: "Thiết kế tiếp cận được ngay từ đầu rẻ hơn nhiều so với sửa lại về sau, và có lợi cho mọi học sinh.",
    gistEn: "Designing for accessibility from the start is far cheaper than retrofitting and helps every learner.",
    terms: [
      ["WCAG", "Bộ tiêu chuẩn tiếp cận web"],
      ["UDL", "Thiết kế phổ quát: nhiều cách trình bày và thể hiện"],
      ["i18n", "Chuẩn bị sản phẩm cho nhiều ngôn ngữ"],
    ],
    termsEn: [
      ["WCAG", "The web accessibility standard"],
      ["UDL", "Universal design: multiple means of representation and expression"],
      ["i18n", "Preparing a product for multiple languages"],
    ],
    example: "Phụ đề cho mọi video giúp cả học sinh khiếm thính lẫn người học trong môi trường ồn.",
    exampleEn: "Captions on every video help deaf learners and anyone studying in a noisy place.",
    mistake: "Dùng màu để truyền tải thông tin mà không kèm chữ hoặc biểu tượng.",
    mistakeEn: "Using colour alone to convey meaning with no text or icon.",
  },
  "edtech-landscape-1": {
    gist: "Các sản phẩm dẫn đầu thắng nhờ vòng lặp phản hồi ngắn và dữ liệu, không nhờ nhiều nội dung hơn.",
    gistEn: "Market leaders win through short feedback loops and data, not by having more content.",
    terms: [
      ["Freemium", "Miễn phí cơ bản, trả tiền cho tính năng nâng cao"],
      ["B2B EdTech", "Bán cho trường học thay vì cho người học"],
      ["Chi phí biên", "Chi phí phục vụ thêm một người dùng"],
    ],
    termsEn: [
      ["Freemium", "Free core, paid advanced features"],
      ["B2B EdTech", "Selling to schools rather than to learners"],
      ["Marginal cost", "The cost of serving one more user"],
    ],
    example: "Google Classroom lớn nhanh nhờ đi kèm Workspace, không nhờ nội dung học.",
    exampleEn: "Google Classroom scaled through Workspace bundling, not through learning content.",
    mistake: "Sao chép giao diện của sản phẩm lớn mà không có dữ liệu để cá nhân hoá.",
    mistakeEn: "Copying a big product's UI without the data needed to personalise.",
  },
  "edtech-landscape-2": {
    gist: "Duolingo là một công ty thí nghiệm: mọi thay đổi đều đi qua A/B test trên hàng triệu người.",
    gistEn: "Duolingo is an experimentation company: every change passes through A/B tests on millions of users.",
    terms: [
      ["HLR", "Half-life regression, mô hình dự đoán quên"],
      ["Birdbrain", "Mô hình ước lượng độ khó bài tập của Duolingo"],
      ["DAU", "Số người dùng hoạt động hằng ngày"],
    ],
    termsEn: [
      ["HLR", "Half-life regression, their forgetting model"],
      ["Birdbrain", "Duolingo's exercise-difficulty model"],
      ["DAU", "Daily active users"],
    ],
    example: "Hệ thống dự đoán bạn sắp quên từ 'hablar' và chèn nó vào bài học hôm nay.",
    exampleEn: "The system predicts you are about to forget 'hablar' and slots it into today's lesson.",
    mistake: "Bắt chước streak và gem mà bỏ qua mô hình trí nhớ phía sau.",
    mistakeEn: "Copying streaks and gems while skipping the memory model underneath.",
  },
  "edtech-landscape-3": {
    gist: "Khan, Coursera và Moodle giải ba bài toán khác nhau: nội dung, cấp bằng và quản trị lớp học.",
    gistEn: "Khan, Coursera and Moodle solve three different problems: content, credentials and course administration.",
    terms: [
      ["LMS", "Hệ quản lý học tập của trường"],
      ["SCORM/xAPI", "Chuẩn đóng gói và ghi nhận hoạt động học"],
      ["Credential", "Chứng chỉ có giá trị với nhà tuyển dụng"],
    ],
    termsEn: [
      ["LMS", "The institution's learning management system"],
      ["SCORM/xAPI", "Standards for packaging and tracking learning activity"],
      ["Credential", "A certificate that employers recognise"],
    ],
    example: "Trường dùng Moodle để quản lý điểm nhưng nhúng video Khan Academy làm nội dung.",
    exampleEn: "A school runs grades in Moodle while embedding Khan Academy videos as content.",
    mistake: "Tự xây LMS đầy đủ khi mới có vài chục học sinh.",
    mistakeEn: "Building a full LMS when you only have a few dozen learners.",
  },
  "edtech-landscape-4": {
    gist: "Anki, Quizlet và Memrise cùng dựa trên lặp lại ngắt quãng nhưng đánh đổi khác nhau giữa sức mạnh và dễ dùng.",
    gistEn: "Anki, Quizlet and Memrise all rest on spaced repetition but trade power against ease of use differently.",
    terms: [
      ["Deck", "Bộ thẻ học"],
      ["Scheduler", "Thuật toán quyết định thẻ nào xuất hiện hôm nay"],
      ["Leech", "Thẻ liên tục bị quên"],
    ],
    termsEn: [
      ["Deck", "A set of study cards"],
      ["Scheduler", "The algorithm choosing today's cards"],
      ["Leech", "A card that keeps being forgotten"],
    ],
    example: "Anki đánh dấu thẻ sai 8 lần là 'leech' và tạm ẩn để học sinh không mắc kẹt.",
    exampleEn: "Anki tags a card failed 8 times as a 'leech' and suspends it so the learner is not stuck.",
    mistake: "Tạo bộ thẻ 2000 từ ngay ngày đầu rồi ngợp vì lịch ôn dồn.",
    mistakeEn: "Creating a 2,000-card deck on day one and drowning in due reviews.",
  },
  "edtech-landscape-5": {
    gist: "Sản phẩm AI thành công giới hạn phạm vi rất hẹp và neo vào nội dung được kiểm duyệt.",
    gistEn: "Successful AI products keep scope narrow and anchor to vetted content.",
    terms: [
      ["Khanmigo", "Tutor AI của Khan Academy, có chế độ không đưa đáp án"],
      ["Photomath", "Nhận dạng và giải toán từng bước qua ảnh"],
      ["Study Mode", "Chế độ hướng dẫn học thay vì trả lời thẳng"],
    ],
    termsEn: [
      ["Khanmigo", "Khan Academy's AI tutor with an answer-withholding mode"],
      ["Photomath", "Step-by-step maths solving from a photo"],
      ["Study Mode", "A guided-learning mode instead of direct answers"],
    ],
    example: "Khanmigo từ chối viết bài luận hộ nhưng sẵn sàng hỏi 'luận điểm chính của em là gì?'.",
    exampleEn: "Khanmigo refuses to write the essay but will ask 'what is your main claim?'.",
    mistake: "Mở tutor AI cho mọi chủ đề rồi bất ngờ khi nó trả lời sai ngoài phạm vi giáo trình.",
    mistakeEn: "Opening the AI tutor to all topics and being surprised when it errs outside the curriculum.",
  },
  "edtech-landscape-6": {
    gist: "Một EdTech hiện đại có thể dựng bằng 5 khối: xác thực, nội dung, tiến độ, AI và phân tích.",
    gistEn: "A modern EdTech product can be built from five blocks: auth, content, progress, AI and analytics.",
    terms: [
      ["Edge function", "Hàm chạy phía máy chủ, giữ khoá API an toàn"],
      ["RLS", "Luật bảo vệ hàng dữ liệu theo người dùng"],
      ["Event pipeline", "Đường ống thu thập sự kiện học tập"],
    ],
    termsEn: [
      ["Edge function", "Server-side function keeping API keys safe"],
      ["RLS", "Row-level rules protecting each user's data"],
      ["Event pipeline", "The path that collects learning events"],
    ],
    example: "Postgres cho tiến độ, pgvector cho RAG, edge function cho AI, bảng events cho phân tích.",
    exampleEn: "Postgres for progress, pgvector for RAG, an edge function for AI and an events table for analytics.",
    mistake: "Lưu tiến độ chỉ trong localStorage nên mất sạch khi đổi thiết bị.",
    mistakeEn: "Keeping progress only in localStorage, so it vanishes on a new device.",
  },
};

const MARKER = "<!-- edtech-clarity -->";

const buildBlock = (e: ClarityEntry, en: boolean) => {
  const terms = (en ? e.termsEn : e.terms)
    .map(([t, d]) => `| **${t}** | ${d} |`)
    .join("\n");
  if (en) {
    return `${MARKER}

## 🧭 In one sentence

> ${e.gistEn}

## 🔑 Key terms

| Term | Plain meaning |
|---|---|
${terms}

## 🧪 Concrete example

${e.exampleEn}

## 🛑 Most common mistake

${e.mistakeEn}`;
  }
  return `${MARKER}

## 🧭 Tóm lại trong một câu

> ${e.gist}

## 🔑 Thuật ngữ chính

| Thuật ngữ | Nghĩa dễ hiểu |
|---|---|
${terms}

## 🧪 Ví dụ cụ thể

${e.example}

## 🛑 Sai lầm hay gặp nhất

${e.mistake}`;
};

/**
 * Append the clarity blocks to every EdTech lesson that has an entry.
 * Safe to call more than once - the marker prevents duplication.
 */
export const applyEdtechClarity = (
  modules: ExtendedProgrammingModule[]
): ExtendedProgrammingModule[] =>
  modules.map((mod) => ({
    ...mod,
    lessons: mod.lessons.map((lesson) => {
      const entry = CLARITY[lesson.id];
      if (!entry || lesson.theory.includes(MARKER)) return lesson;
      return {
        ...lesson,
        theory: `${lesson.theory}\n\n${buildBlock(entry, false)}`,
        theoryEn: `${lesson.theoryEn}\n\n${buildBlock(entry, true)}`,
      };
    }),
  }));
