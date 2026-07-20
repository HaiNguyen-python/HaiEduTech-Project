/**
 * @file swedishVocabExpansion6.ts
 * @description Sixth-pass Swedish vocabulary expansion: 100+ hand-written A1/A2
 *              words across everyday themes. All example sentences are natural
 *              (no template output) and semantically logical.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SwedishWord, SwedishLevel } from "./swedishVocabBank";

const w = (
  id: string, sv: string, ipa: string, pos: string, vi: string, en: string,
  example: string, exampleVi: string, exampleEn: string,
  level: SwedishLevel, category: string, article?: "en" | "ett"
): SwedishWord => ({ id, sv, ipa, pos, vi, en, example, exampleVi, exampleEn, level, category, article });

export const SWEDISH_WORDS_EXPANSION_6: SwedishWord[] = [
  // ───────── A1 · Food & kitchen ─────────
  w("x6_01","smör","[smøːr]","n.","bơ","butter","Jag brer smör på brödet.","Tôi phết bơ lên bánh mì.","I spread butter on the bread.","A1","food","ett"),
  w("x6_02","sylt","[sylt]","n.","mứt","jam","Barnen älskar jordgubbssylt på pannkakor.","Bọn trẻ mê mứt dâu trên bánh kếp.","The children love strawberry jam on pancakes.","A1","food","en"),
  w("x6_03","honung","[ˈhoːnɵŋ]","n.","mật ong","honey","Jag har honung i teet.","Tôi cho mật ong vào trà.","I put honey in my tea.","A1","food","en"),
  w("x6_04","socker","[ˈsɔkːɛr]","n.","đường","sugar","Vill du ha socker i kaffet?","Bạn có muốn cho đường vào cà phê không?","Do you want sugar in your coffee?","A1","food","ett"),
  w("x6_05","salt","[salt]","n.","muối","salt","Kan du skicka saltet, tack?","Bạn đưa muối cho tôi được không?","Can you pass the salt, please?","A1","food","ett"),
  w("x6_06","peppar","[ˈpɛpːar]","n.","tiêu","pepper","Jag lägger lite peppar på maten.","Tôi rắc chút tiêu lên đồ ăn.","I put a bit of pepper on the food.","A1","food","en"),
  w("x6_07","potatis","[pʊˈtɑːtɪs]","n.","khoai tây","potato","Vi äter kokt potatis till fisken.","Chúng tôi ăn khoai tây luộc với cá.","We eat boiled potato with the fish.","A1","food","en"),
  w("x6_08","ris","[riːs]","n.","gạo/cơm","rice","Ris är basmat i Vietnam.","Cơm là món chính ở Việt Nam.","Rice is a staple food in Vietnam.","A1","food","ett"),
  w("x6_09","nudlar","[ˈnʉːdlar]","n. pl.","mì","noodles","Jag lagar nudlar till lunch.","Tôi nấu mì cho bữa trưa.","I'm making noodles for lunch.","A1","food"),
  w("x6_10","soppa","[ˈsɔpːa]","n.","súp","soup","På vintern äter jag varm soppa varje dag.","Mùa đông tôi ăn súp nóng mỗi ngày.","In winter I eat hot soup every day.","A1","food","en"),
  w("x6_11","sallad","[ˈsalːad]","n.","xà lách","salad","Jag beställer en grön sallad.","Tôi gọi một đĩa xà lách xanh.","I'm ordering a green salad.","A1","food","en"),
  w("x6_12","tomat","[tʊˈmɑːt]","n.","cà chua","tomato","Tomaterna i trädgården är röda nu.","Cà chua trong vườn đã đỏ rồi.","The tomatoes in the garden are red now.","A1","food","en"),
  w("x6_13","gurka","[ˈɡɵrka]","n.","dưa chuột","cucumber","Vi lägger gurka i smörgåsen.","Chúng tôi cho dưa chuột vào bánh mì kẹp.","We put cucumber in the sandwich.","A1","food","en"),
  w("x6_14","morot","[ˈmoːrʊt]","n.","cà rốt","carrot","Kaninen tycker om morötter.","Con thỏ thích cà rốt.","The rabbit likes carrots.","A1","food","en"),
  w("x6_15","lök","[løːk]","n.","hành","onion","Lök gör att jag gråter.","Hành làm tôi chảy nước mắt.","Onions make me cry.","A1","food","en"),
  w("x6_16","kaka","[ˈkɑːka]","n.","bánh ngọt","cake","Farmor bakar en kaka på söndag.","Bà nội nướng bánh vào chủ nhật.","Grandma is baking a cake on Sunday.","A1","food","en"),
  w("x6_17","glass","[ɡlasː]","n.","kem","ice cream","På sommaren äter vi glass varje dag.","Mùa hè chúng tôi ăn kem mỗi ngày.","In summer we eat ice cream every day.","A1","food","en"),
  w("x6_18","choklad","[ʃʊˈklɑːd]","n.","sô-cô-la","chocolate","Hon ger mig en bit choklad.","Cô ấy đưa tôi một miếng sô-cô-la.","She gives me a piece of chocolate.","A1","food","en"),
  w("x6_19","juice","[ˈjuːs]","n.","nước ép","juice","Jag dricker apelsinjuice till frukost.","Tôi uống nước cam vào bữa sáng.","I drink orange juice for breakfast.","A1","food","en"),
  w("x6_20","glas","[ɡlɑːs]","n.","cốc","glass","Kan jag få ett glas vatten?","Cho tôi xin một cốc nước được không?","May I have a glass of water?","A1","food","ett"),

  // ───────── A1 · Home & rooms ─────────
  w("x6_21","tak","[tɑːk]","n.","trần/mái","ceiling/roof","Taket är vitt och nymålat.","Trần nhà màu trắng và mới sơn.","The ceiling is white and freshly painted.","A1","home","ett"),
  w("x6_22","golv","[ɡɔlv]","n.","sàn","floor","Barnen sitter på golvet och leker.","Bọn trẻ ngồi trên sàn chơi.","The children are sitting on the floor playing.","A1","home","ett"),
  w("x6_23","vägg","[vɛɡː]","n.","tường","wall","Vi hänger en tavla på väggen.","Chúng tôi treo bức tranh lên tường.","We hang a picture on the wall.","A1","home","en"),
  w("x6_24","tavla","[ˈtɑːvla]","n.","bức tranh","picture/painting","En färgglad tavla pryder vardagsrummet.","Một bức tranh sặc sỡ trang trí phòng khách.","A colourful painting decorates the living room.","A1","home","en"),
  w("x6_25","hylla","[ˈhylːa]","n.","kệ","shelf","Böckerna står på hyllan.","Sách xếp trên kệ.","The books are on the shelf.","A1","home","en"),
  w("x6_26","garderob","[ˌɡardɛˈroːb]","n.","tủ quần áo","wardrobe","Mina kläder ligger i garderoben.","Quần áo của tôi để trong tủ.","My clothes are in the wardrobe.","A1","home","en"),
  w("x6_27","spegel","[ˈspeːɡɛl]","n.","gương","mirror","Hon tittar sig i spegeln.","Cô ấy soi gương.","She looks at herself in the mirror.","A1","home","en"),
  w("x6_28","handduk","[ˈhandˌdʉːk]","n.","khăn tắm","towel","Ta en ren handduk från badrummet.","Lấy một chiếc khăn sạch trong phòng tắm.","Take a clean towel from the bathroom.","A1","home","en"),
  w("x6_29","tvål","[tvoːl]","n.","xà phòng","soap","Tvätta händerna med tvål och vatten.","Rửa tay bằng xà phòng và nước.","Wash your hands with soap and water.","A1","home","en"),
  w("x6_30","tandborste","[ˈtandˌbɔʂːtɛ]","n.","bàn chải đánh răng","toothbrush","Jag köpte en ny tandborste igår.","Hôm qua tôi mua bàn chải mới.","I bought a new toothbrush yesterday.","A1","home","en"),

  // ───────── A1 · People & body ─────────
  w("x6_31","huvud","[ˈhʉːvɵd]","n.","đầu","head","Jag har ont i huvudet idag.","Hôm nay tôi đau đầu.","I have a headache today.","A1","health","ett"),
  w("x6_32","hår","[hoːr]","n.","tóc","hair","Hennes hår är långt och mörkt.","Tóc cô ấy dài và đen.","Her hair is long and dark.","A1","health","ett"),
  w("x6_33","öga","[ˈøːɡa]","n.","mắt","eye","Barnet har blå ögon.","Đứa bé có đôi mắt xanh.","The child has blue eyes.","A1","health","ett"),
  w("x6_34","öra","[ˈøːra]","n.","tai","ear","Han hör dåligt på ena örat.","Anh ấy nghe kém một bên tai.","He hears poorly in one ear.","A1","health","ett"),
  w("x6_35","näsa","[ˈnɛːsa]","n.","mũi","nose","Jag är förkyld och min näsa rinner.","Tôi bị cảm và chảy nước mũi.","I have a cold and my nose is running.","A1","health","en"),
  w("x6_36","mun","[mɵnː]","n.","miệng","mouth","Öppna munnen, säger tandläkaren.","Nha sĩ bảo há miệng ra.","Open your mouth, says the dentist.","A1","health","en"),
  w("x6_37","tand","[tand]","n.","răng","tooth","Barnet har fått en ny tand.","Đứa bé mọc thêm một chiếc răng.","The child has grown a new tooth.","A1","health","en"),
  w("x6_38","hand","[hand]","n.","tay","hand","Skaka hand när ni möts.","Bắt tay khi gặp nhau nhé.","Shake hands when you meet.","A1","health","en"),
  w("x6_39","fot","[foːt]","n.","chân (bàn chân)","foot","Min högra fot gör ont.","Bàn chân phải của tôi bị đau.","My right foot hurts.","A1","health","en"),
  w("x6_40","ben","[beːn]","n.","chân","leg","Han bröt benet när han åkte skidor.","Anh ấy bị gãy chân khi trượt tuyết.","He broke his leg while skiing.","A1","health","ett"),
  w("x6_41","arm","[arm]","n.","cánh tay","arm","Bebisen sover i mammas arm.","Em bé ngủ trong vòng tay mẹ.","The baby sleeps in mum's arm.","A1","health","en"),
  w("x6_42","finger","[ˈfɪŋːɛr]","n.","ngón tay","finger","Jag skar mig i fingret med kniven.","Tôi bị đứt tay khi cầm dao.","I cut my finger with the knife.","A1","health","ett"),
  w("x6_43","mage","[ˈmɑːɡɛ]","n.","bụng","stomach","Jag har ont i magen efter maten.","Tôi bị đau bụng sau khi ăn.","My stomach hurts after the meal.","A1","health","en"),
  w("x6_44","rygg","[ryɡː]","n.","lưng","back","Efter jobbet har jag ont i ryggen.","Sau giờ làm tôi bị đau lưng.","After work my back hurts.","A1","health","en"),

  // ───────── A1 · Colors & adjectives ─────────
  w("x6_45","röd","[røːd]","adj.","đỏ","red","Bilen är röd och glänsande.","Chiếc xe màu đỏ và bóng loáng.","The car is red and shiny.","A1","shopping"),
  w("x6_46","blå","[bloː]","adj.","xanh dương","blue","Himlen är blå idag.","Hôm nay bầu trời xanh.","The sky is blue today.","A1","shopping"),
  w("x6_47","grön","[ɡrøːn]","adj.","xanh lá","green","Gräset är grönt om sommaren.","Cỏ xanh vào mùa hè.","The grass is green in summer.","A1","shopping"),
  w("x6_48","gul","[ɡʉːl]","adj.","vàng","yellow","Citronen är gul och sur.","Chanh vàng và chua.","The lemon is yellow and sour.","A1","shopping"),
  w("x6_49","svart","[svaʈ]","adj.","đen","black","Han har en svart jacka.","Anh ấy có một chiếc áo khoác đen.","He has a black jacket.","A1","shopping"),
  w("x6_50","vit","[viːt]","adj.","trắng","white","Snön är vit och kall.","Tuyết trắng và lạnh.","The snow is white and cold.","A1","shopping"),
  w("x6_51","stor","[stuːr]","adj.","to","big","Vår trädgård är ganska stor.","Vườn nhà chúng tôi khá rộng.","Our garden is quite big.","A1","home"),
  w("x6_52","liten","[ˈliːtɛn]","adj.","nhỏ","small","Katten är liten men snabb.","Con mèo nhỏ nhưng nhanh.","The cat is small but fast.","A1","home"),
  w("x6_53","varm","[varm]","adj.","ấm","warm","Kaffet är fortfarande varmt.","Cà phê vẫn còn nóng.","The coffee is still warm.","A1","food"),
  w("x6_54","kall","[kalː]","adj.","lạnh","cold","Idag är det riktigt kallt ute.","Hôm nay ngoài trời thật lạnh.","Today it is really cold outside.","A1","environment"),
  w("x6_55","god","[ɡoːd]","adj.","ngon","good/tasty","Maten var väldigt god.","Đồ ăn rất ngon.","The food was very tasty.","A1","food"),
  w("x6_56","tråkig","[ˈtroːkɪɡ]","adj.","chán","boring","Filmen var lite tråkig.","Bộ phim hơi chán.","The film was a bit boring.","A2","opinion"),
  w("x6_57","rolig","[ˈruːlɪɡ]","adj.","vui","fun","Vi hade en rolig kväll tillsammans.","Chúng tôi có một buổi tối vui vẻ cùng nhau.","We had a fun evening together.","A1","hobbies"),
  w("x6_58","trött","[trœtː]","adj.","mệt","tired","Efter jobbet är jag alltid trött.","Sau khi làm việc tôi luôn thấy mệt.","After work I am always tired.","A1","health"),
  w("x6_59","glad","[ɡlɑːd]","adj.","vui","happy","Barnen är glada när de får glass.","Bọn trẻ vui khi được ăn kem.","The children are happy when they get ice cream.","A1","opinion"),
  w("x6_60","ledsen","[ˈlɛsːɛn]","adj.","buồn","sad","Hon ser ledsen ut idag.","Hôm nay cô ấy trông buồn.","She looks sad today.","A1","opinion"),

  // ───────── A2 · Everyday life ─────────
  w("x6_61","frimärke","[ˈfriːˌmɛrkɛ]","n.","tem thư","stamp","Jag måste köpa ett frimärke till brevet.","Tôi cần mua tem cho lá thư.","I need to buy a stamp for the letter.","A2","shopping","ett"),
  w("x6_62","paket","[paˈkeːt]","n.","gói/bưu kiện","package","Postbudet lämnade ett paket vid dörren.","Nhân viên bưu điện để một bưu kiện ở cửa.","The postman left a package at the door.","A2","shopping","ett"),
  w("x6_63","kvarter","[kvaʈˈeːr]","n.","dãy nhà/khu phố","block","Han bor bara ett kvarter härifrån.","Anh ấy ở cách đây chỉ một dãy nhà.","He lives just one block from here.","A2","directions","ett"),
  w("x6_64","korsning","[ˈkɔʂːnɪŋ]","n.","ngã tư","intersection","Sväng höger vid nästa korsning.","Rẽ phải ở ngã tư tiếp theo.","Turn right at the next intersection.","A2","directions","en"),
  w("x6_65","övergångsställe","[ˈøːvɛrˌɡoŋsˌstɛlːɛ]","n.","vạch qua đường","crosswalk","Barn ska gå över gatan vid övergångsstället.","Trẻ em nên qua đường ở vạch dành cho người đi bộ.","Children should cross the street at the crosswalk.","A2","directions","ett"),
  w("x6_66","trafikljus","[traˈfiːkˌjʉːs]","n.","đèn giao thông","traffic light","Stanna när trafikljuset är rött.","Dừng lại khi đèn đỏ.","Stop when the traffic light is red.","A2","directions","ett"),
  w("x6_67","parkering","[parˈkeːrɪŋ]","n.","chỗ đỗ xe","parking","Det finns en parkering bakom huset.","Có chỗ đỗ xe phía sau nhà.","There is parking behind the house.","A2","directions","en"),
  w("x6_68","körkort","[ˈɕøːrˌkʊʈ]","n.","bằng lái","driver's licence","Han tog körkort förra året.","Anh ấy thi bằng lái năm ngoái.","He got his driver's licence last year.","A2","directions","ett"),
  w("x6_69","bank","[baŋk]","n.","ngân hàng","bank","Jag går till banken efter jobbet.","Tôi đến ngân hàng sau giờ làm.","I'm going to the bank after work.","A2","shopping","en"),
  w("x6_70","apotek","[apʊˈteːk]","n.","hiệu thuốc","pharmacy","Apoteket stänger klockan sex.","Hiệu thuốc đóng cửa lúc 6 giờ.","The pharmacy closes at six.","A2","health","ett"),
  w("x6_71","sjukhus","[ˈɧʉːkˌhʉːs]","n.","bệnh viện","hospital","Min faster jobbar på sjukhuset.","Cô tôi làm việc ở bệnh viện.","My aunt works at the hospital.","A2","health","ett"),
  w("x6_72","ambulans","[ambʉˈlans]","n.","xe cứu thương","ambulance","Ambulansen kom snabbt till platsen.","Xe cứu thương đến hiện trường nhanh chóng.","The ambulance arrived at the scene quickly.","A2","health","en"),
  w("x6_73","brandkår","[ˈbrandˌkoːr]","n.","đội cứu hoả","fire brigade","Brandkåren släckte elden på tio minuter.","Đội cứu hoả dập tắt lửa trong 10 phút.","The fire brigade put out the fire in ten minutes.","A2","society","en"),
  w("x6_74","polis","[pʊˈliːs]","n.","cảnh sát","police","Polisen står vid korsningen.","Cảnh sát đứng ở ngã tư.","The police officer is at the intersection.","A2","society","en"),

  // ───────── A2 · Weather & nature ─────────
  w("x6_75","åska","[ˈɔska]","n.","sấm sét","thunder","Åskan väckte mig mitt i natten.","Sấm đánh thức tôi giữa đêm.","The thunder woke me up in the middle of the night.","A2","environment","en"),
  w("x6_76","blixt","[blɪkst]","n.","tia chớp","lightning","En blixt lyste upp hela himlen.","Một tia chớp thắp sáng cả bầu trời.","A flash of lightning lit up the whole sky.","A2","environment","en"),
  w("x6_77","dimma","[ˈdɪmːa]","n.","sương mù","fog","På morgonen ligger det dimma över sjön.","Buổi sáng sương mù phủ trên hồ.","In the morning there is fog over the lake.","A2","environment","en"),
  w("x6_78","snöfall","[ˈsnøːˌfalː]","n.","tuyết rơi","snowfall","Ett kraftigt snöfall stängde vägarna.","Đợt tuyết rơi lớn khiến các con đường bị đóng.","A heavy snowfall closed the roads.","A2","environment","ett"),
  w("x6_79","is","[iːs]","n.","băng","ice","Var försiktig, det är is på trottoaren.","Cẩn thận, vỉa hè có băng.","Be careful, there is ice on the pavement.","A2","environment","en"),
  w("x6_80","gräs","[ɡrɛːs]","n.","cỏ","grass","Barnen springer i det gröna gräset.","Bọn trẻ chạy trên cỏ xanh.","The children run on the green grass.","A2","environment","ett"),
  w("x6_81","löv","[løːv]","n.","lá","leaf","På hösten faller alla löv från träden.","Vào mùa thu lá rụng khỏi cây.","In autumn all the leaves fall from the trees.","A2","environment","ett"),
  w("x6_82","gren","[ɡreːn]","n.","cành","branch","En stor gren bröts av i stormen.","Một cành lớn gãy trong cơn bão.","A big branch broke off in the storm.","A2","environment","en"),
  w("x6_83","flod","[fluːd]","n.","sông","river","Floden är bred och lugn här.","Con sông ở đây rộng và êm đềm.","The river is wide and calm here.","A2","environment","en"),
  w("x6_84","sjö","[ɧøː]","n.","hồ","lake","Vi badar i sjön varje sommar.","Chúng tôi tắm hồ mỗi mùa hè.","We swim in the lake every summer.","A2","environment","en"),

  // ───────── A2 · Work, school, technology ─────────
  w("x6_85","kontor","[kʊnˈtuːr]","n.","văn phòng","office","Vårt kontor ligger på tredje våningen.","Văn phòng chúng tôi ở tầng ba.","Our office is on the third floor.","A2","work","ett"),
  w("x6_86","möteslokal","[ˈmøːtɛsˌlʊˈkɑːl]","n.","phòng họp","meeting room","Möteslokalen är bokad hela morgonen.","Phòng họp được đặt suốt buổi sáng.","The meeting room is booked all morning.","A2","work","en"),
  w("x6_87","skrivare","[ˈskriːvarɛ]","n.","máy in","printer","Skrivaren har fastnat igen.","Máy in lại bị kẹt rồi.","The printer is jammed again.","A2","work","en"),
  w("x6_88","tangentbord","[taŋˈɡɛntˌbuːd]","n.","bàn phím","keyboard","Mitt tangentbord är trådlöst.","Bàn phím của tôi không dây.","My keyboard is wireless.","A2","work","ett"),
  w("x6_89","mus","[mʉːs]","n.","chuột (máy tính)","mouse","Datamusen slutade fungera.","Chuột máy tính ngưng hoạt động.","The computer mouse stopped working.","A2","work","en"),
  w("x6_90","skärm","[ɧɛrm]","n.","màn hình","screen","Skärmen är för ljus på kvällen.","Màn hình quá sáng vào buổi tối.","The screen is too bright in the evening.","A2","work","en"),
  w("x6_91","laddare","[ˈladːarɛ]","n.","cục sạc","charger","Har du en laddare jag kan låna?","Bạn có cục sạc cho tôi mượn không?","Do you have a charger I can borrow?","A2","work","en"),
  w("x6_92","mobil","[mʊˈbiːl]","n.","điện thoại","mobile phone","Min mobil är nästan slut på batteri.","Điện thoại của tôi sắp hết pin.","My phone is almost out of battery.","A2","work","en"),
  w("x6_93","internet","[ˈɪntɛrnɛt]","n.","internet","internet","Internetet är långsamt idag.","Internet hôm nay chậm.","The internet is slow today.","A2","work","ett"),
  w("x6_94","lösenord","[ˈløːsɛnˌuːd]","n.","mật khẩu","password","Jag har glömt mitt lösenord igen.","Tôi lại quên mật khẩu.","I've forgotten my password again.","A2","work","ett"),
  w("x6_95","mejl","[mejl]","n.","email","email","Jag skickar ett mejl till chefen.","Tôi gửi email cho sếp.","I'm sending an email to the boss.","A2","work","ett"),
  w("x6_96","kollegial","[kɔleˈɡjɑːl]","adj.","có tinh thần đồng nghiệp","collegial","Stämningen på kontoret är kollegial.","Không khí ở văn phòng đầy tinh thần đồng nghiệp.","The office atmosphere is collegial.","A2","work"),
  w("x6_97","klassrum","[ˈklasːˌrɵmː]","n.","phòng học","classroom","Klassrummet är ljust och stort.","Phòng học sáng sủa và rộng.","The classroom is bright and large.","A2","work","ett"),
  w("x6_98","läxa","[ˈlɛksa]","n.","bài tập về nhà","homework","Jag måste göra läxan innan middagen.","Tôi phải làm bài tập trước bữa tối.","I have to do my homework before dinner.","A2","work","en"),
  w("x6_99","prov","[pruːv]","n.","bài kiểm tra","test/exam","Vi har ett prov i matematik på fredag.","Chúng tôi có bài kiểm tra toán vào thứ Sáu.","We have a maths test on Friday.","A2","work","ett"),
  w("x6_100","betygsskala","[ˈbeˌtyːɡsˌskɑːla]","n.","thang điểm","grading scale","Skolans betygsskala går från A till F.","Thang điểm của trường từ A tới F.","The school's grading scale runs from A to F.","A2","work","en"),

  // ───────── A2 · Time & routines ─────────
  w("x6_101","morgon","[ˈmɔrːɡʊn]","n.","buổi sáng","morning","På morgonen dricker jag alltid kaffe.","Buổi sáng tôi luôn uống cà phê.","In the morning I always drink coffee.","A2","numbers","en"),
  w("x6_102","eftermiddag","[ˈɛftɛrˌmɪdːaɡ]","n.","buổi chiều","afternoon","På eftermiddagen tar vi en promenad.","Buổi chiều chúng tôi đi dạo.","In the afternoon we take a walk.","A2","numbers","en"),
  w("x6_103","kväll","[kvɛlː]","n.","buổi tối","evening","På kvällen ser vi på nyheterna.","Buổi tối chúng tôi xem tin tức.","In the evening we watch the news.","A2","numbers","en"),
  w("x6_104","helg","[hɛlj]","n.","cuối tuần","weekend","I helgen åker vi till landet.","Cuối tuần này chúng tôi về quê.","This weekend we're going to the countryside.","A2","numbers","en"),
  w("x6_105","semesterresa","[sɛˈmɛstɛrˌreːsa]","n.","chuyến du lịch","holiday trip","Vår semesterresa till Grekland var underbar.","Chuyến du lịch Hy Lạp của chúng tôi thật tuyệt.","Our holiday trip to Greece was wonderful.","A2","hobbies","en"),
];
