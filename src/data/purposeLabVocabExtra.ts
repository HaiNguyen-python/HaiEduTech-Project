/**
 * @file purposeLabVocabExtra.ts
 * @description Extra bilingual vocabulary for Communication Lab lessons in
 *   Business English (pro-*) and Academic English (acad-*). Each lesson gets at
 *   least 6 usable entries so the Learn stage is never thin.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ConvVocabEntry } from "./conversationalCurriculum";

export const purposeLabVocabExtra: Record<string, ConvVocabEntry[]> = {
  "pro-02-networking": [
    { term: "break the ice", meaning: "phá tan không khí e dè khi mới gặp", meaningEn: "start a friendly conversation with someone new", type: "idiom", example: "I asked about her flight to break the ice.", exampleVi: "Tôi hỏi về chuyến bay của cô ấy để phá tan không khí e dè." },
    { term: "follow up on", meaning: "liên hệ tiếp sau lần gặp đầu", meaningEn: "contact someone again after a first meeting", type: "phrasal-verb", example: "I will follow up on our chat with a short email.", exampleVi: "Tôi sẽ liên hệ tiếp về cuộc trò chuyện bằng một email ngắn." },
  ],
  "pro-04-presentations": [
    { term: "signpost", meaning: "câu dẫn dắt để người nghe biết phần tiếp theo", meaningEn: "a phrase that tells the audience what comes next", type: "expression", example: "Let me signpost the three parts of this talk.", exampleVi: "Tôi xin dẫn dắt qua ba phần của bài nói này." },
    { term: "back up a claim", meaning: "chứng minh nhận định bằng dữ liệu", meaningEn: "support a statement with evidence", type: "expression", example: "I can back up that claim with last quarter's data.", exampleVi: "Tôi có thể chứng minh nhận định đó bằng dữ liệu quý trước." },
  ],
  "pro-05-emails": [
    { term: "circle back", meaning: "quay lại vấn đề sau", meaningEn: "return to a topic later", type: "phrasal-verb", example: "Let us circle back on pricing after the demo.", exampleVi: "Chúng ta sẽ quay lại chuyện giá sau buổi demo." },
    { term: "action item", meaning: "việc cần làm được giao rõ ràng", meaningEn: "a task assigned to a named person", type: "expression", example: "I listed three action items at the end of the email.", exampleVi: "Tôi liệt kê ba việc cần làm ở cuối email." },
  ],
  "pro-06-conflict": [
    { term: "take a step back", meaning: "tạm lùi lại để nhìn vấn đề bình tĩnh hơn", meaningEn: "pause to look at a problem more calmly", type: "idiom", example: "Let us take a step back and look at the facts.", exampleVi: "Chúng ta hãy lùi lại một bước và xem lại thực tế." },
    { term: "agree on next steps", meaning: "thống nhất các bước tiếp theo", meaningEn: "settle what each side will do next", type: "expression", example: "Before we finish, can we agree on next steps?", exampleVi: "Trước khi kết thúc, chúng ta thống nhất các bước tiếp theo nhé?" },
  ],
  "pro-07-negotiation": [
    { term: "walk-away point", meaning: "giới hạn để dừng đàm phán", meaningEn: "the limit at which you stop negotiating", type: "expression", example: "Our walk-away point is a twelve month contract.", exampleVi: "Giới hạn của chúng tôi là hợp đồng mười hai tháng." },
    { term: "trade-off", meaning: "sự đánh đổi giữa hai lợi ích", meaningEn: "giving up one benefit to gain another", type: "expression", example: "The trade-off is a lower price for a longer term.", exampleVi: "Đánh đổi là giá thấp hơn nhưng thời hạn dài hơn." },
  ],
  "pro-08-remote-work": [
    { term: "share your screen", meaning: "chia sẻ màn hình trong họp trực tuyến", meaningEn: "show your screen to others in a call", type: "expression", example: "Could you share your screen so we can see the file?", exampleVi: "Bạn chia sẻ màn hình để mọi người thấy tệp nhé?" },
    { term: "log off", meaning: "thoát khỏi hệ thống và kết thúc ngày làm việc", meaningEn: "leave a system and finish work for the day", type: "phrasal-verb", example: "I will log off at six and reply tomorrow.", exampleVi: "Tôi sẽ thoát máy lúc sáu giờ và trả lời vào mai." },
  ],
  "pro-09-customer-service": [
    { term: "escalate a case", meaning: "chuyển vụ việc lên cấp cao hơn", meaningEn: "pass a case to a higher level of support", type: "expression", example: "I will escalate this case to my supervisor today.", exampleVi: "Tôi sẽ chuyển vụ việc này lên cấp quản lý hôm nay." },
    { term: "follow through", meaning: "làm đến cùng điều đã hứa", meaningEn: "finish what you promised to do", type: "phrasal-verb", example: "We promised a refund and we followed through.", exampleVi: "Chúng tôi đã hứa hoàn tiền và đã làm đến cùng." },
  ],
  "pro-10-leadership": [
    { term: "delegate", meaning: "giao việc kèm quyền quyết định", meaningEn: "give a task and the authority to decide", type: "expression", example: "I delegated the report to Mai with a clear deadline.", exampleVi: "Tôi giao báo cáo cho Mai kèm hạn rõ ràng." },
    { term: "take ownership", meaning: "nhận trách nhiệm chính về việc gì", meaningEn: "accept full responsibility for something", type: "expression", example: "She took ownership of the delay and fixed it.", exampleVi: "Cô ấy nhận trách nhiệm về việc chậm trễ và đã xử lý." },
  ],
  "pro-11-onboarding": [
    { term: "get up to speed", meaning: "nắm bắt công việc kịp tiến độ", meaningEn: "reach the level of knowledge others already have", type: "idiom", example: "Take two weeks to get up to speed on the product.", exampleVi: "Bạn có hai tuần để nắm bắt sản phẩm." },
    { term: "check-in", meaning: "buổi trao đổi ngắn về tiến độ", meaningEn: "a short meeting to review progress", type: "expression", example: "We have a weekly check-in every Monday.", exampleVi: "Chúng ta có buổi trao đổi ngắn mỗi thứ Hai." },
  ],
  "pro-12-freelancing": [
    { term: "invoice", meaning: "hóa đơn đề nghị thanh toán", meaningEn: "a document requesting payment", type: "expression", example: "I send an invoice on the first of each month.", exampleVi: "Tôi gửi hóa đơn vào ngày đầu mỗi tháng." },
    { term: "statement of work", meaning: "bản mô tả phạm vi công việc", meaningEn: "a document that defines the agreed scope", type: "expression", example: "The statement of work lists two revision rounds.", exampleVi: "Bản mô tả công việc nêu rõ hai lần chỉnh sửa." },
  ],
  "pro-13-workplace-culture": [
    { term: "open-door policy", meaning: "văn hóa quản lý luôn sẵn sàng lắng nghe", meaningEn: "managers are always available to talk", type: "expression", example: "Our team has an open-door policy for feedback.", exampleVi: "Nhóm chúng tôi luôn sẵn sàng lắng nghe góp ý." },
    { term: "fit in", meaning: "hòa nhập với tập thể", meaningEn: "become comfortable within a group", type: "phrasal-verb", example: "It took a month to fit in with the design team.", exampleVi: "Tôi mất một tháng để hòa nhập với nhóm thiết kế." },
  ],
  "pro-14-job-search": [
    { term: "cover letter", meaning: "thư xin việc kèm CV", meaningEn: "a short letter sent with a CV", type: "expression", example: "My cover letter names two results from my last role.", exampleVi: "Thư xin việc của tôi nêu hai kết quả ở công việc trước." },
    { term: "transferable skills", meaning: "kỹ năng có thể dùng ở công việc khác", meaningEn: "skills that are useful in a different job", type: "expression", example: "Teaching gave me transferable skills in presenting.", exampleVi: "Việc dạy học cho tôi kỹ năng thuyết trình có thể dùng lại." },
  ],
  "pro-15-performance-review": [
    { term: "set a goal", meaning: "đặt mục tiêu cụ thể", meaningEn: "agree a clear target to reach", type: "expression", example: "We set a goal of two client demos per week.", exampleVi: "Chúng tôi đặt mục tiêu hai buổi demo khách mỗi tuần." },
    { term: "area for improvement", meaning: "điểm cần cải thiện", meaningEn: "a skill that still needs work", type: "expression", example: "My main area for improvement is time estimation.", exampleVi: "Điểm cần cải thiện chính của tôi là ước lượng thời gian." },
  ],
  "pro-16-startup-pitch": [
    { term: "runway", meaning: "số tháng còn hoạt động được với tiền hiện có", meaningEn: "how many months of cash a company still has", type: "expression", example: "We have eighteen months of runway left.", exampleVi: "Chúng tôi còn mười tám tháng chi phí hoạt động." },
    { term: "product-market fit", meaning: "sản phẩm đúng nhu cầu thị trường", meaningEn: "clear evidence the market wants the product", type: "expression", example: "Repeat orders show early product-market fit.", exampleVi: "Đơn hàng lặp lại cho thấy sản phẩm đúng nhu cầu thị trường." },
  ],
  "pro-17-cross-cultural": [
    { term: "read the room", meaning: "quan sát để hiểu không khí và phản ứng", meaningEn: "sense the mood of the people present", type: "idiom", example: "Read the room before making a joke in a client meeting.", exampleVi: "Hãy quan sát không khí trước khi pha trò trong họp khách hàng." },
    { term: "time zone", meaning: "múi giờ", meaningEn: "a region with the same standard time", type: "expression", example: "Our team works across four time zones.", exampleVi: "Nhóm chúng tôi làm việc qua bốn múi giờ." },
  ],
  "pro-18-public-speaking": [
    { term: "pause for emphasis", meaning: "ngắt nghỉ để nhấn ý", meaningEn: "stop briefly to highlight a point", type: "expression", example: "Pause for emphasis after your key number.", exampleVi: "Hãy ngắt nghỉ để nhấn ý sau con số quan trọng." },
    { term: "warm up", meaning: "khởi động giọng và cơ thể trước khi nói", meaningEn: "prepare your voice and body before speaking", type: "phrasal-verb", example: "I warm up my voice for five minutes backstage.", exampleVi: "Tôi khởi động giọng năm phút ở phía sau sân khấu." },
  ],
  "pro-19-salary-negotiation": [
    { term: "total package", meaning: "toàn bộ thu nhập và phúc lợi", meaningEn: "salary plus all benefits together", type: "expression", example: "The total package includes insurance and training.", exampleVi: "Toàn bộ đãi ngộ gồm cả bảo hiểm và đào tạo." },
    { term: "market rate", meaning: "mức lương phổ biến của thị trường", meaningEn: "the usual pay for that role in the market", type: "expression", example: "This offer is slightly below market rate.", exampleVi: "Đề nghị này hơi thấp hơn mức thị trường." },
  ],
  "pro-20-mentoring": [
    { term: "set expectations", meaning: "thống nhất kỳ vọng ngay từ đầu", meaningEn: "agree clearly what each side expects", type: "expression", example: "We set expectations in our first mentoring session.", exampleVi: "Chúng tôi thống nhất kỳ vọng trong buổi hướng dẫn đầu tiên." },
    { term: "check in on progress", meaning: "theo dõi tiến bộ định kỳ", meaningEn: "review how someone is developing", type: "expression", example: "I check in on her progress every two weeks.", exampleVi: "Tôi theo dõi tiến bộ của bạn ấy hai tuần một lần." },
  ],
  "pro-21-product-demos": [
    { term: "use case", meaning: "tình huống sử dụng cụ thể", meaningEn: "a specific situation where a product helps", type: "expression", example: "Let me show the use case closest to your team.", exampleVi: "Tôi xin trình bày tình huống sử dụng gần nhất với nhóm bạn." },
    { term: "handle objections", meaning: "xử lý các băn khoăn của khách", meaningEn: "respond calmly to a customer's doubts", type: "expression", example: "I handle objections by asking one clarifying question first.", exampleVi: "Tôi xử lý băn khoăn bằng cách hỏi lại cho rõ trước." },
  ],
  "pro-22-difficult-coworkers": [
    { term: "stay professional", meaning: "giữ thái độ chuyên nghiệp", meaningEn: "keep a calm and work-focused manner", type: "expression", example: "I stayed professional even when he raised his voice.", exampleVi: "Tôi giữ thái độ chuyên nghiệp dù anh ấy lớn tiếng." },
    { term: "document the issue", meaning: "ghi lại vụ việc bằng văn bản", meaningEn: "keep a written record of what happened", type: "expression", example: "Document the issue before you speak to HR.", exampleVi: "Hãy ghi lại vụ việc trước khi làm việc với nhân sự." },
  ],
  "pro-23-quitting-job": [
    { term: "hand over", meaning: "chuyển giao công việc cho người khác", meaningEn: "pass your work to another person", type: "phrasal-verb", example: "I will hand over my projects in the last week.", exampleVi: "Tôi sẽ chuyển giao dự án trong tuần cuối." },
    { term: "exit interview", meaning: "buổi phỏng vấn khi nghỉ việc", meaningEn: "a final meeting when you leave a company", type: "expression", example: "I gave honest but polite feedback in the exit interview.", exampleVi: "Tôi góp ý thật lòng nhưng lịch sự trong buổi phỏng vấn nghỉ việc." },
  ],
  "acad-02-opinions": [
    { term: "hedge a claim", meaning: "nói dè dặt để tránh khẳng định tuyệt đối", meaningEn: "soften a statement so it is not absolute", type: "expression", example: "The data suggests a link, to hedge the claim carefully.", exampleVi: "Dữ liệu cho thấy có liên hệ, cách nói dè dặt và cẩn trọng." },
    { term: "concede a point", meaning: "thừa nhận một điểm của đối phương", meaningEn: "accept that part of the other view is right", type: "expression", example: "I concede that point, but the cost is still high.", exampleVi: "Tôi thừa nhận điểm đó, nhưng chi phí vẫn cao." },
  ],
  "acad-04-culture": [
    { term: "cultural norm", meaning: "chuẩn mực văn hóa", meaningEn: "behaviour a culture treats as normal", type: "expression", example: "Removing shoes indoors is a cultural norm here.", exampleVi: "Bỏ giày trong nhà là chuẩn mực văn hóa ở đây." },
    { term: "stereotype", meaning: "định kiến khuôn mẫu về một nhóm người", meaningEn: "a fixed and often unfair idea about a group", type: "expression", example: "The article challenges a common stereotype about students.", exampleVi: "Bài báo phản biện một định kiến phổ biến về sinh viên." },
  ],
  "acad-06-technology": [
    { term: "scalable", meaning: "có thể mở rộng quy mô", meaningEn: "able to grow without losing quality", type: "expression", example: "The solution is scalable to a whole city.", exampleVi: "Giải pháp có thể mở rộng cho cả một thành phố." },
    { term: "trade-off", meaning: "sự đánh đổi giữa hai lợi ích", meaningEn: "one benefit lost to gain another", type: "expression", example: "There is a trade-off between speed and accuracy.", exampleVi: "Có sự đánh đổi giữa tốc độ và độ chính xác." },
  ],
  "acad-07-academic-writing": [
    { term: "paraphrase", meaning: "diễn đạt lại bằng lời của mình", meaningEn: "restate an idea in your own words", type: "expression", example: "Paraphrase the finding and still cite the source.", exampleVi: "Hãy diễn đạt lại phát hiện đó nhưng vẫn trích dẫn nguồn." },
    { term: "topic sentence", meaning: "câu chủ đề của đoạn văn", meaningEn: "the sentence that states a paragraph's main idea", type: "expression", example: "Each paragraph opens with a clear topic sentence.", exampleVi: "Mỗi đoạn mở đầu bằng một câu chủ đề rõ ràng." },
  ],
  "acad-08-global-issues": [
    { term: "sustainable", meaning: "bền vững, duy trì được lâu dài", meaningEn: "able to continue without damaging the future", type: "expression", example: "The plan is cheaper but not sustainable.", exampleVi: "Kế hoạch rẻ hơn nhưng không bền vững." },
    { term: "policy maker", meaning: "người hoạch định chính sách", meaningEn: "a person who decides public policy", type: "expression", example: "Policy makers rarely read full research reports.", exampleVi: "Người hoạch định chính sách ít khi đọc hết báo cáo nghiên cứu." },
  ],
  "acad-09-media-literacy": [
    { term: "cross-check", meaning: "đối chiếu nhiều nguồn để xác minh", meaningEn: "verify a claim against other sources", type: "phrasal-verb", example: "Cross-check the number with the official report.", exampleVi: "Hãy đối chiếu con số với báo cáo chính thức." },
    { term: "primary source", meaning: "nguồn gốc trực tiếp của thông tin", meaningEn: "the original record of information", type: "expression", example: "The survey itself is the primary source here.", exampleVi: "Bản khảo sát chính là nguồn gốc trực tiếp ở đây." },
  ],
  "acad-11-research": [
    { term: "research question", meaning: "câu hỏi nghiên cứu", meaningEn: "the specific question a study answers", type: "expression", example: "A narrow research question saves months of work.", exampleVi: "Một câu hỏi nghiên cứu hẹp giúp tiết kiệm hàng tháng làm việc." },
    { term: "literature review", meaning: "phần tổng quan tài liệu", meaningEn: "a summary of what other studies found", type: "expression", example: "My literature review covers ten recent papers.", exampleVi: "Phần tổng quan tài liệu của tôi gồm mười bài gần đây." },
  ],
  "acad-12-class-discussions": [
    { term: "clarify a point", meaning: "làm rõ một ý", meaningEn: "explain an idea more precisely", type: "expression", example: "Could you clarify that point about the sample size?", exampleVi: "Bạn làm rõ ý về cỡ mẫu giúp tôi nhé?" },
    { term: "give the floor to", meaning: "nhường lượt nói cho ai", meaningEn: "invite another person to speak", type: "expression", example: "I will give the floor to Linh for the data part.", exampleVi: "Tôi nhường lượt nói cho Linh ở phần dữ liệu." },
  ],
  "acad-13-ai-future": [
    { term: "bias in data", meaning: "sai lệch trong dữ liệu", meaningEn: "unfair patterns inside a dataset", type: "expression", example: "Bias in data can make a model unfair.", exampleVi: "Sai lệch trong dữ liệu có thể làm mô hình bất công." },
    { term: "human oversight", meaning: "sự giám sát của con người", meaningEn: "people checking what a system decides", type: "expression", example: "Medical uses still need human oversight.", exampleVi: "Ứng dụng trong y tế vẫn cần con người giám sát." },
  ],
  "acad-14-mental-health": [
    { term: "set boundaries", meaning: "đặt ranh giới để bảo vệ bản thân", meaningEn: "decide limits that protect your wellbeing", type: "expression", example: "I set boundaries around study hours at night.", exampleVi: "Tôi đặt ranh giới cho giờ học buổi tối." },
    { term: "seek support", meaning: "tìm sự hỗ trợ", meaningEn: "ask for help from people or services", type: "expression", example: "Seek support early rather than waiting for exams.", exampleVi: "Hãy tìm hỗ trợ sớm thay vì đợi đến kỳ thi." },
  ],
  "acad-15-volunteering": [
    { term: "community impact", meaning: "tác động tới cộng đồng", meaningEn: "the effect a project has on local people", type: "expression", example: "We measured community impact after six months.", exampleVi: "Chúng tôi đo tác động cộng đồng sau sáu tháng." },
    { term: "sign up for", meaning: "đăng ký tham gia", meaningEn: "register to join an activity", type: "phrasal-verb", example: "Twelve students signed up for the weekend project.", exampleVi: "Mười hai sinh viên đăng ký dự án cuối tuần." },
  ],
  "acad-16-presentations": [
    { term: "signpost the structure", meaning: "nêu trước cấu trúc bài nói", meaningEn: "tell the audience the order of your parts", type: "expression", example: "I signpost the structure in my first slide.", exampleVi: "Tôi nêu trước cấu trúc ở slide đầu tiên." },
    { term: "field questions", meaning: "trả lời câu hỏi từ người nghe", meaningEn: "answer questions from the audience", type: "expression", example: "I will field questions after the last section.", exampleVi: "Tôi sẽ trả lời câu hỏi sau phần cuối." },
  ],
  "acad-17-group-projects": [
    { term: "divide the workload", meaning: "phân chia khối lượng công việc", meaningEn: "share tasks fairly in a team", type: "expression", example: "We divided the workload by strengths, not by luck.", exampleVi: "Chúng tôi phân chia công việc theo điểm mạnh, không theo may mắn." },
    { term: "peer feedback", meaning: "góp ý từ bạn học cùng nhóm", meaningEn: "comments from classmates on your work", type: "expression", example: "Peer feedback improved our slides a lot.", exampleVi: "Góp ý từ bạn cùng nhóm giúp slide của chúng tôi tốt hơn nhiều." },
  ],
  "acad-18-essays": [
    { term: "counterargument", meaning: "lập luận phản biện", meaningEn: "an argument against your own position", type: "expression", example: "Answer one strong counterargument before your conclusion.", exampleVi: "Hãy phản hồi một lập luận phản biện mạnh trước phần kết." },
    { term: "signposting language", meaning: "ngôn ngữ dẫn dắt trong bài viết", meaningEn: "words that guide the reader through an essay", type: "expression", example: "Signposting language keeps a long essay readable.", exampleVi: "Ngôn ngữ dẫn dắt giúp bài luận dài dễ đọc hơn." },
  ],
  "acad-19-internships": [
    { term: "shadow someone", meaning: "quan sát và học theo người có kinh nghiệm", meaningEn: "observe an experienced person at work", type: "expression", example: "I shadowed an analyst for my first two weeks.", exampleVi: "Tôi quan sát một chuyên viên phân tích trong hai tuần đầu." },
    { term: "reference letter", meaning: "thư giới thiệu", meaningEn: "a letter that recommends you for a role", type: "expression", example: "My supervisor wrote a reference letter for me.", exampleVi: "Người hướng dẫn đã viết thư giới thiệu cho tôi." },
  ],
  "acad-20-life-after-graduation": [
    { term: "career path", meaning: "lộ trình nghề nghiệp", meaningEn: "the sequence of roles you plan to take", type: "expression", example: "Data analysis is one career path from this degree.", exampleVi: "Phân tích dữ liệu là một lộ trình nghề nghiệp từ ngành này." },
    { term: "keep your options open", meaning: "giữ nhiều lựa chọn", meaningEn: "avoid committing to only one plan", type: "idiom", example: "I applied to two fields to keep my options open.", exampleVi: "Tôi ứng tuyển hai lĩnh vực để giữ nhiều lựa chọn." },
  ],
};
