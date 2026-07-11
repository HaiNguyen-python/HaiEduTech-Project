/**
 * @file ieltsVocabExpansion3.ts
 * @description IELTS Vocabulary Expansion #3 - additional Band 7.0+ academic
 * lexis covering globalisation, energy, gender, AI, urban planning and
 * cultural heritage.
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

export const ieltsVocabExpansion3: IeltsWord[] = [
  // Globalisation & Economy
  w("supply chain", "/səˈplaɪ tʃeɪn/", "B2", "chuỗi cung ứng", "system of organisations involved in moving a product from supplier to customer", "Global supply chains were disrupted by the pandemic.", "Economy", "noun", [], ["global supply chain", "supply chain disruption"]),
  w("outsourcing", "/ˈaʊtˌsɔː.sɪŋ/", "C1", "thuê ngoài", "delegating tasks to external providers", "Outsourcing customer service overseas cut operating costs.", "Economy", "adjective", [], ["outsourcing strategy"]),
  w("protectionism", "/prəˈtek.ʃən.ɪ.zəm/", "C1", "chủ nghĩa bảo hộ", "policy of restricting imports", "Rising protectionism threatens global trade growth.", "Economy", "noun", [], ["trade protectionism"]),
  w("entrepreneurship", "/ˌɒn.trə.prəˈnɜː.ʃɪp/", "C1", "tinh thần khởi nghiệp", "the activity of starting and managing businesses", "Universities now teach entrepreneurship alongside science.", "Economy", "noun", ["enterprise"], ["foster entrepreneurship"]),

  // Energy & Environment
  w("carbon footprint", "/ˈkɑː.bən ˈfʊt.prɪnt/", "B2", "dấu chân carbon", "the amount of CO2 emissions caused by an activity or person", "Cycling to work shrinks your carbon footprint.", "Environment", "noun", [], ["reduce carbon footprint"]),
  w("greenhouse gas", "/ˈɡriːn.haʊs ɡæs/", "B2", "khí nhà kính", "gas that traps heat in the atmosphere", "Methane is a potent greenhouse gas.", "Environment", "noun", [], ["greenhouse gas emissions"]),
  w("solar panel", "/ˈsəʊ.lə ˈpæn.əl/", "B2", "tấm pin năng lượng mặt trời", "device that converts sunlight to electricity", "Rooftop solar panels can cut household bills by half.", "Environment", "noun", [], ["install solar panels"]),
  w("waste management", "/weɪst ˈmæn.ɪdʒ.mənt/", "B2", "quản lý chất thải", "the collection, treatment and disposal of waste", "Efficient waste management is vital in densely populated cities.", "Environment", "noun", [], ["urban waste management"]),
  w("conservation", "/ˌkɒn.səˈveɪ.ʃən/", "B2", "sự bảo tồn", "protection of nature and resources", "Conservation efforts have saved several endangered species.", "Environment", "noun", ["preservation"], ["wildlife conservation"]),

  // Technology & AI
  w("machine learning", "/məˈʃiːn ˈlɜː.nɪŋ/", "C1", "học máy", "a branch of AI in which systems learn from data", "Machine learning powers personalised recommendations.", "Technology", "noun", [], ["machine-learning model"]),
  w("data privacy", "/ˈdeɪ.tə ˈprɪv.ə.si/", "C1", "quyền riêng tư dữ liệu", "the protection of personal information", "Stronger data privacy laws are long overdue.", "Technology", "noun", [], ["data privacy regulation"]),
  w("digital divide", "/ˈdɪdʒ.ɪ.təl dɪˈvaɪd/", "C1", "khoảng cách số", "the gap between those with and without internet access", "Closing the digital divide is essential for equal opportunity.", "Technology", "noun", [], ["narrow the digital divide"]),
  w("biometric", "/ˌbaɪ.əʊˈmet.rɪk/", "C1", "sinh trắc học", "relating to body measurements used for ID", "Biometric authentication is replacing passwords.", "Technology", "adj", [], ["biometric data"]),

  // Society & Gender
  w("gender equality", "/ˈdʒen.dər ɪˈkwɒl.ə.ti/", "B2", "bình đẳng giới", "equal rights for all genders", "Sweden ranks high on gender equality indices.", "Society", "noun", [], ["promote gender equality"]),
  w("glass ceiling", "/ɡlɑːs ˈsiː.lɪŋ/", "C1", "rào cản vô hình với phụ nữ", "an invisible barrier to women's advancement", "Female executives still struggle against a glass ceiling.", "Society", "noun", [], ["shatter the glass ceiling"]),
  w("ageing population", "/ˈeɪ.dʒɪŋ ˌpɒp.jəˈleɪ.ʃən/", "B2", "dân số già hóa", "demographic with rising average age", "Japan faces challenges from an ageing population.", "Society", "noun", [], []),
  w("social mobility", "/ˈsəʊ.ʃəl məʊˈbɪl.ə.ti/", "C1", "khả năng dịch chuyển xã hội", "movement between social classes", "Education remains the strongest driver of social mobility.", "Society", "noun", [], ["upward social mobility"]),

  // Urban planning
  w("infrastructure", "/ˈɪn.frəˌstrʌk.tʃər/", "B2", "cơ sở hạ tầng", "physical structures needed for a society", "Investment in infrastructure spurs economic growth.", "Urban Planning", "noun", [], ["transport infrastructure"]),
  w("congestion", "/kənˈdʒes.tʃən/", "B2", "ùn tắc", "overcrowding, especially of traffic", "Bus lanes have eased congestion in the city centre.", "Urban Planning", "noun", ["jam"], ["traffic congestion"]),
  w("zoning", "/ˈzəʊ.nɪŋ/", "C1", "quy hoạch phân vùng", "the dividing of land into areas for specific uses", "Mixed-use zoning encourages walkable neighbourhoods.", "Urban Planning", "adjective", [], ["zoning laws"]),
  w("public transport", "/ˈpʌb.lɪk ˈtrænz.pɔːt/", "B2", "giao thông công cộng", "shared transit systems open to the public", "Affordable public transport reduces inequality.", "Urban Planning", "noun", [], ["expand public transport"]),

  // Culture & Heritage
  w("indigenous", "/ɪnˈdɪdʒ.ə.nəs/", "C1", "bản địa", "native to a particular place", "Indigenous languages risk disappearing within a generation.", "Culture & Arts", "adjective", ["native"], ["indigenous community"]),
  w("intangible heritage", "/ɪnˈtæn.dʒə.bəl ˈher.ɪ.tɪdʒ/", "C1", "di sản phi vật thể", "non-physical aspects of cultural inheritance", "Folk songs are part of a community's intangible heritage.", "Culture & Arts", "noun", [], ["safeguard intangible heritage"]),
  w("cultural exchange", "/ˈkʌl.tʃər.əl ɪksˈtʃeɪndʒ/", "B2", "giao lưu văn hóa", "sharing of cultural ideas and practices", "Student exchange programs foster cultural exchange.", "Culture & Arts", "noun", [], ["promote cultural exchange"]),

  // Health & Wellbeing
  w("mindfulness", "/ˈmaɪnd.fəl.nəs/", "C1", "chánh niệm", "the practice of being fully present", "Mindfulness has measurable effects on stress reduction.", "Health", "noun", [], ["practise mindfulness"]),
  w("preventive care", "/prɪˈven.tɪv keər/", "C1", "y tế dự phòng", "healthcare that prevents illness", "Investing in preventive care lowers long-term costs.", "Health", "noun", [], []),
  w("life expectancy", "/laɪf ɪkˈspek.tən.si/", "B2", "tuổi thọ trung bình", "average length of life", "Life expectancy has risen by ten years since 1980.", "Health", "noun", [], ["average life expectancy"]),

  // Work
  w("work-life balance", "/wɜːk laɪf ˈbæl.əns/", "B2", "cân bằng công việc-cuộc sống", "equilibrium between work and personal time", "Flexible hours improve work-life balance.", "Work & Career", "noun", [], ["maintain work-life balance"]),
  w("gig economy", "/ɡɪɡ ɪˈkɒn.ə.mi/", "C1", "kinh tế gig", "labour market based on short-term contracts", "The gig economy offers freedom but little security.", "Work & Career", "noun", [], []),
  w("career progression", "/kəˈrɪər prəˈɡreʃ.ən/", "B2", "thăng tiến nghề nghiệp", "movement upward in one's profession", "Mentorship programs accelerate career progression.", "Work & Career", "noun", [], ["clear career progression"]),
];
