// Swedish Speaking Coach — A1 & A2 expansion: everyday beginner themes.
// Adds 8 new themes (4 A1 + 4 A2), each with 10 sentences = 80 new sentences.
import type { SpeakingTheme } from "./speakingCoachData";

const a1More: SpeakingTheme[] = [
  {
    id: "sv-colors-clothes", name: "Färger & kläder", nameVi: "Màu sắc & quần áo", icon: "👕", level: "A1",
    sentences: [
      { id: "sv-cc1", text: "Min favoritfärg är blå.", translation: "Màu yêu thích của tôi là xanh dương.", difficulty: "easy", theme: "colors" },
      { id: "sv-cc2", text: "Jag har en röd jacka och svarta byxor.", translation: "Tôi có áo khoác đỏ và quần đen.", difficulty: "easy", theme: "colors" },
      { id: "sv-cc3", text: "Den här tröjan är för stor.", translation: "Cái áo này quá to.", difficulty: "easy", theme: "clothes" },
      { id: "sv-cc4", text: "Jag behöver ett par varma skor.", translation: "Tôi cần một đôi giày ấm.", difficulty: "easy", theme: "clothes" },
      { id: "sv-cc5", text: "På vintern bär jag mössa och vantar.", translation: "Mùa đông tôi đội mũ và mang găng tay.", difficulty: "easy", theme: "clothes" },
      { id: "sv-cc6", text: "Vilken färg är din nya bil?", translation: "Xe mới của bạn màu gì?", difficulty: "easy", theme: "colors" },
      { id: "sv-cc7", text: "Jag tycker om vita skjortor.", translation: "Tôi thích áo sơ mi trắng.", difficulty: "easy", theme: "clothes" },
      { id: "sv-cc8", text: "Hon har en grön klänning idag.", translation: "Hôm nay cô ấy mặc váy xanh lá.", difficulty: "easy", theme: "clothes" },
      { id: "sv-cc9", text: "Mina strumpor är gula och blå.", translation: "Tất của tôi màu vàng và xanh dương.", difficulty: "easy", theme: "colors" },
      { id: "sv-cc10", text: "Jag tar den bruna kappan, tack.", translation: "Cho tôi lấy cái áo măng tô nâu, cảm ơn.", difficulty: "easy", theme: "clothes" },
    ],
  },
  {
    id: "sv-school-basic", name: "I skolan", nameVi: "Trong trường học", icon: "🏫", level: "A1",
    sentences: [
      { id: "sv-sc1", text: "Jag studerar svenska på en folkhögskola.", translation: "Tôi học tiếng Thụy Điển tại trường dân lập.", difficulty: "easy", theme: "school" },
      { id: "sv-sc2", text: "Min lärare heter Anna.", translation: "Cô giáo tôi tên Anna.", difficulty: "easy", theme: "school" },
      { id: "sv-sc3", text: "Lektionen börjar klockan nio.", translation: "Tiết học bắt đầu lúc 9 giờ.", difficulty: "easy", theme: "school" },
      { id: "sv-sc4", text: "Vi har läxor varje dag.", translation: "Chúng tôi có bài tập về nhà mỗi ngày.", difficulty: "easy", theme: "school" },
      { id: "sv-sc5", text: "Jag kan inte ordet på svenska.", translation: "Tôi không biết từ đó bằng tiếng Thụy Điển.", difficulty: "easy", theme: "school" },
      { id: "sv-sc6", text: "Får jag gå på toaletten?", translation: "Em được đi vệ sinh không?", difficulty: "easy", theme: "school" },
      { id: "sv-sc7", text: "Min penna är borta.", translation: "Bút của tôi mất rồi.", difficulty: "easy", theme: "school" },
      { id: "sv-sc8", text: "Vi har prov på fredag.", translation: "Chúng tôi có bài kiểm tra vào thứ Sáu.", difficulty: "easy", theme: "school" },
      { id: "sv-sc9", text: "Klassen har tolv elever.", translation: "Lớp có 12 học sinh.", difficulty: "easy", theme: "school" },
      { id: "sv-sc10", text: "Jag tycker om att läsa böcker.", translation: "Tôi thích đọc sách.", difficulty: "easy", theme: "school" },
    ],
  },
  {
    id: "sv-animals", name: "Djur & natur", nameVi: "Động vật & thiên nhiên", icon: "🦊", level: "A1",
    sentences: [
      { id: "sv-an1", text: "Jag har en hund som heter Max.", translation: "Tôi có con chó tên Max.", difficulty: "easy", theme: "animals" },
      { id: "sv-an2", text: "I skogen finns det älgar och rävar.", translation: "Trong rừng có nai sừng tấm và cáo.", difficulty: "easy", theme: "animals" },
      { id: "sv-an3", text: "Jag tycker om katter mer än hundar.", translation: "Tôi thích mèo hơn chó.", difficulty: "easy", theme: "animals" },
      { id: "sv-an4", text: "Fåglarna sjunger på morgonen.", translation: "Chim hót vào buổi sáng.", difficulty: "easy", theme: "animals" },
      { id: "sv-an5", text: "I sjön simmar många fiskar.", translation: "Trong hồ có nhiều cá bơi.", difficulty: "easy", theme: "animals" },
      { id: "sv-an6", text: "Hästen är ett vackert djur.", translation: "Ngựa là loài vật đẹp.", difficulty: "easy", theme: "animals" },
      { id: "sv-an7", text: "Min granne har två kaniner.", translation: "Hàng xóm tôi có hai con thỏ.", difficulty: "easy", theme: "animals" },
      { id: "sv-an8", text: "Är du rädd för spindlar?", translation: "Bạn có sợ nhện không?", difficulty: "easy", theme: "animals" },
      { id: "sv-an9", text: "Vi såg en björn på avstånd.", translation: "Chúng tôi thấy một con gấu từ xa.", difficulty: "easy", theme: "animals" },
      { id: "sv-an10", text: "Älgar är vanliga i norra Sverige.", translation: "Nai sừng tấm phổ biến ở miền bắc Thụy Điển.", difficulty: "medium", theme: "animals" },
    ],
  },
  {
    id: "sv-feelings", name: "Känslor", nameVi: "Cảm xúc & trạng thái", icon: "😊", level: "A1",
    sentences: [
      { id: "sv-fe1", text: "Jag känner mig lugn och utvilad idag.", translation: "Hôm nay tôi thấy bình tĩnh và thoải mái.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe2", text: "Hon känner sig trött efter jobbet.", translation: "Cô ấy thấy mệt sau giờ làm.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe3", text: "Jag är hungrig och törstig.", translation: "Tôi đói và khát.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe4", text: "Han är arg på mig.", translation: "Anh ấy giận tôi.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe5", text: "Jag är nervös inför provet.", translation: "Tôi hồi hộp trước bài kiểm tra.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe6", text: "Vi är så stolta över dig.", translation: "Chúng tôi rất tự hào về bạn.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe7", text: "Hon ser ledsen ut.", translation: "Cô ấy trông buồn.", difficulty: "easy", theme: "feelings" },
      { id: "sv-fe8", text: "Jag är förvånad över nyheterna.", translation: "Tôi ngạc nhiên với tin tức.", difficulty: "medium", theme: "feelings" },
      { id: "sv-fe9", text: "Det här gör mig riktigt lycklig.", translation: "Điều này làm tôi thực sự hạnh phúc.", difficulty: "medium", theme: "feelings" },
      { id: "sv-fe10", text: "Jag är rädd för åska.", translation: "Tôi sợ sấm.", difficulty: "easy", theme: "feelings" },
    ],
  },
];

