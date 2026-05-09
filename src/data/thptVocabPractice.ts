/**
 * @file thptVocabPractice.ts
 * @description Per-theme vocabulary EXPANSION + a short practice quiz attached to each
 *              vocab theme on the THPT Essential Review page. Keyed by theme `id`
 *              so the page can merge extra words into the existing themes and render
 *              an inline mini-quiz right under each set of words.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface VocabWord {
  en: string;
  pos: string;
  vi: string;
  example: string;
}

export interface VocabQuizItem {
  q: string;
  options: string[];
  answer: number; // index 0-3
  explanation: string;
}

export interface VocabThemePractice {
  /** Extra vocabulary words to merge into the theme (appended after existing words). */
  extraWords: VocabWord[];
  /** Short MCQ quiz tightly tied to the theme's vocabulary. */
  quiz: VocabQuizItem[];
}

/**
 * Keyed by VocabTheme.id. The page merges these into `allVocabThemes`
 * and renders the quiz right below the word grid.
 */
export const thptVocabPracticeByTheme: Record<string, VocabThemePractice> = {
  // ───────── 1. Education & Learning ─────────
  education: {
    extraWords: [
      { en: "diploma", pos: "n", vi: "bằng tốt nghiệp", example: "He proudly received his high school diploma." },
      { en: "discipline", pos: "n", vi: "kỷ luật / môn học", example: "Self-discipline is essential for online learners." },
      { en: "enroll in", pos: "phr.v", vi: "ghi danh học", example: "She enrolled in an English course last summer." },
      { en: "tutor", pos: "n/v", vi: "gia sư / kèm cặp", example: "Mr. Hai tutors many Grade 12 students." },
      { en: "lecture", pos: "n", vi: "bài giảng", example: "The history lecture lasted two hours." },
      { en: "deadline", pos: "n", vi: "hạn chót", example: "We must meet the deadline for the project." },
      { en: "term / semester", pos: "n", vi: "học kỳ", example: "Final exams are at the end of each semester." },
      { en: "kindergarten", pos: "n", vi: "trường mẫu giáo", example: "My sister teaches at a kindergarten." },
    ],
    quiz: [
      { q: "Mathematics is a ___ subject in Vietnamese high schools.", options: ["voluntary", "compulsory", "optional", "elective"], answer: 1, explanation: "compulsory = bắt buộc; opposite of optional/elective." },
      { q: "She received a full ___ to study at a top university.", options: ["tuition", "fee", "scholarship", "diploma"], answer: 2, explanation: "scholarship = học bổng (free funding to study)." },
      { q: "Joining clubs is a great ___ activity.", options: ["academic", "extracurricular", "compulsory", "vocational"], answer: 1, explanation: "extracurricular = ngoại khóa (outside the official curriculum)." },
      { q: "He decided to ___ in an evening English course.", options: ["enroll", "engage", "involve", "attend"], answer: 0, explanation: "enroll in = ghi danh / đăng ký học." },
      { q: "Vietnam has a high ___ rate; most adults can read and write.", options: ["graduation", "literacy", "discipline", "diploma"], answer: 1, explanation: "literacy rate = tỉ lệ biết đọc viết." },
      { q: "Please hand ___ your essays before Friday.", options: ["on", "in", "out", "off"], answer: 1, explanation: "Phrasal verb: hand in = nộp." },
    ],
  },

  // ───────── 2. Environment & Climate Change ─────────
  environment: {
    extraWords: [
      { en: "ecosystem", pos: "n", vi: "hệ sinh thái", example: "Coral reefs form a fragile ecosystem." },
      { en: "carbon footprint", pos: "n", vi: "dấu chân carbon", example: "Cycling helps reduce your carbon footprint." },
      { en: "global warming", pos: "n", vi: "sự nóng lên toàn cầu", example: "Global warming melts polar ice caps." },
      { en: "habitat", pos: "n", vi: "môi trường sống", example: "Logging destroys the habitat of many animals." },
      { en: "preserve", pos: "v", vi: "gìn giữ", example: "We must preserve forests for future generations." },
      { en: "recycle", pos: "v", vi: "tái chế", example: "We recycle paper and plastic at school." },
      { en: "emit / emission", pos: "v / n", vi: "thải ra / sự thải", example: "Cars emit a lot of CO2 every day." },
      { en: "drought", pos: "n", vi: "hạn hán", example: "A long drought damaged the rice harvest." },
    ],
    quiz: [
      { q: "We must use ___ energy sources such as solar and wind.", options: ["renew", "renewing", "renewable", "renewed"], answer: 2, explanation: "Adjective before 'energy' → renewable." },
      { q: "Cutting down forests on a large scale is called ___.", options: ["pollution", "deforestation", "preservation", "conservation"], answer: 1, explanation: "deforestation = nạn phá rừng." },
      { q: "Many species are now ___ due to habitat loss.", options: ["dangerous", "endangered", "endanger", "danger"], answer: 1, explanation: "endangered = có nguy cơ tuyệt chủng (adjective)." },
      { q: "Greenhouse ___ trap heat in the atmosphere.", options: ["gas", "gases", "gased", "gassing"], answer: 1, explanation: "Plural: gases." },
      { q: "We should ___ paper instead of throwing it away.", options: ["reuse", "recycle", "remove", "release"], answer: 1, explanation: "recycle = tái chế (process and use again)." },
      { q: "A long ___ destroyed crops in the central region.", options: ["flood", "drought", "storm", "tide"], answer: 1, explanation: "drought = hạn hán." },
      { q: "Cycling helps reduce your carbon ___.", options: ["step", "trace", "footprint", "shadow"], answer: 2, explanation: "Fixed: carbon footprint." },
    ],
  },

  // ───────── 3. Technology & Digital Life ─────────
  technology: {
    extraWords: [
      { en: "data", pos: "n", vi: "dữ liệu", example: "Companies collect huge amounts of data daily." },
      { en: "cybersecurity", pos: "n", vi: "an ninh mạng", example: "Cybersecurity is critical for online banking." },
      { en: "smart device", pos: "n", vi: "thiết bị thông minh", example: "Modern homes are full of smart devices." },
      { en: "remote work", pos: "n", vi: "làm việc từ xa", example: "Remote work became common after 2020." },
      { en: "upgrade", pos: "v", vi: "nâng cấp", example: "I upgrade my phone every two years." },
      { en: "browse", pos: "v", vi: "lướt (web)", example: "She browses the news every morning." },
      { en: "log in / log out", pos: "phr.v", vi: "đăng nhập / đăng xuất", example: "Log out of public computers for safety." },
      { en: "addictive", pos: "adj", vi: "gây nghiện", example: "Short videos can be very addictive." },
    ],
    quiz: [
      { q: "___ intelligence is changing healthcare and education.", options: ["Artificial", "Articulate", "Artistic", "Artificially"], answer: 0, explanation: "Fixed compound: Artificial Intelligence (AI)." },
      { q: "The new app is very ___ — even children can use it.", options: ["user-friend", "user-friendly", "use-friendly", "users-friend"], answer: 1, explanation: "Compound adjective: user-friendly." },
      { q: "Many companies now hold ___ meetings instead of in-person ones.", options: ["virtual", "real", "manual", "social"], answer: 0, explanation: "virtual meeting = họp trực tuyến / ảo." },
      { q: "Spending too much time on ___ media can affect mental health.", options: ["social", "society", "sociable", "socially"], answer: 0, explanation: "Fixed compound: social media." },
      { q: "Please ___ your password every three months for safety.", options: ["change", "make", "do", "take"], answer: 0, explanation: "Collocation: change a password." },
      { q: "Short videos can be very ___ — limit your screen time.", options: ["addict", "addiction", "addictive", "addicted"], answer: 2, explanation: "Adjective describing the videos → addictive." },
      { q: "Always ___ out of public computers when you finish.", options: ["log", "sign", "key", "click"], answer: 0, explanation: "Phrasal verb: log out." },
    ],
  },

  // ───────── 4. Work & Careers ─────────
  career: {
    extraWords: [
      { en: "résumé / CV", pos: "n", vi: "sơ yếu lý lịch", example: "Update your CV before applying for a job." },
      { en: "interview", pos: "n/v", vi: "phỏng vấn", example: "She has a job interview on Monday." },
      { en: "colleague", pos: "n", vi: "đồng nghiệp", example: "I get along well with my colleagues." },
      { en: "deadline", pos: "n", vi: "hạn chót", example: "We worked overtime to meet the deadline." },
      { en: "internship", pos: "n", vi: "kỳ thực tập", example: "He did a 3-month internship at a bank." },
      { en: "earn a living", pos: "v+phr", vi: "kiếm sống", example: "He earns a living as a freelance designer." },
      { en: "vacancy", pos: "n", vi: "vị trí trống", example: "There are two vacancies in our department." },
      { en: "redundant", pos: "adj", vi: "bị cho thôi việc", example: "Many workers were made redundant last year." },
    ],
    quiz: [
      { q: "She got a ___ last week after only one year in the company.", options: ["promotion", "promote", "promoted", "promoting"], answer: 0, explanation: "Noun: a promotion = sự thăng chức." },
      { q: "Each ___ must submit a CV and a cover letter.", options: ["applicant", "applicable", "applied", "applying"], answer: 0, explanation: "applicant = người nộp đơn (noun)." },
      { q: "He earns a competitive ___ as a software engineer.", options: ["money", "salary", "wage", "fee"], answer: 1, explanation: "salary = lương cố định hằng tháng." },
      { q: "We worked overtime to ___ the deadline.", options: ["catch", "meet", "make", "do"], answer: 1, explanation: "Collocation: meet a deadline." },
      { q: "She works as a ___ designer from home.", options: ["free", "freelance", "freedom", "freely"], answer: 1, explanation: "freelance = tự do, không cố định." },
      { q: "All employees must ___ the weekly meeting.", options: ["assist", "attend", "attempt", "assistant"], answer: 1, explanation: "Collocation: attend a meeting." },
      { q: "There are two ___ in the marketing department.", options: ["vacant", "vacancies", "vacate", "vacation"], answer: 1, explanation: "Plural noun: vacancies = vị trí trống." },
    ],
  },

  // ───────── 5. Health & Lifestyle ─────────
  health: {
    extraWords: [
      { en: "physical activity", pos: "n", vi: "hoạt động thể chất", example: "Daily physical activity boosts mood and energy." },
      { en: "mental health", pos: "n", vi: "sức khỏe tinh thần", example: "Schools should pay more attention to mental health." },
      { en: "symptom", pos: "n", vi: "triệu chứng", example: "Common flu symptoms include fever and cough." },
      { en: "infectious / contagious", pos: "adj", vi: "truyền nhiễm", example: "Measles is a highly contagious disease." },
      { en: "junk food", pos: "n", vi: "đồ ăn vặt không lành mạnh", example: "Avoid junk food if you want to lose weight." },
      { en: "insomnia", pos: "n", vi: "chứng mất ngủ", example: "Stress can lead to insomnia." },
      { en: "work out", pos: "phr.v", vi: "tập luyện", example: "He works out at the gym three times a week." },
      { en: "burn calories", pos: "v+n", vi: "đốt calo", example: "Running is a great way to burn calories." },
    ],
    quiz: [
      { q: "A ___ diet keeps you energetic and healthy.", options: ["balance", "balanced", "balancing", "balances"], answer: 1, explanation: "Adjective before 'diet' → balanced." },
      { q: "Regular exercise strengthens the immune ___.", options: ["body", "system", "organ", "muscle"], answer: 1, explanation: "Fixed: immune system." },
      { q: "___ is becoming a serious health problem worldwide.", options: ["Obese", "Obesity", "Obesely", "Obesities"], answer: 1, explanation: "Subject noun: obesity = béo phì." },
      { q: "A ___ lifestyle increases the risk of heart disease.", options: ["sedentary", "sedimentary", "sentimental", "sedated"], answer: 0, explanation: "sedentary = ít vận động." },
      { q: "She tries to ___ stress by practising yoga.", options: ["take", "make", "manage", "do"], answer: 2, explanation: "Collocation: manage stress." },
      { q: "He ___ at the gym three evenings a week.", options: ["works in", "works out", "works on", "works up"], answer: 1, explanation: "Phrasal verb: work out = tập luyện." },
      { q: "Common flu ___ include cough and high fever.", options: ["signals", "symptoms", "signs", "symbols"], answer: 1, explanation: "symptoms = triệu chứng (medical context)." },
    ],
  },

  // ───────── 6. Society & Culture ─────────
  society: {
    extraWords: [
      { en: "custom", pos: "n", vi: "phong tục", example: "It is a custom to give lì xì at Tet." },
      { en: "values", pos: "n", vi: "giá trị (đạo đức)", example: "Family values are central to Vietnamese culture." },
      { en: "stereotype", pos: "n", vi: "định kiến", example: "We should challenge gender stereotypes." },
      { en: "minority", pos: "n", vi: "thiểu số", example: "Vietnam has 53 ethnic minority groups." },
      { en: "urbanization", pos: "n", vi: "đô thị hóa", example: "Urbanization is reshaping our cities." },
      { en: "immigrant", pos: "n", vi: "người nhập cư", example: "Immigrants enrich the local culture." },
      { en: "tolerance", pos: "n", vi: "sự khoan dung", example: "Religious tolerance helps people live in harmony." },
      { en: "ancestor", pos: "n", vi: "tổ tiên", example: "Vietnamese people honour their ancestors at Tet." },
    ],
    quiz: [
      { q: "Cultural ___ enriches our community life.", options: ["divers", "diverse", "diversity", "diversely"], answer: 2, explanation: "Noun: diversity = sự đa dạng." },
      { q: "Hue is recognised as a UNESCO ___ site.", options: ["heritage", "heredity", "hereditary", "heritages"], answer: 0, explanation: "Fixed: heritage site." },
      { q: "Each ___ has its own challenges and opportunities.", options: ["generate", "generation", "generating", "generations"], answer: 1, explanation: "Singular noun after 'each' → generation." },
      { q: "Religious ___ helps people of different faiths live in harmony.", options: ["tolerate", "tolerant", "tolerance", "tolerable"], answer: 2, explanation: "Noun: tolerance = sự khoan dung." },
      { q: "It is a Vietnamese ___ to give lì xì to children at Tet.", options: ["custom", "costume", "client", "comment"], answer: 0, explanation: "custom = phong tục." },
      { q: "We should challenge gender ___ in the workplace.", options: ["stereo", "stereotypes", "standards", "statures"], answer: 1, explanation: "Plural noun: stereotypes = các định kiến." },
    ],
  },

  // ───────── 7. Travel & Exploration ─────────
  travel: {
    extraWords: [
      { en: "passport", pos: "n", vi: "hộ chiếu", example: "Make sure your passport is valid for six months." },
      { en: "boarding pass", pos: "n", vi: "thẻ lên máy bay", example: "Show your boarding pass at the gate." },
      { en: "check in / check out", pos: "phr.v", vi: "nhận / trả phòng", example: "We checked into the hotel at 3 p.m." },
      { en: "guided tour", pos: "n", vi: "tour có hướng dẫn", example: "We took a guided tour of the Imperial City." },
      { en: "local cuisine", pos: "n", vi: "ẩm thực địa phương", example: "Don't miss the local cuisine in Hue." },
      { en: "off the beaten track", pos: "idiom", vi: "ít người biết đến", example: "Pu Luong is off the beaten track but stunning." },
      { en: "backpacker", pos: "n", vi: "du khách bụi", example: "Sapa is popular with young backpackers." },
      { en: "currency", pos: "n", vi: "tiền tệ", example: "The local currency is the Vietnamese đồng (VND)." },
    ],
    quiz: [
      { q: "Plan your ___ carefully before any long trip.", options: ["destination", "luggage", "itinerary", "souvenir"], answer: 2, explanation: "itinerary = lịch trình." },
      { q: "Book ___ early during the peak holiday season.", options: ["accommodate", "accommodation", "accommodating", "accommodated"], answer: 1, explanation: "Noun: accommodation = chỗ ở." },
      { q: "Hoi An is one of the most popular ___ attractions in Vietnam.", options: ["tour", "tourism", "tourist", "toured"], answer: 2, explanation: "Compound noun: tourist attraction." },
      { q: "Make sure your ___ is valid for at least six months.", options: ["ticket", "passport", "license", "permit"], answer: 1, explanation: "passport = hộ chiếu (required for international travel)." },
      { q: "We ___ into the hotel at 3 p.m. and started exploring.", options: ["checked in", "checked out", "checked up", "checked off"], answer: 0, explanation: "check in = nhận phòng." },
      { q: "Don't miss the ___ cuisine when you visit Hue.", options: ["local", "locale", "locally", "location"], answer: 0, explanation: "Adjective before 'cuisine' → local." },
    ],
  },

  // ───────── 8. Youth & Future ─────────
  youth: {
    extraWords: [
      { en: "self-reliant", pos: "adj", vi: "tự lập", example: "University life made her more self-reliant." },
      { en: "volunteer", pos: "n/v", vi: "tình nguyện viên / tình nguyện", example: "Many students volunteer in summer programmes." },
      { en: "career path", pos: "n", vi: "con đường sự nghiệp", example: "Choosing a career path is a big decision." },
      { en: "soft skills", pos: "n", vi: "kỹ năng mềm", example: "Soft skills are as important as academic results." },
      { en: "lifelong learning", pos: "n", vi: "học tập suốt đời", example: "Lifelong learning is essential in the digital age." },
      { en: "set goals", pos: "v+n", vi: "đặt mục tiêu", example: "Set realistic goals to stay motivated." },
      { en: "overcome difficulties", pos: "v+n", vi: "vượt qua khó khăn", example: "She overcame many difficulties to succeed." },
      { en: "make a difference", pos: "idiom", vi: "tạo nên sự khác biệt", example: "Even small actions can make a difference." },
    ],
    quiz: [
      { q: "Public speaking helps build ___-confidence.", options: ["self", "selfish", "selfless", "selves"], answer: 0, explanation: "Compound: self-confidence." },
      { q: "___ is the key to long-term success.", options: ["Persevere", "Persevering", "Perseverance", "Perseveringly"], answer: 2, explanation: "Subject noun: Perseverance = sự kiên trì." },
      { q: "Teachers are positive ___ for students to follow.", options: ["models role", "role models", "role model", "models of role"], answer: 1, explanation: "Plural compound: role models." },
      { q: "Every student has great ___ if given the chance.", options: ["potency", "potential", "potentially", "potent"], answer: 1, explanation: "Noun: potential = tiềm năng." },
      { q: "Set ___ goals if you want to stay motivated all year.", options: ["real", "really", "realism", "realistic"], answer: 3, explanation: "Adjective before 'goals' → realistic." },
      { q: "She ___ many difficulties to become a doctor.", options: ["overlooked", "overcame", "oversaw", "overheard"], answer: 1, explanation: "overcome difficulties = vượt qua khó khăn (past = overcame)." },
      { q: "Even small actions can ___ a difference in society.", options: ["do", "make", "take", "have"], answer: 1, explanation: "Idiom: make a difference." },
    ],
  },

  // ───────── 9. Collocations: Common Prepositions ─────────
  "collocations-prepositions": {
    extraWords: [
      { en: "agree with / on", pos: "v+prep", vi: "đồng ý với / về", example: "I agree with you on that point." },
      { en: "believe in", pos: "v+prep", vi: "tin vào", example: "She believes in hard work and patience." },
      { en: "deal with", pos: "v+prep", vi: "giải quyết", example: "Teachers must deal with many situations daily." },
      { en: "focus on", pos: "v+prep", vi: "tập trung vào", example: "Let's focus on the main idea of the passage." },
      { en: "be different from", pos: "adj+prep", vi: "khác với", example: "Vietnamese culture is different from Western culture." },
      { en: "be similar to", pos: "adj+prep", vi: "giống với", example: "Smartphones are similar to mini computers." },
      { en: "be jealous of", pos: "adj+prep", vi: "ghen tị với", example: "Don't be jealous of others' success." },
      { en: "apologise to sb for sth", pos: "v+phr", vi: "xin lỗi ai vì điều gì", example: "He apologised to her for being late." },
    ],
    quiz: [
      { q: "Mr. Hai always tells us to ___ on the question first.", options: ["focus", "focuses", "focusing", "focal"], answer: 0, explanation: "Bare verb after 'to' → focus on." },
      { q: "She apologised ___ me ___ being late.", options: ["with / for", "to / for", "for / about", "to / about"], answer: 1, explanation: "Fixed: apologise to sb for sth." },
      { q: "Vietnamese culture is quite different ___ Western culture.", options: ["with", "than", "from", "of"], answer: 2, explanation: "Fixed: different from." },
      { q: "I totally agree ___ you ___ that issue.", options: ["with / on", "to / about", "with / about", "to / on"], answer: 0, explanation: "Fixed: agree with sb on sth." },
      { q: "Don't be jealous ___ your classmates' achievements.", options: ["from", "with", "of", "to"], answer: 2, explanation: "Fixed: be jealous of." },
      { q: "She believes ___ the power of education.", options: ["on", "in", "at", "for"], answer: 1, explanation: "Fixed: believe in." },
    ],
  },

  // ───────── 10. Collocations: Money & Time ─────────
  "collocations-money-time": {
    extraWords: [
      { en: "borrow / lend", pos: "v", vi: "mượn / cho mượn", example: "Can I borrow your dictionary? — Yes, I'll lend it to you." },
      { en: "be in debt", pos: "phr", vi: "mắc nợ", example: "He is in debt after buying a new car." },
      { en: "be worth + N/Ving", pos: "phr", vi: "đáng giá / xứng đáng", example: "This book is worth reading twice." },
      { en: "go bankrupt", pos: "v", vi: "phá sản", example: "Many shops went bankrupt during the pandemic." },
      { en: "from time to time", pos: "idiom", vi: "thỉnh thoảng", example: "From time to time, I visit my hometown." },
      { en: "in the long run", pos: "idiom", vi: "về lâu dài", example: "Studying English helps you in the long run." },
      { en: "behind schedule", pos: "phr", vi: "chậm tiến độ", example: "The project is two weeks behind schedule." },
      { en: "ahead of time", pos: "phr", vi: "sớm hơn dự kiến", example: "Submit your assignment ahead of time if possible." },
    ],
    quiz: [
      { q: "Make sure you arrive ___ time for the interview.", options: ["in", "on", "at", "by"], answer: 1, explanation: "on time = đúng giờ; in time = kịp giờ." },
      { q: "He ___ a living as a freelance designer.", options: ["does", "makes", "earns", "takes"], answer: 2, explanation: "Collocation: earn a living." },
      { q: "We're ___ out of time before the deadline.", options: ["got", "made", "running", "took"], answer: 2, explanation: "Collocation: run out of (time / money)." },
      { q: "I can't ___ to buy that smartphone right now.", options: ["pay", "spend", "afford", "cost"], answer: 2, explanation: "Collocation: afford to + V." },
      { q: "She read a magazine to ___ time at the airport.", options: ["save", "spend", "kill", "waste"], answer: 2, explanation: "Idiom: kill time = giết thời gian." },
      { q: "Studying English seriously will help you ___ the long run.", options: ["on", "at", "in", "by"], answer: 2, explanation: "Idiom: in the long run = về lâu dài." },
      { q: "This book is well ___ reading twice.", options: ["worth", "worthy", "worthful", "worthwhile"], answer: 0, explanation: "Pattern: be worth + Ving." },
    ],
  },

  // ───────── 11. Extra Vocabulary: Education & Exams ─────────
  "vocab-education-extra": {
    extraWords: [
      { en: "fail an exam", pos: "v+n", vi: "trượt kỳ thi", example: "He failed the maths exam and had to retake it." },
      { en: "retake an exam", pos: "v+n", vi: "thi lại", example: "Students who fail can retake the exam in August." },
      { en: "mock test", pos: "n", vi: "đề thi thử", example: "Take many mock tests before the real THPT exam." },
      { en: "open-book exam", pos: "n", vi: "thi mở sách", example: "Some university courses use open-book exams." },
      { en: "multiple-choice question", pos: "n", vi: "câu hỏi trắc nghiệm", example: "The THPT English test has 40 multiple-choice questions." },
      { en: "essay question", pos: "n", vi: "câu hỏi tự luận", example: "The literature exam has two essay questions." },
      { en: "scholarly", pos: "adj", vi: "có tính học thuật", example: "She wrote a scholarly article on Vietnamese poetry." },
      { en: "memorize", pos: "v", vi: "học thuộc lòng", example: "Don't just memorize — try to understand the rules." },
    ],
    quiz: [
      { q: "She passed her exams ___ flying colors.", options: ["in", "with", "on", "by"], answer: 1, explanation: "Idiom: pass (an exam) with flying colors = đậu xuất sắc." },
      { q: "I had to ___ for the final exam all night long.", options: ["cram", "crawl", "crash", "crowd"], answer: 0, explanation: "cram for an exam = học gạo / nhồi nhét." },
      { q: "Students who fail must ___ the exam next month.", options: ["take back", "retake", "remake", "redo"], answer: 1, explanation: "retake an exam = thi lại." },
      { q: "Take many ___ tests before the real THPT exam to build confidence.", options: ["mock", "mocked", "mocking", "mocks"], answer: 0, explanation: "Compound noun: mock test = đề thi thử." },
      { q: "The English paper has 40 ___-choice questions.", options: ["many", "multiple", "much", "multi"], answer: 1, explanation: "Compound adjective: multiple-choice." },
      { q: "Don't just ___ the rules — try to understand them.", options: ["memorial", "memory", "memorise", "remember"], answer: 2, explanation: "Verb: memorise = học thuộc lòng." },
    ],
  },
};
