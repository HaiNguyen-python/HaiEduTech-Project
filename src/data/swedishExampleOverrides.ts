/**
 * @file swedishExampleOverrides.ts
 * @description Hand-curated, natural A1 example sentences for the most common
 *              Swedish vocabulary. Keyed by the Swedish headword (lowercase,
 *              trimmed). Any entry found here overrides the auto-generated
 *              template in `swedishExampleNormalizer.ts`, so learners always
 *              see a grammatically and semantically natural sentence for the
 *              frequent A1 vocabulary they encounter most often.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SwedishExampleOverride = {
  sv: string;
  vi: string;
  en: string;
};

/**
 * Lookup table of hand-written examples for common A1 Swedish words.
 * Key = headword (lowercase, trimmed Swedish form).
 */
export const SWEDISH_EXAMPLE_OVERRIDES: Record<string, SwedishExampleOverride> = {
  // ─────────────── COMMON A1 VERBS ───────────────
  arbeta:        { sv: "Jag arbetar på ett kontor i Stockholm.",            vi: "Tôi làm việc tại một văn phòng ở Stockholm.",        en: "I work at an office in Stockholm." },
  jobba:         { sv: "Hon jobbar som lärare på en skola.",                vi: "Cô ấy làm giáo viên ở một trường học.",              en: "She works as a teacher at a school." },
  bada:          { sv: "På sommaren badar vi i sjön.",                      vi: "Vào mùa hè chúng tôi tắm ở hồ.",                     en: "In summer we swim in the lake." },
  behöva:        { sv: "Jag behöver en kopp kaffe nu.",                     vi: "Tôi cần một tách cà phê bây giờ.",                   en: "I need a cup of coffee now." },
  berätta:       { sv: "Han berättar en rolig historia för barnen.",        vi: "Anh ấy kể một câu chuyện vui cho lũ trẻ.",            en: "He tells the children a funny story." },
  besöka:        { sv: "Vi besöker mormor på söndag.",                      vi: "Chúng tôi đi thăm bà ngoại vào chủ nhật.",            en: "We visit grandma on Sunday." },
  betala:        { sv: "Jag betalar räkningen med kort.",                   vi: "Tôi trả hoá đơn bằng thẻ.",                          en: "I pay the bill with a card." },
  bli:           { sv: "Hon vill bli läkare i framtiden.",                  vi: "Cô ấy muốn trở thành bác sĩ trong tương lai.",        en: "She wants to become a doctor in the future." },
  blåsa:         { sv: "Det blåser mycket vid havet idag.",                 vi: "Hôm nay gió thổi mạnh ở biển.",                       en: "It is very windy by the sea today." },
  boka:          { sv: "Jag bokar ett bord på restaurangen.",               vi: "Tôi đặt một bàn ở nhà hàng.",                         en: "I book a table at the restaurant." },
  bo:            { sv: "Jag bor i en lägenhet i Göteborg.",                 vi: "Tôi sống trong một căn hộ ở Göteborg.",               en: "I live in an apartment in Gothenburg." },
  bära:          { sv: "Kan du bära min väska, tack?",                      vi: "Bạn có thể xách túi giúp tôi không?",                 en: "Can you carry my bag, please?" },
  börja:         { sv: "Lektionen börjar klockan nio.",                     vi: "Tiết học bắt đầu lúc chín giờ.",                      en: "The lesson starts at nine o'clock." },
  "borsta tänderna": { sv: "Jag borstar tänderna varje morgon.",            vi: "Tôi đánh răng mỗi sáng.",                            en: "I brush my teeth every morning." },
  cykla:         { sv: "Jag cyklar till skolan varje dag.",                 vi: "Tôi đạp xe đến trường mỗi ngày.",                     en: "I cycle to school every day." },
  dansa:         { sv: "Vi dansar på festen i kväll.",                      vi: "Chúng tôi nhảy ở bữa tiệc tối nay.",                  en: "We are dancing at the party tonight." },
  diska:         { sv: "Han diskar efter middagen.",                        vi: "Anh ấy rửa bát sau bữa tối.",                         en: "He does the dishes after dinner." },
  dra:           { sv: "Hon drar dörren öppen.",                            vi: "Cô ấy kéo cửa mở ra.",                                en: "She pulls the door open." },
  dricka:        { sv: "Jag dricker te på morgonen.",                       vi: "Tôi uống trà vào buổi sáng.",                         en: "I drink tea in the morning." },
  duscha:        { sv: "Jag duschar innan jag går till jobbet.",            vi: "Tôi tắm trước khi đi làm.",                           en: "I shower before going to work." },
  flyga:         { sv: "Vi flyger till Spanien på semestern.",              vi: "Chúng tôi bay sang Tây Ban Nha vào kỳ nghỉ.",         en: "We are flying to Spain for the holiday." },
  flytta:        { sv: "De flyttar till en ny lägenhet i juni.",            vi: "Họ chuyển đến căn hộ mới vào tháng sáu.",             en: "They are moving to a new apartment in June." },
  fråga:         { sv: "Eleven frågar läraren om läxan.",                   vi: "Học sinh hỏi giáo viên về bài tập.",                  en: "The student asks the teacher about the homework." },
  fånga:         { sv: "Hunden fångar bollen i luften.",                    vi: "Con chó bắt quả bóng trên không.",                    en: "The dog catches the ball in the air." },
  följa:         { sv: "Snälla följ mig till receptionen.",                 vi: "Làm ơn đi theo tôi đến quầy lễ tân.",                 en: "Please follow me to the reception." },
  förstå:        { sv: "Jag förstår inte den här frågan.",                  vi: "Tôi không hiểu câu hỏi này.",                         en: "I do not understand this question." },
  försöka:       { sv: "Hon försöker prata svenska varje dag.",             vi: "Cô ấy cố gắng nói tiếng Thụy Điển mỗi ngày.",          en: "She tries to speak Swedish every day." },
  ge:            { sv: "Kan du ge mig saltet, tack?",                       vi: "Bạn có thể đưa muối cho tôi không?",                  en: "Can you give me the salt, please?" },
  glömma:        { sv: "Jag glömmer alltid mitt paraply.",                  vi: "Tôi luôn quên cây dù của mình.",                      en: "I always forget my umbrella." },
  "gå hem":      { sv: "Vi går hem efter middagen.",                        vi: "Chúng tôi về nhà sau bữa tối.",                       en: "We go home after dinner." },
  "gå och lägga sig": { sv: "Barnen går och lägger sig klockan åtta.",      vi: "Bọn trẻ đi ngủ lúc tám giờ.",                         en: "The children go to bed at eight." },
  "gå till jobbet": { sv: "Jag går till jobbet klockan sju.",               vi: "Tôi đi làm lúc bảy giờ.",                             en: "I go to work at seven o'clock." },
  "gå upp":      { sv: "Jag går upp tidigt på morgonen.",                   vi: "Tôi dậy sớm vào buổi sáng.",                          en: "I get up early in the morning." },
  gå:            { sv: "Vi går till parken efter skolan.",                  vi: "Chúng tôi đi đến công viên sau giờ học.",             en: "We walk to the park after school." },
  göra:          { sv: "Vad gör du på fritiden?",                           vi: "Bạn làm gì vào lúc rảnh?",                            en: "What do you do in your free time?" },
  handla:        { sv: "Hon handlar mat på lördagar.",                      vi: "Cô ấy đi chợ vào thứ bảy.",                           en: "She shops for food on Saturdays." },
  ha:            { sv: "Jag har två syskon och en katt.",                   vi: "Tôi có hai anh chị em và một con mèo.",               en: "I have two siblings and a cat." },
  hitta:         { sv: "Jag kan inte hitta mina nycklar.",                  vi: "Tôi không tìm thấy chìa khoá của mình.",              en: "I cannot find my keys." },
  hjälpa:        { sv: "Kan du hjälpa mig med läxan?",                      vi: "Bạn có thể giúp tôi làm bài tập không?",              en: "Can you help me with the homework?" },
  hoppa:         { sv: "Barnen hoppar i parken.",                           vi: "Bọn trẻ nhảy trong công viên.",                       en: "The children jump in the park." },
  hälsa:         { sv: "Jag hälsar på grannarna varje morgon.",             vi: "Tôi chào hàng xóm mỗi sáng.",                         en: "I greet the neighbours every morning." },
  hämta:         { sv: "Pappa hämtar mig efter skolan.",                    vi: "Bố đón tôi sau giờ học.",                             en: "Dad picks me up after school." },
  höra:          { sv: "Jag hör musik från grannens lägenhet.",             vi: "Tôi nghe thấy nhạc từ căn hộ hàng xóm.",              en: "I hear music from the neighbour's flat." },
  kalla:         { sv: "Vänner kallar mig Anna.",                           vi: "Bạn bè gọi tôi là Anna.",                             en: "Friends call me Anna." },
  kasta:         { sv: "Kasta bollen till mig!",                            vi: "Ném quả bóng cho tôi đi!",                            en: "Throw the ball to me!" },
  "kamma håret": { sv: "Hon kammar håret framför spegeln.",                 vi: "Cô ấy chải tóc trước gương.",                         en: "She combs her hair in front of the mirror." },
  "klä på sig":  { sv: "Barnet klär på sig själv på morgonen.",             vi: "Đứa trẻ tự mặc đồ vào buổi sáng.",                    en: "The child gets dressed by themselves in the morning." },
  "kolla på":    { sv: "Vi kollar på en film i kväll.",                     vi: "Tối nay chúng tôi xem một bộ phim.",                  en: "We are watching a movie tonight." },
  komma:         { sv: "Tåget kommer klockan tre.",                         vi: "Tàu đến lúc ba giờ.",                                 en: "The train arrives at three o'clock." },
  krama:         { sv: "Mamma kramar mig varje morgon.",                    vi: "Mẹ ôm tôi mỗi sáng.",                                 en: "Mum hugs me every morning." },
  kunna:         { sv: "Jag kan prata lite svenska.",                       vi: "Tôi có thể nói một chút tiếng Thụy Điển.",            en: "I can speak a little Swedish." },
  känna:         { sv: "Jag känner mig glad idag.",                         vi: "Hôm nay tôi cảm thấy vui.",                           en: "I feel happy today." },
  köpa:          { sv: "Hon köper bröd i affären.",                         vi: "Cô ấy mua bánh mì ở cửa hàng.",                       en: "She buys bread at the shop." },
  köra:          { sv: "Pappa kör bil till jobbet.",                        vi: "Bố lái xe đi làm.",                                   en: "Dad drives to work." },
  "laga mat":    { sv: "Vi lagar mat tillsammans på söndagar.",             vi: "Chủ nhật chúng tôi nấu ăn cùng nhau.",                en: "We cook together on Sundays." },
  leka:          { sv: "Barnen leker i trädgården.",                        vi: "Bọn trẻ chơi trong vườn.",                            en: "The children are playing in the garden." },
  leva:          { sv: "Min farmor lever ett lugnt liv på landet.",         vi: "Bà nội tôi sống cuộc sống yên bình ở vùng quê.",       en: "My grandma lives a quiet life in the countryside." },
  le:            { sv: "Hon ler när hon ser sin hund.",                     vi: "Cô ấy mỉm cười khi thấy chú chó của mình.",           en: "She smiles when she sees her dog." },
  "lyssna på":   { sv: "Jag lyssnar på musik i bussen.",                    vi: "Tôi nghe nhạc trên xe buýt.",                         en: "I listen to music on the bus." },
  lyssna:        { sv: "Lyssna noga på läraren!",                           vi: "Hãy nghe giáo viên cẩn thận!",                        en: "Listen carefully to the teacher!" },
  lägga:         { sv: "Jag lägger boken på bordet.",                       vi: "Tôi đặt quyển sách lên bàn.",                         en: "I put the book on the table." },
  lämna:         { sv: "Vi lämnar huset klockan åtta.",                     vi: "Chúng tôi rời nhà lúc tám giờ.",                      en: "We leave the house at eight o'clock." },
  "lära sig":    { sv: "Jag lär mig svenska på en kurs.",                   vi: "Tôi đang học tiếng Thụy Điển trong một khoá.",         en: "I am learning Swedish in a course." },
  läsa:          { sv: "Hon läser en bok varje kväll.",                     vi: "Cô ấy đọc một quyển sách mỗi tối.",                   en: "She reads a book every evening." },
  måste:         { sv: "Jag måste gå nu, hej då!",                          vi: "Tôi phải đi bây giờ, tạm biệt!",                       en: "I must go now, bye!" },
  möta:          { sv: "Vi möter vänner på kaféet.",                        vi: "Chúng tôi gặp bạn bè ở quán cà phê.",                  en: "We meet friends at the café." },
  plugga:        { sv: "Jag pluggar svenska på biblioteket.",               vi: "Tôi học tiếng Thụy Điển ở thư viện.",                  en: "I study Swedish at the library." },
  prata:         { sv: "Vi pratar svenska hemma.",                          vi: "Chúng tôi nói tiếng Thụy Điển ở nhà.",                en: "We speak Swedish at home." },
  pussa:         { sv: "Mamma pussar barnet på pannan.",                    vi: "Mẹ hôn lên trán đứa bé.",                             en: "Mum kisses the child on the forehead." },
  putta:         { sv: "Snälla, putta inte!",                               vi: "Làm ơn, đừng đẩy!",                                   en: "Please, do not push!" },
  regna:         { sv: "Det regnar mycket idag.",                           vi: "Hôm nay trời mưa nhiều.",                             en: "It is raining a lot today." },
  resa:          { sv: "Vi reser till Norge i sommar.",                     vi: "Mùa hè chúng tôi đi Na Uy du lịch.",                  en: "We are travelling to Norway this summer." },
  "ringa familjen": { sv: "Jag ringer familjen varje söndag.",              vi: "Tôi gọi cho gia đình mỗi chủ nhật.",                   en: "I call my family every Sunday." },
  ringa:         { sv: "Kan du ringa mig senare?",                          vi: "Bạn có thể gọi cho tôi sau không?",                    en: "Can you call me later?" },
  rita:          { sv: "Barnet ritar en sol och ett hus.",                  vi: "Đứa bé vẽ mặt trời và ngôi nhà.",                      en: "The child draws a sun and a house." },
  räkna:         { sv: "Jag räknar till tio på svenska.",                   vi: "Tôi đếm đến mười bằng tiếng Thụy Điển.",                en: "I count to ten in Swedish." },
  se:            { sv: "Jag ser en fågel i trädet.",                        vi: "Tôi thấy một con chim trên cây.",                      en: "I see a bird in the tree." },
  simma:         { sv: "Hon simmar snabbt i poolen.",                       vi: "Cô ấy bơi nhanh trong bể bơi.",                       en: "She swims fast in the pool." },
  sjunga:        { sv: "Vi sjunger en sång på svenska.",                    vi: "Chúng tôi hát một bài hát bằng tiếng Thụy Điển.",      en: "We sing a song in Swedish." },
  skicka:        { sv: "Jag skickar ett brev till min vän.",                vi: "Tôi gửi một lá thư cho bạn.",                          en: "I send a letter to my friend." },
  skina:         { sv: "Solen skiner på himlen.",                           vi: "Mặt trời chiếu sáng trên bầu trời.",                   en: "The sun is shining in the sky." },
  skratta:       { sv: "Barnen skrattar åt skämtet.",                       vi: "Bọn trẻ cười vì câu chuyện hài.",                      en: "The children laugh at the joke." },
  "skriva ner":  { sv: "Skriv ner det nya ordet i häftet.",                 vi: "Hãy ghi từ mới vào vở.",                              en: "Write the new word down in the notebook." },
  skriva:        { sv: "Hon skriver ett mejl till chefen.",                 vi: "Cô ấy viết một email cho sếp.",                       en: "She writes an email to the boss." },
  sluta:         { sv: "Filmen slutar klockan tio.",                        vi: "Bộ phim kết thúc lúc mười giờ.",                       en: "The movie ends at ten o'clock." },
  snöa:          { sv: "Det snöar mycket i januari.",                       vi: "Tháng một tuyết rơi rất nhiều.",                       en: "It snows a lot in January." },
  sova:          { sv: "Barnet sover redan.",                               vi: "Đứa bé đã ngủ rồi.",                                  en: "The child is already sleeping." },
  spara:         { sv: "Jag sparar pengar varje månad.",                    vi: "Tôi tiết kiệm tiền mỗi tháng.",                        en: "I save money every month." },
  spela:         { sv: "Han spelar fotboll efter skolan.",                  vi: "Anh ấy chơi bóng đá sau giờ học.",                     en: "He plays football after school." },
  springa:       { sv: "Jag springer i parken på morgonen.",                vi: "Tôi chạy trong công viên vào buổi sáng.",              en: "I run in the park in the morning." },
  städa:         { sv: "Vi städar lägenheten på lördag.",                   vi: "Chúng tôi dọn căn hộ vào thứ bảy.",                    en: "We clean the apartment on Saturday." },
  stänga:        { sv: "Kan du stänga dörren, tack?",                       vi: "Bạn có thể đóng cửa giúp được không?",                 en: "Can you close the door, please?" },
  säga:          { sv: "Hur säger man 'hello' på svenska?",                 vi: "Nói 'hello' bằng tiếng Thụy Điển thế nào?",            en: "How do you say 'hello' in Swedish?" },
  sätta:         { sv: "Jag sätter glaset på bordet.",                      vi: "Tôi đặt cái ly lên bàn.",                              en: "I put the glass on the table." },
  ta:            { sv: "Jag tar bussen till jobbet.",                       vi: "Tôi đi xe buýt đến chỗ làm.",                          en: "I take the bus to work." },
  tala:          { sv: "Hon talar tre språk flytande.",                     vi: "Cô ấy nói thành thạo ba thứ tiếng.",                   en: "She speaks three languages fluently." },
  titta:         { sv: "Vi tittar på TV på kvällen.",                       vi: "Buổi tối chúng tôi xem TV.",                          en: "We watch TV in the evening." },
  träffa:        { sv: "Jag träffar mina vänner på fredag.",                vi: "Tôi gặp bạn bè vào thứ sáu.",                          en: "I meet my friends on Friday." },
  tycka:         { sv: "Jag tycker om kaffe på morgonen.",                  vi: "Tôi thích cà phê vào buổi sáng.",                     en: "I like coffee in the morning." },
  tänka:         { sv: "Jag tänker på min familj.",                         vi: "Tôi nghĩ về gia đình mình.",                          en: "I think about my family." },
  vakna:         { sv: "Jag vaknar klockan sex på morgonen.",               vi: "Tôi thức dậy lúc sáu giờ sáng.",                       en: "I wake up at six o'clock in the morning." },
  vara:          { sv: "Jag är från Vietnam.",                              vi: "Tôi đến từ Việt Nam.",                                en: "I am from Vietnam." },
  veta:          { sv: "Jag vet inte var stationen ligger.",                vi: "Tôi không biết ga ở đâu.",                            en: "I do not know where the station is." },
  vilja:         { sv: "Jag vill ha en kopp te, tack.",                     vi: "Tôi muốn một tách trà, cảm ơn.",                       en: "I would like a cup of tea, please." },
  visa:          { sv: "Kan du visa mig vägen till hotellet?",              vi: "Bạn có thể chỉ đường đến khách sạn không?",            en: "Can you show me the way to the hotel?" },
  vänta:         { sv: "Vänta lite, jag kommer snart.",                     vi: "Đợi một chút, tôi đến ngay.",                          en: "Wait a moment, I am coming soon." },
  åka:           { sv: "Vi åker till Stockholm i morgon.",                  vi: "Ngày mai chúng tôi đi Stockholm.",                     en: "We are going to Stockholm tomorrow." },
  äta:           { sv: "Vi äter middag klockan sex.",                       vi: "Chúng tôi ăn tối lúc sáu giờ.",                        en: "We eat dinner at six o'clock." },
  öppna:         { sv: "Affären öppnar klockan nio.",                       vi: "Cửa hàng mở cửa lúc chín giờ.",                        en: "The shop opens at nine o'clock." },
  önska:         { sv: "Jag önskar dig en trevlig dag.",                    vi: "Chúc bạn một ngày vui vẻ.",                            en: "I wish you a nice day." },

  // ─────────────── COMMON A1 NOUNS (often miscategorised) ───────────────
  bank:          { sv: "Jag går till banken för att hämta pengar.",         vi: "Tôi đến ngân hàng để rút tiền.",                       en: "I go to the bank to withdraw money." },
  pengar:        { sv: "Jag har inte mycket pengar i plånboken.",           vi: "Tôi không có nhiều tiền trong ví.",                    en: "I do not have much money in my wallet." },
  euro:          { sv: "En kaffe kostar tre euro.",                         vi: "Một cốc cà phê có giá ba euro.",                       en: "A coffee costs three euros." },
  dollar:        { sv: "Boken kostar tio dollar.",                          vi: "Quyển sách giá mười đô la.",                          en: "The book costs ten dollars." },
  krona:         { sv: "Glassen kostar tjugo kronor.",                      vi: "Cây kem giá hai mươi krona.",                          en: "The ice cream costs twenty kronor." },
  jobb:          { sv: "Hennes nya jobb är på ett sjukhus.",                vi: "Công việc mới của cô ấy ở một bệnh viện.",             en: "Her new job is at a hospital." },
  arbete:        { sv: "Mitt arbete börjar klockan nio.",                   vi: "Công việc của tôi bắt đầu lúc chín giờ.",              en: "My work starts at nine o'clock." },
  kontor:        { sv: "Vårt kontor ligger i centrum.",                     vi: "Văn phòng của chúng tôi nằm ở trung tâm.",             en: "Our office is in the city centre." },
  läkare:        { sv: "Min syster är läkare på sjukhuset.",                vi: "Chị tôi là bác sĩ ở bệnh viện.",                       en: "My sister is a doctor at the hospital." },
  lärare:        { sv: "Vår lärare är väldigt snäll.",                      vi: "Giáo viên của chúng tôi rất tử tế.",                   en: "Our teacher is very kind." },
  polis:         { sv: "Polisen hjälper turisten på gatan.",                vi: "Cảnh sát giúp khách du lịch trên phố.",                en: "The police officer helps the tourist on the street." },
  student:       { sv: "Han är student vid Uppsala universitet.",           vi: "Anh ấy là sinh viên Đại học Uppsala.",                 en: "He is a student at Uppsala University." },
  biblioteket:   { sv: "Jag lånar böcker på biblioteket.",                  vi: "Tôi mượn sách ở thư viện.",                            en: "I borrow books at the library." },
  brev:          { sv: "Jag skriver ett brev till min mormor.",             vi: "Tôi viết một lá thư cho bà ngoại.",                    en: "I write a letter to my grandma." },
  // 'fråga' as a noun is handled together with the verb override above.

  // ─────────────── PLURAL-ONLY CLOTHING (no "en/ett" article) ───────────────
  byxor:         { sv: "Jag köper nya byxor i affären.",                    vi: "Tôi mua quần mới ở cửa hàng.",                         en: "I am buying new trousers at the shop." },
  jeans:         { sv: "Hon har blå jeans på sig idag.",                    vi: "Hôm nay cô ấy mặc quần jean xanh.",                    en: "She is wearing blue jeans today." },
  glasögon:      { sv: "Jag behöver mina glasögon för att läsa.",           vi: "Tôi cần kính để đọc.",                                 en: "I need my glasses to read." },
  handskar:      { sv: "På vintern har jag varma handskar på mig.",         vi: "Mùa đông tôi đeo găng tay ấm.",                        en: "In winter I wear warm gloves." },
  strumpor:      { sv: "Han tar på sig rena strumpor på morgonen.",         vi: "Anh ấy đi tất sạch vào buổi sáng.",                    en: "He puts on clean socks in the morning." },
  skor:          { sv: "Mina nya skor är bekväma.",                         vi: "Đôi giày mới của tôi rất thoải mái.",                  en: "My new shoes are comfortable." },
  kläder:        { sv: "Vi köper kläder till barnen på lördag.",            vi: "Chúng tôi mua quần áo cho bọn trẻ vào thứ bảy.",       en: "We are buying clothes for the children on Saturday." },
  shorts:        { sv: "På sommaren har jag shorts och t-shirt.",           vi: "Mùa hè tôi mặc quần short và áo phông.",               en: "In summer I wear shorts and a T-shirt." },

  // ─────────────── COMMON A1 ADJECTIVES ───────────────
  gammal:        { sv: "Min farfar är väldigt gammal men pigg.",            vi: "Ông nội tôi rất già nhưng khoẻ.",                      en: "My grandpa is very old but healthy." },
  ung:           { sv: "Hon är fortfarande ung och nyfiken.",               vi: "Cô ấy vẫn còn trẻ và tò mò.",                          en: "She is still young and curious." },
  ny:            { sv: "Jag har köpt en ny telefon.",                       vi: "Tôi vừa mua một chiếc điện thoại mới.",                en: "I have bought a new phone." },
  stor:          { sv: "De bor i ett stort hus utanför stan.",              vi: "Họ sống trong một ngôi nhà lớn ngoài thành phố.",       en: "They live in a big house outside the city." },
  liten:         { sv: "Jag har en liten katt hemma.",                      vi: "Tôi có một con mèo nhỏ ở nhà.",                        en: "I have a small cat at home." },
  vacker:        { sv: "Stockholm är en vacker stad om sommaren.",          vi: "Stockholm là một thành phố đẹp vào mùa hè.",            en: "Stockholm is a beautiful city in summer." },
  ful:           { sv: "Vädret är riktigt fult idag.",                      vi: "Hôm nay thời tiết thật xấu.",                          en: "The weather is really ugly today." },
  rolig:         { sv: "Filmen vi såg i går var väldigt rolig.",            vi: "Bộ phim chúng tôi xem hôm qua rất vui.",                en: "The movie we watched yesterday was very funny." },
  tråkig:        { sv: "Boken är lite tråkig efter första kapitlet.",       vi: "Quyển sách hơi chán sau chương đầu.",                   en: "The book is a bit boring after the first chapter." },
  snäll:         { sv: "Vår granne är alltid snäll mot barnen.",            vi: "Hàng xóm luôn tử tế với bọn trẻ.",                     en: "Our neighbour is always kind to the children." },
  billig:        { sv: "Kaffet på det här kaféet är väldigt billigt.",      vi: "Cà phê ở quán này rất rẻ.",                            en: "The coffee at this café is very cheap." },
  dyr:           { sv: "Biobiljetter är ganska dyra i Stockholm.",          vi: "Vé xem phim khá đắt ở Stockholm.",                     en: "Cinema tickets are quite expensive in Stockholm." },
  glad:          { sv: "Jag är glad över att träffa dig igen.",             vi: "Tôi vui vì được gặp lại bạn.",                          en: "I am happy to see you again." },
  ledsen:        { sv: "Hon är ledsen för att hunden är sjuk.",             vi: "Cô ấy buồn vì con chó bị ốm.",                          en: "She is sad because the dog is ill." },
  trött:         { sv: "Jag är trött efter en lång arbetsdag.",             vi: "Tôi mệt sau một ngày làm việc dài.",                    en: "I am tired after a long workday." },
  sjuk:          { sv: "Mitt barn är sjukt och stannar hemma idag.",        vi: "Con tôi bị ốm và ở nhà hôm nay.",                       en: "My child is sick and stays home today." },
  frisk:         { sv: "Efter en veckas vila är han frisk igen.",           vi: "Sau một tuần nghỉ ngơi anh ấy đã khỏe lại.",            en: "After a week of rest he is healthy again." },
  varm:          { sv: "Kaffet är fortfarande varmt.",                      vi: "Cà phê vẫn còn ấm.",                                    en: "The coffee is still warm." },
  kall:          { sv: "Vintern i Sverige är väldigt kall.",                vi: "Mùa đông ở Thụy Điển rất lạnh.",                        en: "The winter in Sweden is very cold." },
  bra:           { sv: "Middagen smakade riktigt bra.",                     vi: "Bữa tối thật sự rất ngon.",                             en: "The dinner tasted really good." },
  dålig:         { sv: "Jag mår lite dåligt idag.",                         vi: "Hôm nay tôi thấy hơi mệt.",                             en: "I feel a bit unwell today." },
  intressant:    { sv: "Föreläsningen var mycket intressant.",              vi: "Bài giảng rất thú vị.",                                 en: "The lecture was very interesting." },
  viktig:        { sv: "Sömn är viktigt för hälsan.",                       vi: "Giấc ngủ rất quan trọng cho sức khỏe.",                 en: "Sleep is important for health." },
  svår:          { sv: "Svensk uttal är svårt i början.",                   vi: "Phát âm tiếng Thụy Điển khó lúc đầu.",                  en: "Swedish pronunciation is difficult at first." },
  lätt:          { sv: "Läxan idag är ganska lätt.",                        vi: "Bài tập hôm nay khá dễ.",                               en: "Today's homework is quite easy." },
  snabb:         { sv: "Tåget till Malmö är snabbt.",                       vi: "Tàu đi Malmö rất nhanh.",                               en: "The train to Malmö is fast." },
  långsam:       { sv: "Bussen är långsam i rusningstrafiken.",             vi: "Xe buýt chậm vào giờ cao điểm.",                        en: "The bus is slow during rush hour." },

  // ─────────────── COMMON A1 MODAL / ABSTRACT VERBS ───────────────
  historia:      { sv: "Jag läser om Sveriges historia på biblioteket.",    vi: "Tôi đọc về lịch sử Thụy Điển ở thư viện.",              en: "I read about Sweden's history at the library." },

  // ─────────────── WEATHER ───────────────
  regn:          { sv: "Ta med paraply, det kommer regn idag.",             vi: "Nhớ mang ô, hôm nay sẽ có mưa.",                        en: "Bring an umbrella, there will be rain today." },
  snö:           { sv: "Barnen leker i snön hela dagen.",                   vi: "Bọn trẻ chơi trong tuyết cả ngày.",                     en: "The children play in the snow all day." },
  sol:           { sv: "Solen skiner starkt på himlen.",                    vi: "Mặt trời chiếu sáng rực trên bầu trời.",                en: "The sun shines brightly in the sky." },
  moln:          { sv: "Det finns många moln på himlen idag.",              vi: "Hôm nay trên trời có nhiều mây.",                       en: "There are many clouds in the sky today." },
  vind:          { sv: "En kall vind blåser från norr.",                    vi: "Một cơn gió lạnh thổi từ phía bắc.",                    en: "A cold wind is blowing from the north." },
  åska:          { sv: "På sommaren har vi ofta åska på kvällen.",          vi: "Mùa hè chúng tôi thường có sấm sét vào buổi tối.",      en: "In summer we often have thunder in the evening." },

  // ─────────────── FOOD ───────────────
  bröd:          { sv: "Jag köper färskt bröd på morgonen.",                vi: "Tôi mua bánh mì tươi vào buổi sáng.",                   en: "I buy fresh bread in the morning." },
  smör:          { sv: "Kan du räcka mig smöret, tack?",                    vi: "Bạn đưa giúp tôi lọ bơ được không?",                    en: "Can you pass me the butter, please?" },
  ost:           { sv: "Vi äter ost och bröd till frukost.",                vi: "Chúng tôi ăn phô mai với bánh mì vào bữa sáng.",         en: "We eat cheese and bread for breakfast." },
  mjölk:         { sv: "Jag dricker ett glas mjölk varje kväll.",           vi: "Tôi uống một ly sữa mỗi tối.",                          en: "I drink a glass of milk every evening." },
  kaffe:         { sv: "En kopp kaffe på morgonen väcker mig.",             vi: "Một ly cà phê buổi sáng giúp tôi tỉnh táo.",            en: "A cup of coffee in the morning wakes me up." },
  te:            { sv: "Jag föredrar te framför kaffe.",                    vi: "Tôi thích trà hơn cà phê.",                             en: "I prefer tea to coffee." },
  vatten:        { sv: "Drick mycket vatten när det är varmt.",             vi: "Uống nhiều nước khi trời nóng.",                        en: "Drink plenty of water when it's hot." },
  äpple:         { sv: "Jag äter ett äpple varje dag efter lunchen.",       vi: "Tôi ăn một quả táo mỗi ngày sau bữa trưa.",             en: "I eat an apple every day after lunch." },
  banan:         { sv: "En banan är en bra mellanmål före träning.",        vi: "Chuối là món ăn nhẹ tốt trước khi tập.",                en: "A banana is a good snack before exercise." },
  kött:          { sv: "Vi äter inte så mycket kött i familjen.",           vi: "Gia đình tôi không ăn nhiều thịt.",                     en: "We don't eat much meat in our family." },
  fisk:          { sv: "På fredagar äter vi ofta fisk.",                    vi: "Thứ Sáu chúng tôi thường ăn cá.",                       en: "On Fridays we often eat fish." },
  soppa:         { sv: "Han lagar en varm soppa till lunch.",               vi: "Anh ấy nấu một tô súp ấm cho bữa trưa.",                en: "He is cooking a warm soup for lunch." },
  ris:           { sv: "Vi äter ris med kyckling och grönsaker.",           vi: "Chúng tôi ăn cơm với gà và rau.",                       en: "We eat rice with chicken and vegetables." },
  potatis:       { sv: "Potatis är en vanlig svensk maträtt.",              vi: "Khoai tây là món phổ biến ở Thụy Điển.",                en: "Potatoes are a common Swedish dish." },

  // ─────────────── BODY (plurals + specific contexts) ───────────────
  hår:           { sv: "Hon har långt, mörkt hår.",                         vi: "Cô ấy có mái tóc đen dài.",                             en: "She has long, dark hair." },
  öga:           { sv: "Barnet har stora blå ögon.",                        vi: "Đứa bé có đôi mắt xanh to.",                            en: "The child has big blue eyes." },
  hand:          { sv: "Tvätta händerna innan du äter.",                    vi: "Rửa tay trước khi ăn.",                                 en: "Wash your hands before eating." },
  fot:           { sv: "Mina fötter gör ont efter promenaden.",             vi: "Chân tôi đau sau khi đi bộ.",                          en: "My feet hurt after the walk." },
  huvud:         { sv: "Jag har huvudvärk och behöver vila.",               vi: "Tôi bị đau đầu và cần nghỉ.",                          en: "I have a headache and need to rest." },
  mage:          { sv: "Barnet har ont i magen.",                           vi: "Đứa bé đau bụng.",                                     en: "The child has a stomach ache." },
  tand:          { sv: "Han borstar tänderna två gånger om dagen.",         vi: "Anh ấy đánh răng hai lần một ngày.",                    en: "He brushes his teeth twice a day." },

  // ─────────────── SEASONS ───────────────
  vår:           { sv: "På våren blommar körsbärsträden.",                  vi: "Vào mùa xuân cây anh đào nở hoa.",                       en: "In spring the cherry trees bloom." },
  sommar:        { sv: "På sommaren badar vi i havet varje dag.",           vi: "Mùa hè chúng tôi tắm biển mỗi ngày.",                    en: "In summer we swim in the sea every day." },
  höst:          { sv: "På hösten faller löven från träden.",               vi: "Vào mùa thu lá rụng khỏi cây.",                          en: "In autumn the leaves fall from the trees." },
  vinter:        { sv: "Vintern i Sverige är lång och mörk.",               vi: "Mùa đông ở Thụy Điển dài và tối.",                      en: "Winter in Sweden is long and dark." },

  // ─────────────── TRANSPORT & DIRECTIONS ───────────────
  bil:           { sv: "Min bil står på parkeringen bakom huset.",          vi: "Xe của tôi đậu ở bãi đỗ sau nhà.",                       en: "My car is in the parking lot behind the house." },
  flygplan:      { sv: "Flygplanet landar om tjugo minuter.",               vi: "Máy bay hạ cánh trong hai mươi phút nữa.",               en: "The plane lands in twenty minutes." },
  gata:          { sv: "Vår gata är väldigt lugn på kvällen.",              vi: "Đường phố chúng tôi rất yên tĩnh vào buổi tối.",         en: "Our street is very quiet in the evening." },
  väg:           { sv: "Vägen till stugan är smal och krokig.",             vi: "Đường đến căn nhà gỗ hẹp và quanh co.",                  en: "The road to the cottage is narrow and winding." },
  station:       { sv: "Vi möts vid stationen klockan sex.",                vi: "Chúng ta gặp nhau ở nhà ga lúc sáu giờ.",                en: "We'll meet at the station at six." },
  hållplats:     { sv: "Bussen stannar vid nästa hållplats.",               vi: "Xe buýt sẽ dừng ở trạm kế tiếp.",                        en: "The bus stops at the next stop." },

  // ─────────────── HOME ───────────────
  hus:           { sv: "Vi bor i ett rött hus på landet.",                  vi: "Chúng tôi sống trong một căn nhà đỏ ở nông thôn.",       en: "We live in a red house in the countryside." },
  lägenhet:      { sv: "Min lägenhet ligger på tredje våningen.",           vi: "Căn hộ của tôi ở tầng ba.",                             en: "My apartment is on the third floor." },
  rum:           { sv: "Mitt rum är litet men mysigt.",                     vi: "Phòng của tôi nhỏ nhưng ấm cúng.",                       en: "My room is small but cozy." },
  kök:           { sv: "Vi lagar mat i köket varje kväll.",                 vi: "Chúng tôi nấu ăn trong bếp mỗi tối.",                    en: "We cook in the kitchen every evening." },
  badrum:        { sv: "Badrummet är precis bredvid sovrummet.",            vi: "Phòng tắm nằm ngay cạnh phòng ngủ.",                     en: "The bathroom is right next to the bedroom." },
  sovrum:        { sv: "Sovrummet har ett stort fönster.",                  vi: "Phòng ngủ có một cửa sổ lớn.",                          en: "The bedroom has a large window." },
  trädgård:      { sv: "På sommaren äter vi middag i trädgården.",          vi: "Mùa hè chúng tôi ăn tối ở trong vườn.",                  en: "In summer we have dinner in the garden." },
  lampa:         { sv: "Kan du tända lampan, det är mörkt.",                vi: "Bạn bật đèn lên đi, trong phòng tối rồi.",               en: "Can you turn on the lamp, it's dark." },

  // ─────────────── WORK ───────────────
  chef:          { sv: "Min chef är väldigt hjälpsam.",                     vi: "Sếp của tôi rất nhiệt tình giúp đỡ.",                    en: "My boss is very helpful." },
  möte:          { sv: "Vi har ett möte klockan tio i morgon.",             vi: "Chúng tôi có một cuộc họp lúc mười giờ ngày mai.",       en: "We have a meeting at ten tomorrow." },
  projekt:       { sv: "Projektet ska vara klart innan jul.",               vi: "Dự án phải hoàn tất trước Giáng sinh.",                  en: "The project must be finished before Christmas." },
  elev:          { sv: "Eleven ställer många frågor på lektionen.",         vi: "Học sinh đặt nhiều câu hỏi trong tiết học.",             en: "The student asks many questions in class." },
  skola:         { sv: "Skolan börjar klockan åtta på morgonen.",           vi: "Trường bắt đầu lúc tám giờ sáng.",                       en: "School starts at eight in the morning." },

};


/** Lookup helper used by the example normalizer. */
export function getSwedishExampleOverride(sv: string): SwedishExampleOverride | undefined {
  const key = (sv || "").toLowerCase().trim();
  return SWEDISH_EXAMPLE_OVERRIDES[key];
}
