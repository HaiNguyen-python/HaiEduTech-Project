/**
 * @file swedishSampleEssaysExpansion.ts
 * @description Model answers (bài viết mẫu) for every Swedish Writing Lab prompt
 *              that previously had no sample. Same shape as SWEDISH_SAMPLE_ESSAYS
 *              so the lab can look them up by prompt id.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishSampleEssay } from "./swedishSampleEssays";

export const SWEDISH_SAMPLE_ESSAYS_EXPANSION: SwedishSampleEssay[] = [
  // ───────────────────────────── A1 ─────────────────────────────
  {
    id: "w-a1-shopping-list",
    level: "A1",
    titleVi: "Tin nhắn mua đồ siêu thị",
    titleEn: "Grocery shopping message",
    essaySv:
      "Hej! Jag är på ICA nu. Vad behöver vi köpa hem? Jag har redan mjölk, bröd och ägg i korgen. " +
      "Jag tänkte göra pasta med kyckling till middag i kväll. Behöver vi också frukt och kaffe? " +
      "Skriv snabbt, tack. Jag är hemma klockan sex.",
    essayVi:
      "Chào! Anh đang ở ICA. Nhà mình cần mua gì nữa? Anh đã lấy sữa, bánh mì và trứng rồi. " +
      "Anh định nấu mì ống với gà cho bữa tối nay. Mình có cần trái cây và cà phê không? " +
      "Nhắn nhanh nhé. Anh về nhà lúc 6 giờ.",
    wordCount: 48,
    grammarNotes: [
      { label: "Câu hỏi Vad/Behöver", noteVi: "Câu hỏi có từ để hỏi ('Vad behöver vi...') và câu hỏi Có/Không đảo động từ ('Behöver vi...').", noteEn: "Wh-question and yes/no question with verb inversion." },
      { label: "jag tänkte + infinitiv", noteVi: "'jag tänkte göra' = tôi định làm - cách nói kế hoạch gần rất tự nhiên ở A1.", noteEn: "'jag tänkte göra' expresses a near-future plan, very natural at A1." },
    ],
    highlights: [
      "Trả lời đủ 3 yêu cầu: hỏi cần mua gì, đề xuất bữa tối, nói giờ về.",
      "Câu ngắn, mỗi câu một ý - đúng chuẩn SMS A1.",
    ],
  },
  {
    id: "w-a1-lapp-rumskamrat",
    level: "A1",
    titleVi: "Ghi chú mua sắm cho bạn cùng phòng",
    titleEn: "Shopping note for a roommate",
    essaySv:
      "Hej Sara! Kan du köpa några saker på ICA i dag? Vi behöver mjölk eftersom jag drack den sista i morse. " +
      "Köp också bröd till frukost, tomater till salladen och tvättmedel eftersom flaskan är tom. " +
      "Tack så mycket! Jag swishar dig pengarna i kväll.",
    essayVi:
      "Chào Sara! Bạn mua giúp mình vài thứ ở ICA hôm nay nhé? Mình cần sữa vì sáng nay mình uống hết rồi. " +
      "Mua thêm bánh mì cho bữa sáng, cà chua để làm salad và nước giặt vì chai đã hết. " +
      "Cảm ơn nhiều! Tối nay mình chuyển tiền Swish cho bạn.",
    wordCount: 47,
    grammarNotes: [
      { label: "Kan du + infinitiv", noteVi: "'Kan du köpa...?' là cách nhờ vả lịch sự chuẩn A1.", noteEn: "'Kan du köpa...?' is the standard polite A1 request." },
      { label: "eftersom", noteVi: "'eftersom' đứng đầu mệnh đề phụ, động từ giữ nguyên vị trí sau chủ ngữ.", noteEn: "'eftersom' introduces a subclause; verb stays after the subject." },
    ],
    highlights: [
      "Đủ 4 món hàng và mỗi món có lý do - Task Fulfilment trọn vẹn.",
      "Mở đầu và kết thúc thân mật, đúng văn phong lời nhắn giấy.",
    ],
  },
  {
    id: "w-a1-doctor-form",
    level: "A1",
    titleVi: "Điền lý do đến gặp bác sĩ",
    titleEn: "Filling a doctor reason form",
    essaySv:
      "Hej! Jag heter Minh Tran och jag är 29 år gammal. Jag har feber sedan i måndags. " +
      "Jag har också ont i huvudet och hostar mycket på natten. Jag känner mig trött och kan inte arbeta. " +
      "Jag vill boka en tid den här veckan. Mitt telefonnummer är 070-123 45 67.",
    essayVi:
      "Chào! Tôi tên Minh Trần, 29 tuổi. Tôi bị sốt từ thứ Hai. " +
      "Tôi cũng đau đầu và ho nhiều về đêm. Tôi thấy mệt và không làm việc được. " +
      "Tôi muốn đặt lịch trong tuần này. Số điện thoại của tôi là 070-123 45 67.",
    wordCount: 55,
    grammarNotes: [
      { label: "sedan + thời điểm", noteVi: "'sedan i måndags' = từ thứ Hai. Dùng thì hiện tại vì bệnh còn kéo dài.", noteEn: "'sedan i måndags' with present tense because the symptom continues." },
      { label: "ha ont i + bộ phận", noteVi: "'ha ont i huvudet/magen' là cấu trúc chuẩn để nói đau.", noteEn: "'ha ont i + body part' is the standard pain structure." },
    ],
    highlights: [
      "Có đủ: tên, tuổi, triệu chứng, thời điểm bắt đầu, thông tin liên hệ.",
      "Dùng 3 triệu chứng khác nhau - đủ điểm từ vựng sức khỏe A1.",
    ],
  },
  {
    id: "w-a1-thank-you",
    level: "A1",
    titleVi: "Lời cảm ơn sau bữa tối",
    titleEn: "Thank-you note after dinner",
    essaySv:
      "Hej Lisa! Tack så mycket för middagen i går. Maten var jättegod, särskilt soppan och kakan. " +
      "Det var också trevligt att prata med dig hela kvällen. " +
      "Nästa vecka vill jag bjuda dig hem till mig. Passar det på lördag klockan sex? Hälsningar, Minh.",
    essayVi:
      "Chào Lisa! Cảm ơn bạn rất nhiều vì bữa tối hôm qua. Đồ ăn rất ngon, nhất là món súp và bánh. " +
      "Nói chuyện với bạn cả buổi tối cũng rất vui. " +
      "Tuần sau mình muốn mời bạn đến nhà mình. Thứ Bảy 6 giờ được không? Thân mến, Minh.",
    wordCount: 48,
    grammarNotes: [
      { label: "Tack för + danh từ", noteVi: "'Tack för middagen' - luôn dùng danh từ xác định sau 'för'.", noteEn: "'Tack för middagen' - definite noun after 'för'." },
      { label: "Passar det...?", noteVi: "'Passar det på lördag?' là cách đề xuất thời gian lịch sự A1.", noteEn: "'Passar det på lördag?' politely proposes a time." },
    ],
    highlights: [
      "Cảm ơn - khen món ăn - mời lại: đúng 3 bước của lời nhắn xã giao.",
      "Kết thư có chữ ký, đúng quy ước viết thư Thụy Điển.",
    ],
  },
  {
    id: "w-a1-lost-item",
    level: "A1",
    titleVi: "Bỏ quên đồ trên xe buýt",
    titleEn: "Lost item on the bus",
    essaySv:
      "Hej! Jag glömde en väska på buss nummer 42 i morse klockan åtta. Bussen åkte från Solna till Slussen. " +
      "Väskan är svart och ganska stor. I väskan finns en blå bok, ett pennskrin och mina nycklar. " +
      "Kan ni kontakta mig om ni hittar den? Mitt nummer är 070-987 65 43. Tack för hjälpen!",
    essayVi:
      "Chào! Tôi để quên một chiếc túi trên xe buýt số 42 sáng nay lúc 8 giờ. Xe chạy từ Solna đến Slussen. " +
      "Túi màu đen và khá to. Trong túi có một cuốn sách xanh, một hộp bút và chìa khóa của tôi. " +
      "Nếu tìm thấy, xin liên hệ tôi nhé? Số của tôi là 070-987 65 43. Cảm ơn!",
    wordCount: 60,
    grammarNotes: [
      { label: "Quá khứ 'glömde'", noteVi: "'glömma - glömde' (nhóm 2), dùng quá khứ vì việc đã xảy ra sáng nay.", noteEn: "'glömma - glömde' past tense for a completed event this morning." },
      { label: "det finns / i väskan finns", noteVi: "Đảo ngữ V2: trạng ngữ đứng đầu thì động từ đứng thứ hai.", noteEn: "V2 inversion: fronted adverbial pushes the verb to second position." },
    ],
    highlights: [
      "Mô tả đồ vật rõ (màu, kích cỡ, thứ bên trong) - giúp người đọc nhận diện.",
      "Có đủ thông tin chuyến xe và cách liên hệ.",
    ],
  },
  {
    id: "w-a1-daily-routine",
    level: "A1",
    titleVi: "Một ngày bình thường",
    titleEn: "A typical day",
    essaySv:
      "Jag går upp klockan halv sju på morgonen. Först duschar jag och sedan äter jag frukost: bröd, ost och kaffe. " +
      "Klockan åtta tar jag bussen till jobbet. Jag arbetar på ett kontor till klockan fem. " +
      "På kvällen lagar jag mat och tittar på en film. Jag går och lägger mig vid elva.",
    essayVi:
      "Tôi dậy lúc 6 rưỡi sáng. Trước tiên tôi tắm rồi ăn sáng: bánh mì, phô mai và cà phê. " +
      "8 giờ tôi bắt xe buýt đi làm. Tôi làm ở văn phòng đến 5 giờ chiều. " +
      "Buổi tối tôi nấu ăn và xem phim. Tôi đi ngủ lúc 11 giờ.",
    wordCount: 58,
    grammarNotes: [
      { label: "Först... sedan...", noteVi: "Trạng từ trình tự đứng đầu câu kéo theo đảo ngữ: 'sedan äter jag'.", noteEn: "Sequence adverbs trigger inversion: 'sedan äter jag'." },
      { label: "Giờ giấc", noteVi: "'halv sju' = 6h30 (nửa đến 7), khác tiếng Việt - cần nhớ kỹ.", noteEn: "'halv sju' means 6:30 (half to seven), not 7:30." },
    ],
    highlights: [
      "Bao đủ sáng - trưa - tối theo trình tự thời gian rõ ràng.",
      "Dùng 4 mốc giờ khác nhau - đúng trọng tâm ngữ pháp A1.",
    ],
  },
  {
    id: "w-a1-inkopslista",
    level: "A1",
    titleVi: "Danh sách mua sắm và bữa tối",
    titleEn: "Shopping list and dinner plan",
    essaySv:
      "I dag ska jag handla på ICA efter jobbet. Jag ska köpa ris, kyckling, paprika, lök och grädde. " +
      "Jag behöver också mjölk och apelsiner till frukost i morgon. " +
      "Till middag lagar jag kyckling med ris och grönsaker. Min syster äter med mig i kväll, så jag köper en tårta också.",
    essayVi:
      "Hôm nay sau giờ làm tôi sẽ đi chợ ở ICA. Tôi sẽ mua gạo, gà, ớt chuông, hành và kem tươi. " +
      "Tôi cũng cần sữa và cam cho bữa sáng mai. " +
      "Bữa tối tôi nấu gà với cơm và rau. Tối nay em gái tôi ăn cùng nên tôi mua thêm một cái bánh ngọt.",
    wordCount: 58,
    grammarNotes: [
      { label: "ska + infinitiv", noteVi: "'ska handla / ska köpa' = kế hoạch đã quyết định.", noteEn: "'ska + infinitive' for a decided plan." },
      { label: "så (vì vậy)", noteVi: "'så jag köper' nối kết quả, giữ trật tự chủ ngữ + động từ.", noteEn: "'så' links a result and keeps S-V order." },
    ],
    highlights: [
      "Liệt kê hơn 5 mặt hàng theo yêu cầu đề bài.",
      "Có lý do mua thêm bánh - bài viết tự nhiên hơn danh sách khô khan.",
    ],
  },
  {
    id: "w-a1-vecka",
    level: "A1",
    titleVi: "Một ngày trong tuần của tôi",
    titleEn: "A weekday in my life",
    essaySv:
      "På vardagar vaknar jag klockan sex. Jag dricker te och läser nyheterna på telefonen. " +
      "Klockan sju cyklar jag till skolan. Vi har lektioner till klockan två. " +
      "På eftermiddagen pluggar jag på biblioteket i två timmar. På kvällen träffar jag mina vänner eller tränar på gymmet. Jag sover vid halv tolv.",
    essayVi:
      "Ngày thường tôi thức dậy lúc 6 giờ. Tôi uống trà và đọc tin trên điện thoại. " +
      "7 giờ tôi đạp xe đến trường. Chúng tôi học đến 2 giờ. " +
      "Buổi chiều tôi học ở thư viện 2 tiếng. Buổi tối tôi gặp bạn bè hoặc tập gym. Tôi ngủ lúc 11 rưỡi.",
    wordCount: 61,
    grammarNotes: [
      { label: "På vardagar / På kvällen", noteVi: "Trạng ngữ thời gian đầu câu → động từ vẫn đứng vị trí 2: 'På vardagar vaknar jag'.", noteEn: "Fronted time adverbial keeps the verb in second position." },
      { label: "eller", noteVi: "'eller' cho lựa chọn - làm bài viết bớt đơn điệu.", noteEn: "'eller' offers an alternative and adds variety." },
    ],
    highlights: [
      "Chia rõ 3 phần: sáng, chiều, tối.",
      "Dùng 5 động từ hoạt động khác nhau, không lặp 'göra'.",
    ],
  },

  // ───────────────────────────── A2 ─────────────────────────────
  {
    id: "w-a2-complaint",
    level: "A2",
    titleVi: "Khiếu nại đơn hàng online",
    titleEn: "Complaint about an online order",
    essaySv:
      "Hej,\n\nJag beställde en jacka och ett par skor från er webbshop den 3 mars, ordernummer 55821. " +
      "Paketet skulle komma inom fem dagar, men det kom först efter två veckor. Dessutom var jackan trasig: dragkedjan går inte att stänga.\n\n" +
      "Jag vill att ni skickar en ny jacka eller betalar tillbaka pengarna. Jag har sparat kvittot och tagit foton på skadan.\n\n" +
      "Jag förväntar mig svar inom en vecka.\n\nMed vänliga hälsningar,\nMinh Tran",
    essayVi:
      "Xin chào,\n\nTôi đã đặt một áo khoác và một đôi giày trên web của quý công ty ngày 3/3, đơn số 55821. " +
      "Gói hàng lẽ ra đến trong 5 ngày nhưng tận 2 tuần mới tới. Ngoài ra áo khoác bị hỏng: khóa kéo không kéo được.\n\n" +
      "Tôi muốn quý công ty gửi áo mới hoặc hoàn tiền. Tôi đã giữ hóa đơn và chụp ảnh chỗ hỏng.\n\n" +
      "Tôi mong nhận phản hồi trong vòng một tuần.\n\nTrân trọng,\nMinh Trần",
    wordCount: 88,
    grammarNotes: [
      { label: "skulle + infinitiv", noteVi: "'Paketet skulle komma' = lẽ ra phải đến - diễn tả kỳ vọng không thành.", noteEn: "'skulle komma' expresses an unfulfilled expectation." },
      { label: "Jag vill att ni + verb", noteVi: "Cấu trúc yêu cầu lịch sự nhưng dứt khoát, rất hợp email khiếu nại A2.", noteEn: "Polite but firm request pattern for A2 complaint emails." },
    ],
    highlights: [
      "Có mã đơn hàng và ngày cụ thể - tăng độ thuyết phục.",
      "Đủ 3 phần: vấn đề, yêu cầu, hạn phản hồi. Kết thư trang trọng.",
    ],
  },
  {
    id: "w-a2-klagomal-hyresvard",
    level: "A2",
    titleVi: "Email phàn nàn với chủ nhà",
    titleEn: "Complaint email to landlord",
    essaySv:
      "Hej,\n\nJag bor på Storgatan 12, lägenhet 3B. Diskmaskinen i mitt kök har varit trasig i två veckor. " +
      "Vattnet rinner ut på golvet när jag startar den, så jag vågar inte använda den alls.\n\n" +
      "Vi är fyra personer i familjen och diskar nu för hand varje kväll, vilket tar mycket tid. " +
      "Jag är också orolig för att vattnet kan skada golvet.\n\n" +
      "Kan ni skicka en reparatör den här veckan? Jag är hemma efter klockan sexton alla vardagar.\n\nTack på förhand,\nLan Nguyen",
    essayVi:
      "Xin chào,\n\nTôi sống ở Storgatan 12, căn 3B. Máy rửa bát trong bếp đã hỏng hai tuần. " +
      "Nước tràn ra sàn khi tôi bật máy nên tôi không dám dùng nữa.\n\n" +
      "Nhà tôi 4 người, giờ phải rửa tay mỗi tối rất mất thời gian. " +
      "Tôi cũng lo nước làm hỏng sàn.\n\n" +
      "Ông/bà cử thợ đến trong tuần này được không? Tôi ở nhà sau 16 giờ mọi ngày trong tuần.\n\nCảm ơn trước,\nLan Nguyễn",
    wordCount: 92,
    grammarNotes: [
      { label: "har varit + tính từ", noteVi: "Thì hiện tại hoàn thành 'har varit trasig i två veckor' nhấn tình trạng kéo dài.", noteEn: "Present perfect shows an ongoing state over two weeks." },
      { label: "så / vilket", noteVi: "'så jag vågar inte' (kết quả) và 'vilket tar mycket tid' (bình luận cả mệnh đề).", noteEn: "'så' for result; 'vilket' comments on the whole preceding clause." },
    ],
    highlights: [
      "Nêu hậu quả cụ thể (mất thời gian, nguy cơ hỏng sàn) - lý do thuyết phục.",
      "Đề xuất khung giờ gặp thợ - giúp giải quyết nhanh.",
    ],
  },
  {
    id: "w-a2-job-interest",
    level: "A2",
    titleVi: "Thư quan tâm việc làm hè",
    titleEn: "Letter of interest for a job",
    essaySv:
      "Hej,\n\nJag heter Mai Nguyen och jag är 22 år. Jag såg er annons om sommarjobb på Kafé Solen och jag är mycket intresserad.\n\n" +
      "Jag studerar ekonomi på Stockholms universitet och har arbetat två somrar på ett bageri i Uppsala. " +
      "Där lärde jag mig att jobba i kassan, brygga kaffe och ta hand om kunder även när det är stressigt. " +
      "Jag talar svenska, engelska och vietnamesiska.\n\n" +
      "Jag kan börja den 1 juni och arbeta hela sommaren, både vardagar och helger.\n\nMed vänliga hälsningar,\nMai Nguyen",
    essayVi:
      "Xin chào,\n\nTôi tên Mai Nguyễn, 22 tuổi. Tôi thấy tin tuyển việc hè ở Kafé Solen và rất quan tâm.\n\n" +
      "Tôi học kinh tế ở Đại học Stockholm và đã làm hai mùa hè ở tiệm bánh tại Uppsala. " +
      "Ở đó tôi học được cách đứng quầy thu ngân, pha cà phê và phục vụ khách cả khi đông. " +
      "Tôi nói được tiếng Thụy Điển, tiếng Anh và tiếng Việt.\n\n" +
      "Tôi có thể bắt đầu ngày 1/6 và làm cả hè, cả ngày thường lẫn cuối tuần.\n\nTrân trọng,\nMai Nguyễn",
    wordCount: 95,
    grammarNotes: [
      { label: "Quá khứ + hiện tại hoàn thành", noteVi: "'har arbetat' (kinh nghiệm) và 'lärde mig' (sự việc cụ thể trong quá khứ).", noteEn: "'har arbetat' for experience, 'lärde mig' for a specific past event." },
      { label: "både... och...", noteVi: "'både vardagar och helger' cho thấy sự linh hoạt - điểm cộng khi xin việc.", noteEn: "'både... och...' shows flexibility, a plus in applications." },
    ],
    highlights: [
      "Có đủ 4 phần: giới thiệu, kinh nghiệm, kỹ năng, thời gian bắt đầu.",
      "Kinh nghiệm được mô tả bằng việc làm cụ thể chứ không nói chung chung.",
    ],
  },
  {
    id: "w-a2-neighbor-noise",
    level: "A2",
    titleVi: "Lời nhắn cho hàng xóm ồn",
    titleEn: "Note to a noisy neighbour",
    essaySv:
      "Hej granne!\n\nJag bor i lägenheten under dig. Jag vill berätta att musiken har varit ganska hög på kvällarna den här veckan, " +
      "särskilt efter klockan elva. Mina barn vaknar och har svårt att somna om.\n\n" +
      "Jag förstår att man vill lyssna på musik och ha gäster ibland. Kanske kan du sänka volymen efter tio, " +
      "eller använda hörlurar sent på kvällen?\n\nSäg gärna till om du vill prata. Ha en fin helg!\n\nHälsningar,\nHoa i 2A",
    essayVi:
      "Chào hàng xóm!\n\nMình ở căn ngay dưới bạn. Mình muốn nói là tuần này nhạc hơi to vào buổi tối, " +
      "nhất là sau 11 giờ. Các con mình tỉnh giấc và khó ngủ lại.\n\n" +
      "Mình hiểu là đôi khi bạn muốn nghe nhạc và mời khách. Có lẽ bạn giảm âm lượng sau 10 giờ, " +
      "hoặc dùng tai nghe khi đã khuya nhé?\n\nCứ nói nếu bạn muốn trao đổi. Chúc cuối tuần vui!\n\nThân,\nHoa căn 2A",
    wordCount: 90,
    grammarNotes: [
      { label: "Kanske + đảo ngữ", noteVi: "'Kanske kan du sänka' - sau 'kanske' thường đảo động từ lên trước chủ ngữ.", noteEn: "After 'kanske', the verb often precedes the subject." },
      { label: "Giọng lịch sự", noteVi: "'Jag förstår att...' làm dịu lời phàn nàn trước khi đề xuất giải pháp.", noteEn: "'Jag förstår att...' softens the complaint before proposing a fix." },
    ],
    highlights: [
      "Nêu vấn đề - thể hiện thông cảm - đề xuất 2 giải pháp: cấu trúc chuẩn.",
      "Kết thúc thân thiện, giữ quan hệ hàng xóm tốt.",
    ],
  },
  {
    id: "w-a2-online-review",
    level: "A2",
    titleVi: "Đánh giá nhà hàng trên Google",
    titleEn: "Google review of a restaurant",
    essaySv:
      "Vi åt middag på Restaurang Kastanjen i Gamla stan förra fredagen. Vi var tre personer och beställde köttbullar, " +
      "lax med potatis och en vegetarisk soppa.\n\n" +
      "Maten kom snabbt och smakade riktigt bra, särskilt laxen. Personalen var vänlig och förklarade menyn på engelska när min kompis frågade. " +
      "Tyvärr var det lite för högljutt inne i lokalen och notan blev dyrare än vi trodde.\n\n" +
      "Sammanfattningsvis rekommenderar jag stället, men boka bord i förväg och gå gärna tidigt på kvällen.",
    essayVi:
      "Chúng tôi ăn tối ở nhà hàng Kastanjen tại Phố Cổ thứ Sáu tuần trước. Nhóm 3 người, gọi thịt viên, " +
      "cá hồi với khoai tây và một món súp chay.\n\n" +
      "Món ra nhanh và rất ngon, nhất là cá hồi. Nhân viên thân thiện và giải thích thực đơn bằng tiếng Anh khi bạn tôi hỏi. " +
      "Tiếc là trong phòng hơi ồn và hóa đơn đắt hơn chúng tôi nghĩ.\n\n" +
      "Tóm lại tôi vẫn giới thiệu quán, nhưng nên đặt bàn trước và đi sớm.",
    wordCount: 92,
    grammarNotes: [
      { label: "Quá khứ đều/bất quy tắc", noteVi: "'åt' (äta), 'kom' (komma), 'beställde' (beställa) - trộn động từ mạnh và yếu.", noteEn: "Mixes strong and weak past forms: åt, kom, beställde." },
      { label: "So sánh hơn", noteVi: "'dyrare än vi trodde' - so sánh + mệnh đề, đúng chuẩn A2 cao.", noteEn: "'dyrare än vi trodde' - comparative plus clause, high A2." },
    ],
    highlights: [
      "Cân bằng khen và chê - đánh giá đáng tin cậy.",
      "Có lời khuyên thực tế ở cuối (đặt bàn, đi sớm).",
    ],
  },
  {
    id: "w-a2-invite-friend",
    level: "A2",
    titleVi: "Thiệp mời sinh nhật",
    titleEn: "Birthday invitation letter",
    essaySv:
      "Hej Johan!\n\nJag fyller trettio år och vill gärna fira med mina närmaste vänner. Därför bjuder jag dig på fest " +
      "lördagen den 14 juni klockan 18.00 hemma hos mig på Ringvägen 8.\n\n" +
      "Vi börjar med middag - jag lagar vietnamesisk mat - och sedan blir det musik och kanske dans i trädgården om vädret är fint.\n\n" +
      "Du behöver inte ta med något, men om du vill kan du ta med en dryck du gillar. " +
      "Svara gärna före den 7 juni så jag vet hur mycket mat jag ska laga.\n\nVi ses!\nLinh",
    essayVi:
      "Chào Johan!\n\nMình tròn 30 tuổi và muốn ăn mừng cùng những người bạn thân nhất. Vì vậy mình mời bạn đến tiệc " +
      "thứ Bảy ngày 14/6 lúc 18:00 tại nhà mình, Ringvägen 8.\n\n" +
      "Mình bắt đầu bằng bữa tối - mình nấu món Việt - rồi có nhạc và có thể nhảy ngoài vườn nếu trời đẹp.\n\n" +
      "Bạn không cần mang gì cả, nhưng nếu muốn thì mang theo đồ uống bạn thích. " +
      "Trả lời trước 7/6 nhé để mình biết nấu bao nhiêu.\n\nHẹn gặp!\nLinh",
    wordCount: 104,
    grammarNotes: [
      { label: "Ngày tháng", noteVi: "'lördagen den 14 juni klockan 18.00' - thứ tự chuẩn: thứ, ngày, giờ.", noteEn: "Standard order: weekday, date, time." },
      { label: "om + điều kiện", noteVi: "'om vädret är fint' - mệnh đề điều kiện loại thực tế ở A2.", noteEn: "'om vädret är fint' - real conditional clause at A2." },
    ],
    highlights: [
      "Đủ 5 thông tin: dịp, ngày, giờ, địa điểm, chương trình.",
      "Có hạn trả lời (OSA) - đúng văn hóa mời tiệc Bắc Âu.",
    ],
  },
  {
    id: "w-a2-boka-tid",
    level: "A2",
    titleVi: "Email đặt lịch khám bệnh",
    titleEn: "Email to book a doctor's appointment",
    essaySv:
      "Hej,\n\nJag heter Hoa Pham och är patient hos er vårdcentral. Jag skulle vilja boka en tid hos en läkare.\n\n" +
      "Jag har haft ont i ryggen i tre veckor. Det gör mest ont på morgonen och när jag sitter länge vid datorn. " +
      "Jag har testat värktabletter, men de hjälper bara en kort stund.\n\n" +
      "Jag kan komma måndag eller onsdag efter klockan fjorton. Mitt personnummer är 950312-1234 och mitt telefonnummer 070-456 78 90.\n\n" +
      "Tack för hjälpen!\nHoa Pham",
    essayVi:
      "Xin chào,\n\nTôi tên Hoa Phạm, là bệnh nhân của trạm y tế. Tôi muốn đặt lịch khám với bác sĩ.\n\n" +
      "Tôi bị đau lưng ba tuần nay. Đau nhất vào buổi sáng và khi ngồi lâu trước máy tính. " +
      "Tôi đã thử thuốc giảm đau nhưng chỉ đỡ được một lúc.\n\n" +
      "Tôi có thể đến thứ Hai hoặc thứ Tư sau 14 giờ. Số định danh của tôi là 950312-1234, điện thoại 070-456 78 90.\n\n" +
      "Cảm ơn!\nHoa Phạm",
    wordCount: 90,
    grammarNotes: [
      { label: "Jag skulle vilja", noteVi: "Cách nói lịch sự hơn 'jag vill' - rất hợp email hành chính.", noteEn: "More polite than 'jag vill', ideal for official emails." },
      { label: "har haft ... i tre veckor", noteVi: "Hiện tại hoàn thành + 'i + khoảng thời gian' để nói triệu chứng kéo dài.", noteEn: "Present perfect + duration for ongoing symptoms." },
    ],
    highlights: [
      "Mô tả triệu chứng có bối cảnh (buổi sáng, ngồi máy tính) - bác sĩ dễ đánh giá.",
      "Đưa 2 lựa chọn thời gian và đầy đủ thông tin liên hệ.",
    ],
  },
  {
    id: "w-a2-berattelse-resa",
    level: "A2",
    titleVi: "Kể về chuyến đi gần nhất",
    titleEn: "Story about your last trip",
    essaySv:
      "I somras åkte jag och min bror till Göteborg i fyra dagar. Vi tog tåget från Stockholm och resan tog ungefär tre timmar.\n\n" +
      "Vi bodde på ett litet hotell nära hamnen. Första dagen gick vi runt i Haga och drack kaffe med en stor kanelbulle. " +
      "Dagen efter besökte vi Liseberg och åkte många karuseller. På tredje dagen tog vi båten ut i skärgården och badade.\n\n" +
      "Resan var rolig men lite dyr. Nästa gång vill jag stanna längre och laga mat själv i stället för att äta ute varje dag.",
    essayVi:
      "Hè vừa rồi tôi và anh trai đi Göteborg 4 ngày. Chúng tôi đi tàu từ Stockholm, mất khoảng 3 tiếng.\n\n" +
      "Chúng tôi ở một khách sạn nhỏ gần cảng. Ngày đầu đi dạo khu Haga và uống cà phê với bánh quế lớn. " +
      "Hôm sau đi công viên Liseberg và chơi nhiều trò. Ngày thứ ba đi thuyền ra quần đảo và tắm biển.\n\n" +
      "Chuyến đi vui nhưng hơi đắt. Lần sau tôi muốn ở lâu hơn và tự nấu ăn thay vì ăn ngoài mỗi ngày.",
    wordCount: 100,
    grammarNotes: [
      { label: "Trạng ngữ thời gian + đảo ngữ", noteVi: "'I somras åkte jag', 'Dagen efter besökte vi' - động từ luôn ở vị trí thứ hai.", noteEn: "Fronted time phrases keep the verb second." },
      { label: "i stället för att + infinitiv", noteVi: "Cấu trúc A2 cao để nêu phương án thay thế.", noteEn: "High-A2 structure for stating an alternative." },
    ],
    highlights: [
      "Kể theo trình tự ngày 1 - 2 - 3, rất dễ theo dõi.",
      "Có nhận xét cá nhân và dự định lần sau - kết bài trọn vẹn.",
    ],
  },
  {
    id: "w-a2-svar-inbjudan",
    level: "A2",
    titleVi: "Trả lời thiệp mời sinh nhật",
    titleEn: "Reply to a birthday invitation",
    essaySv:
      "Hej Erik!\n\nTack så mycket för inbjudan till din födelsedag! Vad roligt att du fyller år.\n\n" +
      "Jag kommer gärna på lördag klockan sju. Jag tar bussen dit, så jag kan stanna hela kvällen.\n\n" +
      "Jag har två frågor. Önskar du dig något särskilt i present? Jag tänkte köpa en bok, men säg till om du hellre vill ha något annat. " +
      "Och hur klär man sig - är det vanliga kläder eller något finare?\n\nVi ses på lördag!\nMinh",
    essayVi:
      "Chào Erik!\n\nCảm ơn bạn đã mời mình dự sinh nhật! Vui quá.\n\n" +
      "Mình sẽ đến thứ Bảy lúc 7 giờ. Mình đi xe buýt nên có thể ở lại cả tối.\n\n" +
      "Mình có hai câu hỏi. Bạn có muốn quà gì đặc biệt không? Mình định mua sách, nhưng nếu bạn thích thứ khác thì nói nhé. " +
      "Và mặc thế nào - đồ thường hay trang trọng hơn?\n\nHẹn gặp thứ Bảy!\nMinh",
    wordCount: 87,
    grammarNotes: [
      { label: "Câu hỏi gián tiếp/trực tiếp", noteVi: "'Önskar du dig något...?' đảo ngữ; 'hur klär man sig' dùng 'man' chỉ chung.", noteEn: "Inverted question plus generic pronoun 'man'." },
      { label: "hellre", noteVi: "'hellre vill ha' = thích hơn - trạng từ so sánh hữu ích ở A2.", noteEn: "'hellre' = rather, a useful A2 comparative adverb." },
    ],
    highlights: [
      "Đủ 3 việc: cảm ơn, xác nhận đến, đặt câu hỏi.",
      "Hai câu hỏi cụ thể (quà, trang phục) đúng yêu cầu đề.",
    ],
  },

  // ───────────────────────────── B1 ─────────────────────────────
  {
    id: "w-b1-public-transport",
    level: "B1",
    titleVi: "Bài gửi báo: cải thiện giao thông công cộng",
    titleEn: "Opinion: improving public transport",
    essaySv:
      "Kollektivtrafiken i vår stad fungerar bra på många sätt. Bussarna går ofta på dagtid och biljettappen är enkel att använda, " +
      "vilket gör att många väljer bussen i stället för bilen.\n\n" +
      "Samtidigt finns det tydliga problem. På kvällar och helger går bussarna bara en gång i timmen, och de som arbetar skift " +
      "hinner inte hem efter sitt pass. Dessutom är hållplatserna i förorterna dåligt upplysta, vilket gör att särskilt kvinnor känner sig otrygga.\n\n" +
      "Jag föreslår därför två åtgärder. För det första bör kommunen sätta in kvartstrafik mellan klockan 18 och 23. " +
      "För det andra bör alla hållplatser få belysning och realtidsskyltar inom två år.\n\n" +
      "Detta är viktigt för miljön: varje resenär som lämnar bilen hemma minskar utsläppen. En pålitlig kollektivtrafik är alltså " +
      "inte bara en bekvämlighet utan en klimatåtgärd.",
    essayVi:
      "Giao thông công cộng ở thành phố ta nhiều mặt hoạt động tốt. Ban ngày xe buýt chạy dày và app vé dễ dùng, " +
      "nhờ vậy nhiều người chọn xe buýt thay vì ô tô.\n\n" +
      "Nhưng vẫn có vấn đề rõ ràng. Buổi tối và cuối tuần mỗi giờ mới có một chuyến, người làm ca không kịp về nhà. " +
      "Ngoài ra trạm ở ngoại ô thiếu ánh sáng, khiến phụ nữ đặc biệt thấy bất an.\n\n" +
      "Vì vậy tôi đề xuất hai biện pháp. Thứ nhất, thành phố nên chạy 15 phút/chuyến từ 18h đến 23h. " +
      "Thứ hai, mọi trạm cần có đèn và bảng giờ thời gian thực trong vòng hai năm.\n\n" +
      "Điều này quan trọng với môi trường: mỗi hành khách bỏ ô tô ở nhà là giảm phát thải. Giao thông công cộng đáng tin cậy " +
      "không chỉ tiện lợi mà còn là hành động vì khí hậu.",
    wordCount: 148,
    grammarNotes: [
      { label: "vilket gör att", noteVi: "'vilket' thay cả mệnh đề trước - dấu hiệu B1 rõ nhất.", noteEn: "'vilket' refers to the whole previous clause, a key B1 marker." },
      { label: "inte bara... utan...", noteVi: "'inte bara en bekvämlighet utan en klimatåtgärd' - cấu trúc nhấn mạnh học thuật.", noteEn: "'not only... but...' emphasis structure." },
      { label: "bör + infinitiv", noteVi: "'bör' nhẹ và lịch sự hơn 'måste' khi đề xuất chính sách.", noteEn: "'bör' is softer than 'måste' for policy proposals." },
    ],
    highlights: [
      "Bố cục 4 đoạn: tốt - chưa tốt - 2 đề xuất - lý do môi trường.",
      "Đề xuất có con số và mốc thời gian cụ thể, không chung chung.",
    ],
  },
  {
    id: "w-b1-screen-time",
    level: "B1",
    titleVi: "Bài luận: trẻ em và thời gian màn hình",
    titleEn: "Essay: children and screen time",
    essaySv:
      "Frågan om hur mycket skärmtid som är lagom för barn diskuteras i nästan varje familj. Svaret beror på både ålder och innehåll.\n\n" +
      "Det finns tydliga risker. Barn som sitter framför skärmen sent på kvällen sover sämre, eftersom ljuset påverkar dygnsrytmen. " +
      "En annan risk är att stillasittande ersätter fysisk lek, vilket på sikt kan leda till hälsoproblem.\n\n" +
      "Samtidigt vore det orättvist att bara se nackdelar. Många barn lär sig språk, programmering och samarbete genom digitala verktyg. " +
      "Dessutom är skärmen i dag en social plats där barn håller kontakt med kompisar som bor långt bort.\n\n" +
      "Min rekommendation till föräldrar är att fokusera på kvalitet i stället för minuter. Sätt en tydlig gräns på kvällen - " +
      "till exempel inga skärmar efter klockan 20 - och titta gärna tillsammans med barnet så att ni kan prata om innehållet efteråt.",
    essayVi:
      "Chuyện trẻ nên dùng màn hình bao nhiêu là hợp lý được bàn ở hầu như mọi gia đình. Câu trả lời tùy vào độ tuổi và nội dung.\n\n" +
      "Có những rủi ro rõ. Trẻ ngồi trước màn hình muộn sẽ ngủ kém hơn vì ánh sáng ảnh hưởng nhịp sinh học. " +
      "Rủi ro nữa là ngồi yên thay cho vận động, lâu dài có thể gây vấn đề sức khỏe.\n\n" +
      "Nhưng chỉ nhìn mặt xấu thì không công bằng. Nhiều trẻ học ngôn ngữ, lập trình và kỹ năng hợp tác qua công cụ số. " +
      "Hơn nữa màn hình nay là nơi giao tiếp để trẻ giữ liên lạc với bạn ở xa.\n\n" +
      "Khuyến nghị của tôi cho cha mẹ là tập trung vào chất lượng thay vì số phút. Đặt giới hạn buổi tối rõ ràng - " +
      "ví dụ không màn hình sau 20 giờ - và nên xem cùng con để sau đó trò chuyện về nội dung.",
    wordCount: 152,
    grammarNotes: [
      { label: "vore", noteVi: "'det vore orättvist' - thể giả định lịch sự, ghi điểm Grammar B1.", noteEn: "'vore' subjunctive adds polish at B1." },
      { label: "på sikt / i stället för", noteVi: "Cụm trạng ngữ học thuật giúp bài viết mạch lạc hơn.", noteEn: "Academic adverbials improve cohesion." },
    ],
    highlights: [
      "Đủ 2 rủi ro, 2 lợi ích và 1 khuyến nghị cụ thể theo yêu cầu đề.",
      "Khuyến nghị có ví dụ số giờ - thực tế và dễ áp dụng.",
    ],
  },
  {
    id: "w-b1-volunteer",
    level: "B1",
    titleVi: "Thư xin làm tình nguyện viên",
    titleEn: "Volunteer application letter",
    essaySv:
      "Hej,\n\nJag heter Lan Nguyen och skriver för att ansöka om att bli volontär hos Röda Korset i Uppsala.\n\n" +
      "Mitt främsta motiv är att jag själv kom till Sverige som ny för fem år sedan och fick mycket hjälp av frivilliga. " +
      "Nu vill jag ge tillbaka något till samhället. Jag arbetar till vardags som undersköterska, " +
      "vilket har lärt mig att möta människor i utsatta situationer med tålamod och respekt.\n\n" +
      "Jag har också erfarenhet av att leda språkcaféer på biblioteket, där jag hjälpte nyanlända att träna svenska.\n\n" +
      "Jag kan bidra med ungefär fyra timmar i veckan, helst på tisdagskvällar och lördagar. " +
      "Mest intresserad är jag av läxhjälp för barn och av besöksverksamhet för äldre.\n\n" +
      "Jag ser fram emot ert svar.\n\nMed vänliga hälsningar,\nLan Nguyen",
    essayVi:
      "Xin chào,\n\nTôi tên Lan Nguyễn, viết thư xin làm tình nguyện viên cho Hội Chữ thập đỏ ở Uppsala.\n\n" +
      "Động lực chính là vì 5 năm trước tôi cũng mới sang Thụy Điển và được nhiều tình nguyện viên giúp đỡ. " +
      "Nay tôi muốn đóng góp lại cho cộng đồng. Ngày thường tôi làm điều dưỡng viên, " +
      "công việc đó dạy tôi tiếp xúc với người yếu thế bằng sự kiên nhẫn và tôn trọng.\n\n" +
      "Tôi cũng từng dẫn dắt câu lạc bộ ngôn ngữ ở thư viện, giúp người mới đến luyện tiếng Thụy Điển.\n\n" +
      "Tôi có thể đóng góp khoảng 4 giờ/tuần, tốt nhất là tối thứ Ba và thứ Bảy. " +
      "Tôi quan tâm nhất tới việc kèm bài cho trẻ em và thăm hỏi người cao tuổi.\n\n" +
      "Mong sớm nhận phản hồi.\n\nTrân trọng,\nLan Nguyễn",
    wordCount: 140,
    grammarNotes: [
      { label: "för att + infinitiv", noteVi: "'skriver för att ansöka' nêu mục đích - mở đầu thư trang trọng chuẩn.", noteEn: "'för att + infinitive' states purpose in a formal opening." },
      { label: "Đảo ngữ nhấn mạnh", noteVi: "'Mest intresserad är jag av...' đưa bổ ngữ lên đầu để nhấn mạnh - B1 cao.", noteEn: "Fronting the complement for emphasis, high B1." },
    ],
    highlights: [
      "Trả lời đủ 4 yêu cầu: động cơ, kinh nghiệm, thời gian, lĩnh vực quan tâm.",
      "Câu chuyện cá nhân làm động cơ trở nên thuyết phục.",
    ],
  },
  {
    id: "w-b1-immigrant-integration",
    level: "B1",
    titleVi: "Bài luận: hội nhập của người nhập cư",
    titleEn: "Essay: integration of immigrants",
    essaySv:
      "Vad är viktigast för en lyckad integration i Sverige? Enligt min åsikt handlar det om tre saker som hänger ihop: språk, arbete och sociala nätverk.\n\n" +
      "Språket kommer först. Utan svenska blir det svårt att förstå information från myndigheter och att göra sig hörd på en arbetsplats. " +
      "Samtidigt räcker inte kurser i klassrummet; man behöver också tala svenska i vardagen.\n\n" +
      "Arbete är den andra nyckeln. Ett jobb ger inte bara inkomst utan också rutiner, kollegor och en känsla av att bidra. " +
      "Många nyanlända har utbildning från sitt hemland som tyvärr inte valideras, vilket leder till att kompetens går förlorad.\n\n" +
      "Sociala nätverk binder ihop de andra två. Den som har svenska vänner får både språkträning och tips om lediga tjänster.\n\n" +
      "Jag föreslår att kommunen dels erbjuder språkpraktik på riktiga arbetsplatser, dels startar mentorprogram där en etablerad invånare " +
      "möter en nyanländ en gång i månaden. Båda åtgärderna är billiga men kan göra stor skillnad.",
    essayVi:
      "Điều gì quan trọng nhất để hội nhập thành công ở Thụy Điển? Theo tôi, đó là ba yếu tố gắn kết nhau: ngôn ngữ, việc làm và mạng lưới xã hội.\n\n" +
      "Ngôn ngữ đứng đầu. Không có tiếng Thụy Điển thì khó hiểu thông tin từ cơ quan nhà nước và khó lên tiếng ở nơi làm việc. " +
      "Nhưng học trên lớp thôi chưa đủ; cần nói tiếng Thụy Điển trong đời sống hàng ngày.\n\n" +
      "Việc làm là chìa khóa thứ hai. Công việc không chỉ cho thu nhập mà còn cho nếp sinh hoạt, đồng nghiệp và cảm giác đóng góp. " +
      "Nhiều người mới đến có bằng cấp ở quê nhà nhưng không được công nhận, khiến năng lực bị lãng phí.\n\n" +
      "Mạng lưới xã hội kết nối hai yếu tố trên. Ai có bạn bản xứ thì vừa luyện được tiếng vừa biết tin tuyển dụng.\n\n" +
      "Tôi đề xuất thành phố một mặt tổ chức thực tập ngôn ngữ tại nơi làm việc thật, mặt khác lập chương trình cố vấn để một cư dân lâu năm " +
      "gặp một người mới đến mỗi tháng một lần. Hai biện pháp này rẻ nhưng tạo khác biệt lớn.",
    wordCount: 168,
    grammarNotes: [
      { label: "dels... dels...", noteVi: "'dels... dels...' = một mặt... mặt khác - liên từ học thuật B1.", noteEn: "'dels... dels...' is an academic B1 correlative." },
      { label: "Câu bị động", noteVi: "'inte valideras', 'går förlorad' - bị động giúp giọng văn khách quan.", noteEn: "Passive forms create an objective tone." },
    ],
    highlights: [
      "Bàn đủ 3 khía cạnh đề yêu cầu và chỉ ra mối liên hệ giữa chúng.",
      "Hai đề xuất cho chính quyền rất cụ thể và khả thi.",
    ],
  },
  {
    id: "w-b1-opinion-remote-work",
    level: "B1",
    titleVi: "Bài nêu ý kiến: làm việc tại nhà",
    titleEn: "Opinion essay: remote work",
    essaySv:
      "Sedan pandemin har hemarbete blivit en självklar del av svenskt arbetsliv. Frågan är inte längre om det fungerar, utan hur mycket det bör användas.\n\n" +
      "En tydlig fördel är tiden. Den som slipper pendla en timme om dagen får fem timmar i veckan tillbaka och kan använda dem till familj, " +
      "träning eller vila. En annan fördel är att arbetsgivare kan anställa kompetens från hela landet, inte bara från storstäderna.\n\n" +
      "Det finns dock nackdelar. Nya medarbetare lär sig yrket långsammare när de inte kan fråga en kollega vid skrivbordet bredvid. " +
      "Dessutom suddas gränsen mellan arbete och fritid ut, och risken för utbrändhet ökar när datorn alltid står framme i vardagsrummet.\n\n" +
      "Min slutsats är att en hybridmodell fungerar bäst: två till tre dagar hemma och resten på kontoret. " +
      "Då behåller företaget både flexibiliteten och den sociala gemenskap som gör att människor trivs på jobbet.",
    essayVi:
      "Từ sau đại dịch, làm việc tại nhà đã thành phần hiển nhiên của đời sống lao động Thụy Điển. Câu hỏi không còn là nó có hiệu quả không, mà là nên dùng đến mức nào.\n\n" +
      "Ưu điểm rõ nhất là thời gian. Ai khỏi đi lại 1 tiếng/ngày sẽ có thêm 5 tiếng/tuần cho gia đình, tập luyện hoặc nghỉ ngơi. " +
      "Ưu điểm nữa là doanh nghiệp tuyển được nhân tài cả nước chứ không chỉ ở đô thị lớn.\n\n" +
      "Tuy nhiên cũng có nhược điểm. Nhân viên mới học nghề chậm hơn khi không thể hỏi đồng nghiệp bàn bên. " +
      "Ngoài ra ranh giới công việc và nghỉ ngơi bị xóa nhòa, nguy cơ kiệt sức tăng khi máy tính luôn nằm giữa phòng khách.\n\n" +
      "Kết luận của tôi là mô hình lai hiệu quả nhất: 2-3 ngày ở nhà, còn lại lên văn phòng. " +
      "Khi đó công ty giữ được cả sự linh hoạt lẫn tính cộng đồng khiến người ta gắn bó với công việc.",
    wordCount: 156,
    grammarNotes: [
      { label: "inte längre... utan...", noteVi: "'Frågan är inte längre om..., utan hur...' - cấu trúc phản đề mở bài rất mạnh.", noteEn: "'not... but...' contrast opening is powerful." },
      { label: "Bị động -s", noteVi: "'suddas ut' - bị động dạng -s dùng nhiều trong văn viết B1.", noteEn: "The -s passive is common in B1 written Swedish." },
    ],
    highlights: [
      "Đủ 2 ưu, 2 nhược và kết luận riêng, có số liệu minh họa (5 giờ/tuần).",
      "Kết luận đưa mô hình cụ thể chứ không nói chung chung.",
    ],
  },
  {
    id: "w-b1-blog-culture-shock",
    level: "B1",
    titleVi: "Blog: cú sốc văn hóa khi mới sang",
    titleEn: "Blog: culture shock arriving",
    essaySv:
      "Min första vecka i Sverige minns jag som en enda lång tystnad. Jag klev på bussen i Uppsala en måndagsmorgon och " +
      "satte mig bredvid en kvinna i min egen ålder. Hemma i Hanoi hade vi säkert börjat prata direkt, men här tittade alla rakt fram " +
      "eller ner i telefonen. Ingen sa ett ord.\n\n" +
      "Först kände jag mig avvisad och till och med lite ledsen. Jag trodde att svenskarna tyckte illa om mig. " +
      "Efter några månader förstod jag att tystnaden inte handlade om ovänlighet utan om respekt för andras utrymme.\n\n" +
      "Det jag lärde mig är att kulturkrockar sällan beror på att någon är elak. De uppstår när två helt rimliga vanor möts. " +
      "I dag pratar jag gärna med grannar i tvättstugan, men jag stör ingen på bussen - och jag är faktiskt tacksam för de tysta morgnarna.",
    essayVi:
      "Tuần đầu ở Thụy Điển với tôi là một sự im lặng kéo dài. Sáng thứ Hai tôi lên xe buýt ở Uppsala và " +
      "ngồi cạnh một phụ nữ trạc tuổi mình. Ở Hà Nội chắc chắn chúng tôi đã bắt chuyện ngay, nhưng ở đây ai cũng nhìn thẳng " +
      "hoặc cắm mặt vào điện thoại. Không ai nói một lời.\n\n" +
      "Ban đầu tôi thấy bị hắt hủi, thậm chí hơi buồn. Tôi tưởng người Thụy Điển không ưa mình. " +
      "Vài tháng sau tôi hiểu rằng sự im lặng đó không phải lạnh nhạt mà là tôn trọng không gian riêng của người khác.\n\n" +
      "Điều tôi học được là cú sốc văn hóa hiếm khi vì ai đó xấu tính. Nó xảy ra khi hai thói quen đều hợp lý gặp nhau. " +
      "Nay tôi vẫn vui vẻ nói chuyện với hàng xóm ở phòng giặt, nhưng không làm phiền ai trên xe buýt - và thật ra tôi biết ơn những buổi sáng yên tĩnh đó.",
    wordCount: 152,
    grammarNotes: [
      { label: "Quá khứ + quá khứ hoàn thành", noteVi: "'hade vi säkert börjat prata' - diễn tả điều đã xảy ra nếu ở quê nhà.", noteEn: "Past perfect for a hypothetical at home." },
      { label: "inte... utan...", noteVi: "'inte om ovänlighet utan om respekt' - cấu trúc đính chính hiểu lầm.", noteEn: "'not X but Y' corrects a misunderstanding." },
    ],
    highlights: [
      "Có tình huống cụ thể, cảm xúc và bài học - đúng 3 yêu cầu đề.",
      "Giọng blog cá nhân, câu dài ngắn xen kẽ tự nhiên.",
    ],
  },
  {
    id: "w-b1-argumentera-teknologi",
    level: "B1",
    titleVi: "Trẻ dưới 12 tuổi có nên dùng smartphone?",
    titleEn: "Should children use smartphones?",
    essaySv:
      "Bör barn under tolv år ha egna smartphones? Frågan splittrar både föräldrar och lärare.\n\n" +
      "De som är för brukar peka på tryggheten. Föräldrar kan nå barnet efter skolan och barnet kan ringa hem om bussen är försenad. " +
      "Ett annat argument är att digital kompetens tränas tidigt: barn lär sig söka information, använda kartor och samarbeta i skolappar.\n\n" +
      "De som är emot lyfter framför allt hälsan. Forskning visar att barn som har telefonen i sovrummet sover kortare tid. " +
      "Dessutom är barn under tolv sällan mogna att hantera näthat eller reklam som är riktad mot dem.\n\n" +
      "Min egen åsikt är att en telefon kan vara rimlig från ungefär tio års ålder, men bara med tydliga regler: " +
      "ingen telefon i sovrummet på natten, inga sociala medier före tretton och regelbundna samtal om vad barnet ser på nätet. " +
      "Ansvaret ligger alltså inte hos telefonen utan hos de vuxna runt barnet.",
    essayVi:
      "Trẻ dưới 12 tuổi có nên có điện thoại riêng? Câu hỏi này chia rẽ cả phụ huynh lẫn giáo viên.\n\n" +
      "Phe ủng hộ thường nói về sự an toàn. Bố mẹ liên lạc được với con sau giờ học, con gọi về nhà khi xe buýt trễ. " +
      "Lý lẽ nữa là năng lực số được rèn sớm: trẻ học tra thông tin, dùng bản đồ và làm việc nhóm qua app của trường.\n\n" +
      "Phe phản đối nhấn mạnh sức khỏe. Nghiên cứu cho thấy trẻ để điện thoại trong phòng ngủ ngủ ít hơn. " +
      "Hơn nữa trẻ dưới 12 hiếm khi đủ chín chắn để xử lý bắt nạt mạng hay quảng cáo nhắm vào chúng.\n\n" +
      "Ý kiến của tôi là khoảng 10 tuổi có thể dùng điện thoại, nhưng phải có quy tắc rõ: " +
      "không để điện thoại trong phòng ngủ ban đêm, không mạng xã hội trước 13 tuổi, và thường xuyên trò chuyện về những gì con xem. " +
      "Trách nhiệm vì vậy không nằm ở chiếc điện thoại mà ở người lớn quanh đứa trẻ.",
    wordCount: 158,
    grammarNotes: [
      { label: "De som är för/emot", noteVi: "'De som...' = những người mà... - mệnh đề quan hệ mở đoạn lập luận.", noteEn: "'De som...' relative clause opens each argument block." },
      { label: "framför allt / dessutom", noteVi: "Trạng ngữ nối giúp phân tầng lý lẽ, tăng điểm Coherence.", noteEn: "Linking adverbs layer the arguments and boost coherence." },
    ],
    highlights: [
      "Đủ 2 lý lẽ ủng hộ, 2 phản đối và kết luận cá nhân có điều kiện kèm theo.",
      "Kết bài chốt bằng câu 'inte hos telefonen utan hos de vuxna' rất mạnh.",
    ],
  },
  {
    id: "w-b1-formellt-brev",
    level: "B1",
    titleVi: "Thư khiếu nại chính thức tới công ty",
    titleEn: "Formal complaint letter to a company",
    essaySv:
      "Till kundtjänsten på NordTech AB\n\nÄrende: Reklamation av defekt hörlurar, ordernummer 47120\n\n" +
      "Den 12 februari beställde jag ett par hörlurar för 1 495 kronor via er webbplats. Varan levererades den 18 februari. " +
      "Redan efter tre dagar slutade den vänstra hörluren att fungera helt.\n\n" +
      "Jag kontaktade er via mejl den 22 februari och på nytt den 3 mars, men jag har ännu inte fått något svar. " +
      "Enligt konsumentköplagen har jag rätt att reklamera en vara med ursprungligt fel inom tre år, och säljaren ska svara inom skälig tid.\n\n" +
      "Jag kräver därför att ni återbetalar hela beloppet till mitt konto senast fjorton dagar efter detta brev. " +
      "Kopia på kvitto och tidigare mejl bifogas.\n\n" +
      "Om jag inte får svar kommer jag att anmäla ärendet till Allmänna reklamationsnämnden.\n\n" +
      "Med vänlig hälsning,\nMinh Tran\nTelefon: 070-123 45 67",
    essayVi:
      "Kính gửi bộ phận chăm sóc khách hàng NordTech AB\n\nV/v: Khiếu nại tai nghe lỗi, đơn số 47120\n\n" +
      "Ngày 12/2 tôi đặt một cặp tai nghe giá 1 495 kr qua website của quý công ty. Hàng giao ngày 18/2. " +
      "Chỉ sau ba ngày, tai trái ngừng hoạt động hoàn toàn.\n\n" +
      "Tôi đã gửi email ngày 22/2 và lần nữa ngày 3/3 nhưng chưa nhận được phản hồi nào. " +
      "Theo luật mua bán tiêu dùng, tôi có quyền khiếu nại hàng lỗi gốc trong ba năm và bên bán phải trả lời trong thời gian hợp lý.\n\n" +
      "Vì vậy tôi yêu cầu hoàn lại toàn bộ số tiền vào tài khoản của tôi chậm nhất 14 ngày sau thư này. " +
      "Bản sao hóa đơn và các email trước được đính kèm.\n\n" +
      "Nếu không nhận được hồi đáp, tôi sẽ khiếu nại lên Hội đồng khiếu nại tiêu dùng (ARN).\n\n" +
      "Trân trọng,\nMinh Trần\nĐiện thoại: 070-123 45 67",
    wordCount: 150,
    grammarNotes: [
      { label: "Ärende / bifogas", noteVi: "Từ vựng thư hành chính: 'Ärende' (v/v), 'bifogas' (được đính kèm - bị động).", noteEn: "Formal letter vocabulary: 'Ärende', passive 'bifogas'." },
      { label: "Enligt + luật", noteVi: "'Enligt konsumentköplagen' viện dẫn cơ sở pháp lý - tăng sức nặng.", noteEn: "Citing the law strengthens the claim." },
    ],
    highlights: [
      "Có dòng chủ đề, mốc ngày và số tiền cụ thể - chuẩn thư khiếu nại Thụy Điển.",
      "Nêu bước tiếp theo (ARN) nếu không được phản hồi.",
    ],
  },
  {
    id: "w-b1-recension",
    level: "B1",
    titleVi: "Đánh giá một cuốn sách hoặc bộ phim",
    titleEn: "Review of a book or film",
    essaySv:
      "Filmen 'En man som heter Ove' bygger på Fredrik Backmans roman och handlar om en bitter änkling i sextioårsåldern " +
      "som har bestämt sig för att avsluta sitt liv. Varje försök avbryts av grannarna, särskilt av den gravida Parvaneh, " +
      "som envist bjuder in honom i sitt kaotiska familjeliv.\n\n" +
      "Det starkaste med filmen är balansen mellan humor och sorg. Rolf Lassgård spelar Ove utan att göra honom till en karikatyr, " +
      "och tillbakablickarna till hans ungdom förklarar långsamt varför han blivit som han är.\n\n" +
      "Svagheten är tempot i mitten. Ett par scener upprepar samma poäng om Oves regler i bostadsområdet, " +
      "och filmen hade vunnit på att vara tio minuter kortare.\n\n" +
      "Trots det rekommenderar jag den varmt, särskilt för den som lär sig svenska: språket är vardagligt och tydligt, " +
      "och berättelsen säger mycket om hur ensamhet och grannskap fungerar i Sverige.",
    essayVi:
      "Phim 'Người đàn ông tên Ove' dựa trên tiểu thuyết của Fredrik Backman, kể về một ông góa vợ ngoài 60 " +
      "đã quyết định kết thúc cuộc đời. Mỗi lần định làm đều bị hàng xóm cắt ngang, nhất là Parvaneh đang mang thai, " +
      "người cứ khăng khăng kéo ông vào cuộc sống gia đình hỗn độn của cô.\n\n" +
      "Điểm mạnh nhất là sự cân bằng giữa hài hước và buồn bã. Rolf Lassgård diễn Ove mà không biến ông thành nhân vật biếm họa, " +
      "và những đoạn hồi tưởng thời trẻ dần lý giải vì sao ông trở nên như vậy.\n\n" +
      "Điểm yếu là nhịp phim ở giữa. Vài cảnh lặp lại cùng một ý về những quy tắc của Ove trong khu dân cư, " +
      "phim sẽ hay hơn nếu ngắn đi 10 phút.\n\n" +
      "Dù vậy tôi vẫn rất giới thiệu, đặc biệt với người học tiếng Thụy Điển: ngôn ngữ đời thường, rõ ràng, " +
      "và câu chuyện nói nhiều về sự cô đơn và tình làng xóm ở Thụy Điển.",
    wordCount: 150,
    grammarNotes: [
      { label: "Mệnh đề quan hệ 'som'", noteVi: "'en änkling ... som har bestämt sig' - mở rộng câu tự nhiên, tránh câu cụt.", noteEn: "'som' relative clauses extend sentences naturally." },
      { label: "hade vunnit på att", noteVi: "'filmen hade vunnit på att vara kortare' - giả định lịch sự khi phê bình.", noteEn: "Conditional perfect softens the criticism." },
    ],
    highlights: [
      "Đủ 4 phần: tóm tắt, điểm mạnh, điểm yếu, khuyến nghị.",
      "Khuyến nghị gắn với người học tiếng - góc nhìn riêng, không sáo rỗng.",
    ],
  },
];
