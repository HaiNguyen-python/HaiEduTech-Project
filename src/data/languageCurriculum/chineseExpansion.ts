import type { LanguageModule } from "./types";

export const chineseExpansionModules: LanguageModule[] = [
  {
    id: "hsk3-exp-grammar",
    title: "HSK3 语法拓展",
    titleEn: "HSK3 Grammar Expansion",
    icon: "📝",
    color: "from-red-500 to-red-700",
    description: "Ngữ pháp HSK3 nâng cao: bổ ngữ, bị động, so sánh",
    descriptionEn: "Advanced HSK3 grammar: complements, passive, comparisons",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk3-exp-complements",
        title: "结果补语与程度补语",
        titleEn: "Result & Degree Complements",
        level: 3,
        difficulty: "intermediate",
        theory: `# 结果补语 (Result Complement)

Bổ ngữ kết quả đặt sau động từ, chỉ kết quả của hành động.

## Cấu trúc: 动词 + 结果补语
- 看**见** (kàn jiàn) — nhìn thấy
- 听**懂** (tīng dǒng) — nghe hiểu
- 做**完** (zuò wán) — làm xong
- 学**会** (xué huì) — học được

## 程度补语 (Degree Complement)
- Cấu trúc: 动词/形容词 + 得 + 程度
- 她唱**得很好** — Cô ấy hát rất hay
- 他跑**得很快** — Anh ấy chạy rất nhanh
- 我累**得不想动** — Tôi mệt đến mức không muốn cử động`,
        theoryEn: `# Result & Degree Complements

## Result Complement: Verb + Result
- 看见 (see), 听懂 (understand by listening), 做完 (finish doing)

## Degree Complement: Verb/Adj + 得 + Degree
- 她唱得很好 — She sings very well
- 他跑得很快 — He runs very fast`,
        vocabulary: [
          { word: "看见", pinyin: "kàn jiàn", meaning: "nhìn thấy", example: "我看见他了。", partOfSpeech: "verb" },
          { word: "听懂", pinyin: "tīng dǒng", meaning: "nghe hiểu", example: "你听懂了吗？", partOfSpeech: "verb" },
          { word: "做完", pinyin: "zuò wán", meaning: "làm xong", example: "我做完作业了。", partOfSpeech: "verb" },
          { word: "学会", pinyin: "xué huì", meaning: "học được", example: "她学会了游泳。", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền bổ ngữ kết quả phù hợp",
            instructionEn: "Fill in the correct result complement",
            sentences: [
              { text: "我看___那本书了。(thấy)", textEn: "I saw that book.", answer: "见", hint: "kàn jiàn" },
              { text: "你听___老师说的话了吗？(hiểu)", textEn: "Did you understand what the teacher said?", answer: "懂", hint: "tīng dǒng" },
              { text: "她学___开车了。(được)", textEn: "She learned to drive.", answer: "会", hint: "xué huì" },
            ],
          },
        ],
        quiz: [
          { question: "看见 (kàn jiàn) means:", options: ["to look", "to see (successfully)", "to watch TV", "to read"], answer: 1, explanation: "看见 means to see/spot something — the result complement 见 indicates successful seeing." },
          { question: "她唱得很好 — what does 得 do here?", options: ["Possession marker", "Degree complement marker", "Past tense marker", "Question marker"], answer: 1, explanation: "得 connects the verb to a degree complement describing how well." },
        ],
      },
      {
        id: "hsk3-exp-passive",
        title: "被字句 — Câu bị động",
        titleEn: "Passive Sentences with 被",
        level: 3,
        difficulty: "intermediate",
        theory: `# 被字句 (Passive Voice with 被)

## Cấu trúc: 受事 + 被 + (施事) + 动词 + 其他
- 我的手机**被**偷了。— Điện thoại tôi bị trộm mất.
- 蛋糕**被**弟弟吃了。— Bánh bị em trai ăn mất.
- 那本书**被**借走了。— Quyển sách đó đã bị mượn đi.

## Khi nào dùng 被?
1. Khi muốn nhấn mạnh người/vật bị ảnh hưởng
2. Thường mang ý nghĩa tiêu cực (bị mất, bị hỏng)
3. Có thể bỏ chủ thể nếu không biết/không quan trọng

## So sánh với tiếng Việt
- 被 ≈ "bị" (tiêu cực) hoặc "được" (tích cực)
- 他被选为班长 — Anh ấy **được** chọn làm lớp trưởng`,
        theoryEn: `# Passive Voice with 被

Structure: Object + 被 + (Agent) + Verb + Other
- 我的手机被偷了 — My phone was stolen
- Usually carries negative meaning
- Agent can be omitted`,
        vocabulary: [
          { word: "被", pinyin: "bèi", meaning: "bị/được (bị động)", example: "他被老师批评了。", partOfSpeech: "preposition" },
          { word: "偷", pinyin: "tōu", meaning: "trộm", example: "我的钱包被偷了。", partOfSpeech: "verb" },
          { word: "打破", pinyin: "dǎ pò", meaning: "đánh vỡ", example: "杯子被打破了。", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu bị động đúng",
            instructionEn: "Arrange into correct passive sentence",
            items: [
              { scrambled: ["被", "吃", "蛋糕", "了", "弟弟"], correct: "蛋糕被弟弟吃了" },
              { scrambled: ["被", "我的书", "了", "借走"], correct: "我的书被借走了" },
            ],
          },
        ],
        quiz: [
          { question: "被 sentences usually express:", options: ["Happy events", "Negative or unfortunate events", "Future plans", "Questions"], answer: 1, explanation: "被 sentences typically describe unfortunate events (something was stolen, broken, etc.)." },
          { question: "蛋糕被弟弟吃了 means:", options: ["Brother bought the cake", "The cake was eaten by brother", "Brother wants cake", "The cake is delicious"], answer: 1, explanation: "被 marks the passive: the cake WAS EATEN by brother." },
        ],
      },
      {
        id: "hsk3-exp-comparison",
        title: "比较句型 — So sánh",
        titleEn: "Comparison Patterns",
        level: 3,
        difficulty: "intermediate",
        theory: `# 比较句型 (Comparison Patterns)

## 1. A 比 B + Adj
- 他**比**我高。— Anh ấy cao hơn tôi.
- 今天**比**昨天冷。— Hôm nay lạnh hơn hôm qua.

## 2. A 比 B + Adj + 具体差距
- 他比我高**五厘米**。— Anh ấy cao hơn tôi 5cm.
- 她比我大**两岁**。— Cô ấy lớn hơn tôi 2 tuổi.

## 3. A 没有 B + Adj (phủ định)
- 我没有他高。— Tôi không cao bằng anh ấy.

## 4. A 跟 B 一样 + Adj (bằng nhau)
- 我跟他一样高。— Tôi cao bằng anh ấy.

## 5. A 不如 B (kém hơn)
- 我的中文不如他好。— Tiếng Trung của tôi không tốt bằng anh ấy.`,
        theoryEn: `# Comparison Patterns
1. A 比 B + Adj (A is more... than B)
2. A 没有 B + Adj (A is not as... as B)
3. A 跟 B 一样 + Adj (A is the same as B)
4. A 不如 B (A is inferior to B)`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ so sánh phù hợp",
            instructionEn: "Fill in the correct comparison word",
            sentences: [
              { text: "他___我高。(hơn)", textEn: "He is taller than me.", answer: "比" },
              { text: "我___他一样大。(bằng)", textEn: "I am the same age as him.", answer: "跟" },
              { text: "她没___我漂亮。(không bằng)", textEn: "She is not as pretty as me.", answer: "有" },
            ],
          },
        ],
        quiz: [
          { question: "'他比我大两岁' means:", options: ["He is 2 years younger than me", "He is 2 years older than me", "He is the same age as me", "He is 2cm taller"], answer: 1, explanation: "比 + adj + specific difference: he is older by 2 years." },
          { question: "The negative form of 比 comparison is:", options: ["A 不比 B", "A 没有 B + adj", "A 比 B 不", "A 没比 B"], answer: 1, explanation: "A 没有 B + adj means A is not as [adj] as B." },
        ],
      },
      {
        id: "hsk3-exp-duration",
        title: "时量补语 — Thời lượng",
        titleEn: "Duration Expressions",
        level: 3,
        difficulty: "intermediate",
        theory: `# 时量补语 (Duration Complement)

## Cấu trúc cơ bản
动词 + 时量 (+ 的 + 宾语)

## Ví dụ
- 我学了**三年**中文。— Tôi đã học tiếng Trung 3 năm.
- 他等了**两个小时**。— Anh ấy đã đợi 2 tiếng.
- 我看了**一个下午**的书。— Tôi đã đọc sách cả buổi chiều.

## Đơn vị thời gian
- 分钟 (fēn zhōng) — phút
- 小时 (xiǎo shí) — giờ
- 天 (tiān) — ngày
- 星期/周 (xīng qī/zhōu) — tuần
- 月 (yuè) — tháng
- 年 (nián) — năm

## Lưu ý
- Nếu có tân ngữ: 动词 + 了 + 时量 + 的 + 宾语
- 我看了三个小时**的**电视。`,
        theoryEn: `# Duration Complement
Structure: Verb + Duration (+ 的 + Object)
- 我学了三年中文 — I studied Chinese for 3 years
- 他等了两个小时 — He waited for 2 hours`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền đơn vị thời gian phù hợp",
            instructionEn: "Fill in the correct time unit",
            sentences: [
              { text: "我等了两个___。(giờ)", textEn: "I waited for two hours.", answer: "小时" },
              { text: "她学了三___中文。(năm)", textEn: "She studied Chinese for 3 years.", answer: "年" },
            ],
          },
        ],
        quiz: [
          { question: "我看了三个小时的电视 — why is 的 needed here?", options: ["Because it's past tense", "Because there's an object after the duration", "Because it's a question", "It's optional"], answer: 1, explanation: "When there's an object after the duration, 的 connects them." },
          { question: "小时 means:", options: ["minute", "hour", "day", "week"], answer: 1, explanation: "小时 (xiǎo shí) means 'hour'." },
        ],
      },
    ],
  },
  {
    id: "hsk4-exp-advanced",
    title: "HSK4 高级语法",
    titleEn: "HSK4 Advanced Grammar",
    icon: "🎓",
    color: "from-orange-500 to-orange-700",
    description: "Ngữ pháp HSK4: câu phức, thành ngữ, văn viết",
    descriptionEn: "HSK4 grammar: complex sentences, idioms, formal writing",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk4-exp-complex",
        title: "复句 — Câu phức",
        titleEn: "Complex Sentences",
        level: 4,
        difficulty: "advanced",
        theory: `# 复句 (Complex Sentences)

## 1. 因为...所以... (vì...nên...)
- **因为**下雨了，**所以**我没去。— Vì trời mưa nên tôi không đi.

## 2. 虽然...但是... (mặc dù...nhưng...)
- **虽然**他很忙，**但是**他还是来了。— Mặc dù anh ấy bận nhưng vẫn đến.

## 3. 不但...而且... (không những...mà còn...)
- 她**不但**漂亮，**而且**聪明。— Cô ấy không những đẹp mà còn thông minh.

## 4. 如果...就... (nếu...thì...)
- **如果**明天下雨，我**就**不去了。— Nếu ngày mai mưa thì tôi không đi.

## 5. 只要...就... (chỉ cần...thì...)
- **只要**你努力，**就**能成功。— Chỉ cần bạn cố gắng thì sẽ thành công.`,
        theoryEn: `# Complex Sentences
1. 因为...所以... (because...so...)
2. 虽然...但是... (although...but...)
3. 不但...而且... (not only...but also...)
4. 如果...就... (if...then...)
5. 只要...就... (as long as...then...)`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền cặp liên từ phù hợp",
            instructionEn: "Fill in the correct conjunction",
            sentences: [
              { text: "___下雨了，所以我没出门。", textEn: "Because it rained, I didn't go out.", answer: "因为" },
              { text: "虽然很累，___他还是坚持学习。", textEn: "Although tired, he still kept studying.", answer: "但是" },
              { text: "如果你来，我___很高兴。", textEn: "If you come, I will be happy.", answer: "就" },
            ],
          },
        ],
        quiz: [
          { question: "虽然...但是... expresses:", options: ["Cause and effect", "Contrast/concession", "Condition", "Addition"], answer: 1, explanation: "虽然...但是 expresses contrast: although X, but Y." },
          { question: "不但...而且... means:", options: ["Either...or", "Not only...but also", "Although...but", "Because...so"], answer: 1, explanation: "不但...而且 means 'not only...but also'." },
        ],
      },
      {
        id: "hsk4-exp-idioms",
        title: "常用成语 — Thành ngữ thường dùng",
        titleEn: "Common Chinese Idioms",
        level: 4,
        difficulty: "advanced",
        theory: `# 常用成语 (Common Chinese Idioms / Chengyu)

## Thành ngữ 4 chữ phổ biến

### 1. 一举两得 (yī jǔ liǎng dé)
- Nghĩa: Một công đôi việc (Kill two birds with one stone)
- VD: 骑车上班一举两得，既锻炼身体又环保。

### 2. 入乡随俗 (rù xiāng suí sú)
- Nghĩa: Nhập gia tùy tục (When in Rome, do as the Romans do)
- VD: 到了中国就要入乡随俗。

### 3. 自言自语 (zì yán zì yǔ)
- Nghĩa: Tự nói tự nghe (Talk to oneself)

### 4. 马马虎虎 (mǎ mǎ hū hū)
- Nghĩa: Qua loa, tàm tạm (So-so, careless)

### 5. 一边...一边... (yī biān...yī biān...)
- Nghĩa: Vừa...vừa... (While doing X, also doing Y)
- VD: 他一边吃饭一边看电视。`,
        theoryEn: `# Common Chinese Idioms (Chengyu)
- 一举两得: Kill two birds with one stone
- 入乡随俗: When in Rome, do as the Romans do
- 马马虎虎: So-so, careless
- 自言自语: Talk to oneself`,
        vocabulary: [
          { word: "一举两得", pinyin: "yī jǔ liǎng dé", meaning: "một công đôi việc", example: "学中文和交朋友，一举两得。", partOfSpeech: "idiom" },
          { word: "入乡随俗", pinyin: "rù xiāng suí sú", meaning: "nhập gia tùy tục", example: "到了新地方要入乡随俗。", partOfSpeech: "idiom" },
          { word: "马马虎虎", pinyin: "mǎ mǎ hū hū", meaning: "tàm tạm, qua loa", example: "他做事马马虎虎。", partOfSpeech: "idiom" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thành ngữ phù hợp",
            instructionEn: "Fill in the correct idiom",
            sentences: [
              { text: "到了日本就要___，尝试当地食物。", textEn: "When in Japan, do as locals do.", answer: "入乡随俗" },
              { text: "骑车上班___，既省钱又锻炼。", textEn: "Cycling to work kills two birds with one stone.", answer: "一举两得" },
            ],
          },
        ],
        quiz: [
          { question: "一举两得 is closest to which English saying?", options: ["No pain no gain", "Kill two birds with one stone", "Easy come easy go", "Better late than never"], answer: 1, explanation: "一举两得 literally means 'one action, two gains'." },
          { question: "马马虎虎 means:", options: ["Very good", "So-so / careless", "Very bad", "Horse and tiger"], answer: 1, explanation: "马马虎虎 means 'so-so' or doing things carelessly." },
        ],
      },
      {
        id: "hsk4-exp-formal",
        title: "正式写作 — Văn viết trang trọng",
        titleEn: "Formal Writing",
        level: 4,
        difficulty: "advanced",
        theory: `# 正式写作 (Formal Chinese Writing)

## Khác biệt giữa văn nói và văn viết

### Văn nói → Văn viết
- 很多 → 许多 (nhiều)
- 但是 → 然而 (nhưng)
- 还有 → 此外 (ngoài ra)
- 所以 → 因此 (vì vậy)
- 马上 → 立即 (ngay lập tức)

## Cấu trúc bài luận
1. **开头 (Mở bài)**: Giới thiệu chủ đề
2. **正文 (Thân bài)**: Phân tích, đưa ví dụ
3. **结尾 (Kết bài)**: Tóm tắt, đưa ra kết luận

## Cụm từ hữu ích
- 据调查... (Theo khảo sát...)
- 总的来说... (Nhìn chung...)
- 综上所述... (Tóm lại những điều trên...)`,
        theoryEn: `# Formal Chinese Writing
## Spoken → Written equivalents
- 很多 → 许多, 但是 → 然而, 所以 → 因此

## Essay structure: 开头 (intro), 正文 (body), 结尾 (conclusion)`,
        vocabulary: [
          { word: "许多", pinyin: "xǔ duō", meaning: "nhiều (trang trọng)", example: "许多学生参加了比赛。", partOfSpeech: "adjective" },
          { word: "然而", pinyin: "rán ér", meaning: "nhưng, tuy nhiên", example: "他很努力，然而没有成功。", partOfSpeech: "conjunction" },
          { word: "因此", pinyin: "yīn cǐ", meaning: "vì vậy", example: "他生病了，因此没来上课。", partOfSpeech: "conjunction" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chuyển từ văn nói sang văn viết",
            instructionEn: "Convert spoken to written form",
            sentences: [
              { text: "很多 → ___", textEn: "很多 (spoken) → ___ (written)", answer: "许多" },
              { text: "但是 → ___", textEn: "但是 (spoken) → ___ (written)", answer: "然而" },
              { text: "所以 → ___", textEn: "所以 (spoken) → ___ (written)", answer: "因此" },
            ],
          },
        ],
        quiz: [
          { question: "Which is the formal/written equivalent of 很多?", options: ["非常", "许多", "很大", "多少"], answer: 1, explanation: "许多 is the formal/written form of 很多." },
          { question: "综上所述 is used in which part of an essay?", options: ["Introduction", "Body", "Conclusion", "Title"], answer: 2, explanation: "综上所述 (in summary of the above) is used in the conclusion." },
        ],
      },
    ],
  },
  {
    id: "hsk5-exp-advanced",
    title: "HSK5-6 高级篇",
    titleEn: "HSK5-6 Advanced Topics",
    icon: "🏅",
    color: "from-yellow-600 to-yellow-800",
    description: "Ngữ pháp nâng cao HSK5-6 và cổ văn cơ bản",
    descriptionEn: "Advanced HSK5-6 grammar and classical Chinese basics",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk5-exp-grammar-patterns",
        title: "高级语法句式",
        titleEn: "Advanced Grammar Patterns",
        level: 5,
        difficulty: "advanced",
        theory: `# HSK5 高级语法句式

## 1. 与其...不如... (thà...còn hơn...)
- 与其抱怨，不如行动。— Thà hành động còn hơn than phiền.

## 2. 即使...也... (dù cho...cũng...)
- 即使下雨，我也要去。— Dù trời mưa, tôi cũng sẽ đi.

## 3. 无论...都... (bất kể...đều...)
- 无论多难，我都不放弃。— Bất kể khó đến đâu, tôi đều không bỏ cuộc.

## 4. 既然...就... (đã...thì...)
- 既然来了，就好好玩。— Đã đến rồi thì chơi cho vui.

## 5. 不是...而是... (không phải...mà là...)
- 不是我不想去，而是没时间。— Không phải tôi không muốn đi, mà là không có thời gian.`,
        theoryEn: `# HSK5 Advanced Grammar Patterns
1. 与其...不如... (rather than X, better to Y)
2. 即使...也... (even if X, still Y)
3. 无论...都... (no matter X, always Y)
4. 既然...就... (since X, then Y)
5. 不是...而是... (not X, but Y)`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền liên từ phù hợp",
            instructionEn: "Fill in the correct conjunction pattern",
            sentences: [
              { text: "___多忙，我都会锻炼身体。(bất kể)", textEn: "No matter how busy, I always exercise.", answer: "无论" },
              { text: "与其等待，___主动出击。(còn hơn)", textEn: "Rather than wait, better to take initiative.", answer: "不如" },
              { text: "___下雪，他也骑车上班。(dù cho)", textEn: "Even if it snows, he cycles to work.", answer: "即使" },
            ],
          },
        ],
        quiz: [
          { question: "无论...都... expresses:", options: ["Cause-effect", "Unconditional/no matter what", "Contrast", "Preference"], answer: 1, explanation: "无论...都 means 'no matter what...always'." },
          { question: "与其抱怨不如行动 means:", options: ["Complain and then act", "Rather than complain, better to act", "Neither complain nor act", "Complain about the action"], answer: 1, explanation: "与其...不如 means 'rather than X, it's better to Y'." },
        ],
      },
      {
        id: "hsk6-exp-classical",
        title: "文言文入门",
        titleEn: "Classical Chinese Basics",
        level: 5,
        difficulty: "advanced",
        theory: `# 文言文入门 (Introduction to Classical Chinese)

## Tại sao học cổ văn?
- Hiểu thành ngữ sâu hơn
- Đọc hiểu văn bản lịch sử
- Nâng cao trình độ HSK6

## Đặc điểm cổ văn
1. **Ngắn gọn**: Ít từ, nhiều ý
2. **Từ đa nghĩa**: Một chữ nhiều nghĩa tùy ngữ cảnh
3. **Cấu trúc khác**: Tân ngữ có thể đứng trước động từ

## Ví dụ nổi tiếng
### 学而时习之 (Học nhi thời tập chi)
- 学 (học) 而 (và/rồi) 时 (thường xuyên) 习 (ôn tập) 之 (nó/điều đó)
- Nghĩa: Học rồi thường xuyên ôn tập — chẳng phải vui sao?
- Nguồn: Luận Ngữ (论语) — Khổng Tử

### 三人行必有我师 (Tam nhân hành tất hữu ngã sư)
- Ba người đi cùng, ắt có người là thầy ta
- Nghĩa: Luôn có thể học từ người khác`,
        theoryEn: `# Introduction to Classical Chinese
- Characteristics: concise, polysemous words, different word order
- Famous quotes from Confucius (Analerta)
- 学而时习之: Study and regularly review
- 三人行必有我师: Among three people, there's always a teacher`,
        vocabulary: [
          { word: "之", pinyin: "zhī", meaning: "nó, của, đi đến (cổ văn)", example: "学而时习之。", partOfSpeech: "particle" },
          { word: "而", pinyin: "ér", meaning: "và, rồi, nhưng (cổ văn)", example: "学而不思则罔。", partOfSpeech: "conjunction" },
          { word: "其", pinyin: "qí", meaning: "của nó, ấy (cổ văn)", example: "其人如玉。", partOfSpeech: "pronoun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dịch câu cổ văn",
            instructionEn: "Translate the classical Chinese phrase",
            sentences: [
              { text: "学而时习之 — Học rồi thường xuyên ___。", textEn: "Study and regularly ___.", answer: "ôn tập", hint: "review/practice" },
              { text: "三人行必有我___ — Ba người đi cùng ắt có người là thầy ta.", textEn: "Among three, there's always my ___.", answer: "师", hint: "teacher" },
            ],
          },
        ],
        quiz: [
          { question: "In classical Chinese, 之 can mean:", options: ["Only 'of'", "Only 'go'", "'it', 'of', or 'go to' depending on context", "Nothing, it's just a filler"], answer: 2, explanation: "之 is polysemous in classical Chinese — meaning depends on context." },
          { question: "三人行必有我师 teaches:", options: ["Three is a lucky number", "You can always learn from others", "Teachers must walk together", "Study in groups of three"], answer: 1, explanation: "Among any three people, one can be your teacher — always learn from others." },
        ],
      },
      {
        id: "hsk5-exp-news",
        title: "新闻阅读 — Đọc tin tức",
        titleEn: "News Reading",
        level: 4,
        difficulty: "advanced",
        theory: `# 新闻阅读 (Reading Chinese News)

## Cấu trúc bài báo Trung Quốc
1. **标题 (Tiêu đề)**: Ngắn gọn, súc tích
2. **导语 (Lead)**: Ai, cái gì, khi nào, ở đâu, tại sao
3. **正文 (Body)**: Chi tiết, trích dẫn
4. **结尾 (Kết)**: Nhận xét, dự đoán

## Từ vựng báo chí thường gặp
- 据报道 (jù bào dào) — Theo báo cáo
- 有关部门 (yǒu guān bù mén) — Cơ quan liên quan
- 日前 (rì qián) — Gần đây
- 预计 (yù jì) — Dự kiến
- 呼吁 (hū yù) — Kêu gọi
- 措施 (cuò shī) — Biện pháp

## Mẹo đọc tin
- Đọc tiêu đề và lead trước
- Gạch chân từ mới
- Đoán nghĩa từ ngữ cảnh`,
        theoryEn: `# Reading Chinese News
- Structure: Title → Lead → Body → Conclusion
- Key vocab: 据报道 (reportedly), 措施 (measures), 预计 (expected)`,
        vocabulary: [
          { word: "据报道", pinyin: "jù bào dào", meaning: "theo báo cáo", example: "据报道，今年经济增长了5%。", partOfSpeech: "phrase" },
          { word: "措施", pinyin: "cuò shī", meaning: "biện pháp", example: "政府采取了新措施。", partOfSpeech: "noun" },
          { word: "预计", pinyin: "yù jì", meaning: "dự kiến", example: "预计明天会下雨。", partOfSpeech: "verb" },
          { word: "呼吁", pinyin: "hū yù", meaning: "kêu gọi", example: "专家呼吁大家注意健康。", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ vựng báo chí phù hợp",
            instructionEn: "Fill in the correct news vocabulary",
            sentences: [
              { text: "___，今年出口增长了10%。(Theo báo cáo)", textEn: "Reportedly, exports grew by 10%.", answer: "据报道" },
              { text: "政府采取了新___来保护环境。(biện pháp)", textEn: "The government took new measures.", answer: "措施" },
            ],
          },
        ],
        quiz: [
          { question: "据报道 is used to:", options: ["Give an opinion", "Report information from a source", "Ask a question", "Make a request"], answer: 1, explanation: "据报道 means 'according to reports/reportedly'." },
          { question: "The '导语' (lead) of a news article answers:", options: ["Only 'who'", "Only 'what'", "Who, what, when, where, why", "The reporter's opinion"], answer: 2, explanation: "The lead covers the 5W's: who, what, when, where, why." },
        ],
      },
    ],
  },
];
