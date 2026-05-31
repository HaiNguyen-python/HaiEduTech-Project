/**
 * @file satVocabExpansion7.ts
 * @description SAT Vocabulary Expansion #7 - additional high-frequency
 * Reading & Writing vocabulary plus precise Math terminology.
 */
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

export const satVocabExpansion7: SatWord[] = [
  // ===== Reading & Writing =====
  w("ambivalent", "/æmˈbɪv.əl.ənt/", "C1", "lưỡng lự, mâu thuẫn", "She felt ambivalent about accepting the promotion.", "Tone & Attitude", "adjective"),
  w("austere", "/ɔːˈstɪər/", "C1", "khắc khổ, nghiêm khắc", "The austere lifestyle of the monks impressed the visitors.", "Character Traits", "adjective"),
  w("benevolent", "/bəˈnev.əl.ənt/", "C1", "nhân từ", "A benevolent donor funded the new library wing.", "Character Traits", "adjective"),
  w("candid", "/ˈkæn.dɪd/", "B2", "thẳng thắn", "She gave a candid assessment of the project.", "Tone & Attitude", "adjective"),
  w("capricious", "/kəˈprɪʃ.əs/", "C1", "thất thường", "His capricious decisions confused the team.", "Character Traits", "adjective"),
  w("clandestine", "/klænˈdes.tɪn/", "C1", "bí mật", "They held clandestine meetings to plan the merger.", "Action Verbs", "adjective"),
  w("colloquial", "/kəˈləʊ.kwi.əl/", "C1", "thông tục", "The essay is too colloquial for an academic journal.", "Rhetoric", "adjective"),
  w("disdain", "/dɪsˈdeɪn/", "C1", "khinh thường", "She viewed the proposal with disdain.", "Tone & Attitude", "noun"),
  w("ephemeral", "/ɪˈfem.ər.əl/", "C1", "phù du", "Fame is often ephemeral in the digital age.", "Description", "adjective"),
  w("equivocal", "/ɪˈkwɪv.ə.kəl/", "C1", "mơ hồ", "The senator gave an equivocal answer.", "Tone & Attitude", "adjective"),
  w("erudite", "/ˈer.ʊ.daɪt/", "C1", "uyên bác", "Her erudite commentary impressed the panel.", "Character Traits", "adjective"),
  w("exacerbate", "/ɪɡˈzæs.ə.beɪt/", "C1", "làm trầm trọng thêm", "Cutting funding will exacerbate the crisis.", "Action Verbs", "verb"),
  w("fastidious", "/fæsˈtɪd.i.əs/", "C1", "kỹ tính", "He is fastidious about every detail of his work.", "Character Traits", "adjective"),
  w("garrulous", "/ˈɡær.ʊ.ləs/", "C1", "nói nhiều", "Their garrulous neighbour told them every detail.", "Character Traits", "adjective"),
  w("gregarious", "/ɡrəˈɡeə.ri.əs/", "C1", "thích giao du", "Gregarious by nature, she made friends quickly.", "Character Traits", "adjective"),
  w("hackneyed", "/ˈhæk.nid/", "C1", "sáo mòn", "The author avoided hackneyed metaphors.", "Rhetoric", "adjective"),
  w("idiosyncratic", "/ˌɪd.i.ə.sɪŋˈkræt.ɪk/", "C1", "đặc trưng cá nhân", "His idiosyncratic style is instantly recognisable.", "Description", "adjective"),
  w("inscrutable", "/ɪnˈskruː.tə.bəl/", "C1", "khó hiểu", "Her inscrutable expression revealed nothing.", "Description", "adjective"),
  w("juxtapose", "/ˌdʒʌk.stəˈpəʊz/", "C1", "đặt cạnh nhau", "The essay juxtaposes urban and rural life.", "Rhetoric", "verb"),
  w("laconic", "/ləˈkɒn.ɪk/", "C1", "ngắn gọn", "His laconic reply ended the discussion.", "Rhetoric", "adjective"),
  w("magnanimous", "/mæɡˈnæn.ɪ.məs/", "C1", "cao thượng", "She was magnanimous in victory.", "Character Traits", "adjective"),
  w("nuance", "/ˈnjuː.ɑːns/", "B2", "sắc thái", "The translation captured every nuance of meaning.", "Rhetoric", "noun"),
  w("obfuscate", "/ˈɒb.fə.skeɪt/", "C1", "che giấu", "Jargon often obfuscates simple ideas.", "Action Verbs", "verb"),
  w("ostentatious", "/ˌɒs.tenˈteɪ.ʃəs/", "C1", "khoe khoang", "His ostentatious display of wealth offended guests.", "Description", "adjective"),
  w("pedantic", "/pɪˈdæn.tɪk/", "C1", "câu nệ tiểu tiết", "Her pedantic corrections slowed the meeting.", "Character Traits", "adjective"),

  // ===== Math =====
  w("asymptote", "/ˈæs.ɪm.təʊt/", "C1", "đường tiệm cận", "The graph of 1/x has two asymptotes.", "Geometry & Trigonometry", "noun", "Math"),
  w("binomial", "/baɪˈnəʊ.mi.əl/", "C1", "nhị thức", "Expand the binomial (a + b)².", "Passport to Advanced Math", "noun", "Math"),
  w("coefficient", "/ˌkəʊ.ɪˈfɪʃ.ənt/", "B2", "hệ số", "The coefficient of x² is 3.", "Passport to Advanced Math", "noun", "Math"),
  w("congruent", "/ˈkɒŋ.ɡru.ənt/", "B2", "đồng dạng (bằng nhau)", "The two triangles are congruent.", "Geometry & Trigonometry", "adjective", "Math"),
  w("denominator", "/dɪˈnɒm.ɪ.neɪ.tə/", "B2", "mẫu số", "Find a common denominator before adding.", "Heart of Algebra", "noun", "Math"),
  w("exponent", "/ɪkˈspəʊ.nənt/", "B2", "số mũ", "Apply the rule x^a · x^b = x^(a+b).", "Passport to Advanced Math", "noun", "Math"),
  w("inequality", "/ˌɪn.ɪˈkwɒl.ə.ti/", "B2", "bất đẳng thức", "Solve the inequality 2x − 5 > 1.", "Heart of Algebra", "noun", "Math"),
  w("median", "/ˈmiː.di.ən/", "B2", "trung vị", "The median income is more robust than the mean.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("perpendicular", "/ˌpɜː.pənˈdɪk.jə.lə/", "B2", "vuông góc", "The two lines are perpendicular at the origin.", "Geometry & Trigonometry", "adjective", "Math"),
  w("quadratic", "/kwɒdˈræt.ɪk/", "B2", "bậc hai", "Solve the quadratic equation using the formula.", "Passport to Advanced Math", "adjective", "Math"),
  w("reciprocal", "/rɪˈsɪp.rə.kəl/", "C1", "nghịch đảo", "The reciprocal of 4 is 1/4.", "Heart of Algebra", "noun", "Math"),
  w("standard deviation", "/ˈstæn.dəd ˌdiː.viˈeɪ.ʃən/", "C1", "độ lệch chuẩn", "A small standard deviation means values cluster tightly.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("tangent", "/ˈtæn.dʒənt/", "B2", "tiếp tuyến", "The tangent touches the circle at one point.", "Geometry & Trigonometry", "noun", "Math"),
  w("vertex", "/ˈvɜː.teks/", "B2", "đỉnh", "The vertex of the parabola is the minimum point.", "Passport to Advanced Math", "noun", "Math"),
  w("scatterplot", "/ˈskæt.ə.plɒt/", "B2", "biểu đồ phân tán", "The scatterplot shows a positive correlation.", "Problem Solving & Data Analysis", "noun", "Math"),
];
