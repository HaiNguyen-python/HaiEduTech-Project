/**
 * @file swedishSampleEssays.ts
 * @description Model answers (bài viết mẫu) for every prompt in the Swedish Writing Lab.
 *              Each sample includes the Swedish text, Vietnamese gloss, grammar notes
 *              and Band-equivalent commentary so learners can imitate structure.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface SwedishSampleEssay {
  id: string;
  level: "A1" | "A2" | "B1";
  titleVi: string;
  titleEn: string;
  essaySv: string;
  essayVi: string;
  wordCount: number;
  grammarNotes: { label: string; noteVi: string; noteEn: string }[];
  highlights: string[];
}

export const SWEDISH_SAMPLE_ESSAYS: SwedishSampleEssay[] = [
  // ───────────────────────────── A1 ─────────────────────────────
  {
    id: "w-a1-presentation",
    level: "A1",
    titleVi: "Tự giới thiệu (Presentation)",
    titleEn: "Self-introduction",
    essaySv:
      "Hej! Jag heter Minh och jag är 26 år gammal. " +
      "Jag kommer från Vietnam men nu bor jag i Helsingfors med min fru och vår lilla dotter. " +
      "Jag jobbar som dataingenjör på ett finskt företag. " +
      "På fritiden gillar jag att laga mat och spela gitarr. " +
      "Jag tycker att svenska är ett vackert språk och jag vill lära mig det för att integrera mig bättre i Finland.",
    essayVi:
      "Xin chào! Tôi tên Minh và tôi 26 tuổi. " +
      "Tôi đến từ Việt Nam nhưng bây giờ tôi sống ở Helsinki với vợ và con gái nhỏ của chúng tôi. " +
      "Tôi làm kỹ sư dữ liệu tại một công ty Phần Lan. " +
      "Lúc rảnh tôi thích nấu ăn và chơi guitar. " +
      "Tôi thấy tiếng Thụy Điển là một ngôn ngữ đẹp và tôi muốn học nó để hội nhập tốt hơn ở Phần Lan.",
    wordCount: 52,
    grammarNotes: [
      { label: "Jag heter / Jag är", noteVi: "Cấu trúc giới thiệu cơ bản A1 — luôn bắt đầu bằng chủ ngữ + động từ.", noteEn: "Basic A1 introduction pattern — always Subject + Verb." },
      { label: "men / och", noteVi: "Liên từ đơn giản nối hai mệnh đề độc lập, đủ điểm Coherence A1.", noteEn: "Simple coordinators join two independent clauses, enough for A1 Coherence." },
      { label: "att + nguyên mẫu", noteVi: "'gillar att laga' = thích + to-infinitive — động từ tâm lý A1 kinh điển.", noteEn: "'gillar att laga' = like + to-infinitive — classic A1 mental-state verb." },
    ],
    highlights: [
      "Dùng đủ 5 thông tin yêu cầu: tên, tuổi, gia đình, nơi ở, công việc, sở thích.",
      "Câu cuối nêu lý do học tiếng Thụy Điển — tạo ấn tượng tích cực với giám khảo.",
      "Mỗi câu một ý, không nối dài — đúng tiêu chí Task Fulfilment A1.",
    ],
  },
  {
    id: "w-a1-postcard",
    level: "A1",
    titleVi: "Viết bưu thiếp từ chuyến đi",
    titleEn: "Postcard from a trip",
    essaySv:
      "Hej från Åbo! Vädret är jättefint och soligt. " +
      "Jag bor på ett litet hotell nära ån. " +
      "Idag åker vi till slottet och imorgon ska vi besöka marknaden. " +
      "Maten här är god, speciellt fisken. " +
      "Jag köpte en vacker tröja till dig. " +
      "Jag kommer hem på söndag kväll. Vi ses snart! Kram, Minh",
    essayVi:
      "Chào từ Turku! Thời tiết rất đẹp và nắng. " +
      "Tôi ở một khách sạn nhỏ gần sông. " +
      "Hôm nay chúng tôi đi lâu đài và ngày mai chúng tôi sẽ thăm chợ. " +
      "Đồ ăn ở đây ngon, đặc biệt là cá. " +
      "Tôi mua một chiếc áo len đẹp cho bạn. " +
      "Tôi về nhà tối Chủ nhật. Hẹn gặp lại sớm! Thân, Minh",
    wordCount: 48,
    grammarNotes: [
      { label: "ska + infinitiv", noteVi: "'ska besöka' diễn tả kế hoạch tương lai gần — công thức A1 an toàn.", noteEn: "'ska besöka' expresses a near-future plan — a safe A1 formula." },
      { label: "en / ett", noteVi: "'ett litet hotell' (ett + tính từ + danh từ) — nhớ chia tính từ theo giống ett.", noteEn: "'ett litet hotell' (ett + adj + noun) — remember ett-form adjective agreement." },
      { label: "på + dag", noteVi: "'på söndag' = vào Chủ nhật — giới từ thời gian điển hình A1.", noteEn: "'på söndag' = on Sunday — classic A1 time preposition." },
    ],
    highlights: [
      "Trả lời đủ 4 yêu cầu đề: đang ở đâu, thời tiết, làm gì, khi nào về.",
      "Dùng 'ska' thay vì quá khứ — tránh lỗi thì phức tạp ở A1.",
      "Giọng điệu thân mật, đúng format bưu thiếp ngắn.",
    ],
  },
  // ───────────────────────────── A2 ─────────────────────────────
  {
    id: "w-a2-leave-email",
    level: "A2",
    titleVi: "Email xin nghỉ phép gửi sếp",
    titleEn: "Leave-of-absence email",
    essaySv:
      "Hej Anna,\n\n" +
      "Jag hoppas att allt är bra med dig. " +
      "Jag skriver för att berätta att jag tyvärr måste vara ledig på fredag " +
      "eftersom jag har en viktig tid hos läkaren på vårdcentralen klockan nio på morgonen. " +
      "Jag har redan förberett det mesta av veckans arbete " +
      "och jag föreslår att jag kommer till kontoret på lördag förmiddag " +
      "för att slutföra den sista rapporten. " +
      "Det tar ungefär två timmar och jag kan börja redan klockan åtta om det passar. " +
      "Jag beklagar verkligen besväret och jag hoppas att det är okej. " +
      "Jag väntar på ditt svar och tackar på förhand för din förståelse.\n\n" +
      "Med vänliga hälsningar,\nMinh",
    essayVi:
      "Chào Anna,\n\n" +
      "Tôi hy vọng mọi việc đều tốt với bạn. " +
      "Tôi viết để báo rằng tiếc là tôi phải nghỉ thứ Sáu " +
      "vì tôi có một cuộc hẹn quan trọng với bác sĩ tại trung tâm y tế lúc 9 giờ sáng. " +
      "Tôi đã chuẩn bị phần lớn công việc trong tuần " +
      "và tôi đề xuất rằng tôi sẽ đến văn phòng sáng thứ Bảy " +
      "để hoàn thành báo cáo cuối cùng. " +
      "Việc đó mất khoảng hai tiếng và tôi có thể bắt đầu từ 8 giờ nếu được. " +
      "Tôi thực sự xin lỗi vì sự bất tiện và hy vọng điều này ổn. " +
      "Tôi đợi phản hồi của bạn và cảm ơn trước vì sự thông cảm.\n\n" +
      "Trân trọng,\nMinh",
    wordCount: 89,
    grammarNotes: [
      { label: "eftersom (BIFF)", noteVi: "'eftersom' kích hoạt đảo ngữ BIFF: phụ trợ 'måste' đứng trước chủ ngữ 'jag'.", noteEn: "'eftersom' triggers BIFF inversion: auxiliary 'måste' moves before subject 'jag'." },
      { label: "att + sats (indirekt tal)", noteVi: "'föreslår att jag kommer' = mệnh đề gián tiếp với chủ ngữ + động từ thường (không đảo).", noteEn: "'föreslår att jag kommer' = indirect clause with normal S+V order (no inversion)." },
      { label: "om det passar", noteVi: "Mệnh đề điều kiện lịch sự A2 — thể hiện tính linh hoạt và tôn trọng.", noteEn: "Polite A2 conditional clause — shows flexibility and respect." },
    ],
    highlights: [
      "Có đủ 3 yếu tố A2: giải thích lý do, đề xuất giải pháp, yêu cầu phản hồi.",
      "Dùng kính ngữ chuẩn 'Med vänliga hälsningar' — tiêu chí Register A2.",
      "Cấu trúc 'tackar på förhand' là cụm lịch sự cao cấp, ghi điểm Vocabulary.",
    ],
  },
  {
    id: "w-a2-housing",
    level: "A2",
    titleVi: "Trả lời quảng cáo cho thuê căn hộ",
    titleEn: "Replying to a flat ad",
    essaySv:
      "Hej,\n\n" +
      "Jag heter Minh Nguyen och jag är intresserad av lägenheten i Vasa " +
      "som du annonserade på Blocket förra veckan. " +
      "Jag jobbar som mjukvaruingenjör vid ett teknologiföretag " +
      "och jag har redan bott i Vasa i två år, så jag känner till staden väl. " +
      "Kan jag fråga om hur mycket hyran är per månad och om värmen ingår i hyran? " +
      "Och när är det möjligt att flytta in? " +
      "Jag har också en katt som heter Luna och hon är mycket lugn och renlig. " +
      "Är husdjur tillåtna i lägenheten? " +
      "Jag skulle vara väldigt tacksam för ett snabbt svar " +
      "eftersom jag behöver flytta i slutet av månaden.\n\n" +
      "Med vänliga hälsningar,\nMinh Nguyen",
    essayVi:
      "Chào,\n\n" +
      "Tôi tên Minh Nguyen và tôi quan tâm đến căn hộ ở Vasa " +
      "mà bạn đăng quảng cáo trên Blocket tuần trước. " +
      "Tôi làm kỹ sư phần mềm tại một công ty công nghệ " +
      "và tôi đã sống ở Vasa được hai năm, nên tôi rất hiểu thành phố. " +
      "Tôi có thể hỏi giá thuê hàng tháng là bao nhiêu và tiền sưởi có bao gồm không? " +
      "Và khi nào có thể vào ở? " +
      "Tôi cũng có một con mèo tên Luna và nó rất ngoan và sạch sẽ. " +
      "Có cho nuôi thú cưng trong căn hộ không? " +
      "Tôi sẽ rất biết ơn nếu nhận được phản hồi nhanh " +
      "vì tôi cần chuyển nhà vào cuối tháng.\n\n" +
      "Trân trọng,\nMinh Nguyen",
    wordCount: 98,
    grammarNotes: [
      { label: "som + relativsats", noteVi: "'som du annonserade' — đại từ quan hệ nối danh từ với mệnh đề, mở rộng A2.", noteEn: "'som du annonserade' — relative pronoun linking noun to clause, A2 expansion." },
      { label: "eftersom + BIFF", noteVi: "'eftersom jag behöver flytta' — lý do ở cuối thư với đảo ngữ nhẹ (BIFF không rõ vì không có trợ động từ).", noteEn: "'eftersom jag behöver flytta' — reason at the end with no auxiliary, so no visible inversion." },
      { label: "Kan jag fråga om…?", noteVi: "Cấu trúc hỏi lịch sự A2 — tránh câu hỏi trực tiếp thô lỗ.", noteEn: "Polite A2 question frame — avoids blunt direct questions." },
    ],
    highlights: [
      "Hỏi đúng 3 thông tin: giá thuê, ngày vào ở, thú cưng — đạt Task Fulfilment tối đa.",
      "Giới thiệu bản thân + lý do ổn định (2 năm ở Vasa) — tạo niềm tin với chủ nhà.",
      "Mô tả thú cưng 'lugn och renlig' — giảm lo ngại của chủ trọ một cách khéo léo.",
    ],
  },
  // ───────────────────────────── B1 ─────────────────────────────
  {
    id: "w-b1-opinion-climate",
    level: "B1",
    titleVi: "Thư kiến nghị: hạn chế ô tô trong thành phố",
    titleEn: "Opinion letter: car restrictions downtown",
    essaySv:
      "Jag vill kommentera förslaget om att förbjuda privatbilar i centrala Helsingfors. " +
      "Å ena sidan är det ett utmärkt sätt att minska avgaser och buller i centrum, " +
      "vilket skulle göra staden renare, säkrare och trevligare för fotgängare och cyklister. " +
      "Dessutom skulle fler människor börja åka kollektivt eller cykla till jobbet, " +
      "vilket är betydligt bättre för miljön och folkhälsan. " +
      "Vissa studier visar att städer som Köpenhamn och Amsterdam har fått mycket positiva resultat av liknande åtgärder.\n\n" +
      "Å andra sidan finns det tydliga nackdelar som man inte får glömma. " +
      "Många familjer som bor i förorten behöver bilen för att köpa stora mängder mat, " +
      "köra barn till skolan och besöka äldre släktingar. " +
      "Det kan också påverka småföretagare som har svårt att få sina varor levererade " +
      "om de inte får köra in till centrum.\n\n" +
      "Sammanfattningsvis tycker jag att vi inte bör förbjuda privatbilar helt och hållet i Helsingfors. " +
      "Istället föreslår jag att vi begränsar trafiken under rusningstid, " +
      "bygger fler parkeringshus i utkanten och investerar i bättre kollektivtrafik. " +
      "På det sättet kan vi skydda både miljön och människors vardag utan att skapa onödiga problem.",
    essayVi:
      "Tôi muốn bình luận về đề xuất cấm ô tô tư nhân ở trung tâm Helsinki. " +
      "Một mặt, đây là cách tuyệt vời để giảm khí thải và tiếng ồn ở trung tâm, " +
      "làm cho thành phố sạch hơn, an toàn hơn và dễ chịu hơn cho người đi bộ và đi xe đạp. " +
      "Hơn nữa, nhiều người sẽ bắt đầu đi phương tiện công cộng hoặc đạp xe đi làm, " +
      "điều này tốt hơn nhiều cho môi trường và sức khỏe cộng đồng. " +
      "Một số nghiên cứu cho thấy các thành phố như Copenhagen và Amsterdam đã đạt kết quả rất tích cực từ các biện pháp tương tự.\n\n" +
      "Mặt khác, có những bất lợi rõ ràng mà ta không thể quên. " +
      "Nhiều gia đình sống ở ngoại ô cần ô tô để mua thực phẩm số lượng lớn, " +
      "đưa con đi học và thăm người thân già. " +
      "Điều này cũng có thể ảnh hưởng đến các chủ doanh nghiệp nhỏ khó giao hàng " +
      "nếu họ không được lái xe vào trung tâm.\n\n" +
      "Tóm lại, tôi cho rằng ta không nên cấm hoàn toàn ô tô tư nhân ở Helsinki. " +
      "Thay vào đó, tôi đề xuất hạn chế giao thông trong giờ cao điểm, " +
      "xây thêm bãi đỗ xe ở rìa thành phố và đầu tư vào phương tiện công cộng tốt hơn. " +
      "Như vậy chúng ta có thể bảo vệ cả môi trường và cuộc sống thường ngày của người dân mà không tạo ra vấn đề không cần thiết.",
    wordCount: 178,
    grammarNotes: [
      { label: "Å ena sidan / Å andra sidan / Sammanfattningsvis", noteVi: "Bộ ba liên kết opinion B1 — đảm bảo 3 đoạn logic rõ ràng.", noteEn: "B1 opinion tripod — guarantees 3 clear logical paragraphs." },
      { label: "vilket (relativsats)", noteVi: "'vilket' thay cho cả mệnh đề trước — cấu trúc phức, điểm Grammar B1 cao.", noteEn: "'vilket' replaces the whole preceding clause — complex structure, high B1 Grammar score." },
      { label: "som + relativ (lång sats)", noteVi: "'familjer som bor i förorten' — mệnh đề quan hệ dài, nâng độ phức tạp câu lên B1.", noteEn: "'familjer som bor i förorten' — long relative clause, lifts sentence complexity to B1." },
      { label: "för att + infinitiv", noteVi: "Mục đích ở dạng ngắn gọn, tránh 'för att jag ska' dài dòng khi không cần thiết.", noteEn: "Purpose in compact infinitive form, avoiding verbose 'för att jag ska' when unnecessary." },
    ],
    highlights: [
      "Dùng đủ 2 luận điểm + 1 phản biện — đạt Task Fulfilment B1.",
      "Ví dụ thực tế từ Köpenhamn / Amsterdam — tăng độ thuyết phục và từ vựng học thuật.",
      "Đề xuất giải pháp cụ thể ở đoạn kết (hạn chéo giờ cao điểm + bãi đỗ xe rìa thành phố) — tiêu chí Coherence cao.",
    ],
  },
  {
    id: "w-b1-digital-life",
    level: "B1",
    titleVi: "Tiểu luận: Mạng xã hội và giới trẻ",
    titleEn: "Essay: social media and youth",
    essaySv:
      "Sociala medier har blivit en stor del av ungdomars liv idag och påverkar både deras vardag och deras framtid. " +
      "En tydlig fördel är att plattformar som Instagram, TikTok och Discord gör det lätt att hålla kontakt med vänner över hela världen " +
      "och hitta personer med samma intressen, oavsett var de bor. " +
      "Många unga lär sig också nya färdigheter genom instruktionsvideor, onlinelärande och språkappar " +
      "på ett sätt som traditionella läroböcker inte alltid kan erbjuda. " +
      "En annan positiv effekt är att ungdomar kan skapa nätverk för sina hobbyprojekt och till och med starta små företag online.\n\n" +
      "Trots dessa fördelar finns det allvarliga nackdelar som vi måste ta på allvar. " +
      "Många unga människor känner stress och ångest när de jämför sitt eget liv med andras perfekta bilder och filtrerade livsstilar på sociala medier. " +
      "Dessutom är risken för nätmobbning, kränkande kommentarer och spridning av falska nyheter mycket högre än tidigare. " +
      "Forskning visar att för mycket skärmtid kan påverka sömnen och koncentrationsförmågan negativt, " +
      "vilket i sin tur leder till sämre skolresultat.\n\n" +
      "Jag rekommenderar att ungdomar använder sociala medier med måtta " +
      "och att skolorna erbjuder undervisning i mediekritik så att eleverna lär sig skilja på pålitliga källor och desinformation. " +
      "Dessutom bör föräldrar prata öppet och regelbundet med sina barn om vad de ser på nätet utan att döma dem för hårt. " +
      "På det sättet kan vi njuta av fördelarna med sociala medier utan att drabbas av de allvarligaste nackdelarna, " +
      "och ungdomarna kan växa upp till kritiska och hälsosamma digitala medborgare.",
    essayVi:
      "Mạng xã hội đã trở thành một phần lớn trong cuộc sống của giới trẻ ngày nay và ảnh hưởng cả cuộc sống hàng ngày lẫn tương lai của họ. " +
      "Một lợi thế rõ ràng là các nền tảng như Instagram, TikTok và Discord giúp dễ dàng duy trì liên lạc với bạn bè khắp thế giới " +
      "và tìm những người có cùng sở thích, bất kể họ sống ở đâu. " +
      "Nhiều bạn trẻ cũng học được kỹ năng mới thông qua video hướng dẫn, học trực tuyến và ứng dụng ngôn ngữ " +
      "theo cách mà sách giáo khoa truyền thống không luôn cung cấp được. " +
      "Một tác động tích cực khác là thanh thiếu niên có thể tạo mạng lưới cho dự án sở thích và thậm chí khởi nghiệp nhỏ trực tuyến.\n\n" +
      "Mặc dù có những lợi ích này, vẫn có những bất lợi nghiêm trọng mà chúng ta phải coi trọng. " +
      "Nhiều người trẻ cảm thấy căng thẳng và lo âu khi so sánh cuộc sống của mình với hình ảnh hoàn hảo và lối sống qua bộ lọc của người khác trên mạng xã hội. " +
      "Hơn nữa, nguy cơ bắt nạt trực tuyến, bình luận xúc phạm và lan truyền tin giả cao hơn nhiều so với trước đây. " +
      "Nghiên cứu cho thấy quá nhiều thời gian trước màn hình có thể ảnh hưởng tiêu cực đến giấc ngủ và khả năng tập trung, " +
      "điều này lần lượt dẫn đến kết quả học tập kém hơn.\n\n" +
      "Tôi khuyến nghị thanh thiếu niên sử dụng mạng xã hội một cách điều độ " +
      "và các trường học nên cung cấp giáo dục phê phán truyền thông để học sinh học cách phân biệt nguồn đáng tin và thông tin sai lệch. " +
      "Ngoài ra, cha mẹ nên trò chuyện cởi mở và thường xuyên với con cái về những gì chúng thấy trên mạng mà không phán xét quá gay gắt. " +
      "Như vậy chúng ta có thể tận hưởng lợi ích của mạng xã hội mà không gặp phải những bất lợi nghiêm trọng nhất, " +
      "và giới trẻ có thể trưởng thành thành những công dân số phê phán và lành mạnh.",
    wordCount: 206,
    grammarNotes: [
      { label: "Trots att / Dessutom", noteVi: "'Trots dessa fördelar' = giới từ + danh từ, biến thể ngắn gọn của 'trots att' — B1 lịch sự.", noteEn: "'Trots dessa fördelar' = preposition + noun, a compact variant of 'trots att' — elegant B1." },
      { label: "som + relativ (lång)", noteVi: "'personer med samma intressen, oavsett var de bor' — mệnh đề quan hệ kép, phức tạp B1.", noteEn: "'personer med samma intressen, oavsett var de bor' — double relative clause, B1 complexity." },
      { label: "att + sats (subjektiv)", noteVi: "'rekommenderar att ungdomar använder' — động từ khuyến nghị + mệnh đề gián tiếp B1.", noteEn: "'rekommenderar att ungdomar använder' — recommendation verb + B1 indirect clause." },
      { label: "vilket + påverkar", noteVi: "'vilket i sin tur leder till' — chuỗi hệ quả logic, điểm Coherence B1 cao.", noteEn: "'vilket i sin tur leder till' — logical consequence chain, high B1 Coherence." },
    ],
    highlights: [
      "Dùng đủ 3 ví dụ cụ thể (liên lạc toàn cầu, học kỹ năng, khởi nghiệp) — Task Fulfilment tối đa.",
      "Nhắc đến nghiên cứu khoa học ('Forskning visar') — nâng tính học thuật, điểm Vocabulary cao.",
      "Khuyến nghị đa chiều (học sinh, trường học, phụ huynh) — thể hiện tư duy phân tích sâu B1.",
    ],
  },
];
  // ───── A1 extra ─────
  {
    id: "w-a1-restaurant",
    level: "A1",
    titleVi: "Đặt bàn ở nhà hàng",
    titleEn: "Booking a table at a restaurant",
    essaySv:
      "Hej! Jag vill boka ett bord för fyra personer på lördag klockan nitton. " +
      "En av oss är vegetarian, så vi undrar om ni har vegetariska rätter på menyn. " +
      "Vi har också en liten dotter på ett år — har ni barnstol? " +
      "Tack số mycket för hjälpen! Vi ses på lördag.",
    essayVi:
      "Chào! Tôi muốn đặt bàn 4 người thứ Bảy lúc 19h. " +
      "Một người trong nhóm ăn chay, nên chúng tôi muốn hỏi thực đơn có món chay không. " +
      "Chúng tôi cũng có con gái một tuổi — nhà hàng có ghế trẻ em không? " +
      "Cảm ơn nhiều! Hẹn gặp thứ Bảy.",
    wordCount: 46,
    grammarNotes: [
      { label: "vill + infinitiv", noteVi: "'vill boka' = muốn đặt — động từ tâm lý A1 + nguyên mẫu.", noteEn: "'vill boka' = want to book — classic A1 mental verb + infinitive." },
      { label: "har ni", noteVi: "'har ni' = có không — câu hỏi đơn giản A1 với động từ sở hữu.", noteEn: "'har ni' = do you have — simple A1 question with possession verb." },
    ],
    highlights: [
      "Đủ 4 thông tin: số người, giờ, ăn chay, ghế trẻ — Task Fulfilment A1 đầy đủ.",
      "Dùng 'En av oss' để chỉ một người trong nhóm — từ vựng A1 hữu ích.",
      "Kết bằng 'Vi ses' thân mật — đúng tone giao tiếp hàng ngày.",
    ],
  },
  {
    id: "w-a1-describe-home",
    level: "A1",
    titleVi: "Mô tả ngôi nhà / căn hộ của bạn",
    titleEn: "Describing your home",
    essaySv:
      "Jag bor i en liten lägenhet med tre rum i Vasa. " +
      "I vardagsrummet finns en soffa, ett skrivbord och en stor bokhylla. " +
      "Jag tycker att köket är mysigt eftersom det är ljust och jag lagar mat där varje dag. " +
      "Mitt sovrum är lugnt och det finns en fin utsikt över parken.",
    essayVi:
      "Tôi sống trong một căn hộ nhỏ 3 phòng ở Vasa. " +
      "Phòng khách có một chiếc sofa, một bàn viết và một giá sách lớn. " +
      "Tôi thấy nhà bếp ấm cúng vì sáng và tôi nấu ăn ở đó mỗi ngày. " +
      "Phòng ngủ của tôi yên tĩnh và có tầm nhìn đẹp ra công viên.",
    wordCount: 50,
    grammarNotes: [
      { label: "det finns", noteVi: "'det finns' = có — cách nói tồn tại cổ điển A1, dùng nhiều lần để mô tả không gian.", noteEn: "'det finns' = there is/are — classic A1 existential construction, repeated to describe space." },
      { label: "eftersom + S+V", noteVi: "'eftersom det är ljust' — mệnh đề lý do đơn giản, không cần đảo vì không có trợ động từ.", noteEn: "'eftersom det är ljust' — simple reason clause, no inversion needed without auxiliary." },
    ],
    highlights: [
      "Mô tả đủ 3 khu vực: phòng khách, bếp, phòng ngủ — đạt yêu cầu đề bài.",
      "Dùng tính từ cảm xúc 'mysigt', 'lugnt', 'fin' — từ vựng đa dạng A1 cao.",
      "Kết hợp 'det finns' và 'är' để tránh lặp từ — Coherence A1 cao.",
    ],
  },
  // ───── A2 extra ─────
  {
    id: "w-a2-cinema",
    level: "A2",
    titleVi: "Mời bạn đi xem phim",
    titleEn: "Inviting a friend to the cinema",
    essaySv:
      "Hej Erik,\n\n" +
      "Jag hoppas att du har det bra! Jag har två biljetter till den nya filmen på Bio Rex på fredag klockan tjugo. " +
      "Filmen handlar om en ung forskare som upptäcker ett gammalt mysterium i Lappland, " +
      "och den fick jättebra recensioner förra veckan. " +
      "Det låter väldigt spännande! " +
      "Vill du äta middag tillsammans med mig innan filmen? " +
      "Jag tänkte på den lilla thairestaurangen bredvid biografen. " +
      "De har god mat och det är inte số dyrt. " +
      "Hör av dig snart så jag vet om jag ska boka bord!\n\n" +
      "Kram,\nMinh",
    essayVi:
      "Chào Erik,\n\n" +
      "Tôi hy vọng bạn khỏe! Tôi có 2 vé phim mới ở rạp Bio Rex thứ Sáu lúc 20h. " +
      "Phim nói về một nhà khoa trẻ khám phá một bí ẩn cổ ở Lapland, " +
      "và phim nhận được đánh giá rất tốt tuần trước. " +
      "Nghe có vẻ rất hấp dẫn! " +
      "Bạn muốn ăn tối cùng tôi trước khi xem phim không? " +
      "Tôi đang nghĩ đến nhà hàng Thái nhỏ bên cạnh rạp chiếu phim. " +
      "Đồ ăn ngon và không đắt lắm. " +
      "Trả lời tôi sớm để tôi biết có nên đặt bàn không!\n\n" +
      "Thân,\nMinh",
    wordCount: 92,
    grammarNotes: [
      { label: "som + relativsats", noteVi: "'som upptäcker' — mệnh đề quan hệ mô tả nhân vật, A2 nâng cao.", noteEn: "'som upptäcker' — relative clause describing a character, advanced A2." },
      { label: "số + S+V", noteVi: "'số jag vet' — 'số' diễn tả kết quả/hệ quả, mệnh đề sau có chủ ngữ + động từ thường.", noteEn: "'số jag vet' — 'số' expresses result/consequence, followed by normal S+V order." },
      { label: "innan + sats", noteVi: "'innan filmen' — giới từ thời gian đơn giản, A2 cơ bản.", noteEn: "'innan filmen' — simple time preposition, basic A2." },
    ],
    highlights: [
      "Có đủ 3 yếu tố A2: mời, tóm tắt phim, đề xuất ăn tối — Task Fulfilment đầy đủ.",
      "Nhắc 'jättebra recensioner' để thuyết phục bạn — kỹ năng giao tiếp A2 tinh tế.",
      "Dùng 'Hör av dig snart' — cụm lịch sự để yêu cầu phản hồi nhanh.",
    ],
  },
  {
    id: "w-a2-holiday",
    level: "A2",
    titleVi: "Kể về một ngày lễ truyền thống",
    titleEn: "Describing a traditional holiday",
    essaySv:
      "I mitt hemland Vietnam firar vi Tet Nguyen Dan varje år i slutet av januari eller i februari. " +
      "Det är vår viktigaste högtid. " +
      "På morgonen samlas hela familjen och vi äter traditionell mat som bánh chưng och thịt kho. " +
      "På kvällen går vi ut för att titta på fyrverkerierna och besöker grannar för att önska lycka och hälsa. " +
      "Jag tycker att Tet är en vacker tid eftersom alla blir gladare och vi träffas efter ett helt år av arbete.",
    essayVi:
      "Ở quê hương Việt Nam của tôi, chúng tôi ăn mừng Tết Nguyên Đán mỗi năm vào cuối tháng 1 hoặc tháng 2. " +
      "Đây là lễ hội quan trọng nhất của chúng tôi. " +
      "Vào buổi sáng cả gia đình sum họp và chúng tôi ăn các món truyền thống như bánh chưng và thịt kho. " +
      "Vào buổi tối chúng tôi ra ngoài xem pháo hoa và thăm hàng xóm để chúc sức khỏe và may mắn. " +
      "Tôi thấy Tết là khoảng thời gian đẹp vì mọi người đều vui hơn và chúng tôi gặp nhau sau cả năm làm việc.",
    wordCount: 90,
    grammarNotes: [
      { label: "på morgonen / på kvällen", noteVi: "Trạng từ thời gian ở đầu câu + V2 nhẹ — đủ điểm Grammar A2.", noteEn: "Time adverbial at sentence start + mild V2 — enough for A2 Grammar points." },
      { label: "eftersom + S+V", noteVi: "'eftersom alla blir gladare' — giải thích lý do cảm xúc bằng mệnh đề đơn giản.", noteEn: "'eftersom alla blir gladare' — explains emotional reason with a simple clause." },
      { label: "som + sats", noteVi: "'som bánh chưng och thịt kho' — dùng 'som' để liệt kê ví dụ, phổ biến A2.", noteEn: "'som bánh chưng och thịt kho' — using 'som' to list examples, common A2." },
    ],
    highlights: [
      "Đủ 4 thông tin đề yêu cầu: tên lễ, thời gian, đồ ăn, hoạt động gia đình.",
      "Từ vựng văn hóa đặc thù (bánh chưng, thịt kho) — điểm Vocabulary A2 cao.",
      "Kết bằng cảm xúc cá nhân + lý do — tiêu chí Coherence cao.",
    ],
  },
  // ───── B1 extra ─────
  {
    id: "w-b1-library",
    level: "B1",
    titleVi: "Thư kiến nghị: cải thiện thư viện địa phương",
    titleEn: "Opinion letter: improving the local library",
    essaySv:
      "Jag vill lyfta frågan om stadsbiblioteket i vårt område, " +
      "som tyvärr har blivit allt mer omodernt de senaste åren. " +
      "För det första behöver vi längre öppettider eftersom många invånare, " +
      "särskilt studenter och föräldrar, arbetar under dagarna och har bara kvällstid " +
      "för att läsa eller låna böcker. " +
      "Om biblioteket kunde vara öppet till klockan tjugo på vardagarna " +
      "skulle det hjälpa många människor att utveckla sina kunskaper. " +
      "För det andra behöver biblioteket fler böcker på olika språk, " +
      "exempelvis vietnamesiska, arabiska och engelska, " +
      "eftersom vårt område har blivit multikulturellt. " +
      "Det skulle underlätta integrationen för nya invånare och deras barn. " +
      "Dessutom saknas tillräckligt med tysta studierum där man kan förbereda sig till examen " +
      "eller jobba med grupprojekt. " +
      "Sammanfattningsvis anser jag att kommunen måste investera mer i biblioteket, " +
      "eftersom det är en viktig plats för bildning, gemenskap och demokrati i vårt samhälle.",
    essayVi:
      "Tôi muốn nêu vấn đề về thư viện thành phố ở khu vực chúng tôi, " +
      "tiếc là nơi đây đã ngày càng lạc hậu trong những năm gần đây. " +
      "Thứ nhất, chúng ta cần giờ mở cửa dài hơn vì nhiều cư dân, " +
      "đặc biệt là sinh viên và phụ huynh, làm việc ban ngày và chỉ có buổi tối " +
      "để đọc sách hoặc mượn sách. " +
      "Nếu thư viện có thể mở đến 20h vào các ngày trong tuần " +
      "thì sẽ giúp nhiều người phát triển kiến thức của họ. " +
      "Thứ hai, thư viện cần thêm sách bằng nhiều ngôn ngữ khác nhau, " +
      "ví dụ tiếng Việt, tiếng Ả Rập và tiếng Anh, " +
      "vì khu vực chúng tôi đã trở nên đa văn hóa. " +
      "Điều này sẽ tạo điều kiện thuận lợi cho sự hội nhập của cư dân mới và con cái họ. " +
      "Ngoài ra còn thiếu các phòng học yên tĩnh đủ để chuẩn bị cho kỳ thi " +
      "hoặc làm việc nhóm. " +
      "Tóm lại, tôi cho rằng chính quyền địa phương phải đầu tư nhiều hơn vào thư viện, " +
      "vì đây là nơi quan trọng cho giáo dục, cộng đồng và dân chủ trong xã hội chúng ta.",
    wordCount: 165,
    grammarNotes: [
      { label: "Om + sats, skulle + infinitiv", noteVi: "'Om biblioteket kunde vara öppet… skulle det hjälpa' — câu điều kiện loại 2 B1, diễn tả giả thuyết.", noteEn: "'Om biblioteket kunde vara öppet… skulle det hjälpa' — B1 conditional type 2, expressing hypothesis." },
      { label: "För det första / andra / Dessutom / Sammanfattningsvis", noteVi: "Bộ liên kết 4 mấu chốt — cấu trúc opinion letter B1 chuẩn.", noteEn: "Four-part linker set — standard B1 opinion-letter scaffolding." },
      { label: "eftersom + BIFF", noteVi: "'eftersom vårt område har blivit multikulturellt' — động từ trợ 'har' đứng trước chủ ngữ 'vårt område', kích hoạt BIFF.", noteEn: "'eftersom vårt område har blivit…' — auxiliary 'har' before subject triggers BIFF inversion." },
    ],
    highlights: [
      "3 luận điểm rõ ràng (giờ mở cửa, sách đa ngôn ngữ, phòng học) — Task Fulfilment B1 đầy đủ.",
      "Đề cập lợi ích cộng đồng ('integration', 'bildning', 'demokrati') — tầm nhìn xã hội, điểm Vocabulary cao.",
      "Dùng câu điều kiện 'Om… skulle' để đề xuất giải pháp cụ thể — tiêu chí Grammar B1 cao cấp.",
    ],
  },
  {
    id: "w-b1-remote-work",
    level: "B1",
    titleVi: "Tiểu luận: Làm việc từ xa",
    titleEn: "Essay: remote work",
    essaySv:
      "Distansarbete har blivit allt vanligare sedan pandemin och påverkar hur vi ser på balansen mellan arbete och fritid. " +
      "En tydlig fördel är att människor sparar mycket tid på pendling, " +
      "vilket ger dem möjlighet att sova längre, laga hälsosam mat eller träna på morgonen. " +
      "Dessutom kan föräldrar hämta sina barn tidigare från skolan och ändå fullfölja sina arbetsuppgifter effektivt. " +
      "En annan positiv effekt är att företag kan anställa talanger från hela landet eller till och med utlandet " +
      "utan att tänka på geografiska avstånd.\n\n" +
      "Trots dessa fördelar finns det nackdelar som vi inte får ignorera. " +
      "Många anställda känner sig isolerade hemma och saknar den sociala kontakten med sina kollegor. " +
      "Dessutom är det svårt att skilja på arbete och fritid när hemmet blir kontor, " +
      "vilket kan leda till utbrändhet och sömnproblem. " +
      "Vissa människor har också sämre arbetsmiljö hemma med brusande barn eller saknar en bekväm skrivbordsstol.\n\n" +
      "Därför rekommenderar jag att arbetsgivare erbjuder en flexibel modell " +
      "där anställda kan jobba hemifrån två eller tre dagar i veckan men ändå träffas på kontoret " +
      "för viktiga möten och teamaktiviteter. " +
      "På det sättet får vi det bästa av båda världar.",
    essayVi:
      "Làm việc từ xa đã ngày càng phổ biến kể từ đại dịch và ảnh hưởng đến cách chúng ta nhìn nhận sự cân bằng giữa công việc và thời gian rảnh. " +
      "Một lợi thế rõ ràng là mọi người tiết kiệm rất nhiều thời gian đi lại, " +
      "điều này cho họ cơ hội ngủ lâu hơn, nấu ăn lành mạnh hoặc tập thể dục vào buổi sáng. " +
      "Hơn nữa, cha mẹ có thể đón con sớm hơn từ trường và vẫn hoàn thành nhiệm vụ công việc một cách hiệu quả. " +
      "Một tác động tích cực khác là các công ty có thể tuyển dụng nhân tài từ khắp đất nước hoặc thậm chí nước ngoài " +
      "mà không cần nghĩ đến khoảng cách địa lý.\n\n" +
      "Mặc dù có những lợi ích này, vẫn có những bất lợi mà chúng ta không thể phớt lờ. " +
      "Nhiều nhân viên cảm thấy cô lập ở nhà và nhớ sự tiếp xúc xã hội với đồng nghiệp. " +
      "Ngoài ra, việc phân biệt công việc và thời gian rảnh trở nên khó khăn khi nhà biến thành văn phòng, " +
      "điều này có thể dẫn đến kiệt sức và vấn đề về giấc ngủ. " +
      "Một số người cũng có môi trường làm việc kém hơn ở nhà với tiếng ồn của trẻ em hoặc thiếu ghế ngồi thoải mái.\n\n" +
      "Vì vậy, tôi khuyến nghị các nhà tuyển dụng cung cấp một mô hình linh hoạt " +
      "để nhân viên có thể làm việc tại nhà hai hoặc ba ngày một tuần nhưng vẫn gặp nhau tại văn phòng " +
      "cho các cuộc họp quan trọng và hoạt động nhóm. " +
      "Như vậy chúng ta sẽ có được cả hai thế giới tốt nhất.",
    wordCount: 206,
    grammarNotes: [
      { label: "vilket + ger", noteVi: "'vilket ger dem möjlighet' — đại từ quan hệ thay thế cả mệnh đề trước, B1 phức tạp.", noteEn: "'vilket ger dem möjlighet' — relative pronoun replacing the entire preceding clause, complex B1." },
      { label: "utan att + infinitiv", noteVi: "'utan att tänka' — cấu trúc phủ định B1 thay vì 'och inte', gọn và học thuật.", noteEn: "'utan att tänka' — B1 negative construction replacing 'och inte', concise and academic." },
      { label: "Därför rekommenderar jag att + S+V", noteVi: "'rekommenderar att arbetsgivare erbjuder' — động từ khuyến nghị + mệnh đề gián tiếp B1.", noteEn: "'rekommenderar att arbetsgivare erbjuder' — recommendation verb + B1 indirect clause." },
    ],
    highlights: [
      "3 lý do rõ ràng (tiết kiệm thời gian, cha mẹ linh hoạt, tuyển dụng toàn cầu) — Task Fulfilment đầy đủ.",
      "Nhắc đến hệ quả sức khỏe ('utbrändhet', 'sömnproblem') — điểm Vocabulary học thuật B1 cao.",
      "Khuyến nghị giải pháp thực tế (2-3 ngày/tuần + gặp mặt) — thể hiện tư duy cân bằng, điểm Coherence cao.",
    ],
  },
];
