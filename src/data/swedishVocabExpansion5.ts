/**
 * @file swedishVocabExpansion5.ts
 * @description Fifth-pass Swedish vocabulary expansion. All examples are
 *              hand-written and semantically natural (no template output).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord, SwedishLevel } from "./swedishVocabBank";

const w = (
  id: string, sv: string, ipa: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, ipa, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

export const SWEDISH_WORDS_EXPANSION_5: SwedishWord[] = [
  // ───────────────────── A1: everyday life ─────────────────────
  w("e5a1","paraply","[paraˈplyː]","n.","cái ô","umbrella","Ta med ett paraply, det regnar ute.","Mang theo cái ô đi, ngoài trời đang mưa.","Bring an umbrella, it's raining outside.","A1","home","ett"),
  w("e5a2","stövlar","[ˈstøːvlar]","n. pl.","đôi ủng","boots","På vintern använder jag varma stövlar.","Mùa đông tôi dùng đôi ủng ấm.","In winter I wear warm boots.","A1","shopping"),
  w("e5a3","vante","[ˈvantɛ]","n.","găng tay len","mitten","Barnet tappade en vante i snön.","Đứa bé đánh rơi một chiếc găng tay trong tuyết.","The child dropped a mitten in the snow.","A1","shopping","en"),
  w("e5a4","halsduk","[ˈhalsˌdʉːk]","n.","khăn quàng cổ","scarf","Han glömde sin halsduk på bussen.","Anh ấy để quên khăn quàng cổ trên xe buýt.","He forgot his scarf on the bus.","A1","shopping","en"),
  w("e5a5","mössa","[ˈmœsːa]","n.","mũ len","beanie","Sätt på dig en mössa, det är kallt.","Đội mũ len vào đi, trời lạnh lắm.","Put on a beanie, it's cold.","A1","shopping","en"),
  w("e5a6","säng","[sɛŋː]","n.","cái giường","bed","Jag går och lägger mig i sängen nu.","Bây giờ tôi đi nằm lên giường.","I'm going to lie down in bed now.","A1","home","en"),
  w("e5a7","soffa","[ˈsɔfːa]","n.","ghế sofa","sofa","Vi tittar på tv i soffan varje kväll.","Chúng tôi xem tivi trên ghế sofa mỗi tối.","We watch TV on the sofa every evening.","A1","home","en"),
  w("e5a8","fönster","[ˈfœnstɛr]","n.","cửa sổ","window","Öppna fönstret, det är varmt här inne.","Mở cửa sổ đi, trong này nóng quá.","Open the window, it's hot in here.","A1","home","ett"),
  w("e5a9","dörr","[dœrː]","n.","cánh cửa","door","Glöm inte att låsa dörren när du går.","Đừng quên khoá cửa khi ra ngoài.","Don't forget to lock the door when you leave.","A1","home","en"),
  w("e5a10","trappa","[ˈtrapːa]","n.","cầu thang","stairs","Vi bor på tredje våningen, men hissen är trasig så vi tar trappan.","Chúng tôi ở tầng ba, nhưng thang máy hỏng nên đi cầu thang.","We live on the third floor, but the elevator is broken so we take the stairs.","A1","home","en"),
  w("e5a11","matta","[ˈmatːa]","n.","tấm thảm","rug","En blå matta ligger på vardagsrumsgolvet.","Một tấm thảm xanh nằm trên sàn phòng khách.","A blue rug lies on the living room floor.","A1","home","en"),
  w("e5a12","lampa","[ˈlampa]","n.","cái đèn","lamp","Tänd lampan, det är för mörkt att läsa.","Bật đèn lên đi, tối quá không đọc được.","Turn on the lamp, it's too dark to read.","A1","home","en"),
  w("e5a13","kylskåp","[ˈɕyːlˌskoːp]","n.","tủ lạnh","fridge","Mjölken står i kylskåpet.","Sữa để trong tủ lạnh.","The milk is in the fridge.","A1","home","ett"),
  w("e5a14","spis","[spiːs]","n.","bếp nấu","stove","Var försiktig, spisen är fortfarande varm.","Cẩn thận, bếp vẫn còn nóng.","Be careful, the stove is still hot.","A1","home","en"),
  w("e5a15","kran","[krɑːn]","n.","vòi nước","tap","Stäng kranen ordentligt när du är klar.","Khoá chặt vòi nước khi xong nhé.","Close the tap properly when you're done.","A1","home","en"),

  // ───────────────────── A2: routines & city life ─────────────────────
  w("e5b1","frukost","[ˈfrʉkːɔst]","n.","bữa sáng","breakfast","Jag äter alltid frukost innan jag går till jobbet.","Tôi luôn ăn sáng trước khi đi làm.","I always eat breakfast before going to work.","A2","food","en"),
  w("e5b2","lunch","[lɵnɧ]","n.","bữa trưa","lunch","Vi träffas för lunch klockan tolv.","Chúng ta gặp nhau ăn trưa lúc mười hai giờ.","Let's meet for lunch at twelve.","A2","food","en"),
  w("e5b3","middag","[ˈmɪdːaɡ]","n.","bữa tối","dinner","Familjen äter middag tillsammans varje söndag.","Cả gia đình ăn tối cùng nhau mỗi Chủ nhật.","The family eats dinner together every Sunday.","A2","food","en"),
  w("e5b4","recept","[rɛˈsɛpt]","n.","công thức nấu ăn","recipe","Min mormor gav mig sitt recept på köttbullar.","Bà tôi đã đưa cho tôi công thức làm thịt viên.","My grandmother gave me her meatball recipe.","A2","food","ett"),
  w("e5b5","affär","[aˈfæːr]","n.","cửa hàng","shop","Affären stänger klockan nio på kvällen.","Cửa hàng đóng lúc chín giờ tối.","The shop closes at nine in the evening.","A2","shopping","en"),
  w("e5b6","apotek","[apʊˈteːk]","n.","hiệu thuốc","pharmacy","Jag måste gå till apoteket och hämta medicin.","Tôi phải đến hiệu thuốc lấy thuốc.","I have to go to the pharmacy to pick up medicine.","A2","health","ett"),
  w("e5b7","sjukhus","[ˈɧʉːkˌhʉːs]","n.","bệnh viện","hospital","Han jobbar som sjuksköterska på sjukhuset.","Anh ấy làm y tá tại bệnh viện.","He works as a nurse at the hospital.","A2","health","ett"),
  w("e5b8","vårdcentral","[ˈvoːɖsɛnˌtrɑːl]","n.","trung tâm y tế","health center","Ring vårdcentralen om du behöver en tid.","Gọi trung tâm y tế nếu bạn cần đặt lịch.","Call the health center if you need an appointment.","A2","health","en"),
  w("e5b9","bibliotek","[bɪblɪʊˈteːk]","n.","thư viện","library","På biblioteket kan man låna böcker gratis.","Ở thư viện bạn có thể mượn sách miễn phí.","At the library you can borrow books for free.","A2","hobbies","ett"),
  w("e5b10","museum","[mʉˈseːɵm]","n.","viện bảo tàng","museum","Vasamuseet är ett av Stockholms mest berömda museer.","Vasa là một trong những viện bảo tàng nổi tiếng nhất của Stockholm.","The Vasa Museum is one of Stockholm's most famous museums.","A2","hobbies","ett"),
  w("e5b11","biograf","[bɪʊˈɡrɑːf]","n.","rạp chiếu phim","cinema","Vi ska på biograf ikväll för att se en ny film.","Tối nay chúng tôi đi rạp xem phim mới.","We're going to the cinema tonight to see a new film.","A2","hobbies","en"),
  w("e5b12","restaurang","[rɛstaɵˈraŋ]","n.","nhà hàng","restaurant","Restaurangen har mycket bra fisk.","Nhà hàng này có món cá rất ngon.","The restaurant has very good fish.","A2","food","en"),
  w("e5b13","meny","[mɛˈnyː]","n.","thực đơn","menu","Kan jag få se menyn, tack?","Cho tôi xem thực đơn được không?","May I see the menu, please?","A2","food","en"),
  w("e5b14","beställa","[bɛˈstɛlːa]","v.","đặt món / đặt hàng","to order","Vi beställde pizza till lunch.","Chúng tôi đặt pizza cho bữa trưa.","We ordered pizza for lunch.","A2","food"),
  w("e5b15","boka","[ˈbuːka]","v.","đặt trước","to book","Jag vill boka ett bord för fyra personer.","Tôi muốn đặt bàn cho bốn người.","I'd like to book a table for four.","A2","food"),
  w("e5b16","avboka","[ˈɑːvˌbuːka]","v.","huỷ đặt","to cancel a booking","Vi behöver avboka mötet på fredag.","Chúng tôi cần huỷ cuộc họp thứ Sáu.","We need to cancel the Friday meeting.","A2","work"),
  w("e5b17","tid","[tiːd]","n.","thời gian / lịch hẹn","time / appointment","Har du tid att prata en stund?","Bạn có thời gian nói chuyện một chút không?","Do you have time to talk for a moment?","A2","abstract","en"),
  w("e5b18","möte","[ˈmøːtɛ]","n.","cuộc họp","meeting","Vi har ett viktigt möte imorgon bitti.","Chúng ta có cuộc họp quan trọng sáng mai.","We have an important meeting tomorrow morning.","A2","work","ett"),
  w("e5b19","kollega","[kɔˈleːɡa]","n.","đồng nghiệp","colleague","Min kollega hjälpte mig med rapporten.","Đồng nghiệp đã giúp tôi làm báo cáo.","My colleague helped me with the report.","A2","work","en"),

  // ───────────────────── B1: society, feelings, abstract ─────────────────────
  w("e5c1","erfarenhet","[æːrˈfɑːrənheːt]","n.","kinh nghiệm","experience","Hon har lång erfarenhet av att arbeta med barn.","Cô ấy có nhiều kinh nghiệm làm việc với trẻ em.","She has long experience working with children.","B1","work","en"),
  w("e5c2","utbildning","[ˈʉːtˌbɪldnɪŋ]","n.","học vấn / đào tạo","education","En bra utbildning öppnar många dörrar.","Học vấn tốt mở ra nhiều cánh cửa.","A good education opens many doors.","B1","society","en"),
  w("e5c3","möjlighet","[ˈmøːjlɪɡheːt]","n.","cơ hội","opportunity","Det här är en unik möjlighet för unga forskare.","Đây là cơ hội hiếm có cho các nhà nghiên cứu trẻ.","This is a unique opportunity for young researchers.","B1","abstract","en"),
  w("e5c4","utmaning","[ˈʉːtˌmɑːnɪŋ]","n.","thử thách","challenge","Att lära sig ett nytt språk är en spännande utmaning.","Học một ngôn ngữ mới là thử thách thú vị.","Learning a new language is an exciting challenge.","B1","abstract","en"),
  w("e5c5","framgång","[ˈframːˌɡɔŋ]","n.","thành công","success","Hans framgång beror på hårt arbete.","Thành công của anh ấy nhờ làm việc chăm chỉ.","His success is due to hard work.","B1","abstract","en"),
  w("e5c6","misslyckande","[ˈmɪsːˌlʏkːandɛ]","n.","thất bại","failure","Ett misslyckande är också en chans att lära sig.","Thất bại cũng là cơ hội để học hỏi.","A failure is also a chance to learn.","B1","abstract","ett"),
  w("e5c7","beslut","[bɛˈslʉːt]","n.","quyết định","decision","Att flytta utomlands var ett stort beslut.","Chuyển ra nước ngoài là một quyết định lớn.","Moving abroad was a big decision.","B1","abstract","ett"),
  w("e5c8","ansvar","[ˈansːvar]","n.","trách nhiệm","responsibility","Föräldrar har ansvar för sina barns skolgång.","Cha mẹ có trách nhiệm với việc học của con.","Parents are responsible for their children's schooling.","B1","society","ett"),
  w("e5c9","rättighet","[ˈrɛtːɪɡheːt]","n.","quyền lợi","right","Alla har rätt till utbildning och sjukvård.","Mọi người đều có quyền được học và chăm sóc y tế.","Everyone has the right to education and healthcare.","B1","society","en"),
  w("e5c10","skyldighet","[ˈɧʏlːdɪɡheːt]","n.","nghĩa vụ","duty","Det är vår skyldighet att rösta i valet.","Bỏ phiếu là nghĩa vụ của chúng ta.","It is our duty to vote in the election.","B1","society","en"),
  w("e5c11","åsikt","[ˈoːˌsɪkt]","n.","ý kiến","opinion","Alla har rätt att uttrycka sin åsikt.","Ai cũng có quyền bày tỏ ý kiến của mình.","Everyone has the right to express their opinion.","B1","opinion","en"),
  w("e5c12","argument","[arɡʉˈmɛnt]","n.","luận điểm","argument","Han hade starka argument för sin idé.","Anh ấy có luận điểm mạnh cho ý tưởng của mình.","He had strong arguments for his idea.","B1","opinion","ett"),
  w("e5c13","fördel","[ˈføːˌɖeːl]","n.","ưu điểm","advantage","En fördel med staden är den bra kollektivtrafiken.","Một ưu điểm của thành phố là giao thông công cộng tốt.","An advantage of the city is the good public transport.","B1","opinion","en"),
  w("e5c14","nackdel","[ˈnakːˌdeːl]","n.","nhược điểm","disadvantage","Nackdelen med att bo på landet är att bussen går sällan.","Nhược điểm của việc sống ở nông thôn là xe buýt hiếm khi chạy.","The disadvantage of living in the countryside is that the bus rarely runs.","B1","opinion","en"),
  w("e5c15","påverka","[ˈpoːˌvɛrːka]","v.","ảnh hưởng","to influence","Sociala medier påverkar hur unga tänker.","Mạng xã hội ảnh hưởng đến cách người trẻ suy nghĩ.","Social media influences how young people think.","B1","society"),
  w("e5c16","utveckla","[ˈʉːtˌvɛkːla]","v.","phát triển","to develop","Företaget vill utveckla nya produkter för utländska marknader.","Công ty muốn phát triển sản phẩm mới cho thị trường nước ngoài.","The company wants to develop new products for foreign markets.","B1","work"),
  w("e5c17","förändra","[fœrˈɛndra]","v.","thay đổi","to change","Pandemin förändrade hur vi jobbar.","Đại dịch đã thay đổi cách chúng ta làm việc.","The pandemic changed how we work.","B1","abstract"),
  w("e5c18","föreslå","[ˈføːrɛˌsloː]","v.","đề xuất","to suggest","Jag föreslår att vi tar en paus.","Tôi đề xuất chúng ta nghỉ giải lao.","I suggest we take a break.","B1","opinion"),
  w("e5c19","undersöka","[ˈɵndɛrˌsøːka]","v.","điều tra / khảo sát","to investigate","Forskare undersöker hur sömn påverkar minnet.","Các nhà nghiên cứu điều tra cách giấc ngủ ảnh hưởng đến trí nhớ.","Researchers investigate how sleep affects memory.","B1","abstract"),
  w("e5c20","jämföra","[ˈjɛmːˌføːra]","v.","so sánh","to compare","Man kan inte jämföra äpplen och päron.","Không thể so sánh táo với lê.","You can't compare apples and pears.","B1","abstract"),
];
