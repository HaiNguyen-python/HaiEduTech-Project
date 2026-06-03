// Second expansion pack for Speaking Coach – adds many more themes & sentences
// for all 4 languages (English, Chinese, Vietnamese, Finnish).
import type { SpeakingTheme } from "./speakingCoachData";

// ============================ ENGLISH ============================
export const englishExtraThemes2: SpeakingTheme[] = [
  {
    id: "en-tech", name: "Technology & Internet", nameVi: "Công nghệ & Internet", icon: "💻",
    sentences: [
      { id: "en-tc1", text: "My phone battery is almost dead.", translation: "Điện thoại tôi sắp hết pin.", difficulty: "easy", theme: "tech" },
      { id: "en-tc2", text: "Could you send me the file by email?", translation: "Bạn gửi file qua email cho tôi nhé?", difficulty: "easy", theme: "tech" },
      { id: "en-tc3", text: "The Wi-Fi connection here is really slow.", translation: "Wi-Fi ở đây thật sự rất chậm.", difficulty: "medium", theme: "tech" },
      { id: "en-tc4", text: "I think we should back up our data regularly.", translation: "Tôi nghĩ chúng ta nên sao lưu dữ liệu thường xuyên.", difficulty: "medium", theme: "tech" },
      { id: "en-tc5", text: "Artificial intelligence is changing the way we work.", translation: "Trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc.", difficulty: "hard", theme: "tech" },
      { id: "en-tc6", text: "Have you tried the new update for this app?", translation: "Bạn đã thử bản cập nhật mới của ứng dụng này chưa?", difficulty: "medium", theme: "tech" },
      { id: "en-tc7", text: "Online learning has become essential in modern education.", translation: "Học trực tuyến đã trở thành thiết yếu trong giáo dục hiện đại.", difficulty: "hard", theme: "tech" },
    ],
  },
  {
    id: "en-environment", name: "Environment & Nature", nameVi: "Môi trường & Thiên nhiên", icon: "🌳",
    sentences: [
      { id: "en-ev1", text: "We need to recycle more plastic.", translation: "Chúng ta cần tái chế nhiều nhựa hơn.", difficulty: "easy", theme: "environment" },
      { id: "en-ev2", text: "Climate change affects everyone on the planet.", translation: "Biến đổi khí hậu ảnh hưởng đến mọi người trên hành tinh.", difficulty: "medium", theme: "environment" },
      { id: "en-ev3", text: "Riding a bike is a great way to reduce pollution.", translation: "Đi xe đạp là cách tuyệt vời để giảm ô nhiễm.", difficulty: "medium", theme: "environment" },
      { id: "en-ev4", text: "Renewable energy sources will replace fossil fuels in the future.", translation: "Các nguồn năng lượng tái tạo sẽ thay thế nhiên liệu hóa thạch trong tương lai.", difficulty: "hard", theme: "environment" },
      { id: "en-ev5", text: "Forests provide oxygen and protect biodiversity.", translation: "Rừng cung cấp oxy và bảo vệ đa dạng sinh học.", difficulty: "hard", theme: "environment" },
      { id: "en-ev6", text: "I always carry a reusable water bottle.", translation: "Tôi luôn mang theo bình nước có thể tái sử dụng.", difficulty: "easy", theme: "environment" },
    ],
  },
  {
    id: "en-education", name: "Education & Study", nameVi: "Giáo dục & Học tập", icon: "🎓",
    sentences: [
      { id: "en-ed1", text: "I am currently studying business administration.", translation: "Hiện tôi đang học quản trị kinh doanh.", difficulty: "easy", theme: "education" },
      { id: "en-ed2", text: "Group projects help students learn teamwork.", translation: "Bài tập nhóm giúp sinh viên học làm việc nhóm.", difficulty: "medium", theme: "education" },
      { id: "en-ed3", text: "Studying abroad broadens your perspective on the world.", translation: "Du học mở rộng tầm nhìn về thế giới của bạn.", difficulty: "hard", theme: "education" },
      { id: "en-ed4", text: "Critical thinking is a vital skill in higher education.", translation: "Tư duy phản biện là kỹ năng quan trọng trong giáo dục đại học.", difficulty: "hard", theme: "education" },
      { id: "en-ed5", text: "I prefer to study in the morning when I feel fresh.", translation: "Tôi thích học vào buổi sáng khi tỉnh táo.", difficulty: "medium", theme: "education" },
      { id: "en-ed6", text: "The library is open until midnight during exam week.", translation: "Thư viện mở cửa đến nửa đêm trong tuần thi.", difficulty: "medium", theme: "education" },
    ],
  },
  {
    id: "en-emergency", name: "Emergency & Safety", nameVi: "Khẩn cấp & An toàn", icon: "🚨",
    sentences: [
      { id: "en-em1", text: "Please call an ambulance immediately!", translation: "Hãy gọi xe cứu thương ngay lập tức!", difficulty: "easy", theme: "emergency" },
      { id: "en-em2", text: "Where is the nearest emergency exit?", translation: "Lối thoát hiểm gần nhất ở đâu?", difficulty: "easy", theme: "emergency" },
      { id: "en-em3", text: "I lost my passport and credit cards.", translation: "Tôi mất hộ chiếu và thẻ tín dụng.", difficulty: "medium", theme: "emergency" },
      { id: "en-em4", text: "There has been an accident, we need help.", translation: "Có một vụ tai nạn, chúng tôi cần giúp đỡ.", difficulty: "medium", theme: "emergency" },
      { id: "en-em5", text: "Stay calm and follow the safety instructions carefully.", translation: "Hãy bình tĩnh và làm theo hướng dẫn an toàn cẩn thận.", difficulty: "hard", theme: "emergency" },
    ],
  },
  {
    id: "en-culture", name: "Culture & Festivals", nameVi: "Văn hoá & Lễ hội", icon: "🎭",
    sentences: [
      { id: "en-cu1", text: "Tet is the most important holiday in Vietnam.", translation: "Tết là ngày lễ quan trọng nhất ở Việt Nam.", difficulty: "easy", theme: "culture" },
      { id: "en-cu2", text: "Different cultures have different ways of greeting.", translation: "Các nền văn hoá khác nhau có cách chào khác nhau.", difficulty: "medium", theme: "culture" },
      { id: "en-cu3", text: "I really enjoy visiting historical museums abroad.", translation: "Tôi rất thích đi thăm bảo tàng lịch sử ở nước ngoài.", difficulty: "medium", theme: "culture" },
      { id: "en-cu4", text: "Traditional music reflects the soul of a nation.", translation: "Âm nhạc truyền thống phản ánh tâm hồn của một dân tộc.", difficulty: "hard", theme: "culture" },
      { id: "en-cu5", text: "Respecting local customs is important when you travel.", translation: "Tôn trọng phong tục địa phương rất quan trọng khi du lịch.", difficulty: "hard", theme: "culture" },
    ],
  },
];

