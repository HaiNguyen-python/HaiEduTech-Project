// SAT Vocabulary Expansion 4 — additional high-utility SAT words.
import type { SatWord } from "./satVocabData";

type Sec = "Reading & Writing" | "Math";
const w = (
  word: string,
  ipa: string,
  level: "B2" | "C1",
  vi: string,
  example: string,
  category: string,
  partOfSpeech: string,
  section: Sec = "Reading & Writing",
): SatWord => ({ word, ipa, level, definition: { en: "", vi }, example, category, partOfSpeech, section });

export const satVocabExpansion4: SatWord[] = [
  // Tone & rhetoric
  w("austere", "/ɔːˈstɪr/", "C1", "khắc khổ", "Her austere prose strips away every flourish.", "Tone & Rhetoric", "adj"),
  w("convivial", "/kənˈvɪv.i.əl/", "C1", "vui vẻ, thân thiện", "The convivial host welcomed every guest warmly.", "Tone & Rhetoric", "adj"),
  w("didactic", "/daɪˈdæk.tɪk/", "C1", "giáo huấn", "The didactic novel openly lectures the reader.", "Tone & Rhetoric", "adj"),
  w("eloquent", "/ˈel.ə.kwənt/", "B2", "hùng hồn", "She delivered an eloquent defense of the proposal.", "Tone & Rhetoric", "adj"),
  w("laconic", "/ləˈkɒn.ɪk/", "C1", "ngắn gọn, súc tích", "His laconic reply revealed little emotion.", "Tone & Rhetoric", "adj"),
  w("polemical", "/pəˈlem.ɪ.kəl/", "C1", "đả kích, tranh luận", "The polemical essay attacks every opposing view.", "Tone & Rhetoric", "adj"),
  w("sardonic", "/sɑːrˈdɒn.ɪk/", "C1", "mỉa mai cay độc", "She offered a sardonic smile at the apology.", "Tone & Rhetoric", "adj"),
  w("solemn", "/ˈsɒl.əm/", "B2", "trang nghiêm", "The ceremony struck a solemn tone.", "Tone & Rhetoric", "adj"),

  // Reasoning & argument
  w("corroborate", "/kəˈrɒb.ə.reɪt/", "C1", "chứng thực", "Multiple witnesses corroborate the account.", "Evidence-Based Reading", "verb"),
  w("refute", "/rɪˈfjuːt/", "B2", "bác bỏ", "New data refute the older theory.", "Evidence-Based Reading", "verb"),
  w("plausible", "/ˈplɔː.zə.bəl/", "B2", "có vẻ hợp lý", "His explanation sounds plausible but lacks proof.", "Evidence-Based Reading", "adj"),
  w("tenuous", "/ˈten.ju.əs/", "C1", "mong manh", "The link between the variables is tenuous.", "Evidence-Based Reading", "adj"),
  w("salient", "/ˈseɪ.li.ənt/", "C1", "nổi bật", "Highlight only the most salient findings.", "Evidence-Based Reading", "adj"),
  w("nuanced", "/ˈnjuː.ɑːnst/", "C1", "tinh tế, có sắc thái", "Her argument is more nuanced than the summary suggests.", "Evidence-Based Reading", "adj"),
  w("substantiate", "/səbˈstæn.ʃi.eɪt/", "C1", "minh chứng", "Surveys substantiate the author's claim.", "Evidence-Based Reading", "verb"),
  w("undermine", "/ˌʌn.dəˈmaɪn/", "B2", "làm suy yếu", "Inconsistent data undermine the hypothesis.", "Evidence-Based Reading", "verb"),

  // Science context
  w("empirical", "/ɪmˈpɪr.ɪ.kəl/", "C1", "thực nghiệm", "Empirical evidence outweighs anecdote.", "Science Passage", "adj"),
  w("hypothesis", "/haɪˈpɒθ.ə.sɪs/", "B2", "giả thuyết", "Researchers tested the hypothesis with a controlled trial.", "Science Passage", "noun"),
  w("anomaly", "/əˈnɒm.ə.li/", "C1", "điểm bất thường", "The anomaly in the data prompted further study.", "Science Passage", "noun"),
  w("paradigm", "/ˈpær.ə.daɪm/", "C1", "mô hình, hệ hình", "Quantum mechanics shifted the paradigm of physics.", "Science Passage", "noun"),
  w("catalyst", "/ˈkæt.əl.ɪst/", "B2", "chất xúc tác", "The reform acted as a catalyst for change.", "Science Passage", "noun"),

  // History & policy
  w("ratify", "/ˈræt.ɪ.faɪ/", "C1", "phê chuẩn", "Congress voted to ratify the new treaty.", "History & Policy", "verb"),
  w("repeal", "/rɪˈpiːl/", "C1", "bãi bỏ (luật)", "Lawmakers moved to repeal the outdated statute.", "History & Policy", "verb"),
  w("autonomy", "/ɔːˈtɒn.ə.mi/", "C1", "quyền tự trị", "The region demanded greater autonomy.", "History & Policy", "noun"),
  w("hegemony", "/hɪˈdʒem.ə.ni/", "C1", "bá quyền", "Naval power underpinned imperial hegemony.", "History & Policy", "noun"),
  w("populist", "/ˈpɒp.jə.lɪst/", "C1", "thuộc chủ nghĩa dân túy", "Her populist rhetoric energised rural voters.", "History & Policy", "adj"),

  // Math vocabulary
  w("integer", "/ˈɪn.tɪ.dʒər/", "B2", "số nguyên", "Pick the smallest positive integer in the set.", "Algebra & Functions", "noun", "Math"),
  w("quotient", "/ˈkwoʊ.ʃənt/", "B2", "thương (phép chia)", "The quotient of 18 and 6 is 3.", "Algebra & Functions", "noun", "Math"),
  w("vertex", "/ˈvɜːr.teks/", "B2", "đỉnh", "The vertex of the parabola lies on the y-axis.", "Geometry & Trigonometry", "noun", "Math"),
  w("hypotenuse", "/haɪˈpɒt.ən.juːs/", "B2", "cạnh huyền", "Apply the Pythagorean theorem to find the hypotenuse.", "Geometry & Trigonometry", "noun", "Math"),
  w("perpendicular", "/ˌpɜːr.pənˈdɪk.jə.lər/", "B2", "vuông góc", "Lines a and b are perpendicular.", "Geometry & Trigonometry", "adj", "Math"),
  w("median", "/ˈmiː.di.ən/", "B2", "trung vị", "The median income is below the mean.", "Statistics & Data", "noun", "Math"),
  w("variance", "/ˈveə.ri.əns/", "C1", "phương sai", "A smaller variance indicates more consistent scores.", "Statistics & Data", "noun", "Math"),
  w("regression", "/rɪˈɡreʃ.ən/", "C1", "hồi quy", "Linear regression models the trend between variables.", "Statistics & Data", "noun", "Math"),
  w("correlation", "/ˌkɒr.əˈleɪ.ʃən/", "B2", "tương quan", "Correlation does not imply causation.", "Statistics & Data", "noun", "Math"),
  w("interval", "/ˈɪn.tər.vəl/", "B2", "khoảng", "Find all x in the interval [0, 10].", "Algebra & Functions", "noun", "Math"),

  // Character & behaviour
  w("affable", "/ˈæf.ə.bəl/", "C1", "dễ gần, hòa nhã", "The affable manager set newcomers at ease.", "Character & Behaviour", "adj"),
  w("astute", "/əˈstjuːt/", "C1", "sắc sảo", "An astute investor spotted the trend early.", "Character & Behaviour", "adj"),
  w("candid", "/ˈkæn.dɪd/", "B2", "thẳng thắn", "She gave a candid account of the project's failure.", "Character & Behaviour", "adj"),
  w("diligent", "/ˈdɪl.ɪ.dʒənt/", "B2", "siêng năng", "Diligent practice produced steady gains.", "Character & Behaviour", "adj"),
  w("frugal", "/ˈfruː.ɡəl/", "C1", "tiết kiệm", "Her frugal habits helped her retire early.", "Character & Behaviour", "adj"),
  w("indignant", "/ɪnˈdɪɡ.nənt/", "C1", "phẫn nộ", "He grew indignant at the unfair accusation.", "Character & Behaviour", "adj"),
];
