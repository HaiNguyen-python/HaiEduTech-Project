import type { LanguageModule } from "./types";

export const satExpansionModules: LanguageModule[] = [
  {
    id: "sat-math-vocab",
    title: "SAT Math Vocabulary",
    titleEn: "SAT Math Vocabulary",
    icon: "🔢",
    color: "orange",
    description: "Từ vựng toán học thiết yếu cho bài thi SAT Math",
    descriptionEn: "Essential math vocabulary for the SAT Math section",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-math-algebra-vocab",
        title: "Algebra & Functions Vocabulary",
        titleEn: "Algebra & Functions Vocabulary",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ Vựng Đại số & Hàm số (Algebra & Functions)

Phần SAT Math sử dụng nhiều thuật ngữ tiếng Anh mà bạn cần hiểu chính xác để giải đề đúng. Không phải kiến thức toán khó — mà là **hiểu đề bài bằng tiếng Anh**.

### Thuật ngữ cốt lõi:
- **Variable** (biến số): Ký hiệu đại diện cho giá trị chưa biết (x, y)
- **Coefficient** (hệ số): Số nhân trước biến (trong 3x, 3 là coefficient)
- **Equation** (phương trình): Biểu thức có dấu bằng (=)
- **Inequality** (bất phương trình): Biểu thức có dấu >, <, ≥, ≤
- **Function** (hàm số): Quan hệ f(x) giữa input và output
- **Domain** (miền xác định): Tập hợp giá trị x hợp lệ
- **Range** (miền giá trị): Tập hợp giá trị y (output)`,
        theoryEn: `## Algebra & Functions Vocabulary

The SAT Math section uses English terminology you must understand precisely. It's not about hard math — it's about **understanding the question in English**.

### Core Terms:
- **Variable**: Symbol representing an unknown value (x, y)
- **Coefficient**: Number multiplied by a variable (in 3x, 3 is the coefficient)
- **Equation**: Expression with an equals sign (=)
- **Inequality**: Expression with >, <, ≥, ≤
- **Function**: f(x) relationship between input and output
- **Domain**: Set of valid x values
- **Range**: Set of y values (output)`,
        proTips: [
          "SAT Math thường dùng 'the value of x that satisfies' = 'giá trị x thỏa mãn'",
          "'At most' = ≤, 'At least' = ≥, 'No more than' = ≤, 'No fewer than' = ≥",
          "'Consecutive integers' = số nguyên liên tiếp (n, n+1, n+2...)",
        ],
        proTipsEn: [
          "SAT often uses 'the value of x that satisfies' = 'the x value that makes the equation true'",
          "'At most' = ≤, 'At least' = ≥, 'No more than' = ≤, 'No fewer than' = ≥",
          "'Consecutive integers' = integers in sequence (n, n+1, n+2...)",
        ],
        vocabulary: [
          { word: "variable", meaning: "biến số", example: "Solve for the variable x in the equation.", partOfSpeech: "noun" },
          { word: "coefficient", meaning: "hệ số", example: "In 5x², the coefficient is 5.", partOfSpeech: "noun" },
          { word: "exponent", meaning: "số mũ", example: "In x³, the exponent is 3.", partOfSpeech: "noun" },
          { word: "polynomial", meaning: "đa thức", example: "x² + 3x - 7 is a polynomial expression.", partOfSpeech: "noun" },
          { word: "quadratic", meaning: "bậc hai", example: "A quadratic equation has the form ax² + bx + c = 0.", partOfSpeech: "adjective" },
          { word: "intercept", meaning: "giao điểm (trục)", example: "The y-intercept is where the line crosses the y-axis.", partOfSpeech: "noun" },
          { word: "slope", meaning: "hệ số góc, độ dốc", example: "The slope of the line is rise over run.", partOfSpeech: "noun" },
          { word: "absolute value", meaning: "giá trị tuyệt đối", example: "The absolute value of -5 is 5.", partOfSpeech: "noun" },
          { word: "inequality", meaning: "bất phương trình", example: "Solve the inequality 2x + 3 > 7.", partOfSpeech: "noun" },
          { word: "consecutive", meaning: "liên tiếp", example: "Find three consecutive even integers whose sum is 48.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ toán học phù hợp:",
            instructionEn: "Fill in the appropriate math term:",
            sentences: [
              { text: "In the expression 7x, the number 7 is called the ___.", textEn: "In the expression 7x, the number 7 is called the ___.", answer: "coefficient", hint: "hệ số" },
              { text: "The ___ of a line measures its steepness.", textEn: "The ___ of a line measures its steepness.", answer: "slope", hint: "độ dốc" },
              { text: "An equation of the form ax² + bx + c = 0 is called ___.", textEn: "An equation of the form ax² + bx + c = 0 is called ___.", answer: "quadratic", hint: "bậc hai" },
              { text: "5, 6, 7 are three ___ integers.", textEn: "5, 6, 7 are three ___ integers.", answer: "consecutive", hint: "liên tiếp" },
              { text: "The ___ of -8 is 8.", textEn: "The ___ of -8 is 8.", answer: "absolute value", hint: "giá trị tuyệt đối" },
            ],
          },
        ],
        quiz: [
          { question: "What is the 'coefficient' in 4x³?", options: ["x", "3", "4", "4x"], answer: 2, explanation: "The coefficient is the number multiplied by the variable. In 4x³, the coefficient is 4." },
          { question: "What does 'at most 10' mean in math?", options: ["x > 10", "x ≤ 10", "x = 10", "x ≥ 10"], answer: 1, explanation: "'At most 10' means 'no more than 10' = x ≤ 10." },
          { question: "What is the 'y-intercept'?", options: ["Where the graph crosses the x-axis", "Where the graph crosses the y-axis", "The slope", "The maximum value"], answer: 1, explanation: "The y-intercept is where the graph crosses the y-axis (when x = 0)." },
          { question: "What is a 'polynomial'?", options: ["A fraction", "An expression with multiple terms and integer exponents", "A prime number", "An equation"], answer: 1, explanation: "A polynomial is an expression with multiple terms containing variables raised to integer powers." },
          { question: "What does 'solve for x' mean?", options: ["Find the value of x", "Replace x with 0", "Eliminate x", "Guess x"], answer: 0, explanation: "'Solve for x' means finding the value of x that satisfies the equation." },
        ],
      },
      {
        id: "sat-math-geometry-vocab",
        title: "Geometry & Measurement Vocabulary",
        titleEn: "Geometry & Measurement Vocabulary",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ Vựng Hình học & Đo lường (Geometry & Measurement)

SAT Math bao gồm nhiều bài toán hình học. Hiểu thuật ngữ tiếng Anh giúp bạn giải đề nhanh và chính xác.

### Thuật ngữ hình học cốt lõi:
- **Perimeter** (chu vi): Tổng độ dài các cạnh
- **Area** (diện tích): Bề mặt bên trong hình
- **Volume** (thể tích): Không gian bên trong vật thể 3D
- **Circumference** (chu vi hình tròn): C = 2πr
- **Diameter** (đường kính): Đoạn thẳng qua tâm, d = 2r
- **Radius** (bán kính): Khoảng cách từ tâm đến mép
- **Hypotenuse** (cạnh huyền): Cạnh dài nhất tam giác vuông
- **Congruent** (bằng nhau): Cùng kích thước và hình dạng
- **Similar** (đồng dạng): Cùng hình dạng, khác kích thước`,
        theoryEn: `## Geometry & Measurement Vocabulary

SAT Math includes many geometry problems. Understanding English terminology helps you solve questions quickly and accurately.

### Core Geometry Terms:
- **Perimeter**: Total length of all sides
- **Area**: Surface inside a shape
- **Volume**: Space inside a 3D object
- **Circumference**: Perimeter of a circle, C = 2πr
- **Diameter**: Line through center, d = 2r
- **Radius**: Distance from center to edge
- **Hypotenuse**: Longest side of a right triangle
- **Congruent**: Same size and shape
- **Similar**: Same shape, different size`,
        proTips: [
          "'Inscribed' = nội tiếp (hình nhỏ bên trong hình lớn)",
          "'Circumscribed' = ngoại tiếp (hình lớn bao quanh hình nhỏ)",
          "'Tangent' = tiếp tuyến (chạm tại đúng 1 điểm)",
        ],
        proTipsEn: [
          "'Inscribed' = a shape drawn inside another shape",
          "'Circumscribed' = a shape drawn around another shape",
          "'Tangent' = touching at exactly one point",
        ],
        vocabulary: [
          { word: "perimeter", meaning: "chu vi", example: "Find the perimeter of the rectangle.", partOfSpeech: "noun" },
          { word: "circumference", meaning: "chu vi hình tròn", example: "The circumference of a circle with radius 5 is 10π.", partOfSpeech: "noun" },
          { word: "hypotenuse", meaning: "cạnh huyền", example: "Use the Pythagorean theorem to find the hypotenuse.", partOfSpeech: "noun" },
          { word: "congruent", meaning: "bằng nhau (hình học)", example: "These two triangles are congruent.", partOfSpeech: "adjective" },
          { word: "perpendicular", meaning: "vuông góc", example: "The two lines are perpendicular to each other.", partOfSpeech: "adjective" },
          { word: "parallel", meaning: "song song", example: "Parallel lines never intersect.", partOfSpeech: "adjective" },
          { word: "vertex", meaning: "đỉnh", example: "A triangle has three vertices.", partOfSpeech: "noun" },
          { word: "arc", meaning: "cung", example: "Find the length of arc AB.", partOfSpeech: "noun" },
          { word: "isosceles", meaning: "cân (tam giác)", example: "An isosceles triangle has two equal sides.", partOfSpeech: "adjective" },
          { word: "supplementary", meaning: "bù nhau (tổng 180°)", example: "Two supplementary angles add up to 180°.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ hình học phù hợp:",
            instructionEn: "Fill in the appropriate geometry term:",
            sentences: [
              { text: "The longest side of a right triangle is the ___.", textEn: "The longest side of a right triangle is the ___.", answer: "hypotenuse", hint: "cạnh huyền" },
              { text: "Two angles that add up to 180° are called ___.", textEn: "Two angles that add up to 180° are called ___.", answer: "supplementary", hint: "bù nhau" },
              { text: "Lines that never meet are ___.", textEn: "Lines that never meet are ___.", answer: "parallel", hint: "song song" },
              { text: "The ___ of a circle is the distance around it.", textEn: "The ___ of a circle is the distance around it.", answer: "circumference", hint: "chu vi tròn" },
              { text: "A triangle with two equal sides is called ___.", textEn: "A triangle with two equal sides is called ___.", answer: "isosceles", hint: "cân" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'perpendicular' mean?", options: ["Parallel", "At right angles (90°)", "Intersecting", "Overlapping"], answer: 1, explanation: "'Perpendicular' means meeting at a right angle (90°)." },
          { question: "What are 'congruent triangles'?", options: ["Similar triangles", "Triangles identical in size and shape", "Right triangles", "Isosceles triangles"], answer: 1, explanation: "'Congruent' means identical in both size and shape." },
          { question: "What is a 'vertex' (plural: vertices)?", options: ["An edge", "A corner point where edges meet", "An angle", "A diagonal"], answer: 1, explanation: "'Vertex' is a point where two edges meet." },
          { question: "What is the formula for circumference?", options: ["πr²", "2πr", "πd²", "4πr"], answer: 1, explanation: "Circumference = 2πr or πd (where d = diameter = 2r)." },
          { question: "What is an 'arc' in a circle?", options: ["Radius", "Diameter", "A portion of the circle's edge", "A chord"], answer: 2, explanation: "An 'arc' is a portion of the circumference between two points." },
        ],
      },
      {
        id: "sat-math-stats-vocab",
        title: "Statistics & Data Analysis Vocabulary",
        titleEn: "Statistics & Data Analysis Vocabulary",
        level: 4,
        difficulty: "advanced",
        theory: `## Từ Vựng Thống kê & Phân tích Dữ liệu

SAT Math có nhiều bài về **thống kê, xác suất và phân tích dữ liệu**. Đây là phần nhiều học sinh Việt Nam gặp khó vì thuật ngữ tiếng Anh.

### Các khái niệm chính:
- **Mean** (trung bình cộng): Tổng / số lượng
- **Median** (trung vị): Giá trị ở giữa khi sắp xếp
- **Mode** (yếu vị): Giá trị xuất hiện nhiều nhất
- **Standard deviation** (độ lệch chuẩn): Đo mức phân tán dữ liệu
- **Probability** (xác suất): Khả năng xảy ra sự kiện
- **Margin of error** (sai số biên): Phạm vi sai lệch cho phép
- **Correlation** (tương quan): Mối liên hệ giữa 2 biến
- **Scatter plot** (biểu đồ phân tán): Biểu đồ thể hiện mối quan hệ giữa 2 biến`,
        theoryEn: `## Statistics & Data Analysis Vocabulary

SAT Math features many questions on **statistics, probability, and data analysis**. This section challenges many Vietnamese students due to English terminology.

### Key Concepts:
- **Mean**: Sum / count (average)
- **Median**: Middle value when data is ordered
- **Mode**: Most frequently occurring value
- **Standard deviation**: Measures data spread
- **Probability**: Likelihood of an event
- **Margin of error**: Allowed range of deviation
- **Correlation**: Relationship between 2 variables
- **Scatter plot**: Chart showing relationship between 2 variables`,
        proTips: [
          "'Outlier' (giá trị ngoại lai) ảnh hưởng mạnh đến mean nhưng KHÔNG ảnh hưởng median",
          "SAT hay hỏi: 'Which measure of center is most appropriate?' → nếu có outlier, chọn median",
          "'Random sample' là mẫu ngẫu nhiên — cần thiết để kết quả có tính đại diện",
        ],
        proTipsEn: [
          "'Outliers' strongly affect the mean but NOT the median",
          "SAT often asks: 'Which measure of center is most appropriate?' → if outliers exist, choose median",
          "'Random sample' is essential for results to be representative",
        ],
        vocabulary: [
          { word: "mean", meaning: "trung bình cộng", example: "The mean of 4, 6, and 8 is 6.", partOfSpeech: "noun" },
          { word: "median", meaning: "trung vị", example: "The median of 3, 5, 9 is 5.", partOfSpeech: "noun" },
          { word: "mode", meaning: "yếu vị (giá trị xuất hiện nhiều nhất)", example: "In the set {2, 3, 3, 5}, the mode is 3.", partOfSpeech: "noun" },
          { word: "standard deviation", meaning: "độ lệch chuẩn", example: "A higher standard deviation means more spread in data.", partOfSpeech: "noun" },
          { word: "outlier", meaning: "giá trị ngoại lai", example: "The outlier of 100 in the dataset skewed the mean.", partOfSpeech: "noun" },
          { word: "correlation", meaning: "tương quan", example: "There is a strong positive correlation between study time and grades.", partOfSpeech: "noun" },
          { word: "scatter plot", meaning: "biểu đồ phân tán", example: "The scatter plot shows a linear trend.", partOfSpeech: "noun" },
          { word: "sample", meaning: "mẫu", example: "A random sample of 200 students was surveyed.", partOfSpeech: "noun" },
          { word: "proportion", meaning: "tỷ lệ", example: "What proportion of students passed the exam?", partOfSpeech: "noun" },
          { word: "margin of error", meaning: "sai số biên", example: "The survey has a margin of error of ±3%.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ thống kê phù hợp:",
            instructionEn: "Fill in the appropriate statistics term:",
            sentences: [
              { text: "The ___ is the middle value in an ordered dataset.", textEn: "The ___ is the middle value in an ordered dataset.", answer: "median", hint: "trung vị" },
              { text: "A data point far from the rest is called an ___.", textEn: "A data point far from the rest is called an ___.", answer: "outlier", hint: "ngoại lai" },
              { text: "A ___ shows the relationship between two variables as dots.", textEn: "A ___ shows the relationship between two variables as dots.", answer: "scatter plot", hint: "biểu đồ phân tán" },
              { text: "The survey result has a ___ of ±4%.", textEn: "The survey result has a ___ of ±4%.", answer: "margin of error", hint: "sai số biên" },
              { text: "A higher ___ indicates more variation in the data.", textEn: "A higher ___ indicates more variation in the data.", answer: "standard deviation", hint: "độ lệch chuẩn" },
            ],
          },
        ],
        quiz: [
          { question: "Which measure of center should you use when a dataset has outliers?", options: ["Mean", "Median", "Mode", "Range"], answer: 1, explanation: "The median is not affected by outliers, making it more appropriate than the mean." },
          { question: "What does 'standard deviation' measure?", options: ["The average value", "The spread of data around the mean", "The maximum value", "The amount of data"], answer: 1, explanation: "Standard deviation measures how spread out data is around the mean." },
          { question: "What does 'positive correlation' mean?", options: ["As x increases, y decreases", "As x increases, y also increases", "No relationship exists", "y remains constant"], answer: 1, explanation: "Positive correlation means when x increases, y also increases (and vice versa)." },
          { question: "Why is a 'random sample' important?", options: ["To get results faster", "To ensure results are representative of the population", "To reduce costs", "It's not important"], answer: 1, explanation: "A random sample ensures every individual has an equal chance of being selected → representative results." },
          { question: "What does 'proportion' mean in 'What proportion passed?'?", options: ["Quantity", "Ratio/percentage", "Score", "Ranking"], answer: 1, explanation: "'Proportion' means the ratio or percentage relative to the whole." },
        ],
      },
      {
        id: "sat-math-word-problems",
        title: "Word Problems & Key Phrases",
        titleEn: "Word Problems & Key Phrases",
        level: 4,
        difficulty: "advanced",
        theory: `## Bài Toán Đố & Cụm Từ Quan Trọng (Word Problems)

Phần khó nhất của SAT Math không phải toán — mà là **dịch đề từ tiếng Anh sang phép toán**.

### Bảng chuyển đổi ngôn ngữ → toán:
| Tiếng Anh | Phép toán |
|-----------|-----------|
| "is" / "equals" | = |
| "more than" / "greater than" | + hoặc > |
| "less than" / "fewer than" | - hoặc < |
| "times" / "product of" | × |
| "divided by" / "quotient" | ÷ |
| "per" | ÷ (mỗi) |
| "of" (trong %) | × |
| "increased by" | + |
| "decreased by" | - |
| "twice" | × 2 |
| "half of" | ÷ 2 |
| "the sum of A and B" | A + B |
| "the difference between A and B" | A - B |
| "ratio of A to B" | A/B |`,
        theoryEn: `## Word Problems & Key Phrases

The hardest part of SAT Math isn't the math — it's **translating English into mathematical operations**.

### Language-to-Math Conversion:
| English | Operation |
|---------|-----------|
| "is" / "equals" | = |
| "more than" / "greater than" | + or > |
| "less than" / "fewer than" | - or < |
| "times" / "product of" | × |
| "divided by" / "quotient" | ÷ |
| "per" | ÷ (each) |
| "of" (in %) | × |
| "increased by" | + |
| "decreased by" | - |
| "twice" | × 2 |
| "half of" | ÷ 2 |
| "the sum of A and B" | A + B |
| "the difference between A and B" | A - B |
| "ratio of A to B" | A/B |`,
        proTips: [
          "'A number' = biến x (số chưa biết). 'A number increased by 5' = x + 5",
          "'Percent of' = nhân. '30% of 200' = 0.30 × 200 = 60",
          "Đọc câu cuối TRƯỚC — SAT hay hỏi 'What is the value of 2x?' chứ không phải x",
        ],
        proTipsEn: [
          "'A number' = variable x. 'A number increased by 5' = x + 5",
          "'Percent of' = multiply. '30% of 200' = 0.30 × 200 = 60",
          "Read the last sentence FIRST — SAT often asks for '2x', not x",
        ],
        vocabulary: [
          { word: "quotient", meaning: "thương (kết quả phép chia)", example: "The quotient of 20 and 4 is 5.", partOfSpeech: "noun" },
          { word: "remainder", meaning: "số dư", example: "When 17 is divided by 5, the remainder is 2.", partOfSpeech: "noun" },
          { word: "ratio", meaning: "tỷ số", example: "The ratio of boys to girls is 3:2.", partOfSpeech: "noun" },
          { word: "reciprocal", meaning: "nghịch đảo", example: "The reciprocal of 4 is 1/4.", partOfSpeech: "noun" },
          { word: "integer", meaning: "số nguyên", example: "Both positive and negative whole numbers are integers.", partOfSpeech: "noun" },
          { word: "factor", meaning: "ước số / thừa số", example: "The factors of 12 are 1, 2, 3, 4, 6, and 12.", partOfSpeech: "noun" },
          { word: "multiple", meaning: "bội số", example: "15 is a multiple of 3 and 5.", partOfSpeech: "noun" },
          { word: "prime number", meaning: "số nguyên tố", example: "7 is a prime number because it has only two factors.", partOfSpeech: "noun" },
          { word: "depreciate", meaning: "giảm giá trị", example: "The car depreciates by 15% each year.", partOfSpeech: "verb" },
          { word: "compound interest", meaning: "lãi kép", example: "The account earns compound interest at 5% annually.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dịch cụm từ tiếng Anh sang phép toán:",
            instructionEn: "Translate the English phrase into math:",
            sentences: [
              { text: "'The product of 6 and x' = ___", textEn: "'The product of 6 and x' = ___", answer: "6x", hint: "product = nhân" },
              { text: "'A number decreased by 7' = ___", textEn: "'A number decreased by 7' = ___", answer: "x - 7", hint: "decreased = trừ" },
              { text: "'The ratio of a to b' = ___", textEn: "'The ratio of a to b' = ___", answer: "a/b", hint: "ratio = tỷ số" },
              { text: "'Twice a number, increased by 3' = ___", textEn: "'Twice a number, increased by 3' = ___", answer: "2x + 3", hint: "twice = gấp đôi" },
              { text: "'25% of 80' = ___", textEn: "'25% of 80' = ___", answer: "20", hint: "of = nhân" },
            ],
          },
        ],
        quiz: [
          { question: "Which equation translates 'The sum of x and 12 is 30'?", options: ["x - 12 = 30", "x + 12 = 30", "12x = 30", "x/12 = 30"], answer: 1, explanation: "'Sum of' = addition, 'is' = equals → x + 12 = 30." },
          { question: "What is the remainder when 23 is divided by 5?", options: ["4", "3", "5", "2"], answer: 1, explanation: "23 ÷ 5 = 4 remainder 3. The remainder is 3." },
          { question: "What does 'The car depreciates by 20% annually' mean?", options: ["The car gains 20% value per year", "The car loses 20% of its value each year", "The car uses 20% less fuel", "The car runs 20% faster"], answer: 1, explanation: "'Depreciate' means to decrease in value. 20% annually = loses 20% value per year." },
          { question: "What does 'no fewer than 15' mean?", options: ["x < 15", "x ≤ 15", "x ≥ 15", "x > 15"], answer: 2, explanation: "'No fewer than 15' = 'at least 15' = x ≥ 15." },
          { question: "When SAT asks 'What is the value of 3x?', what should you do?", options: ["Find x and stop", "Find x then multiply by 3", "Divide the answer by 3", "Ignore the 3"], answer: 1, explanation: "The SAT often asks for an expression, not just the variable — always complete the final step!" },
        ],
      },
    ],
  },
  {
    id: "sat-advanced-reading",
    title: "SAT Advanced Reading Comprehension",
    titleEn: "SAT Advanced Reading Comprehension",
    icon: "📚",
    color: "rose",
    description: "Dạng bài đọc hiểu phức tạp trong SAT: khoa học, xã hội, văn học",
    descriptionEn: "Complex SAT reading comprehension: science, social studies, literature",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-adv-reading-science",
        title: "Science Passages",
        titleEn: "Science Passages",
        level: 4,
        difficulty: "advanced",
        theory: `## Đoạn Văn Khoa Học (Science Passages)

SAT thường có đoạn văn về **khoa học tự nhiên** (sinh học, hóa học, vật lý, thiên văn). Bạn không cần kiến thức chuyên môn — mọi thứ nằm trong đoạn văn.

### Đặc điểm:
- Có số liệu, biểu đồ, kết quả thí nghiệm
- Ngôn ngữ khách quan, trung lập
- Thường mô tả quá trình, nguyên nhân-kết quả, hoặc so sánh giả thuyết

### Chiến lược:
1. **Đọc introduction/conclusion trước** — nắm ý chính
2. **Xác định claim chính** của nhà nghiên cứu
3. **Chú ý đến số liệu** — SAT hay hỏi "theo bảng/biểu đồ, ..."
4. **Phân biệt fact vs. interpretation** — dữ liệu vs. kết luận tác giả
5. **Tìm từ tín hiệu**: "suggests", "indicates", "demonstrates"`,
        theoryEn: `## Science Passages

The SAT frequently includes **natural science** passages (biology, chemistry, physics, astronomy). You don't need specialized knowledge — everything is in the passage.

### Characteristics:
- Contains data, charts, experimental results
- Objective, neutral language
- Describes processes, cause-effect, or compares hypotheses

### Strategies:
1. **Read intro/conclusion first** — grasp the main idea
2. **Identify the main claim** of the researcher
3. **Pay attention to data** — SAT often asks "according to the table/chart..."
4. **Distinguish fact vs. interpretation** — data vs. author's conclusions
5. **Find signal words**: "suggests", "indicates", "demonstrates"`,
        proTips: [
          "Đoạn văn khoa học SAT KHÔNG yêu cầu bạn biết khoa học — chỉ cần đọc hiểu",
          "Khi có biểu đồ: đọc title → axes → units → trends TRƯỚC khi trả lời",
          "Cẩn thận với 'correlation vs causation' — SAT hay bẫy ở đây",
        ],
        proTipsEn: [
          "SAT science passages do NOT require prior science knowledge — just reading comprehension",
          "For charts: read title → axes → units → trends BEFORE answering",
          "Watch for 'correlation vs causation' — a common SAT trap",
        ],
        vocabulary: [
          { word: "hypothesis", meaning: "giả thuyết", example: "The hypothesis was supported by experimental data.", partOfSpeech: "noun" },
          { word: "variable", meaning: "biến số (trong thí nghiệm)", example: "The independent variable was temperature.", partOfSpeech: "noun" },
          { word: "catalyst", meaning: "chất xúc tác", example: "Enzymes act as biological catalysts.", partOfSpeech: "noun" },
          { word: "mutation", meaning: "đột biến", example: "A gene mutation led to a new trait.", partOfSpeech: "noun" },
          { word: "photosynthesis", meaning: "quang hợp", example: "Plants convert sunlight into energy through photosynthesis.", partOfSpeech: "noun" },
          { word: "ecosystem", meaning: "hệ sinh thái", example: "Coral reefs are diverse marine ecosystems.", partOfSpeech: "noun" },
          { word: "phenomena", meaning: "hiện tượng (số nhiều)", example: "Scientists study natural phenomena to understand the world.", partOfSpeech: "noun" },
          { word: "equilibrium", meaning: "trạng thái cân bằng", example: "The chemical reaction reached equilibrium.", partOfSpeech: "noun" },
          { word: "replicate", meaning: "lặp lại (thí nghiệm)", example: "Other labs replicated the experiment successfully.", partOfSpeech: "verb" },
          { word: "correlation", meaning: "tương quan", example: "Correlation does not imply causation.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ khoa học phù hợp:",
            instructionEn: "Fill in the appropriate science term:",
            sentences: [
              { text: "The researcher's ___ was that warmer temperatures increase growth.", textEn: "The researcher's ___ was that warmer temperatures increase growth.", answer: "hypothesis", hint: "giả thuyết" },
              { text: "The experiment must be ___ by other scientists to confirm results.", textEn: "The experiment must be ___ by other scientists to confirm results.", answer: "replicated", hint: "lặp lại" },
              { text: "___ does not imply causation.", textEn: "___ does not imply causation.", answer: "Correlation", hint: "tương quan" },
              { text: "The chemical system reached ___ after 30 minutes.", textEn: "The chemical system reached ___ after 30 minutes.", answer: "equilibrium", hint: "cân bằng" },
              { text: "A genetic ___ caused the organism to develop differently.", textEn: "A genetic ___ caused the organism to develop differently.", answer: "mutation", hint: "đột biến" },
            ],
          },
        ],
        quiz: [
          { question: "Why is 'correlation does not imply causation' important on the SAT?", options: ["It's not relevant", "Because the SAT often uses trap answers suggesting A causes B when only correlation exists", "Because correlation doesn't exist", "Because the SAT doesn't test science"], answer: 1, explanation: "The SAT often includes trap answers implying a causal relationship when only correlation exists." },
          { question: "What is the first step when reading a science passage?", options: ["Read from start to finish", "Read the introduction and conclusion first", "Skip the charts", "Read the questions last"], answer: 1, explanation: "The introduction/conclusion gives you the main idea — saving time compared to reading everything." },
          { question: "What does 'replicate an experiment' mean?", options: ["Cancel the experiment", "Repeat the experiment to confirm results", "Modify the experiment", "Criticize the experiment"], answer: 1, explanation: "'Replicate' means to repeat the experiment under the same conditions to confirm accuracy." },
          { question: "What is 'equilibrium' in science?", options: ["Imbalance", "A state of stable balance", "A fast reaction", "End of an experiment"], answer: 1, explanation: "'Equilibrium' is a state of balance where opposing forces or reactions are equal." },
          { question: "In an experiment, what is the 'independent variable'?", options: ["The variable being affected", "The variable deliberately changed by the researcher", "A constant variable", "The experimental result"], answer: 1, explanation: "The independent variable is the one deliberately changed by the researcher to observe its effect." },
        ],
      },
      {
        id: "sat-adv-reading-social",
        title: "Social Science & History Passages",
        titleEn: "Social Science & History Passages",
        level: 4,
        difficulty: "advanced",
        theory: `## Đoạn Văn Khoa Học Xã hội & Lịch sử

SAT bao gồm đoạn văn về **lịch sử, chính trị, kinh tế, tâm lý học và xã hội học**. Đặc biệt có trích đoạn từ các **Founding Documents** (Hiến pháp, Tuyên ngôn Độc lập Mỹ) và bài phát biểu lịch sử.

### Đặc điểm:
- Ngôn ngữ lập luận, thuyết phục
- Có thể có 2 đoạn văn đối lập (paired passages)
- Từ vựng cổ/trang trọng trong các tài liệu lịch sử
- Quan điểm rõ ràng của tác giả

### Chiến lược cho Paired Passages:
1. Đọc **Passage 1 trước** → trả lời câu hỏi riêng
2. Đọc **Passage 2** → trả lời câu hỏi riêng
3. Cuối cùng trả lời câu hỏi **so sánh 2 passages**`,
        theoryEn: `## Social Science & History Passages

The SAT includes passages on **history, politics, economics, psychology, and sociology**. Notably, it features excerpts from **Founding Documents** (Constitution, Declaration of Independence) and historical speeches.

### Characteristics:
- Argumentative, persuasive language
- May include paired passages with opposing views
- Formal/archaic vocabulary in historical documents
- Clear author viewpoint

### Paired Passages Strategy:
1. Read **Passage 1 first** → answer its questions
2. Read **Passage 2** → answer its questions
3. Finally answer **comparison questions**`,
        proTips: [
          "Founding Documents dùng tiếng Anh cổ — tập trung vào LẬP LUẬN, không phải từng từ",
          "Paired passages: xác định điểm ĐỒNG THUẬN và KHÁC BIỆT giữa 2 tác giả",
          "Tác giả thường có bias — tìm từ tín hiệu thể hiện quan điểm",
        ],
        proTipsEn: [
          "Founding Documents use archaic English — focus on ARGUMENTS, not individual words",
          "Paired passages: identify AGREEMENTS and DIFFERENCES between authors",
          "Authors often have bias — find signal words revealing their viewpoint",
        ],
        vocabulary: [
          { word: "democracy", meaning: "dân chủ", example: "Democracy gives citizens the right to vote.", partOfSpeech: "noun" },
          { word: "liberty", meaning: "tự do", example: "The Founding Fathers fought for liberty.", partOfSpeech: "noun" },
          { word: "sovereignty", meaning: "chủ quyền", example: "National sovereignty must be respected.", partOfSpeech: "noun" },
          { word: "advocate", meaning: "ủng hộ / người vận động", example: "She is a strong advocate for civil rights.", partOfSpeech: "noun/verb" },
          { word: "legislation", meaning: "pháp luật, luật pháp", example: "New legislation was passed to protect workers.", partOfSpeech: "noun" },
          { word: "rhetoric", meaning: "thuật hùng biện", example: "The politician's rhetoric swayed public opinion.", partOfSpeech: "noun" },
          { word: "sentiment", meaning: "tình cảm, quan điểm", example: "Public sentiment turned against the policy.", partOfSpeech: "noun" },
          { word: "suffrage", meaning: "quyền bầu cử", example: "The suffrage movement won women the right to vote.", partOfSpeech: "noun" },
          { word: "abolition", meaning: "sự bãi bỏ", example: "The abolition of slavery was a turning point in history.", partOfSpeech: "noun" },
          { word: "dissent", meaning: "sự bất đồng", example: "Political dissent is protected by the First Amendment.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ khoa học xã hội phù hợp:",
            instructionEn: "Fill in the appropriate social science term:",
            sentences: [
              { text: "The ___ movement fought to end slavery in America.", textEn: "The ___ movement fought to end slavery in America.", answer: "abolition", hint: "sự bãi bỏ" },
              { text: "Women's ___ was achieved in 1920 with the 19th Amendment.", textEn: "Women's ___ was achieved in 1920 with the 19th Amendment.", answer: "suffrage", hint: "quyền bầu cử" },
              { text: "The politician used powerful ___ to persuade voters.", textEn: "The politician used powerful ___ to persuade voters.", answer: "rhetoric", hint: "hùng biện" },
              { text: "New ___ was introduced to address income inequality.", textEn: "New ___ was introduced to address income inequality.", answer: "legislation", hint: "luật pháp" },
              { text: "Public ___ shifted after the scandal was revealed.", textEn: "Public ___ shifted after the scandal was revealed.", answer: "sentiment", hint: "quan điểm" },
            ],
          },
        ],
        quiz: [
          { question: "What is the best strategy for paired passages?", options: ["Read both at once", "Read P1 → answer P1, read P2 → answer P2, then compare", "Only read P2", "Read questions first, skip passages"], answer: 1, explanation: "Process each passage separately first, then answer comparison questions — avoids confusion." },
          { question: "What does 'suffrage' mean?", options: ["Suffering", "The right to vote", "Freedom", "Equality"], answer: 1, explanation: "'Suffrage' means the right to vote. Note: it is NOT related to 'suffering'." },
          { question: "What does 'dissent' mean in politics?", options: ["Agreement", "Disagreement or opposition", "Voting", "Violent protest"], answer: 1, explanation: "'Dissent' means disagreement or opposition — a protected right." },
          { question: "When reading Founding Documents, what should you focus on?", options: ["The meaning of every archaic word", "The author's arguments and main ideas", "Old grammar rules", "Statistics and data"], answer: 1, explanation: "Focus on the ARGUMENT — the main reasoning — not on understanding every archaic word." },
          { question: "What is 'rhetoric'?", options: ["Law", "The art of persuasive communication", "History", "Science"], answer: 1, explanation: "'Rhetoric' is the art of using language effectively to persuade or influence." },
        ],
      },
      {
        id: "sat-adv-reading-literary",
        title: "Literary & Narrative Passages",
        titleEn: "Literary & Narrative Passages",
        level: 4,
        difficulty: "advanced",
        theory: `## Đoạn Văn Văn Học & Tự Sự (Literary & Narrative)

SAT có đoạn trích từ **tiểu thuyết, truyện ngắn** hoặc hồi ký. Đây là phần nhiều học sinh thấy khó nhất vì phải hiểu **cảm xúc, động cơ nhân vật** và kỹ thuật viết.

### Yếu tố cần phân tích:
- **Characterization**: Tính cách nhân vật thể hiện qua hành động, lời nói, suy nghĩ
- **Tone**: Giọng điệu tác giả (ironic, somber, optimistic...)
- **Point of view**: Ngôi kể (first person, third person limited/omniscient)
- **Imagery**: Hình ảnh, chi tiết cảm quan
- **Theme**: Chủ đề ẩn sau câu chuyện

### Chiến lược:
1. Xác định **narrator** — ai đang kể? Họ biết gì?
2. Chú ý **thay đổi cảm xúc** — nhân vật chuyển từ vui → buồn?
3. Tìm **imagery & metaphor** — SAT hay hỏi về chúng
4. Đừng đọc quá chi tiết — nắm **arc** (diễn biến chính)`,
        theoryEn: `## Literary & Narrative Passages

The SAT includes excerpts from **novels, short stories**, or memoirs. This is the section many students find hardest because it requires understanding **emotions, character motivation**, and literary techniques.

### Elements to Analyze:
- **Characterization**: Character revealed through actions, speech, thoughts
- **Tone**: Author's attitude (ironic, somber, optimistic...)
- **Point of view**: Narrative perspective (first/third person)
- **Imagery**: Sensory details and descriptions
- **Theme**: Underlying message of the story

### Strategies:
1. Identify the **narrator** — who's telling? What do they know?
2. Note **emotional shifts** — does the character go from happy → sad?
3. Find **imagery & metaphor** — SAT frequently asks about these
4. Don't over-read — grasp the **arc** (main progression)`,
        proTips: [
          "Tone words: somber (u ám), whimsical (kỳ quặc), nostalgic (hoài niệm), sardonic (mỉa mai)",
          "Câu hỏi 'characterization' — tìm bằng chứng qua HÀNH ĐỘNG, không phải lời tự thuật",
          "Đoạn văn văn học thường có nghĩa bóng — đừng hiểu literal (theo nghĩa đen)",
        ],
        proTipsEn: [
          "Tone words: somber, whimsical, nostalgic, sardonic — learn to identify them",
          "Characterization questions — find evidence through ACTIONS, not self-description",
          "Literary passages often use figurative language — don't read literally",
        ],
        vocabulary: [
          { word: "protagonist", meaning: "nhân vật chính", example: "The protagonist faces a difficult moral choice.", partOfSpeech: "noun" },
          { word: "antagonist", meaning: "nhân vật phản diện", example: "The antagonist creates obstacles for the hero.", partOfSpeech: "noun" },
          { word: "metaphor", meaning: "ẩn dụ", example: "'Life is a journey' is a common metaphor.", partOfSpeech: "noun" },
          { word: "irony", meaning: "sự mỉa mai, trớ trêu", example: "The irony is that the fire station burned down.", partOfSpeech: "noun" },
          { word: "foreshadowing", meaning: "phục bút, báo hiệu", example: "The dark clouds foreshadowed the coming tragedy.", partOfSpeech: "noun" },
          { word: "somber", meaning: "u ám, buồn bã", example: "The room had a somber atmosphere after the news.", partOfSpeech: "adjective" },
          { word: "nostalgic", meaning: "hoài niệm", example: "She felt nostalgic for her childhood home.", partOfSpeech: "adjective" },
          { word: "sardonic", meaning: "mỉa mai cay độc", example: "His sardonic comment silenced the room.", partOfSpeech: "adjective" },
          { word: "melancholy", meaning: "u sầu", example: "A feeling of melancholy pervaded the story.", partOfSpeech: "noun/adjective" },
          { word: "whimsical", meaning: "kỳ quặc, ngộ nghĩnh", example: "The author's whimsical style charmed readers.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ văn học phù hợp:",
            instructionEn: "Fill in the appropriate literary term:",
            sentences: [
              { text: "The main character of a story is called the ___.", textEn: "The main character of a story is called the ___.", answer: "protagonist", hint: "nhân vật chính" },
              { text: "'Time is money' is an example of a ___.", textEn: "'Time is money' is an example of a ___.", answer: "metaphor", hint: "ẩn dụ" },
              { text: "The ___ tone of the passage suggests the narrator is sad.", textEn: "The ___ tone of the passage suggests the narrator is sad.", answer: "somber", hint: "u ám" },
              { text: "The early hint about danger is an example of ___.", textEn: "The early hint about danger is an example of ___.", answer: "foreshadowing", hint: "báo hiệu" },
              { text: "His ___ humor was sharp but often hurtful.", textEn: "His ___ humor was sharp but often hurtful.", answer: "sardonic", hint: "mỉa mai" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["the", "protagonist", "a", "faces", "choice", "moral", "difficult"], correct: "The protagonist faces a difficult moral choice.", correctEn: "The protagonist faces a difficult moral choice." },
              { scrambled: ["of", "pervaded", "feeling", "melancholy", "A", "story", "the"], correct: "A feeling of melancholy pervaded the story.", correctEn: "A feeling of melancholy pervaded the story." },
            ],
          },
        ],
        quiz: [
          { question: "What is 'irony' in literature?", options: ["Repetition", "When reality is opposite to expectations", "A direct comparison", "Detailed description"], answer: 1, explanation: "Irony occurs when the outcome or situation is the opposite of what is expected." },
          { question: "What is the best way to identify the 'tone' of a passage?", options: ["Read the title", "Analyze the author's word choice", "Count the sentences", "Find the protagonist"], answer: 1, explanation: "Tone is revealed through word choice — the language an author uses shows their attitude." },
          { question: "What is the purpose of 'foreshadowing'?", options: ["To end the story", "To hint at future events", "To explain the past", "To describe characters"], answer: 1, explanation: "Foreshadowing provides early hints about what will happen — building suspense in the story." },
          { question: "What emotion does 'nostalgic' describe?", options: ["Anger", "Longing for the past", "Anxiety", "Excitement"], answer: 1, explanation: "'Nostalgic' describes a sentimental longing for the past." },
          { question: "What do SAT literary passages typically ask about?", options: ["Literary history knowledge", "Character emotions, motivations, and writing techniques", "Author biographies", "Grammar in the passage"], answer: 1, explanation: "The SAT focuses on analyzing characters, tone, and imagery — not literary history knowledge." },
        ],
      },
      {
        id: "sat-adv-reading-dual-passage",
        title: "Dual Passage & Cross-Text Analysis",
        titleEn: "Dual Passage & Cross-Text Analysis",
        level: 5,
        difficulty: "advanced",
        theory: `## Phân tích Đa văn bản (Dual Passage & Cross-Text)

Digital SAT có dạng bài **Cross-Text Connections** — hai đoạn văn ngắn về cùng chủ đề nhưng quan điểm khác nhau. Bạn phải phân tích mối quan hệ giữa chúng.

### Các dạng mối quan hệ:
1. **Agreement** — cả 2 đồng ý nhưng với góc nhìn khác
2. **Disagreement** — đối lập trực tiếp
3. **Extension** — Text 2 mở rộng ý Text 1
4. **Qualification** — Text 2 hạn chế/điều chỉnh claim Text 1
5. **Application** — Text 2 áp dụng lý thuyết Text 1 vào thực tế

### Chiến lược:
1. Xác định **claim chính** của từng text
2. Tìm **từ khóa chung** — cả 2 đang nói về gì?
3. Xác định **mối quan hệ**: đồng ý? phản đối? bổ sung?
4. Chú ý đến **scope** — Text 1 nói chung, Text 2 nói cụ thể?`,
        theoryEn: `## Dual Passage & Cross-Text Analysis

The Digital SAT features **Cross-Text Connections** — two short passages on the same topic with different perspectives. You must analyze the relationship between them.

### Relationship Types:
1. **Agreement** — both agree but with different angles
2. **Disagreement** — direct opposition
3. **Extension** — Text 2 expands on Text 1
4. **Qualification** — Text 2 limits/modifies Text 1's claim
5. **Application** — Text 2 applies Text 1's theory to practice

### Strategy:
1. Identify the **main claim** of each text
2. Find **shared keywords** — what are both discussing?
3. Determine the **relationship**: agree? disagree? supplement?
4. Note the **scope** — Text 1 general, Text 2 specific?`,
        proTips: [
          "Đừng nhầm 'partial agreement' với 'full agreement' — SAT phân biệt rất kỹ",
          "Câu hỏi thường: 'How would Author 2 respond to Author 1's claim?'",
          "'Qualify' không có nghĩa 'đạt chuẩn' ở đây — mà là 'hạn chế, điều chỉnh'",
        ],
        proTipsEn: [
          "Don't confuse 'partial agreement' with 'full agreement' — SAT is precise",
          "Common question: 'How would Author 2 respond to Author 1's claim?'",
          "'Qualify' here doesn't mean 'meet standards' — it means 'limit, modify'",
        ],
        vocabulary: [
          { word: "counterargument", meaning: "lập luận phản bác", example: "The author addresses potential counterarguments.", partOfSpeech: "noun" },
          { word: "nuanced", meaning: "có nhiều sắc thái", example: "Her position is more nuanced than a simple yes or no.", partOfSpeech: "adjective" },
          { word: "reconcile", meaning: "hòa giải, dung hòa", example: "It is difficult to reconcile the two opposing views.", partOfSpeech: "verb" },
          { word: "diverge", meaning: "phân kỳ, khác biệt", example: "The two theories diverge on the role of genetics.", partOfSpeech: "verb" },
          { word: "converge", meaning: "hội tụ, đồng quy", example: "Both studies converge on the same conclusion.", partOfSpeech: "verb" },
          { word: "caveat", meaning: "lưu ý, cảnh báo", example: "The study includes an important caveat about sample size.", partOfSpeech: "noun" },
          { word: "concur", meaning: "đồng ý", example: "Both researchers concur that more data is needed.", partOfSpeech: "verb" },
          { word: "contend", meaning: "tranh luận, khẳng định", example: "Author 1 contends that education is the key to equality.", partOfSpeech: "verb" },
          { word: "underpin", meaning: "làm nền tảng", example: "Strong evidence underpins the researcher's claim.", partOfSpeech: "verb" },
          { word: "supersede", meaning: "thay thế, vượt qua", example: "The new theory supersedes the old one.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phân tích phù hợp:",
            instructionEn: "Fill in the appropriate analytical term:",
            sentences: [
              { text: "The two theories ___ on the importance of environment.", textEn: "The two theories ___ on the importance of environment.", answer: "converge", hint: "hội tụ" },
              { text: "Author 2 raises a ___ that limits Author 1's conclusion.", textEn: "Author 2 raises a ___ that limits Author 1's conclusion.", answer: "caveat", hint: "lưu ý" },
              { text: "The new research ___ the previous findings.", textEn: "The new research ___ the previous findings.", answer: "supersedes", hint: "thay thế" },
              { text: "Both experts ___ that climate change is urgent.", textEn: "Both experts ___ that climate change is urgent.", answer: "concur", hint: "đồng ý" },
              { text: "It is hard to ___ these conflicting viewpoints.", textEn: "It is hard to ___ these conflicting viewpoints.", answer: "reconcile", hint: "dung hòa" },
            ],
          },
        ],
        quiz: [
          { question: "Trong Cross-Text, 'qualification' nghĩa là gì?", options: ["Đồng ý hoàn toàn", "Text 2 hạn chế/điều chỉnh claim của Text 1", "Text 2 bác bỏ Text 1", "Không liên quan"], answer: 1, explanation: "Qualification = Text 2 không phản đối hoàn toàn mà hạn chế, đặt điều kiện cho claim Text 1." },
          { question: "'Diverge' và 'converge' khác nhau thế nào?", options: ["Cùng nghĩa", "Diverge = khác biệt; Converge = hội tụ", "Diverge = đồng ý; Converge = phản đối", "Không liên quan"], answer: 1, explanation: "Diverge = tách ra, khác biệt. Converge = gặp nhau, đồng thuận." },
          { question: "Câu hỏi 'How would Author 2 respond?' yêu cầu gì?", options: ["Tóm tắt Text 2", "Dự đoán phản ứng của Author 2 đối với claim Author 1", "Đồng ý với Author 1", "Viết thêm đoạn văn"], answer: 1, explanation: "Bạn phải suy luận Author 2 sẽ phản ứng thế nào dựa trên quan điểm đã thể hiện trong Text 2." },
          { question: "'Caveat' có nghĩa là gì?", options: ["Kết luận", "Lưu ý/cảnh báo hạn chế", "Sự đồng ý", "Dữ liệu"], answer: 1, explanation: "'Caveat' = lưu ý, cảnh báo — thường chỉ ra giới hạn hoặc ngoại lệ của kết luận." },
          { question: "'Supersede' có nghĩa gì?", options: ["Bổ sung", "Thay thế và vượt qua", "Lặp lại", "Hỗ trợ"], answer: 1, explanation: "'Supersede' = thay thế cái cũ bằng cái mới tốt hơn." },
        ],
      },
    ],
  },
];
