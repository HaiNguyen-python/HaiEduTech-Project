// IELTS Vocabulary Expansion - Band 7.5+ academic words
import type { IeltsWord } from "./ieltsVocabData";

export const ieltsVocabExpansion: IeltsWord[] = [
  // Education
  { word: "pedagogy", ipa: "/ˈped.ə.ɡɒ.dʒi/", level: "C1", definition: { en: "the method and practice of teaching", vi: "phương pháp sư phạm" }, example: "Modern pedagogy emphasises critical thinking over rote learning.", synonyms: ["teaching method", "instruction"], collocations: ["progressive pedagogy", "pedagogy and curriculum"], category: "Education", partOfSpeech: "noun" },
  { word: "rote learning", ipa: "/rəʊt ˈlɜː.nɪŋ/", level: "C1", definition: { en: "memorisation through repetition without understanding", vi: "học vẹt" }, example: "Critics argue that rote learning stifles creativity.", synonyms: ["memorisation"], collocations: ["rely on rote learning"], category: "Education", partOfSpeech: "noun" },
  { word: "meritocracy", ipa: "/ˌmer.ɪˈtɒk.rə.si/", level: "C1", definition: { en: "a system based on talent and achievement", vi: "chế độ trọng dụng nhân tài" }, example: "A true meritocracy rewards ability, not background.", synonyms: ["talent-based system"], collocations: ["genuine meritocracy"], category: "Education", partOfSpeech: "noun" },

  // Technology
  { word: "algorithm", ipa: "/ˈæl.ɡə.rɪ.ðəm/", level: "C1", definition: { en: "a set of rules for solving a problem", vi: "thuật toán" }, example: "Social media algorithms curate what users see.", synonyms: ["procedure", "formula"], collocations: ["recommendation algorithm", "machine-learning algorithm"], category: "Technology", partOfSpeech: "noun" },
  { word: "automation", ipa: "/ˌɔː.təˈmeɪ.ʃən/", level: "B2", definition: { en: "use of machines to perform tasks", vi: "tự động hóa" }, example: "Automation has reshaped manufacturing employment.", synonyms: ["mechanisation"], collocations: ["industrial automation"], category: "Technology", partOfSpeech: "noun" },
  { word: "encryption", ipa: "/ɪnˈkrɪp.ʃən/", level: "C1", definition: { en: "process of encoding information for security", vi: "mã hóa" }, example: "End-to-end encryption safeguards user privacy.", synonyms: ["encoding"], collocations: ["end-to-end encryption"], category: "Technology", partOfSpeech: "noun" },
  { word: "surveillance", ipa: "/sɜːˈveɪ.ləns/", level: "C1", definition: { en: "close observation, especially of a suspect", vi: "sự giám sát" }, example: "Mass surveillance raises ethical concerns.", synonyms: ["monitoring", "observation"], collocations: ["state surveillance", "surveillance technology"], category: "Technology", partOfSpeech: "noun" },

  // Environment
  { word: "biodiversity", ipa: "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/", level: "C1", definition: { en: "variety of life in a habitat", vi: "đa dạng sinh học" }, example: "Tropical rainforests harbour exceptional biodiversity.", synonyms: ["biological diversity"], collocations: ["loss of biodiversity"], category: "Environment", partOfSpeech: "noun" },
  { word: "decarbonisation", ipa: "/diːˌkɑː.bə.naɪˈzeɪ.ʃən/", level: "C1", definition: { en: "reduction of carbon emissions", vi: "khử carbon" }, example: "Rapid decarbonisation is essential to limit warming.", synonyms: ["carbon reduction"], collocations: ["decarbonisation pathway"], category: "Environment", partOfSpeech: "noun" },
  { word: "renewable", ipa: "/rɪˈnjuː.ə.bəl/", level: "B2", definition: { en: "naturally replenished energy source", vi: "tái tạo" }, example: "Renewable sources now power one-third of Europe.", synonyms: ["sustainable"], collocations: ["renewable energy"], category: "Environment", partOfSpeech: "adj" },
  { word: "ecosystem", ipa: "/ˈiː.kəʊˌsɪs.təm/", level: "B2", definition: { en: "biological community of interacting organisms", vi: "hệ sinh thái" }, example: "Coral ecosystems are highly sensitive to temperature.", synonyms: ["habitat"], collocations: ["fragile ecosystem"], category: "Environment", partOfSpeech: "noun" },

  // Health
  { word: "sedentary", ipa: "/ˈsed.ən.tər.i/", level: "C1", definition: { en: "involving little physical activity", vi: "ít vận động" }, example: "A sedentary lifestyle increases cardiovascular risk.", synonyms: ["inactive"], collocations: ["sedentary lifestyle"], category: "Health", partOfSpeech: "adj" },
  { word: "epidemic", ipa: "/ˌep.ɪˈdem.ɪk/", level: "B2", definition: { en: "widespread occurrence of disease", vi: "dịch bệnh" }, example: "Obesity has reached epidemic proportions in some nations.", synonyms: ["outbreak"], collocations: ["epidemic outbreak"], category: "Health", partOfSpeech: "noun" },
  { word: "longevity", ipa: "/lɒnˈdʒev.ə.ti/", level: "C1", definition: { en: "long life", vi: "tuổi thọ cao" }, example: "Mediterranean diets are associated with longevity.", synonyms: ["long life"], collocations: ["increased longevity"], category: "Health", partOfSpeech: "noun" },
  { word: "mental wellbeing", ipa: "/ˈmen.təl ˈwel.biː.ɪŋ/", level: "B2", definition: { en: "state of psychological health", vi: "sức khỏe tinh thần" }, example: "Workplaces increasingly prioritise mental wellbeing.", synonyms: ["mental health"], collocations: ["promote mental wellbeing"], category: "Health", partOfSpeech: "noun" },

  // Society
  { word: "demographic", ipa: "/ˌdem.əˈɡræf.ɪk/", level: "B2", definition: { en: "relating to population structure", vi: "nhân khẩu học" }, example: "Ageing demographics strain public pensions.", synonyms: ["population"], collocations: ["demographic shift"], category: "Society", partOfSpeech: "adj" },
  { word: "urbanisation", ipa: "/ˌɜː.bə.naɪˈzeɪ.ʃən/", level: "B2", definition: { en: "movement of population to cities", vi: "đô thị hóa" }, example: "Rapid urbanisation strains housing markets.", synonyms: ["city growth"], collocations: ["unplanned urbanisation"], category: "Society", partOfSpeech: "noun" },
  { word: "inequality", ipa: "/ˌɪn.ɪˈkwɒl.ə.ti/", level: "B2", definition: { en: "unequal distribution", vi: "bất bình đẳng" }, example: "Income inequality has widened over the past decade.", synonyms: ["disparity"], collocations: ["income inequality"], category: "Society", partOfSpeech: "noun" },
  { word: "cohesion", ipa: "/kəʊˈhiː.ʒən/", level: "C1", definition: { en: "the state of being united", vi: "sự gắn kết" }, example: "Public services foster social cohesion.", synonyms: ["unity", "solidarity"], collocations: ["social cohesion"], category: "Society", partOfSpeech: "noun" },

  // Economy
  { word: "inflation", ipa: "/ɪnˈfleɪ.ʃən/", level: "B2", definition: { en: "general rise in prices", vi: "lạm phát" }, example: "Central banks raised rates to curb inflation.", synonyms: ["price rise"], collocations: ["curb inflation"], category: "Economy", partOfSpeech: "noun" },
  { word: "recession", ipa: "/rɪˈseʃ.ən/", level: "B2", definition: { en: "period of economic decline", vi: "suy thoái" }, example: "The country slid into recession last quarter.", synonyms: ["downturn", "slump"], collocations: ["deep recession"], category: "Economy", partOfSpeech: "noun" },
  { word: "fiscal", ipa: "/ˈfɪs.kəl/", level: "C1", definition: { en: "relating to government revenue", vi: "tài khóa" }, example: "Fiscal stimulus accelerated the recovery.", synonyms: ["financial", "budgetary"], collocations: ["fiscal policy", "fiscal stimulus"], category: "Economy", partOfSpeech: "adj" },
  { word: "subsidy", ipa: "/ˈsʌb.sɪ.di/", level: "C1", definition: { en: "financial support from government", vi: "trợ cấp" }, example: "Farmers receive subsidies to stabilise food prices.", synonyms: ["grant", "support"], collocations: ["government subsidy"], category: "Economy", partOfSpeech: "noun" },

  // Crime & Law
  { word: "deterrent", ipa: "/dɪˈter.ənt/", level: "C1", definition: { en: "something that discourages an action", vi: "biện pháp răn đe" }, example: "Heavy fines serve as a deterrent against speeding.", synonyms: ["discouragement"], collocations: ["effective deterrent"], category: "Crime & Law", partOfSpeech: "noun" },
  { word: "rehabilitation", ipa: "/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/", level: "C1", definition: { en: "restoration to normal life after imprisonment", vi: "phục hồi nhân phẩm" }, example: "Education programmes aid offender rehabilitation.", synonyms: ["reform"], collocations: ["offender rehabilitation"], category: "Crime & Law", partOfSpeech: "noun" },
  { word: "jurisdiction", ipa: "/ˌdʒʊə.rɪsˈdɪk.ʃən/", level: "C1", definition: { en: "official power to make legal decisions", vi: "thẩm quyền pháp lý" }, example: "Cybercrime often crosses national jurisdictions.", synonyms: ["authority"], collocations: ["legal jurisdiction"], category: "Crime & Law", partOfSpeech: "noun" },

  // Media
  { word: "misinformation", ipa: "/ˌmɪs.ɪn.fəˈmeɪ.ʃən/", level: "C1", definition: { en: "false information spread regardless of intent", vi: "thông tin sai lệch" }, example: "Social media amplifies the spread of misinformation.", synonyms: ["false information"], collocations: ["combat misinformation"], category: "Media & Communication", partOfSpeech: "noun" },
  { word: "censorship", ipa: "/ˈsen.sə.ʃɪp/", level: "C1", definition: { en: "suppression of speech or media", vi: "kiểm duyệt" }, example: "Press censorship undermines democratic accountability.", synonyms: ["suppression"], collocations: ["state censorship"], category: "Media & Communication", partOfSpeech: "noun" },
  { word: "echo chamber", ipa: "/ˈek.əʊ ˈtʃeɪm.bər/", level: "C1", definition: { en: "environment reinforcing existing views", vi: "phòng vang dội" }, example: "Personalised feeds can trap users in echo chambers.", synonyms: ["filter bubble"], collocations: ["online echo chamber"], category: "Media & Communication", partOfSpeech: "noun" },

  // Work
  { word: "remote work", ipa: "/rɪˈməʊt wɜːk/", level: "B2", definition: { en: "working from outside the office", vi: "làm việc từ xa" }, example: "Remote work has reshaped urban property markets.", synonyms: ["telecommuting"], collocations: ["remote work policy"], category: "Work & Career", partOfSpeech: "noun" },
  { word: "burnout", ipa: "/ˈbɜːn.aʊt/", level: "C1", definition: { en: "physical or mental collapse from overwork", vi: "kiệt sức" }, example: "Excessive workloads contribute to professional burnout.", synonyms: ["exhaustion"], collocations: ["chronic burnout"], category: "Work & Career", partOfSpeech: "noun" },
  { word: "upskill", ipa: "/ʌpˈskɪl/", level: "C1", definition: { en: "learn new skills for advancement", vi: "nâng cao kỹ năng" }, example: "Employees must upskill to remain employable.", synonyms: ["retrain"], collocations: ["upskill workforce"], category: "Work & Career", partOfSpeech: "verb" },

  // Psychology
  { word: "resilience", ipa: "/rɪˈzɪl.i.əns/", level: "B2", definition: { en: "ability to recover from difficulty", vi: "khả năng phục hồi" }, example: "Resilience can be cultivated through mindful practice.", synonyms: ["toughness"], collocations: ["build resilience"], category: "Psychology", partOfSpeech: "noun" },
  { word: "cognitive", ipa: "/ˈkɒɡ.nə.tɪv/", level: "C1", definition: { en: "related to mental processes", vi: "thuộc nhận thức" }, example: "Cognitive decline accelerates without stimulation.", synonyms: ["mental"], collocations: ["cognitive ability"], category: "Psychology", partOfSpeech: "adj" },
  { word: "introspection", ipa: "/ˌɪn.trəˈspek.ʃən/", level: "C1", definition: { en: "examination of one's own thoughts", vi: "sự tự xem xét nội tâm" }, example: "Journaling encourages disciplined introspection.", synonyms: ["self-reflection"], collocations: ["honest introspection"], category: "Psychology", partOfSpeech: "noun" },

  // Culture
  { word: "heritage", ipa: "/ˈher.ɪ.tɪdʒ/", level: "B2", definition: { en: "valued traditions inherited from past", vi: "di sản" }, example: "UNESCO protects sites of outstanding cultural heritage.", synonyms: ["legacy"], collocations: ["cultural heritage"], category: "Culture & Arts", partOfSpeech: "noun" },
  { word: "assimilation", ipa: "/əˌsɪm.ɪˈleɪ.ʃən/", level: "C1", definition: { en: "absorption into a culture", vi: "sự đồng hóa" }, example: "Forced assimilation has been widely criticised.", synonyms: ["integration"], collocations: ["cultural assimilation"], category: "Culture & Arts", partOfSpeech: "noun" },
  { word: "globalisation", ipa: "/ˌɡləʊ.bəl.aɪˈzeɪ.ʃən/", level: "B2", definition: { en: "growing interconnection of economies and cultures", vi: "toàn cầu hóa" }, example: "Globalisation has reshaped supply chains.", synonyms: ["internationalisation"], collocations: ["economic globalisation"], category: "Culture & Arts", partOfSpeech: "noun" },
];
