/**
 * @file swedishVocabExpansion4.ts
 * @description Fourth-pass Swedish vocabulary expansion. All examples are
 *              hand-written for natural semantics (no template output).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord, SwedishLevel } from "./swedishVocabBank";

const w = (
  id: string, sv: string, ipa: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, ipa, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

export const SWEDISH_WORDS_EXPANSION_4: SwedishWord[] = [
  // ───────────────────── A1 ─────────────────────
  w("e4a1","tallrik","[ˈtalːrɪk]","n.","cái đĩa","plate","Sätt tallriken på bordet, tack.","Xin đặt cái đĩa lên bàn.","Please put the plate on the table.","A1","home","en"),
  w("e4a2","gaffel","[ˈɡafːɛl]","n.","cái nĩa","fork","Jag behöver en gaffel till salladen.","Tôi cần một cái nĩa cho món salad.","I need a fork for the salad.","A1","home","en"),
  w("e4a3","kniv","[kniːv]","n.","con dao","knife","Var försiktig med kniven!","Cẩn thận với con dao!","Be careful with the knife!","A1","home","en"),
  w("e4a4","sked","[ʃeːd]","n.","cái muỗng","spoon","Han rör kaffet med en sked.","Anh ấy khuấy cà phê bằng một cái muỗng.","He stirs the coffee with a spoon.","A1","home","en"),
  w("e4a5","glas","[ɡlɑːs]","n.","cái ly","glass","Kan jag få ett glas vatten?","Cho tôi một ly nước được không?","May I have a glass of water?","A1","home","ett"),
  w("e4a6","kopp","[kɔpː]","n.","cái tách","cup","Jag dricker en kopp te varje morgon.","Tôi uống một tách trà mỗi sáng.","I drink a cup of tea every morning.","A1","food","en"),
  w("e4a7","kudde","[ˈkɵdːɛ]","n.","cái gối","pillow","Kudden är väldigt mjuk.","Cái gối rất mềm.","The pillow is very soft.","A1","home","en"),
  w("e4a8","filt","[fɪlt]","n.","cái chăn","blanket","Barnet sover under en varm filt.","Đứa bé ngủ dưới một chiếc chăn ấm.","The child sleeps under a warm blanket.","A1","home","en"),
  w("e4a9","handduk","[ˈhandˌdʉːk]","n.","cái khăn tắm","towel","Handduken hänger i badrummet.","Cái khăn tắm treo trong phòng tắm.","The towel hangs in the bathroom.","A1","home","en"),
  w("e4a10","tandborste","[ˈtandˌbɔʂːtɛ]","n.","bàn chải đánh răng","toothbrush","Jag borstar tänderna med min tandborste två gånger om dagen.","Tôi đánh răng bằng bàn chải hai lần mỗi ngày.","I brush my teeth with my toothbrush twice a day.","A1","health","en"),
  w("e4a11","tvål","[tvoːl]","n.","xà phòng","soap","Tvätta händerna med tvål och vatten.","Rửa tay với xà phòng và nước.","Wash your hands with soap and water.","A1","health","en"),
  w("e4a12","spegel","[ˈspeːɡɛl]","n.","cái gương","mirror","Hon tittar sig i spegeln.","Cô ấy nhìn mình trong gương.","She looks at herself in the mirror.","A1","home","en"),
  w("e4a13","klocka","[ˈklɔkːa]","n.","đồng hồ","clock / watch","Klockan är åtta på morgonen.","Đồng hồ chỉ tám giờ sáng.","The clock says eight in the morning.","A1","home","en"),
  w("e4a14","nyckel","[ˈnʏkːɛl]","n.","chìa khoá","key","Jag har glömt nyckeln hemma.","Tôi để quên chìa khoá ở nhà.","I've forgotten my key at home.","A1","home","en"),
  w("e4a15","väska","[ˈvɛsːka]","n.","cái túi","bag","Väskan är tung idag.","Cái túi hôm nay nặng.","The bag is heavy today.","A1","shopping","en"),

  // ───────────────────── A2 ─────────────────────
  w("e4b1","kvarter","[kvarˈteːr]","n.","khu phố","neighborhood","Vi bor i ett lugnt kvarter.","Chúng tôi sống trong một khu phố yên tĩnh.","We live in a quiet neighborhood.","A2","directions","ett"),
  w("e4b2","hyra","[ˈhyːra]","v. / n.","thuê / tiền thuê","to rent / rent","Vi hyr en lägenhet i centrum.","Chúng tôi thuê một căn hộ ở trung tâm.","We rent an apartment downtown.","A2","home"),
  w("e4b3","lägenhet","[ˈlɛːɡɛnˌheːt]","n.","căn hộ","apartment","Deras lägenhet har tre rum och kök.","Căn hộ của họ có ba phòng và một bếp.","Their apartment has three rooms and a kitchen.","A2","home","en"),
  w("e4b4","granne","[ˈɡranːɛ]","n.","hàng xóm","neighbor","Vår granne är väldigt vänlig.","Hàng xóm của chúng tôi rất thân thiện.","Our neighbor is very friendly.","A2","home","en"),
  w("e4b5","bostad","[ˈbuːˌstɑːd]","n.","chỗ ở","housing","Det är svårt att hitta en bostad i Stockholm.","Rất khó tìm chỗ ở tại Stockholm.","It's hard to find housing in Stockholm.","A2","home","en"),
  w("e4b6","städa","[ˈstɛːda]","v.","dọn dẹp","to clean","Jag städar lägenheten varje lördag.","Tôi dọn dẹp căn hộ mỗi thứ Bảy.","I clean the apartment every Saturday.","A2","home"),
  w("e4b7","diska","[ˈdɪsːka]","v.","rửa chén","to do the dishes","Efter middagen diskar vi tillsammans.","Sau bữa tối chúng tôi cùng rửa chén.","After dinner we do the dishes together.","A2","home"),
  w("e4b8","tvätta","[ˈtvɛtːa]","v.","giặt / rửa","to wash","Jag tvättar kläder varannan vecka.","Tôi giặt quần áo hai tuần một lần.","I wash clothes every other week.","A2","home"),
  w("e4b9","handla","[ˈhandːla]","v.","đi mua sắm","to shop","Vi handlar mat på ICA om lördagarna.","Chúng tôi mua đồ ăn ở ICA vào thứ Bảy.","We shop for groceries at ICA on Saturdays.","A2","shopping"),
  w("e4b10","fikapaus","[ˈfiːkaˌpaʊs]","n.","giờ nghỉ cà phê","coffee break","På jobbet tar vi en fikapaus klockan tio.","Ở chỗ làm chúng tôi có giờ nghỉ cà phê lúc mười giờ.","At work we take a coffee break at ten.","A2","work","en"),
  w("e4b11","chef","[ɧɛf]","n.","sếp","boss","Min chef är rättvis och lyssnar på oss.","Sếp của tôi công bằng và biết lắng nghe.","My boss is fair and listens to us.","A2","work","en"),
  w("e4b12","anställd","[ˈanːˌstɛlːd]","n. / adj.","nhân viên","employee","Företaget har tvåhundra anställda.","Công ty có hai trăm nhân viên.","The company has two hundred employees.","A2","work"),
  w("e4b13","kontrakt","[kɔnˈtrakt]","n.","hợp đồng","contract","Vi skrev under kontraktet i går.","Chúng tôi ký hợp đồng hôm qua.","We signed the contract yesterday.","A2","work","ett"),
  w("e4b14","betalning","[bɛˈtɑːlnɪŋ]","n.","thanh toán","payment","Betalningen ska ske senast den femtonde.","Việc thanh toán phải được thực hiện trước ngày mười lăm.","The payment must be made by the fifteenth.","A2","shopping","en"),
  w("e4b15","faktura","[fakˈtʉːra]","n.","hoá đơn (thanh toán)","invoice","Fakturan kommer i slutet av månaden.","Hoá đơn sẽ đến vào cuối tháng.","The invoice arrives at the end of the month.","A2","shopping","en"),
  w("e4b16","skatt","[skatː]","n.","thuế","tax","I Sverige betalar man ganska hög skatt.","Ở Thụy Điển người ta đóng thuế khá cao.","In Sweden people pay quite high tax.","A2","society","en"),
  w("e4b17","försäkring","[fœˈʂɛːkrɪŋ]","n.","bảo hiểm","insurance","En bra försäkring är viktig när man har bil.","Bảo hiểm tốt rất quan trọng khi có xe hơi.","Good insurance is important when you have a car.","A2","society","en"),

  // ───────────────────── B1 ─────────────────────
  w("e4c1","arbetsmarknad","[ˈarˑbetsˌmarknad]","n.","thị trường lao động","labor market","Arbetsmarknaden i Sverige är tuff för nyanlända.","Thị trường lao động ở Thụy Điển khắc nghiệt với người mới đến.","The labor market in Sweden is tough for newcomers.","B1","work","en"),
  w("e4c2","fackförening","[ˈfakːfœrˌeːnɪŋ]","n.","công đoàn","labor union","De flesta anställda är med i en fackförening.","Đa số nhân viên đều tham gia công đoàn.","Most employees are members of a labor union.","B1","work","en"),
  w("e4c3","kompetens","[kɔmpɛˈtɛns]","n.","năng lực","competence","Hon har hög kompetens inom marknadsföring.","Cô ấy có năng lực cao trong lĩnh vực tiếp thị.","She has strong competence in marketing.","B1","work","en"),
  w("e4c4","karriär","[karɪˈæːr]","n.","sự nghiệp","career","Han vill göra karriär inom IT-branschen.","Anh ấy muốn phát triển sự nghiệp trong ngành CNTT.","He wants to build a career in the IT sector.","B1","work","en"),
  w("e4c5","integration","[ɪntɛɡraˈɧuːn]","n.","sự hoà nhập","integration","Språket är nyckeln till integration i samhället.","Ngôn ngữ là chìa khoá để hoà nhập vào xã hội.","Language is the key to integration in society.","B1","society","en"),
  w("e4c6","jämställdhet","[ˈjɛmːˌstɛlːdheːt]","n.","bình đẳng","equality","Sverige är känt för sin jämställdhet mellan könen.","Thụy Điển nổi tiếng về bình đẳng giới.","Sweden is known for its gender equality.","B1","society","en"),
  w("e4c7","föräldraledighet","[fœˈrɛldraˌleːdɪɡheːt]","n.","nghỉ chăm con","parental leave","Både mamman och pappan tar föräldraledighet.","Cả cha lẫn mẹ đều nghỉ chăm con.","Both the mother and father take parental leave.","B1","society","en"),
  w("e4c8","välfärd","[ˈvɛlːˌfæːɖ]","n.","phúc lợi","welfare","Den svenska välfärden är beroende av skatter.","Phúc lợi Thụy Điển phụ thuộc vào thuế.","Swedish welfare depends on taxes.","B1","society","en"),
  w("e4c9","invandring","[ˈɪnːˌvandrɪŋ]","n.","nhập cư","immigration","Invandring är en viktig fråga i valet.","Nhập cư là một vấn đề quan trọng trong bầu cử.","Immigration is an important election issue.","B1","society","en"),
  w("e4c10","politik","[pʊlɪˈtiːk]","n.","chính trị","politics","Han är intresserad av svensk politik.","Anh ấy quan tâm đến chính trị Thụy Điển.","He's interested in Swedish politics.","B1","society","en"),
  w("e4c11","regering","[rɛˈɡeːrɪŋ]","n.","chính phủ","government","Regeringen presenterade en ny budget i går.","Chính phủ trình bày ngân sách mới hôm qua.","The government presented a new budget yesterday.","B1","society","en"),
  w("e4c12","riksdag","[ˈrɪksˌdɑːɡ]","n.","quốc hội","parliament","Riksdagen röstade om lagen på tisdag.","Quốc hội đã bỏ phiếu về đạo luật vào thứ Ba.","Parliament voted on the law on Tuesday.","B1","society","en"),
  w("e4c13","forskning","[ˈfɔʂːknɪŋ]","n.","nghiên cứu","research","Ny forskning visar att motion är viktigt.","Nghiên cứu mới cho thấy tập thể dục rất quan trọng.","New research shows that exercise is important.","B1","abstract","en"),
  w("e4c14","teknologi","[tɛknɔlɔˈɡiː]","n.","công nghệ","technology","Ny teknologi förändrar arbetsmarknaden snabbt.","Công nghệ mới đang thay đổi thị trường lao động nhanh chóng.","New technology is changing the labor market rapidly.","B1","tech","en"),
  w("e4c15","digitalisering","[dɪɡɪtaliˈseːrɪŋ]","n.","số hoá","digitalization","Digitaliseringen påverkar alla branscher.","Số hoá ảnh hưởng đến mọi ngành nghề.","Digitalization affects every industry.","B1","tech","en"),
  w("e4c16","artificiell intelligens","[artɪfɪsɪˈɛlː ɪntɛlɪˈɡɛns]","n. phr.","trí tuệ nhân tạo","artificial intelligence","Artificiell intelligens används redan i sjukvården.","Trí tuệ nhân tạo đã được dùng trong y tế.","Artificial intelligence is already used in healthcare.","B1","tech"),
  w("e4c17","hållbarhet","[ˈhɔlːˌbɑːrheːt]","n.","tính bền vững","sustainability","Företagen fokuserar mer på hållbarhet nu för tiden.","Ngày nay các công ty tập trung nhiều hơn vào tính bền vững.","Companies focus more on sustainability these days.","B1","environment","en"),
  w("e4c18","återvinning","[ˈoːtɛrˌvɪnːɪŋ]","n.","tái chế","recycling","Vi lämnar glas och papper till återvinning.","Chúng tôi mang thuỷ tinh và giấy đi tái chế.","We take glass and paper for recycling.","B1","environment","en"),
];
