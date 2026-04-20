// Software Engineering curriculum — 7 industry-standard lessons (2026 trends)
// Author: HaiEduTech · Each lesson follows the 8-section bilingual format used across the curriculum
import type { ExtendedProgrammingModule } from "./types";

export const softwareEngModules: ExtendedProgrammingModule[] = [
  {
    id: "se-foundations",
    title: "Software Engineering",
    titleEn: "Software Engineering",
    icon: "⚙️",
    color: "from-slate-600 to-blue-700",
    description: "Quy trình & nguyên tắc của một kỹ sư phần mềm chuyên nghiệp năm 2026",
    descriptionEn: "Industry workflows & principles of a 2026 professional software engineer",
    course: "data-ai",
    lessons: [
      // ──────────────────────────── LESSON 1 ────────────────────────────
      {
        id: "se-sdlc",
        title: "Vòng đời phát triển phần mềm (SDLC)",
        titleEn: "Software Development Life Cycle (SDLC)",
        level: 1,
        difficulty: "beginner",
        codeLanguage: "markdown",
        theory: `## 1. 🚦 Vấn đề đời thường

Một startup hứa giao app trong 6 tháng. 6 tháng sau: code chạy nhưng **sai yêu cầu**, khách hàng không dùng. Vì sao? Vì team **không có quy trình** — viết code trước, hỏi sau. SDLC chính là "công thức nấu ăn" giúp đội 1 người hay 100 người cùng nhịp.

## 2. 💡 Khái niệm chính

**SDLC** = Software Development Life Cycle — chuỗi 6 giai đoạn: Requirement → Design → Implement → Test → Deploy → Maintain.

3 mô hình phổ biến nhất:

| Mô hình | Đặc điểm | Khi dùng |
|---|---|---|
| **Waterfall** | Tuần tự, không quay đầu | Dự án yêu cầu ổn định (ngân hàng, y tế) |
| **Agile** | Lặp ngắn 1-4 tuần, thích ứng | Sản phẩm thay đổi liên tục |
| **Scrum** | Khung Agile cụ thể: Sprint, Standup, Retro | Team 5-9 người |

## 3. 🧰 Vai trò trong Scrum

- **Product Owner** — quyết định "làm cái gì".
- **Scrum Master** — bảo vệ quy trình, gỡ blocker.
- **Dev Team** — quyết định "làm như thế nào".
- **Sprint** = chu kỳ 2 tuần giao 1 phần chạy được.

## 4. 🎯 Ví dụ thực tế

Team 10 dev xây app giao đồ ăn:

\`\`\`text
Sprint 1 (2 tuần): Đăng ký + Login
Sprint 2: Hiển thị menu + Giỏ hàng
Sprint 3: Thanh toán + Tracking
Sprint 4: Đánh giá + Khuyến mãi
\`\`\`

Mỗi cuối sprint → demo cho khách hàng → điều chỉnh. **Không bao giờ** code 6 tháng rồi mới hiện cho khách.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Agile = không có tài liệu" — sai. Agile **giảm** tài liệu thừa, không bỏ.
> - "Scrum = họp nhiều" — Daily Standup chỉ 15 phút.
> - "Waterfall đã chết" — vẫn dùng cho hệ thống tên lửa, máy bay.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - Mỗi user story phải có **acceptance criteria** rõ ràng ("Khi user bấm X, thấy Y").
> - **Definition of Done** = code + test + review + deploy staging.
> - Retrospective cuối sprint quan trọng hơn cả planning — nó là cách team **học**.
> - **2026 trend:** AI-augmented Scrum — dùng GitHub Copilot/Cursor để giảm 30-50% thời gian implement, dành thời gian cho review & design.

## 7. 🤔 Áp dụng

Khi bắt đầu 1 dự án, hỏi:
1. Yêu cầu có thay đổi không? → Agile/Scrum. Nếu cố định → Waterfall.
2. Team bao nhiêu người? → 5-9 → 1 Scrum team. >9 → SAFe/LeSS.
3. Sprint dài bao lâu? → Mặc định 2 tuần.

## 8. 📌 Tóm tắt 30 giây

SDLC là **công thức** giúp dự án không "đẻ non". Agile/Scrum là chuẩn 2026 cho hầu hết dự án. Waterfall vẫn sống ở lĩnh vực đời sống/an toàn.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

A startup promises to ship an app in 6 months. 6 months later: code works but **doesn't match requirements**, customers won't use it. Why? Because the team had **no process** — wrote code first, asked questions later. SDLC is the "recipe" that keeps a team of 1 or 100 in sync.

## 2. 💡 Core Concepts

**SDLC** = Software Development Life Cycle — six phases: Requirement → Design → Implement → Test → Deploy → Maintain.

The three most common models:

| Model | Trait | When to use |
|---|---|---|
| **Waterfall** | Sequential, no going back | Stable requirements (banking, medical) |
| **Agile** | Short 1-4 week iterations | Rapidly changing products |
| **Scrum** | Concrete Agile framework: Sprint, Standup, Retro | 5-9 person teams |

## 3. 🧰 Scrum Roles

- **Product Owner** — decides "what to build".
- **Scrum Master** — protects the process, removes blockers.
- **Dev Team** — decides "how to build it".
- **Sprint** = a 2-week cycle delivering one shippable increment.

## 4. 🎯 Real Example

A 10-dev team building a food delivery app:

\`\`\`text
Sprint 1 (2 weeks): Sign-up + Login
Sprint 2: Menu + Cart
Sprint 3: Payment + Order tracking
Sprint 4: Reviews + Promotions
\`\`\`

End of every sprint → demo to customer → adjust. **Never** code 6 months then reveal.

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Agile = no documentation" — wrong. Agile **reduces** wasteful docs, doesn't drop them.
> - "Scrum = endless meetings" — Daily Standup is only 15 minutes.
> - "Waterfall is dead" — still used for rockets, aircraft software.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Every user story needs **acceptance criteria** ("When user clicks X, sees Y").
> - **Definition of Done** = code + test + review + staging deploy.
> - End-of-sprint retrospectives matter more than planning — that's how a team **learns**.
> - **2026 trend:** AI-augmented Scrum — use GitHub Copilot/Cursor to cut implementation time 30-50%, reinvest in review & design.

## 7. 🤔 Apply

When starting a project, ask:
1. Will requirements change? → Agile/Scrum. If frozen → Waterfall.
2. Team size? → 5-9 → 1 Scrum team. >9 → SAFe/LeSS.
3. Sprint length? → Default 2 weeks.

## 8. 📌 30-Second Summary

SDLC is the **recipe** that prevents a stillborn project. Agile/Scrum is the 2026 default for most products. Waterfall still rules safety-critical systems.
`,
        code: `# SDLC Phase Tracker — minimal Scrum board in Python
sprint = {
    "name": "Sprint 3 — Payment",
    "duration_days": 14,
    "stories": [
        {"id": "PAY-1", "title": "Stripe integration", "status": "done"},
        {"id": "PAY-2", "title": "Refund flow",        "status": "in_progress"},
        {"id": "PAY-3", "title": "Email receipt",      "status": "todo"},
    ],
}

def velocity(sprint):
    done = sum(1 for s in sprint["stories"] if s["status"] == "done")
    return f"{done}/{len(sprint['stories'])} stories done"

print(f"📋 {sprint['name']}")
for s in sprint["stories"]:
    icon = {"done": "✅", "in_progress": "🔧", "todo": "⏳"}[s["status"]]
    print(f"  {icon} [{s['id']}] {s['title']}")
print(f"\\n🏁 Velocity: {velocity(sprint)}")`,
        exercise: "Mô tả lại 1 dự án bạn từng làm theo 6 giai đoạn SDLC. Giai đoạn nào bị bỏ qua? Hậu quả?",
        exerciseEn: "Describe a past project you worked on through the 6 SDLC phases. Which phase was skipped? What was the consequence?",
        quiz: [
          { question: "Sprint mặc định trong Scrum dài bao lâu?", options: ["1 ngày", "2 tuần", "2 tháng", "6 tháng"], answer: 1, explanation: "Sprint chuẩn dài 2 tuần — đủ ngắn để thích ứng, đủ dài để giao 1 tính năng có ý nghĩa." },
          { question: "Vai trò nào QUYẾT ĐỊNH sản phẩm sẽ làm gì?", options: ["Scrum Master", "Product Owner", "Tech Lead", "QA"], answer: 1, explanation: "Product Owner sở hữu Product Backlog và quyết định ưu tiên — 'làm cái gì'." },
          { question: "Mô hình nào phù hợp dự án có yêu cầu CỐ ĐỊNH (vd: phần mềm máy bay)?", options: ["Agile", "Scrum", "Waterfall", "Kanban"], answer: 2, explanation: "Waterfall tuần tự, có tài liệu chặt chẽ → phù hợp safety-critical systems nơi yêu cầu khó thay đổi." },
          { question: "Definition of Done KHÔNG bao gồm điều nào sau đây?", options: ["Code đã viết", "Đã test", "Đã review", "Đã có 1000 user"], answer: 3, explanation: "DoD là chuẩn nội bộ team: code + test + review + deploy staging — không phụ thuộc kết quả thị trường." },
          { question: "Daily Standup dài tối đa bao nhiêu phút?", options: ["5", "15", "30", "60"], answer: 1, explanation: "Standup chỉ 15 phút, mỗi người trả lời 3 câu: hôm qua làm gì, hôm nay làm gì, có blocker gì." }
        ]
      },
      // ──────────────────────────── LESSON 2 ────────────────────────────
      {
        id: "se-system-design",
        title: "Thiết kế hệ thống & Kiến trúc",
        titleEn: "System Design & Architecture",
        level: 2,
        difficulty: "intermediate",
        codeLanguage: "markdown",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn xây website bán hàng. Lúc đầu 100 user → 1 server đủ. 1 năm sau 1 triệu user → server sập mỗi tối thứ Bảy. Vì sao? Vì kiến trúc **monolith** không scale được phần "đặt hàng" mà không kéo theo cả hệ thống.

## 2. 💡 Hai kiến trúc chính

| Tiêu chí | Monolith | Microservices |
|---|---|---|
| **Cấu trúc** | 1 codebase, 1 deploy | Nhiều service nhỏ, deploy độc lập |
| **Phù hợp** | Team <20 người, MVP | Hệ thống lớn, team đa dạng |
| **Ưu** | Đơn giản, debug dễ | Scale từng phần, độc lập công nghệ |
| **Nhược** | Khó scale, deploy chậm | Phức tạp DevOps, network latency |
| **Ví dụ** | Shopify (vẫn monolith!) | Netflix, Uber, Amazon |

## 3. 🧰 UML tối thiểu cần biết

- **Use Case Diagram** — ai làm gì với hệ thống.
- **Class Diagram** — quan hệ giữa các đối tượng.
- **Sequence Diagram** — thứ tự gọi giữa service A → B → C.
- **Component Diagram** — bức tranh kiến trúc tổng.

## 4. 🎯 Ví dụ trực quan

\`\`\`mermaid
graph LR
  Client[📱 Mobile App] --> Gateway[🚪 API Gateway]
  Gateway --> Auth[🔐 Auth Service]
  Gateway --> Order[🛒 Order Service]
  Gateway --> Payment[💳 Payment Service]
  Order --> DB1[(Order DB)]
  Payment --> DB2[(Payment DB)]
  Order -. event .-> Notify[📧 Notification]
\`\`\`

Mỗi ô vuông là **1 microservice** — team riêng, repo riêng, deploy riêng.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Microservices luôn tốt hơn" — sai. Cho dự án nhỏ, microservices = tự bắn vào chân.
> - "Microservices = nhiều REST API" — không. Có thể giao tiếp qua message queue (Kafka, RabbitMQ).
> - "1 service 1 database" là quy tắc cứng — quan trọng để tránh coupling.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **Khởi đầu với Monolith** (Modular Monolith) → tách microservices khi đo được pain point.
> - Mỗi service phải có **API contract** rõ ràng (OpenAPI/Protobuf).
> - Áp dụng **CAP Theorem**: chọn 2 trong 3 (Consistency, Availability, Partition tolerance).
> - **2026 trend:** Backend-for-Frontend (BFF), Event-driven với Kafka/NATS, Serverless cho service ít traffic.

## 7. 🤔 Áp dụng

Trước khi vẽ kiến trúc, trả lời:
1. **Scale** dự kiến? (1k vs 1M user)
2. **Team size**?
3. **Latency** chấp nhận? (10ms vs 1s)
4. **Consistency** cần đến mức nào? (ngân hàng vs tin tức)

## 8. 📌 Tóm tắt 30 giây

Monolith = đơn giản, dễ làm. Microservices = scale tốt, nhưng cần DevOps trưởng thành. UML là **ngôn ngữ chung** để team hiểu nhau trước khi viết dòng code đầu tiên.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

You build an e-commerce site. Day 1: 100 users → 1 server is fine. A year later: 1M users → the server crashes every Saturday night. Why? Because the **monolith** can't scale just the "checkout" piece without dragging the rest along.

## 2. 💡 Two Main Architectures

| Criteria | Monolith | Microservices |
|---|---|---|
| **Structure** | One codebase, one deploy | Many small services, deploy independently |
| **Best for** | Team <20, MVPs | Large systems, diverse teams |
| **Pros** | Simple, easy to debug | Scale piece-by-piece, polyglot stacks |
| **Cons** | Hard to scale, slow deploys | DevOps complexity, network latency |
| **Examples** | Shopify (still monolith!) | Netflix, Uber, Amazon |

## 3. 🧰 Minimum UML to Know

- **Use Case Diagram** — who does what with the system.
- **Class Diagram** — relationships between objects.
- **Sequence Diagram** — call order across services A → B → C.
- **Component Diagram** — high-level architecture.

## 4. 🎯 Visual Example

\`\`\`mermaid
graph LR
  Client[📱 Mobile App] --> Gateway[🚪 API Gateway]
  Gateway --> Auth[🔐 Auth Service]
  Gateway --> Order[🛒 Order Service]
  Gateway --> Payment[💳 Payment Service]
  Order --> DB1[(Order DB)]
  Payment --> DB2[(Payment DB)]
  Order -. event .-> Notify[📧 Notification]
\`\`\`

Each box is **one microservice** — own team, own repo, own deploy.

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Microservices are always better" — wrong. For small projects, they shoot you in the foot.
> - "Microservices = many REST APIs" — no. They can talk through message queues (Kafka, RabbitMQ).
> - "One service, one database" is a hard rule — critical to avoid coupling.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - **Start with a Modular Monolith** → split into microservices once you can measure pain points.
> - Every service needs a clear **API contract** (OpenAPI/Protobuf).
> - Apply the **CAP Theorem**: pick 2 of 3 (Consistency, Availability, Partition tolerance).
> - **2026 trend:** Backend-for-Frontend (BFF), event-driven with Kafka/NATS, serverless for low-traffic services.

## 7. 🤔 Apply

Before drawing an architecture, answer:
1. Expected **scale**? (1k vs 1M users)
2. **Team size**?
3. Acceptable **latency**? (10ms vs 1s)
4. **Consistency** required? (banking vs news)

## 8. 📌 30-Second Summary

Monolith = simple, easy. Microservices = scalable, but require mature DevOps. UML is the **shared language** that lets a team agree before writing line one of code.
`,
        code: `# Decision helper: monolith or microservices?
def recommend(team_size: int, expected_users: int, has_devops: bool) -> str:
    score = 0
    if team_size > 20:        score += 2
    if expected_users > 100_000: score += 2
    if has_devops:            score += 1
    return "Microservices" if score >= 4 else "Modular Monolith"

cases = [
    {"team_size": 5,  "expected_users": 5_000,    "has_devops": False},
    {"team_size": 50, "expected_users": 5_000_000, "has_devops": True},
    {"team_size": 12, "expected_users": 80_000,   "has_devops": True},
]
for c in cases:
    print(f"{c}  →  {recommend(**c)}")`,
        exercise: "Vẽ kiến trúc cho 1 app chat 100k user/ngày. Tách ra: Auth, Message, Notification, Storage. Service nào cần message queue?",
        exerciseEn: "Draft an architecture for a chat app with 100k DAU. Separate: Auth, Message, Notification, Storage. Which services need a message queue?",
        quiz: [
          { question: "Lợi ích LỚN NHẤT của microservices?", options: ["Code ít hơn", "Scale từng phần độc lập", "Deploy 1 lần", "Không cần Docker"], answer: 1, explanation: "Bạn có thể scale Order service x10 mà không cần đụng Auth — đó là khác biệt cốt lõi với monolith." },
          { question: "Trong CAP Theorem, hệ thống ngân hàng ưu tiên gì?", options: ["Consistency + Availability", "Consistency + Partition tolerance", "Availability + Partition tolerance", "Cả 3"], answer: 1, explanation: "Ngân hàng KHÔNG được cho phép số dư sai → ưu tiên CP. Hệ thống mạng xã hội ưu tiên AP." },
          { question: "Khi nào nên DỪNG dùng microservices?", options: ["Khi team <10 và không có DevOps", "Khi user > 1 triệu", "Khi có Kubernetes", "Không bao giờ"], answer: 0, explanation: "Microservices đòi hỏi observability, CI/CD, container orchestration. Team nhỏ sẽ chìm trong overhead." },
          { question: "Sequence Diagram dùng để mô tả gì?", options: ["Class hierarchy", "Thứ tự gọi giữa các thành phần theo thời gian", "Database schema", "UI flow"], answer: 1, explanation: "Sequence diagram trục dọc = thời gian, các cột là service/actor. Rất hữu ích khi debug interaction phức tạp." },
          { question: "Modular Monolith khác Monolith truyền thống ở điểm nào?", options: ["Không khác", "Code chia thành module với boundary rõ, dễ tách microservices sau", "Không có database", "Chạy trên cloud"], answer: 1, explanation: "Modular Monolith giữ deploy đơn giản nhưng tổ chức code theo bounded context — đường tách microservices đã sẵn." }
        ]
      },
      // ──────────────────────────── LESSON 3 ────────────────────────────
      {
        id: "se-git",
        title: "Quản lý mã nguồn với Git",
        titleEn: "Version Control with Git",
        level: 2,
        difficulty: "intermediate",
        codeLanguage: "bash",
        theory: `## 1. 🚦 Vấn đề đời thường

10 dev cùng sửa 1 file \`app.js\`. Không có Git → "đè" code lên nhau, mất công 1 tuần. Có Git → mỗi người làm trên **branch riêng**, gặp nhau ở **Pull Request**, AI/đồng nghiệp review trước khi merge.

## 2. 💡 Khái niệm Git cốt lõi

- **Repository (repo)** — thư mục được Git theo dõi.
- **Commit** — snapshot của code tại 1 thời điểm.
- **Branch** — nhánh song song, không ảnh hưởng nhánh chính.
- **Merge** — gộp branch vào nhánh khác.
- **Pull Request (PR)** — đề nghị merge, kèm review.
- **Conflict** — khi 2 người sửa cùng dòng, Git nhờ con người quyết.

## 3. 🧰 Gitflow — chiến lược chuẩn

\`\`\`text
main      ← production (luôn deploy được)
  │
  develop ← dev đang tích hợp
    │
    feature/login    ← từng tính năng
    feature/payment
    │
    release/v1.2     ← chuẩn bị release
    hotfix/bug-123   ← sửa khẩn cấp lên main
\`\`\`

## 4. 🎯 Ví dụ thực tế — workflow 1 ngày

\`\`\`bash
# Sáng — kéo code mới nhất
git checkout develop
git pull origin develop

# Tạo branch feature
git checkout -b feature/user-profile

# Code... commit nhiều lần nhỏ
git add src/profile.tsx
git commit -m "feat(profile): add avatar upload"

# Đẩy lên server
git push origin feature/user-profile

# Mở Pull Request → Reviewer comment → Sửa → Merge
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "git push --force lên main là OK" — TUYỆT ĐỐI KHÔNG. Mất history team.
> - "Commit message thế nào cũng được" — sai. Dùng **Conventional Commits**: \`feat:\`, \`fix:\`, \`refactor:\`.
> - "Merge thẳng vào main" — không. Phải qua PR + review.
> - "Branch để mãi cũng OK" — sai. Branch sống lâu = conflict to.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - Commit **nhỏ và thường xuyên**: mỗi commit 1 ý.
> - PR **nhỏ** (<400 dòng) — review nhanh, ít bug.
> - **Squash merge** để main history sạch.
> - **Code review checklist:** logic đúng? test đủ? naming rõ? security OK?
> - **2026 trend:** AI Code Review (CodeRabbit, GitHub Copilot Review) catch 60% bug trước khi human review.

## 7. 🤔 Áp dụng

3 lệnh Git bạn dùng mỗi ngày:
1. \`git status\` — kiểm tra đã thay đổi gì.
2. \`git diff\` — xem cụ thể.
3. \`git log --oneline --graph\` — xem lịch sử dạng cây.

## 8. 📌 Tóm tắt 30 giây

Git = "máy thời gian" cho code. Branch + PR + Code Review là quy trình **bắt buộc** ở mọi công ty tech 2026. Conventional Commits + AI Review = team hiệu suất cao.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

10 devs touch the same \`app.js\`. Without Git → they overwrite each other, losing a week of work. With Git → each works on their own **branch**, meets at a **Pull Request**, AI / peers review before merging.

## 2. 💡 Core Git Concepts

- **Repository (repo)** — directory tracked by Git.
- **Commit** — snapshot of code at one moment.
- **Branch** — parallel line that doesn't affect main.
- **Merge** — fold one branch into another.
- **Pull Request (PR)** — proposal to merge, with review.
- **Conflict** — when two devs edit the same line; Git asks a human to decide.

## 3. 🧰 Gitflow — the standard strategy

\`\`\`text
main      ← production (always deployable)
  │
  develop ← integration line
    │
    feature/login    ← one branch per feature
    feature/payment
    │
    release/v1.2     ← release prep
    hotfix/bug-123   ← emergency fix straight to main
\`\`\`

## 4. 🎯 A Day in the Workflow

\`\`\`bash
# Morning — pull latest
git checkout develop
git pull origin develop

# Create a feature branch
git checkout -b feature/user-profile

# Code… commit small and often
git add src/profile.tsx
git commit -m "feat(profile): add avatar upload"

# Push to remote
git push origin feature/user-profile

# Open PR → reviewer comments → revise → merge
\`\`\`

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "git push --force to main is fine" — ABSOLUTELY NOT. Destroys team history.
> - "Any commit message works" — wrong. Use **Conventional Commits**: \`feat:\`, \`fix:\`, \`refactor:\`.
> - "Merge straight into main" — no. Always go through PR + review.
> - "Long-lived branches are OK" — false. Long branches = giant conflicts.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Commit **small and often**: one idea per commit.
> - Keep PRs **small** (<400 LOC) — fast review, fewer bugs.
> - **Squash merge** to keep main history clean.
> - **Review checklist:** logic correct? tests adequate? naming clear? security OK?
> - **2026 trend:** AI Code Review (CodeRabbit, GitHub Copilot Review) catches ~60% of issues before a human reviews.

## 7. 🤔 Apply

Three Git commands you use daily:
1. \`git status\` — what has changed.
2. \`git diff\` — show the change.
3. \`git log --oneline --graph\` — see history as a tree.

## 8. 📌 30-Second Summary

Git is a **time machine** for code. Branch + PR + Code Review is a **mandatory** workflow at every 2026 tech company. Conventional Commits + AI Review = a high-velocity team.
`,
        code: `# Daily Git cheatsheet — keep these commands in muscle memory

# Pull latest develop and start a new branch
git checkout develop && git pull origin develop
git checkout -b feature/awesome-thing

# Stage and commit using Conventional Commits
git add .
git commit -m "feat(api): add /v1/users endpoint"

# Push and open a PR
git push -u origin feature/awesome-thing

# Sync long-lived branches without merge commits
git fetch origin
git rebase origin/develop

# Undo the last commit but keep changes
git reset --soft HEAD~1

# Inspect history as a graph
git log --oneline --graph --all -20`,
        exercise: "Tạo 1 repo Git mới, làm 3 commit (feat, fix, docs), tạo branch feature, mở PR vào main. Mô tả từng bước.",
        exerciseEn: "Create a fresh Git repo, make 3 commits (feat, fix, docs), branch off, and open a PR to main. Describe each step.",
        quiz: [
          { question: "Conventional Commit nào ĐÚNG cho việc thêm tính năng mới?", options: ["new: add login", "feat: add login", "added login", "fix: login"], answer: 1, explanation: "feat: dùng cho feature mới. fix: cho bug, refactor: cho dọn code, docs: cho tài liệu." },
          { question: "Khi nào KHÔNG nên dùng git push --force?", options: ["Lên feature branch của riêng mình", "Lên main/develop", "Sau khi rebase branch riêng", "Lên branch chỉ mình bạn dùng"], answer: 1, explanation: "Force push lên branch chia sẻ (main, develop) sẽ ghi đè history của người khác. Chỉ dùng force-with-lease trên branch riêng." },
          { question: "PR lý tưởng dài bao nhiêu dòng?", options: ["<50", "<400", "<2000", "Không quan trọng"], answer: 1, explanation: "Nghiên cứu chỉ ra PR <400 dòng có rate phát hiện bug cao nhất. >1000 dòng → reviewer chỉ skim." },
          { question: "Lệnh nào xem lịch sử commit dưới dạng cây?", options: ["git history", "git log --oneline --graph", "git tree", "git show"], answer: 1, explanation: "git log --oneline --graph hiển thị lịch sử như cây ASCII, rất hữu ích để hiểu branch topology." },
          { question: "Khi merge conflict xảy ra, ai quyết định giữ phiên bản nào?", options: ["Git tự động chọn", "Senior dev qua chat", "Con người, bằng cách edit file", "AI"], answer: 2, explanation: "Git đánh dấu conflict bằng <<<<<<< và =======, con người phải mở file, chọn/ghép code, rồi git add + commit." }
        ]
      },
      // ──────────────────────────── LESSON 4 ────────────────────────────
      {
        id: "se-clean-code",
        title: "Clean Code & Nguyên lý SOLID",
        titleEn: "Clean Code & SOLID Principles",
        level: 3,
        difficulty: "intermediate",
        codeLanguage: "typescript",
        theory: `## 1. 🚦 Vấn đề đời thường

Sau 6 tháng, bạn quay lại đọc code cũ của chính mình → **không hiểu**. Đó là dấu hiệu code chưa "clean". Code clean **đọc như văn xuôi** — đồng nghiệp tiếp quản trong 1 ngày, không phải 1 tháng.

## 2. 💡 Clean Code — 5 quy tắc vàng

1. **Đặt tên có nghĩa**: \`d\` ❌ → \`daysSinceLastLogin\` ✅
2. **Hàm ngắn**: <20 dòng, làm 1 việc.
3. **Tránh comment thừa**: code tự nói. Comment giải thích **WHY**, không phải WHAT.
4. **DRY** (Don't Repeat Yourself): copy-paste = nợ kỹ thuật.
5. **Magic number** → constant: \`if (age > 18)\` → \`if (age > LEGAL_AGE)\`.

## 3. 🧰 SOLID — 5 nguyên lý OOP

| Chữ | Tên | Ý nghĩa |
|---|---|---|
| **S** | Single Responsibility | 1 class chỉ có 1 lý do để thay đổi |
| **O** | Open/Closed | Mở để mở rộng, đóng để sửa đổi |
| **L** | Liskov Substitution | Subclass thay được superclass mà không vỡ |
| **I** | Interface Segregation | Interface nhỏ > 1 interface to |
| **D** | Dependency Inversion | Phụ thuộc abstraction, không phải concrete |

## 4. 🎯 Ví dụ trực quan

❌ **Vi phạm SRP** — 1 class làm 3 việc:

\`\`\`typescript
class User {
  saveToDB() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
}
\`\`\`

✅ **Tách ra:**

\`\`\`typescript
class User { /* dữ liệu user */ }
class UserRepository { save(u: User) { /* ... */ } }
class EmailService { send(u: User) { /* ... */ } }
class ReportService { generate(u: User) { /* ... */ } }
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Clean Code = ít code" — sai. Clean = **dễ hiểu**, đôi khi viết DÀI hơn.
> - "Áp dụng cứng SOLID khắp nơi" — sai. SOLID là **kim chỉ nam**, không phải luật cứng. Over-engineering còn tệ hơn.
> - "Comment càng nhiều càng tốt" — sai. Code rõ → ít comment hơn.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - Quy tắc **Boy Scout**: rời codebase sạch hơn lúc bạn đến.
> - **Code review** với AI (Copilot, Cursor) trước khi đẩy PR.
> - **Lint + Format tự động**: ESLint + Prettier (JS/TS), Black + Ruff (Python).
> - **Refactor** mỗi sprint — đừng tích nợ kỹ thuật.
> - **2026 trend:** AI sinh code → human đảm nhiệm **review chất lượng** và **kiến trúc**.

## 7. 🤔 Áp dụng

Trước mỗi commit, hỏi:
1. Đặt tên có nghĩa chưa?
2. Hàm này có làm 1 việc không?
3. Có duplicate code không?
4. Có magic number không?
5. Test có pass không?

## 8. 📌 Tóm tắt 30 giây

Clean Code = code đọc như văn xuôi. SOLID = 5 nguyên lý OOP giúp code dễ mở rộng. AI hỗ trợ tốt nhất khi codebase đã clean.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

Six months later you reopen your own code and **don't understand it**. That's a sign it isn't clean. Clean code **reads like prose** — a teammate takes over in a day, not a month.

## 2. 💡 Clean Code — 5 Golden Rules

1. **Meaningful names**: \`d\` ❌ → \`daysSinceLastLogin\` ✅
2. **Short functions**: <20 lines, one job.
3. **Avoid noise comments**: code should tell you **what**, comments tell you **why**.
4. **DRY** (Don't Repeat Yourself): copy-paste is technical debt.
5. **Magic numbers** → constants: \`if (age > 18)\` → \`if (age > LEGAL_AGE)\`.

## 3. 🧰 SOLID — 5 OOP Principles

| Letter | Name | Meaning |
|---|---|---|
| **S** | Single Responsibility | One class, one reason to change |
| **O** | Open/Closed | Open for extension, closed for modification |
| **L** | Liskov Substitution | Subclasses replace parents without breaking |
| **I** | Interface Segregation | Many small interfaces beat one fat interface |
| **D** | Dependency Inversion | Depend on abstractions, not concretions |

## 4. 🎯 Visual Example

❌ **SRP violation** — one class doing three jobs:

\`\`\`typescript
class User {
  saveToDB() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
}
\`\`\`

✅ **Refactored:**

\`\`\`typescript
class User { /* user data */ }
class UserRepository { save(u: User) { /* ... */ } }
class EmailService { send(u: User) { /* ... */ } }
class ReportService { generate(u: User) { /* ... */ } }
\`\`\`

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Clean = less code" — wrong. Clean = **understandable**, sometimes longer.
> - "Apply SOLID rigidly everywhere" — wrong. SOLID is a **compass**, not a law. Over-engineering hurts more.
> - "More comments = better" — wrong. Clear code needs fewer comments.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - **Boy Scout rule**: leave the codebase cleaner than you found it.
> - **AI code review** (Copilot, Cursor) before opening a PR.
> - **Lint + format automatically**: ESLint + Prettier (JS/TS), Black + Ruff (Python).
> - **Refactor each sprint** — don't accrue technical debt.
> - **2026 trend:** AI writes code → humans own **quality review** and **architecture**.

## 7. 🤔 Apply

Before every commit, ask:
1. Are names meaningful?
2. Does this function do one thing?
3. Any duplicated code?
4. Any magic numbers?
5. Do tests pass?

## 8. 📌 30-Second Summary

Clean Code reads like prose. SOLID is the OOP compass that keeps code extensible. AI helps most when the codebase is already clean.
`,
        code: `// Bad: violates SRP, OCP, magic numbers
class OrderBad {
  process(items: any[]) {
    let total = 0;
    for (const i of items) total += i.price * 1.1; // What is 1.1??
    if (total > 1000) total *= 0.9;                 // Magic again
    // Save + send email + log all in one function...
    console.log("Saved");
    console.log("Email sent");
    return total;
  }
}

// Good: SRP + OCP + named constants + dependency injection
const VAT_RATE = 1.1;
const VIP_THRESHOLD = 1_000;
const VIP_DISCOUNT = 0.9;

interface Notifier { send(msg: string): void; }

class OrderCalculator {
  calc(items: { price: number }[]): number {
    const sub = items.reduce((s, i) => s + i.price * VAT_RATE, 0);
    return sub > VIP_THRESHOLD ? sub * VIP_DISCOUNT : sub;
  }
}

class OrderService {
  constructor(
    private calc: OrderCalculator,
    private notifier: Notifier,        // depend on abstraction (DIP)
  ) {}

  place(items: { price: number }[]) {
    const total = this.calc.calc(items);
    this.notifier.send(\`Order total: $\${total.toFixed(2)}\`);
    return total;
  }
}`,
        exercise: "Lấy 1 hàm bạn từng viết dài >50 dòng. Refactor thành 3-4 hàm nhỏ, đặt tên rõ, áp dụng SRP.",
        exerciseEn: "Take one function you wrote that is >50 lines. Refactor into 3-4 small functions with clear names, applying SRP.",
        quiz: [
          { question: "Chữ 'S' trong SOLID nghĩa là gì?", options: ["Simple", "Single Responsibility", "Static", "Synchronous"], answer: 1, explanation: "Single Responsibility Principle — 1 class chỉ có 1 lý do để thay đổi." },
          { question: "Hàm CLEAN nên dài tối đa bao nhiêu dòng?", options: ["~20", "~100", "~500", "Không giới hạn"], answer: 0, explanation: "Robert C. Martin (Clean Code) khuyến nghị hàm <20 dòng và làm đúng 1 việc." },
          { question: "Comment KIỂU NÀO là tốt nhất?", options: ["Giải thích từng dòng", "Mô tả WHY (lý do quyết định)", "Mô tả WHAT (việc gì đang làm)", "Càng nhiều càng tốt"], answer: 1, explanation: "Code đã nói WHAT. Comment hữu ích nhất giải thích WHY (vì sao chọn algorithm này, business rule...)." },
          { question: "DIP (Dependency Inversion Principle) nghĩa là gì?", options: ["Đảo ngược chu trình", "Module cao phụ thuộc abstraction, không phải concrete", "Bỏ dependency", "Phụ thuộc vào AI"], answer: 1, explanation: "Class nên phụ thuộc Interface/Abstract, không phải implementation cụ thể → dễ test, dễ swap." },
          { question: "Quy tắc Boy Scout trong Clean Code?", options: ["Code phải có gấu", "Rời codebase SẠCH HƠN lúc đến", "Mỗi commit phải có badge", "Không liên quan"], answer: 1, explanation: "Mỗi lần đụng vào file → cải thiện 1 chút (đổi tên biến, tách hàm). Tích lũy → codebase tự khỏe theo thời gian." }
        ]
      },
      // ──────────────────────────── LESSON 5 ────────────────────────────
      {
        id: "se-testing",
        title: "Testing & TDD",
        titleEn: "Testing & TDD",
        level: 3,
        difficulty: "intermediate",
        codeLanguage: "typescript",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn fix bug A → tính năng B vỡ. Fix B → C vỡ. Vòng luẩn quẩn này gọi là **regression hell**. Test tự động phá vỡ vòng đó: mỗi commit chạy hàng nghìn test trong vài giây.

## 2. 💡 3 cấp độ test (Test Pyramid)

\`\`\`text
       /\\
      /E2\\        ← End-to-End (chậm, ít)
     /----\\
    / Inte \\      ← Integration (vừa)
   /--------\\
  /   Unit   \\   ← Unit (nhanh, nhiều)
 /____________\\
\`\`\`

| Loại | Phạm vi | Tốc độ | Tỷ lệ |
|---|---|---|---|
| **Unit** | 1 hàm/class | <100ms | 70% |
| **Integration** | Nhiều module + DB | giây | 20% |
| **E2E** | Toàn user flow (browser) | phút | 10% |

## 3. 🧰 TDD — Red, Green, Refactor

1. **Red** — viết test, **chạy fail**.
2. **Green** — viết code tối thiểu để test **pass**.
3. **Refactor** — dọn code mà không phá test.

## 4. 🎯 Ví dụ TDD với Vitest

\`\`\`typescript
// 1. RED — viết test trước
import { describe, it, expect } from "vitest";
import { add } from "./calc";

describe("add", () => {
  it("cộng 2 số dương", () => {
    expect(add(2, 3)).toBe(5);
  });
  it("xử lý số âm", () => {
    expect(add(-1, -4)).toBe(-5);
  });
});

// 2. GREEN — code tối thiểu
export const add = (a: number, b: number) => a + b;

// 3. REFACTOR — thêm validation, vẫn giữ test pass
export const add = (a: number, b: number): number => {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Cần số hợp lệ");
  }
  return a + b;
};
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Test 100% coverage = code không bug" — sai. Coverage cao chỉ nói "đã chạy", không nói "đúng".
> - "TDD chậm hơn" — sai. Đo thực tế: TDD chậm tuần đầu, **nhanh hơn 30-50%** sau 1 tháng vì ít bug.
> - "QA mới phải viết test" — sai. **Dev viết unit test**. QA viết E2E + manual test phức tạp.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **AAA pattern**: Arrange → Act → Assert.
> - 1 test = 1 assertion chính.
> - Đặt tên test mô tả: \`it("should return 0 when array is empty")\`.
> - **Coverage tối thiểu** 70% cho code logic, 90% cho code thanh toán/security.
> - **2026 trend:** AI sinh test (Copilot, Codeium) → human review edge case.

## 7. 🤔 Áp dụng

Trước khi viết hàm mới, hỏi:
1. Hàm này nhận input gì? Trả về gì?
2. Edge case: rỗng, âm, NaN, max?
3. Viết 3 test case → code → refactor.

## 8. 📌 Tóm tắt 30 giây

Test Pyramid: nhiều unit, ít E2E. TDD: Red-Green-Refactor. Test tự động = ngủ ngon, deploy không lo.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

You fix bug A → feature B breaks. Fix B → C breaks. That cycle is **regression hell**. Automated tests break it: every commit runs thousands of tests in seconds.

## 2. 💡 The Test Pyramid

\`\`\`text
       /\\
      /E2\\        ← End-to-End (slow, few)
     /----\\
    / Inte \\      ← Integration (medium)
   /--------\\
  /   Unit   \\   ← Unit (fast, many)
 /____________\\
\`\`\`

| Type | Scope | Speed | Share |
|---|---|---|---|
| **Unit** | one function/class | <100ms | 70% |
| **Integration** | multiple modules + DB | seconds | 20% |
| **E2E** | full user flow (browser) | minutes | 10% |

## 3. 🧰 TDD — Red, Green, Refactor

1. **Red** — write a test, watch it **fail**.
2. **Green** — write the minimum code that **passes**.
3. **Refactor** — clean up without breaking tests.

## 4. 🎯 TDD with Vitest

\`\`\`typescript
// 1. RED — write the test first
import { describe, it, expect } from "vitest";
import { add } from "./calc";

describe("add", () => {
  it("adds two positives", () => {
    expect(add(2, 3)).toBe(5);
  });
  it("handles negatives", () => {
    expect(add(-1, -4)).toBe(-5);
  });
});

// 2. GREEN — minimal code
export const add = (a: number, b: number) => a + b;

// 3. REFACTOR — add validation, tests still pass
export const add = (a: number, b: number): number => {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Need valid numbers");
  }
  return a + b;
};
\`\`\`

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "100% coverage = bug-free" — wrong. Coverage tells you "executed", not "correct".
> - "TDD is slower" — wrong. Measured: TDD is slower week 1, but **30-50% faster** after a month thanks to fewer bugs.
> - "QA writes the tests" — wrong. **Devs write unit tests**. QA owns E2E and complex manual scenarios.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Use **AAA**: Arrange → Act → Assert.
> - One test = one main assertion.
> - Name tests as a sentence: \`it("should return 0 when array is empty")\`.
> - Minimum **70% coverage** for logic, **90%** for payment/security.
> - **2026 trend:** AI generates tests (Copilot, Codeium) → humans review edge cases.

## 7. 🤔 Apply

Before writing a new function, ask:
1. What does it accept and return?
2. Edge cases: empty, negative, NaN, max?
3. Write 3 tests → code → refactor.

## 8. 📌 30-Second Summary

Test pyramid: many units, few E2E. TDD: Red-Green-Refactor. Automation = sleep well, deploy without fear.
`,
        code: `// Vitest example — full TDD cycle for a Cart class
import { describe, it, expect, beforeEach } from "vitest";

class Cart {
  private items: { price: number; qty: number }[] = [];
  add(price: number, qty = 1) { this.items.push({ price, qty }); }
  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  count() { return this.items.reduce((s, i) => s + i.qty, 0); }
}

describe("Cart", () => {
  let cart: Cart;
  beforeEach(() => { cart = new Cart(); });

  it("starts empty", () => {
    expect(cart.total()).toBe(0);
    expect(cart.count()).toBe(0);
  });

  it("sums prices", () => {
    cart.add(10);
    cart.add(20);
    expect(cart.total()).toBe(30);
  });

  it("respects quantity", () => {
    cart.add(15, 3);
    expect(cart.count()).toBe(3);
    expect(cart.total()).toBe(45);
  });
});`,
        exercise: "Viết class BankAccount với deposit/withdraw. Áp dụng TDD: viết 5 test trước (gồm edge case), rồi mới code.",
        exerciseEn: "Write a BankAccount class with deposit/withdraw. Use TDD: write 5 tests first (including edge cases), then implement.",
        quiz: [
          { question: "Tỷ lệ Unit/Integration/E2E lý tưởng?", options: ["10/20/70", "70/20/10", "50/30/20", "100/0/0"], answer: 1, explanation: "Test Pyramid: ~70% Unit (nhanh, rẻ), ~20% Integration, ~10% E2E (đắt, chậm)." },
          { question: "Bước đầu tiên của TDD?", options: ["Code", "Viết test FAIL (Red)", "Refactor", "Deploy"], answer: 1, explanation: "Red → Green → Refactor. Viết test fail trước → biết đích cần đến → mới code." },
          { question: "AAA Pattern là gì?", options: ["Arrange-Act-Assert", "Always-Already-Asynchronous", "Auto-AI-Async", "Apple-Amazon-Adobe"], answer: 0, explanation: "Arrange (chuẩn bị data) → Act (gọi hàm) → Assert (kiểm tra kết quả). Cấu trúc test rõ ràng, dễ đọc." },
          { question: "100% test coverage có đảm bảo không có bug?", options: ["Có, hoàn toàn", "Không — chỉ đảm bảo code đã chạy, không đảm bảo đúng", "Tùy ngôn ngữ", "Chỉ với Python"], answer: 1, explanation: "Coverage = % dòng được test thực thi. Có thể đạt 100% mà vẫn miss edge case (đầu vào null, race condition...)." },
          { question: "Loại test nào CHẬM nhất nhưng GẦN với user nhất?", options: ["Unit", "Integration", "E2E", "Smoke"], answer: 2, explanation: "E2E chạy qua browser thật (Playwright, Cypress) — gần user nhất nhưng chậm và brittle nhất." }
        ]
      },
      // ──────────────────────────── LESSON 6 ────────────────────────────
      {
        id: "se-cicd",
        title: "CI/CD Pipelines",
        titleEn: "CI/CD Pipelines",
        level: 4,
        difficulty: "advanced",
        codeLanguage: "yaml",
        theory: `## 1. 🚦 Vấn đề đời thường

Trước CI/CD: dev gửi code qua Zalo → SSH lên server → \`git pull\` → \`npm build\` → \`pm2 restart\`. Mất 30 phút, dễ sai. Có CI/CD: bạn push 1 commit → 5 phút sau code đã chạy production, **tự động test**, **tự động deploy**.

## 2. 💡 CI vs CD

| Viết tắt | Tên | Vai trò |
|---|---|---|
| **CI** | Continuous **Integration** | Mỗi commit → tự build + test |
| **CD** | Continuous **Delivery** | Mỗi commit pass → tự deploy lên staging |
| **CD** | Continuous **Deployment** | Mỗi commit pass → tự deploy lên **production** |

## 3. 🧰 Pipeline 5 stage chuẩn

\`\`\`mermaid
graph LR
  A[1. Checkout] --> B[2. Install]
  B --> C[3. Lint + Test]
  C --> D[4. Build]
  D --> E[5. Deploy]
\`\`\`

## 4. 🎯 Ví dụ — GitHub Actions

\`\`\`yaml
name: CI/CD
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

      - name: Deploy to Vercel
        if: success()
        run: vercel --prod --token=\${{ secrets.VERCEL_TOKEN }}
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Auto-deploy = nguy hiểm" — sai, nếu có test đủ mạnh + canary release.
> - "Pipeline càng nhiều stage càng tốt" — sai. Pipeline >15 phút = dev mất kiên nhẫn.
> - "Secrets để trong .yaml" — TUYỆT ĐỐI KHÔNG. Dùng GitHub Secrets / Vault.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **Fail fast**: chạy lint + unit test TRƯỚC build (rẻ hơn).
> - **Cache** node_modules, Docker layers → giảm 50% thời gian.
> - **Branch protection**: cấm merge khi CI fail.
> - **Canary / Blue-Green deploy** → giảm rủi ro production.
> - **2026 trend:** GitOps (ArgoCD, Flux) — Git là source of truth, deploy bằng cách merge PR vào branch \`main\`.

## 7. 🤔 Áp dụng

Trước khi setup pipeline, liệt kê:
1. Kích hoạt khi nào? (push, PR, schedule)
2. Chạy gì? (lint, test, build, scan security)
3. Deploy đâu? (staging? production?)
4. Rollback thế nào nếu lỗi?

## 8. 📌 Tóm tắt 30 giây

CI/CD = "robot" kiểm tra + deploy code 24/7. Pipeline 5 stage chuẩn: checkout → install → lint+test → build → deploy. GitHub Actions / GitLab CI / Jenkins là 3 lựa chọn phổ biến nhất.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

Pre-CI/CD: dev DMs code over chat → SSH into server → \`git pull\` → \`npm build\` → \`pm2 restart\`. 30 minutes, error-prone. With CI/CD: push one commit → 5 minutes later it's in production, **auto-tested**, **auto-deployed**.

## 2. 💡 CI vs CD

| Acronym | Name | Role |
|---|---|---|
| **CI** | Continuous **Integration** | Each commit → auto build + test |
| **CD** | Continuous **Delivery** | Each green commit → auto deploy to staging |
| **CD** | Continuous **Deployment** | Each green commit → auto deploy to **production** |

## 3. 🧰 Standard 5-stage Pipeline

\`\`\`mermaid
graph LR
  A[1. Checkout] --> B[2. Install]
  B --> C[3. Lint + Test]
  C --> D[4. Build]
  D --> E[5. Deploy]
\`\`\`

## 4. 🎯 GitHub Actions Example

\`\`\`yaml
name: CI/CD
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

      - name: Deploy to Vercel
        if: success()
        run: vercel --prod --token=\${{ secrets.VERCEL_TOKEN }}
\`\`\`

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Auto-deploy is dangerous" — false, given strong tests + canary release.
> - "More stages = better pipeline" — false. A pipeline >15 min loses developer patience.
> - "Secrets in .yaml" — ABSOLUTELY NOT. Use GitHub Secrets / Vault.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - **Fail fast**: lint + unit tests BEFORE build (cheap to run).
> - **Cache** node_modules, Docker layers → cut runtime by ~50%.
> - **Branch protection**: block merge when CI fails.
> - **Canary / Blue-Green deploys** → de-risk production.
> - **2026 trend:** GitOps (ArgoCD, Flux) — Git is the source of truth; deploys happen by merging into \`main\`.

## 7. 🤔 Apply

Before designing a pipeline, list:
1. Trigger? (push, PR, schedule)
2. Steps? (lint, test, build, security scan)
3. Deploy where? (staging? production?)
4. How to roll back?

## 8. 📌 30-Second Summary

CI/CD is the 24/7 robot that tests + ships your code. The classic 5-stage pipeline: checkout → install → lint+test → build → deploy. GitHub Actions / GitLab CI / Jenkins are the three top picks.
`,
        code: `# .github/workflows/ci-cd.yml — production-grade pipeline
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v4

  security:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=high
      - uses: aquasecurity/trivy-action@master
        with:
          scan-type: fs
          severity: CRITICAL,HIGH

  deploy:
    runs-on: ubuntu-latest
    needs: [quality, security]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`,
        exercise: "Thiết kế pipeline cho 1 React app: trigger trên PR, chạy ESLint + Vitest + build, deploy preview lên Vercel.",
        exerciseEn: "Design a pipeline for a React app: trigger on PR, run ESLint + Vitest + build, deploy a preview to Vercel.",
        quiz: [
          { question: "CI viết tắt của gì?", options: ["Code Inspection", "Continuous Integration", "Cloud Infrastructure", "Container Image"], answer: 1, explanation: "Continuous Integration — mỗi commit tự động build + test để phát hiện lỗi sớm." },
          { question: "Stage nào nên chạy SỚM nhất trong pipeline?", options: ["Deploy", "Build", "Lint + Unit Test (rẻ + nhanh)", "Security scan"], answer: 2, explanation: "Fail Fast: lint + unit test rẻ và nhanh → fail sớm → tiết kiệm CI minutes." },
          { question: "Secrets (API key, password) NÊN lưu ở đâu trong CI/CD?", options: ["Hardcode trong .yaml", ".env commit lên Git", "GitHub Secrets / Vault", "README"], answer: 2, explanation: "Dùng vault chuyên dụng (GitHub Secrets, AWS Secrets Manager, HashiCorp Vault) — không bao giờ hardcode hay commit." },
          { question: "Canary Deployment là gì?", options: ["Deploy cho chim hoàng yến", "Deploy version mới cho 5% user trước, theo dõi metrics, rồi mở rộng", "Deploy chỉ cuối tuần", "Deploy bằng tay"], answer: 1, explanation: "Canary release: triển khai dần (5% → 25% → 100%) để phát hiện lỗi production trên ít user trước." },
          { question: "Continuous Deployment khác Continuous Delivery?", options: ["Không khác", "Deployment auto deploy lên PRODUCTION; Delivery dừng ở staging chờ approve", "Deployment chỉ dùng cho mobile", "Delivery nhanh hơn"], answer: 1, explanation: "Continuous Delivery: tự động đến staging, cần human approve để lên prod. Continuous Deployment: hoàn toàn tự động đến prod." }
        ]
      },
      // ──────────────────────────── LESSON 7 ────────────────────────────
      {
        id: "se-security-patterns",
        title: "Bảo mật & Design Patterns",
        titleEn: "Software Security & Design Patterns",
        level: 4,
        difficulty: "advanced",
        codeLanguage: "typescript",
        theory: `## 1. 🚦 Vấn đề đời thường

2024: 1 startup Việt Nam mất 2 tỷ vì hacker khai thác lỗi **SQL Injection** đơn giản. 2025: 1 ngân hàng bị **XSS** đánh cắp session 10k user. Bảo mật **không phải tính năng** — là **mặc định** trong mọi dòng code 2026.

## 2. 💡 OWASP Top 10 — 5 lỗ hổng cốt lõi

1. **Broken Access Control** — user xem được data của user khác.
2. **Injection (SQL/NoSQL/Command)** — \`query("SELECT * FROM users WHERE id=" + input)\`.
3. **XSS** (Cross-Site Scripting) — chèn \`<script>\` vào input.
4. **Insecure Design** — thiếu rate limit, thiếu MFA.
5. **Vulnerable Components** — dependency cũ có CVE.

## 3. 🧰 4 Design Pattern bắt buộc biết

| Pattern | Mục đích | Ví dụ thực tế |
|---|---|---|
| **Singleton** | Chỉ 1 instance toàn app | Database connection, Config |
| **Factory** | Tạo object mà không chỉ rõ class | Tạo Logger (Console/File/Cloud) |
| **Observer** | Subscriber nhận thông báo khi state đổi | Pub/Sub, React state |
| **Strategy** | Đổi thuật toán runtime | Payment (Stripe/Paypal/MoMo) |

## 4. 🎯 Ví dụ — Phòng SQL Injection

❌ **Nguy hiểm:**

\`\`\`typescript
const user = await db.query(\`SELECT * FROM users WHERE id = \${userId}\`);
// userId = "1 OR 1=1" → trả về TOÀN BỘ user
\`\`\`

✅ **An toàn — parameterized query:**

\`\`\`typescript
const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
// Driver tự escape — input chỉ được coi là DỮ LIỆU
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "HTTPS đủ rồi" — sai. HTTPS chỉ bảo mật đường truyền, không bảo vệ logic app.
> - "Hash password = secure" — chỉ khi dùng bcrypt/argon2 + salt. MD5/SHA1 = crack được trong giây.
> - "Hide URL = security" — sai (Security through obscurity ≠ security).
> - "Singleton dùng cho mọi thứ" — sai. Singleton tạo coupling, khó test → dùng có chọn lọc.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **Defense in Depth** — nhiều lớp bảo mật (firewall + WAF + auth + RLS + input validation).
> - **Least Privilege** — user chỉ có quyền tối thiểu.
> - Quét dependency hàng tuần (\`npm audit\`, \`snyk\`).
> - **CSP header** chặn XSS bài bản.
> - **2026 trend:** Zero Trust Architecture, AI threat detection (Wiz, Snyk AI), passkeys thay password.

## 7. 🤔 Áp dụng

Mỗi PR liên quan auth/data, hỏi:
1. Validate input chưa? (whitelist, không blacklist)
2. Authorize không chỉ Authenticate? (user X được xem data của Y không?)
3. Log có leak PII không?
4. Rate limit chưa?

## 8. 📌 Tóm tắt 30 giây

OWASP Top 10 là checklist bảo mật bắt buộc. 4 design pattern: Singleton, Factory, Observer, Strategy — đủ cho 80% case. Bảo mật là **mindset**, không phải tính năng cộng vào cuối.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

2024: a Vietnamese startup lost ~$80k to a trivial **SQL Injection**. 2025: a bank's **XSS** stole 10k user sessions. Security in 2026 is **not a feature** — it's the **default** in every line of code.

## 2. 💡 OWASP Top 10 — 5 Core Vulnerabilities

1. **Broken Access Control** — users can read other users' data.
2. **Injection (SQL/NoSQL/Command)** — \`query("SELECT * FROM users WHERE id=" + input)\`.
3. **XSS** (Cross-Site Scripting) — \`<script>\` injected via input.
4. **Insecure Design** — missing rate limit, missing MFA.
5. **Vulnerable Components** — outdated deps with CVEs.

## 3. 🧰 4 Must-know Design Patterns

| Pattern | Purpose | Real example |
|---|---|---|
| **Singleton** | A single app-wide instance | Database connection, Config |
| **Factory** | Build objects without naming the class | Logger (Console/File/Cloud) |
| **Observer** | Subscribers notified on state change | Pub/Sub, React state |
| **Strategy** | Swap algorithms at runtime | Payment (Stripe/Paypal/MoMo) |

## 4. 🎯 Example — Preventing SQL Injection

❌ **Dangerous:**

\`\`\`typescript
const user = await db.query(\`SELECT * FROM users WHERE id = \${userId}\`);
// userId = "1 OR 1=1" → returns EVERY user
\`\`\`

✅ **Safe — parameterized:**

\`\`\`typescript
const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
// Driver escapes for you — input is treated strictly as DATA
\`\`\`

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "HTTPS is enough" — wrong. HTTPS only protects transport, not application logic.
> - "Hashed passwords are safe" — only with bcrypt/argon2 + salt. MD5/SHA1 cracks in seconds.
> - "Hidden URLs = security" — false (security through obscurity ≠ security).
> - "Singleton everywhere" — wrong. Singletons cause coupling and hurt testing — use sparingly.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - **Defense in Depth** — layers (firewall + WAF + auth + RLS + input validation).
> - **Least Privilege** — minimum permissions per user.
> - Audit dependencies weekly (\`npm audit\`, \`snyk\`).
> - **CSP header** to lock down XSS.
> - **2026 trend:** Zero Trust Architecture, AI threat detection (Wiz, Snyk AI), passkeys replacing passwords.

## 7. 🤔 Apply

For every auth/data PR, ask:
1. Is input validated? (whitelist, never blacklist)
2. Did you authorize beyond authenticating? (can user X see user Y's data?)
3. Are logs leaking PII?
4. Is the endpoint rate-limited?

## 8. 📌 30-Second Summary

OWASP Top 10 is the mandatory checklist. Singleton, Factory, Observer, Strategy cover 80% of pattern needs. Security is a **mindset**, not a bolt-on.
`,
        code: `// Singleton + Factory + Observer + Strategy in <60 lines

// 1. SINGLETON — single DB connection per process
class DB {
  private static instance: DB;
  private constructor() { /* connect once */ }
  static get(): DB {
    if (!DB.instance) DB.instance = new DB();
    return DB.instance;
  }
}

// 2. FACTORY — pick the right Notifier without hard-coding
interface Notifier { send(msg: string): void; }
class EmailNotifier implements Notifier { send(m: string) { /* SMTP */ } }
class SmsNotifier   implements Notifier { send(m: string) { /* Twilio */ } }

class NotifierFactory {
  static make(kind: "email" | "sms"): Notifier {
    return kind === "email" ? new EmailNotifier() : new SmsNotifier();
  }
}

// 3. OBSERVER — pub/sub for order events
type Listener<T> = (event: T) => void;
class EventBus<T> {
  private listeners: Listener<T>[] = [];
  subscribe(fn: Listener<T>) { this.listeners.push(fn); }
  publish(e: T) { this.listeners.forEach(fn => fn(e)); }
}

// 4. STRATEGY — swap payment provider at runtime
interface PaymentStrategy { pay(amount: number): boolean; }
class StripePay  implements PaymentStrategy { pay(a: number) { return true; } }
class MomoPay    implements PaymentStrategy { pay(a: number) { return true; } }

class Checkout {
  constructor(private strategy: PaymentStrategy) {}
  setStrategy(s: PaymentStrategy) { this.strategy = s; }
  process(amount: number) { return this.strategy.pay(amount); }
}`,
        exercise: "Liệt kê 5 endpoint trong 1 dự án bạn từng làm. Mỗi endpoint chỉ ra: Authentication? Authorization? Input validation? Rate limit?",
        exerciseEn: "List 5 endpoints from a past project. For each: Authentication? Authorization? Input validation? Rate limit?",
        quiz: [
          { question: "Cách CHẮC CHẮN phòng SQL Injection?", options: ["Escape bằng tay", "Parameterized queries / Prepared statements", "Đổi tên table", "Dùng NoSQL"], answer: 1, explanation: "Parameterized queries để driver tự escape, input được coi là dữ liệu thuần — không bao giờ là code SQL." },
          { question: "Pattern nào dùng cho 1 instance toàn app?", options: ["Factory", "Observer", "Singleton", "Strategy"], answer: 2, explanation: "Singleton đảm bảo class chỉ có 1 instance — phù hợp DB pool, Config, Logger." },
          { question: "OWASP Top 10 là gì?", options: ["Top 10 game OWASP", "Danh sách 10 lỗ hổng web nguy hiểm nhất", "Top 10 framework", "Top 10 ngôn ngữ"], answer: 1, explanation: "OWASP Top 10 là tài liệu được cập nhật mỗi 3-4 năm, liệt kê 10 lỗ hổng web phổ biến và nguy hiểm nhất." },
          { question: "Hash password NÊN dùng thuật toán nào?", options: ["MD5", "SHA1", "bcrypt / argon2", "Base64"], answer: 2, explanation: "bcrypt và argon2 chậm có chủ đích + có salt → kháng brute-force và rainbow table. MD5/SHA1 lỗi thời." },
          { question: "Strategy Pattern hữu ích KHI nào?", options: ["Khi cần đổi thuật toán runtime mà không sửa client", "Khi chỉ có 1 instance", "Khi cần singleton", "Khi không có test"], answer: 0, explanation: "Strategy đóng gói nhiều thuật toán cùng interface, client chọn instance lúc runtime — vd: 3 cổng thanh toán cùng trả về boolean pay()." }
        ]
      }
    ]
  }
];
