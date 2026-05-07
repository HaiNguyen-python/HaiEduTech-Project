// SAT Vocabulary Expansion 2 — additional curated words across all SAT categories.
import type { SatWord } from "./satVocabData";

const w = (
  word: string,
  ipa: string,
  level: "B2" | "C1",
  vi: string,
  example: string,
  category: string,
  partOfSpeech: string,
  section: "Reading & Writing" | "Math" = "Reading & Writing",
): SatWord => ({
  word,
  ipa,
  level,
  definition: { en: "", vi },
  example,
  category,
  partOfSpeech,
  section,
});

export const satVocabExpansion2: SatWord[] = [
  // Evidence-Based Reading
  w("substantiate", "/səbˈstænʃiˌeɪt/", "C1", "chứng minh, củng cố", "The data substantiate the author's central claim.", "Evidence-Based Reading", "verb"),
  w("refute", "/rɪˈfjuːt/", "C1", "bác bỏ", "The new study refutes earlier assumptions about climate.", "Evidence-Based Reading", "verb"),
  w("corroborate", "/kəˈrɒbəreɪt/", "C1", "xác nhận, củng cố", "Witness statements corroborate the timeline.", "Evidence-Based Reading", "verb"),
  w("undermine", "/ˌʌndərˈmaɪn/", "B2", "làm suy yếu", "Inconsistent data undermine the researcher's argument.", "Evidence-Based Reading", "verb"),
  w("warrant", "/ˈwɔːrənt/", "C1", "biện minh cho", "These results warrant further investigation.", "Evidence-Based Reading", "verb"),
  w("posit", "/ˈpɒzɪt/", "C1", "đưa ra (giả thuyết)", "The author posits that empathy can be taught.", "Evidence-Based Reading", "verb"),
  w("scrutinize", "/ˈskruːtəˌnaɪz/", "C1", "xem xét kỹ", "Editors scrutinize each paragraph for clarity.", "Evidence-Based Reading", "verb"),

  // Command of Evidence
  w("median", "/ˈmiːdiən/", "B2", "số trung vị", "The median income rose by 4% last year.", "Command of Evidence", "noun"),
  w("correlation", "/ˌkɒrəˈleɪʃən/", "C1", "mối tương quan", "There is a positive correlation between sleep and grades.", "Command of Evidence", "noun"),
  w("infer", "/ɪnˈfɜːr/", "B2", "suy ra", "From the chart, we can infer a steady decline.", "Command of Evidence", "verb"),
  w("estimate", "/ˈɛstəˌmeɪt/", "B2", "ước tính", "Researchers estimate a 12% growth this decade.", "Command of Evidence", "verb"),
  w("approximate", "/əˈprɒksɪmət/", "B2", "xấp xỉ", "The approximate value is shown in the second column.", "Command of Evidence", "adjective"),
  w("citation", "/saɪˈteɪʃən/", "B2", "trích dẫn", "Every claim needs a clear citation.", "Command of Evidence", "noun"),
  w("benchmark", "/ˈbɛn(t)ʃˌmɑːrk/", "B2", "tiêu chuẩn so sánh", "The 2019 score serves as a benchmark.", "Command of Evidence", "noun"),

  // Words in Context
  w("juxtapose", "/ˈdʒʌkstəˌpoʊz/", "C1", "đặt cạnh nhau", "The author juxtaposes city life with rural calm.", "Words in Context", "verb"),
  w("nuance", "/ˈnuːɑːns/", "C1", "sắc thái tinh tế", "Translators must capture the nuance of each phrase.", "Words in Context", "noun"),
  w("connotation", "/ˌkɒnəˈteɪʃən/", "C1", "ý nghĩa hàm ẩn", "The word 'cheap' carries a negative connotation.", "Words in Context", "noun"),
  w("metaphor", "/ˈmɛtəˌfɔːr/", "B2", "ẩn dụ", "The poet uses a metaphor of light for hope.", "Words in Context", "noun"),
  w("undertone", "/ˈʌndərˌtoʊn/", "C1", "ẩn ý, sắc thái ngầm", "There is an undertone of regret in his speech.", "Words in Context", "noun"),
  w("evoke", "/ɪˈvoʊk/", "B2", "gợi lên", "The melody evokes memories of childhood.", "Words in Context", "verb"),
  w("paradox", "/ˈpærəˌdɒks/", "C1", "nghịch lý", "It is a paradox that quiet places make us listen more.", "Words in Context", "noun"),

  // Standard English Conventions
  w("antecedent", "/ˌæntəˈsiːdənt/", "C1", "tiền ngữ", "A pronoun must agree with its antecedent.", "Standard English Conventions", "noun"),
  w("clause", "/klɔːz/", "B2", "mệnh đề", "A relative clause adds extra information.", "Standard English Conventions", "noun"),
  w("modifier", "/ˈmɒdəˌfaɪər/", "C1", "bổ ngữ", "A misplaced modifier confuses the reader.", "Standard English Conventions", "noun"),
  w("colon", "/ˈkoʊlən/", "B2", "dấu hai chấm", "Use a colon to introduce a list.", "Standard English Conventions", "noun"),
  w("semicolon", "/ˈsɛmiˌkoʊlən/", "B2", "dấu chấm phẩy", "A semicolon links two related independent clauses.", "Standard English Conventions", "noun"),
  w("transition", "/trænˈzɪʃən/", "B2", "từ chuyển ý", "A clear transition guides the reader between ideas.", "Standard English Conventions", "noun"),
  w("redundant", "/rɪˈdʌndənt/", "B2", "thừa, lặp lại", "Avoid redundant phrases like 'past history'.", "Standard English Conventions", "adjective"),
  w("concise", "/kənˈsaɪs/", "B2", "ngắn gọn", "A concise sentence conveys ideas more powerfully.", "Standard English Conventions", "adjective"),

  // Roots, Prefixes & Suffixes
  w("benevolent", "/bəˈnɛvələnt/", "C1", "nhân từ", "A benevolent donor funded the new library.", "Roots, Prefixes & Suffixes", "adjective"),
  w("malevolent", "/məˈlɛvələnt/", "C1", "ác ý", "The villain wore a malevolent smirk.", "Roots, Prefixes & Suffixes", "adjective"),
  w("verify", "/ˈvɛrəˌfaɪ/", "B2", "kiểm chứng", "Editors verify every quote before publication.", "Roots, Prefixes & Suffixes", "verb"),
  w("transcend", "/trænˈsɛnd/", "C1", "vượt qua", "Music can transcend cultural differences.", "Roots, Prefixes & Suffixes", "verb"),
  w("introspect", "/ˌɪntrəˈspɛkt/", "C1", "tự xét nội tâm", "She paused to introspect after the difficult year.", "Roots, Prefixes & Suffixes", "verb"),
  w("antipathy", "/ænˈtɪpəθi/", "C1", "ác cảm", "His antipathy toward bureaucracy was well known.", "Roots, Prefixes & Suffixes", "noun"),
  w("circumspect", "/ˈsɜːrkəmˌspɛkt/", "C1", "thận trọng, dè dặt", "A circumspect investor avoids hasty decisions.", "Roots, Prefixes & Suffixes", "adjective"),

  // Expression of Ideas
  w("coherent", "/koʊˈhɪərənt/", "B2", "mạch lạc", "A coherent paragraph develops one main idea.", "Expression of Ideas", "adjective"),
  w("succinct", "/səkˈsɪŋkt/", "C1", "súc tích", "His succinct summary captured the key points.", "Expression of Ideas", "adjective"),
  w("elaborate", "/ɪˈlæbərət/", "B2", "công phu, chi tiết", "She gave an elaborate explanation of the diagram.", "Expression of Ideas", "adjective"),
  w("articulate", "/ɑːrˈtɪkjələt/", "B2", "diễn đạt rõ ràng", "He is an articulate speaker on policy issues.", "Expression of Ideas", "adjective"),
  w("unify", "/ˈjuːnəˌfaɪ/", "B2", "thống nhất", "A strong thesis unifies the entire essay.", "Expression of Ideas", "verb"),
  w("emphasize", "/ˈɛmfəˌsaɪz/", "B2", "nhấn mạnh", "The author emphasizes the role of community.", "Expression of Ideas", "verb"),
  w("digression", "/daɪˈɡrɛʃən/", "C1", "sự lạc đề", "Cut any digression that weakens your argument.", "Expression of Ideas", "noun"),

  // Rhetorical Synthesis
  w("synthesize", "/ˈsɪnθəˌsaɪz/", "C1", "tổng hợp", "Strong essays synthesize multiple sources.", "Rhetorical Synthesis", "verb"),
  w("integrate", "/ˈɪntəˌɡreɪt/", "B2", "tích hợp", "The student integrates quotes smoothly.", "Rhetorical Synthesis", "verb"),
  w("juxtaposition", "/ˌdʒʌkstəpəˈzɪʃən/", "C1", "sự đặt cạnh nhau", "The juxtaposition highlights cultural contrasts.", "Rhetorical Synthesis", "noun"),
  w("compelling", "/kəmˈpɛlɪŋ/", "B2", "thuyết phục", "The writer presents a compelling counterargument.", "Rhetorical Synthesis", "adjective"),
  w("perspective", "/pərˈspɛktɪv/", "B2", "quan điểm", "Each source offers a unique perspective.", "Rhetorical Synthesis", "noun"),
  w("rebuttal", "/rɪˈbʌtəl/", "C1", "lập luận phản bác", "A strong rebuttal closes the essay neatly.", "Rhetorical Synthesis", "noun"),

  // Transitions & Flow
  w("nevertheless", "/ˌnɛvərðəˈlɛs/", "B2", "tuy nhiên", "The plan was risky; nevertheless, the team voted yes.", "Transitions & Flow", "adverb"),
  w("furthermore", "/ˈfɜːrðərˌmɔːr/", "B2", "hơn nữa", "It is fast; furthermore, it is affordable.", "Transitions & Flow", "adverb"),
  w("consequently", "/ˈkɒnsəkwəntli/", "B2", "do đó", "Demand soared; consequently, prices doubled.", "Transitions & Flow", "adverb"),
  w("conversely", "/ˈkɒnvɜːrsli/", "B2", "ngược lại", "City life is loud; conversely, rural life feels still.", "Transitions & Flow", "adverb"),
  w("notably", "/ˈnoʊtəbli/", "B2", "đáng chú ý", "Several artists, notably Dali, embraced surrealism.", "Transitions & Flow", "adverb"),
  w("specifically", "/spəˈsɪfɪkli/", "B2", "cụ thể là", "Choose tools that are specifically designed for editing.", "Transitions & Flow", "adverb"),
  w("subsequently", "/ˈsʌbsəkwəntli/", "B2", "sau đó", "She graduated and subsequently joined a research lab.", "Transitions & Flow", "adverb"),

  // High-Frequency SAT Words – Set 1 (extras)
  w("austere", "/ɔːˈstɪər/", "C1", "khắc khổ", "The austere room had only a chair and a lamp.", "High-Frequency SAT Words – Set 1", "adjective"),
  w("benign", "/bɪˈnaɪn/", "C1", "hiền lành", "The neighbor's questions were benign, not nosy.", "High-Frequency SAT Words – Set 1", "adjective"),
  w("brevity", "/ˈbrɛvəti/", "C1", "sự ngắn gọn", "Brevity makes good speeches memorable.", "High-Frequency SAT Words – Set 1", "noun"),
  w("cogent", "/ˈkoʊdʒənt/", "C1", "thuyết phục", "Her cogent argument won over the panel.", "High-Frequency SAT Words – Set 1", "adjective"),
  w("diligent", "/ˈdɪlɪdʒənt/", "B2", "siêng năng", "Diligent practice leads to steady improvement.", "High-Frequency SAT Words – Set 1", "adjective"),
  w("dogmatic", "/dɒɡˈmætɪk/", "C1", "cố chấp, giáo điều", "His dogmatic style left no room for debate.", "High-Frequency SAT Words – Set 1", "adjective"),

  // High-Frequency SAT Words – Set 2 (extras)
  w("ephemeral", "/ɪˈfɛmərəl/", "C1", "thoáng qua", "Cherry blossoms are beautiful but ephemeral.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("erudite", "/ˈɛrʊˌdaɪt/", "C1", "uyên bác", "The erudite professor cited five languages.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("garrulous", "/ˈɡærələs/", "C1", "lắm lời", "Our garrulous neighbor told stories for hours.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("gregarious", "/ɡrɪˈɡɛəriəs/", "C1", "thích giao du", "Gregarious students often join several clubs.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("insipid", "/ɪnˈsɪpɪd/", "C1", "nhạt nhẽo", "The film's insipid dialogue lost the audience.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("magnanimous", "/mæɡˈnænəməs/", "C1", "khoan dung", "The champion was magnanimous in victory.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("meticulous", "/mɪˈtɪkjələs/", "B2", "tỉ mỉ", "Her meticulous notes made revision easy.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("pragmatic", "/præɡˈmætɪk/", "B2", "thực dụng", "A pragmatic solution beats a perfect plan.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("verbose", "/vərˈboʊs/", "C1", "dài dòng", "Trim verbose sentences before submitting.", "High-Frequency SAT Words – Set 2", "adjective"),
  w("zealous", "/ˈzɛləs/", "C1", "nhiệt thành", "Zealous volunteers ran the entire festival.", "High-Frequency SAT Words – Set 2", "adjective"),

  // Math — Heart of Algebra
  w("variable", "/ˈvɛəriəbəl/", "B2", "biến số", "Solve the equation for the variable x.", "Heart of Algebra", "noun", "Math"),
  w("coefficient", "/ˌkoʊɪˈfɪʃənt/", "B2", "hệ số", "The coefficient of x is 3 in 3x + 5.", "Heart of Algebra", "noun", "Math"),
  w("constant", "/ˈkɒnstənt/", "B2", "hằng số", "The constant term in 2x + 7 is 7.", "Heart of Algebra", "noun", "Math"),
  w("inequality", "/ˌɪnɪˈkwɒləti/", "B2", "bất đẳng thức", "Graph the inequality y > 2x + 1.", "Heart of Algebra", "noun", "Math"),
  w("substitution", "/ˌsʌbstəˈtuːʃən/", "B2", "phép thế", "Solve the system using substitution.", "Heart of Algebra", "noun", "Math"),
  w("intercept", "/ˈɪntərˌsɛpt/", "B2", "giao điểm với trục", "The y-intercept of the line is 4.", "Heart of Algebra", "noun", "Math"),
  w("slope", "/sloʊp/", "B2", "độ dốc", "The slope of the line is negative.", "Heart of Algebra", "noun", "Math"),

  // Math — Problem Solving & Data Analysis
  w("ratio", "/ˈreɪʃioʊ/", "B2", "tỉ số", "The ratio of boys to girls is 3 to 2.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("proportion", "/prəˈpɔːrʃən/", "B2", "tỉ lệ", "Solve the proportion 4/x = 8/10.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("percentile", "/pərˈsɛntaɪl/", "B2", "phần trăm vị", "Her score is in the 90th percentile.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("scatterplot", "/ˈskætərˌplɒt/", "B2", "biểu đồ phân tán", "The scatterplot suggests a positive trend.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("histogram", "/ˈhɪstəˌɡræm/", "B2", "biểu đồ tần suất", "The histogram shows test-score distribution.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("standard deviation", "/ˈstændərd ˌdiːviˈeɪʃən/", "C1", "độ lệch chuẩn", "A small standard deviation means tight clustering.", "Problem Solving & Data Analysis", "noun", "Math"),

  // Math — Passport to Advanced Math
  w("quadratic", "/kwɒˈdrætɪk/", "B2", "bậc hai", "Solve the quadratic equation by factoring.", "Passport to Advanced Math", "adjective", "Math"),
  w("polynomial", "/ˌpɒliˈnoʊmiəl/", "C1", "đa thức", "Add the two polynomial expressions.", "Passport to Advanced Math", "noun", "Math"),
  w("exponent", "/ɪkˈspoʊnənt/", "B2", "số mũ", "Apply the exponent rule to simplify.", "Passport to Advanced Math", "noun", "Math"),
  w("radical", "/ˈrædɪkəl/", "B2", "căn thức", "Rationalize the denominator of the radical.", "Passport to Advanced Math", "noun", "Math"),
  w("function", "/ˈfʌŋkʃən/", "B2", "hàm số", "Evaluate the function at x = 3.", "Passport to Advanced Math", "noun", "Math"),
  w("vertex", "/ˈvɜːrtɛks/", "B2", "đỉnh", "Find the vertex of the parabola.", "Passport to Advanced Math", "noun", "Math"),

  // Math — Geometry & Trigonometry
  w("hypotenuse", "/haɪˈpɒtəˌnuːs/", "B2", "cạnh huyền", "The hypotenuse is opposite the right angle.", "Geometry & Trigonometry", "noun", "Math"),
  w("congruent", "/kənˈɡruːənt/", "B2", "bằng nhau (hình)", "The two triangles are congruent by SAS.", "Geometry & Trigonometry", "adjective", "Math"),
  w("similar", "/ˈsɪmələr/", "B2", "đồng dạng", "Similar triangles share the same angles.", "Geometry & Trigonometry", "adjective", "Math"),
  w("perimeter", "/pəˈrɪmətər/", "B2", "chu vi", "Find the perimeter of the rectangle.", "Geometry & Trigonometry", "noun", "Math"),
  w("circumference", "/sərˈkʌmfərəns/", "B2", "chu vi đường tròn", "Use 2πr to find the circumference.", "Geometry & Trigonometry", "noun", "Math"),
  w("tangent", "/ˈtændʒənt/", "B2", "tiếp tuyến / tan", "The tangent line touches the circle at one point.", "Geometry & Trigonometry", "noun", "Math"),
  w("sine", "/saɪn/", "B2", "sin", "The sine of 30° is 0.5.", "Geometry & Trigonometry", "noun", "Math"),
  w("cosine", "/ˈkoʊˌsaɪn/", "B2", "cos", "Use cosine to find the adjacent side.", "Geometry & Trigonometry", "noun", "Math"),
];
