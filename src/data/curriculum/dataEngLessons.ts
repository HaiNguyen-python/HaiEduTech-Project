// CONTENT STANDARD: every `theory` block MUST contain ≥6 `## H2` sections so TheorySections.tsx can render the per-section "Mark read" UX.
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
        theory: `**Data Cleaning** thường được gọi là bước **quan trọng nhất và tốn thời gian nhất** trong mọi data pipeline. Khảo sát của Anaconda (2023) chỉ ra **data professional dành 60-80% thời gian** chỉ để làm sạch dữ liệu. **"Garbage in, garbage out"** — dữ liệu bẩn dẫn đến phân tích sai, model ML sụp đổ, và quyết định kinh doanh tệ hại.

## Vì sao Data Cleaning quan trọng?
**Case study cảnh báo — IBM Watson Health:**
IBM đầu tư **$5 tỷ** vào Watson for Oncology, nhưng năm 2018 phải đóng cửa vì model recommend sai phác đồ điều trị. Nguyên nhân chính: **training data không sạch** — bệnh án có cột "tumor stage" mã hóa khác nhau giữa các bệnh viện (1, I, Stage I, stage_1…), missing values bị fill mặc định = 0, ngày tháng không chuẩn hóa timezone. **Một lỗi data cleaning = $5B mất trắng.**

## 6 loại dữ liệu "bẩn"
1. **Missing values** (NaN, None, '', 'N/A', '-')
2. **Duplicates** (cùng record xuất hiện nhiều lần)
3. **Outliers** (giá trị nằm xa khỏi phạm vi hợp lý)
4. **Inconsistent formatting** ("New York" vs "new york" vs "NY" vs "N.Y.")
5. **Wrong data types** (date lưu dưới dạng string, số lưu dưới dạng text)
6. **Invalid values** (age = -5, birth_date = 2050, email không có @)

## 1. Phát hiện Missing Values
\`\`\`python
df.isnull().sum()                      # số NULL mỗi cột
df.isnull().sum() / len(df) * 100      # % missing mỗi cột
df[df['email'].isnull()]               # xem rows có email NULL
df.isnull().any(axis=1).sum()          # số rows có ít nhất 1 NULL

# Visualize pattern missing
import missingno as msno
msno.matrix(df)                        # heatmap missing
msno.heatmap(df)                       # tương quan missing giữa các cột
\`\`\`

## Cây quyết định xử lý Missing
| % Missing | Action |
|-----------|--------|
| **<5%** | Drop rows: \`df.dropna(subset=['email'])\` |
| **5-30%** | Impute (fill) — xem chi tiết bên dưới |
| **30-60%** | Cân nhắc drop cột HOẶC dùng advanced imputation (KNN, MICE) |
| **>60%** | Drop cột (gần như chắc chắn) |

**Chiến lược impute theo loại dữ liệu:**
- **Numeric (skewed)**: \`df['age'].fillna(df['age'].median())\` — median **chống outlier** tốt hơn mean
- **Numeric (normal)**: \`df['height'].fillna(df['height'].mean())\`
- **Categorical**: \`df['city'].fillna(df['city'].mode()[0])\` — most frequent
- **Time series**: \`df['temp'].interpolate(method='linear')\` — ước lượng giữa các điểm
- **Forward/Backward fill**: \`df['stock_price'].fillna(method='ffill')\` — chuẩn cho stock data
- **Sentinel value**: \`df['city'].fillna('UNKNOWN')\` — giữ thông tin "đã từng missing"

## MCAR / MAR / MNAR — vì sao bạn PHẢI hiểu
**KHÔNG BAO GIỜ** fill NULL một cách máy móc. Phải hiểu **vì sao** data bị thiếu:

| Loại | Định nghĩa | Ví dụ | Strategy |
|------|------------|-------|----------|
| **MCAR** (Missing Completely At Random) | Random thuần | Cảm biến hỏng ngẫu nhiên | An toàn drop hoặc impute đơn giản |
| **MAR** (Missing At Random) | Phụ thuộc cột khác đã quan sát | Nam ít trả lời câu hỏi cảm xúc hơn nữ | Impute bằng group (theo gender) |
| **MNAR** (Missing Not At Random) | Phụ thuộc chính giá trị bị thiếu | Người thu nhập cao từ chối khai income | **NGUY HIỂM** — impute = bias model |

→ Nếu MNAR mà bạn fill bằng median → model sẽ sai lệch nghiêm trọng (income trung bình bị kéo xuống).

## 2. Xử lý Duplicates
\`\`\`python
# Phát hiện
df.duplicated().sum()                              # tổng số dòng trùng (theo ALL cột)
df.duplicated(subset=['email']).sum()              # trùng theo email
df[df.duplicated(subset=['email'], keep=False)]    # XEM tất cả dòng trùng

# Xóa
df.drop_duplicates()                                # xóa exact duplicates
df.drop_duplicates(subset=['email'], keep='last')   # giữ bản mới nhất
df.drop_duplicates(subset=['email'], keep=False)    # xóa TẤT CẢ duplicates
\`\`\`

**Pattern thực tế: Fuzzy duplicate** — "John Smith" vs "john smith" vs "John  Smith" (2 spaces):
\`\`\`python
df['email_clean'] = df['email'].str.lower().str.strip()
df = df.drop_duplicates(subset=['email_clean'])
\`\`\`

## 3. Phát hiện Outliers — 3 phương pháp

### IQR Method (robust, không yêu cầu phân phối)
\`\`\`python
Q1 = df['score'].quantile(0.25)
Q3 = df['score'].quantile(0.75)
IQR = Q3 - Q1
lower, upper = Q1 - 1.5*IQR, Q3 + 1.5*IQR
outliers = df[(df['score'] < lower) | (df['score'] > upper)]
\`\`\`
✅ Ưu: không giả định phân phối | ❌ Nhược: cứng nhắc với tail dài

### Z-Score Method (cho phân phối normal)
\`\`\`python
from scipy import stats
z = stats.zscore(df['score'])
outliers = df[abs(z) > 3]   # >3σ từ mean
\`\`\`
✅ Cho phân phối normal | ❌ Sai khi data skewed

### Isolation Forest (ML-based, cho high-dimensional)
\`\`\`python
from sklearn.ensemble import IsolationForest
clf = IsolationForest(contamination=0.05)
df['outlier'] = clf.fit_predict(df[['age', 'income', 'score']])
\`\`\`
✅ Multi-variate outlier | ❌ Cần tune

## Bảng so sánh xử lý outlier
| Action | Khi nào dùng |
|--------|--------------|
| **Remove** | Lỗi rõ ràng (age=-5, age=300) |
| **Cap (Winsorize)** | Giữ row nhưng kéo giá trị về biên (Q1, Q99) |
| **Log transform** | Data skew (income, prices, view counts) — log(x+1) |
| **Keep as-is** | Outlier hợp lệ (Elon Musk income trong dataset salary) |
| **Separate model** | Outlier có pattern riêng (fraud detection) |

## Pipeline làm sạch chuẩn (production-ready)
\`\`\`python
def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Clean DataFrame with logging and metrics."""
    initial_rows = len(df)
    metrics = {}

    # 1. Fix types
    df['age'] = pd.to_numeric(df['age'], errors='coerce')
    df['signup_date'] = pd.to_datetime(df['signup_date'], errors='coerce')

    # 2. Standardize text BEFORE dedup (catches case-only duplicates)
    df['email'] = df['email'].str.lower().str.strip()
    df['name'] = df['name'].str.strip().str.title()

    # 3. Drop exact duplicates
    metrics['duplicates'] = df.duplicated().sum()
    df = df.drop_duplicates()

    # 4. Handle missing
    df['age'] = df['age'].fillna(df['age'].median())
    df['city'] = df['city'].fillna('UNKNOWN')

    # 5. Cap outliers (Winsorize at 1st and 99th percentile)
    df['age'] = df['age'].clip(0, 120)
    df['income'] = df['income'].clip(
        df['income'].quantile(0.01),
        df['income'].quantile(0.99)
    )

    # 6. Validate
    assert df['email'].str.contains('@').all(), "Invalid emails detected"
    metrics['rows_removed'] = initial_rows - len(df)
    metrics['final_rows'] = len(df)

    return df, metrics
\`\`\`

## Case study thật

### Airbnb — Data Cleaning Pipeline
- 100M+ listings/booking events/ngày
- Pipeline phát hiện: **5% bookings có price = 0** (lỗi UI), **3% reviews là duplicate** (user re-submit)
- Áp dụng **Great Expectations** + custom Spark UDF để validate trước khi vào warehouse
- Kết quả: giảm **40% complaint** từ data scientists về data quality

### Uber — Surge Pricing và outlier
- Surge pricing 1.0× - 5.0× là **valid outlier** (không được "clean" đi!)
- Năm 2014, một intern viết script clean outlier price → xóa toàn bộ surge data → revenue model dự báo sai $2M/ngày trong 1 tuần

→ **Bài học:** outlier domain-specific phải hỏi business trước khi xóa.

## Best practices
1. **Log mọi cleaning step** — số rows trước/sau, % missing, # outliers
2. **Standardize text TRƯỚC dedup** — bắt được case-only duplicates
3. **Validate sau cleaning** — assert business rules (email có @, age ≥0)
4. **Tách raw vs cleaned table** — không bao giờ ghi đè raw
5. **Version control cleaning logic** — bug có thể trở lại sau 6 tháng
6. **Sample check thủ công** — random 100 rows xem có "trông đúng" không
7. **Dùng tools chuyên dụng**: **Great Expectations**, **dbt tests**, **Pandera** cho validation

## Anti-patterns (tránh!)
- ❌ \`df.fillna(0)\` cho TẤT CẢ cột — biến NULL date thành 1970, NULL category thành "0"
- ❌ \`df.dropna()\` không có \`subset\` — mất 80% data vì 1 cột có 50% null
- ❌ Xóa outlier mà không hỏi domain expert → mất data quan trọng
- ❌ Clean trong production query — làm chậm dashboard, lặp lại mỗi lần query
- ❌ Không log cleaning → không trace được khi data warehouse có anomaly

## Khi nào nên / không nên clean
**Nên clean ở pipeline:** trước khi vào warehouse (single source of truth)
**Không nên clean ở dashboard:** chậm, lặp lại, không reproducible
**Cleaning ở source nếu được:** sửa form validation thay vì clean sau

## Bridge sang bài tiếp
Sau khi biết cách làm sạch, bài kế (**Data Ingestion**) sẽ học cách **lấy dữ liệu vào** từ nhiều nguồn (CSV, JSON, API, DB) — bước đầu tiên trước khi cleaning.`,
        theoryEn: `**Data Cleaning** is the most time-consuming step in any data pipeline — Anaconda's 2023 survey shows data professionals spend **60-80% of their time** on it. **Garbage in, garbage out** — dirty data leads to wrong analysis, broken ML models, and bad business decisions.

## Why this matters — IBM Watson Health
IBM invested **$5B** in Watson for Oncology but shut it down in 2018 because the model recommended wrong treatments. Root cause: **training data not cleaned** — different hospitals encoded "tumor stage" differently (1, I, Stage I, stage_1…), missing values defaulted to 0, dates not normalized to timezone. **One cleaning failure = $5B lost.**

## 6 types of dirty data
1. Missing values (NaN, None, '', 'N/A', '-')
2. Duplicates
3. Outliers
4. Inconsistent formatting ("New York" vs "new york" vs "NY")
5. Wrong types (date as string, number as text)
6. Invalid values (age=-5, birth_date=2050)

## 1. Detect missing values
\`\`\`python
df.isnull().sum()                       # NULL count per column
df.isnull().sum() / len(df) * 100       # % missing per column

import missingno as msno
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

## MCAR / MAR / MNAR — you MUST understand
**NEVER** fill NULLs blindly. Understand WHY they're missing:

| Type | Definition | Example | Strategy |
|------|-----------|---------|----------|
| MCAR | Pure random | Sensor random failure | Safe to drop/impute |
| MAR | Depends on observed columns | Men answer fewer emotion questions | Impute by group |
| MNAR | Depends on missing value itself | High earners hide income | **DANGER** — imputation = bias |

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

## 3. Detect outliers — 3 methods

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
    metrics = {}
    df['age'] = pd.to_numeric(df['age'], errors='coerce')
    df['email'] = df['email'].str.lower().str.strip()
    metrics['duplicates'] = df.duplicated().sum()
    df = df.drop_duplicates()
    df['age'] = df['age'].fillna(df['age'].median()).clip(0, 120)
    df['income'] = df['income'].clip(df['income'].quantile(0.01), df['income'].quantile(0.99))
    assert df['email'].str.contains('@').all(), "Invalid emails"
    return df, metrics
\`\`\`

## Real-world cases

### Airbnb — Data Cleaning Pipeline
- 100M+ listings/booking events/day
- Found 5% bookings with price=0 (UI bug), 3% duplicate reviews
- Used Great Expectations + Spark UDF for validation
- Result: 40% fewer data quality complaints

### Uber — Surge pricing outlier disaster
- Surge pricing 1.0× - 5.0× is **legitimate outlier** (don't clean!)
- 2014: an intern's outlier-cleaning script removed surge data → revenue forecast off by $2M/day for a week

→ Lesson: domain-specific outliers need business approval before removal.

## Best practices
1. Log every step (rows before/after, % missing, # outliers)
2. Standardize text BEFORE dedup (catches case-only dupes)
3. Validate after cleaning (asserts on business rules)
4. Separate raw vs cleaned tables — never overwrite raw
5. Version control cleaning logic
6. Manual sample check (random 100 rows)
7. Use proper tools: **Great Expectations**, **dbt tests**, **Pandera**

## Anti-patterns
- ❌ \`df.fillna(0)\` for ALL columns — turns NULL dates into 1970
- ❌ \`df.dropna()\` without subset — loses 80% of data because of one bad column
- ❌ Removing outliers without domain expert input
- ❌ Cleaning in dashboard query — slow, repeated, not reproducible
- ❌ No logging — can't trace anomalies later

## When to clean
**At pipeline:** before warehouse (single source of truth)
**Not at dashboard:** slow and not reproducible
**At source if possible:** fix form validation instead of cleaning later

## Bridge to next
After learning to clean, the next lesson (**Data Ingestion**) covers HOW to get data in from various sources (CSV, JSON, API, DB) — the first step before cleaning.`,
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
        theory: `**Data Ingestion** là quá trình thu thập dữ liệu từ nhiều nguồn khác nhau và đưa vào platform của bạn. Đây là chữ **"E" (Extract)** trong ETL/ELT — bước đầu tiên và quan trọng nhất của mọi data pipeline. Một con số ấn tượng: **70% sự cố pipeline production xảy ra ở khâu ingestion** (báo cáo của Monte Carlo Data 2024) — vì đây là điểm tiếp xúc với "thế giới ngoài kiểm soát".

## Vì sao Ingestion là điểm yếu nhất?
Ingestion phải đối mặt với:
- **Source schema thay đổi** không báo trước (Salesforce update field)
- **Network instability** (API timeout, DB connection drop)
- **Rate limit** (Stripe API: 100 req/sec, Twitter: 300 req/15min)
- **Data format không nhất quán** (CSV với delimiter khác nhau, JSON nested vs flat)
- **Volume spike** (Black Friday: 10× traffic bình thường)

→ Pipeline ingestion phải **resilient, observable, idempotent** — không thì pipeline downstream chết theo.

## Các loại nguồn dữ liệu phổ biến

| Loại nguồn | Format | Tool | Use case |
|------------|--------|------|----------|
| Flat files | CSV, TSV, fixed-width | \`pd.read_csv()\`, csv module | Export từ legacy system |
| Semi-structured | JSON, XML, YAML | \`pd.read_json()\`, json | API response, config |
| Spreadsheets | Excel, Google Sheets | \`pd.read_excel()\`, gspread | Data nhập tay từ business |
| **Databases (full)** | PostgreSQL, MySQL, MongoDB | \`pd.read_sql()\`, SQLAlchemy | One-time backfill |
| **Databases (CDC)** | Postgres binlog, MySQL binlog | Debezium, AWS DMS | Real-time replication |
| **REST API** | JSON over HTTPS | requests, httpx | SaaS data (Stripe, Salesforce) |
| **GraphQL API** | typed query | gql, requests | Modern APIs (Shopify, GitHub) |
| **Streaming** | Avro, Protobuf | kafka-python, confluent-kafka | Event data, IoT |
| **Cloud storage** | Parquet, ORC, JSON | boto3, gcs, azure-blob | Data lake |
| **Webhooks** | JSON push | FastAPI, Lambda | Real-time event (Slack, GitHub) |

## 1. Đọc CSV — định dạng phổ biến nhất

CSV nhìn đơn giản nhưng **chứa rất nhiều cạm bẫy** trong production:
\`\`\`python
df = pd.read_csv('data.csv',
    encoding='utf-8',                    # tránh UnicodeDecodeError với data tiếng Việt/Trung
    sep=',',                             # delimiter (dùng '\\t' cho TSV, '|' cho data từ banking)
    header=0,                            # row chứa header (0-based); None nếu không có header
    skiprows=2,                          # bỏ qua 2 dòng đầu (thường là metadata)
    na_values=['', 'N/A', '-', 'NULL', 'NaN'],  # treat as NULL
    dtype={'id': str, 'price': 'float32'},  # ép type → tiết kiệm RAM
    parse_dates=['created_at', 'updated_at'],  # tự parse date
    date_format='%Y-%m-%d %H:%M:%S',     # nếu format không chuẩn ISO
    chunksize=50000,                     # đọc theo chunk cho file >1GB
    low_memory=False,                    # đọc 1 lần (vs đoán dtype theo chunk)
    on_bad_lines='warn',                 # 'skip' / 'warn' / 'error' khi có dòng lỗi
    quotechar='"',                       # ký tự quote
    escapechar='\\\\'                    # ký tự escape
)
\`\`\`

**Cạm bẫy thường gặp:**
- File 10GB không có \`chunksize\` → OOM
- Không set \`dtype\` → Pandas đoán nhầm (id thành float vì có ID = 12345.0)
- File từ Excel xuất ra có **BOM** (\`\\ufeff\`) → cột đầu lỗi → \`encoding='utf-8-sig'\`
- Date format Mỹ (\`MM/DD/YYYY\`) vs EU (\`DD/MM/YYYY\`) → parse sai

## 2. Đọc JSON — flat vs nested

\`\`\`python
# Flat JSON (1 row 1 record)
df = pd.read_json('data.json')

# Nested JSON từ API
import json
with open('data.json') as f:
    raw = json.load(f)

# json_normalize: flatten nested structure
df = pd.json_normalize(
    raw['data'],
    record_path=['orders', 'items'],     # path đến array cần flatten
    meta=['order_id', ['customer', 'name']],  # giữ field từ parent
    sep='_'                              # 'customer.name' → 'customer_name'
)
\`\`\`

## 3. Đọc từ API — production-grade pattern

\`\`\`python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Session với retry tự động
session = requests.Session()
retry = Retry(
    total=5,                              # tối đa 5 lần retry
    backoff_factor=2,                     # 2, 4, 8, 16, 32 seconds
    status_forcelist=[429, 500, 502, 503, 504]  # retry các status này
)
session.mount('https://', HTTPAdapter(max_retries=retry))

# Gọi với timeout, auth, pagination
all_data = []
page = 1
while True:
    response = session.get(
        'https://api.example.com/data',
        headers={'Authorization': f'Bearer {TOKEN}'},
        params={'page': page, 'per_page': 100},
        timeout=(5, 30)                  # (connect, read) timeout
    )
    response.raise_for_status()           # raise nếu status >= 400
    data = response.json()
    if not data['items']:
        break
    all_data.extend(data['items'])
    page += 1

df = pd.DataFrame(all_data)
\`\`\`

## 4. Đọc từ Database — chunked + parameterized

\`\`\`python
from sqlalchemy import create_engine

engine = create_engine('postgresql://user:pass@host:5432/db', pool_size=5)

# ĐÚNG: parameterized query (an toàn SQLi)
df = pd.read_sql(
    "SELECT * FROM users WHERE created_at > %s",
    engine,
    params=(start_date,),
    chunksize=10000                      # đọc theo chunk
)

# Nếu cần all-in-one
all_chunks = []
for chunk in df:
    all_chunks.append(chunk)
df_full = pd.concat(all_chunks, ignore_index=True)
\`\`\`

## Xử lý File Lớn — 3 chiến lược

### Chunked reading (đơn giản nhất)
\`\`\`python
chunks = pd.read_csv('huge_file.csv', chunksize=50000)
total = 0
for chunk in chunks:
    chunk_clean = clean(chunk)
    total += len(chunk_clean)
    chunk_clean.to_parquet(f'output/chunk_{total}.parquet')
\`\`\`

### Chuyển sang Parquet (columnar, nén tốt 10×)
\`\`\`python
# CSV 10GB → Parquet 1-2GB, query nhanh hơn 5-10×
df = pd.read_csv('huge.csv')
df.to_parquet('huge.parquet', engine='pyarrow', compression='snappy')
\`\`\`

### Dùng Polars / Dask (out-of-core)
\`\`\`python
# Polars: nhanh hơn Pandas 5-30× cho file lớn
import polars as pl
df = pl.scan_csv('huge.csv').filter(pl.col('age') > 18).collect()
\`\`\`

## Schema Validation — Trust But Verify

Source data **CÓ THỂ THAY ĐỔI BẤT KỲ LÚC NÀO**. Pipeline phải fail-fast khi schema lệch:

\`\`\`python
import pandera as pa

schema = pa.DataFrameSchema({
    "id": pa.Column(int, unique=True, nullable=False),
    "email": pa.Column(str, pa.Check.str_matches(r'^[\\w.+-]+@[\\w.-]+\\.\\w+$')),
    "age": pa.Column(int, pa.Check.in_range(0, 120)),
    "signup_date": pa.Column(pa.DateTime, pa.Check.le(pd.Timestamp.now())),
})

# Validate, raise SchemaError nếu fail
df_validated = schema.validate(df, lazy=True)  # lazy=True: gom tất cả lỗi
\`\`\`

## Bảng so sánh tools ingestion

| Tool | Best for | Pricing |
|------|----------|---------|
| **Custom Python** | Edge cases, full control | Dev time |
| **Fivetran** | SaaS connectors (300+) | $$$ per row |
| **Airbyte (OSS)** | Self-host SaaS connectors | Free + infra |
| **AWS DMS** | DB CDC vào AWS warehouse | $$ per hour |
| **Debezium** | DB CDC open-source vào Kafka | Free + infra |
| **Stitch** | Simple SaaS → warehouse | $ per row |
| **Hevo** | No-code, SaaS-friendly | $$ per row |

→ Quy tắc: **buy SaaS connectors, build custom cho edge cases**. Đừng tự build connector Salesforce — đã có 1000 team thất bại.

## Case study thật

### Stripe — Webhook ingestion ở scale
- **3+ tỷ webhook events/tháng** từ payment, subscription, dispute
- Stack: webhook → API Gateway → SQS → Lambda → S3 (raw) → Snowflake
- **At-least-once delivery** với idempotency key tránh duplicate
- Retention raw S3: 7 năm (compliance)

### Shopify — Multi-source aggregation
- Ingest từ: Shopify orders DB, Stripe payments, Mailchimp emails, Google Analytics, Facebook Ads
- 50+ pipelines chạy bằng **Airflow** + **Fivetran** + custom Python
- Schema registry **Confluent Schema Registry** cho streaming events
- Cost monitoring: alert khi 1 source ingest >$1000/day

### GitHub — Webhook + REST polling hybrid
- Real-time events (push, PR, issue) qua webhook
- Backfill historical data qua REST API với pagination
- Rate limit handling: respect \`X-RateLimit-Remaining\` header, exponential backoff khi 429

## Best practices
1. **Log metadata** sau mỗi run: row count, columns, file size, source timestamp, pipeline version
2. **Idempotent loads** — re-run không tạo duplicate (dùng MERGE, không INSERT)
3. **Incremental loading** — chỉ ingest data mới (theo \`updated_at\` hoặc CDC)
4. **Error handling** — try/except + dead-letter queue cho data lỗi, alert lên PagerDuty
5. **Data lineage** — track source/timestamp/pipeline_version cho mỗi record
6. **Schema validation** — Pandera/Great Expectations fail-fast khi schema lệch
7. **Rate limit respect** — đừng làm sập API source (anti-pattern: gọi 10000 req/sec không có throttle)
8. **Secrets management** — dùng AWS Secrets Manager, Vault — KHÔNG hardcode
9. **Test với sample data** trước khi chạy full pipeline (prevent $1000 bill từ BigQuery query lỗi)

## Anti-patterns (tránh!)
- ❌ \`pd.read_csv(huge_file)\` không có chunksize → OOM
- ❌ \`SELECT * FROM big_table\` không LIMIT → load 100GB vào RAM
- ❌ Không retry khi API 503 → 1 lỗi tạm thời = pipeline fail
- ❌ Hardcode API key trong code → leak qua Git
- ❌ Không có alert khi ingest fail → phát hiện sau 3 ngày
- ❌ Ingest cùng data 2 lần (không idempotent) → duplicate report cho CEO
- ❌ Bỏ qua rate limit → bị API ban IP

## Khi nào dùng pull vs push
**Pull (polling)**: bạn chủ động query (REST API, DB query) — đơn giản, có thể chậm
**Push (webhook/streaming)**: source chủ động gửi (webhook, Kafka) — real-time, phức tạp hơn

## Bridge sang bài tiếp
Sau khi extract data thành công, bài kế (**ETL Pipeline Design**) sẽ học cách orchestrate **toàn bộ flow** từ extract → transform → load với Airflow, idempotency, và monitoring.`,
        theoryEn: `**Data Ingestion** = collecting data from various sources into your platform. It's the **"E" (Extract)** step in ETL/ELT — the first and most critical of any data pipeline. Eye-opening stat: **70% of production pipeline incidents happen at ingestion** (Monte Carlo Data 2024) — because it's the contact point with "the world outside your control".

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

## 1. Reading CSV — production tricks

\`\`\`python
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

## 2. Reading JSON — flat vs nested
\`\`\`python
df = pd.json_normalize(
    raw['data'],
    record_path=['orders', 'items'],
    meta=['order_id', ['customer', 'name']],
    sep='_'
)
\`\`\`

## 3. API ingestion — production pattern
\`\`\`python
session = requests.Session()
retry = Retry(total=5, backoff_factor=2, status_forcelist=[429,500,502,503,504])
session.mount('https://', HTTPAdapter(max_retries=retry))

all_data = []
page = 1
while True:
    r = session.get(url, headers={'Authorization': f'Bearer {TOKEN}'},
                    params={'page': page, 'per_page': 100}, timeout=(5, 30))
    r.raise_for_status()
    data = r.json()
    if not data['items']: break
    all_data.extend(data['items'])
    page += 1
\`\`\`

## 4. Database — chunked + parameterized
\`\`\`python
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
import pandera as pa
schema = pa.DataFrameSchema({
    "id": pa.Column(int, unique=True),
    "email": pa.Column(str, pa.Check.str_matches(r'^[\\w.+-]+@[\\w.-]+\\.\\w+$')),
    "age": pa.Column(int, pa.Check.in_range(0, 120)),
})
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

### Stripe — Webhook ingestion at scale
- 3B+ webhook events/month
- Stack: webhook → API Gateway → SQS → Lambda → S3 raw → Snowflake
- At-least-once delivery + idempotency key
- 7-year S3 raw retention (compliance)

### Shopify — Multi-source
- 50+ pipelines via Airflow + Fivetran + custom Python
- Confluent Schema Registry for streaming
- Cost alerts when source ingest >$1000/day

### GitHub — Hybrid webhook + REST
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
**Pull**: you query (REST, DB query) — simple, can lag
**Push**: source pushes (webhook, Kafka) — real-time, more complex

## Bridge to next
After successful extraction, the next lesson (**ETL Pipeline Design**) covers orchestrating the **full flow** from extract → transform → load with Airflow, idempotency, and monitoring.`,
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
        theory: `**Dimensional Modeling**, pioneered by Ralph Kimball in the 1990s, is still the dominant paradigm for designing analytical data warehouses. It separates the world into two kinds of tables: **facts** (the events that happened) and **dimensions** (the descriptive context around those events). Almost every BI dashboard you have ever used — Looker, Tableau, Power BI, Metabase — is optimized to read from a dimensional model.

## Why this matters in production

Data engineers spend more time fixing badly-modeled warehouses than building new pipelines. A poor model causes slow dashboards, conflicting metrics across teams, and impossible audit trails. A *good* model, on the other hand, lets a non-technical PM answer "what was revenue per region last quarter?" with a single drag-and-drop in the BI tool — no SQL, no engineering ticket. This is the dividing line between a data team that **scales** and one that becomes a bottleneck.

When Spotify rebuilt its analytics layer in 2018, the single biggest investment was *not* a new query engine — it was rewriting hundreds of ad-hoc SQL queries into a clean star-schema layer the entire company could share.

## Fact tables — the "what"

Fact tables store the **measurable events** of the business. Each row is one occurrence:

- A sale (\`fact_sales\`): one row per line item.
- A page view (\`fact_pageviews\`): one row per impression.
- A shipment (\`fact_shipments\`): one row per package.

Key properties:

- **Quantitative measures**: revenue, quantity, duration, cost, latency.
- **Foreign keys** to dimension tables (\`product_key\`, \`customer_key\`, \`date_key\`).
- **Very large** (often billions of rows) — they grow every minute the business runs.

Three flavors of facts you must distinguish:

| Type | Can be summed across | Example |
|---|---|---|
| **Additive** | All dimensions | revenue, quantity sold |
| **Semi-additive** | Some dimensions | account balance (sum across accounts ✓, across time ✗) |
| **Non-additive** | None — must recalculate | conversion rate, profit margin |

Misclassifying a non-additive fact (say, summing percentages) is the #1 cause of "the dashboard says one thing but finance says another."

## Dimension tables — the "context"

Dimensions answer **who, what, where, when, how**. They are smaller than facts but much **wider**: a \`dim_customer\` might have 80+ columns (segment, lifetime value bucket, acquisition channel, country, signup date…). Wider dimensions = richer slicing in BI tools.

Common dimensions every warehouse has:

- \`dim_date\` — pre-populated calendar (every day from 2000 → 2050) with \`is_weekend\`, \`is_holiday\`, \`fiscal_quarter\`, \`week_of_year\`.
- \`dim_customer\`, \`dim_product\`, \`dim_store\`, \`dim_employee\`.

The "wide and denormalized" rule of thumb is intentional — joins are expensive at scale, so we trade a little storage for a lot of speed.

## Star vs Snowflake — pick your trade-off

**Star schema** keeps each dimension as one denormalized table:

\`\`\`
         dim_product
              |
dim_date — fact_sales — dim_customer
              |
         dim_store
\`\`\`

**Snowflake schema** normalizes dimensions into sub-tables:

\`\`\`
dim_date — fact_sales — dim_product → dim_category → dim_department
                     ↘ dim_customer → dim_city → dim_country
\`\`\`

| Aspect | Star | Snowflake |
|---|---|---|
| Query speed | ⚡ Faster (fewer JOINs) | 🐢 Slower (chain of JOINs) |
| Storage | 📦 More (redundant attributes) | 💾 Less |
| BI tool friendliness | ✅ Excellent | ⚠️ Many tools struggle |
| Business-user clarity | ✅ Intuitive | ❌ Requires modeling knowledge |
| Default recommendation | **Yes** | Only if storage is critical |

In practice **>90% of modern warehouses ship star schemas**. Storage costs on Snowflake/BigQuery are tiny compared to engineer time spent debugging seven-table JOINs.

## Slowly Changing Dimensions (SCD)

The hardest question in modeling is: *what happens when a dimension changes?* If a customer moves from Hanoi to Saigon, do historical sales still belong to Hanoi or get retroactively re-attributed to Saigon? Both answers are valid — but you must pick one and stay consistent.

| SCD Type | Behavior | When to use |
|---|---|---|
| **Type 0** | Never change | Birthdate, signup country |
| **Type 1** | Overwrite (lose history) | Typo fixes, email updates |
| **Type 2** | New row + valid_from / valid_to / is_current | Customer city, product price tier — **most common** |
| **Type 3** | Add a "previous value" column | Limited history (one prior value only) |

A canonical SCD Type 2 row:

\`\`\`
customer_key | name | city  | valid_from | valid_to   | is_current
1001         | An   | Hanoi | 2023-01-01 | 2024-06-30 | false
1002         | An   | HCMC  | 2024-07-01 | NULL       | true
\`\`\`

Notice the **surrogate key changes** while the natural ID (\`customer_id = 'C-007'\`) stays the same. This is what allows historic facts to keep pointing at the right *version* of the customer.

## Case study #1 — Airbnb's "Minerva" metrics layer

In 2021 Airbnb published its metrics framework "Minerva." It is essentially a giant, governed star-schema layer: ~3,000 metrics defined on top of a few hundred fact + dimension tables. Before Minerva, every team had its own definition of "active host." After Minerva, *one* SQL definition powered every dashboard, every email, every ML feature. The investment in clean dimensional modeling paid back the moment the CEO and the data scientist agreed on the same number in the same meeting.

## Case study #2 — when bad modeling becomes a P0 incident

A large fintech (publicly retold by an ex-employee on the *Data Engineering Podcast*) had a single fact table that mixed transaction events, refund events, and chargeback events with a "type" column. The grain was inconsistent: refunds had negative amounts, chargebacks had positive amounts but in a different currency convention. A finance dashboard summed everything naively and reported $40M of "extra" revenue. It took 3 weeks and a board-level apology to unwind. The fix was textbook Kimball: split into three fact tables, each with one consistent grain.

## Best practices

- **Declare the grain first.** "One row = one ___." If you can't finish that sentence, stop modeling.
- **Use surrogate keys** on dimensions (auto-generated integers), not natural keys from source systems.
- **Conform dimensions** across fact tables: \`dim_date\` and \`dim_customer\` should be the *same* table reused everywhere.
- **Pre-populate \`dim_date\`** through 2050 — never derive date attributes in queries.
- **Keep facts thin and tall**, dimensions wide and short.
- **Document additivity** in column comments — future you will thank current you.

## Anti-patterns & bridge to next lesson

Avoid: a single "god" fact table with 200 columns; storing computed ratios in fact tables (compute them at query time); using natural keys as primary keys (breaks SCD Type 2); modeling a transactional system "as-is" into the warehouse.

In the next lesson on **Data Warehousing & OLAP**, we will see how warehouses like Snowflake and BigQuery physically store these star schemas in a columnar format that makes scanning billions of fact-table rows fast enough for interactive dashboards.`,
        theoryEn: `**Dimensional Modeling**, pioneered by Ralph Kimball, organizes warehouses into **facts** (measurable events) and **dimensions** (descriptive context). Almost every BI tool is optimized for it.

## Why this matters in production

Bad models cause slow dashboards, metric disagreements, and engineer bottlenecks. Good models let non-technical users self-serve. Spotify and Airbnb have both publicly credited dimensional modeling for scaling their analytics teams.

## Fact tables — the "what"

One row = one event (a sale, a page view). Contains quantitative measures + foreign keys to dimensions. Three additivity types:

| Type | Summable across | Example |
|---|---|---|
| Additive | All dimensions | revenue |
| Semi-additive | Some | account balance |
| Non-additive | None | conversion rate |

## Dimension tables — the "context"

Wide and denormalized. Contain who/what/where/when. Common: \`dim_date\`, \`dim_customer\`, \`dim_product\`. Pre-populate \`dim_date\` so you never compute calendar attributes in queries.

## Star vs Snowflake

| Aspect | Star | Snowflake |
|---|---|---|
| Speed | Faster | Slower |
| Storage | More | Less |
| BI friendliness | Excellent | Often poor |
| Default? | **Yes** | Only when storage is critical |

>90% of modern warehouses ship star schemas — storage is cheap, engineer time is not.

## Slowly Changing Dimensions (SCD)

How dimension changes are tracked:

- **Type 0** never changes (birthdate).
- **Type 1** overwrites (typo fix).
- **Type 2** adds a new row with \`valid_from / valid_to / is_current\` — full history, most common.
- **Type 3** adds a "previous value" column.

## Case study — Airbnb Minerva

Airbnb's Minerva metrics layer is a governed star schema serving ~3,000 metrics from a few hundred tables. Before it, every team had its own "active host" definition; after it, one SQL definition powered every dashboard.

## Case study — a fintech failure

A fintech mixed transactions, refunds, and chargebacks in one fact table with inconsistent grain. A naive sum reported $40M of phantom revenue. Fix: split into three fact tables, one consistent grain each.

## Best practices

Declare the grain first; use surrogate keys; conform shared dimensions; thin tall facts, wide short dimensions; document additivity.

## Anti-patterns & next lesson

Avoid god-fact-tables, storing ratios in facts, and using natural keys as primary keys. Next: **Data Warehousing & OLAP** — how Snowflake/BigQuery physically store these models.`,
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
        theory: `A **data warehouse** is a database engineered for analytical queries: large scans, aggregations, joins across billions of rows. It is fundamentally different from the OLTP databases that run your application. Confusing the two is the #1 reason analytics projects fail in their first year.

## Why this matters in production

When a startup hits ~50 employees, someone always asks: *"Can we just run our reports off the production Postgres?"* The answer is "yes, until the day a quarterly board report locks the orders table for 4 minutes during checkout." Warehouses exist precisely to keep analytics from breaking transactions, and to make analytics fast enough to be interactive instead of overnight batch.

Every modern data team relies on at least one of: Snowflake, BigQuery, Redshift, Databricks SQL, ClickHouse, DuckDB. The architectural ideas below explain *why* they all look surprisingly similar.

## OLTP vs OLAP — two different worlds

| Aspect | OLTP (Postgres, MySQL) | OLAP (Snowflake, BigQuery) |
|---|---|---|
| Purpose | Run the business | Analyze the business |
| Workload | Many small writes | Few large reads |
| Query pattern | "Get user 42's last order" | "Avg order value per region per month over 3 years" |
| Rows touched per query | 1–100 | Millions–billions |
| Storage layout | Row-oriented | **Column-oriented** |
| Concurrency | Thousands of users | Tens of analysts |
| Schema | Highly normalized (3NF) | Denormalized star schema |

The two-sentence summary: **OLTP optimizes for finding one needle in the haystack; OLAP optimizes for measuring the whole haystack.**

## Columnar storage — the secret sauce

Row-store (OLTP): all columns of one row are stored together on disk.
Column-store (OLAP): all values of one *column* are stored together.

Why columnar wins for analytics:

- A query like \`SELECT AVG(amount) FROM fact_sales WHERE year = 2024\` only needs **two columns** out of 50. Columnar reads ~4% of the bytes a row store would.
- Column data is highly compressible (often 10× — same data type, similar values, sorted).
- Modern CPUs can vectorize operations on tightly-packed columns (SIMD).

This is why Snowflake/BigQuery can scan 10 TB in 30 seconds while Postgres would take hours.

## Cloud warehouse architecture

All modern cloud warehouses share the same trick: **separation of storage and compute**.

- Storage: cheap object storage (S3, GCS) — \`$23/TB/month\`.
- Compute: ephemeral clusters that spin up on demand — pay only for the seconds they run.
- Metadata service: a global catalog tracking which files belong to which table.

Consequences:

1. You can run **two queries on the same data with two different cluster sizes** — one for analysts, one for batch ETL — without conflict.
2. Auto-scaling: spike to 100 nodes for a complex query, drop to zero overnight.
3. You can clone a 10 TB table in **0 seconds** (metadata-only "zero-copy clone") — game-changing for dev/test environments.

## Comparison: the four big warehouses

| Warehouse | Pricing model | Strengths | Watch-outs |
|---|---|---|---|
| **Snowflake** | Per-second compute + storage | UX, zero-copy clone, sharing | Cost can explode without governance |
| **BigQuery** | Per-TB scanned (or slots) | Serverless, ML built-in | Surprise bills if no \`SELECT\` discipline |
| **Redshift** | Provisioned clusters | Tight AWS integration | Manual sizing, vacuums |
| **Databricks SQL** | Per-DBU (cluster) | Best for lakehouse + ML | Complex pricing, learning curve |

The boring truth: pick whichever your cloud provider already runs and your team can hire for. The performance differences are smaller than the operational ones.

## Case study #1 — Capital One on Snowflake

Capital One famously migrated from on-prem Teradata (8-figure annual contract, fixed capacity) to Snowflake. The win was not raw speed — it was *elasticity*. Quarterly stress-test workloads that used to take 3 weeks of capacity planning now ran on a temporary 2-hour cluster. They cut their analytics infrastructure cost ~40% while *increasing* throughput.

## Case study #2 — the "$700 SELECT *" on BigQuery

A junior analyst at an early-stage startup ran \`SELECT * FROM events\` against a 70 TB partitioned table because they wanted to "look around." BigQuery scanned the entire table at $5/TB → a single query cost $350 (run twice = $700). The lesson is structural: BigQuery's pricing makes \`SELECT *\` literally a wallet attack. Mature teams enforce table partitioning, require \`WHERE\` clauses on partition columns, and set per-user query quotas.

## Best practices

- **Partition large fact tables by date** (\`PARTITION BY date_trunc('day', event_ts)\`) so queries skip 99% of files.
- **Cluster / sort by the most-filtered column** (often \`customer_id\` or \`country\`).
- Tag every query with a \`-- team:growth, dashboard:weekly_kpis\` comment so cost can be attributed.
- Use **materialized views** for the top 10 most-expensive recurring queries.
- **Separate workloads onto separate warehouses/clusters** — never let a 6-hour ML training job share compute with the CEO's morning dashboard.
- Set **resource monitors / budget alerts** in week one, not after the first surprise invoice.

## Anti-patterns & bridge to next lesson

Avoid: scanning unpartitioned tables; running OLTP-style point lookups in a warehouse; ignoring storage tiering; granting everyone the largest warehouse size; treating warehouse cost as "infra's problem" instead of a per-team budget.

Next lesson tackles **Batch vs Streaming**: once you have a great warehouse, the next architectural decision is *how fresh* the data inside it needs to be — minutes, hours, or sub-second.`,
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

