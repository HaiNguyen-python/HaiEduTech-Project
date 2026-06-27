## Mục tiêu

Tăng độ sâu nội dung lý thuyết (theory) cho toàn bộ bài học trong mục Programming, với trọng tâm là Data Engineering - bổ sung khái niệm nền, cơ chế bên trong, ví dụ thực tế, trade-off, best-practice và checklist - mà không làm xáo trộn dữ liệu code/quiz/exercise hiện có.

## Cách tiếp cận

Tạo một module phụ trợ `src/data/curriculum/theoryExtensions.ts` chứa các khối "Deep-Dive" theo `lessonId`, rồi nối vào cuối `theory`/`theoryEn` lúc render trong `ProgrammingLesson.tsx`. Cách này:

- Không phá vỡ file curriculum gốc (giữ git diff sạch, dễ rollback)
- Cho phép viết nội dung dài (1500-3500 ký tự/bài) với nhiều H2, ví dụ code, bảng so sánh
- Tương thích với nút "AI Deep-Dive" hiện có (chỉ append khi không bật enhanced mode)

## Phạm vi nội dung

**1. Data Engineering (ưu tiên cao - viết kỹ nhất, ~2500-3500 ký tự/bài)**

Bao phủ toàn bộ 14 bài hiện có:
- de-pd-1 DataFrame & Series, de-pd-* (Pandas basics)
- de-clean-1 Missing Values & Duplicates
- de-ingest-1 Reading Multiple Sources (CSV/JSON/Parquet/API/DB)
- de-etl-1 ETL vs ELT
- de-model-1 Star & Snowflake Schema
- de-wh-1 OLAP & Warehouse
- de-bs-1 Batch & Streaming
- de-dq-1 Data Quality Framework
- de-orch-1 DAGs & Airflow
- de-cloud-1 Cloud Platforms (AWS/GCP/Azure)
- de-prod-1 Production Best Practices
- de-lake-1 Lakehouse, de-dbt-1 dbt, de-cdc-1 CDC, de-obs-1 Data Observability

Mỗi bài bổ sung các mục:
- Bối cảnh & "Vì sao khái niệm này tồn tại"
- Cơ chế bên trong (engine, memory layout, execution plan)
- Ví dụ thực tế công ty (Shopee/Tiki/Spotify/Uber pattern)
- Bảng so sánh trade-off
- Anti-pattern thường gặp
- Checklist trước khi merge PR
- Liên hệ sang khái niệm bài kế tiếp

**2. Các mục còn lại (~1200-2000 ký tự/bài)**

- SQL (sqlLessons): bổ sung query plan, B-Tree index, MVCC, normalization examples
- ML (mlLessons): bias-variance, regularization intuition, evaluation pitfalls
- Cloud (cloudLessons/cloudExpansion): shared responsibility, cost model, IaC
- Cybersecurity: STRIDE threat model, OWASP mapping, secure SDLC
- Web Dev: rendering pipeline, hydration, CDN/cache, accessibility
- Software Eng: SOLID examples, CI/CD pipeline anatomy, code review heuristics
- AI Foundation / NLP / DL / RL: chỉ bài nào theory < 1500 ký tự
- Programming basics & Python pathway: chỉ bài nào theory ngắn

## Triển khai kỹ thuật

```text
src/data/curriculum/
├── theoryExtensions.ts     (NEW - map<lessonId, {vi, en}>)
└── ...
src/pages/ProgrammingLesson.tsx
└── append theoryExtensions[lesson.id] vào markdown trước khi render
```

Snippet render (chèn quanh dòng 738-748):

```ts
const ext = theoryExtensions[lesson.id];
const baseTheory = lang === "vi"
  ? (lesson.theory || lesson.theoryEn || "")
  : (lesson.theoryEn || lesson.theory || "");
const extText = ext ? (lang === "vi" ? ext.vi : ext.en) : "";
const merged = extText ? `${baseTheory}\n\n${extText}` : baseTheory;
```

Nội dung tuân thủ quy ước project:
- Không có em-dash `—`, chỉ dùng `-`
- Không có cụm "thầy Hải"
- Markdown chuẩn, code block có ngôn ngữ rõ ràng
- Song ngữ Việt-Anh đầy đủ

## Quy mô & cách chia nhỏ

Để giữ chất lượng và không vượt token mỗi turn, sẽ giao hàng theo nhiều file/turn:

1. Turn 1: Tạo `theoryExtensions.ts` (skeleton + Data Eng 14 bài)
2. Turn 2: Thêm SQL + Software Eng + Web Dev
3. Turn 3: Thêm Cloud + Cybersecurity + ML
4. Turn 4: Phần còn lại (AI/NLP/DL/RL/Python) - chỉ bài ngắn

Cập nhật `ProgrammingLesson.tsx` ngay ở turn 1 để Data Eng hiển thị deep-dive trước.

## Ngoài phạm vi

- Không sửa quiz, exercise, code, testCases
- Không đổi schema database `programming_theory_cache`
- Không tạo lesson mới
- Không động vào AI Deep-Dive edge function

Bạn duyệt plan để mình bắt đầu Turn 1 (Data Engineering) nhé?
