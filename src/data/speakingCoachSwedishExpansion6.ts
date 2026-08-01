// Swedish Speaking Coach - expansion 6: advanced themes (B1, B2, C1).
// 9 themes x 10 sentences. Adds the missing C1 tier so the CEFR filter covers
// A1 -> C1, with academic and professional register.
import type { SpeakingTheme } from "./speakingCoachData";

const b1: SpeakingTheme[] = [
  {
    id: "sv-studies", name: "Studier & utbildning", nameVi: "Học tập & đào tạo", icon: "🎓", level: "B1",
    sentences: [
      { id: "sv-st1", text: "Jag läser en kurs i svenska på distans.", translation: "Tôi học một khóa tiếng Thụy Điển từ xa.", difficulty: "hard", theme: "studies" },
      { id: "sv-st2", text: "Utbildningen tar tre år och avslutas med ett examensarbete.", translation: "Chương trình học kéo dài ba năm và kết thúc bằng luận văn.", difficulty: "hard", theme: "studies" },
      { id: "sv-st3", text: "Jag måste lämna in uppsatsen före fredag.", translation: "Tôi phải nộp bài luận trước thứ Sáu.", difficulty: "hard", theme: "studies" },
      { id: "sv-st4", text: "Föreläsningarna spelas in så att vi kan se dem senare.", translation: "Bài giảng được ghi hình để chúng tôi xem lại sau.", difficulty: "hard", theme: "studies" },
      { id: "sv-st5", text: "Jag pluggar helst på biblioteket, där är det tyst.", translation: "Tôi thích học ở thư viện vì yên tĩnh.", difficulty: "hard", theme: "studies" },
      { id: "sv-st6", text: "Mina betyg räckte till en plats på universitetet.", translation: "Điểm của tôi đủ để vào đại học.", difficulty: "hard", theme: "studies" },
      { id: "sv-st7", text: "Vi arbetar i grupp och redovisar muntligt.", translation: "Chúng tôi làm nhóm và thuyết trình miệng.", difficulty: "hard", theme: "studies" },
      { id: "sv-st8", text: "Jag kombinerar studier med ett extrajobb på helgerna.", translation: "Tôi kết hợp học với việc làm thêm cuối tuần.", difficulty: "hard", theme: "studies" },
      { id: "sv-st9", text: "Kursen gav mig praktiska färdigheter, inte bara teori.", translation: "Khóa học cho tôi kỹ năng thực tế, không chỉ lý thuyết.", difficulty: "hard", theme: "studies" },
      { id: "sv-st10", text: "Efter examen vill jag söka jobb inom data.", translation: "Sau khi tốt nghiệp tôi muốn xin việc trong ngành dữ liệu.", difficulty: "hard", theme: "studies" },
    ],
  },
  {
    id: "sv-money", name: "Ekonomi & budget", nameVi: "Tài chính & chi tiêu", icon: "💰", level: "B1",
    sentences: [
      { id: "sv-mo-b1", text: "Jag gör en budget i början av varje månad.", translation: "Đầu mỗi tháng tôi lập ngân sách.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b2", text: "Hyran äter upp nästan halva min lön.", translation: "Tiền thuê nhà chiếm gần một nửa lương của tôi.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b3", text: "Jag sparar tusen kronor i månaden till en resa.", translation: "Tôi tiết kiệm 1000 krona mỗi tháng để đi du lịch.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b4", text: "Räntan har stigit och lånet blev dyrare.", translation: "Lãi suất tăng và khoản vay đắt hơn.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b5", text: "Jag betalar mina räkningar med autogiro.", translation: "Tôi thanh toán hóa đơn bằng ghi nợ tự động.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b6", text: "Det lönar sig att jämföra priser innan man köper.", translation: "So sánh giá trước khi mua là đáng công.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b7", text: "Jag deklarerar mina inkomster i april.", translation: "Tôi khai thuế thu nhập vào tháng Tư.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b8", text: "Vi har en buffert för oväntade utgifter.", translation: "Chúng tôi có quỹ dự phòng cho chi phí bất ngờ.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b9", text: "Kollektivtrafikkortet är billigare än att köra bil.", translation: "Vé giao thông công cộng rẻ hơn lái ô tô.", difficulty: "hard", theme: "money" },
      { id: "sv-mo-b10", text: "Jag undviker att handla på kredit.", translation: "Tôi tránh mua sắm bằng tín dụng.", difficulty: "hard", theme: "money" },
    ],
  },
  {
    id: "sv-digital", name: "Digitala tjänster", nameVi: "Dịch vụ số", icon: "📱", level: "B1",
    sentences: [
      { id: "sv-dg1", text: "Jag loggar in med mobilt BankID.", translation: "Tôi đăng nhập bằng BankID trên điện thoại.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg2", text: "Appen fungerar inte, den kraschar när jag öppnar den.", translation: "Ứng dụng không chạy, nó bị lỗi khi tôi mở.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg3", text: "Jag bokade tiden direkt på deras hemsida.", translation: "Tôi đặt lịch trực tiếp trên trang web của họ.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg4", text: "Man måste verifiera sin identitet innan man kan betala.", translation: "Phải xác minh danh tính trước khi thanh toán.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg5", text: "Jag fick ett mejl om att lösenordet måste bytas.", translation: "Tôi nhận email báo phải đổi mật khẩu.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg6", text: "Var försiktig med länkar från okända avsändare.", translation: "Hãy cẩn thận với đường link từ người gửi lạ.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg7", text: "Jag använder Swish när jag delar notan med vänner.", translation: "Tôi dùng Swish khi chia tiền với bạn bè.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg8", text: "Kundtjänsten svarar snabbast via chatten.", translation: "Bộ phận chăm sóc khách hàng trả lời nhanh nhất qua chat.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg9", text: "Jag laddade ner appen men glömde aktivera notiser.", translation: "Tôi tải ứng dụng nhưng quên bật thông báo.", difficulty: "hard", theme: "digital" },
      { id: "sv-dg10", text: "Digitala tjänster sparar tid men kräver vana.", translation: "Dịch vụ số tiết kiệm thời gian nhưng cần quen tay.", difficulty: "hard", theme: "digital" },
    ],
  },
];