## Case study — Capital One

Migrated from on-prem Teradata to Snowflake. Won on elasticity, not speed. Cut infra ~40% while throughput grew.

## Case study — $700 SELECT *

A junior at a startup ran \`SELECT *\` on a 70 TB BigQuery table — twice. $700 bill. Mature teams enforce partition filters and per-user quotas.

## Best practices

Partition by date; cluster on common filter columns; use materialized views for top recurring queries; isolate workloads; set budget alerts in week one.

## Anti-patterns & next lesson

Avoid unpartitioned scans, OLTP-style point lookups, shared warehouses for ML + dashboards. Next: **Batch vs Streaming** — how fresh does the data need to be?`,
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
        theory: `Every modern data system makes one fundamental choice: **process data in batches** (every hour, every night) or **process events as they arrive** (sub-second). The choice cascades into everything — the technologies, the team skills, the cost, even the way business stakeholders think about "now."

## Why this matters in production

Streaming sounds sexy ("real-time data!"), but most companies do not actually *need* it. A daily revenue report does not need streaming. A fraud-detection system absolutely does. Picking streaming when batch would do is one of the most expensive over-engineering mistakes a data team can make: 5–10× the operational complexity, 24/7 on-call, and infrastructure bills that scale with throughput, not with value.

The core question: *what is the cost of being one minute late vs one hour late vs one day late?*

## Batch processing — the workhorse

Batch jobs collect data over a period (an hour, a day) and process it in a single pass.

- Tools: Airflow + Spark, dbt, Snowflake tasks, AWS Glue, BigQuery scheduled queries.
- Latency: minutes to hours.
- Throughput: enormous (TBs per job).
- Cost: low — you pay only when jobs run.
- Recovery: easy — just re-run yesterday's job.

90% of analytics work in the world is batch. dbt is the de-facto standard for batch transformations in 2024–2025.

## Streaming processing — the live wire

Streaming systems process events one at a time (or in tiny micro-batches) as they arrive.

- Tools: Kafka + Flink, Spark Structured Streaming, Kinesis, Pulsar, Materialize, RisingWave.
- Latency: milliseconds to seconds.
- Throughput: high but expensive per byte.
- Cost: 24/7 running clusters even when traffic is low.
- Recovery: hard — replaying state requires careful design.

## How streaming actually works — three concepts you must know

**1. Event time vs processing time.** Events have a timestamp from when they *happened*. They arrive at the processor at a different — usually later — time. A user offline for 2 hours uploads 50 events at once: event time spans 2 hours, processing time spans 1 second.

**2. Windowing.** "Average orders per minute" needs a definition of *which minute*. Three common windows:

- **Tumbling**: fixed, non-overlapping (every 1-minute bucket).
- **Sliding**: fixed-size but advancing every N seconds (last 1 minute, recomputed every 10 s).
- **Session**: dynamic — closes when there's a gap in user activity.

**3. Watermarks.** A promise: "I will not process any event older than X." Defines when a window is *closed* and ready to emit. Late data after the watermark is dropped or routed to a side output.

## Trade-off table

| Aspect | Batch | Streaming |
|---|---|---|
| Latency | Hours | Sub-second |
| Cost | $ | $$$$ |
| Operational complexity | Low | Very high |
| Backfill / replay | Trivial (\`re-run\`) | Hard (must replay state) |
| Best for | Reports, ML training | Fraud, alerts, live dashboards |
| Team skill needed | SQL / Python | Distributed systems |

## Lambda vs Kappa architectures

**Lambda** runs *both* a batch and a streaming pipeline in parallel. Streaming gives a fast (but approximate) view; batch gives the eventually-correct view; the serving layer reconciles them. Powerful but requires maintaining two codebases for the same logic — most teams come to hate this.

**Kappa** runs a single streaming pipeline; backfills are done by replaying the event log from the start. Simpler, single source of truth, but only feasible if your event log is durable (Kafka with infinite retention) and your stream processor can replay.

The 2020s consensus: prefer **Kappa-style with a streaming engine** + **dbt batch on top of the warehouse** for analytical aggregates.

## Case study #1 — Uber's marketplace

Uber matches riders to drivers in **<5 seconds**, computes surge pricing in **<10 seconds**, and runs financial reconciliation **once a day**. Same data, three latency tiers. Their architecture: Kafka for the event spine, Flink for streaming aggregates (surge, ETAs), and Hive/Presto for batch (financial close, A/B test reads). They publicly described this in the "uReplicator" and "Athena" blog posts (2017–2019).

## Case study #2 — when streaming was the wrong choice

A mid-sized e-commerce company built a streaming pipeline (Kafka + Flink) to deliver "real-time" daily sales dashboards. After 18 months of on-call pain (watermark tuning, late events, exactly-once semantics), they discovered the dashboard refreshed *once per morning anyway*. They migrated to dbt + Airflow in 2 sprints, saved $200k/year in infra, and paged the on-call engineer 80% less.

The moral: **streaming for the sake of streaming is technical debt with extra steps.**

## Best practices

- **Default to batch.** Move to streaming only when latency directly creates business value (fraud, personalization, alerting).
- Use a **single event log (Kafka)** as the source of truth — feeds *both* batch and streaming downstream.
- Make pipelines **idempotent**: replaying the same event twice must produce the same result.
- Always design **late-data handling** explicitly (drop / re-aggregate / route to dead letter).
- Set **end-to-end latency SLOs** — "p99 from event to dashboard < 30s" — before designing.
- Monitor **lag** (consumer offset behind log head), not just throughput.

## Anti-patterns & bridge to next lesson

Avoid: choosing streaming because it sounds modern; running streaming jobs without exactly-once or idempotency; using \`processing time\` when you really mean \`event time\`; building Lambda when Kappa would suffice.

Next: **Data Quality** — once data is flowing (batch or stream), how do you make sure the numbers are *right*?`,
        theoryEn: `Every data system chooses: process in **batches** or as **streams**. The choice drives tooling, cost, team skills.

## Why this matters

Streaming sounds great but most companies don't need it. Wrong choice = 5–10× operational pain. Ask: cost of being 1 minute late vs 1 hour vs 1 day?

## Batch — the workhorse

Periodic, high-throughput, cheap, easy to recover. Tools: Airflow, Spark, dbt. ~90% of analytics is batch.

## Streaming — the live wire

Per-event, low latency, expensive, hard to recover. Tools: Kafka + Flink, Kinesis. Always-on clusters.

## Three streaming concepts

1. **Event time vs processing time** — when it happened vs when we got it.
2. **Windowing** — tumbling / sliding / session.
3. **Watermarks** — promise that no event older than X will arrive; defines when a window closes.

## Trade-off table

| Aspect | Batch | Streaming |
|---|---|---|
| Latency | Hours | Sub-second |
| Cost | $ | $$$$ |
| Backfill | Trivial | Hard |
| Best for | Reports, ML | Fraud, alerts |

## Lambda vs Kappa

Lambda = batch + streaming in parallel (two codebases — painful). Kappa = streaming only, replay log to backfill (modern preference).

## Case study — Uber

Three latency tiers from one Kafka log: <5s for matching, <10s for surge pricing, daily for financial close.

## Case study — wrong-choice streaming

An e-commerce shop built Kafka + Flink for dashboards that refreshed once per morning. Migrated to dbt + Airflow → saved $200k/year and on-call quieted.

## Best practices

Default to batch; one event log feeding both; idempotent processing; explicit late-data handling; latency SLOs; monitor lag, not throughput.

## Anti-patterns & next lesson

Avoid streaming for show, missing idempotency, mixing event/processing time. Next: **Data Quality** — making the numbers right.`,
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
        theory: `Data quality is not a tool you install — it is a **discipline** you practice every release. The question stops being "is the pipeline running?" and becomes "is the data the pipeline produced *correct, complete, fresh, and consistent*?" Companies that get this right ship trustworthy dashboards. Companies that don't end up with the dreaded "the numbers are wrong again" Slack thread every week.

## Why this matters in production

A 2023 Monte Carlo / Wakefield survey found data engineers spend **40% of their time** on data-quality firefighting. Worse, downstream consumers — the ML team, the finance team, the CEO — discover bad data *before* the data team does, eroding trust faster than any marketing campaign can rebuild it.

A famous Gartner estimate puts the average annual cost of poor data quality at **$12.9 million per company**. Even a fraction of that justifies building proper observability.

## The six dimensions of data quality

The standard framework you should know cold:

| Dimension | Question it answers | Example check |
|---|---|---|
| **Completeness** | Are required values present? | \`% null in customer_email\` |
| **Accuracy** | Does the value match reality? | \`amount > 0\` for sales |
| **Consistency** | Same value across systems? | \`order_total = sum(line_items)\` |
| **Timeliness** | How fresh is the data? | last update < 1h ago |
| **Uniqueness** | No unwanted duplicates? | \`count(distinct id) = count(*)\` |
| **Validity** | Conforms to format/range? | email regex, country code in ISO list |

A mature data team encodes *every* one of these as automated tests that block deployment if they fail.

## Three layers of defense

Production-grade quality programs operate at three layers:

**Layer 1 — Schema / contract tests** (build time): typed columns, NOT NULL constraints, foreign-key checks. Caught by dbt tests, Great Expectations, Soda.

**Layer 2 — Statistical anomaly detection** (run time): row-count down 50%? distribution of \`amount\` shifted? null rate doubled? Caught by tools like Monte Carlo, Bigeye, Anomalo, or hand-rolled with SQL + alerting.

**Layer 3 — Business-logic assertions** (semantic): "weekend revenue should be 60–80% of weekday." "Refunds < 5% of gross." These are domain rules the warehouse cannot infer. Owned by the analytics engineer, not the platform team.

## Mechanics — implementing dq tests with dbt

The 2024 industry standard is **dbt tests**. Generic tests run as SQL:

\`\`\`sql
-- This becomes a test in dbt YAML:
-- tests:
--   - not_null
--   - unique
--   - relationships:
--       to: ref('dim_customer')
--       field: customer_id

select customer_id
from {{ ref('fact_orders') }}
where customer_id is null
\`\`\`

A test passes if the query returns **zero rows**. CI runs the suite on every PR; production runs it after every transformation. Failed test → pipeline halts, alert fires, downstream models don't refresh.

## Comparison of leading tools

| Tool | Strength | Best for |
|---|---|---|
| **dbt tests** | Built into transformations | Schema + simple business rules |
| **Great Expectations** | Rich assertion library, docs | Python-heavy stacks, file/stream sources |
| **Soda Core** | YAML-first, lightweight | Multi-engine, GitOps workflows |
| **Monte Carlo** | ML-based anomaly detection | Large warehouses, lineage-heavy orgs |
| **Anomalo** | No-code, business-user friendly | Cross-functional teams |

For most teams the right answer is: **dbt tests for schema + business rules** + **a Monte Carlo / Anomalo-class tool for anomaly detection**. Don't try to hand-roll the second category — it never gets prioritized.

## Case study #1 — Netflix's "Write-Audit-Publish"

Netflix popularized **WAP**: every batch job first writes to a *staging* table, runs assertions, and only on success swaps the production table pointer. If assertions fail, prod is untouched and an alert fires. The pattern is now standard at Stripe, Airbnb, and most data-mature companies. Netflix wrote about it in their tech blog ("Maintaining Data Quality at Scale," 2019) and the open-source project **Apache Iceberg** ships first-class WAP support today.

## Case study #2 — Unity's $110M data-quality miss

In May 2022, Unity Technologies announced it would lose roughly **$110 million** in 2022 revenue because **bad data from a large customer had been fed into its ad-targeting ML model**, degrading its precision for months before anyone noticed. The stock dropped 36% in a day. The lesson is brutally clear: data quality is not a back-office concern — it is *directly* on the P&L.

## Best practices

- **Treat data tests like unit tests** — they run on every PR, fail the build on regression.
- **Set SLAs per table**: freshness, completeness, schema-stability. Publish them, alert on breach.
- **Separate critical-path tables** from "exploratory" ones — apply different rigor levels.
- **Own quality at the producer, not the consumer.** The team that creates \`fact_orders\` owns its quality.
- **Capture lineage** so when \`dim_product\` breaks, you immediately know which 47 dashboards are at risk.
- **Run a weekly "data incident review"** — same discipline as software post-mortems.

## Anti-patterns & bridge to next lesson

Avoid: tests that "always pass" (commented out long ago); silent retries that mask quality issues; adding tests only after an incident; relying on stakeholders to find bad data; treating quality as one team's responsibility.

Next: **Orchestration & DAGs** — once you have quality checks, you need a system that runs them in the right order, retries failures, and gives you a single pane of glass into pipeline health.`,
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

