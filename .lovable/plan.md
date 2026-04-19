
Người dùng muốn:
1. **Cloud Engineer**: thêm bài học/bài tập mới + làm phần Theory đầy đủ, cụ thể, chi tiết hơn
2. **Các pillar khác trong Learn Programming** (Python, AI Foundation, SQL, Data Engineering, ML): mở rộng phần Theory cho đầy đủ và chi tiết hơn

Đã khảo sát:
- `cloudLessons.ts`: 5 modules × 3 lessons = 15 lessons. Theory hiện ~8-15 dòng/lesson (khá ngắn so với `aiFoundationLessons.ts` ~50-80 dòng)
- `aiFoundationLessons.ts`, `dataEngLessons.ts`, `sqlLessons.ts`, `mlLessons.ts`, `programmingExpansion.ts`: độ chi tiết không đồng đều — dataEng/aiFoundation đã rất sâu, nhưng nhiều lesson Python/SQL trong `programmingExpansion.ts` còn ngắn (~20-40 dòng)

## Kế hoạch triển khai

### 1. Mở rộng Cloud Engineer (`src/data/curriculum/cloudLessons.ts`)
- **Thêm 2 lessons mới vào mỗi module hiện có** (5 modules × +2 = +10 lessons), nâng tổng từ 15 → 25 lessons:
  - **Cloud Fundamentals**: + "Cloud Pricing Models", + "Multi-Cloud vs Hybrid Cloud"
  - **Compute & Storage**: + "Block vs File vs Object Storage", + "Auto Scaling & Load Balancing"
  - **Networking & Security**: + "Encryption (At-Rest, In-Transit, KMS)", + "DDoS Protection & WAF"
  - **Serverless & DevOps**: + "Containers vs Serverless", + "Monitoring with CloudWatch/Prometheus"
  - **Architecture & Cost**: + "Disaster Recovery (RTO/RPO)", + "Multi-Region Active-Active"
- **Mở rộng Theory tất cả 25 lessons** lên 50-80 dòng/lesson theo chuẩn `aiFoundationLessons.ts`:
  - Định nghĩa đầy đủ + lịch sử/bối cảnh
  - Bảng so sánh AWS vs Azure vs GCP cho từng dịch vụ
  - Pros/Cons, Use cases, Anti-patterns
  - Real-world examples (Netflix, Spotify, Airbnb…)
  - Best practices + Common pitfalls
- Mỗi lesson mới: code example (Python/YAML/Terraform), exercise (EN), quiz 5 câu (EN)

### 2. Mở rộng Theory các pillar khác
Tập trung vào các file lessons còn ngắn:
- **`src/data/curriculum/sqlLessons.ts`**: mở rộng theory cho các bài SQL cơ bản (JOIN, GROUP BY, Subquery, Index, Transaction) — bổ sung syntax đầy đủ + execution plan + edge cases
- **`src/data/curriculum/programmingExpansion.ts`**: mở rộng OOP, Decorators, Generators, File I/O, Spark — thêm design patterns, performance tips, real-world use cases
- **`src/data/curriculum/mlLessons.ts`**: mở rộng theory cho Linear Regression, Decision Tree, Clustering, Neural Network basics — thêm math intuition + sklearn API + evaluation metrics

Chuẩn mở rộng cho mọi lesson:
- Theory tối thiểu 50 dòng có cấu trúc rõ (Định nghĩa → Cách hoạt động → Ví dụ thực tế → Best practices → Common pitfalls)
- TheoryEn song song
- Quiz 5 câu EN với explanation

### 3. Files sẽ chỉnh sửa
- `src/data/curriculum/cloudLessons.ts` — +10 lessons + mở rộng theory toàn bộ
- `src/data/curriculum/sqlLessons.ts` — mở rộng theory
- `src/data/curriculum/programmingExpansion.ts` — mở rộng theory
- `src/data/curriculum/mlLessons.ts` — mở rộng theory

Không tạo file mới, không thay đổi schema/UI.
