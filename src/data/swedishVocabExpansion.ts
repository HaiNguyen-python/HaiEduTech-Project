/**
 * @file swedishVocabExpansion.ts
 * @description Extra Swedish vocabulary (YKI A1 → B1) appended to the core
 *              bank. Adds high-frequency words across every category plus IPA
 *              hints to match the IELTS/TOEIC vocab format.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord, SwedishLevel } from "./swedishVocabBank";

const w = (
  id: string, sv: string, ipa: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, ipa, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

export const SWEDISH_WORDS_EXPANSION: SwedishWord[] = [
  // ───── GREETINGS A1/A2 ─────
  w("gx1","god morgon","[ɡuːd ˈmɔrɔn]","phr.","chào buổi sáng","good morning","God morgon, hur har du sovit?","Chào buổi sáng, bạn ngủ ngon không?","Good morning, did you sleep well?","A1","greetings"),
  w("gx2","god kväll","[ɡuːd ˈkvɛlː]","phr.","chào buổi tối","good evening","God kväll och välkommen!","Chào buổi tối và xin chào mừng!","Good evening and welcome!","A1","greetings"),
  w("gx3","trevligt att träffas","[ˈtreːvlɪt at ˈtrɛfːas]","phr.","rất vui được gặp","nice to meet you","Trevligt att träffas, jag heter Hai.","Rất vui được gặp, tôi tên Hải.","Nice to meet you, I'm Hai.","A1","greetings"),
  w("gx4","ursäkta","[ˈʉːʂɛkta]","phr.","xin lỗi (làm phiền)","excuse me","Ursäkta, var ligger toaletten?","Xin lỗi, nhà vệ sinh ở đâu?","Excuse me, where is the toilet?","A1","greetings"),
  w("gx5","välkommen","[vɛlˈkɔmːɛn]","adj.","chào mừng","welcome","Välkommen till Sverige!","Chào mừng đến Thụy Điển!","Welcome to Sweden!","A1","greetings"),
  // ───── FAMILY ─────
  w("fx1","syskon","[ˈsʏskɔn]","n.","anh chị em ruột","sibling","Jag har två syskon.","Tôi có hai anh chị em.","I have two siblings.","A1","family","ett"),
  w("fx2","mormor","[ˈmʊrmʊr]","n.","bà ngoại","grandma (mother's side)","Min mormor bor i Göteborg.","Bà ngoại tôi sống ở Gothenburg.","My grandma lives in Gothenburg.","A1","family","en"),
  w("fx3","farfar","[ˈfɑːrfɑːr]","n.","ông nội","grandpa (father's side)","Farfar berättar gamla historier.","Ông nội kể chuyện xưa.","Grandpa tells old stories.","A1","family","en"),
  w("fx4","sambo","[ˈsambʊ]","n.","bạn đời sống chung","cohabiting partner","Min sambo lagar middag idag.","Bạn đời tôi nấu tối nay.","My partner is cooking dinner today.","A2","family","en"),
  w("fx5","granne","[ˈɡranːɛ]","n.","hàng xóm","neighbour","Vår granne är väldigt vänlig.","Hàng xóm rất thân thiện.","Our neighbour is very friendly.","A2","family","en"),
  // ───── NUMBERS/TIME ─────
  w("nx1","kvart","[kvart]","n.","mười lăm phút","quarter hour","Klockan är kvart över tre.","Bây giờ là 3 giờ 15.","It's a quarter past three.","A1","numbers","en"),
  w("nx2","halv","[halv]","adj.","rưỡi","half","Klockan är halv fem.","Bây giờ là 4 rưỡi.","It's half past four.","A1","numbers"),
  w("nx3","veckan","[ˈvɛkːan]","n.","tuần (xác định)","the week","Veckan har gått snabbt.","Tuần trôi nhanh.","The week has gone fast.","A2","numbers","en"),
  w("nx4","månad","[ˈmoːnad]","n.","tháng","month","Jag jobbar tre månader till.","Tôi làm thêm 3 tháng nữa.","I work three more months.","A1","numbers","en"),
  w("nx5","ofta","[ˈɔfta]","adv.","thường xuyên","often","Jag tränar ofta på morgonen.","Tôi thường tập vào sáng.","I often train in the morning.","A2","numbers"),
  w("nx6","sällan","[ˈsɛlːan]","adv.","hiếm khi","rarely","Hon dricker sällan kaffe.","Cô ấy hiếm khi uống cà phê.","She rarely drinks coffee.","A2","numbers"),
  // ───── FOOD ─────
  w("foodx1","frukost","[ˈfrʉːkɔst]","n.","bữa sáng","breakfast","Frukosten serveras klockan sju.","Bữa sáng phục vụ lúc 7 giờ.","Breakfast is served at seven.","A1","food","en"),
  w("foodx2","lunch","[lɵnːʃ]","n.","bữa trưa","lunch","Vi äter lunch klockan tolv.","Chúng tôi ăn trưa lúc 12 giờ.","We have lunch at noon.","A1","food","en"),
  w("foodx3","middag","[ˈmɪdːaɡ]","n.","bữa tối","dinner","Middagen är klar.","Bữa tối đã sẵn sàng.","Dinner is ready.","A1","food","en"),
  w("foodx4","kött","[ɕœtː]","n.","thịt","meat","Jag äter inte kött.","Tôi không ăn thịt.","I don't eat meat.","A1","food","ett"),
  w("foodx5","fisk","[fɪsk]","n.","cá","fish","Lax är en populär fisk.","Cá hồi là loại cá phổ biến.","Salmon is a popular fish.","A1","food","en"),
  w("foodx6","grönsak","[ˈɡrøːnsak]","n.","rau","vegetable","Ät mer grönsaker varje dag.","Ăn nhiều rau mỗi ngày.","Eat more vegetables every day.","A1","food","en"),
  w("foodx7","frukt","[frɵkt]","n.","trái cây","fruit","Frukt är nyttigt.","Trái cây tốt cho sức khỏe.","Fruit is healthy.","A1","food","en"),
  w("foodx8","smörgås","[ˈsmœrɡoːs]","n.","bánh mì kẹp","sandwich","Vill du ha en smörgås?","Bạn muốn bánh kẹp không?","Would you like a sandwich?","A1","food","en"),
  w("foodx9","beställa","[bɛˈstɛlːa]","v.","đặt món","to order","Jag vill beställa en kaffe.","Tôi muốn gọi một cà phê.","I'd like to order a coffee.","A2","food"),
  w("foodx10","smakar","[ˈsmɑːkar]","v.","có vị","tastes","Maten smakar gott.","Đồ ăn rất ngon.","The food tastes great.","A2","food"),
  // ───── SHOPPING ─────
  w("shopx1","rabatt","[raˈbatː]","n.","giảm giá","discount","Tröjan har 20% rabatt.","Áo giảm 20%.","The shirt has a 20% discount.","A2","shopping","en"),
  w("shopx2","kvitto","[ˈkvɪtːʊ]","n.","biên lai","receipt","Kan jag få kvittot, tack?","Cho tôi xin biên lai.","Can I have the receipt, please?","A2","shopping","ett"),
  w("shopx3","kassa","[ˈkasːa]","n.","quầy thu ngân","checkout","Betala vid kassan.","Trả tiền ở quầy.","Pay at the checkout.","A1","shopping","en"),
  w("shopx4","prova","[ˈpruːva]","v.","thử","to try on","Får jag prova den här?","Tôi thử cái này được không?","May I try this on?","A2","shopping"),
  w("shopx5","billig","[ˈbɪlːɪɡ]","adj.","rẻ","cheap","Den här tröjan är billig.","Áo này rẻ.","This shirt is cheap.","A1","shopping"),
  w("shopx6","dyr","[dyːr]","adj.","đắt","expensive","Det är för dyrt för mig.","Quá đắt với tôi.","It's too expensive for me.","A1","shopping"),
  // ───── DIRECTIONS / TRANSPORT ─────
  w("dirx1","tunnelbana","[ˈtɵnːɛlˌbɑːna]","n.","tàu điện ngầm","subway","Ta tunnelbanan till T-Centralen.","Đi tàu điện đến T-Centralen.","Take the subway to T-Centralen.","A2","directions","en"),
  w("dirx2","spårvagn","[ˈspoːrvaŋn]","n.","xe điện","tram","Spårvagnen går varje tionde minut.","Xe điện 10 phút một chuyến.","The tram runs every ten minutes.","A2","directions","en"),
  w("dirx3","busshållplats","[ˈbɵsːhɔlːplats]","n.","trạm xe buýt","bus stop","Busshållplatsen är runt hörnet.","Trạm xe buýt ở góc kia.","The bus stop is around the corner.","A2","directions","en"),
  w("dirx4","biljett","[bɪlˈjɛtː]","n.","vé","ticket","Köp en biljett i automaten.","Mua vé ở máy bán tự động.","Buy a ticket at the machine.","A1","directions","en"),
  w("dirx5","sväng","[svɛŋ]","v.","rẽ","to turn","Sväng höger vid kyrkan.","Rẽ phải ở nhà thờ.","Turn right at the church.","A2","directions"),
  w("dirx6","rakt fram","[rɑkt fram]","phr.","đi thẳng","straight ahead","Gå rakt fram två kvarter.","Đi thẳng hai dãy nhà.","Go straight ahead for two blocks.","A1","directions"),
  // ───── HOME ─────
  w("homex1","hyra","[ˈhyːra]","v.","thuê","to rent","Vi hyr en lägenhet i centrum.","Chúng tôi thuê căn hộ trung tâm.","We rent a flat downtown.","A2","home"),
  w("homex2","möbler","[ˈmøːblɛr]","n.","đồ nội thất","furniture","Lägenheten har fina möbler.","Căn hộ có nội thất đẹp.","The flat has nice furniture.","A2","home","en"),
  w("homex3","kök","[ɕøːk]","n.","nhà bếp","kitchen","Köket är nyrenoverat.","Bếp vừa được tân trang.","The kitchen is newly renovated.","A1","home","ett"),
  w("homex4","badrum","[ˈbɑːdrɵm]","n.","phòng tắm","bathroom","Badrummet är litet men fint.","Phòng tắm nhỏ nhưng đẹp.","The bathroom is small but nice.","A1","home","ett"),
  w("homex5","sovrum","[ˈsoːvrɵm]","n.","phòng ngủ","bedroom","Sovrummet har stora fönster.","Phòng ngủ có cửa sổ lớn.","The bedroom has big windows.","A1","home","ett"),
  w("homex6","städa","[ˈstɛːda]","v.","dọn dẹp","to clean","Jag städar varje lördag.","Tôi dọn dẹp thứ bảy hàng tuần.","I clean every Saturday.","A2","home"),
  // ───── WORK ─────
  w("workx1","möte","[ˈmøːtɛ]","n.","cuộc họp","meeting","Mötet börjar klockan tio.","Cuộc họp bắt đầu 10 giờ.","The meeting starts at ten.","A2","work","ett"),
  w("workx2","kollega","[kɔˈleːɡa]","n.","đồng nghiệp","colleague","Mina kollegor är hjälpsamma.","Đồng nghiệp tôi rất giúp đỡ.","My colleagues are helpful.","A2","work","en"),
  w("workx3","lön","[løːn]","n.","lương","salary","Lönen kommer den 25:e.","Lương về ngày 25.","Salary arrives on the 25th.","A2","work","en"),
  w("workx4","semester","[sɛˈmɛstɛr]","n.","kỳ nghỉ phép","vacation","Jag har semester i juli.","Tôi nghỉ phép tháng 7.","I'm on vacation in July.","A2","work","en"),
  w("workx5","ansökan","[ˈansøːkan]","n.","đơn xin việc","application","Skicka in din ansökan idag.","Gửi đơn xin việc hôm nay.","Send your application today.","B1","work","en"),
  w("workx6","intervju","[ɪntɛrˈvjʉː]","n.","phỏng vấn","interview","Jag har en intervju imorgon.","Tôi có buổi phỏng vấn ngày mai.","I have an interview tomorrow.","B1","work","en"),
  w("workx7","erfarenhet","[ɛrˈfɑːrɛnheːt]","n.","kinh nghiệm","experience","Hon har lång erfarenhet av läraryrket.","Cô ấy có nhiều kinh nghiệm dạy.","She has long teaching experience.","B1","work","en"),
  // ───── HEALTH ─────
  w("healthx1","feber","[ˈfeːbɛr]","n.","sốt","fever","Barnet har hög feber.","Em bé sốt cao.","The child has a high fever.","A2","health","en"),
  w("healthx2","huvudvärk","[ˈhʉːvʉdvɛrk]","n.","đau đầu","headache","Jag har ont i huvudet.","Tôi đau đầu.","I have a headache.","A2","health","en"),
  w("healthx3","läkare","[ˈlɛːkarɛ]","n.","bác sĩ","doctor","Jag ska gå till läkaren.","Tôi sẽ đi bác sĩ.","I'm going to the doctor.","A1","health","en"),
  w("healthx4","medicin","[mɛdɪˈsiːn]","n.","thuốc","medicine","Ta medicinen efter maten.","Uống thuốc sau ăn.","Take the medicine after meals.","A2","health","en"),
  w("healthx5","träna","[ˈtrɛːna]","v.","tập luyện","to exercise","Vi tränar tre gånger i veckan.","Chúng tôi tập 3 lần mỗi tuần.","We train three times a week.","A1","health"),
  w("healthx6","sömn","[sœmn]","n.","giấc ngủ","sleep","God sömn är viktig.","Giấc ngủ tốt rất quan trọng.","Good sleep is important.","B1","health","en"),
  // ───── HOBBIES ─────
  w("hobx1","fotboll","[ˈfuːtbɔlː]","n.","bóng đá","football","Vi spelar fotboll på söndag.","Chúng tôi đá bóng chủ nhật.","We play football on Sunday.","A1","hobbies","en"),
  w("hobx2","läsa","[ˈlɛːsa]","v.","đọc","to read","Jag älskar att läsa romaner.","Tôi thích đọc tiểu thuyết.","I love reading novels.","A1","hobbies"),
  w("hobx3","film","[fɪlm]","n.","phim","film","Vi ser en film ikväll.","Chúng tôi xem phim tối nay.","We're watching a film tonight.","A1","hobbies","en"),
  w("hobx4","resa","[ˈreːsa]","v./n.","du lịch","to travel/trip","Vi reser till Lappland i vinter.","Chúng tôi đi Lappland mùa đông.","We travel to Lapland in winter.","A2","hobbies","en"),
  w("hobx5","fotografera","[fʊtʊɡraˈfeːra]","v.","chụp ảnh","to photograph","Hon fotograferar naturen.","Cô ấy chụp thiên nhiên.","She photographs nature.","B1","hobbies"),
  // ───── SOCIETY ─────
  w("socx1","regering","[rɛˈɡeːrɪŋ]","n.","chính phủ","government","Regeringen tar nya beslut.","Chính phủ đưa quyết định mới.","The government makes new decisions.","B1","society","en"),
  w("socx2","val","[vɑːl]","n.","cuộc bầu cử","election","Valet är vart fjärde år.","Bầu cử 4 năm một lần.","Elections are every four years.","B1","society","ett"),
  w("socx3","skatt","[skatː]","n.","thuế","tax","Vi betalar hög skatt i Sverige.","Thuế ở Thụy Điển cao.","We pay high taxes in Sweden.","B1","society","en"),
  w("socx4","integration","[ɪntɛɡraˈʃuːn]","n.","hội nhập","integration","Integration tar tid.","Hội nhập cần thời gian.","Integration takes time.","B1","society","en"),
  w("socx5","invandrare","[ˈɪnvandrarɛ]","n.","người nhập cư","immigrant","Många invandrare lär sig svenska snabbt.","Nhiều người nhập cư học tiếng Thụy Điển nhanh.","Many immigrants learn Swedish quickly.","B1","society","en"),
  w("socx6","jämställdhet","[ˈjɛmstɛldheːt]","n.","bình đẳng giới","gender equality","Sverige är känt för jämställdhet.","Thụy Điển nổi tiếng bình đẳng giới.","Sweden is known for gender equality.","B1","society","en"),
  // ───── ENVIRONMENT ─────
  w("envx1","återvinning","[ˈoːtɛrˌvɪnːɪŋ]","n.","tái chế","recycling","Återvinning är viktig.","Tái chế rất quan trọng.","Recycling is important.","B1","environment","en"),
  w("envx2","klimatet","[ˈkliːmateɛt]","n.","khí hậu (xác định)","the climate","Klimatet förändras snabbt.","Khí hậu thay đổi nhanh.","The climate is changing fast.","B1","environment","ett"),
  w("envx3","förorening","[ˈfœrʊˌreːnɪŋ]","n.","ô nhiễm","pollution","Förorening är ett globalt problem.","Ô nhiễm là vấn đề toàn cầu.","Pollution is a global issue.","B1","environment","en"),
  w("envx4","solenergi","[ˈsuːlɛnɛrˌɡiː]","n.","năng lượng mặt trời","solar energy","Solenergi blir billigare.","Năng lượng mặt trời rẻ dần.","Solar energy is getting cheaper.","B1","environment","en"),
  w("envx5","kollektivtrafik","[kɔlɛkˈtiːvtrafiːk]","n.","giao thông công cộng","public transport","Kollektivtrafiken är välutbyggd.","Giao thông công cộng phát triển tốt.","Public transport is well developed.","B1","environment","en"),
  // ───── OPINION ─────
  w("opx1","tycka","[ˈtʏkːa]","v.","cho rằng","to think (opinion)","Jag tycker att det är intressant.","Tôi nghĩ điều đó thú vị.","I think it's interesting.","A2","opinion"),
  w("opx2","hålla med","[ˈhɔlːa meːd]","phr.","đồng ý","to agree","Jag håller med dig.","Tôi đồng ý với bạn.","I agree with you.","B1","opinion"),
  w("opx3","tvärtom","[ˈtvæːʈʊm]","adv.","ngược lại","on the contrary","Tvärtom, jag gillar det.","Ngược lại, tôi thích nó.","On the contrary, I like it.","B1","opinion"),
  w("opx4","åsikt","[ˈoːsɪkt]","n.","quan điểm","opinion","Vad är din åsikt?","Quan điểm của bạn là gì?","What's your opinion?","B1","opinion","en"),
  w("opx5","argument","[arɡʉˈmɛnt]","n.","luận điểm","argument","Hennes argument är starka.","Luận điểm cô ấy mạnh.","Her arguments are strong.","B1","opinion","ett"),
  // ───── ABSTRACT B1 ─────
  w("abx1","möjlighet","[ˈmøːjlɪɡheːt]","n.","cơ hội","opportunity","Det är en stor möjlighet.","Đây là cơ hội lớn.","It's a great opportunity.","B1","abstract","en"),
  w("abx2","ansvar","[ˈansvɑːr]","n.","trách nhiệm","responsibility","Vi har ansvar för miljön.","Chúng ta có trách nhiệm với môi trường.","We have responsibility for the environment.","B1","abstract","ett"),
  w("abx3","framgång","[ˈframɡɔŋ]","n.","thành công","success","Hennes framgång inspirerar oss.","Thành công của cô ấy truyền cảm hứng.","Her success inspires us.","B1","abstract","en"),
  w("abx4","misslyckande","[ˈmɪsːlʏkanːdɛ]","n.","thất bại","failure","Misslyckande är en del av lärandet.","Thất bại là một phần của học.","Failure is part of learning.","B1","abstract","ett"),
  w("abx5","förändring","[fœrˈɛndrɪŋ]","n.","sự thay đổi","change","Förändring tar tid.","Thay đổi cần thời gian.","Change takes time.","B1","abstract","en"),
  w("abx6","trygghet","[ˈtrʏɡːheːt]","n.","sự an toàn","security/safety","Trygghet är viktigt för barn.","An toàn quan trọng với trẻ em.","Security is important for children.","B1","abstract","en"),
  w("abx7","frihet","[ˈfriːheːt]","n.","sự tự do","freedom","Frihet är en mänsklig rättighet.","Tự do là quyền con người.","Freedom is a human right.","B1","abstract","en"),
  w("abx8","kärlek","[ˈɕæːrlɛk]","n.","tình yêu","love","Kärlek övervinner allt.","Tình yêu vượt qua tất cả.","Love conquers all.","B1","abstract","en"),
  // ───── WEATHER (A1) ─────
  w("wthx1","väder","[ˈvɛːdɛr]","n.","thời tiết","weather","Hur är vädret idag?","Thời tiết hôm nay thế nào?","How's the weather today?","A1","weather","ett"),
  w("wthx2","sol","[suːl]","n.","mặt trời","sun","Solen skiner i dag.","Hôm nay có nắng.","The sun is shining today.","A1","weather","en"),
  w("wthx3","regn","[rɛŋn]","n.","mưa","rain","Det kommer regn i morgon.","Ngày mai có mưa.","Rain is coming tomorrow.","A1","weather","ett"),
  w("wthx4","snö","[snøː]","n.","tuyết","snow","Det snöar mycket i norr.","Tuyết rơi nhiều ở miền bắc.","It snows a lot in the north.","A1","weather","en"),
  w("wthx5","vind","[vɪnd]","n.","gió","wind","Det blåser en kall vind.","Có một cơn gió lạnh.","A cold wind is blowing.","A1","weather","en"),
  w("wthx6","moln","[mʊln]","n.","đám mây","cloud","Himlen är full av moln.","Trời đầy mây.","The sky is full of clouds.","A1","weather","ett"),
  w("wthx7","varm","[varm]","adj.","ấm/nóng","warm","Sommaren är varm i Sverige.","Mùa hè Thụy Điển ấm.","Summer is warm in Sweden.","A1","weather"),
  w("wthx8","kall","[kalː]","adj.","lạnh","cold","Vintern är kall och mörk.","Mùa đông lạnh và tối.","Winter is cold and dark.","A1","weather"),
  // ───── SEASONS (A1) ─────
  w("seax1","vår","[voːr]","n.","mùa xuân","spring","På våren blommar körsbärsträden.","Mùa xuân hoa anh đào nở.","In spring the cherry trees bloom.","A1","seasons","en"),
  w("seax2","sommar","[ˈsɔmːar]","n.","mùa hè","summer","Vi åker till landet på sommaren.","Chúng tôi về quê mùa hè.","We go to the countryside in summer.","A1","seasons","en"),
  w("seax3","höst","[hœst]","n.","mùa thu","autumn","På hösten faller löven.","Mùa thu lá rụng.","In autumn the leaves fall.","A1","seasons","en"),
  w("seax4","vinter","[ˈvɪntɛr]","n.","mùa đông","winter","Vintern varar länge här.","Mùa đông dài ở đây.","Winter lasts a long time here.","A1","seasons","en"),
  // ───── WEEKDAYS (A1) ─────
  w("wdx1","måndag","[ˈmɔnːdɑː]","n.","thứ Hai","Monday","På måndag börjar kursen.","Thứ Hai khoá học bắt đầu.","The course starts on Monday.","A1","weekdays","en"),
  w("wdx2","fredag","[ˈfreːdɑː]","n.","thứ Sáu","Friday","Vi har fika på fredag.","Thứ Sáu chúng tôi ăn fika.","We have fika on Friday.","A1","weekdays","en"),
  w("wdx3","helg","[hɛlj]","n.","cuối tuần","weekend","Ha en trevlig helg!","Chúc cuối tuần vui vẻ!","Have a nice weekend!","A1","weekdays","en"),
];
