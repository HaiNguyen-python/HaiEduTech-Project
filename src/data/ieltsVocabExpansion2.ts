/**
 * @file ieltsVocabExpansion2.ts
 * @description IELTS Vocabulary Expansion #2 — Band 7.0+ academic lexis to
 * restore the bank to 800+ unique words (dedup in ieltsVocabData removed ~30
 * earlier collisions) and to broaden coverage across society, environment,
 * health, technology, work, and education.
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

export const ieltsVocabExpansion2: IeltsWord[] = [
  // Education
  w("scaffolding", "/ˈskæf.əl.dɪŋ/", "C1", "hỗ trợ học tập có cấu trúc", "structured support that gradually transfers responsibility to learners", "Effective scaffolding helps weaker students reach grade-level work.", "Education", "noun", ["instructional support"], ["scaffolding techniques"]),
  w("interdisciplinary", "/ˌɪn.təˌdɪs.əˈplɪn.ər.i/", "C1", "liên ngành", "involving two or more academic disciplines", "Climate science is an inherently interdisciplinary field.", "Education", "adj", ["cross-disciplinary"], ["interdisciplinary research"]),
  w("vocational", "/vəʊˈkeɪ.ʃən.əl/", "B2", "thuộc nghề nghiệp", "relating to occupational skills training", "Germany's vocational pathways rival traditional university routes.", "Education", "adj", ["occupational"], ["vocational training"]),
  w("dropout rate", "/ˈdrɒp.aʊt reɪt/", "B2", "tỷ lệ bỏ học", "the proportion of students who leave education early", "Targeted scholarships reduced the dropout rate by 18%.", "Education", "noun", [], ["high dropout rate"]),
  w("standardised testing", "/ˈstæn.də.daɪzd ˈtest.ɪŋ/", "B2", "thi chuẩn hóa", "exams scored uniformly across cohorts", "Standardised testing remains controversial among educators.", "Education", "noun", [], ["over-reliance on standardised testing"]),

  // Society
  w("polarisation", "/ˌpəʊ.lər.aɪˈzeɪ.ʃən/", "C1", "phân cực", "division into two sharply contrasting groups", "Social media has accelerated political polarisation.", "Society", "noun", ["division"], ["growing polarisation"]),
  w("disenfranchised", "/ˌdɪs.ɪnˈfræn.tʃaɪzd/", "C1", "bị tước quyền", "deprived of power or rights", "Reforms aim to re-enfranchise disenfranchised communities.", "Society", "adj", ["marginalised"], ["disenfranchised voters"]),
  w("upward mobility", "/ˈʌp.wəd məʊˈbɪl.ə.ti/", "C1", "thăng tiến xã hội", "ability to rise in social class", "Quality education is a key driver of upward mobility.", "Society", "noun", [], ["limited upward mobility"]),
  w("social fabric", "/ˈsəʊ.ʃəl ˈfæb.rɪk/", "C1", "kết cấu xã hội", "the underlying network of relationships in a community", "Mass migration can fray a country's social fabric.", "Society", "noun", [], ["preserve the social fabric"]),
  w("civic duty", "/ˈsɪv.ɪk ˈdʒuː.ti/", "B2", "nghĩa vụ công dân", "responsibility expected of a citizen", "Voting is widely viewed as a civic duty.", "Society", "noun", [], ["fulfil a civic duty"]),

  // Environment
  w("carbon footprint", "/ˈkɑː.bən ˈfʊt.prɪnt/", "B2", "lượng khí thải các-bon", "total greenhouse-gas emissions caused by an entity", "Plant-based diets typically lower one's carbon footprint.", "Environment", "noun", [], ["reduce carbon footprint"]),
  w("deforestation", "/diːˌfɒr.ɪˈsteɪ.ʃən/", "B2", "phá rừng", "the clearing of forests on a large scale", "Amazon deforestation undermines global climate goals.", "Environment", "noun", ["forest loss"], ["rampant deforestation"]),
  w("conservation", "/ˌkɒn.səˈveɪ.ʃən/", "B2", "bảo tồn", "protection of the natural environment", "Marine conservation requires international cooperation.", "Environment", "noun", ["preservation"], ["wildlife conservation"]),
  w("sustainability", "/səˌsteɪ.nəˈbɪl.ə.ti/", "B2", "tính bền vững", "the ability to maintain at a certain level over time", "Long-term sustainability must guide urban planning.", "Environment", "noun", [], ["environmental sustainability"]),
  w("ecological footprint", "/ˌiː.kəˈlɒdʒ.ɪ.kəl ˈfʊt.prɪnt/", "C1", "dấu chân sinh thái", "measure of human demand on ecosystems", "Wealthy nations have an outsized ecological footprint.", "Environment", "noun", [], ["calculate the ecological footprint"]),
  w("greenwashing", "/ˈɡriːnˌwɒʃ.ɪŋ/", "C1", "tẩy xanh / quảng cáo xanh giả", "misleading claims that a product is environmentally friendly", "Regulators are cracking down on corporate greenwashing.", "Environment", "noun", [], ["accusations of greenwashing"]),

  // Health
  w("preventive care", "/prɪˈven.tɪv keər/", "B2", "y tế dự phòng", "healthcare aimed at preventing illness", "Investment in preventive care reduces long-term costs.", "Health", "noun", [], ["preventive care programmes"]),
  w("mental resilience", "/ˈmen.təl rɪˈzɪl.i.əns/", "C1", "khả năng phục hồi tinh thần", "ability to recover from psychological stress", "Schools increasingly teach skills that build mental resilience.", "Health", "noun", [], ["build mental resilience"]),
  w("immunisation", "/ˌɪm.jə.naɪˈzeɪ.ʃən/", "B2", "tiêm chủng", "the process of becoming protected against disease", "Childhood immunisation has eradicated several diseases.", "Health", "noun", ["vaccination"], ["mass immunisation"]),
  w("nutrition label", "/njuːˈtrɪʃ.ən ˈleɪ.bəl/", "B2", "nhãn dinh dưỡng", "information about the nutrient content of food", "Mandatory nutrition labels guide healthier consumer choices.", "Health", "noun", [], ["read the nutrition label"]),
  w("burnout", "/ˈbɜːn.aʊt/", "C1", "kiệt sức (do công việc)", "exhaustion caused by prolonged stress", "Remote workers report rising levels of burnout.", "Health", "noun", ["exhaustion"], ["chronic burnout"]),

  // Technology
  w("digital divide", "/ˈdɪdʒ.ɪ.təl dɪˈvaɪd/", "C1", "khoảng cách số", "gap between those who have and lack technology access", "The pandemic exposed the digital divide between rich and poor pupils.", "Technology", "noun", [], ["bridge the digital divide"]),
  w("disinformation", "/ˌdɪs.ɪn.fəˈmeɪ.ʃən/", "C1", "thông tin sai lệch cố ý", "deliberately false information", "Election disinformation thrives on closed messaging apps.", "Technology", "noun", ["fake news"], ["spread disinformation"]),
  w("biometric", "/ˌbaɪ.əʊˈmet.rɪk/", "C1", "sinh trắc học", "using unique physical traits for identification", "Airports increasingly rely on biometric boarding gates.", "Technology", "adj", [], ["biometric authentication"]),
  w("cybersecurity", "/ˈsaɪ.bə.sɪˌkjʊə.rə.ti/", "C1", "an ninh mạng", "protection of digital systems from attack", "A robust cybersecurity strategy is now a board-level concern.", "Technology", "noun", [], ["cybersecurity threat"]),
  w("data privacy", "/ˈdeɪ.tə ˈpraɪ.və.si/", "B2", "quyền riêng tư dữ liệu", "the right to control personal information", "GDPR set a new global standard for data privacy.", "Technology", "noun", [], ["respect data privacy"]),

  // Work & Career
  w("remote working", "/rɪˈməʊt ˈwɜː.kɪŋ/", "B2", "làm việc từ xa", "performing one's job outside a traditional office", "Remote working has reshaped commuting patterns.", "Work & Career", "noun", ["teleworking"], ["embrace remote working"]),
  w("gig economy", "/ɡɪɡ ɪˈkɒn.ə.mi/", "C1", "kinh tế ngắn hạn", "labour market dominated by short-term contracts", "Riders in the gig economy lack traditional benefits.", "Work & Career", "noun", [], ["gig-economy workers"]),
  w("workplace diversity", "/ˈwɜːk.pleɪs daɪˈvɜː.sə.ti/", "B2", "đa dạng nơi làm việc", "presence of varied backgrounds in employees", "Workplace diversity is linked to better innovation outcomes.", "Work & Career", "noun", [], ["promote workplace diversity"]),
  w("upskilling", "/ˌʌpˈskɪl.ɪŋ/", "C1", "nâng cao kỹ năng", "teaching employees new advanced skills", "Continuous upskilling protects workers from automation.", "Work & Career", "noun", ["reskilling"], ["invest in upskilling"]),
  w("work-life balance", "/wɜːk laɪf ˈbæl.əns/", "B2", "cân bằng công việc – cuộc sống", "the equilibrium between work and personal life", "Flexible hours help employees maintain work-life balance.", "Work & Career", "noun", [], ["healthy work-life balance"]),

  // Economy
  w("inflation", "/ɪnˈfleɪ.ʃən/", "B2", "lạm phát", "general rise in prices", "Soaring inflation erodes household purchasing power.", "Economy", "noun", [], ["curb inflation"]),
  w("recession", "/rɪˈseʃ.ən/", "B2", "suy thoái kinh tế", "period of temporary economic decline", "The country entered recession after two contracting quarters.", "Economy", "noun", ["downturn"], ["deep recession"]),
  w("disposable income", "/dɪˈspəʊ.zə.bəl ˈɪn.kʌm/", "C1", "thu nhập khả dụng", "money left after taxes for spending or saving", "Rising rents leave families with little disposable income.", "Economy", "noun", [], ["limited disposable income"]),
  w("subsidy", "/ˈsʌb.sə.di/", "C1", "trợ cấp", "government financial support", "Fuel subsidies disproportionately benefit wealthier drivers.", "Economy", "noun", ["grant"], ["agricultural subsidy"]),
  w("free-market", "/ˌfriːˈmɑː.kɪt/", "B2", "thị trường tự do", "economy with minimal state intervention", "Free-market policies fuelled the 1990s tech boom.", "Economy", "adj", [], ["free-market reforms"]),

  // Crime & Law
  w("rehabilitation", "/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/", "C1", "tái hòa nhập", "restoring an offender to a useful life", "Nordic prisons emphasise rehabilitation over punishment.", "Crime & Law", "noun", [], ["offender rehabilitation"]),
  w("deterrent", "/dɪˈter.ənt/", "C1", "biện pháp răn đe", "something that discourages action", "Stricter fines act as a deterrent to careless driving.", "Crime & Law", "noun", [], ["effective deterrent"]),
  w("civil liberties", "/ˈsɪv.əl ˈlɪb.ə.tiz/", "C1", "các quyền tự do dân sự", "individual rights protected by law", "Surveillance laws often clash with civil liberties.", "Crime & Law", "noun", [], ["defend civil liberties"]),
  w("juvenile delinquency", "/ˈdʒuː.və.naɪl dɪˈlɪŋ.kwən.si/", "C1", "tội phạm vị thành niên", "criminal behaviour by minors", "Mentoring schemes have reduced juvenile delinquency.", "Crime & Law", "noun", [], ["tackle juvenile delinquency"]),
  w("white-collar crime", "/waɪt ˈkɒl.ə kraɪm/", "C1", "tội phạm cổ trắng", "non-violent financially motivated crime", "Regulators have stepped up white-collar crime investigations.", "Crime & Law", "noun", [], ["prosecute white-collar crime"]),

  // Media & Communication
  w("echo chamber", "/ˈek.əʊ ˈtʃeɪm.bər/", "C1", "buồng vọng âm thông tin", "environment where one only hears agreeing views", "Algorithms can trap users in ideological echo chambers.", "Media & Communication", "noun", [], ["online echo chamber"]),
  w("clickbait", "/ˈklɪk.beɪt/", "C1", "tiêu đề câu kéo", "sensational content designed to attract clicks", "Tabloid sites rely heavily on clickbait headlines.", "Media & Communication", "noun", [], ["misleading clickbait"]),
  w("media literacy", "/ˈmiː.di.ə ˈlɪt.ər.ə.si/", "B2", "kỹ năng đọc hiểu truyền thông", "ability to evaluate media content critically", "Schools should embed media literacy across the curriculum.", "Media & Communication", "noun", [], ["teach media literacy"]),
  w("propaganda", "/ˌprɒp.əˈɡæn.də/", "C1", "tuyên truyền", "biased information used to promote a cause", "State propaganda masked the scale of the disaster.", "Media & Communication", "noun", [], ["wartime propaganda"]),

  // Culture & Arts
  w("cultural appropriation", "/ˈkʌl.tʃər.əl əˌprəʊ.priˈeɪ.ʃən/", "C1", "chiếm dụng văn hóa", "use of another culture's elements without respect", "Fashion brands face backlash over cultural appropriation.", "Culture & Arts", "noun", [], ["accusations of cultural appropriation"]),
  w("heritage", "/ˈher.ɪ.tɪdʒ/", "B2", "di sản", "traditions or buildings passed down generations", "UNESCO protects sites of outstanding cultural heritage.", "Culture & Arts", "noun", ["legacy"], ["cultural heritage"]),
  w("avant-garde", "/ˌæv.ɒ̃ˈɡɑːd/", "C2", "tiên phong (nghệ thuật)", "experimental or radically innovative artists", "Berlin remains a magnet for avant-garde performers.", "Culture & Arts", "adj", ["experimental"], ["avant-garde cinema"]),

  // Tourism & Travel
  w("ecotourism", "/ˌiː.kəʊˈtʊə.rɪ.zəm/", "C1", "du lịch sinh thái", "responsible travel to natural areas", "Costa Rica has built its brand around ecotourism.", "Tourism & Travel", "noun", [], ["sustainable ecotourism"]),
  w("overtourism", "/ˌəʊ.vəˈtʊə.rɪ.zəm/", "C1", "quá tải du lịch", "excessive numbers of tourists at one site", "Venice has introduced fees to curb overtourism.", "Tourism & Travel", "noun", [], ["combat overtourism"]),

  // Migration & Identity
  w("integration", "/ˌɪn.tɪˈɡreɪ.ʃən/", "B2", "hòa nhập", "the process of becoming part of a community", "Language classes accelerate the integration of newcomers.", "Migration & Identity", "noun", [], ["successful integration"]),
  w("xenophobia", "/ˌzen.əˈfəʊ.bi.ə/", "C1", "bài ngoại", "dislike or prejudice against people from other countries", "Economic downturns can fuel xenophobia.", "Migration & Identity", "noun", [], ["rising xenophobia"]),
  w("brain drain", "/breɪn dreɪn/", "C1", "chảy máu chất xám", "emigration of highly skilled people", "Better incentives can reverse the brain drain.", "Migration & Identity", "noun", [], ["reverse the brain drain"]),
];

export default ieltsVocabExpansion2;
