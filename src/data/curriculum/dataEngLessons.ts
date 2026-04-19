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
        theory: `**Pandas** là **thư viện xử lý dữ liệu phổ biến nhất Python**, tải về hơn **300 triệu lần/tháng** (PyPI 2025) — được dùng bởi 95% data scientist và 80% data engineer toàn cầu. Nó cung cấp 2 cấu trúc dữ liệu cốt lõi giúp làm việc với dữ liệu structured (như Excel, CSV, SQL table) trở nên trực quan và mạnh mẽ.

## Vì sao Pandas quan trọng?
Trước Pandas (2008, tác giả Wes McKinney tại AQR Capital), Python yếu hơn R/MATLAB cho phân tích dữ liệu. Pandas đem đến:
- **Xử lý in-memory** lên đến **vài chục GB** trên 1 máy (với chunking)
- API thống nhất từ **đọc → làm sạch → biến đổi → ghi**
- Tích hợp với toàn bộ hệ sinh thái: NumPy, Matplotlib, scikit-learn, PyTorch, Spark
- Là **bước đầu tiên** trong mọi pipeline data: ETL, ML feature engineering, EDA, reporting

## Series — viên gạch 1D
**Series** là mảng có nhãn 1 chiều — như **một cột Excel** với index làm row label.
\`\`\`python
import pandas as pd
ages = pd.Series([22, 25, 23], index=['An', 'Binh', 'Chi'], name='age')
# An      22
# Binh    25
# Chi     23
\`\`\`
Thuộc tính chính:
- \`ages.values\` → numpy array (data thật)
- \`ages.index\` → row labels
- \`ages.dtype\` → kiểu (int64, object, datetime64...)
- \`ages.name\` → tên cột

## DataFrame — bảng 2D mạnh mẽ
**DataFrame** là bảng 2 chiều — về cơ bản là **dictionary của các Series** chia sẻ chung index. Đây là cấu trúc chính của Pandas.
\`\`\`python
df = pd.DataFrame({
    'name': ['An', 'Binh', 'Chi'],
    'age': [22, 25, 23],
    'score': [85, 92, 78]
})
\`\`\`

## Tạo DataFrame từ nhiều nguồn
| Nguồn | Method |
|-------|--------|
| Dictionary | \`pd.DataFrame({'col': [values]})\` |
| CSV | \`pd.read_csv('data.csv')\` |
| JSON | \`pd.read_json('data.json')\` |
| Excel | \`pd.read_excel('data.xlsx', sheet_name='Sheet1')\` |
| SQL query | \`pd.read_sql('SELECT * FROM users', conn)\` |
| Parquet (cloud) | \`pd.read_parquet('s3://bucket/file.parquet')\` |
| Google Sheets | \`pd.read_csv('https://docs.google.com/.../export?format=csv')\` |
| List of dicts | \`pd.DataFrame([{'a': 1}, {'a': 2}])\` |

## Bộ lệnh thám hiểm bắt buộc thuộc
Mỗi khi nhận dataset mới, chạy ngay 6 lệnh sau:
- \`df.head(n)\` / \`df.tail(n)\` — n dòng đầu/cuối (mặc định 5)
- \`df.shape\` — tuple (rows, cols)
- \`df.dtypes\` — kiểu của từng cột
- \`df.info()\` — tóm tắt + memory usage (cảnh báo nếu int64 chỗ nên dùng int8)
- \`df.describe(include='all')\` — count, mean, std, min/max, quartiles, unique
- \`df.isnull().sum()\` — số NULL mỗi cột

## 4 cách chọn dữ liệu (selection)
| Cú pháp | Ý nghĩa | Trả về |
|---------|---------|--------|
| \`df['name']\` | 1 cột theo tên | Series |
| \`df[['name', 'age']]\` | nhiều cột | DataFrame |
| \`df.iloc[0:3, 0:2]\` | theo position (0-based) | DataFrame |
| \`df.loc[0:2, 'name':'age']\` | theo label (inclusive) | DataFrame |
| \`df[df['age'] > 22]\` | boolean filter | DataFrame |
| \`df.query('age > 22 and city == "HCM"')\` | SQL-like filter | DataFrame |

**Khác biệt loc vs iloc** — sai cái này = bug khó tìm:
- **iloc** = integer position (như list Python, end-exclusive)
- **loc** = label-based (kể cả end)

## Thêm/sửa cột (mutation patterns)
\`\`\`python
# Cột phái sinh đơn giản
df['passed'] = df['score'] >= 70

# Apply hàm tùy chỉnh
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B' if x >= 80 else 'C')

# Vectorized (NHANH HƠN apply 100×)
df['score_pct'] = (df['score'] / 100 * 100).round(1)

# np.select cho điều kiện phức tạp (nhanh hơn nested apply)
import numpy as np
df['tier'] = np.select(
    [df['score'] >= 90, df['score'] >= 70],
    ['gold', 'silver'],
    default='bronze'
)
\`\`\`

## Aggregation & GroupBy (sức mạnh thật của Pandas)
Pattern **Split-Apply-Combine** (Hadley Wickham 2011) — chia data theo nhóm, áp hàm, gộp lại:
\`\`\`python
# Đơn giản
df.groupby('city')['score'].mean()

# Multi-aggregation
df.groupby('city').agg({
    'score': ['mean', 'max', 'std'],
    'age': 'count',
    'revenue': 'sum'
})

# Named aggregation (Pandas 0.25+, rõ ràng hơn)
df.groupby('city').agg(
    avg_score=('score', 'mean'),
    student_count=('name', 'count')
)
\`\`\`

## Bảng so sánh hiệu năng (1M rows)
| Operation | Time | Note |
|-----------|------|------|
| Vectorized (\`df['a'] + df['b']\`) | ~5 ms | Nhanh nhất |
| \`np.where()\` | ~10 ms | Cho if/else |
| \`apply(lambda)\` | ~500 ms | Chậm 100× |
| \`iterrows()\` | ~5,000 ms | **TRÁNH** |

→ Quy tắc vàng: **Đừng bao giờ dùng for-loop trên DataFrame**. Luôn ưu tiên vectorized > apply > iterrows.

## Case study: Spotify Data Team
Spotify dùng Pandas cho **EDA hằng ngày** trước khi viết Spark job production:
- Analyst export 1-10M rows từ Snowflake → Pandas → notebook
- Khám phá feature mới cho recommendation model
- Khi pattern stable → port sang **PySpark** chạy trên 10B rows

→ Bài học: **Pandas cho prototyping, Spark cho production scale**.

## Best practices
1. **Đọc với dtype rõ ràng** — \`dtype={'id': 'int32', 'name': 'category'}\` tiết kiệm 50-90% RAM
2. **Dùng \`category\` cho cột có ít unique value** (city, status…)
3. **\`copy()\` khi cần** — tránh SettingWithCopyWarning bug âm thầm
4. **Method chaining** với \`.assign()\` và \`.pipe()\` — code sạch hơn
5. **Check memory với \`.memory_usage(deep=True)\`** trước khi load 10GB
6. **Đọc theo chunk** với \`chunksize=50000\` cho file >1GB

## Anti-patterns (tránh!)
- ❌ \`for index, row in df.iterrows()\` — chậm 1000× so với vectorized
- ❌ Tạo DataFrame trong loop bằng \`df = df.append(...)\` — O(n²) memory
- ❌ Dùng \`df.values\` rồi xử lý numpy thủ công — mất index, error-prone
- ❌ Nhầm \`df.copy()\` với \`df.copy(deep=False)\` → mutation lan ra DataFrame gốc
- ❌ Đọc CSV 10GB không có \`chunksize\` → OOM máy

## Khi nào nên / không nên dùng Pandas
**Nên:** dataset <10GB, EDA, feature engineering, prototyping ML, reporting, ETL nhỏ
**Không:** dataset >100GB (dùng **Polars**, **Dask**, **Spark**), real-time streaming (dùng **Kafka Streams**, **Flink**)

## Bridge sang bài tiếp
Sau khi nắm vững DataFrame/Series, bài kế (**Data Cleaning**) sẽ áp dụng các kỹ thuật này để xử lý vấn đề số 1 của data engineer: **dữ liệu bẩn** (missing, duplicate, outlier).`,
        theoryEn: `**Pandas** is Python's #1 data manipulation library — 300M+ downloads/month (PyPI 2025), used by 95% of data scientists and 80% of data engineers globally.

## Why Pandas matters
Before Pandas (2008, Wes McKinney at AQR Capital), Python lagged behind R/MATLAB for data analysis. Pandas brought:
- In-memory processing up to tens of GB on a single machine (with chunking)
- Unified API from read → clean → transform → write
- Integration with the entire ecosystem: NumPy, Matplotlib, scikit-learn, PyTorch, Spark
- The first step in every data pipeline: ETL, ML feature engineering, EDA, reporting

## Series — 1D building block
A 1D labeled array — like a single Excel column with row labels.
\`\`\`python
ages = pd.Series([22, 25, 23], index=['An', 'Binh', 'Chi'], name='age')
\`\`\`
Properties: \`.values\`, \`.index\`, \`.dtype\`, \`.name\`

## DataFrame — 2D powerhouse
A 2D table — essentially a dict of Series sharing an index. The main Pandas structure.

## Creating DataFrames
| Source | Method |
|--------|--------|
| Dict | \`pd.DataFrame({'col': [values]})\` |
| CSV | \`pd.read_csv('data.csv')\` |
| JSON | \`pd.read_json('data.json')\` |
| Excel | \`pd.read_excel('data.xlsx')\` |
| SQL | \`pd.read_sql('SELECT...', conn)\` |
| Parquet (cloud) | \`pd.read_parquet('s3://bucket/file.parquet')\` |
| List of dicts | \`pd.DataFrame([{'a': 1}, {'a': 2}])\` |

## Must-know exploration commands
\`df.head(n)\`, \`df.tail(n)\`, \`df.shape\`, \`df.dtypes\`, \`df.info()\`, \`df.describe(include='all')\`, \`df.isnull().sum()\`

## 4 ways to select data
| Syntax | Meaning |
|--------|---------|
| \`df['name']\` | 1 column → Series |
| \`df[['name','age']]\` | multiple columns → DataFrame |
| \`df.iloc[0:3, 0:2]\` | by position (0-based, end-exclusive) |
| \`df.loc[0:2, 'name':'age']\` | by label (inclusive) |
| \`df[df['age'] > 22]\` | boolean filter |
| \`df.query('age > 22')\` | SQL-like filter |

**iloc vs loc** — getting this wrong = hard-to-find bugs.

## Modify columns (vectorized > apply > iterrows)
\`\`\`python
df['passed'] = df['score'] >= 70                          # vectorized
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')  # apply
df['tier'] = np.select(
    [df['score'] >= 90, df['score'] >= 70],
    ['gold', 'silver'], default='bronze'
)
\`\`\`

## GroupBy — Split-Apply-Combine
\`\`\`python
df.groupby('city').agg(
    avg_score=('score', 'mean'),
    student_count=('name', 'count')
)
\`\`\`

## Performance comparison (1M rows)
| Operation | Time |
|-----------|------|
| Vectorized | ~5 ms |
| np.where | ~10 ms |
| apply(lambda) | ~500 ms |
| iterrows | ~5000 ms — **AVOID** |

## Spotify case study
Analysts export 1-10M rows from Snowflake → Pandas notebooks → discover features → port to PySpark for 10B-row production. **Pandas for prototyping, Spark for scale.**

## Best practices
1. Read with explicit dtype (saves 50-90% RAM)
2. Use \`category\` dtype for low-cardinality columns
3. Always \`.copy()\` to avoid SettingWithCopyWarning
4. Method chain with \`.assign()\` and \`.pipe()\`
5. Check \`.memory_usage(deep=True)\` before loading 10GB
6. Use \`chunksize\` for files >1GB

## Anti-patterns
- ❌ \`iterrows()\` — 1000× slower than vectorized
- ❌ \`df = df.append()\` in loop — O(n²) memory
- ❌ Going to \`.values\` numpy then back — error-prone
- ❌ Shallow copy when you need deep copy
- ❌ Reading 10GB CSV without chunksize → OOM

## When to use Pandas vs alternatives
**Use:** datasets <10GB, EDA, feature engineering, prototyping, reporting, small ETL
**Don't:** datasets >100GB (use **Polars**, **Dask**, **Spark**), real-time streaming (use **Kafka Streams**, **Flink**)

## Bridge to next
After mastering DataFrame/Series, the next lesson (**Data Cleaning**) applies these techniques to data engineering's #1 problem: **dirty data** (missing, duplicates, outliers).`,
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
        exercise: "Create a DataFrame with 10 students, calculate average score by city, find the highest scorer.",
        exerciseEn: "Create a DataFrame with 10 students, calculate average score by city, find the highest scorer.",
        quiz: [
          { question: "How does a DataFrame differ from a Series?", options: ["They are the same", "DataFrame is 2D (table), Series is 1D (column)", "Series is faster", "DataFrame can only hold numbers"], answer: 1, explanation: "A Series is a 1D labeled array (one column). A DataFrame is a 2D table made up of multiple Series sharing an index." },
          { question: "What does df.describe() show?", options: ["Column names only", "Statistical summary: count, mean, std, min, quartiles, max", "The first 5 rows", "Data types"], answer: 1, explanation: "describe() provides a statistical summary of numeric columns including count, mean, standard deviation, min, 25/50/75 percentiles, and max." },
          { question: "What is the difference between iloc and loc?", options: ["No difference", "iloc uses integer position, loc uses labels/names", "loc is faster", "iloc only works with columns"], answer: 1, explanation: "iloc selects by integer position (0, 1, 2...). loc selects by label/index name and column name." },
          { question: "How do you filter rows where score > 80?", options: ["df.filter(score > 80)", "df[df['score'] > 80]", "df.where('score', 80)", "df.select(score > 80)"], answer: 1, explanation: "Boolean indexing: df['score'] > 80 creates a True/False Series, and df[...] returns only the True rows." },
          { question: "What does groupby('city')['score'].mean() return?", options: ["A single number", "The average score for each unique city", "All scores sorted by city", "An error"], answer: 1, explanation: "groupby splits data by city, then .mean() calculates the average score within each city group." }
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
        theory: `**Data Cleaning** is often called the most important (and most time-consuming) step in any data pipeline. Industry surveys consistently show that data professionals spend 60-80% of their time cleaning data. Dirty data leads to wrong analyses, broken models, and bad business decisions.

**Types of "Dirty" Data:**
1. **Missing values** (NaN, None, empty strings)
2. **Duplicates** (same record appearing multiple times)
3. **Outliers** (values far outside the expected range)
4. **Inconsistent formatting** ("New York" vs "new york" vs "NY")
5. **Wrong data types** (dates stored as strings, numbers as text)
6. **Invalid values** (negative ages, future birth dates)

**Handling Missing Values:**

**Detection:**
\`\`\`python
df.isnull().sum()           # count NULLs per column
df.isnull().sum() / len(df) # percentage missing per column
df[df['email'].isnull()]    # view rows with missing emails
\`\`\`

**Strategy Decision Tree:**
- **< 5% missing → Drop rows:** \`df.dropna(subset=['email'])\`
- **5-30% missing → Impute (fill):**
  - Numeric: \`df['age'].fillna(df['age'].median())\` — median is robust to outliers
  - Categorical: \`df['city'].fillna(df['city'].mode()[0])\` — most frequent value
  - Time series: \`df['temp'].interpolate(method='linear')\` — estimate between known points
- **> 30% missing → Consider dropping the column** or using advanced imputation (KNN, regression)

**Important:** Never fill NULLs blindly! Understand *why* data is missing:
- **MCAR (Missing Completely At Random):** Safe to drop or impute
- **MAR (Missing At Random):** Missing depends on other observed columns → impute using those columns
- **MNAR (Missing Not At Random):** Missingness depends on the missing value itself → requires domain knowledge

**Handling Duplicates:**

\`\`\`python
df.duplicated().sum()                           # count duplicates
df.duplicated(subset=['email']).sum()            # duplicates by specific columns
df.drop_duplicates()                             # remove exact duplicates
df.drop_duplicates(subset=['email'], keep='last') # keep last occurrence
\`\`\`

**Detecting Outliers:**

**IQR Method (Interquartile Range):**
\`\`\`python
Q1 = df['score'].quantile(0.25)
Q3 = df['score'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = df[(df['score'] < lower) | (df['score'] > upper)]
\`\`\`

**Z-Score Method:**
\`\`\`python
from scipy import stats
z_scores = stats.zscore(df['score'])
outliers = df[abs(z_scores) > 3]  # values more than 3 std devs from mean
\`\`\`

**Handling Outliers:**
- **Remove:** If they are errors (e.g., age = -5)
- **Cap (Winsorize):** Replace with boundary values
- **Log transform:** Reduce skew for naturally skewed data (income, prices)
- **Keep:** If they are legitimate data points (e.g., Elon Musk's income in a salary dataset)

**Data Validation Pipeline:**
\`\`\`python
def clean_dataframe(df):
    # 1. Fix types
    df['age'] = pd.to_numeric(df['age'], errors='coerce')
    # 2. Remove duplicates
    df = df.drop_duplicates()
    # 3. Handle missing
    df['age'] = df['age'].fillna(df['age'].median())
    # 4. Fix outliers
    df['age'] = df['age'].clip(0, 120)
    # 5. Standardize text
    df['name'] = df['name'].str.strip().str.title()
    return df
\`\`\``,
        theoryEn: `**Data Cleaning** — the most time-consuming step in data pipelines (60-80% of work).

**Dirty data types:** Missing values, duplicates, outliers, inconsistent formatting, wrong types.
**Missing values:** Detect with isnull(). Strategy: <5% drop, 5-30% impute, >30% drop column.
**Missing types:** MCAR, MAR, MNAR — understand WHY data is missing.
**Duplicates:** duplicated(), drop_duplicates() with subset and keep options.
**Outliers:** IQR method or Z-score. Options: remove, cap, transform, or keep.`,
        code: `import pandas as pd
import numpy as np

# Messy data
df = pd.DataFrame({
    'name': ['An', 'Binh', None, 'An', 'Chi', 'Dung'],
    'age': [22, np.nan, 23, 22, 25, np.nan],
    'score': [85, 92, 78, 85, 150, 88],
})

print("🔴 Raw Data:")
print(df)
print(f"\\nMissing values:\\n{df.isnull().sum()}")
print(f"Duplicates: {df.duplicated().sum()}")

# Clean
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

df_clean = df_clean[~df_clean.index.isin(outliers.index)]
print(f"\\n✅ Clean Data ({len(df_clean)} rows):")
print(df_clean)`,
        codeLanguage: "python",
        exercise: "Create a 100-row dataset with 15% missing values and 5% outliers. Clean it and report changes.",
        exerciseEn: "Create a 100-row dataset with 15% missing values and 5% outliers. Clean it and report changes.",
        quiz: [
          { question: "When should you use fillna() instead of dropna()?", options: ["Always use fillna", "When there are few missing values and you want to preserve data", "When there are many missing values", "Never"], answer: 1, explanation: "fillna() preserves rows, which is important when other columns have useful data. dropna() permanently removes entire rows." },
          { question: "What does the IQR method consider an outlier?", options: ["Any value above the mean", "Values below Q1-1.5×IQR or above Q3+1.5×IQR", "Values more than 2 standard deviations from mean", "The top and bottom 5%"], answer: 1, explanation: "The IQR method defines outliers as values falling below Q1 - 1.5×IQR or above Q3 + 1.5×IQR." },
          { question: "What is MNAR (Missing Not At Random)?", options: ["Data missing randomly", "Missingness depends on the missing value itself", "Missingness depends on other columns", "No missing data"], answer: 1, explanation: "MNAR means the probability of being missing depends on the unobserved value. E.g., high-income people refusing to report income." },
          { question: "Why use median instead of mean for filling missing numeric values?", options: ["Median is easier to calculate", "Median is robust to outliers, mean is heavily affected by them", "They are always the same", "Mean is better"], answer: 1, explanation: "Median is not affected by extreme values. If your data has outliers, the mean can be misleading." },
          { question: "What does df.drop_duplicates(subset=['email'], keep='last') do?", options: ["Removes all rows with duplicate emails", "Keeps only the last occurrence of each duplicate email, removes earlier ones", "Removes the last duplicate", "Keeps all duplicates"], answer: 1, explanation: "It identifies duplicates by the email column and keeps only the last occurrence, removing all earlier duplicates." }
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
        theory: `**Data Ingestion** is the process of collecting data from various sources and bringing it into your data platform. It is the "Extract" part of ETL/ELT and the starting point of every data pipeline.

**Common Data Sources:**

| Source Type | Format | Tool |
|------------|--------|------|
| Flat files | CSV, TSV, fixed-width | pd.read_csv(), csv module |
| Semi-structured | JSON, XML, YAML | pd.read_json(), json module |
| Spreadsheets | Excel, Google Sheets | pd.read_excel(), gspread |
| Databases | PostgreSQL, MySQL, etc. | pd.read_sql(), SQLAlchemy |
| APIs | REST, GraphQL | requests library |
| Streaming | Kafka, Kinesis, Pub/Sub | kafka-python, boto3 |
| Cloud storage | S3, GCS, Azure Blob | boto3, google-cloud-storage |

**Reading CSV Files (the most common format):**
\`\`\`python
# Basic read
df = pd.read_csv('data.csv')

# With options for real-world messiness
df = pd.read_csv('data.csv',
    encoding='utf-8',          # handle special characters
    sep=',',                   # delimiter (use '\\t' for TSV)
    header=0,                  # row number for column names
    skiprows=2,                # skip first 2 rows
    na_values=['', 'N/A', '-'],# treat these as NaN
    dtype={'id': str},         # force column types
    parse_dates=['created_at'],# auto-parse date columns
    chunksize=10000            # read in chunks for large files
)
\`\`\`

**Reading JSON:**
\`\`\`python
# Simple flat JSON
df = pd.read_json('data.json')

# Nested JSON (common from APIs)
import json
with open('data.json') as f:
    raw = json.load(f)
df = pd.json_normalize(raw, record_path='items', meta=['page', 'total'])
\`\`\`

**Reading from APIs:**
\`\`\`python
import requests

response = requests.get('https://api.example.com/data',
    headers={'Authorization': 'Bearer TOKEN'},
    params={'page': 1, 'per_page': 100}
)
response.raise_for_status()  # raise exception on HTTP error
data = response.json()
\`\`\`

**Handling Large Files:**
- **Chunked reading:** Process the file in pieces instead of loading everything into memory
\`\`\`python
chunks = pd.read_csv('huge_file.csv', chunksize=50000)
for chunk in chunks:
    process(chunk)  # process each 50K-row piece
\`\`\`

**Schema Validation — Trust But Verify:**
Always validate incoming data against expected schemas:
\`\`\`python
EXPECTED_COLUMNS = {'id', 'name', 'email', 'age'}
EXPECTED_TYPES = {'id': int, 'age': int, 'email': str}

def validate(df):
    missing_cols = EXPECTED_COLUMNS - set(df.columns)
    if missing_cols:
        raise ValueError(f"Missing columns: {missing_cols}")
    for col, dtype in EXPECTED_TYPES.items():
        if not pd.api.types.is_dtype_equal(df[col].dtype, dtype):
            print(f"Warning: {col} expected {dtype}, got {df[col].dtype}")
\`\`\`

**Best Practices:**
1. **Log metadata** — record row counts, column counts, file sizes after each ingestion
2. **Idempotent loads** — re-running the same ingestion should not create duplicates
3. **Incremental loading** — only ingest new or changed records (using timestamps or change tracking)
4. **Error handling** — wrap ingestion in try/except, send alerts on failure
5. **Data lineage** — track where each record came from (source, timestamp, pipeline version)`,
        theoryEn: `**Data Ingestion** — collecting data from various sources into your platform.

**Sources:** CSV, JSON, Excel, databases, APIs, streaming, cloud storage.
**CSV tricks:** encoding, sep, na_values, dtype, parse_dates, chunksize.
**JSON:** json_normalize for nested structures.
**Large files:** Chunked reading to avoid memory issues.
**Schema validation:** Always verify columns and types.
**Best practices:** Log metadata, idempotent loads, incremental loading, error handling, data lineage.`,
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
        exercise: "Build a DataIngester class that reads CSV and JSON, auto-detects schema and reports quality.",
        exerciseEn: "Build a DataIngester class that reads CSV and JSON, auto-detects schema and reports quality.",
        quiz: [
          { question: "What is incremental loading?", options: ["Loading all data every time", "Only loading new or changed data since the last run", "Loading data randomly", "Loading data in parallel"], answer: 1, explanation: "Incremental loading only ingests new or modified records, saving time and compute resources." },
          { question: "Why use chunksize when reading large CSVs?", options: ["It makes reading faster", "It prevents running out of memory by processing in smaller pieces", "It's required for CSV files", "It improves data quality"], answer: 1, explanation: "chunksize reads the file in manageable pieces instead of loading millions of rows into memory at once." },
          { question: "What does pd.json_normalize do?", options: ["Validates JSON", "Flattens nested JSON structures into a flat DataFrame", "Converts DataFrame to JSON", "Normalizes numeric values"], answer: 1, explanation: "json_normalize takes nested JSON (common from APIs) and flattens it into a tabular DataFrame format." },
          { question: "What is data lineage?", options: ["Data type information", "Tracking where each record came from and how it was transformed", "The age of the data", "Data backup history"], answer: 1, explanation: "Data lineage records the origin, transformations, and movement of data through your pipeline — essential for debugging and compliance." },
          { question: "Why should data loads be idempotent?", options: ["For faster performance", "So re-running the same load doesn't create duplicates", "It's not important", "For security"], answer: 1, explanation: "Idempotent loads produce the same result regardless of how many times they run — critical for reliable pipelines that may need to retry." }
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
        theory: `**ETL** và **ELT** là hai cách tiếp cận nền tảng để di chuyển dữ liệu từ nguồn (operational systems) đến đích phân tích (data warehouse, lakehouse). Hiểu rõ khi nào dùng cái nào là **kỹ năng cốt lõi** của Data Engineer — chọn sai có thể đốt $$$ tiền cloud hoặc làm chậm pipeline 10×.

## Vì sao chủ đề này quan trọng?
Mọi tổ chức data-driven đều cần một pipeline đáng tin cậy đưa dữ liệu từ **operational systems** (Postgres, MongoDB, Salesforce, Stripe…) vào **analytical store** (BigQuery, Snowflake, Redshift). Pipeline này có thể xử lý từ **vài MB/ngày** (startup) đến **petabytes/giờ** (Netflix, Uber). Cấu trúc ETL/ELT quyết định:
- **Chi phí compute** (transform ở đâu = trả tiền ở đó)
- **Tốc độ time-to-insight** (analyst phải chờ bao lâu)
- **Khả năng tái xử lý** (re-process khi logic sai)

## ETL — Extract → Transform → Load
Dữ liệu được **biến đổi TRƯỚC khi** đưa vào warehouse. Sơ đồ:
\`\`\`
[Source DB] → [Extract] → [Staging Server] → [Transform: Python/Spark] → [Clean Data] → [Load] → [Warehouse]
\`\`\`

**Đặc điểm:**
- Cần **server transform riêng** (EC2, Spark cluster, on-prem box)
- Warehouse chỉ chứa data **đã sạch, đã agg**
- Chi phí cố định cho hạ tầng transform
- **Khó re-process** vì raw data không lưu lại

**Khi nào dùng ETL:**
- Warehouse on-premise (Teradata, Oracle Exadata) — compute đắt và giới hạn
- Có quy định **PII masking trước khi lưu** (GDPR Art. 25 — privacy by design)
- Dữ liệu nhỏ, schema cực ổn định
- Cần **audit trail** với data đã transform là single source of truth

## ELT — Extract → Load → Transform
Dữ liệu thô được **load thẳng** vào warehouse, transform thực hiện **bên trong warehouse** bằng SQL. Sơ đồ:
\`\`\`
[Source DB] → [Extract] → [Load thẳng] → [Warehouse: raw schema] → [Transform: SQL/dbt] → [Mart schema]
\`\`\`

**Đặc điểm:**
- Tận dụng **MPP compute** của warehouse (BigQuery, Snowflake)
- Raw data **luôn còn** → re-process dễ
- Transform = SQL → analyst tự viết được (không phải code Python)
- Chi phí compute biến đổi theo query (pay-per-query model)

**Khi nào dùng ELT:**
- Cloud warehouse (BigQuery, Snowflake, Redshift, Databricks) — compute rẻ và elastic
- Data volume lớn (TB+)
- Team analytics đông, cần tự service
- Cần **time travel / replay** khi logic ETL có bug

## So sánh chi tiết ETL vs ELT
| Khía cạnh | ETL | ELT |
|-----------|-----|-----|
| Vị trí transform | Server riêng | Trong warehouse |
| Tốc độ | Chậm (compute hạn chế) | Nhanh (MPP của warehouse) |
| Tính linh hoạt | Thấp (transform fix sẵn) | Cao (raw luôn còn) |
| Ngôn ngữ transform | Python, Java, Spark | SQL (dbt, Dataform) |
| Chi phí | Server cố định | Pay-per-query (biến đổi) |
| Compliance (PII) | Mask trước khi lưu | Cần row/column-level security |
| Re-processing | Khó (không có raw) | Dễ (raw vẫn còn) |
| Tools tiêu biểu | Informatica, Talend, AWS Glue | dbt, Dataform, Fivetran + Snowflake |

## Các thành phần cốt lõi của Pipeline

### 1. Source Connectors (Extract)
- **Database CDC** (Debezium, AWS DMS) — đọc binlog, capture INSERT/UPDATE/DELETE realtime
- **API connectors** — REST polling (Stripe, Shopify), webhook (Slack, GitHub)
- **File watchers** — S3 EventBridge, GCS Pub/Sub trigger khi file mới đến
- **Streaming source** — Kafka topic, Kinesis stream

### 2. Transformation Layer
- **Cleaning**: null handling, type cast, dedup
- **Enrichment**: join với reference (geocoding IP, currency convert, lookup user master)
- **Aggregation**: pre-compute metrics cho dashboard (DAU, GMV, conversion rate)
- **Conforming**: chuẩn hóa format (date YYYY-MM-DD, timezone UTC, currency USD)

### 3. Loading Strategies
| Strategy | Mô tả | Ưu điểm | Nhược điểm |
|----------|-------|---------|------------|
| **Full refresh** | Xóa hết + load lại | Đơn giản, đảm bảo đồng bộ | Chậm với bảng lớn |
| **Incremental append** | Chỉ thêm row mới (theo timestamp) | Nhanh | Không xử lý UPDATE |
| **Upsert (MERGE)** | Insert mới + update cũ theo key | Cân bằng tốt | Cần unique key |
| **SCD Type 2** | Lưu lịch sử (valid_from/valid_to) | Audit đầy đủ | Storage tăng nhanh |

### 4. Orchestration
- **Time-based**: cron (\`0 2 * * *\` — 2h sáng mỗi ngày)
- **Event-driven**: Lambda trigger khi file đến S3
- **Dependency-based**: Airflow DAG — task B chạy sau khi A xong
- **Sensor-based**: poll cho đến khi điều kiện đúng (file đến, partition đầy)

### 5. Monitoring & Data Quality
- **Row count check**: hôm nay nhận 1.2M, trung bình 1M ± 5% → OK
- **Schema drift detection**: cột mới xuất hiện → alert
- **Freshness SLA**: dashboard cần data <1h cũ
- **Volume anomaly**: drop >30% so với baseline → page on-call

## Case study thật

### Netflix — ELT trên S3 + Spark + Iceberg
- **3+ PB/ngày** event data từ 250M users
- Stack: **Kafka → S3 (raw, parquet) → Spark transform → Iceberg tables → Druid (serving)**
- Lý do chọn ELT: cần re-process khi sửa logic recommendation; raw data giữ 18 tháng
- Cost saving: dùng **Spot Instances** cho Spark batch (tiết kiệm 70%)

### Stripe — ETL với Python + Postgres
- Data tài chính cần **PII masking** trước khi vào analytical DB (PCI-DSS)
- Pipeline Python + Airflow extract từ production Postgres → mask card numbers → load vào analytics warehouse
- Chọn ETL vì compliance > flexibility

### Airbnb — Hybrid ETL + ELT
- **Real-time pricing** (ETL): Spark Streaming, transform trước khi push vào serving DB
- **Reporting/analytics** (ELT): dump raw vào Hive → dbt transform → Presto query
- Bài học: không phải chọn 1 trong 2 — **dùng cả hai cho use cases khác nhau**

## Best practices
1. **Idempotent jobs** — chạy lại nhiều lần không tạo duplicate (dùng MERGE thay vì INSERT)
2. **Partition by date** — \`/year=2026/month=04/day=19/\` giúp prune query nhanh
3. **Schema evolution friendly** — dùng Avro/Parquet với schema registry, tránh CSV
4. **Separate raw / staging / mart** schemas — 3 lớp rõ ràng, dễ debug
5. **Data contract** giữa source team và data team — schema + SLA + on-call rotation
6. **Backfill capability** — pipeline phải re-process được 30/60/90 ngày dữ liệu cũ
7. **CI/CD cho pipeline** — test transform với sample data trước khi deploy

## Anti-patterns (tránh!)
- ❌ **"Big bang" full refresh hàng giờ** với bảng 100GB → tốn $$$ compute
- ❌ Transform trong **stored procedure** không có version control → không debug được
- ❌ Pipeline **không idempotent** — retry tạo data trùng
- ❌ **Hardcode credentials** trong DAG code → leak qua Git
- ❌ Không có **alert khi pipeline fail** — phát hiện sau 3 ngày qua complaint của CEO
- ❌ Transform raw data **mất luôn raw** — không re-process được khi phát hiện bug logic

## Khi nào nên / không nên
**Nên ELT khi:** cloud warehouse, data volume lớn, team analytics đông, cần flexibility cao
**Nên ETL khi:** PII compliance bắt buộc, on-prem warehouse, schema cực ổn định, audit yêu cầu single source

## Bridge sang bài tiếp
Sau khi nắm được kiến trúc tổng thể ETL/ELT, bài tiếp theo (**Data Modeling**) sẽ đào sâu vào **cách tổ chức bảng** trong warehouse: Star Schema, Snowflake Schema, fact vs dimension — quyết định query có nhanh hay chậm.`,
        theoryEn: `**ETL** and **ELT** are the two fundamental patterns for moving data from operational sources to analytical destinations. Choosing wrong can burn cloud budget or make pipelines 10× slower.

## Why this matters
Every data-driven company needs reliable pipelines from operational systems (Postgres, MongoDB, Salesforce, Stripe) to analytical stores (BigQuery, Snowflake, Redshift). Volumes range from MB/day (startups) to petabytes/hour (Netflix, Uber). The pattern decides:
- **Compute cost** (transform location = bill location)
- **Time to insight**
- **Reprocessing capability** when logic is wrong

## ETL — Transform before Load
\`\`\`
[Source] → [Extract] → [Staging server] → [Transform: Python/Spark] → [Load] → [Warehouse]
\`\`\`
- Separate transform server (EC2, Spark cluster, on-prem)
- Warehouse holds clean, aggregated data only
- Fixed infra cost
- Hard to reprocess (no raw kept)

**Use ETL when:** on-prem warehouse, GDPR-style PII masking required before storage, small stable schema, need clean data as single source.

## ELT — Load raw, then transform
\`\`\`
[Source] → [Extract] → [Load raw] → [Warehouse: raw schema] → [Transform: SQL/dbt] → [Mart schema]
\`\`\`
- Leverages warehouse's MPP compute (BigQuery, Snowflake)
- Raw data always available → easy reprocess
- Transform = SQL → analysts can self-serve
- Pay-per-query cost model

**Use ELT when:** cloud warehouse, large volume (TB+), big analytics team, need replay/time-travel.

## Detailed comparison
| Aspect | ETL | ELT |
|--------|-----|-----|
| Transform location | Separate server | Inside warehouse |
| Speed | Slower (constrained) | Faster (warehouse MPP) |
| Flexibility | Low (fixed transforms) | High (raw kept) |
| Language | Python, Java, Spark | SQL (dbt) |
| Cost | Fixed server | Pay-per-query |
| Compliance (PII) | Mask before load | Row/column-level security |
| Reprocessing | Hard (no raw) | Easy (raw kept) |
| Tools | Informatica, Talend, Glue | dbt, Dataform, Fivetran + Snowflake |

## Pipeline components

### 1. Source connectors (Extract)
- DB CDC (Debezium, AWS DMS) — read binlog for real-time INSERT/UPDATE/DELETE
- API: REST polling (Stripe, Shopify), webhooks (Slack, GitHub)
- File watchers: S3 EventBridge, GCS Pub/Sub
- Streaming: Kafka, Kinesis

### 2. Transformation layer
- Cleaning, enrichment (joins with reference data), aggregation, conforming (date, timezone, currency)

### 3. Loading strategies
| Strategy | Description | Pros | Cons |
|----------|-------------|------|------|
| Full refresh | Delete + reload | Simple | Slow on large tables |
| Incremental append | Add new rows | Fast | No UPDATE handling |
| Upsert (MERGE) | Insert + update by key | Balanced | Needs unique key |
| SCD Type 2 | Keep history | Full audit | Storage grows fast |

### 4. Orchestration
- Time-based (cron), event-driven (Lambda on S3 file), dependency-based (Airflow DAG), sensor-based

### 5. Monitoring
- Row count anomalies, schema drift, freshness SLA, volume drop alerts

## Real-world cases

### Netflix — ELT on S3 + Spark + Iceberg
- 3+ PB/day event data from 250M users
- Stack: Kafka → S3 raw (parquet) → Spark → Iceberg → Druid
- Why ELT: reprocess for recommendation logic changes; raw kept 18 months
- Spot instances for Spark = 70% savings

### Stripe — ETL with Python + Postgres
- Financial data needs PII masking before analytics DB (PCI-DSS)
- Python + Airflow: extract from prod Postgres → mask card numbers → load
- Chose ETL because compliance > flexibility

### Airbnb — Hybrid
- Real-time pricing (ETL): Spark Streaming → transform → serving DB
- Reporting (ELT): raw → Hive → dbt → Presto
- Lesson: use BOTH for different use cases

## Best practices
1. Idempotent jobs (use MERGE not INSERT)
2. Partition by date for query pruning
3. Schema-evolution friendly formats (Avro/Parquet + schema registry)
4. Separate raw / staging / mart schemas
5. Data contracts between source and data teams
6. Backfill capability (replay 30/60/90 days)
7. CI/CD for pipelines

## Anti-patterns
- ❌ Hourly "big bang" full refresh on 100GB tables
- ❌ Transforms in unversioned stored procedures
- ❌ Non-idempotent pipelines causing duplicates
- ❌ Hardcoded credentials in DAG code
- ❌ No alerting on failures
- ❌ Losing raw data during transform

## When to use which
**ELT:** cloud warehouse, large volume, analytics team, high flexibility needed
**ETL:** PII compliance required, on-prem warehouse, very stable schema, audit demands single source

## Bridge to next
After understanding the ETL/ELT architecture, the next lesson (**Data Modeling**) covers HOW to organize tables in the warehouse: Star Schema, Snowflake, fact vs dimension — the foundation of fast queries.`,
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
        exercise: "Extend ETLPipeline: add error handling, retry logic, and data quality report.",
        exerciseEn: "Extend ETLPipeline: add error handling, retry logic, and data quality report.",
        quiz: [
          { question: "How does ELT differ from ETL?", options: ["They are the same", "ELT transforms inside the warehouse after loading raw data", "ETL is faster", "ELT doesn't need transformation"], answer: 1, explanation: "ELT loads raw data first, then uses the warehouse's compute power to transform. ETL transforms before loading." },
          { question: "What is an Upsert loading strategy?", options: ["Delete everything and reload", "Insert new rows and update existing ones", "Only insert, never update", "Create a new table each time"], answer: 1, explanation: "Upsert (merge) inserts new records and updates existing ones based on a key, handling both new and changed data." },
          { question: "What is CDC (Change Data Capture)?", options: ["A data format", "A technique to detect and capture only changed data from sources", "A type of database", "A scheduling tool"], answer: 1, explanation: "CDC captures only the changes (inserts, updates, deletes) from source systems, enabling efficient incremental data pipelines." },
          { question: "When should you use dbt instead of custom Python ETL?", options: ["For data extraction", "For SQL-based transformations inside a cloud warehouse (ELT pattern)", "For streaming data", "For file processing"], answer: 1, explanation: "dbt is designed for the T in ELT — it transforms data inside the warehouse using SQL, with built-in testing and documentation." },
          { question: "What is schema drift?", options: ["When tables move to a different database", "When source data columns are added, removed, or change types unexpectedly", "When queries become slower", "A type of data loss"], answer: 1, explanation: "Schema drift occurs when the structure of source data changes without notice — a common cause of pipeline failures." }
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
        theory: `**Dimensional Modeling** is the standard approach for designing data warehouses. Created by Ralph Kimball, it organizes data into **facts** (what happened) and **dimensions** (the context around what happened).

**Fact Tables — The "What":**
- Contain **quantitative measures** (revenue, quantity, duration, cost)
- Typically the largest tables in the warehouse (billions of rows)
- Each row represents a business event (a sale, a click, a shipment)
- Contains foreign keys to dimension tables
- Two types of facts:
  - **Additive:** Can be summed across all dimensions (revenue, quantity)
  - **Semi-additive:** Can only be summed across some dimensions (account balance — can sum across accounts but not across time)
  - **Non-additive:** Cannot be summed (ratios, percentages — must recalculate)

**Dimension Tables — The "Context":**
- Contain **descriptive attributes** (product name, customer city, date month)
- Usually smaller than fact tables
- Provide the "who, what, where, when, how" context for analysis
- Enable filtering, grouping, and labeling in reports

**Star Schema:**
The simplest dimensional model — one central fact table connected to multiple dimension tables, forming a star shape.

\`\`\`
         dim_product
              |
dim_date — fact_sales — dim_customer
              |
         dim_store
\`\`\`

**Advantages:** Simple to understand, fast queries (fewer JOINs), most BI tools optimize for it.
**Disadvantage:** Some data redundancy in dimensions.

**Snowflake Schema:**
Dimensions are **normalized** (broken into sub-tables):
\`\`\`
dim_date — fact_sales — dim_product → dim_category → dim_department
                     ↘ dim_customer → dim_city → dim_country
\`\`\`

**Advantages:** Less storage, no redundancy.
**Disadvantages:** More JOINs = slower queries, harder to understand.

**Star vs Snowflake:**
| Aspect | Star | Snowflake |
|--------|------|-----------|
| Query speed | Faster (fewer JOINs) | Slower (more JOINs) |
| Storage | More (denormalized dims) | Less (normalized) |
| Complexity | Simple | Complex |
| BI tool support | Excellent | Good |
| Recommendation | **Default choice** | Use when storage is critical |

**Slowly Changing Dimensions (SCD):**
How to handle dimension changes (e.g., a customer moves to a new city):

- **Type 0:** Never update (keep original value forever)
- **Type 1:** Overwrite the old value (no history)
- **Type 2:** Add a new row with version tracking (full history — most common)
  \`\`\`
  customer_key | name  | city   | valid_from | valid_to   | is_current
  1001         | An    | Hanoi  | 2023-01-01 | 2024-06-30 | false
  1002         | An    | HCMC   | 2024-07-01 | NULL       | true
  \`\`\`
- **Type 3:** Add a column for the previous value (limited history)

**Data Vault (advanced alternative):**
A modeling methodology for enterprise data warehouses. Uses three entity types:
- **Hubs:** Business keys (customer ID, product SKU)
- **Links:** Relationships between hubs
- **Satellites:** Descriptive data with history
Best for: highly complex environments with many source systems.`,
        theoryEn: `**Dimensional Modeling** organizes warehouses into Facts (measures/events) and Dimensions (context).

**Star Schema:** Fact table in center, denormalized dimensions around it. Simple, fast, recommended default.
**Snowflake Schema:** Normalized dimensions. Saves storage but slower queries.
**SCD Types:** Type 0 (never change), Type 1 (overwrite), Type 2 (versioned history), Type 3 (previous value column).
**Data Vault:** Advanced methodology with Hubs, Links, Satellites for complex enterprise environments.`,
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
        exercise: "Design a Star Schema for an education system: fact_enrollments with dim_student, dim_course, dim_date.",
        exerciseEn: "Design a Star Schema for an education system: fact_enrollments with dim_student, dim_course, dim_date.",
        quiz: [
          { question: "What does a Fact table contain?", options: ["Descriptive attributes", "Quantitative measures like revenue and quantities", "Only primary keys", "Historical data"], answer: 1, explanation: "Fact tables contain measurable business metrics (revenue, quantity, cost) along with foreign keys to dimension tables." },
          { question: "Why is Star Schema preferred over Snowflake in most cases?", options: ["It uses less storage", "Simpler to understand, fewer JOINs, faster queries, better BI tool support", "It's more normalized", "It handles changes better"], answer: 1, explanation: "Star Schema's simplicity (fewer JOINs) makes queries faster and the model easier to understand. Most BI tools optimize for it." },
          { question: "What is SCD Type 2?", options: ["Overwriting old values", "Adding a new row with version dates to track full history", "Adding a column for the previous value", "Never updating dimensions"], answer: 1, explanation: "SCD Type 2 creates a new row for each change with valid_from/valid_to dates, preserving complete history." },
          { question: "What is a semi-additive fact?", options: ["A fact that can be summed across all dimensions", "A fact that can be summed across some dimensions but not all", "A fact that cannot be summed", "A fact with missing values"], answer: 1, explanation: "Semi-additive facts (like account balance) can be summed across some dimensions (accounts) but not others (time — you'd average instead)." },
          { question: "What is the difference between a surrogate key and a natural key in dimensional modeling?", options: ["They are the same", "Surrogate is auto-generated (no meaning); natural is a real-world identifier", "Natural keys are faster", "Surrogate keys come from source systems"], answer: 1, explanation: "Surrogate keys are warehouse-generated integers with no business meaning. Natural keys (like product SKU) come from source systems." }
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
        theory: `**Data Warehousing** is the practice of collecting, storing, and managing data specifically for analytical queries and business intelligence. It is fundamentally different from the transactional databases that power your applications.

**OLTP vs OLAP — Two Different Worlds:**

| Aspect | OLTP | OLAP |
|--------|------|------|
| Purpose | Run the business | Analyze the business |
| Operations | INSERT, UPDATE, DELETE | SELECT (mostly reads) |
| Data freshness | Real-time | Periodic (hourly/daily) |
| Query complexity | Simple (one row) | Complex (aggregations, JOINs) |
| Users | Application users | Analysts, managers |
| Row count per query | 1-100 | Millions |
| Normalization | Highly normalized (3NF) | Denormalized (Star/Snowflake) |
| Examples | PostgreSQL, MySQL | BigQuery, Snowflake, Redshift |

**Columnar Storage — The Secret Behind Fast Analytics:**
Traditional databases store data **row by row** (good for OLTP — read/write entire records). Analytical databases store data **column by column** (good for OLAP — aggregate specific columns).

\`\`\`
Row-oriented:   [An, 22, 85] [Binh, 25, 92] [Chi, 23, 78]
Column-oriented: [An, Binh, Chi] [22, 25, 23] [85, 92, 78]
\`\`\`

**Why columnar is faster for analytics:**
- Query \`SELECT AVG(score) FROM students\` only reads the score column (not name, age)
- Better compression (similar values stored together)
- SIMD (CPU vector) operations on homogeneous data

**Partitioning — Divide and Conquer:**
Splitting a large table into smaller, manageable pieces based on a column value.
\`\`\`sql
-- BigQuery partitioned table
CREATE TABLE sales
PARTITION BY DATE(created_at)  -- one partition per day
AS SELECT * FROM raw_sales;

-- Query only scans relevant partitions
SELECT SUM(amount) FROM sales
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31';
-- Only scans January data, not the entire table!
\`\`\`

**Clustering — Sorting Within Partitions:**
Physically orders data within partitions by specified columns. Improves filter performance.
\`\`\`sql
-- BigQuery: cluster by customer_id within date partitions
CREATE TABLE sales
PARTITION BY DATE(created_at)
CLUSTER BY customer_id, product_id;
\`\`\`

**Modern Cloud Data Warehouses:**

**BigQuery (Google Cloud):**
- Serverless — no infrastructure to manage
- Pay-per-query (on-demand) or flat-rate pricing
- Automatic scaling, built-in ML (BQML)
- Best for: Teams wanting zero-ops, Google Cloud users

**Snowflake:**
- Separate compute and storage (scale independently)
- Multi-cloud (AWS, GCP, Azure)
- Time Travel (query historical data up to 90 days)
- Data Sharing (share data across organizations without copying)
- Best for: Multi-cloud environments, data sharing needs

**Amazon Redshift:**
- Columnar storage with massively parallel processing (MPP)
- Redshift Spectrum queries S3 directly
- Best for: AWS-heavy organizations

**OLAP Operations:**
- **Roll-up:** Aggregate from detailed to summary (day → month → year)
- **Drill-down:** Go from summary to detail (year → quarter → month)
- **Slice:** Filter on one dimension (only Q1 data)
- **Dice:** Filter on multiple dimensions (Q1 + Region North + Product A)
- **Pivot:** Rotate dimensions (rows ↔ columns)`,
        theoryEn: `**OLTP** (transactions) vs **OLAP** (analytics) — different purposes, different architectures.
**Columnar storage:** Stores data by column, fast for analytics, good compression.
**Partitioning:** Splits tables by a column (date) so queries only scan relevant data.
**Clustering:** Sorts data within partitions for faster filtering.
**Cloud warehouses:** BigQuery (serverless), Snowflake (multi-cloud, data sharing), Redshift (MPP).
**OLAP operations:** Roll-up, Drill-down, Slice, Dice, Pivot.`,
        code: `# OLAP Operations Simulation
import numpy as np

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
        exercise: "Implement PIVOT: transform data from long format (rows) to wide format (columns).",
        exerciseEn: "Implement PIVOT: transform data from long format (rows) to wide format (columns).",
        quiz: [
          { question: "When is columnar storage faster than row-based?", options: ["For INSERT operations", "For SELECT * (all columns)", "For aggregations on a few columns (SUM, AVG)", "For UPDATE operations"], answer: 2, explanation: "Columnar storage only reads the columns needed for the query, making aggregations on a few columns much faster." },
          { question: "What does table partitioning do?", options: ["Creates backup copies", "Splits a table into smaller pieces so queries only scan relevant data", "Encrypts data", "Compresses data"], answer: 1, explanation: "Partitioning divides a table (usually by date) so that queries with partition filters only scan the relevant subset." },
          { question: "What makes Snowflake unique compared to BigQuery?", options: ["It's open source", "It separates compute and storage, supports multi-cloud, and offers data sharing", "It's faster", "It's free"], answer: 1, explanation: "Snowflake's key differentiators: separate compute/storage scaling, multi-cloud support, Time Travel, and cross-org data sharing." },
          { question: "What is the OLAP 'drill-down' operation?", options: ["Aggregating to a higher level", "Going from summary to detail (year → month → day)", "Filtering one dimension", "Rotating axes"], answer: 1, explanation: "Drill-down moves from summary to detail — e.g., clicking on a year total to see monthly breakdowns." },
          { question: "Why is BigQuery called 'serverless'?", options: ["It doesn't use servers", "Users don't manage infrastructure — Google handles scaling and maintenance", "It runs on the client", "It uses edge computing"], answer: 1, explanation: "Serverless means you don't provision, manage, or scale servers. Google handles all infrastructure; you just run queries." }
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
        theory: `**Batch Processing** and **Stream Processing** are two fundamentally different paradigms for processing data. Choosing the right one depends on your latency requirements, data volume, and use case.

**Batch Processing — Process Data in Bulk:**
Data is collected over a period (minutes, hours, days) and processed all at once.

**Characteristics:**
- High throughput (process millions of records efficiently)
- Higher latency (results are not immediate)
- Easier to debug and test (deterministic, repeatable)
- Cost-effective for large volumes

**Tools:** Apache Spark, Pandas, dbt, Hive, MapReduce
**Use cases:** Daily reports, data warehouse loads, ML model training, monthly billing

**Stream Processing — Process Events in Real-Time:**
Each event is processed as soon as it arrives, with latency in milliseconds to seconds.

**Characteristics:**
- Low latency (near real-time results)
- Lower throughput per event (but continuous)
- Harder to debug (non-deterministic, ordering issues)
- More complex infrastructure

**Tools:** Apache Kafka, Apache Flink, Spark Structured Streaming, Amazon Kinesis
**Use cases:** Fraud detection, live dashboards, IoT sensor monitoring, real-time recommendations

**Micro-Batch — The Middle Ground:**
Processes data in very small batches (every few seconds). Offers a balance between latency and simplicity.
- Spark Structured Streaming uses this approach
- Simpler than true streaming but lower latency than traditional batch

**Processing Architectures:**

**Lambda Architecture (Batch + Speed):**
\`\`\`
                    ┌──→ Batch Layer (accurate, slow) ──→ Serving Layer
Raw Data ──→ Queue ─┤
                    └──→ Speed Layer (approximate, fast) ──→ Serving Layer
\`\`\`
- Batch layer: complete, accurate view (runs periodically)
- Speed layer: real-time approximation (fills the gap)
- Downside: maintaining two codebases

**Kappa Architecture (Streaming Only):**
\`\`\`
Raw Data ──→ Stream Processing ──→ Serving Layer
            (Kafka + Flink)
\`\`\`
- Everything goes through the streaming layer
- Replay events for corrections (Kafka log retention)
- Simpler than Lambda but requires robust streaming infrastructure

**Key Streaming Concepts:**

**Event Time vs Processing Time:**
- Event time: when the event actually occurred
- Processing time: when the system processes it
- Late arrivals: events arriving after their window has closed

**Windowing:**
- **Tumbling window:** Fixed, non-overlapping windows (every 5 minutes)
- **Sliding window:** Overlapping windows (5-minute window, slides every 1 minute)
- **Session window:** Dynamic, based on activity gaps (group events with < 30s gap)

**Watermarks:**
A mechanism to handle late events — "I believe all events up to time T have arrived." Events arriving after the watermark may be dropped or sent to a side output.

**Exactly-Once vs At-Least-Once:**
- **At-most-once:** Fire and forget (may lose data)
- **At-least-once:** Retry on failure (may produce duplicates)
- **Exactly-once:** The gold standard (complex, uses transactions + idempotency)`,
        theoryEn: `**Batch:** Process data in bulk periodically. High throughput, higher latency. Tools: Spark, Pandas, dbt.
**Streaming:** Process events in real-time. Low latency, complex infrastructure. Tools: Kafka, Flink.
**Micro-batch:** Small batches every few seconds. Middle ground.

**Lambda Architecture:** Batch + Speed layers (accurate + real-time).
**Kappa Architecture:** Streaming only (simpler).

**Windowing:** Tumbling (fixed), Sliding (overlapping), Session (activity-based).
**Delivery guarantees:** At-most-once, At-least-once, Exactly-once.`,
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
        exercise: "Implement tumbling window (5 events) and sliding window (5 events, slide 2) for stream processor.",
        exerciseEn: "Implement tumbling window (5 events) and sliding window (5 events, slide 2) for stream processor.",
        quiz: [
          { question: "When should you use Stream Processing?", options: ["Monthly reports", "Real-time fraud detection", "Data migration", "Backups"], answer: 1, explanation: "Stream processing is for real-time needs: fraud detection, live monitoring, instant alerts, real-time dashboards." },
          { question: "What is a tumbling window?", options: ["A window that moves with each event", "A fixed-size, non-overlapping time window", "A window based on user sessions", "A window that grows over time"], answer: 1, explanation: "Tumbling windows are fixed-size and non-overlapping — e.g., every 5 minutes is a separate, complete window." },
          { question: "What problem does the Lambda Architecture solve?", options: ["Data storage", "Providing both accurate batch results and real-time approximations", "Data compression", "Security"], answer: 1, explanation: "Lambda Architecture combines a batch layer (accurate but slow) with a speed layer (fast but approximate) to serve both needs." },
          { question: "What is the difference between event time and processing time?", options: ["They are the same", "Event time is when it happened; processing time is when the system processes it", "Processing time is always first", "Event time is for streaming only"], answer: 1, explanation: "Events may arrive late (network delays). Event time reflects reality; processing time reflects when your system saw it." },
          { question: "What does 'exactly-once' delivery guarantee mean?", options: ["Messages are sent exactly once", "Each event is processed exactly once, even with retries — no duplicates, no losses", "Events arrive in order", "Processing takes exactly one second"], answer: 1, explanation: "Exactly-once ensures each event affects the final result once — achieved through transactions and idempotent operations." }
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
        theory: `**Data Quality** determines whether your data is fit for its intended use. Poor data quality costs organizations an estimated $12.9 million per year (Gartner). A data engineer's primary job is ensuring data is reliable, accurate, and timely.

**The Six Dimensions of Data Quality:**

| Dimension | Definition | Example Check |
|-----------|-----------|---------------|
| **Completeness** | No missing values where expected | email NOT NULL for all users |
| **Accuracy** | Data reflects reality | age between 0 and 120 |
| **Consistency** | Same data = same format across systems | "USA" vs "US" vs "United States" |
| **Timeliness** | Data arrives when expected | Orders table updated by 6 AM daily |
| **Uniqueness** | No unintended duplicates | user_id is unique |
| **Validity** | Data conforms to defined rules | email matches regex pattern |

**Data Contracts — Formal Agreements:**
A data contract is a formal agreement between a data producer and consumer that specifies:
1. **Schema:** Column names, types, nullable constraints
2. **SLAs:** Quality guarantees (99.9% completeness, < 1 hour latency)
3. **Ownership:** Who is responsible when things break
4. **Semantics:** What each field actually means (is "revenue" pre-tax or post-tax?)
5. **Evolution policy:** How schema changes are communicated

**Why Data Contracts Matter:**
Without contracts, upstream teams can change their data format without warning, breaking all downstream pipelines. Data contracts formalize these expectations.

**Data Quality Testing Tools:**

**Great Expectations (Python):**
\`\`\`python
import great_expectations as gx
validator = gx.read_csv("data.csv")
validator.expect_column_values_to_not_be_null("email")
validator.expect_column_values_to_be_between("age", 0, 120)
validator.expect_column_values_to_be_unique("user_id")
validator.expect_column_values_to_match_regex("email", r"^[\\w.]+@[\\w]+\\.[\\w]+$")
\`\`\`

**dbt tests:**
\`\`\`yaml
# schema.yml
models:
  - name: users
    columns:
      - name: user_id
        tests: [unique, not_null]
      - name: email
        tests: [not_null, unique]
      - name: age
        tests:
          - accepted_values: {values: [18, 19, 20, ...]}
\`\`\`

**Building a Quality Pipeline:**
\`\`\`
Source → Ingest → [Quality Gate] → Transform → [Quality Gate] → Load → [Quality Gate] → Serve
\`\`\`

**Quality Gate Strategies:**
- **Hard fail:** Pipeline stops if quality check fails (critical data)
- **Soft fail:** Pipeline continues but logs a warning (non-critical)
- **Quarantine:** Bad records are routed to a separate table for review

**Monitoring & Alerting:**
- Set up automated checks that run after each pipeline execution
- Alert channels: Slack, PagerDuty, email
- Dashboard showing quality metrics over time (trend analysis)
- **Anomaly detection:** automatically flag when metrics deviate from historical norms

**Data Observability Platforms:**
- Monte Carlo: automated anomaly detection
- Soda: data quality checks as code
- Elementary: dbt-native data observability
- Great Expectations: open-source expectation framework`,
        theoryEn: `**Data Quality Dimensions:** Completeness, Accuracy, Consistency, Timeliness, Uniqueness, Validity.

**Data Contracts:** Formal agreements on schema, SLAs, ownership, semantics, evolution policy.
**Tools:** Great Expectations, dbt tests, Monte Carlo, Soda.
**Quality Gates:** Hard fail (stop), soft fail (warn), quarantine (isolate bad records).
**Monitoring:** Automated checks, alerts, dashboards, anomaly detection.`,
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
        exercise: "Add check_pattern (regex for email) and check_referential_integrity to DataQualityChecker.",
        exerciseEn: "Add check_pattern (regex for email) and check_referential_integrity to DataQualityChecker.",
        quiz: [
          { question: "What does a Data Contract include?", options: ["Only schema", "Schema + SLA + Ownership + Semantics + Evolution policy", "Only code", "Only documentation"], answer: 1, explanation: "Data Contracts formalize expectations between producers and consumers: schema, quality SLAs, ownership, field semantics, and change policies." },
          { question: "What is a 'hard fail' quality gate?", options: ["A test that always passes", "Pipeline stops completely if a quality check fails", "A warning is logged", "Bad records are quarantined"], answer: 1, explanation: "Hard fail stops the pipeline immediately when a critical quality check fails, preventing bad data from reaching consumers." },
          { question: "What is data observability?", options: ["Watching data move", "Automatically monitoring data quality, freshness, and volume with alerting on anomalies", "Manual data review", "Data visualization"], answer: 1, explanation: "Data observability provides automated monitoring of data health — detecting quality issues, freshness problems, and volume anomalies." },
          { question: "Why is the 'consistency' dimension important?", options: ["For performance", "To ensure the same data is formatted the same way across all systems", "For security", "For storage savings"], answer: 1, explanation: "Inconsistent formatting (USA vs US vs United States) leads to incorrect JOINs, wrong aggregations, and broken reports." },
          { question: "What is data quarantine?", options: ["Deleting bad data", "Routing bad records to a separate table for manual review while the pipeline continues", "Ignoring bad data", "Encrypting sensitive data"], answer: 1, explanation: "Quarantine isolates problematic records so the pipeline can continue processing good data while bad records are reviewed." }
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
        theory: `**Pipeline Orchestration** is the practice of scheduling, coordinating, and monitoring data pipelines. In production, you rarely run a single script — you run dozens of interconnected tasks that must execute in the right order, retry on failure, and alert when something goes wrong.

**Apache Airflow — The Industry Standard:**
Airflow is the most widely-used open-source orchestration tool, created at Airbnb in 2014. It defines workflows as code using Python.

**Core Concepts:**

**DAG (Directed Acyclic Graph):**
A DAG defines a workflow — a collection of tasks with dependencies. "Directed" means dependencies flow one way. "Acyclic" means no circular dependencies.
\`\`\`
extract_csv → clean_data → load_warehouse → send_report
                  ↗
extract_api ──┘
\`\`\`

**Tasks:** Individual units of work (run a Python function, execute SQL, call an API).

**Operators:** Templates for tasks:
- \`PythonOperator\` — run a Python function
- \`BashOperator\` — run a shell command
- \`SQLExecuteQueryOperator\` — run SQL
- \`S3ToGCSOperator\` — transfer between cloud services
- \`EmailOperator\` — send notifications

**Dependencies:** Define execution order:
\`\`\`python
task_a >> task_b  # B runs after A
task_a >> [task_b, task_c]  # B and C run in parallel after A
[task_a, task_b] >> task_c  # C runs after both A and B
\`\`\`

**Scheduling:**
Uses cron expressions:
- \`0 2 * * *\` — daily at 2:00 AM
- \`0 */6 * * *\` — every 6 hours
- \`0 0 1 * *\` — first day of each month
- \`@daily\`, \`@hourly\`, \`@weekly\` — Airflow shortcuts

**Error Handling:**
\`\`\`python
default_args = {
    'retries': 3,                    # retry up to 3 times
    'retry_delay': timedelta(minutes=5),  # wait 5 min between retries
    'email_on_failure': True,        # send email on failure
    'email': ['team@company.com'],
    'sla': timedelta(hours=2),       # alert if task takes > 2 hours
}
\`\`\`

**XCom — Passing Data Between Tasks:**
\`\`\`python
# Task A pushes data
def extract(**context):
    data = fetch_from_api()
    context['ti'].xcom_push(key='raw_data', value=data)

# Task B pulls data
def transform(**context):
    data = context['ti'].xcom_pull(task_ids='extract', key='raw_data')
    return clean(data)
\`\`\`
**Important:** XCom is for **small** metadata (file paths, row counts). Never pass large datasets through XCom — use cloud storage instead.

**Sensors — Waiting for Conditions:**
\`\`\`python
# Wait for a file to appear before processing
file_sensor = S3KeySensor(
    task_id='wait_for_file',
    bucket_name='data-bucket',
    bucket_key='incoming/daily_*.csv',
    poke_interval=300,  # check every 5 minutes
    timeout=3600,       # give up after 1 hour
)
\`\`\`

**Modern Alternatives:**
| Tool | Key Differentiator |
|------|-------------------|
| **Prefect** | Pythonic, easier to learn than Airflow |
| **Dagster** | Software-defined assets, strong typing |
| **dbt Cloud** | SQL-only, built for analytics transforms |
| **Mage** | Modern UI, notebook-style pipeline building |
| **Cloud native** | GCP Workflows, AWS Step Functions, Azure Logic Apps |`,
        theoryEn: `**Orchestration** schedules, coordinates, and monitors data pipelines.

**Airflow concepts:** DAGs (workflow graph), Tasks (work units), Operators (templates), Dependencies (>> syntax).
**Scheduling:** Cron expressions or Airflow shortcuts (@daily, @hourly).
**Error handling:** Retries, retry_delay, email_on_failure, SLAs.
**XCom:** Pass small metadata between tasks (not large data).
**Sensors:** Wait for conditions (file arrival, API availability).
**Alternatives:** Prefect, Dagster, dbt Cloud, Mage.`,
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
        exercise: "Add parallel execution, timeout, and SLA monitoring to the DAG simulator.",
        exerciseEn: "Add parallel execution, timeout, and SLA monitoring to the DAG simulator.",
        quiz: [
          { question: "What is a DAG in Airflow?", options: ["A database", "A Directed Acyclic Graph — a workflow without circular dependencies", "A Data Access Gateway", "A Dashboard"], answer: 1, explanation: "DAG = Directed Acyclic Graph — tasks connected by one-way dependencies with no cycles/loops." },
          { question: "What is XCom used for in Airflow?", options: ["Executing commands", "Passing small metadata (file paths, counts) between tasks", "Storing large datasets", "Scheduling tasks"], answer: 1, explanation: "XCom passes small metadata between tasks. For large data, use cloud storage (S3, GCS) and pass the file path." },
          { question: "What does a Sensor do in Airflow?", options: ["Monitors CPU usage", "Waits for a condition (file arrival, API availability) before proceeding", "Sends notifications", "Cleans up old runs"], answer: 1, explanation: "Sensors poll for a condition (e.g., file exists in S3) and block execution until the condition is met or timeout occurs." },
          { question: "What does the cron expression '0 2 * * *' mean?", options: ["Every 2 minutes", "Every day at 2:00 AM", "Every 2 hours", "Every Monday at 2 AM"], answer: 1, explanation: "0 2 * * * = minute 0, hour 2, any day of month, any month, any day of week = daily at 2:00 AM." },
          { question: "Why should you NOT pass large data through XCom?", options: ["XCom is slow", "XCom stores data in the Airflow metadata database which has limited storage", "XCom doesn't support large data", "There's no reason not to"], answer: 1, explanation: "XCom data is stored in Airflow's metadata database (PostgreSQL/MySQL) which is not designed for large datasets. Use cloud storage." }
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
        theory: `**Cloud Data Platforms** provide managed infrastructure for building data pipelines at scale. Understanding the major cloud providers and their data services is essential for modern data engineers.

**The Big Three Cloud Providers:**

**Google Cloud Platform (GCP):**
Best known for: BigQuery, data analytics
- **Storage:** Cloud Storage (object), BigQuery (warehouse), Bigtable (NoSQL), Firestore (document)
- **Processing:** Dataflow (stream/batch), Dataproc (managed Spark), Cloud Functions (serverless)
- **Orchestration:** Cloud Composer (managed Airflow), Workflows (simple)
- **ML/AI:** Vertex AI, AutoML, BigQuery ML
- **Key advantage:** BigQuery's serverless architecture and ease of use

**Amazon Web Services (AWS):**
Most market share, broadest service catalog
- **Storage:** S3 (object), Redshift (warehouse), DynamoDB (NoSQL), RDS (relational)
- **Processing:** EMR (managed Spark/Hadoop), Glue (serverless ETL), Lambda (serverless compute)
- **Orchestration:** MWAA (managed Airflow), Step Functions (state machines), EventBridge
- **ML/AI:** SageMaker, Comprehend, Rekognition
- **Key advantage:** Largest ecosystem, most third-party integrations

**Microsoft Azure:**
Strong enterprise integration, especially with Microsoft products
- **Storage:** Blob Storage (object), Synapse Analytics (warehouse), Cosmos DB (multi-model)
- **Processing:** HDInsight (managed Hadoop), Data Factory (ETL), Azure Functions
- **Orchestration:** Data Factory (built-in), Logic Apps
- **ML/AI:** Azure ML, Cognitive Services
- **Key advantage:** Seamless integration with Microsoft 365, Active Directory

**Cloud Data Architecture Patterns:**

**The Modern Data Stack:**
\`\`\`
Sources → Ingestion (Fivetran/Airbyte) → Warehouse (Snowflake/BigQuery)
       → Transform (dbt) → BI (Looker/Tableau) → Reverse ETL (Census/Hightouch)
\`\`\`

**Data Lakehouse:**
Combines the flexibility of a data lake with the structure and performance of a warehouse.
- Technologies: Delta Lake (Databricks), Apache Iceberg, Apache Hudi
- Benefits: ACID transactions on file storage, schema enforcement, time travel

**Data Mesh:**
A decentralized approach where each business domain owns and manages its own data products.
- Domain ownership: Marketing team owns marketing data
- Data as a product: Published with quality guarantees
- Self-serve infrastructure: Central platform team provides tools
- Federated governance: Shared standards, local execution

**Cost Optimization Strategies:**
1. **Right-sizing compute:** Don't over-provision; use auto-scaling
2. **Spot/Preemptible instances:** 60-90% cheaper for fault-tolerant workloads
3. **Storage tiering:** Move cold data to cheaper storage classes
4. **Reservation discounts:** Commit to 1-3 year usage for 30-60% savings
5. **Query optimization:** Partition, cluster, and write efficient queries
6. **Data lifecycle policies:** Auto-delete/archive old data

**Infrastructure as Code (IaC):**
\`\`\`hcl
# Terraform example: BigQuery dataset
resource "google_bigquery_dataset" "analytics" {
  dataset_id = "analytics"
  location   = "US"
  labels     = { env = "production" }
}
\`\`\`
Tools: Terraform, Pulumi, CloudFormation, CDK

**Security Best Practices:**
- **IAM:** Principle of least privilege — grant only necessary permissions
- **Encryption:** At rest (storage) and in transit (network)
- **VPC/Private networking:** Keep data services off the public internet
- **Audit logging:** Track who accessed what and when
- **Data masking:** Hide PII in non-production environments`,
        theoryEn: `**Cloud providers:** GCP (BigQuery-focused), AWS (broadest), Azure (Microsoft integration).

**Architecture patterns:** Modern Data Stack, Data Lakehouse (Delta Lake/Iceberg), Data Mesh (domain ownership).
**Cost optimization:** Right-sizing, spot instances, storage tiering, reservations, query efficiency.
**IaC:** Terraform, Pulumi, CloudFormation.
**Security:** IAM (least privilege), encryption, private networking, audit logs, data masking.`,
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
        exercise: "Design a data platform architecture for an e-commerce startup: choose services, estimate costs.",
        exerciseEn: "Design a data platform architecture for an e-commerce startup: choose services, estimate costs.",
        quiz: [
          { question: "What pricing model does BigQuery use?", options: ["Number of tables", "Data scanned per query (TB) for on-demand pricing", "Number of users", "Uptime hours"], answer: 1, explanation: "BigQuery on-demand charges ~$5/TB of data scanned. You can also use flat-rate pricing for predictable costs." },
          { question: "What is a Data Lakehouse?", options: ["A data lake + house", "A system combining data lake flexibility with warehouse ACID transactions and performance", "A type of database", "A visualization tool"], answer: 1, explanation: "Data Lakehouse (Delta Lake, Iceberg) adds warehouse features (ACID, schema, performance) to data lake file storage." },
          { question: "What is the Data Mesh approach?", options: ["A networking technology", "Decentralized data ownership where each domain manages its own data products", "A type of database", "A data pipeline tool"], answer: 1, explanation: "Data Mesh decentralizes data ownership to domain teams who publish data as products with quality guarantees." },
          { question: "What are spot/preemptible instances?", options: ["Always-on servers", "Discounted compute that can be terminated when the cloud provider needs capacity back", "Free trial servers", "Premium high-performance servers"], answer: 1, explanation: "Spot instances use spare cloud capacity at 60-90% discount but can be interrupted. Great for fault-tolerant batch workloads." },
          { question: "What is the principle of least privilege in IAM?", options: ["Give everyone admin access", "Grant only the minimum permissions needed to perform a task", "Remove all permissions", "Use shared accounts"], answer: 1, explanation: "Least privilege means each user/service gets only the exact permissions needed — reducing the impact of compromised credentials." }
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
        theory: `**Production Pipelines** require a fundamentally different mindset from development. A pipeline that works on your laptop with 100 rows must also work at 3 AM with 100 million rows, handle failures gracefully, and alert you when something goes wrong.

**The Three Pillars of Production Data Engineering:**

**1. Reliability — "It Works Even When Things Break"**

**Idempotency:** Running a pipeline multiple times with the same input always produces the same result, without creating duplicates.
\`\`\`python
# Bad: appends every run → duplicates!
INSERT INTO target SELECT * FROM source WHERE date = '2024-01-15';

# Good: delete-then-insert (idempotent)
DELETE FROM target WHERE date = '2024-01-15';
INSERT INTO target SELECT * FROM source WHERE date = '2024-01-15';

# Even better: MERGE/UPSERT
MERGE INTO target USING source ON target.id = source.id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;
\`\`\`

**Retry Logic:** Transient failures (network timeout, rate limit) should not kill the pipeline.
\`\`\`python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, max=60))
def call_api(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
\`\`\`

**Dead Letter Queue (DLQ):** Records that fail processing are routed to a separate queue/table for investigation, while the rest of the pipeline continues.

**Circuit Breaker:** If errors exceed a threshold, stop calling the failing service to avoid cascading failures.

**2. Observability — "You Know What's Happening"**

**Structured Logging:** Use JSON logs with consistent fields for easy searching and aggregation.
\`\`\`python
import logging, json

logger = logging.getLogger(__name__)
logger.info(json.dumps({
    "event": "pipeline_complete",
    "pipeline": "daily_etl",
    "rows_processed": 150000,
    "duration_seconds": 45.2,
    "status": "success"
}))
\`\`\`

**Metrics to Track:**
| Metric | What It Tells You |
|--------|------------------|
| Rows processed | Volume consistency (sudden drops = upstream issue) |
| Duration | Performance trends (gradual increase = growing data or degradation) |
| Error rate | Reliability (should be < 0.1%) |
| Data freshness | When was the last successful update? |
| Resource usage | CPU, memory, disk — approaching limits? |

**Alerting Best Practices:**
- **Page** (wake someone up): pipeline critical failure, data SLA breach
- **Warn** (check next business day): performance degradation, approaching limits
- **Info** (dashboard): routine metrics, successful completions
- Avoid alert fatigue — too many alerts = people ignore them

**Dashboards:** Grafana, DataDog, or CloudWatch dashboards showing pipeline health at a glance.

**3. DevOps — "Changes Are Safe and Automated"**

**CI/CD for Data Pipelines:**
\`\`\`yaml
# GitHub Actions example
name: Data Pipeline CI/CD
on: [push]
jobs:
  test:
    steps:
      - run: pytest tests/unit/         # unit tests for transformations
      - run: pytest tests/integration/  # test against staging data
  deploy:
    needs: test
    steps:
      - run: dbt run --target production
      - run: python deploy_airflow_dags.py
\`\`\`

**Testing Strategy:**
- **Unit tests:** Test individual transformation functions
- **Integration tests:** Test pipeline against a staging database
- **Data tests:** Validate output data quality (dbt tests, Great Expectations)
- **Contract tests:** Verify upstream data matches expected schema

**Environments:**
\`\`\`
Development → Staging → Production
   (local)    (test data)  (real data)
\`\`\`

**Blue/Green Deployments:** Run the new pipeline version alongside the old one, compare outputs, then switch traffic. Zero-downtime deployments.

**Versioning:** Version your data, code, and configurations. If something breaks, you need to know exactly what changed.

**Incident Response:**
1. **Detect:** Automated alerts catch the issue
2. **Triage:** Determine severity and impact
3. **Fix:** Apply immediate fix (revert if necessary)
4. **Recover:** Re-process affected data
5. **Postmortem:** Document what happened, why, and how to prevent it`,
        theoryEn: `**Production requirements — three pillars:**

**1. Reliability:** Idempotency (same result on re-run), retry logic (exponential backoff), dead letter queues, circuit breakers.
**2. Observability:** Structured logging (JSON), metrics (rows, duration, errors, freshness), alerting (page/warn/info), dashboards.
**3. DevOps:** CI/CD (test → deploy), testing strategy (unit/integration/data/contract), environments (dev → staging → prod), blue/green deployments.

**Incident Response:** Detect → Triage → Fix → Recover → Postmortem.`,
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
    if np.random.random() < 0.15:
        raise ValueError("Transform failed")
    return {**record, "score": record["value"] * 2}

data = [{"id": i, "value": i * 10} for i in range(20)]
pipeline = ProductionPipeline("daily_etl")
results = pipeline.run(data, transform)`,
        codeLanguage: "python",
        exercise: "Add idempotency check (based on record ID) and checkpoint/resume to ProductionPipeline.",
        exerciseEn: "Add idempotency check (based on record ID) and checkpoint/resume to ProductionPipeline.",
        quiz: [
          { question: "What does idempotency mean in a data pipeline?", options: ["Runs faster", "Running multiple times with the same input produces the same result without duplicates", "Never fails", "Automatically scales"], answer: 1, explanation: "An idempotent pipeline produces identical results regardless of how many times it runs with the same input — no duplicate records." },
          { question: "What is a Dead Letter Queue?", options: ["A queue for deleted messages", "A separate storage for records that failed processing, allowing the pipeline to continue", "A backup queue", "A priority queue"], answer: 1, explanation: "DLQ captures failed records so the pipeline can continue processing good data. Failed records are reviewed separately." },
          { question: "What is the purpose of a postmortem?", options: ["Blame someone", "Document what happened, root cause, and preventive actions for future incidents", "Delete failed data", "Restart the pipeline"], answer: 1, explanation: "Postmortems are blameless reviews that document incidents, identify root causes, and create action items to prevent recurrence." },
          { question: "What is a circuit breaker pattern?", options: ["A physical switch", "Stopping calls to a failing service after a threshold to prevent cascading failures", "A type of encryption", "A retry mechanism"], answer: 1, explanation: "Circuit breakers detect when a service is failing and temporarily stop sending requests, giving it time to recover." },
          { question: "Why use exponential backoff for retries instead of fixed intervals?", options: ["It's simpler", "It gradually increases wait time, reducing load on the failing service and improving recovery chances", "It's faster", "It uses less memory"], answer: 1, explanation: "Exponential backoff (1s, 2s, 4s, 8s...) gives the failing service increasing recovery time and prevents overwhelming it with rapid retries." }
        ]
      }
    ]
  }
];