const b2: SpeakingTheme[] = [
  {
    id: "sv-negotiation", name: "Förhandling i arbetslivet", nameVi: "Đàm phán trong công việc", icon: "🤝", level: "B2",
    sentences: [
      { id: "sv-ng1", text: "Jag skulle vilja diskutera min lön vid nästa medarbetarsamtal.", translation: "Tôi muốn trao đổi về lương trong buổi đánh giá tới.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng2", text: "Med tanke på mitt ansvar tycker jag att ersättningen bör ses över.", translation: "Xét theo trách nhiệm của tôi, mức thù lao nên được xem lại.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng3", text: "Kan vi hitta en lösning som fungerar för båda parter?", translation: "Chúng ta có thể tìm giải pháp phù hợp cho cả hai bên không?", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng4", text: "Jag förstår ert perspektiv, men jag har en annan uppfattning.", translation: "Tôi hiểu quan điểm của anh, nhưng tôi có cách nhìn khác.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng5", text: "Skulle det vara möjligt att öka antalet distansdagar?", translation: "Có thể tăng số ngày làm việc từ xa không?", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng6", text: "Jag föreslår att vi utvärderar upplägget om sex månader.", translation: "Tôi đề nghị đánh giá lại phương án sau sáu tháng.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng7", text: "Låt oss sammanfatta vad vi är överens om hittills.", translation: "Hãy tóm tắt những điều chúng ta đã đồng ý cho tới giờ.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng8", text: "Jag behöver några dagar att fundera på erbjudandet.", translation: "Tôi cần vài ngày cân nhắc đề nghị này.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng9", text: "Om vi kompromissar här kan vi gå vidare med projektet.", translation: "Nếu nhượng bộ ở điểm này, chúng ta có thể tiếp tục dự án.", difficulty: "hard", theme: "negotiation" },
      { id: "sv-ng10", text: "Villkoren bör skrivas in i avtalet för tydlighetens skull.", translation: "Các điều khoản nên ghi vào hợp đồng cho rõ ràng.", difficulty: "hard", theme: "negotiation" },
    ],
  },
  {
    id: "sv-integration", name: "Integration & mångfald", nameVi: "Hòa nhập & đa văn hóa", icon: "🌏", level: "B2",
    sentences: [
      { id: "sv-in1", text: "Språket är nyckeln till att komma in i samhället.", translation: "Ngôn ngữ là chìa khóa để hòa nhập xã hội.", difficulty: "hard", theme: "integration" },
      { id: "sv-in2", text: "Många nyanlända saknar nätverk på arbetsmarknaden.", translation: "Nhiều người mới đến thiếu mạng lưới trên thị trường lao động.", difficulty: "hard", theme: "integration" },
      { id: "sv-in3", text: "Mångfald berikar både arbetsplatser och skolor.", translation: "Sự đa dạng làm giàu cả nơi làm việc lẫn trường học.", difficulty: "hard", theme: "integration" },
      { id: "sv-in4", text: "Det tar tid att förstå oskrivna sociala regler.", translation: "Cần thời gian để hiểu các quy tắc xã hội bất thành văn.", difficulty: "hard", theme: "integration" },
      { id: "sv-in5", text: "Jag försöker behålla min kultur och samtidigt anpassa mig.", translation: "Tôi cố giữ văn hóa của mình đồng thời thích nghi.", difficulty: "hard", theme: "integration" },
      { id: "sv-in6", text: "Validering av utländska examina går ofta för långsamt.", translation: "Việc công nhận bằng cấp nước ngoài thường quá chậm.", difficulty: "hard", theme: "integration" },
      { id: "sv-in7", text: "Praktik är ofta första steget till en fast anställning.", translation: "Thực tập thường là bước đầu tới công việc chính thức.", difficulty: "hard", theme: "integration" },
      { id: "sv-in8", text: "Fördomar minskar när människor möts i vardagen.", translation: "Định kiến giảm khi con người gặp nhau trong đời thường.", difficulty: "hard", theme: "integration" },
      { id: "sv-in9", text: "Föreningslivet är ett bra sätt att skaffa vänner.", translation: "Sinh hoạt hội nhóm là cách tốt để kết bạn.", difficulty: "hard", theme: "integration" },
      { id: "sv-in10", text: "Tvåspråkiga barn har en tydlig fördel senare i livet.", translation: "Trẻ song ngữ có lợi thế rõ rệt về sau.", difficulty: "hard", theme: "integration" },
    ],
  },
  {
    id: "sv-tech-ai", name: "Teknik & AI", nameVi: "Công nghệ & AI", icon: "🤖", level: "B2",
    sentences: [
      { id: "sv-ai1", text: "Artificiell intelligens förändrar redan många yrken.", translation: "Trí tuệ nhân tạo đã thay đổi nhiều ngành nghề.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai2", text: "Vi behöver tydliga regler för hur data får användas.", translation: "Chúng ta cần quy định rõ ràng về việc sử dụng dữ liệu.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai3", text: "Automatisering tar bort rutinuppgifter men skapar nya roller.", translation: "Tự động hóa loại bỏ việc lặp lại nhưng tạo vai trò mới.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai4", text: "Jag använder AI som ett stöd, inte som en ersättning.", translation: "Tôi dùng AI như công cụ hỗ trợ, không phải thay thế.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai5", text: "Algoritmer kan förstärka fördomar om träningsdatan är skev.", translation: "Thuật toán có thể khuếch đại thiên kiến nếu dữ liệu lệch.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai6", text: "Digital kompetens borde ingå i all utbildning.", translation: "Năng lực số nên có trong mọi chương trình đào tạo.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai7", text: "Integritet på nätet är en fråga om demokrati.", translation: "Quyền riêng tư trên mạng là vấn đề dân chủ.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai8", text: "Molntjänster gör det enklare att samarbeta över gränser.", translation: "Dịch vụ đám mây giúp hợp tác xuyên biên giới dễ hơn.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai9", text: "Tekniken utvecklas snabbare än lagstiftningen hinner med.", translation: "Công nghệ phát triển nhanh hơn tốc độ lập pháp.", difficulty: "hard", theme: "technology" },
      { id: "sv-ai10", text: "Vi bör diskutera vilka beslut som aldrig får automatiseras.", translation: "Chúng ta nên bàn xem quyết định nào không bao giờ được tự động hóa.", difficulty: "hard", theme: "technology" },
    ],
  },
];