// ============================ CHINESE ============================
export const chineseExtraThemes2: SpeakingTheme[] = [
  {
    id: "zh-greetings", name: "问候", nameVi: "Chào hỏi", icon: "👋",
    sentences: [
      { id: "zh-gr1", text: "你好，很高兴认识你。", translation: "Xin chào, rất vui được làm quen.", ipa: "Nǐ hǎo, hěn gāoxìng rènshi nǐ.", difficulty: "easy", theme: "greetings" },
      { id: "zh-gr2", text: "最近怎么样？", translation: "Dạo này thế nào?", ipa: "Zuìjìn zěnmeyàng?", difficulty: "easy", theme: "greetings" },
      { id: "zh-gr3", text: "好久不见！", translation: "Lâu rồi không gặp!", ipa: "Hǎojiǔ bù jiàn!", difficulty: "easy", theme: "greetings" },
      { id: "zh-gr4", text: "请问您贵姓？", translation: "Xin hỏi quý danh ngài là gì?", ipa: "Qǐngwèn nín guìxìng?", difficulty: "medium", theme: "greetings" },
      { id: "zh-gr5", text: "祝您一切顺利！", translation: "Chúc ngài mọi điều thuận lợi!", ipa: "Zhù nín yīqiè shùnlì!", difficulty: "medium", theme: "greetings" },
    ],
  },
  {
    id: "zh-travel", name: "旅游", nameVi: "Du lịch", icon: "✈️",
    sentences: [
      { id: "zh-tr1", text: "请问火车站在哪里？", translation: "Xin hỏi nhà ga ở đâu?", ipa: "Qǐngwèn huǒchēzhàn zài nǎlǐ?", difficulty: "easy", theme: "travel" },
      { id: "zh-tr2", text: "我想买一张去北京的票。", translation: "Tôi muốn mua một vé đi Bắc Kinh.", ipa: "Wǒ xiǎng mǎi yī zhāng qù Běijīng de piào.", difficulty: "medium", theme: "travel" },
      { id: "zh-tr3", text: "这附近有酒店吗？", translation: "Gần đây có khách sạn không?", ipa: "Zhè fùjìn yǒu jiǔdiàn ma?", difficulty: "medium", theme: "travel" },
      { id: "zh-tr4", text: "我对中国文化非常感兴趣。", translation: "Tôi rất quan tâm đến văn hoá Trung Quốc.", ipa: "Wǒ duì Zhōngguó wénhuà fēicháng gǎn xìngqù.", difficulty: "hard", theme: "travel" },
      { id: "zh-tr5", text: "明天的天气怎么样？", translation: "Thời tiết ngày mai thế nào?", ipa: "Míngtiān de tiānqì zěnmeyàng?", difficulty: "easy", theme: "travel" },
    ],
  },
  {
    id: "zh-work", name: "工作", nameVi: "Công việc", icon: "💼",
    sentences: [
      { id: "zh-wk1", text: "我是一名程序员。", translation: "Tôi là lập trình viên.", ipa: "Wǒ shì yī míng chéngxùyuán.", difficulty: "easy", theme: "work" },
      { id: "zh-wk2", text: "今天我们要开会。", translation: "Hôm nay chúng tôi có cuộc họp.", ipa: "Jīntiān wǒmen yào kāihuì.", difficulty: "easy", theme: "work" },
      { id: "zh-wk3", text: "请把报告发给我。", translation: "Làm ơn gửi báo cáo cho tôi.", ipa: "Qǐng bǎ bàogào fā gěi wǒ.", difficulty: "medium", theme: "work" },
      { id: "zh-wk4", text: "这个项目的截止日期是下周。", translation: "Hạn chót của dự án này là tuần sau.", ipa: "Zhège xiàngmù de jiézhǐ rìqī shì xià zhōu.", difficulty: "hard", theme: "work" },
      { id: "zh-wk5", text: "我希望以后能升职。", translation: "Tôi hy vọng sau này có thể được thăng chức.", ipa: "Wǒ xīwàng yǐhòu néng shēngzhí.", difficulty: "hard", theme: "work" },
    ],
  },
  {
    id: "zh-family", name: "家庭", nameVi: "Gia đình", icon: "👨‍👩‍👧",
    sentences: [
      { id: "zh-fm1", text: "我家有四口人。", translation: "Nhà tôi có bốn người.", ipa: "Wǒ jiā yǒu sì kǒu rén.", difficulty: "easy", theme: "family" },
      { id: "zh-fm2", text: "我有一个哥哥和一个妹妹。", translation: "Tôi có một anh trai và một em gái.", ipa: "Wǒ yǒu yīgè gēge hé yīgè mèimei.", difficulty: "easy", theme: "family" },
      { id: "zh-fm3", text: "周末我们全家一起吃饭。", translation: "Cuối tuần cả nhà tôi ăn cơm cùng nhau.", ipa: "Zhōumò wǒmen quánjiā yīqǐ chīfàn.", difficulty: "medium", theme: "family" },
      { id: "zh-fm4", text: "父母的爱是最伟大的。", translation: "Tình yêu của cha mẹ là vĩ đại nhất.", ipa: "Fùmǔ de ài shì zuì wěidà de.", difficulty: "hard", theme: "family" },
    ],
  },
  {
    id: "zh-tech", name: "科技", nameVi: "Công nghệ", icon: "💻",
    sentences: [
      { id: "zh-tc1", text: "我的手机没电了。", translation: "Điện thoại của tôi hết pin rồi.", ipa: "Wǒ de shǒujī méi diàn le.", difficulty: "easy", theme: "tech" },
      { id: "zh-tc2", text: "这里的网速很慢。", translation: "Tốc độ mạng ở đây rất chậm.", ipa: "Zhèlǐ de wǎngsù hěn màn.", difficulty: "medium", theme: "tech" },
      { id: "zh-tc3", text: "人工智能正在改变我们的生活。", translation: "Trí tuệ nhân tạo đang thay đổi cuộc sống của chúng ta.", ipa: "Réngōng zhìnéng zhèngzài gǎibiàn wǒmen de shēnghuó.", difficulty: "hard", theme: "tech" },
    ],
  },
];

