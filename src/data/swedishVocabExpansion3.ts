/**
 * @file swedishVocabExpansion3.ts
 * @description Third-pass Swedish vocabulary expansion covering A1, A2 and B1.
 *              Every entry has a hand-written, semantically natural example
 *              (no template output) so the sentences read as authentic Swedish.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord, SwedishLevel } from "./swedishVocabBank";

const w = (
  id: string, sv: string, ipa: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, ipa, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

export const SWEDISH_WORDS_EXPANSION_3: SwedishWord[] = [
  // ───────────────────── A1 ─────────────────────
  w("e3a1","tröja","[ˈtrø̂jːa]","n.","áo len / áo dài tay","sweater","Jag har på mig en varm tröja idag.","Hôm nay tôi mặc một chiếc áo len ấm.","I'm wearing a warm sweater today.","A1","shopping","en"),
  w("e3a2","skor","[skuːr]","n. pl.","đôi giày","shoes","Mina nya skor är svarta.","Đôi giày mới của tôi màu đen.","My new shoes are black.","A1","shopping"),
  w("e3a3","paraply","[ˌparaˈpliː]","n.","cây dù","umbrella","Ta med ett paraply, det regnar.","Mang theo dù đi, trời đang mưa.","Take an umbrella, it's raining.","A1","home","ett"),
  w("e3a4","säng","[sɛŋː]","n.","cái giường","bed","Barnen sover redan i sängen.","Bọn trẻ đã ngủ trên giường rồi.","The children are already asleep in bed.","A1","home","en"),
  w("e3a5","dörr","[dœrː]","n.","cửa ra vào","door","Kan du stänga dörren, tack?","Bạn đóng cửa lại giúp tôi được không?","Can you close the door, please?","A1","home","en"),
  w("e3a6","fönster","[ˈfœnstɛr]","n.","cửa sổ","window","Öppna fönstret, det är varmt inne.","Mở cửa sổ đi, trong phòng nóng lắm.","Open the window, it's hot inside.","A1","home","ett"),
  w("e3a7","bord","[buːɖ]","n.","cái bàn","table","Vi äter middag vid bordet.","Chúng tôi ăn tối bên bàn.","We have dinner at the table.","A1","home","ett"),
  w("e3a8","stol","[stuːl]","n.","cái ghế","chair","Sätt dig på stolen, tack.","Mời bạn ngồi xuống ghế.","Please sit down on the chair.","A1","home","en"),
  w("e3a9","buss","[bɵsː]","n.","xe buýt","bus","Bussen till centrum går var tionde minut.","Xe buýt vào trung tâm chạy mỗi mười phút.","The bus to the city center runs every ten minutes.","A1","directions","en"),
  w("e3a10","tåg","[toːɡ]","n.","xe lửa","train","Tåget till Stockholm avgår klockan åtta.","Tàu đi Stockholm khởi hành lúc tám giờ.","The train to Stockholm leaves at eight.","A1","directions","ett"),
  w("e3a11","cykel","[ˈsʏkːɛl]","n.","xe đạp","bicycle","Jag åker cykel till jobbet varje dag.","Tôi đi xe đạp đến chỗ làm mỗi ngày.","I ride a bicycle to work every day.","A1","directions","en"),
  w("e3a12","bilen","[ˈbiːlɛn]","n. def.","chiếc xe hơi (xác định)","the car","Bilen står på parkeringen.","Chiếc xe đang đậu ở bãi đỗ.","The car is in the parking lot.","A1","directions","en"),
  w("e3a13","varm","[varm]","adj.","ấm / nóng","warm","Kaffet är fortfarande varmt.","Cà phê vẫn còn ấm.","The coffee is still warm.","A1","opinion"),
  w("e3a14","kall","[kalː]","adj.","lạnh","cold","Vintern i Sverige är väldigt kall.","Mùa đông ở Thụy Điển rất lạnh.","Winter in Sweden is very cold.","A1","opinion"),
  w("e3a15","glad","[ɡlɑːd]","adj.","vui","happy","Jag är glad att se dig igen.","Tôi rất vui khi gặp lại bạn.","I'm happy to see you again.","A1","opinion"),
  w("e3a16","ledsen","[ˈleːsɛn]","adj.","buồn","sad","Hon är ledsen för att hunden är sjuk.","Cô ấy buồn vì con chó bị ốm.","She is sad because the dog is sick.","A1","opinion"),
  w("e3a17","hungrig","[ˈhɵŋːrɪɡ]","adj.","đói","hungry","Barnen är hungriga efter skolan.","Bọn trẻ đói bụng sau giờ học.","The children are hungry after school.","A1","food"),
  w("e3a18","törstig","[ˈtœʂːtɪɡ]","adj.","khát","thirsty","Jag är törstig, kan jag få vatten?","Tôi khát nước, xin nước được không?","I'm thirsty, may I have some water?","A1","food"),

  // ───────────────────── A2 ─────────────────────
  w("e3b1","semester","[sɛˈmɛstɛr]","n.","kỳ nghỉ","vacation","I sommar åker vi på semester till Grekland.","Mùa hè này chúng tôi đi nghỉ ở Hy Lạp.","This summer we're going on vacation to Greece.","A2","hobbies","en"),
  w("e3b2","biljett","[bɪlˈjɛtː]","n.","vé","ticket","Jag köpte en biljett till konserten på nätet.","Tôi đã mua một vé xem hoà nhạc trên mạng.","I bought a ticket to the concert online.","A2","directions","en"),
  w("e3b3","kvitto","[ˈkvɪtːʊ]","n.","hoá đơn","receipt","Kan jag få ett kvitto, tack?","Cho tôi xin hoá đơn được không?","Can I have a receipt, please?","A2","shopping","ett"),
  w("e3b4","rabatt","[raˈbatː]","n.","giảm giá","discount","Studenter får tio procent rabatt här.","Sinh viên được giảm mười phần trăm ở đây.","Students get a ten percent discount here.","A2","shopping","en"),
  w("e3b5","möte","[ˈmøːtɛ]","n.","cuộc họp","meeting","Vi har ett viktigt möte på måndag.","Chúng tôi có một cuộc họp quan trọng vào thứ Hai.","We have an important meeting on Monday.","A2","work","ett"),
  w("e3b6","kollega","[kɔˈleːɡa]","n.","đồng nghiệp","colleague","Min kollega hjälper mig med rapporten.","Đồng nghiệp của tôi giúp tôi làm báo cáo.","My colleague is helping me with the report.","A2","work","en"),
  w("e3b7","lön","[løːn]","n.","lương","salary","Lönen kommer den 25:e varje månad.","Lương về vào ngày 25 mỗi tháng.","The salary arrives on the 25th of every month.","A2","work","en"),
  w("e3b8","ansöka","[ˈanːˌsøːka]","v.","nộp đơn","to apply","Jag vill ansöka om ett nytt jobb.","Tôi muốn nộp đơn xin một công việc mới.","I want to apply for a new job.","A2","work"),
  w("e3b9","recept","[rɛˈsɛpt]","n.","đơn thuốc / công thức","prescription / recipe","Läkaren skrev ett recept på antibiotika.","Bác sĩ đã kê đơn thuốc kháng sinh.","The doctor wrote a prescription for antibiotics.","A2","health","ett"),
  w("e3b10","apotek","[apʊˈteːk]","n.","hiệu thuốc","pharmacy","Apoteket ligger bredvid vårdcentralen.","Hiệu thuốc nằm cạnh trạm y tế.","The pharmacy is next to the health center.","A2","health","ett"),
  w("e3b11","feber","[ˈfeːbɛr]","n.","sốt","fever","Barnet har feber och stannar hemma.","Đứa bé bị sốt và ở nhà.","The child has a fever and is staying home.","A2","health","en"),
  w("e3b12","träna","[ˈtrɛːna]","v.","tập luyện","to exercise","Jag tränar tre gånger i veckan.","Tôi tập ba lần một tuần.","I exercise three times a week.","A2","hobbies"),
  w("e3b13","laga mat","[ˈlɑːɡa mɑːt]","v. phr.","nấu ăn","to cook","På helgen tycker jag om att laga mat.","Cuối tuần tôi thích nấu ăn.","On weekends I like to cook.","A2","hobbies"),
  w("e3b14","spara","[ˈspɑːra]","v.","tiết kiệm","to save","Vi sparar pengar till en resa.","Chúng tôi tiết kiệm tiền cho một chuyến đi.","We're saving money for a trip.","A2","shopping"),
  w("e3b15","låna","[ˈloːna]","v.","mượn / cho mượn","to borrow / lend","Kan jag låna din penna en stund?","Cho tôi mượn cây bút một lát được không?","May I borrow your pen for a moment?","A2","hobbies"),
  w("e3b16","vänta","[ˈvɛnːta]","v.","chờ","to wait","Vi väntar på bussen vid hållplatsen.","Chúng tôi đang chờ xe buýt ở trạm.","We're waiting for the bus at the stop.","A2","directions"),
  w("e3b17","bestämma","[bɛˈstɛmːa]","v.","quyết định","to decide","Jag har inte bestämt mig än.","Tôi vẫn chưa quyết định.","I haven't decided yet.","A2","opinion"),
  w("e3b18","tycka om","[ˈtʏkːa ɔm]","v. phr.","thích","to like","Jag tycker om att läsa deckare.","Tôi thích đọc truyện trinh thám.","I like reading detective novels.","A2","hobbies"),

  // ───────────────────── B1 ─────────────────────
  w("e3c1","erfarenhet","[ɛrˈfɑːrɛnˌheːt]","n.","kinh nghiệm","experience","Han har lång erfarenhet av att undervisa.","Anh ấy có nhiều kinh nghiệm giảng dạy.","He has long experience of teaching.","B1","work","en"),
  w("e3c2","utveckling","[ˈʉːtˌvɛklɪŋ]","n.","sự phát triển","development","Teknikens utveckling går väldigt fort.","Sự phát triển của công nghệ đi rất nhanh.","The development of technology is very fast.","B1","society","en"),
  w("e3c3","samhälle","[ˈsamːˌhɛlːɛ]","n.","xã hội","society","Ett tryggt samhälle bygger på tillit.","Một xã hội an toàn dựa trên sự tin cậy.","A safe society is built on trust.","B1","society","ett"),
  w("e3c4","åsikt","[ˈoːsɪkt]","n.","ý kiến","opinion","Alla har rätt att uttrycka sin åsikt.","Ai cũng có quyền bày tỏ ý kiến.","Everyone has the right to express their opinion.","B1","opinion","en"),
  w("e3c5","påverka","[ˈpoːˌvɛrka]","v.","ảnh hưởng đến","to affect","Klimatet påverkar hela vår vardag.","Khí hậu ảnh hưởng đến toàn bộ cuộc sống hằng ngày.","The climate affects our whole daily life.","B1","environment"),
  w("e3c6","minska","[ˈmɪnːska]","v.","giảm","to reduce","Vi måste minska utsläppen av koldioxid.","Chúng ta phải giảm lượng khí thải CO2.","We must reduce CO2 emissions.","B1","environment"),
  w("e3c7","öka","[ˈøːka]","v.","tăng","to increase","Priset på el har ökat i år.","Giá điện đã tăng trong năm nay.","The price of electricity has risen this year.","B1","society"),
  w("e3c8","hållbar","[ˈhɔlːbɑːr]","adj.","bền vững","sustainable","Vi behöver en mer hållbar livsstil.","Chúng ta cần một lối sống bền vững hơn.","We need a more sustainable lifestyle.","B1","environment"),
  w("e3c9","miljövänlig","[ˈmɪlːjøːˌvɛnːlɪɡ]","adj.","thân thiện môi trường","environmentally friendly","Elbilar är mer miljövänliga än bensinbilar.","Xe điện thân thiện môi trường hơn xe xăng.","Electric cars are more environmentally friendly than petrol cars.","B1","environment"),
  w("e3c10","dessutom","[ˈdɛsːˌʊtɔm]","adv.","hơn nữa","moreover","Det är billigt, och dessutom är det snabbt.","Nó rẻ, hơn nữa lại nhanh.","It's cheap, and moreover it's fast.","B1","opinion"),
  w("e3c11","däremot","[ˈdɛːrɛˌmuːt]","adv.","ngược lại","on the other hand","Jag gillar kaffe, min syster däremot dricker bara te.","Tôi thích cà phê, còn em gái tôi thì chỉ uống trà.","I like coffee; my sister, on the other hand, only drinks tea.","B1","opinion"),
  w("e3c12","trots att","[ˈtrɔtːs at]","conj.","mặc dù","although","Trots att det regnade gick vi ut.","Mặc dù trời mưa chúng tôi vẫn đi ra ngoài.","Although it was raining, we went out.","B1","opinion"),
  w("e3c13","eftersom","[ˈɛftɛrˌsɔm]","conj.","bởi vì","because","Jag stannar hemma eftersom jag är förkyld.","Tôi ở nhà bởi vì bị cảm.","I'm staying home because I have a cold.","B1","opinion"),
  w("e3c14","enligt","[ˈeːnlɪɡt]","prep.","theo","according to","Enligt tidningen kommer det att snöa i morgon.","Theo báo, ngày mai sẽ có tuyết.","According to the newspaper, it will snow tomorrow.","B1","society"),
  w("e3c15","ansvar","[ˈanːˌsvɑːr]","n.","trách nhiệm","responsibility","Vi har alla ett ansvar för miljön.","Chúng ta đều có trách nhiệm với môi trường.","We all have a responsibility for the environment.","B1","society","ett"),
  w("e3c16","möjlighet","[ˈmøjːlɪɡˌheːt]","n.","cơ hội","opportunity","Utbildning ger unga människor nya möjligheter.","Giáo dục mang lại cho người trẻ những cơ hội mới.","Education gives young people new opportunities.","B1","society","en"),
  w("e3c17","utmaning","[ˈʉːtˌmɑːnɪŋ]","n.","thử thách","challenge","Att lära sig svenska är en rolig utmaning.","Học tiếng Thụy Điển là một thử thách thú vị.","Learning Swedish is a fun challenge.","B1","abstract","en"),
  w("e3c18","lösning","[ˈløːsnɪŋ]","n.","giải pháp","solution","Vi måste hitta en långsiktig lösning.","Chúng ta phải tìm một giải pháp lâu dài.","We must find a long-term solution.","B1","abstract","en"),
];
