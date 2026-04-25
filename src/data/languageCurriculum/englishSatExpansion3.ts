// SAT Expansion Module Set 3: Geometry & Data Vocabulary, Advanced Reading Strategies,
// Essay Writing Skills, and Math Word Problems
import type { LanguageModule } from "./types";

export const satExpansionModules3: LanguageModule[] = [
  // ============================================================
  // MODULE 1: SAT Geometry & Data Analysis Vocabulary
  // ============================================================
  {
    id: "sat-geometry-data-vocab",
    title: "Từ vựng Hình học & Phân tích Dữ liệu SAT",
    titleEn: "SAT Geometry & Data Analysis Vocabulary",
    icon: "📊",
    color: "indigo",
    description: "Bộ từ vựng cốt lõi cho phần Hình học, Lượng giác và Phân tích Dữ liệu trên SAT Math.",
    descriptionEn: "Core vocabulary for Geometry, Trigonometry, and Data Analysis on the SAT Math section.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-geometry-terms",
        title: "Thuật ngữ Hình học Phẳng (Plane Geometry Terms)",
        titleEn: "Plane Geometry Terms",
        level: 4,
        difficulty: "advanced",
        theory:
          "SAT Math thường dùng các thuật ngữ hình học chính xác - hiểu sai một từ là sai cả bài. Nhóm cốt lõi cần thuộc:\n\n**1. Đường & Góc:** parallel (song song), perpendicular (vuông góc), bisect (chia đôi), congruent (bằng nhau), supplementary (bù nhau, tổng 180°), complementary (phụ nhau, tổng 90°).\n\n**2. Tam giác:** isosceles (cân), equilateral (đều), scalene (thường), hypotenuse (cạnh huyền), acute/obtuse/right (nhọn/tù/vuông).\n\n**3. Đường tròn:** radius, diameter, chord (dây cung), arc (cung), tangent (tiếp tuyến), circumference (chu vi), inscribed (nội tiếp), circumscribed (ngoại tiếp).\n\n**4. Đa giác:** quadrilateral (tứ giác), polygon (đa giác), regular (đều), vertex (đỉnh), perimeter (chu vi).\n\nMẹo: SAT thường giấu thông tin trong từ ngữ hơn là hình vẽ - đọc kỹ 'isosceles right triangle' = vừa cân vừa vuông → 2 cạnh góc vuông bằng nhau.",
        theoryEn:
          "SAT Math uses precise geometric terminology - misreading one word can ruin a problem. Core groups to master:\n\n**1. Lines & Angles:** parallel, perpendicular, bisect, congruent, supplementary (sum 180°), complementary (sum 90°).\n\n**2. Triangles:** isosceles, equilateral, scalene, hypotenuse, acute/obtuse/right.\n\n**3. Circles:** radius, diameter, chord, arc, tangent, circumference, inscribed, circumscribed.\n\n**4. Polygons:** quadrilateral, polygon, regular, vertex, perimeter.\n\nTip: SAT often hides info in words rather than diagrams - 'isosceles right triangle' = both isosceles AND right → two equal legs.",
        proTips: [
          "Khoanh tròn từ khóa hình học trong đề trước khi vẽ hình.",
          "Vẽ lại hình theo tỉ lệ thực - hình SAT cảnh báo 'not drawn to scale' rất hay đánh lừa.",
          "Học cặp từ trái nghĩa: parallel↔perpendicular, acute↔obtuse, inscribed↔circumscribed.",
        ],
        proTipsEn: [
          "Circle geometric keywords in the prompt before drawing.",
          "Redraw figures to true scale - 'not drawn to scale' figures often mislead.",
          "Learn opposing pairs: parallel↔perpendicular, acute↔obtuse, inscribed↔circumscribed.",
        ],
        vocabulary: [
          { word: "perpendicular", ipa: "/ˌpɜːrpənˈdɪkjələr/", meaning: "vuông góc", meaningEn: "at a 90° angle to", example: "Line AB is perpendicular to line CD.", exampleEn: "Line AB is perpendicular to line CD.", partOfSpeech: "adjective" },
          { word: "bisect", ipa: "/baɪˈsekt/", meaning: "chia đôi", meaningEn: "to divide into two equal parts", example: "The diagonal bisects the angle.", exampleEn: "The diagonal bisects the angle.", partOfSpeech: "verb" },
          { word: "congruent", ipa: "/ˈkɒŋɡruənt/", meaning: "bằng nhau (về hình dạng)", meaningEn: "identical in form", example: "The two triangles are congruent.", exampleEn: "The two triangles are congruent.", partOfSpeech: "adjective" },
          { word: "supplementary", ipa: "/ˌsʌplɪˈmentəri/", meaning: "bù nhau (180°)", meaningEn: "summing to 180°", example: "Angles on a straight line are supplementary.", exampleEn: "Angles on a straight line are supplementary.", partOfSpeech: "adjective" },
          { word: "isosceles", ipa: "/aɪˈsɒsəliːz/", meaning: "tam giác cân", meaningEn: "having two equal sides", example: "An isosceles triangle has two equal angles.", exampleEn: "An isosceles triangle has two equal angles.", partOfSpeech: "adjective" },
          { word: "hypotenuse", ipa: "/haɪˈpɒtənuːz/", meaning: "cạnh huyền", meaningEn: "longest side of a right triangle", example: "Use the Pythagorean theorem to find the hypotenuse.", exampleEn: "Use the Pythagorean theorem to find the hypotenuse.", partOfSpeech: "noun" },
          { word: "tangent", ipa: "/ˈtændʒənt/", meaning: "tiếp tuyến", meaningEn: "a line touching a curve at one point", example: "The tangent meets the circle at exactly one point.", exampleEn: "The tangent meets the circle at exactly one point.", partOfSpeech: "noun" },
          { word: "circumference", ipa: "/sərˈkʌmfərəns/", meaning: "chu vi đường tròn", meaningEn: "perimeter of a circle", example: "Circumference equals 2πr.", exampleEn: "Circumference equals 2πr.", partOfSpeech: "noun" },
          { word: "inscribed", ipa: "/ɪnˈskraɪbd/", meaning: "nội tiếp", meaningEn: "drawn inside another figure", example: "An inscribed angle is half its arc.", exampleEn: "An inscribed angle is half its arc.", partOfSpeech: "adjective" },
          { word: "vertex", ipa: "/ˈvɜːrteks/", meaning: "đỉnh", meaningEn: "a corner point", example: "A triangle has three vertices.", exampleEn: "A triangle has three vertices.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ hình học chính xác.",
            instructionEn: "Fill in the precise geometric term.",
            sentences: [
              { text: "Two lines that meet at 90° are ___.", textEn: "Two lines that meet at 90° are ___.", answer: "perpendicular", hint: "Trái nghĩa với 'parallel'." },
              { text: "A triangle with two equal sides is called ___.", textEn: "A triangle with two equal sides is called ___.", answer: "isosceles", hint: "Không phải 'equilateral'." },
              { text: "The longest side of a right triangle is the ___.", textEn: "The longest side of a right triangle is the ___.", answer: "hypotenuse", hint: "Đối diện góc vuông." },
              { text: "Two angles that sum to 180° are ___.", textEn: "Two angles that sum to 180° are ___.", answer: "supplementary", hint: "S = Straight line." },
              { text: "The corner point of a polygon is a ___.", textEn: "The corner point of a polygon is a ___.", answer: "vertex", hint: "Số nhiều: vertices." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which term means 'to divide into two equal parts'?",
            options: ["intersect", "bisect", "tangent", "inscribe"],
            answer: 1,
            explanation: "'Bisect' literally means 'to cut in two' (bi- + -sect).",
          },
          {
            question: "If two angles are complementary, their sum is:",
            options: ["90°", "180°", "270°", "360°"],
            answer: 0,
            explanation: "Complementary = 90°; supplementary = 180°. Memorize the pair.",
          },
          {
            question: "An angle inscribed in a semicircle is always:",
            options: ["acute", "obtuse", "right (90°)", "reflex"],
            answer: 2,
            explanation: "Thales' theorem: any angle inscribed in a semicircle is a right angle.",
          },
        ],
      },
      {
        id: "sat-data-statistics-terms",
        title: "Thuật ngữ Thống kê & Dữ liệu (Statistics & Data Vocabulary)",
        titleEn: "Statistics & Data Vocabulary",
        level: 4,
        difficulty: "advanced",
        theory:
          "Phần 'Problem Solving & Data Analysis' chiếm ~29% SAT Math. Hiểu sai từ thống kê = mất điểm dễ.\n\n**1. Đo trung tâm:** mean (trung bình cộng), median (trung vị), mode (yếu vị), range (khoảng biến thiên).\n\n**2. Phân tán:** standard deviation (độ lệch chuẩn), variance, outlier (giá trị ngoại lai), interquartile range.\n\n**3. Khái niệm dữ liệu:** sample (mẫu), population (tổng thể), random (ngẫu nhiên), bias (thiên lệch), correlation (tương quan), causation (nhân quả).\n\n**4. Biểu đồ:** scatter plot (biểu đồ phân tán), histogram, box plot, frequency, density.\n\n**5. Xác suất & tỉ lệ:** probability, ratio, proportion, percent change, rate.\n\n**Bẫy SAT cổ điển:** correlation ≠ causation. Hai biến có tương quan KHÔNG nghĩa là biến này gây ra biến kia.",
        theoryEn:
          "'Problem Solving & Data Analysis' makes up ~29% of SAT Math. Misreading stats vocabulary = easy points lost.\n\n**1. Central tendency:** mean, median, mode, range.\n\n**2. Spread:** standard deviation, variance, outlier, interquartile range.\n\n**3. Data concepts:** sample, population, random, bias, correlation, causation.\n\n**4. Charts:** scatter plot, histogram, box plot, frequency, density.\n\n**5. Probability & proportion:** probability, ratio, proportion, percent change, rate.\n\n**Classic SAT trap:** correlation ≠ causation.",
        proTips: [
          "Outlier kéo MEAN nhưng không ảnh hưởng MEDIAN nhiều - nhớ điều này khi đề hỏi 'biện pháp đo nào ổn định hơn'.",
          "'Random sample' là điều kiện để khái quát kết quả về tổng thể.",
          "Tương quan (correlation) chỉ là mối quan hệ thống kê, KHÔNG phải nguyên nhân.",
        ],
        proTipsEn: [
          "Outliers shift the MEAN but barely affect the MEDIAN - remember this when asked which measure is more robust.",
          "'Random sample' is required to generalize results to a population.",
          "Correlation is a statistical relationship, NOT causation.",
        ],
        vocabulary: [
          { word: "median", ipa: "/ˈmiːdiən/", meaning: "trung vị", meaningEn: "the middle value of a sorted dataset", example: "The median income is more representative than the mean.", exampleEn: "The median income is more representative than the mean.", partOfSpeech: "noun" },
          { word: "outlier", ipa: "/ˈaʊtlaɪər/", meaning: "giá trị ngoại lai", meaningEn: "a value far from the others", example: "The outlier skewed the average.", exampleEn: "The outlier skewed the average.", partOfSpeech: "noun" },
          { word: "correlation", ipa: "/ˌkɒrəˈleɪʃn/", meaning: "tương quan", meaningEn: "mutual statistical relationship", example: "There is a strong correlation between study time and scores.", exampleEn: "There is a strong correlation between study time and scores.", partOfSpeech: "noun" },
          { word: "causation", ipa: "/kɔːˈzeɪʃn/", meaning: "quan hệ nhân quả", meaningEn: "one event causing another", example: "Correlation does not imply causation.", exampleEn: "Correlation does not imply causation.", partOfSpeech: "noun" },
          { word: "deviation", ipa: "/ˌdiːviˈeɪʃn/", meaning: "độ lệch", meaningEn: "amount of difference from a standard", example: "Standard deviation measures spread.", exampleEn: "Standard deviation measures spread.", partOfSpeech: "noun" },
          { word: "sample", ipa: "/ˈsæmpl/", meaning: "mẫu (thống kê)", meaningEn: "a subset of a population", example: "A random sample of 500 voters was surveyed.", exampleEn: "A random sample of 500 voters was surveyed.", partOfSpeech: "noun" },
          { word: "bias", ipa: "/ˈbaɪəs/", meaning: "thiên lệch", meaningEn: "systematic error in sampling or judgment", example: "Selection bias undermined the study.", exampleEn: "Selection bias undermined the study.", partOfSpeech: "noun" },
          { word: "scatter plot", ipa: "/ˈskætər plɒt/", meaning: "biểu đồ phân tán", meaningEn: "graph showing relationships between two variables", example: "The scatter plot shows a positive trend.", exampleEn: "The scatter plot shows a positive trend.", partOfSpeech: "noun" },
          { word: "frequency", ipa: "/ˈfriːkwənsi/", meaning: "tần suất", meaningEn: "how often something occurs", example: "The histogram shows the frequency of each score.", exampleEn: "The histogram shows the frequency of each score.", partOfSpeech: "noun" },
          { word: "proportion", ipa: "/prəˈpɔːrʃn/", meaning: "tỉ lệ", meaningEn: "a part considered in relation to the whole", example: "Solve for x using the proportion 3:5 = x:25.", exampleEn: "Solve for x using the proportion 3:5 = x:25.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ thống kê chính xác.",
            instructionEn: "Fill in the correct statistical term.",
            sentences: [
              { text: "The middle value of a sorted dataset is the ___.", textEn: "The middle value of a sorted dataset is the ___.", answer: "median", hint: "Khác với 'mean'." },
              { text: "A value much greater or smaller than the rest is an ___.", textEn: "A value much greater or smaller than the rest is an ___.", answer: "outlier", hint: "Out- + lie + -er." },
              { text: "Correlation does not imply ___.", textEn: "Correlation does not imply ___.", answer: "causation", hint: "Nguyên tắc kinh điển." },
              { text: "A subset chosen to represent a population is a ___.", textEn: "A subset chosen to represent a population is a ___.", answer: "sample", hint: "Cần phải 'random' để khái quát." },
              { text: "Standard ___ measures how spread out the data is.", textEn: "Standard ___ measures how spread out the data is.", answer: "deviation", hint: "De- + viation." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which measure is LEAST affected by an outlier?",
            options: ["mean", "median", "range", "standard deviation"],
            answer: 1,
            explanation: "The median uses position, not value - it barely shifts when an outlier is added.",
          },
          {
            question: "A scatter plot shows a downward trend. The correlation is:",
            options: ["positive", "negative", "zero", "undefined"],
            answer: 1,
            explanation: "Downward trend = as x increases, y decreases = negative correlation.",
          },
          {
            question: "To generalize a study's results to the entire population, the sample must be:",
            options: ["large only", "convenient", "random and representative", "homogeneous"],
            answer: 2,
            explanation: "Random + representative sampling minimizes bias and supports generalization.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 2: SAT Advanced Reading Strategies
  // ============================================================
  {
    id: "sat-advanced-reading-strategies",
    title: "Chiến lược Đọc hiểu SAT Nâng cao",
    titleEn: "SAT Advanced Reading Strategies",
    icon: "🔍",
    color: "blue",
    description: "Kỹ thuật xử lý các dạng câu hỏi khó nhất trong SAT Reading: inference, function, dual-passage.",
    descriptionEn: "Techniques for the hardest SAT Reading question types: inference, function, dual-passage.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-inference-questions",
        title: "Câu hỏi Suy luận (Inference Questions)",
        titleEn: "Inference Questions",
        level: 4,
        difficulty: "advanced",
        theory:
          "Câu hỏi inference yêu cầu bạn rút ra kết luận KHÔNG nói trực tiếp trong bài, nhưng phải có BẰNG CHỨNG từ văn bản. Khác hẳn câu 'detail' (đáp án in nguyên trong bài).\n\n**Dấu hiệu nhận diện:** 'It can be inferred that...', 'The author suggests...', 'The passage implies...'\n\n**Quy tắc vàng:** đáp án đúng phải là bước suy luận GẦN NHẤT - không xa hơn, không bóp méo. SAT KHÔNG bao giờ thưởng cho 'suy luận sáng tạo'.\n\n**Bẫy phổ biến:**\n- Đáp án đúng phần (partially true) - chỉ đúng 50% so với bài.\n- Đáp án quá tuyệt đối (always, never, all, none) - hiếm khi đúng trên SAT.\n- Đáp án vượt ngoài phạm vi (out of scope).\n\n**Quy trình 4 bước:**\n1. Đọc câu hỏi trước, gạch chân từ khóa.\n2. Quay lại đoạn được trích, đọc thêm 2 câu trên + dưới.\n3. Diễn đạt ý ngầm bằng lời mình TRƯỚC khi xem đáp án.\n4. Loại bỏ từng đáp án - giữ đáp án có thể chứng minh bằng bằng chứng cụ thể.",
        theoryEn:
          "Inference questions require you to draw a conclusion NOT explicitly stated, but with TEXTUAL EVIDENCE. Different from 'detail' questions (where the answer is verbatim).\n\n**Signal phrases:** 'It can be inferred...', 'The author suggests...', 'The passage implies...'\n\n**Golden rule:** the correct answer is the SHORTEST inferential step - never further. SAT does not reward creative leaps.\n\n**Common traps:**\n- Partially true answers.\n- Absolute language (always, never, all).\n- Out-of-scope answers.\n\n**4-step process:** read the question first → return to cited lines + 2 above/below → predict the implication in your own words → eliminate.",
        proTips: [
          "Nếu phải suy luận quá xa, đáp án đó SAI.",
          "Tránh đáp án có 'always', 'never', 'all', 'none' trừ khi bài viết tuyệt đối hóa rõ ràng.",
          "Diễn đạt câu trả lời TRƯỚC khi nhìn 4 lựa chọn - tránh bị mồi (anchored).",
        ],
        proTipsEn: [
          "If you have to leap far to justify an answer, it's wrong.",
          "Avoid 'always/never/all/none' unless the passage is itself absolute.",
          "Predict the answer in your own words BEFORE looking at choices - avoid anchoring bias.",
        ],
        vocabulary: [
          { word: "infer", ipa: "/ɪnˈfɜːr/", meaning: "suy luận", meaningEn: "to draw a conclusion from evidence", example: "Readers must infer the author's tone.", exampleEn: "Readers must infer the author's tone.", partOfSpeech: "verb" },
          { word: "imply", ipa: "/ɪmˈplaɪ/", meaning: "ngụ ý", meaningEn: "to suggest indirectly", example: "The passage implies disagreement.", exampleEn: "The passage implies disagreement.", partOfSpeech: "verb" },
          { word: "evidence", ipa: "/ˈevɪdəns/", meaning: "bằng chứng", meaningEn: "support from the text", example: "Cite specific evidence for your inference.", exampleEn: "Cite specific evidence for your inference.", partOfSpeech: "noun" },
          { word: "explicit", ipa: "/ɪkˈsplɪsɪt/", meaning: "rõ ràng, trực tiếp", meaningEn: "stated directly", example: "The author makes the claim explicit.", exampleEn: "The author makes the claim explicit.", partOfSpeech: "adjective" },
          { word: "implicit", ipa: "/ɪmˈplɪsɪt/", meaning: "ngầm, hàm ẩn", meaningEn: "suggested but not stated", example: "The criticism is implicit, not direct.", exampleEn: "The criticism is implicit, not direct.", partOfSpeech: "adjective" },
          { word: "absolute", ipa: "/ˈæbsəluːt/", meaning: "tuyệt đối", meaningEn: "complete; without exception", example: "Avoid absolute claims in inference answers.", exampleEn: "Avoid absolute claims in inference answers.", partOfSpeech: "adjective" },
          { word: "scope", ipa: "/skoʊp/", meaning: "phạm vi", meaningEn: "extent of coverage", example: "The answer was beyond the passage's scope.", exampleEn: "The answer was beyond the passage's scope.", partOfSpeech: "noun" },
          { word: "justify", ipa: "/ˈdʒʌstɪfaɪ/", meaning: "biện minh, chứng minh", meaningEn: "to support with evidence", example: "Justify your inference with a quote.", exampleEn: "Justify your inference with a quote.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ vựng inference phù hợp.",
            instructionEn: "Fill in the appropriate inference vocabulary.",
            sentences: [
              { text: "To draw a conclusion from clues is to ___.", textEn: "To draw a conclusion from clues is to ___.", answer: "infer", hint: "Từ gốc của 'inference'." },
              { text: "Something stated directly is ___.", textEn: "Something stated directly is ___.", answer: "explicit", hint: "Trái nghĩa với 'implicit'." },
              { text: "Always cite ___ from the passage.", textEn: "Always cite ___ from the passage.", answer: "evidence", hint: "Bằng chứng văn bản." },
              { text: "An answer outside the passage's range is out of ___.", textEn: "An answer outside the passage's range is out of ___.", answer: "scope", hint: "Phạm vi." },
              { text: "The author does not say it directly, but it is ___ in the tone.", textEn: "The author does not say it directly, but it is ___ in the tone.", answer: "implicit", hint: "Trái với explicit." },
            ],
          },
        ],
        quiz: [
          {
            question: "What is the safest characteristic of a correct inference answer?",
            options: [
              "It uses creative interpretation.",
              "It contains absolute words like 'always'.",
              "It is the shortest, most directly supported step.",
              "It introduces new outside information.",
            ],
            answer: 2,
            explanation: "SAT rewards the most conservative, evidence-tight inference.",
          },
          {
            question: "An answer choice that is mostly true but contradicts one line of the passage is:",
            options: ["correct", "partially true - a trap", "out of scope", "explicit"],
            answer: 1,
            explanation: "Partially true answers are the SAT's favorite distractor type.",
          },
          {
            question: "Which approach reduces 'anchoring' to wrong choices?",
            options: [
              "Read all four options carefully first.",
              "Skip to the longest option.",
              "Predict the answer in your own words before looking at options.",
              "Pick the answer that sounds most academic.",
            ],
            answer: 2,
            explanation: "Predicting first prevents your reading from being biased by the choices.",
          },
        ],
      },
      {
        id: "sat-function-questions",
        title: "Câu hỏi Chức năng (Function & Purpose Questions)",
        titleEn: "Function & Purpose Questions",
        level: 4,
        difficulty: "advanced",
        theory:
          "Câu hỏi 'function' hỏi VAI TRÒ của một từ, câu, hoặc đoạn - chứ không phải nội dung. Ví dụ: 'The author mentions X primarily to...'\n\n**Các vai trò phổ biến trong SAT:**\n- **introduce** một khái niệm mới\n- **illustrate / exemplify** (minh họa) một ý đã nêu\n- **support / strengthen** một lập luận\n- **counter / refute** (bác bỏ) một quan điểm trước đó\n- **qualify** (giới hạn, làm dịu) một tuyên bố\n- **transition** chuyển tiếp giữa hai ý\n- **emphasize** (nhấn mạnh) một điểm quan trọng\n- **concede** (thừa nhận) trước khi phản bác\n\n**Mẹo phân tích:** trả lời câu hỏi 'NẾU XÓA CÂU NÀY thì đoạn văn mất gì?' Câu trả lời chính là chức năng của nó.\n\n**Bẫy phổ biến:** nhầm giữa 'illustrate' (minh họa) và 'prove' (chứng minh) - minh họa chỉ làm rõ, KHÔNG đủ để chứng minh.",
        theoryEn:
          "'Function' questions ask the ROLE of a word, sentence, or paragraph - not its content. Example: 'The author mentions X primarily to...'\n\n**Common SAT roles:** introduce, illustrate/exemplify, support/strengthen, counter/refute, qualify, transition, emphasize, concede.\n\n**Analysis tip:** ask 'IF I DELETED this sentence, what would the paragraph lose?' That loss IS its function.\n\n**Common trap:** confusing 'illustrate' (clarify) with 'prove' (demonstrate conclusively).",
        proTips: [
          "Đọc câu được hỏi + 1 câu trước + 1 câu sau để hiểu mạch văn.",
          "Hỏi 'XÓA CÂU NÀY thì mất gì?' - câu trả lời = chức năng.",
          "Phân biệt 'illustrate' (làm rõ) với 'prove' (chứng minh) - SAT rất thích bẫy này.",
        ],
        proTipsEn: [
          "Read the cited sentence + 1 before + 1 after for context.",
          "Ask 'what does the paragraph lose if I delete this?' - that loss is its function.",
          "Distinguish 'illustrate' (clarify) from 'prove' (demonstrate) - frequent trap.",
        ],
        vocabulary: [
          { word: "illustrate", ipa: "/ˈɪləstreɪt/", meaning: "minh họa", meaningEn: "to clarify with an example", example: "The chart illustrates the trend.", exampleEn: "The chart illustrates the trend.", partOfSpeech: "verb" },
          { word: "refute", ipa: "/rɪˈfjuːt/", meaning: "bác bỏ", meaningEn: "to disprove an argument", example: "The author refutes the common view.", exampleEn: "The author refutes the common view.", partOfSpeech: "verb" },
          { word: "qualify", ipa: "/ˈkwɒlɪfaɪ/", meaning: "giới hạn, làm dịu", meaningEn: "to limit the scope of a claim", example: "She qualifies her praise with a caveat.", exampleEn: "She qualifies her praise with a caveat.", partOfSpeech: "verb" },
          { word: "concede", ipa: "/kənˈsiːd/", meaning: "thừa nhận", meaningEn: "to admit a point", example: "He concedes that critics have a point.", exampleEn: "He concedes that critics have a point.", partOfSpeech: "verb" },
          { word: "emphasize", ipa: "/ˈemfəsaɪz/", meaning: "nhấn mạnh", meaningEn: "to give special importance to", example: "The author emphasizes urgency.", exampleEn: "The author emphasizes urgency.", partOfSpeech: "verb" },
          { word: "transition", ipa: "/trænˈzɪʃn/", meaning: "chuyển tiếp", meaningEn: "movement between ideas", example: "This sentence serves as a transition.", exampleEn: "This sentence serves as a transition.", partOfSpeech: "noun" },
          { word: "exemplify", ipa: "/ɪɡˈzemplɪfaɪ/", meaning: "làm ví dụ điển hình", meaningEn: "to be a typical example of", example: "Her career exemplifies dedication.", exampleEn: "Her career exemplifies dedication.", partOfSpeech: "verb" },
          { word: "introduce", ipa: "/ˌɪntrəˈduːs/", meaning: "giới thiệu, mở ra", meaningEn: "to present for the first time", example: "Paragraph 1 introduces the central question.", exampleEn: "Paragraph 1 introduces the central question.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền động từ chức năng phù hợp.",
            instructionEn: "Fill in the appropriate function verb.",
            sentences: [
              { text: "The example serves to ___ the abstract concept.", textEn: "The example serves to ___ the abstract concept.", answer: "illustrate", hint: "Làm rõ bằng ví dụ." },
              { text: "Paragraph 4 attempts to ___ the opposing view.", textEn: "Paragraph 4 attempts to ___ the opposing view.", answer: "refute", hint: "Bác bỏ." },
              { text: "The author ___ that the issue is complex before defending her stance.", textEn: "The author ___ that the issue is complex before defending her stance.", answer: "concedes", hint: "Thừa nhận trước khi phản biện." },
              { text: "This sentence functions as a ___ between two ideas.", textEn: "This sentence functions as a ___ between two ideas.", answer: "transition", hint: "Chuyển tiếp." },
              { text: "She uses italics to ___ the key term.", textEn: "She uses italics to ___ the key term.", answer: "emphasize", hint: "Làm nổi bật." },
            ],
          },
        ],
        quiz: [
          {
            question: "If a sentence presents an example of an abstract idea, its function is to:",
            options: ["refute", "illustrate", "introduce", "qualify"],
            answer: 1,
            explanation: "Examples illustrate (clarify) abstract concepts.",
          },
          {
            question: "When an author admits the opposing side has merit before defending her view, she is ___ the counterargument.",
            options: ["refuting", "exemplifying", "conceding", "transitioning"],
            answer: 2,
            explanation: "Conceding = acknowledging the validity of an opposing point.",
          },
          {
            question: "The phrase 'in some cases' typically signals that the author is:",
            options: ["emphasizing certainty", "qualifying a claim", "refuting evidence", "introducing a topic"],
            answer: 1,
            explanation: "'In some cases' limits/qualifies the scope of a statement.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 3: SAT Essay & Argument Writing Skills
  // ============================================================
  {
    id: "sat-essay-writing-skills",
    title: "Kỹ năng Viết Luận & Lập luận SAT",
    titleEn: "SAT Essay & Argument Writing Skills",
    icon: "✍️",
    color: "emerald",
    description: "Cấu trúc bài luận, kỹ thuật xây dựng lập luận, và từ vựng học thuật cho phần Writing.",
    descriptionEn: "Essay structure, argument-building techniques, and academic vocabulary for the Writing section.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-thesis-construction",
        title: "Xây dựng Luận điểm Mạnh (Strong Thesis Construction)",
        titleEn: "Strong Thesis Construction",
        level: 4,
        difficulty: "advanced",
        theory:
          "Một thesis mạnh = (1) cụ thể, (2) có thể tranh luận, (3) có hướng phát triển rõ. SAT giám khảo tìm ngay luận điểm trong câu cuối đoạn mở.\n\n**Công thức Thesis 3 phần:**\nClaim (chủ trương) + Reasoning (lý do) + Roadmap (3 ý chính sẽ phân tích)\n\n*Ví dụ yếu:* 'Social media is bad.'\n*Ví dụ mạnh:* 'While social media offers connection, its design exploits attention through algorithmic outrage, fragmented focus, and parasocial dependency - undermining the very community it promises.'\n\n**Phân tích thesis mạnh:**\n- **Claim:** social media undermines community\n- **Counterclaim acknowledgment:** 'while it offers connection' (cho thấy nuance)\n- **Roadmap:** 3 trụ cột (algorithmic outrage / fragmented focus / parasocial dependency)\n\n**Ba lỗi thesis SAT thường gặp:**\n1. Quá rộng ('Technology is changing the world').\n2. Quá hiển nhiên, không tranh luận được ('Reading books is good').\n3. Mơ hồ, không có hướng ('There are many factors to consider').",
        theoryEn:
          "A strong thesis is (1) specific, (2) arguable, (3) maps the essay's direction. SAT graders find it in the last sentence of paragraph 1.\n\n**3-Part Thesis Formula:** Claim + Reasoning + Roadmap (3 main points).\n\n*Weak:* 'Social media is bad.'\n*Strong:* 'While social media offers connection, its design exploits attention through algorithmic outrage, fragmented focus, and parasocial dependency - undermining the very community it promises.'\n\n**Three common SAT thesis errors:** too broad, too obvious to argue, too vague (no direction).",
        proTips: [
          "Mở đầu thesis bằng 'While... [opposite view], [your claim] because A, B, and C' - vừa nhận diện counter, vừa lập danh sách rõ ràng.",
          "Dùng động từ MẠNH (undermines, exploits, transforms) thay vì 'is' / 'has'.",
          "Đặt thesis ở CUỐI đoạn mở - giám khảo SAT scan vị trí này đầu tiên.",
        ],
        proTipsEn: [
          "Open the thesis with 'While... [opposite view], [your claim] because A, B, and C.'",
          "Use STRONG verbs (undermines, exploits, transforms) instead of 'is/has'.",
          "Place the thesis at the END of paragraph 1 - graders scan this position first.",
        ],
        vocabulary: [
          { word: "thesis", ipa: "/ˈθiːsɪs/", meaning: "luận điểm chính", meaningEn: "central claim of an essay", example: "Your thesis must be arguable.", exampleEn: "Your thesis must be arguable.", partOfSpeech: "noun" },
          { word: "claim", ipa: "/kleɪm/", meaning: "chủ trương, khẳng định", meaningEn: "an assertion to be defended", example: "State your claim clearly.", exampleEn: "State your claim clearly.", partOfSpeech: "noun" },
          { word: "counterargument", ipa: "/ˈkaʊntərˌɑːrɡjumənt/", meaning: "lập luận phản bác", meaningEn: "an opposing argument", example: "Address the counterargument before refuting it.", exampleEn: "Address the counterargument before refuting it.", partOfSpeech: "noun" },
          { word: "concession", ipa: "/kənˈseʃn/", meaning: "sự nhượng bộ", meaningEn: "acknowledging an opposing point", example: "A brief concession strengthens your essay.", exampleEn: "A brief concession strengthens your essay.", partOfSpeech: "noun" },
          { word: "arguable", ipa: "/ˈɑːrɡjuəbl/", meaning: "có thể tranh luận", meaningEn: "open to debate", example: "A thesis must be arguable, not obvious.", exampleEn: "A thesis must be arguable, not obvious.", partOfSpeech: "adjective" },
          { word: "nuance", ipa: "/ˈnuːɑːns/", meaning: "sắc thái tinh tế", meaningEn: "a subtle distinction", example: "Strong essays show nuance.", exampleEn: "Strong essays show nuance.", partOfSpeech: "noun" },
          { word: "warrant", ipa: "/ˈwɔːrənt/", meaning: "lý lẽ kết nối bằng chứng với khẳng định", meaningEn: "the link between evidence and claim", example: "Make your warrant explicit.", exampleEn: "Make your warrant explicit.", partOfSpeech: "noun" },
          { word: "rebuttal", ipa: "/rɪˈbʌtl/", meaning: "phản biện", meaningEn: "a response refuting an argument", example: "Save your rebuttal for paragraph 4.", exampleEn: "Save your rebuttal for paragraph 4.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ luận văn phù hợp.",
            instructionEn: "Fill in the appropriate essay-writing term.",
            sentences: [
              { text: "The central claim of your essay is the ___.", textEn: "The central claim of your essay is the ___.", answer: "thesis", hint: "Câu chốt cuối đoạn mở." },
              { text: "Acknowledging the opposing view briefly is called a ___.", textEn: "Acknowledging the opposing view briefly is called a ___.", answer: "concession", hint: "Khác với 'rebuttal'." },
              { text: "A response that disproves an argument is a ___.", textEn: "A response that disproves an argument is a ___.", answer: "rebuttal", hint: "Phản biện." },
              { text: "A claim that no one would dispute is not ___.", textEn: "A claim that no one would dispute is not ___.", answer: "arguable", hint: "Không tranh luận được = thesis yếu." },
              { text: "The logical link between evidence and claim is the ___.", textEn: "The logical link between evidence and claim is the ___.", answer: "warrant", hint: "Cầu nối lý lẽ." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which thesis is strongest by SAT standards?",
            options: [
              "Pollution is harmful to the environment.",
              "There are many causes of pollution.",
              "Although industrial regulations have reduced air pollution, plastic waste remains a critical threat due to consumer habits, weak enforcement, and slow innovation.",
              "Pollution should be stopped now.",
            ],
            answer: 2,
            explanation: "Option C is specific, arguable, and previews three reasons (roadmap).",
          },
          {
            question: "Where should your thesis appear?",
            options: ["Title", "First sentence of essay", "Last sentence of the introduction", "Conclusion only"],
            answer: 2,
            explanation: "SAT graders scan the END of paragraph 1 for the thesis.",
          },
          {
            question: "Adding 'While critics argue X, …' to your thesis is a:",
            options: ["concession that strengthens nuance", "logical fallacy", "wasted phrase", "warrant"],
            answer: 0,
            explanation: "Conceding shows the writer understands complexity - graders reward nuance.",
          },
        ],
      },
      {
        id: "sat-evidence-integration",
        title: "Tích hợp Bằng chứng & Trích dẫn (Evidence Integration & Citation)",
        titleEn: "Evidence Integration & Citation",
        level: 4,
        difficulty: "advanced",
        theory:
          "Bằng chứng KHÔNG tự nói - bạn phải dẫn nhập, trích, và phân tích. SAT giám khảo trừ điểm khi học sinh dán quote 'trần trụi' (dropped quote).\n\n**Khung 'ICE' tích hợp bằng chứng:**\n- **I**ntroduce: dẫn vào ngữ cảnh ('In her 2018 study, Dr. Liu found...')\n- **C**ite: trích nguyên văn hoặc paraphrase ('that \"73% of teens report sleep loss linked to phone use\".')\n- **E**xplain: GIẢI THÍCH bằng chứng đó CHỨNG MINH gì cho luận điểm của bạn.\n\n**Quy tắc 1:3:** mỗi câu trích dẫn cần ít nhất 3 câu phân tích phía sau. Phân tích MẠNH hơn trích dẫn dài.\n\n**Các loại bằng chứng SAT đánh giá cao:**\n1. Statistics (số liệu cụ thể)\n2. Expert quotes (chuyên gia)\n3. Historical examples (tiền lệ lịch sử)\n4. Logical reasoning (suy luận)\n5. Counterexamples (phản ví dụ - dùng khi bác bỏ)\n\n**Tránh:** anecdotes cá nhân không liên quan, opinions không có nguồn, dữ liệu vu vơ.",
        theoryEn:
          "Evidence does NOT speak for itself - you must introduce, cite, and analyze. SAT graders penalize 'dropped quotes'.\n\n**ICE framework:**\n- **I**ntroduce: set context\n- **C**ite: quote or paraphrase\n- **E**xplain: show how it proves your claim\n\n**1:3 rule:** every quoted line needs at least 3 lines of analysis. Analysis > quotation length.\n\n**Top SAT-valued evidence types:** statistics, expert quotes, historical examples, logical reasoning, counterexamples.",
        proTips: [
          "Không bao giờ kết đoạn bằng quote - luôn có 1-2 câu phân tích sau cùng.",
          "Paraphrase + cite tốt hơn quote dài - show chứng tỏ bạn hiểu chứ không chỉ copy.",
          "Số liệu cụ thể (73%, $4.2 billion) thuyết phục hơn 'many people'.",
        ],
        proTipsEn: [
          "Never end a paragraph with a quote - finish with 1-2 lines of analysis.",
          "Paraphrase + cite is often stronger than long quotation.",
          "Specific statistics (73%, $4.2 billion) beat vague 'many people'.",
        ],
        vocabulary: [
          { word: "evidence", ipa: "/ˈevɪdəns/", meaning: "bằng chứng", meaningEn: "support for a claim", example: "Strong essays integrate diverse evidence.", exampleEn: "Strong essays integrate diverse evidence.", partOfSpeech: "noun" },
          { word: "cite", ipa: "/saɪt/", meaning: "trích dẫn", meaningEn: "to refer to as authority", example: "Cite the source after each statistic.", exampleEn: "Cite the source after each statistic.", partOfSpeech: "verb" },
          { word: "paraphrase", ipa: "/ˈpærəfreɪz/", meaning: "diễn đạt lại", meaningEn: "restate in your own words", example: "Paraphrasing shows comprehension.", exampleEn: "Paraphrasing shows comprehension.", partOfSpeech: "verb" },
          { word: "integrate", ipa: "/ˈɪntɪɡreɪt/", meaning: "tích hợp", meaningEn: "to combine into a whole", example: "Integrate evidence smoothly.", exampleEn: "Integrate evidence smoothly.", partOfSpeech: "verb" },
          { word: "analysis", ipa: "/əˈnæləsɪs/", meaning: "phân tích", meaningEn: "detailed examination", example: "Analysis must outweigh quotation.", exampleEn: "Analysis must outweigh quotation.", partOfSpeech: "noun" },
          { word: "anecdotal", ipa: "/ˌænɪkˈdoʊtl/", meaning: "thuộc về giai thoại", meaningEn: "based on personal accounts, not data", example: "Avoid purely anecdotal evidence.", exampleEn: "Avoid purely anecdotal evidence.", partOfSpeech: "adjective" },
          { word: "credible", ipa: "/ˈkredəbl/", meaning: "đáng tin cậy", meaningEn: "trustworthy as a source", example: "Cite credible sources only.", exampleEn: "Cite credible sources only.", partOfSpeech: "adjective" },
          { word: "synthesis", ipa: "/ˈsɪnθəsɪs/", meaning: "tổng hợp", meaningEn: "combining ideas into a whole", example: "Top essays show synthesis across sources.", exampleEn: "Top essays show synthesis across sources.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ phù hợp về bằng chứng.",
            instructionEn: "Fill in the appropriate evidence-related term.",
            sentences: [
              { text: "Restating an author's idea in your own words is to ___.", textEn: "Restating an author's idea in your own words is to ___.", answer: "paraphrase", hint: "Khác với 'quote'." },
              { text: "Sources should be ___ - trustworthy and verifiable.", textEn: "Sources should be ___ - trustworthy and verifiable.", answer: "credible", hint: "Đáng tin cậy." },
              { text: "Combining several sources into one argument shows ___.", textEn: "Combining several sources into one argument shows ___.", answer: "synthesis", hint: "Tổng hợp." },
              { text: "Personal stories alone are ___ evidence - usually weak.", textEn: "Personal stories alone are ___ evidence - usually weak.", answer: "anecdotal", hint: "Tính từ của 'anecdote'." },
              { text: "After quoting, always provide ___ of why it matters.", textEn: "After quoting, always provide ___ of why it matters.", answer: "analysis", hint: "Phân tích." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which is the strongest type of evidence on the SAT?",
            options: [
              "A friend's personal story",
              "A vague claim that 'many people agree'",
              "A specific statistic from a credible study",
              "An emotional appeal",
            ],
            answer: 2,
            explanation: "Specific data from credible sources is the most persuasive evidence type.",
          },
          {
            question: "The ICE framework stands for:",
            options: ["Introduce, Cite, Explain", "Imagine, Create, Elaborate", "Identify, Compare, Evaluate", "Investigate, Conclude, Edit"],
            answer: 0,
            explanation: "ICE = Introduce → Cite → Explain. The most-tested evidence integration model.",
          },
          {
            question: "Following the 1:3 rule, a 1-line quote should have at least:",
            options: ["1 line of analysis", "2 lines of analysis", "3 lines of analysis", "no analysis needed"],
            answer: 2,
            explanation: "Analysis must outweigh quotation; 1 quote → 3 lines of explanation.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 4: SAT Math Word Problems
  // ============================================================
  {
    id: "sat-math-word-problems",
    title: "Bài toán Đố SAT Math (Math Word Problems)",
    titleEn: "SAT Math Word Problems",
    icon: "🧮",
    color: "amber",
    description: "Chiến lược chuyển từ ngữ thành phương trình cho các dạng word problem thường gặp.",
    descriptionEn: "Strategies for translating words into equations for common SAT word problem types.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-translating-words",
        title: "Dịch Từ ngữ thành Phương trình (Translating Words into Equations)",
        titleEn: "Translating Words into Equations",
        level: 4,
        difficulty: "advanced",
        theory:
          "Word problem SAT thua không phải vì khó tính toán, mà vì khó DỊCH NGÔN NGỮ → BIỂU THỨC TOÁN. Bảng dịch cốt lõi:\n\n**Từ vựng → Toán tử:**\n- 'sum / total / combined / increased by' → +\n- 'difference / less than / decreased by / fewer' → −\n- 'product / of / times / twice' → ×\n- 'quotient / per / ratio of / divided by' → ÷\n- 'is / equals / yields / results in' → =\n- 'at most / no more than' → ≤\n- 'at least / no fewer than' → ≥\n\n**Bẫy thứ tự (order trap):**\n- '5 less than x' = x − 5 (KHÔNG phải 5 − x)\n- 'x less than 5' = 5 − x\n→ 'less than' đảo thứ tự!\n\n**Quy trình 4 bước:**\n1. Đọc 2 lần - đầu lấy ý, sau lấy số liệu.\n2. Xác định 'unknown' → đặt biến.\n3. Lập phương trình theo bảng dịch.\n4. Giải, sau đó KIỂM TRA bằng cách thay vào câu chữ gốc.",
        theoryEn:
          "SAT word problems are lost not on math, but on TRANSLATION. Core dictionary:\n\n**Words → Operators:** sum/total/increased by → +; difference/less than/decreased by → −; product/of/times → ×; per/quotient/ratio → ÷; is/equals → =; at most → ≤; at least → ≥.\n\n**Order trap:** '5 less than x' = x − 5 (NOT 5 − x).\n\n**4-step process:** read twice → name unknowns → build equation → solve and verify by substituting back into the words.",
        proTips: [
          "'Less than' và 'subtracted from' ĐẢO thứ tự - đây là bẫy SAT số 1.",
          "'Of' khi đi với phân số / phần trăm = nhân (× ).",
          "Sau khi giải, luôn thay số trở lại đề bài để xác nhận.",
        ],
        proTipsEn: [
          "'Less than' and 'subtracted from' REVERSE the order - SAT trap #1.",
          "'Of' with fractions/percents = multiply.",
          "Always plug your answer back into the wording to verify.",
        ],
        vocabulary: [
          { word: "equation", ipa: "/ɪˈkweɪʒn/", meaning: "phương trình", meaningEn: "a mathematical statement of equality", example: "Set up the equation step by step.", exampleEn: "Set up the equation step by step.", partOfSpeech: "noun" },
          { word: "variable", ipa: "/ˈveriəbl/", meaning: "biến số", meaningEn: "a symbol representing an unknown", example: "Let x be the variable for hours worked.", exampleEn: "Let x be the variable for hours worked.", partOfSpeech: "noun" },
          { word: "expression", ipa: "/ɪkˈspreʃn/", meaning: "biểu thức", meaningEn: "a combination of numbers and variables", example: "Simplify the expression first.", exampleEn: "Simplify the expression first.", partOfSpeech: "noun" },
          { word: "inequality", ipa: "/ˌɪnɪˈkwɒləti/", meaning: "bất đẳng thức", meaningEn: "a relation showing one side is greater/less", example: "Solve the inequality 2x + 3 ≤ 11.", exampleEn: "Solve the inequality 2x + 3 ≤ 11.", partOfSpeech: "noun" },
          { word: "constant", ipa: "/ˈkɒnstənt/", meaning: "hằng số", meaningEn: "a fixed value", example: "k is a constant in the equation.", exampleEn: "k is a constant in the equation.", partOfSpeech: "noun" },
          { word: "coefficient", ipa: "/ˌkoʊɪˈfɪʃnt/", meaning: "hệ số", meaningEn: "a numerical factor multiplying a variable", example: "The coefficient of x is 4.", exampleEn: "The coefficient of x is 4.", partOfSpeech: "noun" },
          { word: "exceed", ipa: "/ɪkˈsiːd/", meaning: "vượt quá", meaningEn: "to be greater than", example: "The cost cannot exceed $50.", exampleEn: "The cost cannot exceed $50.", partOfSpeech: "verb" },
          { word: "consecutive", ipa: "/kənˈsekjətɪv/", meaning: "liên tiếp", meaningEn: "following in order without gaps", example: "Three consecutive integers: n, n+1, n+2.", exampleEn: "Three consecutive integers: n, n+1, n+2.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dịch câu thành biểu thức (chỉ điền biểu thức bằng đại số).",
            instructionEn: "Translate the sentence into an algebraic expression.",
            sentences: [
              { text: "The expression for '5 less than x' is ___.", textEn: "The expression for '5 less than x' is ___.", answer: "x-5", hint: "'Less than' đảo thứ tự." },
              { text: "The expression for 'twice the sum of x and 3' is 2(___).", textEn: "The expression for 'twice the sum of x and 3' is 2(___).", answer: "x+3", hint: "Sum trước, twice sau." },
              { text: "If a number n exceeds 10 by 4, then n equals ___.", textEn: "If a number n exceeds 10 by 4, then n equals ___.", answer: "14", hint: "Vượt quá 10 với khoảng cách 4." },
              { text: "Three consecutive integers starting at n are: n, n+1, ___.", textEn: "Three consecutive integers starting at n are: n, n+1, ___.", answer: "n+2", hint: "Cộng thêm 2." },
              { text: "'25 percent of x' translates to ___ (decimal × x).", textEn: "'25 percent of x' translates to ___ (decimal × x).", answer: "0.25x", hint: "% → decimal × biến." },
            ],
          },
        ],
        quiz: [
          {
            question: "Translate '7 less than three times a number n':",
            options: ["7 − 3n", "3n − 7", "3(n − 7)", "n − 21"],
            answer: 1,
            explanation: "'Less than' reverses order → start with 3n, subtract 7 → 3n − 7.",
          },
          {
            question: "'The cost cannot exceed $50' is written as:",
            options: ["c < 50", "c ≤ 50", "c > 50", "c = 50"],
            answer: 1,
            explanation: "'Cannot exceed' = 'at most' → ≤ (not strict <).",
          },
          {
            question: "Three consecutive even integers can be written as:",
            options: ["n, n+1, n+2", "n, n+2, n+4", "2n, 2n+1, 2n+2", "n, 2n, 3n"],
            answer: 1,
            explanation: "Consecutive EVEN integers differ by 2: n, n+2, n+4.",
          },
        ],
      },
      {
        id: "sat-rate-mixture-problems",
        title: "Bài toán Tốc độ, Tỉ lệ & Hỗn hợp (Rate, Ratio & Mixture)",
        titleEn: "Rate, Ratio & Mixture Problems",
        level: 4,
        difficulty: "advanced",
        theory:
          "Ba dạng word problem chiếm ~15% SAT Math:\n\n**1. Tốc độ (Rate):** Distance = Rate × Time. Khi 2 đối tượng di chuyển: nếu cùng chiều → trừ tốc độ; ngược chiều → cộng tốc độ.\n\n*Ví dụ:* 'A train travels 240 miles in 4 hours. What is its average speed?' → R = D/T = 240/4 = 60 mph.\n\n**2. Tỉ lệ (Ratio & Proportion):** a:b = c:d ⟺ a×d = b×c (cross multiplication).\n\n*Ví dụ:* 'If 3 books cost $24, how much do 7 books cost?' → 3/24 = 7/x → x = 56.\n\n**3. Hỗn hợp (Mixture):** sử dụng bảng:\n| Thành phần | Lượng | Nồng độ | Tổng chất |\n|---|---|---|---|\n| A | a | x% | a·x |\n| B | b | y% | b·y |\n| Hỗn hợp | a+b | z% | (a+b)·z |\n\nLập phương trình: a·x + b·y = (a+b)·z\n\n**Bẫy phổ biến:** quên đổi đơn vị (giờ ↔ phút, km ↔ m), nhầm 'percent of' với 'percent more than'.",
        theoryEn:
          "Three SAT word-problem families (~15% of Math):\n\n**1. Rate:** Distance = Rate × Time. Same direction → subtract speeds; opposite → add.\n\n**2. Ratio & Proportion:** a:b = c:d ⟺ ad = bc.\n\n**3. Mixture:** use a table tracking quantity × concentration. Equation: a·x + b·y = (a+b)·z.\n\n**Common traps:** unit conversion (hr ↔ min), mixing 'percent of' with 'percent more than'.",
        proTips: [
          "Vẽ bảng cho bài hỗn hợp - tránh lẫn lộn nồng độ.",
          "Cross multiply ngay khi thấy a/b = c/d.",
          "Đổi đơn vị NGAY ở đầu bài, không để cuối.",
        ],
        proTipsEn: [
          "Draw a table for mixture problems.",
          "Cross multiply as soon as you see a/b = c/d.",
          "Convert units IMMEDIATELY, not at the end.",
        ],
        vocabulary: [
          { word: "rate", ipa: "/reɪt/", meaning: "tốc độ, tỉ suất", meaningEn: "amount per unit of time", example: "The growth rate is 4% per year.", exampleEn: "The growth rate is 4% per year.", partOfSpeech: "noun" },
          { word: "ratio", ipa: "/ˈreɪʃioʊ/", meaning: "tỉ số", meaningEn: "the relationship between two quantities", example: "The ratio of boys to girls is 3:5.", exampleEn: "The ratio of boys to girls is 3:5.", partOfSpeech: "noun" },
          { word: "proportion", ipa: "/prəˈpɔːrʃn/", meaning: "tỉ lệ thức", meaningEn: "an equation of two ratios", example: "Set up a proportion to solve.", exampleEn: "Set up a proportion to solve.", partOfSpeech: "noun" },
          { word: "mixture", ipa: "/ˈmɪkstʃər/", meaning: "hỗn hợp", meaningEn: "a combination of substances", example: "The mixture is 30% acid.", exampleEn: "The mixture is 30% acid.", partOfSpeech: "noun" },
          { word: "concentration", ipa: "/ˌkɒnsnˈtreɪʃn/", meaning: "nồng độ", meaningEn: "amount of a substance per unit volume", example: "Increase the concentration to 40%.", exampleEn: "Increase the concentration to 40%.", partOfSpeech: "noun" },
          { word: "average", ipa: "/ˈævərɪdʒ/", meaning: "trung bình", meaningEn: "the mean value", example: "Find the average speed.", exampleEn: "Find the average speed.", partOfSpeech: "noun" },
          { word: "interval", ipa: "/ˈɪntərvl/", meaning: "khoảng (thời gian)", meaningEn: "a span between two points", example: "The interval is 5 minutes.", exampleEn: "The interval is 5 minutes.", partOfSpeech: "noun" },
          { word: "yield", ipa: "/jiːld/", meaning: "cho ra (kết quả)", meaningEn: "to produce as a result", example: "The reaction yields 20 grams.", exampleEn: "The reaction yields 20 grams.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Giải bài toán và điền số.",
            instructionEn: "Solve the problem and fill in the number.",
            sentences: [
              { text: "A car travels 180 miles in 3 hours. Its rate is ___ mph.", textEn: "A car travels 180 miles in 3 hours. Its rate is ___ mph.", answer: "60", hint: "R = D/T." },
              { text: "If 4 pens cost $12, then 9 pens cost $___.", textEn: "If 4 pens cost $12, then 9 pens cost $___.", answer: "27", hint: "Tỉ lệ thức: 4/12 = 9/x." },
              { text: "The ratio of cats to dogs is 2:5. If there are 14 cats, there are ___ dogs.", textEn: "The ratio of cats to dogs is 2:5. If there are 14 cats, there are ___ dogs.", answer: "35", hint: "2/5 = 14/x." },
              { text: "10 liters at 20% acid mixed with 30 liters at 60% acid yields ___ liters of mixture.", textEn: "10 liters at 20% acid mixed with 30 liters at 60% acid yields ___ liters of mixture.", answer: "40", hint: "Tổng thể tích = a + b." },
              { text: "If a runner covers 3 km in 15 minutes, her speed is ___ km/h.", textEn: "If a runner covers 3 km in 15 minutes, her speed is ___ km/h.", answer: "12", hint: "15 min = 0.25 h → 3/0.25." },
            ],
          },
        ],
        quiz: [
          {
            question: "A train travels at 80 mph for 2.5 hours. Distance covered:",
            options: ["100 miles", "150 miles", "200 miles", "250 miles"],
            answer: 2,
            explanation: "D = R × T = 80 × 2.5 = 200 miles.",
          },
          {
            question: "If 5 workers can finish a job in 12 days, how many days for 6 workers (same rate)?",
            options: ["10 days", "12 days", "14 days", "15 days"],
            answer: 0,
            explanation: "Inverse proportion: 5 × 12 = 6 × x → x = 10.",
          },
          {
            question: "20 L of 30% saline solution is mixed with 30 L of 50% solution. Final concentration:",
            options: ["35%", "40%", "42%", "45%"],
            answer: 2,
            explanation: "(20·0.30 + 30·0.50) / (20+30) = (6 + 15) / 50 = 21/50 = 42%.",
          },
        ],
      },
    ],
  },
];