const a2More: SpeakingTheme[] = [
  {
    id: "sv-doctor", name: "Hos läkaren", nameVi: "Đi khám bác sĩ", icon: "🩺", level: "A2",
    sentences: [
      { id: "sv-do1", text: "Jag har ont i halsen sedan i går.", translation: "Tôi đau họng từ hôm qua.", difficulty: "medium", theme: "doctor" },
      { id: "sv-do2", text: "Min huvudvärk har blivit värre.", translation: "Đau đầu của tôi nặng hơn.", difficulty: "medium", theme: "doctor" },
      { id: "sv-do3", text: "Jag tror att jag har feber.", translation: "Tôi nghĩ tôi bị sốt.", difficulty: "medium", theme: "doctor" },
      { id: "sv-do4", text: "Vilka mediciner ska jag ta?", translation: "Tôi nên uống thuốc gì?", difficulty: "medium", theme: "doctor" },
      { id: "sv-do5", text: "Jag är allergisk mot pollen på våren.", translation: "Tôi bị dị ứng phấn hoa vào mùa xuân.", difficulty: "medium", theme: "doctor" },
      { id: "sv-do6", text: "Hur ofta ska jag ta tabletterna?", translation: "Tôi uống viên thuốc bao lâu một lần?", difficulty: "medium", theme: "doctor" },
      { id: "sv-do7", text: "Jag har sovit dåligt hela veckan.", translation: "Cả tuần tôi ngủ không ngon.", difficulty: "medium", theme: "doctor" },
      { id: "sv-do8", text: "Hur länge ska jag ta medicinen?", translation: "Tôi phải uống thuốc trong bao lâu?", difficulty: "medium", theme: "doctor" },
      { id: "sv-do9", text: "Behöver jag boka en ny tid?", translation: "Tôi có cần đặt lịch hẹn mới không?", difficulty: "medium", theme: "doctor" },
      { id: "sv-do10", text: "Tack, jag mår mycket bättre nu.", translation: "Cảm ơn, tôi thấy đỡ hơn nhiều rồi.", difficulty: "medium", theme: "doctor" },
    ],
  },
  {
    id: "sv-bank-post", name: "Bank & post", nameVi: "Ngân hàng & bưu điện", icon: "🏦", level: "A2",
    sentences: [
      { id: "sv-bp1", text: "Vilka papper behöver jag för att bli kund här?", translation: "Tôi cần giấy tờ gì để mở tài khoản ở đây?", difficulty: "medium", theme: "bank" },
      { id: "sv-bp2", text: "Behöver jag personnummer för det här?", translation: "Tôi có cần mã số định danh không?", difficulty: "medium", theme: "bank" },
      { id: "sv-bp3", text: "Hur länge tar överföringen?", translation: "Chuyển khoản mất bao lâu?", difficulty: "medium", theme: "bank" },
      { id: "sv-bp4", text: "Jag vill skicka det här paketet till Vietnam.", translation: "Tôi muốn gửi gói hàng này đến Việt Nam.", difficulty: "medium", theme: "post" },
      { id: "sv-bp5", text: "Hur mycket kostar frimärket till Asien?", translation: "Tem gửi đi châu Á giá bao nhiêu?", difficulty: "medium", theme: "post" },
      { id: "sv-bp6", text: "Mitt kort fungerar inte.", translation: "Thẻ của tôi không dùng được.", difficulty: "medium", theme: "bank" },
      { id: "sv-bp7", text: "Kan jag växla euro till kronor här?", translation: "Tôi đổi euro sang krona ở đây được không?", difficulty: "medium", theme: "bank" },
      { id: "sv-bp8", text: "Jag har glömt min kod.", translation: "Tôi quên mã pin rồi.", difficulty: "medium", theme: "bank" },
      { id: "sv-bp9", text: "När kommer paketet att levereras?", translation: "Khi nào gói hàng được giao?", difficulty: "medium", theme: "post" },
      { id: "sv-bp10", text: "Finns det internetbank på engelska?", translation: "Có ngân hàng trực tuyến bằng tiếng Anh không?", difficulty: "medium", theme: "bank" },
    ],
  },
  {
    id: "sv-apartment", name: "Söka bostad", nameVi: "Tìm nhà ở", icon: "🏠", level: "A2",
    sentences: [
      { id: "sv-ap1", text: "Jag söker en lägenhet med två rum.", translation: "Tôi tìm căn hộ hai phòng.", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap2", text: "Hyran är tolvtusen kronor i månaden.", translation: "Tiền thuê là 12.000 krona một tháng.", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap3", text: "Ingår el och vatten i hyran?", translation: "Tiền điện nước đã bao gồm chưa?", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap4", text: "Får man ha husdjur i lägenheten?", translation: "Có được nuôi thú cưng trong căn hộ không?", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap5", text: "När kan jag flytta in?", translation: "Khi nào tôi có thể chuyển vào?", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap6", text: "Det finns tvättstuga i källaren.", translation: "Có phòng giặt ở tầng hầm.", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap7", text: "Lägenheten ligger nära tunnelbanan.", translation: "Căn hộ gần tàu điện ngầm.", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap8", text: "Hur lång är uppsägningstiden?", translation: "Thời gian báo trước trả nhà là bao lâu?", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap9", text: "Jag står i kö för en hyresrätt.", translation: "Tôi đang xếp hàng chờ căn hộ cho thuê.", difficulty: "medium", theme: "apartment" },
      { id: "sv-ap10", text: "Köket är litet men nyrenoverat.", translation: "Bếp nhỏ nhưng mới sửa.", difficulty: "medium", theme: "apartment" },
    ],
  },
  {
    id: "sv-invitation", name: "Bjuda & tacka", nameVi: "Mời & cảm ơn", icon: "🎉", level: "A2",
    sentences: [
      { id: "sv-in1", text: "Skulle du vilja komma på middag på lördag?", translation: "Bạn muốn tới ăn tối thứ Bảy không?", difficulty: "medium", theme: "invitation" },
      { id: "sv-in2", text: "Tack för inbjudan, jag kommer gärna.", translation: "Cảm ơn lời mời, tôi sẽ đến.", difficulty: "medium", theme: "invitation" },
      { id: "sv-in3", text: "Tyvärr kan jag inte, jag har redan planer.", translation: "Tiếc là tôi không thể, tôi đã có hẹn.", difficulty: "medium", theme: "invitation" },
      { id: "sv-in4", text: "Ska vi fika tillsammans efter jobbet?", translation: "Chúng ta fika cùng nhau sau giờ làm nhé?", difficulty: "medium", theme: "invitation" },
      { id: "sv-in5", text: "Det vore trevligt att ses snart.", translation: "Sẽ rất vui nếu sớm gặp lại.", difficulty: "medium", theme: "invitation" },
      { id: "sv-in6", text: "Tack så jättemycket för presenten!", translation: "Cảm ơn rất nhiều vì món quà!", difficulty: "medium", theme: "invitation" },
      { id: "sv-in7", text: "Ingen orsak, det var så lite så.", translation: "Không có gì, chuyện nhỏ thôi.", difficulty: "medium", theme: "invitation" },
      { id: "sv-in8", text: "Jag uppskattar verkligen din hjälp.", translation: "Tôi thực sự trân trọng sự giúp đỡ của bạn.", difficulty: "medium", theme: "invitation" },
      { id: "sv-in9", text: "Vi hoppas att ni kommer på festen.", translation: "Chúng tôi mong các bạn tới dự tiệc.", difficulty: "medium", theme: "invitation" },
      { id: "sv-in10", text: "Tack för en jättetrevlig kväll!", translation: "Cảm ơn vì một buổi tối rất vui!", difficulty: "medium", theme: "invitation" },
    ],
  },
];

export const swedishA1A2Extra: SpeakingTheme[] = [...a1More, ...a2More];