1. **Schema/contract tests** — dbt, Great Expectations.
2. **Statistical anomaly detection** — Monte Carlo, Bigeye, Anomalo.
3. **Business-logic assertions** — owned by analytics engineers.

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

## Case study — Netflix WAP

Netflix's Write-Audit-Publish: write to staging, run assertions, swap pointer only on success. Now standard via Apache Iceberg.

## Case study — Unity $110M miss

Unity lost ~$110M in 2022 from bad customer data poisoning their ad ML model. Stock −36% in a day.

## Best practices

Tests run on every PR; SLAs per table; quality owned by producers; capture lineage; weekly data-incident reviews.

## Anti-patterns & next lesson

Avoid commented-out tests, silent retries, post-incident-only testing. Next: **Orchestration & DAGs** — running these checks in the right order with retries and observability.`,
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
        theory: `An **orchestrator** is the operating system of your data platform. It decides *what runs, when, in what order, what happens on failure, and who gets paged*. Without one you have a graveyard of cron jobs and Slack messages saying "did the report run today?" With one, you get a single pane of glass over the entire pipeline.

## Why this matters in production

The number-one cause of broken dashboards on Monday morning is *not* a bad transformation — it is **task A finished before task B's data was ready**, and the report read stale data. A real orchestrator solves this by modeling pipelines as **DAGs** (directed acyclic graphs) where edges encode "B depends on A," and the engine guarantees order, retries, and observability.

