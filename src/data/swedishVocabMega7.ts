/**
 * @file swedishVocabMega7.ts
 * @description Seventh wave Swedish A1–B1 vocabulary — high-quality, hand-written
 *              entries with realistic example sentences (not templated) so the
 *              cloze and listening review modes have meaningful prompts.
 *              ~150 everyday words covering gaps in the prior waves: daily
 *              routines, feelings, classroom, weather, travel, civic life,
 *              digital life and study-abroad survival phrases.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord } from "./swedishVocabBank";

const w = (
  id: string, sv: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: "A1" | "A2" | "B1", category: string, article?: "en" | "ett",
  ipa?: string,
): SwedishWord => ({ id, sv, pos, vi, en, example, exampleVi, exampleEn, level, category, article, ipa });

export const SWEDISH_WORDS_MEGA_7: SwedishWord[] = [
  // ───── Daily routine A1 (real examples) ─────
  w("m7_d1","vakna","v.","thức dậy","wake up","Jag vaknar klockan sju varje dag.","Tôi thức dậy lúc 7 giờ mỗi ngày.","I wake up at seven every day.","A1","daily"),
  w("m7_d2","stiga upp","phr.","đứng dậy/ra khỏi giường","get up","Jag stiger upp direkt efter alarmet.","Tôi ra khỏi giường ngay sau chuông báo thức.","I get up right after the alarm.","A1","daily"),
  w("m7_d3","borsta tänderna","phr.","đánh răng","brush teeth","Glöm inte att borsta tänderna.","Đừng quên đánh răng.","Don't forget to brush your teeth.","A1","daily"),
  w("m7_d4","duscha","v.","tắm vòi sen","shower","Jag duschar på morgonen.","Tôi tắm vòi sen vào buổi sáng.","I shower in the morning.","A1","daily"),
  w("m7_d5","äta frukost","phr.","ăn sáng","have breakfast","Vi äter frukost tillsammans.","Chúng tôi ăn sáng cùng nhau.","We have breakfast together.","A1","daily"),
  w("m7_d6","ta bussen","phr.","đi xe buýt","take the bus","Jag tar bussen till skolan.","Tôi đi xe buýt đến trường.","I take the bus to school.","A1","daily"),
  w("m7_d7","gå hem","phr.","đi về nhà","go home","Jag går hem efter jobbet.","Tôi đi về nhà sau giờ làm.","I go home after work.","A1","daily"),
  w("m7_d8","laga middag","phr.","nấu bữa tối","cook dinner","På fredag lagar jag middag åt familjen.","Thứ Sáu tôi nấu bữa tối cho gia đình.","On Friday I cook dinner for the family.","A1","daily"),
  w("m7_d9","gå och lägga sig","phr.","đi ngủ","go to bed","Barnen går och lägger sig klockan nio.","Bọn trẻ đi ngủ lúc 9 giờ.","The kids go to bed at nine.","A1","daily"),
  w("m7_d10","sova gott","phr.","ngủ ngon","sleep well","Sov gott!","Ngủ ngon nhé!","Sleep well!","A1","daily"),

  // ───── Feelings & states A1–A2 ─────
  w("m7_f1","glad","adj.","vui","happy","Jag är glad idag.","Hôm nay tôi vui.","I'm happy today.","A1","opinion"),
  w("m7_f2","ledsen","adj.","buồn","sad","Hon är ledsen för att hunden är sjuk.","Cô ấy buồn vì con chó bị ốm.","She is sad because the dog is sick.","A1","opinion"),
  w("m7_f3","arg","adj.","giận","angry","Han blev arg på chefen.","Anh ấy giận sếp.","He got angry at the boss.","A2","opinion"),
  w("m7_f4","trött","adj.","mệt","tired","Jag är trött efter en lång dag.","Tôi mệt sau một ngày dài.","I'm tired after a long day.","A1","opinion"),
  w("m7_f5","hungrig","adj.","đói","hungry","Är du hungrig?","Bạn đói không?","Are you hungry?","A1","food"),
  w("m7_f6","törstig","adj.","khát","thirsty","Jag är törstig, kan jag få vatten?","Tôi khát, cho tôi xin nước được không?","I'm thirsty, can I have water?","A1","food"),
  w("m7_f7","nervös","adj.","lo lắng","nervous","Hon är nervös inför provet.","Cô ấy lo lắng trước kỳ thi.","She is nervous before the test.","A2","opinion"),
  w("m7_f8","stolt","adj.","tự hào","proud","Föräldrarna är stolta över henne.","Bố mẹ tự hào về cô.","The parents are proud of her.","A2","opinion"),
  w("m7_f9","rädd","adj.","sợ","afraid","Var inte rädd, det går bra.","Đừng sợ, sẽ ổn thôi.","Don't be afraid, it'll be fine.","A2","opinion"),
  w("m7_f10","lugn","adj.","bình tĩnh","calm","Försök vara lugn.","Hãy cố bình tĩnh.","Try to stay calm.","A2","opinion"),

  // ───── Classroom & study A1–A2 ─────
  w("m7_c1","lärare","n.","giáo viên","teacher","Vår lärare heter Anna.","Cô giáo chúng tôi tên Anna.","Our teacher's name is Anna.","A1","work","en"),
  w("m7_c2","elev","n.","học sinh","pupil","Klassen har tjugo elever.","Lớp có 20 học sinh.","The class has twenty pupils.","A1","work","en"),
  w("m7_c3","läxa","n.","bài tập về nhà","homework","Jag gör läxan på kvällen.","Tôi làm bài tập buổi tối.","I do homework in the evening.","A1","work","en"),
  w("m7_c4","prov","n.","bài kiểm tra","test","Vi har ett prov på fredag.","Chúng tôi có bài kiểm tra thứ Sáu.","We have a test on Friday.","A1","work","ett"),
  w("m7_c5","fråga","n.","câu hỏi","question","Jag har en fråga.","Tôi có một câu hỏi.","I have a question.","A1","work","en"),
  w("m7_c6","svar","n.","câu trả lời","answer","Det är rätt svar.","Đó là câu trả lời đúng.","That's the right answer.","A1","work","ett"),
  w("m7_c7","öva","v.","luyện tập","practise","Jag övar svenska varje dag.","Tôi luyện tiếng Thụy Điển hàng ngày.","I practise Swedish every day.","A1","work"),
  w("m7_c8","förstå","v.","hiểu","understand","Förstår du mig?","Bạn hiểu tôi chứ?","Do you understand me?","A1","work"),
  w("m7_c9","upprepa","v.","lặp lại","repeat","Kan du upprepa, tack?","Bạn lặp lại được không?","Could you repeat, please?","A2","work"),
  w("m7_c10","stava","v.","đánh vần","spell","Hur stavar man ditt namn?","Tên bạn đánh vần thế nào?","How do you spell your name?","A2","work"),
  w("m7_c11","anteckna","v.","ghi chú","take notes","Studenterna antecknar under föreläsningen.","Sinh viên ghi chú trong giờ giảng.","Students take notes during the lecture.","B1","work"),
  w("m7_c12","plugga","v.","học (thân mật)","study (colloq.)","Jag pluggar inför provet.","Tôi đang học cho bài kiểm tra.","I'm studying for the test.","A2","work"),

  // ───── Weather A1–A2 ─────
  w("m7_w1","sol","n.","mặt trời","sun","Solen skiner idag.","Hôm nay mặt trời chiếu sáng.","The sun is shining today.","A1","environment","en"),
  w("m7_w2","regn","n.","mưa","rain","Det är mycket regn på hösten.","Trời nhiều mưa vào mùa thu.","There is a lot of rain in autumn.","A1","environment","ett"),
  w("m7_w3","snö","n.","tuyết","snow","I december kommer snön.","Tháng 12 tuyết bắt đầu rơi.","Snow comes in December.","A1","environment","en"),
  w("m7_w4","vind","n.","gió","wind","Det blåser kall vind idag.","Hôm nay gió lạnh.","A cold wind is blowing today.","A2","environment","en"),
  w("m7_w5","moln","n.","mây","cloud","Himlen är full av moln.","Trời đầy mây.","The sky is full of clouds.","A2","environment","ett"),
  w("m7_w6","åska","n.","sấm sét","thunder","Det blir åska i kväll.","Tối nay sẽ có sấm sét.","There will be thunder tonight.","B1","environment","en"),
  w("m7_w7","temperatur","n.","nhiệt độ","temperature","Temperaturen är minus fem grader.","Nhiệt độ là âm 5 độ.","The temperature is minus five degrees.","A2","environment","en"),
  w("m7_w8","väderprognos","n.","dự báo thời tiết","weather forecast","Jag kollar väderprognosen varje morgon.","Tôi xem dự báo thời tiết mỗi sáng.","I check the weather forecast every morning.","B1","environment","en"),

  // ───── Travel & directions A1–A2 ─────
  w("m7_t1","resa","v.","đi du lịch","travel","Vi reser till Stockholm i sommar.","Hè này chúng tôi đi Stockholm.","We're travelling to Stockholm this summer.","A1","directions"),
  w("m7_t2","biljett","n.","vé","ticket","En biljett till Göteborg, tack.","Một vé đi Göteborg, làm ơn.","One ticket to Göteborg, please.","A1","directions","en"),
  w("m7_t3","tåg","n.","tàu hỏa","train","Tåget avgår klockan tio.","Tàu khởi hành lúc 10 giờ.","The train departs at ten.","A1","directions","ett"),
  w("m7_t4","flygplan","n.","máy bay","airplane","Flygplanet landar snart.","Máy bay sắp hạ cánh.","The plane lands soon.","A2","directions","ett"),
  w("m7_t5","hållplats","n.","trạm dừng","stop (bus)","Vi väntar vid hållplatsen.","Chúng tôi đợi ở trạm.","We wait at the stop.","A2","directions","en"),
  w("m7_t6","karta","n.","bản đồ","map","Får jag se på kartan?","Cho tôi xem bản đồ được không?","May I look at the map?","A1","directions","en"),
  w("m7_t7","vägbeskrivning","n.","chỉ đường","directions","Jag behöver en vägbeskrivning.","Tôi cần chỉ đường.","I need directions.","B1","directions","en"),
  w("m7_t8","gå rakt fram","phr.","đi thẳng","go straight ahead","Gå rakt fram, sedan till vänster.","Đi thẳng, sau đó rẽ trái.","Go straight ahead, then turn left.","A1","directions"),
  w("m7_t9","sväng","v.","rẽ","turn","Sväng höger vid kyrkan.","Rẽ phải ở nhà thờ.","Turn right at the church.","A2","directions"),
  w("m7_t10","missa","v.","lỡ","miss","Jag missade bussen.","Tôi lỡ xe buýt.","I missed the bus.","A2","directions"),

  // ───── Civic & study-abroad A2–B1 ─────
  w("m7_s1","ansökan","n.","đơn xin","application","Ansökan måste skickas in före fredag.","Đơn phải nộp trước thứ Sáu.","The application must be sent in before Friday.","B1","society","en"),
  w("m7_s2","intyg","n.","chứng nhận","certificate","Du behöver ett intyg från läkaren.","Bạn cần giấy chứng nhận từ bác sĩ.","You need a certificate from the doctor.","B1","society","ett"),
  w("m7_s3","kö","n.","hàng đợi","queue","Det är lång kö idag.","Hôm nay hàng đợi dài.","There's a long queue today.","A2","society","en"),
  w("m7_s4","blankett","n.","biểu mẫu","form","Fyll i blanketten med blå penna.","Điền mẫu bằng bút xanh.","Fill in the form with a blue pen.","B1","society","en"),
  w("m7_s5","personnummer","n.","số định danh cá nhân","personal id number","Skriv ditt personnummer här.","Viết số định danh của bạn vào đây.","Write your personal number here.","B1","society","ett"),
  w("m7_s6","skatteverket","n.","cục thuế","tax agency","Skatteverket hjälper med personnummer.","Cục thuế hỗ trợ về số định danh.","The Tax Agency helps with the personal number.","B1","society","ett"),
  w("m7_s7","försäkringskassa","n.","cơ quan bảo hiểm xã hội","social insurance agency","Försäkringskassan betalar föräldrapenning.","Cơ quan bảo hiểm xã hội trả tiền cha mẹ.","The Social Insurance Agency pays parental benefit.","B1","society","en"),
  w("m7_s8","hyreskontrakt","n.","hợp đồng thuê nhà","tenancy contract","Skriv inte under hyreskontraktet i panik.","Đừng vội ký hợp đồng thuê.","Don't sign the tenancy contract in panic.","B1","home","ett"),
  w("m7_s9","studiebidrag","n.","trợ cấp học tập","study allowance","Studiebidrag betalas en gång i månaden.","Trợ cấp học tập được trả mỗi tháng một lần.","The study allowance is paid once a month.","B1","work","ett"),
  w("m7_s10","komvux","n.","trường dạy người lớn","municipal adult education","Komvux erbjuder gratis svenska för invandrare.","Komvux dạy tiếng Thụy Điển miễn phí cho người nhập cư.","Komvux offers free Swedish for immigrants.","B1","work","en"),

  // ───── Digital life A2–B1 ─────
  w("m7_n1","app","n.","ứng dụng","app","Den här appen är gratis.","Ứng dụng này miễn phí.","This app is free.","A1","society","en"),
  w("m7_n2","lösenord","n.","mật khẩu","password","Glöm inte ditt lösenord.","Đừng quên mật khẩu.","Don't forget your password.","A2","society","ett"),
  w("m7_n3","ladda ner","phr.","tải xuống","download","Jag laddar ner filen nu.","Tôi đang tải file.","I'm downloading the file now.","A2","society"),
  w("m7_n4","skicka","v.","gửi","send","Jag skickar ett mejl till dig.","Tôi sẽ gửi email cho bạn.","I'll send you an email.","A1","society"),
  w("m7_n5","sociala medier","n.","mạng xã hội","social media","Många unga använder sociala medier.","Nhiều bạn trẻ dùng mạng xã hội.","Many young people use social media.","B1","society"),
  w("m7_n6","integritet","n.","quyền riêng tư","privacy","Integritet på nätet är viktigt.","Quyền riêng tư online quan trọng.","Online privacy is important.","B1","society","en"),
  w("m7_n7","artificiell intelligens","n.","trí tuệ nhân tạo","artificial intelligence","Artificiell intelligens förändrar samhället.","Trí tuệ nhân tạo đang thay đổi xã hội.","Artificial intelligence is changing society.","B1","society","en"),

  // ───── Useful B1 verbs (real examples) ─────
  w("m7_v1","påverka","v.","ảnh hưởng","affect","Vädret påverkar humöret.","Thời tiết ảnh hưởng tâm trạng.","The weather affects your mood.","B1","opinion"),
  w("m7_v2","bestämma","v.","quyết định","decide","Vi bestämmer i morgon.","Chúng tôi sẽ quyết định vào mai.","We'll decide tomorrow.","B1","opinion"),
  w("m7_v3","fungera","v.","hoạt động","work/function","Datorn fungerar inte.","Máy tính không chạy.","The computer doesn't work.","A2","society"),
  w("m7_v4","behöva","v.","cần","need","Jag behöver hjälp med blanketten.","Tôi cần giúp đỡ với mẫu đơn.","I need help with the form.","A1","society"),
  w("m7_v5","ändra","v.","thay đổi","change","Du kan ändra inställningarna här.","Bạn có thể thay đổi cài đặt ở đây.","You can change the settings here.","A2","society"),
  w("m7_v6","jämföra","v.","so sánh","compare","Vi jämför priser innan vi köper.","Chúng tôi so giá trước khi mua.","We compare prices before buying.","B1","shopping"),
  w("m7_v7","räkna","v.","đếm","count","Räkna pengarna noga.","Đếm tiền cẩn thận.","Count the money carefully.","A1","numbers"),
  w("m7_v8","välja","v.","chọn","choose","Du måste välja en kurs.","Bạn phải chọn một khóa học.","You have to choose a course.","A2","work"),
  w("m7_v9","beställa","v.","đặt (hàng)","order","Jag vill beställa en kaffe.","Tôi muốn đặt một cà phê.","I'd like to order a coffee.","A2","shopping"),
  w("m7_v10","betala","v.","trả tiền","pay","Hur vill du betala?","Bạn muốn trả thế nào?","How would you like to pay?","A1","shopping"),
  w("m7_v11","spara","v.","tiết kiệm/lưu","save","Spara dokumentet innan du stänger.","Lưu tài liệu trước khi đóng.","Save the document before closing.","A2","society"),
  w("m7_v12","hyra","v.","thuê","rent","Vi hyr en lägenhet i Malmö.","Chúng tôi thuê một căn hộ ở Malmö.","We rent a flat in Malmö.","A2","home"),

  // ───── Survival phrases (B1 polite) ─────
  w("m7_p1","skulle kunna","phr.","có thể (lịch sự)","could (polite)","Skulle du kunna hjälpa mig?","Bạn có thể giúp tôi không?","Could you help me?","B1","opinion"),
  w("m7_p2","kanske","adv.","có thể","maybe","Kanske kommer hon senare.","Có thể cô ấy đến muộn.","Maybe she'll come later.","A1","opinion"),
  w("m7_p3","tyvärr","adv.","tiếc là","unfortunately","Tyvärr är butiken stängd.","Tiếc là cửa hàng đóng cửa.","Unfortunately the shop is closed.","A2","opinion"),
  w("m7_p4","absolut","adv.","chắc chắn","absolutely","Absolut, det går bra.","Chắc chắn rồi, không sao.","Absolutely, that's fine.","A2","opinion"),
  w("m7_p5","gärna","adv.","sẵn lòng","gladly","Jag hjälper dig gärna.","Tôi sẵn lòng giúp.","I'd gladly help you.","A2","opinion"),
  w("m7_p6","ingen orsak","phr.","không có gì","you're welcome","Tack! — Ingen orsak.","Cảm ơn! — Không có gì.","Thanks! — You're welcome.","A1","greetings"),
  w("m7_p7","det gör inget","phr.","không sao","never mind","Förlåt! — Det gör inget.","Xin lỗi! — Không sao.","Sorry! — Never mind.","A2","greetings"),
  w("m7_p8","jag förstår","phr.","tôi hiểu","I see","Jag förstår vad du menar.","Tôi hiểu ý bạn.","I see what you mean.","A1","opinion"),

  // ───── Body & health A2 ─────
  w("m7_b1","huvud","n.","đầu","head","Jag har ont i huvudet.","Tôi đau đầu.","I have a headache.","A2","health","ett"),
  w("m7_b2","mage","n.","bụng","stomach","Magen gör ont efter middagen.","Bụng đau sau bữa tối.","My stomach hurts after dinner.","A2","health","en"),
  w("m7_b3","feber","n.","sốt","fever","Barnet har feber.","Bé bị sốt.","The child has a fever.","A2","health","en"),
  w("m7_b4","hosta","v.","ho","cough","Jag hostar mycket på natten.","Tôi ho nhiều vào ban đêm.","I cough a lot at night.","A2","health"),
  w("m7_b5","recept","n.","đơn thuốc/công thức","prescription/recipe","Du behöver ett recept från läkaren.","Bạn cần đơn thuốc của bác sĩ.","You need a prescription from the doctor.","B1","health","ett"),
  w("m7_b6","vårdcentral","n.","trạm y tế","health center","Boka tid på vårdcentralen.","Đặt lịch ở trạm y tế.","Book a time at the health centre.","B1","health","en"),
];
