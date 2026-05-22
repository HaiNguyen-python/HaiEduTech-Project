/**
 * @file satVocabExpansion6.ts
 * @description SAT Vocabulary Expansion #6 — Reading & Writing rhetoric
 * vocabulary plus advanced Math terminology.
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

export const satVocabExpansion6: SatWord[] = [
  // ===== Reading & Writing =====
  w("aberration", "/ˌæb.əˈreɪ.ʃən/", "C1", "sự lệch lạc, bất thường", "Last year's loss was an aberration in an otherwise strong decade.", "Tone & Attitude", "noun"),
  w("alacrity", "/əˈlæk.rə.ti/", "C1", "sự sốt sắng", "She accepted the challenge with alacrity.", "Character Traits", "noun"),
  w("antithesis", "/ænˈtɪθ.ə.sɪs/", "C1", "đối nghịch", "His behaviour was the antithesis of professionalism.", "Rhetoric", "noun"),
  w("brevity", "/ˈbrev.ə.ti/", "C1", "tính súc tích", "The speech impressed everyone with its brevity and depth.", "Rhetoric", "noun"),
  w("circumvent", "/ˌsɜː.kəmˈvent/", "C1", "lách, né", "The company tried to circumvent new regulations.", "Action Verbs", "v"),
  w("commensurate", "/kəˈmen.ʃər.ət/", "C1", "tương xứng", "Pay should be commensurate with experience.", "Comparison", "adj"),
  w("conflagration", "/ˌkɒn.fləˈɡreɪ.ʃən/", "C1", "đám cháy lớn", "The conflagration destroyed three city blocks.", "Description", "noun"),
  w("conjecture", "/kənˈdʒek.tʃər/", "C1", "phỏng đoán", "His theory was based on conjecture rather than evidence.", "Reasoning", "noun"),
  w("dichotomy", "/daɪˈkɒt.ə.mi/", "C1", "sự phân đôi", "There is a clear dichotomy between rural and urban voters.", "Rhetoric", "noun"),
  w("disparage", "/dɪˈspær.ɪdʒ/", "C1", "chê bai", "Critics disparaged the novel as derivative.", "Action Verbs", "v"),
  w("ebullient", "/ɪˈbʌl.i.ənt/", "C1", "phấn khích", "The ebullient crowd cheered every play.", "Tone & Attitude", "adj"),
  w("efficacy", "/ˈef.ɪ.kə.si/", "C1", "hiệu quả", "Studies confirmed the efficacy of the new treatment.", "Quality", "noun"),
  w("elucidate", "/ɪˈluː.sɪ.deɪt/", "C1", "làm sáng tỏ", "The professor elucidated the complex theorem.", "Action Verbs", "v"),
  w("ephemeral", "/ɪˈfem.ər.əl/", "C1", "phù du", "Online fame is often ephemeral.", "Description", "adj"),
  w("erudite", "/ˈer.ʊ.daɪt/", "C1", "uyên bác", "Her erudite commentary impressed the panel.", "Character Traits", "adj"),
  w("extol", "/ɪkˈstəʊl/", "C1", "ca ngợi", "Reviewers extolled the film's originality.", "Action Verbs", "v"),
  w("fastidious", "/fæsˈtɪd.i.əs/", "C1", "khó tính, kỹ lưỡng", "He is fastidious about grammar.", "Character Traits", "adj"),
  w("germane", "/dʒɜːˈmeɪn/", "C1", "liên quan trực tiếp", "Her question was germane to the debate.", "Reasoning", "adj"),
  w("hackneyed", "/ˈhæk.nid/", "C1", "sáo mòn", "The novel relies on hackneyed plot devices.", "Description", "adj"),
  w("idiosyncratic", "/ˌɪd.i.ə.sɪŋˈkræt.ɪk/", "C1", "rất riêng biệt", "Her idiosyncratic style sets her apart.", "Character Traits", "adj"),
  w("impervious", "/ɪmˈpɜː.vi.əs/", "C1", "không thấm, không lay chuyển", "He seems impervious to criticism.", "Description", "adj"),
  w("inundate", "/ˈɪn.ʌn.deɪt/", "C1", "tràn ngập", "The office was inundated with applications.", "Action Verbs", "v"),
  w("juxtapose", "/ˌdʒʌk.stəˈpəʊz/", "C1", "đặt cạnh nhau", "The exhibit juxtaposes ancient and modern art.", "Rhetoric", "v"),
  w("magnanimous", "/mæɡˈnæn.ɪ.məs/", "C1", "rộng lượng", "She was magnanimous in victory.", "Character Traits", "adj"),
  w("nuance", "/ˈnjuː.ɑːns/", "C1", "sắc thái", "The translation loses much of the original's nuance.", "Rhetoric", "noun"),
  w("obfuscate", "/ˈɒb.fə.skeɪt/", "C1", "làm rối", "Jargon often obfuscates simple ideas.", "Action Verbs", "v"),
  w("paragon", "/ˈpær.ə.ɡən/", "C1", "hình mẫu", "She is considered a paragon of integrity.", "Character Traits", "noun"),
  w("perfunctory", "/pəˈfʌŋk.tər.i/", "C1", "qua loa", "He gave a perfunctory nod and walked on.", "Description", "adj"),
  w("quintessential", "/ˌkwɪn.tɪˈsen.ʃəl/", "C1", "điển hình nhất", "The café is the quintessential Parisian experience.", "Description", "adj"),
  w("recalcitrant", "/rɪˈkæl.sɪ.trənt/", "C1", "cứng đầu", "The recalcitrant senator refused to negotiate.", "Character Traits", "adj"),

  // ===== Math =====
  w("coefficient", "/ˌkəʊ.ɪˈfɪʃ.ənt/", "C1", "hệ số", "Identify the coefficient of x in the expression 3x + 5.", "Algebra", "noun", "Math"),
  w("polynomial", "/ˌpɒl.ɪˈnəʊ.mi.əl/", "C1", "đa thức", "Factor the polynomial completely.", "Algebra", "noun", "Math"),
  w("quadratic", "/kwɒdˈræt.ɪk/", "C1", "bậc hai", "Solve the quadratic equation using the formula.", "Algebra", "adj", "Math"),
  w("inequality", "/ˌɪn.ɪˈkwɒl.ə.ti/", "B2", "bất phương trình", "Graph the inequality on a number line.", "Algebra", "noun", "Math"),
  w("perimeter", "/pəˈrɪm.ɪ.tər/", "B2", "chu vi", "Find the perimeter of the rectangle.", "Geometry & Trigonometry", "noun", "Math"),
  w("circumference", "/səˈkʌm.fər.əns/", "B2", "chu vi hình tròn", "The circumference equals 2πr.", "Geometry & Trigonometry", "noun", "Math"),
  w("radian", "/ˈreɪ.di.ən/", "C1", "rad-i-an (đơn vị góc)", "Convert 90 degrees to radians.", "Geometry & Trigonometry", "noun", "Math"),
  w("scalene", "/ˈskeɪ.liːn/", "C1", "tam giác thường", "All three sides of a scalene triangle differ.", "Geometry & Trigonometry", "adj", "Math"),
  w("congruent", "/ˈkɒŋ.ɡru.ənt/", "C1", "bằng nhau (hình học)", "The two triangles are congruent.", "Geometry & Trigonometry", "adj", "Math"),
  w("standard deviation", "/ˈstæn.dəd ˌdiː.viˈeɪ.ʃən/", "C1", "độ lệch chuẩn", "Compute the standard deviation of the data set.", "Statistics", "noun", "Math"),
];