In 2024–2025 the dominant choices are **Airflow** (still the de-facto standard), **Dagster** (modern, asset-aware), and **Prefect** (Pythonic, lightweight). dbt's built-in DAG handles intra-warehouse transformations and is usually triggered by one of the above.

## Core concepts — task, DAG, scheduler, executor

- **Task**: a single unit of work (run a SQL, call an API, copy a file).
- **DAG**: a graph of tasks with dependency edges; "directed" = order matters; "acyclic" = no loops.
- **Scheduler**: decides which DAG runs when (cron-like).
- **Executor**: actually runs the tasks (locally, on Celery workers, on Kubernetes pods).
- **Backfill**: re-run a DAG for historical dates after a bug fix or schema change.
- **Idempotency**: re-running a task with the same inputs must produce the same output.

A textbook DAG:

\`\`\`
extract_orders ──┐
                  ├──> load_to_warehouse ──> dbt_transform ──> run_dq_tests ──> refresh_dashboard
extract_users ───┘
\`\`\`

The orchestrator guarantees \`load_to_warehouse\` waits for both extracts; \`dbt_transform\` waits for the load; \`refresh_dashboard\` waits for the tests to pass.

## Mechanics — Airflow's mental model

In Airflow you declare a DAG in Python:

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

with DAG("daily_orders",
         schedule="0 2 * * *",   # every day at 02:00
         start_date=datetime(2024, 1, 1),
         catchup=False) as dag:

    extract = PythonOperator(task_id="extract", python_callable=do_extract)
    load    = PythonOperator(task_id="load",    python_callable=do_load)
    dbt     = PythonOperator(task_id="dbt",     python_callable=run_dbt)

    extract >> load >> dbt
\`\`\`

Key behaviors:

- **Retries**: \`retries=3, retry_delay=timedelta(minutes=5)\` — transient failures recover automatically.
- **SLA**: alert if a task takes longer than expected.
- **XCom**: small message passing between tasks (do *not* abuse for big data — use object storage).
- **Sensors**: tasks that wait for an external condition (file appears, table is fresh).

## Comparison of orchestrators

| Tool | Paradigm | Strengths | Watch-outs |
|---|---|---|---|
| **Airflow** | Task-centric, Python | Huge ecosystem, hire-ability | Verbose, slow scheduler at extreme scale |
| **Dagster** | Asset-centric (data, not tasks) | First-class data assets, types, lineage | Smaller community |
| **Prefect** | Python-native, hybrid cloud | Clean API, dynamic mapping | Less mature ecosystem |
| **Argo Workflows** | Kubernetes-native YAML | Tight K8s integration | Steep curve outside K8s shops |
| **Cron + bash** | DIY | Free, simple | No observability — *don't ship to prod* |

The "asset vs task" distinction matters. Dagster says "I produce \`fact_orders\`" and the dependency graph is derived. Airflow says "I run task X after task Y" and you maintain dependencies manually.

## Case study #1 — Airbnb (the birthplace of Airflow)

Airbnb open-sourced Airflow in 2015 specifically to replace a tangle of cron jobs that were causing nightly outages. By 2018 they were running ~10,000 DAGs per day. Their public talks identify three keys to success: **strict idempotency** (every task safe to re-run), **metadata-driven DAGs** (generate DAGs from a config table, not 10,000 hand-written files), and **clear ownership tags** so the on-call could route any failure to the right team in <60 seconds.

## Case study #2 — the cron-jungle anti-pattern

A FAANG-adjacent startup (story shared on the *Locally Optimistic* podcast) ran ~400 cron jobs across 5 EC2 instances. There was no DAG, no retries, no logs in one place. A daily revenue report was downstream of 9 jobs scheduled "with enough buffer" between them. When traffic doubled, the upstream jobs took longer; the buffers stopped being enough; the report silently used yesterday's data for *six weeks* before anyone noticed. The fix took 3 engineers a quarter to rebuild the same logic in Airflow with explicit dependencies.

## Best practices

- **Make every task idempotent** — re-runnable without side effects. This is non-negotiable.
- **Externalize state to object storage / warehouse** — never store data inside the orchestrator.
- **One DAG per domain**, not one mega-DAG with 500 tasks.
- **Tag DAGs with owner + on-call rotation** — failures auto-route to the right team.
- **Set SLAs and alert on lateness**, not just on failure (success-but-late is a real failure mode).
- **Backfill discipline**: parameterize tasks by execution date so re-runs Just Work.
- **Version-control DAGs** like application code; require code review.

## Anti-patterns & bridge to next lesson

Avoid: passing large data through XCom; using \`datetime.now()\` inside tasks (kills idempotency); long sleep loops to "wait for data" (use sensors); hand-rolling cron in production after you have an orchestrator.

Next: **Cloud Platforms** — where do these orchestrators run, and how do AWS/GCP/Azure each package the data-engineering stack?`,
        theoryEn: `An **orchestrator** is the OS of your data platform: it decides what runs, when, in what order, and who gets paged on failure.

## Why this matters

#1 cause of broken dashboards is "task A finished before task B's data was ready." Orchestrators model pipelines as **DAGs** with dependency edges and guarantee order, retries, observability.

## Core concepts

- **Task** — unit of work.
- **DAG** — directed acyclic graph of tasks.
- **Scheduler** — decides what runs when.
- **Executor** — actually runs tasks (locally / Celery / K8s).
- **Backfill** — re-run for historical dates.
- **Idempotency** — re-runs produce the same output.

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

## Case study — Airbnb

Birthplace of Airflow (2015). At ~10k DAGs/day they relied on idempotency, metadata-driven DAG generation, and ownership tags for fast on-call routing.

## Case study — cron jungle

A startup ran 400 cron jobs across 5 EC2 boxes. Buffers stopped being enough as traffic grew → revenue dashboard used stale data for 6 weeks unnoticed.

## Best practices

Idempotency mandatory; state lives in object storage/warehouse, not orchestrator; one DAG per domain; tag owners + on-call; alert on lateness; parameterize by execution date.

## Anti-patterns & next lesson

Avoid huge XCom payloads, \`datetime.now()\`, sleep loops, side-by-side cron. Next: **Cloud Platforms** — where these orchestrators live.`,
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
        theory: `Modern data engineering is a **cloud** discipline. The on-prem Hadoop cluster of 2014 has been replaced by a managed-service stack on AWS, GCP, or Azure. Knowing which service does what — and which services *don't* talk to each other well — is now table-stakes for any data engineer.

## Why this matters in production

A junior engineer asked to "build a pipeline" on AWS faces ~25 services with overlapping names (Glue, EMR, Athena, Redshift, Kinesis, MSK, Lambda, Step Functions…). Picking wrong costs the team 6 months of rewrite. Picking right gets a production pipeline shipped in 2 weeks.

The good news: every cloud provides the same **six building blocks**. Once you can map them, you can navigate any cloud.

## The six universal building blocks

| Capability | AWS | GCP | Azure |
|---|---|---|---|
| Object storage | S3 | GCS | Blob Storage / ADLS |
| Warehouse | Redshift | BigQuery | Synapse |
| Streaming bus | Kinesis / MSK | Pub/Sub | Event Hubs |
| Batch compute | EMR / Glue | Dataproc / Dataflow | HDInsight / Databricks |
| Orchestration | MWAA (Airflow) / Step Fn | Cloud Composer (Airflow) | Data Factory |
| Serverless transform | Lambda | Cloud Functions | Functions |

Memorize this table once and you can read any cloud architecture diagram on first sight.

## Reference architecture — modern lakehouse

The 2024 mainstream pattern, equally valid on any cloud:

\`\`\`
Sources ─> Streaming bus ─> Object storage (raw / bronze)
                       │
                       └─> Streaming compute (Flink / Spark Streaming)
                                  │
Object storage (raw) ─> Batch compute (Spark / Glue) ─> Object storage (silver: cleaned)
                                                     ─> Object storage (gold: aggregated)
                                                                  │
                                                                  └─> Warehouse (BigQuery / Snowflake / Redshift)
                                                                  └─> BI tool (Looker / Tableau / Metabase)
\`\`\`

The "bronze / silver / gold" naming comes from Databricks' medallion architecture and is now industry-standard vocabulary.

## Open table formats — Iceberg, Delta, Hudi

A 2024 game-changer. Instead of raw Parquet files, store data as an **open table format**:

- **Apache Iceberg** (Netflix → Apache) — vendor-neutral, supported by Snowflake, BigQuery, Athena, Trino, Spark.
- **Delta Lake** (Databricks → Linux Foundation) — strongest in the Databricks ecosystem.
- **Apache Hudi** (Uber) — strong streaming/upsert workloads.

What they give you on top of plain Parquet: ACID transactions, time travel ("query the table as it was 2 hours ago"), schema evolution, hidden partitioning, efficient updates/deletes. *This is what makes a "data lake" feel like a "data warehouse."*

## Trade-offs by cloud

| Cloud | Strengths | Watch-outs |
|---|---|---|
| **AWS** | Largest service catalog, deep enterprise adoption | Service overlap, complex IAM, every service a separate UI |
| **GCP** | Best serverless analytics (BigQuery is best-in-class) | Smaller market share, less third-party tooling |
| **Azure** | Best Microsoft / enterprise integration | Documentation maze, some services lag behind |
| **Snowflake / Databricks** (multi-cloud) | Same product on any cloud, strong data sharing | Premium pricing, vendor lock-in to *them* instead of the cloud |

The 2024 pattern most teams converge on: **cloud A's object storage + Snowflake or Databricks on top + dbt for transformations**.

## Cost model — where the bills come from

Three lines dominate every bill:

1. **Compute** — warehouse credits, Spark cluster hours. Mitigation: auto-suspend, right-size, use spot instances for batch.
2. **Storage** — pennies per GB but multiplied by years of retention. Mitigation: lifecycle policies (move >90-day data to cold tier), partition pruning.
3. **Egress** — moving data *out* of the cloud is shockingly expensive. Mitigation: keep compute in the same region as storage; avoid cross-cloud transfers.

A common pattern: *storage is cheap, compute is medium, egress will surprise you.*

## Case study #1 — Shopify on GCP + BigQuery

Shopify moved to GCP and standardized on BigQuery + dbt. They have publicly described running >10 PB of analytical data and >100,000 dbt models per day. Two design choices made it work: (1) **immutable raw layer** stored as Parquet on GCS — they can always replay; (2) **strict cost-attribution tags** per team so each PM team sees its own BigQuery bill weekly.

## Case study #2 — the cross-region egress disaster

A US-based SaaS company stored data in S3 in \`us-east-1\` but ran their Snowflake account in \`us-west-2\`. Every analytical query pulled data across regions. Their bill grew quietly until a single quarter showed **$180,000 in cross-region egress** alone. Fix: a one-time migration of the S3 buckets to the same region as the Snowflake account. Egress dropped to near zero overnight.

## Best practices

- **Pick one cloud as primary** — multi-cloud is rarely worth the operational tax.
- **Use managed services aggressively** for the boring stuff (orchestration, queues, warehouses); save your custom code for true business logic.
- **Tag every resource** with team / cost-center / environment from day one.
- **Enable budget alerts at 50% / 80% / 100%** on every account.
- **Region-pin storage and compute together.**
- **Adopt an open table format (Iceberg/Delta) early** — it preserves optionality across vendors.

## Anti-patterns & bridge to next lesson

Avoid: building "cloud-agnostic" abstractions before you actually need them; spinning up always-on clusters for spiky workloads; storing PII in the cheapest tier without encryption; ignoring data residency / compliance requirements.

Next: **Production Best Practices** — once your pipeline runs in the cloud, how do you make it reliable enough to put your name on it?`,
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

