// IELTS Curriculum: Academic Vocabulary, Grammar 7.0+, Writing, Reading, Listening, Speaking
import type { LanguageModule } from "./types";
import { ieltsReadingExpansionLessons, ieltsListeningExpansionLessons } from "./englishIeltsReadingListening";
import { ieltsReadingExpansion2Lessons, ieltsListeningExpansion2Lessons } from "./englishIeltsReadingListening2";
import { ieltsReadingExpansion3Lessons, ieltsListeningExpansion3Lessons } from "./englishIeltsReadingListening3";
import { ieltsReadingExpansion4Lessons, ieltsListeningExpansion4Lessons } from "./englishIeltsReadingListening4";

export const ieltsModules: LanguageModule[] = [
  {
    id: "ielts-academic-vocab",
    title: "IELTS Academic Vocabulary",
    titleEn: "IELTS Academic Vocabulary",
    icon: "📚",
    color: "from-blue-500/20 to-indigo-500/20",
    description: "Từ vựng học thuật thiết yếu cho IELTS Band 7.0+",
    descriptionEn: "Essential academic vocabulary for IELTS Band 7.0+",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-vocab-1",
        title: "Từ vựng chủ đề Education",
        titleEn: "Education Topic Vocabulary",
        level: 2,
        difficulty: "intermediate",
        theory: "**Education** là một trong những chủ đề phổ biến nhất trong IELTS Writing & Speaking.\n\n**Từ vựng Band 7.0+:**\n- **curriculum** /kəˈrɪkjələm/: chương trình giảng dạy\n- **pedagogical** /ˌpedəˈɡɒdʒɪkəl/: thuộc về phương pháp sư phạm\n- **vocational training**: đào tạo nghề\n- **rote learning**: học vẹt\n- **holistic education**: giáo dục toàn diện\n\n**Collocations quan trọng:**\n- pursue higher education\n- acquire knowledge\n- broaden one's horizons\n- foster critical thinking\n- bridge the gap between theory and practice",
        theoryEn: "**Education** is one of the most common topics in IELTS Writing & Speaking.\n\n**Band 7.0+ Vocabulary:**\n- **curriculum**: course of study\n- **pedagogical**: relating to teaching methods\n- **vocational training**: job-specific training\n- **rote learning**: memorization without understanding\n- **holistic education**: whole-person education\n\n**Key Collocations:**\n- pursue higher education\n- acquire knowledge\n- broaden one's horizons\n- foster critical thinking\n- bridge the gap between theory and practice",
        proTips: [
          "Dùng collocations thay vì từ đơn lẻ để tăng điểm Lexical Resource",
          "Tránh lặp từ: thay 'important' bằng 'pivotal', 'crucial', 'paramount'",
        ],
        proTipsEn: [
          "Use collocations instead of single words to boost Lexical Resource score",
          "Avoid repetition: replace 'important' with 'pivotal', 'crucial', 'paramount'",
        ],
        vocabulary: [
          { word: "curriculum", ipa: "/kəˈrɪkjələm/", meaning: "chương trình giảng dạy", example: "The national curriculum should include coding skills.", partOfSpeech: "noun" },
          { word: "pedagogical", ipa: "/ˌpedəˈɡɒdʒɪkəl/", meaning: "thuộc sư phạm", example: "Pedagogical approaches vary across cultures.", partOfSpeech: "adjective" },
          { word: "vocational", ipa: "/vəʊˈkeɪʃənəl/", meaning: "thuộc nghề nghiệp", example: "Vocational training prepares students for specific careers.", partOfSpeech: "adjective" },
          { word: "rote learning", ipa: "/rəʊt ˈlɜːnɪŋ/", meaning: "học vẹt, học thuộc lòng", example: "Rote learning is still prevalent in many Asian countries.", partOfSpeech: "noun" },
          { word: "holistic", ipa: "/həˈlɪstɪk/", meaning: "toàn diện", example: "A holistic approach to education develops both mind and body.", partOfSpeech: "adjective" },
          { word: "foster", ipa: "/ˈfɒstər/", meaning: "nuôi dưỡng, thúc đẩy", example: "Schools should foster creativity in young learners.", partOfSpeech: "verb" },
          { word: "paramount", ipa: "/ˈpærəmaʊnt/", meaning: "tối quan trọng", example: "Quality education is paramount for national development.", partOfSpeech: "adjective" },
          { word: "underpin", ipa: "/ˌʌndəˈpɪn/", meaning: "làm nền tảng", example: "Strong literacy skills underpin academic success.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp vào chỗ trống",
            instructionEn: "Fill in the blanks with appropriate words",
            sentences: [
              { text: "The school adopted a ___ approach to education, focusing on both academic and personal development.", textEn: "The school adopted a ___ approach to education.", answer: "holistic", hint: "h_____ic" },
              { text: "Teachers should ___ critical thinking rather than encourage rote learning.", textEn: "Teachers should ___ critical thinking.", answer: "foster", hint: "f____r" },
              { text: "The national ___ was updated to include digital literacy skills.", textEn: "The national ___ was updated.", answer: "curriculum", hint: "c________m" },
              { text: "Quality education is ___ for economic growth.", textEn: "Quality education is ___ for economic growth.", answer: "paramount", hint: "p_______t" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp các từ thành câu hoàn chỉnh",
            instructionEn: "Rearrange the words to form a complete sentence",
            items: [
              { scrambled: ["education", "should", "Holistic", "the", "develop", "whole", "person"], correct: "Holistic education should develop the whole person" },
              { scrambled: ["is", "for", "Critical", "thinking", "academic", "essential", "success"], correct: "Critical thinking is essential for academic success" },
              { scrambled: ["between", "bridge", "We", "must", "the", "gap", "theory", "practice", "and"], correct: "We must bridge the gap between theory and practice" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'pedagogical' mean?", options: ["Medical", "Related to teaching methods", "Economic", "Political"], answer: 1, explanation: "'Pedagogical' means relating to the methods and practice of teaching." },
          { question: "Which collocation is correct?", options: ["make knowledge", "acquire knowledge", "do knowledge", "take knowledge"], answer: 1, explanation: "'Acquire knowledge' is a standard collocation meaning to gain knowledge." },
          { question: "What does 'foster critical thinking' mean?", options: ["Criticize thinking", "Nurture/encourage critical thinking", "Eliminate thinking", "Test thinking"], answer: 1, explanation: "'Foster' means to encourage or promote. 'Foster critical thinking' = encourage analytical thinking." },
        ],
      },
      {
        id: "ielts-vocab-2",
        title: "Từ vựng chủ đề Technology",
        titleEn: "Technology Topic Vocabulary",
        level: 2,
        difficulty: "intermediate",
        theory: "**Technology** xuất hiện thường xuyên trong IELTS, đặc biệt Writing Task 2.\n\n**Từ vựng nâng cao:**\n- **cutting-edge**: tiên tiến nhất\n- **automation**: tự động hóa\n- **artificial intelligence (AI)**: trí tuệ nhân tạo\n- **obsolete**: lỗi thời\n- **unprecedented**: chưa từng có\n\n**Cấu trúc Band 7.0+:**\n- The advent of technology has **revolutionized** the way we...\n- Technology has **permeated** every aspect of modern life.\n- The **proliferation** of smartphones has led to...\n- While technology **facilitates** communication, it can also **exacerbate** social isolation.",
        theoryEn: "**Technology** appears frequently in IELTS, especially Writing Task 2.\n\n**Advanced vocabulary:**\n- **cutting-edge**: most advanced\n- **automation**: making processes automatic\n- **artificial intelligence (AI)**: machine intelligence\n- **obsolete**: outdated\n- **unprecedented**: never seen before\n\n**Band 7.0+ structures:**\n- The advent of technology has **revolutionized** the way we...\n- Technology has **permeated** every aspect of modern life.",
        proTips: ["Dùng 'the advent of' thay cho 'the appearance of' để nâng band"],
        proTipsEn: ["Use 'the advent of' instead of 'the appearance of' for higher band"],
        vocabulary: [
          { word: "cutting-edge", ipa: "/ˈkʌtɪŋ edʒ/", meaning: "tiên tiến nhất", example: "Cutting-edge technology is transforming healthcare.", partOfSpeech: "adjective" },
          { word: "automation", ipa: "/ˌɔːtəˈmeɪʃən/", meaning: "tự động hóa", example: "Automation threatens many low-skilled jobs.", partOfSpeech: "noun" },
          { word: "obsolete", ipa: "/ˈɒbsəliːt/", meaning: "lỗi thời", example: "DVDs have become obsolete due to streaming services.", partOfSpeech: "adjective" },
          { word: "permeate", ipa: "/ˈpɜːmieɪt/", meaning: "thẩm thấu, lan tỏa", example: "Social media has permeated every aspect of life.", partOfSpeech: "verb" },
          { word: "proliferation", ipa: "/prəˌlɪfəˈreɪʃən/", meaning: "sự gia tăng nhanh chóng", example: "The proliferation of fake news is a major concern.", partOfSpeech: "noun" },
          { word: "exacerbate", ipa: "/ɪɡˈzæsəbeɪt/", meaning: "làm trầm trọng thêm", example: "Excessive screen time can exacerbate anxiety.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp vào câu",
            instructionEn: "Fill in the appropriate word",
            sentences: [
              { text: "The ___ of smartphones has changed how we communicate.", textEn: "The ___ of smartphones has changed how we communicate.", answer: "proliferation", hint: "p___________n" },
              { text: "Many traditional jobs may become ___ due to AI.", textEn: "Many traditional jobs may become ___ due to AI.", answer: "obsolete", hint: "o______e" },
              { text: "Social media has ___ every aspect of modern life.", textEn: "Social media has ___ every aspect of modern life.", answer: "permeated", hint: "p_______d" },
              { text: "This company uses ___ technology in their products.", textEn: "This company uses ___ technology.", answer: "cutting-edge", hint: "c______-e__e" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu hoàn chỉnh",
            instructionEn: "Arrange into a complete sentence",
            items: [
              { scrambled: ["has", "Technology", "the", "revolutionized", "way", "we", "communicate"], correct: "Technology has revolutionized the way we communicate" },
              { scrambled: ["can", "Excessive", "time", "screen", "exacerbate", "anxiety"], correct: "Excessive screen time can exacerbate anxiety" },
            ],
          },
        ],
        quiz: [
          { question: "'Obsolete' is a synonym of?", options: ["Modern", "Outdated", "Popular", "Expensive"], answer: 1, explanation: "'Obsolete' means no longer in use, synonymous with 'outdated'." },
          { question: "Fill in: 'The advent of AI has ___ traditional industries.'", options: ["disrupted", "created", "ignored", "maintained"], answer: 0, explanation: "'Disrupt' means to drastically change. AI has disrupted traditional industries." },
          { question: "What does 'permeate' mean?", options: ["Disappear", "Spread through, pervade", "Shrink", "Oppose"], answer: 1, explanation: "'Permeate' means to spread through every part of something." },
        ],
      },
      {
        id: "ielts-vocab-3",
        title: "Từ vựng chủ đề Environment",
        titleEn: "Environment Topic Vocabulary",
        level: 3,
        difficulty: "intermediate",
        theory: "**Environment & Climate Change** là chủ đề nóng trong IELTS.\n\n**Từ vựng thiết yếu:**\n- **carbon footprint**: lượng khí thải carbon\n- **sustainability**: sự bền vững\n- **biodiversity**: đa dạng sinh học\n- **deforestation**: nạn phá rừng\n- **renewable energy**: năng lượng tái tạo\n- **greenhouse gases**: khí nhà kính\n- **ecological balance**: cân bằng sinh thái\n\n**Cấu trúc nâng cao:**\n- The government should **implement stringent regulations** to curb pollution.\n- **Sustainable development** is the key to **safeguarding** our planet.\n- Climate change poses an **existential threat** to humanity.",
        theoryEn: "**Environment & Climate Change** is a hot topic in IELTS.\n\n**Essential vocabulary:**\n- **carbon footprint**: amount of carbon emissions\n- **sustainability**: ability to maintain long-term\n- **biodiversity**: variety of living species\n- **deforestation**: destruction of forests\n- **renewable energy**: energy from natural sources",
        vocabulary: [
          { word: "sustainability", ipa: "/səˌsteɪnəˈbɪlɪti/", meaning: "sự bền vững", example: "Sustainability should be at the core of business strategies.", partOfSpeech: "noun" },
          { word: "biodiversity", ipa: "/ˌbaɪəʊdaɪˈvɜːsɪti/", meaning: "đa dạng sinh học", example: "Deforestation is a major threat to biodiversity.", partOfSpeech: "noun" },
          { word: "carbon footprint", meaning: "dấu chân carbon", example: "We should all try to reduce our carbon footprint.", partOfSpeech: "noun" },
          { word: "stringent", ipa: "/ˈstrɪndʒənt/", meaning: "nghiêm ngặt", example: "Stringent regulations are needed to control emissions.", partOfSpeech: "adjective" },
          { word: "safeguard", ipa: "/ˈseɪfɡɑːd/", meaning: "bảo vệ", example: "We must safeguard the environment for future generations.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp",
            instructionEn: "Fill in the appropriate word",
            sentences: [
              { text: "___ is the variety of plant and animal life in a habitat.", textEn: "___ is the variety of life in a habitat.", answer: "Biodiversity", hint: "B___________y" },
              { text: "Governments should implement ___ regulations to curb pollution.", textEn: "Governments should implement ___ regulations.", answer: "stringent", hint: "s_______t" },
              { text: "We must ___ natural resources for future generations.", textEn: "We must ___ natural resources.", answer: "safeguard", hint: "s_______d" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'carbon footprint' mean?", options: ["Footprint in sand", "Total carbon emissions", "A type of shoe", "Carbon fossil"], answer: 1, explanation: "'Carbon footprint' = the total amount of carbon emissions produced by a person or organization." },
          { question: "Which word is synonymous with 'stringent'?", options: ["Relaxed", "Flexible", "Strict", "Optional"], answer: 2, explanation: "'Stringent' means strict, synonymous with 'strict'." },
        ],
      },
      {
        id: "ielts-vocab-4",
        title: "Từ vựng chủ đề Health & Lifestyle",
        titleEn: "Health & Lifestyle Vocabulary",
        level: 2,
        difficulty: "intermediate",
        theory: "**Health** là chủ đề thường gặp trong Speaking Part 2-3 và Writing Task 2.\n\n**Từ vựng chuyên sâu:**\n- **sedentary lifestyle**: lối sống ít vận động\n- **chronic disease**: bệnh mãn tính\n- **mental well-being**: sức khỏe tinh thần\n- **preventive healthcare**: chăm sóc sức khỏe phòng ngừa\n- **obesity epidemic**: đại dịch béo phì\n- **work-life balance**: cân bằng công việc-cuộc sống\n\n**Collocations:**\n- lead a healthy lifestyle\n- raise awareness about...\n- combat obesity\n- promote physical activity",
        theoryEn: "**Health** is a common topic in Speaking Part 2-3 and Writing Task 2.\n\n**In-depth vocabulary:**\n- **sedentary lifestyle**: inactive way of living\n- **chronic disease**: long-lasting illness\n- **mental well-being**: mental health\n- **preventive healthcare**: health prevention\n- **obesity epidemic**: widespread obesity",
        vocabulary: [
          { word: "sedentary", ipa: "/ˈsedəntəri/", meaning: "ít vận động", example: "A sedentary lifestyle increases the risk of heart disease.", partOfSpeech: "adjective" },
          { word: "chronic", ipa: "/ˈkrɒnɪk/", meaning: "mãn tính", example: "Diabetes is a chronic disease affecting millions.", partOfSpeech: "adjective" },
          { word: "obesity", ipa: "/əʊˈbiːsəti/", meaning: "béo phì", example: "Childhood obesity has reached alarming levels.", partOfSpeech: "noun" },
          { word: "well-being", ipa: "/ˌwelˈbiːɪŋ/", meaning: "sức khỏe, hạnh phúc", example: "Mental well-being is as important as physical health.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành câu",
            instructionEn: "Complete the sentences",
            sentences: [
              { text: "A ___ lifestyle can lead to various health problems.", textEn: "A ___ lifestyle can lead to health problems.", answer: "sedentary", hint: "s________y" },
              { text: "We should raise ___ about mental health issues.", textEn: "We should raise ___ about mental health.", answer: "awareness", hint: "a________s" },
              { text: "The government should ___ physical activity in schools.", textEn: "The government should ___ physical activity.", answer: "promote", hint: "p______e" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'sedentary lifestyle' mean?", options: ["Active lifestyle", "Inactive lifestyle with little exercise", "Luxurious lifestyle", "Simple lifestyle"], answer: 1, explanation: "'Sedentary' means sitting a lot with little physical activity." },
          { question: "Which collocation is correct?", options: ["do awareness", "raise awareness", "make awareness", "give awareness"], answer: 1, explanation: "'Raise awareness' is a standard collocation meaning to increase public knowledge." },
        ],
      },
    ],
  },
  {
    id: "ielts-writing",
    title: "IELTS Writing Skills",
    titleEn: "IELTS Writing Skills",
    icon: "✍️",
    color: "from-purple-500/20 to-violet-500/20",
    description: "Kỹ năng viết Task 1 & Task 2 cho band 7.0+",
    descriptionEn: "Writing skills for Task 1 & Task 2 targeting band 7.0+",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-writing-1",
        title: "Task 2: Cấu trúc bài luận",
        titleEn: "Task 2: Essay Structure",
        level: 3,
        difficulty: "intermediate",
        theory: "**IELTS Writing Task 2** yêu cầu viết bài luận 250+ từ trong 40 phút.\n\n**Cấu trúc chuẩn 4 đoạn:**\n\n**1. Introduction (2-3 câu)**\n- Paraphrase đề bài\n- Thesis statement (nêu quan điểm)\n\n**2. Body Paragraph 1 (5-7 câu)**\n- Topic sentence\n- Explanation\n- Example/Evidence\n- Linking sentence\n\n**3. Body Paragraph 2 (5-7 câu)**\n- Topic sentence (luận điểm 2)\n- Explanation + Example\n\n**4. Conclusion (2-3 câu)**\n- Tóm tắt + restate thesis\n\n**Linking words quan trọng:**\n- Furthermore, Moreover, In addition (thêm ý)\n- However, Nevertheless, On the other hand (đối lập)\n- Therefore, Consequently, As a result (kết quả)\n- For instance, For example, To illustrate (ví dụ)",
        theoryEn: "**IELTS Writing Task 2** requires a 250+ word essay in 40 minutes.\n\n**Standard 4-paragraph structure:**\n1. Introduction: Paraphrase + Thesis\n2. Body 1: Topic sentence + Explanation + Example\n3. Body 2: Topic sentence + Explanation + Example\n4. Conclusion: Summary + Restate thesis",
        proTips: [
          "Luôn paraphrase đề bài, KHÔNG copy nguyên văn",
          "Dùng ít nhất 3 linking words khác nhau mỗi đoạn",
          "Body paragraph nên có ít nhất 1 specific example",
        ],
        proTipsEn: [
          "Always paraphrase the question, NEVER copy it word for word",
          "Use at least 3 different linking words per paragraph",
          "Body paragraphs should have at least 1 specific example",
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp các câu thành Introduction hoàn chỉnh",
            instructionEn: "Arrange sentences into a complete Introduction",
            items: [
              {
                scrambled: [
                  "This essay will discuss both perspectives and provide my opinion.",
                  "Some people believe that university education should be free for all students.",
                  "However, others argue that students should pay tuition fees.",
                ],
                correct: "Some people believe that university education should be free for all students. However, others argue that students should pay tuition fees. This essay will discuss both perspectives and provide my opinion.",
              },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Điền linking word phù hợp",
            instructionEn: "Fill in appropriate linking words",
            sentences: [
              { text: "Technology has made communication easier. ___, it has also created new challenges.", textEn: "Technology has made communication easier. ___, it has also created new challenges.", answer: "However", hint: "H______r" },
              { text: "Education is crucial for personal growth. ___, it contributes to economic development.", textEn: "Education is crucial. ___, it contributes to economic development.", answer: "Furthermore", hint: "F__________e" },
              { text: "Many students lack motivation. ___, they may drop out of school.", textEn: "Many students lack motivation. ___, they may drop out.", answer: "Consequently", hint: "C___________y" },
            ],
          },
        ],
        quiz: [
          { question: "How many sentences should the introduction have?", options: ["1 sentence", "2-3 sentences", "5-6 sentences", "8-10 sentences"], answer: 1, explanation: "IELTS Writing Task 2 introduction typically has 2-3 sentences: paraphrase + thesis statement." },
          { question: "Which linking word shows contrast?", options: ["Furthermore", "Nevertheless", "Therefore", "For instance"], answer: 1, explanation: "'Nevertheless' expresses contrast/opposition, similar to 'however'." },
          { question: "What should a body paragraph start with?", options: ["Example", "Topic sentence", "Conclusion", "Question"], answer: 1, explanation: "Each body paragraph should start with a topic sentence stating the main argument." },
        ],
      },
      {
        id: "ielts-writing-2",
        title: "Task 1: Mô tả biểu đồ",
        titleEn: "Task 1: Describing Charts",
        level: 3,
        difficulty: "intermediate",
        theory: "**IELTS Writing Task 1** yêu cầu mô tả biểu đồ/bảng/quy trình trong 150+ từ (20 phút).\n\n**Các loại biểu đồ:**\n- Line graph (biểu đồ đường)\n- Bar chart (biểu đồ cột)\n- Pie chart (biểu đồ tròn)\n- Table (bảng số liệu)\n- Process diagram (sơ đồ quy trình)\n- Map (bản đồ)\n\n**Cấu trúc:**\n1. **Introduction**: Paraphrase mô tả biểu đồ\n2. **Overview**: 2 xu hướng/đặc điểm nổi bật nhất\n3. **Detail 1**: Mô tả cụ thể với số liệu\n4. **Detail 2**: Mô tả cụ thể với số liệu\n\n**Từ vựng mô tả xu hướng:**\n- Tăng: increase, rise, grow, surge, soar\n- Giảm: decrease, decline, drop, plummet, fall\n- Ổn định: remain stable, level off, plateau\n- Dao động: fluctuate, vary\n- Đạt đỉnh: peak, reach a peak/high of...\n- Chạm đáy: bottom out, reach a low of...",
        theoryEn: "**IELTS Writing Task 1** requires describing a chart/table/process in 150+ words (20 min).\n\n**Trend vocabulary:**\n- Increase: rise, grow, surge, soar\n- Decrease: decline, drop, plummet\n- Stable: remain stable, level off, plateau\n- Fluctuate: vary, oscillate\n- Peak: reach a peak/high\n- Bottom out: reach a low",
        proTips: [
          "PHẢI có Overview paragraph - không có sẽ mất điểm nặng",
          "Dùng 'approximately', 'roughly', 'around' khi số liệu không chính xác",
          "So sánh các mục, đừng chỉ liệt kê số liệu",
        ],
        proTipsEn: [
          "MUST include an Overview paragraph - omitting it loses significant marks",
          "Use 'approximately', 'roughly', 'around' for approximate figures",
          "Compare items, don't just list data",
        ],
        vocabulary: [
          { word: "surge", ipa: "/sɜːdʒ/", meaning: "tăng vọt", example: "Sales surged by 50% in the final quarter.", partOfSpeech: "verb" },
          { word: "plummet", ipa: "/ˈplʌmɪt/", meaning: "giảm mạnh", example: "Temperatures plummeted to -10°C in January.", partOfSpeech: "verb" },
          { word: "plateau", ipa: "/ˈplætəʊ/", meaning: "ổn định, bằng phẳng", example: "Sales plateaued at around 500 units.", partOfSpeech: "verb" },
          { word: "fluctuate", ipa: "/ˈflʌktʃueɪt/", meaning: "dao động", example: "Prices fluctuated between $10 and $15.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ mô tả xu hướng phù hợp",
            instructionEn: "Choose the appropriate trend word",
            sentences: [
              { text: "The number of tourists ___ from 2 million in 2010 to 8 million in 2020.", textEn: "Tourists ___ from 2M to 8M.", answer: "surged", hint: "s____d" },
              { text: "After reaching a peak in July, temperatures ___ sharply in autumn.", textEn: "Temperatures ___ sharply in autumn.", answer: "plummeted", hint: "p________d" },
              { text: "The unemployment rate ___ between 5% and 7% throughout the decade.", textEn: "Unemployment ___ between 5% and 7%.", answer: "fluctuated", hint: "f_________d" },
            ],
          },
        ],
        quiz: [
          { question: "Which part is ESSENTIAL in Task 1?", options: ["Conclusion", "Overview", "Personal opinion", "Prediction"], answer: 1, explanation: "The overview is MANDATORY in Task 1. Missing it severely affects Task Achievement score." },
          { question: "'Plummet' describes what kind of trend?", options: ["Slight increase", "Sharp decrease", "Stable", "Fluctuating"], answer: 1, explanation: "'Plummet' means to drop sharply and suddenly (dramatic decrease)." },
        ],
      },
      {
        id: "ielts-writing-3",
        title: "Cohesion & Coherence",
        titleEn: "Cohesion & Coherence",
        level: 4,
        difficulty: "advanced",
        theory: "**Cohesion & Coherence (CC)** chiếm 25% điểm Writing.\n\n**Cohesion** = liên kết ngữ pháp giữa các câu:\n- Linking words: However, Moreover, Therefore\n- Reference words: this, these, such, the former/latter\n- Substitution: do so, one/ones\n- Lexical cohesion: synonym, paraphrase\n\n**Coherence** = logic và tổ chức ý:\n- Mỗi đoạn = 1 ý chính\n- Ý được phát triển logic\n- Progression tự nhiên\n\n**Band 7+ Tips:**\n- Tránh overuse linking words (không phải câu nào cũng cần)\n- Dùng pronoun reference thay vì lặp lại danh từ\n- Topic sentence → Supporting → Example → Link to next paragraph",
        theoryEn: "**Cohesion & Coherence (CC)** accounts for 25% of Writing score.\n\n**Cohesion** = grammatical links between sentences\n**Coherence** = logical organization of ideas",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ nối hoặc đại từ tham chiếu phù hợp",
            instructionEn: "Fill in appropriate linking words or reference pronouns",
            sentences: [
              { text: "Many students struggle with writing. ___ is often due to a lack of practice.", textEn: "Students struggle with writing. ___ is due to lack of practice.", answer: "This", hint: "T__s" },
              { text: "Regular exercise improves physical health. ___, it enhances mental well-being.", textEn: "Exercise improves health. ___, it enhances well-being.", answer: "Moreover", hint: "M______r" },
              { text: "Some prefer online learning. ___ favor traditional classrooms.", textEn: "Some prefer online. ___ favor classrooms.", answer: "Others", hint: "O____s" },
            ],
          },
        ],
        quiz: [
          { question: "What percentage of the Writing score does Cohesion & Coherence account for?", options: ["10%", "25%", "50%", "75%"], answer: 1, explanation: "CC accounts for 25% - equal to the other 3 criteria: Task Achievement, Lexical Resource, Grammatical Range." },
          { question: "Which technique improves cohesion?", options: ["Write longer sentences", "Use pronoun reference", "Use more difficult words", "Write more paragraphs"], answer: 1, explanation: "Pronoun reference (this, these, such) creates natural cohesion rather than repeating words." },
        ],
      },
    ],
  },
  {
    id: "ielts-reading",
    title: "IELTS Reading Strategies",
    titleEn: "IELTS Reading Strategies",
    icon: "📖",
    color: "from-green-500/20 to-emerald-500/20",
    description: "Chiến lược đọc hiểu IELTS Academic & General",
    descriptionEn: "IELTS Academic & General reading strategies",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-reading-1",
        title: "Skimming & Scanning",
        titleEn: "Skimming & Scanning Techniques",
        level: 2,
        difficulty: "intermediate",
        theory: "**Skimming** = đọc lướt để nắm ý chính.\n**Scanning** = tìm thông tin cụ thể.\n\n**Khi nào dùng Skimming:**\n- Đọc lần đầu để hiểu chủ đề\n- Xác định cấu trúc bài\n- Matching headings\n\n**Khi nào dùng Scanning:**\n- True/False/Not Given\n- Sentence completion\n- Short answer questions\n\n**Kỹ thuật Skimming:**\n1. Đọc tiêu đề + câu đầu mỗi đoạn\n2. Chú ý từ khóa in đậm/nghiêng\n3. Đọc câu kết luận\n\n**Kỹ thuật Scanning:**\n1. Xác định keyword trong câu hỏi\n2. Tìm synonym/paraphrase trong bài\n3. Đọc kỹ câu chứa keyword",
        theoryEn: "**Skimming** = reading quickly for main ideas.\n**Scanning** = searching for specific information.\n\n**When to skim:**\n- First reading for topic understanding\n- Matching headings\n\n**When to scan:**\n- True/False/Not Given\n- Sentence completion",
        proTips: [
          "Không cần đọc hiểu 100% bài - IELTS là bài thi tốc độ",
          "Luôn tìm synonym, đề bài HIẾM KHI dùng đúng từ trong bài đọc",
          "Dành 2 phút skimming trước khi làm bất kỳ câu hỏi nào",
        ],
        proTipsEn: [
          "You don't need to understand 100% - IELTS is a speed test",
          "Always look for synonyms; questions RARELY use the exact words from the passage",
          "Spend 2 minutes skimming before attempting any questions",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn kỹ thuật phù hợp: Skimming hay Scanning?",
            instructionEn: "Choose the technique: Skimming or Scanning?",
            sentences: [
              { text: "Bạn cần tìm năm một sự kiện xảy ra → dùng ___", textEn: "Find the year an event occurred → use ___", answer: "Scanning" },
              { text: "Bạn cần xác định chủ đề chính của đoạn văn → dùng ___", textEn: "Identify the main topic → use ___", answer: "Skimming" },
              { text: "Bạn cần xác định True/False/Not Given → dùng ___", textEn: "Determine True/False/Not Given → use ___", answer: "Scanning" },
            ],
          },
        ],
        quiz: [
          { question: "What is skimming?", options: ["Reading word by word", "Quick reading for main ideas", "Translating", "Taking detailed notes"], answer: 1, explanation: "Skimming = reading quickly for main ideas, not word by word." },
          { question: "For True/False/Not Given, which technique should you use?", options: ["Skimming", "Scanning", "Reading the whole text", "Guessing"], answer: 1, explanation: "Scanning helps find the exact information needed for True/False/Not Given." },
        ],
      },
      {
        id: "ielts-reading-2",
        title: "True / False / Not Given",
        titleEn: "True / False / Not Given",
        level: 3,
        difficulty: "intermediate",
        theory: "**T/F/NG** là dạng câu hỏi khó nhất IELTS Reading.\n\n**TRUE:** Thông tin trong bài KHỚP với câu hỏi.\n**FALSE:** Thông tin trong bài NGƯỢC với câu hỏi.\n**NOT GIVEN:** Thông tin KHÔNG ĐƯỢC ĐỀ CẬP trong bài.\n\n**Lưu ý quan trọng:**\n- FALSE ≠ NOT GIVEN\n- FALSE = bài viết nói NGƯỢC lại\n- NOT GIVEN = bài viết KHÔNG NÓI GÌ về vấn đề này\n\n**Ví dụ:**\nBài viết: 'The study involved 500 participants.'\n- 'The study involved 500 people.' → TRUE\n- 'The study involved 200 participants.' → FALSE\n- 'The study took place in London.' → NOT GIVEN",
        theoryEn: "**T/F/NG** is the hardest IELTS Reading question type.\n\n**TRUE:** Information matches the passage.\n**FALSE:** Information contradicts the passage.\n**NOT GIVEN:** Information is not mentioned.",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dựa trên đoạn văn, xác định TRUE, FALSE hoặc NOT GIVEN:\n\nPassage: 'Global temperatures have risen by approximately 1.1°C since the pre-industrial era. Scientists believe this is primarily caused by human activities, particularly the burning of fossil fuels.'",
            instructionEn: "Based on the passage, determine TRUE, FALSE or NOT GIVEN:\n\nPassage: 'Global temperatures have risen by approximately 1.1°C since the pre-industrial era. Scientists believe this is primarily caused by human activities, particularly the burning of fossil fuels.'",
            sentences: [
              { text: "Global temperatures have increased by about 1.1°C → ___", textEn: "Temperatures increased by about 1.1°C → ___", answer: "TRUE" },
              { text: "Natural causes are the main reason for temperature rise → ___", textEn: "Natural causes are the main reason → ___", answer: "FALSE", hint: "Bài nói 'human activities' là nguyên nhân chính" },
              { text: "The temperature will continue to rise in the future → ___", textEn: "Temperature will continue to rise → ___", answer: "NOT GIVEN", hint: "Bài không đề cập tương lai" },
            ],
          },
        ],
        quiz: [
          { question: "When the passage doesn't mention the information in the question, the answer is?", options: ["TRUE", "FALSE", "NOT GIVEN", "Depends on context"], answer: 2, explanation: "NOT GIVEN = the information is not mentioned in the passage. Don't use personal knowledge!" },
          { question: "How is FALSE different from NOT GIVEN?", options: ["The same", "FALSE = passage says the opposite, NG = not mentioned", "FALSE = not mentioned, NG = opposite", "Depends on the case"], answer: 1, explanation: "FALSE: the passage CONTRADICTS the statement. NOT GIVEN: the passage says NOTHING about it." },
        ],
      },
      ...ieltsReadingExpansionLessons,
      ...ieltsReadingExpansion2Lessons,
      ...ieltsReadingExpansion3Lessons,
    ],
  },
  {
    id: "ielts-grammar",
    title: "IELTS Grammar Band 7+",
    titleEn: "IELTS Grammar Band 7+",
    icon: "📝",
    color: "from-orange-500/20 to-amber-500/20",
    description: "Ngữ pháp nâng cao cho band 7.0+",
    descriptionEn: "Advanced grammar for band 7.0+",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-grammar-1",
        title: "Complex Sentences",
        titleEn: "Complex Sentences",
        level: 3,
        difficulty: "intermediate",
        theory: "**Complex sentences** giúp tăng điểm Grammatical Range & Accuracy.\n\n**Cấu trúc:**\nMain clause + Subordinate clause (liên kết bằng conjunction)\n\n**Conjunction phổ biến:**\n- **Nguyên nhân:** because, since, as, due to the fact that\n- **Nhượng bộ:** although, even though, despite, in spite of\n- **Điều kiện:** if, unless, provided that, as long as\n- **Thời gian:** while, when, before, after, until\n- **Mục đích:** so that, in order that, so as to\n\n**Ví dụ Band 7+:**\n- Although technology **has facilitated** communication, it **has also led to** social isolation.\n- **Provided that** governments invest in education, economic growth **will follow**.\n- **Despite** the challenges, many students **manage to** achieve their goals.",
        theoryEn: "**Complex sentences** boost Grammatical Range & Accuracy score.\n\n**Structure:** Main clause + Subordinate clause\n\n**Common conjunctions:**\n- Cause: because, since, due to\n- Concession: although, despite\n- Condition: if, unless, provided that",
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Ghép 2 câu đơn thành câu phức bằng từ nối gợi ý",
            instructionEn: "Combine two simple sentences into a complex sentence",
            items: [
              { scrambled: ["Although", "is expensive,", "university education", "it", "provides", "valuable", "skills."], correct: "Although university education is expensive, it provides valuable skills." },
              { scrambled: ["many people", "will lose", "Unless", "governments", "act,", "their", "jobs."], correct: "Unless governments act, many people will lose their jobs." },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Điền conjunction phù hợp",
            instructionEn: "Fill in the appropriate conjunction",
            sentences: [
              { text: "___ the weather was terrible, the event was a success.", textEn: "___ the weather was terrible, the event succeeded.", answer: "Although", hint: "A______h" },
              { text: "Students will improve ___ they practice regularly.", textEn: "Students will improve ___ they practice.", answer: "provided that", hint: "p_______ t__t" },
              { text: "He studied hard ___ he could pass the exam.", textEn: "He studied hard ___ he could pass.", answer: "so that", hint: "s_ t__t" },
            ],
          },
        ],
        quiz: [
          { question: "Which conjunction expresses 'concession'?", options: ["Because", "Although", "If", "When"], answer: 1, explanation: "'Although' expresses concession, meaning 'even though'." },
          { question: "Which is a complex sentence?", options: ["She studies hard.", "She studies hard, and she gets good grades.", "Although she is busy, she always exercises.", "She is busy. She exercises."], answer: 2, explanation: "Complex sentence = main clause + subordinate clause linked by a conjunction (Although)." },
        ],
      },
      {
        id: "ielts-grammar-2",
        title: "Passive Voice nâng cao",
        titleEn: "Advanced Passive Voice",
        level: 3,
        difficulty: "intermediate",
        theory: "**Passive Voice** rất phổ biến trong Academic Writing.\n\n**Cấu trúc cơ bản:** Subject + be + Past Participle (+ by agent)\n\n**Passive nâng cao cho IELTS:**\n\n1. **It is + adj + that:** It is widely acknowledged that...\n2. **Subject + be + believed/considered/thought + to:** Education is considered to be essential.\n3. **Having been + PP:** Having been rejected twice, he gave up.\n4. **Get + PP (informal):** Many workers got fired. (dùng trong Speaking)\n\n**Khi nào dùng Passive trong IELTS:**\n- Academic Writing (Task 1 mô tả quy trình)\n- Khi người thực hiện hành động không quan trọng\n- Khi muốn nhấn mạnh đối tượng chịu tác động",
        theoryEn: "**Passive Voice** is very common in Academic Writing.\n\n**Advanced passive for IELTS:**\n1. It is widely acknowledged that...\n2. Education is considered to be essential.\n3. Having been rejected, he gave up.",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chuyển sang Passive Voice",
            instructionEn: "Convert to Passive Voice",
            sentences: [
              { text: "People widely acknowledge that education is important. → It ___ that education is important.", textEn: "Convert: People widely acknowledge → It ___", answer: "is widely acknowledged", hint: "is w_____ a_________d" },
              { text: "Scientists have discovered a new species. → A new species ___.", textEn: "Convert: Scientists discovered → A new species ___", answer: "has been discovered", hint: "h__ b___ d_________d" },
              { text: "Many people consider English to be essential. → English ___ to be essential.", textEn: "Convert: Many consider English → English ___", answer: "is considered", hint: "i_ c_________d" },
            ],
          },
        ],
        quiz: [
          { question: "Which structure is correct for advanced Passive?", options: ["It is widely acknowledge", "It is widely acknowledged", "It is wide acknowledged", "It was widely acknowledge"], answer: 1, explanation: "'It is widely acknowledged that...' - acknowledged must be in past participle form." },
          { question: "When should Passive be used in Task 1?", options: ["Always", "When describing processes", "Never", "Only in bar charts"], answer: 1, explanation: "Passive voice is particularly useful for process diagrams where 'who does it' is unimportant." },
        ],
      },
    ],
  },
  {
    id: "ielts-listening",
    title: "IELTS Listening Skills",
    titleEn: "IELTS Listening Skills",
    icon: "🎧",
    color: "from-cyan-500/20 to-teal-500/20",
    description: "Kỹ năng nghe và chiến lược cho 4 phần Listening",
    descriptionEn: "Listening skills and strategies for all 4 sections",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-listening-1",
        title: "Section 1 & 2: Everyday English",
        titleEn: "Section 1 & 2: Everyday English",
        level: 2,
        difficulty: "beginner",
        theory: "**Section 1:** Hội thoại giữa 2 người về chủ đề hàng ngày.\n**Section 2:** Độc thoại về chủ đề xã hội.\n\n**Dạng câu hỏi phổ biến:**\n- Form completion (điền thông tin)\n- Multiple choice\n- Matching\n\n**Chiến lược:**\n1. **Đọc câu hỏi trước** khi nghe (30 giây)\n2. **Predict** loại thông tin cần nghe (tên, số, ngày)\n3. **Chú ý spelling** - viết sai chính tả = mất điểm\n4. **Nghe distractor** - đáp án thường đến SAU thông tin gây nhiễu\n\n**Lưu ý chính tả:**\n- Tên riêng luôn viết HOA\n- Số điện thoại: viết từng số hoặc từng cặp\n- Ngày tháng: 15th March / March 15th đều được",
        theoryEn: "**Section 1:** Conversation between 2 people about everyday topics.\n**Section 2:** Monologue about social topics.\n\n**Strategies:**\n1. Read questions BEFORE listening\n2. Predict information type (name, number, date)\n3. Watch spelling - wrong spelling = lost marks\n4. Listen for distractors - answer often comes AFTER misleading info",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Giả sử bạn nghe đoạn hội thoại sau. Điền thông tin còn thiếu:\n\n'My name is Sarah Thompson. That's T-H-O-M-P-S-O-N. I live at 42 Oak Street, and my phone number is 07845 392 617.'",
            instructionEn: "Based on the dialogue, fill in the missing information",
            sentences: [
              { text: "Name: Sarah ___", textEn: "Name: Sarah ___", answer: "Thompson" },
              { text: "Address: ___ Oak Street", textEn: "Address: ___ Oak Street", answer: "42" },
              { text: "Phone: 07845 ___ 617", textEn: "Phone: 07845 ___ 617", answer: "392" },
            ],
          },
        ],
        quiz: [
          { question: "In IELTS Listening, what happens if you misspell?", options: ["Half a point", "Still correct if close", "Lose the mark completely", "Up to the examiner"], answer: 2, explanation: "IELTS Listening requires EXACT spelling. Misspelling = 0 marks for that question." },
          { question: "What should you do in the 30 seconds before listening?", options: ["Rest", "Read questions and predict answers", "Write predicted answers", "Review previous section"], answer: 1, explanation: "Use the 30 seconds before each section to read questions and predict the type of information you'll hear." },
        ],
      },
      ...ieltsListeningExpansionLessons,
      ...ieltsListeningExpansion2Lessons,
      ...ieltsListeningExpansion3Lessons,
    ],
  },
  {
    id: "ielts-speaking",
    title: "IELTS Speaking Practice",
    titleEn: "IELTS Speaking Practice",
    icon: "🎤",
    color: "from-rose-500/20 to-pink-500/20",
    description: "Luyện Speaking Part 1, 2, 3 với mẫu câu Band 7+",
    descriptionEn: "Practice Speaking Parts 1, 2, 3 with Band 7+ templates",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-speaking-1",
        title: "Part 1: Familiar Topics",
        titleEn: "Part 1: Familiar Topics",
        level: 2,
        difficulty: "beginner",
        theory: "**Speaking Part 1** (4-5 phút): Câu hỏi về bản thân và chủ đề quen thuộc.\n\n**Chủ đề phổ biến:**\n- Home/Accommodation\n- Work/Study\n- Hometown\n- Hobbies/Free time\n- Food/Cooking\n- Weather/Seasons\n\n**Mẫu trả lời Band 7+:**\n\n❌ 'Yes, I like music.' (quá ngắn)\n✅ 'Absolutely! I'm really into music, particularly jazz and classical. I find that listening to music helps me unwind after a long day at work.'\n\n**Kỹ thuật AREA:**\n- **A**nswer: Trả lời trực tiếp\n- **R**eason: Giải thích tại sao\n- **E**xample: Cho ví dụ cụ thể\n- **A**lternative: Thêm ý phụ hoặc so sánh",
        theoryEn: "**Speaking Part 1** (4-5 min): Questions about yourself and familiar topics.\n\n**AREA Technique:**\n- Answer directly\n- Reason why\n- Example\n- Alternative/Additional point",
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu trả lời Part 1 hoàn chỉnh theo kỹ thuật AREA",
            instructionEn: "Arrange into a complete Part 1 answer using AREA technique",
            items: [
              {
                scrambled: [
                  "For instance, I recently tried a Thai cooking class which was fantastic.",
                  "I'd say I'm quite adventurous when it comes to food.",
                  "I enjoy trying different cuisines because it feels like traveling without leaving home.",
                ],
                correct: "I'd say I'm quite adventurous when it comes to food. I enjoy trying different cuisines because it feels like traveling without leaving home. For instance, I recently tried a Thai cooking class which was fantastic.",
              },
            ],
          },
        ],
        quiz: [
          { question: "What steps does the AREA technique include?", options: ["Answer-Reason-Example-Alternative", "Ask-Read-Explain-Answer", "Analyze-Review-Edit-Apply", "Answer-Repeat-Elaborate-Add"], answer: 0, explanation: "AREA = Answer → Reason → Example → Alternative (additional point)." },
          { question: "How long should Part 1 answers be?", options: ["1 sentence", "2-4 sentences", "A long paragraph", "As long as possible"], answer: 1, explanation: "Part 1 answers should be 2-4 sentences - long enough to show skills but not too long (examiner will cut you off)." },
        ],
      },
    ],
  },
];
