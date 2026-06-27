// Theory deep-dive extensions, keyed by lessonId.
// Appended to the lesson.theory markdown at render time in ProgrammingLesson.tsx
// so we can deepen content without mutating curriculum source files.

export interface TheoryExtension {
  vi: string;
  en: string;
}

export const theoryExtensions: Record<string, TheoryExtension> = {
  // ============================================================
  // DATA ENGINEERING - deep dives
  // ============================================================
  "de-pd-1": {
    vi: `
## 🔬 Đào sâu: Vì sao Pandas tồn tại?

Pandas ra đời năm 2008 ở quỹ đầu cơ AQR Capital, nơi Wes McKinney cần một công cụ Python xử lý chuỗi thời gian tài chính nhanh như R nhưng vẫn dùng được trong một stack lập trình tổng quát. Trước Pandas, người làm dữ liệu thường viết \`for loop\` thuần Python rất chậm hoặc dùng NumPy (mạnh về số nhưng thiếu nhãn cột, thiếu chỉ số thời gian).

DataFrame và Series là 2 lớp trừu tượng bao quanh **mảng NumPy có nhãn** (labeled array). Mỗi cột là một Series, mỗi Series là một mảng NumPy 1 chiều cộng với một Index. Index chính là điểm khác biệt: nó cho phép tra cứu bằng nhãn (\`df.loc["2024-01-01"]\`), nối bảng theo key, và canh hàng dữ liệu (alignment) khi tính toán giữa 2 Series có index khác nhau.

## ⚙️ Cơ chế bên trong (BlockManager)

Trước Pandas 2.0, DataFrame dùng **BlockManager**: gom các cột cùng dtype thành "block" để tận dụng vector hoá NumPy. Vì vậy \`df["age"] + 1\` nhanh hơn 50-100 lần so với loop Python. Từ Pandas 2.0, có thêm backend **PyArrow** giúp bộ nhớ chuỗi nhỏ hơn 3-4 lần và đọc Parquet nhanh hơn rõ rệt.

\`\`\`python
import pandas as pd
df = pd.read_csv("orders.csv", dtype_backend="pyarrow")  # nhẹ RAM
print(df.info(memory_usage="deep"))
\`\`\`

## 📐 Bảng so sánh kiểu dữ liệu

| dtype | RAM/giá trị | Khi dùng |
|---|---|---|
| int64 | 8 byte | Số nguyên mặc định |
| int32 | 4 byte | Khi giá trị < 2.1 tỷ -> tiết kiệm 50% |
| float32 | 4 byte | Đo lường, sai số chấp nhận được |
| category | ~1 byte/dòng | Cột lặp nhiều (giới tính, trạng thái) |
| string[pyarrow] | nhỏ hơn 3-4x object | Cột text |

## 🚫 Anti-pattern thường gặp

1. Dùng \`for index, row in df.iterrows()\` để biến đổi cột -> chậm gấp 100 lần so với phép gán vector.
2. Lưu chuỗi trong dtype \`object\` mặc định -> tốn RAM, không đẩy được vào Arrow.
3. Reset index liên tục (\`reset_index()\`) trong vòng lặp -> tạo bản sao, ăn O(n^2).

## ✅ Checklist trước khi đẩy notebook lên repo

- [ ] \`df.info()\` để biết RAM thực
- [ ] \`df.describe(include="all")\` để phát hiện outlier/NaN sớm
- [ ] Đặt dtype ngay khi đọc CSV thay vì cast sau
- [ ] Không in DataFrame dài > 100 dòng vào output cell

## 🔗 Liên hệ bài kế

Bài kế (Missing Values & Duplicates) sẽ dùng chính DataFrame/Series này để học cách phát hiện và xử lý dữ liệu bẩn - bước đầu tiên của mọi pipeline dữ liệu thực tế.
`,
    en: `
## 🔬 Deep dive: Why Pandas exists

Pandas was born in 2008 at AQR Capital, where Wes McKinney needed a Python tool to crunch financial time series as fast as R but inside a general-purpose stack. Before Pandas, analysts wrote slow pure-Python loops or used NumPy (great for numerics, weak for labeled columns and time indexes).

DataFrame and Series are abstractions over **labeled NumPy arrays**. Each column is a Series, each Series wraps a 1-D NumPy array plus an Index. The Index is the real differentiator: label-based lookup (\`df.loc["2024-01-01"]\`), join-by-key, and automatic alignment when doing math on two Series with different indexes.

## ⚙️ Internals (BlockManager)

Before Pandas 2.0, DataFrame used a **BlockManager** that grouped same-dtype columns into blocks so NumPy vectorisation kicked in - hence \`df["age"] + 1\` is 50-100x faster than a Python loop. Pandas 2.0 introduced the **PyArrow** backend: 3-4x smaller string memory and faster Parquet IO.

\`\`\`python
import pandas as pd
df = pd.read_csv("orders.csv", dtype_backend="pyarrow")
print(df.info(memory_usage="deep"))
\`\`\`

## 📐 Dtype cheatsheet

| dtype | RAM/value | When to use |
|---|---|---|
| int64 | 8 bytes | Default integers |
| int32 | 4 bytes | Values < 2.1B -> 50% memory saved |
| float32 | 4 bytes | Measurements, tolerable error |
| category | ~1 byte/row | Heavily repeated columns |
| string[pyarrow] | 3-4x smaller than object | Text columns |

## 🚫 Common anti-patterns

1. Using \`for index, row in df.iterrows()\` to transform a column - 100x slower than a vectorised assignment.
2. Leaving strings as default \`object\` dtype - wastes RAM and blocks Arrow conversion.
3. Calling \`reset_index()\` inside loops - copies the frame, O(n^2) cost.

## ✅ Pre-commit checklist for notebooks

- [ ] \`df.info()\` to inspect real memory
- [ ] \`df.describe(include="all")\` to catch outliers/NaN early
- [ ] Set dtypes at read time, do not cast later
- [ ] Never print > 100 row DataFrames into output cells

## 🔗 Bridge to next lesson

Next lesson (Missing Values & Duplicates) reuses these same DataFrame/Series objects to detect and clean dirty data - the very first step of every real pipeline.
`,
  },

  "de-clean-1": {
    vi: `
## 🔬 Đào sâu: Vì sao dữ liệu luôn bẩn?

Trong thực tế, 60-80% thời gian Data Engineer dành cho việc làm sạch dữ liệu. Lý do: dữ liệu sinh ra ở nhiều nguồn khác nhau (form người dùng, log thiết bị, API bên thứ ba, file Excel của bộ phận khác), mỗi nguồn có quy ước riêng và mức độ tin cậy khác nhau. Một dòng "trống" có thể là chuỗi rỗng \`""\`, là \`NaN\`, là \`"NULL"\`, là \`"N/A"\`, là 0, hoặc là khoảng trắng - tuỳ hệ thống nguồn.

## ⚙️ Cơ chế NaN bên trong Pandas

NaN trong Pandas thực ra là \`float64\` đặc biệt theo chuẩn IEEE 754. Đây là lý do cột \`int\` có 1 NaN sẽ bị nâng kiểu thành \`float\`. Pandas 2.0 giới thiệu \`pd.NA\` thống nhất cho mọi dtype (Int64, boolean, string), nhưng nhiều API cũ vẫn dùng \`np.nan\`. Khi merge 2 DataFrame có cách biểu diễn null khác nhau, kết quả \`isna()\` có thể trả về sai - luôn chuẩn hoá về một dạng.

\`\`\`python
df = df.convert_dtypes()       # đổi sang nullable dtype (Int64, string)
df = df.replace({"N/A": pd.NA, "": pd.NA, "NULL": pd.NA})
\`\`\`

## 📊 Chiến lược xử lý NaN

| Chiến lược | Khi dùng | Rủi ro |
|---|---|---|
| Drop dòng | < 5% dòng bị thiếu, ngẫu nhiên | Mất mẫu nếu bias |
| Drop cột | > 40% giá trị thiếu | Mất thông tin tiềm năng |
| Fill mean/median | Cột số liên tục | Giảm phương sai, lệch tương quan |
| Fill mode | Cột phân loại | Tăng class chiếm đa số |
| Forward/back-fill | Time series | Lan truyền sai số |
| Mô hình ML (KNN, IterativeImputer) | Cột quan trọng | Tốn compute, khó giải thích |

## 🔁 Duplicate: 3 mức cần phân biệt

1. **Exact duplicate**: mọi cột trùng -> \`df.drop_duplicates()\`
2. **Business duplicate**: cùng đơn hàng nhưng khác \`created_at\` 1 mili-giây -> \`drop_duplicates(subset=["order_id"], keep="last")\`
3. **Fuzzy duplicate**: cùng khách hàng nhưng tên viết khác ("Nguyen Van A" vs "nguyễn văn a") -> dùng \`rapidfuzz\` so khớp gần đúng

## 🚫 Anti-pattern

- Drop NaN trước khi thống kê -> báo cáo phản ánh tập đã lọc, không phải tập gốc
- \`fillna(0)\` cho cột tiền tệ -> 0 có ý nghĩa nghiệp vụ khác hẳn "không biết"
- Drop duplicate mà không sort theo timestamp -> giữ nhầm bản cũ

## ✅ Checklist

- [ ] Lưu \`df_raw = df.copy()\` trước khi clean
- [ ] Ghi log số dòng trước/sau từng bước clean
- [ ] Thêm cột \`is_imputed\` để downstream biết giá trị nào do mình điền
- [ ] Viết unit test: số dòng giảm phải nằm trong ngưỡng nghiệp vụ chấp nhận
`,
    en: `
## 🔬 Deep dive: Why data is always dirty

In production, 60-80% of a Data Engineer's time goes to cleaning. Reason: data comes from many sources (user forms, device logs, third-party APIs, spreadsheets from other teams), each with its own conventions and trust level. An "empty" cell can be \`""\`, \`NaN\`, \`"NULL"\`, \`"N/A"\`, zero, or whitespace - depending on the source.

## ⚙️ How NaN works inside Pandas

NaN is a special \`float64\` per IEEE 754. That is why an \`int\` column with a single NaN gets promoted to \`float\`. Pandas 2.0 introduced \`pd.NA\` as a unified null across dtypes (Int64, boolean, string), but many legacy APIs still emit \`np.nan\`. When merging frames with different null encodings, \`isna()\` can lie - always normalise first.

\`\`\`python
df = df.convert_dtypes()
df = df.replace({"N/A": pd.NA, "": pd.NA, "NULL": pd.NA})
\`\`\`

## 📊 NaN strategy matrix

| Strategy | When | Risk |
|---|---|---|
| Drop rows | < 5% missing, at random | Sample bias if not random |
| Drop column | > 40% missing | Loses potential signal |
| Mean/median fill | Continuous numeric | Shrinks variance, distorts corr |
| Mode fill | Categorical | Boosts majority class |
| Forward/back-fill | Time series | Propagates stale values |
| Model-based (KNN, IterativeImputer) | Critical columns | Compute heavy, low explainability |

## 🔁 Three levels of duplicates

1. **Exact**: every column identical -> \`df.drop_duplicates()\`
2. **Business**: same order, \`created_at\` differs by 1 ms -> \`drop_duplicates(subset=["order_id"], keep="last")\`
3. **Fuzzy**: same customer, different spellings -> use \`rapidfuzz\` for near-match

## 🚫 Anti-patterns

- Dropping NaN before stats -> report describes the filtered set, not reality
- \`fillna(0)\` on money columns -> 0 has a real business meaning, different from "unknown"
- Dropping duplicates without sorting by timestamp -> may keep the stale row

## ✅ Checklist

- [ ] Snapshot \`df_raw = df.copy()\` before cleaning
- [ ] Log row counts before/after each step
- [ ] Add an \`is_imputed\` column so downstream knows what you filled
- [ ] Unit test: row drop must stay within a business tolerance
`,
  },

  "de-ingest-1": {
    vi: `
## 🔬 Đào sâu: Vì sao "đọc dữ liệu" lại khó?

Trong vai trò Data Engineer, mỗi tuần bạn có thể nhận 10 nguồn dữ liệu mới: CSV xuất từ ERP, JSON từ webhook, Parquet trên S3, bảng Postgres production, API REST trả về phân trang, file Excel có merge cell. Việc "đọc đúng" không chỉ là gọi đúng hàm, mà còn là **bảo toàn schema, kiểu dữ liệu, encoding, timezone, và idempotency**.

## ⚙️ So sánh các format

| Format | Tốc độ đọc | Hỗ trợ schema | Nén | Khi dùng |
|---|---|---|---|---|
| CSV | Chậm (parse text) | Không | Yếu | Trao đổi với người không kỹ thuật |
| JSON / NDJSON | Trung bình | Lỏng | Yếu | Log, API |
| Parquet | Nhanh | Mạnh (Arrow) | Tốt | Data lake, analytics |
| Avro | Nhanh | Mạnh | Tốt | Kafka, schema evolution |
| ORC | Nhanh | Mạnh | Tốt | Hive ecosystem |

Parquet/ORC là **columnar**: chỉ đọc cột cần thiết, có thống kê min/max mỗi block giúp engine "skip" hàng triệu dòng không phù hợp với WHERE. Đây là lý do BigQuery/Snowflake/Athena chạy nhanh hơn CSV trên cùng dữ liệu hàng nghìn lần.

## 🌐 Đọc từ API có phân trang

\`\`\`python
import requests, pandas as pd

def fetch_all(url):
    rows, page = [], 1
    while True:
        r = requests.get(url, params={"page": page, "per_page": 100}, timeout=30)
        r.raise_for_status()
        batch = r.json()["data"]
        if not batch:
            break
        rows.extend(batch)
        page += 1
    return pd.DataFrame(rows)
\`\`\`

Chú ý: thêm \`timeout\`, retry với backoff (\`tenacity\`), và **rate limit** để không bị 429.

## 🗄️ Đọc từ Database production

Đừng \`SELECT *\` trên bảng triệu dòng - sẽ kéo cả DB chậm. Hãy:

1. Đọc theo \`chunksize\` (\`pd.read_sql(..., chunksize=50_000)\`)
2. Dùng **replica** đọc, không chạm primary
3. Đặt \`SET statement_timeout\` trên Postgres
4. Lưu state \`last_synced_at\` để incremental load

## 🚫 Anti-pattern

- Đọc Excel rồi xử lý formula sau - hãy yêu cầu nguồn export sang CSV
- Trust \`encoding="utf-8"\` mặc định - file Việt Nam thường là \`cp1258\` hoặc \`utf-8-sig\`
- Đọc Parquet local từ S3 mà không cache - mỗi lần chạy ăn 1 GB egress

## ✅ Checklist ingestion

- [ ] Lưu file gốc (raw zone) trước khi parse
- [ ] Ghi nhận \`source_system, ingested_at, row_count, checksum\`
- [ ] Schema test ngay sau khi đọc (pandera, great_expectations)
- [ ] Pipeline idempotent: chạy lại không sinh duplicate
`,
    en: `
## 🔬 Deep dive: Why "just reading data" is hard

As a Data Engineer you may onboard 10 new sources a week: ERP CSV exports, JSON webhooks, Parquet on S3, production Postgres tables, paginated REST APIs, Excel files with merged cells. "Reading correctly" is not just calling the right function - it means preserving **schema, dtypes, encoding, timezone, and idempotency**.

## ⚙️ Format comparison

| Format | Read speed | Schema | Compression | When |
|---|---|---|---|---|
| CSV | Slow (text parse) | None | Weak | Exchanging with non-tech |
| JSON / NDJSON | Medium | Loose | Weak | Logs, APIs |
| Parquet | Fast | Strong (Arrow) | Strong | Data lake, analytics |
| Avro | Fast | Strong | Strong | Kafka, schema evolution |
| ORC | Fast | Strong | Strong | Hive ecosystem |

Parquet/ORC are **columnar**: only requested columns are read, and per-block min/max stats let engines skip millions of rows that fail the WHERE clause. That is why BigQuery/Snowflake/Athena run thousands of times faster than CSV on the same data.

## 🌐 Reading a paginated API

\`\`\`python
import requests, pandas as pd

def fetch_all(url):
    rows, page = [], 1
    while True:
        r = requests.get(url, params={"page": page, "per_page": 100}, timeout=30)
        r.raise_for_status()
        batch = r.json()["data"]
        if not batch:
            break
        rows.extend(batch)
        page += 1
    return pd.DataFrame(rows)
\`\`\`

Always add \`timeout\`, retry with backoff (\`tenacity\`), and a **rate limit** to dodge 429.

## 🗄️ Reading from a production DB

Never \`SELECT *\` on million-row tables - it stalls the DB. Instead:

1. Stream in \`chunksize\` (\`pd.read_sql(..., chunksize=50_000)\`)
2. Read from a **replica**, not the primary
3. Set \`statement_timeout\` on Postgres
4. Track \`last_synced_at\` for incremental loads

## 🚫 Anti-patterns

- Reading Excel and then evaluating formulas - ask the source to export CSV
- Trusting default \`encoding="utf-8"\` - Vietnamese files are often \`cp1258\` or \`utf-8-sig\`
- Reading Parquet from S3 without caching - each run burns 1 GB of egress

## ✅ Ingestion checklist

- [ ] Persist the raw file in a raw zone before parsing
- [ ] Record \`source_system, ingested_at, row_count, checksum\`
- [ ] Schema-test right after reading (pandera, great_expectations)
- [ ] Pipeline must be idempotent: re-runs produce no duplicates
`,
  },

  "de-etl-1": {
    vi: `
## 🔬 Đào sâu: Lịch sử ETL vs ELT

ETL (Extract -> Transform -> Load) thống trị từ 1990s khi data warehouse (Teradata, Oracle) đắt và chậm. Phải transform **trước** vì warehouse không kham nổi dữ liệu thô. Khi cloud warehouse (BigQuery, Snowflake, Redshift) xuất hiện 2012-2016, compute trở nên elastic và rẻ, paradigm đảo ngược thành ELT: load thô trước, transform sau bằng SQL ngay trong warehouse (dbt là tiêu chuẩn).

## ⚙️ Anatomy của một pipeline ELT hiện đại

\`\`\`text
Source -> Fivetran/Airbyte -> Raw layer (S3 + Snowflake)
       -> dbt staging (1:1 với raw, đổi tên cột)
       -> dbt intermediate (join, dedupe)
       -> dbt marts (fact + dimension theo nghiệp vụ)
       -> BI tool (Looker, Metabase)
\`\`\`

Mỗi layer có kiểm thử riêng (uniqueness, not-null, relationship). Khi 1 test fail, dbt dừng và alert - không cho dữ liệu xấu xuống mart.

## 📐 Bảng so sánh

| Tiêu chí | ETL | ELT |
|---|---|---|
| Nơi transform | Server riêng | Trong warehouse |
| Cần code | Python/Spark | SQL + dbt |
| Reproducibility | Khó (state trong server) | Cao (git + dbt) |
| Cost model | Server 24/7 | Compute on-demand |
| Phù hợp | Dữ liệu nhạy cảm, cần mask trước khi đổ vào WH | Phổ biến nhất hiện nay |

## 🚫 Anti-pattern

- Transform trong stored procedure dài 2000 dòng -> không test được, không có lineage
- Pipeline không có "raw layer" -> mất dữ liệu gốc, không re-process được
- Append-only nhưng không có \`ingested_at\` -> không biết bản nào mới

## ✅ Checklist ETL/ELT

- [ ] Có raw layer bất biến (immutable)
- [ ] Transform được version control (git)
- [ ] Mỗi model có test (unique, not_null, accepted_values)
- [ ] Pipeline idempotent: chạy lại cùng input -> cùng output
- [ ] Lineage được tự động sinh (dbt docs, OpenLineage)
`,
    en: `
## 🔬 Deep dive: ETL vs ELT history

ETL dominated since the 1990s when warehouses (Teradata, Oracle) were expensive and slow - you had to transform **before** loading. When cloud warehouses (BigQuery, Snowflake, Redshift) arrived between 2012-2016, compute became elastic and cheap, flipping the paradigm to ELT: load raw first, transform later with SQL inside the warehouse (dbt is the standard).

## ⚙️ Anatomy of a modern ELT pipeline

\`\`\`text
Source -> Fivetran/Airbyte -> Raw layer (S3 + Snowflake)
       -> dbt staging (1:1 with raw, renames)
       -> dbt intermediate (joins, dedupe)
       -> dbt marts (business-facing facts + dims)
       -> BI tool (Looker, Metabase)
\`\`\`

Each layer ships its own tests (uniqueness, not-null, relationship). When a test fails, dbt halts and alerts - bad data never reaches the mart.

## 📐 Comparison table

| Criterion | ETL | ELT |
|---|---|---|
| Transform location | Dedicated server | Inside warehouse |
| Code | Python/Spark | SQL + dbt |
| Reproducibility | Hard (server state) | High (git + dbt) |
| Cost model | 24/7 server | On-demand compute |
| Best for | Sensitive data needing masking pre-load | Today's default |

## 🚫 Anti-patterns

- Putting transforms in a 2000-line stored procedure - no tests, no lineage
- Skipping a raw layer - you lose the source of truth, cannot reprocess
- Append-only without \`ingested_at\` - cannot tell which row is fresh

## ✅ ETL/ELT checklist

- [ ] Immutable raw layer
- [ ] Transforms in version control
- [ ] Every model has tests (unique, not_null, accepted_values)
- [ ] Idempotent: same input -> same output
- [ ] Lineage auto-generated (dbt docs, OpenLineage)
`,
  },

  "de-model-1": {
    vi: `
## 🔬 Đào sâu: Tại sao Star Schema thắng OLTP-style schema?

Schema OLTP (3NF) tối ưu cho ghi: không trùng lặp, dễ cập nhật. Nhưng để trả lời "doanh thu theo quốc gia x sản phẩm x tháng" cần join 7-8 bảng - chậm và khó hiểu cho người làm BI. Ralph Kimball (1996) đề xuất **Star schema**: 1 bảng fact ở giữa (số liệu) + nhiều dimension xung quanh (mô tả). Mỗi query BI chỉ cần join 2-3 bảng, dimension nhỏ vừa với memory.

## ⚙️ Fact vs Dimension

| Loại bảng | Đặc điểm | Ví dụ |
|---|---|---|
| Fact | Numeric, additive, hàng triệu dòng | sales(date_key, product_key, store_key, qty, revenue) |
| Dimension | Text/descriptive, ít dòng | dim_product(product_key, name, category, brand) |

3 loại fact thường gặp: **transaction** (mỗi sự kiện 1 dòng), **periodic snapshot** (cuối ngày/tháng), **accumulating snapshot** (1 dòng cho cả vòng đời, cập nhật khi qua mốc).

## 🔁 Slowly Changing Dimension (SCD)

Khi thông tin dimension thay đổi (khách hàng chuyển tỉnh), bạn có 3 cách phổ biến:

- **SCD Type 1**: ghi đè -> mất lịch sử
- **SCD Type 2**: thêm dòng mới với \`valid_from\`, \`valid_to\`, \`is_current\` -> giữ đầy đủ lịch sử (mặc định trong dbt)
- **SCD Type 3**: thêm cột \`previous_city\` -> chỉ giữ 1 phiên bản cũ

## 📐 Star vs Snowflake

Snowflake = chuẩn hoá thêm dimension thành nhiều bảng con (\`dim_product -> dim_category -> dim_department\`). Tiết kiệm dung lượng nhưng query phải join sâu hơn. **Mặc định chọn Star**; chuyển sang Snowflake chỉ khi dimension cực lớn (> 10 triệu dòng) và lặp nhiều.

## 🚫 Anti-pattern

- Đặt text dài trong fact -> phình dung lượng, scan chậm
- Surrogate key dùng UUID -> mất sort order, join chậm hơn integer
- Không có \`date dimension\` -> mất ngày lễ, tuần ISO, fiscal year
- Trộn nhiều grain trong 1 fact (transaction + snapshot) -> sai số liệu khi sum

## ✅ Checklist data modeling

- [ ] Xác định grain rõ ràng ("1 dòng = 1 dòng order line")
- [ ] Mọi fact có surrogate key + foreign key
- [ ] Có \`dim_date\` và \`dim_time\`
- [ ] SCD Type 2 cho dimension có thay đổi nghiệp vụ
- [ ] Đặt tên bảng: \`fct_*\`, \`dim_*\` để dễ nhìn lineage
`,
    en: `
## 🔬 Deep dive: Why Star Schema beats OLTP-style for analytics

OLTP (3NF) schema optimises writes: no duplication, easy updates. But answering "revenue by country x product x month" needs 7-8 joins - slow and hostile to BI users. Ralph Kimball (1996) proposed the **Star schema**: one fact in the middle (metrics) plus dimensions around it (descriptors). BI queries join only 2-3 tables, and dimensions are small enough to fit in memory.

## ⚙️ Fact vs Dimension

| Table | Traits | Example |
|---|---|---|
| Fact | Numeric, additive, millions of rows | sales(date_key, product_key, store_key, qty, revenue) |
| Dimension | Text/descriptive, few rows | dim_product(product_key, name, category, brand) |

Three fact flavours: **transaction** (one row per event), **periodic snapshot** (end of day/month), **accumulating snapshot** (one row per lifecycle, updated as it moves).

## 🔁 Slowly Changing Dimensions (SCD)

When a dimension attribute changes (customer moves city) you have three common options:

- **SCD Type 1**: overwrite -> lose history
- **SCD Type 2**: insert a new row with \`valid_from\`, \`valid_to\`, \`is_current\` -> full history (dbt default)
- **SCD Type 3**: add a \`previous_city\` column -> keep only one prior version

## 📐 Star vs Snowflake

Snowflake normalises dimensions into sub-tables (\`dim_product -> dim_category -> dim_department\`). Saves space but adds joins. **Default to Star**; only snowflake when dimensions are huge (> 10M rows) with heavy repetition.

## 🚫 Anti-patterns

- Long text inside fact -> bloats storage, slows scans
- UUID surrogate keys -> lose sort order, joins slower than integers
- No \`date dimension\` -> lose holidays, ISO weeks, fiscal year
- Mixed grain in one fact (transactions + snapshots) -> wrong totals

## ✅ Modeling checklist

- [ ] Declare grain explicitly ("one row = one order line")
- [ ] Every fact has surrogate keys + foreign keys
- [ ] Maintain \`dim_date\` and \`dim_time\`
- [ ] SCD Type 2 for business-meaningful changes
- [ ] Naming: \`fct_*\`, \`dim_*\` so lineage reads cleanly
`,
  },

  "de-wh-1": {
    vi: `
## 🔬 Đào sâu: OLTP vs OLAP

OLTP (Online Transaction Processing - Postgres, MySQL) tối ưu cho hàng triệu giao dịch nhỏ/giây: row-store, B-Tree index, ACID. OLAP (Online Analytical Processing - BigQuery, Snowflake, Redshift, ClickHouse) tối ưu cho query lớn quét hàng tỷ dòng/lần: column-store, vectorized execution, MPP (massively parallel processing).

## ⚙️ Vì sao column-store nhanh hơn cho analytics?

Khi bạn chạy \`SELECT SUM(revenue) FROM sales WHERE year = 2024\`:

- **Row-store** phải đọc cả dòng (tất cả 50 cột) chỉ để lấy 2 cột -> phí 96% IO
- **Column-store** chỉ đọc 2 file cột (\`revenue\`, \`year\`), nén theo từng cột (RLE, dictionary) tiết kiệm 5-10x dung lượng, và CPU chạy SIMD trên mảng số liên tục

Đây là lý do BigQuery quét 1 TB giá $5 trong 10 giây, trong khi Postgres cùng dữ liệu mất 1 giờ.

## 🏛️ Kiến trúc MPP

Warehouse hiện đại chia dữ liệu thành **micro-partition** (Snowflake) hoặc **shards** (Redshift), phân tán qua nhiều node. Khi query chạy:

1. Optimizer sinh plan
2. Plan được chia thành **stages**
3. Mỗi stage chạy song song trên hàng chục node
4. Kết quả gộp lại ở node coordinator

Vì vậy thêm tiền = thêm node = nhanh hơn (gần như tuyến tính).

## 📐 Khi nào dùng warehouse vs lake vs lakehouse

| Lựa chọn | Ưu | Nhược | Khi dùng |
|---|---|---|---|
| Warehouse (Snowflake, BigQuery) | Nhanh, chuẩn SQL | Đắt, vendor lock | BI doanh nghiệp |
| Data Lake (S3 + Athena) | Rẻ, mở | Chậm, không ACID | Lưu raw lâu dài |
| Lakehouse (Databricks, Iceberg) | ACID trên lake | Phức tạp hơn | Cần cả ML và BI |

## 🚫 Anti-pattern

- \`SELECT *\` trên cloud warehouse -> tính tiền theo bytes scanned, đốt $$
- Không partition bảng -> mỗi query quét full table
- Lưu JSON lớn trong 1 cột mà không trích xuất -> mất lợi thế column-store

## ✅ Checklist warehouse

- [ ] Partition theo cột thời gian (\`event_date\`)
- [ ] Cluster theo cột hay filter (\`user_id\`)
- [ ] Materialised view cho query nặng lặp đi lặp lại
- [ ] Tắt warehouse khi không dùng (auto-suspend)
- [ ] Đặt resource monitor để cảnh báo khi cost vượt ngưỡng
`,
    en: `
## 🔬 Deep dive: OLTP vs OLAP

OLTP (Postgres, MySQL) is built for millions of tiny transactions per second: row-store, B-Tree indexes, ACID. OLAP (BigQuery, Snowflake, Redshift, ClickHouse) is built for huge queries over billions of rows: column-store, vectorised execution, MPP (massively parallel processing).

## ⚙️ Why column-store wins for analytics

For \`SELECT SUM(revenue) FROM sales WHERE year = 2024\`:

- **Row-store** reads the whole row (all 50 columns) to grab 2 columns -> 96% wasted IO
- **Column-store** reads only \`revenue\` and \`year\` files, compresses per column (RLE, dictionary) saving 5-10x storage, and CPU runs SIMD over contiguous numeric arrays

That is how BigQuery scans 1 TB for $5 in 10 seconds while Postgres takes an hour.

## 🏛️ MPP architecture

Modern warehouses split data into **micro-partitions** (Snowflake) or **shards** (Redshift) across many nodes. When a query runs:

1. Optimizer builds a plan
2. Plan splits into **stages**
3. Each stage runs in parallel across dozens of nodes
4. Coordinator gathers results

So more money = more nodes = near-linear speed-up.

## 📐 Warehouse vs Lake vs Lakehouse

| Choice | Pros | Cons | When |
|---|---|---|---|
| Warehouse (Snowflake, BigQuery) | Fast, standard SQL | Expensive, lock-in | Enterprise BI |
| Data Lake (S3 + Athena) | Cheap, open | Slow, no ACID | Long-term raw storage |
| Lakehouse (Databricks, Iceberg) | ACID on lake | More moving parts | Need ML + BI |

## 🚫 Anti-patterns

- \`SELECT *\` on cloud warehouses - billed per bytes scanned, burns $$
- No partitioning -> every query scans the full table
- Storing huge JSON in one column without extraction -> kills column-store benefits

## ✅ Warehouse checklist

- [ ] Partition by a time column (\`event_date\`)
- [ ] Cluster by a frequently filtered column (\`user_id\`)
- [ ] Materialised views for heavy repeated queries
- [ ] Auto-suspend warehouses when idle
- [ ] Resource monitors to alert on cost spikes
`,
  },

  "de-bs-1": {
    vi: `
## 🔬 Đào sâu: Vì sao có 2 paradigm xử lý dữ liệu?

**Batch**: gom dữ liệu thành lô lớn, xử lý theo lịch (hàng giờ, hàng ngày). Tốt cho báo cáo, ML training, billing. **Streaming**: xử lý từng sự kiện gần real-time. Tốt cho fraud detection, recommendation, monitoring. Hai paradigm này khác nhau ở **trade-off giữa latency, throughput, độ chính xác và chi phí**.

## ⚙️ 4 khái niệm cốt lõi của streaming

1. **Event time vs Processing time**: thời điểm sự kiện thật sự xảy ra vs thời điểm hệ thống nhìn thấy. Mạng lag, batch trễ -> 2 thời điểm lệch nhau. Luôn dùng event time để tính metric.
2. **Windowing**: gom sự kiện theo cửa sổ (tumbling 1 phút, sliding 5 phút, session). Quyết định cách tính tổng/đếm.
3. **Watermark**: ngưỡng "không nhận event cũ hơn watermark nữa". Cân bằng giữa độ chính xác và độ trễ.
4. **Delivery semantics**: at-most-once (mất event), at-least-once (trùng event), exactly-once (chuẩn nhất, đắt nhất).

## 🛠️ Stack streaming hiện đại

\`\`\`text
Producer (app/IoT) -> Kafka / Pulsar / Kinesis
                   -> Flink / Spark Streaming / ksqlDB
                   -> Sink: Postgres / Redis / Iceberg / Elasticsearch
\`\`\`

Kafka là backbone: phân tán, durable, hỗ trợ replay. Flink là engine xử lý mạnh nhất cho stateful streaming (giữ state qua nhiều event).

## 📐 So sánh

| Tiêu chí | Batch | Streaming |
|---|---|---|
| Latency | Phút-giờ | Mili giây-giây |
| Throughput | Rất cao | Cao |
| Cost | Thấp | Cao 5-10 lần |
| Debug | Dễ (chạy lại) | Khó (state) |
| Khi dùng | Báo cáo, ML train | Alert, personalisation |

## 🌊 Lambda vs Kappa architecture

- **Lambda**: chạy song song batch (chính xác) + streaming (nhanh). Phức tạp vì duy trì 2 codebase.
- **Kappa**: chỉ streaming, reprocess bằng cách replay từ Kafka. Đơn giản hơn, đang là xu hướng.

## 🚫 Anti-pattern

- Dùng streaming cho mọi thứ -> đắt và overkill
- Không xử lý late event -> số liệu cuối ngày sai
- State trong memory mà không checkpoint -> mất dữ liệu khi crash

## ✅ Checklist streaming

- [ ] Schema registry (Avro/Protobuf) cho mọi topic
- [ ] Dead-letter queue cho event lỗi
- [ ] Checkpoint định kỳ + state backend (RocksDB)
- [ ] Monitoring: lag, throughput, error rate
- [ ] Test reprocess từ Kafka để chắc Kappa hoạt động
`,
    en: `
## 🔬 Deep dive: Why two processing paradigms?

**Batch**: collect data into large chunks, process on schedule (hourly, daily). Great for reports, ML training, billing. **Streaming**: process each event near real time. Great for fraud detection, recommendations, monitoring. The difference is the **trade-off between latency, throughput, accuracy and cost**.

## ⚙️ Four core streaming concepts

1. **Event time vs processing time**: when the event actually occurred vs when the system saw it. Network lag or delayed batches make them diverge. Always compute metrics on event time.
2. **Windowing**: group events into windows (tumbling 1 min, sliding 5 min, session). Defines how you aggregate.
3. **Watermark**: "do not accept events older than this watermark". Trade-off between accuracy and latency.
4. **Delivery semantics**: at-most-once (lose events), at-least-once (duplicates), exactly-once (gold standard, most expensive).

## 🛠️ Modern streaming stack

\`\`\`text
Producer (app/IoT) -> Kafka / Pulsar / Kinesis
                   -> Flink / Spark Streaming / ksqlDB
                   -> Sink: Postgres / Redis / Iceberg / Elasticsearch
\`\`\`

Kafka is the backbone: distributed, durable, replay-friendly. Flink is the strongest engine for stateful streaming (keeps state across events).

## 📐 Comparison

| Criterion | Batch | Streaming |
|---|---|---|
| Latency | Minutes-hours | Milliseconds-seconds |
| Throughput | Very high | High |
| Cost | Low | 5-10x higher |
| Debug | Easy (re-run) | Hard (state) |
| When | Reports, ML training | Alerts, personalisation |

## 🌊 Lambda vs Kappa

- **Lambda**: parallel batch (accurate) + streaming (fast). Complex - two codebases.
- **Kappa**: streaming only, reprocess by replaying Kafka. Simpler, the modern trend.

## 🚫 Anti-patterns

- Streaming everything - expensive overkill
- Ignoring late events - end-of-day numbers go wrong
- In-memory state without checkpointing - data loss on crash

## ✅ Streaming checklist

- [ ] Schema registry (Avro/Protobuf) on every topic
- [ ] Dead-letter queue for bad events
- [ ] Periodic checkpoint + state backend (RocksDB)
- [ ] Monitor lag, throughput, error rate
- [ ] Drill reprocessing from Kafka to validate Kappa
`,
  },

  "de-dq-1": {
    vi: `
## 🔬 Đào sâu: Data Quality không phải task phụ

Một báo cáo McKinsey ước tính dữ liệu kém chất lượng tiêu tốn doanh nghiệp Mỹ ~3.100 tỷ USD/năm. Lý do: quyết định kinh doanh, ML model, dashboard CEO - tất cả đều dựa vào dữ liệu. Sai 1 cột revenue = sai cả quý.

## ⚙️ 6 chiều của Data Quality (DAMA DMBOK)

1. **Accuracy** - đúng so với thực tế (giá đơn hàng = giá hợp đồng)
2. **Completeness** - không thiếu (mọi đơn hàng đều có \`customer_id\`)
3. **Consistency** - không mâu thuẫn (tổng item = tổng theo invoice)
4. **Timeliness** - kịp thời (dữ liệu hôm qua phải có trước 9h sáng)
5. **Uniqueness** - không trùng (1 đơn hàng = 1 dòng)
6. **Validity** - đúng định dạng (email có @, ngày sinh < hôm nay)

## 🛠️ Stack DQ phổ biến

| Tool | Loại | Đặc điểm |
|---|---|---|
| Great Expectations | Python | Định nghĩa "expectations" như test pytest |
| dbt tests | SQL | Built-in: unique, not_null, accepted_values, relationships |
| Soda Core | YAML | Khai báo check ngắn gọn, dễ versioning |
| Monte Carlo / Anomalo | SaaS | Phát hiện bất thường bằng ML |

## 📝 Ví dụ Great Expectations

\`\`\`python
import great_expectations as gx
ctx = gx.get_context()
ds = ctx.sources.add_pandas("orders").read_csv("orders.csv")
ds.expect_column_values_to_not_be_null("order_id")
ds.expect_column_values_to_be_unique("order_id")
ds.expect_column_values_to_match_regex("email", r"^[^@]+@[^@]+\\.[^@]+$")
\`\`\`

## 🚫 Anti-pattern

- Chỉ kiểm tra DQ trên dashboard cuối -> phát hiện muộn 1 ngày
- Check ở 1 nơi (mart) mà không check ở raw -> debug rất khổ
- Alert mọi check -> on-call mệt mỏi, bỏ qua alert quan trọng

## ✅ Checklist DQ

- [ ] Định nghĩa SLA cho mỗi dataset quan trọng
- [ ] Check ở 3 tầng: raw, staging, mart
- [ ] Severity: error (dừng pipeline), warn (gửi Slack), info (chỉ log)
- [ ] Runbook cho mỗi loại lỗi: ai sửa, sửa thế nào
- [ ] Báo cáo DQ trend hàng tuần cho stakeholder
`,
    en: `
## 🔬 Deep dive: Data Quality is not a side task

A McKinsey study put poor data quality cost at ~$3.1 trillion per year in the US alone. Reason: business decisions, ML models, CEO dashboards - all consume data. One wrong revenue column = a wrong quarter.

## ⚙️ Six DAMA DMBOK quality dimensions

1. **Accuracy** - matches reality (order price = contract price)
2. **Completeness** - nothing missing (every order has \`customer_id\`)
3. **Consistency** - no contradictions (sum of items = invoice total)
4. **Timeliness** - on time (yesterday's data lands before 9am)
5. **Uniqueness** - no duplicates (one order = one row)
6. **Validity** - correct format (email has @, birthday < today)

## 🛠️ Common DQ stack

| Tool | Type | Style |
|---|---|---|
| Great Expectations | Python | "Expectations" feel like pytest |
| dbt tests | SQL | Built-in: unique, not_null, accepted_values, relationships |
| Soda Core | YAML | Concise checks, easy to version |
| Monte Carlo / Anomalo | SaaS | ML-based anomaly detection |

## 📝 Great Expectations example

\`\`\`python
import great_expectations as gx
ctx = gx.get_context()
ds = ctx.sources.add_pandas("orders").read_csv("orders.csv")
ds.expect_column_values_to_not_be_null("order_id")
ds.expect_column_values_to_be_unique("order_id")
ds.expect_column_values_to_match_regex("email", r"^[^@]+@[^@]+\\.[^@]+$")
\`\`\`

## 🚫 Anti-patterns

- Only checking DQ at the final dashboard -> you discover issues a day late
- Checking only the mart -> debugging upstream is painful
- Alerting on every check -> on-call fatigue, real alerts get ignored

## ✅ DQ checklist

- [ ] SLA per critical dataset
- [ ] Check at three tiers: raw, staging, mart
- [ ] Severity levels: error (halt pipeline), warn (Slack), info (log only)
- [ ] Runbook per failure: who fixes, how
- [ ] Weekly DQ trend report to stakeholders
`,
  },

  "de-orch-1": {
    vi: `
## 🔬 Đào sâu: Vì sao cần Orchestrator?

Một công ty trung bình có 200-1000 pipeline chạy hàng ngày. Mỗi pipeline có nhiều task phụ thuộc nhau (load -> transform -> test -> publish). Nếu chạy bằng cron + bash, bạn sẽ gặp: thứ tự sai, không retry, không log tập trung, không SLA, debug khổ sở. Orchestrator (Airflow, Prefect, Dagster) giải quyết bằng cách mô tả pipeline dưới dạng **DAG** (Directed Acyclic Graph).

## ⚙️ DAG là gì?

DAG = đồ thị có hướng, không có chu trình. Mỗi node là task, mỗi cạnh là phụ thuộc. Scheduler chỉ chạy task khi mọi task cha đã thành công. Nếu task fail, các task con bị skip (hoặc retry tuỳ cấu hình).

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

with DAG("daily_sales", start_date=datetime(2024,1,1),
         schedule="0 2 * * *", catchup=False) as dag:
    extract = PythonOperator(task_id="extract", python_callable=extract_fn)
    transform = PythonOperator(task_id="transform", python_callable=transform_fn)
    load = PythonOperator(task_id="load", python_callable=load_fn)
    extract >> transform >> load
\`\`\`

## 🏛️ So sánh 3 orchestrator phổ biến

| Tool | Mô hình | Điểm mạnh | Điểm yếu |
|---|---|---|---|
| Airflow | Task-centric (DAG file) | Chuẩn ngành, plugin nhiều | Khó pass data giữa task |
| Prefect | Flow-centric (Python) | Dynamic DAG, Pythonic | Cộng đồng nhỏ hơn |
| Dagster | Asset-centric | Coi data asset là first-class, gắn lineage | Đường cong học cao |

## ⏰ Scheduling pattern

- **Time-based**: cron expression
- **Event-based**: trigger khi file landing trên S3
- **Sensor**: poll cho đến khi điều kiện thoả
- **Backfill**: chạy lại lịch sử cho ngày bị miss

## 🚫 Anti-pattern

- 1 task làm 5 việc -> fail là phải chạy lại cả 5
- Truyền dataframe to qua XCom -> nhồi metadata DB
- Không có SLA -> không biết khi nào pipeline trễ
- Catchup=True mặc định -> ngày đầu deploy chạy 1 năm lịch sử

## ✅ Checklist orchestration

- [ ] Mỗi task **idempotent** + **atomic**
- [ ] Đặt SLA và alert khi vượt
- [ ] Retry với exponential backoff (3 lần, 1m -> 5m -> 25m)
- [ ] Lưu code trong git, deploy qua CI
- [ ] Tách environment dev/staging/prod
`,
    en: `
## 🔬 Deep dive: Why an Orchestrator?

A mid-size company runs 200-1000 pipelines per day. Each has interdependent tasks (load -> transform -> test -> publish). Pure cron + bash gets you: wrong ordering, no retries, no central logs, no SLAs, painful debugging. Orchestrators (Airflow, Prefect, Dagster) fix this by modelling pipelines as a **DAG** (Directed Acyclic Graph).

## ⚙️ What is a DAG?

A DAG is a directed graph with no cycles. Each node is a task, each edge is a dependency. The scheduler runs a task only after all parents succeed. On failure, children are skipped (or retried per config).

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

with DAG("daily_sales", start_date=datetime(2024,1,1),
         schedule="0 2 * * *", catchup=False) as dag:
    extract = PythonOperator(task_id="extract", python_callable=extract_fn)
    transform = PythonOperator(task_id="transform", python_callable=transform_fn)
    load = PythonOperator(task_id="load", python_callable=load_fn)
    extract >> transform >> load
\`\`\`

## 🏛️ Three popular orchestrators

| Tool | Model | Strength | Weakness |
|---|---|---|---|
| Airflow | Task-centric (DAG file) | Industry standard, many plugins | Hard to pass data between tasks |
| Prefect | Flow-centric (Python) | Dynamic DAGs, Pythonic | Smaller community |
| Dagster | Asset-centric | Data assets first-class, lineage built in | Steeper learning curve |

## ⏰ Scheduling patterns

- **Time-based**: cron expression
- **Event-based**: trigger when a file lands on S3
- **Sensor**: poll until condition is met
- **Backfill**: rerun history for missed days

## 🚫 Anti-patterns

- One task doing five things -> any failure forces redoing all five
- Passing large dataframes via XCom -> bloats metadata DB
- No SLA -> you never know when pipelines are late
- catchup=True by default -> day-one deploy replays a year of history

## ✅ Orchestration checklist

- [ ] Tasks are **idempotent** and **atomic**
- [ ] SLAs with alerts when breached
- [ ] Exponential backoff retries (3 attempts: 1m -> 5m -> 25m)
- [ ] Code lives in git, deploys through CI
- [ ] Separate dev/staging/prod environments
`,
  },

  "de-cloud-1": {
    vi: `
## 🔬 Đào sâu: 3 ông lớn và triết lý khác nhau

| Cloud | Khởi nguồn | Triết lý | Mạnh nhất ở |
|---|---|---|---|
| AWS | 2006, từ retail | "Lego blocks" rất nhiều service nhỏ | Thị phần lớn nhất, ecosystem rộng |
| GCP | 2008, từ search | API-first, data/AI hàng đầu | BigQuery, Vertex AI, Kubernetes |
| Azure | 2010, từ Windows | Tích hợp doanh nghiệp Microsoft | AD, Office 365, hybrid cloud |

Học sâu 1 cloud -> 80% kiến thức chuyển sang cloud khác được (compute = EC2/Compute Engine/VM, object store = S3/GCS/Blob, warehouse = Redshift/BigQuery/Synapse).

## 🏛️ Service Data Engineering map

| Tầng | AWS | GCP | Azure |
|---|---|---|---|
| Object store | S3 | GCS | Blob Storage |
| Warehouse | Redshift | BigQuery | Synapse |
| Streaming | Kinesis | Pub/Sub | Event Hubs |
| Orchestration | MWAA (Airflow) | Composer | Data Factory |
| ETL | Glue | Dataflow | Data Factory |
| Compute | EMR (Spark) | Dataproc | HDInsight |
| Catalog | Glue Catalog | Dataplex | Purview |

## 💰 Cost model 101

- **Storage**: ~$0.02/GB/month (S3 Standard), giảm 90% với Glacier
- **Compute**: tính theo giây, tự động scale
- **Egress**: dữ liệu OUT khỏi cloud rất đắt ($0.09/GB) - cẩn thận multi-cloud
- **Warehouse scan**: BigQuery $5/TB scanned -> partition + cluster để tiết kiệm

## 🔐 Shared Responsibility Model

- Cloud lo: hạ tầng vật lý, mạng, virtualization
- Bạn lo: data, IAM, application code, config network

Đa số sự cố data leak là do **misconfiguration** (S3 bucket public, security group mở 0.0.0.0/0), không phải do cloud bị hack.

## 🚫 Anti-pattern

- Dump tất cả vào warehouse -> bill bùng nổ. Hãy raw vào lake, chỉ load mart vào warehouse
- Quên tag resource -> 6 tháng sau không biết ai sở hữu để xoá
- IAM role mở \`*:*\` cho dev -> rủi ro security cực lớn
- Không có budget alert -> tỉnh dậy thấy bill $50,000

## ✅ Cloud DE checklist

- [ ] Đặt budget alert ở 50%, 80%, 100% ngưỡng
- [ ] Tag mọi resource (owner, env, project, cost_center)
- [ ] Lifecycle rule: S3 chuyển sang Glacier sau 90 ngày
- [ ] IaC (Terraform) cho mọi infra, không click console
- [ ] Multi-AZ cho database, backup tự động daily
`,
    en: `
## 🔬 Deep dive: The big three and their philosophies

| Cloud | Origin | Philosophy | Strongest at |
|---|---|---|---|
| AWS | 2006, ex-retail | "Lego blocks" - many small services | Largest market share, broadest ecosystem |
| GCP | 2008, ex-search | API-first, data/AI leadership | BigQuery, Vertex AI, Kubernetes |
| Azure | 2010, ex-Windows | Enterprise Microsoft integration | AD, Office 365, hybrid cloud |

Master one cloud and 80% transfers (compute = EC2/Compute Engine/VM, object store = S3/GCS/Blob, warehouse = Redshift/BigQuery/Synapse).

## 🏛️ Data Engineering service map

| Layer | AWS | GCP | Azure |
|---|---|---|---|
| Object store | S3 | GCS | Blob Storage |
| Warehouse | Redshift | BigQuery | Synapse |
| Streaming | Kinesis | Pub/Sub | Event Hubs |
| Orchestration | MWAA (Airflow) | Composer | Data Factory |
| ETL | Glue | Dataflow | Data Factory |
| Compute | EMR (Spark) | Dataproc | HDInsight |
| Catalog | Glue Catalog | Dataplex | Purview |

## 💰 Cost model 101

- **Storage**: ~$0.02/GB/month (S3 Standard), -90% with Glacier
- **Compute**: per-second billing, autoscaling
- **Egress**: data OUT of cloud is pricey ($0.09/GB) - watch multi-cloud
- **Warehouse scan**: BigQuery is $5/TB scanned -> partition + cluster to save

## 🔐 Shared Responsibility Model

- Cloud handles: physical infra, networking, virtualization
- You handle: data, IAM, application code, network config

Most data leaks come from **misconfiguration** (public S3 bucket, 0.0.0.0/0 security group), not cloud breaches.

## 🚫 Anti-patterns

- Dumping everything into the warehouse -> bill explodes. Land raw in the lake, only marts in the warehouse
- No resource tags -> six months later nobody owns it to delete it
- IAM role with \`*:*\` for dev -> massive security risk
- No budget alert -> wake up to a $50,000 bill

## ✅ Cloud DE checklist

- [ ] Budget alerts at 50%, 80%, 100%
- [ ] Tag every resource (owner, env, project, cost_center)
- [ ] Lifecycle rule: S3 -> Glacier after 90 days
- [ ] IaC (Terraform) for all infra, no console clicking
- [ ] Multi-AZ databases, automated daily backups
`,
  },

  "de-prod-1": {
    vi: `
## 🔬 Đào sâu: Code chạy được vs Code production

Sinh viên thường nghĩ "pipeline chạy ra số là xong". Production khác: 2h sáng task fail, on-call phải hiểu lý do trong 10 phút và sửa hoặc rollback. Khoảng cách giữa "chạy được" và "production" = **observability + reliability + security + cost**.

## 🛠️ 4 trụ cột production

### 1. Reliability
- Idempotent: chạy lại nhiều lần ra cùng kết quả
- Retry với backoff và max attempts
- Circuit breaker khi downstream chết
- Graceful degradation: cảnh báo nhưng vẫn cho job khác chạy

### 2. Observability
- **Logs** có structure (JSON), có \`trace_id\`
- **Metrics**: row_count, duration, error_rate -> Prometheus/CloudWatch
- **Traces** (OpenTelemetry) để debug pipeline phức tạp
- **Lineage** (OpenLineage, dbt docs) để biết "cột này từ đâu ra"

### 3. Security & Compliance
- Secret trong vault, không trong code/env
- PII được mask hoặc tokenize ở staging
- Audit log cho mọi thay đổi schema
- GDPR/CCPA: hỗ trợ right-to-be-forgotten

### 4. Cost
- Tag resource, FinOps dashboard
- Auto-suspend warehouse khi idle
- Partition + cluster để giảm bytes scanned
- Cảnh báo khi job consume > 2x trung bình

## 📝 Runbook template

\`\`\`markdown
## Pipeline: daily_sales_etl

### SLA
- Hoàn thành trước 7:00 ICT
- Tolerance: 30 phút

### Khi task \`extract\` fail
1. Kiểm tra source Postgres còn sống: \`psql ... -c "SELECT 1"\`
2. Xem error log: Airflow UI -> task \`extract\` -> logs
3. Nếu là timeout -> increase \`statement_timeout\` lên 60s, retry
4. Nếu là schema change -> ping #data-eng, tạo ticket

### Rollback
- \`dbt run --select tag:sales --vars '{run_date: yesterday}'\`
\`\`\`

## 🚫 Anti-pattern

- "Works on my machine" -> không có Docker/poetry lock
- Deploy thẳng vào prod -> không CI test
- Hardcode credential -> push lên git là toang
- Không có on-call rotation -> 1 người gánh tất cả

## ✅ Production checklist

- [ ] CI: lint + unit test + integration test
- [ ] CD: staging trước, sau đó canary, sau đó full
- [ ] Mọi pipeline có runbook + owner
- [ ] Dashboard SLA cho leadership
- [ ] Postmortem mỗi incident, không đổ lỗi cá nhân
`,
    en: `
## 🔬 Deep dive: Code that runs vs production code

Students often think "the pipeline produced a number, done". Production is different: at 2am a task fails and on-call must understand it in 10 minutes and either fix or roll back. The gap between "runs" and "production" = **observability + reliability + security + cost**.

## 🛠️ Four production pillars

### 1. Reliability
- Idempotent: re-runs produce identical output
- Retries with backoff and a max attempts limit
- Circuit breaker when a downstream dies
- Graceful degradation: alert but keep other jobs running

### 2. Observability
- **Structured logs** (JSON) with a \`trace_id\`
- **Metrics**: row_count, duration, error_rate -> Prometheus/CloudWatch
- **Traces** (OpenTelemetry) for complex pipelines
- **Lineage** (OpenLineage, dbt docs) so you know "where this column came from"

### 3. Security & Compliance
- Secrets in a vault, never in code or env files
- PII masked or tokenised in staging
- Audit log for every schema change
- GDPR/CCPA: support right-to-be-forgotten

### 4. Cost
- Tag resources, FinOps dashboard
- Auto-suspend idle warehouses
- Partition + cluster to reduce bytes scanned
- Alert when a job consumes > 2x its baseline

## 📝 Runbook template

\`\`\`markdown
## Pipeline: daily_sales_etl

### SLA
- Done before 07:00 ICT
- Tolerance: 30 minutes

### When \`extract\` fails
1. Check source Postgres: \`psql ... -c "SELECT 1"\`
2. View error log: Airflow UI -> task \`extract\` -> logs
3. If timeout -> bump \`statement_timeout\` to 60s, retry
4. If schema change -> ping #data-eng, file a ticket

### Rollback
- \`dbt run --select tag:sales --vars '{run_date: yesterday}'\`
\`\`\`

## 🚫 Anti-patterns

- "Works on my machine" -> no Docker / poetry lock
- Deploying straight to prod -> no CI tests
- Hardcoded credentials -> pushed to git, instant breach
- No on-call rotation -> one person carries the team

## ✅ Production checklist

- [ ] CI: lint + unit tests + integration tests
- [ ] CD: staging first, then canary, then full
- [ ] Every pipeline has a runbook + owner
- [ ] SLA dashboard for leadership
- [ ] Blameless postmortem per incident
`,
  },

  // -------- Expansion lessons --------
  "de-lake-1": {
    vi: `
## 🔬 Đào sâu: Vì sao Lakehouse ra đời?

Trước 2020, doanh nghiệp phải chọn: **Data Lake** (S3 + Parquet) rẻ, mở, nhưng không có ACID, schema yếu, query chậm; hoặc **Warehouse** (Snowflake, BigQuery) nhanh, có ACID, nhưng đắt và khoá vendor. Lakehouse (Databricks Delta Lake, Apache Iceberg, Apache Hudi) giải quyết bằng cách **thêm tầng metadata transactional lên trên Parquet/ORC** để có ACID, time travel, schema evolution - vẫn lưu trên object store rẻ.

## ⚙️ Cách Iceberg/Delta hoạt động

Mỗi commit ghi:
1. File data mới (Parquet)
2. File manifest liệt kê các file thuộc snapshot
3. Một con trỏ atomic vào snapshot mới (metadata.json)

Đọc query: engine đọc snapshot hiện tại -> manifest -> chỉ scan file cần thiết (partition pruning + min/max stats). Vì commit là atomic, reader không thấy trạng thái nửa vời.

## 🕰️ Time Travel

\`\`\`sql
-- Đọc bảng tại thời điểm 1 giờ trước
SELECT * FROM sales VERSION AS OF 12345;
SELECT * FROM sales TIMESTAMP AS OF '2024-06-01 10:00:00';
\`\`\`

Hữu ích cho: audit, debug pipeline, A/B compare trước/sau migration.

## 📐 So sánh format Lakehouse

| Format | Vendor chính | Mạnh nhất | Hỗ trợ engine |
|---|---|---|---|
| Delta Lake | Databricks | Tích hợp Spark sâu | Spark, Trino, Flink |
| Iceberg | Netflix, Apache | Open, neutral | Spark, Trino, Snowflake, BigQuery |
| Hudi | Uber, Apache | Streaming upsert | Spark, Flink |

Xu hướng 2024-2026: Iceberg đang thắng vì open và được Snowflake/BigQuery hỗ trợ native.

## 🚫 Anti-pattern

- Đổ JSON nhỏ liên tục -> "small file problem", phải compact định kỳ
- Không partition theo cột thời gian -> mọi query scan full table
- Không vacuum file cũ -> dung lượng tăng vô hạn

## ✅ Checklist Lakehouse

- [ ] Partition theo cột thời gian, cluster theo cột filter chính
- [ ] Schedule compaction (OPTIMIZE / rewrite_data_files) hàng đêm
- [ ] Vacuum file > 7 ngày sau khi confirm không cần time travel
- [ ] Catalog tập trung (Glue, Unity Catalog, Nessie)
`,
    en: `
## 🔬 Deep dive: Why Lakehouse exists

Before 2020 you had to choose: **Data Lake** (S3 + Parquet) cheap, open, but no ACID, weak schema, slow queries; or **Warehouse** (Snowflake, BigQuery) fast, ACID, but expensive and vendor-locked. Lakehouse (Databricks Delta Lake, Apache Iceberg, Apache Hudi) solves this by **adding a transactional metadata layer on top of Parquet/ORC** - ACID, time travel, schema evolution, all on cheap object storage.

## ⚙️ How Iceberg/Delta work

Each commit writes:
1. New data files (Parquet)
2. A manifest listing files in the snapshot
3. An atomic pointer to the new snapshot (metadata.json)

Reads: the engine fetches the current snapshot -> manifest -> scans only required files (partition pruning + min/max stats). Atomic commits mean readers never see half-written state.

## 🕰️ Time Travel

\`\`\`sql
SELECT * FROM sales VERSION AS OF 12345;
SELECT * FROM sales TIMESTAMP AS OF '2024-06-01 10:00:00';
\`\`\`

Use cases: audit, pipeline debugging, A/B comparison pre/post migration.

## 📐 Lakehouse format comparison

| Format | Backer | Strongest at | Engine support |
|---|---|---|---|
| Delta Lake | Databricks | Deep Spark integration | Spark, Trino, Flink |
| Iceberg | Netflix, Apache | Open, neutral | Spark, Trino, Snowflake, BigQuery |
| Hudi | Uber, Apache | Streaming upserts | Spark, Flink |

2024-2026 trend: Iceberg is winning thanks to openness and native support from Snowflake/BigQuery.

## 🚫 Anti-patterns

- Continuously dumping tiny JSON files -> "small file problem", needs compaction
- No time-column partitioning -> every query scans the full table
- Never vacuuming old files -> storage grows forever

## ✅ Lakehouse checklist

- [ ] Partition on time column, cluster on main filter column
- [ ] Schedule compaction (OPTIMIZE / rewrite_data_files) nightly
- [ ] Vacuum files > 7 days after confirming no time-travel need
- [ ] Centralised catalog (Glue, Unity Catalog, Nessie)
`,
  },

  "de-dbt-1": {
    vi: `
## 🔬 Đào sâu: dbt thay đổi cách viết transform

Trước dbt, transform sống trong stored procedure 2000 dòng, không có git, không có test, không ai dám sửa. dbt (data build tool) áp dụng **best practice của software engineering vào SQL**: model = file .sql, dependency = \`ref()\`, test = file yaml, docs auto sinh, lineage hiển thị bằng graph.

## ⚙️ Workflow dbt

\`\`\`text
models/
├── staging/      (1:1 với raw, đổi tên cột)
│   └── stg_orders.sql
├── intermediate/ (join, dedupe)
│   └── int_orders_enriched.sql
└── marts/        (business-facing fact/dim)
    └── fct_daily_sales.sql

tests/
└── assert_no_negative_revenue.sql
\`\`\`

\`dbt run\` chạy theo đúng thứ tự phụ thuộc (suy ra từ \`ref()\`), parallel khi có thể.

## 🧪 Tests

- **Generic tests** (yaml): unique, not_null, accepted_values, relationships
- **Singular tests** (sql): file .sql trả về 0 dòng = pass

\`\`\`yaml
# models/marts/schema.yml
models:
  - name: fct_daily_sales
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: country
        tests:
          - accepted_values:
              values: ['VN', 'US', 'JP']
\`\`\`

## 🏗️ Materialization strategies

| Strategy | Lưu trữ | Khi dùng |
|---|---|---|
| view | SQL view, không materialise | Logic đơn giản, ít query |
| table | CREATE TABLE AS, full refresh | Mart nhỏ, query nhiều |
| incremental | Chỉ insert/update dòng mới | Bảng lớn, append heavy |
| ephemeral | Inline CTE | Sub-step, không cần persist |
| snapshot | SCD Type 2 | Track lịch sử dimension |

## 🚫 Anti-pattern

- Đặt mọi thứ là \`table\` -> rebuild hàng đêm tốn $$
- Dùng \`source()\` nhưng không có freshness check -> không biết source trễ
- Không có naming convention -> 200 model trộn lẫn

## ✅ dbt checklist

- [ ] Cấu trúc thư mục: staging / intermediate / marts
- [ ] Mọi model có description trong yaml
- [ ] Test cho mọi cột key (unique, not_null, relationships)
- [ ] CI: \`dbt build --select state:modified+\` trên PR
- [ ] dbt docs deploy tự động để stakeholder xem
`,
    en: `
## 🔬 Deep dive: dbt changed how transforms are written

Before dbt, transforms lived in 2000-line stored procedures: no git, no tests, nobody dared touch them. dbt (data build tool) brings **software engineering best practice to SQL**: models are .sql files, dependencies use \`ref()\`, tests live in yaml, docs auto-generate, lineage renders as a graph.

## ⚙️ dbt workflow

\`\`\`text
models/
├── staging/      (1:1 with raw, renames only)
│   └── stg_orders.sql
├── intermediate/ (joins, dedupe)
│   └── int_orders_enriched.sql
└── marts/        (business-facing fact/dim)
    └── fct_daily_sales.sql

tests/
└── assert_no_negative_revenue.sql
\`\`\`

\`dbt run\` executes in dependency order (inferred from \`ref()\`) and parallelises when safe.

## 🧪 Tests

- **Generic tests** (yaml): unique, not_null, accepted_values, relationships
- **Singular tests** (sql): a .sql returning 0 rows = pass

\`\`\`yaml
models:
  - name: fct_daily_sales
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: country
        tests:
          - accepted_values:
              values: ['VN', 'US', 'JP']
\`\`\`

## 🏗️ Materialization strategies

| Strategy | Storage | When |
|---|---|---|
| view | SQL view, not materialised | Simple logic, low query volume |
| table | CREATE TABLE AS, full refresh | Small mart, queried often |
| incremental | Insert/update new rows only | Large append-heavy tables |
| ephemeral | Inline CTE | Sub-step, no need to persist |
| snapshot | SCD Type 2 | Dimension history tracking |

## 🚫 Anti-patterns

- Materialising everything as \`table\` -> expensive nightly rebuilds
- Using \`source()\` without a freshness check -> blind to upstream delays
- No naming convention -> 200 models become a swamp

## ✅ dbt checklist

- [ ] Folder layout: staging / intermediate / marts
- [ ] Every model has a yaml description
- [ ] Tests on every key column (unique, not_null, relationships)
- [ ] CI runs \`dbt build --select state:modified+\` on PRs
- [ ] dbt docs deployed automatically for stakeholders
`,
  },

  "de-cdc-1": {
    vi: `
## 🔬 Đào sâu: Vì sao CDC quan trọng?

Sync database thông thường: mỗi giờ \`SELECT * WHERE updated_at > last_sync\`. Vấn đề: load nặng lên primary, miss bản delete, miss bản update giữa 2 lần sync (nếu update nhiều lần). **CDC (Change Data Capture)** đọc trực tiếp từ **transaction log** (WAL ở Postgres, binlog ở MySQL) - mỗi insert/update/delete đều được capture theo thứ tự, không miss, không gánh primary.

## ⚙️ 2 cách triển khai CDC

### 1. Log-based (chuẩn)
Đọc WAL/binlog qua tool như **Debezium** -> publish vào Kafka -> downstream consume.

Ưu: chính xác, near real-time, không động primary. Nhược: cần setup phức tạp, cần permission đặc biệt.

### 2. Query-based
Định kỳ \`SELECT WHERE updated_at > X\`. Đơn giản nhưng miss delete và update trung gian.

## 🛠️ Stack CDC phổ biến

\`\`\`text
Postgres WAL -> Debezium connector -> Kafka topic (orders.cdc)
                                   -> Sink connector -> Iceberg / Snowflake
                                   -> Flink processor -> real-time fraud check
\`\`\`

Mỗi event Kafka có schema:
\`\`\`json
{
  "op": "u",                  // c=create, u=update, d=delete
  "before": { ... },
  "after": { ... },
  "ts_ms": 1701234567890,
  "source": { "table": "orders", "lsn": "0/1A2B3C" }
}
\`\`\`

## 🔁 Xử lý ở downstream

- **Append mode**: lưu mọi event -> có lịch sử thay đổi đầy đủ (audit)
- **Upsert mode**: merge vào bảng đích bằng \`MERGE\` / \`UPSERT\` -> reflect trạng thái hiện tại
- **SCD Type 2 mode**: append với \`valid_from\`, \`valid_to\` -> giữ lịch sử trong bảng dimension

## 🚫 Anti-pattern

- Đọc WAL nhưng không monitor lag -> primary đầy WAL, hết disk
- Không xử lý schema change (DDL) -> consumer chết khi cột mới thêm
- Upsert mà không có natural key -> dữ liệu nhân bản

## ✅ CDC checklist

- [ ] Monitor replication slot lag (Postgres) hoặc binlog lag (MySQL)
- [ ] Schema registry (Avro/Protobuf) + compatibility check
- [ ] Dead-letter topic cho event lỗi schema
- [ ] Test failover: kill Debezium -> restart -> không miss event
- [ ] Retention WAL đủ dài (7 ngày) để recover khi downstream chết
`,
    en: `
## 🔬 Deep dive: Why CDC matters

Naive DB sync: hourly \`SELECT * WHERE updated_at > last_sync\`. Problems: load on the primary, missed deletes, missed intermediate updates between syncs. **CDC (Change Data Capture)** reads straight from the **transaction log** (Postgres WAL, MySQL binlog) - every insert/update/delete is captured in order, nothing missed, no extra primary load.

## ⚙️ Two CDC implementations

### 1. Log-based (the standard)
Read WAL/binlog via tools like **Debezium** -> publish to Kafka -> downstream consumers.

Pros: precise, near real time, no load on primary. Cons: complex setup, special permissions.

### 2. Query-based
Periodic \`SELECT WHERE updated_at > X\`. Simple but misses deletes and intermediate updates.

## 🛠️ Common CDC stack

\`\`\`text
Postgres WAL -> Debezium connector -> Kafka topic (orders.cdc)
                                   -> Sink connector -> Iceberg / Snowflake
                                   -> Flink processor -> real-time fraud check
\`\`\`

Each Kafka event has a schema:
\`\`\`json
{
  "op": "u",
  "before": { ... },
  "after": { ... },
  "ts_ms": 1701234567890,
  "source": { "table": "orders", "lsn": "0/1A2B3C" }
}
\`\`\`

## 🔁 Downstream handling

- **Append mode**: store every event -> full change history (audit)
- **Upsert mode**: MERGE/UPSERT into target -> reflects current state
- **SCD Type 2 mode**: append with \`valid_from\`, \`valid_to\` -> dimension history

## 🚫 Anti-patterns

- Reading WAL without lag monitoring -> WAL grows until disk fills
- Ignoring schema changes (DDL) -> consumers crash on new columns
- Upsert without a natural key -> duplicated rows

## ✅ CDC checklist

- [ ] Monitor replication slot lag (Postgres) or binlog lag (MySQL)
- [ ] Schema registry (Avro/Protobuf) + compatibility check
- [ ] Dead-letter topic for schema-error events
- [ ] Test failover: kill Debezium -> restart -> no missed events
- [ ] WAL retention long enough (7 days) to recover from downstream outages
`,
  },

  "de-obs-1": {
    vi: `
## 🔬 Đào sâu: Data Observability vs Monitoring

Monitoring trả lời "pipeline có chạy không?". Observability trả lời "dữ liệu có đáng tin không?". Đây là khái niệm mới (Barr Moses, 2020) với **5 trụ cột**:

1. **Freshness** - dữ liệu cập nhật lần cuối lúc nào?
2. **Volume** - số dòng/ngày có lệch khỏi pattern thường?
3. **Schema** - cột nào mới thêm/đổi/xoá?
4. **Distribution** - giá trị có nằm trong dải bình thường?
5. **Lineage** - cột này phụ thuộc upstream nào?

## ⚙️ Cơ chế phát hiện bất thường

Tool như Monte Carlo, Anomalo, Bigeye học pattern lịch sử (rolling 30 ngày) rồi alert khi metric lệch > N sigma. Ví dụ: bảng \`orders\` thường có 100k dòng/ngày -> hôm nay chỉ 20k -> alert ngay, không cần con người viết rule cứng.

\`\`\`text
Anomaly score = (today_value - rolling_mean) / rolling_std
Alert when |score| > 3
\`\`\`

## 🌐 OpenLineage chuẩn hoá lineage

OpenLineage là spec mở để mọi tool (Airflow, dbt, Spark) emit event lineage cùng format. Backend như Marquez/DataHub tổng hợp thành graph "cột X trong mart đến từ cột Y trong source".

## 📊 Dashboard nên có

| Tab | Metric | Threshold |
|---|---|---|
| Freshness | hours_since_last_load | > 26h cho daily, > 2h cho hourly |
| Volume | row_count_delta_pct | > ±30% so với median 7 ngày |
| Schema | new_cols, dropped_cols | bất kỳ thay đổi |
| DQ | failing_tests | > 0 |
| Cost | bytes_scanned_today | > 2x baseline |

## 🚫 Anti-pattern

- Chỉ alert qua email -> bỏ sót. Hãy dùng PagerDuty/Slack channel chuyên dụng
- Alert mọi anomaly -> alert fatigue. Phân loại P0/P1/P2
- Không có owner mỗi dataset -> alert chạy vòng quanh

## ✅ Observability checklist

- [ ] Mỗi dataset critical có SLA + owner trong catalog
- [ ] OpenLineage events từ Airflow + dbt -> Marquez
- [ ] Anomaly detection trên top 20 bảng quan trọng
- [ ] Postmortem khi SLA bị miss
- [ ] Health score 0-100 cho mỗi dataset, hiển thị lên catalog
`,
    en: `
## 🔬 Deep dive: Data Observability vs Monitoring

Monitoring answers "is the pipeline running?". Observability answers "is the data trustworthy?". Coined by Barr Moses in 2020, it rests on **five pillars**:

1. **Freshness** - when did data last update?
2. **Volume** - is row count today off baseline?
3. **Schema** - which columns were added/changed/dropped?
4. **Distribution** - are values inside the normal range?
5. **Lineage** - what upstream feeds this column?

## ⚙️ How anomaly detection works

Tools like Monte Carlo, Anomalo, Bigeye learn historical patterns (rolling 30 days) and alert when a metric deviates > N sigma. Example: \`orders\` table usually 100k rows/day -> today 20k -> instant alert, no hand-written rules.

\`\`\`text
Anomaly score = (today_value - rolling_mean) / rolling_std
Alert when |score| > 3
\`\`\`

## 🌐 OpenLineage standardises lineage

OpenLineage is an open spec so any tool (Airflow, dbt, Spark) emits lineage events in the same shape. Backends like Marquez/DataHub stitch them into a graph: "column X in the mart comes from column Y in the source".

## 📊 Dashboard you should have

| Tab | Metric | Threshold |
|---|---|---|
| Freshness | hours_since_last_load | > 26h daily, > 2h hourly |
| Volume | row_count_delta_pct | > ±30% vs 7-day median |
| Schema | new_cols, dropped_cols | any change |
| DQ | failing_tests | > 0 |
| Cost | bytes_scanned_today | > 2x baseline |

## 🚫 Anti-patterns

- Email-only alerts -> ignored. Use PagerDuty/dedicated Slack channels
- Alerting on every anomaly -> fatigue. Tier as P0/P1/P2
- No per-dataset owner -> alerts ping-pong forever

## ✅ Observability checklist

- [ ] Every critical dataset has SLA + owner in the catalog
- [ ] OpenLineage events from Airflow + dbt -> Marquez
- [ ] Anomaly detection on the top 20 critical tables
- [ ] Postmortem when SLA is missed
- [ ] 0-100 health score per dataset, shown in catalog
`,
  },

  // ============================================================
  // SQL - deep dives
  // ============================================================
  "sql-select-1": {
    vi: `
## 🔬 Đào sâu: SELECT chạy thực sự như thế nào?

Một câu \`SELECT col FROM t WHERE x\` được engine xử lý theo thứ tự **logic** khác với thứ tự bạn viết: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Hiểu thứ tự này giúp bạn lý giải vì sao không thể dùng alias từ SELECT trong WHERE, nhưng được dùng trong ORDER BY.

## ⚙️ Projection vs Selection

- **Projection**: chọn cột (giảm chiều ngang). Càng ít cột -> ít I/O, ít memory, dễ vào cache.
- **Selection**: chọn dòng (giảm chiều dọc) thông qua WHERE. Engine sẽ cố đẩy WHERE xuống tầng storage (predicate pushdown) để đọc ít block hơn.

\`SELECT *\` là anti-pattern trong production vì khoá chặt schema (đổi cột là client vỡ), và phá vỡ index-only scan.

## 📐 Checklist
- Đặt tên alias rõ ràng (\`u.email AS user_email\`)
- Tránh \`SELECT *\`, liệt kê cột cụ thể
- Dùng LIMIT khi explore data lớn
`,
    en: `
## 🔬 Deep dive: how SELECT actually runs

A query \`SELECT col FROM t WHERE x\` is processed in this **logical** order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. That is why you cannot use a SELECT alias in WHERE but can use it in ORDER BY.

## ⚙️ Projection vs Selection

- **Projection** picks columns (fewer columns = less I/O, more cache-friendly).
- **Selection** picks rows via WHERE; the engine tries to push predicates down to storage.

\`SELECT *\` is an anti-pattern in production: schema changes break clients and it disables index-only scans.

## 📐 Checklist
- Use clear aliases, list columns explicitly, add LIMIT while exploring large tables.
`,
  },

  "sql-where-1": {
    vi: `
## 🔬 Vì sao WHERE đôi khi không dùng index?

Index chỉ được dùng khi cột nằm "trần" ở vế trái: \`WHERE created_at >= '2026-01-01'\` dùng được index, còn \`WHERE date(created_at) = '2026-01-01'\` thì không vì hàm bọc quanh cột làm engine không khớp được B-Tree. Đây gọi là **non-sargable predicate**.

## ⚙️ NULL không bằng NULL

\`x = NULL\` luôn trả về UNKNOWN. Phải dùng \`IS NULL\`. Tương tự \`x NOT IN (subquery)\` sẽ trả về 0 dòng nếu subquery có NULL - rất nhiều bug production xuất phát từ đây. Dùng \`NOT EXISTS\` an toàn hơn.

## 📐 Anti-pattern
- \`WHERE LOWER(email) = 'a@b.com'\` (thay bằng functional index hoặc lưu lowercase)
- \`WHERE col LIKE '%abc%'\` (không dùng B-Tree; cân nhắc full-text)
- \`WHERE col + 1 = 10\` (chuyển vế: \`col = 9\`)
`,
    en: `
## 🔬 Why WHERE sometimes skips the index

Indexes only kick in when the column appears bare on the left: \`created_at >= '2026-01-01'\` is sargable, \`date(created_at) = '2026-01-01'\` is not because a function wrapping the column breaks B-Tree lookup.

## ⚙️ NULL is not equal to NULL

\`x = NULL\` is always UNKNOWN; use \`IS NULL\`. \`x NOT IN (subquery)\` returns zero rows when the subquery has any NULL - prefer \`NOT EXISTS\`.

## 📐 Anti-patterns
- \`LOWER(email) = ...\` -> store lowercase or add a functional index.
- \`col LIKE '%abc%'\` -> consider full-text search.
- \`col + 1 = 10\` -> rewrite as \`col = 9\`.
`,
  },

  "sql-agg-1": {
    vi: `
## 🔬 Aggregate: GROUP BY và HAVING

Engine quét bảng, băm theo nhóm (hash aggregation) hoặc sort rồi gom (sort aggregation). Hash nhanh hơn với cardinality vừa phải, sort tốt khi data đã sắp xếp sẵn theo index.

## ⚙️ HAVING vs WHERE
- WHERE lọc dòng **trước** khi gom -> giảm chi phí aggregation.
- HAVING lọc nhóm **sau** khi gom -> dùng khi điều kiện dựa vào hàm tổng (\`HAVING COUNT(*) > 10\`).

## 📐 Bẫy thường gặp
- \`SELECT user_id, name, COUNT(*) FROM orders GROUP BY user_id\` sẽ lỗi (name không nằm trong GROUP BY) - phải thêm name hoặc dùng MAX(name).
- COUNT(*) đếm cả NULL, COUNT(col) bỏ NULL. Khác biệt này thay đổi kết quả báo cáo.
`,
    en: `
## 🔬 GROUP BY and HAVING internals

Engines aggregate via hash or sort. Hash is faster for moderate cardinality; sort wins when data is already ordered by an index.

## ⚙️ HAVING vs WHERE
- WHERE filters **before** grouping (cheaper).
- HAVING filters groups **after** aggregation (\`HAVING COUNT(*) > 10\`).

## 📐 Pitfalls
- Selecting a non-grouped column without an aggregate is illegal in strict SQL.
- COUNT(*) includes NULLs; COUNT(col) skips them - this single difference has changed many BI reports.
`,
  },

  "sql-join-1": {
    vi: `
## 🔬 Bên trong JOIN: 3 thuật toán

1. **Nested Loop**: với mỗi dòng bảng A, tìm match ở bảng B qua index. Tốt khi A nhỏ.
2. **Hash Join**: build hash table trên bảng nhỏ, probe bằng bảng lớn. Mặc định cho join lớn không có index.
3. **Merge Join**: cả 2 bên đã sắp xếp theo key -> đi song song. Cực nhanh nếu có index cluster.

Hiểu plan để chọn index: nếu thấy "Seq Scan + Hash Join" trên bảng lớn, có thể chỉ cần index trên FK là chuyển thành Nested Loop tối ưu.

## ⚙️ LEFT JOIN bị lọc oan

\`LEFT JOIN b ON ... WHERE b.x = 1\` biến thành INNER JOIN vì WHERE loại các dòng b NULL. Đặt điều kiện trong ON: \`LEFT JOIN b ON ... AND b.x = 1\` để giữ semantics LEFT.

## 📐 Checklist
- FK luôn nên có index
- Tránh \`SELECT *\` khi join (cột trùng tên gây nhầm lẫn)
- Cân nhắc EXISTS thay vì JOIN khi chỉ cần kiểm tra tồn tại
`,
    en: `
## 🔬 Three JOIN algorithms

1. **Nested Loop**: scan A, probe B via index. Best when A is tiny.
2. **Hash Join**: build hash on small side, probe with the big side. Default for large unindexed joins.
3. **Merge Join**: both sides sorted by key, walk in parallel. Excellent with clustered indexes.

Read the plan: a Seq Scan + Hash Join over a big table often turns into an efficient Nested Loop once you add an index on the foreign key.

## ⚙️ LEFT JOIN silently becoming INNER

\`LEFT JOIN b ON ... WHERE b.x = 1\` filters away the NULL right side. Move the predicate into ON: \`LEFT JOIN b ON ... AND b.x = 1\`.

## 📐 Checklist
- Always index foreign keys; avoid \`SELECT *\`; prefer EXISTS for existence checks.
`,
  },

  "sql-sub-1": {
    vi: `
## 🔬 Subquery: correlated vs uncorrelated

- **Uncorrelated**: chạy 1 lần, kết quả dùng như hằng số (\`WHERE x IN (SELECT id FROM ...)\`)
- **Correlated**: tham chiếu cột bảng ngoài -> chạy lại cho từng dòng -> chậm khi không có index.

Optimizer hiện đại thường viết lại IN/EXISTS thành semi-join, nhưng đừng phụ thuộc may rủi: nếu thấy chậm, viết lại bằng JOIN hoặc CTE để rõ ý định.

## ⚙️ Khi nào dùng subquery vs CTE?
- Subquery: gọn, dùng 1 lần.
- CTE: tái sử dụng, dễ đọc nhiều tầng. Lưu ý PostgreSQL <12 materialize CTE -> có thể chậm hơn subquery.
`,
    en: `
## 🔬 Correlated vs uncorrelated subqueries

Uncorrelated subqueries run once; correlated ones re-run per outer row and need indexes to stay fast.

Modern optimizers rewrite IN/EXISTS into semi-joins, but for clarity and predictable plans, rewrite painful subqueries as explicit JOINs or CTEs.

## ⚙️ Subquery vs CTE
CTEs are great for readability and reuse; pre-PG12 they materialize, which can be slower than an inline subquery.
`,
  },

  "sql-cte-1": {
    vi: `
## 🔬 CTE và Recursive CTE

CTE (WITH) cho phép đặt tên kết quả trung gian, làm query đa tầng dễ đọc như đọc đoạn văn. Recursive CTE là công cụ chuẩn cho dữ liệu cây/đồ thị (org chart, danh mục lồng nhau, đường đi).

\`\`\`sql
WITH RECURSIVE tree AS (
  SELECT id, parent_id, name, 1 AS depth FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.parent_id, c.name, t.depth + 1
  FROM categories c JOIN tree t ON c.parent_id = t.id
)
SELECT * FROM tree;
\`\`\`

## 📐 Checklist
- Luôn có điều kiện dừng (anchor query) trong recursive CTE
- Đặt giới hạn depth để tránh vòng lặp vô hạn khi data bẩn
`,
    en: `
## 🔬 CTEs and recursive CTEs

CTEs name intermediate results so multi-stage queries read like prose. Recursive CTEs are the canonical tool for tree/graph data (org charts, nested categories, paths).

\`\`\`sql
WITH RECURSIVE tree AS (
  SELECT id, parent_id, 1 AS depth FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.parent_id, t.depth + 1
  FROM categories c JOIN tree t ON c.parent_id = t.id
)
SELECT * FROM tree;
\`\`\`

Always anchor the recursion and bound depth to survive dirty data.
`,
  },

  "sql-win-1": {
    vi: `
## 🔬 Window function: tính theo "khung cửa sổ"

Khác với GROUP BY (gom lại còn 1 dòng/nhóm), window function giữ nguyên số dòng và tính toán trên một "khung" (\`OVER (PARTITION BY ... ORDER BY ...)\`). Đây là vũ khí số 1 cho báo cáo: running total, moving average, ranking, gap analysis.

\`\`\`sql
SELECT user_id, order_date, amount,
  SUM(amount) OVER (PARTITION BY user_id ORDER BY order_date) AS running_total,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) AS rn
FROM orders;
\`\`\`

## ⚙️ Frame clause
Mặc định là \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`. Đổi sang \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` để có moving average 7 ngày.
`,
    en: `
## 🔬 Window functions: compute over a "window"

Unlike GROUP BY, window functions keep every row and compute over a frame (\`OVER (PARTITION BY ... ORDER BY ...)\`). They power running totals, moving averages, ranking, and gap analysis.

\`\`\`sql
SELECT user_id, order_date, amount,
  SUM(amount) OVER (PARTITION BY user_id ORDER BY order_date) AS running_total
FROM orders;
\`\`\`

The default frame is \`RANGE UNBOUNDED PRECEDING\`; switch to \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` for a 7-day moving average.
`,
  },

  "sql-idx-1": {
    vi: `
## 🔬 B-Tree index hoạt động ra sao?

Một B-Tree là cây cân bằng đa nhánh: tra cứu O(log n), quét range nhanh vì lá liên kết kép. Postgres mặc định dùng B-Tree; ngoài ra có Hash (chỉ equal), GIN (mảng/JSONB/full-text), BRIN (cột tăng dần như timestamp), GiST (geo).

## ⚙️ Composite index và quy tắc tiền tố trái

\`INDEX (a, b, c)\` phục vụ được: \`WHERE a=?\`, \`WHERE a=? AND b=?\`, \`WHERE a=? AND b=? AND c=?\`, nhưng KHÔNG phục vụ \`WHERE b=?\` đơn lẻ. Thứ tự cột quan trọng - đặt cột có chọn lọc cao (cardinality lớn) trước.

## 📐 Trade-off
Mỗi index tăng tốc đọc nhưng làm chậm INSERT/UPDATE/DELETE và tốn dung lượng. Đo bằng \`pg_stat_user_indexes\` để bỏ index không bao giờ được dùng.
`,
    en: `
## 🔬 How a B-Tree index works

A B-Tree is a balanced multi-way tree: O(log n) lookup, fast range scans thanks to doubly-linked leaves. Postgres also offers Hash (equality), GIN (arrays/JSONB/full-text), BRIN (monotonic columns), GiST (geo).

## ⚙️ Composite indexes and left-prefix rule

\`INDEX (a, b, c)\` serves queries that filter on \`a\`, \`a+b\`, or \`a+b+c\` but not \`b\` alone. Place high-cardinality columns first.

## 📐 Trade-off
Every index speeds reads but slows writes and costs storage. Drop unused indexes (check \`pg_stat_user_indexes\`).
`,
  },

  "sql-design-1": {
    vi: `
## 🔬 Chuẩn hoá: 1NF -> 2NF -> 3NF

- **1NF**: mỗi ô là giá trị nguyên tử (không list trong cột).
- **2NF**: không có phụ thuộc một phần vào khoá chính phức hợp.
- **3NF**: không có phụ thuộc bắc cầu (A -> B -> C trong cùng bảng).

Mục tiêu: loại bỏ trùng lặp và bất thường khi INSERT/UPDATE/DELETE. Trong OLTP, đi đến 3NF là chuẩn; trong OLAP/warehouse thì cố ý **denormalize** thành star schema để truy vấn nhanh hơn.

## ⚙️ Khoá tự nhiên vs khoá thay thế (surrogate)
- Tự nhiên (email, mã số thuế): có ý nghĩa nghiệp vụ nhưng dễ đổi.
- Thay thế (UUID, BIGINT IDENTITY): ổn định, vô nghĩa nghiệp vụ - khuyến nghị cho PK.

## 📐 Checklist
- PK trên mọi bảng, FK với ON DELETE rõ ràng (CASCADE / SET NULL / RESTRICT)
- Constraint UNIQUE, CHECK ngay ở DB - đừng phụ thuộc app validate
`,
    en: `
## 🔬 1NF -> 2NF -> 3NF

- 1NF: atomic values per cell.
- 2NF: no partial dependency on a composite PK.
- 3NF: no transitive dependency (A -> B -> C in one table).

3NF is the OLTP default; OLAP/warehouses deliberately denormalize into star schemas for query speed.

## ⚙️ Natural vs surrogate keys
Natural keys (email, tax ID) carry meaning but can change. Surrogate keys (UUID, BIGINT) are stable and noise-free - the recommended PK type.

## 📐 Checklist
PK on every table, explicit FK actions (CASCADE / SET NULL / RESTRICT), enforce UNIQUE/CHECK in the database not just the app.
`,
  },

  "sql-proc-1": {
    vi: `
## 🔬 Stored procedure: khi nào nên dùng?

Stored procedure (Postgres: function/procedure) chạy trong DB nên giảm round-trip mạng, được biên dịch sẵn, có quyền hạn riêng. Dùng tốt cho: thao tác batch nặng, logic atomic phải gọn trong 1 transaction, kiểm soát quyền chi tiết qua \`SECURITY DEFINER\`.

## ⚠️ Khi nào tránh

- Logic nghiệp vụ chính: khó test, khó version, khó deploy đồng bộ với app.
- Hệ multi-tenant lớn: stored proc khoá bạn vào 1 DB vendor.

## 📐 Best practice
- Đặt tên rõ ràng theo nghiệp vụ (\`charge_subscription\`, không phải \`sp_1\`)
- Luôn có \`SET search_path = public\` trong function để tránh search-path attack
- Trả về error qua \`RAISE EXCEPTION\`, log đủ ngữ cảnh
`,
    en: `
## 🔬 When stored procedures pay off

Procedures run inside the DB so they avoid network round-trips, ship as precompiled plans, and can hold dedicated privileges. Great for: heavy batch jobs, single-transaction atomic logic, fine-grained permission via \`SECURITY DEFINER\`.

## ⚠️ When to avoid
Core business logic: harder to test, version, and deploy in sync with the app. Multi-vendor environments: ties you to one DB.

## 📐 Best practice
Name by intent, always set \`search_path\`, raise typed exceptions with context.
`,
  },

  "sql-opt-1": {
    vi: `
## 🔬 EXPLAIN ANALYZE: bản đồ kho báu

EXPLAIN cho plan dự đoán; EXPLAIN ANALYZE chạy thật và đo. Đọc từ trong ra ngoài, để ý:
- **Seq Scan trên bảng lớn** -> thiếu index
- **Rows estimated vs actual lệch nhiều** -> thống kê cũ, chạy ANALYZE
- **Nested Loop với loops cao** -> có thể chuyển Hash Join nhanh hơn
- **Sort sử dụng disk** -> tăng work_mem hoặc thêm index

## ⚙️ Pattern tối ưu hay gặp
1. Đẩy WHERE vào subquery để giảm dữ liệu trước khi JOIN
2. Thay \`OFFSET 10000 LIMIT 20\` bằng **keyset pagination** (\`WHERE id > last_id ORDER BY id LIMIT 20\`)
3. Tạo **covering index** chứa đủ cột để index-only scan
4. Phân vùng (partition) bảng cực lớn theo ngày/tenant

## 📐 Checklist trước khi merge query mới
- Đã chạy EXPLAIN ANALYZE trên data thật?
- Index cần thiết đã có chưa?
- LIMIT/keyset cho list endpoint?
`,
    en: `
## 🔬 EXPLAIN ANALYZE is the treasure map

EXPLAIN predicts; EXPLAIN ANALYZE runs and measures. Read inside-out and look for: Seq Scan on big tables, large estimate-vs-actual drift, deep Nested Loops, sorts spilling to disk.

## ⚙️ Common wins
- Push WHERE into subqueries before JOIN.
- Replace \`OFFSET 10000 LIMIT 20\` with keyset pagination.
- Build covering indexes for index-only scans.
- Partition very large tables by date or tenant.

## 📐 Pre-merge checklist
EXPLAIN ANALYZE on real data, required indexes exist, list endpoints use keyset paging.
`,
  },

  "sql-adv-1": {
    vi: `
## 🔬 Pattern nâng cao trong sản xuất

1. **Upsert**: \`INSERT ... ON CONFLICT (key) DO UPDATE SET ...\` - atomic, tránh race condition giữa SELECT rồi INSERT.
2. **Soft delete**: thêm \`deleted_at TIMESTAMPTZ\`, mọi query lọc \`WHERE deleted_at IS NULL\`. Cho phép khôi phục và audit.
3. **Optimistic locking**: thêm cột \`version\`, UPDATE kèm \`WHERE version = ?\`, kiểm tra rowcount.
4. **Outbox pattern**: ghi event vào bảng \`outbox\` trong cùng transaction với thay đổi nghiệp vụ - worker đẩy sang message broker. Đảm bảo exactly-once kiểu thực dụng.

## ⚙️ Transaction & isolation level
- READ COMMITTED (mặc định Postgres): mỗi statement thấy snapshot mới nhất đã commit.
- REPEATABLE READ: cả transaction nhìn 1 snapshot - tránh non-repeatable read.
- SERIALIZABLE: cao nhất, Postgres dùng SSI - có thể bị abort, phải retry.

Chọn mức cao chỉ khi cần, vì tỉ lệ conflict tăng.
`,
    en: `
## 🔬 Production patterns

1. **Upsert** with \`INSERT ... ON CONFLICT DO UPDATE\` to avoid SELECT-then-INSERT races.
2. **Soft delete** via \`deleted_at\` for recovery and audit.
3. **Optimistic locking** with a \`version\` column and conditional UPDATE.
4. **Outbox pattern**: write the event row in the same transaction as the business change; a worker forwards it to the broker.

## ⚙️ Isolation levels
READ COMMITTED (default), REPEATABLE READ (snapshot), SERIALIZABLE (SSI - may abort, retry). Pick the strongest only when needed; conflicts grow with isolation.
`,
  },

  // ============================================================
  // SOFTWARE ENGINEERING - deep dives
  // ============================================================
  "se-sdlc": {
    vi: `
## 🔬 SDLC trong thực tế hiện đại

SDLC kinh điển (Waterfall: Requirement -> Design -> Build -> Test -> Deploy -> Maintain) đã được thay bằng chu kỳ ngắn của Agile/Scrum/Kanban. Điểm cốt lõi không phải là tên gọi mà là **feedback loop**: rút ngắn thời gian từ ý tưởng -> code -> production -> đo lường -> học.

## ⚙️ Các vai trò thật trong team

- **PM/PO**: ưu tiên giá trị nghiệp vụ, viết user story rõ "Ai - Làm gì - Để làm gì".
- **Dev**: ước lượng, code, viết test, on-call.
- **Designer**: trải nghiệm, prototype.
- **QA**: chiến lược test, automation, exploratory.
- **SRE/DevOps**: pipeline, monitoring, incident.

## 📐 Định nghĩa "xong" (DoD) ví dụ
- Code merge sau review tối thiểu 1 người
- Test pass: unit + integration
- Doc/changelog cập nhật
- Có metric/alert nếu là feature production
`,
    en: `
## 🔬 Modern SDLC

The classic Waterfall has given way to short Agile/Scrum/Kanban cycles. The point is not the label but the **feedback loop**: shrink the time from idea -> code -> production -> measurement -> learning.

## ⚙️ Real team roles
PM/PO prioritise value; Devs estimate, code, test, and on-call; Designers prototype UX; QA owns test strategy; SRE/DevOps own pipelines and incidents.

## 📐 Sample Definition of Done
Reviewed PR, green unit + integration tests, docs/changelog updated, production features ship with metrics and alerts.
`,
  },

  "se-system-design": {
    vi: `
## 🔬 Tư duy thiết kế hệ thống

Mọi quyết định kiến trúc là một **trade-off** giữa: tính nhất quán, sẵn sàng, độ trễ, chi phí, và độ phức tạp vận hành. Định lý CAP nhắc rằng khi network bị chia cắt, bạn phải chọn Consistency hoặc Availability - không có bữa trưa miễn phí.

## ⚙️ Khối lego thường gặp

- **Load balancer**: phân phối request, health check.
- **App server (stateless)**: scale ngang dễ dàng.
- **Cache (Redis/Memcached)**: giảm tải DB, nhớ TTL và invalidation.
- **DB chính (RDBMS)**: nguồn sự thật, ACID.
- **Read replica**: scale đọc, có lag.
- **Queue (Kafka/SQS)**: tách rời producer/consumer, hấp thụ burst.
- **Object storage (S3)**: file lớn, rẻ, durable.
- **CDN**: tĩnh hoá global edge.

## 📐 Quy trình phỏng vấn / thiết kế thật
1. Làm rõ requirement (chức năng + phi chức năng)
2. Ước lượng dung lượng (QPS, storage, bandwidth)
3. Vẽ high-level diagram
4. Đi sâu vào bottleneck (DB schema, cache, queue)
5. Bàn về scaling, monitoring, failure mode
`,
    en: `
## 🔬 System design as trade-offs

Every architectural decision trades off consistency, availability, latency, cost, and operational complexity. CAP reminds you that during a partition you must pick consistency or availability.

## ⚙️ Common building blocks
Load balancer, stateless app servers, cache (Redis), primary RDBMS, read replicas, queues (Kafka/SQS), object storage (S3), CDN.

## 📐 Interview-and-real-world flow
Clarify functional + non-functional requirements -> back-of-envelope capacity -> high-level diagram -> deep dive into bottlenecks -> scaling, monitoring, failure modes.
`,
  },

  "se-git": {
    vi: `
## 🔬 Git: 3 trạng thái và 3 vùng

Mọi file ở 1 trong 3 trạng thái: **modified**, **staged**, **committed**, tương ứng 3 vùng: working directory, staging area (index), repository. Hiểu rõ vùng nào đang chứa gì giúp xử lý bình tĩnh khi gặp conflict.

## ⚙️ Workflow phổ biến

- **GitHub Flow**: 1 nhánh \`main\` luôn deployable, feature branch + PR. Đơn giản, hợp cho web app deploy liên tục.
- **Git Flow**: develop/release/hotfix - phù hợp sản phẩm có version (mobile app, SDK).
- **Trunk-based**: dev commit thẳng vào trunk sau review nhanh + feature flag. Hợp với team lớn, CI mạnh.

## 📐 Lệnh "cứu hộ"
- \`git reflog\`: thấy mọi HEAD đã đi qua, phục hồi commit "mất tích"
- \`git restore --staged file\`: bỏ stage
- \`git revert <sha>\`: tạo commit ngược, an toàn cho lịch sử công khai
- \`git rebase -i\`: dọn dẹp commit trước khi PR (chỉ trên nhánh cá nhân)
`,
    en: `
## 🔬 Git: three states, three areas

Files live in modified, staged, or committed, across working dir, index, and repo. Knowing which area holds what makes conflicts calm.

## ⚙️ Common workflows
GitHub Flow (one always-deployable main), Git Flow (develop/release/hotfix, good for versioned products), Trunk-based (direct to trunk + feature flags, for big teams with strong CI).

## 📐 Rescue commands
\`git reflog\`, \`git restore --staged\`, \`git revert\` (safe for public history), \`git rebase -i\` (only on private branches).
`,
  },

  "se-clean-code": {
    vi: `
## 🔬 Clean code: nguyên tắc cốt lõi

Code được đọc nhiều hơn viết 10 lần. Mỗi quyết định đặt tên, tách hàm, viết comment đều phải phục vụ người đọc tiếp theo (thường là chính bạn 6 tháng sau).

## ⚙️ SOLID nhắc nhanh

- **S**RP: 1 lớp, 1 lý do thay đổi.
- **O**CP: mở rộng được, không sửa core.
- **L**SP: lớp con thay được lớp cha mà không gãy.
- **I**SP: nhiều interface nhỏ tốt hơn 1 cái khổng lồ.
- **D**IP: phụ thuộc abstraction, không phải concrete.

## 📐 Heuristic thực tế
- Hàm < 20 dòng, < 4 tham số
- Đặt tên là **động từ cho hàm**, **danh từ cho class**
- Tránh boolean parameter (\`save(true)\` mơ hồ -> tách \`saveDraft()\`/\`publish()\`)
- Comment giải thích **vì sao**, code giải thích **làm gì**
`,
    en: `
## 🔬 Clean code essentials

Code is read 10x more than it is written. Every naming, extraction, and comment choice serves the next reader (usually you in six months).

## ⚙️ SOLID at a glance
SRP one reason to change, OCP open for extension, LSP substitutability, ISP small interfaces, DIP depend on abstractions.

## 📐 Heuristics
Functions < 20 lines and < 4 params; verbs for functions, nouns for classes; avoid boolean params; comments explain **why**, code explains **what**.
`,
  },

  "se-testing": {
    vi: `
## 🔬 Test pyramid

Tỉ lệ lý tưởng: nhiều **unit** (nhanh, độc lập), vừa **integration** (DB, service), ít **E2E** (chậm, dễ flaky). Đảo ngược pyramid sẽ làm CI chậm, pipeline đỏ chớp tắt, dev mất niềm tin.

## ⚙️ AAA pattern
\`\`\`text
Arrange: chuẩn bị input và mock
Act:     gọi hàm cần test
Assert:  kiểm chứng output/side-effect
\`\`\`

## 📐 Quy tắc test tốt
- F.I.R.S.T: Fast, Independent, Repeatable, Self-validating, Timely
- 1 test - 1 lý do fail
- Tên test mô tả nghiệp vụ: \`itRefundsWhenOrderCancelledWithin24h\`
- Không test implementation detail (refactor sẽ vỡ test)
- Coverage là chỉ số tham khảo, không phải mục tiêu - 80% có ý nghĩa hơn 100% rỗng
`,
    en: `
## 🔬 The test pyramid

Lots of fast unit tests, fewer integration tests, very few E2E. Inverting the pyramid produces slow, flaky CI and erodes trust.

## ⚙️ AAA pattern
Arrange -> Act -> Assert.

## 📐 Good-test rules
F.I.R.S.T (Fast, Independent, Repeatable, Self-validating, Timely); one reason to fail per test; describe behaviour in the name; avoid testing implementation details; coverage is a hint, not a goal.
`,
  },

  "se-cicd": {
    vi: `
## 🔬 Giải phẫu một pipeline CI/CD

1. **Trigger**: push hoặc PR.
2. **Build**: compile, bundle, type-check.
3. **Test**: unit -> integration -> contract.
4. **Quality gates**: lint, security scan (SAST), license check.
5. **Artifact**: container image, signed.
6. **Deploy staging**: smoke test, E2E.
7. **Deploy prod**: blue-green / canary / rolling.
8. **Verify**: health check, error budget, auto-rollback.

## ⚙️ Chiến lược release

- **Blue-Green**: 2 môi trường, switch traffic. Rollback nhanh, tốn x2 resource lúc switch.
- **Canary**: thả 1-5% traffic vào version mới, theo dõi metric rồi tăng dần.
- **Feature flag**: deploy nhưng chưa bật. Tách deploy khỏi release.

## 📐 Checklist
- Build lại từ commit hash đều ra cùng artifact (reproducible)
- Secret nằm trong secret manager, không hard-code
- Mọi deploy đều có rollback < 5 phút
`,
    en: `
## 🔬 Anatomy of a CI/CD pipeline

Trigger -> Build -> Test (unit/integration/contract) -> Quality gates (lint, SAST, license) -> Signed artifact -> Staging deploy + smoke -> Prod deploy (blue-green/canary/rolling) -> Verify with health checks and auto-rollback.

## ⚙️ Release strategies
Blue-Green (instant rollback, double cost during switch), Canary (1-5% traffic ramp), Feature flags (decouple deploy from release).

## 📐 Checklist
Reproducible builds, secrets in a manager, rollback under five minutes.
`,
  },

  "se-security-patterns": {
    vi: `
## 🔬 Mô hình mối đe doạ STRIDE

- **S**poofing (giả danh) -> auth, MFA
- **T**ampering (sửa data) -> integrity, signature
- **R**epudiation (chối bỏ) -> audit log
- **I**nformation disclosure -> encryption, RLS
- **D**enial of service -> rate limit, autoscale
- **E**levation of privilege -> least privilege, RBAC

Dùng STRIDE khi review thiết kế feature mới: đi qua từng chữ, hỏi "rủi ro ở đây là gì?".

## ⚙️ OWASP Top 10 highlights
1. Broken access control (RLS, IDOR) - hay gặp nhất
2. Cryptographic failures - dùng thư viện chuẩn, đừng tự chế
3. Injection (SQL/NoSQL/Command) - dùng parameterized query
4. Insecure design - threat model từ đầu
5. Security misconfiguration - default deny, harden image

## 📐 Checklist code
- Validate input ở biên (Zod/Yup)
- Sanitize HTML trước khi \`dangerouslySetInnerHTML\` (DOMPurify)
- Không log secret, không trả secret về client
- Dependency scan trong CI (npm audit, Snyk)
`,
    en: `
## 🔬 STRIDE threat model

Spoofing -> auth/MFA, Tampering -> integrity, Repudiation -> audit logs, Information disclosure -> encryption/RLS, Denial of service -> rate limits, Elevation of privilege -> least privilege.

## ⚙️ OWASP Top 10 highlights
Broken access control (IDOR), cryptographic failures, injection, insecure design, security misconfiguration.

## 📐 Code checklist
Validate at boundaries (Zod), sanitize HTML (DOMPurify), never log/return secrets, dependency scan in CI.
`,
  },

  "se-code-review": {
    vi: `
## 🔬 Code review: mục tiêu thật sự

Mục tiêu không phải bắt lỗi - linter làm tốt hơn. Mục tiêu là: chia sẻ context, nâng chất lượng thiết kế, dạy lẫn nhau, tránh kiến thức nằm 1 chỗ.

## ⚙️ Heuristic của reviewer

1. **Ý định**: PR giải quyết vấn đề gì? Có đúng vấn đề không?
2. **Thiết kế**: chia hàm/lớp hợp lý? Có abstraction lệch?
3. **Đọc hiểu**: tên biến, comment, kiểm thử kể câu chuyện nào?
4. **Edge case**: null, empty, lỗi mạng, concurrent?
5. **An toàn**: input validation, secret, log nhạy cảm?
6. **Hiệu năng**: N+1 query, bundle size, render thừa?

## 📐 Văn hoá review
- Phân biệt **must-fix**, **suggestion**, **nit** trong comment
- Hỏi thay vì ra lệnh: "Em đã cân nhắc X chưa?" thay cho "Sai rồi"
- Tác giả phản hồi mọi comment, không lờ
- PR < 400 dòng để review hiệu quả
`,
    en: `
## 🔬 What code review is really for

Not bug catching - linters do that. Reviews spread context, raise design quality, teach, and reduce knowledge silos.

## ⚙️ Reviewer heuristics
Intent, design, readability, edge cases, security, performance.

## 📐 Culture
Label comments as must-fix / suggestion / nit; ask, do not command; authors reply to every comment; keep PRs under ~400 lines for effective review.
`,
  },

  "se-debugging-performance": {
    vi: `
## 🔬 Phương pháp debug có hệ thống

1. **Tái tạo** ổn định trước - bug không tái tạo được là bug không sửa được.
2. **Thu hẹp** không gian bằng bisect: phiên bản nào còn chạy? Input nào không lỗi?
3. **Giả thuyết** rõ ràng, kiểm chứng bằng log/test, không đoán bừa.
4. **Sửa nguyên nhân**, không chỉ triệu chứng. Viết regression test.

## ⚙️ Hiệu năng: đo trước, tối ưu sau

Quy tắc Knuth: "Premature optimization is the root of all evil". Trình tự đúng:
1. Đo bằng profiler (Chrome DevTools, py-spy, perf)
2. Tìm hot path (80/20)
3. Áp dụng tối ưu phù hợp: thuật toán -> data structure -> cache -> parallel
4. Đo lại để chứng minh có lợi

## 📐 Mẹo Web
- Lazy load route, code-split bundle
- Memo hoá selector đắt (\`useMemo\`, \`reselect\`)
- Index DB cho query chậm
- Cache HTTP với ETag/Cache-Control
`,
    en: `
## 🔬 Systematic debugging

Reproduce reliably, narrow with bisect, form testable hypotheses, fix the root cause and add a regression test.

## ⚙️ Measure before optimising
Profile first (DevTools, py-spy, perf), find the hot path, apply the right tool (algorithm -> data structure -> cache -> parallelism), then re-measure.

## 📐 Web wins
Lazy-load routes, memoise expensive selectors, index slow queries, leverage HTTP caching.
`,
  },

  "se-api-design": {
    vi: `
## 🔬 Nguyên tắc thiết kế API tốt

- **Nhất quán**: cùng pattern URL, naming, error format trên toàn API.
- **Dự đoán được**: client đoán được endpoint kế tiếp dựa trên quy ước.
- **Resource-oriented**: \`/users/123/orders\` thay vì \`/getUserOrders?id=123\`.
- **HTTP đúng nghĩa**: GET an toàn, POST tạo, PUT thay thế, PATCH cập nhật một phần, DELETE xoá.

## ⚙️ Versioning
URL (\`/v1/...\`) đơn giản nhất, dễ cache. Header (\`Accept: application/vnd.api.v2+json\`) sạch URL nhưng phức tạp. Đừng break v1 - thêm field tuỳ chọn, deprecate có thời hạn.

## 📐 Error contract
\`\`\`json
{ "error": { "code": "USER_NOT_FOUND", "message": "...", "details": {} } }
\`\`\`
Dùng status code chuẩn (400 client lỗi, 401 chưa auth, 403 không quyền, 404 không có, 409 conflict, 422 validate, 5xx server).

## 📐 Checklist
- Pagination (cursor > offset cho list lớn)
- Idempotency-Key cho POST tạo tiền
- Rate limit + 429 + Retry-After
- OpenAPI/Swagger spec sinh client tự động
`,
    en: `
## 🔬 Good API principles

Consistency, predictability, resource-oriented URLs, correct HTTP verbs (GET safe, POST create, PUT replace, PATCH partial, DELETE remove).

## ⚙️ Versioning
URL versioning is simplest and cache-friendly. Never break v1 - add optional fields and deprecate on a timeline.

## 📐 Error contract & checklist
Standard error envelope and status codes; cursor pagination, idempotency keys for paid POSTs, rate limit with Retry-After, an OpenAPI spec for typed clients.
`,
  },

  "se-observability": {
    vi: `
## 🔬 3 trụ cột observability

1. **Metrics** (Prometheus, CloudWatch): số liệu thời gian, lý tưởng cho dashboard và alert. Mẫu RED: Rate, Errors, Duration cho mỗi service.
2. **Logs** (Loki, ELK, Datadog): event chi tiết. Structured JSON dễ query gấp 10 lần plain text.
3. **Traces** (OpenTelemetry, Jaeger): theo dõi 1 request qua nhiều service - bắt buộc khi có microservice.

Thêm **profiling** (continuous CPU/memory) là 4 trụ cột nâng cao.

## ⚙️ SLO -> SLI -> Error budget

- **SLI** (Service Level Indicator): cái bạn đo (vd p95 latency).
- **SLO** (Objective): mục tiêu (vd 99.9% request < 300ms trong 30 ngày).
- **Error budget**: phần được phép vi phạm (0.1% = ~43 phút/tháng). Khi cạn budget -> đóng băng feature, tập trung độ ổn định.

## 📐 Checklist alert
- Alert dựa trên symptom (user đau), không dựa trên cause (CPU 80% không đáng wake-up nếu user vẫn ổn)
- Mỗi alert có runbook đính kèm
- Đo cả MTTD (detect) và MTTR (recover), cải thiện liên tục
`,
    en: `
## 🔬 The three pillars

Metrics for dashboards/alerts (RED: Rate, Errors, Duration), structured logs for context, traces for cross-service requests. Add continuous profiling as a fourth.

## ⚙️ SLO -> SLI -> error budget
SLI is what you measure; SLO is the target; error budget is the allowed slack. When the budget burns, freeze features and invest in reliability.

## 📐 Alerting
Alert on symptoms, not causes; attach a runbook to every alert; track MTTD and MTTR.
`,
  },

  // ============================================================
  // WEB DEV - deep dives
  // ============================================================
  "web-html-semantic": {
    vi: `
## 🔬 Vì sao semantic HTML quan trọng?

Trình duyệt, screen reader, công cụ tìm kiếm đều "đọc" HTML để hiểu cấu trúc. Dùng \`<div>\` thay cho \`<button>\` khiến screen reader không biết đó là nút, Google không hiểu đó là nav, keyboard user không tab tới được.

## ⚙️ Landmark roles ngầm

- \`<header>\`, \`<nav>\`, \`<main>\`, \`<aside>\`, \`<footer>\` tự động có role landmark - screen reader có thể nhảy nhanh giữa các vùng.
- \`<article>\` cho nội dung độc lập (bài blog, card sản phẩm).
- \`<section>\` cho nhóm có heading; nếu không có heading thì có khi \`<div>\` mới đúng.

## 📐 Accessibility checklist
- Alt text mô tả nội dung ảnh, để rỗng \`alt=""\` cho ảnh trang trí
- Heading theo bậc liên tục (h1 -> h2 -> h3, không nhảy)
- Form: mỗi input có \`<label>\` liên kết qua \`for\`/\`id\`
- Contrast WCAG AA tối thiểu 4.5:1 cho text thường
`,
    en: `
## 🔬 Why semantic HTML matters

Browsers, screen readers, and search engines parse HTML to understand structure. Using \`<div>\` instead of \`<button>\` hides intent from assistive tech, SEO, and keyboard users.

## ⚙️ Implicit landmark roles
\`<header>\`, \`<nav>\`, \`<main>\`, \`<aside>\`, \`<footer>\` give screen-reader users region-jump navigation for free. Use \`<article>\` for standalone content and \`<section>\` only when it has a heading.

## 📐 A11y checklist
Meaningful alt text, sequential headings, labelled inputs, WCAG AA contrast >= 4.5:1.
`,
  },

  "web-css-modern": {
    vi: `
## 🔬 CSS hiện đại: cascade và specificity

CSS chọn rule thắng theo: **origin** (user agent < user < author) -> **!important** -> **specificity** (id > class > type) -> **thứ tự xuất hiện**. Khi style "không lên", mở DevTools tab Computed để xem rule nào thắng và rule nào bị gạch.

## ⚙️ Layer mới giúp dễ kiểm soát

\`@layer reset, base, components, utilities\` cho phép sắp xếp ưu tiên theo lớp, tránh cuộc đua \`!important\`. Tailwind dùng layer dưới lưng để hoạt động hài hoà với CSS tự viết.

## 📐 Best practice 2026
- Dùng custom properties (\`--brand: #3b82f6\`) cho theming, dark mode chỉ cần đổi giá trị biến
- Container queries (\`@container\`) - component tự responsive theo cha, không cần media query global
- Logical properties (\`margin-inline\`, \`padding-block\`) cho RTL/quốc tế hoá
`,
    en: `
## 🔬 Modern CSS: cascade and specificity

Winning rule = origin -> !important -> specificity (id > class > type) -> source order. When a style "won't apply", open DevTools Computed to see which rule wins and which is crossed out.

## ⚙️ @layer
\`@layer reset, base, components, utilities\` lets you order priorities by layer instead of an \`!important\` arms race.

## 📐 2026 best practice
Custom properties for theming, container queries for component-level responsiveness, logical properties for RTL and i18n.
`,
  },

  "web-css-layout": {
    vi: `
## 🔬 Flexbox vs Grid: chọn đúng tool

- **Flexbox** = 1 chiều (hàng hoặc cột). Tốt cho nav bar, toolbar, list card.
- **Grid** = 2 chiều cùng lúc. Tốt cho layout trang, dashboard, gallery.
Dùng cả hai trong cùng 1 trang là bình thường: Grid cho khung trang, Flex cho từng component bên trong.

## ⚙️ Trick hay dùng

- \`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))\` - card grid responsive không cần media query.
- \`place-items: center\` - center cả ngang lẫn dọc bằng 1 dòng.
- \`gap\` thay cho margin giữa các item, đỡ collapse và đỡ tính toán.

## 📐 Mobile-first
Viết style mobile trước, dùng \`min-width\` media query để mở rộng. Tránh hardcode width pixel, ưu tiên \`rem\` cho text và \`%\`/\`fr\` cho layout.
`,
    en: `
## 🔬 Flexbox vs Grid

Flexbox is 1D (row or column) - perfect for navs, toolbars, lists. Grid is 2D - perfect for page layouts, dashboards, galleries. Combining them on one page is normal.

## ⚙️ Useful tricks
\`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))\` for responsive card grids, \`place-items: center\` for one-line centring, \`gap\` for spacing without margin collapse.

## 📐 Mobile-first
Write mobile styles first, expand with \`min-width\` media queries; prefer rem for text and %/fr for layout.
`,
  },

  "web-js-basics": {
    vi: `
## 🔬 Event loop trong 60 giây

JS chạy đơn luồng nhưng không bị block nhờ event loop: stack chạy code đồng bộ -> queue (macrotask: setTimeout, I/O) và microtask (Promise.then, queueMicrotask) chờ -> stack rỗng thì lấy microtask trước, rồi 1 macrotask. Hiểu thứ tự này giúp giải mã vì sao \`Promise.resolve().then(...)\` chạy trước \`setTimeout(..., 0)\`.

## ⚙️ var / let / const

- \`var\`: function scope, hoisted, có thể redeclare - tránh trong code mới.
- \`let\`: block scope, không hoisted giá trị.
- \`const\`: block scope, không reassign biến (object/array vẫn mutate được nội dung).

## 📐 Đặc tính then chốt
- **Truthy/Falsy**: \`0, "", null, undefined, NaN, false\` là falsy; còn lại truthy. \`[]\` và \`{}\` là truthy.
- **==** ép kiểu, **===** so sánh chặt - luôn dùng \`===\` trừ khi có lý do.
- **Spread/rest** \`...\` để copy nông và gom đối số.
`,
    en: `
## 🔬 The event loop in 60 seconds

JS is single-threaded but non-blocking via the event loop: sync code on the stack, macrotasks (setTimeout, I/O) and microtasks (Promise.then) waiting. When the stack empties, all microtasks drain before the next macrotask.

## ⚙️ var / let / const
\`var\` function-scoped and hoisted (avoid in new code), \`let\` block-scoped, \`const\` block-scoped and non-reassignable (but object contents still mutable).

## 📐 Essentials
Falsy values are \`0, "", null, undefined, NaN, false\`; always use \`===\`; learn spread/rest \`...\`.
`,
  },

  "web-js-dom": {
    vi: `
## 🔬 DOM thực ra là cây

Mỗi tag HTML thành 1 node, JS thao tác qua API \`document.querySelector\`, \`element.append\`, \`element.addEventListener\`. Mỗi lần đụng DOM, browser có thể phải **reflow** (tính lại layout) và **repaint** (vẽ lại pixel) - đó là 2 thao tác đắt nhất.

## ⚙️ Tối ưu thao tác DOM

- Gom nhiều thay đổi rồi append 1 lần (DocumentFragment) thay vì append trong loop.
- Đọc layout (\`offsetWidth\`, \`getBoundingClientRect\`) tách khỏi ghi style để tránh layout thrashing.
- Dùng \`requestAnimationFrame\` cho animation thay vì setTimeout.

## 📐 Event delegation
Gắn 1 listener ở cha thay vì nhiều listener ở mỗi con - vừa nhẹ vừa tự động hoạt động với node mới thêm. Dùng \`event.target.closest(selector)\` để xác định con bị click.
`,
    en: `
## 🔬 The DOM is a tree

Each tag is a node; JS manipulates it via \`querySelector\`, \`append\`, \`addEventListener\`. Each DOM mutation may trigger expensive **reflow** and **repaint**.

## ⚙️ Optimisations
Batch with DocumentFragment, separate layout reads from style writes to avoid layout thrashing, use \`requestAnimationFrame\` for animations.

## 📐 Event delegation
Attach one listener on the parent and identify the child via \`event.target.closest(selector)\` - lighter and automatic for newly added nodes.
`,
  },

  "web-react-basics": {
    vi: `
## 🔬 Mô hình "UI là hàm của state"

React mô tả: \`UI = f(state)\`. Mỗi lần state đổi, component re-render và React **diff** virtual DOM mới với cũ, chỉ patch phần khác lên DOM thật. Đây là điểm khác cốt lõi với jQuery (thao tác DOM thủ công).

## ⚙️ Quy tắc hooks

1. Chỉ gọi ở **top level** của function component (không trong if/loop).
2. Chỉ gọi từ component hoặc custom hook khác.
3. Custom hook bắt buộc bắt đầu bằng \`use\`.

Vi phạm khiến React không nhận diện được thứ tự hook giữa các render.

## 📐 Khi nào dùng hook nào?
- \`useState\`: state đơn giản, local.
- \`useReducer\`: state phức tạp, nhiều action.
- \`useEffect\`: side-effect (fetch, subscribe). Dependency array đúng để tránh loop.
- \`useMemo\` / \`useCallback\`: tối ưu khi đã đo thấy chậm, đừng dùng "phòng hờ".
- \`useContext\`: chia sẻ data ít thay đổi (theme, user). Đổi nhiều -> mọi consumer re-render.
`,
    en: `
## 🔬 "UI is a function of state"

React: \`UI = f(state)\`. State changes trigger re-renders; React diffs virtual DOM and patches only what changed. That is the core difference from manual DOM libraries like jQuery.

## ⚙️ Hook rules
Call hooks at the top level only (not inside conditions/loops); only from components or custom hooks; custom hooks must start with \`use\`.

## 📐 Which hook?
useState for simple local state, useReducer for complex transitions, useEffect for side effects (correct deps to avoid loops), useMemo/useCallback only after measuring, useContext for low-churn shared data.
`,
  },

  "web-fullstack-project": {
    vi: `
## 🔬 Tư duy full-stack

Full-stack không phải biết mọi thứ, mà biết **vẽ ranh giới**: cái nào chạy ở client (UI, validation thân thiện, optimistic update), cái nào ở server (validate thật, business rule, transaction), cái nào ở DB (constraint, RLS).

## ⚙️ Kiến trúc tham khảo 1 web app nhỏ-vừa

\`\`\`text
Client (React + Vite + Tailwind)
  ├─ UI component
  ├─ State (Zustand/React Query)
  └─ API client (typed)
       │
       ▼ HTTPS
API layer (Edge Function / Node / Python)
  ├─ Auth middleware
  ├─ Validation (Zod)
  ├─ Business service
  └─ DB driver
       │
       ▼
Database (Postgres + RLS)
  ├─ Schema + migration
  ├─ Index + view
  └─ Trigger + function
\`\`\`

## 📐 Checklist khi triển khai
- HTTPS bắt buộc, HSTS bật
- Env variable cho config, secret trong manager
- Migration version-controlled, áp dụng tự động trong CI
- Logging structured + correlation ID xuyên các tầng
- Backup DB tự động, test restore định kỳ
`,
    en: `
## 🔬 Full-stack thinking

Full-stack is not knowing everything - it is drawing the right boundary: what belongs in the client (UX, optimistic updates), the server (real validation, business rules, transactions), and the DB (constraints, RLS).

## ⚙️ Reference architecture
Client (React + Vite) -> typed API client -> API layer (auth, Zod validation, services) -> Postgres with RLS, indexes, migrations.

## 📐 Deployment checklist
Force HTTPS + HSTS, env-driven config with secret manager, version-controlled migrations applied in CI, structured logs with a correlation ID, automated backups with restore drills.
`,
  },

  // ============================================================
  // CLOUD - deep dives
  // ============================================================
  "cloud-fund-1": {
    vi: `
## 🔬 Cloud không phải "máy của người khác"

Đám mây là 5 đặc tính (NIST): on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service. Bạn không thuê máy - bạn thuê **API điều khiển hạ tầng**.

## ⚙️ 3 mô hình dịch vụ
- **IaaS** (EC2, GCE): bạn quản OS trở lên - linh hoạt nhất, vận hành nặng.
- **PaaS** (App Engine, Heroku): bạn chỉ deploy code - nhanh, ít kiểm soát.
- **SaaS** (Gmail, Notion): dùng ngay - không động vào hạ tầng.

## 📐 Shared Responsibility
Cloud provider chịu **bảo mật CỦA cloud** (datacenter, hypervisor); bạn chịu **bảo mật TRONG cloud** (IAM, dữ liệu, config). Hiểu sai mô hình này là nguyên nhân #1 của data breach trên cloud.
`,
    en: `
## 🔬 The cloud is not "someone else's computer"

NIST defines five essential traits: on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service. You rent an **API to control infrastructure**, not a machine.

## ⚙️ Three service models
IaaS gives most control and most ops burden; PaaS lets you ship code fast; SaaS is ready-to-use.

## 📐 Shared Responsibility
The provider secures the cloud (datacenter, hypervisor); you secure what is in the cloud (IAM, data, config). Misreading this model is the #1 cause of cloud breaches.
`,
  },

  "cloud-compute-1": {
    vi: `
## 🔬 VM vs Container vs Serverless

- **VM**: tách bằng hypervisor, mỗi VM có OS riêng - nặng nhưng cô lập mạnh.
- **Container**: chia sẻ kernel, đóng gói app + dependency - khởi động giây, mật độ cao.
- **Serverless** (Lambda, Cloud Run): bạn chỉ gửi function/container, provider lo scale 0->N.

## ⚙️ Khi nào chọn gì?
- Workload ổn định, kiểm soát chặt -> VM/Container trên K8s.
- Spike biến thiên, idle nhiều -> Serverless để khỏi trả lúc 0 request.
- Legacy stateful -> VM.

## 📐 Lưu ý chi phí
Serverless rẻ ở traffic thấp, đắt khi traffic ổn định cao. Đo break-even bằng dollar/request rồi quyết định.
`,
    en: `
## 🔬 VM vs Container vs Serverless

VMs isolate via hypervisor (heavy, strong isolation), containers share the kernel (seconds to boot, high density), serverless lets the provider scale 0->N for you.

## ⚙️ Pick by shape
Stable, controlled workloads -> VM/Container on K8s. Spiky, often-idle workloads -> serverless. Legacy stateful apps -> VM.

## 📐 Cost note
Serverless wins on low traffic, loses on steady-high traffic. Compute dollars per request to find break-even.
`,
  },

  "cloud-storage-1": {
    vi: `
## 🔬 3 lớp storage cốt lõi

- **Block** (EBS, Persistent Disk): như ổ cứng gắn vào VM - thấp tầng, nhanh, dùng cho DB.
- **File** (EFS, Filestore): NFS chia sẻ giữa nhiều VM - dùng cho legacy app.
- **Object** (S3, GCS): key-value bất biến, vô hạn, rẻ - dùng cho ảnh, video, log, data lake.

## ⚙️ Storage class & lifecycle
S3 Standard -> Infrequent Access -> Glacier: rẻ dần, lấy ra chậm dần. Đặt lifecycle policy tự chuyển sau 30/90 ngày tiết kiệm 60-80% chi phí lưu trữ dài hạn.

## 📐 Checklist
Versioning + MFA delete cho bucket quan trọng, encryption at rest mặc định, chặn public access trừ khi cần CDN.
`,
    en: `
## 🔬 Three storage tiers

Block (EBS) for DBs, File (EFS) for shared POSIX, Object (S3) for cheap, immutable, infinite key-value - perfect for media, logs, data lakes.

## ⚙️ Lifecycle classes
S3 Standard -> IA -> Glacier saves 60-80% on long-term storage when paired with a lifecycle policy.

## 📐 Checklist
Versioning + MFA delete on critical buckets, default encryption at rest, block public access unless a CDN demands it.
`,
  },

  "cloud-net-1": {
    vi: `
## 🔬 VPC: trung tâm mạng cloud

VPC là mạng riêng ảo của bạn trong cloud, chia thành **subnet public** (có route ra Internet Gateway) và **subnet private** (chỉ ra ngoài qua NAT). DB nên ở private subnet, chỉ app server trong cùng VPC mới truy cập được.

## ⚙️ Security Group vs NACL
- **Security Group**: stateful firewall ở mức instance - đặt rule allow, response tự động pass.
- **NACL**: stateless ở mức subnet - phải mở cả inbound lẫn outbound. Dùng làm lớp bảo vệ phụ.

## 📐 Best practice
Multi-AZ subnet cho HA, private link cho DB managed, VPC peering hoặc Transit Gateway khi nhiều VPC cần nối.
`,
    en: `
## 🔬 VPC is the network core

A VPC is your private virtual network split into public subnets (route to an Internet Gateway) and private subnets (egress via NAT). Databases live in private subnets reachable only from inside the VPC.

## ⚙️ Security Group vs NACL
Security Groups are stateful per-instance firewalls; NACLs are stateless per-subnet (open both directions). Use NACLs as a defence-in-depth layer.

## 📐 Best practice
Multi-AZ subnets for HA, PrivateLink for managed DBs, VPC peering or Transit Gateway when linking many VPCs.
`,
  },

  "cloud-iam-1": {
    vi: `
## 🔬 IAM: ai - làm gì - trên tài nguyên nào - với điều kiện gì?

Mọi cloud policy đều xoay quanh 4 thành phần: **Principal** (ai), **Action** (làm gì), **Resource** (cái gì), **Condition** (khi nào). Hiểu mô hình này giúp đọc JSON policy không hoảng.

## ⚙️ Least privilege là quy tắc vàng

Cấp đúng quyền tối thiểu, đừng dùng \`*:*\` cho thuận tiện. Dùng **role** thay vì user khi service-to-service: VM/Pod nhận credential tạm qua metadata, không hard-code key.

## 📐 Anti-pattern
- Long-lived access key trong code/.env commit lên git
- Gán policy AdministratorAccess cho deploy bot
- Không bật MFA cho root/owner

## 📐 Checklist
Bật CloudTrail/Audit log, review key chưa dùng 90 ngày, dùng SSO + IdP thay vì tạo user thủ công.
`,
    en: `
## 🔬 IAM = who - does what - on which resource - under what condition

Every cloud policy revolves around Principal, Action, Resource, Condition. Knowing the shape makes JSON policies readable.

## ⚙️ Least privilege
Never use \`*:*\` for convenience. For service-to-service calls use roles, not users - the VM/Pod gets temporary credentials via metadata so no static keys leak.

## 📐 Anti-patterns
Long-lived access keys in git, AdministratorAccess for deploy bots, no MFA on root.

## 📐 Checklist
Enable audit logs, rotate or remove keys idle 90 days, prefer SSO over hand-created users.
`,
  },

  "cloud-sec-1": {
    vi: `
## 🔬 Defense in depth trên cloud

Bảo mật cloud không phải 1 cánh cửa thép mà là nhiều lớp:
1. **Identity**: IAM, MFA, SSO.
2. **Network**: VPC, security group, WAF, DDoS protection.
3. **Data**: encryption at rest (KMS) + in transit (TLS).
4. **Application**: secure coding, dependency scan, SAST/DAST.
5. **Monitoring**: GuardDuty/Security Command Center, anomaly alert.
6. **Response**: runbook incident, backup + restore drill.

## ⚙️ Encryption keys
- **AWS-managed key**: provider quản, đủ dùng cho phần lớn case.
- **Customer-managed key (CMK)**: bạn quản rotation, audit - bắt buộc cho compliance (HIPAA, PCI).
- **Bring Your Own Key (BYOK)**: import key từ HSM của bạn.

## 📐 Compliance
ISO 27001, SOC 2, GDPR - đọc Shared Responsibility Matrix của provider để biết phần nào họ đã chứng nhận, phần nào bạn phải tự làm.
`,
    en: `
## 🔬 Defense in depth on cloud

Identity (IAM/MFA/SSO) -> Network (VPC, SG, WAF, DDoS) -> Data (encryption at rest with KMS, TLS in transit) -> Application (secure code, SAST/DAST) -> Monitoring (GuardDuty/SCC) -> Response (runbooks, backup drills).

## ⚙️ Key management
Provider-managed for the default case, customer-managed (CMK) for compliance with rotation/audit, BYOK to import from your own HSM.

## 📐 Compliance
ISO 27001, SOC 2, GDPR - read the provider's Shared Responsibility Matrix to know what is certified vs your job.
`,
  },

  "cloud-serverless-1": {
    vi: `
## 🔬 Serverless: lợi và giới hạn

Function-as-a-Service (Lambda, Cloud Functions, Edge Functions) cho phép deploy 1 hàm, provider lo scale, billing theo ms thực thi. Hợp với webhook, cron, image processing, glue logic.

## ⚙️ Cold start

Lần đầu invoke, runtime phải khởi động -> độ trễ vài trăm ms đến vài giây (đặc biệt JVM/.NET). Giảm bằng: provisioned concurrency, nhỏ hoá package, dùng runtime nhẹ (Node/Python), edge function với V8 isolate (Cloudflare Workers, Deno Deploy).

## 📐 Hạn chế cần biết
- Timeout (15 phút Lambda, ngắn hơn ở edge)
- Stateless: muốn state phải gửi ra Redis/S3/DB
- Vendor lock-in: API trigger khác nhau giữa provider

Khi function trở nên phức tạp, có nhiều dependency, gọi nhau dây chuyền -> cân nhắc container service (Cloud Run, ECS Fargate).
`,
    en: `
## 🔬 Serverless: wins and limits

FaaS (Lambda, Cloud Functions, Edge Functions) lets you deploy a function; the provider scales and bills by execution ms. Great for webhooks, cron, image processing, glue logic.

## ⚙️ Cold starts
First invoke must boot the runtime - hundreds of ms to seconds (worse on JVM/.NET). Mitigate with provisioned concurrency, smaller packages, light runtimes, or V8-isolate edge platforms.

## 📐 Limits
Timeouts, statelessness (push state to Redis/S3/DB), vendor-specific triggers. When chains get complex, move to container services (Cloud Run, Fargate).
`,
  },

  "cloud-iac-1": {
    vi: `
## 🔬 IaC: hạ tầng là code

Terraform/Pulumi/CloudFormation cho phép mô tả hạ tầng bằng file text version-controlled. Lợi ích cốt lõi: reproducible (môi trường dev/staging/prod giống nhau), peer review qua PR, rollback bằng git.

## ⚙️ Declarative vs Imperative
- **Declarative** (Terraform HCL): bạn mô tả **trạng thái mong muốn**, engine tính diff.
- **Imperative** (CDK, Pulumi với code): bạn viết logic tạo. Mạnh khi cần loop/condition.

## 📐 Best practice
- Tách state remote (S3 + DynamoDB lock) để team chung
- Module hoá theo layer: network, compute, app
- Plan -> review -> apply trong CI, không apply tay từ máy dev
- Dùng workspace hoặc folder riêng cho env (dev/stg/prod)
`,
    en: `
## 🔬 Infrastructure as Code

Terraform/Pulumi/CloudFormation describe infrastructure as version-controlled text. The wins: reproducibility, PR review, git-based rollback.

## ⚙️ Declarative vs imperative
HCL declares the desired state; CDK/Pulumi code lets you loop and branch.

## 📐 Best practice
Remote state with locking, layered modules (network/compute/app), plan -> review -> apply in CI, separate workspaces per env.
`,
  },

  "cloud-cicd-1": {
    vi: `
## 🔬 CI/CD trên cloud

Pipeline điển hình: GitHub Actions / GitLab CI / CodePipeline -> build container -> push registry -> deploy ECS/Cloud Run/K8s -> chạy smoke test -> alert nếu lỗi.

## ⚙️ Pattern triển khai an toàn
- **Rolling**: thay từng instance, không downtime nhưng có lúc 2 version chạy song song -> backward-compatible API.
- **Blue-Green**: chuẩn bị stack mới, switch DNS/LB. Rollback chỉ là switch ngược.
- **Canary**: thả 1-5% traffic, theo dõi metric rồi tăng.

## 📐 Checklist
Build 1 image dùng cho mọi env (cấu hình qua env var), bake migration vào job riêng trước khi deploy app, tự động rollback khi error rate vượt ngưỡng.
`,
    en: `
## 🔬 Cloud CI/CD

Typical flow: GitHub Actions/GitLab CI/CodePipeline -> build container -> push registry -> deploy to ECS/Cloud Run/K8s -> smoke test -> alert on failure.

## ⚙️ Safe rollout patterns
Rolling (zero downtime, requires backward-compatible APIs), Blue-Green (fast rollback by switching the LB), Canary (gradual traffic ramp with metric guards).

## 📐 Checklist
One image per build promoted across envs, run migrations in a dedicated job before app deploy, auto-rollback on error-rate spike.
`,
  },

  "cloud-arch-1": {
    vi: `
## 🔬 Well-Architected Framework

AWS/GCP/Azure đều có framework tương tự, xoay quanh 6 trụ:
1. **Operational excellence** - vận hành như code, học từ failure.
2. **Security** - defense in depth.
3. **Reliability** - thiết kế cho failure (MTBF cao, MTTR thấp).
4. **Performance efficiency** - chọn đúng service, không over-provision.
5. **Cost optimization** - đo dollar/request, right-sizing.
6. **Sustainability** - chọn region carbon thấp, autoscale xuống 0.

## ⚙️ Nguyên tắc thiết kế HA
- Không bao giờ 1 AZ: minimum 2 AZ, ưu tiên 3.
- Load balancer + health check tự loại instance hỏng.
- Database multi-AZ với automatic failover.
- Stateless app + sticky session qua cookie ký, không session in-memory.

## 📐 Đo lường
RTO (Recovery Time Objective) và RPO (Recovery Point Objective) phải khớp với SLA cam kết với khách hàng - đừng hứa 99.99% rồi backup hàng đêm.
`,
    en: `
## 🔬 Well-Architected Framework

Six pillars: operational excellence, security, reliability, performance efficiency, cost optimisation, sustainability.

## ⚙️ HA design rules
Never one AZ - minimum two, prefer three. Load balancer with health checks. Multi-AZ DB with automated failover. Stateless apps with signed-cookie sessions.

## 📐 Measure
Align RTO and RPO with your customer-facing SLA - do not promise 99.99% if backups are nightly.
`,
  },

  "cloud-cost-1": {
    vi: `
## 🔬 FinOps: quản chi phí như quản code

Cloud bill có thể tăng âm thầm vì 1 cụm Kubernetes idle hoặc 1 EBS volume mồ côi. FinOps là thực hành liên tục: thấy được, phân bổ được, tối ưu được.

## ⚙️ 5 đòn bẩy giảm cost

1. **Right-sizing**: dùng metric thật để chọn instance, không over-provision.
2. **Reserved/Savings Plan**: cam kết 1-3 năm giảm 30-70% cho workload ổn định.
3. **Spot/Preemptible**: rẻ 70-90% cho job có thể restart (batch, CI, ML training).
4. **Auto-scaling**: scale xuống đêm/cuối tuần.
5. **Storage tiering**: lifecycle S3/Blob sang lớp lạnh.

## 📐 Cảnh báo
Đặt budget alert ở 50/80/100% ngân sách tháng. Tag mọi tài nguyên theo team/project để biết ai tiêu gì - không tag = không thấy = không cắt được.
`,
    en: `
## 🔬 FinOps: manage cost like code

Cloud bills creep through idle clusters and orphaned volumes. FinOps is continuous practice: see it, allocate it, optimise it.

## ⚙️ Five levers
Right-sizing from real metrics, Reserved/Savings Plans for steady workloads (30-70% off), Spot/Preemptible for restartable jobs (70-90% off), auto-scaling for off-hours, storage tiering.

## 📐 Guardrails
Budget alerts at 50/80/100%, tag every resource by team/project - untagged means invisible means uncut.
`,
  },

  "cloud-ops-1": {
    vi: `
## 🔬 Vận hành ngày 2 (Day-2 operations)

"Day-1" là deploy lần đầu - dễ. "Day-2" là vận hành 24/7 sau đó - khó. Bao gồm: patching, scaling, on-call, incident, capacity planning, cost review.

## ⚙️ SRE practice cốt lõi

- **Error budget**: SLO 99.9% -> ngân sách lỗi 43 phút/tháng. Tiêu hết -> đóng băng feature.
- **Toil reduction**: việc lặp lại thủ công phải tự động hoá. KPI SRE: < 50% thời gian làm toil.
- **Blameless postmortem**: tập trung vào hệ thống, không đổ lỗi người.

## 📐 On-call humane
Rotation cân bằng, có comp/off, runbook đầy đủ, alert noise thấp - team kiệt sức là dấu hiệu hệ thống chưa đủ trưởng thành chứ không phải lỗi người.
`,
    en: `
## 🔬 Day-2 operations

Day-1 (first deploy) is easy. Day-2 (24/7 operations after) is hard: patching, scaling, on-call, incidents, capacity, cost review.

## ⚙️ Core SRE practice
Error budgets gate feature work; toil reduction targets <50% of SRE time; postmortems stay blameless and focus on systems.

## 📐 Humane on-call
Balanced rotations, comp time, complete runbooks, low alert noise. Burnout signals immature systems, not weak people.
`,
  },

  "cloud-strat-1": {
    vi: `
## 🔬 Multi-cloud vs Single-cloud

**Single-cloud** đơn giản hơn nhiều: 1 tài khoản billing, 1 bộ kỹ năng, deep integration. **Multi-cloud** chỉ đáng đầu tư khi: yêu cầu compliance (data residency), tránh vendor lock-in chiến lược, tận dụng dịch vụ best-of-breed (BigQuery + AWS S3 chẳng hạn).

## ⚙️ Pattern thực dụng

- Core stack ở 1 cloud chính.
- DR (disaster recovery) ở cloud thứ 2 với data replication định kỳ.
- SaaS specialized (Snowflake, Databricks, Cloudflare) overlay xuyên cloud.

## 📐 Cảnh báo
Đừng multi-cloud chỉ vì "đa dạng hoá" mà không có use case rõ - chi phí vận hành (network egress, training, tooling) thường vượt xa lợi ích.
`,
    en: `
## 🔬 Multi-cloud vs single-cloud

Single-cloud is dramatically simpler: one bill, one skillset, deep integration. Multi-cloud earns its keep only for compliance/data residency, strategic anti-lock-in, or best-of-breed services across providers.

## ⚙️ Practical pattern
Core stack on one primary cloud, DR replicated to a second, specialised SaaS (Snowflake, Databricks, Cloudflare) layered across.

## 📐 Warning
Going multi-cloud "for diversity" without a real use case usually costs more in egress, training, and tooling than it saves.
`,
  },

  // ============================================================
  // CYBERSECURITY - deep dives
  // ============================================================
  "cyber-1": {
    vi: `
## 🔬 Tam giác CIA + AAA

Bảo mật xoay quanh **CIA**: Confidentiality (giữ kín), Integrity (không bị sửa), Availability (luôn truy cập được). Kèm theo **AAA**: Authentication (bạn là ai), Authorization (được phép làm gì), Accounting (đã làm gì - log/audit).

## ⚙️ Khi 3 thuộc tính xung đột
Backup public-readable cho dev tiện -> phá Confidentiality. Mã hoá tất cả nặng nề -> giảm Availability. Bảo mật là **trade-off có chủ đích**, không phải maximize 1 trục.

## 📐 Checklist nền tảng
MFA cho mọi tài khoản admin, log truy cập có timestamp + IP, mã hoá data at rest và in transit, principle of least privilege.
`,
    en: `
## 🔬 CIA triad + AAA

Confidentiality, Integrity, Availability - plus Authentication (who), Authorization (what), Accounting (what was done).

## ⚙️ Trade-offs are real
Public backups for dev convenience break C; heavy encryption can hurt A. Security is intentional trade-off, not maximisation on one axis.

## 📐 Foundations checklist
MFA on every admin account, time-and-IP-stamped access logs, encryption at rest and in transit, least privilege.
`,
  },

  "cyber-2": {
    vi: `
## 🔬 Mật mã đối xứng vs bất đối xứng

- **Symmetric** (AES): 1 key chung, nhanh, dùng cho mã hoá data lớn.
- **Asymmetric** (RSA, ECC): public + private key, chậm, dùng cho trao đổi key và chữ ký.

TLS kết hợp cả 2: handshake bất đối xứng để thoả thuận session key, rồi truyền data bằng AES.

## ⚙️ Hash khác encryption
Hash (SHA-256, BLAKE3) là 1 chiều, không có "giải mã". Dùng để xác minh integrity. Mật khẩu KHÔNG hash thường - phải dùng **bcrypt/argon2/scrypt** với salt + work factor để chống brute force.

## 📐 Tránh xa
- Tự thiết kế thuật toán mã hoá
- MD5/SHA-1 cho bảo mật (đã bị collision)
- Hard-code key trong source code
`,
    en: `
## 🔬 Symmetric vs asymmetric crypto

Symmetric (AES) is one shared key, fast, used for bulk data. Asymmetric (RSA/ECC) uses public + private keys for key exchange and signatures.

TLS combines both: asymmetric handshake negotiates a session key, then AES streams the data.

## ⚙️ Hash is not encryption
Hashes (SHA-256, BLAKE3) are one-way for integrity. Passwords MUST use bcrypt/argon2/scrypt with salt and tunable work factor.

## 📐 Don't
Roll your own crypto, use MD5/SHA-1 for security, hard-code keys.
`,
  },

  "cyber-3": {
    vi: `
## 🔬 SQL Injection: vẫn còn ở 2026

Bất kỳ chỗ nào ghép chuỗi vào SQL đều có thể bị inject. Fix duy nhất đáng tin: **parameterized query / prepared statement**. ORM (Prisma, SQLAlchemy, Drizzle) làm điều này tự động khi bạn dùng đúng API.

\`\`\`python
# SAI - dễ bị inject
cur.execute(f"SELECT * FROM users WHERE email='{email}'")
# ĐÚNG - parameterized
cur.execute("SELECT * FROM users WHERE email = %s", (email,))
\`\`\`

## ⚙️ Đừng quên anh em họ
NoSQL injection (MongoDB \`$where\`), LDAP injection, command injection (\`os.system(user_input)\`), template injection (Jinja với input thô). Tất cả đều cùng nguyên nhân: tin tưởng input.

## 📐 Defense in depth
WAF chặn pattern phổ biến, log + alert khi có pattern khả nghi, principle of least privilege cho DB user (app không cần DROP TABLE).
`,
    en: `
## 🔬 SQL Injection still ships in 2026

Any place that concatenates strings into SQL is exploitable. Fix: **parameterized queries / prepared statements**. ORMs handle this when used via their query builders.

## ⚙️ Cousins
NoSQL injection (\`$where\`), LDAP, command injection (\`os.system(user_input)\`), template injection (raw Jinja). Same root cause: trusting input.

## 📐 Defense in depth
WAF for known patterns, alerts on suspicious payloads, least-privileged DB users (the app does not need DROP TABLE).
`,
  },

  "cyber-4": {
    vi: `
## 🔬 XSS: kẻ thù của trình duyệt

3 loại: **Reflected** (script trong URL), **Stored** (script lưu vào DB rồi render cho user khác), **DOM-based** (JS client xử lý input sai).

## ⚙️ Phòng thủ tầng tầng
1. **Output encoding**: escape HTML khi render (React tự làm, trừ \`dangerouslySetInnerHTML\`).
2. **DOMPurify** khi bắt buộc hiển thị HTML user-generated.
3. **Content Security Policy** (CSP): chặn inline script, chỉ cho phép script từ domain whitelist - giảm thiệt hại khi có lỗ hổng.
4. **HttpOnly cookie**: token không truy cập được từ JS -> XSS không đánh cắp được.

## 📐 Checklist
Không bao giờ trust HTML từ rich-text editor, kiểm thử CSP qua report-uri trước khi enforce.
`,
    en: `
## 🔬 XSS targets the browser

Three flavours: reflected (in URL), stored (saved to DB then rendered), DOM-based (client-side mishandling of input).

## ⚙️ Layered defence
Output encoding (React handles it except \`dangerouslySetInnerHTML\`), DOMPurify when you must render user HTML, CSP to forbid inline scripts and whitelist origins, HttpOnly cookies so tokens are invisible to JS.

## 📐 Checklist
Never trust HTML from rich-text editors; deploy CSP in report-only first.
`,
  },

  "cyber-5": {
    vi: `
## 🔬 Authentication vs Authorization

- **AuthN**: chứng minh bạn là ai (password, OTP, passkey).
- **AuthZ**: bạn được phép làm gì (role, policy, RLS).

Nhầm 2 thứ này là nguyên nhân của **Broken Access Control** - lỗi #1 OWASP Top 10.

## ⚙️ Pattern hiện đại
- **OAuth 2.0**: ủy quyền giữa service.
- **OIDC**: lớp identity trên OAuth, trả về ID token (JWT).
- **Passkey/WebAuthn**: thay password bằng cặp khoá lưu trong thiết bị - chống phishing tuyệt đối.

## 📐 JWT đúng cách
Ký bằng RS256 hoặc EdDSA (không dùng \`alg: none\`), exp ngắn (15 phút), kèm refresh token httpOnly. Không nhét data nhạy cảm trong payload (JWT không mã hoá, chỉ ký).
`,
    en: `
## 🔬 AuthN vs AuthZ

AuthN proves who you are; AuthZ controls what you can do. Confusing them produces Broken Access Control - OWASP #1.

## ⚙️ Modern patterns
OAuth 2.0 for service-to-service delegation, OIDC for identity on top (JWT ID token), Passkeys/WebAuthn to replace passwords with phishing-resistant keys.

## 📐 JWT done right
RS256 or EdDSA, never \`alg: none\`, short exp (15 min), refresh in HttpOnly cookies. JWT is signed but not encrypted - keep secrets out of the payload.
`,
  },

  "cyber-6": {
    vi: `
## 🔬 Broken Access Control & IDOR

IDOR (Insecure Direct Object Reference): \`/api/orders/123\` trả về order của user khác chỉ vì backend không kiểm tra ownership. Đây là lỗ hổng dễ tìm và rất phổ biến.

## ⚙️ Fix
- Mọi endpoint check \`resource.owner_id == auth.uid()\` ở server.
- Dùng RLS ở DB layer làm lớp phòng thủ thứ 2.
- Dùng UUID thay vì integer tăng dần (khó đoán, nhưng KHÔNG thay thế authorization).

## 📐 Mass assignment
Đừng \`User.update(req.body)\` thẳng - attacker có thể thêm field \`isAdmin: true\`. Dùng whitelist field hoặc DTO/Zod schema cho input.
`,
    en: `
## 🔬 Broken Access Control and IDOR

IDOR: \`/api/orders/123\` returns another user's data because the backend forgot to check ownership. Easy to find, very common.

## ⚙️ Fix
Check \`resource.owner_id == auth.uid()\` on the server, use RLS as a second layer, prefer UUIDs for IDs (harder to guess but not a replacement for authorization).

## 📐 Mass assignment
Never \`User.update(req.body)\` directly - the attacker just sets \`isAdmin: true\`. Whitelist fields with DTOs or Zod schemas.
`,
  },

  "cyber-7": {
    vi: `
## 🔬 CSRF: kẻ lừa trình duyệt

Cookie tự gửi theo mọi request đến domain - attacker tạo form ở site khác submit sang site bạn -> trình duyệt tự đính kèm cookie session -> hành động thực thi như user thật.

## ⚙️ Phòng chống
- **SameSite=Lax/Strict** cho cookie (mặc định hiện đại) - chặn cross-site request đi kèm cookie.
- **CSRF token** ngẫu nhiên trong form, kiểm tra ở server.
- **Double-submit cookie** với SPA: token nằm trong cookie + header.
- Endpoint mutate (POST/PUT/DELETE) yêu cầu \`Content-Type: application/json\` - chặn form-encoded từ origin khác.

## 📐 Bổ sung
Không bao giờ thực thi mutation qua GET (nguyên tắc REST cũng giống nguyên tắc bảo mật).
`,
    en: `
## 🔬 CSRF tricks the browser

Cookies are sent on every request to the domain - an attacker hosts a form elsewhere that POSTs to your site, your cookie rides along, action executes as the user.

## ⚙️ Defences
SameSite=Lax/Strict cookies, anti-CSRF tokens, double-submit cookies for SPAs, mutation endpoints that require \`Content-Type: application/json\` to block cross-origin form posts.

## 📐 Bonus
Never mutate state via GET - REST and security agree here.
`,
  },

  "cyber-8": {
    vi: `
## 🔬 Supply chain attack

Code của bạn an toàn không đủ - bạn phải tin cả **mọi dependency**. SolarWinds (2020), event-stream (2018), xz-utils (2024) - attacker chèn code độc vào package phổ biến.

## ⚙️ Phòng vệ
- Lock file (package-lock.json, uv.lock) -> reproducible build.
- \`npm audit\` / Dependabot / Snyk tự động cảnh báo CVE.
- Pin major version, review changelog trước khi update.
- SBOM (Software Bill of Materials) để biết chính xác đang chạy gì.
- Sign artifact (Sigstore, cosign) để verify nguồn gốc.

## 📐 CI hygiene
Build trong môi trường cách ly, không cho job CI có quyền push lên main, secret scan trong code (\`git-secrets\`, \`trufflehog\`).
`,
    en: `
## 🔬 Supply chain attacks

Your own code being safe is not enough - you must trust every dependency. SolarWinds (2020), event-stream (2018), xz-utils (2024) all weaponised popular packages.

## ⚙️ Defences
Lock files, automated CVE alerts (Dependabot/Snyk), pinned majors with changelog review, SBOMs, signed artifacts (Sigstore/cosign).

## 📐 CI hygiene
Isolated builders, no push-to-main from CI, secret scanners in the pipeline.
`,
  },

  "cyber-9": {
    vi: `
## 🔬 Secret management

Secret KHÔNG bao giờ nằm trong git, kể cả private repo (commit history vĩnh viễn, repo bị fork bất cứ lúc nào). Dùng secret manager: AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, hoặc \`.env\` được mount runtime từ orchestrator.

## ⚙️ Rotation
Mọi secret nên có policy rotation: API key 90 ngày, DB password 180 ngày, cert TLS tự renew (Let's Encrypt + cert-manager).

## 📐 Khi secret bị lộ
1. Rotate ngay, không "chờ xem".
2. Tìm dấu hiệu sử dụng trong log (CloudTrail, audit log).
3. Postmortem: vì sao lộ? làm sao chặn root cause?
4. Đừng chỉ xoá commit - rewrite history (BFG) + force push + giả định attacker đã có.
`,
    en: `
## 🔬 Secret management

Secrets never live in git, even private repos - history is forever and forks happen. Use a secret manager (AWS/GCP Secrets Manager, HashiCorp Vault) or runtime-mounted env from your orchestrator.

## ⚙️ Rotation
Every secret needs a rotation policy: API keys ~90 days, DB passwords ~180, TLS certs auto-renewed (Let's Encrypt + cert-manager).

## 📐 Leak response
Rotate immediately, hunt usage in audit logs, postmortem the root cause, rewrite history (BFG) plus assume the attacker already has it.
`,
  },

  "cyber-10": {
    vi: `
## 🔬 Logging & monitoring an toàn

Log là tai mắt - nhưng chính log cũng có thể là lỗ hổng:
- Log không được chứa password, token, PII đầy đủ.
- Log injection: user gửi \`\\n[ADMIN] deleted user\` -> log trông như có admin xóa.
- Log tampering: attacker xoá log để xoá dấu vết -> log phải ship ngay sang hệ thống tách biệt (SIEM).

## ⚙️ Detection
- Failed login burst -> brute force.
- Cùng user đăng nhập từ 2 nước trong 10 phút -> session hijack.
- Outbound traffic bất thường -> data exfiltration.

## 📐 MTTD/MTTR
Mean Time To Detect và Mean Time To Respond là 2 metric quan trọng nhất của security ops. Đo và cải tiến liên tục.
`,
    en: `
## 🔬 Safe logging and monitoring

Logs are your senses, but they can also be a hole: never log passwords/tokens/full PII, sanitize against log injection (\`\\n[ADMIN] ...\`), and ship logs to a separate SIEM so attackers cannot delete them.

## ⚙️ Detection signals
Failed-login bursts (brute force), same user from two countries in 10 minutes (session hijack), abnormal outbound traffic (exfiltration).

## 📐 Key metrics
MTTD and MTTR are the heartbeat of security ops - measure and improve.
`,
  },

  "cyber-11": {
    vi: `
## 🔬 Incident response

Có sự cố là chuyện khi nào, không phải có hay không. Framework NIST có 4 pha: **Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity**.

## ⚙️ Vai trò khi incident
- **Incident Commander**: ra quyết định, không code.
- **Communications Lead**: nói với khách hàng, PR, legal.
- **Subject Matter Expert**: kỹ sư debug, ngăn lan.
- **Scribe**: ghi timeline cho postmortem.

## 📐 Drill thường xuyên
Tabletop exercise mỗi quý, game day mô phỏng outage thật. Đội ngũ chưa drill là đội ngũ chưa sẵn sàng.

## 📐 Blameless postmortem
Tập trung "hệ thống cho phép lỗi xảy ra như thế nào", không "ai gây ra". Văn hoá đổ lỗi giết chết transparency.
`,
    en: `
## 🔬 Incident response

NIST has four phases: Preparation, Detection & Analysis, Containment + Eradication + Recovery, Post-Incident Activity.

## ⚙️ Roles
Incident Commander decides, Comms Lead talks to customers/PR/legal, SMEs debug, a Scribe captures the timeline.

## 📐 Drill regularly
Quarterly tabletops and game days. Untested teams are unprepared teams.

## 📐 Blameless postmortems
Focus on how the system allowed the failure, not who. Blame culture kills transparency.
`,
  },

  "cyber-12": {
    vi: `
## 🔬 Compliance & privacy

GDPR (EU), CCPA (California), PDPA (Singapore/Việt Nam 2024 Nghị định 13) - tất cả đều có cùng tinh thần: **người dùng sở hữu dữ liệu của họ**, bạn chỉ xử lý vì lý do hợp pháp đã thông báo.

## ⚙️ Quyền cốt lõi của data subject
- Quyền truy cập (lấy bản sao data của mình)
- Quyền chỉnh sửa, quyền xoá ("right to be forgotten")
- Quyền portability (xuất sang dịch vụ khác)
- Quyền opt-out khỏi xử lý không cần thiết

## 📐 Triển khai kỹ thuật
- Privacy by Design: thu thập tối thiểu cần thiết, mặc định private.
- Pseudonymization & encryption cho PII.
- Data Processing Agreement với mọi vendor.
- DPIA (Data Protection Impact Assessment) cho feature xử lý data nhạy cảm.
- Breach notification: GDPR yêu cầu báo cơ quan trong 72h.
`,
    en: `
## 🔬 Compliance and privacy

GDPR, CCPA, PDPA share the same spirit: users own their data and you process it only for disclosed lawful reasons.

## ⚙️ Data subject rights
Access, rectification, erasure ("right to be forgotten"), portability, opt-out from unnecessary processing.

## 📐 Engineering
Privacy by Design (collect minimum, private by default), pseudonymise/encrypt PII, sign DPAs with vendors, run DPIAs for sensitive features, breach notification within 72h under GDPR.
`,
  },

  // ============================================================
  // MACHINE LEARNING - deep dives
  // ============================================================
  "ml-lr-1": {
    vi: `
## 🔬 Linear Regression: hiểu nền tảng

Model dự đoán \`y = w·x + b\` bằng cách tối thiểu **MSE** (Mean Squared Error). Đẹp về toán vì có nghiệm đóng (closed-form via Normal Equation) hoặc gradient descent.

## ⚙️ 4 giả định quan trọng

1. **Linearity**: quan hệ thực sự tuyến tính (vẽ scatter để kiểm tra).
2. **Independence**: các quan sát độc lập.
3. **Homoscedasticity**: phương sai residual đều nhau.
4. **Normality** of residuals: cho inference (CI, p-value).

Vi phạm -> dự đoán vẫn chạy nhưng confidence interval, p-value không tin được.

## 📐 Khi nào KHÔNG dùng
Quan hệ phi tuyến rõ rệt -> Polynomial / Tree-based. Outlier nặng -> Huber/Quantile regression. Multicollinearity cao -> Ridge/Lasso.
`,
    en: `
## 🔬 Linear regression foundations

\`y = w·x + b\` fit by minimising MSE. Beautiful math: closed-form via the Normal Equation or solved by gradient descent.

## ⚙️ Four assumptions
Linearity, independence, homoscedasticity, normal residuals (for inference). Violations don't break prediction but break confidence intervals and p-values.

## 📐 When not to use
Clearly non-linear data -> polynomial or trees; heavy outliers -> Huber/Quantile; high multicollinearity -> Ridge/Lasso.
`,
  },

  "ml-log-1": {
    vi: `
## 🔬 Logistic Regression không phải regression

Dù tên gọi, đây là **classifier**: dùng hàm sigmoid để biến \`w·x + b\` thành xác suất 0-1, rồi cắt ngưỡng (mặc định 0.5).

## ⚙️ Loss function
**Binary Cross-Entropy** (log loss) thay vì MSE - vì MSE với sigmoid tạo non-convex landscape, gradient descent dễ kẹt local minimum.

## 📐 Threshold không phải lúc nào là 0.5
- Spam detection: threshold cao (0.9) để giảm false positive.
- Cancer screening: threshold thấp (0.3) để giảm false negative.
Hãy tune theo cost của 2 loại lỗi - dùng ROC curve và Precision-Recall curve làm la bàn.
`,
    en: `
## 🔬 Logistic regression is a classifier

Despite the name: sigmoid maps \`w·x + b\` to a 0-1 probability, then a threshold (default 0.5) yields the class.

## ⚙️ Loss
Binary cross-entropy, not MSE - MSE + sigmoid gives a non-convex landscape that traps gradient descent.

## 📐 0.5 is rarely the right threshold
Spam wants high threshold (low FP); cancer screening wants low threshold (low FN). Use ROC and PR curves to tune by the cost of each error.
`,
  },

  "ml-dt-1": {
    vi: `
## 🔬 Decision Tree: chia để trị

Tree học bằng cách tìm câu hỏi (feature + ngưỡng) tách data tốt nhất theo metric **Gini impurity** hoặc **entropy/information gain**. Lặp đệ quy đến khi node thuần hoặc đạt giới hạn.

## ⚙️ Strength & weakness
- ✅ Dễ giải thích, vẽ ra được; không cần scale feature; xử lý numeric + categorical.
- ❌ Cực dễ overfit nếu cho mọc tự do; nhạy với thay đổi nhỏ trong data (high variance).

## 📐 Hyperparameter quan trọng
\`max_depth\`, \`min_samples_split\`, \`min_samples_leaf\`, \`ccp_alpha\` (cost-complexity pruning). Tune bằng cross-validation.

## 📐 Vì sao ensemble (RF, GBM) ăn đứt 1 tree đơn
1 tree high variance + low bias. Trung bình nhiều tree giảm variance mà giữ bias thấp -> hiệu năng vượt trội với data tabular.
`,
    en: `
## 🔬 Decision trees: divide and conquer

Trees recursively choose the (feature, threshold) split that maximises Gini or information gain until purity or stopping criteria.

## ⚙️ Strengths and weaknesses
+ interpretable, no scaling needed, mixed feature types.
- prone to overfit, high variance.

## 📐 Key hyperparameters
\`max_depth\`, \`min_samples_split\`, \`min_samples_leaf\`, \`ccp_alpha\` - tune via CV.

## 📐 Why ensembles dominate
A single tree is high variance/low bias. Averaging many trees reduces variance while preserving bias - the recipe behind Random Forest and Gradient Boosting's dominance on tabular data.
`,
  },

  "ml-rf-1": {
    vi: `
## 🔬 Random Forest = Bagging + feature subsampling

Bagging (Bootstrap Aggregating): mỗi tree học trên 1 mẫu bootstrap (resample có thay thế) -> giảm variance. Random Forest thêm bước: ở mỗi split chỉ xét 1 subset feature ngẫu nhiên -> giảm tương quan giữa tree.

## ⚙️ OOB score miễn phí
Mỗi cây bỏ ra ~37% mẫu (không được chọn vào bootstrap) - dùng làm validation set ngay khi train, gần với CV.

## 📐 Khi RF tỏa sáng
Data tabular vừa và nhỏ, không có feature engineering phức tạp. Khi data rất lớn hoặc structured (image/text/audio), Deep Learning thường thắng.

## 📐 RF vs GBM
RF train song song (mỗi tree độc lập), GBM tuần tự (mỗi tree sửa lỗi tree trước). GBM (XGBoost, LightGBM) thường accuracy cao hơn nhưng nhạy với hyperparameter.
`,
    en: `
## 🔬 Random Forest = bagging + feature subsampling

Bagging trains each tree on a bootstrap sample (reduces variance). RF also samples features per split, decorrelating trees.

## ⚙️ Free OOB score
Each tree leaves out ~37% of rows - that out-of-bag set works as a near-CV validation built in.

## 📐 Sweet spot
Small-to-medium tabular data, minimal feature engineering. Deep learning usually wins on raw images/text/audio.

## 📐 RF vs GBM
RF trains trees in parallel; GBM trains sequentially, each tree correcting the previous. GBM often peaks higher but is more sensitive to hyperparameters.
`,
  },

  "ml-svm-1": {
    vi: `
## 🔬 SVM: tối đa hoá margin

Tìm hyperplane chia 2 class với **margin** (khoảng cách đến điểm gần nhất) lớn nhất. Chỉ các điểm gần biên (support vectors) quyết định model.

## ⚙️ Kernel trick
Khi data không tách tuyến tính, project lên không gian cao chiều bằng kernel (RBF, polynomial) - nhưng tính nhẩm qua **dot product** chứ không thực sự project, tiết kiệm tính toán.

## 📐 Khi nào dùng SVM 2026
SVM mạnh với data nhỏ (< 100k samples), nhiều feature, biên decision phức tạp. Với data lớn hoặc deep features, gradient boosting và neural net thường tốt hơn và nhanh hơn.

## 📐 Bắt buộc scale feature
SVM nhạy với scale - dùng StandardScaler trước. Đây là sai lầm phổ biến khiến RBF kernel "không hoạt động".
`,
    en: `
## 🔬 SVM maximises the margin

Find the hyperplane separating classes with the largest margin to the nearest points. Only the support vectors define the model.

## ⚙️ Kernel trick
For non-linearly separable data, project to higher dimensions implicitly via dot products - no real projection needed.

## 📐 Where SVM still shines in 2026
Small datasets (<100k), many features, complex decision boundaries. On big data or learned features, gradient boosting and neural nets usually win.

## 📐 Always scale
SVM is scale-sensitive - StandardScaler is mandatory; skipping it is why RBF "doesn't work" for many beginners.
`,
  },

  "ml-km-1": {
    vi: `
## 🔬 K-Means: thuật toán cụm cổ điển

Lặp 2 bước:
1. **Assign**: mỗi điểm về cluster gần nhất (Euclidean).
2. **Update**: tâm cluster = trung bình điểm trong nó.
Dừng khi tâm không đổi nhiều.

## ⚙️ Nhược điểm cốt lõi
- Phải chọn K trước - dùng Elbow method hoặc Silhouette score.
- Giả định cluster hình cầu, kích thước tương đương - méo với cluster hình bầu dục hoặc mật độ khác nhau.
- Nhạy với khởi tạo - dùng **k-means++** (mặc định sklearn) thay vì random.
- Nhạy với outlier - 1 điểm xa kéo lệch tâm.

## 📐 Khi cluster không cầu
DBSCAN (theo mật độ), HDBSCAN, Gaussian Mixture (cụm ellipsoid), Spectral Clustering (đồ thị).
`,
    en: `
## 🔬 K-Means: the classic

Two steps: assign each point to the nearest centroid (Euclidean), then update centroids as the mean of their members. Stop when centroids stabilise.

## ⚙️ Core weaknesses
Must pick K (Elbow or Silhouette), assumes spherical equal-size clusters, sensitive to initialisation (use k-means++), sensitive to outliers.

## 📐 Non-spherical clusters
DBSCAN/HDBSCAN (density-based), Gaussian Mixtures (ellipsoids), Spectral Clustering (graph-based).
`,
  },

  "ml-fe-1": {
    vi: `
## 🔬 Feature engineering vẫn quan trọng

Dù deep learning học feature tự động, với data tabular, feature engineering vẫn là yếu tố thắng cuộc của Kaggle và production. "Garbage in, garbage out" vẫn đúng.

## ⚙️ Pipeline chuẩn
1. **Impute** missing: numeric -> median, categorical -> "missing" hoặc mode.
2. **Encode** categorical: OneHot cho low cardinality, Target/Frequency encoding cho high cardinality.
3. **Scale** numeric: StandardScaler (mean=0, std=1) cho model tuyến tính/SVM/NN; tree-based KHÔNG cần.
4. **Bin** numeric khi quan hệ phi tuyến rõ rệt (age -> nhóm tuổi).
5. **Interaction**: tạo \`price_per_sqm = price/area\`.

## 📐 Tránh data leakage
- Scale/encode FIT trên train, TRANSFORM trên test. Dùng \`Pipeline\` của sklearn để tránh sai.
- Không dùng target để tạo feature ở test set.
- Time-series: split theo thời gian, không random.
`,
    en: `
## 🔬 Feature engineering still matters

For tabular data it remains the winning edge on Kaggle and in production. Garbage in, garbage out.

## ⚙️ Standard pipeline
Impute (median/mode), encode (OneHot for low cardinality, Target/Frequency for high), scale (mandatory for linear/SVM/NN, optional for trees), bin or interact when needed.

## 📐 Avoid leakage
Fit transformers on train and transform test (use sklearn Pipeline), never derive features from the target on the test set, split time series by time not randomly.
`,
  },

  "ml-cv-1": {
    vi: `
## 🔬 Cross-Validation: ước lượng generalization

K-Fold chia data thành K phần, train K lần, mỗi lần dùng K-1 phần train và 1 phần validate. Trung bình K điểm số cho ước lượng ít biased hơn 1 lần holdout.

## ⚙️ Chọn biến thể đúng

- **Stratified K-Fold** cho classification - giữ tỷ lệ class trong mỗi fold.
- **Group K-Fold** khi có nhóm (cùng user/cùng patient) - tránh leak.
- **TimeSeriesSplit** cho dữ liệu thời gian - chỉ train trên quá khứ, validate tương lai.
- **Nested CV** khi đồng thời tune hyperparameter và ước lượng test score.

## 📐 Cảnh báo
- 10-fold đáng tin hơn 5-fold nhưng đắt 2x.
- Random shuffle TRƯỚC khi split (\`shuffle=True, random_state=...\`).
- KHÔNG bao giờ touch test set cho đến lúc cuối cùng.
`,
    en: `
## 🔬 Cross-validation estimates generalisation

K-Fold splits data into K parts, trains K times (K-1 train, 1 validate). Averaging is a less-biased estimate than one holdout.

## ⚙️ Pick the right flavour
Stratified K-Fold for classification, Group K-Fold for grouped data (same user/patient), TimeSeriesSplit for temporal data, Nested CV when tuning + estimating simultaneously.

## 📐 Warnings
10-fold beats 5-fold but costs 2x; shuffle before splitting; never touch the test set until the very end.
`,
  },

  "ml-hp-1": {
    vi: `
## 🔬 Hyperparameter tuning chiến lược

- **Grid Search**: vét cạn lưới - thấu đáo nhưng bùng nổ tổ hợp.
- **Random Search**: lấy mẫu ngẫu nhiên - hiệu quả hơn grid khi nhiều hyperparameter không quan trọng.
- **Bayesian Optimization** (Optuna, Hyperopt): dùng kết quả trước để gợi ý điểm tiếp theo - tốt cho budget hạn chế và training đắt.
- **Successive Halving / Hyperband**: train ngắn nhiều cấu hình, loại bớt, train dài cấu hình còn lại.

## ⚙️ Quy trình thực dụng
1. Sanity check với default trước.
2. Random Search 50-100 lần để khoanh vùng.
3. Bayesian tinh chỉnh ở vùng tốt.
4. Cross-validation trong từng thử nghiệm để ước lượng đáng tin.

## 📐 Đừng quá đà
Tune quá kỹ trên validation = overfit validation. Giữ test set riêng và đánh giá 1 lần cuối.
`,
    en: `
## 🔬 Hyperparameter tuning strategy

Grid (exhaustive), Random (better when many hyperparameters don't matter), Bayesian (Optuna/Hyperopt - smart sampling for expensive trainings), Successive Halving/Hyperband (early-stop weak configs).

## ⚙️ Pragmatic flow
Sanity-check defaults -> Random 50-100 trials to localise -> Bayesian fine-tune the good region -> CV inside each trial.

## 📐 Don't overfit the validation set
Excessive tuning leaks information. Reserve a final test set evaluated only once.
`,
  },

  "ml-eval-1": {
    vi: `
## 🔬 Metric không có "tốt nhất", chỉ có "phù hợp"

- **Classification cân bằng**: Accuracy.
- **Mất cân bằng nặng** (1% positive): Precision, Recall, F1, PR-AUC. Accuracy 99% có thể vô dụng (chỉ luôn dự đoán "negative").
- **Cost lệch giữa FP và FN**: dùng cost-weighted metric hoặc tune threshold.
- **Ranking** (search, recommend): MAP, NDCG, MRR.
- **Regression**: RMSE (phạt nặng lỗi lớn), MAE (robust với outlier), MAPE (%).

## ⚙️ Đọc Confusion Matrix
\`\`\`
                 Predicted
                 P     N
Actual  P    [ TP   FN ]   -> Recall = TP/(TP+FN)
        N    [ FP   TN ]
                 Precision = TP/(TP+FP)
\`\`\`

## 📐 Calibration
Model dự đoán xác suất tốt nghĩa là khi nó nói 70% thì thực tế xảy ra ~70%. Vẽ **reliability diagram**; nếu lệch, dùng Platt scaling hoặc isotonic regression.
`,
    en: `
## 🔬 No "best" metric - only "fit"

Balanced classes: accuracy. Imbalanced: precision, recall, F1, PR-AUC (accuracy can be misleading). Asymmetric costs: cost-weighted or tune threshold. Ranking: MAP, NDCG, MRR. Regression: RMSE (penalises large errors), MAE (robust), MAPE (%).

## ⚙️ Confusion matrix
TP/FN/FP/TN -> Recall = TP/(TP+FN), Precision = TP/(TP+FP).

## 📐 Calibration
A well-calibrated model means "70%" actually happens ~70% of the time. Use reliability diagrams; recalibrate with Platt scaling or isotonic regression.
`,
  },

  "ml-ens-1": {
    vi: `
## 🔬 Vì sao ensemble luôn thắng?

Định lý cốt lõi: nếu các model **đủ tốt** và **đủ đa dạng** (sai khác nhau), trung bình giảm sai số. Lỗi của model 1 bị model 2 bù trừ.

## ⚙️ 3 họ ensemble
- **Bagging** (Random Forest): train song song trên bootstrap, vote/average -> giảm variance.
- **Boosting** (XGBoost, LightGBM, CatBoost): train tuần tự, mỗi tree sửa lỗi của tree trước -> giảm bias mạnh.
- **Stacking**: dùng model meta học từ output các model base -> kết hợp linh hoạt nhất.

## 📐 XGBoost/LightGBM trên tabular
Hơn 70% giải nhất Kaggle với tabular data dùng GBM. Mẹo: bắt đầu với LightGBM (nhanh nhất), tune \`num_leaves\`, \`learning_rate\`, \`min_child_samples\`, dùng early stopping với eval_set.

## 📐 Trade-off
Ensemble tốt hơn nhưng nặng hơn: bộ nhớ x N, inference chậm hơn. Khi cần latency thấp, distill về 1 model nhỏ.
`,
    en: `
## 🔬 Why ensembles win

If models are individually decent and diverse (errors uncorrelated), averaging reduces error - one model's mistake is covered by another.

## ⚙️ Three families
Bagging (parallel, reduces variance), Boosting (sequential, each tree corrects the previous, reduces bias), Stacking (meta-learner on base outputs).

## 📐 GBM dominates tabular
70%+ of Kaggle tabular winners use GBM. Start with LightGBM, tune \`num_leaves\`, \`learning_rate\`, \`min_child_samples\`, use early stopping.

## 📐 Trade-off
Bigger memory, slower inference. Distill to a small model when latency matters.
`,
  },

  "ml-ops-1": {
    vi: `
## 🔬 MLOps: model là sản phẩm sống

Khác phần mềm thường, ML model "hỏng theo thời gian" do **data drift** (phân phối đầu vào đổi) và **concept drift** (mối quan hệ X-y đổi). MLOps là kỷ luật ship + duy trì model 24/7.

## ⚙️ Pipeline trưởng thành
1. **Data versioning** (DVC, LakeFS) - reproducible dataset.
2. **Experiment tracking** (MLflow, W&B) - mọi run có metric + artifact.
3. **Model registry** - phân tách stage: staging/prod, ai approve, khi nào rollback.
4. **CI/CD cho model**: test -> validation gate -> deploy canary -> monitor.
5. **Feature Store** (Feast, Tecton) - feature chung train + serving, tránh training-serving skew.

## 📐 Monitoring production
- Input distribution drift (KS-test, PSI).
- Prediction distribution drift.
- Performance metric (khi có ground truth delay).
- Latency, throughput, error rate như service thường.
- Alert -> auto retrain hoặc shadow model.

## 📐 Bài học đắng
Training-serving skew (feature compute khác nhau giữa offline và online) là nguyên nhân số 1 model "tốt offline, dở online". Feature Store và contract test giữa các tầng giúp tránh.
`,
    en: `
## 🔬 MLOps: a model is a living product

Unlike normal software, ML models "decay" via data drift (input distribution shifts) and concept drift (X-y relationship shifts). MLOps is the discipline of shipping and keeping models alive.

## ⚙️ Mature pipeline
Data versioning (DVC), experiment tracking (MLflow/W&B), model registry, CI/CD for models with canary, Feature Store (Feast/Tecton) to keep train and serve features identical.

## 📐 Production monitoring
Input/prediction drift (KS-test, PSI), performance once ground truth arrives, latency/throughput/error rate like any service, alerts that trigger auto-retrain or shadow models.

## 📐 Hard lesson
Training-serving skew (different feature computation offline vs online) is the #1 cause of "good in notebook, bad in prod". Feature Stores plus contract tests between layers prevent it.
`,
  },

export function getTheoryExtension(lessonId: string, lang: "vi" | "en"): string {
  const ext = theoryExtensions[lessonId];
  if (!ext) return "";
  return lang === "vi" ? ext.vi : ext.en;
}