## Case study — Shopify

GCP + BigQuery + dbt at >10 PB. Won via immutable raw layer + per-team cost tags.

## Case study — egress disaster

S3 in us-east-1, Snowflake in us-west-2 → $180k/quarter in cross-region egress. Migrated buckets, egress dropped to ~zero.

## Best practices

One primary cloud; managed services for boring stuff; tag everything; budget alerts; region-pin; adopt Iceberg/Delta early.

## Anti-patterns & next lesson

Avoid premature multi-cloud; always-on clusters for spiky loads; ignoring residency. Next: **Production Best Practices**.`,
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
        theory: `Building a pipeline that runs on your laptop is easy. Building one that **runs reliably for years**, recovers from failures unattended, gets correctly-paged engineers when something is truly wrong, and never silently corrupts data — that is data engineering. This lesson is the playbook every senior data engineer eventually internalizes.

## Why this matters in production

Most data pipelines are not "broken" in obvious ways. They are *quietly wrong*. The dashboard shows numbers; the numbers happen to be stale by 3 days, or off by 2% because a deduplication step silently drops events. The cost of these silent failures is higher than the cost of loud failures, because trust erodes invisibly.

A production-grade pipeline is judged on five SLOs: **freshness, completeness, correctness, availability, and cost predictability**. The practices below directly support each of them.

