// Data Engineering expansion - additional modules covering modern lakehouse, dbt, CDC and observability
import type { ExtendedProgrammingModule } from "./types";

const std6 = (intro: string, key: string, syntax: string, example: string, trap: string, tip: string) => `## 1. 🚦 Vấn đề đời thường

${intro}

## 2. 💡 Khái niệm chính

${key}

## 3. 🧰 Cú pháp / Công cụ

\`\`\`python
${syntax}
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
${example}
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ ${trap}

## 6. ✅ Best practice

${tip}`;

export const dataEngExpansionModules: ExtendedProgrammingModule[] = [
  {
    id: "de-lakehouse",
    title: "Lakehouse & Delta Lake",
    titleEn: "Lakehouse & Delta Lake",
    icon: "🏞️",
    color: "from-cyan-500 to-blue-600",
    description: "Kết hợp data lake (rẻ) + warehouse (ACID) với Delta/Iceberg",
    descriptionEn: "Combine cheap data lake with ACID warehouse using Delta/Iceberg",
    course: "data-eng",
    lessons: [
      {
        id: "de-lake-1",
        title: "Delta Lake: ACID trên S3",
        titleEn: "Delta Lake: ACID on S3",
        level: 3,
        difficulty: "intermediate",
        theory: std6(
          "Team data của bạn lưu file Parquet trên S3 (rẻ), nhưng khi 2 job ghi cùng lúc thì file bị hỏng, đọc ra số liệu sai. Lakehouse = thêm 1 lớp metadata (Delta/Iceberg) để có ACID transaction ngay trên data lake.",
          "- **Data Lake**: kho file thô (S3, GCS) - rẻ nhưng không có transaction.\n- **Data Warehouse**: Snowflake/BigQuery - có ACID nhưng đắt.\n- **Lakehouse**: lớp Delta/Iceberg/Hudi nằm trên lake, cho phép ACID, time travel, schema evolution.",
          "from deltalake import DeltaTable, write_deltalake\nimport pandas as pd\n\ndf = pd.DataFrame({'id': [1, 2], 'amount': [100, 200]})\nwrite_deltalake('orders', df, mode='append')\n\ndt = DeltaTable('orders')\nprint(dt.to_pandas())\nprint('Version:', dt.version())",
          "import pandas as pd\nfrom deltalake import write_deltalake, DeltaTable\n\nwrite_deltalake('demo_orders', pd.DataFrame({'id':[1],'amt':[10]}), mode='overwrite')\nwrite_deltalake('demo_orders', pd.DataFrame({'id':[2],'amt':[20]}), mode='append')\n\ndt = DeltaTable('demo_orders')\nprint('Latest:', dt.to_pandas())\nprint('History entries:', len(dt.history()))",
          "Đừng dùng append liên tục mà không OPTIMIZE - sẽ tạo hàng ngàn file nhỏ làm query siêu chậm. Chạy compaction định kỳ.",
          "Bật **time travel** để rollback nhanh khi pipeline ghi sai data. Đặt **retention** 30 ngày để cân bằng giữa recovery và chi phí lưu trữ."
        ),
        theoryEn: "Lakehouse layer (Delta/Iceberg/Hudi) adds ACID, time travel and schema evolution on top of cheap object storage.",
        code: `# Delta Lake quick start
import pandas as pd
from deltalake import write_deltalake, DeltaTable

# Initial write
write_deltalake("orders_delta", pd.DataFrame({
    "id": [1, 2, 3],
    "customer": ["An", "Binh", "Chi"],
    "amount": [100, 200, 150]
}), mode="overwrite")

# Append new orders
write_deltalake("orders_delta", pd.DataFrame({
    "id": [4, 5],
    "customer": ["Dung", "Em"],
    "amount": [300, 50]
}), mode="append")

# Read latest
dt = DeltaTable("orders_delta")
print("Latest version:", dt.version())
print(dt.to_pandas())

# Time travel: read version 0
dt0 = DeltaTable("orders_delta", version=0)
print("Original snapshot:")
print(dt0.to_pandas())`,
        codeLanguage: "python",
        exercise: "Viết script append 3 batch order, sau đó dùng time travel để khôi phục bảng về batch đầu tiên.",
        exerciseEn: "Append 3 order batches, then use time travel to restore the table to the first batch.",
        quiz: [
          { question: "Lakehouse khác Data Lake ở điểm gì?", options: ["Lakehouse đắt hơn", "Lakehouse thêm lớp ACID/metadata trên object storage", "Lakehouse chỉ chứa CSV", "Không khác nhau"], answer: 1, explanation: "Lakehouse = data lake + lớp transactional (Delta/Iceberg)." },
          { question: "Time travel trong Delta dùng để làm gì?", options: ["Tăng tốc query", "Truy cập snapshot cũ của bảng, hữu ích khi rollback", "Mã hoá dữ liệu", "Giảm phí lưu trữ"], answer: 1, explanation: "Time travel cho phép đọc lại version trước đó." },
          { question: "Vì sao phải OPTIMIZE/compaction?", options: ["Để xoá data", "Để gộp nhiều file nhỏ thành file lớn, tăng tốc query", "Để mã hoá", "Để backup"], answer: 1, explanation: "Append liên tục tạo file nhỏ; compaction giúp query nhanh." },
          { question: "Format nào KHÔNG phải lakehouse?", options: ["Delta Lake", "Apache Iceberg", "Apache Hudi", "Apache Avro"], answer: 3, explanation: "Avro là format serialization, không phải table format." },
          { question: "Lợi ích lớn nhất của lakehouse so với warehouse truyền thống?", options: ["Không cần SQL", "Chi phí lưu trữ rẻ + vẫn có ACID", "Tự sinh data", "Không cần schema"], answer: 1, explanation: "Lakehouse tận dụng object storage rẻ nhưng vẫn có transaction guarantee." }
        ]
      }
    ]
  },
  {
    id: "de-dbt",
    title: "dbt - Analytics Engineering",
    titleEn: "dbt - Analytics Engineering",
    icon: "🧪",
    color: "from-orange-500 to-red-600",
    description: "Biến SQL thành pipeline có version, test, docs tự động",
    descriptionEn: "Turn SQL into a versioned, tested, auto-documented pipeline",
    course: "data-eng",
    lessons: [
      {
        id: "de-dbt-1",
        title: "dbt models, ref() và tests",
        titleEn: "dbt models, ref() and tests",
        level: 3,
        difficulty: "intermediate",
        theory: std6(
          "Trước đây team analyst viết hàng trăm query SQL rời rạc, không biết query nào dùng query nào, sửa 1 cột là vỡ dashboard. **dbt** biến mỗi SELECT thành 1 **model** có version, có test, có docs - giống như Git + pytest cho SQL.",
          "- **Model**: 1 file `.sql` chứa SELECT, dbt sẽ wrap thành CREATE TABLE/VIEW.\n- **ref('model_name')**: thay vì hardcode tên bảng, dùng ref để dbt tự build DAG.\n- **Tests**: unique, not_null, accepted_values, relationships - chạy như unit test cho data.\n- **Sources**: khai báo bảng raw từ ingestion, có freshness check.",
          "# models/staging/stg_orders.sql\nselect\n  id as order_id,\n  customer_id,\n  amount\nfrom {{ source('shop', 'orders') }}\nwhere amount > 0\n\n# models/marts/fct_revenue.sql\nselect\n  customer_id,\n  sum(amount) as total\nfrom {{ ref('stg_orders') }}\ngroup by 1",
          "# Mô phỏng dbt-style transformation bằng Python\nimport pandas as pd\n\nsource_orders = pd.DataFrame({\n    'id': [1, 2, 3, 4],\n    'customer_id': [10, 10, 20, 30],\n    'amount': [100, 50, 200, -5]\n})\n\n# stg_orders: clean\nstg_orders = (source_orders\n    .query('amount > 0')\n    .rename(columns={'id': 'order_id'}))\n\n# fct_revenue: aggregate (ref to stg_orders)\nfct_revenue = (stg_orders\n    .groupby('customer_id')['amount']\n    .sum()\n    .reset_index(name='total'))\n\nprint('Staging:'); print(stg_orders)\nprint('Mart:'); print(fct_revenue)\n\n# Test: not_null + unique\nassert stg_orders['order_id'].notna().all(), 'order_id has null'\nassert stg_orders['order_id'].is_unique, 'order_id not unique'\nprint('Tests passed')",
          "Đừng hardcode tên bảng (`from analytics.stg_orders`). Luôn dùng `{{ ref(...) }}` - nếu không, dbt không biết DAG, không thể chạy tuần tự đúng.",
          "Đặt model theo 3 layer: **staging** (clean 1:1 với source), **intermediate** (logic phức tạp), **marts** (bảng phục vụ BI). Mỗi model phải có ít nhất 1 test."
        ),
        theoryEn: "dbt turns SQL SELECTs into versioned models with ref() lineage, automated tests and docs.",
        code: `# dbt-style pipeline simulated in pandas
import pandas as pd

# === Source ===
raw_orders = pd.DataFrame({
    "id": [1, 2, 3, 4, 5],
    "customer_id": [10, 10, 20, 30, 20],
    "amount": [100, 50, 200, 300, 0],
    "status": ["paid", "paid", "paid", "refunded", "paid"]
})

# === Staging model ===
def stg_orders(src: pd.DataFrame) -> pd.DataFrame:
    return (src
        .query("amount > 0 and status == 'paid'")
        .rename(columns={"id": "order_id"})
        [["order_id", "customer_id", "amount"]])

# === Mart model (refs stg_orders) ===
def fct_revenue(stg: pd.DataFrame) -> pd.DataFrame:
    return (stg
        .groupby("customer_id")["amount"]
        .agg(["sum", "count"])
        .rename(columns={"sum": "total_revenue", "count": "n_orders"})
        .reset_index())

# === Run DAG ===
stg = stg_orders(raw_orders)
fct = fct_revenue(stg)
print("stg_orders:"); print(stg)
print("fct_revenue:"); print(fct)

# === Tests ===
def test_not_null(df, col):
    assert df[col].notna().all(), f"{col} has nulls"

def test_unique(df, col):
    assert df[col].is_unique, f"{col} not unique"

test_not_null(stg, "order_id")
test_unique(stg, "order_id")
test_not_null(fct, "customer_id")
print("All tests passed")`,
        codeLanguage: "python",
        exercise: "Thêm 1 model trung gian `int_customer_segment` chia khách theo total_revenue (low/mid/high) và viết test accepted_values cho cột segment.",
        exerciseEn: "Add an intermediate model `int_customer_segment` bucketing customers by revenue, plus an accepted_values test.",
        quiz: [
          { question: "ref() trong dbt dùng để làm gì?", options: ["Refresh data", "Tham chiếu model khác để dbt build DAG", "Tạo index", "Xoá bảng"], answer: 1, explanation: "ref() giúp dbt biết thứ tự thực thi các model." },
          { question: "Test nào KHÔNG phải built-in dbt test?", options: ["unique", "not_null", "accepted_values", "encrypt"], answer: 3, explanation: "dbt có 4 generic tests: unique, not_null, accepted_values, relationships." },
          { question: "Vì sao chia model thành staging / mart?", options: ["Để code dài hơn", "Tách lớp giúp tái sử dụng và dễ debug", "Bắt buộc bởi SQL", "Không có lý do"], answer: 1, explanation: "Layering giúp staging làm clean, mart focus business logic." },
          { question: "Sources trong dbt có tính năng gì đặc biệt?", options: ["Tự chạy SQL", "Freshness check - cảnh báo khi data raw quá cũ", "Mã hoá", "Tự backup"], answer: 1, explanation: "Source freshness check cảnh báo khi ingestion bị trễ." },
          { question: "dbt sinh ra cái gì khi chạy `dbt docs generate`?", options: ["File CSV", "Trang web tài liệu + lineage graph tự động", "Báo cáo PDF", "Backup database"], answer: 1, explanation: "dbt tự sinh docs site có sơ đồ DAG cho mọi model." }
        ]
      }
    ]
  },
  {
    id: "de-cdc",
    title: "Change Data Capture (CDC)",
    titleEn: "Change Data Capture (CDC)",
    icon: "🔄",
    color: "from-purple-500 to-pink-600",
    description: "Stream thay đổi DB realtime sang warehouse/lake",
    descriptionEn: "Stream DB changes in realtime to warehouse/lake",
    course: "data-eng",
    lessons: [
      {
        id: "de-cdc-1",
        title: "CDC patterns: log-based vs query-based",
        titleEn: "CDC patterns: log-based vs query-based",
        level: 4,
        difficulty: "advanced",
        theory: std6(
          "Dashboard CEO cần xem doanh thu **gần realtime** (< 1 phút trễ). Nếu cứ `SELECT * FROM orders` mỗi 5 phút thì DB chính sập. Giải pháp: **CDC** - đọc transaction log của DB, stream từng INSERT/UPDATE/DELETE sang Kafka → warehouse.",
          "- **Query-based CDC**: poll bằng `updated_at > last_seen` - đơn giản nhưng miss DELETE, tải DB.\n- **Log-based CDC**: đọc WAL/binlog (Debezium, AWS DMS) - không tải DB, bắt được DELETE, near-realtime.\n- **Snapshot + incremental**: lần đầu copy toàn bộ, sau đó chỉ stream delta.",
          "# Pseudo: Debezium connector config\n{\n  \"connector.class\": \"io.debezium.connector.postgresql.PostgresConnector\",\n  \"database.hostname\": \"db.prod\",\n  \"table.include.list\": \"public.orders\",\n  \"plugin.name\": \"pgoutput\",\n  \"topic.prefix\": \"cdc\"\n}\n# Mỗi row change → message JSON gửi vào Kafka topic cdc.public.orders",
          "# Mô phỏng CDC consumer xử lý event\nimport json\n\nevents = [\n    {'op': 'c', 'after': {'id': 1, 'amount': 100}},  # create\n    {'op': 'c', 'after': {'id': 2, 'amount': 200}},\n    {'op': 'u', 'before': {'id': 1, 'amount': 100}, 'after': {'id': 1, 'amount': 150}},\n    {'op': 'd', 'before': {'id': 2, 'amount': 200}},\n]\n\nstate = {}\nfor e in events:\n    op = e['op']\n    if op in ('c', 'u'):\n        row = e['after']\n        state[row['id']] = row\n    elif op == 'd':\n        state.pop(e['before']['id'], None)\n\nprint('Final warehouse state:')\nfor row in state.values():\n    print(' ', row)",
          "Đừng quên xử lý **schema evolution** - khi prod thêm cột, consumer phải tự thích nghi, không crash. Dùng schema registry (Avro/Protobuf).",
          "Pattern an toàn: CDC → Kafka → **bronze** (raw events) → **silver** (apply MERGE) → **gold** (mart). Giữ bronze để replay khi sai logic."
        ),
        theoryEn: "Log-based CDC (Debezium) streams INSERT/UPDATE/DELETE from DB transaction logs to Kafka with near-zero impact on source.",
        code: `# CDC merge logic on a target table
from collections import OrderedDict

# Stream of CDC events from Debezium-style source
events = [
    {"op": "c", "ts": 1, "after": {"id": 1, "customer": "An",   "amount": 100}},
    {"op": "c", "ts": 2, "after": {"id": 2, "customer": "Binh", "amount": 200}},
    {"op": "u", "ts": 3, "before": {"id": 1, "amount": 100},
                         "after":  {"id": 1, "customer": "An", "amount": 175}},
    {"op": "c", "ts": 4, "after": {"id": 3, "customer": "Chi", "amount": 50}},
    {"op": "d", "ts": 5, "before": {"id": 2, "customer": "Binh", "amount": 200}},
    {"op": "u", "ts": 6, "before": {"id": 3, "amount": 50},
                         "after":  {"id": 3, "customer": "Chi", "amount": 80}},
]

target = OrderedDict()  # warehouse table

def apply_event(table, ev):
    op = ev["op"]
    if op == "c":
        table[ev["after"]["id"]] = ev["after"]
    elif op == "u":
        row_id = ev["after"]["id"]
        existing = table.get(row_id, {})
        table[row_id] = {**existing, **ev["after"]}
    elif op == "d":
        table.pop(ev["before"]["id"], None)

for e in events:
    apply_event(target, e)
    print(f"After ts={e['ts']} op={e['op']}: {list(target.values())}")

print("Final state:")
for row in target.values():
    print(" ", row)`,
        codeLanguage: "python",
        exercise: "Mở rộng `apply_event` để hỗ trợ idempotency (bỏ qua event đã xử lý bằng cách lưu set ts đã apply).",
        exerciseEn: "Extend `apply_event` to be idempotent by tracking processed ts values.",
        quiz: [
          { question: "Log-based CDC khác query-based ở điểm gì?", options: ["Chậm hơn", "Đọc WAL/binlog, bắt được DELETE, không tải DB", "Đắt hơn", "Không khác"], answer: 1, explanation: "Log-based đọc transaction log nên không cần query DB." },
          { question: "Công cụ phổ biến cho log-based CDC?", options: ["Debezium", "Pandas", "Matplotlib", "Excel"], answer: 0, explanation: "Debezium là CDC platform phổ biến nhất, dùng Kafka Connect." },
          { question: "Schema registry giúp gì?", options: ["Backup data", "Quản lý version schema để consumer không crash khi DB thay đổi", "Mã hoá", "Tăng tốc"], answer: 1, explanation: "Schema registry track evolution của message schema." },
          { question: "Bronze/Silver/Gold là gì?", options: ["Tên server", "3 layer trong medallion architecture: raw → cleansed → curated", "Loại CPU", "Phiên bản phần mềm"], answer: 1, explanation: "Medallion architecture chuẩn cho lakehouse." },
          { question: "Vì sao giữ lại bronze layer?", options: ["Để tốn tiền", "Để có thể replay/reprocess khi phát hiện lỗi logic", "Để bảo mật", "Không cần thiết"], answer: 1, explanation: "Bronze giữ raw event giúp replay khi cần fix logic." }
        ]
      }
    ]
  },
  {
    id: "de-observability",
    title: "Data Observability",
    titleEn: "Data Observability",
    icon: "🔭",
    color: "from-emerald-500 to-teal-600",
    description: "Giám sát freshness, volume, schema và lineage của pipeline",
    descriptionEn: "Monitor freshness, volume, schema and lineage of pipelines",
    course: "data-eng",
    lessons: [
      {
        id: "de-obs-1",
        title: "5 trụ cột observability cho data",
        titleEn: "5 pillars of data observability",
        level: 4,
        difficulty: "advanced",
        theory: std6(
          "Pipeline chạy xanh nhưng dashboard vẫn sai số - vì không ai check chất lượng OUTPUT. Data observability = áp dụng tư duy SRE (uptime, alert) cho dữ liệu.",
          "5 trụ cột:\n- **Freshness**: data có cập nhật đúng giờ không?\n- **Volume**: số dòng tăng/giảm bất thường?\n- **Schema**: cột nào bị thay đổi?\n- **Distribution**: phân phối giá trị có drift không?\n- **Lineage**: bảng này được tạo từ đâu, ảnh hưởng tới dashboard nào?",
          "# Pseudo monitor\nchecks = [\n  {'metric': 'freshness', 'rule': 'max_age < 6h'},\n  {'metric': 'row_count', 'rule': 'within ±20% of 7-day avg'},\n  {'metric': 'null_rate', 'rule': '< 5% on critical columns'},\n]",
          "import pandas as pd\nfrom datetime import datetime, timedelta\n\ndf = pd.DataFrame({\n    'id': range(1000),\n    'amount': [100]*900 + [None]*100,\n    'updated_at': [datetime.now() - timedelta(hours=2)]*1000\n})\n\ndef freshness_check(df, col, max_hours):\n    latest = df[col].max()\n    age_h = (datetime.now() - latest).total_seconds() / 3600\n    return age_h <= max_hours, age_h\n\ndef null_rate(df, col, threshold=0.05):\n    rate = df[col].isna().mean()\n    return rate <= threshold, rate\n\nfresh_ok, age = freshness_check(df, 'updated_at', 6)\nnull_ok, rate = null_rate(df, 'amount')\n\nprint(f'Freshness OK={fresh_ok} age={age:.1f}h')\nprint(f'Null rate OK={null_ok} rate={rate:.1%}')",
          "Đừng alert mọi lỗi nhỏ - sẽ gây **alert fatigue**, team bỏ qua cảnh báo thật. Phân biệt SEV1 (sai số tiền) vs SEV3 (delay nhỏ).",
          "Auto-generate **data contract** giữa producer và consumer: schema + SLA freshness. Vi phạm = block deploy."
        ),
        theoryEn: "Data observability applies SRE thinking to data pipelines: freshness, volume, schema, distribution and lineage.",
        code: `# Mini data observability framework
import pandas as pd
from datetime import datetime, timedelta

class DataMonitor:
    def __init__(self, name):
        self.name = name
        self.alerts = []

    def check_freshness(self, df, col, max_hours):
        latest = pd.to_datetime(df[col]).max()
        age_h = (datetime.now() - latest).total_seconds() / 3600
        ok = age_h <= max_hours
        if not ok:
            self.alerts.append(f"[SEV2] {self.name}: stale by {age_h:.1f}h")
        return ok

    def check_row_count(self, df, expected, tolerance=0.2):
        actual = len(df)
        ok = abs(actual - expected) <= expected * tolerance
        if not ok:
            self.alerts.append(
                f"[SEV1] {self.name}: rows={actual} expected~={expected}"
            )
        return ok

    def check_null_rate(self, df, col, threshold=0.05):
        rate = df[col].isna().mean()
        ok = rate <= threshold
        if not ok:
            self.alerts.append(
                f"[SEV1] {self.name}: {col} null_rate={rate:.1%}"
            )
        return ok

    def report(self):
        if not self.alerts:
            print(f"{self.name}: all checks passed")
        else:
            for a in self.alerts:
                print(a)

# Demo
df = pd.DataFrame({
    "id": range(800),
    "amount": [100]*700 + [None]*100,
    "updated_at": [datetime.now() - timedelta(hours=1)]*800,
})

mon = DataMonitor("orders_daily")
mon.check_freshness(df, "updated_at", max_hours=6)
mon.check_row_count(df, expected=1000, tolerance=0.2)
mon.check_null_rate(df, "amount", threshold=0.05)
mon.report()`,
        codeLanguage: "python",
        exercise: "Thêm `check_schema(df, expected_columns)` cảnh báo SEV1 nếu thiếu cột bắt buộc.",
        exerciseEn: "Add `check_schema(df, expected_columns)` raising SEV1 when required columns are missing.",
        quiz: [
          { question: "Trụ cột nào KHÔNG thuộc data observability?", options: ["Freshness", "Volume", "Schema", "Color"], answer: 3, explanation: "Color không liên quan; 5 trụ cột là freshness/volume/schema/distribution/lineage." },
          { question: "Alert fatigue là gì?", options: ["Hệ thống mệt", "Quá nhiều alert nhỏ làm team bỏ qua alert thật", "Server quá tải", "Một loại bug"], answer: 1, explanation: "Cần phân tầng SEV để tránh alert fatigue." },
          { question: "Lineage giúp gì?", options: ["Tăng tốc query", "Truy vết bảng này được tạo từ đâu và ảnh hưởng tới dashboard nào", "Mã hoá", "Backup"], answer: 1, explanation: "Lineage giúp đánh giá blast radius khi data sai." },
          { question: "Data contract là gì?", options: ["Hợp đồng pháp lý", "Thoả thuận schema + SLA giữa producer và consumer của dataset", "Ngôn ngữ lập trình", "Loại database"], answer: 1, explanation: "Data contract chuẩn hoá kỳ vọng giữa team produce và consume." },
          { question: "Tại sao check distribution?", options: ["Để vui", "Để phát hiện data drift làm model ML bị giảm độ chính xác", "Để giảm dung lượng", "Để xoá data"], answer: 1, explanation: "Drift trong phân phối có thể ngầm phá model và dashboard." }
        ]
      }
    ]
  }
];
