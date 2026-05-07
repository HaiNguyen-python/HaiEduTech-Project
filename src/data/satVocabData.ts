// SAT Vocabulary - merged from SAT interactive lessons + curated SAT Math glossary.
// Shares the same shape pattern as ieltsVocabData for UI re-use, with an added 'section' field.

export interface SatWord {
  word: string;
  ipa?: string;
  level: string;
  definition: { en: string; vi: string };
  example: string;
  category: string;        // lesson name
  partOfSpeech?: string;
  section: 'Reading & Writing' | 'Math';
}

export const SAT_LEVELS = ['B2','C1'] as const;
export const SAT_SECTIONS = ['Reading & Writing','Math'] as const;

export const SAT_CATEGORIES_BY_SECTION: Record<string, string[]> = {
  'Reading & Writing': ["Evidence-Based Reading","Command of Evidence","Words in Context","Standard English Conventions","High-Frequency SAT Words – Set 1","High-Frequency SAT Words – Set 2","Roots, Prefixes & Suffixes","Expression of Ideas","Rhetorical Synthesis","Transitions & Flow"],
  'Math': ["Heart of Algebra","Problem Solving & Data Analysis","Passport to Advanced Math","Geometry & Trigonometry"],
};

export const SAT_CATEGORIES = ["Evidence-Based Reading","Command of Evidence","Words in Context","Standard English Conventions","High-Frequency SAT Words – Set 1","High-Frequency SAT Words – Set 2","Roots, Prefixes & Suffixes","Expression of Ideas","Rhetorical Synthesis","Transitions & Flow","Heart of Algebra","Problem Solving & Data Analysis","Passport to Advanced Math","Geometry & Trigonometry"] as const;