## Idempotency — the cornerstone

A task is **idempotent** if running it 10 times produces the same result as running it once. This sounds obvious; it is the single most violated property in real pipelines.

Idempotent patterns:

- **MERGE / UPSERT** instead of INSERT.
- **Partitioned overwrites**: \`OVERWRITE PARTITION (date='2024-01-15')\` instead of appending.
- **Transactional table formats** (Iceberg / Delta) that give you snapshot isolation.

Non-idempotent traps:

- Calling \`now()\` inside a task.
- Auto-incrementing IDs assigned in the pipeline.
- Sending an email or charging a credit card *and* writing to the warehouse in the same task — the email is not idempotent.

## CI / CD for data pipelines

Treat your pipelines like software:

- **Source control** every dbt model, Airflow DAG, Spark job.
- **PR reviews** with at least one other data engineer.
- **CI**: spin up a small dev warehouse, run dbt build + tests on every PR.
- **Staging environment** that mirrors prod schema.
- **Blue/green deploys**: build the new table next to the old one, swap pointers atomically.

The 2024 standard tooling: **dbt + GitHub Actions + a dev/prod schema split** in your warehouse.

## Observability — the three pillars

| Pillar | Question it answers | Tool category |
|---|---|---|
| **Logs** | What happened? | CloudWatch, Stackdriver, Datadog logs |
| **Metrics** | How is it trending? | Prometheus, CloudWatch metrics |
| **Lineage** | What is downstream when this breaks? | dbt docs, OpenLineage, Monte Carlo |

A pipeline without lineage is a pipeline you can't safely change. Adopt **OpenLineage** or your orchestrator's native lineage early — retrofitting it later is painful.

## Comparison — naive vs production pipeline

| Concern | Naive | Production |
|---|---|---|
| Failure handling | Crash & email | Retry → DLQ → page |
| Re-run safety | Manual cleanup | Idempotent by design |
| Schema change | Breaks silently | Contract tests + alerts |
| New deploy | Push to prod | PR → CI → staging → prod |
| Cost | Surprise quarterly bill | Per-team budget + alerts |
| Bad data | Discovered by CEO | Caught by tests pre-publish |
| On-call | "Whoever sees Slack first" | Owner tags + rotation |

If you cannot tick the right column for every row, you are running a hobby pipeline.

## Security & compliance — what cannot be skipped

- **PII tagging**: classify every column (public / internal / PII / sensitive PII).
- **Row-level access** for multi-tenant warehouses.
- **Audit logging**: who queried which table when.
- **Encryption** at rest *and* in transit (default-on at all major clouds, but verify).
- **Data residency**: GDPR / CCPA require certain data to stay in certain regions.
- **Retention policies**: delete data when you are no longer required to keep it.

These are not optional in 2024 — a single GDPR fine can dwarf an annual data-platform budget.

## Case study #1 — Stripe's "pipeline that ships money"

Stripe's data pipelines feed financial reports that go to regulators and to merchants' bank accounts. Their public engineering blog ("Building Reliable Data Pipelines," 2020) describes: **end-to-end checksums** on every pipeline (sum of inputs must equal sum of outputs to the cent); **dual reconciliation pipelines** running independently and compared daily; **a four-eyes rule** for production deploys touching financial logic. The result is a pipeline reliability culture that rivals their core payments product.

## Case study #2 — the "Friday-night deploy" outage

A growth-stage startup pushed a "small" dbt model change at 6pm Friday. The new model joined on a column that had been silently renamed upstream that afternoon. dbt build succeeded (no test caught it). The Monday-morning marketing dashboard reported zero conversions. Three days of revenue attribution data were silently dropped before anyone noticed; reconstruction took two weeks. The fix wasn't technical — it was **policy**: no production deploys after 4pm on Friday, no deploys without contract tests on join keys, mandatory rollback runbook for every PR.

## Best practices

- **Idempotency or it didn't ship.**
- **Contract tests on every cross-pipeline boundary** (source schema, downstream tables).
- **One owner, one on-call rotation, per pipeline** — visible in the orchestrator UI.
- **Runbooks** for every alert: "If you see this page, do X, Y, Z." Reduce 3am cognitive load.
- **Cost dashboards reviewed weekly** at the team level.
- **Quarterly chaos drills**: pick a random pipeline, kill it, time how long until detection + recovery.
- **Kill the dashboard if it can't be trusted** — better to show "data unavailable" than wrong numbers.

## Anti-patterns & where to go next

Avoid: shipping changes that have not run on staging; muting alerts because they "always go off"; storing secrets in code; hand-editing production data ("just this once"); blaming people, not systems, for incidents.

Where to go next: rotate on-call, write a post-mortem after every incident (blameless), and revisit the SLOs every quarter. The mark of a senior data engineer is not the cleverness of their pipeline — it is **how boring their pipeline is to operate.**`,
        theoryEn: `Building a pipeline that runs on your laptop is easy. Building one that runs reliably for **years**, recovers unattended, and never silently corrupts data — that is data engineering.

## Why this matters

Most pipelines aren't loudly broken — they're *quietly wrong* (stale by 3 days, off by 2%). Silent failures erode trust faster than crashes. Five SLOs: freshness, completeness, correctness, availability, cost predictability.

## Idempotency — the cornerstone

10 runs = 1 run, same result. Use MERGE/UPSERT, partitioned overwrite, transactional table formats. Avoid \`now()\` inside tasks, auto-IDs assigned in pipeline, side-effects (email + DB write).

## CI/CD for pipelines

Source control + PR review + CI on dev warehouse + staging + blue/green deploy. Tooling: dbt + GitHub Actions + dev/prod schema split.

## Observability — three pillars

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

PII tagging, row-level access, audit logs, encryption, residency, retention — not optional in 2024.

## Case study — Stripe

Pipelines that ship money: end-to-end checksums, dual reconciliation, four-eyes rule on financial deploys.

## Case study — Friday-night deploy

A 6pm Friday dbt change joined on a renamed column. 3 days of conversion data silently dropped. Fix was policy: no Friday afternoon deploys, contract tests on join keys, rollback runbooks.

## Best practices

Idempotency or no ship; contract tests at every boundary; one owner + on-call; runbooks per alert; weekly cost reviews; quarterly chaos drills; kill untrustworthy dashboards.

## Anti-patterns

No staging; muted alerts; secrets in code; hand-editing prod; blaming people.

The mark of seniority: how **boring** your pipeline is to operate.`,
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
