/**
 * @file swedishWritingPrompts.ts
 * @description YKI Ruotsi (Swedish) writing prompts per level. Each prompt
 *              includes Swedish task text, Vietnamese gloss, suggested
 *              word-count window and 3 starter phrases learners can re-use.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SwedishLevel = "A1" | "A2" | "B1";

export interface SwedishWritingPrompt {
  id: string;
  level: SwedishLevel;
  titleVi: string;
  titleEn: string;
  taskSv: string;
  taskVi: string;
  minWords: number;
  maxWords: number;
  starters: string[];
  tipVi: string;
}

export const SWEDISH_WRITING_PROMPTS: SwedishWritingPrompt[] = [
  // ───── A1 ─────
  {
    id: "w-a1-presentation",
    level: "A1",
    titleVi: "Tự giới thiệu (Presentation)",
    titleEn: "Self-introduction",
    taskSv: "Skriv en kort presentation om dig själv: namn, ålder, familj, var du bor, vad du gör och dina intressen.",
    taskVi: "Viết đoạn giới thiệu ngắn về bản thân: tên, tuổi, gia đình, nơi ở, công việc và sở thích.",
    minWords: 40, maxWords: 80,
    starters: ["Hej, jag heter ___ och jag är ___ år gammal.", "Jag bor i ___ med min familj.", "På fritiden gillar jag att ___."],
    tipVi: "Mục tiêu A1: 5–6 câu đơn, mỗi câu một ý. Tránh nối dài.",
  },
  {
    id: "w-a1-postcard",
    level: "A1",
    titleVi: "Viết bưu thiếp từ chuyến đi",
    titleEn: "Postcard from a trip",
    taskSv: "Skriv ett vykort till en vän. Berätta var du är, hur vädret är, vad du gör och när du kommer hem.",
    taskVi: "Viết bưu thiếp cho một người bạn: bạn đang ở đâu, thời tiết thế nào, đang làm gì và khi nào về.",
    minWords: 35, maxWords: 70,
    starters: ["Hej från ___! Vädret är ___.", "Idag åker vi till ___.", "Jag kommer hem på ___."],
    tipVi: "A1: dùng thì hiện tại + 'ska' cho tương lai gần. Đừng dùng quá khứ.",
  },
  // ───── A2 ─────
  {
    id: "w-a2-leave-email",
    level: "A2",
    titleVi: "Email xin nghỉ phép gửi sếp",
    titleEn: "Leave-of-absence email",
    taskSv: "Skriv ett mejl till din chef Anna. Du behöver vara ledig på fredag eftersom du måste till läkaren. Förklara, föreslå en lösning och be om svar.",
    taskVi: "Gửi email cho sếp Anna. Bạn cần nghỉ thứ sáu vì phải đi khám. Giải thích, đề xuất giải pháp và đợi phản hồi.",
    minWords: 60, maxWords: 100,
    starters: ["Hej Anna,", "Jag måste tyvärr vara ledig på fredag eftersom ___.", "Jag föreslår att ___."],
    tipVi: "A2: dùng kính ngữ 'Hej Anna,' / 'Med vänliga hälsningar' + 'eftersom' kích hoạt BIFF.",
  },
  {
    id: "w-a2-housing",
    level: "A2",
    titleVi: "Trả lời quảng cáo cho thuê căn hộ",
    titleEn: "Replying to a flat ad",
    taskSv: "Du har sett en annons om en lägenhet i Vasa. Skriv ett mejl till hyresvärden. Presentera dig, fråga om hyran, datum för inflyttning och om husdjur är tillåtna.",
    taskVi: "Viết email cho chủ trọ ở Vasa: giới thiệu bản thân, hỏi giá thuê, ngày vào ở và có cho nuôi thú không.",
    minWords: 60, maxWords: 100,
    starters: ["Hej,", "Jag heter ___ och jag är intresserad av lägenheten i Vasa.", "Kan jag fråga om ___?"],
    tipVi: "Hỏi 3 thứ cụ thể (giá, ngày, thú cưng) — tiêu chí Task Fulfilment A2.",
  },
  // ───── B1 ─────
  {
    id: "w-b1-opinion-climate",
    level: "B1",
    titleVi: "Thư kiến nghị: hạn chế ô tô trong thành phố",
    titleEn: "Opinion letter: car restrictions downtown",
    taskSv: "Skriv en insändare till Hufvudstadsbladet. Argumentera för eller emot förslaget att förbjuda privatbilar i centrala Helsingfors. Använd minst två argument och en motargument.",
    taskVi: "Viết thư bạn đọc gửi báo Hufvudstadsbladet — đồng tình hoặc phản đối việc cấm ô tô tư nhân ở trung tâm Helsinki. Ít nhất 2 luận điểm + 1 phản biện.",
    minWords: 120, maxWords: 200,
    starters: ["Jag vill kommentera förslaget om ___.", "Å ena sidan ___, å andra sidan ___.", "Sammanfattningsvis tycker jag att ___."],
    tipVi: "B1: cấu trúc 'å ena sidan / å andra sidan / sammanfattningsvis' đảm bảo đủ 3 đoạn opinion.",
  },
  {
    id: "w-b1-digital-life",
    level: "B1",
    titleVi: "Tiểu luận: Mạng xã hội và giới trẻ",
    titleEn: "Essay: social media and youth",
    taskSv: "Skriv en kort uppsats: 'Sociala medier — fördelar och nackdelar för ungdomar'. Ge minst tre exempel och en rekommendation.",
    taskVi: "Viết tiểu luận ngắn: 'Mạng xã hội — lợi và hại đối với giới trẻ'. Ít nhất 3 ví dụ và 1 khuyến nghị.",
    minWords: 130, maxWords: 220,
    starters: ["Sociala medier är en stor del av ungdomars liv.", "En fördel är att ___ men en nackdel är att ___.", "Jag rekommenderar att ___."],
    tipVi: "Dùng 'trots att' / 'eftersom' để chứng minh khả năng BIFF — tiêu chí Grammar B1.",
  },
  // ───── A1 extra ─────
  {
    id: "w-a1-restaurant",
    level: "A1",
    titleVi: "Đặt bàn ở nhà hàng",
    titleEn: "Booking a table at a restaurant",
    taskSv: "Skriv ett mejl eller ett meddelande till restaurangen 'Kvarnen'. Du vill boka ett bord för fyra personer på lördag klockan 19. Berätta att en person är vegetarian och fråga om de har barnstol.",
    taskVi: "Viết email hoặc tin nhắn cho nhà hàng 'Kvarnen'. Bạn muốn đặt bàn 4 người thứ Bảy lúc 19h. Nói có một người ăn chay và hỏi có ghế trẻ em không.",
    minWords: 35, maxWords: 70,
    starters: ["Hej, jag vill boka ett bord för ___ personer på ___.", "En av oss är vegetarian.", "Har ni barnstol?"],
    tipVi: "A1: 4 câu — chào, đặt bàn, yêu cầu đặc biệt, hỏi ghế trẻ. Đừng quên 'tack' ở cuối.",
  },
  {
    id: "w-a1-describe-home",
    level: "A1",
    titleVi: "Mô tả ngôi nhà / căn hộ của bạn",
    titleEn: "Describing your home",
    taskSv: "Skriv en kort text om din lägenhet eller ditt hus. Berätta hur många rum det finns, vad du har i vardagsrummet och vad du tycker om ditt kök.",
    taskVi: "Viết đoạn ngắn về căn hộ hoặc nhà của bạn. Kể có bao nhiêu phòng, phòng khách có gì, và bạn thấy sao về nhà bếp.",
    minWords: 40, maxWords: 75,
    starters: ["Jag bor i en ___ med ___ rum.", "I vardagsrummet finns ___.", "Jag tycker att köket är ___ eftersom ___."],
    tipVi: "A1: dùng 'det finns' (có) và 'i' (ở trong) để chỉ vị trí đồ vật — đủ điểm Vocabulary.",
  },
  // ───── A2 extra ─────
  {
    id: "w-a2-cinema",
    level: "A2",
    titleVi: "Mời bạn đi xem phim",
    titleEn: "Inviting a friend to the cinema",
    taskSv: "Skriv ett mejl till din kompis Erik. Du har två biljetter till en film på biograf på fredag kväll. Bjud in honom, berätta vad filmen handlar om och föreslå att ni äter middag tillsammans före filmen.",
    taskVi: "Viết email mời bạn Erik. Bạn có 2 vé xem phim rạp tối thứ Sáu. Mời cậu ấy, kể phim nói về gì, và đề xuất ăn tối trước khi xem.",
    minWords: 60, maxWords: 100,
    starters: ["Hej Erik! Jag har två biljetter till ___ på fredag.", "Filmen handlar om ___.", "Vill du äta middag tillsammans innan?"],
    tipVi: "A2: dùng 'handlar om' để tóm tắt nội dung — cấu trúc hữu ích cho cả viết và nói.",
  },
  {
    id: "w-a2-holiday",
    level: "A2",
    titleVi: "Kể về một ngày lễ truyền thống",
    titleEn: "Describing a traditional holiday",
    taskSv: "Skriv en kort text om en högtid som du firar i ditt hemland. När firar ni den? Vad äter ni? Vad gör familjen tillsammans?",
    taskVi: "Viết đoạn ngắn về một lễ hội bạn ăn mừng ở quê nhà. Khi nào tổ chức? Ăn gì? Gia đình làm gì cùng nhau?",
    minWords: 60, maxWords: 100,
    starters: ["I mitt hemland firar vi ___.", "Vi firar den den ___ varje år.", "På kvällen samlas familjen och ___.", "Vi äter traditionell mat som ___."],
    tipVi: "A2: dùng 'varje år' và 'på kvällen' ở đầu câu để kích hoạt V2 inversion nhẹ.",
  },
  // ───── B1 extra ─────
  {
    id: "w-b1-library",
    level: "B1",
    titleVi: "Thư kiến nghị: cải thiện thư viện địa phương",
    titleEn: "Opinion letter: improving the local library",
    taskSv: "Skriv en insändare till Hufvudstadsbladet. Du tycker att stadsbiblioteket i ditt område behöver förbättras. Argumentera för minst två förändringar (t.ex. öppettider, böcker på olika språk, studierum) och förklara varför de är viktiga för invånarna.",
    taskVi: "Viết thư bạn đọc gửi báo Hufvudstadsbladet. Bạn cho rằng thư viện thành phố ở khu bạn cần cải thiện. Tranh luận ít nhất 2 thay đổi (vd: giờ mở cửa, sách đa ngôn ngữ, phòng học) và giải thích tại sao quan trọng.",
    minWords: 120, maxWords: 200,
    starters: ["Jag vill lyfta frågan om ___.", "För det första behöver vi ___ eftersom ___.", "För det andra ___.", "Sammanfattningsvis anser jag att ___."],
    tipVi: "B1: đề cập đến lợi ích cộng đồng ('för invånarna') — nâng tầm tranh luận lên tầm xã hội.",
  },
  {
    id: "w-b1-remote-work",
    level: "B1",
    titleVi: "Tiểu luận: Làm việc từ xa",
    titleEn: "Essay: remote work",
    taskSv: "Skriv en kort uppsats: 'Distansarbete — för- och nackdelar'. Ge minst tre exempel på varför människor vill jobba hemifrån, två nackdelar och en rekommendation till arbetsgivare.",
    taskVi: "Viết tiểu luận ngắn: 'Làm việc từ xa — lợi và hại'. Đưa ít nhất 3 lý do người ta muốn làm việc ở nhà, 2 bất lợi, và 1 khuyến nghị cho nhà tuyển dụng.",
    minWords: 130, maxWords: 220,
    starters: ["Distansarbete har blivit allt vanligare sedan pandemin.", "En fördel är att ___ men en nackdel är att ___.", "Därför rekommenderar jag att arbetsgivare ___."],
    tipVi: "B1: dùng 'sedan pandemin' để tạo bối cảnh thời sự — từ vựng học thuật + thực tế.",
  },
  // ───── A1 expansion v2 ─────
  {
    id: "w-a1-shopping-list",
    level: "A1",
    titleVi: "Tin nhắn mua đồ siêu thị",
    titleEn: "Grocery shopping message",
    taskSv: "Skriv ett SMS till din sambo. Du är på ICA. Fråga vad ni behöver köpa, föreslå middag och berätta när du kommer hem.",
    taskVi: "Nhắn SMS cho bạn đời. Bạn đang ở ICA. Hỏi cần mua gì, đề xuất món tối, và nói mấy giờ về nhà.",
    minWords: 30, maxWords: 60,
    starters: ["Hej, jag är på ICA.", "Vad behöver vi köpa?", "Jag tänkte göra ___ till middag.", "Jag är hemma klockan ___."],
    tipVi: "A1: viết 4 câu tách rời. Dùng 'jag tänkte' (định) để nói kế hoạch gần.",
  },
  {
    id: "w-a1-doctor-form",
    level: "A1",
    titleVi: "Điền lý do đến gặp bác sĩ",
    titleEn: "Filling a doctor reason form",
    taskSv: "Skriv en kort text till vårdcentralen: vad heter du, hur gammal du är, vad du har för symptom (huvudvärk, feber, hosta) och sedan när.",
    taskVi: "Viết đoạn ngắn gửi trạm y tế: tên, tuổi, triệu chứng (đau đầu, sốt, ho) và bị từ khi nào.",
    minWords: 35, maxWords: 70,
    starters: ["Jag heter ___ och jag är ___ år gammal.", "Jag har ___ sedan ___.", "Jag känner mig ___."],
    tipVi: "A1: dùng 'sedan' (từ khi) + thời gian. Cấu trúc lặp 'jag har + bệnh' rất an toàn.",
  },
  // ───── A2 expansion v2 ─────
  {
    id: "w-a2-complaint",
    level: "A2",
    titleVi: "Khiếu nại đơn hàng online",
    titleEn: "Complaint about an online order",
    taskSv: "Skriv ett mejl till kundtjänsten på en webbshop. Din beställning kom för sent och en produkt var trasig. Beskriv problemet, vad du vill att de gör och be om svar inom en vecka.",
    taskVi: "Email cho chăm sóc khách hàng của shop online: đơn đến trễ, một món bị hỏng. Mô tả vấn đề, đề xuất giải pháp, đòi phản hồi trong 1 tuần.",
    minWords: 70, maxWords: 110,
    starters: ["Hej,", "Jag beställde ___ den ___ men ___.", "Jag vill att ni ___.", "Jag förväntar mig svar inom en vecka."],
    tipVi: "A2: dùng 'jag vill att ni + verb' để yêu cầu lịch sự. Câu cuối đặt deadline rõ.",
  },
  {
    id: "w-a2-job-interest",
    level: "A2",
    titleVi: "Thư bày tỏ quan tâm việc làm",
    titleEn: "Letter of interest for a job",
    taskSv: "Du har sett en annons om sommarjobb på ett kafé. Skriv ett kort mejl: presentera dig, berätta varför du är intresserad, vilken erfarenhet du har och när du kan börja.",
    taskVi: "Bạn thấy tin tuyển job hè ở quán cà phê. Viết email ngắn: giới thiệu, lý do quan tâm, kinh nghiệm, có thể bắt đầu khi nào.",
    minWords: 70, maxWords: 110,
    starters: ["Hej,", "Jag heter ___ och jag är intresserad av sommarjobbet.", "Jag har erfarenhet av ___.", "Jag kan börja den ___."],
    tipVi: "A2: 'erfarenhet av + danh từ' là cấu trúc cực phổ biến trong xin việc.",
  },
  // ───── B1 expansion v2 ─────
  {
    id: "w-b1-public-transport",
    level: "B1",
    titleVi: "Thư kiến nghị: cải thiện giao thông công cộng",
    titleEn: "Opinion: improving public transport",
    taskSv: "Skriv en insändare om kollektivtrafiken i din stad. Vad fungerar bra, vad fungerar dåligt och vilka två konkreta åtgärder föreslår du? Avsluta med varför detta är viktigt för miljön.",
    taskVi: "Viết thư bạn đọc về giao thông công cộng ở thành phố bạn: gì tốt, gì tệ, đề xuất 2 hành động cụ thể. Kết bằng vì sao điều này quan trọng với môi trường.",
    minWords: 130, maxWords: 220,
    starters: ["Kollektivtrafiken i ___ fungerar ___.", "Det största problemet är att ___.", "Jag föreslår två åtgärder: för det första ___, för det andra ___.", "Detta är viktigt eftersom ___."],
    tipVi: "B1: cấu trúc 'för det första … för det andra' + kết nối với 'eftersom' = trọn điểm Coherence.",
  },
  {
    id: "w-b1-screen-time",
    level: "B1",
    titleVi: "Tiểu luận: trẻ em và thời gian dùng màn hình",
    titleEn: "Essay: children and screen time",
    taskSv: "Skriv en kort uppsats: 'Hur mycket skärmtid är lagom för barn?'. Diskutera minst två risker, två fördelar och ge en konkret rekommendation till föräldrar.",
    taskVi: "Viết tiểu luận ngắn: 'Bao nhiêu thời gian dùng màn hình là vừa cho trẻ?'. Bàn ít nhất 2 rủi ro, 2 lợi ích và 1 khuyến nghị cụ thể cho phụ huynh.",
    minWords: 140, maxWords: 220,
    starters: ["Skärmtid är en aktuell fråga för många familjer.", "Å ena sidan ___, å andra sidan ___.", "Forskning visar att ___.", "Min rekommendation till föräldrar är att ___."],
    tipVi: "B1: 'forskning visar att' nâng tầm văn phong sang học thuật — điểm Vocabulary cao.",
  },
  // ───── A1 expansion v3 ─────
  {
    id: "w-a1-thank-you",
    level: "A1",
    titleVi: "Thư cảm ơn sau bữa tối",
    titleEn: "Thank-you note after dinner",
    taskSv: "Skriv ett kort meddelande till din vän Lisa. Tacka för middagen i går, säg vad du tyckte om maten och bjud in henne hem till dig nästa vecka.",
    taskVi: "Viết tin nhắn ngắn cho bạn Lisa: cảm ơn bữa tối hôm qua, nói bạn thích món gì, và mời cô ấy sang nhà bạn tuần sau.",
    minWords: 30, maxWords: 60,
    starters: ["Hej Lisa,", "Tack så mycket för middagen i går!", "Jag tyckte mycket om ___.", "Vill du komma hem till mig på ___?"],
    tipVi: "A1: cấu trúc 'tack för + danh từ' là vàng. Đừng quên kết bằng câu mời.",
  },
  {
    id: "w-a1-lost-item",
    level: "A1",
    titleVi: "Thông báo mất đồ trên xe buýt",
    titleEn: "Lost item on the bus",
    taskSv: "Skriv ett kort meddelande till SL:s kundtjänst. Du har glömt en svart väska på buss nummer fyrtiotvå klockan åtta i morse. Beskriv väskan och hur du kan kontaktas.",
    taskVi: "Viết tin nhắn cho chăm sóc khách hàng SL: bạn để quên túi đen trên xe buýt số 42 lúc 8h sáng nay. Mô tả túi và cách liên hệ.",
    minWords: 35, maxWords: 70,
    starters: ["Hej,", "Jag har glömt en svart väska på buss ___.", "Inuti finns ___.", "Ni kan kontakta mig på ___."],
    tipVi: "A1: 'jag har glömt' (perfekt) cho hành động vừa xảy ra. Mô tả 1 thứ trong túi để chứng minh là của mình.",
  },
  // ───── A2 expansion v3 ─────
  {
    id: "w-a2-neighbor-noise",
    level: "A2",
    titleVi: "Ghi chú cho hàng xóm về tiếng ồn",
    titleEn: "Note to a noisy neighbour",
    taskSv: "Skriv en vänlig lapp till din granne. Det har varit mycket hög musik från lägenheten på kvällarna. Förklara problemet, föreslå en lösning och avsluta vänligt.",
    taskVi: "Viết mảnh giấy lịch sự cho hàng xóm: nhạc rất to vào các buổi tối. Giải thích vấn đề, đề xuất giải pháp, kết bằng giọng thân thiện.",
    minWords: 60, maxWords: 100,
    starters: ["Hej granne,", "Jag har märkt att ___.", "Skulle det vara möjligt att ___?", "Tack på förhand och ha en bra dag!"],
    tipVi: "A2: 'skulle det vara möjligt att…' là khuôn lịch sự cao điểm Politeness. Né 'du måste'.",
  },
  {
    id: "w-a2-online-review",
    level: "A2",
    titleVi: "Đánh giá nhà hàng trên Google",
    titleEn: "Google review of a restaurant",
    taskSv: "Skriv en recension om en restaurang du nyligen besökt. Berätta var den ligger, vad du åt, hur servicen var och om du rekommenderar den.",
    taskVi: "Viết review về một nhà hàng bạn vừa ăn: ở đâu, ăn gì, dịch vụ thế nào, có giới thiệu không.",
    minWords: 70, maxWords: 110,
    starters: ["Jag besökte ___ förra veckan.", "Jag åt ___ och drack ___.", "Servicen var ___.", "Jag rekommenderar restaurangen om ___."],
    tipVi: "A2: dùng 4 ý — địa điểm, món, dịch vụ, gợi ý. Cấu trúc 'om + điều kiện' nâng cấp.",
  },
  // ───── B1 expansion v3 ─────
  {
    id: "w-b1-volunteer",
    level: "B1",
    titleVi: "Đơn xin làm tình nguyện viên",
    titleEn: "Volunteer application letter",
    taskSv: "Skriv ett brev till Röda Korset där du ansöker om att bli volontär. Beskriv dina motiv, vilka erfarenheter du har, hur mycket tid du kan ge per vecka och vilka områden som intresserar dig mest.",
    taskVi: "Viết thư gửi Hội Chữ thập đỏ Thụy Điển xin làm tình nguyện viên: động cơ, kinh nghiệm, thời gian mỗi tuần, lĩnh vực quan tâm.",
    minWords: 130, maxWords: 200,
    starters: ["Hej,", "Jag heter ___ och jag är intresserad av att bli volontär hos Röda Korset.", "Min motivation är ___.", "Tidigare har jag ___.", "Jag kan bidra med ___ timmar per vecka."],
    tipVi: "B1: 4 đoạn rõ — giới thiệu, động cơ, kinh nghiệm, cam kết thời gian. Cấu trúc thư trang trọng.",
  },
  {
    id: "w-b1-immigrant-integration",
    level: "B1",
    titleVi: "Tiểu luận: Hội nhập của người nhập cư",
    titleEn: "Essay: integration of immigrants",
    taskSv: "Skriv en kort uppsats: 'Vad är viktigast för en lyckad integration i Sverige?'. Diskutera språk, arbete, sociala nätverk och föreslå två åtgärder som kommunen kan ta.",
    taskVi: "Tiểu luận ngắn: 'Yếu tố quan trọng nhất cho hội nhập thành công ở Thụy Điển?'. Bàn về ngôn ngữ, việc làm, mạng xã hội, đề xuất 2 hành động cho địa phương.",
    minWords: 140, maxWords: 220,
    starters: ["Integration är en av de viktigaste frågorna i dagens Sverige.", "Enligt min åsikt är språket ___.", "Dessutom spelar arbete en avgörande roll eftersom ___.", "Kommunen kan bidra genom att ___."],
    tipVi: "B1: 'spelar en avgörande roll' + 'enligt min åsikt' = collocation học thuật B1.",
  },
];

// ─── Expansion: additional prompts pulled from expansion file ───
import { SWEDISH_WRITING_PROMPTS_EXPANSION } from "./swedishWritingPromptsExpansion";
SWEDISH_WRITING_PROMPTS.push(...SWEDISH_WRITING_PROMPTS_EXPANSION);

// ─── Expansion 2: additional prompts ───
import { SWEDISH_WRITING_PROMPTS_EXPANSION_2 } from "./swedishWritingPromptsExpansion2";
SWEDISH_WRITING_PROMPTS.push(...SWEDISH_WRITING_PROMPTS_EXPANSION_2);
