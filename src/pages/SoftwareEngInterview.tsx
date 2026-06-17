/**
 * @file SoftwareEngInterview.tsx
 * @description Career-prep page with 30 SE interview questions, full sample answers
 *              and STAR-style tips. Each answer is intentionally long-form so
 *              candidates can study real talking points, not just keywords.
 * @author HaiEduTech
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, Star, ChevronDown, Lightbulb, MessageSquare, ListChecks } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Question {
  category: "Behavioral" | "System Design" | "Coding" | "DevOps" | "Soft Skills";
  q: string;
  qVi: string;
  hint: string;
  hintVi: string;
  /** Long-form sample answer, several short paragraphs, separated by \n\n. */
  answer: string;
  answerVi: string;
  /** 3-5 bullet points the interviewer wants to hear. */
  keyPoints: string[];
  keyPointsVi: string[];
}

const QUESTIONS: Question[] = [
  // ============== BEHAVIORAL ==============
  {
    category: "Behavioral",
    q: "Tell me about a time you disagreed with a teammate on a technical decision.",
    qVi: "Kể về 1 lần bạn bất đồng với đồng đội về quyết định kỹ thuật.",
    hint: "Use STAR. Show data + empathy, and end with the business outcome.",
    hintVi: "Áp dụng STAR. Đưa ra số liệu + thể hiện đồng cảm, kết bằng kết quả kinh doanh.",
    answer:
      "(Situation) On a payments service my teammate proposed using MongoDB for a new ledger table because the team was already familiar with it. I disagreed - ledgers need strict ACID transactions and we were targeting 99.99% accuracy for refunds.\n\n(Task) As tech lead I had to either get aligned or escalate. I asked for one day to prepare data instead of arguing in the meeting.\n\n(Action) I built a 200-line spike comparing PostgreSQL and MongoDB on the same workload: 50k inserts with concurrent reads. I shared a short doc with numbers (Postgres 18ms p99 vs Mongo 41ms p99 under contention), the ACID guarantees we'd lose, and the migration cost. Importantly, I acknowledged my teammate's concern about ramp-up time and proposed pairing him with me for two weeks.\n\n(Result) The team chose Postgres. We shipped on schedule, zero double-refund incidents in the first 6 months, and my teammate became the on-call owner for the ledger - which addressed his real fear of being left behind.",
    answerVi:
      "(Situation) Trong service thanh toán, đồng đội đề xuất dùng MongoDB cho bảng ledger mới vì team đã quen. Tôi không đồng ý - ledger cần transaction ACID nghiêm ngặt và yêu cầu chính xác 99.99% cho hoàn tiền.\n\n(Task) Là tech lead, tôi phải hoặc đạt được đồng thuận hoặc escalate. Tôi xin 1 ngày để chuẩn bị dữ liệu thay vì tranh luận tại chỗ.\n\n(Action) Tôi viết spike 200 dòng so sánh PostgreSQL và MongoDB cùng workload: 50k insert kèm read song song. Tôi chia sẻ doc ngắn có số liệu (Postgres p99 18ms vs Mongo 41ms khi tranh chấp), những đảm bảo ACID sẽ mất, và chi phí migration. Quan trọng: tôi thừa nhận nỗi lo 'phải học lại' của đồng đội và đề nghị pair với cậu ấy 2 tuần.\n\n(Result) Team chọn Postgres. Ship đúng hạn, 0 sự cố hoàn tiền 2 lần trong 6 tháng đầu, và đồng đội trở thành on-call owner của ledger - đúng nỗi lo bị bỏ lại của cậu ấy đã được giải quyết.",
    keyPoints: [
      "Frame the disagreement with a concrete project, not abstract opinions",
      "Bring data (benchmark numbers, error rates, cost) instead of preferences",
      "Show empathy - name the other person's real concern",
      "End with measurable business outcome + how the relationship improved",
    ],
    keyPointsVi: [
      "Đặt bất đồng vào 1 dự án cụ thể, không nói chung chung",
      "Mang số liệu (benchmark, lỗi, chi phí) thay vì cảm tính",
      "Thể hiện đồng cảm - gọi tên nỗi lo thật của người kia",
      "Kết bằng kết quả đo được + mối quan hệ được cải thiện ra sao",
    ],
  },
  {
    category: "Behavioral",
    q: "Describe a project that failed. What did you learn?",
    qVi: "Mô tả 1 dự án thất bại. Bạn học được gì?",
    hint: "Be honest. Pick a real failure, own your part, focus on lessons applied next.",
    hintVi: "Trung thực. Chọn thất bại thật, nhận phần của mình, tập trung vào bài học đã áp dụng sau đó.",
    answer:
      "(Situation) We launched a recommendation engine for an e-commerce site that was supposed to lift CTR by 15%. After 3 months it lifted CTR by only 2% and we shut it down.\n\n(Task) I led the ML side. The failure wasn't the model - offline AUC was 0.81. The failure was that we never validated the assumption that users wanted more diverse recommendations; they actually wanted faster ones.\n\n(Action) I ran a retrospective with PM, design and data. Three concrete lessons: (1) we skipped a user-research phase to 'save time'; (2) we measured offline metrics, not real latency in the UI - our model added 280ms per page; (3) we shipped to 100% of users at once instead of a 5% canary.\n\n(Result) Six months later I led a second attempt. We did 5 user interviews up front, set a p95 latency budget of 80ms as a hard gate, and rolled out via canary. That one lifted CTR by 11% and added EUR 1.2M in annual revenue. The biggest lesson stuck: 'offline metrics are a hypothesis, not a result'.",
    answerVi:
      "(Situation) Chúng tôi launch hệ thống gợi ý cho e-commerce, mục tiêu tăng CTR 15%. Sau 3 tháng chỉ tăng được 2% và phải tắt.\n\n(Task) Tôi phụ trách phần ML. Thất bại không phải do model - AUC offline đạt 0.81. Thất bại là chúng tôi không validate giả định 'user muốn gợi ý đa dạng hơn'; thực tế họ muốn gợi ý nhanh hơn.\n\n(Action) Tôi tổ chức retrospective với PM, design và data. Ba bài học cụ thể: (1) bỏ qua giai đoạn user research để 'tiết kiệm thời gian'; (2) chỉ đo offline metric, không đo latency thật trên UI - model làm trang chậm thêm 280ms; (3) ship 1 lần cho 100% user thay vì canary 5%.\n\n(Result) 6 tháng sau tôi dẫn dắt lần thứ 2. Phỏng vấn 5 user trước, đặt p95 latency 80ms làm gate cứng, rollout qua canary. Lần này CTR tăng 11%, đóng góp 1.2 triệu EUR doanh thu/năm. Bài học lớn nhất tôi giữ đến giờ: 'metric offline là giả thuyết, không phải kết quả'.",
    keyPoints: [
      "Pick a real, recent failure - not a humble-brag",
      "Take ownership of your specific contribution",
      "Name 2-3 concrete lessons (process, metrics, rollout)",
      "Prove the lesson stuck with a follow-up project that worked",
    ],
    keyPointsVi: [
      "Chọn thất bại thật, gần đây - không 'khoe ngầm'",
      "Nhận phần đóng góp cụ thể của bạn",
      "Nêu 2-3 bài học cụ thể (quy trình, đo lường, rollout)",
      "Chứng minh bài học được áp dụng bằng dự án sau đó thành công",
    ],
  },
  {
    category: "Behavioral",
    q: "Walk me through a recent code review where you gave critical feedback.",
    qVi: "Mô tả 1 lần code review bạn đưa feedback nặng.",
    hint: "Stay constructive. Quote the rule and the impact, not the person.",
    hintVi: "Mang tính xây dựng. Trích quy tắc và tác động, không phải con người.",
    answer:
      "A senior engineer opened a PR adding a new auth endpoint. It worked, but it stored the password reset token in a regular indexed column with no expiry and no single-use flag. That's a serious security gap - an attacker with read access to the table could replay tokens forever.\n\nI didn't comment 'this is wrong'. I left three comments tied to our security guideline doc: (1) link to OWASP ASVS 2.4.1, (2) a 6-line code suggestion using a hashed token + 15-minute TTL + used_at column, (3) a question - 'what's the threat model you considered for this token?' so it stayed a conversation, not a verdict.\n\nThe engineer pushed a fix the same day. After merging I sent him a private DM thanking him for taking the feedback well, and I added the pattern to our team's PR template so the next person wouldn't hit the same gap.\n\nMy rule for tough reviews: critique the code in public, support the person in private, and turn the lesson into a guardrail so the team doesn't relearn it.",
    answerVi:
      "Một senior mở PR thêm endpoint auth mới. Code chạy được, nhưng lưu token reset mật khẩu vào cột indexed thường, không có expiry, không có cờ single-use. Đây là lỗ hổng bảo mật nghiêm trọng - kẻ tấn công có quyền đọc bảng có thể replay token mãi mãi.\n\nTôi không comment 'cái này sai'. Tôi để 3 comment gắn với tài liệu security guideline: (1) link OWASP ASVS 2.4.1, (2) đề xuất 6 dòng code dùng hashed token + TTL 15 phút + cột used_at, (3) câu hỏi - 'threat model bạn cân nhắc cho token này là gì?' để giữ tinh thần đối thoại, không phán xét.\n\nEngineer push fix ngay trong ngày. Sau khi merge tôi DM riêng cảm ơn cậu ấy đã tiếp thu tốt, và tôi thêm pattern này vào PR template của team để người sau không vấp lại.\n\nNguyên tắc của tôi khi review nặng: phê bình code công khai, hỗ trợ con người riêng tư, và biến bài học thành guardrail để team không phải học lại.",
    keyPoints: [
      "Reference an external rule (OWASP, RFC, internal doc) - not opinion",
      "Pair criticism with a code suggestion they can accept in one click",
      "Ask a question to keep it a dialog",
      "Close the loop privately + turn the lesson into a team guardrail",
    ],
    keyPointsVi: [
      "Trích quy tắc bên ngoài (OWASP, RFC, doc nội bộ) - không cảm tính",
      "Kèm code suggestion có thể accept 1 click",
      "Đặt câu hỏi để giữ tinh thần đối thoại",
      "Khép vòng riêng tư + biến bài học thành guardrail của team",
    ],
  },
  {
    category: "Behavioral",
    q: "Tell me about your proudest engineering achievement.",
    qVi: "Thành tựu kỹ thuật bạn tự hào nhất?",
    hint: "Business impact > technical complexity. Quantify everything.",
    hintVi: "Tác động kinh doanh > độ phức tạp kỹ thuật. Định lượng mọi thứ.",
    answer:
      "(Situation) Our data pipeline ran for 9 hours every night and was missing the 7am SLA twice a week. Operations was getting reports late, which delayed customer refunds.\n\n(Task) I was given 1 month to bring it under 2 hours, with the same correctness guarantees.\n\n(Action) I instrumented every stage with OpenTelemetry and found that 70% of the time was in one Python step that did per-row API calls in a loop. I rewrote that stage as a batched async job (500 rows per call), moved heavy joins from Pandas to DuckDB, and parallelized the 4 independent branches with Airflow's dynamic task mapping. I also added contract tests so a schema break would fail fast instead of running for 6 hours then crashing.\n\n(Result) The pipeline dropped from 9h to 47 minutes - an 11.5x speedup. SLA misses went to zero in 6 months, and the team saved ~EUR 4,000/month on compute. What I'm proudest of: ops stopped paging on-call for late data, so my on-call shifts became actually sleepable.",
    answerVi:
      "(Situation) Pipeline dữ liệu chạy 9 tiếng mỗi đêm và miss SLA 7h sáng 2 lần/tuần. Operations nhận báo cáo muộn, làm chậm hoàn tiền khách.\n\n(Task) Tôi được giao 1 tháng để đưa xuống dưới 2 tiếng, giữ nguyên đảm bảo đúng đắn.\n\n(Action) Tôi instrument từng stage bằng OpenTelemetry và phát hiện 70% thời gian nằm ở 1 bước Python gọi API per-row trong vòng lặp. Tôi viết lại stage đó thành job async theo batch (500 row/call), chuyển join nặng từ Pandas sang DuckDB, và parallel 4 nhánh độc lập bằng Airflow dynamic task mapping. Tôi cũng thêm contract test để schema vỡ là fail ngay thay vì chạy 6 tiếng rồi crash.\n\n(Result) Pipeline từ 9h xuống 47 phút - nhanh 11.5x. Miss SLA về 0 trong 6 tháng, team tiết kiệm ~4000 EUR/tháng tiền compute. Điều tôi tự hào nhất: ops không page on-call vì dữ liệu trễ nữa, ca on-call của tôi trở nên ngủ được.",
    keyPoints: [
      "Lead with a measurable business pain (SLA, money, customer impact)",
      "Show your diagnosis process - instrumentation, then root cause",
      "Quantify the result with a clear before → after number",
      "Add a human detail (team sleeps better, ops trusts data)",
    ],
    keyPointsVi: [
      "Mở đầu bằng nỗi đau kinh doanh đo được (SLA, tiền, ảnh hưởng khách)",
      "Cho thấy cách chẩn đoán - instrument trước, root cause sau",
      "Định lượng kết quả với số before → after rõ ràng",
      "Thêm chi tiết con người (team ngủ ngon hơn, ops tin dữ liệu)",
    ],
  },
  {
    category: "Behavioral",
    q: "When did you say 'no' to a feature request?",
    qVi: "Khi nào bạn nói 'không' với 1 feature request?",
    hint: "Frame the 'no' as protecting users or the debt budget. Offer an alternative.",
    hintVi: "Định khung 'không' là để bảo vệ user hoặc ngân sách nợ kỹ thuật. Đề xuất phương án thay thế.",
    answer:
      "A senior PM asked us to add a 'tracking pixel' from a marketing vendor to every page load. The vendor's script was 180KB, blocked rendering, and required cookies without user consent - which would have broken our GDPR compliance.\n\nI didn't say 'no, we won't do it'. I said 'yes to the goal, no to this implementation'. I wrote a 1-page memo with three things: (1) the legal risk - concrete article references - and the size of a potential fine; (2) the perf impact - our LCP would go from 1.4s to 2.7s, which our own data showed cuts conversion ~8%; (3) two alternatives - server-side tagging via our own endpoint, or the vendor's lighter consent-aware SDK.\n\nThe PM picked option 2. It took us 2 sprints instead of 2 days, but we got the marketing signal we needed without breaking the site or the law.\n\nSaying 'no' well is really saying 'here is the cost you didn't see, and here is a path that protects everyone'.",
    answerVi:
      "Một PM senior đề nghị thêm 'tracking pixel' của vendor marketing vào mọi page load. Script vendor 180KB, block render, và yêu cầu cookie không xin consent - sẽ vỡ tuân thủ GDPR của chúng tôi.\n\nTôi không nói 'không, không làm'. Tôi nói 'yes với mục tiêu, no với cách làm này'. Tôi viết memo 1 trang: (1) rủi ro pháp lý - trích điều khoản cụ thể - và mức phạt tiềm năng; (2) tác động hiệu năng - LCP từ 1.4s lên 2.7s, dữ liệu của chính chúng tôi cho thấy conversion sẽ giảm ~8%; (3) 2 phương án thay thế - server-side tagging qua endpoint riêng, hoặc SDK nhẹ có consent của vendor.\n\nPM chọn phương án 2. Mất 2 sprint thay vì 2 ngày, nhưng vẫn có tín hiệu marketing cần mà không vỡ trang hay vỡ luật.\n\nNói 'không' giỏi thực ra là nói 'đây là chi phí bạn chưa thấy, và đây là con đường bảo vệ tất cả mọi người'.",
    keyPoints: [
      "Say yes to the goal, no to the implementation",
      "Make hidden costs visible: legal, perf, debt, security",
      "Always offer at least one alternative path",
      "Put the trade-off in writing so the decision is auditable",
    ],
    keyPointsVi: [
      "Yes với mục tiêu, no với cách làm",
      "Hiện hoá chi phí ngầm: pháp lý, hiệu năng, nợ kỹ thuật, bảo mật",
      "Luôn đề xuất tối thiểu 1 phương án thay thế",
      "Viết trade-off ra giấy để quyết định có thể audit lại",
    ],
  },

  // ============== SYSTEM DESIGN ==============
  {
    category: "System Design",
    q: "Design a URL shortener (like bit.ly).",
    qVi: "Thiết kế 1 URL shortener (như bit.ly).",
    hint: "Estimate scale → API → DB schema → ID generation → cache → analytics.",
    hintVi: "Ước lượng quy mô → API → DB schema → sinh ID → cache → analytics.",
    answer:
      "1. Clarify scale. Assume 100M new links/month, 10:1 read/write ratio → ~1B redirects/month, ~400 RPS reads peak. Links live 5 years by default.\n\n2. API. POST /shorten { long_url, custom_alias?, expires_at? } → { short_url }. GET /:code → 301/302 redirect. Keep the redirect path < 50ms p99.\n\n3. ID generation. Use a 7-character base62 code (62^7 ≈ 3.5 trillion). Two reasonable strategies: (a) counter + base62 - simplest, but predictable; (b) random 7 chars with collision retry - unpredictable, ~1 collision per 100M at our size. I'd ship (b) for security and add a Bloom filter to make the existence check O(1) before the DB call.\n\n4. Storage. Postgres for source of truth: links(code PK, long_url, user_id, created_at, expires_at). Redis as a read-through cache keyed by code, TTL 24h, with LFU eviction. Cache hit rate ~95% → most reads never touch Postgres.\n\n5. Read path. Client → CDN edge → Redis → Postgres. The CDN can serve 301s for hot links without hitting our origin at all.\n\n6. Analytics. Don't write to Postgres on every click. Fire a fire-and-forget event into Kafka → ClickHouse for aggregations (clicks per day, referrer, geo). Dashboards query ClickHouse.\n\n7. Extras to mention: rate limiting per API key, abuse detection (URL safe-browsing check at create time), idempotency on POST /shorten so retries don't create duplicates.",
    answerVi:
      "1. Làm rõ quy mô. Giả sử 100 triệu link mới/tháng, tỉ lệ read/write 10:1 → ~1 tỷ redirect/tháng, ~400 RPS read lúc peak. Link sống mặc định 5 năm.\n\n2. API. POST /shorten { long_url, custom_alias?, expires_at? } → { short_url }. GET /:code → redirect 301/302. Giữ đường redirect p99 < 50ms.\n\n3. Sinh ID. Dùng mã base62 7 ký tự (62^7 ≈ 3.5 nghìn tỷ). Hai chiến lược hợp lý: (a) counter + base62 - đơn giản nhất nhưng đoán được; (b) random 7 ký tự + retry khi đụng - không đoán được, ~1 va chạm trên 100M ở quy mô này. Tôi sẽ ship (b) vì bảo mật và thêm Bloom filter để kiểm tra tồn tại O(1) trước khi gọi DB.\n\n4. Lưu trữ. Postgres làm source of truth: links(code PK, long_url, user_id, created_at, expires_at). Redis làm read-through cache theo code, TTL 24h, eviction LFU. Cache hit ~95% → hầu hết read không đụng Postgres.\n\n5. Đường read. Client → CDN edge → Redis → Postgres. CDN có thể trả 301 cho link hot mà không đụng origin.\n\n6. Analytics. Không ghi Postgres mỗi click. Bắn event fire-and-forget vào Kafka → ClickHouse để aggregate (click/ngày, referrer, geo). Dashboard query ClickHouse.\n\n7. Bonus nên nhắc: rate limit theo API key, phát hiện abuse (kiểm tra safe-browsing khi tạo), idempotency cho POST /shorten để retry không tạo trùng.",
    keyPoints: [
      "Always start by estimating scale before drawing boxes",
      "Justify ID strategy (length, predictability, collision rate)",
      "Separate hot path (redirect) from analytics path (Kafka)",
      "Cache aggressively - the read pattern is extreme 10:1+",
      "Mention abuse, rate limiting, and idempotency without being asked",
    ],
    keyPointsVi: [
      "Luôn ước lượng quy mô trước khi vẽ box",
      "Lý giải chiến lược ID (độ dài, đoán được, tỉ lệ va chạm)",
      "Tách đường hot (redirect) khỏi đường analytics (Kafka)",
      "Cache mạnh - đây là pattern read 10:1+",
      "Chủ động nhắc abuse, rate limit, idempotency",
    ],
  },
  {
    category: "System Design",
    q: "Design a chat app for 10M users.",
    qVi: "Thiết kế chat app cho 10 triệu user.",
    hint: "WebSocket + message broker + sharding + delivery guarantees.",
    hintVi: "WebSocket + message broker + sharding + đảm bảo delivery.",
    answer:
      "1. Numbers first. 10M users, ~10% online concurrently = 1M live WebSocket connections. Average user sends ~30 msgs/day → ~3.5k writes/sec average, ~30k peak.\n\n2. Edge tier. Stateless WebSocket gateway servers, each handling ~50k connections (so ~20 boxes). Behind a TCP load balancer with sticky routing by user_id hash.\n\n3. Message flow. Client sends msg → gateway publishes to Kafka topic chat.messages partitioned by chat_id. A delivery service consumes, persists to Cassandra (write-optimized, partitioned by chat_id + bucketed by day), and fans out to recipients' gateways via a presence registry in Redis (user_id → gateway_id).\n\n4. Delivery guarantees. At-least-once from client to broker using ACKs with monotonic client message IDs; the server dedupes by (sender_id, client_msg_id). Deliver via WebSocket if online, else queue a push notification.\n\n5. Storage. Cassandra for messages (cheap writes, range scans by chat_id+time). Postgres for users, chats, memberships. S3 for attachments with pre-signed URLs.\n\n6. Hard things to call out: ordering inside a chat (use a per-chat sequence number from a centralized sequencer or Kafka offset), read receipts (separate compact topic), group chat fanout (cap group size or use a 'fanout-on-read' model for very large groups), and end-to-end encryption if required.\n\n7. Scaling further. Shard Redis presence by user_id. Auto-scale gateways on connection count, not CPU. Use a separate path for typing indicators - they're high-volume and lossy is fine.",
    answerVi:
      "1. Số liệu trước. 10M user, ~10% online cùng lúc = 1 triệu WebSocket live. Trung bình mỗi user gửi ~30 tin/ngày → ~3.5k write/giây trung bình, ~30k peak.\n\n2. Tầng edge. Gateway WebSocket stateless, mỗi server giữ ~50k connection (≈ 20 box). Sau TCP load balancer, sticky theo hash user_id.\n\n3. Luồng tin. Client gửi → gateway publish vào Kafka topic chat.messages partition theo chat_id. Service delivery consume, lưu Cassandra (write-optimized, partition theo chat_id + bucket theo ngày), và fanout tới gateway của người nhận qua presence registry trên Redis (user_id → gateway_id).\n\n4. Đảm bảo delivery. At-least-once từ client tới broker bằng ACK với client_msg_id tăng dần; server dedupe theo (sender_id, client_msg_id). Deliver qua WebSocket nếu online, không thì xếp hàng push notification.\n\n5. Storage. Cassandra cho message (write rẻ, range scan theo chat_id+time). Postgres cho user, chat, membership. S3 cho attachment với pre-signed URL.\n\n6. Vấn đề khó cần nhắc: thứ tự trong 1 chat (dùng sequence number per-chat từ sequencer tập trung hoặc Kafka offset), read receipt (topic riêng nhỏ gọn), fanout group chat (giới hạn size hoặc dùng 'fanout-on-read' với group cực lớn), và end-to-end encryption nếu yêu cầu.\n\n7. Scale tiếp. Shard Redis presence theo user_id. Auto-scale gateway theo số connection, không phải CPU. Tách đường typing indicator - volume cao và mất gói được.",
    keyPoints: [
      "Quantify concurrent connections, not just total users",
      "Stateless gateways + presence registry is the standard pattern",
      "Use a broker (Kafka) to decouple ingress from persistence",
      "Be explicit about delivery semantics and dedup",
      "Mention group-chat fanout and typing indicator separately",
    ],
    keyPointsVi: [
      "Định lượng số connection cùng lúc, không chỉ tổng user",
      "Gateway stateless + presence registry là pattern chuẩn",
      "Dùng broker (Kafka) để tách ingress khỏi persist",
      "Nói rõ delivery semantic và dedup",
      "Nhắc fanout group chat và typing indicator riêng",
    ],
  },
  {
    category: "System Design",
    q: "How would you build a rate limiter?",
    qVi: "Thiết kế 1 rate limiter như thế nào?",
    hint: "Token bucket vs sliding window. Redis-backed. Discuss accuracy vs cost.",
    hintVi: "Token bucket vs sliding window. Backend Redis. Bàn về độ chính xác vs chi phí.",
    answer:
      "1. Pick the algorithm based on the use case. Token bucket allows short bursts and is great for APIs ('100 req/min with bursts up to 200'). Fixed window is the simplest but has the boundary problem (2x burst across the window edge). Sliding window log is exact but memory-heavy. Sliding window counter is the practical sweet spot - approximate but cheap.\n\n2. Storage. Redis with a Lua script for atomic check-and-decrement. Key = rl:{api_key}:{minute_bucket}. Lua keeps the read-modify-write atomic without a round-trip lock.\n\n3. Distributed. Each API gateway calls the same Redis cluster. To avoid Redis becoming a hotspot, shard keys by hash and use Redis Cluster. For ultra-high QPS, add a local in-memory bucket per gateway with a small slack (e.g. allow 10% over) and reconcile asynchronously - trades a little accuracy for huge cost savings.\n\n4. Response. Return 429 with Retry-After and X-RateLimit-Remaining headers. Make limits configurable per plan (free/pro/enterprise) and per endpoint (POSTs cost more 'tokens' than GETs).\n\n5. Failure mode. If Redis is down, fail open (allow) for non-billed endpoints and fail closed for billing endpoints - make this a conscious policy, not an accident.\n\n6. Observability. Emit metrics per key: requests, rejections, top offenders. Alert when rejection rate spikes - it usually signals abuse or a buggy client.",
    answerVi:
      "1. Chọn thuật toán theo use case. Token bucket cho phép burst ngắn, hợp với API ('100 req/phút, burst tới 200'). Fixed window đơn giản nhất nhưng có vấn đề biên (burst 2x ở mép cửa sổ). Sliding window log chính xác nhưng tốn bộ nhớ. Sliding window counter là điểm cân bằng tốt nhất - gần đúng và rẻ.\n\n2. Lưu trữ. Redis với Lua script để check-and-decrement nguyên tử. Key = rl:{api_key}:{minute_bucket}. Lua giữ read-modify-write atomic mà không cần lock round-trip.\n\n3. Phân tán. Mỗi API gateway gọi cùng cụm Redis. Để Redis không thành hotspot, shard key theo hash và dùng Redis Cluster. QPS cực cao thì thêm bucket in-memory local mỗi gateway với slack nhỏ (cho phép +10%) và reconcile bất đồng bộ - đánh đổi chút độ chính xác lấy chi phí giảm mạnh.\n\n4. Response. Trả 429 kèm header Retry-After và X-RateLimit-Remaining. Cho phép cấu hình limit theo gói (free/pro/enterprise) và theo endpoint (POST tốn nhiều 'token' hơn GET).\n\n5. Failure mode. Redis chết thì fail open (cho qua) với endpoint không tính phí, fail closed với endpoint tính phí - chính sách có chủ ý, không tai nạn.\n\n6. Quan sát. Phát metric theo key: số request, số reject, top offender. Cảnh báo khi rejection rate tăng đột biến - thường là abuse hoặc client bug.",
    keyPoints: [
      "Match algorithm to traffic pattern, don't default to one",
      "Atomic ops via Lua to avoid race conditions",
      "Local bucket + async reconcile for extreme QPS",
      "Return useful 429 headers (Retry-After, Remaining)",
      "Be explicit about fail-open vs fail-closed",
    ],
    keyPointsVi: [
      "Chọn thuật toán theo pattern lưu lượng, đừng mặc định 1 cái",
      "Atomic bằng Lua để tránh race condition",
      "Bucket local + reconcile async cho QPS cực cao",
      "Trả header 429 hữu ích (Retry-After, Remaining)",
      "Nói rõ fail-open vs fail-closed",
    ],
  },
  {
    category: "System Design",
    q: "Design Instagram's news feed.",
    qVi: "Thiết kế news feed của Instagram.",
    hint: "Push vs pull, fanout, ranking, caching, CDN.",
    hintVi: "Push vs pull, fanout, ranking, cache, CDN.",
    answer:
      "1. The core tension is when you do the work - at write time (push/fanout-on-write) or at read time (pull/fanout-on-read). Push is fast to read but expensive when a user with 100M followers posts (a single post = 100M writes). Pull is cheap to write but slow to read for users who follow many people.\n\n2. Hybrid is what real systems do. Default to push: when a regular user posts, write the post_id into each follower's feed list in Redis (list per user, capped at ~1000 entries). For celebrities (>100k followers), don't fan out - at read time, merge the user's pushed feed with celebrity timelines pulled on demand.\n\n3. Storage. Posts in Cassandra partitioned by user_id. Feed lists in Redis (sorted set by timestamp). Media (photos/videos) in S3 served via CDN.\n\n4. Ranking. The feed list gives candidate post_ids; a ranking service rescore them with a model (engagement signals, recency, relationship strength). Keep ranking under 100ms by limiting to ~500 candidates per request.\n\n5. Read path. Client → feed API → Redis feed list (top 500) → batch fetch posts from Cassandra → ranker → return top 30. Cache the final rendered feed for 60s per user.\n\n6. Things interviewers love to hear: deletion semantics (tombstones, lazy cleanup), 'haven't logged in for a week' cold-start (rebuild feed from posts table), and the cost of the fanout decision boundary (where do you draw the celebrity line?).",
    answerVi:
      "1. Mâu thuẫn cốt lõi: làm việc lúc nào - lúc write (push/fanout-on-write) hay lúc read (pull/fanout-on-read). Push read nhanh nhưng cực đắt khi user 100M follower đăng (1 post = 100M write). Pull write rẻ nhưng read chậm với user follow nhiều người.\n\n2. Hybrid là cách hệ thống thật làm. Mặc định push: user thường đăng thì ghi post_id vào feed list của từng follower trên Redis (list per user, cap ~1000). Với người nổi tiếng (>100k follower) thì không fanout - lúc read, merge feed đã push với timeline của celebrity kéo on-demand.\n\n3. Storage. Post trong Cassandra partition theo user_id. Feed list trong Redis (sorted set theo timestamp). Media trong S3, serve qua CDN.\n\n4. Ranking. Feed list cho candidate post_id; service ranking rescore bằng model (tín hiệu tương tác, recency, mức thân thiết). Giữ ranking < 100ms bằng cách giới hạn ~500 candidate mỗi request.\n\n5. Đường read. Client → feed API → Redis feed list (top 500) → batch fetch post từ Cassandra → ranker → trả top 30. Cache feed đã render cuối cùng 60s cho mỗi user.\n\n6. Interviewer thích nghe: semantic xoá (tombstone, cleanup lazy), cold-start 'cả tuần không đăng nhập' (rebuild feed từ bảng post), và chi phí ranh giới quyết định fanout (vạch celebrity ở đâu?).",
    keyPoints: [
      "Name the push vs pull trade-off explicitly",
      "Defend the hybrid threshold (celebrity cutoff)",
      "Separate candidate generation from ranking",
      "Discuss cold-start, deletes, and cache TTL",
    ],
    keyPointsVi: [
      "Nêu rõ trade-off push vs pull",
      "Bảo vệ ngưỡng hybrid (mốc celebrity)",
      "Tách bước sinh candidate khỏi ranking",
      "Bàn cold-start, xoá, và TTL cache",
    ],
  },
  {
    category: "System Design",
    q: "Design a payment system handling 10K transactions/sec.",
    qVi: "Thiết kế hệ thống thanh toán 10K transaction/giây.",
    hint: "Idempotency keys, sagas, exactly-once via outbox pattern.",
    hintVi: "Idempotency key, saga, exactly-once bằng outbox pattern.",
    answer:
      "1. Correctness > performance. The non-negotiable property is no double charges and no lost money. Start every API: POST /charge with a required Idempotency-Key header. Store (key, request_hash, response) for 24h; replays return the stored response.\n\n2. Data model. payments (id, user_id, amount, currency, status, idempotency_key UNIQUE, created_at). Status transitions are append-only in payment_events. Money lives in a ledger table with debit/credit rows that must always sum to zero per transaction.\n\n3. Distributed flow. A payment touches multiple services - fraud check, PSP (Stripe/Adyen), ledger, notification. Use a saga: each step has a compensating action (e.g. 'capture' compensates with 'refund'). Drive the saga from a durable workflow engine (Temporal, or your own state machine in Postgres) so a crashed step resumes, not restarts.\n\n4. Exactly-once with the outbox pattern. The service that records the payment writes the row and an 'outbox' row in the same Postgres transaction. A separate publisher reads outbox rows and pushes to Kafka. Consumers dedupe by event_id. This avoids the classic 'wrote to DB, crashed before publishing' bug.\n\n5. Scale. 10K TPS is well within a sharded Postgres (shard by user_id). Read replicas for reporting. PSP calls are the slow part - pool connections and set strict timeouts (3s) with retries that respect idempotency.\n\n6. Hard things to mention: currency rounding rules, double-entry bookkeeping, reconciliation jobs that compare our ledger against the PSP daily, PCI scope minimization (never store PANs - use vault tokens), and chargeback handling.",
    answerVi:
      "1. Đúng đắn > hiệu năng. Tính chất bất di bất dịch: không double charge và không mất tiền. Bắt buộc mọi API POST /charge có header Idempotency-Key. Lưu (key, request_hash, response) 24h; replay trả response đã lưu.\n\n2. Mô hình dữ liệu. payments (id, user_id, amount, currency, status, idempotency_key UNIQUE, created_at). Chuyển trạng thái append-only trong payment_events. Tiền nằm ở bảng ledger với dòng debit/credit luôn tổng = 0 mỗi giao dịch.\n\n3. Luồng phân tán. 1 thanh toán đi qua nhiều service - fraud check, PSP (Stripe/Adyen), ledger, notification. Dùng saga: mỗi bước có hành động bù (ví dụ 'capture' bù bằng 'refund'). Drive saga bằng workflow engine bền vững (Temporal, hoặc state machine tự viết trên Postgres) để bước crash sẽ resume, không restart.\n\n4. Exactly-once bằng outbox pattern. Service ghi payment ghi cả 'outbox' row trong cùng 1 Postgres transaction. Publisher riêng đọc outbox và push vào Kafka. Consumer dedupe theo event_id. Tránh được bug kinh điển 'ghi DB xong, crash trước khi publish'.\n\n5. Scale. 10K TPS thoải mái trong Postgres sharded (shard theo user_id). Read replica cho báo cáo. Gọi PSP là chỗ chậm - pool connection, timeout chặt (3s), retry phải tôn trọng idempotency.\n\n6. Vấn đề khó cần nhắc: quy tắc làm tròn currency, double-entry bookkeeping, job reconcile ledger với PSP hàng ngày, giảm scope PCI (không lưu PAN - dùng vault token), và xử lý chargeback.",
    keyPoints: [
      "Idempotency-Key is non-negotiable - make it the first thing you mention",
      "Saga + compensations beat distributed 2PC",
      "Outbox pattern solves DB-write + event-publish atomicity",
      "Double-entry ledger + daily reconciliation = audit-proof",
      "Mention PCI scope and chargebacks proactively",
    ],
    keyPointsVi: [
      "Idempotency-Key là bắt buộc - nhắc đầu tiên",
      "Saga + compensation tốt hơn 2PC phân tán",
      "Outbox pattern giải bài toán atomic write DB + publish event",
      "Ledger double-entry + reconcile hàng ngày = chống audit",
      "Chủ động nhắc PCI scope và chargeback",
    ],
  },
  {
    category: "System Design",
    q: "How would you design Google Drive?",
    qVi: "Thiết kế Google Drive như thế nào?",
    hint: "Object storage + chunking + versioning + permissions + delta sync.",
    hintVi: "Object storage + chunk + version + permission + đồng bộ delta.",
    answer:
      "1. Files split into fixed-size chunks (e.g. 4MB) and stored in object storage (S3/GCS). Each chunk is content-addressed by its SHA-256 hash. Deduplication is free - uploading the same file twice writes zero new chunks.\n\n2. Metadata DB (Postgres or Spanner) holds files(id, owner_id, name, parent_folder_id, current_version), file_versions(file_id, version, chunk_list, size, created_at), and permissions(file_id, user_id, role). The chunk_list is an ordered list of chunk hashes.\n\n3. Upload flow. Client computes hashes for each chunk locally and sends only the hashes first; server replies which chunks it already has. Client uploads the missing ones via pre-signed URLs directly to object storage. Server commits a new file_version row when all chunks are confirmed.\n\n4. Sync. Client keeps a local index of (path, version). It long-polls or subscribes to a change feed; the server pushes only the deltas (which file_id changed to which version). Conflict resolution: last-writer-wins by default, with both versions preserved as 'file (1).docx' for editable types.\n\n5. Permissions. ACL evaluated server-side on every read. Sharing creates rows in permissions; folder permissions are inherited via materialized path or a graph traversal cached in Redis.\n\n6. Scale + cost. Hot chunks fronted by CDN. Cold storage tier for files not touched in 90 days. Garbage-collect chunks no version references. Encrypt at rest with per-user data keys wrapped by a KMS master key.\n\n7. Mention: large-file resumable uploads (TUS protocol or signed multipart), real-time collaborative edit (operational transforms or CRDTs - out of scope for storage but worth flagging), and trash retention for 30 days.",
    answerVi:
      "1. File chia thành chunk cố định (ví dụ 4MB), lưu trong object storage (S3/GCS). Mỗi chunk content-addressed theo SHA-256. Dedupe miễn phí - upload cùng file 2 lần thì không ghi chunk mới nào.\n\n2. DB metadata (Postgres hoặc Spanner) giữ files(id, owner_id, name, parent_folder_id, current_version), file_versions(file_id, version, chunk_list, size, created_at), và permissions(file_id, user_id, role). chunk_list là list hash theo thứ tự.\n\n3. Luồng upload. Client tự hash từng chunk và gửi hash trước; server trả lời chunk nào đã có. Client upload chunk thiếu qua pre-signed URL thẳng vào object storage. Server commit file_version mới khi đủ chunk.\n\n4. Đồng bộ. Client giữ index local (path, version). Long-poll hoặc subscribe change feed; server push chỉ delta (file_id nào đổi sang version nào). Xung đột: mặc định last-writer-wins, giữ cả 2 bản dưới dạng 'file (1).docx' cho file có thể edit.\n\n5. Permission. ACL evaluate server-side mỗi lần read. Share tạo row trong permissions; permission folder kế thừa qua materialized path hoặc traversal graph cache trên Redis.\n\n6. Scale + chi phí. Chunk hot phục vụ qua CDN. Cold storage cho file 90 ngày không đụng. Garbage-collect chunk không version nào reference. Mã hoá at-rest bằng data key per-user wrap bởi master key KMS.\n\n7. Nhắc thêm: resumable upload file lớn (TUS hoặc signed multipart), edit cộng tác realtime (OT hoặc CRDT - ngoài scope storage nhưng nên nhắc), và trash giữ 30 ngày.",
    keyPoints: [
      "Content-addressed chunking → free deduplication",
      "Pre-signed URLs to skip the app server on upload",
      "Delta sync via change feed, not full re-scan",
      "Hot/cold tiering + GC for cost control",
      "Encryption with per-user keys wrapped by KMS",
    ],
    keyPointsVi: [
      "Chunk content-addressed → dedupe miễn phí",
      "Pre-signed URL để upload bỏ qua app server",
      "Đồng bộ delta qua change feed, không quét lại toàn bộ",
      "Tier hot/cold + GC để kiểm soát chi phí",
      "Mã hoá với key per-user wrap bởi KMS",
    ],
  },
  {
    category: "System Design",
    q: "Design a search-as-you-type service.",
    qVi: "Thiết kế service search-as-you-type.",
    hint: "Trie + LRU cache + debounce + Elasticsearch for full search.",
    hintVi: "Trie + LRU cache + debounce + Elasticsearch cho full search.",
    answer:
      "1. Latency budget. Sub-100ms end-to-end including network. That kills any plan that hits a full-text engine on every keystroke.\n\n2. Two-layer design. Layer 1 = a suggestions service backed by an in-memory prefix index (trie or finite-state transducer) holding the top-N completions per prefix, precomputed offline from query logs and ranked by popularity. Layer 2 = full search hits Elasticsearch only when the user actually submits.\n\n3. Client. Debounce keystrokes (~80ms), cancel in-flight requests, and cache the last 100 prefix responses in memory. The most effective optimization is doing less, not faster.\n\n4. Suggestions service. Stateless workers each hold a copy of the trie in RAM (a few GB for billions of queries). Rebuild the trie nightly from a Spark job that aggregates query logs. Personalization layered on top: blend global top-N with the user's recent searches.\n\n5. Edge cases. Typos → use a Levenshtein-aware FST or a small bigram corrector before the lookup. Multi-lingual → separate tries per language inferred from session locale. Profanity / safety filter applied to the suggestion list, not just the final search.\n\n6. Scale. Suggestions traffic is huge (every keystroke); shard workers behind a load balancer with consistent hashing on the prefix. Cache hot prefixes (like single letters) at the CDN edge.\n\n7. Observability. Log CTR on suggestion positions; suggestions with very low CTR get demoted. Track p95 latency at the edge, not just at the server.",
    answerVi:
      "1. Ngân sách latency. Dưới 100ms end-to-end kể cả network. Loại bỏ mọi phương án đụng full-text engine mỗi phím.\n\n2. Thiết kế 2 tầng. Tầng 1 = service gợi ý backend bằng prefix index in-memory (trie hoặc FST) giữ top-N hoàn thành cho mỗi prefix, precompute offline từ query log và rank theo độ phổ biến. Tầng 2 = full search chỉ đụng Elasticsearch khi user thực sự submit.\n\n3. Client. Debounce phím (~80ms), cancel request đang bay, cache 100 prefix gần nhất trong memory. Tối ưu mạnh nhất là làm ít việc hơn, không phải làm nhanh hơn.\n\n4. Service gợi ý. Worker stateless, mỗi worker giữ 1 bản trie trong RAM (vài GB cho hàng tỷ query). Rebuild trie hàng đêm bằng job Spark aggregate query log. Personalize trên top: blend top-N global với search gần đây của user.\n\n5. Edge case. Sai chính tả → FST aware Levenshtein hoặc bigram corrector nhỏ trước lookup. Đa ngôn ngữ → trie tách theo locale của session. Lọc profanity/safety áp dụng cho list gợi ý, không chỉ search cuối.\n\n6. Scale. Lưu lượng gợi ý cực lớn (mỗi phím); shard worker sau load balancer consistent-hash theo prefix. Cache prefix hot (như 1 ký tự đơn) tại CDN edge.\n\n7. Quan sát. Log CTR theo vị trí gợi ý; gợi ý CTR thấp bị giáng. Đo p95 latency tại edge, không chỉ tại server.",
    keyPoints: [
      "Anchor on a hard latency budget first",
      "Separate suggestions (cheap, in-memory) from full search",
      "Client-side debounce + cancellation is mandatory",
      "Personalize by blending, not replacing, global top-N",
      "Track CTR per position to keep suggestions honest",
    ],
    keyPointsVi: [
      "Bám vào ngân sách latency cứng trước",
      "Tách gợi ý (rẻ, in-memory) khỏi full search",
      "Debounce + cancel client là bắt buộc",
      "Personalize bằng blend, không thay thế top-N global",
      "Theo dõi CTR theo vị trí để gợi ý không bị 'spam'",
    ],
  },

  // ============== CODING ==============
  {
    category: "Coding",
    q: "Reverse a linked list iteratively and recursively.",
    qVi: "Đảo ngược linked list theo cách lặp và đệ quy.",
    hint: "Track prev/curr/next. Discuss O(n) time, O(1) iterative vs O(n) recursive space.",
    hintVi: "Theo dõi prev/curr/next. Bàn O(n) time, O(1) lặp vs O(n) đệ quy về space.",
    answer:
      "Iterative - the standard answer interviewers expect:\n\nfunction reverse(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;  // save before we clobber it\n    curr.next = prev;        // flip the pointer\n    prev = curr;             // advance window\n    curr = next;\n  }\n  return prev;               // new head\n}\n\nWalk through it on [1→2→3]: after iter 1 prev=1→null, curr=2; iter 2 prev=2→1→null, curr=3; iter 3 prev=3→2→1→null. Return prev. Time O(n), space O(1).\n\nRecursive:\n\nfunction reverse(head) {\n  if (!head || !head.next) return head;\n  const newHead = reverse(head.next);\n  head.next.next = head;     // make the next node point back\n  head.next = null;          // break the old forward link\n  return newHead;\n}\n\nTime O(n), space O(n) on the call stack - that's the trade-off and the interviewer wants to hear you say it out loud.\n\nFollow-ups they often ask: reverse only between positions m and n, reverse in groups of k, and detect/handle a cycle before reversing (otherwise you'll loop forever).",
    answerVi:
      "Lặp - đáp án chuẩn interviewer chờ:\n\nfunction reverse(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;  // lưu trước khi ghi đè\n    curr.next = prev;        // lật con trỏ\n    prev = curr;             // tiến cửa sổ\n    curr = next;\n  }\n  return prev;               // head mới\n}\n\nChạy trên [1→2→3]: sau iter 1 prev=1→null, curr=2; iter 2 prev=2→1→null, curr=3; iter 3 prev=3→2→1→null. Trả prev. Time O(n), space O(1).\n\nĐệ quy:\n\nfunction reverse(head) {\n  if (!head || !head.next) return head;\n  const newHead = reverse(head.next);\n  head.next.next = head;     // node sau trỏ ngược lại\n  head.next = null;          // cắt liên kết cũ\n  return newHead;\n}\n\nTime O(n), space O(n) trên call stack - đây là trade-off và interviewer muốn nghe bạn nói ra.\n\nFollow-up hay gặp: chỉ đảo từ vị trí m đến n, đảo theo nhóm k, và phát hiện/xử lý cycle trước khi đảo (không thì loop vô tận).",
    keyPoints: [
      "Always save next before flipping the pointer",
      "State complexity for both versions (iterative O(1) space wins)",
      "Mention cycle detection as a pre-condition in real code",
      "Be ready for follow-ups: reverse-in-range, reverse-k-group",
    ],
    keyPointsVi: [
      "Luôn lưu next trước khi lật con trỏ",
      "Nêu độ phức tạp cả 2 bản (lặp O(1) space thắng)",
      "Nhắc phát hiện cycle như điều kiện tiên quyết trong code thật",
      "Sẵn sàng follow-up: reverse-in-range, reverse-k-group",
    ],
  },
  {
    category: "Coding",
    q: "Find the longest substring without repeating characters.",
    qVi: "Tìm chuỗi con dài nhất không có ký tự trùng lặp.",
    hint: "Sliding window with a hash map of char → last index. O(n) time.",
    hintVi: "Sliding window với hash map char → index cuối. O(n) time.",
    answer:
      "Brute force is O(n²) - check every substring. The interviewer wants O(n) sliding window.\n\nfunction lengthOfLongest(s) {\n  const lastSeen = new Map();   // char → last index it appeared\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    if (lastSeen.has(c) && lastSeen.get(c) >= left) {\n      left = lastSeen.get(c) + 1;   // jump past the duplicate\n    }\n    lastSeen.set(c, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n\nWalk through 'abcabcbb': window grows to 'abc' (3), then 'a' repeats so left jumps to index 1 giving 'bca' (3), then 'b' repeats and left jumps past it, and so on. Answer 3.\n\nWhy O(n): each index is visited once by right and at most once by left. Space O(min(n, alphabet)).\n\nEdge cases to call out: empty string returns 0, all-unique string returns n, Unicode/emoji means you should iterate by code points (Array.from(s)) not chars. Common variant: 'longest substring with at most K distinct characters' - same template with a different shrink condition.",
    answerVi:
      "Brute force O(n²) - kiểm tra mọi substring. Interviewer chờ O(n) sliding window.\n\nfunction lengthOfLongest(s) {\n  const lastSeen = new Map();   // char → index xuất hiện cuối\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    if (lastSeen.has(c) && lastSeen.get(c) >= left) {\n      left = lastSeen.get(c) + 1;   // nhảy qua trùng\n    }\n    lastSeen.set(c, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n\nChạy 'abcabcbb': cửa sổ thành 'abc' (3), 'a' trùng nên left nhảy lên index 1 thành 'bca' (3), rồi 'b' trùng và left nhảy qua, v.v. Đáp số 3.\n\nVì sao O(n): mỗi index được right thăm 1 lần, left tối đa 1 lần. Space O(min(n, alphabet)).\n\nEdge case cần nhắc: chuỗi rỗng trả 0, toàn ký tự khác nhau trả n, Unicode/emoji cần duyệt theo code point (Array.from(s)). Biến thể hay gặp: 'substring dài nhất có tối đa K ký tự khác nhau' - cùng template, điều kiện shrink khác.",
    keyPoints: [
      "Lead with brute force complexity to set up the optimization",
      "The lastSeen index map (not a set) lets left jump in O(1)",
      "State both time O(n) and space O(min(n, alphabet))",
      "Mention Unicode/emoji and the K-distinct variant",
    ],
    keyPointsVi: [
      "Mở bằng brute force để dẫn vào tối ưu",
      "Map lastSeen index (không phải set) cho phép left nhảy O(1)",
      "Nêu cả time O(n) và space O(min(n, alphabet))",
      "Nhắc Unicode/emoji và biến thể K-distinct",
    ],
  },
  {
    category: "Coding",
    q: "Implement a LRU cache.",
    qVi: "Cài đặt LRU cache.",
    hint: "Doubly linked list + hash map → both ops O(1).",
    hintVi: "Doubly linked list + hash map → cả 2 thao tác O(1).",
    answer:
      "We need O(1) for both get and put. A plain hash map gives O(1) lookup but no notion of order. A linked list gives ordering but O(n) lookup. Combine them.\n\nclass LRU {\n  constructor(cap) {\n    this.cap = cap;\n    this.map = new Map();           // key → node\n    this.head = { prev: null, next: null }; // dummy head (most recent)\n    this.tail = { prev: null, next: null }; // dummy tail (least recent)\n    this.head.next = this.tail; this.tail.prev = this.head;\n  }\n  _remove(node) { node.prev.next = node.next; node.next.prev = node.prev; }\n  _addToFront(node) {\n    node.next = this.head.next; node.prev = this.head;\n    this.head.next.prev = node; this.head.next = node;\n  }\n  get(key) {\n    const node = this.map.get(key);\n    if (!node) return -1;\n    this._remove(node); this._addToFront(node);\n    return node.val;\n  }\n  put(key, val) {\n    if (this.map.has(key)) {\n      const node = this.map.get(key);\n      node.val = val;\n      this._remove(node); this._addToFront(node);\n      return;\n    }\n    if (this.map.size === this.cap) {\n      const lru = this.tail.prev;\n      this._remove(lru); this.map.delete(lru.key);\n    }\n    const node = { key, val, prev: null, next: null };\n    this._addToFront(node); this.map.set(key, node);\n  }\n}\n\nDummy head/tail nodes remove the special cases for empty list and single element - code stays clean. JavaScript's built-in Map preserves insertion order, so in interviews you can also mention you'd use it if allowed.\n\nFollow-ups: thread-safe version (lock the whole map, or use a striped lock), TTL support (store expires_at, lazy-evict on get), and LFU instead of LRU (frequency buckets).",
    answerVi:
      "Cần O(1) cho cả get và put. Hash map cho lookup O(1) nhưng không có thứ tự. Linked list có thứ tự nhưng lookup O(n). Kết hợp 2 cái.\n\nclass LRU {\n  constructor(cap) {\n    this.cap = cap;\n    this.map = new Map();           // key → node\n    this.head = { prev: null, next: null }; // dummy head (mới nhất)\n    this.tail = { prev: null, next: null }; // dummy tail (cũ nhất)\n    this.head.next = this.tail; this.tail.prev = this.head;\n  }\n  _remove(node) { node.prev.next = node.next; node.next.prev = node.prev; }\n  _addToFront(node) {\n    node.next = this.head.next; node.prev = this.head;\n    this.head.next.prev = node; this.head.next = node;\n  }\n  get(key) {\n    const node = this.map.get(key);\n    if (!node) return -1;\n    this._remove(node); this._addToFront(node);\n    return node.val;\n  }\n  put(key, val) {\n    if (this.map.has(key)) {\n      const node = this.map.get(key);\n      node.val = val;\n      this._remove(node); this._addToFront(node);\n      return;\n    }\n    if (this.map.size === this.cap) {\n      const lru = this.tail.prev;\n      this._remove(lru); this.map.delete(lru.key);\n    }\n    const node = { key, val, prev: null, next: null };\n    this._addToFront(node); this.map.set(key, node);\n  }\n}\n\nDummy head/tail loại bỏ case đặc biệt cho list rỗng và 1 phần tử - code sạch. Map JS giữ thứ tự insertion nên trong phỏng vấn có thể nhắc 'nếu được phép tôi dùng luôn'.\n\nFollow-up: bản thread-safe (lock toàn map hoặc striped lock), hỗ trợ TTL (lưu expires_at, evict lazy khi get), và LFU thay LRU (bucket tần suất).",
    keyPoints: [
      "Justify why a Map alone isn't enough",
      "Use dummy head/tail to keep the linked list code clean",
      "Always _remove then _addToFront on a hit",
      "Mention follow-ups: thread safety, TTL, LFU",
    ],
    keyPointsVi: [
      "Giải thích vì sao chỉ Map không đủ",
      "Dùng dummy head/tail để code linked list sạch",
      "Khi hit luôn _remove rồi _addToFront",
      "Nhắc follow-up: thread safety, TTL, LFU",
    ],
  },
  {
    category: "Coding",
    q: "Detect a cycle in a directed graph.",
    qVi: "Phát hiện cycle trong directed graph.",
    hint: "DFS with three-color marking (white/gray/black) - back edge = cycle.",
    hintVi: "DFS với 3 màu (white/gray/black) - back edge = cycle.",
    answer:
      "Two-color (visited / not) is enough for undirected graphs but NOT for directed graphs, because a node can be reachable via two paths without forming a cycle. Use three colors.\n\nWHITE = unvisited, GRAY = in the current DFS path, BLACK = fully processed.\n\nfunction hasCycle(graph) {\n  const color = new Map();\n  for (const node of graph.keys()) color.set(node, 'WHITE');\n  function dfs(u) {\n    color.set(u, 'GRAY');\n    for (const v of graph.get(u) ?? []) {\n      if (color.get(v) === 'GRAY') return true;   // back edge\n      if (color.get(v) === 'WHITE' && dfs(v)) return true;\n    }\n    color.set(u, 'BLACK');\n    return false;\n  }\n  for (const node of graph.keys()) {\n    if (color.get(node) === 'WHITE' && dfs(node)) return true;\n  }\n  return false;\n}\n\nTime O(V + E), space O(V) for the color map plus recursion stack.\n\nAlternative for huge graphs: Kahn's algorithm - repeatedly remove nodes with in-degree 0. If the count of removed nodes < total, there is a cycle. Bonus: it also gives you a topological order if there isn't one.\n\nReal-world hooks: build systems detecting circular dependencies, deadlock detection in databases, and microservice call graphs. Mention these so the answer doesn't feel academic.",
    answerVi:
      "Two-color (đã thăm / chưa) đủ cho đồ thị vô hướng, KHÔNG đủ cho có hướng, vì 1 node có thể tới được qua 2 đường mà không tạo cycle. Dùng 3 màu.\n\nWHITE = chưa thăm, GRAY = đang trong path DFS, BLACK = xử lý xong.\n\nfunction hasCycle(graph) {\n  const color = new Map();\n  for (const node of graph.keys()) color.set(node, 'WHITE');\n  function dfs(u) {\n    color.set(u, 'GRAY');\n    for (const v of graph.get(u) ?? []) {\n      if (color.get(v) === 'GRAY') return true;   // back edge\n      if (color.get(v) === 'WHITE' && dfs(v)) return true;\n    }\n    color.set(u, 'BLACK');\n    return false;\n  }\n  for (const node of graph.keys()) {\n    if (color.get(node) === 'WHITE' && dfs(node)) return true;\n  }\n  return false;\n}\n\nTime O(V + E), space O(V) cho map màu cộng stack đệ quy.\n\nPhương án cho đồ thị cực lớn: thuật toán Kahn - liên tục xoá node có in-degree 0. Nếu số node xoá < tổng thì có cycle. Bonus: cho luôn topological order nếu không có cycle.\n\nMóc nối thực tế: build system phát hiện dependency vòng, phát hiện deadlock trong DB, và graph gọi microservice. Nhắc để câu trả lời không sách vở.",
    keyPoints: [
      "Explain why 2-color fails for directed graphs",
      "GRAY = currently on DFS path is the key insight",
      "Mention Kahn's algorithm as the iterative alternative",
      "Tie to real systems (build deps, DB deadlock)",
    ],
    keyPointsVi: [
      "Giải thích vì sao 2-color sai với đồ thị có hướng",
      "GRAY = đang trên path DFS là chìa khoá",
      "Nhắc thuật toán Kahn như phương án lặp",
      "Liên hệ hệ thống thật (build deps, DB deadlock)",
    ],
  },
  {
    category: "Coding",
    q: "Merge K sorted lists efficiently.",
    qVi: "Gộp K linked list đã sort hiệu quả.",
    hint: "Min-heap of size K → O(N log K). Or pairwise merge → same complexity.",
    hintVi: "Min-heap size K → O(N log K). Hoặc merge cặp đôi → cùng phức tạp.",
    answer:
      "Naive: concat everything and sort = O(N log N). Better: pull the smallest head across all K lists each step using a min-heap.\n\nfunction mergeKLists(lists) {\n  const heap = new MinHeap((a, b) => a.val - b.val);\n  for (const head of lists) if (head) heap.push(head);\n  const dummy = { next: null }; let tail = dummy;\n  while (!heap.empty()) {\n    const node = heap.pop();\n    tail.next = node; tail = node;\n    if (node.next) heap.push(node.next);\n  }\n  return dummy.next;\n}\n\nComplexity: each of N nodes is pushed/popped once, each op is O(log K). Total O(N log K) time, O(K) extra space.\n\nThe other 'classic' approach is divide and conquer: merge pairs of lists, then pairs of merged lists, log K levels deep - also O(N log K). I prefer the heap version because it streams: you can start emitting output before reading everything, which matters if the lists are coming from disk or network.\n\nReal-world parallel: this is exactly the algorithm used by external sort (merging sorted runs from disk) and by log aggregation systems pulling time-sorted log streams from multiple shards.",
    answerVi:
      "Naive: nối tất rồi sort = O(N log N). Tốt hơn: mỗi bước rút node nhỏ nhất trong K head bằng min-heap.\n\nfunction mergeKLists(lists) {\n  const heap = new MinHeap((a, b) => a.val - b.val);\n  for (const head of lists) if (head) heap.push(head);\n  const dummy = { next: null }; let tail = dummy;\n  while (!heap.empty()) {\n    const node = heap.pop();\n    tail.next = node; tail = node;\n    if (node.next) heap.push(node.next);\n  }\n  return dummy.next;\n}\n\nPhức tạp: mỗi node trong N được push/pop 1 lần, mỗi op O(log K). Tổng O(N log K) time, O(K) extra space.\n\nPhương án 'kinh điển' khác là chia để trị: merge cặp list, rồi cặp list đã merge, sâu log K tầng - cũng O(N log K). Tôi thích heap hơn vì stream được: có thể phát output trước khi đọc hết, quan trọng khi list đến từ disk/network.\n\nLiên hệ thực tế: chính là thuật toán dùng trong external sort (merge run sorted từ disk) và hệ thống aggregate log kéo stream log đã sort theo thời gian từ nhiều shard.",
    keyPoints: [
      "Reject the naive O(N log N) sort approach explicitly",
      "Heap gives O(N log K) and supports streaming",
      "Divide-and-conquer is the equally valid alternative",
      "Tie to external sort / log aggregation in production",
    ],
    keyPointsVi: [
      "Loại phương án sort O(N log N) ra cho rõ ràng",
      "Heap cho O(N log K) và stream được",
      "Chia để trị là phương án thay thế tương đương",
      "Liên hệ external sort / log aggregation trong production",
    ],
  },
  {
    category: "Coding",
    q: "Find all anagrams of a word in a string.",
    qVi: "Tìm tất cả anagram của 1 từ trong chuỗi.",
    hint: "Sliding window of size |p| with a character-count comparison.",
    hintVi: "Sliding window kích thước |p| với so sánh count ký tự.",
    answer:
      "Goal: return start indices in s where a substring is an anagram of p.\n\nIdea: any anagram of p has the same character counts as p. Slide a window of size |p| across s and check counts each step. Naive recompute is O(|p|) per step = O(n·|p|). Maintain a running diff to get O(n).\n\nfunction findAnagrams(s, p) {\n  if (s.length < p.length) return [];\n  const need = new Array(26).fill(0), have = new Array(26).fill(0);\n  for (const c of p) need[c.charCodeAt(0) - 97]++;\n  const res = [];\n  for (let i = 0; i < s.length; i++) {\n    have[s.charCodeAt(i) - 97]++;\n    if (i >= p.length) have[s.charCodeAt(i - p.length) - 97]--;\n    if (i >= p.length - 1 && arraysEqual(need, have)) res.push(i - p.length + 1);\n  }\n  return res;\n}\n\nThe arraysEqual call is 26 comparisons - effectively constant for lowercase ASCII. For larger alphabets, keep a matchCount counter that increments when have[c] transitions from need[c]-1 to need[c] and decrements on the reverse; the window is a match when matchCount === distinctCharsInP.\n\nTime O(n), space O(alphabet). Edge cases: |p| > |s| returns empty, empty p is undefined behaviour - clarify with the interviewer.",
    answerVi:
      "Mục tiêu: trả về các index bắt đầu trong s mà substring là anagram của p.\n\nÝ tưởng: mọi anagram của p có cùng count ký tự với p. Trượt cửa sổ size |p| qua s và check count mỗi bước. Recompute naive O(|p|)/bước = O(n·|p|). Giữ diff chạy để xuống O(n).\n\nfunction findAnagrams(s, p) {\n  if (s.length < p.length) return [];\n  const need = new Array(26).fill(0), have = new Array(26).fill(0);\n  for (const c of p) need[c.charCodeAt(0) - 97]++;\n  const res = [];\n  for (let i = 0; i < s.length; i++) {\n    have[s.charCodeAt(i) - 97]++;\n    if (i >= p.length) have[s.charCodeAt(i - p.length) - 97]--;\n    if (i >= p.length - 1 && arraysEqual(need, have)) res.push(i - p.length + 1);\n  }\n  return res;\n}\n\nLời gọi arraysEqual là 26 phép so sánh - coi như hằng với ASCII chữ thường. Với alphabet lớn, giữ matchCount tăng khi have[c] chuyển từ need[c]-1 thành need[c] và giảm khi ngược lại; cửa sổ khớp khi matchCount === số ký tự khác nhau trong p.\n\nTime O(n), space O(alphabet). Edge case: |p| > |s| trả rỗng, p rỗng là hành vi không xác định - hỏi interviewer cho rõ.",
    keyPoints: [
      "Frame anagram as 'same character counts'",
      "Slide a fixed-size window with incremental updates",
      "Use matchCount trick for large alphabets to stay O(n)",
      "Clarify ambiguous edge cases (empty pattern) up front",
    ],
    keyPointsVi: [
      "Định nghĩa anagram = cùng count ký tự",
      "Trượt cửa sổ cố định với cập nhật incremental",
      "Dùng mẹo matchCount cho alphabet lớn để giữ O(n)",
      "Hỏi rõ edge case mơ hồ (pattern rỗng) ngay từ đầu",
    ],
  },
  {
    category: "Coding",
    q: "Serialize and deserialize a binary tree.",
    qVi: "Serialize và deserialize binary tree.",
    hint: "Pre-order DFS with explicit null markers - unambiguous.",
    hintVi: "DFS pre-order với marker null rõ ràng - không nhập nhằng.",
    answer:
      "The classic trap: people pick in-order traversal because it's familiar. But in-order alone can't reconstruct a binary tree uniquely without inorder + preorder/postorder. Pre-order with explicit null markers (#) IS sufficient.\n\nfunction serialize(root) {\n  const out = [];\n  function dfs(n) {\n    if (!n) { out.push('#'); return; }\n    out.push(String(n.val));\n    dfs(n.left); dfs(n.right);\n  }\n  dfs(root);\n  return out.join(',');\n}\n\nfunction deserialize(data) {\n  const vals = data.split(',');\n  let i = 0;\n  function dfs() {\n    if (vals[i] === '#') { i++; return null; }\n    const node = { val: Number(vals[i++]), left: null, right: null };\n    node.left = dfs(); node.right = dfs();\n    return node;\n  }\n  return dfs();\n}\n\nTime and space both O(n). The null markers are what make pre-order reversible - without them you can't tell where a subtree ends.\n\nAlternatives worth mentioning: level-order (BFS) serialization is what LeetCode uses for input - easier for humans to read, slightly more code; binary format (varint per value) is what production systems use because it's 5-10x smaller than the CSV.\n\nFor a BST specifically, you don't need null markers - pre-order alone is enough because BST ordering constrains structure.",
    answerVi:
      "Bẫy kinh điển: nhiều người chọn in-order vì quen. Nhưng in-order 1 mình KHÔNG dựng lại được binary tree duy nhất nếu không có inorder + preorder/postorder. Pre-order với marker null (#) tường minh thì ĐỦ.\n\nfunction serialize(root) {\n  const out = [];\n  function dfs(n) {\n    if (!n) { out.push('#'); return; }\n    out.push(String(n.val));\n    dfs(n.left); dfs(n.right);\n  }\n  dfs(root);\n  return out.join(',');\n}\n\nfunction deserialize(data) {\n  const vals = data.split(',');\n  let i = 0;\n  function dfs() {\n    if (vals[i] === '#') { i++; return null; }\n    const node = { val: Number(vals[i++]), left: null, right: null };\n    node.left = dfs(); node.right = dfs();\n    return node;\n  }\n  return dfs();\n}\n\nTime và space đều O(n). Marker null chính là thứ làm pre-order khôi phục được - không có nó không biết subtree kết thúc ở đâu.\n\nPhương án nên nhắc: level-order (BFS) là format LeetCode dùng cho input - dễ đọc hơn, code dài hơn chút; định dạng nhị phân (varint mỗi giá trị) là thứ production dùng vì nhỏ hơn CSV 5-10x.\n\nRiêng BST thì không cần marker null - pre-order 1 mình đủ vì thứ tự BST đã ràng buộc cấu trúc.",
    keyPoints: [
      "Explain why in-order alone is ambiguous",
      "Null markers are the secret to making pre-order reversible",
      "Mention BFS and binary formats as production alternatives",
      "Note the BST special case (no markers needed)",
    ],
    keyPointsVi: [
      "Giải thích vì sao in-order 1 mình nhập nhằng",
      "Marker null là chìa khoá khôi phục pre-order",
      "Nhắc BFS và định dạng nhị phân như phương án production",
      "Nêu trường hợp đặc biệt BST (không cần marker)",
    ],
  },
  {
    category: "Coding",
    q: "Implement debounce and throttle.",
    qVi: "Cài đặt debounce và throttle.",
    hint: "setTimeout patterns. Explain when each fits (search input vs scroll handler).",
    hintVi: "Pattern setTimeout. Giải thích khi nào dùng cái nào (search input vs scroll handler).",
    answer:
      "Different goals: debounce delays execution until the user stops; throttle caps execution to once per interval.\n\nDebounce - 'wait until they're done typing':\n\nfunction debounce(fn, ms) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), ms);\n  };\n}\n\nThrottle - 'fire at most every N ms', leading-edge version:\n\nfunction throttle(fn, ms) {\n  let last = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - last >= ms) { last = now; fn.apply(this, args); }\n  };\n}\n\nWhen to use which:\n- Debounce: search-as-you-type (don't query on every keystroke), window resize (only run after the user stops dragging), form auto-save.\n- Throttle: scroll handler, mousemove, drag, gameplay input - anything firing 60+ times per second where you want steady updates.\n\nProduction-grade versions add: a trailing flag (fire one more time at the end of a throttle burst), a cancel() method, immediate option (fire on the first call), and preserving 'this' + arguments correctly with arrow functions. Lodash's _.debounce and _.throttle are the canonical references - in interviews mention you'd reach for them in real code but you can implement the core in 5 lines.",
    answerVi:
      "Mục tiêu khác nhau: debounce hoãn execute tới khi user dừng; throttle giới hạn execute mỗi N ms.\n\nDebounce - 'chờ user gõ xong':\n\nfunction debounce(fn, ms) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), ms);\n  };\n}\n\nThrottle - 'tối đa mỗi N ms', leading-edge:\n\nfunction throttle(fn, ms) {\n  let last = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - last >= ms) { last = now; fn.apply(this, args); }\n  };\n}\n\nKhi nào dùng cái nào:\n- Debounce: search-as-you-type (không query mỗi phím), resize cửa sổ (chỉ chạy khi user thả), auto-save form.\n- Throttle: scroll handler, mousemove, drag, input game - bất kỳ event bắn 60+ lần/giây mà bạn muốn cập nhật đều.\n\nBản production thêm: trailing flag (bắn thêm 1 lần cuối burst), method cancel(), tuỳ chọn immediate (bắn ngay lần đầu), và giữ 'this' + args đúng với arrow function. _.debounce và _.throttle của Lodash là tham chiếu chuẩn - phỏng vấn cứ nói bạn sẽ dùng nó trong code thật, nhưng core viết 5 dòng được.",
    keyPoints: [
      "Define the goal of each in one sentence",
      "Show both implementations and the trade-offs",
      "Give a real example for each (search vs scroll)",
      "Mention production extras: trailing, cancel, leading edge",
    ],
    keyPointsVi: [
      "Định nghĩa mục tiêu mỗi cái trong 1 câu",
      "Show cả 2 implementation và trade-off",
      "Cho ví dụ thật cho mỗi cái (search vs scroll)",
      "Nhắc extras production: trailing, cancel, leading edge",
    ],
  },

  // ============== DEVOPS ==============
  {
    category: "DevOps",
    q: "Explain blue-green vs canary deployment.",
    qVi: "Giải thích blue-green và canary deployment.",
    hint: "Blue-green = full swap; canary = % rollout. Always cover rollback.",
    hintVi: "Blue-green = swap toàn bộ; canary = rollout theo %. Luôn nói rollback.",
    answer:
      "Blue-green: you run two identical production environments. 'Blue' is live; 'green' is the new version warmed up and tested. The load balancer flips 100% of traffic from blue to green instantly. Rollback = flip back. Pros: instant cutover, dead-simple rollback. Cons: 2x infrastructure cost during deploy, doesn't catch issues that only surface under real traffic mix.\n\nCanary: route a small % of traffic (e.g. 1% → 5% → 25% → 100%) to the new version while watching error rates, latency p95, and business metrics. Rollback = route back to 0%. Pros: bad deploys hurt 1% of users, not 100%. You see real user impact before going wide. Cons: more orchestration, need solid metrics + alerts, schema changes get tricky because both versions read/write the same DB.\n\nIn practice we combine them. Production uses canary as the default. Blue-green is reserved for big, hard-to-canary changes - database migrations behind a flag, framework upgrades, kernel updates.\n\nThings interviewers love to hear:\n1. Always pair with feature flags so you can decouple deploy from release.\n2. Rollback must be tested in staging - most outages happen because rollback was never rehearsed.\n3. For stateful services, canary at the read path is easy; the write path needs backward/forward-compatible schemas (expand-migrate-contract).\n4. Observability is the prerequisite - if you can't compare error rates per version in under 30s, canary is theatre.",
    answerVi:
      "Blue-green: chạy 2 môi trường production giống hệt. 'Blue' đang live; 'green' là phiên bản mới đã warmup và test. Load balancer chuyển 100% traffic từ blue sang green tức thì. Rollback = chuyển lại. Lợi: cutover ngay, rollback cực đơn giản. Hại: 2x chi phí hạ tầng lúc deploy, không bắt được lỗi chỉ xuất hiện dưới traffic mix thật.\n\nCanary: route 1 % nhỏ traffic (1% → 5% → 25% → 100%) sang version mới trong khi theo dõi error rate, latency p95, và metric business. Rollback = route về 0%. Lợi: deploy hỏng chỉ ảnh hưởng 1% user. Thấy được tác động thật trước khi mở rộng. Hại: orchestration phức tạp hơn, cần metric + alert tốt, schema thay đổi khó vì cả 2 version đọc/ghi cùng DB.\n\nThực tế chúng tôi kết hợp. Production mặc định canary. Blue-green dành cho thay đổi lớn, khó canary - migration DB sau feature flag, upgrade framework, update kernel.\n\nĐiểm interviewer thích nghe:\n1. Luôn ghép feature flag để tách deploy khỏi release.\n2. Rollback phải được test ở staging - phần lớn outage xảy ra vì rollback chưa từng tập dượt.\n3. Service có state: canary đường read dễ; đường write cần schema backward/forward-compatible (expand-migrate-contract).\n4. Observability là tiền đề - không so sánh được error rate giữa 2 version trong < 30s thì canary là 'kịch'.",
    keyPoints: [
      "Define each clearly and contrast cost vs risk",
      "Combine in practice: canary default, blue-green for big changes",
      "Always pair with feature flags",
      "Rollback must be tested, not just designed",
      "Observability is the precondition for canary",
    ],
    keyPointsVi: [
      "Định nghĩa rõ và so chi phí vs rủi ro",
      "Thực tế kết hợp: canary mặc định, blue-green cho thay đổi lớn",
      "Luôn ghép feature flag",
      "Rollback phải được test, không chỉ thiết kế",
      "Observability là tiền đề của canary",
    ],
  },
  {
    category: "DevOps",
    q: "How do you secure a CI/CD pipeline?",
    qVi: "Bảo mật CI/CD pipeline như thế nào?",
    hint: "Secrets manager, OIDC, signed artifacts, SBOM, dependency scan, least privilege.",
    hintVi: "Secrets manager, OIDC, signed artifact, SBOM, scan dependency, least privilege.",
    answer:
      "I think about it in five layers:\n\n1. Identity. Replace long-lived cloud keys in CI variables with OIDC federation (GitHub Actions → AWS/GCP). The runner gets a short-lived token (15 min) scoped to one role for one repo. This single change kills the most common breach vector - leaked PAT/access keys in logs.\n\n2. Secrets. Use a real secrets manager (Vault, AWS Secrets Manager, Doppler). Never echo secrets in logs; CI providers redact known patterns but not new ones. Rotate automatically. Treat .env in repo as a P0 incident.\n\n3. Supply chain. Pin dependencies to checksums (npm ci, requirements.txt + hash, go.sum). Run dependency scan (Dependabot / Snyk / Trivy) on every PR. Generate an SBOM (CycloneDX or SPDX) on each build and store it with the artifact. Sign artifacts with Sigstore / cosign so deploy can verify provenance.\n\n4. Runners. Self-hosted runners are an attack surface - sandbox them (ephemeral VMs that are destroyed after each job), never share between trusted and untrusted code (forks shouldn't run on the same runner as main). Restrict outbound network egress.\n\n5. Pipeline-as-code review. Treat workflow YAML like production code: required reviews, branch protection, no auto-merge for changes to .github/workflows, and an allowlist of approved actions (no random third-party action@main pulls).\n\nBonus that impresses senior interviewers: SLSA level 3 as the target, build provenance attestations, and a 'break-glass' deploy procedure that bypasses CI but is audited.",
    answerVi:
      "Tôi nghĩ theo 5 tầng:\n\n1. Identity. Thay key cloud sống lâu trong CI bằng OIDC federation (GitHub Actions → AWS/GCP). Runner nhận token ngắn hạn (15 phút) scope cho 1 role 1 repo. Riêng thay đổi này diệt vector breach phổ biến nhất - PAT/access key rò trong log.\n\n2. Secrets. Dùng secrets manager thật (Vault, AWS Secrets Manager, Doppler). Không bao giờ echo secret vào log; CI redact pattern đã biết, không redact pattern mới. Rotate tự động. Coi .env trong repo là sự cố P0.\n\n3. Supply chain. Pin dependency theo checksum (npm ci, requirements.txt + hash, go.sum). Quét dependency (Dependabot / Snyk / Trivy) mỗi PR. Sinh SBOM (CycloneDX hoặc SPDX) mỗi build và lưu cùng artifact. Sign artifact bằng Sigstore / cosign để deploy verify được nguồn gốc.\n\n4. Runner. Self-hosted runner là attack surface - sandbox (VM ephemeral huỷ sau mỗi job), không dùng chung giữa code tin cậy và không tin cậy (fork không được chạy chung runner với main). Hạn chế network egress.\n\n5. Pipeline-as-code review. Coi workflow YAML như code production: required review, branch protection, không auto-merge cho thay đổi .github/workflows, và allowlist action đã duyệt (không pull third-party action@main bừa).\n\nBonus gây ấn tượng interviewer senior: nhắm SLSA level 3, attestation build provenance, và quy trình deploy 'break-glass' bỏ qua CI nhưng có audit.",
    keyPoints: [
      "OIDC federation > static cloud keys - say this first",
      "Treat workflow YAML as production code",
      "SBOM + signed artifacts for supply-chain integrity",
      "Sandbox self-hosted runners, especially with forks",
      "Mention SLSA / break-glass to show maturity",
    ],
    keyPointsVi: [
      "OIDC federation > key cloud tĩnh - nói đầu tiên",
      "Coi workflow YAML như code production",
      "SBOM + artifact đã ký để bảo toàn supply chain",
      "Sandbox self-hosted runner, đặc biệt với fork",
      "Nhắc SLSA / break-glass để thể hiện sự trưởng thành",
    ],
  },
  {
    category: "DevOps",
    q: "Describe Kubernetes pod, deployment and service.",
    qVi: "Mô tả pod, deployment và service trong Kubernetes.",
    hint: "Pod = smallest unit; Deployment = desired state controller; Service = stable networking.",
    hintVi: "Pod = đơn vị nhỏ nhất; Deployment = controller trạng thái mong muốn; Service = network ổn định.",
    answer:
      "Pod: the smallest schedulable unit. One pod = one or more containers that share network and storage namespaces. Containers in the same pod can reach each other on localhost. Pods are mortal - they get killed, rescheduled, and IPs change. You almost never create pods directly in production.\n\nDeployment: a controller that says 'I want N replicas of this pod template, always'. If a pod dies, the Deployment creates a new one. If you update the image, it does a rolling update - spin up new pods, drain old ones, respecting maxSurge and maxUnavailable. Rollback is one command (kubectl rollout undo) because every revision is stored.\n\nService: a stable virtual IP + DNS name in front of a moving set of pods, selected by label. Without a Service, clients would need to track ever-changing pod IPs. Types worth knowing: ClusterIP (default, internal), NodePort (exposed on every node), LoadBalancer (cloud LB in front), Headless (no virtual IP - used for stateful sets where each pod needs its own address).\n\nHow they fit: you write a Deployment YAML, kubectl apply creates a ReplicaSet which creates Pods. A Service with matching labels gives the app a name like orders.default.svc.cluster.local. Other apps call that name; kube-proxy on each node routes to a healthy pod.\n\nThings to mention to look senior: readiness vs liveness probes (readiness gates traffic; liveness restarts the pod), PodDisruptionBudgets so cluster maintenance doesn't kill availability, and HorizontalPodAutoscaler for traffic-driven scaling. For stateful workloads use StatefulSet (stable identity + ordered rollout), not Deployment.",
    answerVi:
      "Pod: đơn vị schedulable nhỏ nhất. 1 pod = 1 hoặc nhiều container chung network và storage namespace. Container cùng pod gọi nhau qua localhost. Pod là 'mortal' - bị kill, reschedule, IP đổi. Hiếm khi tạo pod trực tiếp trong production.\n\nDeployment: controller nói 'tôi muốn N replica của pod template này, luôn luôn'. Pod chết thì Deployment tạo pod mới. Update image thì rolling update - tạo pod mới, drain pod cũ, tuân theo maxSurge và maxUnavailable. Rollback 1 lệnh (kubectl rollout undo) vì mọi revision đều được lưu.\n\nService: virtual IP + tên DNS ổn định đứng trước tập pod luôn thay đổi, chọn theo label. Không có Service thì client phải tự theo dõi IP pod đổi liên tục. Các loại đáng biết: ClusterIP (mặc định, nội bộ), NodePort (mở trên mọi node), LoadBalancer (LB cloud đứng trước), Headless (không virtual IP - dùng cho stateful set cần địa chỉ riêng cho mỗi pod).\n\nGhép lại: bạn viết Deployment YAML, kubectl apply tạo ReplicaSet → tạo Pod. Service có label khớp đặt cho app tên như orders.default.svc.cluster.local. App khác gọi tên đó; kube-proxy ở mỗi node route tới pod healthy.\n\nĐiểm nên nhắc cho 'có vẻ senior': readiness vs liveness probe (readiness gate traffic; liveness restart pod), PodDisruptionBudget để maintenance cluster không giết availability, và HorizontalPodAutoscaler để scale theo traffic. Workload stateful dùng StatefulSet (identity ổn định + rollout có thứ tự), không phải Deployment.",
    keyPoints: [
      "Pod is mortal - never address it by IP",
      "Deployment is a desired-state controller with rolling update + rollback",
      "Service decouples clients from pod churn",
      "Know the Service types and when to pick each",
      "Mention probes, PDB, HPA, StatefulSet to look senior",
    ],
    keyPointsVi: [
      "Pod là mortal - không gọi theo IP",
      "Deployment là controller trạng thái mong muốn với rolling update + rollback",
      "Service tách client khỏi sự xáo trộn của pod",
      "Biết các loại Service và khi nào chọn loại nào",
      "Nhắc probe, PDB, HPA, StatefulSet để thể hiện senior",
    ],
  },
  {
    category: "DevOps",
    q: "Explain immutable infrastructure.",
    qVi: "Giải thích immutable infrastructure.",
    hint: "Servers replaced, never patched in place. Reduces config drift.",
    hintVi: "Server thay mới, không patch tại chỗ. Giảm config drift.",
    answer:
      "Definition: once a server (or container, or VM image) is deployed, you never SSH in to change it. To update, you build a new image and replace the old instance.\n\nWhy: the alternative is mutable infrastructure where engineers tweak boxes over time. Three boxes that started identical drift apart - package versions, files in /etc, leftover debug tools. After a year nobody can answer 'why does box 7 behave differently?'. Disaster recovery becomes guesswork.\n\nWith immutable infra, the only source of truth is the image build pipeline. Boxes are cattle, not pets. Three big wins:\n1. Reproducibility - staging and prod run identical bytes.\n2. Rollback - just point traffic at the previous image (golden AMI, container tag).\n3. Security - patching = redeploy, so 'critical CVE in OS' becomes a 30-minute pipeline run, not a 2-week change-management ticket.\n\nHow you actually achieve it: build images with Packer or Docker, version them, and deploy with Terraform / Kubernetes / ASG-with-launch-templates. Pair with infrastructure-as-code so the surrounding network, IAM and DBs are also reproducible. Logs and metrics MUST be shipped off-box (because the box will be destroyed).\n\nTrade-offs to mention: stateful data (databases, persistent volumes) can't be immutable - separate them and treat them as a different lifecycle. Boot time matters - if your AMI takes 8 minutes to come up, auto-scaling lags traffic; bake more into the image to shorten it.",
    answerVi:
      "Định nghĩa: server (hoặc container, VM image) một khi đã deploy thì không bao giờ SSH vào sửa. Để update, build image mới và thay instance cũ.\n\nVì sao: phương án ngược là mutable infrastructure, kỹ sư chỉnh box theo thời gian. 3 box giống nhau ban đầu drift xa nhau - version package, file trong /etc, công cụ debug bỏ lại. Sau 1 năm không ai trả lời được 'sao box 7 chạy khác?'. Disaster recovery thành đoán mò.\n\nVới immutable, source of truth duy nhất là pipeline build image. Box là 'cattle' không phải 'pet'. 3 lợi ích lớn:\n1. Tái lập - staging và prod chạy đúng cùng byte.\n2. Rollback - chỉ cần trỏ traffic về image trước (golden AMI, container tag).\n3. Bảo mật - patching = redeploy, nên 'CVE OS critical' thành 30 phút pipeline, không phải ticket change-management 2 tuần.\n\nLàm thế nào: build image bằng Packer hoặc Docker, version chúng, deploy bằng Terraform / Kubernetes / ASG with launch template. Ghép với infrastructure-as-code để network, IAM, DB xung quanh cũng tái lập được. Log và metric BẮT BUỘC ship ra ngoài box (vì box sẽ bị huỷ).\n\nTrade-off cần nhắc: data có state (DB, persistent volume) không thể immutable - tách riêng và xử lý lifecycle khác. Thời gian boot quan trọng - AMI 8 phút mới up thì auto-scale trễ traffic; bake nhiều thứ vào image hơn để rút ngắn.",
    keyPoints: [
      "Define it as 'no SSH-and-fix' - concrete behaviour",
      "Contrast with mutable infra's drift problem",
      "Highlight the three wins: reproducibility, rollback, security",
      "Acknowledge stateful data is the exception",
      "Mention boot-time and IaC pairing",
    ],
    keyPointsVi: [
      "Định nghĩa là 'không SSH vào sửa' - hành vi cụ thể",
      "So với vấn đề drift của mutable infra",
      "Nhấn 3 lợi ích: tái lập, rollback, bảo mật",
      "Thừa nhận data có state là ngoại lệ",
      "Nhắc thời gian boot và ghép với IaC",
    ],
  },
  {
    category: "DevOps",
    q: "What's GitOps and why use it?",
    qVi: "GitOps là gì và vì sao nên dùng?",
    hint: "Git as the single source of truth; ArgoCD/Flux continuously reconciles cluster state.",
    hintVi: "Git là source of truth duy nhất; ArgoCD/Flux liên tục đồng bộ trạng thái cluster.",
    answer:
      "GitOps means the desired state of your infrastructure (Kubernetes manifests, Helm values, Terraform) lives in Git, and an agent inside the cluster continuously pulls and applies it. The cluster always converges to what Git says.\n\nThe shift from CI/CD-push: in traditional CD, your pipeline runs kubectl apply with admin credentials. In GitOps, the pipeline only writes to Git; ArgoCD or Flux inside the cluster does the apply. No external system needs cluster-admin credentials, which is a huge security win.\n\nFour reasons teams adopt it:\n1. Auditability - every prod change is a git commit with author, diff, and PR review.\n2. Rollback - git revert. The agent reconciles within minutes.\n3. Drift detection - if someone kubectl edits a resource directly, the agent reverts it (or alerts), so the cluster can't silently diverge from Git.\n4. Multi-cluster scale - each cluster pulls from its own folder; you can promote a change from staging to prod just by merging a PR.\n\nCommon pitfalls to mention: secrets in Git are a no-go - use Sealed Secrets, SOPS, or External Secrets Operator pulling from Vault. Application code repos vs config repos should usually be separate so a code rebuild doesn't trigger a config redeploy. And GitOps reconciliation is eventual - if you need synchronous responses, the CI pipeline still has to wait for ArgoCD to mark the app healthy.\n\nReal-world stack: ArgoCD or FluxCD for K8s, Atlantis for Terraform, plus Kustomize/Helm for templating.",
    answerVi:
      "GitOps nghĩa là trạng thái mong muốn của hạ tầng (manifest Kubernetes, Helm values, Terraform) nằm trong Git, và 1 agent trong cluster liên tục pull và apply. Cluster luôn hội tụ về thứ Git nói.\n\nKhác CI/CD-push truyền thống: pipeline truyền thống chạy kubectl apply với quyền admin. Trong GitOps, pipeline chỉ ghi vào Git; ArgoCD hoặc Flux trong cluster mới apply. Không hệ thống ngoài nào cần quyền cluster-admin - lợi ích bảo mật cực lớn.\n\n4 lý do team áp dụng:\n1. Auditability - mọi thay đổi prod là 1 git commit có author, diff, PR review.\n2. Rollback - git revert. Agent đồng bộ trong vài phút.\n3. Drift detection - ai đó kubectl edit trực tiếp thì agent revert (hoặc cảnh báo), cluster không thể lệch khỏi Git ngầm.\n4. Multi-cluster - mỗi cluster pull từ folder riêng; promote thay đổi staging → prod chỉ bằng merge PR.\n\nBẫy thường gặp: secret trong Git là KHÔNG - dùng Sealed Secrets, SOPS, hoặc External Secrets Operator kéo từ Vault. Repo code app vs repo config nên tách để rebuild code không trigger redeploy config. Và GitOps reconcile là eventual - cần response đồng bộ thì pipeline CI vẫn phải chờ ArgoCD báo app healthy.\n\nStack thực tế: ArgoCD hoặc FluxCD cho K8s, Atlantis cho Terraform, kèm Kustomize/Helm để templating.",
    keyPoints: [
      "Highlight the pull model and why it's safer",
      "Auditability + drift detection are the two killer features",
      "Address secrets early (Sealed Secrets / SOPS)",
      "Separate code repo from config repo",
      "Note eventual nature of reconciliation",
    ],
    keyPointsVi: [
      "Nhấn mô hình pull và vì sao an toàn hơn",
      "Auditability + drift detection là 2 tính năng sát thủ",
      "Đề cập secret sớm (Sealed Secrets / SOPS)",
      "Tách repo code khỏi repo config",
      "Nêu tính eventual của reconcile",
    ],
  },

  // ============== SOFT SKILLS ==============
  {
    category: "Soft Skills",
    q: "How do you mentor a junior engineer?",
    qVi: "Bạn mentor 1 junior engineer thế nào?",
    hint: "Pair programming, weekly 1:1, growth ladder, calibrated stretch tasks.",
    hintVi: "Pair programming, 1:1 hàng tuần, lộ trình growth, task stretch có cân nhắc.",
    answer:
      "I treat mentorship as a 90-day program, not a vibe.\n\nWeek 1-2: shadow + safety net. The junior pairs with me on real PRs. I narrate why I'm choosing approach A over B. They open small PRs (config tweaks, docs, tests) so they ship something on day 3 - early wins matter.\n\nWeek 3-8: calibrated stretch. I assign tasks one step above their current level, with a clear definition of done and a written 'what good looks like'. Weekly 1:1 (30 min) follows a fixed agenda: what shipped, what's blocked, what's scary, one piece of feedback both ways. The 'feedback to me' part is the most important - it teaches them upward communication.\n\nWeek 9-12: own a small project end to end. Design doc → review → implementation → rollout → postmortem. I review, but I don't drive. The first time they're in the room presenting to PM and design alone is the milestone.\n\nThings I avoid: answering questions instantly (I ask 'what have you tried? what would you do if I were on vacation?'), praising effort over outcome, and protecting them from real on-call. They need to feel the pager once with me sitting next to them.\n\nMy success metric is not 'are they happy with me'. It's 'in 6 months, can they unblock themselves on 80% of tasks and have they grown one level in our calibration framework?'. If yes, mentorship worked.",
    answerVi:
      "Tôi coi mentorship là chương trình 90 ngày, không phải 'vibe'.\n\nTuần 1-2: shadow + lưới an toàn. Junior pair với tôi trên PR thật. Tôi kể vì sao chọn cách A thay vì B. Em mở PR nhỏ (chỉnh config, doc, test) để ship được gì đó từ ngày 3 - win sớm rất quan trọng.\n\nTuần 3-8: stretch có cân nhắc. Tôi giao task trên level hiện tại 1 bước, có definition of done rõ và 1 'what good looks like' viết tay. 1:1 hàng tuần (30 phút) theo agenda cố định: tuần này ship gì, đang kẹt gì, đang sợ gì, 1 góp ý 2 chiều. Phần 'góp ý cho tôi' quan trọng nhất - dạy em giao tiếp lên cấp.\n\nTuần 9-12: làm chủ 1 dự án nhỏ end to end. Design doc → review → implement → rollout → postmortem. Tôi review, nhưng không drive. Lần đầu em vào phòng trình bày với PM và design 1 mình là cột mốc.\n\nĐiều tôi tránh: trả lời câu hỏi tức thì (tôi hỏi 'em đã thử gì? nếu anh đi nghỉ thì em làm gì?'), khen effort hơn outcome, và che em khỏi on-call thật. Em cần cảm được pager 1 lần với tôi ngồi bên.\n\nMetric thành công của tôi không phải 'em có vui với tôi không'. Mà là 'sau 6 tháng, em có tự gỡ block 80% task và có lên 1 level trong khung calibration không?'. Nếu có, mentorship hiệu quả.",
    keyPoints: [
      "Frame mentorship as a structured program with milestones",
      "Calibrated stretch tasks - slightly above current level",
      "Weekly 1:1 with feedback both directions",
      "Define success by their independence, not your popularity",
      "Don't shield them from real on-call",
    ],
    keyPointsVi: [
      "Khung mentorship như chương trình có cột mốc",
      "Task stretch có cân nhắc - trên level 1 bậc",
      "1:1 hàng tuần, feedback 2 chiều",
      "Đo thành công bằng sự độc lập của em, không phải bạn được yêu mến",
      "Không che em khỏi on-call thật",
    ],
  },
  {
    category: "Soft Skills",
    q: "How do you handle production incidents at 3 AM?",
    qVi: "Xử lý sự cố production lúc 3h sáng thế nào?",
    hint: "Detect → Mitigate → Communicate → Postmortem (blameless).",
    hintVi: "Phát hiện → giảm thiểu → giao tiếp → postmortem không đổ lỗi.",
    answer:
      "I follow a fixed playbook so 3am-me doesn't have to think.\n\n1. Acknowledge fast (<5 min). Ack the page so the rotation knows it's owned. Open the incident channel and pin the runbook.\n\n2. Mitigate before you diagnose. Goal #1 is stop the bleeding, not understand the bug. If a recent deploy looks suspicious - roll back. If a region is unhealthy - fail over. If a noisy tenant is hammering an endpoint - rate-limit them. Mitigation can be ugly; clean fixes come later.\n\n3. Communicate every 15 min. Even a 'still investigating, current hypothesis X' update beats silence. Customers and execs panic in the absence of information. Use a fixed template: scope, current impact, mitigation in progress, ETA for next update.\n\n4. Diagnose with data, not vibes. Open dashboards in this order: error rate by service → latency → deploy timeline → recent config changes → infrastructure events. The cause is almost always 'something changed' in the last 24h.\n\n5. Hand off cleanly. If it goes long, the next on-call gets a written summary, not a verbal one. I document timestamps, what we tried, and what we ruled out.\n\n6. Blameless postmortem within 48h. Focus on systems, not people. Every action item has an owner and a deadline. The deliverable that proves the postmortem worked is a guardrail - a test, an alert, a runbook change - that would prevent the next occurrence.\n\nThe biggest mistake I see is engineers trying to fix the root cause live at 3am. Mitigate first, learn later.",
    answerVi:
      "Tôi theo playbook cố định để 3h sáng không phải nghĩ.\n\n1. Ack nhanh (<5 phút). Ack page để rotation biết có người nhận. Mở channel sự cố, pin runbook.\n\n2. Mitigate trước khi chẩn đoán. Mục tiêu #1 là chặn máu, không phải hiểu bug. Deploy gần đây nghi ngờ - rollback. 1 region không khoẻ - failover. 1 tenant ồn đang đập endpoint - rate-limit. Mitigation có thể xấu xí; fix sạch để sau.\n\n3. Communicate mỗi 15 phút. Kể cả 'vẫn đang điều tra, giả thuyết hiện tại X' cũng hơn im lặng. Khách và sếp hoảng khi thiếu thông tin. Dùng template cố định: scope, ảnh hưởng hiện tại, mitigation đang chạy, ETA update kế tiếp.\n\n4. Chẩn đoán bằng dữ liệu, không cảm tính. Mở dashboard theo thứ tự: error rate theo service → latency → timeline deploy → thay đổi config gần đây → sự kiện hạ tầng. Nguyên nhân gần như luôn là 'có thứ vừa thay đổi' trong 24h qua.\n\n5. Hand off sạch sẽ. Sự cố kéo dài thì on-call kế tiếp nhận tóm tắt viết, không phải nói. Tôi ghi timestamp, đã thử gì, đã loại trừ gì.\n\n6. Postmortem blameless trong 48h. Tập trung vào hệ thống, không phải con người. Mọi action item có owner và deadline. Sản phẩm chứng minh postmortem hiệu quả là 1 guardrail - test, alert, sửa runbook - sẽ ngăn lần sau.\n\nSai lầm lớn nhất tôi thấy: kỹ sư cố fix root cause live lúc 3h sáng. Mitigate trước, học sau.",
    keyPoints: [
      "Mitigate before you diagnose - say it explicitly",
      "Comms cadence (every 15 min) with a fixed template",
      "Dashboards have a checklist order - not random clicking",
      "Hand-offs are written, not verbal",
      "Postmortem must produce a guardrail, not just a doc",
    ],
    keyPointsVi: [
      "Mitigate trước chẩn đoán - nói rõ",
      "Cadence giao tiếp (mỗi 15 phút) theo template cố định",
      "Mở dashboard có thứ tự checklist - không bấm bừa",
      "Hand-off viết, không nói",
      "Postmortem phải sinh ra guardrail, không chỉ là doc",
    ],
  },
  {
    category: "Soft Skills",
    q: "How do you prioritize features when deadlines slip?",
    qVi: "Khi deadline sát, ưu tiên feature thế nào?",
    hint: "Use a real framework (RICE / MoSCoW). Communicate trade-offs in writing.",
    hintVi: "Dùng framework thật (RICE / MoSCoW). Truyền đạt trade-off bằng văn bản.",
    answer:
      "Step 1: stop the cargo culting. 'Ship it all faster' isn't a plan. I run a 30-minute triage with PM, design and tech lead.\n\nStep 2: score every remaining item with RICE - Reach × Impact × Confidence ÷ Effort. RICE forces honest conversation because Confidence (0.5-1.0) makes the team admit when they're guessing. Anything below the cutoff line gets moved to v1.1, explicitly, with a date.\n\nStep 3: MoSCoW the survivors - Must / Should / Could / Won't. 'Must' is what defines the launch (without it, we don't ship). 'Should' goes if a Must takes longer. 'Could' is a stretch goal. 'Won't' is the most important column - it tells the team what we are deliberately not doing, which kills scope creep mid-sprint.\n\nStep 4: write the trade-off memo. One page, three sections: what we're shipping, what we're cutting and why, what we're risking by cutting it. Send it to the broader team and to leadership. People accept cuts they were told about; they revolt against cuts they discovered in the release notes.\n\nStep 5: protect the team. Add a 20% buffer for unknowns - the deadline didn't slip because engineers were lazy; it slipped because something was underestimated. New scope from this point requires a formal swap (cut something Must-tier of equal size).\n\nWhat I won't do: make engineers work weekends. That's a tax on the next quarter's velocity and on retention. The deadline is a promise we made; it's not worth a resignation.",
    answerVi:
      "Bước 1: bỏ cargo cult. 'Ship tất cả nhanh hơn' không phải kế hoạch. Tôi tổ chức triage 30 phút với PM, design, tech lead.\n\nBước 2: chấm RICE cho mọi item còn lại - Reach × Impact × Confidence ÷ Effort. RICE ép đối thoại trung thực vì Confidence (0.5-1.0) bắt team thừa nhận khi đang đoán. Dưới đường cắt thì đẩy sang v1.1, rõ ràng, có ngày.\n\nBước 3: MoSCoW phần còn lại - Must / Should / Could / Won't. 'Must' là thứ định nghĩa launch (không có là không ship). 'Should' bỏ nếu Must mất nhiều hơn. 'Could' là stretch. 'Won't' là cột quan trọng nhất - nói cho team biết ta CỐ Ý không làm gì, giết scope creep giữa sprint.\n\nBước 4: viết memo trade-off. 1 trang, 3 phần: ta ship gì, ta cắt gì và vì sao, ta rủi ro gì khi cắt. Gửi cho team rộng và leadership. Người ta chấp nhận cắt khi được báo; phản đối khi phát hiện trong release note.\n\nBước 5: bảo vệ team. Thêm buffer 20% cho unknown - deadline không trễ vì kỹ sư lười, trễ vì cái gì đó bị estimate thấp. Scope mới từ điểm này yêu cầu swap chính thức (cắt cái Must khác cùng size).\n\nĐiều tôi không làm: bắt kỹ sư cày cuối tuần. Đó là thuế đặt lên velocity quý sau và retention. Deadline là lời hứa; không đáng đổi 1 lá đơn nghỉ.",
    keyPoints: [
      "Use a real framework (RICE + MoSCoW), not gut feeling",
      "The 'Won't' column is what stops scope creep",
      "Write the trade-off memo - surprise cuts cause backlash",
      "Protect the team from weekend overtime",
      "Treat new scope as a swap, not an addition",
    ],
    keyPointsVi: [
      "Dùng framework thật (RICE + MoSCoW), không cảm tính",
      "Cột 'Won't' là thứ chặn scope creep",
      "Viết memo trade-off - cắt bất ngờ gây phản ứng",
      "Bảo vệ team khỏi tăng ca cuối tuần",
      "Scope mới là swap, không phải cộng thêm",
    ],
  },
  {
    category: "Soft Skills",
    q: "Describe a conflict you resolved with a non-technical stakeholder.",
    qVi: "Mô tả 1 mâu thuẫn bạn giải quyết với stakeholder không kỹ thuật.",
    hint: "Translate jargon into business outcomes. Find the shared goal.",
    hintVi: "Dịch thuật ngữ thành kết quả kinh doanh. Tìm mục tiêu chung.",
    answer:
      "(Situation) Marketing wanted to add five tracking scripts to our landing page two days before a campaign launch. Engineering pushed back because page load was already at 3.2s and Core Web Vitals were borderline.\n\n(Task) I was the engineer in the room. The Marketing Director and I started in opposite corners - she heard 'engineering is blocking the launch', I heard 'marketing doesn't care about quality'. Both wrong.\n\n(Action) I stopped talking about JavaScript and started talking about money. I pulled our analytics and showed her: 'Every 1 second of extra load time costs us 7% conversion. Five scripts add ~1.8s. The campaign expects 200k visitors. We'd be paying for traffic we won't convert - about EUR 24k of waste.' Same fact, her language.\n\nThen I asked her real question: 'What signals do you actually need from this campaign?' Turned out she needed two scripts (attribution + retargeting), not five. The other three were 'nice-to-haves' nobody had questioned. I proposed loading those two via our server-side tag manager so they wouldn't block render.\n\n(Result) We shipped on time. Page load went up by only 180ms. Campaign hit conversion targets. More importantly, Marketing started looping engineering in at the planning stage, not the launch stage. Six months later we co-wrote a 'page performance budget' policy.\n\nMy takeaway: conflicts with non-technical stakeholders almost always disappear when you stop defending your craft and start serving their actual goal.",
    answerVi:
      "(Situation) Marketing muốn thêm 5 tracking script vào landing page 2 ngày trước khi launch chiến dịch. Engineering phản đối vì page load đã 3.2s, Core Web Vitals đang ngấp nghé.\n\n(Task) Tôi là kỹ sư trong phòng. Giám đốc Marketing và tôi bắt đầu ở 2 góc đối lập - chị nghe 'engineering chặn launch', tôi nghe 'marketing không quan tâm chất lượng'. Cả 2 đều sai.\n\n(Action) Tôi ngừng nói về JavaScript và bắt đầu nói về tiền. Tôi mở analytics và cho chị xem: 'Mỗi 1 giây load thêm mất 7% conversion. 5 script thêm ~1.8s. Campaign này dự kiến 200k visitor. Chúng ta sẽ trả tiền cho traffic không chuyển đổi - khoảng 24k EUR lãng phí.' Cùng sự thật, ngôn ngữ của chị.\n\nRồi tôi hỏi câu hỏi thật: 'Chị thật sự cần tín hiệu gì từ chiến dịch này?' Hoá ra chị cần 2 script (attribution + retargeting), không phải 5. 3 cái còn lại là 'nice-to-have' chưa ai chất vấn. Tôi đề xuất load 2 cái đó qua server-side tag manager để không block render.\n\n(Result) Ship đúng hạn. Page load chỉ tăng 180ms. Campaign đạt mục tiêu conversion. Quan trọng hơn, Marketing bắt đầu kéo engineering vào từ giai đoạn lập kế hoạch, không phải lúc launch. 6 tháng sau, chúng tôi đồng viết chính sách 'page performance budget'.\n\nBài học: mâu thuẫn với stakeholder không kỹ thuật gần như luôn tan khi bạn ngừng bảo vệ chuyên môn và bắt đầu phục vụ mục tiêu thật của họ.",
    keyPoints: [
      "Translate technical numbers into money / customers",
      "Ask their underlying goal, not just react to their request",
      "Propose a third option both sides can accept",
      "Turn the resolution into a process change (perf budget)",
      "End with a humanizing lesson, not just the win",
    ],
    keyPointsVi: [
      "Dịch số kỹ thuật thành tiền / khách",
      "Hỏi mục tiêu sâu, không phản ứng với yêu cầu bề mặt",
      "Đề xuất phương án thứ 3 cả 2 bên chấp nhận",
      "Biến giải pháp thành thay đổi quy trình (perf budget)",
      "Kết bằng bài học có chất người, không chỉ là chiến thắng",
    ],
  },
  {
    category: "Soft Skills",
    q: "How do you stay updated on engineering trends in 2026?",
    qVi: "Bạn cập nhật xu hướng kỹ thuật 2026 thế nào?",
    hint: "Mix of curated reading, open source, conferences, and AI-assisted distillation.",
    hintVi: "Trộn đọc curated, OSS, hội thảo, và AI hỗ trợ tóm lược.",
    answer:
      "I treat it as a learning system, not a feed. Three layers:\n\n1. Daily (15 min). I read a curated set, not the firehose. Pragmatic Engineer, InfoQ summaries, the AWS / GCP / Cloudflare blogs, and one language-specific (Rust This Week, TypeScript Weekly). I use an AI summarizer to compress 30 articles into 5 paragraphs I actually finish.\n\n2. Weekly (1 hour). One deep-dive on a single topic - usually a paper, a postmortem, or a long-form blog (Netflix tech, Discord engineering, Cloudflare's 'how we did X'). I write a 5-bullet note in my own words. If I can't summarize it in 5 bullets, I didn't understand it.\n\n3. Quarterly (project). I build a small thing in a new technology. Reading about Rust didn't teach me Rust; writing a 400-line CLI did. This year that's been: writing a Postgres extension in Rust, fine-tuning a small LLM with LoRA, and building a TypeScript framework benchmark.\n\nOpen source contribution is the multiplier on top of all three. One real PR to a project I depend on teaches me more than 50 blog posts about it.\n\nWhat I deliberately avoid: Twitter/X drama threads, 'top 10 frameworks of 2026' clickbait, and conference keynotes I haven't already chosen to attend. The signal-to-noise on those is terrible.\n\nThe meta-trend I'm following in 2026 is AI-native engineering - agents in the dev loop, embeddings in production search, eval frameworks for LLM features. Not because it's hyped, but because it's reshaping how systems are built end to end.",
    answerVi:
      "Tôi coi việc cập nhật là 1 hệ thống học, không phải feed. 3 tầng:\n\n1. Hàng ngày (15 phút). Đọc set đã curate, không phải firehose. Pragmatic Engineer, tóm tắt InfoQ, blog AWS / GCP / Cloudflare, và 1 cái theo ngôn ngữ (Rust This Week, TypeScript Weekly). Tôi dùng AI tóm tắt để nén 30 bài thành 5 đoạn thực sự đọc hết.\n\n2. Hàng tuần (1 tiếng). 1 deep-dive 1 chủ đề - thường là paper, postmortem, hoặc long-form blog (Netflix tech, Discord engineering, 'how we did X' của Cloudflare). Tôi viết note 5 gạch đầu dòng bằng chữ của mình. Không tóm tắt được 5 dòng = chưa hiểu.\n\n3. Hàng quý (dự án). Tôi build 1 thứ nhỏ bằng công nghệ mới. Đọc về Rust không dạy tôi Rust; viết CLI 400 dòng mới dạy. Năm nay: viết extension Postgres bằng Rust, fine-tune LLM nhỏ với LoRA, và benchmark framework TypeScript.\n\nĐóng góp open source là 'nhân' của cả 3 tầng. 1 PR thật vào project tôi đang dùng dạy hơn 50 bài blog về nó.\n\nĐiều tôi cố tránh: thread drama Twitter/X, clickbait 'top 10 framework 2026', và keynote hội thảo tôi không chủ động chọn đi. Tín hiệu/nhiễu tệ.\n\nMeta-trend tôi theo dõi 2026 là AI-native engineering - agent trong dev loop, embedding trong search production, framework eval cho tính năng LLM. Không vì hype, mà vì nó đang định hình lại cách hệ thống được xây từ đầu đến cuối.",
    keyPoints: [
      "Frame learning as a system with cadences, not a feed",
      "Daily curated reading + weekly deep-dive + quarterly hands-on project",
      "Open source contribution is the highest-leverage learning",
      "Explicitly reject low-signal sources",
      "Name one substantive meta-trend you're tracking",
    ],
    keyPointsVi: [
      "Coi học là 1 hệ thống có nhịp, không phải feed",
      "Đọc curated hàng ngày + deep-dive hàng tuần + dự án hàng quý",
      "Đóng góp OSS là kênh học đòn bẩy nhất",
      "Loại rõ ràng nguồn nhiễu thấp",
      "Nêu 1 meta-trend có chiều sâu đang theo dõi",
    ],
  },
];

