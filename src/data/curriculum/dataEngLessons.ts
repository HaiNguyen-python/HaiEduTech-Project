// Data Engineering curriculum — 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const dataEngModules: ExtendedProgrammingModule[] = [
  {
    id: "de-pandas-basics",
    title: "Pandas cơ bản",
    titleEn: "Pandas Basics",
    icon: "🐼",
    color: "from-amber-500 to-orange-600",
    description: "DataFrame, Series, đọc/ghi dữ liệu",
    descriptionEn: "DataFrame, Series, reading/writing data",
    course: "data-eng",
    lessons: [
      {
        id: "de-pd-1", title: "DataFrame & Series", titleEn: "DataFrame & Series",
        level: 1, difficulty: "beginner",
        theory: "**Pandas** — thư viện xử lý dữ liệu số 1 của Python.\n\n**Series:** Mảng 1 chiều có label\n**DataFrame:** Bảng 2 chiều (rows × columns)\n\n**Tạo DataFrame:**\n- Từ dict: `pd.DataFrame({'col': [values]})`\n- Từ CSV: `pd.read_csv('file.csv')`\n\n**Thao tác cơ bản:**\n- `df.head()`, `df.tail()`, `df.shape`\n- `df.describe()` — thống kê nhanh\n- `df['col']` — chọn cột\n- `df.iloc[0]` — chọn dòng theo index",
        theoryEn: "**Pandas** — Python's #1 data processing library.\n\n**Series:** 1D labeled array\n**DataFrame:** 2D table (rows × columns)\n\n**Basic operations:** head(), describe(), column selection, iloc",
        code: `import pandas as pd
import numpy as np

# Create DataFrame
data = {
    'name': ['An', 'Binh', 'Chi', 'Dung', 'Em'],
    'age': [22, 25, 23, 28, 21],
    'score': [85, 92, 78, 95, 88],
    'city': ['HCM', 'HN', 'HCM', 'DN', 'HN']
}
df = pd.DataFrame(data)

print("📊 DataFrame:")
print(df)
print(f"\\nShape: {df.shape}")
print(f"\\n📈 Statistics:")
print(df.describe())

# Filtering
print(f"\\n🔍 Students with score > 85:")
print(df[df['score'] > 85][['name', 'score']])

# Adding columns
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B' if x >= 80 else 'C')
print(f"\\n🎓 With grades:")
print(df[['name', 'score', 'grade']])`,
        codeLanguage: "python",
        exercise: "Tạo DataFrame với 10 sinh viên, tính trung bình score theo city, tìm sinh viên có điểm cao nhất.",
        exerciseEn: "Create a DataFrame with 10 students, calculate average score by city, find the highest scorer.",
        quiz: [
          { question: "DataFrame khác Series ở điểm nào?", options: ["Giống nhau", "DataFrame 2D, Series 1D", "Series nhanh hơn", "DataFrame chỉ chứa số"], answer: 1, explanation: "Series là mảng 1 chiều (1 cột), DataFrame là bảng 2 chiều (nhiều cột, mỗi cột là 1 Series)." }
        ]
      }
    ]
  },
  {
    id: "de-data-cleaning",
    title: "Data Cleaning",
    titleEn: "Data Cleaning",
    icon: "🧹",
    color: "from-amber-500 to-orange-600",
    description: "Xử lý missing values, duplicates, outliers",
    descriptionEn: "Handle missing values, duplicates, outliers",
    course: "data-eng",
    lessons: [
      {
        id: "de-clean-1", title: "Missing Values & Duplicates", titleEn: "Missing Values & Duplicates",
        level: 2, difficulty: "beginner",
        theory: "**Data Cleaning** — bước quan trọng nhất trong pipeline dữ liệu.\n\n**Missing Values:**\n- `df.isnull().sum()` — đếm NULL mỗi cột\n- `df.dropna()` — xóa dòng có NULL\n- `df.fillna(value)` — thay NULL bằng giá trị\n- `df.interpolate()` — nội suy\n\n**Duplicates:**\n- `df.duplicated().sum()` — đếm trùng\n- `df.drop_duplicates()` — xóa trùng\n\n**Outliers:**\n- IQR method: Q1 - 1.5×IQR < x < Q3 + 1.5×IQR\n- Z-score: |z| > 3 là outlier",
        theoryEn: "**Data Cleaning** — the most important step in a data pipeline.\n\n**Missing Values:** isnull(), dropna(), fillna(), interpolate()\n**Duplicates:** duplicated(), drop_duplicates()\n**Outliers:** IQR method, Z-score",
        code: `import pandas as pd
import numpy as np

# Messy data
df = pd.DataFrame({
    'name': ['An', 'Binh', None, 'An', 'Chi', 'Dung'],
    'age': [22, np.nan, 23, 22, 25, np.nan],
    'score': [85, 92, 78, 85, 150, 88],  # 150 is outlier
})

print("🔴 Raw Data:")
print(df)
print(f"\\nMissing values:\\n{df.isnull().sum()}")
print(f"Duplicates: {df.duplicated().sum()}")

# Clean: fill missing, remove duplicates
df_clean = df.copy()
df_clean['name'] = df_clean['name'].fillna('Unknown')
df_clean['age'] = df_clean['age'].fillna(df_clean['age'].median())
df_clean = df_clean.drop_duplicates()

# Detect outliers using IQR
Q1 = df_clean['score'].quantile(0.25)
Q3 = df_clean['score'].quantile(0.75)
IQR = Q3 - Q1
outliers = df_clean[(df_clean['score'] < Q1 - 1.5*IQR) | (df_clean['score'] > Q3 + 1.5*IQR)]
print(f"\\n⚠️ Outliers detected: {len(outliers)}")
print(outliers)

# Remove outliers
df_clean = df_clean[~df_clean.index.isin(outliers.index)]
print(f"\\n✅ Clean Data ({len(df_clean)} rows):")
print(df_clean)`,
        codeLanguage: "python",
        exercise: "Tạo dataset 100 dòng với 15% missing values và 5% outliers. Clean hoàn toàn và báo cáo thay đổi.",
        exerciseEn: "Create a 100-row dataset with 15% missing and 5% outliers. Clean it and report changes.",
        quiz: [
          { question: "Khi nào dùng fillna() thay vì dropna()?", options: ["Luôn dùng fillna", "Khi ít missing values và muốn giữ data", "Khi có nhiều missing", "Không bao giờ"], answer: 1, explanation: "fillna() giữ được dòng dữ liệu, phù hợp khi ít missing và các cột khác vẫn có giá trị. dropna() mất dữ liệu." }
        ]
      }
    ]
  },
  {
    id: "de-ingestion",
    title: "Data Ingestion",
    titleEn: "Data Ingestion",
    icon: "📥",
    color: "from-amber-500 to-orange-600",
    description: "CSV, JSON, API — thu thập dữ liệu",
    descriptionEn: "CSV, JSON, API — data collection",
    course: "data-eng",
    lessons: [
      {
        id: "de-ingest-1", title: "Đọc nhiều nguồn dữ liệu", titleEn: "Reading Multiple Data Sources",
        level: 2, difficulty: "beginner",
        theory: "**Data Ingestion** — thu thập dữ liệu từ nhiều nguồn.\n\n**Formats:**\n- CSV: `pd.read_csv()` — phổ biến nhất\n- JSON: `pd.read_json()` hoặc `json.loads()`\n- Excel: `pd.read_excel()`\n- SQL: `pd.read_sql()`\n- API: `requests.get()` → parse JSON\n\n**Best Practices:**\n- Validate schema sau khi đọc\n- Log metadata (rows, columns, types)\n- Handle encoding issues (UTF-8)\n- Incremental loading (chỉ load dữ liệu mới)",
        theoryEn: "**Data Ingestion** — collecting data from multiple sources.\n\n**Formats:** CSV, JSON, Excel, SQL, API\n\n**Best Practices:** Schema validation, metadata logging, encoding handling, incremental loading",
        code: `import json
import csv
from io import StringIO

# Simulate CSV ingestion
csv_data = """name,age,score
An,22,85
Binh,25,92
Chi,23,78"""

reader = csv.DictReader(StringIO(csv_data))
csv_rows = list(reader)
print(f"📄 CSV: {len(csv_rows)} rows loaded")
for row in csv_rows:
    print(f"  {row}")

# Simulate JSON ingestion
json_data = '[{"name":"Dung","age":28,"score":95},{"name":"Em","age":21,"score":88}]'
json_rows = json.loads(json_data)
print(f"\\n📋 JSON: {len(json_rows)} records loaded")
for row in json_rows:
    print(f"  {row}")

# Schema validation
def validate_schema(data, required_fields, field_types):
    errors = []
    for i, row in enumerate(data):
        for field in required_fields:
            if field not in row:
                errors.append(f"Row {i}: missing '{field}'")
        for field, expected_type in field_types.items():
            if field in row:
                try:
                    expected_type(row[field])
                except (ValueError, TypeError):
                    errors.append(f"Row {i}: '{field}' is not {expected_type.__name__}")
    return errors

errors = validate_schema(csv_rows, ['name', 'age'], {'age': int, 'score': int})
print(f"\\n✅ Validation: {len(errors)} errors" if errors else "\\n✅ Schema valid!")`,
        codeLanguage: "python",
        exercise: "Xây dựng DataIngester class đọc CSV và JSON, tự động detect schema và báo cáo quality.",
        exerciseEn: "Build a DataIngester class that reads CSV and JSON, auto-detects schema and reports quality.",
        quiz: [
          { question: "Incremental loading là gì?", options: ["Load tất cả dữ liệu", "Chỉ load dữ liệu mới/thay đổi", "Load ngẫu nhiên", "Load song song"], answer: 1, explanation: "Incremental loading chỉ nạp dữ liệu mới hoặc đã thay đổi, tiết kiệm thời gian và tài nguyên." }
        ]
      }
    ]
  },
  {
    id: "de-etl",
    title: "ETL Pipeline Design",
    titleEn: "ETL Pipeline Design",
    icon: "🔄",
    color: "from-amber-500 to-orange-600",
    description: "Extract, Transform, Load — thiết kế pipeline",
    descriptionEn: "Extract, Transform, Load — pipeline design",
    course: "data-eng",
    lessons: [
      {
        id: "de-etl-1", title: "ETL vs ELT", titleEn: "ETL vs ELT",
        level: 3, difficulty: "intermediate",
        theory: "**ETL (Extract → Transform → Load):**\n- Transform trước khi load vào warehouse\n- Phù hợp: On-premise, structured data\n\n**ELT (Extract → Load → Transform):**\n- Load raw data trước, transform trong warehouse\n- Phù hợp: Cloud (BigQuery, Snowflake)\n\n**Pipeline Components:**\n- Source connectors: đọc từ DB, API, files\n- Transformations: clean, aggregate, join\n- Sink: ghi vào destination\n- Scheduling: cron, event-driven\n- Monitoring: alerts, data quality checks",
        theoryEn: "**ETL:** Transform before loading\n**ELT:** Load raw, transform in warehouse\n\n**Components:** Source connectors, Transformations, Sink, Scheduling, Monitoring",
        code: `import json
from datetime import datetime

class ETLPipeline:
    def __init__(self, name):
        self.name = name
        self.log = []

    def _log(self, step, msg):
        entry = {"time": datetime.now().strftime("%H:%M:%S"), "step": step, "msg": msg}
        self.log.append(entry)
        print(f"  [{entry['time']}] {step}: {msg}")

    def extract(self, source):
        self._log("EXTRACT", f"Reading {len(source)} records")
        return source

    def transform(self, data, transformations):
        self._log("TRANSFORM", f"Applying {len(transformations)} transformations")
        result = data.copy()
        for name, fn in transformations:
            result = [fn(row) for row in result]
            self._log("TRANSFORM", f"  ✓ {name}: {len(result)} records")
        return result

    def load(self, data, destination):
        self._log("LOAD", f"Writing {len(data)} records to {destination}")
        return {"records": len(data), "destination": destination}

    def run(self, source, transformations, destination):
        print(f"🔄 Pipeline: {self.name}")
        print("=" * 50)
        raw = self.extract(source)
        transformed = self.transform(raw, transformations)
        result = self.load(transformed, destination)
        self._log("DONE", f"Pipeline complete! {result}")
        return result

# Run pipeline
source_data = [
    {"name": "an", "age": "22", "score": "85"},
    {"name": "binh", "age": "25", "score": "92"},
    {"name": "", "age": "23", "score": "78"},
]

transforms = [
    ("Capitalize names", lambda r: {**r, "name": r["name"].title() if r["name"] else "Unknown"}),
    ("Cast types", lambda r: {**r, "age": int(r["age"]), "score": int(r["score"])}),
    ("Add grade", lambda r: {**r, "grade": "A" if r["score"] >= 90 else "B" if r["score"] >= 80 else "C"}),
]

pipeline = ETLPipeline("Student Scores")
pipeline.run(source_data, transforms, "data_warehouse.students")`,
        codeLanguage: "python",
        exercise: "Mở rộng ETLPipeline: thêm error handling, retry logic, và data quality report.",
        exerciseEn: "Extend ETLPipeline: add error handling, retry logic, and data quality report.",
        quiz: [
          { question: "ELT khác ETL ở điểm nào?", options: ["Giống nhau", "ELT transform trong warehouse sau khi load", "ETL nhanh hơn", "ELT không cần transform"], answer: 1, explanation: "ELT load raw data vào warehouse trước, rồi dùng sức mạnh compute của warehouse để transform." }
        ]
      }
    ]
  },
  {
    id: "de-data-modeling",
    title: "Data Modeling",
    titleEn: "Data Modeling",
    icon: "🏗️",
    color: "from-amber-500 to-orange-600",
    description: "Star Schema, Snowflake, Dimensional Modeling",
    descriptionEn: "Star Schema, Snowflake, Dimensional Modeling",
    course: "data-eng",
    lessons: [
      {
        id: "de-model-1", title: "Star & Snowflake Schema", titleEn: "Star & Snowflake Schema",
        level: 3, difficulty: "intermediate",
        theory: "**Dimensional Modeling** — thiết kế warehouse cho analytics.\n\n**Fact Table:** Chứa metrics (số lượng, doanh thu)\n- Thường rất lớn\n- Foreign keys đến Dimensions\n\n**Dimension Table:** Chứa mô tả (sản phẩm, thời gian, khách hàng)\n- Thường nhỏ hơn\n- Attributes dùng để filter/group\n\n**Star Schema:**\n- Fact ở trung tâm, Dimensions xung quanh\n- Đơn giản, queries nhanh\n\n**Snowflake Schema:**\n- Dimensions được normalize thêm\n- Tiết kiệm storage nhưng queries phức tạp hơn",
        theoryEn: "**Dimensional Modeling** — warehouse design for analytics.\n\n**Fact Table:** Metrics (quantities, revenue)\n**Dimension Table:** Descriptions (product, time, customer)\n\n**Star Schema:** Fact in center, Dimensions around — simple, fast queries\n**Snowflake Schema:** Normalized dimensions — saves storage, complex queries",
        code: `# Star Schema Design
print("⭐ Star Schema: E-Commerce")
print("=" * 50)

schema = {
    "fact_sales": {
        "type": "FACT",
        "columns": ["sale_id", "date_key", "product_key", "customer_key", "store_key",
                     "quantity", "unit_price", "discount", "total_amount"],
        "metrics": ["quantity", "unit_price", "discount", "total_amount"]
    },
    "dim_date": {
        "type": "DIMENSION",
        "columns": ["date_key", "date", "day_of_week", "month", "quarter", "year", "is_holiday"]
    },
    "dim_product": {
        "type": "DIMENSION",
        "columns": ["product_key", "name", "category", "brand", "price"]
    },
    "dim_customer": {
        "type": "DIMENSION",
        "columns": ["customer_key", "name", "email", "city", "segment"]
    },
    "dim_store": {
        "type": "DIMENSION",
        "columns": ["store_key", "name", "city", "region", "manager"]
    },
}

for table, info in schema.items():
    icon = "📊" if info["type"] == "FACT" else "📋"
    print(f"\\n{icon} {table} ({info['type']})")
    for col in info["columns"]:
        marker = "🔑" if col.endswith("_key") or col.endswith("_id") else "  "
        is_metric = "📈" if info.get("metrics") and col in info["metrics"] else "  "
        print(f"  {marker}{is_metric} {col}")

# Sample query
print("\\n🔍 Sample Query: Monthly revenue by category")
print("""
SELECT d.month, d.year, p.category,
       SUM(f.total_amount) AS revenue,
       COUNT(*) AS transactions
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
GROUP BY d.month, d.year, p.category
ORDER BY d.year, d.month;
""")`,
        codeLanguage: "python",
        exercise: "Thiết kế Star Schema cho hệ thống giáo dục: fact_enrollments với dim_student, dim_course, dim_date.",
        exerciseEn: "Design a Star Schema for an education system: fact_enrollments with dim_student, dim_course, dim_date.",
        quiz: [
          { question: "Fact table chứa gì?", options: ["Mô tả chi tiết", "Metrics đo lường (doanh thu, số lượng)", "Chỉ primary keys", "Dữ liệu cũ"], answer: 1, explanation: "Fact table chứa các số liệu đo lường (measures) như doanh thu, số lượng, cùng foreign keys đến dimensions." }
        ]
      }
    ]
  },
  {
    id: "de-warehousing",
    title: "Data Warehousing",
    titleEn: "Data Warehousing",
    icon: "🏛️",
    color: "from-amber-500 to-orange-600",
    description: "BigQuery, Snowflake, OLAP concepts",
    descriptionEn: "BigQuery, Snowflake, OLAP concepts",
    course: "data-eng",
    lessons: [
      {
        id: "de-wh-1", title: "OLAP & Warehouse Concepts", titleEn: "OLAP & Warehouse Concepts",
        level: 3, difficulty: "intermediate",
        theory: "**OLTP vs OLAP:**\n- OLTP: Online Transaction Processing — ngân hàng, e-commerce\n- OLAP: Online Analytical Processing — reporting, BI\n\n**Data Warehouse:**\n- Lưu trữ dữ liệu lịch sử, tối ưu cho đọc\n- Columnar storage: lưu theo cột (nhanh cho analytics)\n- Partitioning: chia bảng lớn thành phần nhỏ\n- Clustering: sắp xếp dữ liệu trong partition\n\n**Modern Cloud DW:**\n- BigQuery (Google): Serverless, pay-per-query\n- Snowflake: Separate compute & storage\n- Redshift (AWS): Columnar, parallel processing",
        theoryEn: "**OLTP vs OLAP:** Transactions vs Analytics\n\n**Warehouse features:** Columnar storage, Partitioning, Clustering\n\n**Cloud DW:** BigQuery, Snowflake, Redshift",
        code: `# OLAP Operations Simulation
import numpy as np

# Simulated sales cube
sales_data = []
products = ["Laptop", "Phone", "Tablet"]
regions = ["North", "South", "East"]
quarters = ["Q1", "Q2", "Q3", "Q4"]

np.random.seed(42)
for p in products:
    for r in regions:
        for q in quarters:
            sales_data.append({
                "product": p, "region": r, "quarter": q,
                "revenue": np.random.randint(10000, 100000),
                "units": np.random.randint(50, 500)
            })

print("🏛️ OLAP Operations Demo")
print("=" * 50)

# Roll-up: Quarter → Year
print("\\n📊 ROLL-UP (Quarter → Annual)")
annual = {}
for s in sales_data:
    key = (s["product"], s["region"])
    annual[key] = annual.get(key, 0) + s["revenue"]
for (p, r), rev in sorted(annual.items()):
    print(f"  {p:>8} | {r:>6} | \${rev:>8,}")

# Drill-down: By product
print("\\n🔍 DRILL-DOWN (Product: Laptop by quarter)")
for s in sales_data:
    if s["product"] == "Laptop" and s["region"] == "North":
        print(f"  {s['quarter']}: \${s['revenue']:,} ({s['units']} units)")

# Slice: Only Q1
print("\\n🔪 SLICE (Only Q1)")
q1 = [s for s in sales_data if s["quarter"] == "Q1"]
for s in q1:
    print(f"  {s['product']:>8} | {s['region']:>6} | \${s['revenue']:>8,}")`,
        codeLanguage: "python",
        exercise: "Implement PIVOT operation: chuyển đổi dữ liệu từ dạng dài (rows) sang dạng rộng (columns).",
        exerciseEn: "Implement PIVOT: transform data from long format (rows) to wide format (columns).",
        quiz: [
          { question: "Columnar storage nhanh hơn row-based khi nào?", options: ["INSERT nhiều", "SELECT tất cả cột", "Aggregate trên ít cột (SUM, AVG)", "UPDATE thường xuyên"], answer: 2, explanation: "Columnar storage chỉ đọc các cột cần thiết, rất nhanh cho queries analytics chỉ cần vài cột." }
        ]
      }
    ]
  },
  {
    id: "de-batch-stream",
    title: "Batch vs Stream Processing",
    titleEn: "Batch vs Stream Processing",
    icon: "⚡",
    color: "from-amber-500 to-orange-600",
    description: "Batch processing, streaming, micro-batch",
    descriptionEn: "Batch processing, streaming, micro-batch",
    course: "data-eng",
    lessons: [
      {
        id: "de-bs-1", title: "Batch & Streaming", titleEn: "Batch & Streaming",
        level: 4, difficulty: "advanced",
        theory: "**Batch Processing:**\n- Xử lý dữ liệu theo lô (hourly, daily)\n- Tools: Spark, Pandas, dbt\n- Ưu: Throughput cao, dễ debug\n\n**Stream Processing:**\n- Xử lý real-time từng event\n- Tools: Kafka, Flink, Spark Streaming\n- Ưu: Latency thấp, phản hồi nhanh\n\n**Micro-batch:**\n- Hybrid: xử lý batch nhỏ (giây)\n- Spark Structured Streaming\n\n**Lambda Architecture:** Batch + Speed layer\n**Kappa Architecture:** Chỉ streaming",
        theoryEn: "**Batch:** Process data in bulk (hourly/daily)\n**Stream:** Process events in real-time\n**Micro-batch:** Hybrid — small batches (seconds)\n\n**Lambda:** Batch + Speed layers\n**Kappa:** Streaming only",
        code: `import time
from collections import deque

# Batch Processing Simulation
def batch_process(data):
    print("📦 Batch Processing")
    start = time.time()
    results = []
    for record in data:
        results.append({**record, "processed": True, "score": record["value"] * 2})
    elapsed = time.time() - start
    print(f"  Processed {len(results)} records in {elapsed:.4f}s")
    return results

# Stream Processing Simulation
class StreamProcessor:
    def __init__(self, window_size=5):
        self.window = deque(maxlen=window_size)
        self.processed = 0

    def process_event(self, event):
        self.window.append(event["value"])
        self.processed += 1
        avg = sum(self.window) / len(self.window)
        return {"event": event, "window_avg": round(avg, 2), "count": self.processed}

# Demo
data = [{"id": i, "value": i * 10 + 5} for i in range(20)]

# Batch
batch_results = batch_process(data)

# Stream
print("\\n⚡ Stream Processing")
stream = StreamProcessor(window_size=5)
for event in data[:10]:
    result = stream.process_event(event)
    print(f"  Event {event['id']}: value={event['value']}, "
          f"window_avg={result['window_avg']}, total={result['count']}")`,
        codeLanguage: "python",
        exercise: "Implement tumbling window (5 events) và sliding window (5 events, slide 2) cho stream processor.",
        exerciseEn: "Implement tumbling window (5 events) and sliding window (5 events, slide 2) for stream processor.",
        quiz: [
          { question: "Khi nào nên dùng Stream Processing?", options: ["Report hàng tháng", "Real-time fraud detection", "Data migration", "Backup"], answer: 1, explanation: "Stream processing phù hợp khi cần xử lý real-time: fraud detection, live monitoring, alerts." }
        ]
      }
    ]
  },
  {
    id: "de-data-quality",
    title: "Data Quality & Validation",
    titleEn: "Data Quality & Validation",
    icon: "✅",
    color: "from-amber-500 to-orange-600",
    description: "Great Expectations, data contracts, SLAs",
    descriptionEn: "Great Expectations, data contracts, SLAs",
    course: "data-eng",
    lessons: [
      {
        id: "de-dq-1", title: "Data Quality Framework", titleEn: "Data Quality Framework",
        level: 3, difficulty: "intermediate",
        theory: "**Data Quality Dimensions:**\n- Completeness: % dữ liệu không NULL\n- Accuracy: Dữ liệu đúng thực tế\n- Consistency: Dữ liệu nhất quán giữa các hệ thống\n- Timeliness: Dữ liệu cập nhật đúng thời gian\n- Uniqueness: Không trùng lặp\n\n**Data Contracts:**\n- Schema: định nghĩa cấu trúc dữ liệu\n- SLA: cam kết chất lượng (99.9% completeness)\n- Ownership: ai chịu trách nhiệm\n\n**Tools:** Great Expectations, dbt tests, Monte Carlo",
        theoryEn: "**Data Quality Dimensions:** Completeness, Accuracy, Consistency, Timeliness, Uniqueness\n\n**Data Contracts:** Schema, SLA, Ownership\n\n**Tools:** Great Expectations, dbt tests, Monte Carlo",
        code: `# Data Quality Framework
class DataQualityChecker:
    def __init__(self, data, schema):
        self.data = data
        self.schema = schema
        self.results = []

    def check_completeness(self, column, threshold=0.95):
        non_null = sum(1 for row in self.data if row.get(column) is not None and row.get(column) != "")
        rate = non_null / len(self.data)
        passed = rate >= threshold
        self.results.append({"check": f"Completeness({column})", "rate": rate, "threshold": threshold, "passed": passed})
        return passed

    def check_uniqueness(self, column):
        values = [row[column] for row in self.data if row.get(column)]
        unique_rate = len(set(values)) / len(values) if values else 0
        passed = unique_rate == 1.0
        self.results.append({"check": f"Uniqueness({column})", "rate": unique_rate, "threshold": 1.0, "passed": passed})
        return passed

    def check_range(self, column, min_val, max_val):
        in_range = sum(1 for row in self.data if min_val <= (row.get(column) or 0) <= max_val)
        rate = in_range / len(self.data)
        passed = rate >= 0.95
        self.results.append({"check": f"Range({column}:{min_val}-{max_val})", "rate": rate, "threshold": 0.95, "passed": passed})
        return passed

    def report(self):
        print("\\n📊 Data Quality Report")
        print("=" * 60)
        for r in self.results:
            icon = "✅" if r["passed"] else "❌"
            print(f"  {icon} {r['check']}: {r['rate']:.1%} (threshold: {r['threshold']:.1%})")
        passed = sum(1 for r in self.results if r["passed"])
        print(f"\\n  Overall: {passed}/{len(self.results)} checks passed")

# Test
data = [
    {"id": 1, "name": "An", "age": 22, "email": "an@test.com"},
    {"id": 2, "name": "Binh", "age": 25, "email": "binh@test.com"},
    {"id": 3, "name": "", "age": 150, "email": "chi@test.com"},
    {"id": 3, "name": "Dung", "age": 28, "email": None},
]

dq = DataQualityChecker(data, {})
dq.check_completeness("name")
dq.check_completeness("email")
dq.check_uniqueness("id")
dq.check_range("age", 0, 120)
dq.report()`,
        codeLanguage: "python",
        exercise: "Thêm check_pattern (regex validation cho email) và check_referential_integrity cho DataQualityChecker.",
        exerciseEn: "Add check_pattern (regex for email) and check_referential_integrity to DataQualityChecker.",
        quiz: [
          { question: "Data Contract bao gồm gì?", options: ["Chỉ schema", "Schema + SLA + Ownership", "Chỉ code", "Chỉ documentation"], answer: 1, explanation: "Data Contract gồm: Schema (cấu trúc), SLA (cam kết chất lượng/thời gian), và Ownership (ai chịu trách nhiệm)." }
        ]
      }
    ]
  },
  {
    id: "de-orchestration",
    title: "Orchestration (Airflow)",
    titleEn: "Orchestration (Airflow)",
    icon: "🎼",
    color: "from-amber-500 to-orange-600",
    description: "DAGs, task dependencies, scheduling",
    descriptionEn: "DAGs, task dependencies, scheduling",
    course: "data-eng",
    lessons: [
      {
        id: "de-orch-1", title: "DAGs & Task Dependencies", titleEn: "DAGs & Task Dependencies",
        level: 4, difficulty: "advanced",
        theory: "**Orchestration** — quản lý và lên lịch data pipelines.\n\n**Apache Airflow:**\n- DAG (Directed Acyclic Graph): workflow dạng đồ thị\n- Tasks: đơn vị công việc\n- Operators: PythonOperator, BashOperator, SQLOperator\n- Schedule: cron expressions\n\n**Concepts:**\n- Dependencies: task A >> task B (B chạy sau A)\n- Retry: tự động thử lại khi fail\n- SLA: cảnh báo nếu quá thời gian\n- XCom: truyền data giữa tasks\n\n**Alternatives:** Prefect, Dagster, dbt Cloud",
        theoryEn: "**Orchestration** — manage and schedule data pipelines.\n\n**Airflow:** DAGs, Tasks, Operators, Scheduling\n\n**Concepts:** Dependencies, Retry, SLA, XCom\n\n**Alternatives:** Prefect, Dagster, dbt Cloud",
        code: `# DAG Simulator (Airflow-like)
from datetime import datetime

class Task:
    def __init__(self, name, fn, retries=1):
        self.name = name
        self.fn = fn
        self.retries = retries
        self.status = "pending"
        self.result = None

    def run(self):
        for attempt in range(self.retries + 1):
            try:
                self.result = self.fn()
                self.status = "success"
                return self.result
            except Exception as e:
                if attempt < self.retries:
                    print(f"    ⚠️ {self.name} failed, retrying ({attempt+1}/{self.retries})")
                else:
                    self.status = "failed"
                    raise

class DAG:
    def __init__(self, name, schedule="daily"):
        self.name = name
        self.schedule = schedule
        self.tasks = {}
        self.deps = {}

    def add_task(self, task, depends_on=None):
        self.tasks[task.name] = task
        self.deps[task.name] = depends_on or []

    def run(self):
        print(f"🎼 DAG: {self.name} (schedule: {self.schedule})")
        print(f"   Started: {datetime.now().strftime('%H:%M:%S')}")
        print("=" * 50)
        
        completed = set()
        while len(completed) < len(self.tasks):
            for name, task in self.tasks.items():
                if name in completed:
                    continue
                if all(d in completed for d in self.deps[name]):
                    print(f"  ▶ Running: {name}")
                    task.run()
                    completed.add(name)
                    print(f"    ✅ {name}: {task.status}")
        
        print(f"\\n🏁 DAG complete! {len(completed)} tasks executed.")

# Build a pipeline DAG
dag = DAG("daily_student_etl", schedule="0 2 * * *")

dag.add_task(Task("extract_csv", lambda: "100 rows extracted"))
dag.add_task(Task("extract_api", lambda: "50 records from API"))
dag.add_task(Task("transform", lambda: "150 rows cleaned"), depends_on=["extract_csv", "extract_api"])
dag.add_task(Task("load_warehouse", lambda: "loaded to DW"), depends_on=["transform"])
dag.add_task(Task("notify", lambda: "email sent"), depends_on=["load_warehouse"])

dag.run()`,
        codeLanguage: "python",
        exercise: "Thêm parallel execution, timeout, và SLA monitoring vào DAG simulator.",
        exerciseEn: "Add parallel execution, timeout, and SLA monitoring to the DAG simulator.",
        quiz: [
          { question: "DAG trong Airflow là gì?", options: ["Database", "Đồ thị có hướng không chu trình — workflow", "Data Access Gateway", "Dashboard"], answer: 1, explanation: "DAG = Directed Acyclic Graph — mô hình hóa workflow trong đó tasks có thứ tự và không có vòng lặp." }
        ]
      }
    ]
  },
  {
    id: "de-cloud-platforms",
    title: "Cloud Data Platforms",
    titleEn: "Cloud Data Platforms",
    icon: "☁️",
    color: "from-amber-500 to-orange-600",
    description: "GCP, AWS, Azure data services",
    descriptionEn: "GCP, AWS, Azure data services",
    course: "data-eng",
    lessons: [
      {
        id: "de-cloud-1", title: "Cloud Services Overview", titleEn: "Cloud Services Overview",
        level: 4, difficulty: "advanced",
        theory: "**Cloud Data Services:**\n\n**Storage:**\n- GCS / S3 / Azure Blob: Object storage\n- BigQuery / Redshift / Synapse: Data Warehouse\n\n**Processing:**\n- Dataflow / EMR / HDInsight: Batch/Stream\n- Cloud Functions / Lambda: Serverless compute\n\n**Orchestration:**\n- Cloud Composer / MWAA: Managed Airflow\n- Step Functions / Cloud Workflows\n\n**ML:**\n- Vertex AI / SageMaker / Azure ML\n\n**Best Practices:**\n- Infrastructure as Code (Terraform)\n- Cost optimization: spot instances, auto-scaling\n- Security: IAM, encryption at rest/transit",
        theoryEn: "**Cloud Data Services:**\n\n**Storage:** GCS/S3, BigQuery/Redshift\n**Processing:** Dataflow/EMR, Serverless\n**Orchestration:** Managed Airflow\n**ML:** Vertex AI, SageMaker\n\n**Best Practices:** IaC, Cost optimization, Security",
        code: `# Cloud Architecture Decision Framework
services = {
    "Storage": {
        "GCP": ["Cloud Storage", "BigQuery", "Bigtable"],
        "AWS": ["S3", "Redshift", "DynamoDB"],
        "Azure": ["Blob Storage", "Synapse", "Cosmos DB"],
    },
    "Processing": {
        "GCP": ["Dataflow", "Dataproc", "Cloud Functions"],
        "AWS": ["EMR", "Glue", "Lambda"],
        "Azure": ["HDInsight", "Data Factory", "Functions"],
    },
    "Orchestration": {
        "GCP": ["Cloud Composer", "Workflows"],
        "AWS": ["MWAA", "Step Functions"],
        "Azure": ["Data Factory", "Logic Apps"],
    },
}

print("☁️ Cloud Data Platform Comparison")
print("=" * 70)
for category, providers in services.items():
    print(f"\\n📂 {category}:")
    for provider, tools in providers.items():
        print(f"  {provider:>6}: {' | '.join(tools)}")

# Cost estimator
def estimate_cost(storage_gb, queries_tb, compute_hours):
    costs = {
        "GCP": storage_gb * 0.02 + queries_tb * 5 + compute_hours * 0.10,
        "AWS": storage_gb * 0.023 + queries_tb * 5 + compute_hours * 0.12,
        "Azure": storage_gb * 0.018 + queries_tb * 5 + compute_hours * 0.11,
    }
    print(f"\\n💰 Cost Estimate ({storage_gb}GB, {queries_tb}TB queries, {compute_hours}h compute):")
    for provider, cost in costs.items():
        print(f"  {provider}: \${cost:.2f}/month")
    cheapest = min(costs, key=costs.get)
    print(f"  ✅ Cheapest: {cheapest}")

estimate_cost(1000, 10, 200)`,
        codeLanguage: "python",
        exercise: "Thiết kế kiến trúc data platform cho startup e-commerce: chọn services, ước tính chi phí.",
        exerciseEn: "Design a data platform architecture for an e-commerce startup: choose services, estimate costs.",
        quiz: [
          { question: "BigQuery tính phí dựa trên gì?", options: ["Số bảng", "Lượng dữ liệu query scans (TB)", "Số users", "Thời gian uptime"], answer: 1, explanation: "BigQuery (on-demand) tính phí dựa trên lượng dữ liệu scanned bởi queries, ~$5/TB." }
        ]
      }
    ]
  },
  {
    id: "de-production",
    title: "Production Pipelines",
    titleEn: "Production Pipelines",
    icon: "🚀",
    color: "from-amber-500 to-orange-600",
    description: "CI/CD, monitoring, alerting, logging",
    descriptionEn: "CI/CD, monitoring, alerting, logging",
    course: "data-eng",
    lessons: [
      {
        id: "de-prod-1", title: "Production Best Practices", titleEn: "Production Best Practices",
        level: 5, difficulty: "advanced",
        theory: "**Production Pipeline Requirements:**\n\n**Reliability:**\n- Idempotency: chạy lại không tạo duplicate\n- Retry logic: tự động thử lại khi fail\n- Dead letter queue: lưu records lỗi\n\n**Observability:**\n- Logging: structured logs (JSON)\n- Metrics: latency, throughput, error rate\n- Alerting: PagerDuty, Slack notifications\n- Dashboards: Grafana, DataDog\n\n**CI/CD:**\n- Unit tests cho transformations\n- Integration tests cho pipeline\n- Staging environment\n- Blue/green deployments",
        theoryEn: "**Production Requirements:**\n\n**Reliability:** Idempotency, Retry, Dead letter queue\n**Observability:** Logging, Metrics, Alerting, Dashboards\n**CI/CD:** Unit tests, Integration tests, Staging, Blue/green",
        code: `import json
import time
from datetime import datetime

class ProductionPipeline:
    def __init__(self, name):
        self.name = name
        self.metrics = {"processed": 0, "failed": 0, "retried": 0}
        self.dead_letter = []

    def log(self, level, message, **kwargs):
        entry = {
            "timestamp": datetime.now().isoformat(),
            "level": level,
            "pipeline": self.name,
            "message": message,
            **kwargs
        }
        print(json.dumps(entry))

    def process_with_retry(self, record, fn, max_retries=3):
        for attempt in range(max_retries + 1):
            try:
                result = fn(record)
                self.metrics["processed"] += 1
                return result
            except Exception as e:
                self.metrics["retried"] += 1
                if attempt == max_retries:
                    self.metrics["failed"] += 1
                    self.dead_letter.append({"record": record, "error": str(e)})
                    self.log("ERROR", f"Record failed after {max_retries} retries", error=str(e))
                    return None

    def run(self, data, transform_fn):
        self.log("INFO", f"Pipeline started with {len(data)} records")
        start = time.time()
        
        results = []
        for record in data:
            result = self.process_with_retry(record, transform_fn)
            if result:
                results.append(result)
        
        elapsed = time.time() - start
        self.log("INFO", "Pipeline complete", 
                 duration_ms=round(elapsed * 1000),
                 **self.metrics)
        
        if self.dead_letter:
            self.log("WARN", f"{len(self.dead_letter)} records in dead letter queue")
        
        return results

# Run
import numpy as np
np.random.seed(42)

def transform(record):
    if np.random.random() < 0.15:  # 15% failure rate
        raise ValueError("Transform failed")
    return {**record, "score": record["value"] * 2}

data = [{"id": i, "value": i * 10} for i in range(20)]
pipeline = ProductionPipeline("daily_etl")
results = pipeline.run(data, transform)`,
        codeLanguage: "python",
        exercise: "Thêm idempotency check (dựa trên record ID) và checkpoint/resume vào ProductionPipeline.",
        exerciseEn: "Add idempotency check (based on record ID) and checkpoint/resume to ProductionPipeline.",
        quiz: [
          { question: "Idempotency trong pipeline nghĩa là gì?", options: ["Chạy nhanh hơn", "Chạy lại nhiều lần cho cùng kết quả, không duplicate", "Không bao giờ lỗi", "Tự động scale"], answer: 1, explanation: "Idempotent pipeline: dù chạy 1 hay 10 lần với cùng input, kết quả luôn giống nhau, không tạo duplicate." }
        ]
      }
    ]
  }
];
