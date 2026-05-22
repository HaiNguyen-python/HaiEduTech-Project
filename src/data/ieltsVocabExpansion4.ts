/**
 * @file ieltsVocabExpansion4.ts
 * @description IELTS Vocabulary Expansion #4 — Band 7.5+ academic lexis
 * for sustainability, demographics, public health, digital society and
 * critical thinking.
 */
import type { IeltsWord } from "./ieltsVocabData";

const w = (
  word: string,
  ipa: string,
  level: "B2" | "C1" | "C2",
  vi: string,
  en: string,
  example: string,
  category: string,
  partOfSpeech: string,
  synonyms: string[] = [],
  collocations: string[] = [],
): IeltsWord => ({
  word, ipa, level, definition: { en, vi }, example, category, partOfSpeech, synonyms, collocations,
});

export const ieltsVocabExpansion4: IeltsWord[] = [
  // Sustainability & Environment
  w("decarbonise", "/diːˈkɑː.bə.naɪz/", "C1", "phi carbon hóa", "to reduce carbon emissions to net zero", "The government pledged to decarbonise the power sector by 2035.", "Environment", "verb", [], ["decarbonise the economy"]),
  w("circular economy", "/ˈsɜː.kjə.lə ɪˈkɒn.ə.mi/", "C1", "kinh tế tuần hoàn", "an economy designed to eliminate waste through reuse", "A circular economy reduces the demand for raw materials.", "Environment", "noun", [], []),
  w("biodiversity loss", "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti lɒs/", "C1", "mất đa dạng sinh học", "decline in the variety of life", "Biodiversity loss threatens food security worldwide.", "Environment", "noun", [], []),
  w("greenhouse gas", "/ˈɡriːn.haʊs ɡæs/", "B2", "khí nhà kính", "a gas that traps heat in the atmosphere", "Methane is a far more potent greenhouse gas than CO₂.", "Environment", "noun", [], ["greenhouse gas emissions"]),
  w("renewable", "/rɪˈnjuː.ə.bəl/", "B2", "có thể tái tạo", "naturally replenished within a human timescale", "Renewable energy now powers a third of European households.", "Environment", "adjective", [], ["renewable energy"]),
  w("conservation", "/ˌkɒn.səˈveɪ.ʃən/", "B2", "bảo tồn", "protection of natural environments", "Marine conservation areas have doubled in the past decade.", "Environment", "noun", [], []),
  w("emission cap", "/ɪˈmɪʃ.ən kæp/", "C1", "trần phát thải", "legal limit on the amount a polluter may emit", "Stricter emission caps forced factories to upgrade filters.", "Environment", "noun", [], []),

  // Demographics & Society
  w("ageing population", "/ˈeɪ.dʒɪŋ ˌpɒp.jəˈleɪ.ʃən/", "B2", "dân số già hóa", "increasing proportion of older people", "Japan's ageing population poses a serious fiscal challenge.", "Society", "noun", [], []),
  w("demographic shift", "/ˌdem.əˈɡræf.ɪk ʃɪft/", "C1", "biến đổi nhân khẩu học", "change in the makeup of a population", "Migration is the largest demographic shift of the century.", "Society", "noun", [], []),
  w("social mobility", "/ˌsəʊ.ʃəl məʊˈbɪl.ə.ti/", "C1", "dịch chuyển xã hội", "ability to move up the social ladder", "Education is widely seen as a driver of social mobility.", "Society", "noun", [], []),
  w("inequality", "/ˌɪn.ɪˈkwɒl.ə.ti/", "B2", "sự bất bình đẳng", "uneven distribution of wealth or opportunity", "Income inequality has risen sharply since 1980.", "Society", "noun", [], []),
  w("marginalised", "/ˈmɑː.dʒɪn.əl.aɪzd/", "C1", "bị gạt ra rìa", "treated as insignificant by mainstream society", "Policy must protect marginalised groups.", "Society", "adjective", [], []),
  w("integration", "/ˌɪn.tɪˈɡreɪ.ʃən/", "B2", "hội nhập", "process of joining a wider community", "Language classes accelerate the integration of newcomers.", "Society", "noun", [], []),

  // Public Health
  w("pandemic", "/pænˈdem.ɪk/", "B2", "đại dịch", "disease prevalent across a large region", "The pandemic exposed weaknesses in global health systems.", "Health", "noun", [], []),
  w("immunity", "/ɪˈmjuː.nə.ti/", "B2", "miễn dịch", "resistance to a disease", "Vaccination produces herd immunity at scale.", "Health", "noun", [], ["herd immunity"]),
  w("life expectancy", "/laɪf ɪkˈspek.tən.si/", "B2", "tuổi thọ trung bình", "average years a person is expected to live", "Life expectancy has risen by twenty years since 1950.", "Health", "noun", [], []),
  w("preventive care", "/prɪˈven.tɪv keər/", "C1", "y tế dự phòng", "healthcare that prevents illness", "Investing in preventive care lowers long-term costs.", "Health", "noun", [], []),
  w("mental wellbeing", "/ˈmen.təl welˈbiː.ɪŋ/", "B2", "sức khỏe tinh thần", "psychological health and contentment", "Schools now monitor pupils' mental wellbeing.", "Health", "noun", [], []),
  w("contagious", "/kənˈteɪ.dʒəs/", "B2", "dễ lây", "transmissible by direct contact", "Measles is highly contagious among unvaccinated children.", "Health", "adjective", [], []),

  // Digital Society & AI
  w("algorithm", "/ˈæl.ɡə.rɪ.ðəm/", "B2", "thuật toán", "set of rules followed by a computer", "Recommendation algorithms shape what users see online.", "Technology", "noun", [], []),
  w("disinformation", "/ˌdɪs.ɪn.fəˈmeɪ.ʃən/", "C1", "thông tin sai lệch có chủ ý", "false information spread deliberately", "Disinformation can sway public opinion in elections.", "Media & Communication", "noun", [], []),
  w("digital literacy", "/ˈdɪdʒ.ɪ.təl ˈlɪt.ər.ə.si/", "B2", "khả năng số", "competence in using digital tools", "Digital literacy should be taught from primary school.", "Education", "noun", [], []),
  w("automation", "/ˌɔː.təˈmeɪ.ʃən/", "B2", "tự động hóa", "use of machines to replace human work", "Automation could displace forty percent of routine jobs.", "Technology", "noun", [], []),
  w("data privacy", "/ˈdeɪ.tə ˈpraɪ.və.si/", "B2", "quyền riêng tư dữ liệu", "right to control personal data", "Strict laws now protect children's data privacy.", "Technology", "noun", [], []),
  w("cybersecurity", "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/", "B2", "an ninh mạng", "protection of computer systems from attack", "Cybersecurity has become a national priority.", "Technology", "noun", [], []),
  w("deepfake", "/ˈdiːp.feɪk/", "C1", "video giả siêu thực", "AI-generated synthetic media", "Deepfake videos are increasingly hard to detect.", "Technology", "noun", [], []),

  // Critical Thinking & Academic Writing
  w("counterargument", "/ˈkaʊn.tərˌɑː.ɡjə.mənt/", "C1", "phản biện", "opposing view to one's claim", "A strong essay anticipates the counterargument.", "Academic Writing", "noun", [], []),
  w("substantiate", "/səbˈstæn.ʃi.eɪt/", "C1", "chứng minh", "support with evidence", "The author substantiates her claim with three studies.", "Academic Writing", "verb", ["prove", "verify"], []),
  w("hypothesis", "/haɪˈpɒθ.ə.sɪs/", "B2", "giả thuyết", "tentative explanation to be tested", "Researchers tested the hypothesis on 500 patients.", "Science", "noun", [], []),
  w("paradigm", "/ˈpær.ə.daɪm/", "C1", "hệ hình", "model or framework", "Quantum mechanics is a paradigm shift in physics.", "Science", "noun", [], ["paradigm shift"]),
  w("empirical", "/ɪmˈpɪr.ɪ.kəl/", "C1", "thực nghiệm", "based on observation", "Empirical evidence supports this conclusion.", "Science", "adjective", [], ["empirical evidence"]),
  w("inference", "/ˈɪn.fər.əns/", "C1", "suy luận", "a conclusion drawn from evidence", "Readers must draw an inference from the passage.", "Academic Writing", "noun", [], []),
  w("plausible", "/ˈplɔː.zə.bəl/", "C1", "có vẻ hợp lý", "seeming reasonable", "Her explanation is plausible but unproven.", "Academic Writing", "adjective", [], []),
];
