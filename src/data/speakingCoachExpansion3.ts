// Third expansion pack for Speaking Coach – adds many more themes & sentences
// across all 4 languages. Each theme has 8–10 sentences across easy/medium/hard.
import type { SpeakingTheme } from "./speakingCoachData";

// ============================ ENGLISH ============================
export const englishExtraThemes3: SpeakingTheme[] = [
  {
    id: "en-money", name: "Money & Finance", nameVi: "Tiền bạc & Tài chính", icon: "💰",
    sentences: [
      { id: "en-m1", text: "I try to save a little money every month.", translation: "Tôi cố gắng tiết kiệm một ít tiền mỗi tháng.", ipa: "/aɪ tɹaɪ tə seɪv ə lɪtʌl mʌni ɛvəri mʌnθ/", difficulty: "easy", theme: "money" },
      { id: "en-m2", text: "Can I pay by credit card or only by cash?", translation: "Tôi trả bằng thẻ tín dụng được không hay chỉ bằng tiền mặt?", ipa: "/kæn aɪ peɪ baɪ kɹɛdʌt kɑɹd ɔɹ oʊnli baɪ kæʃ/", difficulty: "easy", theme: "money" },
      { id: "en-m3", text: "The exchange rate is not very good today.", translation: "Tỷ giá hôm nay không tốt lắm.", ipa: "/ðə ɪksʧeɪnʤ ɹeɪt ɪz nɑt vɛɹi gʊd tʌdeɪ/", difficulty: "medium", theme: "money" },
      { id: "en-m4", text: "Investing in stocks can be risky for beginners.", translation: "Đầu tư cổ phiếu có thể rủi ro cho người mới.", ipa: "/ɪnvɛstɪŋ ɪn stɑks kæn bi ɹɪski fɔːr bɪgɪnərz/", difficulty: "medium", theme: "money" },
      { id: "en-m5", text: "I'm trying to live within my budget this year.", translation: "Năm nay tôi đang cố sống trong ngân sách của mình.", ipa: "/aɪm tɹaɪɪŋ tə laɪv wɪðɪn maɪ bʌʤɪt ðɪs jɪɹ/", difficulty: "medium", theme: "money" },
      { id: "en-m6", text: "Inflation has affected the price of basic groceries.", translation: "Lạm phát đã ảnh hưởng đến giá thực phẩm thiết yếu.", ipa: "/ɪnfleɪʃʌn hæz ʌfɛktʌd ðə pɹaɪs əv beɪsɪk gɹoʊsəriz/", difficulty: "hard", theme: "money" },
      { id: "en-m7", text: "Financial literacy should be taught in every school.", translation: "Kiến thức tài chính nên được dạy ở mọi trường học.", ipa: "/fʌnænʃʌl lɪtərʌsi ʃʊd bi tɔt ɪn ɛvəri skul/", difficulty: "hard", theme: "money" },
      { id: "en-m8", text: "I prefer to compare prices before buying anything expensive.", translation: "Tôi thích so sánh giá trước khi mua thứ gì đắt tiền.", ipa: "/aɪ pɹʌfərˈ tə kʌmpɛɹ pɹaɪsʌz bɪfɔɹ baɪɪŋ ɛniθɪˌŋ ɪkspɛnsɪv/", difficulty: "medium", theme: "money" },
    ],
  },
  {
    id: "en-emotions", name: "Feelings & Emotions", nameVi: "Cảm xúc", icon: "😊",
    sentences: [
      { id: "en-e1", text: "I feel really happy when I'm with my friends.", translation: "Tôi cảm thấy rất vui khi ở bên bạn bè.", ipa: "/aɪ fil ɹɪli hæpi wɛn aɪm wɪð maɪ fɹɛndz/", difficulty: "easy", theme: "emotions" },
      { id: "en-e2", text: "Sometimes I feel anxious about the future.", translation: "Đôi khi tôi cảm thấy lo lắng về tương lai.", ipa: "/sʌmtaɪmz aɪ fil æŋkʃʌs ʌbaʊt ðə fjuʧər/", difficulty: "medium", theme: "emotions" },
      { id: "en-e3", text: "Listening to music helps me relax after a long day.", translation: "Nghe nhạc giúp tôi thư giãn sau một ngày dài.", ipa: "/lɪsʌnɪŋ tə mjuzɪk hɛlps mi ɹɪlæks æftər ə lɔŋ deɪ/", difficulty: "medium", theme: "emotions" },
      { id: "en-e4", text: "It's okay to ask for help when you feel overwhelmed.", translation: "Không sao cả khi bạn nhờ giúp đỡ lúc cảm thấy quá tải.", ipa: "/ɪts ˌoʊˈkeɪ tə æsk fɔːr hɛlp wɛn ju fil oʊˌvərwɛlmd/", difficulty: "hard", theme: "emotions" },
      { id: "en-e5", text: "Gratitude can completely change your mindset.", translation: "Lòng biết ơn có thể thay đổi hoàn toàn tư duy của bạn.", ipa: "/gɹætʌtuˌd kæn kʌmplitli ʧeɪnʤ jɔɹ maɪndsɛˌt/", difficulty: "hard", theme: "emotions" },
      { id: "en-e6", text: "I'm a little nervous about the presentation tomorrow.", translation: "Tôi hơi hồi hộp về buổi thuyết trình ngày mai.", ipa: "/aɪm ə lɪtʌl nərˈvʌs ʌbaʊt ðə pɹɛˌzʌnteɪʃʌn tʌmɑɹoʊˌ/", difficulty: "medium", theme: "emotions" },
      { id: "en-e7", text: "Spending time in nature lifts my mood instantly.", translation: "Dành thời gian trong thiên nhiên cải thiện tâm trạng tôi ngay.", ipa: "/spɛndɪŋ taɪm ɪn neɪʧər lɪfts maɪ mud ɪnstʌntli/", difficulty: "medium", theme: "emotions" },
    ],
  },
  {
    id: "en-jobinterview", name: "Job Interview", nameVi: "Phỏng vấn xin việc", icon: "💼",
    sentences: [
      { id: "en-j1", text: "Tell me a little about yourself.", translation: "Hãy giới thiệu sơ về bản thân bạn.", ipa: "/tɛl mi ə lɪtʌl ʌbaʊt jərsɛlf/", difficulty: "easy", theme: "job" },
      { id: "en-j2", text: "Why are you interested in this position?", translation: "Tại sao bạn quan tâm đến vị trí này?", ipa: "/waɪ ɑɹ ju ɪntɹʌstʌd ɪn ðɪs pʌzɪʃʌn/", difficulty: "easy", theme: "job" },
      { id: "en-j3", text: "I have five years of experience in marketing.", translation: "Tôi có năm năm kinh nghiệm trong lĩnh vực marketing.", ipa: "/aɪ hæv faɪv jɪɹz əv ɪkspɪɹiʌns ɪn mɑɹkʌtɪŋ/", difficulty: "medium", theme: "job" },
      { id: "en-j4", text: "My biggest strength is my ability to learn quickly.", translation: "Điểm mạnh nhất của tôi là khả năng học hỏi nhanh.", ipa: "/maɪ bɪgʌst stɹɛŋkθ ɪz maɪ ʌbɪlʌti tə lərˈn kwɪkli/", difficulty: "medium", theme: "job" },
      { id: "en-j5", text: "I'm looking for an opportunity to grow professionally.", translation: "Tôi tìm kiếm cơ hội phát triển chuyên môn.", ipa: "/aɪm lʊkɪŋ fɔːr æn ɑˌpərtunʌti tə gɹoʊ pɹʌfɛʃʌnʌli/", difficulty: "medium", theme: "job" },
      { id: "en-j6", text: "Could you tell me more about the team culture?", translation: "Bạn có thể nói thêm về văn hóa đội nhóm không?", ipa: "/kʊd ju tɛl mi mɔɹ ʌbaʊt ðə tim kʌlʧər/", difficulty: "hard", theme: "job" },
      { id: "en-j7", text: "I'd love to contribute my analytical skills to your project.", translation: "Tôi rất muốn đóng góp kỹ năng phân tích cho dự án của bạn.", ipa: "/aɪd lʌv tə kʌntɹɪbjut maɪ æˌnʌlɪtɪkʌl skɪlz tə jɔɹ pɹɑʤɛkt/", difficulty: "hard", theme: "job" },
      { id: "en-j8", text: "Thank you for considering my application.", translation: "Cảm ơn vì đã xem xét hồ sơ của tôi.", ipa: "/θæŋk ju fɔːr kʌnsɪdərɪŋ maɪ æˌplʌkeɪʃʌn/", difficulty: "easy", theme: "job" },
    ],
  },
  {
    id: "en-shopping", name: "Shopping & Bargaining", nameVi: "Mua sắm & Trả giá", icon: "🛍️",
    sentences: [
      { id: "en-sh1", text: "How much does this shirt cost?", translation: "Cái áo này giá bao nhiêu?", ipa: "/haʊ mʌʧ dʌz ðɪs ʃərˈt kɑst/", difficulty: "easy", theme: "shopping" },
      { id: "en-sh2", text: "Do you have this in a smaller size?", translation: "Bạn có cái này size nhỏ hơn không?", ipa: "/du ju hæv ðɪs ɪn ə smɔlər saɪz/", difficulty: "easy", theme: "shopping" },
      { id: "en-sh3", text: "Can you give me a discount if I buy two?", translation: "Bạn giảm giá nếu tôi mua hai cái được không?", ipa: "/kæn ju gɪv mi ə dɪskaʊnt ɪf aɪ baɪ tu/", difficulty: "medium", theme: "shopping" },
      { id: "en-sh4", text: "I'd like to return this item, please.", translation: "Tôi muốn trả lại món hàng này, xin vui lòng.", ipa: "/aɪd laɪk tə ɹɪtərˈn ðɪs aɪtʌm pliz/", difficulty: "medium", theme: "shopping" },
      { id: "en-sh5", text: "Online shopping has changed the way we buy clothes.", translation: "Mua sắm trực tuyến đã thay đổi cách chúng ta mua quần áo.", ipa: "/ɔnlaɪˌn ʃɑpɪŋ hæz ʧeɪnʤd ðə weɪ wi baɪ kloʊðz/", difficulty: "hard", theme: "shopping" },
      { id: "en-sh6", text: "I always check reviews before making a purchase.", translation: "Tôi luôn xem đánh giá trước khi mua hàng.", ipa: "/aɪ ɔlweɪˌz ʧɛk ɹivjuz bɪfɔɹ meɪkɪŋ ə pərˈʧʌs/", difficulty: "medium", theme: "shopping" },
      { id: "en-sh7", text: "Sustainable fashion is becoming more popular.", translation: "Thời trang bền vững đang ngày càng phổ biến.", ipa: "/sʌsteɪnʌbʌl fæʃʌn ɪz bɪkʌmɪŋ mɔɹ pɑpjʌlər/", difficulty: "hard", theme: "shopping" },
    ],
  },
  {
    id: "en-health", name: "Health & Doctor", nameVi: "Sức khỏe & Bác sĩ", icon: "🏥",
    sentences: [
      { id: "en-h1", text: "I have a headache and a slight fever.", translation: "Tôi bị nhức đầu và sốt nhẹ.", ipa: "/aɪ hæv ə hɛdeɪˌk ənd ə slaɪt fivər/", difficulty: "easy", theme: "health" },
      { id: "en-h2", text: "I'd like to make an appointment with Dr. Smith.", translation: "Tôi muốn đặt lịch hẹn với bác sĩ Smith.", ipa: "/aɪd laɪk tə meɪk æn ʌpɔjˈntmʌnt wɪð dɹaɪv smɪθ/", difficulty: "medium", theme: "health" },
      { id: "en-h3", text: "Take this medicine twice a day after meals.", translation: "Uống thuốc này hai lần một ngày sau bữa ăn.", ipa: "/teɪk ðɪs mɛdʌsʌn twaɪs ə deɪ æftər milz/", difficulty: "medium", theme: "health" },
      { id: "en-h4", text: "Exercising regularly is good for your heart.", translation: "Tập thể dục thường xuyên tốt cho tim của bạn.", ipa: "/ɛksərsaɪˌzɪŋ ɹɛgjʌlərli ɪz gʊd fɔːr jɔɹ hɑɹt/", difficulty: "medium", theme: "health" },
      { id: "en-h5", text: "Mental health is just as important as physical health.", translation: "Sức khỏe tinh thần cũng quan trọng như sức khỏe thể chất.", ipa: "/mɛntʌl hɛlθ ɪz ʤʌst æz ɪmpɔɹtʌnt æz fɪzɪkʌl hɛlθ/", difficulty: "hard", theme: "health" },
      { id: "en-h6", text: "I usually drink at least two liters of water a day.", translation: "Tôi thường uống ít nhất hai lít nước mỗi ngày.", ipa: "/aɪ juʒʌwʌli dɹɪŋk æt list tu litərz əv wɔtər ə deɪ/", difficulty: "medium", theme: "health" },
      { id: "en-h7", text: "Preventive care can save lives in the long run.", translation: "Chăm sóc phòng ngừa có thể cứu mạng về lâu dài.", ipa: "/pɹɪvɛntɪv kɛɹ kæn seɪv lɪvz ɪn ðə lɔŋ ɹʌn/", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "en-news", name: "News & Current Events", nameVi: "Tin tức & Thời sự", icon: "📰",
    sentences: [
      { id: "en-n1", text: "Did you hear about the news this morning?", translation: "Bạn có nghe tin sáng nay không?", ipa: "/dɪd ju hiɹ ʌbaʊt ðə nuz ðɪs mɔɹnɪŋ/", difficulty: "easy", theme: "news" },
      { id: "en-n2", text: "The election results were announced last night.", translation: "Kết quả bầu cử đã được công bố tối qua.", ipa: "/ðə ɪlɛkʃʌn ɹɪzʌlts wər ʌnaʊnst læst naɪt/", difficulty: "medium", theme: "news" },
      { id: "en-n3", text: "Social media spreads information very quickly.", translation: "Mạng xã hội lan truyền thông tin rất nhanh.", ipa: "/soʊʃʌl midiʌ spɹɛdz ɪˌnfərmeɪʃʌn vɛɹi kwɪkli/", difficulty: "medium", theme: "news" },
      { id: "en-n4", text: "We should always verify sources before sharing news.", translation: "Chúng ta nên luôn xác minh nguồn trước khi chia sẻ tin.", ipa: "/wi ʃʊd ɔlweɪˌz vɛɹʌfaɪˌ sɔɹsʌz bɪfɔɹ ʃɛɹɪŋ nuz/", difficulty: "hard", theme: "news" },
      { id: "en-n5", text: "Reading international news broadens your perspective.", translation: "Đọc tin tức quốc tế mở rộng tầm nhìn của bạn.", ipa: "/ɹɛdɪŋ ɪˌntərnæʃʌnʌl nuz bɹɔdʌnz jɔɹ pərspɛktɪv/", difficulty: "hard", theme: "news" },
      { id: "en-n6", text: "The headlines today are quite alarming.", translation: "Các tiêu đề hôm nay khá đáng báo động.", ipa: "/ðə hɛdlaɪˌnz tʌdeɪ ɑɹ kwaɪt ʌlɑɹmɪŋ/", difficulty: "medium", theme: "news" },
    ],
  },
];

// ============================ CHINESE ============================
export const chineseExtraThemes3: SpeakingTheme[] = [
  {
    id: "zh-money", name: "钱 (Money)", nameVi: "Tiền bạc", icon: "💰",
    sentences: [
      { id: "zh-m1", text: "这个多少钱？", translation: "Cái này bao nhiêu tiền?", difficulty: "easy", theme: "money" },
      { id: "zh-m2", text: "可以用信用卡吗？", translation: "Dùng thẻ tín dụng được không?", difficulty: "easy", theme: "money" },
      { id: "zh-m3", text: "今天的汇率不太好。", translation: "Tỷ giá hôm nay không tốt lắm.", difficulty: "medium", theme: "money" },
      { id: "zh-m4", text: "我每个月都存一点钱。", translation: "Tôi tiết kiệm một ít tiền mỗi tháng.", difficulty: "medium", theme: "money" },
      { id: "zh-m5", text: "投资股票有一定的风险。", translation: "Đầu tư cổ phiếu có rủi ro nhất định.", difficulty: "hard", theme: "money" },
      { id: "zh-m6", text: "请问可以便宜一点吗？", translation: "Xin hỏi có thể rẻ hơn chút được không?", difficulty: "medium", theme: "money" },
      { id: "zh-m7", text: "我需要换一些人民币。", translation: "Tôi cần đổi một ít nhân dân tệ.", difficulty: "medium", theme: "money" },
    ],
  },
  {
    id: "zh-emotions", name: "感觉 (Feelings)", nameVi: "Cảm xúc", icon: "😊",
    sentences: [
      { id: "zh-e1", text: "我今天很高兴。", translation: "Hôm nay tôi rất vui.", difficulty: "easy", theme: "emotions" },
      { id: "zh-e2", text: "我有点紧张。", translation: "Tôi hơi căng thẳng.", difficulty: "easy", theme: "emotions" },
      { id: "zh-e3", text: "听音乐能让我放松。", translation: "Nghe nhạc giúp tôi thư giãn.", difficulty: "medium", theme: "emotions" },
      { id: "zh-e4", text: "我对未来感到有些担心。", translation: "Tôi hơi lo lắng về tương lai.", difficulty: "medium", theme: "emotions" },
      { id: "zh-e5", text: "感恩的心态会改变你的生活。", translation: "Tâm thái biết ơn sẽ thay đổi cuộc sống của bạn.", difficulty: "hard", theme: "emotions" },
      { id: "zh-e6", text: "在大自然里散步让我心情很好。", translation: "Đi dạo trong thiên nhiên khiến tôi tâm trạng tốt.", difficulty: "medium", theme: "emotions" },
    ],
  },
  {
    id: "zh-jobinterview", name: "面试 (Job Interview)", nameVi: "Phỏng vấn xin việc", icon: "💼",
    sentences: [
      { id: "zh-j1", text: "请简单介绍一下你自己。", translation: "Xin giới thiệu sơ về bản thân.", difficulty: "easy", theme: "job" },
      { id: "zh-j2", text: "你为什么对这个职位感兴趣？", translation: "Tại sao bạn quan tâm đến vị trí này?", difficulty: "medium", theme: "job" },
      { id: "zh-j3", text: "我在销售方面有三年的经验。", translation: "Tôi có ba năm kinh nghiệm trong lĩnh vực bán hàng.", difficulty: "medium", theme: "job" },
      { id: "zh-j4", text: "我的优点是学习能力很强。", translation: "Ưu điểm của tôi là khả năng học hỏi mạnh.", difficulty: "medium", theme: "job" },
      { id: "zh-j5", text: "我希望在贵公司继续发展。", translation: "Tôi mong tiếp tục phát triển ở quý công ty.", difficulty: "hard", theme: "job" },
      { id: "zh-j6", text: "请问公司的工作氛围怎么样？", translation: "Xin hỏi văn hóa công ty thế nào?", difficulty: "hard", theme: "job" },
    ],
  },
  {
    id: "zh-shopping", name: "购物 (Shopping)", nameVi: "Mua sắm", icon: "🛍️",
    sentences: [
      { id: "zh-sh1", text: "请问试衣间在哪里？", translation: "Xin hỏi phòng thử đồ ở đâu?", difficulty: "easy", theme: "shopping" },
      { id: "zh-sh2", text: "有没有小一点的尺码？", translation: "Có size nhỏ hơn chút không?", difficulty: "easy", theme: "shopping" },
      { id: "zh-sh3", text: "我想退货，可以吗？", translation: "Tôi muốn trả hàng, được không?", difficulty: "medium", theme: "shopping" },
      { id: "zh-sh4", text: "网购越来越流行了。", translation: "Mua sắm online ngày càng phổ biến.", difficulty: "medium", theme: "shopping" },
      { id: "zh-sh5", text: "我先看看评价再决定买不买。", translation: "Tôi xem đánh giá rồi mới quyết định mua hay không.", difficulty: "hard", theme: "shopping" },
      { id: "zh-sh6", text: "这件衣服打几折？", translation: "Cái áo này giảm bao nhiêu %?", difficulty: "medium", theme: "shopping" },
    ],
  },
  {
    id: "zh-health", name: "健康 (Health)", nameVi: "Sức khỏe", icon: "🏥",
    sentences: [
      { id: "zh-h1", text: "我头疼，还有点发烧。", translation: "Tôi đau đầu và hơi sốt.", difficulty: "easy", theme: "health" },
      { id: "zh-h2", text: "我想预约一位医生。", translation: "Tôi muốn đặt lịch hẹn bác sĩ.", difficulty: "medium", theme: "health" },
      { id: "zh-h3", text: "这个药一天吃两次。", translation: "Thuốc này uống một ngày hai lần.", difficulty: "medium", theme: "health" },
      { id: "zh-h4", text: "经常运动对身体很好。", translation: "Tập thể dục thường xuyên rất tốt cho cơ thể.", difficulty: "medium", theme: "health" },
      { id: "zh-h5", text: "心理健康和身体健康同样重要。", translation: "Sức khỏe tinh thần và thể chất quan trọng như nhau.", difficulty: "hard", theme: "health" },
      { id: "zh-h6", text: "我每天至少喝两升水。", translation: "Mỗi ngày tôi uống ít nhất hai lít nước.", difficulty: "medium", theme: "health" },
    ],
  },
  {
    id: "zh-news", name: "新闻 (News)", nameVi: "Tin tức", icon: "📰",
    sentences: [
      { id: "zh-n1", text: "你听说今天的新闻了吗？", translation: "Bạn có nghe tin hôm nay chưa?", difficulty: "easy", theme: "news" },
      { id: "zh-n2", text: "网络让消息传得很快。", translation: "Internet làm tin tức lan rất nhanh.", difficulty: "medium", theme: "news" },
      { id: "zh-n3", text: "分享新闻之前要先核实来源。", translation: "Trước khi chia sẻ tin nên xác minh nguồn.", difficulty: "hard", theme: "news" },
      { id: "zh-n4", text: "国际新闻能开阔你的视野。", translation: "Tin tức quốc tế giúp mở rộng tầm nhìn.", difficulty: "hard", theme: "news" },
      { id: "zh-n5", text: "最近的新闻有点让人担心。", translation: "Tin tức gần đây hơi đáng lo.", difficulty: "medium", theme: "news" },
    ],
  },
];

// ============================ VIETNAMESE ============================
export const vietnameseExtraThemes3: SpeakingTheme[] = [
  {
    id: "vi-money", name: "Tiền bạc & Tài chính", nameVi: "Tiền bạc & Tài chính", icon: "💰",
    sentences: [
      { id: "vi-m1", text: "Cái này giá bao nhiêu tiền?", translation: "How much does this cost?", difficulty: "easy", theme: "money" },
      { id: "vi-m2", text: "Tôi muốn đổi một ít đô la sang tiền Việt.", translation: "I'd like to exchange some dollars to Vietnamese dong.", difficulty: "medium", theme: "money" },
      { id: "vi-m3", text: "Mỗi tháng tôi đều tiết kiệm một ít.", translation: "Every month I save a little.", difficulty: "medium", theme: "money" },
      { id: "vi-m4", text: "Đầu tư chứng khoán có thể rủi ro.", translation: "Investing in stocks can be risky.", difficulty: "hard", theme: "money" },
      { id: "vi-m5", text: "Giá cả ở đây tăng nhanh quá.", translation: "Prices here are rising too fast.", difficulty: "medium", theme: "money" },
      { id: "vi-m6", text: "Hiểu biết về tài chính là rất cần thiết.", translation: "Financial literacy is essential.", difficulty: "hard", theme: "money" },
    ],
  },
  {
    id: "vi-emotions", name: "Cảm xúc", nameVi: "Cảm xúc", icon: "😊",
    sentences: [
      { id: "vi-e1", text: "Hôm nay tôi cảm thấy rất vui.", translation: "Today I feel very happy.", difficulty: "easy", theme: "emotions" },
      { id: "vi-e2", text: "Đôi khi tôi cảm thấy lo lắng về tương lai.", translation: "Sometimes I feel anxious about the future.", difficulty: "medium", theme: "emotions" },
      { id: "vi-e3", text: "Nghe nhạc giúp tôi thư giãn.", translation: "Listening to music helps me relax.", difficulty: "easy", theme: "emotions" },
      { id: "vi-e4", text: "Lòng biết ơn có thể thay đổi cách nhìn cuộc sống.", translation: "Gratitude can change how you see life.", difficulty: "hard", theme: "emotions" },
      { id: "vi-e5", text: "Tôi hơi hồi hộp trước buổi thuyết trình.", translation: "I'm a bit nervous before the presentation.", difficulty: "medium", theme: "emotions" },
      { id: "vi-e6", text: "Dành thời gian với gia đình giúp tôi vui hơn.", translation: "Spending time with family makes me happier.", difficulty: "medium", theme: "emotions" },
    ],
  },
  {
    id: "vi-jobinterview", name: "Phỏng vấn xin việc", nameVi: "Phỏng vấn xin việc", icon: "💼",
    sentences: [
      { id: "vi-j1", text: "Xin giới thiệu sơ về bản thân anh/chị.", translation: "Please introduce yourself.", difficulty: "easy", theme: "job" },
      { id: "vi-j2", text: "Tại sao bạn quan tâm đến vị trí này?", translation: "Why are you interested in this position?", difficulty: "medium", theme: "job" },
      { id: "vi-j3", text: "Tôi có năm năm kinh nghiệm trong lĩnh vực marketing.", translation: "I have five years of experience in marketing.", difficulty: "medium", theme: "job" },
      { id: "vi-j4", text: "Điểm mạnh của tôi là khả năng học hỏi nhanh.", translation: "My strength is my ability to learn quickly.", difficulty: "medium", theme: "job" },
      { id: "vi-j5", text: "Tôi mong có cơ hội phát triển ở công ty.", translation: "I hope to have the chance to grow at this company.", difficulty: "hard", theme: "job" },
      { id: "vi-j6", text: "Cảm ơn anh chị đã xem xét hồ sơ của tôi.", translation: "Thank you for considering my application.", difficulty: "easy", theme: "job" },
    ],
  },
  {
    id: "vi-shopping", name: "Mua sắm & Trả giá", nameVi: "Mua sắm & Trả giá", icon: "🛍️",
    sentences: [
      { id: "vi-sh1", text: "Cái áo này có size nhỏ hơn không?", translation: "Do you have this shirt in a smaller size?", difficulty: "easy", theme: "shopping" },
      { id: "vi-sh2", text: "Chị bớt cho em một chút được không?", translation: "Can you lower the price a bit?", difficulty: "medium", theme: "shopping" },
      { id: "vi-sh3", text: "Tôi muốn đổi hoặc trả lại sản phẩm này.", translation: "I'd like to exchange or return this product.", difficulty: "medium", theme: "shopping" },
      { id: "vi-sh4", text: "Tôi hay xem đánh giá trước khi mua hàng online.", translation: "I usually read reviews before buying online.", difficulty: "hard", theme: "shopping" },
      { id: "vi-sh5", text: "Đợt giảm giá cuối tuần này rất hấp dẫn.", translation: "This weekend's sale is really attractive.", difficulty: "medium", theme: "shopping" },
    ],
  },
  {
    id: "vi-health", name: "Sức khỏe & Bệnh viện", nameVi: "Sức khỏe & Bệnh viện", icon: "🏥",
    sentences: [
      { id: "vi-h1", text: "Tôi bị đau đầu và sốt nhẹ.", translation: "I have a headache and a slight fever.", difficulty: "easy", theme: "health" },
      { id: "vi-h2", text: "Tôi muốn đặt lịch khám bác sĩ.", translation: "I'd like to make a doctor's appointment.", difficulty: "medium", theme: "health" },
      { id: "vi-h3", text: "Thuốc này uống ngày hai lần sau khi ăn.", translation: "Take this medicine twice a day after meals.", difficulty: "medium", theme: "health" },
      { id: "vi-h4", text: "Tập thể dục thường xuyên rất tốt cho sức khỏe.", translation: "Exercising regularly is very good for health.", difficulty: "medium", theme: "health" },
      { id: "vi-h5", text: "Sức khỏe tinh thần cũng quan trọng như thể chất.", translation: "Mental health is as important as physical health.", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "vi-news", name: "Tin tức & Thời sự", nameVi: "Tin tức & Thời sự", icon: "📰",
    sentences: [
      { id: "vi-n1", text: "Bạn có nghe tin tức sáng nay chưa?", translation: "Did you hear the news this morning?", difficulty: "easy", theme: "news" },
      { id: "vi-n2", text: "Mạng xã hội khiến tin tức lan rất nhanh.", translation: "Social media spreads news very fast.", difficulty: "medium", theme: "news" },
      { id: "vi-n3", text: "Trước khi chia sẻ, nên kiểm tra nguồn tin.", translation: "Before sharing, verify the source.", difficulty: "hard", theme: "news" },
      { id: "vi-n4", text: "Tin tức quốc tế giúp mở rộng tầm nhìn.", translation: "International news broadens your view.", difficulty: "hard", theme: "news" },
    ],
  },
];

// ============================ FINNISH ============================
export const finnishExtraThemes3: SpeakingTheme[] = [
  {
    id: "fi-money", name: "Raha (Money)", nameVi: "Tiền bạc", icon: "💰", level: "B1",
    sentences: [
      { id: "fi-m1", text: "Paljonko tämä maksaa?", translation: "Cái này giá bao nhiêu?", difficulty: "easy", theme: "money" },
      { id: "fi-m2", text: "Voinko maksaa kortilla?", translation: "Tôi trả bằng thẻ được không?", difficulty: "easy", theme: "money" },
      { id: "fi-m3", text: "Säästän vähän rahaa joka kuukausi.", translation: "Tôi tiết kiệm một ít tiền mỗi tháng.", difficulty: "medium", theme: "money" },
      { id: "fi-m4", text: "Hinnat ovat nousseet viime vuosina.", translation: "Giá đã tăng trong những năm qua.", difficulty: "medium", theme: "money" },
      { id: "fi-m5", text: "Sijoittaminen osakkeisiin on riskialtista.", translation: "Đầu tư cổ phiếu là rủi ro.", difficulty: "hard", theme: "money" },
      { id: "fi-m6", text: "Talousosaaminen on tärkeää nuorille.", translation: "Kiến thức tài chính quan trọng cho người trẻ.", difficulty: "hard", theme: "money" },
    ],
  },
  {
    id: "fi-emotions", name: "Tunteet (Feelings)", nameVi: "Cảm xúc", icon: "😊", level: "B1",
    sentences: [
      { id: "fi-e1", text: "Olen tänään todella iloinen.", translation: "Hôm nay tôi rất vui.", difficulty: "easy", theme: "emotions" },
      { id: "fi-e2", text: "Olen vähän hermostunut.", translation: "Tôi hơi căng thẳng.", difficulty: "easy", theme: "emotions" },
      { id: "fi-e3", text: "Musiikki rentouttaa minua.", translation: "Âm nhạc làm tôi thư giãn.", difficulty: "medium", theme: "emotions" },
      { id: "fi-e4", text: "Joskus tunnen huolta tulevaisuudesta.", translation: "Đôi khi tôi lo về tương lai.", difficulty: "medium", theme: "emotions" },
      { id: "fi-e5", text: "Kiitollisuus muuttaa elämänasennetta.", translation: "Lòng biết ơn thay đổi thái độ sống.", difficulty: "hard", theme: "emotions" },
      { id: "fi-e6", text: "Luonnossa kävely parantaa mielialaa.", translation: "Đi dạo trong thiên nhiên cải thiện tâm trạng.", difficulty: "hard", theme: "emotions" },
    ],
  },
  {
    id: "fi-jobinterview", name: "Työhaastattelu (Job Interview)", nameVi: "Phỏng vấn xin việc", icon: "💼", level: "B1",
    sentences: [
      { id: "fi-j1", text: "Kerro lyhyesti itsestäsi.", translation: "Hãy kể ngắn gọn về bản thân.", difficulty: "easy", theme: "job" },
      { id: "fi-j2", text: "Miksi olet kiinnostunut tästä työstä?", translation: "Tại sao bạn quan tâm đến công việc này?", difficulty: "medium", theme: "job" },
      { id: "fi-j3", text: "Minulla on viisi vuotta kokemusta markkinoinnista.", translation: "Tôi có năm năm kinh nghiệm marketing.", difficulty: "medium", theme: "job" },
      { id: "fi-j4", text: "Vahvuuteni on nopea oppiminen.", translation: "Điểm mạnh của tôi là học hỏi nhanh.", difficulty: "medium", theme: "job" },
      { id: "fi-j5", text: "Toivon mahdollisuutta kehittyä yrityksessänne.", translation: "Tôi mong có cơ hội phát triển ở công ty.", difficulty: "hard", theme: "job" },
      { id: "fi-j6", text: "Kiitos kun harkitsette hakemustani.", translation: "Cảm ơn đã xem xét hồ sơ của tôi.", difficulty: "easy", theme: "job" },
    ],
  },
  {
    id: "fi-shopping-adv", name: "Ostokset (Shopping)", nameVi: "Mua sắm nâng cao", icon: "🛍️", level: "B1",
    sentences: [
      { id: "fi-shadv1", text: "Onko teillä tätä pienemmässä koossa?", translation: "Bạn có cái này size nhỏ hơn không?", difficulty: "easy", theme: "shopping" },
      { id: "fi-shadv2", text: "Voinko palauttaa tämän tuotteen?", translation: "Tôi trả lại sản phẩm này được không?", difficulty: "medium", theme: "shopping" },
      { id: "fi-shadv3", text: "Verkkokauppa on yhä suositumpaa.", translation: "Mua sắm online ngày càng phổ biến.", difficulty: "medium", theme: "shopping" },
      { id: "fi-shadv4", text: "Luen arvostelut ennen ostamista.", translation: "Tôi đọc đánh giá trước khi mua.", difficulty: "hard", theme: "shopping" },
      { id: "fi-shadv5", text: "Tämä tuote on alennuksessa tällä viikolla.", translation: "Sản phẩm này đang giảm giá tuần này.", difficulty: "medium", theme: "shopping" },
    ],
  },
  {
    id: "fi-health-adv", name: "Terveys (Health)", nameVi: "Sức khỏe", icon: "🏥", level: "B1",
    sentences: [
      { id: "fi-hadv1", text: "Minulla on päänsärky ja kuumetta.", translation: "Tôi đau đầu và sốt.", difficulty: "easy", theme: "health" },
      { id: "fi-hadv2", text: "Haluaisin varata ajan lääkärille.", translation: "Tôi muốn đặt lịch khám bác sĩ.", difficulty: "medium", theme: "health" },
      { id: "fi-hadv3", text: "Ottakaa tätä lääkettä kahdesti päivässä.", translation: "Uống thuốc này hai lần một ngày.", difficulty: "medium", theme: "health" },
      { id: "fi-hadv4", text: "Säännöllinen liikunta on hyväksi terveydelle.", translation: "Tập thể dục thường xuyên tốt cho sức khỏe.", difficulty: "medium", theme: "health" },
      { id: "fi-hadv5", text: "Mielenterveys on yhtä tärkeä kuin fyysinen terveys.", translation: "Sức khỏe tinh thần quan trọng như thể chất.", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "fi-news", name: "Uutiset (News)", nameVi: "Tin tức", icon: "📰", level: "B1",
    sentences: [
      { id: "fi-n1", text: "Kuulitko tämän aamun uutiset?", translation: "Bạn nghe tin sáng nay chưa?", difficulty: "easy", theme: "news" },
      { id: "fi-n2", text: "Sosiaalinen media levittää uutisia nopeasti.", translation: "Mạng xã hội lan tin rất nhanh.", difficulty: "medium", theme: "news" },
      { id: "fi-n3", text: "Tarkista aina lähteet ennen jakamista.", translation: "Luôn xác minh nguồn trước khi chia sẻ.", difficulty: "hard", theme: "news" },
      { id: "fi-n4", text: "Kansainväliset uutiset avartavat näkemystä.", translation: "Tin quốc tế mở rộng tầm nhìn.", difficulty: "hard", theme: "news" },
    ],
  },
];
