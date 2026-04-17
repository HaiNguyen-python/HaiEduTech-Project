

## Plan: Thêm mục "Interview Questions" vào Learn Programming

### Mục tiêu
Bổ sung mục mới "Interview Questions" trong phần Learn Programming, chứa các câu hỏi phỏng vấn thực tế cho 2 vị trí: **AI Engineer** và **Data Engineer**, kèm câu trả lời chi tiết.

### Cấu trúc nội dung

**AI Engineer (~25 câu hỏi)** chia 4 nhóm:
- LLMs & Prompt Engineering (RAG, fine-tuning, hallucination, context window)
- Machine Learning Fundamentals (overfitting, bias-variance, evaluation metrics)
- Deep Learning & Neural Networks (transformers, attention, backprop)
- AI System Design & Ethics (vector DB, latency, bias, deployment)

**Data Engineer (~25 câu hỏi)** chia 4 nhóm:
- SQL & Databases (joins, indexing, window functions, normalization)
- Data Pipelines & ETL (Airflow, idempotency, batch vs stream, data quality)
- Big Data & Cloud (Spark, partitioning, data lake vs warehouse, cost optimization)
- System Design (schema design, CDC, monitoring, lineage)

Mỗi câu hỏi gồm: **Question**, **Answer** (chi tiết), **Key Points** (bullet), **Code Example** (nếu có), **Difficulty** (Junior/Mid/Senior).

### Files sẽ tạo/sửa

| File | Thay đổi |
|------|----------|
| `src/data/interviewQuestions.ts` (NEW) | Data 50 câu hỏi với types `InterviewQuestion`, `InterviewCategory` |
| `src/pages/InterviewQuestions.tsx` (NEW) | Trang hiển thị: tabs role (AI/Data) → filter category & difficulty → accordion câu hỏi với syntax highlight |
| `src/App.tsx` | + route `/programming/interview-questions` |
| `src/pages/Programming.tsx` | + card "Interview Questions" nổi bật trong pillar AI Foundation và Data Engineering (link đến trang mới) |
| `src/components/Navbar.tsx` | + link "💼 Interview Questions" trong dropdown Programming |

### UI/UX
- **Tabs**: AI Engineer / Data Engineer (default: AI)
- **Filter chips**: Category + Difficulty (Junior/Mid/Senior/All)
- **Search box**: tìm theo keyword
- **Accordion cards**: collapse mặc định, expand để xem answer + key points + code
- **Copy code button**, badge difficulty với màu (xanh/vàng/đỏ)
- **Progress tracking**: localStorage đánh dấu "đã ôn" cho từng câu

### Ngôn ngữ
- Toàn bộ câu hỏi và đáp án bằng **tiếng Anh** (theo chuẩn phỏng vấn quốc tế và phù hợp memory rule "English for English/Programming quizzes")
- UI labels song ngữ qua `useLanguage`

