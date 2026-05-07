// SAT Vocabulary - extracted from SAT interactive lessons (auto-derived)
// Shares the same shape as ieltsVocabData for UI re-use.

export interface SatWord {
  word: string;
  ipa: string;
  level: string;
  definition: { en: string; vi: string };
  example: string;
  category: string;
  partOfSpeech?: string;
}

export const SAT_LEVELS = ['B2','C1'] as const;

export const SAT_CATEGORIES = ["Evidence-Based Reading","Command of Evidence","Words in Context","Standard English Conventions","High-Frequency SAT Words – Set 1","High-Frequency SAT Words – Set 2","Roots, Prefixes & Suffixes","Expression of Ideas","Rhetorical Synthesis","Transitions & Flow"] as const;

export const satVocabData: SatWord[] = [
  {
    "word": "evidence",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bằng chứng"
    },
    "example": "The evidence in the passage supports this conclusion.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun"
  },
  {
    "word": "inference",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "suy luận"
    },
    "example": "What inference can be drawn from paragraph 2?",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun"
  },
  {
    "word": "imply",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngụ ý, ám chỉ"
    },
    "example": "The author implies that technology has both benefits and drawbacks.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb"
  },
  {
    "word": "excerpt",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đoạn trích"
    },
    "example": "Read the following excerpt from the passage.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun"
  },
  {
    "word": "undermine",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "làm suy yếu"
    },
    "example": "This evidence undermines the opposing argument.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb"
  },
  {
    "word": "substantiate",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "chứng minh, chứng thực"
    },
    "example": "The data substantiates the researcher's hypothesis.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb"
  },
  {
    "word": "corroborate",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "xác nhận, củng cố"
    },
    "example": "Multiple sources corroborate this finding.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "verb"
  },
  {
    "word": "assertion",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "khẳng định"
    },
    "example": "The author's central assertion is supported by evidence.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun"
  },
  {
    "word": "compelling",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thuyết phục"
    },
    "example": "She presented a compelling argument for reform.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "adjective"
  },
  {
    "word": "nuance",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sắc thái"
    },
    "example": "The passage explores the nuances of the debate.",
    "category": "Evidence-Based Reading",
    "partOfSpeech": "noun"
  },
  {
    "word": "cite",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "trích dẫn"
    },
    "example": "The student cited evidence from paragraph 3.",
    "category": "Command of Evidence",
    "partOfSpeech": "verb"
  },
  {
    "word": "bolster",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "củng cố, tăng cường"
    },
    "example": "New data bolsters the original claim.",
    "category": "Command of Evidence",
    "partOfSpeech": "verb"
  },
  {
    "word": "refute",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bác bỏ"
    },
    "example": "The study refutes earlier findings about climate patterns.",
    "category": "Command of Evidence",
    "partOfSpeech": "verb"
  },
  {
    "word": "empirical",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thực nghiệm"
    },
    "example": "Empirical evidence is gathered through observation.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective"
  },
  {
    "word": "quantitative",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "định lượng"
    },
    "example": "Quantitative data includes numbers and statistics.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective"
  },
  {
    "word": "qualitative",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "định tính"
    },
    "example": "Qualitative research explores people's experiences.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective"
  },
  {
    "word": "hypothesis",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giả thuyết"
    },
    "example": "The hypothesis was tested through experiments.",
    "category": "Command of Evidence",
    "partOfSpeech": "noun"
  },
  {
    "word": "methodology",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phương pháp luận"
    },
    "example": "The research methodology was rigorous.",
    "category": "Command of Evidence",
    "partOfSpeech": "noun"
  },
  {
    "word": "credible",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đáng tin cậy"
    },
    "example": "Only credible sources should be used in academic work.",
    "category": "Command of Evidence",
    "partOfSpeech": "adjective"
  },
  {
    "word": "paradigm",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "mô hình, khuôn mẫu"
    },
    "example": "This represents a paradigm shift in scientific thinking.",
    "category": "Command of Evidence",
    "partOfSpeech": "noun"
  },
  {
    "word": "acute",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nhạy bén / cấp tính / nghiêm trọng"
    },
    "example": "She has an acute sense of observation.",
    "category": "Words in Context",
    "partOfSpeech": "adjective"
  },
  {
    "word": "address",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giải quyết (ngoài nghĩa 'địa chỉ')"
    },
    "example": "The committee will address the issue tomorrow.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "appreciate",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nhận thức, hiểu rõ (ngoài 'đánh giá cao')"
    },
    "example": "Few people appreciate the complexity of the problem.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "channel",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hướng, chuyển (ngoài 'kênh')"
    },
    "example": "She channeled her energy into creative work.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "check",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "kiềm chế, ngăn cản (ngoài 'kiểm tra')"
    },
    "example": "The policy was designed to check inflation.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "currency",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự phổ biến (ngoài 'tiền tệ')"
    },
    "example": "The idea gained currency among intellectuals.",
    "category": "Words in Context",
    "partOfSpeech": "noun"
  },
  {
    "word": "entertain",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "xem xét (ngoài 'giải trí')"
    },
    "example": "She refused to entertain the possibility of failure.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "fashion",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tạo nên, hình thành (ngoài 'thời trang')"
    },
    "example": "He fashioned a solution from limited resources.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "gravity",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tính nghiêm trọng (ngoài 'trọng lực')"
    },
    "example": "The gravity of the situation was clear to everyone.",
    "category": "Words in Context",
    "partOfSpeech": "noun"
  },
  {
    "word": "qualify",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hạn chế, điều chỉnh (ngoài 'đạt chuẩn')"
    },
    "example": "She qualified her earlier statement with new data.",
    "category": "Words in Context",
    "partOfSpeech": "verb"
  },
  {
    "word": "modifier",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bổ ngữ, từ bổ nghĩa"
    },
    "example": "A dangling modifier creates confusion in a sentence.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "clause",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "mệnh đề"
    },
    "example": "An independent clause can stand alone as a sentence.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "antecedent",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tiền ngữ (từ được đại từ thay thế)"
    },
    "example": "The pronoun must agree with its antecedent.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "conjunction",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "liên từ"
    },
    "example": "Coordinating conjunctions include and, but, or.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "semicolon",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "dấu chấm phẩy"
    },
    "example": "Use a semicolon to join related independent clauses.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "appositive",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "đồng vị ngữ"
    },
    "example": "An appositive renames a nearby noun.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "subordinate",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phụ thuộc"
    },
    "example": "A subordinate clause cannot stand alone.",
    "category": "Standard English Conventions",
    "partOfSpeech": "adjective"
  },
  {
    "word": "concise",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngắn gọn, súc tích"
    },
    "example": "Good writing is concise and clear.",
    "category": "Standard English Conventions",
    "partOfSpeech": "adjective"
  },
  {
    "word": "redundant",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thừa, lặp lại"
    },
    "example": "'Free gift' is redundant because gifts are always free.",
    "category": "Standard English Conventions",
    "partOfSpeech": "adjective"
  },
  {
    "word": "syntax",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "cú pháp"
    },
    "example": "Proper syntax ensures sentences are grammatically correct.",
    "category": "Standard English Conventions",
    "partOfSpeech": "noun"
  },
  {
    "word": "ubiquitous",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "có mặt khắp nơi"
    },
    "example": "Smartphones have become ubiquitous in modern society.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective"
  },
  {
    "word": "pragmatic",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "thực dụng, thực tế"
    },
    "example": "She took a pragmatic approach to solving the problem.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective"
  },
  {
    "word": "ambiguous",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "mơ hồ, không rõ ràng"
    },
    "example": "The instructions were ambiguous and confused everyone.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective"
  },
  {
    "word": "eloquent",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "hùng biện, lưu loát"
    },
    "example": "Her eloquent speech moved the entire audience.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective"
  },
  {
    "word": "meticulous",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "tỉ mỉ, cẩn thận"
    },
    "example": "He is meticulous about every detail in his work.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective"
  },
  {
    "word": "resilient",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "kiên cường, có sức bật"
    },
    "example": "The community proved resilient after the natural disaster.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "adjective"
  },
  {
    "word": "disparity",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sự chênh lệch"
    },
    "example": "There is a growing disparity between rich and poor.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "noun"
  },
  {
    "word": "scrutinize",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "xem xét kỹ lưỡng"
    },
    "example": "The committee scrutinized every proposal carefully.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "verb"
  },
  {
    "word": "proliferate",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "sinh sôi, lan rộng"
    },
    "example": "Social media platforms have proliferated over the past decade.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "verb"
  },
  {
    "word": "advocate",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ủng hộ, vận động (v); người ủng hộ (n)"
    },
    "example": "She advocates for equal access to education.",
    "category": "High-Frequency SAT Words – Set 1",
    "partOfSpeech": "verb"
  },
  {
    "word": "ephemeral",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "phù du, thoáng qua"
    },
    "example": "Social media fame is often ephemeral.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "adjective"
  },
  {
    "word": "juxtapose",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "đặt cạnh nhau để so sánh"
    },
    "example": "The artist juxtaposed old and new techniques.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb"
  },
  {
    "word": "paradox",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "nghịch lý"
    },
    "example": "It's a paradox that we have more information but less understanding.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "noun"
  },
  {
    "word": "exacerbate",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "làm trầm trọng hơn"
    },
    "example": "The drought exacerbated the food crisis.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb"
  },
  {
    "word": "mitigate",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "giảm nhẹ, xoa dịu"
    },
    "example": "New policies aim to mitigate the effects of climate change.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb"
  },
  {
    "word": "unprecedented",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "chưa từng có tiền lệ"
    },
    "example": "The pandemic caused unprecedented disruption.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "adjective"
  },
  {
    "word": "candid",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "thẳng thắn, bộc trực"
    },
    "example": "She gave a candid assessment of the situation.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "adjective"
  },
  {
    "word": "catalyst",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "chất xúc tác, tác nhân thúc đẩy"
    },
    "example": "The discovery was a catalyst for further research.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "noun"
  },
  {
    "word": "digress",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "lạc đề"
    },
    "example": "The speaker tended to digress from the main topic.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb"
  },
  {
    "word": "vindicate",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "minh oan, chứng minh đúng"
    },
    "example": "New evidence vindicated the accused scientist.",
    "category": "High-Frequency SAT Words – Set 2",
    "partOfSpeech": "verb"
  },
  {
    "word": "benevolent",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "nhân từ (bene = tốt)"
    },
    "example": "The benevolent donor supported many charities.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective"
  },
  {
    "word": "malevolent",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ác ý (mal = xấu)"
    },
    "example": "The villain's malevolent plan was foiled.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective"
  },
  {
    "word": "circumscribe",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "giới hạn (circum = xung quanh + scrib = viết)"
    },
    "example": "Laws circumscribe individual freedoms for the common good.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb"
  },
  {
    "word": "retrospect",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "nhìn lại (retro = quay lại + spec = nhìn)"
    },
    "example": "In retrospect, the decision was unwise.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "noun"
  },
  {
    "word": "preclude",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ngăn cản trước (pre = trước + clud = đóng)"
    },
    "example": "Lack of funds precluded further research.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb"
  },
  {
    "word": "transcend",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "vượt qua (trans = qua + scend = leo)"
    },
    "example": "Great art transcends cultural boundaries.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb"
  },
  {
    "word": "antipathy",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "ác cảm (anti = chống + path = cảm xúc)"
    },
    "example": "He felt deep antipathy toward dishonesty.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "noun"
  },
  {
    "word": "ambivalent",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "mâu thuẫn (ambi = cả hai + val = giá trị)"
    },
    "example": "She felt ambivalent about moving abroad.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective"
  },
  {
    "word": "elucidate",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "làm sáng tỏ (e = ra + luc = ánh sáng)"
    },
    "example": "The professor elucidated the complex theory.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "verb"
  },
  {
    "word": "magnanimous",
    "ipa": "",
    "level": "C1",
    "definition": {
      "en": "",
      "vi": "rộng lượng (magn = lớn + anim = tâm hồn)"
    },
    "example": "The magnanimous leader forgave his opponents.",
    "category": "Roots, Prefixes & Suffixes",
    "partOfSpeech": "adjective"
  },
  {
    "word": "cohesion",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự liên kết"
    },
    "example": "Good writing has strong cohesion between paragraphs.",
    "category": "Expression of Ideas",
    "partOfSpeech": "noun"
  },
  {
    "word": "coherence",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự mạch lạc"
    },
    "example": "The essay lacked coherence and was difficult to follow.",
    "category": "Expression of Ideas",
    "partOfSpeech": "noun"
  },
  {
    "word": "transition",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự chuyển tiếp"
    },
    "example": "Use transitions to connect your ideas smoothly.",
    "category": "Expression of Ideas",
    "partOfSpeech": "noun"
  },
  {
    "word": "elaborate",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "giải thích chi tiết"
    },
    "example": "Could you elaborate on your main argument?",
    "category": "Expression of Ideas",
    "partOfSpeech": "verb"
  },
  {
    "word": "succinct",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngắn gọn, súc tích"
    },
    "example": "Her presentation was succinct yet informative.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adjective"
  },
  {
    "word": "verbose",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "dài dòng"
    },
    "example": "Avoid verbose writing; be concise instead.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adjective"
  },
  {
    "word": "synthesize",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tổng hợp"
    },
    "example": "The essay synthesizes ideas from multiple sources.",
    "category": "Expression of Ideas",
    "partOfSpeech": "verb"
  },
  {
    "word": "articulate",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "diễn đạt rõ ràng"
    },
    "example": "She articulated her position clearly.",
    "category": "Expression of Ideas",
    "partOfSpeech": "verb"
  },
  {
    "word": "judiciously",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "khôn ngoan, thận trọng"
    },
    "example": "Use evidence judiciously to support your claims.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adverb"
  },
  {
    "word": "pertinent",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "thích hợp, liên quan"
    },
    "example": "Only include pertinent information in your essay.",
    "category": "Expression of Ideas",
    "partOfSpeech": "adjective"
  },
  {
    "word": "rhetorical",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tu từ, liên quan đến nghệ thuật diễn đạt"
    },
    "example": "The rhetorical question was meant to provoke thought.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "adjective"
  },
  {
    "word": "synthesis",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự tổng hợp"
    },
    "example": "The paper is a synthesis of several research studies.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "noun"
  },
  {
    "word": "emphasize",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "nhấn mạnh"
    },
    "example": "The report emphasizes the need for immediate action.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb"
  },
  {
    "word": "contrast",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tương phản"
    },
    "example": "The essay contrasts urban and rural lifestyles.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb"
  },
  {
    "word": "convey",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "truyền đạt"
    },
    "example": "The graph conveys the declining trend clearly.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb"
  },
  {
    "word": "premise",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tiền đề"
    },
    "example": "The argument is based on a false premise.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "noun"
  },
  {
    "word": "concession",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sự nhượng bộ"
    },
    "example": "The author makes a concession before presenting the main argument.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "noun"
  },
  {
    "word": "rebut",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "phản bác"
    },
    "example": "She rebutted every point in the opposing argument.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "verb"
  },
  {
    "word": "substantive",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "có thực chất, quan trọng"
    },
    "example": "We need substantive changes, not superficial ones.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "adjective"
  },
  {
    "word": "pivotal",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "then chốt, quan trọng"
    },
    "example": "This was a pivotal moment in the debate.",
    "category": "Rhetorical Synthesis",
    "partOfSpeech": "adjective"
  },
  {
    "word": "moreover",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "hơn nữa"
    },
    "example": "The plan is effective; moreover, it is cost-efficient.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "nevertheless",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tuy nhiên, dù vậy"
    },
    "example": "The experiment failed; nevertheless, it provided valuable data.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "consequently",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "do đó, kết quả là"
    },
    "example": "He didn't study; consequently, he failed the exam.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "conversely",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "ngược lại"
    },
    "example": "In summer, days are long; conversely, in winter, they are short.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "notwithstanding",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "bất chấp, mặc dù"
    },
    "example": "Notwithstanding the challenges, the team succeeded.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "subsequently",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "sau đó"
    },
    "example": "She graduated in 2020 and subsequently joined a tech company.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "likewise",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "tương tự"
    },
    "example": "The first study showed positive results; likewise, the second confirmed them.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  },
  {
    "word": "in light of",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "dựa trên, xét đến"
    },
    "example": "In light of new evidence, the theory was revised.",
    "category": "Transitions & Flow",
    "partOfSpeech": "phrase"
  },
  {
    "word": "albeit",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "mặc dù"
    },
    "example": "The progress was slow, albeit steady.",
    "category": "Transitions & Flow",
    "partOfSpeech": "conjunction"
  },
  {
    "word": "accordingly",
    "ipa": "",
    "level": "B2",
    "definition": {
      "en": "",
      "vi": "theo đó, phù hợp"
    },
    "example": "The budget was cut; accordingly, the project scope was reduced.",
    "category": "Transitions & Flow",
    "partOfSpeech": "adverb"
  }
];
