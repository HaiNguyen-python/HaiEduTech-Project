/**
 * @file swedishVocabExpansion2.ts
 * @description Second Swedish vocabulary expansion (YKI A1 → B1). Adds 6 new
 *              thematic categories (nature, weather, technology, education,
 *              emotions, travel) plus extra entries for existing categories.
 *              All words include IPA hints and bilingual example sentences.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord, SwedishLevel, SwedishCategory } from "./swedishVocabBank";

const w = (
  id: string, sv: string, ipa: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, ipa, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

export const SWEDISH_CATEGORIES_EXTRA: SwedishCategory[] = [
  { id: "nature",     emoji: "🌲", nameVi: "Thiên nhiên & động vật", nameEn: "Nature & animals" },
  { id: "weather",    emoji: "☀️", nameVi: "Thời tiết & mùa",         nameEn: "Weather & seasons" },
  { id: "technology", emoji: "💻", nameVi: "Công nghệ & internet",    nameEn: "Technology & internet" },
  { id: "education",  emoji: "🎓", nameVi: "Giáo dục & học tập",      nameEn: "Education & study" },
  { id: "emotions",   emoji: "💖", nameVi: "Cảm xúc & tính cách",     nameEn: "Emotions & personality" },
  { id: "travel",     emoji: "✈️", nameVi: "Du lịch & văn hoá",       nameEn: "Travel & culture" },
];

export const SWEDISH_WORDS_EXPANSION_2: SwedishWord[] = [
  // ───── NATURE ─────
  w("nat1","skog","[skuːɡ]","n.","rừng","forest","Sverige har många djupa skogar.","Thụy Điển có nhiều khu rừng sâu.","Sweden has many deep forests.","A1","nature","en"),
  w("nat2","sjö","[ɧøː]","n.","hồ","lake","Vi badar i sjön på sommaren.","Mùa hè chúng tôi bơi ở hồ.","We swim in the lake in summer.","A1","nature","en"),
  w("nat3","hav","[hɑːv]","n.","biển","sea","Östersjön är ett kallt hav.","Biển Baltic là biển lạnh.","The Baltic is a cold sea.","A1","nature","ett"),
  w("nat4","fjäll","[fjɛlː]","n.","núi (Bắc Âu)","fell / mountain","Vi vandrar i fjällen i juli.","Tháng 7 chúng tôi đi bộ ở núi.","We hike the fells in July.","A2","nature","ett"),
  w("nat5","träd","[trɛːd]","n.","cây","tree","Trädet är hundra år gammalt.","Cây này 100 tuổi.","The tree is a hundred years old.","A1","nature","ett"),
  w("nat6","blomma","[ˈblʊmːa]","n.","hoa","flower","Hon plockar blommor i parken.","Cô ấy hái hoa trong công viên.","She picks flowers in the park.","A1","nature","en"),
  w("nat7","älg","[ɛljː]","n.","nai sừng tấm","moose","En älg sprang över vägen.","Một con nai băng qua đường.","A moose ran across the road.","A2","nature","en"),
  w("nat8","räv","[rɛːv]","n.","cáo","fox","Räven är listig.","Cáo rất ranh mãnh.","The fox is sly.","A2","nature","en"),
  w("nat9","fågel","[ˈfoːɡɛl]","n.","chim","bird","En liten fågel sjunger utanför.","Một con chim nhỏ hót ngoài kia.","A small bird is singing outside.","A1","nature","en"),
  w("nat10","natur","[naˈtʉːr]","n.","thiên nhiên","nature","Svenskar älskar naturen.","Người Thụy Điển yêu thiên nhiên.","Swedes love nature.","A1","nature","en"),
  w("nat11","miljöskydd","[mɪlˈjøːʂʏdː]","n.","bảo vệ môi trường","environmental protection","Miljöskydd är en politisk fråga.","Bảo vệ môi trường là vấn đề chính trị.","Environmental protection is a political issue.","B1","nature","ett"),
  w("nat12","allemansrätten","[ˈalːɛmansˌrɛtːɛn]","n.","quyền tự do tiếp cận thiên nhiên","right of public access","Allemansrätten tillåter alla att vandra fritt.","Allemansrätten cho phép đi bộ tự do.","Allemansrätten lets everyone hike freely.","B1","nature","en"),

  // ───── WEATHER ─────
  w("wx1","sol","[suːl]","n.","mặt trời","sun","Solen skiner idag.","Hôm nay mặt trời chiếu sáng.","The sun is shining today.","A1","weather","en"),
  w("wx2","regn","[rɛŋn]","n.","mưa","rain","Det är mycket regn i höst.","Mùa thu mưa rất nhiều.","There is a lot of rain in autumn.","A1","weather","ett"),
  w("wx3","snö","[snøː]","n.","tuyết","snow","Snön ligger djup på marken.","Tuyết phủ dày trên mặt đất.","The snow lies deep on the ground.","A1","weather","en"),
  w("wx4","vind","[vɪnd]","n.","gió","wind","Det blåser stark vind idag.","Hôm nay gió rất mạnh.","A strong wind is blowing today.","A1","weather","en"),
  w("wx5","moln","[mʊln]","n.","mây","cloud","Himlen är full av moln.","Trời đầy mây.","The sky is full of clouds.","A2","weather","ett"),
  w("wx6","åska","[ˈɔska]","n.","sấm sét","thunderstorm","Det blir åska i kväll.","Tối nay sẽ có dông.","There'll be a thunderstorm tonight.","A2","weather","en"),
  w("wx7","temperatur","[tɛmpɛraˈtʉːr]","n.","nhiệt độ","temperature","Temperaturen sjunker till −10.","Nhiệt độ giảm xuống −10.","Temperature drops to −10.","A2","weather","en"),
  w("wx8","vinter","[ˈvɪntɛr]","n.","mùa đông","winter","Vintern är lång i Norden.","Mùa đông Bắc Âu dài.","Winter is long in the Nordics.","A1","weather","en"),
  w("wx9","sommar","[ˈsɔmːar]","n.","mùa hè","summer","På sommaren går solen aldrig ner.","Mùa hè mặt trời không lặn.","In summer the sun never sets.","A1","weather","en"),
  w("wx10","höst","[hœst]","n.","mùa thu","autumn","Hösten är vacker här.","Mùa thu ở đây rất đẹp.","Autumn is beautiful here.","A1","weather","en"),
  w("wx11","vår","[voːr]","n.","mùa xuân","spring","Våren kommer sent norrut.","Mùa xuân đến muộn ở phía bắc.","Spring comes late up north.","A1","weather","en"),
  w("wx12","klimatförändring","[ˈkliːmatfœrˌɛndrɪŋ]","n.","biến đổi khí hậu","climate change","Klimatförändringen påverkar Arktis.","Biến đổi khí hậu ảnh hưởng Bắc Cực.","Climate change affects the Arctic.","B1","weather","en"),

  // ───── TECHNOLOGY ─────
  w("tex1","dator","[ˈdɑːtʊr]","n.","máy tính","computer","Min dator är gammal.","Máy tính tôi cũ.","My computer is old.","A1","technology","en"),
  w("tex2","mobil","[mʊˈbiːl]","n.","điện thoại","mobile phone","Lämna mobilen i väskan.","Để điện thoại trong cặp.","Leave the mobile in the bag.","A1","technology","en"),
  w("tex3","internet","[ˈɪntɛrnɛt]","n.","internet","internet","Internet är långsamt här.","Internet ở đây chậm.","The internet is slow here.","A1","technology","ett"),
  w("tex4","appen","[ˈapːɛn]","n.","ứng dụng (xác định)","the app","Ladda ner appen gratis.","Tải ứng dụng miễn phí.","Download the app for free.","A2","technology","en"),
  w("tex5","mejl","[mɛjl]","n.","email","email","Jag fick ett mejl från chefen.","Tôi nhận email từ sếp.","I got an email from the boss.","A2","technology","ett"),
  w("tex6","lösenord","[ˈløːsɛnˌʊːʈ]","n.","mật khẩu","password","Glöm inte lösenordet.","Đừng quên mật khẩu.","Don't forget the password.","A2","technology","ett"),
  w("tex7","skärm","[ɧærm]","n.","màn hình","screen","Skärmen är trasig.","Màn hình bị vỡ.","The screen is broken.","A2","technology","en"),
  w("tex8","ladda","[ˈladːa]","v.","sạc / tải","to charge / download","Jag måste ladda mobilen.","Tôi phải sạc điện thoại.","I need to charge my mobile.","A2","technology"),
  w("tex9","digital","[dɪɡɪˈtɑːl]","adj.","kỹ thuật số","digital","Sverige är ett digitalt samhälle.","Thụy Điển là xã hội số.","Sweden is a digital society.","B1","technology"),
  w("tex10","artificiell intelligens","[arːtɪfɪˈsiɛlː ɪntɛlːɪˈɡɛns]","n.","trí tuệ nhân tạo","artificial intelligence","Artificiell intelligens förändrar arbete.","AI thay đổi công việc.","AI is changing work.","B1","technology","en"),
  w("tex11","sociala medier","[suˈsɪɑːla ˈmeːdɪɛr]","n.","mạng xã hội","social media","Sociala medier påverkar ungdomar.","Mạng xã hội ảnh hưởng thanh niên.","Social media influences young people.","B1","technology"),
  w("tex12","programmera","[prʊɡraˈmeːra]","v.","lập trình","to program","Han lär sig att programmera i Python.","Anh ấy học lập trình Python.","He's learning to program in Python.","B1","technology"),

  // ───── EDUCATION ─────
  w("edx1","skola","[ˈskuːla]","n.","trường học","school","Skolan börjar klockan åtta.","Trường bắt đầu lúc 8.","School starts at eight.","A1","education","en"),
  w("edx2","lärare","[ˈlɛːrarɛ]","n.","giáo viên","teacher","Min lärare är väldigt snäll.","Cô giáo tôi rất tốt.","My teacher is very kind.","A1","education","en"),
  w("edx3","elev","[ɛˈleːv]","n.","học sinh","pupil","Eleverna gör läxor.","Học sinh làm bài tập.","The pupils are doing homework.","A1","education","en"),
  w("edx4","läxa","[ˈlɛksa]","n.","bài tập về nhà","homework","Jag har mycket läxor idag.","Hôm nay tôi nhiều bài.","I have lots of homework today.","A2","education","en"),
  w("edx5","prov","[pruːv]","n.","bài kiểm tra","test","Provet är på fredag.","Bài kiểm tra thứ sáu.","The test is on Friday.","A2","education","ett"),
  w("edx6","universitet","[ʉnɪvɛʂʈeˈteːt]","n.","đại học","university","Hon studerar vid Uppsala universitet.","Cô học tại Đại học Uppsala.","She studies at Uppsala University.","A2","education","ett"),
  w("edx7","kurs","[kʉʂː]","n.","khoá học","course","Kursen kostar 200 kronor.","Khoá học 200 kr.","The course costs 200 SEK.","A2","education","en"),
  w("edx8","studera","[stʉˈdeːra]","v.","học (cao cấp)","to study","Jag studerar svenska.","Tôi học tiếng Thụy Điển.","I study Swedish.","A1","education"),
  w("edx9","examen","[ɛkˈsɑːmɛn]","n.","kỳ thi/bằng","exam / degree","Hon tar examen i juni.","Cô tốt nghiệp tháng 6.","She graduates in June.","B1","education","en"),
  w("edx10","forskning","[ˈfɔʂːknɪŋ]","n.","nghiên cứu","research","Forskningen visar nya resultat.","Nghiên cứu cho kết quả mới.","Research shows new results.","B1","education","en"),
  w("edx11","stipendium","[stɪˈpɛndɪɵm]","n.","học bổng","scholarship","Hon fick ett stipendium till Finland.","Cô được học bổng đi Phần Lan.","She got a scholarship to Finland.","B1","education","ett"),
  w("edx12","praktik","[prakˈtiːk]","n.","kỳ thực tập","internship","Praktiken börjar i augusti.","Thực tập bắt đầu tháng 8.","The internship starts in August.","B1","education","en"),

  // ───── EMOTIONS ─────
  w("emx1","glad","[ɡlɑːd]","adj.","vui","happy","Jag är glad idag.","Hôm nay tôi vui.","I'm happy today.","A1","emotions"),
  w("emx2","ledsen","[ˈleːsɛn]","adj.","buồn","sad","Hon är ledsen för att hunden är sjuk.","Cô buồn vì chó ốm.","She's sad because the dog is sick.","A1","emotions"),
  w("emx3","arg","[arj]","adj.","giận","angry","Han blir arg snabbt.","Anh ấy dễ giận.","He gets angry quickly.","A1","emotions"),
  w("emx4","rädd","[rɛdː]","adj.","sợ","afraid","Barnet är rädd för mörker.","Em bé sợ tối.","The child is afraid of the dark.","A2","emotions"),
  w("emx5","trött","[trœtː]","adj.","mệt","tired","Jag är trött efter jobbet.","Tôi mệt sau khi làm.","I'm tired after work.","A1","emotions"),
  w("emx6","nervös","[nɛrˈvøːs]","adj.","hồi hộp","nervous","Hon är nervös inför provet.","Cô hồi hộp trước kỳ thi.","She's nervous before the test.","A2","emotions"),
  w("emx7","stolt","[stɔlt]","adj.","tự hào","proud","Vi är stolta över dig.","Chúng tôi tự hào về bạn.","We're proud of you.","B1","emotions"),
  w("emx8","besviken","[bɛˈsviːkɛn]","adj.","thất vọng","disappointed","Han är besviken på resultatet.","Anh thất vọng về kết quả.","He's disappointed in the result.","B1","emotions"),
  w("emx9","ärlig","[ˈæːʂlɪɡ]","adj.","trung thực","honest","Var ärlig mot dig själv.","Hãy thành thật với bản thân.","Be honest with yourself.","B1","emotions"),
  w("emx10","tålamod","[ˈtɔːlamʊd]","n.","kiên nhẫn","patience","Du behöver tålamod.","Bạn cần kiên nhẫn.","You need patience.","B1","emotions","ett"),
  w("emx11","självförtroende","[ˈɧɛlvfœrˌtruːɛndɛ]","n.","tự tin","self-confidence","Övning ger självförtroende.","Luyện tập tạo tự tin.","Practice builds self-confidence.","B1","emotions","ett"),
  w("emx12","empati","[ɛmpaˈtiː]","n.","đồng cảm","empathy","Empati är viktigt i jobbet.","Đồng cảm quan trọng trong công việc.","Empathy matters at work.","B1","emotions","en"),

  // ───── TRAVEL & CULTURE ─────
  w("trx1","resa","[ˈreːsa]","n.","chuyến đi","trip","Resan tar tre timmar.","Chuyến đi mất 3 tiếng.","The trip takes three hours.","A1","travel","en"),
  w("trx2","semester","[sɛˈmɛstɛr]","n.","kỳ nghỉ","holiday","Vi har semester i juli.","Chúng tôi nghỉ tháng 7.","We're on holiday in July.","A2","travel","en"),
  w("trx3","flygplats","[ˈflyːɡplats]","n.","sân bay","airport","Arlanda är största flygplatsen.","Arlanda là sân bay lớn nhất.","Arlanda is the biggest airport.","A2","travel","en"),
  w("trx4","biljett","[bɪlˈjɛtː]","n.","vé","ticket","Biljetten kostar 50 kronor.","Vé giá 50 kr.","The ticket costs 50 SEK.","A1","travel","en"),
  w("trx5","hotell","[hʊˈtɛlː]","n.","khách sạn","hotel","Hotellet ligger nära centrum.","Khách sạn gần trung tâm.","The hotel is near downtown.","A1","travel","ett"),
  w("trx6","resmål","[ˈreːsmoːl]","n.","điểm đến","destination","Lappland är ett populärt resmål.","Lappland là điểm đến hấp dẫn.","Lapland is a popular destination.","B1","travel","ett"),
  w("trx7","kultur","[kɵlˈtʉːr]","n.","văn hoá","culture","Svensk kultur är öppen.","Văn hoá Thụy Điển cởi mở.","Swedish culture is open.","A2","travel","en"),
  w("trx8","midsommar","[ˈmɪdsɔmːar]","n.","ngày Hạ chí","Midsummer","Midsommar firas i juni.","Midsommar tổ chức tháng 6.","Midsummer is celebrated in June.","A2","travel","en"),
  w("trx9","jul","[jʉːl]","n.","Giáng sinh","Christmas","Vi firar jul med familjen.","Chúng tôi đón Giáng sinh với gia đình.","We celebrate Christmas with family.","A1","travel","en"),
  w("trx10","tradition","[tradɪˈʃuːn]","n.","truyền thống","tradition","Fika är en svensk tradition.","Fika là truyền thống Thụy Điển.","Fika is a Swedish tradition.","A2","travel","en"),
  w("trx11","gränsen","[ˈɡrɛnːsɛn]","n.","biên giới (xđ)","the border","Vid gränsen behöver du pass.","Tại biên giới cần hộ chiếu.","You need a passport at the border.","B1","travel","en"),
  w("trx12","upptäcka","[ˈɵpːtɛka]","v.","khám phá","to discover","Vi upptäcker nya städer varje år.","Mỗi năm chúng tôi khám phá thành phố mới.","We discover new cities every year.","B1","travel"),
];