const c1: SpeakingTheme[] = [
  {
    id: "sv-academic", name: "Akademisk diskussion", nameVi: "Thảo luận học thuật", icon: "📖", level: "C1",
    sentences: [
      { id: "sv-ac1", text: "Studien bygger på ett begränsat urval, vilket försvagar slutsatserna.", translation: "Nghiên cứu dựa trên mẫu hạn chế, điều này làm yếu các kết luận.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac2", text: "Resultaten pekar på ett samband, men inte nödvändigtvis på orsakssamband.", translation: "Kết quả cho thấy có tương quan, nhưng chưa hẳn là nhân quả.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac3", text: "Jag vill nyansera påståendet något innan vi går vidare.", translation: "Tôi muốn làm rõ sắc thái của nhận định trước khi đi tiếp.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac4", text: "Metoden är väl beskriven och därmed möjlig att replikera.", translation: "Phương pháp được mô tả kỹ nên có thể lặp lại.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac5", text: "Litteraturöversikten saknar nyare forskning från det senaste decenniet.", translation: "Phần tổng quan tài liệu thiếu nghiên cứu mới của thập kỷ qua.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac6", text: "Om vi utgår från den teoretiska ramen blir tolkningen en annan.", translation: "Nếu xuất phát từ khung lý thuyết đó, cách diễn giải sẽ khác.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac7", text: "Data samlades in genom både enkäter och djupintervjuer.", translation: "Dữ liệu được thu thập qua cả khảo sát lẫn phỏng vấn sâu.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac8", text: "Jag ställer mig tveksam till hur variablerna har operationaliserats.", translation: "Tôi còn hoài nghi về cách các biến được thao tác hóa.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac9", text: "Slutsatsen är rimlig men bör tolkas med försiktighet.", translation: "Kết luận hợp lý nhưng nên diễn giải một cách thận trọng.", difficulty: "hard", theme: "academic" },
      { id: "sv-ac10", text: "Framtida forskning bör undersöka långsiktiga effekter.", translation: "Nghiên cứu tương lai nên xem xét tác động dài hạn.", difficulty: "hard", theme: "academic" },
    ],
  },
  {
    id: "sv-rhetoric", name: "Retorik & nyansering", nameVi: "Lập luận & diễn đạt tinh tế", icon: "🎙️", level: "C1",
    sentences: [
      { id: "sv-rh1", text: "Å ena sidan sparar reformen pengar, å andra sidan drabbar den de svagaste.", translation: "Một mặt cải cách tiết kiệm tiền, mặt khác nó ảnh hưởng người yếu thế.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh2", text: "Jag håller med i sak, men jag vill invända mot tidsplanen.", translation: "Tôi đồng ý về bản chất, nhưng phản đối về mốc thời gian.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh3", text: "Låt mig förtydliga vad jag egentligen menar med begreppet.", translation: "Để tôi làm rõ ý thực sự của khái niệm này.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh4", text: "Det finns starka argument för båda ståndpunkterna.", translation: "Có lập luận mạnh cho cả hai quan điểm.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh5", text: "Man skulle kunna hävda motsatsen med lika god grund.", translation: "Người ta có thể lập luận ngược lại với căn cứ chắc không kém.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh6", text: "Sammanfattningsvis talar mycket för en gradvis förändring.", translation: "Tóm lại, nhiều yếu tố ủng hộ một thay đổi từng bước.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh7", text: "Jag vill gärna understryka att detta är en preliminär bedömning.", translation: "Tôi muốn nhấn mạnh rằng đây là đánh giá sơ bộ.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh8", text: "Frågan är komplex och låter sig inte besvaras enkelt.", translation: "Vấn đề phức tạp và không thể trả lời đơn giản.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh9", text: "Med all respekt tror jag att premissen är felaktig.", translation: "Với tất cả sự tôn trọng, tôi cho rằng tiền đề là sai.", difficulty: "hard", theme: "rhetoric" },
      { id: "sv-rh10", text: "Om jag får sammanfatta: vi är oense om metoden, inte om målet.", translation: "Nếu được tóm lại: chúng ta khác nhau về phương pháp, không phải mục tiêu.", difficulty: "hard", theme: "rhetoric" },
    ],
  },
  {
    id: "sv-culture-life", name: "Svensk kultur & vardagsliv", nameVi: "Văn hóa & đời sống Thụy Điển", icon: "🇸🇪", level: "C1",
    sentences: [
      { id: "sv-cu1", text: "Lagom genomsyrar allt från arkitektur till löneförhandlingar.", translation: "Tinh thần 'lagom' thấm vào mọi thứ, từ kiến trúc tới đàm phán lương.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu2", text: "Allemansrätten ger alla tillgång till naturen, med ansvar.", translation: "Quyền tiếp cận thiên nhiên cho tất cả, kèm trách nhiệm.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu3", text: "Midsommar firas med sill, dans och alldeles för mycket regn.", translation: "Lễ hạ chí có cá trích, khiêu vũ và mưa nhiều quá mức.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu4", text: "Konsensuskulturen gör beslut långsamma men hållbara.", translation: "Văn hóa đồng thuận khiến quyết định chậm nhưng bền.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu5", text: "Tilliten till institutioner är ovanligt hög i Norden.", translation: "Niềm tin vào thể chế ở Bắc Âu cao khác thường.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu6", text: "Föräldraledigheten delas allt jämnare mellan föräldrarna.", translation: "Nghỉ thai sản ngày càng được chia đều giữa cha mẹ.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu7", text: "Att komma i tid betraktas som ett tecken på respekt.", translation: "Đúng giờ được coi là dấu hiệu của sự tôn trọng.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu8", text: "Diskussioner förs sakligt, sällan med höjd röst.", translation: "Tranh luận diễn ra khách quan, hiếm khi lớn tiếng.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu9", text: "Naturen är för många svenskar en form av återhämtning.", translation: "Với nhiều người Thụy Điển, thiên nhiên là cách hồi phục.", difficulty: "hard", theme: "culture" },
      { id: "sv-cu10", text: "Fikapausen fyller en social funktion, inte bara en kulinarisk.", translation: "Giờ fika có chức năng xã hội, không chỉ là chuyện ăn uống.", difficulty: "hard", theme: "culture" },
    ],
  },
];

export const swedishExtra6: SpeakingTheme[] = [...b1, ...b2, ...c1];
