// Swedish Speaking Coach - expansion 5: everyday A1/A2 themes.
// 8 themes x 10 sentences. Natural Swedish (V2 word order, correct en/ett),
// Vietnamese translations written for Vietnamese learners in the Nordics.
import type { SpeakingTheme } from "./speakingCoachData";

const a1: SpeakingTheme[] = [
  {
    id: "sv-food-basic", name: "Mat & dryck", nameVi: "Đồ ăn & thức uống", icon: "🍽️", level: "A1",
    sentences: [
      { id: "sv-md1", text: "Jag äter frukost klockan sju varje morgon.", translation: "Tôi ăn sáng lúc 7 giờ mỗi buổi sáng.", difficulty: "easy", theme: "food" },
      { id: "sv-md2", text: "Vill du ha kaffe eller te?", translation: "Bạn muốn cà phê hay trà?", difficulty: "easy", theme: "food" },
      { id: "sv-md3", text: "Jag dricker ett glas vatten till maten.", translation: "Tôi uống một cốc nước cùng bữa ăn.", difficulty: "easy", theme: "food" },
      { id: "sv-md4", text: "Min favoritmat är fisk med potatis.", translation: "Món tôi thích nhất là cá với khoai tây.", difficulty: "easy", theme: "food" },
      { id: "sv-md5", text: "Vi köper bröd och mjölk i affären.", translation: "Chúng tôi mua bánh mì và sữa ở cửa hàng.", difficulty: "easy", theme: "food" },
      { id: "sv-md6", text: "Jag lagar middag hemma nästan varje dag.", translation: "Tôi nấu bữa tối ở nhà gần như mỗi ngày.", difficulty: "easy", theme: "food" },
      { id: "sv-md7", text: "Kan jag få lite mer sallad, tack?", translation: "Cho tôi thêm một chút salad nhé?", difficulty: "easy", theme: "food" },
      { id: "sv-md8", text: "Jag äter inte kött, jag är vegetarian.", translation: "Tôi không ăn thịt, tôi ăn chay.", difficulty: "medium", theme: "food" },
      { id: "sv-md9", text: "Soppan är för salt för mig.", translation: "Món súp mặn quá với tôi.", difficulty: "medium", theme: "food" },
      { id: "sv-md10", text: "Vi tar en fika med kanelbulle på eftermiddagen.", translation: "Buổi chiều chúng tôi uống cà phê kèm bánh quế.", difficulty: "medium", theme: "food" },
    ],
  },
  {
    id: "sv-weather-basic", name: "Väder & årstider", nameVi: "Thời tiết & bốn mùa", icon: "🌤️", level: "A1",
    sentences: [
      { id: "sv-wb1", text: "Idag är det kallt och blåsigt.", translation: "Hôm nay trời lạnh và có gió.", difficulty: "easy", theme: "weather" },
      { id: "sv-wb2", text: "På vintern snöar det ofta här.", translation: "Mùa đông ở đây thường có tuyết.", difficulty: "easy", theme: "weather" },
      { id: "sv-wb3", text: "Solen skiner och himlen är blå.", translation: "Trời nắng và bầu trời xanh.", difficulty: "easy", theme: "weather" },
      { id: "sv-wb4", text: "Det regnar, ta med ett paraply.", translation: "Trời đang mưa, mang theo dù nhé.", difficulty: "easy", theme: "weather" },
      { id: "sv-wb5", text: "Hur är vädret i Stockholm nu?", translation: "Thời tiết ở Stockholm bây giờ thế nào?", difficulty: "easy", theme: "weather" },
      { id: "sv-wb6", text: "På sommaren är dagarna väldigt långa.", translation: "Mùa hè ngày rất dài.", difficulty: "medium", theme: "weather" },
      { id: "sv-wb7", text: "I går var det minus tio grader.", translation: "Hôm qua trời âm mười độ.", difficulty: "medium", theme: "weather" },
      { id: "sv-wb8", text: "Hösten är min favoritårstid.", translation: "Mùa thu là mùa tôi thích nhất.", difficulty: "easy", theme: "weather" },
      { id: "sv-wb9", text: "Det är halt på vägen, kör försiktigt.", translation: "Đường trơn, lái xe cẩn thận nhé.", difficulty: "medium", theme: "weather" },
      { id: "sv-wb10", text: "Imorgon blir det soligt hela dagen.", translation: "Mai trời sẽ nắng cả ngày.", difficulty: "medium", theme: "weather" },
    ],
  },
  {
    id: "sv-body-basic", name: "Kroppen", nameVi: "Cơ thể & cảm giác", icon: "🫀", level: "A1",
    sentences: [
      { id: "sv-bb1", text: "Jag har ont i huvudet.", translation: "Tôi bị đau đầu.", difficulty: "easy", theme: "body" },
      { id: "sv-bb2", text: "Min hals är röd och jag hostar.", translation: "Cổ họng tôi đỏ và tôi bị ho.", difficulty: "medium", theme: "body" },
      { id: "sv-bb3", text: "Jag är trött, jag behöver sova.", translation: "Tôi mệt, tôi cần ngủ.", difficulty: "easy", theme: "body" },
      { id: "sv-bb4", text: "Jag tvättar händerna före maten.", translation: "Tôi rửa tay trước khi ăn.", difficulty: "easy", theme: "body" },
      { id: "sv-bb5", text: "Han har brutit benet.", translation: "Anh ấy bị gãy chân.", difficulty: "medium", theme: "body" },
      { id: "sv-bb6", text: "Mina ögon är torra av skärmen.", translation: "Mắt tôi khô vì nhìn màn hình.", difficulty: "medium", theme: "body" },
      { id: "sv-bb7", text: "Jag tränar tre gånger i veckan.", translation: "Tôi tập thể dục ba lần một tuần.", difficulty: "easy", theme: "body" },
      { id: "sv-bb8", text: "Jag har feber och känner mig sjuk.", translation: "Tôi bị sốt và cảm thấy mệt.", difficulty: "medium", theme: "body" },
      { id: "sv-bb9", text: "Ryggen gör ont när jag sitter länge.", translation: "Lưng tôi đau khi ngồi lâu.", difficulty: "medium", theme: "body" },
      { id: "sv-bb10", text: "Jag mår mycket bättre idag, tack.", translation: "Hôm nay tôi khỏe hơn nhiều, cảm ơn.", difficulty: "easy", theme: "body" },
    ],
  },
  {
    id: "sv-home-basic", name: "Hemma", nameVi: "Ở nhà & đồ đạc", icon: "🛋️", level: "A1",
    sentences: [
      { id: "sv-hb1", text: "Vi bor i en lägenhet med tre rum.", translation: "Chúng tôi sống trong căn hộ ba phòng.", difficulty: "easy", theme: "home" },
      { id: "sv-hb2", text: "Köket är litet men ljust.", translation: "Nhà bếp nhỏ nhưng sáng.", difficulty: "easy", theme: "home" },
      { id: "sv-hb3", text: "Soffan står vid fönstret.", translation: "Ghế sofa đặt cạnh cửa sổ.", difficulty: "easy", theme: "home" },
      { id: "sv-hb4", text: "Jag städar badrummet på lördagar.", translation: "Tôi dọn phòng tắm vào thứ Bảy.", difficulty: "medium", theme: "home" },
      { id: "sv-hb5", text: "Kan du stänga dörren, tack?", translation: "Bạn đóng cửa giúp nhé?", difficulty: "easy", theme: "home" },
      { id: "sv-hb6", text: "Vi har en tvättmaskin i källaren.", translation: "Chúng tôi có máy giặt ở tầng hầm.", difficulty: "medium", theme: "home" },
      { id: "sv-hb7", text: "Min säng står i sovrummet.", translation: "Giường của tôi ở trong phòng ngủ.", difficulty: "easy", theme: "home" },
      { id: "sv-hb8", text: "Hyran är dyr men läget är bra.", translation: "Tiền thuê đắt nhưng vị trí tốt.", difficulty: "medium", theme: "home" },
      { id: "sv-hb9", text: "Vi sorterar sopor i olika påsar.", translation: "Chúng tôi phân loại rác vào các túi khác nhau.", difficulty: "medium", theme: "home" },
      { id: "sv-hb10", text: "Balkongen är perfekt på sommaren.", translation: "Ban công rất tuyệt vào mùa hè.", difficulty: "medium", theme: "home" },
    ],
  },
];

