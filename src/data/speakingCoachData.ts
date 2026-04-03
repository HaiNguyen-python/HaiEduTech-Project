// Speaking Coach practice sentences organized by language and theme
export interface SpeakingSentence {
  id: string;
  text: string;
  translation: string;
  ipa?: string;
  difficulty: "easy" | "medium" | "hard";
  theme: string;
}

export interface SpeakingTheme {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  sentences: SpeakingSentence[];
}

export interface SpeakingLanguageConfig {
  lang: string;
  langCode: string;
  speechLang: string;
  themes: SpeakingTheme[];
}

// ---- ENGLISH ----
const englishThemes: SpeakingTheme[] = [
  {
    id: "en-greetings", name: "Greetings & Introduction", nameVi: "Chào hỏi & Giới thiệu", icon: "👋",
    sentences: [
      { id: "en-g1", text: "Hello, my name is Anna and I am a student.", translation: "Xin chào, tên tôi là Anna và tôi là sinh viên.", ipa: "/həˈloʊ maɪ neɪm ɪz ˈænə ænd aɪ æm ə ˈstuːdənt/", difficulty: "easy", theme: "greetings" },
      { id: "en-g2", text: "Nice to meet you. Where are you from?", translation: "Rất vui được gặp bạn. Bạn đến từ đâu?", ipa: "/naɪs tə miːt juː wɛr ɑːr juː frɒm/", difficulty: "easy", theme: "greetings" },
      { id: "en-g3", text: "I have been living in this city for three years.", translation: "Tôi đã sống ở thành phố này được ba năm.", ipa: "/aɪ hæv bɪn ˈlɪvɪŋ ɪn ðɪs ˈsɪti fɔːr θriː jɪərz/", difficulty: "medium", theme: "greetings" },
      { id: "en-g4", text: "Could you please introduce yourself briefly?", translation: "Bạn có thể giới thiệu ngắn gọn về bản thân không?", ipa: "/kʊd juː pliːz ˌɪntrəˈdjuːs jɔːrˈsɛlf ˈbriːfli/", difficulty: "medium", theme: "greetings" },
      { id: "en-g5", text: "It is a pleasure to make your acquaintance.", translation: "Thật vinh hạnh được làm quen với bạn.", ipa: "/ɪt ɪz ə ˈplɛʒər tə meɪk jɔːr əˈkweɪntəns/", difficulty: "hard", theme: "greetings" },
      { id: "en-g6", text: "It's a pleasure to meet you.", translation: "Rất hân hạnh được gặp bạn.", ipa: "ɪts ə ˈplɛʒər tə miːt juː.", difficulty: "easy", theme: "greetings" },
      { id: "en-g7", text: "How have you been doing lately?", translation: "Dạo này bạn thế nào?", ipa: "haʊ həv juː bɪn ˈduːɪŋ ˈleɪtli?", difficulty: "medium", theme: "greetings" },
      { id: "en-g8", text: "I haven't seen you in ages!", translation: "Lâu lắm rồi không gặp bạn!", ipa: "aɪ ˈhævənt siːn juː ɪn ˈeɪʤɪz!", difficulty: "medium", theme: "greetings" },
      { id: "en-g9", text: "My name is John, and I'm from Canada. What about you?", translation: "Tên tôi là John, tôi đến từ Canada. Còn bạn?", ipa: "maɪ neɪm ɪz ʤɒn, ənd aɪm frɒm ˈkænədə. wɒt əˈbaʊt juː?", difficulty: "hard", theme: "greetings" },
      { id: "en-g10", text: "Good to see you again.", translation: "Rất vui được gặp lại bạn.", ipa: "ɡʊd tə siː juː əˈɡɛn.", difficulty: "easy", theme: "greetings" },
    ],
  },
  {
    id: "en-daily", name: "Daily Life", nameVi: "Cuộc sống hàng ngày", icon: "🏠",
    sentences: [
      { id: "en-d1", text: "I usually wake up at seven in the morning.", translation: "Tôi thường thức dậy lúc bảy giờ sáng.", difficulty: "easy", theme: "daily" },
      { id: "en-d2", text: "What do you like to do in your free time?", translation: "Bạn thích làm gì trong thời gian rảnh?", difficulty: "easy", theme: "daily" },
      { id: "en-d3", text: "I prefer reading books rather than watching television.", translation: "Tôi thích đọc sách hơn là xem tivi.", difficulty: "medium", theme: "daily" },
      { id: "en-d4", text: "She has been working on this project since last Monday.", translation: "Cô ấy đã làm việc trong dự án này từ thứ Hai tuần trước.", difficulty: "medium", theme: "daily" },
      { id: "en-d5", text: "The weather forecast says it will rain throughout the weekend.", translation: "Dự báo thời tiết nói trời sẽ mưa suốt cuối tuần.", difficulty: "hard", theme: "daily" },
      { id: "en-d6", text: "What are your plans for the weekend?", translation: "Kế hoạch cuối tuần của bạn là gì?", ipa: "wɒt ɑːr jɔː plænz fɔː ðə ˈwiːkend?", difficulty: "easy", theme: "daily" },
      { id: "en-d7", text: "I usually wake up around 7 AM.", translation: "Tôi thường thức dậy vào khoảng 7 giờ sáng.", ipa: "aɪ ˈjuːʒuəli weɪk ʌp əˈraʊnd ˈsɛvən eɪ-ɛm.", difficulty: "easy", theme: "daily" },
      { id: "en-d8", text: "Do you prefer cooking at home or eating out?", translation: "Bạn thích nấu ăn ở nhà hay ăn ngoài hơn?", ipa: "duː juː priˈfɜːr ˈkʊkɪŋ æt həʊm ɔːr ˈiːtɪŋ aʊt?", difficulty: "medium", theme: "daily" },
      { id: "en-d9", text: "It's important to balance work and leisure for a healthy lifestyle.", translation: "Điều quan trọng là phải cân bằng công việc và giải trí để có một lối sống lành mạnh.", ipa: "ɪts ɪmˈpɔːrtənt tə ˈbæləns wɜːrk ənd ˈliːʒər fɔːr ə ˈhɛlθi ˈlaɪfˌstaɪl.", difficulty: "hard", theme: "daily" },
      { id: "en-d10", text: "I need to do some grocery shopping later.", translation: "Lát nữa tôi cần đi mua đồ tạp hóa.", ipa: "aɪ niːd tə duː sʌm ˈɡroʊsəri ˈʃɒpɪŋ ˈleɪtər.", difficulty: "medium", theme: "daily" },
    ],
  },
  {
    id: "en-travel", name: "Travel & Transport", nameVi: "Du lịch & Giao thông", icon: "✈️",
    sentences: [
      { id: "en-t1", text: "Excuse me, where is the train station?", translation: "Xin lỗi, ga tàu ở đâu?", difficulty: "easy", theme: "travel" },
      { id: "en-t2", text: "I would like to book a round trip ticket to London.", translation: "Tôi muốn đặt vé khứ hồi đến London.", difficulty: "medium", theme: "travel" },
      { id: "en-t3", text: "Could you recommend a good restaurant near the hotel?", translation: "Bạn có thể gợi ý nhà hàng ngon gần khách sạn không?", difficulty: "medium", theme: "travel" },
      { id: "en-t4", text: "The flight has been delayed due to severe weather conditions.", translation: "Chuyến bay đã bị hoãn do điều kiện thời tiết khắc nghiệt.", difficulty: "hard", theme: "travel" },
      { id: "en-t5", text: "I need to check in my luggage before going through security.", translation: "Tôi cần gửi hành lý trước khi qua cổng an ninh.", difficulty: "medium", theme: "travel" },
      { id: "en-t6", text: "How do I get to the city center from here?", translation: "Làm thế nào để tôi đến trung tâm thành phố từ đây?", ipa: "haʊ duː aɪ ɡɛt tə ðə ˈsɪti ˈsɛntər frɒm hɪər?", difficulty: "easy", theme: "travel" },
      { id: "en-t7", text: "Is there a direct bus to the airport?", translation: "Có xe buýt trực tiếp đến sân bay không?", ipa: "ɪz ðɛər ə dɪˈrɛkt bʌs tə ðə ˈɛərˌpɔːrt?", difficulty: "easy", theme: "travel" },
      { id: "en-t8", text: "Could you recommend a good local restaurant?", translation: "Bạn có thể giới thiệu một nhà hàng địa phương ngon không?", ipa: "kʊd juː ˌrɛkəˈmɛnd ə ɡʊd ˈloʊkəl ˈrɛstərɒnt?", difficulty: "medium", theme: "travel" },
      { id: "en-t9", text: "We booked a round-trip ticket for our vacation to Japan.", translation: "Chúng tôi đã đặt vé khứ hồi cho kỳ nghỉ của mình ở Nhật Bản.", ipa: "wi bʊkt ə raʊnd-trɪp ˈtɪkɪt fɔːr aʊər vəˈkeɪʃən tə ʤəˈpæn.", difficulty: "medium", theme: "travel" },
      { id: "en-t10", text: "Exploring new cultures and historical sites is the best part of traveling.", translation: "Khám phá các nền văn hóa mới và các di tích lịch sử là phần thú vị nhất của việc đi du lịch.", ipa: "ɪkˈsplɔːrɪŋ nuː ˈkʌlʧərz ənd hɪˈstɒrɪkəl saɪts ɪz ðə bɛst pɑːrt əv ˈtrævlɪŋ.", difficulty: "hard", theme: "travel" },
    ],
  },
  {
    id: "en-work", name: "Work & Business", nameVi: "Công việc & Kinh doanh", icon: "💼",
    sentences: [
      { id: "en-w1", text: "I work as a software engineer at a technology company.", translation: "Tôi làm kỹ sư phần mềm tại một công ty công nghệ.", difficulty: "easy", theme: "work" },
      { id: "en-w2", text: "We need to schedule a meeting for next Wednesday.", translation: "Chúng ta cần lên lịch cuộc họp vào thứ Tư tuần tới.", difficulty: "medium", theme: "work" },
      { id: "en-w3", text: "The deadline for this project has been extended by two weeks.", translation: "Hạn chót cho dự án này đã được gia hạn thêm hai tuần.", difficulty: "medium", theme: "work" },
      { id: "en-w4", text: "I am confident that our team can deliver excellent results.", translation: "Tôi tự tin rằng đội của chúng tôi có thể mang lại kết quả xuất sắc.", difficulty: "hard", theme: "work" },
      { id: "en-w5", text: "Could we discuss the quarterly financial report in detail?", translation: "Chúng ta có thể thảo luận chi tiết báo cáo tài chính quý không?", difficulty: "hard", theme: "work" },
      { id: "en-w6", text: "What is your typical workday like?", translation: "Một ngày làm việc điển hình của bạn như thế nào?", ipa: "wɒt ɪz jɔː ˈtɪpɪkəl ˈwɜːrkdeɪ laɪk?", difficulty: "easy", theme: "work" },
      { id: "en-w7", text: "I have a meeting at 10 AM.", translation: "Tôi có một cuộc họp lúc 10 giờ sáng.", ipa: "aɪ hæv ə ˈmiːtɪŋ æt tɛn eɪ-ɛm.", difficulty: "easy", theme: "work" },
      { id: "en-w8", text: "Could you please send me the report by Friday?", translation: "Bạn vui lòng gửi báo cáo cho tôi trước thứ Sáu được không?", ipa: "kʊd juː pliːz sɛnd miː ðə rɪˈpɔːrt baɪ ˈfraɪdeɪ?", difficulty: "medium", theme: "work" },
      { id: "en-w9", text: "Our company is looking to expand into new markets next year.", translation: "Công ty chúng tôi đang tìm cách mở rộng sang các thị trường mới vào năm tới.", ipa: "aʊər ˈkʌmpəni ɪz ˈlʊkɪŋ tə ɪkˈspænd ˈɪntuː nuː ˈmɑːrkɪts nɛkst jɪər.", difficulty: "medium", theme: "work" },
      { id: "en-w10", text: "Effective collaboration and communication are crucial for team success.", translation: "Sự hợp tác và giao tiếp hiệu quả là rất quan trọng để đội nhóm thành công.", ipa: "ɪˈfɛktɪv kəˌlæbəˈreɪʃən ənd kəˌmjuːnɪˈkeɪʃən ɑːr ˈkruːʃəl fɔːr tiːm səkˈsɛs.", difficulty: "hard", theme: "work" },
    ],
  },
  {
    id: "en-education", name: "Education", nameVi: "Giáo dục", icon: "📚",
    sentences: [
      { id: "en-e1", text: "I am studying English to improve my communication skills.", translation: "Tôi đang học tiếng Anh để cải thiện kỹ năng giao tiếp.", difficulty: "easy", theme: "education" },
      { id: "en-e2", text: "The university offers a wide range of courses for international students.", translation: "Trường đại học cung cấp nhiều khóa học cho sinh viên quốc tế.", difficulty: "medium", theme: "education" },
      { id: "en-e3", text: "Critical thinking is one of the most important skills in education.", translation: "Tư duy phản biện là một trong những kỹ năng quan trọng nhất trong giáo dục.", difficulty: "hard", theme: "education" },
      { id: "en-e4", text: "She graduated with honors from a prestigious university.", translation: "Cô ấy tốt nghiệp loại giỏi từ một trường đại học danh tiếng.", difficulty: "medium", theme: "education" },
      { id: "en-e5", text: "Technology has transformed the way we learn and teach.", translation: "Công nghệ đã thay đổi cách chúng ta học và dạy.", difficulty: "medium", theme: "education" },
      { id: "en-e6", text: "What subject are you studying?", translation: "Bạn đang học môn gì?", ipa: "wɒt ˈsʌbʤɪkt ɑːr juː ˈstʌdiɪŋ?", difficulty: "easy", theme: "education" },
      { id: "en-e7", text: "I need to prepare for my exams next week.", translation: "Tôi cần chuẩn bị cho các kỳ thi vào tuần tới.", ipa: "aɪ niːd tə priˈpɛər fɔːr maɪ ɪɡˈzæmz nɛkst wiːk.", difficulty: "easy", theme: "education" },
      { id: "en-e8", text: "The professor assigned a lot of reading for this course.", translation: "Giáo sư đã giao rất nhiều bài đọc cho khóa học này.", ipa: "ðə prəˈfɛsər əˈsaɪnd ə lɒt əv ˈriːdɪŋ fɔːr ðɪs kɔːrs.", difficulty: "medium", theme: "education" },
      { id: "en-e9", text: "I'm considering pursuing a master's degree in linguistics.", translation: "Tôi đang cân nhắc theo học bằng thạc sĩ về ngôn ngữ học.", ipa: "aɪm kənˈsɪdərɪŋ pərˈsuːɪŋ ə ˈmæstərz dɪˈɡriː ɪn lɪŋˈɡwɪstɪks.", difficulty: "medium", theme: "education" },
      { id: "en-e10", text: "Lifelong learning is essential for personal and professional development in today's world.", translation: "Học tập suốt đời là điều cần thiết cho sự phát triển cá nhân và nghề nghiệp trong thế giới ngày nay.", ipa: "ˈlaɪfˌlɒŋ ˈlɜːrnɪŋ ɪz ɪˈsɛnʃəl fɔːr ˈpɜːrsənəl ənd prəˈfɛʃənəl dɪˈvɛləpmənt ɪn təˈdeɪz wɜːrld.", difficulty: "hard", theme: "education" },
    ],
  },
  {
    id: "en-health", name: "Health & Fitness", nameVi: "Sức khỏe & Thể dục", icon: "🏥",
    sentences: [
      { id: "en-h1", text: "I feel good today.", translation: "Hôm nay tôi cảm thấy khỏe.", ipa: "/aɪ fiːl ɡʊd təˈdeɪ/", difficulty: "easy", theme: "health" },
      { id: "en-h2", text: "Drink water regularly.", translation: "Hãy uống nước thường xuyên.", ipa: "/drɪŋk ˈwɔːtər ˈrɛɡjələrli/", difficulty: "easy", theme: "health" },
      { id: "en-h3", text: "Eat healthy food.", translation: "Hãy ăn thức ăn lành mạnh.", ipa: "/iːt ˈhɛlθi fuːd/", difficulty: "easy", theme: "health" },
      { id: "en-h4", text: "Sleep eight hours a night.", translation: "Hãy ngủ tám tiếng mỗi đêm.", ipa: "/sliːp eɪt ˈaʊərz ə naɪt/", difficulty: "easy", theme: "health" },
      { id: "en-h5", text: "Regular exercise is crucial for maintaining good physical and mental health.", translation: "Tập thể dục thường xuyên rất quan trọng để duy trì sức khỏe thể chất và tinh thần tốt.", ipa: "/ˈrɛɡjələr ˈɛksərsaɪz ɪz ˈkruːʃəl fɔr meɪnˈteɪnɪŋ ɡʊd ˈfɪzɪkəl ænd ˈmɛntl hɛlθ/", difficulty: "medium", theme: "health" },
      { id: "en-h6", text: "Eating a balanced diet, which includes plenty of fruits and vegetables, helps prevent many diseases.", translation: "Ăn một chế độ ăn uống cân bằng, bao gồm nhiều trái cây và rau củ, giúp ngăn ngừa nhiều bệnh tật.", ipa: "/ˈiːtɪŋ ə ˈbælənst ˈdaɪət, wɪtʃ ɪnˈkluːdz ˈplɛnti əv fruːts ænd ˈvɛdʒtəbəlz, hɛlps prɪˈvɛnt ˈmɛni dɪˈziːzɪz/", difficulty: "medium", theme: "health" },
      { id: "en-h7", text: "It\'s important to consult a doctor if you experience persistent symptoms or unusual pain.", translation: "Điều quan trọng là phải hỏi ý kiến bác sĩ nếu bạn gặp các triệu chứng dai dẳng hoặc đau bất thường.", ipa: "/ɪts ɪmˈpɔːrtənt tə kənˈsʌlt ə ˈdɒktər ɪf juː ɪkˈspɪəriəns pərˈsɪstənt ˈsɪmptəmz ɔːr ʌnˈjuːʒuəl peɪn/", difficulty: "medium", theme: "health" },
      { id: "en-h8", text: "Proper hydration and sufficient sleep are fundamental to boosting your immune system and overall well-being.", translation: "Việc giữ nước đúng cách và ngủ đủ giấc là nền tảng để tăng cường hệ miễn dịch và sức khỏe tổng thể của bạn.", ipa: "/ˈprɒpər haɪˈdreɪʃən ænd səˈfɪʃənt sliːp ər ˌfʌndəˈmɛntl tə ˈbuːstɪŋ jʊər ɪˈmjuːn ˈsɪstəm ænd ˈoʊvərˌɔːl wɛl-ˈbiːɪŋ/", difficulty: "medium", theme: "health" },
      { id: "en-h9", text: "Adopting a holistic approach to health, encompassing nutrition, physical activity, mental wellness, and stress management, is vital for long-term vitality.", translation: "Áp dụng một phương pháp tiếp cận toàn diện đối với sức khỏe, bao gồm dinh dưỡng, hoạt động thể chất, sức khỏe tâm thần và quản lý căng thẳng, là rất quan trọng cho sức sống lâu dài.", ipa: "/əˈdɒptɪŋ ə hoʊˈlɪstɪk əˈproʊtʃ tə hɛlθ, ɪnˈkʌmpəsɪŋ nuːˈtrɪʃən, ˈfɪzɪkəl ækˈtɪvəti, ˈmɛntl ˈwɛlnəs, ænd strɛs ˈmænɪdʒmənt, ɪz ˈvaɪtl fɔːr lɔːŋ-tɜːm vaɪˈtælɪti/", difficulty: "hard", theme: "health" },
      { id: "en-h10", text: "Many people find that integrating mindfulness practices and gratitude into their daily routines significantly enhances their psychological resilience and overall life satisfaction.", translation: "Nhiều người thấy rằng việc tích hợp các thực hành chánh niệm và lòng biết ơn vào thói quen hàng ngày của họ làm tăng đáng kể khả năng phục hồi tâm lý và sự hài lòng với cuộc sống nói chung.", ipa: "/ˈmɛni ˈpiːpl faɪnd ðæt ˈɪntɪɡreɪtɪŋ ˈmaɪndflnəs ˈpræktɪsɪz ænd ˈɡrætɪtuːd ˌɪntʊ ðɛr ˈdeɪli ruːˈtiːnz sɪɡˈnɪfɪkəntli ɪnˈhænsɪz ðɛr saɪkəˈlɒdʒɪkəl rɪˈzɪliəns ænd ˈoʊvərˌɔːl laɪf ˌsætɪsˈfækʃən/", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "en-tech", name: "Technology & Internet", nameVi: "Công nghệ & Internet", icon: "💻",
    sentences: [
      { id: "en-tech1", text: "I use my phone daily.", translation: "Tôi dùng điện thoại hàng ngày.", ipa: "/aɪ juːz maɪ foʊn ˈdeɪli/", difficulty: "easy", theme: "tech" },
      { id: "en-tech2", text: "The internet is fast.", translation: "Mạng internet nhanh.", ipa: "/ði ˈɪntərˌnɛt ɪz fæst/", difficulty: "easy", theme: "tech" },
      { id: "en-tech3", text: "This app is useful.", translation: "Ứng dụng này hữu ích.", ipa: "/ðɪs æp ɪz ˈjuːsfʊl/", difficulty: "easy", theme: "tech" },
      { id: "en-tech4", text: "My computer is new.", translation: "Máy tính của tôi mới.", ipa: "/maɪ kəmˈpjuːtər ɪz nuː/", difficulty: "easy", theme: "tech" },
      { id: "en-tech5", text: "Many people rely on smartphones for communication, work, and entertainment purposes.", translation: "Nhiều người phụ thuộc vào điện thoại thông minh cho mục đích giao tiếp, công việc và giải trí.", ipa: "/ˈmɛni ˈpiːpl rɪˈlaɪ ɒn ˈsmɑːrtfoʊnz fɔːr kəmˌjuːnɪˈkeɪʃən, wɜːrk, ænd ˌɛntərˈteɪnmənt ˈpɜːrpəsɪz/", difficulty: "medium", theme: "tech" },
      { id: "en-tech6", text: "The development of artificial intelligence is rapidly transforming various industries and aspects of daily life.", translation: "Sự phát triển của trí tuệ nhân tạo đang nhanh chóng biến đổi nhiều ngành công nghiệp và các khía cạnh của cuộc sống hàng ngày.", ipa: "/ðə dɪˈvɛləpmənt əv ˌɑːrtɪˈfɪʃəl ɪnˈtɛlɪdʒəns ɪz ˈræpɪdli trænsˈfɔːrmɪŋ ˈvɛəriəs ˈɪndəstriz ænd ˈæspɛkts əv ˈdeɪli laɪf/", difficulty: "medium", theme: "tech" },
      { id: "en-tech7", text: "Cloud computing allows users to access their files and applications from any device with an internet connection.", translation: "Điện toán đám mây cho phép người dùng truy cập các tệp và ứng dụng của họ từ mọi thiết bị có kết nối internet.", ipa: "/klaʊd kəmˈpjuːtɪŋ əˈlaʊz ˈjuːzərz tu ˈæksɛs ðɛər faɪlz ænd ˌæplɪˈkeɪʃənz frɒm ˈɛni dɪˈvaɪs wɪð ən ˈɪntərˌnɛt kəˈnɛkʃən/", difficulty: "medium", theme: "tech" },
      { id: "en-tech8", text: "Cybersecurity measures are essential to protect personal data and private information from potential online threats.", translation: "Các biện pháp an ninh mạng là điều cần thiết để bảo vệ dữ liệu cá nhân và thông tin riêng tư khỏi các mối đe dọa trực tuyến tiềm ẩn.", ipa: "/ˌsaɪbərsɪˈkjʊərəti ˈmɛʒərz ər ɪˈsɛnʃəl tə prəˈtɛkt ˈpɜːrsənl ˈdeɪtə ænd ˈpraɪvət ˌɪnfərˈmeɪʃən frɒm pəˈtɛnʃəl ˈɒnˌlaɪn θrɛts/", difficulty: "medium", theme: "tech" },
      { id: "en-tech9", text: "The rapid advancement of quantum computing promises to revolutionize fields like cryptography and drug discovery, albeit facing significant engineering challenges.", translation: "Sự tiến bộ nhanh chóng của điện toán lượng tử hứa hẹn sẽ cách mạng hóa các lĩnh vực như mã hóa và khám phá thuốc, mặc dù phải đối mặt với những thách thức kỹ thuật đáng kể.", ipa: "/ðə ˈræpɪd ədˈvɑːnsmənt əv ˈkwɒntəm kəmˈpjuːtɪŋ ˈprɒmɪsɪz tə ˌrɛvəˈluːʃənaɪz fiːldz laɪk krɪpˈtɒɡrəfi ænd drʌɡ dɪˈskʌvəri, ɔːlˈbiːɪt ˈfeɪsɪŋ sɪɡˈnɪfɪkənt ˌɛndʒɪˈnɪərɪŋ ˈtʃælɪndʒɪz/", difficulty: "hard", theme: "tech" },
      { id: "en-tech10", text: "As the Internet of Things expands, the integration of smart devices into our homes and cities raises new questions about privacy, data security, and ethical implications.", translation: "Khi Internet Vạn Vật mở rộng, việc tích hợp các thiết bị thông minh vào nhà cửa và thành phố của chúng ta đặt ra những câu hỏi mới về quyền riêng tư, bảo mật dữ liệu và các hàm ý đạo đức.", ipa: "/æz ðə ˈɪntərˌnɛt əv θɪŋz ɪkˈspændz, ði ˌɪntɪˈɡreɪʃən əv smɑːrt dɪˈvaɪsɪz ˌɪntʊ aʊər hoʊmz ænd ˈsɪtiz ˈreɪzɪz nuː ˈkwɛstʃənz əˈbaʊt ˈpraɪvəsi, ˈdeɪtə sɪˈkjʊərəti, ænd ˈɛθɪkəl ˌɪmplɪˈkeɪʃənz/", difficulty: "hard", theme: "tech" },
    ],
  },
  {
    id: "en-environment", name: "Environment & Nature", nameVi: "Thiên nhiên & Môi trường", icon: "🌿",
    sentences: [
      { id: "en-environment1", text: "The sky is blue.", translation: "Bầu trời màu xanh.", ipa: "/ðə skaɪ ɪz bluː/", difficulty: "easy", theme: "environment" },
      { id: "en-environment2", text: "Flowers are beautiful.", translation: "Những bông hoa thật đẹp.", ipa: "/ˈflaʊərz ər ˈbjuːtəfʊl/", difficulty: "easy", theme: "environment" },
      { id: "en-environment3", text: "Save our planet.", translation: "Hãy cứu hành tinh của chúng ta.", ipa: "/seɪv ˈaʊər ˈplænɪt/", difficulty: "easy", theme: "environment" },
      { id: "en-environment4", text: "Recycle plastic bottles.", translation: "Hãy tái chế chai nhựa.", ipa: "/ˌriːˈsaɪkl ˈplæstɪk ˈbɒtlz/", difficulty: "easy", theme: "environment" },
      { id: "en-environment5", text: "Climate change is a global issue that requires urgent attention and collective action.", translation: "Biến đổi khí hậu là một vấn đề toàn cầu đòi hỏi sự chú ý khẩn cấp và hành động tập thể.", ipa: "/ˈklaɪmɪt tʃeɪndʒ ɪz ə ˈɡloʊbl ˈɪʃuː ðæt rɪˈkwaɪərz ˈɜːrdʒənt əˈtɛnʃən ænd kəˈlɛktɪv ˈækʃən/", difficulty: "medium", theme: "environment" },
      { id: "en-environment6", text: "Deforestation contributes to habitat loss and exacerbates the effects of global warming.", translation: "Nạn phá rừng góp phần gây mất môi trường sống và làm trầm trọng thêm tác động của sự nóng lên toàn cầu.", ipa: "/ˌdiːˌfɒrɪˈsteɪʃən kənˈtrɪbjuts tə ˈhæbɪtæt lɒs ænd ɪɡˈzæsoʊbeɪts ðə ɪˈfɛkts əv ˈɡloʊbl ˈwɔːrmɪŋ/", difficulty: "medium", theme: "environment" },
      { id: "en-environment7", text: "Renewable energy sources like solar and wind power are becoming increasingly important for a sustainable future.", translation: "Các nguồn năng lượng tái tạo như năng lượng mặt trời và gió đang trở nên ngày càng quan trọng cho một tương lai bền vững.", ipa: "/rɪˈnuːəbl ˈɛnərdʒi sɔːrsɪz laɪk ˈsoʊlər ænd wɪnd ˈpaʊər ə ˈbɪkʌmɪŋ ɪnˈkriːsɪŋli ɪmˈpɔːrtənt fɔːr ə səˈsteɪnəbl ˈfjuːtʃər/", difficulty: "medium", theme: "environment" },
      { id: "en-environment8", text: "Protecting endangered species and preserving biodiversity are crucial for maintaining the balance of ecosystems.", translation: "Bảo vệ các loài có nguy cơ tuyệt chủng và bảo tồn đa dạng sinh học là rất quan trọng để duy trì sự cân bằng của các hệ sinh thái.", ipa: "/prəˈtɛktɪŋ ɪnˈdeɪndʒərd ˈspiːʃiːz ænd prɪˈzɜːrvɪŋ ˌbaɪoʊdaɪˈvɜːrsɪti ər ˈkruːʃəl fɔːr meɪnˈteɪnɪŋ ðə ˈbæləns əv ˈiːkoʊˌsɪstɛmz/", difficulty: "medium", theme: "environment" },
      { id: "en-environment9", text: "Addressing the complex challenges of environmental degradation necessitates international cooperation, innovative policies, and a fundamental shift in human consumption patterns.", translation: "Giải quyết những thách thức phức tạp của suy thoái môi trường đòi hỏi sự hợp tác quốc tế, các chính sách đổi mới và sự thay đổi cơ bản trong các mô hình tiêu dùng của con người.", ipa: "/əˈdrɛsɪŋ ðə ˈkɒmplɛks ˈtʃælɪndʒɪz əv ɪnˌvaɪrənˈmɛntl ˌdɛɡrəˈdeɪʃən nɪˈsɛsɪteɪts ˌɪntərˈnæʃnəl koʊˌɒpəˈreɪʃən, ˈɪnəveɪtɪv ˈpɒləsiz, ænd ə ˌfʌndəˈmɛntl ʃɪft ɪn ˈhjuːmən kənˈsʌmpʃən ˈpætərnz/", difficulty: "hard", theme: "environment" },
      { id: "en-environment10", text: "The long-term viability of our planet hinges on our collective ability to transition towards a circular economy, reduce waste, and invest in sustainable infrastructure globally.", translation: "Khả năng tồn tại lâu dài của hành tinh chúng ta phụ thuộc vào khả năng tập thể của chúng ta trong việc chuyển đổi sang nền kinh tế tuần hoàn, giảm thiểu chất thải và đầu tư vào cơ sở hạ tầng bền vững trên toàn cầu.", ipa: "/ðə lɒŋ-tɜːm ˌvaɪəˈbɪlɪti əv ˈaʊər ˈplænɪt ˈhɪndʒɪz ɒn aʊər kəˈlɛktɪv əˈbɪlɪti tə trænzɪʃən təˈwɔːrdz ə ˈsɜːrkjələr ɪˈkɒnəmi, rɪˈduːs weɪst, ænd ɪnˈvɛst ɪn səˈsteɪnəbl ˈɪnfrəˌstrʌktʃər ˈɡloʊbəli/", difficulty: "hard", theme: "environment" },
    ],
  },
  {
    id: "en-food", name: "Food & Cooking", nameVi: "Ẩm thực & Nấu ăn", icon: "🍳",
    sentences: [
      { id: "en-food1", text: "I like to cook.", translation: "Tôi thích nấu ăn.", ipa: "/aɪ laɪk tə kʊk/", difficulty: "easy", theme: "food" },
      { id: "en-food2", text: "This soup is hot.", translation: "Món súp này nóng.", ipa: "/ðɪs suːp ɪz hɒt/", difficulty: "easy", theme: "food" },
      { id: "en-food3", text: "What\'s for dinner?", translation: "Tối nay ăn gì?", ipa: "/wɒts fɔːr ˈdɪnər/", difficulty: "easy", theme: "food" },
      { id: "en-food4", text: "I want some rice.", translation: "Tôi muốn một ít cơm.", ipa: "/aɪ wɒnt sʌm raɪs/", difficulty: "easy", theme: "food" },
      { id: "en-food5", text: "Learning to cook diverse cuisines can be a rewarding and enjoyable experience for anyone.", translation: "Học cách nấu các món ăn đa dạng có thể là một trải nghiệm bổ ích và thú vị cho bất kỳ ai.", ipa: "/ˈlɜːrnɪŋ tə kʊk daɪˈvɜːrs kwɪˈziːnz kæn bi ə rɪˈwɔːrdɪŋ ænd ɪnˈdʒɔɪəbl ɪkˈspɪəriəns fɔːr ˈɛniˌwʌn/", difficulty: "medium", theme: "food" },
      { id: "en-food6", text: "Fresh ingredients are key to preparing delicious and nutritious meals at home.", translation: "Nguyên liệu tươi là chìa khóa để chuẩn bị những bữa ăn ngon và bổ dưỡng tại nhà.", ipa: "/frɛʃ ɪnˈɡriːdiənts ər kiː tə prɪˈpɛrɪŋ dɪˈlɪʃəs ænd nuːˈtrɪʃəs miːlz æt hoʊm/", difficulty: "medium", theme: "food" },
      { id: "en-food7", text: "Many cultures have unique culinary traditions that reflect their history and local produce.", translation: "Nhiều nền văn hóa có những truyền thống ẩm thực độc đáo phản ánh lịch sử và sản vật địa phương của họ.", ipa: "/ˈmɛni ˈkʌltʃərz həv juːˈniːk ˈkʌlɪnɛri trəˈdɪʃənz ðæt rɪˈflɛkt ðɛr ˈhɪstəri ænd ˈloʊkl ˈprɒdjuːs/", difficulty: "medium", theme: "food" },
      { id: "en-food8", text: "Experimenting with different spices and herbs can elevate the flavors of even simple dishes.", translation: "Thử nghiệm với các loại gia vị và thảo mộc khác nhau có thể nâng tầm hương vị của ngay cả những món ăn đơn giản.", ipa: "/ɪkˌspɛrɪˈmɛntɪŋ wɪð ˈdɪfərənt ˈspaɪsɪz ænd hɜːrbz kæn ˈɛlɪveɪt ðə ˈfleɪvərz əv ˈiːvən ˈsɪmpl ˈdɪʃɪz/", difficulty: "medium", theme: "food" },
      { id: "en-food9", text: "The burgeoning farm-to-table movement emphasizes locally sourced, seasonal produce, fostering sustainability and supporting small agricultural communities.", translation: "Phong trào trang trại đến bàn ăn đang phát triển mạnh mẽ nhấn mạnh sản phẩm địa phương, theo mùa, thúc đẩy tính bền vững và hỗ trợ các cộng đồng nông nghiệp nhỏ.", ipa: "/ðə ˈbɜːrdʒənɪŋ fɑːrm-tə-ˈteɪbl ˈmuːvmənt ˈɛmfəsaɪzɪz ˈloʊkəli sɔːrst, ˈsiːzənl ˈprɒdjuːs, ˈfɒstərɪŋ səˌsteɪnəˈbɪlɪti ænd səˈpɔːrtɪŋ smɔːl ˌæɡrɪˈkʌltʃərəl kəˈmjuːnɪtiz/", difficulty: "hard", theme: "food" },
      { id: "en-food10", text: "Molecular gastronomy, a culinary discipline, explores the physical and chemical transformations of ingredients during cooking, often resulting in innovative and surprising dishes.", translation: "Ẩm thực phân tử, một ngành ẩm thực, khám phá các biến đổi vật lý và hóa học của nguyên liệu trong quá trình nấu ăn, thường dẫn đến những món ăn sáng tạo và bất ngờ.", ipa: "/məˈlɛkjʊlər ɡæˈstrɒnəmi, ə ˈkʌlɪnɛri ˈdɪsɪplɪn, ɪkˈsplɔːrz ðə ˈfɪzɪkəl ænd ˈkɛmɪkəl trænsfərˈmeɪʃənz əv ɪnˈɡriːdiənts ˈdʊərɪŋ ˈkʊkɪŋ, ˈɒftən rɪˈzʌltɪŋ ɪn ˈɪnəveɪtɪv ænd sərˈpraɪzɪŋ ˈdɪʃɪz/", difficulty: "hard", theme: "food" },
    ],
  },
  {
    id: "en-culture", name: "Culture & Entertainment", nameVi: "Văn hóa & Giải trí", icon: "🎭",
    sentences: [
      { id: "en-culture1", text: "I like to watch movies.", translation: "Tôi thích xem phim.", ipa: "/aɪ laɪk tə wɒtʃ ˈmuːviz/", difficulty: "easy", theme: "culture" },
      { id: "en-culture2", text: "Music makes me happy.", translation: "Âm nhạc làm tôi vui.", ipa: "/ˈmjuːzɪk meɪks mi ˈhæpi/", difficulty: "easy", theme: "culture" },
      { id: "en-culture3", text: "Art is interesting.", translation: "Nghệ thuật thật thú vị.", ipa: "/ɑːrt ɪz ˈɪntrɛstɪŋ/", difficulty: "easy", theme: "culture" },
      { id: "en-culture4", text: "I read a lot of books.", translation: "Tôi đọc rất nhiều sách.", ipa: "/aɪ riːd ə lɒt əv bʊks/", difficulty: "easy", theme: "culture" },
      { id: "en-culture5", text: "Visiting museums and art galleries is a wonderful way to experience different cultures.", translation: "Tham quan bảo tàng và phòng trưng bày nghệ thuật là một cách tuyệt vời để trải nghiệm các nền văn hóa khác nhau.", ipa: "/ˈvɪzɪtɪŋ mjuːˈziːəmz ænd ɑːrt ˈɡælərɪz ɪz ə ˈwʌndərfʊl weɪ tu ɪkˈspɪəriəns ˈdɪfərənt ˈkʌltʃərz/", difficulty: "medium", theme: "culture" },
      { id: "en-culture6", text: "Attending live concerts or theater performances offers a unique and engaging form of entertainment.", translation: "Tham dự các buổi hòa nhạc trực tiếp hoặc biểu diễn sân khấu mang đến một hình thức giải trí độc đáo và hấp dẫn.", ipa: "/əˈtɛndɪŋ laɪv ˈkɒnsɜːrts ɔːr ˈθiːətər pərˈfɔːrmənsɪz ˈɒfərz ə juːˈniːk ænd ɪnˈɡeɪdʒɪŋ fɔːrm əv ˌɛntərˈteɪnmənt/", difficulty: "medium", theme: "culture" },
      { id: "en-culture7", text: "Literature across various languages provides profound insights into human experiences and societal values.", translation: "Văn học ở nhiều ngôn ngữ khác nhau cung cấp những hiểu biết sâu sắc về trải nghiệm con người và giá trị xã hội.", ipa: "/ˈlɪtərɪtʃər əˈkrɒs ˈvɛəriəs ˈlæŋɡwɪdʒɪz prəˈvaɪdz prəˈfaʊnd ˈɪnsaɪts ˌɪntʊ ˈhjuːmən ɪkˈspɪəriənsɪz ænd səˈsaɪətl ˈvæljuːz/", difficulty: "medium", theme: "culture" },
      { id: "en-culture8", text: "Cultural exchange programs facilitate understanding and appreciation between people from different backgrounds.", translation: "Các chương trình giao lưu văn hóa tạo điều kiện thuận lợi cho sự hiểu biết và đánh giá cao giữa những người có hoàn cảnh khác nhau.", ipa: "/ˈkʌltʃərəl ɪksˈtʃeɪndʒ ˈproʊɡræmz fəˈsɪlɪteɪt ˌʌndərˈstændɪŋ ænd əˌpriːʃiˈeɪʃən bɪˈtwiːn ˈpiːpl frɒm ˈdɪfərənt ˈbækɡraʊndz/", difficulty: "medium", theme: "culture" },
      { id: "en-culture9", text: "The proliferation of digital media platforms has democratized access to diverse artistic expressions, allowing independent creators to reach global audiences unprecedentedly.", translation: "Sự phát triển của các nền tảng truyền thông kỹ thuật số đã dân chủ hóa quyền truy cập vào các biểu hiện nghệ thuật đa dạng, cho phép những người sáng tạo độc lập tiếp cận khán giả toàn cầu một cách chưa từng có.", ipa: "/ðə prəˌlɪfəˈreɪʃən əv ˈdɪdʒɪtl ˈmiːdiə ˈplætfɔːrmz hæz dɪˈmɒkrətaɪzd ˈæksɛs tə daɪˈvɜːrs ɑːrˈtɪstɪk ɪkˈsprɛʃənz, əˈlaʊɪŋ ˌɪndɪˈpɛndənt kriˈeɪtərz tə riːtʃ ˈɡloʊbl ˈɔːdiənsɪz ʌnˈprɛsɪdɛntɪdli/", difficulty: "hard", theme: "culture" },
      { id: "en-culture10", text: "Understanding the intricate interplay between historical contexts, societal norms, and individual creativity is fundamental to appreciating the depth and evolution of cultural phenomena worldwide.", translation: "Hiểu được sự tương tác phức tạp giữa bối cảnh lịch sử, chuẩn mực xã hội và sự sáng tạo cá nhân là điều cơ bản để đánh giá chiều sâu và sự phát triển của các hiện tượng văn hóa trên toàn thế giới.", ipa: "/ˌʌndərˈstændɪŋ ði ˈɪntrɪkət ˈɪntərˌpleɪ bɪˈtwiːn hɪˈstɒrɪkəl ˈkɒntɛksts, səˈsaɪətl nɔːrmz, ænd ˌɪndɪˈvɪdʒuəl kriːeɪˈtɪvɪti ɪz ˌfʌndəˈmɛntl tu əˈpriːʃiˌeɪtɪŋ ðə dɛpθ ænd ˌiːvəˈluːʃən əv ˈkʌltʃərəl fɪˈnɒmɪnə ˌwɜːrldˈwaɪd/", difficulty: "hard", theme: "culture" },
    ],
  },
  {
    id: "en-technology", name: "Technology", nameVi: "Công nghệ", icon: "💻",
    sentences: [
      { id: "en-tech1", text: "Technology has transformed the way we communicate with each other.", translation: "Công nghệ đã thay đổi cách chúng ta giao tiếp với nhau.", difficulty: "easy", theme: "technology" },
      { id: "en-tech2", text: "I use my smartphone for almost everything, from banking to shopping.", translation: "Tôi dùng điện thoại thông minh cho hầu hết mọi thứ, từ ngân hàng đến mua sắm.", difficulty: "easy", theme: "technology" },
      { id: "en-tech3", text: "Artificial intelligence is becoming increasingly important in everyday life.", translation: "Trí tuệ nhân tạo ngày càng trở nên quan trọng trong cuộc sống hàng ngày.", difficulty: "medium", theme: "technology" },
      { id: "en-tech4", text: "Social media platforms have changed the way people share information.", translation: "Các nền tảng mạng xã hội đã thay đổi cách mọi người chia sẻ thông tin.", difficulty: "medium", theme: "technology" },
      { id: "en-tech5", text: "Online learning has made education accessible to people around the world.", translation: "Học trực tuyến đã giúp giáo dục tiếp cận được với mọi người trên thế giới.", difficulty: "medium", theme: "technology" },
      { id: "en-tech6", text: "Cybersecurity is a growing concern as more data is stored online.", translation: "An ninh mạng là mối lo ngại ngày càng tăng khi nhiều dữ liệu được lưu trữ trực tuyến.", difficulty: "medium", theme: "technology" },
      { id: "en-tech7", text: "Electric vehicles are expected to replace traditional cars in the near future.", translation: "Xe điện được kỳ vọng sẽ thay thế ô tô truyền thống trong tương lai gần.", difficulty: "medium", theme: "technology" },
      { id: "en-tech8", text: "The rapid advancement of technology presents both opportunities and challenges for society.", translation: "Sự phát triển nhanh chóng của công nghệ mang lại cả cơ hội lẫn thách thức cho xã hội.", difficulty: "hard", theme: "technology" },
      { id: "en-tech9", text: "Cloud computing allows businesses to store and access data remotely without physical servers.", translation: "Điện toán đám mây cho phép doanh nghiệp lưu trữ và truy cập dữ liệu từ xa mà không cần máy chủ vật lý.", difficulty: "hard", theme: "technology" },
      { id: "en-tech10", text: "The ethical implications of artificial intelligence require careful consideration by policymakers and technologists alike.", translation: "Những hệ quả đạo đức của trí tuệ nhân tạo đòi hỏi sự cân nhắc cẩn thận từ cả các nhà hoạch định chính sách và nhà công nghệ.", difficulty: "hard", theme: "technology" },
    ],
  },
  {
    id: "en-environment", name: "Environment", nameVi: "Môi trường", icon: "🌍",
    sentences: [
      { id: "en-env1", text: "We should recycle more to protect the environment.", translation: "Chúng ta nên tái chế nhiều hơn để bảo vệ môi trường.", difficulty: "easy", theme: "environment" },
      { id: "en-env2", text: "Climate change is one of the biggest challenges facing our planet.", translation: "Biến đổi khí hậu là một trong những thách thức lớn nhất mà hành tinh chúng ta đang đối mặt.", difficulty: "easy", theme: "environment" },
      { id: "en-env3", text: "Renewable energy sources like solar and wind power are becoming more affordable.", translation: "Các nguồn năng lượng tái tạo như năng lượng mặt trời và gió ngày càng trở nên hợp lý hơn.", difficulty: "medium", theme: "environment" },
      { id: "en-env4", text: "Deforestation has a devastating impact on biodiversity and local communities.", translation: "Phá rừng có tác động tàn khốc đến đa dạng sinh học và cộng đồng địa phương.", difficulty: "medium", theme: "environment" },
      { id: "en-env5", text: "Reducing plastic waste is essential for protecting marine ecosystems.", translation: "Giảm thiểu rác thải nhựa là điều cần thiết để bảo vệ hệ sinh thái biển.", difficulty: "medium", theme: "environment" },
      { id: "en-env6", text: "Many countries are investing in green technology to reduce carbon emissions.", translation: "Nhiều quốc gia đang đầu tư vào công nghệ xanh để giảm lượng khí thải carbon.", difficulty: "medium", theme: "environment" },
      { id: "en-env7", text: "Sustainable agriculture practices help preserve soil quality and water resources.", translation: "Các phương pháp nông nghiệp bền vững giúp bảo tồn chất lượng đất và tài nguyên nước.", difficulty: "medium", theme: "environment" },
      { id: "en-env8", text: "The Paris Agreement aims to limit global warming to well below two degrees Celsius.", translation: "Hiệp định Paris nhằm hạn chế sự nóng lên toàn cầu dưới hai độ C.", difficulty: "hard", theme: "environment" },
      { id: "en-env9", text: "Urban planning that prioritizes green spaces and public transportation can significantly reduce pollution.", translation: "Quy hoạch đô thị ưu tiên không gian xanh và giao thông công cộng có thể giảm đáng kể ô nhiễm.", difficulty: "hard", theme: "environment" },
      { id: "en-env10", text: "The interconnected nature of environmental challenges necessitates a collaborative, multi-disciplinary approach to developing effective and equitable solutions.", translation: "Bản chất liên kết của các thách thức môi trường đòi hỏi một cách tiếp cận hợp tác, đa ngành để phát triển các giải pháp hiệu quả và công bằng.", difficulty: "hard", theme: "environment" },
    ],
  },
];

// ---- FINNISH ----
const finnishThemes: SpeakingTheme[] = [
  {
    id: "fi-greetings", name: "Tervehdykset", nameVi: "Chào hỏi", icon: "👋",
    sentences: [
      { id: "fi-g1", text: "Hei, minun nimeni on Matti.", translation: "Xin chào, tên tôi là Matti.", ipa: "/hei minun nimeni on mɑtːi/", difficulty: "easy", theme: "greetings" },
      { id: "fi-g2", text: "Hauska tavata. Mistä sinä olet kotoisin?", translation: "Rất vui gặp bạn. Bạn đến từ đâu?", difficulty: "easy", theme: "greetings" },
      { id: "fi-g3", text: "Olen asunut Suomessa kolme vuotta.", translation: "Tôi đã sống ở Phần Lan ba năm.", difficulty: "medium", theme: "greetings" },
      { id: "fi-g4", text: "Voisitko kertoa itsestäsi lyhyesti?", translation: "Bạn có thể kể ngắn gọn về bản thân không?", difficulty: "medium", theme: "greetings" },
      { id: "fi-g5", text: "On ilo tutustua sinuun.", translation: "Thật vui được làm quen với bạn.", difficulty: "easy", theme: "greetings" },
      { id: "fi-g6", text: "Hyvää huomenta kaikille!", translation: "Chào buổi sáng mọi người!", difficulty: "easy", theme: "greetings" },
      { id: "fi-g7", text: "Mitä kuuluu sinulle tänään?", translation: "Hôm nay bạn thế nào?", difficulty: "easy", theme: "greetings" },
      { id: "fi-g8", text: "Hauska nähdä sinua taas.", translation: "Rất vui được gặp lại bạn.", difficulty: "medium", theme: "greetings" },
      { id: "fi-g9", text: "Olen Annika Helsingistä. Mistä sinä olet?", translation: "Tôi là Annika từ Helsinki. Bạn từ đâu đến?", difficulty: "medium", theme: "greetings" },
      { id: "fi-g10", text: "Toivottavasti sinulla on mukava päivä täynnä iloa ja positiivisia hetkiä.", translation: "Hy vọng bạn có một ngày vui vẻ tràn đầy niềm vui và những khoảnh khắc tích cực.", difficulty: "hard", theme: "greetings" },
    ],
  },
  {
    id: "fi-daily", name: "Arki", nameVi: "Cuộc sống hàng ngày", icon: "🏠",
    sentences: [
      { id: "fi-d1", text: "Herään yleensä seitsemältä aamulla.", translation: "Tôi thường thức dậy lúc bảy giờ sáng.", difficulty: "easy", theme: "daily" },
      { id: "fi-d2", text: "Mitä sinä tykkäät tehdä vapaa-ajalla?", translation: "Bạn thích làm gì trong thời gian rảnh?", difficulty: "easy", theme: "daily" },
      { id: "fi-d3", text: "Tykkään lukea kirjoja enemmän kuin katsoa televisiota.", translation: "Tôi thích đọc sách hơn là xem tivi.", difficulty: "medium", theme: "daily" },
      { id: "fi-d4", text: "Käyn kaupassa joka päivä ostamassa ruokaa.", translation: "Tôi đi siêu thị mỗi ngày để mua thức ăn.", difficulty: "medium", theme: "daily" },
      { id: "fi-d5", text: "Sää on tänään kylmä ja tuulinen.", translation: "Thời tiết hôm nay lạnh và có gió.", difficulty: "easy", theme: "daily" },
      { id: "fi-d6", text: "Minulla on paljon tekemistä tänään.", translation: "Hôm nay tôi có nhiều việc phải làm.", difficulty: "easy", theme: "daily" },
      { id: "fi-d7", text: "Mitä syöt aamiaiseksi yleensä?", translation: "Bạn thường ăn gì vào bữa sáng?", difficulty: "easy", theme: "daily" },
      { id: "fi-d8", text: "Pitääkö sinun mennä töihin huomenna?", translation: "Ngày mai bạn có phải đi làm không?", difficulty: "medium", theme: "daily" },
      { id: "fi-d9", text: "Käyn usein kävelyllä puistossa rentoutuakseni pitkän päivän jälkeen.", translation: "Tôi thường đi dạo trong công viên để thư giãn sau một ngày dài.", difficulty: "medium", theme: "daily" },
      { id: "fi-d10", text: "Arkirutiinien seuraaminen auttaa luomaan järjestystä ja tuottavuutta elämään.", translation: "Tuân thủ các thói quen hàng ngày giúp tạo ra trật tự và năng suất trong cuộc sống.", difficulty: "hard", theme: "daily" },
    ],
  },
  {
    id: "fi-services", name: "Palvelut", nameVi: "Dịch vụ công", icon: "🏛️",
    sentences: [
      { id: "fi-s1", text: "Haluaisin varata ajan lääkärille.", translation: "Tôi muốn đặt lịch khám bác sĩ.", difficulty: "easy", theme: "services" },
      { id: "fi-s2", text: "Missä on lähin apteekki?", translation: "Hiệu thuốc gần nhất ở đâu?", difficulty: "easy", theme: "services" },
      { id: "fi-s3", text: "Tarvitsen apua asumistuen hakemisessa.", translation: "Tôi cần giúp đỡ để xin trợ cấp nhà ở.", difficulty: "medium", theme: "services" },
      { id: "fi-s4", text: "Voisitteko auttaa minua täyttämään tämän lomakkeen?", translation: "Bạn có thể giúp tôi điền vào biểu mẫu này không?", difficulty: "medium", theme: "services" },
      { id: "fi-s5", text: "Haluaisin ilmoittautua suomen kielen kurssille.", translation: "Tôi muốn đăng ký khóa học tiếng Phần Lan.", difficulty: "medium", theme: "services" },
      { id: "fi-s6", text: "Missä on lähin pankki?", translation: "Ngân hàng gần nhất ở đâu?", difficulty: "easy", theme: "services" },
      { id: "fi-s7", text: "Voitko auttaa minua löytämään sen?", translation: "Bạn có thể giúp tôi tìm nó được không?", difficulty: "easy", theme: "services" },
      { id: "fi-s8", text: "Voinko varata ajan kampaajalle huomiseksi?", translation: "Tôi có thể đặt lịch hẹn với thợ làm tóc vào ngày mai không?", difficulty: "medium", theme: "services" },
      { id: "fi-s9", text: "Haluaisin avata uuden tilin, mitä tarvitsen?", translation: "Tôi muốn mở một tài khoản mới, tôi cần gì?", difficulty: "medium", theme: "services" },
      { id: "fi-s10", text: "Postipalvelut ovat välttämättömiä monille, erityisesti pakettien lähettämisessä tai vastaanottamisessa.", translation: "Dịch vụ bưu chính rất cần thiết cho nhiều người, đặc biệt là khi gửi hoặc nhận bưu kiện.", difficulty: "hard", theme: "services" },
    ],
  },
  {
    id: "fi-shopping", name: "Kaupassa", nameVi: "Mua sắm", icon: "🛒",
    sentences: [
      { id: "fi-sh1", text: "Paljonko tämä maksaa?", translation: "Cái này giá bao nhiêu?", difficulty: "easy", theme: "shopping" },
      { id: "fi-sh2", text: "Haluaisin ostaa kaksi kiloa omenoita.", translation: "Tôi muốn mua hai cân táo.", difficulty: "easy", theme: "shopping" },
      { id: "fi-sh3", text: "Voinko maksaa kortilla?", translation: "Tôi có thể thanh toán bằng thẻ không?", difficulty: "easy", theme: "shopping" },
      { id: "fi-sh4", text: "Onko teillä tätä isompana?", translation: "Bạn có cái này cỡ lớn hơn không?", difficulty: "medium", theme: "shopping" },
      { id: "fi-sh5", text: "Tämä tuote on alennuksessa tällä viikolla.", translation: "Sản phẩm này đang giảm giá tuần này.", difficulty: "medium", theme: "shopping" },
      { id: "fi-sh6", text: "Tämä on todella edullinen.", translation: "Cái này rất phải chăng.", difficulty: "easy", theme: "shopping" },
      { id: "fi-sh7", text: "Voinko kokeilla tätä paitaa?", translation: "Tôi có thể thử chiếc áo sơ mi này không?", difficulty: "easy", theme: "shopping" },
      { id: "fi-sh8", text: "Tarvitsen uuden puhelimen, onko teillä alennuksia?", translation: "Tôi cần một chiếc điện thoại mới, cửa hàng có giảm giá không?", difficulty: "medium", theme: "shopping" },
      { id: "fi-sh9", text: "Mitä mieltä olet tästä mekosta, sopiiko se minulle?", translation: "Bạn nghĩ sao về chiếc váy này, nó có hợp với tôi không?", difficulty: "medium", theme: "shopping" },
      { id: "fi-sh10", text: "Verkkokaupasta on tullut erittäin suosittua ja kätevää viime vuosina kuluttajille ympäri maailmaa.", translation: "Mua sắm trực tuyến đã trở nên rất phổ biến và tiện lợi trong những năm gần đây đối với người tiêu dùng trên toàn thế giới.", difficulty: "hard", theme: "shopping" },
    ],
  },
  {
    id: "fi-transport", name: "Liikenne", nameVi: "Giao thông", icon: "🚌",
    sentences: [
      { id: "fi-tr1", text: "Anteeksi, missä on linja-autoasema?", translation: "Xin lỗi, bến xe buýt ở đâu?", difficulty: "easy", theme: "transport" },
      { id: "fi-tr2", text: "Haluaisin ostaa menolipun Helsinkiin.", translation: "Tôi muốn mua vé một chiều đến Helsinki.", difficulty: "medium", theme: "transport" },
      { id: "fi-tr3", text: "Juna lähtee raiteelta kolme kello kymmenen.", translation: "Tàu khởi hành từ sân ga số 3 lúc 10 giờ.", difficulty: "medium", theme: "transport" },
      { id: "fi-tr4", text: "Bussi on myöhässä kymmenen minuuttia.", translation: "Xe buýt trễ mười phút.", difficulty: "easy", theme: "transport" },
      { id: "fi-tr5", text: "Miten pääsen rautatieasemalle?", translation: "Làm sao tôi đến ga xe lửa?", difficulty: "medium", theme: "transport" },
      { id: "fi-tr6", text: "Milloin seuraava juna lähtee?", translation: "Khi nào chuyến tàu tiếp theo khởi hành?", difficulty: "easy", theme: "transport" },
      { id: "fi-tr7", text: "Tarvitsen bussikortin.", translation: "Tôi cần một thẻ xe buýt.", difficulty: "easy", theme: "transport" },
      { id: "fi-tr8", text: "Onko tässä asemalla vaihtoyhteyttä metroon?", translation: "Có tuyến chuyển đổi sang tàu điện ngầm tại ga này không?", difficulty: "medium", theme: "transport" },
      { id: "fi-tr9", text: "Taksimatka lentokentälle voi olla kallis ruuhka-aikaan.", translation: "Đi taxi đến sân bay có thể đắt vào giờ cao điểm.", difficulty: "medium", theme: "transport" },
      { id: "fi-tr10", text: "Julkisen liikenteen kehittäminen on avainasemassa kestävän kaupunkisuunnittelun toteuttamisessa.", translation: "Phát triển giao thông công cộng là yếu tố then chốt trong việc thực hiện quy hoạch đô thị bền vững.", difficulty: "hard", theme: "transport" },
    ],
  },
  {
    id: "fi-health", name: "Terveys", nameVi: "Sức khỏe", icon: "🏥",
    sentences: [
      { id: "fi-h1", text: "Minä voin hyvin.", translation: "Tôi khỏe.", difficulty: "easy", theme: "health" },
      { id: "fi-h2", text: "Onko sinulla kuumetta?", translation: "Bạn có bị sốt không?", difficulty: "easy", theme: "health" },
      { id: "fi-h3", text: "Käy lääkärissä.", translation: "Hãy đi khám bác sĩ.", difficulty: "easy", theme: "health" },
      { id: "fi-h4", text: "Syö terveellisesti.", translation: "Hãy ăn uống lành mạnh.", difficulty: "easy", theme: "health" },
      { id: "fi-h5", text: "Säännöllinen liikunta ja tasapainoinen ruokavalio ovat tärkeitä hyvän terveyden ylläpitämiseksi.", translation: "Tập thể dục thường xuyên và chế độ ăn uống cân bằng rất quan trọng để duy trì sức khỏe tốt.", difficulty: "medium", theme: "health" },
      { id: "fi-h6", text: "Riittävä uni ja stressinhallinta auttavat jaksamaan arjessa ja ehkäisevät sairauksia.", translation: "Ngủ đủ giấc và kiểm soát căng thẳng giúp bạn đối phó với cuộc sống hàng ngày và ngăn ngừa bệnh tật.", difficulty: "medium", theme: "health" },
      { id: "fi-h7", text: "On suositeltavaa käydä hammaslääkärissä säännöllisesti suun terveyden varmistamiseksi.", translation: "Nên đi khám nha sĩ thường xuyên để đảm bảo sức khỏe răng miệng.", difficulty: "medium", theme: "health" },
      { id: "fi-h8", text: "Flunssan oireisiin voi auttaa lepääminen, juominen ja tarvittaessa särkylääkkeet.", translation: "Các triệu chứng cảm lạnh có thể được giảm bớt bằng cách nghỉ ngơi, uống nước và nếu cần, dùng thuốc giảm đau.", difficulty: "medium", theme: "health" },
      { id: "fi-h9", text: "Kattava terveydenhoitosuunnitelma, joka sisältää ennaltaehkäiseviä toimenpiteitä ja säännöllisiä tarkastuksia, edistää pitkäikäisyyttä ja elämänlaatua.", translation: "Một kế hoạch chăm sóc sức khỏe toàn diện, bao gồm các biện pháp phòng ngừa và kiểm tra định kỳ, thúc đẩy tuổi thọ và chất lượng cuộc sống.", difficulty: "hard", theme: "health" },
      { id: "fi-h10", text: "Mielenterveyspalveluihin hakeutuminen on yhä tärkeämpää modernissa yhteiskunnassa, jossa henkisen hyvinvoinnin merkitys korostuu.", translation: "Tìm kiếm dịch vụ sức khỏe tâm thần ngày càng trở nên quan trọng trong xã hội hiện đại, nơi mà tầm quan trọng của sức khỏe tinh thần được nhấn mạnh.", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "fi-food", name: "Ruoka", nameVi: "Ẩm thực", icon: "🍳",
    sentences: [
      { id: "fi-food1", text: "Pidän kahvista.", translation: "Tôi thích cà phê.", difficulty: "easy", theme: "food" },
      { id: "fi-food2", text: "Leipä on hyvää.", translation: "Bánh mì ngon.", difficulty: "easy", theme: "food" },
      { id: "fi-food3", text: "Syötkö kalaa?", translation: "Bạn có ăn cá không?", difficulty: "easy", theme: "food" },
      { id: "fi-food4", text: "Haluan vettä.", translation: "Tôi muốn nước.", difficulty: "easy", theme: "food" },
      { id: "fi-food5", text: "Suomalaiset syövät usein perunaa ja lihaa pääruoan osana.", translation: "Người Phần Lan thường ăn khoai tây và thịt như một phần của món chính.", difficulty: "medium", theme: "food" },
      { id: "fi-food6", text: "Kesällä on mukavaa syödä ulkona ja grillata ystävien kanssa.", translation: "Vào mùa hè thật tuyệt khi ăn ngoài trời và nướng thịt với bạn bè.", difficulty: "medium", theme: "food" },
      { id: "fi-food7", text: "Erilaiset marjat, kuten mustikat ja puolukat, ovat suosittuja jälkiruoissa ja leivonnassa.", translation: "Các loại quả mọng khác nhau, như quả việt quất và quả nam việt quất, rất phổ biến trong các món tráng miệng và làm bánh.", difficulty: "medium", theme: "food" },
      { id: "fi-food8", text: "Ravintolat tarjoavat monipuolista ruokaa niin paikallisista kuin ulkomaisistakin keittiöistä.", translation: "Các nhà hàng cung cấp nhiều loại món ăn từ ẩm thực địa phương và nước ngoài.", difficulty: "medium", theme: "food" },
      { id: "fi-food9", text: "Perinteinen suomalainen saaristolaisleipä on paitsi herkullista myös ravintorikasta, ja sopii erinomaisesti niin arkeen kuin juhlaankin.", translation: "Bánh mì quần đảo Phần Lan truyền thống không chỉ ngon mà còn bổ dưỡng, và rất phù hợp cho cả ngày thường và lễ hội.", difficulty: "hard", theme: "food" },
      { id: "fi-food10", text: "Nykyajan kulinaristiset trendit painottavat kestäviä ja eettisiä valintoja ruoankäytössä, mikä näkyy niin kotikeittiöissä kuin fine dining -ravintoloissakin.", translation: "Các xu hướng ẩm thực hiện đại nhấn mạnh các lựa chọn bền vững và đạo đức trong việc sử dụng thực phẩm, điều này thể hiện rõ trong cả nhà bếp gia đình và các nhà hàng cao cấp.", difficulty: "hard", theme: "food" },
    ],
  },
  {
    id: "fi-työ", name: "Työ", nameVi: "Công việc", icon: "💼",
    sentences: [
      { id: "fi-työ1", text: "Minulla on työ.", translation: "Tôi có việc làm.", difficulty: "easy", theme: "työ" },
      { id: "fi-työ2", text: "Missä työskentelet?", translation: "Bạn làm việc ở đâu?", difficulty: "easy", theme: "työ" },
      { id: "fi-työ3", text: "Työpäivä alkaa klo 9.", translation: "Ngày làm việc bắt đầu lúc 9 giờ.", difficulty: "easy", theme: "työ" },
      { id: "fi-työ4", text: "Tarvitsen uuden työpaikan.", translation: "Tôi cần một công việc mới.", difficulty: "easy", theme: "työ" },
      { id: "fi-työ5", text: "Työskentelen toimistossa ja minulla on joustavat työajat.", translation: "Tôi làm việc ở văn phòng và có giờ làm việc linh hoạt.", difficulty: "medium", theme: "työ" },
      { id: "fi-työ6", text: "Ammattitaitoinen kouluttautuminen ja jatkuva oppiminen ovat tärkeitä työelämässä menestymiselle.", translation: "Đào tạo chuyên môn và học hỏi liên tục là quan trọng để thành công trong công việc.", difficulty: "medium", theme: "työ" },
      { id: "fi-työ7", text: "Työhaastatteluun kannattaa valmistautua huolellisesti ja osoittaa oma motivaatio.", translation: "Nên chuẩn bị kỹ lưỡng cho cuộc phỏng vấn xin việc và thể hiện động lực của bản thân.", difficulty: "medium", theme: "työ" },
      { id: "fi-työ8", text: "Monilla aloilla etätyö on yleistynyt ja tarjoaa uusia mahdollisuuksia työntekijöille.", translation: "Ở nhiều lĩnh vực, làm việc từ xa đã trở nên phổ biến và mang lại cơ hội mới cho người lao động.", difficulty: "medium", theme: "työ" },
      { id: "fi-työ9", text: "Digitaalisaatio ja automaatio ovat muuttaneet työmarkkinoita merkittävästi, korostamalla tarvetta uusille taidoille ja elinikäiseen oppimiseen.", translation: "Số hóa và tự động hóa đã thay đổi đáng kể thị trường lao động, nhấn mạnh nhu cầu về các kỹ năng mới và học tập suốt đời.", difficulty: "hard", theme: "työ" },
      { id: "fi-työ10", text: "Työntekijöiden hyvinvointi ja työnkuvan monipuolisuus edistävät tehokkuutta ja sitoutumista organisaatioissa, mikä on ratkaisevaa pitkäaikaiselle menestykselle.", translation: "Sức khỏe của nhân viên và sự đa dạng của mô tả công việc thúc đẩy hiệu quả và sự gắn kết trong các tổ chức, điều này rất quan trọng đối với thành công lâu dài.", difficulty: "hard", theme: "työ" },
    ],
  },
  {
    id: "fi-luonto", name: "Luonto", nameVi: "Thiên nhiên", icon: "🌲",
    sentences: [
      { id: "fi-luonto1", text: "Metsä on kaunis.", translation: "Khu rừng đẹp.", difficulty: "easy", theme: "luonto" },
      { id: "fi-luonto2", text: "Aurinko paistaa.", translation: "Mặt trời đang chiếu sáng.", difficulty: "easy", theme: "luonto" },
      { id: "fi-luonto3", text: "Linnut laulavat.", translation: "Những chú chim đang hót.", difficulty: "easy", theme: "luonto" },
      { id: "fi-luonto4", text: "Pidän luonnosta.", translation: "Tôi thích thiên nhiên.", difficulty: "easy", theme: "luonto" },
      { id: "fi-luonto5", text: "Suomessa on paljon järviä ja tiheitä metsiä, jotka tarjoavat upeita retkeilymahdollisuuksia.", translation: "Phần Lan có nhiều hồ và rừng rậm, mang đến những cơ hội đi bộ đường dài tuyệt vời.", difficulty: "medium", theme: "luonto" },
      { id: "fi-luonto6", text: "Revontulet, eli Aurora Borealis, ovat upea luonnonilmiö, joka näkyy pohjoisessa talvisin.", translation: "Bắc Cực Quang là một hiện tượng tự nhiên tuyệt đẹp, có thể nhìn thấy ở phía bắc vào mùa đông.", difficulty: "medium", theme: "luonto" },
      { id: "fi-luonto7", text: "Luonnonsuojelu on tärkeää uhanalaisten eläinten ja kasvien suojelemiseksi.", translation: "Bảo tồn thiên nhiên rất quan trọng để bảo vệ các loài động vật và thực vật có nguy cơ tuyệt chủng.", difficulty: "medium", theme: "luonto" },
      { id: "fi-luonto8", text: "Keväällä luonto herää eloon ja puut alkavat vihertää pitkän talven jälkeen.", translation: "Vào mùa xuân, thiên nhiên thức tỉnh và cây cối bắt đầu xanh tươi sau một mùa đông dài.", difficulty: "medium", theme: "luonto" },
      { id: "fi-luonto9", text: "Suomalainen jokamiehenoikeus antaa kaikille mahdollisuuden liikkua vapaasti luonnossa, kunhan kunnioittaa ympäristöä eikä aiheuta haittaa.", translation: "Quyền của mọi người Phần Lan cho phép mọi người di chuyển tự do trong tự nhiên, miễn là họ tôn trọng môi trường và không gây hại.", difficulty: "hard", theme: "luonto" },
      { id: "fi-luonto10", text: "Ilmastonmuutoksen hillitseminen vaatii globaaleja ponnisteluja ja siirtymistä kestävämpään elämäntapaan planeettamme tulevaisuuden turvaamiseksi.", translation: "Giảm thiểu biến đổi khí hậu đòi hỏi những nỗ lực toàn cầu và chuyển đổi sang lối sống bền vững hơn để đảm bảo tương lai của hành tinh chúng ta.", difficulty: "hard", theme: "luonto" },
    ],
  },
  {
    id: "fi-kulttuuri", name: "Kulttuuri", nameVi: "Văn hóa", icon: "🎭",
    sentences: [
      { id: "fi-kulttuuri1", text: "Musiikki soi.", translation: "Âm nhạc vang lên.", difficulty: "easy", theme: "kulttuuri" },
      { id: "fi-kulttuuri2", text: "Luen kirjaa.", translation: "Tôi đang đọc sách.", difficulty: "easy", theme: "kulttuuri" },
      { id: "fi-kulttuuri3", text: "Rakastan taidetta.", translation: "Tôi yêu nghệ thuật.", difficulty: "easy", theme: "kulttuuri" },
      { id: "fi-kulttuuri4", text: "Käyn museossa.", translation: "Tôi đi đến bảo tàng.", difficulty: "easy", theme: "kulttuuri" },
      { id: "fi-kulttuuri5", text: "Suomalainen sauna on tärkeä osa kansallista kulttuuria ja perinnettä.", translation: "Xông hơi Phần Lan là một phần quan trọng của văn hóa và truyền thống quốc gia.", difficulty: "medium", theme: "kulttuuri" },
      { id: "fi-kulttuuri6", text: "Kalevala on Suomen kansalliseepos, joka kertoo myyttisiä tarinoita menneisyydestä.", translation: "Kalevala là sử thi quốc gia của Phần Lan, kể những câu chuyện thần thoại về quá khứ.", difficulty: "medium", theme: "kulttuuri" },
      { id: "fi-kulttuuri7", text: "Festivaalit ja tapahtumat ovat suosittuja kesäisin, houkutellen ihmisiä nauttimaan musiikista ja ilmapiiristä.", translation: "Các lễ hội và sự kiện rất phổ biến vào mùa hè, thu hút mọi người đến thưởng thức âm nhạc và không khí.", difficulty: "medium", theme: "kulttuuri" },
      { id: "fi-kulttuuri8", text: "Kirjallisuus-, elokuva- ja teatterialat kukoistavat Suomessa monien lahjakkaiden tekijöiden ansiosta.", translation: "Các ngành văn học, điện ảnh và sân khấu phát triển mạnh ở Phần Lan nhờ vào nhiều nghệ sĩ tài năng.", difficulty: "medium", theme: "kulttuuri" },
      { id: "fi-kulttuuri9", text: "Suomalainen muotoilu, erityisesti Alvar Aallon modernistiset teokset, on saavuttanut maailmanlaajuista tunnustusta ajattoman kauneutensa ja käytännöllisyytensä ansiosta.", translation: "Thiết kế Phần Lan, đặc biệt là các tác phẩm hiện đại của Alvar Aalto, đã được công nhận trên toàn thế giới nhờ vẻ đẹp vượt thời gian và tính thực tế.", difficulty: "hard", theme: "kulttuuri" },
      { id: "fi-kulttuuri10", text: "Globaalistuvassa maailmassa paikallisten kulttuuriperinteiden vaaliminen ja niiden esittely matkailijoille luo ainutlaatuisia kokemuksia ja edistää ymmärrystä eri kansojen välillä.", translation: "Trong một thế giới toàn cầu hóa, việc trân trọng các truyền thống văn hóa địa phương và giới thiệu chúng cho du khách tạo ra những trải nghiệm độc đáo và thúc đẩy sự hiểu biết giữa các dân tộc khác nhau.", difficulty: "hard", theme: "kulttuuri" },
    ],
  },
  {
    id: "fi-asuminen", name: "Asuminen", nameVi: "Nhà ở", icon: "🏠",
    sentences: [
      { id: "fi-asu1", text: "Asun kerrostalossa kaupungin keskustassa.", translation: "Tôi sống trong chung cư ở trung tâm thành phố.", ipa: "/ɑsun kerːostɑlosːɑ kɑupuŋin keskustɑsːɑ/", difficulty: "easy", theme: "asuminen" },
      { id: "fi-asu2", text: "Asunnossani on kaksi huonetta ja keittiö.", translation: "Căn hộ của tôi có hai phòng và bếp.", ipa: "/ɑsunːosːɑni on kɑksi huonetːɑ jɑ keitːiø/", difficulty: "easy", theme: "asuminen" },
      { id: "fi-asu3", text: "Vuokra on kuusisataa euroa kuukaudessa.", translation: "Tiền thuê là sáu trăm euro mỗi tháng.", difficulty: "easy", theme: "asuminen" },
      { id: "fi-asu4", text: "Haluaisin muuttaa isompaan asuntoon lähellä puistoa.", translation: "Tôi muốn chuyển đến căn hộ lớn hơn gần công viên.", difficulty: "medium", theme: "asuminen" },
      { id: "fi-asu5", text: "Taloyhtiön saunavuoro on torstaisin kello kuudesta kahdeksaan.", translation: "Lượt sauna của tòa nhà là vào thứ Năm từ sáu đến tám giờ.", difficulty: "medium", theme: "asuminen" },
      { id: "fi-asu6", text: "Naapurini ovat ystävällisiä ja tervehtivät aina rappukäytävässä.", translation: "Hàng xóm của tôi rất thân thiện và luôn chào ở cầu thang.", difficulty: "medium", theme: "asuminen" },
      { id: "fi-asu7", text: "Pyykinpesukoneen käyttövuoro pitää varata etukäteen.", translation: "Lượt dùng máy giặt phải đặt trước.", difficulty: "medium", theme: "asuminen" },
      { id: "fi-asu8", text: "Isännöitsijälle täytyy ilmoittaa, jos jokin menee rikki asunnossa.", translation: "Phải thông báo cho quản lý tòa nhà nếu có gì hỏng trong căn hộ.", difficulty: "medium", theme: "asuminen" },
      { id: "fi-asu9", text: "Suomessa vuokrasopimus on yleensä toistaiseksi voimassa oleva tai määräaikainen.", translation: "Ở Phần Lan, hợp đồng thuê thường là vô thời hạn hoặc có thời hạn.", difficulty: "hard", theme: "asuminen" },
      { id: "fi-asu10", text: "Asumistukea voi hakea Kelasta, jos tulot ovat pienet ja vuokra on kohtuullinen.", translation: "Có thể xin trợ cấp nhà ở từ Kela nếu thu nhập thấp và tiền thuê hợp lý.", difficulty: "hard", theme: "asuminen" },
    ],
  },
  {
    id: "fi-tyo", name: "Työ", nameVi: "Công việc", icon: "💼",
    sentences: [
      { id: "fi-tyo1", text: "Olen töissä ravintolassa kokkina.", translation: "Tôi làm việc ở nhà hàng với vai trò đầu bếp.", difficulty: "easy", theme: "tyo" },
      { id: "fi-tyo2", text: "Työaikani on maanantaista perjantaihin.", translation: "Giờ làm việc của tôi từ thứ Hai đến thứ Sáu.", difficulty: "easy", theme: "tyo" },
      { id: "fi-tyo3", text: "Haen uutta työpaikkaa, koska haluan kehittyä ammatillisesti.", translation: "Tôi tìm việc mới vì muốn phát triển chuyên môn.", difficulty: "medium", theme: "tyo" },
      { id: "fi-tyo4", text: "Työhaastattelussa on tärkeää kertoa vahvuuksistaan.", translation: "Trong phỏng vấn việc làm, điều quan trọng là nói về điểm mạnh của mình.", difficulty: "medium", theme: "tyo" },
      { id: "fi-tyo5", text: "Ansioluettelossa pitää olla yhteystiedot, koulutus ja työkokemus.", translation: "Trong CV phải có thông tin liên lạc, học vấn và kinh nghiệm làm việc.", difficulty: "medium", theme: "tyo" },
      { id: "fi-tyo6", text: "Työkaverit ovat mukavia ja työilmapiiri on hyvä.", translation: "Đồng nghiệp rất dễ thương và bầu không khí làm việc tốt.", difficulty: "medium", theme: "tyo" },
      { id: "fi-tyo7", text: "Suomessa työntekijällä on oikeus neljän viikon lomaan vuodessa.", translation: "Ở Phần Lan, người lao động có quyền nghỉ phép bốn tuần mỗi năm.", difficulty: "medium", theme: "tyo" },
      { id: "fi-tyo8", text: "Etätyö on yleistynyt paljon viime vuosina.", translation: "Làm việc từ xa đã trở nên phổ biến hơn trong những năm gần đây.", difficulty: "medium", theme: "tyo" },
      { id: "fi-tyo9", text: "Ammattiliiton jäsenyys on suositeltavaa, koska se tarjoaa turvaa työsuhteessa.", translation: "Nên tham gia công đoàn vì nó cung cấp sự bảo vệ trong quan hệ lao động.", difficulty: "hard", theme: "tyo" },
      { id: "fi-tyo10", text: "Työvoimapula on haaste monilla aloilla, ja maahanmuuttajien työpanos on yhä tärkeämpää Suomen taloudelle.", translation: "Thiếu hụt lao động là thách thức ở nhiều ngành, và đóng góp lao động của người nhập cư ngày càng quan trọng cho nền kinh tế Phần Lan.", difficulty: "hard", theme: "tyo" },
    ],
  },
];

// ---- CHINESE ----
const chineseThemes: SpeakingTheme[] = [
  {
    id: "zh-greetings", name: "问候与介绍", nameVi: "Chào hỏi & Giới thiệu", icon: "👋",
    sentences: [
      { id: "zh-g1", text: "你好，我叫小明，我是学生。", translation: "Xin chào, tôi tên Tiểu Minh, tôi là sinh viên.", ipa: "nǐ hǎo, wǒ jiào xiǎo míng, wǒ shì xuéshēng.", difficulty: "easy", theme: "greetings" },
      { id: "zh-g2", text: "很高兴认识你，你从哪里来？", translation: "Rất vui được biết bạn, bạn đến từ đâu?", ipa: "hěn gāoxìng rènshi nǐ, nǐ cóng nǎlǐ lái?", difficulty: "easy", theme: "greetings" },
      { id: "zh-g3", text: "我在中国住了三年了。", translation: "Tôi đã sống ở Trung Quốc ba năm.", ipa: "wǒ zài zhōngguó zhù le sān nián le.", difficulty: "medium", theme: "greetings" },
      { id: "zh-g4", text: "请你简单介绍一下自己。", translation: "Xin hãy giới thiệu ngắn gọn về bản thân.", ipa: "qǐng nǐ jiǎndān jièshào yīxià zìjǐ.", difficulty: "medium", theme: "greetings" },
      { id: "zh-g5", text: "能认识你我感到非常荣幸。", translation: "Được biết bạn tôi cảm thấy rất vinh hạnh.", ipa: "néng rènshi nǐ wǒ gǎndào fēicháng róngxìng.", difficulty: "hard", theme: "greetings" },
      { id: "zh-g6", text: "你好！很久不见了。", translation: "Xin chào! Lâu rồi không gặp.", ipa: "Nǐ hǎo! Hěn jiǔ bú jiàn le.", difficulty: "easy", theme: "greetings" },
      { id: "zh-g7", text: "你最近过得怎么样？", translation: "Dạo này bạn thế nào?", ipa: "Nǐ zuìjìn guò de zěnmeyàng?", difficulty: "easy", theme: "greetings" },
      { id: "zh-g8", text: "见到你很高兴，我是王明。", translation: "Rất vui được gặp bạn, tôi là Vương Minh.", ipa: "Jiàndào nǐ hěn gāoxìng, wǒ shì Wáng Míng.", difficulty: "medium", theme: "greetings" },
      { id: "zh-g9", text: "请问您贵姓？您是做什么工作的？", translation: "Xin hỏi quý danh của bạn là gì? Bạn làm nghề gì?", ipa: "Qǐngwèn nín guìxìng? Nín shì zuò shénme gōngzuò de?", difficulty: "medium", theme: "greetings" },
      { id: "zh-g10", text: "希望我们今天能有一个愉快的交流和美好的回忆。", translation: "Hy vọng hôm nay chúng ta sẽ có một buổi giao lưu vui vẻ và những kỷ niệm đẹp.", ipa: "Xīwàng wǒmen jīntiān néng yǒu yīgè yúkuài de jiāoliú hé měihǎo de huíyì.", difficulty: "hard", theme: "greetings" },
    ],
  },
  {
    id: "zh-daily", name: "日常生活", nameVi: "Cuộc sống hàng ngày", icon: "🏠",
    sentences: [
      { id: "zh-d1", text: "我每天早上七点起床。", translation: "Tôi thức dậy lúc 7 giờ sáng mỗi ngày.", difficulty: "easy", theme: "daily" },
      { id: "zh-d2", text: "你喜欢做什么？", translation: "Bạn thích làm gì?", difficulty: "easy", theme: "daily" },
      { id: "zh-d3", text: "我喜欢看书，不太喜欢看电视。", translation: "Tôi thích đọc sách, không thích xem tivi lắm.", difficulty: "medium", theme: "daily" },
      { id: "zh-d4", text: "今天天气很好，我们去公园吧。", translation: "Hôm nay thời tiết rất đẹp, chúng ta đi công viên nhé.", difficulty: "medium", theme: "daily" },
      { id: "zh-d5", text: "周末我通常和家人一起吃饭。", translation: "Cuối tuần tôi thường ăn cơm cùng gia đình.", difficulty: "medium", theme: "daily" },
      { id: "zh-d6", text: "今天天气真好！", translation: "Hôm nay thời tiết thật đẹp!", ipa: "Jīntiān tiānqì zhēn hǎo!", difficulty: "easy", theme: "daily" },
      { id: "zh-d7", text: "我早上八点起床。", translation: "Tôi thức dậy lúc 8 giờ sáng.", ipa: "Wǒ zǎoshang bā diǎn qǐchuáng.", difficulty: "easy", theme: "daily" },
      { id: "zh-d8", text: "你喜欢在家里吃饭还是出去吃？", translation: "Bạn thích ăn ở nhà hay đi ăn ngoài?", ipa: "Nǐ xǐhuān zài jiālǐ chīfàn háishì chūqù chī?", difficulty: "medium", theme: "daily" },
      { id: "zh-d9", text: "我通常在吃完晚饭后看一会儿电视。", translation: "Tôi thường xem TV một lúc sau bữa tối.", ipa: "Wǒ tōngcháng zài chī wán wǎnfàn hòu kàn yīhuǐ'er diànshì.", difficulty: "medium", theme: "daily" },
      { id: "zh-d10", text: "保持健康的生活习惯对于我们的身心健康非常重要。", translation: "Duy trì thói quen sinh hoạt lành mạnh rất quan trọng đối với sức khỏe thể chất và tinh thần của chúng ta.", ipa: "Bǎochí jiànkāng de shēnghuó xíguàn duìyú wǒmen de shēnxīn jiànkāng fēicháng zhòngyào.", difficulty: "hard", theme: "daily" },
    ],
  },
  {
    id: "zh-food", name: "饮食", nameVi: "Ẩm thực", icon: "🍜",
    sentences: [
      { id: "zh-f1", text: "我想点一碗牛肉面。", translation: "Tôi muốn gọi một bát mì bò.", difficulty: "easy", theme: "food" },
      { id: "zh-f2", text: "这个菜太辣了，有没有不辣的？", translation: "Món này cay quá, có món nào không cay không?", difficulty: "medium", theme: "food" },
      { id: "zh-f3", text: "请问可以用微信支付吗？", translation: "Xin hỏi có thể thanh toán bằng WeChat không?", difficulty: "medium", theme: "food" },
      { id: "zh-f4", text: "中国菜非常好吃，我最喜欢饺子。", translation: "Món ăn Trung Quốc rất ngon, tôi thích nhất là sủi cảo.", difficulty: "medium", theme: "food" },
      { id: "zh-f5", text: "服务员，请给我一杯绿茶。", translation: "Phục vụ ơi, cho tôi một ly trà xanh.", difficulty: "easy", theme: "food" },
      { id: "zh-f6", text: "这道菜很好吃！", translation: "Món này rất ngon!", ipa: "Zhè dào cài hěn hǎochī!", difficulty: "easy", theme: "food" },
      { id: "zh-f7", text: "我想点一份炒饭。", translation: "Tôi muốn gọi một suất cơm rang.", ipa: "Wǒ xiǎng diǎn yī fèn chǎofàn.", difficulty: "easy", theme: "food" },
      { id: "zh-f8", text: "这个餐厅有什么特色菜吗？", translation: "Nhà hàng này có món đặc sản nào không?", ipa: "Zhège cāntīng yǒu shénme tèsè cài ma?", difficulty: "medium", theme: "food" },
      { id: "zh-f9", text: "你对什么食物过敏吗？我帮你问问厨师。", translation: "Bạn có dị ứng với thức ăn nào không? Tôi sẽ hỏi đầu bếp giúp bạn.", ipa: "Nǐ duì shénme shíwù guòmǐn ma? Wǒ bāng nǐ wèn wèn chúshī.", difficulty: "medium", theme: "food" },
      { id: "zh-f10", text: "不同地区的饮食文化反映了当地的历史、地理和人民的生活方式。", translation: "Văn hóa ẩm thực ở các vùng khác nhau phản ánh lịch sử, địa lý và lối sống của người dân địa phương.", difficulty: "hard", theme: "food" },
    ],
  },
  {
    id: "zh-travel", name: "旅行", nameVi: "Du lịch", icon: "✈️",
    sentences: [
      { id: "zh-t1", text: "请问火车站怎么走？", translation: "Xin hỏi ga xe lửa đi đường nào?", difficulty: "easy", theme: "travel" },
      { id: "zh-t2", text: "我想买一张去北京的火车票。", translation: "Tôi muốn mua một vé tàu đến Bắc Kinh.", difficulty: "medium", theme: "travel" },
      { id: "zh-t3", text: "这个酒店离机场有多远？", translation: "Khách sạn này cách sân bay bao xa?", difficulty: "medium", theme: "travel" },
      { id: "zh-t4", text: "我的航班延误了两个小时。", translation: "Chuyến bay của tôi bị hoãn hai tiếng.", difficulty: "medium", theme: "travel" },
      { id: "zh-t5", text: "长城是中国最著名的景点之一。", translation: "Vạn Lý Trường Thành là một trong những thắng cảnh nổi tiếng nhất Trung Quốc.", difficulty: "hard", theme: "travel" },
      { id: "zh-t6", text: "我要去北京。", translation: "Tôi muốn đi Bắc Kinh.", ipa: "Wǒ yào qù Běijīng.", difficulty: "easy", theme: "travel" },
      { id: "zh-t7", text: "这个景点离这里远吗？", translation: "Điểm tham quan này có xa đây không?", ipa: "Zhège jǐngdiǎn lí zhèlǐ yuǎn ma?", difficulty: "easy", theme: "travel" },
      { id: "zh-t8", text: "请问，到火车站怎么走？", translation: "Xin hỏi, đi đến ga tàu hỏa đi như thế nào?", ipa: "Qǐngwèn, dào huǒchēzhàn zěnme zǒu?", difficulty: "medium", theme: "travel" },
      { id: "zh-t9", text: "你有没有推荐的必去景点或者当地美食？", translation: "Bạn có điểm tham quan hoặc ẩm thực địa phương nào nhất định phải ghé thăm không?", ipa: "Nǐ yǒu méiyǒu tuījiàn de bì qù jǐngdiǎn huòzhě dāngdì měishí?", difficulty: "medium", theme: "travel" },
      { id: "zh-t10", text: "提前规划行程并预订住宿可以帮助您获得更顺畅的旅行体验。", translation: "Lên kế hoạch hành trình trước và đặt chỗ ở có thể giúp bạn có trải nghiệm du lịch suôn sẻ hơn.", difficulty: "hard", theme: "travel" },
    ],
  },
  {
    id: "zh-work", name: "工作", nameVi: "Công việc", icon: "💼",
    sentences: [
      { id: "zh-w1", text: "我在一家科技公司工作。", translation: "Tôi làm việc tại một công ty công nghệ.", difficulty: "easy", theme: "work" },
      { id: "zh-w2", text: "下周三我们需要开会。", translation: "Tuần tới thứ Tư chúng ta cần họp.", difficulty: "medium", theme: "work" },
      { id: "zh-w3", text: "这个项目的截止日期是什么时候？", translation: "Hạn chót của dự án này là khi nào?", difficulty: "medium", theme: "work" },
      { id: "zh-w4", text: "我对我们团队的能力很有信心。", translation: "Tôi rất tự tin vào năng lực của đội chúng tôi.", difficulty: "hard", theme: "work" },
      { id: "zh-w5", text: "我们来讨论一下这个季度的报告。", translation: "Chúng ta hãy thảo luận về báo cáo quý này.", difficulty: "medium", theme: "work" },
      { id: "zh-w6", text: "我今天工作很忙。", translation: "Hôm nay tôi rất bận làm việc.", ipa: "Wǒ jīntiān gōngzuò hěn máng.", difficulty: "easy", theme: "work" },
      { id: "zh-w7", text: "我需要完成这份报告。", translation: "Tôi cần hoàn thành báo cáo này.", ipa: "Wǒ xūyào wánchéng zhè fèn bàogào.", difficulty: "easy", theme: "work" },
      { id: "zh-w8", text: "我们公司的主要业务是什么？", translation: "Lĩnh vực kinh doanh chính của công ty chúng ta là gì?", ipa: "Wǒmen gōngsī de zhǔyào yèwù shì shénme?", difficulty: "medium", theme: "work" },
      { id: "zh-w9", text: "请尽快把这份文件发给李经理。", translation: "Vui lòng gửi tài liệu này cho Giám đốc Lý càng sớm càng tốt.", ipa: "Qǐng jǐnkuài bǎ zhè fèn wénjiàn fā gěi Lǐ jīnglǐ.", difficulty: "medium", theme: "work" },
      { id: "zh-w10", text: "良好的团队合作和高效的沟通是项目成功的关键因素。", translation: "Tinh thần đồng đội tốt và giao tiếp hiệu quả là những yếu tố then chốt dẫn đến thành công của dự án.", ipa: "Liánghǎo de tuánduì hézuò hé gāoxiào de gōutōng shì xiàngmù chénggōng de guānjiàn yīnsù.", difficulty: "hard", theme: "work" },
    ],
  },
  {
    id: "zh-health", name: "健康", nameVi: "Sức khỏe", icon: "🏥",
    sentences: [
      { id: "zh-h1", text: "我今天感觉很好。", translation: "Hôm nay tôi cảm thấy khỏe.", ipa: "wǒ jīn tiān gǎn jué hěn hǎo.", difficulty: "easy", theme: "health" },
      { id: "zh-h2", text: "多喝水。", translation: "Uống nhiều nước.", ipa: "duō hē shuǐ.", difficulty: "easy", theme: "health" },
      { id: "zh-h3", text: "我生病了。", translation: "Tôi bị ốm.", ipa: "wǒ shēng bìng le.", difficulty: "easy", theme: "health" },
      { id: "zh-h4", text: "去医院。", translation: "Đi bệnh viện.", ipa: "qù yī yuàn.", difficulty: "easy", theme: "health" },
      { id: "zh-h5", text: "保持健康的生活方式对每个人都很重要，包括均衡饮食和适度运动。", translation: "Duy trì lối sống lành mạnh rất quan trọng đối với mọi người, bao gồm chế độ ăn uống cân bằng và tập thể dục vừa phải.", ipa: "bǎo chí jiàn kāng de shēng huó fāng shì duì měi gè rén dōu hěn zhòng yào, bāo kuò jūn héng yǐn shí hé shì dù yùn dòng.", difficulty: "medium", theme: "health" },
      { id: "zh-h6", text: "定期的体检可以帮助我们及早发现潜在的健康问题。", translation: "Kiểm tra sức khỏe định kỳ có thể giúp chúng ta phát hiện sớm các vấn đề sức khỏe tiềm ẩn.", ipa: "dìng qí de tǐ jiǎn kě yǐ bāng zhù wǒ men jí zǎo fā xiàn qián zài de jiàn kāng wèn tí.", difficulty: "medium", theme: "health" },
      { id: "zh-h7", text: "为了预防疾病，我们应该多吃蔬菜水果，少吃油腻的食物。", translation: "Để phòng ngừa bệnh tật, chúng ta nên ăn nhiều rau quả và ít thức ăn nhiều dầu mỡ.", ipa: "wèi le yù fáng jí bìng, wǒ men yīng gāi duō chī shū cài shuǐ guǒ, shǎo chī yóu nì de shí wù.", difficulty: "medium", theme: "health" },
      { id: "zh-h8", text: "充足的睡眠对于恢复体力和保持良好的精神状态至关重要。", translation: "Ngủ đủ giấc là điều cần thiết để phục hồi thể chất và duy trì trạng thái tinh thần tốt.", ipa: "chōng zú de shuì mián duì yú huī fù tǐ lì hé bǎo chí liáng hǎo de jīng shén zhuàng tài zhì guān zhòng yào.", difficulty: "medium", theme: "health" },
      { id: "zh-h9", text: "随着人口老龄化趋势的加剧，如何有效地应对老年人健康问题以及提高他们的生活质量，成为了一个全球性的挑战。", translation: "Với xu hướng già hóa dân số ngày càng tăng, làm thế nào để đối phó hiệu quả với các vấn đề sức khỏe của người cao tuổi và nâng cao chất lượng cuộc sống của họ đã trở thành một thách thức toàn cầu.", ipa: "suí zhe rén kǒu lǎo líng huà qū shì de jiā jù, rú hé yǒu xiào dì yìng duì lǎo nián rén jiàn kāng wèn tí yǐ jí tí gāo tā men de shēng huó zhì liàng, chéng wéi le yī gè quán qiú xìng de tiǎo zhàn.", difficulty: "hard", theme: "health" },
      { id: "zh-h10", text: "心理健康与身体健康同等重要，积极寻求心理咨询或支持有助于缓解压力和改善情绪。", translation: "Sức khỏe tâm thần cũng quan trọng như sức khỏe thể chất, tích cực tìm kiếm tư vấn hoặc hỗ trợ tâm lý giúp giảm căng thẳng và cải thiện tâm trạng.", ipa: "xīn lǐ jiàn kāng yǔ shēn tǐ jiàn kāng tóng děng zhòng yào, jī jí xún qiú xīn lǐ zī xún huò zhī chí yǒu zhù yú huǎn jiě yā lì hé gǎi shàn qíng xù.", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "zh-shopping", name: "购物", nameVi: "Mua sắm", icon: "🛒",
    sentences: [
      { id: "zh-shopping1", text: "我想买一个。", translation: "Tôi muốn mua một cái.", ipa: "wǒ xiǎng mǎi yī gè.", difficulty: "easy", theme: "shopping" },
      { id: "zh-shopping2", text: "这个多少钱？", translation: "Cái này bao nhiêu tiền?", ipa: "zhè ge duō shǎo qián?", difficulty: "easy", theme: "shopping" },
      { id: "zh-shopping3", text: "我可以试穿吗？", translation: "Tôi có thể thử không?", ipa: "wǒ kě yǐ shì chuān ma?", difficulty: "easy", theme: "shopping" },
      { id: "zh-shopping4", text: "请给我发票。", translation: "Làm ơn cho tôi hóa đơn.", ipa: "qǐng gěi wǒ fā piào.", difficulty: "easy", theme: "shopping" },
      { id: "zh-shopping5", text: "在线购物已经成为现代人生活中不可或缺的一部分。", translation: "Mua sắm trực tuyến đã trở thành một phần không thể thiếu trong cuộc sống hiện đại.", ipa: "zài xiàn gòu wù yǐ jīng chéng wéi xiàn dài rén shēng huó zhōng bù kě huò quē de yī bù fèn.", difficulty: "medium", theme: "shopping" },
      { id: "zh-shopping6", text: "在打折季，很多商店都会提供大幅折扣来吸引顾客。", translation: "Vào mùa giảm giá, nhiều cửa hàng sẽ đưa ra những đợt giảm giá lớn để thu hút khách hàng.", ipa: "zài dá zhé jì, hěn duō shāng diàn dōu huì tí gōng dà fú zhé kòu lái xī yǐn gù kè.", difficulty: "medium", theme: "shopping" },
      { id: "zh-shopping7", text: "我喜欢比较不同品牌的产品，然后选择性价比最高的那个。", translation: "Tôi thích so sánh sản phẩm của các thương hiệu khác nhau, sau đó chọn cái có tỷ lệ hiệu suất giá tốt nhất.", ipa: "wǒ xǐ huān bǐ jiào bù tóng pǐn pái de chǎn pǐn, rán hòu xuǎn zé xìng jià bǐ zuì gāo de nà ge.", difficulty: "medium", theme: "shopping" },
      { id: "zh-shopping8", text: "退换货政策是消费者在购物前需要了解的重要信息。", translation: "Chính sách đổi trả hàng là thông tin quan trọng mà người tiêu dùng cần biết trước khi mua sắm.", ipa: "tuì huàn huò zhèng cè shì xiāo fèi zhě zài gòu wù qián xū yào liǎo jiě de zhòng yào xìn xī.", difficulty: "medium", theme: "shopping" },
      { id: "zh-shopping9", text: "随着电子商务的蓬勃发展，消费者现在可以在全球范围内购买到各种商品，极大地丰富了购物体验并带来了更多选择。", translation: "Với sự phát triển mạnh mẽ của thương mại điện tử, người tiêu dùng hiện nay có thể mua nhiều loại hàng hóa trên toàn cầu, làm phong phú đáng kể trải nghiệm mua sắm và mang lại nhiều lựa chọn hơn.", ipa: "suí zhe diàn zǐ shāng wù de péng bó fā zhǎn, xiāo fèi zhě xiàn zài kě yǐ zài quán qiú fàn wéi nèi gòu mǎi dào gè zhǒng shāng pǐn, jí dà dì fēng fù le gòu wù tǐ yàn bìng dài lái le gèng duō xuǎn zé.", difficulty: "hard", theme: "shopping" },
      { id: "zh-shopping10", text: "为了避免冲动消费和不必要的浪费，许多人开始实践可持续购物理念，选择购买质量更好、更耐用、对环境友好的产品。", translation: "Để tránh mua sắm bốc đồng và lãng phí không cần thiết, nhiều người bắt đầu thực hành triết lý mua sắm bền vững, chọn mua những sản phẩm chất lượng tốt hơn, bền hơn và thân thiện với môi trường.", ipa: "wèi le bì miǎn chōng dòng xiāo fèi hé bù bì yào de làng fèi, xǔ duō rén kāi shǐ shí jiàn kě chí xù gòu wù lǐ niàn, xuǎn zé gòu mǎi zhì liàng gèng hǎo, gèng nài yòng, duì huán jìng yǒu hǎo de chǎn pǐn.", difficulty: "hard", theme: "shopping" },
    ],
  },
  {
    id: "zh-education", name: "教育", nameVi: "Giáo dục", icon: "📚",
    sentences: [
      { id: "zh-education1", text: "我是一名学生。", translation: "Tôi là học sinh.", ipa: "wǒ shì yī míng xué shēng.", difficulty: "easy", theme: "education" },
      { id: "zh-education2", text: "老师很好。", translation: "Giáo viên rất tốt.", ipa: "lǎo shī hěn hǎo.", difficulty: "easy", theme: "education" },
      { id: "zh-education3", text: "我喜欢学习。", translation: "Tôi thích học.", ipa: "wǒ xǐ huān xué xí.", difficulty: "easy", theme: "education" },
      { id: "zh-education4", text: "学校离家很近。", translation: "Trường học gần nhà.", ipa: "xué xiào lí jiā hěn jìn.", difficulty: "easy", theme: "education" },
      { id: "zh-education5", text: "高等教育对于个人职业发展和社会进步都具有重要意义。", translation: "Giáo dục đại học có ý nghĩa quan trọng đối với sự phát triển nghề nghiệp cá nhân và tiến bộ xã hội.", ipa: "gāo děng jiào yù duì yú gè rén zhí yè fā zhǎn hé shè huì jìn bù dōu jù yǒu zhòng yào yì yì.", difficulty: "medium", theme: "education" },
      { id: "zh-education6", text: "终身学习的理念鼓励人们不断获取新知识和技能，适应时代的变化。", translation: "Khái niệm học tập suốt đời khuyến khích mọi người không ngừng tiếp thu kiến thức và kỹ năng mới, thích ứng với sự thay đổi của thời đại.", ipa: "zhōng shēn xué xí de lǐ niàn gǔ lì rén men bù duàn huò qǔ xīn zhī shi hé jì néng, shì yìng shí dài de biàn huà.", difficulty: "medium", theme: "education" },
      { id: "zh-education7", text: "在线教育平台的兴起为更多人提供了灵活便捷的学习途径。", translation: "Sự nổi lên của các nền tảng giáo dục trực tuyến đã cung cấp con đường học tập linh hoạt và tiện lợi cho nhiều người hơn.", ipa: "zài xiàn jiào yù píng tái de xīng qǐ wèi gèng duō rén tí gōng le líng huó biàn jié de xué xí tú jìng.", difficulty: "medium", theme: "education" },
      { id: "zh-education8", text: "素质教育不仅仅关注学生的学业成绩，更注重培养他们的综合能力和品德。", translation: "Giáo dục chất lượng không chỉ tập trung vào thành tích học tập của học sinh mà còn chú trọng bồi dưỡng năng lực toàn diện và phẩm chất đạo đức của họ.", difficulty: "medium", theme: "education" },
      { id: "zh-education9", text: "为了应对未来社会对人才的多元化需求，教育体系正在积极探索创新教学模式，以培养学生的批判性思维和解决问题的能力。", translation: "Để đáp ứng nhu cầu đa dạng về nhân tài của xã hội tương lai, hệ thống giáo dục đang tích cực khám phá các mô hình giảng dạy đổi mới, nhằm bồi dưỡng tư duy phản biện và khả năng giải quyết vấn đề của học sinh.", ipa: "wèi le yìng duì wèi lái shè huì duì rén cái de duō yuán huà xū qiú, jiào yù tǐ xì zhèng zài jī jí tàn suǒ chuàng xīn jiào xué mó shì, yǐ péi yǎng xué shēng de pī pàn xìng sī wéi hé jiě jué wèn tí de néng lì.", difficulty: "hard", theme: "education" },
      { id: "zh-education10", text: "教育公平是社会发展的重要基石，确保每个孩子都能享有优质教育资源是实现社会和谐与可持续发展的关键。", translation: "Công bằng giáo dục là nền tảng quan trọng của sự phát triển xã hội, đảm bảo mỗi đứa trẻ đều được hưởng tài nguyên giáo dục chất lượng là chìa khóa để đạt được sự hài hòa xã hội và phát triển bền vững.", ipa: "jiào yù gōng píng shì shè huì fā zhǎn de zhòng yào jī shí, què bǎo měi gè hái zi dōu néng xiǎng yǒu yōu zhì jiào yù zī yuán shì shí xiàn shè huì hé xié yǔ kě chí xù fā zhǎn de guān jiàn.", difficulty: "hard", theme: "education" },
    ],
  },
  {
    id: "zh-weather", name: "天气", nameVi: "Thời tiết", icon: "🌤️",
    sentences: [
      { id: "zh-weather1", text: "今天天气很好。", translation: "Hôm nay thời tiết đẹp.", ipa: "jīn tiān tiān qì hěn hǎo.", difficulty: "easy", theme: "weather" },
      { id: "zh-weather2", text: "外面下雨了。", translation: "Ngoài trời mưa rồi.", ipa: "wài miàn xià yǔ le.", difficulty: "easy", theme: "weather" },
      { id: "zh-weather3", text: "很冷。", translation: "Rất lạnh.", ipa: "hěn lěng.", difficulty: "easy", theme: "weather" },
      { id: "zh-weather4", text: "太阳出来了。", translation: "Mặt trời đã lên.", ipa: "tài yáng chū lái le.", difficulty: "easy", theme: "weather" },
      { id: "zh-weather5", text: "根据天气预报，明天可能会有大风和降雨。", translation: "Theo dự báo thời tiết, ngày mai có thể có gió lớn và mưa.", ipa: "gēn jù tiān qì yù bào, míng tiān kě néng huì yǒu dà fēng hé jiàng yǔ.", difficulty: "medium", theme: "weather" },
      { id: "zh-weather6", text: "夏季通常炎热潮湿，所以要注意防晒和补充水分。", translation: "Mùa hè thường nóng ẩm, vì vậy cần chú ý chống nắng và bổ sung nước.", ipa: "xià jì tōng cháng yán rè cháo shī, suǒ yǐ yào zhù yì fáng shài hé bǔ chōng shuǐ fèn.", difficulty: "medium", theme: "weather" },
      { id: "zh-weather7", text: "气候变化对全球环境造成了深远的影响，包括极端天气事件的增多。", translation: "Biến đổi khí hậu đã gây ra những tác động sâu rộng đến môi trường toàn cầu, bao gồm sự gia tăng các hiện tượng thời tiết cực đoan.", ipa: "qì hòu biàn huà duì quán qiú huán jìng zào chéng le shēn yuǎn de yǐng xiǎng, bāo kuò jí duān tiān qì shì jiàn de zēng duō.", difficulty: "medium", theme: "weather" },
      { id: "zh-weather8", text: "秋天是徒步旅行的好季节，因为天气凉爽，风景宜人。", translation: "Mùa thu là mùa đẹp để đi bộ đường dài, vì thời tiết mát mẻ và phong cảnh dễ chịu.", ipa: "qiū tiān shì tú bù lǚ xíng de hǎo jì jié, yīn wèi tiān qì liáng shuǎng, fēng jǐng yí rén.", difficulty: "medium", theme: "weather" },
      { id: "zh-weather9", text: "专家预测，未来几年全球气温将持续上升，这可能导致海平面进一步升高并对沿海城市构成威胁。", translation: "Các chuyên gia dự đoán rằng nhiệt độ toàn cầu sẽ tiếp tục tăng trong vài năm tới, điều này có thể dẫn đến mực nước biển tiếp tục dâng cao và đe dọa các thành phố ven biển.", ipa: "zhuān jiā yù cè, wèi lái jǐ nián quán qiú qì wēn jiāng chí xù shàng shēng, zhè kě néng dǎo zhì hǎi píng miàn jìn yī bù shēng gāo bìng duì yán hǎi chéng shì gòu chéng wēi xié.", difficulty: "hard", theme: "weather" },
      { id: "zh-weather10", text: "面对日益频繁的自然灾害，国际社会必须加强合作，共同研究应对策略，以减轻气候变化带来的负面影响。", translation: "Đối mặt với các thảm họa tự nhiên ngày càng thường xuyên, cộng đồng quốc tế phải tăng cường hợp tác, cùng nhau nghiên cứu các chiến lược đối phó, nhằm giảm thiểu những tác động tiêu cực do biến đổi khí hậu gây ra.", ipa: "miàn duì rì yì pín fán de zì rán zāi hài, guó jì shè huì bì xū jiā qiáng hé zuò, gòng tóng yán jiū yìng duì cè lüè, yǐ jiǎn qīng qì hòu biàn huà dài lái de fù miàn yǐng xiǎng.", difficulty: "hard", theme: "weather" },
    ],
  },
  {
    id: "zh-culture", name: "文化", nameVi: "Văn hóa", icon: "🎭",
    sentences: [
      { id: "zh-culture1", text: "我喜欢听音乐。", translation: "Tôi thích nghe nhạc.", ipa: "wǒ xǐ huān tīng yīn yuè.", difficulty: "easy", theme: "culture" },
      { id: "zh-culture2", text: "中国有很多传统。", translation: "Trung Quốc có nhiều truyền thống.", ipa: "zhōng guó yǒu hěn duō chuán tǒng.", difficulty: "easy", theme: "culture" },
      { id: "zh-culture3", text: "参观博物馆。", translation: "Tham quan bảo tàng.", ipa: "cān guān bó wù guǎn.", difficulty: "easy", theme: "culture" },
      { id: "zh-culture4", text: "这部电影很精彩。", translation: "Bộ phim này rất hay.", ipa: "zhè bù diàn yǐng hěn jīng cǎi.", difficulty: "easy", theme: "culture" },
      { id: "zh-culture5", text: "京剧是中国特有的传统戏曲艺术形式，历史悠久。", translation: "Kinh kịch là một loại hình nghệ thuật sân khấu truyền thống đặc trưng của Trung Quốc, có lịch sử lâu đời.", ipa: "jīng jù shì zhōng guó tè yǒu de chuán tǒng xì qǔ yì shù xíng shì, lì shǐ yōu jiǔ.", difficulty: "medium", theme: "culture" },
      { id: "zh-culture6", text: "书法是中华文化的重要组成部分，体现了独特的审美情趣。", translation: "Thư pháp là một phần quan trọng của văn hóa Trung Quốc, thể hiện những gu thẩm mỹ độc đáo.", ipa: "shū fǎ shì zhōng huá wén huà de zhòng yào zǔ chéng bù fèn, tǐ xiàn le dú tè de shěn měi qíng qù.", difficulty: "medium", theme: "culture" },
      { id: "zh-culture7", text: "春节是华人最重要的传统节日，家家户户都会团聚庆祝。", translation: "Tết Nguyên Đán là lễ hội truyền thống quan trọng nhất của người Hoa, mọi gia đình đều sum họp để ăn mừng.", ipa: "chūn jié shì huá rén zuì zhòng yào de chuán tǒng jié rì, jiā jiā hù hù dōu huì tuán jù qìng zhù.", difficulty: "medium", theme: "culture" },
      { id: "zh-culture8", text: "通过了解不同国家的文化，我们可以更好地理解世界和促进国际交流。", translation: "Thông qua việc tìm hiểu văn hóa của các quốc gia khác nhau, chúng ta có thể hiểu rõ hơn về thế giới và thúc đẩy giao lưu quốc tế.", ipa: "tōng guò liǎo jiě bù tóng guó jiā de wén huà, wǒ men kě yǐ gèng hǎo dì lǐ jiě shì jiè hé cù jìn guó jì jiāo liú.", difficulty: "medium", theme: "culture" },
      { id: "zh-culture9", text: "中国传统器乐，如古琴和琵琶，不仅拥有丰富的历史底蕴，其独特的音色和演奏技巧也吸引着全球范围内的音乐爱好者。", translation: "Nhạc cụ truyền thống Trung Quốc, như đàn tranh và đàn tỳ bà, không chỉ có nền tảng lịch sử phong phú, mà còn thu hút những người yêu âm nhạc trên toàn cầu bởi âm sắc và kỹ thuật biểu diễn độc đáo của chúng.", ipa: "zhōng guó chuán tǒng qì yuè, rú gǔ qín hé pí pá, bù jǐn yōng yǒu fēng fù de lì shǐ dǐ yùn, qí dú tè de yīn sè hé yǎn zòu jì qiǎo yě xī yǐn zhe quán qiú fàn wéi nèi de yīn yuè ài hào zhě.", difficulty: "hard", theme: "culture" },
      { id: "zh-culture10", text: "随着全球化的深入，文化融合现象日益普遍，不同文明之间的交流与碰撞为新的艺术形式和思想观念提供了肥沃的土壤，同时也带来了文化认同的挑战。", translation: "Với sự hội nhập sâu sắc của toàn cầu hóa, hiện tượng hòa nhập văn hóa ngày càng trở nên phổ biến, giao lưu và va chạm giữa các nền văn minh khác nhau đã cung cấp mảnh đất màu mỡ cho các hình thức nghệ thuật và ý tưởng mới, đồng thời cũng mang lại những thách thức về bản sắc văn hóa.", ipa: "suí zhe quán qiú huà de shēn rù, wén huà róng hé xiàn xiàng rì yì pǔ biàn, bù tóng wén míng zhī jiān de jiāo liú yǔ pèng zhuàng wèi xīn de yì shù xíng shì hé sī xiǎng guān niàn tí gōng le féi wò de tǔ rǎng, tóng shí yě dài lái le wén huà rèn tóng de tiǎo zhàn.", difficulty: "hard", theme: "culture" },
    ],
  },
];

// Language configurations
export const speakingCoachLanguages: Record<string, SpeakingLanguageConfig> = {
  english: {
    lang: "English",
    langCode: "en",
    speechLang: "en-US",
    themes: englishThemes,
  },
  finnish: {
    lang: "Suomi",
    langCode: "fi",
    speechLang: "fi-FI",
    themes: finnishThemes,
  },
  chinese: {
    lang: "中文",
    langCode: "zh",
    speechLang: "zh-CN",
    themes: chineseThemes,
  },
};

// IPA pronunciation tips for common problem sounds
export const pronunciationTips: Record<string, { sound: string; tip: string; tipVi: string }> = {
  // English
  "/θ/": { sound: "th", tip: "Place tongue between teeth and blow air gently", tipVi: "Đặt lưỡi giữa hai hàm răng và thổi nhẹ" },
  "/ð/": { sound: "th (voiced)", tip: "Same as /θ/ but add voice vibration", tipVi: "Giống /θ/ nhưng thêm rung thanh quản" },
  "/ɪ/": { sound: "short i", tip: "Relax lips, tongue slightly lower than 'ee'", tipVi: "Thả lỏng môi, lưỡi thấp hơn 'i' dài" },
  "/æ/": { sound: "a (cat)", tip: "Open mouth wide, tongue low and flat", tipVi: "Mở rộng miệng, lưỡi thấp và phẳng" },
  "/ɑː/": { sound: "ah", tip: "Open mouth wide, tongue low at the back", tipVi: "Mở miệng rộng, lưỡi thấp ở phía sau" },
  "/ɜː/": { sound: "er", tip: "Lips neutral, tongue mid-central", tipVi: "Môi tự nhiên, lưỡi ở giữa" },
  "/ʃ/": { sound: "sh", tip: "Round lips slightly, tongue close to palate", tipVi: "Tròn môi nhẹ, lưỡi gần vòm miệng" },
  "/ʒ/": { sound: "zh (vision)", tip: "Like /ʃ/ but with voice vibration", tipVi: "Giống /ʃ/ nhưng thêm rung thanh quản" },
  // Finnish
  "/y/": { sound: "y (Finnish)", tip: "Like 'ee' but with rounded lips", tipVi: "Như 'i' nhưng tròn môi" },
  "/ø/": { sound: "ö", tip: "Like 'e' but with rounded lips", tipVi: "Như 'ê' nhưng tròn môi" },
  "/æ/fi": { sound: "ä", tip: "Like English 'a' in 'cat', open and front", tipVi: "Như 'e' mở rộng, âm trước" },
  // Chinese tones
  "1st": { sound: "ˉ high level", tip: "Keep voice high and steady, like singing a high note", tipVi: "Giữ giọng cao và đều, như hát nốt cao" },
  "2nd": { sound: "ˊ rising", tip: "Voice rises from mid to high, like asking 'huh?'", tipVi: "Giọng đi từ trung lên cao, như hỏi 'hả?'" },
  "3rd": { sound: "ˇ dipping", tip: "Voice drops then rises, like saying 'well...'", tipVi: "Giọng hạ rồi nâng, như nói 'ừm...'" },
  "4th": { sound: "ˋ falling", tip: "Voice drops sharply, like giving a command", tipVi: "Giọng hạ mạnh, như ra lệnh" },
};
