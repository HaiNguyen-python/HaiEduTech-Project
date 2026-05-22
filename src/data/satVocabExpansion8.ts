/**
 * @file satVocabExpansion8.ts
 * @description SAT Vocabulary Expansion #8 — high-frequency Reading & Writing
 * lexis (Words in Context, Rhetorical Synthesis) plus extra Math glossary terms.
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

export const satVocabExpansion8: SatWord[] = [
  // ===== Reading & Writing — Words in Context =====
  w("abate", "/əˈbeɪt/", "C1", "giảm bớt, suy yếu", "The storm finally began to abate by dawn.", "Words in Context", "verb"),
  w("aberration", "/ˌæbəˈreɪʃən/", "C1", "sự lệch lạc, bất thường", "The poor sales figure was an aberration in an otherwise strong year.", "Words in Context", "noun"),
  w("acquiesce", "/ˌæk.wiˈes/", "C1", "miễn cưỡng đồng ý", "She acquiesced to the committee's decision despite her doubts.", "Words in Context", "verb"),
  w("admonish", "/ədˈmɒnɪʃ/", "C1", "khiển trách, cảnh báo", "The teacher admonished the students for arriving late.", "Words in Context", "verb"),
  w("alleviate", "/əˈliː.vi.eɪt/", "B2", "giảm nhẹ", "The new medication helps alleviate chronic pain.", "Words in Context", "verb"),
  w("ambiguous", "/æmˈbɪɡ.ju.əs/", "B2", "mơ hồ, không rõ ràng", "The contract contained ambiguous wording that led to disputes.", "Words in Context", "adjective"),
  w("anachronism", "/əˈnæk.rə.nɪ.zəm/", "C1", "sự lỗi thời, sai niên đại", "A typewriter in a sci-fi film is an obvious anachronism.", "Words in Context", "noun"),
  w("anomaly", "/əˈnɒm.ə.li/", "C1", "sự bất thường", "Scientists are investigating the anomaly in the data set.", "Words in Context", "noun"),
  w("apathy", "/ˈæp.ə.θi/", "C1", "sự thờ ơ", "Voter apathy is a serious threat to democracy.", "Tone & Attitude", "noun"),
  w("arduous", "/ˈɑː.dju.əs/", "C1", "gian khổ", "Climbing the mountain proved an arduous task.", "Description", "adjective"),

  w("belie", "/bɪˈlaɪ/", "C1", "che giấu, mâu thuẫn với", "Her calm voice belied her inner panic.", "Words in Context", "verb"),
  w("bolster", "/ˈbəʊl.stər/", "C1", "củng cố", "New evidence bolstered the prosecution's case.", "Words in Context", "verb"),
  w("brevity", "/ˈbrev.ə.ti/", "C1", "sự ngắn gọn", "The essay was praised for its brevity and clarity.", "Rhetoric", "noun"),
  w("buttress", "/ˈbʌt.rəs/", "C1", "ủng hộ, củng cố", "Statistics buttress the author's main argument.", "Rhetoric", "verb"),

  w("circumvent", "/ˌsɜː.kəmˈvent/", "C1", "lách, né tránh", "The firm tried to circumvent the new regulations.", "Action Verbs", "verb"),
  w("cogent", "/ˈkəʊ.dʒənt/", "C1", "thuyết phục, mạnh mẽ", "She made a cogent argument for reform.", "Rhetoric", "adjective"),
  w("compelling", "/kəmˈpel.ɪŋ/", "B2", "thuyết phục, hấp dẫn", "The author provides compelling evidence for her thesis.", "Rhetoric", "adjective"),
  w("complacent", "/kəmˈpleɪ.sənt/", "C1", "tự mãn", "Success can make even strong teams complacent.", "Character Traits", "adjective"),
  w("conjecture", "/kənˈdʒek.tʃər/", "C1", "phỏng đoán", "His theory is based on conjecture rather than evidence.", "Rhetoric", "noun"),
  w("corroborate", "/kəˈrɒb.ə.reɪt/", "C1", "xác nhận, củng cố", "Eyewitness accounts corroborate the suspect's statement.", "Command of Evidence", "verb"),

  w("deference", "/ˈdef.ər.əns/", "C1", "sự kính trọng, nhường nhịn", "He spoke with deference to his mentor.", "Tone & Attitude", "noun"),
  w("delineate", "/dɪˈlɪn.i.eɪt/", "C1", "phác họa, mô tả chi tiết", "The article delineates the steps of the experiment.", "Action Verbs", "verb"),
  w("denounce", "/dɪˈnaʊns/", "C1", "tố cáo, lên án", "Critics denounced the policy as discriminatory.", "Action Verbs", "verb"),
  w("dichotomy", "/daɪˈkɒt.ə.mi/", "C1", "sự lưỡng phân", "The article explores the dichotomy between art and commerce.", "Words in Context", "noun"),
  w("didactic", "/daɪˈdæk.tɪk/", "C1", "có tính giáo huấn", "The novel is more didactic than entertaining.", "Rhetoric", "adjective"),
  w("disparate", "/ˈdɪs.pər.ət/", "C1", "khác biệt, không liên quan", "The report draws on disparate sources of data.", "Description", "adjective"),
  w("dogmatic", "/dɒɡˈmæt.ɪk/", "C1", "giáo điều", "His dogmatic style alienates many readers.", "Tone & Attitude", "adjective"),

  w("elucidate", "/ɪˈluː.sɪ.deɪt/", "C1", "làm sáng tỏ", "The footnote elucidates the author's claim.", "Action Verbs", "verb"),
  w("emulate", "/ˈem.jə.leɪt/", "B2", "noi gương, mô phỏng", "Younger writers often emulate her style.", "Action Verbs", "verb"),
  w("enigmatic", "/ˌen.ɪɡˈmæt.ɪk/", "C1", "bí ẩn", "His enigmatic smile gave nothing away.", "Description", "adjective"),
  w("equivocal", "/ɪˈkwɪv.ə.kəl/", "C1", "mập mờ, hai nghĩa", "The senator gave an equivocal answer.", "Tone & Attitude", "adjective"),
  w("erudite", "/ˈer.u.daɪt/", "C1", "uyên bác", "The professor is renowned as an erudite scholar.", "Character Traits", "adjective"),
  w("exacerbate", "/ɪɡˈzæs.ə.beɪt/", "C1", "làm trầm trọng thêm", "The drought has been exacerbated by deforestation.", "Action Verbs", "verb"),
  w("extrapolate", "/ɪkˈstræp.ə.leɪt/", "C1", "ngoại suy", "We can extrapolate future trends from current data.", "Command of Evidence", "verb"),

  w("fastidious", "/fæsˈtɪd.i.əs/", "C1", "kỹ tính, tỉ mỉ", "She is fastidious about her research methods.", "Character Traits", "adjective"),
  w("feasible", "/ˈfiː.zə.bəl/", "B2", "khả thi", "The plan is technically feasible but expensive.", "Description", "adjective"),
  w("furtive", "/ˈfɜː.tɪv/", "C1", "lén lút", "He cast a furtive glance over his shoulder.", "Description", "adjective"),

  w("garrulous", "/ˈɡær.ə.ləs/", "C1", "ba hoa", "Their garrulous neighbour kept them on the doorstep for an hour.", "Character Traits", "adjective"),
  w("gregarious", "/ɡrɪˈɡeə.ri.əs/", "C1", "hòa đồng", "She is naturally gregarious and loves parties.", "Character Traits", "adjective"),

  w("hackneyed", "/ˈhæk.nid/", "C1", "sáo mòn", "The film relies on a hackneyed plot.", "Rhetoric", "adjective"),
  w("harbinger", "/ˈhɑː.bɪn.dʒər/", "C1", "điềm báo, người báo trước", "Falling leaves are a harbinger of autumn.", "Words in Context", "noun"),

  w("impede", "/ɪmˈpiːd/", "B2", "cản trở", "Heavy traffic impeded the rescue effort.", "Action Verbs", "verb"),
  w("incisive", "/ɪnˈsaɪ.sɪv/", "C1", "sắc sảo, đi vào trọng tâm", "She is known for her incisive political commentary.", "Tone & Attitude", "adjective"),
  w("inconspicuous", "/ˌɪn.kənˈspɪk.ju.əs/", "C1", "không nổi bật", "The tiny camera was almost inconspicuous on the wall.", "Description", "adjective"),
  w("indispensable", "/ˌɪn.dɪˈspen.sə.bəl/", "B2", "không thể thiếu", "Smartphones have become indispensable to modern life.", "Description", "adjective"),
  w("ineffable", "/ɪnˈef.ə.bəl/", "C1", "không thể diễn tả", "The view from the summit was ineffable.", "Description", "adjective"),
  w("inevitable", "/ɪnˈev.ɪ.tə.bəl/", "B2", "không thể tránh khỏi", "Some delay is inevitable in any large project.", "Description", "adjective"),
  w("inherent", "/ɪnˈher.ənt/", "B2", "vốn có", "Risk is an inherent part of investing.", "Description", "adjective"),
  w("intricate", "/ˈɪn.trɪ.kət/", "B2", "phức tạp, tinh xảo", "The watch has an intricate mechanism.", "Description", "adjective"),

  w("juxtapose", "/ˌdʒʌk.stəˈpəʊz/", "C1", "đặt cạnh nhau (để so sánh)", "The author juxtaposes wealth and poverty in the novel.", "Rhetoric", "verb"),

  w("laconic", "/ləˈkɒn.ɪk/", "C1", "ngắn gọn, ít lời", "His laconic reply suggested impatience.", "Rhetoric", "adjective"),
  w("lucid", "/ˈluː.sɪd/", "B2", "rõ ràng, mạch lạc", "The professor's lucid explanation impressed everyone.", "Rhetoric", "adjective"),

  w("meticulous", "/məˈtɪk.jə.ləs/", "B2", "tỉ mỉ", "The artist works with meticulous attention to detail.", "Character Traits", "adjective"),
  w("mitigate", "/ˈmɪt.ɪ.ɡeɪt/", "C1", "làm dịu, giảm thiểu", "Recycling helps mitigate environmental damage.", "Action Verbs", "verb"),
  w("myriad", "/ˈmɪr.i.əd/", "B2", "vô số", "The city offers a myriad of cultural activities.", "Description", "noun"),

  w("nuance", "/ˈnjuː.ɑːns/", "C1", "sắc thái tinh tế", "The translation captures every nuance of the original.", "Rhetoric", "noun"),

  w("obfuscate", "/ˈɒb.fə.skeɪt/", "C1", "làm rối rắm", "Bureaucratic language can obfuscate simple ideas.", "Rhetoric", "verb"),
  w("ostensible", "/ɒsˈten.sə.bəl/", "C1", "bề ngoài, có vẻ", "The ostensible reason for the trip was business.", "Description", "adjective"),

  w("paradigm", "/ˈpær.ə.daɪm/", "C1", "khuôn mẫu, mô hình", "Smartphones shifted the paradigm of personal computing.", "Words in Context", "noun"),
  w("placate", "/pləˈkeɪt/", "C1", "xoa dịu", "The manager tried to placate the angry customer.", "Action Verbs", "verb"),
  w("plausible", "/ˈplɔː.zə.bəl/", "B2", "hợp lý, có thể tin được", "Her explanation sounds plausible.", "Description", "adjective"),
  w("precarious", "/prɪˈkeə.ri.əs/", "C1", "bấp bênh", "Many freelancers live in precarious financial conditions.", "Description", "adjective"),
  w("preclude", "/prɪˈkluːd/", "C1", "loại trừ, ngăn cản", "Bad weather precluded any outdoor activities.", "Action Verbs", "verb"),
  w("proliferate", "/prəˈlɪf.ə.reɪt/", "C1", "lan rộng nhanh", "Online platforms have caused fake news to proliferate.", "Action Verbs", "verb"),

  w("quintessential", "/ˌkwɪn.tɪˈsen.ʃəl/", "C1", "tinh túy, điển hình", "She is the quintessential modern entrepreneur.", "Description", "adjective"),

  w("rebuke", "/rɪˈbjuːk/", "C1", "khiển trách", "The judge rebuked the lawyer for his behavior.", "Action Verbs", "verb"),
  w("refute", "/rɪˈfjuːt/", "C1", "bác bỏ", "New data refutes the earlier hypothesis.", "Command of Evidence", "verb"),
  w("relegate", "/ˈrel.ɪ.ɡeɪt/", "C1", "giáng cấp, gạt ra", "Critics worry the topic has been relegated to a footnote.", "Action Verbs", "verb"),
  w("resilient", "/rɪˈzɪl.i.ənt/", "B2", "kiên cường, có sức bật", "Children are remarkably resilient.", "Character Traits", "adjective"),
  w("reticent", "/ˈret.ɪ.sənt/", "C1", "kín tiếng", "He was reticent about his early career.", "Tone & Attitude", "adjective"),

  w("salient", "/ˈseɪ.li.ənt/", "C1", "nổi bật, đáng chú ý", "The article highlights the salient points of the debate.", "Rhetoric", "adjective"),
  w("scrutinize", "/ˈskruː.tɪ.naɪz/", "C1", "xem xét kỹ", "Auditors scrutinize the company's financial records.", "Action Verbs", "verb"),
  w("skeptical", "/ˈskep.tɪ.kəl/", "B2", "hoài nghi", "Many scientists remain skeptical of the claim.", "Tone & Attitude", "adjective"),
  w("substantiate", "/səbˈstæn.ʃi.eɪt/", "C1", "chứng minh", "The reporter could not substantiate the accusation.", "Command of Evidence", "verb"),
  w("supersede", "/ˌsuː.pəˈsiːd/", "C1", "thay thế", "Digital photos have superseded film for most users.", "Action Verbs", "verb"),

  w("tacit", "/ˈtæs.ɪt/", "C1", "ngầm hiểu", "There was a tacit agreement to avoid the topic.", "Description", "adjective"),
  w("tenuous", "/ˈten.ju.əs/", "C1", "mong manh, yếu", "The link between the two events is tenuous.", "Description", "adjective"),
  w("transient", "/ˈtræn.zi.ənt/", "C1", "tạm thời, thoáng qua", "Fame in this industry is often transient.", "Description", "adjective"),

  w("ubiquitous", "/juːˈbɪk.wɪ.təs/", "C1", "có mặt khắp nơi", "Mobile phones are now ubiquitous.", "Description", "adjective"),
  w("undermine", "/ˌʌn.dəˈmaɪn/", "B2", "phá hoại ngầm", "Repeated errors undermine public trust.", "Action Verbs", "verb"),

  w("vacillate", "/ˈvæs.ɪ.leɪt/", "C1", "do dự", "The committee vacillated between two proposals.", "Action Verbs", "verb"),
  w("vehement", "/ˈviː.ə.mənt/", "C1", "mãnh liệt, kịch liệt", "He gave a vehement defense of his work.", "Tone & Attitude", "adjective"),
  w("vindicate", "/ˈvɪn.dɪ.keɪt/", "C1", "minh oan, chứng minh là đúng", "The new evidence vindicated the defendant.", "Action Verbs", "verb"),

  w("wary", "/ˈweə.ri/", "B2", "thận trọng", "Investors remain wary of the volatile market.", "Tone & Attitude", "adjective"),

  // ===== Math glossary =====
  w("coefficient", "/ˌkəʊ.ɪˈfɪʃ.ənt/", "B2", "hệ số", "In 3x, the coefficient of x is 3.", "Heart of Algebra", "noun", "Math"),
  w("constant", "/ˈkɒn.stənt/", "B2", "hằng số", "In y = mx + b, b is a constant.", "Heart of Algebra", "noun", "Math"),
  w("exponent", "/ɪkˈspəʊ.nənt/", "B2", "số mũ", "In 2^3, the exponent is 3.", "Passport to Advanced Math", "noun", "Math"),
  w("polynomial", "/ˌpɒl.iˈnəʊ.mi.əl/", "C1", "đa thức", "x² + 2x + 1 is a polynomial of degree 2.", "Passport to Advanced Math", "noun", "Math"),
  w("quadratic", "/kwɒˈdræt.ɪk/", "C1", "phương trình bậc hai", "The quadratic formula gives the roots of ax² + bx + c.", "Passport to Advanced Math", "adjective", "Math"),
  w("rational", "/ˈræʃ.ən.əl/", "B2", "(số) hữu tỉ", "Any fraction of integers is a rational number.", "Passport to Advanced Math", "adjective", "Math"),
  w("inequality", "/ˌɪn.ɪˈkwɒl.ə.ti/", "B2", "bất phương trình", "Solve the inequality 2x + 3 > 7.", "Heart of Algebra", "noun", "Math"),
  w("variance", "/ˈveə.ri.əns/", "C1", "phương sai", "Variance measures how spread out the data are.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("median", "/ˈmiː.di.ən/", "B2", "trung vị", "The median is the middle value of an ordered list.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("mode", "/məʊd/", "B2", "yếu vị (giá trị xuất hiện nhiều nhất)", "The mode of {2,3,3,4} is 3.", "Problem Solving & Data Analysis", "noun", "Math"),
  w("perimeter", "/pəˈrɪm.ɪ.tər/", "B2", "chu vi", "The perimeter of a rectangle is 2(l + w).", "Geometry & Trigonometry", "noun", "Math"),
  w("vertex", "/ˈvɜː.teks/", "C1", "đỉnh", "The vertex of a parabola is its turning point.", "Geometry & Trigonometry", "noun", "Math"),
  w("congruent", "/kənˈɡruː.ənt/", "C1", "đồng dạng (bằng nhau)", "Two triangles are congruent if their sides match.", "Geometry & Trigonometry", "adjective", "Math"),
  w("similar", "/ˈsɪm.ɪ.lər/", "B2", "đồng dạng (tỉ lệ)", "Similar triangles have proportional sides.", "Geometry & Trigonometry", "adjective", "Math"),
  w("hypotenuse", "/haɪˈpɒt.ən.juːz/", "B2", "cạnh huyền", "The hypotenuse is opposite the right angle.", "Geometry & Trigonometry", "noun", "Math"),
];
