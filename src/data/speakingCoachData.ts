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
