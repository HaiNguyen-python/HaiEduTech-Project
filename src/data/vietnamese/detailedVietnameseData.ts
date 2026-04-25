// Detailed Vietnamese for Foreigners – Advanced curriculum data
// 5 core modules with deep bilingual dialogues, grammar breakdowns, and cultural notes

export interface GrammarPoint {
  pattern: string;
  patternEn: string;
  explanation: string;
  explanationEn: string;
  examples: { vi: string; en: string; literal?: string }[];
}

export interface AnnotatedWord {
  word: string;
  pronunciation: string;
  meaning: string;
  literal?: string;
  tone?: "ngang" | "huyen" | "sac" | "hoi" | "nga" | "nang";
}

export interface DetailedDialogueLine {
  speaker: string;
  speakerLabel: string;
  vi: string;
  en: string;
  literal?: string;
  keyWords?: AnnotatedWord[];
}

export interface PracticeExercise {
  type: "fill-blank" | "reorder" | "match";
  instruction: string;
  instructionEn: string;
  items: PracticeItem[];
}

export interface PracticeItem {
  question: string;
  questionEn?: string;
  options?: string[];
  answer: string | number;
  explanation?: string;
  explanationEn?: string;
}

export interface DetailedLesson {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  scenario: string;
  scenarioEn: string;
  dialogue: DetailedDialogueLine[];
  grammarPoints: GrammarPoint[];
  culturalNotes: { title: string; titleEn: string; content: string; contentEn: string }[];
  practice: PracticeExercise;
  toneHighlights?: AnnotatedWord[];
}

export interface DetailedModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  lessons: DetailedLesson[];
}

