/**
 * @file swedishVocabBank.ts
 * @description Swedish (Svenska) vocabulary bank, YKI A1 → B1.
 *              ~180 high-frequency words grouped by thematic category.
 *              Used by /swedish/vocabulary.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SwedishLevel = "A1" | "A2" | "B1";

export interface SwedishWord {
  id: string;            // stable key for mastery tracking
  sv: string;            // Swedish form (lemma)
  ipa?: string;          // IPA pronunciation (optional, matches IELTS format)
  pos: string;           // part of speech (n., v., adj., adv., phr.)
  article?: "en" | "ett"; // gender for nouns
  vi: string;            // Vietnamese gloss
  en: string;            // English gloss
  example: string;       // Swedish example sentence
  exampleVi: string;     // Vietnamese translation of example
  exampleEn: string;     // English translation of example
  level: SwedishLevel;
  category: string;      // category key
}

export interface SwedishCategory {
  id: string;
  emoji: string;
  nameVi: string;
  nameEn: string;
}

import { SWEDISH_CATEGORIES_EXTRA } from "./swedishVocabExpansion2";

const _SWEDISH_CATEGORIES_CORE: SwedishCategory[] = [
  { id: "greetings",  emoji: "👋", nameVi: "Chào hỏi & xã giao",   nameEn: "Greetings & social" },
  { id: "family",     emoji: "👨‍👩‍👧", nameVi: "Gia đình & bản thân", nameEn: "Family & self" },
  { id: "numbers",    emoji: "🕐", nameVi: "Số đếm & thời gian",   nameEn: "Numbers & time" },
  { id: "food",       emoji: "🍞", nameVi: "Ẩm thực",              nameEn: "Food" },
  { id: "shopping",   emoji: "🛒", nameVi: "Mua sắm",              nameEn: "Shopping" },
  { id: "directions", emoji: "🚌", nameVi: "Đường & giao thông",   nameEn: "Directions & transport" },
  { id: "home",       emoji: "🏠", nameVi: "Nhà cửa",              nameEn: "Home" },
  { id: "work",       emoji: "💼", nameVi: "Công sở & nghề",       nameEn: "Workplace" },
  { id: "health",     emoji: "🏥", nameVi: "Sức khoẻ",             nameEn: "Health" },
  { id: "hobbies",    emoji: "🎨", nameVi: "Sở thích",             nameEn: "Hobbies" },
  { id: "society",    emoji: "🌍", nameVi: "Xã hội & tin tức",     nameEn: "Society & news" },
  { id: "environment",emoji: "🌱", nameVi: "Môi trường",           nameEn: "Environment" },
  { id: "opinion",    emoji: "💬", nameVi: "Ý kiến & lập luận",    nameEn: "Opinion & argument" },
  { id: "abstract",   emoji: "✨", nameVi: "Từ trừu tượng B1",     nameEn: "Abstract B1 nouns" },
];

export const SWEDISH_CATEGORIES: SwedishCategory[] = [
  ..._SWEDISH_CATEGORIES_CORE,
  ...SWEDISH_CATEGORIES_EXTRA,
];

const w = (
  id: string, sv: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

const _SWEDISH_CORE_WORDS: SwedishWord[] = [
  // ───────────────────── GREETINGS (A1) ─────────────────────
  w("g1","hej","phr.","chào (thân mật)","hi","Hej, hur mår du?","Chào, bạn khỏe không?","Hi, how are you?","A1","greetings"),
  w("g2","hejdå","phr.","tạm biệt","bye","Hejdå, vi ses imorgon!","Tạm biệt, hẹn gặp ngày mai!","Bye, see you tomorrow!","A1","greetings"),
  w("g3","tack","phr.","cảm ơn","thanks","Tack så mycket för hjälpen.","Cảm ơn rất nhiều vì đã giúp.","Thanks a lot for the help.","A1","greetings"),
  w("g4","förlåt","phr.","xin lỗi","sorry","Förlåt, jag förstår inte.","Xin lỗi, tôi không hiểu.","Sorry, I don't understand.","A1","greetings"),
  w("g5","ursäkta","phr.","xin lỗi/excuse me","excuse me","Ursäkta, var ligger toaletten?","Xin lỗi, nhà vệ sinh ở đâu?","Excuse me, where is the toilet?","A1","greetings"),
  w("g6","ja / nej","phr.","có / không","yes / no","Ja, det stämmer.","Có, đúng vậy.","Yes, that's right.","A1","greetings"),
  w("g7","trevligt att träffas","phr.","rất vui được gặp","nice to meet you","Trevligt att träffas, Lan.","Rất vui được gặp Lan.","Nice to meet you, Lan.","A1","greetings"),
  w("g8","god morgon","phr.","chào buổi sáng","good morning","God morgon! Sov du gott?","Chào buổi sáng! Bạn ngủ ngon chứ?","Good morning! Did you sleep well?","A1","greetings"),
  w("g9","god kväll","phr.","chào buổi tối","good evening","God kväll, välkommen hem.","Chào buổi tối, mừng về nhà.","Good evening, welcome home.","A1","greetings"),
  w("g10","vi ses","phr.","hẹn gặp lại","see you","Vi ses på fredag!","Hẹn gặp thứ Sáu!","See you on Friday!","A1","greetings"),
  w("g11","varsågod","phr.","đây bạn / mời","here you go","Varsågod, en kopp kaffe.","Đây bạn, một ly cà phê.","Here you go, a cup of coffee.","A1","greetings"),
  w("g12","hur mår du","phr.","bạn khỏe không","how are you","Hur mår du idag?","Hôm nay bạn khỏe không?","How are you today?","A1","greetings"),

  // ───────────────────── FAMILY (A1) ─────────────────────
  w("f1","mamma","n.","mẹ","mom","Min mamma lagar mat.","Mẹ tôi nấu ăn.","My mom cooks.","A1","family","en"),
  w("f2","pappa","n.","bố","dad","Pappa jobbar i Vasa.","Bố làm việc ở Vaasa.","Dad works in Vaasa.","A1","family","en"),
  w("f3","syster","n.","chị/em gái","sister","Min syster bor i Stockholm.","Chị tôi sống ở Stockholm.","My sister lives in Stockholm.","A1","family","en"),
  w("f4","bror","n.","anh/em trai","brother","Min bror studerar IT.","Anh tôi học CNTT.","My brother studies IT.","A1","family","en"),
  w("f5","barn","n.","con (số ít/nhiều)","child/children","Vi har två barn.","Chúng tôi có hai con.","We have two children.","A1","family","ett"),
  w("f6","man","n.","chồng","husband","Min man heter Hai.","Chồng tôi tên Hải.","My husband is named Hai.","A1","family","en"),
  w("f7","fru","n.","vợ","wife","Hans fru är lärare.","Vợ anh ấy là giáo viên.","His wife is a teacher.","A1","family","en"),
  w("f8","farmor","n.","bà nội","grandma (paternal)","Farmor är åttio år gammal.","Bà nội 80 tuổi.","Grandma is 80 years old.","A1","family","en"),
  w("f9","mormor","n.","bà ngoại","grandma (maternal)","Mormor bor i Åbo.","Bà ngoại sống ở Turku.","Grandma lives in Turku.","A1","family","en"),
  w("f10","släkting","n.","họ hàng","relative","Mina släktingar bor i Vietnam.","Họ hàng tôi sống ở Việt Nam.","My relatives live in Vietnam.","A2","family","en"),
  w("f11","vän","n.","bạn","friend","Han är min bästa vän.","Anh ấy là bạn thân của tôi.","He is my best friend.","A1","family","en"),
  w("f12","granne","n.","hàng xóm","neighbour","Min granne är finsk.","Hàng xóm tôi là người Phần Lan.","My neighbour is Finnish.","A2","family","en"),

  // ───────────────────── NUMBERS & TIME (A1) ─────────────────────
  w("n1","klocka","n.","giờ/đồng hồ","clock/time","Klockan är halv nio.","Bây giờ 8 giờ rưỡi.","It's half past eight.","A1","numbers","en"),
  w("n2","idag","adv.","hôm nay","today","Idag är det måndag.","Hôm nay là thứ Hai.","Today is Monday.","A1","numbers"),
  w("n3","igår","adv.","hôm qua","yesterday","Igår regnade det mycket.","Hôm qua trời mưa to.","Yesterday it rained a lot.","A1","numbers"),
  w("n4","imorgon","adv.","ngày mai","tomorrow","Imorgon åker vi till Helsingfors.","Ngày mai chúng tôi đi Helsinki.","Tomorrow we'll go to Helsinki.","A1","numbers"),
  w("n5","vecka","n.","tuần","week","Den här veckan jobbar jag mycket.","Tuần này tôi làm việc nhiều.","This week I work a lot.","A1","numbers","en"),
  w("n6","månad","n.","tháng","month","Vi har semester en månad.","Chúng tôi nghỉ phép một tháng.","We have a month of holiday.","A1","numbers","en"),
  w("n7","år","n.","năm","year","Jag har bott här i tre år.","Tôi đã sống ở đây 3 năm.","I've lived here for 3 years.","A1","numbers","ett"),
  w("n8","tid","n.","thời gian","time","Har du tid att prata?","Bạn có thời gian nói chuyện không?","Do you have time to talk?","A1","numbers","en"),
  w("n9","minut","n.","phút","minute","Tåget går om tio minuter.","Tàu chạy trong 10 phút.","The train leaves in 10 minutes.","A1","numbers","en"),
  w("n10","timme","n.","giờ (đồng hồ)","hour","Mötet tar två timmar.","Cuộc họp kéo dài 2 giờ.","The meeting takes 2 hours.","A1","numbers","en"),

  // ───────────────────── FOOD (A1) ─────────────────────
  w("fo1","bröd","n.","bánh mì","bread","Jag äter bröd till frukost.","Tôi ăn bánh mì sáng.","I eat bread for breakfast.","A1","food","ett"),
  w("fo2","kaffe","n.","cà phê","coffee","En kopp kaffe, tack.","Một ly cà phê, cảm ơn.","A cup of coffee, please.","A1","food","ett"),
  w("fo3","te","n.","trà","tea","Vill du ha te eller kaffe?","Bạn uống trà hay cà phê?","Tea or coffee?","A1","food","ett"),
  w("fo4","mjölk","n.","sữa","milk","Mjölken är kall.","Sữa lạnh.","The milk is cold.","A1","food","en"),
  w("fo5","ost","n.","phô mai","cheese","Jag älskar svensk ost.","Tôi mê phô mai Thụy Điển.","I love Swedish cheese.","A1","food","en"),
  w("fo6","äpple","n.","quả táo","apple","Ett rött äpple, tack.","Một quả táo đỏ, cảm ơn.","One red apple, please.","A1","food","ett"),
  w("fo7","kött","n.","thịt","meat","Vi äter inte kött.","Chúng tôi không ăn thịt.","We don't eat meat.","A1","food","ett"),
  w("fo8","fisk","n.","cá","fish","Fisken är färsk.","Cá tươi.","The fish is fresh.","A1","food","en"),
  w("fo9","grönsak","n.","rau","vegetable","Grönsaker är nyttiga.","Rau xanh tốt cho sức khoẻ.","Vegetables are healthy.","A1","food","en"),
  w("fo10","frukost","n.","bữa sáng","breakfast","Frukost klockan sju.","Bữa sáng lúc 7 giờ.","Breakfast at seven.","A1","food","en"),
  w("fo11","lunch","n.","bữa trưa","lunch","Vi äter lunch klockan tolv.","Chúng tôi ăn trưa lúc 12.","We eat lunch at twelve.","A1","food","en"),
  w("fo12","middag","n.","bữa tối","dinner","Middag klockan sex.","Bữa tối lúc 6 giờ.","Dinner at six.","A1","food","en"),
  w("fo13","kanelbulle","n.","bánh quế","cinnamon bun","En kanelbulle till kaffet, tack.","Một bánh quế kèm cà phê, cảm ơn.","A cinnamon bun with the coffee, please.","A2","food","en"),

  // ───────────────────── SHOPPING (A1-A2) ─────────────────────
  w("s1","kosta","v.","có giá","cost","Hur mycket kostar det?","Cái này giá bao nhiêu?","How much does it cost?","A1","shopping"),
  w("s2","kvitto","n.","hoá đơn","receipt","Får jag ett kvitto?","Cho tôi xin hoá đơn được không?","May I have a receipt?","A1","shopping","ett"),
  w("s3","rabatt","n.","giảm giá","discount","Finns det rabatt idag?","Hôm nay có giảm giá không?","Is there a discount today?","A2","shopping","en"),
  w("s4","kort","n.","thẻ","card","Kan jag betala med kort?","Tôi trả bằng thẻ được không?","Can I pay by card?","A1","shopping","ett"),
  w("s5","kontant","adj.","tiền mặt","cash","Vi tar bara kontant.","Chúng tôi chỉ nhận tiền mặt.","We only take cash.","A2","shopping"),
  w("s6","påse","n.","túi","bag","En påse till, tack.","Thêm một túi, cảm ơn.","One more bag, please.","A1","shopping","en"),
  w("s7","storlek","n.","kích cỡ","size","Har ni en mindre storlek?","Bên anh có size nhỏ hơn không?","Do you have a smaller size?","A2","shopping","en"),
  w("s8","prova","v.","thử","try on","Kan jag prova den här?","Tôi thử cái này được không?","Can I try this on?","A2","shopping"),
  w("s9","dyr","adj.","đắt","expensive","Det är för dyrt för mig.","Cái này đắt quá với tôi.","It's too expensive for me.","A1","shopping"),
  w("s10","billig","adj.","rẻ","cheap","Maten är billig här.","Đồ ăn ở đây rẻ.","Food is cheap here.","A1","shopping"),
  w("s11","kassa","n.","quầy thu ngân","cashier","Var ligger kassan?","Quầy thu ngân ở đâu?","Where is the cashier?","A1","shopping","en"),
  w("s12","öppettider","n.","giờ mở cửa","opening hours","Vad är öppettiderna?","Giờ mở cửa thế nào?","What are the opening hours?","A2","shopping","ett"),

  // ───────────────────── DIRECTIONS & TRANSPORT (A1-A2) ─────────────────────
  w("d1","centrum","n.","trung tâm","centre","Hur kommer jag till centrum?","Tôi đi vào trung tâm như nào?","How do I get to the centre?","A1","directions","ett"),
  w("d2","höger","adv.","bên phải","right","Ta till höger vid trafikljuset.","Rẽ phải ở đèn giao thông.","Turn right at the lights.","A1","directions"),
  w("d3","vänster","adv.","bên trái","left","Sedan vänster mot torget.","Sau đó rẽ trái về phía quảng trường.","Then left towards the square.","A1","directions"),
  w("d4","rakt fram","adv.","đi thẳng","straight ahead","Gå rakt fram två kvarter.","Đi thẳng hai dãy nhà.","Walk straight ahead two blocks.","A1","directions"),
  w("d5","buss","n.","xe buýt","bus","Ta buss nummer fyra.","Bắt xe buýt số 4.","Take bus number four.","A1","directions","en"),
  w("d6","tåg","n.","tàu","train","Tåget går klockan tio.","Tàu chạy lúc 10 giờ.","The train leaves at ten.","A1","directions","ett"),
  w("d7","spårvagn","n.","tàu điện","tram","Spårvagnen är försenad.","Tàu điện bị trễ.","The tram is delayed.","A2","directions","en"),
  w("d8","tunnelbana","n.","tàu điện ngầm","metro","Närmaste tunnelbanestation?","Ga metro gần nhất?","Nearest metro station?","A2","directions","en"),
  w("d9","hållplats","n.","trạm dừng","bus/tram stop","Stig av vid nästa hållplats.","Xuống ở trạm tiếp theo.","Get off at the next stop.","A1","directions","en"),
  w("d10","biljett","n.","vé","ticket","En enkelbiljett till Vasa.","Một vé một chiều đi Vaasa.","A single ticket to Vaasa.","A1","directions","en"),
  w("d11","försenad","adj.","bị trễ","delayed","Tåget är försenat tio minuter.","Tàu trễ 10 phút.","The train is 10 min late.","A2","directions"),
  w("d12","karta","n.","bản đồ","map","Kan du visa på kartan?","Bạn chỉ trên bản đồ được không?","Can you show on the map?","A1","directions","en"),

  // ───────────────────── HOME (A1-A2) ─────────────────────
  w("h1","hus","n.","nhà","house","Vi har ett hus i Esbo.","Chúng tôi có nhà ở Espoo.","We have a house in Espoo.","A1","home","ett"),
  w("h2","lägenhet","n.","căn hộ","apartment","En tvårummare i centrum.","Căn hộ 2 phòng trung tâm.","A two-room flat in the centre.","A2","home","en"),
  w("h3","kök","n.","bếp","kitchen","Köket är nyrenoverat.","Bếp vừa cải tạo.","The kitchen is newly renovated.","A2","home","ett"),
  w("h4","sovrum","n.","phòng ngủ","bedroom","Sovrummet är litet.","Phòng ngủ nhỏ.","The bedroom is small.","A2","home","ett"),
  w("h5","badrum","n.","phòng tắm","bathroom","Badrummet är ledigt.","Phòng tắm còn trống.","The bathroom is free.","A2","home","ett"),
  w("h6","möbel","n.","đồ nội thất","furniture","Vi köper nya möbler.","Chúng tôi mua nội thất mới.","We're buying new furniture.","A2","home","en"),
  w("h7","säng","n.","giường","bed","Sängen är bekväm.","Giường êm.","The bed is comfortable.","A1","home","en"),
  w("h8","bord","n.","bàn","table","Maten står på bordet.","Đồ ăn để trên bàn.","The food is on the table.","A1","home","ett"),
  w("h9","stol","n.","ghế","chair","Sätt dig på stolen.","Bạn ngồi xuống ghế đi.","Sit down on the chair.","A1","home","en"),
  w("h10","hyra","v.","thuê","rent","Vi hyr en lägenhet.","Chúng tôi thuê căn hộ.","We rent an apartment.","A2","home"),

  // ───────────────────── WORK (A2) ─────────────────────
  w("w1","jobb","n.","công việc","job","Jag har ett bra jobb.","Tôi có công việc tốt.","I have a good job.","A2","work","ett"),
  w("w2","möte","n.","cuộc họp","meeting","Vi har möte klockan tio.","Họp lúc 10 giờ.","Meeting at ten.","A2","work","ett"),
  w("w3","chef","n.","sếp","boss","Min chef är snäll.","Sếp tôi tử tế.","My boss is kind.","A2","work","en"),
  w("w4","kollega","n.","đồng nghiệp","colleague","Mina kollegor är trevliga.","Đồng nghiệp tôi vui tính.","My colleagues are nice.","A2","work","en"),
  w("w5","lön","n.","lương","salary","Lönen kommer den sista.","Lương trả vào ngày cuối tháng.","Salary comes on the last day.","A2","work","en"),
  w("w6","semester","n.","nghỉ phép","vacation","Vi har semester i juli.","Chúng tôi nghỉ phép tháng 7.","We're on holiday in July.","A2","work","en"),
  w("w7","deadline","n.","hạn chót","deadline","Deadline är på fredag.","Hạn chót là thứ Sáu.","Deadline is Friday.","A2","work","en"),
  w("w8","projekt","n.","dự án","project","Projektet är klart.","Dự án đã xong.","The project is done.","A2","work","ett"),
  w("w9","anställning","n.","việc làm/biên chế","employment","Jag fick fast anställning.","Tôi vào biên chế.","I got a permanent position.","B1","work","en"),
  w("w10","arbetslös","adj.","thất nghiệp","unemployed","Han har varit arbetslös länge.","Anh ấy thất nghiệp đã lâu.","He's been unemployed a long time.","B1","work"),
  w("w11","löneförhöjning","n.","tăng lương","pay rise","Jag fick en löneförhöjning.","Tôi được tăng lương.","I got a pay rise.","B1","work","en"),
  w("w12","tjänst","n.","vị trí/dịch vụ","position/service","Jag söker tjänsten.","Tôi ứng tuyển vị trí này.","I'm applying for the position.","B1","work","en"),

  // ───────────────────── HEALTH (A2) ─────────────────────
  w("he1","sjuk","adj.","ốm","sick","Jag är sjuk idag.","Hôm nay tôi ốm.","I'm sick today.","A2","health"),
  w("he2","läkare","n.","bác sĩ","doctor","Boka tid hos läkaren.","Đặt lịch với bác sĩ.","Book an appointment with the doctor.","A2","health","en"),
  w("he3","sjuksköterska","n.","y tá","nurse","Sjuksköterskan hjälper dig.","Y tá sẽ giúp bạn.","The nurse will help you.","A2","health","en"),
  w("he4","feber","n.","sốt","fever","Jag har feber och hosta.","Tôi sốt và ho.","I have a fever and cough.","A2","health","en"),
  w("he5","huvudvärk","n.","đau đầu","headache","Hon har stark huvudvärk.","Cô ấy đau đầu nặng.","She has a bad headache.","A2","health","en"),
  w("he6","recept","n.","đơn thuốc","prescription","Receptet är klart.","Đơn thuốc đã xong.","The prescription is ready.","A2","health","ett"),
  w("he7","apotek","n.","nhà thuốc","pharmacy","Apoteket är öppet till nio.","Nhà thuốc mở đến 9 giờ.","The pharmacy is open until nine.","A2","health","ett"),
  w("he8","sjukhus","n.","bệnh viện","hospital","Sjukhuset ligger nära.","Bệnh viện gần đây.","The hospital is nearby.","A2","health","ett"),
  w("he9","allergisk","adj.","dị ứng","allergic","Jag är allergisk mot penicillin.","Tôi dị ứng penicillin.","I'm allergic to penicillin.","A2","health"),
  w("he10","medicin","n.","thuốc","medicine","Ta medicinen tre gånger om dagen.","Uống thuốc 3 lần/ngày.","Take the medicine 3 times a day.","A2","health","en"),
  w("he11","ont","adv.","đau","ache","Jag har ont i magen.","Tôi đau bụng.","I have a stomach ache.","A2","health"),
  w("he12","tid","n.","cuộc hẹn","appointment","Jag har en tid klockan tio.","Tôi có lịch hẹn lúc 10.","I have an appointment at ten.","A2","health","en"),

  // ───────────────────── HOBBIES (A2) ─────────────────────
  w("ho1","fritid","n.","thời gian rảnh","free time","På fritiden läser jag.","Lúc rảnh tôi đọc sách.","In my free time I read.","A2","hobbies","en"),
  w("ho2","bok","n.","quyển sách","book","Boken är spännande.","Cuốn sách hấp dẫn.","The book is exciting.","A1","hobbies","en"),
  w("ho3","film","n.","phim","film","Filmen var rolig.","Phim hay.","The film was funny.","A1","hobbies","en"),
  w("ho4","musik","n.","nhạc","music","Jag lyssnar på musik.","Tôi nghe nhạc.","I listen to music.","A1","hobbies","en"),
  w("ho5","spela","v.","chơi (nhạc/đá)","play","Han spelar fotboll.","Anh ấy chơi bóng đá.","He plays football.","A1","hobbies"),
  w("ho6","träna","v.","tập luyện","train/exercise","Vi tränar varje dag.","Chúng tôi tập mỗi ngày.","We train every day.","A2","hobbies"),
  w("ho7","simma","v.","bơi","swim","Vi simmar i sjön.","Chúng tôi bơi ở hồ.","We swim in the lake.","A2","hobbies"),
  w("ho8","cykla","v.","đi xe đạp","cycle","Jag cyklar till jobbet.","Tôi đạp xe đi làm.","I cycle to work.","A2","hobbies"),
  w("ho9","fika","v./n.","cà phê & bánh","coffee break","Ska vi fika ihop?","Mình fika cùng nhau nhé?","Shall we fika together?","A2","hobbies"),
  w("ho10","resa","v./n.","du lịch","travel","Vi vill resa till Lappland.","Chúng tôi muốn đi Lapland.","We want to travel to Lapland.","A2","hobbies","en"),

  // ───────────────────── SOCIETY & NEWS (B1) ─────────────────────
  w("so1","regering","n.","chính phủ","government","Regeringen tar beslut idag.","Chính phủ quyết định hôm nay.","The government decides today.","B1","society","en"),
  w("so2","lag","n.","luật","law","Den nya lagen träder i kraft.","Luật mới có hiệu lực.","The new law takes effect.","B1","society","en"),
  w("so3","val","n.","cuộc bầu cử","election","Valet är i april.","Bầu cử vào tháng 4.","The election is in April.","B1","society","ett"),
  w("so4","skatt","n.","thuế","tax","Skatten är hög i Norden.","Thuế ở Bắc Âu cao.","Taxes are high in the Nordics.","B1","society","en"),
  w("so5","invandring","n.","nhập cư","immigration","Invandring är en viktig fråga.","Nhập cư là vấn đề quan trọng.","Immigration is an important issue.","B1","society","en"),
  w("so6","integration","n.","hội nhập","integration","Integration tar tid.","Hội nhập cần thời gian.","Integration takes time.","B1","society","en"),
  w("so7","arbetsmarknad","n.","thị trường lao động","labour market","Arbetsmarknaden behöver experter.","Thị trường lao động cần chuyên gia.","The labour market needs experts.","B1","society","en"),
  w("so8","ekonomi","n.","kinh tế","economy","Ekonomin växer långsamt.","Kinh tế tăng chậm.","The economy is growing slowly.","B1","society","en"),
  w("so9","tidning","n.","báo","newspaper","Jag läser tidningen varje morgon.","Tôi đọc báo mỗi sáng.","I read the paper every morning.","A2","society","en"),
  w("so10","nyhet","n.","tin tức","news","Dagens nyheter är intressanta.","Tin hôm nay thú vị.","Today's news is interesting.","A2","society","en"),
  w("so11","källa","n.","nguồn (tin)","source","Kontrollera källan först.","Kiểm tra nguồn trước.","Check the source first.","B1","society","en"),
  w("so12","forskning","n.","nghiên cứu","research","Forskningen visar nya resultat.","Nghiên cứu cho kết quả mới.","Research shows new findings.","B1","society","en"),
  w("so13","jämställdhet","n.","bình đẳng","equality","Jämställdhet är viktigt.","Bình đẳng rất quan trọng.","Equality is important.","B1","society","en"),

  // ───────────────────── ENVIRONMENT (B1) ─────────────────────
  w("e1","miljö","n.","môi trường","environment","Vi måste skydda miljön.","Chúng ta phải bảo vệ môi trường.","We must protect the environment.","B1","environment","en"),
  w("e2","klimatförändring","n.","biến đổi khí hậu","climate change","Klimatförändringen påverkar Östersjön.","Biến đổi khí hậu tác động biển Baltic.","Climate change affects the Baltic Sea.","B1","environment","en"),
  w("e3","förnybar energi","phr.","năng lượng tái tạo","renewable energy","Vindkraft är förnybar energi.","Điện gió là năng lượng tái tạo.","Wind power is renewable energy.","B1","environment"),
  w("e4","återvinning","n.","tái chế","recycling","Återvinning är vardag i Finland.","Tái chế là việc hằng ngày ở Phần Lan.","Recycling is everyday life in Finland.","B1","environment","en"),
  w("e5","utsläpp","n.","khí thải","emissions","Bilarna släpper ut mycket koldioxid.","Xe ô tô thải nhiều CO2.","Cars emit a lot of CO2.","B1","environment","ett"),
  w("e6","skog","n.","rừng","forest","Skogarna täcker större delen av Finland.","Rừng phủ phần lớn Phần Lan.","Forests cover most of Finland.","A2","environment","en"),
  w("e7","sjö","n.","hồ","lake","Finland har tusentals sjöar.","Phần Lan có hàng nghìn hồ.","Finland has thousands of lakes.","A1","environment","en"),
  w("e8","plast","n.","nhựa","plastic","Vi måste minska plast.","Chúng ta phải giảm nhựa.","We must reduce plastic.","B1","environment","en"),
  w("e9","hållbar","adj.","bền vững","sustainable","En hållbar livsstil.","Lối sống bền vững.","A sustainable lifestyle.","B1","environment"),
  w("e10","påverka","v.","ảnh hưởng","affect/influence","Det påverkar vår framtid.","Điều đó ảnh hưởng tương lai chúng ta.","It affects our future.","B1","environment"),

  // ───────────────────── OPINION (B1) ─────────────────────
  w("op1","tycka","v.","cho rằng/thấy","think (opinion)","Jag tycker att det är dyrt.","Tôi thấy cái này đắt.","I think it's expensive.","A2","opinion"),
  w("op2","tro","v.","tin/nghĩ","believe","Jag tror att hon kommer.","Tôi nghĩ cô ấy sẽ đến.","I think she'll come.","A2","opinion"),
  w("op3","åsikt","n.","ý kiến","opinion","Min åsikt är annorlunda.","Quan điểm tôi khác.","My opinion is different.","B1","opinion","en"),
  w("op4","hålla med","phr.","đồng ý","agree","Jag håller med dig.","Tôi đồng ý với bạn.","I agree with you.","B1","opinion"),
  w("op5","däremot","adv.","trái lại","on the other hand","Han älskar sport, däremot tycker hon inte om det.","Anh mê thể thao, trái lại cô không thích.","He loves sport; she doesn't.","B1","opinion"),
  w("op6","dessutom","adv.","hơn nữa","moreover","Maten var god. Dessutom var den billig.","Đồ ngon, hơn nữa lại rẻ.","The food was good. Moreover, it was cheap.","B1","opinion"),
  w("op7","eftersom","conj.","bởi vì","because","Vi stannar hemma eftersom det regnar.","Chúng tôi ở nhà vì trời mưa.","We're staying home because it's raining.","B1","opinion"),
  w("op8","trots","prep.","mặc dù","despite","Trots regnet gick vi ut.","Mặc dù mưa, chúng tôi vẫn ra ngoài.","Despite the rain, we went out.","B1","opinion"),
  w("op9","fastän","conj.","mặc dù","although","Fastän han är trött, jobbar han.","Mặc dù mệt, anh ấy vẫn làm.","Although he's tired, he works.","B1","opinion"),
  w("op10","alltså","adv.","vì vậy","therefore","Det regnade, alltså stannade vi.","Trời mưa, vì vậy chúng tôi ở lại.","It rained, so we stayed.","B1","opinion"),
  w("op11","föreslå","v.","đề xuất","suggest","Jag föreslår en ny lösning.","Tôi đề xuất giải pháp mới.","I suggest a new solution.","B1","opinion"),
  w("op12","beror på","phr.","tuỳ thuộc","depends on","Det beror på vädret.","Cái đó tuỳ thời tiết.","It depends on the weather.","B1","opinion"),

  // ───────────────────── ABSTRACT B1 ─────────────────────
  w("a1","möjlighet","n.","cơ hội","opportunity","Det är en stor möjlighet.","Đây là cơ hội lớn.","It's a great opportunity.","B1","abstract","en"),
  w("a2","problem","n.","vấn đề","problem","Vi har ett problem.","Chúng tôi có vấn đề.","We have a problem.","A2","abstract","ett"),
  w("a3","lösning","n.","giải pháp","solution","Vi behöver en lösning.","Chúng tôi cần giải pháp.","We need a solution.","B1","abstract","en"),
  w("a4","framtid","n.","tương lai","future","Tänk på framtiden.","Hãy nghĩ về tương lai.","Think about the future.","B1","abstract","en"),
  w("a5","erfarenhet","n.","kinh nghiệm","experience","Han har mycket erfarenhet.","Anh ấy có nhiều kinh nghiệm.","He has a lot of experience.","B1","abstract","en"),
  w("a6","kunskap","n.","kiến thức","knowledge","Kunskap är makt.","Kiến thức là sức mạnh.","Knowledge is power.","B1","abstract","en"),
  w("a7","ansvar","n.","trách nhiệm","responsibility","Det är ditt ansvar.","Đó là trách nhiệm của bạn.","It's your responsibility.","B1","abstract","ett"),
  w("a8","beslut","n.","quyết định","decision","Det är ett viktigt beslut.","Đây là quyết định quan trọng.","It's an important decision.","B1","abstract","ett"),
  w("a9","utveckling","n.","sự phát triển","development","Den tekniska utvecklingen är snabb.","Phát triển công nghệ nhanh.","Technological development is fast.","B1","abstract","en"),
  w("a10","skillnad","n.","sự khác biệt","difference","Det är en stor skillnad.","Đó là khác biệt lớn.","It's a big difference.","B1","abstract","en"),
  w("a11","fördel","n.","ưu điểm","advantage","Det finns både fördelar och nackdelar.","Có cả ưu và nhược điểm.","There are both pros and cons.","B1","abstract","en"),
  w("a12","nackdel","n.","nhược điểm","disadvantage","Nackdelen är priset.","Nhược điểm là giá.","The disadvantage is the price.","B1","abstract","en"),
];

// Merge expansion banks for richer YKI coverage with IPA + extra categories.
import { SWEDISH_WORDS_EXPANSION } from "./swedishVocabExpansion";
import { SWEDISH_WORDS_EXPANSION_2 } from "./swedishVocabExpansion2";
import { SWEDISH_WORDS_EXPANSION_3 } from "./swedishVocabExpansion3";
import { SWEDISH_WORDS_MEGA } from "./swedishVocabMega";
import { SWEDISH_WORDS_MEGA_2 } from "./swedishVocabMega2";
import { SWEDISH_WORDS_MEGA_3 } from "./swedishVocabMega3";
import { SWEDISH_WORDS_MEGA_4 } from "./swedishVocabMega4";
import { SWEDISH_WORDS_MEGA_5 } from "./swedishVocabMega5";
import { SWEDISH_WORDS_MEGA_6 } from "./swedishVocabMega6";
import { SWEDISH_WORDS_MEGA_7 } from "./swedishVocabMega7";
import { normalizeSwedishWordExamples } from "./swedishExampleNormalizer";

const _LEVEL_ORDER: Record<SwedishLevel, number> = { A1: 1, A2: 2, B1: 3 };
// Aggregate + dedupe by Swedish form (keep the entry at the easiest level so
// learners always meet a word first at its lowest CEFR tier).
const _ALL_RAW: SwedishWord[] = [
  ..._SWEDISH_CORE_WORDS,
  // Mega7 listed early so its hand-written real examples win the dedupe
  // tie-break against any templated entries at the same CEFR level.
  ...SWEDISH_WORDS_MEGA_7,
  ...SWEDISH_WORDS_EXPANSION,
  ...SWEDISH_WORDS_EXPANSION_2,
  ...SWEDISH_WORDS_EXPANSION_3,
  ...SWEDISH_WORDS_MEGA,
  ...SWEDISH_WORDS_MEGA_2,
  ...SWEDISH_WORDS_MEGA_3,
  ...SWEDISH_WORDS_MEGA_4,
  ...SWEDISH_WORDS_MEGA_5,
  ...SWEDISH_WORDS_MEGA_6,
];
const _BY_KEY = new Map<string, SwedishWord>();
for (const w of _ALL_RAW) {
  const key = w.sv.trim().toLowerCase();
  const prev = _BY_KEY.get(key);
  if (!prev || _LEVEL_ORDER[w.level] < _LEVEL_ORDER[prev.level]) _BY_KEY.set(key, w);
}
// Final list sorted easy → hard (A1 → A2 → B1), then alphabetical inside level.
// Auto-generated examples are normalized into explicit meaning sentences so the
// bilingual translations stay natural and never read like machine-translated filler.
export const SWEDISH_WORDS: SwedishWord[] = Array.from(_BY_KEY.values()).map(normalizeSwedishWordExamples).sort(
  (a, b) => _LEVEL_ORDER[a.level] - _LEVEL_ORDER[b.level] || a.sv.localeCompare(b.sv, "sv")
);

export const SWEDISH_LEVELS: SwedishLevel[] = ["A1", "A2", "B1"];
