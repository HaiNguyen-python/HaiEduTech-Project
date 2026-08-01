/**
 * @file swedishSpeakingModelAnswersExpansion.ts
 * @description Band 4-5 model answers for every Tala prompt that had no sample
 *              in swedishSpeakingModelAnswers.ts. Merged into the same record.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishSpeakingModelAnswer } from "./swedishSpeakingModelAnswers";

export const SWEDISH_SPEAKING_MODEL_ANSWERS_EXPANSION: Record<string, SwedishSpeakingModelAnswer> = {
  // ══════════════════ A1 ══════════════════
  "s-a1-favoritmat": {
    sv: "Min favoritmat är bún chả, grillat fläskkött med nudlar. Jag äter det oftast på söndagar när jag har tid att laga mat. Man behöver fläskkött, fisksås, socker, vitlök och färska örter. Jag tycker om rätten eftersom den smakar både sött och salt. I Sverige köper jag ingredienserna i en asiatisk butik i Solna.",
    vi: "Món tôi thích nhất là bún chả, thịt heo nướng ăn với bún. Tôi thường ăn vào Chủ nhật khi có thời gian nấu. Cần thịt heo, nước mắm, đường, tỏi và rau thơm. Tôi thích món này vì vị vừa ngọt vừa mặn. Ở Thụy Điển tôi mua nguyên liệu ở cửa hàng châu Á tại Solna.",
    bandNote: "A1 Band 4: câu ngắn nhưng đủ 4 ý (món, khi nào, nguyên liệu, lý do). 'eftersom' giúp điểm Grammar.",
  },
  "s-a1-daily-routine": {
    sv: "Jag vaknar klockan sex på morgonen. Först duschar jag och sedan äter jag frukost. Klockan halv åtta åker jag buss till skolan. Vi har lektioner till klockan tre. På eftermiddagen pluggar jag hemma i en timme. På kvällen lagar jag mat, ringer min mamma och tittar på en serie. Jag går och lägger mig vid elva.",
    vi: "Tôi dậy lúc 6 giờ sáng. Trước tiên tôi tắm rồi ăn sáng. 7 rưỡi tôi đi xe buýt đến trường. Chúng tôi học đến 3 giờ. Buổi chiều tôi học ở nhà một tiếng. Buổi tối tôi nấu ăn, gọi cho mẹ và xem phim. Tôi đi ngủ lúc 11 giờ.",
    bandNote: "A1: mốc giờ chính xác + 'Först / sedan' tạo trình tự. Đảo ngữ V2 sau trạng ngữ thời gian.",
  },
  "s-a1-hometown": {
    sv: "Jag kommer från Da Nang i mellersta Vietnam. Det är en ganska stor stad vid havet med ungefär en miljon invånare. Där finns långa stränder, en berömd bro och många små restauranger. Vädret är varmt hela året. Jag saknar min hemstad, särskilt maten och min familj.",
    vi: "Tôi đến từ Đà Nẵng ở miền Trung Việt Nam. Đó là thành phố khá lớn ven biển với khoảng một triệu dân. Ở đó có bãi biển dài, một cây cầu nổi tiếng và nhiều quán ăn nhỏ. Thời tiết ấm quanh năm. Tôi nhớ quê, nhất là đồ ăn và gia đình.",
    bandNote: "A1: 'Det finns' + tính từ mô tả. Kết bằng cảm xúc cá nhân ('Jag saknar') là điểm cộng.",
  },
  "s-a1-weather-today": {
    sv: "I dag är det kallt och grått i Stockholm. Det är ungefär fem grader och det blåser mycket. Det regnade i morse, men nu är det uppehåll. Jag har jacka, mössa och halsduk på mig. Jag gillar inte regn, men jag tycker om snö på vintern.",
    vi: "Hôm nay ở Stockholm trời lạnh và xám. Khoảng 5 độ và gió nhiều. Sáng nay mưa nhưng giờ đã tạnh. Tôi mặc áo khoác, đội mũ len và quàng khăn. Tôi không thích mưa nhưng thích tuyết vào mùa đông.",
    bandNote: "A1: 'Det är + tính từ thời tiết' là cấu trúc bắt buộc. Có 1 câu quá khứ ('regnade') để nâng band.",
  },
  "s-a1-family": {
    sv: "I min familj är vi fem personer: mina föräldrar, min storasyster, min lillebror och jag. Min pappa är lärare och min mamma arbetar på ett sjukhus. Min syster bor i Hanoi och studerar juridik. Min lillebror går fortfarande i gymnasiet. Vi ringer varandra varje söndag.",
    vi: "Gia đình tôi có 5 người: bố mẹ, chị gái, em trai và tôi. Bố tôi là giáo viên, mẹ làm ở bệnh viện. Chị tôi sống ở Hà Nội học luật. Em trai còn học phổ thông. Chúng tôi gọi điện cho nhau mỗi Chủ nhật.",
    bandNote: "A1: từ vựng gia đình + nghề nghiệp, mỗi người một câu. Kết bằng thói quen chung.",
  },
  "s-a1-familj-basic": {
    sv: "Jag heter Nam och jag bor med min fru och vår dotter i Uppsala. Min fru heter Trang och hon arbetar som tandläkare. Vår dotter är fyra år och går på förskola. Mina föräldrar bor kvar i Vietnam. På helgen brukar vi gå till parken tillsammans.",
    vi: "Tôi tên Nam, sống với vợ và con gái ở Uppsala. Vợ tôi tên Trang, làm nha sĩ. Con gái tôi 4 tuổi, đi nhà trẻ. Bố mẹ tôi vẫn ở Việt Nam. Cuối tuần chúng tôi thường ra công viên cùng nhau.",
    bandNote: "A1: sở hữu cách 'min/vår' dùng đúng giống. 'brukar' cho thói quen.",
  },
  "s-a1-food-i-like": {
    sv: "Jag tycker mycket om soppa. På vintern äter jag ofta nudelsoppa med kyckling och grönsaker. Jag gillar också svenska köttbullar med potatismos. Jag dricker te till maten, inte läsk. Jag tycker inte om stark ost, den luktar för mycket för mig.",
    vi: "Tôi rất thích súp. Mùa đông tôi hay ăn mì nước với gà và rau. Tôi cũng thích thịt viên Thụy Điển với khoai nghiền. Tôi uống trà khi ăn chứ không uống nước ngọt. Tôi không thích phô mai nặng mùi, với tôi nó nồng quá.",
    bandNote: "A1: cân bằng thích và không thích ('Jag tycker inte om'), có lý do ngắn.",
  },
  "s-a1-mat": {
    sv: "Jag äter frukost hemma varje morgon: bröd med ost och en kopp kaffe. Till lunch tar jag oftast matlåda med ris och kyckling till jobbet. På kvällen lagar jag middag tillsammans med min sambo. Vi äter mycket grönsaker och fisk. På fredagar beställer vi pizza.",
    vi: "Sáng nào tôi cũng ăn sáng ở nhà: bánh mì phô mai và một tách cà phê. Trưa tôi thường mang cơm hộp với cơm và gà đi làm. Tối tôi nấu cùng bạn đời. Chúng tôi ăn nhiều rau và cá. Thứ Sáu thì gọi pizza.",
    bandNote: "A1: bao đủ 3 bữa, dùng 'matlåda' - từ rất Thụy Điển, ghi điểm Vocabulary.",
  },
  "s-a1-stad": {
    sv: "Jag bor i Malmö. Det är Sveriges tredje största stad och den ligger i södra Sverige. I centrum finns många kaféer, en stor park som heter Folkets park och ett bibliotek vid havet. Jag brukar cykla överallt eftersom staden är platt. Jag trivs här därför att det är lugnt men ändå internationellt.",
    vi: "Tôi sống ở Malmö. Đây là thành phố lớn thứ ba Thụy Điển, nằm ở phía nam. Trung tâm có nhiều quán cà phê, công viên lớn tên Folkets park và một thư viện ven biển. Tôi hay đạp xe khắp nơi vì thành phố bằng phẳng. Tôi thích ở đây vì yên tĩnh nhưng vẫn quốc tế.",
    bandNote: "A1+: hai liên từ nguyên nhân khác nhau ('eftersom', 'därför att') - đa dạng ngữ pháp.",
  },

  // ══════════════════ A2 ══════════════════
  "s-a2-best-trip": {
    sv: "Den bästa resan jag har gjort var till Abisko i norra Sverige förra vintern. Jag åkte tåg i sjutton timmar tillsammans med två vänner. Vi bodde i en enkel stuga och hyrde snöskor. Det bästa var när vi såg norrskenet en klar natt - himlen var grön och lila i nästan en timme. Det var kallt, ungefär minus tjugo grader, men vi hade varma kläder. Om jag åker tillbaka vill jag stanna en hel vecka.",
    vi: "Chuyến đi tuyệt nhất của tôi là tới Abisko ở miền bắc Thụy Điển mùa đông năm ngoái. Tôi đi tàu 17 tiếng cùng hai người bạn. Chúng tôi ở nhà gỗ đơn sơ và thuê giày đi tuyết. Tuyệt nhất là khi thấy cực quang một đêm trời quang - bầu trời xanh và tím gần một tiếng. Trời lạnh khoảng âm 20 độ nhưng chúng tôi mặc đủ ấm. Nếu quay lại tôi muốn ở cả tuần.",
    bandNote: "A2 Band 5: quá khứ đều và bất quy tắc, câu điều kiện 'Om jag åker tillbaka...' ở cuối.",
  },
  "s-a2-describe-friend": {
    sv: "Min bästa vän heter Emma och vi träffades på SFI för tre år sedan. Hon är lång, har kort brunt hår och skrattar väldigt högt. Emma är hjälpsam och ärlig; hon säger alltid vad hon tycker, även när det är jobbigt. Vi brukar träna tillsammans på tisdagar och sedan fika. Det jag uppskattar mest är att hon lyssnar när jag har en dålig dag.",
    vi: "Bạn thân nhất của tôi tên Emma, chúng tôi gặp nhau ở lớp SFI ba năm trước. Cô ấy cao, tóc nâu ngắn và cười rất to. Emma tốt bụng và thẳng thắn; luôn nói điều mình nghĩ dù có khó nghe. Chúng tôi hay tập thể thao thứ Ba rồi đi fika. Điều tôi quý nhất là cô ấy chịu lắng nghe khi tôi có ngày tệ.",
    bandNote: "A2: mô tả ngoại hình + tính cách + hoạt động chung. 'Det jag uppskattar mest är att...' là cấu trúc nâng band.",
  },
  "s-a2-work-study": {
    sv: "Jag studerar till systemutvecklare på yrkeshögskolan i Göteborg. Utbildningen tar två år och vi har praktik under sista terminen. En vanlig dag har vi föreläsningar på förmiddagen och grupparbete på eftermiddagen. Det svåraste är fackspråket på svenska, men det blir lättare varje månad. Efter examen hoppas jag få jobb som backend-utvecklare.",
    vi: "Tôi học ngành phát triển hệ thống ở trường nghề tại Göteborg. Chương trình 2 năm, có thực tập kỳ cuối. Ngày thường buổi sáng nghe giảng, chiều làm nhóm. Khó nhất là thuật ngữ chuyên ngành bằng tiếng Thụy Điển, nhưng mỗi tháng lại dễ hơn. Sau khi tốt nghiệp tôi mong làm lập trình viên backend.",
    bandNote: "A2: mô tả hiện tại + khó khăn + mục tiêu tương lai ('hoppas få jobb') - đủ 3 tầng nội dung.",
  },
  "s-a2-shopping-habits": {
    sv: "Jag handlar mat en gång i veckan, oftast på lördagsmorgonen när butiken är tom. Jag skriver alltid en lista i mobilen så att jag inte köper onödiga saker. Jag jämför priser och väljer gärna varor som är på extrapris. Kläder köper jag sällan, kanske fyra gånger om året, och helst second hand eftersom det är billigare och bättre för miljön.",
    vi: "Tôi đi chợ mỗi tuần một lần, thường sáng thứ Bảy khi siêu thị vắng. Tôi luôn ghi danh sách trong điện thoại để không mua đồ thừa. Tôi so giá và hay chọn hàng khuyến mãi. Quần áo thì tôi ít mua, khoảng 4 lần/năm, và thích đồ cũ vì rẻ hơn và tốt cho môi trường.",
    bandNote: "A2: 'så att' (mục đích) và 'eftersom' (nguyên nhân) trong cùng bài - Grammar đa dạng.",
  },
  "s-a2-hometown": {
    sv: "Jag växte upp i Hue, en gammal stad i mellersta Vietnam. Staden är känd för kejsarpalatset och för Parfymfloden som rinner rakt genom centrum. Där bodde ungefär trehundratusen personer när jag var barn. Skillnaden mot Sverige är stor: i Hue är det trettio grader och mycket trafik, här är det tyst och kallt. Jag åker tillbaka vartannat år för att hälsa på mina släktingar.",
    vi: "Tôi lớn lên ở Huế, một thành phố cổ miền Trung Việt Nam. Thành phố nổi tiếng với hoàng cung và sông Hương chảy giữa trung tâm. Hồi tôi còn nhỏ có khoảng 300 nghìn dân. Khác biệt so với Thụy Điển rất lớn: Huế 30 độ và đông xe, ở đây yên tĩnh và lạnh. Tôi về thăm họ hàng hai năm một lần.",
    bandNote: "A2: quá khứ ('växte upp', 'bodde') kết hợp so sánh hai nơi - Task Fulfilment đầy đủ.",
  },
  "s-a2-hemstad-vietnam": {
    sv: "Min hemstad heter Can Tho och ligger i Mekongdeltat. Det mest kända där är den flytande marknaden, dit folk kommer med båt tidigt på morgonen för att sälja frukt. Om en svensk vän besökte mig skulle jag ta med henne dit klockan fem på morgonen, sedan äta nudelsoppa på båten och till sist besöka en risfabrik. Klimatet är fuktigt, så jag skulle säga åt henne att ta med tunna kläder.",
    vi: "Quê tôi là Cần Thơ, nằm ở đồng bằng sông Cửu Long. Nổi tiếng nhất là chợ nổi, nơi người ta chèo ghe đến từ sáng sớm để bán trái cây. Nếu một người bạn Thụy Điển đến thăm, tôi sẽ đưa cô ấy đi lúc 5 giờ sáng, ăn hủ tiếu trên ghe rồi thăm nhà máy gạo. Khí hậu ẩm nên tôi sẽ dặn cô ấy mang quần áo mỏng.",
    bandNote: "A2 cao: câu điều kiện loại 2 ('Om ... besökte ... skulle jag') dùng chuẩn - rất ăn điểm.",
  },
  "s-a2-transport": {
    sv: "Jag åker mest kollektivt. På vardagar tar jag pendeltåget till jobbet, det tar tjugofem minuter och går var tionde minut. På sommaren cyklar jag i stället, då sparar jag pengar och får motion. Jag har körkort men ingen bil, eftersom parkering i stan är dyr. Nackdelen med tåget är att det blir förseningar när det snöar mycket.",
    vi: "Tôi chủ yếu đi phương tiện công cộng. Ngày thường tôi đi tàu ngoại ô đến chỗ làm, mất 25 phút và cứ 10 phút một chuyến. Mùa hè tôi đạp xe, vừa tiết kiệm vừa vận động. Tôi có bằng lái nhưng không có ô tô vì đỗ xe trong phố đắt. Nhược điểm của tàu là hay trễ khi tuyết nhiều.",
    bandNote: "A2: nêu cả ưu và nhược, có số liệu thời gian. 'i stället' và 'Nackdelen är att' nâng Vocabulary.",
  },
  "s-a2-arbete": {
    sv: "Jag arbetar som undersköterska på ett äldreboende i Solna. Jag jobbar skift, ibland från sju på morgonen och ibland kvällspass till tio. Mina arbetsuppgifter är att hjälpa de boende med mat, medicin och promenader. Det roligaste är samtalen med de äldre; många berättar historier från femtiotalet. Det tunga är stressen när vi är för få i personalen.",
    vi: "Tôi làm điều dưỡng viên ở viện dưỡng lão tại Solna. Tôi làm theo ca, khi thì từ 7 giờ sáng, khi thì ca tối đến 10 giờ. Công việc là giúp người già ăn uống, uống thuốc và đi dạo. Vui nhất là trò chuyện với các cụ; nhiều người kể chuyện từ những năm 50. Nặng nhất là áp lực khi thiếu nhân sự.",
    bandNote: "A2: nêu nhiệm vụ cụ thể + điều thích + điều khó. So sánh nhất 'det roligaste/det tunga'.",
  },
  "s-a2-teknik": {
    sv: "Jag använder min mobil ungefär tre timmar om dagen. Mest använder jag den till kartor, bankärenden och för att ringa min familj i Vietnam. På jobbet använder jag datorn hela dagen. Tekniken gör livet enklare: jag bokar läkartid, betalar räkningar och läser nyheter i samma app. Nackdelen är att jag kollar mobilen för ofta på kvällen, så jag har börjat lägga den i köket när jag sover.",
    vi: "Tôi dùng điện thoại khoảng 3 tiếng mỗi ngày. Chủ yếu để xem bản đồ, giao dịch ngân hàng và gọi cho gia đình ở Việt Nam. Ở công ty tôi dùng máy tính cả ngày. Công nghệ làm cuộc sống dễ hơn: đặt lịch khám, trả hóa đơn và đọc tin trong cùng một app. Nhược điểm là buổi tối tôi xem điện thoại quá nhiều nên đã bắt đầu để nó trong bếp khi ngủ.",
    bandNote: "A2: có giải pháp cá nhân ở cuối ('jag har börjat lägga den i köket') - thể hiện suy nghĩ riêng.",
  },
  "s-a2-fritid-plan": {
    sv: "Nästa helg ska jag träffa mina vänner. På lördag förmiddag ska vi springa fem kilometer i Hagaparken och sedan fika på ett kafé. På kvällen ska vi laga vietnamesisk mat hemma hos mig. På söndag tänker jag vila, tvätta och kanske gå på bio om det finns bra biljetter kvar. Om vädret är dåligt stannar vi inne och spelar brädspel i stället.",
    vi: "Cuối tuần tới tôi sẽ gặp bạn bè. Sáng thứ Bảy chúng tôi chạy 5 km ở công viên Haga rồi đi fika. Tối nấu món Việt ở nhà tôi. Chủ nhật tôi định nghỉ ngơi, giặt giũ và có thể đi xem phim nếu còn vé đẹp. Nếu thời tiết xấu thì chúng tôi ở nhà chơi board game.",
    bandNote: "A2: 'ska' (kế hoạch chắc chắn) + 'tänker' (dự định) + 'om' (điều kiện dự phòng).",
  },

  // ══════════════════ B1 ══════════════════
  "s-b1-ai-jobs": {
    sv: "Frågan om artificiell intelligens och arbete engagerar mig mycket. Å ena sidan är det tydligt att AI tar över rutinuppgifter: kundtjänst, enkel översättning och delar av bokföringen sköts redan av system i dag. Å andra sidan skapas nya yrken, till exempel de som ska granska, träna och sätta gränser för modellerna.\n\nJag tror att den största risken inte är massarbetslöshet utan ojämlikhet. Den som redan har utbildning kan lära sig nya verktyg snabbt, medan den som har ett enkelt jobb riskerar att hamna efter.\n\nDärför anser jag att både arbetsgivare och samhälle måste satsa på vidareutbildning under hela arbetslivet. Själv försöker jag lära mig ett nytt digitalt verktyg varje halvår, just för att inte bli omsprungen.",
    vi: "Câu chuyện trí tuệ nhân tạo và việc làm khiến tôi rất quan tâm. Một mặt, rõ ràng AI đang thay thế các việc lặp lại: chăm sóc khách hàng, dịch đơn giản và một phần kế toán nay đã do hệ thống làm. Mặt khác, những nghề mới xuất hiện, ví dụ người kiểm duyệt, huấn luyện và đặt giới hạn cho các mô hình.\n\nTôi cho rằng rủi ro lớn nhất không phải thất nghiệp hàng loạt mà là bất bình đẳng. Người đã có học vấn học công cụ mới rất nhanh, còn người làm việc giản đơn dễ bị bỏ lại.\n\nVì vậy tôi nghĩ cả doanh nghiệp lẫn xã hội phải đầu tư đào tạo suốt đời. Bản thân tôi cố học một công cụ số mới mỗi nửa năm để không bị vượt qua.",
    bandNote: "B1 Band 5: 'Å ena sidan ... å andra sidan', 'inte ... utan', bị động 'sköts' và ví dụ cá nhân ở cuối.",
  },
  "s-b1-climate-personal": {
    sv: "Klimatfrågan känns ibland för stor för en enskild person, men jag tror ändå att vardagsvalen spelar roll.\n\nJag har gjort tre konkreta förändringar. För det första äter jag kött bara en gång i veckan; det var svårast i början men nu saknar jag det sällan. För det andra flyger jag inte inom Europa längre utan tar tåg, även om resan tar längre tid. För det tredje handlar jag begagnade kläder och lagar mina saker i stället för att slänga dem.\n\nSamtidigt är jag realistisk: individens val räcker inte om industrin och politiken inte förändras. Det bästa jag kan göra är alltså att både ändra mina egna vanor och rösta på dem som tar frågan på allvar.",
    vi: "Vấn đề khí hậu đôi khi quá lớn với một cá nhân, nhưng tôi vẫn tin lựa chọn hàng ngày có ý nghĩa.\n\nTôi đã thay đổi ba việc cụ thể. Thứ nhất, tôi chỉ ăn thịt một lần mỗi tuần; ban đầu rất khó nhưng giờ hiếm khi thấy thèm. Thứ hai, tôi không bay trong châu Âu nữa mà đi tàu, dù mất thời gian hơn. Thứ ba, tôi mua quần áo cũ và sửa đồ thay vì vứt đi.\n\nĐồng thời tôi thực tế: lựa chọn cá nhân không đủ nếu ngành công nghiệp và chính trị không đổi. Điều tốt nhất tôi làm được là vừa đổi thói quen vừa bỏ phiếu cho những người coi trọng vấn đề này.",
    bandNote: "B1: liệt kê 'För det första/andra/tredje', nhượng bộ 'även om' và kết luận cân bằng.",
  },
  "s-b1-social-media": {
    sv: "Sociala medier har förändrat hur vi umgås, och effekten är dubbel.\n\nDet positiva är att avstånd inte längre betyder så mycket. Jag pratar med min familj i Vietnam varje dag, och jag har hittat både en läsecirkel och mitt nuvarande jobb genom nätverk på nätet.\n\nDet negativa handlar om jämförelse och tid. Många, särskilt unga, ser bara andras höjdpunkter och känner sig otillräckliga. Dessutom är plattformarna byggda för att fånga vår uppmärksamhet så länge som möjligt.\n\nMin slutsats är att problemet inte är tekniken i sig utan hur den är designad och hur vi använder den. Personligen har jag stängt av notiser och bestämt att jag inte använder mobilen den första timmen på morgonen, vilket har gjort mig mycket lugnare.",
    vi: "Mạng xã hội đã thay đổi cách chúng ta giao tiếp, và tác động là hai chiều.\n\nMặt tích cực là khoảng cách không còn quan trọng. Tôi nói chuyện với gia đình ở Việt Nam mỗi ngày, và tôi tìm được cả câu lạc bộ đọc sách lẫn công việc hiện tại qua mạng lưới trên mạng.\n\nMặt tiêu cực là sự so sánh và thời gian. Nhiều người, nhất là giới trẻ, chỉ thấy khoảnh khắc đẹp của người khác nên thấy mình kém cỏi. Ngoài ra các nền tảng được thiết kế để giữ sự chú ý càng lâu càng tốt.\n\nKết luận của tôi là vấn đề không nằm ở công nghệ mà ở cách nó được thiết kế và cách ta dùng. Cá nhân tôi đã tắt thông báo và quyết định không dùng điện thoại trong giờ đầu buổi sáng, nhờ đó bình tĩnh hơn nhiều.",
    bandNote: "B1: 'vilket har gjort' (mệnh đề quan hệ cho cả câu), bị động 'är byggda', kết luận cá nhân.",
  },
  "s-b1-housing-young": {
    sv: "Bostadssituationen för unga i svenska storstäder är svår, och orsakerna är flera.\n\nDet byggs för få hyresrätter, samtidigt som kötiden i Stockholm kan vara över tio år. Många unga tvingas därför hyra i andra hand till höga priser och med korta kontrakt, vilket gör det omöjligt att planera livet.\n\nJag ser tre möjliga lösningar. Kommunerna borde bygga fler små hyreslägenheter nära kollektivtrafik. Reglerna för andrahandsuthyrning behöver kontrolleras hårdare så att ingen utnyttjas. Slutligen kunde studentbostäder byggas snabbare med enklare byggregler.\n\nOm inget görs riskerar storstäderna att förlora unga arbetstagare, eftersom de helt enkelt flyttar dit där de har råd att bo.",
    vi: "Tình hình nhà ở cho người trẻ tại các đô thị lớn Thụy Điển rất khó khăn và có nhiều nguyên nhân.\n\nSố căn hộ cho thuê xây quá ít, trong khi thời gian xếp hàng ở Stockholm có thể hơn 10 năm. Vì vậy nhiều bạn trẻ buộc phải thuê lại với giá cao và hợp đồng ngắn, khiến không thể lên kế hoạch cuộc sống.\n\nTôi thấy ba giải pháp. Chính quyền nên xây thêm căn hộ nhỏ cho thuê gần giao thông công cộng. Quy định cho thuê lại cần kiểm soát chặt hơn để không ai bị lợi dụng. Cuối cùng, ký túc xá sinh viên có thể xây nhanh hơn nhờ quy chuẩn đơn giản hơn.\n\nNếu không làm gì, các thành phố lớn có nguy cơ mất lao động trẻ vì họ đơn giản chuyển đến nơi họ đủ tiền sống.",
    bandNote: "B1: nhiều dạng bị động ('Det byggs', 'kunde byggas'), 'vilket', và câu điều kiện cảnh báo ở cuối.",
  },
  "s-b1-favourite-season": {
    sv: "Min favoritårstid i Sverige är sensommaren, alltså augusti.\n\nDå är luften fortfarande varm men inte kvav, och kvällarna blir precis mörka nog för att man ska kunna se stjärnor. Skogen är full av blåbär och kantareller, och jag brukar plocka svamp med en granne som lärde mig var man hittar dem.\n\nJag uppskattar också stämningen. Folk har kommit tillbaka från semestern och är på gott humör, samtidigt som livet inte har blivit lika stressigt som i september.\n\nDet enda negativa är myggen vid sjön, men det är ett litet pris att betala. Om jag jämför med vintern, som jag tyckte var svår mitt första år, känns augusti som belöningen för att man har stått ut med mörkret.",
    vi: "Mùa tôi thích nhất ở Thụy Điển là cuối hè, tức tháng Tám.\n\nKhi đó không khí vẫn ấm nhưng không oi, và buổi tối đủ tối để nhìn thấy sao. Rừng đầy việt quất và nấm chanterelle, tôi hay đi hái nấm với một người hàng xóm đã chỉ tôi chỗ tìm.\n\nTôi cũng thích không khí chung. Mọi người vừa đi nghỉ về nên vui vẻ, trong khi cuộc sống chưa căng thẳng như tháng Chín.\n\nĐiều dở duy nhất là muỗi ở hồ, nhưng đó là cái giá nhỏ. So với mùa đông - mùa mà năm đầu tiên tôi thấy rất khó - tháng Tám như phần thưởng cho việc đã chịu đựng bóng tối.",
    bandNote: "B1: mệnh đề quan hệ lồng, 'samtidigt som', so sánh với mùa khác - Coherence rất tốt.",
  },
  "s-b1-technology-daily": {
    sv: "Tekniken påverkar nästan varje del av min vardag, på gott och ont.\n\nEn typisk dag börjar med att mobilen väcker mig och visar bussens realtid. På jobbet sker allt digitalt: möten på video, filer i molnet och chatt i stället för mejl. Utan de verktygen skulle jag inte kunna arbeta hemifrån två dagar i veckan.\n\nSamtidigt märker jag en baksida. Gränsen mellan arbete och fritid suddas ut när chefen kan nå mig klockan nio på kvällen, och jag koncentrerar mig sämre när jag byter mellan tio flikar.\n\nJag har därför infört egna regler: inga notiser efter arbetstid och en helg i månaden nästan utan skärm. Tekniken ska vara ett verktyg, inte en chef.",
    vi: "Công nghệ ảnh hưởng gần như mọi phần trong ngày của tôi, cả tốt lẫn xấu.\n\nMột ngày điển hình bắt đầu bằng việc điện thoại đánh thức tôi và hiện giờ xe buýt theo thời gian thực. Ở công ty mọi thứ đều số hóa: họp video, tài liệu trên đám mây, chat thay email. Không có những công cụ đó tôi đã không thể làm việc ở nhà hai ngày mỗi tuần.\n\nĐồng thời tôi thấy mặt trái. Ranh giới công việc và nghỉ ngơi bị xóa nhòa khi sếp có thể liên hệ lúc 9 giờ tối, và tôi kém tập trung khi nhảy giữa mười tab.\n\nVì vậy tôi tự đặt quy tắc: không thông báo sau giờ làm và mỗi tháng một cuối tuần gần như không màn hình. Công nghệ phải là công cụ chứ không phải ông chủ.",
    bandNote: "B1: câu điều kiện loại 2 ('skulle jag inte kunna'), bị động '-s', kết bằng câu ẩn dụ ngắn gọn.",
  },
  "s-b1-miljo-personligt": {
    sv: "När det gäller miljön försöker jag börja med det som faktiskt ligger i min kontroll.\n\nJag sorterar allt avfall, vilket är enkelt i Sverige eftersom återvinningsstationen ligger hundra meter från mitt hus. Jag har också slutat köpa flaskvatten och använder en egen flaska, och jag väljer tåg framför flyg när resan är kortare än tio timmar.\n\nDen förändring som betytt mest är ändå maten. Genom att planera veckans måltider slänger vi nästan ingen mat längre, och det märks både i soppåsen och i plånboken.\n\nJag är medveten om att mina val är små i ett globalt perspektiv. Men om många gör samma sak, och om politikerna samtidigt styr industrin med tydliga regler, kan effekten bli betydande.",
    vi: "Về môi trường, tôi cố bắt đầu từ những gì thực sự nằm trong tầm tay.\n\nTôi phân loại toàn bộ rác, việc này ở Thụy Điển rất dễ vì trạm tái chế cách nhà tôi 100 mét. Tôi cũng ngừng mua nước đóng chai mà dùng bình riêng, và chọn tàu thay máy bay khi hành trình dưới 10 tiếng.\n\nThay đổi có ý nghĩa nhất vẫn là chuyện ăn uống. Nhờ lên thực đơn cả tuần, chúng tôi gần như không bỏ phí thức ăn nữa, thấy rõ cả ở túi rác lẫn ví tiền.\n\nTôi ý thức rằng lựa chọn của mình là nhỏ bé trên bình diện toàn cầu. Nhưng nếu nhiều người cùng làm, và chính trị gia đồng thời quản lý ngành công nghiệp bằng quy định rõ ràng, tác động có thể rất lớn.",
    bandNote: "B1: 'Genom att + infinitiv', 'Den förändring som...' và câu điều kiện kép ở kết bài.",
  },
  "s-b1-utbildning-vs-arbete": {
    sv: "Är det bättre att studera vidare direkt efter gymnasiet eller att börja arbeta? Jag tycker att svaret beror på personen, men jag ser tydliga argument åt båda hållen.\n\nDen som studerar direkt behåller studietekniken och kommer snabbare ut i ett kvalificerat yrke. Nackdelen är att man vid nitton års ålder sällan vet vad man verkligen vill, och risken finns att man avbryter utbildningen efter ett år.\n\nDen som arbetar först får erfarenhet, egna pengar och en tydligare bild av vad ett yrke innebär. Å andra sidan kan det bli svårt att gå tillbaka till studier när man har vant sig vid en lön.\n\nSjälv skulle jag rekommendera ett mellanting: ett år av arbete eller praktik, och sedan studier. Då väljer man utbildning av rätt skäl i stället för av gammal vana.",
    vi: "Nên học tiếp ngay sau phổ thông hay đi làm? Tôi nghĩ câu trả lời tùy người, nhưng cả hai hướng đều có lý lẽ rõ ràng.\n\nAi học tiếp ngay thì giữ được kỹ năng học và sớm vào nghề chuyên môn. Nhược điểm là ở tuổi 19 hiếm ai biết mình thực sự muốn gì, có nguy cơ bỏ dở sau một năm.\n\nAi đi làm trước thì có kinh nghiệm, tiền riêng và hình dung rõ hơn về nghề. Mặt khác, quay lại học có thể khó khi đã quen có lương.\n\nBản thân tôi khuyên chọn phương án trung gian: một năm đi làm hoặc thực tập rồi mới học. Khi đó ta chọn ngành vì lý do đúng chứ không theo quán tính.",
    bandNote: "B1: cấu trúc 'Den som...' mở mỗi đoạn lập luận, kết bằng khuyến nghị riêng có lý do.",
  },
  "s-b1-miljovanlig-livsstil": {
    sv: "En miljövänlig livsstil betyder för mig att göra rimliga val ofta, inte perfekta val ibland.\n\nDet första jag ändrade var transporten. Jag sålde bilen för två år sedan och använder cykel och pendeltåg; det tar tio minuter längre men jag sparar också pengar. Det andra är energin hemma: vi sänkte inomhustemperaturen till tjugo grader och bytte till LED-lampor.\n\nDet svåraste har varit konsumtionen. Reklamen är överallt och det är billigt att köpa nytt, medan reparation ofta kostar mer än varan. Där behövs politiska beslut, till exempel lägre moms på reparationer.\n\nJag tror att förändring blir hållbar när den också gör livet bättre. Att cykla ger motion, att laga mat hemma ger bättre mat - miljönyttan blir då en bonus i stället för ett offer.",
    vi: "Với tôi, lối sống thân thiện môi trường nghĩa là chọn lựa hợp lý thường xuyên, chứ không phải hoàn hảo thi thoảng.\n\nĐiều tôi đổi đầu tiên là đi lại. Tôi bán ô tô hai năm trước và dùng xe đạp cùng tàu ngoại ô; mất thêm 10 phút nhưng tiết kiệm tiền. Thứ hai là năng lượng trong nhà: chúng tôi hạ nhiệt độ xuống 20 độ và đổi sang đèn LED.\n\nKhó nhất là tiêu dùng. Quảng cáo ở khắp nơi và mua mới thì rẻ, trong khi sửa chữa thường đắt hơn món đồ. Chỗ này cần quyết định chính trị, ví dụ giảm thuế VAT cho dịch vụ sửa chữa.\n\nTôi tin thay đổi chỉ bền khi nó cũng làm cuộc sống tốt hơn. Đạp xe thì khỏe, nấu ăn ở nhà thì ngon hơn - lợi ích môi trường khi đó là phần thưởng chứ không phải hy sinh.",
    bandNote: "B1: 'medan' đối lập, danh động từ 'Att cykla ger...' và đề xuất chính sách cụ thể.",
  },
  "s-b1-storstad-vs-landsbygd": {
    sv: "Att bo i storstad eller på landsbygden är en fråga om vad man prioriterar i olika faser av livet.\n\nStaden erbjuder arbete, utbildning och kultur. När jag flyttade till Stockholm kunde jag byta jobb utan att byta bostad, och det finns bibliotek, sjukvård och tunnelbana inom tio minuter. Priset är höga hyror, trängsel och ett tempo som sliter.\n\nLandsbygden ger utrymme, lugn och närhet till naturen. Min moster bor utanför Falun och betalar hälften så mycket för ett hus med trädgård. Samtidigt är hon beroende av bil, och skolan och vårdcentralen ligger tre mil bort.\n\nJag bor i staden nu eftersom min karriär kräver det, men jag kan mycket väl tänka mig att flytta ut när barnen är små. Det viktigaste är att valet blir mitt eget och inte något jag tvingas till av bostadspriserna.",
    vi: "Sống ở thành phố lớn hay nông thôn là chuyện ưu tiên điều gì ở từng giai đoạn cuộc đời.\n\nThành phố cho việc làm, học hành và văn hóa. Khi chuyển đến Stockholm, tôi đổi việc mà không phải đổi nhà, và thư viện, y tế, tàu điện đều trong vòng 10 phút. Cái giá là tiền thuê cao, chen chúc và nhịp sống bào mòn.\n\nNông thôn cho không gian, sự yên tĩnh và gần thiên nhiên. Dì tôi sống ngoài Falun, trả một nửa số tiền cho một căn nhà có vườn. Nhưng dì phụ thuộc vào ô tô, trường học và trạm y tế cách 30 km.\n\nGiờ tôi sống ở thành phố vì sự nghiệp đòi hỏi, nhưng hoàn toàn có thể chuyển ra ngoài khi con còn nhỏ. Quan trọng là lựa chọn phải của riêng tôi, chứ không phải bị giá nhà ép buộc.",
    bandNote: "B1: so sánh hai bên cân đối, có ví dụ đời thực, kết bằng lập trường cá nhân có điều kiện.",
  },
};