// ============================ VIETNAMESE ============================
export const vietnameseExtraThemes2: SpeakingTheme[] = [
  {
    id: "vi-greetings", name: "Chào hỏi", nameVi: "Chào hỏi", icon: "👋",
    sentences: [
      { id: "vi-gr1", text: "Xin chào, rất vui được gặp bạn.", translation: "Hello, nice to meet you.", difficulty: "easy", theme: "greetings" },
      { id: "vi-gr2", text: "Bạn dạo này thế nào?", translation: "How have you been lately?", difficulty: "easy", theme: "greetings" },
      { id: "vi-gr3", text: "Lâu rồi không gặp, bạn vẫn khoẻ chứ?", translation: "Long time no see, are you still well?", difficulty: "medium", theme: "greetings" },
      { id: "vi-gr4", text: "Cho tôi tự giới thiệu một chút.", translation: "Let me introduce myself briefly.", difficulty: "medium", theme: "greetings" },
    ],
  },
  {
    id: "vi-travel", name: "Du lịch", nameVi: "Du lịch", icon: "✈️",
    sentences: [
      { id: "vi-tr1", text: "Cho tôi hỏi đường ra ga tàu.", translation: "Could you tell me the way to the train station?", difficulty: "easy", theme: "travel" },
      { id: "vi-tr2", text: "Khách sạn này có wifi miễn phí không?", translation: "Does this hotel have free Wi-Fi?", difficulty: "easy", theme: "travel" },
      { id: "vi-tr3", text: "Tôi muốn đặt vé khứ hồi đi Đà Nẵng.", translation: "I want to book a round-trip ticket to Da Nang.", difficulty: "medium", theme: "travel" },
      { id: "vi-tr4", text: "Bạn có thể gợi ý vài địa điểm du lịch nổi tiếng không?", translation: "Could you suggest some famous tourist spots?", difficulty: "hard", theme: "travel" },
    ],
  },
  {
    id: "vi-work", name: "Công việc", nameVi: "Công việc", icon: "💼",
    sentences: [
      { id: "vi-wk1", text: "Tôi làm kỹ sư phần mềm.", translation: "I work as a software engineer.", difficulty: "easy", theme: "work" },
      { id: "vi-wk2", text: "Hôm nay chúng ta có cuộc họp lúc 2 giờ.", translation: "We have a meeting at 2 today.", difficulty: "easy", theme: "work" },
      { id: "vi-wk3", text: "Dự án này phải hoàn thành trước cuối tháng.", translation: "This project must be finished before the end of the month.", difficulty: "medium", theme: "work" },
      { id: "vi-wk4", text: "Tôi mong sẽ được tăng lương trong năm tới.", translation: "I hope to get a raise next year.", difficulty: "hard", theme: "work" },
    ],
  },
  {
    id: "vi-tech", name: "Công nghệ", nameVi: "Công nghệ", icon: "💻",
    sentences: [
      { id: "vi-tc1", text: "Điện thoại của tôi sắp hết pin.", translation: "My phone is almost out of battery.", difficulty: "easy", theme: "tech" },
      { id: "vi-tc2", text: "Mạng ở đây hơi yếu.", translation: "The Wi-Fi here is a bit weak.", difficulty: "easy", theme: "tech" },
      { id: "vi-tc3", text: "Trí tuệ nhân tạo đang phát triển rất nhanh.", translation: "AI is developing very fast.", difficulty: "hard", theme: "tech" },
    ],
  },
  {
    id: "vi-culture", name: "Văn hoá Việt", nameVi: "Văn hoá Việt", icon: "🎎",
    sentences: [
      { id: "vi-cu1", text: "Tết là dịp lễ quan trọng nhất trong năm.", translation: "Tet is the most important holiday of the year.", difficulty: "easy", theme: "culture" },
      { id: "vi-cu2", text: "Phở là món ăn nổi tiếng của Việt Nam.", translation: "Pho is a famous Vietnamese dish.", difficulty: "easy", theme: "culture" },
      { id: "vi-cu3", text: "Áo dài là trang phục truyền thống thanh lịch.", translation: "Ao dai is an elegant traditional outfit.", difficulty: "medium", theme: "culture" },
      { id: "vi-cu4", text: "Người Việt rất coi trọng tình cảm gia đình.", translation: "Vietnamese people value family bonds deeply.", difficulty: "hard", theme: "culture" },
    ],
  },
];

