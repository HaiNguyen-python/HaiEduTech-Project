/**
 * @file ieltsVocabExpansion5.ts
 * @description IELTS Vocabulary Expansion #5 - Band 6.5-8.0 lexis covering
 * education, work & career, health & wellbeing, technology and media.
 */
import type { IeltsWord } from "./ieltsVocabData";

const w = (
  word: string,
  ipa: string,
  level: "B1" | "B2" | "C1" | "C2",
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

export const ieltsVocabExpansion5: IeltsWord[] = [
  // Education
  w("curriculum", "/kəˈrɪk.jə.ləm/", "B2", "chương trình giảng dạy", "the subjects studied in a school or college", "The national curriculum is reviewed every five years.", "Education", "noun", ["syllabus"], ["national curriculum"]),
  w("rote learning", "/rəʊt ˈlɜː.nɪŋ/", "C1", "học vẹt", "memorising without understanding", "Rote learning rarely fosters genuine creativity.", "Education", "noun", [], []),
  w("critical thinking", "/ˈkrɪt.ɪ.kəl ˈθɪŋ.kɪŋ/", "B2", "tư duy phản biện", "the objective analysis of facts to form a judgement", "Critical thinking should be taught from primary school.", "Education", "noun", [], []),
  w("vocational", "/vəʊˈkeɪ.ʃən.əl/", "B2", "hướng nghiệp", "relating to job-specific skills", "Vocational training prepares students for the workforce.", "Education", "adjective", [], ["vocational training"]),
  w("scholarship", "/ˈskɒl.ə.ʃɪp/", "B1", "học bổng", "money awarded to a student for study", "She won a full scholarship to Oxford.", "Education", "noun", ["grant", "bursary"], ["full scholarship", "merit scholarship"]),
  w("undergraduate", "/ˌʌn.dəˈɡrædʒ.u.ət/", "B2", "sinh viên đại học", "a university student who has not yet completed a degree", "Most undergraduates live on campus.", "Education", "noun", [], []),
  w("plagiarism", "/ˈpleɪ.dʒə.rɪ.zəm/", "C1", "đạo văn", "using another's work as one's own", "Universities use software to detect plagiarism.", "Education", "noun", [], []),
  w("tuition fee", "/tjuˈɪʃ.ən fiː/", "B1", "học phí", "money paid for education", "Tuition fees have risen sharply in the UK.", "Education", "noun", [], []),
  w("compulsory", "/kəmˈpʌl.sər.i/", "B2", "bắt buộc", "required by law or rules", "Education is compulsory until age 16.", "Education", "adjective", ["mandatory"], ["compulsory subject"]),
  w("dropout rate", "/ˈdrɒp.aʊt reɪt/", "B2", "tỉ lệ bỏ học", "the percentage who leave education early", "The university lowered its dropout rate through mentoring.", "Education", "noun", [], []),

  // Work & Career
  w("redundancy", "/rɪˈdʌn.dən.si/", "C1", "sự cắt giảm nhân sự", "dismissal because a job is no longer needed", "He received a redundancy package after the merger.", "Work & Career", "noun", ["layoff"], ["redundancy package"]),
  w("remuneration", "/rɪˌmjuː.nəˈreɪ.ʃən/", "C1", "tiền lương, thù lao", "payment for work", "Senior executives receive generous remuneration.", "Work & Career", "noun", ["salary", "pay"], []),
  w("appraisal", "/əˈpreɪ.zəl/", "C1", "đánh giá năng lực", "a formal review of an employee's performance", "Annual appraisals help identify training needs.", "Work & Career", "noun", [], ["performance appraisal"]),
  w("workforce", "/ˈwɜːk.fɔːs/", "B2", "lực lượng lao động", "all the people who work in a country or company", "Women now make up 47% of the workforce.", "Work & Career", "noun", [], ["skilled workforce"]),
  w("autonomy", "/ɔːˈtɒn.ə.mi/", "C1", "quyền tự chủ", "the right to make one's own decisions", "Employees with more autonomy report higher satisfaction.", "Work & Career", "noun", ["independence"], []),
  w("burnout", "/ˈbɜːn.aʊt/", "B2", "kiệt sức", "physical or mental collapse from overwork", "Remote work can paradoxically increase burnout.", "Work & Career", "noun", [], ["job burnout"]),
  w("freelancer", "/ˈfriː.lɑːn.sər/", "B1", "người làm tự do", "a self-employed worker without long-term commitment", "Many freelancers prefer flexible hours.", "Work & Career", "noun", [], []),
  w("upskill", "/ʌpˈskɪl/", "C1", "nâng cao kỹ năng", "to learn additional skills", "Workers must upskill to keep up with automation.", "Work & Career", "verb", [], []),
  w("entrepreneur", "/ˌɒn.trə.prəˈnɜːr/", "B2", "doanh nhân khởi nghiệp", "someone who starts their own business", "Successful entrepreneurs tolerate uncertainty well.", "Work & Career", "noun", [], []),
  w("nine-to-five", "/ˌnaɪn.təˈfaɪv/", "B2", "giờ hành chính", "standard office hours", "She left her nine-to-five to travel.", "Work & Career", "adjective", [], []),

  // Health & Wellbeing
  w("sedentary", "/ˈsed.ən.tər.i/", "C1", "ít vận động", "involving little physical activity", "Sedentary lifestyles contribute to obesity.", "Health", "adjective", [], ["sedentary lifestyle"]),
  w("obesity", "/əʊˈbiː.sə.ti/", "B2", "béo phì", "the condition of being seriously overweight", "Childhood obesity has tripled since 1980.", "Health", "noun", [], ["childhood obesity"]),
  w("immunisation", "/ˌɪm.jə.naɪˈzeɪ.ʃən/", "C1", "sự tiêm chủng", "the process of making someone immune to disease", "Mass immunisation eradicated smallpox.", "Health", "noun", ["vaccination"], []),
  w("longevity", "/lɒnˈdʒev.ə.ti/", "C1", "tuổi thọ", "long life", "Genetics and diet both influence longevity.", "Health", "noun", [], []),
  w("mental health", "/ˈmen.təl helθ/", "B1", "sức khỏe tâm thần", "emotional and psychological wellbeing", "Universities now offer mental-health support.", "Health", "noun", [], []),
  w("nutritious", "/njuːˈtrɪʃ.əs/", "B1", "bổ dưỡng", "containing many of the substances needed for health", "Nutritious school meals improve concentration.", "Health", "adjective", ["nourishing"], []),
  w("epidemic", "/ˌep.ɪˈdem.ɪk/", "B2", "dịch bệnh", "a widespread occurrence of an infectious disease", "The flu epidemic strained hospitals.", "Health", "noun", [], ["flu epidemic"]),
  w("wellbeing", "/ˌwelˈbiː.ɪŋ/", "B2", "sự khỏe mạnh", "the state of being comfortable and healthy", "Green spaces enhance urban wellbeing.", "Health", "noun", [], []),
  w("preventive", "/prɪˈven.tɪv/", "B2", "có tính phòng ngừa", "intended to prevent disease", "Preventive medicine saves health systems money.", "Health", "adjective", [], ["preventive measure"]),
  w("chronic", "/ˈkrɒn.ɪk/", "B2", "mãn tính", "lasting for a long time", "Chronic stress weakens the immune system.", "Health", "adjective", [], ["chronic illness"]),

  // Technology & Media
  w("digital literacy", "/ˈdɪdʒ.ɪ.təl ˈlɪt.ər.ə.si/", "C1", "kỹ năng số", "the ability to use digital devices effectively", "Digital literacy is now a basic life skill.", "Technology", "noun", [], []),
  w("algorithm", "/ˈæl.ɡə.rɪ.ðəm/", "B2", "thuật toán", "a set of rules followed by a computer", "Social media algorithms shape what we see.", "Technology", "noun", [], ["recommendation algorithm"]),
  w("artificial intelligence", "/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/", "B2", "trí tuệ nhân tạo", "machines that simulate human thinking", "Artificial intelligence is transforming healthcare.", "Technology", "noun", [], []),
  w("misinformation", "/ˌmɪs.ɪn.fəˈmeɪ.ʃən/", "C1", "thông tin sai lệch", "false information shared without intent to deceive", "Misinformation spreads six times faster than truth online.", "Media", "noun", [], []),
  w("echo chamber", "/ˈek.əʊ ˌtʃeɪm.bər/", "C1", "phòng vang", "an environment where one only hears similar opinions", "Algorithms create echo chambers that polarise society.", "Media", "noun", [], []),
  w("censorship", "/ˈsen.sə.ʃɪp/", "C1", "kiểm duyệt", "the suppression of unacceptable content", "Government censorship of news damages trust.", "Media", "noun", [], []),
  w("user-generated", "/ˈjuː.zə ˈdʒen.ə.reɪ.tɪd/", "C1", "do người dùng tạo", "created by ordinary users", "Wikipedia is built entirely from user-generated content.", "Media", "adjective", [], ["user-generated content"]),
  w("encryption", "/ɪnˈkrɪp.ʃən/", "C1", "mã hóa", "converting data into a secret code", "End-to-end encryption protects private messages.", "Technology", "noun", [], []),
  w("disrupt", "/dɪsˈrʌpt/", "B2", "làm thay đổi đột phá", "to fundamentally change an industry", "Streaming services disrupted traditional broadcasting.", "Technology", "verb", [], ["disrupt the market"]),
  w("automation", "/ˌɔː.təˈmeɪ.ʃən/", "B2", "tự động hóa", "use of machines to do work previously done by people", "Automation threatens routine clerical jobs.", "Technology", "noun", [], []),

  // Society & Culture
  w("urbanisation", "/ˌɜː.bən.aɪˈzeɪ.ʃən/", "B2", "đô thị hóa", "the movement of people from rural to urban areas", "Rapid urbanisation strains city infrastructure.", "Society", "noun", [], ["rapid urbanisation"]),
  w("inequality", "/ˌɪn.ɪˈkwɒl.ə.ti/", "B2", "sự bất bình đẳng", "unfair difference between groups", "Income inequality has widened over the past decade.", "Society", "noun", [], ["income inequality"]),
  w("multicultural", "/ˌmʌl.tiˈkʌl.tʃər.əl/", "B2", "đa văn hóa", "including several cultures", "London is one of the most multicultural cities in Europe.", "Society", "adjective", [], ["multicultural society"]),
  w("integration", "/ˌɪn.tɪˈɡreɪ.ʃən/", "B2", "sự hòa nhập", "the process of becoming part of a group", "Language classes accelerate immigrants' integration.", "Society", "noun", [], ["social integration"]),
  w("stereotype", "/ˈster.i.ə.taɪp/", "B2", "định kiến", "a widely held oversimplified image", "The film challenges gender stereotypes.", "Society", "noun", [], ["gender stereotype"]),
  w("welfare state", "/ˈwel.feər steɪt/", "C1", "nhà nước phúc lợi", "a system where the state provides for citizens' wellbeing", "The Nordic welfare state is funded by high taxes.", "Society", "noun", [], []),
  w("philanthropy", "/fɪˈlæn.θrə.pi/", "C1", "hoạt động từ thiện", "the desire to promote others' welfare via donations", "Tech billionaires have embraced philanthropy.", "Society", "noun", ["charity"], []),
  w("demographic", "/ˌdem.əˈɡræf.ɪk/", "B2", "thuộc về dân số", "relating to the structure of populations", "Ageing populations create demographic challenges.", "Society", "adjective", [], ["demographic shift"]),
  w("gentrification", "/ˌdʒen.trɪ.fɪˈkeɪ.ʃən/", "C1", "sự thượng lưu hóa khu phố", "renovation that displaces poorer residents", "Gentrification has pushed up rents in East London.", "Society", "noun", [], []),
  w("civic", "/ˈsɪv.ɪk/", "B2", "thuộc về công dân", "relating to a town or city or its citizens", "Voting is a basic civic duty.", "Society", "adjective", [], ["civic duty", "civic engagement"]),
];
