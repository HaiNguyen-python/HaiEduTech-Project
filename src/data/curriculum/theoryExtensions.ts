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

### When `extract` fails
1. Check source Postgres: `psql ... -c "SELECT 1"`
2. View error log: Airflow UI -> task `extract` -> logs
3. If timeout -> bump `statement_timeout` to 60s, retry
4. If schema change -> ping #data-eng, file a ticket

### Rollback
- `dbt run --select tag:sales --vars '{run_date: yesterday}'`
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
};

export function getTheoryExtension(lessonId: string, lang: "vi" | "en"): string {
  const ext = theoryExtensions[lessonId];
  if (!ext) return "";
  return lang === "vi" ? ext.vi : ext.en;
}