export const satVocabData: SatWord[] = [
  {
    "word": "evidence",
    "ipa": "/ˈɛvədəns/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bằng chứng"
    },
    "example": "The evidence in the passage supports this conclusion.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "inference",
    "ipa": "/ˈɪnfərəns/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "suy luận"
    },
    "example": "What inference can be drawn from paragraph 2?",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "imply",
    "ipa": "/ˌɪmˈplaɪ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngụ ý, ám chỉ"
    },
    "example": "The author implies that technology has both benefits and drawbacks.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "excerpt",
    "ipa": "/ˈɛksərpt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đoạn trích"
    },
    "example": "Read the following excerpt from the passage.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "undermine",
    "ipa": "/ˈəndərˌmaɪn/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "làm suy yếu"
    },
    "example": "This evidence undermines the opposing argument.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "substantiate",
    "ipa": "/səbˈstænʧiˌeɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "chứng minh, chứng thực"
    },
    "example": "The data substantiates the researcher's hypothesis.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "corroborate",
    "ipa": "/kərˈɑbərˌeɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "xác nhận, củng cố"
    },
    "example": "Multiple sources corroborate this finding.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "assertion",
    "ipa": "/əˈsərʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "khẳng định"
    },
    "example": "The author's central assertion is supported by evidence.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "compelling",
    "ipa": "/kəmˈpɛlɪŋ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thuyết phục"
    },
    "example": "She presented a compelling argument for reform.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "nuance",
    "ipa": "/nuɑns/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sắc thái"
    },
    "example": "The passage explores the nuances of the debate.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "cite",
    "ipa": "/saɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "trích dẫn"
    },
    "example": "The student cited evidence from paragraph 3.",
    "category": "Command of Evidence",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "bolster",
    "ipa": "/ˈboʊlstər/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "củng cố, tăng cường"
    },
    "example": "New data bolsters the original claim.",
    "category": "Command of Evidence",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "refute",
    "ipa": "/rɪfˈjut/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bác bỏ"
    },
    "example": "The study refutes earlier findings about climate patterns.",
    "category": "Command of Evidence",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "empirical",
    "ipa": "/ˌɛmˈpɪrɪkəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thực nghiệm"
    },
    "example": "Empirical evidence is gathered through observation.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "quantitative",
    "ipa": "/kˈwɑntɪˌteɪtɪv/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "định lượng"
    },
    "example": "Quantitative data includes numbers and statistics.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "qualitative",
    "ipa": "/kˈwɑləˌteɪtɪv/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "định tính"
    },
    "example": "Qualitative research explores people's experiences.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "hypothesis",
    "ipa": "/haɪˈpɑθəsəs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giả thuyết"
    },
    "example": "The hypothesis was tested through experiments.",
    "category": "Command of Evidence",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "methodology",
    "ipa": "/ˌmɛθəˈdɑləʤi/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phương pháp luận"
    },
    "example": "The research methodology was rigorous.",
    "category": "Command of Evidence",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "credible",
    "ipa": "/ˈkrɛdəbəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đáng tin cậy"
    },
    "example": "Only credible sources should be used in academic work.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "paradigm",
    "ipa": "/ˈpɛrəˌdaɪm/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "mô hình, khuôn mẫu"
    },
    "example": "This represents a paradigm shift in scientific thinking.",
    "category": "Command of Evidence",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "acute",
    "ipa": "/əˈkjut/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nhạy bén / cấp tính / nghiêm trọng"
    },
    "example": "She has an acute sense of observation.",
    "category": "Words in Context",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "address",
    "ipa": "/ˈæˌdrɛs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giải quyết (ngoài nghĩa 'địa chỉ')"
    },
    "example": "The committee will address the issue tomorrow.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "appreciate",
    "ipa": "/əˈpriʃiˌeɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nhận thức, hiểu rõ (ngoài 'đánh giá cao')"
    },
    "example": "Few people appreciate the complexity of the problem.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "channel",
    "ipa": "/ˈʧænəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hướng, chuyển (ngoài 'kênh')"
    },
    "example": "She channeled her energy into creative work.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "check",
    "ipa": "/ʧɛk/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "kiềm chế, ngăn cản (ngoài 'kiểm tra')"
    },
    "example": "The policy was designed to check inflation.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "currency",
    "ipa": "/ˈkərənsi/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự phổ biến (ngoài 'tiền tệ')"
    },
    "example": "The idea gained currency among intellectuals.",
    "category": "Words in Context",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "entertain",
    "ipa": "/ˌɛnərˈteɪn/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "xem xét (ngoài 'giải trí')"
    },
    "example": "She refused to entertain the possibility of failure.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "fashion",
    "ipa": "/ˈfæʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tạo nên, hình thành (ngoài 'thời trang')"
    },
    "example": "He fashioned a solution from limited resources.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "gravity",
    "ipa": "/ˈgrævɪti/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tính nghiêm trọng (ngoài 'trọng lực')"
    },
    "example": "The gravity of the situation was clear to everyone.",
    "category": "Words in Context",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "qualify",
    "ipa": "/kˈwɑləˌfaɪ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hạn chế, điều chỉnh (ngoài 'đạt chuẩn')"
    },
    "example": "She qualified her earlier statement with new data.",
    "category": "Words in Context",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "modifier",
    "ipa": "/modifier/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bổ ngữ, từ bổ nghĩa"
    },
    "example": "A dangling modifier creates confusion in a sentence.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "clause",
    "ipa": "/klɔz/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "mệnh đề"
    },
    "example": "An independent clause can stand alone as a sentence.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "antecedent",
    "ipa": "/ˌænˈtɛsədənt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tiền ngữ (từ được đại từ thay thế)"
    },
    "example": "The pronoun must agree with its antecedent.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "conjunction",
    "ipa": "/kənˈʤəŋkʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "liên từ"
    },
    "example": "Coordinating conjunctions include and, but, or.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "semicolon",
    "ipa": "/semicolon/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "dấu chấm phẩy"
    },
    "example": "Use a semicolon to join related independent clauses.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "appositive",
    "ipa": "/appositive/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đồng vị ngữ"
    },
    "example": "An appositive renames a nearby noun.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "subordinate",
    "ipa": "/səˈbɔrdəˌneɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phụ thuộc"
    },
    "example": "A subordinate clause cannot stand alone.",
    "category": "Standard English Conventions",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "concise",
    "ipa": "/kənˈsaɪs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngắn gọn, súc tích"
    },
    "example": "Good writing is concise and clear.",
    "category": "Standard English Conventions",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "redundant",
    "ipa": "/rɪˈdəndənt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thừa, lặp lại"
    },
    "example": "'Free gift' is redundant because gifts are always free.",
    "category": "Standard English Conventions",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "syntax",
    "ipa": "/ˈsɪnˌtæks/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "cú pháp"
    },
    "example": "Proper syntax ensures sentences are grammatically correct.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "ubiquitous",
    "ipa": "/juˈbɪkwɪtəs/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "có mặt khắp nơi"
    },
    "example": "Smartphones have become ubiquitous in modern society.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "pragmatic",
    "ipa": "/prægˈmætɪk/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "thực dụng, thực tế"
    },
    "example": "She took a pragmatic approach to solving the problem.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "ambiguous",
    "ipa": "/æmˈbɪgjuəs/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "mơ hồ, không rõ ràng"
    },
    "example": "The instructions were ambiguous and confused everyone.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "eloquent",
    "ipa": "/ˈɛləkwənt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "hùng biện, lưu loát"
    },
    "example": "Her eloquent speech moved the entire audience.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "meticulous",
    "ipa": "/məˈtɪkjələs/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "tỉ mỉ, cẩn thận"
    },
    "example": "He is meticulous about every detail in his work.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "resilient",
    "ipa": "/rɪˈzɪljənt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "kiên cường, có sức bật"
    },
    "example": "The community proved resilient after the natural disaster.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "disparity",
    "ipa": "/dɪˈspɛrəti/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sự chênh lệch"
    },
    "example": "There is a growing disparity between rich and poor.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "scrutinize",
    "ipa": "/ˈskrutəˌnaɪz/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "xem xét kỹ lưỡng"
    },
    "example": "The committee scrutinized every proposal carefully.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "proliferate",
    "ipa": "/proʊˈlɪfərˌeɪt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sinh sôi, lan rộng"
    },
    "example": "Social media platforms have proliferated over the past decade.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "advocate",
    "ipa": "/ˈædvəˌkeɪt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ủng hộ, vận động (v); người ủng hộ (n)"
    },
    "example": "She advocates for equal access to education.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "ephemeral",
    "ipa": "/ɪˈfɛmərəl/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "phù du, thoáng qua"
    },
    "example": "Social media fame is often ephemeral.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "juxtapose",
    "ipa": "/ˌʤəkstəˈpoʊz/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "đặt cạnh nhau để so sánh"
    },
    "example": "The artist juxtaposed old and new techniques.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "paradox",
    "ipa": "/ˈpɛrəˌdɑks/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "nghịch lý"
    },
    "example": "It's a paradox that we have more information but less understanding.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "exacerbate",
    "ipa": "/ɪgˈzæsərˌbeɪt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "làm trầm trọng hơn"
    },
    "example": "The drought exacerbated the food crisis.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "mitigate",
    "ipa": "/ˈmɪtəˌgeɪt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "giảm nhẹ, xoa dịu"
    },
    "example": "New policies aim to mitigate the effects of climate change.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "unprecedented",
    "ipa": "/ənˈprɛsɪˌdɛntɪd/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "chưa từng có tiền lệ"
    },
    "example": "The pandemic caused unprecedented disruption.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "candid",
    "ipa": "/ˈkændɪd/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "thẳng thắn, bộc trực"
    },
    "example": "She gave a candid assessment of the situation.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "catalyst",
    "ipa": "/ˈkætəˌlɪst/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "chất xúc tác, tác nhân thúc đẩy"
    },
    "example": "The discovery was a catalyst for further research.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "digress",
    "ipa": "/daɪˈgrɛs/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "lạc đề"
    },
    "example": "The speaker tended to digress from the main topic.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "vindicate",
    "ipa": "/ˈvɪndəkeɪt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "minh oan, chứng minh đúng"
    },
    "example": "New evidence vindicated the accused scientist.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "benevolent",
    "ipa": "/bəˈnɛvələnt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "nhân từ (bene = tốt)"
    },
    "example": "The benevolent donor supported many charities.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "malevolent",
    "ipa": "/məˈlɛvələnt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ác ý (mal = xấu)"
    },
    "example": "The villain's malevolent plan was foiled.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "circumscribe",
    "ipa": "/ˌsərkəmˈskraɪb/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "giới hạn (circum = xung quanh + scrib = viết)"
    },
    "example": "Laws circumscribe individual freedoms for the common good.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "retrospect",
    "ipa": "/ˈrɛtrəˌspɛkt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "nhìn lại (retro = quay lại + spec = nhìn)"
    },
    "example": "In retrospect, the decision was unwise.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "preclude",
    "ipa": "/prɪˈklud/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ngăn cản trước (pre = trước + clud = đóng)"
    },
    "example": "Lack of funds precluded further research.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "transcend",
    "ipa": "/trænˈsɛnd/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "vượt qua (trans = qua + scend = leo)"
    },
    "example": "Great art transcends cultural boundaries.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "antipathy",
    "ipa": "/ænˈtɪpəθi/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ác cảm (anti = chống + path = cảm xúc)"
    },
    "example": "He felt deep antipathy toward dishonesty.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "ambivalent",
    "ipa": "/æmˈbɪvələnt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "mâu thuẫn (ambi = cả hai + val = giá trị)"
    },
    "example": "She felt ambivalent about moving abroad.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "elucidate",
    "ipa": "/ɪˈlusəˌdeɪt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "làm sáng tỏ (e = ra + luc = ánh sáng)"
    },
    "example": "The professor elucidated the complex theory.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "magnanimous",
    "ipa": "/mægˈnænəməs/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "rộng lượng (magn = lớn + anim = tâm hồn)"
    },
    "example": "The magnanimous leader forgave his opponents.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "cohesion",
    "ipa": "/koʊˈhiʒən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự liên kết"
    },
    "example": "Good writing has strong cohesion between paragraphs.",
    "category": "Expression of Ideas",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "coherence",
    "ipa": "/koʊˈhɪrəns/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự mạch lạc"
    },
    "example": "The essay lacked coherence and was difficult to follow.",
    "category": "Expression of Ideas",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "transition",
    "ipa": "/trænˈzɪʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự chuyển tiếp"
    },
    "example": "Use transitions to connect your ideas smoothly.",
    "category": "Expression of Ideas",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "elaborate",
    "ipa": "/ɪˈlæbərˌeɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giải thích chi tiết"
    },
    "example": "Could you elaborate on your main argument?",
    "category": "Expression of Ideas",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "succinct",
    "ipa": "/səkˈsɪŋkt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngắn gọn, súc tích"
    },
    "example": "Her presentation was succinct yet informative.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "verbose",
    "ipa": "/verbose/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "dài dòng"
    },
    "example": "Avoid verbose writing; be concise instead.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "synthesize",
    "ipa": "/ˈsɪnθəˌsaɪz/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tổng hợp"
    },
    "example": "The essay synthesizes ideas from multiple sources.",
    "category": "Expression of Ideas",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "articulate",
    "ipa": "/ɑrˈtɪkjəˌleɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "diễn đạt rõ ràng"
    },
    "example": "She articulated her position clearly.",
    "category": "Expression of Ideas",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "judiciously",
    "ipa": "/ʤuˈdɪʃɪsli/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "khôn ngoan, thận trọng"
    },
    "example": "Use evidence judiciously to support your claims.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "pertinent",
    "ipa": "/ˈpərtɪnɪnt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thích hợp, liên quan"
    },
    "example": "Only include pertinent information in your essay.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "rhetorical",
    "ipa": "/rɪˈtɔrɪkəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tu từ, liên quan đến nghệ thuật diễn đạt"
    },
    "example": "The rhetorical question was meant to provoke thought.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "synthesis",
    "ipa": "/ˈsɪnθəsəs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự tổng hợp"
    },
    "example": "The paper is a synthesis of several research studies.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "emphasize",
    "ipa": "/ˈɛmfəˌsaɪz/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nhấn mạnh"
    },
    "example": "The report emphasizes the need for immediate action.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "contrast",
    "ipa": "/ˈkɑntræst/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tương phản"
    },
    "example": "The essay contrasts urban and rural lifestyles.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "convey",
    "ipa": "/kənˈveɪ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "truyền đạt"
    },
    "example": "The graph conveys the declining trend clearly.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "premise",
    "ipa": "/ˈprɛmɪs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tiền đề"
    },
    "example": "The argument is based on a false premise.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "concession",
    "ipa": "/kənˈsɛʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự nhượng bộ"
    },
    "example": "The author makes a concession before presenting the main argument.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "noun",
    "section": "Reading & Writing"
  },
  {
    "word": "rebut",
    "ipa": "/rɪˈbət/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phản bác"
    },
    "example": "She rebutted every point in the opposing argument.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb",
    "section": "Reading & Writing"
  },
  {
    "word": "substantive",
    "ipa": "/ˈsəbstəntɪv/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "có thực chất, quan trọng"
    },
    "example": "We need substantive changes, not superficial ones.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "pivotal",
    "ipa": "/ˈpɪvətəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "then chốt, quan trọng"
    },
    "example": "This was a pivotal moment in the debate.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "adjective",
    "section": "Reading & Writing"
  },
  {
    "word": "moreover",
    "ipa": "/mɔˈroʊvər/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hơn nữa"
    },
    "example": "The plan is effective; moreover, it is cost-efficient.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "nevertheless",
    "ipa": "/ˌnɛvərðəˈlɛs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tuy nhiên, dù vậy"
    },
    "example": "The experiment failed; nevertheless, it provided valuable data.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "consequently",
    "ipa": "/ˈkɑnsəkˌwɛntli/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "do đó, kết quả là"
    },
    "example": "He didn't study; consequently, he failed the exam.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "conversely",
    "ipa": "/ˈkɑnvərsli/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngược lại"
    },
    "example": "In summer, days are long; conversely, in winter, they are short.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "notwithstanding",
    "ipa": "/ˌnɑtwɪθˈstændɪŋ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bất chấp, mặc dù"
    },
    "example": "Notwithstanding the challenges, the team succeeded.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "subsequently",
    "ipa": "/ˈsəbsəkwəntli/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sau đó"
    },
    "example": "She graduated in 2020 and subsequently joined a tech company.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "likewise",
    "ipa": "/ˈlaɪkˌwaɪz/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tương tự"
    },
    "example": "The first study showed positive results; likewise, the second confirmed them.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "in light of",
    "ipa": "/ɪn laɪt əv/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "dựa trên, xét đến"
    },
    "example": "In light of new evidence, the theory was revised.",
    "category": "Transitions & Flow",
    "partOfSpeech": "phrase",
    "section": "Reading & Writing"
  },
  {
    "word": "albeit",
    "ipa": "/ɔlˈbiɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "mặc dù"
    },
    "example": "The progress was slow, albeit steady.",
    "category": "Transitions & Flow",
    "partOfSpeech": "conjunction",
    "section": "Reading & Writing"
  },
  {
    "word": "accordingly",
    "ipa": "/əˈkɔrdɪŋli/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "theo đó, phù hợp"
    },
    "example": "The budget was cut; accordingly, the project scope was reduced.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb",
    "section": "Reading & Writing"
  },
  {
    "word": "linear equation",
    "ipa": "/ˈlɪniər ɪkˈweɪʒən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phương trình tuyến tính"
    },
    "example": "Solve the linear equation 3x + 5 = 14.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "slope",
    "ipa": "/sloʊp/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hệ số góc / độ dốc"
    },
    "example": "The slope of the line is 2/3.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "intercept",
    "ipa": "/ˌɪnərˈsɛpt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giao điểm với trục"
    },
    "example": "Find the y-intercept of the equation y = 2x + 3.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "variable",
    "ipa": "/ˈvɛriəbəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "biến số"
    },
    "example": "Let x be the variable representing time.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "coefficient",
    "ipa": "/ˌkoʊəˈfɪʃənt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hệ số"
    },
    "example": "In 5x², the coefficient is 5.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "constant",
    "ipa": "/ˈkɑnstənt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hằng số"
    },
    "example": "The constant term in y = 3x + 7 is 7.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "expression",
    "ipa": "/ɪkˈsprɛʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "biểu thức"
    },
    "example": "Simplify the expression 2(x + 3) - 4.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "equivalent",
    "ipa": "/ɪkˈwɪvələnt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tương đương"
    },
    "example": "These two expressions are equivalent.",
    "category": "Heart of Algebra",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "system of equations",
    "ipa": "/ˈsɪstəm əv ɪkˈweɪʒənz/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hệ phương trình"
    },
    "example": "Solve the system of equations using substitution.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "inequality",
    "ipa": "/ˌɪnɪkˈwɑləti/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bất phương trình"
    },
    "example": "The inequality 2x + 1 > 5 has many solutions.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "solution set",
    "ipa": "/səˈluʃən sɛt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "tập nghiệm"
    },
    "example": "The solution set of x² = 9 is {-3, 3}.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "absolute value",
    "ipa": "/ˈæbsəˌlut ˈvælju/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giá trị tuyệt đối"
    },
    "example": "The absolute value of -7 is 7.",
    "category": "Heart of Algebra",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "ratio",
    "ipa": "/ˈreɪʃiˌoʊ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tỉ lệ"
    },
    "example": "The ratio of boys to girls is 3 to 2.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "proportion",
    "ipa": "/prəˈpɔrʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tỉ lệ thức"
    },
    "example": "Set up a proportion to find the missing value.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "percent",
    "ipa": "/pərˈsɛnt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phần trăm"
    },
    "example": "25 percent of 80 is 20.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "percent increase",
    "ipa": "/pərˈsɛnt ˌɪnˈkris/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "phần trăm tăng"
    },
    "example": "The percent increase from 50 to 60 is 20%.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "percent decrease",
    "ipa": "/pərˈsɛnt ˈdiˌkris/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "phần trăm giảm"
    },
    "example": "A 10% percent decrease from 200 is 180.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "median",
    "ipa": "/ˈmidiən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "trung vị"
    },
    "example": "Find the median of the data set.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "mean",
    "ipa": "/min/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giá trị trung bình"
    },
    "example": "The mean is the average of all numbers.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "mode",
    "ipa": "/moʊd/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "số xuất hiện nhiều nhất"
    },
    "example": "The mode of {2,3,3,4} is 3.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "range",
    "ipa": "/reɪnʤ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "khoảng (max - min)"
    },
    "example": "The range of the set is the maximum minus the minimum.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "standard deviation",
    "ipa": "/ˈstændərd ˌdiviˈeɪʃən/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "độ lệch chuẩn"
    },
    "example": "A small standard deviation means data is clustered.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "probability",
    "ipa": "/ˌprɑbəˈbɪləˌti/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "xác suất"
    },
    "example": "The probability of rolling a 6 is 1/6.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "margin of error",
    "ipa": "/ˈmɑrʤən əv ˈɛrər/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sai số cho phép"
    },
    "example": "The poll has a margin of error of ±3%.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "scatterplot",
    "ipa": "/scatterplot/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "biểu đồ phân tán"
    },
    "example": "The scatterplot shows a positive correlation.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "correlation",
    "ipa": "/ˌkɔrəˈleɪʃən/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sự tương quan"
    },
    "example": "There is a strong correlation between study time and scores.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "unit rate",
    "ipa": "/ˈjunɪt reɪt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tỉ lệ đơn vị"
    },
    "example": "The unit rate is 60 miles per hour.",
    "category": "Problem Solving & Data Analysis",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "quadratic",
    "ipa": "/quadratic/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bậc hai"
    },
    "example": "Solve the quadratic equation x² + 3x - 4 = 0.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "parabola",
    "ipa": "/pərˈæbələ/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "đường parabol"
    },
    "example": "The graph of a quadratic is a parabola.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "vertex",
    "ipa": "/ˈvərˌtɛks/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "đỉnh (parabol)"
    },
    "example": "Find the vertex of the parabola.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "discriminant",
    "ipa": "/discriminant/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "biệt thức"
    },
    "example": "If the discriminant is negative, there are no real roots.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "polynomial",
    "ipa": "/ˌpɑˌliˈnoʊmiəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đa thức"
    },
    "example": "Factor the polynomial completely.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "exponent",
    "ipa": "/ˈɛkˌspoʊnənt/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "số mũ"
    },
    "example": "The exponent tells you how many times to multiply.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "exponential",
    "ipa": "/ˌɛkspoʊˈnɛnʃəl/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "hàm mũ"
    },
    "example": "Population growth is often exponential.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "radical",
    "ipa": "/ˈrædɪkəl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "căn (√)"
    },
    "example": "Simplify the radical expression.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "rational expression",
    "ipa": "/ˈræʃənəl ɪkˈsprɛʃən/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "biểu thức hữu tỉ"
    },
    "example": "Simplify the rational expression by factoring.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "function",
    "ipa": "/ˈfəŋkʃən/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hàm số"
    },
    "example": "f(x) = 2x + 1 defines a linear function.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "domain",
    "ipa": "/doʊˈmeɪn/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "tập xác định"
    },
    "example": "The domain of the function is all real numbers.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "range (function)",
    "ipa": "/reɪnʤ (ˈfəŋkʃən)/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "tập giá trị"
    },
    "example": "The range of f(x) = x² is y ≥ 0.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "factor",
    "ipa": "/ˈfæktər/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phân tích thành nhân tử"
    },
    "example": "Factor x² - 9 as (x-3)(x+3).",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "verb",
    "section": "Math"
  },
  {
    "word": "root / zero",
    "ipa": "/rut  ˈziroʊ/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nghiệm"
    },
    "example": "The roots of the equation are x = 2 and x = -1.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "inverse function",
    "ipa": "/ˌɪnˈvərs ˈfəŋkʃən/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "hàm ngược"
    },
    "example": "The inverse function reverses the operation.",
    "category": "Passport to Advanced Math",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "perimeter",
    "ipa": "/pərˈɪmətər/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "chu vi"
    },
    "example": "The perimeter of a square is 4 × side.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "area",
    "ipa": "/ˈɛriə/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "diện tích"
    },
    "example": "The area of a triangle is ½ × base × height.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "volume",
    "ipa": "/ˈvɑljum/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thể tích"
    },
    "example": "The volume of the cylinder is πr²h.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "radius",
    "ipa": "/ˈreɪdiəs/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bán kính"
    },
    "example": "The radius is half the diameter.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "diameter",
    "ipa": "/daɪˈæmətər/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đường kính"
    },
    "example": "The diameter passes through the center of the circle.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "circumference",
    "ipa": "/ˌsərˈkəmfrəns/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "chu vi đường tròn"
    },
    "example": "The circumference equals 2πr.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "hypotenuse",
    "ipa": "/hypotenuse/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "cạnh huyền"
    },
    "example": "In a right triangle, the hypotenuse is the longest side.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "Pythagorean theorem",
    "ipa": "/ˌpɪθəˈgɔriən ˈθɪrəm/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "định lý Pythagore"
    },
    "example": "Use the Pythagorean theorem: a² + b² = c².",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "congruent",
    "ipa": "/congruent/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "bằng nhau (hình học)"
    },
    "example": "The two triangles are congruent.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "similar",
    "ipa": "/ˈsɪmələr/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "đồng dạng"
    },
    "example": "Similar triangles have proportional sides.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "parallel",
    "ipa": "/ˈpɛrəˌlɛl/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "song song"
    },
    "example": "Two parallel lines never intersect.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "perpendicular",
    "ipa": "/ˌpərpənˈdɪkjələr/",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "vuông góc"
    },
    "example": "Perpendicular lines meet at a 90° angle.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "adjective",
    "section": "Math"
  },
  {
    "word": "sine",
    "ipa": "/saɪn/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sin"
    },
    "example": "sin(30°) equals 0.5.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "cosine",
    "ipa": "/cosine/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "cos"
    },
    "example": "Use cosine to find the adjacent side.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "tangent",
    "ipa": "/ˈtænʤənt/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "tan"
    },
    "example": "Tangent equals opposite over adjacent.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "arc",
    "ipa": "/ɑrk/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "cung tròn"
    },
    "example": "The arc length depends on the radius and angle.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  },
  {
    "word": "chord",
    "ipa": "/kɔrd/",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "dây cung"
    },
    "example": "A chord connects two points on a circle.",
    "category": "Geometry & Trigonometry",
    "partOfSpeech": "noun",
    "section": "Math"
  }
];