export const detailedVFFModules: DetailedModule[] = [
  // ═══════════════════════════════════════════════════════════
  // MODULE 1: The Art of Pronouns
  // ═══════════════════════════════════════════════════════════
  {
    id: "vff-pronouns",
    title: "Nghệ thuật Xưng hô",
    titleEn: "The Art of Pronouns",
    icon: "👥",
    color: "from-violet-500 to-purple-600",
    description: "Làm chủ hệ thống đại từ phức tạp nhất thế giới.",
    descriptionEn: "Master the world's most complex pronoun system.",
    lessons: [
      {
        id: "vff-pron-1",
        title: "Anh, Chị, Em - Nền tảng giao tiếp",
        titleEn: "Anh, Chị, Em - Foundation of Communication",
        icon: "🗣️",
        scenario: "Bạn gặp đồng nghiệp mới tại công ty.",
        scenarioEn: "You meet a new colleague at the office.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Xin chào! Tôi là David. Rất vui được gặp bạn.", en: "Hello! I'm David. Very happy to meet you.", literal: "Beg hello! I am David. Very happy receive meet you.", keyWords: [{ word: "Xin chào", pronunciation: "sin jào", meaning: "Hello (formal)", tone: "ngang" }, { word: "Rất vui", pronunciation: "rất vui", meaning: "Very happy", tone: "sac" }] },
          { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Chào anh David! Em là Linh. Em làm ở phòng Marketing.", en: "Hello David! I'm Linh. I work in the Marketing department.", literal: "Greet older-brother David! Younger-one is Linh. Younger-one work at room Marketing.", keyWords: [{ word: "anh", pronunciation: "anh", meaning: "older brother / you (male, older)", tone: "ngang" }, { word: "Em", pronunciation: "em", meaning: "I (younger person speaking to older)", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Linh bao nhiêu tuổi?", en: "How old are you, Linh?", literal: "Linh how-many age?" },
          { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Dạ, em 25 tuổi. Còn anh?", en: "I'm 25. And you?", literal: "Polite-yes, younger-one 25 age. Remain older-brother?", keyWords: [{ word: "Dạ", pronunciation: "dạ", meaning: "Yes (polite, Southern)", tone: "nang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Anh 30 tuổi. Vậy em gọi anh là 'anh' nhé?", en: "I'm 30. So you can call me 'anh', right?", literal: "Older-brother 30 age. So younger-one call older-brother is 'anh' ok?" },
          { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Dạ vâng! Anh làm ở phòng nào ạ?", en: "Yes! Which department do you work in?", literal: "Polite-yes agree! Older-brother work at room which polite?", keyWords: [{ word: "ạ", pronunciation: "ạ", meaning: "polite particle (added to show respect)", tone: "nang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Anh làm ở phòng IT. Em có cần giúp gì không?", en: "I work in IT. Do you need any help?", literal: "Older-brother work at room IT. Younger-one have need help what not?" },
          { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Dạ có! Máy tính em bị lỗi. Anh giúp em được không ạ?", en: "Yes! My computer has an error. Can you help me?", literal: "Polite-yes have! Machine-calculate younger-one receive error. Older-brother help younger-one receive not polite?" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Được chứ! Để anh xem nhé.", en: "Of course! Let me take a look.", literal: "Receive certainly! Let older-brother see ok." },
          { speaker: "Colleague", speakerLabel: "Đồng nghiệp", vi: "Cảm ơn anh nhiều! Anh tốt quá!", en: "Thank you so much! You're so kind!", literal: "Feel-grace older-brother much! Older-brother good too-much!" },
        ],
        grammarPoints: [
          {
            pattern: "Anh / Chị / Em",
            patternEn: "Anh / Chị / Em pronoun system",
            explanation: "Tiếng Việt không có 'I' hay 'You' cố định. Đại từ thay đổi theo tuổi, giới tính và mối quan hệ.",
            explanationEn: "Vietnamese has no fixed 'I' or 'You'. Pronouns change based on age, gender, and relationship.",
            examples: [
              { vi: "Em chào anh.", en: "I (younger) greet you (older male).", literal: "Younger-one greet older-brother." },
              { vi: "Chị ơi, cho em hỏi.", en: "Excuse me, ma'am, may I ask.", literal: "Older-sister hey, give younger-one ask." },
              { vi: "Anh là sinh viên.", en: "I (older male) am a student.", literal: "Older-brother is student." },
            ],
          },
          {
            pattern: "Dạ / Vâng + ạ",
            patternEn: "Polite particles: Dạ / Vâng + ạ",
            explanation: "'Dạ' (miền Nam) và 'Vâng' (miền Bắc) = 'Yes' lịch sự. 'Ạ' thêm vào cuối câu để tôn trọng.",
            explanationEn: "'Dạ' (South) and 'Vâng' (North) = polite 'Yes'. 'Ạ' is added at the end of sentences to show respect.",
            examples: [
              { vi: "Dạ, em hiểu rồi ạ.", en: "Yes, I understand (politely).", literal: "Polite-yes, younger-one understand already polite." },
              { vi: "Vâng, cháu chào bác ạ.", en: "Yes, hello uncle/aunt (very politely).", literal: "Polite-yes, grandchild greet uncle polite." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Tại sao phải hỏi tuổi?",
            titleEn: "Why do Vietnamese ask your age?",
            content: "Hỏi tuổi KHÔNG phải là bất lịch sự ở Việt Nam. Đó là cách để xác định đại từ xưng hô phù hợp. Nếu không biết tuổi, người Việt không biết nên gọi bạn là 'anh', 'chị', hay 'em'.",
            contentEn: "Asking age is NOT rude in Vietnam. It's how people determine the correct pronouns to use. Without knowing your age, Vietnamese people can't decide whether to call you 'anh' (older brother), 'chị' (older sister), or 'em' (younger sibling).",
          },
          {
            title: "Gọi 'Em' cho phục vụ nhà hàng",
            titleEn: "Calling a waitress 'Em'",
            content: "Ở nhà hàng, bạn gọi nhân viên phục vụ là 'Em' (kể cả khi họ lớn tuổi hơn bạn) vì đó là cách thể hiện sự lịch sự của khách hàng. Ngược lại, họ sẽ gọi bạn là 'Anh/Chị'.",
            contentEn: "At restaurants, you call the server 'Em' (even if they're older than you) because it's the polite customer role. In return, they'll call you 'Anh/Chị' (sir/ma'am).",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Điền đại từ phù hợp vào chỗ trống.",
          instructionEn: "Fill in the correct pronoun.",
          items: [
            { question: "Bạn 25 tuổi, đồng nghiệp 30 tuổi (nam). Bạn nói: '_____ ơi, giúp _____ với!'", questionEn: "You're 25, your male colleague is 30. You say:", answer: "Anh ơi, giúp em với!", explanation: "Người nhỏ tuổi gọi người lớn tuổi hơn (nam) là 'Anh', tự xưng 'Em'.", explanationEn: "A younger person calls an older male 'Anh' and refers to themselves as 'Em'." },
            { question: "Bạn vào nhà hàng, gọi nhân viên phục vụ: '_____ ơi, cho _____ xem menu!'", questionEn: "At a restaurant, you call the server:", answer: "Em ơi, cho anh/chị xem menu!", explanation: "Khách hàng gọi phục vụ là 'Em', tự xưng 'Anh/Chị'.", explanationEn: "Customers call servers 'Em' and refer to themselves as 'Anh/Chị'." },
            { question: "Bạn gặp bà ngoại của bạn bè. Bạn nói: '_____ chào _____ ạ!'", questionEn: "You meet your friend's grandmother. You say:", answer: "Cháu chào bà ạ!", explanation: "'Cháu' = tự xưng khi nói với người lớn tuổi, 'Bà' = bà/bà ngoại.", explanationEn: "'Cháu' = I (to elders), 'Bà' = grandmother/elderly woman." },
          ],
        },
        toneHighlights: [
          { word: "Dạ", pronunciation: "dạ", meaning: "Yes (polite)", tone: "nang" },
          { word: "ạ", pronunciation: "ạ", meaning: "polite particle", tone: "nang" },
          { word: "chào", pronunciation: "jào", meaning: "greet", tone: "huyen" },
          { word: "tuổi", pronunciation: "tuổi", meaning: "age", tone: "hoi" },
        ],
      },
      {
        id: "vff-pron-2",
        title: "Cô, Chú, Bác - Đại từ gia đình mở rộng",
        titleEn: "Cô, Chú, Bác - Extended Family Pronouns",
        icon: "👨‍👩‍👧‍👦",
        scenario: "Bạn đến nhà bạn bè Việt Nam chơi và gặp gia đình họ.",
        scenarioEn: "You visit a Vietnamese friend's home and meet their family.",
        dialogue: [
          { speaker: "Friend", speakerLabel: "Bạn bè", vi: "David ơi, vào nhà đi! Để mình giới thiệu gia đình.", en: "David, come in! Let me introduce my family.", literal: "David hey, enter house go! Let self introduce family." },
          { speaker: "Friend", speakerLabel: "Bạn bè", vi: "Đây là ba mình. Ba ơi, đây là David, bạn con.", en: "This is my dad. Dad, this is David, my friend.", literal: "Here is father self. Father hey, here is David, friend child." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cháu chào bác ạ! Cháu là David.", en: "Hello, sir! I'm David.", literal: "Grandchild greet uncle polite! Grandchild is David.", keyWords: [{ word: "bác", pronunciation: "bác", meaning: "uncle/aunt (parent's older sibling or polite for older adults)", tone: "sac" }, { word: "Cháu", pronunciation: "cháu", meaning: "I (speaking to elders)", tone: "sac" }] },
          { speaker: "Father", speakerLabel: "Ba bạn", vi: "Chào cháu! Cháu nói tiếng Việt giỏi quá!", en: "Hello! You speak Vietnamese so well!", literal: "Greet grandchild! Grandchild speak language Vietnamese skilled too-much!" },
          { speaker: "Friend", speakerLabel: "Bạn bè", vi: "Còn đây là mẹ mình. Mẹ ơi!", en: "And this is my mom. Mom!", literal: "Remain here is mother self. Mother hey!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cháu chào bác gái ạ! Rất vui được gặp bác.", en: "Hello, auntie! Very happy to meet you.", literal: "Grandchild greet uncle female polite! Very happy receive meet uncle.", keyWords: [{ word: "bác gái", pronunciation: "bác gái", meaning: "aunt (wife of father's older brother, or polite)", tone: "sac" }] },
          { speaker: "Mother", speakerLabel: "Mẹ bạn", vi: "Chào cháu! Cháu ăn cơm chưa? Bác nấu phở, cháu ăn nhé!", en: "Hello dear! Have you eaten yet? I made phở, please eat!", literal: "Greet grandchild! Grandchild eat rice yet? Uncle cook phở, grandchild eat ok!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ cháu cảm ơn bác! Phở bác nấu chắc ngon lắm.", en: "Thank you, auntie! Your phở must be very delicious.", literal: "Polite-yes grandchild feel-grace uncle! Phở uncle cook surely delicious very." },
          { speaker: "Friend", speakerLabel: "Bạn bè", vi: "Và đây là em gái mình, Hương. Năm nay nó 15 tuổi.", en: "And this is my younger sister, Hương. She's 15 this year.", literal: "And here is younger-sister self, Hương. Year this it 15 age." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Chào em Hương! Em học lớp mấy rồi?", en: "Hi Hương! What grade are you in?", literal: "Greet younger Hương! Younger study class how-many already?", keyWords: [{ word: "lớp mấy", pronunciation: "lớp mấy", meaning: "what grade/class", tone: "sac" }] },
        ],
        grammarPoints: [
          {
            pattern: "Bác / Cô / Chú / Dì",
            patternEn: "Uncle/Aunt pronouns in Vietnamese",
            explanation: "Bác = anh/chị của bố hoặc mẹ (lớn hơn bố/mẹ). Chú = em trai của bố. Cô = em gái của bố. Dì = em gái của mẹ. Cậu = em trai của mẹ.",
            explanationEn: "Bác = parent's older sibling. Chú = father's younger brother. Cô = father's younger sister. Dì = mother's younger sister. Cậu = mother's younger brother.",
            examples: [
              { vi: "Cháu chào chú ạ!", en: "Hello, uncle! (to father's younger brother)", literal: "Grandchild greet father's-younger-brother polite!" },
              { vi: "Cô ơi, cô khỏe không ạ?", en: "Auntie, how are you? (to father's younger sister)", literal: "Father's-younger-sister hey, father's-younger-sister healthy not polite?" },
            ],
          },
          {
            pattern: "Ơi - Hô ngữ (Vocative particle)",
            patternEn: "'Ơi' - The calling particle",
            explanation: "'Ơi' dùng sau tên hoặc đại từ để gọi ai đó, giống 'Hey' nhưng lịch sự hơn.",
            explanationEn: "'Ơi' is placed after a name or pronoun to call someone - like 'Hey' but more polite.",
            examples: [
              { vi: "Mẹ ơi!", en: "Mom!", literal: "Mother hey!" },
              { vi: "Em ơi, cho anh hỏi.", en: "Excuse me, may I ask.", literal: "Younger hey, give older-brother ask." },
              { vi: "David ơi, lại đây!", en: "David, come here!", literal: "David hey, come here!" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "'Ăn cơm chưa?' - Lời chào bằng thức ăn",
            titleEn: "'Have you eaten yet?' - Greeting with food",
            content: "Khi người Việt hỏi 'Ăn cơm chưa?', họ KHÔNG thật sự hỏi bạn đã ăn chưa. Đó là cách chào thể hiện sự quan tâm, giống như 'How are you?' trong tiếng Anh. Câu trả lời đúng là 'Dạ, cháu ăn rồi ạ' (vâng, cháu đã ăn) hoặc 'Dạ, chưa ạ' (chưa).",
            contentEn: "When Vietnamese ask 'Have you eaten yet?', they DON'T literally want to know. It's a caring greeting, like 'How are you?' in English. The correct answer is 'Dạ, cháu ăn rồi ạ' (yes, I've eaten) or 'Dạ, chưa ạ' (not yet).",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Điền đại từ phù hợp khi gặp các thành viên gia đình bạn bè.",
          instructionEn: "Fill in the correct pronoun when meeting your friend's family members.",
          items: [
            { question: "Gặp bố của bạn (lớn tuổi hơn bố bạn): '_____ chào _____ ạ!'", answer: "Cháu chào bác ạ!", explanationEn: "Use 'Cháu' for yourself and 'Bác' for your friend's father." },
            { question: "Gặp em gái 10 tuổi của bạn: 'Chào _____ ! _____ tên gì?'", answer: "Chào em! Em tên gì?", explanationEn: "Use 'Em' for a younger person." },
            { question: "Bạn muốn gọi bạn bè: '_____ ơi, đi ăn phở không?'", answer: "Ê/Mình ơi, đi ăn phở không?", explanationEn: "Use friend's name + ơi, or 'Mình ơi' between close friends." },
          ],
        },
      },
      // Lesson 3: Workplace Titles
      {
        id: "vff-pron-3",
        title: "Thầy, Cô, Bác sĩ - Đại từ nghề nghiệp",
        titleEn: "Thầy, Cô, Doctor - Professional Title Pronouns",
        icon: "🎓",
        scenario: "Bạn đi khám bệnh và gặp bác sĩ, y tá.",
        scenarioEn: "You visit a hospital and interact with a doctor and nurse.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Em chào bác sĩ ạ! Em bị đau bụng hai ngày rồi.", en: "Hello, doctor! I've had a stomachache for two days.", literal: "Younger greet doctor polite! Younger receive pain belly two day already.", keyWords: [{ word: "bác sĩ", pronunciation: "bác sĩ", meaning: "doctor", tone: "sac" }, { word: "đau bụng", pronunciation: "đau bụng", meaning: "stomachache", tone: "nang" }] },
          { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Chào em! Em ngồi đây nhé. Để bác sĩ khám cho em.", en: "Hello! Sit here please. Let me examine you.", literal: "Greet younger! Younger sit here ok. Let doctor examine for younger." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ, em cảm ơn bác sĩ ạ.", en: "Thank you, doctor.", literal: "Polite-yes, younger feel-grace doctor polite." },
          { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Em có bị sốt không? Ăn uống có bình thường không?", en: "Do you have a fever? Is your eating normal?", literal: "Younger have receive fever not? Eat drink have normal not?", keyWords: [{ word: "sốt", pronunciation: "sốt", meaning: "fever", tone: "sac" }, { word: "bình thường", pronunciation: "bình thường", meaning: "normal", tone: "huyen" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ em không sốt, nhưng hôm qua em ăn hải sản, sau đó bị đau.", en: "No fever, but yesterday I ate seafood and then had pain.", literal: "Polite-yes younger not fever, but day yesterday younger eat sea-product, after that receive pain." },
          { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Có thể em bị ngộ độc thực phẩm. Bác sĩ kê thuốc cho em nhé.", en: "You might have food poisoning. I'll prescribe medicine for you.", literal: "Have can younger receive mistake poison food-product. Doctor write medicine for younger ok.", keyWords: [{ word: "ngộ độc", pronunciation: "ngộ độc", meaning: "poisoning", tone: "nang" }, { word: "kê thuốc", pronunciation: "kê thuốc", meaning: "prescribe medicine", tone: "sac" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ em cảm ơn bác sĩ! Em lấy thuốc ở đâu ạ?", en: "Thank you doctor! Where do I pick up the medicine?", literal: "Polite-yes younger feel-grace doctor! Younger take medicine at where polite?" },
          { speaker: "Doctor", speakerLabel: "Bác sĩ", vi: "Em ra quầy thuốc tầng 1. Nhớ uống thuốc đúng giờ nhé!", en: "Go to the pharmacy on floor 1. Remember to take medicine on time!", literal: "Younger go-out counter medicine floor 1. Remember drink medicine correct hour ok!" },
        ],
        grammarPoints: [
          {
            pattern: "Bác sĩ / Thầy / Cô (Title as pronoun)",
            patternEn: "Using professional titles as pronouns",
            explanation: "Ở Việt Nam, chức danh nghề nghiệp được dùng thay cho đại từ: Bác sĩ, Thầy (thầy giáo), Cô (cô giáo), Luật sư...",
            explanationEn: "In Vietnam, professional titles replace pronouns: Bác sĩ (Doctor), Thầy (male teacher), Cô (female teacher), Luật sư (Lawyer)...",
            examples: [
              { vi: "Em chào thầy ạ!", en: "Hello, teacher! (male)", literal: "Younger greet teacher polite!" },
              { vi: "Cô ơi, cho em hỏi bài.", en: "Teacher (female), may I ask about the lesson?", literal: "Teacher hey, give younger ask lesson." },
              { vi: "Bác sĩ kê thuốc cho em.", en: "Doctor prescribes medicine for me.", literal: "Doctor write medicine for younger." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Văn hóa 'Tôn sư trọng đạo'",
            titleEn: "'Respect teachers, value education' culture",
            content: "Người Việt rất kính trọng giáo viên và bác sĩ. Ngày 20/11 hàng năm là 'Ngày Nhà giáo Việt Nam' - học sinh tặng hoa và quà cho thầy cô. Khi gặp bác sĩ, luôn dùng 'Dạ/Vâng' và 'ạ' để thể hiện sự tôn trọng.",
            contentEn: "Vietnamese deeply respect teachers and doctors. November 20th is 'Vietnamese Teachers' Day' - students give flowers and gifts to teachers. When meeting doctors, always use 'Dạ/Vâng' and 'ạ' to show respect.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Điền đại từ/chức danh phù hợp.",
          instructionEn: "Fill in the correct title/pronoun.",
          items: [
            { question: "Ở bệnh viện, bạn nói: 'Em chào _____ ạ!'", answer: "bác sĩ", explanationEn: "Use the professional title 'bác sĩ' (doctor) as a pronoun." },
            { question: "Ở trường học, bạn nói: '_____ ơi, cho em hỏi bài!'", answer: "Thầy/Cô", explanationEn: "Use 'Thầy' for male teacher, 'Cô' for female teacher." },
            { question: "Bác sĩ nói: 'Nhớ uống thuốc _____ giờ nhé!' (on time)", answer: "đúng", explanationEn: "'Đúng giờ' = on time" },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 2: Street Food Culture
  // ═══════════════════════════════════════════════════════════
  {
    id: "vff-streetfood",
    title: "Ẩm thực Đường phố",
    titleEn: "Street Food Culture",
    icon: "🍜",
    color: "from-red-500 to-orange-600",
    description: "Gọi phở, ăn bánh mì, và trải nghiệm vỉa hè Việt Nam.",
    descriptionEn: "Order phở, eat bánh mì, and experience Vietnamese sidewalk dining.",
    lessons: [
      {
        id: "vff-food-pho",
        title: "Gọi Phở như người Việt",
        titleEn: "Ordering Phở Like a Local",
        icon: "🍲",
        scenario: "Bạn vào một quán phở bình dân ở Hà Nội.",
        scenarioEn: "You enter a popular phở shop in Hanoi.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Em ơi, cho anh xem thực đơn!", en: "Excuse me, can I see the menu?", literal: "Younger hey, give older-brother see food-list!" },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ, quán em có phở bò và phở gà. Anh dùng gì ạ?", en: "We have beef phở and chicken phở. What would you like?", literal: "Polite-yes, shop younger have phở cow and phở chicken. Older-brother use what polite?", keyWords: [{ word: "phở bò", pronunciation: "fuh bò", meaning: "beef phở", tone: "huyen" }, { word: "phở gà", pronunciation: "fuh gà", meaning: "chicken phở", tone: "huyen" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cho anh một tô phở bò chín. Không hành, thêm nhiều giá nhé.", en: "Give me a bowl of well-done beef phở. No onions, extra bean sprouts please.", literal: "Give older-brother one bowl phở cow well-done. Not onion, add much bean-sprouts ok.", keyWords: [{ word: "chín", pronunciation: "chín", meaning: "well-done (cooked)", tone: "sac" }, { word: "giá", pronunciation: "giá", meaning: "bean sprouts", tone: "sac" }] },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ được. Anh ăn cay không ạ?", en: "Sure. Do you want it spicy?", literal: "Polite-yes receive. Older-brother eat spicy not polite?" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cay vừa thôi. À, cho thêm quẩy nữa nhé!", en: "Medium spicy. Oh, add some fried dough sticks too!", literal: "Spicy moderate only. Ah, give add fried-dough more ok!", keyWords: [{ word: "quẩy", pronunciation: "quẩy", meaning: "fried dough sticks (eaten with phở)", tone: "hoi" }, { word: "vừa", pronunciation: "vừa", meaning: "moderate/just right", tone: "huyen" }] },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ, anh đợi 5 phút ạ!", en: "Please wait 5 minutes!", literal: "Polite-yes, older-brother wait 5 minute polite!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Sau khi ăn) Ngon quá! Tính tiền cho anh nhé.", en: "(After eating) So delicious! Can I have the bill?", literal: "(After eating) Delicious too-much! Calculate money for older-brother ok.", keyWords: [{ word: "tính tiền", pronunciation: "tính tiền", meaning: "calculate money / get the bill", tone: "sac" }] },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ, tổng cộng là sáu mươi lăm nghìn đồng ạ.", en: "The total is sixty-five thousand dong.", literal: "Polite-yes, total is six-ten five thousand copper polite." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Đây ạ. Cảm ơn em! Phở ngon lắm!", en: "Here you go. Thank you! The phở was really good!", literal: "Here polite. Feel-grace younger! Phở delicious very!" },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ cảm ơn anh! Hẹn anh quay lại ạ!", en: "Thank you! Hope to see you again!", literal: "Polite-yes feel-grace older-brother! Promise older-brother turn-back polite!" },
        ],
        grammarPoints: [
          {
            pattern: "Cho + [người] + [món]",
            patternEn: "'Cho' - The ordering pattern",
            explanation: "'Cho' = 'Give me' - cách gọi món phổ biến nhất ở Việt Nam.",
            explanationEn: "'Cho' literally means 'give' - it's the most common way to order food in Vietnam.",
            examples: [
              { vi: "Cho anh một ly cà phê.", en: "Give me a cup of coffee.", literal: "Give older-brother one glass coffee." },
              { vi: "Cho em hai tô phở gà.", en: "Give me two bowls of chicken phở.", literal: "Give younger two bowl phở chicken." },
              { vi: "Cho tôi xem cái này.", en: "Let me see this.", literal: "Give I see thing this." },
            ],
          },
          {
            pattern: "Không + [noun] / Thêm + [noun]",
            patternEn: "Customizing orders: No X / Extra X",
            explanation: "'Không' = không có (bỏ đi). 'Thêm' = cho thêm. Đặt trước danh từ.",
            explanationEn: "'Không' = without/no (remove). 'Thêm' = extra/add more. Place before the noun.",
            examples: [
              { vi: "Không hành, thêm giá.", en: "No onions, extra bean sprouts.", literal: "Not onion, add bean-sprouts." },
              { vi: "Không đường, thêm đá.", en: "No sugar, extra ice.", literal: "Not sugar, add ice." },
              { vi: "Không cay, thêm rau.", en: "Not spicy, extra vegetables.", literal: "Not spicy, add vegetables." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Phở - Nghệ thuật ăn đúng cách",
            titleEn: "Phở - The art of eating it right",
            content: "Phở được phục vụ kèm đĩa rau sống (giá, húng quế, ngò gai) và gia vị (tương ớt, tương đen, chanh). Bạn tự thêm theo khẩu vị. Xé lá húng quế bằng tay, vắt chanh, và thêm ớt từ từ. ĐỪNG đổ tất cả vào một lúc!",
            contentEn: "Phở is served with a plate of fresh herbs (bean sprouts, basil, sawtooth herb) and condiments (chili sauce, hoisin, lime). You customize it yourself. Tear basil by hand, squeeze lime, and add chili gradually. DON'T dump everything in at once!",
          },
          {
            title: "'Tô' hay 'Bát'?",
            titleEn: "'Tô' vs 'Bát' - Regional bowl names",
            content: "Miền Nam gọi là 'tô phở'. Miền Bắc gọi là 'bát phở'. Cùng một thứ, khác tên gọi. Khi ở Hà Nội, nói 'bát'. Khi ở Sài Gòn, nói 'tô'.",
            contentEn: "Southerners say 'tô phở' (bowl of phở). Northerners say 'bát phở'. Same thing, different words. In Hanoi, use 'bát'. In Saigon, use 'tô'.",
          },
        ],
        practice: {
          type: "reorder",
          instruction: "Sắp xếp lại câu để gọi món phở.",
          instructionEn: "Reorder the words to place a phở order.",
          items: [
            { question: "phở / cho / bò / một / anh / tô / chín", answer: "Cho anh một tô phở bò chín", explanationEn: "Pattern: Cho + [person] + [quantity] + [classifier] + [dish]" },
            { question: "không / hành / thêm / giá / nhé", answer: "Không hành thêm giá nhé", explanationEn: "No onion, extra bean sprouts please" },
            { question: "tiền / tính / cho / anh / nhé", answer: "Tính tiền cho anh nhé", explanationEn: "Give me the bill please" },
          ],
        },
        toneHighlights: [
          { word: "phở", pronunciation: "fuh", meaning: "Vietnamese noodle soup", tone: "hoi" },
          { word: "bò", pronunciation: "bò", meaning: "beef/cow", tone: "huyen" },
          { word: "chín", pronunciation: "chín", meaning: "well-done", tone: "sac" },
          { word: "ngon", pronunciation: "ngon", meaning: "delicious", tone: "ngang" },
        ],
      },
      {
        id: "vff-food-cafe",
        title: "Cà phê Việt Nam - Văn hóa cà phê",
        titleEn: "Vietnamese Coffee Culture",
        icon: "☕",
        scenario: "Bạn vào một quán cà phê vỉa hè ở Sài Gòn.",
        scenarioEn: "You enter a sidewalk café in Saigon.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Em ơi, cho anh một cà phê sữa đá.", en: "Excuse me, one iced milk coffee please.", literal: "Younger hey, give older-brother one coffee milk ice." },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ được. Anh muốn ngọt hay ít ngọt ạ?", en: "Sure. Sweet or less sweet?", literal: "Polite-yes receive. Older-brother want sweet or little sweet polite?", keyWords: [{ word: "ngọt", pronunciation: "ngọt", meaning: "sweet", tone: "nang" }, { word: "ít", pronunciation: "ít", meaning: "less/few", tone: "sac" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Ít ngọt thôi. Cho thêm nhiều đá nhé!", en: "Less sweet. Extra ice please!", literal: "Little sweet only. Give add much ice ok!" },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ. Anh ngồi đây hay mang đi ạ?", en: "Sure. Sit here or take away?", literal: "Polite-yes. Older-brother sit here or carry go polite?", keyWords: [{ word: "mang đi", pronunciation: "mang đi", meaning: "take away/to go", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Ngồi đây. À, cho thêm một bạc xỉu nữa cho bạn anh.", en: "Sit here. Oh, one more bạc xỉu for my friend.", literal: "Sit here. Ah, give add one white-small more for friend older-brother.", keyWords: [{ word: "bạc xỉu", pronunciation: "bạc xỉu", meaning: "coffee with lots of milk (Cantonese origin)", tone: "sac" }] },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ, một cà phê sữa đá ít ngọt và một bạc xỉu. Anh đợi chút ạ!", en: "One iced milk coffee less sweet and one bạc xỉu. One moment please!", literal: "Polite-yes, one coffee milk ice little sweet and one white-small. Older-brother wait moment polite!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Uống xong) Ngon quá! Tính tiền nhé em.", en: "(After drinking) So good! Bill please.", literal: "(Drink finish) Delicious too-much! Calculate money ok younger." },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ, tổng 55 nghìn ạ. Anh có chuyển khoản không?", en: "55 thousand total. Can you do bank transfer?", literal: "Polite-yes, total 55 thousand polite. Older-brother have transfer account not?", keyWords: [{ word: "chuyển khoản", pronunciation: "chuyển khoản", meaning: "bank transfer (very common in Vietnam)", tone: "hoi" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Được! Cho anh mã QR nhé.", en: "Sure! Give me the QR code.", literal: "Receive! Give older-brother code QR ok." },
        ],
        grammarPoints: [
          {
            pattern: "Ngồi đây / Mang đi",
            patternEn: "Dine in / Take away",
            explanation: "'Ngồi đây' = ngồi tại quán. 'Mang đi' = mang về nhà. Hai cụm từ quan trọng nhất khi đi ăn/uống.",
            explanationEn: "'Ngồi đây' = dine in (sit here). 'Mang đi' = take away (carry go). The two most important phrases when eating out.",
            examples: [
              { vi: "Mang đi giúp em.", en: "Take away please.", literal: "Carry go help younger." },
              { vi: "Ngồi đây được không?", en: "Can I sit here?", literal: "Sit here receive not?" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Chuyển khoản - Thanh toán kiểu Việt",
            titleEn: "Bank Transfer - Vietnamese payment style",
            content: "Ở Việt Nam, 'chuyển khoản' (bank transfer via QR code) phổ biến hơn tiền mặt ở thành phố. Hầu hết quán ăn đều có mã QR. Bạn chỉ cần mở app ngân hàng, quét mã và thanh toán.",
            contentEn: "In Vietnam, bank transfer via QR code is more popular than cash in cities. Most food stalls have a QR code. Just open your banking app, scan the code, and pay.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu gọi đồ uống.",
          instructionEn: "Complete the drink order.",
          items: [
            { question: "Cho anh một _____ _____ đá. (iced milk coffee)", answer: "cà phê sữa", explanationEn: "Cà phê sữa đá = iced milk coffee" },
            { question: "Anh muốn _____ hay mang đi? (dine in)", answer: "ngồi đây", explanationEn: "Ngồi đây = sit here / dine in" },
            { question: "Anh có _____ _____ không? (bank transfer)", answer: "chuyển khoản", explanationEn: "Chuyển khoản = bank transfer" },
          ],
        },
      },
      // Lesson 2: Bánh Mì
      {
        id: "vff-food-banhmi",
        title: "Bánh Mì - Sandwich Quốc dân",
        titleEn: "Bánh Mì - Vietnam's National Sandwich",
        icon: "🥖",
        scenario: "Bạn mua bánh mì ở xe đẩy trên vỉa hè.",
        scenarioEn: "You buy bánh mì from a street cart on the sidewalk.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Cô ơi, cho con một ổ bánh mì thịt!", en: "Ma'am, one bánh mì with meat please!", literal: "Aunt hey, give child one loaf bread meat!", keyWords: [{ word: "ổ", pronunciation: "ổ", meaning: "classifier for bread/baguette", tone: "hoi" }, { word: "con", pronunciation: "con", meaning: "I (to older woman, very polite)", tone: "ngang" }] },
          { speaker: "Seller", speakerLabel: "Cô bán", vi: "Bánh mì thịt có thịt nguội, chả lụa, pate. Con muốn loại nào?", en: "Meat bánh mì has cold cuts, pork roll, and pâté. Which type?", literal: "Bread meat have meat cold, sausage silk, pate. Child want type which?", keyWords: [{ word: "chả lụa", pronunciation: "chả lụa", meaning: "Vietnamese pork sausage", tone: "hoi" }, { word: "pate", pronunciation: "pa-tê", meaning: "liver pâté", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cho con đầy đủ hết luôn! Thêm ớt nữa nhé cô.", en: "Give me everything! Extra chili too, please.", literal: "Give child full complete all immediately! Add chili more ok aunt." },
          { speaker: "Seller", speakerLabel: "Cô bán", vi: "Con ăn cay được hả? Cô cho nhiều ớt nhé!", en: "You can handle spicy? I'll add lots of chili!", literal: "Child eat spicy receive question? Aunt give much chili ok!", keyWords: [{ word: "hả", pronunciation: "hả", meaning: "right? (casual question particle)", tone: "hoi" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ được ạ! Bao nhiêu tiền hả cô?", en: "Yes! How much is it, ma'am?", literal: "Polite-yes receive polite! Wrap how-much money question aunt?" },
          { speaker: "Seller", speakerLabel: "Cô bán", vi: "Hai mươi lăm nghìn thôi con!", en: "Only twenty-five thousand, dear!", literal: "Two ten five thousand only child!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Ăn) Ngon quá cô ơi! Mai con lại mua nhé!", en: "(Eating) So delicious! I'll buy again tomorrow!", literal: "(Eat) Delicious too-much aunt hey! Tomorrow child again buy ok!" },
          { speaker: "Seller", speakerLabel: "Cô bán", vi: "Cô bán từ 6 giờ sáng tới 10 giờ tối. Lúc nào đến cũng được con!", en: "I sell from 6 AM to 10 PM. Come anytime, dear!", literal: "Aunt sell from 6 hour morning arrive 10 hour night. Moment which arrive also receive child!" },
        ],
        grammarPoints: [
          {
            pattern: "Bao nhiêu + tiền?",
            patternEn: "'Bao nhiêu tiền?' - Asking the price",
            explanation: "'Bao nhiêu?' = 'How much/many?'. Dùng cho số lượng không xác định.",
            explanationEn: "'Bao nhiêu?' = 'How much/many?'. Used for unspecified quantities.",
            examples: [
              { vi: "Bao nhiêu tiền?", en: "How much?", literal: "Wrap how-much money?" },
              { vi: "Cô bán bao nhiêu một ổ?", en: "How much for one loaf?", literal: "Aunt sell wrap how-much one loaf?" },
              { vi: "Bao nhiêu tuổi?", en: "How old?", literal: "Wrap how-much age?" },
            ],
          },
          {
            pattern: "Con / Cô / Chú (Market pronouns)",
            patternEn: "Street vendor pronouns: Con / Cô / Chú",
            explanation: "Khi mua hàng ở vỉa hè, gọi người bán lớn tuổi là 'Cô' (nữ) hoặc 'Chú' (nam), tự xưng 'Con'. Đây là cách thể hiện sự tôn trọng.",
            explanationEn: "When buying from street vendors, call older sellers 'Cô' (female) or 'Chú' (male), refer to yourself as 'Con'. This shows respect.",
            examples: [
              { vi: "Cô ơi, cho con hỏi giá.", en: "Ma'am, may I ask the price.", literal: "Aunt hey, give child ask price." },
              { vi: "Chú ơi, bán cho con một ly nước mía.", en: "Sir, sell me a glass of sugarcane juice.", literal: "Uncle hey, sell give child one glass water sugarcane." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Bánh mì - Di sản ẩm thực thế giới",
            titleEn: "Bánh Mì - A world culinary heritage",
            content: "Bánh mì Việt Nam là sự kết hợp Pháp-Việt: vỏ giòn kiểu baguette Pháp, nhân là đồ Việt (pate, chả lụa, rau mùi, đồ chua). Năm 2012, 'Bánh mì' được thêm vào từ điển Oxford English Dictionary. Giá trung bình chỉ 15.000–30.000 VNĐ (~$0.60–$1.20).",
            contentEn: "Vietnamese bánh mì is a French-Vietnamese fusion: crispy French baguette outside, Vietnamese fillings inside (pâté, pork roll, cilantro, pickled veggies). In 2012, 'Bánh mì' was added to the Oxford English Dictionary. Average price: only 15,000–30,000 VND (~$0.60–$1.20).",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu mua bánh mì.",
          instructionEn: "Complete the bánh mì ordering sentences.",
          items: [
            { question: "_____ ơi, cho _____ một ổ bánh mì! (ma'am / me)", answer: "Cô / con", explanationEn: "Call the seller 'Cô' and yourself 'Con'." },
            { question: "_____ _____ tiền hả cô? (how much)", answer: "Bao nhiêu", explanationEn: "'Bao nhiêu tiền?' = How much?" },
            { question: "Cho con đầy đủ hết _____! (everything immediately)", answer: "luôn", explanationEn: "'Luôn' = immediately / right away" },
          ],
        },
      },
      // Lesson 2: Asking for directions
      {
        id: "vff-commute-directions",
        title: "Hỏi đường ở Việt Nam",
        titleEn: "Asking for Directions in Vietnam",
        icon: "🗺️",
        scenario: "Bạn đi bộ và bị lạc ở trung tâm Hà Nội.",
        scenarioEn: "You're walking and get lost in central Hanoi.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Anh ơi, cho em hỏi. Hồ Hoàn Kiếm đi đường nào ạ?", en: "Excuse me sir, how do I get to Hoàn Kiếm Lake?", literal: "Older-brother hey, give younger ask. Lake Hoàn Kiếm go road which polite?", keyWords: [{ word: "Hồ Hoàn Kiếm", pronunciation: "hồ hoàn kiếm", meaning: "Hoàn Kiếm Lake (Sword Lake)", tone: "huyen" }] },
          { speaker: "Local", speakerLabel: "Người dân", vi: "À, em đi thẳng đường này khoảng 500 mét, rồi rẽ trái.", en: "Go straight this road about 500 meters, then turn left.", literal: "Ah, younger go straight road this about 500 meter, then turn left.", keyWords: [{ word: "đi thẳng", pronunciation: "đi thẳng", meaning: "go straight", tone: "hoi" }, { word: "rẽ trái", pronunciation: "rẽ trái", meaning: "turn left", tone: "hoi" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Rẽ trái ở ngã tư hay ngã ba ạ?", en: "Turn left at the intersection or the T-junction?", literal: "Turn left at crossroads four or crossroads three polite?", keyWords: [{ word: "ngã tư", pronunciation: "ngã tư", meaning: "intersection (4-way)", tone: "nga" }, { word: "ngã ba", pronunciation: "ngã ba", meaning: "T-junction (3-way)", tone: "nga" }] },
          { speaker: "Local", speakerLabel: "Người dân", vi: "Ngã tư có đèn đỏ. Rẽ trái xong đi thêm 200 mét là tới.", en: "At the intersection with traffic lights. Turn left then 200 more meters and you're there.", literal: "Crossroads four have light red. Turn left finish go add 200 meter is arrive." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Gần đây có quán cà phê nào không anh?", en: "Are there any coffee shops nearby?", literal: "Near here have shop coffee which not older-brother?", keyWords: [{ word: "gần đây", pronunciation: "gần đây", meaning: "nearby / around here", tone: "huyen" }] },
          { speaker: "Local", speakerLabel: "Người dân", vi: "Có! Cạnh Hồ Hoàn Kiếm có quán Cộng, rất nổi tiếng!", en: "Yes! Next to the lake there's Cộng Café, very famous!", literal: "Have! Beside Lake Hoàn Kiếm have shop Cộng, very famous!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn anh nhiều! Anh chỉ đường rõ ràng quá!", en: "Thank you so much! Your directions are very clear!", literal: "Feel-grace older-brother much! Older-brother point road clear too-much!" },
        ],
        grammarPoints: [
          {
            pattern: "Đi thẳng / Rẽ trái / Rẽ phải",
            patternEn: "Direction words: Straight / Left / Right",
            explanation: "Các từ chỉ hướng cơ bản khi hỏi/chỉ đường.",
            explanationEn: "Basic direction words for asking and giving directions.",
            examples: [
              { vi: "Đi thẳng 100 mét.", en: "Go straight 100 meters.", literal: "Go straight 100 meter." },
              { vi: "Rẽ phải ở ngã tư.", en: "Turn right at the intersection.", literal: "Turn right at crossroads four." },
              { vi: "Quay lại, đi ngược chiều.", en: "Go back, opposite direction.", literal: "Turn back, go reverse direction." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Chỉ đường kiểu Việt Nam",
            titleEn: "Vietnamese-style directions",
            content: "Người Việt thường chỉ đường bằng địa danh thay vì số nhà: 'Đi qua cái chùa, rẽ phải ở quán phở, đi thêm chút là tới'. Đôi khi họ chỉ sai nhưng rất nhiệt tình! Luôn hỏi 2-3 người để chắc chắn.",
            contentEn: "Vietnamese often give directions using landmarks instead of addresses: 'Pass the temple, turn right at the phở shop, go a bit further and you're there.' Sometimes directions are wrong but given enthusiastically! Always ask 2-3 people to be sure.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu hỏi đường.",
          instructionEn: "Complete the direction-asking sentences.",
          items: [
            { question: "_____ _____ đường này khoảng 500 mét. (go straight)", answer: "Đi thẳng", explanationEn: "'Đi thẳng' = go straight" },
            { question: "_____ trái ở _____ tư. (turn / intersection)", answer: "Rẽ / ngã", explanationEn: "'Rẽ trái' = turn left, 'ngã tư' = intersection" },
            { question: "_____ đây có quán cà phê không? (nearby)", answer: "Gần", explanationEn: "'Gần đây' = nearby" },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 3: Commuting & Navigation
  // ═══════════════════════════════════════════════════════════
  {
    id: "vff-commuting",
    title: "Di chuyển & Giao thông",
    titleEn: "Commuting & Navigation",
    icon: "🛵",
    color: "from-green-500 to-teal-600",
    description: "Đi Grab, hỏi đường, và sống sót qua giờ cao điểm.",
    descriptionEn: "Ride Grab, ask for directions, and survive rush hour.",
    lessons: [
      {
        id: "vff-commute-grab",
        title: "Đi Grab tại Việt Nam",
        titleEn: "Taking a Grab in Vietnam",
        icon: "🚗",
        scenario: "Bạn đặt Grab từ khách sạn đến chợ Bến Thành.",
        scenarioEn: "You book a Grab from your hotel to Bến Thành Market.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "(Gọi tài xế) Anh ơi, em đang đứng ở cổng khách sạn. Anh thấy em không?", en: "(Calling driver) Hello, I'm standing at the hotel gate. Can you see me?", literal: "(Call driver) Older-brother hey, younger standing at gate hotel. Older-brother see younger not?" },
          { speaker: "Driver", speakerLabel: "Tài xế", vi: "Dạ, anh đang đến. Em mặc áo gì để anh nhận ra?", en: "I'm coming. What are you wearing so I can recognize you?", literal: "Polite-yes, older-brother is coming. Younger wear shirt what so-that older-brother recognize?", keyWords: [{ word: "mặc", pronunciation: "mặc", meaning: "to wear", tone: "nang" }, { word: "nhận ra", pronunciation: "nhận ra", meaning: "to recognize", tone: "nang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Em mặc áo xanh, đội mũ đen. Đứng cạnh cây ATM.", en: "I'm wearing a blue shirt, black hat. Standing next to the ATM.", literal: "Younger wear shirt blue, wear hat black. Standing beside tree ATM." },
          { speaker: "Driver", speakerLabel: "Tài xế", vi: "OK em, anh thấy rồi! Xe Honda màu đỏ nhé.", en: "OK, I see you! Red Honda motorcycle.", literal: "OK younger, older-brother see already! Vehicle Honda color red ok." },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Lên xe) Anh ơi, đi chợ Bến Thành. Đường nào nhanh nhất ạ?", en: "(Getting on) To Bến Thành Market. What's the fastest route?", literal: "(Get-on vehicle) Older-brother hey, go market Bến Thành. Road which fast most polite?", keyWords: [{ word: "nhanh nhất", pronunciation: "nhanh nhất", meaning: "fastest", tone: "sac" }] },
          { speaker: "Driver", speakerLabel: "Tài xế", vi: "Giờ đang cao điểm nên hơi kẹt xe. Anh đi đường vòng được không em?", en: "It's rush hour so there's some traffic. Can I take a detour?", literal: "Hour is high-point so slightly stuck vehicle. Older-brother go road round receive not younger?", keyWords: [{ word: "cao điểm", pronunciation: "cao điểm", meaning: "rush hour/peak", tone: "hoi" }, { word: "kẹt xe", pronunciation: "kẹt xe", meaning: "traffic jam", tone: "nang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Được anh! Đi đường nào cũng được, miễn không kẹt quá.", en: "Sure! Any route is fine, as long as there's not too much traffic.", literal: "Receive older-brother! Go road which also receive, exempt not stuck too-much." },
          { speaker: "Driver", speakerLabel: "Tài xế", vi: "(Đến nơi) Tới rồi em! Chợ Bến Thành đây.", en: "(Arriving) We're here! This is Bến Thành Market.", literal: "(Arrive already) Arrive already younger! Market Bến Thành here." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn anh! Em cho anh 5 sao nhé!", en: "Thank you! I'll give you 5 stars!", literal: "Feel-grace older-brother! Younger give older-brother 5 star ok!" },
          { speaker: "Driver", speakerLabel: "Tài xế", vi: "Cảm ơn em! Chúc em vui nhé!", en: "Thanks! Have fun!", literal: "Feel-grace younger! Wish younger happy ok!" },
        ],
        grammarPoints: [
          {
            pattern: "Đang + Verb (Progressive tense)",
            patternEn: "'Đang' - Present continuous",
            explanation: "'Đang' = đang làm (hiện tại tiếp diễn). Đặt trước động từ.",
            explanationEn: "'Đang' marks the present continuous tense. Place before the verb.",
            examples: [
              { vi: "Anh đang đến.", en: "I'm coming.", literal: "Older-brother is-in-progress come." },
              { vi: "Em đang đứng ở cổng.", en: "I'm standing at the gate.", literal: "Younger is-in-progress stand at gate." },
              { vi: "Trời đang mưa.", en: "It's raining.", literal: "Sky is-in-progress rain." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Grab - Ứng dụng 'bất ly thân' ở Việt Nam",
            titleEn: "Grab - The must-have app in Vietnam",
            content: "Grab là ứng dụng gọi xe phổ biến nhất Việt Nam (không phải Uber). Có GrabBike (xe máy), GrabCar (ô tô), GrabFood (đặt đồ ăn). Hầu hết người Việt thanh toán qua MoMo hoặc ZaloPay trên Grab.",
            contentEn: "Grab is the most popular ride-hailing app in Vietnam (not Uber). It includes GrabBike (motorcycle), GrabCar (car), and GrabFood (food delivery). Most Vietnamese pay via MoMo or ZaloPay on Grab.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành đoạn hội thoại với tài xế Grab.",
          instructionEn: "Complete the dialogue with the Grab driver.",
          items: [
            { question: "Em _____ đứng ở cổng khách sạn. (am currently)", answer: "đang", explanationEn: "'Đang' = currently/in progress" },
            { question: "Giờ đang _____ _____ nên kẹt xe. (rush hour)", answer: "cao điểm", explanationEn: "'Cao điểm' = peak/rush hour" },
            { question: "Cảm ơn anh! Em cho anh 5 _____ nhé! (stars)", answer: "sao", explanationEn: "'Sao' = stars" },
          ],
        },
      },
      {
        id: "vff-commute-directions",
        title: "Hỏi đường ở Việt Nam",
        titleEn: "Asking for Directions in Vietnam",
        icon: "🗺️",
        scenario: "Bạn đi bộ và bị lạc ở trung tâm Hà Nội.",
        scenarioEn: "You're walking and get lost in central Hanoi.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Anh ơi, cho em hỏi. Hồ Hoàn Kiếm đi đường nào ạ?", en: "Excuse me sir, how do I get to Hoàn Kiếm Lake?", literal: "Older-brother hey, give younger ask. Lake Hoàn Kiếm go road which polite?", keyWords: [{ word: "Hồ Hoàn Kiếm", pronunciation: "hồ hoàn kiếm", meaning: "Hoàn Kiếm Lake (Sword Lake)", tone: "huyen" }] },
          { speaker: "Local", speakerLabel: "Người dân", vi: "À, em đi thẳng đường này khoảng 500 mét, rồi rẽ trái.", en: "Go straight this road about 500 meters, then turn left.", literal: "Ah, younger go straight road this about 500 meter, then turn left.", keyWords: [{ word: "đi thẳng", pronunciation: "đi thẳng", meaning: "go straight", tone: "hoi" }, { word: "rẽ trái", pronunciation: "rẽ trái", meaning: "turn left", tone: "hoi" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Rẽ trái ở ngã tư hay ngã ba ạ?", en: "Turn left at the intersection or the T-junction?", literal: "Turn left at crossroads four or crossroads three polite?", keyWords: [{ word: "ngã tư", pronunciation: "ngã tư", meaning: "intersection (4-way)", tone: "nga" }, { word: "ngã ba", pronunciation: "ngã ba", meaning: "T-junction (3-way)", tone: "nga" }] },
          { speaker: "Local", speakerLabel: "Người dân", vi: "Ngã tư có đèn đỏ. Rẽ trái xong đi thêm 200 mét là tới.", en: "At the intersection with traffic lights. Turn left then 200 more meters and you're there.", literal: "Crossroads four have light red. Turn left finish go add 200 meter is arrive." },
          { speaker: "You", speakerLabel: "Bạn", vi: "Gần đây có quán cà phê nào không anh?", en: "Are there any coffee shops nearby?", literal: "Near here have shop coffee which not older-brother?", keyWords: [{ word: "gần đây", pronunciation: "gần đây", meaning: "nearby / around here", tone: "huyen" }] },
          { speaker: "Local", speakerLabel: "Người dân", vi: "Có! Cạnh Hồ Hoàn Kiếm có quán Cộng, rất nổi tiếng!", en: "Yes! Next to the lake there's Cộng Café, very famous!", literal: "Have! Beside Lake Hoàn Kiếm have shop Cộng, very famous!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn anh nhiều! Anh chỉ đường rõ ràng quá!", en: "Thank you so much! Your directions are very clear!", literal: "Feel-grace older-brother much! Older-brother point road clear too-much!" },
        ],
        grammarPoints: [
          {
            pattern: "Đi thẳng / Rẽ trái / Rẽ phải",
            patternEn: "Direction words: Straight / Left / Right",
            explanation: "Các từ chỉ hướng cơ bản khi hỏi/chỉ đường.",
            explanationEn: "Basic direction words for asking and giving directions.",
            examples: [
              { vi: "Đi thẳng 100 mét.", en: "Go straight 100 meters.", literal: "Go straight 100 meter." },
              { vi: "Rẽ phải ở ngã tư.", en: "Turn right at the intersection.", literal: "Turn right at crossroads four." },
              { vi: "Quay lại, đi ngược chiều.", en: "Go back, opposite direction.", literal: "Turn back, go reverse direction." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Chỉ đường kiểu Việt Nam",
            titleEn: "Vietnamese-style directions",
            content: "Người Việt thường chỉ đường bằng địa danh thay vì số nhà: 'Đi qua cái chùa, rẽ phải ở quán phở, đi thêm chút là tới'. Đôi khi họ chỉ sai nhưng rất nhiệt tình! Luôn hỏi 2-3 người để chắc chắn.",
            contentEn: "Vietnamese often give directions using landmarks instead of addresses: 'Pass the temple, turn right at the phở shop, go a bit further and you're there.' Sometimes directions are wrong but given enthusiastically! Always ask 2-3 people to be sure.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu hỏi đường.",
          instructionEn: "Complete the direction-asking sentences.",
          items: [
            { question: "_____ _____ đường này khoảng 500 mét. (go straight)", answer: "Đi thẳng", explanationEn: "'Đi thẳng' = go straight" },
            { question: "_____ trái ở _____ tư. (turn / intersection)", answer: "Rẽ / ngã", explanationEn: "'Rẽ trái' = turn left, 'ngã tư' = intersection" },
            { question: "_____ đây có quán cà phê không? (nearby)", answer: "Gần", explanationEn: "'Gần đây' = nearby" },
          ],
        },
      },
      {
        id: "vff-commute-shopping",
        title: "Mua sắm ở chợ truyền thống",
        titleEn: "Shopping at a Traditional Market",
        icon: "🛒",
        scenario: "Bạn đi chợ Bến Thành mua quà lưu niệm.",
        scenarioEn: "You visit Bến Thành Market to buy souvenirs.",
        dialogue: [
          { speaker: "Seller", speakerLabel: "Người bán", vi: "Mua gì đi em! Áo đẹp lắm! Thử đi!", en: "Buy something, dear! Beautiful shirts! Try them on!", literal: "Buy what go younger! Shirt beautiful very! Try go!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cái áo này bao nhiêu tiền hả chị?", en: "How much is this shirt, ma'am?", literal: "Thing shirt this wrap how-much money question older-sister?", keyWords: [{ word: "cái", pronunciation: "cái", meaning: "classifier for objects", tone: "sac" }] },
          { speaker: "Seller", speakerLabel: "Người bán", vi: "Cái này 350 nghìn em ơi. Hàng xịn lắm!", en: "This one is 350 thousand, dear. Very high quality!", literal: "Thing this 350 thousand younger hey. Goods genuine very!", keyWords: [{ word: "hàng xịn", pronunciation: "hàng xịn", meaning: "genuine/high-quality goods", tone: "sac" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Mắc quá chị ơi! Bớt cho em đi. 200 nghìn được không?", en: "Too expensive! Give me a discount. 200 thousand OK?", literal: "Expensive too-much older-sister hey! Reduce for younger go. 200 thousand receive not?", keyWords: [{ word: "mắc", pronunciation: "mắc", meaning: "expensive (Southern)", tone: "sac" }, { word: "bớt", pronunciation: "bớt", meaning: "to reduce/discount", tone: "sac" }] },
          { speaker: "Seller", speakerLabel: "Người bán", vi: "Trời ơi, 200 là lỗ rồi em! 300 đi, chị bán lấy mối!", en: "Oh my, 200 is a loss! 300, I'm selling for a first sale!", literal: "Sky hey, 200 is lose already younger! 300 go, older-sister sell take connection!", keyWords: [{ word: "lấy mối", pronunciation: "lấy mối", meaning: "selling at a loss to get a first customer (for luck)", tone: "sac" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "250 nhé chị! Em mua 2 cái luôn!", en: "250 please! I'll buy 2 right away!", literal: "250 ok older-sister! Younger buy 2 thing immediately!" },
          { speaker: "Seller", speakerLabel: "Người bán", vi: "Ôi, thôi được rồi! 250 một cái, 2 cái 500. Bao giá đẹp cho em!", en: "OK fine! 250 each, 2 for 500. Great price for you!", literal: "Oh, stop receive already! 250 one thing, 2 thing 500. Wrap price beautiful for younger!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn chị! Cho em thêm cái túi nữa nhé!", en: "Thank you! Give me a bag too please!", literal: "Feel-grace older-sister! Give younger add thing bag more ok!" },
          { speaker: "Seller", speakerLabel: "Người bán", vi: "Rồi! Lần sau ghé lại nha em!", en: "Sure! Come back next time, dear!", literal: "Already! Time after visit again ok younger!" },
        ],
        grammarPoints: [
          {
            pattern: "Bớt / Giảm giá",
            patternEn: "Bargaining: 'Bớt' and 'Giảm giá'",
            explanation: "'Bớt cho em' = xin giảm giá. 'Mắc quá' (Nam) / 'Đắt quá' (Bắc) = quá đắt.",
            explanationEn: "'Bớt cho em' = please reduce the price. 'Mắc quá' (South) / 'Đắt quá' (North) = too expensive.",
            examples: [
              { vi: "Bớt cho em đi chị!", en: "Give me a discount, please!", literal: "Reduce for younger go older-sister!" },
              { vi: "Đắt quá! Giảm giá được không?", en: "Too expensive! Can you discount?", literal: "Expensive too-much! Reduce price receive not?" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Nghệ thuật trả giá ở chợ Việt Nam",
            titleEn: "The art of bargaining in Vietnamese markets",
            content: "Trả giá là văn hóa ở chợ truyền thống Việt Nam. Quy tắc vàng: đề xuất 50-60% giá người bán đưa ra, rồi từ từ thương lượng. 'Lấy mối' = bán rẻ cho khách đầu tiên trong ngày để lấy may. Nếu người bán nói 'lấy mối', bạn đang có lợi thế!",
            contentEn: "Bargaining is culture in traditional Vietnamese markets. Golden rule: offer 50-60% of the asking price, then negotiate slowly. 'Lấy mối' = selling cheap to the first customer for good luck. If the seller says 'lấy mối', you have leverage!",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu mặc cả ở chợ.",
          instructionEn: "Complete the bargaining sentences.",
          items: [
            { question: "_____ quá chị ơi! _____ cho em đi! (too expensive / discount)", answer: "Mắc / Bớt", explanationEn: "'Mắc quá' = too expensive, 'Bớt' = reduce/discount" },
            { question: "Cái áo này _____ _____ tiền? (how much)", answer: "bao nhiêu", explanationEn: "'Bao nhiêu tiền?' = How much?" },
            { question: "Em mua 2 cái _____! (right away)", answer: "luôn", explanationEn: "'Luôn' = immediately / right away" },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 4: Socializing & Friends
  // ═══════════════════════════════════════════════════════════
  {
    id: "vff-socializing",
    title: "Kết bạn & Giao lưu",
    titleEn: "Socializing & Friends",
    icon: "🎉",
    color: "from-pink-500 to-rose-600",
    description: "Đi café, rủ bạn đi chơi, và hiểu tiếng lóng Việt Nam.",
    descriptionEn: "Hang out at cafés, invite friends, and understand Vietnamese slang.",
    lessons: [
      {
        id: "vff-social-cafe",
        title: "'Đi café không?' - Nghệ thuật rủ bạn",
        titleEn: "'Want to get coffee?' - The art of inviting friends",
        icon: "☕",
        scenario: "Bạn muốn rủ đồng nghiệp đi uống cà phê sau giờ làm.",
        scenarioEn: "You want to invite a colleague for coffee after work.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Linh ơi, chiều nay rảnh không? Đi café không?", en: "Hey Linh, are you free this afternoon? Want to get coffee?", literal: "Linh hey, afternoon this free not? Go café not?", keyWords: [{ word: "rảnh", pronunciation: "rảnh", meaning: "free/available", tone: "hoi" }] },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Ô, được luôn! Mấy giờ?", en: "Oh, definitely! What time?", literal: "Oh, receive immediately! How-many hour?", keyWords: [{ word: "được luôn", pronunciation: "được luôn", meaning: "absolutely / right away", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "5 giờ chiều nhé? Quán Highland ở Nguyễn Huệ được không?", en: "5 PM? The Highlands at Nguyễn Huệ, OK?", literal: "5 hour afternoon ok? Shop Highland at Nguyễn Huệ receive not?" },
          { speaker: "Linh", speakerLabel: "Linh", vi: "OK! Mà rủ thêm Tuấn đi nha. Mấy hôm nay nó buồn lắm.", en: "OK! But invite Tuấn too. He's been down lately.", literal: "OK! But invite add Tuấn go ok. Several day this it sad very.", keyWords: [{ word: "rủ", pronunciation: "rủ", meaning: "to invite/ask someone to join", tone: "hoi" }, { word: "nha", pronunciation: "nha", meaning: "ok/right (casual, Southern)", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Ừ, để mình nhắn nó. Ai trả tiền đây?", en: "Yeah, I'll text him. Who's paying?", literal: "Yeah, let self text it. Who pay money here?" },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Hôm nay mình bao! Nhưng lần sau bạn trả nhé, haha!", en: "My treat today! But you pay next time, haha!", literal: "Day this self treat! But time next you pay ok, haha!", keyWords: [{ word: "bao", pronunciation: "bao", meaning: "to treat (pay for everyone)", tone: "ngang" }, { word: "lần sau", pronunciation: "lần sau", meaning: "next time", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Quá dữ! Deal nhé!", en: "Awesome! Deal!", literal: "Too fierce! Deal ok!", keyWords: [{ word: "Quá dữ", pronunciation: "quá dữ", meaning: "awesome/amazing (slang)", tone: "sac" }] },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Chốt! Gặp nhau lúc 5h!", en: "Done! See you at 5!", literal: "Lock! Meet each-other moment 5h!", keyWords: [{ word: "Chốt", pronunciation: "chốt", meaning: "confirmed/locked in (slang)", tone: "sac" }] },
        ],
        grammarPoints: [
          {
            pattern: "Verb + không? (Yes/No questions)",
            patternEn: "'Không' at the end - Yes/No question pattern",
            explanation: "Thêm 'không?' vào cuối câu để tạo câu hỏi Yes/No. Trả lời: 'Có' (Yes) hoặc 'Không' (No).",
            explanationEn: "Add 'không?' at the end of any statement to make a Yes/No question. Answer: 'Có' (Yes) or 'Không' (No).",
            examples: [
              { vi: "Đi café không?", en: "Want to get coffee?", literal: "Go café not?" },
              { vi: "Rảnh không?", en: "Are you free?", literal: "Free not?" },
              { vi: "Anh thích phở không?", en: "Do you like phở?", literal: "Older-brother like phở not?" },
            ],
          },
          {
            pattern: "Tiếng lóng phổ biến (Slang)",
            patternEn: "Popular Vietnamese slang",
            explanation: "Giới trẻ Việt Nam dùng nhiều tiếng lóng trong giao tiếp hằng ngày.",
            explanationEn: "Young Vietnamese use lots of slang in daily conversation.",
            examples: [
              { vi: "Chốt đơn!", en: "Confirmed! / Done deal!", literal: "Lock order!" },
              { vi: "Quá dữ!", en: "Awesome! / Amazing!", literal: "Too fierce!" },
              { vi: "Chill thôi!", en: "Just chill!", literal: "Chill only!" },
              { vi: "Xỉu!", en: "I'm dead! (laughing so hard)", literal: "Faint!" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "'Bao' - Văn hóa trả tiền ở Việt Nam",
            titleEn: "'Bao' - Vietnamese paying culture",
            content: "Ở Việt Nam, khi ai đó nói 'Hôm nay mình bao', nghĩa là họ sẽ trả tiền cho tất cả. Đây là cách thể hiện tình bạn và sự hào phóng. Thường thì mọi người luân phiên 'bao' nhau. Đừng cố giành trả tiền - hãy chấp nhận và hứa 'lần sau mình trả'.",
            contentEn: "In Vietnam, when someone says 'Today I bao', they'll pay for everyone. This shows friendship and generosity. People usually take turns treating each other. Don't fight to pay - accept graciously and promise 'next time I'll pay'.",
          },
        ],
        practice: {
          type: "match",
          instruction: "Ghép tiếng lóng với nghĩa đúng.",
          instructionEn: "Match the slang with its correct meaning.",
          items: [
            { question: "Chốt đơn", answer: "Confirmed / Done deal", explanationEn: "From e-commerce: 'lock the order' = confirmed" },
            { question: "Quá dữ", answer: "Awesome / Amazing", explanationEn: "Literally 'too fierce' = amazing" },
            { question: "Bao", answer: "To treat / Pay for everyone", explanationEn: "'Bao' = to cover/treat everyone" },
            { question: "Xỉu", answer: "I'm dead (laughing)", explanationEn: "Literally 'faint' = laughing so hard" },
          ],
        },
      },
      {
        id: "vff-social-weekend",
        title: "Kế hoạch cuối tuần - Đi đâu chơi?",
        titleEn: "Weekend Plans - Where to go?",
        icon: "🎭",
        scenario: "Bạn và bạn bè lên kế hoạch đi chơi cuối tuần.",
        scenarioEn: "You and friends plan a weekend outing.",
        dialogue: [
          { speaker: "You", speakerLabel: "Bạn", vi: "Cuối tuần này mọi người có kế hoạch gì chưa?", en: "Does everyone have plans this weekend?", literal: "End week this every person have plan what yet?", keyWords: [{ word: "cuối tuần", pronunciation: "cuối tuần", meaning: "weekend", tone: "sac" }, { word: "kế hoạch", pronunciation: "kế hoạch", meaning: "plan", tone: "sac" }] },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Chưa! Đi đâu chơi không? Mình muốn đi biển quá!", en: "Not yet! Want to go somewhere? I really want to go to the beach!", literal: "Not-yet! Go where play not? Self want go sea too-much!", keyWords: [{ word: "đi biển", pronunciation: "đi biển", meaning: "go to the beach", tone: "hoi" }] },
          { speaker: "Tuấn", speakerLabel: "Tuấn", vi: "Đi biển thì xa quá. Hay mình đi Đà Lạt? Cuối tuần này trời mát.", en: "Beach is too far. How about Đà Lạt? The weather is cool this weekend.", literal: "Go sea then far too-much. Or self go Đà Lạt? End week this sky cool.", keyWords: [{ word: "mát", pronunciation: "mát", meaning: "cool (weather)", tone: "sac" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Đà Lạt hay đó! Mình đi xe máy hay đặt xe khách?", en: "Đà Lạt sounds great! Shall we ride motorcycles or book a bus?", literal: "Đà Lạt interesting that! Self go vehicle engine or book vehicle guest?" },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Đặt xe khách đi, cho khỏe. Mình book trên Vexere nhé!", en: "Let's book a bus, less tiring. I'll book on Vexere!", literal: "Book vehicle guest go, for healthy. Self book on Vexere ok!", keyWords: [{ word: "cho khỏe", pronunciation: "cho khỏe", meaning: "to be easier / less tiring", tone: "hoi" }] },
          { speaker: "Tuấn", speakerLabel: "Tuấn", vi: "Ở đó mình thuê homestay hay khách sạn?", en: "Should we rent a homestay or hotel there?", literal: "At there self rent homestay or hotel?", keyWords: [{ word: "thuê", pronunciation: "thuê", meaning: "to rent", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Homestay đi, rẻ mà lại vui! Chia ba người, mỗi người khoảng 200k một đêm.", en: "Homestay, cheap and fun! Split three ways, about 200k per person per night.", literal: "Homestay go, cheap but again fun! Divide three person, each person about 200k one night." },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Chốt luôn! Mình đi thứ bảy sáng, về chủ nhật tối.", en: "Done! Leave Saturday morning, come back Sunday night.", literal: "Lock immediately! Self go weekday seven morning, return master day night.", keyWords: [{ word: "thứ bảy", pronunciation: "thứ bảy", meaning: "Saturday", tone: "hoi" }, { word: "chủ nhật", pronunciation: "chủ nhật", meaning: "Sunday", tone: "nang" }] },
          { speaker: "Tuấn", speakerLabel: "Tuấn", vi: "Nhớ mang áo ấm nhé, Đà Lạt lạnh lắm!", en: "Remember to bring warm clothes, Đà Lạt is very cold!", literal: "Remember carry shirt warm ok, Đà Lạt cold very!" },
        ],
        grammarPoints: [
          {
            pattern: "Hay + [suggestion]? (Or/How about?)",
            patternEn: "'Hay' - Suggesting alternatives",
            explanation: "'Hay' dùng để đề xuất lựa chọn khác. 'Hay mình đi X?' = 'How about we go to X?'",
            explanationEn: "'Hay' is used to suggest alternatives. 'Hay mình đi X?' = 'How about we go to X?'",
            examples: [
              { vi: "Hay mình đi Đà Lạt?", en: "How about we go to Đà Lạt?", literal: "Or self go Đà Lạt?" },
              { vi: "Hay ăn pizza?", en: "Or eat pizza?", literal: "Or eat pizza?" },
              { vi: "Hay đổi ngày khác?", en: "Or change to another day?", literal: "Or change day other?" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Văn hóa đi phượt của giới trẻ Việt",
            titleEn: "Vietnamese youth backpacking culture",
            content: "'Đi phượt' là xu hướng du lịch bụi của giới trẻ Việt Nam - tự lái xe máy, mang lều cắm trại, khám phá vùng núi. Đà Lạt, Sapa, Hà Giang là những điểm đến phượt nổi tiếng. Chi phí thường rất rẻ vì chia sẻ phòng và ăn quán bình dân.",
            contentEn: "'Đi phượt' (backpacking by motorcycle) is a popular trend among Vietnamese youth - riding motorcycles, camping, exploring mountains. Đà Lạt, Sapa, Hà Giang are famous destinations. Costs are usually very low because of room-sharing and eating at local stalls.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu lên kế hoạch cuối tuần.",
          instructionEn: "Complete the weekend planning sentences.",
          items: [
            { question: "_____ tuần này mọi người có kế hoạch gì? (weekend)", answer: "Cuối", explanationEn: "'Cuối tuần' = weekend" },
            { question: "_____ mình đi Đà Lạt? (How about)", answer: "Hay", explanationEn: "'Hay' = or / how about" },
            { question: "Mình đi _____ bảy sáng, về _____ nhật tối. (Saturday/Sunday)", answer: "thứ / chủ", explanationEn: "'Thứ bảy' = Saturday, 'Chủ nhật' = Sunday" },
          ],
        },
      },
      {
        id: "vff-social-birthday",
        title: "Tiệc sinh nhật - Chúc mừng bạn!",
        titleEn: "Birthday Party - Happy Birthday!",
        icon: "🎂",
        scenario: "Bạn được mời dự tiệc sinh nhật của đồng nghiệp Việt Nam.",
        scenarioEn: "You're invited to a Vietnamese colleague's birthday party.",
        dialogue: [
          { speaker: "Linh", speakerLabel: "Linh", vi: "David ơi, thứ Bảy này sinh nhật Tuấn. Đến nhé!", en: "David, this Saturday is Tuấn's birthday. Come join!", literal: "David hey, weekday Seven this born-day Tuấn. Arrive ok!", keyWords: [{ word: "sinh nhật", pronunciation: "sinh nhật", meaning: "birthday", tone: "nang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Ô, mình nên mua quà gì cho Tuấn?", en: "Oh, what gift should I buy for Tuấn?", literal: "Oh, self should buy gift what for Tuấn?", keyWords: [{ word: "quà", pronunciation: "quà", meaning: "gift/present", tone: "huyen" }] },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Tuấn thích công nghệ. Mua tai nghe hoặc phụ kiện điện thoại đi!", en: "Tuấn likes tech. Buy headphones or phone accessories!", literal: "Tuấn like technology. Buy ear-hear or accessories phone go!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "OK! À, ở Việt Nam có kiêng gì khi tặng quà không?", en: "OK! Are there any taboos about gift-giving in Vietnam?", literal: "OK! Ah, at Vietnam have avoid what when give gift not?", keyWords: [{ word: "kiêng", pronunciation: "kiêng", meaning: "taboo / to avoid (superstition)", tone: "ngang" }] },
          { speaker: "Linh", speakerLabel: "Linh", vi: "Đừng tặng đồng hồ hay khăn tay - nghĩa xấu lắm! Và đừng gói quà bằng giấy đen nhé.", en: "Don't give clocks or handkerchiefs - bad meaning! And don't wrap gifts in black paper.", literal: "Don't give clock or scarf hand - meaning bad very! And don't wrap gift with paper black ok." },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Tại bữa tiệc) Chúc mừng sinh nhật Tuấn! Quà cho bạn nè!", en: "(At the party) Happy birthday Tuấn! Here's your gift!", literal: "(At meal party) Wish celebrate born-day Tuấn! Gift for you here!", keyWords: [{ word: "chúc mừng sinh nhật", pronunciation: "chúc mừng sinh nhật", meaning: "happy birthday", tone: "sac" }] },
          { speaker: "Tuấn", speakerLabel: "Tuấn", vi: "Cảm ơn David! Bạn tốt quá! Vào ăn bánh đi!", en: "Thank you David! You're so kind! Come eat cake!", literal: "Feel-grace David! You good too-much! Enter eat cake go!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Tiệc vui quá! Chúc Tuấn tuổi mới vạn sự như ý!", en: "Great party! Wishing you all the best in your new year!", literal: "Party fun too-much! Wish Tuấn age new ten-thousand things like wish!", keyWords: [{ word: "vạn sự như ý", pronunciation: "vạn sự như ý", meaning: "may all things go as you wish", tone: "nang" }] },
          { speaker: "Tuấn", speakerLabel: "Tuấn", vi: "Cảm ơn mọi người! Lát nữa đi hát karaoke nhé!", en: "Thanks everyone! Let's go karaoke later!", literal: "Feel-grace every person! Moment more go sing karaoke ok!" },
        ],
        grammarPoints: [
          {
            pattern: "Chúc + [person] + [wish]",
            patternEn: "'Chúc' - Making wishes and toasts",
            explanation: "'Chúc' = 'Wish'. Dùng trong mọi dịp đặc biệt: sinh nhật, Tết, cưới.",
            explanationEn: "'Chúc' = 'Wish/To wish'. Used for all special occasions: birthdays, Tết, weddings.",
            examples: [
              { vi: "Chúc mừng sinh nhật!", en: "Happy birthday!", literal: "Wish celebrate born-day!" },
              { vi: "Chúc năm mới vui vẻ!", en: "Happy New Year!", literal: "Wish year new happy!" },
              { vi: "Chúc anh chị trăm năm hạnh phúc!", en: "Wish you a hundred years of happiness! (wedding)", literal: "Wish older-brother older-sister hundred year happiness!" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Kiêng kỵ khi tặng quà ở Việt Nam",
            titleEn: "Gift-giving taboos in Vietnam",
            content: "Không nên tặng: đồng hồ (đồng âm 'chung tử' = chết), khăn tay (biểu tượng chia ly), dao kéo (cắt đứt tình cảm), giày dép (biểu tượng chia xa). Nên tặng: tiền (trong phong bì đỏ), hoa, trái cây, hoặc đồ điện tử.",
            contentEn: "Don't give: clocks (sounds like 'funeral' in Chinese-Vietnamese), handkerchiefs (symbol of parting), scissors/knives (cutting relationships), shoes (symbol of separation). Good gifts: money (in red envelopes), flowers, fruits, or electronics.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu chúc sinh nhật.",
          instructionEn: "Complete the birthday greeting sentences.",
          items: [
            { question: "_____ _____ sinh nhật Tuấn! (happy birthday)", answer: "Chúc mừng", explanationEn: "'Chúc mừng sinh nhật' = Happy birthday" },
            { question: "Chúc bạn tuổi mới _____ _____ như ý! (all the best)", answer: "vạn sự", explanationEn: "'Vạn sự như ý' = may all things go as you wish" },
            { question: "Đừng tặng _____ _____ - nghĩa xấu! (clock)", answer: "đồng hồ", explanationEn: "Clocks are taboo gifts in Vietnam" },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 5: Workplace Vietnamese
  // ═══════════════════════════════════════════════════════════
  {
    id: "vff-workplace",
    title: "Tiếng Việt Công sở",
    titleEn: "Workplace Vietnamese",
    icon: "💼",
    color: "from-slate-600 to-zinc-700",
    description: "Giới thiệu bản thân, email, họp hành và giao tiếp công việc.",
    descriptionEn: "Self-introduction, emails, meetings, and professional communication.",
    lessons: [
      {
        id: "vff-work-intro",
        title: "Ngày đầu đi làm tại Việt Nam",
        titleEn: "Your First Day at a Vietnamese Office",
        icon: "🏢",
        scenario: "Bạn bắt đầu công việc mới tại một công ty Việt Nam.",
        scenarioEn: "You start a new job at a Vietnamese company.",
        dialogue: [
          { speaker: "HR", speakerLabel: "Nhân sự", vi: "Chào mừng anh David đến với công ty! Em là Thu, phòng Nhân sự.", en: "Welcome to the company, David! I'm Thu from HR.", literal: "Greet welcome older-brother David arrive with company! Younger is Thu, room Human-resources.", keyWords: [{ word: "chào mừng", pronunciation: "jào mừng", meaning: "welcome", tone: "huyen" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn em Thu! Rất vui được làm việc ở đây.", en: "Thank you, Thu! Very happy to work here.", literal: "Feel-grace younger Thu! Very happy receive work at here." },
          { speaker: "HR", speakerLabel: "Nhân sự", vi: "Để em dẫn anh giới thiệu với team nhé. Mọi người ơi, đây là anh David, đồng nghiệp mới!", en: "Let me introduce you to the team. Everyone, this is David, our new colleague!", literal: "Let younger lead older-brother introduce with team ok. Every person hey, here is older-brother David, colleague new!" },
          { speaker: "Team", speakerLabel: "Team", vi: "Chào anh David! Anh ngồi cạnh Hùng nhé. Hùng ơi, hướng dẫn anh David!", en: "Hello David! Sit next to Hùng. Hùng, show David around!", literal: "Greet older-brother David! Older-brother sit beside Hùng ok. Hùng hey, guide older-brother David!" },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Chào anh! Em là Hùng, cùng team với anh. Cần gì cứ hỏi em nhé!", en: "Hello! I'm Hùng, same team as you. Just ask me if you need anything!", literal: "Greet older-brother! Younger is Hùng, same team with older-brother. Need what just ask younger ok!", keyWords: [{ word: "cứ", pronunciation: "cứ", meaning: "just/go ahead (encouraging)", tone: "sac" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cảm ơn Hùng! Cho anh hỏi, WiFi ở đây mật khẩu gì?", en: "Thanks Hùng! Can I ask, what's the WiFi password here?", literal: "Feel-grace Hùng! Give older-brother ask, WiFi at here secret code what?" },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Mật khẩu là 'company2024'. Anh cần em giúp cài phần mềm gì không?", en: "Password is 'company2024'. Do you need me to help install any software?", literal: "Secret code is 'company2024'. Older-brother need younger help install part soft what not?" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ, giúp anh cài Slack và Zoom nhé. Cảm ơn em nhiều!", en: "Yes, help me install Slack and Zoom please. Thank you so much!", literal: "Polite-yes, help older-brother install Slack and Zoom ok. Feel-grace younger much!" },
          { speaker: "Boss", speakerLabel: "Sếp", vi: "(Đi ngang) Chào David! Tôi là Minh, Giám đốc bộ phận. Hẹn gặp anh trong cuộc họp lúc 2 giờ nhé!", en: "(Walking by) Hello David! I'm Minh, Department Director. See you at the 2 PM meeting!", literal: "(Walk across) Greet David! I is Minh, Director department part. Promise meet older-brother in session meeting moment 2 hour ok!", keyWords: [{ word: "Giám đốc", pronunciation: "giám đốc", meaning: "Director/Manager", tone: "sac" }, { word: "cuộc họp", pronunciation: "cuộc họp", meaning: "meeting", tone: "nang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ, cảm ơn anh Minh! Em sẽ có mặt đúng giờ ạ.", en: "Thank you, Mr. Minh! I'll be there on time.", literal: "Polite-yes, feel-grace older-brother Minh! Younger will have face correct hour polite.", keyWords: [{ word: "đúng giờ", pronunciation: "đúng giờ", meaning: "on time/punctual", tone: "sac" }] },
        ],
        grammarPoints: [
          {
            pattern: "Cho + [person] + hỏi",
            patternEn: "'Cho... hỏi' - Polite way to ask",
            explanation: "'Cho anh hỏi' = 'Xin phép hỏi' - cách hỏi lịch sự, dùng ở mọi tình huống.",
            explanationEn: "'Cho anh hỏi' = 'May I ask' - a polite way to ask anything, used in all situations.",
            examples: [
              { vi: "Cho em hỏi, phòng họp ở đâu ạ?", en: "May I ask, where is the meeting room?", literal: "Give younger ask, room meeting at where polite?" },
              { vi: "Cho anh hỏi, deadline dự án là khi nào?", en: "May I ask, when is the project deadline?", literal: "Give older-brother ask, deadline project is when?" },
            ],
          },
          {
            pattern: "Cần gì cứ + Verb",
            patternEn: "'Cần gì cứ...' - Just go ahead and...",
            explanation: "'Cứ' = 'just go ahead'. Dùng để khuyến khích ai đó thoải mái làm việc gì.",
            explanationEn: "'Cứ' = 'just/feel free to'. Used to encourage someone to do something without hesitation.",
            examples: [
              { vi: "Cần gì cứ hỏi.", en: "If you need anything, just ask.", literal: "Need what just ask." },
              { vi: "Cứ thoải mái!", en: "Just relax! / Make yourself comfortable!", literal: "Just comfortable!" },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Gọi Sếp như thế nào?",
            titleEn: "How to address your boss?",
            content: "Ở Việt Nam, bạn gọi sếp bằng đại từ phù hợp (Anh/Chị nếu chênh lệch tuổi ít, hoặc 'Sếp' như biệt danh thân mật). Không nên gọi sếp bằng tên trực tiếp mà không có đại từ. Ví dụ: 'Anh Minh' chứ không phải chỉ 'Minh'.",
            contentEn: "In Vietnam, address your boss with the appropriate pronoun (Anh/Chị for small age gaps, or 'Sếp' as a friendly nickname). Never use just their name without a pronoun. Say 'Anh Minh', not just 'Minh'.",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu giao tiếp công sở.",
          instructionEn: "Complete the workplace phrases.",
          items: [
            { question: "Cho _____ hỏi, WiFi mật khẩu gì ạ? (may I ask)", answer: "anh/em", explanationEn: "Use your appropriate pronoun" },
            { question: "Cần gì _____ hỏi em nhé! (just go ahead)", answer: "cứ", explanationEn: "'Cứ' = just/feel free to" },
            { question: "Em sẽ có mặt _____ giờ ạ. (on time)", answer: "đúng", explanationEn: "'Đúng giờ' = on time/punctual" },
          ],
        },
      },
      {
        id: "vff-work-email",
        title: "Viết email và họp hành",
        titleEn: "Writing Emails & Attending Meetings",
        icon: "📧",
        scenario: "Bạn cần gửi email cho sếp và tham dự cuộc họp đầu tiên.",
        scenarioEn: "You need to email your boss and attend your first meeting.",
        dialogue: [
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Anh David, sếp Minh vừa gửi email bảo 2 giờ họp nhé.", en: "David, boss Minh just emailed saying meeting at 2.", literal: "Older-brother David, boss Minh just send email tell 2 hour meeting ok.", keyWords: [{ word: "vừa", pronunciation: "vừa", meaning: "just (recently)", tone: "huyen" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "OK! Mình reply email thế nào cho lịch sự?", en: "OK! How do I reply politely to the email?", literal: "OK! Self reply email how for polite?" },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Viết: 'Dạ anh, em nhận được email. Em sẽ có mặt đúng giờ ạ.' Nhớ có 'Dạ' đầu và 'ạ' cuối!", en: "Write: 'Yes sir, I received the email. I'll be there on time.' Remember 'Dạ' at start and 'ạ' at end!", literal: "Write: 'Polite-yes older-brother, younger receive email. Younger will have face correct hour polite.' Remember have 'Dạ' start and 'ạ' end!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Trong cuộc họp) Dạ anh Minh, cho em trình bày về dự án ạ.", en: "(In the meeting) Sir, allow me to present about the project.", literal: "(In session meeting) Polite-yes older-brother Minh, give younger present about project polite.", keyWords: [{ word: "trình bày", pronunciation: "trình bày", meaning: "to present/report", tone: "huyen" }, { word: "dự án", pronunciation: "dự án", meaning: "project", tone: "sac" }] },
          { speaker: "Boss", speakerLabel: "Sếp", vi: "Được, David trình bày đi. Mọi người chú ý nhé!", en: "Go ahead David. Everyone, pay attention!", literal: "Receive, David present go. Every person pay-attention ok!" },
          { speaker: "You", speakerLabel: "Bạn", vi: "Dạ, theo em thấy, chúng ta nên hoàn thành trước thứ Sáu.", en: "In my view, we should finish before Friday.", literal: "Polite-yes, according younger see, we should complete before weekday Six.", keyWords: [{ word: "theo em thấy", pronunciation: "theo em thấy", meaning: "in my opinion/view", tone: "ngang" }] },
          { speaker: "Boss", speakerLabel: "Sếp", vi: "Ý kiến hay! Ai có ý kiến gì thêm không?", en: "Good idea! Anyone have additional thoughts?", literal: "Opinion interesting! Who have opinion what add not?", keyWords: [{ word: "ý kiến", pronunciation: "ý kiến", meaning: "opinion/idea", tone: "sac" }] },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Em đồng ý với anh David. Mình cần thêm 2 ngày nữa.", en: "I agree with David. We need 2 more days.", literal: "Younger agree with older-brother David. Self need add 2 day more.", keyWords: [{ word: "đồng ý", pronunciation: "đồng ý", meaning: "agree", tone: "huyen" }] },
          { speaker: "Boss", speakerLabel: "Sếp", vi: "OK, vậy deadline là thứ Sáu tuần sau. Mọi người cố gắng nhé!", en: "OK, deadline is next Friday. Everyone do your best!", literal: "OK, so deadline is weekday Six week after. Every person try ok!" },
        ],
        grammarPoints: [
          {
            pattern: "Theo + [person] + thấy",
            patternEn: "'Theo... thấy' - Expressing opinions politely",
            explanation: "'Theo em thấy' = 'Theo ý kiến của em' - cách đưa ra ý kiến nhẹ nhàng, không áp đặt.",
            explanationEn: "'Theo em thấy' = 'In my view/opinion' - a gentle, non-imposing way to share opinions.",
            examples: [
              { vi: "Theo em thấy, cách này tốt hơn.", en: "In my opinion, this approach is better.", literal: "According younger see, way this good more." },
              { vi: "Theo anh, mình nên họp sớm.", en: "In my view, we should meet earlier.", literal: "According older-brother, self should meeting early." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Email công sở Việt Nam - Luôn có 'Dạ' và 'ạ'",
            titleEn: "Vietnamese work emails - Always include 'Dạ' and 'ạ'",
            content: "Email công sở Việt Nam luôn bắt đầu bằng 'Dạ anh/chị' và kết thúc bằng 'ạ' hoặc 'Trân trọng' (Respectfully). Không bao giờ viết email ngắn gọn kiểu 'OK' hay 'Noted' cho sếp - đó bị coi là thiếu tôn trọng. Luôn viết đầy đủ: 'Dạ anh, em nhận được ạ. Em sẽ xử lý ngay.'",
            contentEn: "Vietnamese work emails always start with 'Dạ anh/chị' and end with 'ạ' or 'Trân trọng' (Respectfully). Never send short replies like 'OK' or 'Noted' to your boss - that's considered disrespectful. Always write fully: 'Yes sir, I received it. I'll handle it right away.'",
          },
        ],
        practice: {
          type: "reorder",
          instruction: "Sắp xếp câu email công sở.",
          instructionEn: "Reorder to form a polite work email reply.",
          items: [
            { question: "em / Dạ / nhận / anh / được / email / ạ", answer: "Dạ anh em nhận được email ạ", explanationEn: "'Dạ anh, em nhận được email ạ' = Yes sir, I received the email" },
            { question: "mặt / em / có / sẽ / đúng / giờ / ạ", answer: "Em sẽ có mặt đúng giờ ạ", explanationEn: "'Em sẽ có mặt đúng giờ ạ' = I'll be there on time" },
            { question: "thấy / theo / nên / em / hoàn thành / mình / sớm", answer: "Theo em thấy mình nên hoàn thành sớm", explanationEn: "'In my view, we should finish early'" },
          ],
        },
      },
      {
        id: "vff-work-lunch",
        title: "Ăn trưa với đồng nghiệp",
        titleEn: "Lunch with Colleagues",
        icon: "🍱",
        scenario: "Đến giờ nghỉ trưa, đồng nghiệp rủ bạn đi ăn cơm.",
        scenarioEn: "It's lunch break, colleagues invite you to eat.",
        dialogue: [
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Anh David, 12 giờ rồi! Đi ăn trưa không?", en: "David, it's 12 o'clock! Want to go for lunch?", literal: "Older-brother David, 12 hour already! Go eat noon not?", keyWords: [{ word: "ăn trưa", pronunciation: "ăn trưa", meaning: "lunch / eat lunch", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Ừ, đi! Mình ăn ở đâu?", en: "Yeah, let's go! Where do we eat?", literal: "Yeah, go! Self eat at where?" },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Có quán cơm văn phòng ngay đường sau. Rẻ mà ngon lắm!", en: "There's an office lunch spot right on the back street. Cheap and delicious!", literal: "Have shop rice office right road behind. Cheap but delicious very!", keyWords: [{ word: "cơm văn phòng", pronunciation: "cơm văn phòng", meaning: "office lunch set (cheap lunch combo)", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cơm văn phòng là gì? Có những món gì?", en: "What is 'office rice'? What dishes are there?", literal: "Rice office is what? Have those dish what?" },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "Là cơm + 1 món mặn + rau + canh. Khoảng 35-45 nghìn. Chọn thịt kho, cá chiên, hoặc sườn nướng.", en: "It's rice + 1 main dish + veggies + soup. About 35-45k. Choose braised pork, fried fish, or grilled ribs.", literal: "Is rice + 1 dish salty + vegetable + soup. About 35-45 thousand. Choose meat braise, fish fry, or rib grill.", keyWords: [{ word: "thịt kho", pronunciation: "thịt kho", meaning: "braised/caramelized pork", tone: "ngang" }, { word: "canh", pronunciation: "canh", meaning: "Vietnamese soup (brothy)", tone: "ngang" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "(Tại quán) Cho em một phần cơm sườn nướng! Thêm trứng chiên nhé.", en: "(At the shop) One grilled rib rice set! Add a fried egg please.", literal: "(At shop) Give younger one portion rice rib grill! Add egg fry ok." },
          { speaker: "Server", speakerLabel: "Phục vụ", vi: "Dạ được! Em uống gì không? Trà đá miễn phí nhé.", en: "Sure! What would you like to drink? Iced tea is free.", literal: "Polite-yes receive! Younger drink what not? Tea ice free ok.", keyWords: [{ word: "trà đá", pronunciation: "trà đá", meaning: "iced tea (free at most Vietnamese eateries)", tone: "sac" }, { word: "miễn phí", pronunciation: "miễn phí", meaning: "free (no cost)", tone: "hoi" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Cho em trà đá thôi. Cảm ơn chị!", en: "Just iced tea, please. Thank you!", literal: "Give younger tea ice only. Feel-grace older-sister!" },
          { speaker: "Hùng", speakerLabel: "Hùng", vi: "(Ăn xong) Ngon không anh? Chiều nay công ty có trà chiều nữa, đừng bỏ lỡ!", en: "(After eating) Was it good? The company has afternoon tea today, don't miss it!", literal: "(Eat finish) Delicious not older-brother? Afternoon this company have tea afternoon more, don't miss!", keyWords: [{ word: "trà chiều", pronunciation: "trà chiều", meaning: "afternoon tea/snack break", tone: "huyen" }] },
          { speaker: "You", speakerLabel: "Bạn", vi: "Ngon lắm! Ở Việt Nam ăn trưa rẻ quá!", en: "Very delicious! Lunch in Vietnam is so cheap!", literal: "Delicious very! At Vietnam eat noon cheap too-much!" },
        ],
        grammarPoints: [
          {
            pattern: "Một phần + [dish]",
            patternEn: "'Một phần' - Ordering a set meal",
            explanation: "'Phần' = portion/serving. 'Một phần cơm sườn' = 1 rib rice set.",
            explanationEn: "'Phần' = portion/serving/set. 'Một phần cơm sườn' = 1 grilled rib rice set.",
            examples: [
              { vi: "Cho em một phần cơm gà.", en: "One chicken rice set please.", literal: "Give younger one portion rice chicken." },
              { vi: "Hai phần cơm thịt kho.", en: "Two braised pork rice sets.", literal: "Two portion rice meat braise." },
            ],
          },
        ],
        culturalNotes: [
          {
            title: "Trà đá miễn phí - Nét đẹp Việt Nam",
            titleEn: "Free iced tea - A beautiful Vietnamese custom",
            content: "Hầu hết quán cơm bình dân ở Việt Nam đều phục vụ trà đá miễn phí. Đó là loại trà xanh pha loãng với đá. Đây là cách quán thể hiện sự hiếu khách và giữ chân khách hàng. Đừng ngạc nhiên khi thấy bình trà to trên bàn - cứ tự rót uống!",
            contentEn: "Most Vietnamese lunch shops serve free iced tea - a diluted green tea with ice. This is a hospitality gesture to keep customers coming back. Don't be surprised to see a large tea pot on the table - just pour and drink!",
          },
        ],
        practice: {
          type: "fill-blank",
          instruction: "Hoàn thành câu gọi món ăn trưa.",
          instructionEn: "Complete the lunch ordering sentences.",
          items: [
            { question: "Cho em một _____ cơm sườn nướng. (one serving)", answer: "phần", explanationEn: "'Phần' = portion/serving/set" },
            { question: "Trà đá _____ _____ nhé. (free)", answer: "miễn phí", explanationEn: "'Miễn phí' = free of charge" },
            { question: "Cơm _____ _____ = rice + main dish + veggies + soup", answer: "văn phòng", explanationEn: "'Cơm văn phòng' = office lunch set" },
          ],
        },
      },
    ],
  },
];
