/**
 * @file culture.ts
 * @description Japanese culture and study-abroad notes written for Vietnamese
 *  learners, bilingual Vietnamese + English.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaCultureTopic {
  id: string;
  icon: string;
  title_vi: string;
  title_en: string;
  body_vi: string[];
  body_en: string[];
  phrases?: Array<{ jp: string; romaji: string; vi: string; en: string }>;
}

export const JA_CULTURE: JaCultureTopic[] = [
  {
    id: "cul-etiquette", icon: "🙇",
    title_vi: "Nghi thức xã giao hằng ngày",
    title_en: "Everyday etiquette",
    body_vi: [
      "Chào bằng cách gật đầu hoặc cúi người nhẹ khoảng 15 độ là đủ trong sinh hoạt thường ngày; cúi 30 độ dùng khi xin lỗi hoặc cảm ơn trang trọng.",
      "Trước khi ăn nói いただきます, ăn xong nói ごちそうさまでした. Đây là câu bắt buộc trong gia đình và ký túc xá.",
      "Trên tàu điện không nói chuyện điện thoại, để chế độ im lặng và không ăn uống. Xếp hàng theo vạch trên sân ga.",
      "Khi vào nhà, cởi giày và xoay mũi giày hướng ra cửa. Nhận đồ bằng hai tay, đặc biệt là danh thiếp.",
    ],
    body_en: [
      "A nod or a light 15-degree bow is enough for daily greetings; a 30-degree bow is for formal thanks or apologies.",
      "Say いただきます before eating and ごちそうさまでした afterwards - expected at home and in dormitories.",
      "On trains, keep phones silent, avoid calls and do not eat. Queue along the platform markings.",
      "Take your shoes off indoors and turn them to face the door. Receive things, especially business cards, with both hands.",
    ],
    phrases: [
      { jp: "失礼します。", romaji: "Shitsurei shimasu.", vi: "Cho phép tôi (khi vào hoặc rời phòng).", en: "Excuse me (entering or leaving a room)." },
      { jp: "お先に失礼します。", romaji: "Osaki ni shitsurei shimasu.", vi: "Tôi xin phép về trước.", en: "Excuse me for leaving before you." },
      { jp: "お世話になっております。", romaji: "Osewa ni natte orimasu.", vi: "Cảm ơn anh/chị đã luôn giúp đỡ.", en: "Thank you for your continued support." },
    ],
  },
  {
    id: "cul-seasons", icon: "🌸",
    title_vi: "Bốn mùa và lễ hội",
    title_en: "Seasons and festivals",
    body_vi: [
      "Xuân (3-5): hoa anh đào, mùa 花見. Năm học và năm tài chính đều bắt đầu tháng 4.",
      "Hè (6-8): mùa mưa 梅雨 tháng 6, sau đó là lễ hội 夏祭り, bắn pháo hoa 花火大会 và kỳ nghỉ お盆 giữa tháng 8.",
      "Thu (9-11): lá đỏ 紅葉, mùa thi và mùa văn hoá học đường 文化祭.",
      "Đông (12-2): 年末年始 với lễ đón năm mới, thăm đền 初詣 và món ăn おせち.",
    ],
    body_en: [
      "Spring (Mar-May): cherry blossoms and 花見 picnics. The school and fiscal year both start in April.",
      "Summer (Jun-Aug): the 梅雨 rainy season in June, then 夏祭り festivals, 花火大会 fireworks and the お盆 holiday in mid-August.",
      "Autumn (Sep-Nov): 紅葉 autumn leaves, exam season and school culture festivals.",
      "Winter (Dec-Feb): the 年末年始 new-year period with 初詣 shrine visits and おせち food.",
    ],
    phrases: [
      { jp: "お花見に行きませんか。", romaji: "Ohanami ni ikimasen ka.", vi: "Đi ngắm hoa anh đào không?", en: "Shall we go cherry-blossom viewing?" },
      { jp: "あけましておめでとうございます。", romaji: "Akemashite omedetō gozaimasu.", vi: "Chúc mừng năm mới.", en: "Happy New Year." },
    ],
  },
  {
    id: "cul-food", icon: "🍱",
    title_vi: "Ẩm thực và cách ăn uống",
    title_en: "Food and dining",
    body_vi: [
      "Cơm phần 定食 gồm cơm, canh miso, món chính và rau muối - lựa chọn cân bằng và rẻ cho sinh viên.",
      "Không cắm đũa dựng vào bát cơm và không truyền đồ ăn từ đũa sang đũa, vì liên quan tới nghi thức tang lễ.",
      "Nhà hàng thường không có thói quen tiền tip. Nhiều nơi trả tiền tại quầy khi ra.",
      "Món vùng miền: Osaka có たこ焼き, Hokkaido có 海鮮, Nagoya có 味噌カツ, Fukuoka có 豚骨ラーメン.",
    ],
    body_en: [
      "A 定食 set of rice, miso soup, a main dish and pickles is a balanced, cheap student meal.",
      "Never stand chopsticks upright in rice or pass food chopstick to chopstick - both belong to funeral rites.",
      "Tipping is not customary. In many places you pay at the counter on the way out.",
      "Regional dishes: たこ焼き in Osaka, seafood in Hokkaido, 味噌カツ in Nagoya, 豚骨ラーメン in Fukuoka.",
    ],
    phrases: [
      { jp: "おすすめは何ですか。", romaji: "Osusume wa nan desu ka.", vi: "Món nào được gợi ý?", en: "What do you recommend?" },
      { jp: "アレルギーがあります。", romaji: "Arerugī ga arimasu.", vi: "Tôi bị dị ứng.", en: "I have an allergy." },
    ],
  },
  {
    id: "cul-school", icon: "🎒",
    title_vi: "Học tập tại Nhật",
    title_en: "Studying in Japan",
    body_vi: [
      "Năm học bắt đầu tháng 4, một số chương trình quốc tế nhập học tháng 9 hoặc tháng 10.",
      "Sinh viên tự dọn lớp 掃除 và tham gia câu lạc bộ 部活 - đây cũng là nơi kết bạn nhanh nhất.",
      "Trường coi trọng đúng giờ và báo trước khi vắng. Nộp muộn thường bị trừ điểm rõ ràng.",
      "Thư viện và phòng tự học mở tới tối; nhiều trường có phòng hỗ trợ tiếng Nhật miễn phí cho du học sinh.",
    ],
    body_en: [
      "The academic year starts in April; some international programmes admit in September or October.",
      "Students clean their own classrooms and join 部活 clubs, which is the fastest way to make friends.",
      "Punctuality and advance notice of absence matter; late submissions are usually penalised clearly.",
      "Libraries and study rooms stay open late, and many campuses offer free Japanese support desks.",
    ],
  },
  {
    id: "cul-work", icon: "🏢",
    title_vi: "Baito, visa và làm việc",
    title_en: "Part-time work, visa and jobs",
    body_vi: [
      "Du học sinh cần giấy 資格外活動許可 mới được làm thêm, giới hạn 28 giờ mỗi tuần (kỳ nghỉ dài có thể tới 40 giờ).",
      "Công việc phổ biến: konbini, nhà hàng, dọn khách sạn, phân loại hàng, trợ giảng tiếng Việt.",
      "Khi ứng tuyển, chuẩn bị 履歴書 viết tay hoặc in rõ ràng và tập trả lời câu hỏi về lịch làm việc bằng kính ngữ.",
      "Việc đúng giờ, báo nghỉ sớm và nhớ câu いらっしゃいませ / ありがとうございました quan trọng hơn tiếng Nhật hoàn hảo.",
    ],
    body_en: [
      "Students need the 資格外活動許可 permit to work, capped at 28 hours a week (up to 40 during long holidays).",
      "Common jobs: convenience stores, restaurants, hotel cleaning, warehouse sorting, Vietnamese tutoring.",
      "Prepare a clean 履歴書 CV and practise answering shift questions in polite language.",
      "Punctuality, early notice of absence and the standard service phrases matter more than perfect Japanese.",
    ],
    phrases: [
      { jp: "アルバイトの募集はありますか。", romaji: "Arubaito no boshū wa arimasu ka.", vi: "Ở đây có tuyển việc làm thêm không?", en: "Are you hiring part-time staff?" },
      { jp: "週に三日、働けます。", romaji: "Shū ni mikka, hatarakemasu.", vi: "Tôi làm được ba ngày một tuần.", en: "I can work three days a week." },
    ],
  },
  {
    id: "cul-mext", icon: "🎓",
    title_vi: "Học bổng MEXT và các nguồn hỗ trợ",
    title_en: "MEXT scholarships and funding",
    body_vi: [
      "MEXT (文部科学省) có hai đường: qua Đại sứ quán Nhật tại Việt Nam và qua trường đại học đề cử (University Recommendation).",
      "Hồ sơ thường gồm bảng điểm, kế hoạch nghiên cứu, thư giới thiệu, chứng chỉ tiếng Nhật hoặc tiếng Anh và giấy khám sức khoẻ.",
      "Đường Đại sứ quán thường mở tháng 4-5 cho kỳ nhập học năm sau; hãy chuẩn bị kế hoạch nghiên cứu trước 3-6 tháng.",
      "Nguồn khác: JASSO, học bổng của từng trường, quỹ tư nhân như Rotary Yoneyama, và miễn giảm học phí theo hồ sơ thu nhập.",
    ],
    body_en: [
      "MEXT has two routes: through the Japanese embassy in Vietnam and through university recommendation.",
      "Applications usually need transcripts, a research plan, references, a Japanese or English certificate and a health form.",
      "The embassy route typically opens in April-May for the following intake, so draft the research plan 3-6 months ahead.",
      "Other funding: JASSO, university scholarships, private foundations such as Rotary Yoneyama, and income-based tuition waivers.",
    ],
  },
  {
    id: "cul-life", icon: "🏠",
    title_vi: "Sinh hoạt: rác, tàu, giấy tờ",
    title_en: "Daily life: rubbish, trains, paperwork",
    body_vi: [
      "Rác phải phân loại thành cháy được, không cháy, chai lọ, giấy. Mỗi loại có ngày thu riêng, thường bỏ trước 8 giờ sáng.",
      "Khi tới Nhật cần làm 住民登録 tại toà thị chính, đăng ký bảo hiểm y tế 国民健康保険 và mở tài khoản ngân hàng.",
      "Tàu điện đúng giờ tuyệt đối; nếu tàu trễ, ga phát giấy 遅延証明書 để nộp cho trường hoặc công ty.",
      "Giữ 在留カード bên người mọi lúc và cập nhật địa chỉ trong 14 ngày sau khi chuyển nhà.",
    ],
    body_en: [
      "Rubbish is separated into burnable, non-burnable, bottles and paper, each with its own collection day, usually before 8 a.m.",
      "On arrival, register your residence at city hall, join 国民健康保険 health insurance and open a bank account.",
      "Trains run exactly on time; if one is late the station issues a 遅延証明書 delay certificate for school or work.",
      "Carry your 在留カード at all times and update your address within 14 days of moving.",
    ],
  },
  {
    id: "cul-vn", icon: "🇻🇳",
    title_vi: "Lưu ý riêng cho người Việt",
    title_en: "Notes for Vietnamese learners",
    body_vi: [
      "Phát âm: chú ý trường âm (おう, えい), âm ngắt っ và âm ん - người Việt hay đọc ngắn nên nghĩa bị đổi (びよういん vs びょういん).",
      "Ngữ pháp: tiếng Việt không đổi dạng động từ nên dễ quên chia thể て/た; hãy luyện theo cụm câu thay vì từ đơn.",
      "Giao tiếp: người Nhật ít nói 'không' trực tiếp. Câu ちょっと難しいですね thường là lời từ chối nhẹ.",
      "Ở lớp và nơi làm, việc báo cáo sớm khi có vấn đề 報告・連絡・相談 được đánh giá cao hơn là tự xử lý im lặng.",
    ],
    body_en: [
      "Pronunciation: watch long vowels (おう, えい), the small っ stop and ん - shortening them changes meaning (びよういん vs びょういん).",
      "Grammar: Vietnamese does not conjugate, so the て/た forms need drilling; practise whole phrases rather than single words.",
      "Communication: a direct 'no' is rare. ちょっと難しいですね is usually a soft refusal.",
      "At school and work, reporting problems early (報告・連絡・相談) is valued far more than solving them silently.",
    ],
  },
];