// ============================ FINNISH ============================
export const finnishExtraThemes2: SpeakingTheme[] = [
  {
    id: "fi-greetings-v2", name: "Tervehdykset (jatko)", nameVi: "Chào hỏi (tiếp)", icon: "👋", level: "A2",
    sentences: [
      { id: "fi-gr-v1", text: "Hei, mukava tavata sinut.", translation: "Chào bạn, rất vui được gặp bạn.", difficulty: "easy", theme: "greetings" },
      { id: "fi-gr-v2", text: "Mitä sinulle kuuluu tänään?", translation: "Hôm nay bạn thế nào?", difficulty: "easy", theme: "greetings" },
      { id: "fi-gr-v3", text: "Pitkästä aikaa!", translation: "Lâu rồi không gặp!", difficulty: "easy", theme: "greetings" },
      { id: "fi-gr-v4", text: "Saanko esittäytyä lyhyesti?", translation: "Tôi có thể tự giới thiệu ngắn gọn không?", difficulty: "medium", theme: "greetings" },
      { id: "fi-gr-v5", text: "Toivottavasti kaikki on hyvin perheessäsi.", translation: "Mong là mọi việc trong gia đình bạn đều ổn.", difficulty: "hard", theme: "greetings" },
    ],
  },
  {
    id: "fi-travel-v2", name: "Matkustaminen", nameVi: "Du lịch", icon: "✈️", level: "A2",
    sentences: [
      { id: "fi-tr-v1", text: "Missä on rautatieasema?", translation: "Nhà ga tàu ở đâu?", difficulty: "easy", theme: "travel" },
      { id: "fi-tr-v2", text: "Haluaisin ostaa lipun Helsinkiin.", translation: "Tôi muốn mua vé đi Helsinki.", difficulty: "medium", theme: "travel" },
      { id: "fi-tr-v3", text: "Onko täällä lähellä hotellia?", translation: "Có khách sạn gần đây không?", difficulty: "medium", theme: "travel" },
      { id: "fi-tr-v4", text: "Olen kiinnostunut suomalaisesta kulttuurista.", translation: "Tôi quan tâm đến văn hoá Phần Lan.", difficulty: "hard", theme: "travel" },
      { id: "fi-tr-v5", text: "Millainen sää on huomenna?", translation: "Mai trời thế nào?", difficulty: "easy", theme: "travel" },
    ],
  },
  {
    id: "fi-work-v2", name: "Työ", nameVi: "Công việc", icon: "💼", level: "A2",
    sentences: [
      { id: "fi-wk-v1", text: "Olen ohjelmistosuunnittelija.", translation: "Tôi là kỹ sư phần mềm.", difficulty: "easy", theme: "work" },
      { id: "fi-wk-v2", text: "Tänään meillä on kokous kello kaksi.", translation: "Hôm nay chúng tôi họp lúc 2 giờ.", difficulty: "easy", theme: "work" },
      { id: "fi-wk-v3", text: "Voitko lähettää raportin sähköpostilla?", translation: "Bạn gửi báo cáo qua email được không?", difficulty: "medium", theme: "work" },
      { id: "fi-wk-v4", text: "Tämän projektin määräaika on ensi viikolla.", translation: "Hạn của dự án này là tuần sau.", difficulty: "hard", theme: "work" },
    ],
  },
  {
    id: "fi-family-v2", name: "Perhe", nameVi: "Gia đình", icon: "👨‍👩‍👧", level: "A2",
    sentences: [
      { id: "fi-fm-v1", text: "Perheessäni on neljä jäsentä.", translation: "Gia đình tôi có bốn người.", difficulty: "easy", theme: "family" },
      { id: "fi-fm-v2", text: "Minulla on yksi sisko ja yksi veli.", translation: "Tôi có một chị/em gái và một anh/em trai.", difficulty: "easy", theme: "family" },
      { id: "fi-fm-v3", text: "Vanhempani asuvat Tampereella.", translation: "Bố mẹ tôi sống ở Tampere.", difficulty: "medium", theme: "family" },
      { id: "fi-fm-v4", text: "Vietämme paljon aikaa yhdessä viikonloppuisin.", translation: "Chúng tôi dành nhiều thời gian bên nhau vào cuối tuần.", difficulty: "hard", theme: "family" },
    ],
  },
  {
    id: "fi-tech-v2", name: "Teknologia", nameVi: "Công nghệ", icon: "💻", level: "A2",
    sentences: [
      { id: "fi-tc-v1", text: "Puhelimeni akku on melkein loppu.", translation: "Điện thoại tôi sắp hết pin.", difficulty: "easy", theme: "tech" },
      { id: "fi-tc-v2", text: "Wifi-yhteys on todella hidas täällä.", translation: "Wi-Fi ở đây rất chậm.", difficulty: "medium", theme: "tech" },
      { id: "fi-tc-v3", text: "Tekoäly muuttaa työelämää nopeasti.", translation: "AI đang thay đổi nhanh chóng đời sống công việc.", difficulty: "hard", theme: "tech" },
    ],
  },
  {
    id: "fi-culture-v2", name: "Suomalainen kulttuuri", nameVi: "Văn hoá Phần Lan", icon: "🇫🇮", level: "A2",
    sentences: [
      { id: "fi-cu-v1", text: "Sauna on tärkeä osa suomalaista elämää.", translation: "Sauna là phần quan trọng của đời sống Phần Lan.", difficulty: "medium", theme: "culture" },
      { id: "fi-cu-v2", text: "Joulu on rauhallinen perhejuhla Suomessa.", translation: "Giáng sinh ở Phần Lan là dịp lễ gia đình yên bình.", difficulty: "medium", theme: "culture" },
      { id: "fi-cu-v3", text: "Kesäloma on monille suomalaisille tärkein hetki vuodessa.", translation: "Kỳ nghỉ hè là khoảnh khắc quan trọng nhất trong năm với nhiều người Phần Lan.", difficulty: "hard", theme: "culture" },
    ],
  },
];
