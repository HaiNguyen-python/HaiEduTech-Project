import type { ExtendedProgrammingModule } from "./types";

/**
 * EdTech Research Methods - 6 lessons for academic rigor and applied research.
 * Designed to prep practitioners (and PhD applicants) for empirical EdTech work.
 */
export const edtechResearchMethodsModules: ExtendedProgrammingModule[] = [
  {
    id: "edtech-research-2026",
    title: "EdTech Research Methods - RCT, Learning Analytics & A/B",
    titleEn: "EdTech Research Methods - RCT, Learning Analytics & A/B",
    icon: "🔬",
    color: "from-amber-500 to-orange-600",
    description:
      "6 bài cho người làm EdTech nghiêm túc + ứng viên PhD: design RCT, learning analytics, A/B testing, hiệu ứng nhân quả, đo lường mastery, và đạo đức nghiên cứu trẻ em.",
    descriptionEn:
      "6 lessons for serious EdTech practitioners + PhD applicants: RCT design, learning analytics, A/B testing, causal effects, mastery measurement, and research ethics.",
    course: "edtech",
    lessons: [
      {
        id: "edtech-rm-1",
        title: "Hỏi câu hỏi nghiên cứu đúng - từ ý tưởng tới RQ + H1",
        titleEn: "Asking the Right Research Question - From Idea to RQ + H1",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🎯 Vì sao RQ kém = nghiên cứu chết

Một RQ tốt có 4 tính chất (FINER thu gọn):

| Tính chất | Test |
|---|---|
| **Feasible** | Có data + thời gian + budget không? |
| **Interesting** | Cộng đồng học thuật/ngành quan tâm? |
| **Novel** | Ai đã trả lời chưa? (Google Scholar) |
| **Ethical** | Trẻ em + minor → IRB approval cần |

## 2. 🪜 Từ ý tưởng → RQ + H1

\`\`\`
Ý tưởng:  "AI tutor có giúp học không?"  ← quá rộng

Thu hẹp:  Đối tượng nào? Môn gì? So với gì? Đo bằng gì?

RQ:  "Liệu LLM-based personalized hints (vs static hints)
      có cải thiện điểm IELTS Writing Task 2 của học sinh B1
      Việt Nam sau 4 tuần học mỗi ngày 30 phút?"

H1:  Điểm trung bình post-test của nhóm A (LLM hints)
      cao hơn nhóm B (static) ≥ 0.5 band, p < 0.05.

H0:  Không có khác biệt thống kê.
\`\`\`

## 3. 📚 PICO/PICOTS framework

EdTech research thường dùng **PICOTS**:

| Element | Ví dụ |
|---|---|
| **P**opulation | B1 Vietnamese learners, n=120 |
| **I**ntervention | LLM personalized hints |
| **C**omparison | Static hint bank |
| **O**utcome | IELTS Writing band score |
| **T**ime | 4 weeks, 30 min/day |
| **S**etting | Online, self-paced |

## 4. 🔍 Literature review checklist

1. Search Google Scholar + ERIC + ACM Digital Library.
2. Filter: 2020+ for AI; 2010+ for pedagogy.
3. Forward + backward citation chasing.
4. Tag papers: relevant / supporting / contradicting.
5. Synthesize: gap analysis - đâu là khoảng trống bạn lấp?

## 5. 🚨 Sai lầm phổ biến

- **HARKing** (Hypothesizing After Results Known): viết H1 sau khi nhìn data.
- **Fishing**: chạy 20 test, báo 1 cái p<0.05.
- **RQ thay đổi giữa chừng** mà không pre-register.
- **Cherry-pick** sample (chỉ học sinh tích cực).`,
        theoryEn: `## 1. What Makes a Good Research Question?

A good RQ passes the **FINER** test (Feasible, Interesting, Novel, Ethical, Relevant). Most rejected EdTech papers fail FINER long before peer review - they ask vague or unmeasurable questions.

## 2. The PICOTS Framework

Borrowed from clinical research, **PICOTS** turns a vague idea into a testable question:

| Letter | Stands for | Example |
|--------|-----------|---------|
| **P** | Population | B1 Vietnamese learners, n=120 |
| **I** | Intervention | LLM personalised hints |
| **C** | Comparison | Static hint bank |
| **O** | Outcome | IELTS Writing band |
| **T** | Time | 4 weeks, 30 min/day |
| **S** | Setting | Online, self-paced |

## 3. Literature Review Checklist

1. Search Google Scholar + ERIC + ACM Digital Library.
2. Filter: 2020+ for AI work; 2010+ for pedagogy.
3. Do **forward + backward citation chasing** from 2-3 key papers.
4. Tag each paper: *relevant / supporting / contradicting*.
5. Synthesise - what is the **gap** you will fill?

## 4. Pre-Registration

Lock your RQ, hypotheses, sample size, and analysis plan **before** collecting data. Platforms: OSF.io, AsPredicted.org. Pre-registration is the single strongest defence against bias.

## 5. Five Sins to Avoid

| Sin | What it is | Why it ruins your paper |
|-----|-----------|------------------------|
| **HARKing** | Hypothesising After Results are Known | Turns exploration into fake confirmation |
| **p-hacking** | Trying many tests, reporting only significant ones | False discoveries inflate to 30%+ |
| **Cherry-picking** | Reporting only the cohorts that "worked" | Inflates effect, destroys generalisability |
| **Optional stopping** | Peeking and stopping when p < 0.05 | Doubles false-positive rate |
| **Moving the goalpost** | Changing the primary outcome mid-study | Makes the study unfalsifiable |

## 6. Hypothesis Templates

- **H1** (directional): "Treatment improves outcome Y by at least Δ."
- **H0** (null): "No mean difference between treatment and control."
- State the **effect size of practical interest** - not just statistical significance.`,
        code: `# Pre-registration template (markdown)
"""
# Pre-registration: LLM Hints in IELTS Writing

## RQ
Does LLM-based personalized hints (vs static hints) improve IELTS
Writing Task 2 band of B1 Vietnamese learners after 4 weeks?

## Hypotheses
H1: μ(treatment) - μ(control) >= 0.5 band, p < 0.05 (one-tailed)
H0: μ(treatment) = μ(control)

## Design
- 2-arm RCT, stratified random assignment by pre-test band
- n = 120 (power 0.8, alpha 0.05, effect 0.5 SD)
- Duration: 4 weeks, 30 min/day
- Outcome: post-test band by 2 blinded examiners (ICC > 0.7)

## Stopping rule
No interim analyses. Final analysis at week 4.

## Exclusions
- <80% session attendance
- Withdrew consent
"""`,
        codeLanguage: "python",
        exercise: "Viết RQ + H1 theo PICOTS cho ý tưởng 'Gamification trong app HSK có giúp học sinh nhớ từ lâu hơn không?'",
        exerciseEn: "Write a PICOTS RQ + H1 for 'Does gamification in HSK app improve long-term retention?'",
        quiz: [
          { question: "FINER là?", options: ["Phần mềm", "Feasible/Interesting/Novel/Ethical/Relevant - tiêu chí RQ tốt", "API", "RCT type"], answer: 1, explanation: "Khung kiểm tra RQ kinh điển.", questionEn: "What is FINER?", optionsEn: ["A software tool", "Feasible/Interesting/Novel/Ethical/Relevant - a good-RQ checklist", "An API", "A type of RCT"], explanationEn: "The classic framework for checking a research question." },
          { question: "HARKing là gì?", options: ["Lập H1 trước", "Viết H1 SAU khi nhìn data - thiếu trung thực", "Replication", "Meta-analysis"], answer: 1, explanation: "Vi phạm nghiêm trọng tính chính trực.", questionEn: "What is HARKing?", optionsEn: ["Writing H1 before seeing data", "Writing H1 AFTER seeing the data - a dishonest practice", "Replication", "Meta-analysis"], explanationEn: "A serious violation of research integrity." },
          { question: "Pre-registration giúp gì?", options: ["SEO", "Cam kết design trước → chống p-hacking + HARKing", "Tăng publication", "Trang trí"], answer: 1, explanation: "Tăng độ tin cậy nghiên cứu.", questionEn: "What does pre-registration help with?", optionsEn: ["SEO", "Committing to the design beforehand -> prevents p-hacking + HARKing", "Boosting publication count", "Decoration"], explanationEn: "It increases the credibility of the research." },
          { question: "PICOTS thêm gì so với PICO?", options: ["Politic + Society", "Time + Setting", "Power + Sample", "Plot + Score"], answer: 1, explanation: "Thời gian và bối cảnh.", questionEn: "What does PICOTS add compared to PICO?", optionsEn: ["Politics + Society", "Time + Setting", "Power + Sample", "Plot + Score"], explanationEn: "Time and setting." },
          { question: "Cherry-pick sample?", options: ["OK nếu tiện", "Vi phạm tính đại diện → kết quả không generalizable", "Không vấn đề", "Chỉ trong meta-analysis"], answer: 1, explanation: "Sample lệch = kết luận lệch.", questionEn: "Cherry-picking a sample?", optionsEn: ["Fine if convenient", "Violates representativeness -> results are not generalizable", "No issue at all", "Only a concern in meta-analysis"], explanationEn: "A biased sample means a biased conclusion." },
        ],
      },
      {
        id: "edtech-rm-2",
        title: "RCT trong EdTech - power, randomization, blinding",
        titleEn: "RCTs in EdTech - Power, Randomization, Blinding",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🧪 RCT là gold standard

Random assignment → confounders phân bố đều → causal claim.

\`\`\`
   N=120 học sinh
        │
   [Stratify by pre-test band: low/mid/high]
        │
   Random split 50/50 trong mỗi stratum
        │
   ┌───────────┐         ┌───────────┐
   │  A: LLM   │         │  B: Static│
   │  hints    │         │  hints    │
   │  n=60     │         │  n=60     │
   └─────┬─────┘         └─────┬─────┘
         │                     │
   Post-test (blinded raters)
         │
   ΔBand_A vs ΔBand_B → t-test, ANCOVA
\`\`\`

## 2. ⚡ Power analysis (tránh nghiên cứu vô nghĩa)

Cần biết:
- **α** (false positive): 0.05
- **β** (false negative): 0.20 (power = 0.80)
- **Effect size**: bao nhiêu là có ý nghĩa? (Cohen's d = 0.5 → medium)
- **σ** (standard deviation) từ pilot

\`\`\`
   n_per_arm = 2 * ((z_α + z_β) * σ / Δ)²
             = 2 * ((1.96 + 0.84) * 1.0 / 0.5)²
             = 63
\`\`\`

> ⚠️ Underpowered study = lãng phí + đạo đức kém (vẫn dùng học sinh làm subject).

## 3. 🎲 Randomization đúng cách

| Loại | Khi dùng |
|---|---|
| **Simple random** | n lớn (>200) |
| **Stratified** | Cần balance theo level/giới |
| **Block randomization** | Tránh imbalance đầu kỳ |
| **Cluster** (lớp/trường) | Khi can thiệp ở cấp lớp |

\`\`\`python
# Stratified by pre-test band
def stratified_assign(students):
    by_band = group_by(students, "pre_band")
    assignments = []
    for band, group in by_band.items():
        random.shuffle(group)
        half = len(group) // 2
        for i, s in enumerate(group):
            s.arm = "A" if i < half else "B"
        assignments.extend(group)
    return assignments
\`\`\`

## 4. 🙈 Blinding

- **Single-blind**: học sinh không biết mình thuộc nhóm nào.
- **Double-blind**: cả học sinh và rater không biết.
- EdTech khó full double-blind (giáo viên thấy can thiệp), nhưng rater có thể blind.

## 5. 📉 Threats to validity

| Threat | Mô tả | Cách xử lý |
|---|---|---|
| **Attrition** | Học sinh bỏ giữa chừng | Intent-to-treat analysis |
| **Hawthorne** | Hành vi đổi vì biết bị quan sát | Active control (không phải no-treatment) |
| **Novelty** | Hứng thú với "AI mới" tan dần | Đo ≥4 tuần |
| **Cross-contamination** | A xem can thiệp của B | Cluster by class |
| **Maturation** | Tiến bộ tự nhiên theo tuổi | Control group |`,
        theoryEn: `## 1. Why RCTs Are the Gold Standard

A **Randomised Controlled Trial (RCT)** assigns participants at random to a treatment or control arm. Because all confounders (motivation, prior knowledge, device, time of day) are distributed equally across arms, any post-treatment difference can be **causally attributed** to the intervention - something observational data can rarely prove.

## 2. Power Analysis - Don't Waste Your Sample

Before launch, compute the sample size needed to detect the **smallest effect you care about**. Three numbers drive everything:

| Parameter | Typical value |
|-----------|---------------|
| α (Type-I error) | 0.05 |
| β (Type-II error) | 0.20 → power = 0.80 |
| Cohen's d | 0.5 (medium) |

Formula: \`n_per_arm = 2 · ((z_α + z_β) · σ / Δ)²\`. For d = 0.5 you need ~63 per arm; for d = 0.3 you need ~175. An **underpowered** trial wastes both money and the participants' time - it's an ethical issue, not just a statistical one.

## 3. Randomisation Strategies

| Method | When to use |
|--------|-------------|
| **Simple random** | n > 200 |
| **Stratified** | Need balance on a known covariate (level, gender) |
| **Block randomisation** | Avoid run-of-the-mill imbalance early on |
| **Cluster** (class/school) | Intervention applied at group level |

Always **hash + seed** the random assignment so it's reproducible and auditable.

## 4. Blinding

- **Single-blind** - participants don't know their arm.
- **Double-blind** - neither participants nor raters know.
- True double-blind is rare in EdTech (teachers see the intervention), but **raters scoring outcomes** can and must be blinded.

## 5. Threats to Validity

| Threat | Mitigation |
|--------|-----------|
| **Attrition** | Pre-register intent-to-treat (ITT) analysis |
| **Hawthorne effect** | Use an **active** control, not no-treatment |
| **Novelty effect** | Run ≥ 4 weeks |
| **Cross-contamination** | Cluster-randomise by class |
| **Maturation** | Always have a control group |

## 6. Reporting Your RCT

CONSORT-style: report flow diagram, randomisation method, blinding status, ITT vs per-protocol results, effect size with 95% CI - never just p-values.`,
        code: `# Power calculation
import math
from scipy.stats import norm

def sample_size(effect, sigma=1.0, alpha=0.05, power=0.8):
    z_alpha = norm.ppf(1 - alpha/2)
    z_beta  = norm.ppf(power)
    n = 2 * ((z_alpha + z_beta) * sigma / effect) ** 2
    return math.ceil(n)

print(sample_size(0.5))   # → 63 per arm
print(sample_size(0.3))   # → 175 per arm (smaller effect → bigger n)`,
        codeLanguage: "python",
        exercise: "Tính n cần thiết cho RCT đo Δ = 0.3 band, σ = 0.8. Có khả thi với 1 lớp 30 học sinh không?",
        exerciseEn: "Compute n needed for an RCT with Δ = 0.3 band, σ = 0.8. Is it feasible with one 30-student class?",
        quiz: [
          { question: "Power = 0.8 nghĩa là?", options: ["80% confidence", "Xác suất phát hiện effect thật khi có thực = 80%", "Sample 80", "α = 0.8"], answer: 1, explanation: "Tránh false negative.", questionEn: "What does Power = 0.8 mean?", optionsEn: ["80% confidence", "The probability of detecting a true effect when it exists = 80%", "A sample of 80", "α = 0.8"], explanationEn: "It guards against false negatives." },
          { question: "Stratified randomization?", options: ["Random thuần", "Random TRONG TỪNG STRATUM để balance covariate", "Không random", "Cluster"], answer: 1, explanation: "Giảm imbalance giữa 2 arm.", questionEn: "What is stratified randomization?", optionsEn: ["Pure random assignment", "Randomizing WITHIN each stratum to balance a covariate", "No randomization", "Cluster randomization"], explanationEn: "It reduces imbalance between the two arms." },
          { question: "Intent-to-treat?", options: ["Bỏ học sinh không tuân thủ", "Phân tích theo ARM ĐƯỢC GÁN, kể cả ai bỏ", "Tính trung bình", "Outlier removal"], answer: 1, explanation: "Bảo vệ tính ngẫu nhiên.", questionEn: "What is intent-to-treat analysis?", optionsEn: ["Dropping non-compliant students", "Analyzing by the ASSIGNED arm, including dropouts", "Computing the mean", "Outlier removal"], explanationEn: "It protects the benefits of randomization." },
          { question: "Hawthorne effect?", options: ["Bug", "Hành vi đổi vì biết bị quan sát", "Tăng power", "Decoration"], answer: 1, explanation: "Dùng active control để cân bằng.", questionEn: "What is the Hawthorne effect?", optionsEn: ["A bug", "Behavior changing because subjects know they're being observed", "Increasing power", "Decoration"], explanationEn: "Use an active control to balance for it." },
          { question: "Cluster randomization khi nào?", options: ["Luôn dùng", "Khi can thiệp ở cấp lớp/trường (tránh contamination)", "Khi n nhỏ", "Random"], answer: 1, explanation: "Học sinh trong cùng lớp ảnh hưởng nhau.", questionEn: "When should you use cluster randomization?", optionsEn: ["Always", "When the intervention is applied at the class/school level (avoids contamination)", "When n is small", "Plain randomization"], explanationEn: "Students within the same class influence each other." },
        ],
      },
      {
        id: "edtech-rm-3",
        title: "Learning Analytics - event schema và metrics chuẩn",
        titleEn: "Learning Analytics - Event Schema & Standard Metrics",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 📊 Event schema chuẩn (xAPI / Caliper)

\`\`\`json
{
  "actor": {"id": "user-123", "role": "learner"},
  "verb": "completed",
  "object": {"id": "lesson-ielts-w-12", "type": "Lesson"},
  "context": {"course": "ielts-writing", "session": "sess-456"},
  "result": {"score": 7.5, "duration_sec": 1800, "success": true},
  "timestamp": "2026-06-10T14:30:00Z"
}
\`\`\`

> Theo chuẩn → tích hợp được với LMS (Moodle, Canvas) và dashboard.

## 2. 📈 5 metric vàng

| Metric | Định nghĩa | Cảnh báo |
|---|---|---|
| **DAU/MAU** | Active users 1 ngày / 30 ngày | <0.2 = engagement yếu |
| **Time-on-task** | Phút thực sự học | Cao nhưng score thấp = struggle |
| **Mastery rate** | % skill đạt threshold | Tiến độ thật |
| **Drop-off funnel** | % rời ở mỗi bước lesson | Spot UX vấn đề |
| **Helpfulness** (AI feature) | 👍 / total interactions | <50% = prompt cần sửa |

## 3. 🚨 Vanity vs. Actionable metrics

\`\`\`
❌ Vanity:    Total pageviews, registrations, "AI calls"
✅ Actionable: Mastery lift, completion rate, time-to-mastery
\`\`\`

## 4. 🔀 Cohort analysis

Theo dõi nhóm user theo tuần đăng ký:

\`\`\`
              Week 1  Week 2  Week 3  Week 4
Jan cohort    100%    62%     45%     38%   ← retention curve
Feb cohort    100%    71%     55%     48%   ← cải thiện sau update
Mar cohort    100%    68%     50%
\`\`\`

Curve dốc xuống nhanh tuần 1-2 = onboarding kém.

## 5. ⚙️ Pipeline tối thiểu

\`\`\`
   Client (web/mobile)
        │ POST /events (batched)
        ▼
   Ingest API → validate → queue (Kafka/PubSub)
        │
        ▼
   Warehouse (BigQuery/Postgres/Snowflake)
        │
        ▼
   dbt models: daily, mastery, funnel, retention
        │
        ▼
   Dashboard (Metabase/Superset)
\`\`\`

## 6. ⚠️ Privacy & GDPR

- **PII tách bảng**: events chỉ có \`user_hash\`.
- **Right to delete**: cascade delete khi user yêu cầu.
- **Aggregate only** cho public dashboard.
- **Retention**: raw events ≤ 2 năm, aggregate vĩnh viễn.`,
        theoryEn: `## 1. Standard Event Schemas - xAPI & Caliper

Two industry schemas dominate learning analytics:

- **xAPI (Experience API)** - flexible "actor / verb / object" triples (\`Tin Can\` API).
- **IMS Caliper** - strict but richer schema used by Canvas, Moodle and many universities.

\`\`\`json
{
  "actor": {"id": "user-123", "role": "learner"},
  "verb": "completed",
  "object": {"id": "lesson-ielts-w-12", "type": "Lesson"},
  "context": {"course": "ielts-writing", "ab_variant": "v2"},
  "result": {"score": 7.5, "duration_sec": 1800, "success": true},
  "timestamp": "2026-06-10T14:30:00Z"
}
\`\`\`

Sticking to a standard means dashboards, LMS exports and research collaborators can read your data immediately.

## 2. The Five Golden Metrics

| Metric | Definition | Warning sign |
|--------|-----------|--------------|
| **DAU / MAU** | Active 1d / active 30d | < 0.2 → weak habit |
| **Time-on-task** | Real time spent | High + low score = struggling |
| **Mastery rate** | % skills past threshold | True progress signal |
| **Drop-off funnel** | % leaving each lesson step | UX problem detector |
| **Helpfulness** | 👍 / total AI interactions | < 50% → prompt needs work |

## 3. Vanity vs Actionable

\`\`\`
❌ Vanity: pageviews, registrations, "AI calls served"
✅ Actionable: mastery lift, completion rate, time-to-mastery
\`\`\`

## 4. Cohort Analysis

Bucket users by signup week and track each cohort across time. Cohorts let you isolate the impact of releases that averages would hide. A steep drop in weeks 1-2 almost always means **onboarding** is the bottleneck.

## 5. Minimal Pipeline

\`\`\`
 client → ingest API → queue (Kafka/PubSub)
 → warehouse (BigQuery/Postgres) → dbt models
 → dashboard (Metabase/Superset)
\`\`\`

## 6. Privacy & Compliance

- Store **PII in a separate table**; events keep only \`user_hash\`.
- Implement **right-to-delete** with cascade across all stores.
- Public dashboards expose **aggregates only**.
- Retention: raw events ≤ 2 years, aggregates indefinite.
- Comply with GDPR-K / COPPA for users < 16.`,
        code: `-- dbt model: daily mastery
WITH daily AS (
  SELECT
    DATE(timestamp) AS day,
    actor->>'id'   AS user_id,
    object->>'id'  AS lesson_id,
    (result->>'score')::numeric AS score
  FROM raw_events
  WHERE verb = 'completed'
)
SELECT
  day,
  user_id,
  COUNT(DISTINCT lesson_id)                  AS lessons_today,
  AVG(score)                                 AS avg_score,
  COUNT(*) FILTER (WHERE score >= 0.8)       AS mastered_today
FROM daily
GROUP BY day, user_id;`,
        codeLanguage: "sql",
        exercise: "Định nghĩa 5 event cho app HaiEduTech (schema xAPI): start_lesson, answer_quiz, complete_lesson, ask_tutor, master_word.",
        exerciseEn: "Define 5 xAPI events for the HaiEduTech app.",
        quiz: [
          { question: "Vanity metric?", options: ["Mastery rate", "Total pageviews", "Time-to-mastery", "Helpfulness"], answer: 1, explanation: "Nhìn đẹp nhưng không cho biết user có HỌC ĐƯỢC không.", questionEn: "Which is a vanity metric?", optionsEn: ["Mastery rate", "Total pageviews", "Time-to-mastery", "Helpfulness"], explanationEn: "Looks good but doesn't tell you whether users are actually LEARNING." },
          { question: "Cohort analysis dùng để?", options: ["Tăng cost", "So sánh retention các nhóm user theo thời gian", "SEO", "Logging"], answer: 1, explanation: "Phát hiện effect của thay đổi sản phẩm.", questionEn: "What is cohort analysis used for?", optionsEn: ["Increasing costs", "Comparing retention of user groups over time", "SEO", "Logging"], explanationEn: "It reveals the effect of product changes." },
          { question: "xAPI có thuộc tính nào?", options: ["actor/verb/object/result", "title/body", "x/y/z", "id/value"], answer: 0, explanation: "Statement schema chuẩn.", questionEn: "Which attributes does xAPI have?", optionsEn: ["actor/verb/object/result", "title/body", "x/y/z", "id/value"], explanationEn: "The standard statement schema." },
          { question: "PII trong events?", options: ["Lưu trực tiếp", "Tách bảng, dùng user_hash trong events", "Không lưu gì", "Public"], answer: 1, explanation: "GDPR compliance.", questionEn: "How should PII be handled in events?", optionsEn: ["Store it directly", "Separate table, use user_hash inside events", "Store nothing at all", "Make it public"], explanationEn: "For GDPR compliance." },
          { question: "Time-on-task cao + score thấp?", options: ["Tốt", "Học sinh đang struggle, cần can thiệp", "OK", "Bug"], answer: 1, explanation: "Tín hiệu cần hỗ trợ.", questionEn: "High time-on-task + low score means?", optionsEn: ["It's fine", "The student is struggling and needs help", "Nothing special", "A bug"], explanationEn: "A signal that support is needed." },
        ],
      },
      {
        id: "edtech-rm-4",
        title: "A/B Testing - design, sample size, đọc kết quả",
        titleEn: "A/B Testing - Design, Sample Size, Reading Results",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🆎 A/B test cho EdTech ≠ A/B test e-commerce

| Khía cạnh | E-commerce | EdTech |
|---|---|---|
| **Outcome** | Conversion (1 click) | Learning gain (4 tuần) |
| **Lag** | <1 phút | Ngày → tuần |
| **Sample** | Hàng nghìn/ngày | Hàng trăm |
| **Risk** | $$ | Education quality |

→ Cần design thận trọng hơn, ưu tiên long-term outcome.

## 2. 📐 Sample size cho proportion test

\`\`\`
Δ (lift) = 5%, baseline = 60%, α = 0.05, power = 0.8
n_per_arm ≈ 1565
\`\`\`

Dùng \`statsmodels.stats.power.NormalIndPower\` hoặc Evan Miller calculator.

## 3. 🧪 Workflow chuẩn

\`\`\`
1. Hypothesis:  "New onboarding tăng day-7 retention từ 35% → 42%"
2. Sample size: n = 1565/arm (tính trước)
3. Randomize:   hash(user_id) % 100, treatment = <50
4. Run:         tối thiểu 1 chu kỳ user (>= 7 ngày)
5. Analyze:     2-proportion z-test, CI 95%
6. Decide:      ship / kill / iterate
\`\`\`

## 4. 🚫 Sai lầm chết người

- **Peeking**: Xem p-value mỗi ngày → false positive bùng nổ. Dùng SPRT hoặc Bayesian nếu cần early stopping.
- **Sample Ratio Mismatch (SRM)**: A và B lệch >5% → có bug routing.
- **Network effect**: user A nhìn thấy feature của B → contamination.
- **Multiple metrics fishing**: test 20 metric, báo 1 cái p<0.05.
- **Stopping early khi đẹp**: chỉ stop khi đủ n.

## 5. 🧮 Đọc kết quả

\`\`\`
control:    900/1500 = 60.0%
treatment:  990/1500 = 66.0%
Δ          = +6.0pp, lift = +10%
p-value    = 0.0008  ← significant
95% CI Δ   = [+2.5pp, +9.5pp]
\`\`\`

> Nếu CI bao gồm 0 → KHÔNG significant. p<0.05 chưa đủ - cần effect size đủ lớn để đáng triển khai.

## 6. 🎯 Bayesian A/B (alternative)

- Output: "P(treatment > control) = 96%"
- Trực quan cho stakeholder.
- Có thể stop early khi posterior đủ tin cậy.
- Cần prior - thường dùng weak prior.`,
        theoryEn: `## 1. EdTech A/B ≠ E-Commerce A/B

| Aspect | E-commerce | EdTech |
|--------|------------|--------|
| **Outcome** | Conversion (1 click) | Learning gain (4 weeks) |
| **Lag** | < 1 minute | Days → weeks |
| **Sample/day** | Thousands | Hundreds |
| **Risk** | Lost revenue | Damaged learning |

EdTech A/B must prioritise **long-term outcomes** and treat speed-to-decision as secondary.

## 2. Sample Size for Proportion Tests

Detecting a 5-point lift at baseline 60% (α=0.05, power=0.8) needs roughly **1,565 per arm**. Use \`statsmodels.stats.power.NormalIndPower\` or the Evan Miller calculator - never eyeball it.

## 3. Standard Workflow

\`\`\`
1. Hypothesis    "New onboarding lifts D7 retention 35% → 42%"
2. Sample size   n = 1565/arm (computed upfront)
3. Randomise     hash(user_id) % 100, treatment if < 50
4. Run           ≥ 1 user cycle (7+ days)
5. Analyse       2-proportion z-test + 95% CI
6. Decide        ship / kill / iterate
\`\`\`

## 4. Fatal Mistakes

- **Peeking** - checking p daily. False-positive rate explodes. Use SPRT or Bayesian only.
- **Sample Ratio Mismatch (SRM)** - split > 5% off design → routing bug; results invalid.
- **Network effects** - shared social/leaderboard features let A see B → contamination.
- **Multi-metric fishing** - testing 20 metrics, reporting the one p < 0.05.
- **Early stopping when it looks good** - only stop on power-met or pre-defined Bayesian rule.

## 5. Reading the Results

\`\`\`
control:   900/1500 = 60.0%
treatment: 990/1500 = 66.0%
Δ = +6.0pp, lift = +10%
p-value = 0.0008          ← significant
95% CI for Δ = [+2.5pp, +9.5pp]
\`\`\`

If the CI **crosses 0** → not significant, regardless of p. Always report effect size with CI; a tiny lift can be "significant" yet not worth shipping.

## 6. Bayesian A/B as an Alternative

Output is intuitive: *"P(treatment > control) = 96%"*. Stakeholders understand it instantly, and a Bayesian framework supports principled early stopping. Choose a weakly informative prior to avoid contaminating results with opinions.`,
        code: `# 2-proportion z-test
from statsmodels.stats.proportion import proportions_ztest

control   = (900, 1500)   # successes, n
treatment = (990, 1500)

z, p = proportions_ztest(
    count=[control[0], treatment[0]],
    nobs=[control[1], treatment[1]],
    alternative='larger'
)
print(f"z={z:.2f}  p={p:.4f}")
# z=3.16  p=0.0008  → significant`,
        codeLanguage: "python",
        exercise: "Thiết kế A/B test cho 'AI hint mới' với baseline mastery=55%, lift mong đợi=4pp. Sample size? Thời gian chạy với 200 user mới/ngày?",
        exerciseEn: "Design an A/B test for 'new AI hint' with baseline mastery=55%, expected lift=4pp.",
        quiz: [
          { question: "Peeking gây hại gì?", options: ["Tăng power", "Inflate false-positive rate", "Không vấn đề", "Tăng cost"], answer: 1, explanation: "Mỗi lần peek = 1 lần test, alpha tích lũy.", questionEn: "What harm does peeking cause?", optionsEn: ["Increases power", "Inflates the false-positive rate", "No issue", "Increases cost"], explanationEn: "Each peek is another test, so alpha accumulates." },
          { question: "SRM (Sample Ratio Mismatch)?", options: ["A và B lệch >5% → có bug routing", "Bình thường", "Tăng power", "Decoration"], answer: 0, explanation: "Tín hiệu kỹ thuật, không tin được kết quả.", questionEn: "What is SRM (Sample Ratio Mismatch)?", optionsEn: ["A and B off by >5% -> a routing bug", "Perfectly normal", "Increases power", "Decoration"], explanationEn: "A technical red flag; the results cannot be trusted." },
          { question: "EdTech A/B nên ưu tiên?", options: ["Conversion 1 phút", "Long-term outcome (mastery, retention)", "Pageviews", "Latency"], answer: 1, explanation: "Học tập cần thời gian thể hiện.", questionEn: "What should EdTech A/B tests prioritize?", optionsEn: ["1-minute conversion", "Long-term outcomes (mastery, retention)", "Pageviews", "Latency"], explanationEn: "Learning takes time to manifest." },
          { question: "CI bao gồm 0 nghĩa là?", options: ["Significant", "KHÔNG significant", "Bug", "Cần peeking"], answer: 1, explanation: "Effect có thể là 0 hoặc nghịch hướng.", questionEn: "A CI that includes 0 means?", optionsEn: ["Significant", "NOT significant", "A bug", "You need to peek more"], explanationEn: "The effect could be zero or even reversed." },
          { question: "Bayesian A/B output?", options: ["p-value", "P(treatment > control), trực quan", "z-score", "Effect size"], answer: 1, explanation: "Dễ hiểu cho stakeholder.", questionEn: "What does Bayesian A/B testing output?", optionsEn: ["A p-value", "P(treatment > control), intuitive", "A z-score", "Effect size"], explanationEn: "Easy for stakeholders to understand." },
        ],
      },
      {
        id: "edtech-rm-5",
        title: "Causal Inference khi không thể RCT - DiD, IV, RDD",
        titleEn: "Causal Inference Without RCT - DiD, IV, RDD",
        level: 5,
        difficulty: "advanced",
        theory: `## 1. 🤔 Khi nào không thể RCT?

- Vấn đề đạo đức (không thể "không cho" trẻ học toán).
- Quy mô lớn (đổi chính sách cho cả tỉnh).
- Data đã có (observational only).

→ Cần **quasi-experimental design**.

## 2. ⚖️ Difference-in-Differences (DiD)

So sánh xu hướng TRƯỚC và SAU can thiệp giữa nhóm treatment vs control:

\`\`\`
   Outcome
   ▲
   │              ← treatment group (got AI tutor)
   │           ●
   │         /
   │       /
   │     ●
   │   /          ← control group
   │  ●─────●─────●
   └──────────────────▶ time
       T-1  T0   T+1
            ↑
       intervention

   DiD = (Treat_post - Treat_pre) - (Ctrl_post - Ctrl_pre)
\`\`\`

**Giả định cốt lõi**: parallel trends pre-intervention. Phải plot và test.

## 3. 🎯 Instrumental Variable (IV)

Khi có biến **gây ra** treatment nhưng KHÔNG ảnh hưởng outcome trực tiếp:

\`\`\`
   IV: lottery       Treatment: AI app access       Outcome: score
       (random)  ───►       (chose to use)     ────►
                          ▲
                          │ confounder (motivation)
\`\`\`

Hai bước (2SLS):
1. Regress treatment trên IV → predicted treatment.
2. Regress outcome trên predicted treatment.

## 4. 📏 Regression Discontinuity (RDD)

Khi có **ngưỡng** quyết định ai nhận treatment:

\`\`\`
   Score on placement test:
   < 60 → remedial AI tutor    (treatment)
   ≥ 60 → standard class       (control)

   Compare students NGAY QUANH ngưỡng (e.g., 55-65)
   → giả định: gần như random ai ở 59 vs 61.
\`\`\`

\`\`\`
   post-score
        ▲
        │                    ●
        │              ●  ●
        │          ●   ●          ← gap = causal effect
        │      ●  ●        ●  ●
        │  ●                  ●
        └──────────────────────── pre-score
                       60 (cutoff)
\`\`\`

## 5. 🎨 Propensity Score Matching (PSM)

Match treated với control có **xác suất nhận treatment tương tự** (dựa trên covariates).

\`\`\`python
from sklearn.linear_model import LogisticRegression
ps_model = LogisticRegression().fit(X, treated)
df["ps"] = ps_model.predict_proba(X)[:, 1]
# Nearest-neighbor match within caliper 0.05
\`\`\`

## 6. 🚦 Sensitivity analysis

Quasi-experimental → luôn báo cáo:
- **Robustness checks**: thử nhiều specification.
- **Rosenbaum bounds**: kết quả còn đứng vững nếu có unobserved confounder bao nhiêu?
- **Placebo tests**: chạy DiD trên thời kỳ không có intervention - nên thấy 0.`,
        theoryEn: `## 1. When You Can't Run an RCT

Sometimes randomisation is impossible or unethical:

- You cannot **withhold** a beneficial AI tutor from half the students.
- The intervention is rolled out **province-wide** by policy.
- You only have **observational** historical data.

In these cases, **quasi-experimental designs** can still recover causal estimates - if their assumptions hold and you check them carefully.

## 2. Difference-in-Differences (DiD)

Compare the **change** in outcome over time between a treatment group and a control group:

\`\`\`
 DiD = (Treat_post − Treat_pre) − (Ctrl_post − Ctrl_pre)
\`\`\`

**Core assumption - parallel trends**: before the intervention, both groups moved together. You **must** plot the pre-period and run placebo tests on a fake intervention date.

## 3. Instrumental Variables (IV)

Need a variable that **causes** the treatment but does **not** affect the outcome directly (the "exclusion restriction"). Classic example: a lottery for app access acts as an instrument for actual usage. Estimated via 2-stage least squares (2SLS):

1. Regress treatment on IV → predicted treatment.
2. Regress outcome on predicted treatment.

A weak instrument inflates standard errors massively - check the first-stage F-statistic (≥ 10).

## 4. Regression Discontinuity (RDD)

When a threshold determines who gets treatment (e.g. placement score < 60 → remedial tutor), compare students **just above** vs **just below** the cutoff. Near the threshold, assignment is *as if* random.

\`\`\`
   post-score
        │            ●●●
        │         ●●●     ← gap = causal effect
        │       ●●●
        │  ●●●
        └──────────────────▶ pre-score
                   60 (cutoff)
\`\`\`

## 5. Propensity Score Matching (PSM)

Estimate \`P(treated | X)\` for everyone, then match each treated unit with a control of similar propensity score. Reduces confounding from observed covariates - but **cannot** fix unobserved confounders.

## 6. Sensitivity Analyses (Always!)

Any quasi-experimental claim must come with:

- **Robustness checks** - multiple specifications.
- **Rosenbaum bounds** - how strong would an unobserved confounder need to be to overturn the result?
- **Placebo tests** - apply the method to a period with no intervention; you should see ~0 effect.

If the result evaporates under any of these, the causal claim isn't credible.`,
        code: `# DiD with statsmodels
import statsmodels.formula.api as smf

# df has: outcome, treated (0/1), post (0/1), user_id
model = smf.ols(
    "outcome ~ treated * post + C(user_id)",
    data=df
).fit(cov_type="cluster", cov_kwds={"groups": df["user_id"]})

# Coefficient on treated:post = DiD estimate
print(model.summary())`,
        codeLanguage: "python",
        exercise: "Một tỉnh triển khai AI tutor cho lớp 9 từ 9/2025. Tỉnh láng giềng không. Bạn dùng method nào? Cần data gì?",
        exerciseEn: "A province rolls out AI tutor for grade 9 from Sep 2025; neighbor doesn't. Which method? What data?",
        quiz: [
          { question: "DiD giả định gì?", options: ["Random treatment", "Parallel trends pre-intervention", "Lottery", "Bayesian"], answer: 1, explanation: "Không có giả định này → DiD không tin được.", questionEn: "What does DiD assume?", optionsEn: ["Random treatment assignment", "Parallel trends before the intervention", "A lottery", "A Bayesian prior"], explanationEn: "Without this assumption, DiD is not credible." },
          { question: "RDD dùng khi?", options: ["Random", "Có ngưỡng quyết định treatment - so sánh quanh cutoff", "Có lottery", "Đủ sample"], answer: 1, explanation: "Gần ngưỡng ≈ random.", questionEn: "When do you use RDD?", optionsEn: ["Pure randomization", "There is a threshold determining treatment - compare around the cutoff", "There is a lottery", "You have enough sample"], explanationEn: "Near the cutoff, assignment is ≈ random." },
          { question: "IV cần?", options: ["RCT", "Biến gây treatment nhưng không ảnh hưởng outcome trực tiếp", "Sample lớn", "Cutoff"], answer: 1, explanation: "Exclusion restriction.", questionEn: "What does an instrumental variable (IV) require?", optionsEn: ["An RCT", "A variable that causes treatment but doesn't affect the outcome directly", "A large sample", "A cutoff"], explanationEn: "The exclusion restriction." },
          { question: "Placebo test trong DiD?", options: ["Lừa đảo", "Chạy DiD ở thời kỳ không có intervention - nên thấy effect ≈ 0", "Tăng power", "Decoration"], answer: 1, explanation: "Validation method.", questionEn: "What is a placebo test in DiD?", optionsEn: ["A fraud", "Running DiD on a period with no intervention - effect should be ≈ 0", "Increasing power", "Decoration"], explanationEn: "A validation method." },
          { question: "PSM matches dựa trên?", options: ["Outcome", "Propensity score = P(treated | X)", "Random", "Age only"], answer: 1, explanation: "Cân bằng covariate.", questionEn: "PSM matches units based on?", optionsEn: ["The outcome", "Propensity score = P(treated | X)", "Random assignment", "Age only"], explanationEn: "It balances observed covariates." },
        ],
      },
      {
        id: "edtech-rm-6",
        title: "Đạo đức nghiên cứu trẻ em + viết paper publishable",
        titleEn: "Research Ethics with Children + Writing Publishable Papers",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🛡️ IRB + Đạo đức với minor

| Bước | Yêu cầu |
|---|---|
| **IRB approval** | Bắt buộc trước khi thu data (kể cả pilot) |
| **Parental consent** | Văn bản, có chữ ký, dễ hiểu |
| **Child assent** | Trẻ ≥7 tuổi tự đồng ý (kèm hình minh hoạ) |
| **Right to withdraw** | Bất kỳ lúc nào, không hệ luỵ |
| **Data minimization** | Chỉ thu cái thực sự cần |
| **De-identification** | Hash + tách PII trước khi lưu |
| **Equity** | Đảm bảo control không bị "thiệt" nghiêm trọng |

## 2. 📝 Cấu trúc paper EdTech chuẩn (IMRaD)

\`\`\`
1. Introduction
   - Vấn đề + gap + đóng góp (3-5 câu cuối intro = roadmap)
2. Related work
   - 3 cụm: pedagogy, technology, prior empirical
3. Method
   - Participants, design, intervention, measures, analysis
   - Đủ chi tiết để REPLICATE
4. Results
   - Tables/figures với CI, effect size, không chỉ p-value
5. Discussion
   - Interpretation, limitations, threats, future work
6. Conclusion
   - 1 đoạn: take-away + impact
\`\`\`

## 3. 📊 Báo cáo statistics đầy đủ (APA)

\`\`\`
❌ "p < 0.05, significant."
✅ "Treatment group scored higher than control,
    M_T = 6.8 (SD=0.9), M_C = 6.2 (SD=1.0),
    t(118) = 3.42, p = .0008, Cohen's d = 0.62,
    95% CI [0.25, 0.99]."
\`\`\`

## 4. 🎯 Conference vs Journal targets

| Venue | Vibe | Khi nào |
|---|---|---|
| **AIED** (Springer) | AI in Education | LLM tutor, RAG, NLP |
| **EDM** | Educational Data Mining | Learning analytics, clustering |
| **LAK** | Learning Analytics | Behavioral, dashboard |
| **L@S** (ACM) | Learning at Scale | MOOC, large-scale |
| **CHI** | HCI | Interaction, UX |
| **Computers & Education** (Elsevier) | Journal | Empirical, longer |

## 5. 🚀 Tăng cơ hội publish

1. **Pre-registration** + công khai code/data.
2. **Replication** của paper nổi tiếng (dễ accept hơn người nghĩ).
3. **Negative results** vẫn publish được ở venue chuyên (PLOS).
4. **Open peer review** (OpenReview) - feedback sớm.
5. **Hợp tác với supervisor đã publish ở venue mục tiêu**.

## 6. 🧭 PhD-track checklist (EdTech)

- [ ] 1-2 first-author paper trước khi apply.
- [ ] Code + data trên GitHub/OSF.
- [ ] Research statement: vấn đề, method strength, vision 5 năm.
- [ ] Email 3-5 supervisor có fit (đọc kỹ paper họ).
- [ ] Funding plan: scholarship + RA position.`,
        theoryEn: `## 1. Research Ethics with Minors

Working with children raises the ethical bar dramatically. Every EdTech study with under-18s must satisfy:

| Requirement | Detail |
|-------------|--------|
| **IRB approval** | Mandatory before any data collection, including pilots |
| **Parental consent** | Signed, written, in language the parent reads fluently |
| **Child assent** | Children ≥ 7 give their own assent, with pictures if needed |
| **Right to withdraw** | At any time, with no penalty or loss of service |
| **Data minimisation** | Collect only what the RQ requires |
| **De-identification** | Hash + isolate PII before any analysis store |
| **Equity** | Control arm must not be meaningfully harmed (use active control) |

## 2. IMRaD Paper Structure

Almost every EdTech journal expects **IMRaD**:

1. **Introduction** - problem, gap, contribution (last 3-5 sentences = roadmap).
2. **Related Work** - group by pedagogy / technology / prior empirical.
3. **Method** - participants, design, intervention, measures, analysis. *Enough detail to replicate.*
4. **Results** - tables/figures with effect sizes and CIs, not bare p-values.
5. **Discussion** - interpretation, limitations, validity threats, future work.
6. **Conclusion** - one paragraph: take-away + impact.

## 3. APA-Style Statistical Reporting

\`\`\`
❌ "p < 0.05, significant."
✅ "Treatment scored higher than control,
    M_T = 6.8 (SD=0.9), M_C = 6.2 (SD=1.0),
    t(118) = 3.42, p = .0008, Cohen's d = 0.62,
    95% CI [0.25, 0.99]."
\`\`\`

## 4. Where to Submit

| Venue | Vibe | Good for |
|-------|------|----------|
| **AIED** (Springer) | AI in Education | LLM tutors, RAG, NLP |
| **EDM** | Educational Data Mining | Learning analytics |
| **LAK** | Learning Analytics | Behavioural, dashboards |
| **L@S** (ACM) | Learning at Scale | MOOC, large-scale |
| **CHI** | HCI | Interaction, UX |
| **Computers & Education** | Journal | Empirical, longer form |

## 5. Boosting Your Acceptance Odds

1. **Pre-register** + release code & data publicly.
2. **Replication studies** of well-known papers are easier to accept than people think.
3. **Negative results** publish in dedicated venues (PLOS, *Journal of Negative Results*).
4. Use **OpenReview** for early peer feedback.
5. Co-author with a supervisor who has previously published at your target venue.

## 6. PhD-Track Checklist (EdTech)

- 1-2 first-author papers before applying.
- Code + data on GitHub or OSF.
- Research statement: problem, methodological strength, 5-year vision.
- Email 3-5 supervisors whose recent work genuinely fits.
- Funding plan: scholarship + RA position.`,
        code: `# Research statement skeleton (markdown)
statement = """
# Research Statement - PhD in EdTech

## Vision (5 years)
Build adaptive AI tutors that **measurably** improve mastery
for under-served learners (e.g. rural Vietnam, Finnish migrants).

## Past work
- Built HaiEduTech (12k+ active learners, 60+ Edge Functions)
- Empirical: A/B tested LLM hints, +0.3 IELTS band, n=240

## PhD project (proposal)
RQ: Can FSRS-tuned LLM hints close the mastery gap between
    high-SES and low-SES learners in a 12-week trial?

## Why this lab
Prof. X works on equitable adaptive systems (paper 2024)
and supervises real-world EdTech deployments.
"""

print(statement)`,
        codeLanguage: "python",
        exercise: "Viết outline 1 paper bạn muốn submit cho AIED 2027 (RQ, method, expected contribution, 5 references).",
        exerciseEn: "Outline a paper you'd submit to AIED 2027 (RQ, method, contribution, 5 refs).",
        quiz: [
          { question: "Trẻ ≥7 tuổi cần?", options: ["Chỉ parental consent", "Parental consent + CHILD ASSENT", "Không cần gì", "IRB chỉ là gợi ý"], answer: 1, explanation: "Đạo đức + luật yêu cầu cả hai.", questionEn: "Children aged 7+ require?", optionsEn: ["Parental consent only", "Parental consent + CHILD ASSENT", "Nothing at all", "IRB approval is merely a suggestion"], explanationEn: "Both ethics and law require both." },
          { question: "Báo cáo statistics nên có?", options: ["Chỉ p-value", "Mean, SD, t-stat, p, effect size, CI", "Chỉ effect size", "Chỉ CI"], answer: 1, explanation: "APA chuẩn.", questionEn: "A statistical report should include?", optionsEn: ["Only the p-value", "Mean, SD, t-stat, p, effect size, CI", "Only effect size", "Only the CI"], explanationEn: "Standard APA reporting." },
          { question: "Replication study?", options: ["Bị chê", "Có giá trị + dễ accept hơn người nghĩ", "Cấm", "Chỉ cho PhD"], answer: 1, explanation: "Cộng đồng đang khuyến khích replication.", questionEn: "Replication studies?", optionsEn: ["Are looked down upon", "Have value and are easier to get accepted than people think", "Are forbidden", "Are only for PhD students"], explanationEn: "The community is actively encouraging replication." },
          { question: "AIED tập trung?", options: ["E-commerce", "AI in Education", "Hardware", "Robotics"], answer: 1, explanation: "Venue uy tín cho LLM tutor research.", questionEn: "What does AIED focus on?", optionsEn: ["E-commerce", "AI in Education", "Hardware", "Robotics"], explanationEn: "A respected venue for LLM tutor research." },
          { question: "Equity trong RCT EdTech?", options: ["Không cần lo", "Đảm bảo control không thiệt thòi nghiêm trọng (vd có active control)", "Chỉ teach treatment", "Random treatment"], answer: 1, explanation: "Đạo đức không cho phép 'bỏ' học sinh.", questionEn: "Equity in an EdTech RCT means?", optionsEn: ["No need to worry about it", "Ensuring the control group isn't seriously disadvantaged (e.g. an active control)", "Only teaching the treatment group", "Random treatment"], explanationEn: "Ethics do not allow 'abandoning' students." },
        ],
      },
    ],
  },
];