const CATEGORIES = ["All", "Behavioral", "System Design", "Coding", "DevOps", "Soft Skills"] as const;

const SoftwareEngInterview = () => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = filter === "All" ? QUESTIONS : QUESTIONS.filter((q) => q.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Link
          to="/programming/software-eng"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("Quay lại Software Engineering", "Back to Software Engineering")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-blue-700 flex items-center justify-center text-white">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                {t("Bộ 30 câu phỏng vấn Software Engineer", "30 Software Engineering Interview Questions")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Câu hỏi thực tế · Trả lời mẫu dài, có số liệu · STAR · 2026",
                  "Real questions · Detailed sample answers with numbers · STAR · 2026"
                )}
              </p>
            </div>
          </div>

          {/* STAR explainer */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-4 flex gap-3">
            <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">{t("Phương pháp STAR", "The STAR Method")}</p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>S</strong>ituation · <strong>T</strong>ask · <strong>A</strong>ction · <strong>R</strong>esult -{" "}
                {t(
                  "khung trả lời câu hỏi behavioral hiệu quả nhất. Mỗi câu nên có số liệu cụ thể (ví dụ: 'giảm latency 40% từ 800ms xuống 480ms'). Mỗi câu hỏi bên dưới có phần Hint ngắn, Câu trả lời mẫu dài và Ý chính cần nhớ.",
                  "the most effective frame for behavioral questions. Always include concrete numbers (e.g. 'cut latency 40% from 800ms to 480ms'). Each question below has a short Hint, a long Sample answer, and the Key points to remember."
                )}
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-2">
            {filtered.map((q, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0 mt-0.5">
                        {q.category}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {t(q.qVi, q.q)}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-4 pb-4 border-t border-border pt-4 space-y-4"
                    >
                      {/* Hint */}
                      <div className="rounded-lg bg-amber-500/8 border border-amber-500/20 p-3">
                        <div className="flex items-center gap-2 mb-1 text-amber-600 dark:text-amber-400">
                          <Lightbulb className="w-4 h-4" />
                          <p className="font-semibold text-xs uppercase tracking-wide">
                            {t("Hint nhanh", "Quick hint")}
                          </p>
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed">
                          {t(q.hintVi, q.hint)}
                        </p>
                      </div>

                      {/* Sample answer */}
                      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                          <MessageSquare className="w-4 h-4" />
                          <p className="font-semibold text-xs uppercase tracking-wide">
                            {t("Câu trả lời mẫu (chi tiết)", "Sample answer (detailed)")}
                          </p>
                        </div>
                        <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans">
                          {t(q.answerVi, q.answer)}
                        </div>
                      </div>

                      {/* Key points */}
                      <div className="rounded-lg bg-emerald-500/8 border border-emerald-500/20 p-3">
                        <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400">
                          <ListChecks className="w-4 h-4" />
                          <p className="font-semibold text-xs uppercase tracking-wide">
                            {t("Ý chính cần nhớ", "Key points to remember")}
                          </p>
                        </div>
                        <ul className="space-y-1.5">
                          {(lang === "vi" ? q.keyPointsVi : q.keyPoints).map((kp, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-foreground/85 leading-relaxed flex gap-2"
                            >
                              <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✓</span>
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SoftwareEngInterview;
