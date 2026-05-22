/**
 * @file satVocabExpansion5.ts
 * @description SAT Vocabulary Expansion #5 — Reading & Writing rhetoric words
 * plus additional Math terms.
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

export const satVocabExpansion5: SatWord[] = [
  // Reading & Writing
  w("ambivalent", "/æmˈbɪv.ə.lənt/", "C1", "có hai chiều cảm xúc trái ngược", "She felt ambivalent about leaving her hometown.", "Tone & Attitude", "adj"),
  w("candid", "/ˈkæn.dɪd/", "B2", "thẳng thắn, chân thật", "His candid review surprised the panel.", "Tone & Attitude", "adj"),
  w("cogent", "/ˈkəʊ.dʒənt/", "C1", "lập luận chặt chẽ, thuyết phục", "She presented a cogent argument for reform.", "Rhetoric", "adj"),
  w("didactic", "/daɪˈdæk.tɪk/", "C1", "mang tính giáo huấn", "The novel's didactic tone alienated some readers.", "Rhetoric", "adj"),
  w("emulate", "/ˈem.jə.leɪt/", "C1", "noi gương, mô phỏng", "Younger players try to emulate the champion.", "Action Verbs", "v"),
  w("equivocal", "/ɪˈkwɪv.ə.kəl/", "C1", "mập mờ, hai nghĩa", "The evidence was equivocal at best.", "Rhetoric", "adj"),
  w("exemplify", "/ɪɡˈzem.plɪ.faɪ/", "B2", "minh họa, làm gương cho", "These results exemplify the theory in action.", "Action Verbs", "v"),
  w("facetious", "/fəˈsiː.ʃəs/", "C1", "đùa cợt không đúng lúc", "His facetious remark broke the formal tone.", "Tone & Attitude", "adj"),
  w("garrulous", "/ˈɡær.ə.ləs/", "C1", "lắm lời", "The garrulous host barely let guests speak.", "Character Traits", "adj"),
  w("hackneyed", "/ˈhæk.nid/", "C1", "sáo mòn", "The film's plot was hackneyed and predictable.", "Rhetoric", "adj"),
  w("incisive", "/ɪnˈsaɪ.sɪv/", "C1", "sắc bén", "Her incisive analysis won praise from reviewers.", "Rhetoric", "adj"),
  w("juxtapose", "/ˌdʒʌk.stəˈpəʊz/", "C1", "đặt cạnh nhau để so sánh", "The author juxtaposes wealth and poverty in vivid prose.", "Rhetoric", "v"),
  w("loquacious", "/ləˈkweɪ.ʃəs/", "C1", "hoạt ngôn", "He is loquacious in interviews but private off-camera.", "Character Traits", "adj"),
  w("mitigate", "/ˈmɪt.ɪ.ɡeɪt/", "B2", "làm giảm nhẹ", "Safety policies mitigate the risk of accidents.", "Action Verbs", "v"),
  w("nuance", "/ˈnjuː.ɑːns/", "B2", "sắc thái tinh tế", "She captures every nuance of the character.", "Rhetoric", "n"),
  w("ostensible", "/ɒsˈten.sɪ.bəl/", "C1", "bề ngoài (có vẻ)", "The ostensible reason for the trip was business.", "Rhetoric", "adj"),
  w("paradigm", "/ˈpær.ə.daɪm/", "C1", "mô thức, hệ chuẩn", "The discovery shifted the scientific paradigm.", "Academic", "n"),
  w("quintessential", "/ˌkwɪn.tɪˈsen.ʃəl/", "C1", "điển hình nhất", "This dish is the quintessential summer recipe.", "Rhetoric", "adj"),
  w("refute", "/rɪˈfjuːt/", "B2", "bác bỏ bằng chứng cứ", "Researchers refuted the earlier claim.", "Action Verbs", "v"),
  w("salient", "/ˈseɪ.li.ənt/", "C1", "nổi bật, quan trọng", "The report highlights the salient findings.", "Rhetoric", "adj"),
  w("tenacious", "/təˈneɪ.ʃəs/", "C1", "kiên trì", "Her tenacious effort earned the scholarship.", "Character Traits", "adj"),
  w("ubiquitous", "/juːˈbɪk.wɪ.təs/", "C1", "khắp nơi", "Smartphones have become ubiquitous in modern life.", "Society", "adj"),
  w("vehement", "/ˈviː.ə.mənt/", "C1", "mãnh liệt, dữ dội", "She voiced vehement opposition to the plan.", "Tone & Attitude", "adj"),
  w("warranted", "/ˈwɒr.ən.tɪd/", "B2", "có cơ sở, chính đáng", "The criticism was fully warranted.", "Rhetoric", "adj"),

  // Math
  w("coefficient", "/ˌkəʊ.ɪˈfɪʃ.ənt/", "B2", "hệ số", "Identify the coefficient of x in the equation.", "Algebra", "n", "Math"),
  w("integer", "/ˈɪn.tɪ.dʒər/", "B2", "số nguyên", "Round each answer to the nearest integer.", "Number Sense", "n", "Math"),
  w("quotient", "/ˈkwəʊ.ʃənt/", "B2", "thương số", "Find the quotient when 84 is divided by 7.", "Number Sense", "n", "Math"),
  w("perpendicular", "/ˌpɜː.pənˈdɪk.jə.lər/", "B2", "vuông góc", "Two perpendicular lines meet at a right angle.", "Geometry", "adj", "Math"),
  w("parallelogram", "/ˌpær.əˈlel.ə.ɡræm/", "B2", "hình bình hành", "Opposite sides of a parallelogram are equal.", "Geometry", "n", "Math"),
  w("median", "/ˈmiː.di.ən/", "B2", "trung vị", "The median of {2,4,7,9,11} is 7.", "Statistics", "n", "Math"),
  w("interquartile", "/ˌɪn.təˈkwɔː.taɪl/", "C1", "tứ phân vị giữa", "The interquartile range filters out outliers.", "Statistics", "adj", "Math"),
  w("probability", "/ˌprɒb.əˈbɪl.ə.ti/", "B2", "xác suất", "Calculate the probability of rolling a six.", "Statistics", "n", "Math"),
];

export default satVocabExpansion5;