const a2: SpeakingTheme[] = [
  {
    id: "sv-phone", name: "Telefonsamtal", nameVi: "Gọi điện thoại", icon: "📞", level: "A2",
    sentences: [
      { id: "sv-ph1", text: "Hej, det är Lan som ringer.", translation: "Chào, Lan đang gọi đây.", difficulty: "medium", theme: "phone" },
      { id: "sv-ph2", text: "Kan jag få prata med Anna, tack?", translation: "Tôi nói chuyện với Anna được không?", difficulty: "medium", theme: "phone" },
      { id: "sv-ph3", text: "Jag ringer angående min tid hos läkaren.", translation: "Tôi gọi về cuộc hẹn với bác sĩ của mình.", difficulty: "medium", theme: "phone" },
      { id: "sv-ph4", text: "Kan du prata lite långsammare, tack?", translation: "Bạn nói chậm hơn một chút nhé?", difficulty: "medium", theme: "phone" },
      { id: "sv-ph5", text: "Jag hör dig dåligt, linjen är dålig.", translation: "Tôi nghe không rõ, đường truyền kém.", difficulty: "medium", theme: "phone" },
      { id: "sv-ph6", text: "Kan jag lämna ett meddelande?", translation: "Tôi để lại lời nhắn được không?", difficulty: "medium", theme: "phone" },
      { id: "sv-ph7", text: "Jag måste boka om mötet till fredag.", translation: "Tôi cần đổi cuộc họp sang thứ Sáu.", difficulty: "medium", theme: "phone" },
      { id: "sv-ph8", text: "Tack för hjälpen, ha en bra dag.", translation: "Cảm ơn đã giúp, chúc một ngày tốt lành.", difficulty: "easy", theme: "phone" },
      { id: "sv-ph9", text: "Kan du skicka informationen via mejl istället?", translation: "Bạn gửi thông tin qua email thay được không?", difficulty: "medium", theme: "phone" },
      { id: "sv-ph10", text: "Jag ringer tillbaka om en halvtimme.", translation: "Tôi sẽ gọi lại sau nửa tiếng.", difficulty: "medium", theme: "phone" },
    ],
  },
  {
    id: "sv-authority", name: "Hos myndigheten", nameVi: "Làm việc với cơ quan nhà nước", icon: "🏛️", level: "A2",
    sentences: [
      { id: "sv-au1", text: "Jag vill ansöka om ett personnummer.", translation: "Tôi muốn xin số định danh cá nhân.", difficulty: "medium", theme: "authority" },
      { id: "sv-au2", text: "Vilka papper behöver jag ta med?", translation: "Tôi cần mang theo những giấy tờ nào?", difficulty: "medium", theme: "authority" },
      { id: "sv-au3", text: "Jag har bokat en tid klockan tio.", translation: "Tôi đã đặt hẹn lúc 10 giờ.", difficulty: "medium", theme: "authority" },
      { id: "sv-au4", text: "Var kan jag hämta en blankett?", translation: "Tôi lấy tờ khai ở đâu?", difficulty: "medium", theme: "authority" },
      { id: "sv-au5", text: "Jag förstår inte det här brevet, kan du förklara?", translation: "Tôi không hiểu thư này, bạn giải thích giúp nhé?", difficulty: "medium", theme: "authority" },
      { id: "sv-au6", text: "Hur länge tar handläggningen ungefär?", translation: "Việc xử lý mất khoảng bao lâu?", difficulty: "medium", theme: "authority" },
      { id: "sv-au7", text: "Jag har flyttat och vill ändra min adress.", translation: "Tôi đã chuyển nhà và muốn đổi địa chỉ.", difficulty: "medium", theme: "authority" },
      { id: "sv-au8", text: "Behöver jag boka tid eller kan jag komma direkt?", translation: "Tôi cần hẹn trước hay tới trực tiếp được?", difficulty: "medium", theme: "authority" },
      { id: "sv-au9", text: "Jag söker information om studiestöd.", translation: "Tôi tìm thông tin về hỗ trợ học tập.", difficulty: "medium", theme: "authority" },
      { id: "sv-au10", text: "Kan jag få ett intyg på svenska och engelska?", translation: "Tôi xin giấy chứng nhận bằng tiếng Thụy Điển và tiếng Anh được không?", difficulty: "medium", theme: "authority" },
    ],
  },
  {
    id: "sv-kids-school", name: "Barn & skola", nameVi: "Con cái & trường học", icon: "🎒", level: "A2",
    sentences: [
      { id: "sv-ks1", text: "Min dotter går i andra klass.", translation: "Con gái tôi học lớp hai.", difficulty: "medium", theme: "school" },
      { id: "sv-ks2", text: "Vi har utvecklingssamtal med läraren nästa vecka.", translation: "Tuần sau chúng tôi họp trao đổi với giáo viên.", difficulty: "medium", theme: "school" },
      { id: "sv-ks3", text: "Han lämnar barnen på förskolan klockan åtta.", translation: "Anh ấy đưa con tới nhà trẻ lúc 8 giờ.", difficulty: "medium", theme: "school" },
      { id: "sv-ks4", text: "Mitt barn har hemspråksundervisning i vietnamesiska.", translation: "Con tôi học tiếng Việt như tiếng mẹ đẻ.", difficulty: "medium", theme: "school" },
      { id: "sv-ks5", text: "Läxorna tar ungefär trettio minuter varje kväll.", translation: "Bài tập về nhà mất khoảng 30 phút mỗi tối.", difficulty: "medium", theme: "school" },
      { id: "sv-ks6", text: "Skolan börjar halv nio och slutar två.", translation: "Trường học bắt đầu 8:30 và tan lúc 2 giờ.", difficulty: "medium", theme: "school" },
      { id: "sv-ks7", text: "Min son är sjuk, jag sjukanmäler honom.", translation: "Con trai tôi bị ốm, tôi xin phép nghỉ cho cháu.", difficulty: "medium", theme: "school" },
      { id: "sv-ks8", text: "Vi behöver ett schema för hela terminen.", translation: "Chúng tôi cần thời khóa biểu cả học kỳ.", difficulty: "medium", theme: "school" },
      { id: "sv-ks9", text: "Barnen äter lunch i skolan varje dag.", translation: "Các con ăn trưa ở trường mỗi ngày.", difficulty: "easy", theme: "school" },
      { id: "sv-ks10", text: "Hon trivs bra i sin nya klass.", translation: "Cháu thấy vui ở lớp mới.", difficulty: "medium", theme: "school" },
    ],
  },
  {
    id: "sv-restaurant", name: "På restaurang", nameVi: "Ở nhà hàng", icon: "🍜", level: "A2",
    sentences: [
      { id: "sv-re1", text: "Ett bord för två, tack.", translation: "Cho bàn hai người, cảm ơn.", difficulty: "easy", theme: "restaurant" },
      { id: "sv-re2", text: "Kan jag få se menyn, tack?", translation: "Cho tôi xem thực đơn nhé?", difficulty: "easy", theme: "restaurant" },
      { id: "sv-re3", text: "Vad rekommenderar du idag?", translation: "Hôm nay bạn gợi ý món gì?", difficulty: "medium", theme: "restaurant" },
      { id: "sv-re4", text: "Jag är allergisk mot nötter.", translation: "Tôi bị dị ứng với các loại hạt.", difficulty: "medium", theme: "restaurant" },
      { id: "sv-re5", text: "Finns det något vegetariskt alternativ?", translation: "Có món chay nào không?", difficulty: "medium", theme: "restaurant" },
      { id: "sv-re6", text: "Maten var verkligen god, tack.", translation: "Món ăn thực sự ngon, cảm ơn.", difficulty: "easy", theme: "restaurant" },
      { id: "sv-re7", text: "Kan vi få notan, tack?", translation: "Cho chúng tôi xin hóa đơn nhé?", difficulty: "easy", theme: "restaurant" },
      { id: "sv-re8", text: "Vi vill dela på räkningen.", translation: "Chúng tôi muốn chia tiền hóa đơn.", difficulty: "medium", theme: "restaurant" },
      { id: "sv-re9", text: "Kan jag få vattnet utan is?", translation: "Cho tôi nước không đá được không?", difficulty: "medium", theme: "restaurant" },
      { id: "sv-re10", text: "Dagens lunch kostar hundratjugo kronor.", translation: "Bữa trưa hôm nay giá 120 krona.", difficulty: "medium", theme: "restaurant" },
    ],
  },
];

export const swedishExtra5: SpeakingTheme[] = [...a1, ...a2];
