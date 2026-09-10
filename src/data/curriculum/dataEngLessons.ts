// CONTENT STANDARD: every 'theory' block MUST contain ≥6 '## H2' sections so TheorySections.tsx can render the per-section "Mark read" UX.
// Data Engineering curriculum - 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const dataEngModules: ExtendedProgrammingModule[] = [
  {
    id: "de-pandas-basics",
    title: "Basic Pandas",
    titleEn: "Pandas Basics",
    icon: "🐼",
    color: "from-amber-500 to-orange-600",
    description: "DataFrame, Series, read/write data",
    descriptionEn: "DataFrame, Series, reading/writing data",
    course: "data-eng",
    lessons: [
      {
        id: "de-pd-1", title: "DataFrame & Series", titleEn: "DataFrame & Series",
        level: 1, difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn có file Excel danh sách 10.000 đơn hàng Shopee. Mở Excel → lag, lọc 1 cột chờ 5 phút. **Pandas** ra đời để xử lý "Excel khổng lồ" trong Python: nhanh gấp 100 lần và lập trình được.

> 💡 **Mẹo:** Pandas = Excel + Python. Ai từng dùng Excel quen rồi thì học Pandas siêu nhanh.

## 2. 💡 Khái niệm chính

- **Series**: 1 cột dữ liệu (như cột "Giá" trong Excel).
- **DataFrame**: bảng 2 chiều (như nguyên 1 sheet Excel) gồm nhiều Series ghép lại.
- **Index**: số thứ tự dòng (mặc định 0, 1, 2…) - dùng để định danh mỗi dòng.

## 3. 🧰 Cú pháp cơ bản

\`\`\`python
import pandas as pd
df = pd.DataFrame({"name": ["An", "Bình"], "age": [20, 25]})
df["age"]          # Series
df.head()          # 5 dòng đầu
df.shape           # (số dòng, số cột)
df.describe()      # thống kê nhanh
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Đọc CSV doanh thu 1 quán cà phê và xem 5 dòng đầu:

\`\`\`python
df = pd.read_csv("sales.csv")
print(df.head())
print("Tổng doanh thu:", df["amount"].sum())
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Đừng nhầm \`df["col"]\` (Series) với \`df[["col"]]\` (DataFrame 1 cột) - type khác nhau, lỗi tiếp theo sẽ rất khó debug.

## 6. ✅ Best practice

> 💡 **Mẹo:** Luôn \`df.info()\` ngay sau khi đọc dữ liệu để biết kiểu cột và số NaN - tiết kiệm 30 phút debug sau này.

## 7. 🤔 Khi nào dùng

- ✅ Dữ liệu < 10 triệu dòng, fit RAM.
- ❌ Dữ liệu petabyte → dùng Spark/Dask.

## 8. 📌 Tóm tắt 30 giây

Pandas = Excel programmable. Series = 1 cột, DataFrame = bảng. Luôn \`head()\`, \`info()\`, \`describe()\` để khám phá data trước khi xử lý.
`,
        theoryEn: `**Pandas** is Python's #1 data manipulation library - 300M+ downloads/month (PyPI 2025), used by 95% of data scientists and 80% of data engineers globally.

## Why Pandas matters
Before Pandas (2008, Wes McKinney at AQR Capital), Python lagged behind R/MATLAB for data analysis. Pandas brought:
- In-memory processing up to tens of GB on a single machine (with chunking)
- Unified API from read → clean → transform → write
- Integration with the entire ecosystem: NumPy, Matplotlib, scikit-learn, PyTorch, Spark
- The first step in every data pipeline: ETL, ML feature engineering, EDA, reporting

## Series - 1D building block
A 1D labeled array - like a single Excel column with row labels.
\`\`\`python
ages = pd.Series([22, 25, 23], index=['An', 'Binh', 'Chi'], name='age')
\`\`\`
Properties: \`.values\`, \`.index\`, \`.dtype\`, \`.name\`

## DataFrame - 2D powerhouse
A 2D table - essentially a dict of Series sharing an index. The main Pandas structure.

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

**iloc vs loc** - getting this wrong = hard-to-find bugs.

## Modify columns (vectorized > apply > iterrows)
\`\`\`python
# Tạo cột 'passed' True/False nếu score >= 70
df['passed'] = df['score'] >= 70                          # vector hóa
# Gán cột 'grade' dùng apply với lambda để gán 'A' hoặc 'B'
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')  # dùng apply
# Tạo cột 'tier' dùng np.select để phân nhóm 'gold','silver','bronze'
df['tier'] = np.select(
    [df['score'] >= 90, df['score'] >= 70],
    ['gold', 'silver'], default='bronze'
)
\`\`\`

## GroupBy - Split-Apply-Combine
\`\`\`python
# Nhóm dữ liệu theo cột 'city' (thành phố)
# Sau đó, tính toán các giá trị tổng hợp (aggregate) cho mỗi nhóm
df.groupby('city').agg(
    # Tính điểm trung bình (mean) của cột 'score' và đặt tên là 'avg_score'
    avg_score=('score', 'mean'),
    # Đếm số lượng sinh viên (count) trong cột 'name' và đặt tên là 'student_count'
    student_count=('name', 'count')
)
# Kết quả mong đợi: Một DataFrame mới với mỗi hàng là một thành phố,
# và các cột 'avg_score' (điểm trung bình) và 'student_count' (số lượng sinh viên) cho thành phố đó.
\`\`\`

## Performance comparison (1M rows)
| Operation | Time |
|-----------|------|
| Vectorized | ~5 ms |
| np.where | ~10 ms |
| apply(lambda) | ~500 ms |
| iterrows | ~5000 ms - **AVOID** |

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
- ❌ \`iterrows()\` - 1000× slower than vectorized
- ❌ \`df = df.append()\` in loop - O(n²) memory
- ❌ Going to \`.values\` numpy then back - error-prone
- ❌ Shallow copy when you need deep copy
- ❌ Reading 10GB CSV without chunksize → OOM

## When to use Pandas vs alternatives
**Use:** datasets <10GB, EDA, feature engineering, prototyping, reporting, small ETL
**Don't:** datasets >100GB (use **Polars**, **Dask**, **Spark**), real-time streaming (use **Kafka Streams**, **Flink**)

## Bridge to next
After mastering DataFrame/Series, the next lesson (**Data Cleaning**) applies these techniques to data engineering's #1 problem: **dirty data** (missing, duplicates, outliers).`,
        code: `# Thư viện cần thiết để xử lý dữ liệu
import pandas as pd
import numpy as np

# Tạo DataFrame
data = {
    'name': ['An', 'Binh', 'Chi', 'Dung', 'Em'],
    'age': [22, 25, 23, 28, 21],
    'score': [85, 92, 78, 95, 88],
    'city': ['HCM', 'HN', 'HCM', 'DN', 'HN']
}
df = pd.DataFrame(data)

# Hiển thị DataFrame và thông tin cơ bản
print("📊 DataFrame:")
print(df)
print(f"\\\\nShape: {df.shape}")
print(f"\\\\n📈 Statistics:")
print(df.describe())

# Lọc dữ liệu
print(f"\\\\n🔍 Students with score > 85:")
print(df[df['score'] > 85][['name', 'score']])

# Thêm cột
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B' if x >= 80 else 'C')
print(f"\\\\n🎓 With grades:")
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
    description: "Handle missing values, duplicates, outliers",
    descriptionEn: "Handle missing values, duplicates, outliers",
    course: "data-eng",
    lessons: [
      {
        id: "de-clean-1", title: "Missing Values & Duplicates", titleEn: "Missing Values & Duplicates",
        level: 2, difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn nhận file khách hàng từ sale: có dòng tên trống, có khách bị nhập 2 lần, có số điện thoại "abc123". Đem train AI thẳng → model học rác, dự đoán rác. Phải **dọn data** trước.

> 💡 **Mẹo:** "Garbage in, garbage out" - 80% thời gian Data Engineer là dọn dữ liệu, không phải code thuật toán.

## 2. 💡 Khái niệm chính

- **Missing values (NaN)**: ô trống → drop hoặc impute (điền giá trị thay thế).
- **Duplicates**: dòng trùng → giữ 1 bản.
- **Outliers**: giá trị bất thường (ví dụ tuổi 200) → kiểm tra lại nguồn.

## 3. 🧰 Cú pháp Pandas

\`\`\`python
df.isna().sum()                          # đếm NaN mỗi cột
df.dropna(subset=["email"])              # bỏ dòng thiếu email
df["age"].fillna(df["age"].median())     # điền median
df.drop_duplicates(subset=["phone"])     # bỏ trùng theo SĐT
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
df = pd.read_csv("customers.csv")
print("Trước:", len(df))
df = df.drop_duplicates("email").dropna(subset=["email"])
df["age"] = df["age"].fillna(df["age"].median())
print("Sau:", len(df))
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Đừng \`dropna()\` toàn bộ vô tội vạ - có thể mất 80% data. Phải xét từng cột, ưu tiên impute thay vì drop.

## 6. ✅ Best practice

> 💡 **Mẹo:** Trước khi dọn, **luôn lưu bản gốc** (\`df_raw = df.copy()\`) để so sánh và rollback khi cần.

## 7. 🤔 Khi nào dùng

- ✅ Mọi pipeline ETL - bước cleaning là bắt buộc.
- ❌ Streaming real-time → cần validation rules ngay tại nguồn.

## 8. 📌 Tóm tắt 30 giây

NaN → impute (median/mean/mode) > drop. Duplicates → \`drop_duplicates(subset=[key])\`. Luôn backup data gốc và log số dòng trước/sau.
`,
        theoryEn: `**Data Cleaning** is the most time-consuming step in any data pipeline - Anaconda's 2023 survey shows data professionals spend **60-80% of their time** on it. **Garbage in, garbage out** - dirty data leads to wrong analysis, broken ML models, and bad business decisions.

## Why this matters - IBM Watson Health
IBM invested **$5B** in Watson for Oncology but shut it down in 2018 because the model recommended wrong treatments. Root cause: **training data not cleaned** - different hospitals encoded "tumor stage" differently (1, I, Stage I, stage_1…), missing values defaulted to 0, dates not normalized to timezone. **One cleaning failure = $5B lost.**

## 6 types of dirty data
1. Missing values (NaN, None, '', 'N/A', '-')
2. Duplicates
3. Outliers
4. Inconsistent formatting ("New York" vs "new york" vs "NY")
5. Wrong types (date as string, number as text)
6. Invalid values (age=-5, birth_date=2050)

## 1. Detect missing values
\`\`\`python
# Đếm số lượng giá trị thiếu (NULL/NaN) cho mỗi cột trong DataFrame.
# Đầu vào: DataFrame \`df\`.
# Đầu ra: Một Series hiển thị số lượng giá trị thiếu cho từng cột.
df.isnull().sum()                       # NULL count per column
# Tính phần trăm giá trị thiếu cho mỗi cột trong DataFrame.
# Đầu vào: DataFrame \`df\`.
# Đầu ra: Một Series hiển thị phần trăm giá trị thiếu cho từng cột.
df.isnull().sum() / len(df) * 100       # % missing per column

# Nhập thư viện \`missingno\` để trực quan hóa dữ liệu thiếu.
import missingno as msno
# Vẽ biểu đồ ma trận (matrix plot) để hiển thị các mẫu dữ liệu thiếu.
# Các dòng là các hàng dữ liệu, các cột là các cột trong DataFrame.
# Màu trắng biểu thị giá trị thiếu, màu đen biểu thị giá trị có.
# Đầu vào: DataFrame \`df\`.
# Đầu ra: Biểu đồ trực quan hóa mẫu dữ liệu thiếu.
msno.matrix(df)                         # missing pattern heatmap
\`\`\`

## Decision tree for missing
| % Missing | Action |
|-----------|--------|
| <5% | Drop rows |
| 5-30% | Impute |
| 30-60% | Drop column or advanced imputation (KNN, MICE) |
| >60% | Drop column |

**Imputation by data type:**
- Numeric (skewed): median (outlier-resistant)
- Numeric (normal): mean
- Categorical: mode (most frequent)
- Time series: interpolate(linear)
- Stock data: ffill / bfill
- Sentinel: 'UNKNOWN' to preserve "was missing" info

## MCAR / MAR / MNAR - you MUST understand
**NEVER** fill NULLs blindly. Understand WHY they're missing:

| Type | Definition | Example | Strategy |
|------|-----------|---------|----------|
| MCAR | Pure random | Sensor random failure | Safe to drop/impute |
| MAR | Depends on observed columns | Men answer fewer emotion questions | Impute by group |
| MNAR | Depends on missing value itself | High earners hide income | **DANGER** - imputation = bias |

## 2. Handle duplicates
\`\`\`python
df.duplicated().sum()                               # exact dup count
df.duplicated(subset=['email']).sum()               # by email
df.drop_duplicates(subset=['email'], keep='last')   # keep latest
\`\`\`

Pattern: fuzzy duplicates ("John Smith" vs "john smith" vs "John  Smith"):
\`\`\`python
df['email_clean'] = df['email'].str.lower().str.strip()
df = df.drop_duplicates(subset=['email_clean'])
\`\`\`

## 3. Detect outliers - 3 methods

### IQR Method (robust)
\`\`\`python
Q1, Q3 = df['score'].quantile([0.25, 0.75])
IQR = Q3 - Q1
outliers = df[(df['score'] < Q1 - 1.5*IQR) | (df['score'] > Q3 + 1.5*IQR)]
\`\`\`

### Z-Score (for normal distribution)
\`\`\`python
from scipy import stats
outliers = df[abs(stats.zscore(df['score'])) > 3]
\`\`\`

### Isolation Forest (multi-variate)
\`\`\`python
from sklearn.ensemble import IsolationForest
df['outlier'] = IsolationForest(contamination=0.05).fit_predict(df[['age','income','score']])
\`\`\`

## Outlier handling
| Action | When |
|--------|------|
| Remove | Clear errors (age=-5) |
| Cap (Winsorize) | Bring to boundary (Q1, Q99) |
| Log transform | Skewed data (income, prices) |
| Keep | Legitimate (Elon Musk in salary dataset) |
| Separate model | Outlier has own pattern (fraud) |

## Production-ready cleaning pipeline
\`\`\`python
def clean_dataframe(df):
    # Khởi tạo một từ điển để lưu trữ các thông số (metrics) sau khi làm sạch dữ liệu.
    metrics = {}
    
    # Chuyển đổi cột 'age' sang kiểu số.
    # Nếu có lỗi trong quá trình chuyển đổi (ví dụ: giá trị không phải số), thay thế bằng NaN (Not a Number).
    df['age'] = pd.to_numeric(df['age'], errors='coerce')
    
    # Chuyển đổi tất cả các địa chỉ email sang chữ thường và loại bỏ khoảng trắng thừa ở đầu/cuối.
    df['email'] = df['email'].str.lower().str.strip()
    
    # Đếm số lượng các hàng bị trùng lặp và lưu vào metrics.
    # Đầu vào: DataFrame. Đầu ra: Số lượng hàng trùng lặp.
    metrics['duplicates'] = df.duplicated().sum()
    
    # Xóa các hàng bị trùng lặp khỏi DataFrame.
    # Đầu vào: DataFrame có thể chứa các hàng trùng lặp. Đầu ra: DataFrame không còn các hàng trùng lặp.
    df = df.drop_duplicates()
    
    # Xử lý các giá trị thiếu (NaN) trong cột 'age' bằng cách điền giá trị trung vị (median).
    # Sau đó, giới hạn giá trị của 'age' trong khoảng từ 0 đến 120 để đảm bảo tính hợp lệ.
    df['age'] = df['age'].fillna(df['age'].median()).clip(0, 120)
    
    # Xử lý các giá trị ngoại lai (outliers) trong cột 'income'.
    # Giới hạn giá trị 'income' trong khoảng từ phân vị thứ 1 (1%) đến phân vị thứ 99 (99%).
    # Điều này giúp loại bỏ các giá trị quá thấp hoặc quá cao bất thường.
    df['income'] = df['income'].clip(df['income'].quantile(0.01), df['income'].quantile(0.99))
    
    # Kiểm tra tính hợp lệ của các địa chỉ email.
    # Đảm bảo tất cả các email đều chứa ký tự '@'. Nếu không, sẽ báo lỗi.
    assert df['email'].str.contains('@').all(), "Invalid emails"
    
    # Trả về DataFrame đã được làm sạch và từ điển chứa các thông số (metrics).
    # Đầu ra: DataFrame đã làm sạch và metrics (ví dụ: số lượng bản ghi trùng lặp đã xóa).
    return df, metrics
\`\`\`

## Real-world cases

### Airbnb - Data Cleaning Pipeline
- 100M+ listings/booking events/day
- Found 5% bookings with price=0 (UI bug), 3% duplicate reviews
- Used Great Expectations + Spark UDF for validation
- Result: 40% fewer data quality complaints

### Uber - Surge pricing outlier disaster
- Surge pricing 1.0× - 5.0× is **legitimate outlier** (don't clean!)
- 2014: an intern's outlier-cleaning script removed surge data → revenue forecast off by $2M/day for a week

→ Lesson: domain-specific outliers need business approval before removal.

## Best practices
1. Log every step (rows before/after, % missing, # outliers)
2. Standardize text BEFORE dedup (catches case-only dupes)
3. Validate after cleaning (asserts on business rules)
4. Separate raw vs cleaned tables - never overwrite raw
5. Version control cleaning logic
6. Manual sample check (random 100 rows)
7. Use proper tools: **Great Expectations**, **dbt tests**, **Pandera**

## Anti-patterns
- ❌ \`df.fillna(0)\` for ALL columns - turns NULL dates into 1970
- ❌ \`df.dropna()\` without subset - loses 80% of data because of one bad column
- ❌ Removing outliers without domain expert input
- ❌ Cleaning in dashboard query - slow, repeated, not reproducible
- ❌ No logging - can't trace anomalies later

## When to clean
**At pipeline:** before warehouse (single source of truth)
**Not at dashboard:** slow and not reproducible
**At source if possible:** fix form validation instead of cleaning later

## Bridge to next
After learning to clean, the next lesson (**Data Ingestion**) covers HOW to get data in from various sources (CSV, JSON, API, DB) - the first step before cleaning.`,
        code: `# Thư viện cần thiết cho xử lý dữ liệu
import pandas as pd
import numpy as np

# Dữ liệu lộn xộn
df = pd.DataFrame({
    'name': ['An', 'Binh', None, 'An', 'Chi', 'Dung'],
    'age': [22, np.nan, 23, 22, 25, np.nan],
    'score': [85, 92, 78, 85, 150, 88],
})

# In dữ liệu thô và kiểm tra giá trị thiếu/nhân bản
print("🔴 Raw Data:")
print(df)
print(f"\\\\nMissing values:\\\\n{df.isnull().sum()}")
print(f"Duplicates: {df.duplicated().sum()}")

# Dọn dữ liệu
df_clean = df.copy()
df_clean['name'] = df_clean['name'].fillna('Unknown')
df_clean['age'] = df_clean['age'].fillna(df_clean['age'].median())
df_clean = df_clean.drop_duplicates()

# Phát hiện ngoại lệ bằng phương pháp IQR
Q1 = df_clean['score'].quantile(0.25)
Q3 = df_clean['score'].quantile(0.75)
IQR = Q3 - Q1
outliers = df_clean[(df_clean['score'] < Q1 - 1.5*IQR) | (df_clean['score'] > Q3 + 1.5*IQR)]
print(f"\\\\n⚠️ Outliers detected: {len(outliers)}")

# Loại bỏ các hàng ngoại lệ khỏi dataframe sạch
df_clean = df_clean[~df_clean.index.isin(outliers.index)]
print(f"\\\\n✅ Clean Data ({len(df_clean)} rows):")
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
    description: "CSV, JSON, API - collect data",
    descriptionEn: "CSV, JSON, API - data collection",
    course: "data-eng",
    lessons: [
      {
        id: "de-ingest-1", title: "Read multiple data sources", titleEn: "Reading Multiple Data Sources",
        level: 2, difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Sếp giao: "Lấy data từ CSV phòng kế toán + JSON từ app + bảng MySQL của marketing → ghép thành 1 báo cáo". Mỗi nguồn 1 format. **Data Ingestion** = nghệ thuật đọc tất cả về cùng 1 DataFrame.

> 💡 **Mẹo:** Data Engineer giỏi không phải biết nhiều thuật toán, mà là biết "đọc" được mọi loại file mà sếp ném tới.

## 2. 💡 Khái niệm chính

| Nguồn | Hàm Pandas | Khi nào dùng |
|-------|-----------|--------------|
| CSV | \`read_csv()\` | File phẳng, phổ biến nhất |
| JSON | \`read_json()\` | API, log app |
| Excel | \`read_excel()\` | Phòng kế toán |
| SQL DB | \`read_sql()\` | Database production |
| Parquet | \`read_parquet()\` | Big data, nén tốt |

## 3. 🧰 Cú pháp

\`\`\`python
df1 = pd.read_csv("sales.csv", encoding="utf-8")
df2 = pd.read_json("app_log.json")
df3 = pd.read_sql("SELECT * FROM users", conn)
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
# Nhập thư viện pandas, một thư viện mạnh mẽ để làm việc với dữ liệu dạng bảng.
import pandas as pd

# Đọc dữ liệu bán hàng từ file CSV có tên "sales.csv" vào một DataFrame.
# DataFrame là cấu trúc dữ liệu chính của pandas, giống như một bảng tính.
sales = pd.read_csv("sales.csv")

# Đọc dữ liệu sản phẩm từ file Excel có tên "products.xlsx" vào một DataFrame khác.
products = pd.read_excel("products.xlsx")

# Gộp (merge) hai DataFrame 'sales' và 'products' lại với nhau.
# Việc gộp này được thực hiện dựa trên cột chung là "product_id".
# Kết quả là một DataFrame mới chứa thông tin kết hợp từ cả hai bảng.
merged = sales.merge(products, on="product_id")

# In ra 5 dòng đầu tiên của DataFrame đã gộp để xem trước kết quả.
# Đầu ra sẽ là một bảng với các cột từ cả sales và products, được nối với nhau.
print(merged.head())
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** CSV tiếng Việt thường bị lỗi encoding - luôn thử \`encoding="utf-8-sig"\` hoặc \`cp1258\` nếu thấy ký tự lạ.

## 6. ✅ Best practice

> 💡 **Mẹo:** File > 1GB? Đọc theo \`chunksize=100000\` để không nổ RAM. Xử lý từng chunk rồi gộp lại.

## 7. 🤔 Khi nào dùng

- ✅ ETL daily, ad-hoc analysis.
- ❌ Streaming real-time → dùng Kafka/Kinesis.

## 8. 📌 Tóm tắt 30 giây

\`read_csv/json/sql/excel/parquet\` là 5 hàm phải thuộc. Encoding utf-8 cho VN. File to → \`chunksize\`. Đọc xong luôn \`head()\` + \`info()\`.
`,
        theoryEn: `**Data Ingestion** = collecting data from various sources into your platform. It's the **"E" (Extract)** step in ETL/ELT - the first and most critical of any data pipeline. Eye-opening stat: **70% of production pipeline incidents happen at ingestion** (Monte Carlo Data 2024) - because it's the contact point with "the world outside your control".

## Why ingestion is the weakest link
Ingestion faces:
- Source schema changes without notice (Salesforce field updates)
- Network instability (API timeouts, DB connection drops)
- Rate limits (Stripe API: 100 req/sec, Twitter: 300/15min)
- Inconsistent formats (CSV with different delimiters, nested vs flat JSON)
- Volume spikes (Black Friday: 10× normal)

→ Ingestion pipelines must be **resilient, observable, idempotent**.

## Common data sources

| Source | Format | Tool | Use |
|--------|--------|------|-----|
| Flat files | CSV, TSV | pd.read_csv() | Legacy exports |
| Semi-structured | JSON, XML | pd.read_json() | API responses |
| Spreadsheets | Excel, Google Sheets | pd.read_excel(), gspread | Manual business data |
| Database (full) | Postgres, MySQL | pd.read_sql() | One-time backfill |
| Database (CDC) | binlog | Debezium, AWS DMS | Real-time replication |
| REST API | JSON over HTTPS | requests | SaaS (Stripe, Salesforce) |
| GraphQL | typed query | gql | Modern APIs (Shopify) |
| Streaming | Avro, Protobuf | kafka-python | Events, IoT |
| Cloud storage | Parquet, ORC | boto3 | Data lake |
| Webhooks | JSON push | FastAPI, Lambda | Real-time events |

## 1. Reading CSV - production tricks

\`\`\`python
# Đọc file CSV với pandas: cấu hình encoding/separator, header/skiprows, giá trị thiếu, kiểu dữ liệu, parse ngày, đọc theo chunks và cảnh báo lỗi
df = pd.read_csv('data.csv',
    encoding='utf-8',
    sep=',', header=0, skiprows=2,
    na_values=['', 'N/A', '-', 'NULL'],
    dtype={'id': str, 'price': 'float32'},
    parse_dates=['created_at'],
    chunksize=50000,
    on_bad_lines='warn'
)
\`\`\`
**Pitfalls:** 10GB CSV without chunksize = OOM; missing dtype = wrong inference (id as float); BOM from Excel needs \`encoding='utf-8-sig'\`; US (MM/DD/YYYY) vs EU (DD/MM/YYYY) date confusion.

## 2. Reading JSON - flat vs nested
\`\`\`python
# Chuyển đổi dữ liệu JSON phức tạp thành DataFrame phẳng (flat) của pandas.
# Điều này giúp dễ dàng làm việc với dữ liệu có cấu trúc lồng nhau.
df = pd.json_normalize(
    raw['data'],  # Dữ liệu đầu vào là phần 'data' từ đối tượng 'raw'.
    record_path=['orders', 'items'],  # Đường dẫn đến các bản ghi cần "làm phẳng" (flatten).
                                     # Ở đây là các 'items' bên trong mỗi 'order'.
    meta=['order_id', ['customer', 'name']],  # Các trường siêu dữ liệu (meta data) cần giữ lại từ cấp cao hơn.
                                             # 'order_id' được lấy trực tiếp.
                                             # 'name' được lấy từ đối tượng 'customer' lồng bên trong.
    sep='_'  # Ký tự phân tách được sử dụng để nối tên các cột khi làm phẳng các đối tượng lồng nhau.
)
# Kết quả mong đợi: Một DataFrame mới với mỗi hàng là một 'item' từ các đơn hàng,
# kèm theo 'order_id' và 'customer_name' tương ứng.
\`\`\`

## 3. API ingestion - production pattern
\`\`\`python
# Khởi tạo một đối tượng Session để tái sử dụng kết nối HTTP.
# Điều này giúp cải thiện hiệu suất và quản lý cookie/session tốt hơn.
session = requests.Session()
# Cấu hình chính sách thử lại (retry) cho các yêu cầu HTTP.
# total=5: Tổng số lần thử lại tối đa là 5.
# backoff_factor=2: Thời gian chờ giữa các lần thử lại sẽ tăng theo cấp số nhân (ví dụ: 1s, 2s, 4s, 8s...).
# status_forcelist: Danh sách các mã trạng thái HTTP mà khi gặp phải sẽ thử lại.
retry = Retry(total=5, backoff_factor=2, status_forcelist=[429,500,502,503,504])
# Gắn bộ điều hợp HTTP (HTTPAdapter) vào session cho các URL bắt đầu bằng 'https://'.
# Bộ điều hợp này sẽ áp dụng chính sách thử lại đã cấu hình.
session.mount('https://', HTTPAdapter(max_retries=retry))

# Khởi tạo một danh sách rỗng để lưu trữ tất cả dữ liệu lấy được từ API.
all_data = []
# Khởi tạo biến số trang, bắt đầu từ trang 1.
page = 1
# Bắt đầu vòng lặp vô hạn để lấy dữ liệu từ API theo từng trang.
while True:
    # Gửi yêu cầu GET đến URL đã cho.
    # url: Địa chỉ API cần gọi.
    # headers: Thêm tiêu đề Authorization với token để xác thực.
    # params: Truyền các tham số truy vấn 'page' và 'per_page' (số lượng mục trên mỗi trang).
    # timeout: Đặt thời gian chờ cho yêu cầu (kết nối 5s, đọc dữ liệu 30s).
    # Đầu vào: url, TOKEN, page, per_page.
    # Đầu ra: Đối tượng phản hồi HTTP (r).
    r = session.get(url, headers={'Authorization': f'Bearer {TOKEN}'},
                    params={'page': page, 'per_page': 100}, timeout=(5, 30))
    # Kiểm tra mã trạng thái của phản hồi. Nếu là lỗi (ví dụ: 4xx hoặc 5xx), sẽ ném ra một ngoại lệ.
    r.raise_for_status()
    # Chuyển đổi nội dung phản hồi JSON thành một đối tượng Python (thường là dictionary).
    # Đầu vào: Phản hồi HTTP dạng JSON.
    # Đầu ra: Dictionary Python chứa dữ liệu.
    data = r.json()
    # Kiểm tra xem trường 'items' trong dữ liệu có rỗng không.
    # Nếu rỗng, nghĩa là không còn dữ liệu để lấy, thì thoát khỏi vòng lặp.
    if not data['items']: break
    # Thêm tất cả các mục (items) từ trang hiện tại vào danh sách 'all_data'.
    all_data.extend(data['items'])
    # Tăng số trang lên 1 để lấy dữ liệu của trang tiếp theo trong lần lặp kế tiếp.
    page += 1
# Kết quả mong đợi: Biến 'all_data' sẽ chứa tất cả dữ liệu từ API sau khi duyệt qua tất cả các trang.
\`\`\`

## 4. Database - chunked + parameterized
\`\`\`python
# Đọc dữ liệu từ cơ sở dữ liệu vào DataFrame của pandas.
# Đầu vào:
#   - Câu lệnh SQL để truy vấn dữ liệu.
#   - Đối tượng engine để kết nối đến cơ sở dữ liệu.
#   - Tham số cho câu lệnh SQL (start_date).
#   - Kích thước chunksize để đọc dữ liệu theo từng phần nhỏ, giúp tiết kiệm bộ nhớ.
# Đầu ra: Một DataFrame chứa dữ liệu từ bảng 'users' được lọc theo ngày tạo.
df = pd.read_sql(
    "SELECT * FROM users WHERE created_at > %s",
    engine, params=(start_date,), chunksize=10000
)
\`\`\`

## Large file strategies
- **Chunked reading**: \`chunksize=50000\`
- **Convert to Parquet**: 10× compression, 5-10× faster query
- **Polars/Dask**: out-of-core, 5-30× faster than Pandas

## Schema validation
\`\`\`python
# Nhập thư viện pandera, một công cụ để xác thực dữ liệu trong DataFrame.
import pandera as pa

# Định nghĩa một schema (khuôn mẫu) cho DataFrame.
# Schema này sẽ mô tả cấu trúc và các quy tắc cho từng cột trong DataFrame.
schema = pa.DataFrameSchema({
    # Định nghĩa cột "id":
    # - Kiểu dữ liệu phải là số nguyên (int).
    # - Giá trị trong cột này phải là duy nhất (unique=True), không được trùng lặp.
    "id": pa.Column(int, unique=True),
    # Định nghĩa cột "email":
    # - Kiểu dữ liệu phải là chuỗi (str).
    # - Thêm một kiểm tra (Check) để đảm bảo chuỗi email khớp với một biểu thức chính quy (regex).
    #   Biểu thức này kiểm tra định dạng email cơ bản (ví dụ: user@domain.com).
    "email": pa.Column(str, pa.Check.str_matches(r'^[\\\\w.+-]+@[\\\\w.-]+\\\\.\\\\w+\$')),
    # Định nghĩa cột "age":
    # - Kiểu dữ liệu phải là số nguyên (int).
    # - Thêm một kiểm tra (Check) để đảm bảo giá trị tuổi nằm trong khoảng từ 0 đến 120 (bao gồm cả 0 và 120).
    "age": pa.Column(int, pa.Check.in_range(0, 120)),
})

# Thực hiện xác thực DataFrame 'df' dựa trên schema đã định nghĩa.
# - 'df': DataFrame đầu vào cần được kiểm tra.
# - 'lazy=True': Nếu có lỗi, pandera sẽ thu thập tất cả các lỗi và báo cáo cùng lúc,
#   thay vì dừng lại ở lỗi đầu tiên.
# Kết quả trả về là một DataFrame đã được xác thực (df_validated).
# Nếu có bất kỳ dữ liệu nào không khớp với schema, một lỗi sẽ được ném ra.
df_validated = schema.validate(df, lazy=True)
\`\`\`

## Tools comparison
| Tool | Best for | Pricing |
|------|----------|---------|
| Custom Python | Edge cases | Dev time |
| Fivetran | SaaS connectors (300+) | $$$ per row |
| Airbyte (OSS) | Self-host | Free + infra |
| AWS DMS | DB CDC into AWS | $$ per hour |
| Debezium | OSS DB CDC into Kafka | Free + infra |

→ Rule: **buy SaaS connectors, build custom for edge cases**.

## Real-world cases

### Stripe - Webhook ingestion at scale
- 3B+ webhook events/month
- Stack: webhook → API Gateway → SQS → Lambda → S3 raw → Snowflake
- At-least-once delivery + idempotency key
- 7-year S3 raw retention (compliance)

### Shopify - Multi-source
- 50+ pipelines via Airflow + Fivetran + custom Python
- Confluent Schema Registry for streaming
- Cost alerts when source ingest >$1000/day

### GitHub - Hybrid webhook + REST
- Real-time via webhooks
- Historical backfill via REST + pagination
- Respect \`X-RateLimit-Remaining\`, exponential backoff on 429

## Best practices
1. Log metadata after each run (rows, cols, size, timestamp, version)
2. Idempotent loads (MERGE, not INSERT)
3. Incremental loading (by updated_at or CDC)
4. Error handling + dead-letter queue + PagerDuty alerts
5. Data lineage (source, timestamp, pipeline version)
6. Schema validation (Pandera, Great Expectations) fail-fast
7. Respect rate limits
8. Secrets management (AWS Secrets Manager, Vault)
9. Test on sample first

## Anti-patterns
- ❌ \`pd.read_csv(huge)\` without chunksize → OOM
- ❌ \`SELECT *\` without LIMIT
- ❌ No retry on 503
- ❌ Hardcoded API keys in Git
- ❌ No alerts on failure
- ❌ Non-idempotent → duplicates
- ❌ Ignoring rate limits → IP ban

## Pull vs Push
**Pull**: you query (REST, DB query) - simple, can lag
**Push**: source pushes (webhook, Kafka) - real-time, more complex

## Bridge to next
After successful extraction, the next lesson (**ETL Pipeline Design**) covers orchestrating the **full flow** from extract → transform → load with Airflow, idempotency, and monitoring.`,
        code: `# Nhập thư viện 'json' để làm việc với dữ liệu JSON.
import json
# Nhập thư viện 'csv' để làm việc với dữ liệu CSV.
import csv
# Nhập 'StringIO' từ thư viện 'io' để xử lý chuỗi như một file.
from io import StringIO

# Mô phỏng việc nạp dữ liệu từ CSV.
# Đây là một chuỗi nhiều dòng chứa dữ liệu CSV.
csv_data = """name,age,score
An,22,85
Binh,25,92
Chi,23,78"""

# Tạo một đối tượng DictReader từ chuỗi CSV.
# StringIO(csv_data) biến chuỗi thành một đối tượng giống file để csv.DictReader có thể đọc.
# DictReader đọc mỗi hàng thành một từ điển (dictionary), với khóa là tên cột.
reader = csv.DictReader(StringIO(csv_data))
# Chuyển đổi đối tượng reader thành một danh sách các từ điển.
# Mỗi từ điển đại diện cho một hàng trong CSV.
csv_rows = list(reader)
# In ra số lượng hàng đã được nạp từ CSV.
# Đầu ra: Số lượng hàng đã nạp.
print(f"📄 CSV: {len(csv_rows)} rows loaded")
# Lặp qua từng hàng trong danh sách csv_rows và in ra nội dung của mỗi hàng.
# Đầu ra: Từng hàng dữ liệu CSV dưới dạng từ điển.
for row in csv_rows:
    print(f"  {row}")

# Mô phỏng việc nạp dữ liệu từ JSON.
# Đây là một chuỗi JSON chứa một danh sách các đối tượng.
json_data = '[{"name":"Dung","age":28,"score":95},{"name":"Em","age":21,"score":88}]'
# Phân tích chuỗi JSON thành một đối tượng Python (danh sách các từ điển).
# Đầu vào: Chuỗi JSON.
# Đầu ra: Danh sách các từ điển Python.
json_rows = json.loads(json_data)
# In ra số lượng bản ghi đã được nạp từ JSON.
# Đầu ra: Số lượng bản ghi JSON đã nạp.
print(f"\\\\n📋 JSON: {len(json_rows)} records loaded")
# Lặp qua từng bản ghi trong danh sách json_rows và in ra nội dung của mỗi bản ghi.
# Đầu ra: Từng bản ghi dữ liệu JSON dưới dạng từ điển.
for row in json_rows:
    print(f"  {row}")

# Định nghĩa hàm để kiểm tra tính hợp lệ của lược đồ dữ liệu.
# Hàm này kiểm tra xem các trường bắt buộc có tồn tại không và kiểu dữ liệu có đúng không.
# Đầu vào:
#   - data: Danh sách các từ điển (mỗi từ điển là một hàng/bản ghi).
#   - required_fields: Danh sách các tên trường bắt buộc phải có.
#   - field_types: Một từ điển ánh xạ tên trường với kiểu dữ liệu mong đợi (ví dụ: {'age': int}).
# Đầu ra:
#   - errors: Một danh sách các chuỗi mô tả lỗi tìm thấy.
def validate_schema(data, required_fields, field_types):
    # Khởi tạo một danh sách rỗng để lưu trữ các lỗi tìm thấy.
    errors = []
    # Lặp qua từng hàng dữ liệu cùng với chỉ số của nó.
    for i, row in enumerate(data):
        # Kiểm tra các trường bắt buộc.
        for field in required_fields:
            # Nếu trường bắt buộc không có trong hàng hiện tại, thêm lỗi vào danh sách.
            if field not in row:
                errors.append(f"Row {i}: missing '{field}'")
        # Kiểm tra kiểu dữ liệu của các trường.
        for field, expected_type in field_types.items():
            # Nếu trường tồn tại trong hàng, tiến hành kiểm tra kiểu.
            if field in row:
                try:
                    # Cố gắng chuyển đổi giá trị của trường sang kiểu dữ liệu mong đợi.
                    # Nếu thành công, kiểu dữ liệu là đúng.
                    expected_type(row[field])
                except (ValueError, TypeError):
                    # Nếu xảy ra lỗi ValueError hoặc TypeError trong quá trình chuyển đổi,
                    # nghĩa là kiểu dữ liệu không đúng. Thêm lỗi vào danh sách.
                    errors.append(f"Row {i}: '{field}' is not {expected_type.__name__}")
    # Trả về danh sách các lỗi đã tìm thấy.
    return errors

# Gọi hàm validate_schema để kiểm tra dữ liệu CSV.
# Kiểm tra xem 'name' và 'age' có phải là trường bắt buộc không.
# Kiểm tra xem 'age' và 'score' có phải là kiểu số nguyên không.
# Đầu vào: csv_rows, ['name', 'age'], {'age': int, 'score': int}
# Đầu ra: Danh sách các lỗi (nếu có).
errors = validate_schema(csv_rows, ['name', 'age'], {'age': int, 'score': int})
# In ra kết quả kiểm tra lược đồ.
# Nếu danh sách lỗi rỗng, in ra "Schema valid!". Ngược lại, in ra số lượng lỗi.
# Đầu ra: Thông báo về số lượng lỗi hoặc xác nhận lược đồ hợp lệ.
print(f"\\\\n✅ Validation: {len(errors)} errors" if errors else "\\\\n✅ Schema valid!")`,
        codeLanguage: "python",
        exercise: "Build a DataIngester class that reads CSV and JSON, auto-detects schema and reports quality.",
        exerciseEn: "Build a DataIngester class that reads CSV and JSON, auto-detects schema and reports quality.",
        quiz: [
          { question: "What is incremental loading?", options: ["Loading all data every time", "Only loading new or changed data since the last run", "Loading data randomly", "Loading data in parallel"], answer: 1, explanation: "Incremental loading only ingests new or modified records, saving time and compute resources." },
          { question: "Why use chunksize when reading large CSVs?", options: ["It makes reading faster", "It prevents running out of memory by processing in smaller pieces", "It's required for CSV files", "It improves data quality"], answer: 1, explanation: "chunksize reads the file in manageable pieces instead of loading millions of rows into memory at once." },
          { question: "What does pd.json_normalize do?", options: ["Validates JSON", "Flattens nested JSON structures into a flat DataFrame", "Converts DataFrame to JSON", "Normalizes numeric values"], answer: 1, explanation: "json_normalize takes nested JSON (common from APIs) and flattens it into a tabular DataFrame format." },
          { question: "What is data lineage?", options: ["Data type information", "Tracking where each record came from and how it was transformed", "The age of the data", "Data backup history"], answer: 1, explanation: "Data lineage records the origin, transformations, and movement of data through your pipeline - essential for debugging and compliance." },
          { question: "Why should data loads be idempotent?", options: ["For faster performance", "So re-running the same load doesn't create duplicates", "It's not important", "For security"], answer: 1, explanation: "Idempotent loads produce the same result regardless of how many times they run - critical for reliable pipelines that may need to retry." }
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
    description: "Extract, Transform, Load - pipeline design",
    descriptionEn: "Extract, Transform, Load - pipeline design",
    course: "data-eng",
    lessons: [
      {
        id: "de-etl-1", title: "ETL vs ELT", titleEn: "ETL vs ELT",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn đi siêu thị (Source) → mua đồ về (Extract) → rửa rau, thái thịt (Transform) → cho vào tủ lạnh (Load). Đó chính là **ETL**. Còn **ELT**? Mua đồ về tống thẳng tủ lạnh, lúc nấu mới sơ chế.

> 💡 **Mẹo:** ETL = sơ chế trước; ELT = sơ chế sau. Cloud warehouse mạnh (BigQuery, Snowflake) nên xu hướng giờ là ELT.

## 2. 💡 Khái niệm chính

- **Extract**: lấy data từ nguồn (DB, API, file).
- **Transform**: làm sạch, chuẩn hóa, join, aggregate.
- **Load**: nạp vào kho đích (warehouse, data lake).

| | ETL | ELT |
|---|---|---|
| Transform | Trước Load | Sau Load |
| Tool | Python, Spark | SQL trong warehouse |
| Phù hợp | DB on-premise | Cloud warehouse |

## 3. 🧰 Pipeline mẫu

\`\`\`python
# Extract
df = pd.read_sql("SELECT * FROM orders", src_conn)
# Transform
df["total"] = df["price"] * df["qty"]
df = df.dropna(subset=["customer_id"])
# Load
df.to_sql("orders_clean", dest_conn, if_exists="replace")
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Pipeline sales: đọc CSV → tính doanh thu/ngày → ghi Parquet.

\`\`\`python
df = pd.read_csv("raw_sales.csv")
daily = df.groupby("date")["amount"].sum().reset_index()
daily.to_parquet("daily_sales.parquet")
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Transform xong mà không lưu bước trung gian → pipeline fail là phải chạy lại từ đầu, mất hàng giờ.

## 6. ✅ Best practice

> 💡 **Mẹo:** Idempotent - chạy pipeline 2 lần phải ra kết quả y hệt. Dùng \`if_exists="replace"\` hoặc upsert thay vì \`append\`.

## 7. 🤔 Khi nào dùng

- ✅ ETL: data cần làm sạch nhiều, warehouse yếu.
- ✅ ELT: cloud warehouse mạnh (Snowflake, BigQuery), dev nhanh bằng SQL.

## 8. 📌 Tóm tắt 30 giây

ETL = Extract → Transform → Load. ELT đảo Transform xuống cuối, tận dụng cloud. Pipeline phải idempotent, có log, có checkpoint trung gian.
`,
        theoryEn: `**ETL** and **ELT** are the two fundamental patterns for moving data from operational sources to analytical destinations. Choosing wrong can burn cloud budget or make pipelines 10× slower.

## Why this matters
Every data-driven company needs reliable pipelines from operational systems (Postgres, MongoDB, Salesforce, Stripe) to analytical stores (BigQuery, Snowflake, Redshift). Volumes range from MB/day (startups) to petabytes/hour (Netflix, Uber). The pattern decides:
- **Compute cost** (transform location = bill location)
- **Time to insight**
- **Reprocessing capability** when logic is wrong

## ETL - Transform before Load
\`\`\`
[Source] → [Extract] → [Staging server] → [Transform: Python/Spark] → [Load] → [Warehouse]
\`\`\`
- Separate transform server (EC2, Spark cluster, on-prem)
- Warehouse holds clean, aggregated data only
- Fixed infra cost
- Hard to reprocess (no raw kept)

**Use ETL when:** on-prem warehouse, GDPR-style PII masking required before storage, small stable schema, need clean data as single source.

## ELT - Load raw, then transform
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
- DB CDC (Debezium, AWS DMS) - read binlog for real-time INSERT/UPDATE/DELETE
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

### Netflix - ELT on S3 + Spark + Iceberg
- 3+ PB/day event data from 250M users
- Stack: Kafka → S3 raw (parquet) → Spark → Iceberg → Druid
- Why ELT: reprocess for recommendation logic changes; raw kept 18 months
- Spot instances for Spark = 70% savings

### Stripe - ETL with Python + Postgres
- Financial data needs PII masking before analytics DB (PCI-DSS)
- Python + Airflow: extract from prod Postgres → mask card numbers → load
- Chose ETL because compliance > flexibility

### Airbnb - Hybrid
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
After understanding the ETL/ELT architecture, the next lesson (**Data Modeling**) covers HOW to organize tables in the warehouse: Star Schema, Snowflake, fact vs dimension - the foundation of fast queries.`,
        code: `# Nhập thư viện JSON để làm việc với dữ liệu JSON (nếu cần, ở đây không dùng trực tiếp nhưng thường đi kèm ETL).
import json
# Nhập lớp datetime từ module datetime để làm việc với thời gian, dùng để ghi log.
from datetime import datetime

# Định nghĩa một lớp (class) tên là ETLPipeline.
# Lớp này sẽ đại diện cho một quy trình ETL (Extract, Transform, Load - Trích xuất, Biến đổi, Tải).
class ETLPipeline:
    # Phương thức khởi tạo (constructor) của lớp.
    # Được gọi khi tạo một đối tượng mới từ lớp ETLPipeline.
    # Đầu vào: self (đối tượng hiện tại), name (tên của pipeline).
    def __init__(self, name):
        # Gán tên cho pipeline.
        self.name = name
        # Khởi tạo một danh sách rỗng để lưu trữ các bản ghi log của pipeline.
        self.log = []

    # Phương thức nội bộ (private method, theo quy ước) để ghi log.
    # Đầu vào: self, step (bước hiện tại của pipeline), msg (thông điệp log).
    # Đầu ra: Không trả về giá trị, chỉ ghi log vào self.log và in ra console.
    def _log(self, step, msg):
        # Tạo một bản ghi log dưới dạng từ điển.
        # Bao gồm thời gian hiện tại, bước và thông điệp.
        entry = {"time": datetime.now().strftime("%H:%M:%S"), "step": step, "msg": msg}
        # Thêm bản ghi log vào danh sách log của đối tượng.
        self.log.append(entry)
        # In bản ghi log ra màn hình console để dễ theo dõi.
        print(f"  [{entry['time']}] {step}: {msg}")

    # Phương thức Extract (Trích xuất) dữ liệu.
    # Trong ví dụ này, nó chỉ đơn giản trả về dữ liệu nguồn đã nhận.
    # Đầu vào: self, source (dữ liệu nguồn).
    # Đầu ra: Dữ liệu nguồn đã nhận.
    def extract(self, source):
        # Ghi log cho bước EXTRACT, thông báo số lượng bản ghi được đọc.
        self._log("EXTRACT", f"Reading {len(source)} records")
        # Trả về dữ liệu nguồn.
        return source

    # Phương thức Transform (Biến đổi) dữ liệu.
    # Áp dụng một loạt các phép biến đổi lên dữ liệu.
    # Đầu vào: self, data (dữ liệu cần biến đổi), transformations (danh sách các phép biến đổi).
    # Đầu ra: Dữ liệu đã được biến đổi.
    def transform(self, data, transformations):
        # Ghi log cho bước TRANSFORM, thông báo số lượng phép biến đổi sẽ được áp dụng.
        self._log("TRANSFORM", f"Applying {len(transformations)} transformations")
        # Tạo một bản sao của dữ liệu gốc để tránh làm thay đổi dữ liệu ban đầu.
        result = data.copy()
        # Lặp qua từng phép biến đổi trong danh sách.
        # Mỗi phép biến đổi là một cặp (tên, hàm).
        for name, fn in transformations:
            # Áp dụng hàm biến đổi (fn) cho từng hàng (row) trong dữ liệu.
            # Sử dụng list comprehension để tạo danh sách mới đã biến đổi.
            result = [fn(row) for row in result]
            # Ghi log sau khi áp dụng xong một phép biến đổi cụ thể.
            self._log("TRANSFORM", f"  ✓ {name}: {len(result)} records")
        # Trả về dữ liệu đã được biến đổi.
        return result

    # Phương thức Load (Tải) dữ liệu.
    # Trong ví dụ này, nó mô phỏng việc tải dữ liệu đến một đích nào đó.
    # Đầu vào: self, data (dữ liệu cần tải), destination (đích đến).
    # Đầu ra: Một từ điển chứa thông tin về số lượng bản ghi và đích đến.
    def load(self, data, destination):
        # Ghi log cho bước LOAD, thông báo số lượng bản ghi và đích đến.
        self._log("LOAD", f"Writing {len(data)} records to {destination}")
        # Trả về một từ điển mô tả kết quả của quá trình tải.
        return {"records": len(data), "destination": destination}

    # Phương thức chính để chạy toàn bộ pipeline ETL.
    # Đầu vào: self, source (dữ liệu nguồn), transformations (các phép biến đổi), destination (đích đến).
    # Đầu ra: Kết quả của bước tải dữ liệu.
    def run(self, source, transformations, destination):
        # In tiêu đề cho pipeline.
        print(f"🔄 Pipeline: {self.name}")
        # In một đường kẻ để phân tách trực quan.
        print("=" * 50)
        # Gọi phương thức extract để trích xuất dữ liệu.
        # Đầu vào: source_data.
        # Đầu ra: raw (dữ liệu thô).
        raw = self.extract(source)
        # Gọi phương thức transform để biến đổi dữ liệu.
        # Đầu vào: raw, transforms.
        # Đầu ra: transformed (dữ liệu đã biến đổi).
        transformed = self.transform(raw, transformations)
        # Gọi phương thức load để tải dữ liệu.
        # Đầu vào: transformed, "data_warehouse.students".
        # Đầu ra: result (kết quả tải).
        result = self.load(transformed, destination)
        # Ghi log khi pipeline hoàn thành, bao gồm kết quả cuối cùng.
        self._log("DONE", f"Pipeline complete! {result}")
        # Trả về kết quả của bước tải.
        return result

# --- Phần chạy pipeline ---

# Dữ liệu nguồn ban đầu, là một danh sách các từ điển.
# Mỗi từ điển đại diện cho thông tin của một sinh viên.
source_data = [
    {"name": "an", "age": "22", "score": "85"},
    {"name": "binh", "age": "25", "score": "92"},
    {"name": "", "age": "23", "score": "78"},
]

# Định nghĩa các phép biến đổi sẽ được áp dụng.
# Mỗi phép biến đổi là một tuple gồm (tên_biến_đổi, hàm_lambda).
transforms = [
    # Biến đổi 1: Viết hoa chữ cái đầu của tên và xử lý tên rỗng.
    # Đầu vào: r (một hàng dữ liệu).
    # Đầu ra: Từ điển mới với tên đã được xử lý (ví dụ: "an" -> "An", "" -> "Unknown").
    ("Capitalize names", lambda r: {**r, "name": r["name"].title() if r["name"] else "Unknown"}),
    # Biến đổi 2: Chuyển đổi kiểu dữ liệu của 'age' và 'score' từ chuỗi sang số nguyên.
    # Đầu vào: r (một hàng dữ liệu).
    # Đầu ra: Từ điển mới với 'age' và 'score' là số nguyên.
    ("Cast types", lambda r: {**r, "age": int(r["age"]), "score": int(r["score"])}),
    # Biến đổi 3: Thêm trường 'grade' dựa trên điểm số.
    # Đầu vào: r (một hàng dữ liệu).
    # Đầu ra: Từ điển mới có thêm trường 'grade' (A, B, hoặc C).
    ("Add grade", lambda r: {**r, "grade": "A" if r["score"] >= 90 else "B" if r["score"] >= 80 else "C"}),
]

# Tạo một đối tượng ETLPipeline mới với tên "Student Scores".
pipeline = ETLPipeline("Student Scores")
# Chạy pipeline với dữ liệu nguồn, các phép biến đổi và đích đến đã định nghĩa.
# Đầu vào: source_data, transforms, "data_warehouse.students".
# Đầu ra: Kết quả của bước load, ví dụ: {'records': 3, 'destination': 'data_warehouse.students'}.
pipeline.run(source_data, transforms, "data_warehouse.students")
# Kết quả mong đợi in ra console sẽ là các dòng log của từng bước và kết quả cuối cùng của pipeline.
# Ví dụ:
# 🔄 Pipeline: Student Scores
# ==================================================
#   [HH:MM:SS] EXTRACT: Reading 3 records
#   [HH:MM:SS] TRANSFORM: Applying 3 transformations
#   [HH:MM:SS] TRANSFORM:   ✓ Capitalize names: 3 records
#   [HH:MM:SS] TRANSFORM:   ✓ Cast types: 3 records
#   [HH:MM:SS] TRANSFORM:   ✓ Add grade: 3 records
#   [HH:MM:SS] LOAD: Writing 3 records to data_warehouse.students
#   [HH:MM:SS] DONE: Pipeline complete! {'records': 3, 'destination': 'data_warehouse.students'}`,
        codeLanguage: "python",
        exercise: "Extend ETLPipeline: add error handling, retry logic, and data quality report.",
        exerciseEn: "Extend ETLPipeline: add error handling, retry logic, and data quality report.",
        quiz: [
          { question: "How does ELT differ from ETL?", options: ["They are the same", "ELT transforms inside the warehouse after loading raw data", "ETL is faster", "ELT doesn't need transformation"], answer: 1, explanation: "ELT loads raw data first, then uses the warehouse's compute power to transform. ETL transforms before loading." },
          { question: "What is an Upsert loading strategy?", options: ["Delete everything and reload", "Insert new rows and update existing ones", "Only insert, never update", "Create a new table each time"], answer: 1, explanation: "Upsert (merge) inserts new records and updates existing ones based on a key, handling both new and changed data." },
          { question: "What is CDC (Change Data Capture)?", options: ["A data format", "A technique to detect and capture only changed data from sources", "A type of database", "A scheduling tool"], answer: 1, explanation: "CDC captures only the changes (inserts, updates, deletes) from source systems, enabling efficient incremental data pipelines." },
          { question: "When should you use dbt instead of custom Python ETL?", options: ["For data extraction", "For SQL-based transformations inside a cloud warehouse (ELT pattern)", "For streaming data", "For file processing"], answer: 1, explanation: "dbt is designed for the T in ELT - it transforms data inside the warehouse using SQL, with built-in testing and documentation." },
          { question: "What is schema drift?", options: ["When tables move to a different database", "When source data columns are added, removed, or change types unexpectedly", "When queries become slower", "A type of data loss"], answer: 1, explanation: "Schema drift occurs when the structure of source data changes without notice - a common cause of pipeline failures." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn quản lý kho sách: nếu nhồi tất cả thông tin (sách + tác giả + nhà xuất bản + người mượn) vào 1 bảng khổng lồ → tìm sách nào của tác giả X phải lục cả ngàn dòng. Phải **chia bảng theo nghiệp vụ** - đó là **Data Modeling**.

> 💡 **Mẹo:** Star schema = bảng Fact ở giữa (sự kiện), các bảng Dimension xung quanh (mô tả) - như ngôi sao 5 cánh.

## 2. 💡 Khái niệm chính

- **Fact table**: chứa số liệu (doanh thu, số đơn) + foreign key.
- **Dimension table**: mô tả (khách hàng, sản phẩm, thời gian).
- **Star schema**: dimension nối thẳng vào fact (đơn giản, nhanh).
- **Snowflake schema**: dimension lại chia nhỏ (tiết kiệm RAM, query phức tạp hơn).

## 3. 🧰 Ví dụ Star Schema

\`\`\`
        dim_customer
              |
dim_date - fact_sales - dim_product
              |
        dim_store
\`\`\`

\`fact_sales(date_id, product_id, customer_id, store_id, amount, qty)\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
-- Chọn các cột cần hiển thị: năm, danh mục sản phẩm và tổng doanh thu.
SELECT d.year, p.category, SUM(f.amount) AS revenue
-- Từ bảng dữ liệu thực tế về doanh số bán hàng (fact_sales), đặt tên tắt là 'f'.
FROM fact_sales f
-- Kết nối bảng doanh số với bảng chiều thời gian (dim_date) để lấy thông tin về năm.
-- Điều kiện kết nối là ID ngày trong bảng doanh số phải khớp với ID trong bảng thời gian.
JOIN dim_date d ON f.date_id = d.id
-- Kết nối bảng doanh số với bảng chiều sản phẩm (dim_product) để lấy thông tin về danh mục sản phẩm.
-- Điều kiện kết nối là ID sản phẩm trong bảng doanh số phải khớp với ID trong bảng sản phẩm.
JOIN dim_product p ON f.product_id = p.id
-- Nhóm các hàng lại với nhau dựa trên năm và danh mục sản phẩm.
-- Điều này giúp tính tổng doanh thu cho từng sự kết hợp năm và danh mục.
GROUP BY d.year, p.category;
-- Kết quả mong đợi: Một bảng hiển thị tổng doanh thu cho mỗi danh mục sản phẩm trong từng năm.
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Đừng nhồi text dài (mô tả 500 chữ) vào fact table - sẽ phình lên hàng GB và query chậm.

## 6. ✅ Best practice

> 💡 **Mẹo:** Star schema cho 90% case BI dashboard. Snowflake chỉ khi dimension cực to và lặp nhiều.

## 7. 🤔 Khi nào dùng

- ✅ Data warehouse, BI report.
- ❌ OLTP (giao dịch real-time) → dùng 3NF.

## 8. 📌 Tóm tắt 30 giây

Fact = số liệu + FK. Dimension = mô tả. Star = đơn giản, nhanh. Snowflake = chuẩn hóa sâu, tiết kiệm RAM. Chọn Star cho BI.
`,
        theoryEn: `**Dimensional Modeling**, pioneered by Ralph Kimball, organizes warehouses into **facts** (measurable events) and **dimensions** (descriptive context). Almost every BI tool is optimized for it.

## Why this matters in production

Bad models cause slow dashboards, metric disagreements, and engineer bottlenecks. Good models let non-technical users self-serve. Spotify and Airbnb have both publicly credited dimensional modeling for scaling their analytics teams.

## Fact tables - the "what"

One row = one event (a sale, a page view). Contains quantitative measures + foreign keys to dimensions. Three additivity types:

| Type | Summable across | Example |
|---|---|---|
| Additive | All dimensions | revenue |
| Semi-additive | Some | account balance |
| Non-additive | None | conversion rate |

## Dimension tables - the "context"

Wide and denormalized. Contain who/what/where/when. Common: \`dim_date\`, \`dim_customer\`, \`dim_product\`. Pre-populate \`dim_date\` so you never compute calendar attributes in queries.

## Star vs Snowflake

| Aspect | Star | Snowflake |
|---|---|---|
| Speed | Faster | Slower |
| Storage | More | Less |
| BI friendliness | Excellent | Often poor |
| Default? | **Yes** | Only when storage is critical |

>90% of modern warehouses ship star schemas - storage is cheap, engineer time is not.

## Slowly Changing Dimensions (SCD)

How dimension changes are tracked:

- **Type 0** never changes (birthdate).
- **Type 1** overwrites (typo fix).
- **Type 2** adds a new row with \`valid_from / valid_to / is_current\` - full history, most common.
- **Type 3** adds a "previous value" column.

## Case study - Airbnb Minerva

Airbnb's Minerva metrics layer is a governed star schema serving ~3,000 metrics from a few hundred tables. Before it, every team had its own "active host" definition; after it, one SQL definition powered every dashboard.

## Case study - a fintech failure

A fintech mixed transactions, refunds, and chargebacks in one fact table with inconsistent grain. A naive sum reported $40M of phantom revenue. Fix: split into three fact tables, one consistent grain each.

## Best practices

Declare the grain first; use surrogate keys; conform shared dimensions; thin tall facts, wide short dimensions; document additivity.

## Anti-patterns & next lesson

Avoid god-fact-tables, storing ratios in facts, and using natural keys as primary keys. Next: **Data Warehousing & OLAP** - how Snowflake/BigQuery physically store these models.`,
        code: `# Thiết kế Star Schema
# In tiêu đề minh họa cho ví dụ
print("⭐ Star Schema: E-Commerce")
print("=" * 50)

# Định nghĩa cấu trúc schema: bảng fact và các dimension
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

# Duyệt từng bảng trong schema để in thông tin
for table, info in schema.items():
    icon = "📊" if info["type"] == "FACT" else "📋"
    print(f"\\\\n{icon} {table} ({info['type']})")
    # Duyệt các cột để đánh dấu khóa và metric
    for col in info["columns"]:
        marker = "🔑" if col.endswith("_key") or col.endswith("_id") else "  "
        is_metric = "📈" if info.get("metrics") and col in info["metrics"] else "  "
        print(f"  {marker}{is_metric} {col}")

# In tiêu đề truy vấn mẫu
print("\\\\n🔍 Sample Query: Monthly revenue by category")
# Chuỗi SQL ví dụ: truy vấn doanh thu theo tháng và theo category
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
          { question: "What is a semi-additive fact?", options: ["A fact that can be summed across all dimensions", "A fact that can be summed across some dimensions but not all", "A fact that cannot be summed", "A fact with missing values"], answer: 1, explanation: "Semi-additive facts (like account balance) can be summed across some dimensions (accounts) but not others (time - you'd average instead)." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Database app (OLTP) như sổ thu chi của shop: ghi liên tục, hỏi "đơn này bao nhiêu". Còn **Data Warehouse** (OLAP) như báo cáo cuối năm của giám đốc: hỏi "doanh thu 5 năm theo vùng miền". Hai loại - hai mục tiêu khác nhau.

> 💡 **Mẹo:** OLTP tối ưu **ghi nhanh**, OLAP tối ưu **đọc nhanh trên triệu dòng**. Lẫn lộn là toang.

## 2. 💡 Khái niệm chính

| | OLTP | OLAP (Warehouse) |
|---|---|---|
| Mục đích | Giao dịch | Phân tích |
| Workload | INSERT/UPDATE | SELECT lớn, GROUP BY |
| Schema | 3NF chuẩn hóa | Star/Snowflake |
| Kích thước | GB | TB–PB |
| Tool | MySQL, PostgreSQL | BigQuery, Snowflake, Redshift |

## 3. 🧰 Kiến trúc tiêu biểu

\`\`\`
[Source DB] → [ETL] → [Data Warehouse] → [BI Dashboard]
                          ↓
                   [Data Mart phòng ban]
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Query OLAP điển hình trên BigQuery:

\`\`\`sql
-- Chọn vùng, trích năm từ date và tính tổng doanh thu
SELECT region, EXTRACT(YEAR FROM date) AS yr, SUM(revenue)
-- Bảng nguồn chứa dữ liệu bán hàng
FROM warehouse.fact_sales
-- Lọc chỉ lấy từ ngày 2020-01-01 trở về sau
WHERE date >= '2020-01-01'
-- Nhóm theo vùng và năm để tính tổng cho mỗi nhóm
GROUP BY region, yr
-- Sắp xếp kết quả theo năm (tăng dần)
ORDER BY yr;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Đừng chạy báo cáo BI trực tiếp lên DB production - sẽ làm app khách hàng lag chết. Phải tách warehouse riêng.

## 6. ✅ Best practice

> 💡 **Mẹo:** Cloud warehouse tính tiền theo dữ liệu quét. Luôn \`SELECT cột cần thiết\` thay vì \`SELECT *\` - tiết kiệm $$$.

## 7. 🤔 Khi nào dùng

- ✅ Báo cáo, BI, ML training data.
- ❌ App giao dịch real-time → dùng OLTP.

## 8. 📌 Tóm tắt 30 giây

OLTP ghi, OLAP đọc. Warehouse = nơi tổng hợp data từ nhiều nguồn để phân tích. Cloud (BigQuery/Snowflake) tính tiền theo data quét → tối ưu query.
`,
        theoryEn: `A **data warehouse** is engineered for analytical queries: large scans, aggregations, joins across billions of rows. Different beast from OLTP databases.

## Why this matters

OLTP can't handle analytical workloads without locking your app. Warehouses exist to keep analytics fast and isolated from transactions.

## OLTP vs OLAP

| Aspect | OLTP | OLAP |
|---|---|---|
| Purpose | Run business | Analyze business |
| Workload | Many small writes | Few large reads |
| Storage | Row-oriented | **Column-oriented** |
| Schema | Normalized | Star schema |

OLTP finds one needle; OLAP measures the whole haystack.

## Columnar storage

Stores all values of one column together → queries reading few columns scan tiny fractions of the data + compress 10×. This is why Snowflake scans 10 TB in 30 seconds.

## Cloud architecture: separated storage & compute

Storage on cheap S3/GCS; ephemeral compute clusters spin up on demand. Enables auto-scaling, zero-copy clones, multi-cluster isolation.

## Big four comparison

| Warehouse | Pricing | Strength | Watch-out |
|---|---|---|---|
| Snowflake | Per-second | UX, sharing | Cost explosion |
| BigQuery | Per-TB scanned | Serverless | \`SELECT *\` = $$$ |
| Redshift | Provisioned | AWS native | Manual sizing |
| Databricks | Per-DBU | Lakehouse + ML | Complex pricing |

## Case study - Capital One

Migrated from on-prem Teradata to Snowflake. Won on elasticity, not speed. Cut infra ~40% while throughput grew.

## Case study - $700 SELECT *

A junior at a startup ran \`SELECT *\` on a 70 TB BigQuery table - twice. $700 bill. Mature teams enforce partition filters and per-user quotas.

## Best practices

Partition by date; cluster on common filter columns; use materialized views for top recurring queries; isolate workloads; set budget alerts in week one.

## Anti-patterns & next lesson

Avoid unpartitioned scans, OLTP-style point lookups, shared warehouses for ML + dashboards. Next: **Batch vs Streaming** - how fresh does the data need to be?`,
        code: `# Mô phỏng các phép toán OLAP
import numpy as np
# Khởi tạo cấu trúc dữ liệu và danh sách mẫu
sales_data = []
products = ["Laptop", "Phone", "Tablet"]
regions = ["North", "South", "East"]
quarters = ["Q1", "Q2", "Q3", "Q4"]

# Đặt seed để kết quả ngẫu nhiên lặp lại
np.random.seed(42)
# Tạo dữ liệu bán hàng ngẫu nhiên cho mỗi product-region-quarter
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

# Tổng hợp (Roll-up): Quý → Năm
print("\\\\n📊 ROLL-UP (Quarter → Annual)")
annual = {}
# Gom doanh thu theo product và region
for s in sales_data:
    key = (s["product"], s["region"])
    annual[key] = annual.get(key, 0) + s["revenue"]
# In kết quả tổng hợp đã sắp xếp
for (p, r), rev in sorted(annual.items()):
    print(f"  {p:>8} | {r:>6} | \${rev:>8,}")

# Phân tích chi tiết (Drill-down) theo sản phẩm
print("\\\\n🔍 DRILL-DOWN (Product: Laptop by quarter)")
# Duyệt từng bản ghi để tìm Laptop ở vùng North
for s in sales_data:
    # Chỉ in bản ghi của Laptop ở region North
    if s["product"] == "Laptop" and s["region"] == "North":
        print(f"  {s['quarter']}: \${s['revenue']:,} ({s['units']} units)")

# Cắt lát (Slice): chỉ Q1
print("\\\\n🔪 SLICE (Only Q1)")
# Lọc các bản ghi thuộc Q1
q1 = [s for s in sales_data if s["quarter"] == "Q1"]
# In dữ liệu của Q1
for s in q1:
    print(f"  {s['product']:>8} | {s['region']:>6} | \${s['revenue']:>8,}")`,
        codeLanguage: "python",
        exercise: "Implement PIVOT: transform data from long format (rows) to wide format (columns).",
        exerciseEn: "Implement PIVOT: transform data from long format (rows) to wide format (columns).",
        quiz: [
          { question: "When is columnar storage faster than row-based?", options: ["For INSERT operations", "For SELECT * (all columns)", "For aggregations on a few columns (SUM, AVG)", "For UPDATE operations"], answer: 2, explanation: "Columnar storage only reads the columns needed for the query, making aggregations on a few columns much faster." },
          { question: "What does table partitioning do?", options: ["Creates backup copies", "Splits a table into smaller pieces so queries only scan relevant data", "Encrypts data", "Compresses data"], answer: 1, explanation: "Partitioning divides a table (usually by date) so that queries with partition filters only scan the relevant subset." },
          { question: "What makes Snowflake unique compared to BigQuery?", options: ["It's open source", "It separates compute and storage, supports multi-cloud, and offers data sharing", "It's faster", "It's free"], answer: 1, explanation: "Snowflake's key differentiators: separate compute/storage scaling, multi-cloud support, Time Travel, and cross-org data sharing." },
          { question: "What is the OLAP 'drill-down' operation?", options: ["Aggregating to a higher level", "Going from summary to detail (year → month → day)", "Filtering one dimension", "Rotating axes"], answer: 1, explanation: "Drill-down moves from summary to detail - e.g., clicking on a year total to see monthly breakdowns." },
          { question: "Why is BigQuery called 'serverless'?", options: ["It doesn't use servers", "Users don't manage infrastructure - Google handles scaling and maintenance", "It runs on the client", "It uses edge computing"], answer: 1, explanation: "Serverless means you don't provision, manage, or scale servers. Google handles all infrastructure; you just run queries." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

**Batch**: 12h đêm chạy báo cáo doanh thu cả ngày - như thợ in báo, sáng mai mới có. **Streaming**: phát hiện gian lận thẻ ngay khi quẹt - như cảnh sát giao thông quan sát từng xe real-time.

> 💡 **Mẹo:** Cần "biết ngay trong giây" → streaming. Cần "biết sau vài giờ cũng OK" → batch (rẻ hơn 10 lần).

## 2. 💡 Khái niệm chính

| | Batch | Streaming |
|---|---|---|
| Latency | Phút–giờ | ms–giây |
| Data | File lớn | Event nhỏ liên tục |
| Tool | Spark, Airflow | Kafka, Flink, Spark Streaming |
| Use case | Báo cáo, ML training | Fraud detection, IoT |

## 3. 🧰 Stream pipeline mẫu

\`\`\`
[App/Sensor] → [Kafka topic] → [Flink processor] → [DB/Alert]
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Producer Kafka đẩy event:

\`\`\`python
# Nhập lớp KafkaProducer từ thư viện kafka để gửi tin nhắn.
from kafka import KafkaProducer
# Nhập thư viện json để làm việc với dữ liệu JSON.
import json

# Khởi tạo một đối tượng KafkaProducer.
# bootstrap_servers: Địa chỉ của Kafka broker (máy chủ Kafka).
# value_serializer: Một hàm để chuyển đổi giá trị tin nhắn thành bytes trước khi gửi.
# Ở đây, chúng ta chuyển đổi đối tượng Python thành chuỗi JSON, sau đó mã hóa thành bytes.
p = KafkaProducer(bootstrap_servers="localhost:9092",
                  value_serializer=lambda v: json.dumps(v).encode())

# Gửi một tin nhắn đến chủ đề (topic) có tên "orders".
# Tin nhắn là một dictionary Python, sẽ được chuyển đổi thành JSON và gửi đi.
# Đầu vào: "orders" (tên topic), {"order_id": 1, "amount": 100} (dữ liệu tin nhắn).
# Đầu ra: Tin nhắn được gửi thành công đến Kafka.
p.send("orders", {"order_id": 1, "amount": 100})
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Streaming cần xử lý **late events** (event đến trễ) và **out-of-order**. Nếu bỏ qua, kết quả aggregation sẽ sai lệch.

## 6. ✅ Best practice

> 💡 **Mẹo:** Lambda architecture: chạy song song batch (chính xác) + streaming (nhanh). Phù hợp khi cần cả tốc độ lẫn độ chính xác.

## 7. 🤔 Khi nào dùng

- ✅ Batch: ETL daily, monthly report.
- ✅ Streaming: fraud, monitoring, real-time recommendation.

## 8. 📌 Tóm tắt 30 giây

Batch = định kỳ, rẻ, độ trễ cao. Streaming = liên tục, đắt, độ trễ ms. Chọn theo SLA business chứ không chọn theo "công nghệ hot".
`,
        theoryEn: `Every data system chooses: process in **batches** or as **streams**. The choice drives tooling, cost, team skills.

## Why this matters

Streaming sounds great but most companies don't need it. Wrong choice = 5–10× operational pain. Ask: cost of being 1 minute late vs 1 hour vs 1 day?

## Batch - the workhorse

Periodic, high-throughput, cheap, easy to recover. Tools: Airflow, Spark, dbt. ~90% of analytics is batch.

## Streaming - the live wire

Per-event, low latency, expensive, hard to recover. Tools: Kafka + Flink, Kinesis. Always-on clusters.

## Three streaming concepts

1. **Event time vs processing time** - when it happened vs when we got it.
2. **Windowing** - tumbling / sliding / session.
3. **Watermarks** - promise that no event older than X will arrive; defines when a window closes.

## Trade-off table

| Aspect | Batch | Streaming |
|---|---|---|
| Latency | Hours | Sub-second |
| Cost | $ | $$$$ |
| Backfill | Trivial | Hard |
| Best for | Reports, ML | Fraud, alerts |

## Lambda vs Kappa

Lambda = batch + streaming in parallel (two codebases - painful). Kappa = streaming only, replay log to backfill (modern preference).

## Case study - Uber

Three latency tiers from one Kafka log: <5s for matching, <10s for surge pricing, daily for financial close.

## Case study - wrong-choice streaming

An e-commerce shop built Kafka + Flink for dashboards that refreshed once per morning. Migrated to dbt + Airflow → saved $200k/year and on-call quieted.

## Best practices

Default to batch; one event log feeding both; idempotent processing; explicit late-data handling; latency SLOs; monitor lag, not throughput.

## Anti-patterns & next lesson

Avoid streaming for show, missing idempotency, mixing event/processing time. Next: **Data Quality** - making the numbers right.`,
        code: `# Nhập thư viện cần thiết
import time
from collections import deque

# Mô phỏng xử lý theo lô
def batch_process(data):
    print("📦 Batch Processing")
    start = time.time()
    results = []
    # Duyệt từng bản ghi và đánh dấu đã xử lý, tính điểm
    for record in data:
        results.append({**record, "processed": True, "score": record["value"] * 2})
    elapsed = time.time() - start
    print(f"  Processed {len(results)} records in {elapsed:.4f}s")
    return results

# Mô phỏng xử lý luồng
class StreamProcessor:
    # Khởi tạo cửa sổ trượt và bộ đếm các sự kiện đã xử lý
    def __init__(self, window_size=5):
        self.window = deque(maxlen=window_size)
        self.processed = 0

    # Xử lý một sự kiện: cập nhật cửa sổ và tính trung bình
    def process_event(self, event):
        self.window.append(event["value"])
        self.processed += 1
        avg = sum(self.window) / len(self.window)
        return {"event": event, "window_avg": round(avg, 2), "count": self.processed}

# Ví dụ
data = [{"id": i, "value": i * 10 + 5} for i in range(20)]

# Xử lý theo lô
batch_results = batch_process(data)

# Xử lý luồng
print("\\\\n⚡ Stream Processing")
stream = StreamProcessor(window_size=5)
# Duyệt 10 sự kiện đầu tiên và in kết quả trung bình cửa sổ
for event in data[:10]:
    result = stream.process_event(event)
    print(f"  Event {event['id']}: value={event['value']}, "
          f"window_avg={result['window_avg']}, total={result['count']}")`,
        codeLanguage: "python",
        exercise: "Implement tumbling window (5 events) and sliding window (5 events, slide 2) for stream processor.",
        exerciseEn: "Implement tumbling window (5 events) and sliding window (5 events, slide 2) for stream processor.",
        quiz: [
          { question: "When should you use Stream Processing?", options: ["Monthly reports", "Real-time fraud detection", "Data migration", "Backups"], answer: 1, explanation: "Stream processing is for real-time needs: fraud detection, live monitoring, instant alerts, real-time dashboards." },
          { question: "What is a tumbling window?", options: ["A window that moves with each event", "A fixed-size, non-overlapping time window", "A window based on user sessions", "A window that grows over time"], answer: 1, explanation: "Tumbling windows are fixed-size and non-overlapping - e.g., every 5 minutes is a separate, complete window." },
          { question: "What problem does the Lambda Architecture solve?", options: ["Data storage", "Providing both accurate batch results and real-time approximations", "Data compression", "Security"], answer: 1, explanation: "Lambda Architecture combines a batch layer (accurate but slow) with a speed layer (fast but approximate) to serve both needs." },
          { question: "What is the difference between event time and processing time?", options: ["They are the same", "Event time is when it happened; processing time is when the system processes it", "Processing time is always first", "Event time is for streaming only"], answer: 1, explanation: "Events may arrive late (network delays). Event time reflects reality; processing time reflects when your system saw it." },
          { question: "What does 'exactly-once' delivery guarantee mean?", options: ["Messages are sent exactly once", "Each event is processed exactly once, even with retries - no duplicates, no losses", "Events arrive in order", "Processing takes exactly one second"], answer: 1, explanation: "Exactly-once ensures each event affects the final result once - achieved through transactions and idempotent operations." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Sếp xem dashboard: "Doanh thu hôm qua âm 10 tỷ?". Hoá ra ETL job lỗi nhập sai dấu. Một lần như vậy mất uy tín cả tháng. **Data Quality** = hệ thống "kiểm định chất lượng" tự động cho data.

> 💡 **Mẹo:** Có 6 chiều DQ phải nhớ: **Accuracy, Completeness, Consistency, Timeliness, Uniqueness, Validity**.

## 2. 💡 Khái niệm chính

- **Accuracy**: data đúng thực tế? (giá sách = 100k, không phải 10k)
- **Completeness**: thiếu cột/dòng nào không?
- **Consistency**: cùng khách hàng, 2 bảng tên trùng nhau?
- **Timeliness**: data cập nhật đúng giờ?
- **Uniqueness**: không trùng lặp.
- **Validity**: format hợp lệ (email, phone).

## 3. 🧰 Tool thực chiến

\`\`\`python
# Great Expectations
import great_expectations as ge
df = ge.from_pandas(pd.read_csv("sales.csv"))
df.expect_column_values_to_not_be_null("customer_id")
df.expect_column_values_to_be_between("amount", 0, 1000000)
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Quick check trong Pandas:

\`\`\`python
assert df["email"].notna().all(), "thiếu email!"
assert df["amount"].between(0, 1e9).all(), "giá ngoài range"
assert df["order_id"].is_unique, "trùng order_id"
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Đừng chỉ check khi pipeline fail - phải check **mọi lần chạy**, kể cả khi data trông "có vẻ ổn".

## 6. ✅ Best practice

> 💡 **Mẹo:** Mỗi pipeline kèm 1 file YAML định nghĩa expectations. Fail check → dừng pipeline + alert Slack/email cho team data.

## 7. 🤔 Khi nào dùng

- ✅ Mọi pipeline production.
- ❌ Notebook research nhanh thì optional.

## 8. 📌 Tóm tắt 30 giây

6 chiều DQ. Tool: Great Expectations, dbt tests, Soda. Check tự động mỗi lần chạy, fail → alert. Đừng để sếp phát hiện trước bạn.
`,
        theoryEn: `Data quality is a discipline, not a tool. The right question shifts from "is the pipeline running?" to "is the output correct, complete, fresh, consistent?"

## Why this matters

Engineers spend ~40% of their time firefighting data quality. Gartner pegs the average cost of bad data at $12.9M/company/year.

## Six DQ dimensions

| Dimension | Example check |
|---|---|
| Completeness | % null in required columns |
| Accuracy | \`amount > 0\` |
| Consistency | \`order_total = sum(items)\` |
| Timeliness | last update < 1h |
| Uniqueness | no dup IDs |
| Validity | email regex, country code |

## Three layers of defense

1. **Schema/contract tests** - dbt, Great Expectations.
2. **Statistical anomaly detection** - Monte Carlo, Bigeye, Anomalo.
3. **Business-logic assertions** - owned by analytics engineers.

## dbt-style testing

A test is a SQL query that *should return zero rows*. Run on every PR + after every transform. Failure halts pipelines.

## Tool comparison

| Tool | Best for |
|---|---|
| dbt tests | Schema + business rules |
| Great Expectations | Python stacks, files/streams |
| Soda Core | YAML/GitOps |
| Monte Carlo | Anomaly detection at scale |
| Anomalo | No-code, business-friendly |

## Case study - Netflix WAP

Netflix's Write-Audit-Publish: write to staging, run assertions, swap pointer only on success. Now standard via Apache Iceberg.

## Case study - Unity $110M miss

Unity lost ~$110M in 2022 from bad customer data poisoning their ad ML model. Stock −36% in a day.

## Best practices

Tests run on every PR; SLAs per table; quality owned by producers; capture lineage; weekly data-incident reviews.

## Anti-patterns & next lesson

Avoid commented-out tests, silent retries, post-incident-only testing. Next: **Orchestration & DAGs** - running these checks in the right order with retries and observability.`,
        code: `# Khung Kiểm tra Chất lượng Dữ liệu
# Lớp chứa các kiểm tra chất lượng dữ liệu
class DataQualityChecker:
    # Khởi tạo lưu data, schema và kết quả
    def __init__(self, data, schema):
        self.data = data
        self.schema = schema
        self.results = []

    # Kiểm tra độ đầy đủ (không null hoặc rỗng) của cột
    def check_completeness(self, column, threshold=0.95):
        # Đếm số giá trị không null và không rỗng trong cột
        non_null = sum(1 for row in self.data if row.get(column) is not None and row.get(column) != "")
        rate = non_null / len(self.data)
        passed = rate >= threshold
        self.results.append({"check": f"Completeness({column})", "rate": rate, "threshold": threshold, "passed": passed})
        return passed

    # Kiểm tra tính duy nhất của giá trị trong cột
    def check_uniqueness(self, column):
        # Thu thập giá trị không null để kiểm tra unique
        values = [row[column] for row in self.data if row.get(column)]
        unique_rate = len(set(values)) / len(values) if values else 0
        passed = unique_rate == 1.0
        self.results.append({"check": f"Uniqueness({column})", "rate": unique_rate, "threshold": 1.0, "passed": passed})
        return passed

    # Kiểm tra giá trị nằm trong khoảng cho trước
    def check_range(self, column, min_val, max_val):
        # Đếm số bản ghi có giá trị nằm trong khoảng
        in_range = sum(1 for row in self.data if min_val <= (row.get(column) or 0) <= max_val)
        rate = in_range / len(self.data)
        passed = rate >= 0.95
        self.results.append({"check": f"Range({column}:{min_val}-{max_val})", "rate": rate, "threshold": 0.95, "passed": passed})
        return passed

    # In báo cáo kết quả các kiểm tra
    def report(self):
        print("\\\\n📊 Data Quality Report")
        print("=" * 60)
        # Duyệt kết quả từng kiểm tra và in trạng thái
        for r in self.results:
            icon = "✅" if r["passed"] else "❌"
            print(f"  {icon} {r['check']}: {r['rate']:.1%} (threshold: {r['threshold']:.1%})")
        # Tính tổng số kiểm tra đạt
        passed = sum(1 for r in self.results if r["passed"])
        print(f"\\\\n  Overall: {passed}/{len(self.results)} checks passed")

# Kiểm thử
# Dữ liệu mẫu để kiểm thử
data = [
    {"id": 1, "name": "An", "age": 22, "email": "an@test.com"},
    {"id": 2, "name": "Binh", "age": 25, "email": "binh@test.com"},
    {"id": 3, "name": "", "age": 150, "email": "chi@test.com"},
    {"id": 3, "name": "Dung", "age": 28, "email": None},
]

# Tạo đối tượng và chạy các kiểm tra
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
          { question: "What is data observability?", options: ["Watching data move", "Automatically monitoring data quality, freshness, and volume with alerting on anomalies", "Manual data review", "Data visualization"], answer: 1, explanation: "Data observability provides automated monitoring of data health - detecting quality issues, freshness problems, and volume anomalies." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Pipeline có 10 bước: tải data → clean → transform → ML → load → email báo cáo. Mỗi bước phụ thuộc bước trước. Không có "nhạc trưởng" → bước 5 chạy trước bước 3 là toang. **Orchestrator** (Airflow, Prefect) chính là nhạc trưởng đó.

> 💡 **Mẹo:** DAG = Directed Acyclic Graph = "lịch học có thứ tự, không quay vòng". Đây là trái tim của Airflow.

## 2. 💡 Khái niệm chính

- **Task**: 1 đơn vị công việc (1 bước).
- **DAG**: tập hợp các task + dependency.
- **Schedule**: cron-like (\`@daily\`, \`0 9 * * *\`).
- **Retry**: tự chạy lại khi fail.

## 3. 🧰 Airflow DAG mẫu

\`\`\`python
# Nhập lớp DAG từ thư viện Airflow để định nghĩa một quy trình làm việc.
from airflow import DAG
# Nhập lớp PythonOperator để tạo các tác vụ chạy hàm Python.
from airflow.operators.python import PythonOperator
# Nhập đối tượng datetime từ thư viện datetime để làm việc với ngày giờ.
from datetime import datetime

# Định nghĩa một DAG (Directed Acyclic Graph - Đồ thị có hướng không chu trình)
# Tên của DAG là "daily_etl".
# start_date: Ngày bắt đầu chạy DAG, ở đây là ngày 1 tháng 1 năm 2024.
# schedule: Lịch trình chạy DAG, "@daily" nghĩa là chạy mỗi ngày một lần.
# catchup: Nếu đặt là False, DAG sẽ không chạy lại các lần bị bỏ lỡ trong quá khứ.
with DAG("daily_etl", start_date=datetime(2024,1,1),
         schedule="@daily", catchup=False) as dag:
    # Định nghĩa tác vụ "extract" (trích xuất dữ liệu).
    # task_id: ID duy nhất của tác vụ.
    # python_callable: Hàm Python sẽ được gọi khi tác vụ này chạy. (Giả định hàm extract_fn đã được định nghĩa ở đâu đó)
    extract = PythonOperator(task_id="extract", python_callable=extract_fn)
    # Định nghĩa tác vụ "transform" (biến đổi dữ liệu).
    # task_id: ID duy nhất của tác vụ.
    # python_callable: Hàm Python sẽ được gọi khi tác vụ này chạy. (Giả định hàm transform_fn đã được định nghĩa ở đâu đó)
    transform = PythonOperator(task_id="transform", python_callable=transform_fn)
    # Định nghĩa tác vụ "load" (tải dữ liệu).
    # task_id: ID duy nhất của tác vụ.
    # python_callable: Hàm Python sẽ được gọi khi tác vụ này chạy. (Giả định hàm load_fn đã được định nghĩa ở đâu đó)
    load = PythonOperator(task_id="load", python_callable=load_fn)
    # Định nghĩa thứ tự thực hiện của các tác vụ.
    # Tác vụ 'extract' sẽ chạy trước, sau đó đến 'transform', và cuối cùng là 'load'.
    # Đây là một chuỗi tuần tự: extract -> transform -> load.
    extract >> transform >> load
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`extract >> [clean, validate] >> load\` - clean và validate chạy song song sau extract.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** \`catchup=True\` (mặc định cũ) sẽ chạy bù toàn bộ ngày từ \`start_date\` → ngập server. Luôn để \`catchup=False\` trừ khi cố ý backfill.

## 6. ✅ Best practice

> 💡 **Mẹo:** Mỗi task phải **idempotent** + **atomic**. Đặt SLA (\`sla=timedelta(hours=2)\`) để Airflow alert khi task chạy quá lâu.

## 7. 🤔 Khi nào dùng

- ✅ Pipeline >3 bước, chạy định kỳ, có dependency.
- ❌ 1 script chạy 1 lần → cron Linux đủ.

## 8. 📌 Tóm tắt 30 giây

DAG = task + dependency + schedule. Airflow/Prefect/Dagster là 3 tool top. Idempotent + retry + SLA + alert = pipeline production-grade.
`,
        theoryEn: `An **orchestrator** is the OS of your data platform: it decides what runs, when, in what order, and who gets paged on failure.

## Why this matters

#1 cause of broken dashboards is "task A finished before task B's data was ready." Orchestrators model pipelines as **DAGs** with dependency edges and guarantee order, retries, observability.

## Core concepts

- **Task** - unit of work.
- **DAG** - directed acyclic graph of tasks.
- **Scheduler** - decides what runs when.
- **Executor** - actually runs tasks (locally / Celery / K8s).
- **Backfill** - re-run for historical dates.
- **Idempotency** - re-runs produce the same output.

## Airflow mental model

Declare DAGs in Python with operators and \`>>\` for dependencies. Built-in retries, SLAs, sensors, XCom message passing.

## Tool comparison

| Tool | Paradigm | Strength | Watch-out |
|---|---|---|---|
| Airflow | Task-centric | Huge ecosystem | Verbose at scale |
| Dagster | Asset-centric | Lineage built in | Smaller community |
| Prefect | Python-native | Clean API | Less mature |
| Argo | K8s YAML | K8s integration | Steep outside K8s |
| Cron + bash | DIY | Free | No observability |

## Case study - Airbnb

Birthplace of Airflow (2015). At ~10k DAGs/day they relied on idempotency, metadata-driven DAG generation, and ownership tags for fast on-call routing.

## Case study - cron jungle

A startup ran 400 cron jobs across 5 EC2 boxes. Buffers stopped being enough as traffic grew → revenue dashboard used stale data for 6 weeks unnoticed.

## Best practices

Idempotency mandatory; state lives in object storage/warehouse, not orchestrator; one DAG per domain; tag owners + on-call; alert on lateness; parameterize by execution date.

## Anti-patterns & next lesson

Avoid huge XCom payloads, \`datetime.now()\`, sleep loops, side-by-side cron. Next: **Cloud Platforms** - where these orchestrators live.`,
        code: `# Mô phỏng DAG (tương tự Airflow)
# Nhập hàm để lấy thời gian hiện tại
from datetime import datetime

# Định nghĩa Task: đại diện công việc trong DAG
class Task:
    # Khởi tạo Task với tên, hàm thực thi và số lần thử lại
    def __init__(self, name, fn, retries=1):
        self.name = name
        self.fn = fn
        self.retries = retries
        self.status = "pending"
        self.result = None

    # Thực thi hàm của task, thử lại khi lỗi
    def run(self):
        # Lặp theo số lần thử (bao gồm lần thử đầu tiên)
        for attempt in range(self.retries + 1):
            # Thử chạy hàm, nếu lỗi sẽ vào except
            try:
                self.result = self.fn()
                self.status = "success"
                return self.result
            except Exception as e:
                # Nếu còn lần thử, in thông báo và tiếp tục
                if attempt < self.retries:
                    print(f"    ⚠️ {self.name} failed, retrying ({attempt+1}/{self.retries})")
                else:
                    self.status = "failed"
                    raise

# Định nghĩa DAG để quản lý và chạy các Task
class DAG:
    # Khởi tạo DAG với tên, lịch và các cấu trúc lưu tasks và phụ thuộc
    def __init__(self, name, schedule="daily"):
        self.name = name
        self.schedule = schedule
        self.tasks = {}
        self.deps = {}

    # Thêm task vào DAG, ghi nhận phụ thuộc nếu có
    def add_task(self, task, depends_on=None):
        self.tasks[task.name] = task
        self.deps[task.name] = depends_on or []

    # Chạy DAG: in thông tin, xử lý thứ tự theo phụ thuộc
    def run(self):
        print(f"🎼 DAG: {self.name} (schedule: {self.schedule})")
        print(f"   Started: {datetime.now().strftime('%H:%M:%S')}")
        print("=" * 50)
        
        # Lặp cho tới khi tất cả tasks hoàn thành
        completed = set()
        while len(completed) < len(self.tasks):
            # Duyệt các task, chạy khi phụ thuộc đã hoàn thành
            for name, task in self.tasks.items():
                # Bỏ qua nếu task đã hoàn thành
                if name in completed:
                    continue
                # Kiểm tra tất cả phụ thuộc đã được hoàn thành chưa
                if all(d in completed for d in self.deps[name]):
                    print(f"  ▶ Running: {name}")
                    task.run()
                    completed.add(name)
                    print(f"    ✅ {name}: {task.status}")
        
        print(f"\\\\n🏁 DAG complete! {len(completed)} tasks executed.")

# Xây dựng DAG cho pipeline
# Khởi tạo một DAG với tên và lịch chạy
dag = DAG("daily_student_etl", schedule="0 2 * * *")

# Thêm các task (extract, transform, load, notify) và xác định phụ thuộc
dag.add_task(Task("extract_csv", lambda: "100 rows extracted"))
dag.add_task(Task("extract_api", lambda: "50 records from API"))
dag.add_task(Task("transform", lambda: "150 rows cleaned"), depends_on=["extract_csv", "extract_api"])
dag.add_task(Task("load_warehouse", lambda: "loaded to DW"), depends_on=["transform"])
dag.add_task(Task("notify", lambda: "email sent"), depends_on=["load_warehouse"])

# Chạy DAG
dag.run()`,
        codeLanguage: "python",
        exercise: "Add parallel execution, timeout, and SLA monitoring to the DAG simulator.",
        exerciseEn: "Add parallel execution, timeout, and SLA monitoring to the DAG simulator.",
        quiz: [
          { question: "What is a DAG in Airflow?", options: ["A database", "A Directed Acyclic Graph - a workflow without circular dependencies", "A Data Access Gateway", "A Dashboard"], answer: 1, explanation: "DAG = Directed Acyclic Graph - tasks connected by one-way dependencies with no cycles/loops." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn muốn build data pipeline mà không phải mua server vật lý ngồi cắm cáp. Cloud (AWS, GCP, Azure) cho thuê đủ thứ: storage, compute, warehouse - tính tiền theo phút. **Data Engineer phải biết "menu" cloud** để chọn dịch vụ phù hợp.

> 💡 **Mẹo:** 3 ông lớn - AWS (thị phần lớn nhất), GCP (mạnh data/AI), Azure (tích hợp Microsoft). Học 1 ông → 80% kiến thức chuyển sang ông kia được.

## 2. 💡 Bộ tứ Data trên Cloud

| Layer | AWS | GCP | Azure |
|-------|-----|-----|-------|
| Storage | S3 | GCS | Blob |
| Warehouse | Redshift | BigQuery | Synapse |
| Streaming | Kinesis | Pub/Sub | Event Hub |
| Orchestrator | MWAA (Airflow) | Composer | Data Factory |

## 3. 🧰 Pipeline cloud điển hình

\`\`\`
[App] → [Kinesis] → [S3 raw] → [Glue ETL] → [Redshift] → [QuickSight]
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Đọc file từ S3 bằng Python:

\`\`\`python
# Nhập thư viện boto3 để tương tác với AWS S3 và pandas để xử lý dữ liệu dạng bảng.
import boto3, pandas as pd

# Tạo một đối tượng client để kết nối với dịch vụ S3 của AWS.
s3 = boto3.client("s3")

# Lấy đối tượng (file) từ S3.
# Đầu vào: Tên bucket ("my-bucket") và tên file ("sales.csv").
# Đầu ra: Một đối tượng chứa thông tin về file, bao gồm cả nội dung.
obj = s3.get_object(Bucket="my-bucket", Key="sales.csv")

# Đọc nội dung của file CSV từ đối tượng S3 và chuyển nó thành DataFrame của pandas.
# Đầu vào: Phần "Body" của đối tượng S3, chứa nội dung file.
# Đầu ra: Một DataFrame (bảng dữ liệu) chứa dữ liệu từ file sales.csv.
df = pd.read_csv(obj["Body"])
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên tắt Redshift cluster cuối tuần → hóa đơn vài trăm USD. Luôn set **auto-pause** hoặc serverless option.

## 6. ✅ Best practice

> 💡 **Mẹo:** Data Lake (S3/GCS) **rẻ** → lưu raw. Warehouse (Redshift/BigQuery) **đắt** → chỉ load data đã clean. Đừng dump tất cả vào warehouse.

## 7. 🤔 Khi nào dùng

- ✅ Mọi pipeline production hiện đại.
- ❌ Data nội bộ siêu nhạy cảm (ngân hàng) → on-premise hoặc private cloud.

## 8. 📌 Tóm tắt 30 giây

Cloud = thuê hạ tầng theo phút. Data Engineer phải biết: object storage, warehouse, streaming, orchestrator. Tối ưu chi phí = bí quyết sống còn.
`,
        theoryEn: `Modern data engineering is a **cloud** discipline. AWS / GCP / Azure each package the same building blocks under different names.

## Why this matters

~25 services per cloud with overlapping names. Map the blocks once → navigate any cloud.

## Six universal blocks

| Capability | AWS | GCP | Azure |
|---|---|---|---|
| Object storage | S3 | GCS | Blob/ADLS |
| Warehouse | Redshift | BigQuery | Synapse |
| Streaming | Kinesis/MSK | Pub/Sub | Event Hubs |
| Batch compute | EMR/Glue | Dataproc/Dataflow | HDInsight |
| Orchestration | MWAA/Step Fn | Composer | Data Factory |
| Serverless | Lambda | Cloud Functions | Functions |

## Reference lakehouse

Sources → streaming bus → object storage (bronze/silver/gold) → warehouse → BI. Medallion naming from Databricks is now industry-standard.

## Open table formats

Iceberg, Delta, Hudi: ACID + time travel + schema evolution on top of Parquet. Make a lake feel like a warehouse.

## Trade-offs

| Cloud | Strength | Watch-out |
|---|---|---|
| AWS | Catalog size | Service overlap |
| GCP | BigQuery | Smaller ecosystem |
| Azure | MS integration | Doc maze |
| Snowflake/Databricks | Multi-cloud | Premium price, vendor lock |

## Cost model

Compute (auto-suspend), storage (lifecycle policies), egress (region-pin). Egress always surprises.

## Case study - Shopify

GCP + BigQuery + dbt at >10 PB. Won via immutable raw layer + per-team cost tags.

## Case study - egress disaster

S3 in us-east-1, Snowflake in us-west-2 → $180k/quarter in cross-region egress. Migrated buckets, egress dropped to ~zero.

## Best practices

One primary cloud; managed services for boring stuff; tag everything; budget alerts; region-pin; adopt Iceberg/Delta early.

## Anti-patterns & next lesson

Avoid premature multi-cloud; always-on clusters for spiky loads; ignoring residency. Next: **Production Best Practices**.`,
        code: `# Khung quyết định kiến trúc đám mây
# Danh sách dịch vụ theo hạng mục và nhà cung cấp
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

# In tiêu đề so sánh nền tảng dữ liệu đám mây
print("☁️ Cloud Data Platform Comparison")
print("=" * 70)
# Duyệt từng hạng mục và in nhà cung cấp cùng công cụ
for category, providers in services.items():
    print(f"\\\\n📂 {category}:")
    # In công cụ cho mỗi nhà cung cấp
    for provider, tools in providers.items():
        print(f"  {provider:>6}: {' | '.join(tools)}")

# Ước tính chi phí
def estimate_cost(storage_gb, queries_tb, compute_hours):
    costs = {
        "GCP": storage_gb * 0.02 + queries_tb * 5 + compute_hours * 0.10,
        "AWS": storage_gb * 0.023 + queries_tb * 5 + compute_hours * 0.12,
        "Azure": storage_gb * 0.018 + queries_tb * 5 + compute_hours * 0.11,
    }
    print(f"\\\\n💰 Cost Estimate ({storage_gb}GB, {queries_tb}TB queries, {compute_hours}h compute):")
    # In chi phí ước tính cho từng nhà cung cấp
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
          { question: "What is the principle of least privilege in IAM?", options: ["Give everyone admin access", "Grant only the minimum permissions needed to perform a task", "Remove all permissions", "Use shared accounts"], answer: 1, explanation: "Least privilege means each user/service gets only the exact permissions needed - reducing the impact of compromised credentials." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Pipeline chạy ngon trên laptop bạn - nhưng deploy production: lỗi mất 1 ngày, không ai biết, sếp phát hiện qua dashboard sai. **Production-grade** = pipeline tự kể được "tôi đang ổn" hay "tôi đang fail" + tự sửa được phần lớn lỗi.

> 💡 **Mẹo:** Code chạy được ≠ code production. Khoảng cách đó = monitoring + retry + alert + docs.

## 2. 💡 Trụ cột Production

1. **Idempotency**: chạy 2 lần kết quả y hệt.
2. **Monitoring**: log + metrics + dashboard.
3. **Alerting**: Slack/PagerDuty khi fail.
4. **Versioning**: git cho code, dbt/dvc cho data schema.
5. **Testing**: unit test, data test (Great Expectations).
6. **Documentation**: data lineage, schema docs.

## 3. 🧰 Stack tham khảo

\`\`\`
Code: GitHub + CI/CD
Orchestrator: Airflow / Prefect
Transform: dbt
Quality: Great Expectations
Monitor: Datadog / Grafana
Alert: Slack / PagerDuty
Lineage: OpenLineage / Datahub
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Idempotent upsert thay vì append:

\`\`\`sql
-- Lệnh MERGE dùng để đồng bộ dữ liệu giữa hai bảng.
-- Nó sẽ cập nhật các bản ghi đã tồn tại và chèn các bản ghi mới.
MERGE INTO sales t -- Chỉ định bảng đích (target) là 'sales' và đặt bí danh là 't'.
USING staging s ON t.order_id = s.order_id -- Chỉ định bảng nguồn (source) là 'staging' và đặt bí danh là 's'.
                                        -- Điều kiện ON xác định cách các hàng từ hai bảng được so khớp.
WHEN MATCHED THEN UPDATE SET amount = s.amount -- Nếu tìm thấy hàng khớp (order_id giống nhau) giữa 'sales' và 'staging',
                                            -- thì cập nhật cột 'amount' trong bảng 'sales' bằng giá trị từ bảng 'staging'.
WHEN NOT MATCHED THEN INSERT (order_id, amount) VALUES (s.order_id, s.amount); -- Nếu không tìm thấy hàng khớp trong bảng 'sales' (tức là có order_id mới trong 'staging'),
                                                                            -- thì chèn một hàng mới vào bảng 'sales' với 'order_id' và 'amount' từ bảng 'staging'.
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Hardcode credentials trong code → rò rỉ là toang. Luôn dùng secret manager (AWS Secrets, Vault).

## 6. ✅ Best practice

> 💡 **Mẹo:** Mọi pipeline phải có **runbook** - file mô tả: "khi task X fail, làm 3 bước Y, Z, W". On-call team sẽ cảm ơn bạn lúc 2h sáng.

## 7. 🤔 Khi nào áp dụng

- ✅ Pipeline phục vụ business critical (báo cáo sếp, ML production).
- ❌ Notebook research → simple hơn cũng được.

## 8. 📌 Tóm tắt 30 giây

Production = idempotent + monitor + alert + version + test + docs. Không có 6 thứ này, pipeline chỉ là "demo đẹp", không phải "hệ thống thật".
`,
        theoryEn: `Building a pipeline that runs on your laptop is easy. Building one that runs reliably for **years**, recovers unattended, and never silently corrupts data - that is data engineering.

## Why this matters

Most pipelines aren't loudly broken - they're *quietly wrong* (stale by 3 days, off by 2%). Silent failures erode trust faster than crashes. Five SLOs: freshness, completeness, correctness, availability, cost predictability.

## Idempotency - the cornerstone

10 runs = 1 run, same result. Use MERGE/UPSERT, partitioned overwrite, transactional table formats. Avoid \`now()\` inside tasks, auto-IDs assigned in pipeline, side-effects (email + DB write).

## CI/CD for pipelines

Source control + PR review + CI on dev warehouse + staging + blue/green deploy. Tooling: dbt + GitHub Actions + dev/prod schema split.

## Observability - three pillars

| Pillar | Question | Tool |
|---|---|---|
| Logs | What happened? | CloudWatch, Datadog |
| Metrics | How trending? | Prometheus |
| Lineage | What's downstream? | dbt docs, OpenLineage |

## Naive vs production

| Concern | Naive | Production |
|---|---|---|
| Failure | Crash & email | Retry → DLQ → page |
| Re-run | Manual cleanup | Idempotent |
| Schema change | Breaks silently | Contract tests |
| Deploy | Push to prod | PR → CI → staging → prod |

## Security & compliance

PII tagging, row-level access, audit logs, encryption, residency, retention - not optional in 2024.

## Case study - Stripe

Pipelines that ship money: end-to-end checksums, dual reconciliation, four-eyes rule on financial deploys.

## Case study - Friday-night deploy

A 6pm Friday dbt change joined on a renamed column. 3 days of conversion data silently dropped. Fix was policy: no Friday afternoon deploys, contract tests on join keys, rollback runbooks.

## Best practices

Idempotency or no ship; contract tests at every boundary; one owner + on-call; runbooks per alert; weekly cost reviews; quarterly chaos drills; kill untrustworthy dashboards.

## Anti-patterns

No staging; muted alerts; secrets in code; hand-editing prod; blaming people.

The mark of seniority: how **boring** your pipeline is to operate.`,
        code: `# Nhập thư viện json để làm việc với dữ liệu JSON.
import json
# Nhập thư viện time để đo thời gian thực thi.
import time
# Nhập lớp datetime từ module datetime để làm việc với ngày giờ.
from datetime import datetime

# Định nghĩa một lớp (class) có tên ProductionPipeline.
# Lớp này mô phỏng một quy trình xử lý dữ liệu trong môi trường sản xuất.
class ProductionPipeline:
    # Phương thức khởi tạo (constructor) của lớp.
    # Được gọi khi tạo một đối tượng mới từ lớp ProductionPipeline.
    # Tham số:
    #   - name: Tên của pipeline (chuỗi).
    def __init__(self, name):
        # Gán tên cho pipeline.
        self.name = name
        # Khởi tạo một từ điển để lưu trữ các chỉ số (metrics) của pipeline.
        # Bao gồm số bản ghi đã xử lý, thất bại và thử lại.
        self.metrics = {"processed": 0, "failed": 0, "retried": 0}
        # Khởi tạo một danh sách để lưu trữ các bản ghi bị lỗi không thể xử lý (dead letter queue).
        self.dead_letter = []

    # Phương thức để ghi log (nhật ký) các sự kiện của pipeline.
    # Tham số:
    #   - level: Mức độ của log (ví dụ: "INFO", "ERROR", "WARN").
    #   - message: Nội dung thông báo của log.
    #   - **kwargs: Các đối số từ khóa bổ sung sẽ được thêm vào log.
    def log(self, level, message, **kwargs):
        # Tạo một từ điển chứa thông tin log.
        # Bao gồm thời gian, mức độ, tên pipeline, thông báo và các đối số bổ sung.
        entry = {
            "timestamp": datetime.now().isoformat(), # Thời gian hiện tại theo định dạng ISO 8601.
            "level": level, # Mức độ log.
            "pipeline": self.name, # Tên của pipeline.
            "message": message, # Nội dung thông báo.
            **kwargs # Thêm các đối số từ khóa khác vào log.
        }
        # Chuyển đổi từ điển log thành chuỗi JSON và in ra console.
        # Đầu ra: Một chuỗi JSON đại diện cho một bản ghi log.
        print(json.dumps(entry))

    # Phương thức để xử lý một bản ghi với khả năng thử lại khi gặp lỗi.
    # Tham số:
    #   - record: Bản ghi dữ liệu cần xử lý.
    #   - fn: Hàm (function) sẽ được gọi để xử lý bản ghi.
    #   - max_retries: Số lần tối đa thử lại nếu xử lý thất bại (mặc định là 3).
    # Đầu ra: Kết quả của hàm fn nếu thành công, hoặc None nếu thất bại sau tất cả các lần thử lại.
    def process_with_retry(self, record, fn, max_retries=3):
        # Lặp qua số lần thử lại (bao gồm cả lần đầu tiên).
        for attempt in range(max_retries + 1):
            try:
                # Cố gắng gọi hàm xử lý fn với bản ghi.
                result = fn(record)
                # Nếu thành công, tăng số lượng bản ghi đã xử lý.
                self.metrics["processed"] += 1
                # Trả về kết quả.
                return result
            except Exception as e:
                # Nếu có lỗi, tăng số lượng bản ghi đã thử lại.
                self.metrics["retried"] += 1
                # Kiểm tra xem đây có phải là lần thử lại cuối cùng không.
                if attempt == max_retries:
                    # Nếu là lần thử lại cuối cùng và vẫn lỗi, tăng số lượng bản ghi thất bại.
                    self.metrics["failed"] += 1
                    # Thêm bản ghi và thông tin lỗi vào danh sách dead_letter.
                    self.dead_letter.append({"record": record, "error": str(e)})
                    # Ghi log lỗi nghiêm trọng.
                    self.log("ERROR", f"Record failed after {max_retries} retries", error=str(e))
                    # Trả về None vì không thể xử lý bản ghi này.
                    return None

    # Phương thức chính để chạy pipeline.
    # Tham số:
    #   - data: Danh sách các bản ghi dữ liệu đầu vào.
    #   - transform_fn: Hàm biến đổi sẽ được áp dụng cho mỗi bản ghi.
    # Đầu ra: Danh sách các bản ghi đã được xử lý thành công.
    def run(self, data, transform_fn):
        # Ghi log thông tin khi pipeline bắt đầu.
        # Đầu vào: data (danh sách các bản ghi), transform_fn (hàm xử lý).
        self.log("INFO", f"Pipeline started with {len(data)} records")
        # Ghi lại thời gian bắt đầu chạy pipeline.
        start = time.time()
        
        # Khởi tạo danh sách để lưu trữ kết quả của các bản ghi được xử lý thành công.
        results = []
        # Lặp qua từng bản ghi trong dữ liệu đầu vào.
        for record in data:
            # Xử lý từng bản ghi với khả năng thử lại.
            result = self.process_with_retry(record, transform_fn)
            # Nếu bản ghi được xử lý thành công (kết quả không phải None).
            if result:
                # Thêm kết quả vào danh sách.
                results.append(result)
        
        # Tính toán thời gian đã trôi qua khi pipeline hoàn thành.
        elapsed = time.time() - start
        # Ghi log thông tin khi pipeline hoàn thành.
        # Bao gồm thời gian chạy và các chỉ số (metrics) đã thu thập.
        self.log("INFO", "Pipeline complete", 
                 duration_ms=round(elapsed * 1000), # Thời gian chạy tính bằng mili giây.
                 **self.metrics) # Thêm tất cả các chỉ số từ self.metrics vào log.
        
        # Kiểm tra nếu có bất kỳ bản ghi nào trong dead_letter queue.
        if self.dead_letter:
            # Ghi log cảnh báo nếu có bản ghi bị lỗi.
            self.log("WARN", f"{len(self.dead_letter)} records in dead letter queue")
        
        # Trả về danh sách các kết quả đã được xử lý thành công.
        # Đầu ra: Danh sách các bản ghi đã được biến đổi thành công.

        return results

# Phần chạy thử nghiệm pipeline.

# Nhập thư viện numpy để tạo số ngẫu nhiên.
import numpy as np
# Đặt seed cho bộ tạo số ngẫu nhiên của numpy để đảm bảo kết quả có thể lặp lại.
np.random.seed(42)

# Định nghĩa hàm biến đổi (transform function) cho dữ liệu.
# Hàm này mô phỏng một quá trình xử lý có thể thất bại ngẫu nhiên.
# Tham số:
#   - record: Một bản ghi dữ liệu đầu vào (từ điển).
# Đầu ra: Một bản ghi dữ liệu đã được biến đổi (từ điển) hoặc gây ra lỗi.
def transform(record):
    # Có 15% khả năng hàm này sẽ gây ra lỗi ValueError.
    if np.random.random() < 0.15:
        raise ValueError("Transform failed") # Gây ra lỗi.
    # Nếu không lỗi, trả về bản ghi với một trường 'score' mới.
    # 'score' được tính bằng 'value' nhân 2.
    return {**record, "score": record["value"] * 2}

# Tạo dữ liệu đầu vào giả định cho pipeline.
# Đây là một danh sách các từ điển, mỗi từ điển có 'id' và 'value'.
data = [{"id": i, "value": i * 10} for i in range(20)]
# Khởi tạo một đối tượng ProductionPipeline với tên "daily_etl".
pipeline = ProductionPipeline("daily_etl")
# Chạy pipeline với dữ liệu và hàm biến đổi đã định nghĩa.
# Kết quả là danh sách các bản ghi đã được xử lý thành công.
results = pipeline.run(data, transform)
# Kết quả mong đợi:
# - Các log sẽ được in ra console, bao gồm thông tin bắt đầu, kết thúc, và các lỗi (nếu có).
# - Biến 'results' sẽ chứa danh sách các bản ghi đã được biến đổi thành công.
# - Biến 'pipeline.dead_letter' sẽ chứa các bản ghi không thể xử lý được.`,
        codeLanguage: "python",
        exercise: "Add idempotency check (based on record ID) and checkpoint/resume to ProductionPipeline.",
        exerciseEn: "Add idempotency check (based on record ID) and checkpoint/resume to ProductionPipeline.",
        quiz: [
          { question: "What does idempotency mean in a data pipeline?", options: ["Runs faster", "Running multiple times with the same input produces the same result without duplicates", "Never fails", "Automatically scales"], answer: 1, explanation: "An idempotent pipeline produces identical results regardless of how many times it runs with the same input - no duplicate records." },
          { question: "What is a Dead Letter Queue?", options: ["A queue for deleted messages", "A separate storage for records that failed processing, allowing the pipeline to continue", "A backup queue", "A priority queue"], answer: 1, explanation: "DLQ captures failed records so the pipeline can continue processing good data. Failed records are reviewed separately." },
          { question: "What is the purpose of a postmortem?", options: ["Blame someone", "Document what happened, root cause, and preventive actions for future incidents", "Delete failed data", "Restart the pipeline"], answer: 1, explanation: "Postmortems are blameless reviews that document incidents, identify root causes, and create action items to prevent recurrence." },
          { question: "What is a circuit breaker pattern?", options: ["A physical switch", "Stopping calls to a failing service after a threshold to prevent cascading failures", "A type of encryption", "A retry mechanism"], answer: 1, explanation: "Circuit breakers detect when a service is failing and temporarily stop sending requests, giving it time to recover." },
          { question: "Why use exponential backoff for retries instead of fixed intervals?", options: ["It's simpler", "It gradually increases wait time, reducing load on the failing service and improving recovery chances", "It's faster", "It uses less memory"], answer: 1, explanation: "Exponential backoff (1s, 2s, 4s, 8s...) gives the failing service increasing recovery time and prevents overwhelming it with rapid retries." }
        ]
      }
    ]
  }
];
